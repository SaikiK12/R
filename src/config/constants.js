/**
 * rebuilt/config/constants.js
 *
 * All extracted Indicators of Compromise as named constants.
 * Sources: decompiled/iocs.json, operator_program.md, tx analysis.
 *
 * These are reproduced here for research/documentation purposes.
 */

'use strict';

// ── On-chain program ────────────────────────────────────────────────────
const OPERATOR_PROGRAM    = 'TwrGADB9QPrLfTKpWuyq9tjgRaGsuzgRUMFTz51uhsa';
const PROGRAM_DATA        = 'HwWXKu3txa2CH6wMvPTMmZKY5bXHovftanBXbfUfqo5g';
const UPGRADE_AUTHORITY   = '3ofSxsTReb9Uhom1NvHqH5oU1EEDLuUxZVbFix4fGNY6';

// ── Treasury / collector ────────────────────────────────────────────────
// DvTqmF7u = assessed treasury; held 17,057 SOL + 1.02M USDC on 2026-11-11
// 6cwsqBqm = vendor/developer cut (20-25% of every drain)
const TREASURY   = 'DvTqmF7uMbLaW56QsMvcgv8KSkydFEikuk5gUcjACPV';
const COLLECTOR  = '6cwsqBqmRy22Qa2SEuZ8tWrpKoCS9M8S2r8ct8VuqFmj';

// ── String-table receiver addresses (fallback when /api/config unavailable) ─
const RECEIVER_A = '7VHUFJHWu2CuExkJcJrzhQPJ2oygupTWkL2A2For4BmE'; // active 2026-11-11
const RELAY_A    = '3emsAVdmGKERbHjmGfQ6oZ1e35dkf5iYcS6U4CPKFVaa'; // relay for decoy USDC leg

// ── Drain-through addresses (co-signers / vault routing) ────────────────
const DRAIN_THROUGH = [
  '4QFiKg8ejx5LfqqLNbnKsiCnbEgRtgakBF6abMrkquKW',
  '4cfdFcVuJf8PPXpMWPMCDehSE4gV4C8oYwpZnLra7rtW',
  'syspv6Qe5BbK8GPEjLbMnmF9hZy7juAuePbuspciCFP',
  'A5chdzL3UMQZBqBRdXFFCT9HTK7JZs6h4TEYVCQLQydo',
  '6ugBBLhRJqsuB1H4G6rGBMCyMWjdFpvpEUKnp6XCB1t7',
  '9piPeQWJ7wxGmsWieeJhQKJ13DjJLga9j8CE5ydLTHC6',
  '6ARSYR2B1aPWSjK11ZXDPmApgLgar3bCrm2BTYGS2jBK',
  '4qti6FcMybVSLL2k4rqRQ3Ph1a2jGrzPmBN8Wmt4A5wr',
  'HsVYhMDQRf6CkjtdUzqNDNRfDwsgw9nAX8feLVC3TAGp',
  '4moJ9mfFDqFgGMp5UJUgcVhAaFtBxiapt9DVJE3LcVao',
];

// ── Balance gate exclusion set (operator monitoring wallets) ────────────
// 6 addresses confirmed by full deobfuscation (diagnose array in bundle):
// wallets in this set see the UI but are never drained.
const EXCLUSION_SET = new Set([
  '6ugBBLhRJqsuB1H4G6rGBMCyMWjdFpvpEUKnp6XCB1t7',
  '9piPeQWJ7wxGmsWieeJhQKJ13DjJLga9j8CE5ydLTHC6',
  '6ARSYR2B1aPWSjK11ZXDPmApgLgar3bCrm2BTYGS2jBK',
  '4qti6FcMybVSLL2k4rqRQ3Ph1a2jGrzPmBN8Wmt4A5wr',
  'HsVYhMDQRf6CkjtdUzqNDNRfDwsgw9nAX8feLVC3TAGp',
  '4moJ9mfFDqFgGMp5UJUgcVhAaFtBxiapt9DVJE3LcVao',
]);

// ── Live receiver rotations (observed on 2026-11-11 and 2026-11-12) ─────
const LIVE_RECEIVERS = {
  '2026-11-11': {
    target_token: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // USDC
    max_sol: 500.0,
    min_sol: 1.0,
    receivers: [
      '7VHUFJHWu2CuExkJcJrzhQPJ2oygupTWkL2A2For4BmE',
      '3emsAVdmGKERbHjmGfQ6oZ1e35dkf5iYcS6U4CPKFVaa',
    ],
    sibling_domain: 'trongame.fun',
  },
  '2026-11-12_morning': {
    receivers: [
      '142yhSkBthJpmWKzhBRtHYV6S4JdXAMBQcdYD8vEhNx4',
      '7Z7oKDRHhXwzeWfuJ91FDZowaNETWwq6pW4XHt7d6FBL',
      'DC9dh6xDK7mLbrSUx9Fcy9VpMuSdJnUynoNEtr9Y6NjA',
    ],
  },
  '2026-11-12_afternoon': {
    receivers: [
      'HrmfWTNdY8QeNif8SMK4xU5YATt7YJPdnKev1FcmbaKy',
      '7oHgTZjNPnjos8xd2zdCm2Q6zwS8cVFDp4XbuvmqV4aa',
      '7mfxYcwyddVa6fD7Ge33vgY8SC862hcqXmvjYKqcpza1',
    ],
    sibling_domain: 'trongame.fun',
  },
  '2026-11-12_evening_v2': {
    note: 'Short-lived 220-byte config variant, rolled back after ~1hr',
    sibling_domain: 'petramon.xyz',
    staged_pubkey: 'DvuqUzFAi8pHMaXfsWM6ASwsVeRHgtruDXaaJ9DxT3xQ',
  },
};

