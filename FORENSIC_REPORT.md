# Forensic Report: pumpanakin.fun — Solana Drainer Kit

**Date:** 2026-11-10  
**Analysis type:** Static only — all files fetched via GET and read as text; no attacker code executed; no POST to attacker infrastructure.  
**Analyst:** Defensive research lab

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Infrastructure](#2-infrastructure)
3. [Site Structure and Assets](#3-site-structure-and-assets)
4. [Obfuscation Method](#4-obfuscation-method)
5. [Drainer Architecture](#5-drainer-architecture)
6. [Drain Flow](#6-drain-flow)
7. [Backend API Protocol](#7-backend-api-protocol)
8. [Social Engineering](#8-social-engineering)
9. [Supported Wallets](#9-supported-wallets)
10. [Targeted Tokens](#10-targeted-tokens)
11. [IOC Catalog](#11-ioc-catalog)
12. [MITRE ATT&CK](#12-mitre-attck)
13. [Detection Guidance](#13-detection-guidance)
14. [Victim Remediation](#14-victim-remediation)
15. [Reporting](#15-reporting)

---

## 1. Executive Summary

**pumpanakin.fun** is a Solana crypto drainer kit targeting users of pump.fun, Backpack, Phantom, Axiom, and other Solana trading platforms.

The lure page impersonates a "TRUMP COIN" presale (title chosen at analysis time; the domain is multi-brand reusable). It is a **Nuxt.js SPA** served over Cloudflare. The main payload is a ~1 MB JavaScript bundle obfuscated with **JS-Confuser** using CJK identifiers, an encoded string table of 1 053 entries, and control-flow flattening via a `Function()` wrapper.

Upon wallet connection, the kit:
1. Calls the backend (`/api/visit`, `/config`) to register the victim and receive operator configuration.
2. Enumerates SOL balance and all SPL tokens via **Helius RPC** (4 hardcoded API keys) and **Jupiter** / **Solflare** portfolio APIs.
3. Constructs drain transactions (SOL transfer, SPL token transfers, stake-account withdrawals).
4. Social-engineers the victim into signing them (fake Phantom/Trust safety endorsements, "transaction expired" loops, "verificate your account" coercion).
5. Ships signed transactions to the backend (`/process`), which broadcasts them on-chain.
6. Reports each step to the operator (likely via Telegram) using the `/c/i`, `/c/c/`, `/c/f/` ping endpoints.

The domain was registered **2026-11-02** and confirmed in the **MetaMask eth-phishing-detect** blocklist as of 2026-11-10. The backend server is **nginx** behind **Cloudflare**, with a DNS nameserver pair (dana/ethan.ns.cloudflare.com) distinct from the ClickFix infrastructure on pumpadmin.fun.

---

## 2. Infrastructure

| Field | Value |
|---|---|
| Domain | pumpanakin.fun |
| Registrar | PDR Ltd. (PublicDomainRegistry) |
| Created | 2026-11-02 16:58 UTC |
| Cloudflare NS | dana.ns.cloudflare.com / ethan.ns.cloudflare.com |
| IP (via CF) | 104.21.49.129, 172.67.163.63 |
| Backend server | nginx (via CF Proxy) |
| TLS certs issued | 2026-11-02, 7 certificates: GTS CA 1P5, Let's Encrypt R10/E5/E6, SSL.com (various), wildcard `*.pumpanakin.fun` |
| Backend 404 responses | nginx-branded; not CF-generated |
| File timestamps | Last-Modified: 2025-12-09 (pre-dating domain registration — static assets likely reused from prior campaign) |

> **Note:** The Cloudflare account for pumpanakin.fun is different from the one used by pumpadmin.fun and proximadeploy.app (the ClickFix infostealer campaign). These are independent operations.

---

## 3. Site Structure and Assets

| Path | SHA-256 | Size | Type |
|---|---|---|---|
| `/` (root HTML) | — | — | Lure page, title "TRUMP COIN" |
| `/_nuxt/assets/index.js?aa6524x` | `0735606691bbdf35d38d7531c0e48363a21ef6f7224ebce2908a1b487f9ea6a2` | 1 048 576 B | Main drainer bundle (JS-Confuser obfuscated) |
| `assets/js/jxi33.js?0s3xodk` | `f5ad72b13a3ba6614caeb70e4306d690f6939b752e28dc0ec48c2182647761f5` | — | jQuery 1.x (unmodified) |
| `assets/js/sbdst.js?717o97x` | `14e67de9e4fbeb6ce7e5cc71179ba0c210714d73a998c9b94c5560d5b716b5cb` | — | Fake presale countdown; alert "Время вышло!" (Russian) |
| `assets/css/wzi2d.css?fmgixv9` | `3dceb95008e42edc1006ca00b961e411d32430ded84d47d97d1acd41176d0211` | — | Lure page styles |
| `/_nuxt/media/malicious.webm` | — | 1 671 081 B | Social-engineering video (shown during drain) |
| `/_nuxt/media/200tx.webm` | — | 1 694 507 B | Social-engineering video |
| `/_nuxt/media/refund.webm` | — | 697 271 B | Social-engineering video ("refund" lure) |

Backend endpoints that **return 404 to GET** (require POST with correct payload):
`/api`, `/api/visit`, `/api/handler`, `/process`, `/c/i`, `/c/c/`, `/c/f/`, `/is-banned`, `/config`, `/locales?lang=`

---

## 4. Obfuscation Method

The bundle uses **JS-Confuser** with the following techniques:

| Technique | Implementation |
|---|---|
| Identifier renaming | All identifiers replaced with CJK characters (U+4E00–U+9FFF range) |
| String encoding | Encoded string table `嗛=铴([...])`, 1 053 entries; accessor `娨(n)` decodes lazily into cache `餢` |
| String decode algorithm | Custom base64 variant: 64-char map `嬹` built from `囉` constants; `縊()` function; `TextDecoder("utf-8")`; padding char `=`; shift 6; word 8; mask 255 |
| Control-flow flattening | Dispatcher pattern inside `while(a+b+c !== -111) { switch(a+b+c) { ... } }` with arithmetic state updates |
| Dead code / decoys | Indices 12–35 of string table are random-looking decoy strings |
| Global scope | Entire payload wrapped in `Function("拀", body)(...)` — classic JS-Confuser sandbox |
| Constants array | `囉[n]` holds 1 691 literal values (property names, small integers, format strings) used throughout |

---

## 5. Drainer Architecture

```
Browser                       pumpanakin.fun backend        Telegram
   │                                  │                        │
   │  GET /                           │                        │
   │◄─────────────────────────────────│                        │
   │  (lure HTML + sbdst.js countdown)│                        │
   │                                  │                        │
   │  GET /_nuxt/assets/index.js      │                        │
   │◄─────────────────────────────────│                        │
   │  (1 MB obfuscated drainer bundle)│                        │
   │                                  │                        │
   │  POST /api/visit                 │                        │
   │─────────────────────────────────►│  notify operator       │
   │  POST /is-banned                 │─────────────────────────►
   │◄─────────────────────────────────│                        │
   │  (banned? → redirect)            │                        │
   │                                  │                        │
   │  user clicks "Connect Wallet"    │                        │
   │◄─────── wallet adapter ──────────│                        │
   │                                  │                        │
   │  GET Helius RPC (balances)       │                        │
   │  GET Jupiter (prices, tokens)    │                        │
   │  GET Solflare API (portfolio)    │                        │
   │                                  │                        │
   │  POST /api/handler  (wallet addr)│  notify operator       │
   │─────────────────────────────────►│─────────────────────────►
   │  GET /config                     │                        │
   │◄─────────────────────────────────│                        │
   │  (config: drain params)          │                        │
   │                                  │                        │
   │  POST /c/i  (initial connect)    │  Telegram: #connect    │
   │─────────────────────────────────►│─────────────────────────►
   │                                  │                        │
   │  drain tx construction:          │                        │
   │  • SOL transfer to receiver      │                        │
   │  • SPL token transfers           │                        │
   │  • stake-acct withdrawals        │                        │
   │  social-engineering popups       │                        │
   │  user signs transactions         │                        │
   │                                  │                        │
   │  POST /process (signed txs)      │                        │
   │─────────────────────────────────►│  broadcast on-chain    │
   │                                  │  notify Telegram        │
   │                                  │─────────────────────────►
   │  POST /c/c/ (connected ack)      │                        │
   │  POST /c/f/ (finished status)    │                        │
   │─────────────────────────────────►│─────────────────────────►
```

---

## 6. Drain Flow

### 6.1 Connection phase
- Wallet adapters active: Phantom, Backpack, Solflare, OKX, Glow, Coinbase Wallet, Trust Wallet, Bitget, MetaMask Snap, Exodus, SafePal, MathWallet, MagicEden, Coin98, Zerion, Kraken, WalletConnect/Reown.
- Also handles **Telegram WebApps** (`tgWebAppData`), enabling targeting inside Telegram mini-apps.
- Sign-In-With-Solana (SIWS) used as the primary pretext: victim signs a login message.

### 6.2 Asset enumeration
- **SOL balance**: via Helius `getLatestBlockhash` + `getMultipleAccounts`.
- **SPL tokens**: Jupiter `/price/v3?ids=` and `/tokens/v2/search?query=`; Solflare `v3/portfolio/tokens/` and `v2/portfolio/stake/`.
- **Stake accounts**: Solflare `v2/swap/capped-tokens` + `SysvarStakeHistory`, `Stake11111111111111111111111111111111111111`.
- Target token list (all SPL + SOL): `So111…112` (native SOL), USDT, JUP, PUMP (`pumpCmXqMfrsAkQ5r49WcJnRayYRqmXz6ae8H7H9Dfn`), WBTC, ETH, ASTER, PENGU, Bonk, RAY, Fartcoin, and others from the token list at indices 260–288.
- DeFi positions: Raydium CLMM (`CAMMCzo5…`), Meteora DLMM (`LBUZKhRx…`), Whirlpool (`whirLbMi…`).

### 6.3 Transaction construction
- **Drain recipients**: at least 9 distinct attacker addresses (see IOC section).
- Programs used: `TokenkegQfe…` (Token), `TokenzQdBN…` (Token-2022 / Token Extensions), `ATokenGPvbd…` (ATA), `ComputeBudget111…`, `Raydium CLMM`, `Meteora LBUZKhRx…`, `Orca Whirlpool`.
- `transferFeeConfig` handling: drainer is aware of Token-2022 transfer fees and accounts for them.
- `getLatestBlockhash` → `lastValidBlockHeight` tracked for transaction expiry.

### 6.4 Signing phase
- `signTransaction`, `signAllTransactions`, `signMessage` intercepted on the wallet adapter.
- If the victim cancels or Phantom shows a warning: social-engineering overlay triggered (see §8).
- Multiple sign attempts forced via "transaction expired" / "reverted" loops.
- `sol_signAllTransactions` used for Coin98 adapter.

### 6.5 Exfiltration
- Signed transactions sent to `/process` (POST, JSON body).
- Backend broadcasts transactions on-chain via its own RPC.
- Result reported via `/c/f/` ping.

---

## 7. Backend API Protocol

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/visit` | POST | Register visit; fingerprint sent (IP, UA, referer) |
| `/api/handler` | POST | Register wallet connection + public key |
| `/is-banned` | POST | Check if visitor is blocked |
| `/config` | GET | Receive operator config (drain threshold, excluded wallets, etc.) |
| `/locales?lang=XX` | GET | i18n strings (20+ languages supported: en, bg, my, cs, da, de, fr, ja, ko, lv, pl, ru, …) |
| `/process` | POST | Submit signed transactions for backend broadcast |
| `/c/i` | POST | Ping: initial connect notification to operator |
| `/c/c/` | POST | Ping: wallet connected notification |
| `/c/f/` | POST | Ping: drain finished / failed notification |
| `/connect/[ref]` | GET/POST | Referral tracking (regex `^\/connect\/\??([a-z\d_-]+)`) |

The backend sends Telegram notifications at the `/c/i`, `/c/c/`, and `/c/f/` stages — consistent with the Telegram screenshot showing `#connect #SOL` and `#request #SOL` messages (operator panel view).

---

## 8. Social Engineering

### 8.1 Fake safety endorsements (Phantom/Trust impersonation)
- *"This application hasn't been reviewed by Phantom yet, but it is listed in trusted community-maintained safety databases. You can proceed with confidence — this app is recognized as safe."*
- *"This dApp uses a new, optimized transaction delivery method that is not yet displayed correctly in Phantom. You can proceed with confidence — this app is recognized as safe."*
- *"Trust detected (0) issues with this platform, proceeding is safe. Press confirm to continue."*

### 8.2 Fake verification / coercion
- *"This DApp uses Abuse Protection to prevent misuse of platform. You'll need to complete a quick verification of your transaction history."*
- *"Transactions are reverted. Sign all transactions to verificate your account."*
- *"Transaction was reverted, funds will be refunded soon. Please try again."*
- *"The transaction has expired. Please sign it one more time to continue."*

### 8.3 Videos
Three WebM videos are played at key moments to simulate legitimate DeFi UI behavior:
- `malicious.webm` (1.6 MB): likely a fake transaction animation
- `200tx.webm` (1.6 MB): likely a "200 transactions processed" success screen
- `refund.webm` (0.7 MB): reinforces the "refund is coming" lie

### 8.4 Presale timer
`sbdst.js` shows a fake presale countdown with a Russian-language timeout alert (`"Время вышло!"` — "Time's up!"). This element, combined with the Russian alert and the Telegram panel screenshot, suggests the operator is Russian-speaking.

---

## 9. Supported Wallets

Phantom · Backpack · Solflare · OKX Wallet · Glow · Coinbase Wallet · Trust Wallet · Bitget · MetaMask (Snap) · Exodus · SafePal · MathWallet · MagicEden · Coin98 · Zerion · Kraken Wallet · WalletConnect / Reown (AppKit) · Telegram WebApp wallets

---

## 10. Targeted Tokens

Native SOL · Wrapped SOL (`So111…112`) · **USDT** · **JUP** · **PUMP** · WBTC · ETH · ASTER · PENGU · Bonk · RAY · Fartcoin · and all SPL/Token-2022 tokens in the wallet (portfolio sweep via Solflare API)

**High-value DeFi positions also targeted:** Raydium CLMM LP · Meteora DLMM LP · Orca Whirlpool LP · Stake accounts

---

## 11. IOC Catalog

### 11.1 Domain
| Domain | Registrar | Created | NS |
|---|---|---|---|
| pumpanakin.fun | PDR Ltd. | 2026-11-02 16:58 UTC | dana/ethan.ns.cloudflare.com |

### 11.2 IPs (Cloudflare proxy)
`104.21.49.129`, `172.67.163.63`

### 11.3 File hashes (SHA-256)
| File | SHA-256 |
|---|---|
| `index.js` (drainer bundle) | `0735606691bbdf35d38d7531c0e48363a21ef6f7224ebce2908a1b487f9ea6a2` |
| `sbdst.js` (countdown) | `14e67de9e4fbeb6ce7e5cc71179ba0c210714d73a998c9b94c5560d5b716b5cb` |
| `jxi33.js` (jQuery) | `f5ad72b13a3ba6614caeb70e4306d690f6939b752e28dc0ec48c2182647761f5` |
| `wzi2d.css` (styles) | `3dceb95008e42edc1006ca00b961e411d32430ded84d47d97d1acd41176d0211` |

### 11.4 Helius RPC API keys (attacker's)
- `0b9f580f-8102-4b89-928b-8770a62771f0`
- `2dfa2086-c6cd-4cb4-8a13-08ecdee36a0f`
- `3a1ca16d-e181-4755-9fe7-eac27579b48c`
- `777d85c0-fefd-42a0-b290-8b1b3704fe90`

### 11.5 Jupiter API keys (attacker's)
- `cc0769f7-ceba-4abf-83d8-e7c083921665`
- `5f1f45eb-a550-4e95-ad0e-b26e6ec0702d`
- `a4ed32be-dcdf-4702-aba0-aee15c512427`
- `f707107a-6d56-4626-a937-ef3c7eef51d8`
- `ab060a03-7874-4647-84d1-da019e4b51ea`

### 11.6 Attacker Solana addresses
| Address | Role | Note |
|---|---|---|
| `6cwsqBqmRy22Qa2SEuZ8tWrpKoCS9M8S2r8ct8VuqFmj` | Main receiver | Base64-encoded in string table [244, 330] |
| `4QFiKg8ejx5LfqqLNbnKsiCnbEgRtgakBF6abMrkquKW` | Main receiver | Base64-encoded in string table [245, 331] |
| `DvTqmF7uMbLaW56QsMvcgv8KSkydFEikuk5gUcjACPV` | Receiver | Direct in string table [243] |
| `4cfdFcVuJf8PPXpMWPMCDehSE4gV4C8oYwpZnLra7rtW` | Receiver | String table [246] |
| `TwrGADB9QPrLfTKpWuyq9tjgRaGsuzgRUMFTz51uhsa` | Receiver | String table [247] |
| `syspv6Qe5BbK8GPEjLbMnmF9hZy7juAuePbuspciCFP` | Receiver | String table [248] |
| `A5chdzL3UMQZBqBRdXFFCT9HTK7JZs6h4TEYVCQLQydo` | Receiver | String table [332] |
| `6ugBBLhRJqsuB1H4G6rGBMCyMWjdFpvpEUKnp6XCB1t7` | Operator (target acct) | String table [1036] |
| `9piPeQWJ7wxGmsWieeJhQKJ13DjJLga9j8CE5ydLTHC6` | Operator (target acct) | String table [1037] |
| `6ARSYR2B1aPWSjK11ZXDPmApgLgar3bCrm2BTYGS2jBK` | Operator (target acct) | String table [1038] |
| `4qti6FcMybVSLL2k4rqRQ3Ph1a2jGrzPmBN8Wmt4A5wr` | Operator (target acct) | String table [1039] |
| `HsVYhMDQRf6CkjtdUzqNDNRfDwsgw9nAX8feLVC3TAGp` | Operator (target acct) | String table [1040] |
| `4moJ9mfFDqFgGMp5UJUgcVhAaFtBxiapt9DVJE3LcVao` | Operator (target acct) | String table [1041] |

### 11.7 Backend URLs
```
https://pumpanakin.fun/
https://pumpanakin.fun/_nuxt/assets/index.js?aa6524x
https://pumpanakin.fun/api/visit
https://pumpanakin.fun/api/handler
https://pumpanakin.fun/process
https://pumpanakin.fun/is-banned
https://pumpanakin.fun/config
https://pumpanakin.fun/c/i
https://pumpanakin.fun/c/c/
https://pumpanakin.fun/c/f/
https://pumpanakin.fun/connect/[ref]
https://pumpanakin.fun/locales?lang=[xx]
https://pumpanakin.fun/_nuxt/media/malicious.webm
https://pumpanakin.fun/_nuxt/media/200tx.webm
https://pumpanakin.fun/_nuxt/media/refund.webm
```

### 11.8 External API endpoints used by drainer
```
https://mainnet.helius-rpc.com/?api-key=<KEY>
https://solana-rpc.publicnode.com/
https://solana.magiceden.dev/
https://rpc.solanatracker.io/public
https://api.mainnet-beta.solana.com
https://api.jup.ag/price/v3?ids=…
https://api.jup.ag/tokens/v2/search?query=…
https://wallet-api.solflare.com/v3/portfolio/tokens/…
https://wallet-api.solflare.com/v2/portfolio/stake/…
https://wallet-api.solflare.com/v2/swap/capped-tokens?currency=USD
```

### 11.9 Network indicators
- Request header `x-tag:` is **not** present on the drainer (that is a ClickFix pumpadmin.fun IOC).
- The drainer communicates over standard HTTPS to its own backend.
- POST body to `/process` is a JSON array of serialized signed Solana transactions.

---

## 12. MITRE ATT&CK

| Technique | ID | Description |
|---|---|---|
| Drive-by Compromise | T1189 | Lure page triggers wallet connection |
| User Execution | T1204 | User connects wallet and signs transactions |
| Masquerading | T1036 | Impersonates Phantom / Trust safety UI |
| Deceptive Site | T1583.001 | Fake presale / trading tool |
| Steal Web Session Cookie | T1539 | Session enumeration via wallet adapter |
| Credentials from Web Browsers | T1555.003 | Backpack / browser-extension wallets targeted |
| Financial Theft | T1657 | SOL and SPL token drain to attacker addresses |
| Obfuscated Files or Information | T1027 | JS-Confuser CJK obfuscation |
| Dynamic Resolution | T1568 | Multiple fallback RPCs if Helius is unavailable |
| Exfiltration Over C2 Channel | T1041 | Signed transactions POSTed to `/process` |

---

## 13. Detection Guidance

### 13.1 Network / Proxy
- Block `pumpanakin.fun` and `*.pumpanakin.fun` at the DNS/proxy layer.
- Alert on POST to `/c/i`, `/c/c/`, `/c/f/`, `/api/visit`, `/process` on unknown HTTPS destinations from browser processes.
- Helius API keys `0b9f580f-…`, `2dfa2086-…`, `3a1ca16d-…`, `777d85c0-…` appearing in HTTP headers (sent by drainer to `mainnet.helius-rpc.com`).

### 13.2 Endpoint (EDR)
- JS file > 500 KB loaded in a browser that contains `嗛=铴([` (UTF-8 bytes: `E5 97 97 3D E9 93 B4 28 5B`).
- Browser-initiated `signTransaction` or `signAllTransactions` calls to an unknown origin.

### 13.3 YARA
See `drainer.yar` in this repository. Rules provided:
- `SolanadrainerKit_JSConfuser_Exact` (hash match)
- `SolanadrainerKit_JSConfuser_Obfuscation` (CJK byte patterns)
- `SolanadrainerKit_HeliusAPIKeys`
- `SolanadrainerKit_JupiterAPIKeys`
- `SolanadrainerKit_ReceiverAddresses`
- `SolanadrainerKit_OperatorAddresses`
- `SolanadrainerKit_SocialEngineering`
- `SolanadrainerKit_BackendEndpoints`
- `SolanadrainerKit_MediaAssets`
- `SolanadrainerKit_FullMatch` (combined)

### 13.4 Scanner
See `drainer_scan.py` in this repository. Accepts URLs or local JS/HTML files; outputs verdict (clean / suspicious / drainer) and score.

---

## 14. Victim Remediation

If a user connected a wallet to pumpanakin.fun or a similar site and signed any transaction:

1. **Assume the wallet is drained.** Check on-chain history (Solscan, Solana Explorer) for unexpected transfers.
2. **Immediately transfer any remaining funds** (SOL, SPL tokens) to a **new wallet generated on a clean device**.
3. **Revoke all connection approvals** in Phantom / Backpack / Solflare settings for pumpanakin.fun.
4. **If the victim's address starts `DqK…` and ends `Pk7PMfMwp`** (from the Telegram screenshot): the wallet held ~15.77 SOL (~$1,417) in USDT, MEW, and SOL. If the drain transaction was signed, those funds are likely gone — file a report with Binance/Coinbase if the tokens were routed there.
5. **Change passwords and 2FA** on any accounts accessed from the same browser session.
6. **Report** to: Cloudflare abuse (`abuse.cloudflare.com`, Phishing), PDR Ltd. registrar abuse, Phantom security team, MetaMask / Phantom blocklists.

---

## 15. Reporting

| Target | Contact |
|---|---|
| Cloudflare (hosting + DNS) | https://abuse.cloudflare.com — category: Phishing |
| PDR Ltd. (registrar) | Abuse email in RDAP for pumpanakin.fun |
| MetaMask eth-phishing-detect | Already listed; keep updated |
| ScamSniffer / Phantom | Submit via their respective blocklist PRs |
| Helius | Report API key abuse (see §11.4) to security@helius.dev |
| Jupiter | Report API key abuse (see §11.5) to their security team |
| Google Safe Browsing | https://safebrowsing.google.com/safebrowsing/report_phish/ |

---

*End of report. All analysis is static; no attacker code was executed and no funds were moved.*
