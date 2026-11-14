/* ── Reliable muted autoplay (desktop + mobile) ── */
(function () {
  var v = document.getElementById('stream-video');
  if (!v) return;
  v.muted = true; v.defaultMuted = true; v.setAttribute('muted', ''); v.setAttribute('playsinline', '');
  function syncIcons() {
    var p = document.getElementById('pause-icon'), pl = document.getElementById('play-icon');
    if (p) p.style.display = v.paused ? 'none' : '';
    if (pl) pl.style.display = v.paused ? '' : 'none';
  }
  function tryPlay() {
    if (!v.paused) return;
    var pr = v.play();
    if (pr && pr.catch) pr.catch(function () {});
  }
  ['loadedmetadata', 'loadeddata', 'canplay', 'canplaythrough'].forEach(function (e) { v.addEventListener(e, tryPlay); });
  v.addEventListener('play', syncIcons); v.addEventListener('pause', syncIcons);
  tryPlay();
  window.addEventListener('load', tryPlay);
  window.addEventListener('pageshow', tryPlay);
  document.addEventListener('visibilitychange', function () { if (!document.hidden) tryPlay(); });
  /* fallback: browsers that block autoplay start it on the first interaction */
  ['touchstart', 'pointerdown', 'click', 'keydown', 'scroll'].forEach(function (e) {
    window.addEventListener(e, function once() {
      tryPlay();
      if (!v.paused) window.removeEventListener(e, once, true);
    }, { capture: true, passive: true });
  });
  /* retry a few times in case the first attempt is rejected */
  var n = 0, t = setInterval(function () { tryPlay(); if (!v.paused || ++n > 20) clearInterval(t); }, 500);
})();