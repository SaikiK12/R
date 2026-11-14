# Reconnaissance Notes

Methods and findings from the domain / infrastructure mapping effort.

---

## Bundle Hash Pivot

All discovery started from the bundle SHA-256:
`0735606691bbdf35d38d7531c0e48363a21ef6f7224ebce2908a1b487f9ea6a2`

urlscan query: `hash:0735606691bbdf35d38d7531c0e48363a21ef6f7224ebce2908a1b487f9ea6a2`

As of 2026-11-13, this hash returns 60+ unique domains on urlscan.

---

## Sibling Discovery Method

1. Bundle hash pivot on urlscan → initial domain list.
2. Per-domain: fetch `/_nuxt/assets/index.js` (Cloudflare bypass path).
   Verify SHA-256 matches reference hash.
3. Per-domain: fetch `/api/config`. Decrypt with `SHA-256(domain + salt)`.
   Parse config binary. Record receiver addresses, token mint, sibling domain.
4. Cross-reference decoded configs to identify config groups.
5. `manifest_2026-11-12.json` and `manifest_dump_2026-11-13.json` record
   results.

---

## Config Group Clustering

15 domains decoded to identical config (same receiver addresses, same USDC
target, same sibling `trongame.fun`). These are likely controlled by the same
affiliate or run directly by the operator.

Remaining domains showed varied receiver addresses — different affiliates or
campaign rotations. See `data/live/matrix.json` for the full comparison matrix.

---

## DNS / Hosting Notes

- Most lure domains are behind Cloudflare (managed challenge on `/`).
- Connect domains (petramon.xyz, easyinvest7.biz) serve the bundle directly
  without Cloudflare challenge on the `_nuxt/` paths.
- `trongame.fun` (sibling domain in several configs) was DNS-dead as of
  2026-11-11.
- `neatly-resonant.ext-helper.cc` serves as a CDN origin for `dexscreener.fyi`.
  Root path returns 404; bundle path serves the reference hash.
- `stockbox.cfd` appears to be CDN infrastructure shared across multiple
  lure domains (`punctuate-atop.stockbox.cfd`, `radar-nutmeg.stockbox.cfd`).
- `solroom.cc` and `solbarn.cc` are registrar/CDN infrastructure for the
  Jupiter impersonator fleet (jup.solroom.cc, jup-dex.solroom.cc, etc.).

---

## 2026-11-13 New Fleet

The manifest `manifest_newfleet_2026-11-13.json` added ~25 new domains
observed responding with the reference bundle. Most impersonate Jupiter or
Meteora. Full list in `docs/map.md`.

---

## Social Attribution

**ClaimFreeSOL campaign (2026-11-14):**
- `x.com/cfs_foundation` — primary X account, pushing traffic to pumpanakin.fun
- `discord.com/invite/claimfreesol` — affiliate Discord community
- `claimfreesol.gitbook.io/docs` — affiliate documentation

The 30% affiliate commission banner in the lure page indicates active affiliate
recruitment is ongoing.

---

## `_tds_landings/` Entries

Two TDS (Traffic Distribution System) landing payloads captured:
- `_tds_landings/rolldice_es.json` — Spanish-language TDS redirect config
  for rolldice.icu
- `_tds_landings/zkpass_it.json` — Italian-language TDS redirect config
  for eligibility-zkpass.org

TDS systems route traffic from ad networks to lure pages. These configs
show the operator uses localized TDS targeting for specific affiliate campaigns.
