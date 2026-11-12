# R — reverse-engineering notes on the pumpanakin.fun drainer kit

Educational analysis of a live Solana drainer operation (the
pumpanakin.fun / hexfomo kit and its sibling lures), built from the
kit's own files, decrypted server responses, and live harness runs
against a zero-balance burner. Nothing in this repo runs the scam;
it documents how the scam works so it can be detected and disrupted.

**Start here:** `DRAIN_PIPELINE.md` — the whole operation end to end,
all of it proven by artifacts in this repo.

## Documents

| File | What it covers |
|---|---|
| `DRAIN_PIPELINE.md` | The kill chain, every file/service they use, both proven transaction shapes, design principles |
| `DEPLOYMENT_MAP.md` | The 30+ sibling lures, sophistication gradient, infrastructure and cost, per-deployment pivots |
| `BUNDLE_ANALYSIS.md` | The obfuscated kit bundle: structure, string table, module map |
| `FRONTEND_LAYER.md` | The lure pages as social engineering: filler text, homoglyphs, dictionary swap, per-lure tricks |
| `WEAKNESSES.md` | F1–F22: where the operation is weak, with live re-verification and corrections |
| `ECOSYSTEM.md` | Industry context (DaaS, Rublevka method, StepDrainer) + distribution channels and the affiliate machine |
| `MERGED_KIT.md` | Cross-kit analysis: Inferno/Rublevka/this kit compared, synthesized, and projected next generation |

## Evidence and reconstructions

| Path | Contents |
|---|---|
| `decompiled/kit/` | The kit reconstructed into readable modules (page / operator / chain layers) |
| `decompiled/live/` | Live evidence: decrypted configs for all hosts, 14 locales, runtime maps, backend diff, watch log |
| `decompiled/live/dynamic/` | Captured drain transactions (SOL + token paths, decoded), 7 decrypted telemetry events, 6 real victim drains decoded, screenshots |
| `decompiled/iocs.json` | Machine-readable indicators: domains, keys, addresses, split mechanic, fingerprints |
| `archive/` | Raw captures: reference bundle, lure HTML, connect shells (easyinvest7.biz, petramon.xyz), sibling pages, on-chain program ELF, external samples |
| `decode.py` | The string/constant decoder. `python3 decode.py archive/pumpanakin.fun/index.js --out-dir /tmp/out` |
| `scripts/monitor.js` | Drift watcher (GET-only): bundle hash, config decrypt, locales, DNS. Appends to `decompiled/live/watch_log.jsonl` |

## What "complete" means here

- **Client side: 100%.** The bundle is archived byte-for-byte and fully
  deobfuscated into modules; every live lure's page is archived.
- **Public API: 100%.** Every GET endpoint enumerated, all 18 kit
  hosts' configs decrypted (one shared plaintext), all 14 locale sets
  saved, telemetry format decrypted and 7 live events decoded.
- **POST/victim endpoints: formats documented, never triggered by us.**
  `/c/i`, `/c/c`, `/c/f`, `/api/process` require a wallet signature
  stage we do not cross. In eight driven flows only `/api/handler`
  fired; the `/c/*` endpoints did not fire on any reproduced path.
- **Server code: not obtainable** (lives on their hosts). Behavior is
  reconstructed from client requests, decrypted responses, and
  on-chain evidence.

Boundaries kept throughout: no transaction or message was ever signed,
nothing was ever submitted to `/api/process` or broadcast, and the
harness wallet holds zero funds.
