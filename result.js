// Get data from localStorage
const fans = JSON.parse(localStorage.getItem("fans") || "[]");
const notFollowing = JSON.parse(localStorage.getItem("notFollowing") || "[]");

// Update stats
document.getElementById("stats").textContent =
  `Fans: ${fans.length} • Not Following: ${notFollowing.length}`;
document.getElementById("fansCount").textContent = fans.length;
document.getElementById("notFollowingCount").textContent = notFollowing.length;

// Generate color for avatar
function colorFromName(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `hsl(${Math.abs(hash) % 360},70%,50%)`;
}

// Create avatar
function createAvatar(u) {
  const d = document.createElement("div");
  d.className = "avatar";
  d.style.background = colorFromName(u);
  d.textContent = u[0].toUpperCase();
  return d;
}

// Render users in table
function render(list, tableId) {
  const table = document.getElementById(tableId);
  list.forEach(u => {
    const r = document.createElement("tr");

    const uCell = document.createElement("td");
    uCell.className = "user-cell";
    uCell.appendChild(createAvatar(u));
    uCell.append(u);

    const lCell = document.createElement("td");
    const a = document.createElement("a");
    a.href = "https://instagram.com/" + u;
    a.target = "_blank";
    a.textContent = "Visit";
    a.className = "profile-btn";
    lCell.appendChild(a);

    r.append(uCell, lCell);
    table.appendChild(r);
  });
}

// Render both tabs
render(fans, "fansTable");
render(notFollowing, "notFollowingTable");

/* Tabs */
document.querySelectorAll(".tab").forEach(tab => {
  tab.onclick = () => {
    document.querySelectorAll(".tab,.tab-content").forEach(e => e.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  };
});

/* Search */
document.getElementById("searchBox").addEventListener("input", e => {
  const v = e.target.value.toLowerCase();
  document.querySelectorAll(".tab-content.active tr").forEach((r, i) => {
    if (i === 0) return;
    r.style.display = r.textContent.toLowerCase().includes(v) ? "" : "none";
  });
});

/* Dark mode */
if (localStorage.getItem("theme") === "dark") document.body.classList.add("dark");
document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
};

/* Reset */
document.getElementById("resetBtn").onclick = () => {
  localStorage.clear();
  window.location.href = "index.html";
};
