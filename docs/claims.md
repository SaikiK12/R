# Claim ledger

Status of statements that were left standing after a later note contradicted them.
Grades: `chain` (public ledger), `file` (bytes in this repo), `live-get` (public GET, no wallet), `instrument` (our harness), `inference`.

A retraction here replaces the sentence. Do not cite the old sentence.

## Closed

| Claim | Verdict | Grade |
|---|---|---|
| Handler plaintexts are decoded by `strings` | No. Seven of eight stored plaintexts parse to a fixed layout that consumes every byte. See `decompiled/live/dynamic/handler_events_parsed_2026-11-13.json`. | file |
| Those handler events are live victim telemetry | No. All seven share pubkey `4Lj6MdBFVpz8pBEyxB4Zf3dYFHiDwF83zdZVVcGnw7u8`, wallet name Phantom, language en-US. That is the harness. | instrument |
| The eighth handler event can be retried with the connect-domain key | No. The file stored the error string only. The ciphertext is gone. | file |
| `L2TExMFK…` is an operator program | No. It is Lighthouse. `archive/operator_program/lighthouse_L2TExMFKdj.elf` is the wrong binary. | chain |
| Treasury `DvTqmF7u…` pays the fee and is still accumulating | No, as of 2026-11-13. Newest signature was 2026-11-06. Balance still 17057.095705105 SOL, unchanged since 2026-11-11. Observed fee payer is `4cfdFcVu…`. Collector `6cwsqBqm…` moved (356.41 SOL at 2026-11-12 23:05 UTC, 362.14 SOL on 2026-11-13). | chain |
| The program did 10 transactions in the five hours before 16:41 UTC on 2026-11-12, all successful | The listed ten are one RPC page. That five-hour window has 17 signatures. Full visible history that day was 1016 signatures from 2026-10-26, 37 of them failed. 2026-11-12 had 67. The peak day in that window was 2026-11-07 with 295. | chain |
| urlscan hash pivot is ~60 domains | 77 scans, 47 domains, 30-day search window, `has_more: false`, rechecked 2026-11-13. `pumpanakin.fun` is not in those 47. | live-get |
| Live `/api/config` on 2026-11-13 is the empty receiver set from the 2026-11-12 notes | No. `pumpanakin.fun` and `amlbot.rest` both served a 188-byte blob decrypting to the 2026-11-11 plaintext: USDC mint, `7VHUFJHW…`, `3emsAVdm…`, max 500, min 1, sibling `trongame.fun`. | live-get |
| Reference bundle changed | No. Both hosts still serve 1,034,759 bytes, SHA-256 `0735606691bbdf35d38d7531c0e48363a21ef6f7224ebce2908a1b487f9ea6a2`. | live-get |

## Still open

| Claim | Why it is open |
|---|---|
| The bundle calls `GET /api/config` | `decompiled/kit/README.md` says it does not. `backend_model.md` says a browser walk showed it does, and that static recovery missed the call site. The call site is still not in the reading copy. The endpoint itself answers. |
| The bundle calls `GET /api/locales` | `ban_check.js` documents `loadLocales()`. `backend_model.md` says the bundle does not call it and the strings are baked in. Locale files are server responses, not proof of a call site. |
| `decompiled/kit/*.js` is the decrypted frontend | It is a handwritten reading copy. `decode.py` stops at strings, constants, and some built-in names. Control-flow flattening is untouched. No substituted bundle is committed. |
| Backend source is decrypted | It was never obtained. `backend_model.md` is an inference from client requests. |
| `/c/i`, `/c/c`, `/c/f`, `/api/process` layouts | No captured request or response in the repo. Unchecked. |
| `/api/stats` parameters | 422, parameter unknown. |
| Handler field names beyond kind, version, wallet, pubkey, lamports, language, token symbol | `opaque_u32`, `opaque_7`, `marker` (always 2), `field_u64_b` (37888 on kind 0, else 0), token `tag` (0) and `u32` (25000 on the USDC rows), and `trailer_8` are positional only. |
| `archive/operator_program/program.elf` matches `operator_program.md` | The ELF is 60,760 bytes. The note is 4 KB. They have not been diffed. |

## Handler records, structured

Kinds seen: 0 (popup, 0 lamports, `field_u64_b` 37888), 1 (2.0 SOL), 2 (1.99 SOL, or 1.99796072 SOL on the token path), 4 (1.99 SOL, labeled pre-sign). Token-path kinds 1 and 2 add one entry, symbol `USDC`, `u32` 25000. Version is `1.18.4` on every parsed record.
