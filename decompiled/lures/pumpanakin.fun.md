# pumpanakin.fun

Fetched 2026-11-13T11:21:20.388Z. IP `172.67.163.63`.

The document is now behind Cloudflare's managed challenge. `/`, `/index.html`, `/connect`, `/airdrop`, `/claim`, `/app`, `/swap`, `/home`, `/login`, `/presale` all return 403 with title "Just a moment...".

The kit is not behind that wall: `/_nuxt/assets/index.js` is still the reference bundle (200, 1,034,759 bytes). POST `/api/visit?source=deep-dump` returns `ok`. The lure HTML from the earlier capture is still `archive/pumpanakin.fun/`.

## Page

- `GET /` → 403 location=`None`
- Body: <!DOCTYPE html><html lang="en-US"><head><title>Just a moment...</title><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta http-equiv="X-UA-Compatible" content
- Probed 9 extra paths. Statuses: [(403, False)]. None was a costume page.

## Kit bundle

- `https://pumpanakin.fun/_nuxt/assets/index.js` → 1034759 bytes, sha256 `0735606691bbdf35d38d7531c0e48363a21ef6f7224ebce2908a1b487f9ea6a2`, reference=True.

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
