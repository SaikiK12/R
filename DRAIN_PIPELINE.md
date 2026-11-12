# The drain pipeline: how the operation pulls it off, end to end

Everything below is proven by artifacts in this repo — the kit bundle
itself, decrypted server responses, a live-captured drain transaction
built for our burner, and six real victim transactions decoded from the
public ledger. Where a step is inference it says so.

## The kill chain

```
TELEGRAM / X ADS (affiliates, per-campaign tags)
      │
      ▼
LURE PAGE (16+ costumes, one bundle)         pumpanakin.fun, amlbot.rest, …
      │  serves /_nuxt/assets/index.js (same SHA-256 everywhere)
      │  GET /api/is-banned → GET /api/config → POST /api/visit
      ▼
APPKIT MODAL (victim picks a wallet)
      │
      ▼
CONNECT DOMAIN POPUP (rotates)               easyinvest7.biz → petramon.xyz
      │  578-byte shell + 158-byte shim (openModal on load) + same bundle
      │  kit calls the LURE's API — the connect token carries the origin
      ▼
PORTFOLIO SCAN
      │  Solflare wallet-api (fake bearer) → token list
      │  Helius RPC getAccountInfo → SOL gate (≥ ~1 SOL)
      │  telemetry: POST /api/handler (AES-GCM, key = SHA-256(host+"log"+salt))
      ▼
FAKE "CONFIRM TRANSACTION" DIALOG (kit's own UI, not the wallet's)
      │  streams /_nuxt/media/refund.webm as social proof
      │  localized into 13 languages (operator tooling endpoint /api/locales)
      ▼
DRAIN TRANSACTION BUILT CLIENT-SIDE
      │  ix0  operator program TwrGADB9, disc 0x02, [victim]     ← THEFT (CPI)
      │  ix1  System: treasury → victim 1 SOL                    ← DECOY
      │  ix2  ATA CreateIdempotent: victim's USDC ATA            ← SETUP (if needed)
      │  ix3  Token: 500 USDC relay → victim ATA                 ← DECOY
      │  wallet preview reads "+1 SOL, +500 USDC incoming"
      ▼
VICTIM SIGNS (one signature, in their wallet)
      ▼
POST /api/process (partially-signed tx, base64 binary)
      │  server adds operator signatures (treasury / decoy authority)
      │  and restructures into the SUBMITTED shape:
      │    ComputeBudget ×2
      │    marker ix: ASCII affiliate tag "1kd1mz4r-|1|"
      │    main ix: disc 0x15, 0x02, <1 byte = affiliate %>
      ▼
SOLANA MAINNET — atomic:
      │  victim loses portfolio
      │  per-campaign receiver gets 75–80%
      │  collector 6cwsqBqm gets 20–25% (the DaaS cut)
      ▼
TREASURY DvTqmF7u… accumulates (17,057 SOL + ~1M USDC on 2026-11-11)
```

## The files and services they use, and what each one does

| Piece | Lives at | Role |
|---|---|---|
| Kit bundle `app-924a52.js` / `/_nuxt/assets/index.js` | every lure + connect host (1,034,759 B, JS-Confuser) | The whole client: wallet detection, AppKit modal, portfolio scan, tx builders, telemetry, fake dialog |
| Connect shell `connect.html` (578 B) + `index-f916ac.js` (158 B) | petramon.xyz `/connect/<token>` | Auto-opens the modal on desktop; mobile/desktop switch via `window.embedded` |
| `sbdst.js`, `jxi33.js` | lure origins | Countdown/parallax dressing, jQuery |
| Media (`refund.webm`, `200tx.webm`, `malicious.webm`) | `/_nuxt/media/*` on lure and connect hosts | Social-proof videos; `refund.webm` plays inside the fake confirm dialog |
| `/api/config` (188→220 B AES-GCM blob) | every kit host | Live push: receivers, token target, min/max, connect domain, appended staging address. Key = SHA-256(host + salt), salt shipped in the bundle |
| `/api/is-banned` | every kit host | Per-IP kill switch (`0`/`1`) |
| `/api/visit` | every kit host | Visit beacon: source tag, Telegram id/username, IP |
| `/api/handler` | every kit host | AES-GCM telemetry, 92–102 B records: kit version 1.18.4, wallet name, language, token symbols. 7 of 8 captured events decrypted |
| `/api/locales?lang=` | every kit host | 13 languages of fake-dialog strings — used by operator tooling, not the bundle |
| `/api/stats` | every kit host | Sealed operator endpoint (422 without unknown params) |
| `/c/i`, `/c/c`, `/c/f`, `/api/process` | every kit host | Token-flow session endpoints and the co-signing drop (formats in `decompiled/kit/operator/payloads.js`; `/api/process` never touched by us) |
| Solflare `wallet-api` | third party | Portfolio enumeration with a fabricated bearer (16 random bytes) |
| Helius RPC (4 keys, 2 burned) + public RPC fallbacks | third party | Balance gate, ATA existence checks, blockhash |
| On-chain program `TwrGADB9…` | Solana | The drain engine. Client-built ix: disc `0x02` + victim. Submitted ix: disc `0x15`, `0x02`, 1-byte affiliate %, marker ix with ASCII tag |
| Treasury `DvTqmF7u…` | Solana | Fee payer on decoy variants, decoy SOL source, accumulation (17k SOL) |
| Collector `6cwsqBqm…` | Solana | The operator's constant 20–25% share wallet (356 SOL + 185 USDC) |
| Decoy pair `7VHUFJHW…` + `3emsAVdm…` | Solana / string table | Fake-incoming legs: 500 USDC relay + the key that co-signs it. Pinned in the bundle — NOT rotated by config push |
| Per-campaign receivers (HJtzvDEK…, HF4jWNAY…, 4ZcPRoe…) | Solana | Affiliate payout wallets; get the 75–80% cut per tx |
| Affiliate tags (`1kd1mz4r-|1|` …) | marker ix data, ASCII | Per-campaign attribution, publicly readable forever |
| Telegram bot + admin accounts | Telegram (per SEAL/industry reporting) | Victim notifications, affiliate panel (not directly observed here) |

