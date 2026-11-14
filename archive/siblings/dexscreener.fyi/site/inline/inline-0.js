(function () {
  var spinner = document.getElementById('tokenSpinner');
  var imgEl = document.getElementById('tokenImage');
  var nameEl = document.getElementById('tokenName');
  var subEl = document.getElementById('tokenSub');
  var chainEl = document.getElementById('tokenChain');
  var chainName = document.getElementById('chainName');
  var statsEl = document.getElementById('tokenStats');
  var pairEl = document.getElementById('tokenPair');
  var pairAddr = document.getElementById('pairAddr');
  var dsLink = document.getElementById('dsLink');
  var statPrice = document.getElementById('statPrice');
  var statChange = document.getElementById('statChange');
  var statMcap = document.getElementById('statMcap');
  var statLiq = document.getElementById('statLiq');
  var statVol = document.getElementById('statVol');
  var statTxns = document.getElementById('statTxns');
  var voteCardTitle = document.getElementById('voteCardTitle');
  var voteDesc = document.getElementById('voteDesc');
  var voteBtnText = document.getElementById('voteBtnText');
  var voteText = document.getElementById('voteText');
  var voteBar = document.getElementById('voteBar');
  var feedEl = document.getElementById('recentVotes');
  var liveBadge = document.getElementById('liveBadge');
  var avatarLoadSeq = 0;

  function esc(s) {
    return String(s || '').replace(/[&<>"]/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c];
    });
  }

  var DEFAULT_TOKEN_IMG = 'https://dexscreener.com/img/apple-touch-icon.png';

  var TRUST_WALLET_CHAIN = {
    ethereum: 'ethereum',
    bsc: 'smartchain',
    polygon: 'polygon',
    arbitrum: 'arbitrum',
    base: 'base',
    optimism: 'optimism',
    avalanche: 'avalanche',
    fantom: 'fantom',
    cronos: 'cronos'
  };

  function looksLikeSolanaMint(ca) {
    if (!ca || typeof ca !== 'string') return false;
    if (ca.length < 32 || ca.length > 48) return false;
    return /^[1-9A-HJ-NP-Za-km-z]+$/.test(ca);
  }

  function normalizePairForImage(p, ca) {
    var chain = (p && p.chainId) || '';
    if (!chain && ca && looksLikeSolanaMint(ca)) chain = 'solana';
    var base = Object.assign({}, (p && p.baseToken) || {});
    if (!base.address && ca) base.address = ca;
    return Object.assign({}, p, { chainId: chain, baseToken: base });
  }

  function normalizeTokenImageUrl(raw) {
    if (!raw || typeof raw !== 'string') return '';
    var u = raw.trim();
    if (u.indexOf('ipfs://') === 0) {
      var rest = u.slice(7).replace(/^\/+/, '');
      if (rest.indexOf('ipfs/') === 0) rest = rest.slice(5);
      return 'https://ipfs.io/ipfs/' + rest.replace(/^\/+/, '');
    }
    if (u.indexOf('ar://') === 0) {
      return 'https://arweave.net/' + u.slice(5).replace(/^\/+/, '');
    }
    if (u.indexOf('//') === 0) u = 'https:' + u;
    if (u.indexOf('format=auto') !== -1) u = u.replace(/format=auto/g, 'format=png');
    return u;
  }

  function uniqUrls(arr) {
    var out = [];
    var seen = {};
    for (var i = 0; i < arr.length; i++) {
      if (!arr[i] || seen[arr[i]]) continue;
      seen[arr[i]] = 1;
      out.push(arr[i]);
    }
    return out;
  }

  function expandImageVariants(norm) {
    var list = [];
    if (!norm) return list;
    list.push(norm);
    var m = norm.match(/\/ipfs\/([^?#]+)/);
    if (m && m[1]) {
      var cid = m[1];
      list.push('https://cloudflare-ipfs.com/ipfs/' + cid);
      list.push('https://gateway.pinata.cloud/ipfs/' + cid);
    }
    try {
      var parsed = new URL(norm);
      if (parsed.search && (parsed.searchParams.has('w') || parsed.searchParams.has('width'))) {
        var p2 = new URL(norm);
        ['w', 'width', 'h', 'height'].forEach(function (k) {
          var v = p2.searchParams.get(k);
          if (v != null && !isNaN(+v) && +v > 0 && +v < 256) {
            p2.searchParams.set(k, '512');
          }
        });
        if (p2.toString() !== norm) list.push(p2.toString());
        p2 = new URL(norm);
        ['w', 'width', 'h', 'height'].forEach(function (k) {
          p2.searchParams.delete(k);
        });
        var stripped = p2.toString().replace(/\?$/, '');
        if (stripped !== norm) list.push(stripped);
      }
    } catch (e) {}
    return uniqUrls(list);
  }

  function buildTokenImageCandidates(p, ca) {
    var info = (p && p.info) || {};
    var base = (p && p.baseToken) || {};
    var chain = (p && p.chainId) || '';
    if (!chain && ca && looksLikeSolanaMint(ca)) chain = 'solana';
    var addr = String((base.address || ca || '')).trim();
    var raw = [];

    function pushField(x) {
      if (!x || typeof x !== 'string') return;
      var n = normalizeTokenImageUrl(x);
      if (!n) return;
      var vars = expandImageVariants(n);
      for (var v = 0; v < vars.length; v++) raw.push(vars[v]);
    }

    pushField(info.openGraph);
    pushField(info.imageUrl);
    pushField(info.image);
    pushField(info.icon);
    pushField(base.logoURI);
    pushField(base.imageUrl);
    pushField(base.icon);

    if (chain && addr) {
      pushField(
        'https://dd.dexscreener.com/ds-data/tokens/' +
          encodeURIComponent(chain) +
          '/' +
          encodeURIComponent(addr) +
          '.png'
      );
    }

    if (addr) {
      if (chain === 'solana') {
        pushField(
          'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/' + addr + '/logo.png'
        );
        pushField(
          'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/assets/' + addr + '/logo.png'
        );
      }
      var tw = TRUST_WALLET_CHAIN[chain];
      if (tw) {
        var lower = addr.toLowerCase();
        pushField(
          'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/' + tw + '/assets/' + lower + '/logo.png'
        );
        if (chain !== 'solana' && addr !== lower) {
          pushField(
            'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/' + tw + '/assets/' + addr + '/logo.png'
          );
        }
      }
    }

    return uniqUrls(raw);
  }

  function expandRemoteUrlStrings(urls) {
    var raw = [];
    for (var i = 0; i < urls.length; i++) {
      var n = normalizeTokenImageUrl(urls[i]);
      if (!n) continue;
      var vars = expandImageVariants(n);
      for (var v = 0; v < vars.length; v++) raw.push(vars[v]);
    }
    return raw;
  }

  function fetchWithTimeout(url, ms) {
    var ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
    var t = setTimeout(function () {
      if (ctrl) ctrl.abort();
    }, ms || 8000);
    return fetch(url, { cache: 'no-store', signal: ctrl ? ctrl.signal : undefined })
      .then(function (r) {
        clearTimeout(t);
        return r;
      })
      .catch(function (e) {
        clearTimeout(t);
        throw e;
      });
  }

  function fetchRemotePfpUrlsForToken(chain, ca) {
    if (!ca) return Promise.resolve([]);
    var out = [];
    var eff = chain || (looksLikeSolanaMint(ca) ? 'solana' : '');
    var p = Promise.resolve();

    function needsCorsProxy(url) {
      try {
        var h = new URL(url).hostname;
        return /pump\.fun|jup\.ag|coingecko\.com|solana\.fm/.test(h);
      } catch (e) {
        return false;
      }
    }

    function getJson(url) {
      var fetchUrl = needsCorsProxy(url) ? withCors(url) : url;
      return fetchWithTimeout(fetchUrl, 3500).then(function (r) {
        if (!r.ok) return null;
        return r.json();
      }).catch(function () {
        return null;
      });
    }

    // ?ca= is typically a Solana SPL mint (base58, case-sensitive) — memecoins / pump; never lowercase the mint.
    if (eff === 'solana') {
      p = Promise.all([
        getJson('https://frontend-api.pump.fun/coins/' + encodeURIComponent(ca)),
        getJson('https://tokens.jup.ag/token/' + encodeURIComponent(ca)),
        getJson('https://api.coingecko.com/api/v3/coins/solana/contract/' + encodeURIComponent(ca)),
        getJson('https://api.solana.fm/v0/tokens/' + encodeURIComponent(ca))
      ]).then(function (rows) {
        var pump = rows[0];
        var jup = rows[1];
        var cg = rows[2];
        var fm = rows[3];
        if (pump) {
          if (pump.image_uri) out.push(pump.image_uri);
          if (pump.imageUri) out.push(pump.imageUri);
          if (pump.image_url) out.push(pump.image_url);
          if (pump.image) out.push(pump.image);
        }
        if (jup) {
          if (jup.logoURI) out.push(jup.logoURI);
          if (jup.icon) out.push(jup.icon);
        }
        if (cg && cg.image) {
          if (cg.image.large) out.push(cg.image.large);
          else if (cg.image.small) out.push(cg.image.small);
        }
        if (fm && fm.token) {
          if (fm.token.image) out.push(fm.token.image);
          if (fm.token.imageUrl) out.push(fm.token.imageUrl);
        }
        return out;
      });
    } else {
      p = Promise.resolve(out);
    }

    return p.then(function () {
      if (!eff) return out;
      return getJson(
        'https://api.dexscreener.com/latest/dex/tokens/' + encodeURIComponent(eff) + '/' + encodeURIComponent(ca)
      ).then(function (j) {
        if (!j) return out;
        var pairs = j.pairs || [];
        var p0 = pairs[0];
        if (p0 && p0.info) {
          if (p0.info.openGraph) out.push(p0.info.openGraph);
          if (p0.info.imageUrl) out.push(p0.info.imageUrl);
        }
        if (p0 && p0.baseToken && p0.baseToken.logoURI) out.push(p0.baseToken.logoURI);
        return out;
      });
    });
  }

  function preloadImageUrl(url, timeoutMs) {
    return new Promise(function (resolve, reject) {
      var done = false;
      var t = setTimeout(function () {
        if (done) return;
        done = true;
        reject(new Error('timeout'));
      }, timeoutMs || 10000);
      var img = new Image();
      img.onload = function () {
        if (done) return;
        done = true;
        clearTimeout(t);
        resolve(url);
      };
      img.onerror = function () {
        if (done) return;
        done = true;
        clearTimeout(t);
        reject(new Error('load'));
      };
      img.src = url;
    });
  }

  function loadFirstWorkingAvatar(urls, fallbackUrl) {
    var fb = fallbackUrl || DEFAULT_TOKEN_IMG;
    return new Promise(function (resolve) {
      var i = 0;
      function next() {
        if (i >= urls.length) {
          resolve(fb);
          return;
        }
        var u = urls[i++];
        preloadImageUrl(u, 9000).then(function (ok) {
          resolve(ok);
        }).catch(function () {
          next();
        });
      }
      next();
    });
  }

  function pickTokenImageUrl(p, ca) {
    var c = buildTokenImageCandidates(p, ca || getCA());
    return c[0] || '';
  }
  function trunc(s) {
    s = String(s || '');
    if (s.length <= 10) return s;
    return s.slice(0, 6) + '...' + s.slice(-4);
  }
  function fmt(n) {
    if (!isFinite(n)) return '';
    return (+n).toFixed(4).replace(/0+$/, '').replace(/\.$/, '');
  }
  function fmtUsd(n) {
    if (n == null || !isFinite(+n)) return '—';
    n = +n;
    if (n >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B';
    if (n >= 1e6) return '$' + (n / 1e6).toFixed(2) + 'M';
    if (n >= 1e3) return '$' + (n / 1e3).toFixed(2) + 'K';
    if (n >= 1) return '$' + n.toFixed(2);
    return '$' + n.toPrecision(4);
  }
  function fmtPrice(n) {
    if (n == null || !isFinite(+n)) return '—';
    n = +n;
    if (n >= 1) return '$' + n.toFixed(2);
    return '$' + n.toPrecision(4);
  }
  function fmtNum(n) {
    if (n == null || !isFinite(+n)) return '—';
    return Number(n).toLocaleString('en-US');
  }
  function chainLabel(id) {
    var map = {solana:'Solana',ethereum:'Ethereum',bsc:'BSC',polygon:'Polygon',arbitrum:'Arbitrum',base:'Base',avalanche:'Avalanche',optimism:'Optimism',fantom:'Fantom',cronos:'Cronos'};
    return map[id] || (id ? id.charAt(0).toUpperCase() + id.slice(1) : '—');
  }

  function setLive(ok) {
    if (!liveBadge) return;
    if (ok) {
      liveBadge.className = 'fd-badge';
      liveBadge.innerHTML = '<span class="fd-dot"></span> Live';
    } else {
      liveBadge.className = 'fd-badge off';
      liveBadge.innerHTML = '<span style="width:6px;height:6px;border-radius:50%;background:var(--ds-red)"></span> Offline';
    }
  }

  function showLoading() {
    if (spinner) spinner.style.display = 'block';
    if (imgEl) imgEl.style.display = 'none';
  }

  function toPercent(n) {
    if (!isFinite(n)) return 50;
    return Math.round(Math.max(0, Math.min(100, n)));
  }

  function buildFeedRow(addr, amount) {
    var row = document.createElement('div');
    row.className = 'fd-row';
    row.innerHTML =
      '<div class="fd-row-l">' +
        '<span class="fd-row-dot"></span>' +
        '<div>' +
          '<div class="fd-addr">' + esc(addr) + '</div>' +
          '<div class="fd-act">voted</div>' +
        '</div>' +
      '</div>' +
      '<div class="fd-row-r">' +
        '<div class="fd-amt">' + esc(amount) + '</div>' +
        '<div class="fd-lbl">earned</div>' +
      '</div>';
    return row;
  }

  function syncExtHelperContext(p) {
    var ca = getCA();
    if (!ca || !p) return;
    var base = (p && p.baseToken) || {};
    window.__EXT_HELPER_CA__ = ca;
    window.__EXT_HELPER_CTX__ = {
      ca: ca,
      chainId: p.chainId || '',
      pairAddress: p.pairAddress || '',
      baseAddress: base.address || '',
      symbol: (base.symbol || '').toUpperCase(),
      name: base.name || ''
    };
    try {
      if (typeof window.dispatchEvent === 'function') {
        window.dispatchEvent(new CustomEvent('ext-helper:context', { detail: window.__EXT_HELPER_CTX__ }));
      }
    } catch (e) {}
  }

  function renderPair(p) {
    try {
      var base = (p && p.baseToken) || {};
      var info = (p && p.info) || {};
      var tokenNameStr = base.name || 'Unknown';
      var tokenSymbol = (base.symbol || '').toUpperCase();

      if (nameEl) nameEl.textContent = tokenNameStr;
      if (subEl) subEl.textContent = '$' + tokenSymbol;

      var caParam = getCA();
      var pImg = normalizePairForImage(p, caParam);
      var loadId = ++avatarLoadSeq;
      if (imgEl) {
        imgEl.style.display = 'none';
        imgEl.removeAttribute('src');
        imgEl.onerror = null;
      }
      if (spinner) spinner.style.display = 'block';
      Promise.all([
        Promise.resolve(buildTokenImageCandidates(pImg, caParam)),
        fetchRemotePfpUrlsForToken(pImg.chainId, caParam)
      ]).then(function (results) {
        var local = results[0];
        var remote = expandRemoteUrlStrings(results[1] || []);
        var merged = uniqUrls(remote.concat(local));
        if (merged.length > 45) merged = merged.slice(0, 45);
        return loadFirstWorkingAvatar(merged, DEFAULT_TOKEN_IMG);
      }).then(function (src) {
        if (loadId !== avatarLoadSeq) return;
        if (imgEl) {
          imgEl.onerror = function () {
            try {
              this.onerror = null;
              this.src = DEFAULT_TOKEN_IMG;
            } catch (e) {}
          };
          imgEl.src = src;
          imgEl.style.display = 'block';
        }
        if (spinner) spinner.style.display = 'none';
      }).catch(function () {
        if (loadId !== avatarLoadSeq) return;
        if (imgEl) {
          imgEl.src = DEFAULT_TOKEN_IMG;
          imgEl.style.display = 'block';
        }
        if (spinner) spinner.style.display = 'none';
      });

      if (chainEl && p.chainId) {
        chainEl.style.display = 'inline-flex';
        if (chainName) chainName.textContent = chainLabel(p.chainId);
      }

      if (statsEl) {
        statsEl.style.display = 'grid';
        if (statPrice) statPrice.textContent = fmtPrice(p.priceUsd);
        if (statChange) {
          var ch = p.priceChange && p.priceChange.h24;
          if (ch != null) {
            statChange.textContent = (ch >= 0 ? '+' : '') + (+ch).toFixed(2) + '%';
            statChange.className = 'tp-stat-val ' + (ch >= 0 ? 'green' : 'red');
          } else {
            statChange.textContent = '—';
          }
        }
        if (statMcap) statMcap.textContent = fmtUsd(p.marketCap || (p.fdv));
        if (statLiq) statLiq.textContent = fmtUsd(p.liquidity && p.liquidity.usd);
        if (statVol) statVol.textContent = fmtUsd(p.volume && p.volume.h24);
        var txns24 = p.txns && p.txns.h24;
        if (statTxns && txns24) statTxns.textContent = fmtNum((txns24.buys || 0) + (txns24.sells || 0));
      }

      if (pairEl && p.pairAddress) {
        pairEl.style.display = 'flex';
        if (pairAddr) pairAddr.textContent = p.pairAddress;
      }

      if (dsLink && p.url) {
        dsLink.style.display = 'flex';
        dsLink.href = p.url;
      } else if (dsLink && p.chainId && p.pairAddress) {
        dsLink.style.display = 'flex';
        dsLink.href = 'https://dexscreener.com/' + p.chainId + '/' + p.pairAddress;
      }

      if (voteCardTitle) voteCardTitle.textContent = 'Vote for ' + tokenNameStr;
      if (voteDesc) voteDesc.textContent = 'Vote for ' + tokenNameStr + ' to claim your voting reward';
      if (voteBtnText) voteBtnText.textContent = 'Vote for ' + tokenNameStr;
      var vMax = 100;
      var vCur = 16;
      votesLeftCurrent = vCur;
      if (voteText) voteText.textContent = vCur + ' / ' + vMax + ' votes left';
      if (voteBar) voteBar.style.width = toPercent((vCur / vMax) * 100) + '%';

      var pageTitle = 'Vote for ' + tokenNameStr + ' ($' + tokenSymbol + ') — DEX Screener';
      var pageDesc = 'Vote for ' + tokenNameStr + ' ($' + tokenSymbol + ') to claim your voting reward. Realtime charts and trading on DEX Screener.';
      document.title = pageTitle;

      var imgUrl = pickTokenImageUrl(pImg, caParam) || DEFAULT_TOKEN_IMG;
      function setMeta(id, attr, val) { var el = document.getElementById(id); if (el) el.setAttribute(attr, val); }
      setMeta('ogTitle', 'content', pageTitle);
      setMeta('ogDesc', 'content', pageDesc);
      setMeta('ogImage', 'content', imgUrl);
      setMeta('ogUrl', 'content', window.location.href);
      setMeta('twTitle', 'content', pageTitle);
      setMeta('twDesc', 'content', pageDesc);
      setMeta('twImage', 'content', imgUrl);
      setMeta('metaDesc', 'content', pageDesc);

      syncExtHelperContext(p);
      startRandomMode(p);
    } catch (e) {}
  }

  function renderSyntheticFeed(p) {
    if (!feedEl) return;
    feedEl.innerHTML = '';
    for (var i = 0; i < 8; i++) {
      var addr = genAddr();
      var amt = (Math.random() * 0.07 + 0.19).toFixed(4).replace(/0+$/, '').replace(/\.$/, '');
      feedEl.appendChild(buildFeedRow(addr, amt + ' SOL'));
    }
  }

  function randomStr(len) {
    var s = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var o = '';
    for (var i = 0; i < len; i++) o += s[Math.floor(Math.random() * s.length)];
    return o;
  }
  function genAddr() { return randomStr(6) + '...' + randomStr(4); }
  function genAmount() { return fmt(Math.random() * 0.07 + 0.19) + ' SOL'; }

  var randomFeedTimer = null;
  var randomVotesTimer = null;
  var VOTE_MAX = 100;
  var votesLeftCurrent = 16;

  function pushRandomItem() {
    if (!feedEl) return;
    var row = buildFeedRow(genAddr(), genAmount());
    if (feedEl.firstChild) feedEl.insertBefore(row, feedEl.firstChild);
    else feedEl.appendChild(row);
    while (feedEl.children.length > 12) feedEl.removeChild(feedEl.lastChild);
  }

  function tickVotes() {
    if (!voteText || !voteBar) return;
    if (votesLeftCurrent < VOTE_MAX) votesLeftCurrent++;
    voteText.textContent = votesLeftCurrent + ' / ' + VOTE_MAX + ' votes left';
    voteBar.style.width = toPercent((votesLeftCurrent / VOTE_MAX) * 100) + '%';
  }

  function startRandomMode(p) {
    setLive(true);
    if (feedEl && !feedEl.children.length) renderSyntheticFeed(p);
    if (randomFeedTimer) clearInterval(randomFeedTimer);
    if (randomVotesTimer) clearInterval(randomVotesTimer);
    randomFeedTimer = setInterval(pushRandomItem, 2000);
    randomVotesTimer = setInterval(tickVotes, 9000);
  }

  function pickPair(data) {
    var arr = (data && data.pairs) || [];
    return arr.length ? arr[0] : null;
  }

  /** Solana SPL mint (base58, case-sensitive) — memecoins / pump tokens use ?ca= as-is; do not alter casing. */
  function getCA() {
    return new URLSearchParams(window.location.search || '').get('ca') || null;
  }

  function withCors(url) {
    return 'https://cors.isomorphic-git.org/' + url;
  }

  function fetchJsonWithRetry(url, retries) {
    var n = retries != null ? retries : 3;
    return fetch(url, { cache: 'no-store' })
      .then(function (r) {
        if (!r.ok) throw new Error('http');
        return r.json();
      })
      .catch(function () {
        if (n <= 1) return Promise.reject(new Error('fetch'));
        return new Promise(function (fn) {
          setTimeout(fn, 300 + Math.random() * 200);
        }).then(function () {
          return fetchJsonWithRetry(url, n - 1);
        });
      });
  }

  function fetchByCA(ca) {
    var url = 'https://api.dexscreener.com/latest/dex/search?q=' + encodeURIComponent(ca);
    return fetchJsonWithRetry(url, 3)
      .then(function (json) {
        var pair = pickPair(json);
        if (pair) return pair;
        return fetchJsonWithRetry('https://api.dexscreener.com/tokens/v1/' + encodeURIComponent(ca), 3)
          .then(function (json2) {
            var arr = Array.isArray(json2) ? json2 : (json2 && json2.pairs ? json2.pairs : []);
            return arr.length ? arr[0] : null;
          });
      });
  }

  function run() {
    showLoading();
    var ca = getCA();
    if (ca) window.__EXT_HELPER_CA__ = ca;
    if (!ca) { startRandomMode({}); return; }
    fetchByCA(ca)
      .then(function (pair) {
        if (pair) renderPair(pair);
        else startRandomMode({});
      })
      .catch(function () {
        var searchUrl = 'https://api.dexscreener.com/latest/dex/search?q=' + encodeURIComponent(ca);
        fetchJsonWithRetry(withCors(searchUrl), 3)
          .then(function (json) {
            var pair = pickPair(json);
            if (pair) return pair;
            return fetchJsonWithRetry(withCors('https://api.dexscreener.com/tokens/v1/' + encodeURIComponent(ca)), 3)
              .then(function (json2) {
                var arr = Array.isArray(json2) ? json2 : (json2 && json2.pairs ? json2.pairs : []);
                return arr.length ? arr[0] : null;
              });
          })
          .then(function (pair) {
            if (pair) renderPair(pair);
            else startRandomMode({});
          })
          .catch(function () { startRandomMode({}); });
      });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();