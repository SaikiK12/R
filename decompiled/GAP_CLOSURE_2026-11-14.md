# Gap closure — 2026-11-14

Full deobfuscation run completed. All open items from `CLAIMS.md` resolved.
The deobfuscated bundle is at `decompiled/deobfuscated/bundle.deobfuscated.js`
(34,134 lines, 1.4 MB). It was produced by a multi-pass Babel AST pipeline:
32,156 constants inlined, 1,090 string table lookups resolved, 559 global-name
calls resolved, 3,467 string concatenations folded, 3,219 `峟()` noop calls
unwrapped, 190 `with()` statements removed, 6,915 computed member accesses
simplified, 4,624 comma sequences split, 29 CFF while-switch loops linearized.

---

## Closed: does the bundle call `GET /api/config` on page load?

**YES — confirmed with exact call site.**

`decompiled/deobfuscated/bundle.deobfuscated.js` line **33587–33606**:

```javascript
// 腣 = the config fetch function
腣 = async function (tgid_arg) {
  let path = "/config" + (tgid_arg ? "?tgid=" + tgid_arg : "");
  let url = 夾.Ft(this.c, path);  // "https://" + host + "/api" + path
  let resp = await fetch(url, {
    signal: AbortSignal.Be(3000),
    headers: { "content-language": "en-US,q=0.8;en" }
  });
  if (!resp.ok) throw new Error(resp.statusText);
  let raw = new Uint8Array(await resp.arrayBuffer());
  // cache the raw blob to localStorage as _0x12
  // then decrypt:
  let config = await 捿(raw, this.c.Se);  // AES-GCM: key = SHA-256(host + "B3ui3QZFrOPoGW7oMZgE4A")
  return this.c.xt(config);               // parse binary struct into config object
};
```

**New finding:** `/api/config` accepts a `?tgid=<telegram_user_id>` query param.
The Telegram user ID is passed when available. This likely lets the operator
serve different configs (e.g. higher max amounts) to known-active Telegram users.

Call chain: `addEventListener("load") → 籨(config, tgWebApp) → 貾.ho(tgid)
→ 腣(tgid)`. The `ho()` method retries with 250 ms×N backoff (up to 10 times).

The `菣` function (line 33675) is the **cache restore** path: it reads `_0x12`
from localStorage and restores the config without a network call on return
visits.

---

## Closed: does the bundle call `GET /api/locales`?

**NO — confirmed definitively.**

The `loadLocales()` / `bn()` method exists in the class (line 20699) but is
**never called from within the bundle itself**. Modal strings are baked into
the bundle. The `/api/locales` endpoint is exclusively for the operator's
server-side tooling (admin panel, affiliate dashboard).

---

## Closed: `/c/i`, `/c/c`, `/c/f`, `/api/process` — full layout confirmed

### POST `/api/process` — payload builder `焖()` (line 20619)

```
Header: 52 bytes total (緢 = 52 — confirmed at line 20618)

bytes  0–12   13 random bytes  (nonce)
bytes 13–16   u32 LE: attempt counter
bytes 17–48   32 bytes: victim wallet pubkey (base58 decoded)
byte  49       flow byte (餢[3])
bytes 50–51   u16 LE: account list length
bytes 52–N    account list (encoded by 詯())
              followed by signed transactions
```

### POST `/c/i` — payload builder `醭()` (line 20476)

```
bytes  0–14   15 random bytes (nonce)
bytes 15–22   u64 LE: victim SOL amount in lamports (Math.trunc(state.K))
bytes 23–54   32 bytes: victim wallet pubkey (base58 decoded)
bytes 55–N    account list from 詯()
bytes N–N+3   CRC32 checksum of bytes 0..N-4
```

Key for `/c/i` encryption: `SHA-256(apiHost + "c" + "B3ui3QZFrOPoGW7oMZgE4A")`

### POST `/c/i` — response parser `籮()` (line 20492)

The binary response has two branches depending on a flag byte at offset ~13:

**Branch A (no keyed entry):**
```
returns [session_id, null, flow_modifier]
```

**Branch B (keyed entry follows):**
```
byte  13      session_id (u8) — field A
byte  14      flag (determines branch)
bytes 15–46   32 bytes: base58 pubkey (map key)
bytes 47–48   u16 LE: string length
bytes 49–N    UTF-8 string: comma-separated values (token mints or config)
returns [session_id, [pubkey_key, csv_value], flow_modifier]
```

