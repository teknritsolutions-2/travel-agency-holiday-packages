# Waylark — theme actions and identity revision

Verified 2 November 2026. Waylark is the current working design name; commercial/trademark availability has not been assessed. This revision supersedes the preceding identity and filled-action color rules.

## Current behavior

- Light mode uses Ocean Ink `#203B57` for filled actions, selected indicators and focus accents, with white labels.
- Dark mode uses the Coastal Blue family for filled actions and selected indicators, with white labels. The accessible action shade is `#44799E`, a slightly deeper variant of the source Coastal Blue `#477FA6`; white text on the action shade has **4.69:1** contrast. Hover uses `#386787` at **6.07:1**. White on Ocean Ink has **11.51:1** contrast.
- Shared action tokens control default and secondary buttons, so header, catalog, booking, authentication and dashboard actions follow the active theme. Charcoal page/card surfaces remain intact in dark mode. Outline controls retain their readable surface treatment.
- Waylark uses a simple continuous ribbon W mark, matching light/dark SVGs, standalone symbol, compact dashboard asset and favicon. The mark was reviewed at 32px and 64px. Wordmark, accessible labels, titles, descriptions and Open Graph branding are updated throughout.
- Painterly photography, page compositions, existing file structure and all package records remain unchanged. No decorative characters or replacement illustrations were introduced.

## Verification

- Existing workflow regression suite: **21/21 passed**.
- Gallery/planning/About, keyboard, auth, responsive drawers, floating control and typography suite: **10/10 passed**.
- Computed theme/action controls and white hover-label checks: **10/10 passed**, across Home 1, Home 2, Login, Sign Up and Dashboard in both themes.
- Full Chromium capture sweep: **180 full-page screenshots**, covering all twenty public routes and ten dashboard destinations at 1440, 820 and 390px in light and dark modes. No script errors, broken images or page-level overflow.
- Small logo variants and representative full-page captures/contact sheets were visually inspected. Browser fixtures, reports and screenshots remain outside the repository.
- JavaScript syntax, relative HTML asset paths, unchanged package records and Git whitespace checks passed.

WebKit light/LTR and dark/RTL verification passed across 24 captures at desktop and mobile widths, with no script errors, broken images or overflow. Firefox remains unverified following the previously documented profile-startup failure; no Firefox pass is claimed.

Authentication, booking and traveler records retain their frontend-only service boundaries. No real accounts, reservations or issued documents are fabricated.
