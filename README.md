# PATHBORNE — Travel Agency & Holiday Packages

A complete, buildless, multi-page HTML5 / CSS3 / vanilla JavaScript travel frontend using the **Living Atlas** creative concept. The working design brand is **PATHBORNE**, with an original geometric mountain horizon and journey route mark. The name has not been checked for trademark or worldwide availability.

## Run locally

From this folder:

```sh
python3 -m http.server 4173
```

Open `http://localhost:4173`. No dependency installation or build is needed. Keep `index.html`, `pages/` and `assets/` together when hosting. All paths are relative and compatible with a GitHub Pages project subpath.

## Included

- Two different complete homepages; domestic and international catalogs; honeymoon/family collections; package details; destination finder; curated getaways; booking enquiry; about; contact; FAQ; journal/articles; privacy; terms; 404; coming soon.
- Twenty illustrative packages across ten destinations, powered by `assets/js/travel-data.js`.
- Destination selection and swipe navigation, budget/style/duration/destination filters, sorting, persistent favorites, package-specific day routes and enquiry prefill.
- Sticky navigation, keyboard/click/hover dropdown, focus-managed responsive drawer, dark theme, RTL, reduced-motion support and matching mountain-route favicon.
- Separate traveler-journal login/signup compositions, password visibility and validation, equal theme/direction controls, Google/Apple integration points with accurate disconnected states, and a working guest workspace.
- Dashboard overview, trips, local status tracker, itinerary notes/expansion/print/download, favorites, session document/invoice viewing and downloading, actual local activity, editable profile, export/reset/settings and guest exit.

## Living Atlas 2.0 design refinement

Ocean Ink, Coastal Blue and pale blue, shared readable type tokens, a painted Atlas Explorer, an interactive three-stage planning feature, Beyond the Map editorial About, independent auth compositions, and a floating Back-to-Top control that docks at the footer. Package records and existing browser storage keys are preserved.

See `documentation/branding-qa.md` for the final identity correction and current verification, and `documentation/refinement-qa.md` for the earlier layout refinement.

## Frontend boundaries

This deliverable has **no authentication, payment, booking, email or ticketing backend**. Login and signup do not create accounts or store passwords. Guest entry requires no credentials. Enquiries are saved as **local Drafts**; marking **Enquiry Prepared** means the traveler has prepared details to share independently. Nothing is sent automatically. No booking is confirmed or paid and no official ticket or invoice is generated.

User-supplied PDF/JPG/PNG files are opened with session-only browser object URLs. Files are not uploaded, retained across reloads, included in exports, or verified. Invoice amounts and payment status are never inferred.

Browser-local data may contain contact details entered into draft requests. Avoid sensitive identity or payment data. Settings can export or clear records. Local storage is per browser and origin; moving to a different hosting URL starts a separate workspace.

The preferred season is carried into catalog results as a planning preference; it does not assert live seasonal inventory. Destination, style and budget constrain matching results.

## Edit content

- Packages, prices, destinations, highlights, inclusions/exclusions and itineraries: `assets/js/travel-data.js`.
- Currency formatting: the central `money()` function in `assets/js/main.js`.
- Public page content, shared navigation/footer and interactions: `assets/js/main.js`.
- Traveler workspace: `assets/js/dashboard.js`.
- Theme and responsive layout: `assets/css/style.css`, `dark-mode.css`, `rtl.css`.
- Local font files and redistribution licenses: `assets/fonts/`.
- Photography provenance and licenses: `documentation/image-credits.md`.
- QA coverage and practical limitations: `documentation/qa-report.md`.

Before operating a commercial service, supply the real agency identity/contact information, approved prices, booking conditions and privacy text, and connect the required services. No address, phone, operator availability, reviews, discounts or paid invoices have been invented.

## Hosting

Serve the source folder directly for GitHub Pages. Sites-specific deployment identity is retained in `.openai/hosting.json`; its temporary `dist` package is prepared outside the client deliverable during publication. No framework, node_modules, screenshots or test fixtures are required in the website source.
