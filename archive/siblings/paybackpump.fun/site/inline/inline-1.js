function openModal() {}
// Close modal on overlay click
document.addEventListener('DOMContentLoaded', function() {
  var modal = document.getElementById('demoModal');
  if (!modal) return;
  var overlay = modal.querySelector('.modal-overlay');
  if (overlay) overlay.addEventListener('click', function() {
    modal.style.display = '';
    modal.classList.remove('active');
    document.body.style.overflow = '';
  });
  // closeModal button
  var closeBtn = document.getElementById('closeModal');
  if (closeBtn) closeBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    modal.style.display = '';
    modal.classList.remove('active');
    document.body.style.overflow = '';
  });
});