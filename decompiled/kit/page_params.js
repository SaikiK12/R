/**
 * Campaign source and page-host helpers (original names 鼄 and 浚).
 *
 * These ship in the bundle as JS-Confuser generator state machines
 * (dynamic `case` values over a 4-variable state). The logic below was
 * recovered by emulating the extracted generators from the reference
 * sample in Node with stubbed `location`, `document`, and storage.
 * Observed behavior, per scenario:
 *
 *   readCampaignSource():
 *     localStorage "_0x6" = "cached"  -> "cached"   (cache wins over URL)
 *     ?utm_source=telegram            -> "telegram" (and cached)
 *     referrer https://t.me/x         -> "t.me"     (and cached)
 *     referrer https://sub.reddit.com -> "sub.reddit.com"
 *     utm_source=<non-ASCII or 1 char>-> undefined   (nothing cached)
 *     nothing anywhere                -> undefined
 *
 *   pageHost():
 *     hostname www.pumpanakin.fun     -> "pumpanakin.fun"
 *     ?...&d=<base-x(host)>           -> decoded host
 *     /connect/<base-x(host)>         -> decoded host
 *     otherwise                       -> hostname minus "www."
 */

const SOURCE_STORAGE_KEY = "_0x6"; // original name 狹

// 遭: a usable source tag is printable ASCII, 2..256 chars.
const SOURCE_VALID = /^[ -~]{2,256}$/;

// 鵷: host capture out of a referrer URL.
const REFERRER_HOST = /https?:\/\/([a-z.-]+)/i;

// 鼸: &d=<slug> anywhere in the query string.
const D_PARAM = /&d=([a-z\d_-]+)/;

// 暣: /connect/<slug> path, optional "?".
const CONNECT_PATH = /^\/connect\/\??([a-z\d_-]+)/;

// 螇: host capture out of a full URL (fallback: the page URL itself).
const URL_HOST = /^https?:\/\/([^/:]+)(:\d+)?\//;

// 鍇: base-x decode alphabet used for &d= and /connect/ slugs.
const SLUG_ALPHABET = "wrqeh3gsb2ca1pjykixvo46zf98unm57ld0t_-";

// 屌 = UTF-8 decode over base-x decode.
function decodeSlug(slug) {
  return new TextDecoder().decode(baseXDecode(slug, SLUG_ALPHABET));
}

// 啐: display host, "www." stripped.
function stripWww(host) {
  return host.indexOf("www.") === 0 ? host.slice(4) : host;
}

// 鼄: campaign source. Cached value (localStorage, JSON) beats anything
// fresh; otherwise utm_source, otherwise the referrer's host. A fresh
// value is kept only if it passes SOURCE_VALID, then cached.
function readCampaignSource() {
  const cached = storage.get(SOURCE_STORAGE_KEY); // JSON.parse(localStorage["_0x6"])
  if (cached) return cached;

  let source =
    new URLSearchParams(location.search).get("utm_source") ?? undefined;
  if (!source && document.referrer) {
    source = REFERRER_HOST.exec(document.referrer)?.[1];
  }
  if (source && SOURCE_VALID.test(source)) {
    storage.set(SOURCE_STORAGE_KEY, source); // JSON.stringify
    return source;
  }
  return undefined;
}

// 恶: operator host when the page itself was loaded through a
// /connect/<slug> link; falls back to the page URL host, then hostname.
function connectLinkHost() {
  const { hostname, search, pathname } = location;
  try {
    const match = CONNECT_PATH.exec(pathname + search);
    if (match) return decodeSlug(match[1]);
    const fromUrl = URL_HOST.exec(pageUrl()); // 樶("E1XAf5").url
    return stripWww(fromUrl?.[1] ?? hostname);
  } catch {
    return stripWww(hostname);
  }
}

// 浚: the host the page is operating for. A &d= slug wins over a
// /connect/ link, which wins over the plain host.
function pageHost() {
  const { hostname, search, pathname } = location;
  const dParam = D_PARAM.exec(search);
  if (dParam) return stripWww(decodeSlug(dParam[1]));
  if (CONNECT_PATH.test(pathname + search)) return connectLinkHost();
  return stripWww(hostname);
}

