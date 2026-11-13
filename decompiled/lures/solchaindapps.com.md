# solchaindapps.com

Fetched 2026-11-13T11:22:14.824Z. IP `104.21.8.38`.

1.6 MB "Home | Meteora" page. The kit is not a static tag. An inline script reads `window.location.hostname` and injects `https://${domain}/_nuxt/assets/index.js`. That URL currently returns the reference bundle; a hard-coded asset `/points/point-button-bg.png` is 404.

External references are the real Meteora and Jupiter sites (`app.meteora.ag`, `preview.jup.ag`), used as costume chrome.

## Page

- Title: Home | Meteora
- 1604037 bytes, sha256 `0df18db7ae2e27288325b3d8497decbf66a0eeaff119b0979099cbfaceedf301`
- Kit script refs: `['`https://${domain}/_nuxt/assets/index.js`;', '../../_nuxt/assets/index.js']`
- Inline scripts: 3 (1510 bytes). click_id=False turnstile=False
- Visible text: Home | Meteora Meteora Points Connect Wallet Priority: Mixed | Ultra Cap: 0.008 SOL We build liquidity pools For Liquidity Providers, Launchpads, and Launches Join the LP Army LP Starter Guide Claim Airdrop Migrate Swap Rectification Stake / Unstake Allocation Checker Total Value Locked $ 906.27m Swap Volume $ 254.78b Fees Generated $ 1.48b Explore Pools Search by ticker, pool name or pool address DLMM Pools Enabling LPs to earn more through dynamic fees, precise liquidity concentration, and fle

## Kit bundle

- Fetch failed: status=404 error=None body=<html> <head><title>404 Not Found</title></head> <body> <center><h1>404 Not Found</h1></center> <hr><center>nginx</cente

## Costume files

Referenced but not a file:
- 404 https://solchaindapps.com/points/point-button-bg.png

## What the costume code does

- `inline-1.js` 236 bytes. urls https://${domain}/_nuxt/assets/index.js.

## Off-origin hosts named by the page

`app.meteora.ag`, `meteora-nvr54nm5d.preview.jup.ag`, `www.w3.org`

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
