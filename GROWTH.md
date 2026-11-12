# Growth: how the operation gets victims

Evidence-based answer to "how do they grow": certificate timelines,
archive history, the page itself, on-chain data, and the industry's
reporting on the same blueprint. Everything dated 2026-11-11 unless
noted.

## Short answer: there is no SEO

Nothing about these lures is built to be found. Single pages, no
sitemap, no linkable content, `notranslate` on the html tag, domains
days-to-weeks old, zero organic footprint (pumpanakin.fun's first
Wayback capture is 2026-11-02 — a 301, nine days before analysis).
Search engines never see the pitch; even if they did, the served HTML
is filler words (`LURE_ANALYSIS.md`). Distribution is **pushed**, not
pulled: the victim arrives already primed, from somewhere else.

## The actual channels (evidence)

**Telegram and social spam.** The lure itself points at *real*
destinations for credibility — `t.me/durov` (Telegram's founder's
actual channel), `x.com/telegram`, `donaldjtrump.com` — so a hovering
victim sees plausible links. The inbound traffic is the inverse:
unsolicited posts/DMs in Telegram crypto groups and social replies
dangling a "TRUMP COIN airdrop" or a Meteora/Jupiter/pump.fun claim
(theme list in `FAMILY_MAP.md`). Russian-language page + Russian
countdown alert says the primary audience is RU-speaking Telegram
crypto communities.

**Paid/affiliate traffic with per-click tracking.** The Meteora and
web-jupiter clusters arrive with `click_id=<uuid>` in the URL
(visible in URLScan submissions) — the signature of a
traffic-distribution system (Keitaro/Binom-style): bought clicks,
tracked individually. `web-jupiter.gd` runs a full themed gateway
(login./tracker./app./launchpad. subdomains) so one domain survives as
a whole fake product when an ad account burns.

**Aged and long-con domains.** Certificate Transparency shows the
operation mixes fresh throwaways with credibility stock:

| Domain | First cert | Role |
|---|---|---|
| easyinvest7.biz | 2018-10 | connect/payload domain — an **8-year-old** domain (expired-and-reused or acquired aged), so domain-age filters and wary victims see "established" |
| amlbot.rest | 2023-11 | fake AML company — a **3-year** long-con costume |
| paybackpump.fun | 2026-03 | pump.fun clone |
| dexfi.app | 2026-06 | DEX clone |
| arvoniq.com | 2026-08 | template-family lure |

The staggered first-seen dates are rolling deployment waves: new
costumes continuously, old ones abandoned without cost (several on free
Cloudflare Pages).

## The affiliate machine (the part you can only see end-to-end here)

This operation pays for performance, and the plumbing to do it is
visible across three layers we mapped:

1. **Arrival tag** — `utm_source` or the referrer host, validated and
   cached in `localStorage["_0x6"]` (`kit/page/page_params.js`).
2. **Backend attribution** — `POST /api/visit?source=<tag>` reports
   the tag to the operator (`kit/page/visit.js`).
3. **On-chain attribution** — every drain transaction starts with a
   marker instruction carrying an ASCII campaign tag
   (`1kd14ntu4|1|`, `r_ia6awp|0|` — observed in real mainnet txs,
   `decompiled/kit/chain/operator_program.md`).

A tag follows the victim from the spam link to the blockchain. That is
an affiliate payout ledger: the operator can settle per campaign, per
affiliate, per drain. The mobile/desktop split is tracked too — the
connect-domain shim branches on `outerWidth < 768` (mobile gets the
embedded flow and the fake wallet-app deep links; desktop gets the
popup).

## Industry context: this is a known blueprint

The model above is documented publicly under the name **Rublevka
Team** — [Gurucul](https://community.gurucul.com/articles/ThreatResearch/Rublevka-Team-Anatomy-of-a-Russian-5-2-2026)
and [Recorded Future](https://www.recordedfuture.com/research/rublevka-team-anatomy-russian-crypto-drainer-operation)
describe an affiliate-driven, Russian-language, Solana drainer active
since 2023 with $10M+ taken: fully automated drainer, custom JS
payloads covering ~90 wallets, spoofed Phantom/Bitget/Jito interfaces,
turnkey Telegram-bot infrastructure for affiliates, the same Helius-key
pattern and Solflare API abuse (their IOC lists differ from ours —
different domains and keys — which is the point: the blueprint is
shared). Attribution of pumpanakin.fun to Rublevka Team specifically is
**not** established here; the match is in method, and that is the
educational value. Content was rephrased for compliance with licensing
restrictions.

The same template ecology shows in public scam trackers: fake
$KIMCHI/$SPX/$JTO/$PUNCH "claim" pages ([example](https://malwaretips.com/blogs/kimchi-airdrop-scam/)),
all variations on "the only action that matters is Connect Wallet."

## Deobfuscation coverage, per artifact class

| Artifact | Status | Where |
|---|---|---|
| Main bundle (JS-Confuser, 6 layers) | fully decoded | `decompiled/`, `FORENSIC_REPORT.md` |
| Lure HTML dictionary (zero-width + Cyrillic + splits) | fully decoded (41 entries) | `LURE_ANALYSIS.md` |
| `/api/config` AES-GCM blob | fully decoded | `decompiled/live/api_config_decoded.json` |
| Telemetry record (AES-GCM) | fully decoded | `DYNAMIC_ANALYSIS.md` |
| On-chain program (eBPF) | dispatch + behavior decoded | `decompiled/kit/chain/operator_program.md` |
| Persuasion videos | container-parsed: `malicious.webm` 10.8s, `200tx.webm` 11.0s, `refund.webm` 8.0s — short "proof" clips played during the fake verification | `archive/pumpanakin.fun/` |
| Helper scripts (`sbdst.js`, `5cagf.js`, `ibpi6.js`) | read: benign jQuery effects/countdown per theme | `LURE_ANALYSIS.md` |
| Captured drain transaction | fully decoded | `decompiled/live/dynamic/captured_tx.txt` |
| dexscreener.fyi bundle | deployment degraded: `/api/config` 404s; its `index.js?aa6524x` now serves a 3.4KB stub (hash `8514f000…`), not the kit — retired or misconfigured | `FAMILY_MAP.md` |
