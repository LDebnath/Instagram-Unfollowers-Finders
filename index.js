function extractUsers(html, type) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const set = new Set();

  if (type === "followers") {
    doc.querySelectorAll('a[target="_blank"]').forEach(a => {
      const u = a.textContent.trim();
      if (u) set.add(u);
    });
  } else {
    doc.querySelectorAll("h2").forEach(h => {
      const u = h.textContent.trim();
      if (u) set.add(u);
    });
  }
  return [...set];
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const f1 = document.getElementById("followersFile").files[0];
    const f2 = document.getElementById("followingFile").files[0];

    if (!f1 || !f2) {
      alert("Upload both files");
      return;
    }

    try {
      const [followersHTML, followingHTML] = await Promise.all([f1.text(), f2.text()]);

      const followers = extractUsers(followersHTML, "followers");
      const following = extractUsers(followingHTML, "following");

      const fans = followers.filter(u => !following.includes(u));
      const notFollowing = following.filter(u => !followers.includes(u));

      localStorage.setItem("fans", JSON.stringify(fans));
      localStorage.setItem("NotFollowing", JSON.stringify(notFollowing));

      window.location.href = "result.html"; // navigate to result page
    } catch (err) {
      console.error(err);
      alert("Error reading files. Please try again.");
    }
  });
});
