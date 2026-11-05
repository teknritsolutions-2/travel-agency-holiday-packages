# Waylark release crosscheck — 4 November 2026

The frontend release was checked across all 21 page entries, all 20 package variants, all three journal articles and all ten populated dashboard views.

## Corrections made

- Removed intrinsic grid sizing that clipped search/filter controls on 320px phones and pushed sorting outside the catalog at the 681px breakpoint. Phone search/filter fields use full-width rows through 420px.
- Slightly darkened light-theme muted text so supporting text on pale panels clears the 4.5:1 contrast target.
- Allowed maximum-length destination text to wrap in trip cards and retained wrapping in enquiry dialogs.
- Gave the dashboard welcome feature a photograph distinct from package images, preventing a repeat when the latest trip is Kashmir.
- Restored the original `pages/404.html` entry. The root `404.html` remains the GitHub Pages fallback so unknown and nested URLs render the branded error page in place, with correct asset/navigation paths and `noindex`.
- Fixed dark-mode itinerary printing: printed pages use a light palette, controls stay hidden, and all planning notes print as text rather than being clipped inside a textarea. Screen form behavior is preserved.

## Verification

| Check | Result |
| --- | --- |
| Local HTML/CSS references | 232 references resolved |
| Package data | 20 unique package IDs; all package/gallery image paths resolved |
| Local photographs | All 43 raster assets decoded |
| JavaScript | All five files passed syntax checks |
| LTR layout matrix | 984 page/view/theme combinations passed; 1,929 generated internal links resolved |
| RTL layout matrix | 600 page/view/theme combinations passed |
| Solid-surface text contrast | 1,762 checks passed in light/dark themes; photographic backgrounds were reviewed visually |
| Complete user workflows | Six browser/viewport runs passed |
| Dropdown workflows | Eight browser/viewport/direction runs passed |
| Maximum-length enquiry content | 16 browser/viewport/direction runs passed |
| Itinerary printing | Four browser/theme runs passed, including complete long notes and screen restoration |
| Root 404 fallback | 16 direct/nested URL renders passed across mobile/desktop, both themes and both browser engines; asset paths, navigation and skip links verified |

Chromium/Brave coverage included 320, 390, 680, 681, 820, 1024, 1240, 1241, 1440 and 1920px. WebKit coverage included phone, tablet and desktop sizes. The RTL matrix included narrow phones and the tablet breakpoint. These are browser-engine checks, not a claim of physical-device testing.

Workflow checks used isolated browser data and covered destination/style/planning tabs, Home 2 day tabs, About experiences, favorites, photo viewing, itinerary saving and notes/downloads, booking review and draft saving, request preparation/cancellation, profile persistence, contact-message review/download, authentication validation and provider feedback, data export/reset, and the nested-URL not-found fallback. Dropdown checks additionally covered filtering/sorting, form values and validation, keyboard/type-ahead access, touch scrolling, resets, disabled options, dynamic controls and modal document metadata.

Representative desktop, tablet, phone, authentication, filtering and error-page captures were inspected. The published release is verified separately after deployment.

## Service status

The site is a published planning frontend. Real account creation/sign-in, Google/Apple OAuth, enquiry delivery, payments, live availability and provider booking services remain unconfigured. Current forms retain truthful feedback; planning drafts and preferences are browser-local. No successful account, sent enquiry, payment or confirmed booking is simulated.
