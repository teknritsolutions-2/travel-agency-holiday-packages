> Historical layout-refinement verification. The subsequent [Waylark identity correction](branding-qa.md) supersedes this report’s palette and decorative-artwork details.

# Waylark — Living Atlas 2.0 refinement QA

Verified 2 November 2026 against the existing HTML/CSS/vanilla JavaScript source. Waylark is a working design name; trademark availability has not been assessed.

## Implementation

- The earlier brand palette replaced the former peach palette throughout the source, including SVG and dark-mode styles. Earlier mountain identity includes light and dark marks, standalone symbol, favicon and compact dashboard asset.
- Shared typography tokens raise body, supporting, UI and metadata text. Meaningful rendered text was checked at a minimum of 14px across twelve principal page types.
- Atlas Explorer now changes its dominant painted photograph, destination copy, actual package count and catalog link through six touch/keyboard-accessible selections.
- Your Journey, Unfolding replaces the former timeline with three working planning stages. The approved Ladakh editorial section remains.
- New original SVG masks, painted featured photography and panoramic storytelling extend the visual family. No AI landscape photography was introduced.
- Beyond the Map includes five interactive experience categories. Login and Sign Up have distinct compositions, working theme/direction/password controls, truthful provider integration points and guest access.
- Public navigation follows the requested order. Back-to-Top floats during scrolling and docks within the reserved upper footer area, including short pages.
- Package data in `assets/js/travel-data.js` is byte-for-byte unchanged. Storage keys and the existing frontend-only planning model are preserved.

## Browser verification

| Check                                       | Result                                                                                                             |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Existing functional regression suite        | 21/21 passed                                                                                                       |
| Refinement interaction suite                | 10/10 passed                                                                                                       |
| Chromium full-page screenshot sweep         | 213 captures; no page errors, broken images or page-level overflow                                                 |
| Additional responsive viewport checks       | 24 passed                                                                                                          |
| Actual descendant bounds checks             | 121 views, no out-of-viewport content                                                                              |
| WebKit light/LTR and dark/RTL checks        | 24 full-page captures across six redesigned pages at 1440px and 390px; no script errors, broken images or overflow |
| JavaScript syntax and Git whitespace checks | Passed                                                                                                             |

Responsive bounds coverage: 320, 360, 390, 430, 640, 768, 820, 1024, 1280, 1440 and 1920px. Screenshot coverage includes public pages and all dashboard destinations at 1440, 820 and 390px, additional theme/direction combinations, and populated local planning states. Rendered screenshots and contact sheets were visually reviewed. Follow-up viewport captures checked floating/docked controls and corrected narrow Home 1/Home 2 workspace previews. Temporary browser tooling, screenshots and test fixtures remain outside the repository.

Regression coverage includes navigation/dropdown/drawers/sticky header; search, filters and sorting; gallery and experience selectors; favorites and synchronization; package details and itineraries; booking validation/local drafts/request summary download; dashboard navigation, status, itinerary notes, supplied documents and invoices, profile, notifications, export/reset; auth validation and password visibility; guest access; contact, FAQ and holiday finder.

The narrow preview was corrected after visual review to stack its two main columns and keep metadata readable. Desktop navigation was measured at 1241, 1280 and 1440px without collisions. Floating controls were exercised on long and short pages at 320, 390, 820 and 1440px.

## Contrast and engine limits

Historical palette measurements are superseded by the current contrast values in [branding-qa.md](branding-qa.md).

Chromium/Brave and Playwright WebKit rendered the SVG masks successfully. WebKit coverage is engine verification, not a claim of testing the installed Safari application or physical iOS hardware. Firefox was installed but failed to launch repeatedly with “Could not find profile folder,” including explicit writable-profile attempts. Firefox-specific mask rendering remains unverified. Photography remains usable with clean rectangular fallbacks when masking is unsupported.

## Frontend service boundaries

Google/Apple and email authentication are not connected; provider buttons explain this without reporting a successful login. Guest access opens the local traveler workspace. Booking requests remain local planning records, not confirmed reservations. Documents and invoices are supplied by the visitor; no tickets, payments or invoices are fabricated. See README and the original QA report for the preserved service model.
