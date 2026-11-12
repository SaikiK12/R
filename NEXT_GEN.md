# Next-generation drainer: synthesis and projection

What comes after this kit. Built from cross-referencing every confirmed
technique seen in production in 2024–2026 against the weaknesses in this
kit and the trajectory of each family. This is a defensive document: the
point is to describe what defenders need to build to catch the next wave
*before* it scales.

Sources: Check Point Research (Inferno Reloaded, May 2025), Security Alliance
SEAL (State of Drainers Vol. 1, Oct 2025), Blowfish (Aqua/Vanish bit-flip,
Feb 2024), Socket Research (19 Chrome/Edge extensions, Aug 2026), TRM Labs
(fake AI bot tutorials, Sep 2026), HP Wolf Security (agentic AI drainer lures,
Aug 2026), BlockSec (Drift durable-nonce exploit, Apr 2026), OKX/Darkbit
(Vanilla Drainer, Jul 2025), Recorded Future (Rublevka Team, Oct 2026), Blockaid
(X/Twitter drainer campaigns, 2026), Cloud Security Alliance (Binance signing
compromise, Nov 2026). Content rephrased for compliance with licensing
restrictions.

---

## The seven confirmed new techniques (all seen in production 2024–2026)

### T1 — On-chain encrypted C2 (Inferno Reloaded, 2025)

Inferno Reloaded stores the C2 domain inside a BSC transaction. The
drainer code fetches the domain at runtime by reading from a smart contract.
The landing page has no hardcoded C2 — the entire address lives on-chain.
Result: SEAL's subresource-based blocking, which killed hundreds of Rublevka
domains by targeting the C2 address embedded in bundles, cannot work. The
C2 rotates by pushing a new on-chain transaction; no code rebuild needed.

The evolution: use a *private* chain or encrypted memo field so even the
on-chain data is unreadable without a key. The next step after Inferno
Reloaded is a chain where only the drainer operator can read the C2 address.

**What this means for defenders:** bundle-level static analysis (hashing,
string scanning) becomes insufficient. Defenders need runtime behavioral
monitoring — watch the first network request a loaded page makes and inspect
whether it goes to an unusual RPC endpoint before making API calls.

---

### T2 — Single-use self-destructing contracts (Inferno Reloaded, 2025)

Each drain now uses a contract that calls `selfdestruct` after one use.
The contract address is fresh per victim — no address to blacklist, no
contract to pivot on. The `create2` opcode lets the attacker predict the
address before deployment and bake it into the payload, then deploy only
when the victim arrives.

This directly addresses the EVM drainer's historical weakness: a persistent
spender contract address that gets blocklisted within hours of first use.
On Solana, the equivalent would be using a fresh program deployment per
campaign. The hexfomo kit does the opposite — one persistent upgradeable
program used for all drains.

**Expected Solana evolution:** per-campaign program deployments using the
BPF loader's `create_account` + `deploy` sequence. The upgrade authority
key would be a fresh throwaway per deployment, not a reused key (Flaw F8
in this kit). This is feasible at low cost since BPF program deployment
only requires funding the program account with rent-exempt SOL.

---

### T3 — Bit-flip attack: transaction looks safe at signing, is malicious at broadcast (Aqua/Vanish, Feb 2024)

Blowfish documented two Solana drainers using **bit-flip attacks**. The
victim signs what appears to be a benign transaction. When the drainer
receives the signature, it flips specific bits in the serialized transaction
before broadcasting — exploiting predictable structure in the transaction
format to redirect the destination without the victim's knowledge.

This defeats *any* pre-sign transaction simulation or preview, because the
transaction the wallet shows the victim is not the transaction that lands
on chain. It is a fundamentally different attack class from "trick the
victim into signing a bad transaction" — it is "get the victim to sign
anything, then mutate it."

