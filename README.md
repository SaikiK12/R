# R — Solana Kit Research Repository

This repository holds captured samples, deobfuscated source reconstructions,
on-chain program analysis, live-capture notes, and infrastructure mapping for
a Solana Web3Modal kit tracked through November 2026.

## Repository Layout

```
R/
├── archive/          Raw captured files and reference samples
│   ├── ext/          External reference collections from public sources
│   ├── prog/         On-chain program binaries and analysis
│   ├── s1/           Primary lure domain captures (pumpanakin.fun)
│   ├── s2/           Connect domain captures (easyinvest7.biz)
│   ├── s3/           Connect domain captures (petramon.xyz)
│   └── siblings/     Full sibling-deployment captures (60+ domains)
├── data/             Structured analysis outputs
│   ├── core/         Bundle reconstruction (crypto, state, config, API, chain)
│   ├── live/         Dynamic analysis and runtime observations
│   └── targets/      Per-domain profiling (t1–t47)
└── docs/             Synthesis documents
```

## What Is in This Repository

**One JS bundle** (`index.js`, SHA-256 `0735606691…f9ea6a2`, 1,034,759 bytes)
runs identically across 60+ domains. All captures, reconstructions, and
analysis in this repository trace back to that single artifact.

The bundle is a Drainer-as-a-Service product vendor-branded `hexfomo.fun`.
It uses a Nuxt/AppKit frontend, an AES-GCM encrypted operator API, and a
dedicated on-chain Solana program (`TwrGADB9…`) to execute transactions.
Affiliates deploy lure HTML pages; the bundle and backend infrastructure
are shared and never rebuilt between campaigns.

Key components documented here:

| Area | Summary |
|---|---|
| **Bundle** | JS-Confuser obfuscated, 34,134 lines deobfuscated, version `1.18.4` |
| **Operator API** | 7 endpoints; AES-GCM with key salt `B3ui3QZFrOPoGW7oMZgE4A` |
| **On-chain program** | `TwrGADB9…`, 6 discriminators observed client-side, upgradeable |
| **Sibling domains** | 60+ lure + connect domains sharing the same bundle hash |
| **Campaigns** | Trump COIN airdrop → ClaimFreeSOL fake DEX (pivot confirmed 2026-11-14) |

## Durable Identifiers

These values are hard-coded in the bundle and survive domain rotation:

| Identifier | Value |
|---|---|
| Bundle SHA-256 | `0735606691bbdf35d38d7531c0e48363a21ef6f7224ebce2908a1b487f9ea6a2` |
| Operator program | `TwrGADB9QPrLfTKpWuyq9tjgRaGsuzgRUMFTz51uhsa` |
| Treasury | `DvTqmF7u…` |
| Collector | `6cwsqBqm…` |
| AES key salt | `B3ui3QZFrOPoGW7oMZgE4A` |
| Kit version string | `1.18.4` |
| Helius API keys | 4 keys embedded in bundle string table (see `docs/kit-overview.md`) |

## Key Dates

| Date | Event |
|---|---|
| 2026-11-11 | First capture; treasury balance 17,057 SOL + 1.02M USDC |
| 2026-11-12 | Live dynamic analysis; Lighthouse misattribution corrected; sibling sweep |
| 2026-11-13 | Full deobfuscation run; external reference samples collected |
| 2026-11-14 | Campaign pivot confirmed (Trump COIN → ClaimFreeSOL); re-dump |

## Reading Order

1. `docs/kit-overview.md` — Full system architecture narrative
2. `docs/kit-modules.md` — Per-module reconstruction index
3. `docs/pipeline.md` — Step-by-step transaction flow
4. `docs/frontend.md` — Lure page mechanics and wallet modal analysis
5. `data/core/` — Reconstructed source files
6. `archive/prog/lighthouse.md` — On-chain program notes and corrections
7. `data/gap.md` — Deobfuscation closure log (all open items resolved)
8. `docs/map.md` — Full deployment map across all 60+ domains
