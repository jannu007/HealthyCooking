(function () {
  const RECIPES = CURATED_RECIPES.concat(generateCombinatorialRecipes());
  const PAGE_SIZE = 24;

  const grid = document.getElementById("recipeGrid");
  const tagFilters = document.getElementById("tagFilters");
  const searchInput = document.getElementById("searchInput");
  const noResult = document.getElementById("noResult");
  const resultInfo = document.getElementById("resultInfo");
  const pagination = document.getElementById("pagination");
  const statsLine = document.getElementById("statsLine");
  const modalOverlay = document.getElementById("modalOverlay");
  const modalContent = document.getElementById("modalContent");
  const modalClose = document.getElementById("modalClose");
  const backToTop = document.getElementById("backToTop");
  const controlsSticky = document.getElementById("controlsSticky");

  let activeTag = "all";
  let searchTerm = "";
  let filteredCache = [];
  let currentPage = 1;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  statsLine.textContent = `現在 ${RECIPES.length.toLocaleString()} 品のレシピを掲載中`;

  // --- reveal-on-scroll ---
  const revealObserver = "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
      )
    : null;

  function observeReveal(el) {
    if (prefersReducedMotion) {
      el.classList.add("is-visible");
      return;
    }
    el.classList.add("reveal");
    if (revealObserver) {
      revealObserver.observe(el);
    } else {
      el.classList.add("is-visible");
    }
  }

  document.querySelectorAll(".reveal").forEach((el) => {
    if (prefersReducedMotion) {
      el.classList.add("is-visible");
    } else if (revealObserver) {
      revealObserver.observe(el);
    } else {
      el.classList.add("is-visible");
    }
  });

  // --- floating leaves decoration ---
  function spawnLeaves() {
    if (prefersReducedMotion) return;
    const field = document.getElementById("leafField");
    const leafEmojis = ["🍃", "🌿", "🍀"];
    const count = window.innerWidth < 600 ? 7 : 14;
    for (let i = 0; i < count; i++) {
      const leaf = document.createElement("span");
      leaf.className = "leaf";
      leaf.textContent = leafEmojis[i % leafEmojis.length];
      leaf.style.left = `${Math.random() * 100}%`;
      leaf.style.animationDuration = `${14 + Math.random() * 12}s`;
      leaf.style.animationDelay = `${Math.random() * -20}s`;
      leaf.style.fontSize = `${0.8 + Math.random() * 1.2}rem`;
      leaf.style.setProperty("--drift", `${(Math.random() * 2 - 1) * 80}px`);
      field.appendChild(leaf);
    }
  }
  spawnLeaves();

  // --- back to top ---
  window.addEventListener("scroll", () => {
    backToTop.hidden = window.scrollY < 600;
  }, { passive: true });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });

  // --- tag filter chips ---
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

  function buildTile(recipe) {
    const card = document.createElement("article");
    card.className = `tile tile-cat-${recipe.category || "vegetable"} reveal`;
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `${recipe.name}の詳細を見る`);

    const tagIcons = recipe.tags
      .slice(0, 2)
      .map((t) => `<span class="tile-tag" title="${HEALTH_TAGS[t].label}">${HEALTH_TAGS[t].icon}</span>`)
      .join("");

    card.innerHTML = `
      <div class="tile-art">
        <span class="tile-blob" aria-hidden="true"></span>
        <span class="tile-emoji">${recipe.emoji}</span>
      </div>
      <div class="tile-body">
        <h3>${recipe.name}</h3>
        <div class="tile-meta">
          <span>⏱ ${recipe.time}</span>
          <span class="tile-tags">${tagIcons}</span>
        </div>
      </div>
    `;

    card.addEventListener("click", () => openModal(recipe));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(recipe);
      }
    });

    return card;
  }

  function totalPages() {
    return Math.max(1, Math.ceil(filteredCache.length / PAGE_SIZE));
  }

  function pageNumberList(current, total) {
    const pages = new Set([1, total, current, current - 1, current + 1]);
    const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
    const out = [];
    let prev = 0;
    sorted.forEach((p) => {
      if (prev && p - prev > 1) out.push("…");
      out.push(p);
      prev = p;
    });
    return out;
  }

  function renderPagination() {
    const total = totalPages();
    pagination.innerHTML = "";
    if (total <= 1) return;

    const makeBtn = (label, page, opts = {}) => {
      const btn = document.createElement("button");
      btn.className = "page-btn" + (opts.active ? " active" : "");
      btn.textContent = label;
      btn.disabled = !!opts.disabled;
      if (!opts.disabled && !opts.ellipsis) {
        btn.addEventListener("click", () => goToPage(page));
      }
      if (opts.ellipsis) {
        btn.className += " ellipsis";
        btn.disabled = true;
      }
      return btn;
    };

    pagination.appendChild(makeBtn("‹ 前へ", currentPage - 1, { disabled: currentPage === 1 }));
    pageNumberList(currentPage, total).forEach((p) => {
      if (p === "…") {
        pagination.appendChild(makeBtn("…", null, { ellipsis: true }));
      } else {
        pagination.appendChild(makeBtn(String(p), p, { active: p === currentPage }));
      }
    });
    pagination.appendChild(makeBtn("次へ ›", currentPage + 1, { disabled: currentPage === total }));
  }

  function renderPage() {
    const total = totalPages();
    currentPage = Math.min(Math.max(1, currentPage), total);

    const start = (currentPage - 1) * PAGE_SIZE;
    const slice = filteredCache.slice(start, start + PAGE_SIZE);

    grid.innerHTML = "";
    slice.forEach((recipe) => {
      const tile = buildTile(recipe);
      grid.appendChild(tile);
      observeReveal(tile);
    });

    noResult.hidden = filteredCache.length !== 0;
    resultInfo.textContent = filteredCache.length
      ? `${filteredCache.length.toLocaleString()}品中 ${(start + 1).toLocaleString()}〜${Math.min(start + PAGE_SIZE, filteredCache.length).toLocaleString()}品目を表示`
      : "";
    renderPagination();
  }

  function goToPage(page) {
    currentPage = page;
    renderPage();
    const top = controlsSticky.getBoundingClientRect().bottom + window.scrollY - 12;
    window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }

  function applyFiltersAndReset() {
    filteredCache = RECIPES.filter(matchesFilters);
    currentPage = 1;
    renderPage();
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
    requestAnimationFrame(() => modalOverlay.classList.add("is-open"));
    document.body.style.overflow = "hidden";
    modalClose.focus();
  }

  function closeModal() {
    modalOverlay.classList.remove("is-open");
    document.body.style.overflow = "";
    const done = () => {
      modalOverlay.hidden = true;
      modalContent.innerHTML = "";
    };
    if (prefersReducedMotion) {
      done();
    } else {
      setTimeout(done, 200);
    }
  }

  tagFilters.addEventListener("click", (e) => {
    const btn = e.target.closest(".tag-chip");
    if (!btn) return;
    activeTag = btn.dataset.tag;
    [...tagFilters.children].forEach((c) => c.classList.toggle("active", c === btn));
    applyFiltersAndReset();
  });

  let searchDebounce;
  searchInput.addEventListener("input", (e) => {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      searchTerm = e.target.value.trim();
      applyFiltersAndReset();
    }, 120);
  });

  modalClose.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modalOverlay.hidden) closeModal();
  });

  buildTagFilters();
  applyFiltersAndReset();
})();
