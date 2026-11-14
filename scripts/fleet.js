#!/usr/bin/env node
/**
 * Fleet dumper for the pumpanakin/hexfomo drainer family.
 *
 * Full per-host capture, GET-only, no wallet, no POSTs:
 *   - DNS resolve (fast-fail NXDOMAIN)
 *   - GET /                       -> index.html (+ title, server, asset refs)
 *   - GET kit bundle              -> sha256 vs reference; saved only if a variant
 *     (same-origin /_nuxt/assets/index.js, or the cross-origin host named in the HTML)
 *   - GET /api/config (and /api/config/) -> api_config.bin + decrypted api_config.json
 *   - GET /api/is-banned
 *   - GET /api/locales?lang=en    -> compared to data/live/locales_en.json
 *   - same-origin page assets < 250 KB (scripts/styles only, media skipped)
 *
 * SPA-fallback safe: responses whose body starts with "<" are recorded as
 * served_html_fallback instead of being mistaken for assets (this bit the
 * 2026-11-13 newfleet pass on updog.pumptracker.store).
 *
 * Never clobbers older evidence: existing files get a _YYYY-MM-DD suffix;
 * variant bundles are content-addressed bundle_<sha8>.js.
 *
 * Usage:  node scripts/dump_fleet.js [--concurrency 4]
 * Output: archive/siblings/<host>/... + archive/siblings/manifest_dump_<date>.json
 */
const crypto = require("crypto");
const fs = require("fs");
const https = require("https");
const dns = require("dns").promises;
const path = require("path");

const SALT = "B3ui3QZFrOPoGW7oMZgE4A";
const REF_BUNDLE = "0735606691bbdf35d38d7531c0e48363a21ef6f7224ebce2908a1b487f9ea6a2";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";
const B58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const ROOT = path.join(__dirname, "..");
const OUT_BASE = path.join(ROOT, "archive", "sibling_lures");
const DATE = new Date().toISOString().slice(0, 10);
const MAX_ASSET = 250000;

// Every known fleet host except pumpanakin.fun (already fully archived).
// Sources: data/iocs.json sibling_lures_2026_11_11, urlscan pivot
// clusters, new_fleet_2026_11_13, connect/payload hosts, prewired dead hosts.
const HOSTS = [
  // -- sibling lures (2026-11-11 sweep)
  "airdrop-floatlaunch.xyz", "claim-floatlaunch.xyz", "rank-floatlaunch.xyz",
  "www-meteora.ag-v2.ink", "sol-meteora.ag-v2.ink", "meteora.ag-v2.ink",
  "meteora-exchange.pages.dev", "meteora-exchange-1yz.pages.dev", "meteora-exchange-5eq.pages.dev",
  "moonshot-claim.pages.dev",
  "login.web-jupiter.gd", "tracker.web-jupiter.gd", "app.web-jupiter.gd", "launchpad.web-jupiter.gd",
  "jupiter-verify.xyz",
  "arvoniq.com", "dexfi.app", "solme.top", "vaultspin.win", "luna-start.trade",
  "pumpswap.rest", "dexscreener.fyi", "app.dextools.info", "paybackpump.fun",
  "isen.fund", "allocationclaim.com", "boom-frog.xyz", "eligibility-zkpass.org",
  "rolldice.icu", "daddysdogg.com", "amlbot.rest", "solchaindapps.com",
  "cryptocommerceohpmigration.online", "pumpstreams.expl.live",
  // -- urlscan hash-pivot clusters (2026-11-13)
  "jup.solroom.cc", "jupiter.solroom.cc", "juplter.solroom.cc", "jup-ag.solroom.cc", "jup-dex.solroom.cc",
  "jup.ag-wc.ink", "www-jup.ag-wc.ink", "swap-jup.ag-wc.ink",
  "web-meteora.com", "web-meteora.at", "web-meteora.st", "web-jupiter.st",
  "juphub.ink", "juplaunch.ink", "solswap.ink",
  // -- new fleet (2026-11-13)
  "oshivault.com", "solbarn.cc", "scamsem.solbarn.cc",
  "pumpstreamhub.live", "pumptracker.store", "updog.pumptracker.store",
  // -- connect / payload backends
  "petramon.xyz", "easyinvest7.biz", "neatly-resonant.ext-helper.cc",
  "stockbox.cfd", "radar-nutmeg.stockbox.cfd", "punctuate-atop.stockbox.cfd",
  // -- prewired but dead (coming-online detection)
  "trongame.fun", "amlbot.store", "lens-badland.fontstack.cc", "voicechat.fun", "hexfomo.fun",
];

