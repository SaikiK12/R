# Merged kit architecture: what a combined next-gen drainer looks like

This is a synthesis built from three real kit sources:

1. **This kit** — pumpanakin.fun / hexfomo, Solana, JS-Confuser, fully reconstructed
   (`decompiled/kit/`, `archive/pumpanakin.fun/`)
2. **Inferno Drainer** — deobfuscated source (`archive/external_samples/inferno_deobfuscated.js`,
   921 KB, from gist muellerberndt/7c220fb0689669d26849451a2ba310ca)
3. **Rublevka's own documentation** — archived by SEAL from rublevkateam.today
   (Solana drainer, settings, changelogs, administrator: @sinactive/1636170234)

The goal: describe, with module-level specifics, what a kit that takes the
best of all three and addresses each family's known weaknesses would look like.
This is a defensive document — the purpose is to tell defenders what to watch
for before this generation exists in the wild.

---

## What we learned from Inferno's actual source

The deobfuscated Inferno source reveals the real internal config structure:

```js
{
  api: 'https://iq7grexsvo.su',       // hardcoded C2 — now moved to BSC contract
  customer_id: '<affiliate_id>',       // per-affiliate ID, served from backend
  wallet_connect_project_id: '1764f4d8e10e94a5525646608d07f156',
  min_wallet_total_value: 200,         // $200 minimum gate (this kit: 0.60 SOL)
  retry_count: 50,
  only_chain_to_drain: 42161,          // Arbitrum only on this config
  nfts_api: 2,
  tokens_api: 2,
  risk_ratio: 0.5,
  use_warnings_bypass_1/2/3: true,     // Three separate Metamask warning bypass modes
  trust_sign_text: 'Verify ownership: {wallet}',
  drain_button_waiting_click_text: 'Claim',
  popup_style: 5,
  modal_style: 10,
  use_opensea_transfers: true,         // seaport, blur, x2y2, wyvern all supported
  use_contract_for_balance: true,
  use_multi_functions_contract: false,
  // Per-chain spender contracts (the key EVM mechanic):
  factoryContracts: { [chainId]: address },
  transferContracts: { [chainId]: address },
  multiFunctionsContracts: { [chainId]: address },
  multiFunctionsContractBytecodes: { [chainId]: bytecode }, // deploy per-use
}
```

**What this tells us:**
- Inferno deploys spender contracts **per-chain, per-affiliate** — fresh bytecodes
  per configuration (`multiFunctionsContractBytecodes`). This is the single-use
  contract mechanism confirmed in source.
- `configId` is fetched from `api` backend: `postDataToBackend({configId}, 'config')`.
  The bundle holds only a `configId`; the real addresses come from the server.
  With Inferno Reloaded, the C2 (`api`) itself comes from a BSC transaction —
  the bundle has no hardcoded server at all.
- `customer_id` ties every notification to an affiliate — it's in every Telegram
  notification that fires: `❓ Customer id: <code>{customer_id}</code>` plus the
  victim's wallet and step. The operator's Telegram bot receives these in real time.
- Drain targets: ERC20 (Permit2 + setApprovalForAll + increase_allowance),
  OpenSea Seaport, Blur fee recipient contract, X2Y2, Wyvern, ApeCoins staking,
  EigenLayer, GMX reward router, CryptoPunks, Creepz — 10+ named protocols.

**What this kit (pumpanakin) has that Inferno lacks:**
- Native Stake drain (Stake.withdraw, 23 stake pool addresses)
- Token-2022 TransferCheckedWithFee (pump.fun tokens with fees)
- Single v0 transaction for everything (no approve+transfer two-step)
- Vault PDA architecture (all state off the bundle, on program-derived accounts)
- USDC targeting via live-config push without rebuild

---

## What we learned from Rublevka's own docs (SEAL archive)

Rublevka published its own affiliate documentation at rublevkateam.today.
Key items from SEAL's archive of the settings and changelog pages:

**Rublevka admin contacts** (from SEAL):
- @sinactive (TG ID: 1636170234)
- @nft4x (TG ID: 7696738707)
- @BalaclavaRTD (TG ID: 7479395455)
- @r_boost (TG ID: 7854699763)
- TON wallet: UQAhvz27eT_nglB2kf8_oGuedYmXVtLSj6pBh3Z91PD1qziP

