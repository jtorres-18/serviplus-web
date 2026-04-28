async function loadServices() {
  try {
    const res = await fetch("./data/services.json");
    const services = await res.json();

    const container = document.getElementById("services-container");
    if (!container) return;

    // 🔍 Obtener parámetro de búsqueda
    const params = new URLSearchParams(window.location.search);
    const query = params.get("q")?.toLowerCase() || "";

    // 🔎 Filtrar servicios
    const filteredServices = services.filter((s) => {
      return (
        s.name.toLowerCase().includes(query) ||
        s.category.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query)
      );
    });

    // 🚫 Sin resultados
    if (filteredServices.length === 0) {
      container.innerHTML = `
        <p style="text-align:center; width:100%;">
          No se encontraron servicios para "<strong>${query}</strong>"
        </p>
      `;
      return;
    }

    let html = "";

    filteredServices.forEach((s) => {
      const ratingRow =
        s.rating != null && s.reviewCount != null
          ? `<span class="card-rating-inline">
              <span class="fs-card__star">★</span> 
              ${s.rating} 
              <span class="card-reviews">(${s.reviewCount})</span>
            </span>`
          : "";

      const summary = s.cardSummary || s.description;

      html += `
        <div class="card">
          <div class="card-media-wrap">
            <a href="service-detail.html?id=${s.id}">
              <img src="${s.image}" alt="${s.name}">
            </a>

            <!-- ❤️ BOTÓN FAVORITO -->
            <button 
              class="fav-heart-btn card-fav-float"
              data-favorite-id="${s.id}"
              onclick="toggleFavoriteFromBtn(this, event)">
            </button>

          </div>

          <div class="card-body-pad">
            <div class="card-meta-row">
              <span class="card-meta">${s.category}</span>
              ${ratingRow}
            </div>

            <h3>
              <a href="service-detail.html?id=${s.id}">${s.name}</a>
            </h3>

            <p class="card-summary">${summary}</p>

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

    // 🔥 Render
    container.innerHTML = html;

    // ❤️ Activar corazones (MUY IMPORTANTE)
    initFavoriteHeartsInDocument();

  } catch (error) {
    console.error("Error cargando servicios:", error);
  }
}

// Ejecutar solo si existe el contenedor
if (document.getElementById("services-container")) {
  loadServices();
}