# Research Index

Master index of all analysis work in this repository.

---

## Primary Artifact

| Property | Value |
|---|---|
| Bundle SHA-256 | `0735606691bbdf35d38d7531c0e48363a21ef6f7224ebce2908a1b487f9ea6a2` |
| Bundle size | 1,034,759 bytes |
| Obfuscation | JS-Confuser |
| Kit version | `1.18.4` |
| Vendor brand | `hexfomo.fun` |
| Deobfuscated output | `data/deobfuscated/bundle.deobfuscated.js` (34,134 lines) |

---

## Analysis Phases

### Phase 1 — Static Analysis (2026-11-11)

Initial capture and static examination of the bundle. Established the basic
architecture (Nuxt frontend, AES-GCM operator API, on-chain program). Identified
the key salt `B3ui3QZFrOPoGW7oMZgE4A` and treasury address. Sibling sweep
identified 15 hosts with identical config.

**Output:** Initial claims list (now `docs/claims.md`).

---

### Phase 2 — Live Dynamic Analysis (2026-11-12)

Two live sessions (T1 and T2). Confirmed API call sequence, decrypted live
config, observed real mainnet transactions, corrected Lighthouse misattribution.
Locale expansion observed (3 → 14 languages).

**Output:** `data/live/findings_1.json`, `data/live/findings_2.json`,
`data/live/cfg_decoded.json`, `archive/prog/lighthouse.md`.

---

### Phase 3 — External Reference Collection (2026-11-13)

Collected reference kits from public sources for cross-analysis. Full
deobfuscation run initiated.

**Output:** `archive/ext/` contents, `data/deobfuscated/bundle.deobfuscated.js`.

---

### Phase 4 — Deobfuscation Completion and Re-Dump (2026-11-14)

All open analytical questions resolved from deobfuscated bundle. Campaign pivot
to ClaimFreeSOL confirmed with fresh capture. New fleet manifest updated.

**Output:** `data/gap.md` (all items closed except 3), updated manifests,
`archive/s1/snaps/2026-11-14/`.

---

## Document Map

| Document | Covers |
|---|---|
| `README.md` | Repository overview and reading order |
| `docs/kit-overview.md` | Full system architecture |
| `docs/kit-modules.md` | Per-module reconstruction index |
| `docs/pipeline.md` | Step-by-step transaction flow |
| `docs/frontend.md` | Lure page, wallet modal, locale strings |
| `docs/map.md` | All 60+ domains |
| `docs/kit-changelog.md` | Observed kit and campaign changes |
| `docs/context.md` | DaaS ecosystem background |
| `docs/claims.md` | Hypothesis tracking |
| `docs/recon.md` | Reconnaissance methods and findings |
| `docs/notes.md` | Miscellaneous technical notes |
| `data/gap.md` | Deobfuscation gap closure log |
| `data/core/notes.md` | Bundle reconstruction directory map |
| `data/core/operator/backend.md` | Full API model |
| `data/core/chain/program.md` | On-chain program analysis |
| `data/live/notes.md` | Dynamic session notes |
| `data/live/runtime.md` | Runtime observation log |
| `archive/README.md` | Raw capture inventory |
| `archive/ext/README.md` | External reference index |
| `archive/prog/lighthouse.md` | Lighthouse correction |
| `archive/s1/snaps/2026-11-14/notes.md` | 2026-11-14 re-dump notes |
| `data/targets/t*.md` | Per-domain profiles (t1–t47) |

---

## Key Identifiers Quick Reference

| Identifier | Value |
|---|---|
| Bundle | `0735606691bbdf35d38d7531c0e48363a21ef6f7224ebce2908a1b487f9ea6a2` |
| Operator program | `TwrGADB9QPrLfTKpWuyq9tjgRaGsuzgRUMFTz51uhsa` |
| Treasury | `DvTqmF7u…` |
| Collector | `6cwsqBqm…` |
| AES key salt | `B3ui3QZFrOPoGW7oMZgE4A` |
| Kit version | `1.18.4` |
| Upgrade authority | `3ofSxsTReb…` |
| Helius keys | 4 keys in bundle (see `docs/kit-overview.md`) |
