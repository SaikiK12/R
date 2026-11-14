# Rebuilt Kit — Audit Report & Implementation Roadmap

Produced from: deep re-verification of every rebuilt component against
`decompiled/deobfuscated/bundle.deobfuscated.js`, the live captured config
plaintext binary, and the string table.

---

## 1. BUGS FOUND IN REBUILT/ (must fix)

### B1. `core/config_parser.js` — `ot` and `Oe` labels SWAPPED

**Bundle evidence (line 24475–24476):**
```javascript
["ot"]: 拁(this, 鯙).getFloat64(110),  // ← ot = getFloat64(110) = 1.0  = MIN
["Oe"]: 拁(this, 鯙).getFloat64(102),  // ← Oe = getFloat64(102) = 500.0 = MAX
```

**Live plaintext verification:**
- `DataView.getFloat64(102)` = body[102:110] = **500.0** = `Oe` = **maxSol**
- `DataView.getFloat64(110)` = body[110:118] = **1.0**   = `ot` = **minSol**

Our `config_parser.js` had `minSol` and `maxSol` REVERSED.
Fix: `ot` = minSol, `Oe` = maxSol.

### B2. `core/config_parser.js` — `siblingDomain` and `tokenSymbol` wrong source

**Bundle evidence:** Both come from the **TRAILER** (parsed by `牌()`), NOT from
fixed body offsets 122 and 125 as our parser assumed.

**Trailer binary (live capture):**
```
00 00                              field[0] = null (Jr().header)
00                                 field[1] = null (Jr().text)
0c 74726f6e67616d652e66756e        field[2] = "trongame.fun" ← Qr() = siblingDomain
04 55534443                        field[3] = "USDC"          ← (token meta)
00                                 field[4] = null (en())
00                                 field[5] = null (zr())
```

**Correct parsing:**
- `siblingDomain` = `Qr()` = `牌()[2]`  (trailer field 2)
- `tokenSymbol` = `en()` = `牌()[4]` = null here; but `牌()[3]` = "USDC"
- In this config, the token symbol travels via `牌()[3].ze` (the `Fr()` metadata)

**Body offsets 122 and 125 are NOT the domain/symbol strings.** They are:
- `Zr()` = `甃(body, 122)` = u16 LE = `5` (some flag/counter value)
- `Xr()` = `称(body, 125)` = u32 LE = `0` (some flag)

Fix: parse trailer using `媵()` LV-field chain.

### B3. `page/runtime.js` — `讜()` function not documented

`讜()` (deob line 17594) is called at wallet connect time:
```javascript
[tgUser, overrides] = 讜(焧)
```
It does TWO things:
1. Reads `?cd=` URL param → decodes Telegram user (tgid-username)
2. Reads `?o=` URL param → decodes JSON config overrides from lure URL
3. TgUser from `皸()` call wins over `?cd=` if both present

The `overrides` object (second return value) is applied via `_o()`:
```javascript
_o(overrides) { Object.assign(this.c.Ne, overrides); }
```
This lets the lure HTML pass config overrides in the URL itself.

### B4. `page/runtime.js` — Telegram `髿()` / `web_app_expand` not documented

After `皸()` returns a Telegram user, the kit calls:
```javascript
焧 && 髿("web_app_expand")
```
`髿()` posts a Telegram WebApp event back to the Telegram client:
- If `TelegramWebviewProxy` in window → `window.TelegramWebviewProxy.postEvent(event, data)`
- Else → `window.parent.postMessage({eventType, eventData}, "https://web.telegram.org")`

This expands the WebApp to full screen in Telegram before the lure shows.
Not in any rebuilt file.

### B5. `config/constants.js` — Default fallback config blob not decoded

String table [350] = `iAAD6AMAAMb6ev...` is the **default fallback config**
baked into the bundle. It is loaded if `/api/config` fails. It has random/dummy
pubkeys but the same struct layout as the live config. Not documented anywhere.

### B6. `chain/tx_builders.js` — `getMultipleAccounts` RPC call missing

