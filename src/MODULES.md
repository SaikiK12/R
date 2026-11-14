# Rebuilt Kit — hexfomo.fun / pumpanakin.fun Solana Drainer

Full reconstruction of every component from: static analysis of the original
bundle, the Babel AST deobfuscation output (`decompiled/deobfuscated/`), and
dynamic captures (`decompiled/live/`).

**This is a research artifact for documenting how the malware works.**
It is not runnable and contains no live credentials, operator keys, or
receiver addresses. All Solana pubkeys, Helius API keys, and RPC endpoints
are reproduced from the IOC catalog (`decompiled/iocs.json`) for attribution
purposes only.

---

## Directory layout

```
rebuilt/
  README.md                 ← this file
  ARCHITECTURE.md           ← full system narrative
  core/
    crypto.js               ← AES-GCM, CRC32, base58, base-x, packing helpers
    state.js                ← central state machine and flow types
    config_parser.js        ← /api/config binary struct parser
  chain/
    rpc.js                  ← 8-endpoint RPC client + Proxy
    solflare.js             ← Solflare portfolio API client
    jupiter.js              ← Jupiter price API client
    tx_builders.js          ← drain transaction assembly
    stake.js                ← native stake account drain
    submit.js               ← signed-tx submit + self-broadcast
  operator/
    client.js               ← OperatorClient — all 6 API endpoints
    payloads.js             ← /c/i and /process binary payload builders
    telemetry.js            ← /api/handler encrypted telemetry
  page/
    params.js               ← campaign source, pageHost, slug decode
    visit.js                ← /api/visit beacon
    ban_check.js            ← /api/is-banned + locale load
    balance_gate.js         ← wallet account + SOL balance check
    siws.js                 ← Sign-In-With-Solana verify flow
    mobile.js               ← mobile detection + connect popup + deep-links
    lure_dom.js             ← DOM injection, obfuscated pitch dictionary
    runtime.js              ← polyfills, kit entrypoint, full flow
  config/
    iocs.js                 ← all extracted IOCs as constants
```

---

## Kit version

`1.18.4` — the value sent in every `/api/handler` telemetry event.
Kit vendor watermark: `hexfomo.fun` (string table index 350).
