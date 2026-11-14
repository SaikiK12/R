# Hunting live lures of this family: where and how to search

The lures are pushed, not indexed (`ECOSYSTEM.md`), so Google/Bing are
useless for finding them. You hunt them on the infrastructure scanners
and crypto-scam feeds that see the pages by content, not by name. This
is the playbook, with the queries that actually work for this kit.

## 1. urlscan.io — the strongest pivot (sees sites our IP can't)

urlscan's crawler reaches pages that block a datacenter curl (UA
cloaking, geo/IP gating). Every pivot below is a GET to
`https://urlscan.io/api/v1/search/?q=<query>&size=100`, no key needed
for public scans.

**Bundle-hash pivot (best single query).** Every kit host serves the
byte-identical bundle, so its SHA-256 enumerates the whole live family:

```
hash:0735606691bbdf35d38d7531c0e48363a21ef6f7224ebce2908a1b487f9ea6a2
```

On 2026-11-13 this returned 77 scans / ~60 domains, including same-day
clusters not previously mapped (see `decompiled/live/family_urlscan_2026-11-13.json`).
Re-run it on a schedule; new day-old domains appear in it before they
appear anywhere else.

**Lure HTML hash pivot (catches campaign-pivoted hosts).**
pumpanakin.fun rotated its lure from Trump COIN to ClaimFreeSOL on
2026-11-14. The new lure HTML has a distinct hash — pivot on it to find
other hosts that deployed the same updated template before they appear
in the bundle-hash results:

```
hash:9db7199011d0db36af695a7b69df132f5e251bddc639940001222791f8c47bf4
```

**Structural pivots** (catch rebuilds that change the bundle hash):

```
page.url:"/_nuxt/assets/index.js"                     # the Nuxt asset path
filename:"/api/config"                                 # the config endpoint
page.url:"/connect/" AND page.url:"?b=1"               # connect-domain shells
hash:<sha256 of lure.html or sbdst.js>                 # per-asset pivots
```

**Cloudflare bypass for direct asset fetching (2026-11-14 discovery).**
Hosts running this kit with Cloudflare managed-challenge on `/` have a
page-rule that exempts the `_nuxt/` prefix. This means you can bypass
the CF bot challenge and fetch live lure HTML and the JS bundle directly:

```bash
# Fetch lure HTML (all paths under _nuxt/ return the same file):
curl -s --compressed \
  -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130.0.0.0 Safari/537.36" \
  "https://<host>/_nuxt/index.html"

# Fetch JS bundle (200 on all known hosts even when / is 403):
curl -s --compressed \
  -H "User-Agent: Mozilla/5.0 ..." \
  "https://<host>/_nuxt/assets/index.js" -o index.js
```

This is reliable across all hosts observed. `assets/js/`, `assets/css/`,
`assets/img/`, and `images/` paths remain blocked by CF.  
The `monitor.js` script uses this bypass automatically via the
`_nuxt/assets/index.js` path; apply it to the lure HTML fetch as well.

**Similar-page pivot.** Open any known result on urlscan and use the
"Similar" tab (DOM-structure hash) — it clusters sibling lures on
different domains/IPs/ASNs that share the page skeleton.

**Reading the results:** `page.domainAgeDays` ~0–2 and a `click_id=`
query param mark the TDS-bought-traffic lures; `apexDomainAgeDays` in
the hundreds marks the aged-domain long cons (easyinvest7.biz,
amlbot.rest).

## 2. Crypto-scam blocklists and feeds (names, fast)

| Source | What it is | How to use |
|---|---|---|
| `github.com/scamsniffer/scam-database` | Open ScamSniffer blocklist of drainer/phishing domains | Clone, grep for the family's apex patterns; diff daily for new entries |
| `github.com/spmedia/Crypto-Scam-and-Crypto-Phishing-Threat-Intel-Feed` | Daily-updated crypto phishing feed | Same: grep + diff |
| `github.com/MetaMask/eth-phishing-detect` | MetaMask blocklist (`src/config.json` blocklist) | PRs name new drainer domains with family attribution |
| chainabuse.com | Community scam reports, law-enforcement linked | Search by domain/address; file reports |
| phishdestroy.io / phish.report | Anti-phishing + takedown | Submit for takedown; phish.report has a urlscan hunting workflow |
| scamsniffer.io | Commercial drainer intel (content-based scan) | Reference for family naming and campaign scale |

## 3. Certificate Transparency (new domains before they're scanned)

```
crt.sh/?q=%25meteora%25        crt.sh/?q=%25jup%25        crt.sh/?q=%25pump%25
```

Watch for the kit's cert pattern: Google Trust Services (`YE1`/`YE2`
issuer in the urlscan results), 90-day cert, issued 1–2 days before
first scan. CT shows the domain at issuance — earliest possible signal.

## 4. On-chain pivot (survives all domain rotation)

The durable indicators never rotate: program `TwrGADB9…`, treasury
`DvTqmF7u…`, collector `6cwsqBqm…`. Watch inbound transfers to the
collector and new signers calling the program — each new
per-campaign receiver points back to a fresh lure cluster. This is the
one pivot that outlives every domain takedown (`decompiled/iocs.json`).

## 5. Naming patterns to brute/monitor (this family specifically)

Brand-impersonation apexes seen serving the bundle: `web-meteora.{com,at,st}`,
`web-jupiter.{gd,st}`, `*.ag-v2.ink`, `*.ag-wc.ink`, `*.solroom.cc`,
`jup*.ink` (juphub, juplaunch), `solswap.ink`, `pumptracker.store`,
`pumpstreamhub.live`, `oshivault.com`, `solbarn.cc`. The template is
`<brand><sep><tld>` impersonating Meteora / Jupiter / pump.fun /
Dexscreener / Dextools. dnstwist over those brand strings, fed into
urlscan, surfaces the next wave.

## The loop

1. `hash:` pivot on urlscan daily → new domains.
2. For each, fetch `/_nuxt/assets/index.js` and hash it; fetch
   `/api/config` and decrypt (`scripts/monitor.js` does both).
   **Also fetch `/_nuxt/index.html` and hash it** — campaign pivots (new
   lure template) are only visible in the HTML hash, not the bundle hash.
3. New bundle hash → re-pivot on the new hash (step 1) to catch the rebuild.
4. New lure HTML hash → pivot on it (step 1) to find sibling hosts that
   deployed the same updated campaign template.
5. New receiver in a decrypted config or an on-chain drain → pivot #4.
6. Record, report to the blocklists in #2, repeat.

`scripts/monitor.js` automates steps 2–3 for the known host list; the
urlscan `hash:` pull is the discovery front-end that feeds it new hosts.
