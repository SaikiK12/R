#!/usr/bin/env node
/**
 * Replay fixtures for the pumpanakin/hexfomo kit operator backend.
 *
 * Local impersonation of the operator API for dynamic analysis. Responses
 * come from archived captures where they exist and from the documented
 * binary layouts in decompiled/kit/operator/ otherwise. Every served
 * request is appended to a JSONL run log.
 *
 * Used two ways:
 *   1. --self-check    validate all fixtures (no browser, no server)
 *   2. require()d by scripts/dynamic_run.js, which wires these fixtures
 *      into Playwright request routing so the kit still sees the real
 *      apiHost (config AES key derivation depends on the hostname).
 *
 * Endpoint coverage (decompiled/kit/operator/operator_api.js):
 *   GET  /api/locales?lang=     from decompiled/live/locales_<lang>.json
 *   GET  /api/is-banned         "0"
 *   GET  /api/config            archived ciphertext for the emulated host
 *   POST /api/visit             "ok" (kit beacon shape; query params logged)
 *   POST /api/handler           telemetry sink, 200 {} (layout: AES-GCM events)
 *   POST /api/process           422 {"error":"VALIDATION"} unless body parses
 *                                against buildProcessPayload's 52-byte header
 *   POST /api/c/i               binary session response, layout pinned in
 *                                operator_api.js notifyConnect (SYNTHETIC —
 *                                no live session was ever recorded)
 *   POST /api/c/c/{a}/{b}       200 {}
 *   POST /api/c/f/{a}           200 {}
 *
 * Hard rail: this harness never asks for, accepts, or validates a real
 * signed transaction. /api/process with a parseable body returns 200 and
 * logs the parse; with anything else it returns the live backend's
 * documented 422 fingerprint.
 */
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SALT = "B3ui3QZFrOPoGW7oMZgE4A";
const REF_BUNDLE = "0735606691bbdf35d38d7531c0e48363a21ef6f7224ebce2908a1b487f9ea6a2";

const B58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
function b58(buf) {
  let n = 0n;
  for (const b of buf) n = n * 256n + BigInt(b);
  let s = "";
  while (n > 0n) { s = B58[Number(n % 58n)] + s; n /= 58n; }
  for (const b of buf) { if (b === 0) s = "1" + s; else break; }
  return s;
}

function sha256(buf) { return crypto.createHash("sha256").update(buf).digest("hex"); }

// ---------------------------------------------------------------- crypto
// Config blob: AES-256-GCM, key = SHA256(host + SALT), iv = blob[0..12),
// tag = blob[len-16..]. Same derivation the kit uses (purpose = apiHost).
function decryptConfig(host, blob) {
  const key = crypto.createHash("sha256").update(host + SALT).digest();
  const d = crypto.createDecipheriv("aes-256-gcm", key, blob.subarray(0, 12));
  d.setAuthTag(blob.subarray(blob.length - 16));
  const pt = Buffer.concat([d.update(blob.subarray(12, blob.length - 16)), d.final()]);
  const count = pt[4];
  const pubs = [];
  for (let i = 0; i < count; i++) pubs.push(b58(pt.subarray(8 + i * 32, 8 + i * 32 + 32)));
  return { pt, receivers: pubs };
}

// Operator-traffic key (payloads.js 揲): purpose string + salt.
// /c/i uses apiHost + "c"; /api/handler uses apiHost + "log".
function operatorKeyBytes(purpose) {
  return crypto.createHash("sha256").update(purpose + SALT).digest();
}
function decryptOperatorBlob(purpose, blob) {
  const key = operatorKeyBytes(purpose);
  const d = crypto.createDecipheriv("aes-256-gcm", key, blob.subarray(0, 12));
  d.setAuthTag(blob.subarray(blob.length - 16));
  return Buffer.concat([d.update(blob.subarray(12, blob.length - 16)), d.final()]);
}

