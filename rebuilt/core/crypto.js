/**
 * rebuilt/core/crypto.js
 *
 * All cryptographic primitives and binary encoding helpers used by the kit.
 *
 * Sources:
 *   - bundle.deobfuscated.js lines 20634–20664 (AES-GCM)
 *   - decode.py custom-base64 alphabet (custom B64)
 *   - decompiled/kit/operator/payloads.js comments (CRC32, packing)
 *   - decompiled/kit/page/page_params.js (base-x slug decode)
 *   - decompiled/live/RUNTIME_MAP.md (connect token verification)
 */

'use strict';

// ── AES-GCM key derivation ─────────────────────────────────────────────
// 揲: derive an AES-256-GCM CryptoKey from a purpose string.
// Key = SHA-256(purpose + SALT), imported as non-extractable.
// Cache by purpose string in a Map (粈).

const OPERATOR_KEY_SALT = 'B3ui3QZFrOPoGW7oMZgE4A'; // 幦, string table [?]
const _keyCache = new Map();

async function deriveOperatorKey(purpose) {
  if (_keyCache.has(purpose)) return _keyCache.get(purpose);
  const encoded = new TextEncoder().encode(purpose + OPERATOR_KEY_SALT);
  const digest  = await crypto.subtle.digest('SHA-256', encoded);
  const key     = await crypto.subtle.importKey(
    'raw', digest, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']
  );
  _keyCache.set(purpose, key);
  return key;
}

// 箉: encrypt with AES-GCM. Output = 12-byte IV || ciphertext.
async function aesEncrypt(plaintext, purpose) {
  const key = await deriveOperatorKey(purpose);
  const iv  = crypto.getRandomValues(new Uint8Array(12));
  const ct  = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, plaintext);
  const out = new Uint8Array(12 + ct.byteLength);
  out.set(iv, 0);
  out.set(new Uint8Array(ct), 12);
  return out;
}

// 捿: decrypt AES-GCM. Input = 12-byte IV || ciphertext.
async function aesDecrypt(blob, purpose) {
  const key = await deriveOperatorKey(purpose);
  const iv  = blob.slice(0, 12);
  const ct  = blob.slice(12);
  const pt  = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ct);
  return new Uint8Array(pt);
}

// ── CRC32 ──────────────────────────────────────────────────────────────
// 樮/嵰: standard CRC32, polynomial 0xEDB88320 (reflected/little-endian).
// init = 0xFFFFFFFF, final XOR = 0xFFFFFFFF.
// Used as a 4-byte integrity check in the /c/i payload.

const _crc32Table = (() => {
  const t = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    t[i] = c;
  }
  return t;
})();

