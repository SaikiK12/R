'use strict';
/**
 * /api/visit beacon.
 * Sources: decompiled/kit/page/visit.js, bundle.deobfuscated.js lines 33381-33399
 *
 * Suppression conditions (all from deob):
 *   1. URL contains "?b=" (connect domain arrival — ?b=1)
 *   2. Within 900 s of a successful "ok" response (cached in localStorage["_0x5"])
 *   3. config.Ne.dt is set (config drift flag — forced skip)
 */

const { readCampaignSource, pageHost } = require('./params');

const VISIT_COOLDOWN = 900;      // seconds
const LS_VISIT_KEY   = '_0x5';  // localStorage key: unix seconds of last visit

function _now() { return Math.floor(Date.now() / 1000); }

function _lsGet(k) { try { return localStorage.getItem(k); } catch { return null; } }
function _lsSet(k, v) { try { localStorage.setItem(k, String(v)); } catch { /* ignore */ } }

async function sendVisit(config, tgUser) {
  // Suppression 1: connect domain redirect
  if (typeof location !== 'undefined' && location.search.includes('b=')) return;

  // Suppression 2: cooldown
  const last = _lsGet(LS_VISIT_KEY);
  if (last && _now() - Number(last) < VISIT_COOLDOWN) return;

  // Suppression 3: config drift flag
  if (config?.Ne?.dt) return;

  const url = new URL('https://' + config.Se + '/api/visit');
  const src  = readCampaignSource();
  if (src) url.searchParams.set('source', src);

  const host = typeof location !== 'undefined' ? pageHost() : config.Se;
  if (config.Se !== host) url.searchParams.set('origin', host);

  if (tgUser) {
    url.searchParams.set('tgid', String(tgUser.id ?? tgUser.tgid ?? ''));
    const username = tgUser.username ?? tgUser.tgus;
    if (username) url.searchParams.set('tgus', username);
  }

  try {
    const r = await fetch(url.toString(), { method: 'POST' });
    if ((await r.text()) === 'ok') _lsSet(LS_VISIT_KEY, _now());
  } catch { /* network error — silent */ }
}

module.exports = { sendVisit, VISIT_COOLDOWN, LS_VISIT_KEY };
