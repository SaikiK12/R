# Deployment Map — All 60+ Domains

All hosts confirmed serving the reference bundle
(`0735606691bbdf35d38d7531c0e48363a21ef6f7224ebce2908a1b487f9ea6a2`).

Full host inventory: `archive/siblings/manifest_2026-11-12.json` and
`archive/siblings/manifest_dump_2026-11-13.json`.

---

## Primary Domains

| Domain | Role | Notes |
|---|---|---|
| `pumpanakin.fun` | Lure | Primary lure; campaign pivot 2026-11-14 |
| `easyinvest7.biz` | Connect | Earlier connect domain |
| `petramon.xyz` | Connect | Active connect domain 2026-11-12 evening |

---

## Config Group A — 15 Hosts (Identical Decrypted Config)

USDC target, 1–500 SOL range, sibling `trongame.fun`,
receivers `HrmfWTNd…`, `7oHgTZjN…`, `7mfxYcwy…`:

`arvoniq.com` · `vaultspin.win` · `dexfi.app` · `paybackpump.fun` ·
`amlbot.rest` · `rolldice.icu` · `daddysdogg.com` · `isen.fund` ·
`allocationclaim.com` · `boom-frog.xyz` · `eligibility-zkpass.org` ·
`pumpswap.rest` · `app.dextools.info` · `solchaindapps.com` ·
`pumpstreams.expl.live`

English modal strings match `data/live/l_en.json` on all 15.

---

## Config Group B — Hosts with Distinct Config

See `archive/siblings/` per-domain `api_config.json` for decoded values.

---

## Costume-Only Hosts

`dexscreener.fyi` — only the HTML. Bundle loaded from
`neatly-resonant.ext-helper.cc`, which serves the reference bundle and the
same decrypted config. Root on `neatly-resonant.ext-helper.cc` returns 404.

---

## Non-Resolving Hosts (Named in Lure HTML)

`amlbot.store` · `lens-badland.fontstack.cc` · `voicechat.fun`

---

## 2026-11-11 Snapshots (Pre-Sweep)

Three flat HTML files alongside the `siblings/` directories:
- `archive/siblings/arvoniq.com.html`
- `archive/siblings/vaultspin.win.html`
- `archive/siblings/isen.fund.html`

---

## Sibling Lure Families (2026-11-13 New Fleet)

New lure families observed in `manifest_newfleet_2026-11-13.json`:

**Jupiter impersonators:**
`jup.ag-wc.ink` · `jup-ag.solroom.cc` · `jup-dex.solroom.cc` ·
`jup.solroom.cc` · `jupiter.solroom.cc` · `juplter.solroom.cc` ·
`juphub.ink` · `juplaunch.ink` · `swap-jup.ag-wc.ink` · `www-jup.ag-wc.ink` ·
`app-jup.ag-wc.ink`

**Meteora impersonators:**
`meteora.ag-v2.ink` · `sol-meteora.ag-v2.ink` · `www-meteora.ag-v2.ink` ·
`web-meteora.at` · `web-meteora.com` · `web-meteora.st`

**Web-Jupiter brand:**
`app.web-jupiter.gd` · `launchpad.web-jupiter.gd` · `login.web-jupiter.gd` ·
`tracker.web-jupiter.gd` · `web-jupiter.st`

**Solbarn / Solroom:**
`solbarn.cc` · `scamsem.solbarn.cc`

**Stockbox CDN infrastructure:**
`stockbox.cfd` · `punctuate-atop.stockbox.cfd` · `radar-nutmeg.stockbox.cfd`

**Others:**
`solme.top` · `solswap.ink` · `luna-start.trade` · `oshivault.com` ·
`meteora-exchange.pages.dev` · `pumpstreamhub.live` · `updog.pumptracker.store` ·
`airdrop-floatlaunch.xyz` · `claim-floatlaunch.xyz` · `rank-floatlaunch.xyz`

---

## urlscan Pivots

```
# Bundle hash (all domains, all campaigns)
hash:0735606691bbdf35d38d7531c0e48363a21ef6f7224ebce2908a1b487f9ea6a2

# Nuxt asset path pattern
page.url:"/_nuxt/assets/index.js"

# ClaimFreeSOL lure HTML (2026-11-14 campaign)
hash:9db7199011d0db36af695a7b69df132f5e251bddc639940001222791f8c47bf4

# ClaimFreeSOL brand
domain:claimfreesol
```