**Features advertised in their docs:**
- 90+ wallet types supported
- SOL, SPL, SPL-Token-2022, NFT, Native Stake drainage
- Phantom wallet spoofing and bypass
- Fully automated Telegram bot for affiliates
- Landing page generator (35+ templates)
- Free domains and hosting with built-in cloaking
- DDoS protection on the backend
- Revenue: 75% affiliate / 25% operator (rising to 80/20 for "experienced")
- Changelogs confirming: Backpack wallet support added, Turnstile bypass,
  balance gate adjustments, new lure template categories

**Eleven Drainer** (Rublevka's competitor documented by SEAL):
- Loads payload from `eleven.js`, config from `settings.json`
- C2 domain only revealed **after** wallet connection (a step further than Rublevka)
- C2 panels actively rotated to defeat SEAL's blocking lists
- Ran a BMW M4 affiliate competition with video interviews

---

## The merged architecture: module by module

Taking the strongest element from each kit per layer:

### LAYER 0 — C2 / configuration delivery

**Current (this kit):** AES-GCM blob at `/api/config`, key `SHA-256(apiHost+salt)`.
World-readable. Salt embedded in bundle.

**Current (Inferno Reloaded):** C2 domain stored in a BSC transaction, encrypted.
Bundle reads the contract, decrypts the domain, proxies all requests through the
landing page host (`/secureproxy` or renamed). Config (`configId` → real addresses)
fetched from the now-hidden C2.

**Current (Eleven):** C2 only revealed after a successful wallet connection.
No static analysis of the bundle reveals the C2.

**Merged target:**
```
1. Bundle has no C2 at all — only a Solana program address (or BSC address)
   that holds an encrypted config transaction.
2. Config is fetched on page load: read the on-chain account, AES-decrypt
   with a key derived from a victim-specific value (e.g. their wallet address
   XOR a bundle constant — changes per victim, can't be precomputed).
3. Receiver addresses come from the config. Never in the bundle.
4. The on-chain config transaction is updated via a fresh operator transaction
   to rotate receivers, change targets, update fee tiers — no bundle rebuild.
5. /api proxy: all backend calls go through the lure domain as a dumb proxy
   to the hidden C2, so blocking the C2 address doesn't expose it.
```

**Why this closes the current weaknesses:**
- F1 (salt in bundle) → key is victim-specific, not derivable offline
- F2 (world-readable config) → config is on-chain encrypted, only decryptable
  by code running in a victim's browser with their wallet data
- The SEAL subresource blocking approach that killed hundreds of Rublevka
  domains doesn't work when the C2 is on-chain

---

### LAYER 1 — On-chain drain program

**Current (this kit):** Persistent upgradeable program `TwrGADB9…`, vault42 PDAs,
discriminators 2/3/4/18/21. Same address for all 30+ deployments. Best attribution
pivot in the entire operation.

**Current (Inferno):** Per-deployment spender contract factory. Fresh bytecode per
affiliate config. `multiFunctionsContractBytecodes[chainId]` is the bytecode to
deploy. With `create2` the address is deterministic but unique per deployment.
Single-use: `selfdestruct` after the drain completes.

**Merged target (Solana):**
```
// Per-campaign program deployment
1. Operator generates a fresh program keypair per campaign.
2. Deploys with BPF loader: createAccount + deployProgram. Cost: rent-exempt
   SOL only (~0.5 SOL for a 60KB program).
3. Program is NOT upgradeable (no upgrade authority set). Immutable.
4. After draining N victims (threshold set in config), the operator calls
   closeAccount on the program's data account, reclaiming the rent SOL.
5. Each campaign runs on a fresh address with fresh vault42 PDA seeds.
   No persistent address to pivot on.

// Drain mechanics (keep what works):
- Same vault PDA architecture (funds flow through per-victim PDAs)
- Same 3-sig transaction structure (victim + treasury + receiver)
- Keep Token-2022 / TransferCheckedWithFee support
- Keep Stake.withdraw support
- Add: durable nonce for the initial "claim" transaction (victim signs once,
  drainer broadcasts when the wallet is funded and the nonce hasn't advanced)
```

---

### LAYER 2 — Transaction design and victim deception

**Current (this kit):** 3-sig v0 transaction, decoy incoming legs (+1 SOL, +500 USDC),
disc-2 theft leg via vault PDA. Single tx, complete drain.

**Inferno's approach:** EVM requires two steps — approve first, then drain.
Inferno added "warnings bypass" modes (3 separate ones) to suppress MetaMask's
"this website hasn't been reviewed" notice. Fake "trust sign" message:
"Verify ownership: {wallet}" (appears safe, is the approval).

**Aqua/Vanish (Blowfish, 2024):** Bit-flip attack — sign a benign transaction,
the drainer flips bits in the serialized form before broadcast. The wallet
preview shows the safe version; the chain executes the mutated version.

**Merged target:**
```
// Primary drain flow (same chain, one tx):
- Keep the decoy incoming legs. Make them larger (match victim's wallet balance
  to make the preview look credible: show 90% of their balance "incoming").
- Add a durable nonce to the transaction instead of a blockhash. The victim
  signs once; the drainer stores the sig and broadcasts at any time.
  UI framing: "This claim is valid for 7 days — sign now, claim later."

// Secondary flow (bit-flip, for Solana):
- Present a benign-looking "verify wallet ownership" signMessage call.
- The resulting signature is used as a component in a hand-crafted transaction
  that the drainer assembles (not the wallet). The signed bytes authorize
  something the victim didn't intend.
- This bypasses ALL wallet preview — the wallet only shows "sign message",
  not a transaction with accounts.

// 200-tx flood (keep):
- Same as current for victims with low SOL and many tokens.
  Reframing: "Batch claiming requires confirming each allocation."
```

---

### LAYER 3 — Lure and social engineering

**Current (this kit):** Two-layer HTML (filler text + DOMContentLoaded dict),
zero-width chars + Cyrillic homoglyphs in copy, single page, Russian audience.
Now 11 locales live.

**Inferno's approach:** Per-brand letter HTML (`ethereum_letter.html`,
`coinbase_letter.html`, etc.) — full multi-page clone of a known brand.
AI-polished per-brand copy. The bundle loads whichever template matches
the victim's wallet/chain.