The limitation: not all transaction fields are mutable after signing without
invalidating the signature. The attack works on specific instruction data
fields that can be altered in ways the signature cannot detect. Blowfish
auto-blocked this category and pushed for a protocol-level fix, but the
technique demonstrated the existence of a signing-preview gap.

**What this means for defenders:** wallets that show a "transaction preview"
based on the pre-sign serialized bytes are showing the wrong thing. The
preview must be regenerated from the *post-serialization* bytes that will
actually be broadcast, and must be compared against the bytes the victim
was shown.

---

### T4 — Browser extension CSP-stripping + multi-chain drain injection (Socket Research, Aug 2026)

Socket found 19 malicious Chrome and Edge extensions using a modular
framework. The key capability: **stripping Content Security Policy headers**
from every page the victim loads, then injecting attacker-controlled
JavaScript. The injected code includes:
- A multi-chain wallet drainer (EVM + Solana + TRON)
- Fake Ledger/Trezor recovery pages to harvest seed phrases
- Session cookie harvesting (bypasses MFA)
- ClickFix social engineering lures

This is architecturally different from a phishing kit: it doesn't need a
fake page. It injects into the *real* wallet interface, the real exchange,
the real DeFi app. When the victim opens Phantom or Backpack to sign a
real transaction, the extension's injected code intercepts and replaces
the transaction before it reaches the wallet.

The 19 extensions were disguised as screen readers, ad-spy tools, and
crypto price trackers — legitimate-sounding utilities that justify requesting
`"host_permissions": ["<all_urls>"]` and `"storage"` access.

**What this means for defenders:** a hardware wallet provides no protection
against a compromised extension that intercepts the transaction object before
it reaches the hardware wallet's signing interface. The extension can replace
the destination address on-screen and in memory before the USB call is made.
Real defense requires transaction signing on an isolated hardware device that
re-serializes from raw instruction data, not from the browser's rendering.

---

### T5 — Fake AI tutorials: victims build and fund their own drainers (TRM Labs, Sep 2026)

TRM Labs documented nine near-identical YouTube tutorials presenting an
AI arbitrage bot supposedly built with Claude. Victims were instructed to
paste code into what appeared to be Remix IDE (a fake, attacker-controlled
compiler). The "compiled" bytecode was actually a drain contract. The
tutorial then told victims to fund the "bot" with 1–2 ETH as "startup capital."

Result: 224 victims, 274.60 ETH (~$517K) drained Feb–Aug 2026. The median
victim lost ~1 ETH. The technique is elegant: the victim's own action
(deploying and funding the contract) is the drain mechanism. There is no
phishing link to click, no suspicious domain to visit — the victim follows
a step-by-step tutorial and builds their own drain.

HP Wolf Security documented a parallel campaign in Apr–Jun 2026 using fake
*agentic* AI trading tools — victims were told to install and fund an
autonomous trading agent, which immediately drained connected wallets.

**What this makes possible on Solana:** a tutorial that walks the victim
through "deploying your own Solana memecoin with pumpfun" and embeds a
drain program invocation inside the deployment transaction. The victim signs
what looks like a program initialization but includes an operator-controlled
drain instruction baked into the program itself.

---

### T6 — Durable nonce pre-signed transaction attack (Drift $285M, Apr 2026)

Drift Protocol lost $285M in April 2026 when an attacker social-engineered
two of five multisig signers into pre-signing transactions using **durable
nonces** — Solana's mechanism for transactions that never expire. The
attacker collected the partial signatures over weeks, then broadcast the
fully-signed drain transaction in one shot.

Solana is now proposing retiring durable nonces following this incident.
But the attack pattern has immediate drainer implications: a drainer could
present a victim with a durable-nonce transaction as an "unlimited airdrop
claim" or "permanent allowance" that the victim signs once. The drainer
stores the signed tx and broadcasts it whenever the wallet is fully funded
— days or months later. Unlike a blockhash-based transaction (expires in
~400 blocks / 3.2 minutes on Solana), a durable-nonce tx is valid until
the nonce is advanced.

