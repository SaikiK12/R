# Archive: raw samples

> **Live malware samples for research. Do not execute.** Every file
> here was captured from attacker infrastructure on 2026-11-11 and is
> kept so the analysis in this repo stays verifiable after the
> operation's domains die. Open in a text editor, never in a browser,
> wallet, or runtime.

| File | SHA-256 | Source |
|---|---|---|
| `pumpanakin.fun/index.js` | `0735606691bbdf35d38d7531c0e48363a21ef6f7224ebce2908a1b487f9ea6a2` | `https://pumpanakin.fun/_nuxt/assets/index.js?aa6524x` — the reference drainer bundle (1,034,759 B, JS-Confuser) |
| `pumpanakin.fun/lure.html` | `0554c891b75742f9f4292f478a216e7ddbeab00518fb241eb80d22b56d5364dc` | `https://pumpanakin.fun/` — lure page with the two-layer text trick (see `LURE_ANALYSIS.md`) |
| `pumpanakin.fun/sbdst.js` | `14e67de9e4fbeb6ce7e5cc71179ba0c210714d73a998c9b94c5560d5b716b5cb` | `https://pumpanakin.fun/assets/js/sbdst.js?717o97x` — fake countdown + parallax helper |
| `pumpanakin.fun/jxi33.js` | `f5ad72b13a3ba6614caeb70e4306d690f6939b752e28dc0ec48c2182647761f5` | `https://pumpanakin.fun/assets/js/jxi33.js?0s3xodk` — jQuery 3.4.1 (legit library, shipped by the lure) |
| `easyinvest7.biz/connect.html` | `a277ccaf360f954b50f17e3c93478ae54cb7121fa780ca1553ac2210a53cd6bc` | `https://easyinvest7.biz/connect/rvl-7raj_dhlbkx5c4dqrf?b=1` — connect-domain shell (533 B, see `DYNAMIC_ANALYSIS.md`) |
| `easyinvest7.biz/index-f916ac.js` | `b53dbb64786342d36a9a8be4bc5114a42e5ad28f707b3fabb7371526c1add82f` | connect-domain shim — mobile check + `openModal()` on load (158 B) |
| `easyinvest7.biz/app-924a52.js` | `0735606691bbdf35d38d7531c0e48363a21ef6f7224ebce2908a1b487f9ea6a2` | connect-domain app — **byte-identical to `pumpanakin.fun/index.js`** (kept as the proof) |
| `operator_program/program.elf` | `6de98643ecab4d83842ac5aa45b9a8f0338f173c459c92f949b7e462ba3a1c4e` | on-chain programdata of `TwrGADB9QPrLfTKpWuyq9tjgRaGsuzgRUMFTz51uhsa` (45-byte loader header stripped) — 60,760 B eBPF, analysis in `decompiled/kit/chain/operator_program.md` |
| `operator_program/program.account.bin` | `b46f06b193d4d62026cfd68e96e8c52976d7c54f55449659664028912a4e716a` | 36-byte program account (loader state variant 2 + programdata address `HwWXKu3txa2CH6wMvPTMmZKY5bXHovftanBXbfUfqo5g`) |
| `sibling_lures/*.html` | see files | Lure HTML of three sibling deployments (arvoniq.com, vaultspin.win, isen.fund), referenced by `LURE_ANALYSIS.md` |

On-chain artifacts were pulled from public Solana RPC
(`api.mainnet-beta.solana.com`, `getAccountInfo`). Web artifacts were
plain GETs of public URLs. Decode paths for the bundle:
`python3 deobfuscate.py archive/pumpanakin.fun/index.js --out-dir /tmp/out`
(from the repo root).
