# Claims — Initial Hypotheses and Resolution Status

This document tracked open analytical questions from the initial static
analysis pass. All items are now resolved (see `data/gap.md` for full detail).

---

## Closed

| Claim | Status | Location |
|---|---|---|
| Bundle calls `GET /api/config` on page load | CONFIRMED | `data/gap.md` — line 33587 |
| Config is AES-GCM encrypted with `SHA-256(host + salt)` | CONFIRMED | `data/core/operator/backend.md` |
| Salt is `B3ui3QZFrOPoGW7oMZgE4A` | CONFIRMED | `data/gap.md` |
| `/api/locales` is called client-side | REFUTED — never called by browser | `data/gap.md` |
| `/c/i` payload is 15B nonce + u64 lamports + 32B pubkey | CONFIRMED | `data/gap.md` |
| `/c/i` response includes session_id | CONFIRMED | `data/gap.md` |
| `/api/process` has a 52-byte binary header | CONFIRMED (`緢 = 52`) | `data/gap.md` |
| `/api/handler` events are AES-GCM encrypted | CONFIRMED | `docs/kit-overview.md` |
| Exclusion set contains 29 addresses | REFUTED — 6 addresses | `data/gap.md` |
| `L2TExMFKdj` is operator infrastructure | REFUTED — Lighthouse | `archive/prog/lighthouse.md` |
| Bundle redirects Russian/Ukrainian locales | CONFIRMED — `邞()` at line 33529 | `data/gap.md` |
| Config is cached in localStorage | CONFIRMED — `_0x12` key | `data/gap.md` |

---

## Open

| Claim | Status |
|---|---|
| `/api/stats` accepts specific query parameters | OPEN — no client reference |
| Discriminators 14, 16, 17, 20 have documented semantics | OPEN — ELF-only |
| `DvuqUzFA…` pubkey has an active role | OPEN — 1-hour appearance, rolled back |
