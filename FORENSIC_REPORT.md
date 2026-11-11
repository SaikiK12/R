# pumpanakin.fun

Static analysis of the live lure and its bundle. The page was fetched on 2026-11-11. The script is byte-for-byte the reference sample. Nothing was signed. Operator contact was limited to benign requests any page load makes (asset GETs, locale/is-banned GETs, and the plain `POST /api/visit` beacon); the submit endpoints (`/process`, `/c/*`, `/api/handler` POST) were never contacted. On-chain data came from public Solana RPCs.

| | |
|---|---|
| Lure | `https://pumpanakin.fun/` — "TRUMP COIN" airdrop, `lang="ru"`, Cloudflare |
| Bundle | `/_nuxt/assets/index.js?aa6524x` |
| SHA-256 | `0735606691bbdf35d38d7531c0e48363a21ef6f7224ebce2908a1b487f9ea6a2` |
| Size | 1,034,759 bytes |
| Also loaded | `assets/css/wzi2d.css`, `assets/js/jxi33.js` (jQuery 3.4.1), `assets/js/sbdst.js`, Google fonts |

`sbdst.js` (670 bytes, present on the 2026-11-11 fetch) is unminified jQuery: a parallax mousemove effect and a fake countdown that ends with a Russian "Время вышло!" ("Time's up!") alert — urgency dressing for the lure, no wallet logic.

Every "Connect" button calls `window.openModal()`, with `open` hidden as `atob('b3Blbg==')`. Visible copy is split and stuffed with zero-width characters and Cyrillic lookalikes. Filler English words sit in the HTML until `DOMContentLoaded` replaces them.

## What the bundle actually does

JS-Confuser, six layers: `Function()` wrapper, custom-base64 string table (1053 entries, rotated left by 12), a 1691-entry constants array, CJK names, control-flow flattening, and split string literals. `deobfuscate.py` undoes the first three and the concealed built-in names. `decompiled/kit/` is the straight-line result.

An earlier extractor skipped the bare `undefined` at constants index 17. Every later constant was off by one. That is why older notes call `ab060a03-7874-4647-84d1-da019e4b51ea` a secret URL prefix. It is a Jupiter API key.

Two different clients were mixed together:

**Solflare portfolio client.** Prefix is `https://wallet-api.solflare.com/`. Each request sends `User-Agent: <connected wallet>` and `Authorization: Bearer <random 16 bytes>` (UUID version nibble set, 3.5s timeout, `no-referrer`).

- `v2/swap/capped-tokens?currency=USD` — SOL price
- `v3/portfolio/tokens/{wallet}` — mainnet holdings, USD

**Operator client.** `https://{apiHost}/api` + path. `apiHost` is state field `Se`, a hostname, compared with the page host. It is not a wallet address and not that Jupiter key.

| URL | Call |
|---|---|
| `https://{apiHost}/api/visit` | POST, no JSON body. Query: `source`, `origin` (only if it differs), `tgid`, `tgus`. Skipped when the URL contains `?b=`. Skipped again for 900 seconds after a body of `ok`. Clock is `Math.floor(Date.now()/1000)`. |
| `https://{apiHost}/api/locales?lang=` | GET |
| `https://{apiHost}/api/is-banned` | GET. Body `1` means banned. |
| `https://{apiHost}/api/process` | POST, binary payload (layout below) as standard base64, `text/plain`. 2.5s. |
| `https://{apiHost}/api/c/i` | POST, AES-GCM-encrypted payload, same encoding. 16s. |
| `https://{apiHost}/api/c/c/{a}/{b}` | POST, empty JSON object. 16s. |
| `https://{apiHost}/api/c/f/{a}` | POST, packed byte list as base64, `text/plain`. 2.5s. |
| `https://{apiHost}/api/handler` | POST, AES-GCM-encrypted event record as base64, `text/plain`, `keepalive`. 3s, retried. |

`/config` is in the string table but no recovered code calls it. `/api/handler` **is** called: it is the encrypted telemetry channel (see below).

Request bodies that are bytes are sent as standard base64 with content-type `text/plain` (the kit polyfills `Uint8Array.prototype.toBase64`); object bodies are JSON. The kit's custom-base64 decoder is only used to decode selected string-table entries, not request bodies.

