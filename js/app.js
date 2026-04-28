// ❤️ SVG reutilizable para todos los botones de favoritos
const FAVORITE_HEART_SVG = `
<svg class="fav-heart-svg" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
  <path class="fav-heart-path"
    d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
</svg>`;

// 📦 Obtener favoritos
function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

// 🔍 Verificar si es favorito
function isFavorite(id) {
  return getFavorites().includes(id);
}

// ❤️ Toggle desde botón
function toggleFavoriteFromBtn(btn, event) {
  if (event) event.preventDefault();

  const id = parseInt(btn.dataset.favoriteId);
  let favorites = getFavorites();

  if (favorites.includes(id)) {
    favorites = favorites.filter(f => f !== id);
    btn.classList.remove("is-favorite");
    btn.setAttribute("aria-pressed", "false");
    btn.setAttribute("aria-label", "Guardar en favoritos");
  } else {
    favorites.push(id);
    btn.classList.add("is-favorite");
    btn.setAttribute("aria-pressed", "true");
    btn.setAttribute("aria-label", "Quitar de favoritos");
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
}

// 🔄 Inicializar corazones en toda la página
function initFavoriteHeartsInDocument() {
  document.querySelectorAll(".fav-heart-btn").forEach(btn => {
    const id = parseInt(btn.dataset.favoriteId);

    const active = isFavorite(id);

    btn.classList.toggle("is-favorite", active);
    btn.setAttribute("aria-pressed", active);

    // 🔥 Asegura que el SVG esté dentro del botón
    if (!btn.innerHTML.trim()) {
      btn.innerHTML = FAVORITE_HEART_SVG;
    }
  });
}