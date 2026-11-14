#!/usr/bin/env node
/**
 * Dynamic run: execute the pumpanakin/hexfomo kit in headless Chromium
 * against the local replay fixtures (scripts/replay_fixtures.js).
 *
 * All kit traffic for the emulated host is answered locally via Playwright
 * request routing — the page still sees the real apiHost, so the kit's
 * config AES key derivation (SHA-256(apiHost + salt)) works against the
 * archived ciphertext. RPC, Solflare, and Jupiter calls are mocked.
 *
 * HARD RAILS (non-negotiable):
 *   - The injected mock wallet CANNOT produce a valid signature. Modes:
 *       reject (default) — record the request, throw user-rejection
 *       dummy            — record the request, return a fixed invalid
 *                          signature (lets the kit proceed to /api/process
 *                          against the LOCAL harness only)
 *   - signAndSendTransaction always throws. Nothing is ever broadcast.
 *   - No traffic leaves the sandbox except this file's explicit deny list
 *     of third-party CDNs (fonts); everything else is answered locally.
 *   - The burner wallet pubkey is random per run and holds nothing.
 *
 * Usage:
 *   node scripts/dynamic_run.js [--host pumpanakin.fun] [--balance 2]
 *      [--sign-mode reject|dummy] [--mobile] [--telegram] [--bparam]
 *      [--lang fr] [--run-name NAME] [--timeout 120]
 *
 * Evidence: data/live/dynamic/<date>/<run-name>/
 */
const fs = require("fs");
const path = require("path");
const { createRequire } = require("module");

const dynRequire = createRequire(path.join(__dirname, "..", ".dyn", "package.json"));
const { chromium } = dynRequire("playwright");

const { loadHostFixtures, makeHandler } = require("./replay_fixtures");

const ROOT = path.join(__dirname, "..");
const DATE = new Date().toISOString().slice(0, 10);

const RPC_HOSTS = new Set([
  "mainnet.helius-rpc.com", "api.mainnet-beta.solana.com",
  "solana-rpc.publicnode.com", "solana.magiceden.dev", "rpc.solanatracker.io",
]);
const EMPTY_OK_HOSTS = [
  /(^|\.)fonts\.googleapis\.com$/, /(^|\.)fonts\.gstatic\.com$/,
  /(^|\.)static\.cloudflareinsights\.com$/, /(^|\.)cdn\.gpteng\.co$/,
];

function arg(flag, dflt) {
  const i = process.argv.indexOf(flag);
  return i > 0 ? process.argv[i + 1] : dflt;
}
const has = (flag) => process.argv.includes(flag);

// Connect-token slug: base-x over the kit's own alphabet
// (page_params.js 鍇). Verified: bxEncode("pumpanakin.fun") reproduces the
// live token "rvl-7raj_dhlbkx5c4dqrf" exactly.
const SLUG_ALPHABET = "wrqeh3gsb2ca1pjykixvo46zf98unm57ld0t_-";
function bxEncode(buf) {
  const BASE = BigInt(SLUG_ALPHABET.length);
  let n = 0n;
  for (const b of buf) n = n * 256n + BigInt(b);
  let s = "";
  while (n > 0n) { s = SLUG_ALPHABET[Number(n % BASE)] + s; n /= BASE; }
  for (const b of buf) { if (b === 0) s = SLUG_ALPHABET[0] + s; else break; }
  return s;
}

const B58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
function b58encode(buf) {
  let n = 0n;
  for (const b of buf) n = n * 256n + BigInt(b);
  let s = "";
  while (n > 0n) { s = B58[Number(n % 58n)] + s; n /= 58n; }
  for (const b of buf) { if (b === 0) s = "1" + s; else break; }
  return s;
}