### `/process` body (builder 焖, 52-byte fixed header)

- 13 random bytes
- u32 LE: operator attempt counter (global `屭.ne`, 0 when unset)
- 32 bytes: victim wallet pubkey (`state.b.e`)
- 1 byte: flow type (`state.he.be`)
- u16 LE: length of the packed transaction section
- packed section: count byte + per-item u16 LE + **the signed transactions**
- packed section: count + u16 + base58-decoded accounts (`state.he.Fe`, type 0 → `.de`, else `.e`)

### `/c/i` body (builder 醭, then AES-GCM)

- 15 random bytes
- u64 LE: configured SOL amount in lamports (`state.K`, truncated)
- 32 bytes: victim wallet pubkey
- account list (`詯`): count byte, then per entry a type byte; type 0 → flag byte + two pubkeys (`.q`, `.de`), type 2 → one pubkey (`.e`)
- 4 bytes: CRC32 (poly 0xEDB88320) of everything before it

The plaintext is AES-GCM encrypted with a random 12-byte IV (output is `iv || ciphertext`). The key is SHA-256 of `apiHost + "c" + "B3ui3QZFrOPoGW7oMZgE4A"`, imported raw. The binary response is parsed into `[session, {base58Key: csv.split(",")}, extra]`.

### Telemetry: `POST /api/handler`

Event records (page events, `navigator.language`, the 浚 page host as `origin` when it differs from `apiHost`) are serialized to a binary record, AES-GCM encrypted with key SHA-256 of `apiHost + "log" + salt`, and posted as base64 `text/plain` with `keepalive: true`. Retries up to 5 times with 150 ms × attempt backoff, 3 s timeout, one event per kind per 5 s, kind 4 only once per page id.

### Signed-transaction submit flow (芏 / 蔓)

After the wallet signs, the kit posts the signed transactions to `/process` (retried) and, when `state.he.ie` is unset and `state.he.be === 0`, broadcasts them itself over the RPC proxy with `sendTransaction`, `skipPreflight: true`, after a 2500 ms delay so the operator POST lands first.

### What the victim signs (drain transactions)

The kit does not drain through the system/token programs directly. It calls the operator's own on-chain program, `TwrGADB9QPrLfTKpWuyq9tjgRaGsuzgRUMFTz51uhsa` (one of the string-table addresses; 923 transactions on 2026-11-11), with single-byte instruction discriminators (2, 3, 4, 18 observed) and per-victim "vault" PDAs. Token accounts are swept one chunk per account (+5,000 compute each) through this program; SOL falls back to a plain SystemProgram transfer. Each transaction is prepended with ComputeBudget limit/price instructions — the priority fee auto-sizes to 0.5× the estimated fee unless set — with per-token-type compute adjustments (ATA creation +615,000, four other adjustments) and an 8,000,000-unit cap. Receiver for the sweeps: the assessed treasury `DvTqmF7u…` and the b64 pair `6cwsqBqm…` / `4QFiKg8e…`.

The "200tx.webm" scare video is literal: in one flow the kit builds up to 200 filler transactions (empty but for minimal compute instructions, or a 1-lamport transfer to the treasury) so the wallet shows a mass-sign prompt and the victim clicks through. Full builder layouts: `decompiled/kit/chain/tx_builders.js`.

### Campaign source and page host (鼄 / 浚)

Recovered by emulating the extracted generator state machines; `decompiled/kit/page/page_params.js` has the full behavior table. Source: localStorage key `_0x6` wins; else `utm_source`; else the referrer host; printable-ASCII values 2..256 chars are kept and cached. Page host: `&d=<slug>` in the query, then a `/connect/<slug>` path, then the plain host minus `www.`. Slugs are base-x (`wrqeh3gsb2ca1pjykixvo46zf98unm57ld0t_-`) plus UTF-8.

The wallet-modal `setSolAmount` accepts numbers in [0.001, 1,000,000] and throws `TypeError("invalid amount")` otherwise; the value lands in `state.K` and is what the `/c/i` payload sends as lamports.

RPC is a failover client, 2.5s, `solana-client: js/5.1.0`, wallet address as `User-Agent`:

