// --- MENU MOBILE ---
const burger = document.querySelector(".burger");
const mobileMenu = document.getElementById("menu-mobile");

// Si no existe la hamburguesa, no hacemos nada
if (burger && mobileMenu) {
  
  burger.addEventListener("click", () => {
    const isOpen = burger.getAttribute("aria-expanded") === "true";

    burger.setAttribute("aria-expanded", String(!isOpen));
    mobileMenu.hidden = isOpen;

    // Animación
    mobileMenu.style.display = isOpen ? "none" : "block";
    mobileMenu.classList.toggle("open");
  });

  // Cerrar el menú si se hace clic fuera
  document.addEventListener("click", (e) => {
    if (!mobileMenu.contains(e.target) && !burger.contains(e.target)) {
      mobileMenu.hidden = true;
      burger.setAttribute("aria-expanded", "false");
      mobileMenu.classList.remove("open");
      mobileMenu.style.display = "none";
    }
  });
}
