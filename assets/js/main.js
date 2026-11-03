"use strict";
const PAGE = document.body.dataset.page,
  BASE = PAGE === "index" ? "" : "../",
  P = BASE + "pages/",
  A = BASE + "assets/";
const DATA = window.ATLAS_DATA,
  PACKAGES = DATA.packages,
  DESTINATIONS = DATA.destinations;
const $ = (s, r = document) => r.querySelector(s),
  $$ = (s, r = document) => [...r.querySelectorAll(s)];
const icons = {
  arrow: '<path d="M4 12h15m-6-6 6 6-6 6"/>',
  chevron: '<path d="m7 10 5 5 5-5"/>',
  left: '<path d="m14 5-7 7 7 7"/>',
  right: '<path d="m10 5 7 7-7 7"/>',
  up: '<path d="m6 13 6-6 6 6M12 7v13"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
  moon: '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  pin: '<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  heart:
    '<path d="M20.5 5.5a5 5 0 0 0-7 0L12 7l-1.5-1.5a5 5 0 0 0-7 7L12 21l8.5-8.5a5 5 0 0 0 0-7Z"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m16 8-2 6-6 2 2-6 6-2Z"/>',
  shield:
    '<path d="m12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6l8-4Z"/><path d="m8 12 3 3 5-6"/>',
  sliders:
    '<path d="M4 7h8m4 0h4M4 17h2m4 0h10"/><circle cx="14" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  map: '<path d="m3 5 6-2 6 3 6-3v16l-6 3-6-3-6 2V5Zm6-2v16m6-13v16"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 22v-3a8 8 0 0 1 16 0v3"/>',
  users:
    '<circle cx="9" cy="8" r="3"/><path d="M2 21v-3a7 7 0 0 1 14 0v3m1-16a3 3 0 0 1 0 6m2 4a6 6 0 0 1 3 5"/>',
  bag: '<rect x="4" y="7" width="16" height="14" rx="2"/><path d="M8 7V4h8v3M8 11v6m8-6v6"/>',
  file: '<path d="M14 2H5v20h14V7l-5-5Zm0 0v5h5M8 12h8m-8 4h6"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M9 21h6"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  settings:
    '<path d="m9 3-1 3-3 1 1 4-2 2 2 4 3-1 2 3h4l1-3 3-1-1-4 2-2-2-4-3 1-2-3H9Z"/><circle cx="12" cy="11" r="3"/>',
  logout: '<path d="M9 3H3v18h6m6-15 6 6-6 6M8 12h13"/>',
  download: '<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  leaf: '<path d="M20 3C9 2 2 8 5 16c8 5 16-2 15-13ZM5 21 16 9"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
  copy: '<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V3H3v13h5"/>',
};
function icon(n, size = 20) {
  return `<svg ${n === "arrow" ? 'class="arrow-icon"' : ""} width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[n] || icons.compass}</svg>`;
}
function esc(s) {
  return String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}
const money = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
const url = (page, query = "") => P + page + ".html" + query;
const home = () => BASE + "index.html";
function read(key, fallback = []) {
  try {
    return JSON.parse(localStorage.getItem("atlas-" + key)) ?? fallback;
  } catch {
    return fallback;
  }
}
function write(key, value) {
  try {
    localStorage.setItem("atlas-" + key, JSON.stringify(value));
    return true;
  } catch {
    toast("Browser storage is unavailable. Your changes could not be saved.");
    return false;
  }
}
function activity(message) {
  if (!read("notifications-enabled", true)) return;
  const e = read("events");
  e.unshift({
    id: crypto.randomUUID(),
    message,
    date: new Date().toISOString(),
  });
  write("events", e.slice(0, 50));
}
function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => el.classList.remove("show"), 3600);
}
function download(filename, content, type = "text/plain") {
  const b = new Blob([content], { type });
  const u = URL.createObjectURL(b);
  const a = document.createElement("a");
  a.href = u;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(u), 1000);
}
function showModal(html) {
  $("#modal-body").innerHTML = html;
  $("#modal").showModal();
}
function favoriteIds() {
  return read("favorites").filter((id) => PACKAGES.some((p) => p.id === id));
}
function brand() {
  return `<a class="brand" href="${home()}" aria-label="Waylark home"><span class="brand-symbol"><img class="brand-light" src="${A}images/logo.svg" width="47" height="47" alt="Waylark ribbon W mark"><img class="brand-dark" src="${A}images/logo-dark.svg" width="47" height="47" alt=""></span><span class="brand-caption">Waylark</span></a>`;
}
function utilities() {
  return `<div class="header-tools"><button class="icon-btn theme-toggle" aria-label="Toggle color theme">${icon(document.documentElement.dataset.theme === "dark" ? "sun" : "moon", 19)}</button><button class="icon-btn direction-toggle" aria-label="Toggle text direction">${document.documentElement.dir === "rtl" ? "LTR" : "RTL"}</button></div>`;
}
function navigation() {
  return [
    ["About", "about"],
    ["Domestic", "domestic-packages"],
    ["International", "international-packages"],
    ["Honeymoon & Family", "honeymoon-family"],
    ["Contact", "contact"],
    ["Dashboard", "dashboard"],
  ]
    .map(
      ([label, page]) =>
        `<a href="${url(page)}" class="${PAGE === page ? "active" : ""}" ${PAGE === page ? 'aria-current="page"' : ""}>${label}</a>`,
    )
    .join("");
}
function header() {
  return `<header class="site-header"><div class="container header-inner">${brand()}<nav class="desktop-nav" aria-label="Main navigation"><div class="home-dropdown"><button class="home-toggle ${["index", "home2"].includes(PAGE) ? "active" : ""}" aria-expanded="false">Home ${icon("chevron", 13)}</button><div class="dropdown"><a href="${home()}">Home 1</a><a href="${url("home2")}">Home 2</a></div></div>${navigation()}</nav>${utilities()}<a class="btn header-login" href="${url("login")}">Login ${icon("arrow", 15)}</a><button class="menu-btn" aria-label="Open navigation" aria-expanded="false">${icon("menu", 25)}</button></div></header>`;
}
function footer() {
  const columns = [
    [
      "Explore",
      [
        ["Home 1", home()],
        ["Home 2", url("home2")],
        ["Destinations", url("destinations")],
        ["Featured Getaways", url("deals")],
        ["Travel Journal", url("blog")],
      ],
    ],
    [
      "Holiday Packages",
      [
        ["Domestic", url("domestic-packages")],
        ["International", url("international-packages")],
        ["Honeymoon", url("honeymoon-family", "?audience=Honeymoon")],
        ["Family Holidays", url("honeymoon-family", "?audience=Family")],
      ],
    ],
    [
      "Traveler Support",
      [
        ["Contact", url("contact")],
        ["Plan a Holiday", url("booking")],
        ["Traveler Login", url("login")],
        ["Dashboard", url("dashboard")],
        ["FAQ", url("faq")],
      ],
    ],
    [
      "Good to Know",
      [
        ["About", url("about")],
        ["Privacy", url("privacy")],
        ["Terms", url("terms")],
      ],
    ],
  ];
  return `<footer class="site-footer"><div class="container"><div class="footer-top"><div class="footer-intro">${brand()}<p>A world of possibilities.<br> A journey that feels like you.</p></div><div class="footer-links">${columns.map(([title, links]) => `<div><h4>${title}</h4>${links.map(([label, link]) => `<a href="${link}">${label}</a>`).join("")}</div>`).join("")}</div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Waylark.</span><span>Thoughtfully planned. Beautifully experienced.</span></div></div></footer><button class="icon-btn back-top" aria-label="Back to top" hidden>${icon("up", 20)}</button>`;
}
function img(file, alt, cls = "", lazy = true) {
  return `<img src="${A}images/${file}" alt="${esc(String(alt).replace(/<[^>]*>/g, " "))}" ${cls ? `class="${cls}"` : ""} ${lazy ? 'loading="lazy"' : 'fetchpriority="high"'} decoding="async">`;
}
function linkBtn(text, page, cls = "", query = "") {
  return `<a class="btn ${cls}" href="${url(page, query)}">${text} ${icon("arrow", 18)}</a>`;
}
function sectionHead(
  eyebrow,
  title,
  link = "",
  page = "domestic-packages",
  copy = "",
) {
  return `<div class="section-head"><div><span class="eyebrow">${eyebrow}</span><h2>${title}</h2>${copy ? `<p>${copy}</p>` : ""}</div>${link ? `<a class="text-link" href="${url(page)}">${link} ${icon("arrow", 18)}</a>` : ""}</div>`;
}
function card(p) {
  const saved = favoriteIds().includes(p.id);
  return `<article class="package-card" data-package="${p.id}"><div class="package-photo"><a href="${url("package-details", "?id=" + p.id)}">${img(p.image, p.destination + " — " + p.description.split(".")[0])}</a><span class="tag">${p.style}</span><button class="favorite" data-favorite="${p.id}" aria-label="${saved ? "Remove" : "Save"} ${esc(p.title)}" aria-pressed="${saved}">${icon("heart", 18)}</button></div><div class="package-info"><div class="package-meta"><span>${icon("pin", 14)} ${p.destination}</span><span>${icon("clock", 14)} ${p.nights}N / ${p.days}D</span></div><h3><a href="${url("package-details", "?id=" + p.id)}">${p.title}</a></h3><p>${p.description.split(".")[0]}.</p><div class="package-bottom"><div class="price"><small>Indicative from</small><strong>${money(p.price)}</strong> <em>/ person</em></div><a class="text-link" href="${url("package-details", "?id=" + p.id)}">View trip ${icon("arrow", 16)}</a></div></div></article>`;
}
function searchPanel() {
  return `<div class="container search-wrap"><form class="search-panel" id="hero-search"><label>Where to?<select name="destination" aria-label="Destination"><option value="">Choose a place</option>${DESTINATIONS.map((d) => `<option>${d.name}</option>`).join("")}</select></label><label>Your travel style<select name="style" aria-label="Travel style"><option value="">Any travel style</option>${styles.map((s) => `<option>${s}</option>`).join("")}</select></label><label>Your budget<select name="budget" aria-label="Budget"><option value="">Keep it open</option><option value="30000">Under ₹30,000</option><option value="60000">Under ₹60,000</option><option value="100000">Under ₹1,00,000</option></select></label><label>When to go<select name="period" aria-label="Preferred travel period"><option>Flexible dates</option><option>Winter</option><option>Spring</option><option>Summer</option><option>Autumn</option></select></label><button class="btn secondary" type="submit" aria-label="Find my escape">${icon("search", 19)} <span>Find my escape</span></button></form><div class="trust-strip"><span>${icon("compass", 19)} Thoughtfully curated journeys</span><span>${icon("sliders", 19)} Made for your kind of travel</span><span>${icon("shield", 19)} Every detail, considered</span><span>${icon("leaf", 19)} More meaningful moments</span></div></div>`;
}
const styles = [
  "Adventure",
  "Beach Escapes",
  "Mountains & Nature",
  "Romantic Getaways",
  "Family Holidays",
  "Cultural Journeys",
];
let galleryIndex = 0;
const galleryDestinations = [
  "kashmir",
  "bali",
  "switzerland",
  "kerala",
  "japan",
  "goa",
].map((id) => DESTINATIONS.find((d) => d.id === id));
function gallery() {
  const d = galleryDestinations[0];
  return `<section class="section atlas-section container" id="destinations"><div class="section-head"><div><span class="eyebrow">A world waiting to be explored</span><h2>The atlas is open.<br> Where to next?</h2></div><div class="gallery-controls"><span class="counter"><span id="gallery-count">01</span> / 06</span><button class="icon-btn" data-gallery-step="-1" aria-label="Previous destination">${icon("left", 20)}</button><button class="icon-btn" data-gallery-step="1" aria-label="Next destination">${icon("right", 20)}</button></div></div><div class="atlas-explorer"><div class="atlas-landscape destination-gallery"><div class="painted-landscape">${img(d.image, d.name, "atlas-active-image")}</div><span class="atlas-coordinate">A DIFFERENT POINT OF VIEW</span><div class="atlas-image-label"><span id="atlas-image-country">${d.country}</span><strong id="atlas-image-name">${d.name}</strong></div></div><div class="atlas-notebook"><div class="atlas-caption" aria-live="polite"><span class="eyebrow" id="atlas-country">${d.country} · ${PACKAGES.filter((p) => p.destination === d.name).length} suggested journeys</span><h3 id="atlas-title">A little wonder<br> called ${d.name}.</h3><p id="gallery-description">${d.description}. Follow your curiosity into a journey you can make your own.</p><a id="gallery-link" class="text-link" href="${url(d.category + "-packages", "?destination=" + d.name)}">Explore ${d.name} ${icon("arrow", 18)}</a></div><div class="atlas-selections" aria-label="Choose a destination">${galleryDestinations.map((x, i) => `<button class="atlas-pick ${i === 0 ? "selected" : ""}" data-destination="${i}" aria-pressed="${i === 0}" aria-label="Explore ${x.name}">${img(x.image, x.name)}<span>${x.name}</span><span class="pick-check">${icon("check", 15)}</span></button>`).join("")}</div></div></div></section>`;
}
const planningStages = [
  {
    name: "Choose your destination",
    title: "Start with a little curiosity.",
    description:
      "Mountains, a quiet coastline, or somewhere entirely new. Follow the places that stay on your mind.",
    image: "switzerland-detail.webp",
    alt: "A Swiss mountain valley",
    action: "Find your somewhere",
    page: "destinations",
    caption: "A place that speaks to you.",
  },
  {
    name: "Shape your holiday",
    title: "Leave room for your kind of wonderful.",
    description:
      "Choose a route, set your pace, and share the details that make a holiday feel like yours.",
    image: "rajasthan-detail.webp",
    alt: "The architecture of Amber Fort in Rajasthan",
    action: "Shape my holiday",
    page: "booking",
    caption: "A journey with your name on it.",
  },
  {
    name: "Keep it all together",
    title: "Less to remember. More to look forward to.",
    description:
      "Save the journeys you love, keep your planning notes close, and return to your local travel journal anytime.",
    image: "italy.webp",
    alt: "The colourful coastline of Cinque Terre, Italy",
    action: "Open my travel journal",
    page: "dashboard",
    caption: "Your next chapter, thoughtfully organised.",
  },
];