// ── RPC endpoints (Helius API keys leaked from string table) ────────────
const RPC_ENDPOINTS = [
  'https://mainnet.helius-rpc.com/?api-key=0b9f580f-8102-4b89-928b-8770a62771f0',
  'https://mainnet.helius-rpc.com/?api-key=2dfa2086-c6cd-4cb4-8a13-08ecdee36a0f',
  'https://mainnet.helius-rpc.com/?api-key=3a1ca16d-e181-4755-9fe7-eac27579b48c',
  'https://mainnet.helius-rpc.com/?api-key=777d85c0-fefd-42a0-b290-8b1b3704fe90',
  'https://solana-rpc.publicnode.com/',
  'https://solana.magiceden.dev/',
  'https://rpc.solanatracker.io/public',
  'https://api.mainnet-beta.solana.com',
];

// ── Jupiter API keys (leaked from string table) ─────────────────────────
const JUPITER_API_KEYS = [
  'cc0769f7-ceba-4abf-83d8-e7c083921665',
  '5f1f45eb-a550-4e95-ad0e-b26e6ec0702d',
  'a4ed32be-dcdf-4702-aba0-aee15c512427',
  'f707107a-6d56-4626-a937-ef3c7eef51d8',
  'ab060a03-7874-4647-84d1-da019e4b51ea',
];

// ── Kit metadata ─────────────────────────────────────────────────────────
const KIT_VERSION  = '1.18.4';
const KIT_VENDOR   = 'hexfomo.fun';     // string table [350], watermark
const AES_KEY_SALT = 'B3ui3QZFrOPoGW7oMZgE4A'; // 幦

// ── Active affiliate campaign tags (observed in real drain txs 2026-11-12) ─
const OBSERVED_CAMPAIGN_TAGS = [
  '1kd1mz4r-|1|',
  '1kd1m5up7|1|',
  '1kd1m4gfq|1|',
  '1k7_ccf5p|1|',
  '1kd14ntu4|1|',
  'r_ia6awp|0|',
];

// ── Revenue split ────────────────────────────────────────────────────────
// Disc 0x15 argument byte: 0x50 = 80% to affiliate, 0x4b = 75% to affiliate
// Remainder to collector 6cwsqBqm (developer cut).
const SPLIT_80_PCT = 0x50;
const SPLIT_75_PCT = 0x4B;

// ── Lure domains ─────────────────────────────────────────────────────────
const LURE_DOMAIN     = 'pumpanakin.fun';
const CONNECT_DOMAINS = ['easyinvest7.biz', 'petramon.xyz'];
const PAYLOAD_HOSTS   = ['stockbox.cfd', 'radar-nutmeg.stockbox.cfd', 'punctuate-atop.stockbox.cfd'];

// ── Solana token constants ────────────────────────────────────────────────
const USDC_MINT        = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
const SYSTEM_PROGRAM   = '11111111111111111111111111111111';
const TOKEN_PROGRAM    = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
const TOKEN_2022       = 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb';
const ATA_PROGRAM      = 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
const COMPUTE_BUDGET   = 'ComputeBudget111111111111111111111111111111';
const WSOL_MINT        = 'So11111111111111111111111111111111111111112';

// ── Deobfuscated bundle line references ────────────────────────────────
// For cross-referencing decompiled/deobfuscated/bundle.deobfuscated.js
const DEOB_REFS = {
  aes_key_derivation:         'line 20634',
  api_config_fetch:           'line 33587',
  api_config_tgid_param:      'line 33588',
  api_config_cache_restore:   'line 33675',
  operator_client_class:      'line 20675',
  visit_beacon:               'line 33381',
  is_banned_check:            'line 20701',
  connect_payload_builder:    'line 20476',
  process_payload_builder:    'line 20619',
  connect_response_parser:    'line 20492',
  handler_serializer:         'line 32910',
  exclusion_set:              'line 33400',
  russian_redirect:           'line 33529',
  config_struct_parser:       'line 24453',
  config_field_offsets:       'line 24454',
};

module.exports = {
  OPERATOR_PROGRAM, PROGRAM_DATA, UPGRADE_AUTHORITY,
  TREASURY, COLLECTOR,
  RECEIVER_A, RELAY_A,
  DRAIN_THROUGH, EXCLUSION_SET,
  LIVE_RECEIVERS, RPC_ENDPOINTS, JUPITER_API_KEYS,
  KIT_VERSION, KIT_VENDOR, AES_KEY_SALT,
  OBSERVED_CAMPAIGN_TAGS, SPLIT_80_PCT, SPLIT_75_PCT,
  LURE_DOMAIN, CONNECT_DOMAINS, PAYLOAD_HOSTS,
  USDC_MINT, SYSTEM_PROGRAM, TOKEN_PROGRAM, TOKEN_2022,
  ATA_PROGRAM, COMPUTE_BUDGET, WSOL_MINT,
  DEOB_REFS,
};