// ------------------------------------------------------------- fixtures
function loadHostFixtures(host) {
  const fx = { host };

  // config ciphertext: prefer the per-host archive capture, then pumpanakin's
  const candidates = [
    path.join(ROOT, "archive", "sibling_lures", host, "api_config.bin"),
    path.join(ROOT, "archive", host, "api_config.bin"),
    path.join(ROOT, "decompiled", "live", "api_config.ciphertext.bin"),
  ];
  const cfgPath = candidates.find((p) => fs.existsSync(p));
  if (!cfgPath) throw new Error(`no config ciphertext found for ${host}`);
  fx.configBlob = fs.readFileSync(cfgPath);
  fx.configSource = path.relative(ROOT, cfgPath);
  const dec = decryptConfig(host, fx.configBlob); // throws on wrong key/tag
  fx.configReceivers = dec.receivers;
  fx.configPlaintextLen = dec.pt.length;

  fx.locales = {};
  const liveDir = path.join(ROOT, "decompiled", "live");
  for (const f of fs.readdirSync(liveDir)) {
    const m = f.match(/^locales_([a-z]{2})\.json$/);
    if (!m) continue;
    const arr = JSON.parse(fs.readFileSync(path.join(liveDir, f), "utf-8"));
    fx.locales[m[1]] = arr;
  }

  const bundlePath = path.join(ROOT, "archive", "pumpanakin.fun", "index.js");
  fx.bundle = fs.readFileSync(bundlePath);
  fx.bundleSha = sha256(fx.bundle);
  fx.bundleIsReference = fx.bundleSha === REF_BUNDLE;

  const lurePath = path.join(ROOT, "archive", "pumpanakin.fun", "lure.html");
  fx.lureHtml = fs.existsSync(lurePath) ? fs.readFileSync(lurePath) : null;

  // connect-domain statics (easyinvest7.biz / petramon.xyz pattern)
  const connDir = path.join(ROOT, "archive", "easyinvest7.biz");
  fx.connectHtml = fs.existsSync(path.join(connDir, "connect.html")) ? fs.readFileSync(path.join(connDir, "connect.html")) : null;
  fx.connectShim = fs.existsSync(path.join(connDir, "index-f916ac.js")) ? fs.readFileSync(path.join(connDir, "index-f916ac.js")) : null;
  fx.connectCss = fs.existsSync(path.join(ROOT, "archive", "petramon.xyz", "index-ab810f.css"))
    ? fs.readFileSync(path.join(ROOT, "archive", "petramon.xyz", "index-ab810f.css")) : null;
  return fx;
}

// ---------------------------------------------- binary response builders

// /c/i session response (operator_api.js notifyConnect layout):
//   0..10  11 bytes opaque header
//   11..12 u16 LE   field A (session id surrogate)
//   13     u8       field C
//   14     u8       flag: 0 = no middle section (we always send 0)
// SYNTHETIC: pinned from static analysis; never observed live.
function buildConnectSessionResponse(sessionId = 1, fieldC = 0) {
  const out = Buffer.alloc(15);
  crypto.randomFillSync(out.subarray(0, 11));
  out.writeUInt16LE(sessionId & 0xffff, 11);
  out.writeUInt8(fieldC & 0xff, 13);
  out.writeUInt8(0, 14);
  return out;
}

// /process body parser — mirror of buildProcessPayload's layout.
// Returns null when the body cannot be the kit's payload.
function parseProcessPayload(body) {
  if (!Buffer.isBuffer(body) || body.length < 52 + 1 + 1) return null;
  const attempt = body.readUInt32LE(13);
  const victim = b58(body.subarray(17, 49));
  const flow = body[49];
  const txLen = body.readUInt16LE(50);
  const txSection = body.subarray(52, 52 + txLen);
  const accountSection = body.subarray(52 + txLen);
  if (txSection.length !== txLen) return null;
  const unpack = (sec) => {
    if (sec.length === 0) return null;
    const count = sec[0];
    if (count === 0) return [];
    const out = [];
    let off = 1;
    for (let i = 0; i < count; i++) {
      if (off + 2 > sec.length) return null;
      const n = sec.readUInt16LE(off); off += 2;
      if (off + n > sec.length) return null;
      out.push(sec.subarray(off, off + n)); off += n;
    }
    return out;
  };
  const txs = unpack(txSection);
  const accounts = unpack(accountSection);
  if (!txs || !accounts) return null;
  return {
    attempt, victim, flow,
    flowName: { 0: "drain", 1: "siws", 2: "200tx" }[flow] || `unknown(${flow})`,
    tx_count: txs.length,
    tx_sizes: txs.map((t) => t.length),
    account_count: accounts.length,
    accounts: accounts.filter((a) => a.length === 32).map(b58),
  };
}

// CRC32 (payloads.js 樮/嵰: poly 0xEDB88320, init/final 0xFFFFFFFF)
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[i] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (const b of buf) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

