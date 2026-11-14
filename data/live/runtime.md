# Runtime Map — Dynamic Execution Observations

Observations from the live dynamic analysis sessions (2026-11-12).

---

## Page Load Sequence (Observed)

1. Bundle loads at `/_nuxt/assets/index.js`.
2. Polyfills applied: `AbortSignal.Be`, `Promise.withResolvers`, `String/Array.at`.
3. `POST /api/visit` fires immediately (source, tgid, tgus params).
4. `GET /api/is-banned` — returns `"0"` on observed sessions.
5. `GET /api/config?tgid=N` — returns 185-byte AES-GCM blob (confirmed).
   Config cached to `localStorage["_0x12"]`.
6. `GET /api/locales?lang=en` — returns 10-entry JSON array.

---

## Wallet Connection (Observed on Desktop)

7. User clicks "Connect Wallet".
8. `openConnectPopup()` opens 360×450 popup to `petramon.xyz/connect/<slug>`.
9. AppKit wallet picker renders inside the popup.
10. User selects Phantom. Phantom extension prompts for connection approval.
11. Victim pubkey transmitted back to parent frame via postMessage.

---

## Balance Gate (Observed)

12. `checkWallet()` calls Solflare portfolio API.
13. For test wallet (< 0.60 SOL): "insufficient balance" screen shown.
14. For target wallet: proceeds to portfolio scan.

---

## Transaction Capture (From Mainnet Traces)

15. `POST /api/c/i` — 59-byte payload encrypted. Response: session_id.
16. Fake confirm dialog renders. Video plays.
17. `wallet.signTransaction(drainTx)` — wallet popup shows "+1 SOL, +500 USDC".
18. User approves. Kit receives partially-signed transaction.
19. `POST /api/process` — 52-byte header + signed tx bytes.
20. 2500ms later: RPC `sendTransaction` (skipPreflight: true) as fallback.
21. Transaction settles. `POST /api/c/f/{sessionId}` fires.
22. Telemetry event kind=3 (complete) sent to `/api/handler`.

---

## Observed API Response Timings

| Endpoint | Observed latency | Configured timeout |
|---|---|---|
| `/api/is-banned` | <100ms | 2500ms |
| `/api/config` | 180–340ms | 3000ms |
| `/api/locales` | 95–210ms | 2500ms |
| `/api/c/i` | 2.1–4.8s | 16000ms |
| `/api/process` | 1.2–2.4s | 2500ms |

---

## RPC Failover Observed

Helius endpoints returned 429 on some burn-heavy test transactions. Failover
proceeded in order: PublicNode → SolanaTracker → Mainnet-Beta. All 4 Helius
API keys rotate before the first non-Helius endpoint is tried.

---

## Telegram WebApp Context

Sessions initiated from Telegram mini-app links included `?tgid=N` on the
`/api/config` call. The returned config blob was structurally identical to
the non-Telegram config in the observed sessions, but server-side per-user
differentiation is architecturally possible (see `data/gap.md`).

---

## Related Files

| File | Contents |
|---|---|
| `data/live/log.jsonl` | Full live event log |
| `data/live/endpoints.json` | Captured request/response payloads |
| `data/live/findings_1.json` | T1 session structured findings |
| `data/live/findings_2.json` | T2 session structured findings |
| `data/live/dynamic/` | Raw dynamic analysis artifacts |
