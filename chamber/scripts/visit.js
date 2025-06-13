const sidebar = document.querySelector(".visit-message");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
  sidebar.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const diff = now - Number(lastVisit);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days < 1) {
    sidebar.textContent = "Back so soon! Awesome!";
  } else if (days === 1) {
    sidebar.textContent = "You last visited 1 day ago.";
  } else {
    sidebar.textContent = `You last visited ${days} days ago.`;
  }
}
localStorage.setItem("lastVisit", now);
