# Comparison: how this kit measures up against the major drainer families

An analytical comparison grounded in public reporting on Inferno, Angel,
Pink, Monkey, and the EVM lineage, against what was directly observed in
this kit. The goal is to place the hexfomo/Rublevka-method Solana drainer
in the competitive landscape and identify where it is ahead, behind, or
doing something structurally different.

Sources used: Check Point Research (Inferno Reloaded, May 2025), Group-IB
(Inferno 2024), Security Alliance SEAL (State of Drainers Vol. 1, October
2025), Scam Sniffer annual reports (2023, 2024, 2025), Recorded Future
(Rublevka Team, October 2026), Blockaid (X/Twitter drainers, 2026).
Content rephrased for compliance with licensing restrictions.

---

## The numbers: where this kit sits in the landscape

| Kit | Chain | Period | Total taken | Victims | Model |
|---|---|---|---|---|---|
| Inferno | EVM (100+ chains) | Nov 2022–Nov 2023 | $80–87M | 137,000 | DaaS, 20/80 split |
| Inferno Reloaded | EVM | H2 2024–2025 | $9M+ (6 mo) | 30,000+ | same, returned |
| Pink | EVM | 2023–May 2024 | $85M | — | DaaS, shut down |
| Angel | EVM → Solana/TRON/XRP | 2023–2024 | absorbed Inferno code Oct 2024 | — | DaaS |
| AngelFerno | EVM+Solana+TRON+XRP | 2025–2026 | active | active | DaaS, automated X posts |
| Monkey | EVM | 2022 | $16M (6 mo) | — | DaaS predecessor |
| **Rublevka method (this kit)** | **Solana** | **2023–active** | **$10M+ reported by RF** | — | **DaaS, traffer team** |

