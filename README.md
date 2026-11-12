# solana-kit-analysis

Reverse-engineering notes on a JS-Confuser Solana bundle observed in the wild (November 2026). The bundle packs a full Reown AppKit wallet-connection UI, a custom on-chain program, and a multi-layer operator API — all inside a Nuxt static build. The goal: understand the whole stack end to end — obfuscation layers, reconstructed modules, on-chain program behavior, backend protocol, traffic acquisition, and how it compares to other kits in the same space.

---

## Layout

```
decompiled/
  kit/
    page/        lure rendering, modal, wallet detection, Telegram, mobile
    operator/    backend API client, telemetry, AES-GCM payloads
    chain/       RPC, Solflare, Jupiter, tx builders, Token-2022, stake
  live/          captured API responses: config blobs, all locales, tx captures
archive/         static samples — offline analysis only
```

| File | Contents |
|---|---|
| `BUNDLE_ANALYSIS.md` | Obfuscation layers, API wire formats, payload layouts, IOCs |
| `RUNTIME_ANALYSIS.md` | Sandbox run: popup flow, balance gate, confirmed dialog, captured tx |
| `SYSTEM_OVERVIEW.md` | Full stack diagram: traffic → frontend → connect → backend → chain |
| `FRONTEND_LAYER.md` | HTML obfuscation: zero-width, homoglyphs, filler injection, social engineering |
| `STACK.md` | Cost model, free-tier abuse, pivot map, rotation mechanics |
| `DEPLOYMENT_MAP.md` | 30+ sibling deployments on the same bundle hash, sophistication gradient |
| `DISTRIBUTION.md` | Traffic: Telegram, TDS, X/Twitter aged accounts, affiliate machine |
| `WEAKNESSES.md` | 22 engineering and OpSec gaps; what the next build fixes |
| `COMPARISON.md` | Head-to-head vs Inferno, Angel, Pink, AngelFerno — where it leads, where it lags |
| `NEXT_GEN.md` | 7 confirmed new techniques (T1–T7) from 2024–2026 + projected next architecture |
| `MERGED_KIT.md` | Real-source synthesis: Inferno deobfuscated + Rublevka docs + this kit — merged architecture |
| `ECOSYSTEM.md` | Ecosystem context: DaaS economics, Rublevka Team, StepDrainer DNS hijack |
| `MODULES.md` | Module index pointer |
| `decode.py` | Static extractor: string table, constants, global name mappings |

---

## Reproduce the decode

```bash
python3 decode.py path/to/index.js --out-dir decompiled/
```

Python 3.9+, no external dependencies.