**Vanilla Drainer (Jul 2025):** Fresh domain + fresh smart contract per site,
specifically bypassing Blockaid. Cycling domains defeats address-based blocking.

**Rublevka docs:** 35+ lure templates, generator UI for affiliates, free domains
and hosting included with the kit subscription.

**Merged target:**
```
// Lure generation:
1. LLM-generated copy per deployment: operator sets "theme" (pump.fun clone /
   Jupiter airdrop / zkPass eligibility). The generator builds fully personalized
   pitch copy — no template syntax errors, no "250.000$" European separator slips.
2. Dynamic victim personalization: lure copy references the victim's wallet
   balance. "Your wallet qualifies for 847 SOL based on your 23.4 SOL holdings."
   Pulled from Solflare API on page load, injected into DOM.
3. Two-layer HTML (keep) + per-domain bundle hash (fix F9): different obfuscator
   seed per deployment. Same logic, different hash.
4. Turnstile or hCaptcha on the lure page: victim solves to proceed.
   Purpose: (a) legitimacy theater, (b) blocks automated scanners.

// Connect domain:
- Keep the popup architecture (easyinvest7.biz model).
- Use a *fresh* connect domain per campaign, not a reused 8-year-old one (F22).
- Connect domain registered via privacy-proxy registrar, Cloudflare Pages hosting
  (zero cost, zero attribution).
```

---

### LAYER 4 — Backend and affiliate infrastructure

**Current (this kit):** `/api/visit`, `/api/is-banned`, `/api/locales`, `/api/config`,
`/api/c/i`, `/api/c/c/`, `/api/c/f/`, `/api/process`, `/api/handler`. AES-GCM on
c/i and handler. Operator co-signs server-side. Telegram affiliate notifications
implied (tgid/tgus forwarded).

