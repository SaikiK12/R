# Kit Changelog

Observed changes to the deployed kit across the analysis window
(2026-11-11 through 2026-11-14).

---

## Bundle Version `1.18.4` — No Updates Observed

The bundle (`0735606691…f9ea6a2`, 1,034,759 bytes) was byte-identical across
all three captures (2026-11-11, 2026-11-12, 2026-11-14). The operator has
not rebuilt or redeployed the bundle during this period.

---

## 2026-11-14 — Campaign Pivot: Trump COIN → ClaimFreeSOL

**Type:** Lure HTML replacement (bundle unchanged)

| Property | Before | After |
|---|---|---|
| Lure HTML SHA-256 | `0554c891…` | `9db71990…` |
| HTML size | — | 92,170 B |
| Theme | Trump COIN airdrop | ClaimFreeSOL fake DEX / SOL cleanup tool |
| Language | `lang="ru"` | English |
| Brand | donaldjtrump.com impersonation | ClaimFreeSOL (CFS) / FL!pN |
| Social | — | `x.com/cfs_foundation`, `discord.com/invite/claimfreesol` |
| Referral | — | 30% commission affiliate banner |

---

## 2026-11-12 — Locale Expansion

`/api/locales` expanded from 3 languages (en/fr/zh, observed 2026-11-11) to
14 languages (en, fr, zh, de, es, pt, it, ja, ko, ar, tr, pl, id, vi).

`ru` and `uk` continue to return 404.

---

## 2026-11-12 — Config Rotation (Receiver Addresses)

A second config capture (`data/live/cfg_decoded_2.json`) showed different
receiver addresses. This confirms the operator rotates receivers without
rebuilding the bundle. The rotation window was within the same evening session.

---

## 2026-11-12 — Transient 220-Byte Config (Rolled Back)

A config variant 220 bytes in length appeared for approximately 1 hour on
2026-11-12, containing an additional pubkey (`DvuqUzFA…`). The standard
185-byte config was restored. No on-chain activity from `DvuqUzFA…` as of
2026-11-13. Status: OPEN.

---

## 2026-11-11 — Baseline

Initial capture:
- Bundle version: `1.18.4`
- Treasury: `DvTqmF7u…` — 17,057 SOL + 1.02M USDC
- 15 sibling domains decoded to identical config
- 3 locale languages confirmed (en/fr/zh)
