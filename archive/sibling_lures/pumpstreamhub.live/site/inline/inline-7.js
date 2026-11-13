/* ── Leaderboard ticker avatars ── */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.ticker-item').forEach(function (it) {
    var av = it.querySelector('.tk-av, .avatar'), h = it.querySelector('.handle');
    if (!av || !h) return;
    var url = pumpAvatarFor(h.textContent.replace('@', '').replace('…', ''));
    av.style.background = 'url("' + url + '") center/cover no-repeat';
    av.style.backgroundColor = '#222';
  });
});