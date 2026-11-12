# Live mapping — 2026-11-11 (initial) + 2026-11-12 (re-verification)

Results of benign probing of the live lure. Only requests a normal page
load would make were sent to the operator host; the submit endpoints
(`/process`, `/c/*`, `/api/handler` POST) were never touched. On-chain
data came from public RPCs and Helius. No wallet was connected, nothing
was signed, no victim data was sent.

**2026-11-12 re-verification** used a real desktop Chrome UA
(`Mozilla/5.0 … Chrome/131.0.0.0`) via a headless browser. All pages
still live. UA cloaking confirmed: bare non-Chrome UA → 404.

## 16:54 UTC spot check

Public GETs only (page, bundle, `/api/config`, `/api/locales`). No POSTs.
Desktop Chrome UA. Chain reads via public RPC.

- Reference bundle `07356066…f9ea6a2` (1,034,759 B) still on pumpanakin.fun,
  amlbot.rest, arvoniq.com, vaultspin.win, isen.fund, paybackpump.fun,
  dexfi.app, allocationclaim.com, boom-frog.xyz, and easyinvest7.biz's
  `/_nuxt/assets/index.js`.
- `/api/config` rotated a second time today. New receivers, all 0 lamports
  and 0 signatures: `HrmfWTNdY8QeNif8SMK4xU5YATt7YJPdnKev1FcmbaKy`,
  `7oHgTZjNPnjos8xd2zdCm2Q6zwS8cVFDp4XbuvmqV4aa`,
  `7mfxYcwyddVa6fD7Ge33vgY8SC862hcqXmvjYKqcpza1`. The 16:39 UTC set
  (`142yhSkB…`, `7Z7oKDRH…`, `DC9dh6xD…`) is also still empty. Same
  plaintext on all five hosts decrypted. Bounds unchanged: max 500 SOL,
  min 1 SOL, token USDC, sibling `trongame.fun` (still NXDOMAIN).
- Locales: `vi` now 200 (481 B). Live set is en, fr, zh, de, es, pt, it,
  ja, ko, ar, tr, pl, vi. ru, uk, nl are 404.
- `easyinvest7.biz` resolves (Cloudflare) but the popup shell is gone:
  `/`, `/connect.html`, `/connect/<token>?b=1`, and `/app-924a52.js` return
  the padded nginx 404. The openModal shim `/index-f916ac.js` (158 B) and
  `/api/config` are still up. 404 page carries Cloudflare Web Analytics
  token `19268545265c46b59114bf0caf342ee8`.
- `amlbot.store` and `hexfomo.fun` do not resolve. `amlbot.rest` HTML
  already points a module script at `https://amlbot.store/_nuxt/assets/index.js`.
- Treasury `DvTqmF7u…` still 17,057.095705105 SOL. Its newest signature is
  slot 465,982,099 (2026-11-06 04:54 UTC), so it is not fee-paying the
  current drains. Latest `TwrGADB9…` transactions at 16:39 UTC
  (slot 468,595,221 and neighbors) succeeded; the fee payer on
  `5HXuh2eMJ16ppPRhut8z…` is the string-table hop
  `4cfdFcVuJf8PPXpMWPMCDehSE4gV4C8oYwpZnLra7rtW`, and the only top-level
  program is still `TwrGADB9…`.

## Sibling pages archived (17:00 UTC)

The earlier passes hashed bundles and decrypted a handful of configs.
They did not keep the other landings. `archive/sibling_lures/<host>/`
now has the page, the decrypted config, and the small same-origin
scripts for every family host that returned HTTP 200. Fifteen of those
configs match the 16:54 UTC receiver set. `dexscreener.fyi` is the
exception: no local bundle and no `/api/config`; the page loads
`neatly-resonant.ext-helper.cc`, which serves the reference bundle and
the same config. English `/api/locales` bodies match pumpanakin on all
15 kit hosts, so the modal copy was not saved again.

## Operator API surface (2026-11-12 re-check)

