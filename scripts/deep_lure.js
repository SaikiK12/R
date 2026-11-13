#!/usr/bin/env node
/**
 * Per-host deep dump of every live lure in the pumpanakin/hexfomo fleet.
 *
 * For each host, separately (not a fleet-wide "same config" pass):
 *   - root HTML + response headers, or the 403/404 body if the page is walled
 *   - path probe when / is not the costume (solme.top, luna-start.trade, payload hosts)
 *   - every same-origin script/style/json/svg/font the page names, then one more
 *     hop through url() and quoted asset paths. The shared kit bundle is hashed,
 *     not stored again.
 *   - inline scripts saved and string-extracted (this is where each costume
 *     wires the kit: openModal, localStorage, origin=)
 *   - GET surface: /api/config /api/is-banned /api/locales (14 langs) /api/stats
 *     /api/visit /api/handler /api/process /api/c/i
 *   - POST surface, inert only: no wallet, no signed transaction, no session blob.
 *     /api/visit?source=deep-dump  (the kit's own beacon shape, empty body)
 *     /api/handler /api/process /api/c/i with an empty body
 *     /api/stats with {}
 *   When the costume loads the kit from a different host, that host is probed
 *   too and the result is cached so six Jupiter clones don't re-hit it.
 *
 * Output:
 *   archive/sibling_lures/<host>/site/**          captured costume files
 *   decompiled/lures/<host>.json                  per-host record
 *   decompiled/lures/_all.json                    index
 *
 * Usage: node scripts/deep_lure.js [--concurrency 3]
 */
const crypto = require("crypto");
const fs = require("fs");
const https = require("https");
const dns = require("dns").promises;
const path = require("path");

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";
const REF_BUNDLE = "0735606691bbdf35d38d7531c0e48363a21ef6f7224ebce2908a1b487f9ea6a2";
const ROOT = path.join(__dirname, "..");
const OUT_JSON = path.join(ROOT, "decompiled", "lures");
const LANGS = ["en", "fr", "zh", "de", "es", "pt", "it", "ja", "ko", "ar", "tr", "pl", "vi", "id"];
const MAX_FILE = 4_000_000;
const MAX_FILES = 80;

// Every host the 2026-11-13 dump showed serving the reference bundle or a
// decrypted /api/config. web-meteora.at is parked and not included.
const HOSTS = [
  "pumpanakin.fun",
  "arvoniq.com", "dexfi.app", "pumpswap.rest", "dexscreener.fyi", "vaultspin.win",
  "paybackpump.fun", "allocationclaim.com", "app.dextools.info", "isen.fund",
  "boom-frog.xyz", "eligibility-zkpass.org", "daddysdogg.com", "rolldice.icu",
  "solchaindapps.com", "amlbot.rest", "pumpstreams.expl.live",
  "juphub.ink", "web-jupiter.st", "web-meteora.st", "web-meteora.com",
  "juplaunch.ink", "solswap.ink",
  "oshivault.com", "scamsem.solbarn.cc", "pumpstreamhub.live", "updog.pumptracker.store",
  "solme.top", "luna-start.trade",
  "solbarn.cc", "easyinvest7.biz", "neatly-resonant.ext-helper.cc",
  "radar-nutmeg.stockbox.cfd", "stockbox.cfd", "punctuate-atop.stockbox.cfd",
];

const PROBE_PATHS = ["/index.html", "/app", "/swap", "/airdrop", "/claim", "/connect", "/home", "/login", "/presale"];

function sha256(buf) { return crypto.createHash("sha256").update(buf).digest("hex"); }
function looksHtml(buf) {
  let i = 0;
  if (buf.length > 3 && buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) i = 3;
  return buf.length > i && buf[i] === 0x3c;
}
function uniq(a) { return [...new Set(a)]; }

function request(url, { method = "GET", body = null, headers = {}, max = 4_000_000 } = {}) {
  return new Promise((resolve) => {
    let u;
    try { u = new URL(url); } catch (e) { resolve({ error: "bad-url" }); return; }
    const opts = {
      method, hostname: u.hostname, path: u.pathname + u.search, timeout: 20000,
      headers: { "User-Agent": UA, Accept: "*/*", ...headers },
    };
    if (body != null) opts.headers["Content-Length"] = Buffer.byteLength(body);
    let req;
    try { req = https.request(opts, (res) => {
      const chunks = []; let size = 0; let truncated = false;
      res.on("data", (c) => {
        size += c.length;
        if (size <= max) chunks.push(c); else truncated = true;
      });
      res.on("end", () => {
        const raw = Buffer.concat(chunks);
        const cookies = res.headers["set-cookie"] || [];
        resolve({
          status: res.statusCode, size, truncated,
          ctype: res.headers["content-type"] || null,
          server: res.headers.server || null,
          acao: res.headers["access-control-allow-origin"] || null,
          location: res.headers.location || null,
          cf_ray: res.headers["cf-ray"] || null,
          cookies: cookies.map((c) => String(c).split(";")[0].split("=")[0]).slice(0, 8),
          body: raw,
        });
      });
    }); } catch (e) { resolve({ error: String(e.message || e) }); return; }
    req.on("error", (e) => resolve({ error: e.code || e.message }));
    req.on("timeout", () => { req.destroy(); resolve({ error: "timeout" }); });
    if (body != null) req.write(body);
    req.end();
  });
}

