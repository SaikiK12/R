# Frontend Layer — Lure Page and Wallet Modal Analysis

This document covers everything the user sees: the lure page structure,
the fake confirm dialog, the wallet deep-link table, and the locale strings.

---

## Lure Page Structure

The lure HTML is served via Nuxt at `/_nuxt/index.html` (or `lure.html`,
`connect.html` — all return the same file). The bundle at
`/_nuxt/assets/index.js` is loaded unconditionally.

### Campaign States

**Pre-2026-11-14 — Trump COIN Airdrop**
- Language: `lang="ru"`
- Theme: impersonating `donaldjtrump.com`
- Entry: Web3Modal wallet-connect

**2026-11-14 — ClaimFreeSOL / FL!pN Fake DEX**
- Theme: Solana wallet cleanup and token-sell tool
- Two tabs: "Clean Up" (vacant accounts / burn tokens / burn NFTs) and
  "Sell Tokens" (fake DEX swap SOL → USDC)
- Live SOL price: CoinGecko API (fallback: $178.50)
- Fake Jito fee (0.0003 SOL), slippage field, minimum received
- Referral banner: "Share your affiliate link and enjoy 30% commission!"
- Styling: `DinkieBitmap-9px.ttf`, `#000000` background, Solana gradient
  colors (`#9945FF`, `#19FB9B`), fully inline CSS

### DOM Injection (`dom.js`)

The bundle contains a 36-entry pitch dictionary with zero-width character,
homoglyph, and split-literal obfuscation applied to key strings. The
`DOMContentLoaded` event triggers injection of these strings into the
pre-rendered Nuxt HTML. Obfuscation exists to defeat simple string searches —
the semantic content is identical to the visual output.

---

## Fake Confirm Dialog

Kit-rendered UI that appears *before* the wallet's native transaction
confirmation popup. Source: `page/modal.js`.

**Elements:**
- Header: "Incoming transfer" (localized via `/api/locales`)
- Amount display: "+1 SOL", "+500 USDC" (populated from decoy leg config)
- Video player: `/_nuxt/media/refund.webm` (social proof loop)
- Safety text: Phantom-spoof wording ("Trust detected 0 issues")
- Button: "Confirm" → triggers `wallet.signTransaction()`

The dialog is designed to establish the narrative that the user is receiving
a transfer before the wallet popup appears. When the wallet popup shows the
same "+1 SOL, +500 USDC" preview (from the decoy legs), it appears to confirm
the narrative.

---

## Wallet Deep-Links (`deeplinks.js`, `deeplinks_ext.js`)

20+ wallet families covered. Mobile connect URL construction:

| Wallet | Deep-link scheme |
|---|---|
| Phantom | `phantom://browse/{url}?ref={ref}` |
| Solflare | `solflare://ul/v1/browse/{url}?ref={ref}` |
| Coinbase | `cbwallet://dapp?url={url}` |
| Trust Wallet | `trust://open_url?coin_id=…&url={url}` |
| Backpack | `backpack://browse/{url}` |
| + 15 others | Varies by wallet |

Chrome on Android nag: if deep-link does not open within 1500ms, a
"Try opening in wallet app" banner is injected into the DOM. App Store /
Play Store fallback URLs are also embedded.

---

## Locale Strings

`/api/locales` serves 10-entry JSON arrays. As of 2026-11-12: **en, fr, zh,
de, es, pt, it, ja, ko, ar, tr, pl** return 200. `ru` and `uk` return 404.
14 languages total. Local copies: `data/live/l_*.json`.

The 10-entry array structure is identical across all languages:

| Index | en | fr | zh |
|---|---|---|---|
| 0 | Incoming transfer | Transfert entrant | 收到转账： |
| 1 | Description | Description | 描述： |
| 2 | This DApp would like to connect your wallet | Cette DApp souhaite connecter votre portefeuille | 此去中心化应用希望连接您的钱包 |
| 3 | You are allowing this DApp to | Vous autorisez cette DApp à | 您允许此去中心化应用： |
| 4 | View wallet balance & activity | Voir le solde et l'activité du portefeuille | 查看钱包余额和活动 |
| 5 | Request approval for transactions | Demander une approbation pour les transactions | 请求交易批准 |
| 6 | Perform transactions without confirmation | Effectuer des transactions sans confirmation | 无需确认即可执行交易 |
| 7 | Message | Message | 消息 |
| 8 | Trust detected (0) issues with this platform, proceeding is safe. Press confirm to continue. | (fr equivalent) | (zh equivalent) |
| 9 | Launch into the decentralized exchange (DEX) | (fr equivalent) | (zh equivalent) |

Index 8 is the safety claim. Index 6 is the description of what the kit
actually does (the fake Confirm dialog precedes the real wallet request,
so the user has already clicked "Confirm" before the wallet asks).

---

## Telegram Integration

If the page is opened inside Telegram's WebView:
- `getTelegramContext()` extracts `tg.id` and `tg.username`.
- These are passed to `/api/visit` and `/api/config?tgid=N`.
- The `?tgid=` parameter allows the operator to serve per-user config
  overrides server-side (e.g. different receiver addresses for specific Telegram users).

---

## Cross-References

| Topic | File |
|---|---|
| Full transaction flow | `docs/pipeline.md` |
| Kit architecture | `docs/kit-overview.md` |
| Locale JSON files | `data/live/l_*.json` |
| Modal source | `data/core/page/modal.js` |
| DOM injection source | `data/core/page/dom.js` |
