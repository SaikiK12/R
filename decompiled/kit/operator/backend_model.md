# Operator backend model: how the server side works

This document reconstructs the operator's server-side implementation
from the client's requests (all endpoints, all request/response formats)
and from live-mapping evidence (`decompiled/live/`). The backend code
itself was not obtained. Everything here is inferred from the client's
behavior and the live responses.

## Stack inference

The backend serves:
- Static Nuxt build (`/_nuxt/assets/index.js`, CSS, images, media)
- A small API (`/api/*`) on the same origin
- Cloudflare sits in front of everything (confirmed by CF-Ray headers)

Likely stack: **Node.js with Express or Fastify** (or equivalent), or a
lightweight serverless function behind Cloudflare Workers. The binary
payload parsing and AES-GCM decryption are consistent with Node's
built-in `crypto` module. The backend is not Rust or Go — the response
times and error shapes are consistent with a Node runtime.

## Full API surface

| Path | Method | Auth | Request body | Response | Purpose |
|---|---|---|---|---|---|
| `/api/visit` | POST | none | — | `ok` / `banned` | Visit beacon; logs source, origin, tgid, tgus |
| `/api/is-banned` | GET | none | — | `0` or `1` | Per-visitor ban check |
| `/api/locales?lang={en\|fr\|zh}` | GET | none | — | 10-entry JSON array | Fake modal UI strings |
| `/api/config` | GET | none (AES-GCM encrypted response) | — | 188-byte AES-GCM blob | Live config: receivers, target token, amount range, sibling domain |
| `/api/c/i` | POST | AES-GCM encrypted body | AES-GCM bytes as base64 | binary session response | Connect notification; server returns session ID and optional decoy config |
| `/api/c/c/{a}/{b}` | POST | none | `{}` (empty JSON) | — | Confirm notification (victim clicked Confirm in fake dialog) |
| `/api/c/f/{a}` | POST | none | packed byte arrays as base64 | — | Final notification (transaction submitted) |
| `/api/process` | POST | none | binary payload as base64 | — | Receives signed transactions; server completes operator signatures and broadcasts |
| `/api/handler` | POST | AES-GCM encrypted body | AES-GCM bytes as base64, keepalive | — | Encrypted telemetry events (wallet name, kit version, pubkey, language, tokens) |
| `/config` | GET | — | — | lure HTML (SPA fallback) | Not a real endpoint; Nuxt SPA fallback |

## Endpoint detail

### POST /api/visit

**Request params (query string):**
- `source` — campaign tag from `localStorage["_0x6"]` (utm_source / referrer host)
- `origin` — only sent when pageHost ≠ apiHost (connect domain)
- `tgid` — Telegram numeric user ID (integer, string-formatted)
- `tgus` — Telegram @username (omitted if absent)

**Behavior:**
- Skipped when URL contains `?b=` (connect domain redirect arrival)
- Skipped for 900 seconds after a response body of exactly `ok`
- No JSON body; content-type not set

**Response:** `ok` (plain text) — cached by the kit for 900 s

**What the server stores:** IP, source tag, Telegram identity, timestamp.
This is the affiliate attribution record — the source tag ties every
drain back to the affiliate who drove the traffic.

---

### GET /api/is-banned

**Request:** bare GET, no params, no body
**Response:** `1` (banned) or `0` (not banned), plain text

**Server logic (inferred):** IP-range blocklist for known VPN/proxy/research
CIDRs. The balance gate handles individual users; this gate handles
traffic sources (security researchers, TOR exit nodes, known VPN ASNs).

---

### GET /api/locales?lang={lang}

**Response:** 10-element JSON array. See `decompiled/live/locales_en.json`.
404 for `ru` (the page itself hard-codes Russian copy so the modal copy
must be in English/French/Chinese for targeting non-RU victims).

---

### GET /api/config

**Response:** 188-byte binary blob = 12-byte AES-GCM IV + ciphertext
**Key derivation:** `SHA-256(apiHost + "B3ui3QZFrOPoGW7oMZgE4A")`
**Decoded structure:** See `decompiled/live/api_config_decoded.json`

**Corrected 2026-11-12 (browser evidence):** the bundle DOES call
`GET /api/config` at page load. A Playwright walk of pumpanakin.fun,
vaultspin.win, and amlbot.rest shows the same three calls on every load,
in order: `GET /api/is-banned` → `GET /api/config` → `POST /api/visit`.
The earlier claim (from static recovery, where no recovered call site
issued the GET) was wrong. The kit reads its live receivers from this
endpoint on every page view, which is how same-day receiver rotation
takes effect without a bundle rebuild.

The bundle does NOT call `/api/locales` from the browser — the modal
strings are baked into the bundle. That endpoint serves the operator's
tooling and possibly other kit builds. It is also the only place the
11→13-language expansion is visible.

Client-side cache after a successful load (localStorage):
- `_0x5` — unix timestamp of the visit (seconds)
- `_0x12` — JSON string holding a ~220-byte base64 blob (encrypted
  session/config cache)
- `_0x6` — campaign source tag, read (not written) for `/api/visit`

---

### POST /api/c/i (connect notification)

