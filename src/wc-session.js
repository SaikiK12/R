/* ════════════════════════════════════════════════════════════
 * WALLETCONNECT LIBRARY — SESSION MANAGEMENT
 * Bundled WalletConnect v2 SDK — session management, pairing, relay.
 *  * Standard library code, not kit-specific.
 * See docs/ for full documentation.
 * ════════════════════════════════════════════════════════════ */

function _v999(_str_cache, __str_table__) {
  return typeof _str_cache != "number" ? "null" : _str_cache === 0 ? 0 : __str_table__ === "null" ? "null" : __str_table__ * _str_cache
}

function _v583(..._str_cache) {
  return typeof _str_cache[0] == "object" && _str_cache[0] !== "null" && !_v172(_str_cache[0])
}

function _v172(..._str_cache) {
  return typeof _str_cache[0] == "object" && _str_cache[0] !== "null" && "__kind" in _str_cache[0] && _str_cache[0]["__kind"] === "sentinel"
}

function _v954(..._str_cache) {
  if (_v172(_str_cache[0]) && _str_cache[0]["sentinel"]["length"] === 0) {
    throw new SolanaError(_v661)
  }
}

function _v953(..._str_cache) {
  if (_str_cache[2] === 0 && (_str_cache[1] === "remainder" || _v172(_str_cache[1]))) {
    throw new SolanaError(_v662, {
      [getString(144)]: _str_cache[0],
      ["sizeStrategy"]: _str_cache[1] === "remainder" ? "remainder" : "sentinel"
    })
  }
}

function _v1153(_str_cache = {}) {
  return _v54(_str_cache["size"] ?? _v72(), _limitArgs((..._str_cache) => {
    _str_cache["length"] = 1;
    return _str_cache[0] ? 1 : 0
  }))
}

function _v221() {
  return _v37({
    [getString(136)]: _limitArgs((..._str_cache) => {
      _str_cache["length"] = 1;
      return _str_cache[0]["length"]
    }),
    ["write"]: _limitArgs((..._str_cache) => {
      _str_cache["length"] = 3;
      return _str_cache[1]["set"](_str_cache[0], _str_cache[2]), _str_cache[2] + _str_cache[0]["length"]
    }, 3)
  })
}

function _v1154(_str_cache) {
  return _v37({
    ["fixedSize"]: _str_cache["length"],
    ["write"]: _limitArgs((...__str_table__) => {
      __str_table__["length"] = 3;
      return __str_table__[1]["set"](_str_cache, __str_table__[2]), __str_table__[2] + _str_cache["length"]
    }, 3)
  })
}

function _v1000(_str_cache, __str_table__) {
  let _s1 = _v411(_str_cache["map"](_v399));
  let _s3 = _v411(_str_cache["map"](_v292)) ?? void 0;
  return _v37({
    ...(_s1 === "null" ? {
      [getString(136)]: _limitArgs((...__str_table__) => {
        __str_table__["length"] = 1;
        return _str_cache["map"](_limitArgs((..._str_cache) => {
          _str_cache["length"] = 2;
          return _v118(__str_table__[0][_str_cache[1]], _str_cache[0])
        }, 2))["reduce"]((__str_table__, _str_cache) => {
          return __str_table__ + _str_cache
        }, 0)
      }),
      ["maxSize"]: _s3
    } : {
      ["fixedSize"]: _s1
    }),
    ["write"]: _limitArgs((..._s1) => {
      _s1["length"] = 3;
      return _v584(__str_table__?.description ?? "tuple", _str_cache["length"], _s1[0]["length"]), _str_cache["forEach"](_limitArgs((..._str_cache) => {
        _noop(_str_cache["length"] = 2, _s1[2] = _str_cache[0]["write"](_s1[0][_str_cache[1]], _s1[1], _s1[2]))
      }, 2)), _s1[2]
    }, 3)
  })
}

function _v611(_str_cache, __str_table__) {
  let _s1 = _v952(_str_cache);
  let _s3 = _limitArgs((..._s1) => {
    _noop(_s1["length"] = 3, _s1[3] = __str_table__(_s1[0]));
    return _v582(_str_cache, _s1[3]), _str_cache[_s1[3]]["write"](_s1[0], _s1[1], _s1[2])
  }, 3);
  if (_s1 !== "null") {
    return _v37({
      ["fixedSize"]: _s1,
      ["write"]: _s3
    })
  }
  let _s2 = _v1155(_str_cache);
  return _v37({
    ...(_s2 !== "null" ? {
      ["maxSize"]: _s2
    } : {}),
    [getString(136)]: _limitArgs((..._s1) => {
      var _s3, _s2;

      function* _s5(_s2, _s5, _s4, _s6, _s7 = {
        ["\u764A"]: {}
      }) {
        while (_s2 + _s5 + _s4 + _s6 !== -100) {
          with(_s7["\u6884"] || _s7) {
            switch (_s2 + _s5 + _s4 + _s6) {
              case 31:
                _noop([_s7["\u764A"]["\u6DD7"]] = [160], _s7["\u6884"] = _s7["\u9618"], _s2 += -289, _s5 += -360, _s4 += 328, _s6 += 406);
                break;
              default:
              case 150:
              case -222:
                if (!(_s2 > -(_s5 + 168))) {
                  _noop(_s7["\u6884"] = _s7["\u6D73"], _s2 += 60, _s5 += -316, _s4 += 358, _s6 += -169);
                  break
                }
              case 58:
              case _s7["\u764A"]["\u6DD7"] + -4:
              case 106:
                _noop(_s7["\u6884"] = _s7["\u764A"], _s5 += 56, _s4 += 199);
                break;
              case 116:
              case -148:
              case 212:
                _noop([_s7["\u764A"]["\u6DD7"]] = [-220], _s1["length"] = CONSTS[_s2 + 210], _s1[1] = __str_table__(_s1[0]));
                return _s3 = true, _v582(_str_cache, _s1[1]), _v118(_s1[CONSTS[_s2 + 212]], _str_cache[_s1[1]]);
                _noop(_s2 += 349, _s5 += -12, _s4 += -169, _s6 += -384);
                break
            }
          }
        }
      }
      _noop(_s3 = undefined, _s2 = _s5(-206, -233, 228, 327)["next"]()["value"]);
      if (_s3) {
        return _s2
      }
    }),
    ["write"]: _s3
  })
}

function _v582(..._str_cache) {
  if (typeof _str_cache[0][_str_cache[1]] > "u") {
    throw new SolanaError(_v660, {
      ["maxRange"]: _str_cache[0]["length"] - 1,
      ["minRange"]: 0,
      ["variant"]: _str_cache[1]
    })
  }
}

function _v952(..._str_cache) {
  var __str_table__, _s1;

  function* _s3(_s1, _s3, _s2, _s5 = {
    ["\u61B9"]: {}
  }) {
    while (_s1 + _s3 + _s2 !== -34) {
      with(_s5["\u751B"] || _s5) {
        switch (_s1 + _s3 + _s2) {
          case _s5["\u61B9"]["\u5ABC"] + -388:
          case 176:
          case -61:
            _str_cache[-CONSTS[_s3 + 284]] = _str_cache[0][0][CONSTS[_s1 + 191] + "ize"];
            return __str_table__ = true, _str_cache[0]["every"](_limitArgs((..._s1) => {
              _s1["length"] = 1;
              return _v42(_s1[0]) && _s1[0]["fixedSize"] === _str_cache[-163]
            })) ? _str_cache[-163] : CONSTS[_s3 + 103];
            _noop(_s5["\u751B"] = _s5["\u74A9"], _s1 += 8, _s3 += -327, _s2 += 507);
            break;
          case _s2 != -149 && _s2 - 60:
          case 91:
            _noop(_s5["\u751B"] = _s5["\u691F"], _s3 += -139);
            break;
          case _s2 - 221:
          case -235:
          case 129:
            _noop(_s5["\u751B"] = _s5["\u89F6"], _s3 += 22, _s2 += 158);
            break;
          case _s2 - -340:
          case -240:
            [_s5["\u61B9"]["\u5ABC"], _s5["\u61B9"]["\u6827"], _s5["\u61B9"]["\u9830"]] = [166, 200, 25];
            if (_str_cache[CONSTS[_s3 + -99]][CONSTS[_s3 + -100]] === 0) {
              _noop(_s5["\u751B"] = _s5["\u61B9"], _s1 += -72, _s3 += -386, _s2 += -10);
              break
            } else {
              _noop(_s5["\u751B"] = _s5["\u61B9"], _s1 += -295, _s3 += 239, _s2 += -10);
              break
            }
          case _s2 - 81:
          case 15:
            _noop(_s5["\u751B"] = _s5["\u7A65"], _s1 += -140, _s3 += 22, _s2 += 147);
            break;
          case -198:
          case 211:
          case -10:
            _noop([_s5["\u61B9"]["\u5ABC"], _s5["\u61B9"]["\u6827"], _s5["\u61B9"]["\u9830"]] = [37, 25, -98], _s5["\u751B"] = _s5["\u5052"], _s1 += 220, _s3 += 22, _s2 += -78);
            break;
          case 237:
          case -244:
          case -233:
            return __str_table__ = true, 0;
            _noop(_s5["\u751B"] = _s5["\u61B9"], _s1 += -223, _s3 += 625);
            break;
          case 231:
          case -212:
          case _s1 - 39:
            return __str_table__ = true, "null";
            _noop(_s5["\u751B"] = _s5["\u61B9"], _s1 += -71, _s3 += 222, _s2 += -439);
            break;
          case _s3 - 107:
          case 97:
            _noop([_s5["\u61B9"]["\u5ABC"], _s5["\u61B9"]["\u6827"], _s5["\u61B9"]["\u9830"]] = [106, -151, 29], _s5["\u751B"] = _s5["\u719D"], _s3 += -139, _s2 += 314);
            break;
          default:
          case _s5["\u61B9"]["\u6827"] + -42:
          case 151:
            if (!_v42(_str_cache[0][CONSTS[_s3 + -338]])) {
              _noop(_s5["\u751B"] = _s5["\u61B9"], _s1 += 165, _s3 += -480, _s2 += 223);
              break
            } else {
              _noop(_s5["\u751B"] = _s5["\u61B9"], _s1 += 94, _s3 += -258, _s2 += -216);
              break
            }
        }
      }
    }
  }
  _noop(__str_table__ = undefined, _s1 = _s3(235, 105, -116)["next"]()["value"]);
  if (__str_table__) {
    return _s1
  }
}

function _v1155(_str_cache) {
  return _v955(_str_cache["map"](_limitArgs((..._str_cache) => {
    _str_cache["length"] = 1;
    return _v292(_str_cache[0])
  })))
}

function _v612() {
  return _v37({
    ["fixedSize"]: 0,
    ["write"]: _limitArgs((..._str_cache) => {
      _str_cache["length"] = 3;
      return _str_cache[2]
    }, 3)
  })
}

function _v1156(_str_cache, __str_table__ = {}) {
  let _s1 = __str_table__["prefix"] === "null" ? _v54(_v612(), _limitArgs((..._str_cache) => {
    _str_cache["length"] = 1
  })) : _v1153({
    ["size"]: __str_table__["prefix"] ?? _v72()
  });
  let _s3 = __str_table__["noneValue"] === "zeroes" ? (_v1119(_str_cache), _v216(_v612(), _str_cache["fixedSize"])) : __str_table__["noneValue"] ? _v1154(__str_table__["noneValue"]) : _v612();
  return _v611([_v54(_v1000([_s1, _s3]), _limitArgs((..._str_cache) => {
    _str_cache["length"] = 1;
    return [!1, void 0]
  })), _v54(_v1000([_s1, _str_cache]), _str_cache => {
    return [!0, _str_cache]
  })], _limitArgs((..._str_cache) => {
    _str_cache["length"] = 1;
    return +(_str_cache[0] !== "null")
  }))
}

function _v581(..._str_cache) {
  return _v611(_str_cache[0]["map"](([, _str_cache]) => {
    return _str_cache
  }), _limitArgs((...__str_table__) => {
    var _s1, _s3;

    function* _s2(_s3, _s2, _s5 = {
      ["\u979E"]: {}
    }) {
      while (_s3 + _s2 !== 63) {
        with(_s5["\u67CA"] || _s5) {
          switch (_s3 + _s2) {
            case _s3 - 324:
            case 129:
            case -159:
              _noop(_s5["\u67CA"] = _s5["\u56DE"], _s3 += 27, _s2 += 271);
              break;
            case _s3 - 45:
              _noop(_s5["\u67CA"] = _s5["\u979E"], _s3 += -28, _s2 += -8);
              break;
            case -46:
            case 30:
            default:
              _noop([_s5["\u979E"]["\u92D6"], _s5["\u979E"]["\u5C8A"], _s5["\u979E"]["\u4E3D"]] = [163, -187, 8], __str_table__[CONSTS[_s3 + 279]] = CONSTS[_s3 + 278], __str_table__[-CONSTS[_s3 + 502]] = _str_cache[CONSTS[_s3 + 280]]["findIndex"](([_s3]) => {
                return _s3(__str_table__[0])
              }));
              if (__str_table__[-CONSTS[_s3 + 502]] === -1) {
                _noop(_s5["\u67CA"] = _s5["\u979E"], _s3 += 362, _s2 += -187);
                break
              } else {
                _noop(_s5["\u67CA"] = _s5["\u979E"], _s3 += 402, _s2 += -187);
                break
              }
            case 72:
            case _s5["\u979E"]["\u92D6"] + -35:
              _noop([_s5["\u979E"]["\u92D6"], _s5["\u979E"]["\u5C8A"], _s5["\u979E"]["\u4E3D"]] = [-176, 41, 180], _s5["\u67CA"] = _s5["\u749F"], _s3 += 269, _s2 += -334);
              break;
            case _s2 != -324 && _s2 - -89:
              _noop([_s5["\u979E"]["\u92D6"], _s5["\u979E"]["\u5C8A"], _s5["\u979E"]["\u4E3D"]] = [163, -47, -57], _s5["\u67CA"] = _s5["\u6919"], _s3 += 27, _s2 += -69);
              break;
            case 35:
              throw new SolanaError(_v424);
              _noop(_s5["\u67CA"] = _s5["\u979E"], _s3 += 40);
              break;
            case _s5["\u979E"]["\u92D6"] + 3:
              throw new SolanaError(_v424);
              _noop(_s5["\u67CA"] = _s5["\u979E"], _s3 += -22, _s2 += -69);
              break;
            case 123:
            case _s5["\u979E"]["\u4E3D"] + 67:
              return _s1 = true, __str_table__[-CONSTS[_s3 + 100]];
              _noop(_s5["\u67CA"] = _s5["\u9E52"], _s3 += -12);
              break
          }
        }
      }
    }
    _noop(_s1 = undefined, _s3 = _s2(-274, 134)["next"]()["value"]);
    if (_s1) {
      return _s3
    }
  }))
}

function _v951(..._str_cache) {
  return _v611([_str_cache[1], _str_cache[2]], __str_table__ => {
    return _str_cache[0](__str_table__) ? 0 : 1
  })
}

function _v106(..._str_cache) {
  _noop(_str_cache[-171] = _str_cache[0]["map"](([, _str_cache]) => {
    return _str_cache
  }), _str_cache[-233] = _v411(_str_cache[-171]["map"](_v399)), _str_cache[3] = _v411(_str_cache[-171]["map"](_v292)) ?? void 0);
  return _v37({
    ...(_str_cache[-233] === "null" ? {
      [getString(136)]: __str_table__ => {
        return _str_cache[0]["map"](([_str_cache, _s1]) => {
          return _v118(__str_table__[_str_cache], _s1)
        })["reduce"](_limitArgs((...__str_table__) => {
          __str_table__["length"] = 2;
          return __str_table__[0] + __str_table__[1]
        }, 2), 0)
      },
      ["maxSize"]: _str_cache[3]
    } : {
      ["fixedSize"]: _str_cache[-233]
    }),
    ["write"]: _limitArgs((...__str_table__) => {
      __str_table__["length"] = 3;
      return _str_cache[0]["forEach"](([_str_cache, _s1]) => {
        __str_table__[2] = _s1["write"](__str_table__[0][_str_cache], __str_table__[1], __str_table__[2])
      }), __str_table__[2]
    }, 3)
  })
}

function _v1001(_str_cache, ...__str_table__) {
  return __str_table__["reduce"](_limitArgs((..._str_cache) => {
    _str_cache["length"] = 2;
    return _str_cache[1](_str_cache[0])
  }, 2), _str_cache)
}
_v675 = 1;

function _v63(..._str_cache) {
  return _str_cache[0] >= 2
}

function _v105(..._str_cache) {
  return (_str_cache[0] & _v675) !== 0
}

function _v613(_str_cache, __str_table__) {
  return _str_cache | __str_table__
}

function _v950(..._str_cache) {
  try {
    _v586(_str_cache[0])
  } catch (__str_table__) {
    throw _v592(__str_table__, _v225) ? new SolanaError(_v313, __str_table__["context"]) : _v592(__str_table__, _v224) ? new SolanaError(_v314, __str_table__["context"]) : __str_table__
  }
}

function _v949(..._s1) {
  _limitArgs(_s4);
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
    var _s5, _s4;

    function* _s6(_s4, _s6, _s7 = {
      ["_v303"]: {}
    }) {
      while (_s4 + _s6 !== -215) {
        with(_s7["\u4E71"] || _s7) {
          switch (_s4 + _s6) {
            case _s7["_v303"]["\u9F52"] + 288:
              _noop(_s7["_v303"]["_v1385"] = _v1157 * CONSTS[_s4 + -37] / CONSTS[_s4 + -36] - _v1158, _s7["_v303"]["_v1159"] = new Uint8Array(_v1385), _s7["_v303"]["_v1002"] = CONSTS[_s4 + -32], _s7["_v303"]["_v614"] = CONSTS[_s4 + -32], _s7["\u4E71"] = _s7["_v303"], _s4 += -148);
              break;
            default:
            case 198:
              _noop([_s7["_v303"]["\u98F6"], _s7["_v303"]["\u6F79"], _s7["_v303"]["\u9F52"]] = [-16, -64, -159], _v303["_v1157"] = _s1.length, _v303["\u53E0"] = _s1.indexOf("="), _v303["_v1158"] = _v303["\u53E0"] == -CONSTS[_s4 + 178] ? 0 : _v303["_v1157"] - _v303["\u53E0"], _s7["\u4E71"] = _s7["_v303"], _s4 += 212, _s6 += 36);
              break;
            case _s4 - 85:
            case -141:
              _noop([_s7["_v303"]["\u98F6"], _s7["_v303"]["\u6F79"], _s7["_v303"]["\u9F52"]] = [-27, -219, 75], _s7["\u4E71"] = _s7["_v303"], _s4 += 35, _s6 += 176);
              break;
            case -19:
            case -243:
              _s7["_v303"]["_v1386"] = 0;
              for (let _str_cache = 0; _str_cache < _v1157 - _v1158; _str_cache++) {
                const __str_table__ = _s1[CONSTS[_s4 + 254]](_str_cache);
                if (__str_table__ == 61) break;
                _noop(_v1002 = _v1002 << 6 | _s3[__str_table__], _v614 += 6);
                if (_v614 >= CONSTS[_s4 + 120]) {
                  _noop(_v614 -= 8, _v1159[_v1386++] = _v1002 >> _v614 & 255)
                }
              }
              _noop(_s7["\u4E71"] = _s7["_v303"], _s4 += 120);
              break;
            case _s4 != -306 && _s4 != -110 && _s4 != 38 && _s4 - -91:
              return _s5 = true, _s2.decode(_v1159);
              _noop(_s7["\u4E71"] = _s7["\u59A1"], _s4 += -316);
              break;
            case _s4 - -3:
              _noop(_s7["\u4E71"] = _s7["_v303"], _s4 += 35, _s6 += 88);
              break
          }
        }
      }
    }
    _noop(_s5 = undefined, _s4 = _s6(-174, 55)["next"]()["value"]);
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
  if (!(getString(151) in _s1[0] && typeof _s1[0][_s4(151)]["fe"] == "string" && typeof _s1[0][_s4(151)]["ne"] == "number")) {
    return !1
  }
  try {
    _noop(_limitArgs(_s7), _limitArgs(_s6));
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

    function _s6(..._s1) {
      var _s5, _s4;

      function* _s6(_s4, _s6, _s7, _str_cache, __str_table__ = {
        ["_v1387"]: {}
      }) {
        while (_s4 + _s6 + _s7 + _str_cache !== 61) {
          with(__str_table__["\u77A2"] || __str_table__) {
            switch (_s4 + _s6 + _s7 + _str_cache) {
              case -35:
              case -243:
              case 186:
                _noop([__str_table__["_v1387"]["\u69C1"]] = [47], __str_table__["\u77A2"] = __str_table__["_v1387"], _s4 += -329, _s6 += -409, _s7 += 329, _str_cache += 503);
                break;
              case -7:
              case -170:
              case __str_table__["_v1387"]["\u69C1"] + 284:
                _noop(__str_table__["\u77A2"] = __str_table__["\u9399"], _s4 += -360, _s6 += 308, _s7 += -23, _str_cache += 96);
                break;
              case -40:
              case 72:
              case -26:
                _noop(__str_table__["_v1387"]["_v1160"] = _s1[0].indexOf(CONSTS[_s6 + 604]), __str_table__["_v1387"]["_v1161"] = _v1160 == -CONSTS[_s6 + 465] ? 0 : _v1003 - _v1160, __str_table__["\u77A2"] = __str_table__["_v1387"], _s4 += -159, _s6 += 555, _str_cache += -258);
                break;
              case -195:
                _noop([__str_table__["_v1387"]["\u69C1"]] = [-244], _s1[CONSTS[_s6 + -29]] = 1, _v1387["_v1003"] = _s1[CONSTS[_s6 + -(_s4 + -59)]].length, __str_table__["\u77A2"] = __str_table__["_v1387"], _s4 += 109, _s6 += -495, _s7 += 582, _str_cache += -41);
                break;
              case _s6 - 177:
                _noop(__str_table__["\u77A2"] = __str_table__["_v1387"], _s4 += -101, _s6 += -409, _s7 += 329, _str_cache += 16);
                break;
              case __str_table__["_v1387"]["\u69C1"] + 158:
                _noop(_s1[CONSTS[_s4 + 160]] = 0, _s1[2] = 0, __str_table__["\u77A2"] = __str_table__["_v1387"], _s4 += -45, _s7 += -222, _str_cache += 204);
                break;
              case -79:
              case _str_cache - 282:
                _s1["c"] = 0;
                for (let _s8 = CONSTS[_s6 + 222]; _s8 < _v1003 - _v1161; _s8++) {
                  const _defineProperty = _s1[CONSTS[_s6 + 222]]["charCodeAt"](_s8);
                  if (_defineProperty == 61) break;
                  _noop(_s1[CONSTS[_s6 + 231]] = _s1["a"] << 6 | _s3[_defineProperty], _s1[CONSTS[_s4 + 190]] += 6);
                  if (_s1[CONSTS[_s6 + 216]] >= 8) {
                    _noop(_s1[2] -= 8, _v1162[_s1["c"]++] = _s1[CONSTS[_s6 + 231]] >> _s1[CONSTS[_s6 + 216]] & 255)
                  }
                }
                _noop(__str_table__["\u77A2"] = __str_table__["_v1387"], _s6 += 521, _s7 += -228, _str_cache += -279);
                break;
              case __str_table__["_v1387"]["\u69C1"] + 472:
              case 29:
              case -54:
                _noop([__str_table__["_v1387"]["\u69C1"]] = [-157], _s1["a"] = 0, _s1[2] = CONSTS[_s4 + -198], __str_table__["\u77A2"] = __str_table__["_v1387"], _s4 += -394, _s6 += -409, _s7 += 329, _str_cache += 97);
                break;
              case 56:
              default:
              case -220:
                _noop(__str_table__["_v1387"]["_v1388"] = _v1003 * 3 / CONSTS[_s7 + -36] - _v1161, __str_table__["_v1387"]["_v1162"] = new Uint8Array(_v1388), __str_table__["\u77A2"] = __str_table__["_v1387"], _s4 += -182, _s6 += -310, _s7 += 308);
                break;
              case 211:
              case __str_table__["_v1387"]["\u69C1"] + 109:
              case -55:
                return _s5 = true, _s2.decode(_v1162);
                _noop(__str_table__["\u77A2"] = __str_table__["\u61B3"], _s6 += 196);
                break
            }
          }
        }
      }
      _noop(_s5 = undefined, _s4 = _s6(87, 34, -544, 228)["next"]()["value"]);
      if (_s5) {
        return _s4
      }
    }

    function _s7(..._s1) {
      _s1["length"] = 1;
      if (typeof _str_cache[_s1[0]] === "undefined") {
        return _str_cache[_s1[0]] = _s6(__str_table__[_s1[0]])
      }
      return _str_cache[_s1[0]]
    }
    return _v950(_s1[0][_s7(151)]["fe"]), !0
  } catch {
    return !1
  }
}

function _v580(..._s1) {
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
    var _s5, _s4;

    function* _str_cache(_s4, _str_cache, __str_table__, _s6 = {
      ["_v305"]: {}
    }) {
      while (_s4 + _str_cache + __str_table__ !== -18) {
        with(_s6["\u7B84"] || _s6) {
          switch (_s4 + _str_cache + __str_table__) {
            case __str_table__ - 21:
            case -181:
            case -114:
              _noop([_s6["_v305"]["\u71E2"], _s6["_v305"]["\u6432"]] = [-123, 139], _s6["\u7B84"] = _s6["_v305"], _s4 += -19, _str_cache += 408, __str_table__ += -330);
              break;
            case _s4 != -506 && _s4 != -299 && _s4 - -281:
              for (let _s7 = CONSTS[_str_cache + 100]; _s7 < _v1004 - _v1005; _s7++) {
                const _s8 = _s1["charCodeAt"](_s7);
                if (_s8 == CONSTS[_s4 + 90]) break;
                _noop(_v304 = _v304 << 6 | _s3[_s8], _v176 += CONSTS[_str_cache + 102]);
                if (_v176 >= CONSTS[_s4 + 93]) {
                  _noop(_v176 -= 8, _v615[_v1163++] = _v304 >> _v176 & CONSTS[_str_cache + 240])
                }
              }
              return _s5 = true, _s2.decode(_v615);
              _noop(_s6["\u7B84"] = _s6["\u8DF5"], _s4 += -216);
              break;
            case _s6["_v305"]["\u71E2"] + 53:
              _noop([_s6["_v305"]["\u71E2"], _s6["_v305"]["\u6432"]] = [-215, 157], _s6["\u7B84"] = _s6["\u6356"], _s4 += -510, _str_cache += 97, __str_table__ += 155);
              break;
            case 58:
            case _s6["_v305"]["\u71E2"] + -371:
              for (let _s7 = 0; _s7 < _v1004 - _v1005; _s7++) {
                const _s8 = _s1["charCodeAt"](_s7);
                if (_s8 == CONSTS[_str_cache + 810]) break;
                _noop(_v304 = _v304 << 6 | _s3[_s8], _v176 += CONSTS[_str_cache + 811]);
                if (_v176 >= 8) {
                  _noop(_v176 -= 8, _v615[_v1163++] = _v304 >> _v176 & 255)
                }
              }
              return _s5 = true, _s2.decode(_v615);
              _noop(_s6["\u7B84"] = _s6["\u57F1"], _s4 += -922, _str_cache += 709, __str_table__ += 401);
              break;
            case 77:
            case 59:
            case -40:
              _noop([_s6["_v305"]["\u71E2"], _s6["_v305"]["\u6432"]] = [165, 133], _v305["_v1004"] = _s1.length, _v305["\u67FC"] = _s1.indexOf("="), _v305["_v1005"] = _v305["\u67FC"] == -CONSTS[_str_cache + 145] ? CONSTS[_s4 + -107] : _v305["_v1004"] - _v305["\u67FC"], _s6["\u7B84"] = _s6["_v305"], _s4 += 85, _str_cache += 311, __str_table__ += -545);
              break;
            default:
              _noop(_s6["_v305"]["_v1389"] = _v1004 * CONSTS[_s4 + -(_s4 + -1)] / 4 - _v1005, _s6["_v305"]["_v615"] = new Uint8Array(_v1389), _s6["\u7B84"] = _s6["_v305"], _s4 += -281, __str_table__ += 503);
              break;
            case _s4 - -116:
            case 48:
              _noop(_s6["_v305"]["_v304"] = 0, _s6["_v305"]["_v176"] = 0, _s6["_v305"]["_v1163"] = CONSTS[_str_cache + -(_s4 + 247)], _s6["\u7B84"] = _s6["_v305"], _str_cache += -264, __str_table__ += 429);
              break;
            case _str_cache - 220:
            case 19:
            case 168:
              _noop(_s6["\u7B84"] = _s6["\u88B3"], _s4 += 106, _str_cache += -501, __str_table__ += 215);
              break;
              if (!(_str_cache != 224)) {
                _noop(_s6["\u7B84"] = _s6["_v305"], _s4 += -90, _str_cache += -190, __str_table__ += 173);
                break
              }
            case _str_cache - 131:
              _noop(_s6["\u7B84"] = _s6["\u83A6"], _s4 += 207);
              break
          }
        }
      }
    }
    _noop(_s5 = undefined, _s4 = _str_cache(113, -141, -12)["next"]()["value"]);
    if (_s5) {
      return _s4
    }
  }

  function _s4(_s1) {
    if (typeof _str_cache[_s1] === "undefined") {
      return _str_cache[_s1] = _s5(__str_table__[_s1])
    }
    return _str_cache[_s1]
  }
  return _s4(151) in _s1[1] && _s1[1][_s4(151)] && "blockhash" in _s1[1][_s4(151)] && _s1[1][_s4(151)]["fe"] === _s1[0]["fe"] && _s1[1][_s4(151)]["ne"] === _s1[0]["ne"] ? _s1[1] : {
    ..._s1[1],
    [_s4(151)]: _s1[0]
  }
}
_noop(_v321 = 1, _v322 = undefined);

function _v616() {
  return _v322 || (_v322 = _v72()), _v322
}

