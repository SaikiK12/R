# Architecture

The write-up is `FORENSIC_REPORT.md`. This file used to repeat it, including a wrong "secret URL prefix" that came from a constants-parser bug.

Readable recovery of the kit code:

| | |
|---|---|
| `deobfuscate.py` | Strings, constants, concealed built-ins |
| `decompiled/kit/solflare_api.js` | `wallet-api.solflare.com` client and bearer |
| `decompiled/kit/operator_api.js` | `https://{apiHost}/api` routes and POST encoding |
| `decompiled/kit/rpc.js` | Eight RPC endpoints |
| `decompiled/kit/visit.js` | POST `/api/visit` |
| `decompiled/kit/runtime.js` | `AbortSignal["Be"]` and the other polyfills |
| `decompiled/kit/page_params.js` | Campaign source (鼄) and page host (浚) |
| `decompiled/kit/payloads.js` | `/process` and `/c/i` payload layouts, AES-GCM |
| `decompiled/kit/telemetry.js` | Encrypted `/api/handler` event channel |
| `decompiled/kit/submit.js` | Submit flow and the 2.5 s self-broadcast |
| `decompiled/kit/set_sol_amount.js` | Modal amount setter, 0.001..1,000,000 |
| `decompiled/strings.json` | 1053 strings, index = `getString(n)` |
| `decompiled/iocs.json` | Endpoints, keys, the 29-pubkey set |

Only the bundled WalletConnect / AppKit SDK (third-party code) is still control-flow flattened and not reconstructed.
