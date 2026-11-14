# pumpanakin.fun — Live Recon Dump 2026-11-14

**Captured:** 2026-11-14 ~20:15 UTC  
**Method:** `_nuxt/` path bypass — Cloudflare managed challenge blocks `/`
and all `assets/` paths; `_nuxt/*.html` and `_nuxt/assets/index.js` are
served without challenge, consistent with the asset-allowlist CF configuration
observed on sibling lures.

---

## Campaign Pivot Confirmed

**Previous lure** (`lure.html`, SHA-256 `0554c891…`): Trump COIN airdrop,
Russian language (`lang="ru"`), impersonating `donaldjtrump.com`.

**Current lure** (`index.html`, SHA-256 `9db71990…`, 92,170 B): ClaimFreeSOL /
FL!pN fake DEX, branded as a Solana wallet cleanup and token-sell tool.

The HTML is served at every path under `_nuxt/` (index.html, lure.html,
connect.html, connect_shell.html all return the same 92,170-byte file).

---

## New Lure — ClaimFreeSOL / FL!pN

### Social Presence

| Platform | URL |
|---|---|
| X / Twitter | `https://x.com/cfs_foundation` |
| Discord | `https://discord.com/invite/claimfreesol` |
| Docs | `https://claimfreesol.gitbook.io/docs` |

Brand name: **ClaimFreeSOL (CFS)**. Header button: **"100X on FL!pN"**
(impersonating pump.fun's FL!pN token ecosystem).

### UI Structure

**Clean Up tab** (default active)
- Sub-tabs: "Vacant Accounts", "Burn Tokens", "Burn NFTs"
- Displayed stats: "Total $SOL Recovered: 19,669 ($3.52M)", "Total Accounts
  Claimed: 9,590,621", "Total Rebates: 885 ($158.25K)"
- Action: "Connect Wallet" → `openModal()` (drain entry point)

**Sell Tokens tab**
- Fake DEX swap UI: SOL → USDC
- Pulls live SOL price from CoinGecko (fallback: $178.50)
- Fake Jito fee (0.0003 SOL), slippage, minimum received fields
- Action: "Connect Wallet" → same `openModal()`

**Referral banner**: "Share your affiliate link and enjoy 30% commission!"

### Styling

Custom pixel font: `DinkieBitmap-9px.ttf`. Background `#000000`.
Solana gradient colors (`#9945FF`, `#19FB9B`). Full stylesheet is inline.

---

## JS Bundle — Unchanged

`index_nuxt.js` is byte-identical to the previously archived `index.js`:

| File | SHA-256 | Size |
|---|---|---|
| `index.js` (original) | `0735606691…f9ea6a2` | 1,034,759 B |
| `index_nuxt.js` (this dump) | `0735606691…f9ea6a2` | 1,034,759 B |

Only the lure HTML changed. The bundle was not updated.

---

## Assets Not Retrieved

The following assets are referenced in the HTML but returned 403 from
Cloudflare (direct path and `assets/` path both blocked):

`images/referral.svg`, `images/logo.png`, `images/flipn.svg`,
`images/tag_price.svg`, `images/diamond.svg`, `images/atm.svg`,
`images/sol.png`, `images/broom.png`, `images/money.png`,
`images/usdc.png`, `images/x.svg`, `images/discord.svg`, `images/docs.svg`,
`DinkieBitmap-9px.ttf`

The `_nuxt/images/` path pattern returns 404 — images are not under `_nuxt/`.

---

## Infrastructure Notes

- **Cloudflare** managed challenge active on `/` and all `assets/` paths.
  Ray IDs from this session: `a5a8b01b0cba21eb`, `a5a8b0a05856df73`,
  `a5a8b0ed0c0e42b9`, `a5a8b0ed3e71822d`
- `_nuxt/` bypass: `_nuxt/*.html` and `_nuxt/assets/index.js` return 200
  without challenge — likely a CF page-rule exempting Nuxt asset paths.
- `robots.txt`, `sitemap.xml` — 403.
- No Wayback Machine archive at this timestamp.

---

## Hashes (This Capture)

| File | SHA-256 |
|---|---|
| `index.html` (new lure) | `9db7199011d0db36af695a7b69df132f5e251bddc639940001222791f8c47bf4` |
| `index_nuxt.js` (bundle) | `0735606691bbdf35d38d7531c0e48363a21ef6f7224ebce2908a1b487f9ea6a2` |

On-chain identifiers are unchanged — see `data/` (`iocs.json`).

---

## urlscan Pivots (Updated)

```
page.url:"/_nuxt/assets/index.js"
hash:9db7199011d0db36af695a7b69df132f5e251bddc639940001222791f8c47bf4
domain:claimfreesol
```

The bundle hash pivot (`0735606691…`) remains valid across all 60+ domains.
The ClaimFreeSOL brand has active social accounts (`x.com/cfs_foundation`,
`discord.com/invite/claimfreesol`) pushing traffic — monitor for related
accounts in the same follower/following graph.
