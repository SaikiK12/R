# Obfuscation Layers — JS-Confuser Analysis

Six-layer obfuscation stack applied to this bundle.
Reverse-engineered from the deobfuscated source.

---

## Layer 1 — Outer `Function()` Wrapper

The entire bundle is wrapped:
```js
globalThis._t54h = import.meta;
Function("拀", "<encodedPayload>")(<argument>);
```

`Function("argName", "body")` constructs a new function at runtime from strings, defeating static analysis tools that parse the source file directly (they see `Function(...)` but can't evaluate it without running the code).

The inner body is itself a giant IIFE that sets up all remaining layers.

---

## Layer 2 — String Table Encoding (1053 entries, custom base64)

All string literals are removed from the code. Instead:
1. An encoded blob is stored as a byte array at the top of the bundle
2. A `getString(n)` / `娨(n)` function decodes entry `n` on first access
3. Results are cached in `strCache` / `餢`

**Custom base64 alphabet** (non-standard, different from RFC 4648):
```
Standard: ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/
Kit:      (see identifier_map.md — +→21, /→9, 0→33, 1→62, etc.)
```

Standard decoders (`atob`, Node `Buffer.from(x, 'base64')`) produce garbage because the alphabet ordering is different. You need the exact char→value mapping from the bundle to decode anything.

**Defeating this layer:**
1. Extract the alphabet from the `壩` / `_fwcFetchAuth` private method (it hardcodes the full 64-char→value mapping)
2. Run `getString(n)` for n = 0..1052 to get all strings
3. All 1053 strings are in `decoded_strings.json` in this repo

---

## Layer 3 — Constants Array (1691 entries)

After string decoding, a second encoding layer stores integer/string constants:
```js
let CONSTS = [];
// populated by calling getString() on the encoded constant table
```

Access pattern: `CONSTS[嬹 + offset]` where `嬹` is a loop-state variable.

The key insight: `CONSTS` entries are accessed via arithmetic offsets from the loop-state variable. E.g. `CONSTS[齢 + 224]` where `齢` is the current loop state. This means the offset is computed at runtime — you need to trace the loop states to know which constant is being accessed.

**Static substitution (what we did):** Replace all `CONSTS[fixedIndex]` with the literal value. 32,156 substitutions were made. References like `CONSTS[嬹+317]` (dynamic offset) remain unresolved — these are only a small fraction.

---

## Layer 4 — CJK Identifier Renaming

Every user-defined identifier (function name, variable, class, parameter) is replaced with a CJK character or sequence:

```
// Before (hypothetical readable form):
function fetchWithAuth(path, params) { ... }
class FakeWalletClient { ... }
const walletAddress = undefined;

// After:
function 锏(嗛,嬹) { ... }
class 听 { ... }
const 搒 = undefined;
```

The names are chosen to:
- Look visually similar (makes manual reading very hard)
- Not have obvious semantic meaning
- Be valid JavaScript identifiers (Unicode letters are legal)

There are 200+ unique CJK identifiers. See `identifier_map.md` for the complete mapping.

---

## Layer 5 — Control-Flow Flattening

Every non-trivial function (and many trivial ones) is converted to a `while(true) { switch(state) {} }` state machine:

```js
// Original (hypothetical):
function doThings(a, b) {
  let x = a + b;
  if (x > 10) return x * 2;
  return x;
}

// After flattening:
function 杍(嗛, 嬹) {
  let 齢 = -44, 槙 = 177;
  while (true) {
    switch (齢 + 槙) {
      case 133:
        let 腓 = 嗛 + 嬹;
        峟(齢 = -55, 槙 = 192);  // 峟 = noop; this is just an assignment
        break;
      case 137:
        if (腓 > 10) { 峟(齢 = 44, 槙 = -37); break; }
        峟(齢 = 11, 槙 = -4);
        break;
      case 7:
        return 腓;
      case 44 + (-37):  // = 7
        return 腓 * 2;
      // ... dozens of unreachable cases (dead code)
    }
  }
}
```

The `switch` values (`133`, `137`, `7`) are computed as `state1 + state2`, making them harder to trace.

Dead `case` branches are inserted throughout — some with complex expressions that evaluate to the same integer as a live case, others with negative integers that the loop never reaches. This dramatically increases the apparent complexity.

**`峟` (noop) role:** Every state transition is wrapped in `峟(assignment1, assignment2, ...)`. Since `峟` is `function(){}`, the comma-expression inside its arguments executes the assignments as side effects before the function is called. This makes the assignments look like function arguments, not state transitions.

---

## Layer 6 — String Splitting + Dead Code

Final micro-obfuscations:
```js
"fetch"           → "fet"+"ch"
"signAllTrans"    → "signAll"+"Trans"
"localStorage"    → "localS"+"torage"
"getRandomValues" → "getRand"+"omValues"
// etc.
```

Combined with dynamic global lookup:
```js
// Instead of: window.fetch(...)
// The bundle uses:
樶("_rsxYy")(...)   // 樶 resolves "_rsxYy" → fetch at runtime
```

The `樶` / `globalRef` function uses a string key → global value mapping stored in a closure, populated at startup by scanning `globalThis`. The key `"_rsxYy"` has no obvious relationship to `fetch` — the mapping is entirely arbitrary.

---

## Deobfuscation Summary

| Layer | Technique | Status |
|-------|----------|--------|
| 1 | Function() wrapper | Unwrapped manually — inner body extracted as `index_body.js` |
| 2 | String encoding | Fully decoded — all 1053 strings in `decoded_strings.json` |
| 3 | Constants array | Mostly decoded — 32,156 fixed references substituted in `deobf_full.js` |
| 4 | CJK renaming | Key identifiers mapped — full table in `identifier_map.md` |
| 5 | Control-flow flattening | Partially resolved — traced key functions; state machines documented |
| 6 | String splitting + globals | Largely resolved by string substitution pass |

**Remaining opacity:** The while/switch state machines inside each function are still present in `deobf_full.js`. Fully decompiling them would require either:
- Running the code in an instrumented environment and tracing execution
- Building a symbolic executor that evaluates the state arithmetic
- Manual line-by-line tracing of each function (the approach used for key functions documented here)

For the purposes of this research, the architecture, all api endpoints, all credentials, and the full execution flow have been reconstructed without needing to fully decompile every function.
