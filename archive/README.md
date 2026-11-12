# Archive: captured samples

Artifacts captured from live infrastructure during the November 2026 mapping exercise.
Static analysis only — these are the files the decompiled reconstructions are based on.

## pumpanakin.fun

| File | SHA-256 | Notes |
|---|---|---|
| `pumpanakin.fun/index.js` | `0735606691bbdf35d38d7531c0e48363a21ef6f7224ebce2908a1b487f9ea6a2` | Main JS bundle, 1,034,759 B, JS-Confuser obfuscated |
| `pumpanakin.fun/lure.html` | `0554c891b75742f9f4292f478a216e7ddbeab00518fb241eb80d22b56d5364dc` | Landing page HTML |
| `pumpanakin.fun/sbdst.js` | `14e67de9e4fbeb6ce7e5cc71179ba0c210714d73a998c9b94c5560d5b716b5cb` | Countdown + parallax helper |
| `pumpanakin.fun/jxi33.js` | `f5ad72b13a3ba6614caeb70e4306d690f6939b752e28dc0ec48c2182647761f5` | jQuery 3.4.1 |
| `pumpanakin.fun/media/malicious.webm` | `51b2dae2886fe25ee1a26632c11359a2bd97612a4cb66e2ae3a658ed14ca4ef6` | 10.8s video clip |
| `pumpanakin.fun/media/200tx.webm` | `8c0c63fe6760272f4de9a96720e5f94b110f20333452849c2831db040129575a` | 11.0s video clip |
| `pumpanakin.fun/media/refund.webm` | `8a743b41a8a89c0cb39d8f66871e57cadcf8571a1662525934615dc4ecda87a9` | 8.0s video clip |

## easyinvest7.biz (connect domain)

| File | SHA-256 | Notes |
|---|---|---|
| `easyinvest7.biz/connect.html` | `a277ccaf360f954b50f17e3c93478ae54cb7121fa780ca1553ac2210a53cd6bc` | Shell page, 533 B |
| `easyinvest7.biz/index-f916ac.js` | `b53dbb64786342d36a9a8be4bc5114a42e5ad28f707b3fabb7371526c1add82f` | Mobile detection shim, 158 B |
| `easyinvest7.biz/app-924a52.js` | `0735606691bbdf35d38d7531c0e48363a21ef6f7224ebce2908a1b487f9ea6a2` | App bundle — byte-identical to `pumpanakin.fun/index.js` |
| `easyinvest7.biz/api_config.bin` | — | Live `/api/config` ciphertext (rotates; captured 2026-11-12 22:12 UTC) |
| `easyinvest7.biz/api_config.json` | — | Decrypted — plaintext identical to pumpanakin.fun's |

## On-chain program

| File | SHA-256 | Notes |
|---|---|---|
| `operator_program/program.elf` | `6de98643ecab4d83842ac5aa45b9a8f0338f173c459c92f949b7e462ba3a1c4e` | 60,760 B eBPF ELF — programdata of `TwrGADB9…` |
| `operator_program/program.account.bin` | `b46f06b193d4d62026cfd68e96e8c52976d7c54f55449659664028912a4e716a` | 36-byte program account |

## Sibling deployments

`sibling_lures/<host>/` — recaptured 2026-11-12 17:00 UTC. One directory per
host that still returned a page: `index.html`, decrypted `api_config.json`
(plus the 188-byte ciphertext), and same-origin scripts/styles under 250 KB.
The shared bundle is not copied again; every kit host still serves
`07356066…f9ea6a2`.

15 hosts decrypt to the same config (USDC, 1–500 SOL, sibling `trongame.fun`,
receivers `HrmfWTNd…`, `7oHgTZjN…`, `7mfxYcwy…`): arvoniq.com, vaultspin.win,
dexfi.app, paybackpump.fun, amlbot.rest, rolldice.icu, daddysdogg.com,
isen.fund, allocationclaim.com, boom-frog.xyz, eligibility-zkpass.org,
pumpswap.rest, app.dextools.info, solchaindapps.com, pumpstreams.expl.live.
English modal strings match `decompiled/live/locales_en.json` on all 15.

`dexscreener.fyi` is only the costume. Its HTML loads the bundle from
`neatly-resonant.ext-helper.cc`, which serves the reference bundle and the
same decrypted config. Root on that host is a 404. `amlbot.store`,
`lens-badland.fontstack.cc`, and `voicechat.fun` are named from lure HTML
and do not resolve.

The three flat `*.html` files next to the directories are the 2026-11-11
snapshots of arvoniq, vaultspin, and isen. Index of who answered and who
did not: `sibling_lures/manifest_2026-11-12.json`.

## External samples

`external_samples/` — reference kit files pulled from public GitHub sources
for cross-analysis. See `MERGED_KIT.md` for the synthesis built from these.

## Reproduce the decode

```bash
python3 decode.py archive/pumpanakin.fun/index.js --out-dir /tmp/out
```
