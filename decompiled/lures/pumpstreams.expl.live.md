# pumpstreams.expl.live

Fetched 2026-11-13T11:23:14.367Z. IP `104.21.73.4`.

The HTML names `voicechat.fun` for the kit. That host is still NXDOMAIN. `https://pumpstreams.expl.live/_nuxt/assets/index.js` is the reference bundle.

The inline app calls the real Dexscreener API (`/latest/dex/search`), embeds `dexscreener.com/solana/${token}?embed=1`, and links `solscan.io/token/`. That is costume data, not the operator API.

## Page

- Title: Pump
- 75604 bytes, sha256 `f7f586689140bd019565cb99bd4afa9a708608d3120f5cb7a45976f6de6b9bae`
- Kit script refs: `['https://voicechat.fun/_nuxt/assets/index.js', 'https://lens-badland.fontstack.cc/_nuxt/assets/index.js', '../../_nuxt/assets/index.js']`
- Inline scripts: 1 (9424 bytes). click_id=False turnstile=False
- Visible text: Pump pump.fun Home Live Support Chat Terminal More Pump app ✕ Scan to download Learn more Trade faster on the pump.fun app Install 🚀 Pump is better on mobile. faster trades, chat, and more. Download now ⌘ K Create Voice chat Sign in LIVE Pump Pump D4rYzm...pump now Share D4rY...pump Live 174 click to watch stream Market Cap $170.3K +$633.5K (372.00%) 24h Vol: $2.2M 1m 5m 1h Trade Display Hide All Bubbles Price / MCap USD / SOL 1D 5D 1M 3M 1Y 08:55:20 UTC % log auto Vol 24h $2.2M Price $0.000170 

## Kit bundle

- Fetch failed: status=None error=ENOTFOUND body=

## Costume files

Saved under `archive/sibling_lures/pumpstreams.expl.live/site/`:
- `pump1.svg` 2653 bytes `2c72b8e06bbd7be8`
- `index-DHNhIdoO.css` 41691 bytes `64ab960eb76bad09`
- `pump.png` 34528 bytes `b7b44ca054c4d041`
- `stream.mp4` 13310015 bytes `19d3dbafe22fbc83`
- `stream1.png` 156927 bytes `68107e0adc7f8fe9`
- `stream2.png` 125552 bytes `2ef826540ac79ddf`
- `stream3.png` 123606 bytes `ee8c2dfea7112fa4`
- `stream4.png` 117436 bytes `e2ed16081ffc8bf7`
- `logo.png` 32126 bytes `943c48e760ec717f`

## What the costume code does

- `inline-0.js` 9424 bytes. hits solana. urls https://dexscreener.com/solana/${tokenAddress}?embed=1&theme=dark&trades=0&info=0, https://api.dexscreener.com/latest/dex/search?q=${encodeURIComponent(query)}, https://images.pump.fun/coin-image/placeholder.png, https://solscan.io/token/${base.address}.

## Off-origin hosts named by the page

`voicechat.fun`, `lens-badland.fontstack.cc`, `logos-world.net`, `pump.mypinata.cloud`, `dexscreener.com`, `encrypted-tbn0.gstatic.com`, `t3.ftcdn.net`, `newsbit.nl`, `pbs.twimg.com`, `images.pump.fun`, `www.w3.org`

## This host's API

Inert probes only: empty body, no wallet, no signed transaction. Visit uses the kit's own POST-with-query shape.

- `POST /api/visit?source=deep-dump` → 200 ok acao=*
- `POST /api/handler` → 422 {"error":"VALIDATION"} acao=*
- `POST /api/process` → 422 {"error":"VALIDATION"} acao=*
- `POST /api/c/i` → 404 <html> <head><title>404 Not Found</title></head> <body> <center><h1>40
- `POST /api/stats {}` → 404 <html> <head><title>404 Not Found</title></head> <body> <center><h1>40
- `GET /api/config` → 200 <188 bytes, not text> acao=*
- `GET /api/is-banned` → 200 0 acao=*
- `GET /api/stats` → 422 {"error":"VALIDATION"} acao=*
- `GET /api/visit` → 404 <html> <head><title>404 Not Found</title></head> <body> <center><h1>40
- Locales 200: ar, de, en, es, fr, id, it, ja, ko, pl, pt, tr, vi, zh. en size=378 sha256=`d17efb811f26e9c7`.
