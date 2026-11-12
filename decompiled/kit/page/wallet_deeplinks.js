/**
 * Wallet deep-link construction for mobile flows.
 *
 * On mobile the kit cannot open a popup. Instead it redirects the
 * victim's browser directly into the target wallet's in-app browser
 * via a deep-link URL. Each wallet has three pieces of information:
 *
 *   1. appId       — the mobile app bundle/package ID (for app-store checks)
 *   2. downloadUrl — where to send the victim if the wallet is not installed
 *   3. deepLink    — the scheme:// or https:// link that opens the dApp
 *                    inside the wallet's in-app browser
 *
 * Where a wallet supports a "universal link" fallback (https://), the
 * kit prefers the scheme deep-link and falls back to the universal link.
 * The dApp URL encoded into the deep-link is the connect-domain URL
 * (the same ?b=1 URL the popup would open).
 *
 * === Deep-link construction ===
 *
 * The kit builds the final deep-link as:
 *   deepLink + encodeURIComponent(connectUrl)
 * OR (for wallets that use a different param name):
 *   deepLink + connectUrl      (no encoding, some schemes)
 *
 * === Chrome nag ===
 *
 * On Android, if the browser is not Chrome, the kit alerts the victim
 * [getString(180)]: "Please open this page in Chrome to continue with <walletName>"
 * before attempting the deep-link, because many deep-link schemes only
 * work from Chrome's intent handler on Android.
 *
 * === Complete wallet table extracted from the string table ===
 *
 * Each entry: [index_in_string_table, appId, downloadUrl, deepLink]
 * SVG icon data between entries omitted for readability.
 *
 * SOLANA-SPECIFIC wallets (the drainer's primary targets):
 */

