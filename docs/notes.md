# Misc Notes

Working notes that don't fit neatly into other documents.

---

## Cloudflare Configuration Pattern

Lure domains consistently use a Cloudflare managed challenge on `/` and all
`assets/` paths. The `_nuxt/` path tree is exempt from the challenge,
allowing assets to be served without bot verification. This is a standard
Nuxt deployment config — the asset exemption is not kit-specific, but it
creates a consistent bypass path for capture.

Observed Ray IDs from the 2026-11-14 session:
`a5a8b01b0cba21eb`, `a5a8b0a05856df73`, `a5a8b0ed0c0e42b9`, `a5a8b0ed3e71822d`

---

## Bundle Obfuscation Strategy

JS-Confuser with the following transforms applied (inferred from deobfuscation
pass output):

- **Control flow flattening**: 29 while-switch loops; each linearized to
  sequential blocks during deobfuscation.
- **String table**: all string literals replaced with indexed lookups into a
  global array. 1,090 lookups resolved.
- **Constant folding**: arithmetic and boolean constants replaced with
  function calls. 32,156 inlined.
- **Identifier renaming**: all names replaced with CJK characters or short
  sequences. 559 global-name calls resolved.
- **Dead code**: `峟()` noop inserted throughout. 3,219 unwrapped.
- **`with()` statements**: 190 removed.

The CJK identifier names (`腣`, `夾`, `捿`, `餢`, etc.) are consistent across
all bundle captures — they are part of the JS-Confuser output, not a separate
per-deploy obfuscation layer.

---

## Self-Broadcast Fallback

The 2500ms delay before the kit's own RPC broadcast is a reliability measure —
not a timing attack. It gives the operator's server enough time to broadcast
first (the server's broadcast lands ~1200ms after `/api/process` based on
observed timings). The self-broadcast fires even if the server already
succeeded; the second `sendTransaction` with an already-confirmed transaction
is a no-op on the RPC side.

---

## Affiliate Campaign Tags

Marker instruction (disc 0x00) format: ASCII string written permanently to
chain, e.g. `"1kd1mz4r-|1|"`. The structure is `<affiliate_id>-|<campaign_number>|`.
Every transaction from a given affiliate deployment writes the same tag, creating
a permanent on-chain ledger of drain activity per affiliate. This is the operator's
accountability mechanism for revenue splits.

---

## Helius API Keys

4 API keys are embedded in the bundle string table and used as the first four
RPC endpoints. These are production keys associated with the kit operator's
Helius account. They are exposed to any visitor who can inspect the bundle.

Keys: `0b9f580f-…`, `2dfa2086-…`, `3a1ca16d-…`, `777d85c0-…`

---

## Token-2022 Handling

The kit handles both SPL Token and Token-2022 token accounts. For Token-2022
accounts with the TransferFee extension, the kit uses `TransferCheckedWithFee`
(disc 0x1a) instead of the standard `Transfer` instruction. Fee amounts are
calculated from the extension data fetched via the Solflare portfolio API.
See `data/core/chain/tokens.js` for the full implementation.

---

## Stake Account Handling

The kit attempts to drain native Stake accounts that are in `inactive` or
`deactivating` state (withdrawable without a cool-down). Active or activating
stake accounts are skipped. Stake amounts are fetched via the Solflare v2
stake endpoint. 23 stake pool addresses are hard-coded as reference points
for pool-staked SOL detection.
