async function loadFavorites() {
  try {
    const res = await fetch("./data/services.json");
    const services = await res.json();

    const container = document.getElementById("favorites-container");
    if (!container) return;

    const favorites = getFavorites();

    const favServices = services.filter(s => favorites.includes(s.id));

    if (favServices.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; width:100%;">
          <p>No tienes servicios en favoritos ❤️</p>
          <a href="services.html">Explorar servicios →</a>
        </div>
      `;
      return;
    }

    let html = "";

    favServices.forEach((s) => {
      const favOn = isFavorite(s.id);

      html += `
        <div class="card">
          <div class="card-media-wrap">
            <a href="service-detail.html?id=${s.id}">
              <img src="${s.image}" alt="${s.name}">
            </a>

            <!-- ❤️ BOTÓN -->
            <button 
              type="button"
              class="fav-heart-btn card-fav-float ${favOn ? "is-favorite" : ""}"
              data-favorite-id="${s.id}"
              aria-pressed="${favOn}"
              aria-label="Quitar de favoritos"
              onclick="handleRemoveFavorite(this, event)"
            >
              ${FAVORITE_HEART_SVG}
            </button>
          </div>

          <div class="card-body-pad">
            <div class="card-meta-row">
              <span class="card-meta">${s.category}</span>
            </div>

            <h3>
              <a href="service-detail.html?id=${s.id}">${s.name}</a>
            </h3>

            <p class="card-summary">${s.cardSummary}</p>

            <div class="card-footer-row">
              <span class="card-price">${s.price}</span>
              <a href="service-detail.html?id=${s.id}" class="card-view-details">
                Ver detalles →
              </a>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

    initFavoriteHeartsInDocument();

  } catch (error) {
    console.error("Error cargando favoritos:", error);
  }
}

function handleRemoveFavorite(btn, event) {
  event.preventDefault();

  const id = Number(btn.dataset.favoriteId);
  toggleFavorite(id);


  loadFavorites();
}

loadFavorites();