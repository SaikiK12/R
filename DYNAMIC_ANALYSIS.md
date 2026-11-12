# Dynamic analysis: running the kit live in a sandbox

What the static reconstruction (`FORENSIC_REPORT.md`, `decompiled/kit/`)
predicted, verified by actually running the drainer in a headless
browser on 2026-11-11 — plus the things only a live run could reveal:
the connect-domain redirect, the balance gate, the fake confirmation
dialog, and a captured drain transaction.

## Method

Headless Chromium (Playwright), desktop UA. A **zero-balance burner
wallet** (`4Lj6MdBFVpz8pBEyxB4Zf3dYFHiDwF83zdZVVcGnw7u8`) injected both
ways (legacy `window.solana` + wallet-standard registration). All
signing methods **record and reject** — nothing was ever signed. The
kit was fed a synthetic but consistent world: Solflare portfolio and
JSON-RPC responses for 2 SOL, 750 USDC, 250k of a pump.fun Token-2022
(funded burner system account, real ATA addresses, real mint layouts).
Real endpoints passed through only for public data (blockhash). The
submit endpoints (`/api/process`, `/api/handler`) were hard-blocked;
the telemetry body was captured before blocking.

## Findings only visible live

**1. UA cloaking.** Desktop Chrome UA gets the lure (200). curl's
default UA and HeadlessChrome get a fake nginx 404 — the site is
invisible to naive crawlers and sandboxes.

**2. The connect flow leaves the lure domain.** Clicking a wallet in
the modal does not connect in-page. It opens a 360x450 popup to a
separate domain:

```
https://easyinvest7.biz/connect/rvl-7raj_dhlbkx5c4dqrf?b=1
```

The path token is generated per attempt; `?b=1` is the same flag that
suppresses the visit beacon (the kit knows this page arrived via
redirect). The connect app is a 533-byte shell + the **byte-identical
reference bundle** + a 158-byte shim that calls `openModal()` on load.
The lure domain is pure marketing; the phishing payload lives on
throwaway connect domains. New IOC: `easyinvest7.biz`.

**3. The balance gate.** After connecting, the popup checked the wallet
via `getAccountInfo(burner)` and refused to proceed:
*"You have an insufficient balance. Top-up your balance by at least
0.60 SOL"* — with "Try again" and "Buy crypto" buttons. Fresh
wallets (the typical researcher's) see nothing but this screen. The
gate passed once the mock chain showed a funded system account.

**4. RPC failover in action.** The kit's first Helius key answered
`429 max usage reached`; the flow transparently continued on the second
key (real `getLatestBlockhash` observed, slot 468,256,419). Exactly
the failover logic in `decompiled/kit/chain/rpc.js`, live.

**5. Telemetry, decrypted.** One `/api/handler` event was captured and
decrypted offline (AES-GCM, key = SHA-256(apiHost + "log" + salt),
matching `decompiled/kit/operator/payloads.js`). Plaintext: kit version
`1.18.4` (also printed to the browser console), wallet name `Phantom`,
the burner pubkey, `en-US`, and the victim's token symbols
(`PUMP`, `USDC`) — empirically validating the 侔 record layout.

**6. The fake confirmation dialog.** Before any wallet signing request,
the kit shows its **own** "Confirm Transaction" dialog styled like a
wallet: an incoming-style preview (`USD Coin −5 USDC`, `Solana`,
network fee `< 0.00001 SOL`), "Only confirm if you trust this
website", [Cancel] [Confirm] — and below it the note (string-table
entry 1050 verbatim): *"This dApp uses Abuse Protection to prevent
misuse of platform. You'll need to complete a quick verification of
your transaction history. It's completely safe and only takes a few
seconds."* Screenshot: `decompiled/live/dynamic/confirm-dialog.png`.

**7. The drain transaction, captured.** After [Confirm] → [Continue],
the kit called `signTransaction` once (525 bytes, rejected by the
harness). Decoded (`decompiled/live/dynamic/captured_tx.txt`):

```
v0 message, 3 required signatures (all zero placeholders):
  [0] treasury  DvTqmF7u…   (fee payer, placeholder sig)
  [1] victim    4Lj6MdBF…   (the wallet being asked)
  [2] receiver  7VHUFJHW…   (placeholder sig)
  [3] relay     3emsAVdm…
  [4] victim's USDC ATA
  [5] operator program TwrGADB9Q…   [6] SystemProgram   [7] Tokenkeg

ix0  operator program, disc 0x02, accounts [victim]
ix1  SystemProgram Transfer 1.0 SOL      treasury -> victim
ix2  Token Transfer 500 USDC             relay -> victim ATA (authorized by receiver)
```

Read it as the victim would: the preview legs (ix1, ix2) move value
**to** the wallet — 1 SOL and 500 USDC "incoming", matching the
"Incoming transfer" pitch in the locale strings. The victim's single
signature is what ix0 needs: the operator program moves the real assets
out through its vault PDAs (see `chain/operator_program.md`). The other
two signature placeholders (treasury, receiver) are filled in by the
operator after the partially-signed transaction arrives at
`/api/process` — which is exactly why that endpoint exists.

## Sibling live run: amlbot.rest (2026-11-11)

The same harness against the fake-AML-costume sibling: identical flow
shape (CTA → AppKit modal → popup connect flow → portfolio → fake
confirm → one `signTransaction`), but the assembled transaction is a
**richer decoy construction** (599 bytes, 10 accounts, 4 instructions):

```
ix0  operator program, disc 0x02, accounts [victim]            (theft leg)
ix1  SystemProgram Transfer 1 SOL        treasury -> victim    (decoy)
ix2  ATA program CreateAccount           treasury pays rent for a USDT
     (data 01)                           token account OWNED BY THE VICTIM
ix3  Token Transfer 500 USDT             8hnVkd24… -> that new ATA,
     (500,000,000 base units)            authorized by A3znyaRY…
```

Differences from pumpanakin's tx: the decoy is **500 USDT** (Tether
mint `Es9vMFrza…`, not USDC), and the kit first creates the victim's
USDT token account with treasury funds — so the fake incoming balance
shows up as a real, visible token account in the wallet UI. That is a
strictly more convincing illusion than pumpanakin's bare USDC leg.
New operator-side addresses from this capture: `A3znyaRYUvi7GbQv1pp9Cq
iVo7anddU9rPKFH55V28R` (placeholder-signer authority) and
`8hnVkd24Gp7s1QYVPBQSayS4uLokKEj1Uq6NFjk6PibK` (USDT source). Both
flows share the same core: treasury fee payer, disc-02 theft leg,
operator-completed co-signatures, `?b=1` connect flow. vaultspin.win
serves 200 to curl but failed to load in the harness (about:blank) —
noted for a later retry.

## What this adds over static analysis

| Fact | Only provable live |
|---|---|
| Connect happens on a separate domain (`easyinvest7.biz`) | yes |
| ≥0.60 SOL balance gate | yes |
| UA-based fake 404 | yes |
| Fake "Confirm Transaction" dialog is the kit's own UI, not the wallet's | yes |
| Drain tx = decoy incoming legs + operator-program theft leg + operator-completed signatures | yes (static had the builders, not the assembled shape) |
| Kit version `1.18.4` | yes |
| Helius failover behavior | confirmed live |

Methodology note: every "user" action here is what any victim's browser
does (load page, click connect, click confirm). The divergence points
were: signing methods record-and-reject, the submit endpoints blocked,
and the portfolio/chain state synthetic. No real assets were ever at
risk, and nothing was signed or broadcast.
