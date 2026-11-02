# PATHBORNE — final identity and palette correction

Verified 2 November 2026. This revision supersedes the previous brand, palette and decorative illustration direction while retaining the Living Atlas page layouts and Painted Horizons photography system. PATHBORNE remains a provisional design name pending commercial/trademark clearance.

## Changes

- New original geometric mountain horizon and curved journey route mark. Light/dark SVG, standalone symbol, favicon and dashboard asset use the same geometry; theme differences serve contrast. Small-size variants were rendered at 32px and 64px.
- PATHBORNE replaces the previous visible identity in shared navigation, footer, auth pages, dashboard, accessible labels, titles, descriptions and Open Graph metadata. Repository name, URLs and storage keys remain unchanged.
- Brand colors: Ocean Ink `#203B57`, Coastal Blue `#477FA6`, pale blue `#DCEAF3`, deep ink `#162C42`. Light surfaces use white, `#FAFAFA` and `#F1F3F5`; dark surfaces use `#151B24`, `#20262E` and `#292F38`.
- Removed the paraglider, hiker and decorative globe-route artwork, their wrappers, assets and obsolete responsive/theme styles. Functional icons, location details, photographic postcards and the authentic hiking photo remain.
- Rebalanced About’s planning philosophy into three concise notes; reclaimed Sign Up’s former sketch area for its existing photograph. The approved Ladakh section, gallery, planning selector, real photography and all three brush-mask assets are retained.
- Corrected a duplicate desktop dashboard wordmark while keeping the mobile identity and sidebar drawer functional.

## Verification

| Coverage                                                                           | Result                                                                                                                                        |
| ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Existing functional regression suite                                               | 21/21 passed                                                                                                                                  |
| Explorer, planning, About, keyboard, auth utilities, drawer and Back-to-Top checks | 10/10 passed                                                                                                                                  |
| Final dashboard header/drawer layout checks                                        | 8/8 passed                                                                                                                                    |
| Chromium screenshot sweep                                                          | 213 captures, no script errors, broken images or page-level overflow                                                                          |
| Complete dark-mode sweep                                                           | 90 captures across every public page and dashboard destination at 1440, 820 and 390px; no script errors, broken images or page-level overflow |
| WebKit light/LTR and dark/RTL mask checks                                          | 24 captures across six principal pages at 1440 and 390px, no issues                                                                           |
| Responsive descendant bounds                                                       | 121 views at all eleven requested widths, no out-of-viewport content                                                                          |
| Additional responsive checks                                                       | 24 passed                                                                                                                                     |
| Header spacing                                                                     | No collisions at 320, 360, 390, 430, 640, 768, 820, 1024, 1241, 1280, 1440 or 1920px                                                          |
| Relative paths, JavaScript syntax, Git whitespace                                  | Passed                                                                                                                                        |

Actual full-page screenshots and contact sheets were visually reviewed for desktop, tablet and mobile compositions, both homepages, catalogs, About, auth, booking, support/journal/legal pages and dashboard destinations. Additional captures verified the corrected dashboard identity and small logo variants. Test tools, browser profiles, screenshots and fixtures remain outside the deliverable.

Search/filter/sort, favorites, package details, itineraries, booking validation and local requests, dashboard status and notes, file viewing/downloads, notifications, profile, export/reset, auth validation/guest access and responsive theme/direction controls remain functional. All twenty package records in `travel-data.js` and the painterly mask assets are byte-for-byte unchanged.

## Contrast and browser limits

Coastal Blue with near-black `#05080C` text: **4.64:1**. Ocean Ink on pale blue: **9.38:1**. Light body text `#E7EBEF` on the raised dark surface: **12.72:1**. Muted dark-mode text on charcoal: **9.29:1**. Small text uses ink or pale text where Coastal Blue itself would not meet text contrast; pale blue is never body text on white. Primary actions retain white text on Ocean Ink. The authentic Google provider logo retains its official colors solely as a provider identity, not as site accents.

Chromium/Brave and Playwright WebKit were verified. WebKit checks do not assert installed Safari or physical iOS testing. Firefox remains unverified because it could not launch in the earlier environment profile attempts. Clean rectangular photographic fallbacks remain available where CSS masks are unsupported.

This remains a frontend-only planning workspace: no successful authentication, confirmed reservations, payments or issued documents are invented. Provider controls truthfully explain unavailable integrations, and guest access works.
