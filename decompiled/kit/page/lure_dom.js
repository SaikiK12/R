/**
 * Lure HTML DOMContentLoaded dictionary injection — fully decoded.
 *
 * The raw lure HTML ships with word-salad placeholder text in every
 * element. On DOMContentLoaded a handler swaps every element's content
 * from the encoded pitch dictionary. The dictionary is obfuscated three
 * ways: split literals, zero-width characters, and Cyrillic homoglyphs.
 *
 * This module documents the COMPLETE decoded dictionary for pumpanakin.fun
 * and the exact injection mechanism, reconstructed from lure.html
 * (archive/pumpanakin.fun/lure.html).
 *
 * === Obfuscation techniques applied to the dictionary ===
 *
 * 1. SPLIT STRING LITERALS
 *    "claim "+"reward", "bigges"+"t Trum"+"p Coin", "23:59:"+"59"
 *    → bypasses regex substring signatures over source text
 *
 * 2. ZERO-WIDTH CHARACTERS inside visible words
 *    U+200B (ZWSP), U+200C (ZWNJ), U+200D (ZWJ),
 *    U+2062 (INVISIBLE TIMES), U+2063 (INVISIBLE SEPARATOR)
 *    → "le\u2062\u2063\u0430r\u200Bn \u2062mor\u0435" renders as "learn more"
 *    → bypasses exact-substring blocklists
 *
 * 3. CYRILLIC HOMOGLYPHS for Latin letters
 *    а (U+0430) ≡ a, е (U+0435) ≡ e, о (U+043E) ≡ o,
 *    р (U+0440) ≡ p, с (U+0441) ≡ c, т (U+0442) ≡ t,
 *    у (U+0443) ≡ u, А (U+0410) ≡ A, С (U+0421) ≡ C,
 *    О (U+041E) ≡ O, Р (U+0420) ≡ R
 *    → "Рrivасу Роliсy" looks like "Privacy Policy" but isn't
 *    → bypasses case-insensitive text signatures and copy-paste into search engines
 *
 * === Complete decoded dictionary (all 36 keys) ===
 *
 * Key   → Rendered text (after zero-width stripping and homoglyph normalization)
 * ---     ---------------------------------------------------------------------------
 * _k    → "claim reward"                (button text: main CTA)
 * _v    → "Take part in the "
 * _j    → "biggest Trump Coin"
 * _b    → " airdrop"
 * _8    → "the first official airdrop from the president of an entire country, aimed at helping active participants."
 * _x    → "claim reward"                (secondary CTA button)
 * _9    → "learn more"                  (secondary CTA button)
 * _e    → "about airdrop"               (section heading)
 * _4    → "Official trump "
 * _i    → " coin airdrop"
 * _s    → "The official Airdrop "
 * _3    → " from the Trump team"
 * _g    → "Available "
 * _r    → " For Everyone"
 * _f    → "each participant can "
 * _w    → " successfully claim a reward"
 * _d    → "23:59:59"                    (fake countdown target)
 * _z    → "$100.000"                    (European thousands separator — typo reveal)
 * _1    → "Q1 Airdrop"
 * _7    → "Users can claim "
 * _u    → " rewards along their"
 * _c    → "claim"                       (button inside Q1 card)
 * _t    → "$100.000"                    (Q2 amount)
 * _n    → "Q2 Airdrop"
 * _q    → "Users will be able to get rewards "
 * _y    → " for their achievements later"
 * _a    → "coming soon"                 (Q3 status)
 * _m    → "$100.000"                    (Q3 amount)
 * _6    → "Q3 Airdrop"
 * _o    → "Users will be able to get rewards "
 * _5    → " for their achievements later"
 * _0    → "coming soon"
 * _p    → "Participate "
 * _h    → "now!"
 * _l    → "Don't miss your chance to get a Trump Coin "
 * _2    → " in the official airdrop from the Trump team"
 * _kk   → "connect wallet"              (bottom CTA — Cyrillic с, а, е in original)
 * _vk   → "© 2025 — All rights reserved"
 * _jk   → "Contact us"                  (footer link → openModal())
 * _bk   → "Privacy Policy"              (footer link → openModal(), Cyrillic homoglyphs)
 * _8k   → "Our Services"                (footer link → openModal(), Cyrillic homoglyphs)
 *
 * === Injection mechanism ===
 *
 * The handler runs on "DOMContent"+"Loaded" (split to bypass signatures):
 *
 *   addEventListener("DOMCon"+"tentLo"+"aded", () => {
 *     const dict = { _k: "claim reward", ... };
 *     for (const key in dict) {
 *       const value = dict[key];
 *       if (key === "title") {
 *         document.querySelector(key).textContent = value;
 *       } else {
 *         const el = document.getElementById(key);
 *         if (el) el.outerHTML = value;
 *       }
 *     }
 *   });
 *
 * Note: outerHTML replacement means the element and its ID are REPLACED
 * entirely with the decoded string. After injection, getElementById()
 * for any of these IDs will return null — the IDs exist only before the
 * handler fires. This is a defensive measure: a snapshot crawler that
 * runs JS but fires after the event will see the decoded text but no
 * matching IDs, making automated re-extraction harder.
 *
 * === Every clickable element calls window.openModal() ===
 *
 * All 8 interactive elements: "claim reward" (×2), "learn more",
 * "Participate now!", "connect wallet", "Contact us", "Privacy Policy",
 * "Our Services" — all call:
 *
 *   window[atob('b3Blbg==') + 'Moda' + 'l']()
 *   = window['open' + 'Moda' + 'l']()
 *   = window.openModal()
 *
 * atob('b3Blbg==') = 'open'. The function name is never assembled in a
 * single literal — always split into 2–3 fragments, defeating naive
 * static analysis searching for "openModal".
 *
 * === Urgency / engagement helpers (sbdst.js) ===
 *
 * sbdst.js (670 bytes, non-kit) adds two effects:
 *   1. Mouse parallax effect (jQuery mousemove on the section)
 *   2. Countdown from 23:59:59 displayed in element #_d:
 *        When counter hits 0: alert("Время вышло!")  ("Time's up!" in Russian)
 *      The countdown is cosmetic only — it always resets on reload.
 *
 * === Anti-translate ===
 *
 * <html lang="ru" class="notranslate" translate="no">
 *   lang="ru"      → Telegram/browser shows Russian-language UI
 *   notranslate    → Chrome's translate bar never appears
 *   translate="no" → W3C attribute disabling translation
 * Combined effect: browser auto-translate never fires, so the carefully
 * constructed homoglyph/zero-width text is never mangled by a translator.
 */

