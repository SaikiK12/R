#!/usr/bin/env python3
"""
drainer_scan.py - Static detector for JS-Confuser Solana drainer kits
                  (pumpanakin.fun family and variants)

Usage:
    python3 drainer_scan.py <url_or_file> [url_or_file ...]
    python3 drainer_scan.py --url https://example.com
    python3 drainer_scan.py --file suspicious.js

Returns exit code 0 if clean, 1 if suspicious, 2 if confirmed drainer.
"""

import sys
import re
import json
import hashlib
import argparse
import urllib.request
import urllib.error
import html
from typing import Optional


# ──────────────────────────────────────────────────────────────────────────────
# SIGNATURES
# ──────────────────────────────────────────────────────────────────────────────

# Known bad domains (confirmed drainers)
KNOWN_DOMAINS = {
    "pumpanakin.fun",
    "hexfomo.fun",
    "trongame.fun",  # sibling lure, from live /api/config 2026-11-11
    "reactwalletback.com",
    "ru.reactwalletback.com",
    "nulltrace.app",
    "onlybulls.com",
    "dlicom.me",
}

# JS-Confuser CJK obfuscation markers (specific to this kit)
OBFUSCATION_MARKERS = [
    # Encoded string table initialisation pattern unique to this JS-Confuser build
    r'嗛=铴\(\[',
    # String accessor function
    r'function 娨\(',
    # Constant-flattening bootstrap
    r'峟\(',
    # CJK identifier density: 5+ CJK chars in a 20-char window
    r'[一-鿿]{5,}',
]

# Helius API keys embedded in this drainer
HELIUS_API_KEYS = {
    "0b9f580f-8102-4b89-928b-8770a62771f0",
    "2dfa2086-c6cd-4cb4-8a13-08ecdee36a0f",
    "3a1ca16d-e181-4755-9fe7-eac27579b48c",
    "777d85c0-fefd-42a0-b290-8b1b3704fe90",
}

# Jupiter API keys
JUPITER_API_KEYS = {
    "cc0769f7-ceba-4abf-83d8-e7c083921665",
    "5f1f45eb-a550-4e95-ad0e-b26e6ec0702d",
    "a4ed32be-dcdf-4702-aba0-aee15c512427",
    "f707107a-6d56-4626-a937-ef3c7eef51d8",
    "ab060a03-7874-4647-84d1-da019e4b51ea",
}

# Receiver / attacker-controlled Solana addresses
ATTACKER_ADDRESSES = {
    # Main receiver addresses (decoded from base64 in string table)
    "6cwsqBqmRy22Qa2SEuZ8tWrpKoCS9M8S2r8ct8VuqFmj",
    "4QFiKg8ejx5LfqqLNbnKsiCnbEgRtgakBF6abMrkquKW",
    # Direct addresses in string table
    "DvTqmF7uMbLaW56QsMvcgv8KSkydFEikuk5gUcjACPV",
    "4cfdFcVuJf8PPXpMWPMCDehSE4gV4C8oYwpZnLra7rtW",
    "TwrGADB9QPrLfTKpWuyq9tjgRaGsuzgRUMFTz51uhsa",
    "syspv6Qe5BbK8GPEjLbMnmF9hZy7juAuePbuspciCFP",
    "A5chdzL3UMQZBqBRdXFFCT9HTK7JZs6h4TEYVCQLQydo",
    # "Target accounts" (operator wallets)
    "6ugBBLhRJqsuB1H4G6rGBMCyMWjdFpvpEUKnp6XCB1t7",
    "9piPeQWJ7wxGmsWieeJhQKJ13DjJLga9j8CE5ydLTHC6",
    "6ARSYR2B1aPWSjK11ZXDPmApgLgar3bCrm2BTYGS2jBK",
    "4qti6FcMybVSLL2k4rqRQ3Ph1a2jGrzPmBN8Wmt4A5wr",
    "HsVYhMDQRf6CkjtdUzqNDNRfDwsgw9nAX8feLVC3TAGp",
    "4moJ9mfFDqFgGMp5UJUgcVhAaFtBxiapt9DVJE3LcVao",
    # Live-config receivers (decrypted /api/config, 2026-11-11)
    "7VHUFJHWu2CuExkJcJrzhQPJ2oygupTWkL2A2For4BmE",
    "3emsAVdmGKERbHjmGfQ6oZ1e35dkf5iYcS6U4CPKFVaa",
    # USDC associated token account of the live-config receiver
    "4kokFKCFMxpCpG41yLYkLEqXW8g1WPfCt2NC9KGivY6N",
}

