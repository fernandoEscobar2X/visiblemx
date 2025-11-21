// --- ANIMACIONES "FADE-UP" ---
function revealElements() {
  const elements = document.querySelectorAll(".fade-up");

  const viewportHeight = window.innerHeight;

  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const isVisible = rect.top < viewportHeight - 60;

    if (isVisible) el.classList.add("visible");
  });
}

window.addEventListener("scroll", revealElements, { passive: true });
window.addEventListener("load", revealElements);
