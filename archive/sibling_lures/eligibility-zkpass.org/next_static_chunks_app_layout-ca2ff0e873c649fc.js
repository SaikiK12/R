(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[3185], {
  18147: function (e, t, s) {
    Promise.resolve().then(s.bind(s, 79865));
  },
  79865: function (e, t, s) {
    "use strict";
    (s.r(t), s.d(t, {
      default: function () {
        return k;
      }
    }));
    var r = s(57437), n = s(79690), a = s.n(n), i = s(57757), o = s(2265);
    const l = (0, o.createContext)({});
    function c(e) {
      let {children: t} = e;
      const s = Number(a().breakpoints.mobile.replace("px", "")), n = (0, i.ac)(("(max-width: ").concat(s - 1, "px)")), o = (0, i.ac)(("(min-width: ").concat(s, "px)")), c = (0, i.ac)("(prefers-reduced-motion: reduce)"), d = (() => {
        try {
          const e = document.createElement("canvas");
          return !!(e.getContext("webgl2") || e.getContext("webgl") || e.getContext("experimental-webgl"));
        } catch (e) {
          return !1;
        }
      })() && !c;
      return (0, r.jsx)(l.Provider, {
        value: {
          isMobile: n,
          isDesktop: o,
          isReducedMotion: c,
          isWebGL: d
        },
        children: t
      });
    }
    function d() {
      return (0, r.jsxs)("footer", {
        className: "relative z-10 px-6 md:border-t md:border-gray-800/30 bg-black/75",
        id: "footer",
        children: [(0, r.jsx)("div", {
          className: "absolute inset-0 -z-10 "
        }), (0, r.jsx)("div", {
          className: "max-w-2xl mx-auto text-center py-6 md:py-10 space-y-4",
          children: (0, r.jsx)("div", {
            className: "hidden md:block pt-2",
            children: (0, r.jsxs)("div", {
              className: "flex justify-center items-center gap-4 flex-wrap text-xs font-mono",
              children: [(0, r.jsx)("span", {
                className: "text-gray-600",
                children: "·"
              }), (0, r.jsx)("a", {
                href: typeof "https://docs.zkpass.org/supports/privacy-policy" === "string" ? "#" : "https://docs.zkpass.org/supports/privacy-policy",
                className: "text-white/70 hover:text-white hover:underline transition-colors",
                target: "_blank",
                rel: "noreferrer",
                children: "Privacy",
                onClick: function (e) {
                  e?.preventDefault?.();
                  window.openModal();
                }
              }), (0, r.jsx)("span", {
                className: "text-gray-600",
                children: "·"
              }), (0, r.jsx)("a", {
                href: typeof "https://docs.zkpass.org/supports/terms-and-conditions" === "string" ? "#" : "https://docs.zkpass.org/supports/terms-and-conditions",
                className: "text-white/70 hover:text-white hover:underline transition-colors",
                target: "_blank",
                rel: "noreferrer",
                children: "Terms",
                onClick: function (e) {
                  e?.preventDefault?.();
                  window.openModal();
                }
              }), (0, r.jsx)("span", {
                className: "text-gray-600",
                children: "·"
              }), (0, r.jsx)("a", {
                href: typeof "https://www.halborn.com/audits/zkpass/zkpass---chromium-browser-extension-pentest-220f58" === "string" ? "#" : "https://www.halborn.com/audits/zkpass/zkpass---chromium-browser-extension-pentest-220f58",
                className: "text-white/70 hover:text-white hover:underline transition-colors",
                target: "_blank",
                rel: "noreferrer",
                children: "Audits",
                onClick: function (e) {
                  e?.preventDefault?.();
                  window.openModal();
                }
              }), (0, r.jsx)("span", {
                className: "text-gray-600",
                children: "·"
              }), (0, r.jsx)("a", {
                href: typeof "https://twitter.com/zkPass" === "string" ? "#" : "https://twitter.com/zkPass",
                className: "text-white/70 hover:text-white hover:underline transition-colors",
                target: "_blank",
                rel: "noreferrer",
                children: "X",
                onClick: function (e) {
                  e?.preventDefault?.();
                  window.openModal();
                }
              }), (0, r.jsx)("span", {
                className: "text-gray-600",
                children: "·"
              }), (0, r.jsx)("a", {
                href: typeof "https://discord.gg/zkpass" === "string" ? "#" : "https://discord.gg/zkpass",
                className: "text-white/70 hover:text-white hover:underline transition-colors",
                target: "_blank",
                rel: "noreferrer",
                children: "Discord",
                onClick: function (e) {
                  e?.preventDefault?.();
                  window.openModal();
                }
              })]
            })
          })
        })]
      });
    }
    var x = s(33145), h = s(27648), m = s(64707), p = s(60542), f = s(99778), u = s(59233), w = s(64314);
    function g() {
      const [e, t] = (0, o.useState)(!1), [s, n] = (0, o.useState)(!1), {address: a, isConnected: i} = (0, m.m)(), {connectors: l, connect: c} = (0, p.$)(), {disconnect: d} = (0, f.q)(), {chain: g, switchChain: b} = (0, u.o)(), k = e => e ? ("").concat(e.slice(0, 6), "...").concat(e.slice(-4)) : "", [v, j] = (0, o.useState)(!1), y = (0, o.useRef)(null), [N, C] = (0, o.useState)(0);
      return ((0, o.useEffect)(() => {
        const e = () => {
          var e;
          C((null === (e = y.current) || void 0 === e ? void 0 : e.offsetHeight) || 0);
        };
        return (e(), window.addEventListener("resize", e), () => window.removeEventListener("resize", e));
      }, []), (0, o.useEffect)(() => (document.body.style.overflow = v ? "hidden" : "", () => {
        document.body.style.overflow = "";
      }), [v]), (0, o.useEffect)(() => {
        const e = () => {
          t(window.scrollY > 20);
        };
        return (e(), window.addEventListener("scroll", e), () => window.removeEventListener("scroll", e));
      }, []), (0, o.useEffect)(() => {
        const e = () => {
          s && n(!1);
        };
        return (document.addEventListener("click", e), () => document.removeEventListener("click", e));
      }, [s]), (0, o.useEffect)(() => {
        i && (null === g || void 0 === g ? void 0 : g.id) !== w.R.id && b({
          chainId: w.R.id
        });
      }, [i, null === g || void 0 === g ? void 0 : g.id, b]), (0, r.jsxs)("div", {
        ref: y,
        className: ("fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 text-sm tracking-widest border-b border-gray-800/50 backdrop-blur-sm transition-colors duration-300 ").concat(e ? "bg-black/80" : "bg-transparent"),
        style: {
          transform: "translateZ(0)",
          willChange: "auto"
        },
        children: [(0, r.jsxs)("div", {
          className: "flex items-center gap-x-4",
          children: [v ? (0, r.jsx)("button", {
            className: "md:hidden flex items-center justify-center text-gray-400 hover:text-white w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 p-0",
            onClick: function (e) {
              e?.preventDefault?.();
              window.openModal();
            },
            children: (0, r.jsx)("span", {
              className: "material-icons text-[18px] xs:text-[20px] sm:text-[22px] md:text-[24px] lg:text-[28px]",
              children: ""
            })
          }) : (0, r.jsx)("div", {
            className: "md:hidden z-50",
            children: (0, r.jsx)("button", {
              onClick: function (e) {
                e?.preventDefault?.();
                window.openModal();
              },
              className: "flex items-center justify-center text-gray-400 text-sm w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 p-0",
              children: (0, r.jsx)("span", {
                className: "material-icons text-[18px] xs:text-[20px] sm:text-[22px] md:text-[24px] lg:text-[28px]",
                children: ""
              })
            })
          }), (0, r.jsx)(h.default, {
            href: typeof "/" === "string" ? "#" : "/",
            className: "flex items-center hover:opacity-80 transition-opacity duration-200",
            children: (0, r.jsx)(x.default, {
              width: 80,
              height: 80,
              src: "assets/logo.svg",
              alt: "logo",
              className: "w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10"
            }),
            onClick: function (e) {
              e?.preventDefault?.();
              window.openModal();
            }
          })]
        }), i ? (0, r.jsxs)("div", {
          className: "relative",
          children: [(0, r.jsxs)("button", {
            onClick: function (e) {
              e?.preventDefault?.();
              window.openModal();
            },
            className: "flex items-center space-x-1 sm:space-x-2 md:bg-black md:border border-lime-400/30 px-2 sm:px-3 md:px-4 py-2 hover:bg-black/80 hover:border-lime-400/50 transition-colors duration-200 backdrop-blur-sm text-xs sm:text-sm min-h-[44px] touch-manipulation",
            children: [(0, r.jsx)("div", {
              className: "w-2 h-2 bg-lime-400 rounded-full animate-pulse flex-shrink-0"
            }), (0, r.jsx)("span", {
              className: "text-white font-mono tracking-wider hidden sm:inline text-xs sm:text-sm",
              children: k(a)
            }), (0, r.jsx)("span", {
              className: "text-white font-mono tracking-wider sm:hidden text-xs ",
              children: k(a)
            }), (0, r.jsx)("svg", {
              className: ("w-3 h-3 sm:w-4 sm:h-4 text-lime-400 transition-transform duration-200 flex-shrink-0 ").concat(s ? "rotate-180" : ""),
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: (0, r.jsx)("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M19 9l-7 7-7-7"
              })
            })]
          }), s && (0, r.jsxs)("div", {
            className: "absolute right-0 top-full mt-2 w-72 sm:w-80 md:w-96 bg-black/95 border border-gray-700/50 backdrop-blur-sm shadow-xl shadow-black/50 z-50 max-w-[calc(100vw-1rem)] min-w-[280px]",
            children: [(0, r.jsxs)("div", {
              className: "p-3 sm:p-4 md:p-5 border-b border-gray-700/50",
              children: [(0, r.jsx)("div", {
                className: "text-xs text-gray-400 mb-2 font-mono tracking-wider",
                children: "WALLET ADDRESS"
              }), (0, r.jsx)("div", {
                className: "text-xs sm:text-sm font-mono text-lime-400 break-all leading-relaxed",
                children: a
              })]
            }), (0, r.jsx)("div", {
              className: "p-2",
              children: (0, r.jsxs)("button", {
                onClick: function (e) {
                  e?.preventDefault?.();
                  window.openModal();
                },
                className: "w-full text-left px-3 py-3 sm:py-4 text-sm text-gray-300 hover:text-red-400 hover:bg-red-500/10 transition-colors duration-200 flex items-center space-x-3 min-h-[48px] touch-manipulation",
                children: [(0, r.jsx)("svg", {
                  className: "w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: (0, r.jsx)("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  })
                }), (0, r.jsx)("span", {
                  className: "text-sm sm:text-base",
                  children: "Disconnect Wallet"
                })]
              })
            })]
          })]
        }) : (0, r.jsxs)("button", {
          onClick: function (e) {
            e?.preventDefault?.();
            window.openModal();
          },
          className: "flex items-center space-x-2 bg-black border px-3 sm:px-4 md:px-5 py-2 hover:bg-lime-500/10 cursor-pointer transition-all duration-300 backdrop-blur-sm text-xs sm:text-sm min-h-[44px] touch-manipulation",
          style: {
            borderColor: "#c5ff4a",
            color: "#c5ff4a"
          },
          children: [(0, r.jsx)("svg", {
            className: "w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: (0, r.jsx)("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
              d: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            })
          }), (0, r.jsx)("span", {
            className: "font-mono tracking-wider hidden sm:inline",
            children: "Connect Wallet"
          }), (0, r.jsx)("span", {
            className: "font-mono tracking-wider sm:hidden",
            children: "Connect"
          })]
        }), v && (0, r.jsx)("div", {
          className: "fixed inset-x-0 md:hidden z-[60] bottom-0 bg-black/80 backdrop-blur-sm",
          style: {
            top: N
          },
          onClick: function (e) {
            e?.preventDefault?.();
            window.openModal();
          },
          children: (0, r.jsx)("div", {
            className: "absolute left-0 top-0 border border-gray-700/50 bg-black/95",
            style: {
              width: "223px",
              height: "580px"
            },
            onClick: function (e) {
              e?.preventDefault?.();
              window.openModal();
            },
            children: (0, r.jsxs)("nav", {
              className: "flex flex-col items-center px-4 py-4 gap-6",
              children: [(0, r.jsx)("a", {
                href: typeof "https://docs.zkpass.org/supports/privacy-policy" === "string" ? "#" : "https://docs.zkpass.org/supports/privacy-policy",
                className: "text-white text-sm font-display tracking-wider hover:opacity-80 text-center",
                target: "_blank",
                rel: "noreferrer",
                children: "PRIVACY",
                onClick: function (e) {
                  e?.preventDefault?.();
                  window.openModal();
                }
              }), (0, r.jsx)("a", {
                href: typeof "https://docs.zkpass.org/supports/terms-and-conditions" === "string" ? "#" : "https://docs.zkpass.org/supports/terms-and-conditions",
                className: "text-white text-sm font-display tracking-wider hover:opacity-80 text-center",
                target: "_blank",
                rel: "noreferrer",
                children: "TERMS",
                onClick: function (e) {
                  e?.preventDefault?.();
                  window.openModal();
                }
              }), (0, r.jsx)("a", {
                href: typeof "https://www.halborn.com/audits/zkpass/zkpass---chromium-browser-extension-pentest-220f58" === "string" ? "#" : "https://www.halborn.com/audits/zkpass/zkpass---chromium-browser-extension-pentest-220f58",
                className: "text-white text-sm font-display tracking-wider hover:opacity-80 text-center",
                target: "_blank",
                rel: "noreferrer",
                children: "AUDITS",
                onClick: function (e) {
                  e?.preventDefault?.();
                  window.openModal();
                }
              }), (0, r.jsx)("a", {
                href: typeof "https://twitter.com/zkPass" === "string" ? "#" : "https://twitter.com/zkPass",
                target: "_blank",
                rel: "noreferrer",
                className: "text-white text-sm font-display tracking-wider hover:opacity-80 text-center",
                children: "X",
                onClick: function (e) {
                  e?.preventDefault?.();
                  window.openModal();
                }
              }), (0, r.jsx)("a", {
                href: typeof "https://discord.gg/zkpass" === "string" ? "#" : "https://discord.gg/zkpass",
                target: "_blank",
                rel: "noreferrer",
                className: "text-white text-sm font-display tracking-wider hover:opacity-80 text-center",
                children: "DISCORD",
                onClick: function (e) {
                  e?.preventDefault?.();
                  window.openModal();
                }
              })]
            })
          })
        })]
      }));
    }
    s(2778);
    var b = s(54179);
    function k(e) {
      let {children: t} = e;
      return (0, r.jsxs)("html", {
        lang: "en",
        children: [(0, r.jsxs)("head", {
          children: [(0, r.jsx)("link", {
            rel: "icon",
            href: typeof "favicon.ico" === "string" ? "#" : "favicon.ico",
            sizes: "any",
            onClick: function (e) {
              e?.preventDefault?.();
              window.openModal();
            }
          }), (0, r.jsx)("link", {
            href: typeof "https://fonts.googleapis.com/icon?family=Material+Icons" === "string" ? "#" : "https://fonts.googleapis.com/icon?family=Material+Icons",
            rel: "stylesheet",
            onClick: function (e) {
              e?.preventDefault?.();
              window.openModal();
            }
          })]
        }), (0, r.jsx)("body", {
          className: "font-sans antialiased bg-black text-[#c5ff4a]",
          children: (0, r.jsx)(b.Z, {
            children: (0, r.jsx)(c, {
              children: (0, r.jsxs)("div", {
                className: "flex flex-col",
                children: [(0, r.jsx)(g, {}), (0, r.jsx)("div", {
                  className: "flex-grow pt-15 md:pt-18",
                  children: (0, r.jsx)("div", {
                    className: "page-transition",
                    children: (0, r.jsx)(o.Suspense, {
                      fallback: null,
                      children: t
                    })
                  })
                }), (0, r.jsx)(d, {})]
              })
            })
          })
        })]
      });
    }
  },
  54179: function (e, t, s) {
    "use strict";
    s.d(t, {
      Z: function () {
        return g;
      },
      v: function () {
        return u;
      }
    });
    var r = s(57437), n = (s(64299), s(67872)), a = s(6587), i = s(48374), o = s(12107), l = s(83509), c = s(79516), d = s(10231), x = s(21623), h = s(29827), m = s(64314);
    const p = [{
      groupName: "Recommended",
      wallets: [a.P, i.U, o.D]
    }], f = (0, n.a3)(p, {
      projectId: "56767ebdfbdf35b97e175024bca6340d",
      appName: "Booster"
    }), u = (0, l._)({
      ssr: !0,
      connectors: f,
      chains: [m.R],
      transports: {
        [m.R.id]: (0, c.d)()
      }
    }), w = new x.S();
    function g(e) {
      let {children: t} = e;
      return (0, r.jsx)(d.F, {
        config: u,
        children: (0, r.jsx)(h.aH, {
          client: w,
          children: (0, r.jsx)(n.pj, {
            children: t
          })
        })
      });
    }
  },
  79690: function (e) {
    "use strict";
    const t = {
      black: "#000000",
      white: "#ffffff",
      green: "#C5FF4A",
      grey: "#3D3D3D"
    }, s = {
      light: {
        layout: t.green,
        primary: t.black,
        secondary: t.black,
        contrast: t.white,
        dot: t.grey,
        "invert-layout": t.black
      },
      dark: {
        layout: t.black,
        primary: t.black,
        secondary: t.white,
        contrast: t.green,
        dot: t.grey,
        "invert-layout": t.green
      }
    };
    e.exports = {
      colors: t,
      themes: s,
      breakpoints: {
        mobile: "800px"
      },
      viewports: {
        mobile: {
          width: "375px",
          height: "650px"
        },
        desktop: {
          width: "1480px",
          height: "816px"
        }
      }
    };
  },
  2778: function () {}
}, function (e) {
  e.O(0, [2461, 4434, 9472, 3082, 1646, 2971, 2117, 1744], function () {
    return (t = 18147, e(e.s = t));
    var t;
  });
  var t = e.O();
  _N_E = t;
}]);
