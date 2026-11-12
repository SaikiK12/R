# Industry context: where this operation sits in the 2026 drainer landscape

A snapshot of the drainer ecosystem as of 2026-11-12, grounding the
pumpanakin.fun / Rublevka-method operation in the broader threat
picture. Sources are linked inline; all content was rephrased for
compliance with licensing restrictions. This is a situational document;
the kit-level analysis lives in `FORENSIC_REPORT.md` and `FLAWS.md`.

## The Drainer-as-a-Service model (DaaS)

By November 2026 the drainer market has matured into a full DaaS
ecosystem with two clearly separated layers
([Blockaid](https://blockaid.io/blog/how-crypto-drainers-are-using-x-twitter-to-target-web3-users)):

**Developers** build and maintain the malicious kit: the JS drain
logic, the backend infrastructure, wallet-scanning modules that
prioritize high-value tokens, evasion mechanisms (Cloudflare proxying,
UA cloaking), and technical support channels (Telegram communities).

**Affiliates** own distribution: they create and deploy lures from
developer-provided templates, then acquire victim traffic. Revenue
split is typically 75–85% to the affiliate, 15–25% to the developer.
The marker instruction per drain transaction (the on-chain affiliate
ledger visible in this kit — `decompiled/kit/chain/operator_program.md`)
is the settlement mechanism: the developer can read the chain and pay
out without trusting the affiliate's self-reported numbers.

Three affiliate traffic models are observed:

1. **Independent** — affiliates build their own distribution from
   scratch (social accounts, posting pipelines). Most affiliates
   operate this way according to Blockaid monitoring of drainer support
   chats.
2. **Cybercrime services** — bought followers, bot networks for social
   proof, paid promotion through compromised high-reach accounts.
3. **Traffers** — specialized actors whose only function is redirecting
   traffic to malicious content. Rublevka Team is explicitly described
   as a "traffer team" by Recorded Future
   ([source](https://www.recordedfuture.com/research/rublevka-team-anatomy-russian-crypto-drainer-operation)).

## Rublevka Team: the methodological match

[Recorded Future Insikt Group](https://www.recordedfuture.com/research/rublevka-team-anatomy-russian-crypto-drainer-operation)
characterizes Rublevka Team as:

- Active since 2023, began on LolzTeam Forum under the user
  `denisssss_inactive`
- Over **$10 million in lifetime revenue** as of late 2026; the SOL
  campaign launched in spring 2025 accounts for approximately $8.2M
- A **traffer team**: a network of social-engineering affiliates who
  drive traffic to malicious landing pages rather than infostealers
- Revenue split starting at 75% (affiliates) / 25% (developer),
  shifting to 80/20 for "experienced" affiliates
- Infrastructure includes a fully automated Telegram bot, a landing-
  page generator, free domains, hosting, cloaking, and DDoS protection
- The SOL drainer supports 90+ wallet types and drains SOL, SPL, SPL-
  Token-2022, NFTs, and Native Stake — consistent with this kit's
  Token-2022 handling observed in the program binary
  (`decompiled/kit/chain/operator_program.md`)
- 35+ ready-to-use landing page templates integrated with the drainer —
  consistent with the 30+ sibling lures identified in `FAMILY_MAP.md`

Attribution of pumpanakin.fun to Rublevka Team is **not** established
in this repository; the match is methodological. The IOC lists
(domains, keys, receiver addresses) differ, which is expected if the
same kit template is used by multiple affiliates or if the kit itself
is licensed to multiple operators under the hexfomo.fun vendor brand
(the kit watermark found in the bundle).

## X (Twitter) as the primary distribution channel

[Blockaid](https://blockaid.io/blog/how-crypto-drainers-are-using-x-twitter-to-target-web3-users)
documented two major drainer operations using X: **AngelFerno**
(multi-chain, high-frequency automated posting) and **Rublevka**
(Solana-focused, low-frequency camouflaged posting). Blockaid detected
over 260 distinct Rublevka-associated dApp URLs from this campaign.

**Rublevka's X playbook:**

| Step | Method |
|---|---|
| Account acquisition | Aged accounts (10–15 yrs) from underground marketplaces |
| Rebranding | Crypto terminology in bio/username, `.eth` suffixes, to trigger X recommendation algorithms |
| Verification | Blue Checkmark via paid subscription |
| Account warm-up | VPN matched to account's original location, simulate human behavior |
| Content camouflage | ~10 legitimate reposts for every 1 malicious post |
| Malicious posts | Urgency hook + malicious dApp link + fake value proposition + algorithmic hashtags |
| Anti-ban | Explicitly recommends against inflating follower counts (risk of instant bans) |

This is the X-layer equivalent of the kit's own anti-analysis design:
the balance gate stops researchers, the UA cloaking stops crawlers, and
the low-follower / high-repost ratio stops X moderation.

## The StepDrainer / Name.com DNS hijack (October 30–31, 2026)

A separate drainer family — StepDrainer — executed a qualitatively
different attack class the week before this analysis:
([The Block](https://www.theblock.co/news/defi/2026-10-31-hackers-hijack-a-dozen-defi-websites-all-registered-with-name-com-and-steal-about-138000-432251),
[forklog](https://forklog.com/en/hackers-hijack-domains-of-15-defi-projects/)):

- Attackers compromised the registrar layer (Name.com) and rewrote DNS
  for 12–15 DeFi front ends (Flap, Kintsu, Pickle Finance, Origami
  Finance, FluxBeam, Echelon, StonkFun, StakePoint, and others)
- Visitors to legitimate URLs were silently redirected to fake pages
  carrying StepDrainer, which tricked them into signing approval
  transactions
- Losses: approximately **$138,000** across the incident
- No smart contracts were touched; the attack was purely at the
  domain/DNS layer
- 10 of the domains were suspended; Name.com restored control and
  began investigation

**Relevance to this operation:** The pumpanakin.fun / Rublevka kit uses
a cross-domain popup to `easyinvest7.biz` for the actual wallet
interaction (`DYNAMIC_ANALYSIS.md`). A DNS-layer compromise of
`easyinvest7.biz` or any of the 30+ lure domains could redirect that
popup to a third party's server. The October 2026 event demonstrated
this attack class is actively being used. The architectural separation
of lure domain and connect domain (design principle 1 in
`OPERATOR_ARCHITECTURE.md`) reduces blast radius per domain — but
it does not eliminate the exposure; it spreads it across two domains
instead of one.

## The DaaS competitive landscape (2026)

| Kit | Primary chains | Note |
|---|---|---|
| Rublevka method (this kit) | Solana | Affiliate DaaS, traffer team model, $10M+ reported |
| AngelFerno | EVM, Solana, TRON, XRP | High-frequency X posting, inflated follower counts |
| StepDrainer | Multi-chain | Used in the Name.com DNS hijack, Oct 2026 |
| Inferno / Angel / Pink lineage | EVM (Ethereum, Polygon) | Earlier generation; Permit2 / allowance model |

The Solana-specific design choices in this kit — single v0 transaction
drain, vault PDAs via a custom on-chain program, Helius + Solflare API
abuse, Token-2022 support — are differentiators from the EVM Permit2
model. Solana's single-transaction composability means the kit does not
need a separate approve + transferFrom step; one signature moves
everything.

## Wallet-side detection (what defenders have deployed)

Blockaid's end-user protection ([source](https://blockaid.io/blog/how-crypto-drainers-are-using-x-twitter-to-target-web3-users))
operates at three layers:

1. **dApp scanning** — real-time flagging of malicious dApps before
   the user connects
2. **Token scanning** — flags malicious tokens associated with drainer
   campaigns
3. **Address scanning** — real-time data on malicious addresses,
   warning before fund transfer

The pivots that make dApp scanning effective against this family are
the same ones documented in `INFRASTRUCTURE.md`: bundle hash, Nuxt
asset path, `/api/visit`+`/api/is-banned`+`/api/config` route shape,
the AES key salt, and the on-chain program address. The durable ones
(program, treasury) will outlast domain and key rotation. The fragile
ones (bundle hash) will break on the first per-deployment build.

The balance gate (≥0.60 SOL) in this kit is partly an anti-analysis
measure but also a natural consequence of the affiliate incentive
structure: draining small wallets wastes time and burns connection
opportunities. Future versions will likely move this gate server-side
(see `FLAWS.md`, F11 and the next-gen projection).

## Summary: what is new since 2026-11-11

| Finding | Source | Impact on this repo |
|---|---|---|
| X/Twitter is a primary Rublevka distribution channel (260+ URLs) | Blockaid | Added to `GROWTH.md`, `FLAWS.md` F20 |
| Rublevka is a traffer team, $10M+ lifetime, LolzTeam origin | Recorded Future | Strengthens `GROWTH.md` affiliate machine section; attribution still not established for pumpanakin specifically |
| StepDrainer / Name.com DNS hijack exploited registrar-layer risk Oct 30–31 | The Block, forklog | Added to `FLAWS.md` F22 (connect domain exposure) |
| DaaS structure described in detail: 75–85% affiliate split | Blockaid | Validates `INFRASTRUCTURE.md` revenue-share assessment |
| 90+ wallet types, 35+ lure templates per Rublevka ad | Recorded Future | Consistent with 30+ sibling count; kit watermark `hexfomo.fun` may be the vendor |