const WALLET_TABLE = [
  // --- Solflare [205–208] ---
  {
    name: "Solflare",
    appId:       "com.solflare.mobile",        // [205]
    downloadUrl: "https://www.solflare.com/download/",  // [206]
    deepLink:    "solflare://ul/v1/",           // [207]
    deepLinkAlt: "https://solflare.com/ul/v1/", // [208]
    // path appended: "browse/" [209] + encodeURIComponent(connectUrl)
  },

  // --- Phantom [215–217] ---
  {
    name: "Phantom",
    appId:       null,  // iOS: id6753543895; Android: com.phantom
    downloadUrl: "https://phantom.com/download",   // [215]
    deepLink:    "phantom://",                     // [216]
    deepLinkAlt: "https://phantom.app/ul/",        // [217]
  },

  // --- Backpack [220–223] ---
  {
    name: "Backpack",
    appId:       "app.backpack.mobile",             // [220]
    downloadUrl: "https://backpack.app/download",   // [221]
    deepLink:    "backpack://ul/browse/",           // [222]
    deepLinkAlt: "https://backpack.app/ul/v1/browse/", // [223]
  },

  // --- Coinbase Wallet [227–229] ---
  {
    name: "Coinbase Wallet",
    appId:       null,
    downloadUrl: "https://www.coinbase.com/wallet/downloads", // [227]
    deepLink:    "cbwallet://dapp?url=",            // [228]
    deepLinkAlt: "https://go.cb-w.com/dapp?cb_url=", // [229]
  },

  // --- Trust Wallet [367–370] ---
  {
    name: "Trust Wallet",
    appId:       "com.wallet.crypto.trustapp",   // [367]
    downloadUrl: "https://trustwallet.com/download", // [368]
    deepLink:    "trust://",                     // [369]
    deepLinkAlt: "https://link.trustwallet.com/", // [370]
    // Trust uses "open_url?coin_id=501&url=" [371] for Solana dApps
    solanaDeepLink: "trust://open_url?coin_id=501&url=", // [371]
  },

  // --- Bitget Wallet (BitKeep) [378–381] ---
  {
    name: "Bitget Wallet",
    appId:       "com.bitkeep.wallet",           // [378]
    downloadUrl: "https://web3.bitget.com/wallet-download", // [379]
    deepLink:    "bitkeep://bkconnect?action=dapp&url=", // [380]
    deepLinkAlt: "https://bkcode.vip/?action=dapp&url=", // [381]
  },

  // --- Exodus [388–391] ---
  {
    name: "Exodus",
    appId:       "exodusmovement.exodus",        // [388]
    downloadUrl: "https://www.exodus.com/download/", // [389]
    deepLink:    "exodus://web3",                // [390]
    deepLinkAlt: "https://exodus.com/m/web3",   // [391]
  },

  // --- SafePal [394–397] ---
  {
    name: "SafePal",
    appId:       "io.safepal.wallet",            // [394]
    downloadUrl: "https://www.safepal.com/download?product=2",
    deepLink:    "safepalwallet://web3",         // [396]
    deepLinkAlt: "https://link.safepal.io/web3", // [397]
  },

  // --- OKX Wallet [403–405] ---
  {
    name: "OKX Wallet",
    appId:       null,
    downloadUrl: "https://web3.okx.com/download",
    deepLink:    "okx://wallet/dapp/url?dappUrl=", // [404]
    deepLinkAlt: "https://www.okx.com/download?deeplink=", // [405]
  },

  // --- Magic Eden Wallet [412–415] ---
  {
    name: "Magic Eden",
    appId:       "com.magiceden.wallet",         // [412]
    downloadUrl: "https://wallet.magiceden.io/download", // [413]
    deepLink:    "magiceden://",                 // [414]
    deepLinkAlt: "https://wallet.magiceden.io/", // [415]
  },

  // --- Math Wallet [423–426] ---
  {
    name: "Math Wallet",
    appId:       "com.mathwallet.android",       // [423]
    downloadUrl: "https://mathwallet.org/",      // [424]
    deepLink:    "mathwallet://navigate?url=",   // [425]
    deepLinkAlt: "https://www.mathwallet.org/navigate?url=", // [426]
  },

  // --- Coin98 [433–435] ---
  {
    name: "Coin98",
    appId:       "coin98.crypto.finance.media",  // [433]
    downloadUrl: "https://coin98.com/wallet",    // [434]
    deepLink:    "coin98://dapp?url=",           // [435]
  },

  // --- MetaMask [441–443] (EVM only but included in modal) ---
  {
    name: "MetaMask",
    appId:       null,
    downloadUrl: "https://metamask.io/download", // [441]
    deepLink:    "dapp://",                      // [442]
    deepLinkAlt: "https://metamask.app.link/dapp/", // [443]
  },

  // --- Brave Wallet [449–451] ---
  {
    name: "Brave Wallet",
    appId:       "com.brave.browser",            // [449]
    downloadUrl: "https://brave.com/download/",  // [450]
    deepLink:    "brave://",                     // [451]
  },

  // --- Bybit Web3 [456–458] ---
  {
    name: "Bybit Web3",
    appId:       null,
    downloadUrl: "https://www.bybit.com/en/web3", // [456]
    deepLink:    "bybitapp://",                   // [457]
    deepLinkAlt: "https://app.bybit.com/inapp",  // [458]
  },

  // --- Zerion [464–466] ---
  {
    name: "Zerion",
    appId:       "io.zerion.android",            // [464]
    downloadUrl: "https://zerion.io/download",   // [465]
    deepLink:    "zerion://browser?url=",        // [466]
  },

  // --- Kraken Wallet [472–474] ---
  {
    name: "Kraken Wallet",
    appId:       "com.kraken.superwallet",       // [472]
    downloadUrl: "https://www.kraken.com/wallet",// [473]
    deepLink:    "krakenwallet://",              // [474]
  },

  // --- Glow [477–479] ---
  {
    name: "Glow",
    appId:       "com.luma.wallet.prod",         // [477]
    downloadUrl: "https://glow.app/download",    // [478]
    deepLink:    "glow://",                      // [479]
  },

  // --- Jupiter Mobile [488–490] ---
  {
    name: "Jupiter",
    appId:       "ag.jup.jupiter.android",       // [488]
    downloadUrl: "https://jup.ag/mobile",        // [489]
    deepLink:    "jup://browse/",                // [490]
  },

  // --- Binance Web3 [492–494] ---
  {
    name: "Binance Web3",
    appId:       null,
    downloadUrl: "https://www.binance.com/download", // [492]
    deepLink:    "bnc://app.binance.com/cedefi/",    // [493]
    deepLinkAlt: "https://app.binance.com/cedefi",  // [494]
  },

  // === FAKE / OPERATOR-CONTROLLED WALLETS ===
  // These appear in the modal but are not real wallets.
  // They route to operator-controlled or underground URLs.

  // --- OnlyBulls Wallet [967–970] ---
  // Fake wallet. Deep-links to "onlybulls://wallet" / "https://onlybulls.com"
  {
    name: "OnlyBulls Wallet",                   // [967]
    appId:       "com.askroi.onlybulls",         // [970]
    downloadUrl: "https://onlybulls.com",        // [969]
    deepLink:    "onlybulls://wallet",           // [968]
    note: "FAKE: operator-controlled wallet. Not a real wallet.",
  },

  // --- React Wallet / "Volsungar" [974–975] ---
  // Also fake: routes to reactwalletback.com/app-link/
  {
    name: "React Wallet",                        // unnamed in strings
    appId:       "com.react.wwallett",           // [975]
    downloadUrl: "https://reactwalletback.com/app-link/", // [974]
    note: "FAKE: operator-controlled wallet. reactwalletback.com",
  },

  // --- SOC Wallet [980] ---
  {
    name: "SOC Wallet",
    appId:       "com.socwallet.socjsc",
    deepLink:    "socwallet://",                 // [980]
    note: "FAKE: operator-controlled wallet.",
  },

  // --- Volsungar [985–987] ---
  {
    name: "Volsungar",
    appId:       "com.volsungar.wallet",         // [987]
    downloadUrl: "https://link.volsungar.com/wc",// [986]
    deepLink:    "volsungar://",                 // [985]
    note: "FAKE: operator-controlled wallet.",
  },

  // --- Hero Wallet [990–991] ---
  {
    name: "Hero",
    appId:       null,
    downloadUrl: "https://wallet.hero.io/signin/wc", // [991]
    deepLink:    "herowallet://wc",              // [990]
    note: "FAKE: operator-controlled wallet. herowallet://wc",
  },

  // --- dlicom [976–977] ---
  {
    name: "dlicom",
    appId:       "com.shlenpower.dlicom",        // [977]
    downloadUrl: "https://dlicom.me",            // [976]
    note: "FAKE: operator-controlled wallet.",
  },
];

