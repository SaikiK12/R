# Architecture

The write-up is `FORENSIC_REPORT.md`. This file used to repeat it, including a wrong "secret URL prefix" that came from a constants-parser bug.

Readable recovery of the straight-line kit code:

| | |
|---|---|
| `deobfuscate.py` | Strings, constants, concealed built-ins |
| `decompiled/kit/solflare_api.js` | `wallet-api.solflare.com` client and bearer |
| `decompiled/kit/operator_api.js` | `https://{apiHost}/api` routes |
| `decompiled/kit/rpc.js` | Eight RPC endpoints |
| `decompiled/kit/visit.js` | POST `/api/visit` |
| `decompiled/kit/runtime.js` | `AbortSignal["Be"]` and the other polyfills |
| `decompiled/strings.json` | 1053 strings, index = `getString(n)` |
| `decompiled/iocs.json` | Endpoints, keys, the 29-pubkey set |

Transaction builders are still control-flow flattened. They are not reimplemented in `kit/`.