**Request body (after AES-GCM encryption):**
See `payloads.js` → `buildConnectPayload()`:
- 15 random bytes
- u64 LE: SOL amount in lamports (state.K)
- 32 bytes: victim wallet pubkey
- account list (encodeAccounts format)
- CRC32 checksum (4 bytes)

**Key:** `SHA-256(apiHost + "c" + "B3ui3QZFrOPoGW7oMZgE4A")`
**Timeout:** 16,000 ms

**Response (plain binary, NOT encrypted):**
Decoded structure (from `operator_api.js`):
```
bytes 0–10:    11 bytes  opaque header (session nonce / server state)
bytes 11–12:   u16 LE    field A — session ID returned to client
byte  13:      u8        field C — flow modifier
byte  14:      u8        flag: 0 = no keyed entry follows, else:
bytes 15–46:   32 bytes  base58-encoded pubkey (map key)
bytes 47–48:   u16 LE    string length
bytes 49–N:    UTF-8     comma-separated value (CSV of token mints or config)
```

**What the server does on receipt:**
1. Decrypts the body using the same AES-GCM key
2. Validates the CRC32
3. Records the victim's wallet and SOL amount
4. Returns a session ID (field A) and optionally decoy config:
   - The decoy amounts shown in the fake "Confirm Transaction" dialog
     (e.g. "−5 USDC", "1 SOL incoming") come from this response
   - The server decides the decoy amounts dynamically based on the
     victim's portfolio (received in the plaintext payload)

---

### POST /api/c/c/{a}/{b}

**Request:** `{}` (empty JSON object)
**a** = session ID from /c/i response (field A)
**b** = flow counter

**Purpose:** Notifies the operator that the victim clicked "Confirm" in
the fake dialog. The operator can correlate this event with the later
/api/process submission to measure drop-off between "clicked confirm"
and "actually signed."

---

### POST /api/c/f/{a}

**Request body:** `packByteArrays(items)` as base64 text/plain
**a** = session ID

**Purpose:** "Final" notification — fires after the transaction is
submitted (either to /api/process or self-broadcast). The packed byte
arrays are the final account list involved in the drain.

---

### POST /api/process

**Request body:** `buildProcessPayload()` as base64 text/plain
**Timeout:** 2,500 ms

