# Transaction Flow — Step by Step

This document traces the full sequence from page load to on-chain settlement.

---

## Phase 1 — Page Initialization

1. Page loads. Bundle polyfills `AbortSignal.Be`, `Promise.withResolvers`,
   `String/Array.prototype.at`.
2. `readCampaignSource()` reads utm_source / referrer from localStorage `_0x6`
   or URL params. Stored for `/api/visit`.
3. `pageHost()` decodes the connect domain from `&d=` query param or
   `/connect/<slug>` path using base-x encoding.
4. `isTelegramWebView()` checks for Telegram WebApp context; extracts
   `tg.id` and `tg.username` if present.
5. Locale redirect check: if `navigator.language` matches `ru-*` or `*-ru`,
   the page immediately redirects to `solana.com` (operator region exclusion).
6. `POST /api/visit?source=…&tgid=…&tgus=…` fires (once per 900s cooldown).

---

## Phase 2 — Config and Ban Check

7. `GET /api/is-banned` — per-visitor IP/ASN check. Returns `"0"` or `"1"`.
8. `GET /api/config?tgid=N` — receives AES-GCM ciphertext blob.
   - Key: `SHA-256(apiHost + "B3ui3QZFrOPoGW7oMZgE4A")`
   - Decoded fields: receiver addresses, token mint, min/max SOL, sibling domain.
   - Ciphertext cached to `localStorage["_0x12"]` for return visits.
9. `GET /api/locales?lang=X` — loads modal strings (en/fr/zh fallback).
   14 languages available server-side; `ru` and `uk` return 404.

---

## Phase 3 — Wallet Connection

10. User clicks "Connect Wallet". Kit renders its own wallet picker (AppKit).
11. **Desktop**: `openConnectPopup()` opens a 360×450 popup to the connect
    domain (e.g. petramon.xyz).
    **Mobile**: embedded flow + deep-links to wallet apps.
12. User selects wallet (Phantom, Solflare, etc.) and approves connection.
    This step shares the public key only — no transaction is signed here.

---

## Phase 4 — Balance Gate and Portfolio Scan

13. `checkWallet()` calls Solflare API for SOL balance.
    - Balance < ~0.60 SOL → "insufficient balance" screen shown; flow ends.
    - Pubkey in exclusion set (6 operator monitoring addresses) → "target
      account" screen; flow ends.
14. `portfolio()` calls Solflare v3/portfolio/tokens + v2/portfolio/stake.
    Enumerates all SPL tokens, Token-2022 tokens (including fee-extension
    variants), LP tokens (Meteora/Raydium/Orca), and inactive stake accounts.
15. `priceTokens()` calls Jupiter (5 API keys, rotating on 429) for USD values.

---

## Phase 5 — Connect Notification

16. `POST /api/c/i` (AES-GCM encrypted, key: `SHA-256(apiHost + "c" + salt)`).

    Payload (59+ bytes):
    ```
    0–14:  15 random bytes
    15–22: u64 LE lamports (portfolio total)
    23–54: 32-byte victim pubkey
    55–N:  encoded account list
    N–N+3: CRC32
    ```

    Server returns: session_id + optional (pubkey_key, csv_value) + flow modifier.

---

## Phase 6 — Fake Confirm Dialog

17. Kit renders its own UI — NOT the wallet's native dialog.
    - Displays: "+1 SOL incoming", "+500 USDC incoming" (from decoy legs)
    - Plays: `/_nuxt/media/refund.webm` (social proof video)
    - Shows Phantom-spoof safety text
18. User clicks "Confirm" in the kit's dialog.
19. `POST /api/c/c/{sessionId}/{confirmCount}` — confirm notification.

---

## Phase 7 — Transaction Signing

20. Kit calls `wallet.signTransaction(drainTx)` — this is when the wallet's
    native popup appears.
21. The wallet shows the outer instruction deltas:
    - "+1 SOL incoming" (from decoy treasury→victim transfer)
    - "+500 USDC incoming" (from decoy relay→victim token transfer)
    The actual drain is a CPI through the operator program, invisible at the
    outer instruction level.
22. User approves. Wallet returns partially-signed transaction (1 of 3 required
    signers: victim, treasury, receiver).

---

## Phase 8 — Submission and Settlement

23. `POST /api/process` — partially-signed transaction sent to operator server.
    Server adds treasury and receiver signatures, then broadcasts to Solana.

    Payload header (52 bytes):
    ```
    0–12:  13 random bytes
    13–16: u32 LE attempt counter
    17–48: 32-byte victim pubkey
    49:    u8 flow type
    50–51: u16 LE tx section length
    52–N:  packByteArrays(signedTransactions + accountAddresses)
    ```

24. 2500ms after `/api/process`, kit self-broadcasts via its own RPC
    (`skipPreflight: true`) as a fallback.

25. Transaction settles on Solana mainnet (atomic):
    - Marker instruction: writes campaign tag permanently to chain.
    - Token sweep: operator program CPI drains all SPL/Token-2022 tokens.
    - Decoy legs: treasury sends 1 SOL and relay sends 500 USDC to victim
      (net zero — same cluster owns all accounts).
    - SOL split: disc 0x15 divides victim's SOL between receiver and collector.

26. `POST /api/c/f/{sessionId}` — final notification with account list.
27. Kit sends telemetry event (kind 3 = complete) to `/api/handler`.

---

## Flow Types

| Type | Byte | Description |
|---|---|---|
| DRAIN | 0 | Standard token + SOL sweep |
| SIWS | 1 | Sign-In-With-Solana verify step precedes drain |
| SPAM | 2 | 200-transaction mass-sign flood |

---

## Why the Wallet Preview Shows Positive Inflows

The decoy legs (treasury → victim 1 SOL, relay → victim 500 USDC) are
top-level instructions that wallet UI parses for balance deltas. The drain
is embedded inside a CPI called by the operator program — wallets that
only inspect outer instruction-level account changes report a net positive
balance change.

Lighthouse outer-balance assertions also pass for this reason (see
`archive/prog/lighthouse.md`). CPI-scoped assertions — asserting that no
token account decreases *including via CPI* — are what would catch this flow.
