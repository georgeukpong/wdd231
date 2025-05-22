const directoryContainer = document.getElementById("directory");
const gridBtn = document.getElementById("grid-view");
const listBtn = document.getElementById("list-view");

async function fetchMembers() {
  try {
    const response = await fetch("data/members.json"); // ✅ Updated file name
    const data = await response.json();
    displayMembers(data.members); // ✅ Updated array key
  } catch (error) {
    console.error("Error fetching member data:", error);
  }
}

function displayMembers(members) {
  directoryContainer.innerHTML = ""; // Clear any existing content

  members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("company-card");

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} Logo">
      <h2>${member.name}</h2>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
      <p><strong>Membership:</strong> ${getMembershipLabel(member.membershipLevel)}</p>
      <p><strong>Established:</strong> ${member.established}</p>
      <p>${member.description}</p>
    `;

    directoryContainer.appendChild(card);
  });
}

function getMembershipLabel(level) {
  switch (level) {
    case 3: return "Gold";
    case 2: return "Silver";
    case 1: return "Member";
    default: return "Unknown";
  }
}

// View toggle buttons
gridBtn.addEventListener("click", () => {
  directoryContainer.classList.add("grid-view");
  directoryContainer.classList.remove("list-view");
});

listBtn.addEventListener("click", () => {
  directoryContainer.classList.add("list-view");
  directoryContainer.classList.remove("grid-view");
});

fetchMembers(); // ✅ Updated function name


// Get the current year and update the copyright span
document.getElementById("copyright-year").textContent = new Date().getFullYear();

// Get the last modified date of the document and update the paragraph
document.getElementById("last-modified").textContent = "Last Modification: " + document.lastModified;


const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");

menuToggle.addEventListener("click", () => {
  mainNav.classList.toggle("open");
});

