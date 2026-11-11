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

## Takedown / disruption paths

- **Helius**: all four embedded keys are live (three serving, one
  rate-limited). Abuse report with the key IDs gets them revoked;
  the kit loses its primary RPC path.
- **Jupiter**: five keys in `decompiled/iocs.json`.
- **Cloudflare / registrar**: `pumpanakin.fun` phishing report.
- **On-chain**: flag the treasury and receivers on Chainabuse /
  block explorer phishing registries; exchanges can freeze off-ramps.
- **Detection**: `drainer.yar` + `drainer_scan.py` catch the raw bundle
  by hash and obfuscation pattern.