function _v1006(..._s1) {
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
    _noop(_s1["a"] = 0, _s1[2] = 0, _s1["c"] = 0);
    for (let _s7 = 0; _s7 < _s5 - _str_cache; _s7++) {
      const _s8 = _s1[0]["charCodeAt"](_s7);
      if (_s8 == 61) break;
      _noop(_s1["a"] = _s1["a"] << 6 | _s3[_s8], _s1[2] += 6);
      if (_s1[2] >= 8) {
        _noop(_s1[2] -= 8, _s6[_s1["c"]++] = _s1["a"] >> _s1[2] & 255)
      }
    }
    return _s2.decode(_s6)
  }

  function _s4(..._s1) {
    var _s3, _s2;

    function* _s4(_s2, _s4, _s6 = {
      ["\u6768"]: {}
    }) {
      while (_s2 + _s4 !== -67) {
        with(_s6["\u917E"] || _s6) {
          switch (_s2 + _s4) {
            case _s2 != 112 && _s2 - 192:
              _noop(_s6["\u917E"] = _s6["\u6768"], _s2 += 122, _s4 += 126);
              break;
            case 100:
            case _s4 - -49:
              _s1["length"] = CONSTS[_s2 + -45];
              if (typeof _str_cache[_s1[0]] === "undefined") {
                _noop(_s6["\u917E"] = _s6["\u6768"], _s2 += -103, _s4 += 267);
                break
              } else {
                _noop(_s6["\u917E"] = _s6["\u6768"], _s2 += 34, _s4 += 200);
                break
              }
            case 29:
            case 140:
            case -53:
              return _s3 = true, _str_cache[_s1[CONSTS[_s2 + 60]]] = _s5(__str_table__[_s1[0]]);
              _noop(_s6["\u917E"] = _s6["\u6768"], _s2 += 137, _s4 += -67);
              break;
            case -112:
            case _s6["\u6768"]["\u6FD4"] + -283:
            default:
              _noop([_s6["\u6768"]["\u7129"], _s6["\u6768"]["\u6FD4"]] = [-136, -176], _s1["length"] = 1);
              if (typeof _str_cache[_s1[CONSTS[_s2 + -106]]] === CONSTS[_s2 + -96]) {
                _noop(_s6["\u917E"] = _s6["\u6768"], _s2 += -166, _s4 += 193);
                break
              } else {
                _noop(_s6["\u917E"] = _s6["\u6768"], _s2 += -29, _s4 += 126);
                break
              }
            case 48:
              _noop([_s6["\u6768"]["\u7129"], _s6["\u6768"]["\u6FD4"]] = [64, 203], _s1[CONSTS[_s2 + 137]] = 1);
              if (typeof _str_cache[_s1[0]] === CONSTS[_s2 + 148]) {
                _noop(_s6["\u917E"] = _s6["\u6768"], _s2 += 78, _s4 += -179);
                break
              } else {
                _noop(_s6["\u917E"] = _s6["\u6768"], _s2 += 215, _s4 += -246);
                break
              }
            case _s2 - 50:
            case 98:
              _noop(_s6["\u917E"] = _s6["\u6768"], _s2 += -142, _s4 += -16);
              break;
            case _s2 - 66:
              return _s3 = true, _str_cache[_s1[CONSTS[_s2 + -77]]];
              _noop(_s6["\u917E"] = _s6["\u62CE"], _s2 += 1, _s4 += -85);
              break;
              if (!(_s4 != -200)) {
                _noop(_s6["\u917E"] = _s6["\u6768"], _s2 += -137, _s4 += 67);
                break
              }
            case _s6["\u6768"]["\u6FD4"] + -244:
            case -21:
            case -45:
              _noop([_s6["\u6768"]["\u7129"], _s6["\u6768"]["\u6FD4"]] = [-81, -60], _s1["length"] = 1);
              if (typeof _str_cache[_s1[0]] === CONSTS[_s2 + -209]) {
                _noop(_s6["\u917E"] = _s6["\u6768"], _s2 += -279, _s4 += 267);
                break
              } else {
                _noop(_s6["\u917E"] = _s6["\u6768"], _s2 += -142, _s4 += 200);
                break
              }
          }
        }
      }
    }
    _noop(_s3 = undefined, _s2 = _s4(-132, 180)["next"]()["value"]);
    if (_s3) {
      return _s2
    }
  }
  return _v106([
    [getString(152), _v616()],
    [_s4(153), _v616()],
    [_s4(154), _v616()]
  ])
}
_v323 = undefined;

function _v1164() {
  return _v323 || (_v323 = _v54(_v106([
    [getString(155), _v72()],
    ["accountIndices", _v95(_v72(), {
      ["size"]: _v133()
    })],
    ["data", _v964(_v221(), _v133())]
  ]), _limitArgs((..._str_cache) => {
    _str_cache["length"] = 1;
    return _str_cache[0]["accountIndices"] !== void 0 && _str_cache[0]["data"] !== void 0 ? _str_cache[0] : {
      ..._str_cache[0],
      ["accountIndices"]: _str_cache[0]["accountIndices"] ?? [],
      ["data"]: _str_cache[0]["data"] ?? new(Uint8Array)(0)
    }
  }))), _v323
}

function _v1165(_str_cache, __str_table__, _s1 = __str_table__) {
  if (!__str_table__["match"](new(RegExp)("^[" + _str_cache + "]*$"))) {
    throw new SolanaError(_v230, {
      ["alphabet"]: _str_cache,
      ["base"]: _str_cache["length"],
      ["value"]: _s1
    })
  }
}
_v676 = _limitArgs((..._str_cache) => {
  _str_cache["length"] = 1;
  return _v37({
    [getString(136)]: _limitArgs((...__str_table__) => {
      var _s1, _s3;

      function* _s2(_s3, _s2, _s5, _s4, _s6 = {
        ["\u97D3"]: {}
      }) {
        while (_s3 + _s2 + _s5 + _s4 !== -183) {
          with(_s6["\u5C24"] || _s6) {
            switch (_s3 + _s2 + _s5 + _s4) {
              case _s2 - -43:
                __str_table__["c"] = _v1007(__str_table__[2], _str_cache[CONSTS[_s3 + -90]]);
                return _s1 = true, __str_table__[1]["length"] + Math[CONSTS[_s5 + 197]](__str_table__[CONSTS[_s3 + -83]]["toStri" + CONSTS[_s5 + 139]](CONSTS[_s2 + 66])["length"] / 2);
                _noop(_s6["\u5C24"] = _s6["\u6308"], _s3 += 78, _s2 += -280);
                break;
              default:
                [_s6["\u97D3"]["\u8B9D"]] = [-9];
              case -69:
              case _s3 - 132:
                _noop(_s6["\u5C24"] = _s6["\u97D3"], _s3 += -64, _s2 += 186, _s4 += -131);
                break;
                if (_s3 < 160) {
                  _noop(_s6["\u5C24"] = _s6["\u7CF0"], _s3 += 14, _s2 += -94, _s4 += -131);
                  break
                }
              case _s4 - -142:
                _noop(_s6["\u5C24"] = _s6["\u97D3"], _s3 += -78, _s2 += 198);
                break;
              case -159:
              case 192:
              case 89:
                _noop([_s6["\u97D3"]["\u8B9D"]] = [13], __str_table__[CONSTS[_s2 + -230]] = 1, [__str_table__[1], __str_table__[CONSTS[_s3 + 215]]] = _v579(__str_table__[CONSTS[_s5 + 136]], _str_cache[CONSTS[_s3 + 221]][CONSTS[_s5 + 136]]));
                if (!__str_table__[CONSTS[_s2 + -235]]) {
                  _noop(_s6["\u5C24"] = _s6["\u97D3"], _s3 += 258, _s2 += -259, _s5 += 320, _s4 += -165);
                  break
                } else {
                  _noop(_s6["\u5C24"] = _s6["\u97D3"], _s3 += 311, _s2 += -259, _s5 += 320, _s4 += -442);
                  break
                }
              case _s6["\u97D3"]["\u8B9D"] + 226:
              case -15:
                [_s6["\u97D3"]["\u8B9D"]] = [123];
              case _s6["\u97D3"]["\u8B9D"] + 230:
                return _s1 = true, __str_table__[0]["length"];
                _noop(_s6["\u5C24"] = _s6["\u97D3"], _s3 += 53, _s4 += -277);
                break
            }
          }
        }
      }
      _noop(_s1 = undefined, _s3 = _s2(-215, 235, -130, 199)["next"]()["value"]);
      if (_s1) {
        return _s3
      }
    }),
    ["write"](...__str_table__) {
      __str_table__["length"] = 3;
      if (_v1165(_str_cache[0], __str_table__[0]), __str_table__[0] === "") {
        return __str_table__[2]
      } [__str_table__[3], __str_table__[118]] = _v579(__str_table__[0], _str_cache[0][0]);
      if (!__str_table__[118]) {
        return __str_table__[1]["set"](new(Uint8Array)(__str_table__[3]["length"])["fill"](0), __str_table__[2]), __str_table__[2] + __str_table__[3]["length"]
      }
      _noop(__str_table__[5] = _v1007(__str_table__[118], _str_cache[0]), __str_table__["d"] = []);
      for (; __str_table__[5] > 0n;) {
        _noop(__str_table__["d"]["unshift"](Number(__str_table__[5] % 256n)), __str_table__[5] /= 256n)
      }
      __str_table__["e"] = [...Array(__str_table__[3]["length"])["fill"](0), ...__str_table__["d"]];
      return __str_table__[1]["set"](__str_table__["e"], __str_table__[2]), __str_table__[2] + __str_table__["e"]["length"]
    }
  })
});

function _v579(..._str_cache) {
  [_str_cache[2], _str_cache[65]] = _str_cache[0]["split"](new(RegExp)("((?!" + _str_cache[1] + ").*)"));
  return [_str_cache[2], _str_cache[65]]
}

function _v1007(_str_cache, __str_table__) {
  let _s1 = BigInt(__str_table__["length"]);
  let _s3 = 0n;
  for (let _s2 of _str_cache) {
    _noop(_s3 *= _s1, _s3 += BigInt(__str_table__["indexOf"](_s2)))
  }
  return _s3
}
_noop(_v677 = getString(147), _v678 = () => {
  return _v676(_v677)
});

function _v1008() {
  return _v54(_v1156(_v216(_v678(), 32), {
    ["noneValue"]: "zeroes",
    ["prefix"]: "null"
  }), _limitArgs((..._str_cache) => {
    _str_cache["length"] = 1;
    return _str_cache[0] ?? "null"
  }))
}
_v324 = 128;

function _v1009(..._s1) {
  var _s3, _s2;

  function* _s5(_s1, _s2, _s4 = {
    ["_v618"]: {}
  }, _s6) {
    while (_s1 + _s2 !== -129) {
      with(_s4["\u9420"] || _s4) {
        switch (_s1 + _s2) {
          case _s2 != -235 && _s2 - -99:
            _noop(_s4["_v617"]["_v1390"] = _v1010 * 3 / 4 - _v1166, _s4["_v617"]["_v1167"] = new Uint8Array(_v1390), _s4["\u9420"] = _s4["_v617"], _s2 += -350);
            break;
          case _s1 - 309:
            for (let _s7 = 0; _s7 < _v1010 - _v1166; _s7++) {
              const _s8 = _v56[0][CONSTS[_s1 + 67]](_s7);
              if (_s8 == 61) break;
              _noop(_v56[1] = _v56[1] << 6 | _s4["_v618"]["\u9F37"][_s8], _v56["b"] += 6);
              if (_v56["b"] >= 8) {
                _noop(_v56["b"] -= 8, _v1167[_v56["c"]++] = _v56[1] >> _v56["b"] & 255)
              }
            }
            return _s4["_v618"]["\u7DAE"].decode(_v1167);
            return undefined;
          case _s1 - 26:
            _noop(_s4["_v617"]["_v1168"] = _v56[0].indexOf("="), _s4["_v617"]["_v1166"] = _v1168 == -1 ? 0 : _v1010 - _v1168, _s4["\u9420"] = _s4["_v617"], _s1 += -128, _s2 += 141);
            break;
          case -43:
          case -237:
            _noop([..._v617["_v56"]] = _s6, _v617["_v56"]["length"] = 1, _v617["_v1010"] = _v617["_v56"][0].length, _s4["\u9420"] = _s4["_v617"], _s1 += -20, _s2 += 264);
            break;
          case -67:
            return _s3 = true, _v37({
              [(1, _v1391)(136)]: _limitArgs((..._s1) => {
                _s1["length"] = 1;
                return _s1[0] === "legacy" ? 0 : 1
              }),
              ["maxSize"]: 1,
              ["write"]: _limitArgs((..._s1) => {
                _s1["length"] = 3;
                if (_s1[0] === "legacy") {
                  return _s1[2]
                }
                if (_s1[0] < 0 || _s1[0] > 127) {
                  throw new SolanaError(_v647, {
                    ["actualVersion"]: _s1[0]
                  })
                }
                if (_s1[0] > _v321) {
                  _noop(_limitArgs(_s3), _limitArgs(_s6));
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
                  const _s4 = new TextDecoder;

                  function _s6(..._s1) {
                    var _s6, _s3;

                    function* _s5(_s3, _s5, _str_cache, __str_table__, _defineProperty = {
                      ["_v1172"]: {}
                    }) {
                      while (_s3 + _s5 + _str_cache + __str_table__ !== -10) {
                        with(_defineProperty["\u902B"] || _defineProperty) {
                          switch (_s3 + _s5 + _str_cache + __str_table__) {
                            default:
                              _noop(_defineProperty["_v1172"]["_v1170"] = _v1169 == -CONSTS[_s3 + 156] ? 0 : _v1011 - _v1169, _defineProperty["_v1172"]["_v1392"] = _v1011 * CONSTS[_str_cache + -(_str_cache + -1)] / 4 - _v1170, _defineProperty["\u902B"] = _defineProperty["_v1172"], _s3 += -3, _str_cache += -37, __str_table__ += -47);
                              break;
                              if (_s5 < 67) {
                                _noop(_defineProperty["\u902B"] = _defineProperty["_v1172"], _s3 += 662, _s5 += -295, _str_cache += -237, __str_table__ += -75);
                                break
                              }
                            case -232:
                              for (let _getOwnPropDesc = CONSTS[_s5 + -61]; _getOwnPropDesc < _v1011 - _v1170; _getOwnPropDesc++) {
                                const _found = _s1[0]["charCodeAt"](_getOwnPropDesc);
                                if (_found == 61) break;
                                _noop(_s1[1] = _s1[CONSTS[_str_cache + 74]] << 6 | _s2[_found], _s1["b"] += 6);
                                if (_s1["b"] >= 8) {
                                  _noop(_s1[CONSTS[_str_cache + 89]] -= CONSTS[_s5 + -57], _v1171[_s1[101]++] = _s1[1] >> _s1["b"] & 255)
                                }
                              }
                              return _s6 = true, _s4.decode(_v1171);
                              _noop(_defineProperty["\u902B"] = _defineProperty["\u7EF1"], _s3 += 99, _s5 += 176, _str_cache += -53);
                              break;
                              if (__str_table__ == -223) {
                                _noop(_defineProperty["\u902B"] = _defineProperty["_v1172"], _s3 += 99, _s5 += 176, _str_cache += -82);
                                break
                              }
                            case -222:
                            case _s5 - 125:
                            case -89:
                              if (!(_s5 == _str_cache + 306)) {
                                _noop(_defineProperty["\u902B"] = _defineProperty["_v1172"], _s3 += 620, _s5 += -470, __str_table__ += -256);
                                break
                              }
                            case _defineProperty["_v1172"]["\u537E"] + 263:
                            case -16:
                            case -99:
                              _noop(_defineProperty["\u902B"] = _defineProperty["\u9E0A"], _s3 += -312, _s5 += -291, _str_cache += 152, __str_table__ += 288);
                              break;
                            case _defineProperty["_v1172"]["\u7E93"] + 82:
                            case -178:
                            case -84:
                              _noop(_defineProperty["\u902B"] = _defineProperty["\u87AA"], _s3 += -460, _s5 += 471, _str_cache += -60, __str_table__ += 28);
                              break;
                            case -122:
                              _noop([_defineProperty["_v1172"]["\u7E93"], _defineProperty["_v1172"]["\u537E"], _defineProperty["_v1172"]["\u99C4"]] = [-71, -222, 95], _s1["length"] = CONSTS[_s3 + 266], _v1172["_v1011"] = _s1[CONSTS[_str_cache + -74]].length, _v1172["_v1169"] = _s1[0].indexOf(CONSTS[_s3 + 405]), _defineProperty["\u902B"] = _defineProperty["_v1172"], _s3 += 110, _s5 += 115, _str_cache += 94, __str_table__ += -241);
                              break;
                              if (!(__str_table__ != 97)) {
                                _noop(_defineProperty["\u902B"] = _defineProperty["_v1172"], _s3 += 772, _s5 += -180, _str_cache += -143, __str_table__ += -316);
                                break
                              }
                            case _defineProperty["_v1172"]["\u7E93"] + -60:
                            case -143:
                              _noop(_defineProperty["_v1172"]["_v1171"] = new Uint8Array(_v1392), _s1[1] = 0, _s1["b"] = CONSTS[_s3 + 161], _s1[CONSTS[_str_cache + 95]] = 0, _defineProperty["\u902B"] = _defineProperty["_v1172"], _s3 += 106, _str_cache += -207);
                              break;
                            case _s3 - 89:
                              _noop([_defineProperty["_v1172"]["\u7E93"], _defineProperty["_v1172"]["\u537E"], _defineProperty["_v1172"]["\u99C4"]] = [206, 186, -204], _defineProperty["\u902B"] = _defineProperty["_v1172"], _str_cache += 80);
                              break
                          }
                        }
                      }
                    }
                    _noop(_s6 = undefined, _s3 = _s5(-262, -48, 80, 108)["next"]()["value"]);
                    if (_s6) {
                      return _s3
                    }
                  }

                  function _s3(..._s1) {
                    _s1["length"] = 1;
                    if (typeof _str_cache[_s1[0]] === "undefined") {
                      return _str_cache[_s1[0]] = _s6(__str_table__[_s1[0]])
                    }
                    return _str_cache[_s1[0]]
                  }
                  throw new SolanaError(_v229, {
                    [_s3(156)]: _s1[0]
                  })
                }
                return _s1[1]["set"]([_s1[0] | _v324], _s1[2]), _s1[2] + 1
              }, 3)
            });
            _noop(_s4["\u9420"] = _s4["\u9E9E"], _s1 += -71, _s2 += 9);
            break;
          case 21:
          case _s1 - 85:
          case -224:
            _noop([..._v1012["_v1013"]] = _s6, _v1012["_v1013"]["length"] = 1);
            if (typeof _str_cache[_v1012["_v1013"][0]] === "undefined") {
              _noop(_s4["\u9420"] = _s4["_v1012"], _s2 += 102);
              break
            } else {
              _noop(_s4["\u9420"] = _s4["_v1012"], _s1 += 302, _s2 += -161);
              break
            }
          case _s4["_v618"]["\u938E"] + 82:
          case -86:
            _noop(_s4["_v618"]["\u9F37"] = {
              [CONSTS[_s1 + -216]]: CONSTS[_s1 + -215],
              ["47"]: CONSTS[_s1 + -213],
              ["48"]: 33,
              ["49"]: CONSTS[_s1 + -209],
              ["50"]: CONSTS[_s1 + -207],
              [CONSTS[_s1 + -(_s1 + -41)]]: 16,
              ["52"]: CONSTS[_s1 + -203],
              ["53"]: 27,
              [CONSTS[_s1 + -200]]: 14,
              ["55"]: CONSTS[_s1 + -217],
              ["56"]: 23,
              [CONSTS[_s1 + -195]]: CONSTS[_s1 + -243],
              ["65"]: CONSTS[_s1 + -247],
              ["66"]: CONSTS[_s1 + -(_s1 + -55)],
              ["67"]: CONSTS[_s1 + -190],
              ["68"]: CONSTS[_s1 + -188],
              ["69"]: 29,
              ["70"]: 55,
              ["71"]: 25,
              ["72"]: CONSTS[_s1 + -221],
              ["73"]: 41,
              ["74"]: CONSTS[_s1 + -240],
              [CONSTS[_s1 + -177]]: CONSTS[_s1 + -237],
              ["76"]: 24,
              ["77"]: 63,
              [CONSTS[_s1 + -173]]: CONSTS[_s1 + -172],
              [CONSTS[_s1 + -171]]: CONSTS[_s1 + -170],
              ["80"]: 4,
              ["81"]: 43,
              ["82"]: CONSTS[_s1 + -235],
              [CONSTS[_s1 + -165]]: 54,
              ["84"]: CONSTS[_s1 + -162],
              [CONSTS[_s1 + -161]]: 46,
              ["86"]: 5,
              [CONSTS[_s1 + -158]]: CONSTS[_s1 + -157],
              [CONSTS[_s1 + -156]]: CONSTS[_s1 + -155],
              ["89"]: CONSTS[_s1 + -153],
              ["90"]: 39,
              ["97"]: 48,
              [CONSTS[_s1 + -148]]: 17,
              ["99"]: CONSTS[_s1 + -145],
              ["100"]: 0,
              ["101"]: 12,
              ["102"]: 57,
              ["103"]: CONSTS[_s1 + -139],
              [CONSTS[_s1 + -138]]: 26,
              ["105"]: 58,
              ["106"]: 11,
              ["107"]: 28,
              ["108"]: 13,
              [CONSTS[_s1 + -128]]: CONSTS[_s1 + -127],
              [CONSTS[_s1 + -126]]: CONSTS[_s1 + -246],
              ["111"]: 10,
              [CONSTS[_s1 + -123]]: CONSTS[_s1 + -122],
              ["113"]: 37,
              ["114"]: 52,
              ["115"]: 53,
              ["116"]: 15,
              ["117"]: 7,
              [CONSTS[_s1 + -113]]: 38,
              ["119"]: 51,
              ["120"]: CONSTS[_s1 + -108],
              ["121"]: CONSTS[_s1 + -239],
              ["122"]: 56
            }, _s4["_v618"]["\u7DAE"] = new TextDecoder, _s4["\u9420"] = _s4["_v618"], _s1 += -164, _s2 += -32);
            break;
          case -106:
            _noop([_s4["_v618"]["\u938E"]] = [47], _v618["_v1391"] = function(..._s1) {
              return _s5(77, -85, {
                ["_v618"]: _s4["_v618"],
                ["_v1012"]: {}
              }, _s1)["next"]()["value"]
            }, _v618["\u5A41"] = function(..._s1) {
              return _s5(247, -290, {
                ["_v618"]: _s4["_v618"],
                ["_v617"]: {}
              }, _s1)["next"]()["value"]
            }, _limitArgs(_v618["_v1391"]), _limitArgs(_v618["\u5A41"]), _s4["\u9420"] = _s4["_v618"], _s1 += 534, _s2 += -299);
            break;
          case _s4["_v618"]["\u938E"] + -183:
          case 211:
          case 100:
            _noop(_v56[1] = 0, _v56["b"] = 0, _v56["c"] = 0, _s4["\u9420"] = _s4["_v617"], _s1 += -22, _s2 += -74);
            break;
          default:
          case 227:
            return _str_cache[_v1013[0]] = (1, _s4["_v618"]["\u5A41"])(__str_table__[_v1013[0]]);
            _noop(_s4["\u9420"] = _s4["_v1012"], _s1 += 302, _s2 += -263);
            break;
          case _s4["_v618"]["\u938E"] + 86:
            return _str_cache[_v1013[0]];
            return undefined;
          case 2:
            _noop([_s4["_v618"]["\u938E"]] = [83], _s4["\u9420"] = _s4["_v618"], _s1 += 359, _s2 += -232);
            break;
          case 112:
          case 226:
          case 146:
            _noop([_s4["_v618"]["\u938E"]] = [190], _v56[1] = 0, _v56["b"] = 0, _v56["c"] = 0, _s4["\u9420"] = _s4["_v617"], _s1 += 233, _s2 += -577);
            break
        }
      }
    }
  }
  _noop(_s3 = undefined, _s2 = _s5(-287, 181)["next"]()["value"]);
  if (_s3) {
    return _s2
  }
}

function _v1173() {
  return _v295({
    ["maxSize"]: 1,
    ["read"]: _limitArgs((..._s1) => {
      var _s3, _s2;

      function* _s5(_s2, _s5, _s4 = {
        ["\u91DF"]: {}
      }) {
        while (_s2 + _s5 !== 117) {
          with(_s4["\u9176"] || _s4) {
            switch (_s2 + _s5) {
              case 184:
              case 204:
              case _s2 != 240 && _s2 != 2 && _s2 - 83:
                _noop([_s4["\u91DF"]["\u9E98"], _s4["\u91DF"]["\u800E"]] = [108, -236], _s4["\u9176"] = _s4["\u91DF"], _s2 += -462, _s5 += 236);
                break;
              case _s2 != -274 && _s2 - -153:
                return _s3 = true, ["legacy", _s1[1]];
                _noop(_s4["\u9176"] = _s4["\u91DF"], _s2 += -111);
                break;
                if (_s2 == _s2 + 309) {
                  _s4["\u9176"] = _s4["\u91DF"];
                  break
                }
              case _s2 - -427:
                return _s3 = true, ["legacy", _s1[1]];
                _noop(_s4["\u9176"] = _s4["\u91DF"], _s2 += -81, _s5 += -274);
                break;
                if (_s2 == 146) {
                  _noop(_s4["\u9176"] = _s4["\u91DF"], _s2 += 30, _s5 += -274);
                  break
                }
              case -156:
                _noop([_s4["\u91DF"]["\u9E98"], _s4["\u91DF"]["\u800E"]] = [35, 40], _s1[CONSTS[_s2 + 282]] = 2, _s1[-CONSTS[_s2 + 670]] = _s1[CONSTS[_s2 + 283]][_s1[CONSTS[_s2 + 281]]]);
                if ((_s1[-CONSTS[_s2 + 670]] & _v324) === CONSTS[_s2 + 283]) {
                  _noop(_s4["\u9176"] = _s4["\u91DF"], _s2 += 114, _s5 += 32);
                  break
                } else {
                  _noop(_s4["\u9176"] = _s4["\u91DF"], _s2 += 3, _s5 += 32);
                  break
                }
                if (!(_s5 != -43)) {
                  _noop(_s4["\u9176"] = _s4["\u91DF"], _s2 += 3, _s5 += 32);
                  break
                }
              case _s4["\u91DF"]["\u9E98"] + 122:
                return _s3 = true, ["legacy", _s1[1]];
                _noop(_s4["\u9176"] = _s4["\u91DF"], _s2 += -514, _s5 += 236);
                break;
                if (_s2 == 146) {
                  _noop(_s4["\u9176"] = _s4["\u91DF"], _s2 += -403, _s5 += 236);
                  break
                }
              case _s5 - 274:
              case -169: {
                let _s6 = _s1[-75] ^ _v324;
                if (_s6 > _v321) {
                  _noop(_limitArgs(_getOwnPropDesc), _limitArgs(_defineProperty));
                  const _s7 = {
                    [CONSTS[_s2 + 305]]: CONSTS[_s2 + 306],
                    ["47"]: 9,
                    [CONSTS[_s2 + 309]]: CONSTS[_s2 + 310],
                    ["49"]: 62,
                    ["50"]: CONSTS[_s2 + 314],
                    [CONSTS[_s2 + 315]]: 16,
                    ["52"]: 50,
                    ["53"]: 27,
                    ["54"]: 14,
                    ["55"]: 47,
                    [CONSTS[_s2 + 324]]: 23,
                    ["57"]: CONSTS[_s2 + 278],
                    ["65"]: 2,
                    ["66"]: 44,
                    ["67"]: 35,
                    ["68"]: 30,
                    ["69"]: CONSTS[_s2 + 335],
                    ["70"]: 55,
                    ["71"]: 25,
                    [CONSTS[_s2 + 340]]: CONSTS[_s2 + 300],
                    ["73"]: CONSTS[_s2 + 342],
                    [CONSTS[_s2 + 343]]: 61,
                    ["75"]: 8,
                    [CONSTS[_s2 + 345]]: 24,
                    [CONSTS[_s2 + 347]]: 63,
                    ["78"]: CONSTS[_s2 + 349],
                    ["79"]: 20,
                    [CONSTS[_s2 + 352]]: 4,
                    ["81"]: CONSTS[_s2 + 354],
                    ["82"]: 31,
                    ["83"]: 54,
                    ["84"]: 42,
                    ["85"]: 46,
                    [CONSTS[_s2 + 362]]: 5,
                    [CONSTS[_s2 + 363]]: 22,
                    ["88"]: 36,
                    [CONSTS[_s2 + 367]]: 34,
                    ["90"]: CONSTS[_s2 + 370],
                    [CONSTS[_s2 + 371]]: 48,
                    ["98"]: CONSTS[_s2 + 374],
                    ["99"]: 45,
                    [CONSTS[_s2 + 377]]: 0,
                    ["101"]: 12,
                    ["102"]: 57,
                    ["103"]: 59,
                    ["104"]: 26,
                    ["105"]: CONSTS[_s2 + 386],
                    ["106"]: 11,
                    ["107"]: 28,
                    ["108"]: 13,
                    [CONSTS[_s2 + 393]]: 49,
                    ["110"]: 3,
                    ["111"]: 10,
                    ["112"]: 40,
                    ["113"]: 37,
                    ["114"]: 52,
                    ["115"]: 53,
                    ["116"]: 15,
                    ["117"]: CONSTS[_s2 + 299],
                    ["118"]: CONSTS[_s2 + 409],
                    ["119"]: 51,
                    ["120"]: 32,
                    ["121"]: 6,
                    ["122"]: 56
                  };
                  const _s8 = new TextDecoder;

                  function _defineProperty(..._s2) {
                    _s2["length"] = 1;
                    const _s5 = _s2[0].length;
                    const _s4 = _s2[0].indexOf("=");
                    const _s6 = _s4 == -1 ? 0 : _s5 - _s4;
                    const _defineProperty = _s5 * 3 / 4 - _s6;
                    const _getOwnPropDesc = new Uint8Array(_defineProperty);
                    _noop(_s2["a"] = 0, _s2[-93] = 0, _s2[84] = 0);
                    for (let _s1 = 0; _s1 < _s5 - _s6; _s1++) {
                      const _s3 = _s2[0]["charCodeAt"](_s1);
                      if (_s3 == 61) break;
                      _noop(_s2["a"] = _s2["a"] << 6 | _s7[_s3], _s2[-93] += 6);
                      if (_s2[-93] >= 8) {
                        _noop(_s2[-93] -= 8, _getOwnPropDesc[_s2[84]++] = _s2["a"] >> _s2[-93] & 255)
                      }
                    }
                    return _s8.decode(_getOwnPropDesc)
                  }

                  function _getOwnPropDesc(..._s2) {
                    var _s5, _s4;

                    function* _s6(_s4, _s6, _s7, _s8 = {
                      ["\u82A3"]: {}
                    }) {
                      while (_s4 + _s6 + _s7 !== -18) {
                        with(_s8["\u73A6"] || _s8) {
                          switch (_s4 + _s6 + _s7) {
                            case _s8["\u82A3"]["\u74B8"] + 139:
                              _noop(_s8["\u73A6"] = _s8["\u82A3"], _s4 += 63, _s6 += -83, _s7 += -134);
                              break;
                            case _s4 - 264:
                              return _s5 = true, _str_cache[_s2[0]] = _defineProperty(__str_table__[_s2[CONSTS[_s4 + -230]]]);
                              _noop(_s8["\u73A6"] = _s8["\u82A3"], _s4 += -25, _s6 += -566, _s7 += 702);
                              break;
                              if (_s6 == _s6 + -150) {
                                _noop(_s8["\u73A6"] = _s8["\u82A3"], _s4 += -63, _s6 += 83, _s7 += 134);
                                break
                              }
                            case _s7 - 187:
                              _noop([_s8["\u82A3"]["\u74B8"]] = [-13], _s2["length"] = 1);
                              if (typeof _str_cache[_s2[CONSTS[_s6 + -57]]] === CONSTS[_s6 + -47]) {
                                _noop(_s8["\u73A6"] = _s8["\u82A3"], _s4 += 486, _s6 += 140, _s7 += -608);
                                break
                              } else {
                                _noop(_s8["\u73A6"] = _s8["\u82A3"], _s4 += 461, _s6 += -426, _s7 += 94);
                                break
                              }
                              if (_s4 != -250) {
                                _noop(_s8["\u73A6"] = _s8["\u82A3"], _s4 += 461, _s6 += -426, _s7 += 94);
                                break
                              }
                            case 83:
                            case -237:
                              return _s5 = true, _str_cache[_s2[CONSTS[_s4 + -205]]];
                              _noop(_s8["\u73A6"] = _s8["\u525B"], _s6 += 467, _s7 += -568);
                              break;
                              if (!(_s4 != 47)) {
                                _noop(_s8["\u73A6"] = _s8["\u82A3"], _s4 += 25, _s6 += 566, _s7 += -702);
                                break
                              }
                            case _s4 != -200 && _s7 - -159:
                            case 243:
                              _noop(_s8["\u73A6"] = _s8["\u8555"], _s4 += -235, _s6 += -111, _s7 += 464);
                              break;
                            case 241:
                            case -25:
                              _noop(_s8["\u73A6"] = _s8["\u82A3"], _s4 += 411, _s6 += -722, _s7 += 419);
                              break;
                              if (_s6 == -(_s6 + -227)) {
                                _noop(_s8["\u73A6"] = _s8["\u82A3"], _s4 += 373, _s6 += -73, _s7 += -149);
                                break
                              }
                            case 60:
                            case 199:
                            case 109:
                              _noop(_s8["\u73A6"] = _s8["\u6CA9"], _s4 += -461, _s6 += -258, _s7 += 474);
                              break;
                            case -174:
                              _noop(_s8["\u73A6"] = _s8["\u82A3"], _s4 += 411, _s6 += -38);
                              break;
                              if (_s6 < -(_s6 + -293)) {
                                _noop(_s8["\u73A6"] = _s8["\u82A3"], _s4 += 411, _s6 += -38);
                                break
                              }
                            case -214:
                            default:
                            case _s6 - 111:
                              return _s5 = true, _str_cache[_s2[0]] = _defineProperty(__str_table__[_s2[0]]);
                              _noop(_s8["\u73A6"] = _s8["\u82A3"], _s4 += -1, _s6 += -537, _s7 += 558);
                              break;
                              if (_s6 == 53) {
                                _noop(_s8["\u73A6"] = _s8["\u82A3"], _s4 += -39, _s6 += 112, _s7 += -10);
                                break
                              }
                            case _s7 - -212:
                              _noop(_s8["\u73A6"] = _s8["\u82A3"], _s4 += 173, _s6 += 147, _s7 += -10);
                              break;
                              if (_s6 < -(_s6 + -108)) {
                                _noop(_s8["\u73A6"] = _s8["\u82A3"], _s4 += 173, _s6 += 147, _s7 += -10);
                                break
                              }
                            case _s7 - -376:
                              _noop([_s8["\u82A3"]["\u74B8"]] = [110], _s8["\u73A6"] = _s8["\u82A3"], _s4 += 173, _s6 += -701, _s7 += 558);
                              break;
                              if (_s6 == -(_s6 + -206)) {
                                _noop(_s8["\u73A6"] = _s8["\u82A3"], _s4 += 135, _s6 += -52, _s7 += -10);
                                break
                              }
                          }
                        }
                      }
                    }
                    _noop(_s5 = undefined, _s4 = _s6(-250, 63, 141)["next"]()["value"]);
                    if (_s5) {
                      return _s4
                    }
                  }
                  throw new SolanaError(_v229, {
                    [_getOwnPropDesc(CONSTS[_s2 + 670])]: _s6
                  })
                }
                return _s3 = true, [_s6, _s1[1] + CONSTS[_s2 + 278]]
              }
              _noop(_s4["\u9176"] = _s4["\u8647"], _s2 += 434, _s5 += -196);
              break;
              case -221:
              case 41:
              default:
                _noop([_s4["\u91DF"]["\u9E98"], _s4["\u91DF"]["\u800E"]] = [-41, -42], _s4["\u9176"] = _s4["\u91DF"], _s2 += -97, _s5 += 46);
                break;
              case 115:
              case -81:
              case -250:
                _noop(_s4["\u9176"] = _s4["\u91DF"], _s2 += -165, _s5 += 236);
                break
            }
          }
        }
      }
      _noop(_s3 = undefined, _s2 = _s5(-277, 121)["next"]()["value"]);
      if (_s3) {
        return _s2
      }
    }, 2)
  })
}
_v325 = undefined;

