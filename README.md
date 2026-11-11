# js-bundle-analysis

Research workspace for a heavily obfuscated browser-side JavaScript bundle.
Deobfuscation notes, identifier maps, and reformatted source for static review.

## Structure

### `docs/` — analysis notes

| File | Contents |
|---|---|
| `docs/symbols.md` | Full identifier reference — CJK→ASCII rename map |
| `docs/flow.md` | Annotated runtime execution flow |
| `docs/protocol.md` | Network layer documentation (endpoints, request formats) |
| `docs/encoding.md` | Obfuscation technique notes (6-layer JS-Confuser analysis) |
| `docs/summary.md` | Executive summary and indicators |
| `docs/notes.md` | Architecture overview and miscellaneous notes |

### `src/` — deobfuscated source

Three-pass deobfuscation of the original minified bundle — 1,492 identifiers
renamed to ASCII, `_g("key")` calls resolved to real globals, formatted with
js-beautify. Split into 17 browsable files. See `src/INDEX.md` for the full index.

| File | Contents |
|---|---|
| `src/bootstrap.js` | Global variable declarations, `const CONSTS = [...]` |
| `src/codec.js` | `getString(n)` string decoder, `_g(key)` global resolver |
| `src/constants.js` | State machine that initializes all CONSTS at runtime |
| `src/errors.js` | Error class definitions + custom base64 codec |
| `src/wc-core.js` | Bundled SDK — core encoding and data structures |
| `src/wc-sign.js` | Bundled SDK — signing and message handling |
| `src/wc-session.js` | Bundled SDK — session management and pairing |
| `src/helpers.js` | Random bytes, retry, encoding utilities |
| `src/config.js` | Remote path configuration + bearer token generator |
| `src/client.js` | Secondary client interface (alternate backend) |
| `src/assets.js` | Asset enumeration client (portfolio API) |
| `src/fetch.js` | Authenticated fetch wrapper + notification string table |
| `src/messages.js` | Notification builder functions |
| `src/rpc.js` | RPC client with multi-endpoint failover |
| `src/storage.js` | LocalStorage wrapper, endpoint arrays, Proxy object |
| `src/ui.js` | Modal injection UI component |
| `src/main.js` | Entry point — full initialization and orchestration |

### Tools

| File | Description |
|---|---|
| `docs/scan.py` | Python CLI — static bundle signature scanner |
| `docs/patterns.yar` | YARA detection patterns for this bundle family |

---

## Methodology

Static analysis only. No code executed, no network requests to target infrastructure.