function b58(buf) {
  let n = 0n;
  for (const b of buf) n = n * 256n + BigInt(b);
  let s = "";
  while (n > 0n) { s = B58[Number(n % 58n)] + s; n /= 58n; }
  for (const b of buf) { if (b === 0) s = "1" + s; else break; }
  return s;
}

function sha256(buf) { return crypto.createHash("sha256").update(buf).digest("hex"); }
function looksHtml(buf) {
  // skip UTF-8 BOM before checking for "<" (oshivault.com serves BOM-prefixed HTML)
  let i = 0;
  if (buf.length > 3 && buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) i = 3;
  return buf.length > i && buf[i] === 0x3c;
}

function get(url, max = 2000000, redirects = 2, chain = []) {
  return new Promise((resolve) => {
    let req;
    try {
      req = https.get(url, { headers: { "User-Agent": UA }, timeout: 15000 }, (res) => {
        const loc = res.headers.location;
        if ([301, 302, 307, 308].includes(res.statusCode) && loc && redirects > 0) {
          res.resume();
          const next = new URL(loc, url).toString();
          resolve(get(next, max, redirects - 1, [...chain, `${res.statusCode}->${next}`]));
          return;
        }
        const chunks = []; let size = 0;
        res.on("data", (c) => { size += c.length; if (size <= max) chunks.push(c); });
        res.on("end", () => resolve({
          status: res.statusCode, size, body: Buffer.concat(chunks),
          server: res.headers["server"] || null, chain,
        }));
      });
    } catch (e) { resolve({ error: String(e.message || e) }); return; }
    req.on("error", (e) => resolve({ error: e.code || e.message, chain }));
    req.on("timeout", () => { req.destroy(); resolve({ error: "timeout", chain }); });
  });
}

function decryptConfig(host, blob) {
  const key = crypto.createHash("sha256").update(host + SALT).digest();
  const d = crypto.createDecipheriv("aes-256-gcm", key, blob.subarray(0, 12));
  d.setAuthTag(blob.subarray(blob.length - 16));
  const pt = Buffer.concat([d.update(blob.subarray(12, blob.length - 16)), d.final()]);
  const count = pt[4];
  const pubs = [];
  for (let i = 0; i < count; i++) pubs.push(b58(pt.subarray(8 + i * 32, 8 + i * 32 + 32)));
  const maxOff = 8 + count * 32;
  const text = pt.toString("latin1");
  const dom = (text.match(/[a-z0-9-]+\.(fun|xyz|cc|biz|rest|store|app|com|win|fund|ink|cfd|live|trade|online)/) || [null])[0];
  const sym = (text.match(/(USDC|USDT|SOL)/) || [null])[0];
  return {
    pt_len: pt.length,
    receivers: pubs,
    max: pt.readDoubleBE(maxOff),
    min: pt.readDoubleBE(maxOff + 8),
    sibling: dom,
    token: sym,
    plaintext_hex: pt.toString("hex"),
  };
}

function extractAssets(html, base) {
  const out = new Set();
  for (const m of html.matchAll(/(?:src|href)\s*=\s*["']([^"']+)["']/gi)) {
    try { out.add(new URL(m[1], base).toString()); } catch {}
  }
  return [...out];
}

function saveNoClobber(dir, name, buf) {
  fs.mkdirSync(dir, { recursive: true });
  let p = path.join(dir, name);
  if (fs.existsSync(p)) {
    const ext = path.extname(name);
    p = path.join(dir, `${name.slice(0, -ext.length)}_${DATE}${ext}`);
    if (fs.existsSync(p) && sha256(fs.readFileSync(p)) === sha256(buf)) return path.basename(p); // identical re-capture
  }
  fs.writeFileSync(p, buf);
  return path.basename(p);
}

