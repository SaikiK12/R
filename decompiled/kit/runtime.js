/**
 * Polyfills installed at startup.
 *
 * Recovered from the reference bundle. "Be" is the bundle's own name for
 * a stand-in of AbortSignal.timeout; the string "timeout" never appears.
 * Analysis reconstruction, not a drop-in script.
 */

// AbortSignal["Be"](ms) -> a signal that aborts after ms milliseconds.
if (AbortSignal["Be"] == null) {
  AbortSignal["Be"] = function timeoutSignal(ms) {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), ms);
    return controller.signal;
  };
}

if (Promise.withResolvers == null) {
  Promise.withResolvers = function withResolvers() {
    const box = {};
    box.promise = new Promise((resolve, reject) => {
      box.resolve = resolve;
      box.reject = reject;
    });
    return box;
  };
}

if (String.prototype.at == null) {
  String.prototype.at = function at(index) {
    if (index < 0) index += this.length;
    return this[index];
  };
}

if (Array.prototype.at == null) {
  Array.prototype.at = function at(index) {
    if (index < 0) index += this.length;
    return this[index];
  };
}
