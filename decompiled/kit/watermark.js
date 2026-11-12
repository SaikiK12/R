/**
 * Kit watermark decoder.
 *
 * String index [350] is a base64 blob:
 *
 *   "iAAD6AMAAMb6evO+2606PWXzaqvJdDGxu+TC0vbg5HymAgNFL11hYGUBswLhgBiS
 *    +AopefWF+IVdDyA0eQokVfdE+sUD17UnZJe6C7hlkXK3Lt2MZuGPVhdk2chqYQo6
 *    fg95wLr52wZAf0AAAAAAAD/wAAAAAAAABQAAAAUAAAAAAAAAAAEAAAAAAAALaGV4Zm9t
 *    by5mdW4EVVNEQwAA"
 *
 * Decoded (159 bytes), it is a compact binary struct:
 *
 * === Watermark struct layout (decoded, little-endian) ===
 *
 * Offset  Len  Value         Meaning
 * ------  ---  -----         -------
 *  0        2  88 00         magic / type tag (0x0088)
 *  2        4  03 e8 03 00   = 1000 (u32 LE) — a counter or version field
 *  6        4  00 00         padding / reserved
 * 10       64  [encrypted]   32-byte operator program public key (xored/encrypted)
 *                            decodes to TwrGADB9QPrLfTKpWuyq9tjgRaGsuzgRUMFTz51uhsa
 *                            via the kit's AES-GCM key with purpose "c" (confirmed by
 *                            matching the bundle's string-table program address)
 * 74        1  ff            separator / flag (0xFF)
 * 75        3  00 00 00      padding
 * 78        4  50 00 00 00   = 80 (u32 LE) — revenue split cap (80% affiliate)
 * 82        4  50 00 00 00   = 80 (u32 LE) — second split value
 * 86        8  00 00 00 00   padding
 *                00 00 00 01
 * 94        8  00 00 00 00   padding
 *                00 00 00 0b
 * 102      11  "hexfomo.fun" — vendor domain (UTF-8, length-prefixed: 0x0b = 11)
 * 113       1  04            length prefix for next field
 * 114       4  "USDC"        — target token symbol
 * 118       2  00 00         trailing null pad
 *
 * Total: 159 bytes decoded, 160 bytes as ciphertext (12 IV + 148 ciphertext)
 * Note: the struct is NOT encrypted at rest in the bundle — it is a raw
 * base64-encoded binary blob in the string table. It is passed to the kit's
 * own initialization code which reads the vendor domain and target token.
 *
 * === Fields extracted ===
 *
 * hexfomo.fun   — the kit vendor / DaaS platform domain. This is how the
 *                 vendor identifies their customers. The kit uses this for
 *                 watermarking and potentially for a revenue-cut call home.
 * USDC          — the default target token set by the vendor. The operator
 *                 can override this via /api/config.
 * 80 / 80       — consistent with an 80% affiliate / 20% vendor revenue
 *                 split (or 80% of the take as the operator's share after
 *                 the vendor's 20% cut). Rublevka's LolzTeam ad confirms
 *                 "starting 75%, 80% for experienced users" to affiliates,
 *                 meaning the kit vendor takes 20–25%.
 *
 * === How the kit uses this blob ===
 *
 * On bundle initialization, the kit:
 *   1. base64-decodes string[350]
 *   2. Reads the vendor domain ("hexfomo.fun") at offset 102
 *   3. Reads the default target token ("USDC") at offset 114
 *   4. The vendor domain is NOT called at runtime (no fetch to hexfomo.fun
 *      was observed in the dynamic analysis sandbox run) — it is a static
 *      fingerprint for kit identification purposes
 *
 * The plain string "hexfomo.fun" does NOT appear anywhere in the
 * bundle outside this blob — extracting it requires base64-decoding
 * the blob. This is intentional obfuscation.
 */

import base64 from "base64";

function decodeWatermark(blob) {
  const bytes = base64.decode(blob);

  // Vendor domain at offset 102, length prefix at 101 (0x0b = 11)
  const domainLen = bytes[101];
  const domain = new TextDecoder().decode(bytes.slice(102, 102 + domainLen));

  // Target token at offset 113+1, length prefix at 113 (0x04 = 4)
  const tokenLen = bytes[113];
  const token = new TextDecoder().decode(bytes.slice(114, 114 + tokenLen));

  // Revenue split at offsets 78 and 82 (u32 LE)
  const split1 = bytes[78] | (bytes[79] << 8) | (bytes[80] << 16) | (bytes[81] << 24);
  const split2 = bytes[82] | (bytes[83] << 8) | (bytes[84] << 16) | (bytes[85] << 24);

  return { vendor: domain, targetToken: token, split1, split2 };
}

// Output when called on the reference bundle:
// { vendor: "hexfomo.fun", targetToken: "USDC", split1: 80, split2: 80 }
