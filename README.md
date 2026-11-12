# solana-kit-analysis

Reverse-engineering notes on a JS-Confuser Solana bundle observed in the wild (November 2026). The bundle packs a full Reown AppKit wallet-connection UI, a custom on-chain program, and a multi-layer operator API — all inside a Nuxt static build. The goal here is to understand the whole stack: obfuscation layers, kit modules, on-chain program behavior, backend protocol, and traffic acquisition.

This started as "what does this do" and ended up being a complete reconstruction.

---

## What's here

```
decompiled/          decoded string table, constants, reconstructed modules
  kit/               the drainer code layer by layer
    page/            lure + modal + wallet detection
    operator/        backend API client + telemetry
    chain/           RPC, Solflare, Jupiter, tx builders, stake drain
  live/              live API captures (config blobs, all locales, tx captures)
archive/             raw captured samples — static analysis only
```

Top-level docs:

| File | What it covers |
|---|---|
| `FORENSIC_REPORT.md` | Bundle internals: obfuscation layers, API shapes, payload formats, IOCs |
| `DYNAMIC_ANALYSIS.md` | Sandbox run: popup flow, balance gate, fake dialog, captured drain tx |
| `OPERATOR_ARCHITECTURE.md` | Full stack on one diagram: traffic → lure → connect → backend → chain |
| `LURE_ANALYSIS.md` | HTML obfuscation tricks: zero-width chars, Cyrillic homoglyphs, filler text |
| `INFRASTRUCTURE.md` | Cost model, pivot map, what changes between deployments |
| `FAMILY_MAP.md` | 30+ sibling deployments sharing the same bundle hash |
| `GROWTH.md` | Traffic acquisition: Telegram, TDS, X/Twitter, affiliate machine |
| `FLAWS.md` | 22 weaknesses: OpSec holes, kit engineering gaps, what the next version fixes |
| `COMPARISON.md` | How this kit stacks up against Inferno, Angel, Pink, and the EVM lineage |
| `INDUSTRY_CONTEXT.md` | Ecosystem snapshot: DaaS model, Rublevka Team, StepDrainer DNS hijack |
| `deobfuscate.py` | The static extractor (string table + constants + global name table) |

---

## Reproduce the decode

```bash
python3 deobfuscate.py path/to/index.js --out-dir decompiled/
```

Python 3.9+, no external dependencies.