**What the server does (fully inferred from the transaction structure):**
1. Decodes the base64 body
2. Parses the 52-byte header: extracts attempt counter, victim pubkey, flow byte
3. Extracts the signed transactions (the victim's partial signatures)
4. For each transaction:
   a. Verifies the victim's signature is valid
   b. Adds the operator's co-signatures:
      - Treasury key (DvTqmF7u…) signs as fee payer
      - Receiver key (7VHUFJHW… from live config) signs as receiver
   c. Submits the fully-signed transaction to Solana mainnet
5. Optionally: decodes the account list (the token accounts drained)
   and updates the operator's internal records

**Why this endpoint exists (not just self-broadcast):**
The drain transaction requires 3 signatures (victim + treasury + receiver).
The victim only provides 1. The operator must add the other 2 server-side
before the transaction is valid. The kit also self-broadcasts after 2.5 s
(submit.js), but that only works if the operator has already signed by then.

---

### POST /api/handler

**Request body:** AES-GCM encrypted binary event record as base64 text/plain
**Key:** `SHA-256(apiHost + "log" + "B3ui3QZFrOPoGW7oMZgE4A")`
**keepalive: true** — fires even if the page is being closed

**Decrypted payload (binary record):**
See `telemetry.js` for the full layout. Confirmed contents (dynamic analysis):
- Kit version: `1.18.4`
- Wallet name: `Phantom` (or any wallet name)
- Victim pubkey (base58)
- Browser language: `en-US`
- Token symbols: `PUMP`, `USDC` (etc.)
- Event kind (1–4): page load / connect / sign / complete

**What the server does:** Writes to its victim log. Used for:
- Real-time operator dashboard (see victim balances, monitor live drains)
- Affiliate attribution (combined with /api/visit source tag)
- Debugging (kit version allows operator to track which builds are deployed)

## Backend security model

| Mechanism | What it does |
|---|---|
| Cloudflare free plan | CDN + DDoS + WAF (basic); hides origin IP |
| UA cloaking (server-side) | Returns fake 404 to non-desktop UAs |
| `is-banned` endpoint | Per-visitor kill switch (IP/ASN blocklist) |
| `?b=` suppression | Prevents double-beaconing from the connect domain |
| AES-GCM on /c/i and /handler | Encrypts victim data in transit; key is per-operator (derived from hostname) |
| `/api/config` encryption | Hides live receiver addresses from passive monitoring |

**Notable absence:** No authentication on any endpoint. Any researcher
who knows the endpoint shapes and key derivation can:
- Read the live config (domain + key → decrypt GET /api/config)
- Decrypt all /api/handler traffic (domain + "log" + salt → key)
- Decrypt /c/i request bodies (domain + "c" + salt → key)

This is Flaw F1 and F2 in `FLAWS.md`.

## Backend notification flow timeline

```
victim browser                           operator backend
─────────────────                        ────────────────────────────────────────
  page load
    POST /api/visit?source=…             → store(ip, source, tgid, tgus)
    GET  /api/is-banned                  → 0
    GET  /api/locales?lang=en            → ["Incoming transfer", …]

  [wallet connects]
    POST /api/c/i (AES-GCM)             → decrypt → store(victim, lamports, accounts)
                                         → return(session_id, decoy_config)

  [victim sees fake Confirm dialog]

  [victim clicks Confirm]
    POST /api/c/c/{session}/{counter}    → store(confirmed=true, timestamp)

  [victim's wallet signs tx]
    POST /api/process (base64 binary)   → deserialize(victim_sig, accounts)
                                         → add(treasury_sig, receiver_sig)
                                         → submit_to_solana()
                                                │
                                                ▼
                                         ┌─── Solana mainnet ───┐
                                         │ operator program     │
                                         │ vault PDA drain      │
                                         │ → receivers collect  │
                                         └──────────────────────┘

  +2.5s: kit self-broadcasts            ─────────────────────────────────────► RPC
  (if state.he.ie unset)

    POST /api/c/f/{session} (packed)    → store(final_accounts)

  per-event (async, keepalive):
    POST /api/handler (AES-GCM)         → decrypt → log(version, wallet, pubkey, tokens)
```

## Connect domain backend (/connect/* paths)

The connect domain (`easyinvest7.biz`) serves a minimal shell:
- `connect.html` (533 bytes): bare HTML loading two scripts
- `index-f916ac.js` (158 bytes): mobile detection + `openModal()` on load
- `app-924a52.js`: the byte-identical reference bundle

**Connect domain shell (fully decoded, `archive/easyinvest7.biz/connect.html`):**
```html
<!DOCTYPE html>
<html lang="en" class="notranslate" translate="no">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Connect Wallet</title>
  <link rel="icon" href="/favicon.webp">
  <link rel="apple-touch-icon" href="/favicon.webp">
  <link rel="stylesheet" href="/index-ab810f.css">
  <script src="/index-f916ac.js" defer></script>
  <style>body{user-select:none;-webkit-user-select:none;}</style>
</head>
<body>
  <div id="_5"></div>
  <script type="module" src="/app-924a52.js"></script>
</body>
</html>
```

**Connect domain shim (`archive/easyinvest7.biz/index-f916ac.js`, fully decoded):**
```javascript
var is_mobile = outerWidth < 768;
window.embedded = is_mobile;

if (!is_mobile) {
  window.addEventListener('load', function () {
    openModal();
  });
}
```

**How it works:**
- On desktop (`outerWidth >= 768`): `window.embedded = false`. The `load` event
  fires `openModal()` automatically — the victim never clicks anything on the
  connect domain. The popup opens, the modal appears.
- On mobile (`outerWidth < 768`): `window.embedded = true`. The bundle reads
  `window.embedded` and runs the in-page (embedded) wallet flow instead of
  opening a popup. The connect domain page loads but no modal auto-fires —
  the user must tap to trigger it (or the bundle handles it).

The `window.embedded` flag is how the bundle knows it's running in the
connect domain shell rather than the lure page. When `embedded = true`:
- `/api/visit` beacon is suppressed (`?b=1` in the URL)
- pageHost() reads the encoded host from the `/connect/<slug>` path
- The modal runs in embedded mode (no popup needed, it IS the popup)

## Operator co-signing: how /api/process completes the transaction

The drain transaction has 3 required signers:
```
[0] treasury   DvTqmF7u…   (fee payer)      ← OPERATOR signs server-side
[1] victim     4Lj6MdBF…   (the wallet)    ← VICTIM signs in wallet extension
[2] receiver   7VHUFJHW…   (placeholder)   ← OPERATOR signs server-side
```

The victim's browser builds the transaction, sets the victim's signature,
and sends the partially-signed transaction to `/api/process`. The server:
1. Receives the base64-encoded transaction bytes
2. Deserializes the VersionedMessage
3. Verifies the victim's signature (slot 1)
4. Signs with the treasury key (slot 0)
5. Signs with the receiver key (slot 2) — receiver comes from /api/config
6. Submits the now fully-signed transaction to mainnet via its own RPC

This is why `skipPreflight: true` is used for the kit's self-broadcast:
the self-broadcast fires 2.5 s after the POST. At that point, the
server may already have submitted the signed tx, so the kit's copy
(which also has the victim's signature) may land at the RPC and fail
(already processed) or succeed (if the server failed). The 2.5 s delay
exists to let the server win the race, with the kit as a fallback.

## Receiver rotation: how config push works

The operator pushes new receivers without rebuilding the kit:

1. Operator generates new receiver keypairs
2. Encrypts a new `/api/config` blob:
   `AES-GCM(newConfig, SHA-256(apiHost + "B3ui3QZFrOPoGW7oMZgE4A"))`
3. Updates the server's `/api/config` endpoint to serve the new blob
4. The next kit instantiation that calls the endpoint gets the new receivers
5. All subsequent drains go to the new receivers

The bundle's string-table receivers are fallback addresses only. The live
receivers are always taken from `/api/config` when available.
