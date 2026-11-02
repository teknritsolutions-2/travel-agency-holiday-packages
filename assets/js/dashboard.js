"use strict";
const DASH_SECTIONS = [
  ["overview", "Overview", "grid"],
  ["my-trips", "My Trips", "bag"],
  ["booking-status", "Booking Status", "clock"],
  ["itineraries", "Itineraries", "map"],
  ["saved-packages", "Saved Packages", "heart"],
  ["documents", "Tickets & Documents", "file"],
  ["invoices", "Invoices", "file"],
  ["notifications", "Notifications", "bell"],
  ["profile", "Profile", "user"],
  ["settings", "Settings", "settings"],
];
let dashSection = "overview",
  selectedItinerary = "",
  sessionDocuments = [],
  sessionInvoices = [];
function dashProfile() {
  return read("profile", { name: "Explorer", email: "", contact: "Email" });
}
function dashNav() {
  return DASH_SECTIONS.map(
    ([id, label, ico]) =>
      `<a href="#${id}" ${id === dashSection ? 'class="active" aria-current="page"' : ""}>${icon(ico, 19)} ${label}</a>`,
  ).join("");
}
function dashboardShell() {
  const profile = dashProfile();
  $("#app").innerHTML =
    `<div class="dashboard-shell"><aside class="dashboard-sidebar" aria-label="Workspace navigation">${brand()}<span class="sidebar-label">YOUR TRAVEL WORKSPACE</span><nav class="dashboard-nav">${dashNav()}</nav><div class="sidebar-utilities">${utilities()}</div><div class="sidebar-bottom"><a href="${home()}">${icon("compass", 17)} Back to exploring</a><button id="guest-logout">${icon("logout", 17)} Leave guest workspace</button></div></aside><div class="dashboard-main"><header class="dashboard-topbar">${brand().replace('class="brand"', 'class="brand dashboard-mobile-brand"')}<button class="dashboard-menu" aria-label="Open workspace navigation" aria-expanded="false">${icon("menu", 23)}</button><span>Your next adventure, thoughtfully organised.</span><div class="actions">${utilities()}<a class="icon-btn" href="#notifications" aria-label="Notifications">${icon("bell", 18)}</a><a href="#profile" class="avatar" aria-label="Your profile">${esc(profile.name.charAt(0).toUpperCase())}</a></div></header><main class="dashboard-content" id="main"></main></div></div>`;
  $(".dashboard-menu").addEventListener("click", openDashDrawer);
}
function dashHeading(title, subtitle, action = "") {
  return `<div class="dash-heading"><div><span class="eyebrow">Your traveler workspace</span><h1>${title}</h1><p>${subtitle}</p></div>${action}</div>`;
}
function displayDate(date) {
  if (!date) return "Not selected";
  return new Date(date + "T12:00:00").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
function statusClass(status) {
  return status === "Enquiry Prepared" ? "status prepared" : "status";
}
function activeRequests() {
  return read("requests").filter((r) => r.status !== "Cancelled");
}
function tripCard(r) {
  const p = PACKAGES.find((p) => p.id === r.packageId);
  if (!p) return "";
  return `<article class="trip-card">${img(p.image, p.destination)}<div class="trip-copy"><span class="${statusClass(r.status)}">${esc(r.status)} · Local planning request</span><h3>${p.title}</h3><p>${icon("pin", 14)} ${esc(r.destination)} &nbsp; · &nbsp; ${displayDate(r.date)} &nbsp; · &nbsp; ${r.adults} adults${r.children ? " + " + r.children + " children" : ""}</p><div class="actions"><button class="btn small" data-request-view="${r.id}">View request ${icon("arrow", 15)}</button><a class="btn outline small" href="${url("booking", "?edit=" + r.id)}">Edit plan</a><button class="btn outline small" data-view-itinerary="${p.id}">View itinerary</button></div></div></article>`;
}
function overview() {
  const reqs = read("requests"),
    active = activeRequests(),
    saved = favoriteIds(),
    events = read("events");
  return `${dashHeading("A world of possibility, " + esc(dashProfile().name.split(" ")[0]) + ".", "A little organisation. A lot to look forward to.", linkBtn("Plan a journey", "booking", "secondary"))}<div class="stats-grid">${[
    ["Local trip plans", active.length, "Drafts, not reservations", "bag"],
    ["Saved journeys", saved.length, "Your next great possibilities", "heart"],
    [
      "Planning itineraries",
      read("itineraries").length,
      "Suggested day-by-day routes",
      "map",
    ],
    [
      "Issued documents",
      sessionDocuments.length,
      "Files you supplied this session",
      "file",
    ],
  ]
    .map(
      ([t, n, d, i]) =>
        `<div class="stat-card"><div>${t} ${icon(i, 19)}</div><strong>${n}</strong><small>${d}</small></div>`,
    )
    .join(
      "",
    )}</div><div class="dash-welcome"><div><span class="eyebrow">Your next chapter</span><h2>Good things begin<br>with a little curiosity.</h2><p>Build your wish list, shape a route, and keep your plans close. Your next story is waiting to happen.</p>${linkBtn("Find your next escape", "destinations", "secondary small")}</div>${img("kashmir.webp", "Kashmir alpine lake")}</div><div class="dash-grid"><section class="panel"><div class="panel-title"><h2>Your planning compass</h2><a href="#booking-status">View requests ${icon("arrow", 14)}</a></div><p style="font-size:var(--type-support)">The actual state of your local planning requests.</p>${[
    ["Draft", reqs.filter((r) => r.status === "Draft").length],
    [
      "Enquiry Prepared",
      reqs.filter((r) => r.status === "Enquiry Prepared").length,
    ],
    ["Cancelled", reqs.filter((r) => r.status === "Cancelled").length],
  ]
    .map(
      ([s, n]) =>
        `<div class="progress-row"><span>${s}</span><span>${n} ${n === 1 ? "request" : "requests"}</span></div><div class="progress-bar" role="img" aria-label="${n} ${s} requests"><span style="width:${reqs.length ? (n / reqs.length) * 100 : 0}%"></span></div>`,
    )
    .join(
      "",
    )}<p style="font-size:var(--type-support);margin-top:24px">No confirmed bookings are connected to this workspace.</p></section><section class="panel"><div class="panel-title"><h2>Little steps, recent moments</h2><a href="#notifications">View all</a></div>${events.length ? events.slice(0, 3).map(eventRow).join("") : `<div class="event-row"><span class="event-dot"></span><div>Your story starts here.<small>Save a journey or prepare a plan to see your activity.</small></div></div><div class="event-row">${icon("heart", 18)}<div>Make a wish list.<small>Keep the places you’d love to visit in Saved Packages.</small></div></div>`}</section></div><section class="panel"><div class="panel-title"><h2>${active.length ? "Your latest travel plan" : "The first page is yours to write."}</h2><a href="#my-trips">My trips ${icon("arrow", 14)}</a></div>${active.length ? tripCard(active[0]) : empty("No travel plans just yet.", "Find a journey you love, then tell us what would make it yours.", "Explore journeys", "deals", "bag")}</section>`;
}
function eventRow(e) {
  return `<div class="event-row"><span class="event-dot"></span><div>${esc(e.message)}<small>${new Date(e.date).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</small></div></div>`;
}
function trips() {
  let rs = activeRequests();
  return `${dashHeading("My trips", "Your journeys in the making. Local plans, all in one place.", linkBtn("Plan a journey", "booking", "secondary"))}<div class="notice">These are planning requests saved in this browser. No reservations, payments or confirmed departures are connected.</div>${rs.length ? rs.map(tripCard).join("") : empty("Where will your first plan take you?", "Explore the collection and prepare a local enquiry to start shaping your next journey.", "Discover packages", "deals", "bag")}`;
}
function bookingStatus() {
  return `${dashHeading("Your plans, at a glance.", "Follow the progress of your local planning requests.")}<div class="notice">Draft means saved locally. Enquiry Prepared means you’ve prepared a copy to share yourself. Neither status means a provider has received or approved your request.</div><div class="request-filters"><input type="search" id="request-search" placeholder="Search package, destination or reference…" aria-label="Search planning requests"><select id="request-status" aria-label="Filter request status"><option value="">All statuses</option><option>Draft</option><option>Enquiry Prepared</option><option>Cancelled</option></select></div><div id="request-list"></div>`;
}
function renderRequests() {
  const q = $("#request-search").value.toLowerCase(),
    s = $("#request-status").value;
  const rs = read("requests").filter(
    (r) =>
      (!s || r.status === s) &&
      `${r.id} ${r.destination} ${PACKAGES.find((p) => p.id === r.packageId)?.title}`
        .toLowerCase()
        .includes(q),
  );
  $("#request-list").innerHTML = rs.length
    ? rs.map(tripCard).join("")
    : empty(
        "No requests here yet.",
        "Save a local planning enquiry, or try changing your search and status filters.",
        "Prepare a journey",
        "booking",
        "clock",
      );
}
function itineraries() {
  let ids = [
    ...new Set([
      ...read("itineraries"),
      ...activeRequests().map((r) => r.packageId),
    ]),
  ].filter((id) => PACKAGES.some((p) => p.id === id));
  if (!selectedItinerary || !ids.includes(selectedItinerary))
    selectedItinerary = ids[0] || "";
  const p = PACKAGES.find((p) => p.id === selectedItinerary);
  return `${dashHeading("A beautiful way to spend the days.", "Suggested routes, with room for your own discoveries.")}${
    !p
      ? empty(
          "Every great journey needs a beginning.",
          "Save a planning itinerary from a package page or prepare an enquiry to see the route here.",
          "Find a journey",
          "deals",
          "map",
        )
      : `<div class="notice">This is a planning itinerary, not a confirmed travel schedule. No hotels, transport or activities have been reserved.</div><div class="itinerary-picker"><label for="itinerary-select" class="eyebrow" style="margin:0">Your journey</label><select id="itinerary-select">${ids
          .map((id) => {
            let x = PACKAGES.find((p) => p.id === id);
            return `<option value="${id}" ${id === p.id ? "selected" : ""}>${x.title}</option>`;
          })
          .join(
            "",
          )}</select><button class="btn outline small" id="expand-days">Expand all days</button><button class="btn outline small" id="print-itinerary">Print</button></div><div class="itinerary-layout"><div class="panel">${itinerary(p)}<label class="field" style="margin-top:30px">Your planning notes<textarea id="itinerary-notes" maxlength="2000" placeholder="A café to find, a view to stop for…">${esc(read("itinerary-notes", {})[p.id] || "")}</textarea></label><button class="btn small" id="save-notes">Save notes ${icon("check", 16)}</button></div><aside class="itinerary-visual">${img(p.image, p.destination)}<span class="eyebrow" style="margin-top:24px">${p.destination} · ${p.days} days</span><h3>${p.title}</h3><p>${p.description}</p><div class="actions"><a class="btn outline small" href="${url("package-details", "?id=" + p.id)}">Package details ${icon("arrow", 16)}</a><button class="btn small" id="download-itinerary">Download plan ${icon("download", 16)}</button></div></aside></div>`
  }`;
}
function favoritesPage() {
  const ps = PACKAGES.filter((p) => favoriteIds().includes(p.id));
  return `${dashHeading("Your someday starts here.", "The places and journeys you’ve saved for a little later.", linkBtn("Explore more", "destinations", "secondary"))}${ps.length ? `<div class="package-grid">${ps.map(card).join("")}</div>` : empty("A wish list waiting for wonder.", "Tap the heart on any holiday package. We’ll keep your favourites here, ready for the next adventure.", "Find your favourites", "deals", "heart")}`;
}
function fileTable(files, invoice) {
  return `<div class="table-wrap"><table><thead><tr>${(invoice ? ["Invoice / reference", "Trip reference", "Invoice date", "Amount", "Payment status", "Actions"] : ["Document type", "Related trip", "Filename / reference", "Availability", "Actions"]).map((t) => `<th>${t}</th>`).join("")}</tr></thead><tbody>${files.map((f, i) => `<tr>${invoice ? `<td>${esc(f.number || "Not recorded")}<small>${esc(f.name)}</small></td><td>${esc(f.trip || "Not linked")}</td><td>${f.date ? displayDate(f.date) : "Not recorded"}</td><td>${f.amount !== undefined && f.amount !== "" ? money(Number(f.amount)) : "Not recorded"}</td><td>${esc(f.paymentStatus || "Not recorded")}<small>User-supplied · Not verified</small></td>` : `<td>${esc(f.documentType || "Other travel document")}<small>User-supplied · Not verified</small></td><td>${esc(f.trip || "Not linked")}</td><td>${esc(f.name)}<small>${(f.size / 1024).toFixed(0)} KB</small></td><td>Current session<small>Local file only</small></td>`}<td><div class="actions file-actions"><button class="btn small outline" data-file-view="${i}" data-file-type="${invoice ? "invoice" : "document"}">View</button><button class="btn small" data-file-download="${i}" data-file-type="${invoice ? "invoice" : "document"}">${icon("download", 15)} Download</button><button class="text-link" style="background:none;border:0;font-size:var(--type-support)" data-file-metadata="${i}" data-file-type="${invoice ? "invoice" : "document"}">Add / edit details</button></div></td></tr>`).join("")}</tbody></table></div>`;
}
function documentPage(invoice = false) {
  const files = invoice ? sessionInvoices : sessionDocuments;
  return `${dashHeading(invoice ? "Your invoices, together." : "The essentials, in one place.", invoice ? "Provider-issued billing documents, when supplied." : "Tickets, vouchers and travel documents for your journeys.")}<div class="notice">${invoice ? "No billing service is connected. This workspace does not issue invoices or confirm payments." : "No ticketing service is connected. This workspace does not issue tickets or validate travel documents."} You can open your own supplied file for this session; it stays on this device and is not verified.</div><div class="panel"><div class="panel-title"><h2>${invoice ? "Invoice library" : "Your travel documents"}</h2><label class="btn small" for="${invoice ? "invoice" : "document"}-import">${icon("file", 16)} Open supplied ${invoice ? "invoice" : "document"}</label><input type="file" hidden id="${invoice ? "invoice" : "document"}-import" accept="application/pdf,image/jpeg,image/png"></div>${files.length ? fileTable(files, invoice) : empty(invoice ? "No issued invoices here yet." : "No issued documents here yet.", invoice ? "Add your real provider-issued invoice when you receive it. Its number, trip reference, date, amount and payment status can be recorded from the document." : "Add provider-issued tickets or vouchers when you receive them. Record the type and related trip, then view or download the original file.", "", "", invoice ? "file" : "bag")}<p style="font-size:var(--type-support);margin-top:20px">PDF, JPG or PNG · up to 15 MB · session only · no upload or permanent storage</p></div><div class="panel" style="margin-top:25px"><h3 style="font-size:23px">${invoice ? "A clear view of your travel costs." : "A little preparation goes a long way."}</h3>${(invoice
    ? [
        [
          "Invoice reference",
          "Use the reference printed on your real provider-issued invoice.",
        ],
        [
          "Amount & payment status",
          "Check the provider’s record. This workspace does not assume an amount is due or paid.",
        ],
        [
          "Need a correction?",
          "Contact your provider through a verified channel for billing updates.",
        ],
      ]
    : [
        [
          "Flight & train tickets",
          "Issued by your airline, rail provider or authorised travel operator.",
        ],
        [
          "Hotel vouchers",
          "Supplied by your accommodation or travel provider after arrangements are made.",
        ],
        [
          "Planning itinerary",
          "Your own suggested route. Download it in Itineraries; it is not a travel ticket.",
        ],
      ]
  )
    .map(
      ([t, c]) =>
        `<div class="doc-placeholder"><div class="icon-btn">${icon("file", 23)}</div><div><h3>${t}</h3><p>${c}</p></div><span class="tag">${invoice ? "Provider record required" : "Awaiting supplied document"}</span></div>`,
    )
    .join("")}</div>`;
}
function editFileMetadata(type, index) {
  const f = (type === "invoice" ? sessionInvoices : sessionDocuments)[index];
  if (!f) return;
  const invoice = type === "invoice";
  showModal(
    `<span class="eyebrow">From your supplied document</span><h3>${invoice ? "Invoice details" : "Travel document details"}</h3><p style="font-size:var(--type-support);margin-block:18px">Enter only details shown on your original file. These notes remain unverified and are kept for this session.</p><form id="file-metadata-form">${invoice ? `<label class="field">Invoice number<input name="number" maxlength="100" value="${esc(f.number || "")}" placeholder="As printed on the invoice"></label><div class="two-col"><label class="field">Invoice date<input name="date" type="date" value="${esc(f.date || "")}"></label><label class="field">Amount in INR<input name="amount" type="number" min="0" step="0.01" value="${esc(f.amount ?? "")}"></label></div><label class="field">Payment status as stated on the document<select name="paymentStatus">${["Not recorded", "Unpaid — user recorded", "Paid — user recorded", "Part-paid — user recorded"].map((s) => `<option ${f.paymentStatus === s ? "selected" : ""}>${s}</option>`).join("")}</select></label>` : `<label class="field">Document type<select name="documentType">${["Other travel document", "Flight ticket", "Train ticket", "Hotel voucher", "Travel itinerary"].map((s) => `<option ${f.documentType === s ? "selected" : ""}>${s}</option>`).join("")}</select></label>`}<label class="field">Related trip / provider reference<input name="trip" maxlength="120" value="${esc(f.trip || "")}" placeholder="Optional trip name or provider reference"></label><button class="btn" type="submit">Save session details ${icon("check", 17)}</button></form>`,
  );
  $("#file-metadata-form").addEventListener("submit", (e) => {
    e.preventDefault();
    Object.assign(f, Object.fromEntries(new FormData(e.currentTarget)));
    $("#modal").close();
    refreshDashboard();
    toast("Session details saved. Document remains unverified.");
  });
}

function notifications() {
  const events = read("events");
  return `${dashHeading("Little steps along the way.", "Real activity from your local planning workspace.")}<div class="panel"><div class="panel-title"><h2>Recent activity</h2>${events.length ? '<button class="btn outline small" id="clear-events">Clear history</button>' : ""}</div>${events.length ? events.map(eventRow).join("") : empty("Your next chapter starts here.", "When you save a package, update a plan or add an itinerary, your activity appears here.", "", "", "bell")}</div>`;
}
function profilePage() {
  const p = dashProfile();
  return `${dashHeading("A little about you.", "Make your local workspace feel more like yours.")}<div class="dash-grid"><form class="form-card" id="profile-form"><h2>Your traveler profile</h2><label class="field">Display name<input name="name" value="${esc(p.name)}" required maxlength="80" autocomplete="nickname"></label><label class="field">Email for your prepared enquiries<input type="email" name="email" value="${esc(p.email)}" maxlength="150" autocomplete="email"></label><label class="field">Preferred contact method<select name="contact"><option ${p.contact === "Email" ? "selected" : ""}>Email</option><option ${p.contact === "Phone" ? "selected" : ""}>Phone</option><option ${p.contact === "No preference" ? "selected" : ""}>No preference</option></select></label><button type="submit" class="btn">Save profile ${icon("check", 17)}</button></form><aside class="panel" style="align-self:start"><div class="avatar" style="width:56px;height:56px;font-size:23px;margin-bottom:24px">${esc(p.name.charAt(0).toUpperCase())}</div><h3>Your space to plan.</h3><p style="margin-block:18px;font-size:var(--type-support)">This is a local guest profile. It is not a verified travel account and does not synchronise between devices.</p><div class="notice">Keep sensitive identity documents, passport numbers and payment details out of your local profile.</div></aside></div>`;
}
function settings() {
  return `${dashHeading("Just the way you like it.", "A few preferences for a more comfortable journey.")}<section class="panel"><div class="panel-title"><h2>Your workspace</h2><span class="tag">Guest · This browser</span></div><div class="settings-row"><div><h3>Appearance</h3><p>Choose a lighter page or a quieter dark surface.</p></div><button class="btn outline small theme-toggle" aria-label="Toggle color theme">${icon("moon", 17)} Switch theme</button></div><div class="settings-row"><div><h3>Reading direction</h3><p>Mirror the interface for right-to-left reading.</p></div><button class="btn outline small direction-toggle">${document.documentElement.dir === "rtl" ? "LTR" : "RTL"}</button></div><div class="settings-row"><div><h3>Local activity notifications</h3><p>Keep a history of your planning changes.</p></div><label class="check-line" style="margin:0"><input type="checkbox" id="notifications-preference" ${read("notifications-enabled", true) ? "checked" : ""}> Enable activity history</label></div><div class="settings-row"><div><h3>Export your plans</h3><p>Download favourites, requests, profile, itineraries and preferences as JSON.</p></div><button class="btn outline small" id="export-data">${icon("download", 17)} Export my data</button></div><div class="settings-row"><div><h3>Clear local workspace</h3><p>Remove your planning records from this browser. Export a copy first if you need one.</p></div><button class="btn outline small" id="reset-data">Clear local data</button></div></section><div class="notice" style="margin-top:25px">Your supplied document and invoice files are held for the current session only and are not included in exports.</div>`;
}
function refreshDashboard() {
  const hash = location.hash.slice(1);
  dashSection = DASH_SECTIONS.some(([id]) => id === hash) ? hash : "overview";
  $(".dashboard-nav").innerHTML = dashNav();
  const views = {
    overview: overview,
    "my-trips": trips,
    "booking-status": bookingStatus,
    itineraries: itineraries,
    "saved-packages": favoritesPage,
    documents: () => documentPage(false),
    invoices: () => documentPage(true),
    notifications: notifications,
    profile: profilePage,
    settings: settings,
  };
  $("#main").innerHTML = views[dashSection]();
  document.title =
    DASH_SECTIONS.find(([id]) => id === dashSection)[1] +
    " · PATHBORNE Traveler Workspace";
  bindDashboardView();
}
window.refreshDashboard = refreshDashboard;
function bindDashboardView() {
  if ($("#request-search")) {
    $("#request-search").addEventListener("input", renderRequests);
    $("#request-status").addEventListener("change", renderRequests);
    renderRequests();
  }
  $("#itinerary-select")?.addEventListener("change", (e) => {
    selectedItinerary = e.target.value;
    refreshDashboard();
  });
  $("#profile-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const p = Object.fromEntries(new FormData(e.currentTarget));
    p.name = p.name.trim();
    if (!p.name) {
      e.currentTarget.elements.name.setCustomValidity(
        "Please enter a display name.",
      );
      e.currentTarget.elements.name.reportValidity();
      return;
    }
    if (write("profile", p)) {
      activity("Updated your local traveler profile.");
      $(".dashboard-topbar .avatar").textContent = p.name
        .charAt(0)
        .toUpperCase();
      toast("Your local profile is saved.");
    }
  });
  $("#profile-form input[name=name]")?.addEventListener("input", (e) =>
    e.target.setCustomValidity(""),
  );
  $("#notifications-preference")?.addEventListener("change", (e) => {
    write("notifications-enabled", e.target.checked);
    toast("Activity preferences updated.");
  });
  for (const type of ["document", "invoice"])
    $("#" + type + "-import")?.addEventListener("change", (e) => {
      const f = e.target.files[0];
      if (!f) return;
      if (f.size > 15 * 1024 * 1024) {
        toast("Choose a file smaller than 15 MB.");
        return;
      }
      if (!["application/pdf", "image/jpeg", "image/png"].includes(f.type)) {
        toast("Choose a PDF, JPG or PNG file.");
        return;
      }
      const record = {
        name: f.name,
        size: f.size,
        type: f.type,
        url: URL.createObjectURL(f),
      };
      (type === "document" ? sessionDocuments : sessionInvoices).push(record);
      activity("Opened a user-supplied " + type + " for this session.");
      refreshDashboard();
      toast("File opened locally for this session. Not verified.");
    });
}
function requestModal(id) {
  let r = read("requests").find((r) => r.id === id);
  if (!r) return;
  window.viewingRequest = id;
  const p = PACKAGES.find((p) => p.id === r.packageId);
  showModal(
    `<span class="eyebrow">${esc(r.id)}</span><h3>${p.title}</h3><p style="margin-block:15px;font-size:var(--type-support)">${esc(r.status)} · Local planning request</p>${[
      ["Destination", r.destination],
      ["Departure", displayDate(r.date)],
      ["Travelers", r.adults + " adults · " + r.children + " children"],
      ["Contact", r.email],
      ["Budget", r.budget],
      ["Accommodation", r.accommodation],
      ["Special requests", r.requests || "None"],
      ["Message", r.message || "None"],
    ]
      .map(
        ([a, b]) =>
          `<div class="summary-row"><span>${a}</span><b>${esc(b)}</b></div>`,
      )
      .join(
        "",
      )}<div class="notice" style="margin-top:20px">This request is stored locally. It has not been sent, booked or paid.</div><div class="actions" style="margin-top:24px"><button class="btn small" id="request-download">Download enquiry ${icon("download", 16)}</button><button class="btn outline small" id="request-copy">Copy details ${icon("copy", 16)}</button>${r.status === "Draft" ? '<button class="btn outline small" id="request-prepare">Mark enquiry prepared</button>' : ""}${r.status !== "Cancelled" ? '<button class="btn outline small" id="request-cancel">Cancel local draft</button>' : ""}<a class="text-link" href="${url("contact")}">Prepare a follow-up ${icon("arrow", 16)}</a></div>`,
  );
}
function itineraryText(p) {
  return (
    "TRAVEL PLANNING ITINERARY\nSuggested route — not a ticket, reservation or confirmed schedule.\n\n" +
    p.title +
    "\n" +
    p.destination +
    " · " +
    p.days +
    " days\n\n" +
    p.itinerary
      .map((d) => `DAY ${d.day} · ${d.stop}\n${d.title}\n${d.description}`)
      .join("\n\n") +
    "\n\nYour notes:\n" +
    (read("itinerary-notes", {})[p.id] || "None")
  );
}
function openDashDrawer() {
  const sb = $(".dashboard-sidebar");
  drawerReturnFocus = document.activeElement;
  sb.classList.add("mobile-open");
  sb.setAttribute("role", "dialog");
  sb.setAttribute("aria-modal", "true");
  const scrim = document.createElement("div");
  scrim.className = "scrim";
  scrim.id = "dash-scrim";
  document.body.append(scrim);
  $(".dashboard-main").inert = true;
  document.body.style.overflowY = "hidden";
  sb.insertAdjacentHTML(
    "afterbegin",
    `<button class="icon-btn" id="close-dash-drawer" aria-label="Close workspace navigation" style="position:absolute;inset-inline-end:10px;top:10px;width:28px;height:28px">${icon("close", 17)}</button>`,
  );
  $(".dashboard-menu").setAttribute("aria-expanded", "true");
  $("#close-dash-drawer").focus();
  scrim.addEventListener("click", closeDashDrawer);
  sb.addEventListener("keydown", dashTrap);
}
function dashTrap(e) {
  trapFocus(e, $(".dashboard-sidebar"));
}
function closeDashDrawer() {
  const sb = $(".dashboard-sidebar");
  sb.classList.remove("mobile-open");
  sb.removeAttribute("role");
  sb.removeAttribute("aria-modal");
  sb.removeEventListener("keydown", dashTrap);
  $("#dash-scrim")?.remove();
  $("#close-dash-drawer")?.remove();
  $(".dashboard-main").inert = false;
  document.body.style.overflowY = "";
  $(".dashboard-menu").setAttribute("aria-expanded", "false");
  drawerReturnFocus?.focus();
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && $(".dashboard-sidebar.mobile-open"))
    closeDashDrawer();
});
document.addEventListener("click", (e) => {
  const el = e.target.closest("button,a");
  if (!el) return;
  if (el.id === "close-dash-drawer") closeDashDrawer();
  if (el.closest(".dashboard-nav") && $(".dashboard-sidebar.mobile-open"))
    closeDashDrawer();
  if (el.id === "guest-logout") {
    sessionStorage.removeItem("atlas-guest");
    sessionDocuments.forEach((f) => URL.revokeObjectURL(f.url));
    sessionInvoices.forEach((f) => URL.revokeObjectURL(f.url));
    location.href = url("login", "?guest=left");
  }
  if (el.dataset.requestView) requestModal(el.dataset.requestView);
  if (el.dataset.viewItinerary) {
    selectedItinerary = el.dataset.viewItinerary;
    saveItinerary(selectedItinerary);
    location.hash = "itineraries";
    if (dashSection === "itineraries") refreshDashboard();
  }
  if (el.id === "request-download" || el.id === "request-copy") {
    const r = read("requests").find((r) => r.id === window.viewingRequest);
    if (r) {
      if (el.id === "request-download")
        download("enquiry-" + r.id + ".txt", enquiryText(r));
      else copyText(enquiryText(r));
    }
  }
  if (el.id === "request-prepare" || el.id === "request-cancel") {
    const rs = read("requests"),
      r = rs.find((r) => r.id === window.viewingRequest);
    if (r) {
      r.status = el.id === "request-cancel" ? "Cancelled" : "Enquiry Prepared";
      r.updated = new Date().toISOString();
      write("requests", rs);
      activity(
        `${r.status === "Cancelled" ? "Cancelled" : "Prepared"} your local request for ${PACKAGES.find((p) => p.id === r.packageId).title}.`,
      );
      $("#modal").close();
      refreshDashboard();
      toast(
        r.status === "Cancelled"
          ? "Local draft cancelled. No operator reservation was changed."
          : "Enquiry prepared. Share it with your provider yourself.",
      );
    }
  }
  if (el.id === "expand-days") {
    const ds = $$(".itinerary details"),
      open = ds.some((d) => !d.open);
    ds.forEach((d) => (d.open = open));
    el.textContent = open ? "Collapse all days" : "Expand all days";
  }
  if (el.id === "save-notes") {
    let notes = read("itinerary-notes", {});
    notes[selectedItinerary] = $("#itinerary-notes").value;
    if (write("itinerary-notes", notes)) {
      activity(
        "Updated notes for " +
          PACKAGES.find((p) => p.id === selectedItinerary).title +
          ".",
      );
      toast("Planning notes saved.");
    }
  }
  if (el.id === "download-itinerary") {
    let p = PACKAGES.find((p) => p.id === selectedItinerary);
    download("planning-itinerary-" + p.id + ".txt", itineraryText(p));
  }
  if (el.id === "print-itinerary") {
    $$(".itinerary details").forEach((d) => (d.open = true));
    window.print();
  }
  if (el.dataset.fileMetadata !== undefined)
    editFileMetadata(el.dataset.fileType, Number(el.dataset.fileMetadata));
  if (el.dataset.fileView !== undefined) {
    const f = (
      el.dataset.fileType === "invoice" ? sessionInvoices : sessionDocuments
    )[+el.dataset.fileView];
    if (f) window.open(f.url, "_blank", "noopener");
  }
  if (el.dataset.fileDownload !== undefined) {
    const f = (
      el.dataset.fileType === "invoice" ? sessionInvoices : sessionDocuments
    )[+el.dataset.fileDownload];
    if (f) {
      const a = document.createElement("a");
      a.href = f.url;
      a.download = f.name;
      a.click();
    }
  }
  if (el.id === "clear-events") {
    write("events", []);
    refreshDashboard();
    toast("Local activity history cleared.");
  }
  if (el.id === "export-data") {
    const data = {
      exported: new Date().toISOString(),
      mode: "Local guest planning workspace",
      favorites: favoriteIds(),
      requests: read("requests"),
      itineraries: read("itineraries"),
      itineraryNotes: read("itinerary-notes", {}),
      profile: dashProfile(),
      events: read("events"),
      preferences: {
        theme: document.documentElement.dataset.theme,
        direction: document.documentElement.dir,
        notifications: read("notifications-enabled", true),
      },
    };
    download(
      "my-travel-atlas.json",
      JSON.stringify(data, null, 2),
      "application/json",
    );
    toast("Your local planning data is exported.");
  }
  if (el.id === "reset-data")
    showModal(
      '<span class="eyebrow">A fresh page</span><h3>Clear this local workspace?</h3><p style="margin-block:22px">This removes your favourites, planning requests, saved itineraries, notes, profile and activity history from this browser. Export anything you want to keep first.</p><div class="actions"><button class="btn" id="confirm-reset">Clear local workspace</button><button class="btn outline modal-edit">Keep my plans</button></div>',
    );
  if (el.id === "confirm-reset") {
    [
      "favorites",
      "requests",
      "itineraries",
      "itinerary-notes",
      "profile",
      "events",
      "notifications-enabled",
    ].forEach((k) => localStorage.removeItem("atlas-" + k));
    sessionDocuments.forEach((f) => URL.revokeObjectURL(f.url));
    sessionInvoices.forEach((f) => URL.revokeObjectURL(f.url));
    sessionDocuments = [];
    sessionInvoices = [];
    selectedItinerary = "";
    $("#modal").close();
    $(".dashboard-topbar .avatar").textContent = "E";
    refreshDashboard();
    toast("Your local workspace is cleared.");
  }
});
window.addEventListener("hashchange", () => {
  refreshDashboard();
  window.scrollTo(0, 0);
});
dashboardShell();
refreshDashboard();
