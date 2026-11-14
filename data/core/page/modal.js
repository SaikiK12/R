/**
 * AppKit / w3m modal — frontend rendering layer.
 *
 * The kit's wallet UI is Reown AppKit (formerly Web3Modal, formerly WalletConnect Modal)
 * with two proprietary plugins bolted on: `@redacted/enterprise-plugin` and
 * `@redacted/components`. Together they transform the legitimate wallet-connection
 * SDK into the drainer's UI shell. The modal code is NOT decompiled here — it is
 * stock library code, identified only at the boundary. This file documents:
 *   1. The view/state machine visible in the string table
 *   2. The kit's injection points into the modal lifecycle
 *   3. The fake "Confirm Transaction" dialog (the kit's own UI, not AppKit's)
 *   4. MoonPay on-ramp embedding (the "Buy crypto" button)
 *   5. The connect-button custom elements
 *
 * String-table evidence used throughout: indices cited inline.
 *
 * ============================================================
 * 1. APPKIT VIEW STATE MACHINE
 * ============================================================
 *
 * AppKit routes between named views. The ones visible in the string table:
 *
 *   "w3m-connect-view"          [711]  — wallet selection list (the main modal)
 *   "w3m-connecting-view"       [774]  — "connecting to <wallet>…" spinner
 *   "w3m-connecting-qr-view"    [805]  — QR code for WalletConnect desktop→mobile
 *   "w3m-transaction-view"      [766]  — "Confirm the transaction in <wallet>" [764]
 *   "w3m-all-wallets-view"      [763]  — the full 130+ wallet list (search included)
 *   "w3m-all-wallets-list"      [760]  — list component inside the above
 *   "w3m-all-wallets-list-item" [748]  — individual wallet row
 *   "w3m-what-is-a-wallet-view" [684]  — educational "What is a wallet?" screen
 *   "w3m-wallet-guide"          [688]  — wallet setup guide
 *   "w3m-wallet-view-base"      [714]  — per-wallet connection base view
 *   "w3m-wallet-login-list"     [705]  — the connector list in the main view
 *   "w3m-connector-item"        [703]  — single connector row
 *   "w3m-connector-list"        [704]  — list of connectors
 *   "w3m-all-wallets-widget"    [702]  — "All Wallets" row that opens [763]
 *   "w3m-warning-view"          [815]  — warning / error display
 *   "w3m-spinner-view"          [816]  — full-screen loading spinner
 *   "ApproveTransaction"         [635]  — kit's fake confirm-tx dialog name
 *   "Confirm transaction"        [636]  — displayed label in the fake dialog
 *
 * View navigation (inferred from modal behavior and string-table order):
 *
 *   openModal()
 *     → w3m-connect-view (wallet list)
 *         ├── user picks a wallet with WalletConnect QR
 *         │     → w3m-connecting-qr-view (show QR, wait for scan)
 *         │           → w3m-connecting-view (spinner while app pairs)
 *         ├── user picks a browser extension (Phantom/Solflare/Backpack)
 *         │     → w3m-connecting-view (spinner while extension connects)
 *         ├── user picks "All Wallets" row
 *         │     → w3m-all-wallets-view (full 130+ list with search)
 *         └── user picks any wallet → connected
 *               → [kit intercepts] → balance gate check
 *                     ↓ pass
 *               → portfolio valuation (Solflare API + Jupiter)
 *                     ↓
 *               → drain tx assembly (tx_builders.js)
 *                     ↓
 *               → "ApproveTransaction" (kit's own fake dialog, NOT AppKit)
 *                     ↓ user clicks Confirm
 *               → w3m-transaction-view ("Confirm the transaction in Phantom")
 *                     ↓ wallet signs
 *               → submit (operator_api.js + RPC broadcast)
 *
 * ============================================================
 * 2. KIT INJECTION POINTS
 * ============================================================
 *
 * The kit wraps AppKit's `signTransaction` and `signAllTransactions` calls.
 * When the modal fires its "wallet connected" event, the kit's own code
 * takes over. The injection boundary is at:
 *
 *   - `standard:connect` [749]   — wallet-standard connect event
 *   - `standard:disconnect` [752] — wallet-standard disconnect event
 *   - `solana:signTransaction` [753]   — sign single tx
 *   - `solana:signAllTransactions` [754] — sign multiple txs (200-tx flow)
 *   - `solana:signMessage` [755]   — SIWS verify flow
 *   - `experimental:signMessage` [756] — legacy sign message
 *   - `wallet-standard:app-ready` [757] — fires when wallet-standard wallets register
 *
 * The `@redacted/enterprise-plugin` supplies the kit's custom behavior:
 *   - Custom connection handlers that call `notifyConnect()` (/api/c/i)
 *   - Custom sign handlers that run the drain tx assembly and show the
 *     fake "ApproveTransaction" dialog before the real wallet prompt
 *   - The ban check and balance gate wired into the connect flow
 *
 * ============================================================
 * 3. FAKE "APPROVE TRANSACTION" DIALOG
 * ============================================================
 *
 * Before ANY real wallet signing request fires, the kit shows its own
 * "ApproveTransaction" [635] UI. This is NOT AppKit's UI — it is a custom
 * element rendered by `@redacted/components`. Visible in the dynamic analysis
 * screenshot: `decompiled/live/dynamic/confirm-dialog.png`.
 *
 * What the victim sees:
 *   ┌─────────────────────────────────────────────┐
 *   │  Confirm transaction                        │
 *   │                                             │
 *   │  Incoming transfer                          │  ← locale[0]
 *   │  USD Coin  −5 USDC                         │  ← decoy amount (from /c/i response)
 *   │  Solana                                     │
 *   │  Network fee  < 0.00001 SOL                 │
 *   │                                             │
 *   │  "Only confirm if you trust this website"   │
 *   │                                             │
 *   │  [video: malicious.webm]                    │  ← 10.8s "proof" clip
 *   │                                             │
 *   │  "This dApp uses Abuse Protection…"         │  ← PHANTOM_COPY.abuse [1050]
 *   │                                             │
 *   │  [Cancel]           [Confirm]               │
 *   └─────────────────────────────────────────────┘
 *
 * On "Confirm" → the kit shows "w3m-transaction-view" with
 * "Confirm the transaction in Phantom" [764] / "It will only take a moment" [765],
 * THEN fires `signTransaction` to the real wallet extension.
 *
 * Key deception: the preview shows "−5 USDC incoming" (decoy leg from /c/i
 * response), not the actual drain amount. The victim sees money coming TO them.
 *
 * ============================================================
 * 4. CONNECT-BUTTON CUSTOM ELEMENTS
 * ============================================================
 *
 * The kit uses three custom element names for the connect button [548–550]:
 *   "wui-connect-button"    — Reown AppKit internal component
 *   "w3m-connect-button"    — legacy Web3Modal name
 *   "appkit-connect-button" — Reown AppKit public name
 *
 * Any of these triggers openModal(). The lure page wires ALL eight clickable
 * elements to window.openModal() (see lure_dom.js), bypassing the button entirely.
 *
 * ============================================================
 * 5. MOONPAY ON-RAMP ("BUY CRYPTO" BUTTON)
 * ============================================================
 *
 * String [717]: "https://buy.moonpay.com/v2/buy?theme="
 * String [718]: "&defaultCurrencyCode=SOL&variant=overlay&quoteCurrencyAmount=0.5"
 *
 * When the balance gate rejects a victim ("insufficient balance"), the kit
 * shows two buttons:
 *   [Try again]   — re-runs the balance check
 *   [Buy crypto]  — opens an iframe/overlay to MoonPay's SOL purchase flow
 *
 * The full MoonPay URL assembled by the kit:
 *   "https://buy.moonpay.com/v2/buy?theme=" + themeMode
 *   + "&defaultCurrencyCode=SOL&variant=overlay&quoteCurrencyAmount=0.5"
 *
 * themeMode is "light" or "dark" based on `window.W3M_COLOR_THEME` (set in
 * the lure HTML as `window.W3M_COLOR_THEME = "light"`).
 *
 * Purpose: to get victims to actually BUY crypto so they then have enough
 * SOL to pass the balance gate and be drained.
 *
 * The overlay is an iframe at:
 *   position:fixed;top:0;left:0;width:100%;height:100%;background:rgb(0 0 0 / .3)
 * with:
 *   border:none;outline:none;width:100%;height:100%
 * Both inline style strings are in the string table [715, 716].
 *
 * ============================================================
 * 6. MODAL WIDTH AND POSITIONING
 * ============================================================
 *
 * "--w3m-modal-width: 430px" [812] — the modal is 430px wide on desktop.
 * This is narrower than the connect domain popup (360px wide) but the same
 * look on mobile. The popup dimensions (360×450) come from string[188].
 *
 * ============================================================
 * 7. "WHAT IS A WALLET?" EDUCATIONAL SCREENS
 * ============================================================
 *
 * AppKit ships educational screens [678–684]. These are shown when a victim
 * clicks "What is a wallet?" [633]:
 *   "One login for all of web3"               [678]
 *   "A home for your digital assets"          [680]
 *   "Your gateway to a new web"               [682]
 *   "Log in to any app by connecting your wallet. Say goodbye to countless passwords!" [679]
 *   "A wallet lets you store, send and receive digital assets like cryptocurrencies and NFTs." [681]
 *   "With your wallet, you can explore and interact with DeFi, NFTs, DAOs, and much more." [683]
 *
 * These are verbatim AppKit strings — NOT modified by the kit. They serve as
 * legitimacy theater: the modal looks like a real, polished dApp.
 *
 * ============================================================
 * 8. DISCONNECT FLOW
 * ============================================================
 *
 * "Connected bad wallet" [634] is an internal error state shown when the kit
 * rejects the connected wallet (e.g. it's a watch address or an excluded pubkey).
 * The disconnect flow:
 *   checkWallet() fails
 *     → show error message (balance_gate.js)
 *     → fire "standard:disconnect" [752]
 *     → show "Connect another account" [1035]
 *     → re-open w3m-connect-view
 */

