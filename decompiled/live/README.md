# Live mapping, 2026-11-11

Results of benign probing of the live lure. Only requests a normal page
load would make were sent to the operator host; the submit endpoints
(`/process`, `/c/*`, `/api/handler` POST) were never touched. On-chain
data came from public RPCs (`api.mainnet-beta.solana.com`,
`solana-rpc.publicnode.com`). No wallet was connected, nothing was
signed, no victim data was sent.

## Operator API surface

| Request | Result |
|---|---|
| `GET /` | 200, lure HTML (10,309 B), same as report copy |
| `GET /_nuxt/assets/index.js` | 200, 1,034,759 B, SHA-256 = reference sample |
| `GET /api/locales?lang=en` | 200, JSON (this dir) |
| `GET /api/locales?lang=fr` | 200, JSON |
| `GET /api/locales?lang=zh` | 200, JSON |
| `GET /api/locales?lang=ru` | 404 (the page itself is hard-coded Russian) |
| `GET /api/is-banned` | 200, body `0` |
| `POST /api/visit` | 200, body `ok` (with and without `?source=`) |
| `GET /api/config` | 200, 188 B binary blob (decrypts, see `api_config_decoded.json`) |
| `GET /api/handler` | 404 (POST-only) |
| `GET /config` | 200, lure HTML (SPA fallback, not a real endpoint) |

The locale files are the fake wallet-modal copy: "Trust detected (0)
issues with this platform, proceeding is safe", "Perform transactions
without confirmation" in English, French, and Chinese. Combined with
the Russian hard-coded page, the kit targets at least four language
groups.

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
