# src/ — Deobfuscated Bundle

Three-pass deobfuscation of the original minified bundle:

1. **Constants substitution** — 32,156 `CONSTS[n]` references replaced with literal values
2. **Full identifier rename** — all 1,492 identifiers renamed:
   - 60+ key symbols → human-readable names (`c2Fetch`, `walletAddress`, `initApp`, …)
   - 1,430 remaining CJK symbols → `_s1`–`_s8` (state machine vars), `_v1`–`_v1430` (auto-named)
   - `_g("key")` calls → real global names (`fetch`, `Math`, `JSON`, `Error`, `document`, …)
3. **Formatting** — `js-beautify` applied (133 minified lines → 30,311 indented lines)

---

## File Index

| File | Contents | Size |
|------|----------|------|
| `00_preamble.js` | Global variable declarations, `const CONSTS = [...]` | 29 KB |
| `01a_getString_helpers.js` | `getString(n)`, `_g(key)` global resolver, `_clamp`, `_sentinel` | 103 KB |
| `01b_consts_state_machine.js` | State machine that initializes all CONSTS constants at runtime | 74 KB |
| `01c_solana_error_base64.js` | `SolanaError` class + custom base64 alphabet (non-standard RFC 4648) | 27 KB |
| `01d1_wc_core.js` | Bundled WalletConnect v2 SDK — core encoding and data structures | 251 KB |
| `01d2_wc_signing.js` | Bundled WalletConnect v2 SDK — signing and message handling | 168 KB |
| `01d3_wc_session.js` | Bundled WalletConnect v2 SDK — session management and pairing | 235 KB |
| `01e_utility_functions.js` | `_randBytes`, `_b64Encode`, `_retry`, `_now`, `getSlot`, `getCurrentEpoch` | 79 KB |
| `02_c2_setup.js` | `C2_PATH_PREFIX` ("ab060a03…") + `generateBearer()` | 2 KB |
| `03_fake_wallet_client.js` | `FakeWalletClient`: transfer channel for fake-app victims (alt-backend) | 10 KB |
| `04_solflare_client.js` | `SolflareClient`: Solflare portfolio + Jupiter API abuse | 10 KB |
| `05_c2_fetch_notify.js` | `c2Fetch()`: authenticated remote-api fetch wrapper; `NOTIFY_STRINGS[0..9]` | 121 KB |
| `06_notification_builders.js` | `buildAssetSummary()`, `buildConnectNotif()`, `buildTxNotif()`, `buildSelectorNotif()` | 359 KB |
| `07_rpc_client.js` | `RpcClient`: rotating Solana RPC with 8-endpoint failover | 4 KB |
| `08_localstorage_store.js` | `store` TTL wrapper; RPC endpoint arrays; `solana` Proxy object | 21 KB |
| `10_wallet_selector_ui.js` | `mountWalletSelector()`: alt client modal + deep-link injection | 13 KB |
| `11_entry_point.js` | `initApp()`: page load entry point, full execution flow | 31 KB |

**Total: 17 files, ~1.5 MB**

---

## What Was Renamed

### Real global names (from `_g("key")` resolution)

```
fetch         Math          JSON           Error         Array
Object        Number        String         Date          Promise
RegExp        URLSearchParams  URL         TextEncoder   TextDecoder
Uint8Array    WeakMap       Set            Proxy         document
window        navigator     console        location      BigInt
AbortSignal   setTimeout    addEventListener  removeEventListener
sessionStorage  localStorage  crypto       performance   alert
RangeError    TypeError     Boolean       process (Node compat)
WalletConnectBase  ...43 more
```

### Key identifiers renamed

```
walletAddress    C2_PATH_PREFIX    generateBearer    c2Fetch
FakeWalletClient SolflareClient    RpcClient         store
buildAssetSummary  buildConnectNotif  buildTxNotif   buildSelectorNotif
mountWalletSelector  initApp       checkBanned       startDrain
isMobile         usdRate           NOTIFY_STRINGS    localeLoaded
SolanaError      HttpError         RpcError          WalletAdapterClass
bannedWallets    excludedWallets   ...60 more
```

### State machine variables

```
_s1 .. _s8   = JS-Confuser control-flow state variables (while/switch state machines)
_v1 .. _v1430 = auto-named variables (original CJK identifiers, opaque semantics)
```

---

## Residual Patterns to Know

| Pattern | Meaning |
|---------|---------|
| `_noop(a = x, b = y)` | Equivalent to `a = x; b = y;` — assignments disguised as function args |
| `while(true) { switch(_s1 + _s2) {} }` | JS-Confuser control-flow state machine — traces from one `case` to the next |
| `_v1275(...)` | Auto-named function (original CJK symbol `_v{rank}`) |
| `getString(n)` | Returns the decoded string at index n — see `docs/identifier_map.md` |
| `AbortSignal["Be"](ms)` | `AbortSignal.timeout(ms)` — `"Be"` is an obfuscated method alias |
| `_s2["趚"]` | Property key inside a state machine routing object |

---

## Reading Guide

For the full execution flow explanation: **`docs/execution_flow.md`**  
For identifier meanings: **`docs/identifier_map.md`**  
For the remote-api protocol spec: **`docs/backend_protocol.md`**  
For obfuscation technique explanations: **`docs/obfuscation_layers.md`**

**Recommended reading order:**
1. `11_entry_point.js` — start here, understand the entry point
2. `10_wallet_selector_ui.js` — alt client injection
3. `07_rpc_client.js` — RPC client (small and clean)
4. `02_c2_setup.js` — api path prefix and bearer token
5. `05_c2_fetch_notify.js` — remote-api authenticated fetch
6. `03_fake_wallet_client.js` — fake app transfer channel
7. `04_solflare_client.js` — asset enumeration
8. `06_notification_builders.js` — Telegram notifications
