#!/usr/bin/env node
/**
 * Drift watcher for the pumpanakin/hexfomo lure family.
 *
 * GET-only checks, no wallet, no POSTs:
 *   - bundle SHA-256 per host (rebuild detection)
 *   - /api/config decrypt per host (receiver rotation, sibling/connect-domain
 *     rotation, appended-field changes)
 *   - locale language set (targeting expansion)
 *   - DNS for prewired-but-dead hosts (amlbot.store, lens-badland.fontstack.cc,
 *     voicechat.fun, hexfomo.fun, trongame.fun — coming-online detection)
 *
 * Usage:  node scripts/monitor.js
 * Output: one JSON line appended to data/live/watch_log.jsonl
 *         and a human summary on stdout. Diff lines in the log to see drift.
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

const HOSTS = [
  "pumpanakin.fun", "arvoniq.com", "vaultspin.win", "dexfi.app",
  "paybackpump.fun", "amlbot.rest", "rolldice.icu", "daddysdogg.com",
  "isen.fund", "allocationclaim.com", "boom-frog.xyz",
  "eligibility-zkpass.org", "pumpswap.rest", "app.dextools.info",
  "solchaindapps.com", "pumpstreams.expl.live",
  "neatly-resonant.ext-helper.cc", "easyinvest7.biz", "petramon.xyz",
];
const WATCH_DNS = ["amlbot.store", "lens-badland.fontstack.cc", "voicechat.fun", "hexfomo.fun", "trongame.fun"];
const LANGS = ["en", "fr", "zh", "de", "es", "pt", "it", "ja", "ko", "ar", "tr", "pl", "vi", "ru", "uk", "nl", "th", "id", "hi"];

function b58(buf) {
  let n = 0n;
  for (const b of buf) n = n * 256n + BigInt(b);
  let s = "";
  while (n > 0n) { s = B58[Number(n % 58n)] + s; n /= 58n; }
  for (const b of buf) { if (b === 0) s = "1" + s; else break; }
  return s;
}
function get(url, max = 2000000) {
  return new Promise((resolve) => {
    const req = https.get(url, { headers: { "User-Agent": UA }, timeout: 15000 }, (res) => {
      const chunks = []; let size = 0;
      res.on("data", (c) => { size += c.length; if (size <= max) chunks.push(c); });
      res.on("end", () => resolve({ status: res.statusCode, size, body: Buffer.concat(chunks) }));
    });
    req.on("error", (e) => resolve({ error: e.code || e.message }));
    req.on("timeout", () => { req.destroy(); resolve({ error: "timeout" }); });
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
  let o = maxOff + 16 + 16 + 4; // floats + params + sibling len byte… use len-prefixed reads:
  // simpler: scan for printable domain + symbol
  const text = pt.toString("latin1");
  const dom = (text.match(/[a-z0-9-]+\.(fun|xyz|cc|biz|rest|store|app|com|win|fund)/) || [null])[0];
  const sym = (text.match(/(USDC|USDT|SOL)/) || [null])[0];
  return {
    receivers: pubs,
    max: pt.readDoubleBE(maxOff),
    min: pt.readDoubleBE(maxOff + 8),
    sibling: dom,
    token: sym,
    pt_len: pt.length,
    trailing_hex: pt.subarray(pt.length - 40).toString("hex"),
  };
}

(async () => {
  const run = { ts: new Date().toISOString(), hosts: {}, locales: {}, dns: {}, alerts: [] };
  let refConfig = null;

  for (const h of HOSTS) {
    const row = {};
    const js = await get(`https://${h}/_nuxt/assets/index.js`);
    if (js.error) row.bundle = { error: js.error };
    else if (js.status !== 200) row.bundle = { status: js.status };
    else {
      const sha = crypto.createHash("sha256").update(js.body).digest("hex");
      row.bundle = { status: 200, sha256: sha };
      if (sha !== REF_BUNDLE) run.alerts.push(`BUNDLE CHANGED on ${h}: ${sha.slice(0, 16)}`);
    }
    const cfg = await get(`https://${h}/api/config`, 20000);
    if (!cfg.error && cfg.status === 200 && cfg.size > 20 && cfg.size < 5000) {
      try {
        const dec = decryptConfig(h, cfg.body);
        row.config = dec;
        if (!refConfig) refConfig = dec;
        else if (JSON.stringify(dec.receivers) !== JSON.stringify(refConfig.receivers))
          run.alerts.push(`RECEIVER SPLIT on ${h}: ${JSON.stringify(dec.receivers.map(r => r.slice(0, 8)))}`);
        if (dec.sibling !== (refConfig && refConfig.sibling))
          run.alerts.push(`SIBLING DIFFERS on ${h}: ${dec.sibling}`);
        if (dec.pt_len !== (refConfig && refConfig.pt_len))
          run.alerts.push(`CONFIG LAYOUT on ${h}: pt ${dec.pt_len} bytes`);
      } catch (e) { row.config = { decrypt_error: String(e.message || e) }; }
    } else row.config = { status: cfg.status || null, error: cfg.error || null };
    run.hosts[h] = row;
  }

  for (const lang of LANGS) {
    const r = await get(`https://pumpanakin.fun/api/locales?lang=${lang}`, 8000);
    if (!r.error && r.status === 200) run.locales[lang] = r.size;
  }
  run.locale_set = Object.keys(run.locales).sort();

  for (const h of WATCH_DNS) {
    try { run.dns[h] = (await dns.lookup(h)).address; run.alerts.push(`DNS NOW LIVE: ${h} -> ${run.dns[h]}`); }
    catch { run.dns[h] = null; }
  }

  const logPath = path.join(__dirname, "..", "decompiled", "live", "watch_log.jsonl");
  fs.appendFileSync(logPath, JSON.stringify(run) + "\n");
  console.log("checked", Object.keys(run.hosts).length, "hosts |", run.locale_set.length, "locales |", "alerts:", run.alerts.length);
  for (const a of run.alerts) console.log("  !", a);
  if (refConfig) console.log("config:", JSON.stringify({ receivers: refConfig.receivers.map(r => r.slice(0, 10) + "…"), sibling: refConfig.sibling, token: refConfig.token, pt_len: refConfig.pt_len }));
  console.log("appended to", logPath);
})();