## The two transaction shapes, proven

**Client-built decoy variant** (captured twice live from the kit,
`decompiled/live/dynamic/captured_tx_2026-11-12.json` and
`captured_tx_token_2026-11-12.json`): theft leg + 1 SOL decoy + 500 USDC
decoy, 3 signers (treasury / victim / `7VHUFJHW…`). The wallet preview
shows money arriving.

**Submitted split variant** (six real drains decoded,
`decompiled/live/dynamic/real_drain_txs_2026-11-12.json`): ComputeBudget
×2, marker ix with the affiliate tag in ASCII, main ix
`0x15 0x02 <pct>` routing `pct%` of the victim's loss to a campaign
wallet and the rest to `6cwsqBqm…`. `pct` observed: 75 and 80.

The server side bridges them: the victim signs the decoy variant; the
operator co-signs and submits the split variant. (The transformation is
inferred from the two shapes — the /api/process payload was never sent
by us; the split mechanics are proven on-chain.)

## Why it works on victims

1. The decoy legs make the wallet preview read as incoming money.
2. The theft is a CPI inside the operator program — outer-balance
   wallet checks (including Lighthouse assertions, observed failing to
   stop two real drains) don't see CPI-side token decreases.
3. The fake confirm dialog is the kit's own UI — victims think they're
   re-confirming an incoming transfer, in their own language.
4. Credibility dressing: real brand clones (Phantom, Jupiter, pump.fun,
   Dexscreener, AML services), social-proof videos, localized copy.

## Why it is nonetheless exposed

- One bundle hash on 16+ hosts; one AES salt for three purposes;
  world-readable live config; plaintext affiliate tags on-chain; a
  pinned decoy keypair; a hard-coded treasury and collector; and a DaaS
  split that names every campaign wallet in every transaction.
- Full pivot list: `decompiled/iocs.json`. Monitoring: `scripts/monitor.js`.

## What we deliberately did not do

No transaction or message was ever signed by the harness; nothing was
ever submitted to `/api/process` or to the chain; the mock wallet
rejects every signature request and the submit path is hard-blocked.
All captures end at the signature prompt.

---

# Design principles and trust boundaries

*(Merged from the former `SYSTEM_OVERVIEW.md`, 2026-11-12.)*

**1. Separation of clean and dirty domains.** The lure domains carry
zero executable phishing logic beyond `openModal()` — nothing
incriminating happens until the popup opens on a connect domain.
Marketing domains and payload domains rotate independently (observed:
easyinvest7.biz → petramon.xyz within a day).

**2. Abuse-resistance by default.** UA cloaking (fake nginx 404 for
non-desktop agents), the balance gate (broke wallets and sandboxes
never see the payload), `?b=` beacon suppression for redirect
arrivals, the `is-banned` per-visitor kill switch, and filler-text
pages with a DOMContentLoaded dictionary swap for static crawlers.

**3. Free infrastructure everywhere.** Helius free-tier keys rotated
as they burn out, Jupiter free keys, Solflare's free portfolio API for
victim valuation, Cloudflare free in front, Cloudflare Pages for
throwaway siblings, public RPC fallbacks.

**4. Centralized brain, disposable costumes.** Every sibling serves the
byte-identical bundle and the same decrypted `/api/config`. Receivers
rotate server-side via config push — no rebuild needed. The on-chain
program is upgradeable without shipping a new kit.

**5. Psychology as a feature set.** The fake "Confirm Transaction"
dialog (the kit's own UI, not the wallet's), the decoy incoming legs,
the localized Trust-style modal copy in 14 languages, the countdown
alert, the social-proof `refund.webm`. Every layer has a matching
persuasion trick (`FRONTEND_LAYER.md`).

**6. Third-party code as camouflage.** The wallet UX is Reown AppKit
with `@redacted/enterprise-plugin`; the modal and 130+ wallet list are
stock library behavior. The kit is a thin layer around it: valuation,
drain-tx assembly, operator API, the on-chain program.

## Trust boundaries

| Boundary | Direction | Notes |
|---|---|---|
| victim → lure domain | GET static | UA-filtered; beacon `/api/visit` |
| victim → connect domain | popup | token path, `?b=1` |
| victim → Solflare/Helius/Jupiter | GET/POST | abused free tiers; wallet address as UA |
| victim → operator backend | `/api/*` on lure host | ban list, locales, config, telemetry, signed-tx submit |
| operator backend → chain | broadcast | operator co-signs; kit self-broadcast as fallback |
| program → program | CPI invoke_signed | theft leg; receivers/campaign wallets collect |
