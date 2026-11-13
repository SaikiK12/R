# web-meteora.st

Fetched 2026-11-13T11:23:28.922Z. IP `150.251.227.160`.

OpenResty rotator that does not rotate. Six hits all 302 to `https://meteora.ag-v2.ink/en.html?click_id=<uuid>` with `tr_off_487=meteora.ag-v2.ink`. POST `/api/*` here is 404. web-meteora.com is only the 301 in front of this.

## Page

- `GET /` → 302 location=`https://meteora.ag-v2.ink/en.html?click_id=d20dca09-6a18-4989-8c52-fb0d2f4f2165`
- Body: <html> <head><title>302 Found</title></head> <body> <center><h1>302 Found</h1></center> <hr><center>openresty/1.31.8.1</center> </body> </html>
- Probed 9 extra paths. Statuses: [(302, False)]. None was a costume page.

## Kit bundle

- Fetch failed: status=302 error=None body=<html> <head><title>302 Found</title></head> <body> <center><h1>302 Found</h1></center> <hr><center>openresty/1.31.8.1</

## This host's API

Inert probes only: empty body, no wallet, no signed transaction. Visit uses the kit's own POST-with-query shape.

- `POST /api/visit?source=deep-dump` → 404 <html> <head><title>404 Not Found</title></head> <body> <center><h1>40
- `POST /api/handler` → 404 <html> <head><title>404 Not Found</title></head> <body> <center><h1>40
- `POST /api/process` → 404 <html> <head><title>404 Not Found</title></head> <body> <center><h1>40
- `POST /api/c/i` → 404 <html> <head><title>404 Not Found</title></head> <body> <center><h1>40
- `POST /api/stats {}` → 404 <html> <head><title>404 Not Found</title></head> <body> <center><h1>40
- `GET /api/config` → 302 <html> <head><title>302 Found</title></head> <body> <center><h1>302 Fo → https://meteora.ag-v2.ink/en.html?click_id=321d79e9-a68b-4780-8283-fcfad1ec0626
- `GET /api/is-banned` → 302 <html> <head><title>302 Found</title></head> <body> <center><h1>302 Fo → https://meteora.ag-v2.ink/en.html?click_id=78a6fa72-5669-4686-b1ec-4982d15d6c25
- `GET /api/stats` → 302 <html> <head><title>302 Found</title></head> <body> <center><h1>302 Fo → https://meteora.ag-v2.ink/en.html?click_id=4abfa44d-634e-4c62-86c6-3bfe7459d604
- `GET /api/visit` → 302 <html> <head><title>302 Found</title></head> <body> <center><h1>302 Fo → https://meteora.ag-v2.ink/en.html?click_id=8b5e7ba1-4695-4eff-9f4f-cfc6bf969be4
- Locales 200: (none). en size=None sha256=`None`.
- Locales not saved: {'en': 302, 'fr': 302, 'zh': 302, 'de': 302, 'es': 302, 'pt': 302, 'it': 302, 'ja': 302, 'ko': 302, 'ar': 302, 'tr': 302, 'pl': 302, 'vi': 302, 'id': 302}.