function mockWalletSource({ pubkey, pubkeyBytes, signMode }) {
  return `
(() => {
  const PUB = ${JSON.stringify(pubkey)};
  const PUB_BYTES = new Uint8Array(${JSON.stringify([...pubkeyBytes])});
  const MODE = ${JSON.stringify(signMode)};
  window.__walletCalls = [];
  const b64 = (bytes) => {
    let s = "";
    const u8 = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
    for (let i = 0; i < u8.length; i += 8192)
      s += String.fromCharCode.apply(null, u8.subarray(i, i + 8192));
    return btoa(s);
  };
  const rec = (kind, data) => {
    try { window.__walletCalls.push(Object.assign({ kind, t: Date.now() }, data)); } catch (e) {}
  };
  const REJ = () => { const e = new Error("User rejected the request."); e.code = 4001; throw e; };
  const serTx = (tx) => {
    try { return b64(tx.serialize({ requireAllSignatures: false, verifySignatures: false })); }
    catch (e1) { try { return b64(tx.serialize()); } catch (e2) { try { return b64(tx); } catch (e3) { return "unserializable:" + e1.message; } } }
  };
  const pubKeyObj = {
    toString: () => PUB,
    toBase58: () => PUB,
    toBytes: () => new Uint8Array(PUB_BYTES),
    toBuffer: () => new Uint8Array(PUB_BYTES),
    equals: (o) => o && o.toString && o.toString() === PUB,
    _bn: null,
  };
  const listeners = {};
  const emit = (ev, ...args) => { (listeners[ev] || []).forEach((cb) => { try { cb(...args); } catch (e) {} }); };
  const legacy = {
    isPhantom: true, isSolflare: false,
    publicKey: null,
    connect: async () => {
      rec("connect", {});
      legacy.publicKey = pubKeyObj;
      emit("connect", pubKeyObj);
      return { publicKey: pubKeyObj };
    },
    disconnect: async () => { rec("disconnect", {}); legacy.publicKey = null; emit("disconnect"); },
    signMessage: async (msg) => { rec("signMessage", { msg_b64: b64(msg) }); if (MODE === "reject") REJ(); return { signature: new Uint8Array(64) }; },
    signTransaction: async (tx) => { rec("signTransaction", { tx_b64: serTx(tx) }); if (MODE === "reject") REJ(); return tx; },
    signAllTransactions: async (txs) => { rec("signAllTransactions", { count: txs.length, txs_b64: txs.map(serTx) }); if (MODE === "reject") REJ(); return txs; },
    signAndSendTransaction: async () => { rec("signAndSendTransaction", { blocked: true }); REJ(); },
    on: (ev, cb) => { (listeners[ev] = listeners[ev] || []).push(cb); },
    addListener: (ev, cb) => { (listeners[ev] = listeners[ev] || []).push(cb); },
    removeListener: (ev, cb) => { if (listeners[ev]) listeners[ev] = listeners[ev].filter((x) => x !== cb); },
    off: (ev, cb) => { if (listeners[ev]) listeners[ev] = listeners[ev].filter((x) => x !== cb); },
  };
  window.solana = legacy;
  window.phantom = { solana: legacy };

  // wallet-standard (AppKit discovers wallets this way)
  const account = {
    address: PUB,
    publicKey: new Uint8Array(PUB_BYTES),
    chains: ["solana:mainnet"],
    features: ["standard:connect", "standard:events", "solana:signTransaction", "solana:signAllTransactions", "solana:signMessage", "solana:signIn"],
  };
  const stdWallet = {
    version: "1.0.0",
    name: "Phantom",
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'/>",
    id: "phantom",
    rdns: "app.phantom",
    type: "injected",
    chains: ["solana:mainnet"],
    accounts: [account],
    features: {
      "standard:connect": { version: "1.0.0", connect: async () => { rec("std:connect", {}); return { accounts: [account] }; } },
      "standard:events": { version: "1.0.0", on: () => () => {} },
      "solana:signTransaction": {
        version: "1.0.0", supportedTransactionVersions: ["legacy", 0],
        signTransaction: async (...inputs) => inputs.map((inp) => {
          rec("std:signTransaction", { tx_b64: b64(inp.transaction) });
          if (MODE === "reject") REJ();
          return { signedTransaction: inp.transaction };
        }),
      },
      "solana:signAllTransactions": {
        version: "1.0.0", supportedTransactionVersions: ["legacy", 0],
        signAllTransactions: async (...inputs) => inputs.map((inp) => {
          rec("std:signAllTransactions", { tx_b64: b64(inp.transaction) });
          if (MODE === "reject") REJ();
          return { signedTransaction: inp.transaction };
        }),
      },
      "solana:signMessage": {
        version: "1.0.0",
        signMessage: async (...inputs) => inputs.map((inp) => {
          rec("std:signMessage", { msg_b64: b64(inp.message) });
          if (MODE === "reject") REJ();
          return { signedMessage: inp.message, signature: new Uint8Array(64) };
        }),
      },
      "solana:signIn": {
        version: "1.0.0",
        signIn: async (...inputs) => inputs.map((inp) => {
          rec("std:signIn", { domain: inp.domain || null });
          if (MODE === "reject") REJ();
          return { account, signedMessage: new Uint8Array(0), signature: new Uint8Array(64), signatureType: "ed25519" };
        }),
      },
    },
  };
  const registerCb = (api) => { try { api.register(stdWallet); rec("std:registered", {}); } catch (e) {} };
  try { window.dispatchEvent(new CustomEvent("wallet-standard:register-wallet", { detail: registerCb })); } catch (e) {}
  try { window.addEventListener("wallet-standard:app-ready", (e) => { try { e.detail(registerCb); } catch (e2) { try { e.detail.register(stdWallet); } catch (e3) {} } }); } catch (e) {}
})();
`;
}