```
https://mainnet.helius-rpc.com/?api-key=0b9f580f-8102-4b89-928b-8770a62771f0
https://mainnet.helius-rpc.com/?api-key=2dfa2086-c6cd-4cb4-8a13-08ecdee36a0f
https://mainnet.helius-rpc.com/?api-key=3a1ca16d-e181-4755-9fe7-eac27579b48c
https://mainnet.helius-rpc.com/?api-key=777d85c0-fefd-42a0-b290-8b1b3704fe90
https://solana-rpc.publicnode.com/
https://solana.magiceden.dev/
https://rpc.solanatracker.io/public
https://api.mainnet-beta.solana.com
```

The bundle installs `AbortSignal["Be"]` as a tiny `AbortSignal.timeout` polyfill. The word `timeout` is not in the file.

## Strings used to push a signature

- `Transactions are reverted. Sign all transactions to verificate your account.`
- `Transaction was reverted, funds will be refunded soon. Please try again.`
- `The transaction has expired` / `Please sign it one more time to continue` / `Please allow one more verification step`
- `This application hasn't been reviewed by Phantom yet, but it is listed in trusted community-maintained safety databases...`
- `This dApp uses a new, optimized transaction delivery method that is not yet displayed correctly in Phantom...`
- Videos: `/_nuxt/media/malicious.webm`, `200tx.webm`, `refund.webm`

A base64 blob in the string table decodes to bytes that contain `hexfomo.fun` and `USDC`. That is the kit watermark. The plaintext domain `hexfomo.fun` is not in the table.

## Indicators

Domains: `pumpanakin.fun` (live host), `trongame.fun` (sibling, found in the live `/api/config`, DNS-dead 2026-11-11), `hexfomo.fun` (kit watermark), plus string-table entries `https://nulltrace.app`, `https://reactwalletback.com/app-link/`, `https://onlybulls.com`, `onlybulls://wallet`, `https://dlicom.me`.

On-chain (2026-11-11, details in `decompiled/live/`): assessed treasury `DvTqmF7uMbLaW56QsMvcgv8KSkydFEikuk5gUcjACPV` (17,057 SOL + 1,020,879 USDC), live-config receiver `7VHUFJHWu2CuExkJcJrzhQPJ2oygupTWkL2A2For4BmE` and relay `3emsAVdmGKERbHjmGfQ6oZ1e35dkf5iYcS6U4CPKFVaa`, active string-table address `6cwsqBqmRy22Qa2SEuZ8tWrpKoCS9M8S2r8ct8VuqFmj` (357.5 SOL). Five of the 13 string-table addresses have zero transactions (unused spares). All four embedded Helius keys are live (one rate-limited).

Apps named in the table: Volsungar `com.volsungar.wallet` / `com.react.wwallett`, SOC `com.socwallet.socjsc` / `socwallet://`, Hero `herowallet://wc` and `https://wallet.hero.io/signin/wc`. Store ids cited with those names in earlier review of the same bundle: `id6757104054`, `id6752928371`, `id6757118686`.

Jupiter keys in the string table:

```
cc0769f7-ceba-4abf-83d8-e7c083921665
5f1f45eb-a550-4e95-ad0e-b26e6ec0702d
a4ed32be-dcdf-4702-aba0-aee15c512427
f707107a-6d56-4626-a937-ef3c7eef51d8
ab060a03-7874-4647-84d1-da019e4b51ea
```

Helius keys are the four in the RPC list above.

Solana addresses present in the string table. The recovered transaction builders (`decompiled/kit/chain/tx_builders.js`) show the roles: `TwrGADB9QPrLfTKpWuyq9tjgRaGsuzgRUMFTz51uhsa` is the operator's on-chain program, `DvTqmF7uMbLaW56QsMvcgv8KSkydFEikuk5gUcjACPV` the treasury, `6cwsqBqm…`/`4QFiKg8e…` receivers, `4cfdFcVu…`/`syspv6Qe…` drain-through hops. On-chain balances on 2026-11-11 (`decompiled/live/`) confirm which ones actually receive funds.

