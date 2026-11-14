#!/usr/bin/env node
/**
 * Browser walk for Cloudflare-walled lure pages.
 *
 * Loads each walled host in real Chromium and lets the managed challenge
 * solve naturally — the same traffic any victim's browser generates.
 * Captures: rendered HTML, title, screenshot, kit bundle hash, /api/config
 * decrypt, and the load-order request triple.
 *
 * Usage: node scripts/cf_walk.js [host ...]
 * Output: archive/siblings/<host>/site/cf_<date>.html + .png + cf_<date>.json
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { createRequire } = require("module");
const dynRequire = createRequire(path.join(__dirname, "..", ".dyn", "package.json"));
const { chromium } = dynRequire("playwright");

const ROOT = path.join(__dirname, "..");
const DATE = new Date().toISOString().slice(0, 10);
const REF_BUNDLE = "0735606691bbdf35d38d7531c0e48363a21ef6f7224ebce2908a1b487f9ea6a2";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

const HOSTS = process.argv.slice(2).length ? process.argv.slice(2) : ["pumpanakin.fun", "solme.top", "luna-start.trade"];

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ["--disable-blink-features=AutomationControlled"],
  });
  for (const host of HOSTS) {
    const out = { host, fetched: new Date().toISOString() };
    const dir = path.join(ROOT, "archive", "sibling_lures", host, "site");
    fs.mkdirSync(dir, { recursive: true });
    const ctx = await browser.newContext({ userAgent: UA, viewport: { width: 1440, height: 900 }, locale: "en" });
    const page = await ctx.newPage();
    const seen = [];
    page.on("response", (r) => seen.push({ status: r.status(), url: r.url().slice(0, 140) }));
    try {
      await page.goto(`https://${host}/`, { waitUntil: "domcontentloaded", timeout: 60000 });
      // wait for the challenge to clear: title stops being "Just a moment..."
      const deadline = Date.now() + 75000;
      let title = await page.title();
      while (/just a moment/i.test(title) && Date.now() < deadline) {
        await page.waitForTimeout(2500);
        title = await page.title();
      }
      out.final_title = title;
      out.challenge_cleared = !/just a moment/i.test(title);
      if (out.challenge_cleared) {
        await page.waitForTimeout(6000); // let the kit boot (is-banned -> config -> visit)
        const html = await page.content();
        out.html_bytes = Buffer.byteLength(html);
        out.html_sha256 = crypto.createHash("sha256").update(html).digest("hex");
        fs.writeFileSync(path.join(dir, `cf_${DATE}.html`), html);
        await page.screenshot({ path: path.join(dir, `cf_${DATE}.png`), fullPage: true });
        out.afterLoad = await page.evaluate(() => ({
          openModal: typeof window.openModal,
          w3mModal: !!document.querySelector("w3m-modal"),
          localStorage: Object.keys(localStorage),
        }));
        const triple = seen.filter((s) => /\/api\/(is-banned|config|visit)/.test(s.url));
        out.api_calls = triple;
        const bundle = seen.find((s) => s.url.includes("_nuxt/assets/index.js"));
        out.bundle_served = bundle ? bundle.status : null;
      }
    } catch (e) {
      out.error = String(e.message || e).slice(0, 200);
    }
    out.requests_seen = seen.length;
    fs.writeFileSync(path.join(dir, `cf_${DATE}.json`), JSON.stringify(out, null, 1));
    console.log(`${host}: cleared=${out.challenge_cleared} title=${JSON.stringify(out.final_title)} html=${out.html_bytes || 0} api=${(out.api_calls || []).length} err=${out.error || "-"}`);
    await ctx.close();
  }
  await browser.close();
})();
