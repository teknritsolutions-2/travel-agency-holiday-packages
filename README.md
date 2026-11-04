# Waylark — Travel Agency & Holiday Packages

A complete, buildless, multi-page HTML5 / CSS3 / vanilla JavaScript travel frontend using the **Living Atlas** creative concept. The working design brand is **Waylark**, with an original ribbon W mark. The name has not been checked for trademark or worldwide availability.

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
- Sticky navigation, keyboard/click/hover dropdown, focus-managed responsive drawer, dark theme, RTL, reduced-motion support and matching W favicon.
- Shared form dropdowns with 16px options, 44px targets, keyboard/type-ahead navigation, viewport-aware menus and native form values/validation (`assets/js/select-controls.js`).
- Separate traveler-journal login/signup compositions, password visibility and validation, equal theme/direction controls, Google/Apple sign-in buttons, and concise failure feedback while account services are unavailable.
- Dashboard overview, trips, local status tracker, itinerary notes/expansion/print/download, favorites, session document/invoice viewing and downloading, actual local activity, editable profile, export/reset/settings and workspace exit.

## Living Atlas 2.0 design refinement

Ocean Ink actions in light mode, Coastal Blue actions in dark mode, white action labels and pale blue details, shared readable type tokens, a painted Atlas Explorer, an interactive three-stage planning feature, Beyond the Map editorial About, independent auth compositions, and a floating Back-to-Top control that docks just above the lower footer divider. Package records and existing browser storage keys are preserved.

See `documentation/release-check.md` for the final release crosscheck, `documentation/sitewide-qa.md` for the content/responsive history, and `documentation/theme-brand-qa.md` for theme/identity details.

## Frontend boundaries

This deliverable has **no authentication, payment, booking, email or ticketing backend**. Login and signup do not create accounts or store passwords. The traveler journal is accessible from Dashboard; guest buttons remain removed. Google/Apple controls are visible and report unavailable service on interaction until OAuth is configured. Enquiries are saved as **local Drafts**; marking **Enquiry Prepared** means the traveler has prepared details to share independently. Nothing is sent automatically. No booking is confirmed or paid and no official ticket or invoice is generated.

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
- Current QA coverage and service readiness: `documentation/sitewide-qa.md`.
- Reserved owner contact placeholders: `assets/js/site-config.js` (not displayed or used for delivery).

Before operating a commercial service, supply the real agency identity/contact information, approved prices, booking conditions and privacy text, and connect the required services. The owner requested temporary contact values: configuration contains a reserved example phone number and `.example` email, marked `placeholder: true`. They are not shown as real agency contact information and no messages are routed to them. No operator availability, reviews, discounts or paid invoices have been invented.

## Hosting

Serve the source folder directly for GitHub Pages. Sites-specific deployment identity is retained in `.openai/hosting.json`; its temporary `dist` package is prepared outside the client deliverable during publication. No framework, node_modules, screenshots or test fixtures are required in the website source.