function route() {
  return `<section class="section unfolding-section"><div class="container"><div class="unfolding-heading"><span class="eyebrow">From someday to let’s go</span><h2>Your journey,<br> unfolding.</h2><p>A beautiful holiday doesn’t begin at the airport.<br> It begins with a possibility.</p></div><div class="unfolding-layout"><div class="planning-controls"><div class="planning-stages" role="tablist" aria-label="Journey planning stages">${planningStages.map((s, i) => `<button class="planning-stage" role="tab" id="planning-stage-${i}" aria-selected="${i === 0}" aria-controls="planning-visual" data-planning-stage="${i}"><span class="stage-number">0${i + 1}</span><span><strong>${s.name}</strong><span class="stage-description">${s.description}</span></span>${icon("arrow", 19)}</button>`).join("")}</div><div id="planning-action">${linkBtn(planningStages[0].action, planningStages[0].page, "secondary")}</div><span class="planning-footnote">Thoughtfully planned. Entirely your own.</span></div><div class="planning-visual" id="planning-visual" role="tabpanel" aria-labelledby="planning-stage-0"><div class="planning-photo">${img(planningStages[0].image, planningStages[0].alt, "planning-active-image")}</div><div class="planning-photo-note"><span class="eyebrow">A little perspective</span><h3 id="planning-title">${planningStages[0].title}</h3><p id="planning-caption">${planningStages[0].caption}</p></div></div></div></div></section>`;
}
function workspaceFeature() {
  return `<section class="section muted-bg"><div class="container workspace-feature"><div class="workspace-feature-photo">${img(PAGE === "home2" ? "kerala-detail.webp" : "rajasthan-detail.webp", PAGE === "home2" ? "Kerala backwaters and palms" : "The architecture of Jaipur, Rajasthan")}</div><div><span class="eyebrow">Your journey, all together</span><h2>Less to keep track of.<br> More to look forward to.</h2><p>Keep your favourite places, itineraries and travel notes together. Pick up your plans whenever inspiration finds you.</p>${linkBtn("Open your travel journal", "dashboard")}</div></div></section>`;
}

function closing() {
  if (["domestic-packages", "international-packages", "deals"].includes(PAGE))
    return `<div class="container catalog-help"><div><span class="eyebrow">A journey, made yours</span><h3>Have a different route in mind?</h3><p>Bring your ideas. Leave room for a little possibility.</p></div>${linkBtn("Shape your own holiday", "booking", "outline")}</div>`;
  if (PAGE === "home2")
    return `<section class="journal-closing container"><span class="eyebrow">An open invitation</span><h2>The next chapter<br> is yours.</h2><p>Wherever your curiosity takes you, start with a little wonder.</p><div class="actions">${linkBtn("Let’s plan something wonderful", "booking")}${linkBtn("Keep exploring", "destinations", "outline")}</div></section>`;
  let title =
    PAGE === "destinations"
      ? "Pick a place.<br> Make it a possibility."
      : PAGE === "honeymoon-family"
        ? "Make room for your<br> favourite people."
        : PAGE === "blog"
          ? "From a little inspiration<br> to your next adventure."
          : "Your next story starts<br> with a conversation.";
  return `<div class="container closing ${PAGE === "index" ? "home-closing" : ""}">${PAGE === "index" ? `<div class="closing-postcard">${img("goa-detail.webp", "A quiet palm-lined shore in Goa")}<small>A little closer to someday.</small></div>` : ""}<div><span class="eyebrow">Let’s make it a journey</span><h2>${title}</h2><p>A big adventure or a little escape. We’ll help you shape it.</p></div><div class="actions">${linkBtn("Plan my holiday", "booking")}${linkBtn("Explore destinations", "destinations", "outline")}</div></div>`;
}

function styleSection() {
  return `<section class="section container">${sectionHead("Travel your way", "Different journeys.<br> The same sense of wonder.")}<div class="style-tabs" role="tablist" aria-label="Holiday style">${styles.map((s, i) => `<button class="pill" role="tab" id="style-tab-${i}" aria-selected="${!i}" aria-controls="style-content" data-style="${s}" tabindex="${i ? "-1" : "0"}">${s}</button>`).join("")}</div><div id="style-content" role="tabpanel" aria-labelledby="style-tab-0">${styleContent(styles[0])}</div></section>`;
}
function styleContent(s) {
  let p =
    s === "Adventure"
      ? PACKAGES.find((p) => p.id === "ladakh-1")
      : PACKAGES.find((p) => p.style === s);
  return `<div class="style-stage">${img(p.image, p.destination)}<div class="style-copy"><span class="eyebrow">${s}</span><h3>${p.title}</h3><p>${p.description}</p><div class="package-meta"><span>${p.days} days of discovery</span><span>From ${money(p.price)}</span></div>${linkBtn("Find your " + s.toLowerCase(), "deals", "", "?style=" + encodeURIComponent(s))}</div></div>`;
}
function homePage() {
  return `<section class="hero">${img("hero-dolomites.webp", "Mountain peaks reflected in Lago di Braies in the Italian Dolomites", "", false)}<div class="container"><span class="eyebrow">Extraordinary places. Unforgettable journeys.</span><h1>The world is closer<br> than <em>you think.</em></h1><p>Find a little wonder. Take the scenic route.<br> Discover holidays that become your favourite stories.</p><div class="actions">${linkBtn("Explore packages", "domestic-packages", "secondary")}<a class="btn light" href="${url("booking")}">Plan my holiday ${icon("arrow", 17)}</a></div></div><div class="hero-note">${icon("pin", 20)}<div><b>The Dolomites, Italy</b>46.6943° N · 12.0856° E</div><div class="compass">${icon("compass", 55)}</div></div><div class="container hero-bottom"><a href="#destinations">Discover ${icon("arrow", 15)}</a><span>A new perspective awaits</span></div></section>${searchPanel()}${gallery()}<section class="section muted-bg"><div class="container">${sectionHead("Handpicked, not ordinary", "Good places.<br> Great memories.", "View all packages", "deals")}<div class="package-grid home-packages painted-cards">${["kerala-1", "bali-1", "kashmir-1"].map((id) => card(PACKAGES.find((p) => p.id === id))).join("")}</div><div class="section-foot"><p>Prices from, per person. Final costs depend on your dates and preferences.</p><a class="text-link" href="${url("booking")}">Make a trip your own ${icon("arrow", 17)}</a></div></div></section><section class="editorial"><div class="container editorial-grid"><div class="brush-photo">${img("ladakh.webp", "The high-altitude mountain landscapes of Ladakh")}</div><div><span class="eyebrow">Off the familiar path</span><h2>Some places<br> change your<br> perspective.</h2><p>Wide-open skies. Ancient monasteries. Roads that invite you to slow down. In Ladakh, the extraordinary lives in the quiet moments.</p><div class="mini-meta"><span>Ladakh, India</span><span>7-day suggested journey</span></div>${linkBtn("Discover Ladakh", "package-details", "secondary", "?id=ladakh-1")}</div></div></section>${styleSection()}<section class="section muted-bg"><div class="container">${sectionHead("A little seasonal inspiration", "Your out-of-office<br> is calling.", "Featured getaways", "deals")}<div class="getaway-grid"><a class="getaway" href="${url("package-details", "?id=maldives-1")}">${img("maldives.webp", "Maldives turquoise lagoon")}<span class="tag">The island edit</span><div><h3>A slower shade of blue.</h3><p>Maldives · 5 days · Indicative from ${money(78000)}</p><span class="text-link">Find your island time ${icon("arrow", 17)}</span></div></a><a class="getaway" href="${url("package-details", "?id=japan-1")}">${img("japan-detail.webp", "Traditional Japanese streets")}<span class="tag">The culture edit</span><div><h3>Wonder around every corner.</h3><p>Japan · 8 days · Indicative from ${money(112000)}</p><span class="text-link">Discover a different rhythm ${icon("arrow", 17)}</span></div></a></div></div></section>${route()}${workspaceFeature()}${closing()}`;
}
function journalRoute() {
  const p = PACKAGES.find((p) => p.id === "bali-1");
  return `<section class="section container"><div class="section-head"><div><span class="eyebrow">An itinerary, a little differently</span><h2>Six days.<br> A different rhythm.</h2><p>A suggested Bali journey, with time to find your own favourite moments.</p></div><a class="text-link" href="${url("package-details", "?id=" + p.id)}">The whole Bali story ${icon("arrow", 17)}</a></div><div class="journal-days" role="tablist" aria-label="Bali journey days">${p.itinerary.map((d, i) => `<button class="journal-day" role="tab" aria-selected="${i === 0}" aria-controls="journal-day-panel" id="journal-day-${i}" data-journal-day="${i}"><span>DAY 0${i + 1}</span>${d.stop}</button>`).join("")}</div><div class="journal-day-panel" id="journal-day-panel" role="tabpanel" aria-labelledby="journal-day-0">${journalDayContent(0)}</div></section>`;
}
function journalDayContent(i) {
  const p = PACKAGES.find((p) => p.id === "bali-1"),
    d = p.itinerary[i];
  return `<div class="journal-day-copy"><span class="eyebrow">${d.stop} · Your suggested day ${i + 1}</span><h3>${d.title}</h3><p>${d.description}</p><a class="text-link" href="${url("booking", "?id=bali-1")}">Make this journey yours ${icon("arrow", 17)}</a></div>${img("bali-detail.webp", "Tanah Lot temple in Bali")}<span class="journal-day-number" aria-hidden="true">0${i + 1}</span>`;
}

