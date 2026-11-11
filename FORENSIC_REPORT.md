# pumpanakin.fun

Static analysis of the live lure and its bundle. The page was fetched on 2026-11-11. The script is byte-for-byte the reference sample. Nothing was signed, and nothing was sent to the operator API.

| | |
|---|---|
| Lure | `https://pumpanakin.fun/` — "TRUMP COIN" airdrop, `lang="ru"`, Cloudflare |
| Bundle | `/_nuxt/assets/index.js?aa6524x` |
| SHA-256 | `0735606691bbdf35d38d7531c0e48363a21ef6f7224ebce2908a1b487f9ea6a2` |
| Size | 1,034,759 bytes |
| Also loaded | `assets/css/wzi2d.css`, `assets/js/jxi33.js` (jQuery 3.4.1), Google fonts |

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
| `https://{apiHost}/api/process` | POST of a payload that is custom-base64 encoded first. 2.5s. |
| `https://{apiHost}/api/c/i` | POST, same encoding. 16s. |
| `https://{apiHost}/api/c/c/{a}/{b}` | POST, same encoding. 16s. |
| `https://{apiHost}/api/c/f/{a}` | POST, same encoding. 2.5s. |

`/config` and `/api/handler` are in the string table. The recovered straight-line code does not call them. Transaction builders that fill `/process` and `/c/*` are still `while`/`switch` state machines, so their bodies were not reconstructed and were not executed.

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

Domains and redirects present as strings: `pumpanakin.fun` (the live host), `https://nulltrace.app`, `https://reactwalletback.com/app-link/`, `https://onlybulls.com`, `onlybulls://wallet`, `https://dlicom.me`.

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

Solana addresses present in the string table. Being in the table means the kit ships them. It does not, by itself, prove which ones receive funds. The transaction builder that would show that is still flattened.

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

## Still not recovered

Control-flow flattened, left as-is on purpose:

- the payload builders for `/process` and `/c/*`
- the campaign `source` helper and the page-host helper
- the bundled WalletConnect / AppKit SDK

## Detection

`drainer_scan.py` and `drainer.yar`. Keys and the watermark string are plaintext only after the string table is decoded, so the raw bundle is caught by the hash and the CJK obfuscation rules, not by those literals.

```bash
python3 deobfuscate.py index.js --out-dir decompiled/ --no-js
python3 drainer_scan.py --file index.js
```
