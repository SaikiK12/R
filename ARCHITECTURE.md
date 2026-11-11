# pumpanakin.fun Drainer Kit — Full Architecture Reconstruction

> **Purpose:** Defensive research reconstruction of a live Solana drainer-as-a-service (DaaS)
> kit. All findings derived from static analysis only. No funds moved, no attacker code executed.
>
> **Kit vendor:** hexfomo.fun  
> **Operator domain:** pumpanakin.fun  
> **Sample hash:** `0735606691bbdf35d38d7531c0e48363a21ef6f7224ebce2908a1b487f9ea6a2`

---

## 1. Stack Overview

```
Victim browser
  └─ pumpanakin.fun           Cloudflare-fronted Nuxt.js SPA
       ├─ /assets/index.js    Single-bundle drainer (~1 MB, JS-Confuser obfuscated)
       ├─ /assets/css/        CSS assets
       ├─ /assets/img/        Lure images (Trump Coin airdrop theme)
       └─ /api/               Operator routes on this host (visit, ban check, submit)

reactwalletback.com           Fake-wallet mobile-app backend
  ├─ /app-link/               Deep-link redirector for Volsungar/SOC/Hero wallet apps
  └─ ru.reactwalletback.com   Russian-language operator panel (confirmed live)

nulltrace.app                 TDS (Traffic Direction System) cloaker
  └─ redirects: WeChat→Baidu, CN→cloudflare.aipages.dev, mobile→global.aipages.dev

hexfomo.fun                   Kit vendor / DaaS platform (watermark in every tx)
```

---

## 2. Lure Page

**File:** `index.html` (served from root)  
**Language tag:** `lang="ru"` (Russian-language target despite English lure text)  
**Theme:** Fake Trump Coin USDC airdrop  

**Anti-detection tricks:**
- UI text strings stored with zero-width Unicode chars (U+200B, U+200C, U+200D, U+2062, U+2063)
  mixed with Cyrillic homoglyphs (е→e, а→a) to evade exact-string SafeBrowsing matches.
- Random-word DOM text nodes at load time to confuse crawlers.
- `sbdst.js` — countdown timer script (creates fake urgency).

**Wallet connect trigger:** every button/CTA executes:
```javascript
window.openModal()
```
which opens the WalletConnect AppKit modal injected by `index.js`.

**Assets loaded:**
| Path | Purpose |
|---|---|
| `/_nuxt/assets/index.js?aa6524x` | Full drainer bundle (1,034,759 bytes) |
| `/assets/js/jxi33.js?0s3xodk` | jQuery 3.4.1 |
| `/assets/js/sbdst.js?717o97x` | Countdown timer |
| `/assets/css/wzi2d.css?fmgixv9` | Lure page stylesheet |

---

## 3. Obfuscation Layers

The bundle uses **JS-Confuser** with these techniques stacked:

### Layer 1 — Encoded String Table
```javascript
嗛 = 铴([...]);   // 1053 base64-encoded strings, custom alphabet
餢 = {};           // lazy-decode cache
function 娨(n) {  // string accessor: decodes & caches entry n
    if (typeof 餢[n] === "undefined") return 餢[n] = 縊(嗛[n]);
    return 餢[n];
}
```

**Custom base64 alphabet** (char code → 6-bit value):
```
+→21, /→9, 0→33, 1→62, 2→19, 3→16, 4→50, 5→27, 6→14, 7→47, 8→23, 9→1
A→2, B→44, C→35, D→30, E→29, F→55, G→25, H→18, I→41, J→61, K→8, L→24
M→63, N→60, O→20, P→4, Q→43, R→31, S→54, T→42, U→46, V→5, W→22, X→36
Y→34, Z→39, a→48, b→17, c→45, d→0, e→12, f→57, g→59, h→26, i→58, j→11
k→28, l→13, m→49, n→3, o→10, p→40, q→37, r→52, s→53, t→15, u→7, v→38
w→51, x→32, y→6, z→56
```

### Layer 2 — Constants Array
```javascript
// 囉 = array of 1691 literal constants (integers, strings, booleans)
// property names, numbers, keywords, control-flow labels
// e.g. 囉[5]='length', 囉[29]='name', 囉[949]=':', 囉[966]='Wallet'
```

### Layer 3 — CJK Identifier Renaming
All local variables and function names replaced with Chinese characters (U+4E00–U+9FFF).
Example: fetch wrapper is `锏`, notification builder is `玹`, C2 object is `夾`.

