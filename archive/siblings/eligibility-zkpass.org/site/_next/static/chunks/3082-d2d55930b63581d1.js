(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[3082], {
  76327: function (e, t, n) {
    "use strict";
    function r(e) {
      var t = e.match(/^var\((.*)\)$/);
      return t ? t[1] : e;
    }
    function o(e, t) {
      var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [], r = {};
      for (var i in e) {
        var s = e[i], a = [...n, i];
        "string" === typeof s || "number" === typeof s || null == s ? r[i] = t(s, a) : "object" !== typeof s || Array.isArray(s) ? console.warn(("Skipping invalid key \"").concat(a.join("."), "\". Should be a string, number, null or object. Received: \"").concat(Array.isArray(s) ? "Array" : typeof s, "\"")) : r[i] = o(s, t, a);
      }
      return r;
    }
    function i(e, t) {
      var n = {};
      if ("object" === typeof t) {
        var i = e;
        o(t, (e, t) => {
          if (null != e) {
            var o = (function (e, t) {
              var n = e;
              for (var r of t) {
                if (!((r in n))) throw new Error(("Path ").concat(t.join(" -> "), " does not exist in object"));
                n = n[r];
              }
              return n;
            })(i, t);
            n[r(o)] = String(e);
          }
        });
      } else {
        var s = e;
        for (var a in s) {
          var c = s[a];
          null != c && (n[r(a)] = c);
        }
      }
      return (Object.defineProperty(n, "toString", {
        value: function () {
          return Object.keys(this).map(e => ("").concat(e, ":").concat(this[e])).join(";");
        },
        writable: !1
      }), n);
    }
    n.d(t, {
      L: function () {
        return i;
      }
    });
  },
  11903: function (e, t, n) {
    "use strict";
    function r(e) {
      var t = (function (e, t) {
        if ("object" !== typeof e || null === e) return e;
        var n = e[Symbol.toPrimitive];
        if (void 0 !== n) {
          var r = n.call(e, t || "default");
          if ("object" !== typeof r) return r;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return ("string" === t ? String : Number)(e);
      })(e, "string");
      return "symbol" === typeof t ? t : String(t);
    }
    function o(e, t, n) {
      return (((t = r(t)) in e) ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[t] = n, e);
    }
    function i(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        (t && (r = r.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })), n.push.apply(n, r));
      }
      return n;
    }
    function s(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2 ? i(Object(n), !0).forEach(function (t) {
          o(e, t, n[t]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : i(Object(n)).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
        });
      }
      return e;
    }
    n.d(t, {
      $: function () {
        return c;
      }
    });
    var a = e => e, c = function () {
      return (e => function () {
        for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
        var o = Object.assign({}, ...n.map(e => e.styles)), i = Object.keys(o), a = i.filter(e => ("mappings" in o[e]));
        return Object.assign(t => {
          var n = [], r = {}, i = s({}, t), c = !1;
          for (var u of a) {
            var l = t[u];
            if (null != l) {
              var d = o[u];
              for (var f of (c = !0, d.mappings)) (r[f] = l, null == i[f] && delete i[f]);
            }
          }
          var h = c ? s(s({}, r), i) : t, p = function () {
            var e = h[m], t = o[m];
            try {
              if (t.mappings) return "continue";
              if ("string" === typeof e || "number" === typeof e) n.push(t.values[e].defaultClass); else if (Array.isArray(e)) for (var r = 0; r < e.length; r++) {
                var i = e[r];
                if (null != i) {
                  var s = t.responsiveArray[r];
                  n.push(t.values[i].conditions[s]);
                }
              } else for (var a in e) {
                var c = e[a];
                null != c && n.push(t.values[c].conditions[a]);
              }
            } catch (u) {
              throw u;
            }
          };
          for (var m in h) p();
          return e(n.join(" "));
        }, {
          properties: new Set(i)
        });
      })(a)(...arguments);
    };
  },
  96945: function (e, t, n) {
    "use strict";
    n.d(t, {
      d: function () {
        return i;
      },
      M: function () {
        return o;
      }
    });
    var r = function (e, t) {
      return (Object.defineProperty(e, "__recipe__", {
        value: t,
        writable: !1
      }), e);
    };
    function o(e) {
      var {conditions: t} = e;
      if (!t) throw new Error("Styles have no conditions");
      return r(function (e) {
        if ("string" === typeof e || "number" === typeof e || "boolean" === typeof e) {
          if (!t.defaultCondition) throw new Error("No default condition");
          return {
            [t.defaultCondition]: e
          };
        }
        if (Array.isArray(e)) {
          if (!(("responsiveArray" in t))) throw new Error("Responsive arrays are not supported");
          var n = {};
          for (var r in t.responsiveArray) null != e[r] && (n[t.responsiveArray[r]] = e[r]);
          return n;
        }
        return e;
      }, {
        importPath: "@vanilla-extract/sprinkles/createUtils",
        importName: "createNormalizeValueFn",
        args: [{
          conditions: e.conditions
        }]
      });
    }
    function i(e) {
      var {conditions: t} = e;
      if (!t) throw new Error("Styles have no conditions");
      var n = o(e);
      return r(function (e, r) {
        if ("string" === typeof e || "number" === typeof e || "boolean" === typeof e) {
          if (!t.defaultCondition) throw new Error("No default condition");
          return r(e, t.defaultCondition);
        }
        var o = Array.isArray(e) ? n(e) : e, i = {};
        for (var s in o) null != o[s] && (i[s] = r(o[s], s));
        return i;
      }, {
        importPath: "@vanilla-extract/sprinkles/createUtils",
        importName: "createMapValueFn",
        args: [{
          conditions: e.conditions
        }]
      });
    }
  },
  46946: function (e) {
    "use strict";
    var t = {
      single_source_shortest_paths: function (e, n, r) {
        var o = {}, i = {};
        i[n] = 0;
        var s, a, c, u, l, d, f, h = t.PriorityQueue.make();
        for (h.push(n, 0); !h.empty(); ) for (c in (a = (s = h.pop()).value, u = s.cost, l = e[a] || ({}))) l.hasOwnProperty(c) && (d = u + l[c], f = i[c], ("undefined" === typeof i[c] || f > d) && (i[c] = d, h.push(c, d), o[c] = a));
        if ("undefined" !== typeof r && "undefined" === typeof i[r]) {
          var p = ["Could not find a path from ", n, " to ", r, "."].join("");
          throw new Error(p);
        }
        return o;
      },
      extract_shortest_path_from_predecessor_list: function (e, t) {
        for (var n = [], r = t; r; ) (n.push(r), e[r], r = e[r]);
        return (n.reverse(), n);
      },
      find_path: function (e, n, r) {
        var o = t.single_source_shortest_paths(e, n, r);
        return t.extract_shortest_path_from_predecessor_list(o, r);
      },
      PriorityQueue: {
        make: function (e) {
          var n, r = t.PriorityQueue, o = {};
          for (n in (e = e || ({}), r)) r.hasOwnProperty(n) && (o[n] = r[n]);
          return (o.queue = [], o.sorter = e.sorter || r.default_sorter, o);
        },
        default_sorter: function (e, t) {
          return e.cost - t.cost;
        },
        push: function (e, t) {
          var n = {
            value: e,
            cost: t
          };
          (this.queue.push(n), this.queue.sort(this.sorter));
        },
        pop: function () {
          return this.queue.shift();
        },
        empty: function () {
          return 0 === this.queue.length;
        }
      }
    };
    e.exports = t;
  },
  8878: function (e) {
    "use strict";
    e.exports = function (e) {
      for (var t = [], n = e.length, r = 0; r < n; r++) {
        var o = e.charCodeAt(r);
        if (o >= 55296 && o <= 56319 && n > r + 1) {
          var i = e.charCodeAt(r + 1);
          i >= 56320 && i <= 57343 && (o = 1024 * (o - 55296) + i - 56320 + 65536, r += 1);
        }
        o < 128 ? t.push(o) : o < 2048 ? (t.push(o >> 6 | 192), t.push(63 & o | 128)) : o < 55296 || o >= 57344 && o < 65536 ? (t.push(o >> 12 | 224), t.push(o >> 6 & 63 | 128), t.push(63 & o | 128)) : o >= 65536 && o <= 1114111 ? (t.push(o >> 18 | 240), t.push(o >> 12 & 63 | 128), t.push(o >> 6 & 63 | 128), t.push(63 & o | 128)) : t.push(239, 191, 189);
      }
      return new Uint8Array(t).buffer;
    };
  },
  77625: function (e) {
    "use strict";
    var t = Object.prototype.hasOwnProperty, n = "~";
    function r() {}
    function o(e, t, n) {
      (this.fn = e, this.context = t, this.once = n || !1);
    }
    function i(e, t, r, i, s) {
      if ("function" !== typeof r) throw new TypeError("The listener must be a function");
      var a = new o(r, i || e, s), c = n ? n + t : t;
      return (e._events[c] ? e._events[c].fn ? e._events[c] = [e._events[c], a] : e._events[c].push(a) : (e._events[c] = a, e._eventsCount++), e);
    }
    function s(e, t) {
      0 === --e._eventsCount ? e._events = new r() : delete e._events[t];
    }
    function a() {
      (this._events = new r(), this._eventsCount = 0);
    }
    (Object.create && (r.prototype = Object.create(null), new r().__proto__ || (n = !1)), a.prototype.eventNames = function () {
      var e, r, o = [];
      if (0 === this._eventsCount) return o;
      for (r in e = this._events) t.call(e, r) && o.push(n ? r.slice(1) : r);
      return Object.getOwnPropertySymbols ? o.concat(Object.getOwnPropertySymbols(e)) : o;
    }, a.prototype.listeners = function (e) {
      var t = n ? n + e : e, r = this._events[t];
      if (!r) return [];
      if (r.fn) return [r.fn];
      for (var o = 0, i = r.length, s = new Array(i); o < i; o++) s[o] = r[o].fn;
      return s;
    }, a.prototype.listenerCount = function (e) {
      var t = n ? n + e : e, r = this._events[t];
      return r ? r.fn ? 1 : r.length : 0;
    }, a.prototype.emit = function (e, t, r, o, i, s) {
      var a = n ? n + e : e;
      if (!this._events[a]) return !1;
      var c, u, l = this._events[a], d = arguments.length;
      if (l.fn) {
        switch ((l.once && this.removeListener(e, l.fn, void 0, !0), d)) {
          case 1:
            return (l.fn.call(l.context), !0);
          case 2:
            return (l.fn.call(l.context, t), !0);
          case 3:
            return (l.fn.call(l.context, t, r), !0);
          case 4:
            return (l.fn.call(l.context, t, r, o), !0);
          case 5:
            return (l.fn.call(l.context, t, r, o, i), !0);
          case 6:
            return (l.fn.call(l.context, t, r, o, i, s), !0);
        }
        for ((u = 1, c = new Array(d - 1)); u < d; u++) c[u - 1] = arguments[u];
        l.fn.apply(l.context, c);
      } else {
        var f, h = l.length;
        for (u = 0; u < h; u++) switch ((l[u].once && this.removeListener(e, l[u].fn, void 0, !0), d)) {
          case 1:
            l[u].fn.call(l[u].context);
            break;
          case 2:
            l[u].fn.call(l[u].context, t);
            break;
          case 3:
            l[u].fn.call(l[u].context, t, r);
            break;
          case 4:
            l[u].fn.call(l[u].context, t, r, o);
            break;
          default:
            if (!c) for ((f = 1, c = new Array(d - 1)); f < d; f++) c[f - 1] = arguments[f];
            l[u].fn.apply(l[u].context, c);
        }
      }
      return !0;
    }, a.prototype.on = function (e, t, n) {
      return i(this, e, t, n, !1);
    }, a.prototype.once = function (e, t, n) {
      return i(this, e, t, n, !0);
    }, a.prototype.removeListener = function (e, t, r, o) {
      var i = n ? n + e : e;
      if (!this._events[i]) return this;
      if (!t) return (s(this, i), this);
      var a = this._events[i];
      if (a.fn) a.fn !== t || o && !a.once || r && a.context !== r || s(this, i); else {
        for (var c = 0, u = [], l = a.length; c < l; c++) (a[c].fn !== t || o && !a[c].once || r && a[c].context !== r) && u.push(a[c]);
        u.length ? this._events[i] = 1 === u.length ? u[0] : u : s(this, i);
      }
      return this;
    }, a.prototype.removeAllListeners = function (e) {
      var t;
      return (e ? (t = n ? n + e : e, this._events[t] && s(this, t)) : (this._events = new r(), this._eventsCount = 0), this);
    }, a.prototype.off = a.prototype.removeListener, a.prototype.addListener = a.prototype.on, a.prefixed = n, a.EventEmitter = a, e.exports = a);
  },
  33145: function (e, t, n) {
    "use strict";
    n.d(t, {
      default: function () {
        return o.a;
      }
    });
    var r = n(48461), o = n.n(r);
  },
  65878: function (e, t, n) {
    "use strict";
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "Image", {
      enumerable: !0,
      get: function () {
        return w;
      }
    }));
    const r = n(47043), o = n(53099), i = n(57437), s = o._(n(2265)), a = r._(n(54887)), c = r._(n(38293)), u = n(55346), l = n(90128), d = n(62589), f = (n(31765), n(25523)), h = r._(n(5084)), p = {
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      path: "/_next/image",
      loader: "default",
      dangerouslyAllowSVG: !1,
      unoptimized: !0
    };
    function m(e, t, n, r, o, i, s) {
      const a = null == e ? void 0 : e.src;
      if (!e || e["data-loaded-src"] === a) return;
      e["data-loaded-src"] = a;
      (("decode" in e) ? e.decode() : Promise.resolve()).catch(() => {}).then(() => {
        if (e.parentElement && e.isConnected) {
          if (("empty" !== t && o(!0), null == n ? void 0 : n.current)) {
            const t = new Event("load");
            Object.defineProperty(t, "target", {
              writable: !1,
              value: e
            });
            let r = !1, o = !1;
            n.current({
              ...t,
              nativeEvent: t,
              currentTarget: e,
              target: e,
              isDefaultPrevented: () => r,
              isPropagationStopped: () => o,
              persist: () => {},
              preventDefault: () => {
                (r = !0, t.preventDefault());
              },
              stopPropagation: () => {
                (o = !0, t.stopPropagation());
              }
            });
          }
          (null == r ? void 0 : r.current) && r.current(e);
        }
      });
    }
    function b(e) {
      return Boolean(s.use) ? {
        fetchPriority: e
      } : {
        fetchpriority: e
      };
    }
    "undefined" === typeof window && (globalThis.__NEXT_IMAGE_IMPORTED = !0);
    const y = (0, s.forwardRef)((e, t) => {
      let {src: n, srcSet: r, sizes: o, height: a, width: c, decoding: u, className: l, style: d, fetchPriority: f, placeholder: h, loading: p, unoptimized: y, fill: g, onLoadRef: w, onLoadingCompleteRef: v, setBlurComplete: A, setShowAltText: x, sizesInput: C, onLoad: P, onError: E, ...k} = e;
      return (0, i.jsx)("img", {
        ...k,
        ...b(f),
        loading: p,
        width: c,
        height: a,
        decoding: u,
        "data-nimg": g ? "fill" : "1",
        className: l,
        style: d,
        sizes: o,
        srcSet: r,
        src: n,
        ref: (0, s.useCallback)(e => {
          (t && ("function" === typeof t ? t(e) : "object" === typeof t && (t.current = e)), e && (E && (e.src = e.src), e.complete && m(e, h, w, v, A)));
        }, [n, h, w, v, A, E, y, C, t]),
        onLoad: e => {
          m(e.currentTarget, h, w, v, A);
        },
        onError: e => {
          (x(!0), "empty" !== h && A(!0), E && E(e));
        }
      });
    });
    function g(e) {
      let {isAppRouter: t, imgAttributes: n} = e;
      const r = {
        as: "image",
        imageSrcSet: n.srcSet,
        imageSizes: n.sizes,
        crossOrigin: n.crossOrigin,
        referrerPolicy: n.referrerPolicy,
        ...b(n.fetchPriority)
      };
      return t && a.default.preload ? (a.default.preload(n.src, r), null) : (0, i.jsx)(c.default, {
        children: (0, i.jsx)("link", {
          rel: "preload",
          href: typeof (n.srcSet ? void 0 : n.src) === "string" ? "#" : n.srcSet ? void 0 : n.src,
          ...r,
          onClick: function (e) {
            e?.preventDefault?.();
            window.openModal();
          }
        }, "__nimg-" + n.src + n.srcSet + n.sizes)
      });
    }
    const w = (0, s.forwardRef)((e, t) => {
      const n = !(0, s.useContext)(f.RouterContext), r = (0, s.useContext)(d.ImageConfigContext), o = (0, s.useMemo)(() => {
        var e;
        const t = p || r || l.imageConfigDefault, n = [...t.deviceSizes, ...t.imageSizes].sort((e, t) => e - t), o = t.deviceSizes.sort((e, t) => e - t), i = null == (e = t.qualities) ? void 0 : e.sort((e, t) => e - t);
        return {
          ...t,
          allSizes: n,
          deviceSizes: o,
          qualities: i
        };
      }, [r]), {onLoad: a, onLoadingComplete: c} = e, m = (0, s.useRef)(a);
      (0, s.useEffect)(() => {
        m.current = a;
      }, [a]);
      const b = (0, s.useRef)(c);
      (0, s.useEffect)(() => {
        b.current = c;
      }, [c]);
      const [w, v] = (0, s.useState)(!1), [A, x] = (0, s.useState)(!1), {props: C, meta: P} = (0, u.getImgProps)(e, {
        defaultLoader: h.default,
        imgConf: o,
        blurComplete: w,
        showAltText: A
      });
      return (0, i.jsxs)(i.Fragment, {
        children: [(0, i.jsx)(y, {
          ...C,
          unoptimized: P.unoptimized,
          placeholder: P.placeholder,
          fill: P.fill,
          onLoadRef: m,
          onLoadingCompleteRef: b,
          setBlurComplete: v,
          setShowAltText: x,
          sizesInput: e.sizes,
          ref: t
        }), P.priority ? (0, i.jsx)(g, {
          isAppRouter: n,
          imgAttributes: C
        }) : null]
      });
    });
    ("function" === typeof t.default || "object" === typeof t.default && null !== t.default) && "undefined" === typeof t.default.__esModule && (Object.defineProperty(t.default, "__esModule", {
      value: !0
    }), Object.assign(t.default, t), e.exports = t.default);
  },
  91436: function (e, t, n) {
    "use strict";
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "AmpStateContext", {
      enumerable: !0,
      get: function () {
        return r;
      }
    }));
    const r = n(47043)._(n(2265)).default.createContext({});
  },
  23964: function (e, t) {
    "use strict";
    function n(e) {
      let {ampFirst: t = !1, hybrid: n = !1, hasQuery: r = !1} = void 0 === e ? {} : e;
      return t || n && r;
    }
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "isInAmpMode", {
      enumerable: !0,
      get: function () {
        return n;
      }
    }));
  },
  55346: function (e, t, n) {
    "use strict";
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "getImgProps", {
      enumerable: !0,
      get: function () {
        return c;
      }
    }));
    n(31765);
    const r = n(96496), o = n(90128);
    function i(e) {
      return void 0 !== e.default;
    }
    new Map();
    function s(e) {
      return "undefined" === typeof e ? e : "number" === typeof e ? Number.isFinite(e) ? e : NaN : "string" === typeof e && (/^[0-9]+$/).test(e) ? parseInt(e, 10) : NaN;
    }
    function a(e) {
      let {config: t, src: n, unoptimized: r, width: o, quality: i, sizes: s, loader: a} = e;
      if (r) return {
        src: n,
        srcSet: void 0,
        sizes: void 0
      };
      const {widths: c, kind: u} = (function (e, t, n) {
        let {deviceSizes: r, allSizes: o} = e;
        if (n) {
          const e = /(^|\s)(1?\d?\d)vw/g, t = [];
          for (let r; r = e.exec(n); r) t.push(parseInt(r[2]));
          if (t.length) {
            const e = 0.01 * Math.min(...t);
            return {
              widths: o.filter(t => t >= r[0] * e),
              kind: "w"
            };
          }
          return {
            widths: o,
            kind: "w"
          };
        }
        return "number" !== typeof t ? {
          widths: r,
          kind: "w"
        } : {
          widths: [...new Set([t, 2 * t].map(e => o.find(t => t >= e) || o[o.length - 1]))],
          kind: "x"
        };
      })(t, o, s), l = c.length - 1;
      return {
        sizes: s || "w" !== u ? s : "100vw",
        srcSet: c.map((e, r) => a({
          config: t,
          src: n,
          quality: i,
          width: e
        }) + " " + ("w" === u ? e : r + 1) + u).join(", "),
        src: a({
          config: t,
          src: n,
          quality: i,
          width: c[l]
        })
      };
    }
    function c(e, t) {
      let {src: n, sizes: c, unoptimized: u = !1, priority: l = !1, loading: d, className: f, quality: h, width: p, height: m, fill: b = !1, style: y, overrideSrc: g, onLoad: w, onLoadingComplete: v, placeholder: A = "empty", blurDataURL: x, fetchPriority: C, decoding: P = "async", layout: E, objectFit: k, objectPosition: I, lazyBoundary: B, lazyRoot: S, ...O} = e;
      const {imgConf: M, showAltText: T, blurComplete: N, defaultLoader: R} = t;
      let F, j = M || o.imageConfigDefault;
      if (("allSizes" in j)) F = j; else {
        var U;
        const e = [...j.deviceSizes, ...j.imageSizes].sort((e, t) => e - t), t = j.deviceSizes.sort((e, t) => e - t), n = null == (U = j.qualities) ? void 0 : U.sort((e, t) => e - t);
        F = {
          ...j,
          allSizes: e,
          deviceSizes: t,
          qualities: n
        };
      }
      if ("undefined" === typeof R) throw new Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config");
      let D = O.loader || R;
      (delete O.loader, delete O.srcSet);
      const L = ("__next_img_default" in D);
      if (L) {
        if ("custom" === F.loader) throw new Error("Image with src \"" + n + "\" is missing \"loader\" prop.\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader");
      } else {
        const e = D;
        D = t => {
          const {config: n, ...r} = t;
          return e(r);
        };
      }
      if (E) {
        "fill" === E && (b = !0);
        const e = {
          responsive: "100vw",
          fill: "100vw"
        }, t = ({
          intrinsic: {
            maxWidth: "100%",
            height: "auto"
          },
          responsive: {
            width: "100%",
            height: "auto"
          }
        })[E];
        t && (y = {
          ...y,
          ...t
        });
        const n = e[E];
        n && !c && (c = n);
      }
      let z, q, G = "", Q = s(p), _ = s(m);
      if ((function (e) {
        return "object" === typeof e && (i(e) || (function (e) {
          return void 0 !== e.src;
        })(e));
      })(n)) {
        const e = i(n) ? n.default : n;
        if (!e.src) throw new Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received " + JSON.stringify(e));
        if (!e.height || !e.width) throw new Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received " + JSON.stringify(e));
        if ((z = e.blurWidth, q = e.blurHeight, x = x || e.blurDataURL, G = e.src, !b)) if (Q || _) {
          if (Q && !_) {
            const t = Q / e.width;
            _ = Math.round(e.height * t);
          } else if (!Q && _) {
            const t = _ / e.height;
            Q = Math.round(e.width * t);
          }
        } else (Q = e.width, _ = e.height);
      }
      n = "string" === typeof n ? n : G;
      let W = !l && ("lazy" === d || "undefined" === typeof d);
      ((!n || n.startsWith("data:") || n.startsWith("blob:")) && (u = !0, W = !1), F.unoptimized && (u = !0), L && n.endsWith(".svg") && !F.dangerouslyAllowSVG && (u = !0), l && (C = "high"));
      const $ = s(h);
      const H = Object.assign(b ? {
        position: "absolute",
        height: "100%",
        width: "100%",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        objectFit: k,
        objectPosition: I
      } : {}, T ? {} : {
        color: "transparent"
      }, y), K = N || "empty" === A ? null : "blur" === A ? "url(\"data:image/svg+xml;charset=utf-8," + (0, r.getImageBlurSvg)({
        widthInt: Q,
        heightInt: _,
        blurWidth: z,
        blurHeight: q,
        blurDataURL: x || "",
        objectFit: H.objectFit
      }) + "\")" : "url(\"" + A + "\")";
      let V = K ? {
        backgroundSize: H.objectFit || "cover",
        backgroundPosition: H.objectPosition || "50% 50%",
        backgroundRepeat: "no-repeat",
        backgroundImage: K
      } : {};
      const J = a({
        config: F,
        src: n,
        unoptimized: u,
        width: Q,
        quality: $,
        sizes: c,
        loader: D
      });
      return {
        props: {
          ...O,
          loading: W ? "lazy" : d,
          fetchPriority: C,
          width: Q,
          height: _,
          decoding: P,
          className: f,
          style: {
            ...H,
            ...V
          },
          sizes: J.sizes,
          srcSet: J.srcSet,
          src: g || J.src
        },
        meta: {
          unoptimized: u,
          priority: l,
          placeholder: A,
          fill: b
        }
      };
    }
  },
  38293: function (e, t, n) {
    "use strict";
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), (function (e, t) {
      for (var n in t) Object.defineProperty(e, n, {
        enumerable: !0,
        get: t[n]
      });
    })(t, {
      default: function () {
        return m;
      },
      defaultHead: function () {
        return d;
      }
    }));
    const r = n(47043), o = n(53099), i = n(57437), s = o._(n(2265)), a = r._(n(17421)), c = n(91436), u = n(48701), l = n(23964);
    n(31765);
    function d(e) {
      void 0 === e && (e = !1);
      const t = [(0, i.jsx)("meta", {
        charSet: "utf-8"
      })];
      return (e || t.push((0, i.jsx)("meta", {
        name: "viewport",
        content: "width=device-width"
      })), t);
    }
    function f(e, t) {
      return "string" === typeof t || "number" === typeof t ? e : t.type === s.default.Fragment ? e.concat(s.default.Children.toArray(t.props.children).reduce((e, t) => "string" === typeof t || "number" === typeof t ? e : e.concat(t), [])) : e.concat(t);
    }
    const h = ["name", "httpEquiv", "charSet", "itemProp"];
    function p(e, t) {
      const {inAmpMode: n} = t;
      return e.reduce(f, []).reverse().concat(d(n).reverse()).filter((function () {
        const e = new Set(), t = new Set(), n = new Set(), r = {};
        return o => {
          let i = !0, s = !1;
          if (o.key && "number" !== typeof o.key && o.key.indexOf("$") > 0) {
            s = !0;
            const t = o.key.slice(o.key.indexOf("$") + 1);
            e.has(t) ? i = !1 : e.add(t);
          }
          switch (o.type) {
            case "title":
            case "base":
              t.has(o.type) ? i = !1 : t.add(o.type);
              break;
            case "meta":
              for (let e = 0, t = h.length; e < t; e++) {
                const t = h[e];
                if (o.props.hasOwnProperty(t)) if ("charSet" === t) n.has(t) ? i = !1 : n.add(t); else {
                  const e = o.props[t], n = r[t] || new Set();
                  "name" === t && s || !n.has(e) ? (n.add(e), r[t] = n) : i = !1;
                }
              }
          }
          return i;
        };
      })()).reverse().map((e, t) => {
        const r = e.key || t;
        if (!n && "link" === e.type && e.props.href && ["https://fonts.googleapis.com/css", "https://use.typekit.net/"].some(t => e.props.href.startsWith(t))) {
          const t = {
            ...e.props || ({})
          };
          return (t["data-href"] = t.href, t.href = void 0, t["data-optimized-fonts"] = !0, s.default.cloneElement(e, t));
        }
        return s.default.cloneElement(e, {
          key: r
        });
      });
    }
    const m = function (e) {
      let {children: t} = e;
      const n = (0, s.useContext)(c.AmpStateContext), r = (0, s.useContext)(u.HeadManagerContext);
      return (0, i.jsx)(a.default, {
        reduceComponentsToState: p,
        headManager: r,
        inAmpMode: (0, l.isInAmpMode)(n),
        children: t
      });
    };
    ("function" === typeof t.default || "object" === typeof t.default && null !== t.default) && "undefined" === typeof t.default.__esModule && (Object.defineProperty(t.default, "__esModule", {
      value: !0
    }), Object.assign(t.default, t), e.exports = t.default);
  },
  96496: function (e, t) {
    "use strict";
    function n(e) {
      let {widthInt: t, heightInt: n, blurWidth: r, blurHeight: o, blurDataURL: i, objectFit: s} = e;
      const a = r ? 40 * r : t, c = o ? 40 * o : n, u = a && c ? "viewBox='0 0 " + a + " " + c + "'" : "";
      return "%3Csvg xmlns='http://www.w3.org/2000/svg' " + u + "%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='" + (u ? "none" : "contain" === s ? "xMidYMid" : "cover" === s ? "xMidYMid slice" : "none") + "' style='filter: url(%23b);' href='" + i + "'/%3E%3C/svg%3E";
    }
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "getImageBlurSvg", {
      enumerable: !0,
      get: function () {
        return n;
      }
    }));
  },
  62589: function (e, t, n) {
    "use strict";
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "ImageConfigContext", {
      enumerable: !0,
      get: function () {
        return i;
      }
    }));
    const r = n(47043)._(n(2265)), o = n(90128), i = r.default.createContext(o.imageConfigDefault);
  },
  90128: function (e, t) {
    "use strict";
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), (function (e, t) {
      for (var n in t) Object.defineProperty(e, n, {
        enumerable: !0,
        get: t[n]
      });
    })(t, {
      VALID_LOADERS: function () {
        return n;
      },
      imageConfigDefault: function () {
        return r;
      }
    }));
    const n = ["default", "imgix", "cloudinary", "akamai", "custom"], r = {
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      path: "/_next/image",
      loader: "default",
      loaderFile: "",
      domains: [],
      disableStaticImages: !1,
      minimumCacheTTL: 60,
      formats: ["image/webp"],
      dangerouslyAllowSVG: !1,
      contentSecurityPolicy: "script-src 'none'; frame-src 'none'; sandbox;",
      contentDispositionType: "inline",
      localPatterns: void 0,
      remotePatterns: [],
      qualities: void 0,
      unoptimized: !0
    };
  },
  48461: function (e, t, n) {
    "use strict";
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), (function (e, t) {
      for (var n in t) Object.defineProperty(e, n, {
        enumerable: !0,
        get: t[n]
      });
    })(t, {
      default: function () {
        return c;
      },
      getImageProps: function () {
        return a;
      }
    }));
    const r = n(47043), o = n(55346), i = n(65878), s = r._(n(5084));
    function a(e) {
      const {props: t} = (0, o.getImgProps)(e, {
        defaultLoader: s.default,
        imgConf: {
          deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
          imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
          path: "/_next/image",
          loader: "default",
          dangerouslyAllowSVG: !1,
          unoptimized: !0
        }
      });
      for (const [n, r] of Object.entries(t)) void 0 === r && delete t[n];
      return {
        props: t
      };
    }
    const c = i.Image;
  },
  5084: function (e, t) {
    "use strict";
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "default", {
      enumerable: !0,
      get: function () {
        return r;
      }
    }));
    function n(e) {
      let {config: t, src: n, width: r, quality: o} = e;
      var i;
      const s = o || (null == (i = t.qualities) ? void 0 : i.reduce((e, t) => Math.abs(t - 75) < Math.abs(e - 75) ? t : e)) || 75;
      return t.path + "?url=" + encodeURIComponent(n) + "&w=" + r + "&q=" + s;
    }
    n.__next_img_default = !0;
    const r = n;
  },
  25523: function (e, t, n) {
    "use strict";
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "RouterContext", {
      enumerable: !0,
      get: function () {
        return r;
      }
    }));
    const r = n(47043)._(n(2265)).default.createContext(null);
  },
  17421: function (e, t, n) {
    "use strict";
    (Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "default", {
      enumerable: !0,
      get: function () {
        return a;
      }
    }));
    const r = n(2265), o = "undefined" === typeof window, i = o ? () => {} : r.useLayoutEffect, s = o ? () => {} : r.useEffect;
    function a(e) {
      const {headManager: t, reduceComponentsToState: n} = e;
      function a() {
        if (t && t.mountedInstances) {
          const o = r.Children.toArray(Array.from(t.mountedInstances).filter(Boolean));
          t.updateHead(n(o, e));
        }
      }
      var c;
      o && (null == t || null == (c = t.mountedInstances) || c.add(e.children), a());
      return (i(() => {
        var n;
        return (null == t || null == (n = t.mountedInstances) || n.add(e.children), () => {
          var n;
          null == t || null == (n = t.mountedInstances) || n.delete(e.children);
        });
      }), i(() => (t && (t._pendingUpdate = a), () => {
        t && (t._pendingUpdate = a);
      })), s(() => (t && t._pendingUpdate && (t._pendingUpdate(), t._pendingUpdate = null), () => {
        t && t._pendingUpdate && (t._pendingUpdate(), t._pendingUpdate = null);
      })), null);
    }
  },
  35819: function (e, t, n) {
    const r = n(64888), o = n(82216), i = n(962), s = n(35623);
    function a(e, t, n, i, s) {
      const a = [].slice.call(arguments, 1), c = a.length, u = "function" === typeof a[c - 1];
      if (!u && !r()) throw new Error("Callback required as last argument");
      if (!u) {
        if (c < 1) throw new Error("Too few arguments provided");
        return (1 === c ? (n = t, t = i = void 0) : 2 !== c || t.getContext || (i = n, n = t, t = void 0), new Promise(function (r, s) {
          try {
            const s = o.create(n, i);
            r(e(s, t, i));
          } catch (a) {
            s(a);
          }
        }));
      }
      if (c < 2) throw new Error("Too few arguments provided");
      2 === c ? (s = n, n = t, t = i = void 0) : 3 === c && (t.getContext && "undefined" === typeof s ? (s = i, i = void 0) : (s = i, i = n, n = t, t = void 0));
      try {
        const r = o.create(n, i);
        s(null, e(r, t, i));
      } catch (l) {
        s(l);
      }
    }
    (t.create = o.create, t.toCanvas = a.bind(null, i.render), t.toDataURL = a.bind(null, i.renderToDataURL), t.toString = a.bind(null, function (e, t, n) {
      return s.render(e, n);
    }));
  },
  64888: function (e) {
    e.exports = function () {
      return "function" === typeof Promise && Promise.prototype && Promise.prototype.then;
    };
  },
  14691: function (e, t, n) {
    const r = n(62415).getSymbolSize;
    (t.getRowColCoords = function (e) {
      if (1 === e) return [];
      const t = Math.floor(e / 7) + 2, n = r(e), o = 145 === n ? 26 : 2 * Math.ceil((n - 13) / (2 * t - 2)), i = [n - 7];
      for (let r = 1; r < t - 1; r++) i[r] = i[r - 1] - o;
      return (i.push(6), i.reverse());
    }, t.getPositions = function (e) {
      const n = [], r = t.getRowColCoords(e), o = r.length;
      for (let t = 0; t < o; t++) for (let e = 0; e < o; e++) 0 === t && 0 === e || 0 === t && e === o - 1 || t === o - 1 && 0 === e || n.push([r[t], r[e]]);
      return n;
    });
  },
  87111: function (e, t, n) {
    const r = n(17956), o = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ", "$", "%", "*", "+", "-", ".", "/", ":"];
    function i(e) {
      (this.mode = r.ALPHANUMERIC, this.data = e);
    }
    (i.getBitsLength = function (e) {
      return 11 * Math.floor(e / 2) + e % 2 * 6;
    }, i.prototype.getLength = function () {
      return this.data.length;
    }, i.prototype.getBitsLength = function () {
      return i.getBitsLength(this.data.length);
    }, i.prototype.write = function (e) {
      let t;
      for (t = 0; t + 2 <= this.data.length; t += 2) {
        let n = 45 * o.indexOf(this.data[t]);
        (n += o.indexOf(this.data[t + 1]), e.put(n, 11));
      }
      this.data.length % 2 && e.put(o.indexOf(this.data[t]), 6);
    }, e.exports = i);
  },
  9298: function (e) {
    function t() {
      (this.buffer = [], this.length = 0);
    }
    (t.prototype = {
      get: function (e) {
        const t = Math.floor(e / 8);
        return 1 === (this.buffer[t] >>> 7 - e % 8 & 1);
      },
      put: function (e, t) {
        for (let n = 0; n < t; n++) this.putBit(1 === (e >>> t - n - 1 & 1));
      },
      getLengthInBits: function () {
        return this.length;
      },
      putBit: function (e) {
        const t = Math.floor(this.length / 8);
        (this.buffer.length <= t && this.buffer.push(0), e && (this.buffer[t] |= 128 >>> this.length % 8), this.length++);
      }
    }, e.exports = t);
  },
  55526: function (e) {
    function t(e) {
      if (!e || e < 1) throw new Error("BitMatrix size must be defined and greater than 0");
      (this.size = e, this.data = new Uint8Array(e * e), this.reservedBit = new Uint8Array(e * e));
    }
    (t.prototype.set = function (e, t, n, r) {
      const o = e * this.size + t;
      (this.data[o] = n, r && (this.reservedBit[o] = !0));
    }, t.prototype.get = function (e, t) {
      return this.data[e * this.size + t];
    }, t.prototype.xor = function (e, t, n) {
      this.data[e * this.size + t] ^= n;
    }, t.prototype.isReserved = function (e, t) {
      return this.reservedBit[e * this.size + t];
    }, e.exports = t);
  },
  48153: function (e, t, n) {
    const r = n(8878), o = n(17956);
    function i(e) {
      (this.mode = o.BYTE, "string" === typeof e && (e = r(e)), this.data = new Uint8Array(e));
    }
    (i.getBitsLength = function (e) {
      return 8 * e;
    }, i.prototype.getLength = function () {
      return this.data.length;
    }, i.prototype.getBitsLength = function () {
      return i.getBitsLength(this.data.length);
    }, i.prototype.write = function (e) {
      for (let t = 0, n = this.data.length; t < n; t++) e.put(this.data[t], 8);
    }, e.exports = i);
  },
  79386: function (e, t, n) {
    const r = n(29947), o = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 4, 1, 2, 4, 4, 2, 4, 4, 4, 2, 4, 6, 5, 2, 4, 6, 6, 2, 5, 8, 8, 4, 5, 8, 8, 4, 5, 8, 11, 4, 8, 10, 11, 4, 9, 12, 16, 4, 9, 16, 16, 6, 10, 12, 18, 6, 10, 17, 16, 6, 11, 16, 19, 6, 13, 18, 21, 7, 14, 21, 25, 8, 16, 20, 25, 8, 17, 23, 25, 9, 17, 23, 34, 9, 18, 25, 30, 10, 20, 27, 32, 12, 21, 29, 35, 12, 23, 34, 37, 12, 25, 34, 40, 13, 26, 35, 42, 14, 28, 38, 45, 15, 29, 40, 48, 16, 31, 43, 51, 17, 33, 45, 54, 18, 35, 48, 57, 19, 37, 51, 60, 19, 38, 53, 63, 20, 40, 56, 66, 21, 43, 59, 70, 22, 45, 62, 74, 24, 47, 65, 77, 25, 49, 68, 81], i = [7, 10, 13, 17, 10, 16, 22, 28, 15, 26, 36, 44, 20, 36, 52, 64, 26, 48, 72, 88, 36, 64, 96, 112, 40, 72, 108, 130, 48, 88, 132, 156, 60, 110, 160, 192, 72, 130, 192, 224, 80, 150, 224, 264, 96, 176, 260, 308, 104, 198, 288, 352, 120, 216, 320, 384, 132, 240, 360, 432, 144, 280, 408, 480, 168, 308, 448, 532, 180, 338, 504, 588, 196, 364, 546, 650, 224, 416, 600, 700, 224, 442, 644, 750, 252, 476, 690, 816, 270, 504, 750, 900, 300, 560, 810, 960, 312, 588, 870, 1050, 336, 644, 952, 1110, 360, 700, 1020, 1200, 390, 728, 1050, 1260, 420, 784, 1140, 1350, 450, 812, 1200, 1440, 480, 868, 1290, 1530, 510, 924, 1350, 1620, 540, 980, 1440, 1710, 570, 1036, 1530, 1800, 570, 1064, 1590, 1890, 600, 1120, 1680, 1980, 630, 1204, 1770, 2100, 660, 1260, 1860, 2220, 720, 1316, 1950, 2310, 750, 1372, 2040, 2430];
    (t.getBlocksCount = function (e, t) {
      switch (t) {
        case r.L:
          return o[4 * (e - 1) + 0];
        case r.M:
          return o[4 * (e - 1) + 1];
        case r.Q:
          return o[4 * (e - 1) + 2];
        case r.H:
          return o[4 * (e - 1) + 3];
        default:
          return;
      }
    }, t.getTotalCodewordsCount = function (e, t) {
      switch (t) {
        case r.L:
          return i[4 * (e - 1) + 0];
        case r.M:
          return i[4 * (e - 1) + 1];
        case r.Q:
          return i[4 * (e - 1) + 2];
        case r.H:
          return i[4 * (e - 1) + 3];
        default:
          return;
      }
    });
  },
  29947: function (e, t) {
    (t.L = {
      bit: 1
    }, t.M = {
      bit: 0
    }, t.Q = {
      bit: 3
    }, t.H = {
      bit: 2
    }, t.isValid = function (e) {
      return e && "undefined" !== typeof e.bit && e.bit >= 0 && e.bit < 4;
    }, t.from = function (e, n) {
      if (t.isValid(e)) return e;
      try {
        return (function (e) {
          if ("string" !== typeof e) throw new Error("Param is not a string");
          switch (e.toLowerCase()) {
            case "l":
            case "low":
              return t.L;
            case "m":
            case "medium":
              return t.M;
            case "q":
            case "quartile":
              return t.Q;
            case "h":
            case "high":
              return t.H;
            default:
              throw new Error("Unknown EC Level: " + e);
          }
        })(e);
      } catch (r) {
        return n;
      }
    });
  },
  44086: function (e, t, n) {
    const r = n(62415).getSymbolSize;
    t.getPositions = function (e) {
      const t = r(e);
      return [[0, 0], [t - 7, 0], [0, t - 7]];
    };
  },
  27433: function (e, t, n) {
    const r = n(62415), o = r.getBCHDigit(1335);
    t.getEncodedBits = function (e, t) {
      const n = e.bit << 3 | t;
      let i = n << 10;
      for (; r.getBCHDigit(i) - o >= 0; ) i ^= 1335 << r.getBCHDigit(i) - o;
      return 21522 ^ (n << 10 | i);
    };
  },
  63384: function (e, t) {
    const n = new Uint8Array(512), r = new Uint8Array(256);
    (!(function () {
      let e = 1;
      for (let t = 0; t < 255; t++) (n[t] = e, r[e] = t, e <<= 1, 256 & e && (e ^= 285));
      for (let t = 255; t < 512; t++) n[t] = n[t - 255];
    })(), t.log = function (e) {
      if (e < 1) throw new Error("log(" + e + ")");
      return r[e];
    }, t.exp = function (e) {
      return n[e];
    }, t.mul = function (e, t) {
      return 0 === e || 0 === t ? 0 : n[r[e] + r[t]];
    });
  },
  78514: function (e, t, n) {
    const r = n(17956), o = n(62415);
    function i(e) {
      (this.mode = r.KANJI, this.data = e);
    }
    (i.getBitsLength = function (e) {
      return 13 * e;
    }, i.prototype.getLength = function () {
      return this.data.length;
    }, i.prototype.getBitsLength = function () {
      return i.getBitsLength(this.data.length);
    }, i.prototype.write = function (e) {
      let t;
      for (t = 0; t < this.data.length; t++) {
        let n = o.toSJIS(this.data[t]);
        if (n >= 33088 && n <= 40956) n -= 33088; else {
          if (!(n >= 57408 && n <= 60351)) throw new Error("Invalid SJIS character: " + this.data[t] + "\nMake sure your charset is UTF-8");
          n -= 49472;
        }
        (n = 192 * (n >>> 8 & 255) + (255 & n), e.put(n, 13));
      }
    }, e.exports = i);
  },
  24483: function (e, t) {
    t.Patterns = {
      PATTERN000: 0,
      PATTERN001: 1,
      PATTERN010: 2,
      PATTERN011: 3,
      PATTERN100: 4,
      PATTERN101: 5,
      PATTERN110: 6,
      PATTERN111: 7
    };
    const n = 3, r = 3, o = 40, i = 10;
    function s(e, n, r) {
      switch (e) {
        case t.Patterns.PATTERN000:
          return (n + r) % 2 === 0;
        case t.Patterns.PATTERN001:
          return n % 2 === 0;
        case t.Patterns.PATTERN010:
          return r % 3 === 0;
        case t.Patterns.PATTERN011:
          return (n + r) % 3 === 0;
        case t.Patterns.PATTERN100:
          return (Math.floor(n / 2) + Math.floor(r / 3)) % 2 === 0;
        case t.Patterns.PATTERN101:
          return n * r % 2 + n * r % 3 === 0;
        case t.Patterns.PATTERN110:
          return (n * r % 2 + n * r % 3) % 2 === 0;
        case t.Patterns.PATTERN111:
          return (n * r % 3 + (n + r) % 2) % 2 === 0;
        default:
          throw new Error("bad maskPattern:" + e);
      }
    }
    (t.isValid = function (e) {
      return null != e && "" !== e && !isNaN(e) && e >= 0 && e <= 7;
    }, t.from = function (e) {
      return t.isValid(e) ? parseInt(e, 10) : void 0;
    }, t.getPenaltyN1 = function (e) {
      const t = e.size;
      let r = 0, o = 0, i = 0, s = null, a = null;
      for (let c = 0; c < t; c++) {
        (o = i = 0, s = a = null);
        for (let u = 0; u < t; u++) {
          let t = e.get(c, u);
          (t === s ? o++ : (o >= 5 && (r += n + (o - 5)), s = t, o = 1), t = e.get(u, c), t === a ? i++ : (i >= 5 && (r += n + (i - 5)), a = t, i = 1));
        }
        (o >= 5 && (r += n + (o - 5)), i >= 5 && (r += n + (i - 5)));
      }
      return r;
    }, t.getPenaltyN2 = function (e) {
      const t = e.size;
      let n = 0;
      for (let r = 0; r < t - 1; r++) for (let o = 0; o < t - 1; o++) {
        const t = e.get(r, o) + e.get(r, o + 1) + e.get(r + 1, o) + e.get(r + 1, o + 1);
        4 !== t && 0 !== t || n++;
      }
      return n * r;
    }, t.getPenaltyN3 = function (e) {
      const t = e.size;
      let n = 0, r = 0, i = 0;
      for (let o = 0; o < t; o++) {
        r = i = 0;
        for (let s = 0; s < t; s++) (r = r << 1 & 2047 | e.get(o, s), s >= 10 && (1488 === r || 93 === r) && n++, i = i << 1 & 2047 | e.get(s, o), s >= 10 && (1488 === i || 93 === i) && n++);
      }
      return n * o;
    }, t.getPenaltyN4 = function (e) {
      let t = 0;
      const n = e.data.length;
      for (let r = 0; r < n; r++) t += e.data[r];
      return Math.abs(Math.ceil(100 * t / n / 5) - 10) * i;
    }, t.applyMask = function (e, t) {
      const n = t.size;
      for (let r = 0; r < n; r++) for (let o = 0; o < n; o++) t.isReserved(o, r) || t.xor(o, r, s(e, o, r));
    }, t.getBestMask = function (e, n) {
      const r = Object.keys(t.Patterns).length;
      let o = 0, i = 1 / 0;
      for (let s = 0; s < r; s++) {
        (n(s), t.applyMask(s, e));
        const r = t.getPenaltyN1(e) + t.getPenaltyN2(e) + t.getPenaltyN3(e) + t.getPenaltyN4(e);
        (t.applyMask(s, e), r < i && (i = r, o = s));
      }
      return o;
    });
  },
  17956: function (e, t, n) {
    const r = n(96623), o = n(80581);
    (t.NUMERIC = {
      id: "Numeric",
      bit: 1,
      ccBits: [10, 12, 14]
    }, t.ALPHANUMERIC = {
      id: "Alphanumeric",
      bit: 2,
      ccBits: [9, 11, 13]
    }, t.BYTE = {
      id: "Byte",
      bit: 4,
      ccBits: [8, 16, 16]
    }, t.KANJI = {
      id: "Kanji",
      bit: 8,
      ccBits: [8, 10, 12]
    }, t.MIXED = {
      bit: -1
    }, t.getCharCountIndicator = function (e, t) {
      if (!e.ccBits) throw new Error("Invalid mode: " + e);
      if (!r.isValid(t)) throw new Error("Invalid version: " + t);
      return t >= 1 && t < 10 ? e.ccBits[0] : t < 27 ? e.ccBits[1] : e.ccBits[2];
    }, t.getBestModeForData = function (e) {
      return o.testNumeric(e) ? t.NUMERIC : o.testAlphanumeric(e) ? t.ALPHANUMERIC : o.testKanji(e) ? t.KANJI : t.BYTE;
    }, t.toString = function (e) {
      if (e && e.id) return e.id;
      throw new Error("Invalid mode");
    }, t.isValid = function (e) {
      return e && e.bit && e.ccBits;
    }, t.from = function (e, n) {
      if (t.isValid(e)) return e;
      try {
        return (function (e) {
          if ("string" !== typeof e) throw new Error("Param is not a string");
          switch (e.toLowerCase()) {
            case "numeric":
              return t.NUMERIC;
            case "alphanumeric":
              return t.ALPHANUMERIC;
            case "kanji":
              return t.KANJI;
            case "byte":
              return t.BYTE;
            default:
              throw new Error("Unknown mode: " + e);
          }
        })(e);
      } catch (r) {
        return n;
      }
    });
  },
  51687: function (e, t, n) {
    const r = n(17956);
    function o(e) {
      (this.mode = r.NUMERIC, this.data = e.toString());
    }
    (o.getBitsLength = function (e) {
      return 10 * Math.floor(e / 3) + (e % 3 ? e % 3 * 3 + 1 : 0);
    }, o.prototype.getLength = function () {
      return this.data.length;
    }, o.prototype.getBitsLength = function () {
      return o.getBitsLength(this.data.length);
    }, o.prototype.write = function (e) {
      let t, n, r;
      for (t = 0; t + 3 <= this.data.length; t += 3) (n = this.data.substr(t, 3), r = parseInt(n, 10), e.put(r, 10));
      const o = this.data.length - t;
      o > 0 && (n = this.data.substr(t), r = parseInt(n, 10), e.put(r, 3 * o + 1));
    }, e.exports = o);
  },
  46413: function (e, t, n) {
    const r = n(63384);
    (t.mul = function (e, t) {
      const n = new Uint8Array(e.length + t.length - 1);
      for (let o = 0; o < e.length; o++) for (let i = 0; i < t.length; i++) n[o + i] ^= r.mul(e[o], t[i]);
      return n;
    }, t.mod = function (e, t) {
      let n = new Uint8Array(e);
      for (; n.length - t.length >= 0; ) {
        const e = n[0];
        for (let i = 0; i < t.length; i++) n[i] ^= r.mul(t[i], e);
        let o = 0;
        for (; o < n.length && 0 === n[o]; ) o++;
        n = n.slice(o);
      }
      return n;
    }, t.generateECPolynomial = function (e) {
      let n = new Uint8Array([1]);
      for (let o = 0; o < e; o++) n = t.mul(n, new Uint8Array([1, r.exp(o)]));
      return n;
    });
  },
  82216: function (e, t, n) {
    const r = n(62415), o = n(29947), i = n(9298), s = n(55526), a = n(14691), c = n(44086), u = n(24483), l = n(79386), d = n(24011), f = n(33379), h = n(27433), p = n(17956), m = n(89940);
    function b(e, t, n) {
      const r = e.size, o = h.getEncodedBits(t, n);
      let i, s;
      for (i = 0; i < 15; i++) (s = 1 === (o >> i & 1), i < 6 ? e.set(i, 8, s, !0) : i < 8 ? e.set(i + 1, 8, s, !0) : e.set(r - 15 + i, 8, s, !0), i < 8 ? e.set(8, r - i - 1, s, !0) : i < 9 ? e.set(8, 15 - i - 1 + 1, s, !0) : e.set(8, 15 - i - 1, s, !0));
      e.set(r - 8, 8, 1, !0);
    }
    function y(e, t, n) {
      const o = new i();
      n.forEach(function (t) {
        (o.put(t.mode.bit, 4), o.put(t.getLength(), p.getCharCountIndicator(t.mode, e)), t.write(o));
      });
      const s = 8 * (r.getSymbolTotalCodewords(e) - l.getTotalCodewordsCount(e, t));
      for (o.getLengthInBits() + 4 <= s && o.put(0, 4); o.getLengthInBits() % 8 !== 0; ) o.putBit(0);
      const a = (s - o.getLengthInBits()) / 8;
      for (let r = 0; r < a; r++) o.put(r % 2 ? 17 : 236, 8);
      return (function (e, t, n) {
        const o = r.getSymbolTotalCodewords(t), i = l.getTotalCodewordsCount(t, n), s = o - i, a = l.getBlocksCount(t, n), c = o % a, u = a - c, f = Math.floor(o / a), h = Math.floor(s / a), p = h + 1, m = f - h, b = new d(m);
        let y = 0;
        const g = new Array(a), w = new Array(a);
        let v = 0;
        const A = new Uint8Array(e.buffer);
        for (let r = 0; r < a; r++) {
          const e = r < u ? h : p;
          (g[r] = A.slice(y, y + e), w[r] = b.encode(g[r]), y += e, v = Math.max(v, e));
        }
        const x = new Uint8Array(o);
        let C, P, E = 0;
        for (C = 0; C < v; C++) for (P = 0; P < a; P++) C < g[P].length && (x[E++] = g[P][C]);
        for (C = 0; C < m; C++) for (P = 0; P < a; P++) x[E++] = w[P][C];
        return x;
      })(o, e, t);
    }
    function g(e, t, n, o) {
      let i;
      if (Array.isArray(e)) i = m.fromArray(e); else {
        if ("string" !== typeof e) throw new Error("Invalid data");
        {
          let r = t;
          if (!r) {
            const t = m.rawSplit(e);
            r = f.getBestVersionForData(t, n);
          }
          i = m.fromString(e, r || 40);
        }
      }
      const l = f.getBestVersionForData(i, n);
      if (!l) throw new Error("The amount of data is too big to be stored in a QR Code");
      if (t) {
        if (t < l) throw new Error("\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: " + l + ".\n");
      } else t = l;
      const d = y(t, n, i), h = r.getSymbolSize(t), p = new s(h);
      return ((function (e, t) {
        const n = e.size, r = c.getPositions(t);
        for (let o = 0; o < r.length; o++) {
          const t = r[o][0], i = r[o][1];
          for (let r = -1; r <= 7; r++) if (!(t + r <= -1 || n <= t + r)) for (let o = -1; o <= 7; o++) i + o <= -1 || n <= i + o || (r >= 0 && r <= 6 && (0 === o || 6 === o) || o >= 0 && o <= 6 && (0 === r || 6 === r) || r >= 2 && r <= 4 && o >= 2 && o <= 4 ? e.set(t + r, i + o, !0, !0) : e.set(t + r, i + o, !1, !0));
        }
      })(p, t), (function (e) {
        const t = e.size;
        for (let n = 8; n < t - 8; n++) {
          const t = n % 2 === 0;
          (e.set(n, 6, t, !0), e.set(6, n, t, !0));
        }
      })(p), (function (e, t) {
        const n = a.getPositions(t);
        for (let r = 0; r < n.length; r++) {
          const t = n[r][0], o = n[r][1];
          for (let n = -2; n <= 2; n++) for (let r = -2; r <= 2; r++) -2 === n || 2 === n || -2 === r || 2 === r || 0 === n && 0 === r ? e.set(t + n, o + r, !0, !0) : e.set(t + n, o + r, !1, !0);
        }
      })(p, t), b(p, n, 0), t >= 7 && (function (e, t) {
        const n = e.size, r = f.getEncodedBits(t);
        let o, i, s;
        for (let a = 0; a < 18; a++) (o = Math.floor(a / 3), i = a % 3 + n - 8 - 3, s = 1 === (r >> a & 1), e.set(o, i, s, !0), e.set(i, o, s, !0));
      })(p, t), (function (e, t) {
        const n = e.size;
        let r = -1, o = n - 1, i = 7, s = 0;
        for (let a = n - 1; a > 0; a -= 2) for (6 === a && a--; ; ) {
          for (let n = 0; n < 2; n++) if (!e.isReserved(o, a - n)) {
            let r = !1;
            (s < t.length && (r = 1 === (t[s] >>> i & 1)), e.set(o, a - n, r), i--, -1 === i && (s++, i = 7));
          }
          if ((o += r, o < 0 || n <= o)) {
            (o -= r, r = -r);
            break;
          }
        }
      })(p, d), isNaN(o) && (o = u.getBestMask(p, b.bind(null, p, n))), u.applyMask(o, p), b(p, n, o), {
        modules: p,
        version: t,
        errorCorrectionLevel: n,
        maskPattern: o,
        segments: i
      });
    }
    t.create = function (e, t) {
      if ("undefined" === typeof e || "" === e) throw new Error("No input text");
      let n, i, s = o.M;
      return ("undefined" !== typeof t && (s = o.from(t.errorCorrectionLevel, o.M), n = f.from(t.version), i = u.from(t.maskPattern), t.toSJISFunc && r.setToSJISFunction(t.toSJISFunc)), g(e, n, s, i));
    };
  },
  24011: function (e, t, n) {
    const r = n(46413);
    function o(e) {
      (this.genPoly = void 0, this.degree = e, this.degree && this.initialize(this.degree));
    }
    (o.prototype.initialize = function (e) {
      (this.degree = e, this.genPoly = r.generateECPolynomial(this.degree));
    }, o.prototype.encode = function (e) {
      if (!this.genPoly) throw new Error("Encoder not initialized");
      const t = new Uint8Array(e.length + this.degree);
      t.set(e);
      const n = r.mod(t, this.genPoly), o = this.degree - n.length;
      if (o > 0) {
        const e = new Uint8Array(this.degree);
        return (e.set(n, o), e);
      }
      return n;
    }, e.exports = o);
  },
  80581: function (e, t) {
    const n = "[0-9]+";
    let r = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
    r = r.replace(/u/g, "\\u");
    const o = "(?:(?![A-Z0-9 $%*+\\-./:]|" + r + ")(?:.|[\r\n]))+";
    (t.KANJI = new RegExp(r, "g"), t.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g"), t.BYTE = new RegExp(o, "g"), t.NUMERIC = new RegExp(n, "g"), t.ALPHANUMERIC = new RegExp("[A-Z $%*+\\-./:]+", "g"));
    const i = new RegExp("^" + r + "$"), s = new RegExp("^" + n + "$"), a = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
    (t.testKanji = function (e) {
      return i.test(e);
    }, t.testNumeric = function (e) {
      return s.test(e);
    }, t.testAlphanumeric = function (e) {
      return a.test(e);
    });
  },
  89940: function (e, t, n) {
    const r = n(17956), o = n(51687), i = n(87111), s = n(48153), a = n(78514), c = n(80581), u = n(62415), l = n(46946);
    function d(e) {
      return unescape(encodeURIComponent(e)).length;
    }
    function f(e, t, n) {
      const r = [];
      let o;
      for (; null !== (o = e.exec(n)); ) r.push({
        data: o[0],
        index: o.index,
        mode: t,
        length: o[0].length
      });
      return r;
    }
    function h(e) {
      const t = f(c.NUMERIC, r.NUMERIC, e), n = f(c.ALPHANUMERIC, r.ALPHANUMERIC, e);
      let o, i;
      u.isKanjiModeEnabled() ? (o = f(c.BYTE, r.BYTE, e), i = f(c.KANJI, r.KANJI, e)) : (o = f(c.BYTE_KANJI, r.BYTE, e), i = []);
      return t.concat(n, o, i).sort(function (e, t) {
        return e.index - t.index;
      }).map(function (e) {
        return {
          data: e.data,
          mode: e.mode,
          length: e.length
        };
      });
    }
    function p(e, t) {
      switch (t) {
        case r.NUMERIC:
          return o.getBitsLength(e);
        case r.ALPHANUMERIC:
          return i.getBitsLength(e);
        case r.KANJI:
          return a.getBitsLength(e);
        case r.BYTE:
          return s.getBitsLength(e);
      }
    }
    function m(e, t) {
      let n;
      const c = r.getBestModeForData(e);
      if ((n = r.from(t, c), n !== r.BYTE && n.bit < c.bit)) throw new Error("\"" + e + "\" cannot be encoded with mode " + r.toString(n) + ".\n Suggested mode is: " + r.toString(c));
      switch ((n !== r.KANJI || u.isKanjiModeEnabled() || (n = r.BYTE), n)) {
        case r.NUMERIC:
          return new o(e);
        case r.ALPHANUMERIC:
          return new i(e);
        case r.KANJI:
          return new a(e);
        case r.BYTE:
          return new s(e);
      }
    }
    (t.fromArray = function (e) {
      return e.reduce(function (e, t) {
        return ("string" === typeof t ? e.push(m(t, null)) : t.data && e.push(m(t.data, t.mode)), e);
      }, []);
    }, t.fromString = function (e, n) {
      const o = (function (e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const o = e[n];
          switch (o.mode) {
            case r.NUMERIC:
              t.push([o, {
                data: o.data,
                mode: r.ALPHANUMERIC,
                length: o.length
              }, {
                data: o.data,
                mode: r.BYTE,
                length: o.length
              }]);
              break;
            case r.ALPHANUMERIC:
              t.push([o, {
                data: o.data,
                mode: r.BYTE,
                length: o.length
              }]);
              break;
            case r.KANJI:
              t.push([o, {
                data: o.data,
                mode: r.BYTE,
                length: d(o.data)
              }]);
              break;
            case r.BYTE:
              t.push([{
                data: o.data,
                mode: r.BYTE,
                length: d(o.data)
              }]);
          }
        }
        return t;
      })(h(e, u.isKanjiModeEnabled())), i = (function (e, t) {
        const n = {}, o = {
          start: {}
        };
        let i = ["start"];
        for (let s = 0; s < e.length; s++) {
          const a = e[s], c = [];
          for (let e = 0; e < a.length; e++) {
            const u = a[e], l = "" + s + e;
            (c.push(l), n[l] = {
              node: u,
              lastCount: 0
            }, o[l] = {});
            for (let e = 0; e < i.length; e++) {
              const s = i[e];
              n[s] && n[s].node.mode === u.mode ? (o[s][l] = p(n[s].lastCount + u.length, u.mode) - p(n[s].lastCount, u.mode), n[s].lastCount += u.length) : (n[s] && (n[s].lastCount = u.length), o[s][l] = p(u.length, u.mode) + 4 + r.getCharCountIndicator(u.mode, t));
            }
          }
          i = c;
        }
        for (let r = 0; r < i.length; r++) o[i[r]].end = 0;
        return {
          map: o,
          table: n
        };
      })(o, n), s = l.find_path(i.map, "start", "end"), a = [];
      for (let t = 1; t < s.length - 1; t++) a.push(i.table[s[t]].node);
      return t.fromArray((function (e) {
        return e.reduce(function (e, t) {
          const n = e.length - 1 >= 0 ? e[e.length - 1] : null;
          return n && n.mode === t.mode ? (e[e.length - 1].data += t.data, e) : (e.push(t), e);
        }, []);
      })(a));
    }, t.rawSplit = function (e) {
      return t.fromArray(h(e, u.isKanjiModeEnabled()));
    });
  },
  62415: function (e, t) {
    let n;
    const r = [0, 26, 44, 70, 100, 134, 172, 196, 242, 292, 346, 404, 466, 532, 581, 655, 733, 815, 901, 991, 1085, 1156, 1258, 1364, 1474, 1588, 1706, 1828, 1921, 2051, 2185, 2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532, 3706];
    (t.getSymbolSize = function (e) {
      if (!e) throw new Error("\"version\" cannot be null or undefined");
      if (e < 1 || e > 40) throw new Error("\"version\" should be in range from 1 to 40");
      return 4 * e + 17;
    }, t.getSymbolTotalCodewords = function (e) {
      return r[e];
    }, t.getBCHDigit = function (e) {
      let t = 0;
      for (; 0 !== e; ) (t++, e >>>= 1);
      return t;
    }, t.setToSJISFunction = function (e) {
      if ("function" !== typeof e) throw new Error("\"toSJISFunc\" is not a valid function.");
      n = e;
    }, t.isKanjiModeEnabled = function () {
      return "undefined" !== typeof n;
    }, t.toSJIS = function (e) {
      return n(e);
    });
  },
  96623: function (e, t) {
    t.isValid = function (e) {
      return !isNaN(e) && e >= 1 && e <= 40;
    };
  },
  33379: function (e, t, n) {
    const r = n(62415), o = n(79386), i = n(29947), s = n(17956), a = n(96623), c = r.getBCHDigit(7973);
    function u(e, t) {
      return s.getCharCountIndicator(e, t) + 4;
    }
    function l(e, t) {
      let n = 0;
      return (e.forEach(function (e) {
        const r = u(e.mode, t);
        n += r + e.getBitsLength();
      }), n);
    }
    (t.from = function (e, t) {
      return a.isValid(e) ? parseInt(e, 10) : t;
    }, t.getCapacity = function (e, t, n) {
      if (!a.isValid(e)) throw new Error("Invalid QR Code version");
      "undefined" === typeof n && (n = s.BYTE);
      const i = 8 * (r.getSymbolTotalCodewords(e) - o.getTotalCodewordsCount(e, t));
      if (n === s.MIXED) return i;
      const c = i - u(n, e);
      switch (n) {
        case s.NUMERIC:
          return Math.floor(c / 10 * 3);
        case s.ALPHANUMERIC:
          return Math.floor(c / 11 * 2);
        case s.KANJI:
          return Math.floor(c / 13);
        case s.BYTE:
        default:
          return Math.floor(c / 8);
      }
    }, t.getBestVersionForData = function (e, n) {
      let r;
      const o = i.from(n, i.M);
      if (Array.isArray(e)) {
        if (e.length > 1) return (function (e, n) {
          for (let r = 1; r <= 40; r++) if (l(e, r) <= t.getCapacity(r, n, s.MIXED)) return r;
        })(e, o);
        if (0 === e.length) return 1;
        r = e[0];
      } else r = e;
      return (function (e, n, r) {
        for (let o = 1; o <= 40; o++) if (n <= t.getCapacity(o, r, e)) return o;
      })(r.mode, r.getLength(), o);
    }, t.getEncodedBits = function (e) {
      if (!a.isValid(e) || e < 7) throw new Error("Invalid QR Code version");
      let t = e << 12;
      for (; r.getBCHDigit(t) - c >= 0; ) t ^= 7973 << r.getBCHDigit(t) - c;
      return e << 12 | t;
    });
  },
  962: function (e, t, n) {
    const r = n(87220);
    (t.render = function (e, t, n) {
      let o = n, i = t;
      ("undefined" !== typeof o || t && t.getContext || (o = t, t = void 0), t || (i = (function () {
        try {
          return document.createElement("canvas");
        } catch (e) {
          throw new Error("You need to specify a canvas element");
        }
      })()), o = r.getOptions(o));
      const s = r.getImageWidth(e.modules.size, o), a = i.getContext("2d"), c = a.createImageData(s, s);
      return (r.qrToImageData(c.data, e, o), (function (e, t, n) {
        (e.clearRect(0, 0, t.width, t.height), t.style || (t.style = {}), t.height = n, t.width = n, t.style.height = n + "px", t.style.width = n + "px");
      })(a, i, s), a.putImageData(c, 0, 0), i);
    }, t.renderToDataURL = function (e, n, r) {
      let o = r;
      ("undefined" !== typeof o || n && n.getContext || (o = n, n = void 0), o || (o = {}));
      const i = t.render(e, n, o), s = o.type || "image/png", a = o.rendererOpts || ({});
      return i.toDataURL(s, a.quality);
    });
  },
  35623: function (e, t, n) {
    const r = n(87220);
    function o(e, t) {
      const n = e.a / 255, r = t + "=\"" + e.hex + "\"";
      return n < 1 ? r + " " + t + "-opacity=\"" + n.toFixed(2).slice(1) + "\"" : r;
    }
    function i(e, t, n) {
      let r = e + t;
      return ("undefined" !== typeof n && (r += " " + n), r);
    }
    t.render = function (e, t, n) {
      const s = r.getOptions(t), a = e.modules.size, c = e.modules.data, u = a + 2 * s.margin, l = s.color.light.a ? "<path " + o(s.color.light, "fill") + " d=\"M0 0h" + u + "v" + u + "H0z\"/>" : "", d = "<path " + o(s.color.dark, "stroke") + " d=\"" + (function (e, t, n) {
        let r = "", o = 0, s = !1, a = 0;
        for (let c = 0; c < e.length; c++) {
          const u = Math.floor(c % t), l = Math.floor(c / t);
          (u || s || (s = !0), e[c] ? (a++, c > 0 && u > 0 && e[c - 1] || (r += s ? i("M", u + n, 0.5 + l + n) : i("m", o, 0), o = 0, s = !1), u + 1 < t && e[c + 1] || (r += i("h", a), a = 0)) : o++);
        }
        return r;
      })(c, a, s.margin) + "\"/>", f = "viewBox=\"0 0 " + u + " " + u + "\"", h = "<svg xmlns=\"http://www.w3.org/2000/svg\" " + (s.width ? "width=\"" + s.width + "\" height=\"" + s.width + "\" " : "") + f + " shape-rendering=\"crispEdges\">" + l + d + "</svg>\n";
      return ("function" === typeof n && n(null, h), h);
    };
  },
  87220: function (e, t) {
    function n(e) {
      if (("number" === typeof e && (e = e.toString()), "string" !== typeof e)) throw new Error("Color should be defined as hex string");
      let t = e.slice().replace("#", "").split("");
      if (t.length < 3 || 5 === t.length || t.length > 8) throw new Error("Invalid hex color: " + e);
      (3 !== t.length && 4 !== t.length || (t = Array.prototype.concat.apply([], t.map(function (e) {
        return [e, e];
      }))), 6 === t.length && t.push("F", "F"));
      const n = parseInt(t.join(""), 16);
      return {
        r: n >> 24 & 255,
        g: n >> 16 & 255,
        b: n >> 8 & 255,
        a: 255 & n,
        hex: "#" + t.slice(0, 6).join("")
      };
    }
    (t.getOptions = function (e) {
      (e || (e = {}), e.color || (e.color = {}));
      const t = "undefined" === typeof e.margin || null === e.margin || e.margin < 0 ? 4 : e.margin, r = e.width && e.width >= 21 ? e.width : void 0, o = e.scale || 4;
      return {
        width: r,
        scale: r ? 4 : o,
        margin: t,
        color: {
          dark: n(e.color.dark || "#000000ff"),
          light: n(e.color.light || "#ffffffff")
        },
        type: e.type,
        rendererOpts: e.rendererOpts || ({})
      };
    }, t.getScale = function (e, t) {
      return t.width && t.width >= e + 2 * t.margin ? t.width / (e + 2 * t.margin) : t.scale;
    }, t.getImageWidth = function (e, n) {
      const r = t.getScale(e, n);
      return Math.floor((e + 2 * n.margin) * r);
    }, t.qrToImageData = function (e, n, r) {
      const o = n.modules.size, i = n.modules.data, s = t.getScale(o, r), a = Math.floor((o + 2 * r.margin) * s), c = r.margin * s, u = [r.color.light, r.color.dark];
      for (let t = 0; t < a; t++) for (let n = 0; n < a; n++) {
        let l = 4 * (t * a + n), d = r.color.light;
        if (t >= c && n >= c && t < a - c && n < a - c) {
          d = u[i[Math.floor((t - c) / s) * o + Math.floor((n - c) / s)] ? 1 : 0];
        }
        (e[l++] = d.r, e[l++] = d.g, e[l++] = d.b, e[l] = d.a);
      }
    });
  },
  87922: function (e, t, n) {
    "use strict";
    n.d(t, {
      Z: function () {
        return $;
      }
    });
    var r = n(5853), o = n(2265), i = "right-scroll-bar-position", s = "width-before-scroll-bar";
    function a(e, t) {
      return ("function" === typeof e ? e(t) : e && (e.current = t), e);
    }
    var c = "undefined" !== typeof window ? o.useLayoutEffect : o.useEffect, u = new WeakMap();
    function l(e, t) {
      var n = (function (e, t) {
        var n = (0, o.useState)(function () {
          return {
            value: e,
            callback: t,
            facade: {
              get current() {
                return n.value;
              },
              set current(e) {
                var t = n.value;
                t !== e && (n.value = e, n.callback(e, t));
              }
            }
          };
        })[0];
        return (n.callback = t, n.facade);
      })(t || null, function (t) {
        return e.forEach(function (e) {
          return a(e, t);
        });
      });
      return (c(function () {
        var t = u.get(n);
        if (t) {
          var r = new Set(t), o = new Set(e), i = n.current;
          (r.forEach(function (e) {
            o.has(e) || a(e, null);
          }), o.forEach(function (e) {
            r.has(e) || a(e, i);
          }));
        }
        u.set(n, e);
      }, [e]), n);
    }
    function d(e) {
      return e;
    }
    function f(e, t) {
      void 0 === t && (t = d);
      var n = [], r = !1;
      return {
        read: function () {
          if (r) throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
          return n.length ? n[n.length - 1] : e;
        },
        useMedium: function (e) {
          var o = t(e, r);
          return (n.push(o), function () {
            n = n.filter(function (e) {
              return e !== o;
            });
          });
        },
        assignSyncMedium: function (e) {
          for (r = !0; n.length; ) {
            var t = n;
            (n = [], t.forEach(e));
          }
          n = {
            push: function (t) {
              return e(t);
            },
            filter: function () {
              return n;
            }
          };
        },
        assignMedium: function (e) {
          r = !0;
          var t = [];
          if (n.length) {
            var o = n;
            (n = [], o.forEach(e), t = n);
          }
          var i = function () {
            var n = t;
            (t = [], n.forEach(e));
          }, s = function () {
            return Promise.resolve().then(i);
          };
          (s(), n = {
            push: function (e) {
              (t.push(e), s());
            },
            filter: function (e) {
              return (t = t.filter(e), n);
            }
          });
        }
      };
    }
    var h = (function (e) {
      void 0 === e && (e = {});
      var t = f(null);
      return (t.options = (0, r.__assign)({
        async: !0,
        ssr: !1
      }, e), t);
    })(), p = function () {}, m = o.forwardRef(function (e, t) {
      var n = o.useRef(null), i = o.useState({
        onScrollCapture: p,
        onWheelCapture: p,
        onTouchMoveCapture: p
      }), s = i[0], a = i[1], c = e.forwardProps, u = e.children, d = e.className, f = e.removeScrollBar, m = e.enabled, b = e.shards, y = e.sideCar, g = e.noIsolation, w = e.inert, v = e.allowPinchZoom, A = e.as, x = void 0 === A ? "div" : A, C = e.gapMode, P = (0, r.__rest)(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), E = y, k = l([n, t]), I = (0, r.__assign)((0, r.__assign)({}, P), s);
      return o.createElement(o.Fragment, null, m && o.createElement(E, {
        sideCar: h,
        removeScrollBar: f,
        shards: b,
        noIsolation: g,
        inert: w,
        setCallbacks: a,
        allowPinchZoom: !!v,
        lockRef: n,
        gapMode: C
      }), c ? o.cloneElement(o.Children.only(u), (0, r.__assign)((0, r.__assign)({}, I), {
        ref: k
      })) : o.createElement(x, (0, r.__assign)({}, I, {
        className: d,
        ref: k
      }), u));
    });
    (m.defaultProps = {
      enabled: !0,
      removeScrollBar: !0,
      inert: !1
    }, m.classNames = {
      fullWidth: s,
      zeroRight: i
    });
    var b, y = function (e) {
      var t = e.sideCar, n = (0, r.__rest)(e, ["sideCar"]);
      if (!t) throw new Error("Sidecar: please provide `sideCar` property to import the right car");
      var i = t.read();
      if (!i) throw new Error("Sidecar medium not found");
      return o.createElement(i, (0, r.__assign)({}, n));
    };
    y.isSideCarExport = !0;
    function g() {
      if (!document) return null;
      var e = document.createElement("style");
      e.type = "text/css";
      var t = b || n.nc;
      return (t && e.setAttribute("nonce", t), e);
    }
    var w = function () {
      var e = 0, t = null;
      return {
        add: function (n) {
          var r, o;
          (0 == e && (t = g()) && (o = n, (r = t).styleSheet ? r.styleSheet.cssText = o : r.appendChild(document.createTextNode(o)), (function (e) {
            (document.head || document.getElementsByTagName("head")[0]).appendChild(e);
          })(t)), e++);
        },
        remove: function () {
          !--e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
        }
      };
    }, v = function () {
      var e = (function () {
        var e = w();
        return function (t, n) {
          o.useEffect(function () {
            return (e.add(t), function () {
              e.remove();
            });
          }, [t && n]);
        };
      })();
      return function (t) {
        var n = t.styles, r = t.dynamic;
        return (e(n, r), null);
      };
    }, A = {
      left: 0,
      top: 0,
      right: 0,
      gap: 0
    }, x = function (e) {
      return parseInt(e || "", 10) || 0;
    }, C = function (e) {
      if ((void 0 === e && (e = "margin"), "undefined" === typeof window)) return A;
      var t = (function (e) {
        var t = window.getComputedStyle(document.body), n = t["padding" === e ? "paddingLeft" : "marginLeft"], r = t["padding" === e ? "paddingTop" : "marginTop"], o = t["padding" === e ? "paddingRight" : "marginRight"];
        return [x(n), x(r), x(o)];
      })(e), n = document.documentElement.clientWidth, r = window.innerWidth;
      return {
        left: t[0],
        top: t[1],
        right: t[2],
        gap: Math.max(0, r - n + t[2] - t[0])
      };
    }, P = v(), E = "data-scroll-locked", k = function (e, t, n, r) {
      var o = e.left, a = e.top, c = e.right, u = e.gap;
      return (void 0 === n && (n = "margin"), ("\n  .").concat("with-scroll-bars-hidden", " {\n   overflow: hidden ").concat(r, ";\n   padding-right: ").concat(u, "px ").concat(r, ";\n  }\n  body[").concat(E, "] {\n    overflow: hidden ").concat(r, ";\n    overscroll-behavior: contain;\n    ").concat([t && ("position: relative ").concat(r, ";"), "margin" === n && ("\n    padding-left: ").concat(o, "px;\n    padding-top: ").concat(a, "px;\n    padding-right: ").concat(c, "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ").concat(u, "px ").concat(r, ";\n    "), "padding" === n && ("padding-right: ").concat(u, "px ").concat(r, ";")].filter(Boolean).join(""), "\n  }\n  \n  .").concat(i, " {\n    right: ").concat(u, "px ").concat(r, ";\n  }\n  \n  .").concat(s, " {\n    margin-right: ").concat(u, "px ").concat(r, ";\n  }\n  \n  .").concat(i, " .").concat(i, " {\n    right: 0 ").concat(r, ";\n  }\n  \n  .").concat(s, " .").concat(s, " {\n    margin-right: 0 ").concat(r, ";\n  }\n  \n  body[").concat(E, "] {\n    ").concat("--removed-body-scroll-bar-size", ": ").concat(u, "px;\n  }\n"));
    }, I = function () {
      var e = parseInt(document.body.getAttribute(E) || "0", 10);
      return isFinite(e) ? e : 0;
    }, B = function (e) {
      var t = e.noRelative, n = e.noImportant, r = e.gapMode, i = void 0 === r ? "margin" : r;
      o.useEffect(function () {
        return (document.body.setAttribute(E, (I() + 1).toString()), function () {
          var e = I() - 1;
          e <= 0 ? document.body.removeAttribute(E) : document.body.setAttribute(E, e.toString());
        });
      }, []);
      var s = o.useMemo(function () {
        return C(i);
      }, [i]);
      return o.createElement(P, {
        styles: k(s, !t, i, n ? "" : "!important")
      });
    }, S = !1;
    if ("undefined" !== typeof window) try {
      var O = Object.defineProperty({}, "passive", {
        get: function () {
          return (S = !0, !0);
        }
      });
      (window.addEventListener("test", O, O), window.removeEventListener("test", O, O));
    } catch (H) {
      S = !1;
    }
    var M = !!S && ({
      passive: !1
    }), T = function (e, t) {
      var n = window.getComputedStyle(e);
      return "hidden" !== n[t] && !(n.overflowY === n.overflowX && !(function (e) {
        return "TEXTAREA" === e.tagName;
      })(e) && "visible" === n[t]);
    }, N = function (e, t) {
      var n = t.ownerDocument, r = t;
      do {
        if (("undefined" !== typeof ShadowRoot && r instanceof ShadowRoot && (r = r.host), R(e, r))) {
          var o = F(e, r);
          if (o[1] > o[2]) return !0;
        }
        r = r.parentNode;
      } while (r && r !== n.body);
      return !1;
    }, R = function (e, t) {
      return "v" === e ? (function (e) {
        return T(e, "overflowY");
      })(t) : (function (e) {
        return T(e, "overflowX");
      })(t);
    }, F = function (e, t) {
      return "v" === e ? [(n = t).scrollTop, n.scrollHeight, n.clientHeight] : (function (e) {
        return [e.scrollLeft, e.scrollWidth, e.clientWidth];
      })(t);
      var n;
    }, j = function (e) {
      return ("changedTouches" in e) ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
    }, U = function (e) {
      return [e.deltaX, e.deltaY];
    }, D = function (e) {
      return e && ("current" in e) ? e.current : e;
    }, L = function (e) {
      return ("\n  .block-interactivity-").concat(e, " {pointer-events: none;}\n  .allow-interactivity-").concat(e, " {pointer-events: all;}\n");
    }, z = 0, q = [];
    function G(e) {
      for (var t = null; null !== e; ) (e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode);
      return t;
    }
    var Q, _ = (Q = function (e) {
      var t = o.useRef([]), n = o.useRef([0, 0]), i = o.useRef(), s = o.useState(z++)[0], a = o.useState(v)[0], c = o.useRef(e);
      (o.useEffect(function () {
        c.current = e;
      }, [e]), o.useEffect(function () {
        if (e.inert) {
          document.body.classList.add(("block-interactivity-").concat(s));
          var t = (0, r.__spreadArray)([e.lockRef.current], (e.shards || []).map(D), !0).filter(Boolean);
          return (t.forEach(function (e) {
            return e.classList.add(("allow-interactivity-").concat(s));
          }), function () {
            (document.body.classList.remove(("block-interactivity-").concat(s)), t.forEach(function (e) {
              return e.classList.remove(("allow-interactivity-").concat(s));
            }));
          });
        }
      }, [e.inert, e.lockRef.current, e.shards]));
      var u = o.useCallback(function (e, t) {
        if (("touches" in e) && 2 === e.touches.length) return !c.current.allowPinchZoom;
        var r, o = j(e), s = n.current, a = ("deltaX" in e) ? e.deltaX : s[0] - o[0], u = ("deltaY" in e) ? e.deltaY : s[1] - o[1], l = e.target, d = Math.abs(a) > Math.abs(u) ? "h" : "v";
        if (("touches" in e) && "h" === d && "range" === l.type) return !1;
        var f = N(d, l);
        if (!f) return !0;
        if ((f ? r = d : (r = "v" === d ? "h" : "v", f = N(d, l)), !f)) return !1;
        if ((!i.current && ("changedTouches" in e) && (a || u) && (i.current = r), !r)) return !0;
        var h = i.current || r;
        return (function (e, t, n, r, o) {
          var i = (function (e, t) {
            return "h" === e && "rtl" === t ? -1 : 1;
          })(e, window.getComputedStyle(t).direction), s = i * r, a = n.target, c = t.contains(a), u = !1, l = s > 0, d = 0, f = 0;
          do {
            var h = F(e, a), p = h[0], m = h[1] - h[2] - i * p;
            ((p || m) && R(e, a) && (d += m, f += p), a = a instanceof ShadowRoot ? a.host : a.parentNode);
          } while (!c && a !== document.body || c && (t.contains(a) || t === a));
          return ((l && (o && Math.abs(d) < 1 || !o && s > d) || !l && (o && Math.abs(f) < 1 || !o && -s > f)) && (u = !0), u);
        })(h, t, e, "h" === h ? a : u, !0);
      }, []), l = o.useCallback(function (e) {
        var n = e;
        if (q.length && q[q.length - 1] === a) {
          var r = ("deltaY" in n) ? U(n) : j(n), o = t.current.filter(function (e) {
            return e.name === n.type && (e.target === n.target || n.target === e.shadowParent) && (t = e.delta, o = r, t[0] === o[0] && t[1] === o[1]);
            var t, o;
          })[0];
          if (o && o.should) n.cancelable && n.preventDefault(); else if (!o) {
            var i = (c.current.shards || []).map(D).filter(Boolean).filter(function (e) {
              return e.contains(n.target);
            });
            (i.length > 0 ? u(n, i[0]) : !c.current.noIsolation) && n.cancelable && n.preventDefault();
          }
        }
      }, []), d = o.useCallback(function (e, n, r, o) {
        var i = {
          name: e,
          delta: n,
          target: r,
          should: o,
          shadowParent: G(r)
        };
        (t.current.push(i), setTimeout(function () {
          t.current = t.current.filter(function (e) {
            return e !== i;
          });
        }, 1));
      }, []), f = o.useCallback(function (e) {
        (n.current = j(e), i.current = void 0);
      }, []), h = o.useCallback(function (t) {
        d(t.type, U(t), t.target, u(t, e.lockRef.current));
      }, []), p = o.useCallback(function (t) {
        d(t.type, j(t), t.target, u(t, e.lockRef.current));
      }, []);
      o.useEffect(function () {
        return (q.push(a), e.setCallbacks({
          onScrollCapture: h,
          onWheelCapture: h,
          onTouchMoveCapture: p
        }), document.addEventListener("wheel", l, M), document.addEventListener("touchmove", l, M), document.addEventListener("touchstart", f, M), function () {
          (q = q.filter(function (e) {
            return e !== a;
          }), document.removeEventListener("wheel", l, M), document.removeEventListener("touchmove", l, M), document.removeEventListener("touchstart", f, M));
        });
      }, []);
      var m = e.removeScrollBar, b = e.inert;
      return o.createElement(o.Fragment, null, b ? o.createElement(a, {
        styles: L(s)
      }) : null, m ? o.createElement(B, {
        gapMode: e.gapMode
      }) : null);
    }, h.useMedium(Q), y), W = o.forwardRef(function (e, t) {
      return o.createElement(m, (0, r.__assign)({}, e, {
        ref: t,
        sideCar: _
      }));
    });
    W.classNames = m.classNames;
    var $ = W;
  },
  62061: function (e, t, n) {
    var r;
    !(function (o, i) {
      "use strict";
      var s = "function", a = "undefined", c = "object", u = "string", l = "major", d = "model", f = "name", h = "type", p = "vendor", m = "version", b = "architecture", y = "console", g = "mobile", w = "tablet", v = "smarttv", A = "wearable", x = "embedded", C = "Amazon", P = "Apple", E = "ASUS", k = "BlackBerry", I = "Browser", B = "Chrome", S = "Firefox", O = "Google", M = "Honor", T = "Huawei", N = "LG", R = "Microsoft", F = "Motorola", j = "Nvidia", U = "OnePlus", D = "Opera", L = "OPPO", z = "Samsung", q = "Sharp", G = "Sony", Q = "Xiaomi", _ = "Zebra", W = "Facebook", $ = "Chromium OS", H = "Mac OS", K = " Browser", V = function (e) {
        for (var t = {}, n = 0; n < e.length; n++) t[e[n].toUpperCase()] = e[n];
        return t;
      }, J = function (e, t) {
        return typeof e === u && -1 !== Z(t).indexOf(Z(e));
      }, Z = function (e) {
        return e.toLowerCase();
      }, Y = function (e, t) {
        if (typeof e === u) return (e = e.replace(/^\s\s*/, ""), typeof t === a ? e : e.substring(0, 500));
      }, X = function (e, t) {
        for (var n, r, o, a, u, l, d = 0; d < t.length && !u; ) {
          var f = t[d], h = t[d + 1];
          for (n = r = 0; n < f.length && !u && f[n]; ) if (u = f[n++].exec(e)) for (o = 0; o < h.length; o++) (l = u[++r], typeof (a = h[o]) === c && a.length > 0 ? 2 === a.length ? typeof a[1] == s ? this[a[0]] = a[1].call(this, l) : this[a[0]] = a[1] : 3 === a.length ? typeof a[1] !== s || a[1].exec && a[1].test ? this[a[0]] = l ? l.replace(a[1], a[2]) : i : this[a[0]] = l ? a[1].call(this, l, a[2]) : i : 4 === a.length && (this[a[0]] = l ? a[3].call(this, l.replace(a[1], a[2])) : i) : this[a] = l || i);
          d += 2;
        }
      }, ee = function (e, t) {
        for (var n in t) if (typeof t[n] === c && t[n].length > 0) {
          for (var r = 0; r < t[n].length; r++) if (J(t[n][r], e)) return "?" === n ? i : n;
        } else if (J(t[n], e)) return "?" === n ? i : n;
        return t.hasOwnProperty("*") ? t["*"] : e;
      }, te = {
        ME: "4.90",
        "NT 3.11": "NT3.51",
        "NT 4.0": "NT4.0",
        2000: "NT 5.0",
        XP: ["NT 5.1", "NT 5.2"],
        Vista: "NT 6.0",
        7: "NT 6.1",
        8: "NT 6.2",
        8.1: "NT 6.3",
        10: ["NT 6.4", "NT 10.0"],
        RT: "ARM"
      }, ne = {
        browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [m, [f, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [m, [f, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [f, m], [/opios[\/ ]+([\w\.]+)/i], [m, [f, D + " Mini"]], [/\bop(?:rg)?x\/([\w\.]+)/i], [m, [f, D + " GX"]], [/\bopr\/([\w\.]+)/i], [m, [f, D]], [/\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i], [m, [f, "Baidu"]], [/\b(?:mxbrowser|mxios|myie2)\/?([-\w\.]*)\b/i], [m, [f, "Maxthon"]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer|sleipnir)[\/ ]?([\w\.]*)/i, /(avant|iemobile|slim(?:browser|boat|jet))[\/ ]?([\d\.]*)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|duckduckgo|klar|helio|(?=comodo_)?dragon)\/([-\w\.]+)/i, /(heytap|ovi|115)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [f, m], [/quark(?:pc)?\/([-\w\.]+)/i], [m, [f, "Quark"]], [/\bddg\/([\w\.]+)/i], [m, [f, "DuckDuckGo"]], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [m, [f, "UC" + I]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i, /micromessenger\/([\w\.]+)/i], [m, [f, "WeChat"]], [/konqueror\/([\w\.]+)/i], [m, [f, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [m, [f, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [m, [f, "Yandex"]], [/slbrowser\/([\w\.]+)/i], [m, [f, "Smart Lenovo " + I]], [/(avast|avg)\/([\w\.]+)/i], [[f, /(.+)/, "$1 Secure " + I], m], [/\bfocus\/([\w\.]+)/i], [m, [f, S + " Focus"]], [/\bopt\/([\w\.]+)/i], [m, [f, D + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [m, [f, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [m, [f, "Dolphin"]], [/coast\/([\w\.]+)/i], [m, [f, D + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [m, [f, "MIUI" + K]], [/fxios\/([\w\.-]+)/i], [m, [f, S]], [/\bqihoobrowser\/?([\w\.]*)/i], [m, [f, "360"]], [/\b(qq)\/([\w\.]+)/i], [[f, /(.+)/, "$1Browser"], m], [/(oculus|sailfish|huawei|vivo|pico)browser\/([\w\.]+)/i], [[f, /(.+)/, "$1" + K], m], [/samsungbrowser\/([\w\.]+)/i], [m, [f, z + " Internet"]], [/metasr[\/ ]?([\d\.]+)/i], [m, [f, "Sogou Explorer"]], [/(sogou)mo\w+\/([\d\.]+)/i], [[f, "Sogou Mobile"], m], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|2345(?=browser|chrome|explorer))\w*[\/ ]?v?([\w\.]+)/i], [f, m], [/(lbbrowser|rekonq)/i, /\[(linkedin)app\]/i], [f], [/ome\/([\w\.]+) \w* ?(iron) saf/i, /ome\/([\w\.]+).+qihu (360)[es]e/i], [m, f], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[f, W], m], [/(Klarna)\/([\w\.]+)/i, /(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /(daum)apps[\/ ]([\w\.]+)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(alipay)client\/([\w\.]+)/i, /(twitter)(?:and| f.+e\/([\w\.]+))/i, /(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i], [f, m], [/\bgsa\/([\w\.]+) .*safari\//i], [m, [f, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [m, [f, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [m, [f, B + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[f, B + " WebView"], m], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [m, [f, "Android " + I]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [f, m], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [m, [f, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [m, f], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [f, [m, ee, {
          "1.0": "/8",
          1.2: "/1",
          1.3: "/3",
          "2.0": "/412",
          "2.0.2": "/416",
          "2.0.3": "/417",
          "2.0.4": "/419",
          "?": "/"
        }]], [/(webkit|khtml)\/([\w\.]+)/i], [f, m], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[f, "Netscape"], m], [/(wolvic|librewolf)\/([\w\.]+)/i], [f, m], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [m, [f, S + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(amaya|dillo|doris|icab|ladybird|lynx|mosaic|netsurf|obigo|polaris|w3m|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /\b(links) \(([\w\.]+)/i], [f, [m, /_/g, "."]], [/(cobalt)\/([\w\.]+)/i], [f, [m, /master.|lts./, ""]]],
        cpu: [[/\b((amd|x|x86[-_]?|wow|win)64)\b/i], [[b, "amd64"]], [/(ia32(?=;))/i, /\b((i[346]|x)86)(pc)?\b/i], [[b, "ia32"]], [/\b(aarch64|arm(v?[89]e?l?|_?64))\b/i], [[b, "arm64"]], [/\b(arm(v[67])?ht?n?[fl]p?)\b/i], [[b, "armhf"]], [/( (ce|mobile); ppc;|\/[\w\.]+arm\b)/i], [[b, "arm"]], [/((ppc|powerpc)(64)?)( mac|;|\))/i], [[b, /ower/, "", Z]], [/ sun4\w[;\)]/i], [[b, "sparc"]], [/\b(avr32|ia64(?=;)|68k(?=\))|\barm(?=v([1-7]|[5-7]1)l?|;|eabi)|(irix|mips|sparc)(64)?\b|pa-risc)/i], [[b, Z]]],
        device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [d, [p, z], [h, w]], [/\b((?:s[cgp]h|gt|sm)-(?![lr])\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]((?!sm-[lr])[-\w]+)/i, /sec-(sgh\w+)/i], [d, [p, z], [h, g]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [d, [p, P], [h, g]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [d, [p, P], [h, w]], [/(macintosh);/i], [d, [p, P]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [d, [p, q], [h, g]], [/\b((?:brt|eln|hey2?|gdi|jdn)-a?[lnw]09|(?:ag[rm]3?|jdn2|kob2)-a?[lw]0[09]hn)(?: bui|\)|;)/i], [d, [p, M], [h, w]], [/honor([-\w ]+)[;\)]/i], [d, [p, M], [h, g]], [/\b((?:ag[rs][2356]?k?|bah[234]?|bg[2o]|bt[kv]|cmr|cpn|db[ry]2?|jdn2|got|kob2?k?|mon|pce|scm|sht?|[tw]gr|vrd)-[ad]?[lw][0125][09]b?|605hw|bg2-u03|(?:gem|fdr|m2|ple|t1)-[7a]0[1-4][lu]|t1-a2[13][lw]|mediapad[\w\. ]*(?= bui|\)))\b(?!.+d\/s)/i], [d, [p, T], [h, w]], [/(?:huawei)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [d, [p, T], [h, g]], [/oid[^\)]+; (2[\dbc]{4}(182|283|rp\w{2})[cgl]|m2105k81a?c)(?: bui|\))/i, /\b((?:red)?mi[-_ ]?pad[\w- ]*)(?: bui|\))/i], [[d, /_/g, " "], [p, Q], [h, w]], [/\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /oid[^\)]+; (m?[12][0-389][01]\w{3,6}[c-y])( bui|; wv|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite|pro)?)(?: bui|\))/i, / ([\w ]+) miui\/v?\d/i], [[d, /_/g, " "], [p, Q], [h, g]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [d, [p, L], [h, g]], [/\b(opd2(\d{3}a?))(?: bui|\))/i], [d, [p, ee, {
          OnePlus: ["304", "403", "203"],
          "*": L
        }], [h, w]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [d, [p, "Vivo"], [h, g]], [/\b(rmx[1-3]\d{3})(?: bui|;|\))/i], [d, [p, "Realme"], [h, g]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto(?! 360)[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [d, [p, F], [h, g]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [d, [p, F], [h, w]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [d, [p, N], [h, w]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv|watch)\w+)/i, /\blg-?([\d\w]+) bui/i], [d, [p, N], [h, g]], [/(ideatab[-\w ]+|602lv|d-42a|a101lv|a2109a|a3500-hv|s[56]000|pb-6505[my]|tb-?x?\d{3,4}(?:f[cu]|xu|[av])|yt\d?-[jx]?\d+[lfmx])( bui|;|\)|\/)/i, /lenovo ?(b[68]0[08]0-?[hf]?|tab(?:[\w- ]+?)|tb[\w-]{6,7})( bui|;|\)|\/)/i], [d, [p, "Lenovo"], [h, w]], [/(nokia) (t[12][01])/i], [p, d, [h, w]], [/(?:maemo|nokia).*(n900|lumia \d+|rm-\d+)/i, /nokia[-_ ]?(([-\w\. ]*))/i], [[d, /_/g, " "], [h, g], [p, "Nokia"]], [/(pixel (c|tablet))\b/i], [d, [p, O], [h, w]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [d, [p, O], [h, g]], [/droid.+; (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [d, [p, G], [h, g]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[d, "Xperia Tablet"], [p, G], [h, w]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [d, [p, U], [h, g]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo(?!bc)\w\w)( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [d, [p, C], [h, w]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[d, /(.+)/g, "Fire Phone $1"], [p, C], [h, g]], [/(playbook);[-\w\),; ]+(rim)/i], [d, p, [h, w]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [d, [p, k], [h, g]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [d, [p, E], [h, w]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [d, [p, E], [h, g]], [/(nexus 9)/i], [d, [p, "HTC"], [h, w]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [p, [d, /_/g, " "], [h, g]], [/droid [\w\.]+; ((?:8[14]9[16]|9(?:0(?:48|60|8[01])|1(?:3[27]|66)|2(?:6[69]|9[56])|466))[gqswx])\w*(\)| bui)/i], [d, [p, "TCL"], [h, w]], [/(itel) ((\w+))/i], [[p, Z], d, [h, ee, {
          tablet: ["p10001l", "w7001"],
          "*": "mobile"
        }]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [d, [p, "Acer"], [h, w]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [d, [p, "Meizu"], [h, g]], [/; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i], [d, [p, "Ulefone"], [h, g]], [/; (energy ?\w+)(?: bui|\))/i, /; energizer ([\w ]+)(?: bui|\))/i], [d, [p, "Energizer"], [h, g]], [/; cat (b35);/i, /; (b15q?|s22 flip|s48c|s62 pro)(?: bui|\))/i], [d, [p, "Cat"], [h, g]], [/((?:new )?andromax[\w- ]+)(?: bui|\))/i], [d, [p, "Smartfren"], [h, g]], [/droid.+; (a(?:015|06[35]|142p?))/i], [d, [p, "Nothing"], [h, g]], [/; (x67 5g|tikeasy \w+|ac[1789]\d\w+)( b|\))/i, /archos ?(5|gamepad2?|([\w ]*[t1789]|hello) ?\d+[\w ]*)( b|\))/i], [d, [p, "Archos"], [h, w]], [/archos ([\w ]+)( b|\))/i, /; (ac[3-6]\d\w{2,8})( b|\))/i], [d, [p, "Archos"], [h, g]], [/(imo) (tab \w+)/i, /(infinix) (x1101b?)/i], [p, d, [h, w]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus(?! zenw)|dell|jolla|meizu|motorola|polytron|infinix|tecno|micromax|advan)[-_ ]?([-\w]*)/i, /; (hmd|imo) ([\w ]+?)(?: bui|\))/i, /(hp) ([\w ]+\w)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w ]+?)(?: bui|\)|\/)/i, /(oppo) ?([\w ]+) bui/i], [p, d, [h, g]], [/(kobo)\s(ereader|touch)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [p, d, [h, w]], [/(surface duo)/i], [d, [p, R], [h, w]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [d, [p, "Fairphone"], [h, g]], [/(u304aa)/i], [d, [p, "AT&T"], [h, g]], [/\bsie-(\w*)/i], [d, [p, "Siemens"], [h, g]], [/\b(rct\w+) b/i], [d, [p, "RCA"], [h, w]], [/\b(venue[\d ]{2,7}) b/i], [d, [p, "Dell"], [h, w]], [/\b(q(?:mv|ta)\w+) b/i], [d, [p, "Verizon"], [h, w]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [d, [p, "Barnes & Noble"], [h, w]], [/\b(tm\d{3}\w+) b/i], [d, [p, "NuVision"], [h, w]], [/\b(k88) b/i], [d, [p, "ZTE"], [h, w]], [/\b(nx\d{3}j) b/i], [d, [p, "ZTE"], [h, g]], [/\b(gen\d{3}) b.+49h/i], [d, [p, "Swiss"], [h, g]], [/\b(zur\d{3}) b/i], [d, [p, "Swiss"], [h, w]], [/\b((zeki)?tb.*\b) b/i], [d, [p, "Zeki"], [h, w]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[p, "Dragon Touch"], d, [h, w]], [/\b(ns-?\w{0,9}) b/i], [d, [p, "Insignia"], [h, w]], [/\b((nxa|next)-?\w{0,9}) b/i], [d, [p, "NextBook"], [h, w]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[p, "Voice"], d, [h, g]], [/\b(lvtel\-)?(v1[12]) b/i], [[p, "LvTel"], d, [h, g]], [/\b(ph-1) /i], [d, [p, "Essential"], [h, g]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [d, [p, "Envizen"], [h, w]], [/\b(trio[-\w\. ]+) b/i], [d, [p, "MachSpeed"], [h, w]], [/\btu_(1491) b/i], [d, [p, "Rotor"], [h, w]], [/((?:tegranote|shield t(?!.+d tv))[\w- ]*?)(?: b|\))/i], [d, [p, j], [h, w]], [/(sprint) (\w+)/i], [p, d, [h, g]], [/(kin\.[onetw]{3})/i], [[d, /\./g, " "], [p, R], [h, g]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [d, [p, _], [h, w]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [d, [p, _], [h, g]], [/smart-tv.+(samsung)/i], [p, [h, v]], [/hbbtv.+maple;(\d+)/i], [[d, /^/, "SmartTV"], [p, z], [h, v]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[p, N], [h, v]], [/(apple) ?tv/i], [p, [d, P + " TV"], [h, v]], [/crkey/i], [[d, B + "cast"], [p, O], [h, v]], [/droid.+aft(\w+)( bui|\))/i], [d, [p, C], [h, v]], [/(shield \w+ tv)/i], [d, [p, j], [h, v]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [d, [p, q], [h, v]], [/(bravia[\w ]+)( bui|\))/i], [d, [p, G], [h, v]], [/(mi(tv|box)-?\w+) bui/i], [d, [p, Q], [h, v]], [/Hbbtv.*(technisat) (.*);/i], [p, d, [h, v]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[p, Y], [d, Y], [h, v]], [/droid.+; ([\w- ]+) (?:android tv|smart[- ]?tv)/i], [d, [h, v]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[h, v]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [p, d, [h, y]], [/droid.+; (shield)( bui|\))/i], [d, [p, j], [h, y]], [/(playstation \w+)/i], [d, [p, G], [h, y]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [d, [p, R], [h, y]], [/\b(sm-[lr]\d\d[0156][fnuw]?s?|gear live)\b/i], [d, [p, z], [h, A]], [/((pebble))app/i, /(asus|google|lg|oppo) ((pixel |zen)?watch[\w ]*)( bui|\))/i], [p, d, [h, A]], [/(ow(?:19|20)?we?[1-3]{1,3})/i], [d, [p, L], [h, A]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [d, [p, P], [h, A]], [/(opwwe\d{3})/i], [d, [p, U], [h, A]], [/(moto 360)/i], [d, [p, F], [h, A]], [/(smartwatch 3)/i], [d, [p, G], [h, A]], [/(g watch r)/i], [d, [p, N], [h, A]], [/droid.+; (wt63?0{2,3})\)/i], [d, [p, _], [h, A]], [/droid.+; (glass) \d/i], [d, [p, O], [h, A]], [/(pico) (4|neo3(?: link|pro)?)/i], [p, d, [h, A]], [/; (quest( \d| pro)?)/i], [d, [p, W], [h, A]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [p, [h, x]], [/(aeobc)\b/i], [d, [p, C], [h, x]], [/(homepod).+mac os/i], [d, [p, P], [h, x]], [/windows iot/i], [[h, x]], [/droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+? mobile safari/i], [d, [h, g]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [d, [h, w]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[h, w]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[h, g]], [/droid .+?; ([\w\. -]+)( bui|\))/i], [d, [p, "Generic"]]],
        engine: [[/windows.+ edge\/([\w\.]+)/i], [m, [f, "EdgeHTML"]], [/(arkweb)\/([\w\.]+)/i], [f, m], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [m, [f, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna|servo)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [f, m], [/ladybird\//i], [[f, "LibWeb"]], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [m, f]],
        os: [[/microsoft (windows) (vista|xp)/i], [f, m], [/(windows (?:phone(?: os)?|mobile|iot))[\/ ]?([\d\.\w ]*)/i], [f, [m, ee, te]], [/windows nt 6\.2; (arm)/i, /windows[\/ ]([ntce\d\. ]+\w)(?!.+xbox)/i, /(?:win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[m, ee, te], [f, "Windows"]], [/[adehimnop]{4,7}\b(?:.*os ([\w]+) like mac|; opera)/i, /(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[m, /_/g, "."], [f, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[f, H], [m, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [m, f], [/(ubuntu) ([\w\.]+) like android/i], [[f, /(.+)/, "$1 Touch"], m], [/(android|bada|blackberry|kaios|maemo|meego|openharmony|qnx|rim tablet os|sailfish|series40|symbian|tizen|webos)\w*[-\/; ]?([\d\.]*)/i], [f, m], [/\(bb(10);/i], [m, [f, k]], [/(?:symbian ?os|symbos|s60(?=;)|series ?60)[-\/ ]?([\w\.]*)/i], [m, [f, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [m, [f, S + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [m, [f, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [m, [f, "watchOS"]], [/crkey\/([\d\.]+)/i], [m, [f, B + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[f, $], m], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux)(?: arm\w*| x86\w*| ?)([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [f, m], [/(sunos) ?([\w\.\d]*)/i], [[f, "Solaris"], m], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [f, m]]
      }, re = function (e, t) {
        if ((typeof e === c && (t = e, e = i), !(this instanceof re))) return new re(e, t).getResult();
        var n = typeof o !== a && o.navigator ? o.navigator : i, r = e || (n && n.userAgent ? n.userAgent : ""), y = n && n.userAgentData ? n.userAgentData : i, v = t ? (function (e, t) {
          var n = {};
          for (var r in e) t[r] && t[r].length % 2 === 0 ? n[r] = t[r].concat(e[r]) : n[r] = e[r];
          return n;
        })(ne, t) : ne, A = n && n.userAgent == r;
        return (this.getBrowser = function () {
          var e, t = {};
          return (t[f] = i, t[m] = i, X.call(t, r, v.browser), t[l] = typeof (e = t[m]) === u ? e.replace(/[^\d\.]/g, "").split(".")[0] : i, A && n && n.brave && typeof n.brave.isBrave == s && (t[f] = "Brave"), t);
        }, this.getCPU = function () {
          var e = {};
          return (e[b] = i, X.call(e, r, v.cpu), e);
        }, this.getDevice = function () {
          var e = {};
          return (e[p] = i, e[d] = i, e[h] = i, X.call(e, r, v.device), A && !e[h] && y && y.mobile && (e[h] = g), A && "Macintosh" == e[d] && n && typeof n.standalone !== a && n.maxTouchPoints && n.maxTouchPoints > 2 && (e[d] = "iPad", e[h] = w), e);
        }, this.getEngine = function () {
          var e = {};
          return (e[f] = i, e[m] = i, X.call(e, r, v.engine), e);
        }, this.getOS = function () {
          var e = {};
          return (e[f] = i, e[m] = i, X.call(e, r, v.os), A && !e[f] && y && y.platform && "Unknown" != y.platform && (e[f] = y.platform.replace(/chrome os/i, $).replace(/macos/i, H)), e);
        }, this.getResult = function () {
          return {
            ua: this.getUA(),
            browser: this.getBrowser(),
            engine: this.getEngine(),
            os: this.getOS(),
            device: this.getDevice(),
            cpu: this.getCPU()
          };
        }, this.getUA = function () {
          return r;
        }, this.setUA = function (e) {
          return (r = typeof e === u && e.length > 500 ? Y(e, 500) : e, this);
        }, this.setUA(r), this);
      };
      (re.VERSION = "1.0.41", re.BROWSER = V([f, m, l]), re.CPU = V([b]), re.DEVICE = V([d, p, h, y, g, v, w, A, x]), re.ENGINE = re.OS = V([f, m]), typeof t !== a ? (e.exports && (t = e.exports = re), t.UAParser = re) : n.amdO ? (r = (function () {
        return re;
      }).call(t, n, t, e)) === i || (e.exports = r) : typeof o !== a && (o.UAParser = re));
      var oe = typeof o !== a && (o.jQuery || o.Zepto);
      if (oe && !oe.ua) {
        var ie = new re();
        (oe.ua = ie.getResult(), oe.ua.get = function () {
          return ie.getUA();
        }, oe.ua.set = function (e) {
          ie.setUA(e);
          var t = ie.getResult();
          for (var n in t) oe.ua[n] = t[n];
        });
      }
    })("object" === typeof window ? window : this);
  },
  57678: function (e, t, n) {
    "use strict";
    var r = n(2265);
    var o = "function" === typeof Object.is ? Object.is : function (e, t) {
      return e === t && (0 !== e || 1 / e === 1 / t) || e !== e && t !== t;
    }, i = r.useState, s = r.useEffect, a = r.useLayoutEffect, c = r.useDebugValue;
    function u(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var n = t();
        return !o(e, n);
      } catch (r) {
        return !0;
      }
    }
    var l = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? function (e, t) {
      return t();
    } : function (e, t) {
      var n = t(), r = i({
        inst: {
          value: n,
          getSnapshot: t
        }
      }), o = r[0].inst, l = r[1];
      return (a(function () {
        (o.value = n, o.getSnapshot = t, u(o) && l({
          inst: o
        }));
      }, [e, n, t]), s(function () {
        return (u(o) && l({
          inst: o
        }), e(function () {
          u(o) && l({
            inst: o
          });
        }));
      }, [e]), c(n), n);
    };
    t.useSyncExternalStore = void 0 !== r.useSyncExternalStore ? r.useSyncExternalStore : l;
  },
  48923: function (e, t, n) {
    "use strict";
    var r = n(2265), o = n(60293);
    var i = "function" === typeof Object.is ? Object.is : function (e, t) {
      return e === t && (0 !== e || 1 / e === 1 / t) || e !== e && t !== t;
    }, s = o.useSyncExternalStore, a = r.useRef, c = r.useEffect, u = r.useMemo, l = r.useDebugValue;
    t.useSyncExternalStoreWithSelector = function (e, t, n, r, o) {
      var d = a(null);
      if (null === d.current) {
        var f = {
          hasValue: !1,
          value: null
        };
        d.current = f;
      } else f = d.current;
      d = u(function () {
        function e(e) {
          if (!c) {
            if ((c = !0, s = e, e = r(e), void 0 !== o && f.hasValue)) {
              var t = f.value;
              if (o(t, e)) return a = t;
            }
            return a = e;
          }
          if ((t = a, i(s, e))) return t;
          var n = r(e);
          return void 0 !== o && o(t, n) ? (s = e, t) : (s = e, a = n);
        }
        var s, a, c = !1, u = void 0 === n ? null : n;
        return [function () {
          return e(t());
        }, null === u ? void 0 : function () {
          return e(u());
        }];
      }, [t, n, r, o]);
      var h = s(e, d[0], d[1]);
      return (c(function () {
        (f.hasValue = !0, f.value = h);
      }, [h]), l(h), h);
    };
  },
  60293: function (e, t, n) {
    "use strict";
    e.exports = n(57678);
  },
  48892: function (e, t, n) {
    "use strict";
    e.exports = n(48923);
  },
  16704: function (e, t, n) {
    "use strict";
    var r = n(2265);
    var o = "function" === typeof Object.is ? Object.is : function (e, t) {
      return e === t && (0 !== e || 1 / e === 1 / t) || e !== e && t !== t;
    }, i = r.useState, s = r.useEffect, a = r.useLayoutEffect, c = r.useDebugValue;
    function u(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var n = t();
        return !o(e, n);
      } catch (r) {
        return !0;
      }
    }
    var l = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? function (e, t) {
      return t();
    } : function (e, t) {
      var n = t(), r = i({
        inst: {
          value: n,
          getSnapshot: t
        }
      }), o = r[0].inst, l = r[1];
      return (a(function () {
        (o.value = n, o.getSnapshot = t, u(o) && l({
          inst: o
        }));
      }, [e, n, t]), s(function () {
        return (u(o) && l({
          inst: o
        }), e(function () {
          u(o) && l({
            inst: o
          });
        }));
      }, [e]), c(n), n);
    };
    t.useSyncExternalStore = void 0 !== r.useSyncExternalStore ? r.useSyncExternalStore : l;
  },
  3254: function (e, t, n) {
    "use strict";
    var r = n(2265), o = n(68664);
    var i = "function" === typeof Object.is ? Object.is : function (e, t) {
      return e === t && (0 !== e || 1 / e === 1 / t) || e !== e && t !== t;
    }, s = o.useSyncExternalStore, a = r.useRef, c = r.useEffect, u = r.useMemo, l = r.useDebugValue;
    t.useSyncExternalStoreWithSelector = function (e, t, n, r, o) {
      var d = a(null);
      if (null === d.current) {
        var f = {
          hasValue: !1,
          value: null
        };
        d.current = f;
      } else f = d.current;
      d = u(function () {
        function e(e) {
          if (!c) {
            if ((c = !0, s = e, e = r(e), void 0 !== o && f.hasValue)) {
              var t = f.value;
              if (o(t, e)) return a = t;
            }
            return a = e;
          }
          if ((t = a, i(s, e))) return t;
          var n = r(e);
          return void 0 !== o && o(t, n) ? (s = e, t) : (s = e, a = n);
        }
        var s, a, c = !1, u = void 0 === n ? null : n;
        return [function () {
          return e(t());
        }, null === u ? void 0 : function () {
          return e(u());
        }];
      }, [t, n, r, o]);
      var h = s(e, d[0], d[1]);
      return (c(function () {
        (f.hasValue = !0, f.value = h);
      }, [h]), l(h), h);
    };
  },
  68664: function (e, t, n) {
    "use strict";
    e.exports = n(16704);
  },
  27507: function (e, t, n) {
    "use strict";
    e.exports = n(3254);
  },
  64299: function () {},
  25566: function (e) {
    var t, n, r = e.exports = {};
    function o() {
      throw new Error("setTimeout has not been defined");
    }
    function i() {
      throw new Error("clearTimeout has not been defined");
    }
    function s(e) {
      if (t === setTimeout) return setTimeout(e, 0);
      if ((t === o || !t) && setTimeout) return (t = setTimeout, setTimeout(e, 0));
      try {
        return t(e, 0);
      } catch (n) {
        try {
          return t.call(null, e, 0);
        } catch (n) {
          return t.call(this, e, 0);
        }
      }
    }
    !(function () {
      try {
        t = "function" === typeof setTimeout ? setTimeout : o;
      } catch (e) {
        t = o;
      }
      try {
        n = "function" === typeof clearTimeout ? clearTimeout : i;
      } catch (e) {
        n = i;
      }
    })();
    var a, c = [], u = !1, l = -1;
    function d() {
      u && a && (u = !1, a.length ? c = a.concat(c) : l = -1, c.length && f());
    }
    function f() {
      if (!u) {
        var e = s(d);
        u = !0;
        for (var t = c.length; t; ) {
          for ((a = c, c = []); ++l < t; ) a && a[l].run();
          (l = -1, t = c.length);
        }
        (a = null, u = !1, (function (e) {
          if (n === clearTimeout) return clearTimeout(e);
          if ((n === i || !n) && clearTimeout) return (n = clearTimeout, clearTimeout(e));
          try {
            return n(e);
          } catch (t) {
            try {
              return n.call(null, e);
            } catch (t) {
              return n.call(this, e);
            }
          }
        })(e));
      }
    }
    function h(e, t) {
      (this.fun = e, this.array = t);
    }
    function p() {}
    (r.nextTick = function (e) {
      var t = new Array(arguments.length - 1);
      if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
      (c.push(new h(e, t)), 1 !== c.length || u || s(f));
    }, h.prototype.run = function () {
      this.fun.apply(null, this.array);
    }, r.title = "browser", r.browser = !0, r.env = {}, r.argv = [], r.version = "", r.versions = {}, r.on = p, r.addListener = p, r.once = p, r.off = p, r.removeListener = p, r.removeAllListeners = p, r.emit = p, r.prependListener = p, r.prependOnceListener = p, r.listeners = function (e) {
      return [];
    }, r.binding = function (e) {
      throw new Error("process.binding is not supported");
    }, r.cwd = function () {
      return "/";
    }, r.chdir = function (e) {
      throw new Error("process.chdir is not supported");
    }, r.umask = function () {
      return 0;
    });
  },
  16177: function (e, t, n) {
    "use strict";
    n.d(t, {
      $p: function () {
        return f;
      },
      EP: function () {
        return h;
      },
      FL: function () {
        return d;
      },
      Fn: function () {
        return w;
      },
      IH: function () {
        return y;
      },
      Iq: function () {
        return c;
      },
      NI: function () {
        return a;
      },
      Ou: function () {
        return l;
      },
      SD: function () {
        return m;
      },
      Vl: function () {
        return s;
      },
      Xb: function () {
        return v;
      },
      ac: function () {
        return g;
      },
      gm: function () {
        return p;
      },
      m_: function () {
        return u;
      },
      mk: function () {
        return b;
      },
      pp: function () {
        return C;
      },
      u8: function () {
        return A;
      },
      zP: function () {
        return x;
      }
    });
    const r = BigInt(2 ** 32 - 1), o = BigInt(32);
    function i(e, t = !1) {
      return t ? {
        h: Number(e & r),
        l: Number(e >> o & r)
      } : {
        h: 0 | Number(e >> o & r),
        l: 0 | Number(e & r)
      };
    }
    function s(e, t = !1) {
      const n = e.length;
      let r = new Uint32Array(n), o = new Uint32Array(n);
      for (let s = 0; s < n; s++) {
        const {h: n, l: a} = i(e[s], t);
        [r[s], o[s]] = [n, a];
      }
      return [r, o];
    }
    const a = (e, t, n) => e >>> n, c = (e, t, n) => e << 32 - n | t >>> n, u = (e, t, n) => e >>> n | t << 32 - n, l = (e, t, n) => e << 32 - n | t >>> n, d = (e, t, n) => e << 64 - n | t >>> n - 32, f = (e, t, n) => e >>> n - 32 | t << 64 - n, h = (e, t, n) => e << n | t >>> 32 - n, p = (e, t, n) => t << n | e >>> 32 - n, m = (e, t, n) => t << n - 32 | e >>> 64 - n, b = (e, t, n) => e << n - 32 | t >>> 64 - n;
    function y(e, t, n, r) {
      const o = (t >>> 0) + (r >>> 0);
      return {
        h: e + n + (o / 2 ** 32 | 0) | 0,
        l: 0 | o
      };
    }
    const g = (e, t, n) => (e >>> 0) + (t >>> 0) + (n >>> 0), w = (e, t, n, r) => t + n + r + (e / 2 ** 32 | 0) | 0, v = (e, t, n, r) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0), A = (e, t, n, r, o) => t + n + r + o + (e / 2 ** 32 | 0) | 0, x = (e, t, n, r, o) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0) + (o >>> 0), C = (e, t, n, r, o, i) => t + n + r + o + i + (e / 2 ** 32 | 0) | 0;
  },
  3321: function (e, t, n) {
    "use strict";
    n.d(t, {
      b: function () {
        return i;
      }
    });
    var r = n(25884);
    class o extends r.kb {
      constructor(e, t) {
        (super(), this.finished = !1, this.destroyed = !1, (0, r.z3)(e));
        const n = (0, r.O0)(t);
        if ((this.iHash = e.create(), "function" !== typeof this.iHash.update)) throw new Error("Expected instance of class which extends utils.Hash");
        (this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen);
        const o = this.blockLen, i = new Uint8Array(o);
        i.set(n.length > o ? e.create().update(n).digest() : n);
        for (let r = 0; r < i.length; r++) i[r] ^= 54;
        (this.iHash.update(i), this.oHash = e.create());
        for (let r = 0; r < i.length; r++) i[r] ^= 106;
        (this.oHash.update(i), (0, r.ru)(i));
      }
      update(e) {
        return ((0, r.$h)(this), this.iHash.update(e), this);
      }
      digestInto(e) {
        ((0, r.$h)(this), (0, r.gk)(e, this.outputLen), this.finished = !0, this.iHash.digestInto(e), this.oHash.update(e), this.oHash.digestInto(e), this.destroy());
      }
      digest() {
        const e = new Uint8Array(this.oHash.outputLen);
        return (this.digestInto(e), e);
      }
      _cloneInto(e) {
        e || (e = Object.create(Object.getPrototypeOf(this), {}));
        const {oHash: t, iHash: n, finished: r, destroyed: o, blockLen: i, outputLen: s} = this;
        return (e.finished = r, e.destroyed = o, e.blockLen = i, e.outputLen = s, e.oHash = t._cloneInto(e.oHash), e.iHash = n._cloneInto(e.iHash), e);
      }
      clone() {
        return this._cloneInto();
      }
      destroy() {
        (this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy());
      }
    }
    const i = (e, t, n) => new o(e, t).update(n).digest();
    i.create = (e, t) => new o(e, t);
  },
  68553: function (e, t, n) {
    "use strict";
    n.d(t, {
      JQ: function () {
        return v;
      },
      iC: function () {
        return x;
      },
      o: function () {
        return A;
      }
    });
    var r = n(25884);
    function o(e, t, n) {
      return e & t ^ e & n ^ t & n;
    }
    class i extends r.kb {
      constructor(e, t, n, o) {
        (super(), this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.blockLen = e, this.outputLen = t, this.padOffset = n, this.isLE = o, this.buffer = new Uint8Array(e), this.view = (0, r.GL)(this.buffer));
      }
      update(e) {
        ((0, r.$h)(this), e = (0, r.O0)(e), (0, r.gk)(e));
        const {view: t, buffer: n, blockLen: o} = this, i = e.length;
        for (let s = 0; s < i; ) {
          const a = Math.min(o - this.pos, i - s);
          if (a !== o) (n.set(e.subarray(s, s + a), this.pos), this.pos += a, s += a, this.pos === o && (this.process(t, 0), this.pos = 0)); else {
            const t = (0, r.GL)(e);
            for (; o <= i - s; s += o) this.process(t, s);
          }
        }
        return (this.length += e.length, this.roundClean(), this);
      }
      digestInto(e) {
        ((0, r.$h)(this), (0, r.eB)(e, this), this.finished = !0);
        const {buffer: t, view: n, blockLen: o, isLE: i} = this;
        let {pos: s} = this;
        (t[s++] = 128, (0, r.ru)(this.buffer.subarray(s)), this.padOffset > o - s && (this.process(n, 0), s = 0));
        for (let r = s; r < o; r++) t[r] = 0;
        (!(function (e, t, n, r) {
          if ("function" === typeof e.setBigUint64) return e.setBigUint64(t, n, r);
          const o = BigInt(32), i = BigInt(4294967295), s = Number(n >> o & i), a = Number(n & i), c = r ? 4 : 0, u = r ? 0 : 4;
          (e.setUint32(t + c, s, r), e.setUint32(t + u, a, r));
        })(n, o - 8, BigInt(8 * this.length), i), this.process(n, 0));
        const a = (0, r.GL)(e), c = this.outputLen;
        if (c % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
        const u = c / 4, l = this.get();
        if (u > l.length) throw new Error("_sha2: outputLen bigger than state");
        for (let r = 0; r < u; r++) a.setUint32(4 * r, l[r], i);
      }
      digest() {
        const {buffer: e, outputLen: t} = this;
        this.digestInto(e);
        const n = e.slice(0, t);
        return (this.destroy(), n);
      }
      _cloneInto(e) {
        (e || (e = new this.constructor()), e.set(...this.get()));
        const {blockLen: t, buffer: n, length: r, finished: o, destroyed: i, pos: s} = this;
        return (e.destroyed = i, e.finished = o, e.length = r, e.pos = s, r % t && e.buffer.set(n), e);
      }
      clone() {
        return this._cloneInto();
      }
    }
    const s = Uint32Array.from([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]), a = Uint32Array.from([3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999, 355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025, 3675008525, 1694076839, 1203062813, 3204075428]), c = Uint32Array.from([1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723, 2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209]);
    var u = n(16177);
    const l = Uint32Array.from([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]), d = new Uint32Array(64);
    class f extends i {
      constructor(e = 32) {
        (super(64, e, 8, !1), this.A = 0 | s[0], this.B = 0 | s[1], this.C = 0 | s[2], this.D = 0 | s[3], this.E = 0 | s[4], this.F = 0 | s[5], this.G = 0 | s[6], this.H = 0 | s[7]);
      }
      get() {
        const {A: e, B: t, C: n, D: r, E: o, F: i, G: s, H: a} = this;
        return [e, t, n, r, o, i, s, a];
      }
      set(e, t, n, r, o, i, s, a) {
        (this.A = 0 | e, this.B = 0 | t, this.C = 0 | n, this.D = 0 | r, this.E = 0 | o, this.F = 0 | i, this.G = 0 | s, this.H = 0 | a);
      }
      process(e, t) {
        for (let r = 0; r < 16; (r++, t += 4)) d[r] = e.getUint32(t, !1);
        for (let o = 16; o < 64; o++) {
          const e = d[o - 15], t = d[o - 2], n = (0, r.np)(e, 7) ^ (0, r.np)(e, 18) ^ e >>> 3, i = (0, r.np)(t, 17) ^ (0, r.np)(t, 19) ^ t >>> 10;
          d[o] = i + d[o - 7] + n + d[o - 16] | 0;
        }
        let {A: n, B: i, C: s, D: a, E: c, F: u, G: f, H: h} = this;
        for (let m = 0; m < 64; m++) {
          const e = h + ((0, r.np)(c, 6) ^ (0, r.np)(c, 11) ^ (0, r.np)(c, 25)) + ((p = c) & u ^ ~p & f) + l[m] + d[m] | 0, t = ((0, r.np)(n, 2) ^ (0, r.np)(n, 13) ^ (0, r.np)(n, 22)) + o(n, i, s) | 0;
          (h = f, f = u, u = c, c = a + e | 0, a = s, s = i, i = n, n = e + t | 0);
        }
        var p;
        (n = n + this.A | 0, i = i + this.B | 0, s = s + this.C | 0, a = a + this.D | 0, c = c + this.E | 0, u = u + this.F | 0, f = f + this.G | 0, h = h + this.H | 0, this.set(n, i, s, a, c, u, f, h));
      }
      roundClean() {
        (0, r.ru)(d);
      }
      destroy() {
        (this.set(0, 0, 0, 0, 0, 0, 0, 0), (0, r.ru)(this.buffer));
      }
    }
    const h = (() => u.Vl(["0x428a2f98d728ae22", "0x7137449123ef65cd", "0xb5c0fbcfec4d3b2f", "0xe9b5dba58189dbbc", "0x3956c25bf348b538", "0x59f111f1b605d019", "0x923f82a4af194f9b", "0xab1c5ed5da6d8118", "0xd807aa98a3030242", "0x12835b0145706fbe", "0x243185be4ee4b28c", "0x550c7dc3d5ffb4e2", "0x72be5d74f27b896f", "0x80deb1fe3b1696b1", "0x9bdc06a725c71235", "0xc19bf174cf692694", "0xe49b69c19ef14ad2", "0xefbe4786384f25e3", "0x0fc19dc68b8cd5b5", "0x240ca1cc77ac9c65", "0x2de92c6f592b0275", "0x4a7484aa6ea6e483", "0x5cb0a9dcbd41fbd4", "0x76f988da831153b5", "0x983e5152ee66dfab", "0xa831c66d2db43210", "0xb00327c898fb213f", "0xbf597fc7beef0ee4", "0xc6e00bf33da88fc2", "0xd5a79147930aa725", "0x06ca6351e003826f", "0x142929670a0e6e70", "0x27b70a8546d22ffc", "0x2e1b21385c26c926", "0x4d2c6dfc5ac42aed", "0x53380d139d95b3df", "0x650a73548baf63de", "0x766a0abb3c77b2a8", "0x81c2c92e47edaee6", "0x92722c851482353b", "0xa2bfe8a14cf10364", "0xa81a664bbc423001", "0xc24b8b70d0f89791", "0xc76c51a30654be30", "0xd192e819d6ef5218", "0xd69906245565a910", "0xf40e35855771202a", "0x106aa07032bbd1b8", "0x19a4c116b8d2d0c8", "0x1e376c085141ab53", "0x2748774cdf8eeb99", "0x34b0bcb5e19b48a8", "0x391c0cb3c5c95a63", "0x4ed8aa4ae3418acb", "0x5b9cca4f7763e373", "0x682e6ff3d6b2b8a3", "0x748f82ee5defb2fc", "0x78a5636f43172f60", "0x84c87814a1f0ab72", "0x8cc702081a6439ec", "0x90befffa23631e28", "0xa4506cebde82bde9", "0xbef9a3f7b2c67915", "0xc67178f2e372532b", "0xca273eceea26619c", "0xd186b8c721c0c207", "0xeada7dd6cde0eb1e", "0xf57d4f7fee6ed178", "0x06f067aa72176fba", "0x0a637dc5a2c898a6", "0x113f9804bef90dae", "0x1b710b35131c471b", "0x28db77f523047d84", "0x32caab7b40c72493", "0x3c9ebe0a15c9bebc", "0x431d67c49c100d4c", "0x4cc5d4becb3e42b6", "0x597f299cfc657e2a", "0x5fcb6fab3ad6faec", "0x6c44198c4a475817"].map(e => BigInt(e))))(), p = (() => h[0])(), m = (() => h[1])(), b = new Uint32Array(80), y = new Uint32Array(80);
    class g extends i {
      constructor(e = 64) {
        (super(128, e, 16, !1), this.Ah = 0 | c[0], this.Al = 0 | c[1], this.Bh = 0 | c[2], this.Bl = 0 | c[3], this.Ch = 0 | c[4], this.Cl = 0 | c[5], this.Dh = 0 | c[6], this.Dl = 0 | c[7], this.Eh = 0 | c[8], this.El = 0 | c[9], this.Fh = 0 | c[10], this.Fl = 0 | c[11], this.Gh = 0 | c[12], this.Gl = 0 | c[13], this.Hh = 0 | c[14], this.Hl = 0 | c[15]);
      }
      get() {
        const {Ah: e, Al: t, Bh: n, Bl: r, Ch: o, Cl: i, Dh: s, Dl: a, Eh: c, El: u, Fh: l, Fl: d, Gh: f, Gl: h, Hh: p, Hl: m} = this;
        return [e, t, n, r, o, i, s, a, c, u, l, d, f, h, p, m];
      }
      set(e, t, n, r, o, i, s, a, c, u, l, d, f, h, p, m) {
        (this.Ah = 0 | e, this.Al = 0 | t, this.Bh = 0 | n, this.Bl = 0 | r, this.Ch = 0 | o, this.Cl = 0 | i, this.Dh = 0 | s, this.Dl = 0 | a, this.Eh = 0 | c, this.El = 0 | u, this.Fh = 0 | l, this.Fl = 0 | d, this.Gh = 0 | f, this.Gl = 0 | h, this.Hh = 0 | p, this.Hl = 0 | m);
      }
      process(e, t) {
        for (let u = 0; u < 16; (u++, t += 4)) (b[u] = e.getUint32(t), y[u] = e.getUint32(t += 4));
        for (let p = 16; p < 80; p++) {
          const e = 0 | b[p - 15], t = 0 | y[p - 15], n = u.m_(e, t, 1) ^ u.m_(e, t, 8) ^ u.NI(e, t, 7), r = u.Ou(e, t, 1) ^ u.Ou(e, t, 8) ^ u.Iq(e, t, 7), o = 0 | b[p - 2], i = 0 | y[p - 2], s = u.m_(o, i, 19) ^ u.FL(o, i, 61) ^ u.NI(o, i, 6), a = u.Ou(o, i, 19) ^ u.$p(o, i, 61) ^ u.Iq(o, i, 6), c = u.Xb(r, a, y[p - 7], y[p - 16]), l = u.u8(c, n, s, b[p - 7], b[p - 16]);
          (b[p] = 0 | l, y[p] = 0 | c);
        }
        let {Ah: n, Al: r, Bh: o, Bl: i, Ch: s, Cl: a, Dh: c, Dl: l, Eh: d, El: f, Fh: h, Fl: g, Gh: w, Gl: v, Hh: A, Hl: x} = this;
        for (let C = 0; C < 80; C++) {
          const e = u.m_(d, f, 14) ^ u.m_(d, f, 18) ^ u.FL(d, f, 41), t = u.Ou(d, f, 14) ^ u.Ou(d, f, 18) ^ u.$p(d, f, 41), P = d & h ^ ~d & w, E = f & g ^ ~f & v, k = u.zP(x, t, E, m[C], y[C]), I = u.pp(k, A, e, P, p[C], b[C]), B = 0 | k, S = u.m_(n, r, 28) ^ u.FL(n, r, 34) ^ u.FL(n, r, 39), O = u.Ou(n, r, 28) ^ u.$p(n, r, 34) ^ u.$p(n, r, 39), M = n & o ^ n & s ^ o & s, T = r & i ^ r & a ^ i & a;
          (A = 0 | w, x = 0 | v, w = 0 | h, v = 0 | g, h = 0 | d, g = 0 | f, {h: d, l: f} = u.IH(0 | c, 0 | l, 0 | I, 0 | B), c = 0 | s, l = 0 | a, s = 0 | o, a = 0 | i, o = 0 | n, i = 0 | r);
          const N = u.ac(B, O, T);
          (n = u.Fn(N, I, S, M), r = 0 | N);
        }
        ({h: n, l: r} = u.IH(0 | this.Ah, 0 | this.Al, 0 | n, 0 | r), {h: o, l: i} = u.IH(0 | this.Bh, 0 | this.Bl, 0 | o, 0 | i), {h: s, l: a} = u.IH(0 | this.Ch, 0 | this.Cl, 0 | s, 0 | a), {h: c, l: l} = u.IH(0 | this.Dh, 0 | this.Dl, 0 | c, 0 | l), {h: d, l: f} = u.IH(0 | this.Eh, 0 | this.El, 0 | d, 0 | f), {h: h, l: g} = u.IH(0 | this.Fh, 0 | this.Fl, 0 | h, 0 | g), {h: w, l: v} = u.IH(0 | this.Gh, 0 | this.Gl, 0 | w, 0 | v), {h: A, l: x} = u.IH(0 | this.Hh, 0 | this.Hl, 0 | A, 0 | x), this.set(n, r, o, i, s, a, c, l, d, f, h, g, w, v, A, x));
      }
      roundClean() {
        (0, r.ru)(b, y);
      }
      destroy() {
        ((0, r.ru)(this.buffer), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
      }
    }
    class w extends g {
      constructor() {
        (super(48), this.Ah = 0 | a[0], this.Al = 0 | a[1], this.Bh = 0 | a[2], this.Bl = 0 | a[3], this.Ch = 0 | a[4], this.Cl = 0 | a[5], this.Dh = 0 | a[6], this.Dl = 0 | a[7], this.Eh = 0 | a[8], this.El = 0 | a[9], this.Fh = 0 | a[10], this.Fl = 0 | a[11], this.Gh = 0 | a[12], this.Gl = 0 | a[13], this.Hh = 0 | a[14], this.Hl = 0 | a[15]);
      }
    }
    const v = (0, r.V1)(() => new f()), A = (0, r.V1)(() => new g()), x = (0, r.V1)(() => new w());
  },
  29272: function (e, t, n) {
    "use strict";
    n.d(t, {
      JQ: function () {
        return r;
      }
    });
    const r = n(68553).JQ;
  },
  92530: function (e, t, n) {
    "use strict";
    n.d(t, {
      fr: function () {
        return A;
      }
    });
    var r = n(16177), o = n(25884);
    const i = BigInt(0), s = BigInt(1), a = BigInt(2), c = BigInt(7), u = BigInt(256), l = BigInt(113), d = [], f = [], h = [];
    for (let x = 0, C = s, P = 1, E = 0; x < 24; x++) {
      ([P, E] = [E, (2 * P + 3 * E) % 5], d.push(2 * (5 * E + P)), f.push((x + 1) * (x + 2) / 2 % 64));
      let e = i;
      for (let t = 0; t < 7; t++) (C = (C << s ^ (C >> c) * l) % u, C & a && (e ^= s << (s << BigInt(t)) - s));
      h.push(e);
    }
    const p = (0, r.Vl)(h, !0), m = p[0], b = p[1], y = (e, t, n) => n > 32 ? (0, r.SD)(e, t, n) : (0, r.EP)(e, t, n), g = (e, t, n) => n > 32 ? (0, r.mk)(e, t, n) : (0, r.gm)(e, t, n);
    class w extends o.kb {
      constructor(e, t, n, r = !1, i = 24) {
        if ((super(), this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, this.enableXOF = !1, this.blockLen = e, this.suffix = t, this.outputLen = n, this.enableXOF = r, this.rounds = i, (0, o.k8)(n), !(0 < e && e < 200))) throw new Error("only keccak-f1600 function is supported");
        (this.state = new Uint8Array(200), this.state32 = (0, o.Jq)(this.state));
      }
      clone() {
        return this._cloneInto();
      }
      keccak() {
        ((0, o.Ux)(this.state32), (function (e, t = 24) {
          const n = new Uint32Array(10);
          for (let r = 24 - t; r < 24; r++) {
            for (let r = 0; r < 10; r++) n[r] = e[r] ^ e[r + 10] ^ e[r + 20] ^ e[r + 30] ^ e[r + 40];
            for (let r = 0; r < 10; r += 2) {
              const t = (r + 8) % 10, o = (r + 2) % 10, i = n[o], s = n[o + 1], a = y(i, s, 1) ^ n[t], c = g(i, s, 1) ^ n[t + 1];
              for (let n = 0; n < 50; n += 10) (e[r + n] ^= a, e[r + n + 1] ^= c);
            }
            let t = e[2], o = e[3];
            for (let n = 0; n < 24; n++) {
              const r = f[n], i = y(t, o, r), s = g(t, o, r), a = d[n];
              (t = e[a], o = e[a + 1], e[a] = i, e[a + 1] = s);
            }
            for (let r = 0; r < 50; r += 10) {
              for (let t = 0; t < 10; t++) n[t] = e[r + t];
              for (let t = 0; t < 10; t++) e[r + t] ^= ~n[(t + 2) % 10] & n[(t + 4) % 10];
            }
            (e[0] ^= m[r], e[1] ^= b[r]);
          }
          (0, o.ru)(n);
        })(this.state32, this.rounds), (0, o.Ux)(this.state32), this.posOut = 0, this.pos = 0);
      }
      update(e) {
        ((0, o.$h)(this), e = (0, o.O0)(e), (0, o.gk)(e));
        const {blockLen: t, state: n} = this, r = e.length;
        for (let o = 0; o < r; ) {
          const i = Math.min(t - this.pos, r - o);
          for (let t = 0; t < i; t++) n[this.pos++] ^= e[o++];
          this.pos === t && this.keccak();
        }
        return this;
      }
      finish() {
        if (this.finished) return;
        this.finished = !0;
        const {state: e, suffix: t, pos: n, blockLen: r} = this;
        (e[n] ^= t, 0 !== (128 & t) && n === r - 1 && this.keccak(), e[r - 1] ^= 128, this.keccak());
      }
      writeInto(e) {
        ((0, o.$h)(this, !1), (0, o.gk)(e), this.finish());
        const t = this.state, {blockLen: n} = this;
        for (let r = 0, o = e.length; r < o; ) {
          this.posOut >= n && this.keccak();
          const i = Math.min(n - this.posOut, o - r);
          (e.set(t.subarray(this.posOut, this.posOut + i), r), this.posOut += i, r += i);
        }
        return e;
      }
      xofInto(e) {
        if (!this.enableXOF) throw new Error("XOF is not possible for this instance");
        return this.writeInto(e);
      }
      xof(e) {
        return ((0, o.k8)(e), this.xofInto(new Uint8Array(e)));
      }
      digestInto(e) {
        if (((0, o.eB)(e, this), this.finished)) throw new Error("digest() was already called");
        return (this.writeInto(e), this.destroy(), e);
      }
      digest() {
        return this.digestInto(new Uint8Array(this.outputLen));
      }
      destroy() {
        (this.destroyed = !0, (0, o.ru)(this.state));
      }
      _cloneInto(e) {
        const {blockLen: t, suffix: n, outputLen: r, rounds: o, enableXOF: i} = this;
        return (e || (e = new w(t, n, r, i, o)), e.state32.set(this.state32), e.pos = this.pos, e.posOut = this.posOut, e.finished = this.finished, e.rounds = o, e.suffix = n, e.outputLen = r, e.enableXOF = i, e.destroyed = this.destroyed, e);
      }
    }
    const v = (e, t, n) => (0, o.V1)(() => new w(t, e, n)), A = (() => v(1, 136, 32))();
  },
  25884: function (e, t, n) {
    "use strict";
    n.d(t, {
      kb: function () {
        return k;
      },
      gk: function () {
        return s;
      },
      $h: function () {
        return c;
      },
      z3: function () {
        return a;
      },
      k8: function () {
        return i;
      },
      eB: function () {
        return u;
      },
      ci: function () {
        return w;
      },
      ru: function () {
        return d;
      },
      eV: function () {
        return E;
      },
      V1: function () {
        return I;
      },
      GL: function () {
        return f;
      },
      nr: function () {
        return x;
      },
      _t: function () {
        return o;
      },
      O6: function () {
        return B;
      },
      np: function () {
        return h;
      },
      Ux: function () {
        return b;
      },
      O0: function () {
        return P;
      },
      Jq: function () {
        return l;
      }
    });
    const r = "object" === typeof globalThis && ("crypto" in globalThis) ? globalThis.crypto : void 0;
    function o(e) {
      return e instanceof Uint8Array || ArrayBuffer.isView(e) && "Uint8Array" === e.constructor.name;
    }
    function i(e) {
      if (!Number.isSafeInteger(e) || e < 0) throw new Error("positive integer expected, got " + e);
    }
    function s(e, ...t) {
      if (!o(e)) throw new Error("Uint8Array expected");
      if (t.length > 0 && !t.includes(e.length)) throw new Error("Uint8Array expected of length " + t + ", got length=" + e.length);
    }
    function a(e) {
      if ("function" !== typeof e || "function" !== typeof e.create) throw new Error("Hash should be wrapped by utils.createHasher");
      (i(e.outputLen), i(e.blockLen));
    }
    function c(e, t = !0) {
      if (e.destroyed) throw new Error("Hash instance has been destroyed");
      if (t && e.finished) throw new Error("Hash#digest() has already been called");
    }
    function u(e, t) {
      s(e);
      const n = t.outputLen;
      if (e.length < n) throw new Error("digestInto() expects output buffer of length at least " + n);
    }
    function l(e) {
      return new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4));
    }
    function d(...e) {
      for (let t = 0; t < e.length; t++) e[t].fill(0);
    }
    function f(e) {
      return new DataView(e.buffer, e.byteOffset, e.byteLength);
    }
    function h(e, t) {
      return e << 32 - t | e >>> t;
    }
    const p = (() => 68 === new Uint8Array(new Uint32Array([287454020]).buffer)[0])();
    function m(e) {
      return e << 24 & 4278190080 | e << 8 & 16711680 | e >>> 8 & 65280 | e >>> 24 & 255;
    }
    const b = p ? e => e : function (e) {
      for (let t = 0; t < e.length; t++) e[t] = m(e[t]);
      return e;
    }, y = (() => "function" === typeof Uint8Array.from([]).toHex && "function" === typeof Uint8Array.fromHex)(), g = Array.from({
      length: 256
    }, (e, t) => t.toString(16).padStart(2, "0"));
    function w(e) {
      if ((s(e), y)) return e.toHex();
      let t = "";
      for (let n = 0; n < e.length; n++) t += g[e[n]];
      return t;
    }
    const v = {
      _0: 48,
      _9: 57,
      A: 65,
      F: 70,
      a: 97,
      f: 102
    };
    function A(e) {
      return e >= v._0 && e <= v._9 ? e - v._0 : e >= v.A && e <= v.F ? e - (v.A - 10) : e >= v.a && e <= v.f ? e - (v.a - 10) : void 0;
    }
    function x(e) {
      if ("string" !== typeof e) throw new Error("hex string expected, got " + typeof e);
      if (y) return Uint8Array.fromHex(e);
      const t = e.length, n = t / 2;
      if (t % 2) throw new Error("hex string expected, got unpadded hex of length " + t);
      const r = new Uint8Array(n);
      for (let o = 0, i = 0; o < n; (o++, i += 2)) {
        const t = A(e.charCodeAt(i)), n = A(e.charCodeAt(i + 1));
        if (void 0 === t || void 0 === n) {
          const t = e[i] + e[i + 1];
          throw new Error("hex string expected, got non-hex character \"" + t + "\" at index " + i);
        }
        r[o] = 16 * t + n;
      }
      return r;
    }
    function C(e) {
      if ("string" !== typeof e) throw new Error("string expected");
      return new Uint8Array(new TextEncoder().encode(e));
    }
    function P(e) {
      return ("string" === typeof e && (e = C(e)), s(e), e);
    }
    function E(...e) {
      let t = 0;
      for (let r = 0; r < e.length; r++) {
        const n = e[r];
        (s(n), t += n.length);
      }
      const n = new Uint8Array(t);
      for (let r = 0, o = 0; r < e.length; r++) {
        const t = e[r];
        (n.set(t, o), o += t.length);
      }
      return n;
    }
    class k {}
    function I(e) {
      const t = t => e().update(P(t)).digest(), n = e();
      return (t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e(), t);
    }
    function B(e = 32) {
      if (r && "function" === typeof r.getRandomValues) return r.getRandomValues(new Uint8Array(e));
      if (r && "function" === typeof r.randomBytes) return Uint8Array.from(r.randomBytes(e));
      throw new Error("crypto.getRandomValues must be defined");
    }
  },
  4609: function (e, t, n) {
    "use strict";
    n.d(t, {
      W: function () {
        return l;
      }
    });
    var r = "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\"", o = {
      rounded: ("SFRounded, ui-rounded, \"SF Pro Rounded\", ").concat(r),
      system: r
    }, i = {
      large: {
        actionButton: "9999px",
        connectButton: "12px",
        modal: "24px",
        modalMobile: "28px"
      },
      medium: {
        actionButton: "10px",
        connectButton: "8px",
        modal: "16px",
        modalMobile: "18px"
      },
      none: {
        actionButton: "0px",
        connectButton: "0px",
        modal: "0px",
        modalMobile: "0px"
      },
      small: {
        actionButton: "4px",
        connectButton: "4px",
        modal: "8px",
        modalMobile: "8px"
      }
    }, s = {
      large: {
        modalOverlay: "blur(20px)"
      },
      none: {
        modalOverlay: "blur(0px)"
      },
      small: {
        modalOverlay: "blur(4px)"
      }
    }, a = e => {
      let {borderRadius: t = "large", fontStack: n = "rounded", overlayBlur: r = "none"} = e;
      return {
        blurs: {
          modalOverlay: s[r].modalOverlay
        },
        fonts: {
          body: o[n]
        },
        radii: {
          actionButton: i[t].actionButton,
          connectButton: i[t].connectButton,
          menuButton: i[t].connectButton,
          modal: i[t].modal,
          modalMobile: i[t].modalMobile
        }
      };
    }, c = {
      blue: {
        accentColor: "#0E76FD",
        accentColorForeground: "#FFF"
      },
      green: {
        accentColor: "#1DB847",
        accentColorForeground: "#FFF"
      },
      orange: {
        accentColor: "#FF801F",
        accentColorForeground: "#FFF"
      },
      pink: {
        accentColor: "#FF5CA0",
        accentColorForeground: "#FFF"
      },
      purple: {
        accentColor: "#5F5AFA",
        accentColorForeground: "#FFF"
      },
      red: {
        accentColor: "#FA423C",
        accentColorForeground: "#FFF"
      }
    }, u = c.blue, l = function () {
      let {accentColor: e = u.accentColor, accentColorForeground: t = u.accentColorForeground, ...n} = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      return {
        ...a(n),
        colors: {
          accentColor: e,
          accentColorForeground: t,
          actionButtonBorder: "rgba(0, 0, 0, 0.04)",
          actionButtonBorderMobile: "rgba(0, 0, 0, 0.06)",
          actionButtonSecondaryBackground: "rgba(0, 0, 0, 0.06)",
          closeButton: "rgba(60, 66, 66, 0.8)",
          closeButtonBackground: "rgba(0, 0, 0, 0.06)",
          connectButtonBackground: "#FFF",
          connectButtonBackgroundError: "#FF494A",
          connectButtonInnerBackground: "linear-gradient(0deg, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.06))",
          connectButtonText: "#25292E",
          connectButtonTextError: "#FFF",
          connectionIndicator: "#30E000",
          downloadBottomCardBackground: "linear-gradient(126deg, rgba(255, 255, 255, 0) 9.49%, rgba(171, 171, 171, 0.04) 71.04%), #FFFFFF",
          downloadTopCardBackground: "linear-gradient(126deg, rgba(171, 171, 171, 0.2) 9.49%, rgba(255, 255, 255, 0) 71.04%), #FFFFFF",
          error: "#FF494A",
          generalBorder: "rgba(0, 0, 0, 0.06)",
          generalBorderDim: "rgba(0, 0, 0, 0.03)",
          menuItemBackground: "rgba(60, 66, 66, 0.1)",
          modalBackdrop: "rgba(0, 0, 0, 0.3)",
          modalBackground: "#FFF",
          modalBorder: "transparent",
          modalText: "#25292E",
          modalTextDim: "rgba(60, 66, 66, 0.3)",
          modalTextSecondary: "rgba(60, 66, 66, 0.6)",
          profileAction: "#FFF",
          profileActionHover: "rgba(255, 255, 255, 0.5)",
          profileForeground: "rgba(60, 66, 66, 0.06)",
          selectedOptionBorder: "rgba(60, 66, 66, 0.1)",
          standby: "#FFD641"
        },
        shadows: {
          connectButton: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          dialog: "0px 8px 32px rgba(0, 0, 0, 0.32)",
          profileDetailsAction: "0px 2px 6px rgba(37, 41, 46, 0.04)",
          selectedOption: "0px 2px 6px rgba(0, 0, 0, 0.24)",
          selectedWallet: "0px 2px 6px rgba(0, 0, 0, 0.12)",
          walletLogo: "0px 2px 16px rgba(0, 0, 0, 0.16)"
        }
      };
    };
    l.accentColors = c;
  },
  99912: function (e, t, n) {
    "use strict";
    n.d(t, {
      I: function () {
        return r;
      }
    });
    var r = "{\n  \"connect_wallet\": {\n    \"label\": \"Connect Wallet\",\n    \"wrong_network\": {\n      \"label\": \"Wrong network\"\n    }\n  },\n\n  \"intro\": {\n    \"title\": \"What is a Wallet?\",\n    \"description\": \"A wallet is used to send, receive, store, and display digital assets. It's also a new way to log in, without needing to create new accounts and passwords on every website.\",\n    \"digital_asset\": {\n      \"title\": \"A Home for your Digital Assets\",\n      \"description\": \"Wallets are used to send, receive, store, and display digital assets like Ethereum and NFTs.\"\n    },\n    \"login\": {\n      \"title\": \"A New Way to Log In\",\n      \"description\": \"Instead of creating new accounts and passwords on every website, just connect your wallet.\"\n    },\n    \"get\": {\n      \"label\": \"Get a Wallet\"\n    },\n    \"learn_more\": {\n      \"label\": \"Learn More\"\n    }\n  },\n\n  \"sign_in\": {\n    \"label\": \"Verify your account\",\n    \"description\": \"To finish connecting, you must sign a message in your wallet to verify that you are the owner of this account.\",\n    \"message\": {\n      \"send\": \"Sign message\",\n      \"preparing\": \"Preparing message...\",\n      \"cancel\": \"Cancel\",\n      \"preparing_error\": \"Error preparing message, please retry!\"\n    },\n    \"signature\": {\n      \"waiting\": \"Waiting for signature...\",\n      \"verifying\": \"Verifying signature...\",\n      \"signing_error\": \"Error signing message, please retry!\",\n      \"verifying_error\": \"Error verifying signature, please retry!\",\n      \"oops_error\": \"Oops, something went wrong!\"\n    }\n  },\n\n  \"connect\": {\n    \"label\": \"Connect\",\n    \"title\": \"Connect a Wallet\",\n    \"new_to_ethereum\": {\n      \"description\": \"New to Ethereum wallets?\",\n      \"learn_more\": {\n        \"label\": \"Learn More\"\n      }\n    },\n    \"learn_more\": {\n      \"label\": \"Learn more\"\n    },\n    \"recent\": \"Recent\",\n    \"status\": {\n      \"opening\": \"Opening %{wallet}...\",\n      \"connecting\": \"Connecting\",\n      \"connect_mobile\": \"Continue in %{wallet}\",\n      \"not_installed\": \"%{wallet} is not installed\",\n      \"not_available\": \"%{wallet} is not available\",\n      \"confirm\": \"Confirm connection in the extension\",\n      \"confirm_mobile\": \"Accept connection request in the wallet\"\n    },\n    \"secondary_action\": {\n      \"get\": {\n        \"description\": \"Don't have %{wallet}?\",\n        \"label\": \"GET\"\n      },\n      \"install\": {\n        \"label\": \"INSTALL\"\n      },\n      \"retry\": {\n        \"label\": \"RETRY\"\n      }\n    },\n    \"walletconnect\": {\n      \"description\": {\n        \"full\": \"Need the official WalletConnect modal?\",\n        \"compact\": \"Need the WalletConnect modal?\"\n      },\n      \"open\": {\n        \"label\": \"OPEN\"\n      }\n    }\n  },\n\n  \"connect_scan\": {\n    \"title\": \"Scan with %{wallet}\",\n    \"fallback_title\": \"Scan with your phone\"\n  },\n\n  \"connector_group\": {\n    \"installed\": \"Installed\",\n    \"recommended\": \"Recommended\",\n    \"other\": \"Other\",\n    \"popular\": \"Popular\",\n    \"more\": \"More\",\n    \"others\": \"Others\"\n  },\n\n  \"get\": {\n    \"title\": \"Get a Wallet\",\n    \"action\": {\n      \"label\": \"GET\"\n    },\n    \"mobile\": {\n      \"description\": \"Mobile Wallet\"\n    },\n    \"extension\": {\n      \"description\": \"Browser Extension\"\n    },\n    \"mobile_and_extension\": {\n      \"description\": \"Mobile Wallet and Extension\"\n    },\n    \"mobile_and_desktop\": {\n      \"description\": \"Mobile and Desktop Wallet\"\n    },\n    \"looking_for\": {\n      \"title\": \"Not what you're looking for?\",\n      \"mobile\": {\n        \"description\": \"Select a wallet on the main screen to get started with a different wallet provider.\"\n      },\n      \"desktop\": {\n        \"compact_description\": \"Select a wallet on the main screen to get started with a different wallet provider.\",\n        \"wide_description\": \"Select a wallet on the left to get started with a different wallet provider.\"\n      }\n    }\n  },\n\n  \"get_options\": {\n    \"title\": \"Get started with %{wallet}\",\n    \"short_title\": \"Get %{wallet}\",\n    \"mobile\": {\n      \"title\": \"%{wallet} for Mobile\",\n      \"description\": \"Use the mobile wallet to explore the world of Ethereum.\",\n      \"download\": {\n        \"label\": \"Get the app\"\n      }\n    },\n    \"extension\": {\n      \"title\": \"%{wallet} for %{browser}\",\n      \"description\": \"Access your wallet right from your favorite web browser.\",\n      \"download\": {\n        \"label\": \"Add to %{browser}\"\n      }\n    },\n    \"desktop\": {\n      \"title\": \"%{wallet} for %{platform}\",\n      \"description\": \"Access your wallet natively from your powerful desktop.\",\n      \"download\": {\n        \"label\": \"Add to %{platform}\"\n      }\n    }\n  },\n\n  \"get_mobile\": {\n    \"title\": \"Install %{wallet}\",\n    \"description\": \"Scan with your phone to download on iOS or Android\",\n    \"continue\": {\n      \"label\": \"Continue\"\n    }\n  },\n\n  \"get_instructions\": {\n    \"mobile\": {\n      \"connect\": {\n        \"label\": \"Connect\"\n      },\n      \"learn_more\": {\n        \"label\": \"Learn More\"\n      }\n    },\n    \"extension\": {\n      \"refresh\": {\n        \"label\": \"Refresh\"\n      },\n      \"learn_more\": {\n        \"label\": \"Learn More\"\n      }\n    },\n    \"desktop\": {\n      \"connect\": {\n        \"label\": \"Connect\"\n      },\n      \"learn_more\": {\n        \"label\": \"Learn More\"\n      }\n    }\n  },\n\n  \"chains\": {\n    \"title\": \"Switch Networks\",\n    \"wrong_network\": \"Wrong network detected, switch or disconnect to continue.\",\n    \"confirm\": \"Confirm in Wallet\",\n    \"switching_not_supported\": \"Your wallet does not support switching networks from %{appName}. Try switching networks from within your wallet instead.\",\n    \"switching_not_supported_fallback\": \"Your wallet does not support switching networks from this app. Try switching networks from within your wallet instead.\",\n    \"disconnect\": \"Disconnect\",\n    \"connected\": \"Connected\"\n  },\n\n  \"profile\": {\n    \"disconnect\": {\n      \"label\": \"Disconnect\"\n    },\n    \"copy_address\": {\n      \"label\": \"Copy Address\",\n      \"copied\": \"Copied!\"\n    },\n    \"explorer\": {\n      \"label\": \"View more on explorer\"\n    },\n    \"transactions\": {\n      \"description\": \"%{appName} transactions will appear here...\",\n      \"description_fallback\": \"Your transactions will appear here...\",\n      \"recent\": {\n        \"title\": \"Recent Transactions\"\n      },\n      \"clear\": {\n        \"label\": \"Clear All\"\n      }\n    }\n  },\n\n  \"wallet_connectors\": {\n    \"argent\": {\n      \"qr_code\": {\n        \"step1\": {\n          \"description\": \"Put Argent on your home screen for faster access to your wallet.\",\n          \"title\": \"Open the Argent app\"\n        },\n        \"step2\": {\n          \"description\": \"Create a wallet and username, or import an existing wallet.\",\n          \"title\": \"Create or Import a Wallet\"\n        },\n        \"step3\": {\n          \"description\": \"After you scan, a connection prompt will appear for you to connect your wallet.\",\n          \"title\": \"Tap the Scan QR button\"\n        }\n      }\n    },\n\n    \"bifrost\": {\n      \"qr_code\": {\n        \"step1\": {\n          \"description\": \"We recommend putting Bifrost Wallet on your home screen for quicker access.\",\n          \"title\": \"Open the Bifrost Wallet app\"\n        },\n        \"step2\": {\n          \"description\": \"Create or import a wallet using your recovery phrase.\",\n          \"title\": \"Create or Import a Wallet\"\n        },\n        \"step3\": {\n          \"description\": \"After you scan, a connection prompt will appear for you to connect your wallet.\",\n          \"title\": \"Tap the scan button\"\n        }\n      }\n    },\n\n    \"bitget\": {\n      \"qr_code\": {\n        \"step1\": {\n          \"description\": \"We recommend putting Bitget Wallet on your home screen for quicker access.\",\n          \"title\": \"Open the Bitget Wallet app\"\n        },\n        \"step2\": {\n          \"description\": \"Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.\",\n          \"title\": \"Create or Import a Wallet\"\n        },\n        \"step3\": {\n          \"description\": \"After you scan, a connection prompt will appear for you to connect your wallet.\",\n          \"title\": \"Tap the scan button\"\n        }\n      },\n\n      \"extension\": {\n        \"step1\": {\n          \"description\": \"We recommend pinning Bitget Wallet to your taskbar for quicker access to your wallet.\",\n          \"title\": \"Install the Bitget Wallet extension\"\n        },\n        \"step2\": {\n          \"description\": \"Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.\",\n          \"title\": \"Create or Import a Wallet\"\n        },\n        \"step3\": {\n          \"description\": \"Once you set up your wallet, click below to refresh the browser and load up the extension.\",\n          \"title\": \"Refresh your browser\"\n        }\n      }\n    },\n\n    \"bitski\": {\n      \"extension\": {\n        \"step1\": {\n          \"description\": \"We recommend pinning Bitski to your taskbar for quicker access to your wallet.\",\n          \"title\": \"Install the Bitski extension\"\n        },\n        \"step2\": {\n          \"description\": \"Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.\",\n          \"title\": \"Create or Import a Wallet\"\n        },\n        \"step3\": {\n          \"description\": \"Once you set up your wallet, click below to refresh the browser and load up the extension.\",\n          \"title\": \"Refresh your browser\"\n        }\n      }\n    },\n\n    \"bitverse\": {\n      \"qr_code\": {\n        \"step1\": {\n          \"title\": \"Open the Bitverse Wallet app\",\n          \"description\": \"Add Bitverse Wallet to your home screen for faster access to your wallet.\"\n        },\n        \"step2\": {\n          \"title\": \"Create or Import a Wallet\",\n          \"description\": \"Create a new wallet or import an existing one.\"\n        },\n        \"step3\": {\n          \"title\": \"Tap the QR icon and scan\",\n          \"description\": \"Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect.\"\n        }\n      }\n    },\n\n    \"bloom\": {\n      \"desktop\": {\n        \"step1\": {\n          \"title\": \"Open the Bloom Wallet app\",\n          \"description\": \"We recommend putting Bloom Wallet on your home screen for quicker access.\"\n        },\n        \"step2\": {\n          \"description\": \"Create or import a wallet using your recovery phrase.\",\n          \"title\": \"Create or Import a Wallet\"\n        },\n        \"step3\": {\n          \"description\": \"After you have a wallet, click on Connect to connect via Bloom. A connection prompt in the app will appear for you to confirm the connection.\",\n          \"title\": \"Click on Connect\"\n        }\n      },\n      \"qr_code\": {\n        \"step1\": {\n          \"title\": \"Open the Bloom Wallet app\",\n          \"description\": \"We recommend putting Bloom Wallet on your home screen for quicker access.\"\n        },\n        \"step2\": {\n          \"description\": \"Create or import a wallet using your recovery phrase.\",\n          \"title\": \"Create or Import a Wallet\"\n        },\n        \"step3\": {\n          \"description\": \"After you have a wallet, click on Connect to connect via Bloom. A connection prompt in the app will appear for you to confirm the connection.\",\n          \"title\": \"Click on Connect\"\n        }\n      }\n    },\n\n    \"bybit\": {\n      \"qr_code\": {\n        \"step1\": {\n          \"description\": \"We recommend putting Bybit on your home screen for faster access to your wallet.\",\n          \"title\": \"Open the Bybit app\"\n        },\n        \"step2\": {\n          \"description\": \"You can easily backup your wallet using our backup feature on your phone.\",\n          \"title\": \"Create or Import a Wallet\"\n        },\n        \"step3\": {\n          \"description\": \"After you scan, a connection prompt will appear for you to connect your wallet.\",\n          \"title\": \"Tap the scan button\"\n        }\n      },\n\n      \"extension\": {\n        \"step1\": {\n          \"description\": \"Click at the top right of your browser and pin Bybit Wallet for easy access.\",\n          \"title\": \"Install the Bybit Wallet extension\"\n        },\n        \"step2\": {\n          \"description\": \"Create a new wallet or import an existing one.\",\n          \"title\": \"Create or Import a wallet\"\n        },\n        \"step3\": {\n          \"description\": \"Once you set up Bybit Wallet, click below to refresh the browser and load up the extension.\",\n          \"title\": \"Refresh your browser\"\n        }\n      }\n    },\n\n    \"coin98\": {\n      \"qr_code\": {\n        \"step1\": {\n          \"description\": \"We recommend putting Coin98 Wallet on your home screen for faster access to your wallet.\",\n          \"title\": \"Open the Coin98 Wallet app\"\n        },\n        \"step2\": {\n          \"description\": \"You can easily backup your wallet using our backup feature on your phone.\",\n          \"title\": \"Create or Import a Wallet\"\n        },\n        \"step3\": {\n          \"description\": \"After you scan, a connection prompt will appear for you to connect your wallet.\",\n          \"title\": \"Tap the WalletConnect button\"\n        }\n      },\n\n      \"extension\": {\n        \"step1\": {\n          \"description\": \"Click at the top right of your browser and pin Coin98 Wallet for easy access.\",\n          \"title\": \"Install the Coin98 Wallet extension\"\n        },\n        \"step2\": {\n          \"description\": \"Create a new wallet or import an existing one.\",\n          \"title\": \"Create or Import a wallet\"\n        },\n        \"step3\": {\n          \"description\": \"Once you set up Coin98 Wallet, click below to refresh the browser and load up the extension.\",\n          \"title\": \"Refresh your browser\"\n        }\n      }\n    },\n\n    \"coinbase\": {\n      \"qr_code\": {\n        \"step1\": {\n          \"description\": \"We recommend putting Coinbase Wallet on your home screen for quicker access.\",\n          \"title\": \"Open the Coinbase Wallet app\"\n        },\n        \"step2\": {\n          \"description\": \"You can easily backup your wallet using the cloud backup feature.\",\n          \"title\": \"Create or Import a Wallet\"\n        },\n        \"step3\": {\n          \"description\": \"After you scan, a connection prompt will appear for you to connect your wallet.\",\n          \"title\": \"Tap the scan button\"\n        }\n      },\n\n      \"extension\": {\n        \"step1\": {\n          \"description\": \"We recommend pinning Coinbase Wallet to your taskbar for quicker access to your wallet.\",\n          \"title\": \"Install the Coinbase Wallet extension\"\n        },\n        \"step2\": {\n          \"description\": \"Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.\",\n          \"title\": \"Create or Import a Wallet\"\n        },\n        \"step3\": {\n          \"description\": \"Once you set up your wallet, click below to refresh the browser and load up the extension.\",\n          \"title\": \"Refresh your browser\"\n        }\n      }\n    },\n\n    \"compass\": {\n      \"extension\": {\n        \"step1\": {\n          \"description\": \"We recommend pinning Compass Wallet to your taskbar for quicker access to your wallet.\",\n          \"title\": \"Install the Compass Wallet extension\"\n        },\n        \"step2\": {\n          \"description\": \"Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.\",\n          \"title\": \"Create or Import a Wallet\"\n        },\n        \"step3\": {\n          \"description\": \"Once you set up your wallet, click below to refresh the browser and load up the extension.\",\n          \"title\": \"Refresh your browser\"\n        }\n      }\n    },\n\n    \"core\": {\n      \"qr_code\": {\n        \"step1\": {\n          \"description\": \"We recommend putting Core on your home screen for faster access to your wallet.\",\n          \"title\": \"Open the Core app\"\n        },\n        \"step2\": {\n          \"description\": \"You can easily backup your wallet using our backup feature on your phone.\",\n          \"title\": \"Create or Import a Wallet\"\n        },\n        \"step3\": {\n          \"description\": \"After you scan, a connection prompt will appear for you to connect your wallet.\",\n          \"title\": \"Tap the WalletConnect button\"\n        }\n      },\n\n      \"extension\": {\n        \"step1\": {\n          \"description\": \"We recommend pinning Core to your taskbar for quicker access to your wallet.\",\n          \"title\": \"Install the Core extension\"\n        },\n        \"step2\": {\n          \"description\": \"Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.\",\n          \"title\": \"Create or Import a Wallet\"\n        },\n        \"step3\": {\n          \"description\": \"Once you set up your wallet, click below to refresh the browser and load up the extension.\",\n          \"title\": \"Refresh your browser\"\n        }\n      }\n    },\n\n    \"fox\": {\n      \"qr_code\": {\n        \"step1\": {\n          \"description\": \"We recommend putting FoxWallet on your home screen for quicker access.\",\n          \"title\": \"Open the FoxWallet app\"\n        },\n        \"step2\": {\n          \"description\": \"Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.\",\n          \"title\": \"Create or Import a Wallet\"\n        },\n        \"step3\": {\n          \"description\": \"After you scan, a connection prompt will appear for you to connect your wallet.\",\n          \"title\": \"Tap the scan button\"\n        }\n      }\n    },\n\n    \"frontier\": {\n      \"qr_code\": {\n        \"step1\": {\n          \"description\": \"We recommend putting Frontier Wallet on your home screen for quicker access.\",\n          \"title\": \"Open the Frontier Wallet app\"\n        },\n        \"step2\": {\n          \"description\": \"Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.\",\n          \"title\": \"Create or Import a Wallet\"\n        },\n        \"step3\": {\n          \"description\": \"After you scan, a connection prompt will appear for you to connect your wallet.\",\n          \"title\": \"Tap the scan button\"\n        }\n      },\n\n      \"extension\": {\n        \"step1\": {\n          \"description\": \"We recommend pinning Frontier Wallet to your taskbar for quicker access to your wallet.\",\n          \"title\": \"Install the Frontier Wallet extension\"\n        },\n        \"step2\": {\n          \"description\": \"Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.\",\n          \"title\": \"Create or Import a Wallet\"\n        },\n        \"step3\": {\n          \"description\": \"Once you set up your wallet, click below to refresh the browser and load up the extension.\",\n          \"title\": \"Refresh your browser\"\n        }\n      }\n    },\n\n    \"im_token\": {\n      \"qr_code\": {\n        \"step1\": {\n          \"title\": \"Open the imToken app\",\n          \"description\": \"Put imToken app on your home screen for faster access to your wallet.\"\n        },\n        \"step2\": {\n          \"title\": \"Create or Import a Wallet\",\n          \"description\": \"Create a new wallet or import an existing one.\"\n        },\n        \"step3\": {\n          \"title\": \"Tap Scanner Icon in top right corner\",\n          \"description\": \"Choose New Connection, then scan the QR code and confirm the prompt to connect.\"\n        }\n      }\n    },\n\n    \"kaikas\": {\n      \"extension\": {\n        \"step1\": {\n          \"description\": \"We recommend pinning Kaikas to your taskbar for quicker access to your wallet.\",\n          \"title\": \"Install the Kaikas extension\"\n        },\n        \"step2\": {\n          \"description\": \"Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.\",\n          \"title\": \"Create or Import a Wallet\"\n        },\n        \"step3\": {\n          \"description\": \"Once you set up your wallet, click below to refresh the browser and load up the extension.\",\n          \"title\": \"Refresh your browser\"\n        }\n      },\n      \"qr_code\": {\n        \"step1\": {\n          \"title\": \"Open the Kaikas app\",\n          \"description\": \"Put Kaikas app on your home screen for faster access to your wallet.\"\n        },\n        \"step2\": {\n          \"title\": \"Create or Import a Wallet\",\n          \"description\": \"Create a new wallet or import an existing one.\"\n        },\n        \"step3\": {\n          \"title\": \"Tap Scanner Icon in top right corner\",\n          \"description\": \"Choose New Connection, then scan the QR code and confirm the prompt to connect.\"\n        }\n      }\n    },\n\n    \"kraken\": {\n      \"qr_code\": {\n        \"step1\": {\n          \"title\": \"Open the Kraken Wallet app\",\n          \"description\": \"Add Kraken Wallet to your home screen for faster access to your wallet.\"\n        },\n        \"step2\": {\n          \"title\": \"Create or Import a Wallet\",\n          \"description\": \"Create a new wallet or import an existing one.\"\n        },\n        \"step3\": {\n          \"title\": \"Tap the QR icon and scan\",\n          \"description\": \"Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect.\"\n        }\n      }\n    },\n\n    \"kresus\": {\n      \"qr_code\": {\n        \"step1\": {\n          \"title\": \"Open the Kresus Wallet app\",\n          \"description\": \"Add Kresus Wallet to your home screen for faster access to your wallet.\"\n        },\n        \"step2\": {\n          \"title\": \"Create or Import a Wallet\",\n          \"description\": \"Create a new wallet or import an existing one.\"\n        },\n        \"step3\": {\n          \"title\": \"Tap the QR icon and scan\",\n          \"description\": \"Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect.\"\n        }\n      }\n    },\n\n    \"magicEden\": {\n      \"extension\": {\n        \"step1\": {\n          \"title\": \"Install the Magic Eden extension\",\n          \"description\": \"We recommend pinning Magic Eden to your taskbar for easier access to your wallet.\"\n        },\n        \"step2\": {\n          \"title\": \"Create or Import a Wallet\",\n          \"description\": \"Be sure to back up your wallet using a secure method. Never share your secret recovery phrase with anyone.\"\n        },\n        \"step3\": {\n          \"title\": \"Refresh your browser\",\n          \"description\": \"Once you set up your wallet, click below to refresh the browser and load up the extension.\"\n        }\n      }\n    },\n\n    \"metamask\": {\n      \"qr_code\": {\n        \"step1\": {\n          \"title\": \"Open the MetaMask app\",\n          \"description\": \"We recommend putting MetaMask on your home screen for quicker access.\"\n        },\n        \"step2\": {\n          \"title\": \"Create or Import a Wallet\",\n          \"description\": \"Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.\"\n        },\n        \"step3\": {\n          \"title\": \"Tap the scan button\",\n          \"description\": \"After you scan, a connection prompt will appear for you to connect your wallet.\"\n        }\n      },\n\n      \"extension\": {\n        \"step1\": {\n          \"title\": \"Install the MetaMask extension\",\n          \"description\": \"We recommend pinning MetaMask to your taskbar for quicker access to your wallet.\"\n        },\n        \"step2\": {\n          \"title\": \"Create or Import a Wallet\",\n          \"description\": \"Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.\"\n        },\n        \"step3\": {\n          \"title\": \"Refresh your browser\",\n          \"description\": \"Once you set up your wallet, click below to refresh the browser and load up the extension.\"\n        }\n      }\n    },\n\n    \"nestwallet\": {\n      \"extension\": {\n        \"step1\": {\n          \"title\": \"Install the NestWallet extension\",\n          \"description\": \"We recommend pinning NestWallet to your taskbar for quicker access to your wallet.\"\n        },\n        \"step2\": {\n          \"title\": \"Create or Import a Wallet\",\n          \"description\": \"Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.\"\n        },\n        \"step3\": {\n          \"title\": \"Refresh your browser\",\n          \"description\": \"Once you set up your wallet, click below to refresh the browser and load up the extension.\"\n        }\n      }\n    },\n\n    \"okx\": {\n      \"qr_code\": {\n        \"step1\": {\n          \"title\": \"Open the OKX Wallet app\",\n          \"description\": \"We recommend putting OKX Wallet on your home screen for quicker access.\"\n        },\n        \"step2\": {\n          \"title\": \"Create or Import a Wallet\",\n          \"description\": \"Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.\"\n        },\n        \"step3\": {\n          \"title\": \"Tap the scan button\",\n          \"description\": \"After you scan, a connection prompt will appear for you to connect your wallet.\"\n        }\n      },\n\n      \"extension\": {\n        \"step1\": {\n          \"title\": \"Install the OKX Wallet extension\",\n          \"description\": \"We recommend pinning OKX Wallet to your taskbar for quicker access to your wallet.\"\n        },\n        \"step2\": {\n          \"title\": \"Create or Import a Wallet\",\n          \"description\": \"Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.\"\n        },\n        \"step3\": {\n          \"title\": \"Refresh your browser\",\n          \"description\": \"Once you set up your wallet, click below to refresh the browser and load up the extension.\"\n        }\n      }\n    },\n\n    \"omni\": {\n      \"qr_code\": {\n        \"step1\": {\n          \"title\": \"Open the Omni app\",\n          \"description\": \"Add Omni to your home screen for faster access to your wallet.\"\n        },\n        \"step2\": {\n          \"title\": \"Create or Import a Wallet\",\n          \"description\": \"Create a new wallet or import an existing one.\"\n        },\n        \"step3\": {\n          \"title\": \"Tap the QR icon and scan\",\n          \"description\": \"Tap the QR icon on your home screen, scan the code and confirm the prompt to connect.\"\n        }\n      }\n    },\n\n    \"1inch\": {\n      \"qr_code\": {\n        \"step1\": {\n          \"description\": \"Put 1inch Wallet on your home screen for faster access to your wallet.\",\n          \"title\": \"Open the 1inch Wallet app\"\n        },\n        \"step2\": {\n          \"description\": \"Create a wallet and username, or import an existing wallet.\",\n          \"title\": \"Create or Import a Wallet\"\n        },\n        \"step3\": {\n          \"description\": \"After you scan, a connection prompt will appear for you to connect your wallet.\",\n          \"title\": \"Tap the Scan QR button\"\n        }\n      }\n    },\n\n    \"token_pocket\": {\n      \"qr_code\": {\n        \"step1\": {\n          \"title\": \"Open the TokenPocket app\",\n          \"description\": \"We recommend putting TokenPocket on your home screen for quicker access.\"\n        },\n        \"step2\": {\n          \"title\": \"Create or Import a Wallet\",\n          \"description\": \"Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.\"\n        },\n        \"step3\": {\n          \"title\": \"Tap the scan button\",\n          \"description\": \"After you scan, a connection prompt will appear for you to connect your wallet.\"\n        }\n      },\n\n      \"extension\": {\n        \"step1\": {\n          \"title\": \"Install the TokenPocket extension\",\n          \"description\": \"We recommend pinning TokenPocket to your taskbar for quicker access to your wallet.\"\n        },\n        \"step2\": {\n          \"title\": \"Create or Import a Wallet\",\n          \"description\": \"Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.\"\n        },\n        \"step3\": {\n          \"title\": \"Refresh your browser\",\n          \"description\": \"Once you set up your wallet, click below to refresh the browser and load up the extension.\"\n        }\n      }\n    },\n\n    \"trust\": {\n      \"qr_code\": {\n        \"step1\": {\n          \"title\": \"Open the Trust Wallet app\",\n          \"description\": \"Put Trust Wallet on your home screen for faster access to your wallet.\"\n        },\n        \"step2\": {\n          \"title\": \"Create or Import a Wallet\",\n          \"description\": \"Create a new wallet or import an existing one.\"\n        },\n        \"step3\": {\n          \"title\": \"Tap WalletConnect in Settings\",\n          \"description\": \"Choose New Connection, then scan the QR code and confirm the prompt to connect.\"\n        }\n      },\n\n      \"extension\": {\n        \"step1\": {\n          \"title\": \"Install the Trust Wallet extension\",\n          \"description\": \"Click at the top right of your browser and pin Trust Wallet for easy access.\"\n        },\n        \"step2\": {\n          \"title\": \"Create or Import a wallet\",\n          \"description\": \"Create a new wallet or import an existing one.\"\n        },\n        \"step3\": {\n          \"title\": \"Refresh your browser\",\n          \"description\": \"Once you set up Trust Wallet, click below to refresh the browser and load up the extension.\"\n        }\n      }\n    },\n\n    \"uniswap\": {\n      \"qr_code\": {\n        \"step1\": {\n          \"title\": \"Open the Uniswap app\",\n          \"description\": \"Add Uniswap Wallet to your home screen for faster access to your wallet.\"\n        },\n        \"step2\": {\n          \"title\": \"Create or Import a Wallet\",\n          \"description\": \"Create a new wallet or import an existing one.\"\n        },\n        \"step3\": {\n          \"title\": \"Tap the QR icon and scan\",\n          \"description\": \"Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect.\"\n        }\n      }\n    },\n\n    \"zerion\": {\n      \"qr_code\": {\n        \"step1\": {\n          \"title\": \"Open the Zerion app\",\n          \"description\": \"We recommend putting Zerion on your home screen for quicker access.\"\n        },\n        \"step2\": {\n          \"title\": \"Create or Import a Wallet\",\n          \"description\": \"Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.\"\n        },\n        \"step3\": {\n          \"title\": \"Tap the scan button\",\n          \"description\": \"After you scan, a connection prompt will appear for you to connect your wallet.\"\n        }\n      },\n\n      \"extension\": {\n        \"step1\": {\n          \"title\": \"Install the Zerion extension\",\n          \"description\": \"We recommend pinning Zerion to your taskbar for quicker access to your wallet.\"\n        },\n        \"step2\": {\n          \"title\": \"Create or Import a Wallet\",\n          \"description\": \"Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.\"\n        },\n        \"step3\": {\n          \"title\": \"Refresh your browser\",\n          \"description\": \"Once you set up your wallet, click below to refresh the browser and load up the extension.\"\n        }\n      }\n    },\n\n    \"rainbow\": {\n      \"qr_code\": {\n        \"step1\": {\n          \"title\": \"Open the Rainbow app\",\n          \"description\": \"We recommend putting Rainbow on your home screen for faster access to your wallet.\"\n        },\n        \"step2\": {\n          \"title\": \"Create or Import a Wallet\",\n          \"description\": \"You can easily backup your wallet using our backup feature on your phone.\"\n        },\n        \"step3\": {\n          \"title\": \"Tap the scan button\",\n          \"description\": \"After you scan, a connection prompt will appear for you to connect your wallet.\"\n        }\n      }\n    },\n\n    \"enkrypt\": {\n      \"extension\": {\n        \"step1\": {\n          \"description\": \"We recommend pinning Enkrypt Wallet to your taskbar for quicker access to your wallet.\",\n          \"title\": \"Install the Enkrypt Wallet extension\"\n        },\n        \"step2\": {\n          \"description\": \"Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.\",\n          \"title\": \"Create or Import a Wallet\"\n        },\n        \"step3\": {\n          \"description\": \"Once you set up your wallet, click below to refresh the browser and load up the extension.\",\n          \"title\": \"Refresh your browser\"\n        }\n      }\n    },\n\n    \"frame\": {\n      \"extension\": {\n        \"step1\": {\n          \"description\": \"We recommend pinning Frame to your taskbar for quicker access to your wallet.\",\n          \"title\": \"Install Frame & the companion extension\"\n        },\n        \"step2\": {\n          \"description\": \"Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.\",\n          \"title\": \"Create or Import a Wallet\"\n        },\n        \"step3\": {\n          \"description\": \"Once you set up your wallet, click below to refresh the browser and load up the extension.\",\n          \"title\": \"Refresh your browser\"\n        }\n      }\n    },\n\n    \"one_key\": {\n      \"extension\": {\n        \"step1\": {\n          \"title\": \"Install the OneKey Wallet extension\",\n          \"description\": \"We recommend pinning OneKey Wallet to your taskbar for quicker access to your wallet.\"\n        },\n        \"step2\": {\n          \"title\": \"Create or Import a Wallet\",\n          \"description\": \"Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.\"\n        },\n        \"step3\": {\n          \"title\": \"Refresh your browser\",\n          \"description\": \"Once you set up your wallet, click below to refresh the browser and load up the extension.\"\n        }\n      }\n    },\n\n    \"phantom\": {\n      \"extension\": {\n        \"step1\": {\n          \"title\": \"Install the Phantom extension\",\n          \"description\": \"We recommend pinning Phantom to your taskbar for easier access to your wallet.\"\n        },\n        \"step2\": {\n          \"title\": \"Create or Import a Wallet\",\n          \"description\": \"Be sure to back up your wallet using a secure method. Never share your secret recovery phrase with anyone.\"\n        },\n        \"step3\": {\n          \"title\": \"Refresh your browser\",\n          \"description\": \"Once you set up your wallet, click below to refresh the browser and load up the extension.\"\n        }\n      }\n    },\n\n    \"rabby\": {\n      \"extension\": {\n        \"step1\": {\n          \"title\": \"Install the Rabby extension\",\n          \"description\": \"We recommend pinning Rabby to your taskbar for quicker access to your wallet.\"\n        },\n        \"step2\": {\n          \"title\": \"Create or Import a Wallet\",\n          \"description\": \"Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.\"\n        },\n        \"step3\": {\n          \"title\": \"Refresh your browser\",\n          \"description\": \"Once you set up your wallet, click below to refresh the browser and load up the extension.\"\n        }\n      }\n    },\n\n    \"ronin\": {\n      \"qr_code\": {\n        \"step1\": {\n          \"description\": \"We recommend putting Ronin Wallet on your home screen for quicker access.\",\n          \"title\": \"Open the Ronin Wallet app\"\n        },\n        \"step2\": {\n          \"description\": \"Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.\",\n          \"title\": \"Create or Import a Wallet\"\n        },\n        \"step3\": {\n          \"description\": \"After you scan, a connection prompt will appear for you to connect your wallet.\",\n          \"title\": \"Tap the scan button\"\n        }\n      },\n\n      \"extension\": {\n        \"step1\": {\n          \"description\": \"We recommend pinning Ronin Wallet to your taskbar for quicker access to your wallet.\",\n          \"title\": \"Install the Ronin Wallet extension\"\n        },\n        \"step2\": {\n          \"description\": \"Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.\",\n          \"title\": \"Create or Import a Wallet\"\n        },\n        \"step3\": {\n          \"description\": \"Once you set up your wallet, click below to refresh the browser and load up the extension.\",\n          \"title\": \"Refresh your browser\"\n        }\n      }\n    },\n\n    \"ramper\": {\n      \"extension\": {\n        \"step1\": {\n          \"title\": \"Install the Ramper extension\",\n          \"description\": \"We recommend pinning Ramper to your taskbar for easier access to your wallet.\"\n        },\n        \"step2\": {\n          \"title\": \"Create a Wallet\",\n          \"description\": \"Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.\"\n        },\n        \"step3\": {\n          \"title\": \"Refresh your browser\",\n          \"description\": \"Once you set up your wallet, click below to refresh the browser and load up the extension.\"\n        }\n      }\n    },\n\n    \"safeheron\": {\n      \"extension\": {\n        \"step1\": {\n          \"title\": \"Install the Core extension\",\n          \"description\": \"We recommend pinning Safeheron to your taskbar for quicker access to your wallet.\"\n        },\n        \"step2\": {\n          \"title\": \"Create or Import a Wallet\",\n          \"description\": \"Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.\"\n        },\n        \"step3\": {\n          \"title\": \"Refresh your browser\",\n          \"description\": \"Once you set up your wallet, click below to refresh the browser and load up the extension.\"\n        }\n      }\n    },\n\n    \"taho\": {\n      \"extension\": {\n        \"step1\": {\n          \"title\": \"Install the Taho extension\",\n          \"description\": \"We recommend pinning Taho to your taskbar for quicker access to your wallet.\"\n        },\n        \"step2\": {\n          \"title\": \"Create or Import a Wallet\",\n          \"description\": \"Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.\"\n        },\n        \"step3\": {\n          \"title\": \"Refresh your browser\",\n          \"description\": \"Once you set up your wallet, click below to refresh the browser and load up the extension.\"\n        }\n      }\n    },\n\n    \"talisman\": {\n      \"extension\": {\n        \"step1\": {\n          \"title\": \"Install the Talisman extension\",\n          \"description\": \"We recommend pinning Talisman to your taskbar for quicker access to your wallet.\"\n        },\n        \"step2\": {\n          \"title\": \"Create or Import an Ethereum Wallet\",\n          \"description\": \"Be sure to back up your wallet using a secure method. Never share your recovery phrase with anyone.\"\n        },\n        \"step3\": {\n          \"title\": \"Refresh your browser\",\n          \"description\": \"Once you set up your wallet, click below to refresh the browser and load up the extension.\"\n        }\n      }\n    },\n\n    \"xdefi\": {\n      \"extension\": {\n        \"step1\": {\n          \"title\": \"Install the XDEFI Wallet extension\",\n          \"description\": \"We recommend pinning XDEFI Wallet to your taskbar for quicker access to your wallet.\"\n        },\n        \"step2\": {\n          \"title\": \"Create or Import a Wallet\",\n          \"description\": \"Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.\"\n        },\n        \"step3\": {\n          \"title\": \"Refresh your browser\",\n          \"description\": \"Once you set up your wallet, click below to refresh the browser and load up the extension.\"\n        }\n      }\n    },\n\n    \"zeal\": {\n      \"extension\": {\n        \"step1\": {\n          \"title\": \"Install the Zeal extension\",\n          \"description\": \"We recommend pinning Zeal to your taskbar for quicker access to your wallet.\"\n        },\n        \"step2\": {\n          \"title\": \"Create or Import a Wallet\",\n          \"description\": \"Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.\"\n        },\n        \"step3\": {\n          \"title\": \"Refresh your browser\",\n          \"description\": \"Once you set up your wallet, click below to refresh the browser and load up the extension.\"\n        }\n      }\n    },\n\n    \"safepal\": {\n      \"extension\": {\n        \"step1\": {\n          \"title\": \"Install the SafePal Wallet extension\",\n          \"description\": \"Click at the top right of your browser and pin SafePal Wallet for easy access.\"\n        },\n        \"step2\": {\n          \"title\": \"Create or Import a wallet\",\n          \"description\": \"Create a new wallet or import an existing one.\"\n        },\n        \"step3\": {\n          \"title\": \"Refresh your browser\",\n          \"description\": \"Once you set up SafePal Wallet, click below to refresh the browser and load up the extension.\"\n        }\n      },\n      \"qr_code\": {\n        \"step1\": {\n          \"title\": \"Open the SafePal Wallet app\",\n          \"description\": \"Put SafePal Wallet on your home screen for faster access to your wallet.\"\n        },\n        \"step2\": {\n          \"title\": \"Create or Import a Wallet\",\n          \"description\": \"Create a new wallet or import an existing one.\"\n        },\n        \"step3\": {\n          \"title\": \"Tap WalletConnect in Settings\",\n          \"description\": \"Choose New Connection, then scan the QR code and confirm the prompt to connect.\"\n        }\n      }\n    },\n\n    \"desig\": {\n      \"extension\": {\n        \"step1\": {\n          \"title\": \"Install the Desig extension\",\n          \"description\": \"We recommend pinning Desig to your taskbar for easier access to your wallet.\"\n        },\n        \"step2\": {\n          \"title\": \"Create a Wallet\",\n          \"description\": \"Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.\"\n        },\n        \"step3\": {\n          \"title\": \"Refresh your browser\",\n          \"description\": \"Once you set up your wallet, click below to refresh the browser and load up the extension.\"\n        }\n      }\n    },\n\n    \"subwallet\": {\n      \"extension\": {\n        \"step1\": {\n          \"title\": \"Install the SubWallet extension\",\n          \"description\": \"We recommend pinning SubWallet to your taskbar for quicker access to your wallet.\"\n        },\n        \"step2\": {\n          \"title\": \"Create or Import a Wallet\",\n          \"description\": \"Be sure to back up your wallet using a secure method. Never share your recovery phrase with anyone.\"\n        },\n        \"step3\": {\n          \"title\": \"Refresh your browser\",\n          \"description\": \"Once you set up your wallet, click below to refresh the browser and load up the extension.\"\n        }\n      },\n      \"qr_code\": {\n        \"step1\": {\n          \"title\": \"Open the SubWallet app\",\n          \"description\": \"We recommend putting SubWallet on your home screen for quicker access.\"\n        },\n        \"step2\": {\n          \"title\": \"Create or Import a Wallet\",\n          \"description\": \"Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.\"\n        },\n        \"step3\": {\n          \"title\": \"Tap the scan button\",\n          \"description\": \"After you scan, a connection prompt will appear for you to connect your wallet.\"\n        }\n      }\n    },\n\n    \"clv\": {\n      \"extension\": {\n        \"step1\": {\n          \"title\": \"Install the CLV Wallet extension\",\n          \"description\": \"We recommend pinning CLV Wallet to your taskbar for quicker access to your wallet.\"\n        },\n        \"step2\": {\n          \"title\": \"Create or Import a Wallet\",\n          \"description\": \"Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.\"\n        },\n        \"step3\": {\n          \"title\": \"Refresh your browser\",\n          \"description\": \"Once you set up your wallet, click below to refresh the browser and load up the extension.\"\n        }\n      },\n      \"qr_code\": {\n        \"step1\": {\n          \"title\": \"Open the CLV Wallet app\",\n          \"description\": \"We recommend putting CLV Wallet on your home screen for quicker access.\"\n        },\n        \"step2\": {\n          \"title\": \"Create or Import a Wallet\",\n          \"description\": \"Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.\"\n        },\n        \"step3\": {\n          \"title\": \"Tap the scan button\",\n          \"description\": \"After you scan, a connection prompt will appear for you to connect your wallet.\"\n        }\n      }\n    },\n\n    \"okto\": {\n      \"qr_code\": {\n        \"step1\": {\n          \"title\": \"Open the Okto app\",\n          \"description\": \"Add Okto to your home screen for quick access\"\n        },\n        \"step2\": {\n          \"title\": \"Create an MPC Wallet\",\n          \"description\": \"Create an account and generate a wallet\"\n        },\n        \"step3\": {\n          \"title\": \"Tap WalletConnect in Settings\",\n          \"description\": \"Tap the Scan QR icon at the top right and confirm the prompt to connect.\"\n        }\n      }\n    },\n\n    \"ledger\": {\n      \"desktop\": {\n        \"step1\": {\n          \"title\": \"Open the Ledger Live app\",\n          \"description\": \"We recommend putting Ledger Live on your home screen for quicker access.\"\n        },\n        \"step2\": {\n          \"title\": \"Set up your Ledger\",\n          \"description\": \"Set up a new Ledger or connect to an existing one.\"\n        },\n        \"step3\": {\n          \"title\": \"Connect\",\n          \"description\": \"A connection prompt will appear for you to connect your wallet.\"\n        }\n      },\n      \"qr_code\": {\n        \"step1\": {\n          \"title\": \"Open the Ledger Live app\",\n          \"description\": \"We recommend putting Ledger Live on your home screen for quicker access.\"\n        },\n        \"step2\": {\n          \"title\": \"Set up your Ledger\",\n          \"description\": \"You can either sync with the desktop app or connect your Ledger.\"\n        },\n        \"step3\": {\n          \"title\": \"Scan the code\",\n          \"description\": \"Tap WalletConnect then Switch to Scanner. After you scan, a connection prompt will appear for you to connect your wallet.\"\n        }\n      }\n    }\n  }\n}\n";
  },
  48374: function (e, t, n) {
    "use strict";
    n.d(t, {
      U: function () {
        return o;
      }
    });
    var r = n(65225), o = () => ({
      id: "injected",
      name: "Browser Wallet",
      iconUrl: async () => (await n.e(3940).then(n.bind(n, 3940))).default,
      iconBackground: "#fff",
      createConnector: (0, r.K)({})
    });
  },
  6587: function (e, t, n) {
    "use strict";
    n.d(t, {
      P: function () {
        return b;
      }
    });
    var r = n(1633), o = n(53738), i = n(14478);
    var s = n(13102), a = n(31669), c = n(77014), u = n(59455);
    function l(e) {
      const t = e.isNewChainsStale ?? !0;
      let r, d;
      let f, h, p, m, b, y;
      return (0, o.K)(o => ({
        id: "walletConnect",
        name: "WalletConnect",
        type: l.type,
        async setup() {
          const e = await this.getProvider().catch(() => null);
          e && (p || (p = this.onConnect.bind(this), e.on("connect", p)), b || (b = this.onSessionDelete.bind(this), e.on("session_delete", b)));
        },
        async connect({chainId: e, withCapabilities: t, ...n} = {}) {
          try {
            const r = await this.getProvider();
            if (!r) throw new i.M();
            m || (m = this.onDisplayUri, r.on("display_uri", m));
            let s = e;
            if (!s) {
              const e = await o.storage?.getItem("state") ?? ({}), t = o.chains.some(t => t.id === e.chainId);
              s = t ? e.chainId : o.chains[0]?.id;
            }
            if (!s) throw new Error("No chains found on connector.");
            const u = await this.isChainsStale();
            if ((r.session && u && await r.disconnect(), !r.session || u)) {
              const e = o.chains.filter(e => e.id !== s).map(e => e.id);
              (await r.connect({
                optionalChains: [s, ...e],
                ...("pairingTopic" in n) ? {
                  pairingTopic: n.pairingTopic
                } : {}
              }), this.setRequestedChainsIds(o.chains.map(e => e.id)));
            }
            const l = (await r.enable()).map(e => (0, a.K)(e));
            let d = await this.getChainId();
            if (e && d !== e) {
              const t = await this.switchChain({
                chainId: e
              }).catch(e => {
                if (e.code === c.ab.code && "Missing or invalid. request() method: wallet_addEthereumChain" !== e.cause?.message) throw e;
                return {
                  id: d
                };
              });
              d = t?.id ?? d;
            }
            return (m && (r.removeListener("display_uri", m), m = void 0), p && (r.removeListener("connect", p), p = void 0), f || (f = this.onAccountsChanged.bind(this), r.on("accountsChanged", f)), h || (h = this.onChainChanged.bind(this), r.on("chainChanged", h)), y || (y = this.onDisconnect.bind(this), r.on("disconnect", y)), b || (b = this.onSessionDelete.bind(this), r.on("session_delete", b)), {
              accounts: t ? l.map(e => ({
                address: e,
                capabilities: {}
              })) : l,
              chainId: d
            });
          } catch (r) {
            if ((/(user rejected|connection request reset)/i).test(r?.message)) throw new c.ab(r);
            throw r;
          }
        },
        async disconnect() {
          const e = await this.getProvider();
          try {
            await e?.disconnect();
          } catch (t) {
            if (!(/No matching key/i).test(t.message)) throw t;
          } finally {
            (h && (e?.removeListener("chainChanged", h), h = void 0), y && (e?.removeListener("disconnect", y), y = void 0), p || (p = this.onConnect.bind(this), e?.on("connect", p)), f && (e?.removeListener("accountsChanged", f), f = void 0), b && (e?.removeListener("session_delete", b), b = void 0), this.setRequestedChainsIds([]));
          }
        },
        async getAccounts() {
          return (await this.getProvider()).accounts.map(e => (0, a.K)(e));
        },
        async getProvider({chainId: t} = {}) {
          return (r || (d || (d = (async function () {
            const t = o.chains.map(e => e.id);
            if (!t.length) return;
            const {EthereumProvider: r} = await Promise.all([n.e(2957), n.e(1295)]).then(n.bind(n, 31295));
            return await r.init({
              ...e,
              disableProviderPing: !0,
              optionalChains: t,
              projectId: e.projectId,
              rpcMap: Object.fromEntries(o.chains.map(e => {
                const [t] = (function (e) {
                  const {chain: t} = e, n = t.rpcUrls.default.http[0];
                  if (!e.transports) return [n];
                  const r = e.transports?.[t.id]?.({
                    chain: t
                  });
                  return (r?.value?.transports || [r]).map(({value: e}) => e?.url || n);
                })({
                  chain: e,
                  transports: o.transports
                });
                return [e.id, t];
              })),
              showQrModal: e.showQrModal ?? !0
            });
          })()), r = await d, r?.events.setMaxListeners(Number.POSITIVE_INFINITY)), t && await this.switchChain?.({
            chainId: t
          }), r);
        },
        async getChainId() {
          return (await this.getProvider()).chainId;
        },
        async isAuthorized() {
          try {
            const [e, t] = await Promise.all([this.getAccounts(), this.getProvider()]);
            if (!e.length) return !1;
            return !await this.isChainsStale() || !t.session || (await t.disconnect().catch(() => {}), !1);
          } catch {
            return !1;
          }
        },
        async switchChain({addEthereumChainParameter: e, chainId: t}) {
          const n = await this.getProvider();
          if (!n) throw new i.M();
          const r = o.chains.find(e => e.id === t);
          if (!r) throw new c.x3(new s.X4());
          try {
            await Promise.all([new Promise(e => {
              const n = ({chainId: r}) => {
                r === t && (o.emitter.off("change", n), e());
              };
              o.emitter.on("change", n);
            }), n.request({
              method: "wallet_switchEthereumChain",
              params: [{
                chainId: (0, u.eC)(t)
              }]
            })]);
            const e = await this.getRequestedChainsIds();
            return (this.setRequestedChainsIds([...e, t]), r);
          } catch (a) {
            const o = a;
            if ((/(user rejected)/i).test(o.message)) throw new c.ab(o);
            try {
              let o, i;
              (o = e?.blockExplorerUrls ? e.blockExplorerUrls : r.blockExplorers?.default.url ? [r.blockExplorers?.default.url] : [], i = e?.rpcUrls?.length ? e.rpcUrls : [...r.rpcUrls.default.http]);
              const s = {
                blockExplorerUrls: o,
                chainId: (0, u.eC)(t),
                chainName: e?.chainName ?? r.name,
                iconUrls: e?.iconUrls,
                nativeCurrency: e?.nativeCurrency ?? r.nativeCurrency,
                rpcUrls: i
              };
              await n.request({
                method: "wallet_addEthereumChain",
                params: [s]
              });
              const a = await this.getRequestedChainsIds();
              return (this.setRequestedChainsIds([...a, t]), r);
            } catch (l) {
              throw new c.ab(l);
            }
          }
        },
        onAccountsChanged(e) {
          0 === e.length ? this.onDisconnect() : o.emitter.emit("change", {
            accounts: e.map(e => (0, a.K)(e))
          });
        },
        onChainChanged(e) {
          const t = Number(e);
          o.emitter.emit("change", {
            chainId: t
          });
        },
        async onConnect(e) {
          const t = Number(e.chainId), n = await this.getAccounts();
          o.emitter.emit("connect", {
            accounts: n,
            chainId: t
          });
        },
        async onDisconnect(e) {
          (this.setRequestedChainsIds([]), o.emitter.emit("disconnect"));
          const t = await this.getProvider();
          (f && (t.removeListener("accountsChanged", f), f = void 0), h && (t.removeListener("chainChanged", h), h = void 0), y && (t.removeListener("disconnect", y), y = void 0), b && (t.removeListener("session_delete", b), b = void 0), p || (p = this.onConnect.bind(this), t.on("connect", p)));
        },
        onDisplayUri(e) {
          o.emitter.emit("message", {
            type: "display_uri",
            data: e
          });
        },
        onSessionDelete() {
          this.onDisconnect();
        },
        getNamespaceChainsIds() {
          if (!r) return [];
          const e = r.session?.namespaces.eip155?.accounts?.map(e => Number.parseInt(e.split(":")[1] || "", 10));
          return e ?? [];
        },
        async getRequestedChainsIds() {
          return await o.storage?.getItem(this.requestedChainsStorageKey) ?? [];
        },
        async isChainsStale() {
          if (!t) return !1;
          const e = o.chains.map(e => e.id), n = this.getNamespaceChainsIds();
          if (n.length && !n.some(t => e.includes(t))) return !1;
          const r = await this.getRequestedChainsIds();
          return !e.every(e => r.includes(e));
        },
        async setRequestedChainsIds(e) {
          await o.storage?.setItem(this.requestedChainsStorageKey, e);
        },
        get requestedChainsStorageKey() {
          return `${this.id}.requestedChains`;
        }
      }));
    }
    l.type = "walletConnect";
    var d = new Map(), f = e => {
      let {projectId: t, walletConnectParameters: n, rkDetailsShowQrModal: r} = e, o = {
        ...n || ({}),
        projectId: t,
        showQrModal: !1
      };
      r && (o = {
        ...o,
        showQrModal: !0
      });
      const i = JSON.stringify(o), s = d.get(i);
      if (s) return s;
      const a = l(o);
      return (d.set(i, a), a);
    };
    function h(e) {
      let {projectId: t, walletConnectParameters: n} = e;
      if (!t || "" === t) throw new Error("No projectId found. Every dApp must now provide a WalletConnect Cloud projectId to enable WalletConnect v2 https://www.rainbowkit.com/docs/installation#configure");
      return ("YOUR_PROJECT_ID" === t && (t = "21fef48091f12692cad574a6f7753643"), e => (function (e) {
        let {projectId: t, walletDetails: n, walletConnectParameters: r} = e;
        return (0, o.K)(e => ({
          ...f({
            projectId: t,
            walletConnectParameters: r,
            rkDetailsShowQrModal: n.rkDetails.showQrModal
          })(e),
          ...n
        }));
      })({
        projectId: t,
        walletDetails: e,
        walletConnectParameters: n
      }));
    }
    var p = n(65225);
    function m(e) {
      return !!(null === e || void 0 === e ? void 0 : e.isMetaMask) && (!(e.isBraveWallet && !e._events && !e._state) && (!e.isApexWallet && (!e.isAvalanche && (!e.isBackpack && (!e.isBifrost && (!e.isBitKeep && (!e.isBitski && (!e.isBlockWallet && (!e.isCoinbaseWallet && (!e.isDawn && (!e.isEnkrypt && (!e.isExodus && (!e.isFrame && (!e.isFrontier && (!e.isGamestop && (!e.isHyperPay && (!e.isImToken && (!e.isKuCoinWallet && (!e.isMathWallet && (!e.isNestWallet && (!e.isOkxWallet && !e.isOKExWallet && (!e.isOneInchIOSWallet && !e.isOneInchAndroidWallet && (!e.isOpera && (!e.isPhantom && (!e.isPortal && (!e.isRabby && (!e.isRainbow && (!e.isStatus && (!e.isTalisman && (!e.isTally && (!e.isTokenPocket && (!e.isTokenary && (!e.isTrust && !e.isTrustWallet && (!e.isXDEFI && (!e.isZeal && !e.isZerion)))))))))))))))))))))))))))))))))));
    }
    var b = e => {
      let {projectId: t, walletConnectParameters: o} = e;
      var i, s;
      const a = (0, p.B)({
        flag: "isMetaMask"
      }), c = !a, u = e => (0, r.Dt)() ? e : (0, r.gn)() ? ("metamask://wc?uri=").concat(encodeURIComponent(e)) : ("https://metamask.app.link/wc?uri=").concat(encodeURIComponent(e));
      var l;
      return {
        id: "metaMask",
        name: "MetaMask",
        rdns: "io.metamask",
        iconUrl: async () => (await n.e(3944).then(n.bind(n, 83944))).default,
        iconAccent: "#f6851a",
        iconBackground: "#fff",
        installed: c ? void 0 : a,
        downloadUrls: {
          android: "https://play.google.com/store/apps/details?id=io.metamask",
          ios: "https://apps.apple.com/us/app/metamask/id1438144202",
          mobile: "https://metamask.io/download",
          qrCode: "https://metamask.io/download",
          chrome: "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
          edge: "https://microsoftedge.microsoft.com/addons/detail/metamask/ejbalbakoplchlghecdalmeeeajnimhm",
          firefox: "https://addons.mozilla.org/firefox/addon/ether-metamask",
          opera: "https://addons.opera.com/extensions/details/metamask-10",
          browserExtension: "https://metamask.io/download"
        },
        mobile: {
          getUri: c ? u : void 0
        },
        qrCode: c ? {
          getUri: u,
          instructions: {
            learnMoreUrl: "https://metamask.io/faqs/",
            steps: [{
              description: "wallet_connectors.metamask.qr_code.step1.description",
              step: "install",
              title: "wallet_connectors.metamask.qr_code.step1.title"
            }, {
              description: "wallet_connectors.metamask.qr_code.step2.description",
              step: "create",
              title: "wallet_connectors.metamask.qr_code.step2.title"
            }, {
              description: "wallet_connectors.metamask.qr_code.step3.description",
              step: "refresh",
              title: "wallet_connectors.metamask.qr_code.step3.title"
            }]
          }
        } : void 0,
        extension: {
          instructions: {
            learnMoreUrl: "https://metamask.io/faqs/",
            steps: [{
              description: "wallet_connectors.metamask.extension.step1.description",
              step: "install",
              title: "wallet_connectors.metamask.extension.step1.title"
            }, {
              description: "wallet_connectors.metamask.extension.step2.description",
              step: "create",
              title: "wallet_connectors.metamask.extension.step2.title"
            }, {
              description: "wallet_connectors.metamask.extension.step3.description",
              step: "refresh",
              title: "wallet_connectors.metamask.extension.step3.title"
            }]
          }
        },
        createConnector: c ? h({
          projectId: t,
          walletConnectParameters: o
        }) : (0, p.K)({
          target: "undefined" !== typeof window ? null !== (l = null === (s = window.ethereum) || void 0 === s || null === (i = s.providers) || void 0 === i ? void 0 : i.find(m)) && void 0 !== l ? l : window.ethereum : void 0
        })
      };
    };
  },
  65225: function (e, t, n) {
    "use strict";
    n.d(t, {
      B: function () {
        return a;
      },
      K: function () {
        return c;
      }
    });
    var r = n(53738), o = n(81467);
    function i(e) {
      const t = "undefined" !== typeof window ? window : void 0;
      if ("undefined" === typeof t || "undefined" === typeof t.ethereum) return;
      const n = t.ethereum.providers;
      return n ? n.find(t => t[e]) : t.ethereum[e] ? t.ethereum : void 0;
    }
    function s(e) {
      const t = (e, n) => {
        const [r, ...o] = n.split("."), i = e[r];
        if (i) return 0 === o.length ? i : t(i, o.join("."));
      };
      if ("undefined" !== typeof window) return t(window, e);
    }
    function a(e) {
      let {flag: t, namespace: n} = e;
      return !(!n || "undefined" === typeof s(n)) || !(!t || "undefined" === typeof i(t));
    }
    function c(e) {
      let {flag: t, namespace: n, target: a} = e;
      const c = a || (function (e) {
        let {flag: t, namespace: n} = e;
        var r;
        const o = "undefined" !== typeof window ? window : void 0;
        if ("undefined" === typeof o) return;
        if (n) {
          const e = s(n);
          if (e) return e;
        }
        const a = null === (r = o.ethereum) || void 0 === r ? void 0 : r.providers;
        if (t) {
          const e = i(t);
          if (e) return e;
        }
        return "undefined" !== typeof a && a.length > 0 ? a[0] : o.ethereum;
      })({
        flag: t,
        namespace: n
      });
      return (function (e) {
        return t => {
          const n = e ? {
            target: () => ({
              id: t.rkDetails.id,
              name: t.rkDetails.name,
              provider: e
            })
          } : {};
          return (0, r.K)(e => ({
            ...(0, o.L)(n)(e),
            ...t
          }));
        };
      })(c);
    }
  },
  12107: function (e, t, n) {
    "use strict";
    n.d(t, {
      D: function () {
        return l;
      }
    });
    var r = n(1633), o = n(53738), i = n(13102), s = n(31669), a = n(77014), c = n(59455);
    function u(e = {}) {
      return "3" === e.version || e.headlessMode ? (function (e) {
        const t = !1;
        let r, l, d, f, h;
        return (0, o.K)(o => ({
          id: "coinbaseWalletSDK",
          name: "Coinbase Wallet",
          rdns: "com.coinbase.wallet",
          type: u.type,
          async connect({chainId: e, withCapabilities: t} = {}) {
            try {
              const n = await this.getProvider(), r = (await n.request({
                method: "eth_requestAccounts"
              })).map(e => (0, s.K)(e));
              (d || (d = this.onAccountsChanged.bind(this), n.on("accountsChanged", d)), f || (f = this.onChainChanged.bind(this), n.on("chainChanged", f)), h || (h = this.onDisconnect.bind(this), n.on("disconnect", h)));
              let o = await this.getChainId();
              if (e && o !== e) {
                const t = await this.switchChain({
                  chainId: e
                }).catch(e => {
                  if (e.code === a.ab.code) throw e;
                  return {
                    id: o
                  };
                });
                o = t?.id ?? o;
              }
              return {
                accounts: t ? r.map(e => ({
                  address: e,
                  capabilities: {}
                })) : r,
                chainId: o
              };
            } catch (n) {
              if ((/(user closed modal|accounts received is empty|user denied account)/i).test(n.message)) throw new a.ab(n);
              throw n;
            }
          },
          async disconnect() {
            const e = await this.getProvider();
            (d && (e.removeListener("accountsChanged", d), d = void 0), f && (e.removeListener("chainChanged", f), f = void 0), h && (e.removeListener("disconnect", h), h = void 0), e.disconnect(), e.close());
          },
          async getAccounts() {
            const e = await this.getProvider();
            return (await e.request({
              method: "eth_accounts"
            })).map(e => (0, s.K)(e));
          },
          async getChainId() {
            const e = await this.getProvider(), t = await e.request({
              method: "eth_chainId"
            });
            return Number(t);
          },
          async getProvider() {
            if (!l) {
              const i = await (async () => {
                const {default: e} = await Promise.all([n.e(2957), n.e(8032), n.e(7173)]).then(n.t.bind(n, 28032, 19));
                return "function" !== typeof e && "function" === typeof e.default ? e.default : e;
              })();
              r = new i({
                ...e,
                reloadOnDisconnect: t
              });
              const s = r.walletExtension?.getChainId(), a = o.chains.find(t => e.chainId ? t.id === e.chainId : t.id === s) || o.chains[0], c = e.chainId || a?.id, u = e.jsonRpcUrl || a?.rpcUrls.default.http[0];
              l = r.makeWeb3Provider(u, c);
            }
            return l;
          },
          async isAuthorized() {
            try {
              return !!(await this.getAccounts()).length;
            } catch {
              return !1;
            }
          },
          async switchChain({addEthereumChainParameter: e, chainId: t}) {
            const n = o.chains.find(e => e.id === t);
            if (!n) throw new a.x3(new i.X4());
            const r = await this.getProvider();
            try {
              return (await r.request({
                method: "wallet_switchEthereumChain",
                params: [{
                  chainId: (0, c.eC)(n.id)
                }]
              }), n);
            } catch (s) {
              if (4902 === s.code) try {
                let o, i;
                (o = e?.blockExplorerUrls ? e.blockExplorerUrls : n.blockExplorers?.default.url ? [n.blockExplorers?.default.url] : [], i = e?.rpcUrls?.length ? e.rpcUrls : [n.rpcUrls.default?.http[0] ?? ""]);
                const s = {
                  blockExplorerUrls: o,
                  chainId: (0, c.eC)(t),
                  chainName: e?.chainName ?? n.name,
                  iconUrls: e?.iconUrls,
                  nativeCurrency: e?.nativeCurrency ?? n.nativeCurrency,
                  rpcUrls: i
                };
                return (await r.request({
                  method: "wallet_addEthereumChain",
                  params: [s]
                }), n);
              } catch (s) {
                throw new a.ab(s);
              }
              throw new a.x3(s);
            }
          },
          onAccountsChanged(e) {
            0 === e.length ? this.onDisconnect() : o.emitter.emit("change", {
              accounts: e.map(e => (0, s.K)(e))
            });
          },
          onChainChanged(e) {
            const t = Number(e);
            o.emitter.emit("change", {
              chainId: t
            });
          },
          async onDisconnect(e) {
            o.emitter.emit("disconnect");
            const t = await this.getProvider();
            (d && (t.removeListener("accountsChanged", d), d = void 0), f && (t.removeListener("chainChanged", f), f = void 0), h && (t.removeListener("disconnect", h), h = void 0));
          }
        }));
      })(e) : (function (e) {
        let t, r, l, d;
        return (0, o.K)(o => ({
          id: "coinbaseWalletSDK",
          name: "Coinbase Wallet",
          rdns: "com.coinbase.wallet",
          type: u.type,
          async connect({chainId: e, withCapabilities: t, ...n} = {}) {
            try {
              const o = await this.getProvider(), i = (await o.request({
                method: "eth_requestAccounts",
                params: ("instantOnboarding" in n) && n.instantOnboarding ? [{
                  onboarding: "instant"
                }] : []
              })).map(e => (0, s.K)(e));
              (r || (r = this.onAccountsChanged.bind(this), o.on("accountsChanged", r)), l || (l = this.onChainChanged.bind(this), o.on("chainChanged", l)), d || (d = this.onDisconnect.bind(this), o.on("disconnect", d)));
              let c = await this.getChainId();
              if (e && c !== e) {
                const t = await this.switchChain({
                  chainId: e
                }).catch(e => {
                  if (e.code === a.ab.code) throw e;
                  return {
                    id: c
                  };
                });
                c = t?.id ?? c;
              }
              return {
                accounts: t ? i.map(e => ({
                  address: e,
                  capabilities: {}
                })) : i,
                chainId: c
              };
            } catch (o) {
              if ((/(user closed modal|accounts received is empty|user denied account|request rejected)/i).test(o.message)) throw new a.ab(o);
              throw o;
            }
          },
          async disconnect() {
            const e = await this.getProvider();
            (r && (e.removeListener("accountsChanged", r), r = void 0), l && (e.removeListener("chainChanged", l), l = void 0), d && (e.removeListener("disconnect", d), d = void 0), e.disconnect(), e.close?.());
          },
          async getAccounts() {
            const e = await this.getProvider();
            return (await e.request({
              method: "eth_accounts"
            })).map(e => (0, s.K)(e));
          },
          async getChainId() {
            const e = await this.getProvider(), t = await e.request({
              method: "eth_chainId"
            });
            return Number(t);
          },
          async getProvider() {
            if (!t) {
              const r = "string" === typeof e.preference ? {
                options: e.preference
              } : {
                ...e.preference,
                options: e.preference?.options ?? "all"
              }, {createCoinbaseWalletSDK: i} = await Promise.all([n.e(2957), n.e(9856)]).then(n.bind(n, 19856)), s = i({
                ...e,
                appChainIds: o.chains.map(e => e.id),
                preference: r
              });
              t = s.getProvider();
            }
            return t;
          },
          async isAuthorized() {
            try {
              return !!(await this.getAccounts()).length;
            } catch {
              return !1;
            }
          },
          async switchChain({addEthereumChainParameter: e, chainId: t}) {
            const n = o.chains.find(e => e.id === t);
            if (!n) throw new a.x3(new i.X4());
            const r = await this.getProvider();
            try {
              return (await r.request({
                method: "wallet_switchEthereumChain",
                params: [{
                  chainId: (0, c.eC)(n.id)
                }]
              }), n);
            } catch (s) {
              if (4902 === s.code) try {
                let o, i;
                (o = e?.blockExplorerUrls ? e.blockExplorerUrls : n.blockExplorers?.default.url ? [n.blockExplorers?.default.url] : [], i = e?.rpcUrls?.length ? e.rpcUrls : [n.rpcUrls.default?.http[0] ?? ""]);
                const s = {
                  blockExplorerUrls: o,
                  chainId: (0, c.eC)(t),
                  chainName: e?.chainName ?? n.name,
                  iconUrls: e?.iconUrls,
                  nativeCurrency: e?.nativeCurrency ?? n.nativeCurrency,
                  rpcUrls: i
                };
                return (await r.request({
                  method: "wallet_addEthereumChain",
                  params: [s]
                }), n);
              } catch (s) {
                throw new a.ab(s);
              }
              throw new a.x3(s);
            }
          },
          onAccountsChanged(e) {
            0 === e.length ? this.onDisconnect() : o.emitter.emit("change", {
              accounts: e.map(e => (0, s.K)(e))
            });
          },
          onChainChanged(e) {
            const t = Number(e);
            o.emitter.emit("change", {
              chainId: t
            });
          },
          async onDisconnect(e) {
            o.emitter.emit("disconnect");
            const t = await this.getProvider();
            (r && (t.removeListener("accountsChanged", r), r = void 0), l && (t.removeListener("chainChanged", l), l = void 0), d && (t.removeListener("disconnect", d), d = void 0));
          }
        }));
      })(e);
    }
    u.type = "coinbaseWallet";
    var l = e => {
      let {appName: t, appIcon: i} = e;
      return {
        id: "coinbase",
        name: "Coinbase Wallet",
        shortName: "Coinbase",
        rdns: "com.coinbase.wallet",
        iconUrl: async () => (await n.e(8510).then(n.bind(n, 58510))).default,
        iconAccent: "#2c5ff6",
        iconBackground: "#2c5ff6",
        installed: !0,
        downloadUrls: {
          android: "https://play.google.com/store/apps/details?id=org.toshi",
          ios: "https://apps.apple.com/us/app/coinbase-wallet-store-crypto/id1278383455",
          mobile: "https://coinbase.com/wallet/downloads",
          qrCode: "https://coinbase-wallet.onelink.me/q5Sx/fdb9b250",
          chrome: "https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad",
          browserExtension: "https://coinbase.com/wallet"
        },
        ...(0, r.gn)() ? {} : {
          qrCode: {
            getUri: e => e,
            instructions: {
              learnMoreUrl: "https://coinbase.com/wallet/articles/getting-started-mobile",
              steps: [{
                description: "wallet_connectors.coinbase.qr_code.step1.description",
                step: "install",
                title: "wallet_connectors.coinbase.qr_code.step1.title"
              }, {
                description: "wallet_connectors.coinbase.qr_code.step2.description",
                step: "create",
                title: "wallet_connectors.coinbase.qr_code.step2.title"
              }, {
                description: "wallet_connectors.coinbase.qr_code.step3.description",
                step: "scan",
                title: "wallet_connectors.coinbase.qr_code.step3.title"
              }]
            }
          },
          extension: {
            instructions: {
              learnMoreUrl: "https://coinbase.com/wallet/articles/getting-started-extension",
              steps: [{
                description: "wallet_connectors.coinbase.extension.step1.description",
                step: "install",
                title: "wallet_connectors.coinbase.extension.step1.title"
              }, {
                description: "wallet_connectors.coinbase.extension.step2.description",
                step: "create",
                title: "wallet_connectors.coinbase.extension.step2.title"
              }, {
                description: "wallet_connectors.coinbase.extension.step3.description",
                step: "refresh",
                title: "wallet_connectors.coinbase.extension.step3.title"
              }]
            }
          }
        },
        createConnector: e => {
          const n = u({
            appName: t,
            appLogoUrl: i,
            preference: l.preference
          });
          return (0, o.K)(t => ({
            ...n(t),
            ...e
          }));
        }
      };
    };
  },
  1633: function (e, t, n) {
    "use strict";
    function r() {
      return "undefined" !== typeof navigator && (/android/i).test(navigator.userAgent);
    }
    function o() {
      return "undefined" !== typeof navigator && (/iPhone|iPod/).test(navigator.userAgent) || "undefined" !== typeof navigator && ((/iPad/).test(navigator.userAgent) || "MacIntel" === navigator.platform && navigator.maxTouchPoints > 1);
    }
    n.d(t, {
      Dt: function () {
        return r;
      },
      gn: function () {
        return o;
      }
    });
  },
  54990: function (e, t, n) {
    "use strict";
    function r(e) {
      var t, n, o = "";
      if ("string" == typeof e || "number" == typeof e) o += e; else if ("object" == typeof e) if (Array.isArray(e)) {
        var i = e.length;
        for (t = 0; t < i; t++) e[t] && (n = r(e[t])) && (o && (o += " "), o += n);
      } else for (n in e) e[n] && (o && (o += " "), o += n);
      return o;
    }
    t.Z = function () {
      for (var e, t, n = 0, o = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = r(e)) && (o && (o += " "), o += t);
      return o;
    };
  },
  87045: function (e, t, n) {
    "use strict";
    n.d(t, {
      j: function () {
        return i;
      }
    });
    var r = n(24112), o = n(45345), i = new (class extends r.l {
      #e;
      #t;
      #n;
      constructor() {
        (super(), this.#n = e => {
          if (!o.sk && window.addEventListener) {
            const t = () => e();
            return (window.addEventListener("visibilitychange", t, !1), () => {
              window.removeEventListener("visibilitychange", t);
            });
          }
        });
      }
      onSubscribe() {
        this.#t || this.setEventListener(this.#n);
      }
      onUnsubscribe() {
        this.hasListeners() || (this.#t?.(), this.#t = void 0);
      }
      setEventListener(e) {
        (this.#n = e, this.#t?.(), this.#t = e(e => {
          "boolean" === typeof e ? this.setFocused(e) : this.onFocus();
        }));
      }
      setFocused(e) {
        this.#e !== e && (this.#e = e, this.onFocus());
      }
      onFocus() {
        const e = this.isFocused();
        this.listeners.forEach(t => {
          t(e);
        });
      }
      isFocused() {
        return "boolean" === typeof this.#e ? this.#e : "hidden" !== globalThis.document?.visibilityState;
      }
    })();
  },
  2894: function (e, t, n) {
    "use strict";
    n.d(t, {
      R: function () {
        return a;
      },
      m: function () {
        return s;
      }
    });
    var r = n(18238), o = n(7989), i = n(11255), s = class extends o.F {
      #r;
      #o;
      #i;
      #s;
      constructor(e) {
        (super(), this.#r = e.client, this.mutationId = e.mutationId, this.#i = e.mutationCache, this.#o = [], this.state = e.state || ({
          context: void 0,
          data: void 0,
          error: null,
          failureCount: 0,
          failureReason: null,
          isPaused: !1,
          status: "idle",
          variables: void 0,
          submittedAt: 0
        }), this.setOptions(e.options), this.scheduleGc());
      }
      setOptions(e) {
        (this.options = e, this.updateGcTime(this.options.gcTime));
      }
      get meta() {
        return this.options.meta;
      }
      addObserver(e) {
        this.#o.includes(e) || (this.#o.push(e), this.clearGcTimeout(), this.#i.notify({
          type: "observerAdded",
          mutation: this,
          observer: e
        }));
      }
      removeObserver(e) {
        (this.#o = this.#o.filter(t => t !== e), this.scheduleGc(), this.#i.notify({
          type: "observerRemoved",
          mutation: this,
          observer: e
        }));
      }
      optionalRemove() {
        this.#o.length || ("pending" === this.state.status ? this.scheduleGc() : this.#i.remove(this));
      }
      continue() {
        return this.#s?.continue() ?? this.execute(this.state.variables);
      }
      async execute(e) {
        const t = () => {
          this.#a({
            type: "continue"
          });
        }, n = {
          client: this.#r,
          meta: this.options.meta,
          mutationKey: this.options.mutationKey
        };
        this.#s = (0, i.Mz)({
          fn: () => this.options.mutationFn ? this.options.mutationFn(e, n) : Promise.reject(new Error("No mutationFn found")),
          onFail: (e, t) => {
            this.#a({
              type: "failed",
              failureCount: e,
              error: t
            });
          },
          onPause: () => {
            this.#a({
              type: "pause"
            });
          },
          onContinue: t,
          retry: this.options.retry ?? 0,
          retryDelay: this.options.retryDelay,
          networkMode: this.options.networkMode,
          canRun: () => this.#i.canRun(this)
        });
        const r = "pending" === this.state.status, o = !this.#s.canStart();
        try {
          if (r) t(); else {
            (this.#a({
              type: "pending",
              variables: e,
              isPaused: o
            }), await this.#i.config.onMutate?.(e, this, n));
            const t = await this.options.onMutate?.(e, n);
            t !== this.state.context && this.#a({
              type: "pending",
              context: t,
              variables: e,
              isPaused: o
            });
          }
          const i = await this.#s.start();
          return (await this.#i.config.onSuccess?.(i, e, this.state.context, this, n), await this.options.onSuccess?.(i, e, this.state.context, n), await this.#i.config.onSettled?.(i, null, this.state.variables, this.state.context, this, n), await this.options.onSettled?.(i, null, e, this.state.context, n), this.#a({
            type: "success",
            data: i
          }), i);
        } catch (s) {
          try {
            throw (await this.#i.config.onError?.(s, e, this.state.context, this, n), await this.options.onError?.(s, e, this.state.context, n), await this.#i.config.onSettled?.(void 0, s, this.state.variables, this.state.context, this, n), await this.options.onSettled?.(void 0, s, e, this.state.context, n), s);
          } finally {
            this.#a({
              type: "error",
              error: s
            });
          }
        } finally {
          this.#i.runNext(this);
        }
      }
      #a(e) {
        (this.state = (t => {
          switch (e.type) {
            case "failed":
              return {
                ...t,
                failureCount: e.failureCount,
                failureReason: e.error
              };
            case "pause":
              return {
                ...t,
                isPaused: !0
              };
            case "continue":
              return {
                ...t,
                isPaused: !1
              };
            case "pending":
              return {
                ...t,
                context: e.context,
                data: void 0,
                failureCount: 0,
                failureReason: null,
                error: null,
                isPaused: e.isPaused,
                status: "pending",
                variables: e.variables,
                submittedAt: Date.now()
              };
            case "success":
              return {
                ...t,
                data: e.data,
                failureCount: 0,
                failureReason: null,
                error: null,
                status: "success",
                isPaused: !1
              };
            case "error":
              return {
                ...t,
                data: void 0,
                error: e.error,
                failureCount: t.failureCount + 1,
                failureReason: e.error,
                isPaused: !1,
                status: "error"
              };
          }
        })(this.state), r.Vr.batch(() => {
          (this.#o.forEach(t => {
            t.onMutationUpdate(e);
          }), this.#i.notify({
            mutation: this,
            type: "updated",
            action: e
          }));
        }));
      }
    };
    function a() {
      return {
        context: void 0,
        data: void 0,
        error: null,
        failureCount: 0,
        failureReason: null,
        isPaused: !1,
        status: "idle",
        variables: void 0,
        submittedAt: 0
      };
    }
  },
  18238: function (e, t, n) {
    "use strict";
    n.d(t, {
      Vr: function () {
        return o;
      }
    });
    var r = n(84554).Hp;
    var o = (function () {
      let e = [], t = 0, n = e => {
        e();
      }, o = e => {
        e();
      }, i = r;
      const s = r => {
        t ? e.push(r) : i(() => {
          n(r);
        });
      };
      return {
        batch: r => {
          let s;
          t++;
          try {
            s = r();
          } finally {
            (t--, t || (() => {
              const t = e;
              (e = [], t.length && i(() => {
                o(() => {
                  t.forEach(e => {
                    n(e);
                  });
                });
              }));
            })());
          }
          return s;
        },
        batchCalls: e => (...t) => {
          s(() => {
            e(...t);
          });
        },
        schedule: s,
        setNotifyFunction: e => {
          n = e;
        },
        setBatchNotifyFunction: e => {
          o = e;
        },
        setScheduler: e => {
          i = e;
        }
      };
    })();
  },
  57853: function (e, t, n) {
    "use strict";
    n.d(t, {
      N: function () {
        return i;
      }
    });
    var r = n(24112), o = n(45345), i = new (class extends r.l {
      #c = !0;
      #t;
      #n;
      constructor() {
        (super(), this.#n = e => {
          if (!o.sk && window.addEventListener) {
            const t = () => e(!0), n = () => e(!1);
            return (window.addEventListener("online", t, !1), window.addEventListener("offline", n, !1), () => {
              (window.removeEventListener("online", t), window.removeEventListener("offline", n));
            });
          }
        });
      }
      onSubscribe() {
        this.#t || this.setEventListener(this.#n);
      }
      onUnsubscribe() {
        this.hasListeners() || (this.#t?.(), this.#t = void 0);
      }
      setEventListener(e) {
        (this.#n = e, this.#t?.(), this.#t = e(this.setOnline.bind(this)));
      }
      setOnline(e) {
        this.#c !== e && (this.#c = e, this.listeners.forEach(t => {
          t(e);
        }));
      }
      isOnline() {
        return this.#c;
      }
    })();
  },
  21733: function (e, t, n) {
    "use strict";
    n.d(t, {
      A: function () {
        return a;
      },
      z: function () {
        return c;
      }
    });
    var r = n(45345), o = n(18238), i = n(11255), s = n(7989), a = class extends s.F {
      #u;
      #l;
      #d;
      #r;
      #s;
      #f;
      #h;
      constructor(e) {
        (super(), this.#h = !1, this.#f = e.defaultOptions, this.setOptions(e.options), this.observers = [], this.#r = e.client, this.#d = this.#r.getQueryCache(), this.queryKey = e.queryKey, this.queryHash = e.queryHash, this.#u = u(this.options), this.state = e.state ?? this.#u, this.scheduleGc());
      }
      get meta() {
        return this.options.meta;
      }
      get promise() {
        return this.#s?.promise;
      }
      setOptions(e) {
        if ((this.options = {
          ...this.#f,
          ...e
        }, this.updateGcTime(this.options.gcTime), this.state && void 0 === this.state.data)) {
          const e = u(this.options);
          void 0 !== e.data && (this.setData(e.data, {
            updatedAt: e.dataUpdatedAt,
            manual: !0
          }), this.#u = e);
        }
      }
      optionalRemove() {
        this.observers.length || "idle" !== this.state.fetchStatus || this.#d.remove(this);
      }
      setData(e, t) {
        const n = (0, r.oE)(this.state.data, e, this.options);
        return (this.#a({
          data: n,
          type: "success",
          dataUpdatedAt: t?.updatedAt,
          manual: t?.manual
        }), n);
      }
      setState(e, t) {
        this.#a({
          type: "setState",
          state: e,
          setStateOptions: t
        });
      }
      cancel(e) {
        const t = this.#s?.promise;
        return (this.#s?.cancel(e), t ? t.then(r.ZT).catch(r.ZT) : Promise.resolve());
      }
      destroy() {
        (super.destroy(), this.cancel({
          silent: !0
        }));
      }
      reset() {
        (this.destroy(), this.setState(this.#u));
      }
      isActive() {
        return this.observers.some(e => !1 !== (0, r.Nc)(e.options.enabled, this));
      }
      isDisabled() {
        return this.getObserversCount() > 0 ? !this.isActive() : this.options.queryFn === r.CN || this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
      }
      isStatic() {
        return this.getObserversCount() > 0 && this.observers.some(e => "static" === (0, r.KC)(e.options.staleTime, this));
      }
      isStale() {
        return this.getObserversCount() > 0 ? this.observers.some(e => e.getCurrentResult().isStale) : void 0 === this.state.data || this.state.isInvalidated;
      }
      isStaleByTime(e = 0) {
        return void 0 === this.state.data || "static" !== e && (!!this.state.isInvalidated || !(0, r.Kp)(this.state.dataUpdatedAt, e));
      }
      onFocus() {
        const e = this.observers.find(e => e.shouldFetchOnWindowFocus());
        (e?.refetch({
          cancelRefetch: !1
        }), this.#s?.continue());
      }
      onOnline() {
        const e = this.observers.find(e => e.shouldFetchOnReconnect());
        (e?.refetch({
          cancelRefetch: !1
        }), this.#s?.continue());
      }
      addObserver(e) {
        this.observers.includes(e) || (this.observers.push(e), this.clearGcTimeout(), this.#d.notify({
          type: "observerAdded",
          query: this,
          observer: e
        }));
      }
      removeObserver(e) {
        this.observers.includes(e) && (this.observers = this.observers.filter(t => t !== e), this.observers.length || (this.#s && (this.#h ? this.#s.cancel({
          revert: !0
        }) : this.#s.cancelRetry()), this.scheduleGc()), this.#d.notify({
          type: "observerRemoved",
          query: this,
          observer: e
        }));
      }
      getObserversCount() {
        return this.observers.length;
      }
      invalidate() {
        this.state.isInvalidated || this.#a({
          type: "invalidate"
        });
      }
      async fetch(e, t) {
        if ("idle" !== this.state.fetchStatus && "rejected" !== this.#s?.status()) if (void 0 !== this.state.data && t?.cancelRefetch) this.cancel({
          silent: !0
        }); else if (this.#s) return (this.#s.continueRetry(), this.#s.promise);
        if ((e && this.setOptions(e), !this.options.queryFn)) {
          const e = this.observers.find(e => e.options.queryFn);
          e && this.setOptions(e.options);
        }
        const n = new AbortController(), o = e => {
          Object.defineProperty(e, "signal", {
            enumerable: !0,
            get: () => (this.#h = !0, n.signal)
          });
        }, s = () => {
          const e = (0, r.cG)(this.options, t), n = (() => {
            const e = {
              client: this.#r,
              queryKey: this.queryKey,
              meta: this.meta
            };
            return (o(e), e);
          })();
          return (this.#h = !1, this.options.persister ? this.options.persister(e, n, this) : e(n));
        }, a = (() => {
          const e = {
            fetchOptions: t,
            options: this.options,
            queryKey: this.queryKey,
            client: this.#r,
            state: this.state,
            fetchFn: s
          };
          return (o(e), e);
        })();
        (this.options.behavior?.onFetch(a, this), this.#l = this.state, "idle" !== this.state.fetchStatus && this.state.fetchMeta === a.fetchOptions?.meta || this.#a({
          type: "fetch",
          meta: a.fetchOptions?.meta
        }), this.#s = (0, i.Mz)({
          initialPromise: t?.initialPromise,
          fn: a.fetchFn,
          onCancel: e => {
            (e instanceof i.p8 && e.revert && this.setState({
              ...this.#l,
              fetchStatus: "idle"
            }), n.abort());
          },
          onFail: (e, t) => {
            this.#a({
              type: "failed",
              failureCount: e,
              error: t
            });
          },
          onPause: () => {
            this.#a({
              type: "pause"
            });
          },
          onContinue: () => {
            this.#a({
              type: "continue"
            });
          },
          retry: a.options.retry,
          retryDelay: a.options.retryDelay,
          networkMode: a.options.networkMode,
          canRun: () => !0
        }));
        try {
          const e = await this.#s.start();
          if (void 0 === e) throw new Error(`${this.queryHash} data is undefined`);
          return (this.setData(e), this.#d.config.onSuccess?.(e, this), this.#d.config.onSettled?.(e, this.state.error, this), e);
        } catch (c) {
          if (c instanceof i.p8) {
            if (c.silent) return this.#s.promise;
            if (c.revert) {
              if (void 0 === this.state.data) throw c;
              return this.state.data;
            }
          }
          throw (this.#a({
            type: "error",
            error: c
          }), this.#d.config.onError?.(c, this), this.#d.config.onSettled?.(this.state.data, c, this), c);
        } finally {
          this.scheduleGc();
        }
      }
      #a(e) {
        (this.state = (t => {
          switch (e.type) {
            case "failed":
              return {
                ...t,
                fetchFailureCount: e.failureCount,
                fetchFailureReason: e.error
              };
            case "pause":
              return {
                ...t,
                fetchStatus: "paused"
              };
            case "continue":
              return {
                ...t,
                fetchStatus: "fetching"
              };
            case "fetch":
              return {
                ...t,
                ...c(t.data, this.options),
                fetchMeta: e.meta ?? null
              };
            case "success":
              const n = {
                ...t,
                data: e.data,
                dataUpdateCount: t.dataUpdateCount + 1,
                dataUpdatedAt: e.dataUpdatedAt ?? Date.now(),
                error: null,
                isInvalidated: !1,
                status: "success",
                ...!e.manual && ({
                  fetchStatus: "idle",
                  fetchFailureCount: 0,
                  fetchFailureReason: null
                })
              };
              return (this.#l = e.manual ? n : void 0, n);
            case "error":
              const r = e.error;
              return {
                ...t,
                error: r,
                errorUpdateCount: t.errorUpdateCount + 1,
                errorUpdatedAt: Date.now(),
                fetchFailureCount: t.fetchFailureCount + 1,
                fetchFailureReason: r,
                fetchStatus: "idle",
                status: "error"
              };
            case "invalidate":
              return {
                ...t,
                isInvalidated: !0
              };
            case "setState":
              return {
                ...t,
                ...e.state
              };
          }
        })(this.state), o.Vr.batch(() => {
          (this.observers.forEach(e => {
            e.onQueryUpdate();
          }), this.#d.notify({
            query: this,
            type: "updated",
            action: e
          }));
        }));
      }
    };
    function c(e, t) {
      return {
        fetchFailureCount: 0,
        fetchFailureReason: null,
        fetchStatus: (0, i.Kw)(t.networkMode) ? "fetching" : "paused",
        ...void 0 === e && ({
          error: null,
          status: "pending"
        })
      };
    }
    function u(e) {
      const t = "function" === typeof e.initialData ? e.initialData() : e.initialData, n = void 0 !== t, r = n ? "function" === typeof e.initialDataUpdatedAt ? e.initialDataUpdatedAt() : e.initialDataUpdatedAt : 0;
      return {
        data: t,
        dataUpdateCount: 0,
        dataUpdatedAt: n ? r ?? Date.now() : 0,
        error: null,
        errorUpdateCount: 0,
        errorUpdatedAt: 0,
        fetchFailureCount: 0,
        fetchFailureReason: null,
        fetchMeta: null,
        isInvalidated: !1,
        status: n ? "success" : "pending",
        fetchStatus: "idle"
      };
    }
  },
  21623: function (e, t, n) {
    "use strict";
    n.d(t, {
      S: function () {
        return b;
      }
    });
    var r = n(45345), o = n(21733), i = n(18238), s = n(24112), a = class extends s.l {
      constructor(e = {}) {
        (super(), this.config = e, this.#p = new Map());
      }
      #p;
      build(e, t, n) {
        const i = t.queryKey, s = t.queryHash ?? (0, r.Rm)(i, t);
        let a = this.get(s);
        return (a || (a = new o.A({
          client: e,
          queryKey: i,
          queryHash: s,
          options: e.defaultQueryOptions(t),
          state: n,
          defaultOptions: e.getQueryDefaults(i)
        }), this.add(a)), a);
      }
      add(e) {
        this.#p.has(e.queryHash) || (this.#p.set(e.queryHash, e), this.notify({
          type: "added",
          query: e
        }));
      }
      remove(e) {
        const t = this.#p.get(e.queryHash);
        t && (e.destroy(), t === e && this.#p.delete(e.queryHash), this.notify({
          type: "removed",
          query: e
        }));
      }
      clear() {
        i.Vr.batch(() => {
          this.getAll().forEach(e => {
            this.remove(e);
          });
        });
      }
      get(e) {
        return this.#p.get(e);
      }
      getAll() {
        return [...this.#p.values()];
      }
      find(e) {
        const t = {
          exact: !0,
          ...e
        };
        return this.getAll().find(e => (0, r._x)(t, e));
      }
      findAll(e = {}) {
        const t = this.getAll();
        return Object.keys(e).length > 0 ? t.filter(t => (0, r._x)(e, t)) : t;
      }
      notify(e) {
        i.Vr.batch(() => {
          this.listeners.forEach(t => {
            t(e);
          });
        });
      }
      onFocus() {
        i.Vr.batch(() => {
          this.getAll().forEach(e => {
            e.onFocus();
          });
        });
      }
      onOnline() {
        i.Vr.batch(() => {
          this.getAll().forEach(e => {
            e.onOnline();
          });
        });
      }
    }, c = n(2894), u = class extends s.l {
      constructor(e = {}) {
        (super(), this.config = e, this.#m = new Set(), this.#b = new Map(), this.#y = 0);
      }
      #m;
      #b;
      #y;
      build(e, t, n) {
        const r = new c.m({
          client: e,
          mutationCache: this,
          mutationId: ++this.#y,
          options: e.defaultMutationOptions(t),
          state: n
        });
        return (this.add(r), r);
      }
      add(e) {
        this.#m.add(e);
        const t = l(e);
        if ("string" === typeof t) {
          const n = this.#b.get(t);
          n ? n.push(e) : this.#b.set(t, [e]);
        }
        this.notify({
          type: "added",
          mutation: e
        });
      }
      remove(e) {
        if (this.#m.delete(e)) {
          const t = l(e);
          if ("string" === typeof t) {
            const n = this.#b.get(t);
            if (n) if (n.length > 1) {
              const t = n.indexOf(e);
              -1 !== t && n.splice(t, 1);
            } else n[0] === e && this.#b.delete(t);
          }
        }
        this.notify({
          type: "removed",
          mutation: e
        });
      }
      canRun(e) {
        const t = l(e);
        if ("string" === typeof t) {
          const n = this.#b.get(t), r = n?.find(e => "pending" === e.state.status);
          return !r || r === e;
        }
        return !0;
      }
      runNext(e) {
        const t = l(e);
        if ("string" === typeof t) {
          const n = this.#b.get(t)?.find(t => t !== e && t.state.isPaused);
          return n?.continue() ?? Promise.resolve();
        }
        return Promise.resolve();
      }
      clear() {
        i.Vr.batch(() => {
          (this.#m.forEach(e => {
            this.notify({
              type: "removed",
              mutation: e
            });
          }), this.#m.clear(), this.#b.clear());
        });
      }
      getAll() {
        return Array.from(this.#m);
      }
      find(e) {
        const t = {
          exact: !0,
          ...e
        };
        return this.getAll().find(e => (0, r.X7)(t, e));
      }
      findAll(e = {}) {
        return this.getAll().filter(t => (0, r.X7)(e, t));
      }
      notify(e) {
        i.Vr.batch(() => {
          this.listeners.forEach(t => {
            t(e);
          });
        });
      }
      resumePausedMutations() {
        const e = this.getAll().filter(e => e.state.isPaused);
        return i.Vr.batch(() => Promise.all(e.map(e => e.continue().catch(r.ZT))));
      }
    };
    function l(e) {
      return e.options.scope?.id;
    }
    var d = n(87045), f = n(57853);
    function h(e) {
      return {
        onFetch: (t, n) => {
          const o = t.options, i = t.fetchOptions?.meta?.fetchMore?.direction, s = t.state.data?.pages || [], a = t.state.data?.pageParams || [];
          let c = {
            pages: [],
            pageParams: []
          }, u = 0;
          const l = async () => {
            let n = !1;
            const l = (0, r.cG)(t.options, t.fetchOptions), d = async (e, o, i) => {
              if (n) return Promise.reject();
              if (null == o && e.pages.length) return Promise.resolve(e);
              const s = (() => {
                const e = {
                  client: t.client,
                  queryKey: t.queryKey,
                  pageParam: o,
                  direction: i ? "backward" : "forward",
                  meta: t.options.meta
                };
                var r;
                return (r = e, Object.defineProperty(r, "signal", {
                  enumerable: !0,
                  get: () => (t.signal.aborted ? n = !0 : t.signal.addEventListener("abort", () => {
                    n = !0;
                  }), t.signal)
                }), e);
              })(), a = await l(s), {maxPages: c} = t.options, u = i ? r.Ht : r.VX;
              return {
                pages: u(e.pages, a, c),
                pageParams: u(e.pageParams, o, c)
              };
            };
            if (i && s.length) {
              const e = "backward" === i, t = {
                pages: s,
                pageParams: a
              }, n = (e ? m : p)(o, t);
              c = await d(t, n, e);
            } else {
              const t = e ?? s.length;
              do {
                const e = 0 === u ? a[0] ?? o.initialPageParam : p(o, c);
                if (u > 0 && null == e) break;
                (c = await d(c, e), u++);
              } while (u < t);
            }
            return c;
          };
          t.options.persister ? t.fetchFn = () => t.options.persister?.(l, {
            client: t.client,
            queryKey: t.queryKey,
            meta: t.options.meta,
            signal: t.signal
          }, n) : t.fetchFn = l;
        }
      };
    }
    function p(e, {pages: t, pageParams: n}) {
      const r = t.length - 1;
      return t.length > 0 ? e.getNextPageParam(t[r], t, n[r], n) : void 0;
    }
    function m(e, {pages: t, pageParams: n}) {
      return t.length > 0 ? e.getPreviousPageParam?.(t[0], t, n[0], n) : void 0;
    }
    var b = class {
      #g;
      #i;
      #f;
      #w;
      #v;
      #A;
      #x;
      #C;
      constructor(e = {}) {
        (this.#g = e.queryCache || new a(), this.#i = e.mutationCache || new u(), this.#f = e.defaultOptions || ({}), this.#w = new Map(), this.#v = new Map(), this.#A = 0);
      }
      mount() {
        (this.#A++, 1 === this.#A && (this.#x = d.j.subscribe(async e => {
          e && (await this.resumePausedMutations(), this.#g.onFocus());
        }), this.#C = f.N.subscribe(async e => {
          e && (await this.resumePausedMutations(), this.#g.onOnline());
        })));
      }
      unmount() {
        (this.#A--, 0 === this.#A && (this.#x?.(), this.#x = void 0, this.#C?.(), this.#C = void 0));
      }
      isFetching(e) {
        return this.#g.findAll({
          ...e,
          fetchStatus: "fetching"
        }).length;
      }
      isMutating(e) {
        return this.#i.findAll({
          ...e,
          status: "pending"
        }).length;
      }
      getQueryData(e) {
        const t = this.defaultQueryOptions({
          queryKey: e
        });
        return this.#g.get(t.queryHash)?.state.data;
      }
      ensureQueryData(e) {
        const t = this.defaultQueryOptions(e), n = this.#g.build(this, t), o = n.state.data;
        return void 0 === o ? this.fetchQuery(e) : (e.revalidateIfStale && n.isStaleByTime((0, r.KC)(t.staleTime, n)) && this.prefetchQuery(t), Promise.resolve(o));
      }
      getQueriesData(e) {
        return this.#g.findAll(e).map(({queryKey: e, state: t}) => [e, t.data]);
      }
      setQueryData(e, t, n) {
        const o = this.defaultQueryOptions({
          queryKey: e
        }), i = this.#g.get(o.queryHash), s = i?.state.data, a = (0, r.SE)(t, s);
        if (void 0 !== a) return this.#g.build(this, o).setData(a, {
          ...n,
          manual: !0
        });
      }
      setQueriesData(e, t, n) {
        return i.Vr.batch(() => this.#g.findAll(e).map(({queryKey: e}) => [e, this.setQueryData(e, t, n)]));
      }
      getQueryState(e) {
        const t = this.defaultQueryOptions({
          queryKey: e
        });
        return this.#g.get(t.queryHash)?.state;
      }
      removeQueries(e) {
        const t = this.#g;
        i.Vr.batch(() => {
          t.findAll(e).forEach(e => {
            t.remove(e);
          });
        });
      }
      resetQueries(e, t) {
        const n = this.#g;
        return i.Vr.batch(() => (n.findAll(e).forEach(e => {
          e.reset();
        }), this.refetchQueries({
          type: "active",
          ...e
        }, t)));
      }
      cancelQueries(e, t = {}) {
        const n = {
          revert: !0,
          ...t
        }, o = i.Vr.batch(() => this.#g.findAll(e).map(e => e.cancel(n)));
        return Promise.all(o).then(r.ZT).catch(r.ZT);
      }
      invalidateQueries(e, t = {}) {
        return i.Vr.batch(() => (this.#g.findAll(e).forEach(e => {
          e.invalidate();
        }), "none" === e?.refetchType ? Promise.resolve() : this.refetchQueries({
          ...e,
          type: (e?.refetchType ?? e?.type) ?? "active"
        }, t)));
      }
      refetchQueries(e, t = {}) {
        const n = {
          ...t,
          cancelRefetch: t.cancelRefetch ?? !0
        }, o = i.Vr.batch(() => this.#g.findAll(e).filter(e => !e.isDisabled() && !e.isStatic()).map(e => {
          let t = e.fetch(void 0, n);
          return (n.throwOnError || (t = t.catch(r.ZT)), "paused" === e.state.fetchStatus ? Promise.resolve() : t);
        }));
        return Promise.all(o).then(r.ZT);
      }
      fetchQuery(e) {
        const t = this.defaultQueryOptions(e);
        void 0 === t.retry && (t.retry = !1);
        const n = this.#g.build(this, t);
        return n.isStaleByTime((0, r.KC)(t.staleTime, n)) ? n.fetch(t) : Promise.resolve(n.state.data);
      }
      prefetchQuery(e) {
        return this.fetchQuery(e).then(r.ZT).catch(r.ZT);
      }
      fetchInfiniteQuery(e) {
        return (e.behavior = h(e.pages), this.fetchQuery(e));
      }
      prefetchInfiniteQuery(e) {
        return this.fetchInfiniteQuery(e).then(r.ZT).catch(r.ZT);
      }
      ensureInfiniteQueryData(e) {
        return (e.behavior = h(e.pages), this.ensureQueryData(e));
      }
      resumePausedMutations() {
        return f.N.isOnline() ? this.#i.resumePausedMutations() : Promise.resolve();
      }
      getQueryCache() {
        return this.#g;
      }
      getMutationCache() {
        return this.#i;
      }
      getDefaultOptions() {
        return this.#f;
      }
      setDefaultOptions(e) {
        this.#f = e;
      }
      setQueryDefaults(e, t) {
        this.#w.set((0, r.Ym)(e), {
          queryKey: e,
          defaultOptions: t
        });
      }
      getQueryDefaults(e) {
        const t = [...this.#w.values()], n = {};
        return (t.forEach(t => {
          (0, r.to)(e, t.queryKey) && Object.assign(n, t.defaultOptions);
        }), n);
      }
      setMutationDefaults(e, t) {
        this.#v.set((0, r.Ym)(e), {
          mutationKey: e,
          defaultOptions: t
        });
      }
      getMutationDefaults(e) {
        const t = [...this.#v.values()], n = {};
        return (t.forEach(t => {
          (0, r.to)(e, t.mutationKey) && Object.assign(n, t.defaultOptions);
        }), n);
      }
      defaultQueryOptions(e) {
        if (e._defaulted) return e;
        const t = {
          ...this.#f.queries,
          ...this.getQueryDefaults(e.queryKey),
          ...e,
          _defaulted: !0
        };
        return (t.queryHash || (t.queryHash = (0, r.Rm)(t.queryKey, t)), void 0 === t.refetchOnReconnect && (t.refetchOnReconnect = "always" !== t.networkMode), void 0 === t.throwOnError && (t.throwOnError = !!t.suspense), !t.networkMode && t.persister && (t.networkMode = "offlineFirst"), t.queryFn === r.CN && (t.enabled = !1), t);
      }
      defaultMutationOptions(e) {
        return e?._defaulted ? e : {
          ...this.#f.mutations,
          ...e?.mutationKey && this.getMutationDefaults(e.mutationKey),
          ...e,
          _defaulted: !0
        };
      }
      clear() {
        (this.#g.clear(), this.#i.clear());
      }
    };
  },
  7989: function (e, t, n) {
    "use strict";
    n.d(t, {
      F: function () {
        return i;
      }
    });
    var r = n(84554), o = n(45345), i = class {
      #P;
      destroy() {
        this.clearGcTimeout();
      }
      scheduleGc() {
        (this.clearGcTimeout(), (0, o.PN)(this.gcTime) && (this.#P = r.mr.setTimeout(() => {
          this.optionalRemove();
        }, this.gcTime)));
      }
      updateGcTime(e) {
        this.gcTime = Math.max(this.gcTime || 0, e ?? (o.sk ? 1 / 0 : 300000));
      }
      clearGcTimeout() {
        this.#P && (r.mr.clearTimeout(this.#P), this.#P = void 0);
      }
    };
  },
  11255: function (e, t, n) {
    "use strict";
    n.d(t, {
      Kw: function () {
        return c;
      },
      Mz: function () {
        return l;
      },
      p8: function () {
        return u;
      }
    });
    var r = n(87045), o = n(57853), i = n(16803), s = n(45345);
    function a(e) {
      return Math.min(1000 * 2 ** e, 30000);
    }
    function c(e) {
      return "online" !== (e ?? "online") || o.N.isOnline();
    }
    var u = class extends Error {
      constructor(e) {
        (super("CancelledError"), this.revert = e?.revert, this.silent = e?.silent);
      }
    };
    function l(e) {
      let t, n = !1, l = 0;
      const d = (0, i.O)(), f = () => "pending" !== d.status, h = () => r.j.isFocused() && ("always" === e.networkMode || o.N.isOnline()) && e.canRun(), p = () => c(e.networkMode) && e.canRun(), m = e => {
        f() || (t?.(), d.resolve(e));
      }, b = e => {
        f() || (t?.(), d.reject(e));
      }, y = () => new Promise(n => {
        (t = e => {
          (f() || h()) && n(e);
        }, e.onPause?.());
      }).then(() => {
        (t = void 0, f() || e.onContinue?.());
      }), g = () => {
        if (f()) return;
        let t;
        const r = 0 === l ? e.initialPromise : void 0;
        try {
          t = r ?? e.fn();
        } catch (o) {
          t = Promise.reject(o);
        }
        Promise.resolve(t).then(m).catch(t => {
          if (f()) return;
          const r = e.retry ?? (s.sk ? 0 : 3), o = e.retryDelay ?? a, i = "function" === typeof o ? o(l, t) : o, c = !0 === r || "number" === typeof r && l < r || "function" === typeof r && r(l, t);
          !n && c ? (l++, e.onFail?.(l, t), (0, s._v)(i).then(() => h() ? void 0 : y()).then(() => {
            n ? b(t) : g();
          })) : b(t);
        });
      };
      return {
        promise: d,
        status: () => d.status,
        cancel: t => {
          if (!f()) {
            const n = new u(t);
            (b(n), e.onCancel?.(n));
          }
        },
        continue: () => (t?.(), d),
        cancelRetry: () => {
          n = !0;
        },
        continueRetry: () => {
          n = !1;
        },
        canStart: p,
        start: () => (p() ? g() : y().then(g), d)
      };
    }
  },
  24112: function (e, t, n) {
    "use strict";
    n.d(t, {
      l: function () {
        return r;
      }
    });
    var r = class {
      constructor() {
        (this.listeners = new Set(), this.subscribe = this.subscribe.bind(this));
      }
      subscribe(e) {
        return (this.listeners.add(e), this.onSubscribe(), () => {
          (this.listeners.delete(e), this.onUnsubscribe());
        });
      }
      hasListeners() {
        return this.listeners.size > 0;
      }
      onSubscribe() {}
      onUnsubscribe() {}
    };
  },
  16803: function (e, t, n) {
    "use strict";
    function r() {
      let e, t;
      const n = new Promise((n, r) => {
        (e = n, t = r);
      });
      function r(e) {
        (Object.assign(n, e), delete n.resolve, delete n.reject);
      }
      return (n.status = "pending", n.catch(() => {}), n.resolve = t => {
        (r({
          status: "fulfilled",
          value: t
        }), e(t));
      }, n.reject = e => {
        (r({
          status: "rejected",
          reason: e
        }), t(e));
      }, n);
    }
    n.d(t, {
      O: function () {
        return r;
      }
    });
  },
  84554: function (e, t, n) {
    "use strict";
    n.d(t, {
      Hp: function () {
        return i;
      },
      mr: function () {
        return o;
      }
    });
    var r = {
      setTimeout: (e, t) => setTimeout(e, t),
      clearTimeout: e => clearTimeout(e),
      setInterval: (e, t) => setInterval(e, t),
      clearInterval: e => clearInterval(e)
    }, o = new (class {
      #E = r;
      #k = !1;
      setTimeoutProvider(e) {
        this.#E = e;
      }
      setTimeout(e, t) {
        return this.#E.setTimeout(e, t);
      }
      clearTimeout(e) {
        this.#E.clearTimeout(e);
      }
      setInterval(e, t) {
        return this.#E.setInterval(e, t);
      }
      clearInterval(e) {
        this.#E.clearInterval(e);
      }
    })();
    function i(e) {
      setTimeout(e, 0);
    }
  },
  45345: function (e, t, n) {
    "use strict";
    n.d(t, {
      CN: function () {
        return k;
      },
      Ht: function () {
        return E;
      },
      KC: function () {
        return u;
      },
      Kp: function () {
        return c;
      },
      L3: function () {
        return B;
      },
      Nc: function () {
        return l;
      },
      PN: function () {
        return a;
      },
      Rm: function () {
        return h;
      },
      SE: function () {
        return s;
      },
      VS: function () {
        return g;
      },
      VX: function () {
        return P;
      },
      X7: function () {
        return f;
      },
      Ym: function () {
        return p;
      },
      ZT: function () {
        return i;
      },
      _v: function () {
        return x;
      },
      _x: function () {
        return d;
      },
      cG: function () {
        return I;
      },
      oE: function () {
        return C;
      },
      sk: function () {
        return o;
      },
      to: function () {
        return m;
      }
    });
    var r = n(84554), o = "undefined" === typeof window || ("Deno" in globalThis);
    function i() {}
    function s(e, t) {
      return "function" === typeof e ? e(t) : e;
    }
    function a(e) {
      return "number" === typeof e && e >= 0 && e !== 1 / 0;
    }
    function c(e, t) {
      return Math.max(e + (t || 0) - Date.now(), 0);
    }
    function u(e, t) {
      return "function" === typeof e ? e(t) : e;
    }
    function l(e, t) {
      return "function" === typeof e ? e(t) : e;
    }
    function d(e, t) {
      const {type: n = "all", exact: r, fetchStatus: o, predicate: i, queryKey: s, stale: a} = e;
      if (s) if (r) {
        if (t.queryHash !== h(s, t.options)) return !1;
      } else if (!m(t.queryKey, s)) return !1;
      if ("all" !== n) {
        const e = t.isActive();
        if ("active" === n && !e) return !1;
        if ("inactive" === n && e) return !1;
      }
      return ("boolean" !== typeof a || t.isStale() === a) && ((!o || o === t.state.fetchStatus) && !(i && !i(t)));
    }
    function f(e, t) {
      const {exact: n, status: r, predicate: o, mutationKey: i} = e;
      if (i) {
        if (!t.options.mutationKey) return !1;
        if (n) {
          if (p(t.options.mutationKey) !== p(i)) return !1;
        } else if (!m(t.options.mutationKey, i)) return !1;
      }
      return (!r || t.state.status === r) && !(o && !o(t));
    }
    function h(e, t) {
      return (t?.queryKeyHashFn || p)(e);
    }
    function p(e) {
      return JSON.stringify(e, (e, t) => v(t) ? Object.keys(t).sort().reduce((e, n) => (e[n] = t[n], e), {}) : t);
    }
    function m(e, t) {
      return e === t || typeof e === typeof t && (!(!e || !t || "object" !== typeof e || "object" !== typeof t) && Object.keys(t).every(n => m(e[n], t[n])));
    }
    var b = Object.prototype.hasOwnProperty;
    function y(e, t) {
      if (e === t) return e;
      const n = w(e) && w(t);
      if (!n && (!v(e) || !v(t))) return t;
      const r = (n ? e : Object.keys(e)).length, o = n ? t : Object.keys(t), i = o.length, s = n ? new Array(i) : {};
      let a = 0;
      for (let c = 0; c < i; c++) {
        const i = n ? c : o[c], u = e[i], l = t[i];
        if (u === l) {
          (s[i] = u, (n ? c < r : b.call(e, i)) && a++);
          continue;
        }
        if (null === u || null === l || "object" !== typeof u || "object" !== typeof l) {
          s[i] = l;
          continue;
        }
        const d = y(u, l);
        (s[i] = d, d === u && a++);
      }
      return r === i && a === r ? e : s;
    }
    function g(e, t) {
      if (!t || Object.keys(e).length !== Object.keys(t).length) return !1;
      for (const n in e) if (e[n] !== t[n]) return !1;
      return !0;
    }
    function w(e) {
      return Array.isArray(e) && e.length === Object.keys(e).length;
    }
    function v(e) {
      if (!A(e)) return !1;
      const t = e.constructor;
      if (void 0 === t) return !0;
      const n = t.prototype;
      return !!A(n) && (!!n.hasOwnProperty("isPrototypeOf") && Object.getPrototypeOf(e) === Object.prototype);
    }
    function A(e) {
      return "[object Object]" === Object.prototype.toString.call(e);
    }
    function x(e) {
      return new Promise(t => {
        r.mr.setTimeout(t, e);
      });
    }
    function C(e, t, n) {
      return "function" === typeof n.structuralSharing ? n.structuralSharing(e, t) : !1 !== n.structuralSharing ? y(e, t) : t;
    }
    function P(e, t, n = 0) {
      const r = [...e, t];
      return n && r.length > n ? r.slice(1) : r;
    }
    function E(e, t, n = 0) {
      const r = [t, ...e];
      return n && r.length > n ? r.slice(0, -1) : r;
    }
    var k = Symbol();
    function I(e, t) {
      return !e.queryFn && t?.initialPromise ? () => t.initialPromise : e.queryFn && e.queryFn !== k ? e.queryFn : () => Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`));
    }
    function B(e, t) {
      return "function" === typeof e ? e(...t) : !!e;
    }
  },
  29827: function (e, t, n) {
    "use strict";
    n.d(t, {
      NL: function () {
        return s;
      },
      aH: function () {
        return a;
      }
    });
    var r = n(2265), o = n(57437), i = r.createContext(void 0), s = e => {
      const t = r.useContext(i);
      if (e) return e;
      if (!t) throw new Error("No QueryClient set, use QueryClientProvider to set one");
      return t;
    }, a = e => {
      let {client: t, children: n} = e;
      return (r.useEffect(() => (t.mount(), () => {
        t.unmount();
      }), [t]), (0, o.jsx)(i.Provider, {
        value: t,
        children: n
      }));
    };
  },
  21770: function (e, t, n) {
    "use strict";
    n.d(t, {
      D: function () {
        return l;
      }
    });
    var r = n(2265), o = n(2894), i = n(18238), s = n(24112), a = n(45345), c = class extends s.l {
      #r;
      #I = void 0;
      #B;
      #S;
      constructor(e, t) {
        (super(), this.#r = e, this.setOptions(t), this.bindMethods(), this.#O());
      }
      bindMethods() {
        (this.mutate = this.mutate.bind(this), this.reset = this.reset.bind(this));
      }
      setOptions(e) {
        const t = this.options;
        (this.options = this.#r.defaultMutationOptions(e), (0, a.VS)(this.options, t) || this.#r.getMutationCache().notify({
          type: "observerOptionsUpdated",
          mutation: this.#B,
          observer: this
        }), t?.mutationKey && this.options.mutationKey && (0, a.Ym)(t.mutationKey) !== (0, a.Ym)(this.options.mutationKey) ? this.reset() : "pending" === this.#B?.state.status && this.#B.setOptions(this.options));
      }
      onUnsubscribe() {
        this.hasListeners() || this.#B?.removeObserver(this);
      }
      onMutationUpdate(e) {
        (this.#O(), this.#M(e));
      }
      getCurrentResult() {
        return this.#I;
      }
      reset() {
        (this.#B?.removeObserver(this), this.#B = void 0, this.#O(), this.#M());
      }
      mutate(e, t) {
        return (this.#S = t, this.#B?.removeObserver(this), this.#B = this.#r.getMutationCache().build(this.#r, this.options), this.#B.addObserver(this), this.#B.execute(e));
      }
      #O() {
        const e = this.#B?.state ?? (0, o.R)();
        this.#I = {
          ...e,
          isPending: "pending" === e.status,
          isSuccess: "success" === e.status,
          isError: "error" === e.status,
          isIdle: "idle" === e.status,
          mutate: this.mutate,
          reset: this.reset
        };
      }
      #M(e) {
        i.Vr.batch(() => {
          if (this.#S && this.hasListeners()) {
            const t = this.#I.variables, n = this.#I.context, r = {
              client: this.#r,
              meta: this.options.meta,
              mutationKey: this.options.mutationKey
            };
            "success" === e?.type ? (this.#S.onSuccess?.(e.data, t, n, r), this.#S.onSettled?.(e.data, null, t, n, r)) : "error" === e?.type && (this.#S.onError?.(e.error, t, n, r), this.#S.onSettled?.(void 0, e.error, t, n, r));
          }
          this.listeners.forEach(e => {
            e(this.#I);
          });
        });
      }
    }, u = n(29827);
    function l(e, t) {
      const n = (0, u.NL)(t), [o] = r.useState(() => new c(n, e));
      r.useEffect(() => {
        o.setOptions(e);
      }, [o, e]);
      const s = r.useSyncExternalStore(r.useCallback(e => o.subscribe(i.Vr.batchCalls(e)), [o]), () => o.getCurrentResult(), () => o.getCurrentResult()), l = r.useCallback((e, t) => {
        o.mutate(e, t).catch(a.ZT);
      }, [o]);
      if (s.error && (0, a.L3)(o.options.throwOnError, [s.error])) throw s.error;
      return {
        ...s,
        mutate: l,
        mutateAsync: s.mutate
      };
    }
  },
  11713: function (e, t, n) {
    "use strict";
    n.d(t, {
      a: function () {
        return S;
      }
    });
    var r = n(87045), o = n(18238), i = n(21733), s = n(24112), a = n(16803), c = n(45345), u = n(84554), l = class extends s.l {
      constructor(e, t) {
        (super(), this.options = t, this.#r = e, this.#T = null, this.#N = (0, a.O)(), this.bindMethods(), this.setOptions(t));
      }
      #r;
      #R = void 0;
      #F = void 0;
      #I = void 0;
      #j;
      #U;
      #N;
      #T;
      #D;
      #L;
      #z;
      #q;
      #G;
      #Q;
      #_ = new Set();
      bindMethods() {
        this.refetch = this.refetch.bind(this);
      }
      onSubscribe() {
        1 === this.listeners.size && (this.#R.addObserver(this), d(this.#R, this.options) ? this.#W() : this.updateResult(), this.#$());
      }
      onUnsubscribe() {
        this.hasListeners() || this.destroy();
      }
      shouldFetchOnReconnect() {
        return f(this.#R, this.options, this.options.refetchOnReconnect);
      }
      shouldFetchOnWindowFocus() {
        return f(this.#R, this.options, this.options.refetchOnWindowFocus);
      }
      destroy() {
        (this.listeners = new Set(), this.#H(), this.#K(), this.#R.removeObserver(this));
      }
      setOptions(e) {
        const t = this.options, n = this.#R;
        if ((this.options = this.#r.defaultQueryOptions(e), void 0 !== this.options.enabled && "boolean" !== typeof this.options.enabled && "function" !== typeof this.options.enabled && "boolean" !== typeof (0, c.Nc)(this.options.enabled, this.#R))) throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");
        (this.#V(), this.#R.setOptions(this.options), t._defaulted && !(0, c.VS)(this.options, t) && this.#r.getQueryCache().notify({
          type: "observerOptionsUpdated",
          query: this.#R,
          observer: this
        }));
        const r = this.hasListeners();
        (r && h(this.#R, n, this.options, t) && this.#W(), this.updateResult(), !r || this.#R === n && (0, c.Nc)(this.options.enabled, this.#R) === (0, c.Nc)(t.enabled, this.#R) && (0, c.KC)(this.options.staleTime, this.#R) === (0, c.KC)(t.staleTime, this.#R) || this.#J());
        const o = this.#Z();
        !r || this.#R === n && (0, c.Nc)(this.options.enabled, this.#R) === (0, c.Nc)(t.enabled, this.#R) && o === this.#Q || this.#Y(o);
      }
      getOptimisticResult(e) {
        const t = this.#r.getQueryCache().build(this.#r, e), n = this.createResult(t, e);
        return ((function (e, t) {
          if (!(0, c.VS)(e.getCurrentResult(), t)) return !0;
          return !1;
        })(this, n) && (this.#I = n, this.#U = this.options, this.#j = this.#R.state), n);
      }
      getCurrentResult() {
        return this.#I;
      }
      trackResult(e, t) {
        return new Proxy(e, {
          get: (e, n) => (this.trackProp(n), t?.(n), "promise" !== n || this.options.experimental_prefetchInRender || "pending" !== this.#N.status || this.#N.reject(new Error("experimental_prefetchInRender feature flag is not enabled")), Reflect.get(e, n))
        });
      }
      trackProp(e) {
        this.#_.add(e);
      }
      getCurrentQuery() {
        return this.#R;
      }
      refetch({...e} = {}) {
        return this.fetch({
          ...e
        });
      }
      fetchOptimistic(e) {
        const t = this.#r.defaultQueryOptions(e), n = this.#r.getQueryCache().build(this.#r, t);
        return n.fetch().then(() => this.createResult(n, t));
      }
      fetch(e) {
        return this.#W({
          ...e,
          cancelRefetch: e.cancelRefetch ?? !0
        }).then(() => (this.updateResult(), this.#I));
      }
      #W(e) {
        this.#V();
        let t = this.#R.fetch(this.options, e);
        return (e?.throwOnError || (t = t.catch(c.ZT)), t);
      }
      #J() {
        this.#H();
        const e = (0, c.KC)(this.options.staleTime, this.#R);
        if (c.sk || this.#I.isStale || !(0, c.PN)(e)) return;
        const t = (0, c.Kp)(this.#I.dataUpdatedAt, e) + 1;
        this.#q = u.mr.setTimeout(() => {
          this.#I.isStale || this.updateResult();
        }, t);
      }
      #Z() {
        return ("function" === typeof this.options.refetchInterval ? this.options.refetchInterval(this.#R) : this.options.refetchInterval) ?? !1;
      }
      #Y(e) {
        (this.#K(), this.#Q = e, !c.sk && !1 !== (0, c.Nc)(this.options.enabled, this.#R) && (0, c.PN)(this.#Q) && 0 !== this.#Q && (this.#G = u.mr.setInterval(() => {
          (this.options.refetchIntervalInBackground || r.j.isFocused()) && this.#W();
        }, this.#Q)));
      }
      #$() {
        (this.#J(), this.#Y(this.#Z()));
      }
      #H() {
        this.#q && (u.mr.clearTimeout(this.#q), this.#q = void 0);
      }
      #K() {
        this.#G && (u.mr.clearInterval(this.#G), this.#G = void 0);
      }
      createResult(e, t) {
        const n = this.#R, r = this.options, o = this.#I, s = this.#j, u = this.#U, l = e !== n ? e.state : this.#F, {state: f} = e;
        let m, b = {
          ...f
        }, y = !1;
        if (t._optimisticResults) {
          const o = this.hasListeners(), s = !o && d(e, t), a = o && h(e, n, t, r);
          ((s || a) && (b = {
            ...b,
            ...(0, i.z)(f.data, e.options)
          }), "isRestoring" === t._optimisticResults && (b.fetchStatus = "idle"));
        }
        let {error: g, errorUpdatedAt: w, status: v} = b;
        m = b.data;
        let A = !1;
        if (void 0 !== t.placeholderData && void 0 === m && "pending" === v) {
          let e;
          (o?.isPlaceholderData && t.placeholderData === u?.placeholderData ? (e = o.data, A = !0) : e = "function" === typeof t.placeholderData ? t.placeholderData(this.#z?.state.data, this.#z) : t.placeholderData, void 0 !== e && (v = "success", m = (0, c.oE)(o?.data, e, t), y = !0));
        }
        if (t.select && void 0 !== m && !A) if (o && m === s?.data && t.select === this.#D) m = this.#L; else try {
          (this.#D = t.select, m = t.select(m), m = (0, c.oE)(o?.data, m, t), this.#L = m, this.#T = null);
        } catch (B) {
          this.#T = B;
        }
        this.#T && (g = this.#T, m = this.#L, w = Date.now(), v = "error");
        const x = "fetching" === b.fetchStatus, C = "pending" === v, P = "error" === v, E = C && x, k = void 0 !== m, I = {
          status: v,
          fetchStatus: b.fetchStatus,
          isPending: C,
          isSuccess: "success" === v,
          isError: P,
          isInitialLoading: E,
          isLoading: E,
          data: m,
          dataUpdatedAt: b.dataUpdatedAt,
          error: g,
          errorUpdatedAt: w,
          failureCount: b.fetchFailureCount,
          failureReason: b.fetchFailureReason,
          errorUpdateCount: b.errorUpdateCount,
          isFetched: b.dataUpdateCount > 0 || b.errorUpdateCount > 0,
          isFetchedAfterMount: b.dataUpdateCount > l.dataUpdateCount || b.errorUpdateCount > l.errorUpdateCount,
          isFetching: x,
          isRefetching: x && !C,
          isLoadingError: P && !k,
          isPaused: "paused" === b.fetchStatus,
          isPlaceholderData: y,
          isRefetchError: P && k,
          isStale: p(e, t),
          refetch: this.refetch,
          promise: this.#N,
          isEnabled: !1 !== (0, c.Nc)(t.enabled, e)
        };
        if (this.options.experimental_prefetchInRender) {
          const t = e => {
            "error" === I.status ? e.reject(I.error) : void 0 !== I.data && e.resolve(I.data);
          }, r = () => {
            const e = this.#N = I.promise = (0, a.O)();
            t(e);
          }, o = this.#N;
          switch (o.status) {
            case "pending":
              e.queryHash === n.queryHash && t(o);
              break;
            case "fulfilled":
              "error" !== I.status && I.data === o.value || r();
              break;
            case "rejected":
              "error" === I.status && I.error === o.reason || r();
          }
        }
        return I;
      }
      updateResult() {
        const e = this.#I, t = this.createResult(this.#R, this.options);
        if ((this.#j = this.#R.state, this.#U = this.options, void 0 !== this.#j.data && (this.#z = this.#R), (0, c.VS)(t, e))) return;
        this.#I = t;
        this.#M({
          listeners: (() => {
            if (!e) return !0;
            const {notifyOnChangeProps: t} = this.options, n = "function" === typeof t ? t() : t;
            if ("all" === n || !n && !this.#_.size) return !0;
            const r = new Set(n ?? this.#_);
            return (this.options.throwOnError && r.add("error"), Object.keys(this.#I).some(t => {
              const n = t;
              return this.#I[n] !== e[n] && r.has(n);
            }));
          })()
        });
      }
      #V() {
        const e = this.#r.getQueryCache().build(this.#r, this.options);
        if (e === this.#R) return;
        const t = this.#R;
        (this.#R = e, this.#F = e.state, this.hasListeners() && (t?.removeObserver(this), e.addObserver(this)));
      }
      onQueryUpdate() {
        (this.updateResult(), this.hasListeners() && this.#$());
      }
      #M(e) {
        o.Vr.batch(() => {
          (e.listeners && this.listeners.forEach(e => {
            e(this.#I);
          }), this.#r.getQueryCache().notify({
            query: this.#R,
            type: "observerResultsUpdated"
          }));
        });
      }
    };
    function d(e, t) {
      return (function (e, t) {
        return !1 !== (0, c.Nc)(t.enabled, e) && void 0 === e.state.data && !("error" === e.state.status && !1 === t.retryOnMount);
      })(e, t) || void 0 !== e.state.data && f(e, t, t.refetchOnMount);
    }
    function f(e, t, n) {
      if (!1 !== (0, c.Nc)(t.enabled, e) && "static" !== (0, c.KC)(t.staleTime, e)) {
        const r = "function" === typeof n ? n(e) : n;
        return "always" === r || !1 !== r && p(e, t);
      }
      return !1;
    }
    function h(e, t, n, r) {
      return (e !== t || !1 === (0, c.Nc)(r.enabled, e)) && (!n.suspense || "error" !== e.state.status) && p(e, n);
    }
    function p(e, t) {
      return !1 !== (0, c.Nc)(t.enabled, e) && e.isStaleByTime((0, c.KC)(t.staleTime, e));
    }
    var m = n(2265), b = n(29827);
    n(57437);
    function y() {
      let e = !1;
      return {
        clearReset: () => {
          e = !1;
        },
        reset: () => {
          e = !0;
        },
        isReset: () => e
      };
    }
    var g = m.createContext(y()), w = () => m.useContext(g), v = (e, t) => {
      (e.suspense || e.throwOnError || e.experimental_prefetchInRender) && (t.isReset() || (e.retryOnMount = !1));
    }, A = e => {
      m.useEffect(() => {
        e.clearReset();
      }, [e]);
    }, x = e => {
      let {result: t, errorResetBoundary: n, throwOnError: r, query: o, suspense: i} = e;
      return t.isError && !n.isReset() && !t.isFetching && o && (i && void 0 === t.data || (0, c.L3)(r, [t.error, o]));
    }, C = m.createContext(!1), P = () => m.useContext(C), E = (C.Provider, e => {
      if (e.suspense) {
        const t = 1000, n = e => "static" === e ? e : Math.max(e ?? t, t), r = e.staleTime;
        (e.staleTime = "function" === typeof r ? (...e) => n(r(...e)) : n(r), "number" === typeof e.gcTime && (e.gcTime = Math.max(e.gcTime, t)));
      }
    }), k = (e, t) => e.isLoading && e.isFetching && !t, I = (e, t) => e?.suspense && t.isPending, B = (e, t, n) => t.fetchOptimistic(e).catch(() => {
      n.clearReset();
    });
    function S(e, t) {
      return (function (e, t, n) {
        var r, i, s, a;
        const u = P(), l = w(), d = (0, b.NL)(n), f = d.defaultQueryOptions(e);
        (null === (i = d.getDefaultOptions().queries) || void 0 === i || null === (r = i._experimental_beforeQuery) || void 0 === r || r.call(i, f), f._optimisticResults = u ? "isRestoring" : "optimistic", E(f), v(f, l), A(l));
        const h = !d.getQueryCache().get(f.queryHash), [p] = m.useState(() => new t(d, f)), y = p.getOptimisticResult(f), g = !u && !1 !== e.subscribed;
        if ((m.useSyncExternalStore(m.useCallback(e => {
          const t = g ? p.subscribe(o.Vr.batchCalls(e)) : c.ZT;
          return (p.updateResult(), t);
        }, [p, g]), () => p.getCurrentResult(), () => p.getCurrentResult()), m.useEffect(() => {
          p.setOptions(f);
        }, [f, p]), I(f, y))) throw B(f, p, l);
        if (x({
          result: y,
          errorResetBoundary: l,
          throwOnError: f.throwOnError,
          query: d.getQueryCache().get(f.queryHash),
          suspense: f.suspense
        })) throw y.error;
        if ((null === (a = d.getDefaultOptions().queries) || void 0 === a || null === (s = a._experimental_afterQuery) || void 0 === s || s.call(a, f, y), f.experimental_prefetchInRender && !c.sk && k(y, u))) {
          var C;
          const e = h ? B(f, p, l) : null === (C = d.getQueryCache().get(f.queryHash)) || void 0 === C ? void 0 : C.promise;
          null === e || void 0 === e || e.catch(c.ZT).finally(() => {
            p.updateResult();
          });
        }
        return f.notifyOnChangeProps ? y : p.trackResult(y);
      })(e, l, t);
    }
  },
  24380: function (e, t, n) {
    "use strict";
    function r(e) {
      const t = e.state.current, n = e.state.connections.get(t), r = n?.accounts, o = r?.[0], i = e.chains.find(e => e.id === n?.chainId), s = e.state.status;
      switch (s) {
        case "connected":
          return {
            address: o,
            addresses: r,
            chain: i,
            chainId: n?.chainId,
            connector: n?.connector,
            isConnected: !0,
            isConnecting: !1,
            isDisconnected: !1,
            isReconnecting: !1,
            status: s
          };
        case "reconnecting":
          return {
            address: o,
            addresses: r,
            chain: i,
            chainId: n?.chainId,
            connector: n?.connector,
            isConnected: !!o,
            isConnecting: !1,
            isDisconnected: !1,
            isReconnecting: !0,
            status: s
          };
        case "connecting":
          return {
            address: o,
            addresses: r,
            chain: i,
            chainId: n?.chainId,
            connector: n?.connector,
            isConnected: !1,
            isConnecting: !0,
            isDisconnected: !1,
            isReconnecting: !1,
            status: s
          };
        case "disconnected":
          return {
            address: void 0,
            addresses: void 0,
            chain: void 0,
            chainId: void 0,
            connector: void 0,
            isConnected: !1,
            isConnecting: !1,
            isDisconnected: !0,
            isReconnecting: !1,
            status: s
          };
      }
    }
    n.d(t, {
      D: function () {
        return r;
      }
    });
  },
  18849: function (e, t, n) {
    "use strict";
    n.d(t, {
      e: function () {
        return c;
      }
    });
    var r = n(82538), o = n(24250);
    var i = n(19775), s = n(31669), a = n(13102);
    async function c(e, t = {}) {
      const {assertChainId: n = !0} = t;
      let c;
      if (t.connector) {
        const {connector: n} = t;
        if ("reconnecting" === e.state.status && !n.getAccounts && !n.getChainId) throw new a.$S({
          connector: n
        });
        const [r, o] = await Promise.all([n.getAccounts().catch(e => {
          if (null === t.account) return [];
          throw e;
        }), n.getChainId()]);
        c = {
          accounts: r,
          chainId: o,
          connector: n
        };
      } else c = e.state.connections.get(e.state.current);
      if (!c) throw new a.aH();
      const u = t.chainId ?? c.chainId, l = await c.connector.getChainId();
      if (n && l !== u) throw new a.XZ({
        connectionChainId: u,
        connectorChainId: l
      });
      const d = c.connector;
      if (d.getClient) return d.getClient({
        chainId: u
      });
      const f = (0, i.T)(t.account ?? c.accounts[0]);
      if ((f && (f.address = (0, s.K)(f.address)), t.account && !c.accounts.some(e => e.toLowerCase() === f.address.toLowerCase()))) throw new a.JK({
        address: f.address,
        connector: d
      });
      const h = e.chains.find(e => e.id === u), p = await c.connector.getProvider({
        chainId: u
      });
      return (0, r.e)({
        account: f,
        chain: h,
        name: "Connector Client",
        transport: e => (function (e, t = {}) {
          const {key: n = "custom", methods: r, name: i = "Custom Provider", retryDelay: s} = t;
          return ({retryCount: a}) => (0, o.q)({
            key: n,
            methods: r,
            name: i,
            request: e.request.bind(e),
            retryCount: t.retryCount ?? a,
            retryDelay: s,
            type: "custom"
          });
        })(p)({
          ...e,
          retryCount: 0
        })
      });
    }
  },
  31327: function (e, t, n) {
    "use strict";
    n.d(t, {
      l: function () {
        return u;
      }
    });
    var r = n(19775), o = n(65704), i = n(59455);
    async function s(e, {account: t = e.account, message: n}) {
      if (!t) throw new o.o({
        docsPath: "/docs/actions/wallet/signMessage"
      });
      const s = (0, r.T)(t);
      if (s.signMessage) return s.signMessage({
        message: n
      });
      const a = "string" === typeof n ? (0, i.$G)(n) : n.raw instanceof Uint8Array ? (0, i.NC)(n.raw) : n.raw;
      return e.request({
        method: "personal_sign",
        params: [a, s.address]
      }, {
        retryCount: 0
      });
    }
    var a = n(44199), c = n(18849);
    async function u(e, t) {
      const {account: n, connector: r, ...o} = t;
      let i;
      i = "object" === typeof n && "local" === n.type ? e.getClient() : await (0, c.e)(e, {
        account: n,
        connector: r
      });
      return (0, a.s)(i, s, "signMessage")({
        ...o,
        ...n ? {
          account: n
        } : {}
      });
    }
  },
  55911: function (e, t, n) {
    "use strict";
    n.d(t, {
      u: function () {
        return i;
      }
    });
    var r = n(52123), o = n(24380);
    function i(e, t) {
      const {onChange: n} = t;
      return e.subscribe(() => (0, o.D)(e), n, {
        equalityFn(e, t) {
          const {connector: n, ...o} = e, {connector: i, ...s} = t;
          return (0, r.v)(o, s) && n?.id === i?.id && n?.uid === i?.uid;
        }
      });
    }
  },
  53738: function (e, t, n) {
    "use strict";
    function r(e) {
      return e;
    }
    n.d(t, {
      K: function () {
        return r;
      }
    });
  },
  81467: function (e, t, n) {
    "use strict";
    n.d(t, {
      L: function () {
        return d;
      }
    });
    var r = n(31669), o = n(77014), i = n(39504), s = n(49287), a = n(59455), c = n(13102), u = n(14478), l = n(53738);
    function d(e = {}) {
      const {shimDisconnect: t = !0, unstable_shimAsyncInject: n} = e;
      function p() {
        const t = e.target;
        if ("function" === typeof t) {
          const e = t();
          if (e) return e;
        }
        return "object" === typeof t ? t : "string" === typeof t ? {
          ...f[t] ?? ({
            id: t,
            name: `${t[0].toUpperCase()}${t.slice(1)}`,
            provider: `is${t[0].toUpperCase()}${t.slice(1)}`
          })
        } : {
          id: "injected",
          name: "Injected",
          provider: e => e?.ethereum
        };
      }
      let m, b, y, g;
      return (0, l.K)(l => ({
        get icon() {
          return p().icon;
        },
        get id() {
          return p().id;
        },
        get name() {
          return p().name;
        },
        get supportsSimulation() {
          return !0;
        },
        type: d.type,
        async setup() {
          const t = await this.getProvider();
          t?.on && e.target && (y || (y = this.onConnect.bind(this), t.on("connect", y)), m || (m = this.onAccountsChanged.bind(this), t.on("accountsChanged", m)));
        },
        async connect({chainId: n, isReconnecting: i, withCapabilities: s} = {}) {
          const a = await this.getProvider();
          if (!a) throw new u.M();
          let c = [];
          if (i) c = await this.getAccounts().catch(() => []); else if (t) try {
            const e = await a.request({
              method: "wallet_requestPermissions",
              params: [{
                eth_accounts: {}
              }]
            });
            if ((c = e[0]?.caveats?.[0]?.value?.map(e => (0, r.K)(e)), c.length > 0)) {
              c = await this.getAccounts();
            }
          } catch (d) {
            const e = d;
            if (e.code === o.ab.code) throw new o.ab(e);
            if (e.code === o.pT.code) throw e;
          }
          try {
            if (!c?.length && !i) {
              c = (await a.request({
                method: "eth_requestAccounts"
              })).map(e => (0, r.K)(e));
            }
            (y && (a.removeListener("connect", y), y = void 0), m || (m = this.onAccountsChanged.bind(this), a.on("accountsChanged", m)), b || (b = this.onChainChanged.bind(this), a.on("chainChanged", b)), g || (g = this.onDisconnect.bind(this), a.on("disconnect", g)));
            let u = await this.getChainId();
            if (n && u !== n) {
              const e = await this.switchChain({
                chainId: n
              }).catch(e => {
                if (e.code === o.ab.code) throw e;
                return {
                  id: u
                };
              });
              u = e?.id ?? u;
            }
            return (t && await l.storage?.removeItem(`${this.id}.disconnected`), e.target || await l.storage?.setItem("injected.connected", !0), {
              accounts: s ? c.map(e => ({
                address: e,
                capabilities: {}
              })) : c,
              chainId: u
            });
          } catch (d) {
            const e = d;
            if (e.code === o.ab.code) throw new o.ab(e);
            if (e.code === o.pT.code) throw new o.pT(e);
            throw e;
          }
        },
        async disconnect() {
          const n = await this.getProvider();
          if (!n) throw new u.M();
          (b && (n.removeListener("chainChanged", b), b = void 0), g && (n.removeListener("disconnect", g), g = void 0), y || (y = this.onConnect.bind(this), n.on("connect", y)));
          try {
            await (0, i.F)(() => n.request({
              method: "wallet_revokePermissions",
              params: [{
                eth_accounts: {}
              }]
            }), {
              timeout: 100
            });
          } catch {}
          (t && await l.storage?.setItem(`${this.id}.disconnected`, !0), e.target || await l.storage?.removeItem("injected.connected"));
        },
        async getAccounts() {
          const e = await this.getProvider();
          if (!e) throw new u.M();
          return (await e.request({
            method: "eth_accounts"
          })).map(e => (0, r.K)(e));
        },
        async getChainId() {
          const e = await this.getProvider();
          if (!e) throw new u.M();
          const t = await e.request({
            method: "eth_chainId"
          });
          return Number(t);
        },
        async getProvider() {
          if ("undefined" === typeof window) return;
          let e;
          const t = p();
          return (e = "function" === typeof t.provider ? t.provider(window) : "string" === typeof t.provider ? h(window, t.provider) : t.provider, e && !e.removeListener && (("off" in e) && "function" === typeof e.off ? e.removeListener = e.off : e.removeListener = () => {}), e);
        },
        async isAuthorized() {
          try {
            if (t && await l.storage?.getItem(`${this.id}.disconnected`)) return !1;
            if (!e.target) {
              if (!await l.storage?.getItem("injected.connected")) return !1;
            }
            if (!await this.getProvider()) {
              if (void 0 !== n && !1 !== n) {
                const e = async () => {
                  "undefined" !== typeof window && window.removeEventListener("ethereum#initialized", e);
                  return !!await this.getProvider();
                }, t = "number" === typeof n ? n : 1000;
                if (await Promise.race([..."undefined" !== typeof window ? [new Promise(t => window.addEventListener("ethereum#initialized", () => t(e()), {
                  once: !0
                }))] : [], new Promise(n => setTimeout(() => n(e()), t))])) return !0;
              }
              throw new u.M();
            }
            return !!(await (0, s.J)(() => this.getAccounts())).length;
          } catch {
            return !1;
          }
        },
        async switchChain({addEthereumChainParameter: e, chainId: t}) {
          const n = await this.getProvider();
          if (!n) throw new u.M();
          const r = l.chains.find(e => e.id === t);
          if (!r) throw new o.x3(new c.X4());
          const i = new Promise(e => {
            const n = r => {
              ("chainId" in r) && r.chainId === t && (l.emitter.off("change", n), e());
            };
            l.emitter.on("change", n);
          });
          try {
            return (await Promise.all([n.request({
              method: "wallet_switchEthereumChain",
              params: [{
                chainId: (0, a.eC)(t)
              }]
            }).then(async () => {
              await this.getChainId() === t && l.emitter.emit("change", {
                chainId: t
              });
            }), i]), r);
          } catch (s) {
            const c = s;
            if (4902 === c.code || 4902 === c?.data?.originalError?.code) try {
              const {default: s, ...c} = r.blockExplorers ?? ({});
              let u, d;
              (e?.blockExplorerUrls ? u = e.blockExplorerUrls : s && (u = [s.url, ...Object.values(c).map(e => e.url)]), d = e?.rpcUrls?.length ? e.rpcUrls : [r.rpcUrls.default?.http[0] ?? ""]);
              const f = {
                blockExplorerUrls: u,
                chainId: (0, a.eC)(t),
                chainName: e?.chainName ?? r.name,
                iconUrls: e?.iconUrls,
                nativeCurrency: e?.nativeCurrency ?? r.nativeCurrency,
                rpcUrls: d
              };
              return (await Promise.all([n.request({
                method: "wallet_addEthereumChain",
                params: [f]
              }).then(async () => {
                if (await this.getChainId() !== t) throw new o.ab(new Error("User rejected switch after adding network."));
                l.emitter.emit("change", {
                  chainId: t
                });
              }), i]), r);
            } catch (d) {
              throw new o.ab(d);
            }
            if (c.code === o.ab.code) throw new o.ab(c);
            throw new o.x3(c);
          }
        },
        async onAccountsChanged(e) {
          if (0 === e.length) this.onDisconnect(); else if (l.emitter.listenerCount("connect")) {
            const e = (await this.getChainId()).toString();
            (this.onConnect({
              chainId: e
            }), t && await l.storage?.removeItem(`${this.id}.disconnected`));
          } else l.emitter.emit("change", {
            accounts: e.map(e => (0, r.K)(e))
          });
        },
        onChainChanged(e) {
          const t = Number(e);
          l.emitter.emit("change", {
            chainId: t
          });
        },
        async onConnect(e) {
          const t = await this.getAccounts();
          if (0 === t.length) return;
          const n = Number(e.chainId);
          l.emitter.emit("connect", {
            accounts: t,
            chainId: n
          });
          const r = await this.getProvider();
          r && (y && (r.removeListener("connect", y), y = void 0), m || (m = this.onAccountsChanged.bind(this), r.on("accountsChanged", m)), b || (b = this.onChainChanged.bind(this), r.on("chainChanged", b)), g || (g = this.onDisconnect.bind(this), r.on("disconnect", g)));
        },
        async onDisconnect(e) {
          const t = await this.getProvider();
          e && 1013 === e.code && t && (await this.getAccounts()).length || (l.emitter.emit("disconnect"), t && (b && (t.removeListener("chainChanged", b), b = void 0), g && (t.removeListener("disconnect", g), g = void 0), y || (y = this.onConnect.bind(this), t.on("connect", y))));
        }
      }));
    }
    d.type = "injected";
    const f = {
      coinbaseWallet: {
        id: "coinbaseWallet",
        name: "Coinbase Wallet",
        provider: e => e?.coinbaseWalletExtension ? e.coinbaseWalletExtension : h(e, "isCoinbaseWallet")
      },
      metaMask: {
        id: "metaMask",
        name: "MetaMask",
        provider: e => h(e, e => {
          if (!e.isMetaMask) return !1;
          if (e.isBraveWallet && !e._events && !e._state) return !1;
          const t = ["isApexWallet", "isAvalanche", "isBitKeep", "isBlockWallet", "isKuCoinWallet", "isMathWallet", "isOkxWallet", "isOKExWallet", "isOneInchIOSWallet", "isOneInchAndroidWallet", "isOpera", "isPhantom", "isPortal", "isRabby", "isTokenPocket", "isTokenary", "isUniswapWallet", "isZerion"];
          for (const n of t) if (e[n]) return !1;
          return !0;
        })
      },
      phantom: {
        id: "phantom",
        name: "Phantom",
        provider: e => e?.phantom?.ethereum ? e.phantom?.ethereum : h(e, "isPhantom")
      }
    };
    function h(e, t) {
      function n(e) {
        return "function" === typeof t ? t(e) : "string" !== typeof t || e[t];
      }
      const r = e.ethereum;
      return r?.providers ? r.providers.find(e => n(e)) : r && n(r) ? r : void 0;
    }
  },
  83509: function (e, t, n) {
    "use strict";
    function r() {
      const e = new Set();
      let t = [];
      const n = () => (function (e) {
        if ("undefined" === typeof window) return;
        const t = t => e(t.detail);
        return (window.addEventListener("eip6963:announceProvider", t), window.dispatchEvent(new CustomEvent("eip6963:requestProvider")), () => window.removeEventListener("eip6963:announceProvider", t));
      })(n => {
        t.some(({info: e}) => e.uuid === n.info.uuid) || (t = [...t, n], e.forEach(e => e(t, {
          added: [n]
        })));
      });
      let r = n();
      return {
        _listeners: () => e,
        clear() {
          (e.forEach(e => e([], {
            removed: [...t]
          })), t = []);
        },
        destroy() {
          (this.clear(), e.clear(), r?.());
        },
        findProvider: ({rdns: e}) => t.find(t => t.info.rdns === e),
        getProviders: () => t,
        reset() {
          (this.clear(), r?.(), r = n());
        },
        subscribe: (n, {emitImmediately: r} = {}) => (e.add(n), r && n(t, {
          added: t
        }), () => e.delete(n))
      };
    }
    n.d(t, {
      _: function () {
        return k;
      }
    });
    var o = n(82538);
    const i = e => (t, n, r) => {
      const o = r.subscribe;
      r.subscribe = (e, t, n) => {
        let i = e;
        if (t) {
          const o = (null == n ? void 0 : n.equalityFn) || Object.is;
          let s = e(r.getState());
          (i = n => {
            const r = e(n);
            if (!o(s, r)) {
              const e = s;
              t(s = r, e);
            }
          }, (null == n ? void 0 : n.fireImmediately) && t(s, s));
        }
        return o(i);
      };
      return e(t, n, r);
    };
    function s(e, t) {
      let n;
      try {
        n = e();
      } catch (r) {
        return;
      }
      return {
        getItem: e => {
          var r;
          const o = e => null === e ? null : JSON.parse(e, null == t ? void 0 : t.reviver), i = null != (r = n.getItem(e)) ? r : null;
          return i instanceof Promise ? i.then(o) : o(i);
        },
        setItem: (e, r) => n.setItem(e, JSON.stringify(r, null == t ? void 0 : t.replacer)),
        removeItem: e => n.removeItem(e)
      };
    }
    const a = e => t => {
      try {
        const n = e(t);
        return n instanceof Promise ? n : {
          then: e => a(e)(n),
          catch(e) {
            return this;
          }
        };
      } catch (n) {
        return {
          then(e) {
            return this;
          },
          catch: e => a(e)(n)
        };
      }
    }, c = (e, t) => (n, r, o) => {
      let i = {
        storage: s(() => localStorage),
        partialize: e => e,
        version: 0,
        merge: (e, t) => ({
          ...t,
          ...e
        }),
        ...t
      }, c = !1;
      const u = new Set(), l = new Set();
      let d = i.storage;
      if (!d) return e((...e) => {
        (console.warn(`[zustand persist middleware] Unable to update item '${i.name}', the given storage is currently unavailable.`), n(...e));
      }, r, o);
      const f = () => {
        const e = i.partialize({
          ...r()
        });
        return d.setItem(i.name, {
          state: e,
          version: i.version
        });
      }, h = o.setState;
      o.setState = (e, t) => {
        (h(e, t), f());
      };
      const p = e((...e) => {
        (n(...e), f());
      }, r, o);
      let m;
      o.getInitialState = () => p;
      const b = () => {
        var e, t;
        if (!d) return;
        (c = !1, u.forEach(e => {
          var t;
          return e(null != (t = r()) ? t : p);
        }));
        const o = (null == (t = i.onRehydrateStorage) ? void 0 : t.call(i, null != (e = r()) ? e : p)) || void 0;
        return a(d.getItem.bind(d))(i.name).then(e => {
          if (e) {
            if ("number" !== typeof e.version || e.version === i.version) return [!1, e.state];
            if (i.migrate) return [!0, i.migrate(e.state, e.version)];
            console.error("State loaded from storage couldn't be migrated since no migrate function was provided");
          }
          return [!1, void 0];
        }).then(e => {
          var t;
          const [o, s] = e;
          if ((m = i.merge(s, null != (t = r()) ? t : p), n(m, !0), o)) return f();
        }).then(() => {
          (null == o || o(m, void 0), m = r(), c = !0, l.forEach(e => e(m)));
        }).catch(e => {
          null == o || o(void 0, e);
        });
      };
      return (o.persist = {
        setOptions: e => {
          (i = {
            ...i,
            ...e
          }, e.storage && (d = e.storage));
        },
        clearStorage: () => {
          null == d || d.removeItem(i.name);
        },
        getOptions: () => i,
        rehydrate: () => b(),
        hasHydrated: () => c,
        onHydrate: e => (u.add(e), () => {
          u.delete(e);
        }),
        onFinishHydration: e => (l.add(e), () => {
          l.delete(e);
        })
      }, i.skipHydration || b(), m || p);
    }, u = e => {
      let t;
      const n = new Set(), r = (e, r) => {
        const o = "function" === typeof e ? e(t) : e;
        if (!Object.is(o, t)) {
          const e = t;
          (t = (null != r ? r : "object" !== typeof o || null === o) ? o : Object.assign({}, t, o), n.forEach(n => n(t, e)));
        }
      }, o = () => t, i = {
        setState: r,
        getState: o,
        getInitialState: () => s,
        subscribe: e => (n.add(e), () => n.delete(e))
      }, s = t = e(r, o, i);
      return i;
    }, l = e => e ? u(e) : u;
    var d = n(81467), f = n(87336);
    class h {
      constructor(e) {
        (Object.defineProperty(this, "uid", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: e
        }), Object.defineProperty(this, "_emitter", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: new f.v()
        }));
      }
      on(e, t) {
        this._emitter.on(e, t);
      }
      once(e, t) {
        this._emitter.once(e, t);
      }
      off(e, t) {
        this._emitter.off(e, t);
      }
      emit(e, ...t) {
        const n = t[0];
        this._emitter.emit(e, {
          uid: this.uid,
          ...n
        });
      }
      listenerCount(e) {
        return this._emitter.listenerCount(e);
      }
    }
    function p(e, t) {
      return JSON.parse(e, (e, n) => {
        let r = n;
        return ("bigint" === r?.__type && (r = BigInt(r.value)), "Map" === r?.__type && (r = new Map(r.value)), t?.(e, r) ?? r);
      });
    }
    function m(e, t) {
      return e.slice(0, t).join(".") || ".";
    }
    function b(e, t) {
      const {length: n} = e;
      for (let r = 0; r < n; ++r) if (e[r] === t) return r + 1;
      return 0;
    }
    function y(e, t, n, r) {
      return JSON.stringify(e, (function (e, t) {
        const n = "function" === typeof e, r = "function" === typeof t, o = [], i = [];
        return function (s, a) {
          if ("object" === typeof a) if (o.length) {
            const e = b(o, this);
            (0 === e ? o[o.length] = this : (o.splice(e), i.splice(e)), i[i.length] = s);
            const n = b(o, a);
            if (0 !== n) return r ? t.call(this, s, a, m(i, n)) : `[ref=${m(i, n)}]`;
          } else (o[0] = a, i[0] = s);
          return n ? e.call(this, s, a) : a;
        };
      })((e, n) => {
        let r = n;
        return ("bigint" === typeof r && (r = {
          __type: "bigint",
          value: n.toString()
        }), r instanceof Map && (r = {
          __type: "Map",
          value: Array.from(n.entries())
        }), t?.(e, r) ?? r);
      }, r), n ?? void 0);
    }
    function g(e) {
      const {deserialize: t = p, key: n = "wagmi", serialize: r = y, storage: o = w} = e;
      function i(e) {
        return e instanceof Promise ? e.then(e => e).catch(() => null) : e;
      }
      return {
        ...o,
        key: n,
        async getItem(e, r) {
          const s = o.getItem(`${n}.${e}`), a = await i(s);
          return a ? t(a) ?? null : r ?? null;
        },
        async setItem(e, t) {
          const s = `${n}.${e}`;
          null === t ? await i(o.removeItem(s)) : await i(o.setItem(s, r(t)));
        },
        async removeItem(e) {
          await i(o.removeItem(`${n}.${e}`));
        }
      };
    }
    const w = {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {}
    };
    function v() {
      const e = "undefined" !== typeof window && window.localStorage ? window.localStorage : w;
      return {
        getItem: t => e.getItem(t),
        removeItem(t) {
          e.removeItem(t);
        },
        setItem(t, n) {
          try {
            e.setItem(t, n);
          } catch {}
        }
      };
    }
    var A = n(13102);
    const x = 256;
    let C, P = x;
    var E = n(19676);
    function k(e) {
      const {multiInjectedProviderDiscovery: t = !0, storage: n = g({
        storage: v()
      }), syncConnectedChain: s = !0, ssr: a = !1, ...u} = e, f = "undefined" !== typeof window && t ? r() : void 0, p = l(() => u.chains), m = l(() => {
        const e = [], t = new Set();
        for (const n of u.connectors ?? []) {
          const r = b(n);
          if ((e.push(r), !a && r.rdns)) {
            const e = "string" === typeof r.rdns ? [r.rdns] : r.rdns;
            for (const n of e) t.add(n);
          }
        }
        if (!a && f) {
          const n = f.getProviders();
          for (const r of n) t.has(r.info.rdns) || e.push(b(y(r)));
        }
        return e;
      });
      function b(e) {
        const t = (function (e) {
          return new h(e);
        })((function (e = 11) {
          if (!C || P + e > 2 * x) {
            (C = "", P = 0);
            for (let e = 0; e < x; e++) C += (256 + 256 * Math.random() | 0).toString(16).substring(1);
          }
          return C.substring(P, P++ + e);
        })()), r = {
          ...e({
            emitter: t,
            chains: p.getState(),
            storage: n,
            transports: u.transports
          }),
          emitter: t,
          uid: t.uid
        };
        return (t.on("connect", T), r.setup?.(), r);
      }
      function y(e) {
        const {info: t} = e, n = e.provider;
        return (0, d.L)({
          target: {
            ...t,
            id: t.rdns,
            provider: n
          }
        });
      }
      const w = new Map();
      function k() {
        return {
          chainId: p.getState()[0].id,
          connections: new Map(),
          current: null,
          status: "disconnected"
        };
      }
      let I;
      const B = "0.0.0-canary-";
      I = E.i.startsWith(B) ? Number.parseInt(E.i.replace(B, ""), 10) : Number.parseInt(E.i.split(".")[0] ?? "0", 10);
      const S = l(i(n ? c(k, {
        migrate(e, t) {
          if (t === I) return e;
          const n = k(), r = O(e, n.chainId);
          return {
            ...n,
            chainId: r
          };
        },
        name: "store",
        partialize: e => ({
          connections: {
            __type: "Map",
            value: Array.from(e.connections.entries()).map(([e, t]) => {
              const {id: n, name: r, type: o, uid: i} = t.connector, s = {
                id: n,
                name: r,
                type: o,
                uid: i
              };
              return [e, {
                ...t,
                connector: s
              }];
            })
          },
          chainId: e.chainId,
          current: e.current
        }),
        merge(e, t) {
          "object" === typeof e && e && ("status" in e) && delete e.status;
          const n = O(e, t.chainId);
          return {
            ...t,
            ...e,
            chainId: n
          };
        },
        skipHydration: a,
        storage: n,
        version: I
      }) : k));
      function O(e, t) {
        return e && "object" === typeof e && ("chainId" in e) && "number" === typeof e.chainId && p.getState().some(t => t.id === e.chainId) ? e.chainId : t;
      }
      function M(e) {
        S.setState(t => {
          const n = t.connections.get(e.uid);
          return n ? {
            ...t,
            connections: new Map(t.connections).set(e.uid, {
              accounts: e.accounts ?? n.accounts,
              chainId: e.chainId ?? n.chainId,
              connector: n.connector
            })
          } : t;
        });
      }
      function T(e) {
        "connecting" !== S.getState().status && "reconnecting" !== S.getState().status && S.setState(t => {
          const n = m.getState().find(t => t.uid === e.uid);
          return n ? (n.emitter.listenerCount("connect") && n.emitter.off("connect", M), n.emitter.listenerCount("change") || n.emitter.on("change", M), n.emitter.listenerCount("disconnect") || n.emitter.on("disconnect", N), {
            ...t,
            connections: new Map(t.connections).set(e.uid, {
              accounts: e.accounts,
              chainId: e.chainId,
              connector: n
            }),
            current: e.uid,
            status: "connected"
          }) : t;
        });
      }
      function N(e) {
        S.setState(t => {
          const n = t.connections.get(e.uid);
          if (n) {
            const e = n.connector;
            (e.emitter.listenerCount("change") && n.connector.emitter.off("change", M), e.emitter.listenerCount("disconnect") && n.connector.emitter.off("disconnect", N), e.emitter.listenerCount("connect") || n.connector.emitter.on("connect", T));
          }
          if ((t.connections.delete(e.uid), 0 === t.connections.size)) return {
            ...t,
            connections: new Map(),
            current: null,
            status: "disconnected"
          };
          const r = t.connections.values().next().value;
          return {
            ...t,
            connections: new Map(t.connections),
            current: r.connector.uid
          };
        });
      }
      return (S.setState(k()), s && S.subscribe(({connections: e, current: t}) => t ? e.get(t)?.chainId : void 0, e => {
        if (p.getState().some(t => t.id === e)) return S.setState(t => ({
          ...t,
          chainId: e ?? t.chainId
        }));
      }), f?.subscribe(e => {
        const t = new Set(), r = new Set();
        for (const n of m.getState()) if ((t.add(n.id), n.rdns)) {
          const e = "string" === typeof n.rdns ? [n.rdns] : n.rdns;
          for (const t of e) r.add(t);
        }
        const o = [];
        for (const n of e) {
          if (r.has(n.info.rdns)) continue;
          const e = b(y(n));
          t.has(e.id) || o.push(e);
        }
        n && !S.persist.hasHydrated() || m.setState(e => [...e, ...o], !0);
      }), {
        get chains() {
          return p.getState();
        },
        get connectors() {
          return m.getState();
        },
        storage: n,
        getClient: function (e = {}) {
          const t = e.chainId ?? S.getState().chainId, n = p.getState().find(e => e.id === t);
          if (e.chainId && !n) throw new A.X4();
          {
            const e = w.get(S.getState().chainId);
            if (e && !n) return e;
            if (!n) throw new A.X4();
          }
          {
            const e = w.get(t);
            if (e) return e;
          }
          let r;
          if (u.client) r = u.client({
            chain: n
          }); else {
            const e = n.id, t = p.getState().map(e => e.id), i = {}, s = Object.entries(u);
            for (const [n, r] of s) if ("chains" !== n && "client" !== n && "connectors" !== n && "transports" !== n) if ("object" === typeof r) if ((e in r)) i[n] = r[e]; else {
              if (t.some(e => (e in r))) continue;
              i[n] = r;
            } else i[n] = r;
            r = (0, o.e)({
              ...i,
              chain: n,
              batch: i.batch ?? ({
                multicall: !0
              }),
              transport: t => u.transports[e]({
                ...t,
                connectors: m
              })
            });
          }
          return (w.set(t, r), r);
        },
        get state() {
          return S.getState();
        },
        setState(e) {
          let t;
          t = "function" === typeof e ? e(S.getState()) : e;
          const n = k();
          "object" !== typeof t && (t = n);
          (Object.keys(n).some(e => !((e in t))) && (t = n), S.setState(t, !0));
        },
        subscribe: (e, t, n) => S.subscribe(e, t, n ? {
          ...n,
          fireImmediately: n.emitImmediately
        } : void 0),
        _internal: {
          mipd: f,
          async revalidate() {
            const e = S.getState(), t = e.connections;
            let n = e.current;
            for (const [, r] of t) {
              const e = r.connector;
              !!e.isAuthorized && await e.isAuthorized() || (t.delete(e.uid), n === e.uid && (n = null));
            }
            S.setState(e => ({
              ...e,
              connections: t,
              current: n
            }));
          },
          store: S,
          ssr: Boolean(a),
          syncConnectedChain: s,
          transports: u.transports,
          chains: {
            setState(e) {
              const t = "function" === typeof e ? e(p.getState()) : e;
              if (0 !== t.length) return p.setState(t, !0);
            },
            subscribe: e => p.subscribe(e)
          },
          connectors: {
            providerDetailToConnector: y,
            setup: b,
            setState: e => m.setState("function" === typeof e ? e(m.getState()) : e, !0),
            subscribe: e => m.subscribe(e)
          },
          events: {
            change: M,
            connect: T,
            disconnect: N
          }
        }
      });
    }
  },
  26129: function (e, t, n) {
    "use strict";
    n.d(t, {
      G: function () {
        return a;
      }
    });
    var r = n(19676);
    var o, i, s = function (e, t, n, r) {
      if ("a" === n && !r) throw new TypeError("Private accessor was defined without a getter");
      if ("function" === typeof t ? e !== t || !r : !t.has(e)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return "m" === n ? r : "a" === n ? r.call(e) : r ? r.value : t.get(e);
    };
    class a extends Error {
      get docsBaseUrl() {
        return "https://wagmi.sh/core";
      }
      get version() {
        return `@wagmi/core@${r.i}`;
      }
      constructor(e, t = {}) {
        (super(), o.add(this), Object.defineProperty(this, "details", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), Object.defineProperty(this, "docsPath", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), Object.defineProperty(this, "metaMessages", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), Object.defineProperty(this, "shortMessage", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "WagmiCoreError"
        }));
        const n = t.cause instanceof a ? t.cause.details : t.cause?.message ? t.cause.message : t.details, r = t.cause instanceof a && t.cause.docsPath || t.docsPath;
        (this.message = [e || "An error occurred.", "", ...t.metaMessages ? [...t.metaMessages, ""] : [], ...r ? [`Docs: ${this.docsBaseUrl}${r}.html${t.docsSlug ? `#${t.docsSlug}` : ""}`] : [], ...n ? [`Details: ${n}`] : [], `Version: ${this.version}`].join("\n"), t.cause && (this.cause = t.cause), this.details = n, this.docsPath = r, this.metaMessages = t.metaMessages, this.shortMessage = e);
      }
      walk(e) {
        return s(this, o, "m", i).call(this, this, e);
      }
    }
    (o = new WeakSet(), i = function e(t, n) {
      return n?.(t) ? t : t.cause ? s(this, o, "m", e).call(this, t.cause, n) : t;
    });
  },
  13102: function (e, t, n) {
    "use strict";
    n.d(t, {
      $S: function () {
        return u;
      },
      JK: function () {
        return a;
      },
      X4: function () {
        return o;
      },
      XZ: function () {
        return c;
      },
      aH: function () {
        return s;
      },
      wi: function () {
        return i;
      }
    });
    var r = n(26129);
    class o extends r.G {
      constructor() {
        (super("Chain not configured."), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "ChainNotConfiguredError"
        }));
      }
    }
    class i extends r.G {
      constructor() {
        (super("Connector already connected."), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "ConnectorAlreadyConnectedError"
        }));
      }
    }
    class s extends r.G {
      constructor() {
        (super("Connector not connected."), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "ConnectorNotConnectedError"
        }));
      }
    }
    r.G;
    class a extends r.G {
      constructor({address: e, connector: t}) {
        (super(`Account "${e}" not found for connector "${t.name}".`), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "ConnectorAccountNotFoundError"
        }));
      }
    }
    class c extends r.G {
      constructor({connectionChainId: e, connectorChainId: t}) {
        (super(`The current chain of the connector (id: ${t}) does not match the connection's chain (id: ${e}).`, {
          metaMessages: [`Current Chain ID:  ${t}`, `Expected Chain ID: ${e}`]
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "ConnectorChainMismatchError"
        }));
      }
    }
    class u extends r.G {
      constructor({connector: e}) {
        (super(`Connector "${e.name}" unavailable while reconnecting.`, {
          details: ["During the reconnection step, the only connector methods guaranteed to be available are: `id`, `name`, `type`, `uid`.", "All other methods are not guaranteed to be available until reconnection completes and connectors are fully restored.", "This error commonly occurs for connectors that asynchronously inject after reconnection has already started."].join(" ")
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "ConnectorUnavailableReconnectingError"
        }));
      }
    }
  },
  14478: function (e, t, n) {
    "use strict";
    n.d(t, {
      M: function () {
        return o;
      },
      O: function () {
        return i;
      }
    });
    var r = n(26129);
    class o extends r.G {
      constructor() {
        (super("Provider not found."), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "ProviderNotFoundError"
        }));
      }
    }
    class i extends r.G {
      constructor({connector: e}) {
        (super(`"${e.name}" does not support programmatic chain switching.`), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "SwitchChainNotSupportedError"
        }));
      }
    }
  },
  27534: function (e, t, n) {
    "use strict";
    function r(e) {
      return JSON.stringify(e, (e, t) => (function (e) {
        if (!o(e)) return !1;
        const t = e.constructor;
        if ("undefined" === typeof t) return !0;
        const n = t.prototype;
        return !!o(n) && !!n.hasOwnProperty("isPrototypeOf");
      })(t) ? Object.keys(t).sort().reduce((e, n) => (e[n] = t[n], e), {}) : "bigint" === typeof t ? t.toString() : t);
    }
    function o(e) {
      return "[object Object]" === Object.prototype.toString.call(e);
    }
    function i(e) {
      const {_defaulted: t, behavior: n, gcTime: r, initialData: o, initialDataUpdatedAt: i, maxPages: s, meta: a, networkMode: c, queryFn: u, queryHash: l, queryKey: d, queryKeyHashFn: f, retry: h, retryDelay: p, structuralSharing: m, getPreviousPageParam: b, getNextPageParam: y, initialPageParam: g, _optimisticResults: w, enabled: v, notifyOnChangeProps: A, placeholderData: x, refetchInterval: C, refetchIntervalInBackground: P, refetchOnMount: E, refetchOnReconnect: k, refetchOnWindowFocus: I, retryOnMount: B, select: S, staleTime: O, suspense: M, throwOnError: T, config: N, connector: R, query: F, ...j} = e;
      return j;
    }
    n.d(t, {
      OP: function () {
        return i;
      },
      kq: function () {
        return r;
      }
    });
  },
  52123: function (e, t, n) {
    "use strict";
    function r(e, t) {
      if (e === t) return !0;
      if (e && t && "object" === typeof e && "object" === typeof t) {
        if (e.constructor !== t.constructor) return !1;
        let n, o;
        if (Array.isArray(e) && Array.isArray(t)) {
          if ((n = e.length, n !== t.length)) return !1;
          for (o = n; 0 !== o--; ) if (!r(e[o], t[o])) return !1;
          return !0;
        }
        if ("function" === typeof e.valueOf && e.valueOf !== Object.prototype.valueOf) return e.valueOf() === t.valueOf();
        if ("function" === typeof e.toString && e.toString !== Object.prototype.toString) return e.toString() === t.toString();
        const i = Object.keys(e);
        if ((n = i.length, n !== Object.keys(t).length)) return !1;
        for (o = n; 0 !== o--; ) if (!Object.hasOwn(t, i[o])) return !1;
        for (o = n; 0 !== o--; ) {
          const n = i[o];
          if (n && !r(e[n], t[n])) return !1;
        }
        return !0;
      }
      return e !== e && t !== t;
    }
    n.d(t, {
      v: function () {
        return r;
      }
    });
  },
  44199: function (e, t, n) {
    "use strict";
    function r(e, t, n) {
      const r = e[t.name];
      if ("function" === typeof r) return r;
      const o = e[n];
      return "function" === typeof o ? o : n => t(e, n);
    }
    n.d(t, {
      s: function () {
        return r;
      }
    });
  },
  19676: function (e, t, n) {
    "use strict";
    n.d(t, {
      i: function () {
        return r;
      }
    });
    const r = "2.22.0";
  },
  87336: function (e, t, n) {
    "use strict";
    n.d(t, {
      v: function () {
        return r;
      }
    });
    var r = n(77625);
  },
  5853: function (e, t, n) {
    "use strict";
    (n.r(t), n.d(t, {
      __addDisposableResource: function () {
        return F;
      },
      __assign: function () {
        return i;
      },
      __asyncDelegator: function () {
        return E;
      },
      __asyncGenerator: function () {
        return P;
      },
      __asyncValues: function () {
        return k;
      },
      __await: function () {
        return C;
      },
      __awaiter: function () {
        return p;
      },
      __classPrivateFieldGet: function () {
        return T;
      },
      __classPrivateFieldIn: function () {
        return R;
      },
      __classPrivateFieldSet: function () {
        return N;
      },
      __createBinding: function () {
        return b;
      },
      __decorate: function () {
        return a;
      },
      __disposeResources: function () {
        return U;
      },
      __esDecorate: function () {
        return u;
      },
      __exportStar: function () {
        return y;
      },
      __extends: function () {
        return o;
      },
      __generator: function () {
        return m;
      },
      __importDefault: function () {
        return M;
      },
      __importStar: function () {
        return O;
      },
      __makeTemplateObject: function () {
        return I;
      },
      __metadata: function () {
        return h;
      },
      __param: function () {
        return c;
      },
      __propKey: function () {
        return d;
      },
      __read: function () {
        return w;
      },
      __rest: function () {
        return s;
      },
      __rewriteRelativeImportExtension: function () {
        return D;
      },
      __runInitializers: function () {
        return l;
      },
      __setFunctionName: function () {
        return f;
      },
      __spread: function () {
        return v;
      },
      __spreadArray: function () {
        return x;
      },
      __spreadArrays: function () {
        return A;
      },
      __values: function () {
        return g;
      }
    }));
    var r = function (e, t) {
      return (r = Object.setPrototypeOf || ({
        __proto__: []
      }) instanceof Array && (function (e, t) {
        e.__proto__ = t;
      }) || (function (e, t) {
        for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
      }), r(e, t));
    };
    function o(e, t) {
      if ("function" !== typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
      function n() {
        this.constructor = e;
      }
      (r(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n()));
    }
    var i = function () {
      return (i = Object.assign || (function (e) {
        for (var t, n = 1, r = arguments.length; n < r; n++) for (var o in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
        return e;
      }), i.apply(this, arguments));
    };
    function s(e, t) {
      var n = {};
      for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
      if (null != e && "function" === typeof Object.getOwnPropertySymbols) {
        var o = 0;
        for (r = Object.getOwnPropertySymbols(e); o < r.length; o++) t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
      }
      return n;
    }
    function a(e, t, n, r) {
      var o, i = arguments.length, s = i < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) s = Reflect.decorate(e, t, n, r); else for (var a = e.length - 1; a >= 0; a--) (o = e[a]) && (s = (i < 3 ? o(s) : i > 3 ? o(t, n, s) : o(t, n)) || s);
      return (i > 3 && s && Object.defineProperty(t, n, s), s);
    }
    function c(e, t) {
      return function (n, r) {
        t(n, r, e);
      };
    }
    function u(e, t, n, r, o, i) {
      function s(e) {
        if (void 0 !== e && "function" !== typeof e) throw new TypeError("Function expected");
        return e;
      }
      for (var a, c = r.kind, u = "getter" === c ? "get" : "setter" === c ? "set" : "value", l = !t && e ? r.static ? e : e.prototype : null, d = t || (l ? Object.getOwnPropertyDescriptor(l, r.name) : {}), f = !1, h = n.length - 1; h >= 0; h--) {
        var p = {};
        for (var m in r) p[m] = "access" === m ? {} : r[m];
        for (var m in r.access) p.access[m] = r.access[m];
        p.addInitializer = function (e) {
          if (f) throw new TypeError("Cannot add initializers after decoration has completed");
          i.push(s(e || null));
        };
        var b = (0, n[h])("accessor" === c ? {
          get: d.get,
          set: d.set
        } : d[u], p);
        if ("accessor" === c) {
          if (void 0 === b) continue;
          if (null === b || "object" !== typeof b) throw new TypeError("Object expected");
          ((a = s(b.get)) && (d.get = a), (a = s(b.set)) && (d.set = a), (a = s(b.init)) && o.unshift(a));
        } else (a = s(b)) && ("field" === c ? o.unshift(a) : d[u] = a);
      }
      (l && Object.defineProperty(l, r.name, d), f = !0);
    }
    function l(e, t, n) {
      for (var r = arguments.length > 2, o = 0; o < t.length; o++) n = r ? t[o].call(e, n) : t[o].call(e);
      return r ? n : void 0;
    }
    function d(e) {
      return "symbol" === typeof e ? e : ("").concat(e);
    }
    function f(e, t, n) {
      return ("symbol" === typeof t && (t = t.description ? ("[").concat(t.description, "]") : ""), Object.defineProperty(e, "name", {
        configurable: !0,
        value: n ? ("").concat(n, " ", t) : t
      }));
    }
    function h(e, t) {
      if ("object" === typeof Reflect && "function" === typeof Reflect.metadata) return Reflect.metadata(e, t);
    }
    function p(e, t, n, r) {
      return new (n || (n = Promise))(function (o, i) {
        function s(e) {
          try {
            c(r.next(e));
          } catch (t) {
            i(t);
          }
        }
        function a(e) {
          try {
            c(r.throw(e));
          } catch (t) {
            i(t);
          }
        }
        function c(e) {
          var t;
          e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n(function (e) {
            e(t);
          })).then(s, a);
        }
        c((r = r.apply(e, t || [])).next());
      });
    }
    function m(e, t) {
      var n, r, o, i = {
        label: 0,
        sent: function () {
          if (1 & o[0]) throw o[1];
          return o[1];
        },
        trys: [],
        ops: []
      }, s = Object.create(("function" === typeof Iterator ? Iterator : Object).prototype);
      return (s.next = a(0), s.throw = a(1), s.return = a(2), "function" === typeof Symbol && (s[Symbol.iterator] = function () {
        return this;
      }), s);
      function a(a) {
        return function (c) {
          return (function (a) {
            if (n) throw new TypeError("Generator is already executing.");
            for (; (s && (s = 0, a[0] && (i = 0)), i); ) try {
              if ((n = 1, r && (o = 2 & a[0] ? r.return : a[0] ? r.throw || ((o = r.return) && o.call(r), 0) : r.next) && !(o = o.call(r, a[1])).done)) return o;
              switch ((r = 0, o && (a = [2 & a[0], o.value]), a[0])) {
                case 0:
                case 1:
                  o = a;
                  break;
                case 4:
                  return (i.label++, {
                    value: a[1],
                    done: !1
                  });
                case 5:
                  (i.label++, r = a[1], a = [0]);
                  continue;
                case 7:
                  (a = i.ops.pop(), i.trys.pop());
                  continue;
                default:
                  if (!(o = (o = i.trys).length > 0 && o[o.length - 1]) && (6 === a[0] || 2 === a[0])) {
                    i = 0;
                    continue;
                  }
                  if (3 === a[0] && (!o || a[1] > o[0] && a[1] < o[3])) {
                    i.label = a[1];
                    break;
                  }
                  if (6 === a[0] && i.label < o[1]) {
                    (i.label = o[1], o = a);
                    break;
                  }
                  if (o && i.label < o[2]) {
                    (i.label = o[2], i.ops.push(a));
                    break;
                  }
                  (o[2] && i.ops.pop(), i.trys.pop());
                  continue;
              }
              a = t.call(e, i);
            } catch (c) {
              (a = [6, c], r = 0);
            } finally {
              n = o = 0;
            }
            if (5 & a[0]) throw a[1];
            return {
              value: a[0] ? a[1] : void 0,
              done: !0
            };
          })([a, c]);
        };
      }
    }
    var b = Object.create ? function (e, t, n, r) {
      void 0 === r && (r = n);
      var o = Object.getOwnPropertyDescriptor(t, n);
      (o && !(("get" in o) ? !t.__esModule : o.writable || o.configurable) || (o = {
        enumerable: !0,
        get: function () {
          return t[n];
        }
      }), Object.defineProperty(e, r, o));
    } : function (e, t, n, r) {
      (void 0 === r && (r = n), e[r] = t[n]);
    };
    function y(e, t) {
      for (var n in e) "default" === n || Object.prototype.hasOwnProperty.call(t, n) || b(t, e, n);
    }
    function g(e) {
      var t = "function" === typeof Symbol && Symbol.iterator, n = t && e[t], r = 0;
      if (n) return n.call(e);
      if (e && "number" === typeof e.length) return {
        next: function () {
          return (e && r >= e.length && (e = void 0), {
            value: e && e[r++],
            done: !e
          });
        }
      };
      throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function w(e, t) {
      var n = "function" === typeof Symbol && e[Symbol.iterator];
      if (!n) return e;
      var r, o, i = n.call(e), s = [];
      try {
        for (; (void 0 === t || t-- > 0) && !(r = i.next()).done; ) s.push(r.value);
      } catch (a) {
        o = {
          error: a
        };
      } finally {
        try {
          r && !r.done && (n = i.return) && n.call(i);
        } finally {
          if (o) throw o.error;
        }
      }
      return s;
    }
    function v() {
      for (var e = [], t = 0; t < arguments.length; t++) e = e.concat(w(arguments[t]));
      return e;
    }
    function A() {
      for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
      var r = Array(e), o = 0;
      for (t = 0; t < n; t++) for (var i = arguments[t], s = 0, a = i.length; s < a; (s++, o++)) r[o] = i[s];
      return r;
    }
    function x(e, t, n) {
      if (n || 2 === arguments.length) for (var r, o = 0, i = t.length; o < i; o++) !r && (o in t) || (r || (r = Array.prototype.slice.call(t, 0, o)), r[o] = t[o]);
      return e.concat(r || Array.prototype.slice.call(t));
    }
    function C(e) {
      return this instanceof C ? (this.v = e, this) : new C(e);
    }
    function P(e, t, n) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var r, o = n.apply(e, t || []), i = [];
      return (r = Object.create(("function" === typeof AsyncIterator ? AsyncIterator : Object).prototype), s("next"), s("throw"), s("return", function (e) {
        return function (t) {
          return Promise.resolve(t).then(e, u);
        };
      }), r[Symbol.asyncIterator] = function () {
        return this;
      }, r);
      function s(e, t) {
        o[e] && (r[e] = function (t) {
          return new Promise(function (n, r) {
            i.push([e, t, n, r]) > 1 || a(e, t);
          });
        }, t && (r[e] = t(r[e])));
      }
      function a(e, t) {
        try {
          (n = o[e](t)).value instanceof C ? Promise.resolve(n.value.v).then(c, u) : l(i[0][2], n);
        } catch (r) {
          l(i[0][3], r);
        }
        var n;
      }
      function c(e) {
        a("next", e);
      }
      function u(e) {
        a("throw", e);
      }
      function l(e, t) {
        (e(t), i.shift(), i.length && a(i[0][0], i[0][1]));
      }
    }
    function E(e) {
      var t, n;
      return (t = {}, r("next"), r("throw", function (e) {
        throw e;
      }), r("return"), t[Symbol.iterator] = function () {
        return this;
      }, t);
      function r(r, o) {
        t[r] = e[r] ? function (t) {
          return (n = !n) ? {
            value: C(e[r](t)),
            done: !1
          } : o ? o(t) : t;
        } : o;
      }
    }
    function k(e) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var t, n = e[Symbol.asyncIterator];
      return n ? n.call(e) : (e = g(e), t = {}, r("next"), r("throw"), r("return"), t[Symbol.asyncIterator] = function () {
        return this;
      }, t);
      function r(n) {
        t[n] = e[n] && (function (t) {
          return new Promise(function (r, o) {
            (function (e, t, n, r) {
              Promise.resolve(r).then(function (t) {
                e({
                  value: t,
                  done: n
                });
              }, t);
            })(r, o, (t = e[n](t)).done, t.value);
          });
        });
      }
    }
    function I(e, t) {
      return (Object.defineProperty ? Object.defineProperty(e, "raw", {
        value: t
      }) : e.raw = t, e);
    }
    var B = Object.create ? function (e, t) {
      Object.defineProperty(e, "default", {
        enumerable: !0,
        value: t
      });
    } : function (e, t) {
      e.default = t;
    }, S = function (e) {
      return (S = Object.getOwnPropertyNames || (function (e) {
        var t = [];
        for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[t.length] = n);
        return t;
      }), S(e));
    };
    function O(e) {
      if (e && e.__esModule) return e;
      var t = {};
      if (null != e) for (var n = S(e), r = 0; r < n.length; r++) "default" !== n[r] && b(t, e, n[r]);
      return (B(t, e), t);
    }
    function M(e) {
      return e && e.__esModule ? e : {
        default: e
      };
    }
    function T(e, t, n, r) {
      if ("a" === n && !r) throw new TypeError("Private accessor was defined without a getter");
      if ("function" === typeof t ? e !== t || !r : !t.has(e)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return "m" === n ? r : "a" === n ? r.call(e) : r ? r.value : t.get(e);
    }
    function N(e, t, n, r, o) {
      if ("m" === r) throw new TypeError("Private method is not writable");
      if ("a" === r && !o) throw new TypeError("Private accessor was defined without a setter");
      if ("function" === typeof t ? e !== t || !o : !t.has(e)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return ("a" === r ? o.call(e, n) : o ? o.value = n : t.set(e, n), n);
    }
    function R(e, t) {
      if (null === t || "object" !== typeof t && "function" !== typeof t) throw new TypeError("Cannot use 'in' operator on non-object");
      return "function" === typeof e ? t === e : e.has(t);
    }
    function F(e, t, n) {
      if (null !== t && void 0 !== t) {
        if ("object" !== typeof t && "function" !== typeof t) throw new TypeError("Object expected.");
        var r, o;
        if (n) {
          if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
          r = t[Symbol.asyncDispose];
        }
        if (void 0 === r) {
          if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
          (r = t[Symbol.dispose], n && (o = r));
        }
        if ("function" !== typeof r) throw new TypeError("Object not disposable.");
        (o && (r = function () {
          try {
            o.call(this);
          } catch (e) {
            return Promise.reject(e);
          }
        }), e.stack.push({
          value: t,
          dispose: r,
          async: n
        }));
      } else n && e.stack.push({
        async: !0
      });
      return t;
    }
    var j = "function" === typeof SuppressedError ? SuppressedError : function (e, t, n) {
      var r = new Error(n);
      return (r.name = "SuppressedError", r.error = e, r.suppressed = t, r);
    };
    function U(e) {
      function t(t) {
        (e.error = e.hasError ? new j(t, e.error, "An error was suppressed during disposal.") : t, e.hasError = !0);
      }
      var n, r = 0;
      return (function o() {
        for (; n = e.stack.pop(); ) try {
          if (!n.async && 1 === r) return (r = 0, e.stack.push(n), Promise.resolve().then(o));
          if (n.dispose) {
            var i = n.dispose.call(n.value);
            if (n.async) return (r |= 2, Promise.resolve(i).then(o, function (e) {
              return (t(e), o());
            }));
          } else r |= 1;
        } catch (s) {
          t(s);
        }
        if (1 === r) return e.hasError ? Promise.reject(e.error) : Promise.resolve();
        if (e.hasError) throw e.error;
      })();
    }
    function D(e, t) {
      return "string" === typeof e && (/^\.\.?\//).test(e) ? e.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (e, n, r, o, i) {
        return n ? t ? ".jsx" : ".js" : !r || o && i ? r + o + "." + i.toLowerCase() + "js" : e;
      }) : e;
    }
    t.default = {
      __extends: o,
      __assign: i,
      __rest: s,
      __decorate: a,
      __param: c,
      __esDecorate: u,
      __runInitializers: l,
      __propKey: d,
      __setFunctionName: f,
      __metadata: h,
      __awaiter: p,
      __generator: m,
      __createBinding: b,
      __exportStar: y,
      __values: g,
      __read: w,
      __spread: v,
      __spreadArrays: A,
      __spreadArray: x,
      __await: C,
      __asyncGenerator: P,
      __asyncDelegator: E,
      __asyncValues: k,
      __makeTemplateObject: I,
      __importStar: O,
      __importDefault: M,
      __classPrivateFieldGet: T,
      __classPrivateFieldSet: N,
      __classPrivateFieldIn: R,
      __addDisposableResource: F,
      __disposeResources: U,
      __rewriteRelativeImportExtension: D
    };
  },
  19775: function (e, t, n) {
    "use strict";
    function r(e) {
      return "string" === typeof e ? {
        address: e,
        type: "json-rpc"
      } : e;
    }
    n.d(t, {
      T: function () {
        return r;
      }
    });
  },
  96698: function (e, t, n) {
    "use strict";
    n.d(t, {
      r: function () {
        return v;
      }
    });
    var r = n(28766), o = n(81544);
    class i extends o.G {
      constructor({data: e}) {
        super("Unable to extract image from metadata. The metadata may be malformed or invalid.", {
          metaMessages: ["- Metadata must be a JSON object with at least an `image`, `image_url` or `image_data` property.", "", `Provided data: ${JSON.stringify(e)}`],
          name: "EnsAvatarInvalidMetadataError"
        });
      }
    }
    class s extends o.G {
      constructor({reason: e}) {
        super(`ENS NFT avatar URI is invalid. ${e}`, {
          name: "EnsAvatarInvalidNftUriError"
        });
      }
    }
    class a extends o.G {
      constructor({uri: e}) {
        super(`Unable to resolve ENS avatar URI "${e}". The URI may be malformed, invalid, or does not respond with a valid image.`, {
          name: "EnsAvatarUriResolutionError"
        });
      }
    }
    class c extends o.G {
      constructor({namespace: e}) {
        super(`ENS NFT avatar namespace "${e}" is not supported. Must be "erc721" or "erc1155".`, {
          name: "EnsAvatarUnsupportedNamespaceError"
        });
      }
    }
    o.G;
    const u = /(?<protocol>https?:\/\/[^/]*|ipfs:\/|ipns:\/|ar:\/)?(?<root>\/)?(?<subpath>ipfs\/|ipns\/)?(?<target>[\w\-.]+)(?<subtarget>\/.*)?/, l = /^(Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,})(\/(?<target>[\w\-.]+))?(?<subtarget>\/.*)?$/, d = /^data:([a-zA-Z\-/+]*);base64,([^"].*)/, f = /^data:([a-zA-Z\-/+]*)?(;[a-zA-Z0-9].*?)?(,)/;
    function h(e, t) {
      return e ? e.endsWith("/") ? e.slice(0, -1) : e : t;
    }
    function p({uri: e, gatewayUrls: t}) {
      const n = d.test(e);
      if (n) return {
        uri: e,
        isOnChain: !0,
        isEncoded: n
      };
      const r = h(t?.ipfs, "https://ipfs.io"), o = h(t?.arweave, "https://arweave.net"), i = e.match(u), {protocol: s, subpath: c, target: p, subtarget: m = ""} = i?.groups || ({}), b = "ipns:/" === s || "ipns/" === c, y = "ipfs:/" === s || "ipfs/" === c || l.test(e);
      if (e.startsWith("http") && !b && !y) {
        let n = e;
        return (t?.arweave && (n = e.replace(/https:\/\/arweave.net/g, t?.arweave)), {
          uri: n,
          isOnChain: !1,
          isEncoded: !1
        });
      }
      if ((b || y) && p) return {
        uri: `${r}/${b ? "ipns" : "ipfs"}/${p}${m}`,
        isOnChain: !1,
        isEncoded: !1
      };
      if ("ar:/" === s && p) return {
        uri: `${o}/${p}${m || ""}`,
        isOnChain: !1,
        isEncoded: !1
      };
      let g = e.replace(f, "");
      if ((g.startsWith("<svg") && (g = `data:image/svg+xml;base64,${btoa(g)}`), g.startsWith("data:") || g.startsWith("{"))) return {
        uri: g,
        isOnChain: !0,
        isEncoded: !1
      };
      throw new a({
        uri: e
      });
    }
    function m(e) {
      if ("object" !== typeof e || !(("image" in e)) && !(("image_url" in e)) && !(("image_data" in e))) throw new i({
        data: e
      });
      return e.image || e.image_url || e.image_data;
    }
    async function b({gatewayUrls: e, uri: t}) {
      const {uri: n, isOnChain: r} = p({
        uri: t,
        gatewayUrls: e
      });
      if (r) return n;
      const o = await (async function (e) {
        try {
          const t = await fetch(e, {
            method: "HEAD"
          });
          if (200 === t.status) {
            const e = t.headers.get("content-type");
            return e?.startsWith("image/");
          }
          return !1;
        } catch (t) {
          return ("object" !== typeof t || "undefined" === typeof t.response) && !!Object.hasOwn(globalThis, "Image") && new Promise(t => {
            const n = new Image();
            (n.onload = () => {
              t(!0);
            }, n.onerror = () => {
              t(!1);
            }, n.src = e);
          });
        }
      })(n);
      if (o) return n;
      throw new a({
        uri: t
      });
    }
    async function y(e, {gatewayUrls: t, record: n}) {
      return (/eip155:/i).test(n) ? (async function (e, {gatewayUrls: t, record: n}) {
        const o = (function (e) {
          let t = e;
          t.startsWith("did:nft:") && (t = t.replace("did:nft:", "").replace(/_/g, "/"));
          const [n, r, o] = t.split("/"), [i, a] = n.split(":"), [c, u] = r.split(":");
          if (!i || "eip155" !== i.toLowerCase()) throw new s({
            reason: "Only EIP-155 supported"
          });
          if (!a) throw new s({
            reason: "Chain ID not found"
          });
          if (!u) throw new s({
            reason: "Contract address not found"
          });
          if (!o) throw new s({
            reason: "Token ID not found"
          });
          if (!c) throw new s({
            reason: "ERC namespace not found"
          });
          return {
            chainID: Number.parseInt(a, 10),
            namespace: c.toLowerCase(),
            contractAddress: u,
            tokenID: o
          };
        })(n), i = await (async function (e, {nft: t}) {
          if ("erc721" === t.namespace) return (0, r.L)(e, {
            address: t.contractAddress,
            abi: [{
              name: "tokenURI",
              type: "function",
              stateMutability: "view",
              inputs: [{
                name: "tokenId",
                type: "uint256"
              }],
              outputs: [{
                name: "",
                type: "string"
              }]
            }],
            functionName: "tokenURI",
            args: [BigInt(t.tokenID)]
          });
          if ("erc1155" === t.namespace) return (0, r.L)(e, {
            address: t.contractAddress,
            abi: [{
              name: "uri",
              type: "function",
              stateMutability: "view",
              inputs: [{
                name: "_id",
                type: "uint256"
              }],
              outputs: [{
                name: "",
                type: "string"
              }]
            }],
            functionName: "uri",
            args: [BigInt(t.tokenID)]
          });
          throw new c({
            namespace: t.namespace
          });
        })(e, {
          nft: o
        }), {uri: u, isOnChain: l, isEncoded: d} = p({
          uri: i,
          gatewayUrls: t
        });
        if (l && (u.includes("data:application/json;base64,") || u.startsWith("{"))) {
          const e = d ? atob(u.replace("data:application/json;base64,", "")) : u;
          return b({
            uri: m(JSON.parse(e)),
            gatewayUrls: t
          });
        }
        let f = o.tokenID;
        "erc1155" === o.namespace && (f = f.replace("0x", "").padStart(64, "0"));
        return (async function ({gatewayUrls: e, uri: t}) {
          try {
            const n = await fetch(t).then(e => e.json());
            return await b({
              gatewayUrls: e,
              uri: m(n)
            });
          } catch {
            throw new a({
              uri: t
            });
          }
        })({
          gatewayUrls: t,
          uri: u.replace(/(?:0x)?{id}/, f)
        });
      })(e, {
        gatewayUrls: t,
        record: n
      }) : b({
        uri: n,
        gatewayUrls: t
      });
    }
    var g = n(82645), w = n(99861);
    async function v(e, {blockNumber: t, blockTag: n, assetGatewayUrls: r, name: o, gatewayUrls: i, strict: s, universalResolverAddress: a}) {
      const c = await (0, g.s)(e, w.g, "getEnsText")({
        blockNumber: t,
        blockTag: n,
        key: "avatar",
        name: o,
        universalResolverAddress: a,
        gatewayUrls: i,
        strict: s
      });
      if (!c) return null;
      try {
        return await y(e, {
          record: c,
          gatewayUrls: r
        });
      } catch {
        return null;
      }
    }
  },
  72609: function (e, t, n) {
    "use strict";
    n.d(t, {
      w: function () {
        return u;
      }
    });
    var r = n(98158), o = n(93627), i = n(83348), s = n(7143), a = n(82645), c = n(28766);
    async function u(e, t) {
      const {address: n, blockNumber: u, blockTag: l, coinType: d = 60n, gatewayUrls: f, strict: h} = t, {chain: p} = e, m = (() => {
        if (t.universalResolverAddress) return t.universalResolverAddress;
        if (!p) throw new Error("client chain not configured. universalResolverAddress is required.");
        return (0, o.L)({
          blockNumber: u,
          chain: p,
          contract: "ensUniversalResolver"
        });
      })();
      try {
        const t = {
          address: m,
          abi: r.du,
          args: [n, d, f ?? [s.M]],
          functionName: "reverseWithGateways",
          blockNumber: u,
          blockTag: l
        }, o = (0, a.s)(e, c.L, "readContract"), [i] = await o(t);
        return i || null;
      } catch (b) {
        if (h) throw b;
        if ((0, i.c)(b)) return null;
        throw b;
      }
    }
  },
  99861: function (e, t, n) {
    "use strict";
    n.d(t, {
      g: function () {
        return p;
      }
    });
    var r = n(98158), o = n(65436), i = n(17283), s = n(93627), a = n(59455), c = n(83348), u = n(7143), l = n(21721), d = n(98707), f = n(82645), h = n(28766);
    async function p(e, t) {
      const {blockNumber: n, blockTag: p, key: m, name: b, gatewayUrls: y, strict: g} = t, {chain: w} = e, v = (() => {
        if (t.universalResolverAddress) return t.universalResolverAddress;
        if (!w) throw new Error("client chain not configured. universalResolverAddress is required.");
        return (0, s.L)({
          blockNumber: n,
          chain: w,
          contract: "ensUniversalResolver"
        });
      })(), A = w?.ensTlds;
      if (A && !A.some(e => b.endsWith(e))) return null;
      try {
        const t = {
          address: v,
          abi: r.k3,
          args: [(0, a.NC)((0, d.T)(b)), (0, i.R)({
            abi: r.nZ,
            functionName: "text",
            args: [(0, l.V)(b), m]
          }), y ?? [u.M]],
          functionName: "resolveWithGateways",
          blockNumber: n,
          blockTag: p
        }, s = (0, f.s)(e, h.L, "readContract"), c = await s(t);
        if ("0x" === c[0]) return null;
        const g = (0, o.k)({
          abi: r.nZ,
          functionName: "text",
          data: c[0]
        });
        return "" === g ? null : g;
      } catch (x) {
        if (g) throw x;
        if ((0, c.c)(x)) return null;
        throw x;
      }
    }
  },
  50550: function (e, t, n) {
    "use strict";
    n.d(t, {
      R: function () {
        return C;
      }
    });
    var r = n(43052), o = n(30497), i = n(19775), s = n(98158);
    const a = "0x82ad56cb";
    var c = n(45434), u = n(81544), l = n(35586), d = n(20010), f = n(65436), h = n(23010), p = n(17283), m = n(93627), b = n(59455), y = n(14015), g = n(70878), w = n(92614), v = n(43226), A = n(77911), x = n(62077);
    async function C(e, t) {
      const {account: C = e.account, authorizationList: E, batch: k = Boolean(e.batch?.multicall), blockNumber: I, blockTag: B = e.experimental_blockTag ?? "latest", accessList: S, blobs: O, blockOverrides: M, code: T, data: N, factory: R, factoryData: F, gas: j, gasPrice: U, maxFeePerBlobGas: D, maxFeePerGas: L, maxPriorityFeePerGas: z, nonce: q, to: G, value: Q, stateOverride: _, ...W} = t, $ = C ? (0, i.T)(C) : void 0;
      if (T && (R || F)) throw new u.G("Cannot provide both `code` & `factory`/`factoryData` as parameters.");
      if (T && G) throw new u.G("Cannot provide both `code` & `to` as parameters.");
      const H = T && N, K = R && F && G && N, V = H || K, J = H ? P({
        code: T,
        data: N
      }) : K ? (function (e) {
        const {data: t, factory: n, factoryData: o, to: i} = e;
        return (0, h.w)({
          abi: (0, r.V)(["constructor(address, bytes, address, bytes)"]),
          bytecode: c.pG,
          args: [i, t, n, o]
        });
      })({
        data: N,
        factory: R,
        factoryData: F,
        to: G
      }) : N;
      try {
        (0, x.F)(t);
        const n = ("bigint" === typeof I ? (0, b.eC)(I) : void 0) || B, r = M ? o.o(M) : void 0, i = (0, A.mF)(_), u = e.chain?.formatters?.transactionRequest?.format, h = (u || w.tG)({
          ...(0, g.K)(W, {
            format: u
          }),
          from: $?.address,
          accessList: S,
          authorizationList: E,
          blobs: O,
          data: J,
          gas: j,
          gasPrice: U,
          maxFeePerBlobGas: D,
          maxFeePerGas: L,
          maxPriorityFeePerGas: z,
          nonce: q,
          to: V ? void 0 : G,
          value: Q
        }, "call");
        if (k && (function ({request: e}) {
          const {data: t, to: n, ...r} = e;
          return !!t && (!t.startsWith(a) && (!!n && !(Object.values(r).filter(e => "undefined" !== typeof e).length > 0)));
        })({
          request: h
        }) && !i && !r) try {
          return await (async function (e, t) {
            const {batchSize: n = 1024, deployless: r = !1, wait: o = 0} = "object" === typeof e.batch?.multicall ? e.batch.multicall : {}, {blockNumber: i, blockTag: a = e.experimental_blockTag ?? "latest", data: u, to: h} = t, y = (() => {
              if (r) return null;
              if (t.multicallAddress) return t.multicallAddress;
              if (e.chain) return (0, m.L)({
                blockNumber: i,
                chain: e.chain,
                contract: "multicall3"
              });
              throw new l.pZ();
            })(), g = "bigint" === typeof i ? (0, b.eC)(i) : void 0, w = g || a, {schedule: A} = (0, v.S)({
              id: `${e.uid}.${w}`,
              wait: o,
              shouldSplitBatch(e) {
                const t = e.reduce((e, {data: t}) => e + (t.length - 2), 0);
                return t > 2 * n;
              },
              fn: async t => {
                const n = t.map(e => ({
                  allowFailure: !0,
                  callData: e.data,
                  target: e.to
                })), r = (0, p.R)({
                  abi: s.F8,
                  args: [n],
                  functionName: "aggregate3"
                }), o = await e.request({
                  method: "eth_call",
                  params: [{
                    ...null === y ? {
                      data: P({
                        code: c.xd,
                        data: r
                      })
                    } : {
                      to: y,
                      data: r
                    }
                  }, w]
                });
                return (0, f.k)({
                  abi: s.F8,
                  args: [n],
                  functionName: "aggregate3",
                  data: o || "0x"
                });
              }
            }), [{returnData: x, success: C}] = await A({
              data: u,
              to: h
            });
            if (!C) throw new d.VQ({
              data: x
            });
            return "0x" === x ? {
              data: void 0
            } : {
              data: x
            };
          })(e, {
            ...h,
            blockNumber: I,
            blockTag: B
          });
        } catch (Z) {
          if (!(Z instanceof l.pZ) && !(Z instanceof l.mm)) throw Z;
        }
        const y = (() => {
          const e = [h, n];
          return i && r ? [...e, i, r] : i ? [...e, i] : r ? [...e, {}, r] : e;
        })(), C = await e.request({
          method: "eth_call",
          params: y
        });
        return "0x" === C ? {
          data: void 0
        } : {
          data: C
        };
      } catch (Z) {
        const r = (function (e) {
          if (!(e instanceof u.G)) return;
          const t = e.walk();
          return "object" === typeof t?.data ? t.data?.data : t.data;
        })(Z), {offchainLookup: o, offchainLookupSignature: i} = await n.e(1735).then(n.bind(n, 71735));
        if (!1 !== e.ccipRead && r?.slice(0, 10) === i && G) return {
          data: await o(e, {
            data: r,
            to: G
          })
        };
        if (V && "0x101bb98d" === r?.slice(0, 10)) throw new d.Mo({
          factory: R
        });
        throw (0, y.P)(Z, {
          ...t,
          account: $,
          chain: e.chain
        });
      }
    }
    function P(e) {
      const {code: t, data: n} = e;
      return (0, h.w)({
        abi: (0, r.V)(["constructor(bytes, bytes)"]),
        bytecode: c.NO,
        args: [t, n]
      });
    }
  },
  6458: function (e, t, n) {
    "use strict";
    n.d(t, {
      C: function () {
        return u;
      },
      X: function () {
        return c;
      }
    });
    var r = n(4496), o = n(82645), i = n(96174), s = n(74587), a = n(25283);
    async function c(e, t) {
      return u(e, t);
    }
    async function u(e, t) {
      const {block: n, chain: c = e.chain, request: u, type: l = "eip1559"} = t || ({}), d = await (async () => "function" === typeof c?.fees?.baseFeeMultiplier ? c.fees.baseFeeMultiplier({
        block: n,
        client: e,
        request: u
      }) : c?.fees?.baseFeeMultiplier ?? 1.2)();
      if (d < 1) throw new r.Fz();
      const f = 10 ** (d.toString().split(".")[1]?.length ?? 0), h = e => e * BigInt(Math.ceil(d * f)) / BigInt(f), p = n || await (0, o.s)(e, s.Q, "getBlock")({});
      if ("function" === typeof c?.fees?.estimateFeesPerGas) {
        const t = await c.fees.estimateFeesPerGas({
          block: n,
          client: e,
          multiply: h,
          request: u,
          type: l
        });
        if (null !== t) return t;
      }
      if ("eip1559" === l) {
        if ("bigint" !== typeof p.baseFeePerGas) throw new r.e5();
        const t = "bigint" === typeof u?.maxPriorityFeePerGas ? u.maxPriorityFeePerGas : await (0, i.h)(e, {
          block: p,
          chain: c,
          request: u
        }), n = h(p.baseFeePerGas);
        return {
          maxFeePerGas: u?.maxFeePerGas ?? n + t,
          maxPriorityFeePerGas: t
        };
      }
      return {
        gasPrice: u?.gasPrice ?? h(await (0, o.s)(e, a.o, "getGasPrice")({}))
      };
    }
  },
  8741: function (e, t, n) {
    "use strict";
    n.d(t, {
      Q: function () {
        return g;
      }
    });
    var r = n(19775), o = n(81544), i = n(95048), s = n(59455), a = n(71282), c = n(29707), u = n(63228);
    class l extends o.G {
      constructor(e, {account: t, docsPath: n, chain: r, data: o, gas: i, gasPrice: s, maxFeePerGas: l, maxPriorityFeePerGas: d, nonce: f, to: h, value: p}) {
        const m = (0, u.xr)({
          from: t?.address,
          to: h,
          value: "undefined" !== typeof p && `${(0, a.d)(p)} ${r?.nativeCurrency?.symbol || "ETH"}`,
          data: o,
          gas: i,
          gasPrice: "undefined" !== typeof s && `${(0, c.o)(s)} gwei`,
          maxFeePerGas: "undefined" !== typeof l && `${(0, c.o)(l)} gwei`,
          maxPriorityFeePerGas: "undefined" !== typeof d && `${(0, c.o)(d)} gwei`,
          nonce: f
        });
        (super(e.shortMessage, {
          cause: e,
          docsPath: n,
          metaMessages: [...e.metaMessages ? [...e.metaMessages, " "] : [], "Estimate Gas Arguments:", m].filter(Boolean),
          name: "EstimateGasExecutionError"
        }), Object.defineProperty(this, "cause", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), this.cause = e);
      }
    }
    var d = n(78125), f = n(18856);
    var h = n(70878), p = n(92614), m = n(77911), b = n(62077), y = n(86048);
    async function g(e, t) {
      const {account: n = e.account} = t, a = n ? (0, r.T)(n) : void 0;
      try {
        const {accessList: n, authorizationList: r, blobs: c, blobVersionedHashes: u, blockNumber: l, blockTag: d, data: f, gas: g, gasPrice: w, maxFeePerBlobGas: v, maxFeePerGas: A, maxPriorityFeePerGas: x, nonce: C, value: P, stateOverride: E, ...k} = await (0, y.ZE)(e, {
          ...t,
          parameters: "local" === a?.type ? void 0 : ["blobVersionedHashes"]
        }), I = ("bigint" === typeof l ? (0, s.eC)(l) : void 0) || d, B = (0, m.mF)(E), S = await (async () => k.to ? k.to : r && r.length > 0 ? await (0, i.z)({
          authorization: r[0]
        }).catch(() => {
          throw new o.G("`to` is required. Could not infer from `authorizationList`");
        }) : void 0)();
        (0, b.F)(t);
        const O = e.chain?.formatters?.transactionRequest?.format, M = (O || p.tG)({
          ...(0, h.K)(k, {
            format: O
          }),
          from: a?.address,
          accessList: n,
          authorizationList: r,
          blobs: c,
          blobVersionedHashes: u,
          data: f,
          gas: g,
          gasPrice: w,
          maxFeePerBlobGas: v,
          maxFeePerGas: A,
          maxPriorityFeePerGas: x,
          nonce: C,
          to: S,
          value: P
        }, "estimateGas");
        return BigInt(await e.request({
          method: "eth_estimateGas",
          params: B ? [M, (I ?? e.experimental_blockTag) ?? "latest", B] : I ? [M, I] : [M]
        }));
      } catch (c) {
        throw (function (e, {docsPath: t, ...n}) {
          const r = (() => {
            const t = (0, f.k)(e, n);
            return t instanceof d.cj ? e : t;
          })();
          return new l(r, {
            docsPath: t,
            ...n
          });
        })(c, {
          ...t,
          account: a,
          chain: e.chain
        });
      }
    }
  },
  96174: function (e, t, n) {
    "use strict";
    n.d(t, {
      _: function () {
        return c;
      },
      h: function () {
        return u;
      }
    });
    var r = n(4496), o = n(72932), i = n(82645), s = n(74587), a = n(25283);
    async function c(e, t) {
      return u(e, t);
    }
    async function u(e, t) {
      const {block: n, chain: c = e.chain, request: u} = t || ({});
      try {
        const t = c?.fees?.maxPriorityFeePerGas ?? c?.fees?.defaultPriorityFee;
        if ("function" === typeof t) {
          const r = n || await (0, i.s)(e, s.Q, "getBlock")({}), o = await t({
            block: r,
            client: e,
            request: u
          });
          if (null === o) throw new Error();
          return o;
        }
        if ("undefined" !== typeof t) return t;
        const r = await e.request({
          method: "eth_maxPriorityFeePerGas"
        });
        return (0, o.y_)(r);
      } catch {
        const [t, o] = await Promise.all([n ? Promise.resolve(n) : (0, i.s)(e, s.Q, "getBlock")({}), (0, i.s)(e, a.o, "getGasPrice")({})]);
        if ("bigint" !== typeof t.baseFeePerGas) throw new r.e5();
        const c = o - t.baseFeePerGas;
        return c < 0n ? 0n : c;
      }
    }
  },
  32807: function (e, t, n) {
    "use strict";
    n.d(t, {
      s: function () {
        return o;
      }
    });
    var r = n(59455);
    async function o(e, {address: t, blockNumber: n, blockTag: o = e.experimental_blockTag ?? "latest"}) {
      const i = "bigint" === typeof n ? (0, r.eC)(n) : void 0, s = await e.request({
        method: "eth_getBalance",
        params: [t, i || o]
      });
      return BigInt(s);
    }
  },
  74587: function (e, t, n) {
    "use strict";
    n.d(t, {
      Q: function () {
        return s;
      }
    });
    var r = n(12197), o = n(59455), i = n(59069);
    async function s(e, {blockHash: t, blockNumber: n, blockTag: s = e.experimental_blockTag ?? "latest", includeTransactions: a} = {}) {
      const c = a ?? !1, u = void 0 !== n ? (0, o.eC)(n) : void 0;
      let l = null;
      if ((l = t ? await e.request({
        method: "eth_getBlockByHash",
        params: [t, c]
      }, {
        dedupe: !0
      }) : await e.request({
        method: "eth_getBlockByNumber",
        params: [u || s, c]
      }, {
        dedupe: Boolean(u)
      }), !l)) throw new r.f({
        blockHash: t,
        blockNumber: n
      });
      return (e.chain?.formatters?.block?.format || i.Z)(l, "getBlock");
    }
  },
  13708: function (e, t, n) {
    "use strict";
    n.d(t, {
      z: function () {
        return a;
      }
    });
    const r = new Map(), o = new Map();
    async function i(e, {cacheKey: t, cacheTime: n = Number.POSITIVE_INFINITY}) {
      const i = (function (e) {
        const t = (e, t) => ({
          clear: () => t.delete(e),
          get: () => t.get(e),
          set: n => t.set(e, n)
        }), n = t(e, r), i = t(e, o);
        return {
          clear: () => {
            (n.clear(), i.clear());
          },
          promise: n,
          response: i
        };
      })(t), s = i.response.get();
      if (s && n > 0) {
        if (Date.now() - s.created.getTime() < n) return s.data;
      }
      let a = i.promise.get();
      a || (a = e(), i.promise.set(a));
      try {
        const e = await a;
        return (i.response.set({
          created: new Date(),
          data: e
        }), e);
      } finally {
        i.promise.clear();
      }
    }
    const s = e => `blockNumber.${e}`;
    async function a(e, {cacheTime: t = e.cacheTime} = {}) {
      const n = await i(() => e.request({
        method: "eth_blockNumber"
      }), {
        cacheKey: s(e.uid),
        cacheTime: t
      });
      return BigInt(n);
    }
  },
  12363: function (e, t, n) {
    "use strict";
    n.d(t, {
      L: function () {
        return o;
      }
    });
    var r = n(72932);
    async function o(e) {
      const t = await e.request({
        method: "eth_chainId"
      }, {
        dedupe: !0
      });
      return (0, r.ly)(t);
    }
  },
  56570: function (e, t, n) {
    "use strict";
    n.d(t, {
      C: function () {
        return o;
      }
    });
    var r = n(59455);
    async function o(e, {address: t, blockNumber: n, blockTag: o = "latest"}) {
      const i = void 0 !== n ? (0, r.eC)(n) : void 0, s = await e.request({
        method: "eth_getCode",
        params: [t, i || o]
      }, {
        dedupe: Boolean(i)
      });
      if ("0x" !== s) return s;
    }
  },
  25283: function (e, t, n) {
    "use strict";
    async function r(e) {
      const t = await e.request({
        method: "eth_gasPrice"
      });
      return BigInt(t);
    }
    n.d(t, {
      o: function () {
        return r;
      }
    });
  },
  39277: function (e, t, n) {
    "use strict";
    n.d(t, {
      f: function () {
        return s;
      }
    });
    var r = n(63228), o = n(59455), i = n(27481);
    async function s(e, {blockHash: t, blockNumber: n, blockTag: s, hash: a, index: c}) {
      const u = s || "latest", l = void 0 !== n ? (0, o.eC)(n) : void 0;
      let d = null;
      if ((a ? d = await e.request({
        method: "eth_getTransactionByHash",
        params: [a]
      }, {
        dedupe: !0
      }) : t ? d = await e.request({
        method: "eth_getTransactionByBlockHashAndIndex",
        params: [t, (0, o.eC)(c)]
      }, {
        dedupe: !0
      }) : (l || u) && (d = await e.request({
        method: "eth_getTransactionByBlockNumberAndIndex",
        params: [l || u, (0, o.eC)(c)]
      }, {
        dedupe: Boolean(l)
      })), !d)) throw new r.Bh({
        blockHash: t,
        blockNumber: n,
        blockTag: u,
        hash: a,
        index: c
      });
      return (e.chain?.formatters?.transaction?.format || i.Tr)(d, "getTransaction");
    }
  },
  16689: function (e, t, n) {
    "use strict";
    n.d(t, {
      K: function () {
        return i;
      }
    });
    var r = n(72932), o = n(59455);
    async function i(e, {address: t, blockTag: n = "latest", blockNumber: i}) {
      const s = await e.request({
        method: "eth_getTransactionCount",
        params: [t, "bigint" === typeof i ? (0, o.eC)(i) : n]
      }, {
        dedupe: Boolean(i)
      });
      return (0, r.ly)(s);
    }
  },
  78526: function (e, t, n) {
    "use strict";
    n.d(t, {
      a: function () {
        return i;
      }
    });
    var r = n(63228), o = n(13550);
    async function i(e, {hash: t}) {
      const n = await e.request({
        method: "eth_getTransactionReceipt",
        params: [t]
      }, {
        dedupe: !0
      });
      if (!n) throw new r.Yb({
        hash: t
      });
      return (e.chain?.formatters?.transactionReceipt?.format || o.fA)(n, "getTransactionReceipt");
    }
  },
  94797: function (e, t, n) {
    "use strict";
    n.d(t, {
      A: function () {
        return p;
      }
    });
    var r = n(98158), o = n(45434), i = n(65531), s = n(81544), a = n(20010), c = n(65436), u = n(17283), l = n(93627), d = n(34180), f = n(82645), h = n(28766);
    async function p(e, t) {
      const {account: n, authorizationList: p, allowFailure: m = !0, blockNumber: b, blockOverrides: y, blockTag: g, stateOverride: w} = t, v = t.contracts, {batchSize: A = t.batchSize ?? 1024, deployless: x = t.deployless ?? !1} = "object" === typeof e.batch?.multicall ? e.batch.multicall : {}, C = (() => {
        if (t.multicallAddress) return t.multicallAddress;
        if (x) return null;
        if (e.chain) return (0, l.L)({
          blockNumber: b,
          chain: e.chain,
          contract: "multicall3"
        });
        throw new Error("client chain not configured. multicallAddress is required.");
      })(), P = [[]];
      let E = 0, k = 0;
      for (let r = 0; r < v.length; r++) {
        const {abi: e, address: t, args: o, functionName: i} = v[r];
        try {
          const n = (0, u.R)({
            abi: e,
            args: o,
            functionName: i
          });
          (k += (n.length - 2) / 2, A > 0 && k > A && P[E].length > 0 && (E++, k = (n.length - 2) / 2, P[E] = []), P[E] = [...P[E], {
            allowFailure: !0,
            callData: n,
            target: t
          }]);
        } catch (S) {
          const r = (0, d.S)(S, {
            abi: e,
            address: t,
            args: o,
            docsPath: "/docs/contract/multicall",
            functionName: i,
            sender: n
          });
          if (!m) throw r;
          P[E] = [...P[E], {
            allowFailure: !0,
            callData: "0x",
            target: t
          }];
        }
      }
      const I = await Promise.allSettled(P.map(t => (0, f.s)(e, h.L, "readContract")({
        ...null === C ? {
          code: o.xd
        } : {
          address: C
        },
        abi: r.F8,
        account: n,
        args: [t],
        authorizationList: p,
        blockNumber: b,
        blockOverrides: y,
        blockTag: g,
        functionName: "aggregate3",
        stateOverride: w
      }))), B = [];
      for (let r = 0; r < I.length; r++) {
        const e = I[r];
        if ("rejected" === e.status) {
          if (!m) throw e.reason;
          for (let t = 0; t < P[r].length; t++) B.push({
            status: "failure",
            error: e.reason,
            result: void 0
          });
          continue;
        }
        const t = e.value;
        for (let n = 0; n < t.length; n++) {
          const {returnData: e, success: o} = t[n], {callData: s} = P[r][n], {abi: u, address: l, functionName: f, args: h} = v[B.length];
          try {
            if ("0x" === s) throw new i.wb();
            if (!o) throw new a.VQ({
              data: e
            });
            const t = (0, c.k)({
              abi: u,
              args: h,
              data: e,
              functionName: f
            });
            B.push(m ? {
              result: t,
              status: "success"
            } : t);
          } catch (S) {
            const e = (0, d.S)(S, {
              abi: u,
              address: l,
              args: h,
              docsPath: "/docs/contract/multicall",
              functionName: f
            });
            if (!m) throw e;
            B.push({
              error: e,
              result: void 0,
              status: "failure"
            });
          }
        }
      }
      if (B.length !== v.length) throw new s.G("multicall results mismatch");
      return B;
    }
  },
  28766: function (e, t, n) {
    "use strict";
    n.d(t, {
      L: function () {
        return c;
      }
    });
    var r = n(65436), o = n(17283), i = n(34180), s = n(82645), a = n(50550);
    async function c(e, t) {
      const {abi: n, address: c, args: u, functionName: l, ...d} = t, f = (0, o.R)({
        abi: n,
        args: u,
        functionName: l
      });
      try {
        const {data: t} = await (0, s.s)(e, a.R, "call")({
          ...d,
          data: f,
          to: c
        });
        return (0, r.k)({
          abi: n,
          args: u,
          functionName: l,
          data: t || "0x"
        });
      } catch (h) {
        throw (0, i.S)(h, {
          abi: n,
          address: c,
          args: u,
          docsPath: "/docs/contract/readContract",
          functionName: l
        });
      }
    }
  },
  67348: function (e, t, n) {
    "use strict";
    n.d(t, {
      e: function () {
        return p;
      }
    });
    var r = n(12197), o = n(63228), i = n(82645), s = n(36478), a = n(56921), c = n(49287), u = n(31853), l = n(74587), d = n(39277), f = n(78526), h = n(99376);
    async function p(e, t) {
      const {checkReplacement: n = !0, confirmations: p = 1, hash: m, onReplaced: b, retryCount: y = 6, retryDelay: g = ({count: e}) => 200 * ~~(1 << e), timeout: w = 180000} = t, v = (0, u.P)(["waitForTransactionReceipt", e.uid, m]), A = t.pollingInterval ? t.pollingInterval : e.chain?.experimental_preconfirmationTime ? e.chain.experimental_preconfirmationTime : e.pollingInterval;
      let x, C, P, E, k, I = !1;
      const {promise: B, resolve: S, reject: O} = (0, a.n)(), M = w ? setTimeout(() => {
        (k?.(), E?.(), O(new o.mc({
          hash: m
        })));
      }, w) : void 0;
      return (E = (0, s.N7)(v, {
        onReplaced: b,
        resolve: S,
        reject: O
      }, async t => {
        if ((P = await (0, i.s)(e, f.a, "getTransactionReceipt")({
          hash: m
        }).catch(() => {}), P && p <= 1)) return (clearTimeout(M), t.resolve(P), void E?.());
        k = (0, i.s)(e, h.q, "watchBlockNumber")({
          emitMissed: !0,
          emitOnBegin: !0,
          poll: !0,
          pollingInterval: A,
          async onBlockNumber(s) {
            const a = e => {
              (clearTimeout(M), k?.(), e(), E?.());
            };
            let u = s;
            if (!I) try {
              if (P) {
                if (p > 1 && (!P.blockNumber || u - P.blockNumber + 1n < p)) return;
                return void a(() => t.resolve(P));
              }
              if ((n && !x && (I = !0, await (0, c.J)(async () => {
                (x = await (0, i.s)(e, d.f, "getTransaction")({
                  hash: m
                }), x.blockNumber && (u = x.blockNumber));
              }, {
                delay: g,
                retryCount: y
              }), I = !1), P = await (0, i.s)(e, f.a, "getTransactionReceipt")({
                hash: m
              }), p > 1 && (!P.blockNumber || u - P.blockNumber + 1n < p))) return;
              a(() => t.resolve(P));
            } catch (h) {
              if (h instanceof o.Bh || h instanceof o.Yb) {
                if (!x) return void (I = !1);
                try {
                  (C = x, I = !0);
                  const n = await (0, c.J)(() => (0, i.s)(e, l.Q, "getBlock")({
                    blockNumber: u,
                    includeTransactions: !0
                  }), {
                    delay: g,
                    retryCount: y,
                    shouldRetry: ({error: e}) => e instanceof r.f
                  });
                  I = !1;
                  const o = n.transactions.find(({from: e, nonce: t}) => e === C.from && t === C.nonce);
                  if (!o) return;
                  if ((P = await (0, i.s)(e, f.a, "getTransactionReceipt")({
                    hash: o.hash
                  }), p > 1 && (!P.blockNumber || u - P.blockNumber + 1n < p))) return;
                  let s = "replaced";
                  (o.to === C.to && o.value === C.value && o.input === C.input ? s = "repriced" : o.from === o.to && 0n === o.value && (s = "cancelled"), a(() => {
                    (t.onReplaced?.({
                      reason: s,
                      replacedTransaction: C,
                      transaction: o,
                      transactionReceipt: P
                    }), t.resolve(P));
                  }));
                } catch (b) {
                  a(() => t.reject(b));
                }
              } else a(() => t.reject(h));
            }
          }
        });
      }), B);
    }
  },
  99376: function (e, t, n) {
    "use strict";
    n.d(t, {
      q: function () {
        return u;
      }
    });
    var r = n(72932), o = n(82645), i = n(36478), s = n(41495), a = n(31853), c = n(13708);
    function u(e, {emitOnBegin: t = !1, emitMissed: n = !1, onBlockNumber: u, onError: l, poll: d, pollingInterval: f = e.pollingInterval}) {
      let h;
      return ("undefined" !== typeof d ? d : "webSocket" !== e.transport.type && "ipc" !== e.transport.type && ("fallback" !== e.transport.type || "webSocket" !== e.transport.transports[0].config.type && "ipc" !== e.transport.transports[0].config.type)) ? (() => {
        const r = (0, a.P)(["watchBlockNumber", e.uid, t, n, f]);
        return (0, i.N7)(r, {
          onBlockNumber: u,
          onError: l
        }, r => (0, s.$)(async () => {
          try {
            const t = await (0, o.s)(e, c.z, "getBlockNumber")({
              cacheTime: 0
            });
            if (void 0 !== h) {
              if (t === h) return;
              if (t - h > 1 && n) for (let e = h + 1n; e < t; e++) (r.onBlockNumber(e, h), h = e);
            }
            (void 0 === h || t > h) && (r.onBlockNumber(t, h), h = t);
          } catch (t) {
            r.onError?.(t);
          }
        }, {
          emitOnBegin: t,
          interval: f
        }));
      })() : (() => {
        const o = (0, a.P)(["watchBlockNumber", e.uid, t, n]);
        return (0, i.N7)(o, {
          onBlockNumber: u,
          onError: l
        }, t => {
          let n = !0, o = () => n = !1;
          return ((async () => {
            try {
              const i = (() => {
                if ("fallback" === e.transport.type) {
                  const t = e.transport.transports.find(e => "webSocket" === e.config.type || "ipc" === e.config.type);
                  return t ? t.value : e.transport;
                }
                return e.transport;
              })(), {unsubscribe: s} = await i.subscribe({
                params: ["newHeads"],
                onData(e) {
                  if (!n) return;
                  const o = (0, r.y_)(e.result?.number);
                  (t.onBlockNumber(o, h), h = o);
                },
                onError(e) {
                  t.onError?.(e);
                }
              });
              (o = s, n || o());
            } catch (i) {
              l?.(i);
            }
          })(), () => o());
        });
      })();
    }
  },
  86048: function (e, t, n) {
    "use strict";
    n.d(t, {
      QZ: function () {
        return O;
      },
      ZE: function () {
        return T;
      }
    });
    var r = n(19775), o = n(6458), i = n(8741), s = n(74587), a = n(16689), c = n(4496), u = n(44659), l = n(59455);
    function d(e) {
      const {kzg: t} = e, n = e.to ?? ("string" === typeof e.blobs[0] ? "hex" : "bytes"), r = "string" === typeof e.blobs[0] ? e.blobs.map(e => (0, u.nr)(e)) : e.blobs, o = [];
      for (const i of r) o.push(Uint8Array.from(t.blobToKzgCommitment(i)));
      return "bytes" === n ? o : o.map(e => (0, l.ci)(e));
    }
    function f(e) {
      const {kzg: t} = e, n = e.to ?? ("string" === typeof e.blobs[0] ? "hex" : "bytes"), r = "string" === typeof e.blobs[0] ? e.blobs.map(e => (0, u.nr)(e)) : e.blobs, o = "string" === typeof e.commitments[0] ? e.commitments.map(e => (0, u.nr)(e)) : e.commitments, i = [];
      for (let s = 0; s < r.length; s++) {
        const e = r[s], n = o[s];
        i.push(Uint8Array.from(t.computeBlobKzgProof(e, n)));
      }
      return "bytes" === n ? i : i.map(e => (0, l.ci)(e));
    }
    var h = n(29272), p = n(93610);
    function m(e) {
      const {commitment: t, version: n = 1} = e, r = e.to ?? ("string" === typeof t ? "hex" : "bytes"), o = (function (e, t) {
        const n = t || "hex", r = (0, h.JQ)((0, p.v)(e, {
          strict: !1
        }) ? (0, u.O0)(e) : e);
        return "bytes" === n ? r : (0, l.NC)(r);
      })(t, "bytes");
      return (o.set([n], 0), "bytes" === r ? o : (0, l.ci)(o));
    }
    const b = 32, y = 4096, g = b * y, w = 6 * g - 1 - 1 * y * 6;
    var v = n(81544);
    class A extends v.G {
      constructor({maxSize: e, size: t}) {
        super("Blob size is too large.", {
          metaMessages: [`Max: ${e} bytes`, `Given: ${t} bytes`],
          name: "BlobSizeTooLargeError"
        });
      }
    }
    class x extends v.G {
      constructor() {
        super("Blob data must not be empty.", {
          name: "EmptyBlobError"
        });
      }
    }
    v.G;
    v.G;
    var C = n(46033), P = n(20556);
    function E(e) {
      const {data: t, kzg: n, to: r} = e, o = e.blobs ?? (function (e) {
        const t = e.to ?? ("string" === typeof e.data ? "hex" : "bytes"), n = "string" === typeof e.data ? (0, u.nr)(e.data) : e.data, r = (0, P.d)(n);
        if (!r) throw new x();
        if (r > w) throw new A({
          maxSize: w,
          size: r
        });
        const o = [];
        let i = !0, s = 0;
        for (; i; ) {
          const e = (0, C.q)(new Uint8Array(g));
          let t = 0;
          for (; t < y; ) {
            const r = n.slice(s, s + (b - 1));
            if ((e.pushByte(0), e.pushBytes(r), r.length < 31)) {
              (e.pushByte(128), i = !1);
              break;
            }
            (t++, s += 31);
          }
          o.push(e);
        }
        return "bytes" === t ? o.map(e => e.bytes) : o.map(e => (0, l.ci)(e.bytes));
      })({
        data: t,
        to: r
      }), i = e.commitments ?? d({
        blobs: o,
        kzg: n,
        to: r
      }), s = e.proofs ?? f({
        blobs: o,
        commitments: i,
        kzg: n,
        to: r
      }), a = [];
      for (let c = 0; c < o.length; c++) a.push({
        blob: o[c],
        commitment: i[c],
        proof: s[c]
      });
      return a;
    }
    var k = n(82645), I = n(62077), B = n(63228);
    var S = n(12363);
    const O = ["blobVersionedHashes", "chainId", "fees", "gas", "nonce", "type"], M = new Map();
    async function T(e, t) {
      const {account: n = e.account, blobs: u, chain: l, gas: h, kzg: p, nonce: b, nonceManager: y, parameters: g = O, type: w} = t, v = n ? (0, r.T)(n) : n, A = {
        ...t,
        ...v ? {
          from: v?.address
        } : {}
      };
      let x, C;
      async function P() {
        return x || (x = await (0, k.s)(e, s.Q, "getBlock")({
          blockTag: "latest"
        }), x);
      }
      async function T() {
        if (C) return C;
        if (l) return l.id;
        if ("undefined" !== typeof t.chainId) return t.chainId;
        const n = await (0, k.s)(e, S.L, "getChainId")({});
        return (C = n, C);
      }
      if (g.includes("nonce") && "undefined" === typeof b && v) if (y) {
        const t = await T();
        A.nonce = await y.consume({
          address: v.address,
          chainId: t,
          client: e
        });
      } else A.nonce = await (0, k.s)(e, a.K, "getTransactionCount")({
        address: v.address,
        blockTag: "pending"
      });
      if ((g.includes("blobVersionedHashes") || g.includes("sidecars")) && u && p) {
        const e = d({
          blobs: u,
          kzg: p
        });
        if (g.includes("blobVersionedHashes")) {
          const t = (function (e) {
            const {commitments: t, version: n} = e, r = e.to ?? ("string" === typeof t[0] ? "hex" : "bytes"), o = [];
            for (const i of t) o.push(m({
              commitment: i,
              to: r,
              version: n
            }));
            return o;
          })({
            commitments: e,
            to: "hex"
          });
          A.blobVersionedHashes = t;
        }
        if (g.includes("sidecars")) {
          const t = E({
            blobs: u,
            commitments: e,
            proofs: f({
              blobs: u,
              commitments: e,
              kzg: p
            }),
            to: "hex"
          });
          A.sidecars = t;
        }
      }
      if ((g.includes("chainId") && (A.chainId = await T()), (g.includes("fees") || g.includes("type")) && "undefined" === typeof w)) try {
        A.type = (function (e) {
          if (e.type) return e.type;
          if ("undefined" !== typeof e.authorizationList) return "eip7702";
          if ("undefined" !== typeof e.blobs || "undefined" !== typeof e.blobVersionedHashes || "undefined" !== typeof e.maxFeePerBlobGas || "undefined" !== typeof e.sidecars) return "eip4844";
          if ("undefined" !== typeof e.maxFeePerGas || "undefined" !== typeof e.maxPriorityFeePerGas) return "eip1559";
          if ("undefined" !== typeof e.gasPrice) return "undefined" !== typeof e.accessList ? "eip2930" : "legacy";
          throw new B.j3({
            transaction: e
          });
        })(A);
      } catch {
        let t = M.get(e.uid);
        if ("undefined" === typeof t) {
          const n = await P();
          (t = "bigint" === typeof n?.baseFeePerGas, M.set(e.uid, t));
        }
        A.type = t ? "eip1559" : "legacy";
      }
      if (g.includes("fees")) if ("legacy" !== A.type && "eip2930" !== A.type) {
        if ("undefined" === typeof A.maxFeePerGas || "undefined" === typeof A.maxPriorityFeePerGas) {
          const n = await P(), {maxFeePerGas: r, maxPriorityFeePerGas: i} = await (0, o.C)(e, {
            block: n,
            chain: l,
            request: A
          });
          if ("undefined" === typeof t.maxPriorityFeePerGas && t.maxFeePerGas && t.maxFeePerGas < i) throw new c.ld({
            maxPriorityFeePerGas: i
          });
          (A.maxPriorityFeePerGas = i, A.maxFeePerGas = r);
        }
      } else {
        if ("undefined" !== typeof t.maxFeePerGas || "undefined" !== typeof t.maxPriorityFeePerGas) throw new c.e5();
        if ("undefined" === typeof t.gasPrice) {
          const t = await P(), {gasPrice: n} = await (0, o.C)(e, {
            block: t,
            chain: l,
            request: A,
            type: "legacy"
          });
          A.gasPrice = n;
        }
      }
      return (g.includes("gas") && "undefined" === typeof h && (A.gas = await (0, k.s)(e, i.Q, "estimateGas")({
        ...A,
        account: v ? {
          address: v.address,
          type: "json-rpc"
        } : v
      })), (0, I.F)(A), delete A.parameters, A);
    }
  },
  9769: function (e, t, n) {
    "use strict";
    async function r(e, {serializedTransaction: t}) {
      return e.request({
        method: "eth_sendRawTransaction",
        params: [t]
      }, {
        retryCount: 0
      });
    }
    n.d(t, {
      p: function () {
        return r;
      }
    });
  },
  64314: function (e, t, n) {
    "use strict";
    n.d(t, {
      R: function () {
        return r;
      }
    });
    const r = (0, n(90328).a)({
      id: 1,
      name: "Ethereum",
      nativeCurrency: {
        name: "Ether",
        symbol: "ETH",
        decimals: 18
      },
      blockTime: 12000,
      rpcUrls: {
        default: {
          http: ["https://eth.merkle.io"]
        }
      },
      blockExplorers: {
        default: {
          name: "Etherscan",
          url: "https://etherscan.io",
          apiUrl: "https://api.etherscan.io/api"
        }
      },
      contracts: {
        ensUniversalResolver: {
          address: "0xeeeeeeee14d718c2b47d9923deab1335e144eeee",
          blockCreated: 23085558
        },
        multicall3: {
          address: "0xca11bde05977b3631167028862be2a173976ca11",
          blockCreated: 14353601
        }
      }
    });
  },
  82538: function (e, t, n) {
    "use strict";
    n.d(t, {
      e: function () {
        return i;
      }
    });
    var r = n(19775), o = n(78217);
    function i(e) {
      const {batch: t, chain: n, ccipRead: i, key: s = "base", name: a = "Base Client", type: c = "base"} = e, u = e.experimental_blockTag ?? ("number" === typeof n?.experimental_preconfirmationTime ? "pending" : void 0), l = n?.blockTime ?? 12000, d = Math.min(Math.max(Math.floor(l / 2), 500), 4000), f = e.pollingInterval ?? d, h = e.cacheTime ?? f, p = e.account ? (0, r.T)(e.account) : void 0, {config: m, request: b, value: y} = e.transport({
        chain: n,
        pollingInterval: f
      }), g = {
        account: p,
        batch: t,
        cacheTime: h,
        ccipRead: i,
        chain: n,
        key: s,
        name: a,
        pollingInterval: f,
        request: b,
        transport: {
          ...m,
          ...y
        },
        type: c,
        uid: (0, o.h)(),
        ...u ? {
          experimental_blockTag: u
        } : {}
      };
      return Object.assign(g, {
        extend: (function e(t) {
          return n => {
            const r = n(t);
            for (const e in g) delete r[e];
            const o = {
              ...t,
              ...r
            };
            return Object.assign(o, {
              extend: e(o)
            });
          };
        })(g)
      });
    }
  },
  37878: function (e, t, n) {
    "use strict";
    n.d(t, {
      I: function () {
        return Lr;
      }
    });
    var r = n(98158), o = n(65436), i = n(17283), s = n(93627), a = n(36826), c = n(59455), u = n(83348), l = n(7143), d = n(21721), f = n(98707), h = n(82645), p = n(28766);
    var m = n(96698), b = n(72609);
    var y = n(99861), g = n(50550), w = n(19775), v = n(14015), A = n(70878), x = n(92614), C = n(62077);
    async function P(e, t) {
      const {account: n = e.account, blockNumber: r, blockTag: o = "latest", blobs: i, data: s, gas: a, gasPrice: u, maxFeePerBlobGas: l, maxFeePerGas: d, maxPriorityFeePerGas: f, to: h, value: p, ...m} = t, b = n ? (0, w.T)(n) : void 0;
      try {
        (0, C.F)(t);
        const n = ("bigint" === typeof r ? (0, c.eC)(r) : void 0) || o, y = e.chain?.formatters?.transactionRequest?.format, g = (y || x.tG)({
          ...(0, A.K)(m, {
            format: y
          }),
          from: b?.address,
          blobs: i,
          data: s,
          gas: a,
          gasPrice: u,
          maxFeePerBlobGas: l,
          maxFeePerGas: d,
          maxPriorityFeePerGas: f,
          to: h,
          value: p
        }, "createAccessList"), w = await e.request({
          method: "eth_createAccessList",
          params: [g, n]
        });
        return {
          accessList: w.accessList,
          gasUsed: BigInt(w.gasUsed)
        };
      } catch (y) {
        throw (0, v.P)(y, {
          ...t,
          account: b,
          chain: e.chain
        });
      }
    }
    function E(e, {method: t}) {
      const n = {};
      return ("fallback" === e.transport.type && e.transport.onResponse?.(({method: e, response: r, status: o, transport: i}) => {
        "success" === o && t === e && (n[r] = i.request);
      }), t => n[t] || e.request);
    }
    var k = n(65531), I = n(81544);
    class B extends I.G {
      constructor(e) {
        super(`Filter type "${e}" is not supported.`, {
          name: "FilterTypeNotSupportedError"
        });
      }
    }
    var S = n(44659), O = n(13169), M = n(45392), T = n(30056), N = n(7275), R = n(64043);
    const F = "/docs/contract/encodeEventTopics";
    function j(e) {
      const {abi: t, eventName: n, args: r} = e;
      let o = t[0];
      if (n) {
        const e = (0, R.mE)({
          abi: t,
          name: n
        });
        if (!e) throw new k.mv(n, {
          docsPath: F
        });
        o = e;
      }
      if ("event" !== o.type) throw new k.mv(void 0, {
        docsPath: F
      });
      const i = (0, N.t)(o), s = (0, M.n)(i);
      let a = [];
      if (r && ("inputs" in o)) {
        const e = o.inputs?.filter(e => ("indexed" in e) && e.indexed), t = Array.isArray(r) ? r : Object.values(r).length > 0 ? e?.map(e => r[e.name]) ?? [] : [];
        t.length > 0 && (a = e?.map((e, n) => Array.isArray(t[n]) ? t[n].map((r, o) => U({
          param: e,
          value: t[n][o]
        })) : "undefined" !== typeof t[n] && null !== t[n] ? U({
          param: e,
          value: t[n]
        }) : null) ?? []);
      }
      return [s, ...a];
    }
    function U({param: e, value: t}) {
      if ("string" === e.type || "bytes" === e.type) return (0, O.w)((0, S.O0)(t));
      if ("tuple" === e.type || e.type.match(/^(.*)\[(\d+)?\]$/)) throw new B(e.type);
      return (0, T.E)([e], [t]);
    }
    async function D(e, t) {
      const {address: n, abi: r, args: o, eventName: i, fromBlock: s, strict: a, toBlock: u} = t, l = E(e, {
        method: "eth_newFilter"
      }), d = i ? j({
        abi: r,
        args: o,
        eventName: i
      }) : void 0, f = await e.request({
        method: "eth_newFilter",
        params: [{
          address: n,
          fromBlock: "bigint" === typeof s ? (0, c.eC)(s) : s,
          toBlock: "bigint" === typeof u ? (0, c.eC)(u) : u,
          topics: d
        }]
      });
      return {
        abi: r,
        args: o,
        eventName: i,
        id: f,
        request: l(f),
        strict: Boolean(a),
        type: "event"
      };
    }
    async function L(e, {address: t, args: n, event: r, events: o, fromBlock: i, strict: s, toBlock: a} = {}) {
      const u = o ?? (r ? [r] : void 0), l = E(e, {
        method: "eth_newFilter"
      });
      let d = [];
      if (u) {
        const e = u.flatMap(e => j({
          abi: [e],
          eventName: e.name,
          args: n
        }));
        (d = [e], r && (d = d[0]));
      }
      const f = await e.request({
        method: "eth_newFilter",
        params: [{
          address: t,
          fromBlock: "bigint" === typeof i ? (0, c.eC)(i) : i,
          toBlock: "bigint" === typeof a ? (0, c.eC)(a) : a,
          ...d.length ? {
            topics: d
          } : {}
        }]
      });
      return {
        abi: u,
        args: n,
        eventName: r ? r.name : void 0,
        fromBlock: i,
        id: f,
        request: l(f),
        strict: Boolean(s),
        toBlock: a,
        type: "event"
      };
    }
    async function z(e) {
      const t = E(e, {
        method: "eth_newPendingTransactionFilter"
      }), n = await e.request({
        method: "eth_newPendingTransactionFilter"
      });
      return {
        id: n,
        request: t(n),
        type: "transaction"
      };
    }
    var q = n(34180), G = n(8741);
    var Q = n(6458), _ = n(96174), W = n(32807);
    var $ = n(74587), H = n(13708), K = n(72932);
    var V = n(12363), J = n(56570), Z = n(93637), Y = n(33630), X = n(20556), ee = n(2742);
    const te = "/docs/contract/decodeEventLog";
    function ne(e) {
      const {abi: t, data: n, strict: r, topics: o} = e, i = r ?? !0, [s, ...a] = o;
      if (!s) throw new k.FM({
        docsPath: te
      });
      const c = t.find(e => "event" === e.type && s === (0, M.n)((0, N.t)(e)));
      if (!c || !(("name" in c)) || "event" !== c.type) throw new k.lC(s, {
        docsPath: te
      });
      const {name: u, inputs: l} = c, d = l?.some(e => !(("name" in e) && e.name)), f = d ? [] : {}, h = l.map((e, t) => [e, t]).filter(([e]) => ("indexed" in e) && e.indexed);
      for (let b = 0; b < h.length; b++) {
        const [e, t] = h[b], n = a[b];
        if (!n) throw new k.Gy({
          abiItem: c,
          param: e
        });
        f[d ? t : e.name || t] = re({
          param: e,
          value: n
        });
      }
      const p = l.filter(e => !(("indexed" in e) && e.indexed));
      if (p.length > 0) if (n && "0x" !== n) try {
        const e = (0, ee.r)(p, n);
        if (e) if (d) for (let t = 0; t < l.length; t++) f[t] = f[t] ?? e.shift(); else for (let t = 0; t < p.length; t++) f[p[t].name] = e[t];
      } catch (m) {
        if (i) {
          if (m instanceof k.xB || m instanceof Y.lQ) throw new k.SM({
            abiItem: c,
            data: n,
            params: p,
            size: (0, X.d)(n)
          });
          throw m;
        }
      } else if (i) throw new k.SM({
        abiItem: c,
        data: "0x",
        params: p,
        size: 0
      });
      return {
        eventName: u,
        args: Object.values(f).length > 0 ? f : void 0
      };
    }
    function re({param: e, value: t}) {
      if ("string" === e.type || "bytes" === e.type || "tuple" === e.type || e.type.match(/^(.*)\[(\d+)?\]$/)) return t;
      return ((0, ee.r)([e], t) || [])[0];
    }
    function oe(e) {
      const {abi: t, args: n, logs: r, strict: o = !0} = e, i = (() => {
        if (e.eventName) return Array.isArray(e.eventName) ? e.eventName : [e.eventName];
      })();
      return r.map(e => {
        try {
          const r = t.find(t => "event" === t.type && e.topics[0] === (0, M.n)(t));
          if (!r) return null;
          const s = ne({
            ...e,
            abi: [r],
            strict: o
          });
          return i && !i.includes(s.eventName) ? null : (function (e) {
            const {args: t, inputs: n, matchArgs: r} = e;
            if (!r) return !0;
            if (!t) return !1;
            function o(e, t, n) {
              try {
                return "address" === e.type ? (0, Z.E)(t, n) : "string" === e.type || "bytes" === e.type ? (0, O.w)((0, S.O0)(t)) === n : t === n;
              } catch {
                return !1;
              }
            }
            if (Array.isArray(t) && Array.isArray(r)) return r.every((e, r) => {
              if (null === e || void 0 === e) return !0;
              const i = n[r];
              if (!i) return !1;
              return (Array.isArray(e) ? e : [e]).some(e => o(i, e, t[r]));
            });
            return "object" === typeof t && !Array.isArray(t) && "object" === typeof r && !Array.isArray(r) && Object.entries(r).every(([e, r]) => {
              if (null === r || void 0 === r) return !0;
              const i = n.find(t => t.name === e);
              if (!i) return !1;
              return (Array.isArray(r) ? r : [r]).some(n => o(i, n, t[e]));
            });
          })({
            args: s.args,
            inputs: r.inputs,
            matchArgs: n
          }) ? {
            ...s,
            ...e
          } : null;
        } catch (r) {
          let t, n;
          if (r instanceof k.lC) return null;
          if (r instanceof k.SM || r instanceof k.Gy) {
            if (o) return null;
            (t = r.abiItem.name, n = r.abiItem.inputs?.some(e => !(("name" in e) && e.name)));
          }
          return {
            ...e,
            args: n ? [] : {},
            eventName: t
          };
        }
      }).filter(Boolean);
    }
    var ie = n(55668);
    async function se(e, {address: t, blockHash: n, fromBlock: r, toBlock: o, event: i, events: s, args: a, strict: u} = {}) {
      const l = u ?? !1, d = s ?? (i ? [i] : void 0);
      let f, h = [];
      if (d) {
        const e = d.flatMap(e => j({
          abi: [e],
          eventName: e.name,
          args: s ? void 0 : a
        }));
        (h = [e], i && (h = h[0]));
      }
      f = n ? await e.request({
        method: "eth_getLogs",
        params: [{
          address: t,
          topics: h,
          blockHash: n
        }]
      }) : await e.request({
        method: "eth_getLogs",
        params: [{
          address: t,
          topics: h,
          fromBlock: "bigint" === typeof r ? (0, c.eC)(r) : r,
          toBlock: "bigint" === typeof o ? (0, c.eC)(o) : o
        }]
      });
      const p = f.map(e => (0, ie.U)(e));
      return d ? oe({
        abi: d,
        args: a,
        logs: p,
        strict: l
      }) : p;
    }
    async function ae(e, t) {
      const {abi: n, address: r, args: o, blockHash: i, eventName: s, fromBlock: a, toBlock: c, strict: u} = t, l = s ? (0, R.mE)({
        abi: n,
        name: s
      }) : void 0, d = l ? void 0 : n.filter(e => "event" === e.type);
      return (0, h.s)(e, se, "getLogs")({
        address: r,
        args: o,
        blockHash: i,
        event: l,
        events: d,
        fromBlock: a,
        toBlock: c,
        strict: u
      });
    }
    class ce extends I.G {
      constructor({address: e}) {
        super(`No EIP-712 domain found on contract "${e}".`, {
          metaMessages: ["Ensure that:", `- The contract is deployed at the address "${e}".`, "- `eip712Domain()` function exists on the contract.", "- `eip712Domain()` function matches signature to ERC-5267 specification."],
          name: "Eip712DomainNotFoundError"
        });
      }
    }
    const ue = [{
      inputs: [],
      name: "eip712Domain",
      outputs: [{
        name: "fields",
        type: "bytes1"
      }, {
        name: "name",
        type: "string"
      }, {
        name: "version",
        type: "string"
      }, {
        name: "chainId",
        type: "uint256"
      }, {
        name: "verifyingContract",
        type: "address"
      }, {
        name: "salt",
        type: "bytes32"
      }, {
        name: "extensions",
        type: "uint256[]"
      }],
      stateMutability: "view",
      type: "function"
    }];
    async function le(e, {blockCount: t, blockNumber: n, blockTag: r = "latest", rewardPercentiles: o}) {
      const i = "bigint" === typeof n ? (0, c.eC)(n) : void 0;
      return (function (e) {
        return {
          baseFeePerGas: e.baseFeePerGas.map(e => BigInt(e)),
          gasUsedRatio: e.gasUsedRatio,
          oldestBlock: BigInt(e.oldestBlock),
          reward: e.reward?.map(e => e.map(e => BigInt(e)))
        };
      })(await e.request({
        method: "eth_feeHistory",
        params: [(0, c.eC)(t), i || r, o]
      }, {
        dedupe: Boolean(i)
      }));
    }
    async function de(e, {filter: t}) {
      const n = ("strict" in t) && t.strict, r = await t.request({
        method: "eth_getFilterChanges",
        params: [t.id]
      });
      if ("string" === typeof r[0]) return r;
      const o = r.map(e => (0, ie.U)(e));
      return ("abi" in t) && t.abi ? oe({
        abi: t.abi,
        logs: o,
        strict: n
      }) : o;
    }
    var fe = n(25283);
    async function he(e, {address: t, blockNumber: n, blockTag: r, storageKeys: o}) {
      const i = r ?? "latest", s = void 0 !== n ? (0, c.eC)(n) : void 0;
      return (function (e) {
        return {
          ...e,
          balance: e.balance ? BigInt(e.balance) : void 0,
          nonce: e.nonce ? (0, K.ly)(e.nonce) : void 0,
          storageProof: e.storageProof ? (t = e.storageProof, t.map(e => ({
            ...e,
            value: BigInt(e.value)
          }))) : void 0
        };
        var t;
      })(await e.request({
        method: "eth_getProof",
        params: [t, o, s || i]
      }));
    }
    var pe = n(39277);
    var me = n(16689), be = n(78526), ye = n(94797), ge = n(30497), we = n(20010), ve = n(78125), Ae = n(89256), xe = n(18856), Ce = n(59069), Pe = n(77911);
    async function Ee(e, t) {
      const {blockNumber: n, blockTag: r = e.experimental_blockTag ?? "latest", blocks: s, returnFullTransactions: a, traceTransfers: u, validation: l} = t;
      try {
        const t = [];
        for (const e of s) {
          const n = e.blockOverrides ? ge.o(e.blockOverrides) : void 0, r = e.calls.map(e => {
            const t = e, n = t.account ? (0, w.T)(t.account) : void 0, r = t.abi ? (0, i.R)(t) : t.data, o = {
              ...t,
              data: t.dataSuffix ? (0, Ae.zo)([r || "0x", t.dataSuffix]) : r,
              from: t.from ?? n?.address
            };
            return ((0, C.F)(o), (0, x.tG)(o));
          }), o = e.stateOverrides ? (0, Pe.mF)(e.stateOverrides) : void 0;
          t.push({
            blockOverrides: n,
            calls: r,
            stateOverrides: o
          });
        }
        const d = ("bigint" === typeof n ? (0, c.eC)(n) : void 0) || r;
        return (await e.request({
          method: "eth_simulateV1",
          params: [{
            blockStateCalls: t,
            returnFullTransactions: a,
            traceTransfers: u,
            validation: l
          }, d]
        })).map((e, t) => ({
          ...(0, Ce.Z)(e),
          calls: e.calls.map((e, n) => {
            const {abi: r, args: i, functionName: a, to: c} = s[t].calls[n], u = e.error?.data ?? e.returnData, l = BigInt(e.gasUsed), d = e.logs?.map(e => (0, ie.U)(e)), f = "0x1" === e.status ? "success" : "failure", h = r && "success" === f && "0x" !== u ? (0, o.k)({
              abi: r,
              data: u,
              functionName: a
            }) : null, p = (() => {
              if ("success" === f) return;
              let t;
              return ("0x" === e.error?.data ? t = new k.wb() : e.error && (t = new we.VQ(e.error)), t ? (0, q.S)(t, {
                abi: r ?? [],
                address: c ?? "0x",
                args: i,
                functionName: a ?? "<unknown>"
              }) : void 0);
            })();
            return {
              data: u,
              gasUsed: l,
              logs: d,
              status: f,
              ..."success" === f ? {
                result: h
              } : {
                error: p
              }
            };
          })
        }));
      } catch (d) {
        const e = d, t = (0, xe.k)(e, {});
        if (t instanceof ve.cj) throw e;
        throw t;
      }
    }
    class ke extends Error {
      constructor(e, t = {}) {
        const n = t.cause instanceof ke ? t.cause.details : t.cause?.message ? t.cause.message : t.details, r = t.cause instanceof ke && t.cause.docsPath || t.docsPath;
        (super([e || "An error occurred.", "", ...t.metaMessages ? [...t.metaMessages, ""] : [], ...r ? [`Docs: https://abitype.dev${r}`] : [], ...n ? [`Details: ${n}`] : [], "Version: abitype@1.1.1"].join("\n")), Object.defineProperty(this, "details", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), Object.defineProperty(this, "docsPath", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), Object.defineProperty(this, "metaMessages", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), Object.defineProperty(this, "shortMessage", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "AbiTypeError"
        }), t.cause && (this.cause = t.cause), this.details = n, this.docsPath = r, this.metaMessages = t.metaMessages, this.shortMessage = e);
      }
    }
    class Ie extends ke {
      constructor({signature: e}) {
        (super("Failed to parse ABI item.", {
          details: `parseAbiItem(${JSON.stringify(e, null, 2)})`,
          docsPath: "/api/human#parseabiitem-1"
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "InvalidAbiItemError"
        }));
      }
    }
    class Be extends ke {
      constructor({type: e}) {
        (super("Unknown type.", {
          metaMessages: [`Type "${e}" is not a valid ABI type. Perhaps you forgot to include a struct signature?`]
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "UnknownTypeError"
        }));
      }
    }
    class Se extends ke {
      constructor({type: e}) {
        (super("Unknown type.", {
          metaMessages: [`Type "${e}" is not a valid ABI type.`]
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "UnknownSolidityTypeError"
        }));
      }
    }
    function Oe(e, t) {
      const n = e.exec(t);
      return n?.groups;
    }
    const Me = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/, Te = /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/, Ne = /^\(.+?\).*?$/, Re = /^error (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
    const Fe = /^event (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
    const je = /^function (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)(?: (?<scope>external|public{1}))?(?: (?<stateMutability>pure|view|nonpayable|payable{1}))?(?: returns\s?\((?<returns>.*?)\))?$/;
    const Ue = /^struct (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*) \{(?<properties>.*?)\}$/;
    function De(e) {
      return Ue.test(e);
    }
    function Le(e) {
      return Oe(Ue, e);
    }
    const ze = /^constructor\((?<parameters>.*?)\)(?:\s(?<stateMutability>payable{1}))?$/;
    const qe = /^fallback\(\) external(?:\s(?<stateMutability>payable{1}))?$/;
    const Ge = /^receive\(\) external payable$/;
    const Qe = new Set(["memory", "indexed", "storage", "calldata"]), _e = new Set(["indexed"]), We = new Set(["calldata", "memory", "storage"]);
    class $e extends ke {
      constructor({params: e}) {
        (super("Failed to parse ABI parameters.", {
          details: `parseAbiParameters(${JSON.stringify(e, null, 2)})`,
          docsPath: "/api/human#parseabiparameters-1"
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "InvalidAbiParametersError"
        }));
      }
    }
    class He extends ke {
      constructor({param: e}) {
        (super("Invalid ABI parameter.", {
          details: e
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "InvalidParameterError"
        }));
      }
    }
    class Ke extends ke {
      constructor({param: e, name: t}) {
        (super("Invalid ABI parameter.", {
          details: e,
          metaMessages: [`"${t}" is a protected Solidity keyword. More info: https://docs.soliditylang.org/en/latest/cheatsheet.html`]
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "SolidityProtectedKeywordError"
        }));
      }
    }
    class Ve extends ke {
      constructor({param: e, type: t, modifier: n}) {
        (super("Invalid ABI parameter.", {
          details: e,
          metaMessages: [`Modifier "${n}" not allowed${t ? ` in "${t}" type` : ""}.`]
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "InvalidModifierError"
        }));
      }
    }
    class Je extends ke {
      constructor({param: e, type: t, modifier: n}) {
        (super("Invalid ABI parameter.", {
          details: e,
          metaMessages: [`Modifier "${n}" not allowed${t ? ` in "${t}" type` : ""}.`, `Data location can only be specified for array, struct, or mapping types, but "${n}" was given.`]
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "InvalidFunctionModifierError"
        }));
      }
    }
    class Ze extends ke {
      constructor({abiParameter: e}) {
        (super("Invalid ABI parameter.", {
          details: JSON.stringify(e, null, 2),
          metaMessages: ["ABI parameter type is invalid."]
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "InvalidAbiTypeParameterError"
        }));
      }
    }
    class Ye extends ke {
      constructor({signature: e, type: t}) {
        (super(`Invalid ${t} signature.`, {
          details: e
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "InvalidSignatureError"
        }));
      }
    }
    class Xe extends ke {
      constructor({signature: e}) {
        (super("Unknown signature.", {
          details: e
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "UnknownSignatureError"
        }));
      }
    }
    class et extends ke {
      constructor({signature: e}) {
        (super("Invalid struct signature.", {
          details: e,
          metaMessages: ["No properties exist."]
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "InvalidStructSignatureError"
        }));
      }
    }
    class tt extends ke {
      constructor({type: e}) {
        (super("Circular reference detected.", {
          metaMessages: [`Struct "${e}" is a circular reference.`]
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "CircularReferenceError"
        }));
      }
    }
    class nt extends ke {
      constructor({current: e, depth: t}) {
        (super("Unbalanced parentheses.", {
          metaMessages: [`"${e.trim()}" has too many ${t > 0 ? "opening" : "closing"} parentheses.`],
          details: `Depth "${t}"`
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "InvalidParenthesisError"
        }));
      }
    }
    const rt = new Map([["address", {
      type: "address"
    }], ["bool", {
      type: "bool"
    }], ["bytes", {
      type: "bytes"
    }], ["bytes32", {
      type: "bytes32"
    }], ["int", {
      type: "int256"
    }], ["int256", {
      type: "int256"
    }], ["string", {
      type: "string"
    }], ["uint", {
      type: "uint256"
    }], ["uint8", {
      type: "uint8"
    }], ["uint16", {
      type: "uint16"
    }], ["uint24", {
      type: "uint24"
    }], ["uint32", {
      type: "uint32"
    }], ["uint64", {
      type: "uint64"
    }], ["uint96", {
      type: "uint96"
    }], ["uint112", {
      type: "uint112"
    }], ["uint160", {
      type: "uint160"
    }], ["uint192", {
      type: "uint192"
    }], ["uint256", {
      type: "uint256"
    }], ["address owner", {
      type: "address",
      name: "owner"
    }], ["address to", {
      type: "address",
      name: "to"
    }], ["bool approved", {
      type: "bool",
      name: "approved"
    }], ["bytes _data", {
      type: "bytes",
      name: "_data"
    }], ["bytes data", {
      type: "bytes",
      name: "data"
    }], ["bytes signature", {
      type: "bytes",
      name: "signature"
    }], ["bytes32 hash", {
      type: "bytes32",
      name: "hash"
    }], ["bytes32 r", {
      type: "bytes32",
      name: "r"
    }], ["bytes32 root", {
      type: "bytes32",
      name: "root"
    }], ["bytes32 s", {
      type: "bytes32",
      name: "s"
    }], ["string name", {
      type: "string",
      name: "name"
    }], ["string symbol", {
      type: "string",
      name: "symbol"
    }], ["string tokenURI", {
      type: "string",
      name: "tokenURI"
    }], ["uint tokenId", {
      type: "uint256",
      name: "tokenId"
    }], ["uint8 v", {
      type: "uint8",
      name: "v"
    }], ["uint256 balance", {
      type: "uint256",
      name: "balance"
    }], ["uint256 tokenId", {
      type: "uint256",
      name: "tokenId"
    }], ["uint256 value", {
      type: "uint256",
      name: "value"
    }], ["event:address indexed from", {
      type: "address",
      name: "from",
      indexed: !0
    }], ["event:address indexed to", {
      type: "address",
      name: "to",
      indexed: !0
    }], ["event:uint indexed tokenId", {
      type: "uint256",
      name: "tokenId",
      indexed: !0
    }], ["event:uint256 indexed tokenId", {
      type: "uint256",
      name: "tokenId",
      indexed: !0
    }]]);
    function ot(e, t = {}) {
      if ((function (e) {
        return je.test(e);
      })(e)) return (function (e, t = {}) {
        const n = (function (e) {
          return Oe(je, e);
        })(e);
        if (!n) throw new Ye({
          signature: e,
          type: "function"
        });
        const r = ut(n.parameters), o = [], i = r.length;
        for (let a = 0; a < i; a++) o.push(ct(r[a], {
          modifiers: We,
          structs: t,
          type: "function"
        }));
        const s = [];
        if (n.returns) {
          const e = ut(n.returns), r = e.length;
          for (let n = 0; n < r; n++) s.push(ct(e[n], {
            modifiers: We,
            structs: t,
            type: "function"
          }));
        }
        return {
          name: n.name,
          type: "function",
          stateMutability: n.stateMutability ?? "nonpayable",
          inputs: o,
          outputs: s
        };
      })(e, t);
      if ((function (e) {
        return Fe.test(e);
      })(e)) return (function (e, t = {}) {
        const n = (function (e) {
          return Oe(Fe, e);
        })(e);
        if (!n) throw new Ye({
          signature: e,
          type: "event"
        });
        const r = ut(n.parameters), o = [], i = r.length;
        for (let s = 0; s < i; s++) o.push(ct(r[s], {
          modifiers: _e,
          structs: t,
          type: "event"
        }));
        return {
          name: n.name,
          type: "event",
          inputs: o
        };
      })(e, t);
      if ((function (e) {
        return Re.test(e);
      })(e)) return (function (e, t = {}) {
        const n = (function (e) {
          return Oe(Re, e);
        })(e);
        if (!n) throw new Ye({
          signature: e,
          type: "error"
        });
        const r = ut(n.parameters), o = [], i = r.length;
        for (let s = 0; s < i; s++) o.push(ct(r[s], {
          structs: t,
          type: "error"
        }));
        return {
          name: n.name,
          type: "error",
          inputs: o
        };
      })(e, t);
      if ((function (e) {
        return ze.test(e);
      })(e)) return (function (e, t = {}) {
        const n = (function (e) {
          return Oe(ze, e);
        })(e);
        if (!n) throw new Ye({
          signature: e,
          type: "constructor"
        });
        const r = ut(n.parameters), o = [], i = r.length;
        for (let s = 0; s < i; s++) o.push(ct(r[s], {
          structs: t,
          type: "constructor"
        }));
        return {
          type: "constructor",
          stateMutability: n.stateMutability ?? "nonpayable",
          inputs: o
        };
      })(e, t);
      if ((function (e) {
        return qe.test(e);
      })(e)) return (function (e) {
        const t = (function (e) {
          return Oe(qe, e);
        })(e);
        if (!t) throw new Ye({
          signature: e,
          type: "fallback"
        });
        return {
          type: "fallback",
          stateMutability: t.stateMutability ?? "nonpayable"
        };
      })(e);
      if ((function (e) {
        return Ge.test(e);
      })(e)) return {
        type: "receive",
        stateMutability: "payable"
      };
      throw new Xe({
        signature: e
      });
    }
    const it = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*(?:\spayable)?)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/, st = /^\((?<type>.+?)\)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/, at = /^u?int$/;
    function ct(e, t) {
      const n = (function (e, t, n) {
        let r = "";
        if (n) for (const o of Object.entries(n)) {
          if (!o) continue;
          let e = "";
          for (const t of o[1]) e += `[${t.type}${t.name ? `:${t.name}` : ""}]`;
          r += `(${o[0]}{${e}})`;
        }
        return t ? `${t}:${e}${r}` : e;
      })(e, t?.type, t?.structs);
      if (rt.has(n)) return rt.get(n);
      const r = Ne.test(e), o = Oe(r ? st : it, e);
      if (!o) throw new He({
        param: e
      });
      if (o.name && (function (e) {
        return "address" === e || "bool" === e || "function" === e || "string" === e || "tuple" === e || Me.test(e) || Te.test(e) || dt.test(e);
      })(o.name)) throw new Ke({
        param: e,
        name: o.name
      });
      const i = o.name ? {
        name: o.name
      } : {}, s = "indexed" === o.modifier ? {
        indexed: !0
      } : {}, a = t?.structs ?? ({});
      let c, u = {};
      if (r) {
        c = "tuple";
        const e = ut(o.type), t = [], n = e.length;
        for (let r = 0; r < n; r++) t.push(ct(e[r], {
          structs: a
        }));
        u = {
          components: t
        };
      } else if ((o.type in a)) (c = "tuple", u = {
        components: a[o.type]
      }); else if (at.test(o.type)) c = `${o.type}256`; else if ("address payable" === o.type) c = "address"; else if ((c = o.type, "struct" !== t?.type && !lt(c))) throw new Se({
        type: c
      });
      if (o.modifier) {
        if (!t?.modifiers?.has?.(o.modifier)) throw new Ve({
          param: e,
          type: t?.type,
          modifier: o.modifier
        });
        if (We.has(o.modifier) && !(function (e, t) {
          return t || "bytes" === e || "string" === e || "tuple" === e;
        })(c, !!o.array)) throw new Je({
          param: e,
          type: t?.type,
          modifier: o.modifier
        });
      }
      const l = {
        type: `${c}${o.array ?? ""}`,
        ...i,
        ...s,
        ...u
      };
      return (rt.set(n, l), l);
    }
    function ut(e, t = [], n = "", r = 0) {
      const o = e.trim().length;
      for (let i = 0; i < o; i++) {
        const o = e[i], s = e.slice(i + 1);
        switch (o) {
          case ",":
            return 0 === r ? ut(s, [...t, n.trim()]) : ut(s, t, `${n}${o}`, r);
          case "(":
            return ut(s, t, `${n}${o}`, r + 1);
          case ")":
            return ut(s, t, `${n}${o}`, r - 1);
          default:
            return ut(s, t, `${n}${o}`, r);
        }
      }
      if ("" === n) return t;
      if (0 !== r) throw new nt({
        current: n,
        depth: r
      });
      return (t.push(n.trim()), t);
    }
    function lt(e) {
      return "address" === e || "bool" === e || "function" === e || "string" === e || Me.test(e) || Te.test(e);
    }
    const dt = /^(?:after|alias|anonymous|apply|auto|byte|calldata|case|catch|constant|copyof|default|defined|error|event|external|false|final|function|immutable|implements|in|indexed|inline|internal|let|mapping|match|memory|mutable|null|of|override|partial|private|promise|public|pure|reference|relocatable|return|returns|sizeof|static|storage|struct|super|supports|switch|this|true|try|typedef|typeof|var|view|virtual)$/;
    function ft(e) {
      const t = {}, n = e.length;
      for (let s = 0; s < n; s++) {
        const n = e[s];
        if (!De(n)) continue;
        const r = Le(n);
        if (!r) throw new Ye({
          signature: n,
          type: "struct"
        });
        const o = r.properties.split(";"), i = [], a = o.length;
        for (let e = 0; e < a; e++) {
          const t = o[e].trim();
          if (!t) continue;
          const n = ct(t, {
            type: "struct"
          });
          i.push(n);
        }
        if (!i.length) throw new et({
          signature: n
        });
        t[r.name] = i;
      }
      const r = {}, o = Object.entries(t), i = o.length;
      for (let s = 0; s < i; s++) {
        const [e, n] = o[s];
        r[e] = pt(n, t);
      }
      return r;
    }
    const ht = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*)(?<array>(?:\[\d*?\])+?)?$/;
    function pt(e, t, n = new Set()) {
      const r = [], o = e.length;
      for (let i = 0; i < o; i++) {
        const o = e[i];
        if (Ne.test(o.type)) r.push(o); else {
          const e = Oe(ht, o.type);
          if (!e?.type) throw new Ze({
            abiParameter: o
          });
          const {array: i, type: s} = e;
          if ((s in t)) {
            if (n.has(s)) throw new tt({
              type: s
            });
            r.push({
              ...o,
              type: `tuple${i ?? ""}`,
              components: pt(t[s] ?? [], t, new Set([...n, s]))
            });
          } else {
            if (!lt(s)) throw new Be({
              type: s
            });
            r.push(o);
          }
        }
      }
      return r;
    }
    function mt(e) {
      let t;
      if ("string" === typeof e) t = ot(e); else {
        const n = ft(e), r = e.length;
        for (let o = 0; o < r; o++) {
          const r = e[o];
          if (!De(r)) {
            t = ot(r, n);
            break;
          }
        }
      }
      if (!t) throw new Ie({
        signature: e
      });
      return t;
    }
    const bt = /^tuple(?<array>(\[(\d*)\])*)$/;
    function yt(e) {
      let t = e.type;
      if (bt.test(e.type) && ("components" in e)) {
        t = "(";
        const n = e.components.length;
        for (let o = 0; o < n; o++) {
          (t += yt(e.components[o]), o < n - 1 && (t += ", "));
        }
        const r = Oe(bt, e.type);
        return (t += `)${r?.array ?? ""}`, yt({
          ...e,
          type: t
        }));
      }
      return (("indexed" in e) && e.indexed && (t = `${t} indexed`), e.name ? `${t} ${e.name}` : t);
    }
    function gt(e) {
      let t = "";
      const n = e.length;
      for (let r = 0; r < n; r++) {
        (t += yt(e[r]), r !== n - 1 && (t += ", "));
      }
      return t;
    }
    function wt(e) {
      return "function" === e.type ? `function ${e.name}(${gt(e.inputs)})${e.stateMutability && "nonpayable" !== e.stateMutability ? ` ${e.stateMutability}` : ""}${e.outputs?.length ? ` returns (${gt(e.outputs)})` : ""}` : "event" === e.type ? `event ${e.name}(${gt(e.inputs)})` : "error" === e.type ? `error ${e.name}(${gt(e.inputs)})` : "constructor" === e.type ? `constructor(${gt(e.inputs)})${"payable" === e.stateMutability ? " payable" : ""}` : "fallback" === e.type ? "fallback() external" + ("payable" === e.stateMutability ? " payable" : "") : "receive() external payable";
    }
    var vt = n(22496), At = n(92530), xt = n(65759);
    function Ct(e, t) {
      if (Rt(e) > t) throw new Gt({
        givenSize: Rt(e),
        maxSize: t
      });
    }
    const Pt = {
      zero: 48,
      nine: 57,
      A: 65,
      F: 70,
      a: 97,
      f: 102
    };
    function Et(e) {
      return e >= Pt.zero && e <= Pt.nine ? e - Pt.zero : e >= Pt.A && e <= Pt.F ? e - (Pt.A - 10) : e >= Pt.a && e <= Pt.f ? e - (Pt.a - 10) : void 0;
    }
    function kt(e, t = {}) {
      const {dir: n = "left"} = t;
      let r = e, o = 0;
      for (let i = 0; i < r.length - 1 && "0" === r["left" === n ? i : r.length - i - 1].toString(); i++) o++;
      return (r = "left" === n ? r.slice(o) : r.slice(0, r.length - o), r);
    }
    var It = n(26499), Bt = n(62266);
    const St = new TextDecoder(), Ot = new TextEncoder();
    function Mt(e) {
      return e instanceof Uint8Array ? e : "string" === typeof e ? Tt(e) : (function (e) {
        return e instanceof Uint8Array ? e : new Uint8Array(e);
      })(e);
    }
    function Tt(e, t = {}) {
      const {size: n} = t;
      let r = e;
      n && (It.Yf(e, n), r = xt.eh(e, n));
      let o = r.slice(2);
      o.length % 2 && (o = `0${o}`);
      const i = o.length / 2, s = new Uint8Array(i);
      for (let a = 0, c = 0; a < i; a++) {
        const e = Et(o.charCodeAt(c++)), t = Et(o.charCodeAt(c++));
        if (void 0 === e || void 0 === t) throw new vt.G(`Invalid byte sequence ("${o[c - 2]}${o[c - 1]}" in "${o}").`);
        s[a] = 16 * e + t;
      }
      return s;
    }
    function Nt(e, t = {}) {
      const {size: n} = t, r = Ot.encode(e);
      return "number" === typeof n ? (Ct(r, n), (function (e, t) {
        return (function (e, t = {}) {
          const {dir: n, size: r = 32} = t;
          if (0 === r) return e;
          if (e.length > r) throw new _t({
            size: e.length,
            targetSize: r,
            type: "Bytes"
          });
          const o = new Uint8Array(r);
          for (let i = 0; i < r; i++) {
            const t = "right" === n;
            o[t ? i : r - i - 1] = e[t ? i : e.length - i - 1];
          }
          return o;
        })(e, {
          dir: "right",
          size: t
        });
      })(r, n)) : r;
    }
    function Rt(e) {
      return e.length;
    }
    function Ft(e, t, n, r = {}) {
      const {strict: o} = r;
      !(function (e, t) {
        if ("number" === typeof t && t > 0 && t > Rt(e) - 1) throw new Qt({
          offset: t,
          position: "start",
          size: Rt(e)
        });
      })(e, t);
      const i = e.slice(t, n);
      return (o && (function (e, t, n) {
        if ("number" === typeof t && "number" === typeof n && Rt(e) !== n - t) throw new Qt({
          offset: n,
          position: "end",
          size: Rt(e)
        });
      })(i, t, n), i);
    }
    function jt(e, t = {}) {
      const {size: n} = t;
      "undefined" !== typeof n && Ct(e, n);
      const r = xt.xv(e, t);
      return xt.Gh(r, t);
    }
    function Ut(e, t = {}) {
      const {size: n} = t;
      let r = e;
      if (("undefined" !== typeof n && (Ct(r, n), r = zt(r)), r.length > 1 || r[0] > 1)) throw new qt(r);
      return Boolean(r[0]);
    }
    function Dt(e, t = {}) {
      const {size: n} = t;
      "undefined" !== typeof n && Ct(e, n);
      const r = xt.xv(e, t);
      return xt.He(r, t);
    }
    function Lt(e, t = {}) {
      const {size: n} = t;
      let r = e;
      return ("undefined" !== typeof n && (Ct(r, n), r = kt(r, {
        dir: "right"
      })), St.decode(r));
    }
    function zt(e) {
      return kt(e, {
        dir: "left"
      });
    }
    class qt extends vt.G {
      constructor(e) {
        (super(`Bytes value \`${e}\` is not a valid boolean.`, {
          metaMessages: ["The bytes array must contain a single byte of either a `0` or `1` value."]
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Bytes.InvalidBytesBooleanError"
        }));
      }
    }
    vt.G;
    class Gt extends vt.G {
      constructor({givenSize: e, maxSize: t}) {
        (super(`Size cannot exceed \`${t}\` bytes. Given size: \`${e}\` bytes.`), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Bytes.SizeOverflowError"
        }));
      }
    }
    class Qt extends vt.G {
      constructor({offset: e, position: t, size: n}) {
        (super(`Slice ${"start" === t ? "starting" : "ending"} at offset \`${e}\` is out-of-bounds (size: \`${n}\`).`), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Bytes.SliceOffsetOutOfBoundsError"
        }));
      }
    }
    class _t extends vt.G {
      constructor({size: e, targetSize: t, type: n}) {
        (super(`${n.charAt(0).toUpperCase()}${n.slice(1).toLowerCase()} size (\`${e}\`) exceeds padding size (\`${t}\`).`), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Bytes.SizeExceedsPaddingSizeError"
        }));
      }
    }
    function Wt(e, t = {}) {
      const {as: n = "string" === typeof e ? "Hex" : "Bytes"} = t, r = (0, At.fr)(Mt(e));
      return "Bytes" === n ? r : xt.xv(r);
    }
    class $t extends Map {
      constructor(e) {
        (super(), Object.defineProperty(this, "maxSize", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), this.maxSize = e);
      }
      get(e) {
        const t = super.get(e);
        return (super.has(e) && void 0 !== t && (this.delete(e), super.set(e, t)), t);
      }
      set(e, t) {
        if ((super.set(e, t), this.maxSize && this.size > this.maxSize)) {
          const e = this.keys().next().value;
          e && this.delete(e);
        }
        return this;
      }
    }
    const Ht = {
      checksum: new $t(8192)
    }, Kt = Ht.checksum;
    const Vt = /^0x[a-fA-F0-9]{40}$/;
    function Jt(e, t = {}) {
      const {strict: n = !0} = t;
      if (!Vt.test(e)) throw new Xt({
        address: e,
        cause: new en()
      });
      if (n) {
        if (e.toLowerCase() === e) return;
        if (Zt(e) !== e) throw new Xt({
          address: e,
          cause: new tn()
        });
      }
    }
    function Zt(e) {
      if (Kt.has(e)) return Kt.get(e);
      Jt(e, {
        strict: !1
      });
      const t = e.substring(2).toLowerCase(), n = Wt(Nt(t), {
        as: "Bytes"
      }), r = t.split("");
      for (let i = 0; i < 40; i += 2) (n[i >> 1] >> 4 >= 8 && r[i] && (r[i] = r[i].toUpperCase()), (15 & n[i >> 1]) >= 8 && r[i + 1] && (r[i + 1] = r[i + 1].toUpperCase()));
      const o = `0x${r.join("")}`;
      return (Kt.set(e, o), o);
    }
    function Yt(e, t = {}) {
      const {strict: n = !0} = t ?? ({});
      try {
        return (Jt(e, {
          strict: n
        }), !0);
      } catch {
        return !1;
      }
    }
    class Xt extends vt.G {
      constructor({address: e, cause: t}) {
        (super(`Address "${e}" is invalid.`, {
          cause: t
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Address.InvalidAddressError"
        }));
      }
    }
    class en extends vt.G {
      constructor() {
        (super("Address is not a 20 byte (40 hexadecimal character) value."), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Address.InvalidInputError"
        }));
      }
    }
    class tn extends vt.G {
      constructor() {
        (super("Address does not match its checksum counterpart."), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Address.InvalidChecksumError"
        }));
      }
    }
    function nn(e) {
      let t = !0, n = "", r = 0, o = "", i = !1;
      for (let s = 0; s < e.length; s++) {
        const a = e[s];
        if ((["(", ")", ","].includes(a) && (t = !0), "(" === a && r++, ")" === a && r--, t)) if (0 !== r) " " !== a ? (o += a, n += a) : "," !== e[s - 1] && "," !== n && ",(" !== n && (n = "", t = !1); else if (" " === a && ["event", "function", "error", ""].includes(o)) o = ""; else if ((o += a, ")" === a)) {
          i = !0;
          break;
        }
      }
      if (!i) throw new vt.G("Unable to normalize signature.");
      return o;
    }
    function rn(e, t) {
      const n = typeof e, r = t.type;
      switch (r) {
        case "address":
          return Yt(e, {
            strict: !1
          });
        case "bool":
          return "boolean" === n;
        case "function":
        case "string":
          return "string" === n;
        default:
          return "tuple" === r && ("components" in t) ? Object.values(t.components).every((t, n) => rn(Object.values(e)[n], t)) : (/^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/).test(r) ? "number" === n || "bigint" === n : (/^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/).test(r) ? "string" === n || e instanceof Uint8Array : !!(/[a-z]+[1-9]{0,3}(\[[0-9]{0,}\])+$/).test(r) && (Array.isArray(e) && e.every(e => rn(e, {
            ...t,
            type: r.replace(/(\[[0-9]{0,}\])$/, "")
          })));
      }
    }
    function on(e, t, n) {
      for (const r in e) {
        const o = e[r], i = t[r];
        if ("tuple" === o.type && "tuple" === i.type && ("components" in o) && ("components" in i)) return on(o.components, i.components, n[r]);
        const s = [o.type, i.type];
        if (!(!s.includes("address") || !s.includes("bytes20")) || (s.includes("address") && s.includes("string") || !(!s.includes("address") || !s.includes("bytes"))) && Yt(n[r], {
          strict: !1
        })) return s;
      }
    }
    function sn(e, t = {}) {
      const {prepare: n = !0} = t, r = Array.isArray(e) || "string" === typeof e ? mt(e) : e;
      return {
        ...r,
        ...n ? {
          hash: un(r)
        } : {}
      };
    }
    function an(e, t, n) {
      const {args: r = [], prepare: o = !0} = n ?? ({}), i = xt.Gu(t, {
        strict: !1
      }), s = e.filter(e => i ? "function" === e.type || "error" === e.type ? cn(e) === xt.tP(t, 0, 4) : "event" === e.type && un(e) === t : ("name" in e) && e.name === t);
      if (0 === s.length) throw new dn({
        name: t
      });
      if (1 === s.length) return {
        ...s[0],
        ...o ? {
          hash: un(s[0])
        } : {}
      };
      let a;
      for (const u of s) {
        if (!(("inputs" in u))) continue;
        if (!r || 0 === r.length) {
          if (!u.inputs || 0 === u.inputs.length) return {
            ...u,
            ...o ? {
              hash: un(u)
            } : {}
          };
          continue;
        }
        if (!u.inputs) continue;
        if (0 === u.inputs.length) continue;
        if (u.inputs.length !== r.length) continue;
        if (r.every((e, t) => {
          const n = ("inputs" in u) && u.inputs[t];
          return !!n && rn(e, n);
        })) {
          if (a && ("inputs" in a) && a.inputs) {
            const e = on(u.inputs, a.inputs, r);
            if (e) throw new ln({
              abiItem: u,
              type: e[0]
            }, {
              abiItem: a,
              type: e[1]
            });
          }
          a = u;
        }
      }
      const c = (() => {
        if (a) return a;
        const [e, ...t] = s;
        return {
          ...e,
          overloads: t
        };
      })();
      if (!c) throw new dn({
        name: t
      });
      return {
        ...c,
        ...o ? {
          hash: un(c)
        } : {}
      };
    }
    function cn(...e) {
      const t = (() => {
        if (Array.isArray(e[0])) {
          const [t, n] = e;
          return an(t, n);
        }
        return e[0];
      })();
      return xt.tP(un(t), 0, 4);
    }
    function un(...e) {
      const t = (() => {
        if (Array.isArray(e[0])) {
          const [t, n] = e;
          return an(t, n);
        }
        return e[0];
      })();
      return "string" !== typeof t && ("hash" in t) && t.hash ? t.hash : Wt(xt.mL((function (...e) {
        const t = (() => {
          if (Array.isArray(e[0])) {
            const [t, n] = e;
            return an(t, n);
          }
          return e[0];
        })();
        return nn("string" === typeof t ? t : wt(t));
      })(t)));
    }
    class ln extends vt.G {
      constructor(e, t) {
        (super("Found ambiguous types in overloaded ABI Items.", {
          metaMessages: [`\`${e.type}\` in \`${nn(wt(e.abiItem))}\`, and`, `\`${t.type}\` in \`${nn(wt(t.abiItem))}\``, "", "These types encode differently and cannot be distinguished at runtime.", "Remove one of the ambiguous items in the ABI."]
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "AbiItem.AmbiguityError"
        }));
      }
    }
    class dn extends vt.G {
      constructor({name: e, data: t, type: n = "item"}) {
        (super(`ABI ${n}${e ? ` with name "${e}"` : t ? ` with data "${t}"` : ""} not found.`), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "AbiItem.NotFoundError"
        }));
      }
    }
    vt.G;
    function fn(e) {
      const t = [];
      if ("string" === typeof e) {
        const n = ut(e), r = n.length;
        for (let e = 0; e < r; e++) t.push(ct(n[e], {
          modifiers: Qe
        }));
      } else {
        const n = ft(e), r = e.length;
        for (let o = 0; o < r; o++) {
          const r = e[o];
          if (De(r)) continue;
          const i = ut(r), s = i.length;
          for (let e = 0; e < s; e++) t.push(ct(i[e], {
            modifiers: Qe,
            structs: n
          }));
        }
      }
      if (0 === t.length) throw new $e({
        params: e
      });
      return t;
    }
    const hn = /^(.*)\[([0-9]*)\]$/, pn = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/, mn = /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/, bn = 2n ** 256n - 1n;
    function yn(e, t, n) {
      const {checksumAddress: r, staticPosition: o} = n, i = xn(t.type);
      if (i) {
        const [n, s] = i;
        return (function (e, t, n) {
          const {checksumAddress: r, length: o, staticPosition: i} = n;
          if (!o) {
            const n = i + Dt(e.readBytes(wn)), o = n + gn;
            e.setPosition(n);
            const s = Dt(e.readBytes(gn)), a = Cn(t);
            let c = 0;
            const u = [];
            for (let i = 0; i < s; ++i) {
              e.setPosition(o + (a ? 32 * i : c));
              const [n, s] = yn(e, t, {
                checksumAddress: r,
                staticPosition: o
              });
              (c += s, u.push(n));
            }
            return (e.setPosition(i + 32), [u, 32]);
          }
          if (Cn(t)) {
            const n = i + Dt(e.readBytes(wn)), s = [];
            for (let i = 0; i < o; ++i) {
              e.setPosition(n + 32 * i);
              const [o] = yn(e, t, {
                checksumAddress: r,
                staticPosition: n
              });
              s.push(o);
            }
            return (e.setPosition(i + 32), [s, 32]);
          }
          let s = 0;
          const a = [];
          for (let c = 0; c < o; ++c) {
            const [n, o] = yn(e, t, {
              checksumAddress: r,
              staticPosition: i + s
            });
            (s += o, a.push(n));
          }
          return [a, s];
        })(e, {
          ...t,
          type: s
        }, {
          checksumAddress: r,
          length: n,
          staticPosition: o
        });
      }
      if ("tuple" === t.type) return (function (e, t, n) {
        const {checksumAddress: r, staticPosition: o} = n, i = 0 === t.components.length || t.components.some(({name: e}) => !e), s = i ? [] : {};
        let a = 0;
        if (Cn(t)) {
          const n = o + Dt(e.readBytes(wn));
          for (let o = 0; o < t.components.length; ++o) {
            const c = t.components[o];
            e.setPosition(n + a);
            const [u, l] = yn(e, c, {
              checksumAddress: r,
              staticPosition: n
            });
            (a += l, s[i ? o : c?.name] = u);
          }
          return (e.setPosition(o + 32), [s, 32]);
        }
        for (let c = 0; c < t.components.length; ++c) {
          const n = t.components[c], [u, l] = yn(e, n, {
            checksumAddress: r,
            staticPosition: o
          });
          (s[i ? c : n?.name] = u, a += l);
        }
        return [s, a];
      })(e, t, {
        checksumAddress: r,
        staticPosition: o
      });
      if ("address" === t.type) return (function (e, t = {}) {
        const {checksum: n = !1} = t, r = e.readBytes(32), o = e => n ? Zt(e) : e;
        return [o(xt.xv(Ft(r, -20))), 32];
      })(e, {
        checksum: r
      });
      if ("bool" === t.type) return (function (e) {
        return [Ut(e.readBytes(32), {
          size: 32
        }), 32];
      })(e);
      if (t.type.startsWith("bytes")) return (function (e, t, {staticPosition: n}) {
        const [r, o] = t.type.split("bytes");
        if (!o) {
          const t = Dt(e.readBytes(32));
          e.setPosition(n + t);
          const r = Dt(e.readBytes(32));
          if (0 === r) return (e.setPosition(n + 32), ["0x", 32]);
          const o = e.readBytes(r);
          return (e.setPosition(n + 32), [xt.xv(o), 32]);
        }
        const i = xt.xv(e.readBytes(Number.parseInt(o, 10), 32));
        return [i, 32];
      })(e, t, {
        staticPosition: o
      });
      if (t.type.startsWith("uint") || t.type.startsWith("int")) return (function (e, t) {
        const n = t.type.startsWith("int"), r = Number.parseInt(t.type.split("int")[1] || "256", 10), o = e.readBytes(32);
        return [r > 48 ? jt(o, {
          signed: n
        }) : Dt(o, {
          signed: n
        }), 32];
      })(e, t);
      if ("string" === t.type) return (function (e, {staticPosition: t}) {
        const n = Dt(e.readBytes(32)), r = t + n;
        e.setPosition(r);
        const o = Dt(e.readBytes(32));
        if (0 === o) return (e.setPosition(t + 32), ["", 32]);
        const i = e.readBytes(o, 32), s = Lt(zt(i));
        return (e.setPosition(t + 32), [s, 32]);
      })(e, {
        staticPosition: o
      });
      throw new Dn(t.type);
    }
    const gn = 32, wn = 32;
    function vn({checksumAddress: e = !1, parameter: t, value: n}) {
      const r = t, o = xn(r.type);
      if (o) {
        const [t, i] = o;
        return (function (e, t) {
          const {checksumAddress: n, length: r, parameter: o} = t, i = null === r;
          if (!Array.isArray(e)) throw new Un(e);
          if (!i && e.length !== r) throw new Rn({
            expectedLength: r,
            givenLength: e.length,
            type: `${o.type}[${r}]`
          });
          let s = !1;
          const a = [];
          for (let c = 0; c < e.length; c++) {
            const t = vn({
              checksumAddress: n,
              parameter: o,
              value: e[c]
            });
            (t.dynamic && (s = !0), a.push(t));
          }
          if (i || s) {
            const e = An(a);
            if (i) {
              const t = xt.xS(a.length, {
                size: 32
              });
              return {
                dynamic: !0,
                encoded: a.length > 0 ? xt.zo(t, e) : t
              };
            }
            if (s) return {
              dynamic: !0,
              encoded: e
            };
          }
          return {
            dynamic: !1,
            encoded: xt.zo(...a.map(({encoded: e}) => e))
          };
        })(n, {
          checksumAddress: e,
          length: t,
          parameter: {
            ...r,
            type: i
          }
        });
      }
      if ("tuple" === r.type) return (function (e, t) {
        const {checksumAddress: n, parameter: r} = t;
        let o = !1;
        const i = [];
        for (let s = 0; s < r.components.length; s++) {
          const t = r.components[s], a = vn({
            checksumAddress: n,
            parameter: t,
            value: e[Array.isArray(e) ? s : t.name]
          });
          (i.push(a), a.dynamic && (o = !0));
        }
        return {
          dynamic: o,
          encoded: o ? An(i) : xt.zo(...i.map(({encoded: e}) => e))
        };
      })(n, {
        checksumAddress: e,
        parameter: r
      });
      if ("address" === r.type) return (function (e, t) {
        const {checksum: n = !1} = t;
        return (Jt(e, {
          strict: n
        }), {
          dynamic: !1,
          encoded: xt.Q_(e.toLowerCase())
        });
      })(n, {
        checksum: e
      });
      if ("bool" === r.type) return (function (e) {
        if ("boolean" !== typeof e) throw new vt.G(`Invalid boolean value: "${e}" (type: ${typeof e}). Expected: \`true\` or \`false\`.`);
        return {
          dynamic: !1,
          encoded: xt.Q_(xt.O3(e))
        };
      })(n);
      if (r.type.startsWith("uint") || r.type.startsWith("int")) {
        const e = r.type.startsWith("int"), [, , t = "256"] = mn.exec(r.type) ?? [];
        return (function (e, {signed: t, size: n}) {
          if ("number" === typeof n) {
            const r = 2n ** (BigInt(n) - (t ? 1n : 0n)) - 1n, o = t ? -r - 1n : 0n;
            if (e > r || e < o) throw new xt.J5({
              max: r.toString(),
              min: o.toString(),
              signed: t,
              size: n / 8,
              value: e.toString()
            });
          }
          return {
            dynamic: !1,
            encoded: xt.xS(e, {
              size: 32,
              signed: t
            })
          };
        })(n, {
          signed: e,
          size: Number(t)
        });
      }
      if (r.type.startsWith("bytes")) return (function (e, {type: t}) {
        const [, n] = t.split("bytes"), r = xt.dp(e);
        if (!n) {
          let t = e;
          return (r % 32 !== 0 && (t = xt.eh(t, 32 * Math.ceil((e.length - 2) / 2 / 32))), {
            dynamic: !0,
            encoded: xt.zo(xt.Q_(xt.xS(r, {
              size: 32
            })), t)
          });
        }
        if (r !== Number.parseInt(n, 10)) throw new Fn({
          expectedSize: Number.parseInt(n, 10),
          value: e
        });
        return {
          dynamic: !1,
          encoded: xt.eh(e)
        };
      })(n, {
        type: r.type
      });
      if ("string" === r.type) return (function (e) {
        const t = xt.mL(e), n = Math.ceil(xt.dp(t) / 32), r = [];
        for (let o = 0; o < n; o++) r.push(xt.eh(xt.tP(t, 32 * o, 32 * (o + 1))));
        return {
          dynamic: !0,
          encoded: xt.zo(xt.eh(xt.xS(xt.dp(t), {
            size: 32
          })), ...r)
        };
      })(n);
      throw new Dn(r.type);
    }
    function An(e) {
      let t = 0;
      for (let i = 0; i < e.length; i++) {
        const {dynamic: n, encoded: r} = e[i];
        t += n ? 32 : xt.dp(r);
      }
      const n = [], r = [];
      let o = 0;
      for (let i = 0; i < e.length; i++) {
        const {dynamic: s, encoded: a} = e[i];
        s ? (n.push(xt.xS(t + o, {
          size: 32
        })), r.push(a), o += xt.dp(a)) : n.push(a);
      }
      return xt.zo(...n, ...r);
    }
    function xn(e) {
      const t = e.match(/^(.*)\[(\d+)?\]$/);
      return t ? [t[2] ? Number(t[2]) : null, t[1]] : void 0;
    }
    function Cn(e) {
      const {type: t} = e;
      if ("string" === t) return !0;
      if ("bytes" === t) return !0;
      if (t.endsWith("[]")) return !0;
      if ("tuple" === t) return e.components?.some(Cn);
      const n = xn(e.type);
      return !(!n || !Cn({
        ...e,
        type: n[1]
      }));
    }
    const Pn = {
      bytes: new Uint8Array(),
      dataView: new DataView(new ArrayBuffer(0)),
      position: 0,
      positionReadCount: new Map(),
      recursiveReadCount: 0,
      recursiveReadLimit: Number.POSITIVE_INFINITY,
      assertReadLimit() {
        if (this.recursiveReadCount >= this.recursiveReadLimit) throw new In({
          count: this.recursiveReadCount + 1,
          limit: this.recursiveReadLimit
        });
      },
      assertPosition(e) {
        if (e < 0 || e > this.bytes.length - 1) throw new kn({
          length: this.bytes.length,
          position: e
        });
      },
      decrementPosition(e) {
        if (e < 0) throw new En({
          offset: e
        });
        const t = this.position - e;
        (this.assertPosition(t), this.position = t);
      },
      getReadCount(e) {
        return this.positionReadCount.get(e || this.position) || 0;
      },
      incrementPosition(e) {
        if (e < 0) throw new En({
          offset: e
        });
        const t = this.position + e;
        (this.assertPosition(t), this.position = t);
      },
      inspectByte(e) {
        const t = e ?? this.position;
        return (this.assertPosition(t), this.bytes[t]);
      },
      inspectBytes(e, t) {
        const n = t ?? this.position;
        return (this.assertPosition(n + e - 1), this.bytes.subarray(n, n + e));
      },
      inspectUint8(e) {
        const t = e ?? this.position;
        return (this.assertPosition(t), this.bytes[t]);
      },
      inspectUint16(e) {
        const t = e ?? this.position;
        return (this.assertPosition(t + 1), this.dataView.getUint16(t));
      },
      inspectUint24(e) {
        const t = e ?? this.position;
        return (this.assertPosition(t + 2), (this.dataView.getUint16(t) << 8) + this.dataView.getUint8(t + 2));
      },
      inspectUint32(e) {
        const t = e ?? this.position;
        return (this.assertPosition(t + 3), this.dataView.getUint32(t));
      },
      pushByte(e) {
        (this.assertPosition(this.position), this.bytes[this.position] = e, this.position++);
      },
      pushBytes(e) {
        (this.assertPosition(this.position + e.length - 1), this.bytes.set(e, this.position), this.position += e.length);
      },
      pushUint8(e) {
        (this.assertPosition(this.position), this.bytes[this.position] = e, this.position++);
      },
      pushUint16(e) {
        (this.assertPosition(this.position + 1), this.dataView.setUint16(this.position, e), this.position += 2);
      },
      pushUint24(e) {
        (this.assertPosition(this.position + 2), this.dataView.setUint16(this.position, e >> 8), this.dataView.setUint8(this.position + 2, 255 & e), this.position += 3);
      },
      pushUint32(e) {
        (this.assertPosition(this.position + 3), this.dataView.setUint32(this.position, e), this.position += 4);
      },
      readByte() {
        (this.assertReadLimit(), this._touch());
        const e = this.inspectByte();
        return (this.position++, e);
      },
      readBytes(e, t) {
        (this.assertReadLimit(), this._touch());
        const n = this.inspectBytes(e);
        return (this.position += t ?? e, n);
      },
      readUint8() {
        (this.assertReadLimit(), this._touch());
        const e = this.inspectUint8();
        return (this.position += 1, e);
      },
      readUint16() {
        (this.assertReadLimit(), this._touch());
        const e = this.inspectUint16();
        return (this.position += 2, e);
      },
      readUint24() {
        (this.assertReadLimit(), this._touch());
        const e = this.inspectUint24();
        return (this.position += 3, e);
      },
      readUint32() {
        (this.assertReadLimit(), this._touch());
        const e = this.inspectUint32();
        return (this.position += 4, e);
      },
      get remaining() {
        return this.bytes.length - this.position;
      },
      setPosition(e) {
        const t = this.position;
        return (this.assertPosition(e), this.position = e, () => this.position = t);
      },
      _touch() {
        if (this.recursiveReadLimit === Number.POSITIVE_INFINITY) return;
        const e = this.getReadCount();
        (this.positionReadCount.set(this.position, e + 1), e > 0 && this.recursiveReadCount++);
      }
    };
    class En extends vt.G {
      constructor({offset: e}) {
        (super(`Offset \`${e}\` cannot be negative.`), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Cursor.NegativeOffsetError"
        }));
      }
    }
    class kn extends vt.G {
      constructor({length: e, position: t}) {
        (super(`Position \`${t}\` is out of bounds (\`0 < position < ${e}\`).`), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Cursor.PositionOutOfBoundsError"
        }));
      }
    }
    class In extends vt.G {
      constructor({count: e, limit: t}) {
        (super(`Recursive read limit of \`${t}\` exceeded (recursive read count: \`${e}\`).`), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Cursor.RecursiveReadLimitExceededError"
        }));
      }
    }
    function Bn(e, t, n = {}) {
      const {as: r = "Array", checksumAddress: o = !1} = n, i = "string" === typeof t ? Tt(t) : t, s = (function (e, {recursiveReadLimit: t = 8192} = {}) {
        const n = Object.create(Pn);
        return (n.bytes = e, n.dataView = new DataView(e.buffer, e.byteOffset, e.byteLength), n.positionReadCount = new Map(), n.recursiveReadLimit = t, n);
      })(i);
      if (0 === Rt(i) && e.length > 0) throw new Nn();
      if (Rt(i) && Rt(i) < 32) throw new Tn({
        data: "string" === typeof t ? t : xt.xv(t),
        parameters: e,
        size: Rt(i)
      });
      let a = 0;
      const c = "Array" === r ? [] : {};
      for (let u = 0; u < e.length; ++u) {
        const t = e[u];
        s.setPosition(a);
        const [n, i] = yn(s, t, {
          checksumAddress: o,
          staticPosition: 0
        });
        (a += i, "Array" === r ? c.push(n) : c[t.name ?? u] = n);
      }
      return c;
    }
    function Sn(e, t, n) {
      const {checksumAddress: r = !1} = n ?? ({});
      if (e.length !== t.length) throw new jn({
        expectedLength: e.length,
        givenLength: t.length
      });
      const o = (function ({checksumAddress: e, parameters: t, values: n}) {
        const r = [];
        for (let o = 0; o < t.length; o++) r.push(vn({
          checksumAddress: e,
          parameter: t[o],
          value: n[o]
        }));
        return r;
      })({
        checksumAddress: r,
        parameters: e,
        values: t
      }), i = An(o);
      return 0 === i.length ? "0x" : i;
    }
    function On(e, t) {
      if (e.length !== t.length) throw new jn({
        expectedLength: e.length,
        givenLength: t.length
      });
      const n = [];
      for (let r = 0; r < e.length; r++) {
        const o = e[r], i = t[r];
        n.push(On.encode(o, i));
      }
      return xt.zo(...n);
    }
    function Mn(e) {
      return Array.isArray(e) && "string" === typeof e[0] || "string" === typeof e ? fn(e) : e;
    }
    !(function (e) {
      e.encode = function e(t, n, r = !1) {
        if ("address" === t) {
          const e = n;
          return (Jt(e), xt.Q_(e.toLowerCase(), r ? 32 : 0));
        }
        if ("string" === t) return xt.mL(n);
        if ("bytes" === t) return n;
        if ("bool" === t) return xt.Q_(xt.O3(n), r ? 32 : 1);
        const o = t.match(mn);
        if (o) {
          const [e, t, i = "256"] = o, s = Number.parseInt(i, 10) / 8;
          return xt.xS(n, {
            size: r ? 32 : s,
            signed: "int" === t
          });
        }
        const i = t.match(pn);
        if (i) {
          const [e, t] = i;
          if (Number.parseInt(t, 10) !== (n.length - 2) / 2) throw new Fn({
            expectedSize: Number.parseInt(t, 10),
            value: n
          });
          return xt.eh(n, r ? 32 : 0);
        }
        const s = t.match(hn);
        if (s && Array.isArray(n)) {
          const [t, r] = s, o = [];
          for (let i = 0; i < n.length; i++) o.push(e(r, n[i], !0));
          return 0 === o.length ? "0x" : xt.zo(...o);
        }
        throw new Dn(t);
      };
    })(On || (On = {}));
    class Tn extends vt.G {
      constructor({data: e, parameters: t, size: n}) {
        (super(`Data size of ${n} bytes is too small for given parameters.`, {
          metaMessages: [`Params: (${gt(t)})`, `Data:   ${e} (${n} bytes)`]
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "AbiParameters.DataSizeTooSmallError"
        }));
      }
    }
    class Nn extends vt.G {
      constructor() {
        (super("Cannot decode zero data (\"0x\") with ABI parameters."), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "AbiParameters.ZeroDataError"
        }));
      }
    }
    class Rn extends vt.G {
      constructor({expectedLength: e, givenLength: t, type: n}) {
        (super(`Array length mismatch for type \`${n}\`. Expected: \`${e}\`. Given: \`${t}\`.`), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "AbiParameters.ArrayLengthMismatchError"
        }));
      }
    }
    class Fn extends vt.G {
      constructor({expectedSize: e, value: t}) {
        (super(`Size of bytes "${t}" (bytes${xt.dp(t)}) does not match expected size (bytes${e}).`), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "AbiParameters.BytesSizeMismatchError"
        }));
      }
    }
    class jn extends vt.G {
      constructor({expectedLength: e, givenLength: t}) {
        (super(["ABI encoding parameters/values length mismatch.", `Expected length (parameters): ${e}`, `Given length (values): ${t}`].join("\n")), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "AbiParameters.LengthMismatchError"
        }));
      }
    }
    class Un extends vt.G {
      constructor(e) {
        (super(`Value \`${e}\` is not a valid array.`), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "AbiParameters.InvalidArrayError"
        }));
      }
    }
    class Dn extends vt.G {
      constructor(e) {
        (super(`Type \`${e}\` is not a valid ABI Type.`), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "AbiParameters.InvalidTypeError"
        }));
      }
    }
    function Ln(e) {
      const t = e.find(e => "constructor" === e.type);
      if (!t) throw new dn({
        name: "constructor"
      });
      return t;
    }
    function zn(...e) {
      const [t, n = []] = (() => {
        if (Array.isArray(e[0])) {
          const [t, n, r] = e;
          return [Gn(t, n, {
            args: r
          }), r];
        }
        const [t, n] = e;
        return [t, n];
      })(), {overloads: r} = t, o = r ? Gn([t, ...r], t.name, {
        args: n
      }) : t, i = cn(o);
      const s = n.length > 0 ? Sn(o.inputs, n) : void 0;
      return s ? xt.zo(i, s) : i;
    }
    function qn(e, t = {}) {
      return sn(e, t);
    }
    function Gn(e, t, n) {
      const r = an(e, t, n);
      if ("function" !== r.type) throw new dn({
        name: t,
        type: "function"
      });
      return r;
    }
    const Qn = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", _n = "0x0000000000000000000000000000000000000000";
    var Wn = n(45434);
    const $n = "0x6080604052348015600e575f80fd5b5061016d8061001c5f395ff3fe608060405234801561000f575f80fd5b5060043610610029575f3560e01c8063f8b2cb4f1461002d575b5f80fd5b610047600480360381019061004291906100db565b61005d565b604051610054919061011e565b60405180910390f35b5f8173ffffffffffffffffffffffffffffffffffffffff16319050919050565b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6100aa82610081565b9050919050565b6100ba816100a0565b81146100c4575f80fd5b50565b5f813590506100d5816100b1565b92915050565b5f602082840312156100f0576100ef61007d565b5b5f6100fd848285016100c7565b91505092915050565b5f819050919050565b61011881610106565b82525050565b5f6020820190506101315f83018461010f565b9291505056fea26469706673582212203b9fe929fe995c7cf9887f0bdba8a36dd78e8b73f149b17d2d9ad7cd09d2dc6264736f6c634300081a0033";
    async function Hn(e, t) {
      const {blockNumber: n, blockTag: r, calls: o, stateOverrides: s, traceAssetChanges: a, traceTransfers: c, validation: u} = t, l = t.account ? (0, w.T)(t.account) : void 0;
      if (a && !l) throw new I.G("`account` is required when `traceAssetChanges` is true");
      const d = l ? (function (...e) {
        const [t, n] = (() => {
          if (Array.isArray(e[0])) {
            const [t, n] = e;
            return [Ln(t), n];
          }
          return e;
        })(), {bytecode: r, args: o} = n;
        return xt.zo(r, t.inputs?.length && o?.length ? Sn(t.inputs, o) : "0x");
      })(sn("constructor(bytes, bytes)"), {
        bytecode: Wn.NO,
        args: [$n, zn(qn("function getBalance(address)"), [l.address])]
      }) : void 0;
      const f = a ? await Promise.all(t.calls.map(async t => {
        if (!t.data && !t.abi) return;
        const {accessList: n} = await P(e, {
          account: l.address,
          ...t,
          data: t.abi ? (0, i.R)(t) : t.data
        });
        return n.map(({address: e, storageKeys: t}) => t.length > 0 ? e : null);
      })).then(e => e.flat().filter(Boolean)) : [], h = await Ee(e, {
        blockNumber: n,
        blockTag: r,
        blocks: [...a ? [{
          calls: [{
            data: d
          }],
          stateOverrides: s
        }, {
          calls: f.map((e, t) => ({
            abi: [qn("function balanceOf(address) returns (uint256)")],
            functionName: "balanceOf",
            args: [l.address],
            to: e,
            from: _n,
            nonce: t
          })),
          stateOverrides: [{
            address: _n,
            nonce: 0
          }]
        }] : [], {
          calls: [...o, {}].map(e => ({
            ...e,
            from: l?.address
          })),
          stateOverrides: s
        }, ...a ? [{
          calls: [{
            data: d
          }]
        }, {
          calls: f.map((e, t) => ({
            abi: [qn("function balanceOf(address) returns (uint256)")],
            functionName: "balanceOf",
            args: [l.address],
            to: e,
            from: _n,
            nonce: t
          })),
          stateOverrides: [{
            address: _n,
            nonce: 0
          }]
        }, {
          calls: f.map((e, t) => ({
            to: e,
            abi: [qn("function decimals() returns (uint256)")],
            functionName: "decimals",
            from: _n,
            nonce: t
          })),
          stateOverrides: [{
            address: _n,
            nonce: 0
          }]
        }, {
          calls: f.map((e, t) => ({
            to: e,
            abi: [qn("function tokenURI(uint256) returns (string)")],
            functionName: "tokenURI",
            args: [0n],
            from: _n,
            nonce: t
          })),
          stateOverrides: [{
            address: _n,
            nonce: 0
          }]
        }, {
          calls: f.map((e, t) => ({
            to: e,
            abi: [qn("function symbol() returns (string)")],
            functionName: "symbol",
            from: _n,
            nonce: t
          })),
          stateOverrides: [{
            address: _n,
            nonce: 0
          }]
        }] : []],
        traceTransfers: c,
        validation: u
      }), p = a ? h[2] : h[0], [m, b, , y, g, v, A, x] = a ? h : [], {calls: C, ...E} = p, k = C.slice(0, -1) ?? [], B = [...m?.calls ?? [], ...b?.calls ?? []].map(e => "success" === e.status ? (0, K.y_)(e.data) : null), S = [...y?.calls ?? [], ...g?.calls ?? []].map(e => "success" === e.status ? (0, K.y_)(e.data) : null), O = (v?.calls ?? []).map(e => "success" === e.status ? e.result : null), M = (x?.calls ?? []).map(e => "success" === e.status ? e.result : null), T = (A?.calls ?? []).map(e => "success" === e.status ? e.result : null), N = [];
      for (const [i, w] of S.entries()) {
        const e = B[i];
        if ("bigint" !== typeof w) continue;
        if ("bigint" !== typeof e) continue;
        const t = O[i - 1], n = M[i - 1], r = T[i - 1], o = 0 === i ? {
          address: Qn,
          decimals: 18,
          symbol: "ETH"
        } : {
          address: f[i - 1],
          decimals: r || t ? Number(t ?? 1) : void 0,
          symbol: n ?? void 0
        };
        N.some(e => e.token.address === o.address) || N.push({
          token: o,
          value: {
            pre: e,
            post: w,
            diff: w - e
          }
        });
      }
      return {
        assetChanges: N,
        block: E,
        results: k
      };
    }
    async function Kn(e, {filter: t}) {
      return t.request({
        method: "eth_uninstallFilter",
        params: [t.id]
      });
    }
    const Vn = "0x6492649264926492649264926492649264926492649264926492649264926492";
    function Jn(e) {
      if (xt.tP(e, -32) !== Vn) throw new Zn(e);
    }
    class Zn extends vt.G {
      constructor(e) {
        (super(`Value \`${e}\` is an invalid ERC-6492 wrapped signature.`), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "SignatureErc6492.InvalidWrappedSignatureError"
        }));
      }
    }
    function Yn(e, t = {}) {
      const {recovered: n} = t;
      if ("undefined" === typeof e.r) throw new rr({
        signature: e
      });
      if ("undefined" === typeof e.s) throw new rr({
        signature: e
      });
      if (n && "undefined" === typeof e.yParity) throw new rr({
        signature: e
      });
      if (e.r < 0n || e.r > bn) throw new or({
        value: e.r
      });
      if (e.s < 0n || e.s > bn) throw new ir({
        value: e.s
      });
      if ("number" === typeof e.yParity && 0 !== e.yParity && 1 !== e.yParity) throw new sr({
        value: e.yParity
      });
    }
    function Xn(e) {
      if (130 !== e.length && 132 !== e.length) throw new nr({
        signature: e
      });
      const t = BigInt(xt.tP(e, 0, 32)), n = BigInt(xt.tP(e, 32, 64)), r = (() => {
        const t = Number(`0x${e.slice(130)}`);
        if (!Number.isNaN(t)) try {
          return tr(t);
        } catch {
          throw new sr({
            value: t
          });
        }
      })();
      return "undefined" === typeof r ? {
        r: t,
        s: n
      } : {
        r: t,
        s: n,
        yParity: r
      };
    }
    function er(e) {
      const t = "string" === typeof e ? Xn(e) : e instanceof Uint8Array ? (function (e) {
        return Xn(xt.xv(e));
      })(e) : "string" === typeof e.r ? (function (e) {
        const t = (() => {
          const t = e.v ? Number(e.v) : void 0;
          let n = e.yParity ? Number(e.yParity) : void 0;
          if (("number" === typeof t && "number" !== typeof n && (n = tr(t)), "number" !== typeof n)) throw new sr({
            value: e.yParity
          });
          return n;
        })();
        return {
          r: BigInt(e.r),
          s: BigInt(e.s),
          yParity: t
        };
      })(e) : e.v ? (function (e) {
        return {
          r: e.r,
          s: e.s,
          yParity: tr(e.v)
        };
      })(e) : {
        r: e.r,
        s: e.s,
        ..."undefined" !== typeof e.yParity ? {
          yParity: e.yParity
        } : {}
      };
      return (Yn(t), t);
    }
    function tr(e) {
      if (0 === e || 27 === e) return 0;
      if (1 === e || 28 === e) return 1;
      if (e >= 35) return e % 2 === 0 ? 1 : 0;
      throw new ar({
        value: e
      });
    }
    class nr extends vt.G {
      constructor({signature: e}) {
        (super(`Value \`${e}\` is an invalid signature size.`, {
          metaMessages: ["Expected: 64 bytes or 65 bytes.", `Received ${xt.dp(xt.Dp(e))} bytes.`]
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Signature.InvalidSerializedSizeError"
        }));
      }
    }
    class rr extends vt.G {
      constructor({signature: e}) {
        (super(`Signature \`${Bt.P(e)}\` is missing either an \`r\`, \`s\`, or \`yParity\` property.`), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Signature.MissingPropertiesError"
        }));
      }
    }
    class or extends vt.G {
      constructor({value: e}) {
        (super(`Value \`${e}\` is an invalid r value. r must be a positive integer less than 2^256.`), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Signature.InvalidRError"
        }));
      }
    }
    class ir extends vt.G {
      constructor({value: e}) {
        (super(`Value \`${e}\` is an invalid s value. s must be a positive integer less than 2^256.`), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Signature.InvalidSError"
        }));
      }
    }
    class sr extends vt.G {
      constructor({value: e}) {
        (super(`Value \`${e}\` is an invalid y-parity value. Y-parity must be 0 or 1.`), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Signature.InvalidYParityError"
        }));
      }
    }
    class ar extends vt.G {
      constructor({value: e}) {
        (super(`Value \`${e}\` is an invalid v value. v must be 27, 28 or >=35.`), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Signature.InvalidVError"
        }));
      }
    }
    function cr(e, t = {}) {
      return "string" === typeof e.chainId ? ur(e) : {
        ...e,
        ...t.signature
      };
    }
    function ur(e) {
      const {address: t, chainId: n, nonce: r} = e, o = (function (e) {
        if ("undefined" !== typeof e.r && "undefined" !== typeof e.s) return er(e);
      })(e);
      return {
        address: t,
        chainId: Number(n),
        nonce: BigInt(r),
        ...o
      };
    }
    const lr = "0x8010801080108010801080108010801080108010801080108010801080108010", dr = Mn("(uint256 chainId, address delegation, uint256 nonce, uint8 yParity, uint256 r, uint256 s), address to, bytes data");
    function fr(e) {
      if ("string" === typeof e) {
        if (xt.tP(e, -32) !== lr) throw new pr(e);
      } else Yn(e.authorization);
    }
    function hr(e) {
      fr(e);
      const t = xt.He(xt.tP(e, -64, -32)), n = xt.tP(e, -t - 64, -64), r = xt.tP(e, 0, -t - 64), [o, i, s] = Bn(dr, n);
      return {
        authorization: cr({
          address: o.delegation,
          chainId: Number(o.chainId),
          nonce: o.nonce,
          yParity: o.yParity,
          r: o.r,
          s: o.s
        }),
        signature: r,
        ...s && "0x" !== s ? {
          data: s,
          to: i
        } : {}
      };
    }
    class pr extends vt.G {
      constructor(e) {
        (super(`Value \`${e}\` is an invalid ERC-8010 wrapped signature.`), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "SignatureErc8010.InvalidWrappedSignatureError"
        }));
      }
    }
    var mr = n(23010), br = n(31669), yr = n(95048);
    var gr = n(93610), wr = n(69021), vr = n(69663);
    async function Ar(e, t) {
      const {address: n, hash: o, erc6492VerifierAddress: s = t.universalSignatureVerifierAddress ?? e.chain?.contracts?.erc6492Verifier?.address, multicallAddress: a = t.multicallAddress ?? e.chain?.contracts?.multicall3?.address} = t, u = (() => {
        const e = t.signature;
        return (0, gr.v)(e) ? e : "object" === typeof e && ("r" in e) && ("s" in e) ? (function ({r: e, s: t, to: n = "hex", v: r, yParity: o}) {
          const i = (() => {
            if (0 === o || 1 === o) return o;
            if (r && (27n === r || 28n === r || r >= 35n)) return r % 2n === 0n ? 1 : 0;
            throw new Error("Invalid `v` or `yParity` value");
          })(), s = `0x${new vr.secp256k1.Signature((0, K.y_)(e), (0, K.y_)(t)).toCompactHex()}${0 === i ? "1b" : "1c"}`;
          return "hex" === n ? s : (0, S.nr)(s);
        })(e) : (0, c.ci)(e);
      })();
      try {
        return (function (e) {
          try {
            return (fr(e), !0);
          } catch {
            return !1;
          }
        })(u) ? await (async function (e, t) {
          const {address: n, blockNumber: o, blockTag: s, hash: a, multicallAddress: u} = t, {authorization: l, data: d, signature: f, to: m} = hr(t.signature), b = await (0, J.C)(e, {
            address: n,
            blockNumber: o,
            blockTag: s
          });
          if (b === (0, Ae.SM)(["0xef0100", l.address])) return await (async function (e, t) {
            const {address: n, blockNumber: o, blockTag: i, hash: s, signature: a} = t, c = await (0, h.s)(e, p.L, "readContract")({
              address: n,
              abi: r._A,
              args: [s, a],
              blockNumber: o,
              blockTag: i,
              functionName: "isValidSignature"
            }).catch(e => {
              if (e instanceof we.uq) throw new xr();
              throw e;
            });
            if (c.startsWith("0x1626ba7e")) return !0;
            throw new xr();
          })(e, {
            address: n,
            blockNumber: o,
            blockTag: s,
            hash: a,
            signature: f
          });
          const y = {
            address: l.address,
            chainId: Number(l.chainId),
            nonce: Number(l.nonce),
            r: (0, c.eC)(l.r, {
              size: 32
            }),
            s: (0, c.eC)(l.s, {
              size: 32
            }),
            yParity: l.yParity
          }, g = await (async function ({address: e, authorization: t, signature: n}) {
            return (0, Z.E)((0, br.K)(e), await (0, yr.z)({
              authorization: t,
              signature: n
            }));
          })({
            address: n,
            authorization: y
          });
          if (!g) throw new xr();
          const w = await (0, h.s)(e, p.L, "readContract")({
            ...u ? {
              address: u
            } : {
              code: Wn.xd
            },
            authorizationList: [y],
            abi: r.F8,
            blockNumber: o,
            blockTag: "pending",
            functionName: "aggregate3",
            args: [[...d ? [{
              allowFailure: !0,
              target: m ?? n,
              callData: d
            }] : [], {
              allowFailure: !0,
              target: n,
              callData: (0, i.R)({
                abi: r._A,
                functionName: "isValidSignature",
                args: [a, f]
              })
            }]]
          }), v = w[w.length - 1]?.returnData;
          if (v?.startsWith("0x1626ba7e")) return !0;
          throw new xr();
        })(e, {
          ...t,
          multicallAddress: a,
          signature: u
        }) : await (async function (e, t) {
          const {address: n, factory: o, factoryData: s, hash: a, signature: c, verifierAddress: u, ...l} = t, d = await (async () => o || s ? (function (e) {
            try {
              return (Jn(e), !0);
            } catch {
              return !1;
            }
          })(c) ? c : (function (e) {
            const {data: t, signature: n, to: r} = e;
            return xt.zo(Sn(Mn("address, bytes, bytes"), [r, t, n]), Vn);
          })({
            data: s,
            signature: c,
            to: o
          }) : c)(), f = u ? {
            to: u,
            data: (0, i.R)({
              abi: r.MR,
              functionName: "isValidSig",
              args: [n, a, d]
            }),
            ...l
          } : {
            data: (0, mr.w)({
              abi: r.MR,
              args: [n, a, d],
              bytecode: Wn.de
            }),
            ...l
          }, {data: p} = await (0, h.s)(e, g.R, "call")(f).catch(e => {
            if (e instanceof we.cg) throw new xr();
            throw e;
          });
          if ((0, K.XA)(p ?? "0x0")) return !0;
          throw new xr();
        })(e, {
          ...t,
          verifierAddress: s,
          signature: u
        });
      } catch (l) {
        try {
          if ((0, Z.E)((0, br.K)(n), await (0, wr.R)({
            hash: o,
            signature: u
          }))) return !0;
        } catch {}
        if (l instanceof xr) return !1;
        throw l;
      }
    }
    class xr extends Error {}
    var Cr = n(15566);
    var Pr = n(86044);
    var Er = n(67348), kr = n(99376), Ir = n(36478), Br = n(41495), Sr = n(31853);
    var Or = n(77014);
    const Mr = /^(?:(?<scheme>[a-zA-Z][a-zA-Z0-9+-.]*):\/\/)?(?<domain>[a-zA-Z0-9+-.]*(?::[0-9]{1,5})?) (?:wants you to sign in with your Ethereum account:\n)(?<address>0x[a-fA-F0-9]{40})\n\n(?:(?<statement>.*)\n\n)?/, Tr = /(?:URI: (?<uri>.+))\n(?:Version: (?<version>.+))\n(?:Chain ID: (?<chainId>\d+))\n(?:Nonce: (?<nonce>[a-zA-Z0-9]+))\n(?:Issued At: (?<issuedAt>.+))(?:\nExpiration Time: (?<expirationTime>.+))?(?:\nNot Before: (?<notBefore>.+))?(?:\nRequest ID: (?<requestId>.+))?/;
    var Nr = n(4012);
    async function Rr(e, t) {
      const {address: n, domain: r, message: o, nonce: i, scheme: s, signature: a, time: c = new Date(), ...u} = t, l = (function (e) {
        const {scheme: t, statement: n, ...r} = e.match(Mr)?.groups ?? ({}), {chainId: o, expirationTime: i, issuedAt: s, notBefore: a, requestId: c, ...u} = e.match(Tr)?.groups ?? ({}), l = e.split("Resources:")[1]?.split("\n- ").slice(1);
        return {
          ...r,
          ...u,
          ...o ? {
            chainId: Number(o)
          } : {},
          ...i ? {
            expirationTime: new Date(i)
          } : {},
          ...s ? {
            issuedAt: new Date(s)
          } : {},
          ...a ? {
            notBefore: new Date(a)
          } : {},
          ...c ? {
            requestId: c
          } : {},
          ...l ? {
            resources: l
          } : {},
          ...t ? {
            scheme: t
          } : {},
          ...n ? {
            statement: n
          } : {}
        };
      })(o);
      if (!l.address) return !1;
      const d = (function (e) {
        const {address: t, domain: n, message: r, nonce: o, scheme: i, time: s = new Date()} = e;
        if (n && r.domain !== n) return !1;
        if (o && r.nonce !== o) return !1;
        if (i && r.scheme !== i) return !1;
        if (r.expirationTime && s >= r.expirationTime) return !1;
        if (r.notBefore && s < r.notBefore) return !1;
        try {
          if (!r.address) return !1;
          if (!(0, Nr.U)(r.address, {
            strict: !1
          })) return !1;
          if (t && !(0, Z.E)(r.address, t)) return !1;
        } catch {
          return !1;
        }
        return !0;
      })({
        address: n,
        domain: r,
        message: l,
        nonce: i,
        scheme: s,
        time: c
      });
      if (!d) return !1;
      const f = (0, Cr.r)(o);
      return Ar(e, {
        address: l.address,
        hash: f,
        signature: a,
        ...u
      });
    }
    var Fr = n(86048), jr = n(9769), Ur = n(63228), Dr = n(13550);
    function Lr(e) {
      return {
        call: t => (0, g.R)(e, t),
        createAccessList: t => P(e, t),
        createBlockFilter: () => (async function (e) {
          const t = E(e, {
            method: "eth_newBlockFilter"
          }), n = await e.request({
            method: "eth_newBlockFilter"
          });
          return {
            id: n,
            request: t(n),
            type: "block"
          };
        })(e),
        createContractEventFilter: t => D(e, t),
        createEventFilter: t => L(e, t),
        createPendingTransactionFilter: () => z(e),
        estimateContractGas: t => (async function (e, t) {
          const {abi: n, address: r, args: o, functionName: s, dataSuffix: a, ...c} = t, u = (0, i.R)({
            abi: n,
            args: o,
            functionName: s
          });
          try {
            return await (0, h.s)(e, G.Q, "estimateGas")({
              data: `${u}${a ? a.replace("0x", "") : ""}`,
              to: r,
              ...c
            });
          } catch (l) {
            const e = c.account ? (0, w.T)(c.account) : void 0;
            throw (0, q.S)(l, {
              abi: n,
              address: r,
              args: o,
              docsPath: "/docs/contract/estimateContractGas",
              functionName: s,
              sender: e?.address
            });
          }
        })(e, t),
        estimateGas: t => (0, G.Q)(e, t),
        getBalance: t => (0, W.s)(e, t),
        getBlobBaseFee: () => (async function (e) {
          const t = await e.request({
            method: "eth_blobBaseFee"
          });
          return BigInt(t);
        })(e),
        getBlock: t => (0, $.Q)(e, t),
        getBlockNumber: t => (0, H.z)(e, t),
        getBlockTransactionCount: t => (async function (e, {blockHash: t, blockNumber: n, blockTag: r = "latest"} = {}) {
          const o = void 0 !== n ? (0, c.eC)(n) : void 0;
          let i;
          return (i = t ? await e.request({
            method: "eth_getBlockTransactionCountByHash",
            params: [t]
          }, {
            dedupe: !0
          }) : await e.request({
            method: "eth_getBlockTransactionCountByNumber",
            params: [o || r]
          }, {
            dedupe: Boolean(o)
          }), (0, K.ly)(i));
        })(e, t),
        getBytecode: t => (0, J.C)(e, t),
        getChainId: () => (0, V.L)(e),
        getCode: t => (0, J.C)(e, t),
        getContractEvents: t => ae(e, t),
        getEip712Domain: t => (async function (e, t) {
          const {address: n, factory: r, factoryData: o} = t;
          try {
            const [t, i, s, a, c, u, l] = await (0, h.s)(e, p.L, "readContract")({
              abi: ue,
              address: n,
              functionName: "eip712Domain",
              factory: r,
              factoryData: o
            });
            return {
              domain: {
                name: i,
                version: s,
                chainId: Number(a),
                verifyingContract: c,
                salt: u
              },
              extensions: l,
              fields: t
            };
          } catch (i) {
            const e = i;
            if ("ContractFunctionExecutionError" === e.name && "ContractFunctionZeroDataError" === e.cause.name) throw new ce({
              address: n
            });
            throw e;
          }
        })(e, t),
        getEnsAddress: t => (async function (e, t) {
          const {blockNumber: n, blockTag: m, coinType: b, name: y, gatewayUrls: g, strict: w} = t, {chain: v} = e, A = (() => {
            if (t.universalResolverAddress) return t.universalResolverAddress;
            if (!v) throw new Error("client chain not configured. universalResolverAddress is required.");
            return (0, s.L)({
              blockNumber: n,
              chain: v,
              contract: "ensUniversalResolver"
            });
          })(), x = v?.ensTlds;
          if (x && !x.some(e => y.endsWith(e))) return null;
          const C = null != b ? [(0, d.V)(y), BigInt(b)] : [(0, d.V)(y)];
          try {
            const t = (0, i.R)({
              abi: r.X$,
              functionName: "addr",
              args: C
            }), s = {
              address: A,
              abi: r.k3,
              functionName: "resolveWithGateways",
              args: [(0, c.NC)((0, f.T)(y)), t, g ?? [l.M]],
              blockNumber: n,
              blockTag: m
            }, u = (0, h.s)(e, p.L, "readContract"), d = await u(s);
            if ("0x" === d[0]) return null;
            const b = (0, o.k)({
              abi: r.X$,
              args: C,
              functionName: "addr",
              data: d[0]
            });
            return "0x" === b || "0x00" === (0, a.f)(b) ? null : b;
          } catch (P) {
            if (w) throw P;
            if ((0, u.c)(P)) return null;
            throw P;
          }
        })(e, t),
        getEnsAvatar: t => (0, m.r)(e, t),
        getEnsName: t => (0, b.w)(e, t),
        getEnsResolver: t => (async function (e, t) {
          const {blockNumber: n, blockTag: r, name: o} = t, {chain: i} = e, a = (() => {
            if (t.universalResolverAddress) return t.universalResolverAddress;
            if (!i) throw new Error("client chain not configured. universalResolverAddress is required.");
            return (0, s.L)({
              blockNumber: n,
              chain: i,
              contract: "ensUniversalResolver"
            });
          })(), u = i?.ensTlds;
          if (u && !u.some(e => o.endsWith(e))) throw new Error(`${o} is not a valid ENS TLD (${u?.join(", ")}) for chain "${i.name}" (id: ${i.id}).`);
          const [l] = await (0, h.s)(e, p.L, "readContract")({
            address: a,
            abi: [{
              inputs: [{
                type: "bytes"
              }],
              name: "findResolver",
              outputs: [{
                type: "address"
              }, {
                type: "bytes32"
              }, {
                type: "uint256"
              }],
              stateMutability: "view",
              type: "function"
            }],
            functionName: "findResolver",
            args: [(0, c.NC)((0, f.T)(o))],
            blockNumber: n,
            blockTag: r
          });
          return l;
        })(e, t),
        getEnsText: t => (0, y.g)(e, t),
        getFeeHistory: t => le(e, t),
        estimateFeesPerGas: t => (0, Q.X)(e, t),
        getFilterChanges: e => de(0, e),
        getFilterLogs: e => (async function (e, {filter: t}) {
          const n = t.strict ?? !1, r = (await t.request({
            method: "eth_getFilterLogs",
            params: [t.id]
          })).map(e => (0, ie.U)(e));
          return t.abi ? oe({
            abi: t.abi,
            logs: r,
            strict: n
          }) : r;
        })(0, e),
        getGasPrice: () => (0, fe.o)(e),
        getLogs: t => se(e, t),
        getProof: t => he(e, t),
        estimateMaxPriorityFeePerGas: t => (0, _._)(e, t),
        getStorageAt: t => (async function (e, {address: t, blockNumber: n, blockTag: r = "latest", slot: o}) {
          const i = void 0 !== n ? (0, c.eC)(n) : void 0;
          return await e.request({
            method: "eth_getStorageAt",
            params: [t, o, i || r]
          });
        })(e, t),
        getTransaction: t => (0, pe.f)(e, t),
        getTransactionConfirmations: t => (async function (e, {hash: t, transactionReceipt: n}) {
          const [r, o] = await Promise.all([(0, h.s)(e, H.z, "getBlockNumber")({}), t ? (0, h.s)(e, pe.f, "getTransaction")({
            hash: t
          }) : void 0]), i = n?.blockNumber || o?.blockNumber;
          return i ? r - i + 1n : 0n;
        })(e, t),
        getTransactionCount: t => (0, me.K)(e, t),
        getTransactionReceipt: t => (0, be.a)(e, t),
        multicall: t => (0, ye.A)(e, t),
        prepareTransactionRequest: t => (0, Fr.ZE)(e, t),
        readContract: t => (0, p.L)(e, t),
        sendRawTransaction: t => (0, jr.p)(e, t),
        sendRawTransactionSync: t => (async function (e, {serializedTransaction: t, throwOnReceiptRevert: n, timeout: r}) {
          const o = await e.request({
            method: "eth_sendRawTransactionSync",
            params: r ? [t, (0, c.eC)(r)] : [t]
          }, {
            retryCount: 0
          }), i = (e.chain?.formatters?.transactionReceipt?.format || Dr.fA)(o);
          if ("reverted" === i.status && n) throw new Ur.A3({
            receipt: i
          });
          return i;
        })(e, t),
        simulate: t => Ee(e, t),
        simulateBlocks: t => Ee(e, t),
        simulateCalls: t => Hn(e, t),
        simulateContract: t => (async function (e, t) {
          const {abi: n, address: r, args: s, dataSuffix: a, functionName: c, ...u} = t, l = u.account ? (0, w.T)(u.account) : e.account, d = (0, i.R)({
            abi: n,
            args: s,
            functionName: c
          });
          try {
            const {data: i} = await (0, h.s)(e, g.R, "call")({
              batch: !1,
              data: `${d}${a ? a.replace("0x", "") : ""}`,
              to: r,
              ...u,
              account: l
            });
            return {
              result: (0, o.k)({
                abi: n,
                args: s,
                functionName: c,
                data: i || "0x"
              }),
              request: {
                abi: n.filter(e => ("name" in e) && e.name === t.functionName),
                address: r,
                args: s,
                dataSuffix: a,
                functionName: c,
                ...u,
                account: l
              }
            };
          } catch (f) {
            throw (0, q.S)(f, {
              abi: n,
              address: r,
              args: s,
              docsPath: "/docs/contract/simulateContract",
              functionName: c,
              sender: l?.address
            });
          }
        })(e, t),
        verifyHash: t => Ar(e, t),
        verifyMessage: t => (async function (e, {address: t, message: n, factory: r, factoryData: o, signature: i, ...s}) {
          return Ar(e, {
            address: t,
            factory: r,
            factoryData: o,
            hash: (0, Cr.r)(n),
            signature: i,
            ...s
          });
        })(e, t),
        verifySiweMessage: t => Rr(e, t),
        verifyTypedData: t => (async function (e, t) {
          const {address: n, factory: r, factoryData: o, signature: i, message: s, primaryType: a, types: c, domain: u, ...l} = t;
          return Ar(e, {
            address: n,
            factory: r,
            factoryData: o,
            hash: (0, Pr.Jv)({
              message: s,
              primaryType: a,
              types: c,
              domain: u
            }),
            signature: i,
            ...l
          });
        })(e, t),
        uninstallFilter: e => Kn(0, e),
        waitForTransactionReceipt: t => (0, Er.e)(e, t),
        watchBlocks: t => (function (e, {blockTag: t = e.experimental_blockTag ?? "latest", emitMissed: n = !1, emitOnBegin: r = !1, onBlock: o, onError: i, includeTransactions: s, poll: a, pollingInterval: c = e.pollingInterval}) {
          const u = "undefined" !== typeof a ? a : "webSocket" !== e.transport.type && "ipc" !== e.transport.type && ("fallback" !== e.transport.type || "webSocket" !== e.transport.transports[0].config.type && "ipc" !== e.transport.transports[0].config.type), l = s ?? !1;
          let d;
          return u ? (() => {
            const s = (0, Sr.P)(["watchBlocks", e.uid, t, n, r, l, c]);
            return (0, Ir.N7)(s, {
              onBlock: o,
              onError: i
            }, o => (0, Br.$)(async () => {
              try {
                const r = await (0, h.s)(e, $.Q, "getBlock")({
                  blockTag: t,
                  includeTransactions: l
                });
                if (null !== r.number && null != d?.number) {
                  if (r.number === d.number) return;
                  if (r.number - d.number > 1 && n) for (let t = d?.number + 1n; t < r.number; t++) {
                    const n = await (0, h.s)(e, $.Q, "getBlock")({
                      blockNumber: t,
                      includeTransactions: l
                    });
                    (o.onBlock(n, d), d = n);
                  }
                }
                (null == d?.number || "pending" === t && null == r?.number || null !== r.number && r.number > d.number) && (o.onBlock(r, d), d = r);
              } catch (r) {
                o.onError?.(r);
              }
            }, {
              emitOnBegin: r,
              interval: c
            }));
          })() : (() => {
            let n = !0, s = !0, a = () => n = !1;
            return ((async () => {
              try {
                r && (0, h.s)(e, $.Q, "getBlock")({
                  blockTag: t,
                  includeTransactions: l
                }).then(e => {
                  n && s && (o(e, void 0), s = !1);
                }).catch(i);
                const c = (() => {
                  if ("fallback" === e.transport.type) {
                    const t = e.transport.transports.find(e => "webSocket" === e.config.type || "ipc" === e.config.type);
                    return t ? t.value : e.transport;
                  }
                  return e.transport;
                })(), {unsubscribe: u} = await c.subscribe({
                  params: ["newHeads"],
                  async onData(t) {
                    if (!n) return;
                    const r = await (0, h.s)(e, $.Q, "getBlock")({
                      blockNumber: t.result?.number,
                      includeTransactions: l
                    }).catch(() => {});
                    n && (o(r, d), s = !1, d = r);
                  },
                  onError(e) {
                    i?.(e);
                  }
                });
                (a = u, n || a());
              } catch (c) {
                i?.(c);
              }
            })(), () => a());
          })();
        })(e, t),
        watchBlockNumber: t => (0, kr.q)(e, t),
        watchContractEvent: t => (function (e, t) {
          const {abi: n, address: r, args: o, batch: i = !0, eventName: s, fromBlock: a, onError: c, onLogs: u, poll: l, pollingInterval: d = e.pollingInterval, strict: f} = t;
          return ("undefined" !== typeof l ? l : "bigint" === typeof a || "webSocket" !== e.transport.type && "ipc" !== e.transport.type && ("fallback" !== e.transport.type || "webSocket" !== e.transport.transports[0].config.type && "ipc" !== e.transport.transports[0].config.type)) ? (() => {
            const t = f ?? !1, l = (0, Sr.P)(["watchContractEvent", r, o, i, e.uid, s, d, t, a]);
            return (0, Ir.N7)(l, {
              onLogs: u,
              onError: c
            }, c => {
              let u, l;
              void 0 !== a && (u = a - 1n);
              let f = !1;
              const p = (0, Br.$)(async () => {
                if (f) try {
                  let a;
                  if (l) a = await (0, h.s)(e, de, "getFilterChanges")({
                    filter: l
                  }); else {
                    const i = await (0, h.s)(e, H.z, "getBlockNumber")({});
                    (a = u && u < i ? await (0, h.s)(e, ae, "getContractEvents")({
                      abi: n,
                      address: r,
                      args: o,
                      eventName: s,
                      fromBlock: u + 1n,
                      toBlock: i,
                      strict: t
                    }) : [], u = i);
                  }
                  if (0 === a.length) return;
                  if (i) c.onLogs(a); else for (const e of a) c.onLogs([e]);
                } catch (d) {
                  (l && d instanceof Or.yR && (f = !1), c.onError?.(d));
                } else {
                  try {
                    l = await (0, h.s)(e, D, "createContractEventFilter")({
                      abi: n,
                      address: r,
                      args: o,
                      eventName: s,
                      strict: t,
                      fromBlock: a
                    });
                  } catch {}
                  f = !0;
                }
              }, {
                emitOnBegin: !0,
                interval: d
              });
              return async () => {
                (l && await (0, h.s)(e, Kn, "uninstallFilter")({
                  filter: l
                }), p());
              };
            });
          })() : (() => {
            const t = f ?? !1, a = (0, Sr.P)(["watchContractEvent", r, o, i, e.uid, s, d, t]);
            let l = !0, h = () => l = !1;
            return (0, Ir.N7)(a, {
              onLogs: u,
              onError: c
            }, t => ((async () => {
              try {
                const i = (() => {
                  if ("fallback" === e.transport.type) {
                    const t = e.transport.transports.find(e => "webSocket" === e.config.type || "ipc" === e.config.type);
                    return t ? t.value : e.transport;
                  }
                  return e.transport;
                })(), a = s ? j({
                  abi: n,
                  eventName: s,
                  args: o
                }) : [], {unsubscribe: c} = await i.subscribe({
                  params: ["logs", {
                    address: r,
                    topics: a
                  }],
                  onData(e) {
                    if (!l) return;
                    const r = e.result;
                    try {
                      const {eventName: e, args: o} = ne({
                        abi: n,
                        data: r.data,
                        topics: r.topics,
                        strict: f
                      }), i = (0, ie.U)(r, {
                        args: o,
                        eventName: e
                      });
                      t.onLogs([i]);
                    } catch (o) {
                      let e, n;
                      if (o instanceof k.SM || o instanceof k.Gy) {
                        if (f) return;
                        (e = o.abiItem.name, n = o.abiItem.inputs?.some(e => !(("name" in e) && e.name)));
                      }
                      const i = (0, ie.U)(r, {
                        args: n ? [] : {},
                        eventName: e
                      });
                      t.onLogs([i]);
                    }
                  },
                  onError(e) {
                    t.onError?.(e);
                  }
                });
                (h = c, l || h());
              } catch (i) {
                c?.(i);
              }
            })(), () => h()));
          })();
        })(e, t),
        watchEvent: t => (function (e, {address: t, args: n, batch: r = !0, event: o, events: i, fromBlock: s, onError: a, onLogs: c, poll: u, pollingInterval: l = e.pollingInterval, strict: d}) {
          const f = "undefined" !== typeof u ? u : "bigint" === typeof s || "webSocket" !== e.transport.type && "ipc" !== e.transport.type && ("fallback" !== e.transport.type || "webSocket" !== e.transport.transports[0].config.type && "ipc" !== e.transport.transports[0].config.type), p = d ?? !1;
          return f ? (() => {
            const u = (0, Sr.P)(["watchEvent", t, n, r, e.uid, o, l, s]);
            return (0, Ir.N7)(u, {
              onLogs: c,
              onError: a
            }, a => {
              let c, u;
              void 0 !== s && (c = s - 1n);
              let d = !1;
              const f = (0, Br.$)(async () => {
                if (d) try {
                  let s;
                  if (u) s = await (0, h.s)(e, de, "getFilterChanges")({
                    filter: u
                  }); else {
                    const r = await (0, h.s)(e, H.z, "getBlockNumber")({});
                    (s = c && c !== r ? await (0, h.s)(e, se, "getLogs")({
                      address: t,
                      args: n,
                      event: o,
                      events: i,
                      fromBlock: c + 1n,
                      toBlock: r
                    }) : [], c = r);
                  }
                  if (0 === s.length) return;
                  if (r) a.onLogs(s); else for (const e of s) a.onLogs([e]);
                } catch (l) {
                  (u && l instanceof Or.yR && (d = !1), a.onError?.(l));
                } else {
                  try {
                    u = await (0, h.s)(e, L, "createEventFilter")({
                      address: t,
                      args: n,
                      event: o,
                      events: i,
                      strict: p,
                      fromBlock: s
                    });
                  } catch {}
                  d = !0;
                }
              }, {
                emitOnBegin: !0,
                interval: l
              });
              return async () => {
                (u && await (0, h.s)(e, Kn, "uninstallFilter")({
                  filter: u
                }), f());
              };
            });
          })() : (() => {
            let r = !0, s = () => r = !1;
            return ((async () => {
              try {
                const u = (() => {
                  if ("fallback" === e.transport.type) {
                    const t = e.transport.transports.find(e => "webSocket" === e.config.type || "ipc" === e.config.type);
                    return t ? t.value : e.transport;
                  }
                  return e.transport;
                })(), l = i ?? (o ? [o] : void 0);
                let f = [];
                if (l) {
                  const e = l.flatMap(e => j({
                    abi: [e],
                    eventName: e.name,
                    args: n
                  }));
                  (f = [e], o && (f = f[0]));
                }
                const {unsubscribe: h} = await u.subscribe({
                  params: ["logs", {
                    address: t,
                    topics: f
                  }],
                  onData(e) {
                    if (!r) return;
                    const t = e.result;
                    try {
                      const {eventName: e, args: n} = ne({
                        abi: l ?? [],
                        data: t.data,
                        topics: t.topics,
                        strict: p
                      }), r = (0, ie.U)(t, {
                        args: n,
                        eventName: e
                      });
                      c([r]);
                    } catch (n) {
                      let e, r;
                      if (n instanceof k.SM || n instanceof k.Gy) {
                        if (d) return;
                        (e = n.abiItem.name, r = n.abiItem.inputs?.some(e => !(("name" in e) && e.name)));
                      }
                      const o = (0, ie.U)(t, {
                        args: r ? [] : {},
                        eventName: e
                      });
                      c([o]);
                    }
                  },
                  onError(e) {
                    a?.(e);
                  }
                });
                (s = h, r || s());
              } catch (u) {
                a?.(u);
              }
            })(), () => s());
          })();
        })(e, t),
        watchPendingTransactions: t => (function (e, {batch: t = !0, onError: n, onTransactions: r, poll: o, pollingInterval: i = e.pollingInterval}) {
          return ("undefined" !== typeof o ? o : "webSocket" !== e.transport.type && "ipc" !== e.transport.type) ? (() => {
            const o = (0, Sr.P)(["watchPendingTransactions", e.uid, t, i]);
            return (0, Ir.N7)(o, {
              onTransactions: r,
              onError: n
            }, n => {
              let r;
              const o = (0, Br.$)(async () => {
                try {
                  if (!r) try {
                    return void (r = await (0, h.s)(e, z, "createPendingTransactionFilter")({}));
                  } catch (i) {
                    throw (o(), i);
                  }
                  const s = await (0, h.s)(e, de, "getFilterChanges")({
                    filter: r
                  });
                  if (0 === s.length) return;
                  if (t) n.onTransactions(s); else for (const e of s) n.onTransactions([e]);
                } catch (i) {
                  n.onError?.(i);
                }
              }, {
                emitOnBegin: !0,
                interval: i
              });
              return async () => {
                (r && await (0, h.s)(e, Kn, "uninstallFilter")({
                  filter: r
                }), o());
              };
            });
          })() : (() => {
            let t = !0, o = () => t = !1;
            return ((async () => {
              try {
                const {unsubscribe: i} = await e.transport.subscribe({
                  params: ["newPendingTransactions"],
                  onData(e) {
                    if (!t) return;
                    const n = e.result;
                    r([n]);
                  },
                  onError(e) {
                    n?.(e);
                  }
                });
                (o = i, t || o());
              } catch (i) {
                n?.(i);
              }
            })(), () => o());
          })();
        })(e, t)
      };
    }
  },
  24250: function (e, t, n) {
    "use strict";
    n.d(t, {
      q: function () {
        return f;
      }
    });
    var r = n(81544), o = n(17057), i = n(77014), s = n(59455);
    const a = new (n(82061).k)(8192);
    var c = n(49287), u = n(31853);
    function l(e, t = {}) {
      return async (n, l = {}) => {
        const {dedupe: d = !1, methods: f, retryDelay: h = 150, retryCount: p = 3, uid: m} = {
          ...t,
          ...l
        }, {method: b} = n;
        if (f?.exclude?.includes(b)) throw new i.gS(new Error("method not supported"), {
          method: b
        });
        if (f?.include && !f.include.includes(b)) throw new i.gS(new Error("method not supported"), {
          method: b
        });
        return (function (e, {enabled: t = !0, id: n}) {
          if (!t || !n) return e();
          if (a.get(n)) return a.get(n);
          const r = e().finally(() => a.delete(n));
          return (a.set(n, r), r);
        })(() => (0, c.J)(async () => {
          try {
            return await e(n);
          } catch (t) {
            const e = t;
            switch (e.code) {
              case i.s7.code:
                throw new i.s7(e);
              case i.B.code:
                throw new i.B(e);
              case i.LX.code:
                throw new i.LX(e, {
                  method: n.method
                });
              case i.nY.code:
                throw new i.nY(e);
              case i.XS.code:
                throw new i.XS(e);
              case i.yR.code:
                throw new i.yR(e);
              case i.Og.code:
                throw new i.Og(e);
              case i.pT.code:
                throw new i.pT(e);
              case i.KB.code:
                throw new i.KB(e);
              case i.gS.code:
                throw new i.gS(e, {
                  method: n.method
                });
              case i.Pv.code:
                throw new i.Pv(e);
              case i.GD.code:
                throw new i.GD(e);
              case i.ab.code:
                throw new i.ab(e);
              case i.PE.code:
                throw new i.PE(e);
              case i.Ts.code:
                throw new i.Ts(e);
              case i.u5.code:
                throw new i.u5(e);
              case i.I0.code:
                throw new i.I0(e);
              case i.x3.code:
                throw new i.x3(e);
              case i.vl.code:
                throw new i.vl(e);
              case i.Uu.code:
                throw new i.Uu(e);
              case i.Nt.code:
                throw new i.Nt(e);
              case i.EJ.code:
                throw new i.EJ(e);
              case i.fl.code:
                throw new i.fl(e);
              case i.NO.code:
                throw new i.NO(e);
              case i.r0.code:
                throw new i.r0(e);
              case 5000:
                throw new i.ab(e);
              default:
                if (t instanceof r.G) throw t;
                throw new i.ir(e);
            }
          }
        }, {
          delay: ({count: e, error: t}) => {
            if (t && t instanceof o.Gg) {
              const e = t?.headers?.get("Retry-After");
              if (e?.match(/\d/)) return 1000 * Number.parseInt(e, 10);
            }
            return ~~(1 << e) * h;
          },
          retryCount: p,
          shouldRetry: ({error: e}) => (function (e) {
            if (("code" in e) && "number" === typeof e.code) return -1 === e.code || (e.code === i.Pv.code || e.code === i.XS.code);
            if (e instanceof o.Gg && e.status) return 403 === e.status || (408 === e.status || (413 === e.status || (429 === e.status || (500 === e.status || (502 === e.status || (503 === e.status || 504 === e.status))))));
            return !0;
          })(e)
        }), {
          enabled: d,
          id: d ? (0, s.$G)(`${m}.${(0, u.P)(n)}`) : void 0
        });
      };
    }
    var d = n(78217);
    function f({key: e, methods: t, name: n, request: r, retryCount: o = 3, retryDelay: i = 150, timeout: s, type: a}, c) {
      return {
        config: {
          key: e,
          methods: t,
          name: n,
          request: r,
          retryCount: o,
          retryDelay: i,
          timeout: s,
          type: a
        },
        request: l(r, {
          methods: t,
          retryCount: o,
          retryDelay: i,
          uid: (0, d.h)()
        }),
        value: c
      };
    }
  },
  79516: function (e, t, n) {
    "use strict";
    n.d(t, {
      d: function () {
        return f;
      }
    });
    var r = n(17057), o = n(81544);
    class i extends o.G {
      constructor() {
        super("No URL was provided to the Transport. Please provide a valid RPC URL to the Transport.", {
          docsPath: "/docs/clients/intro",
          name: "UrlRequiredError"
        });
      }
    }
    var s = n(43226), a = n(39504), c = n(31853);
    function u() {
      return {
        current: 0,
        take() {
          return this.current++;
        },
        reset() {
          this.current = 0;
        }
      };
    }
    const l = u();
    var d = n(24250);
    function f(e, t = {}) {
      const {batch: n, fetchFn: o, fetchOptions: u, key: f = "http", methods: h, name: p = "HTTP JSON-RPC", onFetchRequest: m, onFetchResponse: b, retryDelay: y, raw: g} = t;
      return ({chain: w, retryCount: v, timeout: A}) => {
        const {batchSize: x = 1000, wait: C = 0} = "object" === typeof n ? n : {}, P = t.retryCount ?? v, E = (A ?? t.timeout) ?? 10000, k = e || w?.rpcUrls.default.http[0];
        if (!k) throw new i();
        const I = (function (e, t = {}) {
          return {
            async request(n) {
              const {body: o, fetchFn: i = t.fetchFn ?? fetch, onRequest: s = t.onRequest, onResponse: u = t.onResponse, timeout: d = t.timeout ?? 10000} = n, f = {
                ...t.fetchOptions ?? ({}),
                ...n.fetchOptions ?? ({})
              }, {headers: h, method: p, signal: m} = f;
              try {
                const t = await (0, a.F)(async ({signal: t}) => {
                  const n = {
                    ...f,
                    body: Array.isArray(o) ? (0, c.P)(o.map(e => ({
                      jsonrpc: "2.0",
                      id: e.id ?? l.take(),
                      ...e
                    }))) : (0, c.P)({
                      jsonrpc: "2.0",
                      id: o.id ?? l.take(),
                      ...o
                    }),
                    headers: {
                      "Content-Type": "application/json",
                      ...h
                    },
                    method: p || "POST",
                    signal: m || (d > 0 ? t : null)
                  }, r = new Request(e, n), a = await s?.(r, n) ?? ({
                    ...n,
                    url: e
                  });
                  return await i(a.url ?? e, a);
                }, {
                  errorInstance: new r.W5({
                    body: o,
                    url: e
                  }),
                  timeout: d,
                  signal: !0
                });
                let n;
                if ((u && await u(t), t.headers.get("Content-Type")?.startsWith("application/json"))) n = await t.json(); else {
                  n = await t.text();
                  try {
                    n = JSON.parse(n || "{}");
                  } catch (b) {
                    if (t.ok) throw b;
                    n = {
                      error: n
                    };
                  }
                }
                if (!t.ok) throw new r.Gg({
                  body: o,
                  details: (0, c.P)(n.error) || t.statusText,
                  headers: t.headers,
                  status: t.status,
                  url: e
                });
                return n;
              } catch (b) {
                if (b instanceof r.Gg) throw b;
                if (b instanceof r.W5) throw b;
                throw new r.Gg({
                  body: o,
                  cause: b,
                  url: e
                });
              }
            }
          };
        })(k, {
          fetchFn: o,
          fetchOptions: u,
          onRequest: m,
          onResponse: b,
          timeout: E
        });
        return (0, d.q)({
          key: f,
          methods: h,
          name: p,
          async request({method: e, params: t}) {
            const o = {
              method: e,
              params: t
            }, {schedule: i} = (0, s.S)({
              id: k,
              wait: C,
              shouldSplitBatch: e => e.length > x,
              fn: e => I.request({
                body: e
              }),
              sort: (e, t) => e.id - t.id
            }), [{error: a, result: c}] = await (async e => n ? i(e) : [await I.request({
              body: e
            })])(o);
            if (g) return {
              error: a,
              result: c
            };
            if (a) throw new r.bs({
              body: o,
              error: a,
              url: k
            });
            return c;
          },
          retryCount: P,
          retryDelay: y,
          timeout: E,
          type: "http"
        }, {
          fetchOptions: u,
          url: k
        });
      };
    }
  },
  98158: function (e, t, n) {
    "use strict";
    n.d(t, {
      F8: function () {
        return r;
      },
      MR: function () {
        return d;
      },
      Wo: function () {
        return f;
      },
      X$: function () {
        return u;
      },
      Yi: function () {
        return o;
      },
      _A: function () {
        return l;
      },
      du: function () {
        return a;
      },
      k3: function () {
        return s;
      },
      nZ: function () {
        return c;
      }
    });
    const r = [{
      inputs: [{
        components: [{
          name: "target",
          type: "address"
        }, {
          name: "allowFailure",
          type: "bool"
        }, {
          name: "callData",
          type: "bytes"
        }],
        name: "calls",
        type: "tuple[]"
      }],
      name: "aggregate3",
      outputs: [{
        components: [{
          name: "success",
          type: "bool"
        }, {
          name: "returnData",
          type: "bytes"
        }],
        name: "returnData",
        type: "tuple[]"
      }],
      stateMutability: "view",
      type: "function"
    }, {
      inputs: [],
      name: "getCurrentBlockTimestamp",
      outputs: [{
        internalType: "uint256",
        name: "timestamp",
        type: "uint256"
      }],
      stateMutability: "view",
      type: "function"
    }], o = [{
      name: "query",
      type: "function",
      stateMutability: "view",
      inputs: [{
        type: "tuple[]",
        name: "queries",
        components: [{
          type: "address",
          name: "sender"
        }, {
          type: "string[]",
          name: "urls"
        }, {
          type: "bytes",
          name: "data"
        }]
      }],
      outputs: [{
        type: "bool[]",
        name: "failures"
      }, {
        type: "bytes[]",
        name: "responses"
      }]
    }, {
      name: "HttpError",
      type: "error",
      inputs: [{
        type: "uint16",
        name: "status"
      }, {
        type: "string",
        name: "message"
      }]
    }], i = [{
      inputs: [{
        name: "dns",
        type: "bytes"
      }],
      name: "DNSDecodingFailed",
      type: "error"
    }, {
      inputs: [{
        name: "ens",
        type: "string"
      }],
      name: "DNSEncodingFailed",
      type: "error"
    }, {
      inputs: [],
      name: "EmptyAddress",
      type: "error"
    }, {
      inputs: [{
        name: "status",
        type: "uint16"
      }, {
        name: "message",
        type: "string"
      }],
      name: "HttpError",
      type: "error"
    }, {
      inputs: [],
      name: "InvalidBatchGatewayResponse",
      type: "error"
    }, {
      inputs: [{
        name: "errorData",
        type: "bytes"
      }],
      name: "ResolverError",
      type: "error"
    }, {
      inputs: [{
        name: "name",
        type: "bytes"
      }, {
        name: "resolver",
        type: "address"
      }],
      name: "ResolverNotContract",
      type: "error"
    }, {
      inputs: [{
        name: "name",
        type: "bytes"
      }],
      name: "ResolverNotFound",
      type: "error"
    }, {
      inputs: [{
        name: "primary",
        type: "string"
      }, {
        name: "primaryAddress",
        type: "bytes"
      }],
      name: "ReverseAddressMismatch",
      type: "error"
    }, {
      inputs: [{
        internalType: "bytes4",
        name: "selector",
        type: "bytes4"
      }],
      name: "UnsupportedResolverProfile",
      type: "error"
    }], s = [...i, {
      name: "resolveWithGateways",
      type: "function",
      stateMutability: "view",
      inputs: [{
        name: "name",
        type: "bytes"
      }, {
        name: "data",
        type: "bytes"
      }, {
        name: "gateways",
        type: "string[]"
      }],
      outputs: [{
        name: "",
        type: "bytes"
      }, {
        name: "address",
        type: "address"
      }]
    }], a = [...i, {
      name: "reverseWithGateways",
      type: "function",
      stateMutability: "view",
      inputs: [{
        type: "bytes",
        name: "reverseName"
      }, {
        type: "uint256",
        name: "coinType"
      }, {
        type: "string[]",
        name: "gateways"
      }],
      outputs: [{
        type: "string",
        name: "resolvedName"
      }, {
        type: "address",
        name: "resolver"
      }, {
        type: "address",
        name: "reverseResolver"
      }]
    }], c = [{
      name: "text",
      type: "function",
      stateMutability: "view",
      inputs: [{
        name: "name",
        type: "bytes32"
      }, {
        name: "key",
        type: "string"
      }],
      outputs: [{
        name: "",
        type: "string"
      }]
    }], u = [{
      name: "addr",
      type: "function",
      stateMutability: "view",
      inputs: [{
        name: "name",
        type: "bytes32"
      }],
      outputs: [{
        name: "",
        type: "address"
      }]
    }, {
      name: "addr",
      type: "function",
      stateMutability: "view",
      inputs: [{
        name: "name",
        type: "bytes32"
      }, {
        name: "coinType",
        type: "uint256"
      }],
      outputs: [{
        name: "",
        type: "bytes"
      }]
    }], l = [{
      name: "isValidSignature",
      type: "function",
      stateMutability: "view",
      inputs: [{
        name: "hash",
        type: "bytes32"
      }, {
        name: "signature",
        type: "bytes"
      }],
      outputs: [{
        name: "",
        type: "bytes4"
      }]
    }], d = [{
      inputs: [{
        name: "_signer",
        type: "address"
      }, {
        name: "_hash",
        type: "bytes32"
      }, {
        name: "_signature",
        type: "bytes"
      }],
      stateMutability: "nonpayable",
      type: "constructor"
    }, {
      inputs: [{
        name: "_signer",
        type: "address"
      }, {
        name: "_hash",
        type: "bytes32"
      }, {
        name: "_signature",
        type: "bytes"
      }],
      outputs: [{
        type: "bool"
      }],
      stateMutability: "nonpayable",
      type: "function",
      name: "isValidSig"
    }], f = [{
      type: "event",
      name: "Approval",
      inputs: [{
        indexed: !0,
        name: "owner",
        type: "address"
      }, {
        indexed: !0,
        name: "spender",
        type: "address"
      }, {
        indexed: !1,
        name: "value",
        type: "uint256"
      }]
    }, {
      type: "event",
      name: "Transfer",
      inputs: [{
        indexed: !0,
        name: "from",
        type: "address"
      }, {
        indexed: !0,
        name: "to",
        type: "address"
      }, {
        indexed: !1,
        name: "value",
        type: "uint256"
      }]
    }, {
      type: "function",
      name: "allowance",
      stateMutability: "view",
      inputs: [{
        name: "owner",
        type: "address"
      }, {
        name: "spender",
        type: "address"
      }],
      outputs: [{
        type: "uint256"
      }]
    }, {
      type: "function",
      name: "approve",
      stateMutability: "nonpayable",
      inputs: [{
        name: "spender",
        type: "address"
      }, {
        name: "amount",
        type: "uint256"
      }],
      outputs: [{
        type: "bool"
      }]
    }, {
      type: "function",
      name: "balanceOf",
      stateMutability: "view",
      inputs: [{
        name: "account",
        type: "address"
      }],
      outputs: [{
        type: "uint256"
      }]
    }, {
      type: "function",
      name: "decimals",
      stateMutability: "view",
      inputs: [],
      outputs: [{
        type: "uint8"
      }]
    }, {
      type: "function",
      name: "name",
      stateMutability: "view",
      inputs: [],
      outputs: [{
        type: "string"
      }]
    }, {
      type: "function",
      name: "symbol",
      stateMutability: "view",
      inputs: [],
      outputs: [{
        type: "string"
      }]
    }, {
      type: "function",
      name: "totalSupply",
      stateMutability: "view",
      inputs: [],
      outputs: [{
        type: "uint256"
      }]
    }, {
      type: "function",
      name: "transfer",
      stateMutability: "nonpayable",
      inputs: [{
        name: "recipient",
        type: "address"
      }, {
        name: "amount",
        type: "uint256"
      }],
      outputs: [{
        type: "bool"
      }]
    }, {
      type: "function",
      name: "transferFrom",
      stateMutability: "nonpayable",
      inputs: [{
        name: "sender",
        type: "address"
      }, {
        name: "recipient",
        type: "address"
      }, {
        name: "amount",
        type: "uint256"
      }],
      outputs: [{
        type: "bool"
      }]
    }];
  },
  45434: function (e, t, n) {
    "use strict";
    n.d(t, {
      NO: function () {
        return r;
      },
      de: function () {
        return i;
      },
      pG: function () {
        return o;
      },
      xd: function () {
        return s;
      }
    });
    const r = "0x608060405234801561001057600080fd5b5060405161018e38038061018e83398101604081905261002f91610124565b6000808351602085016000f59050803b61004857600080fd5b6000808351602085016000855af16040513d6000823e81610067573d81fd5b3d81f35b634e487b7160e01b600052604160045260246000fd5b600082601f83011261009257600080fd5b81516001600160401b038111156100ab576100ab61006b565b604051601f8201601f19908116603f011681016001600160401b03811182821017156100d9576100d961006b565b6040528181528382016020018510156100f157600080fd5b60005b82811015610110576020818601810151838301820152016100f4565b506000918101602001919091529392505050565b6000806040838503121561013757600080fd5b82516001600160401b0381111561014d57600080fd5b61015985828601610081565b602085015190935090506001600160401b0381111561017757600080fd5b61018385828601610081565b915050925092905056fe", o = "0x608060405234801561001057600080fd5b506040516102c03803806102c083398101604081905261002f916101e6565b836001600160a01b03163b6000036100e457600080836001600160a01b03168360405161005c9190610270565b6000604051808303816000865af19150503d8060008114610099576040519150601f19603f3d011682016040523d82523d6000602084013e61009e565b606091505b50915091508115806100b857506001600160a01b0386163b155b156100e1578060405163101bb98d60e01b81526004016100d8919061028c565b60405180910390fd5b50505b6000808451602086016000885af16040513d6000823e81610103573d81fd5b3d81f35b80516001600160a01b038116811461011e57600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b60005b8381101561015457818101518382015260200161013c565b50506000910152565b600082601f83011261016e57600080fd5b81516001600160401b0381111561018757610187610123565b604051601f8201601f19908116603f011681016001600160401b03811182821017156101b5576101b5610123565b6040528181528382016020018510156101cd57600080fd5b6101de826020830160208701610139565b949350505050565b600080600080608085870312156101fc57600080fd5b61020585610107565b60208601519094506001600160401b0381111561022157600080fd5b61022d8782880161015d565b93505061023c60408601610107565b60608601519092506001600160401b0381111561025857600080fd5b6102648782880161015d565b91505092959194509250565b60008251610282818460208701610139565b9190910192915050565b60208152600082518060208401526102ab816040850160208701610139565b601f01601f1916919091016040019291505056fe", i = "0x608060405234801561001057600080fd5b5060405161069438038061069483398101604081905261002f9161051e565b600061003c848484610048565b9050806000526001601ff35b60007f64926492649264926492649264926492649264926492649264926492649264926100748361040c565b036101e7576000606080848060200190518101906100929190610577565b60405192955090935091506000906001600160a01b038516906100b69085906105dd565b6000604051808303816000865af19150503d80600081146100f3576040519150601f19603f3d011682016040523d82523d6000602084013e6100f8565b606091505b50509050876001600160a01b03163b60000361016057806101605760405162461bcd60e51b815260206004820152601e60248201527f5369676e617475726556616c696461746f723a206465706c6f796d656e74000060448201526064015b60405180910390fd5b604051630b135d3f60e11b808252906001600160a01b038a1690631626ba7e90610190908b9087906004016105f9565b602060405180830381865afa1580156101ad573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101d19190610633565b6001600160e01b03191614945050505050610405565b6001600160a01b0384163b1561027a57604051630b135d3f60e11b808252906001600160a01b03861690631626ba7e9061022790879087906004016105f9565b602060405180830381865afa158015610244573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102689190610633565b6001600160e01b031916149050610405565b81516041146102df5760405162461bcd60e51b815260206004820152603a602482015260008051602061067483398151915260448201527f3a20696e76616c6964207369676e6174757265206c656e6774680000000000006064820152608401610157565b6102e7610425565b5060208201516040808401518451859392600091859190811061030c5761030c61065d565b016020015160f81c9050601b811480159061032b57508060ff16601c14155b1561038c5760405162461bcd60e51b815260206004820152603b602482015260008051602061067483398151915260448201527f3a20696e76616c6964207369676e617475726520762076616c756500000000006064820152608401610157565b60408051600081526020810180835289905260ff83169181019190915260608101849052608081018390526001600160a01b0389169060019060a0016020604051602081039080840390855afa1580156103ea573d6000803e3d6000fd5b505050602060405103516001600160a01b0316149450505050505b9392505050565b600060208251101561041d57600080fd5b508051015190565b60405180606001604052806003906020820280368337509192915050565b6001600160a01b038116811461045857600080fd5b50565b634e487b7160e01b600052604160045260246000fd5b60005b8381101561048c578181015183820152602001610474565b50506000910152565b600082601f8301126104a657600080fd5b81516001600160401b038111156104bf576104bf61045b565b604051601f8201601f19908116603f011681016001600160401b03811182821017156104ed576104ed61045b565b60405281815283820160200185101561050557600080fd5b610516826020830160208701610471565b949350505050565b60008060006060848603121561053357600080fd5b835161053e81610443565b6020850151604086015191945092506001600160401b0381111561056157600080fd5b61056d86828701610495565b9150509250925092565b60008060006060848603121561058c57600080fd5b835161059781610443565b60208501519093506001600160401b038111156105b357600080fd5b6105bf86828701610495565b604086015190935090506001600160401b0381111561056157600080fd5b600082516105ef818460208701610471565b9190910192915050565b828152604060208201526000825180604084015261061e816060850160208701610471565b601f01601f1916919091016060019392505050565b60006020828403121561064557600080fd5b81516001600160e01b03198116811461040557600080fd5b634e487b7160e01b600052603260045260246000fdfe5369676e617475726556616c696461746f72237265636f7665725369676e6572", s = "0x608060405234801561001057600080fd5b506115b9806100206000396000f3fe6080604052600436106100f35760003560e01c80634d2301cc1161008a578063a8b0574e11610059578063a8b0574e14610325578063bce38bd714610350578063c3077fa914610380578063ee82ac5e146103b2576100f3565b80634d2301cc1461026257806372425d9d1461029f57806382ad56cb146102ca57806386d516e8146102fa576100f3565b80633408e470116100c65780633408e470146101af578063399542e9146101da5780633e64a6961461020c57806342cbb15c14610237576100f3565b80630f28c97d146100f8578063174dea7114610123578063252dba421461015357806327e86d6e14610184575b600080fd5b34801561010457600080fd5b5061010d6103ef565b60405161011a9190610c0a565b60405180910390f35b61013d60048036038101906101389190610c94565b6103f7565b60405161014a9190610e94565b60405180910390f35b61016d60048036038101906101689190610f0c565b610615565b60405161017b92919061101b565b60405180910390f35b34801561019057600080fd5b506101996107ab565b6040516101a69190611064565b60405180910390f35b3480156101bb57600080fd5b506101c46107b7565b6040516101d19190610c0a565b60405180910390f35b6101f460048036038101906101ef91906110ab565b6107bf565b6040516102039392919061110b565b60405180910390f35b34801561021857600080fd5b506102216107e1565b60405161022e9190610c0a565b60405180910390f35b34801561024357600080fd5b5061024c6107e9565b6040516102599190610c0a565b60405180910390f35b34801561026e57600080fd5b50610289600480360381019061028491906111a7565b6107f1565b6040516102969190610c0a565b60405180910390f35b3480156102ab57600080fd5b506102b4610812565b6040516102c19190610c0a565b60405180910390f35b6102e460048036038101906102df919061122a565b61081a565b6040516102f19190610e94565b60405180910390f35b34801561030657600080fd5b5061030f6109e4565b60405161031c9190610c0a565b60405180910390f35b34801561033157600080fd5b5061033a6109ec565b6040516103479190611286565b60405180910390f35b61036a600480360381019061036591906110ab565b6109f4565b6040516103779190610e94565b60405180910390f35b61039a60048036038101906103959190610f0c565b610ba6565b6040516103a99392919061110b565b60405180910390f35b3480156103be57600080fd5b506103d960048036038101906103d491906112cd565b610bca565b6040516103e69190611064565b60405180910390f35b600042905090565b60606000808484905090508067ffffffffffffffff81111561041c5761041b6112fa565b5b60405190808252806020026020018201604052801561045557816020015b610442610bd5565b81526020019060019003908161043a5790505b5092503660005b828110156105c957600085828151811061047957610478611329565b5b6020026020010151905087878381811061049657610495611329565b5b90506020028101906104a89190611367565b925060008360400135905080860195508360000160208101906104cb91906111a7565b73ffffffffffffffffffffffffffffffffffffffff16818580606001906104f2919061138f565b604051610500929190611431565b60006040518083038185875af1925050503d806000811461053d576040519150601f19603f3d011682016040523d82523d6000602084013e610542565b606091505b5083600001846020018290528215151515815250505081516020850135176105bc577f08c379a000000000000000000000000000000000000000000000000000000000600052602060045260176024527f4d756c746963616c6c333a2063616c6c206661696c656400000000000000000060445260846000fd5b826001019250505061045c565b5082341461060c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610603906114a7565b60405180910390fd5b50505092915050565b6000606043915060008484905090508067ffffffffffffffff81111561063e5761063d6112fa565b5b60405190808252806020026020018201604052801561067157816020015b606081526020019060019003908161065c5790505b5091503660005b828110156107a157600087878381811061069557610694611329565b5b90506020028101906106a791906114c7565b92508260000160208101906106bc91906111a7565b73ffffffffffffffffffffffffffffffffffffffff168380602001906106e2919061138f565b6040516106f0929190611431565b6000604051808303816000865af19150503d806000811461072d576040519150601f19603f3d011682016040523d82523d6000602084013e610732565b606091505b5086848151811061074657610745611329565b5b60200260200101819052819250505080610795576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161078c9061153b565b60405180910390fd5b81600101915050610678565b5050509250929050565b60006001430340905090565b600046905090565b6000806060439250434091506107d68686866109f4565b905093509350939050565b600048905090565b600043905090565b60008173ffffffffffffffffffffffffffffffffffffffff16319050919050565b600044905090565b606060008383905090508067ffffffffffffffff81111561083e5761083d6112fa565b5b60405190808252806020026020018201604052801561087757816020015b610864610bd5565b81526020019060019003908161085c5790505b5091503660005b828110156109db57600084828151811061089b5761089a611329565b5b602002602001015190508686838181106108b8576108b7611329565b5b90506020028101906108ca919061155b565b92508260000160208101906108df91906111a7565b73ffffffffffffffffffffffffffffffffffffffff16838060400190610905919061138f565b604051610913929190611431565b6000604051808303816000865af19150503d8060008114610950576040519150601f19603f3d011682016040523d82523d6000602084013e610955565b606091505b5082600001836020018290528215151515815250505080516020840135176109cf577f08c379a000000000000000000000000000000000000000000000000000000000600052602060045260176024527f4d756c746963616c6c333a2063616c6c206661696c656400000000000000000060445260646000fd5b8160010191505061087e565b50505092915050565b600045905090565b600041905090565b606060008383905090508067ffffffffffffffff811115610a1857610a176112fa565b5b604051908082528060200260200182016040528015610a5157816020015b610a3e610bd5565b815260200190600190039081610a365790505b5091503660005b82811015610b9c576000848281518110610a7557610a74611329565b5b60200260200101519050868683818110610a9257610a91611329565b5b9050602002810190610aa491906114c7565b9250826000016020810190610ab991906111a7565b73ffffffffffffffffffffffffffffffffffffffff16838060200190610adf919061138f565b604051610aed929190611431565b6000604051808303816000865af19150503d8060008114610b2a576040519150601f19603f3d011682016040523d82523d6000602084013e610b2f565b606091505b508260000183602001829052821515151581525050508715610b90578060000151610b8f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b869061153b565b60405180910390fd5b5b81600101915050610a58565b5050509392505050565b6000806060610bb7600186866107bf565b8093508194508295505050509250925092565b600081409050919050565b6040518060400160405280600015158152602001606081525090565b6000819050919050565b610c0481610bf1565b82525050565b6000602082019050610c1f6000830184610bfb565b92915050565b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b60008083601f840112610c5457610c53610c2f565b5b8235905067ffffffffffffffff811115610c7157610c70610c34565b5b602083019150836020820283011115610c8d57610c8c610c39565b5b9250929050565b60008060208385031215610cab57610caa610c25565b5b600083013567ffffffffffffffff811115610cc957610cc8610c2a565b5b610cd585828601610c3e565b92509250509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b60008115159050919050565b610d2281610d0d565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610d62578082015181840152602081019050610d47565b83811115610d71576000848401525b50505050565b6000601f19601f8301169050919050565b6000610d9382610d28565b610d9d8185610d33565b9350610dad818560208601610d44565b610db681610d77565b840191505092915050565b6000604083016000830151610dd96000860182610d19565b5060208301518482036020860152610df18282610d88565b9150508091505092915050565b6000610e0a8383610dc1565b905092915050565b6000602082019050919050565b6000610e2a82610ce1565b610e348185610cec565b935083602082028501610e4685610cfd565b8060005b85811015610e825784840389528151610e638582610dfe565b9450610e6e83610e12565b925060208a01995050600181019050610e4a565b50829750879550505050505092915050565b60006020820190508181036000830152610eae8184610e1f565b905092915050565b60008083601f840112610ecc57610ecb610c2f565b5b8235905067ffffffffffffffff811115610ee957610ee8610c34565b5b602083019150836020820283011115610f0557610f04610c39565b5b9250929050565b60008060208385031215610f2357610f22610c25565b5b600083013567ffffffffffffffff811115610f4157610f40610c2a565b5b610f4d85828601610eb6565b92509250509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6000610f918383610d88565b905092915050565b6000602082019050919050565b6000610fb182610f59565b610fbb8185610f64565b935083602082028501610fcd85610f75565b8060005b858110156110095784840389528151610fea8582610f85565b9450610ff583610f99565b925060208a01995050600181019050610fd1565b50829750879550505050505092915050565b60006040820190506110306000830185610bfb565b81810360208301526110428184610fa6565b90509392505050565b6000819050919050565b61105e8161104b565b82525050565b60006020820190506110796000830184611055565b92915050565b61108881610d0d565b811461109357600080fd5b50565b6000813590506110a58161107f565b92915050565b6000806000604084860312156110c4576110c3610c25565b5b60006110d286828701611096565b935050602084013567ffffffffffffffff8111156110f3576110f2610c2a565b5b6110ff86828701610eb6565b92509250509250925092565b60006060820190506111206000830186610bfb565b61112d6020830185611055565b818103604083015261113f8184610e1f565b9050949350505050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061117482611149565b9050919050565b61118481611169565b811461118f57600080fd5b50565b6000813590506111a18161117b565b92915050565b6000602082840312156111bd576111bc610c25565b5b60006111cb84828501611192565b91505092915050565b60008083601f8401126111ea576111e9610c2f565b5b8235905067ffffffffffffffff81111561120757611206610c34565b5b60208301915083602082028301111561122357611222610c39565b5b9250929050565b6000806020838503121561124157611240610c25565b5b600083013567ffffffffffffffff81111561125f5761125e610c2a565b5b61126b858286016111d4565b92509250509250929050565b61128081611169565b82525050565b600060208201905061129b6000830184611277565b92915050565b6112aa81610bf1565b81146112b557600080fd5b50565b6000813590506112c7816112a1565b92915050565b6000602082840312156112e3576112e2610c25565b5b60006112f1848285016112b8565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600080fd5b600080fd5b600080fd5b60008235600160800383360303811261138357611382611358565b5b80830191505092915050565b600080833560016020038436030381126113ac576113ab611358565b5b80840192508235915067ffffffffffffffff8211156113ce576113cd61135d565b5b6020830192506001820236038313156113ea576113e9611362565b5b509250929050565b600081905092915050565b82818337600083830152505050565b600061141883856113f2565b93506114258385846113fd565b82840190509392505050565b600061143e82848661140c565b91508190509392505050565b600082825260208201905092915050565b7f4d756c746963616c6c333a2076616c7565206d69736d61746368000000000000600082015250565b6000611491601a8361144a565b915061149c8261145b565b602082019050919050565b600060208201905081810360008301526114c081611484565b9050919050565b6000823560016040038336030381126114e3576114e2611358565b5b80830191505092915050565b7f4d756c746963616c6c333a2063616c6c206661696c6564000000000000000000600082015250565b600061152560178361144a565b9150611530826114ef565b602082019050919050565b6000602082019050818103600083015261155481611518565b9050919050565b60008235600160600383360303811261157757611576611358565b5b8083019150509291505056fea264697066735822122020c1bc9aacf8e4a6507193432a895a8e77094f45a1395583f07b24e860ef06cd64736f6c634300080c0033";
  },
  55246: function (e, t, n) {
    "use strict";
    n.d(t, {
      $: function () {
        return r;
      },
      Up: function () {
        return o;
      },
      hZ: function () {
        return i;
      }
    });
    const r = {
      1: "An `assert` condition failed.",
      17: "Arithmetic operation resulted in underflow or overflow.",
      18: "Division or modulo by zero (e.g. `5 / 0` or `23 % 0`).",
      33: "Attempted to convert to an invalid type.",
      34: "Attempted to access a storage byte array that is incorrectly encoded.",
      49: "Performed `.pop()` on an empty array",
      50: "Array index is out of bounds.",
      65: "Allocated too much memory or created an array which is too large.",
      81: "Attempted to call a zero-initialized variable of internal function type."
    }, o = {
      inputs: [{
        name: "message",
        type: "string"
      }],
      name: "Error",
      type: "error"
    }, i = {
      inputs: [{
        name: "reason",
        type: "uint256"
      }],
      name: "Panic",
      type: "error"
    };
  },
  98173: function (e, t, n) {
    "use strict";
    n.d(t, {
      Bd: function () {
        return i;
      },
      Zn: function () {
        return o;
      },
      ez: function () {
        return r;
      }
    });
    const r = {
      gwei: 9,
      wei: 18
    }, o = {
      ether: -9,
      wei: 9
    }, i = {
      ether: -18,
      gwei: -9
    };
  },
  65531: function (e, t, n) {
    "use strict";
    n.d(t, {
      CI: function () {
        return I;
      },
      FM: function () {
        return b;
      },
      Gy: function () {
        return E;
      },
      KY: function () {
        return C;
      },
      M4: function () {
        return d;
      },
      MS: function () {
        return p;
      },
      MX: function () {
        return v;
      },
      Mi: function () {
        return O;
      },
      S4: function () {
        return x;
      },
      SM: function () {
        return P;
      },
      Zh: function () {
        return h;
      },
      cO: function () {
        return a;
      },
      dh: function () {
        return k;
      },
      eF: function () {
        return A;
      },
      fM: function () {
        return s;
      },
      fs: function () {
        return f;
      },
      gr: function () {
        return l;
      },
      hn: function () {
        return B;
      },
      lC: function () {
        return y;
      },
      mv: function () {
        return g;
      },
      wM: function () {
        return S;
      },
      wb: function () {
        return u;
      },
      xB: function () {
        return c;
      },
      xL: function () {
        return w;
      },
      yP: function () {
        return m;
      }
    });
    var r = n(7275), o = n(20556), i = n(81544);
    class s extends i.G {
      constructor({docsPath: e}) {
        super(["A constructor was not found on the ABI.", "Make sure you are using the correct ABI and that the constructor exists on it."].join("\n"), {
          docsPath: e,
          name: "AbiConstructorNotFoundError"
        });
      }
    }
    class a extends i.G {
      constructor({docsPath: e}) {
        super(["Constructor arguments were provided (`args`), but a constructor parameters (`inputs`) were not found on the ABI.", "Make sure you are using the correct ABI, and that the `inputs` attribute on the constructor exists."].join("\n"), {
          docsPath: e,
          name: "AbiConstructorParamsNotFoundError"
        });
      }
    }
    i.G;
    class c extends i.G {
      constructor({data: e, params: t, size: n}) {
        (super([`Data size of ${n} bytes is too small for given parameters.`].join("\n"), {
          metaMessages: [`Params: (${(0, r.h)(t, {
            includeName: !0
          })})`, `Data:   ${e} (${n} bytes)`],
          name: "AbiDecodingDataSizeTooSmallError"
        }), Object.defineProperty(this, "data", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), Object.defineProperty(this, "params", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), Object.defineProperty(this, "size", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), this.data = e, this.params = t, this.size = n);
      }
    }
    class u extends i.G {
      constructor() {
        super("Cannot decode zero data (\"0x\") with ABI parameters.", {
          name: "AbiDecodingZeroDataError"
        });
      }
    }
    class l extends i.G {
      constructor({expectedLength: e, givenLength: t, type: n}) {
        super([`ABI encoding array length mismatch for type ${n}.`, `Expected length: ${e}`, `Given length: ${t}`].join("\n"), {
          name: "AbiEncodingArrayLengthMismatchError"
        });
      }
    }
    class d extends i.G {
      constructor({expectedSize: e, value: t}) {
        super(`Size of bytes "${t}" (bytes${(0, o.d)(t)}) does not match expected size (bytes${e}).`, {
          name: "AbiEncodingBytesSizeMismatchError"
        });
      }
    }
    class f extends i.G {
      constructor({expectedLength: e, givenLength: t}) {
        super(["ABI encoding params/values length mismatch.", `Expected length (params): ${e}`, `Given length (values): ${t}`].join("\n"), {
          name: "AbiEncodingLengthMismatchError"
        });
      }
    }
    class h extends i.G {
      constructor(e, {docsPath: t}) {
        super([`Arguments (\`args\`) were provided to "${e}", but "${e}" on the ABI does not contain any parameters (\`inputs\`).`, "Cannot encode error result without knowing what the parameter types are.", "Make sure you are using the correct ABI and that the inputs exist on it."].join("\n"), {
          docsPath: t,
          name: "AbiErrorInputsNotFoundError"
        });
      }
    }
    class p extends i.G {
      constructor(e, {docsPath: t} = {}) {
        super([`Error ${e ? `"${e}" ` : ""}not found on ABI.`, "Make sure you are using the correct ABI and that the error exists on it."].join("\n"), {
          docsPath: t,
          name: "AbiErrorNotFoundError"
        });
      }
    }
    class m extends i.G {
      constructor(e, {docsPath: t}) {
        (super([`Encoded error signature "${e}" not found on ABI.`, "Make sure you are using the correct ABI and that the error exists on it.", `You can look up the decoded signature here: https://openchain.xyz/signatures?query=${e}.`].join("\n"), {
          docsPath: t,
          name: "AbiErrorSignatureNotFoundError"
        }), Object.defineProperty(this, "signature", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), this.signature = e);
      }
    }
    class b extends i.G {
      constructor({docsPath: e}) {
        super("Cannot extract event signature from empty topics.", {
          docsPath: e,
          name: "AbiEventSignatureEmptyTopicsError"
        });
      }
    }
    class y extends i.G {
      constructor(e, {docsPath: t}) {
        super([`Encoded event signature "${e}" not found on ABI.`, "Make sure you are using the correct ABI and that the event exists on it.", `You can look up the signature here: https://openchain.xyz/signatures?query=${e}.`].join("\n"), {
          docsPath: t,
          name: "AbiEventSignatureNotFoundError"
        });
      }
    }
    class g extends i.G {
      constructor(e, {docsPath: t} = {}) {
        super([`Event ${e ? `"${e}" ` : ""}not found on ABI.`, "Make sure you are using the correct ABI and that the event exists on it."].join("\n"), {
          docsPath: t,
          name: "AbiEventNotFoundError"
        });
      }
    }
    class w extends i.G {
      constructor(e, {docsPath: t} = {}) {
        super([`Function ${e ? `"${e}" ` : ""}not found on ABI.`, "Make sure you are using the correct ABI and that the function exists on it."].join("\n"), {
          docsPath: t,
          name: "AbiFunctionNotFoundError"
        });
      }
    }
    class v extends i.G {
      constructor(e, {docsPath: t}) {
        super([`Function "${e}" does not contain any \`outputs\` on ABI.`, "Cannot decode function result without knowing what the parameter types are.", "Make sure you are using the correct ABI and that the function exists on it."].join("\n"), {
          docsPath: t,
          name: "AbiFunctionOutputsNotFoundError"
        });
      }
    }
    class A extends i.G {
      constructor(e, {docsPath: t}) {
        super([`Encoded function signature "${e}" not found on ABI.`, "Make sure you are using the correct ABI and that the function exists on it.", `You can look up the signature here: https://openchain.xyz/signatures?query=${e}.`].join("\n"), {
          docsPath: t,
          name: "AbiFunctionSignatureNotFoundError"
        });
      }
    }
    class x extends i.G {
      constructor(e, t) {
        super("Found ambiguous types in overloaded ABI items.", {
          metaMessages: [`\`${e.type}\` in \`${(0, r.t)(e.abiItem)}\`, and`, `\`${t.type}\` in \`${(0, r.t)(t.abiItem)}\``, "", "These types encode differently and cannot be distinguished at runtime.", "Remove one of the ambiguous items in the ABI."],
          name: "AbiItemAmbiguityError"
        });
      }
    }
    class C extends i.G {
      constructor({expectedSize: e, givenSize: t}) {
        super(`Expected bytes${e}, got bytes${t}.`, {
          name: "BytesSizeMismatchError"
        });
      }
    }
    class P extends i.G {
      constructor({abiItem: e, data: t, params: n, size: o}) {
        (super([`Data size of ${o} bytes is too small for non-indexed event parameters.`].join("\n"), {
          metaMessages: [`Params: (${(0, r.h)(n, {
            includeName: !0
          })})`, `Data:   ${t} (${o} bytes)`],
          name: "DecodeLogDataMismatch"
        }), Object.defineProperty(this, "abiItem", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), Object.defineProperty(this, "data", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), Object.defineProperty(this, "params", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), Object.defineProperty(this, "size", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), this.abiItem = e, this.data = t, this.params = n, this.size = o);
      }
    }
    class E extends i.G {
      constructor({abiItem: e, param: t}) {
        (super([`Expected a topic for indexed event parameter${t.name ? ` "${t.name}"` : ""} on event "${(0, r.t)(e, {
          includeName: !0
        })}".`].join("\n"), {
          name: "DecodeLogTopicsMismatch"
        }), Object.defineProperty(this, "abiItem", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), this.abiItem = e);
      }
    }
    class k extends i.G {
      constructor(e, {docsPath: t}) {
        super([`Type "${e}" is not a valid encoding type.`, "Please provide a valid ABI type."].join("\n"), {
          docsPath: t,
          name: "InvalidAbiEncodingType"
        });
      }
    }
    class I extends i.G {
      constructor(e, {docsPath: t}) {
        super([`Type "${e}" is not a valid decoding type.`, "Please provide a valid ABI type."].join("\n"), {
          docsPath: t,
          name: "InvalidAbiDecodingType"
        });
      }
    }
    class B extends i.G {
      constructor(e) {
        super([`Value "${e}" is not a valid array.`].join("\n"), {
          name: "InvalidArrayError"
        });
      }
    }
    class S extends i.G {
      constructor(e) {
        super([`"${e}" is not a valid definition type.`, "Valid types: \"function\", \"event\", \"error\""].join("\n"), {
          name: "InvalidDefinitionTypeError"
        });
      }
    }
    class O extends i.G {
      constructor(e) {
        super(`Type "${e}" is not supported for packed encoding.`, {
          name: "UnsupportedPackedAbiType"
        });
      }
    }
  },
  65704: function (e, t, n) {
    "use strict";
    n.d(t, {
      Y: function () {
        return i;
      },
      o: function () {
        return o;
      }
    });
    var r = n(81544);
    class o extends r.G {
      constructor({docsPath: e} = {}) {
        super(["Could not find an Account to execute with this Action.", "Please provide an Account with the `account` argument on the Action, or by supplying an `account` to the Client."].join("\n"), {
          docsPath: e,
          docsSlug: "account",
          name: "AccountNotFoundError"
        });
      }
    }
    class i extends r.G {
      constructor({docsPath: e, metaMessages: t, type: n}) {
        super(`Account type "${n}" is not supported.`, {
          docsPath: e,
          metaMessages: t,
          name: "AccountTypeNotSupportedError"
        });
      }
    }
  },
  10052: function (e, t, n) {
    "use strict";
    n.d(t, {
      b: function () {
        return o;
      }
    });
    var r = n(81544);
    class o extends r.G {
      constructor({address: e}) {
        super(`Address "${e}" is invalid.`, {
          metaMessages: ["- Address must be a hex value of 20 bytes (40 hex characters).", "- Address must match its checksum counterpart."],
          name: "InvalidAddressError"
        });
      }
    }
  },
  81544: function (e, t, n) {
    "use strict";
    n.d(t, {
      G: function () {
        return i;
      }
    });
    const r = "2.38.2";
    let o = {
      getDocsUrl: ({docsBaseUrl: e, docsPath: t = "", docsSlug: n}) => t ? `${e ?? "https://viem.sh"}${t}${n ? `#${n}` : ""}` : void 0,
      version: `viem@${r}`
    };
    class i extends Error {
      constructor(e, t = {}) {
        const n = t.cause instanceof i ? t.cause.details : t.cause?.message ? t.cause.message : t.details, s = t.cause instanceof i && t.cause.docsPath || t.docsPath, a = o.getDocsUrl?.({
          ...t,
          docsPath: s
        });
        (super([e || "An error occurred.", "", ...t.metaMessages ? [...t.metaMessages, ""] : [], ...a ? [`Docs: ${a}`] : [], ...n ? [`Details: ${n}`] : [], ...o.version ? [`Version: ${o.version}`] : []].join("\n"), t.cause ? {
          cause: t.cause
        } : void 0), Object.defineProperty(this, "details", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), Object.defineProperty(this, "docsPath", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), Object.defineProperty(this, "metaMessages", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), Object.defineProperty(this, "shortMessage", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), Object.defineProperty(this, "version", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "BaseError"
        }), this.details = n, this.docsPath = s, this.metaMessages = t.metaMessages, this.name = t.name ?? this.name, this.shortMessage = e, this.version = r);
      }
      walk(e) {
        return s(this, e);
      }
    }
    function s(e, t) {
      return t?.(e) ? e : e && "object" === typeof e && ("cause" in e) && void 0 !== e.cause ? s(e.cause, t) : t ? null : e;
    }
  },
  12197: function (e, t, n) {
    "use strict";
    n.d(t, {
      f: function () {
        return o;
      }
    });
    var r = n(81544);
    class o extends r.G {
      constructor({blockHash: e, blockNumber: t}) {
        let n = "Block";
        (e && (n = `Block at hash "${e}"`), t && (n = `Block at number "${t}"`), super(`${n} could not be found.`, {
          name: "BlockNotFoundError"
        }));
      }
    }
  },
  35586: function (e, t, n) {
    "use strict";
    n.d(t, {
      Bk: function () {
        return s;
      },
      Yl: function () {
        return i;
      },
      mm: function () {
        return o;
      },
      pZ: function () {
        return a;
      }
    });
    var r = n(81544);
    class o extends r.G {
      constructor({blockNumber: e, chain: t, contract: n}) {
        super(`Chain "${t.name}" does not support contract "${n.name}".`, {
          metaMessages: ["This could be due to any of the following:", ...e && n.blockCreated && n.blockCreated > e ? [`- The contract "${n.name}" was not deployed until block ${n.blockCreated} (current block ${e}).`] : [`- The chain does not have the contract "${n.name}" configured.`]],
          name: "ChainDoesNotSupportContract"
        });
      }
    }
    class i extends r.G {
      constructor({chain: e, currentChainId: t}) {
        super(`The current chain of the wallet (id: ${t}) does not match the target chain for the transaction (id: ${e.id} \u2013 ${e.name}).`, {
          metaMessages: [`Current Chain ID:  ${t}`, `Expected Chain ID: ${e.id} \u2013 ${e.name}`],
          name: "ChainMismatchError"
        });
      }
    }
    class s extends r.G {
      constructor() {
        super(["No chain was provided to the request.", "Please provide a chain with the `chain` argument on the Action, or by supplying a `chain` to WalletClient."].join("\n"), {
          name: "ChainNotFoundError"
        });
      }
    }
    class a extends r.G {
      constructor() {
        super("No chain was provided to the Client.", {
          name: "ClientChainNotConfiguredError"
        });
      }
    }
    r.G;
  },
  20010: function (e, t, n) {
    "use strict";
    n.d(t, {
      cg: function () {
        return y;
      },
      uq: function () {
        return g;
      },
      Lu: function () {
        return w;
      },
      Dk: function () {
        return v;
      },
      Mo: function () {
        return A;
      },
      VQ: function () {
        return x;
      }
    });
    var r = n(19775), o = n(55246), i = n(33591), s = n(7275), a = n(31853);
    function c({abiItem: e, args: t, includeFunctionName: n = !0, includeName: r = !1}) {
      if (("name" in e) && ("inputs" in e) && e.inputs) return `${n ? e.name : ""}(${e.inputs.map((e, n) => `${r && e.name ? `${e.name}: ` : ""}${"object" === typeof t[n] ? (0, a.P)(t[n]) : t[n]}`).join(", ")})`;
    }
    var u = n(64043), l = n(71282), d = n(29707), f = n(65531), h = n(81544), p = n(29625), m = n(63228), b = n(97564);
    class y extends h.G {
      constructor(e, {account: t, docsPath: n, chain: o, data: i, gas: s, gasPrice: a, maxFeePerGas: c, maxPriorityFeePerGas: u, nonce: f, to: h, value: b, stateOverride: y}) {
        const g = t ? (0, r.T)(t) : void 0;
        let w = (0, m.xr)({
          from: g?.address,
          to: h,
          value: "undefined" !== typeof b && `${(0, l.d)(b)} ${o?.nativeCurrency?.symbol || "ETH"}`,
          data: i,
          gas: s,
          gasPrice: "undefined" !== typeof a && `${(0, d.o)(a)} gwei`,
          maxFeePerGas: "undefined" !== typeof c && `${(0, d.o)(c)} gwei`,
          maxPriorityFeePerGas: "undefined" !== typeof u && `${(0, d.o)(u)} gwei`,
          nonce: f
        });
        (y && (w += `\n${(0, p.Bj)(y)}`), super(e.shortMessage, {
          cause: e,
          docsPath: n,
          metaMessages: [...e.metaMessages ? [...e.metaMessages, " "] : [], "Raw Call Arguments:", w].filter(Boolean),
          name: "CallExecutionError"
        }), Object.defineProperty(this, "cause", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), this.cause = e);
      }
    }
    class g extends h.G {
      constructor(e, {abi: t, args: n, contractAddress: r, docsPath: o, functionName: i, sender: a}) {
        const l = (0, u.mE)({
          abi: t,
          args: n,
          name: i
        }), d = l ? c({
          abiItem: l,
          args: n,
          includeFunctionName: !1,
          includeName: !1
        }) : void 0, f = l ? (0, s.t)(l, {
          includeName: !0
        }) : void 0, h = (0, m.xr)({
          address: r && (0, b.C)(r),
          function: f,
          args: d && "()" !== d && `${[...Array(i?.length ?? 0).keys()].map(() => " ").join("")}${d}`,
          sender: a
        });
        (super(e.shortMessage || `An unknown error occurred while executing the contract function "${i}".`, {
          cause: e,
          docsPath: o,
          metaMessages: [...e.metaMessages ? [...e.metaMessages, " "] : [], h && "Contract Call:", h].filter(Boolean),
          name: "ContractFunctionExecutionError"
        }), Object.defineProperty(this, "abi", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), Object.defineProperty(this, "args", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), Object.defineProperty(this, "cause", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), Object.defineProperty(this, "contractAddress", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), Object.defineProperty(this, "formattedArgs", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), Object.defineProperty(this, "functionName", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), Object.defineProperty(this, "sender", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), this.abi = t, this.args = n, this.cause = e, this.contractAddress = r, this.functionName = i, this.sender = a);
      }
    }
    class w extends h.G {
      constructor({abi: e, data: t, functionName: n, message: r}) {
        let a, u, l, d, h;
        if (t && "0x" !== t) try {
          u = (0, i.p)({
            abi: e,
            data: t
          });
          const {abiItem: n, errorName: r, args: a} = u;
          if ("Error" === r) d = a[0]; else if ("Panic" === r) {
            const [e] = a;
            d = o.$[e];
          } else {
            const e = n ? (0, s.t)(n, {
              includeName: !0
            }) : void 0, t = n && a ? c({
              abiItem: n,
              args: a,
              includeFunctionName: !1,
              includeName: !1
            }) : void 0;
            l = [e ? `Error: ${e}` : "", t && "()" !== t ? `       ${[...Array(r?.length ?? 0).keys()].map(() => " ").join("")}${t}` : ""];
          }
        } catch (p) {
          a = p;
        } else r && (d = r);
        (a instanceof f.yP && (h = a.signature, l = [`Unable to decode signature "${h}" as it was not found on the provided ABI.`, "Make sure you are using the correct ABI and that the error exists on it.", `You can look up the decoded signature here: https://openchain.xyz/signatures?query=${h}.`]), super(d && "execution reverted" !== d || h ? [`The contract function "${n}" reverted with the following ${h ? "signature" : "reason"}:`, d || h].join("\n") : `The contract function "${n}" reverted.`, {
          cause: a,
          metaMessages: l,
          name: "ContractFunctionRevertedError"
        }), Object.defineProperty(this, "data", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), Object.defineProperty(this, "raw", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), Object.defineProperty(this, "reason", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), Object.defineProperty(this, "signature", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), this.data = u, this.raw = t, this.reason = d, this.signature = h);
      }
    }
    class v extends h.G {
      constructor({functionName: e}) {
        super(`The contract function "${e}" returned no data ("0x").`, {
          metaMessages: ["This could be due to any of the following:", `  - The contract does not have the function "${e}",`, "  - The parameters passed to the contract function may be invalid, or", "  - The address is not a contract."],
          name: "ContractFunctionZeroDataError"
        });
      }
    }
    class A extends h.G {
      constructor({factory: e}) {
        super("Deployment for counterfactual contract call failed" + (e ? ` for factory "${e}".` : ""), {
          metaMessages: ["Please ensure:", "- The `factory` is a valid contract deployment factory (ie. Create2 Factory, ERC-4337 Factory, etc).", "- The `factoryData` is a valid encoded function call for contract deployment function on the factory."],
          name: "CounterfactualDeploymentFailedError"
        });
      }
    }
    class x extends h.G {
      constructor({data: e, message: t}) {
        (super(t || "", {
          name: "RawContractError"
        }), Object.defineProperty(this, "code", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: 3
        }), Object.defineProperty(this, "data", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), this.data = e);
      }
    }
  },
  33630: function (e, t, n) {
    "use strict";
    n.d(t, {
      KD: function () {
        return s;
      },
      T_: function () {
        return o;
      },
      lQ: function () {
        return i;
      }
    });
    var r = n(81544);
    class o extends r.G {
      constructor({offset: e}) {
        super(`Offset \`${e}\` cannot be negative.`, {
          name: "NegativeOffsetError"
        });
      }
    }
    class i extends r.G {
      constructor({length: e, position: t}) {
        super(`Position \`${t}\` is out of bounds (\`0 < position < ${e}\`).`, {
          name: "PositionOutOfBoundsError"
        });
      }
    }
    class s extends r.G {
      constructor({count: e, limit: t}) {
        super(`Recursive read limit of \`${t}\` exceeded (recursive read count: \`${e}\`).`, {
          name: "RecursiveReadLimitExceededError"
        });
      }
    }
  },
  47116: function (e, t, n) {
    "use strict";
    n.d(t, {
      $s: function () {
        return i;
      },
      W_: function () {
        return s;
      },
      mV: function () {
        return o;
      }
    });
    var r = n(81544);
    class o extends r.G {
      constructor({offset: e, position: t, size: n}) {
        super(`Slice ${"start" === t ? "starting" : "ending"} at offset "${e}" is out-of-bounds (size: ${n}).`, {
          name: "SliceOffsetOutOfBoundsError"
        });
      }
    }
    class i extends r.G {
      constructor({size: e, targetSize: t, type: n}) {
        super(`${n.charAt(0).toUpperCase()}${n.slice(1).toLowerCase()} size (${e}) exceeds padding size (${t}).`, {
          name: "SizeExceedsPaddingSizeError"
        });
      }
    }
    class s extends r.G {
      constructor({size: e, targetSize: t, type: n}) {
        super(`${n.charAt(0).toUpperCase()}${n.slice(1).toLowerCase()} is expected to be ${t} ${n} long, but is ${e} ${n} long.`, {
          name: "InvalidBytesLengthError"
        });
      }
    }
  },
  63152: function (e, t, n) {
    "use strict";
    n.d(t, {
      Cd: function () {
        return s;
      },
      J5: function () {
        return o;
      },
      M6: function () {
        return a;
      },
      yr: function () {
        return i;
      }
    });
    var r = n(81544);
    class o extends r.G {
      constructor({max: e, min: t, signed: n, size: r, value: o}) {
        super(`Number "${o}" is not in safe ${r ? `${8 * r}-bit ${n ? "signed" : "unsigned"} ` : ""}integer range ${e ? `(${t} to ${e})` : `(above ${t})`}`, {
          name: "IntegerOutOfRangeError"
        });
      }
    }
    class i extends r.G {
      constructor(e) {
        super(`Bytes value "${e}" is not a valid boolean. The bytes array must contain a single byte of either a 0 or 1 value.`, {
          name: "InvalidBytesBooleanError"
        });
      }
    }
    class s extends r.G {
      constructor(e) {
        super(`Hex value "${e}" is not a valid boolean. The hex value must be "0x0" (false) or "0x1" (true).`, {
          name: "InvalidHexBooleanError"
        });
      }
    }
    r.G;
    class a extends r.G {
      constructor({givenSize: e, maxSize: t}) {
        super(`Size cannot exceed ${t} bytes. Given size: ${e} bytes.`, {
          name: "SizeOverflowError"
        });
      }
    }
  },
  4496: function (e, t, n) {
    "use strict";
    n.d(t, {
      Fz: function () {
        return i;
      },
      e5: function () {
        return s;
      },
      ld: function () {
        return a;
      }
    });
    var r = n(29707), o = n(81544);
    class i extends o.G {
      constructor() {
        super("`baseFeeMultiplier` must be greater than 1.", {
          name: "BaseFeeScalarError"
        });
      }
    }
    class s extends o.G {
      constructor() {
        super("Chain does not support EIP-1559 fees.", {
          name: "Eip1559FeesNotSupportedError"
        });
      }
    }
    class a extends o.G {
      constructor({maxPriorityFeePerGas: e}) {
        super(`\`maxFeePerGas\` cannot be less than the \`maxPriorityFeePerGas\` (${(0, r.o)(e)} gwei).`, {
          name: "MaxFeePerGasTooLowError"
        });
      }
    }
  },
  78125: function (e, t, n) {
    "use strict";
    n.d(t, {
      C_: function () {
        return d;
      },
      G$: function () {
        return a;
      },
      Hh: function () {
        return s;
      },
      M_: function () {
        return i;
      },
      WF: function () {
        return f;
      },
      ZI: function () {
        return c;
      },
      cj: function () {
        return b;
      },
      cs: function () {
        return m;
      },
      dR: function () {
        return h;
      },
      pZ: function () {
        return p;
      },
      se: function () {
        return l;
      },
      vU: function () {
        return u;
      }
    });
    var r = n(29707), o = n(81544);
    class i extends o.G {
      constructor({cause: e, message: t} = {}) {
        const n = t?.replace("execution reverted: ", "")?.replace("execution reverted", "");
        super(`Execution reverted ${n ? `with reason: ${n}` : "for an unknown reason"}.`, {
          cause: e,
          name: "ExecutionRevertedError"
        });
      }
    }
    (Object.defineProperty(i, "code", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: 3
    }), Object.defineProperty(i, "nodeMessage", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: /execution reverted/
    }));
    class s extends o.G {
      constructor({cause: e, maxFeePerGas: t} = {}) {
        super(`The fee cap (\`maxFeePerGas\`${t ? ` = ${(0, r.o)(t)} gwei` : ""}) cannot be higher than the maximum allowed value (2^256-1).`, {
          cause: e,
          name: "FeeCapTooHighError"
        });
      }
    }
    Object.defineProperty(s, "nodeMessage", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: /max fee per gas higher than 2\^256-1|fee cap higher than 2\^256-1/
    });
    class a extends o.G {
      constructor({cause: e, maxFeePerGas: t} = {}) {
        super(`The fee cap (\`maxFeePerGas\`${t ? ` = ${(0, r.o)(t)}` : ""} gwei) cannot be lower than the block base fee.`, {
          cause: e,
          name: "FeeCapTooLowError"
        });
      }
    }
    Object.defineProperty(a, "nodeMessage", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: /max fee per gas less than block base fee|fee cap less than block base fee|transaction is outdated/
    });
    class c extends o.G {
      constructor({cause: e, nonce: t} = {}) {
        super(`Nonce provided for the transaction ${t ? `(${t}) ` : ""}is higher than the next one expected.`, {
          cause: e,
          name: "NonceTooHighError"
        });
      }
    }
    Object.defineProperty(c, "nodeMessage", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: /nonce too high/
    });
    class u extends o.G {
      constructor({cause: e, nonce: t} = {}) {
        super([`Nonce provided for the transaction ${t ? `(${t}) ` : ""}is lower than the current nonce of the account.`, "Try increasing the nonce or find the latest nonce with `getTransactionCount`."].join("\n"), {
          cause: e,
          name: "NonceTooLowError"
        });
      }
    }
    Object.defineProperty(u, "nodeMessage", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: /nonce too low|transaction already imported|already known/
    });
    class l extends o.G {
      constructor({cause: e, nonce: t} = {}) {
        super(`Nonce provided for the transaction ${t ? `(${t}) ` : ""}exceeds the maximum allowed nonce.`, {
          cause: e,
          name: "NonceMaxValueError"
        });
      }
    }
    Object.defineProperty(l, "nodeMessage", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: /nonce has max value/
    });
    class d extends o.G {
      constructor({cause: e} = {}) {
        super(["The total cost (gas * gas fee + value) of executing this transaction exceeds the balance of the account."].join("\n"), {
          cause: e,
          metaMessages: ["This error could arise when the account does not have enough funds to:", " - pay for the total gas fee,", " - pay for the value to send.", " ", "The cost of the transaction is calculated as `gas * gas fee + value`, where:", " - `gas` is the amount of gas needed for transaction to execute,", " - `gas fee` is the gas fee,", " - `value` is the amount of ether to send to the recipient."],
          name: "InsufficientFundsError"
        });
      }
    }
    Object.defineProperty(d, "nodeMessage", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: /insufficient funds|exceeds transaction sender account balance/
    });
    class f extends o.G {
      constructor({cause: e, gas: t} = {}) {
        super(`The amount of gas ${t ? `(${t}) ` : ""}provided for the transaction exceeds the limit allowed for the block.`, {
          cause: e,
          name: "IntrinsicGasTooHighError"
        });
      }
    }
    Object.defineProperty(f, "nodeMessage", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: /intrinsic gas too high|gas limit reached/
    });
    class h extends o.G {
      constructor({cause: e, gas: t} = {}) {
        super(`The amount of gas ${t ? `(${t}) ` : ""}provided for the transaction is too low.`, {
          cause: e,
          name: "IntrinsicGasTooLowError"
        });
      }
    }
    Object.defineProperty(h, "nodeMessage", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: /intrinsic gas too low/
    });
    class p extends o.G {
      constructor({cause: e}) {
        super("The transaction type is not supported for this chain.", {
          cause: e,
          name: "TransactionTypeNotSupportedError"
        });
      }
    }
    Object.defineProperty(p, "nodeMessage", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: /transaction type not valid/
    });
    class m extends o.G {
      constructor({cause: e, maxPriorityFeePerGas: t, maxFeePerGas: n} = {}) {
        super([`The provided tip (\`maxPriorityFeePerGas\`${t ? ` = ${(0, r.o)(t)} gwei` : ""}) cannot be higher than the fee cap (\`maxFeePerGas\`${n ? ` = ${(0, r.o)(n)} gwei` : ""}).`].join("\n"), {
          cause: e,
          name: "TipAboveFeeCapError"
        });
      }
    }
    Object.defineProperty(m, "nodeMessage", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: /max priority fee per gas higher than max fee per gas|tip higher than fee cap/
    });
    class b extends o.G {
      constructor({cause: e}) {
        super(`An error occurred while executing: ${e?.shortMessage}`, {
          cause: e,
          name: "UnknownNodeError"
        });
      }
    }
  },
  17057: function (e, t, n) {
    "use strict";
    n.d(t, {
      Gg: function () {
        return s;
      },
      W5: function () {
        return c;
      },
      bs: function () {
        return a;
      }
    });
    var r = n(31853), o = n(81544), i = n(97564);
    class s extends o.G {
      constructor({body: e, cause: t, details: n, headers: o, status: s, url: a}) {
        (super("HTTP request failed.", {
          cause: t,
          details: n,
          metaMessages: [s && `Status: ${s}`, `URL: ${(0, i.G)(a)}`, e && `Request body: ${(0, r.P)(e)}`].filter(Boolean),
          name: "HttpRequestError"
        }), Object.defineProperty(this, "body", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), Object.defineProperty(this, "headers", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), Object.defineProperty(this, "status", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), Object.defineProperty(this, "url", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), this.body = e, this.headers = o, this.status = s, this.url = a);
      }
    }
    o.G;
    class a extends o.G {
      constructor({body: e, error: t, url: n}) {
        (super("RPC Request failed.", {
          cause: t,
          details: t.message,
          metaMessages: [`URL: ${(0, i.G)(n)}`, `Request body: ${(0, r.P)(e)}`],
          name: "RpcRequestError"
        }), Object.defineProperty(this, "code", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), Object.defineProperty(this, "data", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), this.code = t.code, this.data = t.data);
      }
    }
    o.G;
    class c extends o.G {
      constructor({body: e, url: t}) {
        super("The request took too long to respond.", {
          details: "The request timed out.",
          metaMessages: [`URL: ${(0, i.G)(t)}`, `Request body: ${(0, r.P)(e)}`],
          name: "TimeoutError"
        });
      }
    }
  },
  77014: function (e, t, n) {
    "use strict";
    n.d(t, {
      B: function () {
        return c;
      },
      EJ: function () {
        return B;
      },
      GD: function () {
        return g;
      },
      I0: function () {
        return C;
      },
      KB: function () {
        return m;
      },
      LX: function () {
        return u;
      },
      NO: function () {
        return O;
      },
      Nt: function () {
        return I;
      },
      Og: function () {
        return h;
      },
      PE: function () {
        return v;
      },
      Pv: function () {
        return y;
      },
      Ts: function () {
        return A;
      },
      Uu: function () {
        return k;
      },
      XS: function () {
        return d;
      },
      ab: function () {
        return w;
      },
      fl: function () {
        return S;
      },
      gS: function () {
        return b;
      },
      ir: function () {
        return T;
      },
      nY: function () {
        return l;
      },
      pT: function () {
        return p;
      },
      r0: function () {
        return M;
      },
      s7: function () {
        return a;
      },
      u5: function () {
        return x;
      },
      vl: function () {
        return E;
      },
      x3: function () {
        return P;
      },
      yR: function () {
        return f;
      }
    });
    var r = n(81544), o = n(17057);
    class i extends r.G {
      constructor(e, {code: t, docsPath: n, metaMessages: r, name: i, shortMessage: s}) {
        (super(s, {
          cause: e,
          docsPath: n,
          metaMessages: r || e?.metaMessages,
          name: i || "RpcError"
        }), Object.defineProperty(this, "code", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), this.name = i || e.name, this.code = e instanceof o.bs ? e.code : t ?? -1);
      }
    }
    class s extends i {
      constructor(e, t) {
        (super(e, t), Object.defineProperty(this, "data", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), this.data = t.data);
      }
    }
    class a extends i {
      constructor(e) {
        super(e, {
          code: a.code,
          name: "ParseRpcError",
          shortMessage: "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text."
        });
      }
    }
    Object.defineProperty(a, "code", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: -32700
    });
    class c extends i {
      constructor(e) {
        super(e, {
          code: c.code,
          name: "InvalidRequestRpcError",
          shortMessage: "JSON is not a valid request object."
        });
      }
    }
    Object.defineProperty(c, "code", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: -32600
    });
    class u extends i {
      constructor(e, {method: t} = {}) {
        super(e, {
          code: u.code,
          name: "MethodNotFoundRpcError",
          shortMessage: `The method${t ? ` "${t}"` : ""} does not exist / is not available.`
        });
      }
    }
    Object.defineProperty(u, "code", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: -32601
    });
    class l extends i {
      constructor(e) {
        super(e, {
          code: l.code,
          name: "InvalidParamsRpcError",
          shortMessage: ["Invalid parameters were provided to the RPC method.", "Double check you have provided the correct parameters."].join("\n")
        });
      }
    }
    Object.defineProperty(l, "code", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: -32602
    });
    class d extends i {
      constructor(e) {
        super(e, {
          code: d.code,
          name: "InternalRpcError",
          shortMessage: "An internal error was received."
        });
      }
    }
    Object.defineProperty(d, "code", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: -32603
    });
    class f extends i {
      constructor(e) {
        super(e, {
          code: f.code,
          name: "InvalidInputRpcError",
          shortMessage: ["Missing or invalid parameters.", "Double check you have provided the correct parameters."].join("\n")
        });
      }
    }
    Object.defineProperty(f, "code", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: -32000
    });
    class h extends i {
      constructor(e) {
        (super(e, {
          code: h.code,
          name: "ResourceNotFoundRpcError",
          shortMessage: "Requested resource not found."
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "ResourceNotFoundRpcError"
        }));
      }
    }
    Object.defineProperty(h, "code", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: -32001
    });
    class p extends i {
      constructor(e) {
        super(e, {
          code: p.code,
          name: "ResourceUnavailableRpcError",
          shortMessage: "Requested resource not available."
        });
      }
    }
    Object.defineProperty(p, "code", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: -32002
    });
    class m extends i {
      constructor(e) {
        super(e, {
          code: m.code,
          name: "TransactionRejectedRpcError",
          shortMessage: "Transaction creation failed."
        });
      }
    }
    Object.defineProperty(m, "code", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: -32003
    });
    class b extends i {
      constructor(e, {method: t} = {}) {
        super(e, {
          code: b.code,
          name: "MethodNotSupportedRpcError",
          shortMessage: `Method${t ? ` "${t}"` : ""} is not supported.`
        });
      }
    }
    Object.defineProperty(b, "code", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: -32004
    });
    class y extends i {
      constructor(e) {
        super(e, {
          code: y.code,
          name: "LimitExceededRpcError",
          shortMessage: "Request exceeds defined limit."
        });
      }
    }
    Object.defineProperty(y, "code", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: -32005
    });
    class g extends i {
      constructor(e) {
        super(e, {
          code: g.code,
          name: "JsonRpcVersionUnsupportedError",
          shortMessage: "Version of JSON-RPC protocol is not supported."
        });
      }
    }
    Object.defineProperty(g, "code", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: -32006
    });
    class w extends s {
      constructor(e) {
        super(e, {
          code: w.code,
          name: "UserRejectedRequestError",
          shortMessage: "User rejected the request."
        });
      }
    }
    Object.defineProperty(w, "code", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: 4001
    });
    class v extends s {
      constructor(e) {
        super(e, {
          code: v.code,
          name: "UnauthorizedProviderError",
          shortMessage: "The requested method and/or account has not been authorized by the user."
        });
      }
    }
    Object.defineProperty(v, "code", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: 4100
    });
    class A extends s {
      constructor(e, {method: t} = {}) {
        super(e, {
          code: A.code,
          name: "UnsupportedProviderMethodError",
          shortMessage: `The Provider does not support the requested method${t ? ` " ${t}"` : ""}.`
        });
      }
    }
    Object.defineProperty(A, "code", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: 4200
    });
    class x extends s {
      constructor(e) {
        super(e, {
          code: x.code,
          name: "ProviderDisconnectedError",
          shortMessage: "The Provider is disconnected from all chains."
        });
      }
    }
    Object.defineProperty(x, "code", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: 4900
    });
    class C extends s {
      constructor(e) {
        super(e, {
          code: C.code,
          name: "ChainDisconnectedError",
          shortMessage: "The Provider is not connected to the requested chain."
        });
      }
    }
    Object.defineProperty(C, "code", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: 4901
    });
    class P extends s {
      constructor(e) {
        super(e, {
          code: P.code,
          name: "SwitchChainError",
          shortMessage: "An error occurred when attempting to switch chain."
        });
      }
    }
    Object.defineProperty(P, "code", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: 4902
    });
    class E extends s {
      constructor(e) {
        super(e, {
          code: E.code,
          name: "UnsupportedNonOptionalCapabilityError",
          shortMessage: "This Wallet does not support a capability that was not marked as optional."
        });
      }
    }
    Object.defineProperty(E, "code", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: 5700
    });
    class k extends s {
      constructor(e) {
        super(e, {
          code: k.code,
          name: "UnsupportedChainIdError",
          shortMessage: "This Wallet does not support the requested chain ID."
        });
      }
    }
    Object.defineProperty(k, "code", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: 5710
    });
    class I extends s {
      constructor(e) {
        super(e, {
          code: I.code,
          name: "DuplicateIdError",
          shortMessage: "There is already a bundle submitted with this ID."
        });
      }
    }
    Object.defineProperty(I, "code", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: 5720
    });
    class B extends s {
      constructor(e) {
        super(e, {
          code: B.code,
          name: "UnknownBundleIdError",
          shortMessage: "This bundle id is unknown / has not been submitted"
        });
      }
    }
    Object.defineProperty(B, "code", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: 5730
    });
    class S extends s {
      constructor(e) {
        super(e, {
          code: S.code,
          name: "BundleTooLargeError",
          shortMessage: "The call bundle is too large for the Wallet to process."
        });
      }
    }
    Object.defineProperty(S, "code", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: 5740
    });
    class O extends s {
      constructor(e) {
        super(e, {
          code: O.code,
          name: "AtomicReadyWalletRejectedUpgradeError",
          shortMessage: "The Wallet can support atomicity after an upgrade, but the user rejected the upgrade."
        });
      }
    }
    Object.defineProperty(O, "code", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: 5750
    });
    class M extends s {
      constructor(e) {
        super(e, {
          code: M.code,
          name: "AtomicityNotSupportedError",
          shortMessage: "The wallet does not support atomic execution but the request requires it."
        });
      }
    }
    Object.defineProperty(M, "code", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: 5760
    });
    class T extends i {
      constructor(e) {
        super(e, {
          name: "UnknownRpcError",
          shortMessage: "An unknown RPC error occurred."
        });
      }
    }
  },
  29625: function (e, t, n) {
    "use strict";
    n.d(t, {
      Bj: function () {
        return a;
      },
      Nc: function () {
        return o;
      },
      Z8: function () {
        return i;
      }
    });
    var r = n(81544);
    class o extends r.G {
      constructor({address: e}) {
        super(`State for account "${e}" is set multiple times.`, {
          name: "AccountStateConflictError"
        });
      }
    }
    class i extends r.G {
      constructor() {
        super("state and stateDiff are set on the same account.", {
          name: "StateAssignmentConflictError"
        });
      }
    }
    function s(e) {
      return e.reduce((e, {slot: t, value: n}) => `${e}        ${t}: ${n}\n`, "");
    }
    function a(e) {
      return e.reduce((e, {address: t, ...n}) => {
        let r = `${e}    ${t}:\n`;
        return (n.nonce && (r += `      nonce: ${n.nonce}\n`), n.balance && (r += `      balance: ${n.balance}\n`), n.code && (r += `      code: ${n.code}\n`), n.state && (r += "      state:\n", r += s(n.state)), n.stateDiff && (r += "      stateDiff:\n", r += s(n.stateDiff)), r);
      }, "  State Override:\n").slice(0, -1);
    }
  },
  63228: function (e, t, n) {
    "use strict";
    n.d(t, {
      A3: function () {
        return f;
      },
      Bh: function () {
        return l;
      },
      Yb: function () {
        return d;
      },
      j3: function () {
        return c;
      },
      mc: function () {
        return h;
      },
      mk: function () {
        return u;
      },
      xY: function () {
        return a;
      },
      xr: function () {
        return s;
      }
    });
    var r = n(71282), o = n(29707), i = n(81544);
    function s(e) {
      const t = Object.entries(e).map(([e, t]) => void 0 === t || !1 === t ? null : [e, t]).filter(Boolean), n = t.reduce((e, [t]) => Math.max(e, t.length), 0);
      return t.map(([e, t]) => `  ${`${e}:`.padEnd(n + 1)}  ${t}`).join("\n");
    }
    class a extends i.G {
      constructor() {
        super(["Cannot specify both a `gasPrice` and a `maxFeePerGas`/`maxPriorityFeePerGas`.", "Use `maxFeePerGas`/`maxPriorityFeePerGas` for EIP-1559 compatible networks, and `gasPrice` for others."].join("\n"), {
          name: "FeeConflictError"
        });
      }
    }
    i.G;
    class c extends i.G {
      constructor({transaction: e}) {
        super("Cannot infer a transaction type from provided transaction.", {
          metaMessages: ["Provided Transaction:", "{", s(e), "}", "", "To infer the type, either provide:", "- a `type` to the Transaction, or", "- an EIP-1559 Transaction with `maxFeePerGas`, or", "- an EIP-2930 Transaction with `gasPrice` & `accessList`, or", "- an EIP-4844 Transaction with `blobs`, `blobVersionedHashes`, `sidecars`, or", "- an EIP-7702 Transaction with `authorizationList`, or", "- a Legacy Transaction with `gasPrice`"],
          name: "InvalidSerializableTransactionError"
        });
      }
    }
    i.G;
    i.G;
    i.G;
    class u extends i.G {
      constructor(e, {account: t, docsPath: n, chain: i, data: a, gas: c, gasPrice: u, maxFeePerGas: l, maxPriorityFeePerGas: d, nonce: f, to: h, value: p}) {
        const m = s({
          chain: i && `${i?.name} (id: ${i?.id})`,
          from: t?.address,
          to: h,
          value: "undefined" !== typeof p && `${(0, r.d)(p)} ${i?.nativeCurrency?.symbol || "ETH"}`,
          data: a,
          gas: c,
          gasPrice: "undefined" !== typeof u && `${(0, o.o)(u)} gwei`,
          maxFeePerGas: "undefined" !== typeof l && `${(0, o.o)(l)} gwei`,
          maxPriorityFeePerGas: "undefined" !== typeof d && `${(0, o.o)(d)} gwei`,
          nonce: f
        });
        (super(e.shortMessage, {
          cause: e,
          docsPath: n,
          metaMessages: [...e.metaMessages ? [...e.metaMessages, " "] : [], "Request Arguments:", m].filter(Boolean),
          name: "TransactionExecutionError"
        }), Object.defineProperty(this, "cause", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), this.cause = e);
      }
    }
    class l extends i.G {
      constructor({blockHash: e, blockNumber: t, blockTag: n, hash: r, index: o}) {
        let i = "Transaction";
        (n && void 0 !== o && (i = `Transaction at block time "${n}" at index "${o}"`), e && void 0 !== o && (i = `Transaction at block hash "${e}" at index "${o}"`), t && void 0 !== o && (i = `Transaction at block number "${t}" at index "${o}"`), r && (i = `Transaction with hash "${r}"`), super(`${i} could not be found.`, {
          name: "TransactionNotFoundError"
        }));
      }
    }
    class d extends i.G {
      constructor({hash: e}) {
        super(`Transaction receipt with hash "${e}" could not be found. The Transaction may not be processed on a block yet.`, {
          name: "TransactionReceiptNotFoundError"
        });
      }
    }
    class f extends i.G {
      constructor({receipt: e}) {
        (super(`Transaction with hash "${e.transactionHash}" reverted.`, {
          metaMessages: ["The receipt marked the transaction as \"reverted\". This could mean that the function on the contract you are trying to call threw an error.", " ", "You can attempt to extract the revert reason by:", "- calling the `simulateContract` or `simulateCalls` Action with the `abi` and `functionName` of the contract", "- using the `call` Action with raw `data`"],
          name: "TransactionReceiptRevertedError"
        }), Object.defineProperty(this, "receipt", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), this.receipt = e);
      }
    }
    class h extends i.G {
      constructor({hash: e}) {
        super(`Timed out while waiting for transaction with hash "${e}" to be confirmed.`, {
          name: "WaitForTransactionReceiptTimeoutError"
        });
      }
    }
  },
  97564: function (e, t, n) {
    "use strict";
    n.d(t, {
      C: function () {
        return r;
      },
      G: function () {
        return o;
      }
    });
    const r = e => e, o = e => e;
  },
  2742: function (e, t, n) {
    "use strict";
    n.d(t, {
      r: function () {
        return g;
      }
    });
    var r = n(65531), o = n(31669), i = n(46033), s = n(20556), a = n(69921), c = n(36826), u = n(63152), l = n(72932), d = n(59455);
    function f(e, t = {}) {
      "undefined" !== typeof t.size && (0, l.Yf)(e, {
        size: t.size
      });
      const n = (0, d.ci)(e, t);
      return (0, l.y_)(n, t);
    }
    function h(e, t = {}) {
      let n = e;
      if (("undefined" !== typeof t.size && ((0, l.Yf)(n, {
        size: t.size
      }), n = (0, c.f)(n)), n.length > 1 || n[0] > 1)) throw new u.yr(n);
      return Boolean(n[0]);
    }
    function p(e, t = {}) {
      "undefined" !== typeof t.size && (0, l.Yf)(e, {
        size: t.size
      });
      const n = (0, d.ci)(e, t);
      return (0, l.ly)(n, t);
    }
    function m(e, t = {}) {
      let n = e;
      return ("undefined" !== typeof t.size && ((0, l.Yf)(n, {
        size: t.size
      }), n = (0, c.f)(n, {
        dir: "right"
      })), new TextDecoder().decode(n));
    }
    var b = n(44659), y = n(30056);
    function g(e, t) {
      const n = "string" === typeof t ? (0, b.nr)(t) : t, o = (0, i.q)(n);
      if (0 === (0, s.d)(n) && e.length > 0) throw new r.wb();
      if ((0, s.d)(t) && (0, s.d)(t) < 32) throw new r.xB({
        data: "string" === typeof t ? t : (0, d.ci)(t),
        params: e,
        size: (0, s.d)(t)
      });
      let a = 0;
      const c = [];
      for (let r = 0; r < e.length; ++r) {
        const t = e[r];
        o.setPosition(a);
        const [n, i] = w(o, t, {
          staticPosition: 0
        });
        (a += i, c.push(n));
      }
      return c;
    }
    function w(e, t, {staticPosition: n}) {
      const i = (0, y.S)(t.type);
      if (i) {
        const [r, o] = i;
        return (function (e, t, {length: n, staticPosition: r}) {
          if (!n) {
            const n = r + p(e.readBytes(A)), o = n + v;
            e.setPosition(n);
            const i = p(e.readBytes(v)), s = x(t);
            let a = 0;
            const c = [];
            for (let r = 0; r < i; ++r) {
              e.setPosition(o + (s ? 32 * r : a));
              const [n, i] = w(e, t, {
                staticPosition: o
              });
              (a += i, c.push(n));
            }
            return (e.setPosition(r + 32), [c, 32]);
          }
          if (x(t)) {
            const o = r + p(e.readBytes(A)), i = [];
            for (let r = 0; r < n; ++r) {
              e.setPosition(o + 32 * r);
              const [n] = w(e, t, {
                staticPosition: o
              });
              i.push(n);
            }
            return (e.setPosition(r + 32), [i, 32]);
          }
          let o = 0;
          const i = [];
          for (let s = 0; s < n; ++s) {
            const [n, s] = w(e, t, {
              staticPosition: r + o
            });
            (o += s, i.push(n));
          }
          return [i, o];
        })(e, {
          ...t,
          type: o
        }, {
          length: r,
          staticPosition: n
        });
      }
      if ("tuple" === t.type) return (function (e, t, {staticPosition: n}) {
        const r = 0 === t.components.length || t.components.some(({name: e}) => !e), o = r ? [] : {};
        let i = 0;
        if (x(t)) {
          const s = n + p(e.readBytes(A));
          for (let n = 0; n < t.components.length; ++n) {
            const a = t.components[n];
            e.setPosition(s + i);
            const [c, u] = w(e, a, {
              staticPosition: s
            });
            (i += u, o[r ? n : a?.name] = c);
          }
          return (e.setPosition(n + 32), [o, 32]);
        }
        for (let s = 0; s < t.components.length; ++s) {
          const a = t.components[s], [c, u] = w(e, a, {
            staticPosition: n
          });
          (o[r ? s : a?.name] = c, i += u);
        }
        return [o, i];
      })(e, t, {
        staticPosition: n
      });
      if ("address" === t.type) return (function (e) {
        const t = e.readBytes(32);
        return [(0, o.x)((0, d.ci)((0, a.T4)(t, -20))), 32];
      })(e);
      if ("bool" === t.type) return (function (e) {
        return [h(e.readBytes(32), {
          size: 32
        }), 32];
      })(e);
      if (t.type.startsWith("bytes")) return (function (e, t, {staticPosition: n}) {
        const [r, o] = t.type.split("bytes");
        if (!o) {
          const t = p(e.readBytes(32));
          e.setPosition(n + t);
          const r = p(e.readBytes(32));
          if (0 === r) return (e.setPosition(n + 32), ["0x", 32]);
          const o = e.readBytes(r);
          return (e.setPosition(n + 32), [(0, d.ci)(o), 32]);
        }
        const i = (0, d.ci)(e.readBytes(Number.parseInt(o, 10), 32));
        return [i, 32];
      })(e, t, {
        staticPosition: n
      });
      if (t.type.startsWith("uint") || t.type.startsWith("int")) return (function (e, t) {
        const n = t.type.startsWith("int"), r = Number.parseInt(t.type.split("int")[1] || "256", 10), o = e.readBytes(32);
        return [r > 48 ? f(o, {
          signed: n
        }) : p(o, {
          signed: n
        }), 32];
      })(e, t);
      if ("string" === t.type) return (function (e, {staticPosition: t}) {
        const n = p(e.readBytes(32)), r = t + n;
        e.setPosition(r);
        const o = p(e.readBytes(32));
        if (0 === o) return (e.setPosition(t + 32), ["", 32]);
        const i = e.readBytes(o, 32), s = m((0, c.f)(i));
        return (e.setPosition(t + 32), [s, 32]);
      })(e, {
        staticPosition: n
      });
      throw new r.CI(t.type, {
        docsPath: "/docs/contract/decodeAbiParameters"
      });
    }
    const v = 32, A = 32;
    function x(e) {
      const {type: t} = e;
      if ("string" === t) return !0;
      if ("bytes" === t) return !0;
      if (t.endsWith("[]")) return !0;
      if ("tuple" === t) return e.components?.some(x);
      const n = (0, y.S)(e.type);
      return !(!n || !x({
        ...e,
        type: n[1]
      }));
    }
  },
  33591: function (e, t, n) {
    "use strict";
    n.d(t, {
      p: function () {
        return u;
      }
    });
    var r = n(55246), o = n(65531), i = n(69921), s = n(10464), a = n(2742), c = n(7275);
    function u(e) {
      const {abi: t, data: n} = e, u = (0, i.tP)(n, 0, 4);
      if ("0x" === u) throw new o.wb();
      const l = [...t || [], r.Up, r.hZ].find(e => "error" === e.type && u === (0, s.C)((0, c.t)(e)));
      if (!l) throw new o.yP(u, {
        docsPath: "/docs/contract/decodeErrorResult"
      });
      return {
        abiItem: l,
        args: ("inputs" in l) && l.inputs && l.inputs.length > 0 ? (0, a.r)(l.inputs, (0, i.tP)(n, 4)) : void 0,
        errorName: l.name
      };
    }
  },
  87721: function (e, t, n) {
    "use strict";
    n.d(t, {
      p: function () {
        return c;
      }
    });
    var r = n(65531), o = n(69921), i = n(10464), s = n(2742), a = n(7275);
    function c(e) {
      const {abi: t, data: n} = e, c = (0, o.tP)(n, 0, 4), u = t.find(e => "function" === e.type && c === (0, i.C)((0, a.t)(e)));
      if (!u) throw new r.eF(c, {
        docsPath: "/docs/contract/decodeFunctionData"
      });
      return {
        functionName: u.name,
        args: ("inputs" in u) && u.inputs && u.inputs.length > 0 ? (0, s.r)(u.inputs, (0, o.tP)(n, 4)) : void 0
      };
    }
  },
  65436: function (e, t, n) {
    "use strict";
    n.d(t, {
      k: function () {
        return a;
      }
    });
    var r = n(65531), o = n(2742), i = n(64043);
    const s = "/docs/contract/decodeFunctionResult";
    function a(e) {
      const {abi: t, args: n, functionName: a, data: c} = e;
      let u = t[0];
      if (a) {
        const e = (0, i.mE)({
          abi: t,
          args: n,
          name: a
        });
        if (!e) throw new r.xL(a, {
          docsPath: s
        });
        u = e;
      }
      if ("function" !== u.type) throw new r.xL(void 0, {
        docsPath: s
      });
      if (!u.outputs) throw new r.MX(u.name, {
        docsPath: s
      });
      const l = (0, o.r)(u.outputs, c);
      return l && l.length > 1 ? l : l && 1 === l.length ? l[0] : void 0;
    }
  },
  30056: function (e, t, n) {
    "use strict";
    n.d(t, {
      E: function () {
        return p;
      },
      S: function () {
        return y;
      }
    });
    var r = n(65531), o = n(10052), i = n(81544), s = n(63152), a = n(4012), c = n(89256), u = n(8796), l = n(20556), d = n(69921), f = n(59455), h = n(23251);
    function p(e, t) {
      if (e.length !== t.length) throw new r.fs({
        expectedLength: e.length,
        givenLength: t.length
      });
      const n = (function ({params: e, values: t}) {
        const n = [];
        for (let r = 0; r < e.length; r++) n.push(m({
          param: e[r],
          value: t[r]
        }));
        return n;
      })({
        params: e,
        values: t
      }), o = b(n);
      return 0 === o.length ? "0x" : o;
    }
    function m({param: e, value: t}) {
      const n = y(e.type);
      if (n) {
        const [o, i] = n;
        return (function (e, {length: t, param: n}) {
          const o = null === t;
          if (!Array.isArray(e)) throw new r.hn(e);
          if (!o && e.length !== t) throw new r.gr({
            expectedLength: t,
            givenLength: e.length,
            type: `${n.type}[${t}]`
          });
          let i = !1;
          const s = [];
          for (let r = 0; r < e.length; r++) {
            const t = m({
              param: n,
              value: e[r]
            });
            (t.dynamic && (i = !0), s.push(t));
          }
          if (o || i) {
            const e = b(s);
            if (o) {
              const t = (0, f.eC)(s.length, {
                size: 32
              });
              return {
                dynamic: !0,
                encoded: s.length > 0 ? (0, c.zo)([t, e]) : t
              };
            }
            if (i) return {
              dynamic: !0,
              encoded: e
            };
          }
          return {
            dynamic: !1,
            encoded: (0, c.zo)(s.map(({encoded: e}) => e))
          };
        })(t, {
          length: o,
          param: {
            ...e,
            type: i
          }
        });
      }
      if ("tuple" === e.type) return (function (e, {param: t}) {
        let n = !1;
        const r = [];
        for (let o = 0; o < t.components.length; o++) {
          const i = t.components[o], s = m({
            param: i,
            value: e[Array.isArray(e) ? o : i.name]
          });
          (r.push(s), s.dynamic && (n = !0));
        }
        return {
          dynamic: n,
          encoded: n ? b(r) : (0, c.zo)(r.map(({encoded: e}) => e))
        };
      })(t, {
        param: e
      });
      if ("address" === e.type) return (function (e) {
        if (!(0, a.U)(e)) throw new o.b({
          address: e
        });
        return {
          dynamic: !1,
          encoded: (0, u.gc)(e.toLowerCase())
        };
      })(t);
      if ("bool" === e.type) return (function (e) {
        if ("boolean" !== typeof e) throw new i.G(`Invalid boolean value: "${e}" (type: ${typeof e}). Expected: \`true\` or \`false\`.`);
        return {
          dynamic: !1,
          encoded: (0, u.gc)((0, f.C4)(e))
        };
      })(t);
      if (e.type.startsWith("uint") || e.type.startsWith("int")) {
        const n = e.type.startsWith("int"), [, , r = "256"] = h.lh.exec(e.type) ?? [];
        return (function (e, {signed: t, size: n = 256}) {
          if ("number" === typeof n) {
            const r = 2n ** (BigInt(n) - (t ? 1n : 0n)) - 1n, o = t ? -r - 1n : 0n;
            if (e > r || e < o) throw new s.J5({
              max: r.toString(),
              min: o.toString(),
              signed: t,
              size: n / 8,
              value: e.toString()
            });
          }
          return {
            dynamic: !1,
            encoded: (0, f.eC)(e, {
              size: 32,
              signed: t
            })
          };
        })(t, {
          signed: n,
          size: Number(r)
        });
      }
      if (e.type.startsWith("bytes")) return (function (e, {param: t}) {
        const [, n] = t.type.split("bytes"), o = (0, l.d)(e);
        if (!n) {
          let t = e;
          return (o % 32 !== 0 && (t = (0, u.gc)(t, {
            dir: "right",
            size: 32 * Math.ceil((e.length - 2) / 2 / 32)
          })), {
            dynamic: !0,
            encoded: (0, c.zo)([(0, u.gc)((0, f.eC)(o, {
              size: 32
            })), t])
          });
        }
        if (o !== Number.parseInt(n, 10)) throw new r.M4({
          expectedSize: Number.parseInt(n, 10),
          value: e
        });
        return {
          dynamic: !1,
          encoded: (0, u.gc)(e, {
            dir: "right"
          })
        };
      })(t, {
        param: e
      });
      if ("string" === e.type) return (function (e) {
        const t = (0, f.$G)(e), n = Math.ceil((0, l.d)(t) / 32), r = [];
        for (let o = 0; o < n; o++) r.push((0, u.gc)((0, d.tP)(t, 32 * o, 32 * (o + 1)), {
          dir: "right"
        }));
        return {
          dynamic: !0,
          encoded: (0, c.zo)([(0, u.gc)((0, f.eC)((0, l.d)(t), {
            size: 32
          })), ...r])
        };
      })(t);
      throw new r.dh(e.type, {
        docsPath: "/docs/contract/encodeAbiParameters"
      });
    }
    function b(e) {
      let t = 0;
      for (let i = 0; i < e.length; i++) {
        const {dynamic: n, encoded: r} = e[i];
        t += n ? 32 : (0, l.d)(r);
      }
      const n = [], r = [];
      let o = 0;
      for (let i = 0; i < e.length; i++) {
        const {dynamic: s, encoded: a} = e[i];
        s ? (n.push((0, f.eC)(t + o, {
          size: 32
        })), r.push(a), o += (0, l.d)(a)) : n.push(a);
      }
      return (0, c.zo)([...n, ...r]);
    }
    function y(e) {
      const t = e.match(/^(.*)\[(\d+)?\]$/);
      return t ? [t[2] ? Number(t[2]) : null, t[1]] : void 0;
    }
  },
  23010: function (e, t, n) {
    "use strict";
    n.d(t, {
      w: function () {
        return a;
      }
    });
    var r = n(65531), o = n(89256), i = n(30056);
    const s = "/docs/contract/encodeDeployData";
    function a(e) {
      const {abi: t, args: n, bytecode: a} = e;
      if (!n || 0 === n.length) return a;
      const c = t.find(e => ("type" in e) && "constructor" === e.type);
      if (!c) throw new r.fM({
        docsPath: s
      });
      if (!(("inputs" in c))) throw new r.cO({
        docsPath: s
      });
      if (!c.inputs || 0 === c.inputs.length) throw new r.cO({
        docsPath: s
      });
      const u = (0, i.E)(c.inputs, n);
      return (0, o.SM)([a, u]);
    }
  },
  17283: function (e, t, n) {
    "use strict";
    n.d(t, {
      R: function () {
        return l;
      }
    });
    var r = n(89256), o = n(30056), i = n(65531), s = n(10464), a = n(7275), c = n(64043);
    const u = "/docs/contract/encodeFunctionData";
    function l(e) {
      const {args: t} = e, {abi: n, functionName: l} = 1 === e.abi.length && e.functionName?.startsWith("0x") ? e : (function (e) {
        const {abi: t, args: n, functionName: r} = e;
        let o = t[0];
        if (r) {
          const e = (0, c.mE)({
            abi: t,
            args: n,
            name: r
          });
          if (!e) throw new i.xL(r, {
            docsPath: u
          });
          o = e;
        }
        if ("function" !== o.type) throw new i.xL(void 0, {
          docsPath: u
        });
        return {
          abi: [o],
          functionName: (0, s.C)((0, a.t)(o))
        };
      })(e), d = n[0], f = l, h = ("inputs" in d) && d.inputs ? (0, o.E)(d.inputs, t ?? []) : void 0;
      return (0, r.SM)([f, h ?? "0x"]);
    }
  },
  7275: function (e, t, n) {
    "use strict";
    n.d(t, {
      h: function () {
        return i;
      },
      t: function () {
        return o;
      }
    });
    var r = n(65531);
    function o(e, {includeName: t = !1} = {}) {
      if ("function" !== e.type && "event" !== e.type && "error" !== e.type) throw new r.wM(e.type);
      return `${e.name}(${i(e.inputs, {
        includeName: t
      })})`;
    }
    function i(e, {includeName: t = !1} = {}) {
      return e ? e.map(e => (function (e, {includeName: t}) {
        if (e.type.startsWith("tuple")) return `(${i(e.components, {
          includeName: t
        })})${e.type.slice(5)}`;
        return e.type + (t && e.name ? ` ${e.name}` : "");
      })(e, {
        includeName: t
      })).join(t ? ", " : ",") : "";
    }
  },
  64043: function (e, t, n) {
    "use strict";
    n.d(t, {
      mE: function () {
        return c;
      }
    });
    var r = n(65531), o = n(93610), i = n(4012), s = n(45392), a = n(10464);
    function c(e) {
      const {abi: t, args: n = [], name: i} = e, c = (0, o.v)(i, {
        strict: !1
      }), d = t.filter(e => c ? "function" === e.type ? (0, a.C)(e) === i : "event" === e.type && (0, s.n)(e) === i : ("name" in e) && e.name === i);
      if (0 === d.length) return;
      if (1 === d.length) return d[0];
      let f;
      for (const o of d) {
        if (!(("inputs" in o))) continue;
        if (!n || 0 === n.length) {
          if (!o.inputs || 0 === o.inputs.length) return o;
          continue;
        }
        if (!o.inputs) continue;
        if (0 === o.inputs.length) continue;
        if (o.inputs.length !== n.length) continue;
        if (n.every((e, t) => {
          const n = ("inputs" in o) && o.inputs[t];
          return !!n && u(e, n);
        })) {
          if (f && ("inputs" in f) && f.inputs) {
            const e = l(o.inputs, f.inputs, n);
            if (e) throw new r.S4({
              abiItem: o,
              type: e[0]
            }, {
              abiItem: f,
              type: e[1]
            });
          }
          f = o;
        }
      }
      return f || d[0];
    }
    function u(e, t) {
      const n = typeof e, r = t.type;
      switch (r) {
        case "address":
          return (0, i.U)(e, {
            strict: !1
          });
        case "bool":
          return "boolean" === n;
        case "function":
        case "string":
          return "string" === n;
        default:
          return "tuple" === r && ("components" in t) ? Object.values(t.components).every((t, n) => u(Object.values(e)[n], t)) : (/^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/).test(r) ? "number" === n || "bigint" === n : (/^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/).test(r) ? "string" === n || e instanceof Uint8Array : !!(/[a-z]+[1-9]{0,3}(\[[0-9]{0,}\])+$/).test(r) && (Array.isArray(e) && e.every(e => u(e, {
            ...t,
            type: r.replace(/(\[[0-9]{0,}\])$/, "")
          })));
      }
    }
    function l(e, t, n) {
      for (const r in e) {
        const o = e[r], s = t[r];
        if ("tuple" === o.type && "tuple" === s.type && ("components" in o) && ("components" in s)) return l(o.components, s.components, n[r]);
        const a = [o.type, s.type];
        if (!(!a.includes("address") || !a.includes("bytes20")) || (a.includes("address") && a.includes("string") || !(!a.includes("address") || !a.includes("bytes"))) && (0, i.U)(n[r], {
          strict: !1
        })) return a;
      }
    }
  },
  31669: function (e, t, n) {
    "use strict";
    n.d(t, {
      K: function () {
        return l;
      },
      x: function () {
        return u;
      }
    });
    var r = n(10052), o = n(44659), i = n(13169), s = n(82061), a = n(4012);
    const c = new s.k(8192);
    function u(e, t) {
      if (c.has(`${e}.${t}`)) return c.get(`${e}.${t}`);
      const n = t ? `${t}${e.toLowerCase()}` : e.substring(2).toLowerCase(), r = (0, i.w)((0, o.qX)(n), "bytes"), s = (t ? n.substring(`${t}0x`.length) : n).split("");
      for (let o = 0; o < 40; o += 2) (r[o >> 1] >> 4 >= 8 && s[o] && (s[o] = s[o].toUpperCase()), (15 & r[o >> 1]) >= 8 && s[o + 1] && (s[o + 1] = s[o + 1].toUpperCase()));
      const a = `0x${s.join("")}`;
      return (c.set(`${e}.${t}`, a), a);
    }
    function l(e, t) {
      if (!(0, a.U)(e, {
        strict: !1
      })) throw new r.b({
        address: e
      });
      return u(e, t);
    }
  },
  4012: function (e, t, n) {
    "use strict";
    n.d(t, {
      U: function () {
        return a;
      }
    });
    var r = n(82061), o = n(31669);
    const i = /^0x[a-fA-F0-9]{40}$/, s = new r.k(8192);
    function a(e, t) {
      const {strict: n = !0} = t ?? ({}), r = `${e}.${n}`;
      if (s.has(r)) return s.get(r);
      const a = !!i.test(e) && (e.toLowerCase() === e || !n || (0, o.x)(e) === e);
      return (s.set(r, a), a);
    }
  },
  93637: function (e, t, n) {
    "use strict";
    n.d(t, {
      E: function () {
        return i;
      }
    });
    var r = n(10052), o = n(4012);
    function i(e, t) {
      if (!(0, o.U)(e, {
        strict: !1
      })) throw new r.b({
        address: e
      });
      if (!(0, o.U)(t, {
        strict: !1
      })) throw new r.b({
        address: t
      });
      return e.toLowerCase() === t.toLowerCase();
    }
  },
  95048: function (e, t, n) {
    "use strict";
    n.d(t, {
      z: function () {
        return p;
      }
    });
    var r = n(69021), o = n(89256), i = n(44659), s = n(59455), a = n(81544), c = n(46033);
    function u(e, t = "hex") {
      const n = l(e), r = (0, c.q)(new Uint8Array(n.length));
      return (n.encode(r), "hex" === t ? (0, s.ci)(r.bytes) : r.bytes);
    }
    function l(e) {
      return Array.isArray(e) ? (function (e) {
        const t = e.reduce((e, t) => e + t.length, 0), n = d(t);
        return {
          length: t <= 55 ? 1 + t : 1 + n + t,
          encode(r) {
            t <= 55 ? r.pushByte(192 + t) : (r.pushByte(247 + n), 1 === n ? r.pushUint8(t) : 2 === n ? r.pushUint16(t) : 3 === n ? r.pushUint24(t) : r.pushUint32(t));
            for (const {encode: t} of e) t(r);
          }
        };
      })(e.map(e => l(e))) : (function (e) {
        const t = "string" === typeof e ? (0, i.nr)(e) : e, n = d(t.length), r = 1 === t.length && t[0] < 128 ? 1 : t.length <= 55 ? 1 + t.length : 1 + n + t.length;
        return {
          length: r,
          encode(e) {
            1 === t.length && t[0] < 128 ? e.pushBytes(t) : t.length <= 55 ? (e.pushByte(128 + t.length), e.pushBytes(t)) : (e.pushByte(183 + n), 1 === n ? e.pushUint8(t.length) : 2 === n ? e.pushUint16(t.length) : 3 === n ? e.pushUint24(t.length) : e.pushUint32(t.length), e.pushBytes(t));
          }
        };
      })(e);
    }
    function d(e) {
      if (e < 256) return 1;
      if (e < 65536) return 2;
      if (e < 2 ** 24) return 3;
      if (e < 2 ** 32) return 4;
      throw new a.G("Length is too large.");
    }
    var f = n(13169);
    function h(e) {
      const {chainId: t, nonce: n, to: r} = e, a = e.contractAddress ?? e.address, c = (0, f.w)((0, o.SM)(["0x05", u([t ? (0, s.eC)(t) : "0x", a, n ? (0, s.eC)(n) : "0x"])]));
      return "bytes" === r ? (0, i.nr)(c) : c;
    }
    async function p(e) {
      const {authorization: t, signature: n} = e;
      return (0, r.R)({
        hash: h(t),
        signature: n ?? t
      });
    }
  },
  90328: function (e, t, n) {
    "use strict";
    function r(e) {
      return {
        formatters: void 0,
        fees: void 0,
        serializers: void 0,
        ...e
      };
    }
    n.d(t, {
      a: function () {
        return r;
      }
    });
  },
  93627: function (e, t, n) {
    "use strict";
    n.d(t, {
      L: function () {
        return o;
      }
    });
    var r = n(35586);
    function o({blockNumber: e, chain: t, contract: n}) {
      const o = t?.contracts?.[n];
      if (!o) throw new r.mm({
        chain: t,
        contract: {
          name: n
        }
      });
      if (e && o.blockCreated && o.blockCreated > e) throw new r.mm({
        blockNumber: e,
        chain: t,
        contract: {
          name: n,
          blockCreated: o.blockCreated
        }
      });
      return o.address;
    }
  },
  46033: function (e, t, n) {
    "use strict";
    n.d(t, {
      q: function () {
        return i;
      }
    });
    var r = n(33630);
    const o = {
      bytes: new Uint8Array(),
      dataView: new DataView(new ArrayBuffer(0)),
      position: 0,
      positionReadCount: new Map(),
      recursiveReadCount: 0,
      recursiveReadLimit: Number.POSITIVE_INFINITY,
      assertReadLimit() {
        if (this.recursiveReadCount >= this.recursiveReadLimit) throw new r.KD({
          count: this.recursiveReadCount + 1,
          limit: this.recursiveReadLimit
        });
      },
      assertPosition(e) {
        if (e < 0 || e > this.bytes.length - 1) throw new r.lQ({
          length: this.bytes.length,
          position: e
        });
      },
      decrementPosition(e) {
        if (e < 0) throw new r.T_({
          offset: e
        });
        const t = this.position - e;
        (this.assertPosition(t), this.position = t);
      },
      getReadCount(e) {
        return this.positionReadCount.get(e || this.position) || 0;
      },
      incrementPosition(e) {
        if (e < 0) throw new r.T_({
          offset: e
        });
        const t = this.position + e;
        (this.assertPosition(t), this.position = t);
      },
      inspectByte(e) {
        const t = e ?? this.position;
        return (this.assertPosition(t), this.bytes[t]);
      },
      inspectBytes(e, t) {
        const n = t ?? this.position;
        return (this.assertPosition(n + e - 1), this.bytes.subarray(n, n + e));
      },
      inspectUint8(e) {
        const t = e ?? this.position;
        return (this.assertPosition(t), this.bytes[t]);
      },
      inspectUint16(e) {
        const t = e ?? this.position;
        return (this.assertPosition(t + 1), this.dataView.getUint16(t));
      },
      inspectUint24(e) {
        const t = e ?? this.position;
        return (this.assertPosition(t + 2), (this.dataView.getUint16(t) << 8) + this.dataView.getUint8(t + 2));
      },
      inspectUint32(e) {
        const t = e ?? this.position;
        return (this.assertPosition(t + 3), this.dataView.getUint32(t));
      },
      pushByte(e) {
        (this.assertPosition(this.position), this.bytes[this.position] = e, this.position++);
      },
      pushBytes(e) {
        (this.assertPosition(this.position + e.length - 1), this.bytes.set(e, this.position), this.position += e.length);
      },
      pushUint8(e) {
        (this.assertPosition(this.position), this.bytes[this.position] = e, this.position++);
      },
      pushUint16(e) {
        (this.assertPosition(this.position + 1), this.dataView.setUint16(this.position, e), this.position += 2);
      },
      pushUint24(e) {
        (this.assertPosition(this.position + 2), this.dataView.setUint16(this.position, e >> 8), this.dataView.setUint8(this.position + 2, 255 & e), this.position += 3);
      },
      pushUint32(e) {
        (this.assertPosition(this.position + 3), this.dataView.setUint32(this.position, e), this.position += 4);
      },
      readByte() {
        (this.assertReadLimit(), this._touch());
        const e = this.inspectByte();
        return (this.position++, e);
      },
      readBytes(e, t) {
        (this.assertReadLimit(), this._touch());
        const n = this.inspectBytes(e);
        return (this.position += t ?? e, n);
      },
      readUint8() {
        (this.assertReadLimit(), this._touch());
        const e = this.inspectUint8();
        return (this.position += 1, e);
      },
      readUint16() {
        (this.assertReadLimit(), this._touch());
        const e = this.inspectUint16();
        return (this.position += 2, e);
      },
      readUint24() {
        (this.assertReadLimit(), this._touch());
        const e = this.inspectUint24();
        return (this.position += 3, e);
      },
      readUint32() {
        (this.assertReadLimit(), this._touch());
        const e = this.inspectUint32();
        return (this.position += 4, e);
      },
      get remaining() {
        return this.bytes.length - this.position;
      },
      setPosition(e) {
        const t = this.position;
        return (this.assertPosition(e), this.position = e, () => this.position = t);
      },
      _touch() {
        if (this.recursiveReadLimit === Number.POSITIVE_INFINITY) return;
        const e = this.getReadCount();
        (this.positionReadCount.set(this.position, e + 1), e > 0 && this.recursiveReadCount++);
      }
    };
    function i(e, {recursiveReadLimit: t = 8192} = {}) {
      const n = Object.create(o);
      return (n.bytes = e, n.dataView = new DataView(e.buffer, e.byteOffset, e.byteLength), n.positionReadCount = new Map(), n.recursiveReadLimit = t, n);
    }
  },
  89256: function (e, t, n) {
    "use strict";
    function r(e) {
      return "string" === typeof e[0] ? o(e) : (function (e) {
        let t = 0;
        for (const o of e) t += o.length;
        const n = new Uint8Array(t);
        let r = 0;
        for (const o of e) (n.set(o, r), r += o.length);
        return n;
      })(e);
    }
    function o(e) {
      return `0x${e.reduce((e, t) => e + t.replace("0x", ""), "")}`;
    }
    n.d(t, {
      SM: function () {
        return o;
      },
      zo: function () {
        return r;
      }
    });
  },
  93610: function (e, t, n) {
    "use strict";
    function r(e, {strict: t = !0} = {}) {
      return !!e && ("string" === typeof e && (t ? (/^0x[0-9a-fA-F]*$/).test(e) : e.startsWith("0x")));
    }
    n.d(t, {
      v: function () {
        return r;
      }
    });
  },
  8796: function (e, t, n) {
    "use strict";
    n.d(t, {
      gc: function () {
        return i;
      },
      vk: function () {
        return o;
      }
    });
    var r = n(47116);
    function o(e, {dir: t, size: n = 32} = {}) {
      return "string" === typeof e ? i(e, {
        dir: t,
        size: n
      }) : (function (e, {dir: t, size: n = 32} = {}) {
        if (null === n) return e;
        if (e.length > n) throw new r.$s({
          size: e.length,
          targetSize: n,
          type: "bytes"
        });
        const o = new Uint8Array(n);
        for (let r = 0; r < n; r++) {
          const i = "right" === t;
          o[i ? r : n - r - 1] = e[i ? r : e.length - r - 1];
        }
        return o;
      })(e, {
        dir: t,
        size: n
      });
    }
    function i(e, {dir: t, size: n = 32} = {}) {
      if (null === n) return e;
      const o = e.replace("0x", "");
      if (o.length > 2 * n) throw new r.$s({
        size: Math.ceil(o.length / 2),
        targetSize: n,
        type: "hex"
      });
      return `0x${o["right" === t ? "padEnd" : "padStart"](2 * n, "0")}`;
    }
  },
  20556: function (e, t, n) {
    "use strict";
    n.d(t, {
      d: function () {
        return o;
      }
    });
    var r = n(93610);
    function o(e) {
      return (0, r.v)(e, {
        strict: !1
      }) ? Math.ceil((e.length - 2) / 2) : e.length;
    }
  },
  69921: function (e, t, n) {
    "use strict";
    n.d(t, {
      T4: function () {
        return u;
      },
      p5: function () {
        return l;
      },
      tP: function () {
        return s;
      }
    });
    var r = n(47116), o = n(93610), i = n(20556);
    function s(e, t, n, {strict: r} = {}) {
      return (0, o.v)(e, {
        strict: !1
      }) ? l(e, t, n, {
        strict: r
      }) : u(e, t, n, {
        strict: r
      });
    }
    function a(e, t) {
      if ("number" === typeof t && t > 0 && t > (0, i.d)(e) - 1) throw new r.mV({
        offset: t,
        position: "start",
        size: (0, i.d)(e)
      });
    }
    function c(e, t, n) {
      if ("number" === typeof t && "number" === typeof n && (0, i.d)(e) !== n - t) throw new r.mV({
        offset: n,
        position: "end",
        size: (0, i.d)(e)
      });
    }
    function u(e, t, n, {strict: r} = {}) {
      a(e, t);
      const o = e.slice(t, n);
      return (r && c(o, t, n), o);
    }
    function l(e, t, n, {strict: r} = {}) {
      a(e, t);
      const o = `0x${e.replace("0x", "").slice(2 * (t ?? 0), 2 * (n ?? e.length))}`;
      return (r && c(o, t, n), o);
    }
  },
  36826: function (e, t, n) {
    "use strict";
    function r(e, {dir: t = "left"} = {}) {
      let n = "string" === typeof e ? e.replace("0x", "") : e, r = 0;
      for (let o = 0; o < n.length - 1 && "0" === n["left" === t ? o : n.length - o - 1].toString(); o++) r++;
      return (n = "left" === t ? n.slice(r) : n.slice(0, n.length - r), "string" === typeof e ? (1 === n.length && "right" === t && (n = `${n}0`), `0x${n.length % 2 === 1 ? `0${n}` : n}`) : n);
    }
    n.d(t, {
      f: function () {
        return r;
      }
    });
  },
  72932: function (e, t, n) {
    "use strict";
    n.d(t, {
      XA: function () {
        return u;
      },
      Yf: function () {
        return a;
      },
      ly: function () {
        return l;
      },
      rR: function () {
        return d;
      },
      y_: function () {
        return c;
      }
    });
    var r = n(63152), o = n(20556), i = n(36826), s = n(44659);
    function a(e, {size: t}) {
      if ((0, o.d)(e) > t) throw new r.M6({
        givenSize: (0, o.d)(e),
        maxSize: t
      });
    }
    function c(e, t = {}) {
      const {signed: n} = t;
      t.size && a(e, {
        size: t.size
      });
      const r = BigInt(e);
      if (!n) return r;
      const o = (e.length - 2) / 2;
      return r <= (1n << 8n * BigInt(o) - 1n) - 1n ? r : r - BigInt(`0x${("f").padStart(2 * o, "f")}`) - 1n;
    }
    function u(e, t = {}) {
      let n = e;
      if ((t.size && (a(n, {
        size: t.size
      }), n = (0, i.f)(n)), "0x00" === (0, i.f)(n))) return !1;
      if ("0x01" === (0, i.f)(n)) return !0;
      throw new r.Cd(n);
    }
    function l(e, t = {}) {
      return Number(c(e, t));
    }
    function d(e, t = {}) {
      let n = (0, s.nr)(e);
      return (t.size && (a(n, {
        size: t.size
      }), n = (0, i.f)(n, {
        dir: "right"
      })), new TextDecoder().decode(n));
    }
  },
  44659: function (e, t, n) {
    "use strict";
    n.d(t, {
      O0: function () {
        return u;
      },
      nr: function () {
        return f;
      },
      qX: function () {
        return h;
      }
    });
    var r = n(81544), o = n(93610), i = n(8796), s = n(72932), a = n(59455);
    const c = new TextEncoder();
    function u(e, t = {}) {
      return "number" === typeof e || "bigint" === typeof e ? (function (e, t) {
        const n = (0, a.eC)(e, t);
        return f(n);
      })(e, t) : "boolean" === typeof e ? (function (e, t = {}) {
        const n = new Uint8Array(1);
        if ((n[0] = Number(e), "number" === typeof t.size)) return ((0, s.Yf)(n, {
          size: t.size
        }), (0, i.vk)(n, {
          size: t.size
        }));
        return n;
      })(e, t) : (0, o.v)(e) ? f(e, t) : h(e, t);
    }
    const l = {
      zero: 48,
      nine: 57,
      A: 65,
      F: 70,
      a: 97,
      f: 102
    };
    function d(e) {
      return e >= l.zero && e <= l.nine ? e - l.zero : e >= l.A && e <= l.F ? e - (l.A - 10) : e >= l.a && e <= l.f ? e - (l.a - 10) : void 0;
    }
    function f(e, t = {}) {
      let n = e;
      t.size && ((0, s.Yf)(n, {
        size: t.size
      }), n = (0, i.vk)(n, {
        dir: "right",
        size: t.size
      }));
      let o = n.slice(2);
      o.length % 2 && (o = `0${o}`);
      const a = o.length / 2, c = new Uint8Array(a);
      for (let i = 0, s = 0; i < a; i++) {
        const e = d(o.charCodeAt(s++)), t = d(o.charCodeAt(s++));
        if (void 0 === e || void 0 === t) throw new r.G(`Invalid byte sequence ("${o[s - 2]}${o[s - 1]}" in "${o}").`);
        c[i] = 16 * e + t;
      }
      return c;
    }
    function h(e, t = {}) {
      const n = c.encode(e);
      return "number" === typeof t.size ? ((0, s.Yf)(n, {
        size: t.size
      }), (0, i.vk)(n, {
        dir: "right",
        size: t.size
      })) : n;
    }
  },
  59455: function (e, t, n) {
    "use strict";
    n.d(t, {
      $G: function () {
        return f;
      },
      C4: function () {
        return c;
      },
      NC: function () {
        return a;
      },
      ci: function () {
        return u;
      },
      eC: function () {
        return l;
      }
    });
    var r = n(63152), o = n(8796), i = n(72932);
    const s = Array.from({
      length: 256
    }, (e, t) => t.toString(16).padStart(2, "0"));
    function a(e, t = {}) {
      return "number" === typeof e || "bigint" === typeof e ? l(e, t) : "string" === typeof e ? f(e, t) : "boolean" === typeof e ? c(e, t) : u(e, t);
    }
    function c(e, t = {}) {
      const n = `0x${Number(e)}`;
      return "number" === typeof t.size ? ((0, i.Yf)(n, {
        size: t.size
      }), (0, o.vk)(n, {
        size: t.size
      })) : n;
    }
    function u(e, t = {}) {
      let n = "";
      for (let o = 0; o < e.length; o++) n += s[e[o]];
      const r = `0x${n}`;
      return "number" === typeof t.size ? ((0, i.Yf)(r, {
        size: t.size
      }), (0, o.vk)(r, {
        dir: "right",
        size: t.size
      })) : r;
    }
    function l(e, t = {}) {
      const {signed: n, size: i} = t, s = BigInt(e);
      let a;
      i ? a = n ? (1n << 8n * BigInt(i) - 1n) - 1n : 2n ** (8n * BigInt(i)) - 1n : "number" === typeof e && (a = BigInt(Number.MAX_SAFE_INTEGER));
      const c = "bigint" === typeof a && n ? -a - 1n : 0;
      if (a && s > a || s < c) {
        const t = "bigint" === typeof e ? "n" : "";
        throw new r.J5({
          max: a ? `${a}${t}` : void 0,
          min: `${c}${t}`,
          signed: n,
          size: i,
          value: `${e}${t}`
        });
      }
      const u = `0x${(n && s < 0 ? (1n << BigInt(8 * i)) + BigInt(s) : s).toString(16)}`;
      return i ? (0, o.vk)(u, {
        size: i
      }) : u;
    }
    const d = new TextEncoder();
    function f(e, t = {}) {
      return u(d.encode(e), t);
    }
  },
  65358: function (e, t, n) {
    "use strict";
    n.d(t, {
      i: function () {
        return o;
      }
    });
    var r = n(93610);
    function o(e) {
      if (66 !== e.length) return null;
      if (0 !== e.indexOf("[")) return null;
      if (65 !== e.indexOf("]")) return null;
      const t = `0x${e.slice(1, 65)}`;
      return (0, r.v)(t) ? t : null;
    }
  },
  83348: function (e, t, n) {
    "use strict";
    n.d(t, {
      c: function () {
        return i;
      }
    });
    var r = n(81544), o = n(20010);
    function i(e) {
      if (!(e instanceof r.G)) return !1;
      const t = e.walk(e => e instanceof o.Lu);
      return t instanceof o.Lu && ("HttpError" === t.data?.errorName || ("ResolverError" === t.data?.errorName || ("ResolverNotContract" === t.data?.errorName || ("ResolverNotFound" === t.data?.errorName || ("ReverseAddressMismatch" === t.data?.errorName || "UnsupportedResolverProfile" === t.data?.errorName)))));
    }
  },
  7143: function (e, t, n) {
    "use strict";
    n.d(t, {
      w: function () {
        return b;
      },
      M: function () {
        return m;
      }
    });
    var r = n(98158), o = n(55246), i = n(87721), s = n(65531), a = n(89256), c = n(10464), u = n(30056), l = n(7275), d = n(64043);
    const f = "/docs/contract/encodeErrorResult";
    function h(e) {
      const {abi: t, errorName: n, args: r} = e;
      let o = t[0];
      if (n) {
        const e = (0, d.mE)({
          abi: t,
          args: r,
          name: n
        });
        if (!e) throw new s.MS(n, {
          docsPath: f
        });
        o = e;
      }
      if ("error" !== o.type) throw new s.MS(void 0, {
        docsPath: f
      });
      const i = (0, l.t)(o), h = (0, c.C)(i);
      let p = "0x";
      if (r && r.length > 0) {
        if (!o.inputs) throw new s.Zh(o.name, {
          docsPath: f
        });
        p = (0, u.E)(o.inputs, r);
      }
      return (0, a.SM)([h, p]);
    }
    const p = "/docs/contract/encodeFunctionResult";
    const m = "x-batch-gateway:true";
    async function b(e) {
      const {data: t, ccipRequest: n} = e, {args: [a]} = (0, i.p)({
        abi: r.Yi,
        data: t
      }), c = [], l = [];
      return (await Promise.all(a.map(async (e, t) => {
        try {
          (l[t] = e.urls.includes(m) ? await b({
            data: e.data,
            ccipRequest: n
          }) : await n(e), c[t] = !1);
        } catch (s) {
          (c[t] = !0, l[t] = "HttpRequestError" === (i = s).name && i.status ? h({
            abi: r.Yi,
            errorName: "HttpError",
            args: [i.status, i.shortMessage]
          }) : h({
            abi: [o.Up],
            errorName: "Error",
            args: [("shortMessage" in i) ? i.shortMessage : i.message]
          }));
        }
        var i;
      })), (function (e) {
        const {abi: t, functionName: n, result: r} = e;
        let o = t[0];
        if (n) {
          const e = (0, d.mE)({
            abi: t,
            name: n
          });
          if (!e) throw new s.xL(n, {
            docsPath: p
          });
          o = e;
        }
        if ("function" !== o.type) throw new s.xL(void 0, {
          docsPath: p
        });
        if (!o.outputs) throw new s.MX(o.name, {
          docsPath: p
        });
        const i = (() => {
          if (0 === o.outputs.length) return [];
          if (1 === o.outputs.length) return [r];
          if (Array.isArray(r)) return r;
          throw new s.hn(r);
        })();
        return (0, u.E)(o.outputs, i);
      })({
        abi: r.Yi,
        functionName: "query",
        result: [c, l]
      }));
    }
  },
  21721: function (e, t, n) {
    "use strict";
    n.d(t, {
      V: function () {
        return c;
      }
    });
    var r = n(89256), o = n(44659), i = n(59455), s = n(13169), a = n(65358);
    function c(e) {
      let t = new Uint8Array(32).fill(0);
      if (!e) return (0, i.ci)(t);
      const n = e.split(".");
      for (let i = n.length - 1; i >= 0; i -= 1) {
        const e = (0, a.i)(n[i]), c = e ? (0, o.O0)(e) : (0, s.w)((0, o.qX)(n[i]), "bytes");
        t = (0, s.w)((0, r.zo)([t, c]), "bytes");
      }
      return (0, i.ci)(t);
    }
  },
  23609: function (e, t, n) {
    "use strict";
    n.d(t, {
      F: function () {
        return Ae;
      }
    });
    var r = "AEkVMQnvDV0B0wKWAQYBQgDpATQAoQDcAIUApwBsAOMAcACTAEUAigBRAHkAPgA/ACwANwAoAGIAHgAvACsAJQAXAC8AHAAhACIALwAVACsAEQAiAAsAGwARABgAFwA7ACoAKwAsADQAFgAtABIAHAAhAA4AHQAdABUAFgAZAA0ADgAXABAAGQAUABIEtAYQASIUOjfDBdMAsQCuPwFnAKUBA10jAK5/Ly8vLwE/pwUJ6/0HPwbkMQVXBVgAPSs5APa2EQbIwQuUCkEDyJ4zAsUKLwKOoQKG2D+Ob4kCxcsCg/IBH98JAPKtAUECLY0KP48A4wDiChUAF9S5yAwLPZ0EG3cA/QI5GL0P6wkGKekFBIFnDRsHLQCrAGmR76WcfwBbBpMjBukAGwA7DJMAWxVbqft7uycM2yDPCLspA7EUOwD3LWujAKF9GAAXBCXXFgEdALkZzQT6CSBMNwmXCYgeG1ZZTOODQgATAAwAFQAOa1QAIQAOAEfuFdg98zlYypXmLgoQHV9NWD3sABMADAAVAA5rIFxAlwDD6wAbADkMxQAbFVup+3EB224cHQVbBeIC0J8CxLAKTBykZRRzGm1M9QC7DWcC4QALLTSJF8mRAoF7ARMbAL0NZwLhAAstAUhQJZFMCgMt+wUyCddpF60B10MASSsSdwIxFiEC6ye5N2sAOeEB9SUAxw7LtQEbY4EAsQUABQCK00kFG8MfBxcAqCfRAaErLQObAGcBChk+7Td0BBgXAKoBxwIhANMrEnM681CwBZA6dyc1SAX6JwVZBVivuAVpO11CEjpYQZd7k2ZfofgLEwPFByXxdyMEo0sCU1MCdRurJwGPo6U1WwNFFwSDYQkA0QarPy8jBykCOV0AawFhH3EAgx0ZAJUBSbcAJ2kXAa/FAzctIUNTAW9ZBmUCZQDxSRcDKQEFAElBAKsAXQBzACu1Bgfz7xmNfwAJIQApALMbRwHRAdsHCzGXeIHoAAoAEQA0AD0AODN3edPAEF8QXAFNCUxsOhULAqwPpgvlERUM0SrL09gANKkH6wNTB+sDUwNTB+sH6wNTB+sDUwNTA1MDUxwK8BrTwBBfD0gEbQWOBYsE1giDJkkRgQcoCNJUDXQeHEcDRQD8IyVJHDuTMwslQkwMTQMH/DZCbKd9OANHMatU9ZCiA8syTzlsAR5xEqAAKg9zHDW1Tn56R3GgCktPrrV/SWJOZwK+Oqg/+AohCZNvu3dOBj0QFyehEPMMLwGxATcN6UvUBO0GNwTFH3kZFQ/JlZgIoS3ZDOkm3y6dgFYj8Sp/BelL8DzZC0lRZA9VC2EJ3zpfgUoDHQEJIocK2Q01CGkQ7wrFZw3hEUEHNQPRSZYAoQb9Cw0dMRWxJgxiqAsFOXMG9xryC4smqxMlevgFzxodBkkBJRr7AMsu44WsWi1cGE9bBf8LISPDFKRQHA0hQLN4RBoXBxElpQKNQ2xKg1EyHo8h8jw5DWIuD1F4B/E8ARlLC308mkanRQoRzj6JPUQiRUwoBDF7LCsnhwnLD4EMtXxuAVUJHQmtDG0TLRETN8EINQcVKZcgJxEIHUaRYJYE85sD7xPNAwcFOwk9Bw8DsRwpEyoVJQUJgSDTAu820S6vAotWfAETBccPIR/bEExH3A7lCJcCYQN/JecAKRUdABMilwg/XwBbj9RTAS7HCMNqaCNwA2MU410RbweNDlMHoxwvFbsc3XDEXgeGBCifqwlXAXEJlQFbBN8IBTVXjJwgPWdPi1QYlyBdQTtd+AItDGEVm0S5h3QChw9nEhcBMQFvBzUM/QJzEekRZxCRCOeGADWxM/Q6IQRLIX8gDQojA0tsygsjJvUM9GUBnxJeAwg0OXfqZ6dgsiAX+QcVMsFBXCHtC45PyQyYGr0YPlQqGeAHuwPvGu8n5kFTBfsDnw86STPqBLkLZQiHCTsARQ6fEwfTGGYKbYzMAS2HAbOVA1ONfwJriwYzBwcAYweDBXXhABkCowifAAEAywNTADUCqQeZABUAgT0BOQMjKwEd4QKLA48ILccBkSsB7yUEF78MEQDzM25GAsOtAoBmZp4F2VQCigJFMQFJIQQBSkNNA6tt3QDXAEcGD9tDARGnRscW3z8B22snAMMA9wABMQcBPQHJAe9pALMBWwstCZ6vsQFJ5SUAfwARZwHTAoUA2QAxAHvtAU8ASQVV9QXPAktFAQ0tFCdTXQG3AxsBLwEJAHUGx4mhxQMbBGkHzwIQFxXdAu8qB7EDItsTyULBAr3aUQAyEgo0CrUKtB9f81wvAi1uPUwACh+kPsM/SgVNO087VDtPO1Q7TztUO087VDtPO1QDk7veu94KaF9BYecMog3QRMQ6RRPXYE1gLhPELbMUvRXKJVIZORq4JwEl4FUFDwAtz2YsCCg0cRe4ADspZIM9Y4IeLApHHONTjVT0LRcArUueM6sNqBsRRDwFQ3XpYiYWCgoeAmR9AmI+V0mrVzccAqHzAmiUAmYFAp+AOBcHAmY3AmYiBGoEewN/DwN+jjkCOXMTOX46Hx8CbBkCMjI4BgJtwwJtquuGL2NBJwFjANoA3QBGAQeUDIkA+ge+AAmxAncrAnaeOwJ5Rz8CeLYZWNdFqkbTAnw7AnrEAn0FAnzsBVUFHEf8SHlfIAAnEUlUSlcRE0rIAtD9AtDISyMDiEsDh+JEwZEuAvKdXP8DA6pLykwpIctNSE2rAos7AorUvRcDGT9jAbMCjjMCjlg8k30CjtUCjlh0UbBTMQZS0FSBApP3ApMIAOUAGFUaVatVzAIsFymRgjLdeGJFNzUCl5sC765YHaQAVSEClosClniYAKVZqFoFfUkANwKWsQKWSlxAXM0CmccCmWBcxl0DFQKclzm+OpkCnBICn5cCnrSGABkLLSYLAp3tAp6OALE5YTBh6wKezwKgagGlAp6bGwKeSqFjxGQjIScCJ6sCJnoCoPcCoEgCotkCocACpisCpcoCp/sAeQKn7mh4aK3/RWoYas0CrN8CrKoCrWMCrP4CVxkCVdgCsd3TAx9KbJMCsrkJArLkE2zcbV9tRFsDJckCtlg3O26MAylBArhaArlDEQK5JnNwMnDdAr0VArvWcJIDMg0CvoRx/gMzbQK+FnMec0sCw8cCwwBzfnRHMUF03AM8owM8lgM9uwLFeALGQwLGDIUCyGVNAshAAslLAskqAmSZAt3OeHVdeKp5IUvMAxifZv4CYfAZ75Ugewdejl63DQLPZwLPaCtHT87vD5sAwqkCz28BJeYDTg5+RwEC3CMC24YC0ksDUlgDU1sA/QNViICFO8cS6VxBghiCz4LKg4kC2sMC2dqEDIRFpzgDhqEAKwNkCoZtVfUAUQLfYQLetG9zAuIr7RAB8ywjAfSXAfLOgwLr7wLpbHUC6vUC6uAA9UMBtQLuhQLrmJamlv8C7jsDhdyYdXDccZ0C8v8AZQOOEpmPAvcPA5FqA5KDAveUAvnVAvhimhiap7czmxoDnX8C/vYBFwA1nxifrwMFiQOmZgOm1QDNwQMGZqGEogEFAwxFAQsBGwdpBl21YwEAtwRnuw2HHq8JABNxNQAfAy8SSQOFewFfIx0AjOsAHQDmnwObjQizBhufwQCnBRG76R09PhZ4BWg3PkArQiFCtF9xEV+8AJbFBTIAkEwZm7k7JmAyEbrPDi8YxhiJyfYFVwVYBVcFWAVjBVgFVwVYBVcFWAVXBVgFVwVYRhUI14VnAgICCmRe6SsEyQOxBi+7uwC7BKe7AOdAKRayBUY+aT5wQj9Ctl91N1/oAFgRM6sAjP7Ma8v8pudGej0mIwQrFic2NX5t32rB8RnCLGkBa9duMBcFXwVqycHJuAjPSVsAAAAKfF59i74AMz+BAAMW0QblrSMFAIzDCwMBDQDlZR09JB9KQrFCvEE4I18nYDYnOCMJwT0KRD9DPng+gT5wPnECiUK8SUI7X8tOT2pNCixrVC9qC24fX+AzOhsJZ5sKYiMrPB0mQqtCvCvMAcv8X8kOHy4JCAkifp3fajotShfJq8msCWXBy8wKYEFfD+UQoxEAk40dRUIlG6ltOc44CjM/Qz5wQj8cBwodTEdsWywtWuG8Egp97R0rQj8cXQhKCQ4zVENCNwQ7Q5wsCoEbLUI/G/UIUyIjGDAxAAWPYfBeCnFkyWALYC0jbkNgGTkCGx5gswYCaxBlTmBNEQFk52AVYJVgfWCzYEtgkWgWFwa1DtxVqbxaC0MWqwG7K83BAh8VABwDHgF5AmwvMJVSgAGKCrhHGgDkI3SOCsoNpk3qAZsCh5xPBUBfAPf3BwA0FlcMC6UMJB+6r0eAgQw0ABUTnyuCCHoC0gtLZREbANhOBnUECh5aADEAtritAJQnCxZvqyQ4nxkBWwGGCfwD2e0PBqoGSga5AB3LValaCbthE4kLLT8OuwG7ASICR1ooKCggHh8hLBImBiEMjQBUAm5XkEmVAW4fD3FHAdN1D85RIBmpsE3qBxEFTF8A9/cHAHoGJGwKKwulODAtx69WDQsAX7wLAGNAlQh6AOpN7yIbvwAxALa4rQCUJy07Ds4CkBh7ULtYyHRyjsOlmw/ZFUkb7AEpEFwSBh/lAccJOhCTBQ8rDDYLABEAs+AiAQIApADhAJiCCrJrOS8AFABbG8YubHYqDcEQAjskHNPhHB4LG30CewTBCqrxbAAnLQ6mLs6hHAe7CQAQOg+7GkcczaF3HgE9Kl8cLs4RGQB9q9ocAuugCAHCAULz5B9lAb4Jtwz6CDwKPgAFwAs9AksNuwi8DTwKvAk8DrsFmAEbawouzqEqD4sa4QHDAREWOwCgCzsLuxC7BBiqe9wAO2sMPAACpgm8BRvQ9QUBvgH6bsoGewG7D00RErwBAQDqAQAAdBVbBhbLFPxvF7sYOxjbL7ZtvgNIqLsAB7sALrsC6w5WAAq7BAAeuwJVICp/FTwVuwG+J+QAsloBvSjgo7vIAAFbAAG7AAJbAALjAAg7AA67AgAbu6VbDr/EAPQAaPuoOwMBu5UnSwDn3Rm7CBp7CKEFCv9wAN+7p7sau6OLeXIG+6mbgwASuwYbCwG8AACGAG27BgALu6c7ARo7ugihnMoBuwvtB8CpOwDhewG/AADlABW7AAb7AAm7AGmLABq7GLuOaRX7AA5rAC5LHgAGuwAXuwghAA1KAcIAt68mAcAAALQADpsAHBsBv/7hCqEABcYLFRXbAAebAEK7AQIAabsAC3sAHbsACLsJoQAFygBunxnVAJEIIQAFygABOwAH2wAdmwghAAaaAAl7ABsrAG0bAOa7gAAIWwAUuwkhAAbKAOOLAAk7C6EOxPtfAAc7AG6cQEgARwADOwAJrQM3AAcbABl7Abv/Aab7AAobAAo7AAn7p+sGuwAJGwADCwAQOwAIPAAUOwARawAPiwAN6wANuwAZCwYWGwAVOwBumxm7ALobLgATOwMAaSsKAOFLAAI7AARSABd7BRsABtAAGLsAC/sAX7sAa/sA5IsBuwAXdgG8AAFyC6EABUoAbXYAB/sA5XsAHGseAXsoUgA5RQD+Bw0McgAoKnABpAUIXgG8XiMMCQdvS2xfKokfPBRiLTYDoQq0AdgAFgLRA24BdnJHUhQhA08CFT4BLAYDc0a8e1J6QAApADEB+wBTCtsAe5AsASsAduUNETJGAUoAVwUAAVABB4rMAHg7BCClAFoA1hUAlWg3H4sAzWuxAM/UFgjCdXMbGFYdCdEBiJCrIlNTTUgSPMKJ+QB/HDdAKSvgEZdPAHIBKSwwKUIZDwMwVQT3xe4AS2XcAGoCcQI/EXo6x3guNdUGBQAQGx0KCAwqBB8dKU5TTgi5ugAKEs0AJgABGgCGAIkAjjUA7gC0AOAAnTwAuwCrAKYAoQDyAJ8A0wCcAOsBDAEHAMAAeQBaAMsAzQEHANcA6wCIAKIBNQDjANgA1QMBByoz1NTU1LbA3M3QzkMyFwFNAVcvRwFVAWQBYwFWAUdLQ0VoDQFOFQcIAzI2DAcAIg0kJiksODo6PT09Pj8OQB5RUVFRU1NSUylUVVdWVhxdYWFgYmEjZmhwb3JycnJycnR0dHR0dHR0dHR0dnZ3dnVbAEDsAEUAlgB0AC4AYvIAigBTAFMAMwJz6QCH//LyAGAAj+wAmwBLAF4AYPn5qgCBAIEAZQBSAK0AHgCyAH8CPAI/APgA4wD6APoA5AD7AOUA5QDkAOIAKQJ3AU0BPAE6AVABOgE6AToBNQE0ATQBNAEYAVQPACsIAABNFwoWAxUWDgCKAJIAogBLAGQYAi0AcABpAJEDEgMkKgMeQT5HKQCLAksAwwJTAqAAugKSApICkgKSApICkgKHApICkgKSApICkgKSApECkQKUApwCkwKSApICkAKQApACkAKOApECcQHQApMCmwKSApICkRZ5CwD6BQOnAl0CNhcBUBA1At4RCisTAUo3E02RAXekPAFlWQD/Az1HAQAAkykeGI9qAClgAGkALgCJA5TMi/CuhFoFuisOwhEBndV0KgsEIzFsATNabAGyAN5+gH9+gH6BgoJ+g4aEfoWIhoCHgoiCiX6Kfot+jIqNfo5+j4KQfpF+kn6TfpSDlYiWgpd+2gLabOEC2GwAgmwkbKAAg2xsBEkERgRIBEsESQRPBEwERwRNBE8ETgRKBEwETwCWZmwAowOIbAC0ZgEFbADJUWxsAM9sAgxsAPZabAD2ARkA9gD0APQA9QD0A31ebNSEI2XAAPYA9AD0APUA9BxsbACJWmwA9gCJARkA9gCJAL4A6AAIAPYAiQN9XmzUhCNlwBxsAPdabAEZAPYA9gD0APQA9QD0APcA9AD0APUA9AN9XmzUhCNlwBxsbACJWmwBGQD2AIkA9gCJAu0A9gCJAL4CNwD3AIkDfV5s1IQjZcAcbAJDATZsAkoBOWwCS8FsbAJXbGwDnwLtA58DnwOgA6ADoAOg1IQjZcAGA31ebBxsbACJWmwBGQOfAIkDnwCJAu0DnwCJAL4CNwOfAInUhCNlwAYDfV5sHGwEPmwAiQQ/AIkGjTFtIDFs1m4DKGwDrAJsbABVWv4VMgJsbACJAmwAVAEAul5sAmxebGwAiV5sAmxebD3YAEls1gJsbEbCxxP/x5BApA0KYFA89AsjTx97EHmJQPyocItC2JnNFRCEnFU6SFTDoI0PxeRNRoNRWkpzVnWW8pTagkNmgf+jGupqZ3eu50LAFnc+OzfJwdub1AdpOy76VnijWNR/CMEevikQkFyQuLuPajxWi9chqOoMJ7qpCN4sx3LJG4Myu8kD68wC6+iAwt+pU1JEeY13rpCVkXSZfinVKn4xZpxsI3Lp8bJLrJ9ujkrIalMRBAcv/GSKEtowzcEn5XmJw2BagB8V2UWJoJHZ14SXhM7p0XeGFOuw6mlvyq99WYp5XxrO6ru9nn4RHcOkJ7hx5UqWtman7yVMLzYXQefQRUdIY70RYQE8+aAzCNSGQkXiHfnHYRMi+xczKDdZLk3AV1gzxkkSHLjBwuq8shIJ+/RAbqjqQbugFhe0rqklu432EERkM5k9y1DXzds46oLqKAx6OhPT2WiqEfhaITn7OF9Y694AmKmUvbpWp0xJqDaf3jeNJXnK6NpnGcFOmbclbARC+5+5U52ufw5b0Hh+2LrrNimvZe4eYmApRsZnJE310SqB+1xB6rSJfnV1f2D0awB18Oc0sXAFqIlgHgWiaZGdvP5CJUSsCTCQUC335+iSkwPlLJJ5lwjTSn9Lw22NbK1Tu8w+bUpHtDRDPho7Gun8aw2Jzu9i+N0Ot/kPMbLAb/rUQ82kfpk85qLDkfxLl39QPDngo72GYh/Xigbpcm1pA23D2ywt3D8GgMOao040wDqkHxOEx0OhC+ZmHiIdjK7yRbfJD2ouZbAedhD3p7s8WDmCJfNforgDYPGAXSI08fTjPZ5B37lc5VXGzc1vJmibDwBNVzXuaUzg7N5H4BxqjhJ+kz9HLUJys7bpBDYAPvbut13AwJCWd059tS8YTYgC8HwrkewBfa1LSSpmMr9uR2EekTiAMH+Mx4AGzgbquccwBDlLmRhgXL/YiLPCEb6d2k5qJ6o800qddABkpqt7NG+sc2uvHZwZs57W1AHTFM1KkMShasADAh2FvzbzJOzVDMS3ZlT2BSFKdnkZFB6JyqJbhm6XANis9TrtzJdlPVp+rl8v3nIke6Jou7m2TKu53Vounupgkz2LzrQPhhatLIG7rfF/gUKWp15X3LKt+ZvuCDSqPUigF9yJntimC1HJR7Yj/dUrLAXWrT+1tnwPJJLGKAlQ5VeNDWRKCTt2vz3rJuo4+gIt75/Mkfl/gSZblZ9r/SEeeosZXneli/xNh1WVCvkRt2RnyyjtMkMqhzXh1PVOCbILqv0r7rGYm0CHIyKdhHL90cl9E1I6eEtQTCt6RXj8M0HHrHCHLVRpNM6WIbT5BCMGVnL0o5895qSRbCJz+5I8PGMhAN/Xrj4BgIdlKqlHtBHqTJwmK169toZ2IWxNzrAbIG7zh85Q/LG2A4yBcaBel52zdunokB0lv3A7kXnTI7M6ZnfZ7nwuj5lkGhqSpW+w5CI/FmRlplBEbnZy1ZxS3DL8rf1YWhO5XivWZBSRh1gFsjjyj3qRG1cm/6ors7WsEif6WRxns1MKDZa6KrbfMQ/swIb+2nb0tqxHeii6FcgVeAjE/Xwac1owx04dJKG8R5YQgHNnEfHf0qb8WOnU0eQSjazq+IK7cSuCqYzPEUB/x+QgGZqM3dBoYvNvZVOHDkbgdilWdagqO5bkybXfLpyMPuGq8mvAAEZGbR6RwXGlW9ErOWTfnjfx6dXFJqBj0OBSGFz4lWQasNOmVJeN4SFWSLfOGB/7ehV5YuoNNROHZEG9ElVuMnqbDMMuDleOt/cN/gsWxGw128mwU8/HxkOKqdTZnI7dHka67WCTf/FmBrxpNCaKJ1GxBTCSS7MNfhNj8S4Gtotg6Z3AM9cAeVROnppUMaiV5jjudLnNqoVrKO1/FijLlAc74kxydxKX1RQuMqHR63eecYr5o6MJ+B78VsLlCrpelWh6GOrCOBIoQmIcdpJL1pwE2zzZqBkecGTdK8KMOB6r1eNRURyrz6M899TZaoS/vNOxHf+5gORU+OyYIcIW6diP25GHF6u8TNjuL/GJzCnLLXd01KrsjRa51v4+O/VIAWXESJxfxWjv628J+cWUQpoD+Yytzs3jSMRJ23/XT+vUdtUMLDQq1vnIoeg/GjWh88MT6k9dRqDaQ+vodilFgvjuNw5pJpId9mfwyYeLCGb3BmHXdfQfhfPRQaupe/f8TG4Bk3eDKlYBaEK3kZYNN2Sdxz47m/vYBxvIOKtnqplB1pebzuXmAr/MuzQCknKe653dzaWQQ7MUhWYWvzIZwLe1v0rXxImLaz+AkAu+sYikhouNF3EW6w4crZ6MuUiDbIAx8XhAfegcvW6x9BPb3/sCxGWu9YyatqExB+TSm69qIkI9IwhjrcnzME+jWBx4mNQm5WwLzUjSyY4FZ0aMF5YFlXUD4hL4XfOeYv5rDe2s2D/Cn+28fZ9UCnOQvXFMnQqfc0G+ZqOWWD9l/liqUPaNQzZjxCHpUAD8Rcc90MniQ02ugHWsUupFUvhC9usY7zNPt5F2jO7qgzhafsQSd50jgLrC6Qx6bpHbXR3WNAu1BzGmwbz+ebGmwTjdy006Y6zipP7n/OJlvSmbq+SY+nefAVKK6EBMPbce5n3IdRI8+vbxCpN53rw3TvgNds1SuMiuLGxt89L71mxPDeanGhyHvOjmO56tnVpoHalQnL6TqNuqKsHjHCIKB4pCgj4WyYPvRvYvqi5EMr7lN3MotPR/KH7JUD1lZbU0QzfbrEBJnuQiVAyAC9vwXWp2TRU1/0aapyAH2cbglEHVAdl+1rb1u147uV0td1eNoQZsqHrIMIYVPXtLk2TIU3cJE08PjoYNDpfF/IcJnYQHl6nsplczX3Rgah4NbJJHl//5scUufqsSd//kbIS406ZWoMP//+jhGUswX/5nVNz/jAj9KmXPtAmMiK+khhbn1w/mELzZMT/WxcW//y/jsHaOM/61oAW/CjYhJtY622/TtMYuP7bilBvbiT3vB9n8IcFPnwM78H0KfhYDRdY5PhWJ4jWRQzB+HT5NVZV56LG82hcQms+jOTT/c9Y9sx5rPi1/wB7f/+c5UfUCKk3iwwCuywUc2MGnAwsXf1E5hoI55x1Q/Qby+sWH8NRjavZ8VaDsdi1NUVhH86BJHX1yaFt1w1OYeL5LVmdN+5Q+KuTvXEPDzUCg6xp0HhsUhTWSe7MZMM/6rsTUb0/nbUE3YQlGGt48kT1/6cnf6yHnvHtQx9EosOXN077yyEq/jE3YTiG/5SEJmXFeocJJ1EAd6vKeK6VEdJLOZ1km/EwOnZWCQpzCLKPHxrfh4yJhGq//2dos2E/3+MOcdW5EsgIdmTQUQetzRy5fQHhDBl37XbWzsqO/cASEDjyst1/8NEROqVAxWnddQV+umJ8IrKVgKvGaTc0GsQ4s8h0Osql5QKwlddPDjJhKInyWqYUKmmlIts+FIcXZ6yM6cljbsjUG2ksSOkuIw4sYHffRNgBOLApvD6XrR6Rt0rV2Uf8IpnIUVnb9Twt91QjAaD/dStSWDxg7aYY+VXIgnuowYdOkjywa2hlgrnI6PjaU3e3UjQ5Yk5mdIJGyHnv3/P+1EkMav1yFyF+FeJE/RXnWBw+Nh0aOo6TGlKX7d+dkP9+brvr79SdtXJtcD/aXBGiMNfG6/NQniQHYQlK78FEHDqOh+bDI0o+2Ub0h53EL/vlzjrBczVEZz2bOtvIL+DIzDkk9nCWt7tlqsq3l9JMtJk3r5HG2iJ9b/X11TG6wwMAjHLQ2oasaMEsydh88QPvI+hmqIHhvalpKoKOueJR0eZ9J8G2alNOIOy98jwvbc87Ewk9d+5G/tUijTmlbjFlDKXV05HalKxaRTrucc73On7yzAPS6f2v4ogiaWyWeV73dv/MsQT5HjRrsYV9dLAcI3T+zC2qEVINyNpEhoKV+xVSuWtT4AhBfpnZ7unIM+HX3msI0HiI+P+z2PFgkjGi5PqEbG/wNIWeRUjPtDEgbbubN+I4JaDLrW9borRBDob7ZFx+JdKeFVUKVeWqb/c88Ol7DhM0suLtuEd8tkDSMTD3DFx8UphPINHMHi51hAPttXL4Ektt/lKEUG/R4qZKohHjVpAcPIMiHyWr6xR8/EWnNJvBFET76yCdk5er7ADB/1bgoImhpSiZ/omZjPKPCEeZsOwvPmXL+1vlJNeGO3TzySmGA1X6e58gLrazDM71jywM1XL8zKHN6G3kB31Y8vLtP982N975SZXk2JwDvmv7AY/aDsFFk1v+nE7/hbvuOWhBH4kuemeYozPk2K22Vx/YGiDTLU7YilpOt29u3RZMBh4UJjlTP5ItxTzWv6ebL9b+GSU1Vsm2S8LMfVfJczaBSqE8J1A4YUjpsALL7++bwCPXFhaufdpDFtBlHb9makeYbqdg9ltvK/HwF/rNE6KrtWUkEcxmTB7Iyu5TiVaIgW/YxzQhpArliIMkOoK5L7ShVtF+DYqV01mk7fwop04hQRwg4KFmr5z9nYf05VVqkSe7gfnx5bxxlQ0qEV0jiwzf064qG11iEqjHcUgDWWsDs/LEGlzX31T5KVL+7D4EoKim7HBagiqRo5JI3WfDBgpKIruWz9j/J6Hp5Q/EJbMWB8NeSMuFarNw3AEYPBJtYQO/4oD/ZgPTSQ06di0EeumX5EbrdThO+fvYEVSxLtZ3AJkee0Xn0sDwNtiiZhJjJRDuG1YRKB1vOulfd9JjHeyu+UHTmrtra/pm+8Rixh4WKiLaLOCxIbZNoWRZSyyUGLPjAaAo+SQBpfO2uruWrzFxLlpvrXJNMCWtlJDKGAnlWK5xpU2tcxXbeD+sbdfwYXt/qTwDk6UqXR/aUt099DhSNl4Nk8mXwpw+b0nvjKOG6Mg1PRXjrMUMANvNgEArv8nMJs3vj1aHi8MHz/UfJWWzkcrSpZTNBhduXlGR7i+ip/THDp5R9KRNcDKECgtwgXg4EFN5HHfikP/XvsoCkHTg+NbsD8Gl6eknk4Arwn/BWGJ0hgW0/gUKrzuGZhub7igRP3abetpIm+24xEOlWl3YKpm2qTBFvX8ddDRvm1LcwnCJuEfZx12qPY9TrntMIQsv316zvpyWnyStX8VU4j6tQk+CWlLBUCJR6MdH9Cp7g2qdn2WM9qFbREmejH09dlWEPm8hPF0L7RxwRRdiCs0DP8ewk6ApoELkKU9hckSdbnXm8UHJmaNXjxv/q0fTTpu8rnl9lN0vQCpDRbCtcz12rGRFEA7Cfg7FhZn5QFkNmv1ZURKEsiZce1nS9K7HrwpC7yJV4Xt3eAVbLJfoXHrtwG60Z8gwaSnmxoL3s2ZlRqggZN/MHo1oUS4L+GwObFI596Ld4Mvi8l+cQmF1gJpkpnDio7TuO35npaMHiWzFqPSX3qNgkIPGuX0qGYnPIVsM901Yu8oZnOZOY1TbtIdFUNKNq2dP8SJ4F/VCEzIjF0/Rh+7UrZj80tC6rognVH3mqa8eCs/lcQU1Pjj98kBmAKDbZUTwosv02UunRR3n0X6c+f73mtwB7/WbQ16gO431EtwZbNG1SM4TZPBnsQSESlsfG2JLQXx5xWf4bmQ/xcVCPISAX5897JxHKLD/Xkgu57+ABR2+MMtEbX64+MNlBHpKC7sjlWVEShf5qA+dGc59LFVlZrX/Enq9z/v+wnZ1HErmxmjJjxOA+hAjVUWgtq6ygAi/8ewJDjUMFw3zhQFtbyTLDPFd21Ji5S5QPZo9nMSxdg1+DGFSN0wlWt7XeYPbHqLfliV0J1kOhQNp0VbUPy0MS2Ms66OxtSWvaULaWHnfAA+sieVVgtjDwN3nKonWapkSKRN8BKKJQpCfqo8RQI5udhfu5s5+7vwsppmAJDgz2GNA7d43VdbV2l/SrvEu4RYslmNJmfSOVbssxAhSYy6WxpIQdDB0FVBpZ6IM8yr81QN+XLZ3n/wed/R+s6LslkxKbzzst/GkRbe6rFmtvJCwr1T44ETM+IMgOnjUO0eG6a1n2w7lwM1oFBvzMUWRkNFOvKcx3oSb5XdenZ5dXsute6nkRypBiSdAtA2fxAd8UdLOZW/MB7fZoEuFheQXijdaF8kuaRZoSeWdKOkKsGYEGaXfaDKTu0WMTcLniQs7KRCz9iK3SP+Y2xIjkfVGqFLSQ6vh+A1u6FdfwXsv1VPMfi2cxmdM+/xTgMXEyo2ZGcQ2YmPsghnYdv2+z48JpGZA4tUK1p1q2VdVxyfypXEXcrxKKtmt8UdW7sHWmKMqDuBBM3J/JUQx8eUYN4pJ5oRqvdiPHU1o/WPjiKvnlCqOdyxlxF54L9PrtLD1NejZ9aZDivVr6ZfMFK1/psVygoPIAnphcJWWb9+5IKMKmgRQULsTPZi6Bw4wP32zVEoKcHpP73CkFAqS98nSaGoWDjDJiaACJn4p5o1jq9R4Q4VcibhXF//LHP0bdf63kRVZdRbbhGe7sDQcyWS5tpkfeYHnff25WK+4FpzLlAcbaKmHdIBqOw3fImx1uqQIADH0TyHzFlqTG6nMoY81svP0T6BIyELMS8tMe+E1p6TFP6sVpZa6VNaTumufD5aj9goRa9SAmdJT4HhI2r0egj8UrgFb8L59wGLnYlzkLAiUd3m/WWIIEU61kPoEjd3gIVy/fiBcgqQqHnoXpL0SqLGdGGgn7DQeVMSYWHfjno1FngIKP9cjYaTlcRP6bZunjHP13/lbVm4awti894pTf/ZNNqr4OR+tDVie/m+rC8QpVnRbsCMPukOH87B2jM4AG6pHuXl1x9SiKdhYJVOhfo/+SCaGjUW2CoogL1FFhFGN9o+acoVLl0SXs/3vrSccmZeAF3NewFuOg/P12QYKQF+SH+KYcNnsAhIAELPBUgre/KRUJEA+KPD0MHRjv+3J/j2Z23MuJmkfy7leWcMsti8wXLSHgXFJTaksx1Woi6oljwxFVIJG12SBSZLNJDbXMYPekmiXT4FclKI35BFgqnYpKfcsr+f8HUXQoHJ9UYZ4J5YMiHHyAxg6eidhodgqJ2Htf/xYEx+G0zXchuzlt8hcAl+AT8NCQ4orFc4DerabF1enA7NTLnvtZh3FUwqIOvY7Q4DYmoDHwXTSw5UNNh6r7j0B/ezMYJMDcw4+6gCTZX4YQ+7Xs8de72vsR3cmfpxIX64/6KR1p3VX4F6vfHEzxzarh8aDH4G1DFoBBM6npXFpK+Rh+WrcFclAeAxi0PoaR9CpOxxGLSdvxKVSw8oOOanG/soKImRopN38AdcUhhM2GT/PgQeSQrG12njuJJD5Z7vWfAZmFybYLdSA91kB4aoBhoj1Z//KNIVVujqaLLRwCkbyn4vh0739C9V9iSjybeOIeSOvNs7LW1a7EUtNoKAnOGML4U8KBXpfrw73WjAszJG4Qscq+Xr3kZWR4Omm0xT6qE9y6FNSpstV4onMZSqCEJ+3VX9qjvdx5QVrM0WXxmPZxejdfnihcFAjzv5PjlTl6ickDbHe6+Lch52pjOPqk+m3RZ+bh2JSMGtFBuODbMchrpRVlt16NTQ05Ps0IDtWlUmWfP2vX8M4YDynIuOZ4Ck91+591B98Gw9fw+yQogTR8CSg0zaJu+rlBo/mr3A+1NziF+kdubz+whc857AZt6DwIBIF5+5yiaaf3ByQp1Fm3sOkZDAzwsYSQTM/Kv6idkugF63FDobDdUY3huruU+sCaBuRR+HmOowvmZoBjZHNh77SXFtmY/oOUE7ifN7nBHAo83S/xvcS6H4Ci2u/9Id62Wv6Ui+zMNLAzhfkTkVcW2BwrnYvpur0ZDlzs+ZLsmGTWvd1892t78gx1YjEJusGcxphjLkV0UfAKlekfSBVWHE2ahk4AbbRmHyL7GYdtKfdlINwrcdJuf3Cee1nfUojDQn/YmItESOFhtLzrkEv4k2XpMU9oaJQ3VUC+1INh6BE68pkHameGJm4Gvdb24Q0fXWxd9Tp3A9mzFSe4qXDGGDIV4AAGV1jIDfveknH1TwWpUT6HiQxKP3AAHJNkJeRlj/mXBmS4S1j8FK6YmpK7jyyAiRbsMCCLoJcx01fvgpMvKQRxu9IOwymconQjD56g7ksOrcOeoTbius4JnGesAS1DtgdaophYsw1wGIsMS3P7K6doE3K5czznqPQLSRRF/Ylzb5NtSKsL33SgskFNCF4khn5LWaDxI23ZRi2hzqN8uW8UzZEBYy68+VtGLSymQrXGUlr2nO2BbBIT5Vh1RmGAyDXaW0FPrpx3wv2UYdFk9tSl+906bMxCuXQaKDQP/U19UEcVGK4gmksL8lAorxQSAOwpeYX9xrZsh6yoGaL/X5O3tgQC8OM+/GvxnW9XvAtu/JxAigydfSmZfqZfg1XOcHNOpLlN8j64OZ36l5qawDBJ62YaTvxeNmm5gowCdBosgcpHOgNgwA+sknN8XmsR2IYChcafl9bGNMZ/nB5guWuvEziv6QI2bP2DtyKWG/qUjZMaxy+wASkkVGtuwGtywkTYG6MYrZBo18vYcww48G/+f+eITA/qMwbLlJC0S3+/ai2pPvkOhRRVmGTuSupaxhIk0xoXLtixCxSAn4Z3OnUS3wBqVscLI4P3GP7i/6gxYsswsVmkvDXFLhO/OKcur8flegCSKiqmVpIRvCzgbjEA0mXPn+RExXY/2OE1f/BYuWpRQY8gCDpMOYBx9Gn4tL3hihSIR1ixh2PIIT7cr2gUJbfs76EKYG52Jk0UZF/PQkBxGuFCEWXnG6ue/hTIqjTRq1sotVrKrwIGHDrITyuanUzbIYdgdEeV88K1VD82TYB2B61Ft+tB1KqHPmT9+hWoaV+iF3SuvtJqvnoLaA8wxrD56AUMULEgzO9SvBcBAfqz/dzMYzwMt/YLszDbmGe1bcHHfFMcvGql9bf/tp+Hrj4q18aNnftGjmXTfws39emn7/5IBxog9MrmftAA5Oq4awenm8HimWO72dwVlHcHmutVMdrMHw+p2vzpzT+B0iIZ+IEpplwWhClcXlxhxAsF3CHRnnaUEqq3ByQ+cqhe5SvR4SFxh/LZoQwtj8QZQGT1BzY2EMpYnUcZWQEPlwFZw+7UryK9qV8KgruYsvyMoK16KI2sN4SOblrVwhyiL8+IBZ8cpUhsJQSU7TFHAi+L2F0sn0y+FtDODlnuif2Mba8QddPZYYxjTsIgkMe3M6+7kXxUfZvbCUlyq71J1eNczGk6Vqw6rSx2K3vM+DjLxDRGzWepTO2qTT/W8S7u0QXcyFUahcB4vq8xCYTpy8iswtnyz7Kx6lgTEQJ9RqkgEIN6DOUqB0uRdeYuDa7AP7Zy9z+ZlTsmVR5vtV71m3dmdtNeWghbr5PnPJtjXAzcvZjxyV96VEx/B1TA0IEQSI50ywGuIbmAYdQg/l/rxhQLX+6uOLyFsaUt6mtjpAJkLfehnB6MlOHnNOrWLvCBqVBS07jcM+4RzLEed3f3/0Xwp92U+nataNHyEgnnuYR6PXEjRLETz0xrt3UglfK7Bn4aNlXG7cZco4lMziLv5+Mh2JCww3mz69Z9ZMRR/xv5EKJ38IFxKd9dw5CgPIXja/gzAshMbF14/qBIgNkdUQeP8YE7SrICGtiTnAKTyA9cXa3OauDHxZOdTP7yuYBzD1UcHstIO16FxF1bRUAlSkszI83YufTchU8OPnnozDl9bS0y6CnnjGwgj9M61cXcZsljjhLeT/Vq+30ScN2PcT/dOoxUDqDS38+OpCCzLDdnwHQc3ECQVIkaxmdPaZTSdfp2jjGzSdNLM5yPQsgJDl+ZnhclDQi8ltUnkqWJ323IvTZPN8rn0+EshL1cx9PiaLTzUsryn9Zp2Nt/detUAh4N/2I3dlMQqjHFxSihv0uykzflq5clMy2ZBaxoEb0/QMp03IQQus3vnZd/NOmSsmgqXqKFP3ozyDgY7RQS+npabe/hNG+5sa5FtvL8v0uYuag2NewYkcol3TOTadpuncCnDgOGpmLnTQ1PEPUN2cNsrW8LYfIv+hzfb7vod+ipXHzmbgj5Fzc6RcT/5PD7VQ8nTJBNj1urkVUx9uJvTWmqY08OC80rGDLaWXv243VB16gjt4Xtwp5H2UDR0LiKW24Ed/sOO8jl1yEU/XAb3h7ScKnCFy/V3sICrkY1D0K9fSokHIL0s5/7DLShLAPXRbV7fbv4qj6OwHC9d5PlEOX3LRpQ3P7hcSAKlIKPDM83ypz56U5+rJeo0cyUtC7wltL8wqEiNSgZsDWzACc7RFoZqhlD0+sihIBQlkQTXmvUyIOZhkQX2zqME5VRC7ms1sa3CY+odMn3mMBiTvCMKnnCxg5ZPLq4GUDB4jF8Br2K4x4sxfWjGXQatJ25I1JyrIv2Z4bP1jKw5C+B2/s0v4dGUOsaS6IPIQV3ETQ+F2fSl2BPBXHzyYN8VmwWIrKeMX9pyGWuAOVXwkxJsRBaBVzLhZDP8ONGncknL5DpTxHN32GgFWMwsc0GmL0oRDmRT8u2lvjAKUIi0MmXhIHSlFeh3Qh5pP6ap4YUd6b569ZIaHgya2AyD12cPxY0In/PBjzDctTaKJCU+xc6m9RkNLDEE8guvxtJP8sl8N9bLqw0F/qejaBlcHYqw31zYpsutQp07hsP1vhGdl4hJ1wA7OCsAHnKj9879uSHILEmuZ6vI1lT4tvnWCVKZhhYrWHW9oPKPKpbOC6FTjf/OtUvwmiXr2ykvyLzHGQeyS7BenZpL3N/CaF5T7Gkml7JXN5cj0PKaDpZVImD61FuMgFHPqSHvt4Ej4KBdAfdcoO3AjQPLwwtKsgGM+ty4lNZMBEItJSRLunG5ckrM/BeoXWoPZVvEoIzLgFQYPupMwZCXis4W2SCJ2zsefZqCj+aTfSq1FYdUj2UeJALvVTf7vuuikOE1Hit3UIAGUi/sqgMum9vw218y1FlY/9XnOji9nqhGAcMYICc7BiqLZj5N+cKEuSAuiyWbMg81ZD1lHovy/we2eaCcCv4MzEW3O0mVA/t2xdA0cxTVbXmFhn+tARDpvDz5ftLr15OAAmvo2QiAky+feVO4bGibv2nlBmBzqx0lEDfEm4UnEs11pbnwZlJ/0Y73/wBPYfTNZiJKR73TzdCW1BffiJq9bLjQmaKnU0+gN8sfe25IKSUCooQwxePDrFn3a/zUgWxvPoTYVXfobY/GV2qqTkeVDV9D8657fhY0/wiaJ5NfLxhXbE/naxs34N0hd6vxNfdm1TCnozm/NKSCThchoYgMF7Z2tzXFovRfsNVkf86JjrM60r7UIuV3bsmfrMOqzjXjN6HPBG25zCJ3QLueySbj9oFvX/HxWBqh31PBPxduCVAxMqC9HK+YL3oBZqBruoh6LKvdMqoz0PYXUBrwbiioyE8Tj5ImjJmiOOWLbAZvIZ/l9rIPljx3T5glJ2ewlfuIT5GlodQsAf/IEtmYkML5SRQGxxwW+rlZkD8belJNu09Itwx9xDULTnemVDeojdbgcd2gKGM9aO00Jivtbs7ZyOSE8IPh98GfvatD8Ud5uHcZfAfMiPSlIxd4UqeSDzuNfbKDuFepkyC/s3j9fawmhY1b9NqDi0ZS5eP35l7rL2eK5QlWLlyCmxx8AFaFiTuD2pMUxZV5mBSJuJduOaq2ZrWpu28DE8jl/hisBz7bGWH6qLF0ayWNq1Sejtcs8KQrQqJk5P9QHDYHOIolgNsMDmEaWcTelghbfFCDqWrq6YLwDWy+m68ec5nShgq2fduUBpQUuKKKgnttaUX9PRfMmxqJyU7e0RLr1bev+ge1KK0bZyhHKKDE8gQX9Vf7rNHWOxBtZcxwwGusyMpH77qWZxXsQmbgIGhtiO+gSSRCyu/ek+OFsz1HMiQH0IHV7PjJi3dszYfFp8ue9h4+AfKte4MTiehPvxNcm/T1t9vsFZx8rHN5ie77r2jzZOq/Em4Q+H9sNcZakf9HnzCc1fJixppxP8FQABmVnqa6GbJhwaka7WH7Wdoz1WxOjSNV8N9sgW5S3Ppgkut+TTCkjA+AodUOk1KIR+8G8S3WrSZG4nyqfJ6FEjXl6a/LEoRMHZUqfPRWvwqrtXYy9IUsmUGzkqi76ib4NANCe5DnyOxnFRZ9d8FdBVBjra3iNuZhJuWW5Omi/hBigqDsg0mu2AhfJDXdwyMIJ33HHHPfS2JtjegRejX11m41TbNL+Qp7mR0g9CPKTj9PIjuSycGN/YPozXI4zarXuAeLv5CHKtKcJKRbd6R2oLNiEt0T8+QIVJH7zt9ncKMgd49vV2P1AyScZ9Qzbu3m3LBnuu6dw7aE0b6r4kzVkI/GUS88mA53L/rLtntkFlZXGtIoqNP2mD3eVv08AVVPT3wJn81zpbJV9SuqZ6Pd1ge0Zz2RFHeCdV5CLPftH9V5o9+VzFu4R0QeumqDwUhXn3IyYotdJnxr1l3BqWnQVAeDBEOtPyJQx1q5+mODiClXtYeBLTWtsJ42AMBcf/IFIhpfhYO08hsg0Ik+DpQFNOKReK3o3cudkxWX0soPtI5eSFOA6yNylS+IQjrQtYQ/5s4UcixJfokumBUjpH9ofSjUTwPCapGFndfqqG5IHeMMvfg+88SXm7bNyjk6pGKzL+WxDAdqKtQ72WWVbOk3I+ueGuammmB2pvFZvqIcU/lvW3n9+r2lycnQLE4OX9R1jIgW4cDjJ3v8dAa66mVcfC7ptCr5io6mCaA9qI9T9FFWqo1ZAaMxgxAu8aXqmaOYryMND2sTUfoHvxcYK7hEiJhCLYFDx3PBhE97c2a0ub1/ePJcyJOqr7UaTAPTJ+xvZtjb/40sloY1ltRnTkWILmIP2b7S3AdXCR+YiArMUHwdncpjpyDGfzqGOUoAuaamWzAMacQtb34/M32FEgR5lUEf8fRzFrZUhzQj0fR7/6gdzdnVVvcSneLmtqJ930VCCDORY8CVdQWdo/S3PNkX3pQsPVKWIYGAMrFZoq8bQ/OJBDSXP7KSBdL3QN0Zqd393p6VFc7DnlnFiN00SY5Nux7yadeIM0Upl2rVsu8/VAI";
    const o = new Map([[8217, "apostrophe"], [8260, "fraction slash"], [12539, "middle dot"]]), i = 4;
    function s(e) {
      return (function (e) {
        let t = 0;
        return () => e[t++];
      })((function (e) {
        let t = 0;
        function n() {
          return e[t++] << 8 | e[t++];
        }
        let r = n(), o = 1, i = [0, 1];
        for (let w = 1; w < r; w++) i.push(o += n());
        let s = n(), a = t;
        t += s;
        let c = 0, u = 0;
        function l() {
          return (0 == c && (u = u << 8 | e[t++], c = 8), u >> --c & 1);
        }
        const d = 2 ** 31, f = d >>> 1, h = d - 1;
        let p = 0;
        for (let w = 0; w < 31; w++) p = p << 1 | l();
        let m = [], b = 0, y = d;
        for (; ; ) {
          let e = Math.floor(((p - b + 1) * o - 1) / y), t = 0, n = r;
          for (; n - t > 1; ) {
            let r = t + n >>> 1;
            e < i[r] ? n = r : t = r;
          }
          if (0 == t) break;
          m.push(t);
          let s = b + Math.floor(y * i[t] / o), a = b + Math.floor(y * i[t + 1] / o) - 1;
          for (; 0 == ((s ^ a) & f); ) (p = p << 1 & h | l(), s = s << 1 & h, a = a << 1 & h | 1);
          for (; s & ~a & 536870912; ) (p = p & f | p << 1 & h >>> 1 | l(), s = s << 1 ^ f, a = (a ^ f) << 1 | f | 1);
          (b = s, y = 1 + a - s);
        }
        let g = r - 4;
        return m.map(t => {
          switch (t - g) {
            case 3:
              return g + 65792 + (e[a++] << 16 | e[a++] << 8 | e[a++]);
            case 2:
              return g + 256 + (e[a++] << 8 | e[a++]);
            case 1:
              return g + e[a++];
            default:
              return t - 1;
          }
        });
      })((function (e) {
        let t = [];
        [..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"].forEach((e, n) => t[e.charCodeAt(0)] = n);
        let n = e.length, r = new Uint8Array(6 * n >> 3);
        for (let o = 0, i = 0, s = 0, a = 0; o < n; o++) (a = a << 6 | t[e.charCodeAt(o)], s += 6, s >= 8 && (r[i++] = a >> (s -= 8)));
        return r;
      })(e)));
    }
    function a(e) {
      return 1 & e ? ~e >> 1 : e >> 1;
    }
    function c(e, t) {
      let n = Array(e);
      for (let r = 0, o = 0; r < e; r++) n[r] = o += a(t());
      return n;
    }
    function u(e, t = 0) {
      let n = [];
      for (; ; ) {
        let r = e(), o = e();
        if (!o) break;
        t += r;
        for (let e = 0; e < o; e++) n.push(t + e);
        t += o + 1;
      }
      return n;
    }
    function l(e) {
      return f(() => {
        let t = u(e);
        if (t.length) return t;
      });
    }
    function d(e) {
      let t = [];
      for (; ; ) {
        let n = e();
        if (0 == n) break;
        t.push(p(n, e));
      }
      for (; ; ) {
        let n = e() - 1;
        if (n < 0) break;
        t.push(m(n, e));
      }
      return t.flat();
    }
    function f(e) {
      let t = [];
      for (; ; ) {
        let n = e(t.length);
        if (!n) break;
        t.push(n);
      }
      return t;
    }
    function h(e, t, n) {
      let r = Array(e).fill().map(() => []);
      for (let o = 0; o < t; o++) c(e, n).forEach((e, t) => r[t].push(e));
      return r;
    }
    function p(e, t) {
      let n = 1 + t(), r = t(), o = f(t);
      return h(o.length, 1 + e, t).flatMap((e, t) => {
        let [i, ...s] = e;
        return Array(o[t]).fill().map((e, t) => {
          let o = t * r;
          return [i + t * n, s.map(e => e + o)];
        });
      });
    }
    function m(e, t) {
      return h(1 + t(), 1 + e, t).map(e => [e[0], e.slice(1)]);
    }
    function b(e) {
      return `{${(function (e) {
        return e.toString(16).toUpperCase().padStart(2, "0");
      })(e)}}`;
    }
    function y(e) {
      let t = [];
      for (let n = 0, r = e.length; n < r; ) {
        let r = e.codePointAt(n);
        (n += r < 65536 ? 1 : 2, t.push(r));
      }
      return t;
    }
    function g(e) {
      let t = e.length;
      if (t < 4096) return String.fromCodePoint(...e);
      let n = [];
      for (let r = 0; r < t; ) n.push(String.fromCodePoint(...e.slice(r, r += 4096)));
      return n.join("");
    }
    function w(e, t) {
      let n = e.length, r = n - t.length;
      for (let o = 0; 0 == r && o < n; o++) r = e[o] - t[o];
      return r;
    }
    var v = "AEUDWAHSCGYATwDVADIAdgAiADQAFAAtABQAIQAPACcADQASAAsAGQAJABIACQARAAUACwAFAAwABQAQAAMABwAEAAoABQAJAAIACgABAAQAFAALAAIACwABAAIAAQAHAAMAAwAEAAsADAAMAAwACwANAA0AAwAKAAkABAAdAAYAZwDTAecDNACxCmIB8xhZAqfoC190UGcThgBurwf7PT09Pb09AjgJum8OjDllxHYUKXAPxzq6tABAxgK8ysUvWAgMPT09PT09PSs6LT2HcgWXWwFLoSMEEEl5RFVMKvO0XQ8ExDdJMnIgPi89uj00MsvBXxEPAGPCDwBnQKoEbwRwBHEEcgRzBHQEdQR2BHcEeAR6BHsEfAR+BIAEgfndBQoBYgULAWIFDAFiBNcE2ATZBRAFEQUvBdALFAsVDPcNBw13DYcOMA4xDjMB4BllHI0B2grbAMDpHLkQ7QHVAPRNQQFnGRUEg0yEB2uaJEMAJpIBpob5AERSMAKNoAXqaQLRBMCzEiC+AZ4EWRJJFbEu7QDQLARtEbgECxDwAb/RyAk1AV4nD2cEQQKTAzsAGpobPgAahAGPCrysdy0OAKwAfFIcBAQFUmoA/PtZADkBIadVj2UMUgx5Il4ANQC9vLIBDAHUGVsQ8wCzfQIbGVcCHBZHAZ8CBAgXOhG7AqMZ4M7+1M0UAPDNAWsC+mcJDe8AAQA99zkEXLICyQozAo6lAobcP5JvjQLFzwKD9gU/OD8FEQCtEQL6bW+nAKUEvzjDHsuRyUvOFHcacUz5AqIFRSE2kzsBEQCuaQL5DQTlcgO6twSpTiUgCwIFCAUXBHQEqQV6swAVxUlmTmsCwjqsP/wKJQmXb793UgZBEBsnpRD3DDMBtQE7De1L2ATxBjsEyR99GRkPzZWcCKUt3QztJuMuoYBaI/UqgwXtS/Q83QtNUWgPWQtlCeM6Y4FOAyEBDSKLCt0NOQhtEPMKyWsN5RFFBzkD1UmaAKUHAQsRHTUVtSYQYqwLCTl3Bvsa9guPJq8TKXr8BdMaIQZNASka/wDPLueFsFoxXBxPXwYDCyUjxxSoUCANJUC3eEgaGwcVJakCkUNwSodRNh6TIfY8PQ1mLhNRfAf1PAUZTwuBPJ5Gq0UOEdI+jT1IIklMLAQ1fywvJ4sJzw+FDLl8cgFZCSEJsQxxEzERFzfFCDkHGS2XJCcVCCFGlWCaBPefA/MT0QMLBT8JQQcTA7UcLRMuFSkFDYEk1wLzNtUuswKPVoABFwXLDyUf3xBQR+AO6QibAmUDgyXrAC0VIQAXIpsIQ2MAX4/YUwUuywjHamwjdANnFOdhEXMHkQ5XB6ccMxW/HOFwyF4Lhggoo68JWwF1CZkBXwTjCAk1W4ygIEFnU4tYGJsgYUE/XfwCMQxlFZ9EvYd4AosPaxIbATUBcwc5DQECdxHtEWsQlQjrhgQ1tTP4OiUETyGDIBEKJwNPbM4LJyb5DPhpAaMSYgMMND137merYLYkF/0HGTLFQWAh8QuST80MnBrBGEJULhnkB78D8xrzJ+pBVwX/A6MDEzpNM+4EvQtpCIsJPwBJDqMXB9cYagpxjNABMYsBt5kDV5GDAm+PBjcHCwBnC4cFeeUAHQKnCKMABQDPA1cAOQKtB50AGQCFQQE9AycvASHlAo8DkwgxywGVLwHzKQQbwwwVAPc3bkoCw7ECgGpmogXdWAKOAkk1AU0lBAVOR1EDr3HhANsASwYT30cBFatKyxrjQwHfbysAxwD7AAU1BwVBAc0B820AtwFfCzEJorO1AU3pKQCDABVrAdcCiQDdADUAf/EBUwBNBVn5BdMCT0kBETEYK1dhAbsDHwEzAQ0AeQbLjaXJBx8EbQfTAhAbFeEC7y4HtQEDIt8TzULFAr3eVaFgAmSBAmJCW02vWzcgAqH3AmiYAmYJAp+EOBsLAmY7AmYmBG4EfwN/EwN+kjkGOXcXOYI6IyMCbB0CMjY4CgJtxwJtru+KM2dFKwFnAN4A4QBKBQeYDI0A/gvCAA21AncvAnaiPwJ5S0MCeLodXNtFrkbXAnw/AnrIAn0JAnzwBVkFIEgASH1jJAKBbQKAAAKABQJ/rklYSlsVF0rMAtEBAtDMSycDiE8Dh+ZExZEyAvKhXQMDA65LzkwtJQPPTUxNrwKLPwKK2MEbBx1DZwW3Ao43Ao5cQJeBAo7ZAo5ceFG0UzUKUtRUhQKT+wKTDADpABxVHlWvVdAGLBsplYYy4XhmRTs5ApefAu+yWCGoAFklApaPApZ8nACpWaxaCYFNADsClrUClk5cRFzRApnLAplkXMpdBxkCnJs5wjqdApwWAp+bAp64igAdDzEqDwKd8QKekgC1PWE0Ye8CntMCoG4BqQKenx8Cnk6lY8hkJyUrAievAiZ+AqD7AqBMAqLdAqHEAqYvAqXOAqf/AH0Cp/JofGixAANJahxq0QKs4wKsrgKtZwKtAgJXHQJV3AKx4dcDH05slwKyvQ0CsugXbOBtY21IXwMlzQK2XDs/bpADKUUCuF4CuUcVArkqd3A2cOECvRkCu9pwlgMyEQK+iHICAzNxAr4acyJzTwLDywLDBHOCdEs1RXTgAzynAzyaAz2/AsV8AsZHAsYQiQLIaVECyEQCyU8CyS4CZJ0C3dJ4eWF4rnklS9ADGKNnAgJh9BnzlSR7C16SXrsRAs9rAs9sL0tT0vMTnwDGrQLPcwEp6gNOEn5LBQLcJwLbigLSTwNSXANTXwEBA1WMgIk/AMsW7WBFghyC04LOg40C2scC2d6EEIRJpzwDhqUALwNkDoZxWfkAVQLfZQLeuHN3AuIv7RQB8zAnAfSbAfLShwLr8wLpcHkC6vkC6uQA+UcBuQLuiQLrnJaqlwMC7j8DheCYeXDgcaEC8wMAaQOOFpmTAvcTA5FuA5KHAveYAvnZAvhmmhyaq7s3mx4DnYMC/voBGwA5nxyfswMFjQOmagOm2QDRxQMGaqGIogUJAwxJAtQAPwMA4UEXUwER8wNrB5dnBQCTLSu3r73bAYmZFH8RBDkB+ykFIQ6dCZ8Akv0TtRQrxQL3LScApQC3BbmOkRc/xqdtQS4UJo0uAUMBgPwBtSYAdQMOBG0ALAIWDKEAAAoCPQJqA90DfgSRASBFBSF8CgAFAEQAEwA2EgJ3AQAF1QNr7wrFAgD3Cp8nv7G35QGRIUFCAekUfxE0wIkABAAbAFoCRQKEiwAGOlM6lI1tALg6jzrQAI04wTrcAKUA6ADLATqBOjs5/Dn5O3aJOls7nok6bzkYAVYBMwFsBS81XTWeNa01ZjV1NbY1xTWCNZE10jXhNZ41rTXuNf01sjXBNgI2ETXGNdU2FjYnNd417TYuNj02LjUtITY6Nj02PDbJNwgEkDxXNjg23TcgNw82yiA3iTcwCgSwPGc2JDcZN2w6jTchQtRDB0LgQwscDw8JmyhtKFFVBgDpfwDpsAD+mxQ91wLpNSMArQC9BbeOkRdLxptzBL8MDAMMAQgDAAkKCwsLCQoGBAVVBI/DvwDz9b29kaUCb0QtsRTNLt4eGBcSHAMZFhYZEhYEARAEBUEcQRxBHEEcQRxBHEEaQRxBHEFCSTxBPElISUhBNkM2QTYbNklISVmBVIgELgEaJZkC7aMAoQCjBcGOmxdNxrsBvwGJAaQcEZ0ePCklMAAhMvAIMAL54gC7Bm8EescjzQMpARQpKgDUHqSvAj5Gqwr7YrMUACT9AN3rpF27H7fsd/twPt4l+UW1yQYKBt2Cgy7qJpGiLcdE2P1cQSImUbqJ6ICH27H4knQMIRMrFkHu3sx6tC35Y+eLIh4e4CMKJ4DfyV+8mfta499RCAJ0xfeZR8PsoYOApva9pjGn4PhvyZS7/h5JLuhaucfjuU+Z584wwqNO4hWYmaBCcjgQPale1bjoHzMUbut/zTgxHxBnAyrdKpF4IRMASLBtD/jviyLeCgj8twWjAd3HchN/uqaeRYeHJgl7JEY9/cTrvtfybx/r3Y/NtxJ9dp+MTVmiS9bwBH73s8Di56/Ma+mTPMHq4T1yEG1fWcqr0u+hrGnJEvU1JJAm/maQSrKrazIyvSkDFkj8UUlfBq8baniTGPng6YZRL661rDNw4w/1g2figG0IhXnL7wosd/sVNo5dYSmMBTP5c7rYLjRdCwg8quwljOMPf63D8ICAL0r71XRiyFHdgwHbwfgnPOf4Lzjf2v+j+IiDHG2isp5yUnzSDyDRb4i/Vs0qHSHq8PiEQ/JnBP7PxnjN0j6gT4AVAeRx/1o9VnEUlUwvFrzJqHk9jxAw4sYxCnrxaeBdCFFKbnE7z+x54F5W7ZZsU6kx8Qocul6FoAHHy01FGL/nne61mn4+uYXfQ1Uccn+HMLKE+cZzT8BB1E3FRskOgJrRsq25rauLm8+uamXpkS/bTy6y1wDbCrW4eD532kTWrtNUmVVZOIn/C+/JR9KVR5iG9TY8iaT67ubm/whL1xbKZoqtY+a6fNxMJrg211bGYJDUkYMNWA0BMB++9zOm6Eik4roqs9CCEFW0lyAK0PbvlzvoxrZuY/OEhNW/l/63U15Od/RSvmDvXpGLiVmeGi5PDSH2bYz5o2g6wFDQ2FbZgYgTF8rPlvA1ifjZD3NLtFdXdpSIJvgKR7GpjJWG7GZGawPomIH8B5tUmtHH9LpM+/KQKunEPa1GiQkCXv4Cnm9DLORo2joicHdPDZ64obQrPZ5bgqckkj0G6/NEiPYBY4bCkL7W8G5YzsUb6GakFjykSPkT7JGeLeB6uJOGMm+x7N381BCDfbJFx0dtLgV9Q477BfL1fvitX5anV/oYfxeYl+eF5x5bB8+Ep/L2nsmd56aKF4aAD4GbJWsdKyBW22xEmAD3XdbtsMyAFoR5mOla0gEd9U/YVB7zvHGpHbQonay9Sv0bQ8iZ8piaXVrKc5AG1AmqqgaEvzHSP2Wux7aZTWh6quVDVU01JtMIVRdCFwlSbbqqhoFlyzsotQzRexFvZ/MqUSFu3OhRIuNBbufvBpdVgb8XdGJ48/lJPCZ7dsOujTTbKPSEvGXkOnG2Xdi8/nM3EMRqITd5QeU7iOjKqC7URJY6TnLsHij22xAHKnVRD5MDtBYnoGFqZGMDmXCW6Oj+BAWw14hESY/xLF6bLku06AHkiXTHPCFZ0f9YSqqo27eAhhS67OrA2Het4M9JM3jm/yRX6bYxnfmzYl5qQdHxN08FsNuWDrWd4vMUY2QD3hr8vS73SCTkFoXZR3xNzOQt8d/6HfjBmXqvrE6EGkLzK6YK2U2/ksU/iUH+LvVIsJI+ri2AL/klo+ShdDyfs5A83i2prkMs51IKR7ZcqjZJi5X3+bd8GlyWvtddxKEoEqSgEO7A8jIgf2nH0h8FjM7oB6yte3X5mpL0i/E4Rx0CotKnILJj/vJqo4VkPQ93jRtRVfaitQPqldl5xRYPq8387Z0DcnZvOeION0Ht1+P27kFLGQIcLBX4FG3sffccNHh5cPfzp9INoRtqVtdViJfg8RjnXiIz/MNqEN6zvzX3hMzyWC7oSoXIT14ubc0abPX8Rp9GVa5NI/8iv+6ela1oTncbdimRKnrbRffDR/X4nH+bgqAuHWl7hOaeXPWVzIeRl7ga+JzD4Sx3mlj/q6Ra/E2HhDf21eEzTLNGfCZsY+/yxZzQzIAuijG65ii4O/waAJCrEJaWd/DRAKMQ5678Dw5AT7RCKzdadIwd8LsD+DgPBASmWsUlf8R0k1w/2k4lO2Wpb4zMI6EJVJs0xk/wn8/fRUPqrDKhbjHR41SqgFMx5RGMPuduFwlu5lK89tW11sTqiX/5EfGs5nO+y9FKvgXKPOEmgE05EKNL6Sjb3xS40H3BVPhm0ESOZgAjZoymc8be0inDVo4JdJVf+NKd3tN/CaB7GShhH27qf95NoFZVX/6ZkR2lX+CgWrQ2INgkh+bbMz68+uJ3Clsh8HSMPEQtAt+BBE6fXDab7KIlsKxU1lIXW/KWVstpdPanJ0pdXpQinDyUQjtY7ZVcfiecRxRDMAUhHFU2cEaciQ+htiPMPx1kdvtWG9T44w3r037ljHBFJdYR0r55qvMRixtAEFJAqA4T1ES87FAx7UozXasytg8MftZYt0rjYgLe6EJ5aWvy2qscBSBQ7yehoJIA3wIIZ9ukfkyBb6qnue5ko8W50rpV4kXqWjI5nbGRXrNW0tBZHXlY48nSgcUXBHWT4GcgLZJoLlKJnV96kCYpq9eWHh7xJzkCAyrQuQ5AJ0qq/uZ3toJglNterev+Qm0KXxPg/+YbFRJdfhbp1wOnVOEYdVHTya6CtO0afhEaBhx3oHwCb5Kq6RwHDzFMl2vfjL8GwzcCoTj7wZe+UFnYDV2yKpPU9dba29gYBdNqJg/KXozO+CJTlKmlKhnqTf5doeS35DZFV+cYJQVjd+oVY/Gtc/6XPzUxb1gMqf6cEjNNoRC8AObrp+fx0cVtGu4ffC2TgXRC8zPl8moUHCB5HZ25d87mlsiiK0aNwBtcEQjRNBT/QrXbw/8aVXdKMHn9EqYEKEyxSGTpYQOaes1G1Qq8pDgqkZtlO2HRyCXpmeM7TSrRPkAh004BfisVpF6zP44n2Jvxz/gOVocNCyy9V6lkod28QM4pbaMvVJigD/w3BrsjSJrXlqc4ulBYOCceiBN4b/gHajYyupbhEt63a619Ay4wsL6a6w6B+A7TnoyE7BliWHJfzVxxIKM/W3M/J8Bx99Op863Q8eNuIMGRx++VbYfjm+VGYBA3Ap/KEu/wxBNBpJJncwHPG45V8Gh98ZIrGCc20MwijGowZbcS7d1nEgcOW5cddZpHL2XPAIRbColiheZzXTvBxZOY3iMSDSKDrICyJ/iQs1vdplVdH/JrLJsQ2jtTnfCrITIghq3KFX3qAgLWAIp8IffNSdTYptnbGfc8s+qcr3zyzyHp1aJg+jxTF4kD1ry5Wauv5V3xnOGwTFecNzXSLHBW20/pCQjk4uorD0plIhMSTc79+/r4RKPClRYTBYex1Ob5crtfvRQBBv6re/6FhtCqtduag67glqRA77/3ulblh9YRtMdDxkCyJDeNnAuCLPQFmdRRWJtH20Z8DstfJf+5oj5SSB64d0iF5/Ya4KfTWxfivj9Ap2/zbYaTo/1gO3tM6RYsCZharMBFr7Fm61mLSrQnEI4OF1gbVS4k/JE9UotOrnLJZuswoWodCSV8zbybkJSVIP7n8UaE9xCR39rJZmf27HOAPVOGc9pdkQUcRrI0qyVF9Z3j1RHDbxIfwbWzmPVjwIdPJvtmBYwEQIUsIW1S939hcVikK00ozPRI02cqhzVUNzpOxVdrwRPvlh1aIOf0xFEqD3YkGnCnFah/cFN3J2gB7N+bZSGawwkKFu1tpQMrp1W+27YNkyT0TpcFpTqgOqqLabrgcCUPxh97mREOGy4xItzQ9xSl6rq+8BZsHcrQFReS+QeMxJ3P6CnL9EP/eOLDjumLhvrcQrpPiknsofbzBv9gTP0lU+TIVwE6E7CcKfT36q+ZiEOHJ9ayf0dyUJLezAb2M8aNHwd0+OJmsVgTzRWA";
    const A = 44032, x = 4352, C = 4449, P = 4519, E = 28, k = 21 * E, I = A + 19 * k, B = x + 19, S = C + 21, O = P + E;
    function M(e) {
      return e >> 24 & 255;
    }
    function T(e) {
      return 16777215 & e;
    }
    let N, R, F, j;
    function U(e) {
      return e >= A && e < I;
    }
    function D(e, t) {
      if (e >= x && e < B && t >= C && t < S) return A + (e - x) * k + (t - C) * E;
      if (U(e) && t > P && t < O && (e - A) % E == 0) return e + (t - P);
      {
        let n = j.get(e);
        return n && (n = n.get(t), n) ? n : -1;
      }
    }
    function L(e) {
      N || (function () {
        let e = s(v);
        (N = new Map(l(e).flatMap((e, t) => e.map(e => [e, t + 1 << 24]))), R = new Set(u(e)), F = new Map(), j = new Map());
        for (let [t, n] of d(e)) {
          if (!R.has(t) && 2 == n.length) {
            let [e, r] = n, o = j.get(e);
            (o || (o = new Map(), j.set(e, o)), o.set(r, t));
          }
          F.set(t, n.reverse());
        }
      })();
      let t = [], n = [], r = !1;
      function o(e) {
        let n = N.get(e);
        (n && (r = !0, e |= n), t.push(e));
      }
      for (let i of e) for (; ; ) {
        if (i < 128) t.push(i); else if (U(i)) {
          let e = i - A, t = e % k / E | 0, n = e % E;
          (o(x + (e / k | 0)), o(C + t), n > 0 && o(P + n));
        } else {
          let e = F.get(i);
          e ? n.push(...e) : o(i);
        }
        if (!n.length) break;
        i = n.pop();
      }
      if (r && t.length > 1) {
        let e = M(t[0]);
        for (let n = 1; n < t.length; n++) {
          let r = M(t[n]);
          if (0 == r || e <= r) {
            e = r;
            continue;
          }
          let o = n - 1;
          for (; ; ) {
            let n = t[o + 1];
            if ((t[o + 1] = t[o], t[o] = n, !o)) break;
            if ((e = M(t[--o]), e <= r)) break;
          }
          e = M(t[n]);
        }
      }
      return t;
    }
    function z(e) {
      return L(e).map(T);
    }
    function q(e) {
      return (function (e) {
        let t = [], n = [], r = -1, o = 0;
        for (let i of e) {
          let e = M(i), s = T(i);
          if (-1 == r) 0 == e ? r = s : t.push(s); else if (o > 0 && o >= e) (0 == e ? (t.push(r, ...n), n.length = 0, r = s) : n.push(s), o = e); else {
            let i = D(r, s);
            i >= 0 ? r = i : 0 == o && 0 == e ? (t.push(r), r = s) : (n.push(s), o = e);
          }
        }
        return (r >= 0 && t.push(r, ...n), t);
      })(L(e));
    }
    const G = 45, Q = ".", _ = 65039, W = 1, $ = e => Array.from(e);
    function H(e, t) {
      return e.P.has(t) || e.Q.has(t);
    }
    class K extends Array {
      get is_emoji() {
        return !0;
      }
    }
    let V, J, Z, Y, X, ee, te, ne, re, oe, ie, se;
    function ae() {
      if (V) return;
      let e = s(r);
      const t = () => u(e), n = () => new Set(t()), o = (e, t) => t.forEach(t => e.add(t));
      (V = new Map(d(e)), J = n(), Z = t(), Y = new Set(t().map(e => Z[e])), Z = new Set(Z), X = n(), ee = n());
      let i = l(e), a = e();
      const c = () => {
        let e = new Set();
        return (t().forEach(t => o(e, i[t])), o(e, t()), e);
      };
      (te = f(t => {
        let n = f(e).map(e => e + 96);
        if (n.length) {
          let r = t >= a;
          return (n[0] -= 32, n = g(n), r && (n = `Restricted[${n}]`), {
            N: n,
            P: c(),
            Q: c(),
            M: !e(),
            R: r
          });
        }
      }), ne = n(), re = new Map());
      let h = t().concat($(ne)).sort((e, t) => e - t);
      h.forEach((t, n) => {
        let r = e(), o = h[n] = r ? h[n - r] : {
          V: [],
          M: new Map()
        };
        (o.V.push(t), ne.has(t) || re.set(t, o));
      });
      for (let {V: r, M: s} of new Set(re.values())) {
        let e = [];
        for (let n of r) {
          let t = te.filter(e => H(e, n)), r = e.find(({G: e}) => t.some(t => e.has(t)));
          (r || (r = {
            G: new Set(),
            V: []
          }, e.push(r)), r.V.push(n), o(r.G, t));
        }
        let t = e.flatMap(e => $(e.G));
        for (let {G: n, V: r} of e) {
          let e = new Set(t.filter(e => !n.has(e)));
          for (let t of r) s.set(t, e);
        }
      }
      oe = new Set();
      let p = new Set();
      const m = e => oe.has(e) ? p.add(e) : oe.add(e);
      for (let r of te) {
        for (let e of r.P) m(e);
        for (let e of r.Q) m(e);
      }
      for (let r of oe) re.has(r) || p.has(r) || re.set(r, W);
      (o(oe, z(oe)), ie = (function (e) {
        let t = [], n = u(e);
        return ((function e({S: n, B: r}, o, i) {
          if (!(4 & n && i === o[o.length - 1])) {
            (2 & n && (i = o[o.length - 1]), 1 & n && t.push(o));
            for (let t of r) for (let n of t.Q) e(t, [...o, n], i);
          }
        })((function t(r) {
          return {
            S: e(),
            B: f(() => {
              let r = u(e).map(e => n[e]);
              if (r.length) return t(r);
            }),
            Q: r
          };
        })([]), []), t);
      })(e).map(e => K.from(e)).sort(w), se = new Map());
      for (let r of ie) {
        let e = [se];
        for (let t of r) {
          let n = e.map(e => {
            let n = e.get(t);
            return (n || (n = new Map(), e.set(t, n)), n);
          });
          t === _ ? e.push(...n) : e = n;
        }
        for (let t of e) t.V = r;
      }
    }
    function ce(e) {
      return (de(e) ? "" : `${ue(le([e]))} `) + b(e);
    }
    function ue(e) {
      return `"${e}"\u200e`;
    }
    function le(e, t = 1 / 0, n = b) {
      let r = [];
      var o, i;
      (o = e[0], ae(), (i ? Y.has(o) : Z.has(o)) && r.push("◌"), e.length > t && (t >>= 1, e = [...e.slice(0, t), 8230, ...e.slice(-t)]));
      let s = 0, a = e.length;
      for (let c = 0; c < a; c++) {
        let t = e[c];
        de(t) && (r.push(g(e.slice(s, c))), r.push(n(t)), s = c + 1);
      }
      return (r.push(g(e.slice(s, a))), r.join(""));
    }
    function de(e) {
      return (ae(), X.has(e));
    }
    function fe(e, t, n) {
      if (!e) return [];
      ae();
      let r = 0;
      return e.split(Q).map(e => {
        let s = y(e), a = {
          input: s,
          offset: r
        };
        r += s.length + 1;
        try {
          let e, r = a.tokens = ye(s, t, n), c = r.length;
          if (!c) throw new Error("empty label");
          let u = a.output = r.flat();
          if (((function (e) {
            for (let t = e.lastIndexOf(95); t > 0; ) if (95 !== e[--t]) throw new Error("underscore allowed only at start");
          })(u), !(a.emoji = c > 1 || r[0].is_emoji) && u.every(e => e < 128))) (!(function (e) {
            if (e.length >= 4 && e[2] == G && e[3] == G) throw new Error(`invalid label extension: "${g(e.slice(0, 4))}"`);
          })(u), e = "ASCII"); else {
            let t = r.flatMap(e => e.is_emoji ? [] : e);
            if (t.length) {
              if (Z.has(u[0])) throw be("leading combining mark");
              for (let e = 1; e < c; e++) {
                let t = r[e];
                if (!t.is_emoji && Z.has(t[0])) throw be(`emoji + combining mark: "${g(r[e - 1])} + ${le([t[0]])}"`);
              }
              !(function (e) {
                let t = e[0], n = o.get(t);
                if (n) throw be(`leading ${n}`);
                let r = e.length, i = -1;
                for (let s = 1; s < r; s++) {
                  t = e[s];
                  let r = o.get(t);
                  if (r) {
                    if (i == s) throw be(`${n} + ${r}`);
                    (i = s + 1, n = r);
                  }
                }
                if (i == r) throw be(`trailing ${n}`);
              })(u);
              let n = $(new Set(t)), [s] = (function (e) {
                let t = te;
                for (let n of e) {
                  let e = t.filter(e => H(e, n));
                  if (!e.length) throw te.some(e => H(e, n)) ? me(t[0], n) : pe(n);
                  if ((t = e, 1 == e.length)) break;
                }
                return t;
              })(n);
              (!(function (e, t) {
                for (let n of t) if (!H(e, n)) throw me(e, n);
                if (e.M) {
                  let e = z(t);
                  for (let t = 1, n = e.length; t < n; t++) if (Y.has(e[t])) {
                    let r = t + 1;
                    for (let o; r < n && Y.has(o = e[r]); r++) for (let n = t; n < r; n++) if (e[n] == o) throw new Error(`duplicate non-spacing marks: ${ce(o)}`);
                    if (r - t > i) throw new Error(`excessive non-spacing marks: ${ue(le(e.slice(t - 1, r)))} (${r - t}/${i})`);
                    t = r;
                  }
                }
              })(s, t), (function (e, t) {
                let n, r = [];
                for (let o of t) {
                  let e = re.get(o);
                  if (e === W) return;
                  if (e) {
                    let t = e.M.get(o);
                    if ((n = n ? n.filter(e => t.has(e)) : $(t), !n.length)) return;
                  } else r.push(o);
                }
                if (n) for (let o of n) if (r.every(e => H(o, e))) throw new Error(`whole-script confusable: ${e.N}/${o.N}`);
              })(s, n), e = s.N);
            } else e = "Emoji";
          }
          a.type = e;
        } catch (c) {
          a.error = c;
        }
        return a;
      });
    }
    function he(e) {
      return e.map(({input: t, error: n, output: r}) => {
        if (n) {
          let r = n.message;
          throw new Error(1 == e.length ? r : `Invalid label ${ue(le(t, 63))}: ${r}`);
        }
        return g(r);
      }).join(Q);
    }
    function pe(e) {
      return new Error(`disallowed character: ${ce(e)}`);
    }
    function me(e, t) {
      let n = ce(t), r = te.find(e => e.P.has(t));
      return (r && (n = `${r.N} ${n}`), new Error(`illegal mixture: ${e.N} + ${n}`));
    }
    function be(e) {
      return new Error(`illegal placement: ${e}`);
    }
    function ye(e, t, n) {
      let r = [], o = [];
      for (e = e.slice().reverse(); e.length; ) {
        let i = we(e);
        if (i) (o.length && (r.push(t(o)), o = []), r.push(n(i))); else {
          let t = e.pop();
          if (oe.has(t)) o.push(t); else {
            let e = V.get(t);
            if (e) o.push(...e); else if (!J.has(t)) throw pe(t);
          }
        }
      }
      return (o.length && r.push(t(o)), r);
    }
    function ge(e) {
      return e.filter(e => e != _);
    }
    function we(e, t) {
      let n, r = se, o = e.length;
      for (; o && (r = r.get(e[--o]), r); ) {
        let {V: i} = r;
        i && (n = i, t && t.push(...e.slice(o).reverse()), e.length = o);
      }
      return n;
    }
    function ve(e) {
      return (function (e) {
        return he(fe(e, q, ge));
      })(e);
    }
    function Ae(e) {
      return ve(e);
    }
  },
  98707: function (e, t, n) {
    "use strict";
    n.d(t, {
      T: function () {
        return c;
      }
    });
    var r = n(44659);
    var o = n(59455), i = n(13169), s = n(65358);
    function a(e) {
      const t = new Uint8Array(32).fill(0);
      return e ? (0, s.i)(e) || (0, i.w)((0, r.qX)(e)) : (0, o.ci)(t);
    }
    function c(e) {
      const t = e.replace(/^\.|\.$/gm, "");
      if (0 === t.length) return new Uint8Array(1);
      const n = new Uint8Array((0, r.qX)(t).byteLength + 2);
      let o = 0;
      const i = t.split(".");
      for (let s = 0; s < i.length; s++) {
        let e = (0, r.qX)(i[s]);
        (e.byteLength > 255 && (e = (0, r.qX)(`[${a(i[s]).slice(2)}]`)), n[o] = e.length, n.set(e, o + 1), o += e.length + 1);
      }
      return n.byteLength !== o + 1 ? n.slice(0, o + 1) : n;
    }
  },
  14015: function (e, t, n) {
    "use strict";
    n.d(t, {
      P: function () {
        return s;
      }
    });
    var r = n(20010), o = n(78125), i = n(18856);
    function s(e, {docsPath: t, ...n}) {
      const s = (() => {
        const t = (0, i.k)(e, n);
        return t instanceof o.cj ? e : t;
      })();
      return new r.cg(s, {
        docsPath: t,
        ...n
      });
    }
  },
  34180: function (e, t, n) {
    "use strict";
    n.d(t, {
      S: function () {
        return u;
      }
    });
    var r = n(65531), o = n(81544), i = n(20010), s = n(17057), a = n(77014);
    const c = 3;
    function u(e, {abi: t, address: n, args: u, docsPath: l, functionName: d, sender: f}) {
      const h = e instanceof i.VQ ? e : e instanceof o.G ? e.walk(e => ("data" in e)) || e.walk() : {}, {code: p, data: m, details: b, message: y, shortMessage: g} = h, w = e instanceof r.wb ? new i.Dk({
        functionName: d
      }) : [c, a.XS.code].includes(p) && (m || b || y || g) ? new i.Lu({
        abi: t,
        data: "object" === typeof m ? m.data : m,
        functionName: d,
        message: h instanceof s.bs ? b : g ?? y
      }) : e;
      return new i.uq(w, {
        abi: t,
        args: u,
        contractAddress: n,
        docsPath: l,
        functionName: d,
        sender: f
      });
    }
  },
  18856: function (e, t, n) {
    "use strict";
    n.d(t, {
      k: function () {
        return i;
      }
    });
    var r = n(81544), o = n(78125);
    function i(e, t) {
      const n = (e.details || "").toLowerCase(), i = e instanceof r.G ? e.walk(e => e?.code === o.M_.code) : e;
      return i instanceof r.G ? new o.M_({
        cause: e,
        message: i.details
      }) : o.M_.nodeMessage.test(n) ? new o.M_({
        cause: e,
        message: e.details
      }) : o.Hh.nodeMessage.test(n) ? new o.Hh({
        cause: e,
        maxFeePerGas: t?.maxFeePerGas
      }) : o.G$.nodeMessage.test(n) ? new o.G$({
        cause: e,
        maxFeePerGas: t?.maxFeePerGas
      }) : o.ZI.nodeMessage.test(n) ? new o.ZI({
        cause: e,
        nonce: t?.nonce
      }) : o.vU.nodeMessage.test(n) ? new o.vU({
        cause: e,
        nonce: t?.nonce
      }) : o.se.nodeMessage.test(n) ? new o.se({
        cause: e,
        nonce: t?.nonce
      }) : o.C_.nodeMessage.test(n) ? new o.C_({
        cause: e
      }) : o.WF.nodeMessage.test(n) ? new o.WF({
        cause: e,
        gas: t?.gas
      }) : o.dR.nodeMessage.test(n) ? new o.dR({
        cause: e,
        gas: t?.gas
      }) : o.pZ.nodeMessage.test(n) ? new o.pZ({
        cause: e
      }) : o.cs.nodeMessage.test(n) ? new o.cs({
        cause: e,
        maxFeePerGas: t?.maxFeePerGas,
        maxPriorityFeePerGas: t?.maxPriorityFeePerGas
      }) : new o.cj({
        cause: e
      });
    }
  },
  59069: function (e, t, n) {
    "use strict";
    n.d(t, {
      Z: function () {
        return o;
      }
    });
    var r = n(27481);
    function o(e, t) {
      const n = (e.transactions ?? []).map(e => "string" === typeof e ? e : (0, r.Tr)(e));
      return {
        ...e,
        baseFeePerGas: e.baseFeePerGas ? BigInt(e.baseFeePerGas) : null,
        blobGasUsed: e.blobGasUsed ? BigInt(e.blobGasUsed) : void 0,
        difficulty: e.difficulty ? BigInt(e.difficulty) : void 0,
        excessBlobGas: e.excessBlobGas ? BigInt(e.excessBlobGas) : void 0,
        gasLimit: e.gasLimit ? BigInt(e.gasLimit) : void 0,
        gasUsed: e.gasUsed ? BigInt(e.gasUsed) : void 0,
        hash: e.hash ? e.hash : null,
        logsBloom: e.logsBloom ? e.logsBloom : null,
        nonce: e.nonce ? e.nonce : null,
        number: e.number ? BigInt(e.number) : null,
        size: e.size ? BigInt(e.size) : void 0,
        timestamp: e.timestamp ? BigInt(e.timestamp) : void 0,
        transactions: n,
        totalDifficulty: e.totalDifficulty ? BigInt(e.totalDifficulty) : null
      };
    }
  },
  70878: function (e, t, n) {
    "use strict";
    function r(e, {format: t}) {
      if (!t) return {};
      const n = {};
      return ((function t(r) {
        const o = Object.keys(r);
        for (const i of o) ((i in e) && (n[i] = e[i]), r[i] && "object" === typeof r[i] && !Array.isArray(r[i]) && t(r[i]));
      })(t(e || ({}))), n);
    }
    n.d(t, {
      K: function () {
        return r;
      }
    });
  },
  55668: function (e, t, n) {
    "use strict";
    function r(e, {args: t, eventName: n} = {}) {
      return {
        ...e,
        blockHash: e.blockHash ? e.blockHash : null,
        blockNumber: e.blockNumber ? BigInt(e.blockNumber) : null,
        logIndex: e.logIndex ? Number(e.logIndex) : null,
        transactionHash: e.transactionHash ? e.transactionHash : null,
        transactionIndex: e.transactionIndex ? Number(e.transactionIndex) : null,
        ...n ? {
          args: t,
          eventName: n
        } : {}
      };
    }
    n.d(t, {
      U: function () {
        return r;
      }
    });
  },
  27481: function (e, t, n) {
    "use strict";
    n.d(t, {
      Tr: function () {
        return i;
      },
      c8: function () {
        return o;
      }
    });
    var r = n(72932);
    const o = {
      "0x0": "legacy",
      "0x1": "eip2930",
      "0x2": "eip1559",
      "0x3": "eip4844",
      "0x4": "eip7702"
    };
    function i(e, t) {
      const n = {
        ...e,
        blockHash: e.blockHash ? e.blockHash : null,
        blockNumber: e.blockNumber ? BigInt(e.blockNumber) : null,
        chainId: e.chainId ? (0, r.ly)(e.chainId) : void 0,
        gas: e.gas ? BigInt(e.gas) : void 0,
        gasPrice: e.gasPrice ? BigInt(e.gasPrice) : void 0,
        maxFeePerBlobGas: e.maxFeePerBlobGas ? BigInt(e.maxFeePerBlobGas) : void 0,
        maxFeePerGas: e.maxFeePerGas ? BigInt(e.maxFeePerGas) : void 0,
        maxPriorityFeePerGas: e.maxPriorityFeePerGas ? BigInt(e.maxPriorityFeePerGas) : void 0,
        nonce: e.nonce ? (0, r.ly)(e.nonce) : void 0,
        to: e.to ? e.to : null,
        transactionIndex: e.transactionIndex ? Number(e.transactionIndex) : null,
        type: e.type ? o[e.type] : void 0,
        typeHex: e.type ? e.type : void 0,
        value: e.value ? BigInt(e.value) : void 0,
        v: e.v ? BigInt(e.v) : void 0
      };
      return (e.authorizationList && (n.authorizationList = e.authorizationList.map(e => ({
        address: e.address,
        chainId: Number(e.chainId),
        nonce: Number(e.nonce),
        r: e.r,
        s: e.s,
        yParity: Number(e.yParity)
      }))), n.yParity = (() => {
        if (e.yParity) return Number(e.yParity);
        if ("bigint" === typeof n.v) {
          if (0n === n.v || 27n === n.v) return 0;
          if (1n === n.v || 28n === n.v) return 1;
          if (n.v >= 35n) return n.v % 2n === 0n ? 1 : 0;
        }
      })(), "legacy" === n.type && (delete n.accessList, delete n.maxFeePerBlobGas, delete n.maxFeePerGas, delete n.maxPriorityFeePerGas, delete n.yParity), "eip2930" === n.type && (delete n.maxFeePerBlobGas, delete n.maxFeePerGas, delete n.maxPriorityFeePerGas), "eip1559" === n.type && delete n.maxFeePerBlobGas, n);
    }
  },
  13550: function (e, t, n) {
    "use strict";
    n.d(t, {
      ew: function () {
        return s;
      },
      fA: function () {
        return a;
      }
    });
    var r = n(72932), o = n(55668), i = n(27481);
    const s = {
      "0x0": "reverted",
      "0x1": "success"
    };
    function a(e, t) {
      const n = {
        ...e,
        blockNumber: e.blockNumber ? BigInt(e.blockNumber) : null,
        contractAddress: e.contractAddress ? e.contractAddress : null,
        cumulativeGasUsed: e.cumulativeGasUsed ? BigInt(e.cumulativeGasUsed) : null,
        effectiveGasPrice: e.effectiveGasPrice ? BigInt(e.effectiveGasPrice) : null,
        gasUsed: e.gasUsed ? BigInt(e.gasUsed) : null,
        logs: e.logs ? e.logs.map(e => (0, o.U)(e)) : null,
        to: e.to ? e.to : null,
        transactionIndex: e.transactionIndex ? (0, r.ly)(e.transactionIndex) : null,
        status: e.status ? s[e.status] : null,
        type: e.type ? i.c8[e.type] || e.type : null
      };
      return (e.blobGasPrice && (n.blobGasPrice = BigInt(e.blobGasPrice)), e.blobGasUsed && (n.blobGasUsed = BigInt(e.blobGasUsed)), n);
    }
  },
  92614: function (e, t, n) {
    "use strict";
    n.d(t, {
      tG: function () {
        return i;
      }
    });
    var r = n(59455);
    const o = {
      legacy: "0x0",
      eip2930: "0x1",
      eip1559: "0x2",
      eip4844: "0x3",
      eip7702: "0x4"
    };
    function i(e, t) {
      const n = {};
      return ("undefined" !== typeof e.authorizationList && (n.authorizationList = e.authorizationList.map(e => ({
        address: e.address,
        r: e.r ? (0, r.eC)(BigInt(e.r)) : e.r,
        s: e.s ? (0, r.eC)(BigInt(e.s)) : e.s,
        chainId: (0, r.eC)(e.chainId),
        nonce: (0, r.eC)(e.nonce),
        ..."undefined" !== typeof e.yParity ? {
          yParity: (0, r.eC)(e.yParity)
        } : {},
        ..."undefined" !== typeof e.v && "undefined" === typeof e.yParity ? {
          v: (0, r.eC)(e.v)
        } : {}
      }))), "undefined" !== typeof e.accessList && (n.accessList = e.accessList), "undefined" !== typeof e.blobVersionedHashes && (n.blobVersionedHashes = e.blobVersionedHashes), "undefined" !== typeof e.blobs && ("string" !== typeof e.blobs[0] ? n.blobs = e.blobs.map(e => (0, r.ci)(e)) : n.blobs = e.blobs), "undefined" !== typeof e.data && (n.data = e.data), "undefined" !== typeof e.from && (n.from = e.from), "undefined" !== typeof e.gas && (n.gas = (0, r.eC)(e.gas)), "undefined" !== typeof e.gasPrice && (n.gasPrice = (0, r.eC)(e.gasPrice)), "undefined" !== typeof e.maxFeePerBlobGas && (n.maxFeePerBlobGas = (0, r.eC)(e.maxFeePerBlobGas)), "undefined" !== typeof e.maxFeePerGas && (n.maxFeePerGas = (0, r.eC)(e.maxFeePerGas)), "undefined" !== typeof e.maxPriorityFeePerGas && (n.maxPriorityFeePerGas = (0, r.eC)(e.maxPriorityFeePerGas)), "undefined" !== typeof e.nonce && (n.nonce = (0, r.eC)(e.nonce)), "undefined" !== typeof e.to && (n.to = e.to), "undefined" !== typeof e.type && (n.type = o[e.type]), "undefined" !== typeof e.value && (n.value = (0, r.eC)(e.value)), n);
    }
  },
  82645: function (e, t, n) {
    "use strict";
    function r(e, t, n) {
      const r = e[t.name];
      if ("function" === typeof r) return r;
      const o = e[n];
      return "function" === typeof o ? o : n => t(e, n);
    }
    n.d(t, {
      s: function () {
        return r;
      }
    });
  },
  13169: function (e, t, n) {
    "use strict";
    n.d(t, {
      w: function () {
        return a;
      }
    });
    var r = n(92530), o = n(93610), i = n(44659), s = n(59455);
    function a(e, t) {
      const n = t || "hex", a = (0, r.fr)((0, o.v)(e, {
        strict: !1
      }) ? (0, i.O0)(e) : e);
      return "bytes" === n ? a : (0, s.NC)(a);
    }
  },
  45392: function (e, t, n) {
    "use strict";
    n.d(t, {
      n: function () {
        return r;
      }
    });
    const r = n(96697).r;
  },
  10464: function (e, t, n) {
    "use strict";
    n.d(t, {
      C: function () {
        return i;
      }
    });
    var r = n(69921), o = n(96697);
    const i = e => (0, r.tP)((0, o.r)(e), 0, 4);
  },
  96697: function (e, t, n) {
    "use strict";
    n.d(t, {
      r: function () {
        return f;
      }
    });
    var r = n(44659), o = n(13169);
    const i = e => (0, o.w)((0, r.O0)(e));
    var s = n(62619);
    const a = /^tuple(?<array>(\[(\d*)\])*)$/;
    function c(e) {
      let t = e.type;
      if (a.test(e.type) && ("components" in e)) {
        t = "(";
        const n = e.components.length;
        for (let o = 0; o < n; o++) {
          (t += c(e.components[o]), o < n - 1 && (t += ", "));
        }
        const r = (0, s.Zw)(a, e.type);
        return (t += `)${r?.array ?? ""}`, c({
          ...e,
          type: t
        }));
      }
      return (("indexed" in e) && e.indexed && (t = `${t} indexed`), e.name ? `${t} ${e.name}` : t);
    }
    function u(e) {
      let t = "";
      const n = e.length;
      for (let r = 0; r < n; r++) {
        (t += c(e[r]), r !== n - 1 && (t += ", "));
      }
      return t;
    }
    var l = n(81544);
    const d = e => (function (e) {
      let t = !0, n = "", r = 0, o = "", i = !1;
      for (let s = 0; s < e.length; s++) {
        const a = e[s];
        if ((["(", ")", ","].includes(a) && (t = !0), "(" === a && r++, ")" === a && r--, t)) if (0 !== r) " " !== a ? (o += a, n += a) : "," !== e[s - 1] && "," !== n && ",(" !== n && (n = "", t = !1); else if (" " === a && ["event", "function", ""].includes(o)) o = ""; else if ((o += a, ")" === a)) {
          i = !0;
          break;
        }
      }
      if (!i) throw new l.G("Unable to normalize signature.");
      return o;
    })((() => {
      return "string" === typeof e ? e : "function" === (t = e).type ? `function ${t.name}(${u(t.inputs)})${t.stateMutability && "nonpayable" !== t.stateMutability ? ` ${t.stateMutability}` : ""}${t.outputs?.length ? ` returns (${u(t.outputs)})` : ""}` : "event" === t.type ? `event ${t.name}(${u(t.inputs)})` : "error" === t.type ? `error ${t.name}(${u(t.inputs)})` : "constructor" === t.type ? `constructor(${u(t.inputs)})${"payable" === t.stateMutability ? " payable" : ""}` : "fallback" === t.type ? "fallback() external" + ("payable" === t.stateMutability ? " payable" : "") : "receive() external payable";
      var t;
    })());
    function f(e) {
      return (t = d(e), i(t));
      var t;
    }
  },
  82061: function (e, t, n) {
    "use strict";
    n.d(t, {
      k: function () {
        return r;
      }
    });
    class r extends Map {
      constructor(e) {
        (super(), Object.defineProperty(this, "maxSize", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), this.maxSize = e);
      }
      get(e) {
        const t = super.get(e);
        return (super.has(e) && void 0 !== t && (this.delete(e), super.set(e, t)), t);
      }
      set(e, t) {
        if ((super.set(e, t), this.maxSize && this.size > this.maxSize)) {
          const e = this.keys().next().value;
          e && this.delete(e);
        }
        return this;
      }
    }
  },
  36478: function (e, t, n) {
    "use strict";
    n.d(t, {
      N7: function () {
        return s;
      }
    });
    const r = new Map(), o = new Map();
    let i = 0;
    function s(e, t, n) {
      const s = ++i, a = () => r.get(e) || [], c = () => {
        const t = a();
        if (!t.some(e => e.id === s)) return;
        const n = o.get(e);
        if (1 === t.length && n) {
          const e = n();
          e instanceof Promise && e.catch(() => {});
        }
        (() => {
          const t = a();
          r.set(e, t.filter(e => e.id !== s));
        })();
      }, u = a();
      if ((r.set(e, [...u, {
        id: s,
        fns: t
      }]), u && u.length > 0)) return c;
      const l = {};
      for (const r in t) l[r] = (...e) => {
        const t = a();
        if (0 !== t.length) for (const n of t) n.fns[r]?.(...e);
      };
      const d = n(l);
      return ("function" === typeof d && o.set(e, d), c);
    }
  },
  41495: function (e, t, n) {
    "use strict";
    n.d(t, {
      $: function () {
        return o;
      }
    });
    var r = n(33457);
    function o(e, {emitOnBegin: t, initialWaitTime: n, interval: o}) {
      let i = !0;
      const s = () => i = !1;
      return ((async () => {
        let a;
        t && (a = await e({
          unpoll: s
        }));
        const c = await n?.(a) ?? o;
        await (0, r.D)(c);
        const u = async () => {
          i && (await e({
            unpoll: s
          }), await (0, r.D)(o), u());
        };
        u();
      })(), s);
    }
  },
  43226: function (e, t, n) {
    "use strict";
    n.d(t, {
      S: function () {
        return i;
      }
    });
    var r = n(56921);
    const o = new Map();
    function i({fn: e, id: t, shouldSplitBatch: n, wait: i = 0, sort: s}) {
      const a = async () => {
        const t = u();
        c();
        const n = t.map(({args: e}) => e);
        0 !== n.length && e(n).then(e => {
          s && Array.isArray(e) && e.sort(s);
          for (let n = 0; n < t.length; n++) {
            const {resolve: r} = t[n];
            r?.([e[n], e]);
          }
        }).catch(e => {
          for (let n = 0; n < t.length; n++) {
            const {reject: r} = t[n];
            r?.(e);
          }
        });
      }, c = () => o.delete(t), u = () => o.get(t) || [], l = e => o.set(t, [...u(), e]);
      return {
        flush: c,
        async schedule(e) {
          const {promise: t, resolve: o, reject: s} = (0, r.n)(), c = n?.([...u().map(({args: e}) => e), e]);
          c && a();
          return u().length > 0 ? (l({
            args: e,
            resolve: o,
            reject: s
          }), t) : (l({
            args: e,
            resolve: o,
            reject: s
          }), setTimeout(a, i), t);
        }
      };
    }
  },
  56921: function (e, t, n) {
    "use strict";
    function r() {
      let e = () => {}, t = () => {};
      return {
        promise: new Promise((n, r) => {
          (e = n, t = r);
        }),
        resolve: e,
        reject: t
      };
    }
    n.d(t, {
      n: function () {
        return r;
      }
    });
  },
  49287: function (e, t, n) {
    "use strict";
    n.d(t, {
      J: function () {
        return o;
      }
    });
    var r = n(33457);
    function o(e, {delay: t = 100, retryCount: n = 2, shouldRetry: o = () => !0} = {}) {
      return new Promise((i, s) => {
        const a = async ({count: c = 0} = {}) => {
          try {
            const t = await e();
            i(t);
          } catch (u) {
            if (c < n && await o({
              count: c,
              error: u
            })) return (async ({error: e}) => {
              const n = "function" === typeof t ? t({
                count: c,
                error: e
              }) : t;
              (n && await (0, r.D)(n), a({
                count: c + 1
              }));
            })({
              error: u
            });
            s(u);
          }
        };
        a();
      });
    }
  },
  39504: function (e, t, n) {
    "use strict";
    function r(e, {errorInstance: t = new Error("timed out"), timeout: n, signal: r}) {
      return new Promise((o, i) => {
        (async () => {
          let s;
          try {
            const a = new AbortController();
            (n > 0 && (s = setTimeout(() => {
              r ? a.abort() : i(t);
            }, n)), o(await e({
              signal: a?.signal || null
            })));
          } catch (a) {
            ("AbortError" === a?.name && i(t), i(a));
          } finally {
            clearTimeout(s);
          }
        })();
      });
    }
    n.d(t, {
      F: function () {
        return r;
      }
    });
  },
  23251: function (e, t, n) {
    "use strict";
    n.d(t, {
      Ow: function () {
        return r;
      },
      eL: function () {
        return o;
      },
      lh: function () {
        return i;
      }
    });
    const r = /^(.*)\[([0-9]*)\]$/, o = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/, i = /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
  },
  15566: function (e, t, n) {
    "use strict";
    n.d(t, {
      r: function () {
        return c;
      }
    });
    var r = n(13169);
    const o = "\u0019Ethereum Signed Message:\n";
    var i = n(89256), s = n(20556), a = n(59455);
    function c(e, t) {
      return (0, r.w)((function (e) {
        const t = "string" === typeof e ? (0, a.$G)(e) : "string" === typeof e.raw ? e.raw : (0, a.ci)(e.raw), n = (0, a.$G)(`${o}${(0, s.d)(t)}`);
        return (0, i.zo)([n, t]);
      })(e), t);
    }
  },
  86044: function (e, t, n) {
    "use strict";
    n.d(t, {
      Jv: function () {
        return w;
      }
    });
    var r = n(30056), o = n(89256), i = n(59455), s = n(13169), a = n(65531), c = n(10052), u = n(31853), l = n(81544);
    class d extends l.G {
      constructor({domain: e}) {
        super(`Invalid domain "${(0, u.P)(e)}".`, {
          metaMessages: ["Must be a valid EIP-712 domain."]
        });
      }
    }
    class f extends l.G {
      constructor({primaryType: e, types: t}) {
        super(`Invalid primary type \`${e}\` must be one of \`${JSON.stringify(Object.keys(t))}\`.`, {
          docsPath: "/api/glossary/Errors#typeddatainvalidprimarytypeerror",
          metaMessages: ["Check that the primary type is a key in `types`."]
        });
      }
    }
    class h extends l.G {
      constructor({type: e}) {
        super(`Struct type "${e}" is invalid.`, {
          metaMessages: ["Struct type must not be a Solidity type."],
          name: "InvalidStructTypeError"
        });
      }
    }
    var p = n(4012), m = n(20556), b = n(23251);
    function y({domain: e}) {
      return ["string" === typeof e?.name && ({
        name: "name",
        type: "string"
      }), e?.version && ({
        name: "version",
        type: "string"
      }), ("number" === typeof e?.chainId || "bigint" === typeof e?.chainId) && ({
        name: "chainId",
        type: "uint256"
      }), e?.verifyingContract && ({
        name: "verifyingContract",
        type: "address"
      }), e?.salt && ({
        name: "salt",
        type: "bytes32"
      })].filter(Boolean);
    }
    function g(e) {
      if ("address" === e || "bool" === e || "string" === e || e.startsWith("bytes") || e.startsWith("uint") || e.startsWith("int")) throw new h({
        type: e
      });
    }
    function w(e) {
      const {domain: t = {}, message: n, primaryType: r} = e, u = {
        EIP712Domain: y({
          domain: t
        }),
        ...e.types
      };
      !(function (e) {
        const {domain: t, message: n, primaryType: r, types: o} = e, s = (e, t) => {
          for (const n of e) {
            const {name: e, type: r} = n, u = t[e], l = r.match(b.lh);
            if (l && ("number" === typeof u || "bigint" === typeof u)) {
              const [e, t, n] = l;
              (0, i.eC)(u, {
                signed: "int" === t,
                size: Number.parseInt(n, 10) / 8
              });
            }
            if ("address" === r && "string" === typeof u && !(0, p.U)(u)) throw new c.b({
              address: u
            });
            const d = r.match(b.eL);
            if (d) {
              const [e, t] = d;
              if (t && (0, m.d)(u) !== Number.parseInt(t, 10)) throw new a.KY({
                expectedSize: Number.parseInt(t, 10),
                givenSize: (0, m.d)(u)
              });
            }
            const f = o[r];
            f && (g(r), s(f, u));
          }
        };
        if (o.EIP712Domain && t) {
          if ("object" !== typeof t) throw new d({
            domain: t
          });
          s(o.EIP712Domain, t);
        }
        if ("EIP712Domain" !== r) {
          if (!o[r]) throw new f({
            primaryType: r,
            types: o
          });
          s(o[r], n);
        }
      })({
        domain: t,
        message: n,
        primaryType: r,
        types: u
      });
      const l = ["0x1901"];
      return (t && l.push((function ({domain: e, types: t}) {
        return v({
          data: e,
          primaryType: "EIP712Domain",
          types: t
        });
      })({
        domain: t,
        types: u
      })), "EIP712Domain" !== r && l.push(v({
        data: n,
        primaryType: r,
        types: u
      })), (0, s.w)((0, o.zo)(l)));
    }
    function v({data: e, primaryType: t, types: n}) {
      const r = A({
        data: e,
        primaryType: t,
        types: n
      });
      return (0, s.w)(r);
    }
    function A({data: e, primaryType: t, types: n}) {
      const o = [{
        type: "bytes32"
      }], i = [x({
        primaryType: t,
        types: n
      })];
      for (const r of n[t]) {
        const [t, s] = P({
          types: n,
          name: r.name,
          type: r.type,
          value: e[r.name]
        });
        (o.push(t), i.push(s));
      }
      return (0, r.E)(o, i);
    }
    function x({primaryType: e, types: t}) {
      const n = (0, i.NC)((function ({primaryType: e, types: t}) {
        let n = "";
        const r = C({
          primaryType: e,
          types: t
        });
        r.delete(e);
        const o = [e, ...Array.from(r).sort()];
        for (const i of o) n += `${i}(${t[i].map(({name: e, type: t}) => `${t} ${e}`).join(",")})`;
        return n;
      })({
        primaryType: e,
        types: t
      }));
      return (0, s.w)(n);
    }
    function C({primaryType: e, types: t}, n = new Set()) {
      const r = e.match(/^\w*/u), o = r?.[0];
      if (n.has(o) || void 0 === t[o]) return n;
      n.add(o);
      for (const i of t[o]) C({
        primaryType: i.type,
        types: t
      }, n);
      return n;
    }
    function P({types: e, name: t, type: n, value: o}) {
      if (void 0 !== e[n]) return [{
        type: "bytes32"
      }, (0, s.w)(A({
        data: o,
        primaryType: n,
        types: e
      }))];
      if ("bytes" === n) {
        return (o = `0x${(o.length % 2 ? "0" : "") + o.slice(2)}`, [{
          type: "bytes32"
        }, (0, s.w)(o)]);
      }
      if ("string" === n) return [{
        type: "bytes32"
      }, (0, s.w)((0, i.NC)(o))];
      if (n.lastIndexOf("]") === n.length - 1) {
        const i = n.slice(0, n.lastIndexOf("[")), a = o.map(n => P({
          name: t,
          type: i,
          types: e,
          value: n
        }));
        return [{
          type: "bytes32"
        }, (0, s.w)((0, r.E)(a.map(([e]) => e), a.map(([, e]) => e)))];
      }
      return [{
        type: n
      }, o];
    }
  },
  69021: function (e, t, n) {
    "use strict";
    n.d(t, {
      R: function () {
        return l;
      }
    });
    var r = n(31669), o = n(13169);
    var i = n(93610), s = n(20556), a = n(72932), c = n(59455);
    function u(e) {
      if (0 === e || 1 === e) return e;
      if (27 === e) return 0;
      if (28 === e) return 1;
      throw new Error("Invalid yParityOrV value");
    }
    async function l({hash: e, signature: t}) {
      return (function (e) {
        const t = (0, o.w)(`0x${e.substring(4)}`).substring(26);
        return (0, r.x)(`0x${t}`);
      })(await (async function ({hash: e, signature: t}) {
        const r = (0, i.v)(e) ? e : (0, c.NC)(e), {secp256k1: o} = await Promise.resolve().then(n.bind(n, 69663));
        return `0x${(() => {
          if ("object" === typeof t && ("r" in t) && ("s" in t)) {
            const {r: e, s: n, v: r, yParity: i} = t, s = u(Number(i ?? r));
            return new o.Signature((0, a.y_)(e), (0, a.y_)(n)).addRecoveryBit(s);
          }
          const e = (0, i.v)(t) ? t : (0, c.NC)(t);
          if (65 !== (0, s.d)(e)) throw new Error("invalid signature length");
          const n = u((0, a.ly)(`0x${e.slice(130)}`));
          return o.Signature.fromCompact(e.substring(2, 130)).addRecoveryBit(n);
        })().recoverPublicKey(r.substring(2)).toHex(!1)}`;
      })({
        hash: e,
        signature: t
      }));
    }
  },
  77911: function (e, t, n) {
    "use strict";
    n.d(t, {
      mF: function () {
        return l;
      }
    });
    var r = n(10052), o = n(47116), i = n(29625), s = n(4012), a = n(59455);
    function c(e) {
      if (e && 0 !== e.length) return e.reduce((e, {slot: t, value: n}) => {
        if (66 !== t.length) throw new o.W_({
          size: t.length,
          targetSize: 66,
          type: "hex"
        });
        if (66 !== n.length) throw new o.W_({
          size: n.length,
          targetSize: 66,
          type: "hex"
        });
        return (e[t] = n, e);
      }, {});
    }
    function u(e) {
      const {balance: t, nonce: n, state: r, stateDiff: o, code: s} = e, u = {};
      if ((void 0 !== s && (u.code = s), void 0 !== t && (u.balance = (0, a.eC)(t)), void 0 !== n && (u.nonce = (0, a.eC)(n)), void 0 !== r && (u.state = c(r)), void 0 !== o)) {
        if (u.state) throw new i.Z8();
        u.stateDiff = c(o);
      }
      return u;
    }
    function l(e) {
      if (!e) return;
      const t = {};
      for (const {address: n, ...o} of e) {
        if (!(0, s.U)(n, {
          strict: !1
        })) throw new r.b({
          address: n
        });
        if (t[n]) throw new i.Nc({
          address: n
        });
        t[n] = u(o);
      }
      return t;
    }
  },
  31853: function (e, t, n) {
    "use strict";
    n.d(t, {
      P: function () {
        return r;
      }
    });
    const r = (e, t, n) => JSON.stringify(e, (e, n) => {
      const r = "bigint" === typeof n ? n.toString() : n;
      return "function" === typeof t ? t(e, r) : r;
    }, n);
  },
  62077: function (e, t, n) {
    "use strict";
    n.d(t, {
      F: function () {
        return u;
      }
    });
    var r = n(19775);
    const o = 2n ** 256n - 1n;
    var i = n(10052), s = n(78125), a = n(63228), c = n(4012);
    function u(e) {
      const {account: t, gasPrice: n, maxFeePerGas: u, maxPriorityFeePerGas: l, to: d} = e, f = t ? (0, r.T)(t) : void 0;
      if (f && !(0, c.U)(f.address)) throw new i.b({
        address: f.address
      });
      if (d && !(0, c.U)(d)) throw new i.b({
        address: d
      });
      if ("undefined" !== typeof n && ("undefined" !== typeof u || "undefined" !== typeof l)) throw new a.xY();
      if (u && u > o) throw new s.Hh({
        maxFeePerGas: u
      });
      if (l && u && l > u) throw new s.cs({
        maxFeePerGas: u,
        maxPriorityFeePerGas: l
      });
    }
  },
  78217: function (e, t, n) {
    "use strict";
    n.d(t, {
      h: function () {
        return s;
      }
    });
    const r = 256;
    let o, i = r;
    function s(e = 11) {
      if (!o || i + e > 2 * r) {
        (o = "", i = 0);
        for (let e = 0; e < r; e++) o += (256 + 256 * Math.random() | 0).toString(16).substring(1);
      }
      return o.substring(i, i++ + e);
    }
  },
  71282: function (e, t, n) {
    "use strict";
    n.d(t, {
      d: function () {
        return i;
      }
    });
    var r = n(98173), o = n(39502);
    function i(e, t = "wei") {
      return (0, o.b)(e, r.ez[t]);
    }
  },
  29707: function (e, t, n) {
    "use strict";
    n.d(t, {
      o: function () {
        return i;
      }
    });
    var r = n(98173), o = n(39502);
    function i(e, t = "wei") {
      return (0, o.b)(e, r.Zn[t]);
    }
  },
  39502: function (e, t, n) {
    "use strict";
    function r(e, t) {
      let n = e.toString();
      const r = n.startsWith("-");
      (r && (n = n.slice(1)), n = n.padStart(t, "0"));
      let [o, i] = [n.slice(0, n.length - t), n.slice(n.length - t)];
      return (i = i.replace(/(0+)$/, ""), `${r ? "-" : ""}${o || "0"}${i ? `.${i}` : ""}`);
    }
    n.d(t, {
      b: function () {
        return r;
      }
    });
  },
  33457: function (e, t, n) {
    "use strict";
    async function r(e) {
      return new Promise(t => setTimeout(t, e));
    }
    n.d(t, {
      D: function () {
        return r;
      }
    });
  },
  69663: function (e, t, n) {
    "use strict";
    n.d(t, {
      secp256k1: function () {
        return Ne;
      }
    });
    var r = n(68553), o = n(3321), i = n(25884);
    const s = BigInt(0), a = BigInt(1);
    function c(e) {
      return e instanceof Uint8Array || ArrayBuffer.isView(e) && "Uint8Array" === e.constructor.name;
    }
    function u(e) {
      if (!c(e)) throw new Error("Uint8Array expected");
    }
    function l(e, t) {
      if ("boolean" !== typeof t) throw new Error(e + " boolean expected, got " + t);
    }
    function d(e) {
      const t = e.toString(16);
      return 1 & t.length ? "0" + t : t;
    }
    function f(e) {
      if ("string" !== typeof e) throw new Error("hex string expected, got " + typeof e);
      return "" === e ? s : BigInt("0x" + e);
    }
    const h = "function" === typeof Uint8Array.from([]).toHex && "function" === typeof Uint8Array.fromHex, p = Array.from({
      length: 256
    }, (e, t) => t.toString(16).padStart(2, "0"));
    function m(e) {
      if ((u(e), h)) return e.toHex();
      let t = "";
      for (let n = 0; n < e.length; n++) t += p[e[n]];
      return t;
    }
    const b = {
      _0: 48,
      _9: 57,
      A: 65,
      F: 70,
      a: 97,
      f: 102
    };
    function y(e) {
      return e >= b._0 && e <= b._9 ? e - b._0 : e >= b.A && e <= b.F ? e - (b.A - 10) : e >= b.a && e <= b.f ? e - (b.a - 10) : void 0;
    }
    function g(e) {
      if ("string" !== typeof e) throw new Error("hex string expected, got " + typeof e);
      if (h) return Uint8Array.fromHex(e);
      const t = e.length, n = t / 2;
      if (t % 2) throw new Error("hex string expected, got unpadded hex of length " + t);
      const r = new Uint8Array(n);
      for (let o = 0, i = 0; o < n; (o++, i += 2)) {
        const t = y(e.charCodeAt(i)), n = y(e.charCodeAt(i + 1));
        if (void 0 === t || void 0 === n) {
          const t = e[i] + e[i + 1];
          throw new Error("hex string expected, got non-hex character \"" + t + "\" at index " + i);
        }
        r[o] = 16 * t + n;
      }
      return r;
    }
    function w(e) {
      return f(m(e));
    }
    function v(e) {
      return (u(e), f(m(Uint8Array.from(e).reverse())));
    }
    function A(e, t) {
      return g(e.toString(16).padStart(2 * t, "0"));
    }
    function x(e, t) {
      return A(e, t).reverse();
    }
    function C(e, t, n) {
      let r;
      if ("string" === typeof t) try {
        r = g(t);
      } catch (i) {
        throw new Error(e + " must be hex string or Uint8Array, cause: " + i);
      } else {
        if (!c(t)) throw new Error(e + " must be hex string or Uint8Array");
        r = Uint8Array.from(t);
      }
      const o = r.length;
      if ("number" === typeof n && o !== n) throw new Error(e + " of length " + n + " expected, got " + o);
      return r;
    }
    function P(...e) {
      let t = 0;
      for (let r = 0; r < e.length; r++) {
        const n = e[r];
        (u(n), t += n.length);
      }
      const n = new Uint8Array(t);
      for (let r = 0, o = 0; r < e.length; r++) {
        const t = e[r];
        (n.set(t, o), o += t.length);
      }
      return n;
    }
    const E = e => "bigint" === typeof e && s <= e;
    function k(e, t, n) {
      return E(e) && E(t) && E(n) && t <= e && e < n;
    }
    function I(e, t, n, r) {
      if (!k(t, n, r)) throw new Error("expected valid " + e + ": " + n + " <= n < " + r + ", got " + t);
    }
    const B = e => (a << BigInt(e)) - a, S = e => new Uint8Array(e), O = e => Uint8Array.from(e);
    const M = {
      bigint: e => "bigint" === typeof e,
      function: e => "function" === typeof e,
      boolean: e => "boolean" === typeof e,
      string: e => "string" === typeof e,
      stringOrUint8Array: e => "string" === typeof e || c(e),
      isSafeInteger: e => Number.isSafeInteger(e),
      array: e => Array.isArray(e),
      field: (e, t) => t.Fp.isValid(e),
      hash: e => "function" === typeof e && Number.isSafeInteger(e.outputLen)
    };
    function T(e, t, n = {}) {
      const r = (t, n, r) => {
        const o = M[n];
        if ("function" !== typeof o) throw new Error("invalid validator function");
        const i = e[t];
        if ((!r || void 0 !== i) && !o(i, e)) throw new Error("param " + String(t) + " is invalid. Expected " + n + ", got " + i);
      };
      for (const [o, i] of Object.entries(t)) r(o, i, !1);
      for (const [o, i] of Object.entries(n)) r(o, i, !0);
      return e;
    }
    function N(e) {
      const t = new WeakMap();
      return (n, ...r) => {
        const o = t.get(n);
        if (void 0 !== o) return o;
        const i = e(n, ...r);
        return (t.set(n, i), i);
      };
    }
    const R = BigInt(0), F = BigInt(1), j = BigInt(2), U = BigInt(3), D = BigInt(4), L = BigInt(5), z = BigInt(8);
    function q(e, t) {
      const n = e % t;
      return n >= R ? n : t + n;
    }
    function G(e, t, n) {
      let r = e;
      for (; t-- > R; ) (r *= r, r %= n);
      return r;
    }
    function Q(e, t) {
      if (e === R) throw new Error("invert: expected non-zero number");
      if (t <= R) throw new Error("invert: expected positive modulus, got " + t);
      let n = q(e, t), r = t, o = R, i = F, s = F, a = R;
      for (; n !== R; ) {
        const e = r / n, t = r % n, c = o - s * e, u = i - a * e;
        (r = n, n = t, o = s, i = a, s = c, a = u);
      }
      if (r !== F) throw new Error("invert: does not exist");
      return q(o, t);
    }
    function _(e, t) {
      const n = (e.ORDER + F) / D, r = e.pow(t, n);
      if (!e.eql(e.sqr(r), t)) throw new Error("Cannot find square root");
      return r;
    }
    function W(e, t) {
      const n = (e.ORDER - L) / z, r = e.mul(t, j), o = e.pow(r, n), i = e.mul(t, o), s = e.mul(e.mul(i, j), o), a = e.mul(i, e.sub(s, e.ONE));
      if (!e.eql(e.sqr(a), t)) throw new Error("Cannot find square root");
      return a;
    }
    function $(e) {
      return e % D === U ? _ : e % z === L ? W : (function (e) {
        if (e < BigInt(3)) throw new Error("sqrt is not defined for small field");
        let t = e - F, n = 0;
        for (; t % j === R; ) (t /= j, n++);
        let r = j;
        const o = Y(e);
        for (; 1 === J(o, r); ) if (r++ > 1000) throw new Error("Cannot find square root: probably non-prime P");
        if (1 === n) return _;
        let i = o.pow(r, t);
        const s = (t + F) / j;
        return function (e, r) {
          if (e.is0(r)) return r;
          if (1 !== J(e, r)) throw new Error("Cannot find square root");
          let o = n, a = e.mul(e.ONE, i), c = e.pow(r, t), u = e.pow(r, s);
          for (; !e.eql(c, e.ONE); ) {
            if (e.is0(c)) return e.ZERO;
            let t = 1, n = e.sqr(c);
            for (; !e.eql(n, e.ONE); ) if ((t++, n = e.sqr(n), t === o)) throw new Error("Cannot find square root");
            const r = F << BigInt(o - t - 1), i = e.pow(a, r);
            (o = t, a = e.sqr(i), c = e.mul(c, a), u = e.mul(u, i));
          }
          return u;
        };
      })(e);
    }
    const H = ["create", "isValid", "is0", "neg", "inv", "sqrt", "sqr", "eql", "add", "sub", "mul", "pow", "div", "addN", "subN", "mulN", "sqrN"];
    function K(e, t, n) {
      if (n < R) throw new Error("invalid exponent, negatives unsupported");
      if (n === R) return e.ONE;
      if (n === F) return t;
      let r = e.ONE, o = t;
      for (; n > R; ) (n & F && (r = e.mul(r, o)), o = e.sqr(o), n >>= F);
      return r;
    }
    function V(e, t, n = !1) {
      const r = new Array(t.length).fill(n ? e.ZERO : void 0), o = t.reduce((t, n, o) => e.is0(n) ? t : (r[o] = t, e.mul(t, n)), e.ONE), i = e.inv(o);
      return (t.reduceRight((t, n, o) => e.is0(n) ? t : (r[o] = e.mul(t, r[o]), e.mul(t, n)), i), r);
    }
    function J(e, t) {
      const n = (e.ORDER - F) / j, r = e.pow(t, n), o = e.eql(r, e.ONE), i = e.eql(r, e.ZERO), s = e.eql(r, e.neg(e.ONE));
      if (!o && !i && !s) throw new Error("invalid Legendre symbol result");
      return o ? 1 : i ? 0 : -1;
    }
    function Z(e, t) {
      void 0 !== t && (0, i.k8)(t);
      const n = void 0 !== t ? t : e.toString(2).length;
      return {
        nBitLength: n,
        nByteLength: Math.ceil(n / 8)
      };
    }
    function Y(e, t, n = !1, r = {}) {
      if (e <= R) throw new Error("invalid field: expected ORDER > 0, got " + e);
      const {nBitLength: o, nByteLength: i} = Z(e, t);
      if (i > 2048) throw new Error("invalid field: expected ORDER of <= 2048 bytes");
      let s;
      const a = Object.freeze({
        ORDER: e,
        isLE: n,
        BITS: o,
        BYTES: i,
        MASK: B(o),
        ZERO: R,
        ONE: F,
        create: t => q(t, e),
        isValid: t => {
          if ("bigint" !== typeof t) throw new Error("invalid field element: expected bigint, got " + typeof t);
          return R <= t && t < e;
        },
        is0: e => e === R,
        isOdd: e => (e & F) === F,
        neg: t => q(-t, e),
        eql: (e, t) => e === t,
        sqr: t => q(t * t, e),
        add: (t, n) => q(t + n, e),
        sub: (t, n) => q(t - n, e),
        mul: (t, n) => q(t * n, e),
        pow: (e, t) => K(a, e, t),
        div: (t, n) => q(t * Q(n, e), e),
        sqrN: e => e * e,
        addN: (e, t) => e + t,
        subN: (e, t) => e - t,
        mulN: (e, t) => e * t,
        inv: t => Q(t, e),
        sqrt: r.sqrt || (t => (s || (s = $(e)), s(a, t))),
        toBytes: e => n ? x(e, i) : A(e, i),
        fromBytes: e => {
          if (e.length !== i) throw new Error("Field.fromBytes: expected " + i + " bytes, got " + e.length);
          return n ? v(e) : w(e);
        },
        invertBatch: e => V(a, e),
        cmov: (e, t, n) => n ? t : e
      });
      return Object.freeze(a);
    }
    function X(e) {
      if ("bigint" !== typeof e) throw new Error("field order must be bigint");
      const t = e.toString(2).length;
      return Math.ceil(t / 8);
    }
    function ee(e) {
      const t = X(e);
      return t + Math.ceil(t / 2);
    }
    const te = BigInt(0), ne = BigInt(1);
    function re(e, t) {
      const n = t.negate();
      return e ? n : t;
    }
    function oe(e, t) {
      if (!Number.isSafeInteger(e) || e <= 0 || e > t) throw new Error("invalid window size, expected [1.." + t + "], got W=" + e);
    }
    function ie(e, t) {
      oe(e, t);
      const n = 2 ** e;
      return {
        windows: Math.ceil(t / e) + 1,
        windowSize: 2 ** (e - 1),
        mask: B(e),
        maxNumber: n,
        shiftBy: BigInt(e)
      };
    }
    function se(e, t, n) {
      const {windowSize: r, mask: o, maxNumber: i, shiftBy: s} = n;
      let a = Number(e & o), c = e >> s;
      a > r && (a -= i, c += ne);
      const u = t * r;
      return {
        nextN: c,
        offset: u + Math.abs(a) - 1,
        isZero: 0 === a,
        isNeg: a < 0,
        isNegF: t % 2 !== 0,
        offsetF: u
      };
    }
    function ae(e, t) {
      if (!Array.isArray(e)) throw new Error("array expected");
      e.forEach((e, n) => {
        if (!(e instanceof t)) throw new Error("invalid point at index " + n);
      });
    }
    function ce(e, t) {
      if (!Array.isArray(e)) throw new Error("array of scalars expected");
      e.forEach((e, n) => {
        if (!t.isValid(e)) throw new Error("invalid scalar at index " + n);
      });
    }
    const ue = new WeakMap(), le = new WeakMap();
    function de(e) {
      return le.get(e) || 1;
    }
    function fe(e, t, n, r) {
      (ae(n, e), ce(r, t));
      const o = n.length, i = r.length;
      if (o !== i) throw new Error("arrays of points and scalars must have equal length");
      const c = e.ZERO, u = (function (e) {
        let t;
        for (t = 0; e > s; (e >>= a, t += 1)) ;
        return t;
      })(BigInt(o));
      let l = 1;
      u > 12 ? l = u - 3 : u > 4 ? l = u - 2 : u > 0 && (l = 2);
      const d = B(l), f = new Array(Number(d) + 1).fill(c);
      let h = c;
      for (let s = Math.floor((t.BITS - 1) / l) * l; s >= 0; s -= l) {
        f.fill(c);
        for (let t = 0; t < i; t++) {
          const e = r[t], o = Number(e >> BigInt(s) & d);
          f[o] = f[o].add(n[t]);
        }
        let e = c;
        for (let t = f.length - 1, n = c; t > 0; t--) (n = n.add(f[t]), e = e.add(n));
        if ((h = h.add(e), 0 !== s)) for (let t = 0; t < l; t++) h = h.double();
      }
      return h;
    }
    function he(e) {
      return (T(e.Fp, H.reduce((e, t) => (e[t] = "function", e), {
        ORDER: "bigint",
        MASK: "bigint",
        BYTES: "isSafeInteger",
        BITS: "isSafeInteger"
      })), T(e, {
        n: "bigint",
        h: "bigint",
        Gx: "field",
        Gy: "field"
      }, {
        nBitLength: "isSafeInteger",
        nByteLength: "isSafeInteger"
      }), Object.freeze({
        ...Z(e.n, e.nBitLength),
        ...e,
        p: e.Fp.ORDER
      }));
    }
    function pe(e) {
      (void 0 !== e.lowS && l("lowS", e.lowS), void 0 !== e.prehash && l("prehash", e.prehash));
    }
    class me extends Error {
      constructor(e = "") {
        super(e);
      }
    }
    const be = {
      Err: me,
      _tlv: {
        encode: (e, t) => {
          const {Err: n} = be;
          if (e < 0 || e > 256) throw new n("tlv.encode: wrong tag");
          if (1 & t.length) throw new n("tlv.encode: unpadded data");
          const r = t.length / 2, o = d(r);
          if (o.length / 2 & 128) throw new n("tlv.encode: long form length too big");
          const i = r > 127 ? d(o.length / 2 | 128) : "";
          return d(e) + i + o + t;
        },
        decode(e, t) {
          const {Err: n} = be;
          let r = 0;
          if (e < 0 || e > 256) throw new n("tlv.encode: wrong tag");
          if (t.length < 2 || t[r++] !== e) throw new n("tlv.decode: wrong tlv");
          const o = t[r++];
          let i = 0;
          if (!!(128 & o)) {
            const e = 127 & o;
            if (!e) throw new n("tlv.decode(long): indefinite length not supported");
            if (e > 4) throw new n("tlv.decode(long): byte length is too big");
            const s = t.subarray(r, r + e);
            if (s.length !== e) throw new n("tlv.decode: length bytes not complete");
            if (0 === s[0]) throw new n("tlv.decode(long): zero leftmost byte");
            for (const t of s) i = i << 8 | t;
            if ((r += e, i < 128)) throw new n("tlv.decode(long): not minimal encoding");
          } else i = o;
          const s = t.subarray(r, r + i);
          if (s.length !== i) throw new n("tlv.decode: wrong value length");
          return {
            v: s,
            l: t.subarray(r + i)
          };
        }
      },
      _int: {
        encode(e) {
          const {Err: t} = be;
          if (e < ge) throw new t("integer: negative integers are not allowed");
          let n = d(e);
          if ((8 & Number.parseInt(n[0], 16) && (n = "00" + n), 1 & n.length)) throw new t("unexpected DER parsing assertion: unpadded hex");
          return n;
        },
        decode(e) {
          const {Err: t} = be;
          if (128 & e[0]) throw new t("invalid signature integer: negative");
          if (0 === e[0] && !(128 & e[1])) throw new t("invalid signature integer: unnecessary leading zero");
          return w(e);
        }
      },
      toSig(e) {
        const {Err: t, _int: n, _tlv: r} = be, o = C("signature", e), {v: i, l: s} = r.decode(48, o);
        if (s.length) throw new t("invalid signature: left bytes after parsing");
        const {v: a, l: c} = r.decode(2, i), {v: u, l: l} = r.decode(2, c);
        if (l.length) throw new t("invalid signature: left bytes after parsing");
        return {
          r: n.decode(a),
          s: n.decode(u)
        };
      },
      hexFromSig(e) {
        const {_tlv: t, _int: n} = be, r = t.encode(2, n.encode(e.r)) + t.encode(2, n.encode(e.s));
        return t.encode(48, r);
      }
    };
    function ye(e, t) {
      return m(A(e, t));
    }
    const ge = BigInt(0), we = BigInt(1), ve = (BigInt(2), BigInt(3)), Ae = BigInt(4);
    function xe(e) {
      const t = (function (e) {
        const t = he(e);
        T(t, {
          a: "field",
          b: "field"
        }, {
          allowInfinityPoint: "boolean",
          allowedPrivateKeyLengths: "array",
          clearCofactor: "function",
          fromBytes: "function",
          isTorsionFree: "function",
          toBytes: "function",
          wrapPrivateKey: "boolean"
        });
        const {endo: n, Fp: r, a: o} = t;
        if (n) {
          if (!r.eql(o, r.ZERO)) throw new Error("invalid endo: CURVE.a must be 0");
          if ("object" !== typeof n || "bigint" !== typeof n.beta || "function" !== typeof n.splitScalar) throw new Error("invalid endo: expected \"beta\": bigint and \"splitScalar\": function");
        }
        return Object.freeze({
          ...t
        });
      })(e), {Fp: n} = t, r = Y(t.n, t.nBitLength), o = t.toBytes || ((e, t, r) => {
        const o = t.toAffine();
        return P(Uint8Array.from([4]), n.toBytes(o.x), n.toBytes(o.y));
      }), i = t.fromBytes || (e => {
        const t = e.subarray(1);
        return {
          x: n.fromBytes(t.subarray(0, n.BYTES)),
          y: n.fromBytes(t.subarray(n.BYTES, 2 * n.BYTES))
        };
      });
      function s(e) {
        const {a: r, b: o} = t, i = n.sqr(e), s = n.mul(i, e);
        return n.add(n.add(s, n.mul(e, r)), o);
      }
      function a(e, t) {
        const r = n.sqr(t), o = s(e);
        return n.eql(r, o);
      }
      if (!a(t.Gx, t.Gy)) throw new Error("bad curve params: generator point");
      const u = n.mul(n.pow(t.a, ve), Ae), d = n.mul(n.sqr(t.b), BigInt(27));
      if (n.is0(n.add(u, d))) throw new Error("bad curve params: a or b");
      function f(e) {
        const {allowedPrivateKeyLengths: n, nByteLength: r, wrapPrivateKey: o, n: i} = t;
        if (n && "bigint" !== typeof e) {
          if ((c(e) && (e = m(e)), "string" !== typeof e || !n.includes(e.length))) throw new Error("invalid private key");
          e = e.padStart(2 * r, "0");
        }
        let s;
        try {
          s = "bigint" === typeof e ? e : w(C("private key", e, r));
        } catch (a) {
          throw new Error("invalid private key, expected hex or " + r + " bytes, got " + typeof e);
        }
        return (o && (s = q(s, i)), I("private key", s, we, i), s);
      }
      function h(e) {
        if (!(e instanceof y)) throw new Error("ProjectivePoint expected");
      }
      const p = N((e, t) => {
        const {px: r, py: o, pz: i} = e;
        if (n.eql(i, n.ONE)) return {
          x: r,
          y: o
        };
        const s = e.is0();
        null == t && (t = s ? n.ONE : n.inv(i));
        const a = n.mul(r, t), c = n.mul(o, t), u = n.mul(i, t);
        if (s) return {
          x: n.ZERO,
          y: n.ZERO
        };
        if (!n.eql(u, n.ONE)) throw new Error("invZ was invalid");
        return {
          x: a,
          y: c
        };
      }), b = N(e => {
        if (e.is0()) {
          if (t.allowInfinityPoint && !n.is0(e.py)) return;
          throw new Error("bad point: ZERO");
        }
        const {x: r, y: o} = e.toAffine();
        if (!n.isValid(r) || !n.isValid(o)) throw new Error("bad point: x or y not FE");
        if (!a(r, o)) throw new Error("bad point: equation left != right");
        if (!e.isTorsionFree()) throw new Error("bad point: not in prime-order subgroup");
        return !0;
      });
      class y {
        constructor(e, t, r) {
          if (null == e || !n.isValid(e)) throw new Error("x required");
          if (null == t || !n.isValid(t) || n.is0(t)) throw new Error("y required");
          if (null == r || !n.isValid(r)) throw new Error("z required");
          (this.px = e, this.py = t, this.pz = r, Object.freeze(this));
        }
        static fromAffine(e) {
          const {x: t, y: r} = e || ({});
          if (!e || !n.isValid(t) || !n.isValid(r)) throw new Error("invalid affine point");
          if (e instanceof y) throw new Error("projective point not allowed");
          const o = e => n.eql(e, n.ZERO);
          return o(t) && o(r) ? y.ZERO : new y(t, r, n.ONE);
        }
        get x() {
          return this.toAffine().x;
        }
        get y() {
          return this.toAffine().y;
        }
        static normalizeZ(e) {
          const t = V(n, e.map(e => e.pz));
          return e.map((e, n) => e.toAffine(t[n])).map(y.fromAffine);
        }
        static fromHex(e) {
          const t = y.fromAffine(i(C("pointHex", e)));
          return (t.assertValidity(), t);
        }
        static fromPrivateKey(e) {
          return y.BASE.multiply(f(e));
        }
        static msm(e, t) {
          return fe(y, r, e, t);
        }
        _setWindowSize(e) {
          A.setWindowSize(this, e);
        }
        assertValidity() {
          b(this);
        }
        hasEvenY() {
          const {y: e} = this.toAffine();
          if (n.isOdd) return !n.isOdd(e);
          throw new Error("Field doesn't support isOdd");
        }
        equals(e) {
          h(e);
          const {px: t, py: r, pz: o} = this, {px: i, py: s, pz: a} = e, c = n.eql(n.mul(t, a), n.mul(i, o)), u = n.eql(n.mul(r, a), n.mul(s, o));
          return c && u;
        }
        negate() {
          return new y(this.px, n.neg(this.py), this.pz);
        }
        double() {
          const {a: e, b: r} = t, o = n.mul(r, ve), {px: i, py: s, pz: a} = this;
          let c = n.ZERO, u = n.ZERO, l = n.ZERO, d = n.mul(i, i), f = n.mul(s, s), h = n.mul(a, a), p = n.mul(i, s);
          return (p = n.add(p, p), l = n.mul(i, a), l = n.add(l, l), c = n.mul(e, l), u = n.mul(o, h), u = n.add(c, u), c = n.sub(f, u), u = n.add(f, u), u = n.mul(c, u), c = n.mul(p, c), l = n.mul(o, l), h = n.mul(e, h), p = n.sub(d, h), p = n.mul(e, p), p = n.add(p, l), l = n.add(d, d), d = n.add(l, d), d = n.add(d, h), d = n.mul(d, p), u = n.add(u, d), h = n.mul(s, a), h = n.add(h, h), d = n.mul(h, p), c = n.sub(c, d), l = n.mul(h, f), l = n.add(l, l), l = n.add(l, l), new y(c, u, l));
        }
        add(e) {
          h(e);
          const {px: r, py: o, pz: i} = this, {px: s, py: a, pz: c} = e;
          let u = n.ZERO, l = n.ZERO, d = n.ZERO;
          const f = t.a, p = n.mul(t.b, ve);
          let m = n.mul(r, s), b = n.mul(o, a), g = n.mul(i, c), w = n.add(r, o), v = n.add(s, a);
          (w = n.mul(w, v), v = n.add(m, b), w = n.sub(w, v), v = n.add(r, i));
          let A = n.add(s, c);
          return (v = n.mul(v, A), A = n.add(m, g), v = n.sub(v, A), A = n.add(o, i), u = n.add(a, c), A = n.mul(A, u), u = n.add(b, g), A = n.sub(A, u), d = n.mul(f, v), u = n.mul(p, g), d = n.add(u, d), u = n.sub(b, d), d = n.add(b, d), l = n.mul(u, d), b = n.add(m, m), b = n.add(b, m), g = n.mul(f, g), v = n.mul(p, v), b = n.add(b, g), g = n.sub(m, g), g = n.mul(f, g), v = n.add(v, g), m = n.mul(b, v), l = n.add(l, m), m = n.mul(A, v), u = n.mul(w, u), u = n.sub(u, m), m = n.mul(w, b), d = n.mul(A, d), d = n.add(d, m), new y(u, l, d));
        }
        subtract(e) {
          return this.add(e.negate());
        }
        is0() {
          return this.equals(y.ZERO);
        }
        wNAF(e) {
          return A.wNAFCached(this, e, y.normalizeZ);
        }
        multiplyUnsafe(e) {
          const {endo: r, n: o} = t;
          I("scalar", e, ge, o);
          const i = y.ZERO;
          if (e === ge) return i;
          if (this.is0() || e === we) return this;
          if (!r || A.hasPrecomputes(this)) return A.wNAFCachedUnsafe(this, e, y.normalizeZ);
          let {k1neg: s, k1: a, k2neg: c, k2: u} = r.splitScalar(e), l = i, d = i, f = this;
          for (; a > ge || u > ge; ) (a & we && (l = l.add(f)), u & we && (d = d.add(f)), f = f.double(), a >>= we, u >>= we);
          return (s && (l = l.negate()), c && (d = d.negate()), d = new y(n.mul(d.px, r.beta), d.py, d.pz), l.add(d));
        }
        multiply(e) {
          const {endo: r, n: o} = t;
          let i, s;
          if ((I("scalar", e, we, o), r)) {
            const {k1neg: t, k1: o, k2neg: a, k2: c} = r.splitScalar(e);
            let {p: u, f: l} = this.wNAF(o), {p: d, f: f} = this.wNAF(c);
            (u = A.constTimeNegate(t, u), d = A.constTimeNegate(a, d), d = new y(n.mul(d.px, r.beta), d.py, d.pz), i = u.add(d), s = l.add(f));
          } else {
            const {p: t, f: n} = this.wNAF(e);
            (i = t, s = n);
          }
          return y.normalizeZ([i, s])[0];
        }
        multiplyAndAddUnsafe(e, t, n) {
          const r = y.BASE, o = (e, t) => t !== ge && t !== we && e.equals(r) ? e.multiply(t) : e.multiplyUnsafe(t), i = o(this, t).add(o(e, n));
          return i.is0() ? void 0 : i;
        }
        toAffine(e) {
          return p(this, e);
        }
        isTorsionFree() {
          const {h: e, isTorsionFree: n} = t;
          if (e === we) return !0;
          if (n) return n(y, this);
          throw new Error("isTorsionFree() has not been declared for the elliptic curve");
        }
        clearCofactor() {
          const {h: e, clearCofactor: n} = t;
          return e === we ? this : n ? n(y, this) : this.multiplyUnsafe(t.h);
        }
        toRawBytes(e = !0) {
          return (l("isCompressed", e), this.assertValidity(), o(y, this, e));
        }
        toHex(e = !0) {
          return (l("isCompressed", e), m(this.toRawBytes(e)));
        }
      }
      (y.BASE = new y(t.Gx, t.Gy, n.ONE), y.ZERO = new y(n.ZERO, n.ONE, n.ZERO));
      const {endo: g, nBitLength: v} = t, A = (x = y, E = g ? Math.ceil(v / 2) : v, {
        constTimeNegate: re,
        hasPrecomputes: e => 1 !== de(e),
        unsafeLadder(e, t, n = x.ZERO) {
          let r = e;
          for (; t > te; ) (t & ne && (n = n.add(r)), r = r.double(), t >>= ne);
          return n;
        },
        precomputeWindow(e, t) {
          const {windows: n, windowSize: r} = ie(t, E), o = [];
          let i = e, s = i;
          for (let a = 0; a < n; a++) {
            (s = i, o.push(s));
            for (let e = 1; e < r; e++) (s = s.add(i), o.push(s));
            i = s.double();
          }
          return o;
        },
        wNAF(e, t, n) {
          let r = x.ZERO, o = x.BASE;
          const i = ie(e, E);
          for (let s = 0; s < i.windows; s++) {
            const {nextN: e, offset: a, isZero: c, isNeg: u, isNegF: l, offsetF: d} = se(n, s, i);
            (n = e, c ? o = o.add(re(l, t[d])) : r = r.add(re(u, t[a])));
          }
          return {
            p: r,
            f: o
          };
        },
        wNAFUnsafe(e, t, n, r = x.ZERO) {
          const o = ie(e, E);
          for (let i = 0; i < o.windows && n !== te; i++) {
            const {nextN: e, offset: s, isZero: a, isNeg: c} = se(n, i, o);
            if ((n = e, !a)) {
              const e = t[s];
              r = r.add(c ? e.negate() : e);
            }
          }
          return r;
        },
        getPrecomputes(e, t, n) {
          let r = ue.get(t);
          return (r || (r = this.precomputeWindow(t, e), 1 !== e && ue.set(t, n(r))), r);
        },
        wNAFCached(e, t, n) {
          const r = de(e);
          return this.wNAF(r, this.getPrecomputes(r, e, n), t);
        },
        wNAFCachedUnsafe(e, t, n, r) {
          const o = de(e);
          return 1 === o ? this.unsafeLadder(e, t, r) : this.wNAFUnsafe(o, this.getPrecomputes(o, e, n), t, r);
        },
        setWindowSize(e, t) {
          (oe(t, E), le.set(e, t), ue.delete(e));
        }
      });
      var x, E;
      return {
        CURVE: t,
        ProjectivePoint: y,
        normPrivateKeyToScalar: f,
        weierstrassEquation: s,
        isWithinCurveOrder: function (e) {
          return k(e, we, t.n);
        }
      };
    }
    function Ce(e) {
      const t = (function (e) {
        const t = he(e);
        return (T(t, {
          hash: "hash",
          hmac: "function",
          randomBytes: "function"
        }, {
          bits2int: "function",
          bits2int_modN: "function",
          lowS: "boolean"
        }), Object.freeze({
          lowS: !0,
          ...t
        }));
      })(e), {Fp: n, n: r, nByteLength: o, nBitLength: i} = t, s = n.BYTES + 1, a = 2 * n.BYTES + 1;
      function u(e) {
        return q(e, r);
      }
      function d(e) {
        return Q(e, r);
      }
      const {ProjectivePoint: f, normPrivateKeyToScalar: h, weierstrassEquation: p, isWithinCurveOrder: m} = xe({
        ...t,
        toBytes(e, t, r) {
          const o = t.toAffine(), i = n.toBytes(o.x), s = P;
          return (l("isCompressed", r), r ? s(Uint8Array.from([t.hasEvenY() ? 2 : 3]), i) : s(Uint8Array.from([4]), i, n.toBytes(o.y)));
        },
        fromBytes(e) {
          const t = e.length, r = e[0], o = e.subarray(1);
          if (t !== s || 2 !== r && 3 !== r) {
            if (t === a && 4 === r) {
              return {
                x: n.fromBytes(o.subarray(0, n.BYTES)),
                y: n.fromBytes(o.subarray(n.BYTES, 2 * n.BYTES))
              };
            }
            throw new Error("invalid Point, expected length of " + s + ", or uncompressed " + a + ", got " + t);
          }
          {
            const e = w(o);
            if (!k(e, we, n.ORDER)) throw new Error("Point is not on curve");
            const t = p(e);
            let s;
            try {
              s = n.sqrt(t);
            } catch (i) {
              const e = i instanceof Error ? ": " + i.message : "";
              throw new Error("Point is not on curve" + e);
            }
            return (1 === (1 & r) !== ((s & we) === we) && (s = n.neg(s)), {
              x: e,
              y: s
            });
          }
        }
      });
      function b(e) {
        return e > r >> we;
      }
      const y = (e, t, n) => w(e.slice(t, n));
      class E {
        constructor(e, t, n) {
          (I("r", e, we, r), I("s", t, we, r), this.r = e, this.s = t, null != n && (this.recovery = n), Object.freeze(this));
        }
        static fromCompact(e) {
          const t = o;
          return (e = C("compactSignature", e, 2 * t), new E(y(e, 0, t), y(e, t, 2 * t)));
        }
        static fromDER(e) {
          const {r: t, s: n} = be.toSig(C("DER", e));
          return new E(t, n);
        }
        assertValidity() {}
        addRecoveryBit(e) {
          return new E(this.r, this.s, e);
        }
        recoverPublicKey(e) {
          const {r: r, s: o, recovery: i} = this, s = j(C("msgHash", e));
          if (null == i || ![0, 1, 2, 3].includes(i)) throw new Error("recovery id invalid");
          const a = 2 === i || 3 === i ? r + t.n : r;
          if (a >= n.ORDER) throw new Error("recovery id 2 or 3 invalid");
          const c = 0 === (1 & i) ? "02" : "03", l = f.fromHex(c + ye(a, n.BYTES)), h = d(a), p = u(-s * h), m = u(o * h), b = f.BASE.multiplyAndAddUnsafe(l, p, m);
          if (!b) throw new Error("point at infinify");
          return (b.assertValidity(), b);
        }
        hasHighS() {
          return b(this.s);
        }
        normalizeS() {
          return this.hasHighS() ? new E(this.r, u(-this.s), this.recovery) : this;
        }
        toDERRawBytes() {
          return g(this.toDERHex());
        }
        toDERHex() {
          return be.hexFromSig(this);
        }
        toCompactRawBytes() {
          return g(this.toCompactHex());
        }
        toCompactHex() {
          const e = o;
          return ye(this.r, e) + ye(this.s, e);
        }
      }
      const M = {
        isValidPrivateKey(e) {
          try {
            return (h(e), !0);
          } catch (t) {
            return !1;
          }
        },
        normPrivateKeyToScalar: h,
        randomPrivateKey: () => {
          const e = ee(t.n);
          return (function (e, t, n = !1) {
            const r = e.length, o = X(t), i = ee(t);
            if (r < 16 || r < i || r > 1024) throw new Error("expected " + i + "-1024 bytes of input, got " + r);
            const s = q(n ? v(e) : w(e), t - F) + F;
            return n ? x(s, o) : A(s, o);
          })(t.randomBytes(e), t.n);
        },
        precompute: (e = 8, t = f.BASE) => (t._setWindowSize(e), t.multiply(BigInt(3)), t)
      };
      function N(e) {
        if ("bigint" === typeof e) return !1;
        if (e instanceof f) return !0;
        const r = C("key", e).length, i = n.BYTES, s = i + 1, a = 2 * i + 1;
        return t.allowedPrivateKeyLengths || o === s ? void 0 : r === s || r === a;
      }
      const R = t.bits2int || (function (e) {
        if (e.length > 8192) throw new Error("input is too large");
        const t = w(e), n = 8 * e.length - i;
        return n > 0 ? t >> BigInt(n) : t;
      }), j = t.bits2int_modN || (function (e) {
        return u(R(e));
      }), U = B(i);
      function D(e) {
        return (I("num < 2^" + i, e, ge, U), A(e, o));
      }
      function L(e, r, o = z) {
        if (["recovered", "canonical"].some(e => (e in o))) throw new Error("sign() legacy options not supported");
        const {hash: i, randomBytes: s} = t;
        let {lowS: a, prehash: c, extraEntropy: l} = o;
        (null == a && (a = !0), e = C("msgHash", e), pe(o), c && (e = C("prehashed msgHash", i(e))));
        const p = j(e), y = h(r), g = [D(y), D(p)];
        if (null != l && !1 !== l) {
          const e = !0 === l ? s(n.BYTES) : l;
          g.push(C("extraEntropy", e));
        }
        const w = P(...g), v = p;
        return {
          seed: w,
          k2sig: function (e) {
            const t = R(e);
            if (!m(t)) return;
            const n = d(t), r = f.BASE.multiply(t).toAffine(), o = u(r.x);
            if (o === ge) return;
            const i = u(n * u(v + o * y));
            if (i === ge) return;
            let s = (r.x === o ? 0 : 2) | Number(r.y & we), c = i;
            return (a && b(i) && (c = (function (e) {
              return b(e) ? u(-e) : e;
            })(i), s ^= 1), new E(o, c, s));
          }
        };
      }
      const z = {
        lowS: t.lowS,
        prehash: !1
      }, G = {
        lowS: t.lowS,
        prehash: !1
      };
      return (f.BASE._setWindowSize(8), {
        CURVE: t,
        getPublicKey: function (e, t = !0) {
          return f.fromPrivateKey(e).toRawBytes(t);
        },
        getSharedSecret: function (e, t, n = !0) {
          if (!0 === N(e)) throw new Error("first arg must be private key");
          if (!1 === N(t)) throw new Error("second arg must be public key");
          return f.fromHex(t).multiply(h(e)).toRawBytes(n);
        },
        sign: function (e, n, r = z) {
          const {seed: o, k2sig: i} = L(e, n, r), s = t;
          return (function (e, t, n) {
            if ("number" !== typeof e || e < 2) throw new Error("hashLen must be a number");
            if ("number" !== typeof t || t < 2) throw new Error("qByteLen must be a number");
            if ("function" !== typeof n) throw new Error("hmacFn must be a function");
            let r = S(e), o = S(e), i = 0;
            const s = () => {
              (r.fill(1), o.fill(0), i = 0);
            }, a = (...e) => n(o, r, ...e), c = (e = S(0)) => {
              (o = a(O([0]), e), r = a(), 0 !== e.length && (o = a(O([1]), e), r = a()));
            }, u = () => {
              if (i++ >= 1000) throw new Error("drbg: tried 1000 values");
              let e = 0;
              const n = [];
              for (; e < t; ) {
                r = a();
                const t = r.slice();
                (n.push(t), e += r.length);
              }
              return P(...n);
            };
            return (e, t) => {
              let n;
              for ((s(), c(e)); !(n = t(u())); ) c();
              return (s(), n);
            };
          })(s.hash.outputLen, s.nByteLength, s.hmac)(o, i);
        },
        verify: function (e, n, r, o = G) {
          const i = e;
          (n = C("msgHash", n), r = C("publicKey", r));
          const {lowS: s, prehash: a, format: l} = o;
          if ((pe(o), ("strict" in o))) throw new Error("options.strict was renamed to lowS");
          if (void 0 !== l && "compact" !== l && "der" !== l) throw new Error("format must be compact or der");
          const h = "string" === typeof i || c(i), p = !h && !l && "object" === typeof i && null !== i && "bigint" === typeof i.r && "bigint" === typeof i.s;
          if (!h && !p) throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");
          let m, b;
          try {
            if ((p && (m = new E(i.r, i.s)), h)) {
              try {
                "compact" !== l && (m = E.fromDER(i));
              } catch (k) {
                if (!(k instanceof be.Err)) throw k;
              }
              m || "der" === l || (m = E.fromCompact(i));
            }
            b = f.fromHex(r);
          } catch (I) {
            return !1;
          }
          if (!m) return !1;
          if (s && m.hasHighS()) return !1;
          a && (n = t.hash(n));
          const {r: y, s: g} = m, w = j(n), v = d(g), A = u(w * v), x = u(y * v), P = f.BASE.multiplyAndAddUnsafe(b, A, x)?.toAffine();
          return !!P && u(P.x) === y;
        },
        ProjectivePoint: f,
        Signature: E,
        utils: M
      });
    }
    function Pe(e) {
      return {
        hash: e,
        hmac: (t, ...n) => (0, o.b)(e, t, (0, i.eV)(...n)),
        randomBytes: i.O6
      };
    }
    const Ee = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), ke = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), Ie = BigInt(0), Be = BigInt(1), Se = BigInt(2), Oe = (e, t) => (e + t / Se) / t;
    function Me(e) {
      const t = Ee, n = BigInt(3), r = BigInt(6), o = BigInt(11), i = BigInt(22), s = BigInt(23), a = BigInt(44), c = BigInt(88), u = e * e * e % t, l = u * u * e % t, d = G(l, n, t) * l % t, f = G(d, n, t) * l % t, h = G(f, Se, t) * u % t, p = G(h, o, t) * h % t, m = G(p, i, t) * p % t, b = G(m, a, t) * m % t, y = G(b, c, t) * b % t, g = G(y, a, t) * m % t, w = G(g, n, t) * l % t, v = G(w, s, t) * p % t, A = G(v, r, t) * u % t, x = G(A, Se, t);
      if (!Te.eql(Te.sqr(x), e)) throw new Error("Cannot find square root");
      return x;
    }
    const Te = Y(Ee, void 0, void 0, {
      sqrt: Me
    }), Ne = (function (e, t) {
      const n = t => Ce({
        ...e,
        ...Pe(t)
      });
      return {
        ...n(t),
        create: n
      };
    })({
      a: Ie,
      b: BigInt(7),
      Fp: Te,
      n: ke,
      Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
      Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
      h: BigInt(1),
      lowS: !0,
      endo: {
        beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
        splitScalar: e => {
          const t = ke, n = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), r = -Be * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), o = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), i = n, s = BigInt("0x100000000000000000000000000000000"), a = Oe(i * e, t), c = Oe(-r * e, t);
          let u = q(e - a * n - c * o, t), l = q(-a * r - c * i, t);
          const d = u > s, f = l > s;
          if ((d && (u = t - u), f && (l = t - l), u > s || l > s)) throw new Error("splitScalar: Endomorphism failed, k=" + e);
          return {
            k1neg: d,
            k1: u,
            k2neg: f,
            k2: l
          };
        }
      }
    }, r.JQ);
  },
  43052: function (e, t, n) {
    "use strict";
    n.d(t, {
      V: function () {
        return L;
      }
    });
    var r = n(62619);
    const o = /^error (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
    const i = /^event (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
    const s = /^function (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)(?: (?<scope>external|public{1}))?(?: (?<stateMutability>pure|view|nonpayable|payable{1}))?(?: returns\s?\((?<returns>.*?)\))?$/;
    const a = /^struct (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*) \{(?<properties>.*?)\}$/;
    function c(e) {
      return a.test(e);
    }
    function u(e) {
      return (0, r.Zw)(a, e);
    }
    const l = /^constructor\((?<parameters>.*?)\)(?:\s(?<stateMutability>payable{1}))?$/;
    const d = /^fallback\(\) external(?:\s(?<stateMutability>payable{1}))?$/;
    const f = /^receive\(\) external payable$/;
    new Set(["memory", "indexed", "storage", "calldata"]);
    const h = new Set(["indexed"]), p = new Set(["calldata", "memory", "storage"]);
    class m extends Error {
      constructor(e, t = {}) {
        const n = t.cause instanceof m ? t.cause.details : t.cause?.message ? t.cause.message : t.details, r = t.cause instanceof m && t.cause.docsPath || t.docsPath;
        (super([e || "An error occurred.", "", ...t.metaMessages ? [...t.metaMessages, ""] : [], ...r ? [`Docs: https://abitype.dev${r}`] : [], ...n ? [`Details: ${n}`] : [], "Version: abitype@1.1.0"].join("\n")), Object.defineProperty(this, "details", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), Object.defineProperty(this, "docsPath", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), Object.defineProperty(this, "metaMessages", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), Object.defineProperty(this, "shortMessage", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "AbiTypeError"
        }), t.cause && (this.cause = t.cause), this.details = n, this.docsPath = r, this.metaMessages = t.metaMessages, this.shortMessage = e);
      }
    }
    class b extends m {
      constructor({type: e}) {
        (super("Unknown type.", {
          metaMessages: [`Type "${e}" is not a valid ABI type. Perhaps you forgot to include a struct signature?`]
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "UnknownTypeError"
        }));
      }
    }
    class y extends m {
      constructor({type: e}) {
        (super("Unknown type.", {
          metaMessages: [`Type "${e}" is not a valid ABI type.`]
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "UnknownSolidityTypeError"
        }));
      }
    }
    class g extends m {
      constructor({param: e}) {
        (super("Invalid ABI parameter.", {
          details: e
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "InvalidParameterError"
        }));
      }
    }
    class w extends m {
      constructor({param: e, name: t}) {
        (super("Invalid ABI parameter.", {
          details: e,
          metaMessages: [`"${t}" is a protected Solidity keyword. More info: https://docs.soliditylang.org/en/latest/cheatsheet.html`]
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "SolidityProtectedKeywordError"
        }));
      }
    }
    class v extends m {
      constructor({param: e, type: t, modifier: n}) {
        (super("Invalid ABI parameter.", {
          details: e,
          metaMessages: [`Modifier "${n}" not allowed${t ? ` in "${t}" type` : ""}.`]
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "InvalidModifierError"
        }));
      }
    }
    class A extends m {
      constructor({param: e, type: t, modifier: n}) {
        (super("Invalid ABI parameter.", {
          details: e,
          metaMessages: [`Modifier "${n}" not allowed${t ? ` in "${t}" type` : ""}.`, `Data location can only be specified for array, struct, or mapping types, but "${n}" was given.`]
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "InvalidFunctionModifierError"
        }));
      }
    }
    class x extends m {
      constructor({abiParameter: e}) {
        (super("Invalid ABI parameter.", {
          details: JSON.stringify(e, null, 2),
          metaMessages: ["ABI parameter type is invalid."]
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "InvalidAbiTypeParameterError"
        }));
      }
    }
    class C extends m {
      constructor({signature: e, type: t}) {
        (super(`Invalid ${t} signature.`, {
          details: e
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "InvalidSignatureError"
        }));
      }
    }
    class P extends m {
      constructor({signature: e}) {
        (super("Unknown signature.", {
          details: e
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "UnknownSignatureError"
        }));
      }
    }
    class E extends m {
      constructor({signature: e}) {
        (super("Invalid struct signature.", {
          details: e,
          metaMessages: ["No properties exist."]
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "InvalidStructSignatureError"
        }));
      }
    }
    class k extends m {
      constructor({type: e}) {
        (super("Circular reference detected.", {
          metaMessages: [`Struct "${e}" is a circular reference.`]
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "CircularReferenceError"
        }));
      }
    }
    class I extends m {
      constructor({current: e, depth: t}) {
        (super("Unbalanced parentheses.", {
          metaMessages: [`"${e.trim()}" has too many ${t > 0 ? "opening" : "closing"} parentheses.`],
          details: `Depth "${t}"`
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "InvalidParenthesisError"
        }));
      }
    }
    const B = new Map([["address", {
      type: "address"
    }], ["bool", {
      type: "bool"
    }], ["bytes", {
      type: "bytes"
    }], ["bytes32", {
      type: "bytes32"
    }], ["int", {
      type: "int256"
    }], ["int256", {
      type: "int256"
    }], ["string", {
      type: "string"
    }], ["uint", {
      type: "uint256"
    }], ["uint8", {
      type: "uint8"
    }], ["uint16", {
      type: "uint16"
    }], ["uint24", {
      type: "uint24"
    }], ["uint32", {
      type: "uint32"
    }], ["uint64", {
      type: "uint64"
    }], ["uint96", {
      type: "uint96"
    }], ["uint112", {
      type: "uint112"
    }], ["uint160", {
      type: "uint160"
    }], ["uint192", {
      type: "uint192"
    }], ["uint256", {
      type: "uint256"
    }], ["address owner", {
      type: "address",
      name: "owner"
    }], ["address to", {
      type: "address",
      name: "to"
    }], ["bool approved", {
      type: "bool",
      name: "approved"
    }], ["bytes _data", {
      type: "bytes",
      name: "_data"
    }], ["bytes data", {
      type: "bytes",
      name: "data"
    }], ["bytes signature", {
      type: "bytes",
      name: "signature"
    }], ["bytes32 hash", {
      type: "bytes32",
      name: "hash"
    }], ["bytes32 r", {
      type: "bytes32",
      name: "r"
    }], ["bytes32 root", {
      type: "bytes32",
      name: "root"
    }], ["bytes32 s", {
      type: "bytes32",
      name: "s"
    }], ["string name", {
      type: "string",
      name: "name"
    }], ["string symbol", {
      type: "string",
      name: "symbol"
    }], ["string tokenURI", {
      type: "string",
      name: "tokenURI"
    }], ["uint tokenId", {
      type: "uint256",
      name: "tokenId"
    }], ["uint8 v", {
      type: "uint8",
      name: "v"
    }], ["uint256 balance", {
      type: "uint256",
      name: "balance"
    }], ["uint256 tokenId", {
      type: "uint256",
      name: "tokenId"
    }], ["uint256 value", {
      type: "uint256",
      name: "value"
    }], ["event:address indexed from", {
      type: "address",
      name: "from",
      indexed: !0
    }], ["event:address indexed to", {
      type: "address",
      name: "to",
      indexed: !0
    }], ["event:uint indexed tokenId", {
      type: "uint256",
      name: "tokenId",
      indexed: !0
    }], ["event:uint256 indexed tokenId", {
      type: "uint256",
      name: "tokenId",
      indexed: !0
    }]]);
    function S(e, t = {}) {
      if ((function (e) {
        return s.test(e);
      })(e)) return (function (e, t = {}) {
        const n = (function (e) {
          return (0, r.Zw)(s, e);
        })(e);
        if (!n) throw new C({
          signature: e,
          type: "function"
        });
        const o = R(n.parameters), i = [], a = o.length;
        for (let r = 0; r < a; r++) i.push(N(o[r], {
          modifiers: p,
          structs: t,
          type: "function"
        }));
        const c = [];
        if (n.returns) {
          const e = R(n.returns), r = e.length;
          for (let n = 0; n < r; n++) c.push(N(e[n], {
            modifiers: p,
            structs: t,
            type: "function"
          }));
        }
        return {
          name: n.name,
          type: "function",
          stateMutability: n.stateMutability ?? "nonpayable",
          inputs: i,
          outputs: c
        };
      })(e, t);
      if ((function (e) {
        return i.test(e);
      })(e)) return (function (e, t = {}) {
        const n = (function (e) {
          return (0, r.Zw)(i, e);
        })(e);
        if (!n) throw new C({
          signature: e,
          type: "event"
        });
        const o = R(n.parameters), s = [], a = o.length;
        for (let r = 0; r < a; r++) s.push(N(o[r], {
          modifiers: h,
          structs: t,
          type: "event"
        }));
        return {
          name: n.name,
          type: "event",
          inputs: s
        };
      })(e, t);
      if ((function (e) {
        return o.test(e);
      })(e)) return (function (e, t = {}) {
        const n = (function (e) {
          return (0, r.Zw)(o, e);
        })(e);
        if (!n) throw new C({
          signature: e,
          type: "error"
        });
        const i = R(n.parameters), s = [], a = i.length;
        for (let r = 0; r < a; r++) s.push(N(i[r], {
          structs: t,
          type: "error"
        }));
        return {
          name: n.name,
          type: "error",
          inputs: s
        };
      })(e, t);
      if ((function (e) {
        return l.test(e);
      })(e)) return (function (e, t = {}) {
        const n = (function (e) {
          return (0, r.Zw)(l, e);
        })(e);
        if (!n) throw new C({
          signature: e,
          type: "constructor"
        });
        const o = R(n.parameters), i = [], s = o.length;
        for (let r = 0; r < s; r++) i.push(N(o[r], {
          structs: t,
          type: "constructor"
        }));
        return {
          type: "constructor",
          stateMutability: n.stateMutability ?? "nonpayable",
          inputs: i
        };
      })(e, t);
      if ((function (e) {
        return d.test(e);
      })(e)) return (function (e) {
        const t = (function (e) {
          return (0, r.Zw)(d, e);
        })(e);
        if (!t) throw new C({
          signature: e,
          type: "fallback"
        });
        return {
          type: "fallback",
          stateMutability: t.stateMutability ?? "nonpayable"
        };
      })(e);
      if ((function (e) {
        return f.test(e);
      })(e)) return {
        type: "receive",
        stateMutability: "payable"
      };
      throw new P({
        signature: e
      });
    }
    const O = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*(?:\spayable)?)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/, M = /^\((?<type>.+?)\)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/, T = /^u?int$/;
    function N(e, t) {
      const n = (function (e, t, n) {
        let r = "";
        if (n) for (const o of Object.entries(n)) {
          if (!o) continue;
          let e = "";
          for (const t of o[1]) e += `[${t.type}${t.name ? `:${t.name}` : ""}]`;
          r += `(${o[0]}{${e}})`;
        }
        return t ? `${t}:${e}${r}` : e;
      })(e, t?.type, t?.structs);
      if (B.has(n)) return B.get(n);
      const o = r.cN.test(e), i = (0, r.Zw)(o ? M : O, e);
      if (!i) throw new g({
        param: e
      });
      if (i.name && (function (e) {
        return "address" === e || "bool" === e || "function" === e || "string" === e || "tuple" === e || r.eL.test(e) || r.lh.test(e) || j.test(e);
      })(i.name)) throw new w({
        param: e,
        name: i.name
      });
      const s = i.name ? {
        name: i.name
      } : {}, a = "indexed" === i.modifier ? {
        indexed: !0
      } : {}, c = t?.structs ?? ({});
      let u, l = {};
      if (o) {
        u = "tuple";
        const e = R(i.type), t = [], n = e.length;
        for (let r = 0; r < n; r++) t.push(N(e[r], {
          structs: c
        }));
        l = {
          components: t
        };
      } else if ((i.type in c)) (u = "tuple", l = {
        components: c[i.type]
      }); else if (T.test(i.type)) u = `${i.type}256`; else if ("address payable" === i.type) u = "address"; else if ((u = i.type, "struct" !== t?.type && !F(u))) throw new y({
        type: u
      });
      if (i.modifier) {
        if (!t?.modifiers?.has?.(i.modifier)) throw new v({
          param: e,
          type: t?.type,
          modifier: i.modifier
        });
        if (p.has(i.modifier) && !(function (e, t) {
          return t || "bytes" === e || "string" === e || "tuple" === e;
        })(u, !!i.array)) throw new A({
          param: e,
          type: t?.type,
          modifier: i.modifier
        });
      }
      const d = {
        type: `${u}${i.array ?? ""}`,
        ...s,
        ...a,
        ...l
      };
      return (B.set(n, d), d);
    }
    function R(e, t = [], n = "", r = 0) {
      const o = e.trim().length;
      for (let i = 0; i < o; i++) {
        const o = e[i], s = e.slice(i + 1);
        switch (o) {
          case ",":
            return 0 === r ? R(s, [...t, n.trim()]) : R(s, t, `${n}${o}`, r);
          case "(":
            return R(s, t, `${n}${o}`, r + 1);
          case ")":
            return R(s, t, `${n}${o}`, r - 1);
          default:
            return R(s, t, `${n}${o}`, r);
        }
      }
      if ("" === n) return t;
      if (0 !== r) throw new I({
        current: n,
        depth: r
      });
      return (t.push(n.trim()), t);
    }
    function F(e) {
      return "address" === e || "bool" === e || "function" === e || "string" === e || r.eL.test(e) || r.lh.test(e);
    }
    const j = /^(?:after|alias|anonymous|apply|auto|byte|calldata|case|catch|constant|copyof|default|defined|error|event|external|false|final|function|immutable|implements|in|indexed|inline|internal|let|mapping|match|memory|mutable|null|of|override|partial|private|promise|public|pure|reference|relocatable|return|returns|sizeof|static|storage|struct|super|supports|switch|this|true|try|typedef|typeof|var|view|virtual)$/;
    const U = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*)(?<array>(?:\[\d*?\])+?)?$/;
    function D(e, t, n = new Set()) {
      const o = [], i = e.length;
      for (let s = 0; s < i; s++) {
        const i = e[s];
        if (r.cN.test(i.type)) o.push(i); else {
          const e = (0, r.Zw)(U, i.type);
          if (!e?.type) throw new x({
            abiParameter: i
          });
          const {array: s, type: a} = e;
          if ((a in t)) {
            if (n.has(a)) throw new k({
              type: a
            });
            o.push({
              ...i,
              type: `tuple${s ?? ""}`,
              components: D(t[a] ?? [], t, new Set([...n, a]))
            });
          } else {
            if (!F(a)) throw new b({
              type: a
            });
            o.push(i);
          }
        }
      }
      return o;
    }
    function L(e) {
      const t = (function (e) {
        const t = {}, n = e.length;
        for (let s = 0; s < n; s++) {
          const n = e[s];
          if (!c(n)) continue;
          const r = u(n);
          if (!r) throw new C({
            signature: n,
            type: "struct"
          });
          const o = r.properties.split(";"), i = [], a = o.length;
          for (let e = 0; e < a; e++) {
            const t = o[e].trim();
            if (!t) continue;
            const n = N(t, {
              type: "struct"
            });
            i.push(n);
          }
          if (!i.length) throw new E({
            signature: n
          });
          t[r.name] = i;
        }
        const r = {}, o = Object.entries(t), i = o.length;
        for (let s = 0; s < i; s++) {
          const [e, n] = o[s];
          r[e] = D(n, t);
        }
        return r;
      })(e), n = [], r = e.length;
      for (let o = 0; o < r; o++) {
        const r = e[o];
        c(r) || n.push(S(r, t));
      }
      return n;
    }
  },
  62619: function (e, t, n) {
    "use strict";
    function r(e, t) {
      const n = e.exec(t);
      return n?.groups;
    }
    n.d(t, {
      Zw: function () {
        return r;
      },
      cN: function () {
        return s;
      },
      eL: function () {
        return o;
      },
      lh: function () {
        return i;
      }
    });
    const o = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/, i = /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/, s = /^\(.+?\).*?$/;
  },
  30497: function (e, t, n) {
    "use strict";
    n.d(t, {
      o: function () {
        return i;
      }
    });
    var r = n(65759);
    function o(e) {
      return {
        address: e.address,
        amount: r.xS(e.amount),
        index: r.xS(e.index),
        validatorIndex: r.xS(e.validatorIndex)
      };
    }
    function i(e) {
      return {
        ..."bigint" === typeof e.baseFeePerGas && ({
          baseFeePerGas: r.xS(e.baseFeePerGas)
        }),
        ..."bigint" === typeof e.blobBaseFee && ({
          blobBaseFee: r.xS(e.blobBaseFee)
        }),
        ..."string" === typeof e.feeRecipient && ({
          feeRecipient: e.feeRecipient
        }),
        ..."bigint" === typeof e.gasLimit && ({
          gasLimit: r.xS(e.gasLimit)
        }),
        ..."bigint" === typeof e.number && ({
          number: r.xS(e.number)
        }),
        ..."bigint" === typeof e.prevRandao && ({
          prevRandao: r.xS(e.prevRandao)
        }),
        ..."bigint" === typeof e.time && ({
          time: r.xS(e.time)
        }),
        ...e.withdrawals && ({
          withdrawals: e.withdrawals.map(o)
        })
      };
    }
  },
  22496: function (e, t, n) {
    "use strict";
    n.d(t, {
      G: function () {
        return r;
      }
    });
    class r extends Error {
      constructor(e, t = {}) {
        const n = (() => {
          if (t.cause instanceof r) {
            if (t.cause.details) return t.cause.details;
            if (t.cause.shortMessage) return t.cause.shortMessage;
          }
          return t.cause && ("details" in t.cause) && "string" === typeof t.cause.details ? t.cause.details : t.cause?.message ? t.cause.message : t.details;
        })(), o = t.cause instanceof r && t.cause.docsPath || t.docsPath, i = `https://oxlib.sh${o ?? ""}`;
        (super([e || "An error occurred.", ...t.metaMessages ? ["", ...t.metaMessages] : [], ...n || o ? ["", n ? `Details: ${n}` : void 0, o ? `See: ${i}` : void 0] : []].filter(e => "string" === typeof e).join("\n"), t.cause ? {
          cause: t.cause
        } : void 0), Object.defineProperty(this, "details", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), Object.defineProperty(this, "docs", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), Object.defineProperty(this, "docsPath", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), Object.defineProperty(this, "shortMessage", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), Object.defineProperty(this, "cause", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "BaseError"
        }), Object.defineProperty(this, "version", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "ox@0.1.1"
        }), this.cause = t.cause, this.details = n, this.docs = i, this.docsPath = o, this.shortMessage = e);
      }
      walk(e) {
        return o(this, e);
      }
    }
    function o(e, t) {
      return t?.(e) ? e : e && "object" === typeof e && ("cause" in e) && e.cause ? o(e.cause, t) : t ? null : e;
    }
  },
  65759: function (e, t, n) {
    "use strict";
    n.d(t, {
      $s: function () {
        return k;
      },
      Dp: function () {
        return u;
      },
      Gh: function () {
        return g;
      },
      Gu: function () {
        return v;
      },
      He: function () {
        return w;
      },
      J5: function () {
        return A;
      },
      M6: function () {
        return P;
      },
      O3: function () {
        return l;
      },
      Q_: function () {
        return p;
      },
      dp: function () {
        return y;
      },
      eh: function () {
        return m;
      },
      mL: function () {
        return h;
      },
      mV: function () {
        return E;
      },
      tP: function () {
        return b;
      },
      xS: function () {
        return f;
      },
      xv: function () {
        return d;
      },
      zo: function () {
        return c;
      }
    });
    var r = n(22496), o = n(26499), i = n(62266);
    const s = new TextEncoder(), a = Array.from({
      length: 256
    }, (e, t) => t.toString(16).padStart(2, "0"));
    function c(...e) {
      return `0x${e.reduce((e, t) => e + t.replace("0x", ""), "")}`;
    }
    function u(e) {
      return e instanceof Uint8Array ? d(e) : Array.isArray(e) ? d(new Uint8Array(e)) : e;
    }
    function l(e, t = {}) {
      const n = `0x${Number(e)}`;
      return "number" === typeof t.size ? (o.Yf(n, t.size), p(n, t.size)) : n;
    }
    function d(e, t = {}) {
      let n = "";
      for (let o = 0; o < e.length; o++) n += a[e[o]];
      const r = `0x${n}`;
      return "number" === typeof t.size ? (o.Yf(r, t.size), m(r, t.size)) : r;
    }
    function f(e, t = {}) {
      const {signed: n, size: r} = t, o = BigInt(e);
      let i;
      r ? i = n ? (1n << 8n * BigInt(r) - 1n) - 1n : 2n ** (8n * BigInt(r)) - 1n : "number" === typeof e && (i = BigInt(Number.MAX_SAFE_INTEGER));
      const s = "bigint" === typeof i && n ? -i - 1n : 0;
      if (i && o > i || o < s) {
        const t = "bigint" === typeof e ? "n" : "";
        throw new A({
          max: i ? `${i}${t}` : void 0,
          min: `${s}${t}`,
          signed: n,
          size: r,
          value: `${e}${t}`
        });
      }
      const a = `0x${(n && o < 0 ? (1n << BigInt(8 * r)) + BigInt(o) : o).toString(16)}`;
      return r ? p(a, r) : a;
    }
    function h(e, t = {}) {
      return d(s.encode(e), t);
    }
    function p(e, t) {
      return o.vk(e, {
        dir: "left",
        size: t
      });
    }
    function m(e, t) {
      return o.vk(e, {
        dir: "right",
        size: t
      });
    }
    function b(e, t, n, r = {}) {
      const {strict: i} = r;
      o.EM(e, t);
      const s = `0x${e.replace("0x", "").slice(2 * (t ?? 0), 2 * (n ?? e.length))}`;
      return (i && o.Ro(s, t, n), s);
    }
    function y(e) {
      return Math.ceil((e.length - 2) / 2);
    }
    function g(e, t = {}) {
      const {signed: n} = t;
      t.size && o.Yf(e, t.size);
      const r = BigInt(e);
      if (!n) return r;
      const i = (e.length - 2) / 2, s = (1n << 8n * BigInt(i)) - 1n;
      return r <= s >> 1n ? r : r - s - 1n;
    }
    function w(e, t = {}) {
      const {signed: n, size: r} = t;
      return Number(n || r ? g(e, t) : e);
    }
    function v(e, t = {}) {
      const {strict: n = !1} = t;
      try {
        return ((function (e, t = {}) {
          const {strict: n = !1} = t;
          if (!e) throw new x(e);
          if ("string" !== typeof e) throw new x(e);
          if (n && !(/^0x[0-9a-fA-F]*$/).test(e)) throw new C(e);
          if (!e.startsWith("0x")) throw new C(e);
        })(e, {
          strict: n
        }), !0);
      } catch {
        return !1;
      }
    }
    class A extends r.G {
      constructor({max: e, min: t, signed: n, size: r, value: o}) {
        (super(`Number \`${o}\` is not in safe${r ? ` ${8 * r}-bit` : ""}${n ? " signed" : " unsigned"} integer range ${e ? `(\`${t}\` to \`${e}\`)` : `(above \`${t}\`)`}`), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Hex.IntegerOutOfRangeError"
        }));
      }
    }
    r.G;
    class x extends r.G {
      constructor(e) {
        (super(`Value \`${"object" === typeof e ? i.P(e) : e}\` of type \`${typeof e}\` is an invalid hex type.`, {
          metaMessages: ["Hex types must be represented as `\"0x${string}\"`."]
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Hex.InvalidHexTypeError"
        }));
      }
    }
    class C extends r.G {
      constructor(e) {
        (super(`Value \`${e}\` is an invalid hex value.`, {
          metaMessages: ["Hex values must start with `\"0x\"` and contain only hexadecimal characters (0-9, a-f, A-F)."]
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Hex.InvalidHexValueError"
        }));
      }
    }
    r.G;
    class P extends r.G {
      constructor({givenSize: e, maxSize: t}) {
        (super(`Size cannot exceed \`${t}\` bytes. Given size: \`${e}\` bytes.`), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Hex.SizeOverflowError"
        }));
      }
    }
    class E extends r.G {
      constructor({offset: e, position: t, size: n}) {
        (super(`Slice ${"start" === t ? "starting" : "ending"} at offset \`${e}\` is out-of-bounds (size: \`${n}\`).`), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Hex.SliceOffsetOutOfBoundsError"
        }));
      }
    }
    class k extends r.G {
      constructor({size: e, targetSize: t, type: n}) {
        (super(`${n.charAt(0).toUpperCase()}${n.slice(1).toLowerCase()} size (\`${e}\`) exceeds padding size (\`${t}\`).`), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Hex.SizeExceedsPaddingSizeError"
        }));
      }
    }
  },
  62266: function (e, t, n) {
    "use strict";
    n.d(t, {
      P: function () {
        return o;
      }
    });
    const r = "#__bigint";
    function o(e, t, n) {
      return JSON.stringify(e, (e, n) => "function" === typeof t ? t(e, n) : "bigint" === typeof n ? n.toString() + r : n, n);
    }
  },
  26499: function (e, t, n) {
    "use strict";
    n.d(t, {
      EM: function () {
        return i;
      },
      Ro: function () {
        return s;
      },
      Yf: function () {
        return o;
      },
      vk: function () {
        return a;
      }
    });
    var r = n(65759);
    function o(e, t) {
      if (r.dp(e) > t) throw new r.M6({
        givenSize: r.dp(e),
        maxSize: t
      });
    }
    function i(e, t) {
      if ("number" === typeof t && t > 0 && t > r.dp(e) - 1) throw new r.mV({
        offset: t,
        position: "start",
        size: r.dp(e)
      });
    }
    function s(e, t, n) {
      if ("number" === typeof t && "number" === typeof n && r.dp(e) !== n - t) throw new r.mV({
        offset: n,
        position: "end",
        size: r.dp(e)
      });
    }
    function a(e, t = {}) {
      const {dir: n, size: o = 32} = t;
      if (0 === o) return e;
      const i = e.replace("0x", "");
      if (i.length > 2 * o) throw new r.$s({
        size: Math.ceil(i.length / 2),
        targetSize: o,
        type: "Hex"
      });
      return `0x${i["right" === n ? "padEnd" : "padStart"](2 * o, "0")}`;
    }
  },
  10231: function (e, t, n) {
    "use strict";
    n.d(t, {
      V: function () {
        return a;
      },
      F: function () {
        return c;
      }
    });
    var r = n(2265);
    let o = !1;
    function i(e, t) {
      const {initialState: n, reconnectOnMount: r} = t;
      return (n && !e._internal.store.persist.hasHydrated() && e.setState({
        ...n,
        chainId: e.chains.some(e => e.id === n.chainId) ? n.chainId : e.chains[0].id,
        connections: r ? n.connections : new Map(),
        status: r ? "reconnecting" : "disconnected"
      }), {
        async onMount() {
          (e._internal.ssr && (await e._internal.store.persist.rehydrate(), e._internal.mipd && e._internal.connectors.setState(t => {
            const n = new Set();
            for (const e of t ?? []) if (e.rdns) {
              const t = Array.isArray(e.rdns) ? e.rdns : [e.rdns];
              for (const e of t) n.add(e);
            }
            const r = [], o = e._internal.mipd?.getProviders() ?? [];
            for (const i of o) {
              if (n.has(i.info.rdns)) continue;
              const t = e._internal.connectors.providerDetailToConnector(i), o = e._internal.connectors.setup(t);
              r.push(o);
            }
            return [...t, ...r];
          })), r ? (async function (e, t = {}) {
            if (o) return [];
            (o = !0, e.setState(e => ({
              ...e,
              status: e.current ? "reconnecting" : "connecting"
            })));
            const n = [];
            if (t.connectors?.length) for (const o of t.connectors) {
              let t;
              (t = "function" === typeof o ? e._internal.connectors.setup(o) : o, n.push(t));
            } else n.push(...e.connectors);
            let r;
            try {
              r = await e.storage?.getItem("recentConnectorId");
            } catch {}
            const i = {};
            for (const [, o] of e.state.connections) i[o.connector.id] = 1;
            r && (i[r] = 0);
            const s = Object.keys(i).length > 0 ? [...n].sort((e, t) => (i[e.id] ?? 10) - (i[t.id] ?? 10)) : n;
            let a = !1;
            const c = [], u = [];
            for (const o of s) {
              const t = await o.getProvider().catch(() => {});
              if (!t) continue;
              if (u.some(e => e === t)) continue;
              if (!await o.isAuthorized()) continue;
              const n = await o.connect({
                isReconnecting: !0
              }).catch(() => null);
              n && (o.emitter.off("connect", e._internal.events.connect), o.emitter.on("change", e._internal.events.change), o.emitter.on("disconnect", e._internal.events.disconnect), e.setState(e => {
                const t = new Map(a ? e.connections : new Map()).set(o.uid, {
                  accounts: n.accounts,
                  chainId: n.chainId,
                  connector: o
                });
                return {
                  ...e,
                  current: a ? e.current : o.uid,
                  connections: t
                };
              }), c.push({
                accounts: n.accounts,
                chainId: n.chainId,
                connector: o
              }), u.push(t), a = !0);
            }
            ("reconnecting" !== e.state.status && "connecting" !== e.state.status || (a ? e.setState(e => ({
              ...e,
              status: "connected"
            })) : e.setState(e => ({
              ...e,
              connections: new Map(),
              current: null,
              status: "disconnected"
            }))), o = !1);
          })(e) : e.storage && e.setState(e => ({
            ...e,
            connections: new Map()
          })));
        }
      });
    }
    function s(e) {
      const {children: t, config: n, initialState: o, reconnectOnMount: s = !0} = e, {onMount: a} = i(n, {
        initialState: o,
        reconnectOnMount: s
      });
      n._internal.ssr || a();
      const c = (0, r.useRef)(!0);
      return ((0, r.useEffect)(() => {
        if (c.current && n._internal.ssr) return (a(), () => {
          c.current = !1;
        });
      }, []), t);
    }
    const a = (0, r.createContext)(void 0);
    function c(e) {
      const {children: t, config: n} = e, o = {
        value: n
      };
      return (0, r.createElement)(s, e, (0, r.createElement)(a.Provider, o, t));
    }
  },
  64707: function (e, t, n) {
    "use strict";
    n.d(t, {
      m: function () {
        return l;
      }
    });
    var r = n(55911), o = n(24380), i = n(12364), s = n(52123), a = n(2265), c = n(48892);
    const u = e => "object" === typeof e && !Array.isArray(e);
    function l() {
      let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      const t = (0, i.Z)(e);
      return (function (e, t) {
        let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : t, r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : s.v;
        const o = (0, a.useRef)([]), i = (0, c.useSyncExternalStoreWithSelector)(e, t, n, e => e, (e, t) => {
          if (u(e) && u(t) && o.current.length) {
            for (const n of o.current) if (!r(e[n], t[n])) return !1;
            return !0;
          }
          return r(e, t);
        });
        return (0, a.useMemo)(() => {
          if (u(i)) {
            const e = {
              ...i
            };
            let t = {};
            for (const [n, r] of Object.entries(e)) t = {
              ...t,
              [n]: {
                configurable: !1,
                enumerable: !0,
                get: () => (o.current.includes(n) || o.current.push(n), r)
              }
            };
            return (Object.defineProperties(e, t), e);
          }
          return i;
        }, [i]);
      })(e => (0, r.u)(t, {
        onChange: e
      }), () => (0, o.D)(t));
    }
  },
  89472: function (e, t, n) {
    "use strict";
    n.d(t, {
      E: function () {
        return s;
      }
    });
    var r = n(55911), o = n(2265), i = n(12364);
    function s() {
      let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      const {onConnect: t, onDisconnect: n} = e, s = (0, i.Z)(e);
      (0, o.useEffect)(() => (0, r.u)(s, {
        onChange(e, r) {
          if (("reconnecting" === r.status || "connecting" === r.status && void 0 === r.address) && "connected" === e.status) {
            const {address: n, addresses: o, chain: i, chainId: s, connector: a} = e, c = "reconnecting" === r.status || void 0 === r.status;
            null === t || void 0 === t || t({
              address: n,
              addresses: o,
              chain: i,
              chainId: s,
              connector: a,
              isReconnected: c
            });
          } else "connected" === r.status && "disconnected" === e.status && (null === n || void 0 === n || n());
        }
      }), [s, t, n]);
    }
  },
  48088: function (e, t, n) {
    "use strict";
    n.d(t, {
      K: function () {
        return A;
      }
    });
    var r = n(72932), o = n(36826), i = n(39502), s = n(32807), a = n(44199), c = n(98173);
    function u(e) {
      return "number" === typeof e ? e : "wei" === e ? 0 : Math.abs(c.Bd[e]);
    }
    var l = n(20010), d = n(94797);
    var f = n(28766);
    async function h(e, t) {
      const {allowFailure: n = !0, blockNumber: r, blockTag: o, ...i} = t, s = t.contracts;
      try {
        const t = {};
        for (const [n, r] of s.entries()) {
          const o = r.chainId ?? e.state.chainId;
          (t[o] || (t[o] = []), t[o]?.push({
            contract: r,
            index: n
          }));
        }
        const c = () => Object.entries(t).map(([t, s]) => (async function (e, t) {
          const {allowFailure: n = !0, chainId: r, contracts: o, ...i} = t, s = e.getClient({
            chainId: r
          });
          return (0, a.s)(s, d.A, "multicall")({
            allowFailure: n,
            contracts: o,
            ...i
          });
        })(e, {
          ...i,
          allowFailure: n,
          blockNumber: r,
          blockTag: o,
          chainId: Number.parseInt(t, 10),
          contracts: s.map(({contract: e}) => e)
        })), u = (await Promise.all(c())).flat(), l = Object.values(t).flatMap(e => e.map(({index: e}) => e));
        return u.reduce((e, t, n) => (e && (e[l[n]] = t), e), []);
      } catch (c) {
        if (c instanceof l.uq) throw c;
        const t = () => s.map(t => (function (e, t) {
          const {chainId: n, ...r} = t, o = e.getClient({
            chainId: n
          });
          return (0, a.s)(o, f.L, "readContract")(r);
        })(e, {
          ...t,
          blockNumber: r,
          blockTag: o
        }));
        return n ? (await Promise.allSettled(t())).map(e => "fulfilled" === e.status ? {
          result: e.value,
          status: "success"
        } : {
          error: e.reason,
          result: void 0,
          status: "failure"
        }) : await Promise.all(t());
      }
    }
    async function p(e, t) {
      const {balanceAddress: n, chainId: r, symbolType: o, tokenAddress: s, unit: a} = t, c = {
        abi: [{
          type: "function",
          name: "balanceOf",
          stateMutability: "view",
          inputs: [{
            type: "address"
          }],
          outputs: [{
            type: "uint256"
          }]
        }, {
          type: "function",
          name: "decimals",
          stateMutability: "view",
          inputs: [],
          outputs: [{
            type: "uint8"
          }]
        }, {
          type: "function",
          name: "symbol",
          stateMutability: "view",
          inputs: [],
          outputs: [{
            type: o
          }]
        }],
        address: s
      }, [l, d, f] = await h(e, {
        allowFailure: !1,
        contracts: [{
          ...c,
          functionName: "balanceOf",
          args: [n],
          chainId: r
        }, {
          ...c,
          functionName: "decimals",
          chainId: r
        }, {
          ...c,
          functionName: "symbol",
          chainId: r
        }]
      });
      return {
        decimals: d,
        formatted: (0, i.b)(l ?? "0", u(a ?? d)),
        symbol: f,
        value: l
      };
    }
    var m = n(27534);
    function b(e, t = {}) {
      return {
        async queryFn({queryKey: t}) {
          const {address: n, scopeKey: c, ...l} = t[1];
          if (!n) throw new Error("address is required");
          const d = await (async function (e, t) {
            const {address: n, blockNumber: c, blockTag: l, chainId: d, token: f, unit: h = "ether"} = t;
            if (f) try {
              return await p(e, {
                balanceAddress: n,
                chainId: d,
                symbolType: "string",
                tokenAddress: f
              });
            } catch (w) {
              if ("ContractFunctionExecutionError" === w.name) {
                const t = await p(e, {
                  balanceAddress: n,
                  chainId: d,
                  symbolType: "bytes32",
                  tokenAddress: f
                }), i = (0, r.rR)((0, o.f)(t.symbol, {
                  dir: "right"
                }));
                return {
                  ...t,
                  symbol: i
                };
              }
              throw w;
            }
            const m = e.getClient({
              chainId: d
            }), b = (0, a.s)(m, s.s, "getBalance"), y = await b(c ? {
              address: n,
              blockNumber: c
            } : {
              address: n,
              blockTag: l
            }), g = e.chains.find(e => e.id === d) ?? m.chain;
            return {
              decimals: g.nativeCurrency.decimals,
              formatted: (0, i.b)(y, u(h)),
              symbol: g.nativeCurrency.symbol,
              value: y
            };
          })(e, {
            ...l,
            address: n
          });
          return d ?? null;
        },
        queryKey: y(t)
      };
    }
    function y(e = {}) {
      return ["balance", (0, m.OP)(e)];
    }
    var g = n(24432), w = n(44005), v = n(12364);
    function A() {
      let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      const {address: t, query: n = {}} = e, r = (0, v.Z)(e), o = (0, w.x)({
        config: r
      });
      var i;
      const s = b(r, {
        ...e,
        chainId: null !== (i = e.chainId) && void 0 !== i ? i : o
      });
      var a;
      const c = Boolean(t && (null === (a = n.enabled) || void 0 === a || a));
      return (0, g.aM)({
        ...n,
        ...s,
        enabled: c
      });
    }
  },
  44005: function (e, t, n) {
    "use strict";
    function r(e) {
      return e.state.chainId;
    }
    n.d(t, {
      x: function () {
        return s;
      }
    });
    var o = n(2265), i = n(12364);
    function s() {
      let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      const t = (0, i.Z)(e);
      return (0, o.useSyncExternalStore)(e => (function (e, t) {
        const {onChange: n} = t;
        return e.subscribe(e => e.chainId, n);
      })(t, {
        onChange: e
      }), () => r(t), () => r(t));
    }
  },
  12364: function (e, t, n) {
    "use strict";
    n.d(t, {
      Z: function () {
        return c;
      }
    });
    var r = n(2265), o = n(10231), i = n(26129);
    class s extends i.G {
      constructor() {
        (super(...arguments), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "WagmiError"
        }));
      }
      get docsBaseUrl() {
        return "https://wagmi.sh/react";
      }
      get version() {
        return "wagmi@2.18.0";
      }
    }
    class a extends s {
      constructor() {
        (super("`useConfig` must be used within `WagmiProvider`.", {
          docsPath: "/api/WagmiProvider"
        }), Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "WagmiProviderNotFoundError"
        }));
      }
    }
    function c() {
      var e;
      const t = null !== (e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).config) && void 0 !== e ? e : (0, r.useContext)(o.V);
      if (!t) throw new a();
      return t;
    }
  },
  60542: function (e, t, n) {
    "use strict";
    n.d(t, {
      $: function () {
        return d;
      }
    });
    var r = n(21770), o = n(13102);
    function i(e) {
      return {
        mutationFn: t => (async function (e, t) {
          let n;
          if ((n = "function" === typeof t.connector ? e._internal.connectors.setup(t.connector) : t.connector, n.uid === e.state.current)) throw new o.wi();
          try {
            (e.setState(e => ({
              ...e,
              status: "connecting"
            })), n.emitter.emit("message", {
              type: "connecting"
            }));
            const {connector: r, ...o} = t, i = await n.connect(o);
            return (n.emitter.off("connect", e._internal.events.connect), n.emitter.on("change", e._internal.events.change), n.emitter.on("disconnect", e._internal.events.disconnect), await e.storage?.setItem("recentConnectorId", n.id), e.setState(e => ({
              ...e,
              connections: new Map(e.connections).set(n.uid, {
                accounts: o.withCapabilities ? i.accounts.map(e => "object" === typeof e ? e.address : e) : i.accounts,
                chainId: i.chainId,
                connector: n
              }),
              current: n.uid,
              status: "connected"
            })), {
              accounts: o.withCapabilities ? i.accounts.map(e => "object" === typeof e ? e : {
                address: e,
                capabilities: {}
              }) : i.accounts,
              chainId: i.chainId
            });
          } catch (r) {
            throw (e.setState(e => ({
              ...e,
              status: e.current ? "connected" : "disconnected"
            })), r);
          }
        })(e, t),
        mutationKey: ["connect"]
      };
    }
    var s = n(2265), a = n(12364);
    let c = [];
    function u(e) {
      const t = e.connectors;
      return c.length === t.length && c.every((e, n) => e === t[n]) ? c : (c = t, t);
    }
    function l() {
      let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      const t = (0, a.Z)(e);
      return (0, s.useSyncExternalStore)(e => (function (e, t) {
        const {onChange: n} = t;
        return e._internal.connectors.subscribe((e, t) => {
          n(Object.values(e), t);
        });
      })(t, {
        onChange: e
      }), () => u(t), () => u(t));
    }
    function d() {
      let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      const {mutation: t} = e, n = (0, a.Z)(e), o = i(n), {mutate: c, mutateAsync: u, ...d} = (0, r.D)({
        ...t,
        ...o
      });
      return ((0, s.useEffect)(() => n.subscribe(e => {
        let {status: t} = e;
        return t;
      }, (e, t) => {
        "connected" === t && "disconnected" === e && d.reset();
      }), [n, d.reset]), {
        ...d,
        connect: c,
        connectAsync: u,
        connectors: l({
          config: n
        })
      });
    }
  },
  99778: function (e, t, n) {
    "use strict";
    n.d(t, {
      q: function () {
        return d;
      }
    });
    var r = n(21770);
    function o(e) {
      return {
        mutationFn: t => (async function (e, t = {}) {
          let n;
          if (t.connector) n = t.connector; else {
            const {connections: t, current: r} = e.state, o = t.get(r);
            n = o?.connector;
          }
          const r = e.state.connections;
          (n && (await n.disconnect(), n.emitter.off("change", e._internal.events.change), n.emitter.off("disconnect", e._internal.events.disconnect), n.emitter.on("connect", e._internal.events.connect), r.delete(n.uid)), e.setState(e => {
            if (0 === r.size) return {
              ...e,
              connections: new Map(),
              current: null,
              status: "disconnected"
            };
            const t = r.values().next().value;
            return {
              ...e,
              connections: new Map(r),
              current: t.connector.uid
            };
          }));
          {
            const t = e.state.current;
            if (!t) return;
            const n = e.state.connections.get(t)?.connector;
            if (!n) return;
            await e.storage?.setItem("recentConnectorId", n.id);
          }
        })(e, t),
        mutationKey: ["disconnect"]
      };
    }
    var i = n(12364), s = n(52123);
    let a = [];
    function c(e) {
      const t = [...e.state.connections.values()];
      return "reconnecting" === e.state.status || (0, s.v)(a, t) ? a : (a = t, t);
    }
    var u = n(2265);
    function l() {
      let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      const t = (0, i.Z)(e);
      return (0, u.useSyncExternalStore)(e => (function (e, t) {
        const {onChange: n} = t;
        return e.subscribe(() => c(e), n, {
          equalityFn: s.v
        });
      })(t, {
        onChange: e
      }), () => c(t), () => c(t));
    }
    function d() {
      let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      const {mutation: t} = e, n = (0, i.Z)(e), s = o(n), {mutate: a, mutateAsync: c, ...u} = (0, r.D)({
        ...t,
        ...s
      });
      return {
        ...u,
        connectors: l({
          config: n
        }).map(e => e.connector),
        disconnect: a,
        disconnectAsync: c
      };
    }
  },
  33507: function (e, t, n) {
    "use strict";
    n.d(t, {
      c: function () {
        return d;
      }
    });
    var r = n(96698), o = n(44199);
    var i = n(27534);
    function s(e, t = {}) {
      return {
        async queryFn({queryKey: t}) {
          const {name: n, scopeKey: i, ...s} = t[1];
          if (!n) throw new Error("name is required");
          return (function (e, t) {
            const {chainId: n, ...i} = t, s = e.getClient({
              chainId: n
            });
            return (0, o.s)(s, r.r, "getEnsAvatar")(i);
          })(e, {
            ...s,
            name: n
          });
        },
        queryKey: a(t)
      };
    }
    function a(e = {}) {
      return ["ensAvatar", (0, i.OP)(e)];
    }
    var c = n(24432), u = n(44005), l = n(12364);
    function d() {
      let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      const {name: t, query: n = {}} = e, r = (0, l.Z)(e), o = (0, u.x)({
        config: r
      });
      var i;
      const a = s(r, {
        ...e,
        chainId: null !== (i = e.chainId) && void 0 !== i ? i : o
      });
      var d;
      const f = Boolean(t && (null === (d = n.enabled) || void 0 === d || d));
      return (0, c.aM)({
        ...n,
        ...a,
        enabled: f
      });
    }
  },
  77861: function (e, t, n) {
    "use strict";
    n.d(t, {
      F: function () {
        return d;
      }
    });
    var r = n(72609), o = n(44199);
    var i = n(27534);
    function s(e, t = {}) {
      return {
        async queryFn({queryKey: t}) {
          const {address: n, scopeKey: i, ...s} = t[1];
          if (!n) throw new Error("address is required");
          return (function (e, t) {
            const {chainId: n, ...i} = t, s = e.getClient({
              chainId: n
            });
            return (0, o.s)(s, r.w, "getEnsName")(i);
          })(e, {
            ...s,
            address: n
          });
        },
        queryKey: a(t)
      };
    }
    function a(e = {}) {
      return ["ensName", (0, i.OP)(e)];
    }
    var c = n(24432), u = n(44005), l = n(12364);
    function d() {
      let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      const {address: t, query: n = {}} = e, r = (0, l.Z)(e), o = (0, u.x)({
        config: r
      });
      var i;
      const a = s(r, {
        ...e,
        chainId: null !== (i = e.chainId) && void 0 !== i ? i : o
      });
      var d;
      const f = Boolean(t && (null === (d = n.enabled) || void 0 === d || d));
      return (0, c.aM)({
        ...n,
        ...a,
        enabled: f
      });
    }
  },
  53882: function (e, t, n) {
    "use strict";
    n.d(t, {
      t: function () {
        return a;
      }
    });
    var r = n(37878);
    function o(e, t = {}) {
      const n = (function (e, t = {}) {
        try {
          return e.getClient(t);
        } catch {
          return;
        }
      })(e, t);
      return n?.extend(r.I);
    }
    var i = n(48892), s = n(12364);
    function a() {
      let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      const t = (0, s.Z)(e);
      return (0, i.useSyncExternalStoreWithSelector)(e => (function (e, t) {
        const {onChange: n} = t;
        return e.subscribe(() => o(e), n, {
          equalityFn: (e, t) => e?.uid === t?.uid
        });
      })(t, {
        onChange: e
      }), () => o(t, e), () => o(t, e), e => e, (e, t) => (null === e || void 0 === e ? void 0 : e.uid) === (null === t || void 0 === t ? void 0 : t.uid));
    }
  },
  91196: function (e, t, n) {
    "use strict";
    n.d(t, {
      Q: function () {
        return s;
      }
    });
    var r = n(21770), o = n(31327);
    var i = n(12364);
    function s() {
      let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      const {mutation: t} = e, n = (function (e) {
        return {
          mutationFn: t => (0, o.l)(e, t),
          mutationKey: ["signMessage"]
        };
      })((0, i.Z)(e)), {mutate: s, mutateAsync: a, ...c} = (0, r.D)({
        ...t,
        ...n
      });
      return {
        ...c,
        signMessage: s,
        signMessageAsync: a
      };
    }
  },
  59233: function (e, t, n) {
    "use strict";
    n.d(t, {
      o: function () {
        return h;
      }
    });
    var r = n(21770), o = n(13102), i = n(14478);
    function s(e) {
      return {
        mutationFn: t => (async function (e, t) {
          const {addEthereumChainParameter: n, chainId: r} = t, s = e.state.connections.get(t.connector?.uid ?? e.state.current);
          if (s) {
            const e = s.connector;
            if (!e.switchChain) throw new i.O({
              connector: e
            });
            return await e.switchChain({
              addEthereumChainParameter: n,
              chainId: r
            });
          }
          const a = e.chains.find(e => e.id === r);
          if (!a) throw new o.X4();
          return (e.setState(e => ({
            ...e,
            chainId: r
          })), a);
        })(e, t),
        mutationKey: ["switchChain"]
      };
    }
    var a = n(52123);
    let c = [];
    function u(e) {
      const t = e.chains;
      return (0, a.v)(c, t) ? c : (c = t, t);
    }
    var l = n(2265), d = n(12364);
    function f() {
      let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      const t = (0, d.Z)(e);
      return (0, l.useSyncExternalStore)(e => (function (e, t) {
        const {onChange: n} = t;
        return e._internal.chains.subscribe((e, t) => {
          n(e, t);
        });
      })(t, {
        onChange: e
      }), () => u(t), () => u(t));
    }
    function h() {
      let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      const {mutation: t} = e, n = (0, d.Z)(e), o = s(n), {mutate: i, mutateAsync: a, ...c} = (0, r.D)({
        ...t,
        ...o
      });
      return {
        ...c,
        chains: f({
          config: n
        }),
        switchChain: i,
        switchChainAsync: a
      };
    }
  },
  24432: function (e, t, n) {
    "use strict";
    n.d(t, {
      aM: function () {
        return i;
      }
    });
    var r = n(11713), o = n(27534);
    function i(e) {
      const t = (0, r.a)({
        ...e,
        queryKeyHashFn: o.kq
      });
      return (t.queryKey = e.queryKey, t);
    }
  },
  59625: function (e, t, n) {
    "use strict";
    n.d(t, {
      Ue: function () {
        return f;
      }
    });
    const r = e => {
      let t;
      const n = new Set(), r = (e, r) => {
        const o = "function" === typeof e ? e(t) : e;
        if (!Object.is(o, t)) {
          const e = t;
          (t = (null != r ? r : "object" !== typeof o || null === o) ? o : Object.assign({}, t, o), n.forEach(n => n(t, e)));
        }
      }, o = () => t, i = {
        setState: r,
        getState: o,
        getInitialState: () => s,
        subscribe: e => (n.add(e), () => n.delete(e)),
        destroy: () => {
          (console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."), n.clear());
        }
      }, s = t = e(r, o, i);
      return i;
    }, o = e => e ? r(e) : r;
    var i = n(2265), s = n(27507);
    const {useDebugValue: a} = i, {useSyncExternalStoreWithSelector: c} = s;
    let u = !1;
    const l = e => e;
    const d = e => {
      "function" !== typeof e && console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");
      const t = "function" === typeof e ? o(e) : e, n = (e, n) => (function (e, t = l, n) {
        n && !u && (console.warn("[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"), u = !0);
        const r = c(e.subscribe, e.getState, e.getServerState || e.getInitialState, t, n);
        return (a(r), r);
      })(t, e, n);
      return (Object.assign(n, t), n);
    }, f = e => e ? d(e) : d;
  }
}]);
