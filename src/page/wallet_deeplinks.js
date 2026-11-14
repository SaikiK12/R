'use strict';
/**
 * Wallet deep-link table and mobile connect URL builder.
 * Sources: decompiled/kit/page/wallet_deeplinks.js, bundle.deobfuscated.js
 *
 * On mobile the kit redirects into a wallet's in-app browser via scheme://.
 * On desktop a 360×450 popup opens the connect domain.
 *
 * FAKE wallets (operator-controlled, NOT real wallets):
 *   OnlyBulls, React Wallet, SOC Wallet, Volsungar, Hero, dlicom
 *   These appear in the modal but route to operator/underground URLs.
 */

// Full wallet table (name, appId, downloadUrl, deepLink, deepLinkAlt)
const WALLETS = [
  { name:'Solflare',       ios:'com.solflare.mobile',    dl:'https://www.solflare.com/download/',          link:'solflare://ul/v1/',          alt:'https://solflare.com/ul/v1/' },
  { name:'Phantom',        ios:null,                     dl:'https://phantom.com/download',                link:'phantom://',                 alt:'https://phantom.app/ul/' },
  { name:'Backpack',       ios:'app.backpack.mobile',    dl:'https://backpack.app/download',              link:'backpack://ul/browse/',       alt:'https://backpack.app/ul/v1/browse/' },
  { name:'Coinbase Wallet',ios:null,                     dl:'https://www.coinbase.com/wallet/downloads',  link:'cbwallet://dapp?url=',        alt:'https://go.cb-w.com/dapp?cb_url=' },
  { name:'Trust Wallet',   ios:'com.wallet.crypto.trustapp', dl:'https://trustwallet.com/download',       link:'trust://open_url?coin_id=501&url=', alt:'https://link.trustwallet.com/' },
  { name:'Bitget Wallet',  ios:'com.bitkeep.wallet',     dl:'https://web3.bitget.com/wallet-download',   link:'bitkeep://bkconnect?action=dapp&url=', alt:'https://bkcode.vip/?action=dapp&url=' },
  { name:'Exodus',         ios:'exodusmovement.exodus',  dl:'https://www.exodus.com/download/',           link:'exodus://web3',               alt:'https://exodus.com/m/web3' },
  { name:'SafePal',        ios:'io.safepal.wallet',      dl:'https://www.safepal.com/download?product=2', link:'safepalwallet://web3',        alt:'https://link.safepal.io/web3' },
  { name:'OKX Wallet',     ios:null,                     dl:'https://web3.okx.com/download',             link:'okx://wallet/dapp/url?dappUrl=', alt:'https://www.okx.com/download?deeplink=' },
  { name:'Magic Eden',     ios:'com.magiceden.wallet',   dl:'https://wallet.magiceden.io/download',      link:'magiceden://',                alt:'https://wallet.magiceden.io/' },
  { name:'Math Wallet',    ios:'com.mathwallet.android', dl:'https://mathwallet.org/',                   link:'mathwallet://navigate?url=',  alt:'https://www.mathwallet.org/navigate?url=' },
  { name:'Coin98',         ios:'coin98.crypto.finance.media', dl:'https://coin98.com/wallet',            link:'coin98://dapp?url=',          alt:null },
  { name:'MetaMask',       ios:null,                     dl:'https://metamask.io/download',              link:'dapp://',                     alt:'https://metamask.app.link/dapp/' },
  { name:'Brave Wallet',   ios:'com.brave.browser',      dl:'https://brave.com/download/',               link:'brave://',                    alt:null },
  { name:'Bybit Web3',     ios:null,                     dl:'https://www.bybit.com/en/web3',             link:'bybitapp://',                 alt:'https://app.bybit.com/inapp' },
  { name:'Zerion',         ios:'io.zerion.android',      dl:'https://zerion.io/download',                link:'zerion://browser?url=',       alt:null },
  { name:'Kraken Wallet',  ios:'com.kraken.superwallet', dl:'https://www.kraken.com/wallet',             link:'krakenwallet://',             alt:null },
  { name:'Glow',           ios:'com.luma.wallet.prod',   dl:'https://glow.app/download',                 link:'glow://',                     alt:null },
  { name:'Jupiter',        ios:'ag.jup.jupiter.android', dl:'https://jup.ag/mobile',                     link:'jup://browse/',               alt:null },
  { name:'Binance Web3',   ios:null,                     dl:'https://www.binance.com/download',          link:'bnc://app.binance.com/cedefi/', alt:'https://app.binance.com/cedefi' },
  // ── Operator-controlled fake wallets ──────────────────────────────────
  { name:'OnlyBulls Wallet', ios:'com.askroi.onlybulls',   dl:'https://onlybulls.com',                   link:'onlybulls://wallet',          fake:true },
  { name:'React Wallet',   ios:'com.react.wwallett',    dl:'https://reactwalletback.com/app-link/',     link:'reactwallet://',              fake:true },
  { name:'SOC Wallet',     ios:'com.socwallet.socjsc',  dl:null,                                        link:'socwallet://',                fake:true },
  { name:'Volsungar',      ios:'com.volsungar.wallet',  dl:'https://link.volsungar.com/wc',             link:'volsungar://',                fake:true },
  { name:'Hero',           ios:null,                    dl:'https://wallet.hero.io/signin/wc',          link:'herowallet://wc',             fake:true },
  { name:'dlicom',         ios:'com.shlenpower.dlicom', dl:'https://dlicom.me',                         link:'dlicom://',                   fake:true },
];

/**
 * buildDeepLink(wallet, connectUrl):
 *   Returns the full deep-link to open the connect page inside the wallet.
 *   Most: link + encodeURIComponent(connectUrl)
 */
function buildDeepLink(wallet, connectUrl) {
  const base = wallet.link || wallet.alt;
  return base + encodeURIComponent(connectUrl);
}

/**
 * appStoreUrl(wallet, platform):
 *   iOS App Store or Google Play URL.
 *   Falls back to wallet.dl if no appId.
 */
function appStoreUrl(wallet, platform) {
  if (!wallet.ios) return wallet.dl;
  if (platform === 'ios') return 'https://apps.apple.com/app/' + wallet.ios;
  return 'https://play.google.com/store/apps/details?id=' + wallet.ios;
}

/**
 * openConnectPopup(connectUrl):
 *   Desktop: 360×450 centered popup.
 *   From decompiled/kit/page/mobile.js.
 */
function openConnectPopup(connectUrl) {
  const W = 360, H = 450;
  const left = Math.round((window.screen.width  - W) / 2);
  const top  = Math.round((window.screen.height - H) / 4);
  const spec = `width=${W},height=${H},top=${top},left=${left},scrollbars=no,resizable=no`;
  const popup = window.open(connectUrl, '_blank', spec);
  if (popup) { popup.resizeTo(W, H); popup.moveTo(left, top); }
  return popup;
}

module.exports = { WALLETS, buildDeepLink, appStoreUrl, openConnectPopup };
