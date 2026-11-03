/* =========================================================
   GITHUB — grafik kontribusi setahun terakhir (data publik)
   ========================================================= */
(function () {
  const USER = "BagusLanangP";
  const graph = document.getElementById("ghGraph");
  const total = document.getElementById("ghTotal");
  if (!graph) return;

  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function render(data) {
    const days = data.contributions;
    if (!days || !days.length) throw new Error("empty");
    total.textContent = (data.total && data.total.lastYear != null
      ? data.total.lastYear
      : days.reduce((a, d) => a + d.count, 0)
    ).toLocaleString("en-US");

    const frag = document.createDocumentFragment();
    const lead = new Date(days[0].date + "T00:00:00").getDay(); // sel kosong agar kolom mulai Minggu
    for (let i = 0; i < lead; i++) frag.appendChild(document.createElement("b"));

    let lastMonth = -1;
    days.forEach((d, i) => {
      const cell = document.createElement("i");
      cell.className = "l" + d.level;
      cell.title = `${d.count} contribution${d.count === 1 ? "" : "s"} on ${d.date}`;
      const dt = new Date(d.date + "T00:00:00");
      // label bulan di baris pertama kolom (hanya sekali per bulan)
      if (dt.getDay() === 0 || i === 0) {
        const m = dt.getMonth();
        if (m !== lastMonth && dt.getDate() <= 7) {
          cell.dataset.month = MONTHS[m];
          lastMonth = m;
        }
      }
      frag.appendChild(cell);
    });
    graph.replaceChildren(frag);
    // gulir ke kanan agar minggu terbaru terlihat di layar sempit
    graph.parentElement.scrollLeft = graph.parentElement.scrollWidth;
  }

  fetch(`https://github-contributions-api.jogruber.de/v4/${USER}?y=last`)
    .then((r) => {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    })
    .then(render)
    .catch(() => {
      // cadangan: gambar grafik publik
      total.textContent = "";
      graph.outerHTML = `<img class="gh-fallback" src="https://ghchart.rshah.org/0a66ff/${USER}" alt="Kontribusi GitHub ${USER}" loading="lazy" />`;
    });
})();
