/* ── Trade tab switching ── */
function switchTradeTab(tab) {
  const buyBtn  = document.getElementById('trade-buy-btn');
  const sellBtn = document.getElementById('trade-sell-btn');
  const connectBtn = document.getElementById('trade-connect-btn');
  buyBtn.classList.toggle('is-active', tab === 'buy');
  sellBtn.classList.toggle('is-active', tab === 'sell');
  if (connectBtn) {
    connectBtn.style.background = tab === 'buy' ? '#86efac' : '#fca5a5';
    connectBtn.style.color = tab === 'buy' ? '#0a1a0d' : '#1a0505';
  }
}

/* ── Holders tab switching ── */
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.holders-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      this.closest('.holders-header').querySelectorAll('.holders-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });
  document.querySelectorAll('.holders-chip').forEach(chip => {
    chip.addEventListener('click', function() { this.classList.toggle('active'); });
  });
});