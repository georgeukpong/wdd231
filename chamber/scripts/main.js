// Set current year in footer
document.getElementById("copyright-year-footer").textContent = new Date().getFullYear();

// Set last modified date in footer
const lastModified = new Date(document.lastModified);
document.getElementById("last-modified-footer").textContent = lastModified.toLocaleString();

// Toggle mobile menu
const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");

menuToggle?.addEventListener("click", () => {
  mainNav.classList.toggle("open");
});

// Auto close nav on resize
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    mainNav.classList.remove("open");
  }
});


