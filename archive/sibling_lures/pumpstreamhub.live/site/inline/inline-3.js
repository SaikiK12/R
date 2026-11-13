document.addEventListener('click', function (e) {
  var btn = e.target.closest('.sf-btn');
  document.querySelectorAll('.sf-group.open').forEach(function (g) { if (!btn || g !== btn.parentNode) g.classList.remove('open'); });
  if (btn && window.matchMedia('(min-width:1024px)').matches) {
    var g = btn.parentNode; g.classList.toggle('open'); btn.setAttribute('aria-expanded', g.classList.contains('open'));
  }
});