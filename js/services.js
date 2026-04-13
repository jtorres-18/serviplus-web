async function loadServices() {
  const res = await fetch("./data/services.json");
  const services = await res.json();
  const container = document.getElementById("services-container");
  if (!container) return;

  services.forEach((s) => {
    const ratingRow =
      s.rating != null && s.reviewCount != null
        ? `<span class="card-rating-inline"><span class="fs-card__star" aria-hidden="true">★</span> ${s.rating} <span class="card-reviews">(${s.reviewCount})</span></span>`
        : "";
    const summary = s.cardSummary || s.description;
    const favOn = typeof isFavorite === "function" && isFavorite(s.id);
    container.innerHTML += `
      <div class="card">
        <div class="card-media-wrap">
          <a href="service-detail.html?id=${s.id}"><img src="${s.image}" alt=""></a>
          <button type="button" class="fav-heart-btn card-fav-float${favOn ? " is-favorite" : ""}" data-favorite-id="${s.id}" aria-pressed="${favOn}" aria-label="${favOn ? "Quitar de favoritos" : "Guardar en favoritos"}" onclick="toggleFavoriteFromBtn(this, event)">${FAVORITE_HEART_SVG}</button>
        </div>
        <div class="card-body-pad">
          <div class="card-meta-row">
            <span class="card-meta">${s.category}</span>
            ${ratingRow}
          </div>
          <h3><a href="service-detail.html?id=${s.id}">${s.name}</a></h3>
          <p class="card-summary">${summary}</p>
          <div class="card-footer-row">
            <span class="card-price">${s.price}</span>
            <a href="service-detail.html?id=${s.id}" class="card-view-details">View Details <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
    `;
  });
  if (typeof initFavoriteHeartsInDocument === "function") {
    initFavoriteHeartsInDocument();
  }
}

if (document.getElementById("services-container")) {
  loadServices();
}
