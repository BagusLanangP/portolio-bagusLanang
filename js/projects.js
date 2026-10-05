/* =========================================================
   PROJECTS DATA
   Tambah / ubah project di sini. Grid dirender otomatis
   oleh project-grid.js. `summary` = teks singkat di kartu. Ganti `image` per project jika screenshot
   sudah tersedia (path relatif dari index.html).
   ========================================================= */

const PLACEHOLDER_IMAGE = "assets/img/blank.svg"; // gambar kosong default, untuk project yang belum punya screenshot

const PROJECTS = [
  {
    title: "PlantPal Chatbot — AI Plant Recommendation Assistant",
    url: "plantpal-assistant.app",
    summary: "Chatbot AI untuk rekomendasi tanaman berbasis lokasi dan deteksi tanaman dari foto.",
    image: "assets/img/PlantPal.png",
    alt: "PlantPal Chatbot Screenshot",
    meta: [
      { label: "Lead Developer", variant: "accent" },
      { label: "Team of 10" },
      { label: "🏆 1st Place Capstone", variant: "gold" },
      { label: "2024" },
    ],
    stack: ["FastAPI", "Google Gemini API", "Leaflet", "SQLite", "Python", "Streamlit"],
    blocks: {
      useCase:
        "Gardening and farming shouldn't require an expert in the room. But for most people in Indonesia, knowing what to plant, where, and how is still a guessing game.",
      solution:
        "Built an AI chatbot with natural plant Q&A, location-based recommendations via an interactive map, AI-powered plant detection from photos, and a generated visual for each recommendation.",
      role:
        "Lead Developer — led 10 members remotely through the MSIB RevoU Cloud & AI Program, integrating conversational AI, location intelligence, and image generation into one product.",
      audience: "Local farmers & gardening enthusiasts.",
      result:
        "Won 1st Place at the Capstone Project. Leading 10 people remotely taught that clear communication matters more than perfect code — and for the first time, felt like an engineer who truly builds for people.",
    },
    links: { github: "#", web: "#" },
  },
  {
    title: "AgriVision Badung — Land Use Change Prediction Platform",
    url: "agrivision-badung.app",
    summary: "Platform prediksi perubahan lahan pertanian Badung dengan Random Forest dan CA-Markov.",
    image: "assets/img/Agrivision.png",
    alt: "AgriVision Badung Screenshot",
    meta: [
      { label: "Sole Developer & Data Scientist", variant: "accent" },
      { label: "Individual Project" },
      { label: "2026" },
    ],
    stack: ["Python", "Flask", "Leaflet.js / Mapbox", "ML (Random Forest)", "CA-Markov"],
    blocks: {
      useCase:
        "Bali is slowly losing its farmland — and most people don't realize it until it's too late. Wanted to pinpoint where agricultural land is disappearing, and predict where it will happen next.",
      solution:
        "Trained a Random Forest model to classify satellite imagery of land use change, built a CA-Markov model to project farmland shifts by 2030, and built an interactive Flask-based map with a decision support system for evidence-based land policy.",
      role:
        "Sole Full-Stack Developer & Data Scientist — built AgriVision end-to-end as a Final Project, owning every decision from data collection to deployment.",
      audience: "Urban planners, policymakers, & environmental researchers.",
      result:
        "Became more than a Final Project — a tool that tells a story about what Bali is losing, and what there's still time to protect. Working solo on something this complex proved that depth beats breadth.",
    },
    links: { github: "#", web: "#" },
  },
  {
    title: "Gaskeun Hotel Analysis — Data-Driven Hotel Comparison Platform",
    url: "gaskeun-hotel-analytics.streamlit.app",
    summary: "Dashboard perbandingan hotel di Bali dengan segmentasi ML dan scoring TOPSIS.",
    image: "assets/img/gaskeunhotel.png",
    alt: "Gaskeun Hotel Analysis Dashboard Screenshot",
    meta: [
      { label: "Data Analyst", variant: "accent" },
      { label: "Team of 3" },
      { label: "🏆 2nd Place Sickathon", variant: "gold" },
      { label: "2023" },
    ],
    stack: ["React.js (TypeScript)", "FastAPI", "Scikit-Learn (ML)", "BeautifulSoup", "Pandas"],
    blocks: {
      useCase:
        "Bali's hotel industry is booming, but choosing the right hotel still feels overwhelming. Wanted to go beyond star ratings and build a smarter way to compare hotels based on what actually matters to each traveler.",
      solution:
        "Cleaned and explored a real-world hotel dataset to uncover pricing and rating patterns, applied ML segmentation to cluster hotels into meaningful groups, and implemented TOPSIS multi-criteria scoring so users can weight price, discount, rating, or location.",
      role: "Data Analyst — handled data cleaning and exploratory data analysis (EDA) within a 3-member team.",
      audience:
        "Hotel owners, travelers, travel agents, & market analysts seeking data-driven lodging optimization.",
      result:
        "Team won 2nd Place at Sickathon, an official Streamlit-hosted competition — completed within just two days from briefing to submission. Proved that good time management and clear task division matter as much as technical skill.",
    },
    links: { github: "#", web: "#" },
  },
  {
    title: "MSL FinTrack & Scheduler — Inventory, Finance & Scheduling Tool",
    url: "msl-fintrack.app",
    summary: "Aplikasi inventaris, keuangan, dan penjadwalan untuk toko dan gudang kecil.",
    image: "assets/img/FintrackScheduler.png",
    alt: "MSL FinTrack & Scheduler Screenshot",
    meta: [
      { label: "Sole Fullstack Developer", variant: "accent" },
      { label: "Individual Project" },
      { label: "2025" },
    ],
    stack: ["Laravel 11", "JS (ES6+)", "Tailwind CSS", "Chart.js", "SQLite"],
    blocks: {
      useCase:
        "Small store and warehouse owners in Indonesia often manage inventory, schedules, and finances through scattered notes or spreadsheets — risking expired stock, budget overflow, or scheduling clashes.",
      solution:
        "Built inventory & expiry tracking to flag items nearing expiration, a financial tracker for cash flow and revenue in one place, and a store & warehouse scheduler to keep daily operations organized.",
      role: "Sole Fullstack Developer — designed and coded every feature independently as a personal initiative.",
      audience: "Retail SME owners & warehouse managers.",
      result:
        "Still actively in development — intentionally. Building it solo taught how to think like a product owner, not just a developer. Next milestone: integrating with real POS (cashier) system APIs.",
    },
    links: { github: "#", web: "#" },
  },
  {
    title: "Harvest Hub — Smart Agricultural Marketplace & Supply Chain",
    url: "harvesthub-agri.app",
    summary: "Marketplace pertanian yang menghubungkan petani langsung dengan pembeli.",
    image: "assets/img/HarvestHub.png",
    alt: "Harvest Hub Screenshot",
    meta: [
      { label: "Fullstack Developer", variant: "accent" },
      { label: "Team Project" },
      { label: "2025" },
    ],
    stack: ["Laravel", "MySQL", "JavaScript (ES6+)", "Leaflet.js", "Tailwind CSS"],
    blocks: {
      useCase:
        "Local farmers often face unfair middleman pricing and fragmented distribution networks, leading to reduced farm revenue and post-harvest produce waste.",
      solution:
        "Engineered a digital agricultural marketplace with crop listing, real-time price trends, direct buyer-farmer negotiation channels, and location-aware produce tracking.",
      role:
        "Lead Fullstack Developer — architected backend database models, created responsive web interfaces, and built supply chain routing workflows.",
      audience: "Farmers, agricultural cooperatives, & produce buyers.",
      result:
        "Enhanced price transparency for local farming groups, reduced post-harvest distribution delays, and created a scalable direct-to-market trading platform.",
    },
    links: { github: "#", web: "#" },
  },
  {
    title: "Desa Lambean — Digital Village Governance & Public Service Portal",
    url: "desalambean.go.id",
    summary: "Portal digital desa untuk layanan administrasi dan dokumen warga.",
    image: PLACEHOLDER_IMAGE,
    alt: "Desa Lambean Portal Screenshot",
    meta: [
      { label: "Lead Web Developer", variant: "accent" },
      { label: "Community Project" },
      { label: "2025" },
    ],
    stack: ["PHP / Laravel", "MySQL", "JavaScript", "HTML5 / CSS3"],
    blocks: {
      useCase:
        "Village administrative services and public requests in Desa Lambean heavily relied on physical visits and manual paperwork, slowing down citizen service delivery.",
      solution:
        "Developed an integrated digital village portal with automated public document generation, news announcements, village demographics, and administrative service tracking.",
      role:
        "Lead Web Developer — led front-end and back-end building, document automation templates, and citizen request workflows.",
      audience: "Desa Lambean residents & village administration staff.",
      result:
        "Cut resident document request processing times significantly and digitized public administration records for total governance transparency.",
    },
    links: { github: "#", web: "#" },
  },
  {
    title: "Pundi FinTrack — Personal & SME Financial Management System",
    url: "pundi-fintrack.app",
    summary: "Pengelolaan keuangan pribadi dan UMKM dengan visualisasi arus kas.",
    image: PLACEHOLDER_IMAGE,
    alt: "Pundi FinTrack Screenshot",
    meta: [
      { label: "Sole Fullstack Developer", variant: "accent" },
      { label: "Individual Project" },
      { label: "2025" },
    ],
    stack: ["Python / Flask", "React.js / JS", "Chart.js", "SQLite"],
    blocks: {
      useCase:
        "Freelancers and micro-enterprises struggle to maintain discipline in tracking daily expenses, cash flows, and budget targets across multiple bank accounts.",
      solution:
        "Built a web application with dynamic income/expense categorization, budget threshold warnings, visual breakdown charts, and cash flow projections.",
      role:
        "Sole Fullstack Developer — designed financial data models, custom calculations, and interactive data visualization dashboards.",
      audience: "Freelancers, individuals, & micro-business owners.",
      result:
        "Provided an intuitive financial cockpit that helps users minimize unnecessary spending leaks and maintain strict budget discipline.",
    },
    links: { github: "#", web: "#" },
  },
  {
    title: "FinCost — Operational Cost Estimation & BEP Analytics",
    url: "fincost-analytics.app",
    summary: "Estimasi biaya produksi, BOM, dan analisis titik impas (BEP).",
    image: PLACEHOLDER_IMAGE,
    alt: "FinCost Screenshot",
    meta: [
      { label: "Backend & Data Engineer", variant: "accent" },
      { label: "Individual Project" },
      { label: "2026" },
    ],
    stack: ["Node.js / Express", "JavaScript (ES6+)", "Chart.js", "REST API"],
    blocks: {
      useCase:
        "Estimating product production costs, project overhead, and break-even points without standardized tools leads to pricing errors and margin erosion.",
      solution:
        "Created a precision cost estimation engine featuring dynamic Bill of Materials (BOM), Break-Even Point (BEP) calculators, and operational margin modeling.",
      role:
        "Backend & Data Engineer — designed mathematical cost breakdown models and interactive financial scenario generators.",
      audience: "Project managers, financial analysts, & business owners.",
      result:
        "Enabled fast, accurate cost forecasting and pricing strategies, eliminating manual spreadsheet calculation mistakes.",
    },
    links: { github: "#", web: "#" },
  },
  {
    title: "Dewata Trash Pay — Eco-Reward & Waste Bank Digital Payment System",
    url: "dewata-trashpay.app",
    summary: "Sistem poin eco-reward dan pembayaran digital untuk bank sampah di Bali.",
    image: PLACEHOLDER_IMAGE,
    alt: "Dewata Trash Pay Screenshot",
    meta: [
      { label: "Fullstack Developer", variant: "accent" },
      { label: "Eco Tech Project" },
      { label: "2026" },
    ],
    stack: ["Laravel", "JavaScript (ES6+)", "MySQL", "Tailwind CSS"],
    blocks: {
      useCase:
        "Bali's community waste banks (Bank Sampah) need digital tools to motivate household recycling and digitize waste deposit record-keeping.",
      solution:
        "Developed a waste-to-reward platform where households convert sorted recyclables into redeemable eco-points, integrated with waste bank ledgers.",
      role:
        "Fullstack Developer — designed waste deposit ledger modules, reward point calculations, and admin management dashboards.",
      audience: "Households, waste bank operators, & recycling facilities in Bali.",
      result:
        "Incentivized community recycling participation while eliminating paper-based deposit tracking errors for local waste bank units.",
    },
    links: { github: "#", web: "#" },
  },
];