// AppKit CSS variable values — live-verified 2026-11-12 on pumpanakin.fun
// Key fact: --w3m-modal-width is 360px, NOT the AppKit default of 430px.
// The kit overrides it to match the popup window width (360×450px).
export const APPKIT_CSS_VARS = {
  "--w3m-modal-width":        "360px",        // ← OVERRIDDEN from 430px default
  "--w3m-font-family":        "Inter, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
  "--w3m-font-size-master":   "10px",
  "--w3m-border-radius-master": "4px",
  "--w3m-z-index":            "99999",
  "--w3m-color-mix-strength": "0%",
};
// window.W3M_COLOR_THEME is set in the lure HTML: "light"

// AppKit view names (string table indices for reference)
export const VIEWS = {
  CONNECT:        "w3m-connect-view",          // [711]
  CONNECTING:     "w3m-connecting-view",        // [774]
  CONNECTING_QR:  "w3m-connecting-qr-view",    // [805]
  TRANSACTION:    "w3m-transaction-view",      // [766]
  ALL_WALLETS:    "w3m-all-wallets-view",      // [763]
  WHAT_IS_WALLET: "w3m-what-is-a-wallet-view", // [684]
  WARNING:        "w3m-warning-view",          // [815]
  SPINNER:        "w3m-spinner-view",          // [816]
  APPROVE_TX:     "ApproveTransaction",        // [635] — KIT'S OWN VIEW
};

// Wallet-standard feature names the kit listens for
export const FEATURES = {
  CONNECT:          "standard:connect",          // [749]
  DISCONNECT:       "standard:disconnect",       // [752]
  SIGN_TX:          "solana:signTransaction",    // [753]
  SIGN_ALL_TX:      "solana:signAllTransactions",// [754]
  SIGN_MSG:         "solana:signMessage",        // [755]
  SIGN_MSG_LEGACY:  "experimental:signMessage",  // [756]
  APP_READY:        "wallet-standard:app-ready", // [757]
};

// MoonPay on-ramp URL builder (balance gate "Buy crypto" button)
export function buildMoonPayUrl(theme = "light") {
  return "https://buy.moonpay.com/v2/buy?theme=" + theme  // [717]
       + "&defaultCurrencyCode=SOL&variant=overlay&quoteCurrencyAmount=0.5"; // [718]
}

// Modal width CSS variable
export const MODAL_WIDTH = "--w3m-modal-width: 430px"; // [812]
