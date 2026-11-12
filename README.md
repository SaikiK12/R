# Anatomy of a Solana Drainer

An educational research project: a complete map of the **pumpanakin.fun**
JS-Confuser Solana drainer family — how the kit works, how the operation
behind it is built, and how far its sophistication goes. Read it as a
case study in how a modern crypto drainer actually fits together: the
lure, the obfuscated bundle, the operator backend, and the on-chain
machinery.

## Reading order

1. `LURE_ANALYSIS.md` — what the victim sees: the two-layer page trick,
   the decoded pitch dictionary, and the social-engineering playbook
   across the family.
2. `FORENSIC_REPORT.md` — the main write-up: the bundle, the operator
   API, the payload formats, the drain transactions, live-mapping
   results.
3. `OPERATOR_ARCHITECTURE.md` — the whole machine on one page: traffic,
   lure, connect, backend, and on-chain layers, and the design
   principles behind them.
4. `DYNAMIC_ANALYSIS.md` — the kit running live in a sandbox: the
   connect-domain redirect, the balance gate, the fake confirm dialog,
   and a captured drain transaction.
5. `decompiled/kit/README.md` — the end-to-end flow map of the
   reconstructed kit, organized into the three layers as deployed.
6. `INFRASTRUCTURE.md` — the operation's stack: what they needed, what
   it costs them, what changes between deployments.
7. `FAMILY_MAP.md` — 30+ sibling lures run by the same operator, and
   what the more elaborate ones do better.
8. `GROWTH.md` — how they get victims: spam, TDS, aged domains, the
   affiliate machine, the X/Twitter Rublevka campaign, and why there
   is no SEO.
9. `FLAWS.md` — where the operation is weak (22 proven flaws), and what
   the next generation of the kit will probably fix.
10. `INDUSTRY_CONTEXT.md` — where this operation fits in the November
    2026 drainer landscape: the DaaS model, Rublevka Team attribution
    context, the StepDrainer DNS-hijack incident, and wallet-side
    defenses.

## Contents

| Path | What it is |
|---|---|
| `LURE_ANALYSIS.md` | The lure pages as social-engineering case studies |
| `OPERATOR_ARCHITECTURE.md` | The full operator architecture on one page |
| `DYNAMIC_ANALYSIS.md` | The sandboxed live run: redirect, gates, dialogs, captured tx |
| `GROWTH.md` | Traffic acquisition, the X/Twitter Rublevka campaign, and the affiliate machine |
| `FLAWS.md` | Critical review: 22 proven weaknesses + next-gen projection |
| `INDUSTRY_CONTEXT.md` | November 2026 drainer landscape: DaaS model, Rublevka context, StepDrainer DNS hijack |
| `archive/` | Raw samples (bundle, lure HTML, connect app, program ELF, videos) with hashes and provenance — do not execute |
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
here is a guide to running one. The `archive/` directory contains live
malware samples for research verification — do not execute them.
