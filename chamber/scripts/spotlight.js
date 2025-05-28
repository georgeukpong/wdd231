function loadSpotlights() {
  try {
    // Filter only Gold (3) and Silver (2) members
    const spotlightCandidates = members.filter(m =>
      m.membershipLevel === 3 || m.membershipLevel === 2
    );

    // Shuffle and select 2 or 3 randomly
    const shuffled = spotlightCandidates.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.floor(Math.random() * 2) + 2); // 2 or 3

    const container = document.getElementById('spotlight-container');
    container.innerHTML = '';

    selected.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('spotlight-card');
      card.innerHTML = `
        <h4>${member.name}</h4>
        <p class="tagline">${member.description}</p>
        <img src="images/${member.image}" alt="${member.name} logo">
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
        <p><strong>Level:</strong> ${member.membershipLevel === 3 ? 'Gold' : 'Silver'}</p>
      `;
      container.appendChild(card);
    });

  } catch (error) {
    console.error('Spotlight load error:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadSpotlights);



