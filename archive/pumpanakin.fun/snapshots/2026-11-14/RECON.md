# pumpanakin.fun — Live Recon Dump 2026-11-14

**Captured:** 2026-11-14 ~20:15 UTC  
**Method:** `_nuxt/` path bypass (Cloudflare managed challenge blocks `/` and all
`assets/` paths; `_nuxt/*.html` and `_nuxt/assets/index.js` are served without
challenge — consistent with the asset-allowlist CF configuration observed on
sibling lures).  
**Analyst:** live recon session, automated dump

---

## Campaign change confirmed: Trump COIN → ClaimFreeSOL / FL!pN fake DEX

The previous lure (`lure.html`, SHA-256 `0554c891…`) was a **Trump COIN airdrop**
page (Russian language, `lang="ru"`), impersonating `donaldjtrump.com` and
pushing a Web3Modal wallet-connect drain.

The current lure (`index.html`, SHA-256 `9db7199011d0db36af695a7b69df132f5e251bddc639940001222791f8c47bf4`) is a
completely different campaign. The HTML is served at every path under `_nuxt/`
(index.html, lure.html, connect.html, connect_shell.html all return the same
92,170-byte file).

---

## New lure: "ClaimFreeSOL" / "FL!pN" fake SOL cleanup/DEX tool

### Persona and social links

| Handle | URL |
|---|---|
| X / Twitter | `https://x.com/cfs_foundation` |
| Discord | `https://discord.com/invite/claimfreesol` |
| Docs (GitBook) | `https://claimfreesol.gitbook.io/docs` |

Brand name used in lure: **ClaimFreeSOL** (CFS). The header button shows
**"100X on FL!pN"** (impersonating pump.fun's FL!pN token / meme coin ecosystem).

### UI / lure mechanics

The page presents itself as a Solana wallet **cleanup and token-sell tool** with
two modes:

1. **Clean Up** (default active tab)  
   - Sub-tabs: "Vacant Accounts", "Burn Tokens", "Burn NFTs"  
   - Shows fake stats: "Total $SOL Recovered: 19,669 ($3.52M)", "Total Accounts
     Claimed: 9,590,621", "Total Rebates: 885 ($158.25K)"  
   - Action: **"Connect Wallet"** button — calls `openModal()` which is the
     drain entry point in `index_nuxt.js`

2. **Sell Tokens** tab  
   - Fake DEX swap UI: SOL → USDC  
   - Shows live SOL price from CoinGecko API (fallback: $178.50)  
   - Fake Jito fee display (0.0003 SOL), slippage, "Minimum Received"  
   - Another **"Connect Wallet"** button → same `openModal()` drain entry

### Referral banner

> "Share your affiliate link and enjoy **30%** commission!"

Referral/affiliate infrastructure is live and advertised directly in the lure.

### Font / style

Custom pixel font: `DinkieBitmap-9px.ttf`. Black background (`#000000`).
Solana gradient colors (`#9945FF`, `#19FB9B`). No minified/obfuscated CSS —
the entire stylesheet is inline.

---

## JS bundle: unchanged

`index_nuxt.js` is **byte-identical** to the previously archived `index.js`:

| | SHA-256 | Size |
|---|---|---|
| `index.js` (prev, lure.html era) | `0735606691bbdf35d38d7531c0e48363a21ef6f7224ebce2908a1b487f9ea6a2` | 1,034,759 B |
| `index_nuxt.js` (this dump) | `0735606691bbdf35d38d7531c0e48363a21ef6f7224ebce2908a1b487f9ea6a2` | 1,034,759 B |

The drainer core (JS-Confuser obfuscated Solana drain + Web3Modal) has **not
been updated**. Only the lure HTML changed.

---

## Assets not dumped (Cloudflare blocks direct paths)

The following assets are referenced in the HTML but could not be retrieved
(403 Cloudflare challenge at all direct and `assets/` paths):

- `images/referral.svg`, `images/logo.png`, `images/flipn.svg`
- `images/tag_price.svg`, `images/diamond.svg`, `images/atm.svg`
- `images/sol.png`, `images/broom.png`, `images/money.png`
- `images/usdc.png`, `images/x.svg`, `images/discord.svg`, `images/docs.svg`
- `DinkieBitmap-9px.ttf`

The `_nuxt/images/` path pattern returns 404 (the images are not under `_nuxt/`).

---

## Infrastructure / access notes

- **Cloudflare** managed challenge active on `/` and all `assets/` paths.  
  Ray IDs from this session: `a5a8b01b0cba21eb`, `a5a8b0a05856df73`,
  `a5a8b0ed0c0e42b9`, `a5a8b0ed3e71822d`  
- **`_nuxt/` bypass:** `_nuxt/index.html`, `_nuxt/lure.html`,
  `_nuxt/connect.html`, `_nuxt/connect_shell.html`, `_nuxt/assets/index.js`
  all return 200 without challenge. This is likely a CF page-rule that
  exempts Nuxt asset paths from the bot challenge.
- `robots.txt` and `sitemap.xml` — 403 (CF challenge).
- No Wayback Machine archive at this timestamp.

---

## IOCs (new, this campaign)

| Type | Value | Notes |
|---|---|---|
| Domain | `pumpanakin.fun` | Lure host (unchanged) |
| URL | `https://x.com/cfs_foundation` | Affiliate X account for "ClaimFreeSOL" |
| URL | `https://discord.com/invite/claimfreesol` | Affiliate Discord for "ClaimFreeSOL" |
| URL | `https://claimfreesol.gitbook.io/docs` | Affiliate GitBook docs |
| Hash | `9db7199011d0db36af695a7b69df132f5e251bddc639940001222791f8c47bf4` | New lure HTML |
| Hash | `0735606691bbdf35d38d7531c0e48363a21ef6f7224ebce2908a1b487f9ea6a2` | JS bundle (unchanged) |

**On-chain IOCs are unchanged** — see `decompiled/iocs.json` for the persistent
program/treasury/collector addresses.

---

## Hunt guidance for this new campaign

The lure has pivoted from political (Trump COIN) to DeFi-utility (SOL cleanup).
The bundle hash pivot on urlscan still works (same bundle). New pivots for the
updated lure:

```
page.url:"/_nuxt/assets/index.js"           # still valid
hash:9db7199011d0db36af695a7b69df132f5e251bddc639940001222791f8c47bf4  # new HTML
domain:claimfreesol                          # the affiliate brand
```

Watch `x.com/cfs_foundation` and `discord.com/invite/claimfreesol` for the
traffic-pushing social posts. The "30% commission" referral banner suggests
the operator is actively recruiting sub-affiliates — monitor for related
accounts in the same X follower/following graph.
