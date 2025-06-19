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


async function loadFeaturedDishes(limit = null) {
  try {
    const response = await fetch('data/featured-dishes-full.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const dishes = await response.json();
    const dishGrid = document.querySelector('.dish-grid');
    dishGrid.innerHTML = '';

    // Limit the number of dishes if limit is provided
    const displayDishes = limit ? dishes.slice(0, limit) : dishes;

    displayDishes.forEach(dish => {
      const figure = document.createElement('figure');
      const img = document.createElement('img');
      const caption = document.createElement('figcaption');

      img.src = dish.image;
      img.alt = dish.alt;
      img.loading = 'lazy';

      caption.textContent = dish.name;

      figure.appendChild(img);
      figure.appendChild(caption);
      dishGrid.appendChild(figure);
    });
  } catch (error) {
    console.error('Error loading featured dishes:', error);
    document.querySelector('.dish-grid').innerHTML = `<p class="error">Unable to load dishes at the moment.</p>`;
  }
}

// Detect page and load accordingly
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname;

  if (currentPage.includes('menu.html')) {
    loadFeaturedDishes(); // Load all
  } else {
    loadFeaturedDishes(3); // Load only 3 on home page
  }
});
