# Kit map, as deployed

The operator ships one minified Nuxt bundle (`/_nuxt/assets/index.js`)
on each lure domain. Functionally it splits into three layers, which is
how this reconstruction is organized. The operator API lives on the
same host as the lure (`apiHost == page host` in the normal case).

```
victim browser                          operator host              Solana
─────────────                           ─────────────              ──────

page/                                   GET /api/locales?lang=
  runtime.js      polyfills
  page_params.js  source/host detect
  visit.js      ─────────────────────►  POST /api/visit ──► "ok"
                                        GET /api/is-banned ──► "0"/"1"
                                        GET /api/config ──► AES-GCM blob
                                         (not called by this bundle;
                                          live on the server)

  [Connect wallet]  fake modal, localized en/fr/zh
  set_sol_amount.js amount 0.001..1,000,000

operator/
  operator_api.js
    On  /c/i      ──AES-GCM────────►   POST /api/c/i  ──► binary session
  payloads.js     layouts, AES-GCM
  telemetry.js    ──AES-GCM────────►   POST /api/handler (events, retry)

  [Sign transaction(s)]  wallet signs the drain tx
chain/
  submit.js
    芏            ──/process────────►  POST /api/process (signed txs)
    蔓            ──────────────────────────────────────────────►
                  RPC sendTransaction, skipPreflight, +2.5 s delay
  rpc.js          8-endpoint failover (Helius keys + public RPCs)
  solflare_api.js victim portfolio valuation (free Solflare backend)

  operator_api.js
    Ao  /c/c/{a}/{b}                 confirm notification
    Nn  /c/f/{a}                     final notification
```

## Directory map

### `page/` — Runs on the lure page before and during wallet interaction

| File | Purpose |
|---|---|
| `runtime.js` | Polyfills: `AbortSignal["Be"]` (timeout), `Promise.withResolvers`, `String/Array.prototype.at` |
| `page_params.js` | `readCampaignSource()` (localStorage `_0x6` → utm_source → referrer) and `pageHost()` (slug decode from `&d=` or `/connect/` path) |
| `visit.js` | `sendVisit()` — `POST /api/visit?source=…&tgid=…&tgus=…` with 900 s cooldown |
| `telegram.js` | `isTelegramWebView()`, `getTelegramUser()`, `getTelegramContext()` — Telegram WebApp detection; extracts tg user id + username for /api/visit |
| `mobile.js` | `isMobile()` — UA + innerWidth check; `openConnectPopup()` — 360×450 popup to connect domain; `generateConnectToken()` — base-x slug encoding of pageHost |
| `ban_check.js` | `isBanned()` — GET /api/is-banned; `loadLocales()` — GET /api/locales with en/fr/zh fallback |
| `set_sol_amount.js` | `setSolAmount()` — validates amount ∈ [0.001, 1,000,000], stores in state.K |
| `siws.js` | `buildSiwsMessage()` — SIWS EIP-4361 message template; `canSignAll()` — checks `solana:signAllTransactions` feature for 200-tx flow |
| `balance_gate.js` | `checkWallet()` — SOL balance gate (insufficient / watch address / target account); 29-pubkey exclusion set |
| `flow_state.js` | State object structure; flow type bytes (0=drain, 1=SIWS, 2=200tx); all error/retry messages; video paths; Phantom-spoof modal copy |
| `lure_dom.js` | Complete decoded 36-entry pitch dictionary; DOMContentLoaded injection mechanism; zero-width/homoglyph/split-literal obfuscation explained |
| `wallet_deeplinks.js` | Full 20+ wallet deep-link table; mobile connect URL construction; Chrome nag; App Store URL builder |

### `operator/` — Talks to `https://{apiHost}`

| File | Purpose |
|---|---|
| `operator_api.js` | `OperatorClient` class; all 6 endpoints (`/locales`, `/is-banned`, `/process`, `/c/i`, `/c/c/`, `/c/f/`) with request/response layouts |
| `payloads.js` | Binary builders: `buildProcessPayload()` (52-byte header + signed txs), `buildConnectPayload()` (59-byte + CRC32), `encodeAccounts()`, AES-GCM key derivation (`B3ui3QZFrOPoGW7oMZgE4A`) |
| `telemetry.js` | `sendEvent()` — `/api/handler` AES-GCM encrypted events; rate limiting (5 s / once per kind 4); 5-attempt retry with 150 ms×attempt backoff |

### `chain/` — Talks to Solana