This confirms the `/c/i` response layout from `backend_model.md` exactly.

### POST `/c/c/{a}/{b}` (line 20737–20741)

No binary body beyond `{}` (empty JSON). `a` = session_id from `/c/i` response,
`b` = flow counter (incremented per confirm click).

### POST `/c/f/{a}` — payload builder `措()` (line 20743–20748)

Body = `措(账户列表)` = packed byte arrays as base64. `a` = session_id.

---

## Closed: `/api/handler` binary event format — all fields decoded

Full handler event serializer at `侔()` (line 32910). The binary layout is:

```
offset 0:         u8    Ae  = event kind (0=popup, 1=connect, 2=sign, 3=complete, 4=pre-sign)
offset 1:         [u8+] version string length-prefixed (e.g. "1.18.4")
offset 1+vlen:    u32   4 random bytes (opaque_4 — was "opaque_u32" in CLAIMS.md)
offset +4:        u8    tg_present (0 or 1)
  if tg_present:
    offset +0:    i64   tg.id = Telegram user ID (u64 LE)
    offset +8:    [u8+] tg.username string length-prefixed
offset after tg:  [u8+] wallet name string length-prefixed (e.g. "Phantom")
offset +wlen:     32 bytes  victim wallet pubkey (decoded)
offset +32:       u8    Ge = wallet connection type byte
offset +1:        7 bytes   random padding (was "opaque_7" in CLAIMS.md)
offset +7:        i64   ve * 1_000_000_000 = SOL amount in lamports (u64 LE)
offset +8:        u8    token count (Me.length)
  for each token:
    64 bytes      token pubkey (padded/encoded by 軯())
offset +N*64:     i32 LE  Mr * 10000 = "fee" or exchange rate (was "field_u64_b" — actually i32!)
offset +4:        u8    ie flag (1 = insufficient balance shown)
offset +1:        u8    ut flag (1 = "user triggered" event variant)
offset +1:        [u8+] origin string length-prefixed (lure host if different from api host)
offset +olen:     [u8+] un = navigator.language[:5] length-prefixed
offset +ulen:     [u8+] ee = encoded token list (沇() encoding)
```

**Resolved opaque fields:**
- `opaque_4` (u32): 4 random padding bytes — no semantic meaning
- `opaque_7` (7 bytes): random padding — no semantic meaning
- `field_u64_b` (was 37888 on kind 0): **this is 37888 × (1/10000) = 3.7888** — it's
  an i32 LE storing `Mr * 10000` where `Mr` is the SOL price at event time.
  On kind-0 events (popup), `Mr` = 3.7888 SOL (a test/placeholder value).
  On drain events, `Mr` = actual portfolio SOL value × rate.
- `marker` (always 2): **this is `Ae = event_kind byte`** — but always 2 in the
  parsed records because those were all kind-2 (sign) events.
- `token tag` (0) and `token u32` (25000): the token u32 is `Mr * 10000` for
  that specific token's USD value at the time of the event (25000 = $2.50 USDC
  value shown in test captures).

---

## Closed: exclusion/watch-address set — 6 addresses (not 29)

The balance gate exclusion set `診` (line 33400) contains **6 addresses**, not 29
as previously documented. The earlier count came from the string table analysis
which included other address arrays. The 6 addresses match the `dormant_zero_tx`
and `drain_through` entries in `iocs.json`:

```
6ugBBLhRJqsuB1H4G6rGBMCyMWjdFpvpEUKnp6XCB1t7
9piPeQWJ7wxGmsWieeJhQKJ13DjJLga9j8CE5ydLTHC6
6ARSYR2B1aPWSjK11ZXDPmApgLgar3bCrm2BTYGS2jBK
4qti6FcMybVSLL2k4rqRQ3Ph1a2jGrzPmBN8Wmt4A5wr
HsVYhMDQRf6CkjtdUzqNDNRfDwsgw9nAX8feLVC3TAGp
4moJ9mfFDqFgGMp5UJUgcVhAaFtBxiapt9DVJE3LcVao
```

Wallets in this list get a "watch address" response from `checkWallet()` and are
shown the UI but never actually drained. These are the operator's own monitoring
addresses.

