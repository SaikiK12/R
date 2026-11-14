/**
 * rebuilt/core/config_parser.js
 *
 * Parser for the /api/config binary struct.
 *
 * Sources:
 *   - bundle.deobfuscated.js lines 24453–24556 (class 睞, xt() method, 牌() accessor)
 *   - decompiled/live/api_config_decoded.json (live captured config)
 *   - GAP_CLOSURE_2026-11-14.md (/api/config field offsets)
 *   - decompiled/kit/operator/backend_model.md (AES-GCM wire format)
 *
 * Wire format (from /api/config endpoint):
 *   12 bytes   AES-GCM IV
 *   N  bytes   AES-GCM ciphertext
 *
 * Key = SHA-256(apiHost + "B3ui3QZFrOPoGW7oMZgE4A")
 *
 * After AES decryption, the plaintext binary struct is:
 *
 * Binary layout (confirmed from deobfuscated bundle + live captures):
 *
 *   offset 0:     u8    total_len (number of remaining bytes in the fixed section)
 *   offset 1:     1 byte  reserved / version
 *   offset 2..1+total_len:  the struct body, indexed by DataView from offset 2
 *
 * Struct body (DataView origin = offset 2):
 *   offset 0:     u8    pubkey_count (3 in all observed configs)
 *   offset 1:     u16 LE  unknown_u16 (observed 1000)
 *   offset 3–34:  32 bytes  pubkey[0]  — target token mint (USDC)
 *   offset 35–66: 32 bytes  pubkey[1]  — receiver address
 *   offset 67–98: 32 bytes  pubkey[2]  — relay/second receiver
 *
 *   From the Fr() accessor (deob line 24470–24479):
 *     q   = pubkey at relative offset 5    (token mint)
 *     je  = pubkey at relative offset 37   (receiver)
 *     de  = pubkey at relative offset 69   (relay)
 *     g   = u8 at relative offset 101
 *     Oe  = f64 BE at relative offset 102  (min_sol parameter)
 *     ot  = f64 BE at relative offset 110  (max_sol parameter)
 *     J   = bool at relative offset 129
 *
 *   Other accessors pinned from deob lines 24461–24536:
 *     Ur()  = raw[0]              — pubkey count
 *     Br()  = readU16(raw, 1) / 1000 — unknown scalar (observed 1.0)
 *     Hr()  = raw[118]            — flag byte
 *     jr()  = raw[119]            — flag byte
 *     Kr()  = raw[120]            — flag (1 = redirect RU/UK browsers)
 *     Xt()  = raw[121]            — flag byte
 *     Yr()  = raw[132]            — flag (& 1 triggers redirect邞())
 *     Xr()  = readU16(raw, 125)   — sibling_domain string length → offset
 *     Zr()  = readString(raw, 122) — sibling_domain (connects the domain used for /connect/)
 *     Vr()  = raw[133]            — flag byte
 *     Gr()  = raw[130]            — flow control byte
 *     $r()  = !!raw[131]          — boolean flag
 *     Wr()  = raw[124]            — platform indicator byte
 *     en()  = parsed token_symbol from trailer section
 *
 * Trailer section (after the fixed struct, starts at raw[total_len+2]):
 *   Decoded by 牌() (deob line 24544) as a sequence of length-prefixed fields:
 *     field[0]  = locale strings header
 *     field[1]  = modal text array
 *     field[2]  = Qr() — probably unused/spare
 *     field[3]  = Fr() metadata (token, receivers, amounts)
 *     field[4]  = en() token symbol (e.g. "USDC")
 *     field[5]  = zr() — optional second keyed entry
 *
 * Observed live config (api_config_decoded.json):
 *   total_len:         136
 *   pubkey_count:      3
 *   unknown_u16_1000:  1000
 *   pubkey[0]:         EPjFWdd5... (USDC mint)
 *   pubkey[1]:         7VHUFJHWu... (receiver)
 *   pubkey[2]:         3emsAVdm... (relay)
 *   max_sol (f64 BE):  500.0
 *   min_sol (f64 BE):  1.0
 *   flag_u8:           1
 *   sibling_domain:    "trongame.fun"
 *   token_symbol:      "USDC"
 */

'use strict';

const { base58Encode } = require('./crypto');

/**
 * parseConfig(plaintext: Uint8Array) → config object
 *
 * Full config object fields:
 *   .pubkeyCount   — number of pubkeys
 *   .tokenMint     — target token mint address (base58)
 *   .receiver      — primary receiver address (base58)
 *   .relay         — relay/second receiver (base58)
 *   .maxSol        — maximum drain amount (f64)
 *   .minSol        — minimum drain amount (f64)
 *   .siblingDomain — connect domain hostname
 *   .tokenSymbol   — target token symbol (e.g. "USDC")
 *   .flags         — raw flag bytes {g, J, Hr, jr, Kr, Xt, Yr, Gr, $r, Vr, Wr}
 *   .raw           — original Uint8Array
 */
