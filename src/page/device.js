/**
 * rebuilt/page/device.js
 *
 * Device / UA detection module.
 *
 * Sources:
 *   - bundle.deobfuscated.js lines 17064–17080 (UA flag variables)
 *   - AUDIT_AND_ROADMAP.md (M3 — missing device detection)
 *
 * All variables set at module init time, mirroring the bundle's global assignment.
 * The `Ge` byte (wallet connection type) returned by 詬() is used in /api/handler events.
 */

'use strict';

const UA = typeof navigator !== 'undefined' ? navigator.userAgent : '';

// ── Platform detection booleans ─────────────────────────────────────────
const isSolflareMobile = UA.includes('Solflare-Mobile');
const isIOS      = /iPhone|iPad/.test(UA) || (isSolflareMobile && 'standalone' in navigator);
const isAndroid  = UA.includes('Android') || (isSolflareMobile && !isIOS);
const isMobile   = isIOS || isAndroid;
const isWindows  = UA.includes('Windows');
const isMacOS    = !isAndroid && /Macintosh|Mac OS X/.test(UA);
const isLinux    = !isAndroid && /Linux|CrOS/.test(UA);
const isSafari   = (isIOS || isMacOS) && UA.includes('Safari') && !/Chrome|CriOS/.test(UA);
const isFirefox  = /Firefox|FxiOS/.test(UA);
const isChrome   = !isSafari && /Chrome|CriOS/.test(UA);
const isTwitter  = /Twitter| X App/.test(UA); // X (Twitter) in-app browser detection

// ── Telegram WebView detection ───────────────────────────────────────────
// 瘄 = "TelegramWebview" in window || "TelegramWebviewProxy" in window
// 丯 = 瘄 && location.hash.includes("tgWebAppVersion")
const isTelegramWebview = typeof window !== 'undefined' &&
  ('TelegramWebview' in window || 'TelegramWebviewProxy' in window);
const hasTgWebAppVersion = isTelegramWebview &&
  typeof location !== 'undefined' &&
  location.hash && location.hash.includes('tgWebAppVersion');

// ── 詬(): device type byte ───────────────────────────────────────────────
// Used as the `Ge` field in /api/handler binary events.
// 0 = iOS, 1 = Android, 2 = Windows, 3 = macOS, 4 = Linux, 5 = unknown/other
function getDeviceType() {
  if (isIOS)     return 0;
  if (isAndroid) return 1;
  if (isWindows) return 2;
  if (isMacOS)   return 3;
  if (isLinux)   return 4;
  return 5;
}

// ── Mobile check with width fallback ────────────────────────────────────
// The kit uses BOTH the UA check AND window.innerWidth < 768
// (from decompiled/kit/page/mobile.js)
function isMobileDevice() {
  if (isMobile) return true;
  if (typeof window !== 'undefined' && window.innerWidth < 768) return true;
  return false;
}

// ── Chrome nag ────────────────────────────────────────────────────────────
// String [180]: "Please open this page in Chrome to continue with "
// Shown as alert() on Android when the browser is NOT Chrome — some wallet
// deep-link schemes only work from Chrome on Android.
const CHROME_NAG_PREFIX = 'Please open this page in Chrome to continue with ';

function showChromeNag(walletName) {
  if (isAndroid && !isChrome) {
    alert(CHROME_NAG_PREFIX + walletName);
  }
}

module.exports = {
  UA,
  isSolflareMobile, isIOS, isAndroid, isMobile, isWindows,
  isMacOS, isLinux, isSafari, isFirefox, isChrome,
  isTelegramWebview, hasTgWebAppVersion, isTwitter,
  getDeviceType, isMobileDevice, showChromeNag,
  CHROME_NAG_PREFIX,
};