function crc32(bytes) {
  let crc = 0xFFFFFFFF;
  for (const b of bytes) crc = _crc32Table[(crc ^ b) & 0xFF] ^ (crc >>> 8);
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

// ── Base58 ─────────────────────────────────────────────────────────────
// Standard Bitcoin/Solana Base58 (not Base58Check).
// 軯/釨 = decode; peerr counterpart encodes.

const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const _b58Map = new Uint8Array(256).fill(255);
BASE58_ALPHABET.split('').forEach((c, i) => { _b58Map[c.charCodeAt(0)] = i; });

function base58Decode(str) {
  const bytes = [];
  let leadingZeros = 0;
  for (const c of str) {
    if (c === '1') { leadingZeros++; continue; }
    break;
  }
  const bigNum = [...str].reduce((acc, c) => {
    const digit = _b58Map[c.charCodeAt(0)];
    if (digit === 255) throw new Error('Invalid base58 char: ' + c);
    return acc * 58n + BigInt(digit);
  }, 0n);
  let n = bigNum;
  while (n > 0n) {
    bytes.unshift(Number(n & 0xFFn));
    n >>= 8n;
  }
  return new Uint8Array([...new Array(leadingZeros).fill(0), ...bytes]);
}

function base58Encode(bytes) {
  let n = 0n;
  for (const b of bytes) n = (n << 8n) | BigInt(b);
  let result = '';
  while (n > 0n) {
    result = BASE58_ALPHABET[Number(n % 58n)] + result;
    n /= 58n;
  }
  const leading = [...bytes].findIndex(b => b !== 0);
  return '1'.repeat(leading < 0 ? bytes.length : leading) + result;
}

// ── Base-X (custom alphabet slug encoder) ──────────────────────────────
// Used for the /connect/<token> path parameter (generateConnectToken).
// Alphabet: 'wrqeh3gsb2ca1pjykixvo46zf98unm57ld0t_-'  (getString(179))
// Verified: baseXEncode(UTF-8("pumpanakin.fun")) == "rvl-7raj_dhlbkx5c4dqrf"

const SLUG_ALPHABET = 'wrqeh3gsb2ca1pjykixvo46zf98unm57ld0t_-';
const _slugBase = BigInt(SLUG_ALPHABET.length);
const _slugMap  = new Map([...SLUG_ALPHABET].map((c, i) => [c, BigInt(i)]));

function baseXEncode(bytes, alphabet = SLUG_ALPHABET) {
  const base = BigInt(alphabet.length);
  let n = 0n;
  for (const b of bytes) n = (n << 8n) | BigInt(b);
  let result = '';
  while (n > 0n) {
    result = alphabet[Number(n % base)] + result;
    n /= base;
  }
  return result;
}

function baseXDecode(slug, alphabet = SLUG_ALPHABET) {
  const map  = new Map([...alphabet].map((c, i) => [c, BigInt(i)]));
  const base = BigInt(alphabet.length);
  let n = 0n;
  for (const c of slug) {
    const digit = map.get(c);
    if (digit === undefined) throw new Error('Invalid slug char: ' + c);
    n = n * base + digit;
  }
  const bytes = [];
  while (n > 0n) {
    bytes.unshift(Number(n & 0xFFn));
    n >>= 8n;
  }
  return new Uint8Array(bytes);
}

// ── Custom Base64 (kit's internal string table encoding) ───────────────
// The kit ships with a custom-ordered base64 alphabet for the string table.
// Alphabet from decode.py:
//   "43": 21, "47": 9, "48": 33, "49": 62, "50": 19, ...
// This is used ONLY for the string table / constant array bootstrap.
// Not used at runtime in the operator API (which uses standard base64).

const CUSTOM_B64_ENCODE_TABLE =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

// (Standard base64 is used for all operator API payloads at runtime.)

// ── Binary write helpers ────────────────────────────────────────────────
// 銇: write u32 LE at offset
function writeU32(buf, value, offset) {
  buf[offset]     =  value         & 0xFF;
  buf[offset + 1] = (value >>>  8) & 0xFF;
  buf[offset + 2] = (value >>> 16) & 0xFF;
  buf[offset + 3] = (value >>> 24) & 0xFF;
}

// 暞: write u16 LE at offset
function writeU16(buf, value, offset) {
  buf[offset]     =  value       & 0xFF;
  buf[offset + 1] = (value >> 8) & 0xFF;
}

// 槐: write u64 LE at offset (BigInt)
function writeU64(buf, bigintValue, offset) {
  let v = BigInt.asUintN(64, bigintValue);
  for (let i = 0; i < 8; i++) {
    buf[offset + i] = Number(v & 0xFFn);
    v >>= 8n;
  }
}

// 盇: write base58-decoded pubkey (32 bytes) at offset
function writePubkey(buf, offset, pubkeyStr) {
  const decoded = base58Decode(pubkeyStr);
  if (decoded.length !== 32) throw new Error('Not a 32-byte pubkey: ' + pubkeyStr);
  buf.set(decoded, offset);
}

// 瘟: write a length-prefixed UTF-8 string; return new offset
// String is capped at 255 bytes (单字节长度前缀, 怿())
function writeLPString(buf, offset, str) {
  if (!str) { buf[offset++] = 0; return offset; }
  const encoded = new TextEncoder().encode(str).subarray(0, 255);
  buf[offset++] = encoded.length;
  buf.set(encoded, offset);
  return offset + encoded.length;
}

// 踳: random integer in [a, b] inclusive
function randomInt(a, b) {
  return Math.round(Math.random() * (b - a) + a);
}

// ── Pack / unpack byte-array lists ─────────────────────────────────────
// 措: used for /c/f body and inner sections of /process payload.
// Format: u8 count, then per item: u16 LE length, then bytes.
function packByteArrays(list) {
  if (!list || list.length === 0) return new Uint8Array(1);
  const total = list.reduce((acc, item) => acc + item.length, 0);
  const out   = new Uint8Array(1 + list.length * 2 + total);
  out[0] = list.length;
  let offset = 1;
  for (const item of list) {
    writeU16(out, item.length, offset);
    offset += 2;
    out.set(item, offset);
    offset += item.length;
  }
  return out;
}

// ── Exports ────────────────────────────────────────────────────────────
module.exports = {
  OPERATOR_KEY_SALT,
  deriveOperatorKey,
  aesEncrypt,
  aesDecrypt,
  crc32,
  base58Decode,
  base58Encode,
  baseXEncode,
  baseXDecode,
  SLUG_ALPHABET,
  writeU32, writeU16, writeU64, writePubkey, writeLPString,
  randomInt,
  packByteArrays,
};