String table [317] = `"getMultipleAccounts"` — the kit calls this for batch
account lookup during portfolio scan. Not in `chain/rpc.js`.

### B7. `operator/telemetry.js` — `ee` field encoding (`沇()`) not implemented

The `ee` bytes in the handler event are produced by `沇()` which encodes the
token list in a custom binary format. Our `telemetry.js` just passes raw bytes.
`沇()` = encode token entries: u8 count, then per entry: u16 LE token-id + bytes + u32 checksum.

### B8. Missing: `page/params.js` — `?cd=` and `?o=` params for connect domain URL

The URL passed to the connect domain popup contains:
```
https://{connectDomain}/connect/{token}?b=1&cd={encoded(tgid+"-"+tgus)}&o={encoded(overrides)}
```
- `cd=` = base-X encoded string of `tgid + "-" + tgus` (Telegram attribution threading)
- `o=`  = base-X encoded JSON of config overrides
- `b=1` = suppresses the /api/visit beacon on the connect domain

The connect domain then decodes `?cd=` via `讜()` to recover the Telegram attribution.
Not in `page/mobile.js`.

---

## 2. MISSING COMPONENTS (not implemented at all)

### M1. Telegram context module (new file needed: `page/telegram.js`)

Five distinct Telegram behaviors NOT in any rebuilt file:

| Function | Purpose |
|---|---|
| `皸()` | Full TG context extractor: tries hash, search params, localStorage `_0x3` |
| `髿(event, data)` | Post event to TG client (`web_app_expand`, etc.) |
| `譑()` | isTelegramWebView(): 3-way check |
| `讜(tgUser)` | Returns `[tgUserObj, configOverrides]` from URL params + tgUser |
| `嘗(tgUser, overrides)` | Build connect URL query string with `cd=` + `o=` |

`皸()` has 7 extraction paths tried in order:
1. URL hash `#tgWebAppData=...` → URLSearchParams → `user` JSON
2. URL search params → `tgWebAppData` → URLSearchParams → `user` JSON
3. localStorage `_0x3` (cached from previous visit)
4. Direct `window.Telegram.WebApp.initDataUnsafe.user`
5. URL hash fragment as URLSearchParams
6. `tgWebAppVersion` in hash
7. Various fallbacks

### M2. Connect domain URL construction (page/mobile.js needs extension)

The connect URL is NOT just `/connect/{token}?b=1`. Full URL:
```
https://{connectDomain}/connect/{token}?b=1[&cd={...}][&o={...}]
```

`嘗()` function (deob line 17610) builds the query string:
- If `tgUser` has tgid: append `cd=訥(tgid + "-" + tgus)` where `訥()` = base-X encode
- If `configOverrides` non-empty: append `o=訥(JSON.stringify(overrides))`

Also: the connect domain redirect sets `?ref={slug}` on return for attribution.

### M3. Device/UA detection module (not in any file)

Full device detection (deob lines 17064–17077) not documented:

| Variable | Value |
|---|---|
| `版` | `navigator.userAgent` |
| `鮞` | `userAgent.includes("Solflare-Mobile")` |
| `珆` | iPhone or iPad or (Solflare-Mobile + standalone) |
| `傶` | Android or (Solflare-Mobile + !珆) |
| `帧` | Mobile (珆 || 傶) |
| `瀞` | Windows |
| `玐` | macOS (not iOS, not Android) |
| `孿` | Linux/ChromeOS |
| `簴` | Safari (not Chrome/CriOS) |
| `泩` | Firefox or FxiOS |
| `癄` | Chrome or CriOS |
| `瘄` | In Telegram WebView |
| `丯` | Telegram + tgWebAppVersion in hash |
| `饡` | Twitter/X in-app browser |

`詬()` = device type u8: `珆→0, 傶→1, 瀞→2, 玐→3, 孿→4, else→5`
This is used as the `Ge` field in handler events (wallet connection type).

### M4. Jupiter API client (incomplete)

