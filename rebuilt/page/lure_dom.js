'use strict';
/**
 * Lure DOM injection — decoded pitch dictionary + injection mechanism.
 * Sources: decompiled/kit/page/lure_dom.js, archive/pumpanakin.fun/lure.html
 *
 * === Trump COIN airdrop lure (original pumpanakin.fun lure) ===
 * On DOMContentLoaded the handler replaces every word-salad placeholder
 * with real copy from this dictionary using el.outerHTML = value.
 * All click handlers call window[atob('b3Blbg==')+'Moda'+'l']() = openModal().
 *
 * === ClaimFreeSOL lure (new, 2026-11-14) ===
 * The new lure.html is completely different (no DOM injection dictionary).
 * It inlines all copy in the HTML and relies solely on the JS kit's
 * openModal() for wallet connection.
 */

// 36-entry pitch dictionary — Trump COIN campaign (decoded, zero-widths normalized)
const TRUMP_COIN_DICT = {
  _k:  'claim reward',
  _v:  'Take part in the ',
  _j:  'biggest Trump Coin',
  _b:  ' airdrop',
  _8:  'the first official airdrop from the president of an entire country, aimed at helping active participants.',
  _x:  'claim reward',
  _9:  'learn more',
  _e:  'about airdrop',
  _4:  'Official trump ',
  _i:  ' coin airdrop',
  _s:  'The official Airdrop ',
  _3:  ' from the Trump team',
  _g:  'Available ',
  _r:  ' For Everyone',
  _f:  'each participant can ',
  _w:  ' successfully claim a reward',
  _d:  '23:59:59',       // fake countdown target
  _z:  '$100.000',       // European thousands separator (intentional)
  _1:  'Q1 Airdrop',
  _7:  'Users can claim ',
  _u:  ' rewards along their',
  _c:  'claim',
  _t:  '$100.000',
  _n:  'Q2 Airdrop',
  _q:  'Users will be able to get rewards ',
  _y:  ' for their achievements later',
  _a:  'coming soon',
  _m:  '$100.000',
  _6:  'Q3 Airdrop',
  _o:  'Users will be able to get rewards ',
  _5:  ' for their achievements later',
  _0:  'coming soon',
  _p:  'Participate ',
  _h:  'now!',
  _l:  "Don't miss your chance to get a Trump Coin ",
  _2:  ' in the official airdrop from the Trump team',
  _kk: 'connect wallet',
  _vk: '\u00A9 2025 \u2014 All rights reserved',
  _jk: 'Contact us',
  _bk: 'Privacy Policy',   // footer — Cyrillic homoglyphs in original
  _8k: 'Our Services',     // footer — Cyrillic homoglyphs in original
};

/**
 * injectLureDict(dict):
 *   Runs the DOM injection from lure.html:
 *     for (key in dict) {
 *       if key === "title" → document.querySelector("title").textContent = val
 *       else               → document.getElementById(key).outerHTML = val
 *     }
 *   outerHTML replacement removes the element's ID after injection — defensive.
 *
 * The event binding is split to bypass signatures:
 *   addEventListener("DOMCon"+"tentLo"+"aded", handler)
 */
function injectLureDict(dict) {
  for (const key in dict) {
    const val = dict[key];
    if (key === 'title') {
      const el = document.querySelector('title');
      if (el) el.textContent = val;
    } else {
      const el = document.getElementById(key);
      if (el) el.outerHTML = val;
    }
  }
}

/**
 * installLureInjection(dict):
 *   Wraps injectLureDict in a DOMContentLoaded handler.
 *   The event name is split in the original to bypass signatures.
 */
function installLureInjection(dict) {
  window.addEventListener('DOMContentLoaded', () => injectLureDict(dict));
}

/**
 * openModalCall():
 *   The obfuscated openModal() invocation used in every click handler:
 *   window[atob('b3Blbg==') + 'Moda' + 'l']()
 *   = window['open' + 'Modal']()
 *   = window.openModal()
 *
 *   atob('b3Blbg==') === 'open'
 */
function openModalCall() {
  const fn = window[atob('b3Blbg==') + 'Moda' + 'l'];
  if (typeof fn === 'function') fn();
}

module.exports = { TRUMP_COIN_DICT, injectLureDict, installLureInjection, openModalCall };