function snippet(r) {
  if (!r || r.error) return r ? { error: r.error } : { error: "no-response" };
  const text = (r.body || Buffer.alloc(0)).subarray(0, 240).toString("utf-8").replace(/\s+/g, " ").trim();
  return {
    status: r.status, size: r.size, ctype: r.ctype, server: r.server,
    acao: r.acao, location: r.location, cookies: r.cookies,
    html: looksHtml(r.body || Buffer.alloc(0)),
    body: text.slice(0, 180),
  };
}

function decodeEntities(s) { return s.replace(/&amp;/g, "&").replace(/&#38;/g, "&"); }

function collectRefs(text, base) {
  const found = [];
  const add = (raw) => {
    if (!raw || raw.startsWith("data:") || raw.startsWith("blob:") || raw.startsWith("javascript:")) return;
    raw = decodeEntities(raw.trim());
    if (raw.length > 500) return;
    try { found.push(new URL(raw, base).toString()); } catch {}
  };
  for (const re of [
    /(?:src|href|poster|data-src)\s*=\s*["']([^"']+)["']/gi,
    /url\(\s*['"]?([^'")\s]+)['"]?\s*\)/gi,
    /["'](\/[^"']+\.(?:js|css|svg|json|png|jpe?g|webp|gif|ico|woff2?|mp4|webm)(?:\?[^"']*)?)["']/gi,
    /["'](https?:\/\/[^"'\s]+)["']/gi,
  ]) {
    for (const m of text.matchAll(re)) add(m[1]);
  }
  return uniq(found);
}

function wantAsset(u) {
  if (u.pathname.includes("/_nuxt/assets/index.js")) return false; // kit bundle, hashed separately
  return /\.(js|css|svg|json|png|jpe?g|webp|gif|ico|woff2?|mp4|webm|html|txt)$/i.test(u.pathname)
    || u.pathname.includes("/assets/") || u.pathname.includes("/_nuxt/") || u.pathname.includes("/_assets/") || u.pathname.includes("/__l5e/");
}

function safeRel(u) {
  let rel = decodeURIComponent(u.pathname).replace(/^\/+/, "");
  if (!rel || rel.endsWith("/")) rel += "index";
  rel = rel.split("/").filter((p) => p && p !== "." && p !== "..").join("/");
  return rel.slice(0, 180) || "asset";
}

function analyzeJs(buf, name) {
  const s = buf.toString("utf-8");
  const grab = (re) => uniq([...s.matchAll(re)].map((m) => m[1] || m[0])).slice(0, 40);
  const pubs = uniq([...s.matchAll(/\b([1-9A-HJ-NP-Za-km-z]{32,44})\b/g)].map((m) => m[1]))
    .filter((x) => /[A-Z]/.test(x) && /[a-z]/.test(x) && !/^_0x/.test(x));
  return {
    file: name,
    bytes: buf.length,
    sha256: sha256(buf),
    obfuscated: s.includes("嗛=铴") || /Function\(\s*["'][^"']+["']\s*,/.test(s.slice(0, 2000)),
    urls: grab(/https?:\/\/[^\s"'`<>\\]{8,180}/g).map((x) => x.replace(/\\u002F/g, "/")),
    apis: grab(/(\/api\/[a-z0-9_/?=&.-]{1,80})/gi),
    storage_keys: grab(/localStorage(?:\.setItem|\.getItem|\[["'])\(\s*["']([^"']{1,40})["']/g)
      .concat(grab(/localStorage\[["']([^"']{1,40})["']\]/g)),
    websockets: grab(/wss?:\/\/[^\s"'`<>\\]{8,160}/g),
    pubkey_like: pubs.slice(0, 25),
    wallet_hits: uniq(["openModal", "solana", "phantom", "signTransaction", "signAllTransactions", "wallet-adapter"]
      .filter((w) => s.includes(w))),
  };
}

function htmlSignals(buf) {
  let s = buf.toString("utf-8");
  if (s.charCodeAt(0) === 0xfeff) s = s.slice(1);
  const title = ((s.match(/<title[^>]*>([^<]*)<\/title>/i) || [])[1] || "").replace(/\s+/g, " ").trim();
  const kit = uniq([...s.matchAll(/[^"'=\s>]*_nuxt\/assets\/index\.js[^"'<\s]*/g)].map((m) => m[0]));
  const inlines = [];
  for (const m of s.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)) {
    const body = m[1].trim();
    if (body.length >= 40) inlines.push(body);
  }
  const text = s
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&#\d+;/g, " ")
    .replace(/\s+/g, " ").trim();
  return {
    title: title || null,
    bytes: buf.length,
    sha256: sha256(buf),
    bom: buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf,
    kit_refs: kit,
    click_id: /click_id/.test(s),
    turnstile: /turnstile|challenges\.cloudflare\.com/i.test(s),
    inline_scripts: inlines.length,
    inline_bytes: inlines.reduce((n, x) => n + x.length, 0),
    text_sample: text.slice(0, 900),
    inlines,
  };
}

const apiCache = new Map();

async function probeApi(host) {
  if (apiCache.has(host)) return apiCache.get(host);
  const base = `https://${host}`;
  const gets = {};
  for (const p of ["/api/config", "/api/is-banned", "/api/stats", "/api/visit", "/api/handler", "/api/process", "/api/c/i", "/robots.txt"]) {
    gets[p] = snippet(await request(base + p, { max: 20000 }));
  }
  const locales = {};
  for (const lang of LANGS) {
    const r = await request(`${base}/api/locales?lang=${lang}`, { max: 20000 });
    if (r.error) { locales[lang] = { error: r.error }; continue; }
    const html = looksHtml(r.body || Buffer.alloc(0));
    locales[lang] = html || r.status !== 200
      ? { status: r.status, html }
      : { status: 200, size: r.size, sha256: sha256(r.body) };
  }
  const posts = {
    "POST /api/visit?source=deep-dump": snippet(await request(`${base}/api/visit?source=deep-dump`, { method: "POST", max: 8000 })),
    "POST /api/handler": snippet(await request(`${base}/api/handler`, { method: "POST", body: "", headers: { "Content-Type": "application/octet-stream" }, max: 8000 })),
    "POST /api/process": snippet(await request(`${base}/api/process`, { method: "POST", body: "", headers: { "Content-Type": "application/octet-stream" }, max: 8000 })),
    "POST /api/c/i": snippet(await request(`${base}/api/c/i`, { method: "POST", body: "", headers: { "Content-Type": "application/octet-stream" }, max: 8000 })),
    "POST /api/stats {}": snippet(await request(`${base}/api/stats`, { method: "POST", body: "{}", headers: { "Content-Type": "application/json" }, max: 8000 })),
  };
  const out = { gets, locales, posts };
  apiCache.set(host, out);
  return out;
}

async function dumpHost(host) {
  const row = { host, fetched: new Date().toISOString() };
  try { row.ip = (await dns.lookup(host)).address; }
  catch (e) { row.dns_error = e.code || String(e.message || e); return row; }

  const dir = path.join(ROOT, "archive", "sibling_lures", host, "site");
  fs.mkdirSync(dir, { recursive: true });

  const root = await request(`https://${host}/`, { max: MAX_FILE });
  row.root = snippet(root);
  let htmlBuf = null;
  if (!root.error && root.status === 200 && looksHtml(root.body)) htmlBuf = root.body;
  else if (!root.error && root.body && root.body.length) {
    const name = `root_${root.status}.bin`;
    fs.writeFileSync(path.join(dir, name), root.body.subarray(0, 20000));
    row.root_saved = name;
    row.path_probe = {};
    for (const p of PROBE_PATHS) {
      const r = await request(`https://${host}${p}`, { max: 2_000_000 });
      const hit = !r.error && r.status === 200 && looksHtml(r.body) && /_nuxt\/assets\/index\.js|openModal|w3m-modal/.test(r.body.toString("utf-8"));
      row.path_probe[p] = { status: r.status || null, error: r.error || null, size: r.size || 0, costume: hit };
      if (hit && !htmlBuf) { htmlBuf = r.body; row.costume_path = p; break; }
    }
  }
  if (htmlBuf) {
    fs.writeFileSync(path.join(dir, "index.html"), htmlBuf);
    row.html = htmlSignals(htmlBuf);
    const inlineDir = path.join(dir, "inline");
    fs.mkdirSync(inlineDir, { recursive: true });
    row.inline = [];
    row.html.inlines.forEach((src, i) => {
      const name = `inline-${i}.js`;
      fs.writeFileSync(path.join(inlineDir, name), src);
      row.inline.push(analyzeJs(Buffer.from(src), name));
    });
    delete row.html.inlines;
  }

  // Kit bundle: from the HTML if named, else the well-known path.
  let kitUrl = `https://${host}/_nuxt/assets/index.js`;
  const named = (row.html?.kit_refs || []).map((r) => { try { return new URL(r, `https://${host}/`).toString(); } catch { return null; } }).find(Boolean);
  if (named) kitUrl = named;
  const kit = await request(kitUrl, { max: 2000 }); // hash needs full file; cap raised below
  // re-fetch full only to hash. 1MB is fine.
  const kitFull = await request(kitUrl, { max: 3_000_000 });
  if (!kitFull.error && kitFull.status === 200 && !looksHtml(kitFull.body)) {
    const sha = sha256(kitFull.body);
    row.kit = { url: kitUrl, host: new URL(kitUrl).host, size: kitFull.size, sha256: sha, reference: sha === REF_BUNDLE, truncated: kitFull.truncated };
  } else row.kit = snippet(kitFull);
  void kit;

  // Costume assets, breadth-first, same origin only.
  row.assets = [];
  row.external = [];
  row.js = [];
  if (htmlBuf) {
    const origin = new URL(`https://${host}/`);
    const queue = collectRefs(htmlBuf.toString("utf-8"), origin);
    const seen = new Set();
    while (queue.length && row.assets.length < MAX_FILES) {
      const url = queue.shift();
      if (seen.has(url)) continue;
      seen.add(url);
      let u; try { u = new URL(url); } catch { continue; }
      if (u.host !== host) { if (row.external.length < 60) row.external.push(url); continue; }
      if (!wantAsset(u)) continue;
      const r = await request(url, { max: MAX_FILE });
      if (r.error || r.status !== 200 || (looksHtml(r.body) && /\.(js|css)$/i.test(u.pathname))) {
        row.assets.push({ url, status: r.status || null, error: r.error || null, html_fallback: !!(r.body && looksHtml(r.body)) });
        continue;
      }
      const rel = safeRel(u);
      const dest = path.join(dir, rel);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.writeFileSync(dest, r.body);
      const entry = { url, saved: rel, size: r.size, sha256: sha256(r.body), ctype: r.ctype, truncated: r.truncated };
      row.assets.push(entry);
      if (/\.(js|css)$/i.test(u.pathname) && r.body.length < 1_500_000) {
        const more = collectRefs(r.body.toString("utf-8"), url);
        for (const n of more) if (!seen.has(n)) queue.push(n);
      }
      if (/\.js$/i.test(u.pathname) && r.body.length < 2_000_000) row.js.push(analyzeJs(r.body, rel));
    }
    row.external = uniq(row.external);
  }

  row.api = await probeApi(host);
  if (row.kit && row.kit.host && row.kit.host !== host) row.kit_api = await probeApi(row.kit.host);
  return row;
}

(async () => {
  const concurrency = Number(process.argv[process.argv.indexOf("--concurrency") + 1]) || 3;
  fs.mkdirSync(OUT_JSON, { recursive: true });
  console.log(`[*] ${HOSTS.length} hosts, concurrency ${concurrency}`);
  const results = [];
  let i = 0;
  async function worker() {
    while (i < HOSTS.length) {
      const host = HOSTS[i++];
      let row;
      try { row = await dumpHost(host); }
      catch (e) { row = { host, script_error: String(e.stack || e.message || e) }; }
      results.push(row);
      fs.writeFileSync(path.join(OUT_JSON, `${host}.json`), JSON.stringify(row, null, 1));
      const bits = [
        row.root ? `root:${row.root.status || row.root.error}` : "no-dns",
        row.html ? `html:${row.html.bytes}` : (row.costume_path || ""),
        row.kit && row.kit.sha256 ? `kit:${row.kit.reference ? "ref" : row.kit.sha256.slice(0, 8)}@${row.kit.host}` : "",
        `assets:${(row.assets || []).filter((a) => a.saved).length}`,
        `js:${(row.js || []).length}`,
        row.api ? `visit:${row.api.posts["POST /api/visit?source=deep-dump"].status || row.api.posts["POST /api/visit?source=deep-dump"].error}` : "",
      ].filter(Boolean).join(" ");
      console.log(`[${results.length}/${HOSTS.length}] ${host}  ${bits}`);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
  fs.writeFileSync(path.join(OUT_JSON, "_all.json"), JSON.stringify({ fetched: new Date().toISOString(), results }, null, 1));
  console.log(`[+] ${OUT_JSON}`);
})();
