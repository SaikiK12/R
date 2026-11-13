# Family map: sibling lures and the sophistication gradient

Threat-hunt results, 2026-11-11. Method: URLScan search for the
reference bundle's SHA-256 (`07356066…f9ea6a2`) — 51 indexed scans —
then live fetches of lure HTML and `/api/config` per domain (decrypted
with the kit's own key derivation, purpose = hostname). No endpoint
beyond public page assets and the public `/api/config` GET was touched.

**Recapture 2026-11-12 17:00 UTC.** Pages, helper scripts, and decrypted
configs are in `archive/sibling_lures/<host>/`. Fifteen hosts still
decrypt to one config (receivers rotated again the same day; see
`decompiled/iocs.json`). `dexscreener.fyi` does not host the kit: it
loads it from `neatly-resonant.ext-helper.cc`, which does. The Nov 11
table below is the original hunt, not the current receiver list.

**New fleet, 2026-11-13 (urlscan hash pivot → live walk).** Full detail:
`decompiled/iocs.json` → `new_fleet_2026_11_13`. Four new costumes,
each walked live:

| Host | Costume | Distinct features |
|---|---|---|
| oshivault.com | OSHI NFT allocation portal | **Built with Lovable (AI site builder)** — preview links and an "Edit with" button left in. Per-rarity yield tiers (2–15 OSH/day) |
| pumpstreamhub.live | pump.fun trading terminal | **Real market data**: dexscreener.com search API + live `wss://feed.dexscreener.com/feed/ws` websocket; livestream.mp4, fake leaderboard, Buy/Sell |
| scamsem.solbarn.cc | SCAMSEM token airdrop | Phased rollout (Phase 1–4); queries **lite-api.jup.ag** for its own token mint `BfJEEokcbSugKSjxEpgnAK1GU14jAM6c4Bvx1Gku1dFP`. **Correction: this is operator infra, not a research mirror** — it serves the current config |
| updog.pumptracker.store | pump.fun "Vote to Win" clone | Own frontend app; the kit loads cross-origin from **`radar-nutmeg.stockbox.cfd`** (new payload host) and calls `/api/visit?origin=updog.pumptracker.store` — the origin-attribution param, live. New `ua_vid` localStorage key |

All four run the identical kit runtime (`_0x5`/`_0x12`, console
`1.18.4`, is-banned → config → visit, w3m-modal) and decrypt to the
same live config. The rest of the urlscan-surfaced clusters
(solroom.cc, ag-wc.ink, ag-v2.ink, web-meteora/web-jupiter variants,
juphub/juplaunch/solswap.ink) are UA/IP-cloaked or dead to our egress;
urlscan's crawler has them on record.

## One operator, many costumes

Every live sibling serves the **byte-identical bundle** and, where
`/api/config` exists, the **identical decrypted config**: same
receivers (`7VHUFJHW…`, `3emsAVdm…`), same `trongame.fun` sibling
string, same USDC targeting. The kit code does not vary between
deployments. Everything that differs is lure dressing and traffic
plumbing. This is a single centrally-managed operation (or a single
customer of the hexfomo kit running one backend for all their lures).

## Sibling lures (from the hash pivot, all serving the same bundle)

| Domain | Theme | Status 2026-11-11 | Notes |
|---|---|---|---|
| pumpanakin.fun | "TRUMP COIN" airdrop, Russian | live (reference) | 10 KB one-pager |
| arvoniq.com | generic crypto intro | live | pumpanakin-style template, randomized asset names (`5cagf.js`) |
| vaultspin.win | Jupiter airdrop | live | local script.js |
| dexfi.app | DEX interface clone | live | 112 KB, Tailwind, **Turnstile marker present** |
| paybackpump.fun | pump.fun clone | live | 145 KB, Chart.js, pump.fun assets hotlinked |
| amlbot.rest | fake AML-check service | live | 304 KB, fake team photos, fake exchange partners |
| rolldice.icu | casino | live | 60 KB |
| daddysdogg.com | memecoin | live | 11 KB |
| isen.fund | fund/charity | live | 4 KB |
| allocationclaim.com | allocation claim | live | 6 KB |
| boom-frog.xyz | memecoin | live | 20 KB |
| eligibility-zkpass.org | zkPass eligibility | live | 14 KB |
| pumpswap.rest | PumpSwap | live | 33 KB |
| dexscreener.fyi | Dexscreener clone | live | bundle live, `/api/config` 404s (partial/misconfigured) |
| airdrop/claim/rank-floatlaunch.xyz | launchpad claim | Cloudflare 403/525 | bot-walled |
| www-/sol-meteora.ag-v2.ink | Meteora clone | Cloudflare 403 | click_id-tracked traffic |
| meteora-exchange*.pages.dev (x3) | Meteora clone | Cloudflare Pages | throwaway free hosting, click_id |
| login/tracker/app/launchpad.web-jupiter.gd | Jupiter clone | Cloudflare 403 | themed multi-subdomain gateway, click_id |
| moonshot-claim.pages.dev | Moonshot claim | Cloudflare Pages | throwaway hosting |
| jupiter-verify.xyz | Jupiter verify | DNS dead | retired |
| solme.top, luna-start.trade, app.dextools.info, solchaindapps.com, cryptocommerceohpmigration.online | assorted | (per URLScan) | |
| scamsem.solbarn.cc | — | (per URLScan) | name suggests a research mirror; not treated as operator IOC |

## Sophistication gradient vs pumpanakin

The malware is constant; the sophistication lives in the lure and
traffic layers. Ranked above the pumpanakin baseline:

1. **Full product clones.** paybackpump.fun reproduces pump.fun with
   working charts; amlbot.rest fakes an entire AML-vetting company
   (team photos, partner logos, reviews). pumpanakin is a single
   static page — these are multi-section sites built to survive a
   victim's 30-second credibility check.
2. **Anti-analysis.** Cloudflare bot-wall (403) on the floatlaunch and
   meteora/ag-v2.ink clusters and a Turnstile marker in dexfi.app's
   HTML. pumpanakin answers plain 200 to a curl.
3. **Traffic plumbing.** `click_id=<uuid>` on the Meteora/Jupiter
   clusters — a traffic-distribution/affiliate layer with per-click
   tracking, i.e. bought traffic, not just Telegram spam.
   web-jupiter.gd runs a themed gateway (login./tracker./app./
   launchpad.) so one domain serves a whole fake product.
4. **Throwaway hosting.** meteora-exchange*.pages.dev and
   moonshot-claim.pages.dev run on free Cloudflare Pages — zero cost,
   abandoned without loss when flagged.
5. **Impersonation breadth.** Meteora, Jupiter, pump.fun, PumpSwap,
   Dexscreener, Dextools, zkPass, a launchpad, a casino, an AML
   service, a charity. Each theme has its own asset set and helper
   script name (randomized per deployment).

Same everywhere (the pivots that catch all of the above): bundle hash,
`/_nuxt/assets/index.js` path, `/api/visit` + `/api/is-banned` +
`/api/config` surface, the config's AES key derivation, receivers, the
on-chain program, and the treasury.

## Assessment

The operator's investment goes where detection is weakest: not the kit
(a pinned, reused build) but the credibility and distribution of lures.
Expect the next wave to be new themes on throwaway hosts behind
Cloudflare, fed by click-tracked traffic — and expect the config
receivers to rotate eventually, since that is a one-push change for
them. The durable pivots are the on-chain ones: program
`TwrGADB9QPrLfTKpWuyq9tjgRaGsuzgRUMFTz51uhsa`, treasury `DvTq…`,
upgrade authority `3ofSxsTReb9Uhom1NvHqH5oU1EEDLuUxZVbFix4fGNY6`, and
the marker-tag instruction format.

---

# Infrastructure: what the operation is built on and what it costs

*(Merged from the former `STACK.md`, 2026-11-12.)*

| Piece | What they use | Cost to them |
|---|---|---|
| Lure domains | `.fun`/`.xyz`/`.rest` gTLDs, days-to-weeks old (plus aged stock: easyinvest7.biz first cert 2018, amlbot.rest 2023) | ~$1–15/domain/yr |
| DNS + CDN + TLS | Cloudflare free plan | $0 |
| Lure hosting | Nuxt static build on free static hosting | $0 |
| Operator API | Small `/api/*` backend behind the same Cloudflare setup | ~$0–5/mo |
| Chain reads | Helius free-tier keys (4, rotated as they burn out) + public RPC fallbacks (publicnode, magiceden, solanatracker, mainnet-beta) | $0 |
| Swap quotes | Jupiter free API keys (5 in the string table) | $0 |
| Victim valuation | `wallet-api.solflare.com` free API with a fabricated bearer | $0 |
| The kit itself | `hexfomo.fun` vendor watermark; DaaS revenue share (proven on-chain: 20–25% to the vendor's collector, see `DRAIN_PIPELINE.md`) | revenue share |
| On-chain program | `TwrGADB9…`, upgradeable (authority `3ofSxsTReb…`) | rent-exempt SOL only |

**Total fixed cost: effectively a domain registration.** Everything else
is free tiers and abused legitimate services.

## What changes between deployments (detection pivots)

| Variable per deployment | Fixed across deployments (pivot on this) |
|---|---|
| Lure domain | Same bundle SHA-256, same Nuxt asset path `/_nuxt/assets/index.js` |
| `apiHost` (usually == lure host) | `/api/visit`, `/api/is-banned`, `/api/locales`, `/api/config`, `/api/handler` route shape and response behavior |
| Receivers, pushed live via `/api/config` | AES-GCM format and key derivation SHA-256(`apiHost` + salt) |
| Helius / Jupiter keys (rotated as they burn out) | Four-key Helius failover pattern + same public RPC fallbacks |
| Hard-coded string-table addresses (only on kit rebuilds) | On-chain program `TwrGADB9…`, treasury `DvTqmF7u…`, collector `6cwsqBqm…` — best on-chain pivots |
| Lure theme/copy | Fake modal copy served per-locale, the media set (`refund.webm` etc.) |
| Kit build (JS-Confuser seed) | Obfuscator fingerprint: table-init pattern and CJK identifier density |

The fastest way to surface sibling lures: query public crawlers
(URLScan, crt.sh) for the Nuxt asset path plus any fixed pivot, and
watch the treasury's inbound transfers for new funding sources.