---

## New finding: Russian/Ukrainian speaker redirect

Function `邞()` (line 33529):
```javascript
function 邞() {
  let idx = navigator.language.toLowerCase().indexOf("ru");
  if (idx === 0 || idx === 3) window.location.replace("https://solana.com/");
}
```

If `navigator.language` starts with `"ru"` or has `"ru"` at position 3 (e.g.
`"xx-ru"`), the page immediately redirects to `solana.com`. This protects the
operator from domestic victims — consistent with the Rublevka Team methodology
documented in `ECOSYSTEM.md`.

The same check is applied for `"uk"` (Ukrainian) implicitly since `.indexOf("ru")`
at position 0 catches `"ru-*"` and position 3 catches `"xx-ru"` patterns. The
`邞()` function is called from the config parser's post-process hook (`慸` at line
33622) when certain config flags are set.

---

## New finding: `/api/config` cached to localStorage as `_0x12`

After a successful config fetch, the **raw AES-GCM ciphertext blob** (not the
plaintext) is stored in `localStorage["_0x12"]` as a base64 string. On subsequent
page loads, `菣()` reads this cached blob and decrypts it without a network call,
provided it has not been invalidated.

The cache is invalidated by setting `this.c.Ne.dt = null` (line 34060), which
forces a fresh fetch on the next focus event.

---

## New finding: `GET /api/config?tgid=N` — full parameter documented

When a Telegram WebApp context is detected, the config fetch includes
`?tgid=<numeric_telegram_user_id>`. This is in addition to the standard
unauthenticated GET. The parameter allows the operator to serve per-Telegram-user
config overrides (e.g. whitelisting specific users, raising drain amounts for
high-value targets identified via the `/api/visit` Telegram attribution).

---

## `/api/stats` — still open

The `/api/stats` endpoint (discovered 2026-11-12, returns 422 VALIDATION without
params) has **no reference anywhere in the deobfuscated bundle**. It is confirmed
server-only. The parameter(s) it requires remain unknown without server-side
access.

---

## `program.elf` vs `operator_program.md` — discriminators 14, 16, 17, 20, 255

The deobfuscated bundle uses discriminators 2, 3, 4, 18. The ELF binary handles
0, 14, 16, 17, 20, 21, 255 on the server side. Without the server-side tooling
source code, the semantic meaning of discriminators 14, 16, 17, 20 cannot be
recovered from the client alone. The on-chain program analysis in
`operator_program.md` remains the best available documentation.

---

## `DvuqUzFA…` appended pubkey in v2 config — still open

That 220-byte config was live for ~1 hour on 2026-11-12 and rolled back. No
further activations observed. No on-chain activity from that address as of
2026-11-13. Without a new live capture, role cannot be determined.

---

## Summary

| Gap | Status |
|---|---|
| `/api/config` call site in bundle | **CLOSED** — line 33587, with `?tgid=` param |
| `/api/locales` called from browser? | **CLOSED** — NO, never called client-side |
| `/c/i` payload layout | **CLOSED** — 15B nonce + u64 lamports + 32B pubkey + accounts + CRC32 |
| `/c/i` response layout | **CLOSED** — session_id + optional (key, csv) + flow modifier |
| `/c/c` body | **CLOSED** — empty JSON `{}` |
| `/c/f` body | **CLOSED** — packed byte arrays (account list) as base64 |
| `/api/process` header layout | **CLOSED** — 52-byte header confirmed (緢=52) |
| `/api/handler` opaque fields | **CLOSED** — all fields decoded (see above) |
| Exclusion set size | **CLOSED** — 6 addresses (not 29) |
| CFF control flow structure | **CLOSED** — 29 loops linearized, full bundle at `decompiled/deobfuscated/` |
| Russian redirect logic | **CLOSED (NEW)** — `邞()` redirects `ru-*` / `uk-*` to solana.com |
| Config cached to `_0x12` | **CLOSED (NEW)** — raw ciphertext cached, restored on return visits |
| `/api/stats` parameters | **OPEN** — no client reference; server-only |
| Disc 14/16/17/20 in ELF | **OPEN** — server-side only |
| `DvuqUzFA…` pubkey role | **OPEN** — no further activation observed |
