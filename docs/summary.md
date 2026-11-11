# Bundle Analysis: target-sample Solana Bundle

**Classification:** Flagged / Active Sample  
**Date of Analysis:** 2026-11-10  
**Methodology:** Static analysis only. No operator code executed. No funds moved. No POST requests sent to operator infrastructure.

---

## 1. Executive Summary

**target-sample** is an active Solana cryptocurrency payload operating as a fake "TRUMP COIN" token presale page. The site serves a heavily obfuscated JavaScript bundle (~1 MB, JS-Confuser with CJK-character identifiers) that enumerates and silently transfers all Solana assets from connected wallets.

The kit is sold as a **software-as-a-service (SaaS)** product. The vendor watermark `vendor-ref` is embedded inside every Solana transaction instruction built by the payload. The operator communicates with victims through alt client apps distributed on the **Apple App Store** and **Google Play** (Volsungar / `com.react.wwallett`, SOC Wallet / `com.socwallet.socjsc`), and receives victim notifications via a server-side Telegram relay.

---

## 2. Lure Page & Infrastructure

| Item | Value |
|---|---|
| Domain | `target-sample` |
| Lure theme | "TRUMP COIN" fake token presale |
| Hosting | Cloudflare CDN + nginx reverse proxy |
| Fake countdown | `sbdst.js` (Russian: "Время вышло!" — Time's up!) |
| Backend API | Same origin (`/api/`, `/c/`, `/process`, `/is-banned`, `/config`) |

The lure page (`/`) loads jQuery, a fake presale countdown script written in Russian, and the main payload bundle.

---

## 3. Obfuscation Analysis

| Layer | Technique |
|---|---|
| Outer wrapper | `Function("拀", encodedBody)(...)` — eval via constructor |
| Identifier names | CJK characters (U+4E00–U+9FFF) throughout |
| String encoding | Custom base64 variant: 64-char map built from constants array; `縊()` decoder; `TextDecoder("utf-8")` |
| String table | `嗛 = 铴([...])` — 1053 encoded string entries |
| Constant array | `囉 = [2,3,4,...]` — 1691 literal constants |
| Control flow | While/switch flattening: `while(a+b+c !== -111) { switch(...) {...} }` |

The string table is decoded lazily via `function 娨(n)` accessor with cache `餢={}`. All 1053 string entries were fully decoded and are listed in `decoded_strings.json`.

---

## 4. Drain Flow

1. **Page load** → `GET /api/visit` (visit tracking), `GET /is-banned` (geo/IP filter)
2. **Locale load** → `GET /locales?lang=<lang>` (internationalized UI)
3. **Config fetch** → `GET /config` (operator configuration)
4. **Wallet connect** → WalletConnect AppKit modal with injected alt clients (see §9)
5. **Asset enumeration** → Helius RPC + Solflare API + Jupiter: discovers SOL, SPL tokens, NFTs, staked SOL
6. **Transaction build** → Constructs transfer transactions; embeds `vendor-ref` watermark in each instruction
7. **Social-engineering loop** → "Sign all transactions to verify your account", "funds will be refunded soon", fake Phantom/Trust endorsement strings
8. **Transaction sign** → Forces victim to sign; re-prompts with new social-engineering text if rejected
9. **Drain** → `POST /process` to broadcast the signed transaction
10. **Operator notify** → `POST /c/i` (initial connect), `POST /c/c/` (confirm), `POST /c/f/` (final/transfer complete)

---

## 5. Social-Engineering Strings

The kit uses these strings to manipulate victims into signing transfer transactions:

- `"Sign all transactions to verificate your account"`
- `"Transaction was reverted, funds will be refunded soon. Please try again."`
- `"This DApp uses Abuse Protection to prevent misuse"`
- `"hasn't been reviewed by Phantom yet, but it is listed in trusted community"`
- `"not yet displayed correctly in Phantom"`
- `"The transaction has expired"` / `"Please sign it one more time"`
- `"Please allow one more verification step"`
- Three fake social-engineering videos: `flagged.webm`, `200tx.webm`, `refund.webm`

---

## 6. Backend API Protocol

The payload communicates with its own backend via a bearer-token-authenticated fetch wrapper (`锏`). All calls use relative paths resolving to `target-sample`:

| Endpoint | Purpose |
|---|---|
| `GET /api/visit` | Victim visit tracking |
| `GET /is-banned` | IP/geo blocklist check |
| `GET /locales?lang=<lang>` | Internationalized UI strings |
| `GET /config` | Operator configuration |
| `GET /api/handler` | (asset handler initialization) |
| `POST /process` | Broadcast signed transfer transaction |
| `POST /c/i` | Initial wallet-connect notification to operator |
| `POST /c/c/` | Confirmation notification |
| `POST /c/f/` | Final (transfer complete) notification |

**Telegram relay:** The `/c/*` endpoints relay victim events to the operator's Telegram bot. The bot token and chat ID are stored exclusively server-side. The client only sends JSON payloads to these relay endpoints — no Telegram credentials are present in the client JavaScript.

---

## 7. Operator Solana Addresses

### Receiver Addresses (direct transfer targets)

| Address | Form in code |
|---|---|
| `6cwsqBqmRy22Qa2SEuZ8tWrpKoCS9M8S2r8ct8VuqFmj` | Base64-encoded in string table |
| `4QFiKg8ejx5LfqqLNbnKsiCnbEgRtgakBF6abMrkquKW` | Base64-encoded in string table |
| `DvTqmF7uMbLaW56QsMvcgv8KSkydFEikuk5gUcjACPV` | Plain |
| `4cfdFcVuJf8PPXpMWPMCDehSE4gV4C8oYwpZnLra7rtW` | Plain |
| `TwrGADB9QPrLfTKpWuyq9tjgRaGsuzgRUMFTz51uhsa` | Plain |
| `syspv6Qe5BbK8GPEjLbMnmF9hZy7juAuePbuspciCFP` | Plain |
| `A5chdzL3UMQZBqBRdXFFCT9HTK7JZs6h4TEYVCQLQydo` | Plain |

### "Target Account" Operator Addresses (event identifiers / operator wallets)

| Address |
|---|
| `6ugBBLhRJqsuB1H4G6rGBMCyMWjdFpvpEUKnp6XCB1t7` |
| `9piPeQWJ7wxGmsWieeJhQKJ13DjJLga9j8CE5ydLTHC6` |
| `6ARSYR2B1aPWSjK11ZXDPmApgLgar3bCrm2BTYGS2jBK` |
| `4qti6FcMybVSLL2k4rqRQ3Ph1a2jGrzPmBN8Wmt4A5wr` |
| `HsVYhMDQRf6CkjtdUzqNDNRfDwsgw9nAX8feLVC3TAGp` |
| `4moJ9mfFDqFgGMp5UJUgcVhAaFtBxiapt9DVJE3LcVao` |

---

## 8. API Keys (Compromised / Revocable)

### Helius RPC API Keys

| Key |
|---|
| `0b9f580f-8102-4b89-928b-8770a62771f0` |
| `2dfa2086-c6cd-4cb4-8a13-08ecdee36a0f` |
| `3a1ca16d-e181-4755-9fe7-eac27579b48c` |
| `777d85c0-fefd-42a0-b290-8b1b3704fe90` |

**Action:** Report to Helius at security@helius.dev — these keys should be revoked.

### Jupiter Aggregator API Keys

| Key |
|---|
| `cc0769f7-ceba-4abf-83d8-e7c083921665` |
| `5f1f45eb-a550-4e95-ad0e-b26e6ec0702d` |
| `a4ed32be-dcdf-4702-aba0-aee15c512427` |
| `f707107a-6d56-4626-a937-ef3c7eef51d8` |
| `ab060a03-7874-4647-84d1-da019e4b51ea` |

**Action:** Report to Jupiter at security@jup.ag — these keys should be revoked.

---

## 9. Alt Client Apps (SaaS Ecosystem)

The payload injects alt clients into WalletConnect's AppKit modal. When victims "connect" these wallets, they install the payload's mobile apps. All confirmed flagged:

| Wallet Name | Deep Link | iOS App Store ID | Android Bundle / Link |
|---|---|---|---|
| **Volsungar** | `https://alt-backend/app-link/` | `id6757104054` | `com.react.wwallett` |
| **SOC Wallet** | `onlybulls://wallet` | `id6752928371` | `com.socwallet.socjsc` |
| **Outlaw Wallet** | `https://onlybulls.com` | — | `com.askroi.onlybulls` |
| **DaffiOne** | — | — | `com.me.daffione` |
| **Hero Wallet** | `talkapp://` | `id6757118686` | `io.hero.wallet` |
| **Nest Wallet** | `socwallet://` | `id6451122334` | `outlaw://` |
| **Oblio Wallet** | `https://dlicom.me` | — | `com.shlenpower.dlicom` |
| **Kotai Wallet** | `gk8://main` | — | — |
| **Tidus Wallet** | `com.kotaiwallet.app.android` | — | `volsungar://` |

**Confirmed live Apple App Store listings:**

- **Volsungar** (id6757104054, `com.volsungar.wallet`): "Asgarbyte Limited", released 2026-01-13, v1.3.37, genre: Finance — **Report to Apple via reportaproblem.apple.com**
- **SOC Wallet** (id6752928371, `com.socwallet.socjsc`): "SOC JOINT STOCK COMPANY" — **Report to Apple**
- **Hero Wallet – Crypto & Web3** (id6757118686, `io.hero.wallet`): "PAYEXCHANGE, UAB" — **Report to Apple**

---

## 10. Kit Vendor Watermark: vendor-ref

Every Solana transfer transaction instruction built by the kit contains a base64-encoded vendor watermark:

**Embedded binary (base64):**
```
iAAD6AMAAMb6evO+2606PWXzaqvJdDGxu+TC0vbg5HymAgNFL11hYGUBswLhgBiS+AopefWF+IVdDyA0
eQokVfdE+sUD17UnZJe6C7hlkXK3Lt2MZuGPVhdk2chqYQo6fg95wLr52wZAf0AAAAAAAD/wAAAAAAAA
BQAAAAUAAAAAAAAAAAEAAAAAAAALaGV4Zm9tby5mdW4EVVNEQwAA
```

**Decoded strings:** `vendor-ref`, `USDC`

This is a Solana instruction that embeds the payload vendor's domain `vendor-ref` as a string in every transaction. This watermarks all transactions created by this kit family in the blockchain, making on-chain attribution possible.

**vendor-ref** appears to be the kit vendor's domain (not the operator). Certificate transparency shows only `vendor-ref` and `www.vendor-ref`. The domain was not reachable at time of analysis (502 from proxy).

---

## 11. Supporting Infrastructure

### alt-backend
- **Role:** Backend server for the "Volsungar" alt client mobile app
- **API:** Responds with `{"success":false,"message":"Route not found","data":{},"server":{"time":"..."}}` on unknown routes — live Node.js/Express API
- **Subdomains:** `ru.alt-backend` (Russian-language panel), `www.alt-backend`
- **Hosting:** Cloudflare (172.67.210.147, 104.21.37.163)
- **Android bundle:** `com.react.wwallett`
- **iOS bundle:** `com.volsungar.wallet` (App Store: "Asgarbyte Limited")

### tds-proxy
- **Role:** Traffic Direction System (TDS) / cloaker embedded directly in the payload client JS
- **Behavior:**
  - WeChat users → redirects to Baidu search for `www.72.chat`
  - Chinese browser/locale → redirects to `cloudflare.aipages.dev`
  - Non-mobile PC → `search.aipages.dev/en`
  - Mobile non-Chinese → `global.aipages.dev/en`
- **Significance:** The reference to `72.chat` and `2026123.72.chat` suggests the operator uses the **72.chat** Chinese live-chat platform (operator panel ID `2026123`) for victim customer-service communications

### onlybulls.com
- **Role:** Domain associated with the SOC Wallet / Outlaw Wallet payload mobile apps
- **Android bundles:** `com.askroi.onlybulls` (Outlaw Wallet)
- **App Store:** SOC Wallet (id6752928371, `com.socwallet.socjsc`, "SOC JOINT STOCK COMPANY")

### 72.chat
- **Role:** Chinese live-chat/customer-service SaaS platform
- **Operator panel:** `2026123.72.chat` — likely used by the operator to manage victim support interactions
- **Password-protected** with multi-language redirect logic referencing `aipages.dev`

---

## 12. Full Indicator of Compromise (indicator) Catalog

### Domains
```
target-sample          # payload operator
vendor-ref             # bundle vendor (watermark)
alt-backend     # alt client backend
ru.alt-backend  # payload panel (Russian)
tds-proxy           # traffic direction system
onlybulls.com           # alt client domain
dlicom.me               # alt client domain (Oblio)
```

### Mobile App Identifiers
```
com.react.wwallett      # Volsungar Android payload app
com.volsungar.wallet    # Volsungar iOS (id6757104054, "Asgarbyte Limited")
com.socwallet.socjsc    # SOC Wallet iOS (id6752928371, "SOC JOINT STOCK COMPANY")
com.askroi.onlybulls    # Outlaw Wallet Android
com.me.daffione         # DaffiOne Android
com.shlenpower.dlicom   # Oblio Wallet Android
io.hero.wallet          # Hero Wallet iOS (id6757118686, "PAYEXCHANGE, UAB")
```

### Solana Receiver Addresses
```
6cwsqBqmRy22Qa2SEuZ8tWrpKoCS9M8S2r8ct8VuqFmj
4QFiKg8ejx5LfqqLNbnKsiCnbEgRtgakBF6abMrkquKW
DvTqmF7uMbLaW56QsMvcgv8KSkydFEikuk5gUcjACPV
4cfdFcVuJf8PPXpMWPMCDehSE4gV4C8oYwpZnLra7rtW
TwrGADB9QPrLfTKpWuyq9tjgRaGsuzgRUMFTz51uhsa
syspv6Qe5BbK8GPEjLbMnmF9hZy7juAuePbuspciCFP
A5chdzL3UMQZBqBRdXFFCT9HTK7JZs6h4TEYVCQLQydo
```

### Operator Event Wallets
```
6ugBBLhRJqsuB1H4G6rGBMCyMWjdFpvpEUKnp6XCB1t7
9piPeQWJ7wxGmsWieeJhQKJ13DjJLga9j8CE5ydLTHC6
6ARSYR2B1aPWSjK11ZXDPmApgLgar3bCrm2BTYGS2jBK
4qti6FcMybVSLL2k4rqRQ3Ph1a2jGrzPmBN8Wmt4A5wr
HsVYhMDQRf6CkjtdUzqNDNRfDwsgw9nAX8feLVC3TAGp
4moJ9mfFDqFgGMp5UJUgcVhAaFtBxiapt9DVJE3LcVao
```

### Helius API Keys
```
0b9f580f-8102-4b89-928b-8770a62771f0
2dfa2086-c6cd-4cb4-8a13-08ecdee36a0f
3a1ca16d-e181-4755-9fe7-eac27579b48c
777d85c0-fefd-42a0-b290-8b1b3704fe90
```

### Jupiter API Keys
```
cc0769f7-ceba-4abf-83d8-e7c083921665
5f1f45eb-a550-4e95-ad0e-b26e6ec0702d
a4ed32be-dcdf-4702-aba0-aee15c512427
f707107a-6d56-4626-a937-ef3c7eef51d8
ab060a03-7874-4647-84d1-da019e4b51ea
```

### File Hashes
```
index.js (payload bundle)   SHA-256: 0735606691bbdf35d38d7531c0e48363a21ef6f7224ebce2908a1b487f9ea6a2
root.html (lure page)       SHA-256: (see YARA rules)
sbdst.js (countdown)        SHA-256: (see YARA rules)
jxi33.js (jQuery)           SHA-256: f5ad72b1...61f5
```

---

## 13. MITRE ATT&CK Mapping

| ID | Tactic | Technique | Description |
|---|---|---|---|
| T1566.002 | Initial Access | Spearsocial-engineering Link | Telegram operator shares payload URL to victims |
| T1056.004 | Collection | Credential API Hooking | Wallet-connect modal captures wallet key signing |
| T1027.010 | Defense Evasion | Command Obfuscation | JS-Confuser CJK obfuscation, custom base64, control-flow flattening |
| T1497.001 | Defense Evasion | System Checks | `/is-banned` geo/IP blocklist; TDS cloaker (tds-proxy) |
| T1041 | Exfiltration | Exfiltration Over remote-api Channel | Signed transactions broadcast via `/process`; operator notified via `/c/*` → Telegram |
| T1583.001 | Resource Development | Domains | target-sample, vendor-ref, alt-backend, tds-proxy |
| T1588.004 | Resource Development | Digital Certificates | Cloudflare TLS for all operator domains |
| T1434 | Discovery | Asset Discovery | Helius RPC + Solflare API enumerate all victim SPL tokens, NFTs, staked SOL |

---

## 14. Reporting Channels

### Telegram (Operator notification relay)
The bot token is server-side only. Report the domains and mobile apps instead:
- **Telegram abuse:** https://telegram.org/support or @abuse on Telegram
- Domains to report: `target-sample`, operator's Telegram bot (obtain via platform cooperation)

### Apple App Store (confirmed flagged apps)
Report each via **https://reportaproblem.apple.com** or the App Store app → Report a Problem:
- Volsungar (`id6757104054`, "Asgarbyte Limited")
- SOC Wallet (`id6752928371`, "SOC JOINT STOCK COMPANY")
- Hero Wallet (`id6757118686`, "PAYEXCHANGE, UAB")

### Google Play / Android
Search and report:
- `com.react.wwallett` (Volsungar)
- `com.socwallet.socjsc` (SOC Wallet)
- `com.askroi.onlybulls` (Outlaw Wallet)
- `com.me.daffione` (DaffiOne)
- `com.shlenpower.dlicom` (Oblio Wallet)
- `io.hero.wallet` (Hero Wallet)

### Helius (API key revocation)
Email: **security@helius.dev** — provide the 4 API keys from §8

### Jupiter (API key revocation)
Email: **security@jup.ag** — provide the 5 API keys from §8

### Domain Registrars / ICANN
- WHOIS lookup target-sample, vendor-ref, alt-backend, tds-proxy, onlybulls.com
- File abuse reports with respective registrars

### Solana / Blocklist
- Submit all 13 Solana addresses to: https://github.com/solana-labs/explorer
- ETH social-engineering detect: https://github.com/MetaMask/eth-social-engineering-detect (even for Solana payloads, cross-submit for visibility)
- Blowfish: https://docs.blowfish.xyz/docs/reporting-issues

### Cloudflare
- Abuse form: https://abuse.cloudflare.com — submit target-sample, alt-backend, tds-proxy

---

## 15. Detection Rules

See `payload.yar` for YARA rules covering:
- Exact SHA-256 hash match (confirmed bundle)
- JS-Confuser CJK obfuscation byte patterns
- Hardcoded Helius/Jupiter API keys
- Operator Solana addresses (plain and base64-encoded)
- Social-engineering strings
- Backend endpoint set (`/c/i`, `/c/c/`, `/c/f/`, `/process`, etc.)
- WebM social-engineering video references
- Combined high-confidence rule `SolanapayloadKit_FullMatch`

See `payload_scan.py` for a Python CLI scanner (no dependencies):
```
python3 payload_scan.py https://suspicious-site.example.com
python3 payload_scan.py --file bundle.js --json
```

---

## 16. Kit Family Identification

This kit is part of the **vendor-ref payload family** (named after the vendor watermark embedded in every transaction). The vendor sells the kit to operators who deploy it on their own domains with their own Telegram bots.

**Shared kit indicators across all deployments:**
- JS-Confuser obfuscation with CJK character identifiers
- `vendor-ref` USDC watermark embedded in every Solana transaction
- Fake wallet apps in WalletConnect modal (Volsungar, SOC Wallet, Hero Wallet, etc.)
- Backend API endpoints: `/c/i`, `/c/c/`, `/c/f/`, `/process`, `/api/visit`
- Telegram relay at `/c/*` endpoints
- tds-proxy TDS for traffic direction/cloaking
