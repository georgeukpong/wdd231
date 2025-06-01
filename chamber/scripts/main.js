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

  // Set timestamp if field is present
const timestampField = document.getElementById("timestamp");
if (timestampField) {
  timestampField.value = new Date().toISOString();
}

// Modal open buttons
document.querySelectorAll("button[data-modal]").forEach(button => {
  button.addEventListener("click", () => {
    const modal = document.getElementById(button.dataset.modal);
    if (modal) modal.style.display = "block";
  });
});

// Modal close buttons
document.querySelectorAll(".modal .close").forEach(closeBtn => {
  closeBtn.addEventListener("click", () => {
    closeBtn.closest(".modal").style.display = "none";
  });
});

// Close modal on outside click
window.addEventListener("click", event => {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
});