### Layer 4 — Control-Flow Flattening
Every function body is wrapped in a `while(a+b+c !== -111) { switch(a+b+c) { ... } }` state
machine with case values adjusted by multiple counter variables:
```javascript
while (嗛 + 嬹 + 齢 !== -111) {
    switch (嗛 + 嬹 + 齢) {
        case 42: ...; break;
        case -87: ...; break;
        // ...
    }
}
```

### Layer 5 — String Splitting
Literals split across concatenations to defeat simple grep:
```javascript
"Author"+"izatio"+"n"  → "Authorization"
"includ"+"es"          → "includes"
```

### Layer 6 — Outer Function Wrapper
Entire payload wrapped in:
```javascript
globalThis._t54h = import.meta;
Function("拀", "var 餢,嗛,...; /* full bundle */")(...);
```

---

## 4. Frontend Execution Flow

```
Page load
  │
  ├─液() ──→ 眴() ──→ fetch(夾.bn(session, lang))
  │          Localization: replace 衫[] with translated notification strings
  │          (server-controlled social-engineering text)
  │
  ├─ TDS check: 螇 = new URL("https://nulltrace.app")
  │   • WeChat UA → redirect to 72.chat operator panel
  │   • CN IP → redirect to cloudflare.aipages.dev
  │   • Mobile → redirect to global.aipages.dev/en
  │
  ├─ User clicks "Connect Wallet" → window.openModal()
  │   WalletConnect AppKit modal opens
  │   Injected wallet list: Phantom, Solflare, Backpack, Coinbase,
  │     TrustWallet, MetaMask, OKX, Volsungar*, SOC Wallet*, Hero Wallet*
  │   (* = fake, link to reactwalletback.com)
  │
  ├─ Wallet connects
  │   • 搒 = walletAddress (also sent as User-Agent header to C2)
  │   • POST https://{apiHost}/api/visit   (query: source, origin, tgid, tgus)
  │   • GET  https://{apiHost}/api/is-banned  (body "1" means banned)
  │   • 夾.Tn(session) → returns "1" if banned → page exit
  │
  ├─ Asset enumeration (concurrent)
  │   • Helius RPC: getAssetsByOwner, getStakeAccounts
  │     Keys: 0b9f580f, 2dfa2086, 3a1ca16d, 777d85c0
  │   • Jupiter: price, tokens search, swap quotes
  │     Keys: cc0769f7, 5f1f45eb, a4ed32be, f707107a, ab060a03
  │   • Solflare API: v3/portfolio/tokens, v2/swap/capped-tokens
  │   • MagicEden: stake accounts
  │   Assets sorted by USD value; min drain threshold: 0.001 SOL (~$0.14)
  │
  ├─ Drain loop
  │   For each drained asset:
  │   ├─ Build drain transaction (ComputeBudget + transfer instructions)
  │   │  Receiver addresses (round-robin or by asset type):
  │   │  • 6cwsqBqmRy22Qa2SEuZ8tWrpKoCS9M8S2r8ct8VuqFmj
  │   │  • 4QFiKg8ejx5LfqqLNbnKsiCnbEgRtgakBF6abMrkquKW
  │   │  • DvTqmF7uMbLaW56QsMvcgv8KSkydFEikuk5gUcjACPV
  │   │  • 4cfdFcVuJf8PPXpMWPMCDehSE4gV4C8oYwpZnLra7rtW
  │   │  • TwrGADB9QPrLfTKpWuyq9tjgRaGsuzgRUMFTz51uhsa
  │   │  • syspv6Qe5BbK8GPEjLbMnmF9hZy7juAuePbuspciCFP
  │   │  • A5chdzL3UMQZBqBRdXFFCT9HTK7JZs6h4TEYVCQLQydo
  │   │
  │   ├─ SIGN attempt (social-engineering dialog)
  │   │  Fake Phantom overlay with trusted-site badge
  │   │  Strings: "Sign all transactions to verificate your account"
  │   │            "This DApp uses Abuse Protection to prevent misuse"
  │   │            "hasn't been reviewed by Phantom yet, but it is listed
  │   │             in trusted community"
  │   │
  │   ├─ User signs → POST https://{apiHost}/api/process
  │   │   Body: {signedTransaction, walletAddress, ...}
  │   │
  │   └─ Notify operator (Telegram via server relay):
  │       • POST https://{apiHost}/api/c/i
  │       • POST https://{apiHost}/api/c/c/{a}/{b}
  │       • POST https://{apiHost}/api/c/f/{a}
  │
  └─ Error recovery loop
      "Transaction was reverted, funds will be refunded soon.
       Please try again." → repeat signing prompt
```