function journalPage() {
  return `<div class="container journal-hero"><div><span class="eyebrow">The travel journal · Edition 02</span><h1>Journeys<br> worth<br> <em>remembering.</em></h1><p>Not just a pin on a map. A feeling, a fresh perspective, a story you’ll tell for years.</p>${linkBtn("Find your next chapter", "destinations")}<p style="font-size:var(--type-support);letter-spacing:1px">CURATED WITH CURIOSITY. PLANNED WITH CARE.</p></div><div class="journal-photo">${img("hero-journal.webp", "Lago di Braies in the Italian Dolomites", "main-photo", false)}<div class="journal-inset">${img("italy-detail.webp", "Rowing on Lago di Braies")}<small>Postcards from the Dolomites</small></div><div class="journal-stamp">TAKE THE<br> SCENIC<br> ROUTE ${icon("compass", 22)}</div></div></div><section class="section muted-bg"><div class="container"><p class="editorial-quote">The most beautiful part of travel?<br> <em>Somewhere along the way,</em><br> you see the world a little differently.</p></div></section><section class="section container">${sectionHead("Postcards from possibility", "Three places.<br> A thousand reasons to go.")}<div class="postcard-grid">${[
    "bali",
    "rajasthan",
    "switzerland",
  ]
    .map((id, i) => {
      const d = DESTINATIONS.find((d) => d.id === id);
      return `<article class="postcard">${img(d.image, d.name)}<small>POSTCARD 0${i + 1} · ${d.country}</small><h3>${d.name}, with love.</h3><a class="text-link" href="${url(d.category + "-packages", "?destination=" + d.name)}">Explore the story ${icon("arrow", 16)}</a></article>`;
    })
    .join(
      "",
    )}</div></section><section class="section container"><div class="story-banner">${img("switzerland-detail.webp", "Alpine landscape in Switzerland")}<div><span class="eyebrow">The long way is the right way</span><h2>Let the mountains<br> set the pace.</h2><p>Follow lakeside paths and alpine horizons through a Switzerland journey with room to simply be.</p>${linkBtn("An Alpine escape", "package-details", "secondary", "?id=switzerland-1")}</div></div></section><section class="section muted-bg"><div class="container story-pair"><article>${img("maldives-detail.webp", "An island escape in the Maldives")}<span class="eyebrow">For just the two of you</span><h3>A new chapter.<br> A beautiful beginning.</h3><p>From island mornings to unhurried mountain walks, find a honeymoon that feels like your story.</p><a class="text-link" href="${url("honeymoon-family", "?audience=Honeymoon")}">Journeys for two ${icon("arrow", 17)}</a></article><article>${img("goa.webp", "A beach in Goa")}<span class="eyebrow">For your favourite people</span><h3>Less screen time.<br> More remember-when.</h3><p>Flexible days, little discoveries, and room for everyone’s idea of a perfect holiday.</p><a class="text-link" href="${url("honeymoon-family", "?audience=Family")}">Family adventures ${icon("arrow", 17)}</a></article></div></section>${journalRoute()}${workspaceFeature()}${closing()}`;
}
function banner(eyebrow, title, text, file) {
  return `<section class="inner-hero">${img(file, title, "", false)}<div class="container"><span class="eyebrow">${eyebrow}</span><h1>${title}</h1><p>${text}</p></div></section>`;
}
function faqSection() {
  return `<section class="section container faq-layout"><div><span class="eyebrow">Before you pack</span><h2>A little clarity.<br> A lot to look forward to.</h2><p>Your holiday should start with peace of mind.</p><a class="text-link" href="${url("faq")}" style="margin-top:20px">All your questions ${icon("arrow", 17)}</a></div><div>${faqs
    .slice(0, 4)
    .map(([q, a]) => accordion(q, a))
    .join("")}</div></section>`;
}
const faqs = [
  [
    "Are the displayed prices confirmed quotes?",
    "Prices are starting estimates per person. Your travel dates, group size, accommodation and chosen services determine the final quote.",
  ],
  [
    "Can I customise a holiday package?",
    "Yes. Use Plan My Holiday to choose a package and add your preferred dates, accommodation, pace and special requests. You can review and save your plan locally, then copy or download it for sharing with your travel provider.",
  ],
  [
    "What happens when I save an enquiry?",
    "Saving an enquiry keeps a draft in your travel journal. You can review, copy or download it before sharing it with your travel provider. Saving a draft does not make a reservation.",
  ],
  [
    "Where will I find my tickets and invoices?",
    "Keep your provider-issued tickets, vouchers and invoices in the document sections of your travel journal. Open a file to view its details or download a copy.",
  ],
  [
    "Do I need an account to save favourites?",
    "No. Your favourites are saved on this device and are available in your travel journal.",
  ],
  [
    "Can I use the workspace on another device?",
    "Local plans are specific to this browser. Export your planning data in Settings and keep a backup. There is no automatic account sync across devices.",
  ],
  [
    "Are flights and visas included?",
    "Check the inclusions listed for each journey. Confirm airfare, visa support and insurance in your final quote before booking.",
  ],
  [
    "Can I delete my local planning data?",
    "Yes. Dashboard Settings lets you export your data and clear the local workspace. This removes saved packages, planning requests, profile preferences, saved itineraries and notification history from this browser.",
  ],
];
function accordion(q, a, open = false) {
  return `<details class="accordion" ${open ? "open" : ""}><summary>${q}</summary><div>${a}</div></details>`;
}
function planningInfo(international = false) {
  return `<section class="section muted-bg"><div class="container">${sectionHead("Little details, better journeys", "A little planning goes a long way.")}<div class="info-grid">${(international
    ? [
        [
          "Your travel documents",
          "Check passport validity and entry requirements with official destination authorities. Eligibility and visa decisions are not guaranteed.",
        ],
        [
          "A clear view of your budget",
          "Flights, insurance, local taxes and optional activities can change your final cost. Request a full itemised quote.",
        ],
        [
          "Space for the unexpected",
          "Build breathing room into your route. Keep flexible dates and discuss cancellation terms with your provider.",
        ],
      ]
    : [
        [
          "Your pace, your plan",
          "Choose a route that leaves time for the places you love. Every itinerary is a starting point for your own journey.",
        ],
        [
          "What’s in the estimate",
          "Review accommodation, meals, transport and local fees when comparing your travel options.",
        ],
        [
          "Travel a little thoughtfully",
          "Pack light, respect local customs and leave landscapes as beautiful as you found them.",
        ],
      ]
  )
    .map(
      ([t, c], i) =>
        `<article class="info-block"><span class="eyebrow">0${i + 1} · Good to know</span><h3>${t}</h3><p>${c}</p></article>`,
    )
    .join("")}</div></div></section>`;
}
function filterPanel() {
  return `<aside class="filter-panel"><h3>${icon("sliders", 19)} Find your escape</h3><label class="field">Destination<select id="filter-destination"><option value="">All destinations</option>${DESTINATIONS.filter(
    (d) => !window.catalogCategory || d.category === window.catalogCategory,
  )
    .map((d) => `<option>${d.name}</option>`)
    .join(
      "",
    )}</select></label><label class="field">Holiday style<select id="filter-style"><option value="">All styles</option>${styles.map((s) => `<option>${s}</option>`).join("")}</select></label><label class="field">Budget per person<select id="filter-budget"><option value="">Any budget</option><option value="30000">Under ₹30,000</option><option value="60000">Under ₹60,000</option><option value="100000">Under ₹1,00,000</option></select></label><label class="field">Duration<select id="filter-duration"><option value="">Any duration</option><option value="5">Up to 5 days</option><option value="7">Up to 7 days</option><option value="10">Up to 10 days</option></select></label><button class="btn outline small" id="clear-filters">Clear filters</button></aside>`;
}
function catalogPage(type) {
  window.catalogCategory = type === "deals" ? "" : type;
  const intl = type === "international";
  let title =
    type === "deals"
      ? "Extraordinary escapes,<br> thoughtfully chosen."
      : intl
        ? "The world is waiting.<br> Where will you go?"
        : "Closer to home.<br> Far from ordinary.";
  let hero =
    type === "deals"
      ? "maldives-detail.webp"
      : intl
        ? "italy.webp"
        : "kerala-detail.webp";
  return `${banner(type === "deals" ? "The curated collection" : intl ? "International holidays" : "Discover India", title, type === "deals" ? "A considered collection of journeys worth making. Inspiring routes, transparent starting estimates." : intl ? "A new country. A different perspective. A journey that stays with you." : "From mountain mornings to the quiet rhythm of the backwaters.", hero)}<div class="container breadcrumb"><a href="${home()}">Home</a> / ${intl ? "International" : type === "deals" ? "Featured Getaways" : "Domestic"} Packages</div>${
    intl
      ? `<div class="container international-mosaic painted-collection" style="margin-top:10px">${[
          ["switzerland", "switzerland-detail.webp", "The Alpine edit"],
          ["bali", "bali-detail.webp", "The island edit"],
          ["japan", "japan-detail.webp", "The culture edit"],
        ]
          .map(([id, file, label]) => {
            const d = DESTINATIONS.find((d) => d.id === id);
            return `<a class="getaway" href="#catalog" data-quick-destination="${d.name}">${img(file, d.name)}<div><p>${label}</p><h3>${d.name} ${icon("arrow", 18)}</h3></div></a>`;
          })
          .join(
            "",
          )}</div><div class="container style-tabs" style="margin-top:10px">${DESTINATIONS.filter(
          (d) => d.category === "international",
        )
          .map(
            (d) =>
              `<a class="pill" href="#catalog" data-quick-destination="${d.name}">${d.name}</a>`,
          )
          .join("")}</div>`
      : ""
  }<section class="section container" style="padding-top:25px" id="catalog"><div class="catalog-layout">${filterPanel()}<div><div class="catalog-top"><span id="results-count" aria-live="polite"></span><label>Sort by <select id="sort-packages" aria-label="Sort packages"><option value="recommended">Recommended</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="duration">Duration: shortest</option></select></label></div><div id="catalog-grid" class="package-grid catalog-grid"></div><p class="catalog-preference" id="period-note" hidden></p></div></div></section>${planningInfo(intl)}${faqSection()}${closing()}`;
}
function empty(
  title,
  text,
  action = "Explore packages",
  page = "deals",
  ico = "compass",
) {
  return `<div class="empty"><div class="empty-icon">${icon(ico, 28)}</div><h3>${title}</h3><p>${text}</p>${action ? linkBtn(action, page) : ""}</div>`;
}
function updateCatalog() {
  let query = new URLSearchParams(location.search);
  let dest = $("#filter-destination").value,
    style = $("#filter-style").value,
    budget = +$("#filter-budget").value,
    days = +$("#filter-duration").value,
    sort = $("#sort-packages").value;
  let ps = PACKAGES.filter(
    (p) =>
      (!window.catalogCategory || p.category === window.catalogCategory) &&
      (!dest || p.destination === dest) &&
      (!style || p.style === style) &&
      (!budget || p.price <= budget) &&
      (!days || p.days <= days),
  );
  if (sort === "price-low") ps.sort((a, b) => a.price - b.price);
  if (sort === "price-high") ps.sort((a, b) => b.price - a.price);
  if (sort === "duration") ps.sort((a, b) => a.days - b.days);
  $("#catalog-grid").innerHTML = ps.length
    ? ps.map(card).join("")
    : empty(
        "A different route, perhaps?",
        "Try broadening your destination, budget or travel style. Your next great journey may be one filter away.",
        "Browse all journeys",
        "deals",
        "search",
      );
  $("#results-count").textContent =
    `${ps.length} thoughtfully chosen ${ps.length === 1 ? "journey" : "journeys"}`;
  const periodNote = $("#period-note");
  const period = query.get("period");
  periodNote.hidden = !period || period === "Flexible dates";
  periodNote.textContent = periodNote.hidden
    ? ""
    : `Preferred season: ${period}. Check dates and availability when finalising your plans.`;
}
function togetherPage() {
  return `${banner("Make memories, together", "The best journeys<br> are shared.", "For a beautiful beginning, a family tradition, or simply more time with your favourite people.", "bali-detail.webp")}<section class="section container"><div class="story-pair together-stories"><article>${img("maldives.webp", "Maldives island lagoon")}<span class="eyebrow">For just the two of you</span><h2>Fall in love<br> with somewhere new.</h2><p>A private moment. An unhurried morning. Romantic escapes designed to leave space for each other.</p><button class="text-link audience-link" data-audience="Honeymoon" style="background:none;border:0;padding:0">Explore honeymoon journeys ${icon("arrow", 17)}</button></article><article>${img("goa.webp", "The coastline of Goa")}<span class="eyebrow">For the whole family</span><h2>Little adventures.<br> Lifelong memories.</h2><p>Flexible routes, easy days, shared discoveries. Find a holiday with something for everyone.</p><button class="text-link audience-link" data-audience="Family" style="background:none;border:0;padding:0">Find a family escape ${icon("arrow", 17)}</button></article></div></section><section class="section muted-bg" id="together-packages"><div class="container">${sectionHead("Find your shared adventure", "Made for your kind of together.")}<div class="style-tabs" role="tablist" aria-label="Travelers"><button role="tab" class="pill" data-audience="Honeymoon" aria-selected="true">Honeymoon & Romance</button><button role="tab" class="pill" data-audience="Family" aria-selected="false">Family Holidays</button></div><div id="together-grid" class="package-grid"></div></div></section>${faqSection()}${closing()}`;
}
function selectAudience(a) {
  $$("[role=tab][data-audience]").forEach((el) =>
    el.setAttribute("aria-selected", el.dataset.audience === a),
  );
  $("#together-grid").innerHTML = PACKAGES.filter((p) => p.audience === a)
    .map(card)
    .join("");
}
function itinerary(p) {
  return `<div class="itinerary">${p.itinerary.map((day, i) => `<details class="accordion" ${i === 0 ? "open" : ""}><summary><span><span class="day-label">DAY ${String(day.day).padStart(2, "0")} · ${day.stop}</span><h4>${day.title}</h4></span></summary><div>${day.description}</div></details>`).join("")}</div>`;
}
function detailPage() {
  const id = new URLSearchParams(location.search).get("id") || "kashmir-1";
  const p = PACKAGES.find((x) => x.id === id);
  if (!p)
    return `<section class="section container">${empty("That journey isn’t in our atlas.", "Explore the current collection to find your next adventure.", "Explore packages", "deals", "map")}</section>`;
  window.currentPackage = p;
  return `<div class="container breadcrumb"><a href="${home()}">Home</a> / <a href="${url(p.category + "-packages")}">${p.category === "domestic" ? "Domestic" : "International"}</a> / ${p.destination}</div><div class="container"><div class="intro-section" style="padding-top:10px"><span class="eyebrow">${p.destination} · ${p.country}</span><h1>${p.title}</h1><p>${p.description}</p><div class="package-meta" style="margin-top:20px"><span>${icon("clock", 16)} ${p.nights} nights / ${p.days} days</span><span>${icon("users", 16)} ${p.audience}</span><span>${icon("compass", 16)} ${p.style}</span></div></div><div class="detail-gallery ${p.gallery.length === 1 ? "one" : ""}">${p.gallery.map((file, i) => `<button data-photo="${file}" aria-label="View ${p.destination} photograph ${i + 1}">${img(file, p.destination + " scenic photograph", "", i !== 0)}<span>${icon("eye", 14)} View photograph</span></button>`).join("")}</div></div><section class="section container" style="padding-top:10px"><div class="detail-layout"><div class="detail-body"><section><h2>A journey to make your own.</h2><p>${p.description} This proposed itinerary balances well-known highlights with time for independent discovery.</p></section><section><h2>The moments along the way.</h2><div class="style-tabs">${p.highlights.map((h) => `<span class="tag">${icon("pin", 13)} ${h}</span>`).join("")}</div></section><section><h2>Your suggested itinerary</h2><p>Open each day to explore the plan. Adjust activities and rest time to suit your group.</p>${itinerary(p)}</section><section><div class="two-col"><div><h3>Planned inclusions</h3><ul>${p.inclusions.map((s) => `<li>${s}</li>`).join("")}</ul></div><div><h3>Not in this estimate</h3><ul>${p.exclusions.map((s) => `<li>${s}</li>`).join("")}</ul></div></div></section><section><h2>The practical details</h2><p>Hotels, transfers and sightseeing services are proposed options, not reservations. Tell your provider your preferred accommodation category and request an itemised quote.</p><p>Allow for local conditions and seasonal closures. Verify any entry documentation, permits and insurance requirements before booking.</p></section></div><aside class="sticky-card"><span class="eyebrow">Your next chapter</span><div class="price"><small>From</small><strong>${money(p.price)}</strong> <em>/ person</em></div><div class="package-meta"><span>${icon("clock", 15)} ${p.nights}N / ${p.days}D</span><span>${p.style}</span></div><p>Final pricing depends on your dates, group size and preferences.</p>${linkBtn("Plan this journey", "booking", "secondary", "?id=" + p.id)}<button class="btn outline" data-save-inline="${p.id}">${icon("heart", 17)} <span>${favoriteIds().includes(p.id) ? "Saved to your atlas" : "Save for later"}</span></button><button class="btn outline" data-save-itinerary="${p.id}">${icon("map", 17)} Save planning itinerary</button></aside></div></section><section class="section muted-bg"><div class="container">${sectionHead("A little more inspiration", "Other journeys you might love.")}<div class="package-grid">${PACKAGES.filter(
    (x) =>
      x.id !== p.id &&
      x.destination !== p.destination &&
      x.category === p.category,
  )
    .slice(0, 3)
    .map(card)
    .join("")}</div></div></section>`;
}
function destinationsPage() {
  return `${banner("The destination atlas", "Find your somewhere.", "Mountains or ocean. Near or far. There’s a beautiful world of possibility.", "japan-detail.webp")}<section class="section container">${sectionHead("Follow your curiosity", "A different view is waiting.")}<div class="search-input"><input id="destination-search" type="search" placeholder="Find a destination or country…" aria-label="Search destinations"></div><div class="style-tabs" role="tablist" aria-label="Destination region"><button class="pill" role="tab" data-region="" aria-selected="true">Everywhere</button><button class="pill" role="tab" data-region="domestic" aria-selected="false">Discover India</button><button class="pill" role="tab" data-region="international" aria-selected="false">Around the world</button></div><div class="dest-mosaic" id="dest-mosaic"></div></section>${closing()}`;
}
function renderDestinationFinder(region = "") {
  window.destinationRegion = region;
  let q = $("#destination-search").value.toLowerCase();
  let ds = DESTINATIONS.filter(
    (d) =>
      (!region || d.category === region) &&
      (d.name + " " + d.country).toLowerCase().includes(q),
  );
  $("#dest-mosaic").innerHTML = ds.length
    ? ds
        .map(
          (d) =>
            `<a class="getaway" href="${url(d.category + "-packages", "?destination=" + d.name)}">${img(d.image, d.name)}<div><span class="eyebrow" style="color:#fff;font-size:var(--type-support)">${d.country} · ${PACKAGES.filter((p) => p.destination === d.name).length} suggested journeys</span><h3>${d.name}</h3><p>${d.description}.</p><span class="text-link">Explore journeys ${icon("arrow", 17)}</span></div></a>`,
        )
        .join("")
    : empty(
        "Let’s look somewhere else.",
        "Try a destination or a country from our current collection.",
        "",
        "",
        "search",
      );
}
function bookingPage() {
  const id = new URLSearchParams(location.search).get("id") || PACKAGES[0].id;
  const editId = new URLSearchParams(location.search).get("edit");
  window.editRequest = read("requests").find((r) => r.id === editId);
  const p =
    PACKAGES.find((p) => p.id === (window.editRequest?.packageId || id)) ||
    PACKAGES[0];
  return `<div class="container intro-section"><span class="eyebrow">Your journey begins here</span><h1>Let’s shape your next story.</h1><p>A few thoughtful details. A plan that feels like you.<br> Plan your dates, preferences and the details that make a holiday yours.</p></div><section class="section container" style="padding-top:30px"><div class="form-layout"><form id="booking-form" class="form-card"><h2>Tell us about your journey</h2><div class="two-col"><label class="field">Full name<input name="name" required autocomplete="name" maxlength="100"></label><label class="field">Email address<input name="email" type="email" required autocomplete="email" maxlength="150"></label></div><div class="two-col"><label class="field">Phone number<input name="phone" type="tel" required pattern="[0-9+ ]{7,20}" autocomplete="tel" maxlength="20"></label><label class="field">Selected package<select name="packageId" id="booking-package">${PACKAGES.map((x) => `<option value="${x.id}" ${p.id === x.id ? "selected" : ""}>${x.title}</option>`).join("")}</select></label></div><div class="two-col"><label class="field">Destination<input name="destination" value="${p.destination}" required maxlength="100"></label><label class="field">Preferred departure date<input name="date" type="date" min="${localDateTomorrow()}" required><small>Choose a future date; availability is checked separately.</small></label></div><div class="two-col"><label class="field">Adults<input type="number" name="adults" min="1" max="20" step="1" value="2" required></label><label class="field">Children<input type="number" name="children" min="0" max="12" step="1" value="0" required></label></div><div class="two-col"><label class="field">Estimated budget per person<select name="budget" required><option value="">Choose your budget</option><option>Under ₹30,000</option><option>₹30,000 – ₹60,000</option><option>₹60,000 – ₹1,00,000</option><option>Above ₹1,00,000</option></select></label><label class="field">Travel style<select name="style">${styles.map((s) => `<option ${p.style === s ? "selected" : ""}>${s}</option>`).join("")}</select></label></div><label class="field">Accommodation preference<select name="accommodation"><option>Open to suggestions</option><option>Comfort</option><option>Premium</option><option>Luxury</option><option>Family-friendly stays</option></select></label><label class="field">Special requests<textarea name="requests" placeholder="A slower pace, accessible stays, dietary needs…" maxlength="1500"></textarea></label><label class="field">Anything else you’d like to add?<textarea name="message" maxlength="1500" placeholder="Tell us what a wonderful holiday looks like to you."></textarea></label><label class="check-line"><input type="checkbox" required><span>Save this enquiry on this device so I can review and share it when ready.</span></label><button class="btn" type="submit">Review my enquiry ${icon("arrow", 18)}</button></form><aside class="sticky-card" id="booking-summary"></aside></div></section>`;
}
function localDateTomorrow() {
  let d = new Date();
  d.setDate(d.getDate() + 1);
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0"),
  ].join("-");
}
function bookingSummary() {
  const form = $("#booking-form");
  const p = PACKAGES.find((p) => p.id === form.elements.packageId.value);
  const adults = +form.elements.adults.value || 0,
    children = +form.elements.children.value || 0;
  $("#booking-summary").innerHTML =
    `${img(p.image, p.destination)}<span class="eyebrow" style="margin-top:23px">Your journey at a glance</span><h3>${p.title}</h3><div class="summary-row"><span>Destination</span><b>${esc(form.elements.destination.value)}</b></div><div class="summary-row"><span>Duration</span><b>${p.nights} nights / ${p.days} days</b></div><div class="summary-row"><span>Travelers</span><b>${adults} adults · ${children} children</b></div><div class="summary-row"><span>Preferred date</span><b>${esc(form.elements.date.value || "Your choice")}</b></div><div class="summary-row"><span>Indicative from</span><b>${money(p.price)} / adult</b></div><div class="summary-row"><span>Adult estimate</span><b>${money(p.price * adults)}</b></div><p>Child rates, airfare, extras and availability need a provider quote. This estimate is for planning only.</p>`;
}
function enquiryText(r) {
  let p = PACKAGES.find((p) => p.id === r.packageId);
  return `TRAVEL PLANNING ENQUIRY — ${r.status || "Local draft"}\nNot a confirmed booking. Not submitted to an operator.\n\nReference: ${r.id || "New draft"}\nPackage: ${p?.title || r.packageId}\nDestination: ${r.destination}\nDuration: ${p?.days} days\nName: ${r.name}\nEmail: ${r.email}\nPhone: ${r.phone}\nPreferred date: ${r.date}\nAdults: ${r.adults}\nChildren: ${r.children}\nBudget per person: ${r.budget}\nStyle: ${r.style}\nAccommodation: ${r.accommodation}\nSpecial requests: ${r.requests || "None"}\nMessage: ${r.message || "None"}\n\nPrices and arrangements require an operator quote.`;
}
function reviewBooking(e) {
  e.preventDefault();
  const form = e.currentTarget;
  if (!form.reportValidity()) return;
  let r = Object.fromEntries(new FormData(form));
  if (r.date < localDateTomorrow()) {
    form.elements.date.setCustomValidity("Please choose a future date.");
    form.elements.date.reportValidity();
    return;
  }
  r.adults = +r.adults;
  r.children = +r.children;
  window.pendingEnquiry = r;
  showModal(
    `<div class="review-sheet"><span class="eyebrow">One last look</span><h3>Your journey, in the making.</h3><p style="font-size:var(--type-support);margin-bottom:20px">Review your details before saving your local plan.</p>${[
      ["Package", PACKAGES.find((p) => p.id === r.packageId).title],
      ["Traveler", r.name],
      ["Email", r.email],
      ["Destination", r.destination],
      ["Departure", r.date],
      ["Travelers", r.adults + " adults · " + r.children + " children"],
      ["Budget", r.budget],
      ["Accommodation", r.accommodation],
    ]
      .map(
        ([a, b]) =>
          `<div class="summary-row"><span>${a}</span><b>${esc(b)}</b></div>`,
      )
      .join(
        "",
      )}<div class="notice" style="margin-top:20px">Save this enquiry as a draft in your travel journal. It will be ready to review or share.</div><div class="actions"><button class="btn" id="confirm-enquiry">Save enquiry draft ${icon("check", 17)}</button><button class="btn outline modal-edit">Edit details</button></div></div>`,
  );
}
function contactPage() {
  return `<div class="container intro-section"><span class="eyebrow">We’re all ears</span><h1>Every great journey starts<br> with a conversation.</h1><p>Have an idea, a question, or a place you can’t stop thinking about? Put it into words.</p></div><section class="section container"><div class="form-layout"><form class="form-card" id="contact-form"><h2>Tell us what’s on your mind</h2><label class="field">Your name<input name="name" required maxlength="100" autocomplete="name"></label><label class="field">Email address<input name="email" required type="email" maxlength="150" autocomplete="email"></label><label class="field">What would you like help with?<select name="topic"><option>Planning a holiday</option><option>Package customisation</option><option>My travel plans</option><option>Travel documents</option><option>Something else</option></select></label><label class="field">Your message<textarea name="message" required minlength="10" maxlength="3000" placeholder="A few details help us understand your plans."></textarea></label><button class="btn" type="submit">Review my message ${icon("arrow", 18)}</button></form><aside><div class="panel"><span class="eyebrow">A little guidance</span><h3>Start with a little inspiration.</h3><p style="margin-block:18px;font-size:var(--type-support)">Choose a package first and we’ll carry the details into your planning enquiry.</p>${linkBtn("Explore packages", "deals", "outline")}</div><div class="panel" style="margin-top:25px"><h3>Already making plans?</h3><p style="margin-block:18px;font-size:var(--type-support)">Your saved enquiries, favourites and suggested itineraries are in your traveler workspace.</p><a class="text-link" href="${url("dashboard")}">Open your workspace ${icon("arrow", 17)}</a></div><div class="panel" style="margin-top:25px"><h3>A quick question?</h3><p style="margin-block:18px;font-size:var(--type-support)">Find clear answers about planning, estimates, documents and local data.</p><a class="text-link" href="${url("faq")}">Visit the FAQ ${icon("arrow", 17)}</a></div></aside></div></section>`;
}
function authPage(signup = false) {
  return `<main id="main" class="auth-shell ${signup ? "auth-signup" : "auth-login"}"><div class="auth-utilities">${utilities()}</div><div class="auth-photo"><div class="auth-photo-mask">${img(signup ? "hiking-journal.webp" : "hero-journal.webp", signup ? "A hiker on a mountain trail" : "The Italian Dolomites reflected in an alpine lake", "", false)}</div><div class="auth-story"><span class="eyebrow">${signup ? "Every journey starts somewhere" : "Your traveler journal"}</span><h2>${signup ? "A little curiosity.<br> A whole new chapter." : "The places you love.<br> The plans you’re<br> looking forward to."}</h2><p>${signup ? "Make room for the extraordinary. Start a journal of places, possibilities and beautifully considered plans." : "Your favourite escapes, thoughtful plans and next great adventure. All a little closer."}</p><span class="auth-location">${icon("pin", 17)} ${signup ? "A path worth following" : "The Dolomites, Italy"}</span></div></div><div class="auth-form-wrap"><div class="auth-form">${brand()}<span class="eyebrow">${signup ? "A journal of possibilities" : "A new adventure, whenever you’re ready"}</span><h1>${signup ? "Let your next<br> chapter begin." : "Welcome back,<br> explorer."}</h1><p>${signup ? "A little space for your favourite places and the journeys still to come." : "Pick up where your curiosity left off."}</p><form id="auth-form">${signup ? '<label class="field">Full name<input name="name" required autocomplete="name" maxlength="100" placeholder="Your full name"></label>' : ""}<label class="field">Email address<input type="email" name="email" required autocomplete="email" maxlength="150" placeholder="you@example.com"></label>${signup ? '<label class="field">Phone number<input type="tel" name="phone" pattern="[0-9+ ]{7,20}" required autocomplete="tel" placeholder="Your contact number"></label>' : ""}<label class="field">Password<span class="password-wrap"><input name="password" type="password" required minlength="8" autocomplete="${signup ? "new-password" : "current-password"}" placeholder="${signup ? "Create a password" : "Your password"}"><button class="password-toggle" type="button" aria-label="Show password">${icon("eye", 19)}</button></span></label>${signup ? `<label class="field">Confirm password<span class="password-wrap"><input name="confirmPassword" type="password" required minlength="8" autocomplete="new-password" placeholder="One more time"><button class="password-toggle" type="button" aria-label="Show password">${icon("eye", 19)}</button></span></label>` : `<div class="auth-options"><label><input type="checkbox" name="remember"> Remember me</label><button type="button" id="forgot-password">Forgot password?</button></div>`}<button class="btn" type="submit">${signup ? "Create my journal" : "Sign in to my journal"} ${icon("arrow", 18)}</button><div class="form-message" id="auth-message" role="status"></div></form><div class="auth-bottom">${signup ? "Already have a journal?" : "A new chapter?"} <a href="${url(signup ? "login" : "signup")}">${signup ? "Sign in" : "Start here"}</a></div></div></div></main>`;
}
const aboutExperiences = [
  {
    name: "Adventure",
    style: "Adventure",
    id: "ladakh-1",
    headline: "Go where the road becomes the story.",
    text: "Wide horizons, quieter valleys and a little room for discovery. Choose an adventure that fits your pace.",
  },
  {
    name: "Discovery",
    style: "Cultural Journeys",
    id: "japan-2",
    headline: "A new place. A different perspective.",
    text: "Follow the details: a neighbourhood lane, a local craft, a conversation that gives a place new meaning.",
  },
  {
    name: "Relaxation",
    style: "Beach Escapes",
    id: "goa-2",
    headline: "Sometimes, less is everything.",
    text: "An unhurried morning. Salt in the air. Make space for the simple pleasure of being somewhere beautiful.",
  },
  {
    name: "Family",
    style: "Family Holidays",
    id: "kerala-2",
    headline: "Make a little room for everyone.",
    text: "Shared discoveries, flexible days and the kind of moments that become your family’s favourite stories.",
  },
  {
    name: "Romance",
    style: "Romantic Getaways",
    id: "bali-2",
    headline: "A journey for your favourite two.",
    text: "Leave the everyday behind. Find an island morning or a scenic detour that belongs to just the two of you.",
  },
];