`chain/jupiter.js` exists in decompiled but NOT in rebuilt. Key details:
- Base URL: `https://api.jup.ag/`
- Price endpoint: `price/v3?ids={mints,comma,separated}` (batched 50 at a time)
- Search endpoint: `tokens/v2/search?query={mint}`
- SOL price: `En(wSOL_mint)` → single price lookup
- 5 API keys rotate on 401 or 429 (round-robin)
- User-Agent = victim wallet address (same as RPC)
- `referrerPolicy: "no-referrer"`
- Timeout: 2000 ms (not 2500!)

### M5. `setSolAmount()` / balance gate min calculation

`setSolAmount()` (from `decompiled/kit/page/set_sol_amount.js`) sets `state.K`
from the config's `Oe` (max_sol). But the balance gate minimum is NOT `ot` —
it's computed from the estimated transaction fee:

```javascript
state.K = config.Oe * 1e9  // maxSol → lamports
// balance gate min = fee_estimate + margin
// fee_estimate = (totalComputeUnits * microlamports) / 1e6
```

The minimum shown to victims ("0.60 SOL") is the fee for the drain transaction
with the victim's portfolio, NOT a fixed value.

### M6. `page/lure_dom.js` — Full 36-entry pitch dictionary

The lure HTML DOM injection from `lure_dom.js` injects a 36-entry obfuscated
pitch dictionary. The full decoded content is in the existing
`decompiled/kit/page/lure_dom.js` but was NOT imported into rebuilt/.

### M7. SIWS flow — full implementation missing

`decompiled/kit/page/siws.js` documents `buildSiwsMessage()` and `canSignAll()`.
Not in rebuilt/. Full SIWS flow:
1. `canSignAll()` checks `wallet.features["solana:signAllTransactions"]`
2. If true → 200-tx spam flow (FLOW.SPAM)
3. If false → single SIWS message sign (FLOW.SIWS)
4. `buildSiwsMessage()` generates EIP-4361 format message with kit-specific fields

### M8. Wallet deep-link table — only 4 wallets in rebuilt/

`decompiled/kit/page/wallet_deeplinks.js` and `wallet_deeplinks_extended.js` have
20+ wallet deep-link schemes. `rebuilt/chain/rpc.js` has none. The full list
from the deob bundle includes: Phantom, Solflare, Backpack, Exodus, OKX, Zerion,
Glow, Trust Wallet, Coinbase, Fireblocks, Crypto.com, Trezor, Arculus,
CTRL/Xverse, Daffi, and more.

### M9. `page/ban_check.js` — `loadLocales()` WRONG

Our `ban_check.js` says the kit calls `/api/locales` from the browser.
**Deobfuscation confirmed this is FALSE.** The bundle has a `bn()` method but
it is NEVER called client-side. The modal strings are BAKED INTO the bundle.
The existing `decompiled/kit/page/ban_check.js` says this but `rebuilt/` doesn't
have a `ban_check.js` at all yet.

### M10. `page/visit.js` — `?b=1` suppression full logic missing

The visit beacon is suppressed not just on `?b=` but also on:
- `location.href.includes("pushOrOpen")` — connect domain redirect
- `state.c.Ne.dt` being set (config override flag)

Also: `_0x5` stores `Math.floor(Date.now() / 1000)` not `Date.now()`.

---

## 3. ENHANCEMENTS TO IMPLEMENT

### E1. REAL Telegram tgWebAppData extraction paths

The `皸()` function tries **7 different extraction paths** for the TG context.
Modern Telegram Mini Apps pass `tgWebAppData` via URL hash, URL search params,
AND the `window.Telegram.WebApp.initDataUnsafe` object. All 7 paths should be
in `page/telegram.js`.

### E2. Config override system via `?o=` URL param

The operator can embed config overrides directly in the lure URL. This means
affiliates can customize per-link: different target amounts, different receiver,
different UX flow — without touching the backend. Document and implement in
`page/params.js`.

### E3. `_0x14` rate-limit counter (new localStorage key not documented)

