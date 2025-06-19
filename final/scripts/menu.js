// NOTE the "async"
async function loadFeaturedDishes() {
  try {
    const response = await fetch('data/menu.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const categories = await response.json();
    const gallery = document.getElementById('menu-gallery');
    if (!gallery) return;

    const active = document.querySelector('.category-filters button.active');
    const selected = active ? active.dataset.category : 'All';

    gallery.innerHTML = '';

    categories.forEach(cat => {
      if (selected !== 'All' && cat.category !== selected) return;

      const h2 = document.createElement('h2');
      h2.textContent = cat.category;
      h2.className = 'category-title';
      gallery.appendChild(h2);

      const wrap = document.createElement('div');
      wrap.className = 'menu-category';

      cat.items.forEach(dish => {
        const card = document.createElement('div');
        card.className = 'menu-card';
        card.innerHTML = `
          <img src="${dish.image}" alt="${dish.alt}" loading="lazy">
          <div class="card-info">
            <h3>${dish.name}</h3>
            <p class="dish-desc">${dish.description || ''}</p>
            <p class="dish-price">${dish.price}</p>
            <div class="card-buttons">
              <button class="order-btn">Order</button>
              <button class="learn-btn" data-dish='${JSON.stringify(dish).replace(/'/g, "&apos;")}'>Learn More</button>
            </div>
          </div>`;
        wrap.appendChild(card);
      });

      gallery.appendChild(wrap);
    });

    document.querySelectorAll('.learn-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const dish = JSON.parse(btn.dataset.dish.replace(/&apos;/g, "'"));
        openModal(dish);
      });
    });

  } catch (err) {
    console.error('Error loading dishes:', err);
    const gallery = document.getElementById('menu-gallery');
    if (gallery) gallery.innerHTML = '<p class="error">Unable to load dishes.</p>';
  }
}

function openModal(dish) {
  const modal = document.getElementById('dish-modal');
  if (!modal) return;

  modal.querySelector('#modal-title').textContent = dish.name;
  modal.querySelector('#modal-img').src = dish.image;
  modal.querySelector('#modal-img').alt = dish.alt;
  modal.querySelector('#modal-desc').textContent = dish.description || 'No description available.';
  modal.querySelector('#modal-price').textContent = dish.price;

  modal.classList.remove('hidden');
}

function closeModal() {
  document.getElementById('dish-modal')?.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.category-filters button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.category-filters button')
        .forEach(b => b.classList.toggle('active', b === btn));
      loadFeaturedDishes();
    });
  });

  document.querySelector('.close-button')?.addEventListener('click', closeModal);

  loadFeaturedDishes();
});