```
6cwsqBqmRy22Qa2SEuZ8tWrpKoCS9M8S2r8ct8VuqFmj
4QFiKg8ejx5LfqqLNbnKsiCnbEgRtgakBF6abMrkquKW
DvTqmF7uMbLaW56QsMvcgv8KSkydFEikuk5gUcjACPV
4cfdFcVuJf8PPXpMWPMCDehSE4gV4C8oYwpZnLra7rtW
TwrGADB9QPrLfTKpWuyq9tjgRaGsuzgRUMFTz51uhsa
syspv6Qe5BbK8GPEjLbMnmF9hZy7juAuePbuspciCFP
A5chdzL3UMQZBqBRdXFFCT9HTK7JZs6h4TEYVCQLQydo
6ugBBLhRJqsuB1H4G6rGBMCyMWjdFpvpEUKnp6XCB1t7
9piPeQWJ7wxGmsWieeJhQKJ13DjJLga9j8CE5ydLTHC6
6ARSYR2B1aPWSjK11ZXDPmApgLgar3bCrm2BTYGS2jBK
4qti6FcMybVSLL2k4rqRQ3Ph1a2jGrzPmBN8Wmt4A5wr
HsVYhMDQRf6CkjtdUzqNDNRfDwsgw9nAX8feLVC3TAGp
4moJ9mfFDqFgGMp5UJUgcVhAaFtBxiapt9DVJE3LcVao
```

A further 29 pubkeys are built in a set next to the RPC client, including `2zC63K7VDZmL1UKHibDkMKxrAFtHjmXLm5XrPgFREgZc`, `9kC8U8STwNtXeQqqX7WpgWg19qC7137JRP97BnLDKEtS`, and `5o7Q69vpqP3CwSb9mVzWk2jpirYbxuntAozyBv2CURC3`. Those three were previously misread as path fragments. Full list: `decompiled/iocs.json`.

## Live mapping, 2026-11-11

Benign probes only (page-load-equivalent requests; the submit endpoints were never touched; on-chain data via public RPC). Full results and evidence files: `decompiled/live/`. Highlights:

- `/api/locales` serves en/fr/zh (the fake wallet-modal copy); `ru` 404s because the page itself is hard-coded Russian. Four language groups targeted.
- `POST /api/visit` answers `ok` as the kit expects.
- `GET /api/config` serves a 188-byte AES-GCM blob that decrypts with key purpose = `apiHost`: USDC mint as target token, two receiver addresses (differ from the hard-coded list — receivers rotate server-side), amount range 1.0–500.0 SOL, and the sibling domain `trongame.fun`.
- `GET /config` is just the SPA fallback, not an endpoint.
- On-chain: assessed treasury `DvTqmF7u…` holds 17,057 SOL + 1,020,879 USDC; both live-config receivers were active within the hour.

## Remaining unknowns

- The bundled wallet-modal SDK is third-party: **Reown AppKit (w3m) plus `@redacted/enterprise-plugin` and `@redacted/components`** (the "Redacted" kit's SDK wrapper). Its bulk is not decompiled — it is library code, and the kit's calls into it (connect, signTransaction/signAllTransactions, signMessage) are identified at the boundary. Exact plugin version is not embedded in the bundle.
- The `/c/i` response format is pinned (emulated): 11-byte opaque header, u16 field A, u8 field C, flag, optional 32-byte pubkey + u16 + UTF-8 CSV. The semantic roles of A and C are operator-side and not observable without a live victim flow.
- The on-chain program is fully characterized at the binary level (`decompiled/kit/chain/operator_program.md`); individual handler internals beyond the observed discriminators were not hand-decompiled — the observed on-chain usage (marker/sweep/SOL-sweep) is documented instead.

Everything else formerly listed as missing was recovered on 2026-11-11 against the live bundle. The live page still serves the reference sample byte-for-byte (SHA-256 `07356066…f9ea6a2`).

## Detection

`drainer_scan.py` and `drainer.yar`. Keys and the watermark string are plaintext only after the string table is decoded, so the raw bundle is caught by the hash and the CJK obfuscation rules, not by those literals.

```bash
python3 deobfuscate.py index.js --out-dir decompiled/ --no-js
python3 drainer_scan.py --file index.js
```
