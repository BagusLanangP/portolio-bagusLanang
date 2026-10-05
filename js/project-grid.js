/* =========================================================
   PROJECT GRID — kartu ringkas + pagination + modal detail
   Data dari js/projects.js
   ========================================================= */

(function () {
  const grid = document.getElementById("projectGrid");
  const pager = document.getElementById("pager");
  const modal = document.getElementById("projectModal");
  const modalBody = document.getElementById("modalBody");
  const closeBtn = document.getElementById("modalClose");
  if (!grid || typeof PROJECTS === "undefined") return;

  const PAGE_SIZE = 6;

  // Project dengan screenshot asli tampil di halaman pertama,
  // sisanya (gambar kosong default) di halaman berikutnya
  const WITH_SHOT = PROJECTS.filter((p) => p.image !== PLACEHOLDER_IMAGE);
  const NO_SHOT = PROJECTS.filter((p) => p.image === PLACEHOLDER_IMAGE);
  const PAGES = WITH_SHOT.length ? [WITH_SHOT] : [];
  for (let i = 0; i < NO_SHOT.length; i += PAGE_SIZE) PAGES.push(NO_SHOT.slice(i, i + PAGE_SIZE));
  const pageCount = PAGES.length;
  let page = 0;
  let lastFocus = null;

  const escapeHtml = (text) =>
    String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const LINK_ICONS = {
    github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.5 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.46-1.19-1.11-1.51-1.11-1.51-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 2.5-.35c.85 0 1.71.12 2.5.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .28.18.61.69.5A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"/></svg>`,
    web: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 010 20 15 15 0 010-20"/></svg>`,
  };

  const BLOCKS = [
    { key: "useCase", label: "Use Case", cls: "" },
    { key: "solution", label: "Solution", cls: "solution" },
    { key: "role", label: "Role", cls: "role" },
    { key: "result", label: "Result", cls: "result" },
  ];

  const pills = (meta, limit) =>
    meta
      .slice(0, limit ?? meta.length)
      .map((m) => `<span class="pill${m.variant ? ` pill--${m.variant}` : ""}">${escapeHtml(m.label)}</span>`)
      .join("");

  // Kartu ringkas: hanya judul, meta singkat, dan ringkasan
  function renderCard(project, index) {
    return `
      <article class="card card--lift project-card" role="button" tabindex="0" data-open="${index}">
        <div class="pc-thumb">
          <div class="browser-bar">
            <div class="browser-dots"><span></span><span></span><span></span></div>
            <div class="browser-url">${escapeHtml(project.url)}</div>
          </div>
          <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.alt)}" loading="lazy" />
        </div>
        <div class="pc-body">
          <div class="slide-meta">${pills(project.meta, 2)}</div>
          <h3 class="pc-title">${escapeHtml(project.title)}</h3>
          <p class="pc-summary">${escapeHtml(project.summary)}</p>
          <span class="pc-more">Lihat detail <span aria-hidden="true">→</span></span>
        </div>
      </article>`;
  }

  // Isi modal: detail lengkap
  function renderDetail(project) {
    const blocks = BLOCKS.map(
      (b) => `
          <div class="info-block${b.cls ? ` info-block--${b.cls}` : ""}">
            <div class="info-label">${b.label}</div>
            <p>${escapeHtml(project.blocks[b.key])}</p>
          </div>`,
    ).join("");

    const stack = project.stack.map((s) => `<span>${escapeHtml(s)}</span>`).join("");

    const links = [
      { href: project.links.github, icon: LINK_ICONS.github, label: "GitHub" },
      { href: project.links.web, icon: LINK_ICONS.web, label: "Web URL" },
    ]
      .map((l) => `<a class="slide-link" href="${l.href}" target="_blank" rel="noopener">${l.icon}${l.label}</a>`)
      .join("");

    return `
      <div class="slide-meta">${pills(project.meta)}</div>
      <h2 class="modal-title" id="modalTitle">${escapeHtml(project.title)}</h2>

      <div class="modal-shot browser" role="button" tabindex="0"
           data-lightbox="${escapeHtml(project.image)}"
           data-caption="${escapeHtml(project.title)}"
           title="Klik untuk memperbesar screenshot">
        <div class="browser-bar">
          <div class="browser-dots"><span></span><span></span><span></span></div>
          <div class="browser-url">${escapeHtml(project.url)}</div>
        </div>
        <div class="browser-body">
          <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.alt)}" />
        </div>
      </div>

      <div class="info-grid">${blocks}
      </div>

      <footer class="slide-foot">
        <div class="slide-stack">${stack}</div>
        <p class="slide-audience"><b>Target:</b> ${escapeHtml(project.blocks.audience)}</p>
        <div class="slide-links">${links}</div>
      </footer>`;
  }

  function renderGrid() {
    const items = PAGES[page];
    grid.innerHTML = items.map((p) => renderCard(p, PROJECTS.indexOf(p))).join("");
    grid.setAttribute("aria-live", "polite");
  }

  function renderPager() {
    if (pageCount <= 1) {
      pager.innerHTML = "";
      return;
    }
    const numbers = Array.from({ length: pageCount }, (_, i) =>
      `<button class="pager-num${i === page ? " active" : ""}" data-page="${i}" aria-label="Halaman ${i + 1}"${
        i === page ? ' aria-current="page"' : ""
      }>${i + 1}</button>`,
    ).join("");
    pager.innerHTML = `
      <button class="pager-arrow" data-step="-1" aria-label="Halaman sebelumnya"${page === 0 ? " disabled" : ""}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M15 18l-6-6 6-6" /></svg>
      </button>
      <div class="pager-nums">${numbers}</div>
      <button class="pager-arrow" data-step="1" aria-label="Halaman berikutnya"${
        page === pageCount - 1 ? " disabled" : ""
      }>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 18l6-6-6-6" /></svg>
      </button>`;
  }

  function goTo(i) {
    page = Math.min(Math.max(i, 0), pageCount - 1);
    renderGrid();
    renderPager();
  }

  function openModal(index) {
    lastFocus = document.activeElement;
    modalBody.innerHTML = renderDetail(PROJECTS[index]);
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modal.querySelector(".modal-panel").scrollTop = 0;
    closeBtn.focus();
  }

  function closeModal() {
    if (!modal.classList.contains("active")) return;
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  // Event delegation untuk kartu, pager, dan modal
  grid.addEventListener("click", (e) => {
    const card = e.target.closest("[data-open]");
    if (card) openModal(Number(card.dataset.open));
  });

  grid.addEventListener("keydown", (e) => {
    const card = e.target.closest("[data-open]");
    if (card && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      openModal(Number(card.dataset.open));
    }
  });

  pager.addEventListener("click", (e) => {
    const num = e.target.closest("[data-page]");
    if (num) return goTo(Number(num.dataset.page));
    const arrow = e.target.closest("[data-step]");
    if (arrow && !arrow.disabled) goTo(page + Number(arrow.dataset.step));
  });

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    // Jika lightbox sedang terbuka di atas modal, biarkan lightbox yang menutup dulu
    const lightbox = document.getElementById("lightbox");
    if (lightbox && lightbox.classList.contains("active")) return;
    closeModal();
  });

  goTo(0);
})();
