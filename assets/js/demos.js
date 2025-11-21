// assets/js/demos.js
// Animaciones de scroll + FAQ básico

document.addEventListener("DOMContentLoaded", () => {
  // Reveal
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  // FAQ toggle
  document.querySelectorAll("[data-faq-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const parent = btn.closest(".demo-faq-item");
      parent.classList.toggle("open");
      const body = parent.querySelector(".demo-faq-body");
      if (!body) return;
      const expanded = parent.classList.contains("open");
      body.style.display = expanded ? "block" : "none";
      btn.setAttribute("aria-expanded", String(expanded));
    });
  });
});