---

## 5. Backend Protocol

Corrected from the constant-accurate decompilation in `decompiled/`. An
earlier pass dropped the bare `undefined` in the constants array and
shifted every later index by one. That shift labeled a Jupiter API key
as a secret URL prefix. It is not.

### Two clients

1. **Solflare portfolio client** (`锏`). Prefix `墸` is
   `https://wallet-api.solflare.com/`. Each request sends
   `User-Agent: <wallet address>` and `Authorization` from `濛()` below,
   with a 3.5s timeout and `referrerPolicy: no-referrer`.
2. **Operator client** (`听`). URLs are `https://{apiHost}/api` + path.
   `apiHost` is state field `Se`.

Bearer token generation (`濛()`), used by the Solflare client:
```javascript
function 濛() {
    let rand = randomInt(1, 7);
    let bytes = randomBytes(16);
    bytes[1] = (rand << 5) + randomInt(0, 31);
    bytes[6] = bytes[6] & 0xF | 0x40;   // UUID v4 version bits
    bytes[8] = bytes[8] & 0x3F | 0x80;  // UUID variant bits
    return "Bearer " + base64Encode(bytes);
}
```

### Operator endpoints

Built as `https://{apiHost}/api` + path. `apiHost` is state field `Se`.
The visit beacon is a POST with **query parameters**, not a JSON body:
`source`, `origin` (only if it differs from `apiHost`), `tgid`, `tgus`.
It is skipped when the URL contains `?b=`, and for 900 seconds after a
response whose text is `ok`.

| URL | Method | Role |
|---|---|---|
| `https://{apiHost}/api/visit` | POST | Page-load beacon. Response text `ok` arms the cooldown. |
| `https://{apiHost}/api/locales?lang=` | GET | Localized UI strings |
| `https://{apiHost}/api/is-banned` | GET | Body `1` means banned |
| `https://{apiHost}/api/process` | POST | Submit. Body is built by a still-flattened helper, then custom-base64 encoded. |
| `https://{apiHost}/api/c/i` | POST | Connect notification. Same encoding. 16s timeout. |
| `https://{apiHost}/api/c/c/{a}/{b}` | POST | Confirm notification. 16s timeout. |
| `https://{apiHost}/api/c/f/{a}` | POST | Final notification. 2.5s timeout. |

### 5.1 Notification Message Format

The notification builder `玹()` selects format based on drain state:

**State 1 — Wallet connected (`琐`):**
```
Description: /c/c/
/c/f/:         ✅ text/plain
               ✅ https://wallet-api.solflare.com/
               🚫 v2/swap/capped-tokens?currency=USD
```
*(These values are the defaults; server replaces them with translated strings for
languages in [ar,bg,my,cs,da,fr,de,el,id,it,ja,ko,lo,lv,pl,pt,ro,zh,si,sk,sl,es,sv,tr,vi])*

**State 2 — Transaction built (`醸`):**
```
Message: {walletAddr} {note}.
ComputeBudget111...{walletAddr}iAAD6AMAAMb6...
aGV4Zm9tby5mdW4EVVNEQwAA{nonce}
Issued At: {utcTimestamp}
Request ID: {uniqueId}
```
The base64 block decodes to 159 bytes containing:
- `hexfomo.fun` — kit vendor watermark
- `USDC` — asset type marker
- Computed budget instruction prefix + nonce + timestamp

**State 3/4 — Asset value summary (`蓫`):**
```
📥 /c/i:: + {solAmount} SOL (~ ${usdValue})
           + {tokenAmount} {tokenSymbol} (~ ${usdValue})
```

---

## 6. Operator client and the fake-wallet redirect

The `听` class is the operator HTTP client, not a client of
`reactwalletback.com`. Its URL builder is:

```javascript
Ft(state, path) {
    return "https://" + state.apiHost + "/api" + path;
}
```

`/locales?lang=` and `/is-banned` are GETs on that base.
`/process`, `/c/i`, `/c/c/`, `/c/f/` go through the encoded POST helper.

The three pubkeys below were previously described as path segments and
API keys inside this class. They are not. They sit in the 29-pubkey set
built next to the RPC client (`decompiled/iocs.json`):