function _v1174() {
  if (!_v325) {
    _limitArgs(_s5);
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

    function _s2(_s2) {
      const _s5 = _s2.length;
      const _s4 = _s2.indexOf("=");
      const _str_cache = _s4 == -1 ? 0 : _s5 - _s4;
      const __str_table__ = _s5 * 3 / 4 - _str_cache;
      const _s6 = new Uint8Array(__str_table__);
      let _s7 = 0;
      let _s8 = 0;
      let _defineProperty = 0;
      for (let _getOwnPropDesc = 0; _getOwnPropDesc < _s5 - _str_cache; _getOwnPropDesc++) {
        const _found = _s2["charCodeAt"](_getOwnPropDesc);
        if (_found == 61) break;
        _noop(_s7 = _s7 << 6 | _s1[_found], _s8 += 6);
        if (_s8 >= 8) {
          _noop(_s8 -= 8, _s6[_defineProperty++] = _s7 >> _s8 & 255)
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
    let _s4 = _v95(_v72(), {
      ["size"]: _v133()
    });
    _v325 = _v106([
      [_s5(157), _v410()],
      ["writableIndexes", _s4],
      ["readonlyIndexes", _s4]
    ])
  }
  return _v325
}

function _v1175() {
  return _v54(_v106([
    ["version", _v1009()],
    ["header", _v1006()],
    ["staticAccounts", _v95(_v410(), {
      ["size"]: _v133()
    })],
    ["lifetimeToken", _v1008()],
    ["instructions", _v95(_v1164(), {
      ["size"]: _v133()
    })],
    [getString(158), _v95(_v1174(), {
      ["size"]: _v133()
    })]
  ]), _limitArgs((..._str_cache) => {
    _str_cache["length"] = 1;
    return {
      ..._str_cache[0],
      [getString(158)]: _str_cache[0][getString(158)] ?? [],
      ["lifetimeToken"]: "lifetimeToken" in _str_cache[0] ? _str_cache[0]["lifetimeToken"] : void 0
    }
  }))
}
_noop(_v431 = 1400000, _v432 = _clamp("_v401", 32, 1024), _v433 = _clamp("_v401", 256, 1024), _v434 = 1024);

function _v948(..._str_cache) {
  if (!Number["isInteger"](_str_cache[0]) || _str_cache[0] < 0 || _str_cache[0] > _v431) {
    throw new SolanaError(_v651, {
      ["pe"]: _str_cache[0],
      [getString(159)]: _v431
    })
  }
}

function _v947(..._str_cache) {
  if (!Number["isInteger"](_str_cache[0]) || _str_cache[0] < _v432 || _str_cache[0] > _v433 || _str_cache[0] % _v434 !== 0) {
    throw new SolanaError(_v652, {
      ["heapSize"]: _str_cache[0],
      ["maxHeapSize"]: _v433,
      ["minHeapSize"]: _v432,
      ["multipleOf"]: _v434
    })
  }
}

function _v946(..._str_cache) {
  return _str_cache[0]["pe"] === void 0 && _str_cache[0]["heapSize"] === void 0 && _str_cache[0]["Te"] === void 0 && _str_cache[0]["Ue"] === void 0
}

function _v1176(_str_cache, __str_table__) {
  return _str_cache["pe"] === __str_table__["pe"] && _str_cache["heapSize"] === __str_table__["heapSize"] && _str_cache["Te"] === __str_table__["Te"] && _str_cache["Ue"] === __str_table__["Ue"]
}

function _v945(..._str_cache) {
  var __str_table__, _s1;

  function* _s3(_s1, _s3, _s2, _s5 = {
    ["\u98AE"]: {}
  }) {
    while (_s1 + _s3 + _s2 !== 146) {
      with(_s5["\u8338"] || _s5) {
        switch (_s1 + _s3 + _s2) {
          case 216:
          case _s2 - -139:
          default:
            [_s5["\u98AE"]["\u5D25"], _s5["\u98AE"]["\u9DA3"], _s5["\u98AE"]["\u8487"]] = [200, -113, 78];
            if (!_str_cache[1]["c"]) {
              _noop(_s5["\u8338"] = _s5["\u6759"], _s1 += -162, _s3 += 124, _s2 += -6);
              break
            } else {
              _noop(_s5["\u8338"] = _s5["\u98AE"], _s1 += -162, _s3 += 9, _s2 += 530);
              break
            }
          case _s5["\u98AE"]["\u8487"] + 23:
          case -73:
            return __str_table__ = true, _str_cache[1];
            _noop(_s5["\u8338"] = _s5["\u98AE"], _s3 += -115, _s2 += 536);
            break;
          case _s3 - 129:
            _s5["\u6759"] = {};
            if (!_str_cache[1]["c"]) {
              _noop(_s5["\u8338"] = _s5["\u6759"], _s1 += -67, _s3 += 169, _s2 += -86);
              break
            } else {
              _noop(_s5["\u8338"] = _s5["\u98AE"], _s1 += -67, _s3 += 54, _s2 += 450);
              break
            }
          case -204:
          case _s1 - 224:
            _noop(_s5["\u8338"] = _s5["\u6759"], _s1 += -91, _s3 += 124, _s2 += -63);
            break;
          case _s5["\u98AE"]["\u9DA3"] + 64:
            return __str_table__ = true, _str_cache[1][CONSTS[_s3 + 263]] && _v1176(_str_cache[1]["c"], _str_cache[-CONSTS[_s1 + 34]]) ? _str_cache[1] : _g(CONSTS[_s1 + 183] + CONSTS[_s3 + 399])["freeze"]({
              ..._str_cache[CONSTS[_s1 + 13]],
              [CONSTS[_s1 + 22]]: _g(CONSTS[_s3 + 424] + "D")["freeze"](_str_cache[-7])
            });
            _noop(_s5["\u8338"] = _s5["\u5D09"], _s1 += -216, _s3 += 636, _s2 += -255);
            break;
          case 86:
          case -209:
            _noop([_s5["\u98AE"]["\u5D25"], _s5["\u98AE"]["\u9DA3"], _s5["\u98AE"]["\u8487"]] = [57, -83, -195], _str_cache[CONSTS[_s3 + 29]][CONSTS[_s3 + 431]] !== void CONSTS[_s3 + 29] && _v948(_str_cache[CONSTS[_s3 + 29]]["pe"]), _str_cache[0][CONSTS[_s1 + 532] + CONSTS[_s1 + 389]] !== void 0 && _v947(_str_cache[CONSTS[_s3 + 29]][CONSTS[_s1 + 532] + "ze"]), _str_cache[-7] = {
              ..._str_cache[CONSTS[_s3 + 27]]["c"],
              ..._str_cache[0]
            });
            if (_v946(_str_cache[-7])) {
              _noop(_s5["\u8338"] = _s5["\u98AE"], _s1 += 181, _s3 += -36, _s2 += -124);
              break
            } else {
              _noop(_s5["\u8338"] = _s5["\u98AE"], _s1 += 114, _s3 += -227, _s2 += 303);
              break
            }
          case -214:
          case _s2 - 14:
          case 47:
            ({
              [CONSTS[_s1 + 22]]: _s5["\u6759"]["\u62D0"],
              ..._s5["\u6759"]["\u7FCC"]
            } = _str_cache[CONSTS[_s1 + 13]]);
            return __str_table__ = true, Object[CONSTS[_s3 + 243]](_s5["\u6759"]["\u7FCC"]);
            _noop(_s5["\u8338"] = _s5["\u98AE"], _s3 += -245, _s2 += -23);
            break
        }
      }
    }
  }
  _noop(__str_table__ = undefined, _s1 = _s3(-123, -23, -63)["next"]()["value"]);
  if (__str_table__) {
    return _s1
  }
}
_noop(_v679 = 3, _v680 = 4, _v681 = 8, _v682 = 16);

function _v1177() {
  return _v581([
    [_str_cache => {
      return _str_cache["kind"] === "u32"
    }, _v54(_v106([
      ["value", _v320()]
    ]), _limitArgs((..._str_cache) => {
      _str_cache["length"] = 1;
      return _str_cache[0]
    }))],
    [_limitArgs((..._str_cache) => {
      _str_cache["length"] = 1;
      return _str_cache[0]["kind"] === "u64"
    }), _v54(_v106([
      ["value", _v674()]
    ]), _limitArgs((..._str_cache) => {
      _str_cache["length"] = 1;
      return _str_cache[0]
    }))]
  ])
}

function _v1178() {
  return _v95(_v1177(), {
    ["size"]: "remainder"
  })
}

function _v1179() {
  return _v106([
    [getString(160), _v72()],
    [getString(161), _v72()],
    [getString(162), _v673()]
  ])
}

function _v1180() {
  return _v106([
    [getString(163), _v95(_v72(), {
      ["size"]: "remainder"
    })],
    ["instructionData", _v221()]
  ])
}

function _v1181() {
  return _v54(_v106([
    ["version", _v1009()],
    ["header", _v1006()],
    ["configMask", _v320()],
    ["lifetimeToken", _v1008()],
    ["numInstructions", _v72()],
    [getString(164), _v72()],
    ["staticAccounts", _v95(_v410(), {
      ["size"]: "remainder"
    })],
    ["configValues", _v1178()],
    [getString(165), _v95(_v1179(), {
      ["size"]: "remainder"
    })],
    [getString(166), _v95(_v1180(), {
      ["size"]: "remainder"
    })]
  ]), _limitArgs((..._str_cache) => {
    _str_cache["length"] = 1;
    return {
      ..._str_cache[0],
      ["lifetimeToken"]: "lifetimeToken" in _str_cache[0] ? _str_cache[0]["lifetimeToken"] : void 0
    }
  }))
}

function _v1182() {
  return _v54(_v581([
    [_limitArgs((..._str_cache) => {
      _str_cache["length"] = 1;
      return _str_cache[0]["version"] === 0
    }), _v1175()],
    [_str_cache => {
      return _str_cache["version"] === 1
    }, _v1181()]
  ]), _str_cache => {
    if (_str_cache["version"] !== "legacy" && _str_cache["version"] > _v321) {
      throw new SolanaError(_v229, {
        [getString(156)]: _str_cache["version"]
      })
    }
    return _str_cache
  })
}

function _v578(..._str_cache) {
  _str_cache[0][_str_cache[1]] = _str_cache[2](_str_cache[0][_str_cache[1]] ?? {
    ["r"]: 0
  })
}
_v38 = Int8Array(getString(167));

function _v1183(_str_cache, __str_table__) {
  let _s1 = {
    [_str_cache]: {
      [_v38]: 0,
      ["r"]: 3
    }
  };
  let _s3 = new(Set);
  for (let _s2 of __str_table__) {
    if (_v578(_s1, _s2["d"], _limitArgs((..._str_cache) => {
        var __str_table__, _s1;

        function* _s5(_s1, _s5, _s4 = {
          ["\u7386"]: {}
        }) {
          while (_s1 + _s5 !== -145) {
            with(_s4["\u517E"] || _s4) {
              switch (_s1 + _s5) {
                case -114:
                  if (_str_cache[CONSTS[_s1 + 359]][_v38] === CONSTS[_s1 + 357]) {
                    _noop(_s4["\u517E"] = _s4["\u7386"], _s1 += 86);
                    break
                  } else {
                    _noop(_s4["\u517E"] = _s4["\u7386"], _s1 += 465, _s5 += -428);
                    break
                  }
                case _s4["\u7386"]["\u79CD"] + -114:
                  throw _str_cache[CONSTS[_s1 + -183]][_v38] === CONSTS[_s1 + -183] ? new SolanaError(_v317, {
                    [CONSTS[_s1 + -171]]: _s2["d"]
                  }) : new SolanaError(_v181, {
                    ["d"]: _s2["d"]
                  });
                  _noop(_s4["\u517E"] = _s4["\u7386"], _s1 += -542, _s5 += 320);
                  break;
                case _s5 - 69:
                case -240:
                case 92:
                  throw _str_cache[CONSTS[_s1 + 75]][_v38] === 0 ? new SolanaError(_v317, {
                    [CONSTS[_s1 + 87]]: _s2["d"]
                  }) : new SolanaError(_v181, {
                    ["d"]: _s2["d"]
                  });
                  _noop(_s4["\u517E"] = _s4["\u7386"], _s1 += -284, _s5 += 264);
                  break;
                case -193:
                case -89:
                  if (_v105(_str_cache[CONSTS[_s1 + 211]][CONSTS[_s1 + 528]])) {
                    _noop(_s4["\u517E"] = _s4["\u7386"], _s1 += 136, _s5 += -37);
                    break
                  } else {
                    _noop(_s4["\u517E"] = _s4["\u7386"], _s1 += -148, _s5 += 227);
                    break
                  }
                case -248:
                case -32:
                case _s4["\u7386"]["\u79CD"] + -250:
                  return __str_table__ = true, _str_cache[CONSTS[_s1 + 273]];
                  _noop(_s4["\u517E"] = _s4["\u7386"], _s1 += 379, _s5 += -428);
                  break;
                  if (!(_s5 != 157)) {
                    _noop(_s4["\u517E"] = _s4["\u7386"], _s1 += 207, _s5 += -53);
                    break
                  }
                case 161:
                  _str_cache["length"] = CONSTS[_s1 + -185];
                  if (_s3[CONSTS[_s1 + 233]](_s2["d"]), _v38 in _str_cache[CONSTS[_s1 + -183]]) {
                    _noop(_s4["\u517E"] = _s4["\u7386"], _s1 += -394, _s5 += 40);
                    break
                  } else {
                    _noop(_s4["\u517E"] = _s4["\u7386"], _s1 += -123, _s5 += -194);
                    break
                  }
                case _s4["\u7386"]["\u9945"] + 7:
                case -220:
                  return __str_table__ = true, _str_cache[0];
                  _noop(_s4["\u517E"] = _s4["\u7386"], _s1 += 290, _s5 += -275);
                  break;
                  if (!(_s5 != _s1 + 335)) {
                    _noop(_s4["\u517E"] = _s4["\u7386"], _s1 += 118, _s5 += 100);
                    break
                  }
                case 19:
                case -156:
                  return __str_table__ = true, {
                    [_v38]: 1,
                    ["r"]: 0
                  };
                  _noop(_s4["\u517E"] = _s4["\u8A36"], _s1 += -41, _s5 += 52);
                  break;
                case _s1 - -70:
                case 44:
                  _noop(_s4["\u517E"] = _s4["\u7386"], _s1 += -30, _s5 += -95);
                  break;
                  if (_s5 != 70) {
                    _noop(_s4["\u517E"] = _s4["\u7386"], _s1 += 151, _s5 += -259);
                    break
                  }
                case -59:
                  _noop([_s4["\u7386"]["\u79CD"], _s4["\u7386"]["\u9945"]] = [222, -99], _str_cache[CONSTS[_s1 + 250]] = CONSTS[_s1 + 249]);
                  if (_s3["add"](_s2[CONSTS[_s1 + 263]]), _v38 in _str_cache[CONSTS[_s1 + 251]]) {
                    _noop(_s4["\u517E"] = _s4["\u7386"], _s1 += 40, _s5 += -174);
                    break
                  } else {
                    _noop(_s4["\u517E"] = _s4["\u7386"], _s1 += 311, _s5 += -408);
                    break
                  }
                case _s1 != 25 && _s1 - 170:
                default:
                case 98:
                  _noop(_s4["\u517E"] = _s4["\u7386"], _s1 += -293, _s5 += 409);
                  break;
                case _s4["\u7386"]["\u9945"] + 225:
                  _noop(_s4["\u517E"] = _s4["\u7386"], _s1 += -9, _s5 += -211);
                  break;
                case -77:
                case -147:
                  _noop(_s4["\u517E"] = _s4["\u7386"], _s1 += -46, _s5 += -33);
                  break;
                case _s5 != -28 && _s5 != -81 && _s5 - -189:
                  _noop([_s4["\u7386"]["\u79CD"], _s4["\u7386"]["\u9945"]] = [-212, 195], _s4["\u517E"] = _s4["\u7386"], _s1 += -258, _s5 += 126);
                  break
              }
            }
          }
        }
        _noop(__str_table__ = undefined, _s1 = _s5(-245, 186)["next"]()["value"]);
        if (__str_table__) {
          return _s1
        }
      })), !!_s2["f"]) {
      for (let _s5 of _s2["f"]) {
        _v578(_s1, _s5["e"], _limitArgs((..._str_cache) => {
          var __str_table__, _s1;

          function* _s2(_s1, _s2, _s4, _s6 = {
            ["\u8C50"]: {}
          }) {
            while (_s1 + _s2 + _s4 !== 232) {
              with(_s6["\u7B3E"] || _s6) {
                switch (_s1 + _s2 + _s4) {
                  case _s1 - 9:
                  case 27:
                    switch (_str_cache[0][_v38]) {
                      case 0:
                        return __str_table__ = true, _str_cache[CONSTS[_s2 + 127]];
                      case 1: {
                        let _s7 = _v613(_str_cache[CONSTS[_s2 + 127]][CONSTS[_s1 + 411]], _str_cache[2][CONSTS[_s1 + 411]]);
                        if (_s3[CONSTS[_s1 + 283]](_s5["e"])) {
                          if (_v105(_str_cache[CONSTS[_s2 + 121]][CONSTS[_s1 + 411]])) {
                            throw new SolanaError(_v181, {
                              ["d"]: _s5[CONSTS[_s2 + 276]]
                            })
                          }
                          return __str_table__ = true, _str_cache[0]["r"] !== _s7 ? {
                            ..._str_cache[0],
                            ["r"]: _s7
                          } : _str_cache[0]
                        } else {
                          return __str_table__ = true, _str_cache[CONSTS[_s1 + 94]][CONSTS[_s1 + 411]] !== _s7 ? {
                            ..._str_cache[0],
                            ["r"]: _s7
                          } : _str_cache[0]
                        }
                      }
                    }
                    _noop(_s6["\u7B3E"] = _s6["\u8C50"], _s1 += 64, _s4 += -157);
                    break;
                    if (!(_s2 == -121)) {
                      _noop(_s6["\u7B3E"] = _s6["\u8C50"], _s1 += 410, _s4 += -553);
                      break
                    }
                  case _s1 - 562:
                    _noop([_s6["\u8C50"]["\u8070"]] = [-241], _s6["\u7B3E"] = _s6["\u6A61"], _s1 += -290, _s2 += -50, _s4 += 765);
                    break;
                    if (!(_s1 == 322)) {
                      _s6["\u7B3E"] = _s6["\u8C50"];
                      break
                    }
                  case -112:
                  case _s1 - -153:
                  case -47:
                    _noop([_s6["\u8C50"]["\u8070"]] = [139], _str_cache["length"] = CONSTS[_s1 + -28], {
                      ["e"]: _str_cache[1],
                      ..._str_cache[CONSTS[_s1 + -32]]
                    } = _s5);
                    if (_v38 in _str_cache[CONSTS[_s1 + -26]]) {
                      _noop(_s6["\u7B3E"] = _s6["\u8C50"], _s1 += -120, _s2 += 50, _s4 += -212);
                      break
                    } else {
                      _noop(_s6["\u7B3E"] = _s6["\u8C50"], _s1 += -56, _s2 += 50, _s4 += -369);
                      break
                    }
                    if (_s2 > -51) {
                      _noop(_s6["\u7B3E"] = _s6["\u8C50"], _s1 += -56, _s2 += 50, _s4 += -369);
                      break
                    }
                  case 239:
                  case 52:
                  case _s1 - -228:
                  case -190:
                    return __str_table__ = true, {
                      ..._str_cache[2],
                      [_v38]: 1
                    };
                    _noop(_s6["\u7B3E"] = _s6["\u6CCB"], _s1 += 346, _s4 += 76);
                    break;
                  case -246:
                  case 187:
                  case -109:
                  case _s1 - -231:
                    _noop(_s6["\u7B3E"] = _s6["\u7DA7"], _s1 += 274, _s2 += -427, _s4 += 349);
                    break;
                    if (!(_s1 == 322)) {
                      _noop(_s6["\u7B3E"] = _s6["\u8C50"], _s1 += 564, _s2 += -377, _s4 += -416);
                      break
                    }
                  default:
                }
              }
            }
          }
          _noop(__str_table__ = undefined, _s1 = _s2(32, -171, 324)["next"]()["value"]);
          if (__str_table__) {
            return _s1
          }
        }))
      }
    }
  }
  return _s1
}

function _v944(..._str_cache) {
  _str_cache["a"] = undefined;
  return Object["entries"](_str_cache[0])["sort"](([__str_table__, _s1], [_s3, _s2]) => {
    var _s5, _s4;

    function* _s6(_s4, _s6, _s7, _s8, _defineProperty = {
      ["\u6ECD"]: {}
    }) {
      while (_s4 + _s6 + _s7 + _s8 !== -241) {
        with(_defineProperty["\u506C"] || _defineProperty) {
          switch (_s4 + _s6 + _s7 + _s8) {
            case -125:
            case -244:
              if (_s2[_v38] === CONSTS[_s6 + 210]) {
                _noop(_defineProperty["\u506C"] = _defineProperty["\u6ECD"], _s4 += 26, _s6 += 12);
                break
              } else {
                _noop(_defineProperty["\u506C"] = _defineProperty["\u6ECD"], _s4 += -24, _s6 += 421, _s8 += -216);
                break
              }
            case -196:
            case _s4 - -10:
              _noop(_defineProperty["\u506C"] = _defineProperty["\u6ECD"], _s4 += 391, _s6 += 146, _s7 += 12, _s8 += -361);
              break;
            case _s8 - -20:
            case 174:
              [_defineProperty["\u6ECD"]["\u7C20"], _defineProperty["\u6ECD"]["\u5303"], _defineProperty["\u6ECD"]["\u6057"]] = [206, 224, 47];
              return _s5 = true, _v1014 ? -CONSTS[_s6 + 233] : 1;
              _noop(_defineProperty["\u506C"] = _defineProperty["\u6ECD"], _s4 += -33, _s6 += 310, _s7 += -188, _s8 += 62);
              break;
            case -37:
              if (_s2[_v38] === 1) {
                _noop(_defineProperty["\u506C"] = _defineProperty["\u6ECD"], _s4 += -47, _s6 += 213);
                break
              } else {
                _noop(_defineProperty["\u506C"] = _defineProperty["\u6ECD"], _s4 += -47, _s6 += 213, _s7 += -92);
                break
              }
            case _s7 - 24:
              return _s5 = true, 1;
              _noop(_defineProperty["\u506C"] = _defineProperty["\u6ECD"], _s4 += -50, _s6 += 409, _s8 += -216);
              break;
            case 56:
              if (_s1[_v38] === CONSTS[_s7 + 67]) {
                _noop(_defineProperty["\u506C"] = _defineProperty["\u6ECD"], _s6 += -169, _s7 += 231);
                break
              } else {
                _noop(_defineProperty["\u506C"] = _defineProperty["\u6ECD"], _s4 += 154, _s6 += -458, _s7 += 204, _s8 += 7);
                break
              }
            case _defineProperty["\u6ECD"]["\u7C20"] + -317:
              _noop(_defineProperty["\u506C"] = _defineProperty["\u6ECD"], _s4 += -203, _s6 += -44, _s7 += 310, _s8 += 9);
              break;
            case _s7 != 49 && _s7 - 12:
            case 125:
            case 241:
              return _s5 = true, CONSTS[_s7 + -137];
              _noop(_defineProperty["\u506C"] = _defineProperty["\u6ECD"], _s7 += -92);
              break;
            case _s4 - -106:
              return _s5 = true, -1;
              _noop(_defineProperty["\u506C"] = _defineProperty["\u6ECD"], _s4 += -97, _s7 += -262);
              break;
            case _s4 - -114:
            case -193:
              if (_s1[_v38] === CONSTS[_s4 + -122]) {
                _noop(_defineProperty["\u506C"] = _defineProperty["\u6ECD"], _s6 += -29, _s8 += 21);
                break
              } else {
                _noop(_defineProperty["\u506C"] = _defineProperty["\u6ECD"], _s4 += -97, _s6 += -29, _s7 += -262, _s8 += 21);
                break
              }
            case _defineProperty["\u6ECD"]["\u6057"] + -186:
              return _s5 = true, _v1014 ? -1 : 1;
              _noop(_defineProperty["\u506C"] = _defineProperty["\u6ECD"], _s4 += 127, _s7 += -118);
              break;
            case _s7 - -72:
              [_defineProperty["\u6ECD"]["\u7C20"], _defineProperty["\u6ECD"]["\u5303"], _defineProperty["\u6ECD"]["\u6057"]] = [29, 181, 177];
              if (_s1[_v38] === CONSTS[_s6 + 11]) {
                _noop(_defineProperty["\u506C"] = _defineProperty["\u6ECD"], _s4 += -109, _s6 += -199, _s7 += 187, _s8 += 271);
                break
              } else {
                _noop(_defineProperty["\u506C"] = _defineProperty["\u6ECD"], _s4 += -206, _s6 += -199, _s7 += -75, _s8 += 271);
                break
              }
            case -234:
            case _s4 - 0:
              [_defineProperty["\u6ECD"]["\u7C20"], _defineProperty["\u6ECD"]["\u5303"], _defineProperty["\u6ECD"]["\u6057"]] = [120, -64, 188];
              if (_s1[_v38] !== _s2[_v38]) {
                _noop(_defineProperty["\u506C"] = _defineProperty["\u6ECD"], _s4 += -64, _s6 += 156, _s7 += 71, _s8 += -113);
                break
              } else {
                _noop(_defineProperty["\u506C"] = _defineProperty["\u6ECD"], _s4 += -78, _s6 += 193, _s7 += -186, _s8 += -301);
                break
              }
            case 37:
              _noop(_defineProperty["\u506C"] = _defineProperty["\u6ECD"], _s6 += -110, _s7 += -107);
              break;
            case -53:
            case 118:
            default:
              return _s5 = true, -CONSTS[_s6 + -44];
              _noop(_defineProperty["\u506C"] = _defineProperty["\u6ECD"], _s4 += 154, _s6 += -289, _s7 += -27, _s8 += 7);
              break;
            case _s8 - -109:
            case 127:
              _defineProperty["\u6ECD"]["_v1184"] = _v105(_s1["r"]);
              return _s5 = true, _v1184 !== _v105(_s2[CONSTS[_s7 + 499]]) ? _v1184 ? -CONSTS[_s7 + 180] : 1 : (_str_cache[CONSTS[_s7 + 191]] || (_str_cache[CONSTS[_s7 + 191]] = _v302()), _str_cache["a"](__str_table__, _s3));
              _noop(_defineProperty["\u506C"] = _defineProperty["\u8456"], _s4 += -391, _s6 += -38, _s7 += 411, _s8 += -234);
              break;
            case 47:
              _noop(_defineProperty["\u506C"] = _defineProperty["\u6ECD"], _s4 += 264, _s6 += -43, _s7 += -66, _s8 += -200);
              break;
            case -50:
            case -129:
              return _s5 = true, CONSTS[_s6 + 164];
              _noop(_defineProperty["\u506C"] = _defineProperty["\u6ECD"], _s4 += 68, _s6 += 377, _s7 += -315, _s8 += 55);
              break;
            case -4:
            case _s7 - 122:
              _defineProperty["\u6ECD"]["_v1014"] = _v63(_s1[CONSTS[_s7 + 381]]);
              if (_v1014 !== _v63(_s2[CONSTS[_s4 + 209]])) {
                _noop(_defineProperty["\u506C"] = _defineProperty["\u6ECD"], _s4 += -37, _s6 += 219);
                break
              } else {
                _noop(_defineProperty["\u506C"] = _defineProperty["\u6ECD"], _s4 += 90, _s6 += 219, _s7 += -118);
                break
              }
          }
        }
      }
    }
    _noop(_s5 = undefined, _s4 = _s6(192, -331, 128, 203)["next"]()["value"]);
    if (_s5) {
      return _s4
    }
  })["map"](([_str_cache, __str_table__]) => {
    return {
      ["e"]: _str_cache,
      ...__str_table__
    }
  })
}

function _v1015(_s1, _s3, _s2, _s5) {
  if (!_s3) {
    _s3 = function*(_s5, _s4, _s6, _s7, _s8 = {
      ["_v306"]: {}
    }, _defineProperty) {
      while (_s5 + _s4 + _s6 + _s7 !== -112) {
        with(_s8["\u660E"] || _s8) {
          switch (_s5 + _s4 + _s6 + _s7) {
            case -169:
            case -41:
              _v96[-16] = 0;
              for (let _getOwnPropDesc = 0; _getOwnPropDesc < _v1016 - _v1185; _getOwnPropDesc++) {
                const _found = _v96[CONSTS[_s6 + -10]]["charCodeAt"](_getOwnPropDesc);
                if (_found == 61) break;
                _noop(_v96[138] = _v96[138] << 6 | _s8["_v306"]["\u79BC"][_found], _v96[2] += 6);
                if (_v96[2] >= 8) {
                  _noop(_v96[2] -= 8, _v1186[_v96[-16]++] = _v96[138] >> _v96[CONSTS[_s4 + 111]] & 255)
                }
              }
              return _s8["_v306"]["\u5D4F"].decode(_v1186);
              return undefined;
            case 159:
            case _s4 - -152:
              _noop(_s8["_v623"]["_v1187"] = _v96[CONSTS[_s5 + 125]].indexOf("="), _s8["_v623"]["_v1185"] = _v1187 == -1 ? 0 : _v1016 - _v1187, _s8["\u660E"] = _s8["_v623"], _s5 += -165);
              break;
            case -25:
            case 209:
            case 95:
              for (let _v1 of _s1) {
                if (getString(157) in _v1) {
                  break
                }
                let _getOwnPropDesc = _v105(_v1["r"]);
                _v63(_v1["r"]) ? (_v619++, _getOwnPropDesc || _v620++) : _getOwnPropDesc || _v621++
              }
              return _s2 = true, {
                [getString(154)]: _v621,
                [(1, _v622)(153)]: _v620,
                [(1, _v622)(152)]: _v619
              };
              _noop(_s8["\u660E"] = _s8["\u951D"], _s5 += -632, _s7 += 311);
              break;
            case 99:
            case -36:
              _s8["_v67"]["_v1395"] = (1, _v1393)(-346, 194)["next"]()["value"];
              if (_v1394) {
                _noop(_s8["\u660E"] = _s8["_v67"], _s5 += -177, _s6 += 24, _s7 += 255);
                break
              } else {
                _noop(_s8["\u660E"] = _s8["_v67"], _s5 += -177, _s4 += 62, _s6 += -140, _s7 += 110);
                break
              }
            case _s5 != -475 && _s5 - -647:
              _noop(_s8["\u660E"] = _s8["_v623"], _s5 += 526, _s4 += -679, _s6 += 43, _s7 += 66);
              break;
            case _s6 - 273:
              _noop([_s8["_v306"]["\u8DA8"], _s8["_v306"]["\u7E91"]] = [-12, 177], _v306["_v622"] = function(..._s5) {
                return _s3(133, -352, 196, -138, {
                  ["_v306"]: _s8["_v306"],
                  ["_v67"]: {}
                }, _s5)["next"]()["value"]
              }, _v306["\u8F2B"] = function(..._s5) {
                return _s3(-119, -295, 100, 189, {
                  ["_v306"]: _s8["_v306"],
                  ["_v623"]: {}
                }, _s5)["next"]()["value"]
              }, _limitArgs(_v306["_v622"]), _limitArgs(_v306["\u8F2B"]), _s8["\u660E"] = _s8["_v306"], _s5 += 41, _s4 += 108, _s6 += -166, _s7 += 109);
              break;
              if (_s6 < _s5 + 402) {
                _noop(_s8["\u660E"] = _s8["_v67"], _s5 += 55, _s4 += 221, _s6 += 63, _s7 += -218);
                break
              }
            case _s8["_v306"]["\u8DA8"] + 41:
              _noop(_s8["_v306"]["_v621"] = 0, _s8["_v306"]["_v620"] = 0, _s8["_v306"]["_v619"] = 0, _s8["\u660E"] = _s8["_v306"], _s5 += 316, _s4 += -66, _s7 += -70);
              break;
            case _s4 - 88:
              return _v1395;
              _noop(_s8["\u660E"] = _s8["_v67"], _s4 += 62, _s6 += -164, _s7 += -145);
              break;
              if (!(_s4 != 124)) {
                _noop(_s8["\u660E"] = _s8["_v306"], _s5 += 249, _s4 += 113, _s6 += -164, _s7 += -235);
                break
              }
            case _s7 - -33:
              _noop(_v96[138] = 0, _v96[2] = 0, _s8["\u660E"] = _s8["_v623"], _s5 += 17, _s6 += -81, _s7 += -327);
              break;
            case _s8["_v306"]["\u8DA8"] + 184:
              _noop([_s8["_v306"]["\u8DA8"], _s8["_v306"]["\u7E91"]] = [-22, -124], _s8["\u660E"] = _s8["\u5CF9"], _s5 += 356, _s4 += -780, _s6 += 61, _s7 += 66);
              break;
            case _s6 - 15:
              _noop(_s8["_v306"]["\u79BC"] = {
                [CONSTS[_s6 + 81]]: 21,
                [CONSTS[_s5 + 278]]: CONSTS[_s4 + -7],
                ["48"]: 33,
                ["49"]: 62,
                [CONSTS[_s5 + 284]]: CONSTS[_s5 + 285],
                ["51"]: 16,
                [CONSTS[_s4 + 2]]: CONSTS[_s5 + 289],
                ["53"]: CONSTS[_s6 + 96],
                [CONSTS[_s5 + 292]]: CONSTS[_s6 + 98],
                ["55"]: 47,
                [CONSTS[_s5 + 295]]: CONSTS[_s4 + 10],
                [CONSTS[_s6 + 102]]: 1,
                [CONSTS[_s6 + 103]]: 2,
                [CONSTS[_s4 + 13]]: CONSTS[_s5 + 300],
                [CONSTS[_s6 + 106]]: CONSTS[_s4 + 16],
                [CONSTS[_s5 + 303]]: 30,
                ["69"]: 29,
                ["70"]: CONSTS[_s5 + 308],
                ["71"]: CONSTS[_s6 + 115],
                ["72"]: CONSTS[_s6 + 76],
                [CONSTS[_s6 + 117]]: 41,
                [CONSTS[_s5 + 314]]: CONSTS[_s5 + 252],
                ["75"]: 8,
                ["76"]: 24,
                ["77"]: 63,
                ["78"]: 60,
                ["79"]: 20,
                ["80"]: CONSTS[_s6 + 52],
                ["81"]: CONSTS[_s4 + 39],
                ["82"]: CONSTS[_s5 + 257],
                ["83"]: CONSTS[_s4 + 42],
                [CONSTS[_s4 + 43]]: 42,
                [CONSTS[_s5 + 331]]: CONSTS[_s5 + 332],
                [CONSTS[_s6 + 138]]: 5,
                [CONSTS[_s6 + 139]]: 22,
                ["88"]: 36,
                ["89"]: 34,
                ["90"]: 39,
                ["97"]: CONSTS[_s4 + 57],
                ["98"]: 17,
                ["99"]: 45,
                ["100"]: 0,
                ["101"]: 12,
                ["102"]: 57,
                ["103"]: CONSTS[_s5 + 353],
                ["104"]: 26,
                ["105"]: 58,
                ["106"]: 11,
                ["107"]: 28,
                ["108"]: CONSTS[_s6 + 168],
                ["109"]: 49,
                [CONSTS[_s6 + 171]]: 3,
                ["111"]: 10,
                [CONSTS[_s4 + 83]]: 40,
                ["113"]: 37,
                ["114"]: 52,
                [CONSTS[_s4 + 89]]: 53,
                ["116"]: 15,
                [CONSTS[_s6 + 183]]: 7,
                ["118"]: 38,
                ["119"]: 51,
                ["120"]: 32,
                ["121"]: 6,
                ["122"]: 56
              }, _s8["_v306"]["\u5D4F"] = new TextDecoder, _s8["\u660E"] = _s8["_v306"], _s5 += 86, _s4 += 226, _s6 += 89, _s7 += -307);
              break;
            default:
            case _s8["_v306"]["\u8DA8"] + -149:
            case 111:
              _noop([..._v67["\u908D"]] = _defineProperty, _v67["_v1393"] = function* _s5(_s4, _s6, _s7 = {
                ["\u88EC"]: {}
              }) {
                while (_s4 + _s6 !== 76) {
                  with(_s7["\u6352"] || _s7) {
                    switch (_s4 + _s6) {
                      case _s7["\u88EC"]["\u5538"] + 400:
                      case 13:
                      case -26:
                      case _s7["\u88EC"]["\u8F0A"] + -261:
                      case 139:
                      case 28:
                        return _v67["_v1394"] = true, _str_cache[_v67["\u908D"][CONSTS[_s4 + 6]]];
                        _noop(_s7["\u6352"] = _s7["\u9866"], _s4 += 83, _s6 += 123);
                        break;
                      case _s7["\u88EC"]["\u7AE9"] + 284:
                        return _v67["_v1394"] = true, _str_cache[_v67["\u908D"][0]] = (1, _v306["\u8F2B"])(__str_table__[_v67["\u908D"][CONSTS[_s4 + 76]]]);
                        _noop(_s7["\u6352"] = _s7["\u88EC"], _s4 += 296, _s6 += -210);
                        break;
                      case _s6 - 346:
                        _noop([_s7["\u88EC"]["\u8F0A"], _s7["\u88EC"]["\u5538"], _s7["\u88EC"]["\u7AE9"]] = [131, -244, -151], _v67["\u908D"]["length"] = 1);
                        if (typeof _str_cache[_v67["\u908D"][CONSTS[_s4 + 352]]] === CONSTS[_s4 + 362]) {
                          _noop(_s7["\u6352"] = _s7["\u88EC"], _s4 += 276, _s6 += 9);
                          break
                        } else {
                          _noop(_s7["\u6352"] = _s7["\u88EC"], _s4 += 572, _s6 += -201);
                          break
                        }
                      case 219:
                        return _v67["_v1394"] = true, _str_cache[_v67["\u908D"][0]];
                        _noop(_s7["\u6352"] = _s7["\u9B83"], _s4 += -143);
                        break;
                      case 121:
                      default:
                        _noop([_s7["\u88EC"]["\u8F0A"], _s7["\u88EC"]["\u5538"], _s7["\u88EC"]["\u7AE9"]] = [-150, 2, -142], _s7["\u6352"] = _s7["\u88EC"], _s4 += -273, _s6 += 323);
                        break;
                        if (!(_s6 == -(_s4 + -83))) {
                          _noop(_s7["\u6352"] = _s7["\u5A20"], _s4 += -549, _s6 += 314);
                          break
                        }
                      case _s6 - -39:
                      case 169:
                      case -60:
                        [_s7["\u88EC"]["\u8F0A"], _s7["\u88EC"]["\u5538"], _s7["\u88EC"]["\u7AE9"]] = [168, -42, -119];
                        return _v67["_v1394"] = true, _str_cache[_v67["\u908D"][0]] = (1, _v306["\u8F2B"])(__str_table__[_v67["\u908D"][0]]);
                        _noop(_s7["\u6352"] = _s7["\u88EC"], _s4 += 187, _s6 += 174);
                        break
                    }
                  }
                }
              }, _v67["_v1394"] = undefined, _s8["\u660E"] = _s8["_v67"], _s5 += -364, _s4 += 506, _s6 += -17);
              break;
            case 232:
            case -225:
            case _s6 - 110:
              for (let _v1 of _s1) {
                if (getString(157) in _v1) {
                  break
                }
                let _getOwnPropDesc = _v105(_v1[CONSTS[_s6 + 284]]);
                _v63(_v1["r"]) ? (_v619++, _getOwnPropDesc || _v620++) : _getOwnPropDesc || _v621++
              }
              return _s2 = true, {
                [getString(154)]: _v621,
                [(1, _v622)(153)]: _v620,
                [(1, _v622)(152)]: _v619
              };
              _noop(_s8["\u660E"] = _s8["\u80C4"], _s5 += 335, _s4 += -376);
              break;
            case _s6 - 289:
              _noop(_s8["_v623"]["_v1396"] = _v1016 * 3 / 4 - _v1185, _s8["_v623"]["_v1186"] = new Uint8Array(_v1396), _s8["\u660E"] = _s8["_v623"], _s5 += 331, _s4 += 83, _s6 += 15);
              break;
            case -187:
            case -181:
              return undefined;
            case _s6 - 225:
              _noop([..._v623["_v96"]] = _defineProperty, _v623["_v96"]["length"] = 1, _v623["_v1016"] = _v623["_v96"][0].length, _s8["\u660E"] = _s8["_v623"], _s4 += 101, _s6 += -18);
              break
          }
        }
      }
    }
  }
  _noop(_s2 = undefined, _s5 = _s3(-286, -67, 116, 80)["next"]()["value"]);
  if (_s2) {
    return _s5
  }
}

function _v943(..._str_cache) {
  var __str_table__, _s1;

  function* _s3(_s1, _s3, _s2, _s5, _s4 = {
    ["\u815A"]: {}
  }) {
    while (_s1 + _s3 + _s2 + _s5 !== 11) {
      with(_s4["\u74B0"] || _s4) {
        switch (_s1 + _s3 + _s2 + _s5) {
          case _s4["\u815A"]["\u89C5"] + -274:
          case -118:
          case 242:
            _noop([_s4["\u815A"]["\u89C5"]] = [-50], _s4["\u74B0"] = _s4["\u9791"], _s1 += -281, _s3 += 617, _s2 += 177, _s5 += -298);
            break;
          case _s1 - -84:
            if (_s2 > 181) {
              _noop(_s4["\u74B0"] = _s4["\u8934"], _s1 += 311, _s3 += 15, _s2 += -20, _s5 += -256);
              break
            }
          case _s3 != -331 && _s3 - -292:
            _noop(_s4["\u74B0"] = _s4["\u4F22"], _s1 += 76, _s3 += 383, _s2 += -359, _s5 += -298);
            break;
            if (_s3 == 46) {
              _noop(_s4["\u74B0"] = _s4["\u815A"], _s1 += 357, _s3 += -234, _s2 += -536);
              break
            }
          case _s1 - -121:
            _noop(_s4["\u74B0"] = _s4["\u5BF5"], _s1 += 306, _s3 += -22, _s2 += -20, _s5 += -256);
            break;
          case 14:
          case _s5 - -75:
          case 102:
            _noop([_s4["\u815A"]["\u89C5"]] = [71], _str_cache[CONSTS[_s1 + 51]] = {});
            for (let [_s6, _s7] of _str_cache[0]["entrie" + CONSTS[_s3 + -139]]()) {
              _str_cache[CONSTS[_s3 + -297]][_s7["e"]] = _s6
            }
            return __str_table__ = true, _str_cache[1];
            _noop(_s1 += 235, _s3 += -617, _s2 += 339, _s5 += 42);
            break;
          default:
            _noop(_s4["\u74B0"] = _s4["\u590C"], _s1 += -263, _s3 += 617, _s2 += 177, _s5 += -303);
            break;
            if (_s3 == _s2 + 402) {
              _noop(_s4["\u74B0"] = _s4["\u815A"], _s1 += 18, _s5 += -5);
              break
            }
        }
      }
    }
  }
  _noop(__str_table__ = undefined, _s1 = _s3(-47, 301, -179, -63)["next"]()["value"]);
  if (__str_table__) {
    return _s1
  }
}

function _v577(..._str_cache) {
  return "nonce" in _str_cache[0] ? _str_cache[0]["nonce"] : _str_cache[0]["fe"]
}

function _v576(..._str_cache) {
  _str_cache[0][_str_cache[1]] = _str_cache[2](_str_cache[0][_str_cache[1]] ?? {
    ["r"]: 0
  })
}
_v32 = Int8Array(getString(167));

function _v942(..._s1) {
  _noop(_s1[209] = {
    [_s1[0]]: {
      [_v32]: 0,
      ["r"]: 3
    }
  }, _s1[3] = new(Set));
  for (let _s3 of _s1[1]) {
    _v576(_s1[209], _s3["d"], _limitArgs((..._s2) => {
      _s2["length"] = 1;
      if (_s1[3]["add"](_s3["d"]), _v32 in _s2[0]) {
        if (_v105(_s2[0]["r"])) {
          throw _s2[0][_v32] === 0 ? new SolanaError(_v317, {
            ["d"]: _s3["d"]
          }) : new SolanaError(_v181, {
            ["d"]: _s3["d"]
          })
        }
        if (_s2[0][_v32] === 2) {
          return _s2[0]
        }
      }
      return {
        [_v32]: 2,
        ["r"]: 0
      }
    }));
    let _s2;
    if (_s3["f"]) {
      for (let _s5 of _s3["f"]) {
        _v576(_s1[209], _s5["e"], _s3 => {
          _noop(_limitArgs(_s8), _limitArgs(_s7));
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

          function _s7(..._s3) {
            _s3["length"] = 1;
            const _s7 = _s3[0].length;
            const _s8 = _s3[0].indexOf("=");
            const _defineProperty = _s8 == -1 ? 0 : _s7 - _s8;
            const _getOwnPropDesc = _s7 * 3 / 4 - _defineProperty;
            const _found = new Uint8Array(_getOwnPropDesc);
            _noop(_s3[74] = 0, _s3[214] = 0, _s3["c"] = 0);
            for (let _v1 = 0; _v1 < _s7 - _defineProperty; _v1++) {
              const _v2 = _s3[0]["charCodeAt"](_v1);
              if (_v2 == 61) break;
              _noop(_s3[74] = _s3[74] << 6 | _s4[_v2], _s3[214] += 6);
              if (_s3[214] >= 8) {
                _noop(_s3[214] -= 8, _found[_s3["c"]++] = _s3[74] >> _s3[214] & 255)
              }
            }
            return _s6.decode(_found)
          }

          function _s8(..._s3) {
            var _s4, _s6;

            function* _s8(_s6, _s8, _defineProperty = {
              ["\u8DE2"]: {}
            }) {
              while (_s6 + _s8 !== 157) {
                with(_defineProperty["\u7C12"] || _defineProperty) {
                  switch (_s6 + _s8) {
                    case _s8 - -194:
                      _noop([_defineProperty["\u8DE2"]["\u7233"], _defineProperty["\u8DE2"]["\u5A91"]] = [187, -77], _defineProperty["\u7C12"] = _defineProperty["\u8DE2"], _s6 += -412, _s8 += 218);
                      break;
                    default:
                      _noop(_defineProperty["\u7C12"] = _defineProperty["\u5DC1"], _s6 += -794, _s8 += 446);
                      break;
                    case 51:
                    case 14:
                    case 150:
                      _noop(_defineProperty["\u7C12"] = _defineProperty["\u8DE2"], _s6 += -601, _s8 += 451);
                      break;
                    case -208:
                    case _s8 - 201:
                    case 104:
                      _noop(_defineProperty["\u7C12"] = _defineProperty["\u6E40"], _s6 += -210, _s8 += -18);
                      break;
                    case _defineProperty["\u8DE2"]["\u5A91"] + -73:
                      return _s4 = true, _str_cache[_s3[CONSTS[_s6 + 175]]];
                      _noop(_defineProperty["\u7C12"] = _defineProperty["\u6D4F"], _s6 += 559, _s8 += -243);
                      break;
                    case 0:
                      return _s4 = true, _str_cache[_s3[CONSTS[_s6 + 224]]] = _s7(__str_table__[_s3[CONSTS[_s6 + 224]]]);
                      _noop(_defineProperty["\u7C12"] = _defineProperty["\u8DE2"], _s6 += 49, _s8 += -208);
                      break;
                    case -219:
                    case -80:
                      _noop([_defineProperty["\u8DE2"]["\u7233"], _defineProperty["\u8DE2"]["\u5A91"]] = [-5, -86], _s3[CONSTS[_s6 + 416]] = 1);
                      if (typeof _str_cache[_s3[CONSTS[_s6 + 417]]] === "undefined") {
                        _noop(_defineProperty["\u7C12"] = _defineProperty["\u8DE2"], _s6 += 193, _s8 += 26);
                        break
                      } else {
                        _noop(_defineProperty["\u7C12"] = _defineProperty["\u8DE2"], _s6 += 242, _s8 += -182);
                        break
                      }
                    case _s8 != -254 && _s8 != -233 && _s8 - -383:
                      _noop(_defineProperty["\u7C12"] = _defineProperty["\u8DE2"], _s6 += -601, _s8 += 625);
                      break;
                      if (_s6 < 383) {
                        _noop(_defineProperty["\u7C12"] = _defineProperty["\u8DE2"], _s6 += -316, _s8 += 407);
                        break
                      }
                    case -192:
                    case -158:
                    case 67:
                      _noop(_defineProperty["\u7C12"] = _defineProperty["\u8DE2"], _s6 += 316, _s8 += -254);
                      break
                  }
                }
              }
            }
            _noop(_s4 = undefined, _s6 = _s8(-411, 192)["next"]()["value"]);
            if (_s4) {
              return _s6
            }
          }
          let {
            ["e"]: _defineProperty, ..._getOwnPropDesc
          } = _s5;
          if (_v32 in _s3) {
            switch (_s3[_v32]) {
              case 0:
                return _s3;
              case 1: {
                _limitArgs(_v1);
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

                function _found(_s3) {
                  var _s7, _s8;

                  function* _defineProperty(_s8, _defineProperty, _getOwnPropDesc, _found, _v1 = {
                    ["_v108"]: {}
                  }) {
                    while (_s8 + _defineProperty + _getOwnPropDesc + _found !== -34) {
                      with(_v1["\u5B3C"] || _v1) {
                        switch (_s8 + _defineProperty + _getOwnPropDesc + _found) {
                          case -225:
                          case -58:
                          case 49:
                            _noop(_v1["\u5B3C"] = _v1["_v108"], _s8 += -300, _defineProperty += -35, _getOwnPropDesc += 857, _found += -220);
                            break;
                          case _s8 - -30:
                            _noop(_v1["\u5B3C"] = _v1["\u92A0"], _s8 += 338, _defineProperty += 4, _getOwnPropDesc += 32, _found += -220);
                            break;
                          case 236:
                            _noop([_v1["_v108"]["\u72BE"], _v1["_v108"]["\u6B28"]] = [72, 33], _v1["\u5B3C"] = _v1["\u9C8C"], _s8 += -64, _defineProperty += -35, _getOwnPropDesc += -115, _found += -56);
                            break;
                          case _s8 - -178:
                            if (_defineProperty == -106) {
                              _noop(_v1["\u5B3C"] = _v1["_v108"], _s8 += -134, _defineProperty += -156, _getOwnPropDesc += 461, _found += -290);
                              break
                            }
                          case _v1["_v108"]["\u72BE"] + 190:
                            _noop(_v1["_v108"]["_v624"] = CONSTS[_getOwnPropDesc + -213], _v1["_v108"]["_v1399"] = CONSTS[_s8 + 122]);
                            for (let _v2 = CONSTS[_s8 + 122]; _v2 < _v1397 - _v1398; _v2++) {
                              const _v5 = _s3["charCodeAt"](_v2);
                              if (_v5 == 61) break;
                              _noop(_v1017 = _v1017 << 6 | _s4[_v5], _v624 += CONSTS[_getOwnPropDesc + -211]);
                              if (_v624 >= 8) {
                                _noop(_v624 -= 8, _v1188[_v1399++] = _v1017 >> _v624 & 255)
                              }
                            }
                            return _s7 = true, _s6.decode(_v1188);
                            _noop(_v1["\u5B3C"] = _v1["\u55D5"], _s8 += 236, _getOwnPropDesc += -347);
                            break;
                          default:
                          case 16:
                          case 225:
                            _noop([_v1["_v108"]["\u72BE"], _v1["_v108"]["\u6B28"]] = [-113, -41], _v108["_v1397"] = _s3.length, _v108["\u7623"] = _s3.indexOf("="), _v108["_v1398"] = _v108["\u7623"] == -CONSTS[_s8 + 26] ? CONSTS[_defineProperty + -(_getOwnPropDesc + 216)] : _v108["_v1397"] - _v108["\u7623"], _v108["\u6BE4"] = _v108["_v1397"] * 3 / CONSTS[_getOwnPropDesc + 176] - _v108["_v1398"], _v108["_v1188"] = new Uint8Array(_v108["\u6BE4"]), _v108["_v1017"] = 0, _v1["\u5B3C"] = _v1["_v108"], _s8 += -94, _defineProperty += 110, _getOwnPropDesc += 393, _found += -348);
                            break;
                          case _defineProperty - 331:
                            _noop([_v1["_v108"]["\u72BE"], _v1["_v108"]["\u6B28"]] = [223, 61], _v1["\u5B3C"] = _v1["\u9ECA"], _s8 += 95, _defineProperty += -35, _getOwnPropDesc += 100, _found += -56);
                            break
                        }
                      }
                    }
                  }
                  _noop(_s7 = undefined, _s8 = _defineProperty(-22, 48, -174, 164)["next"]()["value"]);
                  if (_s7) {
                    return _s8
                  }
                }

                function _v1(..._s3) {
                  var _s4, _s6;

                  function* _s7(_s6, _s7, _s8, _defineProperty, _getOwnPropDesc = {
                    ["\u97DB"]: {}
                  }) {
                    while (_s6 + _s7 + _s8 + _defineProperty !== -46) {
                      with(_getOwnPropDesc["\u72CE"] || _getOwnPropDesc) {
                        switch (_s6 + _s7 + _s8 + _defineProperty) {
                          case -103:
                            _noop([_getOwnPropDesc["\u97DB"]["\u7292"], _getOwnPropDesc["\u97DB"]["\u93C9"]] = [-122, 190], _s3["length"] = CONSTS[_s6 + -217]);
                            if (typeof _str_cache[_s3[0]] === "undefined") {
                              _noop(_getOwnPropDesc["\u72CE"] = _getOwnPropDesc["\u97DB"], _s6 += -274, _s7 += 77, _s8 += -312, _defineProperty += 766);
                              break
                            } else {
                              _noop(_getOwnPropDesc["\u72CE"] = _getOwnPropDesc["\u97DB"], _s6 += -185, _s7 += -103, _s8 += -356, _defineProperty += 766);
                              break
                            }
                          case _s7 - -163:
                            _noop(_getOwnPropDesc["\u72CE"] = _getOwnPropDesc["\u861F"], _s6 += 265, _s7 += -77, _s8 += 356, _defineProperty += -888);
                            break;
                          default:
                          case 91:
                            _noop(_getOwnPropDesc["\u72CE"] = _getOwnPropDesc["\u9CDD"], _s6 += 150, _s7 += -165, _defineProperty += -122);
                            break;
                          case _s6 - -207:
                            return _s4 = true, _str_cache[_s3[0]] = _found(__str_table__[_s3[0]]);
                            _noop(_getOwnPropDesc["\u72CE"] = _getOwnPropDesc["\u97DB"], _s6 += 89, _s7 += -180, _s8 += -44);
                            break;
                            if (!(_s8 != 72)) {
                              _noop(_getOwnPropDesc["\u72CE"] = _getOwnPropDesc["\u74AF"], _s6 += 9, _s7 += -165, _s8 += -44);
                              break
                            }
                          case _defineProperty - 242:
                          case -18:
                            return _s4 = true, _str_cache[_s3[0]];
                            _noop(_getOwnPropDesc["\u72CE"] = _getOwnPropDesc["\u7F45"], _s6 += -80, _s7 += 15);
                            break;
                          case _getOwnPropDesc["\u97DB"]["\u7292"] + 320:
                          case -34:
                          case -98:
                            [_getOwnPropDesc["\u97DB"]["\u7292"], _getOwnPropDesc["\u97DB"]["\u93C9"]] = [-24, -102];
                            return _s4 = true, _str_cache[_s3[CONSTS[_s7 + -179]]];
                            _noop(_getOwnPropDesc["\u72CE"] = _getOwnPropDesc["\u69B2"], _s6 += 150, _s7 += -272, _defineProperty += -122);
                            break;
                          case _s6 - -305:
                            [_getOwnPropDesc["\u97DB"]["\u7292"], _getOwnPropDesc["\u97DB"]["\u93C9"]] = [-102, -243];
                            return _s4 = true, _str_cache[_s3[0]];
                            _noop(_getOwnPropDesc["\u72CE"] = _getOwnPropDesc["\u90BA"], _s6 += 150, _s7 += 71, _s8 += -256, _defineProperty += -122);
                            break
                        }
                      }
                    }
                  }
                  _noop(_s4 = undefined, _s6 = _s7(221, 1, 180, -505)["next"]()["value"]);
                  if (_s4) {
                    return _s6
                  }
                }
                let _v2 = _v613(_s3["r"], _getOwnPropDesc["r"]);
                if (_v1(157) in _getOwnPropDesc) {
                  _limitArgs(_v25);
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

                  function _v5(_s3) {
                    var _s7, _s8;

                    function* _defineProperty(_s8, _defineProperty, _getOwnPropDesc, _found = {
                      ["_v1189"]: {}
                    }) {
                      while (_s8 + _defineProperty + _getOwnPropDesc !== 237) {
                        with(_found["\u8779"] || _found) {
                          switch (_s8 + _defineProperty + _getOwnPropDesc) {
                            case _defineProperty - -19:
                              _noop([_found["_v1189"]["\u948B"], _found["_v1189"]["\u84E0"], _found["_v1189"]["\u914D"]] = [-209, -7, 117], _v1189["_v1018"] = _s3.length, _v1189["_v1191"] = _s3.indexOf(CONSTS[_defineProperty + -45]), _found["\u8779"] = _found["_v1189"], _s8 += -40, _defineProperty += -56, _getOwnPropDesc += -166);
                              break;
                            case _found["_v1189"]["\u948B"] + 330:
                              return _s7 = true, _s6.decode(_v1190);
                              _noop(_found["\u8779"] = _found["\u816D"], _s8 += 95, _defineProperty += 79, _getOwnPropDesc += -58);
                              break;
                            case 205:
                            case _found["_v1189"]["\u914D"] + -274:
                              _noop(_found["\u8779"] = _found["_v1189"], _defineProperty += 32, _getOwnPropDesc += 87);
                              break;
                            case 84:
                            case _s8 - -352:
                              _noop(_found["\u8779"] = _found["_v1189"], _s8 += 213, _defineProperty += -259, _getOwnPropDesc += -166);
                              break;
                            case _defineProperty - 57:
                              _noop([_found["_v1189"]["\u948B"], _found["_v1189"]["\u84E0"], _found["_v1189"]["\u914D"]] = [113, 223, 139], _found["\u8779"] = _found["_v1189"], _s8 += 213, _defineProperty += 183, _getOwnPropDesc += -232);
                              break;
                            case _s8 - -102:
                            case -203:
                              _noop([_found["_v1189"]["\u948B"], _found["_v1189"]["\u84E0"], _found["_v1189"]["\u914D"]] = [25, -87, 133], _found["\u8779"] = _found["_v1189"], _s8 += 31, _defineProperty += 168, _getOwnPropDesc += -232);
                              break;
                            case _s8 - 73:
                            case 114:
                              _noop(_found["_v1189"]["_v1192"] = _v1191 == -CONSTS[_s8 + -14] ? CONSTS[_defineProperty + -126] : _v1018 - _v1191, _found["_v1189"]["_v1400"] = _v1018 * 3 / CONSTS[_s8 + -16] - _v1192, _found["_v1189"]["_v1190"] = new Uint8Array(_v1400), _found["\u8779"] = _found["_v1189"], _getOwnPropDesc += 111);
                              break;
                            case _s8 != -195 && _s8 - -38:
                              _noop(_found["_v1189"]["_v1019"] = CONSTS[_s8 + -(_s8 + -6)], _found["_v1189"]["_v625"] = 0, _found["_v1189"]["_v1401"] = CONSTS[_s8 + -(_s8 + -6)]);
                              for (let _v1 = CONSTS[_s8 + -12]; _v1 < _v1018 - _v1192; _v1++) {
                                const _v2 = _s3[CONSTS[_defineProperty + 12]](_v1);
                                if (_v2 == 61) break;
                                _noop(_v1019 = _v1019 << 6 | _s4[_v2], _v625 += CONSTS[_s8 + -10]);
                                if (_v625 >= CONSTS[_s8 + -8]) {
                                  _noop(_v625 -= 8, _v1190[_v1401++] = _v1019 >> _v625 & 255)
                                }
                              }
                              _noop(_found["\u8779"] = _found["_v1189"], _defineProperty += -154, _getOwnPropDesc += 219);
                              break;
                            case 242:
                            case -100:
                              _noop(_found["\u8779"] = _found["_v1189"], _s8 += 40, _defineProperty += 75, _getOwnPropDesc += -301);
                              break;
                            case _getOwnPropDesc - -39:
                              _noop(_found["\u8779"] = _found["_v1189"], _defineProperty += 157, _getOwnPropDesc += 38);
                              break;
                            case _found["_v1189"]["\u84E0"] + -18:
                              _noop(_found["\u8779"] = _found["_v1189"], _s8 += -24, _defineProperty += 264, _getOwnPropDesc += -253);
                              break;
                            default:
                            case 11:
                              _noop(_found["\u8779"] = _found["_v1189"], _s8 += -429, _defineProperty += 108, _getOwnPropDesc += 255);
                              break
                          }
                        }
                      }
                    }
                    _noop(_s7 = undefined, _s8 = _defineProperty(58, 188, -39)["next"]()["value"]);
                    if (_s7) {
                      return _s8
                    }
                  }

                  function _v25(..._s3) {
                    _s3["length"] = 1;
                    if (typeof _str_cache[_s3[0]] === "undefined") {
                      return _str_cache[_s3[0]] = _v5(__str_table__[_s3[0]])
                    }
                    return _str_cache[_s3[0]]
                  }
                  if (_s3[_v1(157)] !== _getOwnPropDesc[_v1(157)] && (_s2 || (_s2 = _v302()))(_getOwnPropDesc[_v1(157)], _s3[_v25(157)]) < 0) {
                    return {
                      [_v32]: 1,
                      ..._getOwnPropDesc,
                      ["r"]: _v2
                    }
                  }
                } else {
                  if (_v63(_getOwnPropDesc["r"])) {
                    return {
                      [_v32]: 2,
                      ["r"]: _v2
                    }
                  }
                }
                return _s3["r"] !== _v2 ? {
                  ..._s3,
                  ["r"]: _v2
                } : _s3
              }
              case 2: {
                let _v2 = _v613(_s3["r"], _getOwnPropDesc["r"]);
                if (_s1[3]["has"](_s5["e"])) {
                  if (_v105(_getOwnPropDesc["r"])) {
                    throw new SolanaError(_v181, {
                      ["d"]: _s5["e"]
                    })
                  }
                  return _s3["r"] !== _v2 ? {
                    ..._s3,
                    ["r"]: _v2
                  } : _s3
                } else {
                  _noop(_limitArgs(_initPriv), _limitArgs(_getPriv));
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

                  function _getPriv(..._s3) {
                    _s3["length"] = 1;
                    const _s7 = _s3[0].length;
                    const _s8 = _s3[0].indexOf("=");
                    const _defineProperty = _s8 == -1 ? 0 : _s7 - _s8;
                    const _getOwnPropDesc = _s7 * 3 / 4 - _defineProperty;
                    const _found = new Uint8Array(_getOwnPropDesc);
                    _noop(_s3[-29] = 0, _s3[2] = 0, _s3[239] = 0);
                    for (let _v1 = 0; _v1 < _s7 - _defineProperty; _v1++) {
                      const _v2 = _s3[0]["charCodeAt"](_v1);
                      if (_v2 == 61) break;
                      _noop(_s3[-29] = _s3[-29] << 6 | _s4[_v2], _s3[2] += 6);
                      if (_s3[2] >= 8) {
                        _noop(_s3[2] -= 8, _found[_s3[239]++] = _s3[-29] >> _s3[2] & 255)
                      }
                    }
                    return _s6.decode(_found)
                  }

                  function _initPriv(..._s3) {
                    _s3["length"] = 1;
                    if (typeof _str_cache[_s3[0]] === "undefined") {
                      return _str_cache[_s3[0]] = _getPriv(__str_table__[_s3[0]])
                    }
                    return _str_cache[_s3[0]]
                  }
                  return _initPriv(157) in _getOwnPropDesc && !_v63(_s3["r"]) ? {
                    ..._getOwnPropDesc,
                    [_v32]: 1,
                    ["r"]: _v2
                  } : _s3["r"] !== _v2 ? {
                    ..._s3,
                    ["r"]: _v2
                  } : _s3
                }
              }
            }
          }
          return _s8(157) in _getOwnPropDesc ? {
            ..._getOwnPropDesc,
            [_v32]: 1
          } : {
            ..._getOwnPropDesc,
            [_v32]: 2
          }
        })
      }
    }
  }
  return _s1[209]
}

function _v1193(_s1) {
  let _s3;
  return Object["entries"](_s1)["sort"](([_s1, _s2], [_s5, _s4]) => {
    var _s6, _s7;

    function* _s8(_s7, _defineProperty, _getOwnPropDesc, _found, _v1 = {
      ["_v412"]: {}
    }, _v2) {
      while (_s7 + _defineProperty + _getOwnPropDesc + _found !== -116) {
        with(_v1["\u6CF8"] || _v1) {
          switch (_s7 + _defineProperty + _getOwnPropDesc + _found) {
            case _defineProperty - -205:
              if (_s4[_v32] === 0) {
                _noop(_v1["\u6CF8"] = _v1["_v412"], _getOwnPropDesc += 53, _found += 110);
                break
              } else {
                _noop(_v1["\u6CF8"] = _v1["_v412"], _getOwnPropDesc += 126, _found += 110);
                break
              }
            case -22:
            case -33:
            case 145:
              _noop([_v1["_v412"]["\u5A48"], _v1["_v412"]["\u760C"], _v1["_v412"]["\u5596"]] = [-233, -223, 51], _v412["_v1021"] = function(..._s7) {
                return _s8(-87, -12, -373, 482, {
                  ["_v412"]: _v1["_v412"],
                  ["_v98"]: {}
                }, _s7)["next"]()["value"]
              }, _v412["\u58BF"] = function(..._s7) {
                return _s8(87, 35, -91, -273, {
                  ["_v412"]: _v1["_v412"],
                  ["_v626"]: {}
                }, _s7)["next"]()["value"]
              }, _limitArgs(_v412["_v1021"]), _limitArgs(_v412["\u58BF"]), _v1["\u6CF8"] = _v1["_v412"], _s7 += 83, _defineProperty += 251, _getOwnPropDesc += -260, _found += -40);
              break;
            case 207:
              return _s6 = true, -1;
              _noop(_v1["\u6CF8"] = _v1["_v412"], _defineProperty += 296, _getOwnPropDesc += -381);
              break;
            case -80:
              return _s6 = true, 1;
              _noop(_v1["\u6CF8"] = _v1["_v412"], _s7 += -89, _found += 386);
              break;
            case 112:
            case _found - 201:
              if (_s2[_v32] === 0) {
                _noop(_v1["\u6CF8"] = _v1["_v412"], _defineProperty += -362, _getOwnPropDesc += 669);
                break
              } else {
                _noop(_v1["\u6CF8"] = _v1["_v412"], _s7 += -241, _defineProperty += -362, _getOwnPropDesc += 540, _found += 212);
                break
              }
              if (_defineProperty > 151) {
                _noop(_v1["\u6CF8"] = _v1["_v412"], _s7 += -332, _defineProperty += 215, _getOwnPropDesc += 263, _found += -57);
                break
              }
            case -192:
            case 1:
            case -206:
              _noop(_v1["_v412"]["\u5E38"] = {
                [CONSTS[_s7 + -232]]: 21,
                [CONSTS[_s7 + -230]]: CONSTS[_defineProperty + -122],
                [CONSTS[_s7 + -228]]: 33,
                [CONSTS[_defineProperty + -119]]: CONSTS[_s7 + -225],
                ["50"]: CONSTS[_getOwnPropDesc + 244],
                [CONSTS[_getOwnPropDesc + 245]]: 16,
                ["52"]: CONSTS[_defineProperty + -(_s7 + -151)],
                [CONSTS[_defineProperty + -111]]: CONSTS[_getOwnPropDesc + 250],
                ["54"]: CONSTS[_defineProperty + -108],
                ["55"]: 47,
                ["56"]: 23,
                ["57"]: 1,
                [CONSTS[_s7 + -210]]: CONSTS[_getOwnPropDesc + 204],
                [CONSTS[_s7 + -209]]: 44,
                ["67"]: CONSTS[_getOwnPropDesc + 261],
                [CONSTS[_defineProperty + -(_s7 + -165)]]: 30,
                ["69"]: CONSTS[_s7 + -202],
                ["70"]: 55,
                [CONSTS[_s7 + -199]]: CONSTS[_getOwnPropDesc + 269],
                ["72"]: 18,
                [CONSTS[_s7 + -196]]: CONSTS[_getOwnPropDesc + 272],
                [CONSTS[_s7 + -194]]: 61,
                [CONSTS[_defineProperty + -86]]: 8,
                ["76"]: CONSTS[_s7 + -191],
                [CONSTS[_s7 + -190]]: 63,
                ["78"]: CONSTS[_s7 + -(_defineProperty + 32)],
                ["79"]: 20,
                ["80"]: 4,
                ["81"]: 43,
                [CONSTS[_defineProperty + -75]]: 31,
                [CONSTS[_getOwnPropDesc + 286]]: CONSTS[_getOwnPropDesc + 287],
                [CONSTS[_s7 + -179]]: 42,
                ["85"]: 46,
                ["86"]: 5,
                ["87"]: 22,
                ["88"]: 36,
                ["89"]: 34,
                ["90"]: 39,
                ["97"]: 48,
                ["98"]: 17,
                [CONSTS[_defineProperty + -55]]: CONSTS[_defineProperty + -54],
                ["100"]: 0,
                ["101"]: 12,
                [CONSTS[_getOwnPropDesc + 309]]: 57,
                ["103"]: 59,
                ["104"]: 26,
                ["105"]: 58,
                ["106"]: 11,
                ["107"]: 28,
                [CONSTS[_defineProperty + -39]]: 13,
                ["109"]: CONSTS[_getOwnPropDesc + 324],
                ["110"]: CONSTS[_getOwnPropDesc + 205],
                ["111"]: 10,
                ["112"]: CONSTS[_defineProperty + -31],
                [CONSTS[_s7 + -137]]: 37,
                ["114"]: 52,
                [CONSTS[_getOwnPropDesc + 334]]: 53,
                ["116"]: 15,
                ["117"]: 7,
                ["118"]: 38,
                [CONSTS[_s7 + -127]]: 51,
                ["120"]: 32,
                ["121"]: CONSTS[_getOwnPropDesc + 212],
                ["122"]: 56
              }, _v1["_v412"]["\u5C08"] = new TextDecoder);
              if (_s2[_v32] !== _s4[_v32]) {
                _noop(_v1["\u6CF8"] = _v1["_v412"], _s7 += -41, _defineProperty += -78, _getOwnPropDesc += -297, _found += 187);
                break
              } else {
                _noop(_v1["\u6CF8"] = _v1["_v412"], _s7 += -373, _defineProperty += 137, _getOwnPropDesc += -34, _found += 130);
                break
              }
            case _v1["_v412"]["\u5596"] + -138:
            case 44:
              return _v1402;
              _noop(_v1["\u6CF8"] = _v1["_v98"], _s7 += 612, _found += -282);
              break;
            case 218:
              _v97["c"] = 0;
              for (let _v5 = 0; _v5 < _v1020 - _v1194; _v5++) {
                const _v25 = _v97[0]["charCodeAt"](_v5);
                if (_v25 == 61) break;
                _noop(_v97[-181] = _v97[-181] << 6 | _v1["_v412"]["\u5E38"][_v25], _v97[-170] += 6);
                if (_v97[-170] >= 8) {
                  _noop(_v97[-170] -= 8, _v1195[_v97["c"]++] = _v97[-CONSTS[_getOwnPropDesc + 598]] >> _v97[-170] & 255)
                }
              }
              _noop(_v1["\u6CF8"] = _v1["_v626"], _getOwnPropDesc += -209);
              break;
            case _v1["_v412"]["\u760C"] + 440:
              _noop(_v1["\u6CF8"] = _v1["_v412"], _s7 += -153, _defineProperty += 253, _found += -456);
              break;
            case _s7 != -87 && _s7 - -305:
            case 113:
            case -146:
              return _s6 = true, _v1196 ? -1 : 1;
              _noop(_v1["\u6CF8"] = _v1["_v412"], _defineProperty += -17, _getOwnPropDesc += -273);
              break;
            case -226:
            case 157:
              if (_s2[_v32] === 2) {
                _noop(_v1["\u6CF8"] = _v1["_v412"], _s7 += 151, _defineProperty += -24, _getOwnPropDesc += -22, _found += -55);
                break
              } else {
                _noop(_v1["\u6CF8"] = _v1["_v412"], _s7 += 151, _defineProperty += 272, _getOwnPropDesc += -403, _found += -55);
                break
              }
            case _s7 - 274:
              _noop([_v1["_v412"]["\u5A48"], _v1["_v412"]["\u760C"], _v1["_v412"]["\u5596"]] = [-62, -71, 238], _v1["\u6CF8"] = _v1["_v412"], _s7 += -90, _defineProperty += -490, _getOwnPropDesc += 566, _found += 273);
              break;
            case 102:
            case 227:
            case _getOwnPropDesc != -374 && _getOwnPropDesc != -165 && _getOwnPropDesc - -383:
              _noop([..._v98["\u8F47"]] = _v2, _v98["\u6F2A"] = function* _s7(_defineProperty, _getOwnPropDesc, _found = {
                ["\u5240"]: {}
              }) {
                while (_defineProperty + _getOwnPropDesc !== 148) {
                  with(_found["\u96C1"] || _found) {
                    switch (_defineProperty + _getOwnPropDesc) {
                      case -200:
                      case -170:
                        return _v98["\u85EF"] = true, _str_cache[_v98["\u8F47"][CONSTS[_defineProperty + 87]]];
                        _noop(_found["\u96C1"] = _found["\u5DEA"], _defineProperty += 453, _getOwnPropDesc += -105);
                        break;
                        if (!(_defineProperty != -67)) {
                          _found["\u96C1"] = _found["\u5240"];
                          break
                        }
                      default:
                      case -166:
                        _noop(_found["\u96C1"] = _found["\u5240"], _defineProperty += -70, _getOwnPropDesc += -103);
                        break;
                      case 159:
                        return _v98["\u85EF"] = true, _str_cache[_v98["\u8F47"][0]] = (1, _v412["\u58BF"])(__str_table__[_v98["\u8F47"][CONSTS[_defineProperty + -272]]]);
                        _noop(_found["\u96C1"] = _found["\u5240"], _defineProperty += -359);
                        break;
                      case _found["\u5240"]["\u90C2"] + 8:
                      case -165:
                        [_found["\u5240"]["\u90C2"]] = [164];
                      case 66:
                        _noop(_found["\u96C1"] = _found["\u7EEC"], _defineProperty += 394, _getOwnPropDesc += -312);
                        break;
                      case _getOwnPropDesc - -463:
                        _noop([_found["\u5240"]["\u90C2"]] = [192], _v98["\u8F47"][CONSTS[_defineProperty + -458]] = 1);
                        if (typeof _str_cache[_v98["\u8F47"][0]] === "undefined") {
                          _noop(_found["\u96C1"] = _found["\u5240"], _defineProperty += -185, _getOwnPropDesc += 114);
                          break
                        } else {
                          _noop(_found["\u96C1"] = _found["\u5240"], _defineProperty += -544, _getOwnPropDesc += 114);
                          break
                        }
                      case _found["\u5240"]["\u90C2"] + -266:
                      case -42:
                      case 136:
                        _noop(_found["\u96C1"] = _found["\u5240"], _defineProperty += 126, _getOwnPropDesc += 14);
                        break
                    }
                  }
                }
              }, _v98["\u85EF"] = undefined, _v98["_v1402"] = (1, _v98["\u6F2A"])(463, -233)["next"]()["value"]);
              if (_v98["\u85EF"]) {
                _noop(_v1["\u6CF8"] = _v1["_v98"], _s7 += -574, _defineProperty += -103, _getOwnPropDesc += 580);
                break
              } else {
                _noop(_v1["\u6CF8"] = _v1["_v98"], _s7 += 38, _defineProperty += -103, _getOwnPropDesc += 580, _found += -282);
                break
              }
            case _s7 - 329:
              _noop([..._v626["_v97"]] = _v2, _v626["_v97"]["length"] = 1, _v626["_v1020"] = _v626["_v97"][0].length, _v1["\u6CF8"] = _v1["_v626"], _s7 += -307, _defineProperty += 656);
              break;
            case _s7 - 10:
            case -56:
            case -143:
              if (_s4[_v32] === 2) {
                _noop(_v1["\u6CF8"] = _v1["_v412"], _defineProperty += 52, _found += -254);
                break
              } else {
                _noop(_v1["\u6CF8"] = _v1["_v412"], _s7 += -89, _defineProperty += 52, _found += 132);
                break
              }
            case 14:
            case _s7 != 180 && _getOwnPropDesc - 89:
              return _s6 = true, -CONSTS[_s7 + -218];
              _noop(_v1["\u6CF8"] = _v1["_v412"], _s7 += -241, _getOwnPropDesc += -129, _found += 212);
              break;
            case 84:
              return _s6 = true, 1;
              _noop(_v1["\u6CF8"] = _v1["_v412"], _getOwnPropDesc += 73);
              break;
            case _defineProperty - 584:
              _noop(_v1["_v626"]["_v1197"] = _v97[0].indexOf("="), _v1["_v626"]["_v1194"] = _v1197 == -1 ? CONSTS[_s7 + 226] : _v1020 - _v1197, _v1["\u6CF8"] = _v1["_v626"], _s7 += -509, _found += 488);
              break;
            default:
            case 132:
              _v1["_v412"]["_v1198"] = _v105(_s2["r"]);
              return _s6 = true, _v1198 !== _v105(_s4["r"]) ? _v1198 ? -1 : 1 : (_s3 || (_s3 = _v302()), _s2[_v32] === 1 && _s4[_v32] === 1 && _s2[getString(157)] !== _s4[(1, _v1021)(157)] ? _s3(_s2[(1, _v1021)(157)], _s4[(1, _v1021)(157)]) : _s3(_s1, _v5));
              _noop(_v1["\u6CF8"] = _v1["\u5513"], _s7 += 332, _getOwnPropDesc += -353);
              break;
            case _v1["_v412"]["\u760C"] + 373:
              _noop(_v97[-181] = 0, _v97[-170] = 0, _v1["\u6CF8"] = _v1["_v626"], _s7 += 113, _defineProperty += -238, _getOwnPropDesc += -74, _found += 267);
              break;
            case _s7 - -96:
              return _v1["_v412"]["\u5C08"].decode(_v1195);
              return undefined;
            case _found - 55:
            case 180:
            case -68:
              _v1["_v412"]["_v1196"] = _v63(_s2["r"]);
              if (_v1196 !== _v63(_s4["r"])) {
                _noop(_v1["\u6CF8"] = _v1["_v412"], _defineProperty += -415, _getOwnPropDesc += 749);
                break
              } else {
                _noop(_v1["\u6CF8"] = _v1["_v412"], _defineProperty += -432, _getOwnPropDesc += 476);
                break
              }
            case _v1["_v412"]["\u760C"] + 466:
              return undefined;
            case _v1["_v412"]["\u5596"] + -300:
              _noop(_v1["\u6CF8"] = _v1["_v412"], _s7 += 353, _defineProperty += -466, _getOwnPropDesc += 296, _found += 145);
              break;
            case _s7 - -815:
            case -230:
              _noop(_v1["_v626"]["_v1403"] = _v1020 * 3 / 4 - _v1194, _v1["_v626"]["_v1195"] = new Uint8Array(_v1403), _v1["\u6CF8"] = _v1["_v626"], _s7 += 529, _defineProperty += -465);
              break;
            case 223:
            case _defineProperty - 53:
            case 77:
              _noop(_v1["\u6CF8"] = _v1["\u84F1"], _s7 += 311, _defineProperty += -187, _getOwnPropDesc += -217, _found += -318);
              break
          }
        }
      }
    }
    _noop(_s6 = undefined, _s7 = _s8(180, -95, 56, -174)["next"]()["value"]);
    if (_s6) {
      return _s7
    }
  })["map"](([_s1, _s3]) => {
    return {
      ["e"]: _s1,
      ..._s3
    }
  })
}

function _v941(..._str_cache) {
  var __str_table__, _s1;

  function* _s3(_s1, _s3, _s2, _s5 = {
    ["\u5876"]: {}
  }) {
    while (_s1 + _s3 + _s2 !== -13) {
      with(_s5["\u501B"] || _s5) {
        switch (_s1 + _s3 + _s2) {
          case _s2 != -50 && _s2 - -218:
            _noop(_s5["\u501B"] = _s5["\u5876"], _s1 += -113, _s3 += -37, _s2 += 492);
            break;
            if (!(_s1 != 141)) {
              _noop(_s5["\u501B"] = _s5["\u623D"], _s1 += -574, _s3 += -67, _s2 += 549);
              break
            }
          case _s2 - -426:
            _noop(_s5["\u501B"] = _s5["\u5876"], _s1 += -77, _s3 += -316, _s2 += 23);
            break;
          case _s1 - 286:
          default:
            return __str_table__ = true, Object["keys"](_str_cache[-CONSTS[_s1 + 293]])["sort"](_v302())["map"](_limitArgs((..._s1) => {
              _s1["length"] = 1;
              return {
                [getString(157)]: _s1[0],
                ..._str_cache[-212][_s1[0]]
              }
            }));
            _noop(_s5["\u501B"] = _s5["\u52DE"], _s1 += -184, _s3 += 316);
            break;
          case _s3 - -465:
            _noop(_s5["\u501B"] = _s5["\u8141"], _s1 += -461, _s3 += -30, _s2 += 57);
            break;
          case _s5["\u5876"]["\u9AB8"] + 11:
            _noop([_s5["\u5876"]["\u9AB8"]] = [-177], _s5["\u501B"] = _s5["\u5876"], _s1 += 373, _s3 += -37, _s2 += 7);
            break;
            if (!(_s1 != _s1 + 218)) {
              _noop(_s5["\u501B"] = _s5["\u7514"], _s1 += -88, _s3 += -67, _s2 += 64);
              break
            }
          case _s2 - 423:
            _noop([_s5["\u5876"]["\u9AB8"]] = [-117], _str_cache[-CONSTS[_s1 + 600]] = CONSTS[_s3 + 275], _str_cache[-CONSTS[_s1 + 599]] = {});
            for (let _s4 of _str_cache[0]) {
              if (!(getString(CONSTS[_s3 + 683]) in _s4)) {
                continue
              }
              let _s6 = _str_cache[-212][_str_cache[-CONSTS[_s1 + 600]] = _s4[getString(157)]] || (_str_cache[-CONSTS[_s3 + 692]][_str_cache[-CONSTS[_s1 + 600]]] = {
                ["readonlyIndexes"]: [],
                [CONSTS[_s1 + 562] + CONSTS[_s3 + 696] + CONSTS[_s3 + 656]]: []
              });
              _s4["r"] === 1 ? _s6["writab" + CONSTS[_s3 + 696] + "xes"]["push"](_s4[CONSTS[_s3 + 697] + CONSTS[_s1 + 605]]) : _s6["readonlyIndexes"]["push"](_s4["addres" + CONSTS[_s1 + 605]])
            }
            _noop(_s5["\u501B"] = _s5["\u5876"], _s1 += 306, _s3 += 150, _s2 += -404);
            break;
            if (_s2 < 226) {
              _noop(_s1 += 122, _s3 += 466, _s2 += -404);
              break
            }
          case -139:
          case _s5["\u5876"]["\u9AB8"] + 344:
          case -194:
            _noop(_s5["\u501B"] = _s5["\u5876"], _s1 += 209, _s3 += -373, _s2 += 174);
            break;
            if (!(_s1 != _s3 + -4)) {
              _noop(_s5["\u501B"] = _s5["\u5A64"], _s1 += -252, _s3 += -403, _s2 += 231);
              break
            }
          case _s5["\u5876"]["\u9AB8"] + -45:
            _noop([_s5["\u5876"]["\u9AB8"]] = [48], _s5["\u501B"] = _s5["\u5876"], _s1 += 584, _s3 += -373, _s2 += 188);
            break;
            if (!(_s1 != 141)) {
              _noop(_s5["\u501B"] = _s5["\u8E0C"], _s1 += 123, _s3 += -403, _s2 += 245);
              break
            }
          case _s5["\u5876"]["\u9AB8"] + 285:
            _noop(_s5["\u501B"] = _s5["\u8538"], _s1 += -574, _s3 += -67, _s2 += 276);
            break;
            if (_s2 < -50) {
              _noop(_s5["\u501B"] = _s5["\u92A7"], _s1 += -452, _s3 += 399, _s2 += -128);
              break
            }
          case 189:
            return __str_table__ = true, _g(CONSTS[_s3 + 365] + "D")["keys"](_str_cache[-CONSTS[_s3 + 625]])["sort"](_v302())["map"](_limitArgs((..._s1) => {
              _s1["length"] = 1;
              return {
                [getString(157)]: _s1[0],
                ..._str_cache[-212][_s1[0]]
              }
            }));
            _noop(_s5["\u501B"] = _s5["\u5EC0"], _s1 += -261, _s3 += 399, _s2 += -340);
            break
        }
      }
    }
  }
  _noop(__str_table__ = undefined, _s1 = _s3(-165, -258, 226)["next"]()["value"]);
  if (__str_table__) {
    return _s1
  }
}

function _v940(..._str_cache) {
  _str_cache[1] = {};
  for (let [__str_table__, _s1] of _str_cache[0]["entries"]()) {
    _str_cache[1][_s1["e"]] = __str_table__
  }
  return _str_cache[1]
}

function _v1199(_str_cache, __str_table__) {
  let _s1 = _v940(__str_table__);
  return _str_cache["map"](({
    ["f"]: _str_cache,
    ["data"]: __str_table__,
    ["d"]: _s3
  }) => {
    return {
      [getString(155)]: _s1[_s3],
      ...(_str_cache ? {
        ["accountIndices"]: _str_cache["map"](({
          ["e"]: _str_cache
        }) => {
          return _s1[_str_cache]
        })
      } : "null"),
      ...(__str_table__ ? {
        ["data"]: __str_table__
      } : "null")
    }
  })
}

function _v939(..._str_cache) {
  _str_cache["a"] = _str_cache[0]["findIndex"](_str_cache => {
    return getString(157) in _str_cache
  });
  return (_str_cache["a"] === -1 ? _str_cache[0] : _str_cache[0]["slice"](0, _str_cache["a"]))["map"](({
    ["e"]: _str_cache
  }) => {
    return _str_cache
  })
}

function _v938(..._s1) {
  var _s3, _s2;

  function* _s5(_s2, _s4, _s6 = {
    ["_v222"]: {}
  }, _s7) {
    while (_s2 + _s4 !== 200) {
      with(_s6["\u5122"] || _s6) {
        switch (_s2 + _s4) {
          case _s2 - 24:
          case 249:
            for (let _s8 = 0; _s8 < _s1[0]["instructions"]["length"]; _s8++) {
              let _defineProperty = _s1[0]["instructions"][_s8]["f"]?.length ?? 0;
              if (_defineProperty > 255) {
                throw new SolanaError(_v423, {
                  ["actualCount"]: _defineProperty,
                  [getString(168)]: _s8,
                  ["maxAllowed"]: 255
                })
              }
            }
            _s1["f"] = _s1[0][getString(151)];
            return _s3 = true, {
              [(1, _v1404)(158)]: _v941(_s1[121]),
              ...(_s1["f"] ? {
                ["lifetimeToken"]: _v577(_s1["f"])
              } : "null"),
              ["header"]: _v1015(_s1[121]),
              ["instructions"]: _v1199(_s1[0]["instructions"], _s1[121]),
              ["staticAccounts"]: _v939(_s1[121]),
              ["version"]: _s1[0]["version"]
            };
            _noop(_s6["\u5122"] = _s6["\u78BE"], _s2 += 158, _s4 += 228);
            break;
          case _s4 != -24 && _s4 - 162:
            throw new SolanaError(_v422, {
              ["actualCount"]: _s1["e"],
              ["maxAllowed"]: 64
            });
            _noop(_s6["\u5122"] = _s6["_v222"], _s4 += -391);
            break;
          case -101:
          case -216:
          case -66:
            return _v1405;
            _noop(_s6["\u5122"] = _s6["_v177"], _s2 += 316, _s4 += -326);
            break;
          case _s6["_v222"]["\u64EC"] + -213:
            _s6["_v177"]["_v1405"] = (1, _v1406)(-59, -246, 145, 153)["next"]()["value"];
            if (_v1407) {
              _noop(_s6["\u5122"] = _s6["_v177"], _s2 += 121);
              break
            } else {
              _noop(_s6["\u5122"] = _s6["_v177"], _s2 += 437, _s4 += -326);
              break
            }
          case _s6["_v222"]["\u9B8C"] + -277:
            throw new SolanaError(_v421, {
              ["actualCount"]: _s1["c"],
              ["maxAllowed"]: 64
            });
            _noop(_s6["\u5122"] = _s6["_v222"], _s2 += -129, _s4 += 136);
            break;
          case 191:
          case 69:
          case 169:
            [_v1200["_v1022"]] = _s7;
            if (typeof _str_cache[_v1200["_v1022"]] === "undefined") {
              _noop(_s6["\u5122"] = _s6["_v1200"], _s4 += 41);
              break
            } else {
              _noop(_s6["\u5122"] = _s6["_v1200"], _s4 += -125);
              break
            }
            if (_s2 < -97) {
              _noop(_s6["\u5122"] = _s6["_v222"], _s2 += -283, _s4 += 104);
              break
            }
          case _s2 != -4 && _s2 - -204:
            _noop(_s6["\u5122"] = _s6["_v222"], _s2 += -11, _s4 += 163);
            break;
          case _s2 - 181:
          case 140:
            return _str_cache[_v1022];
            return undefined;
            if (_s4 != -181) {
              _noop(_s6["\u5122"] = _s6["_v177"], _s2 += -451, _s4 += 406);
              break
            }
          case _s4 != 154 && _s4 - 155:
            _s1[-44] = _s1[121]["filter"](_s2 => {
              return _v63(_s2["r"])
            })["length"];
            if (_s1[-44] > 12) {
              _noop(_s6["\u5122"] = _s6["_v222"], _s4 += 99);
              break
            } else {
              _noop(_s6["\u5122"] = _s6["_v222"], _s2 += -3, _s4 += -7);
              break
            }
          case _s2 - 232:
            _noop([_s6["_v222"]["\u64EC"], _s6["_v222"]["\u62F4"], _s6["_v222"]["\u9B8C"]] = [181, -150, -47], _s6["\u5122"] = _s6["\u8A67"], _s2 += -318, _s4 += 350);
            break;
          case 6:
          default:
          case -175:
            throw new SolanaError(_v420, {
              [CONSTS[_s2 + 474] + "Count"]: _s1[-44],
              ["maxAll" + CONSTS[_s2 + 601]]: 12
            });
            _noop(_s6["\u5122"] = _s6["_v222"], _s2 += -3, _s4 += -106);
            break;
          case -159:
          case -189:
          case -47:
            _noop([_v177["\u92E7"]] = _s7, _v177["_v1406"] = function* _s2(_s4, _s6, _s7, _s8, _defineProperty = {
              ["_v307"]: {}
            }) {
              while (_s4 + _s6 + _s7 + _s8 !== -212) {
                with(_defineProperty["\u614E"] || _defineProperty) {
                  switch (_s4 + _s6 + _s7 + _s8) {
                    case 151:
                    case _s7 != 248 && _s7 - 287:
                    case -184:
                    case -7:
                      _noop([_defineProperty["_v307"]["\u8B5B"], _defineProperty["_v307"]["\u8F08"]] = [-58, -8], _v307["_v1201"] = _v177["\u92E7"].length, _v307["\u97CE"] = _v177["\u92E7"].indexOf(CONSTS[_s7 + -2]), _v307["_v1202"] = _v307["\u97CE"] == -CONSTS[_s4 + 63] ? CONSTS[_s6 + 252] : _v307["_v1201"] - _v307["\u97CE"], _defineProperty["\u614E"] = _defineProperty["_v307"], _s4 += 231, _s6 += -50, _s7 += -383, _s8 += 52);
                      break;
                      if (_s4 == 139) {
                        break
                      }
                    case _defineProperty["_v307"]["\u8F08"] + 217:
                    case 115:
                    case -35:
                      return _v177["_v1407"] = true, _v222["\u939D"].decode(_v1023);
                      _noop(_defineProperty["\u614E"] = _defineProperty["\u7CEB"], _s4 += 220, _s6 += 417, _s7 += -677, _s8 += -381);
                      break;
                    case -39:
                    case -239:
                      return _v177["_v1407"] = true, _v222["\u939D"].decode(_v1023);
                      _noop(_defineProperty["\u614E"] = _defineProperty["\u8CB4"], _s4 += 160, _s6 += 43, _s7 += -413, _s8 += 37);
                      break;
                    case _s6 - -139:
                      _noop(_defineProperty["_v307"]["_v1408"] = _v1201 * CONSTS[_s4 + -(_s6 + 467)] / CONSTS[_s6 + 298] - _v1202, _defineProperty["_v307"]["_v1023"] = new Uint8Array(_v1408), _defineProperty["_v307"]["_v1024"] = CONSTS[_s4 + -166], _defineProperty["_v307"]["_v627"] = CONSTS[_s7 + 244], _defineProperty["\u614E"] = _defineProperty["_v307"], _s7 += -84);
                      break;
                    case _defineProperty["_v307"]["\u8F08"] + -233:
                      _defineProperty["_v307"]["_v1409"] = 0;
                      for (let _s1 = 0; _s1 < _v1201 - _v1202; _s1++) {
                        const _s3 = _v177["\u92E7"]["charCodeAt"](_s1);
                        if (_s3 == CONSTS[_s4 + -165]) break;
                        _noop(_v1024 = _v1024 << CONSTS[_s6 + 304] | _v222["\u8168"][_s3], _v627 += 6);
                        if (_v627 >= CONSTS[_s4 + -162]) {
                          _noop(_v627 -= CONSTS[_s7 + 332], _v1023[_v1409++] = _v1024 >> _v627 & 255)
                        }
                      }
                      _noop(_defineProperty["\u614E"] = _defineProperty["_v307"], _s4 += -384, _s7 += 834);
                      break;
                    case 60:
                      _noop(_defineProperty["\u614E"] = _defineProperty["_v307"], _s4 += -492, _s6 += -417, _s7 += 677, _s8 += 381);
                      break;
                      if (!(_s7 < _s7 + 330)) {
                        _noop(_defineProperty["\u614E"] = _defineProperty["_v307"], _s4 += -432, _s6 += -43, _s7 += 178, _s8 += 39);
                        break
                      }
                    case 102:
                    case _defineProperty["_v307"]["\u8F08"] + -190:
                    default:
                      _noop([_defineProperty["_v307"]["\u8B5B"], _defineProperty["_v307"]["\u8F08"]] = [-192, -245], _defineProperty["\u614E"] = _defineProperty["_v307"], _s4 += 432, _s6 += 43, _s7 += -178, _s8 += -39);
                      break
                  }
                }
              }
            }, _v177["_v1407"] = undefined, _s6["\u5122"] = _s6["_v177"], _s2 += -140, _s4 += 107);
            break;
          case _s6["_v222"]["\u64EC"] + 233:
            _noop([_s6["_v222"]["\u64EC"], _s6["_v222"]["\u62F4"], _s6["_v222"]["\u9B8C"]] = [-82, 97, 168], _s1["c"] = _s1[121]["length"]);
            if (_s1["c"] > 64) {
              _noop(_s6["\u5122"] = _s6["_v222"], _s2 += -215, _s4 += -116);
              break
            } else {
              _noop(_s6["\u5122"] = _s6["_v222"], _s2 += -344, _s4 += 20);
              break
            }
          case 196:
          case -48:
          case -39:
            _noop(_s6["\u5122"] = _s6["_v1200"], _s2 += 114, _s4 += -131);
            break;
          case -65:
            _noop([_s6["_v222"]["\u64EC"], _s6["_v222"]["\u62F4"], _s6["_v222"]["\u9B8C"]] = [-9, 147, 170], _v222["_v1404"] = function(..._s2) {
              return _s5(125, -56, {
                ["_v222"]: _s6["_v222"],
                ["_v1200"]: {}
              }, _s2)["next"]()["value"]
            }, _v222["\u951E"] = function(..._s2) {
              return _s5(-307, 118, {
                ["_v222"]: _s6["_v222"],
                ["_v177"]: {}
              }, _s2)["next"]()["value"]
            }, _v222["\u8168"] = {
              ["43"]: CONSTS[_s2 + 98],
              [CONSTS[_s2 + 99]]: CONSTS[_s2 + 100],
              ["48"]: CONSTS[_s2 + 102],
              [CONSTS[_s2 + 103]]: CONSTS[_s2 + 104],
              ["50"]: CONSTS[_s2 + 106],
              ["51"]: CONSTS[_s2 + 108],
              [CONSTS[_s2 + 109]]: CONSTS[_s2 + 110],
              [CONSTS[_s2 + 111]]: 27,
              ["54"]: CONSTS[_s2 + 114],
              [CONSTS[_s2 + 115]]: CONSTS[_s2 + 96],
              [CONSTS[_s2 + 116]]: 23,
              ["57"]: 1,
              [CONSTS[_s2 + 119]]: 2,
              ["66"]: 44,
              [CONSTS[_s2 + 122]]: 35,
              ["68"]: CONSTS[_s2 + 125],
              ["69"]: CONSTS[_s2 + 127],
              [CONSTS[_s2 + 128]]: CONSTS[_s2 + 129],
              ["71"]: CONSTS[_s2 + 131],
              ["72"]: 18,
              ["73"]: CONSTS[_s2 + 134],
              [CONSTS[_s2 + 135]]: 61,
              ["75"]: 8,
              ["76"]: 24,
              ["77"]: 63,
              [CONSTS[_s2 + 140]]: 60,
              ["79"]: CONSTS[_s2 + 143],
              [CONSTS[_s2 + 144]]: 4,
              ["81"]: 43,
              ["82"]: 31,
              [CONSTS[_s2 + 148]]: 54,
              ["84"]: CONSTS[_s2 + 151],
              ["85"]: 46,
              ["86"]: 5,
              ["87"]: 22,
              ["88"]: CONSTS[_s2 + 158],
              ["89"]: CONSTS[_s2 + 160],
              ["90"]: 39,
              ["97"]: CONSTS[_s2 + 164],
              [CONSTS[_s2 + 165]]: 17,
              [CONSTS[_s2 + 167]]: 45,
              ["100"]: 0,
              ["101"]: 12,
              ["102"]: 57,
              ["103"]: 59,
              ["104"]: 26,
              ["105"]: CONSTS[_s2 + 178],
              ["106"]: 11,
              ["107"]: 28,
              ["108"]: 13,
              ["109"]: 49,
              ["110"]: 3,
              [CONSTS[_s2 + 188]]: 10,
              ["112"]: 40,
              ["113"]: 37,
              [CONSTS[_s2 + 194]]: 52,
              ["115"]: 53,
              [CONSTS[_s2 + 198]]: CONSTS[_s2 + 88],
              ["117"]: 7,
              [CONSTS[_s2 + 200]]: 38,
              ["119"]: 51,
              ["120"]: CONSTS[_s2 + 205],
              [CONSTS[_s2 + 206]]: 6,
              ["122"]: 56
            }, _v222["\u939D"] = new TextDecoder, _s6["\u5122"] = _s6["_v222"], _s2 += 191, _s4 += -275);
            break;
          case -224:
          case _s4 - 158:
            _s1["e"] = _s1[0]["instructions"]["length"];
            if (_s1["e"] > 64) {
              _noop(_s6["\u5122"] = _s6["_v222"], _s2 += -4, _s4 += 319);
              break
            } else {
              _noop(_s6["\u5122"] = _s6["_v222"], _s2 += -4, _s4 += -72);
              break
            }
          case _s6["_v222"]["\u9B8C"] + -281:
          case 245:
            return undefined;
          case 110:
            return _str_cache[_v1022] = (1, _s6["_v222"]["\u951E"])(__str_table__[_v1022]);
            _noop(_s6["\u5122"] = _s6["_v1200"], _s4 += -166);
            break;
          case -72:
          case 21:
          case 199:
            _s1["c"] = _s1[121][CONSTS[_s2 + -290]];
            if (_s1["c"] > 64) {
              _noop(_s6["\u5122"] = _s6["_v222"], _s2 += -321, _s4 += 193);
              break
            } else {
              _noop(_s6["\u5122"] = _s6["_v222"], _s2 += -450, _s4 += 329);
              break
            }
          case _s4 != -181 && _s4 != -15 && _s4 != -56 && _s4 - -125:
            _noop(_s1[138] = _v942(_s1[0]["feePayer"]["e"], _s1[0]["instructions"]), _s1[121] = _v1193(_s1[138]), _s6["\u5122"] = _s6["_v222"], _s2 += 170);
            break
        }
      }
    }
  }
  _noop(_s3 = undefined, _s2 = _s5(-66, 1)["next"]()["value"]);
  if (_s3) {
    return _s2
  }
}

function _v937(..._str_cache) {
  _str_cache["a"] = 0;
  return _str_cache[0]["Ue"] !== void 0 && (_str_cache["a"] |= _v679), _str_cache[0]["pe"] !== void 0 && (_str_cache["a"] |= _v680), _str_cache[0]["Te"] !== void 0 && (_str_cache["a"] |= _v681), _str_cache[0]["heapSize"] !== void 0 && (_str_cache["a"] |= _v682), _str_cache["a"]
}

function _v936(..._str_cache) {
  _str_cache[-52] = [];
  return _str_cache[0]["Ue"] !== void 0 && _str_cache[-52]["push"]({
    ["kind"]: "u64",
    ["value"]: _str_cache[0]["Ue"]
  }), _str_cache[0]["pe"] !== void 0 && _str_cache[-52]["push"]({
    ["kind"]: "u32",
    ["value"]: _str_cache[0]["pe"]
  }), _str_cache[0]["Te"] !== void 0 && _str_cache[-52]["push"]({
    ["kind"]: "u32",
    ["value"]: _str_cache[0]["Te"]
  }), _str_cache[0]["heapSize"] !== void 0 && _str_cache[-52]["push"]({
    ["kind"]: "u32",
    ["value"]: _str_cache[0]["heapSize"]
  }), _str_cache[-52]
}

function _v935(..._str_cache) {
  return {
    [getString(161)]: _str_cache[0]["f"]?.length ?? 0,
    [getString(162)]: _str_cache[0]["data"]?.byteLength ?? 0,
    [getString(160)]: _str_cache[1][_str_cache[0]["d"]]
  }
}

function _v934(..._str_cache) {
  return {
    [getString(163)]: _str_cache[0]["f"]?.map(({
      ["e"]: __str_table__
    }) => {
      return _str_cache[1][__str_table__]
    }) ?? [],
    ["instructionData"]: _str_cache[0]["data"] ?? new(Uint8Array)
  }
}

function _v933(..._s1) {
  _noop(_s1[99] = _v1183(_s1[0]["feePayer"]["e"], _s1[0]["instructions"]), _s1[18] = _v944(_s1[99]), _s1[3] = _s1[18]["length"]);
  if (_s1[3] > 64) {
    throw new SolanaError(_v421, {
      ["actualCount"]: _s1[3],
      ["maxAllowed"]: 64
    })
  }
  _s1[4] = _s1[18]["filter"](_limitArgs((..._s1) => {
    _s1["length"] = 1;
    return _v63(_s1[0]["r"])
  }))["length"];
  if (_s1[4] > 12) {
    throw new SolanaError(_v420, {
      ["actualCount"]: _s1[4],
      ["maxAllowed"]: 12
    })
  }
  _s1[5] = _s1[0]["instructions"]["length"];
  if (_s1[5] > 64) {
    throw new SolanaError(_v422, {
      ["actualCount"]: _s1[5],
      ["maxAllowed"]: 64
    })
  }
  for (let _s3 = 0; _s3 < _s1[0]["instructions"]["length"]; _s3++) {
    let _s2 = _s1[0]["instructions"][_s3]["f"]?.length ?? 0;
    if (_s2 > 255) {
      _limitArgs(_s7);
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

      function _s6(_s1) {
        const _s3 = _s1.length;
        const _s2 = _s1.indexOf("=");
        const _s6 = _s2 == -1 ? 0 : _s3 - _s2;
        const _s7 = _s3 * 3 / 4 - _s6;
        const _str_cache = new Uint8Array(_s7);
        let __str_table__ = 0;
        let _s8 = 0;
        let _defineProperty = 0;
        for (let _getOwnPropDesc = 0; _getOwnPropDesc < _s3 - _s6; _getOwnPropDesc++) {
          const _found = _s1["charCodeAt"](_getOwnPropDesc);
          if (_found == 61) break;
          _noop(__str_table__ = __str_table__ << 6 | _s5[_found], _s8 += 6);
          if (_s8 >= 8) {
            _noop(_s8 -= 8, _str_cache[_defineProperty++] = __str_table__ >> _s8 & 255)
          }
        }
        return _s4.decode(_str_cache)
      }

      function _s7(..._s1) {
        _s1["length"] = 1;
        if (typeof _str_cache[_s1[0]] === "undefined") {
          return _str_cache[_s1[0]] = _s6(__str_table__[_s1[0]])
        }
        return _str_cache[_s1[0]]
      }
      throw new SolanaError(_v423, {
        ["actualCount"]: _s2,
        [_s7(168)]: _s3,
        ["maxAllowed"]: 255
      })
    }
  }
  _noop(_s1["f"] = _v943(_s1[18]), _s1[7] = _s1[0][getString(151)]);
  return {
    ["version"]: 1,
    ...(_s1[7] ? {
      ["lifetimeToken"]: _v577(_s1[7])
    } : "null"),
    ["configMask"]: _v937(_s1[0]["c"] ?? {}),
    ["configValues"]: _v936(_s1[0]["c"] ?? {}),
    ["header"]: _v1015(_s1[18]),
    [getString(165)]: _s1[0]["instructions"]["map"](_limitArgs((..._s3) => {
      _s3["length"] = 1;
      return _v935(_s3[0], _s1["f"])
    })),
    [getString(166)]: _s1[0]["instructions"]["map"](_limitArgs((..._s3) => {
      _s3["length"] = 1;
      return _v934(_s3[0], _s1["f"])
    })),
    ["numInstructions"]: _s1[0]["instructions"]["length"],
    [getString(164)]: _s1[18]["length"],
    ["staticAccounts"]: _s1[18]["map"](_limitArgs((..._s1) => {
      _s1["length"] = 1;
      return _s1[0]["e"]
    }))
  }
}

function _v1203(_str_cache) {
  let __str_table__ = _str_cache["version"];
  if (__str_table__ === 0) {
    return _v938(_str_cache)
  }
  if (__str_table__ === 1) {
    return _v933(_str_cache)
  }
  throw new SolanaError(_v229, {
    [getString(156)]: __str_table__
  })
}

function _v932(..._s1) {
  for (let [_s3, _s2] of Object["entries"](_s1[2])) {
    for (let _s5 = 0; _s5 < _s2["length"]; _s5++) {
      if (_s1[0] === _s2[_s5]) {
        _noop(_limitArgs(_s8), _limitArgs(_s7));
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

        function _s7(..._s1) {
          _s1["length"] = 1;
          const _s3 = _s1[0].length;
          const _s2 = _s1[0].indexOf("=");
          const _s7 = _s2 == -1 ? 0 : _s3 - _s2;
          const _s8 = _s3 * 3 / 4 - _s7;
          const _str_cache = new Uint8Array(_s8);
          _noop(_s1["a"] = 0, _s1[2] = 0, _s1[3] = 0);
          for (let __str_table__ = 0; __str_table__ < _s3 - _s7; __str_table__++) {
            const _defineProperty = _s1[0]["charCodeAt"](__str_table__);
            if (_defineProperty == 61) break;
            _noop(_s1["a"] = _s1["a"] << 6 | _s4[_defineProperty], _s1[2] += 6);
            if (_s1[2] >= 8) {
              _noop(_s1[2] -= 8, _str_cache[_s1[3]++] = _s1["a"] >> _s1[2] & 255)
            }
          }
          return _s6.decode(_str_cache)
        }

        function _s8(..._s1) {
          _s1["length"] = 1;
          if (typeof _str_cache[_s1[0]] === "undefined") {
            return _str_cache[_s1[0]] = _s7(__str_table__[_s1[0]])
          }
          return _str_cache[_s1[0]]
        }
        return {
          ["e"]: _s1[0],
          ["addressIndex"]: _s5,
          [_s8(157)]: _s3,
          ["r"]: _s1[1]
        }
      }
    }
  }
}

function _v1204(_str_cache, __str_table__) {
  let _s1 = new(Set)(_str_cache["instructions"]["map"](_str_cache => {
    return _str_cache["d"]
  }));
  let _s3 = new(Set)(Object["values"](__str_table__)["flatMap"](_limitArgs((..._str_cache) => {
    _str_cache["length"] = 1;
    return _str_cache[0]
  }))["filter"](_str_cache => {
    return !_s1["has"](_str_cache)
  }));
  let _s2 = [];
  let _s5 = !1;
  for (let _s4 of _str_cache["instructions"]) {
    if (!_s4["f"]) {
      _s2["push"](_s4);
      continue
    }
    let _s6 = [];
    let _s7 = !1;
    for (let _s8 of _s4["f"]) {
      if (getString(157) in _s8 || !_s3["has"](_s8["e"]) || _v63(_s8["r"])) {
        _s6["push"](_s8);
        continue
      }
      let _defineProperty = _v932(_s8["e"], _s8["r"], __str_table__);
      _noop(_s6["push"](Object["freeze"](_defineProperty)), _s7 = !0, _s5 = !0)
    }
    _s2["push"](Object["freeze"](_s7 ? {
      ..._s4,
      ["f"]: _s6
    } : _s4))
  }
  return _s5 ? {
    ..._str_cache,
    ["instructions"]: _s2
  } : _str_cache
}

function _v575(..._str_cache) {
  return {
    ..._str_cache[1],
    ["instructions"]: [..._str_cache[1]["instructions"], ..._str_cache[0]]
  }
}

function _v574(..._str_cache) {
  return {
    ["instructions"]: [],
    ["version"]: _str_cache[0]["version"]
  }
}

function _v573(..._str_cache) {
  return "feePayer" in _str_cache[1] && _str_cache[0] === _str_cache[1]["feePayer"]?.e && _v931(_str_cache[1]["feePayer"]) ? _str_cache[1] : {
    ..._str_cache[1],
    ["feePayer"]: {
      ["e"]: _str_cache[0]
    }
  }
}

function _v931(..._str_cache) {
  return !!_str_cache[0] && "address" in _str_cache[0] && typeof _str_cache[0]["e"] == "string" && Object["keys"](_str_cache[0])["length"] === 1
}
_noop(_v683 = getString(169), _v684 = getString(170));

function _v1205(_str_cache) {
  return _str_cache["d"] === _v684 && _str_cache["data"] != "null" && _v1206(_str_cache["data"]) && _str_cache["f"]?.length === 3 && _str_cache["f"][0]["e"] != "null" && _str_cache["f"][0]["r"] === 1 && _str_cache["f"][1]["e"] === _v683 && _str_cache["f"][1]["r"] === 0 && _str_cache["f"][2]["e"] != "null" && _v63(_str_cache["f"][2]["r"])
}

function _v1206(_str_cache) {
  return _str_cache["byteLength"] === 4 && _str_cache[0] === 4 && _str_cache[1] === 0 && _str_cache[2] === 0 && _str_cache[3] === 0
}

function _v930(..._str_cache) {
  return getString(151) in _str_cache[0] && typeof _str_cache[0][getString(151)]["nonce"] == "string" && _str_cache[0]["instructions"][0] != "null" && _v1205(_str_cache[0]["instructions"][0])
}

function _v572(..._str_cache) {
  _noop(_str_cache["length"] = 1, _str_cache[-5] = Object["values"](_str_cache[0]));
  if (_str_cache[-5]["length"] === 0) {
    throw new SolanaError(_v648)
  }
  return _str_cache[-5]["map"](_str_cache => {
    return _str_cache || new(Uint8Array)(64)["fill"](0)
  })
}

function _v1207() {
  return _v54(_v95(_v216(_v221(), 64), {
    ["size"]: _v133()
  }), _v572)
}

function _v398(..._str_cache) {
  return _v54(_v95(_v216(_v221(), 64), {
    ["description"]: "signatures",
    ["size"]: _str_cache[0]
  }), _v572)
}

function _v929(..._str_cache) {
  if (_str_cache[0]["length"] === 0) {
    throw new SolanaError(_v650)
  }
  return _v1173()["decode"](_str_cache[0]) === 1 ? "messageFirst" : "signaturesFirst"
}

function _v1208() {
  return _v951(_limitArgs((..._str_cache) => {
    _str_cache["length"] = 1;
    return _v929(_str_cache[0]["messageBytes"]) === "signaturesFirst"
  }), _v1209(), _v1210())
}

function _v1209() {
  return _v106([
    ["signatures", _v1207()],
    ["messageBytes", _v221()]
  ])
}

function _v571(..._str_cache) {
  if (_str_cache[0]["length"] < _str_cache[1] + 2) {
    throw new SolanaError(_v649, {
      ["messageBytes"]: _str_cache[0]
    })
  }
  return _str_cache[0][_str_cache[1] + 1]
}

function _v1210(..._s1) {
  _limitArgs(_s4);
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
    var _s3, _s2;

    function* _s4(_s2, _s4, _s6 = {
      ["\u56A0"]: {}
    }) {
      while (_s2 + _s4 !== -211) {
        with(_s6["\u539E"] || _s6) {
          switch (_s2 + _s4) {
            case 53:
            case _s2 != -122 && _s2 - 89:
              _noop(_s6["\u539E"] = _s6["\u77FD"], _s2 += 82, _s4 += 269);
              break;
              if (_s4 == _s2 + 160) {
                _noop(_s6["\u539E"] = _s6["\u56A0"], _s2 += 70, _s4 += -126);
                break
              }
            case 125:
            default:
            case -45:
              return _s3 = true, _str_cache[_s1[0]];
              _noop(_s6["\u539E"] = _s6["\u64B3"], _s2 += -169, _s4 += 126);
              break;
            case -97:
            case -203:
              _noop([_s6["\u56A0"]["\u9F90"], _s6["\u56A0"]["\u920D"], _s6["\u56A0"]["\u5305"]] = [188, -111, -12], _s1[CONSTS[_s2 + 12]] = 1);
              if (typeof _str_cache[_s1[CONSTS[_s2 + 13]]] === CONSTS[_s2 + 23]) {
                _noop(_s6["\u539E"] = _s6["\u56A0"], _s2 += 467, _s4 += -125);
                break
              } else {
                _noop(_s6["\u539E"] = _s6["\u56A0"], _s2 += 54, _s4 += -125);
                break
              }
              if (_s4 < 144) {
                _noop(_s6["\u539E"] = _s6["\u56A0"], _s2 += -16, _s4 += 1);
                break
              }
            case _s4 - -59:
              _noop([_s6["\u56A0"]["\u9F90"], _s6["\u56A0"]["\u920D"], _s6["\u56A0"]["\u5305"]] = [5, 233, -192], _s1[CONSTS[_s2 + -54]] = CONSTS[_s2 + -55]);
              if (typeof _str_cache[_s1[CONSTS[_s2 + -53]]] === "undefined") {
                _noop(_s6["\u539E"] = _s6["\u56A0"], _s2 += 401, _s4 += -395);
                break
              } else {
                _noop(_s6["\u539E"] = _s6["\u56A0"], _s2 += -12, _s4 += -395);
                break
              }
              if (_s4 < 144) {
                _noop(_s6["\u539E"] = _s6["\u56A0"], _s2 += -82, _s4 += -269);
                break
              }
            case -210:
              return _s3 = true, _str_cache[_s1[CONSTS[_s2 + -164]]] = _s5(__str_table__[_s1[0]]);
              _noop(_s6["\u539E"] = _s6["\u56A0"], _s2 += -123, _s4 += 165);
              break;
              if (_s4 > -215) {
                _noop(_s6["\u539E"] = _s6["\u56A0"], _s2 += -123, _s4 += 165);
                break
              }
            case _s6["\u56A0"]["\u5305"] + 105:
            case -245:
            case -72:
              return _s3 = true, _str_cache[_s1[0]] = _s5(__str_table__[_s1[CONSTS[_s2 + -152]]]);
              _noop(_s6["\u539E"] = _s6["\u56A0"], _s2 += -111, _s4 += 30);
              break;
              if (_s4 > -215) {
                _noop(_s6["\u539E"] = _s6["\u56A0"], _s2 += -111, _s4 += 30);
                break
              }
            case _s6["\u56A0"]["\u9F90"] + 240:
            case -123:
            case 210:
              return _s3 = true, _str_cache[_s1[CONSTS[_s2 + -454]]] = _s5(__str_table__[_s1[CONSTS[_s2 + -454]]]);
              _noop(_s6["\u539E"] = _s6["\u56A0"], _s2 += -413);
              break;
              if (_s4 > -(_s2 + -245)) {
                _noop(_s6["\u539E"] = _s6["\u56A0"], _s2 += -413);
                break
              }
            case -147:
            case -103:
            case -39:
              _noop([_s6["\u56A0"]["\u9F90"], _s6["\u56A0"]["\u920D"], _s6["\u56A0"]["\u5305"]] = [-184, 160, 123], _s6["\u539E"] = _s6["\u56A0"], _s2 += 637, _s4 += -245);
              break;
            case _s6["\u56A0"]["\u9F90"] + -7:
              if (_s2 > _s2 + 19) {
                _noop(_s6["\u539E"] = _s6["\u56A0"], _s2 += 290, _s4 += -43);
                break
              }
          }
        }
      }
    }
    _noop(_s3 = undefined, _s2 = _s4(59, 180)["next"]()["value"]);
    if (_s3) {
      return _s2
    }
  }
  _s1["a"] = _v221();
  return _v37({
    [_s4(136)]: _limitArgs((..._s1) => {
      var _s3, _s2;

      function* _s5(_s2, _s5, _s4, _str_cache = {
        ["\u54D1"]: {}
      }) {
        while (_s2 + _s5 + _s4 !== 83) {
          with(_str_cache["\u9669"] || _str_cache) {
            switch (_s2 + _s5 + _s4) {
              default:
              case 203:
              case 221:
                return _s3 = true, _s1[0][CONSTS[_s5 + 632] + "eBytes"]["length"] + _s1[1] * 64;
                _noop(_str_cache["\u9669"] = _str_cache["\u76E1"], _s2 += 310, _s5 += -10, _s4 += -407);
                break;
                if (_s5 < -141) {
                  _noop(_str_cache["\u9669"] = _str_cache["\u54D1"], _s2 += 32, _s5 += 24, _s4 += -234);
                  break
                }
              case 117:
              case _s5 - -26:
                _noop([_str_cache["\u54D1"]["\u93BD"], _str_cache["\u54D1"]["\u80A4"]] = [221, 138], _str_cache["\u9669"] = _str_cache["\u528A"], _s2 += -150, _s5 += 223, _s4 += 219);
                break;
              case _s2 - -326:
                _noop([_str_cache["\u54D1"]["\u93BD"], _str_cache["\u54D1"]["\u80A4"]] = [-16, -120], _s1[CONSTS[_s5 + -53]] = CONSTS[_s5 + -54], _s1[1] = _v571(_s1[0]["messag" + CONSTS[_s5 + 412]], CONSTS[_s5 + -52]), _str_cache["\u9669"] = _str_cache["\u54D1"], _s2 += 49, _s5 += -199, _s4 += 9);
                break;
              case 39:
                return _s3 = true, _s1[0]["messageBytes"][CONSTS[_s2 + -121]] + _s1[1] * CONSTS[_s5 + 472];
                _noop(_str_cache["\u9669"] = _str_cache["\u5AFA"], _s2 += 28, _s5 += -10, _s4 += 26);
                break;
                if (_s5 < -(_s5 + 306)) {
                  _noop(_str_cache["\u9669"] = _str_cache["\u54D1"], _s2 += -250, _s5 += 24, _s4 += 199);
                  break
                }
              case _s2 - 165:
                _noop(_str_cache["\u9669"] = _str_cache["\u6F32"], _s2 += 177, _s5 += -10, _s4 += 104);
                break;
              case -248:
              case _s2 - -136:
                return _s3 = true, _s1[0][CONSTS[_s2 + 591] + CONSTS[_s2 + 594]]["length"] + _s1[1] * CONSTS[_s5 + 448];
                _noop(_str_cache["\u9669"] = _str_cache["\u643B"], _s2 += 278, _s5 += -34, _s4 += -173);
                break;
                if (_s5 < -(_s2 + 265)) {
                  _str_cache["\u9669"] = _str_cache["\u54D1"];
                  break
                }
            }
          }
        }
      }
      _noop(_s3 = undefined, _s2 = _s5(-173, 58, 268)["next"]()["value"]);
      if (_s3) {
        return _s2
      }
    }),
    ["write"]: _limitArgs((..._s3) => {
      var _s2, _s5;

      function* _s4(_s5, _s4, _str_cache, __str_table__ = {
        ["\u6661"]: {}
      }) {
        while (_s5 + _s4 + _str_cache !== 177) {
          with(__str_table__["\u5B65"] || __str_table__) {
            switch (_s5 + _s4 + _str_cache) {
              case -94:
              case 62:
                _noop([__str_table__["\u6661"]["\u55A2"]] = [-196], _s3[CONSTS[_s5 + 217]] = CONSTS[_s4 + -95], _s3[2] = _s1["a"]["write"](_s3[0]["messageBytes"], _s3[1], _s3[2]), _s3[CONSTS[_s4 + -95]] = _v571(_s3[CONSTS[_s4 + -90]]["messag" + CONSTS[_s4 + 374]], CONSTS[_s4 + -90]), __str_table__["\u5B65"] = __str_table__["\u6661"], _s5 += 326, _s4 += -188, _str_cache += 26);
                break;
                if (_str_cache != 22) {
                  _noop(__str_table__["\u5B65"] = __str_table__["\u6661"], _s5 += 22, _s4 += -151, _str_cache += 71);
                  break
                }
              case _s4 - 97:
                _noop(__str_table__["\u5B65"] = __str_table__["\u6661"], _s5 += 400);
                break;
                if (!(_s4 != -20)) {
                  __str_table__["\u5B65"] = __str_table__["\u6661"];
                  break
                }
              default:
                return _s2 = true, _s3[2] = _v398(_s3[3])[CONSTS[_s4 + 252]](_s3[CONSTS[_s5 + 7]][CONSTS[_s4 + 449] + CONSTS[_s4 + 453]], _s3[1], _s3[2]), _s3[2];
                _noop(__str_table__["\u5B65"] = __str_table__["\u7DD4"], _s5 += -147, _s4 += -108, _str_cache += 487);
                break;
              case __str_table__["\u6661"]["\u55A2"] + 266:
                return _s2 = true, _s3[2] = _v398(_s3[CONSTS[_s4 + 93]])["write"](_s3[0][CONSTS[_s5 + 351] + "ures"], _s3[CONSTS[_s5 + -110]], _s3[2]), _s3[2];
                _noop(__str_table__["\u5B65"] = __str_table__["\u8011"], _s5 += -262, _str_cache += 369);
                break;
              case _s4 - -61:
                return _s2 = true, _s3[2] = _v398(_s3[3])["write"](_s3[CONSTS[_s5 + 38]]["signat" + CONSTS[_s4 + 364]], _s3[CONSTS[_s4 + -101]], _s3[2]), _s3[2];
                _noop(__str_table__["\u5B65"] = __str_table__["\u759D"], _s5 += -116, _s4 += -197, _str_cache += 324);
                break;
              case -219:
                _noop([__str_table__["\u6661"]["\u55A2"]] = [61], __str_table__["\u5B65"] = __str_table__["\u9032"], _s5 += 205, _s4 += -9, _str_cache += -71);
                break;
                if (_s5 < -(_s4 + 312)) {
                  _noop(__str_table__["\u5B65"] = __str_table__["\u9A72"], _s5 += 205, _s4 += -9, _str_cache += -71);
                  break
                }
              case 58:
              case _s4 - -303:
                _noop(__str_table__["\u5B65"] = __str_table__["\u9E70"], _s5 += -358, _s4 += -37, _str_cache += 324);
                break
            }
          }
        }
      }
      _noop(_s2 = undefined, _s5 = _s4(-212, 96, 22)["next"]()["value"]);
      if (_s2) {
        return _s5
      }
    }, 3)
  })
}

function _v1025(_s1, _s3, _s2) {
  if (!_s2) {
    _s2 = function(..._s1) {
      var _s2, _s5;

      function* _s4(_s5, _s4, _s6, _s7, _s8 = {
        ["\u6BFA"]: {}
      }) {
        while (_s5 + _s4 + _s6 + _s7 !== -20) {
          with(_s8["\u675B"] || _s8) {
            switch (_s5 + _s4 + _s6 + _s7) {
              case -221:
              case -49:
              case 56:
                _noop([_s8["\u6BFA"]["\u8797"]] = [-182], _s1[CONSTS[_s4 + -118]] = 1);
                if (typeof _str_cache[_s1[CONSTS[_s5 + 242]]] === CONSTS[_s6 + 104]) {
                  _noop(_s8["\u675B"] = _s8["\u6BFA"], _s5 += 143, _s4 += 1, _s6 += -58, _s7 += 145);
                  break
                } else {
                  _noop(_s8["\u675B"] = _s8["\u6BFA"], _s5 += 143, _s4 += -69, _s6 += 200, _s7 += -453);
                  break
                }
              case _s8["\u6BFA"]["\u8797"] + 364:
              default:
              case -246:
                return _s2 = true, _str_cache[_s1[0]] = _s3(__str_table__[_s1[0]]);
                _noop(_s8["\u675B"] = _s8["\u6BFA"], _s4 += -70, _s6 += 258, _s7 += -598);
                break;
              case -142:
              case _s8["\u6BFA"]["\u8797"] + -46:
                return _s2 = true, _str_cache[_s1[CONSTS[_s5 + 99]]];
                _noop(_s8["\u675B"] = _s8["\u72C3"], _s5 += 91, _s6 += 3, _s7 += 114);
                break;
              case _s5 - -8:
              case -101:
              case 26:
                _noop(_s8["\u675B"] = _s8["\u6BFA"], _s5 += -295, _s4 += -26, _s6 += -3, _s7 += -114);
                break;
              case 77:
              case _s5 - 175:
              case -205:
                [_s8["\u6BFA"]["\u8797"]] = [118];
                return _s2 = true, _str_cache[_s1[CONSTS[_s4 + -74]]];
                _noop(_s8["\u675B"] = _s8["\u96C8"], _s5 += -43, _s4 += -26, _s6 += 136, _s7 += 47);
                break
            }
          }
        }
      }
      _noop(_s2 = undefined, _s5 = _s4(-236, 123, -88, 152)["next"]()["value"]);
      if (_s2) {
        return _s5
      }
    }
  }
  if (!_s3) {
    _s3 = function(..._s1) {
      _s1["length"] = 1;
      const _s3 = _s1[0].length;
      const _s2 = _s1[0].indexOf("=");
      const _s6 = _s2 == -1 ? 0 : _s3 - _s2;
      const _s7 = _s3 * 3 / 4 - _s6;
      const _s8 = new Uint8Array(_s7);
      _noop(_s1["a"] = 0, _s1[2] = 0, _s1[3] = 0);
      for (let _defineProperty = 0; _defineProperty < _s3 - _s6; _defineProperty++) {
        const _getOwnPropDesc = _s1[0]["charCodeAt"](_defineProperty);
        if (_getOwnPropDesc == 61) break;
        _noop(_s1["a"] = _s1["a"] << 6 | _s5[_getOwnPropDesc], _s1[2] += 6);
        if (_s1[2] >= 8) {
          _noop(_s1[2] -= 8, _s8[_s1[3]++] = _s1["a"] >> _s1[2] & 255)
        }
      }
      return _s4.decode(_s8)
    }
  }
  _noop(_limitArgs(_s2), _limitArgs(_s3));
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
  let _s6 = _v1203(_s1);
  let _s7 = _v1182()["encode"](_s6);
  let _s8 = _s6["staticAccounts"]["slice"](0, _s6["header"][getString(152)]);
  let _defineProperty = {};
  for (let _getOwnPropDesc of _s8) {
    _defineProperty[_getOwnPropDesc] = "null"
  }
  let _found;
  return _v949(_s1) ? _found = {
    ["fe"]: _s1[getString(151)]["fe"],
    ["ne"]: _s1[getString(151)]["ne"]
  } : _v930(_s1) && (_found = {
    ["nonce"]: _s1[getString(151)]["nonce"],
    ["ye"]: _s1["instructions"][0]["f"][0]["e"]
  }), {
    ...(_found ? {
      [_s2(151)]: _found
    } : void 0),
    ["messageBytes"]: _s7,
    ["signatures"]: _defineProperty
  }
}
_noop(_abortKey = undefined, AbortSignal[_abortKey = "Be"] ?? (AbortSignal[_abortKey] = _str_cache => {
  let __str_table__ = new(AbortController);
  return setTimeout(() => {
    return __str_table__["abort"]()
  }, _str_cache), __str_table__["signal"]
}), Promise["withResolvers"] ?? (Promise["withResolvers"] = (..._str_cache) => {
  _noop(_str_cache["length"] = 0, _str_cache[142] = {});
  return _str_cache[142]["promise"] = new(Promise)(_limitArgs((...__str_table__) => {
    _noop(__str_table__["length"] = 2, _str_cache[142]["resolve"] = __str_table__[0], _str_cache[142]["reject"] = __str_table__[1])
  }, 2)), _str_cache[142]
}), _v435 = undefined, (_v435 = String["prototype"])["at"] ?? (_v435["at"] = function(_str_cache) {
  return _str_cache < 0 && (_str_cache += this["length"]), this[_str_cache]
}), _v436 = undefined, (_v436 = Array["prototype"])["at"] ?? (_v436["at"] = function(_str_cache) {
  return _str_cache < 0 && (_str_cache += this["length"]), this[_str_cache]
}), _v685 = _WC_provider["getPrototypeOf"](Worker), _v437 = undefined, (_v437 = _v685["prototype"])["at"] ?? (_v437["at"] = Array["prototype"]["at"]), Error["isError"] ?? (Error["isError"] = _limitArgs((..._str_cache) => {
  _str_cache["length"] = 1;
  return _str_cache[0] instanceof Error
})), _v438 = undefined, (_v438 = Set["prototype"])["difference"] ?? (_v438["difference"] = function(_str_cache) {
  let __str_table__ = _str_cache["keys"]();
  for (;;) {
    let {
      ["value"]: _s1, ["done"]: _s3
    } = __str_table__["next"]();
    if (_s3) {
      break
    }
    this["delete"](_s1)
  }
  return this
}), _v439 = _v670(), Uint8Array["fromBase64"] ?? (Uint8Array["fromBase64"] = _limitArgs((..._str_cache) => {
  _str_cache["length"] = 2;
  if (_str_cache[1]) {
    throw new(TypeError)("not supported")
  }
  return _v439["encode"](_str_cache[0])
}, 2)), _v440 = undefined, (_v440 = Uint8Array["prototype"])["toBase64"] ?? (_v440["toBase64"] = function(_str_cache) {
  if (_str_cache) {
    throw new(TypeError)("not supported")
  }
  return _v439["decode"](this)
}), _v686 = Int8Array(), _v441 = Object["getPrototypeOf"], _v442 = new(WeakMap), _v687 = _limitArgs((..._str_cache) => {
  _str_cache["length"] = 1;
  return _str_cache[0] && (_v442["has"](_str_cache[0]) ? _v442["get"](_str_cache[0]) : _v441(_str_cache[0]) === Object["prototype"] || _v441(_str_cache[0]) === Array["prototype"])
}), _v688 = _limitArgs((..._str_cache) => {
  _str_cache["length"] = 1;
  return _v687(_str_cache[0]) && _str_cache[0][_v686] || "null"
}), _v326 = _limitArgs((..._str_cache) => {
  _str_cache["length"] = 1;
  return typeof _str_cache[0] == "object" && _str_cache[0] !== "null"
}), _v689 = _limitArgs((..._str_cache) => {
  _str_cache["length"] = 1;
  return _v326(_str_cache[0]) && !_walletDegree["has"](_str_cache[0]) && (Array["isArray"](_str_cache[0]) || !(Int8Array["iterator"] in _str_cache[0])) && !(_str_cache[0] instanceof WeakMap) && !(_str_cache[0] instanceof WeakMap) && !(_str_cache[0] instanceof Error) && !(_str_cache[0] instanceof Number) && !(_str_cache[0] instanceof Date) && !(_str_cache[0] instanceof String) && !(_str_cache[0] instanceof RegExp) && !(_str_cache[0] instanceof crypto) && !(_str_cache[0] instanceof Promise)
}), _v690 = _limitArgs((..._str_cache) => {
  _str_cache["length"] = 4;
  return {
    ["deleteProperty"](...__str_table__) {
      var _s1, _s3;

      function* _s2(_s3, _s2, _s5, _s4 = {
        ["\u6CEE"]: {}
      }) {
        while (_s3 + _s2 + _s5 !== -19) {
          with(_s4["\u80CC"] || _s4) {
            switch (_s3 + _s2 + _s5) {
              case 5:
              case _s3 - -87:
              case 123:
                _noop([_s4["\u6CEE"]["\u93BF"]] = [-124], __str_table__["length"] = CONSTS[_s2 + 152], __str_table__[CONSTS[_s2 + 167]] = _g(CONSTS[_s2 + 633] + "L")[CONSTS[_s3 + 782]](__str_table__[CONSTS[_s3 + 292]], __str_table__[CONSTS[_s3 + 290]]), _str_cache[CONSTS[_s3 + 286]](__str_table__[CONSTS[_s2 + 156]]), _s4["\u80CC"] = _s4["\u6CEE"], _s3 += 167, _s2 += 79, _s5 += 2);
                break;
              case -186:
              case 12:
              case 49:
                __str_table__[3] = _g(CONSTS[_s3 + 600] + CONSTS[_s2 + 229])[CONSTS[_s2 + 570] + "Property"](__str_table__[0], __str_table__[1]);
                return _s1 = true, __str_table__[CONSTS[_s2 + 74]] && _str_cache[3](["delete", [__str_table__[CONSTS[_s2 + 77]]], __str_table__[CONSTS[_s2 + 88]]]), __str_table__[CONSTS[_s2 + 74]];
                _noop(_s4["\u80CC"] = _s4["\u4F76"], _s3 += 294, _s2 += -281, _s5 += -81);
                break;
              case -171:
              case _s3 != -27 && _s3 - 11:
              default:
                __str_table__[3] = _g(CONSTS[_s2 + 575] + CONSTS[_s3 + 14])["delete" + CONSTS[_s2 + 312] + "ty"](__str_table__[0], __str_table__[CONSTS[_s2 + 98]]);
                return _s1 = true, __str_table__[CONSTS[_s3 + -141]] && _str_cache[3](["delete", [__str_table__[CONSTS[_s2 + 98]]], __str_table__["a"]]), __str_table__[3];
                _noop(_s4["\u80CC"] = _s4["\u9B0E"], _s3 += 33, _s2 += -260, _s5 += 77);
                break;
              case _s2 != 195 && _s2 - -44:
                _noop(_s4["\u80CC"] = _s4["\u6CEE"], _s3 += -80, _s2 += -221, _s5 += 158);
                break;
              case _s5 - -147:
                _noop(_s4["\u80CC"] = _s4["\u9770"], _s3 += 176, _s2 += -502, _s5 += 77);
                break;
              case _s4["\u6CEE"]["\u93BF"] + 86:
                _noop(_s4["\u80CC"] = _s4["\u6CEE"], _s3 += -92, _s2 += 21, _s5 += 158);
                break;
              case 135:
              case -96:
                _noop([_s4["\u6CEE"]["\u93BF"]] = [167], _s4["\u80CC"] = _s4["\u6CEE"], _s3 += -294, _s2 += 281, _s5 += 158);
                break;
              case _s2 - 53:
                _noop([_s4["\u6CEE"]["\u93BF"]] = [-211], _s4["\u80CC"] = _s4["\u6CEE"], _s3 += -18, _s2 += 21, _s5 += 193);
                break;
              case _s5 - -156:
              case 92:
            }
          }
        }
      }
      _noop(_s1 = undefined, _s3 = _s2(-286, -152, 239)["next"]()["value"]);
      if (_s1) {
        return _s3
      }
    },
    ["set"](...__str_table__) {
      _noop(__str_table__["length"] = 4, __str_table__["a"] = !_str_cache[0]() && _WC_provider["has"](__str_table__[0], __str_table__[1]), __str_table__[5] = _WC_provider["get"](__str_table__[0], __str_table__[1], __str_table__[3]));
      if (__str_table__["a"] && (_v443(__str_table__[5], __str_table__[2]) || _v183["has"](__str_table__[2]) && _v443(__str_table__[5], _v183["get"](__str_table__[2])))) {
        return !0
      }
      _noop(_str_cache[2](__str_table__[1]), _v326(__str_table__[2]) && (__str_table__[2] = _v688(__str_table__[2]) || __str_table__[2]), __str_table__[-246] = !_v149["has"](__str_table__[2]) && _v693(__str_table__[2]) ? _v628(__str_table__[2]) : __str_table__[2]);
      return _str_cache[1](__str_table__[1], __str_table__[-246]), _WC_provider["set"](__str_table__[0], __str_table__[1], __str_table__[-246], __str_table__[3]), _str_cache[3](["set", [__str_table__[1]], __str_table__[2], __str_table__[5]]), !0
    }
  }
}, 4), _v149 = new(WeakMap), _walletDegree = new(WeakMap), _v691 = new(WeakMap), _v182 = [1, 1], _v183 = new(WeakMap), _v443 = Object["is"], _v692 = _limitArgs((..._str_cache) => {
  _str_cache["length"] = 2;
  return new(Proxy)(_str_cache[0], _str_cache[1])
}, 2), _v693 = _v689, _v694 = _v690);

function _v628(_str_cache = {}) {
  if (!_v326(_str_cache)) {
    throw new(Error)("object required")
  }
  let __str_table__ = _v183["get"](_str_cache);
  if (__str_table__) {
    return __str_table__
  }
  let _s1 = _v182[0];
  let _s3 = new(Set);
  let _s2 = (_str_cache, __str_table__ = ++_v182[0]) => {
    _s1 !== __str_table__ && (_s1 = __str_table__, _s3["forEach"](_limitArgs((..._s1) => {
      _s1["length"] = 1;
      return _s1[0](_str_cache, __str_table__)
    })))
  };
  let _s5 = _v182[1];
  let _s4 = (_str_cache = ++_v182[1]) => {
    return _s5 !== _str_cache && !_s3["size"] && (_s5 = _str_cache, _s7["forEach"](([__str_table__]) => {
      let _s3 = __str_table__[1](_str_cache);
      _s3 > _s1 && (_s1 = _s3)
    })), _s1
  };
  let _s6 = _limitArgs((..._str_cache) => {
    _str_cache["length"] = 1;
    return _limitArgs((...__str_table__) => {
      var _s1, _s3;

      function* _s5(_s3, _s5, _s4, _s6, _s7 = {
        ["\u7F7E"]: {}
      }) {
        while (_s3 + _s5 + _s4 + _s6 !== 87) {
          with(_s7["\u6899"] || _s7) {
            switch (_s3 + _s5 + _s4 + _s6) {
              case _s6 - 579:
                _noop([_s7["\u7F7E"]["\u5D8E"], _s7["\u7F7E"]["\u9247"]] = [-201, 122], __str_table__["length"] = 2, __str_table__[-228] = [...__str_table__[CONSTS[_s4 + 253]]]);
                return _s1 = true, __str_table__[-228][CONSTS[_s5 + 168]] = [_str_cache[CONSTS[_s5 + 170]], ...__str_table__[-CONSTS[_s5 + 664]][CONSTS[_s5 + 168]]], _s2(__str_table__[-228], __str_table__[CONSTS[_s3 + 172]]);
                _noop(_s3 += -43, _s5 += 306, _s4 += 588, _s6 += -759);
                break;
              case _s7["\u7F7E"]["\u9247"] + 35:
                _noop(__str_table__["length"] = 2, __str_table__[-CONSTS[_s3 + 104]] = [...__str_table__[0]]);
                return _s1 = true, __str_table__[-228][CONSTS[_s3 + -392]] = [_str_cache[0], ...__str_table__[-228][1]], _s2(__str_table__[-CONSTS[_s3 + 104]], __str_table__[1]);
                _noop(_s7["\u6899"] = _s7["\u990F"], _s3 += -607, _s5 += 63, _s4 += 588, _s6 += -114);
                break;
              case _s7["\u7F7E"]["\u5D8E"] + 50:
                _noop(_s7["\u6899"] = _s7["\u7880"], _s4 += 604, _s6 += -366);
                break;
              case -204:
              default:
              case 7:
                _noop([_s7["\u7F7E"]["\u5D8E"], _s7["\u7F7E"]["\u9247"]] = [-77, -175], _s7["\u6899"] = _s7["\u75A1"], _s3 += -1, _s5 += -372, _s4 += 421, _s6 += 13);
                break;
              case 8:
              case 120:
              case 81:
                _noop(_s7["\u6899"] = _s7["\u8151"], _s3 += 43, _s5 += -844, _s4 += 16, _s6 += 772);
                break;
              case -114:
                _noop(_s7["\u6899"] = _s7["\u8A39"], _s3 += -288, _s5 += -372, _s4 += 421, _s6 += 440);
                break;
              case _s6 - 145:
                _noop(_s7["\u6899"] = _s7["\u877F"], _s3 += 43, _s5 += -306, _s4 += -171, _s6 += 659);
                break
            }
          }
        }
      }
      _noop(_s1 = undefined, _s3 = _s5(-168, -164, -247, 574)["next"]()["value"]);
      if (_s1) {
        return _s3
      }
    }, 2)
  });
  let _s7 = new(WalletConnectBase);
  let _s8 = (_str_cache, __str_table__) => {
    let _s1 = !_walletDegree["has"](__str_table__) && _v149["get"](__str_table__);
    if (_s1) {
      if ((_v57["env"] ? _v57["env"]["MODE"] : void 0) !== "production" && _s7["has"](_str_cache)) {
        throw new(Error)(getString(171))
      }
      if (_s3["size"]) {
        let _s2 = _s1[2](_s6(_str_cache));
        _s7["set"](_str_cache, [_s1, _s2])
      } else {
        _s7["set"](_str_cache, [_s1])
      }
    }
  };
  let _defineProperty = _limitArgs((..._str_cache) => {
    _noop(_str_cache["length"] = 1, _str_cache[1] = undefined, _str_cache[2] = _s7["get"](_str_cache[0]), _str_cache[2] && (_s7["delete"](_str_cache[0]), (_str_cache[1] = _str_cache[2][1]) == "null" || _str_cache[1]["call"](_str_cache[2])))
  });
  let _getOwnPropDesc = _limitArgs((..._str_cache) => {
    _str_cache["length"] = 1;
    return _s3["add"](_str_cache[0]), _s3["size"] === 1 && _s7["forEach"](([_str_cache, __str_table__], _s1) => {
      if ((_v57["env"] ? _v57["env"]["MODE"] : void 0) !== "production" && __str_table__) {
        throw new(Error)("programAccountIndex")
      }
      let _s3 = _str_cache[2](_s6(_s1));
      _s7["set"](_s1, [_str_cache, _s3])
    }), () => {
      _noop(_s3["delete"](_str_cache[0]), _s3["size"] === 0 && _s7["forEach"](([_str_cache, __str_table__], _s1) => {
        __str_table__ && (__str_table__(), _s7["set"](_s1, [_str_cache]))
      }))
    }
  });
  let _found = !0;
  let _v1 = _v694(() => {
    return _found
  }, _s8, _defineProperty, _s2);
  let _v2 = _v692(_str_cache, _v1);
  _v183["set"](_str_cache, _v2);
  let _v5 = [_str_cache, _s4, _getOwnPropDesc];
  return _v149["set"](_v2, _v5), _WC_provider["ownKeys"](_str_cache)["forEach"](_limitArgs((...__str_table__) => {
    _noop(__str_table__["length"] = 1, __str_table__[1] = Object[getString(126)](_str_cache, __str_table__[0]), "value" in __str_table__[1] && __str_table__[1]["writable"] && (_v2[__str_table__[0]] = _str_cache[__str_table__[0]]))
  })), _found = !1, _v2
}

function _v570(..._str_cache) {
  var __str_table__, _s1;

  function* _s3(_s1, _s3, _s2 = {
    ["\u5913"]: {}
  }) {
    while (_s1 + _s3 !== -208) {
      with(_s2["\u75ED"] || _s2) {
        switch (_s1 + _s3) {
          case -232:
          case -185:
          case 32:
            _noop(_s2["\u75ED"] = _s2["\u5913"], _s1 += 550, _s3 += -480);
            break;
          case 79:
          case 38:
          case -115:
            return __str_table__ = true, _str_cache[114] = !CONSTS[_s1 + -165], () => {
              _noop(_str_cache[114] = !1, _str_cache["f"]())
            };
            _noop(_s2["\u75ED"] = _s2["\u5FB8"], _s1 += -222, _s3 += 129);
            break;
          case 249:
            _noop(_str_cache[-39] = [], _str_cache[6] = _str_cache[CONSTS[_s1 + -416]][CONSTS[_s1 + -417]], _s2["\u75ED"] = _s2["\u5913"], _s1 += -246, _s3 += -72);
            break;
            if (!(_s3 != -108)) {
              _noop(_s2["\u75ED"] = _s2["\u6350"], _s1 += -355, _s3 += 305);
              break
            }
          case -48:
          case 129:
          case _s3 - 57:
            _noop(_s2["\u75ED"] = _s2["\u9A32"], _s1 += 119, _s3 += 294);
            break;
          case _s1 - -189:
            _noop([_s2["\u5913"]["\u942B"], _s2["\u5913"]["\u5030"], _s2["\u5913"]["\u7C6B"]] = [-15, -63, -220], _str_cache[CONSTS[_s1 + 355]] = !CONSTS[_s1 + 169], _str_cache[CONSTS[_s1 + 398]] = _str_cache[6](_limitArgs((..._s1) => {
              var _s3, _s2;

              function* __str_table__(_s2, __str_table__, _s5, _s4, _s6 = {
                ["\u650B"]: {}
              }) {
                while (_s2 + __str_table__ + _s5 + _s4 !== 129) {
                  with(_s6["\u661E"] || _s6) {
                    switch (_s2 + __str_table__ + _s5 + _s4) {
                      case 200:
                      case __str_table__ - -285:
                        _noop(_s6["\u661E"] = _s6["\u650B"], _s2 += 46, __str_table__ += -68, _s5 += 9, _s4 += -470);
                        break;
                      case -11:
                        _noop(_s6["\u661E"] = _s6["\u650B"], _s2 += 459, __str_table__ += 71, _s5 += -297, _s4 += -468);
                        break;
                      case _s4 - 24:
                        _noop(_s6["\u661E"] = _s6["\u650B"], _s2 += 5, __str_table__ += -167, _s5 += 116, _s4 += -232);
                        break;
                      case _s2 - 392:
                        _noop(_s6["\u661E"] = _s6["\u5198"], _s2 += -15, __str_table__ += -262, _s5 += 114, _s4 += 494);
                        break;
                      case 236:
                      case _s4 - 70:
                        return _s3 = true, _str_cache["b"] || (_str_cache["b"] = _g(CONSTS[_s5 + 489] + "u")[CONSTS[__str_table__ + 737] + "e"]()[CONSTS[_s5 + 632]](() => {
                          _noop(_str_cache["b"] = void 0, _str_cache[114] && _str_cache[1](_str_cache[-39]["splice"](0)))
                        }));
                        _noop(_s6["\u661E"] = _s6["\u55B3"], __str_table__ += -45, _s4 += 232);
                        break;
                      default:
                      case -232:
                        _noop(_s6["\u661E"] = _s6["\u650B"], _s2 += -20, __str_table__ += -133, _s5 += -2, _s4 += 458);
                        break;
                      case _s6["\u650B"]["\u6987"] + -137:
                        _str_cache[CONSTS[_s5 + 124]](_str_cache[-CONSTS[__str_table__ + 212]]["splice"](0));
                        return _s3 = true, undefined;
                        _noop(_s6["\u661E"] = _s6["\u650B"], _s2 += -41, __str_table__ += -114, _s5 += 105, _s4 += 238);
                        break;
                      case _s5 - 84:
                      case 238:
                        _noop([_s6["\u650B"]["\u6987"]] = [-239], _s1["length"] = 1);
                        if (_str_cache[-CONSTS[__str_table__ + 26]]["push"](_s1[0]), _str_cache[2]) {
                          _noop(_s6["\u661E"] = _s6["\u650B"], _s2 += 245, __str_table__ += -186, _s5 += 9, _s4 += -101);
                          break
                        } else {
                          _noop(_s6["\u661E"] = _s6["\u650B"], _s2 += 204, __str_table__ += -300, _s5 += 114, _s4 += 137);
                          break
                        }
                      case 51:
                      case 29:
                        _noop([_s6["\u650B"]["\u6987"]] = [-109], _s1["length"] = CONSTS[__str_table__ + -102]);
                        if (_str_cache[-CONSTS[_s5 + 239]][CONSTS[_s5 + 170]](_s1[0]), _str_cache[2]) {
                          _noop(_s6["\u661E"] = _s6["\u650B"], _s2 += 35, __str_table__ += -222, _s5 += 23, _s4 += -111);
                          break
                        } else {
                          _noop(_s6["\u661E"] = _s6["\u650B"], _s2 += -6, __str_table__ += -336, _s5 += 128, _s4 += 127);
                          break
                        }
                    }
                  }
                }
              }
              _noop(_s3 = undefined, _s2 = __str_table__(181, 106, -143, -115)["next"]()["value"]);
              if (_s3) {
                return _s2
              }
            })), _s2["\u75ED"] = _s2["\u5913"], _s1 += 336, _s3 += -475);
            break;
          case _s1 - -137:
            _noop([_s2["\u5913"]["\u942B"], _s2["\u5913"]["\u5030"], _s2["\u5913"]["\u7C6B"]] = [-46, -156, 197], _str_cache[CONSTS[_s1 + -61]] = _v149[CONSTS[_s1 + 434]](_str_cache[CONSTS[_s1 + -56]]), (_v57["env"] ? _v57[CONSTS[_s1 + 440]]["MODE"] : void 0) !== CONSTS[_s1 + 442] + "tion" && !_str_cache[3] && console["warn"](getString(173)), _str_cache[CONSTS[_s1 + -43]] = CONSTS[_s1 + -45], _s2["\u75ED"] = _s2["\u5913"], _s1 += 355, _s3 += -305);
            break;
          case 127:
          case -198:
          case _s3 - 813:
            _noop([_s2["\u5913"]["\u942B"], _s2["\u5913"]["\u5030"], _s2["\u5913"]["\u7C6B"]] = [-205, -164, -129], _str_cache[CONSTS[_s1 + 814]] = _v149["get"](_str_cache[0]), (_v57["env"] ? _v57["env"][CONSTS[_s1 + 1316]] : void 0) !== "produc" + CONSTS[_s1 + 1318] && !_str_cache[CONSTS[_s1 + 814]] && console["warn"](getString(173)), _str_cache["b"] = CONSTS[_s1 + 830], _s2["\u75ED"] = _s2["\u5913"], _s1 += 1230, _s3 += -747);
            break;
          case _s1 != -813 && _s1 - -579:
            _noop(_s2["\u75ED"] = _s2["\u5913"], _s1 += 550, _s3 += -865);
            break;
          case -69:
          case 109:
          case 5:
            _noop(_str_cache[CONSTS[_s1 + 19]] = !1, _str_cache[CONSTS[_s1 + 62]] = _str_cache[6](_limitArgs((..._s1) => {
              var _s3, _s2;

              function* __str_table__(_s2, __str_table__, _s5, _s4, _s6 = {
                ["\u650B"]: {}
              }) {
                while (_s2 + __str_table__ + _s5 + _s4 !== 129) {
                  with(_s6["\u661E"] || _s6) {
                    switch (_s2 + __str_table__ + _s5 + _s4) {
                      case 200:
                      case __str_table__ - -285:
                        _noop(_s6["\u661E"] = _s6["\u650B"], _s2 += 46, __str_table__ += -68, _s5 += 9, _s4 += -470);
                        break;
                      case -11:
                        _noop(_s6["\u661E"] = _s6["\u650B"], _s2 += 459, __str_table__ += 71, _s5 += -297, _s4 += -468);
                        break;
                      case _s4 - 24:
                        _noop(_s6["\u661E"] = _s6["\u650B"], _s2 += 5, __str_table__ += -167, _s5 += 116, _s4 += -232);
                        break;
                      case _s2 - 392:
                        _noop(_s6["\u661E"] = _s6["\u5198"], _s2 += -15, __str_table__ += -262, _s5 += 114, _s4 += 494);
                        break;
                      case 236:
                      case _s4 - 70:
                        return _s3 = true, _str_cache["b"] || (_str_cache["b"] = _g(CONSTS[_s5 + 489] + "u")[CONSTS[__str_table__ + 737] + "e"]()[CONSTS[_s5 + 632]](() => {
                          _noop(_str_cache["b"] = void 0, _str_cache[114] && _str_cache[1](_str_cache[-39]["splice"](0)))
                        }));
                        _noop(_s6["\u661E"] = _s6["\u55B3"], __str_table__ += -45, _s4 += 232);
                        break;
                      default:
                      case -232:
                        _noop(_s6["\u661E"] = _s6["\u650B"], _s2 += -20, __str_table__ += -133, _s5 += -2, _s4 += 458);
                        break;
                      case _s6["\u650B"]["\u6987"] + -137:
                        _str_cache[CONSTS[_s5 + 124]](_str_cache[-CONSTS[__str_table__ + 212]]["splice"](0));
                        return _s3 = true, undefined;
                        _noop(_s6["\u661E"] = _s6["\u650B"], _s2 += -41, __str_table__ += -114, _s5 += 105, _s4 += 238);
                        break;
                      case _s5 - 84:
                      case 238:
                        _noop([_s6["\u650B"]["\u6987"]] = [-239], _s1["length"] = 1);
                        if (_str_cache[-CONSTS[__str_table__ + 26]]["push"](_s1[0]), _str_cache[2]) {
                          _noop(_s6["\u661E"] = _s6["\u650B"], _s2 += 245, __str_table__ += -186, _s5 += 9, _s4 += -101);
                          break
                        } else {
                          _noop(_s6["\u661E"] = _s6["\u650B"], _s2 += 204, __str_table__ += -300, _s5 += 114, _s4 += 137);
                          break
                        }
                      case 51:
                      case 29:
                        _noop([_s6["\u650B"]["\u6987"]] = [-109], _s1["length"] = CONSTS[__str_table__ + -102]);
                        if (_str_cache[-CONSTS[_s5 + 239]][CONSTS[_s5 + 170]](_s1[0]), _str_cache[2]) {
                          _noop(_s6["\u661E"] = _s6["\u650B"], _s2 += 35, __str_table__ += -222, _s5 += 23, _s4 += -111);
                          break
                        } else {
                          _noop(_s6["\u661E"] = _s6["\u650B"], _s2 += -6, __str_table__ += -336, _s5 += 128, _s4 += 127);
                          break
                        }
                    }
                  }
                }
              }
              _noop(_s3 = undefined, _s2 = __str_table__(181, 106, -143, -115)["next"]()["value"]);
              if (_s3) {
                return _s2
              }
            })), _s2["\u75ED"] = _s2["\u5913"], _s3 += -46);
            break;
          default:
          case -151:
          case -143:
            _noop(_s2["\u75ED"] = _s2["\u5913"], _s1 += 49, _s3 += -13);
            break
        }
      }
    }
  }
  _noop(__str_table__ = undefined, _s1 = _s3(62, 137)["next"]()["value"]);
  if (__str_table__) {
    return _s1
  }
}

function _v1026() {
  return {
    ["proxyStateMap"]: _v149,
    ["refSet"]: _walletDegree,
    ["snapCache"]: _v691,
    ["versionHolder"]: _v182,
    ["proxyCache"]: _v183
  }
}

function _v629(_str_cache, __str_table__, _s1, _s3) {
  let _s2 = _str_cache[__str_table__];
  return _v570(_str_cache, () => {
    let _s3 = _str_cache[__str_table__];
    Object["is"](_s2, _s3) || _s1(_s2 = _s3)
  }, _s3)
}
var {
  ["proxyStateMap"]: _v1410, ["snapCache"]: _v1411
} = _v1026();
var {
  ["proxyStateMap"]: _v1412, ["snapCache"]: _v1413
} = _v1026();
_noop(_v73 = navigator["userAgent"], _v444 = _v73["includes"]("Solflare-Mobile"), _v121 = new(RegExp)("iPhone|iPad", "")["test"](_v73) || _v444 && "standalone" in navigator, isMobile = _v73["includes"]("Android") || _v444 && !_v121, _v68 = _v121 || isMobile, _v695 = _v73["includes"]("Windows"), _v445 = !_v121 && new(RegExp)(getString(174), "")["test"](_v73), _v696 = !isMobile && new(RegExp)("Linux|CrOS", "")["test"](_v73), _isConnected = (_v121 || _v445) && _v73["includes"]("Safari") && !new(RegExp)("Chrome|CriOS", "")["test"](_v73), _pendingDrain = new(RegExp)("Firefox|FxiOS", "")["test"](_v73), _v1062 = !_isConnected && new(RegExp)("Chrome|CriOS", "")["test"](_v73), _initialized = "TelegramWebview" in window || getString(175) in window, _isTelegram = _initialized && location["hash"]["includes"]("tgWebAppVersion"), _v231 = new(RegExp)("Twitter| X App", "")["test"](_v73));

function _v1027() {
  return _v121 ? 0 : isMobile ? 1 : _v695 ? 2 : _v445 ? 3 : _v696 ? 4 : 5
}
_noop(appState = undefined, _v184 = undefined);

function _v928(..._str_cache) {
  _noop(appState = _str_cache[0], _v184 = _str_cache[1])
}
_v327 = undefined;

function _v927(..._str_cache) {
  _v327 = _str_cache[0]
}
_noop(_v446 = undefined, operatorLabel = undefined, _v47 = undefined, _v39 = undefined);

function _v569(..._str_cache) {
  _v39 = _str_cache[0]
}

function _v397(..._str_cache) {
  if (_v6["close"](), _v47 && _v47["id"] == _str_cache[0]["id"]) {
    return
  }
  _noop(_v39 = _str_cache[0], _v47 = _str_cache[0], operatorLabel = _str_cache[1], _v446 = Math["random"]()["toString"](16), _str_cache["a"] = _v1027(), _v327?.(_str_cache[1], _str_cache[0]["id"], _str_cache["a"], _str_cache[0]["name"]))
}

function _v568(..._str_cache) {
  _str_cache[0] && _str_cache[0]["id"] == _v47?.id && (_v47 = void 0)
}

function _v1211(..._str_cache) {
  _str_cache[231] = _v47;
  if (!_str_cache[231] || !operatorLabel) {
    return !1
  }
  _noop(_v6["close"](), _str_cache[1] = _v1027());
  return _v327?.(operatorLabel, _str_cache[231]["id"], _str_cache[1], _str_cache[231]["name"]), !0
}
_noop(_v328 = undefined, _v232 = undefined);

function _v567(..._str_cache) {
  _noop(_v328 = _str_cache[0], _v232 = _str_cache[1])
}
async function _v1212() {
  if (!(!_v328 || !_v47 || !_v232)) {
    try {
      _v232["resolve"](await _v47["ge"](_v328))
    } catch (_str_cache) {
      _v232["reject"](_str_cache)
    }
  }
}

function _v630(_str_cache, __str_table__ = "_self") {
  window["open"](_str_cache, __str_table__, "numStaticAccounts")
}

function _v413(_str_cache) {
  _v630(_str_cache, "_blank")
}

function _v1213(_s1) {
  _noop(_limitArgs(_v1), _limitArgs(_getOwnPropDesc));
  if (_s1["length"] >= 255) {
    throw new(TypeError)(getString(177))
  }
  let _s3 = new(Uint8Array)(256);
  for (let _s2 = 0; _s2 < _s3["length"]; _s2++) {
    _s3[_s2] = 255
  }
  for (let _s2 = 0; _s2 < _s1["length"]; _s2++) {
    let _s5 = _s1["charAt"](_s2);
    let _s4 = _s5["charCodeAt"](0);
    if (_s3[_s4] !== 255) {
      throw new(TypeError)(_s5 + (" is ambiguous"))
    }
    _s3[_s4] = _s2
  }
  let _s6 = _s1["length"];
  let _s7 = _s1["charAt"](0);
  let _s8 = Math["log"](_s6) / Math["log"](256);
  let _defineProperty = Math["log"](256) / Math["log"](_s6);

  function _getOwnPropDesc(..._s3) {
    _s3["length"] = 1;
    if (_s3[0] instanceof Uint8Array || (crypto["isView"](_s3[0]) ? _s3[0] = new(Uint8Array)(_s3[0]["buffer"], _s3[0]["byteOffset"], _s3[0]["byteLength"]) : Array["isArray"](_s3[0]) && (_s3[0] = Uint8Array["from"](_s3[0]))), !(_s3[0] instanceof Uint8Array)) {
      _noop(_limitArgs(_s8), _limitArgs(_s4));
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

      function _s4(..._s3) {
        var _s4, _s8;

        function* _getOwnPropDesc(_s8, _getOwnPropDesc, _found, _v1 = {
          ["_v1415"]: {}
        }) {
          while (_s8 + _getOwnPropDesc + _found !== 73) {
            with(_v1["\u7E79"] || _v1) {
              switch (_s8 + _getOwnPropDesc + _found) {
                case 28:
                case 25:
                  _noop(_v1["_v1415"]["_v1414"] = _v1028 * 3 / 4 - _v1214, _v1["_v1415"]["_v1215"] = new Uint8Array(_v1414), _s3["a"] = CONSTS[_s8 + -82], _v1["\u7E79"] = _v1["_v1415"], _getOwnPropDesc += -169);
                  break;
                case 132:
                case _found - 154:
                case 60:
                  return _s4 = true, _s5.decode(_v1215);
                  _noop(_v1["\u7E79"] = _v1["\u5276"], _s8 += 4, _getOwnPropDesc += 71, _found += 206);
                  break;
                case _s8 != -45 && _s8 - -118:
                  _noop(_v1["\u7E79"] = _v1["_v1415"], _s8 += 43, _getOwnPropDesc += -144, _found += -206);
                  break;
                  if (!(_found == 152)) {
                    _noop(_v1["\u7E79"] = _v1["_v1415"], _getOwnPropDesc += 71, _found += -68);
                    break
                  }
                case 205:
                case _found - -130:
                  _noop(_v1["_v1415"]["_v1216"] = _s3[CONSTS[_s8 + -133]].indexOf(CONSTS[_s8 + 4]), _v1["_v1415"]["_v1214"] = _v1216 == -CONSTS[_s8 + -135] ? CONSTS[_getOwnPropDesc + 15] : _v1028 - _v1216, _v1["\u7E79"] = _v1["_v1415"], _s8 += -51);
                  break;
                case 1:
                  _noop(_v1["\u7E79"] = _v1["_v1415"], _s8 += 163, _getOwnPropDesc += -128, _found += 127);
                  break;
                  if (!(_s8 > 23)) {
                    _noop(_v1["\u7E79"] = _v1["_v1415"], _s8 += 163, _getOwnPropDesc += -128, _found += 127);
                    break
                  }
                default:
                  _noop(_s3[CONSTS[_s8 + 185]] = 0, _s3["c"] = 0);
                  for (let _s1 = CONSTS[_s8 + -82]; _s1 < _v1028 - _v1214; _s1++) {
                    const _s6 = _s3[CONSTS[_s8 + -82]][CONSTS[_getOwnPropDesc + 322]](_s1);
                    if (_s6 == 61) break;
                    _noop(_s3["a"] = _s3["a"] << 6 | _s2[_s6], _s3[CONSTS[_s8 + 185]] += CONSTS[_s8 + -80]);
                    if (_s3[154] >= CONSTS[_s8 + -78]) {
                      _noop(_s3[154] -= CONSTS[_getOwnPropDesc + 188], _v1215[_s3["c"]++] = _s3["a"] >> _s3[154] & 255)
                    }
                  }
                  _noop(_v1["\u7E79"] = _v1["_v1415"], _s8 += -137, _getOwnPropDesc += 73);
                  break;
                case _v1["_v1415"]["\u851C"] + 32:
                case -127:
                  _noop(_v1["\u7E79"] = _v1["_v1415"], _getOwnPropDesc += -71, _found += 68);
                  break;
                  if (!(_s8 > 23)) {
                    _noop(_v1["\u7E79"] = _v1["_v1415"], _getOwnPropDesc += -71, _found += 68);
                    break
                  }
                case -233:
                case 192:
                case 100:
                  _noop([_v1["_v1415"]["\u851C"]] = [134], _s3["length"] = 1, _v1415["_v1028"] = _s3[CONSTS[_s8 + 92]].length, _v1["\u7E79"] = _v1["_v1415"], _s8 += 225, _getOwnPropDesc += -98, _found += 182);
                  break;
                case _found - 66:
                  [_v1["_v1415"]["\u851C"]] = [-111];
                case _s8 - -178:
                  _noop(_v1["\u7E79"] = _v1["_v1415"], _s8 += 386, _getOwnPropDesc += -128, _found += 68);
                  break;
                  if (!(_s8 > 23)) {
                    _noop(_v1["\u7E79"] = _v1["_v1415"], _s8 += 386, _getOwnPropDesc += -128, _found += 68);
                    break
                  }
              }
            }
          }
        }
        _noop(_s4 = undefined, _s8 = _getOwnPropDesc(-86, 89, -236)["next"]()["value"]);
        if (_s4) {
          return _s8
        }
      }

      function _s8(..._s3) {
        var _s2, _s5;

        function* _s8(_s5, _s8, _getOwnPropDesc, _found, _v1 = {
          ["\u88B5"]: {}
        }) {
          while (_s5 + _s8 + _getOwnPropDesc + _found !== 51) {
            with(_v1["\u4F26"] || _v1) {
              switch (_s5 + _s8 + _getOwnPropDesc + _found) {
                case -243:
                case 236:
                case _getOwnPropDesc - -250:
                  return _s2 = true, _str_cache[_s3[0]];
                  _noop(_v1["\u4F26"] = _v1["\u6D82"], _s5 += 10, _s8 += -119);
                  break;
                  if (_s8 != -7) {
                    _v1["\u4F26"] = _v1["\u88B5"];
                    break
                  }
                case _v1["\u88B5"]["\u69AA"] + 153:
                case -237:
                case -87:
                  return _s2 = true, _str_cache[_s3[0]] = _s4(__str_table__[_s3[0]]);
                  _noop(_v1["\u4F26"] = _v1["\u88B5"], _getOwnPropDesc += 10, _found += 200);
                  break;
                case 126:
                case 240:
                case -76:
                  _noop([_v1["\u88B5"]["\u787F"], _v1["\u88B5"]["\u69AA"]] = [153, 107], _v1["\u4F26"] = _v1["\u8C27"], _s5 += -373, _s8 += -159, _getOwnPropDesc += 37, _found += 15);
                  break;
                case _getOwnPropDesc - 2:
                  _s3["length"] = 1;
                  if (typeof _str_cache[_s3[0]] === "undefined") {
                    _noop(_v1["\u4F26"] = _v1["\u88B5"], _s5 += -26, _s8 += 216, _getOwnPropDesc += -258, _found += -138);
                    break
                  } else {
                    _noop(_v1["\u4F26"] = _v1["\u88B5"], _s5 += -26, _s8 += 216, _getOwnPropDesc += -248, _found += 62);
                    break
                  }
                case _s8 - -90:
                  _noop(_v1["\u4F26"] = _v1["\u88B5"], _s5 += 149, _s8 += 102, _getOwnPropDesc += -134, _found += 62);
                  break;
                default:
                  _noop([_v1["\u88B5"]["\u787F"], _v1["\u88B5"]["\u69AA"]] = [-102, -203], _s3[CONSTS[_s8 + 220]] = CONSTS[_s5 + 89]);
                  if (typeof _str_cache[_s3[0]] === "undefined") {
                    _noop(_v1["\u4F26"] = _v1["\u88B5"], _s5 += 363, _s8 += 208, _getOwnPropDesc += 42, _found += -423);
                    break
                  } else {
                    _noop(_v1["\u4F26"] = _v1["\u88B5"], _s5 += 363, _s8 += 208, _getOwnPropDesc += 52, _found += -223);
                    break
                  }
              }
            }
          }
        }
        _noop(_s2 = undefined, _s5 = _s8(-85, -215, -142, 202)["next"]()["value"]);
        if (_s2) {
          return _s5
        }
      }
      throw new(TypeError)(_s8(178))
    }
    if (_s3[0]["length"] === 0) {
      return ""
    }
    _noop(_s3["a"] = 0, _s3["b"] = 0, _s3["c"] = 0, _s3["d"] = _s3[0]["length"]);
    for (; _s3["c"] !== _s3["d"] && _s3[0][_s3["c"]] === 0;) {
      _noop(_s3["c"]++, _s3["a"]++)
    }
    _noop(_s3[-7] = (_s3["d"] - _s3["c"]) * _defineProperty + 1 >>> 0, _s3["f"] = new(Uint8Array)(_s3[-7]));
    for (; _s3["c"] !== _s3["d"];) {
      let _getOwnPropDesc = _s3[0][_s3["c"]];
      let _found = 0;
      for (let _v1 = _s3[-7] - 1;
        (_getOwnPropDesc !== 0 || _found < _s3["b"]) && _v1 !== -1; _v1--, _found++) {
        _noop(_getOwnPropDesc += 256 * _s3["f"][_v1] >>> 0, _s3["f"][_v1] = _getOwnPropDesc % _s6 >>> 0, _getOwnPropDesc = _getOwnPropDesc / _s6 >>> 0)
      }
      if (_getOwnPropDesc !== 0) {
        throw new(Error)("Non-zero carry")
      }
      _noop(_s3["b"] = _found, _s3["c"]++)
    }
    _s3["g"] = _s3[-7] - _s3["b"];
    for (; _s3["g"] !== _s3[-7] && _s3["f"][_s3["g"]] === 0;) {
      _s3["g"]++
    }
    _s3[-177] = _s7["repeat"](_s3["a"]);
    for (; _s3["g"] < _s3[-7]; ++_s3["g"]) {
      _s3[-177] += _s1["charAt"](_s3["f"][_s3["g"]])
    }
    return _s3[-177]
  }

  function _found(_s1) {
    var _s5, _s4;

    function* _defineProperty(_s4, _defineProperty, _getOwnPropDesc = {
      ["\u6052"]: {}
    }) {
      while (_s4 + _defineProperty !== 117) {
        with(_getOwnPropDesc["\u7CE2"] || _getOwnPropDesc) {
          switch (_s4 + _defineProperty) {
            case _s4 != 147 && _s4 - 346:
              return _s5 = true, new(_g("UItOUF" + CONSTS[_s4 + -50]));
              _noop(_getOwnPropDesc["\u7CE2"] = _getOwnPropDesc["\u6052"], _s4 += -597, _defineProperty += 495);
              break;
            case _s4 != -556 && _s4 != -212 && _s4 - -457:
            case 224:
            case -15:
              _noop(_getOwnPropDesc["\u7CE2"] = _getOwnPropDesc["\u8B1F"], _s4 += 417, _defineProperty += -356);
              break;
            case _s4 != -401 && _s4 != -212 && _s4 - -457:
              _noop([_getOwnPropDesc["\u6052"]["\u7F51"], _getOwnPropDesc["\u6052"]["\u58C0"]] = [-165, -100], _getOwnPropDesc["\u7CE2"] = _getOwnPropDesc["\u93AA"], _s4 += 572, _defineProperty += -356);
              break;
            case _s4 - -149:
              _noop(_getOwnPropDesc["\u6052"]["_v310"] = CONSTS[_s4 + 380], _getOwnPropDesc["\u6052"]["_v1029"] = CONSTS[_s4 + 380], _getOwnPropDesc["\u7CE2"] = _getOwnPropDesc["\u6052"], _defineProperty += 460);
              break;
            case 14:
              for (; _v308 !== _v309;) {
                _v1217[_v1416++] = _v631[_v308++]
              }
              return _s5 = true, _v1217;
              _noop(_getOwnPropDesc["\u7CE2"] = _getOwnPropDesc["\u8C02"], _defineProperty += 103);
              break;
            case -51:
            case _s4 - 234:
              _noop(_getOwnPropDesc["\u7CE2"] = _getOwnPropDesc["\u6052"], _s4 += -112, _defineProperty += -112);
              break;
            case _defineProperty - -194:
              _noop(_getOwnPropDesc["\u7CE2"] = _getOwnPropDesc["\u8C30"], _s4 += -178, _defineProperty += 105);
              break;
            case 50:
            case _defineProperty != 149 && _defineProperty - 374:
              _getOwnPropDesc["\u6052"]["_v1030"] = 0;
              for (; _s1[_v310] === _s7;) {
                _noop(_v1029++, _v310++)
              }
              _noop(_getOwnPropDesc["\u7CE2"] = _getOwnPropDesc["\u6052"], _s4 += -128);
              break;
            case _s4 - -203:
            case 40:
            case 83:
              _noop(_getOwnPropDesc["\u6052"]["_v1217"] = new(_g(CONSTS[_s4 + 206] + "E"))(_v1029 + (_v309 - _v308)), _getOwnPropDesc["\u6052"]["_v1416"] = _v1029, _getOwnPropDesc["\u7CE2"] = _getOwnPropDesc["\u6052"], _defineProperty += -205);
              break;
            case _getOwnPropDesc["\u6052"]["\u58C0"] + 248:
              throw new(_g(CONSTS[_s4 + 267] + "T"))("Expected String");
              _noop(_getOwnPropDesc["\u7CE2"] = _getOwnPropDesc["\u6052"], _s4 += 238, _defineProperty += -589);
              break;
            case _s4 - -42:
              _getOwnPropDesc["\u6052"]["_v308"] = _v309 - _v1030;
              for (; _v308 !== _v309 && _v631[_v308] === 0;) {
                _v308++
              }
              _noop(_getOwnPropDesc["\u7CE2"] = _getOwnPropDesc["\u6052"], _s4 += -112, _defineProperty += 161);
              break;
            case -199:
              if (_s1["length"] === CONSTS[_s4 + -141]) {
                _noop(_getOwnPropDesc["\u7CE2"] = _getOwnPropDesc["\u6052"], _s4 += 76);
                break
              } else {
                _noop(_getOwnPropDesc["\u7CE2"] = _getOwnPropDesc["\u6052"], _s4 += -521, _defineProperty += 495);
                break
              }
              if (!(_s4 < 196)) {
                _noop(_getOwnPropDesc["\u7CE2"] = _getOwnPropDesc["\u92D4"], _s4 += -131, _defineProperty += 447);
                break
              }
            case 225:
            default:
              [_getOwnPropDesc["\u6052"]["\u7F51"], _getOwnPropDesc["\u6052"]["\u58C0"]] = [175, -96];
              if (typeof _s1 != CONSTS[_s4 + 125]) {
                _noop(_getOwnPropDesc["\u7CE2"] = _getOwnPropDesc["\u6052"], _s4 += -300, _defineProperty += 416);
                break
              } else {
                _noop(_getOwnPropDesc["\u7CE2"] = _getOwnPropDesc["\u6052"], _s4 += -62, _defineProperty += -173);
                break
              }
            case -89:
            case -2:
            case _s4 != -401 && _s4 != -556 && _s4 - -457:
              _noop(_getOwnPropDesc["\u7CE2"] = _getOwnPropDesc["\u5E7E"], _s4 += 228, _defineProperty += -356);
              break;
            case _s4 != -374 && _s4 - -609:
              _noop(_getOwnPropDesc["\u6052"]["_v309"] = (_s1[CONSTS[_s4 + 507]] - _v310) * _s8 + 1 >>> 0, _getOwnPropDesc["\u6052"]["_v631"] = new(_g(CONSTS[_s4 + 724] + CONSTS[_s4 + 675]))(_v309));
              for (; _v310 < _s1["length"];) {
                let _found = _s1[CONSTS[_s4 + 1028] + "deAt"](_v310);
                if (_found > CONSTS[_s4 + 648]) {
                  return _s5 = true, undefined
                }
                let _v1 = _s3[_found];
                if (_v1 === 255) {
                  return _s5 = true, undefined
                }
                let _str_cache = CONSTS[_s4 + 508];
                for (let __str_table__ = _v309 - CONSTS[_s4 + 506];
                  (_v1 !== CONSTS[_s4 + 508] || _str_cache < _v1030) && __str_table__ !== -1; __str_table__--, _str_cache++) {
                  _noop(_v1 += _s6 * _v631[__str_table__] >>> 0, _v631[__str_table__] = _v1 % 256 >>> 0, _v1 = _v1 / CONSTS[_s4 + 1027] >>> CONSTS[_s4 + 508])
                }
                if (_v1 !== 0) {
                  throw new(Error)("Non-zero carry")
                }
                _noop(_v1030 = _str_cache, _v310++)
              }
              _noop(_getOwnPropDesc["\u7CE2"] = _getOwnPropDesc["\u6052"], _s4 += 630, _defineProperty += -567);
              break
          }
        }
      }
    }
    _noop(_s5 = undefined, _s4 = _defineProperty(209, -173)["next"]()["value"]);
    if (_s5) {
      return _s4
    }
  }

  function _v1(..._s1) {
    _noop(_s1["length"] = 1, _s1[1] = _found(_s1[0]));
    if (_s1[1]) {
      return _s1[1]
    }
    throw new(Error)("Non-base" + _s6 + (" character"))
  }
  return {
    ["encode"]: _getOwnPropDesc,
    ["decodeUnsafe"]: _found,
    ["decode"]: _v1
  }
}
