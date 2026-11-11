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
| `chain/` | Talks to Solana | `rpc.js`, `solflare_api.js`, `submit.js` |

## What the operator controls server-side

The live config push (`GET /api/config`, AES-GCM, key purpose =
`apiHost`) tells the kit: target token (USDC mint), two receiver
addresses, amount parameters (observed 500.0 / 1.0 SOL and 1000/5
counters), and a sibling domain (`trongame.fun`, DNS-dead as of
2026-11-11). The receivers in the live config differ from the addresses
hard-coded in the bundle's string table — the operator rotates
receivers without rebuilding the kit. Decoded copy:
`decompiled/live/api_config_decoded.json`.