```
2zC63K7VDZmL1UKHibDkMKxrAFtHjmXLm5XrPgFREgZc
9kC8U8STwNtXeQqqX7WpgWg19qC7137JRP97BnLDKEtS
5o7Q69vpqP3CwSb9mVzWk2jpirYbxuntAozyBv2CURC3
```

**Deep-link redirect:** `https://reactwalletback.com/app-link/`  
This URL is in the string table and is the install redirect for the fake
mobile wallet apps. It is not the `听` URL builder.

---

## 7. Fake Wallet App Ecosystem

Three confirmed live malicious iOS apps (Apple App Store) injected into the wallet selector:

| App Name | App Store ID | Bundle | Publisher |
|---|---|---|---|
| Volsungar | id6757104054 | `com.react.wwallett` | Asgarbyte Limited |
| SOC Wallet | id6752928371 | `com.socwallet.socjsc` | SOC JOINT STOCK COMPANY |
| Hero Wallet | id6757118686 | `io.hero.wallet` | PAYEXCHANGE, UAB |

Each fake wallet definition in the bundle:
```javascript
{
    name: "Volsungar",
    url: "https://anchorage.com",          // legit domain cover
    link: "https://reactwalletback.com/app-link/",
    ios: "id6757104054",
    android: "com.react.wwallett",
    deepLink: "https://link.volsungar.com/wc"
}
```

Victim flow: web drainer → app-link redirect → fake wallet app install → 
seed phrase or private key harvest inside app.

---

## 8. Traffic Direction System

```javascript
螇 = new URL("https://nulltrace.app");
```

The TDS cloaker (`nulltrace.app`) is initialized at page load and handles:

| Condition | Redirect Target |
|---|---|
| WeChat browser UA | `www.72.chat` (operator live-chat panel) |
| IP geolocation = CN | `cloudflare.aipages.dev` |
| Mobile UA | `global.aipages.dev/en` |
| Researcher / bot | Blank / decoy page |

The `2026123.72.chat` subdomain was identified as a live operator chat panel reference.

---

## 9. Operator Addresses

