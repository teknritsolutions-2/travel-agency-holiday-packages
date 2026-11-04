# Waylark — content cleanup and sitewide QA

Verified 3 November 2026. This report supersedes earlier UI and guest-access descriptions.

## Content and interface changes

Removed the notices identified in the supplied screenshots from Contact, Package Details, catalogs and authentication pages. Removed guest-entry controls, the auth-page back link, disconnected social-provider buttons and their unused handlers/styles. Account forms retain validation and truthful on-demand failure feedback; no successful authentication is simulated.

Replaced the miniature dashboard preview on both homepages with genuine travel photography and a working journal link. Package cards now use destination-specific descriptions rather than repeated filler. Removed the repeated reservation disclaimer appended to every itinerary day. All twenty package records, prices, IDs, durations, destinations, images, highlights and actual route descriptions otherwise remain unchanged; a structural comparison verifies this.

Simplified repetitive dashboard notices while retaining useful device-storage, document-session and draft-sharing information where it affects a user action. Contact reviews/export and enquiry drafts remain functional. Necessary operational limitations are described in owner documentation and concise interaction feedback, not repeated as introductory prototype banners.

## Defects found and corrected

- Tablet search: replaced the tall icon-only action with a full-row labeled button; added a stable accessible name.
- Tablet hero: removed the orphaned location pin left after its text was hidden.
- RTL login: changed the photo-mask positioning to logical insets; it previously extended 20px outside the right edge.
- Long traveler names: allowed the dashboard heading to shrink and wrap without displacing its action outside the viewport.
- Long enquiry values: added wrapping and width constraints to summary values.
- Introductory pages: reduced the accumulated gap before the main section.
- Removed obsolete preview, guest, provider and auth-helper styles and empty CSS rules.

## Browser and workflow coverage

| Check                                     | Result                                                                                                                                                                      |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Chromium LTR audit                        | 660 views: twenty public pages plus ten dashboard destinations, eleven widths, two themes                                                                                   |
| LTR result                                | No script/request errors, broken images, page overflow or uncontained content bounds                                                                                        |
| Computed text contrast                    | No failures on measured solid backgrounds across main desktop/tablet/mobile views; photographic overlays also reviewed visually                                             |
| RTL audit                                 | 180 views across every route at 390, 820 and 1440px, in both themes; discovered login-mask issue corrected                                                                  |
| Corrected login                           | Final LTR/RTL bounds and form checks at 320, 390, 820 and 1440px in both themes                                                                                             |
| WebKit                                    | 48 full-page captures across Home 1, Home 2, Login, Sign Up, Contact, catalog, Booking and Dashboard at 390, 820 and 1440px; light/LTR and dark/RTL passed                  |
| Populated dashboard                       | 64 views across eight destinations at 320, 390, 820 and 1440px in both themes; includes an 80-character traveler name, long email and filenames; no remaining bounds issues |
| Functional suite                          | 22/22 passed, no page errors                                                                                                                                                |
| Short-page footer docking                 | Passed on FAQ at 320, 390, 820 and 1440px                                                                                                                                   |
| Final contact/legal pages                 | Copy, spacing and overflow checked at 390, 820 and 1440px                                                                                                                   |
| Syntax, relative paths, source whitespace | Passed                                                                                                                                                                      |

The eleven audit widths were **320, 360, 390, 430, 640, 768, 820, 1024, 1280, 1440 and 1920px**. Full-page screenshots and review sheets covered all public routes and dashboard destinations; representative light/dark, RTL, populated and interactive views were inspected. Temporary browsers, captures, test scripts and synthetic test data remain outside the repository.

Workflow coverage includes public and dashboard drawers, Escape/outside closing, theme/direction persistence, sticky navigation, search and season preferences, filtering/sorting/reset, favorite persistence and dashboard synchronization, six destination selections, three planning stages, five About experiences, keyboard tabs, Home 2’s six-day route, photo viewing, itinerary save/notes/download, booking validation and draft review/save, request prepare/cancel/download, user-supplied file import/metadata/download, profile/activity updates, auth/password validation and unavailable-service feedback, escaped contact review/download, export/reset, and floating/docked Back-to-Top.

WebKit coverage verifies the engine, not physical iOS devices or the installed Safari application. Firefox has not been verified in this revision.

## Actual service readiness

The owner requested temporary contact numbers. `assets/js/site-config.js` holds a reserved example phone number and `.example` email with `placeholder: true`. They are not exposed as live agency contact channels or used to send messages to an unrelated person.

**This is not yet ready to accept live commercial bookings or create real accounts.** No live contact-delivery, account, payment, inventory or ticketing service has been supplied. Contact currently reviews/copies/downloads a message; enquiries save drafts on the current device; auth cannot report a successful sign-in or account creation. These are tested behaviors, not a claim of service integration.

