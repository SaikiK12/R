/**
 * Wallet deep-link table — extended entries (string indices 817–940).
 *
 * This file documents the remaining 30+ wallets visible in the string table
 * that were not covered in wallet_deeplinks.js. Combined, the kit's modal
 * offers 60+ wallet options, covering essentially every Solana and EVM wallet
 * in active use as of late 2026.
 *
 * String indices are cited inline. All entries follow the same pattern:
 *   name, appId, downloadUrl, deepLink, deepLinkAlt (if any)
 *
 * === Why so many wallets? ===
 *
 * The AppKit / @redacted/components modal dynamically fetches the wallet list
 * from AppKit's registry API. The string table captures all wallets that were
 * active at the time of the kit build. Having 60+ wallets in the modal:
 *   1. Makes the modal look like a real, well-maintained dApp
 *   2. Ensures coverage of any wallet the victim might have installed
 *   3. Provides deep-links for maximum reach on mobile
 */

const EXTENDED_WALLET_TABLE = [
  // --- Fireblocks [817–818] ---
  {
    name: "Fireblocks",
    appId: "com.fireblocks.client",   // [818]
    deepLink: "fireblocks-wc://",     // [817]
    note: "Institutional wallet — rarely a retail victim; included for completeness",
  },

  // --- Ledger Live [819] ---
  {
    name: "Ledger Live",
    deepLink: "ledgerlive://",        // [819]
    note: "Hardware wallet companion app; will reject unsigned tx",
  },

  // --- Best Wallet [820–821] ---
  {
    name: "Best Wallet",
    appId: "com.bestwallet.mobile",   // [821]
    deepLink: "bw://app/connect",    // [820]
  },

  // --- Crypto.com Onchain [822–824] ---
  {
    name: "Crypto.com Onchain",        // [822]
    appId: null,
    deepLink: "dfw://",               // [823]
    deepLinkAlt: "https://wallet.crypto.com/deeplink", // [824]
  },

  // --- 1inch Wallet [825–827] ---
  {
    name: "1inch Wallet",
    appId: "io.oneinch.android",      // [827]
    deepLink: "oneinch://open/nobodywilleveruseit",    // [825]
    deepLinkAlt: "https://wallet.1inch.io/app/nobodywilleveruseit", // [826]
    note: "Deep-link path 'nobodywilleveruseit' is unusual — appears to be a placeholder from AppKit's test suite that was never updated",
  },

  // --- Trezor [828] ---
  {
    name: "Trezor",
    deepLink: "https://connect.trezor.io/9/deeplink/", // [828]
    note: "Hardware wallet; signing requires physical button press",
  },

  // --- Blockchain.com Wallet [829–831] ---
  {
    name: "Blockchain.com",
    appId: "piuk.blockchain.android", // [831]
    downloadUrl: "https://login.blockchain.com/app", // [830]
    deepLink: "blockchain-wallet://", // [829]
  },

  // --- Arculus [832–833] ---
  {
    name: "Arculus",
    appId: "co.arculus.wallet.android", // [833]
    deepLink: "arculuswc://",           // [832]
  },

  // --- CTRL Wallet [834–835] ---
  {
    name: "CTRL Wallet",
    appId: null,
    deepLink: "ctrl-mobile://",          // [834]
    deepLinkAlt: "https://ctrl.xyz/deeplink/wallet", // [835]
  },

  // --- Tangem [836–837] ---
  {
    name: "Tangem",
    appId: "com.tangem.wallet",         // [837]
    deepLink: "tangem://",              // [836]
    note: "Card/NFC hardware wallet",
  },

  // --- Bee Wallet [838–839] ---
  {
    name: "Bee Wallet",
    deepLink: "bee://",                 // [838]
    deepLinkAlt: "https://main.apple.bee9527.com", // [839]
  },

  // --- Hot Wallet [840–842] ---
  {
    name: "Hot Wallet",
    appId: "app.herewallet.hot",        // [842]
    deepLink: "hotwallet://",           // [840]
    deepLinkAlt: "https://app.hot-labs.org", // [841]
  },

  // --- Wigwam [843–844] ---
  {
    name: "Wigwam",
    deepLink: "wigwam://",             // [843]
    deepLinkAlt: "https://wigwam.app/", // [844]
  },

  // --- KuCoin Web3 Wallet [845–846] ---
  {
    name: "KuCoin Web3 Wallet",        // [845]
    deepLink: "kucoin:///wallet/walletConnect", // [846]
  },

  // --- Cypher Wallet [847–848] ---
  {
    name: "Cypher Wallet",
    appId: "com.cypherd.androidwallet", // [848]
    deepLink: "cypherwallet://",        // [847]
  },

  // --- Klip [849–850] ---
  {
    name: "Klip",
    appId: "com.klipwallet.app",        // [850]
    deepLink: "klipwallet://",          // [849]
  },

  // --- CORE Wallet [851] ---
  {
    name: "CORE",
    deepLink: "core://",               // [851]
  },

  // --- Cake Wallet [852–853] ---
  {
    name: "Cake Wallet",
    appId: "com.cakewallet.cake_wallet", // [853]
    deepLink: "cakewallet://",           // [852]
  },

  // --- Gem Wallet [854–855] ---
  {
    name: "Gem Wallet",
    appId: "com.gemwallet.android",    // [855]
    deepLink: "gem://",                // [854]
  },

  // --- Nova Wallet [856] ---
  { name: "Nova Wallet", deepLink: "nova://" }, // [856]

  // --- ZenGo [857–858] ---
  {
    name: "ZenGo",
    appId: "com.zengo.wallet",         // [858]
    deepLink: "zengo://get.zengo.com/", // [857]
  },

  // --- Plus Wallet [859] ---
  { name: "Plus Wallet", deepLink: "pluswallet://" }, // [859]

  // --- Pure Wallet [860–861] ---
  {
    name: "Pure Wallet",
    appId: "com.nslab.purewalletp",    // [861]
    deepLink: "purewalletp://",        // [860]
  },

  // --- Keyring Pro [862–863] ---
  {
    name: "Keyring Pro",
    appId: "co.bacoor.keyring",        // [863]
    deepLink: "keyring://",            // [862]
  },

  // --- Nightly [864–865] ---
  {
    name: "Nightly",
    appId: "com.nightlymobile",        // [865]
    deepLink: "nightly://",            // [864]
    note: "Solana-native wallet; popular in gaming",
  },

  // --- Frontier [866–867] ---
  {
    name: "Frontier",
    appId: "com.frontierwallet",       // [867]
    deepLink: "frontier://",           // [866]
  },

  // --- Atomic Wallet [868] ---
  { name: "Atomic Wallet", deepLink: "atomicwallet://" }, // [868]

  // --- Burrito Wallet [869–870] ---
  {
    name: "Burrito Wallet",
    appId: "com.burritowallet.app",    // [870]
    deepLink: "burrito://",            // [869]
  },

  // --- Tholos [871] ---
  { name: "Tholos", appId: "app.tholos.tholos" }, // [871]

  // --- IoTex ioPay [872–873] ---
  {
    name: "ioPay",
    appId: "io.iotex.iopay.gp",       // [873]
    deepLink: "iopay://",             // [872]
  },

  // --- HB Wallet [874–875] ---
  {
    name: "HB Wallet",
    appId: "co.bacoor.android.hbwallet", // [875]
    deepLink: "hbwallet://",          // [874]
  },

  // --- AB Wallet [876–877] ---
  {
    name: "AB Wallet",
    appId: "com.crypto.ab.wallet.app", // [877]
    deepLink: "crypto.ab.wallet://",   // [876]
  },

  // --- IBVM [878] ---
  { name: "IBVM", deepLink: "ibvm://" }, // [878]

  // --- Klever [879–880] ---
  {
    name: "Klever",
    appId: "finance.klever.bitcoin.wallet", // [880]
    deepLink: "klever-wallet://dp/walletconnect", // [879]
  },

  // --- ZelCore [881–882] ---
  {
    name: "ZelCore",
    appId: "com.zelcash.zelcore",     // [882]
    deepLink: "zel://",               // [881]
  },

  // --- Gaya Wallet [883–884] ---
  {
    name: "Gaya Wallet",
    appId: "com.gayawalletmobapp",    // [884]
    deepLinkAlt: "https://gayawallet.com", // [883]
  },

  // --- More entries from string indices 885–940 ---
  // (entries covered in wallet_deeplinks.js: OnlyBulls[967–970], React[974–975],
  //  SOC[980], Volsungar[985–987], Hero[990–991], dlicom[976–977])

  // --- Nightly (mobile) already in extended above ---
  // The following are additional entries from 885–940:
  { name: "No One",    appId: "io.noone.androidwallet", deepLink: "crypto.noone.wallet://walletcon" }, // [885–886]
  { name: "OpenWallet", appId: "com.finverselabs.openwallet", deepLink: "x-app-open-wallet://" },      // [888–889]
  { name: "Fizen",     appId: "com.fizen.io.wallet" },                                                  // [891]
  { name: "SafeMoon",  appId: "net.safemoon.androidwallet" },                                           // [893]
  { name: "The Pulse Wallet", appId: "com.wallet.thepulse", deepLink: "wallet.pulse://" },             // [894–896]
  { name: "Billion Wallet", appId: "com.billionwallet", downloadUrl: "https://w.billionwallet.io", deepLink: "billionwallet://" }, // [901–903]
  { name: "Rewardy Wallet", appId: "com.chainwith.rewardy", downloadUrl: "https://www.rewardywallet.com/wc", deepLink: "rewardywallet://" }, // [913–915]
  { name: "Iron Wallet", appId: "com.wallet.crypto.btc.eth", downloadUrl: "https://app.ironwallet.io", deepLink: "myApp://app.ironwallet.io" }, // [916–918]
  { name: "DigitalShield", deepLink: "digitalshield-wallet://wc", downloadUrl: "https://app.ds.pro/wc/connect" }, // [919–920]
  { name: "CoinEx Wallet", appId: "com.viabtc.wallet", deepLink: "myApp://https://wallet.coinex.com" }, // [923–924]
  { name: "Flash Wallet", appId: "com.flashwallet.production", deepLink: "flashwallet://" }, // [925–926]
  { name: "AB Pay", appId: "org.ab.abwallet.android.release", deepLink: "abpay://walletconnect" },     // [927–928]
  { name: "iLuminaryAi", appId: "com.xellar.wallets" },                                                 // [929, 932]
  { name: "Frostfire", appId: "com.velas.frostfire", deepLink: "frostfire://wc" },                      // [940–941]
  { name: "Qubetics", appId: "com.qubetics.wallet", deepLink: "qubetics://" },                          // [944–945]
  { name: "eCoins", deepLink: "ecoinwallet://" },                                                        // [946]
  { name: "Flutter Sample Wallet", deepLink: "wcflutterwallet-internal://", downloadUrl: "https://appkit-lab.reown.com/flutter_walletkit_internal" }, // [948–950]
  { name: "Dok Wallet", deepLink: "dokwallet://" },                                                       // [951]
  { name: "Squirrel Wallet", appId: "com.squirrelwallet.app", deepLink: "squirrel-wallet://" },          // [952–953]
  { name: "W3Wallet", appId: "app.w3wallet.w3wallet", deepLink: "w3wallet://" },                         // [954–955]
  { name: "Kotlin Sample Wallet", deepLink: "kotlin-web3wallet://", downloadUrl: "https://appkit-lab.reown.com/wallet_internal" }, // [956–958]
  { name: "Up", deepLink: "up-io://", downloadUrl: "https://up.io/app/" },                               // [959–960]
  { name: "CoinWallet", appId: "com.coinsdo.wallet", deepLink: "coinwallet://" },                        // [961–962]
  { name: "Tobi Wallet", downloadUrl: "https://api.tobiwallet.app/dapp/wallet-connect/redirect" },       // [963]
  { name: "Self", deepLink: "self://" },                                                                  // [964]
  { name: "Tychi Wallet", appId: "com.tychiwallet2", downloadUrl: "https://tychiwallet.com/wc" },        // [965–966]
  { name: "GK8", deepLink: "gk8://main" },                                                               // [971]
  { name: "Anchorage Digital", downloadUrl: "https://anchorage.com" },                                   // [972–973]
  { name: "Talk App", deepLink: "talkapp://" },                                                          // [978]
  { name: "DaffiOne", deepLink: "DaffiOne:// wc://" },                                                   // [979]
  { name: "Outlaw", appId: "com.outlawgame.android", deepLink: "outlaw://" },                            // [981–982]
  { name: "Kotai Wallet", appId: "com.kotaiwallet.app.android", deepLink: "kotaiwallet://" },            // [983–984]
  { name: "Oblio", appId: "com.oblio.wallet", deepLink: "oblio://" },                                    // [988–989]
  { name: "NestWallet", appId: "xyz.nestwallet.nestwallet", deepLink: "nestwallet://" },                 // [992–993]
  { name: "Bitnovo Wallet", appId: "com.bitnovo.Wallet", deepLink: "bitnovowallet://" },                 // [994–995]
  { name: "Tidus Wallet", appId: "co.nycrypto.tiduswallet", deepLink: "tiduswallet://walletconnect" },  // [996–997]
  { name: "VKX Wallet", appId: "com.vkinha.wallet", downloadUrl: "https://vkinha.com/wallet", deepLink: "vkxwallet://wc" }, // [998–1000]
  { name: "OxPay Wallet", appId: "com.oxWallet.production", downloadUrl: "https://oxpaywallet.com/wc" }, // [1001–1002]
  { name: "CornWallet", downloadUrl: "https://www.cornwallet.io/" },                                      // [1003]
  { name: "DeBox", appId: "com.tm.security.wallet", downloadUrl: "https://debox.pro/wc", deepLink: "Debox://" }, // [1006–1008]
  { name: "uKey Wallet", downloadUrl: "https://app.ukey.io/wc/connect", deepLink: "ukey-wallet://" },   // [1009–1010]
  { name: "Doma Wallet", deepLink: "domawallet://" },                                                     // [1011]
  { name: "WalletVerse", deepLink: "walletverse://" },                                                    // [1012]
];

export default EXTENDED_WALLET_TABLE;