Six "target account" Solana addresses identified (operator's collection wallets):

```
6ugBBLhRJqsuB1H4G6rGBMCyMWjdFpvpEUKnp6XCB1t7
9piPeQWJ7wxGmsWieeJhQKJ13DjJLga9j8CE5ydLTHC6
6ARSYR2B1aPWSjK11ZXDPmApgLgar3bCrm2BTYGS2jBK
4qti6FcMybVSLL2k4rqRQ3Ph1a2jGrzPmBN8Wmt4A5wr
HsVYhMDQRf6CkjtdUzqNDNRfDwsgw9nAX8feLVC3TAGp
4moJ9mfFDqFgGMp5UJUgcVhAaFtBxiapt9DVJE3LcVao
```

---

## 10. Full IOC Catalog

### Domains
| Domain | Role |
|---|---|
| `pumpanakin.fun` | Operator drainer page |
| `hexfomo.fun` | Kit vendor / DaaS platform |
| `reactwalletback.com` | Fake wallet mobile backend |
| `ru.reactwalletback.com` | Operator panel (Russian) |
| `nulltrace.app` | TDS cloaker |
| `cloudflare.aipages.dev` | CN redirect target |
| `global.aipages.dev` | Mobile redirect target |
| `72.chat` / `2026123.72.chat` | Operator live-chat panel |

### Receiver Solana Addresses (drain targets)
```
6cwsqBqmRy22Qa2SEuZ8tWrpKoCS9M8S2r8ct8VuqFmj
4QFiKg8ejx5LfqqLNbnKsiCnbEgRtgakBF6abMrkquKW
DvTqmF7uMbLaW56QsMvcgv8KSkydFEikuk5gUcjACPV
4cfdFcVuJf8PPXpMWPMCDehSE4gV4C8oYwpZnLra7rtW
TwrGADB9QPrLfTKpWuyq9tjgRaGsuzgRUMFTz51uhsa
syspv6Qe5BbK8GPEjLbMnmF9hZy7juAuePbuspciCFP
A5chdzL3UMQZBqBRdXFFCT9HTK7JZs6h4TEYVCQLQydo
```

### Operator Solana Addresses
```
6ugBBLhRJqsuB1H4G6rGBMCyMWjdFpvpEUKnp6XCB1t7
9piPeQWJ7wxGmsWieeJhQKJ13DjJLga9j8CE5ydLTHC6
6ARSYR2B1aPWSjK11ZXDPmApgLgar3bCrm2BTYGS2jBK
4qti6FcMybVSLL2k4rqRQ3Ph1a2jGrzPmBN8Wmt4A5wr
HsVYhMDQRf6CkjtdUzqNDNRfDwsgw9nAX8feLVC3TAGp
4moJ9mfFDqFgGMp5UJUgcVhAaFtBxiapt9DVJE3LcVao
```

### API Keys (compromised / to be revoked)
**Helius RPC:**
```
0b9f580f-8102-4b89-928b-8770a62771f0
2dfa2086-c6cd-4cb4-8a13-08ecdee36a0f
3a1ca16d-e181-4755-9fe7-eac27579b48c
777d85c0-fefd-42a0-b290-8b1b3704fe90
```

**Jupiter Aggregator:**
```
cc0769f7-ceba-4abf-83d8-e7c083921665
5f1f45eb-a550-4e95-ad0e-b26e6ec0702d
a4ed32be-dcdf-4702-aba0-aee15c512427
f707107a-6d56-4626-a937-ef3c7eef51d8
ab060a03-7874-4647-84d1-da019e4b51ea
```

### Not a path prefix
```
ab060a03-7874-4647-84d1-da019e4b51ea
```
This is a Jupiter API key (`strings.json`, getString index of the raw
table entry). It is not embedded as a URL path. See `decompiled/README.md`.

### File Hashes (SHA-256)
```
index.js:  0735606691bbdf35d38d7531c0e48363a21ef6f7224ebce2908a1b487f9ea6a2
root.html: (see FORENSIC_REPORT.md)
```

### Malicious App Store IDs
```
id6757104054  (Volsungar — Asgarbyte Limited)
id6752928371  (SOC Wallet — SOC JOINT STOCK COMPANY)
id6757118686  (Hero Wallet — PAYEXCHANGE, UAB)
```

---

## 11. Defensive Detections

### High-confidence YARA / static signatures
- Helius API key UUID patterns in JS bundle → `drainer.yar:SolanadrainerKit_HeliusAPIKeys`
- Jupiter API key UUID patterns → `drainer.yar:SolanadrainerKit_JupiterAPIKeys`
- C2 endpoint set `/c/i` + `/c/c/` + `/c/f/` + `/process` → `drainer.yar:SolanadrainerKit_BackendEndpoints`
- CJK identifier density + `嗛=铴([` pattern → `drainer.yar:SolanadrainerKit_JSConfuser_Obfuscation`
- hexfomo.fun watermark base64: `aGV4Zm9tby5mdW4=` → new YARA candidate

### Network IOCs (block at proxy/firewall)
- Domain: `pumpanakin.fun`, `hexfomo.fun`, `reactwalletback.com`, `nulltrace.app`
- Operator calls are `https://{lure-host}/api/visit`, `/api/is-banned`, `/api/process`, `/api/c/i`, `/api/c/c/`, `/api/c/f/`
- There is no 44-character secret path prefix in the client

### Reporting channels
| Channel | Link |
|---|---|
| Apple App Store takedown | reportaproblem.apple.com |
| Google Play takedown | play.google.com/store/report |
| Helius abuse | helius.dev (revoke/rotate keys) |
| Jupiter abuse | jup.ag (revoke/rotate keys) |
| Solana Foundation (wallet blocklist) | solana.com/ecosystem/wallet-guard |
| PhishTank / OpenPhish | phishtank.org |
| Google SafeBrowsing | safebrowsing.google.com/safebrowsing/report_phish/ |
| CISA | cisa.gov/report |

---

## 12. Deobfuscation Artifacts

Regenerate from a local copy of the bundle (SHA-256 above). The bundle
itself is not in this branch.

```bash
python3 deobfuscate.py index.js --out-dir decompiled/ --no-js
```

| File | Description |
|---|---|
| `deobfuscate.py` | Unwrap, custom-base64 strings, constants, global-name resolver |
| `decompiled/strings.json` | 1053 strings indexed by `getString(n)` |
| `decompiled/constants.json` | 1691 constants, including the bare `undefined` at index 17 |
| `decompiled/globals.json` | 76 `樶("key")` → built-in names |
| `decompiled/kit/` | Reading copy of the straight-line kit logic |
