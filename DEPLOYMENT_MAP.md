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
