# Flaws: where the operation is weak

A critical review of the pumpanakin.fun operation as engineered. Each
flaw is something proven elsewhere in this repo (linked), or sourced
from public reporting on the broader Rublevka operation. The last
section projects what a next-generation kit will likely change — so
anyone studying or watching for this family knows what to expect. This
is an analytical document, not an improvement guide: there are no
fixes here that the operators don't already know about, and nothing
actionable toward running a better scam.

**Update — 2026-11-12.** Since the initial analysis (2026-11-11),
Recorded Future Insikt Group published a comprehensive report on
Rublevka Team ([source](https://www.recordedfuture.com/research/rublevka-team-anatomy-russian-crypto-drainer-operation))
and Blockaid documented the Rublevka X/Twitter distribution campaign
([source](https://blockaid.io/blog/how-crypto-drainers-are-using-x-twitter-to-target-web3-users)).
The new material adds four flaws (F19–F22) and cross-validates several
findings already in this document. See `ECOSYSTEM.md` for the
full situational picture. Content was rephrased for compliance with
licensing restrictions.

## Cryptography and key management

**F1. One salt, three purposes, shipped in every bundle.** The AES key
material for `/api/config`, the `/c/i` payload, and `/api/handler`
telemetry all derive from the same embedded salt
(`B3ui3QZFrOPoGW7oMZgE4A`) with the purpose string being just the
hostname (`decompiled/kit/operator/payloads.js`). Anyone who can read
the bundle can decrypt every domain's live config — which is exactly
what this repo did.

**F2. The live config endpoint is world-readable and unauthenticated.**
`GET /api/config` hands the current receivers and parameters to anyone
(`decompiled/live/`). Their receiver-rotation mechanism is therefore
public in real time: watch one endpoint per domain and you see every
rotation as it happens.

**F3. The `/c/i` response travels unencrypted.** The request is
AES-GCM; the response is a plain binary record (`decompiled/kit/
operator/operator_api.js`). Session contents are readable by any
observer of the traffic.

**F4. Their Solflare "authorization" is theater.** The bearer is 16
random bytes with a UUID nibble (`decompiled/kit/chain/solflare_api.js`).
It protects nothing and signals they don't understand the service they
abuse — a fingerprint, not a defense.

## On-chain OpSec

**F5. The treasury is hard-coded, reused as fee payer, and holds the
money.** `DvTqmF7uMbLaW56QsMvcgv8KSkydFEikuk5gUcjACPV` is in the kit's
string table, pays the fee in captured drain transactions, and holds
17,057 SOL + 1.02M USDC (`decompiled/live/`). One address glues the
bundle, the transactions, and the proceeds together. Blockchain
attribution doesn't get easier than that.

**F6. Plaintext ASCII affiliate tags in every drain.** The marker
instruction carries `1kd14ntu4|1|`-style campaign tags in the clear
(`decompiled/kit/chain/operator_program.md`). The affiliate ledger is
permanently, publicly queryable — every campaign, countable on-chain,
forever.

**F7. Decoy legs come from their own cluster.** The "incoming" 500
USDC/USDT legs originate from relay/staging addresses tied to the same
operation (`RUNTIME_ANALYSIS.md`). The persuasion mechanism itself
creates links between the money cluster and every victim.

**F8. The program has a single upgrade authority.** One key
(`3ofSxsTReb…`) controls the drain engine. If it is ever compromised,
seized, or lost, the program is hijacked or frozen — a single point of
failure for the entire operation.

## Kit engineering

**F9. Byte-identical bundle across 30+ domains.** One SHA-256 pivot on
URLScan enumerated the whole family (`DEPLOYMENT_MAP.md`). Serving the same
hash everywhere turns one detection into total exposure.

**F10. Free version fingerprint.** The kit prints `1.18.4` to the
browser console and ships it in every telemetry event
(`RUNTIME_ANALYSIS.md`). Versioning for their own debugging, gift-
wrapped for trackers.

**F11. The anti-analysis gate is client-side.** The ≥0.60 SOL balance
check runs in the victim's browser against RPC answers — a mock chain
walks straight through it (this repo's harness did, twice). It stops
honest broke users, not researchers.

**F12. The whole funnel depends on a popup.** The connect flow needs
`window.open` to reach the connect domain. Any popup blocker, any
mobile browser that suppresses popups, any cautious user who closes a
surprise window — and the funnel dies at the first click.

**F13. Deterministic builders.** Same portfolio in, byte-identical
transaction out (minus blockhash) — proven by two independent captures
(`decompiled/live/dynamic/captured_tx.txt`). No variance means easy
clustering of their transactions on-chain.

**F14. The two-layer HTML only beats crawlers that don't execute JS.**
The filler-text trick (`FRONTEND_LAYER.md`) is transparent to any
sandbox with a JavaScript engine — i.e., all modern ones.

## Operations

**F15. Burnout-visible RPC keys.** The Helius keys rate-limit publicly
(429 observed live), and they're embedded in the kit — reportable,
revocable, and their burnout pattern is observable (`RUNTIME_ANALYSIS.md`).

**F16. Uneven deployment quality.** Cloudflare bot-walls on some
siblings, plain 200 on pumpanakin; `dexscreener.fyi` serving a
misconfigured deployment with a dead `/api/config` (`DEPLOYMENT_MAP.md`).
Rolling out 30+ costumes didn't come with 30+ units of care.

**F17. Wasted long-con effort.** amlbot.rest is a 3-year-old fake
compliance company — real costume investment — wired to the same
bundle, same pivots, same treasury. The aging work inherits every
attribution weakness of the cheapest sibling.

## Social engineering

**F18. Detail slips a careful victim catches.** "to verificate your
account" in the modal copy; the fake confirm dialog quoting different
amounts in different runs (−5 USDC vs −0.0361 SOL, `RUNTIME_ANALYSIS.md`);
"250.000$" with a European thousands separator under an English pitch
(`FRONTEND_LAYER.md`). Each is small; together they're the texture of a
fake.

## Affiliate and distribution layer

**F19. The affiliate payout ledger is on-chain in the clear.** ASCII
campaign tags (`1kd14ntu4|1|`, `r_ia6awp|0|`) are written into the
marker instruction of every drain transaction (`decompiled/kit/chain/
operator_program.md`). The entire affiliate graph — which campaign tag
drove each drain, the timestamp, and the amounts — is permanently and
publicly queryable on Solana mainnet. Any law-enforcement agency or
researcher can reconstruct the affiliate settlements from the chain
alone. This is F6 extended: the ledger is not just present, it is
_the_ channel by which affiliates are paid, meaning the operator
cannot remove it without breaking their own revenue-share system.

**F20. The X/Twitter distribution campaign is enumerable in real time.**
Rublevka-associated accounts follow a documented, consistent
playbook (Blockaid, 2026): aged accounts, Blue Checkmark via paid
subscription, 10+ legitimate reposts for every malicious post.
Blockaid detected over 260 distinct malicious URLs from this campaign.
The low-follower-count selection Rublevka explicitly recommends
(hundreds to a few thousand) means that any automated monitor watching
X for posts containing the bundle's known domain patterns or the
Nuxt asset path `/_nuxt/assets/index.js` will surface new lures near
real-time — the operator's own stealth recommendation becomes a
detection foothold.

**F21. The DaaS model is structurally visible.** Rublevka's affiliate
program has been openly advertised on LolzTeam Forum since at least
2023 (Recorded Future). The forum posts describe the revenue split,
the Telegram bot infrastructure, and the landing-page generator. Any
new lure an affiliate deploys will carry the same bundle hash, the
same `/api/config` decryption key, and the same on-chain program —
the structural invariants are set by the kit developer, not the
affiliates, so the entire affiliate fleet is exposed by one pivot on
any invariant.

**F22. The popup connect flow leaks to the registrar layer.** The
victim's browser opens a cross-domain popup to `easyinvest7.biz`
(dynamic analysis, `RUNTIME_ANALYSIS.md`). DNS changes to any of the
lure domains, or a registrar compromise of `easyinvest7.biz` itself
(cf. the StepDrainer / Name.com DNS hijack of 12 DeFi sites,
October 30–31 2026), could redirect the popup to a third party's
server and expose the signed transactions to an attacker who is not
the operator. The October 2026 DeFi hijack incident demonstrated this
exact attack vector at scale against a different kit; the architecture
here is equally susceptible.

## What the next generation of this kit probably looks like

Reasoning forward from these flaws — this is what researchers should
expect to change, and what makes today's pivots decay:

- **Per-domain secrets.** Different salts/keys per lure, authenticated
  config endpoints, encrypted `/c/i` responses. The current config
  readout is too easy; expect it to close.
- **Money hygiene.** One-time treasury hops instead of a hard-coded
  treasury, decoy funds from unrelated wallets, no plaintext marker
  tags (attribution moving off-chain or into encrypted memo fields).
  The durable on-chain pivots in this repo have a shelf life.
- **Build variance.** Per-theme or per-deployment bundle builds with
  different hashes, breaking the single-hash family pivot.
- **Server-side gating.** Balance/eligibility decided in the `/c/i`
  response rather than the browser, so mock-chain research setups get
  the same refusal as honest users.
- **Iframe flows.** Popups traded for in-page iframes to remove the
  popup-blocker single point of failure.
- **X distribution shift.** As Blockaid and other wallets deploy
  real-time dApp scanning against known Rublevka domains, the
  distribution will likely move toward one-time-use domains served
  from throwaway Pages hosts — the same trajectory visible in the
  meteora-exchange*.pages.dev cluster (`DEPLOYMENT_MAP.md`).
- **Copy polish.** The grammar and consistency slips are the cheapest
  thing to fix and will quietly disappear.

Until then, the pivots that catch this family today are documented in
`STACK.md` ("What changes between deployments") and the IOC
catalog in `decompiled/iocs.json`. For the broader drainer landscape,
see `ECOSYSTEM.md`.