# Social-engineering strings unique to this drainer family
SE_STRINGS = [
    "Sign all transactions to verificate your account",
    "Transaction was reverted, funds will be refunded soon",
    "This DApp uses Abuse Protection to prevent misuse",
    "This app is recognized as safe",
    "hasn't been reviewed by Phantom yet, but it is listed in trusted community",
    "uses a new, optimized transaction delivery method that is not yet displayed correctly in Phantom",
]

# Backend endpoint fingerprints (relative paths used in XHR/fetch)
ENDPOINT_PATTERNS = [
    r'["\']\/c\/i["\']',
    r'["\']\/c\/c\/["\']',
    r'["\']\/c\/f\/["\']',
    r'["\']\/api\/visit["\']',
    r'["\']\/api\/handler["\']',
    r'["\']\/process["\']',
    r'["\']\/is-banned["\']',
]

# Known file hashes (SHA-256) for exact matches
KNOWN_HASHES = {
    "0735606691bbdf35d38d7531c0e48363a21ef6f7224ebce2908a1b487f9ea6a2": "pumpanakin.fun index.js (drainer bundle)",
}


# ──────────────────────────────────────────────────────────────────────────────
# SCORING
# ──────────────────────────────────────────────────────────────────────────────

class Finding:
    def __init__(self, severity: str, category: str, detail: str):
        self.severity = severity  # "critical" | "high" | "medium" | "info"
        self.category = category
        self.detail = detail

    def __str__(self):
        return f"[{self.severity.upper():8s}] [{self.category}] {self.detail}"


SEVERITY_WEIGHT = {"critical": 100, "high": 20, "medium": 5, "info": 1}


def score_findings(findings: list) -> int:
    return sum(SEVERITY_WEIGHT.get(f.severity, 0) for f in findings)


# ──────────────────────────────────────────────────────────────────────────────
# ANALYSIS
# ──────────────────────────────────────────────────────────────────────────────

def analyse_js(content: str, source: str) -> list:
    findings = []

    # Known kit domains, including when they appear inside a JS file rather than the URL.
    for domain in KNOWN_DOMAINS:
        if domain in content:
            findings.append(Finding("critical", "known-domain",
                f"Known kit domain in content: {domain}"))

    sha256 = hashlib.sha256(content.encode("utf-8", errors="replace")).hexdigest()
    if sha256 in KNOWN_HASHES:
        findings.append(Finding("critical", "hash-match",
            f"SHA-256 matches known drainer: {KNOWN_HASHES[sha256]}"))
        return findings  # definitive; skip further checks

    # Obfuscation markers
    cjk_hits = 0
    for marker in OBFUSCATION_MARKERS:
        if re.search(marker, content):
            cjk_hits += 1
    if cjk_hits >= 2:
        findings.append(Finding("high", "obfuscation",
            f"{cjk_hits}/{len(OBFUSCATION_MARKERS)} JS-Confuser CJK obfuscation markers present"))

    # Helius API keys
    for key in HELIUS_API_KEYS:
        if key in content:
            findings.append(Finding("critical", "api-key",
                f"Helius RPC API key hardcoded: {key[:8]}…"))

    # Jupiter API keys
    for key in JUPITER_API_KEYS:
        if key in content:
            findings.append(Finding("critical", "api-key",
                f"Jupiter API key hardcoded: {key[:8]}…"))

    # Attacker addresses
    for addr in ATTACKER_ADDRESSES:
        if addr in content:
            findings.append(Finding("critical", "attacker-address",
                f"Known attacker Solana address: {addr[:12]}…{addr[-6:]}"))

    # Social-engineering strings
    for se in SE_STRINGS:
        if se in content:
            findings.append(Finding("high", "social-engineering",
                f"SE string: {se[:60]}"))

    # Backend endpoint fingerprints
    ep_hits = 0
    for pat in ENDPOINT_PATTERNS:
        if re.search(pat, content):
            ep_hits += 1
    if ep_hits >= 3:
        findings.append(Finding("high", "endpoint-fingerprint",
            f"{ep_hits}/{len(ENDPOINT_PATTERNS)} drainer backend endpoints present (/c/i, /process, /api/visit…)"))

    # Wallet interception patterns
    wallet_intercepts = len(re.findall(
        r'signTransaction|signAllTransactions|signMessage|signIn', content))
    if wallet_intercepts >= 3:
        findings.append(Finding("medium", "wallet-intercept",
            f"Wallet signing hooks found ({wallet_intercepts} occurrences)"))

    # Helius RPC URL (even without key)
    if "mainnet.helius-rpc.com" in content:
        findings.append(Finding("medium", "infrastructure",
            "Helius RPC endpoint present (common in Solana drainers)"))

    # Jupiter price / token API
    if "api.jup.ag" in content:
        findings.append(Finding("medium", "infrastructure",
            "Jupiter aggregator API present (used for token price discovery in drainers)"))

    # webm video references (fake progress videos)
    for vid in ["malicious.webm", "200tx.webm", "refund.webm"]:
        if vid in content:
            findings.append(Finding("medium", "se-asset",
                f"Drainer social-engineering video: {vid}"))

    # Base64-encoded receiver addresses
    # 6cwsqBqmRy22Qa2SEuZ8tWrpKoCS9M8S2r8ct8VuqFmj → NmN3c3FCcW1SeTIyUWEyU0V1Wjh0V3JwS29DUzlNOFMycjhjdDhWdXFGbWo=
    for b64 in [
        "NmN3c3FCcW1SeTIyUWEyU0V1Wjh0V3JwS29DUzlNOFMycjhjdDhWdXFGbWo=",
        "NFFGaUtnOGVqeDVMZnFxTE5ibktzaUNuYkVnUnRnYWtCRjZhYk1ya3F1S1c=",
    ]:
        if b64 in content:
            findings.append(Finding("critical", "attacker-address",
                f"Base64-encoded attacker address present: {b64[:20]}…"))

    return findings


