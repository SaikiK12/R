# luna-start.trade

Fetched 2026-11-13T11:24:08.666Z. IP `172.67.204.81`.

Same split as pumpanakin. HTML paths are a Cloudflare challenge. urlscan's last title is "Luna Launch".

Kit bundle and API are open on this host (reference bundle, visit `ok`, 14 locales, config plaintext 160).

## Page

- `GET /` → 403 location=`None`
- Body: <!DOCTYPE html><html lang="en-US"><head><title>Just a moment...</title><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta http-equiv="X-UA-Compatible" content
- Probed 9 extra paths. Statuses: [(403, False)]. None was a costume page.

## Kit bundle

- `https://luna-start.trade/_nuxt/assets/index.js` → 1034759 bytes, sha256 `0735606691bbdf35d38d7531c0e48363a21ef6f7224ebce2908a1b487f9ea6a2`, reference=True.

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