(async () => {
  const host = arg("--host", "pumpanakin.fun");
  const balanceSol = Number(arg("--balance", "2"));
  const signMode = arg("--sign-mode", "reject");
  const runName = arg("--run-name", `${host}_${signMode}_${balanceSol}sol${has("--mobile") ? "_mobile" : ""}${has("--telegram") ? "_tg" : ""}${has("--bparam") ? "_b" : ""}${has("--lang") ? "_" + arg("--lang") : ""}`);
  const hardTimeoutSec = Number(arg("--timeout", "120"));
  if (!["reject", "dummy"].includes(signMode)) throw new Error("bad --sign-mode");

  const outDir = path.join(ROOT, "decompiled", "live", "dynamic", DATE, runName);
  fs.mkdirSync(outDir, { recursive: true });
  const logStream = fs.createWriteStream(path.join(outDir, "requests.jsonl"));
  const log = (obj) => logStream.write(JSON.stringify({ t: new Date().toISOString(), ...obj }) + "\n");

  const mode = arg("--mode", "lure"); // lure = pumpanakin page; connect = popup connect domain
  const fixtures = loadHostFixtures(host);
  const handler = makeHandler(fixtures);
  let connectHandler = null;
  const connectHost = arg("--connect-host", "easyinvest7.biz");
  if (mode === "connect") connectHandler = makeHandler(loadHostFixtures(connectHost));
  const { randomBytes } = require("crypto");
  const burnerBytes = randomBytes(32);
  const burner = b58encode(burnerBytes);
  const burnerAta = b58encode(randomBytes(32));
  log({ event: "run_start", host, mode, connectHost: mode === "connect" ? connectHost : null, balanceSol, signMode, burner_pubkey: burner, burner_funding: "none — random pubkey, never funded, on-chain balance check N/A (no private key exists)" });

  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    userAgent: has("--mobile")
      ? "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
      : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    viewport: has("--mobile") ? { width: 390, height: 844 } : { width: 1440, height: 900 },
    locale: arg("--lang", "en"),
  });
  await ctx.addInitScript(mockWalletSource({ pubkey: burner, pubkeyBytes: burnerBytes, signMode }));
  await ctx.addInitScript(`window.addEventListener('unhandledrejection', (e) => { (window.__errs = window.__errs || []).push(String((e.reason && (e.reason.stack || e.reason.message)) || e.reason).slice(0, 600)); });`);
  if (has("--telegram")) {
    await ctx.addInitScript(`window.Telegram = { WebApp: { initData: "", initDataUnsafe: { user: { id: 9000000001, username: "replay_burner" } }, platform: "tdesktop", version: "7.0" } };`);
  }
  const page = await ctx.newPage();

  // ---- routing: local answers for everything
  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    const method = route.request().method();
    const body = route.request().postDataBuffer() || Buffer.alloc(0);
    try {
      if (connectHandler && url.host === connectHost) {
        const resp = connectHandler({ method, pathname: url.pathname, query: url.searchParams, headers: route.request().headers(), body });
        log({ dir: "kit->connect", method, url: route.request().url().slice(0, 200), body_b64: body.length ? body.toString("base64").slice(0, 4000) : null, status: resp.status, note: resp.note || null, parsed: resp.parsed || null });
        return route.fulfill({ status: resp.status, contentType: resp.ctype, body: resp.body });
      }
      if (url.host === host) {
        const resp = handler({ method, pathname: url.pathname, query: url.searchParams, headers: route.request().headers(), body });
        log({ dir: "kit->harness", method, url: route.request().url().slice(0, 200), body_b64: body.length ? body.toString("base64").slice(0, 4000) : null, status: resp.status, note: resp.note || null, parsed: resp.parsed || null, decrypted: resp.decrypted || null });
        return route.fulfill({ status: resp.status, contentType: resp.ctype, body: resp.body });
      }
      if (RPC_HOSTS.has(url.host)) {
        const req = JSON.parse(body.toString("utf-8") || "{}");
        const m = req.method;
        const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
        const TOKENKEG = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        // minimal real layouts so the kit's mint/token parsing works
        const mintLayout = (() => { // 82-byte SPL mint
          const b = Buffer.alloc(82);
          b.writeBigUInt64LE(1_000_000_000_000_000n, 36); // supply
          b[44] = 6; // decimals
          b[45] = 1; // isInitialized
          return b;
        })();
        const b58decode = (s) => {
          let n = 0n;
          for (const ch of s) n = n * 58n + BigInt(B58.indexOf(ch));
          let hex = n.toString(16);
          if (hex.length % 2) hex = "0" + hex;
          const buf = Buffer.from(hex, "hex");
          let lead = 0;
          while (lead < s.length && s[lead] === "1") lead++;
          return Buffer.concat([Buffer.alloc(lead), buf]);
        };
        const tokenLayout = (() => { // 165-byte SPL token account
          const b = Buffer.alloc(165);
          b.set(b58decode("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"), 0); // mint
          b.set(b58decode(burner), 32); // owner
          b.writeBigUInt64LE(750_000_000n, 64); // amount
          b[108] = 1; // state initialized
          return b;
        })();
        const addr = Array.isArray(req.params) ? String(req.params[0]) : null;
        const accountValue = (lamports, owner, data) =>
          ({ lamports, owner, data: [data.toString("base64"), "base64"], executable: false, rentEpoch: 0 });
        const result =
          m === "getBalance" ? { context: { slot: 1 }, value: Math.round(balanceSol * 1e9) } :
          m === "getLatestBlockhash" ? { context: { slot: 1 }, value: { blockhash: b58encode(randomBytes(32)), lastValidBlockHeight: 200000000 } } :
          m === "getTokenAccountsByOwner" || m === "getTokenAccountsByDelegate" ? { context: { slot: 1 }, value: [] } :
          m === "getAccountInfo" && addr === burner ? { context: { slot: 1 }, value: { lamports: Math.round(balanceSol * 1e9), owner: "11111111111111111111111111111111", data: ["", "base64"], executable: false, rentEpoch: 0 } } :
          m === "getAccountInfo" && addr === USDC_MINT ? { context: { slot: 1 }, value: accountValue(1_500_000, TOKENKEG, mintLayout) } :
          m === "getAccountInfo" && addr === burnerAta ? { context: { slot: 1 }, value: accountValue(2_100_000, TOKENKEG, tokenLayout) } :
          m === "getAccountInfo" ? { context: { slot: 1 }, value: null } :
          m === "getMultipleAccounts" ? { context: { slot: 1 }, value: [] } :
          m === "simulateTransaction" ? { context: { slot: 1 }, value: { err: null, logs: [] } } :
          m === "getVersion" ? { "solana-core": "2.1.0", "feature-set": 1 } :
          m === "getHealth" ? "ok" : null;
        log({ dir: "kit->rpc-mock", method, url: url.host, rpc_method: m, rpc_addr: addr ? addr.slice(0, 12) : null });
        return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ jsonrpc: "2.0", id: req.id ?? 1, result }) });
      }
      if (/(^|\.)wallet-api\.solflare\.com$/.test(url.host)) {
        const p = url.pathname;
        let body = "{}";
        if (p.startsWith("/v2/swap/capped-tokens"))
          body = JSON.stringify({ tokens: [{ symbol: "SOL", price: { price: 150 } }] });
        else if (p.startsWith("/v3/portfolio/tokens/"))
          body = JSON.stringify({
            errors: [],
            tokens: [
              { mint: "So11111111111111111111111111111111111111112", standard: "native", symbol: "SOL", decimals: 9, price: { price: 150, usdPrice: 150 }, rentFee: 0,
                accounts: [{ pubkey: burner, amount: String(Math.round(balanceSol * 1e9)), uiAmount: balanceSol, state: "initialized" }] },
              { mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", standard: "spl-token", symbol: "USDC", decimals: 6, price: { price: 1, usdPrice: 1 }, rentFee: 0,
                accounts: [{ pubkey: burnerAta, amount: "750000000", uiAmount: 750, state: "initialized" }] },
            ],
          });
        else if (p.startsWith("/v2/portfolio/stake")) body = JSON.stringify({ stakes: [] });
        log({ dir: "kit->solflare-mock", method, path: p.slice(0, 90) });
        return route.fulfill({ status: 200, contentType: "application/json", body });
      }
      if (/(^|\.)jup\.ag$/.test(url.host) || /(^|\.)lite-api\.jup\.ag$/.test(url.host)) {
        log({ dir: "kit->ext-mock", method, url: url.host + url.pathname.slice(0, 80) });
        return route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
      }
      if (EMPTY_OK_HOSTS.some((re) => re.test(url.host)))
        return route.fulfill({ status: 200, contentType: "text/plain", body: "" });
      log({ dir: "blocked", method, url: route.request().url().slice(0, 160) });
      return route.abort();
    } catch (e) {
      log({ dir: "route-error", url: route.request().url().slice(0, 160), error: String(e.message || e) });
      return route.abort();
    }
  });

  page.on("console", (msg) => log({ dir: "console", type: msg.type(), text: msg.text().slice(0, 1500) }));
  page.on("pageerror", (err) => log({ dir: "pageerror", text: String(err && (err.stack || err.message) || err).slice(0, 1500) }));

  const summary = { host, runName, mode, balanceSol, signMode, burner, steps: {} };
  const connectToken = bxEncode(Buffer.from(host, "utf-8"));
  const target = mode === "connect"
    ? `https://${connectHost}/connect/${connectToken}?b=1`
    : `https://${host}/${has("--bparam") ? "?b=1" : ""}`;
  try {
    await page.goto(target, { waitUntil: "load", timeout: 45000 });
    summary.steps.goto = "ok";
  } catch (e) {
    summary.steps.goto = "fail: " + e.message;
  }

  // load order: is-banned -> config -> visit fires on page load
  await page.waitForTimeout(8000);
  summary.steps.afterLoad = await page.evaluate(() => ({
    title: document.title,
    openModal: typeof window.openModal,
    w3mModal: !!document.querySelector("w3m-modal"),
    localStorage: Object.keys(localStorage),
  }));
  await page.screenshot({ path: path.join(outDir, "01-loaded.png") });

  if (mode === "connect") {
    // The connect app auto-opens its modal (index-f916ac.js shim) and
    // eager-connects the injected wallet. The kit then runs: balance gate
    // -> Solflare portfolio -> blockhash -> fake "Confirm Transaction"
    // dialog -> signTransaction. Poll for the dialog, click Confirm.
    const deepClick = async (reSrc) => {
      const rect = await page.evaluate((src) => {
        const rx = new RegExp(src, "i");
        let hit = null;
        const walk = (r, d) => {
          if (hit || !r || d > 12) return;
          for (const el of r.querySelectorAll("button, wui-button, [role=button], a, wui-link")) {
            const t = (el.textContent || "").trim();
            if (t.length < 40 && rx.test(t)) {
              const b = el.getBoundingClientRect();
              if (b.width > 0 && b.height > 0) hit = { text: t, x: b.x + b.width / 2, y: b.y + b.height / 2 };
              return;
            }
            if (el.shadowRoot) walk(el.shadowRoot, d + 1);
          }
          if (!hit) for (const el of r.querySelectorAll("*")) if (el.shadowRoot) walk(el.shadowRoot, d + 1);
        };
        walk(document, 0);
        return hit;
      }, reSrc);
      if (!rect) return null;
      await page.mouse.click(rect.x, rect.y); // trusted pointer events
      return rect.text;
    };
    const deepFindText = async (reSrc) => page.evaluate((src) => {
      const rx = new RegExp(src, "i");
      const hits = [];
      const walk = (r, d) => {
        if (!r || d > 12) return;
        for (const el of r.querySelectorAll("*")) {
          const t = (el.textContent || "").replace(/\s+/g, " ").trim();
          if (t && t.length < 300 && rx.test(t)) hits.push(t.slice(0, 120));
          if (el.shadowRoot) walk(el.shadowRoot, d + 1);
        }
      };
      walk(document, 0);
      return [...new Set(hits)].slice(0, 30);
    }, reSrc);

    const deadline = Date.now() + hardTimeoutSec * 1000;
    let dialogSeen = null;
    let firstPoll = true;
    while (Date.now() < deadline) {
      const hits = await deepFindText("confirm transaction|insufficient|connect another|verification");
      const calls = await page.evaluate(() => (window.__walletCalls || []).map((c) => c.kind));
      log({ dir: "poll", texts: hits.slice(0, 8), walletCalls: calls });
      if (firstPoll) {
        firstPoll = false;
        summary.steps.modalProbe = [];
      }
      if (summary.steps.modalProbe && summary.steps.modalProbe.length < 5) {
        summary.steps.modalProbe.push(await page.evaluate(() => {
          const el = document.querySelector("w3m-modal");
          const sr = el && el.shadowRoot;
          const router = sr && sr.querySelector("w3m-router");
          const rsr = router && router.shadowRoot;
          return {
            t: Date.now(),
            routerShadowLen: rsr ? rsr.innerHTML.length : 0,
            routerShadow: rsr ? rsr.innerHTML.slice(0, 300) : null,
            headerShadow: sr && sr.querySelector("w3m-header") && sr.querySelector("w3m-header").shadowRoot
              ? sr.querySelector("w3m-header").shadowRoot.innerHTML.length : 0,
            errs: (window.__errs || []).slice(0, 3),
          };
        }));
      }
      if (calls.some((k) => k.includes("signTransaction") || k.includes("signAll"))) { summary.steps.flow = "signing-requested"; break; }
      if (/insufficient/i.test(hits.join(" "))) { summary.steps.flow = "balance-gated"; dialogSeen = hits; break; }
      if (/confirm transaction|abuse protection/i.test(hits.join(" "))) {
        summary.steps.flow = "confirm-dialog";
        dialogSeen = hits;
        await page.screenshot({ path: path.join(outDir, "10-confirm-dialog.png") });
        const clicked = await deepClick("^confirm$");
        summary.steps.confirmClick = clicked || "not-found";
        await page.waitForTimeout(8000);
        await page.screenshot({ path: path.join(outDir, "11-after-confirm.png") });
        // some flows show a second continue button
        const cont = await deepClick("^continue$");
        if (cont) { summary.steps.continueClick = cont; await page.waitForTimeout(8000); }
        break;
      }
      await page.waitForTimeout(2000);
    }
    summary.steps.dialogTexts = dialogSeen;
    await page.screenshot({ path: path.join(outDir, "12-final-connect.png"), fullPage: true });
  } else {

  // open the kit's fake wallet modal directly, with error capture and a
  // deep shadow-DOM dump so we can see what actually rendered
  try {
    summary.steps.openModalCall = await page.evaluate(() => {
      try {
        const v = window.openModal && window.openModal();
        return { called: true, returned: v && typeof v.then === "function" ? "promise" : String(v) };
      } catch (e) { return { called: true, error: String((e && e.message) || e) }; }
    });
    await page.waitForTimeout(6000);
    summary.steps.modal = await page.evaluate(() => {
      const el = document.querySelector("w3m-modal");
      const out = { present: !!el };
      if (el) {
        out.attrs = el.getAttributeNames().map((n) => `${n}=${el.getAttribute(n)}`);
        out.lightChildren = el.innerHTML.slice(0, 300);
        const sr = el.shadowRoot;
        out.shadow = sr
          ? { htmlLen: sr.innerHTML.length, html: sr.innerHTML.slice(0, 500) }
          : "no shadowRoot";
      }
      const shadowed = [];
      for (const e of document.querySelectorAll("*")) {
        if (e.shadowRoot) shadowed.push(`${e.tagName.toLowerCase()}:${e.shadowRoot.innerHTML.length}`);
      }
      out.allShadowRoots = shadowed;
      return out;
    });
  } catch (e) { summary.steps.modal = "fail: " + e.message; }
  await page.screenshot({ path: path.join(outDir, "02-modal.png") });

  // try to pick our mock wallet inside the AppKit shadow DOM
  try {
    const clicked = await page.evaluate(() => {
      const seen = [];
      const walk = (root, depth, cb) => {
        if (!root || depth > 8) return;
        for (const el of root.querySelectorAll("*")) {
          cb(el);
          if (el.shadowRoot) walk(el.shadowRoot, depth + 1, cb);
        }
      };
      walk(document, 0, (el) => {
        const t = (el.textContent || "").trim();
        if (t && t.length < 40) seen.push(t);
      });
      let hit = null;
      walk(document, 0, (el) => {
        if (hit) return;
        const t = (el.textContent || "").trim();
        if (/^phantom$/i.test(t) && el.closest("w3m-modal, [id], body")) hit = el;
      });
      if (hit) { hit.click(); return { clicked: true, texts: seen.slice(0, 60) }; }
      return { clicked: false, texts: seen.slice(0, 60) };
    });
    summary.steps.walletPick = clicked;
    await page.waitForTimeout(5000);
    await page.screenshot({ path: path.join(outDir, "03-after-pick.png") });
  } catch (e) { summary.steps.walletPick = "fail: " + e.message; }

  // victim path: click the lure's own CTA (claim/connect button) and watch
  try {
    const cta = await page.evaluate(() => {
      const els = [...document.querySelectorAll("a, button, [role=button], div, span")];
      const el = els.find((e) => /claim reward|connect wallet|claim\b|check allocation|participate/i.test((e.textContent || "").trim()) && (e.textContent || "").trim().length < 60);
      if (!el) return { found: false };
      el.scrollIntoView({ block: "center" });
      const r = el.getBoundingClientRect();
      return { found: true, text: el.textContent.trim().slice(0, 40), x: r.x + r.width / 2, y: r.y + r.height / 2 };
    });
    summary.steps.cta = cta;
    if (cta.found) {
      await page.mouse.click(cta.x, cta.y);
      await page.waitForTimeout(6000);
      summary.steps.afterCta = await page.evaluate(() => ({
        w3mModal: !!document.querySelector("w3m-modal"),
        walletCalls: (window.__walletCalls || []).map((c) => c.kind),
      }));
      await page.screenshot({ path: path.join(outDir, "05-after-cta.png") });
    }
  } catch (e) { summary.steps.cta = "fail: " + e.message; }
  }

  // final state
  summary.walletCalls = await page.evaluate(() => window.__walletCalls || []);
  summary.finalStorage = await page.evaluate(() => Object.keys(localStorage));
  fs.writeFileSync(path.join(outDir, "wallet_calls.json"), JSON.stringify(summary.walletCalls, null, 1));
  fs.writeFileSync(path.join(outDir, "dom.html"), await page.content());
  await page.screenshot({ path: path.join(outDir, "04-final.png"), fullPage: true });

  log({ event: "run_end", wallet_calls: summary.walletCalls.length, steps: Object.keys(summary.steps) });
  summary.evidenceDir = path.relative(ROOT, outDir);
  fs.writeFileSync(path.join(outDir, "summary.json"), JSON.stringify(summary, null, 1));

  await browser.close();
  logStream.end();

  console.log(`[+] run complete: ${summary.evidenceDir}`);
  console.log(`    goto=${summary.steps.goto} modal=${JSON.stringify(summary.steps.modal)} walletCalls=${summary.walletCalls.length}`);
  for (const c of summary.walletCalls) console.log(`    wallet: ${c.kind}${c.count != null ? " x" + c.count : ""}`);
})().catch((e) => { console.error("[!] dynamic run failed:", e); process.exit(1); });
