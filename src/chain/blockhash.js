'use strict';
// Blockhash cache and staleness detection (姾/信/屭/德, deob lines 21286-21304)
// getLatestBlockhash called with commitment:"confirmed"
// Cached for 2500ms. If currentSlot > lastValidBlockHeight → re-fetch.
// BLOCKHASH_WINDOW = 432,000 slots (from constants array)

const { solana } = require('./rpc');
const BLOCKHASH_WINDOW = 432_000;

let _cached = undefined;    // { fe: blockhash, ne: lastValidBlockHeight }
let _pending = undefined;   // in-flight promise
let _fetchedAt = 0;         // Date.now() when last fetched

// 姾(): get (or refresh) the latest blockhash
function getBlockhash() {
  if (_pending) return _pending;
  if (_cached && Date.now() - _fetchedAt < 2500) return Promise.resolve(_cached);
  _pending = solana.getLatestBlockhash({ commitment: 'confirmed' })
    .then(result => {
      _fetchedAt = Date.now();
      _cached = {
        fe: result.value.blockhash,
        ne: result.value.lastValidBlockHeight,
      };
      return _cached;
    })
    .finally(() => { _pending = undefined; });
  return _pending;
}

// 信(): return current cached state
function currentBlockhash() { return _cached; }

// isExpired(currentSlot): true when blockhash window has passed
function isExpired(currentSlot) {
  if (!_cached) return true;
  return currentSlot > _cached.ne;
}

// invalidate(): force next call to re-fetch
function invalidate() { _cached = undefined; _fetchedAt = 0; }

module.exports = { getBlockhash, currentBlockhash, isExpired, invalidate, BLOCKHASH_WINDOW };