// The complete 36-key pitch dictionary, clean (zero-widths and homoglyphs normalized)
export const LURE_DICT = {
  _k:   "claim reward",
  _v:   "Take part in the ",
  _j:   "biggest Trump Coin",
  _b:   " airdrop",
  _8:   "the first official airdrop from the president of an entire country, aimed at helping active participants.",
  _x:   "claim reward",
  _9:   "learn more",
  _e:   "about airdrop",
  _4:   "Official trump ",
  _i:   " coin airdrop",
  _s:   "The official Airdrop ",
  _3:   " from the Trump team",
  _g:   "Available ",
  _r:   " For Everyone",
  _f:   "each participant can ",
  _w:   " successfully claim a reward",
  _d:   "23:59:59",
  _z:   "$100.000",         // European thousands separator is intentional (native audience)
  _1:   "Q1 Airdrop",
  _7:   "Users can claim ",
  _u:   " rewards along their",
  _c:   "claim",
  _t:   "$100.000",
  _n:   "Q2 Airdrop",
  _q:   "Users will be able to get rewards ",
  _y:   " for their achievements later",
  _a:   "coming soon",
  _m:   "$100.000",
  _6:   "Q3 Airdrop",
  _o:   "Users will be able to get rewards ",
  _5:   " for their achievements later",
  _0:   "coming soon",
  _p:   "Participate ",
  _h:   "now!",
  _l:   "Don't miss your chance to get a Trump Coin ",
  _2:   " in the official airdrop from the Trump team",
  _kk:  "connect wallet",
  _vk:  "© 2025 — All rights reserved",
  _jk:  "Contact us",
  _bk:  "Privacy Policy",
  _8k:  "Our Services",
};
