# Operator Backend — API Model

Reconstructed from: live captures, deobfuscated client bundle, and binary
payload analysis. This documents the full API surface exposed by the operator
host.

---

## Base URL

`https://{apiHost}` where `apiHost` = the lure domain (pumpanakin.fun,
allocationclaim.com, etc.). The connect domain (petramon.xyz) mirrors all
endpoints.

---

## Endpoints

### `GET /api/is-banned`

Returns `"0"` (not banned) or `"1"` (banned). Per-visitor; likely keyed on
IP or ASN. Called on every page load before config fetch.

---

### `GET /api/config?tgid=N`

Returns AES-GCM encrypted config blob.

**Key:** `SHA-256(apiHost + "B3ui3QZFrOPoGW7oMZgE4A")`

**Wire format:** `12-byte IV || AES-GCM ciphertext`

**Decoded fields:**

| Offset | Type | Field | Example |
|---|---|---|---|
| 5 | 32-byte pubkey | tokenMint | USDC mint |
| 37 | 32-byte pubkey | receiver | HrmfWTNd… |
| 69 | 32-byte pubkey | relay | 7oHgTZjN… |
| 102 | f64 BE | minSol | 1.0 |
| 110 | f64 BE | maxSol | 500.0 |
| 122 | u16-len + UTF-8 | siblingDomain | "petramon.xyz" |
| 125 | u16-len + UTF-8 | tokenSymbol | "USDC" |
| 132 | u8 | Yr flag | if & 1 → locale redirect |

`?tgid=N` — when a Telegram WebApp context is present, the Telegram user ID
is appended. Allows per-user config overrides server-side.

**Cache:** raw ciphertext stored in `localStorage["_0x12"]` as base64 after
first successful fetch.

**Live decoded copy:** `data/live/cfg_decoded.json`

---

### `POST /api/visit`

Query params: `source`, `tgid`, `tgus`. Sent on page load with a 900s
cooldown (keyed in localStorage). Returns `"ok"`.

---

### `GET /api/locales?lang=X`

Returns a 10-entry JSON array of localized UI strings. Supported: en, fr, zh,
de, es, pt, it, ja, ko, ar, tr, pl, id, vi. `ru` and `uk` return 404.

Called by the bundle's `loadLocales()` function. See `data/live/l_*.json` for
all captured locale files.

---

### `POST /api/c/i` — Connect Notification

**Key:** `SHA-256(apiHost + "c" + "B3ui3QZFrOPoGW7oMZgE4A")`

**Request body (AES-GCM encrypted):**

```
bytes  0–14   15 random bytes (nonce)
bytes 15–22   u64 LE: victim SOL amount in lamports
bytes 23–54   32 bytes: victim wallet pubkey
bytes 55–N    encoded account list
bytes N–N+3   CRC32 checksum
```

**Response (binary, two branches):**

Branch A: `[session_id (u8), null, flow_modifier]`

Branch B:
```
byte  13      session_id (u8)
byte  14      flag
bytes 15–46   32 bytes: pubkey key
bytes 47–48   u16 LE: string length
bytes 49–N    UTF-8: comma-separated values (token mints or config)
returns [session_id, [pubkey_key, csv_value], flow_modifier]
```

Timeout: 16000ms.

---

### `POST /api/c/c/{sessionId}/{confirmCount}`

Confirm notification. Body: `{}` (empty JSON). `confirmCount` increments
per confirm click. Timeout: 16000ms.

---

### `POST /api/process`

Receives the partially-signed transaction (victim signature only). Server
adds treasury and receiver signatures, then broadcasts to Solana mainnet.

**Request body:**

```
bytes  0–12   13 random bytes
bytes 13–16   u32 LE: attempt counter (state.ne)
bytes 17–48   32 bytes: victim wallet pubkey
byte  49       u8: flow type (0=DRAIN, 1=SIWS, 2=SPAM)
bytes 50–51   u16 LE: tx section length
bytes 52–N    packByteArrays(signedTransactions)
N–end         packByteArrays(accountAddresses)
```

Timeout: 2500ms. After 2500ms, the client also self-broadcasts via its own
RPC (skipPreflight: true) as a fallback.

---

### `POST /api/c/f/{sessionId}` — Final Notification

Body: packed byte arrays (account list) as base64. Sent after drain completes.
Timeout: 2500ms.

---

### `POST /api/handler` — Telemetry

**Key:** `SHA-256(apiHost + "log" + "B3ui3QZFrOPoGW7oMZgE4A")`

AES-GCM encrypted event stream. keepalive: true. Full binary layout: see
`docs/kit-overview.md` section 6, or `data/core/operator/telemetry.js`.

Event kinds: 0=popup, 1=connect, 2=sign, 3=complete, 4=pre-sign.

Rate limits: 5s per kind; kind 4 sent once; 2500ms debounce; 5 retries / 150ms backoff.

---

### `GET /api/stats` (server-side only)

Returns 422 VALIDATION without params. No reference in the deobfuscated
client bundle — server tooling only. Parameters unknown. Status: OPEN.

---

## AES-GCM Key Derivation Summary

| Purpose | Key Input |
|---|---|
| Config (`/api/config`) | `SHA-256(apiHost + salt)` |
| Connect payload (`/c/i`) | `SHA-256(apiHost + "c" + salt)` |
| Telemetry (`/api/handler`) | `SHA-256(apiHost + "log" + salt)` |

Salt: `B3ui3QZFrOPoGW7oMZgE4A` (embedded in bundle string table, never rotated).

---

## Comparison to Inferno Kit Config Model

Both kits use an operator-push config mechanism (Inferno: config JSON files;
hexfomo: AES-GCM binary blob via `/api/config`). The affiliate-facing knobs
(receiver addresses, token target, amount range) are structurally identical
in purpose. The hexfomo kit additionally provides per-Telegram-user override
capability via `?tgid=N`. Reference configs for Inferno: `archive/ext/a2_cfg/`.
