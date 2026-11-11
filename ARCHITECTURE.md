# Architecture

The write-up is `FORENSIC_REPORT.md`. This file used to repeat it, including a wrong "secret URL prefix" that came from a constants-parser bug.

Readable recovery of the kit code, organized into the three layers as deployed (map in `decompiled/kit/README.md`):

| | |
|---|---|
| `deobfuscate.py` | Strings, constants, concealed built-ins |
| `decompiled/kit/page/` | Lure-page layer: `runtime.js` polyfills, `visit.js`, `page_params.js` (鼄/浚), `set_sol_amount.js` |
| `decompiled/kit/operator/` | `https://{apiHost}` layer: `operator_api.js` routes, `payloads.js` layouts + AES-GCM, `telemetry.js` (`/api/handler`) |
| `decompiled/kit/chain/` | Solana layer: `rpc.js` eight endpoints, `solflare_api.js` valuation client, `submit.js` submit + self-broadcast, `tx_builders.js` drain instructions, `operator_program.md` on-chain program analysis |
| `decompiled/strings.json` | 1053 strings, index = `getString(n)` |
| `decompiled/iocs.json` | Domains, keys, receivers, the 29-pubkey set |
| `decompiled/live/` | 2026-11-11 live-mapping evidence: locales, decrypted `/api/config`, on-chain balances |
| `INFRASTRUCTURE.md` | How the operation is built, what it costs, takedown paths |

Only the bundled WalletConnect / AppKit SDK (third-party code) is still control-flow flattened and not reconstructed.