// /c/i plaintext parser — mirror of buildConnectPayload. The request body
// arrives base64(text/plain) of AES-GCM(key=apiHost+"c"); decrypt first.
function parseConnectPayload(host, bodyBuf) {
  let pt;
  try { pt = decryptOperatorBlob(host + "c", bodyBuf); }
  catch (e) { return { error: "decrypt failed: " + (e.message || e) }; }
  if (pt.length < 59) return { error: `plaintext too short (${pt.length})` };
  const crc = pt.readUInt32LE(pt.length - 4);
  const want = crc32(pt.subarray(0, pt.length - 4));
  const solLamports = pt.readBigUInt64LE(15);
  const victim = b58(pt.subarray(23, 55));
  const accounts = { count: pt[55], entries: [] };
  let off = 56;
  for (let i = 0; i < accounts.count; i++) {
    const type = pt[off++];
    if (type === 0) {
      accounts.entries.push({ type, flag: pt[off], q: b58(pt.subarray(off + 1, off + 33)), de: b58(pt.subarray(off + 33, off + 65)) });
      off += 65;
    } else if (type === 2) {
      accounts.entries.push({ type, e: b58(pt.subarray(off, off + 32)) });
      off += 32;
    } else return { error: `unknown account type ${type} at entry ${i}` };
  }
  return {
    sol_lamports: solLamports.toString(),
    sol: Number(solLamports) / 1e9,
    victim, accounts,
    crc_ok: crc === want,
  };
}

// ------------------------------------------------------- request handler
// One shared shape for Playwright routing and any future socket server:
//   handle({method, pathname, query, headers, body}) -> {status, ctype, body}
// Logging is the caller's job (they see the raw request first).
function makeHandler(fx) {
  return function handle(req) {
    const { method, pathname, query } = req;

    if (method === "GET" && pathname === "/api/is-banned")
      return { status: 200, ctype: "text/plain", body: Buffer.from("0") };

    if (method === "GET" && pathname === "/api/locales") {
      const lang = query.get("lang") || "en";
      const arr = fx.locales[lang];
      if (!arr) return { status: 404, ctype: "text/html", body: Buffer.from("404 Not Found") };
      return { status: 200, ctype: "application/json", body: Buffer.from(JSON.stringify(arr)) };
    }

    if (method === "GET" && (pathname === "/api/config" || pathname === "/api/config/"))
      return { status: 200, ctype: "application/octet-stream", body: fx.configBlob };

    if (method === "POST" && pathname === "/api/visit")
      return { status: 200, ctype: "text/plain", body: Buffer.from("ok") };

    if (method === "POST" && pathname === "/api/handler") {
      // Telemetry events are AES-GCM(purpose apiHost+"log"). Try to decrypt
      // so dynamic runs record readable events; failure is logged, not fatal.
      try {
        const raw = Buffer.from(req.body.toString("utf-8"), "base64");
        const pt = decryptOperatorBlob(fx.host + "log", raw);
        return { status: 200, ctype: "application/json", body: Buffer.from("{}"), note: "handler event decrypted", decrypted: pt.toString("utf-8") };
      } catch {
        return { status: 200, ctype: "application/json", body: Buffer.from("{}"), note: "handler event undecrypted" };
      }
    }

    if (method === "POST" && pathname === "/api/process") {
      const raw = Buffer.from(req.body.toString("utf-8"), "base64");
      const parsed = parseProcessPayload(raw);
      if (!parsed)
        return { status: 422, ctype: "application/json", body: Buffer.from('{"error":"VALIDATION"}') };
      // RAIL: log and acknowledge; never act on transaction content.
      return { status: 200, ctype: "application/json", body: Buffer.from("{}"), note: "process payload parsed (LOGGED ONLY)", parsed };
    }

    if (method === "POST" && pathname === "/api/c/i") {
      const raw = Buffer.from(req.body.toString("utf-8"), "base64");
      const parsed = parseConnectPayload(fx.host, raw);
      const body = buildConnectSessionResponse(1, 0);
      return { status: 200, ctype: "application/octet-stream", body, note: "synthetic session response", parsed };
    }

    if (method === "POST" && /^\/api\/c\/c\/[^/]+\/[^/]+$/.test(pathname))
      return { status: 200, ctype: "application/json", body: Buffer.from("{}") };

    if (method === "POST" && /^\/api\/c\/f\/[^/]+$/.test(pathname))
      return { status: 200, ctype: "application/json", body: Buffer.from("{}") };

    // Static kit files (so the page itself can be served through the same
    // routing when the dynamic runner wants the whole site replayed)
    if (method === "GET" && (pathname === "/" || pathname === "/index.html") && fx.lureHtml)
      return { status: 200, ctype: "text/html", body: fx.lureHtml };
    if (method === "GET" && pathname === "/_nuxt/assets/index.js")
      return { status: 200, ctype: "application/javascript", body: fx.bundle };
    // Connect-domain surface: /connect/<token> shell, eager-modal shim,
    // app bundle (byte-identical reference), shell stylesheet, media.
    if (method === "GET" && pathname.startsWith("/connect") && fx.connectHtml)
      return { status: 200, ctype: "text/html", body: fx.connectHtml };
    if (method === "GET" && pathname === "/index-f916ac.js" && fx.connectShim)
      return { status: 200, ctype: "application/javascript", body: fx.connectShim };
    if (method === "GET" && pathname === "/app-924a52.js")
      return { status: 200, ctype: "application/javascript", body: fx.bundle };
    if (method === "GET" && pathname === "/index-ab810f.css" && fx.connectCss)
      return { status: 200, ctype: "text/css", body: fx.connectCss };
    if (method === "GET" && pathname.startsWith("/_nuxt/media/")) {
      const fp = path.join(ROOT, "archive", "pumpanakin.fun", "media", pathname.split("/").pop());
      if (fs.existsSync(fp)) return { status: 200, ctype: "video/webm", body: fs.readFileSync(fp) };
    }
    for (const [p, f, ct] of [
      ["/jxi33.js", "jxi33.js", "application/javascript"],
      ["/sbdst.js", "sbdst.js", "application/javascript"],
      ["/assets/js/jxi33.js", "jxi33.js", "application/javascript"],
      ["/assets/js/sbdst.js", "sbdst.js", "application/javascript"],
      ["/media/malicious.webm", "media/malicious.webm", "video/webm"],
      ["/media/200tx.webm", "media/200tx.webm", "video/webm"],
      ["/media/refund.webm", "media/refund.webm", "video/webm"],
    ]) {
      if (method === "GET" && pathname === p) {
        const fp = path.join(ROOT, "archive", "pumpanakin.fun", f);
        if (fs.existsSync(fp)) return { status: 200, ctype: ct, body: fs.readFileSync(fp) };
      }
    }

    return { status: 404, ctype: "text/html", body: Buffer.from("404 Not Found") };
  };
}

