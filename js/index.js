async function loadFeaturedServices() {
  try {
    const res = await fetch("./data/services.json");
    const services = await res.json();

    // 🔥 solo mostramos los primeros 3
    const featured = services.slice(0, 3);

    const container = document.getElementById("featured-container");
    if (!container) return;

    let html = "";

    featured.forEach((s) => {
      html += `
        <article class="fs-card">
          <div class="fs-card__media">
            <img src="${s.image}" alt="${s.name}">
          </div>

          <div class="fs-card__body">
            <div class="fs-card__meta-row">
              <span class="fs-card__category">${s.category}</span>
              <span class="fs-card__rating">
                ★ ${s.rating} (${s.reviewCount})
              </span>
            </div>

            <h3 class="fs-card__name">${s.name}</h3>

            <p class="fs-card__desc">${s.cardSummary}</p>

            <div class="fs-card__footer">
              <span class="fs-card__price">${s.price}</span>
              <a href="service-detail.html?id=${s.id}" class="fs-card__details">
                Ver detalles →
              </a>
            </div>
          </div>
        </article>
      `;
    });

    container.innerHTML = html;
  } catch (error) {
    console.error("Error cargando destacados:", error);
  }
}

loadFeaturedServices();