Live commercial operation still requires the agency’s genuine identity/contact information, approved package pricing/terms and privacy text, plus actual account and enquiry services. Replacing those dependencies with random data would not make the site production-ready.

## Back-to-Top position follow-up

The control now continues down through the footer and docks 16px above its lower divider, instead of stopping at the upper footer edge. Reserved space was moved toward the divider, and collision handling keeps footer links and nearby actions clear. Targeted browser checks passed on long and short pages at 320, 390, 820 and 1440px in light/dark modes and LTR/RTL (32 combinations), including intermediate scrolling, the final docking gap and returning to the top. Desktop and phone viewport captures were inspected.

## Social sign-in follow-up

At the owner’s request, Google and Apple controls with their proper logos were restored on Login and Sign Up. They are equal-size buttons with theme-aware surfaces and accessible names. No guest entry, auth back link or introductory service notice was restored. Provider clicks give concise, truthful unavailable-service feedback; OAuth is still unconfigured. Responsive, theme and RTL checks covered both pages at 320, 390, 820 and 1440px.

## Navigation and hero alignment follow-up

The public mobile/tablet navigation drawer now opens against the right edge in both text directions. Focus trapping, Escape/backdrop closing, focus return and background isolation remain intact. The photographic home hero label no longer reserves a decorative-line offset, so its text aligns with the heading, description and actions.

Targeted Chromium checks covered 24 combinations at 320, 390, 768, 820, 1024 and 1440px in light/dark and LTR/RTL, including both authentication pages. A separate 126-view scan covered all 21 pages at phone, tablet and desktop widths in both themes, checking page overflow and content bounds while allowing intentional swipe carousels. Phone and tablet captures were inspected.

## Three-card tablet layouts

At 681–1240px, collections containing exactly three package or journal cards now stack one per row. The same layout applies to planning-information cards, Home 2 postcards, About philosophy notes and the international destination trio. The former centered third-package rule was removed, and tablet postcards no longer rotate or stagger. Dynamic collections, including three saved dashboard packages, use the same shared rule.

Chromium checks passed on all 21 pages at 390, 680, 681, 768, 820, 1024, 1180, 1240, 1241 and 1440px in both themes (420 views). Additional light/dark and LTR/RTL checks covered six affected routes at four tablet widths, including a populated dashboard (96 views). Checks verified equal card widths, sequential rows, visibility and page overflow; the 820px package-section capture was visually inspected.

## Distinct photography follow-up

Catalog banners, international destination tiles, the home atlas feature views, conflicting home style-tab photos, the home workspace photo and the together-page story photos now use separate destination photographs. Atlas thumbnails retain their destination identities while the large feature view uses another photograph. This also prevents repetition when switching styles, destinations, planning stages or the family collection.

Twenty replacement assets match their respective original images' pixel dimensions exactly, recorded in `photo-variants.json`. Existing CSS frames, masks and cropping behavior are retained. Chromium checks passed for 396 page/interactive states across all 21 pages at 390, 820 and 1440px in light/dark themes, with no repeated on-page photographs (compared by source identity), broken images, page overflow or script errors. All replacement assets were reviewed in a contact sheet; atlas and international tile layouts were captured at each viewport size.

## Package-card content alignment

Package-card rows share tracks for their photographs, metadata, titles, descriptions and footers. Wrapped titles reserve the same height across the row, keeping descriptions, dividers, prices and trip links aligned without truncating text. The conflicting fixed footer margin was removed; browsers without subgrid retain the flex layout with a bottom-aligned footer. Obsolete home-card visibility overrides were removed so all three cards use the shared layout.

Chromium measurements passed across seven public/dashboard routes at eight widths from 320 to 1440px in both themes and directions: 224 views and 1,192 card rows. Checks compared card bottoms and the top positions of images, metadata, titles, descriptions, dividers, price labels/amounts and trip links, and checked overflow and script errors. The tablet Maldives pair from the supplied screenshot was visually reviewed.

## Tablet and phone authentication backgrounds

At widths up to 1240px, Login and Sign Up use a single centered form over their original photograph. The photograph remains inset from all four page edges with a torn mask; phone form spacing leaves the photograph visible around the card. The former photo-panel story and authentication theme/direction controls are hidden at these widths. The form surface remains opaque and theme-aware, and the background grows with the form for longer signup pages.

Checks passed for 88 page/theme/direction/viewport combinations from 320 to 1440px, covering hidden controls, background insets, form bounds, full-page scrolling, provider feedback and password visibility. Desktop photo, story, form and utility measurements at 1280 and 1440px exactly matched the pre-change baseline. Phone and tablet captures were visually reviewed in both themes.