// ------------------------------------------------------------- self check
function selfCheck(host) {
  const results = [];
  const ok = (name, cond, detail = "") => {
    results.push({ name, pass: !!cond, detail });
    return cond;
  };

  const fx = loadHostFixtures(host);
  ok("config ciphertext decrypts with host-derived key", fx.configPlaintextLen > 0,
    `${fx.configSource}, pt ${fx.configPlaintextLen}B, receivers ${fx.configReceivers.map((r) => r.slice(0, 8)).join("/")}`);
  ok("bundle is the reference build", fx.bundleIsReference, fx.bundleSha.slice(0, 16));
  ok("lure html present", !!fx.lureHtml);

  const langs = Object.keys(fx.locales);
  ok("locales load", langs.length >= 12, `${langs.length} languages: ${langs.sort().join(" ")}`);
  ok("locales are 10-entry arrays", langs.every((l) => Array.isArray(fx.locales[l]) && fx.locales[l].length === 10));
  ok("index 6 is the no-confirmation line (en)", /without confirmation/i.test(fx.locales.en?.[6] || ""), fx.locales.en?.[6]);

  const handler = makeHandler(fx);
  const r1 = handler({ method: "GET", pathname: "/api/is-banned", query: new URLSearchParams() });
  ok("GET /api/is-banned -> '0'", r1.status === 200 && r1.body.toString() === "0");
  const r2 = handler({ method: "GET", pathname: "/api/config", query: new URLSearchParams() });
  ok("GET /api/config serves archived blob", r2.status === 200 && r2.body.equals(fx.configBlob));
  const r3 = handler({ method: "GET", pathname: "/api/locales", query: new URLSearchParams("lang=fr") });
  ok("GET /api/locales?lang=fr", r3.status === 200 && JSON.parse(r3.body.toString()).length === 10);
  const r4 = handler({ method: "POST", pathname: "/api/visit", query: new URLSearchParams() });
  ok("POST /api/visit -> 'ok'", r4.status === 200 && r4.body.toString() === "ok");
  const r5 = handler({ method: "POST", pathname: "/api/process", query: new URLSearchParams(), body: Buffer.from("AA==", "utf-8") });
  ok("POST /api/process garbage -> 422 VALIDATION", r5.status === 422);

  // /c/i round trip: build a real connect payload the way the kit would,
  // encrypt it with purpose host+"c", then verify the handler parses it.
  const { buildConnectPayloadSelfTest } = (() => {
    function writePubkey(out, off, bytes) { out.set(bytes, off); }
    return {
      buildConnectPayloadSelfTest(victimBytes, lamports) {
        const accounts = Buffer.from([0]); // zero account entries
        const out = Buffer.alloc(59 + accounts.length);
        crypto.randomFillSync(out.subarray(0, 15));
        out.writeBigUInt64LE(BigInt(lamports), 15);
        writePubkey(out, 23, victimBytes);
        out.set(accounts, 55);
        out.writeUInt32LE(crc32(out.subarray(0, out.length - 4)), out.length - 4);
        return out;
      },
    };
  })();
  const victim = crypto.randomBytes(32);
  const pt = buildConnectPayloadSelfTest(victim, 1_500_000_000);
  const key = operatorKeyBytes(host + "c");
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const enc = Buffer.concat([iv, cipher.update(pt), cipher.final(), cipher.getAuthTag()]);
  const r6 = handler({ method: "POST", pathname: "/api/c/i", query: new URLSearchParams(), body: Buffer.from(enc.toString("base64"), "utf-8") });
  ok("POST /api/c/i round trip: decrypt+parse", r6.status === 200 && r6.parsed && r6.parsed.crc_ok === true,
    r6.parsed ? `sol=${r6.parsed.sol} victim=${r6.parsed.victim.slice(0, 8)} crc_ok=${r6.parsed.crc_ok}` : "no parse");
  ok("/c/i session response is 15-byte layout", r6.body.length === 15);

  // process payload round trip
  const txSec = Buffer.from([1, 1, 0, 0x42]); // count 1, u16 LE len 1, 1 byte
  const acctSec = Buffer.from([0]); // 0 accounts
  const body = Buffer.alloc(52 + txSec.length + acctSec.length);
  crypto.randomFillSync(body.subarray(0, 13));
  body.writeUInt32LE(3, 13);
  body.set(victim, 17);
  body[49] = 0;
  body.writeUInt16LE(txSec.length, 50);
  body.set(txSec, 52);
  body.set(acctSec, 52 + txSec.length);
  const r7 = handler({ method: "POST", pathname: "/api/process", query: new URLSearchParams(), body: Buffer.from(body.toString("base64"), "utf-8") });
  ok("POST /api/process parseable -> 200 + parsed fields", r7.status === 200 && r7.parsed && r7.parsed.flowName === "drain" && r7.parsed.tx_count === 1,
    r7.parsed ? `flow=${r7.parsed.flowName} txs=${r7.parsed.tx_count} victim=${r7.parsed.victim.slice(0, 8)}` : "no parse");

  return results;
}

if (require.main === module) {
  const hostIdx = process.argv.indexOf("--host");
  const host = hostIdx > 0 ? process.argv[hostIdx + 1] : "pumpanakin.fun";
  if (process.argv.includes("--self-check")) {
    console.log(`[*] replay fixture self-check, emulated host: ${host}`);
    const results = selfCheck(host);
    let fails = 0;
    for (const r of results) {
      console.log(` ${r.pass ? "PASS" : "FAIL"}  ${r.name}${r.detail ? `  (${r.detail})` : ""}`);
      if (!r.pass) fails++;
    }
    console.log(fails ? `[!] ${fails} check(s) failed` : "[+] all checks passed");
    process.exit(fails ? 1 : 0);
  }
  console.log("usage: node scripts/replay_fixtures.js --self-check [--host pumpanakin.fun]");
}

module.exports = { loadHostFixtures, makeHandler, decryptConfig, parseProcessPayload, parseConnectPayload, buildConnectSessionResponse, REF_BUNDLE };
