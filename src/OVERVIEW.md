# Kit Architecture — Full System Narrative

Reconstructed from: static deobfuscation, live dynamic analysis, real mainnet
transactions, and all decompiled components. This is the authoritative
single-document answer to "how does the whole machine work."

---

## Overview

The kit is a **Drainer-as-a-Service** (DaaS) product vendor-branded
`hexfomo.fun`, deployed by affiliates under the Rublevka traffer method.
One JS bundle (`index.js`, 1,034,759 bytes, JS-Confuser obfuscated, version
`1.18.4`) runs identically on 47+ lure domains. The bundle is never
rebuilt between campaigns — only the lure HTML and the `/api/config`
receiver addresses change.

```
AFFILIATE TRAFFIC (X/Telegram posts → lure page)
        │
        ▼
   LURE PAGE             pumpanakin.fun (Trump COIN → ClaimFreeSOL)
   /_nuxt/assets/index.js  ← the kit (same SHA-256 everywhere)
        │  GET /api/is-banned → GET /api/config?tgid=N → POST /api/visit
        ▼
   WEB3MODAL (AppKit)      victim picks wallet
        │  desktop: 360×450 popup to connect domain (petramon.xyz)
        │  mobile: embedded flow + deep-links
        ▼
   BALANCE GATE
        │  Solflare API: portfolio + SOL balance check
        │  < ~0.60 SOL → "insufficient balance" screen
        │  exclusion set (6 addresses) → "target account" screen
        ▼
   PORTFOLIO SCAN          Solflare v3/portfolio/tokens + v2/portfolio/stake
        │  token list (SPL + Token-2022 + LP tokens)
        │  native stake accounts (inactive/deactivating only)
        ▼
   POST /api/c/i           connect notification (AES-GCM encrypted)
        │  server returns: sessionId + decoy config + flow type
        ▼
   FAKE CONFIRM DIALOG     kit's own UI (NOT the wallet)
        │  shows: "+1 SOL, +500 USDC incoming" (from decoy legs)
        │  plays: /_nuxt/media/refund.webm (social proof)
        │  Phantom-spoof safety copy ("this app is recognized as safe")
        ▼
   VICTIM SIGNS            wallet.signTransaction(drainTx)
        │  wallet preview: "+1 SOL incoming, +500 USDC incoming"
        │  the real drain is hidden in the operator program CPI
        ▼
   POST /api/process        partially-signed tx → server
        │  server adds: treasury signature + receiver signature
        │  server broadcasts fully-signed tx to Solana mainnet
        ▼
   SOLANA MAINNET (atomic):
        │  marker ix:   ASCII campaign tag written permanently (affiliate ledger)
        │  token ixs:   operator program drains all SPL/Token-2022 tokens
        │  decoy legs:  treasury "sends" 1 SOL + relay "sends" 500 USDC to victim
        │               (net zero — same operator cluster owns both)
        │  disc 0x15:   splits victim's SOL: X% → receiver, (100-X)% → collector
        ▼
   TREASURY accumulates    DvTqmF7u: 17,057 SOL + 1.02M USDC (2026-11-11)
   COLLECTOR accumulates   6cwsqBqm: developer's 20-25% cut per drain
```

---

## Component map

### 1. `core/crypto.js` — All cryptographic primitives

| Function | Purpose |
|---|---|
| `deriveOperatorKey(purpose)` | SHA-256(purpose + salt) → AES-GCM CryptoKey. Cached. |
| `aesEncrypt(plaintext, purpose)` | 12-byte IV + AES-GCM ciphertext |
| `aesDecrypt(blob, purpose)` | AES-GCM decrypt. Used for /api/config and /api/handler |
| `crc32(bytes)` | CRC32 for /c/i payload integrity check |
| `base58Decode/Encode` | Solana pubkey encoding |
| `baseXEncode/Decode(slug, alphabet)` | connect token encode/decode (`/connect/<slug>`) |
| `packByteArrays(list)` | u8 count + per item u16 len + bytes. Used in /process and /c/f |
| `writeU32/U16/U64/Pubkey/LPString` | Binary serialization helpers |

**Key salt**: `B3ui3QZFrOPoGW7oMZgE4A` (幦) — embedded in bundle string table.
**Key purposes**:
- `apiHost` → decrypt `/api/config`
- `apiHost + "c"` → encrypt `/c/i` body
- `apiHost + "log"` → encrypt `/api/handler` body

---

### 2. `core/state.js` — Session state machine

The central session object (original: `屭`/`信()`):

