/**
 * rebuilt/chain/rpc.js
 *
 * 8-endpoint failover JSON-RPC client for Solana mainnet.
 * Original class: 恞. Proxy wrapper: solana.
 *
 * Sources:
 *   - decompiled/kit/chain/rpc.js
 *   - decompiled/iocs.json rpc_endpoints
 *   - decompiled/live/RUNTIME_MAP.md (observed request patterns)
 */

'use strict';

const { RPC_ENDPOINTS } = require('../config/constants');

const RPC_TIMEOUT_MS = 2500;

class RpcClient {
  constructor(endpoints) {
    this.endpoints  = endpoints;
    this.count      = endpoints.length;
    this.index      = 0;
    this.walletAddr = null; // set after wallet connects — used as User-Agent
  }

  async request(method, params, triesLeft = this.count) {
    const idx      = this.index;
    const endpoint = this.endpoints[idx];
    let response;

    try {
      response = await fetch(endpoint, {
        method:  'POST',
        headers: {
          'User-Agent':     this.walletAddr || 'solana-kit',
          'content-type':   'application/json',
          'solana-client':  'js/5.1.0',
        },
        body:   JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
        signal: AbortSignal.timeout(RPC_TIMEOUT_MS),
      });
    } catch (err) {
      response = err;
    }

    const failed =
      response instanceof Error ||
      !response.ok ||
      response.headers?.get('content-length') === '0';

    if (failed) {
      if (triesLeft > 0 && this.count > 1) {
        this.index = (idx + 1) % this.count;
        return this.request(method, params, triesLeft - 1);
      }
      const msg = response instanceof Error ? response.message : '20';
      throw new Error('RPC error: ' + msg);
    }

    const body = await response.json();
    if ('error' in body) {
      throw new Error('RPC ' + method + ' error ' + body.error.code + ': ' + body.error.message);
    }

    // Track latest slot for blockhash validity window
    if (body.result?.context?.slot) {
      rpcState.lastSlot = body.result.context.slot;
    }

    return body.result;
  }
}

// Global RPC state (tracks last known slot for blockhash expiry detection)
const rpcState = { lastSlot: 0 };

const rpcClient = new RpcClient(RPC_ENDPOINTS);

// Proxy: solana.getAccountInfo(...) → rpcClient.request('getAccountInfo', [...])
const solana = new Proxy({}, {
  get(_target, method) {
    return (...params) => rpcClient.request(method, params);
  },
});

/**
 * Common RPC calls the kit makes:
 *
 * getAccountInfo(pubkey, { encoding: 'base64' })
 *   → Used by balance gate: checks owner === SystemProgram, reads lamports
 *
 * getLatestBlockhash({ commitment: 'processed' })
 *   → Fetched before every transaction assembly; kit tracks lastValidBlockHeight
 *     and re-fetches when current slot > lastValidBlockHeight (432,000 slot window)
 *
 * sendTransaction(base64TxString, { skipPreflight: true, encoding: 'base64' })
 *   → Self-broadcast 2.5s after /api/process call (broadcastSigned in submit.js)
 *   → skipPreflight: true — avoids simulation check, maximizes inclusion speed
 */

module.exports = { RpcClient, rpcClient, solana, rpcState };
