function openModal() {
  const panel = document.getElementById("claimInfo");
  panel.hidden = false;
  panel.focus({ preventScroll: true });
  panel.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
    block: "center"
  });
}

(function loadCoin() {
  const coin = document.getElementById("coin");
  const fallback = document.getElementById("coinFallback");
  const sources = ["1.png", "1.webp", "1.jpg", "1.jpeg", "1"];
  let index = 0;

  coin.addEventListener("error", function () {
    index += 1;

    if (index < sources.length) {
      coin.src = sources[index];
    } else {
      coin.style.display = "none";
      fallback.hidden = false;
    }
  });

  coin.src = sources[index];
})();