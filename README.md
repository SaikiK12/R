# Solana Drainer Defensive Toolkit

Defensive research artifacts for the **pumpanakin.fun** JS-Confuser Solana drainer family.

## Contents

| File | Purpose |
|---|---|
| `FORENSIC_REPORT.md` | Full forensic analysis of the drainer kit |
| `ARCHITECTURE.md` | Kit layout. Section 5 is corrected against the decompilation |
| `deobfuscate.py` | Static deobfuscator (strings, constants, global names) |
| `decompiled/` | Decoded tables and a readable reconstruction of the kit logic |
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

See `FORENSIC_REPORT.md` §11 for the full IOC catalog, including:

- Domain: `pumpanakin.fun`
- 13 attacker Solana addresses
- 4 Helius API keys + 5 Jupiter API keys
- 4 file SHA-256 hashes
- All backend endpoints

---

## Scope

**Static analysis only.** No attacker code was executed. No funds were moved. No POST requests were sent to attacker infrastructure during research.

This toolkit is intended for defensive security research, threat intelligence, blocklist maintenance, and SOC detection rule authoring.
