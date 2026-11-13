/* ── Hot callouts: live coin logo / name / symbol / market cap ──
   Each .co-card has data-coin="<coin name, ticker or contract address>". */
(function () {
  var cache = {};
  function pickPair(pairs, q) {
    pairs = (pairs || []).filter(function (p) { return p.chainId === 'solana'; });
    var isCA = q.length > 30;
    if (isCA) {
      var hit = pairs.filter(function (p) { return p.baseToken && p.baseToken.address === q; });
      if (hit.length) pairs = hit;
    } else {
      var l = q.toLowerCase();
      var exact = pairs.filter(function (p) {
        return p.baseToken && (p.baseToken.symbol.toLowerCase() === l || p.baseToken.name.toLowerCase() === l);
      });
      if (exact.length) pairs = exact;
    }
    pairs.sort(function (a, b) { return ((b.liquidity && b.liquidity.usd) || 0) - ((a.liquidity && a.liquidity.usd) || 0); });
    return pairs[0] || null;
  }
  function fetchCoin(q) {
    if (!cache[q]) {
      cache[q] = fetch('https://api.dexscreener.com/latest/dex/search?q=' + encodeURIComponent(q))
        .then(function (r) { return r.json(); })
        .then(function (d) { return pickPair(d && d.pairs, q); })
        .catch(function () { return null; });
    }
    return cache[q];
  }
  function applyCard(card, pair) {
    if (!pair) return;
    var base = pair.baseToken || {};
    var post = card.closest('.co-post');
    var cn = card.querySelector('.co-cn');
    if (cn) {
      var b = cn.querySelector('b'); if (b) b.textContent = (base.symbol || '').slice(0, 12);
      var nm = cn.querySelector('span:not(.co-tag)'); if (nm) nm.textContent = (base.name || '').slice(0, 26);
    }
    var logo = pair.info && pair.info.imageUrl;
    var ci = card.querySelector('.co-ci');
    if (ci && logo) {
      var img = new Image(); img.alt = base.symbol || '';
      img.onload = function () { ci.textContent = ''; ci.style.background = 'none'; ci.appendChild(img); };
      img.src = logo.replace('_50x50', '_512x512');
    }
    var mc = typeof pair.marketCap === 'number' ? pair.marketCap : (typeof pair.fdv === 'number' ? pair.fdv : null);
    var mcEl = post && post.querySelector('.co-mc');
    if (mc !== null && mcEl) {
      var bb = mcEl.querySelector('b'); if (bb) bb.textContent = formatMarketCap(mc);
      mcEl.classList.toggle('blue', mc >= 100000);
    }
  }
  function refresh(bust) {
    var cards = document.querySelectorAll('.callouts-col .co-card[data-coin]');
    cards.forEach(function (card, i) {
      setTimeout(function () {
        var q = card.getAttribute('data-coin');
        if (bust) delete cache[q];
        fetchCoin(q).then(function (pair) { applyCard(card, pair); });
      }, i * 250);
    });
  }
  document.addEventListener('DOMContentLoaded', function () {
    refresh(false);
    setInterval(function () { refresh(true); }, 60000);
  });
})();