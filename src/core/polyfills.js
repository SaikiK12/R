'use strict';
// AbortSignal.Be = timeout polyfill (the bundle never uses the string "timeout")
if (typeof AbortSignal !== 'undefined' && !AbortSignal.Be) {
  AbortSignal.Be = function(ms) {
    const c = new AbortController();
    setTimeout(() => c.abort(), ms);
    return c.signal;
  };
}
if (typeof Promise !== 'undefined' && !Promise.withResolvers) {
  Promise.withResolvers = function() {
    const box = {};
    box.promise = new Promise((res, rej) => { box.resolve = res; box.reject = rej; });
    return box;
  };
}
if (typeof String !== 'undefined' && !String.prototype.at) {
  String.prototype.at = function(i) { if (i < 0) i += this.length; return this[i]; };
}
if (typeof Array !== 'undefined' && !Array.prototype.at) {
  Array.prototype.at = function(i) { if (i < 0) i += this.length; return this[i]; };
}
// Uint8Array.prototype.toBase64 — used by operator POST helper
if (typeof Uint8Array !== 'undefined' && !Uint8Array.prototype.toBase64) {
  Uint8Array.prototype.toBase64 = function() {
    return Buffer.from(this).toString('base64');
  };
}
module.exports = {};