String table analysis shows `_0x14` is a second localStorage key alongside `_0x5`,
`_0x12`, and `_0x6`. From deob line 20210: `鼩 = new 繏("_0x14")`. It tracks
the Jupiter API rate-limit counter per mint address (token price cache).

### E4. Token price caching from SCAMSEM analysis

`scamsem.solbarn.cc` (from `iocs.json new_fleet_2026_11_13`) uses
`localStorage["token-price-cache-SCAMSEM"]` — a per-token price cache key.
The main bundle uses `_0x8` (from deob line 20206: `岋 = new 繏("_0x8", ...)`)
as a price cache Map loaded from localStorage. This is the token price cache
for the Jupiter price results. Needs documenting.

### E5. `getMultipleAccounts` batch portfolio scan

The kit calls `getMultipleAccounts` (string[317]) in addition to Solflare's API
for batch account verification. This is used to verify token account existence
before building drain instructions. Add to `chain/rpc.js`.

### E6. Affiliate campaign tag encoding (fully reversible)

The marker instruction campaign tag format is: `{affiliateId}|{splitFlag}|`
- `affiliateId` = alphanumeric affiliate ID (e.g. `1kd1mz4r-`)
- `splitFlag` = `0` (no split, full to collector) or `1` (standard split to receiver)

This format makes every drain attributable to a specific affiliate AND the split
method used. The tag is never encrypted. Add `encodeCampaignTag(id, split)` to
`chain/tx_builders.js`.

### E7. Blockhash staleness detection and re-sign prompt

The kit tracks `lastValidBlockHeight` from every RPC response. When
`currentSlot > lastValidBlockHeight`, it shows ERR.RESIGN and re-fetches
the blockhash. This should be in a `watchBlockhash(callback)` function in
`chain/rpc.js`.

### E8. UA/IP evasion fingerprint — Twitter/X in-app browser detection

`饡 = /Twitter| X App/.test(navigator.userAgent)` — if the victim opens the
lure from X (Twitter), the kit detects this. The `饡` flag is used to disable
certain popups in X's in-app browser that would look suspicious.

### E9. Full Phantom-clone localStorage injection (vaultspin pattern)

Observed on `vaultspin.win`: the costume injects `phantom-*` localStorage keys
to fake a Phantom wallet dashboard. The kit itself reads `phantom-wallets-v2`
when it detects the Phantom costume. This is a costume-side detail but affects
the `page/balance_gate.js` logic when the connected wallet is "Phantom-spoofed."

### E10. `/api/config` retry exhaustion → fallback to default config blob

If `/api/config` fails all 10 retries, the kit falls back to the **default
config blob** baked into string table [350] (the `緜` base64 string in the
bundle at deob line 24558). This default has dummy pubkeys but preserves the
struct layout and flow. Currently not documented in `config_parser.js`.

---

## 4. PRIORITY ORDER

```
CRITICAL (breaks accuracy):
  B1  config_parser.js ot/Oe swap
  B2  config_parser.js trailer parsing for domain/symbol
  B4  Telegram web_app_expand not documented

HIGH (missing major features):
  M1  Telegram context module (page/telegram.js)
  M2  Connect URL cd= and o= params
  M3  Device/UA detection
  M4  Jupiter API client
  M5  setSolAmount and fee-based balance gate min

MEDIUM (completeness):
  B3  讜() documentation
  B5  Default config blob
  B6  getMultipleAccounts
  B7  ee field encoding 沇()
  B8  Connect URL full format
  M6  Lure DOM pitch dictionary
  M7  SIWS full implementation
  M8  Full wallet deep-link table
  E1  7-path Telegram extraction
  E2  Config override via URL

LOW (enhancements):
  M9  ban_check.js locale call clarification
  M10 visit.js suppression flags
  E3  _0x14 rate-limit counter
  E4  Token price cache _0x8
  E5  getMultipleAccounts batch
  E6  Campaign tag encoding
  E7  Blockhash staleness re-sign
  E8  Twitter/X in-app detection
  E9  Phantom-clone localStorage
  E10 Default config fallback
```