**What this means for defenders:** wallets showing "this transaction expires
in 60 seconds" provide false reassurance when the transaction uses a durable
nonce. The user interface needs to explicitly warn when a durable-nonce
account is included in a transaction's account list.

---

### T7 — AI agent wallet drain via MCP/prompt injection (confirmed, 2026)

A documented incident on May 4, 2026 saw an attacker drain an AI agent's
wallet by injecting malicious tool calls, without touching a human interface
at all. The agent's MCP (Model Context Protocol) tool router was poisoned to
redirect a payment call to an attacker address. 26 LLM routers were found
injecting malicious tool calls; one drained ~$500K from a client wallet.

The underlying principle: AI agents that hold signing keys will sign
whatever their tool calls instruct them to sign. If the tool call pipeline
can be poisoned (via a compromised MCP server, a poisoned npm package, or
a prompt injection in the LLM's context window), the agent will sign a
drain transaction indistinguishable from a legitimate payment.

This is the highest-velocity attack surface in 2026: the number of Solana
programs with EIP-5792-equivalent ("sendCalls") AI agent interfaces grew by
5.4x from Nov 2025 to Jan 2026. Each AI agent holding a Solana wallet is a
potential drain target that requires no human interaction at all.

---

## The composite next-generation architecture

Combining the above, here is what a maximally capable 2027-class Solana
drainer looks like. This is a projection, not a description of an observed
kit — it synthesizes confirmed techniques into a coherent architecture.

```
LAYER 0 — TRAFFIC
  AI-generated lures: LLM-generated landing page copy, per-victim
  personalization from on-chain portfolio data, deepfake video testimonials.
  Nine identical YouTube tutorials was 2026; next is 90, fully automated.
  Distribution: compromised Google Ads accounts (geographic targeting),
  poisoned AI tool repositories (npm, PyPI), X aged accounts (Rublevka model).

LAYER 1 — LURE DELIVERY
  Three modes, run in parallel:
  a. Phishing site (traditional): two-layer HTML with AI-polished copy,
     no grammar errors, locale auto-detected from Accept-Language.
  b. Browser extension: CSP-stripped injection into real wallet UI.
     The victim sees the real Phantom/Backpack interface; the extension
     intercepts the transaction before the hardware wallet call.
  c. AI tutorial: victim deploys and funds their own drain contract
     following a step-by-step "build a Solana bot" guide.

LAYER 2 — ANTI-ANALYSIS
  - C2 stored on-chain (BSC or Solana memo), AES-encrypted, key delivered
    via a second on-chain transaction signed by a known key.
  - Per-deployment program: fresh program deployment per campaign, funded
    by throwaway keypair. No persistent program address to pivot on.
  - Server-side balance gate AND eligibility gate: balance check moves to
    /api/c/i response, not client-side. Mock-chain bypass (F11) no longer
    works.
  - Per-domain bundle hash: unique obfuscation seed per deployment.
    Hash-based family detection fails.
  - Fake 404 for headless Chrome (not just non-desktop UAs):
    full Playwright fingerprint detection.

LAYER 3 — TRANSACTION DESIGN
  - Durable nonce: victim signs once, drain broadcasts weeks later when
    wallet is funded. Blockhash expiry displayed as "permanent claim."
  - Bit-flip manipulation: sign a benign-looking airdrop claim; the
    drainer flips instruction data bytes before broadcast.
  - Decoy legs extended: 10+ incoming SOL/token legs to fully saturate
    the wallet preview with positive-looking entries.
  - Single-use program: each drain goes through a fresh program deployed
    with `create2`-equivalent. The program self-closes (reclaims rent)
    after one use.

LAYER 4 — MULTI-CHAIN SWEEP
  After draining Solana, the kit bridges SOL to wSOL→wETH via Jupiter's
  cross-chain swap, then to EVM. The bridge transaction is bundled into
  the same signed tx the victim approves ("gas-free cross-chain swap to
  optimize your yield"). The victim never sees the bridge happen.

LAYER 5 — EXFILTRATION
  - Operator co-signs server-side (same as today), but receiver addresses
    are derived from a fresh HD wallet path per victim, not reused.
  - Treasury is an MPC wallet (no single on-chain accumulation point to
    pivot on — Flaw F5 closed).
  - Affiliate ledger moves to encrypted memo fields, not plaintext ASCII
    tags (Flaw F6 closed).
```

---

## What defenders need to build right now

Ordered by what's already in production vs what's projected:

### Already needed (attacks confirmed in production)

**1. Transaction re-serialization in wallet UI (T3 — bit-flip)**
Wallets must re-serialize the transaction from the raw instruction data
after the victim clicks "confirm" and before the signed bytes are broadcast.
If the re-serialized version differs from the signed version, reject.

**2. Browser extension review and isolation (T4 — CSP stripping)**
Hardware wallets need to sign from an isolated process that never receives
its transaction data from the browser's JavaScript context. The extension
can't intercept a USB HID message that the browser never touched.
Wallets should warn if any installed extension holds `<all_urls>` host
permissions with `tabs` and `storage`.

**3. Durable nonce warnings (T6)**
Any transaction that includes a durable-nonce account must surface an
explicit warning: "This transaction does not expire. Approving it now
authorizes it forever." Solana core devs are already proposing to
retire the feature.

**4. AI agent signing policy (T7 — MCP drain)**
AI agents with signing keys must have a mandatory spend limit enforced
at the key management layer, not in the agent's code. The signing layer
must verify the destination against a whitelist before signing regardless
of what the LLM decided.

**5. On-chain C2 detection (T1 — Inferno Reloaded)**
Defenders need to monitor for drainer-pattern behavior: a page that makes
a first request to an unexpected blockchain RPC endpoint (BSC, Arbitrum,
etc.) before making any wallet-interaction calls. That is the C2 fetch.
Block the page on the first anomalous RPC call, not after the drain tx.

### For the projected next wave

**6. Per-victim program address monitoring**
Defenders should track program deployments per campaign. If 100 different
program addresses all have the same instruction handler shape (same
discriminator bytes, same account layout), that's a family regardless of
address. Fingerprint the program's ABI, not its address.

**7. Cross-chain bridge anomaly detection**
A transaction that approves a cross-chain bridge transfer in the same
instruction set as a "claim airdrop" call should be flagged. No legitimate
airdrop claim includes a bridge instruction.

**8. Durable nonce in drain transactions**
Watch for victim wallets that signed a durable-nonce transaction and later
had that transaction broadcast months after signing. The nonce advance
instruction should be flagged if it appears in a transaction alongside
unknown program calls.

---

## How far ahead this kit is vs what's coming

This kit is a **2024-class design being operated in 2026**. It has not
adopted any of T1–T7. Its program address is permanent, its bundle hash
is identical across 30+ domains, its C2 key is derivable from the bundle,
its balance gate is client-side, its affiliate tags are plaintext ASCII.

The receiver rotation (observed live Nov 11→12) and locale expansion (3→11
languages) show an operator that is actively maintaining the *distribution*
layer but not the *technical* layer. That's consistent with the DaaS model:
affiliates demand more lure languages and receiver rotations; they don't
demand single-use programs because they don't understand the defensive
implications.

The kit's Solana-specific advantages (single-tx drain, Token-2022,
native stake, vault PDA composability) are structural and will persist
regardless of which generation of kit is deployed. Those are features of
the Solana account model, not features of this kit's engineering.

The weakest part of the kit — the identical bundle hash and the
world-readable AES config key — are also the cheapest to fix. Expect them
to close the moment the SEAL domain-blocking rate becomes noticeable in
the operator's traffic.
