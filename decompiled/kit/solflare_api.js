/**
 * Solflare portfolio client.
 *
 * Original names: class 汦, fetch helper 锏, bearer helper 濛.
 * Prefix 墸 is https://wallet-api.solflare.com/ (getString 294).
 * User-Agent is the connected wallet address. Authorization is a
 * random bearer, not a Solflare credential.
 *
 * solPrice()  -> v2/swap/capped-tokens?currency=USD, the SOL entry.
 * portfolio() -> v3/portfolio/tokens/{wallet} on mainnet, priced in USD.
 *
 * A third method (original name vn) is the custom-base64 decoder.
 * The alphabet lives in deobfuscate.py. It is not copied here.
 *
 * Analysis reconstruction. Not a client to run against the API.
 */

const SOLFLARE_API = "https://wallet-api.solflare.com/";

function generateBearer() {
  const version = randomInt(1, 7);
  const bytes = randomBytes(16);
  bytes[1] = (version << 5) + randomInt(0, 31);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  return "Bearer " + base64Encode(bytes);
}

async function solflareGet(path, params) {
  if (params) path += "?" + new URLSearchParams(params);
  const response = await fetch(SOLFLARE_API + path, {
    signal: AbortSignal["Be"](3500),
    referrerPolicy: "no-referrer",
    headers: {
      "User-Agent": walletAddress,
      Authorization: generateBearer(),
    },
  });
  if (!response.ok) throw new HttpError("20");
  return response.json();
}

async function solPrice() {
  const body = await solflareGet("v2/swap/capped-tokens?currency=USD");
  const sol = body.tokens.find((token) => token.symbol === "SOL");
  if (!sol) throw new Error("21");
  return sol.price.price;
}

async function portfolio(wallet) {
  let body;
  try {
    body = await solflareGet("v3/portfolio/tokens/" + wallet, {
      network: "mainnet",
      currency: "USD",
      enablePartialErrors: "true",
    });
  } catch (error) {
    console.error("getAssets:", error);
    return null;
  }
  if (body.errors.length > 0) console.error("SolflareApi errors:", body.errors);

  let solPriceUsd;
  let solLamports;
  const tokens = [];
  const seen = new Set();

  for (const entry of body.tokens) {
    const price = entry.price;
    const standard = entry.standard;
    const symbol = entry.symbol ?? "Unknown";
    if (standard === "native") {
      solPriceUsd = price && price.price;
      solLamports = Number(entry.accounts[0].amount);
      continue;
    }
    if (standard !== "spl-token" && standard !== "spl-token-2022") {
      console.error("unknown asset standard:", standard);
      continue;
    }
    let token2022 = standard === "spl-token-2022";
    if (!token2022 && entry.accounts.some((account) => "withheldAmount" in account)) {
      token2022 = true;
    }
    for (const account of entry.accounts) {
      if (seen.has(account.pubkey)) continue;
      if (account.state !== "initialized" || account.amount === "0") continue;
      seen.add(account.pubkey);
      tokens.push({
        type: 0,
        account: account.pubkey,
        mint: entry.mint,
        rentFee: entry.rentFee ?? 0,
        token2022,
        symbol,
        decimals: entry.decimals,
        usd: account.uiAmount * ((price && price.usdPrice) || 0),
        amount: BigInt(account.amount),
      });
    }
  }
  return { solLamports, tokens, solPriceUsd };
}
