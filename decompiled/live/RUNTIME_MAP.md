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

## Frontend pivot list (runtime-detectable)

- localStorage keys `_0x5`, `_0x12` (plus `_0x6` read for source tag)
- Console log line `1.18.4`
- `<w3m-modal>` + `window.openModal` + AppKit CSS overrides
- Load-order request triple: is-banned → config → visit
- 1,034,759-byte `/_nuxt/assets/index.js` (hash `07356066…f9ea6a2`)
- `phantom-*` storage namespace on the wallet-clone costumes