function aboutExperienceContent(i) {
  const e = aboutExperiences[i],
    p = PACKAGES.find((p) => p.id === e.id);
  return `<div class="experience-image">${img(p.image, p.destination)}</div><div class="experience-caption"><div><span class="eyebrow">${e.name} · ${p.destination}</span><h3>${e.headline}</h3></div><div><p>${e.text}</p><a class="text-link" href="${url("deals", "?style=" + encodeURIComponent(e.style))}">Discover ${e.name.toLowerCase()} journeys ${icon("arrow", 18)}</a></div></div>`;
}

function aboutPage() {
  return `<section class="about-cover container"><div class="about-cover-copy"><span class="eyebrow">The Waylark perspective</span><h1>There’s a whole<br> world <em>beyond<br> the map.</em></h1><p>For the places that move you.<br> And the moments you bring home.</p><a class="text-link" href="#our-perspective">A little further this way ${icon("arrow", 19)}</a></div><div class="about-cover-photo">${img("hiking-journal.webp", "A hiker following an alpine mountain trail", "", false)}<span class="photo-journal-label">FIELD NOTES / A SENSE OF WONDER</span></div></section><section class="section container about-introduction" id="our-perspective"><div><span class="eyebrow">More than a pin on a map</span><h2>Go a little further.<br> Come back a little<br> different.</h2></div><div><p>Travel can change the way a day feels. A winding road asks you to slow down. A mountain horizon makes room for a new thought. An unfamiliar street becomes a favourite memory.</p><p>Waylark brings those possibilities into focus: inspiring places, considered routes, and a personal space to turn “one day” into a plan.</p></div></section><section class="about-panorama"><div class="container"><div class="panorama-photo">${img("hero-journal.webp", "The mountain landscape and lake at Lago di Braies, Italy")}</div><div class="panorama-story"><span class="eyebrow">Leave a little space for wonder</span><h2>The best part might<br> be the part you<br> didn’t plan.</h2><p>A longer lunch. A quieter path. One more look at the view. Our suggested journeys are a starting point, with room for the moments that make them yours.</p><span class="panorama-location">${icon("pin", 17)} The Dolomites, Italy</span></div></div></section><section class="section container experience-explorer">${sectionHead("The feeling you’re looking for", "Many ways to go.<br> One world to fall in love with.")}<div class="experience-tabs" role="tablist" aria-label="Travel experiences">${aboutExperiences.map((e, i) => `<button class="experience-tab" role="tab" aria-selected="${i === 0}" aria-controls="experience-panel" id="experience-tab-${i}" data-experience="${i}">${e.name} ${icon("arrow", 17)}</button>`).join("")}</div><div id="experience-panel" role="tabpanel" aria-labelledby="experience-tab-0">${aboutExperienceContent(0)}</div></section><section class="section philosophy-section"><div class="container philosophy-layout"><div class="philosophy-title"><span class="eyebrow">A considered kind of travel</span><h2>A little intention.<br> A better journey.</h2></div><div class="philosophy-notes">${[
    [
      "Follow your curiosity",
      "Begin with what you love, rather than a list of places to tick off. Find a route that gives your interests a little more room.",
    ],
    [
      "Make the details feel simple",
      "Clear starting estimates, flexible planning notes and a personal journal help you see the shape of your holiday.",
    ],
    [
      "Leave a thoughtful footprint",
      "Respect the people and places you visit. Choose a comfortable pace and be open to a local perspective.",
    ],
  ]
    .map(
      ([h, t], i) =>
        `<article><span>0${i + 1}</span><div><h3>${h}</h3><p>${t}</p></div></article>`,
    )
    .join(
      "",
    )}</div></div></section><section class="container about-invitation"><div><span class="eyebrow">Your next chapter</span><h2>Your map still has<br> a little blank space.</h2><p>Let’s find something wonderful to put there.</p></div>${linkBtn("Begin a beautiful journey", "booking", "secondary")}</section>`;
}
const stories = [
  [
    "The art of travelling a little slower",
    "A different pace",
    "kerala-detail.webp",
    "Leave room for the beautiful things you didn’t plan.",
  ],
  [
    "A mountain state of mind",
    "Into the mountains",
    "kashmir-detail.jpg",
    "Why the scenic route deserves a little more of your time.",
  ],
  [
    "The joy of a shared journey",
    "Better together",
    "maldives-detail.webp",
    "Making space for the people you love, wherever you go.",
  ],
];
function blogPage() {
  return `${banner("Notes from the atlas", "Stories for the journey.", "A little inspiration for curious minds and restless feet.", "japan.webp")}<section class="section container"><div class="package-grid">${stories.map(([title, cat, file, desc], i) => `<article class="blog-card">${img(file, title)}<span class="eyebrow">${cat} · 4 min read</span><h3><a href="${url("blog-details", "?story=" + i)}">${title}</a></h3><p>${desc}</p><a class="text-link" href="${url("blog-details", "?story=" + i)}">Read the story ${icon("arrow", 17)}</a></article>`).join("")}</div></section>${closing()}`;
}
function articlePage() {
  let i = Number(new URLSearchParams(location.search).get("story") || 0);
  const s = stories[i] || stories[0];
  const bodies = [
    [
      "Let the day surprise you.",
      "We often fill an itinerary with places to see, forgetting to leave room for how a place feels. An unhurried morning can become the part of a journey you remember most. The sound of water beside a houseboat. The first cup of tea before a town wakes up.",
      "Choose fewer places. Experience them more.",
      "Build your plan around a few meaningful stops. Keep one afternoon open. Wander without collecting landmarks. Ask a local guide for a different perspective, and give yourself time to listen.",
      "The best souvenir is a new way of seeing.",
    ],
    [
      "The view is only the beginning.",
      "Mountains have a way of shifting our sense of scale. Plans become a little smaller; the horizon becomes a little larger. But the journey is also the village, the quiet footpath, and the people who call these landscapes home.",
      "Follow your own pace.",
      "Choose a route that fits your experience and comfort. Make room for rest. Talk with qualified local guides about terrain and conditions, and remember that choosing to turn back can be part of a good journey.",
      "Sometimes the long way brings you a little closer.",
    ],
    [
      "A little room for everyone.",
      "A shared holiday brings different ideas of a perfect day together. Some of us wake for the sunrise; others would rather linger over breakfast. A thoughtful plan has space for both.",
      "Plan the moments, leave space in between.",
      "Let every traveler choose something to look forward to. Alternate active days with slower ones. Agree on a comfortable pace, and keep the small details flexible enough for a spontaneous stop.",
      "The places are beautiful. The people make the memories.",
    ],
  ][i] || [
    "",
    "Travel invites a fresh perspective.",
    "",
    "Leave room for wonder.",
    "Take the scenic route.",
  ];
  return `${banner("The travel journal", s[0], s[3], s[2])}<article class="section container article"><p class="lead">${bodies[1]}</p><h2>${bodies[0]}</h2><p>A good itinerary is a beginning, not a race. Use your plans as a guide, then make them your own through the moments that catch your attention.</p><blockquote>${bodies[4]}</blockquote><h2>${bodies[2]}</h2><p>${bodies[3]}</p><div class="actions" style="margin-top:35px">${linkBtn("Find your next journey", "destinations")}<a class="text-link" href="${url("blog")}">More from the journal ${icon("arrow", 17)}</a></div></article>`;
}
function legalPage(type) {
  let privacy = type === "privacy";
  let sections = privacy
    ? [
        [
          "Your browser, your workspace",
          "Favourites, local planning requests, itineraries, settings and a display profile are stored in this browser using localStorage. Requests may contain the contact details you enter. Only include information you are comfortable keeping on this device.",
        ],
        [
          "What we don’t collect",
          "This website does not submit enquiries, process payments or provide account authentication. Passwords are not stored. Do not enter passport numbers, identity documents or payment card information.",
        ],
        [
          "Your choices",
          "Use Dashboard Settings to export or clear your local data. Clearing browser storage also removes your plans. This workspace has no automatic cloud sync or account recovery.",
        ],
        [
          "External services",
          "Fonts and photographs are served locally with the site. Links to external services are governed by their own policies. No analytics or advertising trackers are included on this website.",
        ],
        [
          "Questions and changes",
          "Use the Contact page to prepare a privacy question for your provider.",
        ],
      ]
    : [
        [
          "Travel information and prices",
          "Package prices are starting estimates. Confirm availability, inclusions and final pricing with your travel provider before making arrangements.",
        ],
        [
          "Enquiries and reservations",
          "Enquiry drafts are saved on this device. Booking, payment and cancellation terms are agreed directly with your travel provider.",
        ],
        [
          "Documents and billing",
          "Tickets and invoices require genuine provider-issued records. The website does not generate valid tickets or proof of payment. User-created itineraries are planning documents.",
        ],
        [
          "Traveler responsibilities",
          "Verify passport, entry, permit, health and insurance requirements with appropriate official authorities. Choose activities suitable for your group and obtain provider advice about local conditions.",
        ],
        [
          "Local workspace",
          "Keep an export of important plans. Browser data can be cleared or lost and is not automatically synchronised. Shared-device users should clear personal drafts after exporting.",
        ],
      ];
  return `<div class="container intro-section"><span class="eyebrow">Good to know</span><h1>${privacy ? "Your privacy, thoughtfully considered." : "A few things to know."}</h1><p>Updated November 2026</p></div><article class="section container legal">${sections.map(([t, c]) => `<h2>${t}</h2><p>${c}</p>`).join("")}</article>`;
}
function specialPage(coming = false) {
  return `<div class="error-page"><span class="error-code">${coming ? icon("compass", 100) : "404"}</span><span class="eyebrow" style="justify-content:center">${coming ? "The next chapter" : "A small detour"}</span><h1>${coming ? "Something wonderful is on the horizon." : "A little off the beaten path."}</h1><p>${coming ? "Our next collection is still taking shape. There are plenty of beautiful places to explore in the meantime." : "That page isn’t on our map. Let’s find your way back to somewhere inspiring."}</p><div class="actions"><a class="btn" href="${home()}">Back to exploring ${icon("arrow", 17)}</a>${linkBtn("Browse destinations", "destinations", "outline")}</div></div>`;
}
function render() {
  if (PAGE === "dashboard") return;
  if (["login", "signup"].includes(PAGE)) {
    $("#app").innerHTML = authPage(PAGE === "signup");
    bindAuth();
    return;
  }
  let content;
  switch (PAGE) {
    case "index":
      content = homePage();
      break;
    case "home2":
      content = journalPage();
      break;
    case "domestic-packages":
      content = catalogPage("domestic");
      break;
    case "international-packages":
      content = catalogPage("international");
      break;
    case "deals":
      content = catalogPage("deals");
      break;
    case "honeymoon-family":
      content = togetherPage();
      break;
    case "package-details":
      content = detailPage();
      break;
    case "destinations":
      content = destinationsPage();
      break;
    case "booking":
      content = bookingPage();
      break;
    case "contact":
      content = contactPage();
      break;
    case "about":
      content = aboutPage();
      break;
    case "faq":
      content = `<div class="container intro-section"><span class="eyebrow">A little clarity</span><h1>Good questions.<br> Thoughtful answers.</h1><p>Everything you need to know about shaping your journey and keeping your plans together.</p></div><section class="section container faq-layout"><div><h2>Before the adventure.</h2><p>Still need a little help?</p><a class="text-link" href="${url("contact")}" style="margin-top:20px">Start a conversation ${icon("arrow", 17)}</a></div><div>${faqs.map(([q, a]) => accordion(q, a)).join("")}</div></section>`;
      break;
    case "blog":
      content = blogPage();
      break;
    case "blog-details":
      content = articlePage();
      break;
    case "privacy":
    case "terms":
      content = legalPage(PAGE);
      break;
    case "coming-soon":
      content = specialPage(true);
      break;
    default:
      content = specialPage();
  }
  $("#app").innerHTML =
    header() + `<main id="main">${content}</main>` + footer();
  bindPublic();
}
function bindPublic() {
  setupDropdown();
  setupBackTop();
  $(".menu-btn")?.addEventListener("click", openDrawer);
  $("#hero-search")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = new URLSearchParams(new FormData(e.currentTarget));
    const d = DESTINATIONS.find((d) => d.name === q.get("destination"));
    location.href = url(d ? d.category + "-packages" : "deals", "?" + q);
  });
  if ($("#catalog-grid")) {
    const q = new URLSearchParams(location.search);
    [
      ["destination", "destination"],
      ["style", "style"],
      ["budget", "budget"],
    ].forEach(([param, id]) => {
      if (
        q.get(param) &&
        [...$("#filter-" + id).options].some((o) => o.value === q.get(param))
      )
        $("#filter-" + id).value = q.get(param);
    });
    $$(".filter-panel select,#sort-packages").forEach((el) =>
      el.addEventListener("change", updateCatalog),
    );
    $("#clear-filters").addEventListener("click", () => {
      $$(".filter-panel select").forEach((s) => (s.value = ""));
      $("#sort-packages").value = "recommended";
      updateCatalog();
    });
    updateCatalog();
  }
  if ($("#together-grid"))
    selectAudience(
      new URLSearchParams(location.search).get("audience") === "Family"
        ? "Family"
        : "Honeymoon",
    );
  if ($("#dest-mosaic")) {
    renderDestinationFinder();
    $("#destination-search").addEventListener("input", () =>
      renderDestinationFinder(window.destinationRegion),
    );
  }
  if ($("#booking-form")) {
    if (window.editRequest) {
      Object.entries(window.editRequest).forEach(([k, v]) => {
        if ($("#booking-form").elements[k])
          $("#booking-form").elements[k].value = v;
      });
    }
    $("#booking-form").addEventListener("input", () => {
      $("#booking-form").elements.date.setCustomValidity("");
      bookingSummary();
    });
    $("#booking-package").addEventListener("change", () => {
      const p = PACKAGES.find((p) => p.id === $("#booking-package").value);
      $("#booking-form").elements.destination.value = p.destination;
      $("#booking-form").elements.style.value = p.style;
      bookingSummary();
    });
    $("#booking-form").addEventListener("submit", reviewBooking);
    bookingSummary();
  }
  $("#contact-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const r = Object.fromEntries(new FormData(e.currentTarget));
    window.contactMessage = `TRAVEL ENQUIRY — prepared locally, not sent\n\nFrom: ${r.name}\nEmail: ${r.email}\nTopic: ${r.topic}\n\n${r.message}`;
    showModal(
      `<span class="eyebrow">Ready to share</span><h3>Your message is prepared.</h3><p style="margin-block:20px;font-size:var(--type-support)">Copy or download this message to share through your travel provider’s verified contact channel. It hasn’t been sent.</p><div class="notice" style="white-space:pre-wrap">${esc(window.contactMessage)}</div><div class="actions" style="margin-top:25px"><button class="btn" id="copy-contact">Copy message ${icon("copy", 17)}</button><button class="btn outline" id="download-contact">Download ${icon("download", 17)}</button></div>`,
    );
  });
}
function setupDropdown() {
  const d = $(".home-dropdown");
  if (!d) return;
  const toggle = $(".home-toggle", d);
  let pinned = false;
  const set = (open) => {
    d.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open);
  };
  toggle.addEventListener("click", () => {
    pinned = !pinned;
    set(pinned);
  });
  d.addEventListener("mouseenter", () => {
    if (matchMedia("(hover:hover)").matches) set(true);
  });
  d.addEventListener("mouseleave", () => {
    if (!pinned && !d.contains(document.activeElement)) set(false);
  });
  d.addEventListener("focusin", () => set(true));
  d.addEventListener("focusout", () =>
    setTimeout(() => {
      if (!d.contains(document.activeElement)) {
        pinned = false;
        set(false);
      }
    }, 0),
  );
  document.addEventListener("click", (e) => {
    if (!d.contains(e.target)) {
      pinned = false;
      set(false);
    }
  });
  d.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      pinned = false;
      toggle.focus();
      set(false);
      e.stopPropagation();
    }
  });
}

