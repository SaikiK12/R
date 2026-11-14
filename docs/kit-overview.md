# Kit Architecture — Full System Narrative

Reconstructed from: static deobfuscation, live dynamic analysis, real mainnet
transactions, and all decompiled components. Single-document answer to "how
does the whole machine work."

---

## Overview

The kit is a Drainer-as-a-Service (DaaS) product, vendor-branded `hexfomo.fun`,
deployed by affiliates under the Rublevka traffer method. One JS bundle
(`index.js`, 1,034,759 bytes, JS-Confuser obfuscated, version `1.18.4`) runs
identically on 60+ lure domains. The bundle is never rebuilt between campaigns —
only the lure HTML and the `/api/config` receiver addresses change.

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
        │  plays: /_nuxt/media/refund.webm
        │  Phantom-spoof safety copy
        ▼
   VICTIM SIGNS            wallet.signTransaction(drainTx)
        │  wallet preview: "+1 SOL incoming, +500 USDC incoming"
        │  drain is embedded in the operator program CPI
        ▼
   POST /api/process        partially-signed tx → server
        │  server adds: treasury signature + receiver signature
        │  server broadcasts fully-signed tx to Solana mainnet
        ▼
   SOLANA MAINNET (atomic):
        │  marker ix:   ASCII campaign tag (affiliate ledger, permanent)
        │  token ixs:   operator program drains all SPL/Token-2022 tokens
        │  decoy legs:  treasury "sends" 1 SOL + relay "sends" 500 USDC
        │               (net zero — same operator cluster owns both)
        │  disc 0x15:   splits victim's SOL: X% → receiver, rest → collector
        ▼
   TREASURY accumulates    DvTqmF7u: 17,057 SOL + 1.02M USDC (2026-11-11)
   COLLECTOR accumulates   6cwsqBqm: developer's 20–25% cut per drain
```

---

## Component Map

### 1. `data/core/` — Cryptographic Primitives (`crypto.js`)

| Function | Purpose |
|---|---|
| `deriveOperatorKey(purpose)` | SHA-256(purpose + salt) → AES-GCM CryptoKey (cached) |
| `aesEncrypt(plaintext, purpose)` | 12-byte IV + AES-GCM ciphertext |
| `aesDecrypt(blob, purpose)` | Decrypt `/api/config` and `/api/handler` bodies |
| `crc32(bytes)` | Integrity check for `/c/i` payload |
| `base58Decode/Encode` | Solana pubkey encoding |
| `baseXEncode/Decode` | Connect token encode/decode (`/connect/<slug>`) |
| `packByteArrays(list)` | Serializes account lists for `/process` and `/c/f` |
| `writeU32/U16/U64/Pubkey/LPString` | Binary serialization helpers |

**Key salt**: `B3ui3QZFrOPoGW7oMZgE4A` — embedded in bundle string table.

**Key purposes**:
- `apiHost` → decrypt `/api/config`
- `apiHost + "c"` → encrypt `/c/i` body
- `apiHost + "log"` → encrypt `/api/handler` body

---

### 2. Session State (`state.js`)

The central session object:

```javascript
{
  b: { e: "victimPubkey", name: "Phantom", Ge: 0 }, // wallet
  c: { Se: "pumpanakin.fun", Ne: {} },               // config
  K: 500_000_000_000n,   // 500 SOL in lamports
  he: { be: 0, ie: false, lr: [...], Fe: [...] },    // flow entry
  ne: 0,                  // attempt counter
  sessionId: 42,          // from /c/i response
}
```

Flow types: `0` = DRAIN, `1` = SIWS (Sign-In-With-Solana precedes drain),
`2` = SPAM (200-tx mass-sign).

---

### 3. Config Parser (`config_parser.js`)

Wire format: `12-byte IV || AES-GCM ciphertext`. Key: `SHA-256(apiHost + salt)`.

**Key config fields**:

| Field | Offset | Type | Example |
|---|---|---|---|
| tokenMint | 5 | 32-byte pubkey | USDC mint |
| receiver | 37 | 32-byte pubkey | HrmfWTNd… |
| relay | 69 | 32-byte pubkey | 7oHgTZjN… |
| minSol | 102 | f64 BE | 1.0 |
| maxSol | 110 | f64 BE | 500.0 |
| siblingDomain | 122 | u16-len + UTF-8 | "petramon.xyz" |
| tokenSymbol | 125 | u16-len + UTF-8 | "USDC" |
| Yr flag | 132 | u8 | if & 1 → redirect ru-*/uk-* locales |

Config is cached: raw ciphertext stored in `localStorage["_0x12"]` as base64.
On return visits, the cache is decrypted without a network call.

---

### 4. Operator API (`operator/client.js`) — 7 Endpoints

| Method | Endpoint | Timeout | Purpose |
|---|---|---|---|
| `fetchConfig` | GET /api/config?tgid=N | 3000ms | Live receiver addresses + params |
| `isBanned` | GET /api/is-banned | 2500ms | Per-visitor IP/ASN check |
| `fetchLocales` | GET /api/locales?lang=X | 2500ms | Modal strings (server tooling only) |
| `notifyConnect` | POST /api/c/i | 16000ms | Victim wallet + portfolio; returns sessionId |
| `notifyConfirm` | POST /api/c/c/{a}/{b} | 16000ms | Victim clicked Confirm |
| `submitProcess` | POST /api/process | 2500ms | Partially-signed tx → server completes |
| `notifyFinal` | POST /api/c/f/{a} | 2500ms | Drain complete, account list |

(Server-side only: `GET /api/stats` → 422 without params)

---

### 5. Binary Payload Builders (`operator/payloads.js`)

**`buildConnectPayload`** (59+ bytes):
```
0–14:  15 random bytes
15–22: u64 LE lamports (state.K)
23–54: 32-byte victim pubkey
55–N:  encodeAccounts(he.lr)
N–N+3: CRC32 checksum
```

**`buildProcessPayload`** (52+ bytes):
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

### 6. Telemetry (`operator/telemetry.js`) — `/api/handler` Event Format

AES-GCM key: `SHA-256(apiHost + "log" + salt)`. keepalive: true.

Binary layout (fully decoded):
```
u8               event_kind
LP string        version ("1.18.4")
u32              4 random padding bytes
u8               tg_present
  if tg_present: u64 tg.id + LP string tg.username
