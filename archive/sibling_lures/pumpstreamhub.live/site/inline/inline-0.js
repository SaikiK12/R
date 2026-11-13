const tokenSlug = decodeURIComponent(window.location.pathname.split("/").filter(Boolean).pop() || "");
    let previousMarketCap = null;
    let refreshInterval = null;
    let currentChartAddress = null;

    function openModal() { /* placeholder */ }

    function updateChartEmbed(tokenAddress) {
        const chartFrame = document.getElementById('dexscreener-chart');
        if (chartFrame && tokenAddress && tokenAddress !== currentChartAddress) {
            currentChartAddress = tokenAddress;
            chartFrame.src = `https://dexscreener.com/solana/${tokenAddress}?embed=1&theme=dark&trades=0&info=0`;
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        const copyBtn = document.getElementById('copy-ca-btn');
        if (copyBtn) {
            copyBtn.addEventListener('click', function() {
                const caSpan = document.getElementById('token-ca');
                const fullAddress = caSpan?.dataset.fullAddress || caSpan?.textContent;
                if (fullAddress) {
                    navigator.clipboard.writeText(fullAddress).then(() => {
                        copyBtn.classList.add('copied');
                        setTimeout(() => copyBtn.classList.remove('copied'), 1500);
                    });
                }
            });
        }
    });


    /* ── Token header extras ──
       DexScreener doesn't expose holder count, ATH, dev % or live viewers,
       so those start from the defaults below. Edit them to match your token. */
    const HEADER_DEFAULTS = { holders: 3847, ath: 284000, devPct: "2.0%", viewers: 601 };
    let athValue = HEADER_DEFAULTS.ath;

    function formatAge(ms) {
        const m = Math.max(0, Math.floor(ms / 60000));
        if (m < 60) return m + "m";
        const h = Math.floor(m / 60);
        if (h < 24) return h + "h";
        const d = Math.floor(h / 24);
        if (d < 30) return d + "d";
        return Math.floor(d / 30) + "mo";
    }

    function updateHeaderExtras(pair, marketCap) {
        const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
        set("summary-holders", HEADER_DEFAULTS.holders.toLocaleString("en-US"));
        set("cs-dev", HEADER_DEFAULTS.devPct);
        if (typeof marketCap === "number" && marketCap > athValue) athValue = marketCap;
        set("summary-ath", formatMarketCap(athValue));
        if (pair.pairCreatedAt) set("cs-age", formatAge(Date.now() - pair.pairCreatedAt));
        const dex = (pair.dexId || "").toLowerCase();
        set("cs-platform-name", dex.startsWith("pump") ? "Pump" : dex ? dex.charAt(0).toUpperCase() + dex.slice(1) : "Pump");
        const socials = pair.info?.socials || [];
        const tw = socials.find(s => s.type === "twitter");
        const web = pair.info?.websites?.[0];
        const xEl = document.getElementById("cs-x");
        if (xEl && tw?.url) xEl.href = tw.url;
        const webEl = document.getElementById("cs-web");
        if (webEl && web?.url) webEl.href = web.url;
        const searchEl = document.getElementById("cs-search");
        if (searchEl && pair.baseToken?.address) searchEl.href = "https://x.com/search?q=" + encodeURIComponent(pair.baseToken.address);
        lastPair = pair; renderStats();
    }

    function shareToken() {
        const url = window.location.href;
        if (navigator.share) navigator.share({ title: document.title, url }).catch(() => {});
        else navigator.clipboard?.writeText(url);
    }

    /* viewer counter in the header */
    (function () {
        let v = HEADER_DEFAULTS.viewers;
        (function tick() {
            const el = document.getElementById("cs-viewers");
            if (el) el.textContent = v.toLocaleString("en-US");
            const r = Math.random();
            v += r < 0.7 ? 1 : r < 0.9 ? 2 : 3;
            setTimeout(tick, Math.floor(Math.random() * 3000) + 2000);
        })();
    })();


    let lastPair = null, activeTf = "h24";
    function renderStats() {
        const pair = lastPair; if (!pair) return;
        const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
        set("sx-holders-count", HEADER_DEFAULTS.holders.toLocaleString("en-US") + " holders");
        const pc = pair.priceChange?.[activeTf];
        const pcEl = document.getElementById("sx-pc");
        if (pcEl && typeof pc === "number") {
            const up = pc >= 0;
            pcEl.className = "sx-pc " + (up ? "up" : "down");
            pcEl.querySelector(".sx-pc-val").textContent = (up ? "+" : "") + pc.toFixed(2) + "%";
            const svg = pcEl.querySelector("svg"); if (svg) svg.style.transform = up ? "" : "rotate(180deg)";
        }
        const vol = pair.volume?.[activeTf];
        if (typeof vol === "number") set("sx-vol", formatMarketCap(vol));
        const liq = pair.liquidity;
        if (liq && typeof liq.usd === "number") {
            set("sx-liq", formatMarketCap(liq.usd));
            const sym = pair.quoteToken?.symbol || "SOL";
            set("sx-liq-sol", typeof liq.quote === "number" ? "(" + liq.quote.toFixed(2) + " " + sym + ")" : "");
            set("sx-quote", sym);
        }
        if (typeof pair.marketCap === "number") set("sx-mc", formatMarketCap(pair.marketCap));
        set("sx-ath", formatMarketCap(athValue));
    }
    document.addEventListener("DOMContentLoaded", function () {
        document.querySelectorAll("#sx-tf button").forEach(function (b) {
            b.addEventListener("click", function () {
                document.querySelectorAll("#sx-tf button").forEach(function (x) { x.classList.remove("on"); });
                b.classList.add("on"); activeTf = b.dataset.tf; renderStats();
            });
        });
        /* the "All / Pump.fun / Top traders" group behaves like a radio group */
        document.querySelectorAll(".hx-group .holders-chip").forEach(function (chip) {
            chip.addEventListener("click", function () {
                chip.closest(".hx-group").querySelectorAll(".holders-chip").forEach(function (c) { c.classList.remove("active"); });
                chip.classList.add("active");
            });
        });
    });

    async function loadToken(query) {
        if (!query) return;
        try {
            const res = await fetch(`https://api.dexscreener.com/latest/dex/search?q=${encodeURIComponent(query)}`);
            const data = await res.json();
            const pair = data?.pairs?.[0];
            if (!pair) return;
            const base = pair.baseToken || {};
            const logo = pair.info?.imageUrl?.replace("_50x50", "_512x512") || base.logo || "https://images.pump.fun/coin-image/placeholder.png";
            const name = base.name || query;
            const nameEl = document.getElementById("token-name");
            if (nameEl) nameEl.textContent = name.length > 24 ? name.slice(0, 21) + "..." : name;
            const ticker = base.symbol || "---";
            const tickerEl = document.getElementById("token-ticker");
            if (tickerEl) tickerEl.textContent = ticker.length > 10 ? ticker.slice(0, 10) + "..." : ticker;
            if (base.address) {
                const shortAddress = base.address.slice(0, 6) + "..." + base.address.slice(-4);
                const headerAddress = base.address.slice(0, 4) + "…" + base.address.slice(-4);
                const caEl = document.getElementById("token-ca");
                if (caEl) { caEl.textContent = headerAddress; caEl.dataset.fullAddress = base.address; }
                const caShortEl = document.getElementById("ca-short");
                if (caShortEl) caShortEl.textContent = shortAddress;
                const caLink = document.getElementById("token-ca-link");
                if (caLink) caLink.href = `https://solscan.io/token/${base.address}`;
                updateChartEmbed(base.address);
            }
            document.querySelectorAll("#coin-logo, #coin-logo-bg, #coin-summary-logo").forEach(img => {
                img.onerror = () => img.src = "https://images.pump.fun/coin-image/placeholder.png";
                img.src = logo;
            });
            const marketCap = typeof pair.marketCap === "number" ? pair.marketCap : null;
            const marketCapEl = document.getElementById("summary-market-cap");
            if (marketCap !== null && marketCapEl) {
                marketCapEl.textContent = formatMarketCap(marketCap);
                marketCapEl.classList.remove('market-cap-positive', 'market-cap-negative', 'market-cap-neutral');
                marketCapEl.classList.add(
                    previousMarketCap === null || marketCap === previousMarketCap ? 'market-cap-neutral'
                    : marketCap > previousMarketCap ? 'market-cap-positive' : 'market-cap-negative');
            }
            updateHeaderExtras(pair, marketCap);
            const price = pair.priceUsd ? parseFloat(pair.priceUsd) : null;
            if (price !== null) {
                const priceText = "$" + formatPrice(price);
                const priceEl = document.getElementById("price-value");
                if (priceEl) priceEl.textContent = priceText;
                const summaryPrice = document.getElementById("summary-price");
                if (summaryPrice) summaryPrice.textContent = priceText;
            }
            const volume24h = pair.volume?.h24 ? parseFloat(pair.volume.h24) : null;
            if (volume24h !== null) {
                const volumeText = "$" + formatMarketCap(volume24h).replace('$', '');
                const volumeEl = document.getElementById("volume-24h-value");
                if (volumeEl) volumeEl.textContent = volumeText;
                const summaryVolume = document.getElementById("summary-volume");
                if (summaryVolume) summaryVolume.textContent = volumeText;
            }
            const liquidity = typeof pair.liquidity?.usd === "number" ? pair.liquidity.usd : null;
            const summaryLiquidity = document.getElementById("summary-liquidity");
            if (summaryLiquidity && liquidity !== null) summaryLiquidity.textContent = "$" + formatMarketCap(liquidity).replace('$', '');
            const updateChange = (id, value) => {
                const el = document.getElementById(id);
                if (el && value !== undefined) {
                    const change = parseFloat(value).toFixed(2);
                    el.textContent = (change > 0 ? "+" : "") + change + "%";
                    el.className = change >= 0 ? "text-green-400" : "text-red-400";
                }
            };
            updateChange("price-change-5m", pair.priceChange?.m5);
            updateChange("price-change-1h", pair.priceChange?.h1);
            updateChange("price-change-6h", pair.priceChange?.h6);
            previousMarketCap = marketCap;
        } catch (err) {
            console.error("Error loading token data:", err);
        }
    }

    function formatMarketCap(value) {
        if (typeof value !== "number") return "N/A";
        if (value >= 1e9) return "$" + (value / 1e9).toFixed(2) + "B";
        if (value >= 1e6) return "$" + (value / 1e6).toFixed(2) + "M";
        if (value >= 1e3) return "$" + (value / 1e3).toFixed(2) + "K";
        return "$" + value.toFixed(2);
    }

    function formatPrice(value) {
        if (typeof value !== "number") return "0.00";
        if (value < 0.000001) return value.toExponential(4);
        if (value < 0.001) return value.toFixed(8);
        if (value < 1) return value.toFixed(6);
        return value.toFixed(4);
    }