```javascript
{
  b: { e: "victimPubkey", name: "Phantom", Ge: 0 }, // wallet
  c: { Se: "pumpanakin.fun", Ne: {} },               // config
  K: 500_000_000_000n,   // 500 SOL in lamports (from /api/config maxSol)
  he: { be: 0, ie: false, lr: [...], Fe: [...] },    // flow entry
  ne: 0,                  // attempt counter (sent in /process header)
  sessionId: 42,          // from /c/i response
}
```

Flow types:
- `0` = DRAIN — standard token+SOL drain
- `1` = SIWS — Sign-In-With-Solana verify (precedes drain)
- `2` = SPAM — 200-tx mass-sign flood

---

### 3. `core/config_parser.js` — /api/config binary parser

Wire: `12-byte IV || AES-GCM ciphertext`. Key: `SHA-256(apiHost + salt)`.

**Key config fields** (confirmed from deobfuscated bundle line 24453):

| Field | Offset | Type | Example |
|---|---|---|---|
| tokenMint | 5 | 32-byte pubkey | USDC mint |
| receiver  | 37 | 32-byte pubkey | HrmfWTNd... |
| relay     | 69 | 32-byte pubkey | 7oHgTZjN... |
| minSol    | 102 | f64 BE | 1.0 |
| maxSol    | 110 | f64 BE | 500.0 |
| siblingDomain | 122 | u16-len + UTF-8 | "petramon.xyz" |
| tokenSymbol | 125 | u16-len + UTF-8 | "USDC" |
| Yr flag   | 132 | u8 | if & 1 → redirect RU/UK |

**NEW (from deobfuscation)**: `GET /api/config?tgid=N` — Telegram user ID
passed when available, allows per-user config server-side.

**Cache**: raw ciphertext stored in `localStorage["_0x12"]` as base64.
On return visits, `菣()` reads and decrypts the cache without a network call.

---

### 4. `operator/client.js` — All 7 operator endpoints

| Method | Endpoint | Timeout | Purpose |
|---|---|---|---|
| `fetchConfig` | GET /api/config?tgid=N | 3000ms | Live receiver addresses + params |
| `isBanned` | GET /api/is-banned | 2500ms | Per-visitor IP/ASN blocklist |
| `fetchLocales` | GET /api/locales?lang=X | 2500ms | Modal strings (server tooling only) |
| `notifyConnect` | POST /api/c/i | 16000ms | Victim wallet + portfolio; returns sessionId |
| `notifyConfirm` | POST /api/c/c/{a}/{b} | 16000ms | Victim clicked Confirm |
| `submitProcess` | POST /api/process | 2500ms | Partially-signed tx → server completes |
| `notifyFinal` | POST /api/c/f/{a} | 2500ms | Drain complete, account list |

(+ undocumented operator-side: `GET /api/stats` → 422 without params)

---

### 5. `operator/payloads.js` — Binary payload builders

**`buildConnectPayload`** (/c/i plaintext, 59+ bytes):
```
0–14:  15 random bytes
15–22: u64 LE lamports (state.K)
23–54: 32-byte victim pubkey
55–N:  encodeAccounts(he.lr)
N–N+3: CRC32 checksum
```

**`buildProcessPayload`** (/process body, 52+ bytes):
```
0–12:  13 random bytes
13–16: u32 LE attempt counter (state.ne)
17–48: 32-byte victim pubkey
49:    u8 flow type (he.be)
50–51: u16 LE tx section length
52–N:  packByteArrays(signedTransactions)
N–end: packByteArrays(accountAddresses decoded)
```

---

### 6. `operator/telemetry.js` — /api/handler binary event format

AES-GCM key: `SHA-256(apiHost + "log" + salt)`. keepalive: true.

**Binary layout** (侔(), ALL FIELDS NOW FULLY DECODED):
```
u8 event_kind
LP string: version ("1.18.4")
u32: 4 random padding bytes
u8 tg_present
  if tg_present: u64 tg.id + LP string tg.username
LP string: wallet name
32 bytes: victim pubkey
u8: Ge (wallet connection type)
7 bytes: random padding
u64 LE: ve * 1e9 (SOL in lamports)
u8: token count
  N × 64 bytes: encoded token pubkeys
i32 LE: Mr * 10000 (portfolio SOL value at event time)
u8: ie flag (insufficient balance shown)
u8: ut flag (user-triggered variant)
LP string: origin (lure host if != api host)
LP string: un (navigator.language[:5])
bytes: ee (encoded token list)
```

**Rate limits**: 5s per kind; kind 4 sent once; 2500ms debounce; 5 retries / 150ms backoff.

---

### 7. `chain/rpc.js` — 8-endpoint Solana RPC client