LP string        wallet name
32 bytes         victim pubkey
u8               Ge (wallet connection type)
7 bytes          random padding
u64 LE           SOL in lamports
u8               token count
  N × 64 bytes   encoded token pubkeys
i32 LE           Mr * 10000 (portfolio SOL value)
u8               ie flag (insufficient balance shown)
u8               ut flag (user-triggered variant)
LP string        origin
LP string        navigator.language[:5]
bytes            encoded token list
```

Rate limits: 5s per kind; kind 4 sent once; 2500ms debounce; 5 retries / 150ms backoff.

---

### 7. Solana RPC Client (`chain/rpc.js`)

8-endpoint failover: 4 Helius (rate-limited on burn), PublicNode, MagicEden,
SolanaTracker, Mainnet-Beta. 2500ms timeout. User-Agent = victim wallet address.
`sendTransaction` uses `skipPreflight: true`.

**Helius API keys embedded in bundle string table:**
- `0b9f580f-8102-4b89-928b-8770a62771f0`
- `2dfa2086-c6cd-4cb4-8a13-08ecdee36a0f`
- `3a1ca16d-e181-4755-9fe7-eac27579b48c`
- `777d85c0-fefd-42a0-b290-8b1b3704fe90`

---

### 8. Transaction Assembly (`chain/tx_builders.js`)

The drain transaction structure (observed in real mainnet transactions):

```
ix[0]  ComputeBudget.SetComputeUnitLimit(N)
ix[1]  ComputeBudget.SetComputeUnitPrice(microlamports)
ix[2]  TwrGADB9 disc 0x00  — MARKER: "1kd1mz4r-|1|" (affiliate ledger)
ix[3+] TwrGADB9 disc 0x02  — TOKEN SWEEP: CPI drains each token account
ix[N]  SystemProgram.Transfer — DECOY: treasury→victim 1 SOL
ix[N+1] ATA.CreateIdempotent  — SETUP: victim's target token ATA
ix[N+2] Token.Transfer        — DECOY: relay→victim 500 USDC
ix[N+3] TwrGADB9 disc 0x15 args[0x02, pct] — SOL SPLIT
                                              X% → per-campaign receiver
                                              (100-X)% → collector 6cwsqBqm
```

Wallet shows "+1 SOL, +500 USDC" because the decoy legs appear as incoming
transfers in the wallet preview. The actual drain is a CPI through the operator
program, below the outer instruction level. See `archive/prog/lighthouse.md`
for why outer-balance assertions pass.

---

### 9. Page Runtime (`page/runtime.js`)

Key behaviors:
- **Locale redirect**: checks `navigator.language` for `ru-*` or `*-ru` and
  redirects to `solana.com` immediately (operator region exclusion).
- **Config cache**: raw AES-GCM ciphertext cached in `_0x12`. Decrypted on
  page load without network on return visits.
- **Attempt counter** (`state.ne`): incremented on every `/api/process` call.
- **Self-broadcast fallback**: 2500ms after `/api/process`, kit self-broadcasts
  via its own RPC with `skipPreflight: true`.
- **3-signer requirement**: victim + treasury + receiver. Victim provides 1
  signature; operator provides 2 server-side via `/api/process`.

---

## Operator Control Surface

| Lever | Mechanism |
|---|---|
| Receiver addresses | Rotate `/api/config` ciphertext; re-read on every page load |
| Target token | Update `/api/config` token mint field |
| Min/max SOL amounts | Update `/api/config` float fields |
| Connect domain | Update `/api/config` sibling_domain field |
| Visitor bans | Backend IP/ASN list behind `/api/is-banned` |
| Per-Telegram-user config | Serve different config blob for `?tgid=N` |
| Affiliate campaign tag | Encoded in the marker instruction per deploy |
| Revenue split | 0x50 = 80% affiliate / 20% vendor in disc 0x15 arg byte |
| Locale strings | 14-language arrays behind `/api/locales` (server tooling only) |

---

## Durable Identifiers (Survive Domain Rotation)

| Identifier | Value |
|---|---|
| Bundle SHA-256 | `0735606691bbdf35d38d7531c0e48363a21ef6f7224ebce2908a1b487f9ea6a2` |
| Operator program | `TwrGADB9QPrLfTKpWuyq9tjgRaGsuzgRUMFTz51uhsa` |
| Treasury | `DvTqmF7u…` |
| Collector | `6cwsqBqm…` |
| AES key salt | `B3ui3QZFrOPoGW7oMZgE4A` |
| Kit version string | `1.18.4` |
| Helius API keys | 4 keys in bundle string table |
| Affiliate campaign tags | On-chain in every transaction (permanent ledger) |