/**
 * buildDeepLink(wallet, connectUrl):
 *   Returns the full deep-link URL to open the connect page inside the
 *   given wallet's in-app browser.
 *
 *   For most wallets: deepLink + encodeURIComponent(connectUrl)
 *   For Trust Wallet (Solana): solanaDeepLink + encodeURIComponent(connectUrl)
 *   For scheme-only links (e.g. glow://): deepLink + "browse/" + encodeURIComponent(connectUrl)
 */
function buildDeepLink(wallet, connectUrl) {
  if (wallet.solanaDeepLink) {
    return wallet.solanaDeepLink + encodeURIComponent(connectUrl);
  }
  return (wallet.deepLink ?? wallet.deepLinkAlt) + encodeURIComponent(connectUrl);
}

/**
 * getAppStoreUrl(wallet):
 *   Returns the App Store or Play Store URL for a wallet.
 *   getString(181) = "https://apps.apple.com/app/"
 *   getString(182) = "https://play.google.com/store/apps/details?id="
 *
 *   iOS:     "https://apps.apple.com/app/" + appId (or the iOS id)
 *   Android: "https://play.google.com/store/apps/details?id=" + appId
 */
function getAppStoreUrl(wallet, platform) {
  if (!wallet.appId) return wallet.downloadUrl;
  if (platform === "ios") {
    return "https://apps.apple.com/app/" + wallet.appId;
  }
  return "https://play.google.com/store/apps/details?id=" + wallet.appId;
}
