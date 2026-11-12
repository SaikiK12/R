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
