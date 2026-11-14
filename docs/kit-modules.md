# Kit Modules — Reconstruction Index

The deobfuscated bundle (`data/deobfuscated/bundle.deobfuscated.js`,
34,134 lines, 1.4 MB) splits into three layers. Source files are under
`data/core/`.

---

## `page/` — Lure Page Layer

Runs in the victim's browser before and during wallet interaction.

| File | Purpose |
|---|---|
| `runtime.js` | Polyfills: `AbortSignal["Be"]` (timeout), `Promise.withResolvers`, `String/Array.prototype.at` |
| `params.js` | `readCampaignSource()` — localStorage `_0x6` → utm_source → referrer; `pageHost()` — slug decode from `&d=` or `/connect/` path |
| `visit.js` | `sendVisit()` — `POST /api/visit?source=…&tgid=…&tgus=…` with 900s cooldown |
| `telegram.js` | `isTelegramWebView()`, `getTelegramUser()`, `getTelegramContext()` — Telegram WebApp detection; extracts tg user id + username for `/api/visit` |
| `mobile.js` | `isMobile()` — UA + innerWidth check; `openConnectPopup()` — 360×450 popup to connect domain; `generateConnectToken()` — base-x slug encoding of pageHost |
| `check.js` | `isBanned()` — `GET /api/is-banned`; `loadLocales()` — `GET /api/locales` with en/fr/zh fallback |
| `amount.js` | `setSolAmount()` — validates amount ∈ [0.001, 1,000,000], stores in `state.K` |
| `siws.js` | `buildSiwsMessage()` — SIWS EIP-4361 message template; `canSignAll()` — checks `solana:signAllTransactions` for 200-tx flow |
| `gate.js` | `checkWallet()` — SOL balance gate (insufficient / watch address / target); 6-pubkey exclusion set |
| `state.js` | Session object structure; flow type bytes (0=drain, 1=SIWS, 2=200tx); error/retry messages; video paths; Phantom-spoof modal copy |
| `dom.js` | 36-entry pitch dictionary; DOMContentLoaded injection; zero-width/homoglyph/split-literal obfuscation |
| `deeplinks.js` | 20+ wallet deep-link table; mobile connect URL construction; Chrome nag; App Store URL builder |
| `deeplinks_ext.js` | Extended deep-link handling for additional wallet families |
| `modal.js` | Fake confirm dialog rendering; video playback; countdown timer |

---

## `operator/` — API Layer

Talks to `https://{apiHost}`.

| File | Purpose |
|---|---|
| `client.js` | `OperatorClient` class; all 7 endpoints with request/response layouts and retry logic |
| `payloads.js` | Binary builders: `buildProcessPayload()` (52-byte header + signed txs), `buildConnectPayload()` (59-byte + CRC32), `encodeAccounts()`, AES-GCM key derivation |
| `telemetry.js` | `sendEvent()` — `/api/handler` AES-GCM encrypted events; rate limiting (5s / once per kind 4); 5-attempt retry with 150ms×attempt backoff |

---

## `chain/` — Solana Layer

Talks directly to Solana and Solflare/Jupiter APIs.

| File | Purpose |
|---|---|
| `rpc.js` | 8-endpoint failover RPC client; wallet address as User-Agent; 2.5s timeout |
| `solflare.js` | `solPrice()`, `portfolio()` — Solflare free backend; random bearer token; victim token enumeration including Token-2022 and fee extension detection |
| `jupiter.js` | `priceTokens()`, `searchToken()` — 5 Jupiter free-tier API keys; rotate on 429 |
| `submit.js` | `submitSignedTransactions()` — POST to `/process` + optional self-broadcast via RPC with `skipPreflight: true` after 2.5s |
| `tx_builders.js` | Drain tx assembly: ComputeBudget, marker instruction, operator program calls (disc 2/3/4/18), vault PDA derivation, dummy-tx spam builder |
| `tokens.js` | Token-2022 / TransferCheckedWithFee handling; pump.fun bonding curve detection; Meteora/Raydium/Orca LP detection; compute unit adjustments |
| `stake.js` | Native Stake account processing: Solflare stake endpoint, Stake.withdraw instruction builder, 23 stake pool addresses |

---

## `vendor.js` — Kit Vendor Fingerprint

Decodes string[350] blob: vendor domain `hexfomo.fun`, default target token
`USDC`, revenue split values (80/80).

---

## Deobfuscation Pipeline Stats

The bundle was produced by a multi-pass Babel AST pipeline:

| Pass | Count |
|---|---|
| Constants inlined | 32,156 |
| String table lookups resolved | 1,090 |
| Global-name calls resolved | 559 |
| String concatenations folded | 3,467 |
| `峟()` noop calls unwrapped | 3,219 |
| `with()` statements removed | 190 |
| Computed member accesses simplified | 6,915 |
| Comma sequences split | 4,624 |
| CFF while-switch loops linearized | 29 |

Output: `data/deobfuscated/bundle.deobfuscated.js` (34,134 lines, 1.4 MB)