| File | Purpose |
|---|---|
| `rpc.js` | 8-endpoint failover RPC client; wallet address as User-Agent; 2.5 s timeout; wraps as `solana.{method}()` Proxy |
| `solflare_api.js` | `solPrice()`, `portfolio()` — Solflare free backend abuse; random bearer token; victim token enumeration including Token-2022 and fee extension detection |
| `jupiter_api.js` | `priceTokens()`, `searchToken()` — 5 Jupiter free-tier API keys; rotate on 429 |
| `submit.js` | `submitSignedTransactions()` — POST to `/process` + optional self-broadcast via RPC with `skipPreflight: true` after 2.5 s |
| `tx_builders.js` | Drain tx assembly: ComputeBudget, marker instruction, operator program calls (disc 2/3/4/18), vault PDA derivation, dummy-tx spam builder |
| `pumpfun.js` | Token-2022 / TransferCheckedWithFee handling; pump.fun bonding curve detection; Meteora/Raydium/Orca LP detection; compute unit adjustments table |
| `stake_drain.js` | Native Stake account drain: Solflare stake endpoint, Stake.withdraw instruction builder, 23 stake pool addresses [325–347] |
| `operator_program.md` | On-chain program binary analysis: discriminators 0–21, vault42 PDA seeds, upgrade authority, observed mainnet transaction patterns |

### `watermark.js` — Kit vendor fingerprint

| File | Purpose |
|---|---|
| `watermark.js` | Decodes string[350] blob: vendor domain `hexfomo.fun`, default target token `USDC`, revenue split values (80/80) |

## What the operator controls server-side

The live config push (`GET /api/config`, AES-GCM, key purpose =
`apiHost`) tells the kit: target token (USDC mint), two receiver
addresses, amount parameters (observed 500.0 / 1.0 SOL and 1000/5
counters), and a sibling domain (`trongame.fun`, DNS-dead as of
2026-11-11). The receivers in the live config differ from the addresses
hard-coded in the bundle's string table — the operator rotates
receivers without rebuilding the kit. Decoded copy:
`decompiled/live/api_config_decoded.json`.

## Locale strings: the fake wallet modal — now 11 languages

`/api/locales` serves 10-entry JSON arrays. As of **2026-11-12** (re-verified
live): **en, fr, zh, de, es, pt, it, ja, ko, ar, tr, pl** return 200.
`ru` and `uk` return 404 — the page itself is hard-coded Russian.

This is a significant expansion from 3 languages (en/fr/zh) on 2026-11-11.
All locale files: `decompiled/live/locales_*.json`.

The 10-entry array structure is **identical across all languages** — same
social-engineering pitch, fully localized. Entries, by index:

| Index | en | fr | zh |
|---|---|---|---|
| 0 | Incoming transfer | Transfert entrant | 收到转账： |
| 1 | Description | Description | 描述： |
| 2 | This DApp would like to connect your wallet | Cette DApp souhaite connecter votre portefeuille | 此去中心化应用希望连接您的钱包 |
| 3 | You are allowing this DApp to | Vous autorisez cette DApp à | 您允许此去中心化应用： |
| 4 | View wallet balance & activity | Voir le solde et l'activité du portefeuille | 查看钱包余额和活动 |
| 5 | Request approval for transactions | Demander une approbation pour les transactions | 请求交易批准 |
| 6 | **Perform transactions without confirmation** | **Effectuer des transactions sans confirmation** | **无需确认即可执行交易** |
| 7 | Message | Message | 消息 |
| 8 | Trust detected (0) issues with this platform, proceeding is safe. Press confirm to continue. | Trust a détecté (0) problème avec cette plateforme, la poursuite est sûre. Appuyez sur confirmer pour continuer. | Trust 检测到此平台 (0) 个问题，继续进行是安全的。请按确认继续。 |
| 9 | Launch into the decentralized exchange (DEX) | Lancez dans l'échange décentralisé (DEX) | 启动进入去中心化交易所 (DEX) |

Index 6 — "Perform transactions without confirmation" — is what the kit
actually does (the fake Confirm dialog in the kit's own UI shows before
any real wallet request). The Trust detection claim (index 8) is false
safety theater. All three locales deliver the identical social
engineering pitch.

## Cross-references

| Question | Where to look |
|---|---|
| How does the whole machine fit together? | `DRAIN_PIPELINE.md` |
| What does the victim see, and why does it work? | `FRONTEND_LAYER.md` |
| Detailed API request/response formats | `BUNDLE_ANALYSIS.md` |
| Dynamic run: popup, balance gate, tx capture | `decompiled/live/RUNTIME_MAP.md` |
| All IOCs (domains, keys, addresses) | `decompiled/iocs.json` |
| Decoded live config | `decompiled/live/api_config_decoded.json` |
| On-chain program internals | `decompiled/kit/chain/operator_program.md` |
| Where the operation is weak | `WEAKNESSES.md` |
| Sibling lures, sophistication gradient | `DEPLOYMENT_MAP.md` |
| Industry/DaaS context, Rublevka, StepDrainer | `ECOSYSTEM.md` |
