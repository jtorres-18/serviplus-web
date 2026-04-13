async function loadServiceDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"), 10);
  const root = document.getElementById("detail-root");

  const res = await fetch("./data/services.json");
  const services = await res.json();
  const s = services.find((item) => item.id === id);

  if (!s || Number.isNaN(id)) {
    root.innerHTML =
      '<p class="detail-error">No se encontró el servicio.</p><p><a href="services.html">Volver al catálogo</a></p>';
    return;
  }

  const defaultIncluded = [
    "Professional service delivery",
    "Unlimited revisions",
    "24/7 customer support",
    "Money-back guarantee",
  ];
  const includedList = s.included && s.included.length ? s.included : defaultIncluded;
  const includedHtml = includedList
    .map(
      (line) => `
    <li class="detail-included__item">
      <span class="detail-included__check" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      <span>${line}</span>
    </li>`
    )
    .join("");

  const ratingBlock =
    s.rating != null && s.reviewCount != null
      ? `<span class="detail-rating-inline"><span class="detail-star" aria-hidden="true">★</span> ${s.rating} <span class="detail-review-count">(${s.reviewCount} reviews)</span></span>`
      : "";

  const favOn = typeof isFavorite === "function" && isFavorite(s.id);

  document.title = `${s.name} — ServiPlus`;
  root.innerHTML = `
    <article class="detail-card detail-card--mockup">
      <div class="detail-grid">
        <div class="detail-media">
          <img src="${s.image}" alt="">
        </div>
        <div class="detail-body">
          <div class="detail-head-row">
            <span class="detail-badge">${s.category}</span>
            ${ratingBlock}
          </div>
          <h1 id="detail-title">${s.name}</h1>
          <p class="detail-price detail-price--hero">${s.price}</p>
          <hr class="detail-rule" />
          <h2 class="detail-section-title">Description</h2>
          <p class="detail-description">${s.description}</p>
          <hr class="detail-rule" />
          <h2 class="detail-section-title">What's Included:</h2>
          <ul class="detail-included">${includedHtml}</ul>
          <div class="detail-actions detail-actions--mockup">
            <a href="contact.html" class="btn-contact-provider">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 4h16v16H4V4zm2 4l8 5 8-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              Contact Provider
            </a>
            <button type="button" class="fav-heart-btn detail-fav-heart${favOn ? " is-favorite" : ""}" data-favorite-id="${s.id}" aria-pressed="${favOn}" aria-label="${favOn ? "Quitar de favoritos" : "Guardar en favoritos"}" onclick="toggleFavoriteFromBtn(this, event)">${FAVORITE_HEART_SVG}</button>
          </div>
        </div>
      </div>
    </article>
  `;
}

if (document.getElementById("detail-root")) {
  loadServiceDetail();
}
