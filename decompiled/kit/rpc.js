/**
 * Rotating Solana JSON-RPC client (original class 恞).
 *
 * Eight endpoints, tried in order, 2.5s timeout, one retry pass.
 * User-Agent on every request is the connected wallet address.
 * solana.<method>(...args) is a Proxy that calls client.request.
 *
 * The bundle also builds a Set of 29 pubkeys next to this client.
 * They are listed in decompiled/iocs.json as embedded_pubkeys.
 * They are not the same list as the receiver addresses in FORENSIC_REPORT.md.
 */

const RPC_ENDPOINTS = [
  "https://mainnet.helius-rpc.com/?api-key=0b9f580f-8102-4b89-928b-8770a62771f0",
  "https://mainnet.helius-rpc.com/?api-key=2dfa2086-c6cd-4cb4-8a13-08ecdee36a0f",
  "https://mainnet.helius-rpc.com/?api-key=3a1ca16d-e181-4755-9fe7-eac27579b48c",
  "https://mainnet.helius-rpc.com/?api-key=777d85c0-fefd-42a0-b290-8b1b3704fe90",
  "https://solana-rpc.publicnode.com/",
  "https://solana.magiceden.dev/",
  "https://rpc.solanatracker.io/public",
  "https://api.mainnet-beta.solana.com",
];

class RpcClient {
  constructor(endpoints) {
    this.endpoints = endpoints;
    this.count = endpoints.length;
    this.index = 0;
  }

  async request(method, params, triesLeft = this.count) {
    const index = this.index;
    const endpoint = this.endpoints[index];
    let response;
    try {
      response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "User-Agent": walletAddress,
          "content-type": "application/json",
          "solana-client": "js/5.1.0",
        },
        body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
        signal: AbortSignal["Be"](2500),
      });
    } catch (error) {
      response = error;
    }

    if (response instanceof Error || !response.ok || response.headers.get("content-length") === "0") {
      if (triesLeft > 0 && this.count > 1) {
        this.index = (index + 1) % this.count;
        return this.request(method, params, triesLeft - 1);
      }
      const message = response instanceof Error ? response.message : "20";
      throw new HttpError(message);
    }

    const body = await response.json();
    if ("error" in body) {
      throw new RpcError(method, body.error.code, body.error.message);
    }
    if (typeof body.result === "object" && body.result && body.result.context) {
      rememberSlot(body.result.context.slot);
    }
    return body.result;
  }
}

const rpcClient = new RpcClient(RPC_ENDPOINTS);
const solana = new Proxy({}, {
  get(_target, method) {
    return (...params) => rpcClient.request(method, params);
  },
});