function toggleStreamPlay() {
  const video = document.getElementById('stream-video');
  if (!video) return;
  const pauseIcon = document.getElementById('pause-icon');
  const playIcon = document.getElementById('play-icon');
  if (video.paused) {
    video.play();
    if (pauseIcon) pauseIcon.style.display = '';
    if (playIcon) playIcon.style.display = 'none';
  } else {
    video.pause();
    if (pauseIcon) pauseIcon.style.display = 'none';
    if (playIcon) playIcon.style.display = '';
  }
}
function toggleStreamMute() {
  const video = document.getElementById('stream-video');
  if (!video) return;
  video.muted = !video.muted;
  if (!video.muted && video.volume === 0) video.volume = 0.7;
  const volume = document.getElementById('stream-volume');
  if (volume) volume.value = video.muted ? 0 : video.volume;
  const onIcon = document.getElementById('sound-on-icon');
  const offIcon = document.getElementById('sound-off-icon');
  if (onIcon) onIcon.style.display = video.muted ? 'none' : '';
  if (offIcon) offIcon.style.display = video.muted ? '' : 'none';
}
function toggleStreamFullscreen() {
  const video = document.getElementById('stream-video');
  const container = video && video.closest('.group');
  if (!container) return;
  if (document.fullscreenElement) document.exitFullscreen?.();
  else container.requestFullscreen?.();
}
function toggleQualityMenu() {
  const dd = document.getElementById('quality-dropdown');
  if (dd) dd.style.display = dd.style.display === 'none' ? 'block' : 'none';
}
function setQuality(q) {
  ['Auto','1080p','720p','480p','360p'].forEach(function(k){
    const el = document.getElementById('q-' + k.toLowerCase());
    if (el) el.style.display = 'none';
  });
  const sel = document.getElementById('q-' + q.toLowerCase());
  if (sel) sel.style.display = 'inline';
  const dd = document.getElementById('quality-dropdown');
  if (dd) dd.style.display = 'none';
}
function toggleMiniPlayer() {
  const video = document.getElementById('stream-video');
  if (!video) return;
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture?.();
  } else {
    video.requestPictureInPicture?.().catch(function(){});
  }
}
document.addEventListener('click', function(e) {
  const wrap = document.getElementById('quality-menu-wrap');
  const dd = document.getElementById('quality-dropdown');
  if (dd && wrap && !wrap.contains(e.target)) dd.style.display = 'none';
});
document.addEventListener('DOMContentLoaded', function() {
  const video = document.getElementById('stream-video');
  const volume = document.getElementById('stream-volume');
  if (video && volume) { video.volume = Number(volume.value); volume.addEventListener('input', function() {
    video.volume = Number(volume.value);
    video.muted = video.volume === 0;
  });
  }
});
    function updateUTCTime() {
        const timeEl = document.getElementById("utc-time");
        if (timeEl) timeEl.textContent = new Date().toUTCString().split(' ')[4] + ' UTC';
    }

    if (tokenSlug) {
        loadToken(tokenSlug);
        refreshInterval = setInterval(() => loadToken(tokenSlug), 30000);
        setInterval(updateUTCTime, 1000);
        updateUTCTime();
    }
    window.addEventListener("beforeunload", function() {
        if (refreshInterval) clearInterval(refreshInterval);
    });