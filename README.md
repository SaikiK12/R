# Anatomy of a Solana Drainer

An educational research project: a complete map of the **pumpanakin.fun**
JS-Confuser Solana drainer family — how the kit works, how the operation
behind it is built, and how far its sophistication goes. Read it as a
case study in how a modern crypto drainer actually fits together: the
lure, the obfuscated bundle, the operator backend, and the on-chain
machinery.

## Reading order

1. `FORENSIC_REPORT.md` — the main write-up: the bundle, the operator
   API, the payload formats, the drain transactions, live-mapping
   results.
2. `decompiled/kit/README.md` — the end-to-end flow map of the
   reconstructed kit, organized into the three layers as deployed.
3. `INFRASTRUCTURE.md` — the operation's stack: what they needed, what
   it costs them, what changes between deployments.
4. `FAMILY_MAP.md` — 30+ sibling lures run by the same operator, and
   what the more elaborate ones do better.

## Contents

| Path | What it is |
|---|---|
| `FORENSIC_REPORT.md` | The report. One document, corrected against the live bundle |
| `FAMILY_MAP.md` | Sibling lures and the sophistication gradient |
| `INFRASTRUCTURE.md` | The operation's infrastructure and economics |
| `ARCHITECTURE.md` | Pointer at the recovered modules |
| `deobfuscate.py` | The static deobfuscator written for this analysis (strings, constants, global names) |
| `decompiled/` | Decoded tables, the kit reconstruction layered as deployed (`kit/`), and 2026-11-11 live-mapping evidence (`live/`) |

Reproduce the tables from a saved copy of the bundle:

```bash
python3 deobfuscate.py index.js --out-dir decompiled/
```

Requirements: Python 3.9+, no external dependencies.

## Scope

Educational malware analysis. No attacker code was executed: the bundle
was deobfuscated statically, and a handful of small state-machine
functions were emulated in isolation with stubbed browser globals. No
wallet was connected, nothing was signed, no funds were moved. The live
site was mapped on 2026-11-11 with benign requests only — GETs of
public assets/endpoints and the same `POST /api/visit` beacon any page
load sends; the submit endpoints (`/process`, `/c/*`, `/api/handler`)
were never contacted. On-chain data came from public Solana RPCs. The
obfuscated bundle and the operator's program binary are not stored here;
the docs explain how to reproduce everything from your own sample.

This project exists to document and explain an active threat. Nothing
here is a guide to running one.
