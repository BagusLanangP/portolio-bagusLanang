/* =========================================================
   LIGHTBOX — zoom screenshot project
   Pemicu: elemen dengan atribut data-lightbox
   ========================================================= */

(function () {
  const box = document.getElementById("lightbox");
  if (!box) return;

  const img = box.querySelector("img");
  const caption = box.querySelector("figcaption");
  const closeBtn = box.querySelector(".lightbox-close");

  function open(src, text) {
    img.src = src;
    img.alt = text;
    caption.textContent = text;
    box.classList.add("active");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function close() {
    box.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Event delegation: slide baru yang dirender tetap bisa diklik
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-lightbox]");
    if (trigger) open(trigger.dataset.lightbox, trigger.dataset.caption || "");
  });

  document.addEventListener("keydown", (e) => {
    const trigger = e.target.closest && e.target.closest("[data-lightbox]");
    if (trigger && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      open(trigger.dataset.lightbox, trigger.dataset.caption || "");
    }
    if (e.key === "Escape") close();
  });

  closeBtn.addEventListener("click", close);
  box.addEventListener("click", (e) => {
    if (e.target === box) close();
  });
})();