function parseConfig(plaintext) {
  if (!plaintext || plaintext.length < 10) {
    throw new Error('Config plaintext too short: ' + (plaintext?.length ?? 0));
  }

  const raw = plaintext;

  // The DataView is set up from offset 2 with length = raw[0]
  // (xt() method: deob lines 24454–24459)
  const totalLen = raw[0];                                // u8 at index 0
  const dv       = new DataView(raw.buffer, 2, totalLen); // DataView from offset 2

  // 甥(): read a 32-byte pubkey from raw at a given offset, return base58
  function readPubkey(offset) {
    const bytes = raw.slice(offset, offset + 32);
    return base58Encode(bytes);
  }

  // 甃(): read a u16 LE and use it as a length to read a UTF-8 string
  function readLenPrefixedString(offset) {
    const len = raw[offset] | (raw[offset + 1] << 8);
    return new TextDecoder().decode(raw.slice(offset + 2, offset + 2 + len));
  }

  // 称(): read a u16 LE value at offset in raw
  function readU16(offset) {
    return raw[offset] | (raw[offset + 1] << 8);
  }

  // Extract fields using the offsets pinned from deob lines 24470–24479
  // All offsets are relative to the FULL plaintext array (not the DataView)
  const tokenMint    = readPubkey(5);    // q   offset 5
  const receiver     = readPubkey(37);   // je  offset 37
  const relay        = readPubkey(69);   // de  offset 69
  const flagG        = raw[101];         // g   offset 101
  // Oe = getFloat64(102) — DataView is from offset 2, so DataView offset 100
  const minSol       = dv.getFloat64(100, false); // BE float64 at DataView offset 100 (= raw 102)
  const maxSol       = dv.getFloat64(108, false); // BE float64 at DataView offset 108 (= raw 110)
  const flagJ        = !!raw[129];       // J   offset 129
  const flagGr       = raw[130];         // Gr  offset 130
  const flagDollarR  = !!raw[131];       // $r  offset 131
  const flagYr       = raw[132];         // Yr  offset 132
  const flagVr       = raw[133];         // Vr  offset 133
  const flagZrLen    = !!raw[134];       // zr check: raw[134] non-zero means keyed entry follows
  const flagWr       = raw[124];         // Wr  offset 124
  const flagHr       = raw[118];         // Hr  offset 118
  const flagJr       = raw[119];         // jr  offset 119
  const flagKr       = raw[120];         // Kr  offset 120 — if set → check Yr for RU redirect
  const flagXt       = raw[121];         // Xt  offset 121

  // Sibling domain: Zr() = readString(raw, 122)
  const siblingDomain = readLenPrefixedString(122);

  // Token symbol: Xr() = readU16(raw, 125) → length → string starting at offset 127
  const tokenSymbolLen = readU16(125);
  const tokenSymbol    = new TextDecoder().decode(raw.slice(127, 127 + tokenSymbolLen));

  return {
    pubkeyCount:   raw[0],
    tokenMint,
    receiver,
    relay,
    maxSol,
    minSol,
    siblingDomain,
    tokenSymbol,
    flags: {
      g: flagG,
      J: flagJ,
      Hr: flagHr,
      jr: flagJr,
      Kr: flagKr,  // triggers Russian-redirect check when Yr & 1
      Xt: flagXt,
      Yr: flagYr,  // Yr & 1 →邞() redirect RU/UK browsers to solana.com
      Gr: flagGr,
      $r: flagDollarR,
      Vr: flagVr,
      Wr: flagWr,
    },
    raw,
  };
}

/**
 * decodeAndParse(rawBlob: Uint8Array, apiHost: string) → config
 *
 * Convenience: AES-GCM decrypt then parse.
 * rawBlob = what /api/config returns over the wire (IV + ciphertext).
 */
async function decodeAndParse(rawBlob, apiHost) {
  const { aesDecrypt } = require('./crypto');
  const plaintext = await aesDecrypt(rawBlob, apiHost);
  return parseConfig(plaintext);
}

/**
 * shouldRedirectRu(config) → boolean
 *
 * True if the loaded config has the flag combination that triggers
 * the邞() Russian-language browser redirect to solana.com.
 * Deob line 33627: config.Yr() & 1 → call邞()
 */
function shouldRedirectRu(config) {
  return !!(config.flags.Yr & 1);
}

/**
 * isBanned(config) → boolean
 *
 * True if the config's Kr() flag is set AND the Yr & 1 combination
 * also passes. Used in conjunction with /api/is-banned.
 * (deob line 33624: 嗛 && !粇() && 嗛 == 1 && !譑())
 */
function isBanned(config) {
  return !!(config.flags.Kr && config.flags.Kr === 1);
}

module.exports = { parseConfig, decodeAndParse, shouldRedirectRu, isBanned };
