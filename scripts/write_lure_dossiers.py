#!/usr/bin/env python3
"""Turn decompiled/lures/<host>.json into one dossier per live lure."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "decompiled" / "lures"
OUT = SRC

NOTES = {
    "pumpanakin.fun": [
        "The document is now behind Cloudflare's managed challenge. `/`, `/index.html`, `/connect`, `/airdrop`, `/claim`, `/app`, `/swap`, `/home`, `/login`, `/presale` all return 403 with title \"Just a moment...\".",
        "The kit is not behind that wall: `/_nuxt/assets/index.js` is still the reference bundle (200, 1,034,759 bytes). POST `/api/visit?source=deep-dump` returns `ok`. The lure HTML from the earlier capture is still `archive/pumpanakin.fun/`.",
    ],
    "solme.top": [
        "Same split as pumpanakin. The HTML paths are a Cloudflare challenge, so this egress still has no copy of the page. urlscan's last title for the host is \"solme.top — Sol Sniper Bot\".",
        "The kit bundle and the full API answer on this host anyway (reference bundle, visit `ok`, 14 locales, config plaintext 160).",
    ],
    "luna-start.trade": [
        "Same split as pumpanakin. HTML paths are a Cloudflare challenge. urlscan's last title is \"Luna Launch\".",
        "Kit bundle and API are open on this host (reference bundle, visit `ok`, 14 locales, config plaintext 160).",
    ],
    "isen.fund": [
        "The costume was replaced. The live page is 4,013 bytes titled \"TechWave Solutions - Android Development\" (generic Android-agency template). It does not reference `_nuxt/assets/index.js`. The only inline script sets `Email: info@${location.host}`.",
        "The kit is still mounted beside that page: `/_nuxt/assets/index.js` is the reference bundle, and POST `/api/visit` returns `ok`. Costume and backend have diverged on this host.",
    ],
    "oshivault.com": [
        "The live document is a Save Page WE single-file archive (`savepage_ShadowLoader`, 107 `savepage` markers), not a build that serves its assets. Hashed paths inside it (`/assets/index-ECcU59bs.js`, `/assets/routes-CBdYjFgA.js`, `/assets/styles-CTt8BOf7.css`, `/__l5e/events.270c78a44fc53e7b.js`, the oshi logo) return 404 HTML.",
        "The archive still loads the kit: one `../../_nuxt/assets/index.js` and one `openModal`. Lovable fingerprints are intact (59 `lovable` mentions, `cdn.gpteng.co/lovable.js`, an \"Edit with\" control). \"OSH\" appears 34 times. Reference bundle and the v1 config are on this origin.",
    ],
    "dexscreener.fyi": [
        "This host is costume only. Every operator path, including POST `/api/visit`, is 404. The kit script points at `neatly-resonant.ext-helper.cc`, and that host is the one that returns visit `ok` and the v1 config.",
        "The 23 KB inline script is a dexscreener-style token helper (`/api/v3/coins/solana/contract/`, ipfs.io, arweave, cloudflare-ipfs). It is not the drainer.",
    ],
    "updog.pumptracker.store": [
        "The costume origin is a static site. POST `/api/visit`, `/api/handler`, `/api/process`, `/api/c/i`, `/api/stats` are all 405, and GET `/api/locales` returns the HTML page.",
        "The kit is cross-origin at `radar-nutmeg.stockbox.cfd`. POST `/api/visit?source=deep-dump` there returns `ok` (`text/plain`, `access-control-allow-origin: *`). Three costume scripts were saved, including a 10 KB inline that calls `openModal`.",
    ],
    "vaultspin.win": [
        "Title on this fetch is \"Phantom\". urlscan's 2026-11-11 title for the same host was \"ClaudeTrade — trading agents\".",
        "The page is one 947,015-byte inline script: a Phantom UI clone. It writes `phantom-wallets-v2`, `phantom-account`, `phantom-notif`, `phantom-alerts`, `phantom-demo-chats` and calls CoinGecko `/api/v3/coins/markets`, `/api/v3/coins/`, `/api/v3/search/trending`. It does not contain `openModal` or the kit. The kit is a separate tag, `../../_nuxt/assets/index.js`, served from this origin as the reference bundle.",
    ],
    "amlbot.rest": [
        "The HTML asks for `https://amlbot.store/_nuxt/assets/index.js` first. `amlbot.store` is still NXDOMAIN. The same path on `amlbot.rest` itself returns the reference bundle (200, 1,034,759).",
        "29 same-origin assets saved (images and CSS). The page logic is inline, including a 64 KB script that mentions `solana` and a 3.3 KB loader. No separate costume bundle.",
    ],
    "pumpstreams.expl.live": [
        "The HTML names `voicechat.fun` for the kit. That host is still NXDOMAIN. `https://pumpstreams.expl.live/_nuxt/assets/index.js` is the reference bundle.",
        "The inline app calls the real Dexscreener API (`/latest/dex/search`), embeds `dexscreener.com/solana/${token}?embed=1`, and links `solscan.io/token/`. That is costume data, not the operator API.",
    ],
    "solchaindapps.com": [
        "1.6 MB \"Home | Meteora\" page. The kit is not a static tag. An inline script reads `window.location.hostname` and injects `https://${domain}/_nuxt/assets/index.js`. That URL currently returns the reference bundle; a hard-coded asset `/points/point-button-bg.png` is 404.",
        "External references are the real Meteora and Jupiter sites (`app.meteora.ag`, `preview.jup.ag`), used as costume chrome.",
    ],
    "juphub.ink": [
        "Not a lure page anymore. Every path 301s to `https://web-jupiter.st/`. Six repeats did not vary. POST `/api/visit` on this host is the 301, not `ok`.",
    ],
    "juplaunch.ink": [
        "Same as juphub.ink: permanent 301 to `https://web-jupiter.st/` on `/` and on the API paths.",
    ],
    "solswap.ink": [
        "Permanent 301 to `https://solswap.st/` (new host, not in the previous dump). No costume and no API on solswap.ink itself.",
    ],
    "web-meteora.com": [
        "Permanent 301 to `https://web-meteora.st/`. The costume HTML captured earlier in the day was the redirect target, not this host.",
    ],
    "web-jupiter.st": [
        "OpenResty rotator, not an origin that serves the kit. Each GET `/` is 302 to `https://<offer>/en?click_id=<uuid>` and sets `tr_dec` (30 min) and `tr_off_487=<offer>` (30 days) on `.web-jupiter.st`.",
        "Six hits from this egress landed on: launchpad.web-jupiter.gd, swap-jup.ag-wc.ink (twice), tracker.web-jupiter.gd, app-jup.ag-wc.ink, www-jup.ag-wc.ink. An earlier hit the same hour landed on jup.ag-wc.ink. POST `/api/*` on web-jupiter.st itself is 404.",
    ],
    "solswap.st": [
        "Same OpenResty rotator as web-jupiter.st, cookie domain `.solswap.st`. Six hits landed on login.web-jupiter.gd, launchpad.web-jupiter.gd (three), tracker.web-jupiter.gd, app-jup.ag-wc.ink. First hit of the hour was app-jup.ag-wc.ink.",
    ],
    "web-meteora.st": [
        "OpenResty rotator that does not rotate. Six hits all 302 to `https://meteora.ag-v2.ink/en.html?click_id=<uuid>` with `tr_off_487=meteora.ag-v2.ink`. POST `/api/*` here is 404. web-meteora.com is only the 301 in front of this.",
    ],
}

TDS_JUPITER = (
    "Landing `/en` is one Jupiter costume, byte-identical across the pool "
    "(279,383 bytes, sha256 `82132d56fa6fea61…`, title \"Jupiter: The Home of Onchain Finance\"). "
    "It loads the kit from `https://punctuate-atop.stockbox.cfd/_nuxt/assets/index.js` and calls `openModal` once. "
    "`/api/config` and `/api/is-banned` on this host are nginx 404. The operator API is only on the stockbox host. "
    "Saved copy: `archive/sibling_lures/_tds_landings/jupiter_en.html`."
)
TDS_METEORA = (
    "Landing `/en.html` is one Meteora costume, byte-identical across the pool "
    "(2,468,508 bytes, sha256 `61814dbf350d1e59…`, title \"Home | Meteora\", Last-Modified 2026-11-05). "
    "Kit script is `https://punctuate-atop.stockbox.cfd/_nuxt/assets/index.js`. This host has no `/api/config`. "
    "Saved copy: `archive/sibling_lures/_tds_landings/meteora_en.html`."
)
for h in ("tracker.web-jupiter.gd", "launchpad.web-jupiter.gd", "login.web-jupiter.gd",
          "jup.ag-wc.ink", "swap-jup.ag-wc.ink", "app-jup.ag-wc.ink", "www-jup.ag-wc.ink"):
    NOTES[h] = [TDS_JUPITER, "Reached only via the web-jupiter.st / solswap.st click_id redirect. `/` without `/en` was 403 earlier the same day."]
for h in ("meteora.ag-v2.ink", "sol-meteora.ag-v2.ink", "www-meteora.ag-v2.ink"):
    NOTES[h] = [TDS_METEORA, "Reached via web-meteora.st `click_id`. `/` without `/en.html` was 403 to this egress."]

POST_ORDER = [
    "POST /api/visit?source=deep-dump",
    "POST /api/handler",
    "POST /api/process",
    "POST /api/c/i",
    "POST /api/stats {}",
]


def hosts_of(urls):
    out = []
    for u in urls:
        try:
            from urllib.parse import urlparse
            h = urlparse(u).hostname
        except Exception:
            continue
        if h and h not in out:
            out.append(h)
    return out


def post_line(p):
    if not p:
        return "not probed"
    st = p.get("status") or p.get("error")
    raw = (p.get("body") or "").replace("\n", " ")
    if raw and not raw.isprintable():
        body = f"<{p.get('size')} bytes, not text>"
    else:
        body = raw[:70]
    extra = []
    if p.get("acao"):
        extra.append(f"acao={p['acao']}")
    if p.get("location"):
        extra.append(f"→ {p['location']}")
    tail = (" " + " ".join(extra)) if extra else ""
    return f"{st} {body}{tail}".strip()


def write_one(host, row):
    lines = [f"# {host}", ""]
    lines.append(f"Fetched {row.get('fetched', '2026-11-13')}. IP `{row.get('ip') or row.get('dns_error') or 'n/a'}`.")
    lines.append("")
    for n in NOTES.get(host, []):
        lines.append(n)
        lines.append("")
    html = row.get("html") or {}
    root = row.get("root") or {}
    if html:
        lines.append("## Page")
        lines.append("")
        lines.append(f"- Title: {html.get('title') or '(none)'}")
        lines.append(f"- {html.get('bytes')} bytes, sha256 `{html.get('sha256')}`")
        if html.get("bom"):
            lines.append("- File starts with a UTF-8 BOM.")
        lines.append(f"- Kit script refs: `{html.get('kit_refs')}`")
        lines.append(f"- Inline scripts: {html.get('inline_scripts')} ({html.get('inline_bytes')} bytes). click_id={html.get('click_id')} turnstile={html.get('turnstile')}")
        sample = (html.get("text_sample") or "").strip()
        if sample:
            lines.append(f"- Visible text: {sample[:500]}")
        lines.append("")
    elif root:
        lines.append("## Page")
        lines.append("")
        lines.append(f"- `GET /` → {root.get('status') or root.get('error')} location=`{root.get('location')}`")
        if root.get("body"):
            lines.append(f"- Body: {root['body'][:180]}")
        if row.get("path_probe"):
            sts = sorted({(v.get("status"), v.get("costume")) for v in row["path_probe"].values()})
            lines.append(f"- Probed {len(row['path_probe'])} extra paths. Statuses: {sts}. None was a costume page." if not any(v.get("costume") for v in row["path_probe"].values()) else f"- Costume path: {row.get('costume_path')}")
        lines.append("")
    kit = row.get("kit") or {}
    if kit.get("sha256") or kit.get("status") or kit.get("error"):
        lines.append("## Kit bundle")
        lines.append("")
        if kit.get("sha256"):
            lines.append(f"- `{kit.get('url')}` → {kit.get('size')} bytes, sha256 `{kit.get('sha256')}`, reference={kit.get('reference')}.")
        else:
            lines.append(f"- Fetch failed: status={kit.get('status')} error={kit.get('error')} body={kit.get('body','')[:120]}")
        lines.append("")
    saved = [a for a in (row.get("assets") or []) if a.get("saved")]
    failed = [a for a in (row.get("assets") or []) if not a.get("saved")]
    if saved or failed:
        lines.append("## Costume files")
        lines.append("")
        if saved:
            lines.append("Saved under `archive/sibling_lures/" + host + "/site/`:")
            for a in saved:
                lines.append(f"- `{a['saved']}` {a['size']} bytes `{a['sha256'][:16]}`")
        if failed:
            lines.append("Referenced but not a file:")
            for a in failed:
                lines.append(f"- {a.get('status') or a.get('error')} {a.get('url')}")
        lines.append("")
    js = (row.get("js") or []) + (row.get("inline") or [])
    interesting = [j for j in js if j.get("apis") or j.get("storage_keys") or j.get("websockets") or j.get("wallet_hits") or j.get("urls")]
    if interesting:
        lines.append("## What the costume code does")
        lines.append("")
        for j in interesting:
            bits = [f"`{j['file']}` {j['bytes']} bytes"]
            if j.get("wallet_hits"):
                bits.append("hits " + ", ".join(j["wallet_hits"]))
            if j.get("apis"):
                bits.append("apis " + ", ".join(j["apis"][:8]))
            if j.get("storage_keys"):
                bits.append("storage " + ", ".join(j["storage_keys"][:8]))
            if j.get("websockets"):
                bits.append("ws " + ", ".join(j["websockets"][:4]))
            if j.get("urls"):
                bits.append("urls " + ", ".join(j["urls"][:6]))
            lines.append("- " + ". ".join(bits) + ".")
        lines.append("")
    ext = hosts_of(row.get("external") or [])
    if ext:
        lines.append("## Off-origin hosts named by the page")
        lines.append("")
        lines.append(", ".join(f"`{h}`" for h in ext[:25]))
        lines.append("")
    api = row.get("api") or {}
    if api.get("posts"):
        lines.append("## This host's API")
        lines.append("")
        lines.append("Inert probes only: empty body, no wallet, no signed transaction. Visit uses the kit's own POST-with-query shape.")
        lines.append("")
        for k in POST_ORDER:
            lines.append(f"- `{k}` → {post_line(api['posts'].get(k))}")
        gets = api.get("gets") or {}
        for p in ("/api/config", "/api/is-banned", "/api/stats", "/api/visit"):
            g = gets.get(p) or {}
            if g:
                lines.append(f"- `GET {p}` → {post_line(g)}")
        locs = api.get("locales") or {}
        ok = sorted(k for k, v in locs.items() if v.get("sha256"))
        bad = {k: v.get("error") or v.get("status") for k, v in locs.items() if not v.get("sha256")}
        if locs:
            en = locs.get("en") or {}
            lines.append(f"- Locales 200: {', '.join(ok) or '(none)'}. en size={en.get('size')} sha256=`{str(en.get('sha256'))[:16]}`.")
            if bad and host == "eligibility-zkpass.org":
                lines.append("- `it` timed out in the sweep. A retry returned 200, 441 bytes, a 10-element array. Index 6 is \"Eseguire transazioni senza conferma\".")
            elif bad and host == "rolldice.icu":
                lines.append("- `es` timed out in the sweep. A retry returned 200, 405 bytes, a 10-element array. Index 6 is \"Realice transacciones sin confirmación\".")
            elif bad:
                lines.append(f"- Locales not saved: {bad}.")
        lines.append("")
    kapi = row.get("kit_api")
    if kapi and kit.get("host") and kit.get("host") != host:
        lines.append(f"## Kit host `{kit['host']}`")
        lines.append("")
        for k in POST_ORDER:
            lines.append(f"- `{k}` → {post_line(kapi['posts'].get(k))}")
        lines.append("")
    text = "\n".join(lines).rstrip() + "\n"
    (OUT / f"{host}.md").write_text(text, encoding="utf-8")


def main():
    rows = []
    for p in sorted(SRC.glob("*.json")):
        if p.name.startswith("_"):
            continue
        rows.append(json.loads(p.read_text(encoding="utf-8")))
    by = {r["host"]: r for r in rows}
    for host, row in by.items():
        write_one(host, row)
    # Landings that were not in the deep-dump JSON get a dossier from notes alone.
    for host in NOTES:
        if host not in by:
            write_one(host, {"host": host, "fetched": "2026-11-13T11:26Z"})
    index = ["# Live lures, one by one", "",
             "Captured 2026-11-13. Each file in this directory is one host. The shared facts, stated once: every host that actually serves `/_nuxt/assets/index.js` serves sha256 `0735606691bbdf35…f9ea6a2`, and every host that decrypts `/api/config` still decrypts to the v1 set (HrmfWTNd…, 7oHgTZjN…, 7mfxYcwy…, max 500, min 1, USDC, sibling trongame.fun, plaintext 160). What follows is where they are not the same.",
             "",
             "| Host | Page | Kit from | Visit on this host |",
             "|---|---|---|---|"]
    def visit_of(row):
        posts = ((row.get("api") or {}).get("posts") or {})
        p = posts.get("POST /api/visit?source=deep-dump") or {}
        if not p:
            return "see note"
        loc = p.get("location") or ""
        return f"{p.get('status') or p.get('error')} {loc}".strip()
    KIT_FIX = {
        "amlbot.rest": "amlbot.rest (page names dead amlbot.store)",
        "pumpstreams.expl.live": "pumpstreams.expl.live (page names dead voicechat.fun)",
        "solchaindapps.com": "solchaindapps.com (script src = location.hostname)",
        "solswap.st": "none (rotator)",
    }
    LANDING = {h for h in NOTES if h not in by and h != "solswap.st"}
    for host in sorted(set(by) | set(NOTES)):
        row = by.get(host) or {}
        html = row.get("html") or {}
        title = str(html.get("title") or (row.get("root") or {}).get("status") or "")
        title = title.replace("|", "/")
        kit = (row.get("kit") or {}).get("host") or ""
        if host in LANDING:
            title = "Meteora /en.html" if "meteora" in host else "Jupiter /en"
            kit = "punctuate-atop.stockbox.cfd"
        if host == "solswap.st":
            title, kit = "OpenResty rotator", "none"
        kit = KIT_FIX.get(host, kit)
        index.append(f"| `{host}` | {title} | {kit or '—'} | {visit_of(row)} |")
    index += ["",
              "Redirect and click_id detail is in the gateway files (`web-jupiter.st`, `solswap.st`, `web-meteora.st`) and the landing files.",
              "Raw records: `decompiled/lures/<host>.json`. Costume bytes: `archive/sibling_lures/<host>/site/`.",
              ""]
    (OUT / "INDEX.md").write_text("\n".join(index), encoding="utf-8")
    print(f"wrote {len(list(OUT.glob('*.md')))} markdown files")


if __name__ == "__main__":
    main()