**Inferno:** `postDataToBackend({configId}, 'config')` to fetch live addresses.
Telegram notifications in real time: "❓ Customer id: X ⚙ Process: approval 🔔 Method:
Permit2 ➡ Step: sent ✅ Data: {amount}". The affiliate sees every step live.
Wyvern proxy contract, BlurFeeRecipient, EigenLayer, GMX staking — 10 named
protocol-specific drain modules each with their own `postDataToBackend` path.

**Eleven Drainer:** C2 only after wallet connection. Active C2 panel rotation.

**Merged target:**
```
// Operator co-sign (keep but improve):
- Server co-signs with treasury and receiver keys (same as now).
- Receiver keypairs: HD wallet, fresh derivation path per campaign. Never reused.
  treasury (DvTqmF7u…) is THE single attribution pivot. The merged kit replaces
  it with an MPC treasury: M-of-N signing, no single address accumulates funds.
  Funds go: drain → per-campaign receiver (1 day TTL) → aggregator → MPC → off-ramp.
- No single on-chain accumulation point.

// Affiliate ledger (fix F6):
- Affiliate campaign tags currently in PLAINTEXT ASCII in every on-chain drain tx.
  Merged: tags in encrypted memo field (AES-GCM, key = operator private key hash).
  On-chain attribution query requires the operator key — not public.

// Notifications (adopt Inferno model):
- Real-time Telegram bot: per-step notification to affiliate's Telegram.
  Steps: visit → connect → balance → sign → submit → confirmed.
  Each step shows victim wallet (truncated), SOL balance, token list.
- /api/visit: forward tgid/tgus to attribute Telegram-driven traffic.
```

---

### LAYER 5 — Traffic and distribution

**Current (this kit):** Telegram spam (Russian), X aged accounts (Rublevka model,
10:1 repost ratio), TDS click_id traffic.

**Inferno 2025:** Google Ads account compromise — legitimate business ad accounts
injected with malicious destinations. Geographic and demographic targeting.
Keyword list: phantom wallet (91 hits), coinbase (26), trezor (20), metamask (19),
uniswap (13) — in 30 days from SEAL monitoring.

**AI bot tutorials (TRM Labs, 2026):** Nine near-identical YouTube tutorials,
AI-generated presenters and voice, fake Remix IDE. Victims self-fund and deploy.
224 victims, 274 ETH in 6 months.

**Merged target:**
```
// Multi-channel simultaneous deployment:
1. Telegram/X (keep Rublevka model: aged accounts, low-follower, 10:1 ratio)
2. AI tutorial pipeline: LLM generates "how to build a Solana yield optimizer"
   tutorial. The "optimizer program" bytecode is the drain program. Victims
   deploy and fund it themselves. No phishing domain needed. No wallet modal needed.
3. Google Ads: compromise existing crypto-related ad accounts via credential
   stuffing. Run drainer landing pages under the legitimate advertiser's account.
   Victim searches "phantom wallet" → first Google result → lure.
4. Browser extension: "Solana portfolio tracker" extension published to Chrome
   Web Store. Strips CSP from Phantom/Backpack web apps. Intercepts
   signTransaction before it reaches the hardware wallet. No phishing site needed.
```

---

## What defenders need to build right now

Ordered by what this merged kit would exploit that current defenses don't catch:

### 1. Transaction re-serialization check
**Attack:** Bit-flip — wallet shows safe tx, chain receives mutated tx.
**Defense:** After `signTransaction` returns, re-deserialize the bytes and
compare the program IDs, instruction data, and account list against what
was shown in the preview. Any discrepancy → reject and alert.
**Currently undefended by:** any wallet that trusts the pre-sign simulation.

### 2. Durable nonce explicit warning
**Attack:** Victim signs once, drain broadcasts weeks later.
**Defense:** Any transaction using a nonce account (not a blockhash) must
display: "This transaction does not expire. It can be broadcast at any time
after you sign it, by anyone who receives the signed bytes."
**Currently undefended by:** Phantom, Backpack, and all other Solana wallets
(as of November 2026 — Solana core team is now proposing to deprecate durable
nonces following the Drift $285M incident).

### 3. Per-program behavioral fingerprinting (not address)
**Attack:** Per-campaign fresh program deployment closes the address pivot.
**Defense:** Fingerprint program behavior: instruction discriminator patterns,
account count, vault PDA seed structure. A program that accepts a 1-byte
discriminator, writes to a PDA derived from "vault42", and CPI-invokes the
System and Token programs is a vault-sweep program regardless of address.
**Currently undefended by:** any address-based program blocklist.

