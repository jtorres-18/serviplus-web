function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

function isFavorite(id) {
  return getFavorites().includes(id);
}

function toggleFavoriteFromBtn(btn, event) {
  if (event) event.preventDefault();

  const id = parseInt(btn.dataset.favoriteId);
  let favorites = getFavorites();

  if (favorites.includes(id)) {
    favorites = favorites.filter(f => f !== id);
    btn.classList.remove("is-favorite");
    btn.setAttribute("aria-pressed", "false");
  } else {
    favorites.push(id);
    btn.classList.add("is-favorite");
    btn.setAttribute("aria-pressed", "true");
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function initFavoriteHeartsInDocument() {
  document.querySelectorAll(".fav-heart-btn").forEach(btn => {
    const id = parseInt(btn.dataset.favoriteId);
    if (isFavorite(id)) {
      btn.classList.add("is-favorite");
      btn.setAttribute("aria-pressed", "true");
    }
  });
}