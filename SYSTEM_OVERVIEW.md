# Operator architecture: how the whole thing fits together

One page for the full machine. Details live in the linked docs; this
is the map of how the operation actually works end to end, as of
2026-11-11 (static analysis + live run).

```
 TRAFFIC                 LURE                    CONNECT                 BACKEND                    CHAIN
─────────────  ───────────────────────  ───────────────────────  ───────────────────────  ─────────────────────────
 Telegram spam   pumpanakin.fun          easyinvest7.biz          same-host /api/*         program TwrGADB9…
 TDS click_id    + 30 sibling themes     /connect/<token>?b=1     on every lure domain     vault42 PDAs
 fake news       UA-cloaked (fake 404)   same bundle + shim       /visit /is-banned        treasury DvTq…
                                 │                │               /locales /config         receivers (rotating)
                                 ▼                ▼               /c/i /c/c /c/f           upgrade authority 3ofS…
                          CLAIM REWARD btn   popup 360x450         /process /handler
                          openModal()        auto openModal()
                                 │                │
                                 └──► AppKit modal (wallet list)
                                       │ Phantom row
                                       ▼
                                 wallet connects ──► balance gate (≥0.60 SOL, else "insufficient")
                                       │
                                       ▼
                                 portfolio valuation (Solflare API, free)
                                 chain reads (4 Helius keys, failover)
                                       │
                                       ▼
                                 fake "Confirm Transaction" dialog
                                 (kit's own UI, "Abuse Protection" note)
                                       │
                                       ▼
                                 signTransaction (3-sig v0 message)
                                 victim signs 1 of 3 ──► /api/process
                                 operator completes treasury+receiver sigs
                                 and/or kit self-broadcasts after 2.5 s
                                       │
                                       ▼
                                 operator program: disc-2 theft leg via
                                 vault PDAs; decoy legs make the preview
                                 read "incoming" (+1 SOL, +500 USDC)
```

## Design principles observed

**1. Separation of clean and dirty domains.** The lure domains carry
zero executable phishing logic beyond `openModal()` — the bundle loads
from the same host but nothing incriminating happens until the popup
opens on a *connect domain* (`easyinvest7.biz`), where the actual
wallet interaction runs. Marketing domains and payload domains rotate
independently. The string table carries the fake-wallet deep links for
mobile (`socwallet://`, `herowallet://wc`, `reactwalletback.com`).

**2. Abuse-resistance by default.**
- UA cloaking: non-desktop agents get a fake nginx 404.
- Balance gate: wallets under ~0.60 SOL get a polite refusal — sandboxes
  and broke users never see the payload.
- `?b=` beacon suppression marks redirect arrivals.
- `is-banned` server-side kill switch per visitor.
- Filler-text pages + DOMContentLoaded dictionary swap: static crawlers
  see word salad (see `FRONTEND_LAYER.md`).

**3. Free infrastructure everywhere.** Helius free-tier keys (4,
rotated as they burn out — observed live), Jupiter free keys (5),
Solflare's free portfolio API for victim valuation, Cloudflare free in
front, Cloudflare Pages for throwaway siblings, public RPC fallbacks.
Fixed cost is one domain registration (`STACK.md`).

**4. Centralized brain, disposable costumes.** Every sibling serves the
byte-identical bundle and the byte-identical decrypted `/api/config`
(same receivers, same USDC targeting). Receivers rotate server-side via
the config push — no rebuild needed. The operator program on-chain is
similarly upgradeable (authority `3ofSxsTReb…`) without shipping a new
kit. Kit version stamped in telemetry: `1.18.4`.

**5. Psychology as a feature set.** The kit's fake "Confirm
Transaction" dialog (its own UI, not the wallet's), the "Abuse
Protection" note, the decoy incoming legs in the assembled transaction
(+1 SOL, +500 USDC to the victim so the preview reads as income), the
"200tx" mass-sign flood option, localized Trust-style modal copy in
en/fr/zh, Russian-language lure and countdown alert. Every layer has a
matching persuasion trick (`FRONTEND_LAYER.md`, `RUNTIME_ANALYSIS.md`).

**6. Third-party code as camouflage.** The wallet UX is Reown AppKit
with `@redacted/enterprise-plugin`; the wallet modal, 130+ wallet list,
and connect flows are stock library behavior. The actual kit logic is a
thin layer around it: valuation, drain-tx assembly, operator API, and
the on-chain program doing the real movement.

## Trust boundaries (who talks to whom)

| Boundary | Direction | Notes |
|---|---|---|
| victim → lure domain | GET static | UA-filtered; beacon `/api/visit` |
| victim → connect domain | popup | token path, `?b=1` |
| victim → Solflare/Helius/Jupiter | GET/POST | abused free tiers; wallet address as UA |
| victim → operator backend | `/api/*` on lure host | ban list, locales, config, telemetry, signed-tx submit |
| operator backend → chain | broadcast | operator co-signs and/or kit self-broadcasts |
| program → program | CPI invoke_signed | vault PDAs do the movement; receivers collect |

## Where the money goes

victim wallet ──(operator program, disc 2/3/4/18, vault42 PDAs)──►
per-victim/per-mint vaults ──► receivers (`7VHUFJHW…` etc., rotated by
config) ──► relay (`3emsAVdm…`) / drain-through hops ──► assessed
treasury (`DvTq…`, 17,057 SOL + 1.02M USDC on 2026-11-11) ──► off-ramps
(not traced; out of scope for this repo).
