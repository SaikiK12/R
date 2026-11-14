"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[8984], {
  83464: function (t, e, n) {
    n.d(e, {
      Z: function () {
        return ve;
      }
    });
    var r = {};
    function i(t, e) {
      return function () {
        return t.apply(e, arguments);
      };
    }
    (n.r(r), n.d(r, {
      hasBrowserEnv: function () {
        return ft;
      },
      hasStandardBrowserEnv: function () {
        return dt;
      },
      hasStandardBrowserWebWorkerEnv: function () {
        return pt;
      },
      navigator: function () {
        return ht;
      },
      origin: function () {
        return gt;
      }
    }));
    var o = n(25566);
    const {toString: s} = Object.prototype, {getPrototypeOf: a} = Object, {iterator: u, toStringTag: c} = Symbol, l = (f = Object.create(null), t => {
      const e = s.call(t);
      return f[e] || (f[e] = e.slice(8, -1).toLowerCase());
    });
    var f;
    const h = t => (t = t.toLowerCase(), e => l(e) === t), d = t => e => typeof e === t, {isArray: p} = Array, g = d("undefined");
    function m(t) {
      return null !== t && !g(t) && null !== t.constructor && !g(t.constructor) && b(t.constructor.isBuffer) && t.constructor.isBuffer(t);
    }
    const y = h("ArrayBuffer");
    const w = d("string"), b = d("function"), v = d("number"), E = t => null !== t && "object" === typeof t, x = t => {
      if ("object" !== l(t)) return !1;
      const e = a(t);
      return (null === e || e === Object.prototype || null === Object.getPrototypeOf(e)) && !((c in t)) && !((u in t));
    }, S = h("Date"), O = h("File"), A = h("Blob"), R = h("FileList"), N = h("URLSearchParams"), [I, B, T, k] = ["ReadableStream", "Request", "Response", "Headers"].map(h);
    function P(t, e, {allOwnKeys: n = !1} = {}) {
      if (null === t || "undefined" === typeof t) return;
      let r, i;
      if (("object" !== typeof t && (t = [t]), p(t))) for ((r = 0, i = t.length); r < i; r++) e.call(null, t[r], r, t); else {
        if (m(t)) return;
        const i = n ? Object.getOwnPropertyNames(t) : Object.keys(t), o = i.length;
        let s;
        for (r = 0; r < o; r++) (s = i[r], e.call(null, t[s], s, t));
      }
    }
    function U(t, e) {
      if (m(t)) return null;
      e = e.toLowerCase();
      const n = Object.keys(t);
      let r, i = n.length;
      for (; i-- > 0; ) if ((r = n[i], e === r.toLowerCase())) return r;
      return null;
    }
    const C = "undefined" !== typeof globalThis ? globalThis : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : global, _ = t => !g(t) && t !== C;
    const L = (F = "undefined" !== typeof Uint8Array && a(Uint8Array), t => F && t instanceof F);
    var F;
    const j = h("HTMLFormElement"), D = (({hasOwnProperty: t}) => (e, n) => t.call(e, n))(Object.prototype), z = h("RegExp"), V = (t, e) => {
      const n = Object.getOwnPropertyDescriptors(t), r = {};
      (P(n, (n, i) => {
        let o;
        !1 !== (o = e(n, i, t)) && (r[i] = o || n);
      }), Object.defineProperties(t, r));
    };
    const $ = h("AsyncFunction"), q = ((t, e) => {
      return t ? setImmediate : e ? (n = `axios@${Math.random()}`, r = [], C.addEventListener("message", ({source: t, data: e}) => {
        t === C && e === n && r.length && r.shift()();
      }, !1), t => {
        (r.push(t), C.postMessage(n, "*"));
      }) : t => setTimeout(t);
      var n, r;
    })("function" === typeof setImmediate, b(C.postMessage)), M = "undefined" !== typeof queueMicrotask ? queueMicrotask.bind(C) : "undefined" !== typeof o && o.nextTick || q;
    var H = {
      isArray: p,
      isArrayBuffer: y,
      isBuffer: m,
      isFormData: t => {
        let e;
        return t && ("function" === typeof FormData && t instanceof FormData || b(t.append) && ("formdata" === (e = l(t)) || "object" === e && b(t.toString) && "[object FormData]" === t.toString()));
      },
      isArrayBufferView: function (t) {
        let e;
        return (e = "undefined" !== typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(t) : t && t.buffer && y(t.buffer), e);
      },
      isString: w,
      isNumber: v,
      isBoolean: t => !0 === t || !1 === t,
      isObject: E,
      isPlainObject: x,
      isEmptyObject: t => {
        if (!E(t) || m(t)) return !1;
        try {
          return 0 === Object.keys(t).length && Object.getPrototypeOf(t) === Object.prototype;
        } catch (e) {
          return !1;
        }
      },
      isReadableStream: I,
      isRequest: B,
      isResponse: T,
      isHeaders: k,
      isUndefined: g,
      isDate: S,
      isFile: O,
      isBlob: A,
      isRegExp: z,
      isFunction: b,
      isStream: t => E(t) && b(t.pipe),
      isURLSearchParams: N,
      isTypedArray: L,
      isFileList: R,
      forEach: P,
      merge: function t() {
        const {caseless: e, skipUndefined: n} = _(this) && this || ({}), r = {}, i = (i, o) => {
          const s = e && U(r, o) || o;
          x(r[s]) && x(i) ? r[s] = t(r[s], i) : x(i) ? r[s] = t({}, i) : p(i) ? r[s] = i.slice() : n && g(i) || (r[s] = i);
        };
        for (let o = 0, s = arguments.length; o < s; o++) arguments[o] && P(arguments[o], i);
        return r;
      },
      extend: (t, e, n, {allOwnKeys: r} = {}) => (P(e, (e, r) => {
        n && b(e) ? t[r] = i(e, n) : t[r] = e;
      }, {
        allOwnKeys: r
      }), t),
      trim: t => t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""),
      stripBOM: t => (65279 === t.charCodeAt(0) && (t = t.slice(1)), t),
      inherits: (t, e, n, r) => {
        (t.prototype = Object.create(e.prototype, r), t.prototype.constructor = t, Object.defineProperty(t, "super", {
          value: e.prototype
        }), n && Object.assign(t.prototype, n));
      },
      toFlatObject: (t, e, n, r) => {
        let i, o, s;
        const u = {};
        if ((e = e || ({}), null == t)) return e;
        do {
          for ((i = Object.getOwnPropertyNames(t), o = i.length); o-- > 0; ) (s = i[o], r && !r(s, t, e) || u[s] || (e[s] = t[s], u[s] = !0));
          t = !1 !== n && a(t);
        } while (t && (!n || n(t, e)) && t !== Object.prototype);
        return e;
      },
      kindOf: l,
      kindOfTest: h,
      endsWith: (t, e, n) => {
        (t = String(t), (void 0 === n || n > t.length) && (n = t.length), n -= e.length);
        const r = t.indexOf(e, n);
        return -1 !== r && r === n;
      },
      toArray: t => {
        if (!t) return null;
        if (p(t)) return t;
        let e = t.length;
        if (!v(e)) return null;
        const n = new Array(e);
        for (; e-- > 0; ) n[e] = t[e];
        return n;
      },
      forEachEntry: (t, e) => {
        const n = (t && t[u]).call(t);
        let r;
        for (; (r = n.next()) && !r.done; ) {
          const n = r.value;
          e.call(t, n[0], n[1]);
        }
      },
      matchAll: (t, e) => {
        let n;
        const r = [];
        for (; null !== (n = t.exec(e)); ) r.push(n);
        return r;
      },
      isHTMLForm: j,
      hasOwnProperty: D,
      hasOwnProp: D,
      reduceDescriptors: V,
      freezeMethods: t => {
        V(t, (e, n) => {
          if (b(t) && -1 !== ["arguments", "caller", "callee"].indexOf(n)) return !1;
          const r = t[n];
          b(r) && (e.enumerable = !1, ("writable" in e) ? e.writable = !1 : e.set || (e.set = () => {
            throw Error("Can not rewrite read-only method '" + n + "'");
          }));
        });
      },
      toObjectSet: (t, e) => {
        const n = {}, r = t => {
          t.forEach(t => {
            n[t] = !0;
          });
        };
        return (p(t) ? r(t) : r(String(t).split(e)), n);
      },
      toCamelCase: t => t.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (t, e, n) {
        return e.toUpperCase() + n;
      }),
      noop: () => {},
      toFiniteNumber: (t, e) => null != t && Number.isFinite(t = +t) ? t : e,
      findKey: U,
      global: C,
      isContextDefined: _,
      isSpecCompliantForm: function (t) {
        return !!(t && b(t.append) && "FormData" === t[c] && t[u]);
      },
      toJSONObject: t => {
        const e = new Array(10), n = (t, r) => {
          if (E(t)) {
            if (e.indexOf(t) >= 0) return;
            if (m(t)) return t;
            if (!(("toJSON" in t))) {
              e[r] = t;
              const i = p(t) ? [] : {};
              return (P(t, (t, e) => {
                const o = n(t, r + 1);
                !g(o) && (i[e] = o);
              }), e[r] = void 0, i);
            }
          }
          return t;
        };
        return n(t, 0);
      },
      isAsyncFn: $,
      isThenable: t => t && (E(t) || b(t)) && b(t.then) && b(t.catch),
      setImmediate: q,
      asap: M,
      isIterable: t => null != t && b(t[u])
    };
    function K(t, e, n, r, i) {
      (Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = t, this.name = "AxiosError", e && (this.code = e), n && (this.config = n), r && (this.request = r), i && (this.response = i, this.status = i.status ? i.status : null));
    }
    H.inherits(K, Error, {
      toJSON: function () {
        return {
          message: this.message,
          name: this.name,
          description: this.description,
          number: this.number,
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          config: H.toJSONObject(this.config),
          code: this.code,
          status: this.status
        };
      }
    });
    const G = K.prototype, Z = {};
    (["ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED", "ERR_NOT_SUPPORT", "ERR_INVALID_URL"].forEach(t => {
      Z[t] = {
        value: t
      };
    }), Object.defineProperties(K, Z), Object.defineProperty(G, "isAxiosError", {
      value: !0
    }), K.from = (t, e, n, r, i, o) => {
      const s = Object.create(G);
      H.toFlatObject(t, s, function (t) {
        return t !== Error.prototype;
      }, t => "isAxiosError" !== t);
      const a = t && t.message ? t.message : "Error", u = null == e && t ? t.code : e;
      return (K.call(s, a, u, n, r, i), t && null == s.cause && Object.defineProperty(s, "cause", {
        value: t,
        configurable: !0
      }), s.name = t && t.name || "Error", o && Object.assign(s, o), s);
    });
    var J = K, W = n(82957).Buffer;
    function Y(t) {
      return H.isPlainObject(t) || H.isArray(t);
    }
    function X(t) {
      return H.endsWith(t, "[]") ? t.slice(0, -2) : t;
    }
    function Q(t, e, n) {
      return t ? t.concat(e).map(function (t, e) {
        return (t = X(t), !n && e ? "[" + t + "]" : t);
      }).join(n ? "." : "") : e;
    }
    const tt = H.toFlatObject(H, {}, null, function (t) {
      return (/^is[A-Z]/).test(t);
    });
    var et = function (t, e, n) {
      if (!H.isObject(t)) throw new TypeError("target must be an object");
      e = e || new FormData();
      const r = (n = H.toFlatObject(n, {
        metaTokens: !0,
        dots: !1,
        indexes: !1
      }, !1, function (t, e) {
        return !H.isUndefined(e[t]);
      })).metaTokens, i = n.visitor || c, o = n.dots, s = n.indexes, a = (n.Blob || "undefined" !== typeof Blob && Blob) && H.isSpecCompliantForm(e);
      if (!H.isFunction(i)) throw new TypeError("visitor must be a function");
      function u(t) {
        if (null === t) return "";
        if (H.isDate(t)) return t.toISOString();
        if (H.isBoolean(t)) return t.toString();
        if (!a && H.isBlob(t)) throw new J("Blob is not supported. Use a Buffer instead.");
        return H.isArrayBuffer(t) || H.isTypedArray(t) ? a && "function" === typeof Blob ? new Blob([t]) : W.from(t) : t;
      }
      function c(t, n, i) {
        let a = t;
        if (t && !i && "object" === typeof t) if (H.endsWith(n, "{}")) (n = r ? n : n.slice(0, -2), t = JSON.stringify(t)); else if (H.isArray(t) && (function (t) {
          return H.isArray(t) && !t.some(Y);
        })(t) || (H.isFileList(t) || H.endsWith(n, "[]")) && (a = H.toArray(t))) return (n = X(n), a.forEach(function (t, r) {
          !H.isUndefined(t) && null !== t && e.append(!0 === s ? Q([n], r, o) : null === s ? n : n + "[]", u(t));
        }), !1);
        return !!Y(t) || (e.append(Q(i, n, o), u(t)), !1);
      }
      const l = [], f = Object.assign(tt, {
        defaultVisitor: c,
        convertValue: u,
        isVisitable: Y
      });
      if (!H.isObject(t)) throw new TypeError("data must be an object");
      return ((function t(n, r) {
        if (!H.isUndefined(n)) {
          if (-1 !== l.indexOf(n)) throw Error("Circular reference detected in " + r.join("."));
          (l.push(n), H.forEach(n, function (n, o) {
            !0 === (!(H.isUndefined(n) || null === n) && i.call(e, n, H.isString(o) ? o.trim() : o, r, f)) && t(n, r ? r.concat(o) : [o]);
          }), l.pop());
        }
      })(t), e);
    };
    function nt(t) {
      const e = {
        "!": "%21",
        "'": "%27",
        "(": "%28",
        ")": "%29",
        "~": "%7E",
        "%20": "+",
        "%00": "\u0000"
      };
      return encodeURIComponent(t).replace(/[!'()~]|%20|%00/g, function (t) {
        return e[t];
      });
    }
    function rt(t, e) {
      (this._pairs = [], t && et(t, this, e));
    }
    const it = rt.prototype;
    (it.append = function (t, e) {
      this._pairs.push([t, e]);
    }, it.toString = function (t) {
      const e = t ? function (e) {
        return t.call(this, e, nt);
      } : nt;
      return this._pairs.map(function (t) {
        return e(t[0]) + "=" + e(t[1]);
      }, "").join("&");
    });
    var ot = rt;
    function st(t) {
      return encodeURIComponent(t).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
    }
    function at(t, e, n) {
      if (!e) return t;
      const r = n && n.encode || st;
      H.isFunction(n) && (n = {
        serialize: n
      });
      const i = n && n.serialize;
      let o;
      if ((o = i ? i(e, n) : H.isURLSearchParams(e) ? e.toString() : new ot(e, n).toString(r), o)) {
        const e = t.indexOf("#");
        (-1 !== e && (t = t.slice(0, e)), t += (-1 === t.indexOf("?") ? "?" : "&") + o);
      }
      return t;
    }
    var ut = class {
      constructor() {
        this.handlers = [];
      }
      use(t, e, n) {
        return (this.handlers.push({
          fulfilled: t,
          rejected: e,
          synchronous: !!n && n.synchronous,
          runWhen: n ? n.runWhen : null
        }), this.handlers.length - 1);
      }
      eject(t) {
        this.handlers[t] && (this.handlers[t] = null);
      }
      clear() {
        this.handlers && (this.handlers = []);
      }
      forEach(t) {
        H.forEach(this.handlers, function (e) {
          null !== e && t(e);
        });
      }
    }, ct = {
      silentJSONParsing: !0,
      forcedJSONParsing: !0,
      clarifyTimeoutError: !1
    }, lt = {
      isBrowser: !0,
      classes: {
        URLSearchParams: "undefined" !== typeof URLSearchParams ? URLSearchParams : ot,
        FormData: "undefined" !== typeof FormData ? FormData : null,
        Blob: "undefined" !== typeof Blob ? Blob : null
      },
      protocols: ["http", "https", "file", "blob", "url", "data"]
    };
    const ft = "undefined" !== typeof window && "undefined" !== typeof document, ht = "object" === typeof navigator && navigator || void 0, dt = ft && (!ht || ["ReactNative", "NativeScript", "NS"].indexOf(ht.product) < 0), pt = "undefined" !== typeof WorkerGlobalScope && self instanceof WorkerGlobalScope && "function" === typeof self.importScripts, gt = ft && window.location.href || "http://localhost";
    var mt = {
      ...r,
      ...lt
    };
    var yt = function (t) {
      function e(t, n, r, i) {
        let o = t[i++];
        if ("__proto__" === o) return !0;
        const s = Number.isFinite(+o), a = i >= t.length;
        if ((o = !o && H.isArray(r) ? r.length : o, a)) return (H.hasOwnProp(r, o) ? r[o] = [r[o], n] : r[o] = n, !s);
        r[o] && H.isObject(r[o]) || (r[o] = []);
        return (e(t, n, r[o], i) && H.isArray(r[o]) && (r[o] = (function (t) {
          const e = {}, n = Object.keys(t);
          let r;
          const i = n.length;
          let o;
          for (r = 0; r < i; r++) (o = n[r], e[o] = t[o]);
          return e;
        })(r[o])), !s);
      }
      if (H.isFormData(t) && H.isFunction(t.entries)) {
        const n = {};
        return (H.forEachEntry(t, (t, r) => {
          e((function (t) {
            return H.matchAll(/\w+|\[(\w*)]/g, t).map(t => "[]" === t[0] ? "" : t[1] || t[0]);
          })(t), r, n, 0);
        }), n);
      }
      return null;
    };
    const wt = {
      transitional: ct,
      adapter: ["xhr", "http", "fetch"],
      transformRequest: [function (t, e) {
        const n = e.getContentType() || "", r = n.indexOf("application/json") > -1, i = H.isObject(t);
        i && H.isHTMLForm(t) && (t = new FormData(t));
        if (H.isFormData(t)) return r ? JSON.stringify(yt(t)) : t;
        if (H.isArrayBuffer(t) || H.isBuffer(t) || H.isStream(t) || H.isFile(t) || H.isBlob(t) || H.isReadableStream(t)) return t;
        if (H.isArrayBufferView(t)) return t.buffer;
        if (H.isURLSearchParams(t)) return (e.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString());
        let o;
        if (i) {
          if (n.indexOf("application/x-www-form-urlencoded") > -1) return (function (t, e) {
            return et(t, new mt.classes.URLSearchParams(), {
              visitor: function (t, e, n, r) {
                return mt.isNode && H.isBuffer(t) ? (this.append(e, t.toString("base64")), !1) : r.defaultVisitor.apply(this, arguments);
              },
              ...e
            });
          })(t, this.formSerializer).toString();
          if ((o = H.isFileList(t)) || n.indexOf("multipart/form-data") > -1) {
            const e = this.env && this.env.FormData;
            return et(o ? {
              "files[]": t
            } : t, e && new e(), this.formSerializer);
          }
        }
        return i || r ? (e.setContentType("application/json", !1), (function (t, e, n) {
          if (H.isString(t)) try {
            return ((e || JSON.parse)(t), H.trim(t));
          } catch (r) {
            if ("SyntaxError" !== r.name) throw r;
          }
          return (n || JSON.stringify)(t);
        })(t)) : t;
      }],
      transformResponse: [function (t) {
        const e = this.transitional || wt.transitional, n = e && e.forcedJSONParsing, r = "json" === this.responseType;
        if (H.isResponse(t) || H.isReadableStream(t)) return t;
        if (t && H.isString(t) && (n && !this.responseType || r)) {
          const n = !(e && e.silentJSONParsing) && r;
          try {
            return JSON.parse(t, this.parseReviver);
          } catch (i) {
            if (n) {
              if ("SyntaxError" === i.name) throw J.from(i, J.ERR_BAD_RESPONSE, this, null, this.response);
              throw i;
            }
          }
        }
        return t;
      }],
      timeout: 0,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      maxContentLength: -1,
      maxBodyLength: -1,
      env: {
        FormData: mt.classes.FormData,
        Blob: mt.classes.Blob
      },
      validateStatus: function (t) {
        return t >= 200 && t < 300;
      },
      headers: {
        common: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": void 0
        }
      }
    };
    H.forEach(["delete", "get", "head", "post", "put", "patch"], t => {
      wt.headers[t] = {};
    });
    var bt = wt;
    const vt = H.toObjectSet(["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"]);
    const Et = Symbol("internals");
    function xt(t) {
      return t && String(t).trim().toLowerCase();
    }
    function St(t) {
      return !1 === t || null == t ? t : H.isArray(t) ? t.map(St) : String(t);
    }
    function Ot(t, e, n, r, i) {
      return H.isFunction(r) ? r.call(this, e, n) : (i && (e = n), H.isString(e) ? H.isString(r) ? -1 !== e.indexOf(r) : H.isRegExp(r) ? r.test(e) : void 0 : void 0);
    }
    class At {
      constructor(t) {
        t && this.set(t);
      }
      set(t, e, n) {
        const r = this;
        function i(t, e, n) {
          const i = xt(e);
          if (!i) throw new Error("header name must be a non-empty string");
          const o = H.findKey(r, i);
          (!o || void 0 === r[o] || !0 === n || void 0 === n && !1 !== r[o]) && (r[o || e] = St(t));
        }
        const o = (t, e) => H.forEach(t, (t, n) => i(t, n, e));
        if (H.isPlainObject(t) || t instanceof this.constructor) o(t, e); else if (H.isString(t) && (t = t.trim()) && !(/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/).test(t.trim())) o((t => {
          const e = {};
          let n, r, i;
          return (t && t.split("\n").forEach(function (t) {
            (i = t.indexOf(":"), n = t.substring(0, i).trim().toLowerCase(), r = t.substring(i + 1).trim(), !n || e[n] && vt[n] || ("set-cookie" === n ? e[n] ? e[n].push(r) : e[n] = [r] : e[n] = e[n] ? e[n] + ", " + r : r));
          }), e);
        })(t), e); else if (H.isObject(t) && H.isIterable(t)) {
          let n, r, i = {};
          for (const e of t) {
            if (!H.isArray(e)) throw TypeError("Object iterator must return a key-value pair");
            i[r = e[0]] = (n = i[r]) ? H.isArray(n) ? [...n, e[1]] : [n, e[1]] : e[1];
          }
          o(i, e);
        } else null != t && i(e, t, n);
        return this;
      }
      get(t, e) {
        if (t = xt(t)) {
          const n = H.findKey(this, t);
          if (n) {
            const t = this[n];
            if (!e) return t;
            if (!0 === e) return (function (t) {
              const e = Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
              let r;
              for (; r = n.exec(t); ) e[r[1]] = r[2];
              return e;
            })(t);
            if (H.isFunction(e)) return e.call(this, t, n);
            if (H.isRegExp(e)) return e.exec(t);
            throw new TypeError("parser must be boolean|regexp|function");
          }
        }
      }
      has(t, e) {
        if (t = xt(t)) {
          const n = H.findKey(this, t);
          return !(!n || void 0 === this[n] || e && !Ot(0, this[n], n, e));
        }
        return !1;
      }
      delete(t, e) {
        const n = this;
        let r = !1;
        function i(t) {
          if (t = xt(t)) {
            const i = H.findKey(n, t);
            !i || e && !Ot(0, n[i], i, e) || (delete n[i], r = !0);
          }
        }
        return (H.isArray(t) ? t.forEach(i) : i(t), r);
      }
      clear(t) {
        const e = Object.keys(this);
        let n = e.length, r = !1;
        for (; n--; ) {
          const i = e[n];
          t && !Ot(0, this[i], i, t, !0) || (delete this[i], r = !0);
        }
        return r;
      }
      normalize(t) {
        const e = this, n = {};
        return (H.forEach(this, (r, i) => {
          const o = H.findKey(n, i);
          if (o) return (e[o] = St(r), void delete e[i]);
          const s = t ? (function (t) {
            return t.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, e, n) => e.toUpperCase() + n);
          })(i) : String(i).trim();
          (s !== i && delete e[i], e[s] = St(r), n[s] = !0);
        }), this);
      }
      concat(...t) {
        return this.constructor.concat(this, ...t);
      }
      toJSON(t) {
        const e = Object.create(null);
        return (H.forEach(this, (n, r) => {
          null != n && !1 !== n && (e[r] = t && H.isArray(n) ? n.join(", ") : n);
        }), e);
      }
      [Symbol.iterator]() {
        return Object.entries(this.toJSON())[Symbol.iterator]();
      }
      toString() {
        return Object.entries(this.toJSON()).map(([t, e]) => t + ": " + e).join("\n");
      }
      getSetCookie() {
        return this.get("set-cookie") || [];
      }
      get [Symbol.toStringTag]() {
        return "AxiosHeaders";
      }
      static from(t) {
        return t instanceof this ? t : new this(t);
      }
      static concat(t, ...e) {
        const n = new this(t);
        return (e.forEach(t => n.set(t)), n);
      }
      static accessor(t) {
        const e = (this[Et] = this[Et] = {
          accessors: {}
        }).accessors, n = this.prototype;
        function r(t) {
          const r = xt(t);
          e[r] || (!(function (t, e) {
            const n = H.toCamelCase(" " + e);
            ["get", "set", "has"].forEach(r => {
              Object.defineProperty(t, r + n, {
                value: function (t, n, i) {
                  return this[r].call(this, e, t, n, i);
                },
                configurable: !0
              });
            });
          })(n, t), e[r] = !0);
        }
        return (H.isArray(t) ? t.forEach(r) : r(t), this);
      }
    }
    (At.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]), H.reduceDescriptors(At.prototype, ({value: t}, e) => {
      let n = e[0].toUpperCase() + e.slice(1);
      return {
        get: () => t,
        set(t) {
          this[n] = t;
        }
      };
    }), H.freezeMethods(At));
    var Rt = At;
    function Nt(t, e) {
      const n = this || bt, r = e || n, i = Rt.from(r.headers);
      let o = r.data;
      return (H.forEach(t, function (t) {
        o = t.call(n, o, i.normalize(), e ? e.status : void 0);
      }), i.normalize(), o);
    }
    function It(t) {
      return !(!t || !t.__CANCEL__);
    }
    function Bt(t, e, n) {
      (J.call(this, null == t ? "canceled" : t, J.ERR_CANCELED, e, n), this.name = "CanceledError");
    }
    H.inherits(Bt, J, {
      __CANCEL__: !0
    });
    var Tt = Bt;
    function kt(t, e, n) {
      const r = n.config.validateStatus;
      n.status && r && !r(n.status) ? e(new J("Request failed with status code " + n.status, [J.ERR_BAD_REQUEST, J.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4], n.config, n.request, n)) : t(n);
    }
    var Pt = function (t, e) {
      t = t || 10;
      const n = new Array(t), r = new Array(t);
      let i, o = 0, s = 0;
      return (e = void 0 !== e ? e : 1000, function (a) {
        const u = Date.now(), c = r[s];
        (i || (i = u), n[o] = a, r[o] = u);
        let l = s, f = 0;
        for (; l !== o; ) (f += n[l++], l %= t);
        if ((o = (o + 1) % t, o === s && (s = (s + 1) % t), u - i < e)) return;
        const h = c && u - c;
        return h ? Math.round(1000 * f / h) : void 0;
      });
    };
    var Ut = function (t, e) {
      let n, r, i = 0, o = 1000 / e;
      const s = (e, o = Date.now()) => {
        (i = o, n = null, r && (clearTimeout(r), r = null), t(...e));
      };
      return [(...t) => {
        const e = Date.now(), a = e - i;
        a >= o ? s(t, e) : (n = t, r || (r = setTimeout(() => {
          (r = null, s(n));
        }, o - a)));
      }, () => n && s(n)];
    };
    const Ct = (t, e, n = 3) => {
      let r = 0;
      const i = Pt(50, 250);
      return Ut(n => {
        const o = n.loaded, s = n.lengthComputable ? n.total : void 0, a = o - r, u = i(a);
        r = o;
        t({
          loaded: o,
          total: s,
          progress: s ? o / s : void 0,
          bytes: a,
          rate: u || void 0,
          estimated: u && s && o <= s ? (s - o) / u : void 0,
          event: n,
          lengthComputable: null != s,
          [e ? "download" : "upload"]: !0
        });
      }, n);
    }, _t = (t, e) => {
      const n = null != t;
      return [r => e[0]({
        lengthComputable: n,
        total: t,
        loaded: r
      }), e[1]];
    }, Lt = t => (...e) => H.asap(() => t(...e));
    var Ft = mt.hasStandardBrowserEnv ? ((t, e) => n => (n = new URL(n, mt.origin), t.protocol === n.protocol && t.host === n.host && (e || t.port === n.port)))(new URL(mt.origin), mt.navigator && (/(msie|trident)/i).test(mt.navigator.userAgent)) : () => !0, jt = mt.hasStandardBrowserEnv ? {
      write(t, e, n, r, i, o) {
        const s = [t + "=" + encodeURIComponent(e)];
        (H.isNumber(n) && s.push("expires=" + new Date(n).toGMTString()), H.isString(r) && s.push("path=" + r), H.isString(i) && s.push("domain=" + i), !0 === o && s.push("secure"), document.cookie = s.join("; "));
      },
      read(t) {
        const e = document.cookie.match(new RegExp("(^|;\\s*)(" + t + ")=([^;]*)"));
        return e ? decodeURIComponent(e[3]) : null;
      },
      remove(t) {
        this.write(t, "", Date.now() - 86400000);
      }
    } : {
      write() {},
      read: () => null,
      remove() {}
    };
    function Dt(t, e, n) {
      let r = !(/^([a-z][a-z\d+\-.]*:)?\/\//i).test(e);
      return t && (r || 0 == n) ? (function (t, e) {
        return e ? t.replace(/\/?\/$/, "") + "/" + e.replace(/^\/+/, "") : t;
      })(t, e) : e;
    }
    const zt = t => t instanceof Rt ? {
      ...t
    } : t;
    function Vt(t, e) {
      e = e || ({});
      const n = {};
      function r(t, e, n, r) {
        return H.isPlainObject(t) && H.isPlainObject(e) ? H.merge.call({
          caseless: r
        }, t, e) : H.isPlainObject(e) ? H.merge({}, e) : H.isArray(e) ? e.slice() : e;
      }
      function i(t, e, n, i) {
        return H.isUndefined(e) ? H.isUndefined(t) ? void 0 : r(void 0, t, 0, i) : r(t, e, 0, i);
      }
      function o(t, e) {
        if (!H.isUndefined(e)) return r(void 0, e);
      }
      function s(t, e) {
        return H.isUndefined(e) ? H.isUndefined(t) ? void 0 : r(void 0, t) : r(void 0, e);
      }
      function a(n, i, o) {
        return (o in e) ? r(n, i) : (o in t) ? r(void 0, n) : void 0;
      }
      const u = {
        url: o,
        method: o,
        data: o,
        baseURL: s,
        transformRequest: s,
        transformResponse: s,
        paramsSerializer: s,
        timeout: s,
        timeoutMessage: s,
        withCredentials: s,
        withXSRFToken: s,
        adapter: s,
        responseType: s,
        xsrfCookieName: s,
        xsrfHeaderName: s,
        onUploadProgress: s,
        onDownloadProgress: s,
        decompress: s,
        maxContentLength: s,
        maxBodyLength: s,
        beforeRedirect: s,
        transport: s,
        httpAgent: s,
        httpsAgent: s,
        cancelToken: s,
        socketPath: s,
        responseEncoding: s,
        validateStatus: a,
        headers: (t, e, n) => i(zt(t), zt(e), 0, !0)
      };
      return (H.forEach(Object.keys({
        ...t,
        ...e
      }), function (r) {
        const o = u[r] || i, s = o(t[r], e[r], r);
        H.isUndefined(s) && o !== a || (n[r] = s);
      }), n);
    }
    var $t = t => {
      const e = Vt({}, t);
      let {data: n, withXSRFToken: r, xsrfHeaderName: i, xsrfCookieName: o, headers: s, auth: a} = e;
      if ((e.headers = s = Rt.from(s), e.url = at(Dt(e.baseURL, e.url, e.allowAbsoluteUrls), t.params, t.paramsSerializer), a && s.set("Authorization", "Basic " + btoa((a.username || "") + ":" + (a.password ? unescape(encodeURIComponent(a.password)) : ""))), H.isFormData(n))) if (mt.hasStandardBrowserEnv || mt.hasStandardBrowserWebWorkerEnv) s.setContentType(void 0); else if (H.isFunction(n.getHeaders)) {
        const t = n.getHeaders(), e = ["content-type", "content-length"];
        Object.entries(t).forEach(([t, n]) => {
          e.includes(t.toLowerCase()) && s.set(t, n);
        });
      }
      if (mt.hasStandardBrowserEnv && (r && H.isFunction(r) && (r = r(e)), r || !1 !== r && Ft(e.url))) {
        const t = i && o && jt.read(o);
        t && s.set(i, t);
      }
      return e;
    };
    var qt = "undefined" !== typeof XMLHttpRequest && (function (t) {
      return new Promise(function (e, n) {
        const r = $t(t);
        let i = r.data;
        const o = Rt.from(r.headers).normalize();
        let s, a, u, c, l, {responseType: f, onUploadProgress: h, onDownloadProgress: d} = r;
        function p() {
          (c && c(), l && l(), r.cancelToken && r.cancelToken.unsubscribe(s), r.signal && r.signal.removeEventListener("abort", s));
        }
        let g = new XMLHttpRequest();
        function m() {
          if (!g) return;
          const r = Rt.from(("getAllResponseHeaders" in g) && g.getAllResponseHeaders());
          (kt(function (t) {
            (e(t), p());
          }, function (t) {
            (n(t), p());
          }, {
            data: f && "text" !== f && "json" !== f ? g.response : g.responseText,
            status: g.status,
            statusText: g.statusText,
            headers: r,
            config: t,
            request: g
          }), g = null);
        }
        (g.open(r.method.toUpperCase(), r.url, !0), g.timeout = r.timeout, ("onloadend" in g) ? g.onloadend = m : g.onreadystatechange = function () {
          g && 4 === g.readyState && (0 !== g.status || g.responseURL && 0 === g.responseURL.indexOf("file:")) && setTimeout(m);
        }, g.onabort = function () {
          g && (n(new J("Request aborted", J.ECONNABORTED, t, g)), g = null);
        }, g.onerror = function (e) {
          const r = e && e.message ? e.message : "Network Error", i = new J(r, J.ERR_NETWORK, t, g);
          (i.event = e || null, n(i), g = null);
        }, g.ontimeout = function () {
          let e = r.timeout ? "timeout of " + r.timeout + "ms exceeded" : "timeout exceeded";
          const i = r.transitional || ct;
          (r.timeoutErrorMessage && (e = r.timeoutErrorMessage), n(new J(e, i.clarifyTimeoutError ? J.ETIMEDOUT : J.ECONNABORTED, t, g)), g = null);
        }, void 0 === i && o.setContentType(null), ("setRequestHeader" in g) && H.forEach(o.toJSON(), function (t, e) {
          g.setRequestHeader(e, t);
        }), H.isUndefined(r.withCredentials) || (g.withCredentials = !!r.withCredentials), f && "json" !== f && (g.responseType = r.responseType), d && ([u, l] = Ct(d, !0), g.addEventListener("progress", u)), h && g.upload && ([a, c] = Ct(h), g.upload.addEventListener("progress", a), g.upload.addEventListener("loadend", c)), (r.cancelToken || r.signal) && (s = e => {
          g && (n(!e || e.type ? new Tt(null, t, g) : e), g.abort(), g = null);
        }, r.cancelToken && r.cancelToken.subscribe(s), r.signal && (r.signal.aborted ? s() : r.signal.addEventListener("abort", s))));
        const y = (function (t) {
          const e = (/^([-+\w]{1,25})(:?\/\/|:)/).exec(t);
          return e && e[1] || "";
        })(r.url);
        y && -1 === mt.protocols.indexOf(y) ? n(new J("Unsupported protocol " + y + ":", J.ERR_BAD_REQUEST, t)) : g.send(i || null);
      });
    });
    var Mt = (t, e) => {
      const {length: n} = t = t ? t.filter(Boolean) : [];
      if (e || n) {
        let n, r = new AbortController();
        const i = function (t) {
          if (!n) {
            (n = !0, s());
            const e = t instanceof Error ? t : this.reason;
            r.abort(e instanceof J ? e : new Tt(e instanceof Error ? e.message : e));
          }
        };
        let o = e && setTimeout(() => {
          (o = null, i(new J(`timeout ${e} of ms exceeded`, J.ETIMEDOUT)));
        }, e);
        const s = () => {
          t && (o && clearTimeout(o), o = null, t.forEach(t => {
            t.unsubscribe ? t.unsubscribe(i) : t.removeEventListener("abort", i);
          }), t = null);
        };
        t.forEach(t => t.addEventListener("abort", i));
        const {signal: a} = r;
        return (a.unsubscribe = () => H.asap(s), a);
      }
    };
    const Ht = function* (t, e) {
      let n = t.byteLength;
      if (!e || n < e) return void (yield t);
      let r, i = 0;
      for (; i < n; ) (r = i + e, yield t.slice(i, r), i = r);
    }, Kt = async function* (t) {
      if (t[Symbol.asyncIterator]) return void (yield* t);
      const e = t.getReader();
      try {
        for (; ; ) {
          const {done: t, value: n} = await e.read();
          if (t) break;
          yield n;
        }
      } finally {
        await e.cancel();
      }
    }, Gt = (t, e, n, r) => {
      const i = (async function* (t, e) {
        for await (const n of Kt(t)) yield* Ht(n, e);
      })(t, e);
      let o, s = 0, a = t => {
        o || (o = !0, r && r(t));
      };
      return new ReadableStream({
        async pull(t) {
          try {
            const {done: e, value: r} = await i.next();
            if (e) return (a(), void t.close());
            let o = r.byteLength;
            if (n) {
              let t = s += o;
              n(t);
            }
            t.enqueue(new Uint8Array(r));
          } catch (e) {
            throw (a(e), e);
          }
        },
        cancel: t => (a(t), i.return())
      }, {
        highWaterMark: 2
      });
    }, {isFunction: Zt} = H, Jt = (({Request: t, Response: e}) => ({
      Request: t,
      Response: e
    }))(H.global), {ReadableStream: Wt, TextEncoder: Yt} = H.global, Xt = (t, ...e) => {
      try {
        return !!t(...e);
      } catch (n) {
        return !1;
      }
    }, Qt = t => {
      t = H.merge.call({
        skipUndefined: !0
      }, Jt, t);
      const {fetch: e, Request: n, Response: r} = t, i = e ? Zt(e) : "function" === typeof fetch, o = Zt(n), s = Zt(r);
      if (!i) return !1;
      const a = i && Zt(Wt), u = i && ("function" === typeof Yt ? (c = new Yt(), t => c.encode(t)) : async t => new Uint8Array(await new n(t).arrayBuffer()));
      var c;
      const l = o && a && Xt(() => {
        let t = !1;
        const e = new n(mt.origin, {
          body: new Wt(),
          method: "POST",
          get duplex() {
            return (t = !0, "half");
          }
        }).headers.has("Content-Type");
        return t && !e;
      }), f = s && a && Xt(() => H.isReadableStream(new r("").body)), h = {
        stream: f && (t => t.body)
      };
      i && ["text", "arrayBuffer", "blob", "formData", "stream"].forEach(t => {
        !h[t] && (h[t] = (e, n) => {
          let r = e && e[t];
          if (r) return r.call(e);
          throw new J(`Response type '${t}' is not supported`, J.ERR_NOT_SUPPORT, n);
        });
      });
      const d = async (t, e) => {
        const r = H.toFiniteNumber(t.getContentLength());
        return null == r ? (async t => {
          if (null == t) return 0;
          if (H.isBlob(t)) return t.size;
          if (H.isSpecCompliantForm(t)) {
            const e = new n(mt.origin, {
              method: "POST",
              body: t
            });
            return (await e.arrayBuffer()).byteLength;
          }
          return H.isArrayBufferView(t) || H.isArrayBuffer(t) ? t.byteLength : (H.isURLSearchParams(t) && (t += ""), H.isString(t) ? (await u(t)).byteLength : void 0);
        })(e) : r;
      };
      return async t => {
        let {url: i, method: s, data: a, signal: u, cancelToken: c, timeout: p, onDownloadProgress: g, onUploadProgress: m, responseType: y, headers: w, withCredentials: b = "same-origin", fetchOptions: v} = $t(t), E = e || fetch;
        y = y ? (y + "").toLowerCase() : "text";
        let x = Mt([u, c && c.toAbortSignal()], p), S = null;
        const O = x && x.unsubscribe && (() => {
          x.unsubscribe();
        });
        let A;
        try {
          if (m && l && "get" !== s && "head" !== s && 0 !== (A = await d(w, a))) {
            let t, e = new n(i, {
              method: "POST",
              body: a,
              duplex: "half"
            });
            if ((H.isFormData(a) && (t = e.headers.get("content-type")) && w.setContentType(t), e.body)) {
              const [t, n] = _t(A, Ct(Lt(m)));
              a = Gt(e.body, 65536, t, n);
            }
          }
          H.isString(b) || (b = b ? "include" : "omit");
          const e = o && ("credentials" in n.prototype), u = {
            ...v,
            signal: x,
            method: s.toUpperCase(),
            headers: w.normalize().toJSON(),
            body: a,
            duplex: "half",
            credentials: e ? b : void 0
          };
          S = o && new n(i, u);
          let c = await (o ? E(S, v) : E(i, u));
          const p = f && ("stream" === y || "response" === y);
          if (f && (g || p && O)) {
            const t = {};
            ["status", "statusText", "headers"].forEach(e => {
              t[e] = c[e];
            });
            const e = H.toFiniteNumber(c.headers.get("content-length")), [n, i] = g && _t(e, Ct(Lt(g), !0)) || [];
            c = new r(Gt(c.body, 65536, n, () => {
              (i && i(), O && O());
            }), t);
          }
          y = y || "text";
          let R = await h[H.findKey(h, y) || "text"](c, t);
          return (!p && O && O(), await new Promise((e, n) => {
            kt(e, n, {
              data: R,
              headers: Rt.from(c.headers),
              status: c.status,
              statusText: c.statusText,
              config: t,
              request: S
            });
          }));
        } catch (R) {
          if ((O && O(), R && "TypeError" === R.name && (/Load failed|fetch/i).test(R.message))) throw Object.assign(new J("Network Error", J.ERR_NETWORK, t, S), {
            cause: R.cause || R
          });
          throw J.from(R, R && R.code, t, S);
        }
      };
    }, te = new Map(), ee = t => {
      let e = t ? t.env : {};
      const {fetch: n, Request: r, Response: i} = e, o = [r, i, n];
      let s, a, u = o.length, c = te;
      for (; u--; ) (s = o[u], a = c.get(s), void 0 === a && c.set(s, a = u ? new Map() : Qt(e)), c = a);
      return a;
    };
    ee();
    const ne = {
      http: null,
      xhr: qt,
      fetch: {
        get: ee
      }
    };
    H.forEach(ne, (t, e) => {
      if (t) {
        try {
          Object.defineProperty(t, "name", {
            value: e
          });
        } catch (n) {}
        Object.defineProperty(t, "adapterName", {
          value: e
        });
      }
    });
    const re = t => `- ${t}`, ie = t => H.isFunction(t) || null === t || !1 === t;
    var oe = (t, e) => {
      t = H.isArray(t) ? t : [t];
      const {length: n} = t;
      let r, i;
      const o = {};
      for (let s = 0; s < n; s++) {
        let n;
        if ((r = t[s], i = r, !ie(r) && (i = ne[(n = String(r)).toLowerCase()], void 0 === i))) throw new J(`Unknown adapter '${n}'`);
        if (i && (H.isFunction(i) || (i = i.get(e)))) break;
        o[n || "#" + s] = i;
      }
      if (!i) {
        const t = Object.entries(o).map(([t, e]) => `adapter ${t} ` + (!1 === e ? "is not supported by the environment" : "is not available in the build"));
        let e = n ? t.length > 1 ? "since :\n" + t.map(re).join("\n") : " " + re(t[0]) : "as no adapter specified";
        throw new J("There is no suitable adapter to dispatch the request " + e, "ERR_NOT_SUPPORT");
      }
      return i;
    };
    function se(t) {
      if ((t.cancelToken && t.cancelToken.throwIfRequested(), t.signal && t.signal.aborted)) throw new Tt(null, t);
    }
    function ae(t) {
      (se(t), t.headers = Rt.from(t.headers), t.data = Nt.call(t, t.transformRequest), -1 !== ["post", "put", "patch"].indexOf(t.method) && t.headers.setContentType("application/x-www-form-urlencoded", !1));
      return oe(t.adapter || bt.adapter, t)(t).then(function (e) {
        return (se(t), e.data = Nt.call(t, t.transformResponse, e), e.headers = Rt.from(e.headers), e);
      }, function (e) {
        return (It(e) || (se(t), e && e.response && (e.response.data = Nt.call(t, t.transformResponse, e.response), e.response.headers = Rt.from(e.response.headers))), Promise.reject(e));
      });
    }
    const ue = "1.12.2", ce = {};
    ["object", "boolean", "number", "function", "string", "symbol"].forEach((t, e) => {
      ce[t] = function (n) {
        return typeof n === t || "a" + (e < 1 ? "n " : " ") + t;
      };
    });
    const le = {};
    (ce.transitional = function (t, e, n) {
      function r(t, e) {
        return "[Axios v" + ue + "] Transitional option '" + t + "'" + e + (n ? ". " + n : "");
      }
      return (n, i, o) => {
        if (!1 === t) throw new J(r(i, " has been removed" + (e ? " in " + e : "")), J.ERR_DEPRECATED);
        return (e && !le[i] && (le[i] = !0, console.warn(r(i, " has been deprecated since v" + e + " and will be removed in the near future"))), !t || t(n, i, o));
      };
    }, ce.spelling = function (t) {
      return (e, n) => (console.warn(`${n} is likely a misspelling of ${t}`), !0);
    });
    var fe = {
      assertOptions: function (t, e, n) {
        if ("object" !== typeof t) throw new J("options must be an object", J.ERR_BAD_OPTION_VALUE);
        const r = Object.keys(t);
        let i = r.length;
        for (; i-- > 0; ) {
          const o = r[i], s = e[o];
          if (s) {
            const e = t[o], n = void 0 === e || s(e, o, t);
            if (!0 !== n) throw new J("option " + o + " must be " + n, J.ERR_BAD_OPTION_VALUE);
          } else if (!0 !== n) throw new J("Unknown option " + o, J.ERR_BAD_OPTION);
        }
      },
      validators: ce
    };
    const he = fe.validators;
    class de {
      constructor(t) {
        (this.defaults = t || ({}), this.interceptors = {
          request: new ut(),
          response: new ut()
        });
      }
      async request(t, e) {
        try {
          return await this._request(t, e);
        } catch (n) {
          if (n instanceof Error) {
            let t = {};
            Error.captureStackTrace ? Error.captureStackTrace(t) : t = new Error();
            const e = t.stack ? t.stack.replace(/^.+\n/, "") : "";
            try {
              n.stack ? e && !String(n.stack).endsWith(e.replace(/^.+\n.+\n/, "")) && (n.stack += "\n" + e) : n.stack = e;
            } catch (r) {}
          }
          throw n;
        }
      }
      _request(t, e) {
        ("string" === typeof t ? (e = e || ({})).url = t : e = t || ({}), e = Vt(this.defaults, e));
        const {transitional: n, paramsSerializer: r, headers: i} = e;
        (void 0 !== n && fe.assertOptions(n, {
          silentJSONParsing: he.transitional(he.boolean),
          forcedJSONParsing: he.transitional(he.boolean),
          clarifyTimeoutError: he.transitional(he.boolean)
        }, !1), null != r && (H.isFunction(r) ? e.paramsSerializer = {
          serialize: r
        } : fe.assertOptions(r, {
          encode: he.function,
          serialize: he.function
        }, !0)), void 0 !== e.allowAbsoluteUrls || (void 0 !== this.defaults.allowAbsoluteUrls ? e.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : e.allowAbsoluteUrls = !0), fe.assertOptions(e, {
          baseUrl: he.spelling("baseURL"),
          withXsrfToken: he.spelling("withXSRFToken")
        }, !0), e.method = (e.method || this.defaults.method || "get").toLowerCase());
        let o = i && H.merge(i.common, i[e.method]);
        (i && H.forEach(["delete", "get", "head", "post", "put", "patch", "common"], t => {
          delete i[t];
        }), e.headers = Rt.concat(o, i));
        const s = [];
        let a = !0;
        this.interceptors.request.forEach(function (t) {
          "function" === typeof t.runWhen && !1 === t.runWhen(e) || (a = a && t.synchronous, s.unshift(t.fulfilled, t.rejected));
        });
        const u = [];
        let c;
        this.interceptors.response.forEach(function (t) {
          u.push(t.fulfilled, t.rejected);
        });
        let l, f = 0;
        if (!a) {
          const t = [ae.bind(this), void 0];
          for ((t.unshift(...s), t.push(...u), l = t.length, c = Promise.resolve(e)); f < l; ) c = c.then(t[f++], t[f++]);
          return c;
        }
        l = s.length;
        let h = e;
        for (; f < l; ) {
          const t = s[f++], e = s[f++];
          try {
            h = t(h);
          } catch (d) {
            e.call(this, d);
            break;
          }
        }
        try {
          c = ae.call(this, h);
        } catch (d) {
          return Promise.reject(d);
        }
        for ((f = 0, l = u.length); f < l; ) c = c.then(u[f++], u[f++]);
        return c;
      }
      getUri(t) {
        return at(Dt((t = Vt(this.defaults, t)).baseURL, t.url, t.allowAbsoluteUrls), t.params, t.paramsSerializer);
      }
    }
    (H.forEach(["delete", "get", "head", "options"], function (t) {
      de.prototype[t] = function (e, n) {
        return this.request(Vt(n || ({}), {
          method: t,
          url: e,
          data: (n || ({})).data
        }));
      };
    }), H.forEach(["post", "put", "patch"], function (t) {
      function e(e) {
        return function (n, r, i) {
          return this.request(Vt(i || ({}), {
            method: t,
            headers: e ? {
              "Content-Type": "multipart/form-data"
            } : {},
            url: n,
            data: r
          }));
        };
      }
      (de.prototype[t] = e(), de.prototype[t + "Form"] = e(!0));
    }));
    var pe = de;
    class ge {
      constructor(t) {
        if ("function" !== typeof t) throw new TypeError("executor must be a function.");
        let e;
        this.promise = new Promise(function (t) {
          e = t;
        });
        const n = this;
        (this.promise.then(t => {
          if (!n._listeners) return;
          let e = n._listeners.length;
          for (; e-- > 0; ) n._listeners[e](t);
          n._listeners = null;
        }), this.promise.then = t => {
          let e;
          const r = new Promise(t => {
            (n.subscribe(t), e = t);
          }).then(t);
          return (r.cancel = function () {
            n.unsubscribe(e);
          }, r);
        }, t(function (t, r, i) {
          n.reason || (n.reason = new Tt(t, r, i), e(n.reason));
        }));
      }
      throwIfRequested() {
        if (this.reason) throw this.reason;
      }
      subscribe(t) {
        this.reason ? t(this.reason) : this._listeners ? this._listeners.push(t) : this._listeners = [t];
      }
      unsubscribe(t) {
        if (!this._listeners) return;
        const e = this._listeners.indexOf(t);
        -1 !== e && this._listeners.splice(e, 1);
      }
      toAbortSignal() {
        const t = new AbortController(), e = e => {
          t.abort(e);
        };
        return (this.subscribe(e), t.signal.unsubscribe = () => this.unsubscribe(e), t.signal);
      }
      static source() {
        let t;
        return {
          token: new ge(function (e) {
            t = e;
          }),
          cancel: t
        };
      }
    }
    var me = ge;
    const ye = {
      Continue: 100,
      SwitchingProtocols: 101,
      Processing: 102,
      EarlyHints: 103,
      Ok: 200,
      Created: 201,
      Accepted: 202,
      NonAuthoritativeInformation: 203,
      NoContent: 204,
      ResetContent: 205,
      PartialContent: 206,
      MultiStatus: 207,
      AlreadyReported: 208,
      ImUsed: 226,
      MultipleChoices: 300,
      MovedPermanently: 301,
      Found: 302,
      SeeOther: 303,
      NotModified: 304,
      UseProxy: 305,
      Unused: 306,
      TemporaryRedirect: 307,
      PermanentRedirect: 308,
      BadRequest: 400,
      Unauthorized: 401,
      PaymentRequired: 402,
      Forbidden: 403,
      NotFound: 404,
      MethodNotAllowed: 405,
      NotAcceptable: 406,
      ProxyAuthenticationRequired: 407,
      RequestTimeout: 408,
      Conflict: 409,
      Gone: 410,
      LengthRequired: 411,
      PreconditionFailed: 412,
      PayloadTooLarge: 413,
      UriTooLong: 414,
      UnsupportedMediaType: 415,
      RangeNotSatisfiable: 416,
      ExpectationFailed: 417,
      ImATeapot: 418,
      MisdirectedRequest: 421,
      UnprocessableEntity: 422,
      Locked: 423,
      FailedDependency: 424,
      TooEarly: 425,
      UpgradeRequired: 426,
      PreconditionRequired: 428,
      TooManyRequests: 429,
      RequestHeaderFieldsTooLarge: 431,
      UnavailableForLegalReasons: 451,
      InternalServerError: 500,
      NotImplemented: 501,
      BadGateway: 502,
      ServiceUnavailable: 503,
      GatewayTimeout: 504,
      HttpVersionNotSupported: 505,
      VariantAlsoNegotiates: 506,
      InsufficientStorage: 507,
      LoopDetected: 508,
      NotExtended: 510,
      NetworkAuthenticationRequired: 511
    };
    Object.entries(ye).forEach(([t, e]) => {
      ye[e] = t;
    });
    var we = ye;
    const be = (function t(e) {
      const n = new pe(e), r = i(pe.prototype.request, n);
      return (H.extend(r, pe.prototype, n, {
        allOwnKeys: !0
      }), H.extend(r, n, null, {
        allOwnKeys: !0
      }), r.create = function (n) {
        return t(Vt(e, n));
      }, r);
    })(bt);
    (be.Axios = pe, be.CanceledError = Tt, be.CancelToken = me, be.isCancel = It, be.VERSION = ue, be.toFormData = et, be.AxiosError = J, be.Cancel = be.CanceledError, be.all = function (t) {
      return Promise.all(t);
    }, be.spread = function (t) {
      return function (e) {
        return t.apply(null, e);
      };
    }, be.isAxiosError = function (t) {
      return H.isObject(t) && !0 === t.isAxiosError;
    }, be.mergeConfig = Vt, be.AxiosHeaders = Rt, be.formToJSON = t => yt(H.isHTMLForm(t) ? new FormData(t) : t), be.getAdapter = oe, be.HttpStatusCode = we, be.default = be);
    var ve = be;
  },
  61994: function (t, e, n) {
    function r(t) {
      var e, n, i = "";
      if ("string" == typeof t || "number" == typeof t) i += t; else if ("object" == typeof t) if (Array.isArray(t)) {
        var o = t.length;
        for (e = 0; e < o; e++) t[e] && (n = r(t[e])) && (i && (i += " "), i += n);
      } else for (n in t) t[n] && (i && (i += " "), i += n);
      return i;
    }
    e.Z = function () {
      for (var t, e, n = 0, i = "", o = arguments.length; n < o; n++) (t = arguments[n]) && (e = r(t)) && (i && (i += " "), i += e);
      return i;
    };
  },
  31618: function (t, e, n) {
    n.d(e, {
      R: function () {
        return yt;
      }
    });
    var r = n(35157), i = n(45474), o = n(59369), s = n(69781);
    const a = 32, u = new Uint8Array(a), c = ["then"], l = {}, f = new WeakMap();
    function h(t) {
      return f.get(t);
    }
    function d(t, e) {
      f.set(t, e);
    }
    function p(t, e) {
      const n = new Error(`deferred error during ABI decoding triggered accessing ${t}`);
      throw (n.error = e, n);
    }
    function g(t, e, n) {
      return t.indexOf(null) >= 0 ? e.map((t, e) => t instanceof m ? g(h(t), t, n) : t) : t.reduce((t, r, i) => {
        let o = e.getValue(r);
        return ((r in t) || (n && o instanceof m && (o = g(h(o), o, n)), t[r] = o), t);
      }, {});
    }
    class m extends Array {
      #t;
      constructor(...t) {
        const e = t[0];
        let n = t[1], r = (t[2] || []).slice(), o = !0;
        (e !== l && (n = t, r = [], o = !1), super(n.length), n.forEach((t, e) => {
          this[e] = t;
        }));
        const s = r.reduce((t, e) => ("string" === typeof e && t.set(e, (t.get(e) || 0) + 1), t), new Map());
        if ((d(this, Object.freeze(n.map((t, e) => {
          const n = r[e];
          return null != n && 1 === s.get(n) ? n : null;
        }))), this.#t = [], null == this.#t && this.#t, !o)) return;
        Object.freeze(this);
        const a = new Proxy(this, {
          get: (t, e, n) => {
            if ("string" === typeof e) {
              if (e.match(/^[0-9]+$/)) {
                const n = (0, i.Dx)(e, "%index");
                if (n < 0 || n >= this.length) throw new RangeError("out of result range");
                const r = t[n];
                return (r instanceof Error && p(`index ${n}`, r), r);
              }
              if (c.indexOf(e) >= 0) return Reflect.get(t, e, n);
              const r = t[e];
              if (r instanceof Function) return function (...e) {
                return r.apply(this === n ? t : this, e);
              };
              if (!((e in t))) return t.getValue.apply(this === n ? t : this, [e]);
            }
            return Reflect.get(t, e, n);
          }
        });
        return (d(a, h(this)), a);
      }
      toArray(t) {
        const e = [];
        return (this.forEach((n, r) => {
          (n instanceof Error && p(`index ${r}`, n), t && n instanceof m && (n = n.toArray(t)), e.push(n));
        }), e);
      }
      toObject(t) {
        const e = h(this);
        return e.reduce((n, i, o) => ((0, r.hu)(null != i, `value at index ${o} unnamed`, "UNSUPPORTED_OPERATION", {
          operation: "toObject()"
        }), g(e, this, t)), {});
      }
      slice(t, e) {
        (null == t && (t = 0), t < 0 && (t += this.length) < 0 && (t = 0), null == e && (e = this.length), e < 0 && (e += this.length) < 0 && (e = 0), e > this.length && (e = this.length));
        const n = h(this), r = [], i = [];
        for (let o = t; o < e; o++) (r.push(this[o]), i.push(n[o]));
        return new m(l, r, i);
      }
      filter(t, e) {
        const n = h(this), r = [], i = [];
        for (let o = 0; o < this.length; o++) {
          const s = this[o];
          (s instanceof Error && p(`index ${o}`, s), t.call(e, s, o, this) && (r.push(s), i.push(n[o])));
        }
        return new m(l, r, i);
      }
      map(t, e) {
        const n = [];
        for (let r = 0; r < this.length; r++) {
          const i = this[r];
          (i instanceof Error && p(`index ${r}`, i), n.push(t.call(e, i, r, this)));
        }
        return n;
      }
      getValue(t) {
        const e = h(this).indexOf(t);
        if (-1 === e) return;
        const n = this[e];
        return (n instanceof Error && p(`property ${JSON.stringify(t)}`, n.error), n);
      }
      static fromItems(t, e) {
        return new m(l, t, e);
      }
    }
    function y(t) {
      let e = (0, i.ot)(t);
      return ((0, r.hu)(e.length <= a, "value out-of-bounds", "BUFFER_OVERRUN", {
        buffer: e,
        length: a,
        offset: e.length
      }), e.length !== a && (e = (0, o.h_)((0, o.zo)([u.slice(e.length % a), e]))), e);
    }
    class w {
      name;
      type;
      localName;
      dynamic;
      constructor(t, e, n, r) {
        (0, s.h)(this, {
          name: t,
          type: e,
          localName: n,
          dynamic: r
        }, {
          name: "string",
          type: "string",
          localName: "string",
          dynamic: "boolean"
        });
      }
      _throwError(t, e) {
        (0, r.en)(!1, t, this.localName, e);
      }
    }
    class b {
      #e;
      #n;
      constructor() {
        (this.#e = [], this.#n = 0);
      }
      get data() {
        return (0, o.zo)(this.#e);
      }
      get length() {
        return this.#n;
      }
      #r(t) {
        return (this.#e.push(t), this.#n += t.length, t.length);
      }
      appendWriter(t) {
        return this.#r((0, o.h_)(t.data));
      }
      writeBytes(t) {
        let e = (0, o.h_)(t);
        const n = e.length % a;
        return (n && (e = (0, o.h_)((0, o.zo)([e, u.slice(n)]))), this.#r(e));
      }
      writeValue(t) {
        return this.#r(y(t));
      }
      writeUpdatableValue() {
        const t = this.#e.length;
        return (this.#e.push(u), this.#n += a, e => {
          this.#e[t] = y(e);
        });
      }
    }
    class v {
      allowLoose;
      #e;
      #i;
      #o;
      #s;
      #a;
      constructor(t, e, n) {
        ((0, s.h)(this, {
          allowLoose: !!e
        }), this.#e = (0, o.h_)(t), this.#o = 0, this.#s = null, this.#a = null != n ? n : 1024, this.#i = 0);
      }
      get data() {
        return (0, o.Dv)(this.#e);
      }
      get dataLength() {
        return this.#e.length;
      }
      get consumed() {
        return this.#i;
      }
      get bytes() {
        return new Uint8Array(this.#e);
      }
      #u(t) {
        if (this.#s) return this.#s.#u(t);
        (this.#o += t, (0, r.hu)(this.#a < 1 || this.#o <= this.#a * this.dataLength, `compressed ABI data exceeds inflation ratio of ${this.#a} ( see: https://github.com/ethers-io/ethers.js/issues/4537 )`, "BUFFER_OVERRUN", {
          buffer: (0, o.h_)(this.#e),
          offset: this.#i,
          length: t,
          info: {
            bytesRead: this.#o,
            dataLength: this.dataLength
          }
        }));
      }
      #c(t, e, n) {
        let i = Math.ceil(e / a) * a;
        return (this.#i + i > this.#e.length && (this.allowLoose && n && this.#i + e <= this.#e.length ? i = e : (0, r.hu)(!1, "data out-of-bounds", "BUFFER_OVERRUN", {
          buffer: (0, o.h_)(this.#e),
          length: this.#e.length,
          offset: this.#i + i
        })), this.#e.slice(this.#i, this.#i + i));
      }
      subReader(t) {
        const e = new v(this.#e.slice(this.#i + t), this.allowLoose, this.#a);
        return (e.#s = this, e);
      }
      readBytes(t, e) {
        let n = this.#c(0, t, !!e);
        return (this.#u(t), this.#i += n.length, n.slice(0, t));
      }
      readValue() {
        return (0, i.Gh)(this.readBytes(a));
      }
      readIndex() {
        return (0, i.He)(this.readBytes(a));
      }
    }
    var E = n(70587);
    const x = {};
    function S(t, e) {
      let n = !1;
      return (e < 0 && (n = !0, e *= -1), new R(x, `${n ? "" : "u"}int${e}`, t, {
        signed: n,
        width: e
      }));
    }
    function O(t, e) {
      return new R(x, `bytes${e || ""}`, t, {
        size: e
      });
    }
    const A = Symbol.for("_ethers_typed");
    class R {
      type;
      value;
      #l;
      _typedSymbol;
      constructor(t, e, n, i) {
        (null == i && (i = null), (0, r.NK)(x, t, "Typed"), (0, s.h)(this, {
          _typedSymbol: A,
          type: e,
          value: n
        }), this.#l = i, this.format());
      }
      format() {
        if ("array" === this.type) throw new Error("");
        if ("dynamicArray" === this.type) throw new Error("");
        return "tuple" === this.type ? `tuple(${this.value.map(t => t.format()).join(",")})` : this.type;
      }
      defaultValue() {
        return 0;
      }
      minValue() {
        return 0;
      }
      maxValue() {
        return 0;
      }
      isBigInt() {
        return !!this.type.match(/^u?int[0-9]+$/);
      }
      isData() {
        return this.type.startsWith("bytes");
      }
      isString() {
        return "string" === this.type;
      }
      get tupleName() {
        if ("tuple" !== this.type) throw TypeError("not a tuple");
        return this.#l;
      }
      get arrayLength() {
        if ("array" !== this.type) throw TypeError("not an array");
        return !0 === this.#l ? -1 : !1 === this.#l ? this.value.length : null;
      }
      static from(t, e) {
        return new R(x, t, e);
      }
      static uint8(t) {
        return S(t, 8);
      }
      static uint16(t) {
        return S(t, 16);
      }
      static uint24(t) {
        return S(t, 24);
      }
      static uint32(t) {
        return S(t, 32);
      }
      static uint40(t) {
        return S(t, 40);
      }
      static uint48(t) {
        return S(t, 48);
      }
      static uint56(t) {
        return S(t, 56);
      }
      static uint64(t) {
        return S(t, 64);
      }
      static uint72(t) {
        return S(t, 72);
      }
      static uint80(t) {
        return S(t, 80);
      }
      static uint88(t) {
        return S(t, 88);
      }
      static uint96(t) {
        return S(t, 96);
      }
      static uint104(t) {
        return S(t, 104);
      }
      static uint112(t) {
        return S(t, 112);
      }
      static uint120(t) {
        return S(t, 120);
      }
      static uint128(t) {
        return S(t, 128);
      }
      static uint136(t) {
        return S(t, 136);
      }
      static uint144(t) {
        return S(t, 144);
      }
      static uint152(t) {
        return S(t, 152);
      }
      static uint160(t) {
        return S(t, 160);
      }
      static uint168(t) {
        return S(t, 168);
      }
      static uint176(t) {
        return S(t, 176);
      }
      static uint184(t) {
        return S(t, 184);
      }
      static uint192(t) {
        return S(t, 192);
      }
      static uint200(t) {
        return S(t, 200);
      }
      static uint208(t) {
        return S(t, 208);
      }
      static uint216(t) {
        return S(t, 216);
      }
      static uint224(t) {
        return S(t, 224);
      }
      static uint232(t) {
        return S(t, 232);
      }
      static uint240(t) {
        return S(t, 240);
      }
      static uint248(t) {
        return S(t, 248);
      }
      static uint256(t) {
        return S(t, 256);
      }
      static uint(t) {
        return S(t, 256);
      }
      static int8(t) {
        return S(t, -8);
      }
      static int16(t) {
        return S(t, -16);
      }
      static int24(t) {
        return S(t, -24);
      }
      static int32(t) {
        return S(t, -32);
      }
      static int40(t) {
        return S(t, -40);
      }
      static int48(t) {
        return S(t, -48);
      }
      static int56(t) {
        return S(t, -56);
      }
      static int64(t) {
        return S(t, -64);
      }
      static int72(t) {
        return S(t, -72);
      }
      static int80(t) {
        return S(t, -80);
      }
      static int88(t) {
        return S(t, -88);
      }
      static int96(t) {
        return S(t, -96);
      }
      static int104(t) {
        return S(t, -104);
      }
      static int112(t) {
        return S(t, -112);
      }
      static int120(t) {
        return S(t, -120);
      }
      static int128(t) {
        return S(t, -128);
      }
      static int136(t) {
        return S(t, -136);
      }
      static int144(t) {
        return S(t, -144);
      }
      static int152(t) {
        return S(t, -152);
      }
      static int160(t) {
        return S(t, -160);
      }
      static int168(t) {
        return S(t, -168);
      }
      static int176(t) {
        return S(t, -176);
      }
      static int184(t) {
        return S(t, -184);
      }
      static int192(t) {
        return S(t, -192);
      }
      static int200(t) {
        return S(t, -200);
      }
      static int208(t) {
        return S(t, -208);
      }
      static int216(t) {
        return S(t, -216);
      }
      static int224(t) {
        return S(t, -224);
      }
      static int232(t) {
        return S(t, -232);
      }
      static int240(t) {
        return S(t, -240);
      }
      static int248(t) {
        return S(t, -248);
      }
      static int256(t) {
        return S(t, -256);
      }
      static int(t) {
        return S(t, -256);
      }
      static bytes1(t) {
        return O(t, 1);
      }
      static bytes2(t) {
        return O(t, 2);
      }
      static bytes3(t) {
        return O(t, 3);
      }
      static bytes4(t) {
        return O(t, 4);
      }
      static bytes5(t) {
        return O(t, 5);
      }
      static bytes6(t) {
        return O(t, 6);
      }
      static bytes7(t) {
        return O(t, 7);
      }
      static bytes8(t) {
        return O(t, 8);
      }
      static bytes9(t) {
        return O(t, 9);
      }
      static bytes10(t) {
        return O(t, 10);
      }
      static bytes11(t) {
        return O(t, 11);
      }
      static bytes12(t) {
        return O(t, 12);
      }
      static bytes13(t) {
        return O(t, 13);
      }
      static bytes14(t) {
        return O(t, 14);
      }
      static bytes15(t) {
        return O(t, 15);
      }
      static bytes16(t) {
        return O(t, 16);
      }
      static bytes17(t) {
        return O(t, 17);
      }
      static bytes18(t) {
        return O(t, 18);
      }
      static bytes19(t) {
        return O(t, 19);
      }
      static bytes20(t) {
        return O(t, 20);
      }
      static bytes21(t) {
        return O(t, 21);
      }
      static bytes22(t) {
        return O(t, 22);
      }
      static bytes23(t) {
        return O(t, 23);
      }
      static bytes24(t) {
        return O(t, 24);
      }
      static bytes25(t) {
        return O(t, 25);
      }
      static bytes26(t) {
        return O(t, 26);
      }
      static bytes27(t) {
        return O(t, 27);
      }
      static bytes28(t) {
        return O(t, 28);
      }
      static bytes29(t) {
        return O(t, 29);
      }
      static bytes30(t) {
        return O(t, 30);
      }
      static bytes31(t) {
        return O(t, 31);
      }
      static bytes32(t) {
        return O(t, 32);
      }
      static address(t) {
        return new R(x, "address", t);
      }
      static bool(t) {
        return new R(x, "bool", !!t);
      }
      static bytes(t) {
        return new R(x, "bytes", t);
      }
      static string(t) {
        return new R(x, "string", t);
      }
      static array(t, e) {
        throw new Error("not implemented yet");
      }
      static tuple(t, e) {
        throw new Error("not implemented yet");
      }
      static overrides(t) {
        return new R(x, "overrides", Object.assign({}, t));
      }
      static isTyped(t) {
        return t && "object" === typeof t && ("_typedSymbol" in t) && t._typedSymbol === A;
      }
      static dereference(t, e) {
        if (R.isTyped(t)) {
          if (t.type !== e) throw new Error(`invalid type: expecetd ${e}, got ${t.type}`);
          return t.value;
        }
        return t;
      }
    }
    class N extends w {
      constructor(t) {
        super("address", "address", t, !1);
      }
      defaultValue() {
        return "0x0000000000000000000000000000000000000000";
      }
      encode(t, e) {
        let n = R.dereference(e, "string");
        try {
          n = (0, E.K)(n);
        } catch (r) {
          return this._throwError(r.message, e);
        }
        return t.writeValue(n);
      }
      decode(t) {
        return (0, E.K)((0, i.m9)(t.readValue(), 20));
      }
    }
    class I extends w {
      coder;
      constructor(t) {
        (super(t.name, t.type, "_", t.dynamic), this.coder = t);
      }
      defaultValue() {
        return this.coder.defaultValue();
      }
      encode(t, e) {
        return this.coder.encode(t, e);
      }
      decode(t) {
        return this.coder.decode(t);
      }
    }
    function B(t, e, n) {
      let i = [];
      if (Array.isArray(n)) i = n; else if (n && "object" === typeof n) {
        let t = {};
        i = e.map(e => {
          const i = e.localName;
          return ((0, r.hu)(i, "cannot encode object for signature with missing names", "INVALID_ARGUMENT", {
            argument: "values",
            info: {
              coder: e
            },
            value: n
          }), (0, r.hu)(!t[i], "cannot encode object for signature with duplicate names", "INVALID_ARGUMENT", {
            argument: "values",
            info: {
              coder: e
            },
            value: n
          }), t[i] = !0, n[i]);
        });
      } else (0, r.en)(!1, "invalid tuple value", "tuple", n);
      (0, r.en)(e.length === i.length, "types/value length mismatch", "tuple", n);
      let o = new b(), s = new b(), a = [];
      (e.forEach((t, e) => {
        let n = i[e];
        if (t.dynamic) {
          let e = s.length;
          t.encode(s, n);
          let r = o.writeUpdatableValue();
          a.push(t => {
            r(t + e);
          });
        } else t.encode(o, n);
      }), a.forEach(t => {
        t(o.length);
      }));
      let u = t.appendWriter(o);
      return (u += t.appendWriter(s), u);
    }
    function T(t, e) {
      let n = [], i = [], o = t.subReader(0);
      return (e.forEach(e => {
        let s = null;
        if (e.dynamic) {
          let n = t.readIndex(), i = o.subReader(n);
          try {
            s = e.decode(i);
          } catch (a) {
            if ((0, r.VZ)(a, "BUFFER_OVERRUN")) throw a;
            (s = a, s.baseType = e.name, s.name = e.localName, s.type = e.type);
          }
        } else try {
          s = e.decode(t);
        } catch (a) {
          if ((0, r.VZ)(a, "BUFFER_OVERRUN")) throw a;
          (s = a, s.baseType = e.name, s.name = e.localName, s.type = e.type);
        }
        if (void 0 == s) throw new Error("investigate");
        (n.push(s), i.push(e.localName || null));
      }), m.fromItems(n, i));
    }
    class k extends w {
      coder;
      length;
      constructor(t, e, n) {
        (super("array", t.type + "[" + (e >= 0 ? e : "") + "]", n, -1 === e || t.dynamic), (0, s.h)(this, {
          coder: t,
          length: e
        }));
      }
      defaultValue() {
        const t = this.coder.defaultValue(), e = [];
        for (let n = 0; n < this.length; n++) e.push(t);
        return e;
      }
      encode(t, e) {
        const n = R.dereference(e, "array");
        Array.isArray(n) || this._throwError("expected array value", n);
        let i = this.length;
        (-1 === i && (i = n.length, t.writeValue(n.length)), (0, r.fG)(n.length, i, "coder array" + (this.localName ? " " + this.localName : "")));
        let o = [];
        for (let r = 0; r < n.length; r++) o.push(this.coder);
        return B(t, o, n);
      }
      decode(t) {
        let e = this.length;
        -1 === e && (e = t.readIndex(), (0, r.hu)(e * a <= t.dataLength, "insufficient data length", "BUFFER_OVERRUN", {
          buffer: t.bytes,
          offset: e * a,
          length: t.dataLength
        }));
        let n = [];
        for (let r = 0; r < e; r++) n.push(new I(this.coder));
        return T(t, n);
      }
    }
    class P extends w {
      constructor(t) {
        super("bool", "bool", t, !1);
      }
      defaultValue() {
        return !1;
      }
      encode(t, e) {
        const n = R.dereference(e, "bool");
        return t.writeValue(n ? 1 : 0);
      }
      decode(t) {
        return !!t.readValue();
      }
    }
    class U extends w {
      constructor(t, e) {
        super(t, t, e, !0);
      }
      defaultValue() {
        return "0x";
      }
      encode(t, e) {
        e = (0, o.h_)(e);
        let n = t.writeValue(e.length);
        return (n += t.writeBytes(e), n);
      }
      decode(t) {
        return t.readBytes(t.readIndex(), !0);
      }
    }
    class C extends U {
      constructor(t) {
        super("bytes", t);
      }
      decode(t) {
        return (0, o.Dv)(super.decode(t));
      }
    }
    class _ extends w {
      size;
      constructor(t, e) {
        let n = "bytes" + String(t);
        (super(n, n, e, !1), (0, s.h)(this, {
          size: t
        }, {
          size: "number"
        }));
      }
      defaultValue() {
        return ("0x0000000000000000000000000000000000000000000000000000000000000000").substring(0, 2 + 2 * this.size);
      }
      encode(t, e) {
        let n = (0, o.h_)(R.dereference(e, this.type));
        return (n.length !== this.size && this._throwError("incorrect data length", e), t.writeBytes(n));
      }
      decode(t) {
        return (0, o.Dv)(t.readBytes(this.size));
      }
    }
    const L = new Uint8Array([]);
    class F extends w {
      constructor(t) {
        super("null", "", t, !1);
      }
      defaultValue() {
        return null;
      }
      encode(t, e) {
        return (null != e && this._throwError("not null", e), t.writeBytes(L));
      }
      decode(t) {
        return (t.readBytes(0), null);
      }
    }
    const j = BigInt(0), D = BigInt(1), z = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
    class V extends w {
      size;
      signed;
      constructor(t, e, n) {
        const r = (e ? "int" : "uint") + 8 * t;
        (super(r, r, n, !1), (0, s.h)(this, {
          size: t,
          signed: e
        }, {
          size: "number",
          signed: "boolean"
        }));
      }
      defaultValue() {
        return 0;
      }
      encode(t, e) {
        let n = (0, i.yT)(R.dereference(e, this.type)), r = (0, i.sS)(z, 256);
        if (this.signed) {
          let t = (0, i.sS)(r, 8 * this.size - 1);
          ((n > t || n < -(t + D)) && this._throwError("value out-of-bounds", e), n = (0, i.$j)(n, 256));
        } else (n < j || n > (0, i.sS)(r, 8 * this.size)) && this._throwError("value out-of-bounds", e);
        return t.writeValue(n);
      }
      decode(t) {
        let e = (0, i.sS)(t.readValue(), 8 * this.size);
        return (this.signed && (e = (0, i._Y)(e, 8 * this.size)), e);
      }
    }
    var $ = n(9478);
    class q extends U {
      constructor(t) {
        super("string", t);
      }
      defaultValue() {
        return "";
      }
      encode(t, e) {
        return super.encode(t, (0, $.Y0)(R.dereference(e, "string")));
      }
      decode(t) {
        return (0, $.ZN)(super.decode(t));
      }
    }
    class M extends w {
      coders;
      constructor(t, e) {
        let n = !1;
        const r = [];
        t.forEach(t => {
          (t.dynamic && (n = !0), r.push(t.type));
        });
        (super("tuple", "tuple(" + r.join(",") + ")", e, n), (0, s.h)(this, {
          coders: Object.freeze(t.slice())
        }));
      }
      defaultValue() {
        const t = [];
        this.coders.forEach(e => {
          t.push(e.defaultValue());
        });
        const e = this.coders.reduce((t, e) => {
          const n = e.localName;
          return (n && (t[n] || (t[n] = 0), t[n]++), t);
        }, {});
        return (this.coders.forEach((n, r) => {
          let i = n.localName;
          i && 1 === e[i] && ("length" === i && (i = "_length"), null == t[i] && (t[i] = t[r]));
        }), Object.freeze(t));
      }
      encode(t, e) {
        const n = R.dereference(e, "tuple");
        return B(t, this.coders, n);
      }
      decode(t) {
        return T(t, this.coders);
      }
    }
    n(17409);
    function H(t) {
      const e = new Set();
      return (t.forEach(t => e.add(t)), Object.freeze(e));
    }
    H(("external public payable override").split(" "));
    const K = "constant external internal payable private public pure view override", G = (H(K.split(" ")), "constructor error event fallback function receive struct"), Z = (H(G.split(" ")), "calldata memory storage payable indexed"), J = H(Z.split(" ")), W = H([G, Z, "tuple returns", K].join(" ").split(" ")), Y = {
      "(": "OPEN_PAREN",
      ")": "CLOSE_PAREN",
      "[": "OPEN_BRACKET",
      "]": "CLOSE_BRACKET",
      ",": "COMMA",
      "@": "AT"
    }, X = new RegExp("^(\\s*)"), Q = new RegExp("^([0-9]+)"), tt = new RegExp("^([a-zA-Z$_][a-zA-Z0-9$_]*)"), et = new RegExp("^([a-zA-Z$_][a-zA-Z0-9$_]*)$"), nt = new RegExp("^(address|bool|bytes([0-9]*)|string|u?int([0-9]*))$");
    class rt {
      #i;
      #f;
      get offset() {
        return this.#i;
      }
      get length() {
        return this.#f.length - this.#i;
      }
      constructor(t) {
        (this.#i = 0, this.#f = t.slice());
      }
      clone() {
        return new rt(this.#f);
      }
      reset() {
        this.#i = 0;
      }
      #h(t = 0, e = 0) {
        return new rt(this.#f.slice(t, e).map(e => Object.freeze(Object.assign({}, e, {
          match: e.match - t,
          linkBack: e.linkBack - t,
          linkNext: e.linkNext - t
        }))));
      }
      popKeyword(t) {
        const e = this.peek();
        if ("KEYWORD" !== e.type || !t.has(e.text)) throw new Error(`expected keyword ${e.text}`);
        return this.pop().text;
      }
      popType(t) {
        if (this.peek().type !== t) {
          const e = this.peek();
          throw new Error(`expected ${t}; got ${e.type} ${JSON.stringify(e.text)}`);
        }
        return this.pop().text;
      }
      popParen() {
        const t = this.peek();
        if ("OPEN_PAREN" !== t.type) throw new Error("bad start");
        const e = this.#h(this.#i + 1, t.match + 1);
        return (this.#i = t.match + 1, e);
      }
      popParams() {
        const t = this.peek();
        if ("OPEN_PAREN" !== t.type) throw new Error("bad start");
        const e = [];
        for (; this.#i < t.match - 1; ) {
          const t = this.peek().linkNext;
          (e.push(this.#h(this.#i + 1, t)), this.#i = t);
        }
        return (this.#i = t.match + 1, e);
      }
      peek() {
        if (this.#i >= this.#f.length) throw new Error("out-of-bounds");
        return this.#f[this.#i];
      }
      peekKeyword(t) {
        const e = this.peekType("KEYWORD");
        return null != e && t.has(e) ? e : null;
      }
      peekType(t) {
        if (0 === this.length) return null;
        const e = this.peek();
        return e.type === t ? e.text : null;
      }
      pop() {
        const t = this.peek();
        return (this.#i++, t);
      }
      toString() {
        const t = [];
        for (let e = this.#i; e < this.#f.length; e++) {
          const n = this.#f[e];
          t.push(`${n.type}:${n.text}`);
        }
        return `<TokenString ${t.join(" ")}>`;
      }
    }
    function it(t) {
      const e = [], n = e => {
        const n = s < t.length ? JSON.stringify(t[s]) : "$EOI";
        throw new Error(`invalid token ${n} at ${s}: ${e}`);
      };
      let r = [], o = [], s = 0;
      for (; s < t.length; ) {
        let a = t.substring(s), u = a.match(X);
        u && (s += u[1].length, a = t.substring(s));
        const c = {
          depth: r.length,
          linkBack: -1,
          linkNext: -1,
          match: -1,
          type: "",
          text: "",
          offset: s,
          value: -1
        };
        e.push(c);
        let l = Y[a[0]] || "";
        if (l) {
          if ((c.type = l, c.text = a[0], s++, "OPEN_PAREN" === l)) (r.push(e.length - 1), o.push(e.length - 1)); else if ("CLOSE_PAREN" == l) (0 === r.length && n("no matching open bracket"), c.match = r.pop(), e[c.match].match = e.length - 1, c.depth--, c.linkBack = o.pop(), e[c.linkBack].linkNext = e.length - 1); else if ("COMMA" === l) (c.linkBack = o.pop(), e[c.linkBack].linkNext = e.length - 1, o.push(e.length - 1)); else if ("OPEN_BRACKET" === l) c.type = "BRACKET"; else if ("CLOSE_BRACKET" === l) {
            let t = e.pop().text;
            if (e.length > 0 && "NUMBER" === e[e.length - 1].type) {
              const n = e.pop().text;
              (t = n + t, e[e.length - 1].value = (0, i.Dx)(n));
            }
            if (0 === e.length || "BRACKET" !== e[e.length - 1].type) throw new Error("missing opening bracket");
            e[e.length - 1].text += t;
          }
        } else if ((u = a.match(tt), u)) {
          if ((c.text = u[1], s += c.text.length, W.has(c.text))) {
            c.type = "KEYWORD";
            continue;
          }
          if (c.text.match(nt)) {
            c.type = "TYPE";
            continue;
          }
          c.type = "ID";
        } else {
          if ((u = a.match(Q), !u)) throw new Error(`unexpected token ${JSON.stringify(a[0])} at position ${s}`);
          (c.text = u[1], c.type = "NUMBER", s += c.text.length);
        }
      }
      return new rt(e.map(t => Object.freeze(t)));
    }
    function ot(t, e) {
      const n = new Set();
      for (; ; ) {
        const r = t.peekType("KEYWORD");
        if (null == r || e && !e.has(r)) break;
        if ((t.pop(), n.has(r))) throw new Error(`duplicate keywords: ${JSON.stringify(r)}`);
        n.add(r);
      }
      return Object.freeze(n);
    }
    const st = new RegExp(/^(.*)\[([0-9]*)\]$/);
    function at(t) {
      const e = t.match(nt);
      if (((0, r.en)(e, "invalid type", "type", t), "uint" === t)) return "uint256";
      if ("int" === t) return "int256";
      if (e[2]) {
        const n = parseInt(e[2]);
        (0, r.en)(0 !== n && n <= 32, "invalid bytes length", "type", t);
      } else if (e[3]) {
        const n = parseInt(e[3]);
        (0, r.en)(0 !== n && n <= 256 && n % 8 === 0, "invalid numeric width", "type", t);
      }
      return t;
    }
    const ut = {}, ct = Symbol.for("_ethers_internal"), lt = "_ParamTypeInternal";
    class ft {
      name;
      type;
      baseType;
      indexed;
      components;
      arrayLength;
      arrayChildren;
      constructor(t, e, n, i, o, a, u, c) {
        if (((0, r.NK)(t, ut, "ParamType"), Object.defineProperty(this, ct, {
          value: lt
        }), a && (a = Object.freeze(a.slice())), "array" === i)) {
          if (null == u || null == c) throw new Error("");
        } else if (null != u || null != c) throw new Error("");
        if ("tuple" === i) {
          if (null == a) throw new Error("");
        } else if (null != a) throw new Error("");
        (0, s.h)(this, {
          name: e,
          type: n,
          baseType: i,
          indexed: o,
          components: a,
          arrayLength: u,
          arrayChildren: c
        });
      }
      format(t) {
        if ((null == t && (t = "sighash"), "json" === t)) {
          const e = this.name || "";
          if (this.isArray()) {
            const t = JSON.parse(this.arrayChildren.format("json"));
            return (t.name = e, t.type += `[${this.arrayLength < 0 ? "" : String(this.arrayLength)}]`, JSON.stringify(t));
          }
          const n = {
            type: "tuple" === this.baseType ? "tuple" : this.type,
            name: e
          };
          return ("boolean" === typeof this.indexed && (n.indexed = this.indexed), this.isTuple() && (n.components = this.components.map(e => JSON.parse(e.format(t)))), JSON.stringify(n));
        }
        let e = "";
        return (this.isArray() ? (e += this.arrayChildren.format(t), e += `[${this.arrayLength < 0 ? "" : String(this.arrayLength)}]`) : this.isTuple() ? e += "(" + this.components.map(e => e.format(t)).join("full" === t ? ", " : ",") + ")" : e += this.type, "sighash" !== t && (!0 === this.indexed && (e += " indexed"), "full" === t && this.name && (e += " " + this.name)), e);
      }
      isArray() {
        return "array" === this.baseType;
      }
      isTuple() {
        return "tuple" === this.baseType;
      }
      isIndexable() {
        return null != this.indexed;
      }
      walk(t, e) {
        if (this.isArray()) {
          if (!Array.isArray(t)) throw new Error("invalid array value");
          if (-1 !== this.arrayLength && t.length !== this.arrayLength) throw new Error("array is wrong length");
          const n = this;
          return t.map(t => n.arrayChildren.walk(t, e));
        }
        if (this.isTuple()) {
          if (!Array.isArray(t)) throw new Error("invalid tuple value");
          if (t.length !== this.components.length) throw new Error("array is wrong length");
          const n = this;
          return t.map((t, r) => n.components[r].walk(t, e));
        }
        return e(this.type, t);
      }
      #d(t, e, n, r) {
        if (this.isArray()) {
          if (!Array.isArray(e)) throw new Error("invalid array value");
          if (-1 !== this.arrayLength && e.length !== this.arrayLength) throw new Error("array is wrong length");
          const i = this.arrayChildren, o = e.slice();
          return (o.forEach((e, r) => {
            i.#d(t, e, n, t => {
              o[r] = t;
            });
          }), void r(o));
        }
        if (this.isTuple()) {
          const i = this.components;
          let o;
          if (Array.isArray(e)) o = e.slice(); else {
            if (null == e || "object" !== typeof e) throw new Error("invalid tuple value");
            o = i.map(t => {
              if (!t.name) throw new Error("cannot use object value with unnamed components");
              if (!((t.name in e))) throw new Error(`missing value for component ${t.name}`);
              return e[t.name];
            });
          }
          if (o.length !== this.components.length) throw new Error("array is wrong length");
          return (o.forEach((e, r) => {
            i[r].#d(t, e, n, t => {
              o[r] = t;
            });
          }), void r(o));
        }
        const i = n(this.type, e);
        i.then ? t.push((async function () {
          r(await i);
        })()) : r(i);
      }
      async walkAsync(t, e) {
        const n = [], r = [t];
        return (this.#d(n, t, e, t => {
          r[0] = t;
        }), n.length && await Promise.all(n), r[0]);
      }
      static from(t, e) {
        if (ft.isParamType(t)) return t;
        if ("string" === typeof t) try {
          return ft.from(it(t), e);
        } catch (a) {
          (0, r.en)(!1, "invalid param type", "obj", t);
        } else if (t instanceof rt) {
          let n = "", r = "", i = null;
          ot(t, H(["tuple"])).has("tuple") || t.peekType("OPEN_PAREN") ? (r = "tuple", i = t.popParams().map(t => ft.from(t)), n = `tuple(${i.map(t => t.format()).join(",")})`) : (n = at(t.popType("TYPE")), r = n);
          let o = null, s = null;
          for (; t.length && t.peekType("BRACKET"); ) {
            const e = t.pop();
            (o = new ft(ut, "", n, r, null, i, s, o), s = e.value, n += e.text, r = "array", i = null);
          }
          let a = null;
          if (ot(t, J).has("indexed")) {
            if (!e) throw new Error("");
            a = !0;
          }
          const u = t.peekType("ID") ? t.pop().text : "";
          if (t.length) throw new Error("leftover tokens");
          return new ft(ut, u, n, r, a, i, s, o);
        }
        const n = t.name;
        (0, r.en)(!n || "string" === typeof n && n.match(et), "invalid name", "obj.name", n);
        let i = t.indexed;
        null != i && ((0, r.en)(e, "parameter cannot be indexed", "obj.indexed", t.indexed), i = !!i);
        let o = t.type, s = o.match(st);
        if (s) {
          const e = parseInt(s[2] || "-1"), r = ft.from({
            type: s[1],
            components: t.components
          });
          return new ft(ut, n || "", o, "array", i, null, e, r);
        }
        if ("tuple" === o || o.startsWith("tuple(") || o.startsWith("(")) {
          const e = null != t.components ? t.components.map(t => ft.from(t)) : null;
          return new ft(ut, n || "", o, "tuple", i, e, null, null);
        }
        return (o = at(t.type), new ft(ut, n || "", o, o, i, null, null, null));
      }
      static isParamType(t) {
        return t && t[ct] === lt;
      }
    }
    const ht = new Map();
    (ht.set(0, "GENERIC_PANIC"), ht.set(1, "ASSERT_FALSE"), ht.set(17, "OVERFLOW"), ht.set(18, "DIVIDE_BY_ZERO"), ht.set(33, "ENUM_RANGE_ERROR"), ht.set(34, "BAD_STORAGE_DATA"), ht.set(49, "STACK_UNDERFLOW"), ht.set(50, "ARRAY_RANGE_ERROR"), ht.set(65, "OUT_OF_MEMORY"), ht.set(81, "UNINITIALIZED_FUNCTION_CALL"));
    const dt = new RegExp(/^bytes([0-9]*)$/), pt = new RegExp(/^(u?int)([0-9]*)$/);
    let gt = null, mt = 1024;
    class yt {
      #p(t) {
        if (t.isArray()) return new k(this.#p(t.arrayChildren), t.arrayLength, t.name);
        if (t.isTuple()) return new M(t.components.map(t => this.#p(t)), t.name);
        switch (t.baseType) {
          case "address":
            return new N(t.name);
          case "bool":
            return new P(t.name);
          case "string":
            return new q(t.name);
          case "bytes":
            return new C(t.name);
          case "":
            return new F(t.name);
        }
        let e = t.type.match(pt);
        if (e) {
          let n = parseInt(e[2] || "256");
          return ((0, r.en)(0 !== n && n <= 256 && n % 8 === 0, "invalid " + e[1] + " bit length", "param", t), new V(n / 8, "int" === e[1], t.name));
        }
        if ((e = t.type.match(dt), e)) {
          let n = parseInt(e[1]);
          return ((0, r.en)(0 !== n && n <= 32, "invalid bytes length", "param", t), new _(n, t.name));
        }
        (0, r.en)(!1, "invalid type", "type", t.type);
      }
      getDefaultValue(t) {
        const e = t.map(t => this.#p(ft.from(t)));
        return new M(e, "_").defaultValue();
      }
      encode(t, e) {
        (0, r.fG)(e.length, t.length, "types/values length mismatch");
        const n = t.map(t => this.#p(ft.from(t))), i = new M(n, "_"), o = new b();
        return (i.encode(o, e), o.data);
      }
      decode(t, e, n) {
        const r = t.map(t => this.#p(ft.from(t)));
        return new M(r, "_").decode(new v(e, n, mt));
      }
      static _setDefaultMaxInflation(t) {
        ((0, r.en)("number" === typeof t && Number.isInteger(t), "invalid defaultMaxInflation factor", "value", t), mt = t);
      }
      static defaultAbiCoder() {
        return (null == gt && (gt = new yt()), gt);
      }
      static getBuiltinCallException(t, e, n) {
        return (function (t, e, n, i) {
          let s = "missing revert data", a = null, u = null;
          if (n) {
            s = "execution reverted";
            const t = (0, o.Pw)(n);
            if ((n = (0, o.Dv)(n), 0 === t.length)) (s += " (no data present; likely require(false) occurred", a = "require(false)"); else if (t.length % 32 !== 4) s += " (could not decode reason; invalid data length)"; else if ("0x08c379a0" === (0, o.Dv)(t.slice(0, 4))) try {
              (a = i.decode(["string"], t.slice(4))[0], u = {
                signature: "Error(string)",
                name: "Error",
                args: [a]
              }, s += `: ${JSON.stringify(a)}`);
            } catch (l) {
              s += " (could not decode reason; invalid string data)";
            } else if ("0x4e487b71" === (0, o.Dv)(t.slice(0, 4))) try {
              const e = Number(i.decode(["uint256"], t.slice(4))[0]);
              (u = {
                signature: "Panic(uint256)",
                name: "Panic",
                args: [e]
              }, a = `Panic due to ${ht.get(e) || "UNKNOWN"}(${e})`, s += `: ${a}`);
            } catch (l) {
              s += " (could not decode panic code)";
            } else s += " (unknown custom error)";
          }
          const c = {
            to: e.to ? (0, E.K)(e.to) : null,
            data: e.data || "0x"
          };
          return (e.from && (c.from = (0, E.K)(e.from)), (0, r.wf)(s, "CALL_EXCEPTION", {
            action: t,
            data: n,
            reason: a,
            transaction: c,
            invocation: null,
            revert: u
          }));
        })(t, e, n, yt.defaultAbiCoder());
      }
    }
  },
  70587: function (t, e, n) {
    n.d(e, {
      K: function () {
        return d;
      }
    });
    var r = n(17409), i = n(59369), o = n(35157);
    const s = BigInt(0), a = BigInt(36);
    function u(t) {
      const e = (t = t.toLowerCase()).substring(2).split(""), n = new Uint8Array(40);
      for (let r = 0; r < 40; r++) n[r] = e[r].charCodeAt(0);
      const o = (0, i.Pw)((0, r.w)(n));
      for (let r = 0; r < 40; r += 2) (o[r >> 1] >> 4 >= 8 && (e[r] = e[r].toUpperCase()), (15 & o[r >> 1]) >= 8 && (e[r + 1] = e[r + 1].toUpperCase()));
      return "0x" + e.join("");
    }
    const c = {};
    for (let p = 0; p < 10; p++) c[String(p)] = String(p);
    for (let p = 0; p < 26; p++) c[String.fromCharCode(65 + p)] = String(10 + p);
    const l = 15;
    function f(t) {
      let e = (t = (t = t.toUpperCase()).substring(4) + t.substring(0, 2) + "00").split("").map(t => c[t]).join("");
      for (; e.length >= l; ) {
        let t = e.substring(0, l);
        e = parseInt(t, 10) % 97 + e.substring(t.length);
      }
      let n = String(98 - parseInt(e, 10) % 97);
      for (; n.length < 2; ) n = "0" + n;
      return n;
    }
    const h = (function () {
      const t = {};
      for (let e = 0; e < 36; e++) {
        t[("0123456789abcdefghijklmnopqrstuvwxyz")[e]] = BigInt(e);
      }
      return t;
    })();
    function d(t) {
      if (((0, o.en)("string" === typeof t, "invalid address", "address", t), t.match(/^(0x)?[0-9a-fA-F]{40}$/))) {
        t.startsWith("0x") || (t = "0x" + t);
        const e = u(t);
        return ((0, o.en)(!t.match(/([A-F].*[a-f])|([a-f].*[A-F])/) || e === t, "bad address checksum", "address", t), e);
      }
      if (t.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
        (0, o.en)(t.substring(2, 4) === f(t), "bad icap checksum", "address", t);
        let e = (function (t) {
          t = t.toLowerCase();
          let e = s;
          for (let n = 0; n < t.length; n++) e = e * a + h[t[n]];
          return e;
        })(t.substring(4)).toString(16);
        for (; e.length < 40; ) e = "0" + e;
        return u("0x" + e);
      }
      (0, o.en)(!1, "invalid address", "address", t);
    }
  },
  3876: function (t, e, n) {
    n.d(e, {
      UJ: function () {
        return i;
      }
    });
    var r = n(70587);
    function i(t) {
      try {
        return ((0, r.K)(t), !0);
      } catch (e) {}
      return !1;
    }
  },
  17409: function (t, e, n) {
    n.d(e, {
      w: function () {
        return U;
      }
    });
    var r = n(25655);
    const i = BigInt(2 ** 32 - 1), o = BigInt(32);
    function s(t, e = !1) {
      return e ? {
        h: Number(t & i),
        l: Number(t >> o & i)
      } : {
        h: 0 | Number(t >> o & i),
        l: 0 | Number(t & i)
      };
    }
    function a(t, e = !1) {
      let n = new Uint32Array(t.length), r = new Uint32Array(t.length);
      for (let i = 0; i < t.length; i++) {
        const {h: o, l: a} = s(t[i], e);
        [n[i], r[i]] = [o, a];
      }
      return [n, r];
    }
    const u = (t, e, n) => t << n | e >>> 32 - n, c = (t, e, n) => e << n | t >>> 32 - n, l = (t, e, n) => e << n - 32 | t >>> 64 - n, f = (t, e, n) => t << n - 32 | e >>> 64 - n;
    var h = n(35891);
    const [d, p, g] = [[], [], []], m = BigInt(0), y = BigInt(1), w = BigInt(2), b = BigInt(7), v = BigInt(256), E = BigInt(113);
    for (let C = 0, _ = y, L = 1, F = 0; C < 24; C++) {
      ([L, F] = [F, (2 * L + 3 * F) % 5], d.push(2 * (5 * F + L)), p.push((C + 1) * (C + 2) / 2 % 64));
      let t = m;
      for (let e = 0; e < 7; e++) (_ = (_ << y ^ (_ >> b) * E) % v, _ & w && (t ^= y << (y << BigInt(e)) - y));
      g.push(t);
    }
    const [x, S] = a(g, !0), O = (t, e, n) => n > 32 ? l(t, e, n) : u(t, e, n), A = (t, e, n) => n > 32 ? f(t, e, n) : c(t, e, n);
    class R extends h.kb {
      constructor(t, e, n, i = !1, o = 24) {
        if ((super(), this.blockLen = t, this.suffix = e, this.outputLen = n, this.enableXOF = i, this.rounds = o, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, (0, r.Rx)(n), 0 >= this.blockLen || this.blockLen >= 200)) throw new Error("Sha3 supports only keccak-f1600 function");
        (this.state = new Uint8Array(200), this.state32 = (0, h.Jq)(this.state));
      }
      keccak() {
        (!(function (t, e = 24) {
          const n = new Uint32Array(10);
          for (let r = 24 - e; r < 24; r++) {
            for (let r = 0; r < 10; r++) n[r] = t[r] ^ t[r + 10] ^ t[r + 20] ^ t[r + 30] ^ t[r + 40];
            for (let r = 0; r < 10; r += 2) {
              const e = (r + 8) % 10, i = (r + 2) % 10, o = n[i], s = n[i + 1], a = O(o, s, 1) ^ n[e], u = A(o, s, 1) ^ n[e + 1];
              for (let n = 0; n < 50; n += 10) (t[r + n] ^= a, t[r + n + 1] ^= u);
            }
            let e = t[2], i = t[3];
            for (let n = 0; n < 24; n++) {
              const r = p[n], o = O(e, i, r), s = A(e, i, r), a = d[n];
              (e = t[a], i = t[a + 1], t[a] = o, t[a + 1] = s);
            }
            for (let r = 0; r < 50; r += 10) {
              for (let e = 0; e < 10; e++) n[e] = t[r + e];
              for (let e = 0; e < 10; e++) t[r + e] ^= ~n[(e + 2) % 10] & n[(e + 4) % 10];
            }
            (t[0] ^= x[r], t[1] ^= S[r]);
          }
          n.fill(0);
        })(this.state32, this.rounds), this.posOut = 0, this.pos = 0);
      }
      update(t) {
        (0, r.Gg)(this);
        const {blockLen: e, state: n} = this, i = (t = (0, h.O0)(t)).length;
        for (let r = 0; r < i; ) {
          const o = Math.min(e - this.pos, i - r);
          for (let e = 0; e < o; e++) n[this.pos++] ^= t[r++];
          this.pos === e && this.keccak();
        }
        return this;
      }
      finish() {
        if (this.finished) return;
        this.finished = !0;
        const {state: t, suffix: e, pos: n, blockLen: r} = this;
        (t[n] ^= e, 0 !== (128 & e) && n === r - 1 && this.keccak(), t[r - 1] ^= 128, this.keccak());
      }
      writeInto(t) {
        ((0, r.Gg)(this, !1), (0, r.aI)(t), this.finish());
        const e = this.state, {blockLen: n} = this;
        for (let r = 0, i = t.length; r < i; ) {
          this.posOut >= n && this.keccak();
          const o = Math.min(n - this.posOut, i - r);
          (t.set(e.subarray(this.posOut, this.posOut + o), r), this.posOut += o, r += o);
        }
        return t;
      }
      xofInto(t) {
        if (!this.enableXOF) throw new Error("XOF is not possible for this instance");
        return this.writeInto(t);
      }
      xof(t) {
        return ((0, r.Rx)(t), this.xofInto(new Uint8Array(t)));
      }
      digestInto(t) {
        if (((0, r.J8)(t, this), this.finished)) throw new Error("digest() was already called");
        return (this.writeInto(t), this.destroy(), t);
      }
      digest() {
        return this.digestInto(new Uint8Array(this.outputLen));
      }
      destroy() {
        (this.destroyed = !0, this.state.fill(0));
      }
      _cloneInto(t) {
        const {blockLen: e, suffix: n, outputLen: r, rounds: i, enableXOF: o} = this;
        return (t || (t = new R(e, n, r, o, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = n, t.outputLen = r, t.enableXOF = o, t.destroyed = this.destroyed, t);
      }
    }
    const N = (t, e, n) => (0, h.hE)(() => new R(e, t, n)), I = N(1, 136, 32);
    var B = n(59369);
    let T = !1;
    const k = function (t) {
      return I(t);
    };
    let P = k;
    function U(t) {
      const e = (0, B.Pw)(t, "data");
      return (0, B.Dv)(P(e));
    }
    (U._ = k, U.lock = function () {
      T = !0;
    }, U.register = function (t) {
      if (T) throw new TypeError("keccak256 is locked");
      P = t;
    }, Object.freeze(U));
  },
  60902: function (t, e, n) {
    n.d(e, {
      n: function () {
        return _t;
      }
    });
    var r = {};
    (n.r(r), n.d(r, {
      dQ: function () {
        return B;
      },
      ci: function () {
        return v;
      },
      bytesToNumberBE: function () {
        return S;
      },
      ty: function () {
        return O;
      },
      eV: function () {
        return I;
      },
      n$: function () {
        return P;
      },
      ql: function () {
        return N;
      },
      hexToBytes: function () {
        return x;
      },
      tL: function () {
        return A;
      },
      S5: function () {
        return R;
      },
      FF: function () {
        return C;
      }
    }));
    var i = n(17409);
    const o = "\u0019Ethereum Signed Message:\n";
    var s = n(70587), a = n(25655), u = n(35891);
    class c extends u.kb {
      constructor(t, e, n, r) {
        (super(), this.blockLen = t, this.outputLen = e, this.padOffset = n, this.isLE = r, this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.buffer = new Uint8Array(t), this.view = (0, u.GL)(this.buffer));
      }
      update(t) {
        (0, a.Gg)(this);
        const {view: e, buffer: n, blockLen: r} = this, i = (t = (0, u.O0)(t)).length;
        for (let o = 0; o < i; ) {
          const s = Math.min(r - this.pos, i - o);
          if (s !== r) (n.set(t.subarray(o, o + s), this.pos), this.pos += s, o += s, this.pos === r && (this.process(e, 0), this.pos = 0)); else {
            const e = (0, u.GL)(t);
            for (; r <= i - o; o += r) this.process(e, o);
          }
        }
        return (this.length += t.length, this.roundClean(), this);
      }
      digestInto(t) {
        ((0, a.Gg)(this), (0, a.J8)(t, this), this.finished = !0);
        const {buffer: e, view: n, blockLen: r, isLE: i} = this;
        let {pos: o} = this;
        (e[o++] = 128, this.buffer.subarray(o).fill(0), this.padOffset > r - o && (this.process(n, 0), o = 0));
        for (let a = o; a < r; a++) e[a] = 0;
        (!(function (t, e, n, r) {
          if ("function" === typeof t.setBigUint64) return t.setBigUint64(e, n, r);
          const i = BigInt(32), o = BigInt(4294967295), s = Number(n >> i & o), a = Number(n & o), u = r ? 4 : 0, c = r ? 0 : 4;
          (t.setUint32(e + u, s, r), t.setUint32(e + c, a, r));
        })(n, r - 8, BigInt(8 * this.length), i), this.process(n, 0));
        const s = (0, u.GL)(t), c = this.outputLen;
        if (c % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
        const l = c / 4, f = this.get();
        if (l > f.length) throw new Error("_sha2: outputLen bigger than state");
        for (let a = 0; a < l; a++) s.setUint32(4 * a, f[a], i);
      }
      digest() {
        const {buffer: t, outputLen: e} = this;
        this.digestInto(t);
        const n = t.slice(0, e);
        return (this.destroy(), n);
      }
      _cloneInto(t) {
        (t || (t = new this.constructor()), t.set(...this.get()));
        const {blockLen: e, buffer: n, length: r, finished: i, destroyed: o, pos: s} = this;
        return (t.length = r, t.pos = s, t.finished = i, t.destroyed = o, r % e && t.buffer.set(n), t);
      }
    }
    const l = (t, e, n) => t & e ^ t & n ^ e & n, f = new Uint32Array([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]), h = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]), d = new Uint32Array(64);
    class p extends c {
      constructor() {
        (super(64, 32, 8, !1), this.A = 0 | h[0], this.B = 0 | h[1], this.C = 0 | h[2], this.D = 0 | h[3], this.E = 0 | h[4], this.F = 0 | h[5], this.G = 0 | h[6], this.H = 0 | h[7]);
      }
      get() {
        const {A: t, B: e, C: n, D: r, E: i, F: o, G: s, H: a} = this;
        return [t, e, n, r, i, o, s, a];
      }
      set(t, e, n, r, i, o, s, a) {
        (this.A = 0 | t, this.B = 0 | e, this.C = 0 | n, this.D = 0 | r, this.E = 0 | i, this.F = 0 | o, this.G = 0 | s, this.H = 0 | a);
      }
      process(t, e) {
        for (let u = 0; u < 16; (u++, e += 4)) d[u] = t.getUint32(e, !1);
        for (let l = 16; l < 64; l++) {
          const t = d[l - 15], e = d[l - 2], n = (0, u.np)(t, 7) ^ (0, u.np)(t, 18) ^ t >>> 3, r = (0, u.np)(e, 17) ^ (0, u.np)(e, 19) ^ e >>> 10;
          d[l] = r + d[l - 7] + n + d[l - 16] | 0;
        }
        let {A: n, B: r, C: i, D: o, E: s, F: a, G: c, H: h} = this;
        for (let g = 0; g < 64; g++) {
          const t = h + ((0, u.np)(s, 6) ^ (0, u.np)(s, 11) ^ (0, u.np)(s, 25)) + ((p = s) & a ^ ~p & c) + f[g] + d[g] | 0, e = ((0, u.np)(n, 2) ^ (0, u.np)(n, 13) ^ (0, u.np)(n, 22)) + l(n, r, i) | 0;
          (h = c, c = a, a = s, s = o + t | 0, o = i, i = r, r = n, n = t + e | 0);
        }
        var p;
        (n = n + this.A | 0, r = r + this.B | 0, i = i + this.C | 0, o = o + this.D | 0, s = s + this.E | 0, a = a + this.F | 0, c = c + this.G | 0, h = h + this.H | 0, this.set(n, r, i, o, s, a, c, h));
      }
      roundClean() {
        d.fill(0);
      }
      destroy() {
        (this.set(0, 0, 0, 0, 0, 0, 0, 0), this.buffer.fill(0));
      }
    }
    const g = (0, u.hE)(() => new p()), m = (BigInt(0), BigInt(1)), y = BigInt(2), w = t => t instanceof Uint8Array, b = Array.from({
      length: 256
    }, (t, e) => e.toString(16).padStart(2, "0"));
    function v(t) {
      if (!w(t)) throw new Error("Uint8Array expected");
      let e = "";
      for (let n = 0; n < t.length; n++) e += b[t[n]];
      return e;
    }
    function E(t) {
      if ("string" !== typeof t) throw new Error("hex string expected, got " + typeof t);
      return BigInt("" === t ? "0" : `0x${t}`);
    }
    function x(t) {
      if ("string" !== typeof t) throw new Error("hex string expected, got " + typeof t);
      const e = t.length;
      if (e % 2) throw new Error("padded hex string expected, got unpadded hex of length " + e);
      const n = new Uint8Array(e / 2);
      for (let r = 0; r < n.length; r++) {
        const e = 2 * r, i = t.slice(e, e + 2), o = Number.parseInt(i, 16);
        if (Number.isNaN(o) || o < 0) throw new Error("Invalid byte sequence");
        n[r] = o;
      }
      return n;
    }
    function S(t) {
      return E(v(t));
    }
    function O(t) {
      if (!w(t)) throw new Error("Uint8Array expected");
      return E(v(Uint8Array.from(t).reverse()));
    }
    function A(t, e) {
      return x(t.toString(16).padStart(2 * e, "0"));
    }
    function R(t, e) {
      return A(t, e).reverse();
    }
    function N(t, e, n) {
      let r;
      if ("string" === typeof e) try {
        r = x(e);
      } catch (o) {
        throw new Error(`${t} must be valid hex string, got "${e}". Cause: ${o}`);
      } else {
        if (!w(e)) throw new Error(`${t} must be hex string or Uint8Array`);
        r = Uint8Array.from(e);
      }
      const i = r.length;
      if ("number" === typeof n && i !== n) throw new Error(`${t} expected ${n} bytes, got ${i}`);
      return r;
    }
    function I(...t) {
      const e = new Uint8Array(t.reduce((t, e) => t + e.length, 0));
      let n = 0;
      return (t.forEach(t => {
        if (!w(t)) throw new Error("Uint8Array expected");
        (e.set(t, n), n += t.length);
      }), e);
    }
    const B = t => (y << BigInt(t - 1)) - m, T = t => new Uint8Array(t), k = t => Uint8Array.from(t);
    function P(t, e, n) {
      if ("number" !== typeof t || t < 2) throw new Error("hashLen must be a number");
      if ("number" !== typeof e || e < 2) throw new Error("qByteLen must be a number");
      if ("function" !== typeof n) throw new Error("hmacFn must be a function");
      let r = T(t), i = T(t), o = 0;
      const s = () => {
        (r.fill(1), i.fill(0), o = 0);
      }, a = (...t) => n(i, r, ...t), u = (t = T()) => {
        (i = a(k([0]), t), r = a(), 0 !== t.length && (i = a(k([1]), t), r = a()));
      }, c = () => {
        if (o++ >= 1000) throw new Error("drbg: tried 1000 values");
        let t = 0;
        const n = [];
        for (; t < e; ) {
          r = a();
          const e = r.slice();
          (n.push(e), t += r.length);
        }
        return I(...n);
      };
      return (t, e) => {
        let n;
        for ((s(), u(t)); !(n = e(c())); ) u();
        return (s(), n);
      };
    }
    const U = {
      bigint: t => "bigint" === typeof t,
      function: t => "function" === typeof t,
      boolean: t => "boolean" === typeof t,
      string: t => "string" === typeof t,
      stringOrUint8Array: t => "string" === typeof t || t instanceof Uint8Array,
      isSafeInteger: t => Number.isSafeInteger(t),
      array: t => Array.isArray(t),
      field: (t, e) => e.Fp.isValid(t),
      hash: t => "function" === typeof t && Number.isSafeInteger(t.outputLen)
    };
    function C(t, e, n = {}) {
      const r = (e, n, r) => {
        const i = U[n];
        if ("function" !== typeof i) throw new Error(`Invalid validator "${n}", expected function`);
        const o = t[e];
        if ((!r || void 0 !== o) && !i(o, t)) throw new Error(`Invalid param ${String(e)}=${o} (${typeof o}), expected ${n}`);
      };
      for (const [i, o] of Object.entries(e)) r(i, o, !1);
      for (const [i, o] of Object.entries(n)) r(i, o, !0);
      return t;
    }
    const _ = BigInt(0), L = BigInt(1), F = BigInt(2), j = BigInt(3), D = BigInt(4), z = BigInt(5), V = BigInt(8);
    (BigInt(9), BigInt(16));
    function $(t, e) {
      const n = t % e;
      return n >= _ ? n : e + n;
    }
    function q(t, e, n) {
      if (n <= _ || e < _) throw new Error("Expected power/modulo > 0");
      if (n === L) return _;
      let r = L;
      for (; e > _; ) (e & L && (r = r * t % n), t = t * t % n, e >>= L);
      return r;
    }
    function M(t, e, n) {
      let r = t;
      for (; e-- > _; ) (r *= r, r %= n);
      return r;
    }
    function H(t, e) {
      if (t === _ || e <= _) throw new Error(`invert: expected positive integers, got n=${t} mod=${e}`);
      let n = $(t, e), r = e, i = _, o = L, s = L, a = _;
      for (; n !== _; ) {
        const t = r / n, e = r % n, u = i - s * t, c = o - a * t;
        (r = n, n = e, i = s, o = a, s = u, a = c);
      }
      if (r !== L) throw new Error("invert: does not exist");
      return $(i, e);
    }
    function K(t) {
      if (t % D === j) {
        const e = (t + L) / D;
        return function (t, n) {
          const r = t.pow(n, e);
          if (!t.eql(t.sqr(r), n)) throw new Error("Cannot find square root");
          return r;
        };
      }
      if (t % V === z) {
        const e = (t - z) / V;
        return function (t, n) {
          const r = t.mul(n, F), i = t.pow(r, e), o = t.mul(n, i), s = t.mul(t.mul(o, F), i), a = t.mul(o, t.sub(s, t.ONE));
          if (!t.eql(t.sqr(a), n)) throw new Error("Cannot find square root");
          return a;
        };
      }
      return (function (t) {
        const e = (t - L) / F;
        let n, r, i;
        for ((n = t - L, r = 0); n % F === _; (n /= F, r++)) ;
        for (i = F; i < t && q(i, e, t) !== t - L; i++) ;
        if (1 === r) {
          const e = (t + L) / D;
          return function (t, n) {
            const r = t.pow(n, e);
            if (!t.eql(t.sqr(r), n)) throw new Error("Cannot find square root");
            return r;
          };
        }
        const o = (n + L) / F;
        return function (t, s) {
          if (t.pow(s, e) === t.neg(t.ONE)) throw new Error("Cannot find square root");
          let a = r, u = t.pow(t.mul(t.ONE, i), n), c = t.pow(s, o), l = t.pow(s, n);
          for (; !t.eql(l, t.ONE); ) {
            if (t.eql(l, t.ZERO)) return t.ZERO;
            let e = 1;
            for (let r = t.sqr(l); e < a && !t.eql(r, t.ONE); e++) r = t.sqr(r);
            const n = t.pow(u, L << BigInt(a - e - 1));
            (u = t.sqr(n), c = t.mul(c, n), l = t.mul(l, u), a = e);
          }
          return c;
        };
      })(t);
    }
    const G = ["create", "isValid", "is0", "neg", "inv", "sqrt", "sqr", "eql", "add", "sub", "mul", "pow", "div", "addN", "subN", "mulN", "sqrN"];
    function Z(t, e) {
      const n = void 0 !== e ? e : t.toString(2).length;
      return {
        nBitLength: n,
        nByteLength: Math.ceil(n / 8)
      };
    }
    function J(t) {
      if ("bigint" !== typeof t) throw new Error("field order must be bigint");
      const e = t.toString(2).length;
      return Math.ceil(e / 8);
    }
    function W(t) {
      const e = J(t);
      return e + Math.ceil(e / 2);
    }
    class Y extends u.kb {
      constructor(t, e) {
        (super(), this.finished = !1, this.destroyed = !1, (0, a.vp)(t));
        const n = (0, u.O0)(e);
        if ((this.iHash = t.create(), "function" !== typeof this.iHash.update)) throw new Error("Expected instance of class which extends utils.Hash");
        (this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen);
        const r = this.blockLen, i = new Uint8Array(r);
        i.set(n.length > r ? t.create().update(n).digest() : n);
        for (let o = 0; o < i.length; o++) i[o] ^= 54;
        (this.iHash.update(i), this.oHash = t.create());
        for (let o = 0; o < i.length; o++) i[o] ^= 106;
        (this.oHash.update(i), i.fill(0));
      }
      update(t) {
        return ((0, a.Gg)(this), this.iHash.update(t), this);
      }
      digestInto(t) {
        ((0, a.Gg)(this), (0, a.aI)(t, this.outputLen), this.finished = !0, this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy());
      }
      digest() {
        const t = new Uint8Array(this.oHash.outputLen);
        return (this.digestInto(t), t);
      }
      _cloneInto(t) {
        t || (t = Object.create(Object.getPrototypeOf(this), {}));
        const {oHash: e, iHash: n, finished: r, destroyed: i, blockLen: o, outputLen: s} = this;
        return (t.finished = r, t.destroyed = i, t.blockLen = o, t.outputLen = s, t.oHash = e._cloneInto(t.oHash), t.iHash = n._cloneInto(t.iHash), t);
      }
      destroy() {
        (this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy());
      }
    }
    const X = (t, e, n) => new Y(t, e).update(n).digest();
    X.create = (t, e) => new Y(t, e);
    const Q = BigInt(0), tt = BigInt(1);
    function et(t) {
      return (C(t.Fp, G.reduce((t, e) => (t[e] = "function", t), {
        ORDER: "bigint",
        MASK: "bigint",
        BYTES: "isSafeInteger",
        BITS: "isSafeInteger"
      })), C(t, {
        n: "bigint",
        h: "bigint",
        Gx: "field",
        Gy: "field"
      }, {
        nBitLength: "isSafeInteger",
        nByteLength: "isSafeInteger"
      }), Object.freeze({
        ...Z(t.n, t.nBitLength),
        ...t,
        p: t.Fp.ORDER
      }));
    }
    const {bytesToNumberBE: nt, hexToBytes: rt} = r, it = {
      Err: class extends Error {
        constructor(t = "") {
          super(t);
        }
      },
      _parseInt(t) {
        const {Err: e} = it;
        if (t.length < 2 || 2 !== t[0]) throw new e("Invalid signature integer tag");
        const n = t[1], r = t.subarray(2, n + 2);
        if (!n || r.length !== n) throw new e("Invalid signature integer: wrong length");
        if (128 & r[0]) throw new e("Invalid signature integer: negative");
        if (0 === r[0] && !(128 & r[1])) throw new e("Invalid signature integer: unnecessary leading zero");
        return {
          d: nt(r),
          l: t.subarray(n + 2)
        };
      },
      toSig(t) {
        const {Err: e} = it, n = "string" === typeof t ? rt(t) : t;
        if (!(n instanceof Uint8Array)) throw new Error("ui8a expected");
        let r = n.length;
        if (r < 2 || 48 != n[0]) throw new e("Invalid signature tag");
        if (n[1] !== r - 2) throw new e("Invalid signature: incorrect length");
        const {d: i, l: o} = it._parseInt(n.subarray(2)), {d: s, l: a} = it._parseInt(o);
        if (a.length) throw new e("Invalid signature: left bytes after parsing");
        return {
          r: i,
          s: s
        };
      },
      hexFromSig(t) {
        const e = t => 8 & Number.parseInt(t[0], 16) ? "00" + t : t, n = t => {
          const e = t.toString(16);
          return 1 & e.length ? `0${e}` : e;
        }, r = e(n(t.s)), i = e(n(t.r)), o = r.length / 2, s = i.length / 2, a = n(o), u = n(s);
        return `30${n(s + o + 4)}02${u}${i}02${a}${r}`;
      }
    }, ot = BigInt(0), st = BigInt(1), at = (BigInt(2), BigInt(3));
    BigInt(4);
    function ut(t) {
      const e = (function (t) {
        const e = et(t);
        C(e, {
          a: "field",
          b: "field"
        }, {
          allowedPrivateKeyLengths: "array",
          wrapPrivateKey: "boolean",
          isTorsionFree: "function",
          clearCofactor: "function",
          allowInfinityPoint: "boolean",
          fromBytes: "function",
          toBytes: "function"
        });
        const {endo: n, Fp: r, a: i} = e;
        if (n) {
          if (!r.eql(i, r.ZERO)) throw new Error("Endomorphism can only be defined for Koblitz curves that have a=0");
          if ("object" !== typeof n || "bigint" !== typeof n.beta || "function" !== typeof n.splitScalar) throw new Error("Expected endomorphism with beta: bigint and splitScalar: function");
        }
        return Object.freeze({
          ...e
        });
      })(t), {Fp: n} = e, r = e.toBytes || ((t, e, r) => {
        const i = e.toAffine();
        return I(Uint8Array.from([4]), n.toBytes(i.x), n.toBytes(i.y));
      }), i = e.fromBytes || (t => {
        const e = t.subarray(1);
        return {
          x: n.fromBytes(e.subarray(0, n.BYTES)),
          y: n.fromBytes(e.subarray(n.BYTES, 2 * n.BYTES))
        };
      });
      function o(t) {
        const {a: r, b: i} = e, o = n.sqr(t), s = n.mul(o, t);
        return n.add(n.add(s, n.mul(t, r)), i);
      }
      if (!n.eql(n.sqr(e.Gy), o(e.Gx))) throw new Error("bad generator point: equation left != right");
      function s(t) {
        return "bigint" === typeof t && ot < t && t < e.n;
      }
      function a(t) {
        if (!s(t)) throw new Error("Expected valid bigint: 0 < bigint < curve.n");
      }
      function u(t) {
        const {allowedPrivateKeyLengths: n, nByteLength: r, wrapPrivateKey: i, n: o} = e;
        if (n && "bigint" !== typeof t) {
          if ((t instanceof Uint8Array && (t = v(t)), "string" !== typeof t || !n.includes(t.length))) throw new Error("Invalid key");
          t = t.padStart(2 * r, "0");
        }
        let s;
        try {
          s = "bigint" === typeof t ? t : S(N("private key", t, r));
        } catch (u) {
          throw new Error(`private key must be ${r} bytes, hex or bigint, not ${typeof t}`);
        }
        return (i && (s = $(s, o)), a(s), s);
      }
      const c = new Map();
      function l(t) {
        if (!(t instanceof f)) throw new Error("ProjectivePoint expected");
      }
      class f {
        constructor(t, e, r) {
          if ((this.px = t, this.py = e, this.pz = r, null == t || !n.isValid(t))) throw new Error("x required");
          if (null == e || !n.isValid(e)) throw new Error("y required");
          if (null == r || !n.isValid(r)) throw new Error("z required");
        }
        static fromAffine(t) {
          const {x: e, y: r} = t || ({});
          if (!t || !n.isValid(e) || !n.isValid(r)) throw new Error("invalid affine point");
          if (t instanceof f) throw new Error("projective point not allowed");
          const i = t => n.eql(t, n.ZERO);
          return i(e) && i(r) ? f.ZERO : new f(e, r, n.ONE);
        }
        get x() {
          return this.toAffine().x;
        }
        get y() {
          return this.toAffine().y;
        }
        static normalizeZ(t) {
          const e = n.invertBatch(t.map(t => t.pz));
          return t.map((t, n) => t.toAffine(e[n])).map(f.fromAffine);
        }
        static fromHex(t) {
          const e = f.fromAffine(i(N("pointHex", t)));
          return (e.assertValidity(), e);
        }
        static fromPrivateKey(t) {
          return f.BASE.multiply(u(t));
        }
        _setWindowSize(t) {
          (this._WINDOW_SIZE = t, c.delete(this));
        }
        assertValidity() {
          if (this.is0()) {
            if (e.allowInfinityPoint && !n.is0(this.py)) return;
            throw new Error("bad point: ZERO");
          }
          const {x: t, y: r} = this.toAffine();
          if (!n.isValid(t) || !n.isValid(r)) throw new Error("bad point: x or y not FE");
          const i = n.sqr(r), s = o(t);
          if (!n.eql(i, s)) throw new Error("bad point: equation left != right");
          if (!this.isTorsionFree()) throw new Error("bad point: not in prime-order subgroup");
        }
        hasEvenY() {
          const {y: t} = this.toAffine();
          if (n.isOdd) return !n.isOdd(t);
          throw new Error("Field doesn't support isOdd");
        }
        equals(t) {
          l(t);
          const {px: e, py: r, pz: i} = this, {px: o, py: s, pz: a} = t, u = n.eql(n.mul(e, a), n.mul(o, i)), c = n.eql(n.mul(r, a), n.mul(s, i));
          return u && c;
        }
        negate() {
          return new f(this.px, n.neg(this.py), this.pz);
        }
        double() {
          const {a: t, b: r} = e, i = n.mul(r, at), {px: o, py: s, pz: a} = this;
          let u = n.ZERO, c = n.ZERO, l = n.ZERO, h = n.mul(o, o), d = n.mul(s, s), p = n.mul(a, a), g = n.mul(o, s);
          return (g = n.add(g, g), l = n.mul(o, a), l = n.add(l, l), u = n.mul(t, l), c = n.mul(i, p), c = n.add(u, c), u = n.sub(d, c), c = n.add(d, c), c = n.mul(u, c), u = n.mul(g, u), l = n.mul(i, l), p = n.mul(t, p), g = n.sub(h, p), g = n.mul(t, g), g = n.add(g, l), l = n.add(h, h), h = n.add(l, h), h = n.add(h, p), h = n.mul(h, g), c = n.add(c, h), p = n.mul(s, a), p = n.add(p, p), h = n.mul(p, g), u = n.sub(u, h), l = n.mul(p, d), l = n.add(l, l), l = n.add(l, l), new f(u, c, l));
        }
        add(t) {
          l(t);
          const {px: r, py: i, pz: o} = this, {px: s, py: a, pz: u} = t;
          let c = n.ZERO, h = n.ZERO, d = n.ZERO;
          const p = e.a, g = n.mul(e.b, at);
          let m = n.mul(r, s), y = n.mul(i, a), w = n.mul(o, u), b = n.add(r, i), v = n.add(s, a);
          (b = n.mul(b, v), v = n.add(m, y), b = n.sub(b, v), v = n.add(r, o));
          let E = n.add(s, u);
          return (v = n.mul(v, E), E = n.add(m, w), v = n.sub(v, E), E = n.add(i, o), c = n.add(a, u), E = n.mul(E, c), c = n.add(y, w), E = n.sub(E, c), d = n.mul(p, v), c = n.mul(g, w), d = n.add(c, d), c = n.sub(y, d), d = n.add(y, d), h = n.mul(c, d), y = n.add(m, m), y = n.add(y, m), w = n.mul(p, w), v = n.mul(g, v), y = n.add(y, w), w = n.sub(m, w), w = n.mul(p, w), v = n.add(v, w), m = n.mul(y, v), h = n.add(h, m), m = n.mul(E, v), c = n.mul(b, c), c = n.sub(c, m), m = n.mul(b, y), d = n.mul(E, d), d = n.add(d, m), new f(c, h, d));
        }
        subtract(t) {
          return this.add(t.negate());
        }
        is0() {
          return this.equals(f.ZERO);
        }
        wNAF(t) {
          return d.wNAFCached(this, c, t, t => {
            const e = n.invertBatch(t.map(t => t.pz));
            return t.map((t, n) => t.toAffine(e[n])).map(f.fromAffine);
          });
        }
        multiplyUnsafe(t) {
          const r = f.ZERO;
          if (t === ot) return r;
          if ((a(t), t === st)) return this;
          const {endo: i} = e;
          if (!i) return d.unsafeLadder(this, t);
          let {k1neg: o, k1: s, k2neg: u, k2: c} = i.splitScalar(t), l = r, h = r, p = this;
          for (; s > ot || c > ot; ) (s & st && (l = l.add(p)), c & st && (h = h.add(p)), p = p.double(), s >>= st, c >>= st);
          return (o && (l = l.negate()), u && (h = h.negate()), h = new f(n.mul(h.px, i.beta), h.py, h.pz), l.add(h));
        }
        multiply(t) {
          a(t);
          let r, i, o = t;
          const {endo: s} = e;
          if (s) {
            const {k1neg: t, k1: e, k2neg: a, k2: u} = s.splitScalar(o);
            let {p: c, f: l} = this.wNAF(e), {p: h, f: p} = this.wNAF(u);
            (c = d.constTimeNegate(t, c), h = d.constTimeNegate(a, h), h = new f(n.mul(h.px, s.beta), h.py, h.pz), r = c.add(h), i = l.add(p));
          } else {
            const {p: t, f: e} = this.wNAF(o);
            (r = t, i = e);
          }
          return f.normalizeZ([r, i])[0];
        }
        multiplyAndAddUnsafe(t, e, n) {
          const r = f.BASE, i = (t, e) => e !== ot && e !== st && t.equals(r) ? t.multiply(e) : t.multiplyUnsafe(e), o = i(this, e).add(i(t, n));
          return o.is0() ? void 0 : o;
        }
        toAffine(t) {
          const {px: e, py: r, pz: i} = this, o = this.is0();
          null == t && (t = o ? n.ONE : n.inv(i));
          const s = n.mul(e, t), a = n.mul(r, t), u = n.mul(i, t);
          if (o) return {
            x: n.ZERO,
            y: n.ZERO
          };
          if (!n.eql(u, n.ONE)) throw new Error("invZ was invalid");
          return {
            x: s,
            y: a
          };
        }
        isTorsionFree() {
          const {h: t, isTorsionFree: n} = e;
          if (t === st) return !0;
          if (n) return n(f, this);
          throw new Error("isTorsionFree() has not been declared for the elliptic curve");
        }
        clearCofactor() {
          const {h: t, clearCofactor: n} = e;
          return t === st ? this : n ? n(f, this) : this.multiplyUnsafe(e.h);
        }
        toRawBytes(t = !0) {
          return (this.assertValidity(), r(f, this, t));
        }
        toHex(t = !0) {
          return v(this.toRawBytes(t));
        }
      }
      (f.BASE = new f(e.Gx, e.Gy, n.ONE), f.ZERO = new f(n.ZERO, n.ONE, n.ZERO));
      const h = e.nBitLength, d = (function (t, e) {
        const n = (t, e) => {
          const n = e.negate();
          return t ? n : e;
        }, r = t => ({
          windows: Math.ceil(e / t) + 1,
          windowSize: 2 ** (t - 1)
        });
        return {
          constTimeNegate: n,
          unsafeLadder(e, n) {
            let r = t.ZERO, i = e;
            for (; n > Q; ) (n & tt && (r = r.add(i)), i = i.double(), n >>= tt);
            return r;
          },
          precomputeWindow(t, e) {
            const {windows: n, windowSize: i} = r(e), o = [];
            let s = t, a = s;
            for (let r = 0; r < n; r++) {
              (a = s, o.push(a));
              for (let t = 1; t < i; t++) (a = a.add(s), o.push(a));
              s = a.double();
            }
            return o;
          },
          wNAF(e, i, o) {
            const {windows: s, windowSize: a} = r(e);
            let u = t.ZERO, c = t.BASE;
            const l = BigInt(2 ** e - 1), f = 2 ** e, h = BigInt(e);
            for (let t = 0; t < s; t++) {
              const e = t * a;
              let r = Number(o & l);
              (o >>= h, r > a && (r -= f, o += tt));
              const s = e, d = e + Math.abs(r) - 1, p = t % 2 !== 0, g = r < 0;
              0 === r ? c = c.add(n(p, i[s])) : u = u.add(n(g, i[d]));
            }
            return {
              p: u,
              f: c
            };
          },
          wNAFCached(t, e, n, r) {
            const i = t._WINDOW_SIZE || 1;
            let o = e.get(t);
            return (o || (o = this.precomputeWindow(t, i), 1 !== i && e.set(t, r(o))), this.wNAF(i, o, n));
          }
        };
      })(f, e.endo ? Math.ceil(h / 2) : h);
      return {
        CURVE: e,
        ProjectivePoint: f,
        normPrivateKeyToScalar: u,
        weierstrassEquation: o,
        isWithinCurveOrder: s
      };
    }
    function ct(t) {
      const e = (function (t) {
        const e = et(t);
        return (C(e, {
          hash: "hash",
          hmac: "function",
          randomBytes: "function"
        }, {
          bits2int: "function",
          bits2int_modN: "function",
          lowS: "boolean"
        }), Object.freeze({
          lowS: !0,
          ...e
        }));
      })(t), {Fp: n, n: r} = e, i = n.BYTES + 1, o = 2 * n.BYTES + 1;
      function s(t) {
        return $(t, r);
      }
      function a(t) {
        return H(t, r);
      }
      const {ProjectivePoint: u, normPrivateKeyToScalar: c, weierstrassEquation: l, isWithinCurveOrder: f} = ut({
        ...e,
        toBytes(t, e, r) {
          const i = e.toAffine(), o = n.toBytes(i.x), s = I;
          return r ? s(Uint8Array.from([e.hasEvenY() ? 2 : 3]), o) : s(Uint8Array.from([4]), o, n.toBytes(i.y));
        },
        fromBytes(t) {
          const e = t.length, r = t[0], s = t.subarray(1);
          if (e !== i || 2 !== r && 3 !== r) {
            if (e === o && 4 === r) {
              return {
                x: n.fromBytes(s.subarray(0, n.BYTES)),
                y: n.fromBytes(s.subarray(n.BYTES, 2 * n.BYTES))
              };
            }
            throw new Error(`Point of length ${e} was invalid. Expected ${i} compressed bytes or ${o} uncompressed bytes`);
          }
          {
            const t = S(s);
            if (!(ot < (a = t) && a < n.ORDER)) throw new Error("Point is not on curve");
            const e = l(t);
            let i = n.sqrt(e);
            return (1 === (1 & r) !== ((i & st) === st) && (i = n.neg(i)), {
              x: t,
              y: i
            });
          }
          var a;
        }
      }), h = t => v(A(t, e.nByteLength));
      function d(t) {
        return t > r >> st;
      }
      const p = (t, e, n) => S(t.slice(e, n));
      class g {
        constructor(t, e, n) {
          (this.r = t, this.s = e, this.recovery = n, this.assertValidity());
        }
        static fromCompact(t) {
          const n = e.nByteLength;
          return (t = N("compactSignature", t, 2 * n), new g(p(t, 0, n), p(t, n, 2 * n)));
        }
        static fromDER(t) {
          const {r: e, s: n} = it.toSig(N("DER", t));
          return new g(e, n);
        }
        assertValidity() {
          if (!f(this.r)) throw new Error("r must be 0 < r < CURVE.n");
          if (!f(this.s)) throw new Error("s must be 0 < s < CURVE.n");
        }
        addRecoveryBit(t) {
          return new g(this.r, this.s, t);
        }
        recoverPublicKey(t) {
          const {r: r, s: i, recovery: o} = this, c = b(N("msgHash", t));
          if (null == o || ![0, 1, 2, 3].includes(o)) throw new Error("recovery id invalid");
          const l = 2 === o || 3 === o ? r + e.n : r;
          if (l >= n.ORDER) throw new Error("recovery id 2 or 3 invalid");
          const f = 0 === (1 & o) ? "02" : "03", d = u.fromHex(f + h(l)), p = a(l), g = s(-c * p), m = s(i * p), y = u.BASE.multiplyAndAddUnsafe(d, g, m);
          if (!y) throw new Error("point at infinify");
          return (y.assertValidity(), y);
        }
        hasHighS() {
          return d(this.s);
        }
        normalizeS() {
          return this.hasHighS() ? new g(this.r, s(-this.s), this.recovery) : this;
        }
        toDERRawBytes() {
          return x(this.toDERHex());
        }
        toDERHex() {
          return it.hexFromSig({
            r: this.r,
            s: this.s
          });
        }
        toCompactRawBytes() {
          return x(this.toCompactHex());
        }
        toCompactHex() {
          return h(this.r) + h(this.s);
        }
      }
      const m = {
        isValidPrivateKey(t) {
          try {
            return (c(t), !0);
          } catch (e) {
            return !1;
          }
        },
        normPrivateKeyToScalar: c,
        randomPrivateKey: () => {
          const t = W(e.n);
          return (function (t, e, n = !1) {
            const r = t.length, i = J(e), o = W(e);
            if (r < 16 || r < o || r > 1024) throw new Error(`expected ${o}-1024 bytes of input, got ${r}`);
            const s = $(n ? S(t) : O(t), e - L) + L;
            return n ? R(s, i) : A(s, i);
          })(e.randomBytes(t), e.n);
        },
        precompute: (t = 8, e = u.BASE) => (e._setWindowSize(t), e.multiply(BigInt(3)), e)
      };
      function y(t) {
        const e = t instanceof Uint8Array, n = "string" === typeof t, r = (e || n) && t.length;
        return e ? r === i || r === o : n ? r === 2 * i || r === 2 * o : t instanceof u;
      }
      const w = e.bits2int || (function (t) {
        const n = S(t), r = 8 * t.length - e.nBitLength;
        return r > 0 ? n >> BigInt(r) : n;
      }), b = e.bits2int_modN || (function (t) {
        return s(w(t));
      }), E = B(e.nBitLength);
      function T(t) {
        if ("bigint" !== typeof t) throw new Error("bigint expected");
        if (!(ot <= t && t < E)) throw new Error(`bigint expected < 2^${e.nBitLength}`);
        return A(t, e.nByteLength);
      }
      function k(t, r, i = U) {
        if (["recovered", "canonical"].some(t => (t in i))) throw new Error("sign() legacy options not supported");
        const {hash: o, randomBytes: l} = e;
        let {lowS: h, prehash: p, extraEntropy: m} = i;
        (null == h && (h = !0), t = N("msgHash", t), p && (t = N("prehashed msgHash", o(t))));
        const y = b(t), v = c(r), E = [T(v), T(y)];
        if (null != m) {
          const t = !0 === m ? l(n.BYTES) : m;
          E.push(N("extraEntropy", t));
        }
        const x = I(...E), S = y;
        return {
          seed: x,
          k2sig: function (t) {
            const e = w(t);
            if (!f(e)) return;
            const n = a(e), r = u.BASE.multiply(e).toAffine(), i = s(r.x);
            if (i === ot) return;
            const o = s(n * s(S + i * v));
            if (o === ot) return;
            let c = (r.x === i ? 0 : 2) | Number(r.y & st), l = o;
            return (h && d(o) && (l = (function (t) {
              return d(t) ? s(-t) : t;
            })(o), c ^= 1), new g(i, l, c));
          }
        };
      }
      const U = {
        lowS: e.lowS,
        prehash: !1
      }, _ = {
        lowS: e.lowS,
        prehash: !1
      };
      return (u.BASE._setWindowSize(8), {
        CURVE: e,
        getPublicKey: function (t, e = !0) {
          return u.fromPrivateKey(t).toRawBytes(e);
        },
        getSharedSecret: function (t, e, n = !0) {
          if (y(t)) throw new Error("first arg must be private key");
          if (!y(e)) throw new Error("second arg must be public key");
          return u.fromHex(e).multiply(c(t)).toRawBytes(n);
        },
        sign: function (t, n, r = U) {
          const {seed: i, k2sig: o} = k(t, n, r), s = e;
          return P(s.hash.outputLen, s.nByteLength, s.hmac)(i, o);
        },
        verify: function (t, n, r, i = _) {
          const o = t;
          if ((n = N("msgHash", n), r = N("publicKey", r), ("strict" in i))) throw new Error("options.strict was renamed to lowS");
          const {lowS: c, prehash: l} = i;
          let f, h;
          try {
            if ("string" === typeof o || o instanceof Uint8Array) try {
              f = g.fromDER(o);
            } catch (x) {
              if (!(x instanceof it.Err)) throw x;
              f = g.fromCompact(o);
            } else {
              if ("object" !== typeof o || "bigint" !== typeof o.r || "bigint" !== typeof o.s) throw new Error("PARSE");
              {
                const {r: t, s: e} = o;
                f = new g(t, e);
              }
            }
            h = u.fromHex(r);
          } catch (S) {
            if ("PARSE" === S.message) throw new Error("signature must be Signature instance, Uint8Array or hex string");
            return !1;
          }
          if (c && f.hasHighS()) return !1;
          l && (n = e.hash(n));
          const {r: d, s: p} = f, m = b(n), y = a(p), w = s(m * y), v = s(d * y), E = u.BASE.multiplyAndAddUnsafe(h, w, v)?.toAffine();
          return !!E && s(E.x) === d;
        },
        ProjectivePoint: u,
        Signature: g,
        utils: m
      });
    }
    function lt(t) {
      return {
        hash: t,
        hmac: (e, ...n) => X(t, e, (0, u.eV)(...n)),
        randomBytes: u.O6
      };
    }
    const ft = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"), ht = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"), dt = BigInt(1), pt = BigInt(2), gt = (t, e) => (t + e / pt) / e;
    function mt(t) {
      const e = ft, n = BigInt(3), r = BigInt(6), i = BigInt(11), o = BigInt(22), s = BigInt(23), a = BigInt(44), u = BigInt(88), c = t * t * t % e, l = c * c * t % e, f = M(l, n, e) * l % e, h = M(f, n, e) * l % e, d = M(h, pt, e) * c % e, p = M(d, i, e) * d % e, g = M(p, o, e) * p % e, m = M(g, a, e) * g % e, y = M(m, u, e) * m % e, w = M(y, a, e) * g % e, b = M(w, n, e) * l % e, v = M(b, s, e) * p % e, E = M(v, r, e) * c % e, x = M(E, pt, e);
      if (!yt.eql(yt.sqr(x), t)) throw new Error("Cannot find square root");
      return x;
    }
    const yt = (function (t, e, n = !1, r = {}) {
      if (t <= _) throw new Error(`Expected Field ORDER > 0, got ${t}`);
      const {nBitLength: i, nByteLength: o} = Z(t, e);
      if (o > 2048) throw new Error("Field lengths over 2048 bytes are not supported");
      const s = K(t), a = Object.freeze({
        ORDER: t,
        BITS: i,
        BYTES: o,
        MASK: B(i),
        ZERO: _,
        ONE: L,
        create: e => $(e, t),
        isValid: e => {
          if ("bigint" !== typeof e) throw new Error("Invalid field element: expected bigint, got " + typeof e);
          return _ <= e && e < t;
        },
        is0: t => t === _,
        isOdd: t => (t & L) === L,
        neg: e => $(-e, t),
        eql: (t, e) => t === e,
        sqr: e => $(e * e, t),
        add: (e, n) => $(e + n, t),
        sub: (e, n) => $(e - n, t),
        mul: (e, n) => $(e * n, t),
        pow: (t, e) => (function (t, e, n) {
          if (n < _) throw new Error("Expected power > 0");
          if (n === _) return t.ONE;
          if (n === L) return e;
          let r = t.ONE, i = e;
          for (; n > _; ) (n & L && (r = t.mul(r, i)), i = t.sqr(i), n >>= L);
          return r;
        })(a, t, e),
        div: (e, n) => $(e * H(n, t), t),
        sqrN: t => t * t,
        addN: (t, e) => t + e,
        subN: (t, e) => t - e,
        mulN: (t, e) => t * e,
        inv: e => H(e, t),
        sqrt: r.sqrt || (t => s(a, t)),
        invertBatch: t => (function (t, e) {
          const n = new Array(e.length), r = e.reduce((e, r, i) => t.is0(r) ? e : (n[i] = e, t.mul(e, r)), t.ONE), i = t.inv(r);
          return (e.reduceRight((e, r, i) => t.is0(r) ? e : (n[i] = t.mul(e, n[i]), t.mul(e, r)), i), n);
        })(a, t),
        cmov: (t, e, n) => n ? e : t,
        toBytes: t => n ? R(t, o) : A(t, o),
        fromBytes: t => {
          if (t.length !== o) throw new Error(`Fp.fromBytes: expected ${o}, got ${t.length}`);
          return n ? O(t) : S(t);
        }
      });
      return Object.freeze(a);
    })(ft, void 0, void 0, {
      sqrt: mt
    }), wt = (function (t, e) {
      const n = e => ct({
        ...t,
        ...lt(e)
      });
      return Object.freeze({
        ...n(e),
        create: n
      });
    })({
      a: BigInt(0),
      b: BigInt(7),
      Fp: yt,
      n: ht,
      Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
      Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
      h: BigInt(1),
      lowS: !0,
      endo: {
        beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
        splitScalar: t => {
          const e = ht, n = BigInt("0x3086d221a7d46bcde86c90e49284eb15"), r = -dt * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"), i = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), o = n, s = BigInt("0x100000000000000000000000000000000"), a = gt(o * t, e), u = gt(-r * t, e);
          let c = $(t - a * n - u * i, e), l = $(-a * r - u * o, e);
          const f = c > s, h = l > s;
          if ((f && (c = e - c), h && (l = e - l), c > s || l > s)) throw new Error("splitScalar: Endomorphism failed, k=" + t);
          return {
            k1neg: f,
            k1: c,
            k2neg: h,
            k2: l
          };
        }
      }
    }, g);
    BigInt(0);
    wt.ProjectivePoint;
    var bt = n(35157), vt = n(59369), Et = n(45474);
    const xt = "0x0000000000000000000000000000000000000000000000000000000000000000", St = BigInt(0), Ot = BigInt(1), At = BigInt(2), Rt = BigInt(27), Nt = BigInt(28), It = BigInt(35), Bt = {};
    function Tt(t) {
      return (0, vt.U3)((0, Et.ot)(t), 32);
    }
    class kt {
      #g;
      #m;
      #y;
      #w;
      get r() {
        return this.#g;
      }
      set r(t) {
        ((0, bt.en)(32 === (0, vt.M5)(t), "invalid r", "value", t), this.#g = (0, vt.Dv)(t));
      }
      get s() {
        return ((0, bt.en)(parseInt(this.#m.substring(0, 3)) < 8, "non-canonical s; use ._s", "s", this.#m), this.#m);
      }
      set s(t) {
        ((0, bt.en)(32 === (0, vt.M5)(t), "invalid s", "value", t), this.#m = (0, vt.Dv)(t));
      }
      get _s() {
        return this.#m;
      }
      isValid() {
        return parseInt(this.#m.substring(0, 3)) < 8;
      }
      get v() {
        return this.#y;
      }
      set v(t) {
        const e = (0, Et.Dx)(t, "value");
        ((0, bt.en)(27 === e || 28 === e, "invalid v", "v", t), this.#y = e);
      }
      get networkV() {
        return this.#w;
      }
      get legacyChainId() {
        const t = this.networkV;
        return null == t ? null : kt.getChainId(t);
      }
      get yParity() {
        return 27 === this.v ? 0 : 1;
      }
      get yParityAndS() {
        const t = (0, vt.Pw)(this.s);
        return (this.yParity && (t[0] |= 128), (0, vt.Dv)(t));
      }
      get compactSerialized() {
        return (0, vt.zo)([this.r, this.yParityAndS]);
      }
      get serialized() {
        return (0, vt.zo)([this.r, this.s, this.yParity ? "0x1c" : "0x1b"]);
      }
      constructor(t, e, n, r) {
        ((0, bt.NK)(t, Bt, "Signature"), this.#g = e, this.#m = n, this.#y = r, this.#w = null);
      }
      [Symbol.for("nodejs.util.inspect.custom")]() {
        return `Signature { r: "${this.r}", s: "${this._s}"${this.isValid() ? "" : ", valid: \"false\""}, yParity: ${this.yParity}, networkV: ${this.networkV} }`;
      }
      clone() {
        const t = new kt(Bt, this.r, this._s, this.v);
        return (this.networkV && (t.#w = this.networkV), t);
      }
      toJSON() {
        const t = this.networkV;
        return {
          _type: "signature",
          networkV: null != t ? t.toString() : null,
          r: this.r,
          s: this._s,
          v: this.v
        };
      }
      static getChainId(t) {
        const e = (0, Et.yT)(t, "v");
        return e == Rt || e == Nt ? St : ((0, bt.en)(e >= It, "invalid EIP-155 v", "v", t), (e - It) / At);
      }
      static getChainIdV(t, e) {
        return (0, Et.yT)(t) * At + BigInt(35 + e - 27);
      }
      static getNormalizedV(t) {
        const e = (0, Et.yT)(t);
        return e === St || e === Rt ? 27 : e === Ot || e === Nt ? 28 : ((0, bt.en)(e >= It, "invalid v", "v", t), e & Ot ? 27 : 28);
      }
      static from(t) {
        function e(e, n) {
          (0, bt.en)(e, n, "signature", t);
        }
        if (null == t) return new kt(Bt, xt, xt, 27);
        if ("string" === typeof t) {
          const n = (0, vt.Pw)(t, "signature");
          if (64 === n.length) {
            const t = (0, vt.Dv)(n.slice(0, 32)), e = n.slice(32, 64), r = 128 & e[0] ? 28 : 27;
            return (e[0] &= 127, new kt(Bt, t, (0, vt.Dv)(e), r));
          }
          if (65 === n.length) {
            const t = (0, vt.Dv)(n.slice(0, 32)), e = (0, vt.Dv)(n.slice(32, 64)), r = kt.getNormalizedV(n[64]);
            return new kt(Bt, t, e, r);
          }
          e(!1, "invalid raw signature length");
        }
        if (t instanceof kt) return t.clone();
        const n = t.r;
        e(null != n, "missing r");
        const r = Tt(n), i = (function (t, n) {
          if (null != t) return Tt(t);
          if (null != n) {
            e((0, vt.A7)(n, 32), "invalid yParityAndS");
            const t = (0, vt.Pw)(n);
            return (t[0] &= 127, (0, vt.Dv)(t));
          }
          e(!1, "missing s");
        })(t.s, t.yParityAndS), {networkV: o, v: s} = (function (t, n, r) {
          if (null != t) {
            const e = (0, Et.yT)(t);
            return {
              networkV: e >= It ? e : void 0,
              v: kt.getNormalizedV(e)
            };
          }
          if (null != n) return (e((0, vt.A7)(n, 32), "invalid yParityAndS"), {
            v: 128 & (0, vt.Pw)(n)[0] ? 28 : 27
          });
          if (null != r) {
            switch ((0, Et.Dx)(r, "sig.yParity")) {
              case 0:
                return {
                  v: 27
                };
              case 1:
                return {
                  v: 28
                };
            }
            e(!1, "invalid yParity");
          }
          e(!1, "missing v");
        })(t.v, t.yParityAndS, t.yParity), a = new kt(Bt, r, i, s);
        return (o && (a.#w = o), e(null == t.yParity || (0, Et.Dx)(t.yParity, "sig.yParity") === a.yParity, "yParity mismatch"), e(null == t.yParityAndS || t.yParityAndS === a.yParityAndS, "yParityAndS mismatch"), a);
      }
    }
    class Pt {
      #b;
      constructor(t) {
        ((0, bt.en)(32 === (0, vt.M5)(t), "invalid private key", "privateKey", "[REDACTED]"), this.#b = (0, vt.Dv)(t));
      }
      get privateKey() {
        return this.#b;
      }
      get publicKey() {
        return Pt.computePublicKey(this.#b);
      }
      get compressedPublicKey() {
        return Pt.computePublicKey(this.#b, !0);
      }
      sign(t) {
        (0, bt.en)(32 === (0, vt.M5)(t), "invalid digest length", "digest", t);
        const e = wt.sign((0, vt.h_)(t), (0, vt.h_)(this.#b), {
          lowS: !0
        });
        return kt.from({
          r: (0, Et.m9)(e.r, 32),
          s: (0, Et.m9)(e.s, 32),
          v: e.recovery ? 28 : 27
        });
      }
      computeSharedSecret(t) {
        const e = Pt.computePublicKey(t);
        return (0, vt.Dv)(wt.getSharedSecret((0, vt.h_)(this.#b), (0, vt.Pw)(e), !1));
      }
      static computePublicKey(t, e) {
        let n = (0, vt.Pw)(t, "key");
        if (32 === n.length) {
          const t = wt.getPublicKey(n, !!e);
          return (0, vt.Dv)(t);
        }
        if (64 === n.length) {
          const t = new Uint8Array(65);
          (t[0] = 4, t.set(n, 1), n = t);
        }
        const r = wt.ProjectivePoint.fromHex(n);
        return (0, vt.Dv)(r.toRawBytes(e));
      }
      static recoverPublicKey(t, e) {
        (0, bt.en)(32 === (0, vt.M5)(t), "invalid digest length", "digest", t);
        const n = kt.from(e);
        let r = wt.Signature.fromCompact((0, vt.h_)((0, vt.zo)([n.r, n.s])));
        r = r.addRecoveryBit(n.yParity);
        const i = r.recoverPublicKey((0, vt.h_)(t));
        return ((0, bt.en)(null != i, "invalid signature for digest", "signature", e), "0x" + i.toHex(!1));
      }
      static addPoints(t, e, n) {
        const r = wt.ProjectivePoint.fromHex(Pt.computePublicKey(t).substring(2)), i = wt.ProjectivePoint.fromHex(Pt.computePublicKey(e).substring(2));
        return "0x" + r.add(i).toHex(!!n);
      }
    }
    function Ut(t, e) {
      return (function (t) {
        let e;
        return (e = "string" === typeof t ? Pt.computePublicKey(t, !1) : t.publicKey, (0, s.K)((0, i.w)("0x" + e.substring(4)).substring(26)));
      })(Pt.recoverPublicKey(t, e));
    }
    var Ct = n(9478);
    function _t(t, e) {
      const n = (function (t) {
        return ("string" === typeof t && (t = (0, Ct.Y0)(t)), (0, i.w)((0, vt.zo)([(0, Ct.Y0)(o), (0, Ct.Y0)(String(t.length)), t])));
      })(t);
      return Ut(n, e);
    }
  },
  59369: function (t, e, n) {
    n.d(e, {
      A7: function () {
        return a;
      },
      Dv: function () {
        return c;
      },
      M5: function () {
        return f;
      },
      Pw: function () {
        return o;
      },
      U3: function () {
        return d;
      },
      h_: function () {
        return s;
      },
      zo: function () {
        return l;
      }
    });
    var r = n(35157);
    function i(t, e, n) {
      if (t instanceof Uint8Array) return n ? new Uint8Array(t) : t;
      if ("string" === typeof t && t.match(/^0x(?:[0-9a-f][0-9a-f])*$/i)) {
        const e = new Uint8Array((t.length - 2) / 2);
        let n = 2;
        for (let r = 0; r < e.length; r++) (e[r] = parseInt(t.substring(n, n + 2), 16), n += 2);
        return e;
      }
      (0, r.en)(!1, "invalid BytesLike value", e || "value", t);
    }
    function o(t, e) {
      return i(t, e, !1);
    }
    function s(t, e) {
      return i(t, e, !0);
    }
    function a(t, e) {
      return !("string" !== typeof t || !t.match(/^0x[0-9A-Fa-f]*$/)) && (("number" !== typeof e || t.length === 2 + 2 * e) && (!0 !== e || t.length % 2 === 0));
    }
    const u = "0123456789abcdef";
    function c(t) {
      const e = o(t);
      let n = "0x";
      for (let r = 0; r < e.length; r++) {
        const t = e[r];
        n += u[(240 & t) >> 4] + u[15 & t];
      }
      return n;
    }
    function l(t) {
      return "0x" + t.map(t => c(t).substring(2)).join("");
    }
    function f(t) {
      return a(t, !0) ? (t.length - 2) / 2 : o(t).length;
    }
    function h(t, e, n) {
      const i = o(t);
      (0, r.hu)(e >= i.length, "padding exceeds data length", "BUFFER_OVERRUN", {
        buffer: new Uint8Array(i),
        length: e,
        offset: e + 1
      });
      const s = new Uint8Array(e);
      return (s.fill(0), n ? s.set(i, e - i.length) : s.set(i, 0), c(s));
    }
    function d(t, e) {
      return h(t, e, !0);
    }
  },
  35157: function (t, e, n) {
    n.d(e, {
      hu: function () {
        return u;
      },
      en: function () {
        return c;
      },
      fG: function () {
        return l;
      },
      fA: function () {
        return h;
      },
      NK: function () {
        return d;
      },
      VZ: function () {
        return s;
      },
      wf: function () {
        return a;
      }
    });
    const r = "6.15.0";
    var i = n(69781);
    function o(t, e) {
      if (null == t) return "null";
      if ((null == e && (e = new Set()), "object" === typeof t)) {
        if (e.has(t)) return "[Circular]";
        e.add(t);
      }
      if (Array.isArray(t)) return "[ " + t.map(t => o(t, e)).join(", ") + " ]";
      if (t instanceof Uint8Array) {
        const e = "0123456789abcdef";
        let n = "0x";
        for (let r = 0; r < t.length; r++) (n += e[t[r] >> 4], n += e[15 & t[r]]);
        return n;
      }
      if ("object" === typeof t && "function" === typeof t.toJSON) return o(t.toJSON(), e);
      switch (typeof t) {
        case "boolean":
        case "number":
        case "symbol":
          return t.toString();
        case "bigint":
          return BigInt(t).toString();
        case "string":
          return JSON.stringify(t);
        case "object":
          {
            const n = Object.keys(t);
            return (n.sort(), "{ " + n.map(n => `${o(n, e)}: ${o(t[n], e)}`).join(", ") + " }");
          }
      }
      return "[ COULD NOT SERIALIZE ]";
    }
    function s(t, e) {
      return t && t.code === e;
    }
    function a(t, e, n) {
      let s, a = t;
      {
        const i = [];
        if (n) {
          if (("message" in n) || ("code" in n) || ("name" in n)) throw new Error(`value will overwrite populated values: ${o(n)}`);
          for (const t in n) {
            if ("shortMessage" === t) continue;
            const e = n[t];
            i.push(t + "=" + o(e));
          }
        }
        (i.push(`code=${e}`), i.push(`version=${r}`), i.length && (t += " (" + i.join(", ") + ")"));
      }
      switch (e) {
        case "INVALID_ARGUMENT":
          s = new TypeError(t);
          break;
        case "NUMERIC_FAULT":
        case "BUFFER_OVERRUN":
          s = new RangeError(t);
          break;
        default:
          s = new Error(t);
      }
      return ((0, i.h)(s, {
        code: e
      }), n && Object.assign(s, n), null == s.shortMessage && (0, i.h)(s, {
        shortMessage: a
      }), s);
    }
    function u(t, e, n, r) {
      if (!t) throw a(e, n, r);
    }
    function c(t, e, n, r) {
      u(t, e, "INVALID_ARGUMENT", {
        argument: n,
        value: r
      });
    }
    function l(t, e, n) {
      (null == n && (n = ""), n && (n = ": " + n), u(t >= e, "missing argument" + n, "MISSING_ARGUMENT", {
        count: t,
        expectedCount: e
      }), u(t <= e, "too many arguments" + n, "UNEXPECTED_ARGUMENT", {
        count: t,
        expectedCount: e
      }));
    }
    const f = ["NFD", "NFC", "NFKD", "NFKC"].reduce((t, e) => {
      try {
        if ("test" !== ("test").normalize(e)) throw new Error("bad");
        if ("NFD" === e) {
          const t = String.fromCharCode(233).normalize("NFD");
          if (t !== String.fromCharCode(101, 769)) throw new Error("broken");
        }
        t.push(e);
      } catch (n) {}
      return t;
    }, []);
    function h(t) {
      u(f.indexOf(t) >= 0, "platform missing String.prototype.normalize", "UNSUPPORTED_OPERATION", {
        operation: "String.prototype.normalize",
        info: {
          form: t
        }
      });
    }
    function d(t, e, n) {
      if ((null == n && (n = ""), t !== e)) {
        let t = n, e = "new";
        (n && (t += ".", e += " " + n), u(!1, `private constructor; use ${t}from* methods`, "UNSUPPORTED_OPERATION", {
          operation: e
        }));
      }
    }
  },
  45474: function (t, e, n) {
    n.d(e, {
      $j: function () {
        return u;
      },
      Dx: function () {
        return p;
      },
      Gh: function () {
        return d;
      },
      He: function () {
        return g;
      },
      _Y: function () {
        return a;
      },
      m9: function () {
        return m;
      },
      ot: function () {
        return y;
      },
      sS: function () {
        return c;
      },
      yT: function () {
        return l;
      }
    });
    var r = n(35157);
    const i = BigInt(0), o = BigInt(1), s = 9007199254740991;
    function a(t, e) {
      const n = f(t, "value"), s = BigInt(p(e, "width"));
      if (((0, r.hu)(n >> s === i, "overflow", "NUMERIC_FAULT", {
        operation: "fromTwos",
        fault: "overflow",
        value: t
      }), n >> s - o)) {
        return -((~n & (o << s) - o) + o);
      }
      return n;
    }
    function u(t, e) {
      let n = l(t, "value");
      const s = BigInt(p(e, "width")), a = o << s - o;
      if (n < i) {
        (n = -n, (0, r.hu)(n <= a, "too low", "NUMERIC_FAULT", {
          operation: "toTwos",
          fault: "overflow",
          value: t
        }));
        return (~n & (o << s) - o) + o;
      }
      return ((0, r.hu)(n < a, "too high", "NUMERIC_FAULT", {
        operation: "toTwos",
        fault: "overflow",
        value: t
      }), n);
    }
    function c(t, e) {
      const n = f(t, "value"), r = BigInt(p(e, "bits"));
      return n & (o << r) - o;
    }
    function l(t, e) {
      switch (typeof t) {
        case "bigint":
          return t;
        case "number":
          return ((0, r.en)(Number.isInteger(t), "underflow", e || "value", t), (0, r.en)(t >= -s && t <= s, "overflow", e || "value", t), BigInt(t));
        case "string":
          try {
            if ("" === t) throw new Error("empty string");
            return "-" === t[0] && "-" !== t[1] ? -BigInt(t.substring(1)) : BigInt(t);
          } catch (n) {
            (0, r.en)(!1, `invalid BigNumberish string: ${n.message}`, e || "value", t);
          }
      }
      (0, r.en)(!1, "invalid BigNumberish value", e || "value", t);
    }
    function f(t, e) {
      const n = l(t, e);
      return ((0, r.hu)(n >= i, "unsigned value cannot be negative", "NUMERIC_FAULT", {
        fault: "overflow",
        operation: "getUint",
        value: t
      }), n);
    }
    const h = "0123456789abcdef";
    function d(t) {
      if (t instanceof Uint8Array) {
        let e = "0x0";
        for (const n of t) (e += h[n >> 4], e += h[15 & n]);
        return BigInt(e);
      }
      return l(t);
    }
    function p(t, e) {
      switch (typeof t) {
        case "bigint":
          return ((0, r.en)(t >= -s && t <= s, "overflow", e || "value", t), Number(t));
        case "number":
          return ((0, r.en)(Number.isInteger(t), "underflow", e || "value", t), (0, r.en)(t >= -s && t <= s, "overflow", e || "value", t), t);
        case "string":
          try {
            if ("" === t) throw new Error("empty string");
            return p(BigInt(t), e);
          } catch (n) {
            (0, r.en)(!1, `invalid numeric string: ${n.message}`, e || "value", t);
          }
      }
      (0, r.en)(!1, "invalid numeric value", e || "value", t);
    }
    function g(t) {
      return p(d(t));
    }
    function m(t, e) {
      let n = f(t, "value").toString(16);
      if (null == e) n.length % 2 && (n = "0" + n); else {
        const i = p(e, "width");
        for ((0, r.hu)(2 * i >= n.length, `value exceeds width (${i} bytes)`, "NUMERIC_FAULT", {
          operation: "toBeHex",
          fault: "overflow",
          value: t
        }); n.length < 2 * i; ) n = "0" + n;
      }
      return "0x" + n;
    }
    function y(t) {
      const e = f(t, "value");
      if (e === i) return new Uint8Array([]);
      let n = e.toString(16);
      n.length % 2 && (n = "0" + n);
      const r = new Uint8Array(n.length / 2);
      for (let i = 0; i < r.length; i++) {
        const t = 2 * i;
        r[i] = parseInt(n.substring(t, t + 2), 16);
      }
      return r;
    }
  },
  69781: function (t, e, n) {
    function r(t, e, n) {
      const r = e.split("|").map(t => t.trim());
      for (let o = 0; o < r.length; o++) switch (e) {
        case "any":
          return;
        case "bigint":
        case "boolean":
        case "number":
        case "string":
          if (typeof t === e) return;
      }
      const i = new Error(`invalid value for type ${e}`);
      throw (i.code = "INVALID_ARGUMENT", i.argument = `value.${n}`, i.value = t, i);
    }
    function i(t, e, n) {
      for (let i in e) {
        let o = e[i];
        const s = n ? n[i] : null;
        (s && r(o, s, i), Object.defineProperty(t, i, {
          enumerable: !0,
          value: o,
          writable: !1
        }));
      }
    }
    n.d(e, {
      h: function () {
        return i;
      }
    });
  },
  41662: function (t, e, n) {
    n.d(e, {
      bM: function () {
        return w;
      },
      fi: function () {
        return b;
      }
    });
    var r = n(35157), i = n(59369), o = n(45474), s = n(69781);
    const a = BigInt(-1), u = BigInt(0), c = BigInt(1), l = BigInt(5), f = {};
    let h = "0000";
    for (; h.length < 80; ) h += h;
    function d(t) {
      let e = h;
      for (; e.length < t; ) e += e;
      return BigInt("1" + e.substring(0, t));
    }
    function p(t, e, n) {
      const i = BigInt(e.width);
      if (e.signed) {
        const e = c << i - c;
        ((0, r.hu)(null == n || t >= -e && t < e, "overflow", "NUMERIC_FAULT", {
          operation: n,
          fault: "overflow",
          value: t
        }), t = t > u ? (0, o._Y)((0, o.sS)(t, i), i) : -(0, o._Y)((0, o.sS)(-t, i), i));
      } else {
        const e = c << i;
        ((0, r.hu)(null == n || t >= 0 && t < e, "overflow", "NUMERIC_FAULT", {
          operation: n,
          fault: "overflow",
          value: t
        }), t = (t % e + e) % e & e - c);
      }
      return t;
    }
    function g(t) {
      "number" === typeof t && (t = `fixed128x${t}`);
      let e = !0, n = 128, i = 18;
      if ("string" === typeof t) if ("fixed" === t) ; else if ("ufixed" === t) e = !1; else {
        const o = t.match(/^(u?)fixed([0-9]+)x([0-9]+)$/);
        ((0, r.en)(o, "invalid fixed format", "format", t), e = "u" !== o[1], n = parseInt(o[2]), i = parseInt(o[3]));
      } else if (t) {
        const o = t, s = (t, e, n) => null == o[t] ? n : ((0, r.en)(typeof o[t] === e, "invalid fixed format (" + t + " not " + e + ")", "format." + t, o[t]), o[t]);
        (e = s("signed", "boolean", e), n = s("width", "number", n), i = s("decimals", "number", i));
      }
      ((0, r.en)(n % 8 === 0, "invalid FixedNumber width (not byte aligned)", "format.width", n), (0, r.en)(i <= 80, "invalid FixedNumber decimals (too large)", "format.decimals", i));
      return {
        signed: e,
        width: n,
        decimals: i,
        name: (e ? "" : "u") + "fixed" + String(n) + "x" + String(i)
      };
    }
    class m {
      format;
      #v;
      #E;
      #x;
      _value;
      constructor(t, e, n) {
        ((0, r.NK)(t, f, "FixedNumber"), this.#E = e, this.#v = n);
        const i = (function (t, e) {
          let n = "";
          t < u && (n = "-", t *= a);
          let r = t.toString();
          if (0 === e) return n + r;
          for (; r.length <= e; ) r = h + r;
          const i = r.length - e;
          for (r = r.substring(0, i) + "." + r.substring(i); "0" === r[0] && "." !== r[1]; ) r = r.substring(1);
          for (; "0" === r[r.length - 1] && "." !== r[r.length - 2]; ) r = r.substring(0, r.length - 1);
          return n + r;
        })(e, n.decimals);
        ((0, s.h)(this, {
          format: n.name,
          _value: i
        }), this.#x = d(n.decimals));
      }
      get signed() {
        return this.#v.signed;
      }
      get width() {
        return this.#v.width;
      }
      get decimals() {
        return this.#v.decimals;
      }
      get value() {
        return this.#E;
      }
      #S(t) {
        (0, r.en)(this.format === t.format, "incompatible format; use fixedNumber.toFormat", "other", t);
      }
      #O(t, e) {
        return (t = p(t, this.#v, e), new m(f, t, this.#v));
      }
      #A(t, e) {
        return (this.#S(t), this.#O(this.#E + t.#E, e));
      }
      addUnsafe(t) {
        return this.#A(t);
      }
      add(t) {
        return this.#A(t, "add");
      }
      #R(t, e) {
        return (this.#S(t), this.#O(this.#E - t.#E, e));
      }
      subUnsafe(t) {
        return this.#R(t);
      }
      sub(t) {
        return this.#R(t, "sub");
      }
      #N(t, e) {
        return (this.#S(t), this.#O(this.#E * t.#E / this.#x, e));
      }
      mulUnsafe(t) {
        return this.#N(t);
      }
      mul(t) {
        return this.#N(t, "mul");
      }
      mulSignal(t) {
        this.#S(t);
        const e = this.#E * t.#E;
        return ((0, r.hu)(e % this.#x === u, "precision lost during signalling mul", "NUMERIC_FAULT", {
          operation: "mulSignal",
          fault: "underflow",
          value: this
        }), this.#O(e / this.#x, "mulSignal"));
      }
      #I(t, e) {
        return ((0, r.hu)(t.#E !== u, "division by zero", "NUMERIC_FAULT", {
          operation: "div",
          fault: "divide-by-zero",
          value: this
        }), this.#S(t), this.#O(this.#E * this.#x / t.#E, e));
      }
      divUnsafe(t) {
        return this.#I(t);
      }
      div(t) {
        return this.#I(t, "div");
      }
      divSignal(t) {
        ((0, r.hu)(t.#E !== u, "division by zero", "NUMERIC_FAULT", {
          operation: "div",
          fault: "divide-by-zero",
          value: this
        }), this.#S(t));
        const e = this.#E * this.#x;
        return ((0, r.hu)(e % t.#E === u, "precision lost during signalling div", "NUMERIC_FAULT", {
          operation: "divSignal",
          fault: "underflow",
          value: this
        }), this.#O(e / t.#E, "divSignal"));
      }
      cmp(t) {
        let e = this.value, n = t.value;
        const r = this.decimals - t.decimals;
        return (r > 0 ? n *= d(r) : r < 0 && (e *= d(-r)), e < n ? -1 : e > n ? 1 : 0);
      }
      eq(t) {
        return 0 === this.cmp(t);
      }
      lt(t) {
        return this.cmp(t) < 0;
      }
      lte(t) {
        return this.cmp(t) <= 0;
      }
      gt(t) {
        return this.cmp(t) > 0;
      }
      gte(t) {
        return this.cmp(t) >= 0;
      }
      floor() {
        let t = this.#E;
        return (this.#E < u && (t -= this.#x - c), t = this.#E / this.#x * this.#x, this.#O(t, "floor"));
      }
      ceiling() {
        let t = this.#E;
        return (this.#E > u && (t += this.#x - c), t = this.#E / this.#x * this.#x, this.#O(t, "ceiling"));
      }
      round(t) {
        if ((null == t && (t = 0), t >= this.decimals)) return this;
        const e = this.decimals - t, n = l * d(e - 1);
        let r = this.value + n;
        const i = d(e);
        return (r = r / i * i, p(r, this.#v, "round"), new m(f, r, this.#v));
      }
      isZero() {
        return this.#E === u;
      }
      isNegative() {
        return this.#E < u;
      }
      toString() {
        return this._value;
      }
      toUnsafeFloat() {
        return parseFloat(this.toString());
      }
      toFormat(t) {
        return m.fromString(this.toString(), t);
      }
      static fromValue(t, e, n) {
        const i = null == e ? 0 : (0, o.Dx)(e), s = g(n);
        let a = (0, o.yT)(t, "value");
        const c = i - s.decimals;
        if (c > 0) {
          const e = d(c);
          ((0, r.hu)(a % e === u, "value loses precision for format", "NUMERIC_FAULT", {
            operation: "fromValue",
            fault: "underflow",
            value: t
          }), a /= e);
        } else c < 0 && (a *= d(-c));
        return (p(a, s, "fromValue"), new m(f, a, s));
      }
      static fromString(t, e) {
        const n = t.match(/^(-?)([0-9]*)\.?([0-9]*)$/);
        (0, r.en)(n && n[2].length + n[3].length > 0, "invalid FixedNumber string value", "value", t);
        const i = g(e);
        let o = n[2] || "0", s = n[3] || "";
        for (; s.length < i.decimals; ) s += h;
        ((0, r.hu)(s.substring(i.decimals).match(/^0*$/), "too many decimals for format", "NUMERIC_FAULT", {
          operation: "fromString",
          fault: "underflow",
          value: t
        }), s = s.substring(0, i.decimals));
        const a = BigInt(n[1] + o + s);
        return (p(a, i, "fromString"), new m(f, a, i));
      }
      static fromBytes(t, e) {
        let n = (0, o.Gh)((0, i.Pw)(t, "value"));
        const r = g(e);
        return (r.signed && (n = (0, o._Y)(n, r.width)), p(n, r, "fromBytes"), new m(f, n, r));
      }
    }
    const y = ["wei", "kwei", "mwei", "gwei", "szabo", "finney", "ether"];
    function w(t, e) {
      let n = 18;
      if ("string" === typeof e) {
        const t = y.indexOf(e);
        ((0, r.en)(t >= 0, "invalid unit", "unit", e), n = 3 * t);
      } else null != e && (n = (0, o.Dx)(e, "unit"));
      return m.fromValue(t, n, {
        decimals: n,
        width: 512
      }).toString();
    }
    function b(t) {
      return (function (t, e) {
        (0, r.en)("string" === typeof t, "value must be a string", "value", t);
        let n = 18;
        if ("string" === typeof e) {
          const t = y.indexOf(e);
          ((0, r.en)(t >= 0, "invalid unit", "unit", e), n = 3 * t);
        } else null != e && (n = (0, o.Dx)(e, "unit"));
        return m.fromString(t, {
          decimals: n,
          width: 512
        }).value;
      })(t, 18);
    }
  },
  9478: function (t, e, n) {
    n.d(e, {
      Y0: function () {
        return u;
      },
      ZN: function () {
        return c;
      }
    });
    var r = n(59369), i = n(35157);
    function o(t, e, n, r, i) {
      if ("BAD_PREFIX" === t || "UNEXPECTED_CONTINUE" === t) {
        let t = 0;
        for (let r = e + 1; r < n.length && n[r] >> 6 === 2; r++) t++;
        return t;
      }
      return "OVERRUN" === t ? n.length - e - 1 : 0;
    }
    const s = Object.freeze({
      error: function (t, e, n, r, o) {
        (0, i.en)(!1, `invalid codepoint at offset ${e}; ${t}`, "bytes", n);
      },
      ignore: o,
      replace: function (t, e, n, r, s) {
        return "OVERLONG" === t ? ((0, i.en)("number" === typeof s, "invalid bad code point for replacement", "badCodepoint", s), r.push(s), 0) : (r.push(65533), o(t, e, n));
      }
    });
    function a(t, e) {
      null == e && (e = s.error);
      const n = (0, r.Pw)(t, "bytes"), i = [];
      let o = 0;
      for (; o < n.length; ) {
        const t = n[o++];
        if (t >> 7 === 0) {
          i.push(t);
          continue;
        }
        let r = null, s = null;
        if (192 === (224 & t)) (r = 1, s = 127); else if (224 === (240 & t)) (r = 2, s = 2047); else {
          if (240 !== (248 & t)) {
            o += e(128 === (192 & t) ? "UNEXPECTED_CONTINUE" : "BAD_PREFIX", o - 1, n, i);
            continue;
          }
          (r = 3, s = 65535);
        }
        if (o - 1 + r >= n.length) {
          o += e("OVERRUN", o - 1, n, i);
          continue;
        }
        let a = t & (1 << 8 - r - 1) - 1;
        for (let u = 0; u < r; u++) {
          let t = n[o];
          if (128 != (192 & t)) {
            (o += e("MISSING_CONTINUE", o, n, i), a = null);
            break;
          }
          (a = a << 6 | 63 & t, o++);
        }
        null !== a && (a > 1114111 ? o += e("OUT_OF_RANGE", o - 1 - r, n, i, a) : a >= 55296 && a <= 57343 ? o += e("UTF16_SURROGATE", o - 1 - r, n, i, a) : a <= s ? o += e("OVERLONG", o - 1 - r, n, i, a) : i.push(a));
      }
      return i;
    }
    function u(t, e) {
      ((0, i.en)("string" === typeof t, "invalid string value", "str", t), null != e && ((0, i.fA)(e), t = t.normalize(e)));
      let n = [];
      for (let r = 0; r < t.length; r++) {
        const e = t.charCodeAt(r);
        if (e < 128) n.push(e); else if (e < 2048) (n.push(e >> 6 | 192), n.push(63 & e | 128)); else if (55296 == (64512 & e)) {
          r++;
          const o = t.charCodeAt(r);
          (0, i.en)(r < t.length && 56320 === (64512 & o), "invalid surrogate pair", "str", t);
          const s = 65536 + ((1023 & e) << 10) + (1023 & o);
          (n.push(s >> 18 | 240), n.push(s >> 12 & 63 | 128), n.push(s >> 6 & 63 | 128), n.push(63 & s | 128));
        } else (n.push(e >> 12 | 224), n.push(e >> 6 & 63 | 128), n.push(63 & e | 128));
      }
      return new Uint8Array(n);
    }
    function c(t, e) {
      return a(t, e).map(t => t <= 65535 ? String.fromCharCode(t) : (t -= 65536, String.fromCharCode(55296 + (t >> 10 & 1023), 56320 + (1023 & t)))).join("");
    }
  },
  25655: function (t, e, n) {
    function r(t) {
      if (!Number.isSafeInteger(t) || t < 0) throw new Error(`Wrong positive integer: ${t}`);
    }
    function i(t, ...e) {
      if (!(t instanceof Uint8Array)) throw new Error("Expected Uint8Array");
      if (e.length > 0 && !e.includes(t.length)) throw new Error(`Expected Uint8Array of length ${e}, not of length=${t.length}`);
    }
    function o(t) {
      if ("function" !== typeof t || "function" !== typeof t.create) throw new Error("Hash should be wrapped by utils.wrapConstructor");
      (r(t.outputLen), r(t.blockLen));
    }
    function s(t, e = !0) {
      if (t.destroyed) throw new Error("Hash instance has been destroyed");
      if (e && t.finished) throw new Error("Hash#digest() has already been called");
    }
    function a(t, e) {
      i(t);
      const n = e.outputLen;
      if (t.length < n) throw new Error(`digestInto() expects output buffer of length at least ${n}`);
    }
    n.d(e, {
      Gg: function () {
        return s;
      },
      J8: function () {
        return a;
      },
      Rx: function () {
        return r;
      },
      aI: function () {
        return i;
      },
      vp: function () {
        return o;
      }
    });
  },
  35891: function (t, e, n) {
    n.d(e, {
      kb: function () {
        return l;
      },
      eV: function () {
        return c;
      },
      GL: function () {
        return s;
      },
      O6: function () {
        return h;
      },
      np: function () {
        return a;
      },
      O0: function () {
        return u;
      },
      Jq: function () {
        return o;
      },
      hE: function () {
        return f;
      }
    });
    const r = "object" === typeof globalThis && ("crypto" in globalThis) ? globalThis.crypto : void 0, i = t => t instanceof Uint8Array, o = t => new Uint32Array(t.buffer, t.byteOffset, Math.floor(t.byteLength / 4)), s = t => new DataView(t.buffer, t.byteOffset, t.byteLength), a = (t, e) => t << 32 - e | t >>> e;
    if (!(68 === new Uint8Array(new Uint32Array([287454020]).buffer)[0])) throw new Error("Non little-endian hardware is not supported");
    function u(t) {
      if (("string" === typeof t && (t = (function (t) {
        if ("string" !== typeof t) throw new Error("utf8ToBytes expected string, got " + typeof t);
        return new Uint8Array(new TextEncoder().encode(t));
      })(t)), !i(t))) throw new Error("expected Uint8Array, got " + typeof t);
      return t;
    }
    function c(...t) {
      const e = new Uint8Array(t.reduce((t, e) => t + e.length, 0));
      let n = 0;
      return (t.forEach(t => {
        if (!i(t)) throw new Error("Uint8Array expected");
        (e.set(t, n), n += t.length);
      }), e);
    }
    class l {
      clone() {
        return this._cloneInto();
      }
    }
    function f(t) {
      const e = e => t().update(u(e)).digest(), n = t();
      return (e.outputLen = n.outputLen, e.blockLen = n.blockLen, e.create = () => t(), e);
    }
    function h(t = 32) {
      if (r && "function" === typeof r.getRandomValues) return r.getRandomValues(new Uint8Array(t));
      throw new Error("crypto.getRandomValues must be defined");
    }
  },
  69064: function (t, e, n) {
    function r(t, e) {
      return (e || (e = t.slice(0)), Object.freeze(Object.defineProperties(t, {
        raw: {
          value: Object.freeze(e)
        }
      })));
    }
    n.d(e, {
      x7: function () {
        return bt;
      },
      Am: function () {
        return W;
      }
    });
    var i = n(2265);
    let o = {
      data: ""
    }, s = t => {
      if ("object" == typeof window) {
        let e = (t ? t.querySelector("#_goober") : window._goober) || Object.assign(document.createElement("style"), {
          innerHTML: " ",
          id: "_goober"
        });
        return (e.nonce = window.__nonce__, e.parentNode || (t || document.head).appendChild(e), e.firstChild);
      }
      return t || o;
    }, a = /(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g, u = /\/\*[^]*?\*\/|  +/g, c = /\n+/g, l = (t, e) => {
      let n = "", r = "", i = "";
      for (let o in t) {
        let s = t[o];
        "@" == o[0] ? "i" == o[1] ? n = o + " " + s + ";" : r += "f" == o[1] ? l(s, o) : o + "{" + l(s, "k" == o[1] ? "" : e) + "}" : "object" == typeof s ? r += l(s, e ? e.replace(/([^,])+/g, t => o.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g, e => (/&/).test(e) ? e.replace(/&/g, t) : t ? t + " " + e : e)) : o) : null != s && (o = (/^--/).test(o) ? o : o.replace(/[A-Z]/g, "-$&").toLowerCase(), i += l.p ? l.p(o, s) : o + ":" + s + ";");
      }
      return n + (e && i ? e + "{" + i + "}" : i) + r;
    }, f = {}, h = t => {
      if ("object" == typeof t) {
        let e = "";
        for (let n in t) e += n + h(t[n]);
        return e;
      }
      return t;
    }, d = (t, e, n, r, i) => {
      let o = h(t), s = f[o] || (f[o] = (t => {
        let e = 0, n = 11;
        for (; e < t.length; ) n = 101 * n + t.charCodeAt(e++) >>> 0;
        return "go" + n;
      })(o));
      if (!f[s]) {
        let e = o !== t ? t : (t => {
          let e, n, r = [{}];
          for (; e = a.exec(t.replace(u, "")); ) e[4] ? r.shift() : e[3] ? (n = e[3].replace(c, " ").trim(), r.unshift(r[0][n] = r[0][n] || ({}))) : r[0][e[1]] = e[2].replace(c, " ").trim();
          return r[0];
        })(t);
        f[s] = l(i ? {
          ["@keyframes " + s]: e
        } : e, n ? "" : "." + s);
      }
      let d = n && f.g ? f.g : null;
      return (n && (f.g = f[s]), ((t, e, n, r) => {
        r ? e.data = e.data.replace(r, t) : -1 === e.data.indexOf(t) && (e.data = n ? t + e.data : e.data + t);
      })(f[s], e, r, d), s);
    }, p = (t, e, n) => t.reduce((t, r, i) => {
      let o = e[i];
      if (o && o.call) {
        let t = o(n), e = t && t.props && t.props.className || (/^go/).test(t) && t;
        o = e ? "." + e : t && "object" == typeof t ? t.props ? "" : l(t, "") : !1 === t ? "" : t;
      }
      return t + r + (null == o ? "" : o);
    }, "");
    function g(t) {
      let e = this || ({}), n = t.call ? t(e.p) : t;
      return d(n.unshift ? n.raw ? p(n, [].slice.call(arguments, 1), e.p) : n.reduce((t, n) => Object.assign(t, n && n.call ? n(e.p) : n), {}) : n, s(e.target), e.g, e.o, e.k);
    }
    g.bind({
      g: 1
    });
    let m, y, w, b = g.bind({
      k: 1
    });
    function v(t, e) {
      let n = this || ({});
      return function () {
        let r = arguments;
        function i(o, s) {
          let a = Object.assign({}, o), u = a.className || i.className;
          (n.p = Object.assign({
            theme: y && y()
          }, a), n.o = (/ *go\d+/).test(u), a.className = g.apply(n, r) + (u ? " " + u : ""), e && (a.ref = s));
          let c = t;
          return (t[0] && (c = a.as || t, delete a.as), w && c[0] && w(a), m(c, a));
        }
        return e ? e(i) : i;
      };
    }
    function E() {
      const t = r(["\nfrom {\n  transform: scale(0) rotate(45deg);\n\topacity: 0;\n}\nto {\n transform: scale(1) rotate(45deg);\n  opacity: 1;\n}"]);
      return (E = function () {
        return t;
      }, t);
    }
    function x() {
      const t = r(["\nfrom {\n  transform: scale(0);\n  opacity: 0;\n}\nto {\n  transform: scale(1);\n  opacity: 1;\n}"]);
      return (x = function () {
        return t;
      }, t);
    }
    function S() {
      const t = r(["\nfrom {\n  transform: scale(0) rotate(90deg);\n\topacity: 0;\n}\nto {\n  transform: scale(1) rotate(90deg);\n\topacity: 1;\n}"]);
      return (S = function () {
        return t;
      }, t);
    }
    function O() {
      const t = r(["\n  width: 20px;\n  opacity: 0;\n  height: 20px;\n  border-radius: 10px;\n  background: ", ";\n  position: relative;\n  transform: rotate(45deg);\n\n  animation: ", " 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)\n    forwards;\n  animation-delay: 100ms;\n\n  &:after,\n  &:before {\n    content: '';\n    animation: ", " 0.15s ease-out forwards;\n    animation-delay: 150ms;\n    position: absolute;\n    border-radius: 3px;\n    opacity: 0;\n    background: ", ";\n    bottom: 9px;\n    left: 4px;\n    height: 2px;\n    width: 12px;\n  }\n\n  &:before {\n    animation: ", " 0.15s ease-out forwards;\n    animation-delay: 180ms;\n    transform: rotate(90deg);\n  }\n"]);
      return (O = function () {
        return t;
      }, t);
    }
    function A() {
      const t = r(["\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n"]);
      return (A = function () {
        return t;
      }, t);
    }
    function R() {
      const t = r(["\n  width: 12px;\n  height: 12px;\n  box-sizing: border-box;\n  border: 2px solid;\n  border-radius: 100%;\n  border-color: ", ";\n  border-right-color: ", ";\n  animation: ", " 1s linear infinite;\n"]);
      return (R = function () {
        return t;
      }, t);
    }
    function N() {
      const t = r(["\nfrom {\n  transform: scale(0) rotate(45deg);\n\topacity: 0;\n}\nto {\n  transform: scale(1) rotate(45deg);\n\topacity: 1;\n}"]);
      return (N = function () {
        return t;
      }, t);
    }
    function I() {
      const t = r(["\n0% {\n\theight: 0;\n\twidth: 0;\n\topacity: 0;\n}\n40% {\n  height: 0;\n\twidth: 6px;\n\topacity: 1;\n}\n100% {\n  opacity: 1;\n  height: 10px;\n}"]);
      return (I = function () {
        return t;
      }, t);
    }
    function B() {
      const t = r(["\n  width: 20px;\n  opacity: 0;\n  height: 20px;\n  border-radius: 10px;\n  background: ", ";\n  position: relative;\n  transform: rotate(45deg);\n\n  animation: ", " 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)\n    forwards;\n  animation-delay: 100ms;\n  &:after {\n    content: '';\n    box-sizing: border-box;\n    animation: ", " 0.2s ease-out forwards;\n    opacity: 0;\n    animation-delay: 200ms;\n    position: absolute;\n    border-right: 2px solid;\n    border-bottom: 2px solid;\n    border-color: ", ";\n    bottom: 6px;\n    left: 6px;\n    height: 10px;\n    width: 6px;\n  }\n"]);
      return (B = function () {
        return t;
      }, t);
    }
    function T() {
      const t = r(["\n  position: absolute;\n"]);
      return (T = function () {
        return t;
      }, t);
    }
    function k() {
      const t = r(["\n  position: relative;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-width: 20px;\n  min-height: 20px;\n"]);
      return (k = function () {
        return t;
      }, t);
    }
    function P() {
      const t = r(["\nfrom {\n  transform: scale(0.6);\n  opacity: 0.4;\n}\nto {\n  transform: scale(1);\n  opacity: 1;\n}"]);
      return (P = function () {
        return t;
      }, t);
    }
    function U() {
      const t = r(["\n  position: relative;\n  transform: scale(0.6);\n  opacity: 0.4;\n  min-width: 20px;\n  animation: ", " 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)\n    forwards;\n"]);
      return (U = function () {
        return t;
      }, t);
    }
    function C() {
      const t = r(["\n  display: flex;\n  align-items: center;\n  background: #fff;\n  color: #363636;\n  line-height: 1.3;\n  will-change: transform;\n  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);\n  max-width: 350px;\n  pointer-events: auto;\n  padding: 8px 10px;\n  border-radius: 8px;\n"]);
      return (C = function () {
        return t;
      }, t);
    }
    function _() {
      const t = r(["\n  display: flex;\n  justify-content: center;\n  margin: 4px 10px;\n  color: inherit;\n  flex: 1 1 auto;\n  white-space: pre-line;\n"]);
      return (_ = function () {
        return t;
      }, t);
    }
    function L() {
      const t = r(["\n  z-index: 9999;\n  > * {\n    pointer-events: auto;\n  }\n"]);
      return (L = function () {
        return t;
      }, t);
    }
    var F = (t, e) => (t => "function" == typeof t)(t) ? t(e) : t, j = (() => {
      let t = 0;
      return () => (++t).toString();
    })(), D = (() => {
      let t;
      return () => {
        if (void 0 === t && typeof window < "u") {
          let e = matchMedia("(prefers-reduced-motion: reduce)");
          t = !e || e.matches;
        }
        return t;
      };
    })(), z = "default", V = (t, e) => {
      let {toastLimit: n} = t.settings;
      switch (e.type) {
        case 0:
          return {
            ...t,
            toasts: [e.toast, ...t.toasts].slice(0, n)
          };
        case 1:
          return {
            ...t,
            toasts: t.toasts.map(t => t.id === e.toast.id ? {
              ...t,
              ...e.toast
            } : t)
          };
        case 2:
          let {toast: r} = e;
          return V(t, {
            type: t.toasts.find(t => t.id === r.id) ? 1 : 0,
            toast: r
          });
        case 3:
          let {toastId: i} = e;
          return {
            ...t,
            toasts: t.toasts.map(t => t.id === i || void 0 === i ? {
              ...t,
              dismissed: !0,
              visible: !1
            } : t)
          };
        case 4:
          return void 0 === e.toastId ? {
            ...t,
            toasts: []
          } : {
            ...t,
            toasts: t.toasts.filter(t => t.id !== e.toastId)
          };
        case 5:
          return {
            ...t,
            pausedAt: e.time
          };
        case 6:
          let o = e.time - (t.pausedAt || 0);
          return {
            ...t,
            pausedAt: void 0,
            toasts: t.toasts.map(t => ({
              ...t,
              pauseDuration: t.pauseDuration + o
            }))
          };
      }
    }, $ = [], q = {
      toasts: [],
      pausedAt: void 0,
      settings: {
        toastLimit: 20
      }
    }, M = {}, H = function (t) {
      let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : z;
      (M[e] = V(M[e] || q, t), $.forEach(t => {
        let [n, r] = t;
        n === e && r(M[e]);
      }));
    }, K = t => Object.keys(M).forEach(e => H(t, e)), G = function () {
      let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : z;
      return e => {
        H(e, t);
      };
    }, Z = {
      blank: 4000,
      error: 4000,
      success: 2000,
      loading: 1 / 0,
      custom: 4000
    }, J = t => (e, n) => {
      let r = (function (t) {
        let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "blank", n = arguments.length > 2 ? arguments[2] : void 0;
        return {
          createdAt: Date.now(),
          visible: !0,
          dismissed: !1,
          type: e,
          ariaProps: {
            role: "status",
            "aria-live": "polite"
          },
          message: t,
          pauseDuration: 0,
          ...n,
          id: (null == n ? void 0 : n.id) || j()
        };
      })(e, t, n);
      return (G(r.toasterId || (t => Object.keys(M).find(e => M[e].toasts.some(e => e.id === t)))(r.id))({
        type: 2,
        toast: r
      }), r.id);
    }, W = (t, e) => J("blank")(t, e);
    (W.error = J("error"), W.success = J("success"), W.loading = J("loading"), W.custom = J("custom"), W.dismiss = (t, e) => {
      let n = {
        type: 3,
        toastId: t
      };
      e ? G(e)(n) : K(n);
    }, W.dismissAll = t => W.dismiss(void 0, t), W.remove = (t, e) => {
      let n = {
        type: 4,
        toastId: t
      };
      e ? G(e)(n) : K(n);
    }, W.removeAll = t => W.remove(void 0, t), W.promise = (t, e, n) => {
      let r = W.loading(e.loading, {
        ...n,
        ...null == n ? void 0 : n.loading
      });
      return ("function" == typeof t && (t = t()), t.then(t => {
        let i = e.success ? F(e.success, t) : void 0;
        return (i ? W.success(i, {
          id: r,
          ...n,
          ...null == n ? void 0 : n.success
        }) : W.dismiss(r), t);
      }).catch(t => {
        let i = e.error ? F(e.error, t) : void 0;
        i ? W.error(i, {
          id: r,
          ...n,
          ...null == n ? void 0 : n.error
        }) : W.dismiss(r);
      }), t);
    });
    var Y = function (t) {
      let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "default", {toasts: n, pausedAt: r} = (function () {
        let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : z, [n, r] = (0, i.useState)(M[e] || q), o = (0, i.useRef)(M[e]);
        (0, i.useEffect)(() => (o.current !== M[e] && r(M[e]), $.push([e, r]), () => {
          let t = $.findIndex(t => {
            let [n] = t;
            return n === e;
          });
          t > -1 && $.splice(t, 1);
        }), [e]);
        let s = n.toasts.map(e => {
          var n, r, i;
          return {
            ...t,
            ...t[e.type],
            ...e,
            removeDelay: e.removeDelay || (null == (n = t[e.type]) ? void 0 : n.removeDelay) || (null == t ? void 0 : t.removeDelay),
            duration: e.duration || (null == (r = t[e.type]) ? void 0 : r.duration) || (null == t ? void 0 : t.duration) || Z[e.type],
            style: {
              ...t.style,
              ...null == (i = t[e.type]) ? void 0 : i.style,
              ...e.style
            }
          };
        });
        return {
          ...n,
          toasts: s
        };
      })(t, e), o = (0, i.useRef)(new Map()).current, s = (0, i.useCallback)(function (t) {
        let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1000;
        if (o.has(t)) return;
        let n = setTimeout(() => {
          (o.delete(t), a({
            type: 4,
            toastId: t
          }));
        }, e);
        o.set(t, n);
      }, []);
      (0, i.useEffect)(() => {
        if (r) return;
        let t = Date.now(), i = n.map(n => {
          if (n.duration === 1 / 0) return;
          let r = (n.duration || 0) + n.pauseDuration - (t - n.createdAt);
          if (!(r < 0)) return setTimeout(() => W.dismiss(n.id, e), r);
          n.visible && W.dismiss(n.id);
        });
        return () => {
          i.forEach(t => t && clearTimeout(t));
        };
      }, [n, r, e]);
      let a = (0, i.useCallback)(G(e), [e]), u = (0, i.useCallback)(() => {
        a({
          type: 5,
          time: Date.now()
        });
      }, [a]), c = (0, i.useCallback)((t, e) => {
        a({
          type: 1,
          toast: {
            id: t,
            height: e
          }
        });
      }, [a]), l = (0, i.useCallback)(() => {
        r && a({
          type: 6,
          time: Date.now()
        });
      }, [r, a]), f = (0, i.useCallback)((t, e) => {
        let {reverseOrder: r = !1, gutter: i = 8, defaultPosition: o} = e || ({}), s = n.filter(e => (e.position || o) === (t.position || o) && e.height), a = s.findIndex(e => e.id === t.id), u = s.filter((t, e) => e < a && t.visible).length;
        return s.filter(t => t.visible).slice(...r ? [u + 1] : [0, u]).reduce((t, e) => t + (e.height || 0) + i, 0);
      }, [n]);
      return ((0, i.useEffect)(() => {
        n.forEach(t => {
          if (t.dismissed) s(t.id, t.removeDelay); else {
            let e = o.get(t.id);
            e && (clearTimeout(e), o.delete(t.id));
          }
        });
      }, [n, s]), {
        toasts: n,
        handlers: {
          updateHeight: c,
          startPause: u,
          endPause: l,
          calculateOffset: f
        }
      });
    }, X = b(E()), Q = b(x()), tt = b(S()), et = v("div")(O(), t => t.primary || "#ff4b4b", X, Q, t => t.secondary || "#fff", tt), nt = b(A()), rt = v("div")(R(), t => t.secondary || "#e0e0e0", t => t.primary || "#616161", nt), it = b(N()), ot = b(I()), st = v("div")(B(), t => t.primary || "#61d345", it, ot, t => t.secondary || "#fff"), at = v("div")(T()), ut = v("div")(k()), ct = b(P()), lt = v("div")(U(), ct), ft = t => {
      let {toast: e} = t, {icon: n, type: r, iconTheme: o} = e;
      return void 0 !== n ? "string" == typeof n ? i.createElement(lt, null, n) : n : "blank" === r ? null : i.createElement(ut, null, i.createElement(rt, {
        ...o
      }), "loading" !== r && i.createElement(at, null, "error" === r ? i.createElement(et, {
        ...o
      }) : i.createElement(st, {
        ...o
      })));
    }, ht = t => ("\n0% {transform: translate3d(0,").concat(-200 * t, "%,0) scale(.6); opacity:.5;}\n100% {transform: translate3d(0,0,0) scale(1); opacity:1;}\n"), dt = t => ("\n0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}\n100% {transform: translate3d(0,").concat(-150 * t, "%,-1px) scale(.6); opacity:0;}\n"), pt = v("div")(C()), gt = v("div")(_()), mt = i.memo(t => {
      let {toast: e, position: n, style: r, children: o} = t, s = e.height ? ((t, e) => {
        let n = t.includes("top") ? 1 : -1, [r, i] = D() ? ["0%{opacity:0;} 100%{opacity:1;}", "0%{opacity:1;} 100%{opacity:0;}"] : [ht(n), dt(n)];
        return {
          animation: e ? ("").concat(b(r), " 0.35s cubic-bezier(.21,1.02,.73,1) forwards") : ("").concat(b(i), " 0.4s forwards cubic-bezier(.06,.71,.55,1)")
        };
      })(e.position || n || "top-center", e.visible) : {
        opacity: 0
      }, a = i.createElement(ft, {
        toast: e
      }), u = i.createElement(gt, {
        ...e.ariaProps
      }, F(e.message, e));
      return i.createElement(pt, {
        className: e.className,
        style: {
          ...s,
          ...r,
          ...e.style
        }
      }, "function" == typeof o ? o({
        icon: a,
        message: u
      }) : i.createElement(i.Fragment, null, a, u));
    });
    !(function (t, e, n, r) {
      (l.p = e, m = t, y = n, w = r);
    })(i.createElement);
    var yt = t => {
      let {id: e, className: n, style: r, onHeightUpdate: o, children: s} = t, a = i.useCallback(t => {
        if (t) {
          let n = () => {
            let n = t.getBoundingClientRect().height;
            o(e, n);
          };
          (n(), new MutationObserver(n).observe(t, {
            subtree: !0,
            childList: !0,
            characterData: !0
          }));
        }
      }, [e, o]);
      return i.createElement("div", {
        ref: a,
        className: n,
        style: r
      }, s);
    }, wt = g(L()), bt = t => {
      let {reverseOrder: e, position: n = "top-center", toastOptions: r, gutter: o, children: s, toasterId: a, containerStyle: u, containerClassName: c} = t, {toasts: l, handlers: f} = Y(r, a);
      return i.createElement("div", {
        "data-rht-toaster": a || "",
        style: {
          position: "fixed",
          zIndex: 9999,
          top: 16,
          left: 16,
          right: 16,
          bottom: 16,
          pointerEvents: "none",
          ...u
        },
        className: c,
        onMouseEnter: f.startPause,
        onMouseLeave: f.endPause
      }, l.map(t => {
        let r = t.position || n, a = ((t, e) => {
          let n = t.includes("top"), r = n ? {
            top: 0
          } : {
            bottom: 0
          }, i = t.includes("center") ? {
            justifyContent: "center"
          } : t.includes("right") ? {
            justifyContent: "flex-end"
          } : {};
          return {
            left: 0,
            right: 0,
            display: "flex",
            position: "absolute",
            transition: D() ? void 0 : "all 230ms cubic-bezier(.21,1.02,.73,1)",
            transform: ("translateY(").concat(e * (n ? 1 : -1), "px)"),
            ...r,
            ...i
          };
        })(r, f.calculateOffset(t, {
          reverseOrder: e,
          gutter: o,
          defaultPosition: n
        }));
        return i.createElement(yt, {
          id: t.id,
          key: t.id,
          onHeightUpdate: f.updateHeight,
          className: t.visible ? wt : "",
          style: a
        }, "custom" === t.type ? F(t.message, t) : s ? s(t) : i.createElement(mt, {
          toast: t,
          position: r
        }));
      }));
    };
  },
  97269: function (t, e, n) {
    n.d(e, {
      A: function () {
        return p;
      }
    });
    var r = n(72932), i = n(67348), o = n(39277), s = n(50550), a = n(44199);
    var u = n(27534);
    function c(t, e = {}) {
      return {
        async queryFn({queryKey: n}) {
          const {hash: u, ...c} = n[1];
          if (!u) throw new Error("hash is required");
          return (async function (t, e) {
            const {chainId: n, timeout: u = 0, ...c} = e, l = t.getClient({
              chainId: n
            }), f = (0, a.s)(l, i.e, "waitForTransactionReceipt"), h = await f({
              ...c,
              timeout: u
            });
            if ("reverted" === h.status) {
              const t = (0, a.s)(l, o.f, "getTransaction"), e = await t({
                hash: h.transactionHash
              }), n = (0, a.s)(l, s.R, "call"), i = await n({
                ...e,
                data: e.input,
                gasPrice: "eip1559" !== e.type ? e.gasPrice : void 0,
                maxFeePerGas: "eip1559" === e.type ? e.maxFeePerGas : void 0,
                maxPriorityFeePerGas: "eip1559" === e.type ? e.maxPriorityFeePerGas : void 0
              }), u = i?.data ? (0, r.rR)(`0x${i.data.substring(138)}`) : "unknown reason";
              throw new Error(u);
            }
            return {
              ...h,
              chainId: l.chain.id
            };
          })(t, {
            ...c,
            onReplaced: e.onReplaced,
            hash: u
          });
        },
        queryKey: l(e)
      };
    }
    function l(t = {}) {
      const {onReplaced: e, ...n} = t;
      return ["waitForTransactionReceipt", (0, u.OP)(n)];
    }
    var f = n(24432), h = n(44005), d = n(12364);
    function p() {
      let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      const {hash: e, query: n = {}} = t, r = (0, d.Z)(t), i = (0, h.x)({
        config: r
      });
      var o;
      const s = c(r, {
        ...t,
        chainId: null !== (o = t.chainId) && void 0 !== o ? o : i
      });
      var a;
      const u = Boolean(e && (null === (a = n.enabled) || void 0 === a || a));
      return (0, f.aM)({
        ...n,
        ...s,
        enabled: u
      });
    }
  },
  33348: function (t, e, n) {
    n.d(e, {
      S: function () {
        return B;
      }
    });
    var r = n(21770), i = n(19775), o = n(65704), s = n(17283), a = n(34180), u = n(82645), c = n(81544), l = n(95048), f = n(35586);
    var h = n(78125), d = n(63228), p = n(18856);
    var g = n(70878), m = n(92614), y = n(82061), w = n(62077), b = n(12363), v = n(86048), E = n(9769);
    const x = new y.k(128);
    async function S(t, e) {
      const {account: n = t.account, chain: r = t.chain, accessList: s, authorizationList: a, blobs: y, data: S, gas: O, gasPrice: A, maxFeePerBlobGas: R, maxFeePerGas: N, maxPriorityFeePerGas: I, nonce: B, type: T, value: k, ...P} = e;
      if ("undefined" === typeof n) throw new o.o({
        docsPath: "/docs/actions/wallet/sendTransaction"
      });
      const U = n ? (0, i.T)(n) : null;
      try {
        (0, w.F)(e);
        const n = await (async () => e.to ? e.to : null !== e.to && a && a.length > 0 ? await (0, l.z)({
          authorization: a[0]
        }).catch(() => {
          throw new c.G("`to` is required. Could not infer from `authorizationList`.");
        }) : void 0)();
        if ("json-rpc" === U?.type || null === U) {
          let e;
          null !== r && (e = await (0, u.s)(t, b.L, "getChainId")({}), (function ({chain: t, currentChainId: e}) {
            if (!t) throw new f.Bk();
            if (e !== t.id) throw new f.Yl({
              chain: t,
              currentChainId: e
            });
          })({
            currentChainId: e,
            chain: r
          }));
          const i = t.chain?.formatters?.transactionRequest?.format, o = (i || m.tG)({
            ...(0, g.K)(P, {
              format: i
            }),
            accessList: s,
            authorizationList: a,
            blobs: y,
            chainId: e,
            data: S,
            from: U?.address,
            gas: O,
            gasPrice: A,
            maxFeePerBlobGas: R,
            maxFeePerGas: N,
            maxPriorityFeePerGas: I,
            nonce: B,
            to: n,
            type: T,
            value: k
          }, "sendTransaction"), c = x.get(t.uid), l = c ? "wallet_sendTransaction" : "eth_sendTransaction";
          try {
            return await t.request({
              method: l,
              params: [o]
            }, {
              retryCount: 0
            });
          } catch (C) {
            if (!1 === c) throw C;
            const e = C;
            if ("InvalidInputRpcError" === e.name || "InvalidParamsRpcError" === e.name || "MethodNotFoundRpcError" === e.name || "MethodNotSupportedRpcError" === e.name) return await t.request({
              method: "wallet_sendTransaction",
              params: [o]
            }, {
              retryCount: 0
            }).then(e => (x.set(t.uid, !0), e)).catch(n => {
              const r = n;
              if ("MethodNotFoundRpcError" === r.name || "MethodNotSupportedRpcError" === r.name) throw (x.set(t.uid, !1), e);
              throw r;
            });
            throw e;
          }
        }
        if ("local" === U?.type) {
          const e = await (0, u.s)(t, v.ZE, "prepareTransactionRequest")({
            account: U,
            accessList: s,
            authorizationList: a,
            blobs: y,
            chain: r,
            data: S,
            gas: O,
            gasPrice: A,
            maxFeePerBlobGas: R,
            maxFeePerGas: N,
            maxPriorityFeePerGas: I,
            nonce: B,
            nonceManager: U.nonceManager,
            parameters: [...v.QZ, "sidecars"],
            type: T,
            value: k,
            ...P,
            to: n
          }), i = r?.serializers?.transaction, o = await U.signTransaction(e, {
            serializer: i
          });
          return await (0, u.s)(t, E.p, "sendRawTransaction")({
            serializedTransaction: o
          });
        }
        if ("smart" === U?.type) throw new o.Y({
          metaMessages: ["Consider using the `sendUserOperation` Action instead."],
          docsPath: "/docs/actions/bundler/sendUserOperation",
          type: "smart"
        });
        throw new o.Y({
          docsPath: "/docs/actions/wallet/sendTransaction",
          type: U?.type
        });
      } catch (_) {
        if (_ instanceof o.Y) throw _;
        throw (function (t, {docsPath: e, ...n}) {
          const r = (() => {
            const e = (0, p.k)(t, n);
            return e instanceof h.cj ? t : e;
          })();
          return new d.mk(r, {
            docsPath: e,
            ...n
          });
        })(_, {
          ...e,
          account: U,
          chain: e.chain || void 0
        });
      }
    }
    async function O(t, e) {
      return O.internal(t, S, "sendTransaction", e);
    }
    !(function (t) {
      t.internal = async function (t, e, n, r) {
        const {abi: c, account: l = t.account, address: f, args: h, dataSuffix: d, functionName: p, ...g} = r;
        if ("undefined" === typeof l) throw new o.o({
          docsPath: "/docs/contract/writeContract"
        });
        const m = l ? (0, i.T)(l) : null, y = (0, s.R)({
          abi: c,
          args: h,
          functionName: p
        });
        try {
          return await (0, u.s)(t, e, n)({
            data: `${y}${d ? d.replace("0x", "") : ""}`,
            to: f,
            account: m,
            ...g
          });
        } catch (w) {
          throw (0, a.S)(w, {
            abi: c,
            address: f,
            args: h,
            docsPath: "/docs/contract/writeContract",
            functionName: p,
            sender: m?.address
          });
        }
      };
    })(O || (O = {}));
    var A = n(44199), R = n(18849);
    function N(t) {
      return {
        mutationFn: e => (async function (t, e) {
          const {account: n, chainId: r, connector: i, ...o} = e;
          let s;
          s = "object" === typeof n && "local" === n?.type ? t.getClient({
            chainId: r
          }) : await (0, R.e)(t, {
            account: n ?? void 0,
            assertChainId: !1,
            chainId: r,
            connector: i
          });
          const a = (0, A.s)(s, O, "writeContract");
          return await a({
            ...o,
            ...n ? {
              account: n
            } : {},
            chain: r ? {
              id: r
            } : null
          });
        })(t, e),
        mutationKey: ["writeContract"]
      };
    }
    var I = n(12364);
    function B() {
      let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      const {mutation: e} = t, n = N((0, I.Z)(t)), {mutate: i, mutateAsync: o, ...s} = (0, r.D)({
        ...e,
        ...n
      });
      return {
        ...s,
        writeContract: i,
        writeContractAsync: o
      };
    }
  },
  89134: function (t, e, n) {
    n.d(e, {
      tJ: function () {
        return o;
      }
    });
    function r(t, e) {
      let n;
      try {
        n = t();
      } catch (r) {
        return;
      }
      return {
        getItem: t => {
          var r;
          const i = t => null === t ? null : JSON.parse(t, null == e ? void 0 : e.reviver), o = null != (r = n.getItem(t)) ? r : null;
          return o instanceof Promise ? o.then(i) : i(o);
        },
        setItem: (t, r) => n.setItem(t, JSON.stringify(r, null == e ? void 0 : e.replacer)),
        removeItem: t => n.removeItem(t)
      };
    }
    const i = t => e => {
      try {
        const n = t(e);
        return n instanceof Promise ? n : {
          then: t => i(t)(n),
          catch(t) {
            return this;
          }
        };
      } catch (n) {
        return {
          then(t) {
            return this;
          },
          catch: t => i(t)(n)
        };
      }
    }, o = (t, e) => ("getStorage" in e) || ("serialize" in e) || ("deserialize" in e) ? (console.warn("[DEPRECATED] `getStorage`, `serialize` and `deserialize` options are deprecated. Use `storage` option instead."), ((t, e) => (n, r, o) => {
      let s = {
        getStorage: () => localStorage,
        serialize: JSON.stringify,
        deserialize: JSON.parse,
        partialize: t => t,
        version: 0,
        merge: (t, e) => ({
          ...e,
          ...t
        }),
        ...e
      }, a = !1;
      const u = new Set(), c = new Set();
      let l;
      try {
        l = s.getStorage();
      } catch (y) {}
      if (!l) return t((...t) => {
        (console.warn(`[zustand persist middleware] Unable to update item '${s.name}', the given storage is currently unavailable.`), n(...t));
      }, r, o);
      const f = i(s.serialize), h = () => {
        const t = s.partialize({
          ...r()
        });
        let e;
        const n = f({
          state: t,
          version: s.version
        }).then(t => l.setItem(s.name, t)).catch(t => {
          e = t;
        });
        if (e) throw e;
        return n;
      }, d = o.setState;
      o.setState = (t, e) => {
        (d(t, e), h());
      };
      const p = t((...t) => {
        (n(...t), h());
      }, r, o);
      let g;
      const m = () => {
        var t;
        if (!l) return;
        (a = !1, u.forEach(t => t(r())));
        const e = (null == (t = s.onRehydrateStorage) ? void 0 : t.call(s, r())) || void 0;
        return i(l.getItem.bind(l))(s.name).then(t => {
          if (t) return s.deserialize(t);
        }).then(t => {
          if (t) {
            if ("number" !== typeof t.version || t.version === s.version) return t.state;
            if (s.migrate) return s.migrate(t.state, t.version);
            console.error("State loaded from storage couldn't be migrated since no migrate function was provided");
          }
        }).then(t => {
          var e;
          return (g = s.merge(t, null != (e = r()) ? e : p), n(g, !0), h());
        }).then(() => {
          (null == e || e(g, void 0), a = !0, c.forEach(t => t(g)));
        }).catch(t => {
          null == e || e(void 0, t);
        });
      };
      return (o.persist = {
        setOptions: t => {
          (s = {
            ...s,
            ...t
          }, t.getStorage && (l = t.getStorage()));
        },
        clearStorage: () => {
          null == l || l.removeItem(s.name);
        },
        getOptions: () => s,
        rehydrate: () => m(),
        hasHydrated: () => a,
        onHydrate: t => (u.add(t), () => {
          u.delete(t);
        }),
        onFinishHydration: t => (c.add(t), () => {
          c.delete(t);
        })
      }, m(), g || p);
    })(t, e)) : ((t, e) => (n, o, s) => {
      let a = {
        storage: r(() => localStorage),
        partialize: t => t,
        version: 0,
        merge: (t, e) => ({
          ...e,
          ...t
        }),
        ...e
      }, u = !1;
      const c = new Set(), l = new Set();
      let f = a.storage;
      if (!f) return t((...t) => {
        (console.warn(`[zustand persist middleware] Unable to update item '${a.name}', the given storage is currently unavailable.`), n(...t));
      }, o, s);
      const h = () => {
        const t = a.partialize({
          ...o()
        });
        return f.setItem(a.name, {
          state: t,
          version: a.version
        });
      }, d = s.setState;
      s.setState = (t, e) => {
        (d(t, e), h());
      };
      const p = t((...t) => {
        (n(...t), h());
      }, o, s);
      let g;
      s.getInitialState = () => p;
      const m = () => {
        var t, e;
        if (!f) return;
        (u = !1, c.forEach(t => {
          var e;
          return t(null != (e = o()) ? e : p);
        }));
        const r = (null == (e = a.onRehydrateStorage) ? void 0 : e.call(a, null != (t = o()) ? t : p)) || void 0;
        return i(f.getItem.bind(f))(a.name).then(t => {
          if (t) {
            if ("number" !== typeof t.version || t.version === a.version) return [!1, t.state];
            if (a.migrate) return [!0, a.migrate(t.state, t.version)];
            console.error("State loaded from storage couldn't be migrated since no migrate function was provided");
          }
          return [!1, void 0];
        }).then(t => {
          var e;
          const [r, i] = t;
          if ((g = a.merge(i, null != (e = o()) ? e : p), n(g, !0), r)) return h();
        }).then(() => {
          (null == r || r(g, void 0), g = o(), u = !0, l.forEach(t => t(g)));
        }).catch(t => {
          null == r || r(void 0, t);
        });
      };
      return (s.persist = {
        setOptions: t => {
          (a = {
            ...a,
            ...t
          }, t.storage && (f = t.storage));
        },
        clearStorage: () => {
          null == f || f.removeItem(a.name);
        },
        getOptions: () => a,
        rehydrate: () => m(),
        hasHydrated: () => u,
        onHydrate: t => (c.add(t), () => {
          c.delete(t);
        }),
        onFinishHydration: t => (l.add(t), () => {
          l.delete(t);
        })
      }, a.skipHydration || m(), g || p);
    })(t, e);
  }
}]);
