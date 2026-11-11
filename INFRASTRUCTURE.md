# Infrastructure: how the operation is built and what it costs

Everything in this file comes from the reference bundle, the live
mapping on 2026-11-11 (`decompiled/live/`), and public pricing for the
services abused. Estimates are marked.

## The stack

| Piece | What they use | What it is | Cost to them |
|---|---|---|---|
| Lure domain | `pumpanakin.fun` (live), `trongame.fun` (retired, in the live config) | `.fun` gTLD, typically $1–3 first year, $10–15 renewal | ~$1–15/domain/yr |
| DNS + CDN + TLS | Cloudflare | Free plan in front of the lure | $0 |
| Lure hosting | Nuxt static build (`/_nuxt/assets/…`) | Any static host (Cloudflare Pages-class free tier is enough) | $0 |
| Operator API | Same host, `/api/*` | Small backend behind the same Cloudflare setup | ~$0–5/mo (any cheap VPS/PaaS free tier) |
| Chain reads | Helius RPC, **4 API keys** embedded in the bundle | Helius free tier keys; one already answers "max usage reached", so they burn free quota and rotate | $0 |
| Chain reads (fallback) | publicnode, magiceden, solanatracker, mainnet-beta | Public free RPCs | $0 |
| Swap quotes | Jupiter API, **5 keys** in the string table | Jupiter's free public API keys | $0 |
| Victim valuation | `wallet-api.solflare.com` | Solflare's free wallet backend, abused to price the victim's holdings before building the drain tx | $0 |
| Traffic | Telegram (`t.me/durov` impersonation), fake "TRUMP COIN" airdrop theme, Russian-language page, en/fr/zh modal locales | Social engineering; price is their time or a traffic seller's cut | varies |
| The kit itself | Watermark `hexfomo.fun` in the string table | Drainer kit vendor. Kits like this are typically rented for a revenue share (commonly ~10–30% on underground markets) rather than bought outright — **assessment, not directly observed** | revenue share |
| On-chain program | `TwrGADB9QPrLfTKpWuyq9tjgRaGsuzgRUMFTz51uhsa` | The operator's own Solana program; the drain transactions call it (discriminators 2/3/4/18) with per-victim "vault" PDAs instead of plain token transfers | rent-exempt SOL only |

**Total fixed cost: effectively a domain registration.** Everything
else is free tiers and abused legitimate services. This is standard for
drainer operations: the margin comes from volume of lured wallets, not
from infrastructure spend.

## Revenue side (observed on-chain, 2026-11-11)

| Wallet | Holds | Note |
|---|---|---|
| `DvTqmF7uMbLaW56QsMvcgv8KSkydFEikuk5gUcjACPV` | **17,057 SOL + 1,020,879 USDC** | string-table address, 133-tx accumulation pattern; assessed treasury |
| `6cwsqBqmRy22Qa2SEuZ8tWrpKoCS9M8S2r8ct8VuqFmj` | 357.5 SOL | string-table, active 2026-11-11 |
| `7VHUFJHWu2CuExkJcJrzhQPJ2oygupTWkL2A2For4BmE` | 125.9 SOL + 34.7 USDC | live-config receiver, active 2026-11-11 |

At any plausible SOL price this is a multi-million-dollar operation.
The 13 hard-coded string-table addresses split into roles: one
treasury, active receivers, drain-through hops (dust balance, high tx
count), and five never-used spares (0 transactions) — the operator
rotates receivers via the live `/api/config` push instead of rebuilding
the kit.

## How a drain works end to end

1. Victim lands on the lure (Telegram/social traffic). The page beacons
   `POST /api/visit` with the campaign `source` (utm/referrer, cached
   in localStorage `_0x6`).
2. The kit checks `GET /api/is-banned`, pulls the fake wallet-modal
   copy (`/api/locales`, en/fr/zh), and values the victim's wallet via
   Solflare's portfolio API.
3. The modal pushes a signature with scare copy ("Transactions are
   reverted. Sign all transactions to verificate your account.", fake
   Trust/Phantom safety notices, refund videos).
4. The victim's SOL amount is validated against the configured range
   (live config: 1.0–500.0 SOL; hard validator cap 0.001–1,000,000).
5. On signature, the kit posts the signed transactions to
   `/api/process` **and** broadcasts them itself over public RPC with
   `skipPreflight: true` after a 2.5 s delay — redundancy in case one
   path fails.
6. `/c/i`, `/c/c`, `/c/f` notify the operator of each stage;
   `/api/handler` ships encrypted telemetry; `/api/config` lets the
   operator rotate receivers and retarget tokens (USDC) without a
   redeploy.

## What changes between deployments (detection pivots)

Sibling lures running this kit will share almost everything. These are
the knobs an operator turns per deployment — read as: what to pivot on
to find the next lure.

| Variable per deployment | Fixed across deployments (pivot on this) |
|---|---|
| Lure domain (`pumpanakin.fun`, `trongame.fun`, …) | Same bundle SHA-256, same Nuxt asset path `/_nuxt/assets/index.js` |
| `apiHost` (usually == lure host) | `/api/visit`, `/api/is-banned`, `/api/locales`, `/api/config`, `/api/handler` route shape and response behavior (`visit` → `ok`) |
| Receivers, pushed live via `/api/config` | AES-GCM format `iv || ciphertext` and the key derivation SHA-256(`apiHost` + `B3ui3QZFrOPoGW7oMZgE4A`) |
| Helius / Jupiter keys (rotated as they burn out) | Four-key Helius failover pattern + the same public RPC fallbacks |
| Hard-coded string-table addresses (only on kit rebuilds) | On-chain program `TwrGADB9QPrLfTKpWuyq9tjgRaGsuzgRUMFTz51uhsa` and treasury `DvTqmF7uMbLaW56QsMvcgv8KSkydFEikuk5gUcjACPV` — shared by the operation, best on-chain pivots |
| Lure theme/copy (here: "TRUMP COIN" airdrop, Russian page) | Fake modal copy in en/fr/zh locales, the 13-entry string-table social-engineering set, `200tx.webm`-style media |
| Kit build (JS-Confuser seed, CJK names) | Obfuscator fingerprint: the 嗛=铴 table-init pattern and CJK identifier density |

The fastest way to surface sibling lures: query public crawlers
(URLScan, crt.sh, Cloudflare Radar) for the Nuxt asset path pattern
plus any of the fixed pivots, and watch the treasury's inbound token
transfers for new funding sources.