async function dumpHost(host, refLocaleSha) {
  const row = { host };
  try { row.ip = (await dns.lookup(host)).address; }
  catch { row.dns = null; return row; }

  const dir = path.join(OUT_BASE, host);
  const page = await get(`https://${host}/`);
  if (page.error) { row.error = page.error; return row; }
  row.status = page.status;
  row.server = page.server;
  if (page.chain.length) row.redirects = page.chain;
  let assets = [];
  if (page.status === 200 && looksHtml(page.body)) {
    const html = page.body.toString("utf-8");
    row.html_bytes = page.size;
    row.html_sha256 = sha256(page.body);
    row.title = ((html.match(/<title[^>]*>([^<]*)<\/title>/i) || [])[1] || "").trim() || null;
    row.saved_html = saveNoClobber(dir, "index.html", page.body);
    assets = extractAssets(html, `https://${host}/`);
    row.page_assets = assets;
  } else if (page.status === 200) {
    row.non_html_root = page.body.subarray(0, 32).toString("hex");
  }
  // NOTE: no early return — backend hosts 404 the root but still serve
  // bundle + /api/config + /api/locales (petramon.xyz, easyinvest7.biz,
  // neatly-resonant.ext-helper.cc, *.stockbox.cfd pattern).

  // --- kit bundle: prefer the URL the page actually names; on failure fall
  // back to the same origin (amlbot.rest names NXDOMAIN amlbot.store first)
  const named = assets.find((a) => a.includes("_nuxt/assets/index.js"));
  let bundleUrl = named || `https://${host}/_nuxt/assets/index.js`;
  if (named && new URL(named).host !== host) row.kit_host = new URL(named).host;
  let bun = await get(bundleUrl, 3000000);
  if ((bun.error || bun.status !== 200) && bundleUrl !== `https://${host}/_nuxt/assets/index.js`) {
    const retry = await get(`https://${host}/_nuxt/assets/index.js`, 3000000);
    if (!retry.error && retry.status === 200) { bun = retry; bundleUrl = `https://${host}/_nuxt/assets/index.js`; row.bundle_origin_fallback = true; }
  }
  if (bun.error) row.bundle = { error: bun.error, url: bundleUrl };
  else if (bun.status !== 200) row.bundle = { status: bun.status, url: bundleUrl };
  else if (looksHtml(bun.body)) row.bundle = { status: 200, served_html_fallback: true, url: bundleUrl };
  else {
    const sha = sha256(bun.body);
    row.bundle = { status: 200, size: bun.size, sha256: sha, reference: sha === REF_BUNDLE, url: bundleUrl };
    if (sha !== REF_BUNDLE) row.bundle.saved = saveNoClobber(dir, `bundle_${sha.slice(0, 8)}.js`, bun.body);
  }

  // --- backend: /api/config (try trailing slash if bare 404s). When the kit
  // loads cross-origin, the REAL backend is the kit host — probe it too.
  const configHosts = [host];
  if (row.kit_host) configHosts.push(row.kit_host);
  for (const ch of configHosts) {
    const key = ch === host ? "config" : "kit_host_config";
    let cfg = await get(`https://${ch}/api/config`, 20000);
    if (!cfg.error && cfg.status === 404) cfg = await get(`https://${ch}/api/config/`, 20000);
    if (cfg.error) row[key] = { error: cfg.error, host: ch };
    else if (cfg.status !== 200) row[key] = { status: cfg.status, host: ch };
    else if (looksHtml(cfg.body) || cfg.size < 20 || cfg.size > 5000) row[key] = { status: 200, served_html_fallback: looksHtml(cfg.body), size: cfg.size, host: ch };
    else {
      row[key] = { status: 200, wire_bytes: cfg.size, host: ch, saved_bin: saveNoClobber(dir, ch === host ? "api_config.bin" : `api_config_${ch}.bin`, cfg.body) };
      try {
        const dec = decryptConfig(ch, cfg.body);
        row[key] = { ...row[key], ...dec };
        const jp = JSON.stringify({ ...dec, plaintext_hex: undefined }, null, 1);
        row[key].saved_json = saveNoClobber(dir, ch === host ? "api_config.json" : `api_config_${ch}.json`, Buffer.from(jp));
      } catch (e) { row[key].decrypt_error = String(e.message || e); }
    }
  }

  // --- backend: /api/is-banned
  const ban = await get(`https://${host}/api/is-banned`, 8000);
  row.is_banned = ban.error ? { error: ban.error }
    : ban.status === 200 && looksHtml(ban.body) ? { status: 200, served_html_fallback: true }
    : { status: ban.status, body: ban.body.subarray(0, 200).toString("utf-8") };

  // --- backend: /api/locales?lang=en
  const loc = await get(`https://${host}/api/locales?lang=en`, 20000);
  if (loc.error) row.locale_en = { error: loc.error };
  else if (loc.status !== 200) row.locale_en = { status: loc.status };
  else if (looksHtml(loc.body)) row.locale_en = { status: 200, served_html_fallback: true };
  else {
    const lsha = sha256(loc.body);
    row.locale_en = { status: 200, size: loc.size, same_as_pumpanakin: lsha === refLocaleSha };
    if (lsha !== refLocaleSha) row.locale_en.saved = saveNoClobber(dir, `locales_en_${lsha.slice(0, 8)}.json`, loc.body);
  }

  // --- same-origin page assets (scripts/styles only, < 250 KB, media skipped)
  const savedAssets = [];
  for (const a of assets) {
    let u; try { u = new URL(a); } catch { continue; }
    if (u.host !== host) continue;
    if (!/\.(js|css)(\?|$)/i.test(u.pathname)) continue;
    if (u.pathname.includes("_nuxt/assets/index.js")) continue; // bundle handled above
    if (savedAssets.length >= 8) break;
    const r = await get(a, MAX_ASSET);
    if (r.error || r.status !== 200 || looksHtml(r.body) && a.endsWith(".js")) continue;
    const fname = u.pathname.split("/").pop().replace(/[^\w.-]/g, "_") || "asset";
    savedAssets.push(saveNoClobber(dir, fname, r.body));
  }
  if (savedAssets.length) row.saved_assets = savedAssets;

  // per-host manifest (matches existing convention)
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `manifest_${DATE}.json`), JSON.stringify(row, null, 1));
  return row;
}