Scale context: across the whole drainer category, Scam Sniffer counted
$300M stolen in 2023, $494M in 2024 (+67% YoY), then a sharp fall to
$83.85M in 2025 (−83% YoY) as shutdowns and wallet-side defenses took
hold. The Rublevka-method operation is a mid-tier player by total take,
but it is Solana-native and structurally distinct from the EVM lineage.
Sources: [Scam Sniffer 2024](https://drops.scamsniffer.io/scam-sniffer-2024-web3-phishing-attacks-wallet-drainers-drain-494-million/),
[Scam Sniffer 2025 via cryptonews](https://cryptonews.com/news/wallet-drainer-phishing-losses-fall-to-84m-in-2025-down-83/).

---

## Drain mechanism: the structural split

The most important difference between this kit and the EVM lineage is not
the UI or the lure — it is the on-chain drain architecture.

### EVM lineage (Inferno/Angel/Pink)

EVM drainers get the victim to sign a **token approval** or a **Permit2
signature** — not a transfer. The classic flow:

1. `setApprovalForAll(attacker, true)` — one signature grants unlimited
   transfer rights over all NFTs forever
2. `Permit2.permit(...)` — an EIP-2612/Permit2 signature lets the attacker
   call `transferFrom` for any amount of any approved token
3. The attacker's spender contract calls `transferFrom` in a later tx

What the victim signs does not look like a transfer. The wallet shows an
"approval" or a "permit" — the victim is granting permission, not sending.
The actual drain happens in a second transaction the attacker submits.

**Inferno Reloaded's new technique (2025):** single-use smart contracts
that self-destruct after one transaction, making blacklisting impossible
([Check Point Research](https://research.checkpoint.com/2025/inferno-drainer-reloaded-deep-dive-into-the-return-of-the-most-sophisticated-crypto-drainer/)).
The C2 address is stored encrypted on BSC and loaded at runtime — the
drainer code itself has no hardcoded C2. This is specifically designed
to defeat subresource-based blocking (the SEAL approach). Content was
rephrased for compliance with licensing restrictions.

### This kit (Solana, vault PDA model)

Solana has no Permit2 and no `setApprovalForAll`. Solana's account model
requires a different approach. This kit uses a **custom on-chain program**
(`TwrGADB9QPrLfTKpWuyq9tjgRaGsuzgRUMFTz51uhsa`) with vault PDAs:

1. The victim signs a single v0 transaction
2. The transaction has three required signers: victim, treasury, receiver
3. The victim signs only their slot; the other two are placeholder zeros
4. The partially-signed tx goes to `/api/process`; the operator adds the
   other two signatures server-side, then broadcasts

The drain itself happens inside the operator's program — the victim's
signature authorizes the program's vault PDA to sweep tokens on their
behalf. The wallet preview shows "incoming" decoy legs (1 SOL + 500 USDC
appearing to arrive), hiding the actual sweep.

**Key architectural difference:** EVM drainers need a *second* transaction
(the attacker calling transferFrom). Solana drainers bundle everything —
the decoy incoming legs and the actual sweep — into *one* transaction the
victim signs. That's why a Solana drain is total and instant; there is no
"drain later" window that could be blocked.

---

## Anti-analysis: who does it better

| Capability | Inferno Reloaded | This kit |
|---|---|---|
| C2 hiding | **On-chain encrypted (BSC smart contract)** | Fixed AES-GCM key in bundle (broken by FLAWS F1) |
| Smart contract lifecycle | **Single-use, self-destruct after one tx** | Persistent upgradeable program, same address forever |
| Config rotation | On-chain, requires tx to update | Server-side AES-GCM blob, one HTTP push (simpler but world-readable — F2) |
| UA cloaking | Fingerprinting + fake 404 | Same: desktop Chrome → lure, others → 404 |
| Balance gate | Unknown | Yes: ≥0.60 SOL, client-side (bypassed by mock chain — F11) |
| Sandbox detection | Fingerprinting + CAPTCHA + CDN chain | Balance gate only (weaker) |
| Bundle hash | Varies per deployment | **Identical across 30+ domains — single hash exposes the whole family (F9)** |
| Subresource blocking | Fetches payload from JSDelivr/GitHub CDN | Static bundle per domain (simpler, no CDN chain) |

**Where Inferno Reloaded is ahead:** single-use contracts and on-chain
encrypted C2 are genuinely novel evasions. This kit uses a persistent
program with a fixed address — one of the strongest on-chain attribution
pivots that exists (FLAWS F5, F8). Inferno's C2 encryption approach
(storing the C2 domain in a BSC transaction) directly addresses the SEAL
blocking methodology; nothing equivalent exists in this kit.

**Where this kit is ahead:**
- The vault PDA program is more sophisticated than Inferno's spender
  contract in one way: it handles Token-2022 TransferCheckedWithFee,
  native stake accounts via Stake.withdraw, and LP tokens from Meteora/
  Raydium/Orca. Inferno targets EVM and uses Permit2 — it cannot touch
  staked SOL or Token-2022 extensions natively.
- The 3-signature transaction structure (victim + treasury + receiver,
  operator co-signs server-side) is structurally cleaner than the EVM
  approve+transferFrom two-step — the victim sees one transaction, not two.

---

## Lure and social engineering: how they compare

The EVM drainers (Inferno, Pink) used **brand impersonation** as their
primary lure — fake Uniswap, Lido, Aave, OpenSea pages. This kit does
the same at a Solana-ecosystem level (fake pump.fun, Meteora, Jupiter,
Dexscreener), but it has a structural trick neither Inferno nor Pink
deployed: **the two-layer HTML**.

The raw HTML is word salad. Only after `DOMContentLoaded` fires does the
pitch dictionary inject. Static crawlers, takedown reviewers, and keyword
scanners see gibberish. Inferno typically served the pitch directly in HTML
and relied on obfuscation of the script. The two-layer approach is a
meaningful improvement for lure longevity.

The **fake "Confirm Transaction" dialog** (the kit's own UI before the real
wallet prompt, with decoy "incoming" amounts) is comparable to Inferno's
social engineering layer, but the decoy incoming legs in the actual signed
transaction go further — the wallet's own preview shows money arriving, not
leaving. That is a technique distinction from pure social engineering.

The **200-tx spam flood** (mass-sign prompt of dummy transactions) has no
equivalent in the EVM lineage's public reporting. It weaponizes the wallet
UI itself — the victim clicks "Sign All" because they see 200 transactions
queued and think it's a system action.

---

## Traffic: Telegram vs Discord vs Google Ads

| Kit | Primary traffic source |
|---|---|
| Inferno | Google Ads (high-value target selection), Discord spam, GitHub issue spam |
| Rublevka method | Telegram spam (Russian-language crypto groups), X/Twitter (aged accounts + Blue Checkmark), TDS click_id traffic |
| AngelFerno | X/Twitter automated posting (12+ accounts, 10k–200k followers) |
| Pink | Twitter/Discord |

The Security Alliance's SEAL report documented Inferno's Google Ads abuse
in January 2025 — attackers compromised legitimate ad accounts to run
phishing campaigns with geographic targeting and demographic filtering.
That is a meaningfully higher-quality traffic source than Telegram spam:
the victim is mid-search for a known protocol, not receiving unsolicited DMs.

This kit's Telegram + X approach targets self-selecting crypto audiences but
relies on the victim already being primed (looking for airdrops, following
crypto accounts). The Rublevka X/Twitter tactic — 10 legitimate reposts for
every 1 malicious post — is specifically designed to survive longer on the
platform than Inferno's automated high-frequency posting. Both approaches
have been confirmed at scale (Blockaid: 260+ Rublevka dApp URLs detected).

---

## Ecosystem-level comparison: Solana vs EVM drainer economics

The EVM drainer ecosystem peaked at $494M in 2024, then crashed to $84M
in 2025 (−83%). The causes: Inferno shut down in Nov 2023 (returned), Pink
shut down May 2024, Angel absorbed Inferno Oct 2024, then AngelFerno is
the current heir. The collapse of major kits caused the statistical drop —
the per-kit productivity did not fall.

Solana drainer losses are harder to separate in public statistics because
Scam Sniffer primarily tracks EVM. Recorded Future attributed $8.2M to
Rublevka's Solana campaign alone. The on-chain evidence from this analysis
shows 17,057 SOL + 1.02M USDC in the assessed treasury as of 2026-11-12.
At Nov 2026 prices this is a multi-million dollar operation — small compared
to Inferno's $80M peak, but that comparison flattens the structural difference:
this operation has lower costs (free-tier RPC keys, one domain registration)
and faces fewer blockchain-level countermeasures on Solana than on EVM
(Permit2 revocation, allowance monitoring, NFT blanket approval warning).

**Solana-specific structural advantages:**

1. **No Permit2 revocation.** On EVM, a victim can revoke allowances after
   the fact. On Solana, a completed drain transaction is irreversible with
   no "revoke" step — the program already moved the assets.
2. **One-tx completeness.** EVM drainers need two transactions to complete
   (approve + transferFrom). The window between them gives detection systems
   a chance to intervene. Solana drainers complete in one block.
3. **Token-2022 and stake.** Solana's native stake and Token-2022 token
   classes have no EVM equivalent at comparable scale. This kit explicitly
   targets both — most EVM drainers do not handle equivalent asset classes.
4. **Multi-sig transaction structure.** The 3-signature structure lets the
   operator control the fee payer (treasury) and receiver in one transaction,
   without needing a spender contract on-chain. Inferno deploys a new spender
   contract per campaign; this kit uses one persistent program for all drains.

**Where EVM (Inferno Reloaded) is structurally ahead:**

1. **Single-use contracts.** No persistent program address to pivot on.
   This kit's program address is permanent and the strongest single attribution
   pivot in the entire operation.
2. **On-chain C2 encryption.** Config stored in a BSC transaction. This kit
   stores config server-side — world-readable if you have the AES key (which
   is derivable from the bundle).
3. **Broader chain coverage.** AngelFerno covers EVM + Solana + TRON + XRP.
   This kit is Solana-only.
4. **Lower detection surface from active defender collaboration.** SEAL has
   blocked hundreds of Rublevka C2 domains. The Inferno reloaded BSC-on-chain
   config specifically appeared to respond to SEAL's blocking methodology.
   This kit has not evolved a comparable counter.

---

## What the next generation looks like — and how far behind this kit already is

The table below is a projection grounded in WEAKNESSES.md plus what Inferno
Reloaded already ships as of May 2025:

| Feature | Inferno Reloaded | This kit | Gap |
|---|---|---|---|
| Single-use program/contract | ✓ (EVM) | ✗ (persistent program) | behind |
| On-chain encrypted C2 | ✓ (BSC) | ✗ (server-side AES) | behind |
| Per-deployment bundle variance | partial | ✗ (hash identical across 30+ domains) | behind |
| Server-side balance gate | unknown | ✗ (client-side, bypassable) | behind |
| Receiver rotation | on-chain via config tx | ✓ (server-side push, observed live) | parity |
| Multi-chain | ✓ (100+ EVM) | ✗ (Solana only) | behind |
| Token-2022 / TransferCheckedWithFee | ✗ (EVM, no equivalent) | ✓ | ahead |
| Native stake drain | ✗ (EVM, no equivalent) | ✓ | ahead |
| Affiliate ledger on-chain | ✗ (private) | ✓ but in plaintext — readable by anyone | behind (F6, F19) |
| Copy polish | varies | visible grammar errors (F18) | behind |

The receiver rotation observed live (Nov 11→12) confirms the operator is
actively maintaining the kit — new receivers pushed within 12 hours. But the
bundle hash has not changed in this window. The durable weaknesses (persistent
program address, identical bundle hash, world-readable config, plaintext
affiliate tags) are all things Inferno Reloaded has already fixed on its
side of the EVM/Solana divide.

---

## Summary assessment

This kit is **mid-tier sophisticated for its chain** and **behind the EVM
state of the art** in terms of anti-analysis engineering. Its structural
advantages come from the Solana account model itself (single-tx drain, vault
PDAs, Token-2022 coverage) rather than from kit engineering. Its structural
weaknesses — persistent program, identical bundle hash, world-readable AES key,
plaintext on-chain affiliate tags — are all weaknesses Inferno Reloaded has
directly addressed.

The honest comparison: at peak operation this kit took ~$10M on Solana; Inferno
took $80M on EVM in its first year. The Solana ecosystem is smaller, but Solana
users tend to hold higher-value positions (DeFi, pump.fun tokens, staked SOL),
and there are no Permit2 revocation safety nets. Per-victim yield is likely
higher than the EVM drainers' $590 average (2024 Scam Sniffer data). The
treasury balance — 17,057 SOL + 1.02M USDC held in a single address, still
active as of 2026-11-12 — confirms the operation is profitable and ongoing.
