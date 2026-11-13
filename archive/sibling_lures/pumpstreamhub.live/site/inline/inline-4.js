/* ── Pump avatar helper: deterministic avatar per username ── */
var PUMP_AVATAR_COUNT = 184;
function pumpAvatarFor(key) {
  var h = 0; key = String(key || '');
  for (var i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return 'avatars/pump-' + String((h % PUMP_AVATAR_COUNT) + 1).padStart(3, '0') + '.jpg';
}
document.addEventListener('DOMContentLoaded', function () {
  /* existing live chat messages */
  document.querySelectorAll('#live-chat-messages img').forEach(function (img) {
    var n = img.parentNode.querySelector('span');
    img.src = pumpAvatarFor(n ? n.textContent : img.alt);
    img.classList.add('object-cover');
  });
  /* hot callouts: avatar circles */
  document.querySelectorAll('.callouts-col .co-post').forEach(function (post) {
    var av = post.querySelector('.co-av'), nm = post.querySelector('.co-who b');
    if (!av) return;
    av.style.backgroundImage = 'url("' + pumpAvatarFor(nm ? nm.textContent : '') + '")';
    av.style.backgroundSize = 'cover'; av.style.backgroundPosition = 'center';
  });
  /* holders table (Dev keeps its own avatar) */
  document.querySelectorAll('.holders-table tbody tr').forEach(function (tr) {
    var av = tr.querySelector('.hx-av'), nm = tr.querySelector('.holder-name');
    if (!av) return;
    av.style.background = 'url("' + pumpAvatarFor(nm ? nm.textContent : '') + '") center/cover no-repeat';
  });
});