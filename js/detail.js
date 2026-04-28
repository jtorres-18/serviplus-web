async function loadServiceDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  const root = document.getElementById("detail-root");
  if (!root) return;

  const res = await fetch("./data/services.json");
  const services = await res.json();

  const s = services.find(x => x.id === id);

  if (!s) {
    root.innerHTML = "<p>Servicio no encontrado</p>";
    return;
  }

  const favOn = isFavorite(s.id);

  root.innerHTML = `
    <div class="detail-card">
      <img src="${s.image}" alt="${s.name}">

      <h1>${s.name}</h1>
      <p>${s.description}</p>

      <p><strong>Precio:</strong> $${s.price}</p>
      <p>⭐ ${s.rating} (${s.reviewCount})</p>

      <button 
        class="fav-heart-btn ${favOn ? "is-favorite" : ""}"
        data-favorite-id="${s.id}"
        onclick="toggleFavoriteFromBtn(this, event)">
        ❤
      </button>

      <br><br>
      <a href="services.html">← Volver</a>
    </div>
  `;

  initFavoriteHeartsInDocument();
}

if (document.getElementById("detail-root")) {
  loadServiceDetail();
}