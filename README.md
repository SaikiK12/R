# Solana Drainer Defensive Toolkit

Defensive research artifacts for the **pumpanakin.fun** JS-Confuser Solana drainer family.

## Contents

| File | Purpose |
|---|---|
| `FORENSIC_REPORT.md` | The report. One document, corrected against the live bundle |
| `INFRASTRUCTURE.md` | How the operation is built, what it costs them, takedown paths |
| `ARCHITECTURE.md` | Pointer at the recovered modules |
| `deobfuscate.py` | Static deobfuscator (strings, constants, global names) |
| `decompiled/` | Decoded tables and the kit reconstruction, layered as deployed (`kit/`), plus 2026-11-11 live-mapping evidence (`live/`) |
| `drainer_scan.py` | Python CLI scanner — detects drainer signatures in URLs or JS files |
| `drainer.yar` | YARA rule set for the drainer family |

---

## drainer_scan.py

Static detector. Fetches a URL (or reads a local file) and checks for:

- Known file hashes (SHA-256 exact match)
- JS-Confuser CJK obfuscation markers unique to this build
- Hardcoded Helius / Jupiter API keys
- Attacker Solana receiver addresses
- Social-engineering strings
- Backend endpoint fingerprints (`/c/i`, `/process`, `/api/visit`, …)
- Domain pattern matching

**Exit codes:** `0` clean · `1` suspicious · `2` confirmed drainer

```bash
# Scan a URL
python3 drainer_scan.py https://suspicious-site.example.com

# Scan a local JS file
python3 drainer_scan.py --file bundle.js

# JSON output (for SIEM / pipeline integration)
python3 drainer_scan.py --json https://suspicious-site.example.com

# Multiple targets
python3 drainer_scan.py https://site1.example.com --file local.js
```

Requirements: Python 3.8+, no external dependencies.

---

## drainer.yar

YARA rules covering:

- Exact hash match on the confirmed pumpanakin.fun bundle
- JS-Confuser obfuscation byte patterns (UTF-8 CJK bytes)
- Hardcoded Helius and Jupiter API keys
- Attacker Solana addresses (plain and base64-encoded)
- Social-engineering strings
- Backend endpoint set
- WebM social-engineering video references
- Combined high-confidence rule `SolanadrainerKit_FullMatch`

```bash
# Scan a directory
yara -r drainer.yar /path/to/scan/

# Scan a single file
yara drainer.yar bundle.js
```

Requires: [YARA](https://github.com/VirusTotal/yara) with `--enable-modules=hash` for the hash rule.

---

## Indicators of Compromise

Full catalog: `decompiled/iocs.json` and `FORENSIC_REPORT.md`, including:

- Domains: `pumpanakin.fun` (live), `trongame.fun` (retired sibling), `hexfomo.fun` (kit watermark)
- 13 hard-coded Solana addresses (treasury, receivers, drain-through hops, 5 unused spares) + 2 receivers from the live config push
- Assessed treasury holding 17,057 SOL + 1,020,879 USDC (2026-11-11)
- 4 Helius API keys (all live) + 5 Jupiter API keys
- File SHA-256 hashes
- All backend endpoints, including `/api/handler` and `/api/config`

---

## Scope

Defensive analysis. No attacker code was executed (the bundle was deobfuscated statically; three small state-machine functions were emulated in isolation with stubbed browser globals). No wallet was connected, nothing was signed, no funds were moved. On 2026-11-11 the live site was mapped with benign requests only: GETs of public assets/endpoints and the same `POST /api/visit` beacon any page load sends; the submit endpoints (`/process`, `/c/*`, `/api/handler`) were never contacted. On-chain data came from public Solana RPCs.

This toolkit is intended for defensive security research, threat intelligence, blocklist maintenance, and SOC detection rule authoring.
