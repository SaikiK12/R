# data/live/ — Dynamic Analysis Session Notes

Live analysis data from the 2026-11-12 and 2026-11-14 sessions.

---

## Files

| File | Contents |
|---|---|
| `cfg.bin` | Raw `/api/config` AES-GCM ciphertext (captured 2026-11-12) |
| `cfg_decoded.json` | Decrypted config (receiver addresses, token mint, amount params) |
| `cfg_decoded_2.json` | Second config capture (different receiver set) |
| `cfg_plain.bin` | Plaintext config binary |
| `findings_1.json` | 2026-11-12 T1 session: program account, treasury balance, initial findings |
| `findings_2.json` | 2026-11-12 T2 session: Lighthouse correction, additional findings |
| `hashes.json` | SHA-256 inventory of all captured files |
| `log.jsonl` | Live event log (JSONL format) |
| `matrix.json` | Cross-domain config comparison matrix |
| `urlscan.json` | urlscan.io search results for the bundle hash |
| `endpoints.json` | All observed API endpoints and response structures |
| `dynamic/` | Dynamic analysis artifacts (request/response captures) |
| `l_*.json` | Locale files for each supported language (en, fr, zh, de, es, pt, it, ja, ko, ar, tr, pl, id, vi) |

---

## 2026-11-12 T1 Session

First live session. Key observations:

- Confirmed `GET /api/config` returns AES-GCM blob; decrypted successfully.
- Treasury address `DvTqmF7u…` confirmed: 17,057 SOL + 1.02M USDC balance.
- Operator program `TwrGADB9…` confirmed upgradeable; upgrade authority
  `3ofSxsTReb…`.
- Sibling domain sweep initiated; 15 hosts decode to identical config.
- `/api/locales` confirmed: 11 languages (later expanded to 14 by T2).

---

## 2026-11-12 T2 Session

Follow-up session. Key findings:

- **Lighthouse correction**: `L2TExMFKdj…` misidentified as operator
  infrastructure. Confirmed as open-source Lighthouse assertion protocol.
  See `archive/prog/lighthouse.md`.
- Second config capture: different receiver addresses in `cfg_decoded_2.json`.
- `DvuqUzFA…` pubkey appeared in a 220-byte config variant for ~1 hour, then
  rolled back. Role undetermined. Status: OPEN (see `data/gap.md`).
- `/api/stats` endpoint discovered; returns 422 without params. No client
  bundle reference found.

---

## 2026-11-14 Session

- Campaign pivot confirmed: Trump COIN → ClaimFreeSOL / FL!pN fake DEX.
- Full deobfuscation run completed; `data/deobfuscated/bundle.deobfuscated.js`
  produced.
- All open items from initial analysis resolved except three. See `data/gap.md`.

---

## urlscan Pivot Queries

```
# Active (all sessions)
hash:0735606691bbdf35d38d7531c0e48363a21ef6f7224ebce2908a1b487f9ea6a2
page.url:"/_nuxt/assets/index.js"

# Post-2026-11-14
hash:9db7199011d0db36af695a7b69df132f5e251bddc639940001222791f8c47bf4
domain:claimfreesol
```
