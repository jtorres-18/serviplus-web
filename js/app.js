const FAVORITE_HEART_SVG = `<svg class="fav-heart-svg" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path class="fav-heart-path" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`;

function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

function isFavorite(id) {
  return getFavorites().includes(id);
}

function syncFavoriteHeartButtons(id) {
  const on = isFavorite(id);
  document.querySelectorAll(`.fav-heart-btn[data-favorite-id="${id}"]`).forEach((btn) => {
    btn.classList.toggle("is-favorite", on);
    btn.setAttribute("aria-pressed", String(on));
    btn.setAttribute("aria-label", on ? "Quitar de favoritos" : "Guardar en favoritos");
  });
}

function toggleFavoriteFromBtn(btn, ev) {
  if (ev) {
    ev.preventDefault();
    ev.stopPropagation();
  }
  const id = parseInt(btn.getAttribute("data-favorite-id"), 10);
  if (Number.isNaN(id)) return;

  let fav = getFavorites();
  if (fav.includes(id)) {
    fav = fav.filter((x) => x !== id);
  } else {
    fav.push(id);
  }
  localStorage.setItem("favorites", JSON.stringify(fav));
  syncFavoriteHeartButtons(id);

  if (document.getElementById("favorites-container")) {
    loadFavorites();
  }
}

function initFavoriteHeartsInDocument() {
  document.querySelectorAll(".fav-heart-btn[data-favorite-id]").forEach((btn) => {
    const id = parseInt(btn.getAttribute("data-favorite-id"), 10);
    if (!Number.isNaN(id)) {
      btn.classList.toggle("is-favorite", isFavorite(id));
      btn.setAttribute("aria-pressed", String(isFavorite(id)));
    }
  });
}

if (document.getElementById("contactForm")) {
  document.getElementById("contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const nameInput = document.getElementById("fullName") || document.getElementById("name");
    const name = nameInput ? nameInput.value.trim() : "";
    if (name.length < 3) {
      alert(document.getElementById("fullName") ? "Please enter a valid name" : "Nombre inválido");
      return;
    }
    const emailEl = document.getElementById("email");
    if (emailEl && emailEl.required) {
      const email = emailEl.value.trim();
      if (!email || !email.includes("@")) {
        alert("Please enter a valid email address");
        return;
      }
    }
    const msgEl = document.getElementById("message");
    if (msgEl && msgEl.required) {
      const msg = msgEl.value.trim();
      if (msg.length < 5) {
        alert(document.getElementById("fullName") ? "Please enter a message" : "Mensaje demasiado corto");
        return;
      }
    }
    alert(document.getElementById("fullName") ? "Message sent successfully" : "Mensaje enviado correctamente");
  });
}

async function loadFavorites() {
  const res = await fetch("./data/services.json");
  const services = await res.json();
  const fav = getFavorites();
  const container = document.getElementById("favorites-container");
  if (!container) return;

  const filtered = services.filter((s) => fav.includes(s.id));

  if (filtered.length === 0) {
    container.innerHTML =
      '<p class="empty-favorites">No hay favoritos guardados. Explora el <a href="services.html">catálogo de servicios</a> y marca el corazón en cada servicio.</p>';
    container.classList.add("empty-favorites-wrap");
    return;
  }

  container.classList.remove("empty-favorites-wrap");
  container.innerHTML = "";
  filtered.forEach((s) => {
    const ratingRow =
      s.rating != null && s.reviewCount != null
        ? `<span class="card-rating-inline"><span class="fs-card__star" aria-hidden="true">★</span> ${s.rating} <span class="card-reviews">(${s.reviewCount})</span></span>`
        : "";
    const favOn = isFavorite(s.id);
    container.innerHTML += `
      <div class="card">
        <div class="card-media-wrap">
          <a href="service-detail.html?id=${s.id}"><img src="${s.image}" alt=""></a>
          <button type="button" class="fav-heart-btn card-fav-float${favOn ? " is-favorite" : ""}" data-favorite-id="${s.id}" aria-pressed="${favOn}" aria-label="Quitar de favoritos" onclick="toggleFavoriteFromBtn(this, event)">${FAVORITE_HEART_SVG}</button>
        </div>
        <div class="card-body-pad">
          <div class="card-meta-row">
            <span class="card-meta">${s.category}</span>
            ${ratingRow}
          </div>
          <h3><a href="service-detail.html?id=${s.id}">${s.name}</a></h3>
          <p class="card-price">${s.price}</p>
          <a href="service-detail.html?id=${s.id}" class="card-view-details">View Details <span aria-hidden="true">→</span></a>
        </div>
      </div>
    `;
  });
}

if (document.getElementById("favorites-container")) {
  loadFavorites();
}

document.addEventListener("DOMContentLoaded", () => {
  initFavoriteHeartsInDocument();
});
