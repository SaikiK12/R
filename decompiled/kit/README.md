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

| Dir | Layer | Files |
|---|---|---|
| `page/` | Runs on the lure page before any wallet interaction | `runtime.js`, `visit.js`, `page_params.js`, `set_sol_amount.js` |
| `operator/` | Talks to `https://{apiHost}` | `operator_api.js`, `payloads.js`, `telemetry.js` |
| `chain/` | Talks to Solana | `rpc.js`, `solflare_api.js`, `submit.js`, `tx_builders.js`, `operator_program.md` |

## What the operator controls server-side

The live config push (`GET /api/config`, AES-GCM, key purpose =
`apiHost`) tells the kit: target token (USDC mint), two receiver
addresses, amount parameters (observed 500.0 / 1.0 SOL and 1000/5
counters), and a sibling domain (`trongame.fun`, DNS-dead as of
2026-11-11). The receivers in the live config differ from the addresses
hard-coded in the bundle's string table — the operator rotates
receivers without rebuilding the kit. Decoded copy:
`decompiled/live/api_config_decoded.json`.

## Locale strings: the fake wallet modal in four languages

`/api/locales` serves 10-entry JSON arrays for `en`, `fr`, and `zh`
(Russian returns 404 — the page itself is hard-coded Russian).
Full files: `decompiled/live/locales_en.json`, `locales_fr.json`,
`locales_zh.json`. Entries, by index:

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
| How does the whole machine fit together? | `OPERATOR_ARCHITECTURE.md` |
| What does the victim see, and why does it work? | `LURE_ANALYSIS.md` |
| Detailed API request/response formats | `FORENSIC_REPORT.md` |
| Dynamic run: popup, balance gate, tx capture | `DYNAMIC_ANALYSIS.md` |
| All IOCs (domains, keys, addresses) | `decompiled/iocs.json` |
| Decoded live config | `decompiled/live/api_config_decoded.json` |
| On-chain program internals | `decompiled/kit/chain/operator_program.md` |
| Where the operation is weak | `FLAWS.md` |
| Sibling lures, sophistication gradient | `FAMILY_MAP.md` |
| Industry/DaaS context, Rublevka, StepDrainer | `INDUSTRY_CONTEXT.md` |
