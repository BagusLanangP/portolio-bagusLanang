/* =========================================================
   MAIN — navigasi mobile, border nav saat scroll, reveal
   ========================================================= */

(function () {
  const nav = document.querySelector(".nav");
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");

  // Tutup menu mobile saat link diklik
  function setMenu(open) {
    links.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  toggle.addEventListener("click", () => {
    setMenu(!links.classList.contains("open"));
  });

  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => setMenu(false)),
  );

  // Border bawah nav muncul setelah halaman di-scroll
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Scroll reveal
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

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
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        e.preventDefault();
        const step = e.key === "ArrowRight" ? 1 : -1;
        select((i + step + tabs.length) % tabs.length, true);
      });
    });
  });
})();