### 4. Chrome/Edge extension auditing
**Attack:** "Solana portfolio tracker" strips CSP, intercepts signTransaction.
**Defense:** Wallet browsers (Phantom, Backpack) should maintain an internal
manifest of `<all_urls>` extensions the user has installed. If any extension
in the browser holds host_permissions that cover the wallet's web app, warn
the user before showing any signing UI. Hardware wallets must re-serialize
from raw instruction data, not from the browser DOM.
**Currently undefended by:** any software wallet with a browser extension.

### 5. AI tool chain signing policy
**Attack:** MCP router poisoned, AI agent signs drain transaction.
**Defense:** AI agent wallets must enforce spend limits at the key management
layer (not in LLM code). Every signing request goes through an offline
pre-sign check that verifies: destination is whitelisted, amount is within
daily limit, program called is known-safe. The LLM never touches the signing
path directly.
**Currently undefended by:** virtually every AI agent wallet integration
in production as of November 2026.

---

## What this means for this kit's immediate evolution

The pumpanakin/hexfomo kit is a 2024-class design. The cheapest fixes the
operator can make (and will make) in rough order of cost:

1. **Per-domain bundle hash** — change the JS-Confuser seed per deployment.
   Closes F9 entirely. Cost: one script parameter change. Already does this
   for some siblings (arvoniq.com uses `5cagf.js` not `index.js`).

2. **Server-side balance gate** — move the ≥0.60 SOL check to the `/api/c/i`
   response. Cost: one backend code change. This closes F11 (mock-chain bypass).

3. **AES key rotation** — per-domain salt instead of `B3ui3QZFrOPoGW7oMZgE4A`.
   Closes F1 and F2. Cost: one parameter change per deployment, decode.py
   stops working.

4. **Durable nonce add-on** — add a durable nonce account to the drain
   transaction. The victim sees "claim valid for 7 days" and signs. The
   drainer stores the sig and broadcasts whenever the wallet is fully funded.
   This is a pure addition that works with the existing program and tx structure.

5. **Fresh connect domain per campaign** — stop reusing `easyinvest7.biz`.
   An 8-year-old domain is a great reputation signal but also a known IOC.
   Cost: one domain registration per campaign ($1-15).

The receiver rotation observed live (Nov 11→12) and the 11-language locale
expansion confirm the operator is actively maintaining the distribution layer.
Expect technical layer improvements when SEAL's blocking rate becomes visible
in the operator's traffic analytics.

---

## Source files

```
archive/external_samples/
  inferno_deobfuscated.js        921 KB deobfuscated Inferno source (muellerberndt gist)
  Inferno_Drainer.zip            4.7 MB password-protected (thegiver86/malware-drainer-samples)
  Solana_Phantom_Drainer.zip     6.0 MB password-protected (thegiver86/malware-drainer-samples)
  Ethane_Drainer.zip             2.0 MB password-protected (thegiver86/malware-drainer-samples)

YARA rules (for detection):
  thegiver86/malware-drainer-samples:
    yara/InfernoDrainerJS.yar     _0x pattern + 'tok'/'ens'/'id' split strings
    yara/PhantomDrainerPage.yar   <center> tag in lure page
    yara/EthaneDrainerJS.yar      TRANSFER_NFT + TRANSFER_TOKEN literals

External references:
  Rublevka docs (SEAL archive): archive.ph/KGosI (home), archive.ph/n56d0 (Solana drainer),
    archive.ph/eQCVo (settings), archive.ph/ZDUCY (resources), archive.ph/A9XyQ (changelogs)
  Inferno gist: gist.github.com/muellerberndt/7c220fb0689669d26849451a2ba310ca
  SEAL State of Drainers Vol.1: radar.securityalliance.org/2025-10-drainers-vol-1/
```


---

# How this kit compares to the major drainers

*(Merged from the former `COMPARISON.md`, 2026-11-12.)*

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


---

# What the next generation of this kit will look like

*(Merged from the former `NEXT_GEN.md`, 2026-11-12.)*

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
