# data/targets/ — Per-Domain Profiles

One JSON file per domain (`t1.json` through `t35.json`). Data structure:

```json
{
  "host": "domain.com",
  "fetched": "ISO-8601 timestamp",
  "ip": "IPv4 or IPv6",
  "root": { "status", "size", "ctype", "server", "body" },
  "html": { "title", "bytes", "sha256", "kit_refs", "turnstile" },
  "bundle": { "sha256", "size", "confirmed" },
  "api_config": { "raw_bin", "decoded": { ...config fields... } },
  "path_probe": { "/path": { "status", "size", "costume" } }
}
```

`all.json` — full sweep results (35 entries, fetched 2026-11-13T11:24:29 UTC).

---

## Domain Index

| File | Domain | Lure title / theme |
|---|---|---|
| t1 | pumpanakin.fun | (Cloudflare 403 on root; captured via `_nuxt/` path) |
| t2 | arvoniq.com | Solana |
| t3 | pumpswap.rest | PUMP — Solana Meme Token |
| t4 | dexfi.app | Swap — Dexlab impersonation |
| t5 | dexscreener.fyi | DEX Screener impersonation |
| t6 | vaultspin.win | Phantom |
| t7 | paybackpump.fun | Pump |
| t8 | app.dextools.info | DEXTools impersonation |
| t9 | isen.fund | TechWave Solutions (Android lure) |
| t10 | allocationclaim.com | BONK COIN |
| t11 | boom-frog.xyz | BOOK OF MEME — BOME |
| t12 | daddysdogg.com | Andrew Tate's Dog — Airdrop |
| t13 | eligibility-zkpass.org | zkPass eligibility |
| t14 | rolldice.icu | ROLLDICE |
| t15 | solchaindapps.com | Meteora impersonation |
| t16 | juphub.ink | Jupiter impersonation |
| t17 | amlbot.rest | AMLBot impersonation |
| t18 | pumpstreams.expl.live | Pump |
| t19 | web-jupiter.st | Jupiter impersonation |
| t20 | web-meteora.st | Meteora impersonation |
| t21 | web-meteora.com | Meteora impersonation |
| t22 | juplaunch.ink | Jupiter impersonation |
| t23 | solswap.ink | Solana swap |
| t24 | oshivault.com | OSHI Allocation — Claim Portal |
| t25 | scamsem.solbarn.cc | scamsem Airdrop |
| t26 | pumpstreamhub.live | Pump |
| t27 | solme.top | Solana |
| t28 | luna-start.trade | Luna |
| t29 | updog.pumptracker.store | Pump Voting |
| t30 | neatly-resonant.ext-helper.cc | CDN origin for dexscreener.fyi |
| t31 | solbarn.cc | Solbarn infrastructure |
| t32 | radar-nutmeg.stockbox.cfd | Stockbox CDN infrastructure |
| t33 | easyinvest7.biz | Earlier connect domain |
| t34 | stockbox.cfd | Stockbox CDN root |
| t35 | punctuate-atop.stockbox.cfd | Stockbox CDN infrastructure |

---

## Notes

- All 35 domains confirmed serving bundle hash `0735606691…f9ea6a2`.
- Domains t1–t15 (Config Group A) decoded to identical config (same receiver
  addresses, USDC target, 1–500 SOL range).
- Domains t30, t32, t34, t35 are CDN/infrastructure hosts; they serve the
  bundle for kit domains rather than functioning as standalone lure pages.
- Detailed config diff across all domains: `data/live/matrix.json`.
