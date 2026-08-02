(function () {
  const grid = document.getElementById("recipeGrid");
  const tagFilters = document.getElementById("tagFilters");
  const searchInput = document.getElementById("searchInput");
  const noResult = document.getElementById("noResult");
  const modalOverlay = document.getElementById("modalOverlay");
  const modalContent = document.getElementById("modalContent");
  const modalClose = document.getElementById("modalClose");

  let activeTag = "all";
  let searchTerm = "";

  function buildTagFilters() {
    Object.entries(HEALTH_TAGS).forEach(([key, tag]) => {
      const btn = document.createElement("button");
      btn.className = "tag-chip";
      btn.dataset.tag = key;
      btn.textContent = `${tag.icon} ${tag.label}`;
      tagFilters.appendChild(btn);
    });
  }

  function matchesFilters(recipe) {
    const tagOk = activeTag === "all" || recipe.tags.includes(activeTag);
    if (!tagOk) return false;

    if (!searchTerm) return true;
    const haystack = [recipe.name, ...recipe.ingredients].join(" ").toLowerCase();
    return haystack.includes(searchTerm.toLowerCase());
  }

  function renderGrid() {
    grid.innerHTML = "";
    const filtered = RECIPES.filter(matchesFilters);

    noResult.hidden = filtered.length !== 0;

    filtered.forEach((recipe) => {
      const card = document.createElement("article");
      card.className = "recipe-card";
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `${recipe.name}の詳細を見る`);

      const tagBadges = recipe.tags
        .map((t) => `<span class="badge">${HEALTH_TAGS[t].icon} ${HEALTH_TAGS[t].label}</span>`)
        .join("");

      card.innerHTML = `
        <div class="emoji">${recipe.emoji}</div>
        <h3>${recipe.name}</h3>
        <div class="meta">調理時間 ${recipe.time} ・ ${recipe.ingredients.length}つの食材</div>
        <div class="card-tags">${tagBadges}</div>
      `;

      card.addEventListener("click", () => openModal(recipe));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openModal(recipe);
        }
      });

      grid.appendChild(card);
    });
  }

  function openModal(recipe) {
    const tagBadges = recipe.tags
      .map((t) => `<span class="badge">${HEALTH_TAGS[t].icon} ${HEALTH_TAGS[t].label}</span>`)
      .join("");

    const nutrientBadges = recipe.nutrients
      .map((n) => `<span class="badge accent">${n}</span>`)
      .join("");

    modalContent.innerHTML = `
      <h2 id="modalTitle"><span>${recipe.emoji}</span>${recipe.name}</h2>
      <div class="meta">調理時間 ${recipe.time}</div>
      <div class="card-tags">${tagBadges}</div>

      <section>
        <h4>材料（身近な食材）</h4>
        <ul>${recipe.ingredients.map((i) => `<li>${i}</li>`).join("")}</ul>
      </section>

      <section>
        <h4>作り方</h4>
        <ol>${recipe.steps.map((s) => `<li>${s}</li>`).join("")}</ol>
      </section>

      <section>
        <h4>注目の栄養素</h4>
        <div class="nutrient-list">${nutrientBadges}</div>
      </section>

      <section>
        <h4>食べると体にどんな影響があるの？</h4>
        <div class="effect-box">
          <p class="summary">${recipe.effect.summary}</p>
          <ul>${recipe.effect.details.map((d) => `<li>${d}</li>`).join("")}</ul>
        </div>
      </section>
    `;

    modalOverlay.hidden = false;
    document.body.style.overflow = "hidden";
    modalClose.focus();
  }

  function closeModal() {
    modalOverlay.hidden = true;
    document.body.style.overflow = "";
    modalContent.innerHTML = "";
  }

  tagFilters.addEventListener("click", (e) => {
    const btn = e.target.closest(".tag-chip");
    if (!btn) return;
    activeTag = btn.dataset.tag;
    [...tagFilters.children].forEach((c) => c.classList.toggle("active", c === btn));
    renderGrid();
  });

  searchInput.addEventListener("input", (e) => {
    searchTerm = e.target.value.trim();
    renderGrid();
  });

  modalClose.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modalOverlay.hidden) closeModal();
  });

  buildTagFilters();
  renderGrid();
})();
