# vaultspin.win

Fetched 2026-11-13T11:21:33.768Z. IP `172.67.222.158`.

Title on this fetch is "Phantom". urlscan's 2026-11-11 title for the same host was "ClaudeTrade — trading agents".

The page is one 947,015-byte inline script: a Phantom UI clone. It writes `phantom-wallets-v2`, `phantom-account`, `phantom-notif`, `phantom-alerts`, `phantom-demo-chats` and calls CoinGecko `/api/v3/coins/markets`, `/api/v3/coins/`, `/api/v3/search/trending`. It does not contain `openModal` or the kit. The kit is a separate tag, `../../_nuxt/assets/index.js`, served from this origin as the reference bundle.

## Page

- Title: Phantom
- 1107416 bytes, sha256 `773bb0cbdd73f8ab6df6ab83affbe55d0f54eebcd2e50c8a36c0a1c03baa274d`
- Kit script refs: `['../../_nuxt/assets/index.js']`
- Inline scripts: 1 (947015 bytes). click_id=False turnstile=False
- Visible text: Phantom

## Kit bundle

- `https://vaultspin.win/_nuxt/assets/index.js` → 1034759 bytes, sha256 `0735606691bbdf35d38d7531c0e48363a21ef6f7224ebce2908a1b487f9ea6a2`, reference=True.

## What the costume code does

- `inline-0.js` 947015 bytes. hits solana, phantom. apis /api/v3/coins/markets?vs_currency=usd&ids=, /api/v3/coins/, /api/v3/search/trending. storage phantom-wallets-v2, phantom-account, phantom-notif, phantom-alerts, phantom-demo-chats. urls https://react.dev/errors/, http://www.w3.org/2000/svg, http://www.w3.org/1998/Math/MathML, http://www.w3.org/1999/xlink, http://www.w3.org/XML/1998/namespace, https://logo.clearbit.com/.

## Off-origin hosts named by the page

`fonts.googleapis.com`, `fonts.gstatic.com`, `react.dev`, `www.w3.org`, `logo.clearbit.com`, `financialmodelingprep.com`, `icons.duckduckgo.com`, `www.google.com`, `cdn.jsdelivr.net`, `api.coingecko.com`, `api.dexscreener.com`

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