let drawerReturnFocus;
function trapFocus(e, container) {
  if (e.key !== "Tab") return;
  const focusables = $$(
    'a,button,input,select,textarea,summary,[tabindex="0"]',
    container,
  ).filter((el) => !el.disabled && el.offsetParent !== null);
  const first = focusables[0],
    last = focusables.at(-1);
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}
function openDrawer() {
  drawerReturnFocus = document.activeElement;
  $(".menu-btn").setAttribute("aria-expanded", "true");
  const shell = document.createElement("div");
  shell.id = "mobile-shell";
  shell.innerHTML = `<div class="scrim" data-close-drawer></div><div class="drawer" role="dialog" aria-modal="true" aria-label="Main navigation"><div class="drawer-head">${brand()}<button class="icon-btn" data-close-drawer aria-label="Close navigation">${icon("close", 18)}</button></div><nav aria-label="Mobile navigation"><details><summary>Home</summary><a href="${home()}">Home 1</a><a href="${url("home2")}">Home 2</a></details>${navigation()}</nav>${utilities()}<a class="btn header-login" href="${url("login")}">Login ${icon("arrow", 17)}</a></div>`;
  document.body.append(shell);
  document.body.style.overflowY = "hidden";
  $("#app").inert = true;
  $(".drawer button").focus();
  shell.addEventListener("keydown", (e) => trapFocus(e, $(".drawer")));
}
function closeDrawer() {
  const shell = $("#mobile-shell");
  if (!shell) return;
  shell.remove();
  document.body.style.overflowY = "";
  $("#app").inert = false;
  $(".menu-btn")?.setAttribute("aria-expanded", "false");
  drawerReturnFocus?.focus();
}
function toggleTheme() {
  const v =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = v;
  localStorage.setItem("atlas-theme", v);
  $$(".theme-toggle").forEach(
    (el) => (el.innerHTML = icon(v === "dark" ? "sun" : "moon", 19)),
  );
}
function toggleDirection() {
  const v = document.documentElement.dir === "rtl" ? "ltr" : "rtl";
  document.documentElement.dir = v;
  localStorage.setItem("atlas-direction", v);
  $$(".direction-toggle").forEach(
    (el) => (el.textContent = v === "rtl" ? "LTR" : "RTL"),
  );
}
function setGallery(i) {
  galleryIndex = (i + galleryDestinations.length) % galleryDestinations.length;
  $$("[data-destination]").forEach((el, index) => {
    el.classList.toggle("selected", index === galleryIndex);
    el.setAttribute("aria-pressed", index === galleryIndex);
  });
  const d = galleryDestinations[galleryIndex],
    photo = $(".atlas-active-image");
  photo.src = A + "images/" + d.image;
  photo.alt = d.name;
  $("#atlas-title").innerHTML =
    "A little wonder<br> called " + esc(d.name) + ".";
  $("#atlas-country").textContent =
    d.country +
    " · " +
    PACKAGES.filter((p) => p.destination === d.name).length +
    " suggested journeys";
  $("#atlas-image-country").textContent = d.country;
  $("#atlas-image-name").textContent = d.name;
  $("#gallery-description").textContent =
    d.description +
    ". Follow your curiosity into a journey you can make your own.";
  $("#gallery-link").href = url(
    d.category + "-packages",
    "?destination=" + d.name,
  );
  $("#gallery-link").innerHTML = "Explore " + d.name + " " + icon("arrow", 18);
  $("#gallery-count").textContent = String(galleryIndex + 1).padStart(2, "0");
  if (!matchMedia("(prefers-reduced-motion:reduce)").matches)
    photo.animate(
      [
        { opacity: 0.45, transform: "scale(1.025)" },
        { opacity: 1, transform: "scale(1)" },
      ],
      { duration: 450, easing: "ease-out" },
    );
}
function setPlanningStage(i) {
  const s = planningStages[i];
  $$("[data-planning-stage]").forEach((b, index) =>
    b.setAttribute("aria-selected", index === i),
  );
  const im = $(".planning-active-image");
  im.src = A + "images/" + s.image;
  im.alt = s.alt;
  $("#planning-title").textContent = s.title;
  $("#planning-caption").textContent = s.caption;
  $("#planning-action").innerHTML = linkBtn(s.action, s.page, "secondary");
  $("#planning-visual").setAttribute("aria-labelledby", "planning-stage-" + i);
}
function setupBackTop() {
  const button = $(".back-top"),
    footer = $(".site-footer"),
    divider = footer?.querySelector(".footer-bottom");
  if (!button || !footer || !divider) return;
  let scheduled = false;
  function update() {
    scheduled = false;
    button.hidden =
      scrollY <
      Math.min(
        500,
        Math.max(
          180,
          (document.documentElement.scrollHeight - innerHeight) * 0.4,
        ),
      );
    if (button.hidden) return;
    const height = button.offsetHeight,
      dockTop = divider.getBoundingClientRect().top - height - 16;
    if (dockTop <= innerHeight - height - 24) {
      button.classList.add("docked");
      button.style.top = scrollY + dockTop + "px";
      button.style.bottom = "";
    } else {
      button.classList.remove("docked");
      button.style.top = "";
      const rect = button.getBoundingClientRect();
      const targets = $$(
        "form button[type=submit],.closing .btn,.about-invitation .btn,.catalog-help .btn,.footer-links a",
      )
        .map((target) => target.getBoundingClientRect())
        .filter((r) => r.width && r.left < rect.right && r.right > rect.left);
      let top = innerHeight - height - 24;
      for (let pass = 0; pass < targets.length; pass++) {
        const previous = top;
        for (const r of targets) {
          if (r.bottom > top - 10 && r.top < top + height + 10)
            top = Math.min(top, r.top - height - 14);
        }
        if (top === previous) break;
      }
      button.style.bottom = innerHeight - top - height + "px";
    }
  }
  function schedule() {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(update);
    }
  }
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  new ResizeObserver(schedule).observe(footer);
  update();
}

