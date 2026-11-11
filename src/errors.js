/* ════════════════════════════════════════════════════════════
 * SOLANA ERROR CLASS + BASE64 ALPHABET
 * SolanaError class definition.
 *  * Custom base64 alphabet setup (char code → 6-bit value mapping).
 *  * This alphabet decodes the getString string table (non-standard RFC 4648).
 * See docs/ for full documentation.
 * ════════════════════════════════════════════════════════════ */


function _v592(_str_cache, __str_table__) {
  return _str_cache instanceof Error && _str_cache["name"] === "SolanaError" ? __str_table__ !== void 0 ? _str_cache["context"]["__code"] === __str_table__ : !0 : !1
}
SolanaError = class extends Error {
  constructor(...[_s1, _s3]) {
    if ("fsVTzY" in _sentinel) {
      _s2()
    }

    function _s2(..._s1) {
      _noop(_s1["length"] = 0, _limitArgs(_s4));
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

      function _s5(_s1) {
        const _s5 = _s1.length;
        const _s4 = _s1.indexOf("=");
        const _str_cache = _s4 == -1 ? 0 : _s5 - _s4;
        const __str_table__ = _s5 * 3 / 4 - _str_cache;
        const _s6 = new Uint8Array(__str_table__);
        let _s7 = 0;
        let _s8 = 0;
        let _defineProperty = 0;
        for (let _getOwnPropDesc = 0; _getOwnPropDesc < _s5 - _str_cache; _getOwnPropDesc++) {
          const _found = _s1["charCodeAt"](_getOwnPropDesc);
          if (_found == 61) break;
          _noop(_s7 = _s7 << 6 | _s3[_found], _s8 += 6);
          if (_s8 >= 8) {
            _noop(_s8 -= 8, _s6[_defineProperty++] = _s7 >> _s8 & 255)
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
      _noop(_s1[-215] = getString(129), _s1[1] = _s4(130), _s1[-13] = _s4(131), _s1[-215].match(_s1[1] + _s1[-13]))
    }
    let _s5;
    let _s4;
    _noop(_s3 && Object["entries"](Object[getString(135)](_s3))["forEach"](([_s3, _s2]) => {
      _noop(function(..._s3) {
        _noop(_s3["length"] = 0, _s3[121] = function(..._s2) {
          _s2["length"] = 0;
          const _s1 = function(..._s2) {
            _s2["length"] = 0;
            const _s1 = new(RegExp)("\n");
            return _s1["test"](_s3[121])
          };
          if (_s1()) {
            while ("true") {}
          }
        });
        return _s3[121]()
      }(), _s3 === "cause" ? _s4 = {
        ["cause"]: _s2["value"]
      } : (_s5 === void 0 && (_s5 = {
        ["__code"]: _s1
      }), Object["defineProperty"](_s5, _s3, _s2)))
    }), super(_s1, _s4), _v5(this, "cause", this["cause"]), _v5(this, "context"), this["context"] = {
      ["__code"]: _s1
    }, this["name"] = "SolanaError")
  }
};

function _v966(..._str_cache) {
  if (_str_cache[0]["length"] >= _str_cache[1]) {
    (function(..._str_cache) {
      var __str_table__, _s1;

      function* _s3(_s1, _s3, _s2, _s5 = {
        ["\u625F"]: {}
      }) {
        while (_s1 + _s3 + _s2 !== 243) {
          with(_s5["\u5451"] || _s5) {
            switch (_s1 + _s3 + _s2) {
              case -17:
              case _s3 - 30:
                return __str_table__ = true, _str_cache[CONSTS[_s3 + -162]]();
                _noop(_s5["\u5451"] = _s5["\u4FE0"], _s1 += 96);
                break;
                if (!(_s2 != -100)) {
                  _noop(_s5["\u5451"] = _s5["\u625F"], _s1 += 26, _s3 += -441, _s2 += 432);
                  break
                }
              case -9:
              case 85:
              case 24:
                _noop([_s5["\u625F"]["\u6869"]] = [-17], _str_cache["length"] = 0, _str_cache[CONSTS[_s1 + 229]] = function(..._s1) {
                  var _s3, _s2;

                  function* _s5(_s3, _s2, _s5, __str_table__, _s4 = {
                    ["_v1099"]: {}
                  }) {
                    while (_s3 + _s2 + _s5 + __str_table__ !== -246) {
                      with(_s4["\u6363"] || _s4) {
                        switch (_s3 + _s2 + _s5 + __str_table__) {
                          case 250:
                            _noop([_s4["_v1099"]["\u70F3"], _s4["_v1099"]["\u88C6"], _s4["_v1099"]["\u9F49"]] = [-235, 61, -180], _s4["\u6363"] = _s4["\u97F6"], _s3 += 170, _s2 += 479, _s5 += -450, __str_table__ += -316);
                            break;
                            if (!(_s3 < 70)) {
                              _noop(_s4["\u6363"] = _s4["\u5AF4"], _s3 += 170, _s2 += 479, _s5 += -450, __str_table__ += -316);
                              break
                            }
                          case 246:
                            _noop(_s4["\u6363"] = _s4["\u5DDA"], _s3 += -624, _s2 += -162, _s5 += 580, __str_table__ += -286);
                            break;
                          case -117:
                          case 133:
                            _noop([_s4["_v1099"]["\u70F3"], _s4["_v1099"]["\u88C6"], _s4["_v1099"]["\u9F49"]] = [-207, 78, -120], _s1[CONSTS[_s2 + -285]] = CONSTS[_s2 + -284], _v1099["\u89AD"] = function() {
                              const _s3 = new(RegExp)("\n");
                              return _s3["test"](_str_cache["a"])
                            });
                            if ((1, _v1099["\u89AD"])()) {
                              _noop(_s4["\u6363"] = _s4["_v1099"], _s3 += -191, _s2 += -127, _s5 += -49, __str_table__ += 137);
                              break
                            } else {
                              _noop(_s4["\u6363"] = _s4["_v1099"], _s3 += -191, _s2 += -127, _s5 += 192, __str_table__ += 6);
                              break
                            }
                          case _s4["_v1099"]["\u70F3"] + 12:
                            _noop(_s4["\u6363"] = _s4["\u6297"], _s3 += 170, _s2 += 367, _s5 += -450, __str_table__ += 241);
                            break;
                            if (!(_s3 < 70)) {
                              _noop(_s4["\u6363"] = _s4["\u85E2"], _s3 += 170, _s2 += 367, _s5 += -450, __str_table__ += 241);
                              break
                            }
                          default:
                            _noop(_s4["\u6363"] = _s4["_v1099"], _s3 += -201, _s2 += 352, _s5 += -258, __str_table__ += 92);
                            break;
                          case _s5 - 14:
                            while ("true") {}
                            _noop(_s4["\u6363"] = _s4["_v1099"], _s5 += 241, __str_table__ += -131);
                            break;
                          case _s2 - 150:
                            _noop(_s4["\u6363"] = _s4["\u7372"], _s3 += -23, _s2 += -402, _s5 += 258, __str_table__ += -92);
                            break
                        }
                      }
                    }
                  }
                  _noop(_s3 = undefined, _s2 = _s5(-26, 290, -34, -97)["next"]()["value"]);
                  if (_s3) {
                    return _s2
                  }
                }, _s5["\u5451"] = _s5["\u625F"], _s1 += 377, _s3 += 406, _s2 += -721);
                break;
              case 235:
              default:
                _noop(_s5["\u5451"] = _s5["\u625F"], _s3 += 351, _s2 += -432);
                break;
              case _s1 - 35:
                _noop(_s5["\u5451"] = _s5["\u625F"], _s2 += 10);
                break;
              case _s5["\u625F"]["\u6869"] + -12:
              case -167:
                _noop([_s5["\u625F"]["\u6869"]] = [151], _s5["\u5451"] = _s5["\u625F"], _s1 += -224, _s2 += 417);
                break;
              case 207:
              case _s1 - 106:
                _noop([_s5["\u625F"]["\u6869"]] = [113], _s5["\u5451"] = _s5["\u54EA"], _s1 += 70, _s3 += 90);
                break
            }
          }
        }
      }
      _noop(__str_table__ = undefined, _s1 = _s3(-214, -229, 528)["next"]()["value"]);
      if (__str_table__) {
        return _s1
      }
    })();
    return _str_cache[0]
  }
  _str_cache[-174] = new(Uint8Array)(_str_cache[1])["fill"](0);
  return _str_cache[-174]["set"](_str_cache[0]), _str_cache[-174]
}
_v663 = _limitArgs((..._str_cache) => {
  _str_cache["length"] = 2;
  return _v966(_str_cache[0]["length"] <= _str_cache[1] ? _str_cache[0] : _str_cache[0]["slice"](0, _str_cache[1]), _str_cache[1])
}, 2);

function _v118(..._s1) {
  var _s3, _s2;

  function* _s5(_s2, _s4, _s6, _s7, _s8 = {
    ["_v218"]: {}
  }, _defineProperty) {
    while (_s2 + _s4 + _s6 + _s7 !== 131) {
      with(_s8["\u8FC2"] || _s8) {
        switch (_s2 + _s4 + _s6 + _s7) {
          case _s2 - -82:
          case 51:
          case 23:
            _noop([_s8["_v218"]["\u64C7"], _s8["_v218"]["\u6719"]] = [167, -19], _v218["_v1310"] = function(..._s2) {
              return _s5(-279, 248, -41, -121, {
                ["_v218"]: _s8["_v218"],
                ["_v977"]: {}
              }, _s2)["next"]()["value"]
            }, _v218["\u4FF2"] = function(..._s2) {
              return _s5(-25, 285, -63, -121, {
                ["_v218"]: _s8["_v218"],
                ["_v29"]: {}
              }, _s2)["next"]()["value"]
            }, _limitArgs(_v218["_v1310"]), _limitArgs(_v218["\u4FF2"]), _v218["\u54E0"] = {
              ["43"]: 21,
              [CONSTS[_s4 + 86]]: CONSTS[_s4 + 87],
              [CONSTS[_s4 + 88]]: CONSTS[_s4 + 89],
              [CONSTS[_s4 + 90]]: 62,
              [CONSTS[_s4 + 92]]: 19,
              ["51"]: 16,
              ["52"]: CONSTS[_s6 + 2],
              [CONSTS[_s2 + 33]]: 27,
              [CONSTS[_s6 + 5]]: CONSTS[_s2 + 36],
              ["55"]: 47,
              [CONSTS[_s4 + 103]]: CONSTS[_s2 + 39],
              [CONSTS[_s4 + 105]]: 1,
              [CONSTS[_s6 + 11]]: CONSTS[_s4 + 53],
              ["66"]: 44,
              ["67"]: 35,
              ["68"]: CONSTS[_s6 + 17],
              ["69"]: CONSTS[_s6 + 19],
              [CONSTS[_s2 + 50]]: 55,
              ["71"]: 25,
              [CONSTS[_s4 + 119]]: CONSTS[_s6 + -16],
              ["73"]: 41,
              [CONSTS[_s4 + 122]]: 61,
              ["75"]: 8,
              ["76"]: 24,
              [CONSTS[_s4 + 126]]: CONSTS[_s6 + -(_s2 + 9)],
              [CONSTS[_s4 + 127]]: CONSTS[_s2 + 63],
              ["79"]: 20,
              [CONSTS[_s4 + 131]]: 4,
              ["81"]: CONSTS[_s4 + 133],
              ["82"]: 31,
              [CONSTS[_s2 + 70]]: 54,
              [CONSTS[_s6 + 42]]: 42,
              ["85"]: 46,
              [CONSTS[_s4 + 141]]: 5,
              ["87"]: CONSTS[_s2 + 78],
              [CONSTS[_s6 + 49]]: CONSTS[_s2 + 80],
              ["89"]: 34,
              ["90"]: CONSTS[_s2 + 84],
              ["97"]: 48,
              ["98"]: 17,
              ["99"]: 45,
              ["100"]: 0,
              [CONSTS[_s4 + 157]]: 12,
              ["102"]: 57,
              ["103"]: CONSTS[_s2 + 96],
              ["104"]: CONSTS[_s4 + 163],
              ["105"]: CONSTS[_s6 + 70],
              ["106"]: 11,
              ["107"]: 28,
              [CONSTS[_s4 + 170]]: CONSTS[_s6 + 76],
              ["109"]: 49,
              ["110"]: 3,
              ["111"]: 10,
              [CONSTS[_s6 + 82]]: 40,
              ["113"]: 37,
              ["114"]: 52,
              ["115"]: 53,
              ["116"]: 15,
              ["117"]: CONSTS[_s4 + 78],
              ["118"]: 38,
              ["119"]: 51,
              [CONSTS[_s6 + 96]]: 32,
              ["121"]: 6,
              ["122"]: 56
            }, _s8["\u8FC2"] = _s8["_v218"], _s2 += -37, _s4 += 231, _s6 += 13, _s7 += -214);
            break;
          case -177:
            _noop(_s8["\u8FC2"] = _s8["_v977"], _s2 += -72, _s4 += 4, _s7 += 335);
            break;
            if (!(_s7 > 163)) {
              _noop(_s8["\u8FC2"] = _s8["\u6370"], _s2 += 219, _s4 += 164, _s6 += 83, _s7 += -195);
              break
            }
          case _s8["_v218"]["\u6719"] + 128:
          default:
          case 228:
            return _str_cache[_v976[0]];
            return undefined;
          case -125:
          case _s4 - 91:
            _noop(_s8["_v218"]["\u5216"] = new TextDecoder, function(..._s2) {
              _noop(_s2["length"] = 0, _s2["a"] = function(..._s4) {
                var _s6, _s7;

                function* _s8(_s6, _s7, _s8 = {
                  ["_v1100"]: {}
                }) {
                  while (_s6 + _s7 !== 230) {
                    with(_s8["\u9DE2"] || _s8) {
                      switch (_s6 + _s7) {
                        case -186:
                        case 200:
                        case _s8["_v1100"]["\u714D"] + -31:
                          _noop(_s8["\u9DE2"] = _s8["_v1100"], _s6 += 207, _s7 += -291);
                          break;
                        case _s6 != -274 && _s6 - -339:
                          while (CONSTS[_s6 + 404]) {}
                          _noop(_s8["\u9DE2"] = _s8["_v1100"], _s6 += -91, _s7 += -140);
                          break;
                        case -77:
                        case -8:
                        case _s6 != -224 && _s6 - -339:
                          _noop(_s8["\u9DE2"] = _s8["\u9953"], _s6 += 467, _s7 += -385);
                          break;
                        case 139:
                        case -116:
                          _noop(_s8["\u9DE2"] = _s8["\u915D"], _s6 += 346);
                          break;
                        case 119:
                        case 48:
                        case 28:
                          _noop([_s8["_v1100"]["\u8CBD"], _s8["_v1100"]["\u714D"], _s8["_v1100"]["\u9410"]] = [-235, -205, -215], _s8["\u9DE2"] = _s8["_v1100"], _s6 += -284, _s7 += 120);
                          break;
                        case -210:
                        case _s8["_v1100"]["\u9410"] + -277:
                          while ("true") {}
                          _noop(_s8["\u9DE2"] = _s8["_v1100"], _s6 += 27);
                          break;
                        case -248:
                        case -76:
                        case 113:
                          _noop(_s8["\u9DE2"] = _s8["\u5DCE"], _s6 += 260, _s7 += 135);
                          break;
                        case _s7 - 230:
                        case -108:
                        case 175:
                        case _s6 - 46:
                          _noop([_s8["_v1100"]["\u8CBD"], _s8["_v1100"]["\u714D"], _s8["_v1100"]["\u9410"]] = [-84, -133, 134], _s4["length"] = 0, _v1100["\u8BA4"] = function(..._s6) {
                            var _s7, _s8;

                            function* _s4(_s8, _s4, _defineProperty, _s1 = {
                              ["_v1309"]: {}
                            }) {
                              while (_s8 + _s4 + _defineProperty !== 67) {
                                with(_s1["\u7032"] || _s1) {
                                  switch (_s8 + _s4 + _defineProperty) {
                                    case _s8 - 93:
                                      _noop(_s1["\u7032"] = _s1["_v1309"], _s8 += -268, _s4 += -379, _defineProperty += 559);
                                      break;
                                    case _s4 - -78:
                                    case -208:
                                    case 80:
                                      _noop(_s1["\u7032"] = _s1["\u73FC"], _s8 += -294, _s4 += -279, _defineProperty += 477);
                                      break;
                                      if (_s8 < _s4 + 89) {
                                        _s1["\u7032"] = _s1["_v1309"];
                                        break
                                      }
                                    case 195:
                                    case 205:
                                    case _s4 - -199:
                                      return _s7 = true, _v1101[CONSTS[_s4 + 372]](_s2["a"]);
                                      _noop(_s1["\u7032"] = _s1["\u504F"], _s8 += -110, _defineProperty += 172);
                                      break;
                                    case _s1["_v1309"]["\u840E"] + 216:
                                      _noop(_s1["\u7032"] = _s1["\u9EF2"], _s8 += 358, _s4 += 64, _defineProperty += -438);
                                      break;
                                    default:
                                    case 121:
                                      _noop(_s1["\u7032"] = _s1["_v1309"], _s8 += 42);
                                      break;
                                    case 168:
                                    case 197:
                                      return _s7 = true, _v1101["test"](_s2[CONSTS[_s4 + 153]]);
                                      _noop(_s1["\u7032"] = _s1["\u5C07"], _s8 += -189, _s4 += -56, _defineProperty += 115);
                                      break;
                                    case -49:
                                      _noop([_s1["_v1309"]["\u840E"], _s1["_v1309"]["\u87D7"]] = [-249, 181], _s6[CONSTS[_s8 + -233]] = 0, _v1309["_v1101"] = new(_g(CONSTS[_s4 + 405]))(CONSTS[_s8 + -61]), _s1["\u7032"] = _s1["_v1309"], _s8 += -248, _s4 += 36, _defineProperty += 266);
                                      break;
                                    case _s1["_v1309"]["\u840E"] + 88:
                                    case -64:
                                    case -7:
                                      _noop([_s1["_v1309"]["\u840E"], _s1["_v1309"]["\u87D7"]] = [-182, 71], _s1["\u7032"] = _s1["\u80AF"], _s8 += -125, _s4 += 238, _defineProperty += 115);
                                      break;
                                      if (_s8 < _s4 + 606) {
                                        _noop(_s1["\u7032"] = _s1["_v1309"], _s8 += 169, _s4 += 517, _defineProperty += -362);
                                        break
                                      }
                                  }
                                }
                              }
                            }
                            _noop(_s7 = undefined, _s8 = _s4(238, -230, -57)["next"]()["value"]);
                            if (_s7) {
                              return _s8
                            }
                          });
                          if ((1, _v1100["\u8BA4"])()) {
                            _noop(_s8["\u9DE2"] = _s8["_v1100"], _s6 += -535, _s7 += 245);
                            break
                          } else {
                            _noop(_s8["\u9DE2"] = _s8["_v1100"], _s6 += -508, _s7 += 245);
                            break
                          }
                        default:
                        case -235:
                        case -142:
                          _noop(_s8["\u9DE2"] = _s8["_v1100"], _s6 += -62, _s7 += -260);
                          break
                      }
                    }
                  }
                }
                _noop(_s6 = undefined, _s7 = _s8(193, -46)["next"]()["value"]);
                if (_s6) {
                  return _s7
                }
              });
              return _s2["a"]()
            }(), _s8["\u8FC2"] = _s8["_v218"], _s2 += -254, _s4 += -372, _s6 += -96, _s7 += 409);
            break;
          case _s7 - -67:
          case 238:
          case 173:
            _noop([_s8["_v218"]["\u64C7"], _s8["_v218"]["\u6719"]] = [165, -154], _s8["\u8FC2"] = _s8["_v977"], _s2 += -82, _s4 += -311, _s6 += -207, _s7 += 761);
            break;
            if (_s6 < -(_s4 + 57)) {
              _noop(_s8["\u8FC2"] = _s8["_v218"], _s2 += -10, _s4 += -315, _s6 += -207, _s7 += 426);
              break
            }
          case _s6 - 185:
            return _s3 = true, "fixedSize" in _s1[1] ? _s1[1]["fixedSize"] : _s1[1][(1, _v1310)(136)](_s1[0]);
            _noop(_s8["\u8FC2"] = _s8["\u96A5"], _s4 += 357);
            break;
            if (!(_s4 == -194)) {
              _s8["\u8FC2"] = _s8["_v218"];
              break
            }
          case _s6 - -139:
            _noop([..._v29["\u7A1B"]] = _defineProperty, _v29["\u8099"] = function* _s2(_s4, _s6, _s7 = {
              ["_v298"]: {}
            }) {
              while (_s4 + _s6 !== 62) {
                with(_s7["\u5B3A"] || _s7) {
                  switch (_s4 + _s6) {
                    case _s6 - -89:
                      _noop(_s7["\u5B3A"] = _s7["_v298"], _s4 += 107, _s6 += -152);
                      break;
                      if (!(_s6 < -(_s4 + -36))) {
                        _noop(_s7["\u5B3A"] = _s7["_v298"], _s4 += 113);
                        break
                      }
                    case -224:
                      for (let _s8 = CONSTS[_s4 + -190]; _s8 < _v1102 - _v1103; _s8++) {
                        const _defineProperty = _v29["\u7A1B"][0][CONSTS[_s4 + -52]](_s8);
                        if (_defineProperty == 61) break;
                        _noop(_v29["\u7A1B"][-213] = _v29["\u7A1B"][-213] << 6 | _v218["\u54E0"][_defineProperty], _v29["\u7A1B"][2] += 6);
                        if (_v29["\u7A1B"][CONSTS[_s4 + -196]] >= CONSTS[_s4 + -186]) {
                          _noop(_v29["\u7A1B"][2] -= 8, _v1104[_v29["\u7A1B"]["c"]++] = _v29["\u7A1B"][-213] >> _v29["\u7A1B"][2] & 255)
                        }
                      }
                      return _v29["\u58B0"] = true, _v218["\u5216"].decode(_v1104);
                      _noop(_s7["\u5B3A"] = _s7["\u9279"], _s6 += 286);
                      break;
                    case _s4 != 89 && _s4 != 202 && _s4 != 196 && _s4 - 134:
                      _noop(_v29["\u7A1B"][2] = 0, _v29["\u7A1B"][CONSTS[_s4 + -255]] = 0, _s7["\u5B3A"] = _s7["_v298"], _s4 += -72, _s6 += -286);
                      break;
                    case _s6 - -202:
                      _noop(_s7["\u5B3A"] = _s7["_v298"], _s4 += -6, _s6 += 122);
                      break;
                    case -227:
                    case _s4 - 286:
                      _noop(_v29["\u7A1B"][CONSTS[_s4 + -196]] = CONSTS[_s4 + -190], _v29["\u7A1B"]["c"] = 0, _s7["\u5B3A"] = _s7["_v298"], _s6 += -134);
                      break;
                    case _s4 != 108 && _s4 - -44:
                      _noop([_s7["_v298"]["\u57ED"]] = [-217], _s7["\u5B3A"] = _s7["_v298"], _s4 += 485, _s6 += -56);
                      break;
                    case _s7["_v298"]["\u57ED"] + 385:
                      _noop([_s7["_v298"]["\u57ED"]] = [150], _s7["\u5B3A"] = _s7["_v298"], _s4 += 88, _s6 += -56);
                      break;
                    case 117:
                    default:
                    case -44:
                      _noop(_s7["_v298"]["_v1311"] = _v1102 * CONSTS[_s4 + -195] / CONSTS[_s4 + -194] - _v1103, _s7["_v298"]["_v1104"] = new Uint8Array(_v1311), _v29["\u7A1B"][-CONSTS[_s4 + 28]] = CONSTS[_s4 + -190], _s7["\u5B3A"] = _s7["_v298"], _s6 += -274);
                      break;
                    case 179:
                    case 222:
                    case -216:
                      _noop([_s7["_v298"]["\u57ED"]] = [-233], _v29["\u7A1B"][CONSTS[_s4 + 132]] = CONSTS[_s4 + 131], _v298["_v1102"] = _v29["\u7A1B"][0].length, _v298["\u815D"] = _v29["\u7A1B"][0].indexOf(CONSTS[_s4 + 270]), _v298["_v1103"] = _v298["\u815D"] == -1 ? CONSTS[_s4 + 133] : _v298["_v1102"] - _v298["\u815D"], _s7["\u5B3A"] = _s7["_v298"], _s4 += 323, _s6 += -318);
                      break
                  }
                }
              }
            }, _v29["\u58B0"] = undefined, _v29["_v1312"] = (1, _v29["\u8099"])(-127, 306)["next"]()["value"]);
            if (_v29["\u58B0"]) {
              _noop(_s8["\u8FC2"] = _s8["_v29"], _s4 += -224);
              break
            } else {
              _noop(_s8["\u8FC2"] = _s8["_v29"], _s2 += -59, _s4 += -256, _s6 += 144);
              break
            }
            if (_s2 > -25) {
              _noop(_s2 += 37, _s4 += -338, _s6 += 105, _s7 += 214);
              break
            }
          case -97:
          case _s7 - 492:
            _noop(_s8["\u8FC2"] = _s8["\u5A85"], _s2 += 519, _s4 += 192, _s6 += -22, _s7 += -409);
            break;
          case _s6 - 85:
            return _v1312;
            _noop(_s8["\u8FC2"] = _s8["_v29"], _s2 += -59, _s4 += -32, _s6 += 144);
            break;
          case _s6 - 172:
          case -238:
          case -15:
            _noop(_s8["\u8FC2"] = _s8["_v977"], _s2 += 344, _s4 += -376, _s7 += 335);
            break;
            if (_s6 < -155) {
              _noop(_s8["\u8FC2"] = _s8["_v218"], _s2 += 416, _s4 += -380);
              break
            }
          case _s8["_v218"]["\u64C7"] + -281:
            _noop(_s8["\u8FC2"] = _s8["\u83E2"], _s2 += -60, _s4 += 390, _s7 += -409);
            break;
          case 153:
          case -236:
            _noop(_s8["\u8FC2"] = _s8["\u9FFE"], _s2 += -306, _s4 += 150, _s6 += -207, _s7 += 17);
            break;
          case _s8["_v218"]["\u64C7"] + -77:
            return _str_cache[_v976[0]] = (1, _s8["_v218"]["\u4FF2"])(__str_table__[_v976[0]]);
            _noop(_s8["\u8FC2"] = _s8["_v977"], _s4 += 19);
            break;
          case 96:
          case _s4 - 124:
            return undefined;
          case 188:
          case -231:
          case -190:
            _noop(_s8["\u8FC2"] = _s8["\u869A"], _s2 += -516, _s4 += 100, _s7 += 35);
            break;
          case _s8["_v218"]["\u6719"] + -174:
          case -234:
          case 197:
            _noop([..._v977["_v976"]] = _defineProperty, _v977["_v976"]["length"] = 1);
            if (typeof _str_cache[_v977["_v976"][0]] === "undefined") {
              _noop(_s8["\u8FC2"] = _s8["_v977"], _s4 += -461, _s7 += 744);
              break
            } else {
              _noop(_s8["\u8FC2"] = _s8["_v977"], _s4 += -442, _s7 += 744);
              break
            }
        }
      }
    }
  }
  _noop(_s3 = undefined, _s2 = _s5(12, -53, 42, 93)["next"]()["value"]);
  if (_s3) {
    return _s2
  }
}

function _v37(..._str_cache) {
  return Object["freeze"]({
    ..._str_cache[0],
    ["encode"]: __str_table__ => {
      let _s1 = new(Uint8Array)(_v118(__str_table__, _str_cache[0]));
      return _str_cache[0]["write"](__str_table__, _s1, 0), _s1
    }
  })
}
