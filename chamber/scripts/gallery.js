fetch("data/gallery.json")
  .then(response => response.json())
  .then(data => {
    const gallery = document.querySelector(".gallery");

    data.forEach((item, index) => {
      const cardNumber = index + 1;
      const card = document.createElement("div");
      card.classList.add("card");
      card.style.gridArea = `card${cardNumber}`; // Named grid area

      // Build the card's inner HTML
     // Inside your fetch .then(data => { ... }) block

card.innerHTML = `
  <figure>
    <img src="${item.image}" alt="Image of ${item.title}">
  </figure>
  <div class="info"> <h2>${item.title}</h2>
    <p>${item.description}</p>
    <address>${item.address}</address>
  </div>
  <button type="button">Learn More</button>
`;

      gallery.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Failed to load gallery data:", error);
    document.querySelector(".gallery").innerHTML = `<p>Error loading gallery items.</p>`;
  });
