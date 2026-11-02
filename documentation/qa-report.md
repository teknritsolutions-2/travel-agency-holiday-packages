> For the November 2026 PATHBORNE design refinement, see [refinement-qa.md](refinement-qa.md). This report records the original build.

# Browser QA & handoff notes

## Environment and scope

Tested on 2 November 2026 in actual headless Brave/Chromium using Playwright. The browser and test dependencies live in a temporary folder, not in the deliverable. Screenshots and test fixture files are also outside the project.

Reviewed the latest relevant electrician and physiotherapy conversations and the latest five commits of each available local repository for recurring corrections. The travel design was created independently. Safeguards applied include sticky navigation, matching logo/favicon, meaningful SVG icons, readable supporting copy, tablet gutters, compact navigation utilities, tablet dashboard drawers, aligned auth cards, image variety, dark-surface contrast and contained mobile grids.

## Functional checks

21 browser workflow checks passed:

1. Sticky header stays pinned after scrolling; back-to-top returns to the page start.
2. Home dropdown click, hover/focus, Escape and outside-click behavior.
3. Theme and reading direction persist across navigation/reload.
4. Destination gallery selected state, caption and matching catalog links.
5. Travel-style package selection and arrow-key tab navigation.
6. Hero destination/style/budget search and preferred-season handoff.
7. Destination, style, budget, duration filters and price/duration sorting.
8. Favorite persistence, dashboard synchronization and removal.
9. Package ID routing, photo viewer, expandable itinerary and itinerary saving.
10. Package enquiry prefill, future-date validation, traveler-count bounds, live summary, review, local draft save and text download.
11. Dashboard request search/status filtering, detail view, prepared and cancelled local states.
12. Day expansion, itinerary notes, persistence and planning-document download.
13. Session-only user-supplied document/invoice opening and downloading.
14. Real local notification events and editable traveler profile.
15. Notification preferences, JSON export and confirmed local-data reset.
16. Sign-up validation, password matching/visibility, no stored passwords, guest entry and guest exit.
17. Honeymoon/family selection with real matching packages.
18. Destination search and domestic/international grouping.
19. FAQ accordions.
20. Contact-message preparation without claiming delivery.
21. Mobile drawer, inert background, focus containment, scrim/Escape, RTL side and dashboard drawer.

Five additional browser checks passed: the alternate homepage’s package-backed interactive day selector, supplied invoice metadata and unverified status, tablet dashboard drawer/theme/direction, destination touch swipe, and accurate forgot-password messaging.

## Responsive and visual checks

- 216 full-page browser screenshots captured across 1440px desktop, 820px tablet and 390px mobile, including all public pages, all dashboard sections, populated local test states and representative light/dark/LTR/RTL combinations and the final homepage refinements.
- Additional page-level overflow checks at 320, 360, 430, 640, 768, 1024, 1280 and 1920px.
- No broken images, browser script errors or page-level horizontal overflow in the completed sweep.
- Individual visible content bounds checked on thirteen key public/application routes at 320, 390, 820, 1024 and 1440px. This caught a mobile detail-grid minimum-width problem that simple page-level overflow checks missed; the grid was fixed and the check rerun successfully.
- Desktop/tablet/mobile screenshots reviewed for composition, photographic crops, brush masks, typography, card spacing, footer alignment, authentic empty states and document controls.
- Visual issues corrected: hero annotation collision, budget select markup, hover/click dropdown conflict, cramped mobile section headings, small supporting typography, misidentified alpine stock photography, repeated adjacent package photos, mobile detail clipping, and tablet dashboard/auth layouts.
- Browser tests use temporary records explicitly injected by the QA script. No test traveler, sample reservation, fake invoice, sample ticket or credentials ship in application data.

All 21 rendered pages were additionally audited for internal link targets; all 23 unique local link paths resolved. Central package IDs, image paths and day/night durations were checked for all 20 records.

## Practical limits

This is a frontend deliverable with no account, booking, payment, email, billing or ticket-issuing service. Prices and itineraries remain illustrative and editable. Local plans are not operator submissions or reservations. The workspace records only Draft, Enquiry Prepared and Cancelled states; no local action can create a confirmed booking. User-supplied file contents and metadata are not verified and disappear on reload. Browser-local records do not automatically sync between devices or origins.

The automated browser is Chromium-based. Safari, Firefox and real-device manual interaction were not separately exercised. There is no claim of a formal accessibility audit or live operator integration.
