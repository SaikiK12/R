/**
 * Pump.fun Token-2022 and AMM drain support.
 *
 * The kit explicitly handles tokens minted through pump.fun and similar
 * AMM programs. This is what distinguishes it from simpler drainers and
 * is explicitly advertised in the Rublevka kit description: "SPL2022
 * extension tokens".
 *
 * String-table evidence:
 *   [315] "transferFeeConfig"           — Token-2022 extension field
 *   [316] "pumpCmXqMfrsAkQ5r49WcJnRayYRqmXz6ae8H7H9Dfn" — pump.fun AMM/bonding curve
 *   [356] "LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo" — Meteora DLMM
 *   [357] "CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK" — Raydium CPMM
 *   [358] "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc"  — Orca Whirlpool
 *
 * === Token-2022 transfer fee handling ===
 *
 * Many pump.fun tokens use the Token-2022 standard with the
 * TransferFeeConfig extension. When draining such a token, the kit
 * uses TransferCheckedWithFee instead of a plain transfer — this is
 * confirmed by the operator program's log entries in real mainnet
 * transactions ("TransferCheckedWithFee" visible in program logs,
 * documented in operator_program.md).
 *
 * Detection: `account.withheldAmount` present on the token account
 * → it's Token-2022 with fees. The kit sets token2022 = true in
 * this case (see solflare_api.js portfolio() function).
 *
 * === Pump.fun bonding curve address ===
 *
 * "pumpCmXqMfrsAkQ5r49WcJnRayYRqmXz6ae8H7H9Dfn" [316] is the
 * pump.fun bonding curve program. The kit checks whether a token's
 * mint authority points to this program to identify pump.fun tokens
 * and ensure correct drain routing.
 *
 * === AMM LP token detection ===
 *
 * LP tokens from Meteora DLMM [356], Raydium CPMM [357], and Orca
 * Whirlpool [358] are detected and drained as standard SPL tokens.
 * They appear in the victim's wallet as regular token accounts. The
 * kit does NOT redeem LP positions — it transfers the LP tokens
 * directly to the operator (the LP token represents a pool share that
 * the operator can then redeem at their leisure).
 *
 * === Compute budget adjustments for Token-2022 ===
 *
 * From tx_builders.js comments and constants:
 *   - Standard SPL drain:         base units
 *   - Token-2022 (id 8):          +10,000 compute units
 *   - ATA creation (id 3):        +615,000 compute units
 *   - Token-2022 with fee (id 9): +20,300 compute units
 *   - withFee variant (id 17):    +15,000 compute units
 *   - withFee variant (id 19):    +100,000 compute units
 *   - Optimization (id 15):       -1,488,440 compute units (subtraction)
 *
 * === Compute unit caps ===
 *
 * From constants:
 *   8,000,000  — absolute cap per transaction (柳)
 *   1,400,000  — per-account soft limit (綾)
 *   100        — maximum account count per drain batch (惛)
 *   432,000    — slots until blockhash expires (鐘)
 */

const PUMP_FUN_PROGRAM = "pumpCmXqMfrsAkQ5r49WcJnRayYRqmXz6ae8H7H9Dfn"; // [316]
const METEORA_DLMM     = "LBUZKhRxPF3XUpBCjp4YzTKgLccjZhTSDM9YuVaPwxo"; // [356]
const RAYDIUM_CPMM     = "CAMMCzo5YL8w4VFF8KVHrK22GGUsp5VTaW7grrKgrWqK"; // [357]
const ORCA_WHIRLPOOL   = "whirLbMiicVdio4qvUfM5KAg6Ct8VwpYzGff3uctyCc";  // [358]

// Token-2022 extension field name
const TRANSFER_FEE_CONFIG = "transferFeeConfig"; // [315]

/**
 * isToken2022WithFee(tokenAccount):
 *   Returns true if this token account is Token-2022 with TransferFee
 *   extension. The Solflare API exposes this via the withheldAmount field.
 */
function isToken2022WithFee(tokenAccount) {
  return "withheldAmount" in tokenAccount;
}

/**
 * computeUnitsForToken(token):
 *   Returns the extra compute units to add for draining this token type,
 *   on top of the base allocation per token (5,000 units per token account).
 */
function computeUnitsForToken(token) {
  if (token.token2022) {
    if (isToken2022WithFee(token)) return 20300; // id 9: Token-2022 with fee
    return 10000; // id 8: standard Token-2022
  }
  return 0; // id 0: standard SPL Token
}

// Compute budget constants (from constants array)
const COMPUTE_BUDGET = {
  CAP:               8_000_000,  // absolute maximum per tx
  PER_ACCOUNT_SOFT:  1_400_000,  // soft per-account limit
  MAX_ACCOUNTS:      100,        // maximum accounts per drain batch
  BLOCKHASH_WINDOW:  432_000,    // slots until blockhash expires
  PER_TOKEN:         5_000,      // base per token account
  TOKEN2022_EXTRA:   10_000,     // id 8
  ATA_CREATE:        615_000,    // id 3
  TOKEN2022_FEE:     20_300,     // id 9
  WITH_FEE_A:        15_000,     // id 17
  WITH_FEE_B:        100_000,    // id 19
  OPTIMIZATION:     -1_488_440,  // id 15 (negative, subtracted)
};
