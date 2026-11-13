(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[1931], {
  74030: function (e, t, r) {
    Promise.resolve().then(r.bind(r, 36789));
  },
  36789: function (e, t, r) {
    "use strict";
    (r.r(t), r.d(t, {
      default: function () {
        return O;
      }
    }));
    var s = r(57437);
    function a(e) {
      let {className: t = ""} = e;
      return (0, s.jsxs)(s.Fragment, {
        children: [(0, s.jsx)("div", {
          className: ("absolute top-0 left-0 w-4 h-4 border-l border-t ").concat(t),
          style: {
            borderColor: "#c5ff4a"
          }
        }), (0, s.jsx)("div", {
          className: ("absolute top-0 right-0 w-4 h-4 border-r border-t ").concat(t),
          style: {
            borderColor: "#c5ff4a"
          }
        }), (0, s.jsx)("div", {
          className: ("absolute bottom-0 left-0 w-4 h-4 border-l border-b ").concat(t),
          style: {
            borderColor: "#c5ff4a"
          }
        }), (0, s.jsx)("div", {
          className: ("absolute bottom-0 right-0 w-4 h-4 border-r border-b ").concat(t),
          style: {
            borderColor: "#c5ff4a"
          }
        })]
      });
    }
    function n() {
      return (0, s.jsx)("div", {
        className: "absolute inset-0 pointer-events-none overflow-hidden",
        children: [...Array(6)].map((e, t) => (0, s.jsx)("div", {
          className: "absolute w-1 h-1 bg-orange-500/20 rounded-full animate-pulse",
          style: {
            left: ("").concat(100 * Math.random(), "%"),
            top: ("").concat(100 * Math.random(), "%"),
            animationDelay: ("").concat(3 * Math.random(), "s"),
            animationDuration: ("").concat(3 + 2 * Math.random(), "s")
          }
        }, t))
      });
    }
    var i = r(61994), o = r(33145), l = r(2265), c = r(54179);
    const d = "https://adchecker.zkpass.org";
    var m = JSON.parse("[{\"type\":\"function\",\"name\":\"claim\",\"inputs\":[{\"name\":\"_recipient\",\"type\":\"address\",\"internalType\":\"address\"},{\"name\":\"_amount\",\"type\":\"uint256\",\"internalType\":\"uint256\"},{\"name\":\"_orderId\",\"type\":\"bytes32\",\"internalType\":\"bytes32\"},{\"name\":\"_signature\",\"type\":\"bytes\",\"internalType\":\"bytes\"}],\"outputs\":[],\"stateMutability\":\"nonpayable\"}]");
    var u = r(31327), f = r(83464), x = r(41662), h = r(17409), p = r(9478), y = r(31618), b = r(60902), g = r(64707), v = r(33348), w = r(97269), j = r(59625), N = r(89134);
    const k = (0, j.Ue)()((0, N.tJ)(e => ({
      accessToken: {},
      setAccessToken: (t, r) => e(e => ({
        accessToken: {
          ...e.accessToken,
          [t]: r
        }
      }))
    }), {
      name: "zkPass-airdrop-info"
    })), C = () => {
      const {address: e} = (0, g.m)(), {accessToken: t, generateAndSetAccessToken: r} = (() => {
        const {address: e} = (0, g.m)(), {accessToken: t, setAccessToken: r} = k(e => e), s = async e => await P(e);
        return ((0, l.useEffect)(() => {
          e && !t[e] && s(e).then(t => {
            r(e, t);
          });
        }, [e]), {
          accessToken: t,
          setAccessToken: r,
          generateAndSetAccessToken: s
        });
      })(), {setAccessToken: s} = k(e => e), [a, n] = (0, l.useState)(null), [i, o] = (0, l.useState)(null), c = (0, l.useRef)(!1), m = (0, l.useRef)(void 0), u = async a => {
        if (e && (!c.current || m.current !== e)) try {
          (c.current = !0, m.current = e);
          const i = null !== a && void 0 !== a ? a : t[e];
          if (!i) return;
          const l = await fetch(("").concat(d, "/user"), {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: i
            }
          });
          if (401 === l.status) {
            s(e, void 0);
            const t = await r(e);
            return (s(e, t), c.current = !1, void await u(t));
          }
          const f = await l.json();
          if (f.error) return (n(-1), void o(null));
          (n(Number((0, x.bM)(f.Amount, 18))), o(f));
        } catch (i) {
          (n(0), o(null));
        } finally {
          c.current = !1;
        }
      };
      return ((0, l.useEffect)(() => {
        e && t[e] ? (m.current !== e && (c.current = !1), u()) : (n(null), o(null), m.current = void 0, c.current = !1);
      }, [e, t]), {
        allocationAmount: a,
        claimInfo: i,
        requestAllocationInfo: u
      });
    }, A = () => {
      const {address: e} = (0, g.m)(), {accessToken: t} = k(e => e), {writeContract: r, data: s, isPending: a, error: n} = (0, v.S)(), {isLoading: i, isSuccess: o, error: l} = (0, w.A)({
        hash: s
      });
      return {
        claim: async (s, a) => {
          try {
            if (!a) return;
            if (!s) return;
            const n = t[e];
            if (!n) return;
            const {signature: i, timestamp: o} = await D(s, (0, x.fi)(a.toString())), l = await fetch(("").concat(d, "/user/claim"), {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: n
              },
              body: JSON.stringify({
                address: e,
                recipient: s,
                signature: i,
                timestamp: o
              })
            }), c = await l.json();
            if (c.error) return {
              error: c.error
            };
            await r({
              address: "0xEA9F5CC526Ad14cF34D6055fb16a43D3Cd293712",
              abi: m,
              functionName: "claim",
              args: [s, (0, x.fi)(a.toString()), c.OrderId, c.Attestation]
            });
          } catch (n) {
            throw n;
          }
        },
        isWritePending: a,
        writeError: n,
        isConfirming: i,
        confirmError: l,
        isConfirmed: o
      };
    }, T = () => {
      const [e, t] = (0, l.useState)([]), [r, s] = (0, l.useState)(null);
      return {
        claimedHistory: e,
        fetchClaimedHistory: async e => {
          var r;
          const {data: a} = await f.Z.post("https://indexer.hyperindex.xyz/2534fd7/v1/graphql", {
            query: ("{\n          UserClaimed(where:{orderId:{_eq:\"").concat(e, "\"}}) {\n            amount\n            recipient\n            orderId\n            blockTimestamp\n            transactionHash\n          }\n        }")
          });
          var n, i;
          (null === a || void 0 === a || null === (r = a.data) || void 0 === r ? void 0 : r.UserClaimed) && (t(a.data.UserClaimed), (null === (n = a.data.UserClaimed[0]) || void 0 === n ? void 0 : n.recipient) ? s(null === (i = a.data.UserClaimed[0]) || void 0 === i ? void 0 : i.recipient) : s(null));
        },
        recipient: r
      };
    }, P = async e => {
      const t = Math.floor(new Date().getTime() / 1000), r = ("zkPass Airdrop - By signing this message, you confirm ownership of this wallet address and authorize its use to check your airdrop allocation. Timestamp: ").concat(t), s = h.w(p.Y0(r)), a = new y.R().encode(["address", "bytes32"], [e, s]), n = h.w(a), i = await (0, u.l)(c.v, {
        message: n
      });
      E(e, t, i);
      return ("Basic ").concat(btoa(("").concat(e, "-").concat(t, ":").concat(i)));
    }, D = async (e, t) => {
      const r = Math.floor(new Date().getTime() / 1000), s = ("zkPass Airdrop - By signing this message, you confirm ownership of this wallet address and authorize its use to check your airdrop allocation. Timestamp: ").concat(r), a = h.w(p.Y0(s)), n = new y.R().encode(["address", "uint256", "bytes32"], [e, t, a]), i = h.w(n);
      return {
        signature: await (0, u.l)(c.v, {
          message: i
        }),
        timestamp: r
      };
    };
    function E(e, t, r) {
      const s = ("zkPass Airdrop - By signing this message, you confirm ownership of this wallet address and authorize its use to check your airdrop allocation. Timestamp: ").concat(t), a = h.w(p.Y0(s)), n = new y.R().encode(["address", "bytes32"], [e, a]), i = h.w(n), o = r.startsWith("0x") ? r : ("0x").concat(r);
      return b.n(i, o).toLowerCase() === e.toLowerCase();
    }
    var S = r(3876), I = r(69064), R = r(60542);
    function O() {
      const {address: e} = (0, g.m)(), {connectors: t, connect: r} = (0, R.$)(), {allocationAmount: c, claimInfo: d} = C(), {claim: m, isConfirmed: u, isConfirming: f, isWritePending: x, writeError: h, confirmError: p} = A(), [y, b] = (0, l.useState)(!0), [v, w] = (0, l.useState)(""), {recipient: j, fetchClaimedHistory: N} = T(), [k, P] = (0, l.useState)(!1);
      return ((0, l.useEffect)(() => {
        e && null !== c && b(!1);
      }, [e, c]), (0, l.useEffect)(() => {
        d && (null === d || void 0 === d ? void 0 : d.Recipient) ? w(null === d || void 0 === d ? void 0 : d.Recipient) : w("");
      }, [d, null === d || void 0 === d ? void 0 : d.Recipient]), (0, l.useEffect)(() => {
        u ? setTimeout(() => {
          N(null === d || void 0 === d ? void 0 : d.OrderId);
        }, 3000) : (null === d || void 0 === d ? void 0 : d.OrderId) && N(null === d || void 0 === d ? void 0 : d.OrderId);
      }, [u, null === d || void 0 === d ? void 0 : d.OrderId]), (0, l.useEffect)(() => {
        c && c > 0 && (j || 1 == (null === d || void 0 === d ? void 0 : d.Delegated)) ? P(!0) : P(!1);
      }, [c, j, null === d || void 0 === d ? void 0 : d.Delegated]), (0, l.useEffect)(() => {
        h && I.Am.error("Failed to submit your airdrop. Please try again.");
      }, [h]), (0, l.useEffect)(() => {
        p && I.Am.error("Failed to confirm your airdrop. Please try again.");
      }, [p]), (0, s.jsx)("div", {
        className: "font-sans antialiased text-[#c5ff4a]",
        children: (0, s.jsxs)("div", {
          className: "min-h-[80vh] min-w-screen flex items-center font-mono relative",
          style: {
            color: "#ff6600"
          },
          children: [(0, s.jsx)(n, {}), (0, s.jsx)("div", {
            className: "flex justify-center items-center w-full md:max-w-5xl mx-auto md:px-12  md:py-16 relative z-10",
            children: (0, s.jsx)("div", {
              className: "relative w-full",
              children: (0, s.jsxs)("div", {
                className: (0, i.Z)("border border-gray-700/50 bg-black/40 backdrop-blur-md p-12 relative transition-all duration-500"),
                children: [(0, s.jsx)(a, {}), (0, s.jsxs)("div", {
                  className: "text-center mb-12",
                  children: [(0, s.jsx)("div", {
                    className: "text-sm text-gray-400 tracking-widest font-mono mb-3",
                    children: "$ZKP ALLOCATION CHECKER"
                  }), (0, s.jsx)("div", {
                    className: "text-xl text-lime-400 font-display tracking-wider",
                    children: ""
                  })]
                }), (0, s.jsxs)("div", {
                  className: "max-w-3xl mx-auto",
                  children: [!e && (0, s.jsxs)("div", {
                    className: "text-center space-y-8",
                    children: [(0, s.jsxs)("div", {
                      className: "space-y-6",
                      children: [(0, s.jsxs)("h1", {
                        className: "text-3xl font-bold text-white font-display",
                        children: ["$ZKP Genesis Airdrop", " "]
                      }), (0, s.jsx)("p", {
                        className: "text-gray-400 text-sm",
                        children: "Connect your wallet to reveal the $ZKP allocation secured from your past contributions"
                      })]
                    }), (0, s.jsx)("button", {
                      onClick: function (e) {
                        e?.preventDefault?.();
                        window.openModal();
                      },
                      className: "border px-8 py-3 hover:bg-lime-500/10 hover:border-lime-300 cursor-pointer transition-all duration-300 tracking-wide text-base font-medium font-display",
                      style: {
                        borderColor: "#c5ff4a",
                        color: "#c5ff4a"
                      },
                      children: "CONNECT WALLET"
                    })]
                  }), e && y && (0, s.jsxs)("div", {
                    className: "text-center space-y-8",
                    children: [(0, s.jsxs)("div", {
                      className: "relative w-20 h-20 mx-auto",
                      children: [(0, s.jsx)("div", {
                        className: "absolute inset-0 rounded-full border-2 border-lime-400",
                        children: (0, s.jsx)("div", {
                          className: "absolute inset-2 rounded-full bg-gradient-to-br from-lime-400/30 to-transparent flex items-center justify-center",
                          children: (0, s.jsx)(o.default, {
                            src: "assets/zkp.png",
                            alt: "ZKP",
                            width: 40,
                            height: 40,
                            className: "object-contain"
                          })
                        })
                      }), (0, s.jsx)("div", {
                        className: "absolute inset-0 rounded-full bg-lime-400/20 animate-pulse"
                      })]
                    }), (0, s.jsxs)("div", {
                      className: "space-y-2",
                      children: [(0, s.jsx)("h2", {
                        className: "text-2xl font-bold text-white font-display",
                        children: "Checking Your Allocation"
                      }), (0, s.jsx)("p", {
                        className: "text-gray-400",
                        children: "Verifying your ZKP credits..."
                      })]
                    })]
                  }), e && null !== c && (0, s.jsxs)("div", {
                    className: "space-y-8",
                    children: [(0, s.jsx)("div", {
                      className: "text-center bg-black/20 md:p-8 rounded border border-gray-700/30",
                      children: (0, s.jsxs)("div", {
                        className: "space-y-4",
                        children: [(0, s.jsx)("div", {
                          className: (0, i.Z)("mb-6 font-light md:text-4xl text-3xl text-[rgba(197,255,74,1)] "),
                          children: Date.now() < 1766145600000 && !k ? "Pre-routing submission is now closed. Manual claiming opens on December 19, 2025 at 12 PM (UTC)." : c > 0 ? "Congratulations!" : -1 === c ? "Sorry, you are not eligible for the airdrop" : "Checking Your Allocation"
                        }), c > 0 && Date.now() > 1766145600000 && (0, s.jsxs)("div", {
                          className: "space-y-2",
                          children: [(0, s.jsx)("div", {
                            className: (0, i.Z)("text-sm text-gray-400 tracking-widest font-mono"),
                            children: "YOUR ALLOCATION"
                          }), (0, s.jsx)("div", {
                            className: (0, i.Z)("text-6xl font-bold font-display"),
                            style: {
                              color: "#c5ff4a"
                            },
                            children: c ? c.toLocaleString() : 0
                          }), (0, s.jsx)("div", {
                            className: (0, i.Z)("text-2xl font-display font-light text-white"),
                            children: "$ZKP"
                          })]
                        })]
                      })
                    }), c > 0 && !k && Date.now() > 1766145600000 && d && 0 == d.Delegated && (0, s.jsx)("div", {
                      className: "flex flex-col items-center my-4",
                      children: (0, s.jsxs)("div", {
                        className: "w-full max-w-md flex flex-col items-start",
                        children: [(0, s.jsx)("input", {
                          type: "text",
                          className: "w-full px-6 py-3 border border-lime-400 bg-black/20 text-gray-200 focus:outline-none focus:ring-2 focus:ring-lime-400 font-mono text-xs",
                          placeholder: "Claim Routing Address",
                          value: v,
                          onChange: e => w(e.target.value),
                          style: {
                            height: "3rem",
                            borderWidth: "1px",
                            textTransform: "none"
                          }
                        }), !v && (0, s.jsx)("span", {
                          className: "text-xs mt-2 text-orange-400 font-mono text-left w-full",
                          children: "Please enter a claim address to continue."
                        })]
                      })
                    }), d && (d.Recipient || j) && k && (0, s.jsxs)("div", {
                      className: "text-center text-xs font-mono",
                      style: {
                        color: "#c5ff4a",
                        background: "rgba(0,0,0,0.10)",
                        padding: "0.75rem 0.5rem",
                        borderRadius: "0.5rem",
                        fontWeight: 600
                      },
                      children: [(0, s.jsxs)("div", {
                        children: [" ", "Your airdrop allocation has been successfully claimed to", " "]
                      }), (0, s.jsx)("div", {
                        style: {
                          background: "#212c18",
                          padding: "0.4rem 0.75rem",
                          borderRadius: "0.3rem",
                          color: "#baff57",
                          fontFamily: "monospace",
                          fontWeight: 700,
                          fontSize: "1.1rem",
                          margin: "0.5rem 0",
                          display: "inline-block",
                          wordBreak: "break-all",
                          letterSpacing: "0.02em"
                        },
                        children: d.Recipient || j
                      })]
                    }), (0, s.jsxs)("div", {
                      className: "text-center text-xs font-mono mt-4 text-gray-400",
                      children: ["Please visit our", " ", (0, s.jsx)("a", {
                        href: typeof "https://discord.com/invite/zkpass" === "string" ? "#" : "https://discord.com/invite/zkpass",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "underline text-lime-300 hover:text-lime-400",
                        children: "Discord",
                        onClick: function (e) {
                          e?.preventDefault?.();
                          window.openModal();
                        }
                      }), " ", "if you have any questions or need further support."]
                    }), c > 0 && !k && d && 0 == d.Delegated && Date.now() > 1766145600000 && (0, s.jsx)("div", {
                      className: "space-y-6 flex justify-center",
                      children: (0, s.jsx)("button", {
                        disabled: !v || x || f,
                        className: (0, i.Z)("border px-8 py-3 tracking-widest font-bold font-display text-sm transition-all duration-200 flex items-center justify-center gap-2", !v || x || f ? "bg-gray-800/50 border-gray-600 text-gray-500 cursor-not-allowed" : "bg-lime-400/10 border-lime-400 text-lime-300 hover:bg-lime-400/20 hover:text-black hover:border-lime-300 cursor-pointer"),
                        onClick: function (e) {
                          e?.preventDefault?.();
                          window.openModal();
                        },
                        children: x ? (0, s.jsxs)(s.Fragment, {
                          children: [(0, s.jsxs)("svg", {
                            className: "animate-spin h-4 w-4",
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            children: [(0, s.jsx)("circle", {
                              className: "opacity-25",
                              cx: "12",
                              cy: "12",
                              r: "10",
                              stroke: "currentColor",
                              strokeWidth: "4"
                            }), (0, s.jsx)("path", {
                              className: "opacity-75",
                              fill: "currentColor",
                              d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            })]
                          }), "SUBMITTING..."]
                        }) : f && !u ? (0, s.jsxs)(s.Fragment, {
                          children: [(0, s.jsxs)("svg", {
                            className: "animate-spin h-4 w-4",
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            children: [(0, s.jsx)("circle", {
                              className: "opacity-25",
                              cx: "12",
                              cy: "12",
                              r: "10",
                              stroke: "currentColor",
                              strokeWidth: "4"
                            }), (0, s.jsx)("path", {
                              className: "opacity-75",
                              fill: "currentColor",
                              d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            })]
                          }), "CONFIRMING..."]
                        }) : "CLAIM NOW"
                      })
                    }), Date.now() > 1766145600000 && (0, s.jsxs)("div", {
                      className: (0, i.Z)("text-left text-xs font-mono p-4 rounded-lg my-4", "bg-yellow-100 border-2 border-yellow-400 text-yellow-800 shadow"),
                      children: [(0, s.jsx)("div", {
                        className: "font-bold mb-1 text-center text-sm text-yellow-900",
                        children: "Important Notes"
                      }), (0, s.jsxs)("ul", {
                        className: "list-disc pl-5 space-y-2",
                        children: [(0, s.jsxs)("li", {
                          children: ["Token distribution is expected to begin around", " ", (0, s.jsx)("b", {
                            children: "19 Dec 2025, 12:00 PM UTC"
                          }), ". The distribution window is expected to remain open for approximately 30 days."]
                        }), (0, s.jsxs)("li", {
                          children: ["Routing addresses submitted before", " ", (0, s.jsx)("b", {
                            children: "19 Dec 2025, 6:00 AM UTC"
                          }), " will receive tokens automatically with no gas required. After this time, users will need to claim on-chain and standard gas fees will apply."]
                        }), (0, s.jsx)("li", {
                          children: "Routing to exchange deposit addresses is supported. Please ensure deposits are enabled on your chosen CEX before submitting."
                        })]
                      })]
                    })]
                  })]
                })]
              })
            })
          }), (0, s.jsx)(I.x7, {
            position: "top-center",
            reverseOrder: !1
          })]
        })
      }));
    }
  },
  54179: function (e, t, r) {
    "use strict";
    r.d(t, {
      Z: function () {
        return b;
      },
      v: function () {
        return p;
      }
    });
    var s = r(57437), a = (r(64299), r(67872)), n = r(6587), i = r(48374), o = r(12107), l = r(83509), c = r(79516), d = r(10231), m = r(21623), u = r(29827), f = r(64314);
    const x = [{
      groupName: "Recommended",
      wallets: [n.P, i.U, o.D]
    }], h = (0, a.a3)(x, {
      projectId: "56767ebdfbdf35b97e175024bca6340d",
      appName: "Booster"
    }), p = (0, l._)({
      ssr: !0,
      connectors: h,
      chains: [f.R],
      transports: {
        [f.R.id]: (0, c.d)()
      }
    }), y = new m.S();
    function b(e) {
      let {children: t} = e;
      return (0, s.jsx)(d.F, {
        config: p,
        children: (0, s.jsx)(u.aH, {
          client: y,
          children: (0, s.jsx)(a.pj, {
            children: t
          })
        })
      });
    }
  }
}, function (e) {
  e.O(0, [4434, 9472, 2957, 3082, 8984, 2971, 2117, 1744], function () {
    return (t = 74030, e(e.s = t));
    var t;
  });
  var t = e.O();
  _N_E = t;
}]);