Failover order: 4 Helius (rate-limited 429 on burn), PublicNode, MagicEden,
SolanaTracker, Mainnet-Beta. 2500ms timeout. User-Agent = victim wallet address.
`sendTransaction` uses `skipPreflight: true`.

**Leaked Helius API keys** (embedded in bundle string table):
- `0b9f580f-8102-4b89-928b-8770a62771f0`
- `2dfa2086-c6cd-4cb4-8a13-08ecdee36a0f`
- `3a1ca16d-e181-4755-9fe7-eac27579b48c`
- `777d85c0-fefd-42a0-b290-8b1b3704fe90`

---

### 8. `chain/tx_builders.js` — Drain transaction assembly

The full drain transaction (observed in real mainnet txs):

```
ix[0]  ComputeBudget.SetComputeUnitLimit(N)
ix[1]  ComputeBudget.SetComputeUnitPrice(microlamports)
ix[2]  TwrGADB9 disc 0x00  — MARKER: "1kd1mz4r-|1|" (affiliate ledger, forever on-chain)
ix[3+] TwrGADB9 disc 0x02  — TOKEN SWEEP: CPI drains each token account
ix[N]  SystemProgram.Transfer — DECOY: treasury→victim 1 SOL (+1 SOL preview)
ix[N+1] ATA.CreateIdempotent  — SETUP: victim's target token ATA
ix[N+2] Token.Transfer        — DECOY: relay→victim 500 USDC (+500 USDC preview)
ix[N+3] TwrGADB9 disc 0x15 args[0x02, pct] — SOL SPLIT: victim loses SOL
                                              X% → per-campaign receiver
                                              (100-X)% → collector 6cwsqBqm
```

**Why the wallet shows "+1 SOL, +500 USDC"**: the decoy legs (treasury + relay)
are structured to appear as incoming transfers in the wallet preview, while the
actual drain is a CPI through the operator program that the wallet can't easily
display.

**Lighthouse defense bypass**: confirmed in real tx. The kit passes
Lighthouse outer-balance assertions because the decoy legs make the OUTER balance
positive (+1 SOL, +500 USDC). The actual drain is a CPI-side token decrease.
Only CPI-scoped assertions would catch this flow.

---

### 9. `page/runtime.js` — Full flow orchestrator

The full 25-step kill chain is documented in that file's comments.

Key architectural points:
- **Russian/Ukrainian redirect**: `邞()` checks `navigator.language` for `ru-*`
  or `*-ru` and redirects to `solana.com` immediately. ← NEW finding from deobfuscation.
- **Config cache**: raw AES-GCM ciphertext cached in `_0x12`. Decrypted on
  page load without network on return visits.
- **Attempt counter** (`state.ne`): incremented on every `/api/process` call.
  Server uses it to detect multi-attempt victims.
- **Self-broadcast fallback**: 2500ms after `/api/process`, kit self-broadcasts
  via its own RPC. Ensures tx lands even if operator's submit fails.
- **3-signer requirement**: victim + treasury (DvTqmF7u) + receiver. The victim
  provides 1 signature; the operator provides 2 server-side via `/api/process`.

---

## What the operator controls without rebuilding the kit

| Control lever | Mechanism |
|---|---|
| Receiver addresses | Rotate `/api/config` ciphertext; kit reads on every page load |
| Target token | Update `/api/config` token mint field |
| Min/max SOL amounts | Update `/api/config` float fields |
| Connect domain | Update `/api/config` sibling_domain field |
| Which visitors get banned | Backend IP/ASN list behind `/api/is-banned` |
| Per-Telegram-user config | Serve different config blob for `?tgid=N` |
| Affiliate campaign tag | Encoded in the marker instruction per deploy |
| Revenue split | 0x50 = 80% affiliate / 20% vendor in disc 0x15 arg byte |
| Locale strings | 14-language arrays behind `/api/locales` (never called by browser) |

---

## Durable IOCs (survive domain rotation)

| IOC | Value | Why durable |
|---|---|---|
| Operator program | `TwrGADB9...` | On-chain, can only be replaced by upgrade authority |
| Treasury | `DvTqmF7u...` | Hard-coded in bundle string table |
| Collector | `6cwsqBqm...` | Hard-coded in bundle string table |
| AES key salt | `B3ui3QZFrOPoGW7oMZgE4A` | Embedded in bundle |
| Kit version | `1.18.4` | In every telemetry event |
| Bundle SHA-256 | `0735606691...` | Identical across all 47+ domains |
| Helius API keys | 4 keys in string table | Leaked from bundle |
| Affiliate campaign tags | on-chain in every drain tx | Permanent ledger |
