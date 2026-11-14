# archive/ext/ — External Reference Collections

Reference material from publicly available research repositories, used for
cross-analysis against the primary kit documented in this repo.

## a1/ — Deobfuscation tooling

`a1/src.js` — AST deobfuscator used as a starting point for the bundle
deobfuscation pipeline. Cross-reference with `data/core/` for the output.

## a2/ — Inferno Drainer reference (EVM lineage)

Samples from the Inferno kit family, an EVM-chain predecessor that shares
the same config-driven affiliate architecture as the hexfomo kit:

- `a2/samples/` — Per-chain HTML templates (Bitcoin, Ethereum, BNB, TON,
  Tron, Litecoin, Coinbase, Binance, Kraken, Web3, USDT), landing page,
  and the main drainer JS bundle.
- `a2_src.js` — Deobfuscated Inferno JS (1.5 MB), sourced from
  muellerberndt's public gist.
- `a2_cfg/` — Inferno config schema: `config-global.json`,
  `config-hardcoded.json`, `config-user.json`. The affiliate-facing
  parameter structure (button classes, WalletConnect project ID, chain
  targets) is architecturally comparable to the hexfomo kit's
  `/api/config` push.

## a3/ — Angel Drainer reference

`a3/samples/` — Deobfuscated Angel Drainer JS (308 KB). Angel uses a
different loader: payload is xz-compressed in base64 and unpacked with a
WASM xz decompressor, as distinct from the JS-Confuser approach used in
the hexfomo kit.

## a4/ — Solana Phantom Drainer reference (thegiver86 sample)

`a4/samples/` — Turnkey Solana drainer template from early 2025. Single-file
architecture (9.9 MB `index.js`), Telegram bot reporting. This represents
a previous generation of Solana kits: no AppKit, no on-chain program, no
decoy transactions — just a template with a Telegram log channel. Useful
as a baseline to measure how much the hexfomo kit's architecture advanced.

## notes/ — Inferno traffic decryption tooling

`notes/decrypt.py` + `notes/notes.md` — Independent Inferno backend protocol
analysis with a traffic decryption tool. The decrypt utility covers the
Inferno backend wire format; the hexfomo kit uses a different AES-GCM key
derivation scheme (`SHA-256(host + "B3ui3QZFrOPoGW7oMZgE4A")`), documented
in `data/core/`.

## rules/ — YARA detection rules

`rules/r1.yar` through `rules/r5.yar` — Detection rules for Inferno JS,
Ethane JS, Inferno malspam email, Phantom landing page, and UNIQUE landing
page (from thegiver86). These are presence indicators; production pivots for
the hexfomo kit are in `data/` (`iocs.json`).

## supply/ — npm supply-chain variant

`supply/debug_analysis.md` — Analysis of a browser-side variant delivered
via a compromised npm package. The delivery mechanism (supply-chain) differs
from lure-based deployment, but the client-side technique (fetch/XHR
hijacking for address swapping + wallet API wrapping for transaction
modification) is the same class of operation.

## tools/ — AST processing utilities

`tools/ast.js` — AST transformation helper used during deobfuscation work.

## Cross-reference

| Theme | Location |
|---|---|
| Hexfomo kit full architecture | `docs/kit-overview.md` |
| Deobfuscated bundle output | `data/core/` |
| Config format comparison | `data/core/operator/backend.md` |
| All IOCs | `data/` (`iocs.json`) |
