# External samples: public drainer-source collections

Reference material from public research collections, for cross-analysis
against the pumpanakin/hexfomo kit (`MERGED_KIT.md`). Everything here was
already public; sources are linked. These are malicious artifacts — read
them, never run them. ZIP password for the thegiver86 samples is
`infected` (per that repo's README).

## Solana Phantom Drainer (thegiver86 ZIP, extracted 2026-11-13)

`solana_phantom/Solana_Phantom_Drainer/` — turnkey Solana drainer
template, January 2025 generation. Crude compared to the kit this repo
documents: a single 9.9 MB `index.js` (SHA-256
`de60261f7237ae029d05c28f18334d0e5e6829008c4a99c542951f42bafbe0f8`),
a one-page airdrop lure, and a `wallet.js` that reports installs to a
Telegram bot. This is the previous generation of Solana drainers: no
AppKit, no on-chain program, no decoy transactions, no backend crypto —
just a template plus a Telegram log channel.

IOCs from the sample (published publicly by the sample author):
Telegram bot token `6345787783:AAGQn2Uy7rpVfy76SOSJGA3jttW2sH9U8`,
log chat `4177494374`, demo site `trojansolana.xyz`, claims bot
`@vortexhitsbot`. Treat as burned infrastructure; the pattern (TG bot
as the affiliate dashboard) is the same layer the hexfomo kit's
Telegram module serves.

## Inferno Drainer (EVM lineage)

- `inferno_deobfuscated.js` (1.5 MB) — muellerberndt's deobfuscated
  Inferno listing, latest gist revision (already held from the first pass).
- `inferno/Inferno_Drainer/` — thegiver86 sample, extracted: the
  "Wallet Security Breach" malspam kit. 11 per-chain HTML letter
  templates (bitcoin, ethereum, bnb, ton, tron, litecoin, coinbase,
  binance, kraken, web3, usdt), a landing page whose only button is
  "Block Device" (fear angle, not greed), the 2 MB drainer JS
  (`cec1a382-…js`, SHA-256 `9eef875b…`), and `files.zip` (lure images).
- `inferno_configs/` — muellerberndt's Inferno config schema
  (`config-global.json`, `config-hardcoded.json`, `config-user.json`):
  the affiliate-facing knobs (button classes/texts, WalletConnect
  project id, chain targets). Same config-driven model as the hexfomo
  kit's `/api/config` push — the industry converged on it.
- `muellerberndt/deobfuscate.js` — the AST deobfuscator used on Inferno.
- `haruka_ma/inferno.py` + `inferno.md` — independent Inferno analysis
  with traffic-decryption tooling for Inferno's backend protocol.

## Angel Drainer

`angel/angel-drainer-deobfuscated.js` (308 KB, SHA-256 `52c73219…`) —
muellerberndt's Angel listing. Angel packs its payload xz-compressed in
base64 and unpacks with a WASM xz decompressor (per his write-up) — a
different loader family than Inferno's or the hexfomo kit's JS-Confuser.

## Ethane Drainer

`ethane/Ethane Drainer/` — thegiver86 sample, extracted: "Multichain
Crypto Wallet Drainer" demo — obfuscated config (221 KB), a
`web3-provider/` module set (loader, alert, ethereum-tx, modal, router,
module, data, connect, ethers) and `CA.sol`. EVM multichain, another
config-driven affiliate product.

## YARA rules (thegiver86)

`yara_rules/` — detection rules for Inferno JS, Ethane JS, Inferno
malspam email, Phantom landing page, UNIQUE landing page. Note the
Phantom rule matches only `<center>` — collection quality varies;
useful as presence-indicators, not as production detections. The kit in
this repo has far better pivots (`decompiled/iocs.json`).

## Documented but not mirrored

- `saiyan1337/x-files` — a drainers-by-project collection that includes
  leaked private keys. Keys are not mirrored here (no research need to
  hold other people's live secrets).
- `USDTBlackList/VenomDrainer`, `sfeyt89x/Inferno-drain` — turnkey
  sales mirrors; existence noted, content not redistributed.
- `TN3T/Solana-Nft-Drainer` — 2022-era Solana NFT drainer template.
- `kikeex/solana-drainer` — educational anti-drainer demo (defensive).
