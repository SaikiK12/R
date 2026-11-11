/**
 * Page-load visit beacon (original name 籨).
 *
 * Skipped when the URL contains "?b=", and skipped again for 900 seconds
 * after a beacon whose body text is "ok". The clock is
 * Math.floor(Date.now() / 1000). There is no JSON body.
 *
 * readCampaignSource() and pageHost() (original names 鼄 and 浚) are
 * reconstructed in page_params.js. pageHost() reads location and is
 * compared with state.apiHost.
 */

const VISIT_COOLDOWN_SEC = 900;

function nowSeconds() {
  return Math.floor(Date.now() / 1000);
}

async function sendVisit(state, tgUser) {
  if (location.search.includes("?b=")) return;

  const seen = cache.get(VISIT_KEY);
  if (seen && nowSeconds() - Number(seen) < VISIT_COOLDOWN_SEC) return;

  const url = new URL("https://" + state.apiHost + "/api/visit");
  const source = readCampaignSource();
  if (source) url.searchParams.set("source", source);

  const host = pageHost();
  if (state.apiHost !== host) url.searchParams.set("origin", host);

  if (tgUser) {
    url.searchParams.set("tgid", String(tgUser.id));
    if (tgUser.username) url.searchParams.set("tgus", tgUser.username);
  }

  const response = await fetch(url, { method: "POST" });
  if ((await response.text()) === "ok") cache.set(VISIT_KEY, nowSeconds());
}