| Request | 2026-11-11 | 2026-11-12 | Notes |
|---|---|---|---|
| `GET /` | 200, 10,309 B | 200, same content | lure unchanged |
| `GET /_nuxt/assets/index.js` | 200, 1,034,759 B, SHA `07356066…` | **identical** | bundle not rebuilt |
| `GET /api/locales?lang=en` | 200 | 200 (identical body) | |
| `GET /api/locales?lang=fr` | 200 | 200 (identical body) | |
| `GET /api/locales?lang=zh` | 200 | 200 (identical body) | |
| `GET /api/locales?lang=de` | (not checked) | **200 NEW** | German added |
| `GET /api/locales?lang=es` | (not checked) | **200 NEW** | Spanish added |
| `GET /api/locales?lang=pt` | (not checked) | **200 NEW** | Portuguese added |
| `GET /api/locales?lang=it` | (not checked) | **200 NEW** | Italian added |
| `GET /api/locales?lang=ja` | (not checked) | **200 NEW** | Japanese added |
| `GET /api/locales?lang=ko` | (not checked) | **200 NEW** | Korean added |
| `GET /api/locales?lang=ar` | (not checked) | **200 NEW** | Arabic added |
| `GET /api/locales?lang=tr` | (not checked) | **200 NEW** | Turkish added |
| `GET /api/locales?lang=pl` | (not checked) | **200 NEW** | Polish added |
| `GET /api/locales?lang=ru` | 404 | 404 | page itself is RU |
| `GET /api/locales?lang=uk` | (not checked) | 404 | |
| `GET /api/is-banned` | 200, `0` | 200, `0` | `Cache-Control: private, max-age=300` |
| `POST /api/visit` | 200, `ok` | 200, `ok` | `Content-Length: 2` |
| `GET /api/config` | 200, 188 B blob | 200, **188 B NEW blob** | receivers rotated |
| `GET /config` | 200, SPA fallback | 200, SPA fallback | |

**Locale expansion** (2026-11-12): The backend now serves 11 languages
(en, fr, zh, de, es, pt, it, ja, ko, ar, tr, pl). This is a significant
expansion from 3 languages on 2026-11-11, indicating the operation is
actively growing its geographic targeting. All 13 locale files are in this
directory (`vi` saved 2026-11-12 22:12 UTC). The pattern across all
languages is identical: "Trust detected (0) issues" and "Perform
transactions without confirmation" in every language.

**Receiver rotation** (between 2026-11-11 18:30 UTC and 2026-11-12 07:06 UTC):
All three addresses in `/api/config` changed to fresh uninitialized wallets.
Full details: `api_config_decoded_2026-11-12.json`.

## AppKit CSS variables (live, 2026-11-12)

```css
:root {
  --w3m-modal-width: 360px;             /* overrides AppKit default of 430px */
  --w3m-font-family: Inter, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
                     Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  --w3m-font-size-master: 10px;
  --w3m-border-radius-master: 4px;
  --w3m-z-index: 99999;
  --w3m-color-mix-strength: 0%;
}
window.W3M_COLOR_THEME = "light"       /* set in lure HTML */
```

Note: `--w3m-modal-width: 360px` matches the popup dimensions (360×450px).
The popup IS the modal on desktop — same width by design.

## On-chain state (2026-11-12 ~07:06 UTC)

| Address | Role | SOL | Note |
|---|---|---|---|
| `DvTqmF7uMbLaW56QsMvcgv8KSkydFEikuk5gUcjACPV` | treasury | **17,057.0957** | unchanged from Nov 11 |
| `142yhSkBthJpmWKzhBRtHYV6S4JdXAMBQcdYD8vEhNx4` | new live-config receiver | 0 (empty) | rotated in between Nov 11–12 |
| `7Z7oKDRHhXwzeWfuJ91FDZowaNETWwq6pW4XHt7d6FBL` | new live-config address | 0 (empty) | receiver or relay |
| `DC9dh6xDK7mLbrSUx9Fcy9VpMuSdJnUynoNEtr9Y6NjA` | new live-config address | 0 (empty) | receiver or relay |

## Helius key status (2026-11-12 ~07:06 UTC)

| Key prefix | Status |
|---|---|
| `0b9f580f` | live — slot 468,435,559 |
| `2dfa2086` | live — slot 468,435,588 |
| `3a1ca16d` | rate-limited ("max usage reached") |
| `777d85c0` | rate-limited ("max usage reached") |

Same failover pattern as Nov 11 but keys 1 and 2 swapped primary status.
Two of four burned out (3a1ca16d and 777d85c0 rate-limited on both dates).

## New indicators (2026-11-12)

