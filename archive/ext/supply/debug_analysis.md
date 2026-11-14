# npm Supply-Chain Variant — Browser-Side Analysis

This document covers a browser-side variant delivered through a compromised
npm package rather than a lure page. The delivery differs; the client-side
technique is the same class as the hexfomo kit.

---

## Delivery

The script arrives as a dependency injected via a compromised npm package.
Any web application that installs the package includes the script automatically.
The script activates on page load with no user interaction required.

---

## Technique 1 — Address Swapping

The script wraps the browser's `fetch` and `XMLHttpRequest` globals on page
load, intercepting all network traffic for the page.

**Flow:**
1. Intercepts all HTTP requests and responses.
2. Scans response bodies for cryptocurrency address patterns using regular
   expressions covering Bitcoin (legacy + SegWit), Ethereum, Solana, Tron,
   Litecoin, and Bitcoin Cash.
3. Replaces any matched address with a corresponding attacker-controlled
   address from a hardcoded map embedded in the script.

A user copying an address displayed on the page may receive an attacker
address instead of the original.

---

## Technique 2 — Wallet API Wrapping

The script detects `window.ethereum` (MetaMask and compatible wallets) and
wraps the `request`, `send`, and `sendAsync` methods.

**Flow:**
1. Wraps wallet methods before the page's own code runs.
2. Intercepts outgoing transaction objects before they reach the wallet.
3. For simple ETH transfers: rewrites the `to` field to an attacker address.
4. For token approvals (`approve`) and transfers (`transferFrom`): rewrites the
   spender/recipient arguments in the ABI-encoded call data.

The wallet's confirmation screen displays the modified transaction, not the
original one.

Attacker address embedded in this sample: `0xFc4a4858bafef54D1b1d7697bfb5c52F4c166976`

---

## Comparison to hexfomo kit

| Property | npm supply-chain variant | hexfomo kit |
|---|---|---|
| Delivery | Compromised npm package | Lure HTML page |
| Chain targets | EVM (ETH, tokens) | Solana (SOL, SPL tokens) |
| Wallet hook | `window.ethereum` wrapping | Solana wallet adapter (AppKit) |
| TX modification | Client-side rewrite before signing | Decoy-leg construction + server completes signing |
| Backend | Hardcoded attacker address | Operator API (`/api/process`, `/api/c/i`, etc.) |

Both approaches rely on modifying transaction data before the user's wallet
presents the confirmation. The hexfomo kit's decoy-leg approach is more
sophisticated: the wallet preview shows positive inflows, while the actual
asset transfer is embedded in a CPI through the operator program.

---

## Related

- `archive/ext/a2/` — Inferno kit (EVM, similar wallet-wrapping approach)
- `data/core/chain/` — hexfomo kit transaction assembly
- `docs/pipeline.md` — Full hexfomo transaction flow including decoy legs
