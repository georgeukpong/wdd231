document.addEventListener("DOMContentLoaded", function () {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navMenu = document.querySelector("nav");

  hamburgerBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    hamburgerBtn.innerHTML = navMenu.classList.contains("active") ? "&#10006;" : "&#9776;";
  });
});

