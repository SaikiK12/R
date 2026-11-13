(function () {
  var preloader = document.getElementById('preloader');
  if (!preloader) return;
  function hide() { setTimeout(function () { preloader.classList.add('hide'); }, 1800); }
  if (document.readyState === 'complete') hide();
  else window.addEventListener('load', hide);
})();