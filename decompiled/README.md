# Decompilation

Defensive reading copy of the pumpanakin.fun bundle
(`0735606691bbdf35d38d7531c0e48363a21ef6f7224ebce2908a1b487f9ea6a2`).

The original bundle is not stored in this branch. Reproduce the tables
with the sample you already have:

```bash
python3 deobfuscate.py index.js --out-dir decompiled/ --no-js
```

## What was wrong before

`囉` contains a bare `undefined` at index 17 (index 16 is the string
`"undefined"`). An earlier extractor skipped that token, so every
constant after it was off by one. That shift is why older notes treat
`ab060a03-7874-4647-84d1-da019e4b51ea` as a secret URL prefix. It is a
Jupiter API key in the string table. `deobfuscate.py` keeps the token,
and the anchors below are checked against the reference sample.

## Tables

| File | Meaning |
|---|---|
| `strings.json` | 1053 entries. Index `n` is what `娨(n)` returns after the table is rotated left by 12. |
| `constants.json` | 1691 entries of `囉`. JSON `{"js":"undefined"}` is the JS value `undefined`. |
| `globals.json` | `樶("key")` → built-in, when the resolver names a real built-in. 76 names. |

Checked anchors on the reference sample:

- `getString(294)` = `https://wallet-api.solflare.com/`
- `constants[307]` = `64` (UUID version nibble in the bearer token)
- `globals["_rsxYy"]` = `fetch`
- `globals["kAiDhH"]` = `AbortSignal`

## Kit modules

`kit/` is the straight-line kit logic with locals renamed. It is a
reconstruction for reading, not a program to run. Transaction builders
are still control-flow flattened in the bundle and are not
reimplemented here. The calls that post those payloads are named.

| File | What it is |
|---|---|
| `kit/runtime.js` | Polyfills the bundle installs before anything else |
| `kit/solflare_api.js` | Client for `wallet-api.solflare.com` (portfolio + SOL price) |
| `kit/rpc.js` | Rotating Solana RPC client and the eight endpoints |
| `kit/operator_api.js` | Operator routes on `https://{apiHost}/api...` |
| `kit/visit.js` | Page-load visit beacon |

`apiHost` is the field `Se` on the app state object. It is a hostname.
The visit beacon compares it with the page host from `location`.

## Still flattened

These stay as while/switch state machines after substitution. Do not
treat the older `src/*.js` trees on the deleted branches as accurate;
they were built on the shifted constants.

- Campaign `source` / page-host helpers (`鼄`, `浚`)
- One method inside the wallet-modal setup (`setSolAmount`)
- The bundled WalletConnect / AppKit SDK (third-party, not kit logic)
- The transaction-payload builders called by `operator_api.js`
