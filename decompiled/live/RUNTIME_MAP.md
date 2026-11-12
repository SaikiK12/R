# Runtime map: what each live lure actually does in a browser

Playwright walk, 2026-11-12 17:09–17:11 UTC, desktop Chrome UA. No
wallet was connected; no POST beyond what the kit itself issues on
page load was sent. Backend comparison data: `backend_diff_2026-11-12.json`.

## The load sequence is identical everywhere

Every kit host fires the same three requests at page load, in order:

1. `GET /api/is-banned` → `200`, body `0` (per-visitor kill switch)
2. `GET /api/config` → `200`, 188-byte AES-GCM blob (live receivers)
3. `POST /api/visit` → `200`, body `ok` (visit beacon)

And the same three runtime fingerprints:

- Console prints `1.18.4` (kit version, flaw F10)
- localStorage gains `_0x5` (unix seconds of the visit) and `_0x12`
  (JSON string, ~220-byte base64 encrypted blob)
- A `<w3m-modal>` element appears; `window.openModal` is a function

The bundle does NOT call `/api/locales` in the browser; the fake-modal
strings are compiled in. The locales endpoint (13 languages as of
2026-11-12) is for the operator's tooling.

## Backend diff vs pumpanakin (reference)

Method: same public GET/POST surface on 19 hosts, compared field by
field against pumpanakin.fun — bundle SHA-256, `/api/config` decrypted
plaintext, `/api/visit` body, `/api/is-banned` body + cache headers,
and all 13 `/api/locales` bodies by hash.

| Host | Identical backend |
|---|---|
| pumpanakin.fun | (reference) |
| arvoniq.com, vaultspin.win, dexfi.app, paybackpump.fun, amlbot.rest, rolldice.icu, daddysdogg.com, isen.fund, allocationclaim.com, boom-frog.xyz, eligibility-zkpass.org, pumpswap.rest, app.dextools.info, solchaindapps.com, pumpstreams.expl.live | yes — bundle, decrypted config, visit, is-banned, all 13 locales |
| neatly-resonant.ext-helper.cc, easyinvest7.biz | yes (payload hosts, same backend) |
| dexscreener.fyi | no — costume only; loads the kit from neatly-resonant.ext-helper.cc, no local /api |

So: **16 lure hosts + 2 payload hosts share one backend behavior, one
bundle, one live config.** dexscreener.fyi is a 17th lure whose backend
lives on its payload host. All of this is in
`backend_diff_2026-11-12.json` with per-field hashes.

## What differs between hosts: only the costume

| Host | Costume | Costume-side behavior seen live |
|---|---|---|
| pumpanakin.fun | TRUMP COIN airdrop (RU page) | jQuery + sbdst.js countdown; homoglyph-spoofed rendered text ("LE⁢⁣АR​N") |
| vaultspin.win | Phantom wallet dashboard | Real CoinGecko API calls (markets, trending, 1-day charts for USDC/JUP/BONK/WIF/PEPE); `phantom-*` localStorage keys faking accounts, logos, alerts |
| dexfi.app | Dexlab swap clone | Tailwind CDN warning in console; same kit triple fired |
| amlbot.rest | Fake AML company | **Tries `https://amlbot.store/_nuxt/assets/index.js` FIRST (fails, NXDOMAIN), falls back to its own bundle** — amlbot.store is the prepared next payload host |
| solchaindapps.com | Meteora clone | Same kit triple fired |

## The completed flow, live (22:47 UTC)

A burner-wallet harness completed the flow against the active connect
domain. Sequence observed, with the kit's own requests:

1. Lure CTA → AppKit modal → Phantom → popup to
   `https://petramon.xyz/connect/rvl-7raj_dhlbkx5c4dqrf?b=1`
   (petramon.xyz replaced easyinvest7.biz; pushed by the config's
   sibling field, now 220 bytes with an appended 32-byte address
   `DvuqUzFA…` and min field 0.9996245300613538).
2. Popup (same bundle) auto-opens the modal (`index-f916ac.js` shim,
   byte-identical to easyinvest7's), eager-connects an injected wallet,
   and calls the API of the **original lure host** (pumpanakin.fun),
   not the connect domain — the connect token carries the origin.
3. Solflare portfolio (`v3/portfolio/tokens`, `v2/portfolio/stake`) with
   the fabricated bearer; Helius `getAccountInfo` gate; blockhash.
4. Fake "Confirm Transaction" dialog, playing
   `/_nuxt/media/refund.webm` from the connect domain.
5. Confirm click → `signTransaction` with the decoded drain tx
   (`dynamic/captured_tx_2026-11-12.json`): theft leg `TwrGADB9…` disc
   `0x02`, decoys 1 SOL (treasury) + 500 USDC (`3emsAVdm` → victim ATA,
   authority `7VHUFJHW`), 3 signers (treasury / victim / 7VHUFJHW).
6. Telemetry via `/api/handler` only — 3 events in this path, all
   decrypted (`dynamic/handler_events_decrypted_2026-11-12.json`).
   **No `/c/i`, `/c/c`, or `/c/f` fired in the SOL-only path** — those
   endpoints belong to the token flow.

**Correction:** the bs58 crash observed in earlier runs came from OUR
mock (a dropped `addInitScript` argument left the token mint
`undefined`). With a well-formed portfolio, the token path completes:
`dynamic/captured_tx_token_2026-11-12.json` (decoy 500 USDC leg to an
existing victim ATA, no create-ATA ix). The kit's real fragilities are
smaller: Helius-key failover exhausts under rate-limiting, and early
Solflare retries can carry an `undefined` wallet address.

## Real-chain forensics (23:05 UTC)

Six most recent `TwrGADB9` transactions decoded from public RPC
(`dynamic/real_drain_txs_2026-11-12.json`). The submitted shape differs
from the client-built decoy variant: two ComputeBudget ixs, a marker ix
carrying the plaintext affiliate tag (`1kd1mz4r-|1|` style — F6 live),
and a main ix with **disc `0x15`, sub-byte `0x02`, then a one-byte
affiliate percentage** — `0x50` = 80%, `0x4b` = 75%. The victim's funds
split that percentage to a per-campaign receiver and the remainder to
the collector `6cwsqBqm…` (356.41 SOL + 185.36 USDC at fetch). This is
the DaaS revenue split, on-chain: the kit vendor keeps 20–25%.
Two of the six txs carried three Lighthouse assertions each and still
drained — direct proof the wallet-appended guardrails don't stop this
flow. Config receivers (`HrmfWTNd…` etc.) and appended `DvuqUzFA…`
remain unused; the decoy USDC relay `3emsAVdm…` currently holds 0 USDC.

## Frontend pivot list (runtime-detectable)

- localStorage keys `_0x5`, `_0x12` (plus `_0x6` read for source tag)
- Console log line `1.18.4`
- `<w3m-modal>` + `window.openModal` + AppKit CSS overrides
- Load-order request triple: is-banned → config → visit
- 1,034,759-byte `/_nuxt/assets/index.js` (hash `07356066…f9ea6a2`)
- `phantom-*` storage namespace on the wallet-clone costumes


---

# The 2026-11-11 dynamic run (first harness evidence)

*(Merged from the former root `RUNTIME_ANALYSIS.md`, 2026-11-12.)*

# Dynamic analysis: running the kit live in a sandbox

What the static reconstruction (`BUNDLE_ANALYSIS.md`, `decompiled/kit/`)
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
