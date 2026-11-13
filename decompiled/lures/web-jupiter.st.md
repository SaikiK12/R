# web-jupiter.st

Fetched 2026-11-13T11:23:26.523Z. IP `150.251.227.160`.

OpenResty rotator, not an origin that serves the kit. Each GET `/` is 302 to `https://<offer>/en?click_id=<uuid>` and sets `tr_dec` (30 min) and `tr_off_487=<offer>` (30 days) on `.web-jupiter.st`.

Six hits from this egress landed on: launchpad.web-jupiter.gd, swap-jup.ag-wc.ink (twice), tracker.web-jupiter.gd, app-jup.ag-wc.ink, www-jup.ag-wc.ink. An earlier hit the same hour landed on jup.ag-wc.ink. POST `/api/*` on web-jupiter.st itself is 404.

## Page

- `GET /` → 302 location=`https://tracker.web-jupiter.gd/en?click_id=1a992683-0dc5-4d72-a14b-2652278cc7c1`
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
- `GET /api/config` → 302 <html> <head><title>302 Found</title></head> <body> <center><h1>302 Fo → https://jup.ag-wc.ink/en?click_id=a51b9aaf-fbb8-4cea-9a49-10869d082912
- `GET /api/is-banned` → 302 <html> <head><title>302 Found</title></head> <body> <center><h1>302 Fo → https://login.web-jupiter.gd/en?click_id=565d29c6-1bd0-4ee2-9945-7249593c0b9b
- `GET /api/stats` → 302 <html> <head><title>302 Found</title></head> <body> <center><h1>302 Fo → https://tracker.web-jupiter.gd/en?click_id=b3b9f9d2-980f-408e-a339-d716f219c1c9
- `GET /api/visit` → 302 <html> <head><title>302 Found</title></head> <body> <center><h1>302 Fo → https://app.web-jupiter.gd/en?click_id=82af0e65-dac6-4f2e-b3b3-68e317fac22d
- Locales 200: (none). en size=None sha256=`None`.
- Locales not saved: {'en': 302, 'fr': 302, 'zh': 302, 'de': 302, 'es': 302, 'pt': 302, 'it': 302, 'ja': 302, 'ko': 302, 'ar': 302, 'tr': 302, 'pl': 302, 'vi': 302, 'id': 302}.
