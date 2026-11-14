# archive/

Raw files captured from live infrastructure during the November 2026 mapping
exercise. These are the source artifacts that the reconstructions in `data/`
and `docs/` are built from.

## Subdirectories

### `s1/` — pumpanakin.fun (primary lure domain)

Main JS bundle, lure HTML pages, helper scripts, and media assets from the
primary lure domain. Two campaign states are present:

- **Pre-2026-11-14**: Trump COIN airdrop lure (`lang="ru"`, impersonating
  donaldjtrump.com)
- **2026-11-14 re-dump**: ClaimFreeSOL / FL!pN fake DEX lure (campaign pivot)

The JS bundle is byte-identical across both captures. Only the HTML changed.

| File | SHA-256 | Size |
|---|---|---|
| `s1/index.js` | `0735606691…f9ea6a2` | 1,034,759 B |
| `s1/snaps/2026-11-14/index.html` | `9db71990…` | 92,170 B |
| `s1/snaps/2026-11-14/index_nuxt.js` | `0735606691…f9ea6a2` | 1,034,759 B (identical) |

### `s2/` — easyinvest7.biz (connect domain)

Shell connect page and app bundle from an earlier connect domain. The app
bundle (`app-924a52.js`) is byte-identical to `s1/index.js`.

### `s3/` — petramon.xyz (active connect domain, 2026-11-12 evening)

Connect shell page, mobile shim, and stylesheet from the connect domain
active during the 2026-11-12 live session.

### `siblings/` — 60+ sibling deployments

Full per-domain captures from the sibling infrastructure sweep. One
directory per responding host: `index.html`, decrypted `api_config.json`,
ciphertext `api_config.bin`, and same-origin scripts/styles under 250 KB.

The shared bundle is not duplicated — every kit host serves the same
`0735606691…` hash. See `siblings/manifest_2026-11-12.json` and
`siblings/manifest_dump_2026-11-13.json` for the full host inventory.

Fifteen hosts decoded to identical config (USDC target, 1–500 SOL range,
sibling `trongame.fun`, receivers `HrmfWTNd…`, `7oHgTZjN…`, `7mfxYcwy…`).

### `ext/` — External reference collections

Reference material from public sources, used for cross-analysis. See
`ext/README.md` for the full index.

### `prog/` — On-chain program

ELF binary and analysis for the operator's on-chain Solana program
(`TwrGADB9…`) plus a correction note for the Lighthouse program that
was initially misidentified during the 2026-11-12 session.

## File Hashes (key artifacts)

| File | SHA-256 |
|---|---|
| `s1/index.js` | `0735606691bbdf35d38d7531c0e48363a21ef6f7224ebce2908a1b487f9ea6a2` |
| `s1/jxi33.js` | `f5ad72b13a3ba6614caeb70e4306d690f6939b752e28dc0ec48c2182647761f5` |
| `s1/sbdst.js` | `14e67de9e4fbeb6ce7e5cc71179ba0c210714d73a998c9b94c5560d5b716b5cb` |
| `s2/api_config.bin` | — (live capture; rotates) |
| `prog/program.elf` | `6de98643ecab4d83842ac5aa45b9a8f0338f173c459c92f949b7e462ba3a1c4e` |
| `prog/program.account.bin` | `b46f06b193d4d62026cfd68e96e8c52976d7c54f55449659664028912a4e716a` |
