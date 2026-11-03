/* =========================================================
   PROJECT CAROUSEL — slide geser + modal detail
   Data dari js/projects.js
   ========================================================= */

(function () {
  const grid = document.getElementById("projectTrack");
  const prevBtn = document.getElementById("carPrev");
  const nextBtn = document.getElementById("carNext");
  const modal = document.getElementById("projectModal");
  const modalBody = document.getElementById("modalBody");
  const closeBtn = document.getElementById("modalClose");
  if (!grid || typeof PROJECTS === "undefined") return;

  // Hanya project dengan screenshot asli yang masuk carousel
  // (sisanya muncul otomatis begitu `image` diisi di projects.js)
  const withShot = PROJECTS.filter((p) => p.image !== PLACEHOLDER_IMAGE);
  const SLIDES = withShot.length ? withShot : PROJECTS;
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

  // Emoji di awal label dibuang: penanda dibawakan oleh teks itu sendiri
  const plain = (label) => label.replace(/^\p{Extended_Pictographic}\uFE0F?\s*/u, "");

  const pills = (meta, limit) =>
    meta
      .slice(0, limit ?? meta.length)
      .map((m) => `<span class="pill${m.variant ? ` pill--${m.variant}` : ""}">${escapeHtml(plain(m.label))}</span>`)
      .join("");

  // Kartu ringkas: hanya judul, meta singkat, dan ringkasan
  // "Nama — keterangan": nama jadi judul, keterangan jadi anak judul
  const splitTitle = (title) => {
    const [name, ...rest] = title.split(" — ");
    return { name, sub: rest.join(" — ") };
  };

  function renderCard(project, index, slideNo) {
    const t = splitTitle(project.title);
    return `
      <article class="slide" role="button" tabindex="0" data-open="${index}" data-tone="${slideNo % 5}"
               aria-label="${escapeHtml(project.title)}">
        <div class="slide-frame">
          <div class="slide-window">
            <img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.alt)}" draggable="false" ${slideNo > 1 ? 'loading="lazy"' : ""} />
          </div>
        </div>
        <div class="slide-caption">
          <div>
            <h3 class="pc-title">${escapeHtml(t.name)}</h3>
            ${t.sub ? `<p class="pc-sub">${escapeHtml(t.sub)}</p>` : ""}
          </div>
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

    const t = splitTitle(project.title);
    return `
      <h2 class="modal-title" id="modalTitle">${escapeHtml(t.name)}</h2>
      ${t.sub ? `<p class="modal-sub">${escapeHtml(t.sub)}</p>` : ""}
      <div class="slide-meta" style="margin-top:12px">${pills(project.meta)}</div>

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
    grid.innerHTML = SLIDES.map((p, i) => renderCard(p, PROJECTS.indexOf(p), i)).join("");
  }

  // ---- Carousel: panah + drag mouse (sentuhan memakai scroll native) ----
  const step = () => {
    const s = grid.firstElementChild;
    return s ? s.offsetWidth + parseFloat(getComputedStyle(grid).columnGap || 0) : 300;
  };

  function updateArrows() {
    const max = grid.scrollWidth - grid.clientWidth - 2;
    prevBtn.disabled = grid.scrollLeft <= 2;
    nextBtn.disabled = grid.scrollLeft >= max;
  }

  let raf = 0;
  grid.addEventListener("scroll", () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(updateArrows);
  });
  window.addEventListener("resize", updateArrows);

  prevBtn.addEventListener("click", () => grid.scrollBy({ left: -step(), behavior: "smooth" }));
  nextBtn.addEventListener("click", () => grid.scrollBy({ left: step(), behavior: "smooth" }));
  grid.addEventListener("keydown", (e) => {
    if (e.target !== grid) return;
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft") prevBtn.click();
  });

  // Drag dengan mouse (sentuhan sudah ditangani scroll native)
  let dragX = 0;
  let startLeft = 0;
  let down = false;
  let moved = false;
  grid.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    down = true;
    moved = false;
    dragX = e.clientX;
    startLeft = grid.scrollLeft;
  });
  window.addEventListener("pointermove", (e) => {
    if (!down) return;
    const dx = e.clientX - dragX;
    if (!moved && Math.abs(dx) > 6) {
      moved = true;
      grid.classList.add("dragging");
    }
    if (moved) grid.scrollLeft = startLeft - dx;
  });
  window.addEventListener("pointerup", () => {
    if (!down) return;
    down = false;
    if (moved) {
      grid.classList.remove("dragging");
      // snap ke slide terdekat setelah drag
      const target = Math.round(grid.scrollLeft / step()) * step();
      grid.scrollTo({ left: target, behavior: "smooth" });
      // cegah klik yang menyusul setelah drag membuka modal
      grid.addEventListener("click", (ev) => ev.stopPropagation(), { capture: true, once: true });
    }
  });

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
    if (!card) return;
    openModal(Number(card.dataset.open));
  });

  grid.addEventListener("keydown", (e) => {
    const card = e.target.closest("[data-open]");
    if (card && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      openModal(Number(card.dataset.open));
    }
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

  renderGrid();
  updateArrows();
})();