def analyse_html(content: str, source: str) -> list:
    findings = []

    # Extract inline and external scripts, analyse them
    inline_scripts = re.findall(r'<script[^>]*>(.*?)</script>', content, re.DOTALL | re.IGNORECASE)
    for script in inline_scripts:
        sub = analyse_js(script, source + " [inline]")
        findings.extend(sub)

    # Script src references
    script_srcs = re.findall(r'<script[^>]+src=["\']([^"\']+)["\']', content, re.IGNORECASE)
    for src in script_srcs:
        # Check if any known drainer JS filenames
        if re.search(r'index\.js\?[a-z0-9]+', src):
            findings.append(Finding("medium", "asset-pattern",
                f"Obfuscated JS bundle reference: {src}"))

    # Fake countdown/presale timer (sbdst pattern — unique to this drainer family)
    if re.search(r'<script[^>]+sbdst', content, re.IGNORECASE):
        findings.append(Finding("high", "se-asset",
            "Fake presale countdown script (sbdst pattern — specific to pumpanakin.fun family)"))

    # Filler text patterns (random words to fool content scanners)
    if re.search(r'(?:\b\w+\b\s*){20,}', content):
        word_ratio = len(re.findall(r'\b[a-z]{4,10}\b', content.lower())) / max(1, len(content) // 10)
        if word_ratio > 5:
            findings.append(Finding("info", "evasion",
                "High random-word density (possible scanner-evasion filler)"))

    return findings


def fetch_url(url: str, timeout: int = 15) -> Optional[str]:
    headers = {
        "User-Agent": "Mozilla/5.0 (compatible; drainer-scan/1.0)",
        "Accept": "text/html,application/javascript,*/*",
    }
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            raw = resp.read(10 * 1024 * 1024)  # max 10 MB
            charset = "utf-8"
            ct = resp.headers.get("Content-Type", "")
            m = re.search(r'charset=([^\s;]+)', ct)
            if m:
                charset = m.group(1)
            return raw.decode(charset, errors="replace")
    except urllib.error.HTTPError as e:
        print(f"  HTTP {e.code} for {url}", file=sys.stderr)
        return None
    except Exception as e:
        print(f"  Error fetching {url}: {e}", file=sys.stderr)
        return None


def check_domain(url: str) -> list:
    findings = []
    m = re.search(r'https?://([^/?#]+)', url)
    if not m:
        return findings
    host = m.group(1).lower().lstrip("www.")
    if host in KNOWN_DOMAINS:
        findings.append(Finding("critical", "known-domain",
            f"Domain is on confirmed drainer list: {host}"))
    # Structural heuristic: pump*.fun with unusual middle segment
    if re.match(r'^pump[a-z]{3,10}\.fun$', host):
        findings.append(Finding("medium", "domain-pattern",
            f"Domain matches pump*.fun drainer naming pattern: {host}"))
    return findings


def scan(target: str, is_file: bool = False) -> dict:
    result = {"target": target, "findings": [], "verdict": "clean", "score": 0}

    # Domain check (URL only)
    if not is_file and target.startswith("http"):
        result["findings"].extend(check_domain(target))

    # Fetch or read content
    if is_file:
        try:
            with open(target, encoding="utf-8", errors="replace") as f:
                content = f.read()
        except Exception as e:
            result["findings"].append(Finding("info", "error", str(e)))
            return result
        if re.search(r'<html|<!doctype', content[:200], re.IGNORECASE):
            result["findings"].extend(analyse_html(content, target))
        result["findings"].extend(analyse_js(content, target))
    else:
        content = fetch_url(target)
        if content is None:
            result["findings"].append(Finding("info", "fetch-error", f"Could not fetch {target}"))
            return result

        # If HTML, follow script tags to main JS bundle
        if re.search(r'<html|<!doctype', content[:200], re.IGNORECASE):
            html_findings = analyse_html(content, target)
            result["findings"].extend(html_findings)
            # Also fetch the _nuxt/assets/index.js if referenced
            js_refs = re.findall(r'src=["\']([^"\']*index\.js[^"\']*)["\']', content, re.IGNORECASE)
            for js_ref in js_refs[:2]:
                if js_ref.startswith("/"):
                    base = re.match(r'(https?://[^/]+)', target)
                    if base:
                        js_url = base.group(1) + js_ref
                        js_content = fetch_url(js_url)
                        if js_content:
                            js_findings = analyse_js(js_content, js_url)
                            result["findings"].extend(js_findings)
            # Also run JS analysis on the HTML content itself
            result["findings"].extend(analyse_js(content, target))
        else:
            result["findings"].extend(analyse_js(content, target))

    # HTML scans run the JS checks twice (inline script, then the whole document).
    deduped = []
    seen = set()
    for finding in result["findings"]:
        key = (finding.severity, finding.category, finding.detail)
        if key in seen:
            continue
        seen.add(key)
        deduped.append(finding)
    result["findings"] = deduped
    score = score_findings(deduped)
    result["score"] = score

    if any(f.severity == "critical" for f in result["findings"]):
        result["verdict"] = "drainer"
    elif score >= 20:
        result["verdict"] = "suspicious"
    else:
        result["verdict"] = "clean"

    return result


# ──────────────────────────────────────────────────────────────────────────────
# CLI
# ──────────────────────────────────────────────────────────────────────────────

VERDICT_COLOR = {
    "drainer":   "\033[91m",  # red
    "suspicious": "\033[93m", # yellow
    "clean":     "\033[92m",  # green
}
RESET = "\033[0m"


def main():
    parser = argparse.ArgumentParser(
        description="Static detector for JS-Confuser Solana drainer kits")
    parser.add_argument("targets", nargs="*", help="URLs or file paths to scan")
    parser.add_argument("--url", "-u", action="append", default=[], help="URL to scan")
    parser.add_argument("--file", "-f", action="append", default=[], help="JS/HTML file to scan")
    parser.add_argument("--json", "-j", action="store_true", help="JSON output")
    args = parser.parse_args()

    items = []
    for t in args.targets:
        items.append((t, not t.startswith(("http://", "https://"))))
    for u in args.url:
        items.append((u, False))
    for fp in args.file:
        items.append((fp, True))

    if not items:
        parser.print_help()
        sys.exit(0)

    all_results = []
    worst_exit = 0

    for target, is_file in items:
        result = scan(target, is_file=is_file)
        all_results.append(result)

        v = result["verdict"]
        if v == "drainer":
            worst_exit = 2
        elif v == "suspicious" and worst_exit < 2:
            worst_exit = 1

        if args.json:
            continue

        color = VERDICT_COLOR.get(v, "")
        print(f"\n{'='*70}")
        print(f"Target : {target}")
        print(f"Verdict: {color}{v.upper()}{RESET}  (score={result['score']})")
        if result["findings"]:
            print("Findings:")
            for f in result["findings"]:
                print(f"  {f}")
        else:
            print("  (no findings)")

    if args.json:
        output = []
        for r in all_results:
            output.append({
                "target": r["target"],
                "verdict": r["verdict"],
                "score": r["score"],
                "findings": [
                    {"severity": f.severity, "category": f.category, "detail": f.detail}
                    for f in r["findings"]
                ],
            })
        print(json.dumps(output, indent=2))

    sys.exit(worst_exit)


if __name__ == "__main__":
    main()
