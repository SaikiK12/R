# Research Context — DaaS Ecosystem

Background context on the broader Drainer-as-a-Service ecosystem that the
hexfomo kit operates within.

---

## DaaS Architecture Pattern

Modern Solana drainer kits follow a consistent architecture that emerged
from EVM-chain predecessors (Inferno, Angel, Ethane):

| Layer | Description |
|---|---|
| Vendor | Builds and maintains the core JS bundle and operator backend |
| Affiliates | Deploy lure pages; direct traffic via social posts |
| Operator program | On-chain Solana program; handles token sweeps and SOL splits |
| Config push | `/api/config` AES-GCM blob rotates receiver addresses per campaign |
| Revenue split | On-chain at transaction time; disc 0x15 splits SOL between affiliate and vendor |

The hexfomo kit's revenue split (80% affiliate / 20% vendor per disc 0x15
arg byte `0x50`) matches the standard DaaS commission structure.

---

## Campaign Types Observed

**Airdrop lures**
- Trump COIN airdrop (pre-2026-11-14)
- ClaimFreeSOL free SOL distribution (post-2026-11-14)
- General "wallet cleanup" / "vacant account recovery" (ongoing, multiple domains)

**DEX impersonation**
- FL!pN fake DEX (embedded in ClaimFreeSOL)
- Jupiter impersonator fleet (jup.ag-wc.ink, juphub.ink, etc.)
- Meteora impersonator fleet (meteora.ag-v2.ink, web-meteora.*, etc.)

**DeFi platform impersonation**
- Raydium, Orca, Meteora branding on sibling lures

---

## Traffic Acquisition

Affiliates use:
- X/Twitter posts (observed: `x.com/cfs_foundation` for ClaimFreeSOL campaign)
- Telegram channels and mini-apps (Telegram WebApp integration in bundle)
- TDS (Traffic Distribution Systems) — `_tds_landings/` entries in
  `archive/siblings/` reference `rolldice.icu` and `zkpass` TDS landings
- `utm_source` tracking in `POST /api/visit` enables affiliate-level attribution

---

## Rublevka Traffer Method

The deployment pattern (central bundle + per-affiliate lure pages + on-chain
campaign tag in every transaction) is consistent with the Rublevka traffer
methodology used by Eastern European traffic networks. Key indicators:

- Lure HTML `lang="ru"` on the Trump COIN page
- Locale redirect: `ru-*` and `*-ru` browser languages redirected to solana.com
- `/api/locales` returning 404 for `ru` and `uk`
- Campaign tags in marker instructions are affiliate-specific, allowing per-affiliate
  performance tracking on-chain

---

## EVM Predecessors

The hexfomo kit's architecture evolved from EVM-chain kits:

| Kit | Chain | Relationship |
|---|---|---|
| Inferno | EVM | Same config-driven affiliate model; ABI-encoded transaction manipulation |
| Angel | EVM | Different loader (WASM xz); same affiliate DaaS structure |
| Ethane | EVM | Multichain EVM; same config knobs |

Reference samples: `archive/ext/a2/` (Inferno), `archive/ext/a3/` (Angel).

The key advancement in the hexfomo kit versus EVM predecessors:
- Dedicated on-chain program handles token sweeps (no reliance on
  token approval signatures from the victim)
- Decoy-leg construction makes outer-balance assertions pass
- AppKit / Web3Modal integration provides a polished multi-wallet UX

---

## Cross-References

| Topic | File |
|---|---|
| Full architecture | `docs/kit-overview.md` |
| External reference kits | `archive/ext/README.md` |
| All 60+ sibling domains | `docs/map.md` |
| On-chain program | `data/core/chain/program.md` |