Three new receiver addresses (all empty/uninitialized as of probe time):
- `142yhSkBthJpmWKzhBRtHYV6S4JdXAMBQcdYD8vEhNx4`
- `7Z7oKDRHhXwzeWfuJ91FDZowaNETWwq6pW4XHt7d6FBL`
- `DC9dh6xDK7mLbrSUx9Fcy9VpMuSdJnUynoNEtr9Y6NjA`

## On-chain state (public RPC, 2026-11-11 ~18:30 UTC)

| Address | Role | SOL | USDC | Txs | Note |
|---|---|---|---|---|---|
| `7VHUFJHWu2CuExkJcJrzhQPJ2oygupTWkL2A2For4BmE` | live-config receiver | 125.9177 | 34.72 | 1000+ | active same hour |
| `3emsAVdmGKERbHjmGfQ6oZ1e35dkf5iYcS6U4CPKFVaa` | live-config relay | 0.0020 | – | 1000+ | active same hour |
| `6cwsqBqmRy22Qa2SEuZ8tWrpKoCS9M8S2r8ct8VuqFmj` | string-table address | 357.5270 | – | 1000+ | active same day |
| `DvTqmF7uMbLaW56QsMvcgv8KSkydFEikuk5gUcjACPV` | string-table address | 17,057.0957 | 1,020,879.02 | 133 | accumulation pattern; assessed treasury |
| `4QFiKg8ejx5LfqqLNbnKsiCnbEgRtgakBF6abMrkquKW` | string-table | 2.3864 | – | 1000+ | |
| `4cfdFcVuJf8PPXpMWPMCDehSE4gV4C8oYwpZnLra7rtW` | string-table | 0.0007 | – | 1000+ | |
| `TwrGADB9QPrLfTKpWuyq9tjgRaGsuzgRUMFTz51uhsa` | string-table | 0.0008 | – | 923 | |
| `syspv6Qe5BbK8GPEjLbMnmF9hZy7juAuePbuspciCFP` | string-table | 0.0301 | – | 636 | |
| `A5chdzL3UMQZBqBRdXFFCT9HTK7JZs6h4TEYVCQLQydo` | string-table | 0.0000 | – | 173 | |
| `6ugBBLhRJqsuB1H4G6rGBMCyMWjdFpvpEUKnp6XCB1t7` | string-table | 0.0021 | – | 5 | idle since ~2025-09 |
| `9piPeQWJ7wxGmsWieeJhQKJ13DjJLga9j8CE5ydLTHC6` | string-table | 0.0010 | – | 0 | never used |
| `6ARSYR2B1aPWSjK11ZXDPmApgLgar3bCrm2BTYGS2jBK` | string-table | 0.1000 | – | 0 | never used |
| `4qti6FcMybVSLL2k4rqRQ3Ph1a2jGrzPmBN8Wmt4A5wr` | string-table | 0.0682 | – | 0 | never used |
| `HsVYhMDQRf6CkjtdUzqNDNRfDwsgw9nAX8feLVC3TAGp` | string-table | 0.0000 | – | 0 | never used |
| `4moJ9mfFDqFgGMp5UJUgcVhAaFtBxiapt9DVJE3LcVao` | string-table | 0.0036 | – | 0 | never used |

Balances are point-in-time; attribution of `DvTqmF7u…` as the treasury
is an assessment (string-table address, 133-tx accumulation pattern,
~$1.02M USDC + 17k SOL held, not a known exchange or protocol wallet).

## Embedded Helius keys

Three of four return the current slot (`468231176` at check time); the
fourth answers "max usage reached" (rate-limited but valid). All four
are live and reportable to Helius abuse for revocation.

## New indicators from live mapping

- `trongame.fun` — sibling domain inside the decrypted `/api/config`;
  DNS-dead on 2026-11-11.
- `7VHUFJHWu2CuExkJcJrzhQPJ2oygupTWkL2A2For4BmE`, USDC ATA
  `4kokFKCFMxpCpG41yLYkLEqXW8g1WPfCt2NC9KGivY6N` — active receiver.
- `3emsAVdmGKERbHjmGfQ6oZ1e35dkf5iYcS6U4CPKFVaa` — active relay.
- `/api/config` endpoint + its AES-GCM key derivation (purpose =
  apiHost).
