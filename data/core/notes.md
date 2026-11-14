# data/core/ — Bundle Reconstruction

The deobfuscated bundle splits into three layers. Reconstructed source files
are organized to match that split.

```
victim browser                          operator host              Solana
─────────────                           ─────────────              ──────

page/                                   GET /api/locales?lang=
  runtime.js      polyfills
  params.js       source/host detect
  visit.js      ─────────────────────►  POST /api/visit
                                        GET /api/is-banned
                                        GET /api/config → AES-GCM blob

  [Connect wallet]  fake modal, localized
  amount.js       amount 0.001..1,000,000

operator/
  client.js
    /c/i          ──AES-GCM────────►   POST /api/c/i  → binary session
  payloads.js     layouts, AES-GCM
  telemetry.js    ──AES-GCM────────►   POST /api/handler (events, retry)

  [Sign transaction]  wallet signs the drain tx
chain/
  submit.js
                  ──/process────────►  POST /api/process (signed txs)
                  ──────────────────────────────────────────────►
                  RPC sendTransaction, skipPreflight, +2.5s delay
  rpc.js          8-endpoint failover (Helius keys + public RPCs)
  solflare.js     victim portfolio valuation (Solflare backend)

  client.js
    /c/c/{a}/{b}                       confirm notification
    /c/f/{a}                           final notification
```

## Directory Map

### `page/` — Runs on the lure page before and during wallet interaction

| File | Purpose |
|---|---|
| `runtime.js` | Polyfills: `AbortSignal["Be"]`, `Promise.withResolvers`, `String/Array.prototype.at` |
| `params.js` | `readCampaignSource()` and `pageHost()` — campaign source tracking and connect domain slug decode |
| `visit.js` | `sendVisit()` — `POST /api/visit?source=…&tgid=…&tgus=…` with 900s cooldown |
| `telegram.js` | Telegram WebApp detection; extracts tg user id + username |
| `mobile.js` | `isMobile()`, `openConnectPopup()` — 360×450 popup, `generateConnectToken()` |
| `check.js` | `isBanned()`, `loadLocales()` — ban check and locale fetch |
| `amount.js` | `setSolAmount()` — validates amount ∈ [0.001, 1,000,000] |
| `siws.js` | `buildSiwsMessage()` — SIWS EIP-4361 message; `canSignAll()` — 200-tx flow check |
| `gate.js` | `checkWallet()` — SOL balance gate; 6-pubkey exclusion set |
| `state.js` | Session object; flow type bytes; error/retry messages; video paths |
| `dom.js` | 36-entry pitch dictionary; DOMContentLoaded injection; obfuscation |
| `modal.js` | Fake confirm dialog rendering and countdown |
| `deeplinks.js` | 20+ wallet deep-link table; mobile connect URL construction |
| `deeplinks_ext.js` | Extended wallet deep-link families |

### `operator/` — Talks to `https://{apiHost}`

| File | Purpose |
|---|---|
| `client.js` | `OperatorClient` class; all 7 endpoints with retry logic |
| `payloads.js` | Binary builders: `buildProcessPayload()`, `buildConnectPayload()`, `encodeAccounts()` |
| `telemetry.js` | `sendEvent()` — `/api/handler` AES-GCM events; rate limiting; 5-attempt retry |

### `chain/` — Talks to Solana

| File | Purpose |
|---|---|
| `rpc.js` | 8-endpoint failover RPC; wallet address as User-Agent; 2.5s timeout |
| `solflare.js` | Portfolio scan (Solflare free backend); Token-2022 and fee extension detection |
| `jupiter.js` | Token pricing (5 Jupiter API keys; rotate on 429) |
| `submit.js` | `submitSignedTransactions()` — POST to `/process` + self-broadcast fallback |
| `tx_builders.js` | Drain tx assembly: ComputeBudget, marker, operator program calls, vault PDA |
| `tokens.js` | Token-2022/TransferCheckedWithFee; pump.fun bonding curve; LP detection |
| `stake.js` | Native Stake account processing; 23 stake pool addresses |

### `vendor.js`

Decodes string[350] blob: vendor domain `hexfomo.fun`, default target token
`USDC`, revenue split values (80/80).

## Operator Config — Live Values

The live config push (`GET /api/config`, AES-GCM) supplies: target token
(USDC mint), two receiver addresses, amount parameters (observed 500.0 / 1.0
SOL), and a sibling domain. Receivers in the live config differ from the
hard-coded bundle addresses — the operator rotates receivers without rebuilding.
Decoded copy: `data/live/cfg_decoded.json`.

## Locale Strings — 14 Languages

As of 2026-11-12: **en, fr, zh, de, es, pt, it, ja, ko, ar, tr, pl, id, vi**
return 200. `ru` and `uk` return 404 (consistent with the locale redirect in
the bundle). All locale files: `data/live/l_*.json`.

The 10-entry array structure is identical across all languages.
