#!/usr/bin/env python3
"""
Deobfuscator for the pumpanakin.fun / hexfomo.fun JS-Confuser bundle.

The bundle stacks six transforms. This tool undoes the three that are
static and mechanical:

  1. Outer Function("arg", "...body...") wrapper
  2. Custom-base64 string table, rotated left by the 铴() argument (12
     on the reference sample). getString(n) is 娨(n) and reads the
     rotated table.
  3. The 囉 constants array. Fixed indexes 囉[n] and 娨(n) are replaced
     with literals. Indexes computed from state variables are left alone.

It also folds adjacent string literals ("Author"+"izatio"+"n") and
resolves the global concealer 樶("key") when the resolver maps that key
to a real built-in name.

What it does not do: control-flow flattening (while/switch state
machines) and the WalletConnect SDK bulk. Those stay obfuscated.
data/kit/ is the hand-cleaned reading copy of the kit logic,
checked against this tool's output.

Earlier copies of this script dropped the bare `undefined` entry in 囉.
Every constant after index 16 was then off by one, which is why older
notes call ab060a03-... a URL prefix. It is a Jupiter API key. The
Solflare client prefix is https://wallet-api.solflare.com/.

Usage:
    python3 deobfuscate.py index.js --out-dir data/
    python3 deobfuscate.py index.js --strings-only

Reference sample SHA-256:
    0735606691bbdf35d38d7531c0e48363a21ef6f7224ebce2908a1b487f9ea6a2

Python 3.9+. No third-party dependencies.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path


_CUSTOM_B64_TABLE: dict[str, int] = {
    "+": 21, "/": 9, "0": 33, "1": 62, "2": 19, "3": 16, "4": 50, "5": 27,
    "6": 14, "7": 47, "8": 23, "9": 1,
    "A": 2, "B": 44, "C": 35, "D": 30, "E": 29, "F": 55, "G": 25, "H": 18,
    "I": 41, "J": 61, "K": 8, "L": 24, "M": 63, "N": 60, "O": 20, "P": 4,
    "Q": 43, "R": 31, "S": 54, "T": 42, "U": 46, "V": 5, "W": 22, "X": 36,
    "Y": 34, "Z": 39,
    "a": 48, "b": 17, "c": 45, "d": 0, "e": 12, "f": 57, "g": 59, "h": 26,
    "i": 58, "j": 11, "k": 28, "l": 13, "m": 49, "n": 3, "o": 10, "p": 40,
    "q": 37, "r": 52, "s": 53, "t": 15, "u": 7, "v": 38, "w": 51, "x": 32,
    "y": 6, "z": 56,
}

# Sentinel for the JS value `undefined` (distinct from the string "undefined"
# and from JSON null).
JS_UNDEFINED = object()


def custom_b64_decode(encoded: str) -> bytes:
    acc = 0
    bits = 0
    out = bytearray()
    for ch in encoded:
        if ch == "=":
            break
        val = _CUSTOM_B64_TABLE.get(ch)
        if val is None:
            continue
        acc = (acc << 6) | val
        bits += 6
        if bits >= 8:
            bits -= 8
            out.append((acc >> bits) & 0xFF)
    return bytes(out)


def _decode_text(raw: bytes) -> str:
    try:
        return raw.decode("utf-8")
    except UnicodeDecodeError:
        return raw.decode("latin-1")


def unwrap_function_body(js: str) -> str:
    """Pull the string argument out of Function("name", "...body...")(...)."""
    match = re.search(r'Function\([^,]+,\s*"', js)
    if not match:
        return js
    body_start = match.end()
    last_q = js.rfind('")')
    if last_q <= body_start:
        return js
    raw_body = js[body_start:last_q]
    body = (
        raw_body.replace('\\"', '"')
        .replace("\\'", "'")
        .replace("\\\\", "\\")
        .replace("\\n", "\n")
        .replace("\\r", "\r")
        .replace("\\t", "\t")
    )
    return body


def _skip_string(src: str, i: int) -> tuple[str, int]:
    quote = src[i]
    i += 1
    buf: list[str] = []
    mapping = {
        "n": "\n", "r": "\r", "t": "\t", "\\": "\\",
        '"': '"', "'": "'", "/": "/", "b": "\b", "f": "\f",
    }
    while i < len(src):
        ch = src[i]
        if ch == "\\":
            nxt = src[i + 1]
            if nxt in mapping:
                buf.append(mapping[nxt])
                i += 2
                continue
            if nxt == "u":
                buf.append(chr(int(src[i + 2:i + 6], 16)))
                i += 6
                continue
            if nxt == "x":
                buf.append(chr(int(src[i + 2:i + 4], 16)))
                i += 4
                continue
            buf.append(nxt)
            i += 2
            continue
        if ch == quote:
            return "".join(buf), i + 1
        buf.append(ch)
        i += 1
    raise ValueError("unterminated string")


def parse_js_array(src: str, start: int) -> tuple[list, int]:
    """Parse a flat JS array literal of strings, numbers, bools, null, undefined."""
    if src[start] != "[":
        raise ValueError("array does not start at the given index")
    i = start + 1
    vals: list = []
    n = len(src)
    while i < n:
        while i < n and src[i] in " \n\r\t,":
            i += 1
        if i >= n:
            break
        if src[i] == "]":
            return vals, i
        if src[i] in "\"'":
            text, i = _skip_string(src, i)
            vals.append(text)
            continue
        matched = False
        for lit, val, length in (
            ("undefined", JS_UNDEFINED, 9),
            ("true", True, 4),
            ("false", False, 5),
            ("null", None, 4),
        ):
            nxt = src[i + length:i + length + 1]
            if src.startswith(lit, i) and not (nxt.isalnum() or nxt == "_"):
                vals.append(val)
                i += length
                matched = True
                break
        if matched:
            continue
        number = re.match(r"-?\d+(?:\.\d+)?(?:e[+-]?\d+)?", src[i:])
        if not number:
            raise ValueError(f"bad array token at {i}: {src[i:i+40]!r}")
        token = number.group(0)
        i += len(token)
        vals.append(int(token) if re.fullmatch(r"-?\d+", token) else float(token))
    raise ValueError("unterminated array")


def _matching_bracket(src: str, open_at: int) -> int:
    """Index of the closing bracket, respecting strings. open_at points at '['."""
    depth = 0
    i = open_at
    in_str = False
    quote = ""
    while i < len(src):
        ch = src[i]
        if in_str:
            if ch == "\\":
                i += 2
                continue
            if ch == quote:
                in_str = False
            i += 1
            continue
        if ch in "\"'":
            in_str = True
            quote = ch
            i += 1
            continue
        if ch == "[":
            depth += 1
        elif ch == "]":
            depth -= 1
            if depth == 0:
                return i
        i += 1
    raise ValueError("no closing bracket")


def extract_string_table(js: str) -> list[str]:
    marker = js.find("嗛=铴([")
    if marker < 0:
        return []
    open_at = js.find("[", marker)
    close_at = _matching_bracket(js, open_at)
    array_text = js[open_at + 1:close_at]
    encoded = []
    for match in re.finditer(r'"((?:[^"\\]|\\.)*)"', array_text):
        encoded.append(match.group(1))
    decoded = []
    for entry in encoded:
        try:
            decoded.append(_decode_text(custom_b64_decode(entry)))
        except Exception:
            decoded.append(entry)
    return decoded


def extract_rotation(js: str) -> int:
    """Second argument of 嗛=铴([...], ROT). Reference sample uses 12."""
    marker = js.find("嗛=铴([")
    if marker < 0:
        return 12
    open_at = js.find("[", marker)
    close_at = _matching_bracket(js, open_at)
    tail = js[close_at:close_at + 32]
    match = re.match(r"\]\s*,\s*(\d+)", tail)
    if not match:
        return 12
    return int(match.group(1))


def extract_consts(js: str) -> list:
    marker = js.find("const 囉=[")
    if marker < 0:
        marker = js.find("囉=[")
    if marker < 0:
        return []
    open_at = js.find("[", marker)
    vals, _ = parse_js_array(js, open_at)
    return vals


def emit_js(value) -> str:
    if value is JS_UNDEFINED:
        return "undefined"
    if isinstance(value, str):
        return json.dumps(value, ensure_ascii=False)
    if isinstance(value, bool):
        return "true" if value else "false"
    if value is None:
        return "null"
    return str(value)


def json_safe(value):
    if value is JS_UNDEFINED:
        return {"js": "undefined"}
    return value


def get_string(index: int, table: list[str], rotation: int) -> str:
    if not table:
        return f"getString({index})"
    return table[(index + rotation) % len(table)]


def substitute(js: str, consts: list, table: list[str], rotation: int) -> tuple[str, int, int]:
    """Replace fixed 囉[n] and 娨(n). Returns (code, const_count, string_count)."""
    const_count = 0
    string_count = 0

    def repl_const(match: re.Match) -> str:
        nonlocal const_count
        index = int(match.group(1))
        if index < 0 or index >= len(consts):
            return match.group(0)
        const_count += 1
        return emit_js(consts[index])

    # Constants first, so 娨(囉[432]) becomes 娨(239) and the next pass decodes it.
    js = re.sub(r"囉\[(\d+)\]", repl_const, js)

    def repl_string(match: re.Match) -> str:
        nonlocal string_count
        index = int(match.group(1))
        string_count += 1
        return json.dumps(get_string(index, table, rotation), ensure_ascii=False)

    js = re.sub(r"娨\((\d+)\)", repl_string, js)
    return js, const_count, string_count


def fold_string_concat(js: str) -> str:
    def join(match: re.Match) -> str:
        try:
            left = json.loads('"' + match.group(1) + '"')
            right = json.loads('"' + match.group(2) + '"')
        except json.JSONDecodeError:
            return match.group(0)
        return json.dumps(left + right, ensure_ascii=False)

    previous = None
    while previous != js:
        previous = js
        js = re.sub(
            r'"((?:[^"\\]|\\.)*)"\s*\+\s*"((?:[^"\\]|\\.)*)"',
            join,
            js,
        )
    return js


def extract_global_map(js: str) -> dict[str, str]:
    """
    樶("obfuscated") returns a concealed-object property.
    When that property is a real built-in name, record the mapping.
    Names that still look like random identifiers are omitted.
    """
    start = js.find("function 樶")
    if start < 0:
        return {}
    # The resolver is one function. Grab a bounded window; it is ~9 KB.
    window = js[start:start + 12000]
    pairs = re.findall(
        r'case\s*"((?:[^"\\]|\\.)*)"\s*:\s*return\s*槙=true,瘮\["((?:[^"\\]|\\.)*)"\]',
        window,
    )
    mapping: dict[str, str] = {}
    for key, name in pairs:
        key = json.loads('"' + key + '"')
        if re.fullmatch(r"[A-Za-z_$][A-Za-z0-9_$]*", name) and not re.search(r"\d", name):
            mapping[key] = name
    return mapping


def apply_global_map(js: str, mapping: dict[str, str]) -> int:
    count = 0

    def repl(match: re.Match) -> str:
        nonlocal count
        key = json.loads('"' + match.group(1) + '"')
        name = mapping.get(key)
        if not name:
            return match.group(0)
        count += 1
        return name

    return re.sub(r'樶\("((?:[^"\\]|\\.)*)"\)', repl, js), count


def strings_by_call_index(table: list[str], rotation: int) -> list[str]:
    """Index n of the result is what 娨(n) / getString(n) returns."""
    return [get_string(n, table, rotation) for n in range(len(table))]


def main() -> None:
    parser = argparse.ArgumentParser(description="Deobfuscate a JS-Confuser bundle from this kit")
    parser.add_argument("input", help="Obfuscated bundle (index.js)")
    parser.add_argument("--out-dir", default="data", help="Output directory")
    parser.add_argument("--strings-only", action="store_true")
    parser.add_argument("--no-js", action="store_true", help="Write tables only, not the substituted bundle")
    args = parser.parse_args()

    out = Path(args.out_dir)
    out.mkdir(parents=True, exist_ok=True)

    raw = Path(args.input).read_text(encoding="utf-8", errors="replace")
    print(f"[*] {len(raw):,} bytes", flush=True)
    inner = unwrap_function_body(raw)
    print(f"[*] unwrapped body {len(inner):,} chars", flush=True)

    table = extract_string_table(inner)
    rotation = extract_rotation(inner)
    consts = extract_consts(inner)
    print(f"[*] strings {len(table)}  rotation {rotation}  constants {len(consts)}", flush=True)
    if len(table) != 1053 or len(consts) != 1691 or rotation != 12:
        print("[!] table shape differs from the reference sample; substitution may be wrong", flush=True)

    by_call = strings_by_call_index(table, rotation)
    (out / "strings.json").write_text(
        json.dumps(by_call, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    (out / "constants.json").write_text(
        json.dumps([json_safe(v) for v in consts], ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(f"[+] {out / 'strings.json'}  (index = getString argument)", flush=True)
    print(f"[+] {out / 'constants.json'}", flush=True)

    # Anchor from the reference sample. Printed, not fatal, so a variant can still be decoded.
    if table:
        anchor = get_string(294, table, rotation)
        print(f"[*] getString(294) = {anchor!r}", flush=True)

    if args.strings_only:
        return

    substituted, n_const, n_str = substitute(inner, consts, table, rotation)
    substituted = fold_string_concat(substituted)
    print(f"[*] substituted {n_str:,} strings and {n_const:,} constants", flush=True)

    mapping = extract_global_map(substituted)
    substituted, n_glob = apply_global_map(substituted, mapping)
    (out / "globals.json").write_text(
        json.dumps(mapping, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(f"[+] {out / 'globals.json'}  ({len(mapping)} built-ins, {n_glob:,} call sites)", flush=True)

    if not args.no_js:
        js_path = out / "bundle.substituted.js"
        js_path.write_text(substituted, encoding="utf-8")
        print(f"[+] {js_path}", flush=True)
        print("[*] still flattened: while/switch state machines are not recovered", flush=True)


if __name__ == "__main__":
    main()