(async () => {
  const concurrency = Number((process.argv[process.argv.indexOf("--concurrency") + 1] || 4));
  const refLocaleSha = sha256(fs.readFileSync(path.join(ROOT, "decompiled", "live", "locales_en.json")));
  console.log(`[*] ${HOSTS.length} hosts, concurrency ${concurrency}, ref locale sha ${refLocaleSha.slice(0, 12)}`);

  const results = [];
  let i = 0;
  async function worker() {
    while (i < HOSTS.length) {
      const host = HOSTS[i++];
      let row;
      try { row = await dumpHost(host, refLocaleSha); }
      catch (e) { row = { host, script_error: String(e.message || e) }; }
      results.push(row);
      const tag = row.dns === null ? "NXDOMAIN"
        : row.error ? `err:${row.error}`
        : row.status !== 200 ? `http:${row.status || "-"}`
        : `LIVE html:${row.html_bytes || 0} bundle:${row.bundle?.sha256 ? (row.bundle.reference ? "ref" : row.bundle.sha256.slice(0, 8)) : row.bundle?.served_html_fallback ? "html-fallback" : row.bundle?.status || "-"} cfg:${row.config?.receivers ? row.config.pt_len + "b" : row.config?.status || row.config?.error || "-"}`;
      console.log(`[${results.length}/${HOSTS.length}] ${host}: ${tag}`);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));

  const live = results.filter((r) => r.status === 200 && r.html_sha256);
  const variants = results.filter((r) => r.bundle && r.bundle.sha256 && !r.bundle.reference);
  const cfgSets = {};
  for (const r of results) {
    for (const k2 of ["config", "kit_host_config"]) {
      const c = r[k2];
      if (!c || !c.receivers) continue;
      const k = JSON.stringify(c.receivers.map((x) => x.slice(0, 8))) + `|pt${c.pt_len}|${c.sibling}`;
      (cfgSets[k] = cfgSets[k] || []).push(k2 === "config" ? r.host : `${r.host}(${c.host})`);
    }
  }

  const manifest = {
    fetched: new Date().toISOString(),
    hosts_checked: results.length,
    live: live.length,
    bundle_variants: variants.map((r) => ({ host: r.host, sha256: r.bundle.sha256, size: r.bundle.size, saved: r.bundle.saved || null })),
    config_sets: cfgSets,
    results,
  };
  const mpath = path.join(OUT_BASE, `manifest_dump_${DATE}.json`);
  fs.writeFileSync(mpath, JSON.stringify(manifest, null, 1));
  console.log(`\n[+] live ${live.length}/${results.length} | bundle variants: ${variants.length} | distinct config sets: ${Object.keys(cfgSets).length}`);
  for (const [k, hosts] of Object.entries(cfgSets)) console.log(`    cfg ${k}  ->  ${hosts.length} hosts`);
  for (const v of variants) console.log(`    VARIANT ${v.host}: ${v.sha256.slice(0, 16)} (${v.size}b) saved=${v.saved}`);
  console.log(`[+] ${mpath}`);
})();
