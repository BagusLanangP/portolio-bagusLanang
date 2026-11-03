/* =========================================================
   MAIN — nav mengikuti warna bab, menu mobile, reveal bertahap,
   tab pengalaman, jam Bali, drift foto
   ========================================================= */

(function () {
  const nav = document.querySelector(".nav");
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Menu mobile
  function setMenu(open) {
    links.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  toggle.addEventListener("click", () => setMenu(!links.classList.contains("open")));
  links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });

  // Nav mengambil warna bab yang sedang berada di bawahnya
  const chapters = Array.from(document.querySelectorAll("[data-chapter]")).filter((el) => el !== nav);
  function syncNav() {
    const y = nav.offsetHeight / 2;
    const current = chapters.find((el) => {
      const r = el.getBoundingClientRect();
      return r.top <= y && r.bottom > y;
    });
    if (current && nav.dataset.chapter !== current.dataset.chapter) {
      nav.dataset.chapter = current.dataset.chapter;
    }
  }

  // Foto about: drift pelan mengikuti scroll
  const photo = document.querySelector(".about-photo img");
  function driftPhoto() {
    if (!photo || reduceMotion) return;
    const r = photo.parentElement.getBoundingClientRect();
    const vh = window.innerHeight;
    if (r.bottom < 0 || r.top > vh) return;
    const p = (r.top + r.height / 2 - vh / 2) / vh; // -1 .. 1
    photo.style.transform = `translateY(${(p * -28).toFixed(1)}px) scale(1.08)`;
  }

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      syncNav();
      driftPhoto();
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  syncNav();
  driftPhoto();

  // Reveal: heading → teks → gambar, bertahap 90ms per anak
  document
    .querySelectorAll(".stats, .skills-grid, .achieve-list, .cert-grid, .tool-grid, [data-stagger]")
    .forEach((group) => {
      Array.from(group.children).forEach((child, i) => {
        child.classList.add("reveal");
        child.style.setProperty("--d", `${i * 90}ms`);
      });
    });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // Elemen yang sudah terlewati (scroll cepat / loncat anchor) juga ditampilkan
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
  );

  // Dipanggil juga oleh project-grid.js setelah kartu dirender ulang
  window.observeReveals = function () {
    document.querySelectorAll(".reveal:not(.in)").forEach((el) => io.observe(el));
  };
  window.observeReveals();

  // Tab pengalaman: klik atau panah kiri/kanan untuk pindah
  document.querySelectorAll("[data-tabs]").forEach((root) => {
    const tabs = Array.from(root.querySelectorAll('[role="tab"]'));
    const panels = Array.from(root.querySelectorAll('[role="tabpanel"]'));

    function select(i, focus) {
      tabs.forEach((t, ti) => {
        const active = ti === i;
        t.classList.toggle("is-active", active);
        t.setAttribute("aria-selected", String(active));
        t.tabIndex = active ? 0 : -1;
      });
      panels.forEach((p, pi) => {
        const active = pi === i;
        p.classList.toggle("is-active", active);
        p.hidden = !active;
      });
      if (focus) tabs[i].focus();
    }

    tabs.forEach((t, i) => {
      t.addEventListener("click", () => select(i, false));
      t.addEventListener("keydown", (e) => {
        const keys = ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"];
        if (!keys.includes(e.key)) return;
        e.preventDefault();
        const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1;
        select((i + step + tabs.length) % tabs.length, true);
      });
    });
  });

  // Jam Bali (WITA) — berbeda tiap kunjungan
  const clock = document.getElementById("baliTime");
  if (clock) {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Makassar",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const tick = () => (clock.textContent = `${fmt.format(new Date())} WITA`);
    tick();
    setInterval(tick, 30000);
  }
})();