function toggleFavorite(id) {
  let ids = favoriteIds();
  const p = PACKAGES.find((p) => p.id === id);
  if (!p) return;
  let remove = ids.includes(id);
  ids = remove ? ids.filter((x) => x !== id) : [...ids, id];
  if (!write("favorites", ids)) return;
  activity(
    `${remove ? "Removed" : "Saved"} ${p.title} ${remove ? "from" : "to"} your favourites.`,
  );
  $$(`[data-favorite="${id}"]`).forEach((el) => {
    el.setAttribute("aria-pressed", !remove);
    el.setAttribute("aria-label", `${remove ? "Save" : "Remove"} ${p.title}`);
  });
  $$(`[data-save-inline="${id}"] span`).forEach(
    (el) =>
      (el.textContent = remove ? "Save for later" : "Saved to your atlas"),
  );
  toast(
    remove
      ? "Removed from your saved journeys."
      : "Saved to your traveler workspace.",
  );
  if (PAGE === "dashboard" && window.refreshDashboard)
    window.refreshDashboard();
}
function saveItinerary(id) {
  let ids = read("itineraries");
  if (!ids.includes(id)) {
    ids.push(id);
    if (!write("itineraries", ids)) return;
    activity(
      "Saved a planning itinerary for " +
        PACKAGES.find((p) => p.id === id).title +
        ".",
    );
  }
  toast("Planning itinerary saved in your workspace.");
}
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    toast("Copied. Ready to share.");
  } catch {
    download("travel-enquiry.txt", text);
    toast("Clipboard unavailable. Downloaded a copy instead.");
  }
}
function bindAuth() {
  $("#auth-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    if (
      f.elements.confirmPassword &&
      f.elements.password.value !== f.elements.confirmPassword.value
    ) {
      f.elements.confirmPassword.setCustomValidity("Passwords must match.");
      f.elements.confirmPassword.reportValidity();
      return;
    }
    $("#auth-message").textContent =
      "Account access is currently unavailable. Your password has not been saved.";
    f.elements.password.value = "";
    if (f.elements.confirmPassword) f.elements.confirmPassword.value = "";
  });
  $("#auth-form").addEventListener("input", () => {
    if ($("#auth-form").elements.confirmPassword)
      $("#auth-form").elements.confirmPassword.setCustomValidity("");
  });
  $("#forgot-password")?.addEventListener("click", () =>
    showModal(
      '<span class="eyebrow">Account help</span><h3>Password reset is unavailable.</h3><p style="margin-block:20px">Please try again later. Your saved journeys remain on this device.</p>',
    ),
  );
}
document.addEventListener("click", (e) => {
  const el = e.target.closest("button,a");
  if (!el) return;
  if (el.matches(".theme-toggle")) toggleTheme();
  if (el.matches(".direction-toggle")) toggleDirection();
  if (el.matches("[data-close-drawer]")) closeDrawer();
  if (el.matches(".back-top"))
    window.scrollTo({
      top: 0,
      behavior: matchMedia("(prefers-reduced-motion:reduce)").matches
        ? "instant"
        : "smooth",
    });
  if (el.dataset.favorite) toggleFavorite(el.dataset.favorite);
  if (el.dataset.saveInline) toggleFavorite(el.dataset.saveInline);
  if (el.dataset.saveItinerary) saveItinerary(el.dataset.saveItinerary);
  if (el.dataset.galleryStep)
    setGallery(galleryIndex + Number(el.dataset.galleryStep));
  if (el.dataset.destination !== undefined)
    setGallery(Number(el.dataset.destination));
  if (el.dataset.journalDay !== undefined) {
    $$("[data-journal-day]").forEach((b) =>
      b.setAttribute("aria-selected", b === el),
    );
    $("#journal-day-panel").innerHTML = journalDayContent(
      Number(el.dataset.journalDay),
    );
    $("#journal-day-panel").setAttribute("aria-labelledby", el.id);
  }
  if (el.dataset.planningStage !== undefined)
    setPlanningStage(Number(el.dataset.planningStage));
  if (el.dataset.experience !== undefined) {
    const i = Number(el.dataset.experience);
    $$("[data-experience]").forEach((b) =>
      b.setAttribute("aria-selected", b === el),
    );
    $("#experience-panel").innerHTML = aboutExperienceContent(i);
    $("#experience-panel").setAttribute("aria-labelledby", el.id);
  }
  if (el.dataset.style) {
    $$("[role=tab][data-style]").forEach((b) => {
      b.setAttribute("aria-selected", b === el);
      b.tabIndex = b === el ? 0 : -1;
    });
    $("#style-content").innerHTML = styleContent(el.dataset.style);
    $("#style-content").setAttribute("aria-labelledby", el.id);
  }
  if (el.dataset.audience) {
    selectAudience(el.dataset.audience);
    if (el.classList.contains("audience-link"))
      $("#together-packages").scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion:reduce)").matches
          ? "instant"
          : "smooth",
      });
  }
  if (el.dataset.region !== undefined) {
    $$("[data-region]").forEach((b) =>
      b.setAttribute("aria-selected", b === el),
    );
    renderDestinationFinder(el.dataset.region);
  }
  if (el.dataset.quickDestination) {
    $("#filter-destination").value = el.dataset.quickDestination;
    updateCatalog();
  }
  if (el.dataset.photo)
    showModal(
      img(el.dataset.photo, window.currentPackage.destination, "", false),
    );
  if (el.matches(".modal-close,.modal-edit")) $("#modal").close();
  if (el.matches(".password-toggle")) {
    const input = $("input", el.parentElement);
    input.type = input.type === "password" ? "text" : "password";
    el.setAttribute(
      "aria-label",
      input.type === "password" ? "Show password" : "Hide password",
    );
  }
  if (el.id === "confirm-enquiry") {
    const r = {
      ...window.pendingEnquiry,
      id:
        window.editRequest?.id ||
        "PLAN-" + Date.now().toString(36).toUpperCase(),
      status: "Draft",
      updated: new Date().toISOString(),
    };
    let rs = read("requests");
    rs = rs.filter((x) => x.id !== r.id);
    rs.unshift(r);
    if (!write("requests", rs)) return;
    activity(
      `Saved a local planning draft for ${PACKAGES.find((p) => p.id === r.packageId).title}.`,
    );
    window.lastEnquiry = r;
    $("#modal-body").innerHTML =
      `<span class="eyebrow">A little closer to your journey</span><h3>Your enquiry draft is saved.</h3><p style="margin-block:20px">Reference ${esc(r.id)}. Copy or download your draft when you’re ready to share it with your travel provider.</p><div class="actions"><a class="btn" href="${url("dashboard", "#booking-status")}">View my planning request ${icon("arrow", 17)}</a><button class="btn outline" id="download-enquiry">Download enquiry ${icon("download", 17)}</button><button class="btn outline" id="copy-enquiry">Copy details ${icon("copy", 17)}</button></div>`;
  }
  if (el.id === "download-enquiry")
    download(
      "travel-enquiry-" + window.lastEnquiry.id + ".txt",
      enquiryText(window.lastEnquiry),
    );
  if (el.id === "copy-enquiry") copyText(enquiryText(window.lastEnquiry));
  if (el.id === "copy-contact") copyText(window.contactMessage);
  if (el.id === "download-contact")
    download("travel-message.txt", window.contactMessage);
});
document.addEventListener("click", (e) => {
  if (e.target.matches(".scrim[data-close-drawer]")) closeDrawer();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeDrawer();
  if (
    e.target.matches("[role=tab][data-style]") &&
    ["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)
  ) {
    e.preventDefault();
    const tabs = $$("[role=tab][data-style]");
    let i = tabs.indexOf(e.target);
    i =
      e.key === "Home"
        ? 0
        : e.key === "End"
          ? tabs.length - 1
          : (i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
    tabs[i].focus();
    tabs[i].click();
  }
});
let touchX = 0;
document.addEventListener(
  "touchstart",
  (e) => {
    if (e.target.closest(".destination-gallery"))
      touchX = e.changedTouches[0].clientX;
  },
  { passive: true },
);
document.addEventListener(
  "touchend",
  (e) => {
    if (e.target.closest(".destination-gallery")) {
      let delta = e.changedTouches[0].clientX - touchX;
      if (Math.abs(delta) > 45) setGallery(galleryIndex + (delta < 0 ? 1 : -1));
    }
  },
  { passive: true },
);
window.addEventListener("storage", (e) => {
  if (e.key === "atlas-favorites") {
    if (PAGE === "dashboard") window.refreshDashboard?.();
    else
      $$("[data-favorite]").forEach((el) =>
        el.setAttribute(
          "aria-pressed",
          favoriteIds().includes(el.dataset.favorite),
        ),
      );
  }
});
$("#modal").addEventListener("click", (e) => {
  if (e.target === $("#modal")) $("#modal").close();
});
render();

document.addEventListener("keydown", (e) => {
  if (
    !e.target.matches(
      "[data-planning-stage],[data-experience],[data-journal-day]",
    ) ||
    !["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)
  )
    return;
  const tabs = $$("[role=tab]", e.target.closest("[role=tablist]"));
  let i = tabs.indexOf(e.target);
  const rtl = document.documentElement.dir === "rtl";
  i =
    e.key === "Home"
      ? 0
      : e.key === "End"
        ? tabs.length - 1
        : (i +
            (e.key === "ArrowRight" ? (rtl ? -1 : 1) : rtl ? 1 : -1) +
            tabs.length) %
          tabs.length;
  e.preventDefault();
  tabs[i].focus();
  tabs[i].click();
});
