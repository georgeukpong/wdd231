/* ===============================
   1. Load Contact Info
================================ */
async function loadContactInfo() {
  try {
    const res = await fetch('data/contact-info.json');
    const data = await res.json();

    const container = document.getElementById('contact-info');
    if (!container) return;

    container.innerHTML = `
      <h2>Contact Information</h2>
      <p><strong>Name:</strong> ${data.office.name}</p>
      <p><strong>Email:</strong> <a href="mailto:${data.office.email}">${data.office.email}</a></p>
      <p><strong>Phone:</strong> <a href="tel:${data.office.phone}">${data.office.phone}</a></p>
      <p><strong>Address:</strong> ${data.office.address}</p>
      <h3>Business Hours</h3>
      <ul>
        <li><strong>Mon–Fri:</strong> ${data.office.hours.mondayToFriday}</li>
        <li><strong>Saturday:</strong> ${data.office.hours.saturday}</li>
        <li><strong>Sunday:</strong> ${data.office.hours.sunday}</li>
      </ul>
    `;
  } catch (err) {
    console.error('Could not load contact info:', err);
    document.getElementById('contact-info').innerHTML =
      '<p class="error">Unable to load contact information.</p>';
  }
}

/* ===============================
   2. Load Staff Profiles
================================ */
async function loadStaffProfiles() {
  try {
    const res = await fetch('data/staff.json');
    const team = await res.json();

    const grid = document.getElementById('team-grid');
    if (!grid) return;

    grid.innerHTML = ''; // Clear any placeholder

    team.forEach(member => {
      const figure = document.createElement('figure');
      figure.innerHTML = `
        <img src="${member.image}" alt="${member.alt}" loading="lazy">
        <figcaption>${member.name}<br><small>${member.title}</small></figcaption>
      `;
      grid.appendChild(figure);
    });
  } catch (err) {
    console.error('Could not load staff profiles:', err);
  }
}

/* ===============================
   3. Contact Form Validation
================================ */
function setupContactForm() {
  const form = document.getElementById('contactForm');
  const thankYou = document.getElementById('thank-you');

  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }

    // Simulate successful submission
    form.reset();
    thankYou?.classList.remove('hidden');
    setTimeout(() => thankYou?.classList.add('hidden'), 5000);
  });
}

/* ===============================
   4. Init on DOM Ready
================================ */
document.addEventListener('DOMContentLoaded', () => {
  loadContactInfo();
  loadStaffProfiles();
  setupContactForm();
});
