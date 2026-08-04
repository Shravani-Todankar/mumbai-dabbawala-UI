# Build Log — Mumbai Dabbawala rebuild

**Date:** 2026-07-27
**Scope:** Single-page React rebuild of mumbaidabbawala.in, styled with tokens from `davidwhyte.md`.
**Basis:** Authorized redesign / case study (confirmed by user).

## Stack
Vite 8 · React 19 · GSAP 3 · Lenis · plain CSS custom properties.

## What was built
Single scrolling page: Header, Hero, About + Team, Services, Stats, Framework, Recognition,
Gallery, App/Donate/Bank, Contact, Footer.

- `src/data/content.js` — all real copy, contact details and bank details, extracted from the live site.
- `src/styles/tokens.css` — design tokens from `davidwhyte.md`.
- `src/hooks/useSmoothScroll.js` — Lenis + anchor interception.
- `src/hooks/useReveal.js` — scroll reveals and stat count-ups.
- `public/assets/images/` — 23 images downloaded from the source site.

## Decisions
- **Font scale rebuilt.** `davidwhyte.md` specifies `font.size.xs=0.87px` through `4xl=16px`. Those
  are scrape artifacts and sub-legible, so a 1.25 modular scale was substituted. Colors, spacing,
  radii and motion durations were used verbatim.
- **Roobert is not bundled** (licensed font). Stack falls back to Inter / system sans.
- **Multi-page source flattened to one page** with in-page anchors, since the ask was smooth scroll.
- **Service icons recolored** to the accent token via CSS filter rather than re-authoring the PNGs.
- **Contact form is client-side only** — validates and clears, posts nowhere. Needs a backend.

## Defects found and fixed during verification
1. **Reveals never fired.** `gsap.context` scopes selectors to the scope element, so `.about .reveal`
   matched nothing (`.about` *is* the scope, not a descendant). All reveal elements stayed at
   `opacity: 0`. Fixed by scoping to `.reveal` alone.
2. **Reveal mechanism swapped twice.** ScrollTrigger → IntersectionObserver → rect-based scroll check.
   The final version does not depend on the rendering lifecycle, so elements scrolled past while the
   tab was hidden still reveal on return.
3. **Stat counter locale mismatch.** `toLocaleString('en-IN')` rendered `2,00,000` while the hero read
   `200,000`. Switched to `en-US` for consistency with the source.
4. **Images mapped to the wrong text.** The New York Times item was showing an Aditya Birla Group
   client logo, and advertising photos were filed under "Lecture & Seminars". Every image was opened
   and re-checked; unmatched items now render without an image and the empty categories were removed.
5. **Mobile menu panel translucent.** `rgba(0,0,0,0.97)` let the hero bleed through. Now opaque.

## Verification
Dev server on :5173, checked at 1440×900 and 375×812.

- Verified: layout at both widths, no horizontal overflow (`scrollWidth === innerWidth` at 375px),
  gallery filter + `aria-pressed`, contact validation (errors, `aria-invalid`, focus to first invalid
  field) and happy path, mobile menu toggle + `aria-expanded`, footer content, stat count-ups.
- `npm run build` passes — 301 kB JS (98.9 kB gzip), 22.5 kB CSS.
- No console errors.
- **Not verified:** animation timing/easing. The preview pane throttles requestAnimationFrame to zero
  frames, so GSAP and Lenis motion could not be watched running. Logic and end states were confirmed
  via the DOM; the motion itself needs a look in a real browser.

---

# Round 2 — light theme, video, motion pass

**Date:** 2026-07-27

## Light theme
Repalette to light using `color.surface.raised=#e7e7e2` as the page surface and
`color.text.tertiary=#a94c21` as the accent (4.53:1 on the surface, 5.6:1 for white on the accent —
both pass AA). Every hardcoded dark value in component CSS was replaced with a semantic token
(`--color-accent-tint-*`, `--color-scrim*`, `--color-field-surface`, `--color-danger*`,
`--icon-accent-filter`, `--shadow-card*`). Only one literal remains, the translucent scrolled header,
which needs alpha for its backdrop-filter.

## Section differentiation
Each section now has its own surface so they don't read as one continuous slab:

| Section | Treatment | Heading effect |
| --- | --- | --- |
| Hero | glow gradient | SplitText chars + line mask |
| Video | pinned, full-bleed | static overlay |
| About | base + parallax "1890" watermark | line mask / roller |
| Services | tinted band | word scroll reveal |
| Stats | **inverted dark band** | scramble text |
| Framework | base, sticky title column | typewriter |
| Marquee | accent strip, infinite scroll | — |
| Recognition | sunken + image parallax | line mask / roller |
| Gallery | base | SplitText chars |
| Promo | elevated panel | word scroll reveal |
| Contact | sunken | typewriter |

`.section--invert` redefines the palette custom properties for its subtree, so every component
inside it works unchanged against the dark surface.

## Text animations
GSAP 3.15 ships SplitText, ScrambleTextPlugin and TextPlugin free, so all five requested effects use
official plugins rather than hand-rolled substitutes. They live in one `<AnimatedHeading variant>`
component. SplitText runs behind `document.fonts.ready` because it measures line breaks, and
`aria: 'auto'` keeps the heading readable to screen readers after it is split into per-character
elements.

## Scroll-scrubbed image sequence
`new video of dabba.mp4` (1280×720, 10s, 24fps) is **not shipped as video**. It is decomposed into a
WebP frame sequence painted to a `<canvas>`; the mp4 encodes from the first attempt were deleted.

- Every 2nd frame extracted → 120 frames (12fps effective, ample for scrubbing).
- Two sets, chosen by `matchMedia` at preload: `frames/desktop` 1280px q64 (5.7 MB) and
  `frames/mobile` 854px q60 (3.4 MB). ffmpeg here has no WebP encoder, so `cwebp` does the encode.
- All frames are preloaded and decoded up front, then `ScrollTrigger.create` pins the stage for 250%
  of viewport height and paints `round(progress × 119)` on every update. Cover-fit is computed
  manually against a DPR-scaled canvas.

Why frames rather than the video element: seeking a video is decoder work with real latency, so the
first version needed an all-keyframe re-encode and still depended on seek behaviour. A frame sequence
is a plain array lookup — exact, and identical on every browser. The cost is size: no inter-frame
compression, so 5.7 MB for 10s where the mp4 was 5.6 MB.

A `ResizeObserver` re-fits the canvas, because the stage can measure 0 before first layout, which
otherwise leaves the canvas at its default 300×150 forever.

Under `prefers-reduced-motion` it paints frame 0 and stops.

## Header and navigation
Nav menu removed as requested — header is now brand, phone, and Donate. Wayfinding is replaced by a
scroll progress bar and one floating arrow button that runs the page top-to-bottom and back
(down near the top, up once scrolled).

## Defects found and fixed this round
6. **Scroll button inverted at the top.** `innerHeight` can be `0` on first measurement, so
   `scrollY < innerHeight * 0.6` was false at `scrollY: 0` and the button offered "back to top"
   while already at the top. Threshold now has a 200px floor plus a resize listener.
7. **Wrong video encode on desktop.** `matchMedia('(max-width: 768px)')` evaluated at mount matched
   because the window measured 0 wide, serving the 854px file at 1440px. Replaced with native
   `<source media>` so the browser evaluates against the real viewport.
8. **Dead CSS selectors.** SplitText emits no default class names, so the `.split-line/.split-word/
   .split-char` rules never applied. Class names are now passed explicitly, which matters because
   the line mask clips descenders without the padding.

## Verification (round 2)
- Frame sequence: all 120 desktop frames fetched, 0 failures, 5.6 MB over the wire. Canvas sized
  2850×1800 at 2× DPR. Scrubbing produced five distinct canvas hashes across the pinned range, and
  captions hand off cleanly — exactly one at opacity 1 at each quarter (0.125/0.375/0.625/0.875).
- Note on method: the preview pane had stopped issuing rAF by this point, which freezes ScrollTrigger
  entirely. An earlier reading that looked like "frames never advance" was that staleness, not a real
  fault. The scrub was verified by driving `ScrollTrigger.update()` manually; the temporary
  `window.__ST` handle used for that has been removed.
- Heading variants confirmed in the DOM: 12 split chars (Gallery), 2 split words (Services), 2 masked
  lines (About), scramble and typewriter both resolving to their exact final strings.
- Parallax watermark confirmed transforming under scrub.
- No horizontal overflow at 375px; no console errors; `npm run build` passes
  (370 kB JS / 125 kB gzip, 27 kB CSS).
- **Still not verified visually:** the motion itself — easing, timing and the scrub's smoothness in
  real playback. The preview pane throttles rAF, so end states and scrub values were read from the
  DOM instead. Worth one pass in a real browser.

---

# Round 3 — de-boxing pass (from annotated screenshots)

**Date:** 2026-07-27

The card/box treatment was removed site-wide in favour of an editorial, hairline-ruled layout.
Requested on Services ("i dont want boxes") and marked up on Stats, the app panel and Pay Us On;
applied to Team, Recognition and the contact form as well so nothing is left as the odd boxed
section.

| Was | Now |
| --- | --- |
| Services: 6 white cards, shadow, radius | 3-column grid, top hairline per item, no fill |
| Stats: 4 bordered tiles on the dark band | one ruled row, vertical dividers between figures |
| Team: bordered cards | hairline-topped entries |
| Recognition: bordered cards w/ shadow | hairline-topped, image keeps a small radius |
| App promo: one large white panel | borderless split, mockup blends into the page |
| Donation + Pay Us On: two panels | borderless, separated by a rule above |
| Contact form: bordered panel | borderless; inputs keep their own borders |

Other changes:
- **Header brand text removed** — logo only, at 52px.
- **"Donate Now" now points at `#pay`**, the bank-details block, instead of the section wrapper.

## Defect fixed
9. **Framework heading overflowed its column.** "Transformational" is a single unbreakable word
   ~600px wide at the shared 72px display size, in a ~429px grid column — its glyphs spilled over the
   list beside it and collided with the "01" marker. The framework heading is now
   `clamp(2rem, 3.4vw, 3rem)`; measured at 1512px the longest word is 322px in a 483px column with a
   64px gap to the list.

## Verification (round 3)
Verified from the DOM, because the preview pane had stopped compositing by this point — screenshots
came back blank even where `getBoundingClientRect` and computed opacity showed content on screen:
- Services, Stats, Recognition, Contact form, Team, promo panel and bank block all report
  `background: rgba(0,0,0,0)`, `border-radius: 0`, `box-shadow: none`.
- Framework longest-word vs column width measured as above.
- `#pay` resolves to the "Pay Us On" heading / "Bank Name — Bank Of Baroda" row; header CTA href is
  `#pay`.
- Header brand text content is empty; no horizontal overflow; no console errors; build passes.

**Not visually confirmed:** the new Services and Stats layouts have not been seen rendered. The
structure and computed styles are right, but the spacing and rhythm deserve a look in a real browser.

## Open items
- Wire the contact form to a real endpoint.
- License and self-host Roobert, or pick a permanent substitute.
- Nav removal means there is no direct jump to a section any more — if that proves annoying,
  a minimal section-dot rail is the smallest addition that restores it.
- The 5.7 MB frame sequence is the page's heaviest asset and is fetched as 120 separate requests.
  Worth considering: dropping to ~90 frames, or lazy-loading the tail while the first ~20 paint.
- Remaining source pages not built: donate-now, privacy-policy, refund-policy, terms-of-use,
  video gallery, per-service detail pages (`?id=57`…`68`).
- Client logos (`clients2`–`clients10`) were not downloaded; there is no "Our Clients" section yet.
- Large gallery JPEGs are unoptimized (~800 kB each) — convert to WebP before any deploy.

## Round 4 — client reference sites

Client supplied six reference URLs (Lite n' Easy, Dinner Ladies, HelloFresh AU, me&u, Balanced Meal,
Spice Box). Five were reviewed in the preview pane; **hellofresh.com.au served a Cloudflare
challenge and was not opened** — its pattern was taken from general knowledge instead, not from the
live page. Three patterns were selected and built. Nothing was copied from the references except
layout and interaction structure: no images, copy, fonts, logos or artwork.

### 1. Three-beat display hero (from Dinner Ladies)
`Hero.jsx` / `Hero.css` restructured from "left copy + right collage" to a full-width statement:
- `<h1>` is now three beats — "Pack it. / Run it. / Deliver it." — in a wrapping flex row with
  `space-between`. The last beat is set in the accent terracotta.
- Sizing is `clamp(2.75rem, 6.1vw, 5.5rem)`. The first attempt at `9.4vw` looked stronger but
  "Deliver it." wrapped to a second line, and with `space-between` that turns the first row into a
  hole. Measured at 1280px and 1512px: all three beats share a single baseline.
- Below the type, a full-bleed five-tile strip (the former collage images) with a taller centre tile.
- A circular "Six Sigma / 99.999999 / Forbes Global" badge overlaps the strip's top-right, rotated
  −12°. Set in type, not artwork — the figure is the Forbes Global finding already cited in
  Recognition.
- The old `.hero__mosaic` three-column layout and its CSS are gone.

### 2. Numbered "How it works" flow (from HelloFresh)
New `Process.jsx` / `Process.css`, mounted between About and Services at `#process`.
Four steps — collect, code and sort, three rail routes, deliver and return — with oversized `01`–`04`
numerals and a dashed connector between cards. Copy is grounded in the existing `about` paragraphs
(the alpha-numeric coding system and Mumbai's three local train routes are its own description);
nothing about timings or volumes was invented. Added to the footer quick links.

### 3. "As featured in" strip (from me&u)
New `PressStrip.jsx` / `PressStrip.css`, rendered under the hero CTA.
Six wordmarks — Forbes Global, The New York Times, IIM Ahmedabad, ISO 9001:2000, Virgin, HRH The
Prince of Wales. **Set as type, not logos**, deliberately: every name is an organisation already
cited in `recognition`, so the strip restates existing claims, and we hold no licence to reproduce
anyone's actual mark.

### Verification (round 4)
- Build passes: `index 402.92 kB / gzip 134.90 kB`, PixelSnow chunk unchanged at 131.40 kB gzip.
- 1280px: three beats all at `y=138`; four process columns at 250px each; press strip renders all
  six wordmarks in one 91px block; `scrollWidth === innerWidth`.
- Mobile preset: beats stack (`y` 149/201/252), strip drops to 2 tiles, process to one column,
  sticker right edge 363px inside a 375px viewport; no horizontal overflow.
- Hero screenshot captured and reviewed at desktop width.

**Not verified:** the entry timeline (beat roll-in, sticker back-ease pop, press-strip fade) —
`requestAnimationFrame` is throttled in the preview pane, so GSAP motion cannot be observed there.
Also unseen rendered: Process and PressStrip below the fold; the pane stopped compositing before
scrolling, so both were confirmed by DOM geometry only.

## Round 5 — remaining two reference patterns

### 4. Four-up benefits row (from Lite n' Easy)
New `Benefits.jsx` / `Benefits.css`, between VideoScroll and About. Icon, title, one line, "Learn
more →", each linking to the section that carries the detail (`#work`, `#about`, `#process`).
Reuses the four `fact-icon` PNGs. Every prop restates a fact already on the page — the Forbes rating,
the ISO certificate, the tagline's headcount, the founding year — so the row adds no new claim.
Kept boxless (rule + spacing, no card chrome) to match the rest of the site.

### 5. Filterable card grid with chips (from Lite n' Easy) — applied to Recognition
Recognition is the page's only content set with a real classification available, so the filter
pattern went there rather than onto Services (which has no category data in the source at all).
Each entry gained a `kind` derived from what it already says — Press / Certification / Visits /
Academia — surfaced both as a chip on the card and as the pill filter row above.
`.recognition__grid` moved from `auto-fit` to three fixed tracks: with `auto-fit`, filtering down to
one result stretched a single card across the whole row.
The `<ul>` is keyed on the active filter. `useSectionFx` runs once and its `fromTo` leaves inline
opacity on the cards it owns, so reusing nodes would render a filtered set half-invisible.

### 6. Announcement bar + pill header (from Spice Box / me&u)
- New `AnnouncementBar.jsx` / `.css` above the header. Carries the Mumbai Roti Bank helpline —
  the one genuinely actionable line in the content — as a `tel:` link. White on `#a94c21` is
  5.61:1; the link is distinguished by an underline rather than a colour shift that would fall
  below AA.
- `Header` moved from `position: absolute` overlaying the hero into normal flow, and its bar is now
  a pill: rounded to `--radius-pill`, hairline border, elevated surface, logo left and a single
  "Contact us" CTA right. **Still deliberately menu-less** — only the shape was taken from the
  reference; the nav links the client removed earlier were not reinstated.
- Hero top padding dropped from `clamp(--space-8, 12vh, 128px)` to `--space-7` now that it no
  longer has to clear an overlaid header.

### Defect found and fixed
`.hero__beat` broke mid-phrase ("PACK / IT."). Two compounding causes: SplitText replaces the text
with block line wrappers, which makes the flex item shrinkable; and the split runs behind
`document.fonts.ready`, which in this pane resolved while `innerWidth` was still 0 — so it measured
and committed two lines at a zero-width viewport. `flex: 0 0 auto; white-space: nowrap` on the beat
fixes both: the split now sees one line regardless of when it runs.

### Verification (round 5)
Measured at 1440x900 after a full reload:
- Beats all on one baseline (`y=263`), one `.split-line` each, widths 303 / 262 / 414.
- Benefits `260px x4`; Recognition `362.66px x3`, 6 cards; header bar `border-radius: 999px`;
  announcement bar `rgb(169, 76, 33)`.
- Filters driven programmatically with a tick between click and read: Visits→2, Press→2,
  Certification→1, Academia→1, All→6, `is-active` tracks the clicked chip each time.
- No console errors. `scrollWidth - innerWidth = -15` (no overflow).
- 390x844: no document overflow, beats 350px each, header bar 350x72, Benefits and Recognition
  both single-column.
- Build passes.

**Not verified:** anything visual below the hero. The preview pane stopped compositing again —
screenshots of the Benefits row came back fully blank while `getBoundingClientRect` put the section
at `top: 63` with every child at `opacity: 1`. Motion is likewise unobservable (throttled rAF).
The hero, announcement bar and pill header were seen rendered before the pane went blank.

## Round 6 — differentiating Services / Portfolio / How it works

Client's note: those three sections all felt the same. They did — each was eyebrow, `.section-title`,
then a boxless grid on the same white page. The type was varied; nothing structural was.

Structures were taken from two of the client's references, read directly off the live pages:
- **me&u** — the page is not one continuous surface. Every heavy section is a large rounded panel
  (`border-radius` 17.87–21.44px) inset on a warm-grey body (`rgb(218,214,201)`), and the fills
  alternate between cream `rgb(255,250,243)`, deep ink `rgb(0,24,20)` and one lime accent block
  `rgb(219,252,68)`. The slab, not the typography, is what keeps consecutive sections apart.
- **Spice Box** — "How it works" is a single slab at `border-radius: 140px` over a soft gradient
  tint, holding four **capsule** step cards (`border-radius: 248px` on a 307x359 box), each led by a
  73px circular icon chip, centre-aligned, closing on one centred CTA pill.

### New: slab system (`global.css`)
`.section--slab` (inset margin, `clamp(28px, 5vw, 72px)` radius) and `.section--tint` (cream
`#faf5f0`). Three fills now exist alongside the page white: cream, the brand terracotta, and the
ink `.section--invert` scope that had been defined since round 1 and never used.

**This deliberately departs from the earlier "`#FEFEFE` everywhere except Our Portfolio"
instruction** — the sections cannot read as distinct while sharing one fill. `#FEFEFE` is still the
page background and no new hue was introduced; cream and ink are tonal, and terracotta was already
approved. Easy to revert if the client prefers the flat page.

### How it works → Spice Box treatment
Cream slab, centred throughout (the only centred section on the page), capsule step cards at
`border-radius: 200px` on white, terracotta circular number badges, closing CTA. Capsules are the
one place card chrome survives the site-wide "no boxes" rule — the shape *is* the treatment, and
without it the section collapses back into the four-column grid it replaces.

### Our Services → me&u "Key Features" treatment
Ink slab. Head split two-up (statement left, lead right) instead of the centred eyebrow stack.
The six services became compact icon+title tiles in a hairline grid (1px gaps over
`--color-border-muted`) rather than tall bordered columns — on a dark fill a hairline reads as
structure, not as boxes. Dropped the `01`–`06` indices, which now belong to Process.

### Our Portfolio → me&u "The Numbers" treatment
Terracotta slab, now inset and rounded rather than full-bleed. Replaced four equal cells with one
lead figure at `clamp(3.5rem, 11vw, 10rem)` — the 200,000 daily deliveries — above a rule, with the
remaining three stats in a smaller row beneath. `useCountUp` extracted into a shared `StatValue`
so both sizes animate. The four `fact-icon` PNGs are no longer used here; they still serve Benefits.

### Contrast fix
The Process kicker at `--color-text-muted` measured **3.94:1** on the cream slab — below AA for
12px text. Moved to `--color-text-secondary`: **7.32:1**. Also checked the ink slab's accent kicker
(`#d8914c` on `#17140f`) at **7.15:1** — passes.

### Verification (round 6)
1440x900, measured from computed styles:
- Three distinct fills, all at 72px radius and 1379px wide: cream `rgb(250,245,240)`,
  ink `rgb(23,20,15)`, terracotta `rgb(169,76,33)`.
- Process capsules `border-radius: 200px` on white, badge a 68px terracotta circle;
  4 columns at 256px. Services 3 columns at 377px. Stats lead figure renders at 158.4px.
- `scrollWidth - innerWidth = -15` (no overflow). Build passes.
- 390x844: all three sections single-column, slab radius 28px, slab width 374 inside 390
  (8px inset per side), lead figure 56px, no overflow.

**Not verified:** none of it seen rendered. The preview pane composites only at `scrollY = 0` in
this session — every screenshot taken below the fold came back blank while the DOM reported correct
geometry and opacity. The three sections should be eyeballed in a real browser.

## Round 7 — gallery back to a carousel, auto-scrolling

`DomeGallery` replaced with a horizontal carousel that drifts on its own and stops on hover.

### Carousel
`Gallery.jsx` is now a native `overflow-x` scroll container of fixed-width slides
(`clamp(260px, 30vw, 420px)`), full-bleed to the right so the next photo is always partly visible.
Each slide keeps its real alt text and shows its category as a caption. Prev/next buttons and the
existing category filters are retained.

- **Auto-scroll** advances `scrollLeft` at 40 px/s on `gsap.ticker`, so the drift shares a clock
  with the scroll animations instead of running its own rAF loop.
- **Pause on hover**, and on focus too — without the focus case, tabbing to a slide would scroll the
  focused element straight back out of view.
- **Seamless loop**: the item list is repeated and the drift subtracts one set's width at the wrap
  point. The copy count is measured, not fixed — two sets cover the full gallery, but a filter
  narrowed to two photos needs three for the wrap to stay off-screen. Duplicate slides carry
  `aria-hidden` and an empty `alt`.
- Arrows use the same modulo, so paging back from 0 lands at `setWidth - step` rather than sticking.
- `prefers-reduced-motion` skips the ticker entirely; the track stays manually scrollable.
- **`scroll-snap-type` was removed.** Mandatory snapping fights a continuous drift — it yanks the
  track back to the nearest slide every frame. Snap and auto-scroll cannot both be on.

### Removed
- `DomeGallery.jsx` and `DomeGallery.css` deleted; `@use-gesture/react` uninstalled.
- With them went the `dg-scroll-lock` MutationObserver that paused Lenis, and the vendor bug fixed
  in round 3 (the transitionend-only cleanup) is no longer relevant.
- Main bundle **135.69 → 122.95 kB gzip**.
- `getLenis()` in `useSmoothScroll.js` is now unused — left in place as a small exported helper.

### Contrast fix
Slide captions at `--color-text-muted` measured **4.13:1** on `#fefefe` — short of AA for 12px.
Moved to `--color-text-secondary`: **7.73:1**.

### Verification (round 7)
1440x900, fresh tab, no console errors, build passes:
- All: 10 slides (2 sets of 5), first 5 exposed with alt text, last 5 `aria-hidden` with empty alt;
  `scrollWidth` 4560 vs `clientWidth` 1425. `scroll-snap-type: none`.
- Filtered to Advertisement (2 photos): copy count auto-raised to 3, 6 slides, 2 exposed, and
  `scrollWidth - setWidth >= clientWidth` holds, so the wrap point stays off-screen.
- Arrows step exactly one slide (444px): 0 → 444 → 888 → 444; paging back from 0 wraps to 1836
  (`setWidth` 2280 − 444).
- No `.sphere-root` left in the DOM.

**Not verified:** the auto-drift and the hover/focus pause. `requestAnimationFrame` reports **0
frames** in this pane with `visibilityState: hidden`, so `gsap.ticker` never fires here — the
carousel cannot move regardless of the code. Needs a look in a real browser.

### Reported in error, retracted in round 10
An earlier version of this entry reported a pre-existing defect: the pinned `.video-scroll__stage`
keeping a stale width after a viewport change and giving the page horizontal overflow. **That was a
preview-pane artifact, not a real defect** — see round 10.


## Round 8 — new video, re-framed

Source swapped to `/Users/apple/Downloads/new dabbawala video.mp4` (1280x720, h264, 24 fps,
10.005 s, 2.75 MB).

### Pipeline
Same as round 2, because this ffmpeg build still has no WebP encoder:
1. `ffmpeg -vf fps=12 -frames:v 120` → 120 PNGs. 12 fps over 10 s lands exactly on the 120 frames
   `VideoScroll` already expects, so `FRAME_COUNT` and the `%03d.webp` naming are unchanged and no
   component code had to move.
2. `cwebp` twice per frame — desktop `1280x720 -q 72`, mobile `854x481 -q 70`, matching the
   dimensions the old set used.
3. Frame 1 re-encoded at `-q 80` as `poster.webp`.

ffmpeg numbers from `001`; the loop offsets by one so the output is `000`–`119` as before.

Old `desktop/`, `mobile/` and `poster.webp` deleted and replaced. Total **9.1 MB → 7.3 MB**
(desktop 5.7 → 4.5 MB, mobile 3.4 → 2.7 MB).

### Captions rewritten
The new footage tells a different story from the old one — dal on the stove, the dabba being
packed, Dabbawalas cycling past a local train, a handover at an office desk. The old captions
described collection and code-sorting, and the first two no longer matched anything on screen:

| was | now |
| --- | --- |
| Collected from every kitchen | Cooked at home each morning |
| Sorted by a century-old code | Packed into the dabba |
| Carried across three rail lines | Carried across the city |
| Delivered hot, on time, every day | *(unchanged)* |

Canvas `aria-label` rewritten to describe the same four beats.

### Verification (round 8)
- 120 files each in `desktop/` and `mobile/`, named `000`–`119`; frame 0 is 41 kB desktop /
  24 kB mobile.
- Frames fetched over the network 200 OK through `mobile/119.webp` (the pane reports a 0-width
  viewport, so the component picks the mobile set — the desktop set is served by the same path).
- Canvas pixel sampling returns real image data (`58,57,50` / `85,82,74` / `149,140,122` — the warm
  tones of the opening kitchen frame), so the sequence is decoding and painting, not blank.
- All four new captions present in the DOM. Build passes.

**Not verified:** the scrub itself. The canvas reports its 300x150 default because the pane's
viewport measures 0, so the ResizeObserver never gets a real box, and `requestAnimationFrame` is
dead here regardless. Scroll through the section in a real browser to confirm the pin and the
frame-to-scroll mapping.

## Round 9 — two counter-scrolling gallery rows, filters removed

### Two rows, opposite directions
The carousel was extracted into a `CarouselRow` subcomponent and rendered twice. Row A drifts left
(`direction: 1`), Row B drifts right (`direction: -1`) and starts one set in so it has room to
scroll back before its first wrap. Speed dropped 40 → 34 px/s; two rows moving at the old rate read
as busier than one.

Items are split by **alternating index**, not down the middle, so each row carries a mix of
categories instead of one row holding a single kind of photo. With five photos that gives 3 and 2.

Slides shrank from `clamp(260px, 30vw, 420px)` to `clamp(170px, 19vw, 280px)` — roughly two thirds.
Two stacked rows at the old width would have run past a laptop viewport's height. Mobile drops to
`clamp(150px, 42vw, 220px)`.

### Defect: the loop wrap was on screen
Both rows initially reported `loopSafe: false`. The set width was derived as
`scrollWidth / copies`, which folds in the track's own `padding-inline` (72px each side) and
overstates it — so the measured copy count came out one short and the wrap would have been visible.
Row B did not overflow at all (`scrollWidth === clientWidth`), meaning it could not scroll.

Replaced with `setWidthOf(track, count)`, measuring the offset between the first slide of set one
and the first slide of set two. Padding-immune and exact. Copy counts then resolved to 3 for Row A
and 4 for Row B, and both rows became loop-safe.

### Filters removed
`All / A Day with Dabbawala / Advertisement` deleted, along with the filter state, the empty-state
message, their CSS and `galleryFilters` in `content.js`. The row split is now computed once at
module scope. Slide captions had already gone when the rows were introduced — with the photos this
small the category line was longer than the image was wide.

The arrows also went: with two rows running in opposite directions, one pair of prev/next buttons
has no coherent target. Both rows are still manually scrollable by drag, wheel and flick, and both
are keyboard-focusable scroll regions.

### Verification (round 9)
1440x900, no console errors, build passes (**122.92 kB gzip**):
- Two tracks. Row A: 9 slides (3 sets of 3), set width 893, max scroll 1373 — loop-safe.
  Row B: 8 slides (4 sets of 2), set width 595, starts at `scrollLeft: 595` — loop-safe.
- 5 exposed images total, duplicates `aria-hidden` with empty alt. Slide 274x205.
- 0 filter buttons remain. `scrollWidth - innerWidth = -15`.
- 390x844: slides 164px wide, both rows still loop-safe, no overflow.

**Not verified:** the drift itself and the hover/focus pause, in either direction. `gsap.ticker`
never fires in this pane — `requestAnimationFrame` reports 0 frames with `visibilityState: hidden`.
The geometry the loop depends on is confirmed; the motion is not.

## Round 10 — stacked-card scroll for the three slab sections

Process, Services and Stats are already adjacent in `main` and already rounded slabs, so they were
wrapped in a new `StackSections` component and now read as a deck.

### How it works
- Each child is wrapped in a `.stack__item` that is `position: sticky` at a slightly lower offset
  than the one before it — 40px / 60px / 80px — so covered cards keep a visible edge rather than
  disappearing entirely.
- Every card but the last scales to `0.92` and fades to `0.55` opacity, scrubbed against the *next*
  card's travel (`start: 'top bottom'`, `end: 'top top'`), so a card recedes exactly as much as it
  is covered. `transform-origin: 50% 0` keeps its header still as it shrinks.
- Block padding inside the stack drops from `--space-10` (140px) to `--space-8` (64px). Sticky only
  behaves while a card is shorter than the viewport; at the default padding Process measured 946px
  against a 900px viewport and would have pinned with its lower half permanently below the fold.
  At 64px the three measure 794 / 569 / 679 and all clear their offsets.
- Set up through `gsap.matchMedia` at `min-width: 1001px` and skipped under `prefers-reduced-motion`.
  Below that the items go `position: static` and the padding returns to 140px — narrower viewports
  make the cards taller and the viewport shorter at the same time, which is exactly when a sticky
  stack breaks.

### Round 7's "pre-existing bug" was wrong — retracted
Round 7 reported that the pinned video stage kept a stale width after a viewport change, giving the
page ~57px of horizontal overflow, and blamed a missing `ScrollTrigger.refresh()`. A fix was written
and then reverted.

The real cause: **this preview pane changes the viewport without dispatching a `resize` event.**
Verified directly — a counter bound to `window.addEventListener('resize', …)` read **0** across
three viewport changes. ScrollTrigger's default `autoRefreshEvents` already includes `resize`, so in
a real browser the pin refreshes itself; nothing was broken. Every "overflow after resize" reading
in rounds 7 and 9 was this artifact. The added refresh handler was redundant and unverifiable here,
so `VideoScroll.jsx` is back to its previous state.

Consequence for future rounds: **overflow measured after a `resize_window` call in this pane is not
trustworthy.** Reload the page after resizing before measuring layout.

### Verification (round 10)
Fresh load at 1440x900, no console errors, build passes (**123.05 kB gzip**):
- Three `.stack__item`s, all `position: sticky`, tops 40 / 60 / 80px.
- Card heights 794 / 569 / 679; each clears `height + top <= 900`.
- `transform-origin: 50% 0` on all three; a GSAP transform is attached to the first two and not to
  the third, which is correct — the last card in a deck never recedes.
- Stack padding resolves to 64px; `scrollWidth - innerWidth = -15`; stage width back to 1425.
- At 1000px wide: all three `position: static`, padding back to 140px — fallback confirmed.

**Not verified:** the scrub itself. `gsap.ticker` does not run in this pane (`requestAnimationFrame`
reports 0 frames, `visibilityState: hidden`), so ScrollTrigger never updates and the scale stays at
1 no matter where the page is scrolled. The geometry the effect depends on is confirmed; the motion
has to be checked in a real browser.

## Round 11 — stack cards: no fade, uniform width

- **Opacity fade removed.** Covered cards stay fully opaque.
- **Scale removed too.** It was the only thing making the cards read as different widths — a card
  at `scale: 0.92` is visibly narrower than the one on top of it. With both gone the deck is pure
  CSS sticky, so `StackSections.jsx` no longer imports GSAP at all and is just the wrapper markup.
- `.stack__item > .section` restates `margin-inline: clamp(8px, 1.6vw, 24px)` so the three stay
  locked to one width even if a fill class ever sets its own margin.
- Dropped the now-pointless `transform-origin` and `will-change` rules.

Bundle **123.05 → 122.96 kB gzip**.

### Verification (round 11)
Fresh load at 1440x900, no console errors, build passes:
- All three cards `width: 1379`, `left: 23`, `right: 1402` — identical box on every card.
- All three `opacity: 1` and `transform: none`.
- Still sticky at 40 / 60 / 80px; heights 794 / 569 / 679, each clearing its offset under 900px.
- `scrollWidth - innerWidth = -15`.

Note that this one is fully verifiable — with the GSAP scrub gone, the effect is CSS-only, so the
pane's dead `requestAnimationFrame` no longer hides anything. The stacking itself still needs a
real scroll to look at, but nothing about it depends on JS any more.

## Round 12 — y-translate lag on the covered stack cards

The depth cue is back, as a translate instead of a scale.

- Each covered card drifts **down 20px** as the next one covers it, scrubbed against the next card's
  travel. Downward, not upward: a card that lags behind the scroll reads as further away, and
  moving it up would *expose* more of it rather than tucking it under the deck.
- Width and opacity are untouched — that was the point of dropping the scale in round 11.

### Sticky offsets and padding had to move with it
The old 20px gaps between offsets were narrower than the 20px lag, so a covered card's visible edge
would have closed to nothing. Offsets widened to **40 / 76 / 112** (36px gaps), leaving an 16px
edge at full lag.

Deeper offsets need more headroom under a 900px viewport, so stacked block padding dropped again
from `--space-8` (64px) to `--space-7` (48px). Card heights are now 762 / 537 / 647, and each still
clears `height + top + lag <= 900` — the tallest works out at 762 + 40 + 20 = 822.

### Verification (round 12)
Fresh load at 1440x900, no console errors, build passes (**123.05 kB gzip**):
- Sticky offsets 40 / 76 / 112, both gaps exactly 36px.
- Heights 762 / 537 / 647; all three satisfy `height + top + 20 <= 900`.
- All three cards `width: 1379`, `left: 23` — still one box. All three `opacity: 1`.
- A GSAP transform is attached to the first two cards and not the third, which is right: the last
  card in a deck never recedes.
- `scrollWidth - innerWidth = -15`.
- Reloaded at 1000px wide (reload matters — see the round 10 note about this pane swallowing resize
  events): all three `position: static`, padding back to 140px, no transforms. Fallback intact.

**Not verified:** the lag itself. `gsap.ticker` does not run in this pane, so the scrub never
advances and the transform sits at identity regardless of scroll position. The geometry it depends
on is confirmed; the motion needs a real browser.

## Round 13 — new app-section mockup

Client supplied a generated illustration with their real logo placed on the phone screen:
`/Users/apple/Downloads/mockup-img.png` (1792x2398).

### The PNG had no alpha channel
The checkerboard around the artwork was **painted pixels, not transparency** — a flat grey
`(206,204,205)` and white `(255,255,255)` drawn as a fake transparency grid. Every pixel in the file
read `alpha: 255`; the sampled set of distinct alpha values was `{255}`.

A plain colour-key would have destroyed the artwork: the tiffin's body is `(210,209,205)`, inside the
checkerboard grey's own range. Removed by **flood-filling from the image border** instead, keying on
"low channel spread and value >= 196". Connectivity is what protects the illustration — the tiffin's
greys match the checkerboard, but the cream backdrop circle (spread 19, not keyed) encloses it, so
the fill can never reach inside. Confirmed after the fill that the tiffin body, cream circle and
phone screen all survived.

The fill also removed two generator artifacts that sat in the margin: a grey blob at the lower left
and a four-point sparkle at the lower right.

### Cropped and encoded
The composition occupied barely half the canvas. Cropped to the main mass at 1464x1488 using
per-column/row thresholds so the four small terracotta corner dots did not drag the box back out —
they are dropped, and at this render size they contributed nothing. Encoded with
`cwebp -q 85 -alpha_q 100 -resize 800 0`.

**223 kB PNG → 27 kB WebP.** Old `app-mockup.png` deleted.

### Layout consequence
The asset's aspect went from 0.73 (all phone) to 0.98 (phone plus tiffin plus backdrop circle), and
the handset is now only about half the image width. At the old `clamp(170px, 18vw, 250px)` the phone
itself would have rendered at ~110px, half its previous size. Widened to
`clamp(240px, 28vw, 400px)`, and the mobile rule from 280px to `clamp(260px, 78vw, 420px)`.

`mix-blend-mode: multiply` removed — that was only there to knock out the old PNG's white
background, and it would have darkened this asset against the page.

`width`/`height` attributes updated 646x881 → 800x814 so the box is still reserved before load.

### Verification (round 13)
Fresh load, no console errors, build passes:
- Asset resolves to `/assets/images/app-mockup.webp`, natural size 800x814, `mix-blend-mode: normal`.
- Canvas-sampled through the live `<img>`: all four corners `rgba(0,0,0,0)` — real transparency now.
  Artwork intact: screen `(253,251,247)`, bezel `(31,23,3)`, circle `(254,242,232)`,
  tiffin `(120,116,110)`.
- 1440x900: renders 400x407 in a `336px 400px 336px` stage. No overflow.
- 390x844: renders 304x310, stage collapses to two columns with the phone spanning the top row.
  No overflow.

### Note for the client
The screen is `(253,251,247)` and the page is `#FEFEFE` — near enough identical that the screen
reads as a hole in the page, with only the bezel and the terracotta status bar defining the handset.
It works, but if a more solid phone is wanted the screen needs to be a touch off-white, or the logo
needs to sit on a cream `#faf5f0` screen instead.

## Round 14 — app mockup replaced again

`/Users/apple/Downloads/md-mockup.png` — same composition as round 13, but the screen now carries the
logo at the top plus a Dabbawala character illustration below it.

Same problem as before: **no alpha channel**, the checkerboard painted in as pixels
(`{255}` was the only alpha value in the file). Same border flood-fill treatment, but the key had to
be loosened: this file's grey squares are `(205,201,198)` — a 7-point channel spread against round
13's 2 — so at the old `spread <= 8, min >= 196` the fill left speckle across the whole margin and
the crop box came out at nearly the full canvas height (1468x2248 instead of ~1488).

Loosened to `spread <= 18, min >= 180`. Still safe, because the fill is connectivity-bound and the
barriers hold: the cream circle is spread 22, the bezel is near-black. Explicitly asserted that the
tiffin, circle, screen, logo, cap, kurta, dhoti and skin all survived before writing the alpha —
the character's white kurta `(247,244,239)` matches the key and is only protected by the bezel
enclosing it.

Filled 59.6%. Cropped to 1444x1488, encoded `cwebp -q 85 -alpha_q 100 -resize 800 0` → **800x825,
47 kB**. Intrinsic `height` attribute updated 814 → 825.

The character illustration costs some file size over round 13's empty screen (27 → 47 kB) — expected,
it is a lot more detail.

### Verification (round 14)
Fresh load, no console errors, build passes:
- Natural size 800x825, `mix-blend-mode: normal`, attributes 800x825.
- Canvas-sampled through the live `<img>`: **all four corners `rgba(0,0,0,0)`**. Artwork intact —
  status bar `(167,73,32)`, screen `(253,251,247)`, skin `(221,143,105)`, tiffin `(110,104,95)`,
  cream circle `(255,240,231)`.
- 1440x900: renders 400x413 in a `336px 400px 336px` stage, no overflow.
- 390x844: renders 304x314, two-column stage with the phone spanning the top row, no overflow.

## Round 15 — Benefits section made funky

"Why the dabba always arrives" was the most restrained block on the page: four columns, hairline top
rules, icon, title, text. Rebuilt around the dabba's own marking system — the code brushed onto a
tiffin lid — as **painted lid tags strung along a route line**.

- Each item now leads with a **terracotta disc** (`clamp(88px, 8vw, 112px)`), each hanging at its own
  angle: −9°, +7°, −5°, +11°. On hover the disc straightens to 0° and scales to 1.08.
- The four discs sit on a **dashed terracotta route line** running the width of the row. Each disc
  carries an 8px ring in the page colour so it reads as sitting on the line rather than being
  threaded by it.
- The flat source icons are recoloured white (`brightness(0) invert(1)`) instead of the usual accent
  filter, since they now sit on terracotta.
- An **oversized ghost numeral** (1–4, `clamp(5rem, 8vw, 8rem)` at 10% accent) sits behind each
  item's copy. Decorative, so `aria-hidden`.
- Heading promoted off `.section-title` to its own `clamp(2.25rem, 5vw, 4rem)` uppercase treatment at
  `line-height: 0.98`, plus a "No dabba left behind" kicker.
- The discs are the second exception to the site's no-boxes rule, on the same grounds as the Process
  capsules: the shape *is* the treatment.

### Defect: route line missed the tag centres
First pass positioned the line with margin arithmetic (`calc(var(--space-9) + 56px)` and a negative
bottom margin) and it measured **43px** below the tag centres. Cause: `useSectionFx`'s
`[data-stagger]` tween sets `y: 44` as its "from" state, so every item sits 44px low until the
ScrollTrigger fires — and the line, not being a list child, did not move with them. In this pane the
tween never fires at all, so the misalignment was permanent; in a real browser it would have shown
during the reveal.

Fixed by wrapping the list in a `.benefits__stage` and positioning the line absolutely at
`top: calc(var(--tag-size) / 2)`. `--tag-size` is now a single custom property on the section,
consumed by both the disc width and the line offset, so the two cannot drift apart.

### Verification (round 15)
1440x900, fresh tab, no console errors, build passes (**123.13 kB gzip**):
- With the entry offset neutralised, all four tag centres sit at `4931` against a route line at
  `4932` — **1px**, down from 43.
- Rotations read back as exactly −9 / 7 / −5 / 11 degrees. Ghost numerals 1–4 present at
  `rgba(169,76,33,0.1)`.
- Grid `260px x4`; `scrollWidth - innerWidth = -15`.
- 390x844: single column, tag 101px, ghost 80px, heading 36px, **route line `display: none`** — two
  rows of tags means one straight line no longer lines up with them. No overflow.
- Accent on the page measures 5.56:1, so the kicker and "Learn more" links clear AA at 12px.

**Not verified:** the hover straighten and the entry stagger — no `requestAnimationFrame` in this
pane. The resting geometry is confirmed.

## Round 16 — Benefits as spotlight cards

Client supplied the React Bits `GlowCard` (spotlight card) integration prompt for
"Why the dabba always arrives".

### The prompt's stack assumptions do not hold here
It assumes shadcn + Tailwind + TypeScript and a `/components/ui` directory. This project is Vite +
React 19 with **plain CSS custom-property tokens** — no Tailwind, no TypeScript (only `@types/*` for
editor hints), no `components.json`, no `/components/ui`. Installing Tailwind, TypeScript and shadcn
to host one decorative card would have meant restyling every existing component, so the component
was **ported** to the project's conventions instead: `SpotlightCard.jsx` + `SpotlightCard.css`,
alongside the other components.

### Changes made to the original while porting
- **One shared pointer listener.** The original attached `pointermove` in every instance and wrote
  four custom properties per card per event — sixteen style writes a frame at four cards. Now a
  single listener, reference-counted across mounts, writes three properties onto
  `document.documentElement` and the cards inherit them.
- **No injected style tags.** The original shipped its `::before`/`::after` rules through
  `dangerouslySetInnerHTML`, once per instance. Those rules moved into the stylesheet; the DOM now
  has zero injected `<style>` tags.
- **Hue spread cut from 200 to 18.** The original's `orange` preset sweeps 200 degrees of hue as the
  pointer crosses the viewport, which takes the glow through green and blue. Base is now 20 — the
  brand terracotta — with an 18-degree spread, so it stays warm. Verified the hue resolves to
  `calc(20 + (0.625 * 18))` at a pointer two-thirds across.
- **`prefers-reduced-motion` fallback** added: the glow is a pointer affordance, so it drops to a
  plain hairline panel.
- Fixed size classes (`w-48 h-64` etc.) and the `3/4` aspect lock dropped — these cards sit in the
  section's own grid and stretch to a common height.

### Section moved to the ink slab
The effect is **additive light**: `hsl(... 58%)` glows, `brightness(1.6)`, a white core highlight. On
the page's `#FEFEFE` there is nothing for it to glow against — the same failure mode as the PixelSnow
round, where white flakes on a white page were invisible. Benefits therefore became
`section--slab section--invert`. It is not adjacent to the other ink section (Services): the order
runs Benefits (ink) → About (page) → Process (cream) → Services (ink) → Stats (terracotta).

The lid-tag and route-line design from round 15 is gone; the icon keeps a terracotta disc inside each
card. These cards are the third exception to the no-boxes rule — a spotlight card is a bordered box
by definition, and that was the request.

### Defect: the outer bloom was invisible
`.spotlight` was `position: relative; z-index: auto`, which does **not** establish a stacking
context, so the bloom's `z-index: -1` escaped to the root and painted behind the section's own
background — on an ink slab, gone completely. Fixed with `isolation: isolate` on the card, which
creates the context without putting the card itself on a layer. The bloom now paints above the card's
background and below its content; since its gradient is masked to a 10px ring it only shows as the
outer spill, never washing the copy.

### Verification (round 16)
1440x900, no console errors, build passes (**123.33 kB gzip**):
- 4 cards, 4 blooms, **0 injected `<style data-glow>` tags**.
- One synthetic `pointermove` at (900, 400) moved `--spot-x/--spot-y/--spot-xp` from unset to
  `900.0 / 400.0 / 0.625` on the root — confirms the shared listener drives all four cards.
- `background-attachment: fixed` and `mask-composite: intersect` both resolve, so the masked border
  glow is active. `isolation: isolate` confirmed on the card.
- Section fill `rgb(23,20,15)` at 72px slab radius. All four cards 356px tall on a `266px x4` grid.
- Contrast measured against the ink fill: title **18.37:1**, body **10.31:1**, kicker and link
  **7.06:1**, index label **6.72:1** — all clear AA.
- `scrollWidth - innerWidth = -15`. 390x844: single column, card 334px, slab radius 28px, heading
  36px, no overflow.

**Not verified:** the glow tracking a real pointer. The custom properties update correctly from a
synthetic event, but this pane composites nothing below the fold and runs no
`requestAnimationFrame`, so the effect has not been seen. Move the mouse across the section in a real
browser.

## Round 17 — spotlight card reverted to the published look

Client: exact as the reference, and no background colour on the section.

Fetched `https://21st.dev/@easemize/components/spotlight-card` — it is the **same** EaseMize UI
`GlowCard` the client pasted in round 16. The component was never wrong; the brand-tuning applied to
it was. Rolled that back.

### Restored to the published defaults
| | round 16 | now |
| --- | --- | --- |
| Hue base / spread | 20 / 18 (terracotta) | **220 / 200** (blue) |
| Saturation | 70 | **100** |
| Lightness | 58 | **70** card wash, **50** lit border |
| Radius | 18 | **14** |
| Border | 2px | **3px** |
| Spotlight size | 300 | **200** |
| Backdrop | `rgba(255,255,255,0.04)` | **`hsl(0 0% 60% / 0.12)`** |
| Card size | stretch to grid | **16rem wide, `aspect-ratio: 3/4`** |
| Also restored | — | `box-shadow: 0 1rem 2rem -1rem #000`, `backdrop-filter: blur(5px)`, `grid-template-rows: 1fr auto`, `gap: 1rem`, `padding: 1rem` |

The original leaves `--lightness` unset and leans on a different fallback per gradient — 70 in the
card wash, 50 in the border — so that is now two separate properties rather than one.

Bloom border width and blur again scale off the border size, matching the original's
`calc(var(--border-size) * 20)` and `blur(calc(var(--border-size) * 10))`.

### Section background removed
`section--slab section--invert` dropped from Benefits — the section is back on the page with no fill
and no slab radius. The card's own 12% grey backdrop is what separates it from the page now.

Layout follows the reference demo: a centred flex row with its 2.5rem gap, cards at a fixed 16rem so
the 3/4 portrait shape holds, wrapping rather than squeezing. `aspect-ratio` yields to content, so a
card whose copy runs long grows instead of clipping — at the current copy none of them do.

The two things kept from the port, because they are strictly better and change nothing visually: one
shared reference-counted `pointermove` listener instead of one per card, and the pseudo-element rules
living in the stylesheet instead of a `dangerouslySetInnerHTML` `<style>` tag per instance.

### Contrast fix
The card backdrop lifts the surface from `#FEFEFE` to an effective `#f2f2f2`, where
`--color-text-muted` on the index label measured **3.94:1** — below AA for 12px. Moved to
`--color-text-secondary`: **7.44:1**.

### Verification (round 17)
1440x900, no console errors, build passes (**123.34 kB gzip**):
- Section class list is `section benefits`, background `rgba(0,0,0,0)`, border radius `0px` — no fill.
- Card computed values match the reference exactly: backdrop `rgba(153,153,153,0.12)`, radius `14px`,
  border `3px`, shadow `rgb(0,0,0) 0px 16px 32px -16px`, `backdrop-filter: blur(5px)`, rows
  `268.133px 19.1953px` (`1fr auto`), gap and padding `16px`, `--spot-base: 220`,
  `--spot-spread: 200`, `--spot-size: 200`, `::before` `filter: brightness(2)`,
  `mask-composite: intersect`.
- All four cards 256x341 — exactly 3:4, so no card is growing past the published shape.
- A synthetic `pointermove` at (1000, 500) set `--spot-x/y/xp` to `1000.0 / 500.0 / 0.694`.
- Contrast on the effective `#f2f2f2` card: title 16.39:1, body 7.44:1, link 5.01:1, index 7.44:1.
- `scrollWidth - innerWidth = -15`. 390x844: cards wrap to one per row at 256px, no overflow.

**Note for the client:** the published component is built for a dark page — its glow is additive
light and the demo runs it on near-black. On `#FEFEFE` with no section fill, the blue edge glow and
white core will be **much fainter** than the reference screenshots, and the black drop shadow will
read as an ordinary card shadow. That is the direct consequence of "no background colour on the
section"; the effect is intact, just quiet.

**Not verified:** the glow following a real pointer — no compositing below the fold and no
`requestAnimationFrame` in this pane.

## Round 18 — matched to the client's reference recording, 4 cards in one line

Client sent a screen recording of the reference in action (`spotlight-card.mp4`, 2838x1404, 60fps,
14s). Sampled at 2fps and read frames 4, 12 and 22.

### What the recording shows
- **One shared viewport-space light source.** Frame 4 has the pointer between cards 1 and 2 and lights
  card 1's right edge *and* card 2's left edge simultaneously. That is the `background-attachment:
  fixed` behaviour already implemented — cards do not light themselves independently.
- **Hue is magenta at mid-screen**, not blue. That confirms the stock `blue` preset rather than
  `purple`: base 220 with a 200 sweep gives `220 + 0.42 * 200 = 304`, which is magenta. Our
  `--spot-base: 220 / --spot-spread: 200` already matches.
- Faint hairline border, a subtle radial wash inside the card, and a soft bloom spilling outside the
  lit edge — all present.
- **The demo page is near-black.**

The mechanics were already right. The only thing separating our render from the recording was the
surface, which is also exactly what the client had asked to leave alone.

### Dark cards, uncoloured section
Resolved literally: the section keeps **no fill** (`rgba(0,0,0,0)`, no slab, no radius), and the dark
surface moved onto the card itself — `--spot-backdrop: #141414` with an
`rgba(255,255,255,0.08)` hairline. The card also rescopes `--color-text-primary/secondary/accent` for
its own subtree, the same token-scope pattern `.section--brand` and `.section--invert` use, so the
copy inverts with the surface without touching the section.

`SpotlightCard.css` gained `--spot-hairline`, defaulting to `var(--spot-backdrop)` so the stock
behaviour is unchanged — the original folds the border colour into `--backdrop`, and splitting them is
what lets a consumer darken the fill without losing the hairline.

### Four in one line
The reference layout used fixed 16rem cards in a wrapping flex row, which broke to 2+2 as soon as the
window narrowed. Replaced with `grid-template-columns: repeat(4, minmax(0, 1fr))` and a 2.5rem gap;
the cards fill their track and `aspect-ratio: 3 / 4` holds the shape. Two up under 1000px, one under
560px.

### Defect: cards were wider than their tracks
At 1100px the grid computed `213.75px` tracks but the cards rendered **235px** and spilled into the
container's gutters. Cause: the card is a flex item inside its `li`, and flex items default to
`min-width: auto`, which refuses to shrink below the content's min-content width. `min-width: 0` on
the card fixed it — cards now measure exactly their track.

### Checked and dismissed
`scrollHeight - clientHeight` reported 10px on every card, which looked like clipped copy. It is not:
the `.spotlight__bloom` sits at `inset: -10px` and its bottom overhang lands 7px past the card, with
~3px of sub-pixel rounding on top. With the bloom hidden the overflow drops to 3px, and the link's
bottom sits 19px *inside* the card while the body text ends 121px inside. Nothing is clipped.

### Verification (round 18)
No console errors, build passes (**123.33 kB gzip**):
- 1440x900: section background `rgba(0,0,0,0)` — still no fill. Card `rgb(20,20,20)`, hairline
  `rgba(255,255,255,0.08)`, radius `14px`, border `3px`, `--spot-base: 220`, `--spot-spread: 200`.
- Grid `254px x4`, all four cards `254x339` (exactly 3:4), all four tops identical — **one line** —
  and every card inside the grid box.
- 1100x850: tracks `213.75px`, cards `214x314`, still one line, still within the grid.
- Contrast on the `#141414` card: title 18.42:1, body 10.85:1, index 10.85:1, link 7.08:1 — all AA.
- 390x844: one column, card `350x467`, no overflow.

**Not verified:** the glow following a real pointer. The custom properties update from a synthetic
event, but this pane runs no `requestAnimationFrame` and composites nothing below the fold.

## Round 19 — Benefits reverted to the original plain row

Client asked to revert "Why the dabba always arrives". This project is not a git repo, so the target
was ambiguous between the round 15 lid-tag design and the round 4 original; the client chose the
**original plain row**.

Rebuilt from the round 4 spec: four columns, 1px hairline top rule per item, accent-filtered icon,
title, one line of copy, and a "Learn more →" pinned to the bottom so the links align across items of
unequal length. Hover lifts the icon 4px and turns the top rule terracotta. Boxless, on the page
background, `.section-title` heading. Two columns under 900px, one under 560px.

Everything from rounds 15–18 is gone: no kicker, no lid tags, no route line, no ghost numerals, no
spotlight cards, no slab, no section fill.

`SpotlightCard.jsx` and `SpotlightCard.css` deleted — nothing else imported them (grepped `src/` for
`SpotlightCard` and `spotlight`, no hits outside those two files). The one-shared-listener and
stylesheet-instead-of-injected-`<style>` improvements went with them; they are recoverable from this
log and the published component if the card is ever wanted again.

Bundle **123.33 → 123.06 kB gzip**, CSS **36.49 → 31.75 kB**.

### Verification (round 19)
Fresh tab, no console errors, build passes:
- Section class list `section benefits`, background `rgba(0,0,0,0)`, radius `0px`.
- Heading is `.section-title` at 72px, text "Why the dabba always arrives".
- 4 items on a `260px x4` grid, each with a `1px rgba(23,20,15,0.14)` top rule, icons back on the
  accent recolour filter.
- Element counts for every removed piece are **0**: `.benefits__tag`, `.benefits__route`,
  `.benefits__ghost`, `.spotlight`, `.benefits__kicker`.
- Contrast on the page: title 18.21:1, body 7.86:1, link 5.56:1 — all AA.
- `scrollWidth - innerWidth = -15`. 390x844: one column, heading 40px, no overflow.

## Round 20 — new section built on the supplied GlowCard

Client supplied the `GlowCard` source again and asked for a **new section** built with it, content to
follow. Benefits stays reverted (round 19); this is a separate section.

### Files
- `SpotlightCard.jsx` / `.css` — the component, ported to this project's conventions (JSX not
  TypeScript, plain CSS custom properties not Tailwind).
- `Spotlight.jsx` / `.css` — the section, mounted between AppPromo and Contact at `#spotlight`.

### Props implemented, matching the supplied interface
`children`, `className`, `glowColor` (`blue` | `purple` | `green` | `red` | `orange`),
`size` (`sm` | `md` | `lg`), `width`, `height`, `customSize`. The hue base/spread map is copied
verbatim. The Tailwind size classes became explicit boxes — `sm` 12x16rem, `md` 16x20rem,
`lg` 20x24rem — and an explicit `width`/`height` still overrides the preset, as in the source.

### Two deliberate departures from the source, neither visible
1. **One shared pointer listener.** The source attaches `pointermove` per instance and writes four
   custom properties per card per event — sixteen style writes a frame at four cards. Now a single
   reference-counted listener writes three properties onto the document root and the cards inherit
   them. (`--yp` was written but never read by the CSS, so it is dropped.)
2. **No injected style tags.** The source ships its `::before`/`::after` rules through
   `dangerouslySetInnerHTML`, once per instance. Those rules live in the stylesheet.

One upstream quirk was reproduced rather than fixed: the box is `rounded-2xl` (16px) while
`--radius: 14` drives the lit ring, so the glow ring is 2px tighter than the card corner.

### Dark cards, uncoloured section
Same resolution as round 18. The component is built for a dark page — its glow is additive light and
has nothing to work with on `#FEFEFE`. The section carries **no fill**; the dark surface is on the
card (`--spot-backdrop: #141414`, `rgba(255,255,255,0.08)` hairline), and the card rescopes
`--color-text-primary/secondary/accent` for its own subtree using the same token-scope pattern as
`.section--brand` and `.section--invert`.

### Placeholder content
Every string in the section is a stand-in — "Section heading goes here", "Card one title",
"Placeholder copy…". **No Dabbawala facts were invented to fill it.** When the real content arrives it
should move into `src/data/content.js` alongside the other sections; the component reads a local
`CARDS` array only because the copy is temporary.

### Verification (round 20)
Fresh tab, no console errors, build passes (**123.76 kB gzip**, CSS 37.31 kB):
- Section background `rgba(0,0,0,0)` — no fill.
- 4 cards, 4 blooms, **0 injected `<style data-glow>` tags**.
- Component values match the source: `--spot-base: 220`, `--spot-spread: 200`, card
  `rgb(20,20,20)`, hairline `rgba(255,255,255,0.08)`, radius `16px`, border `3px`, rows
  `265.469px 19.1953px` (`1fr auto`), gap and padding `16px`, shadow
  `rgb(0,0,0) 0px 16px 32px -16px`, `backdrop-filter: blur(5px)`,
  `background-attachment: fixed`, `isolation: isolate`, `::before` `filter: brightness(2)`,
  `mask-composite: intersect`.
- Hue resolves to `calc(220 + (0.764 * 200))` after one synthetic `pointermove` at (1100, 600), which
  also set `--spot-x/y/xp` to `1100.00 / 600.00 / 0.764` — the shared listener drives all four cards.
- Grid `254px x4`, cards `254x339` (exactly 3:4), all tops equal — one line — all inside the grid box.
- Contrast on the `#141414` card: title 18.42:1, body 10.85:1, index 10.85:1, link 7.08:1 — all AA.
- 390x844: one column, card `350x467`, no overflow. `scrollWidth - innerWidth = -15` at 1440.

**Not verified:**
- The glow following a real pointer — no `requestAnimationFrame` and no compositing below the fold in
  this pane.
- The `size` preset branch and the non-`blue` `glowColor` presets. The section passes `customSize` and
  `glowColor="blue"`, so those code paths are implemented but not exercised on the page.

## Round 21 — spotlight section removed

`Spotlight.jsx` and `Spotlight.css` deleted, and the import plus `<Spotlight />` taken out of
`App.jsx`. The placeholder copy went with them; nothing was in `content.js` to clean up.

Bundle back to **123.06 kB gzip**, CSS **37.31 → 31.75 kB** — identical to round 19, so the section
left nothing behind.

`SpotlightCard.jsx` / `SpotlightCard.css` were **kept**, unused. The client has now supplied that same
source twice and it was deleted once already in round 19 and rebuilt in round 20; keeping it avoids a
third round trip. Nothing imports it, so it costs no bundle weight — Vite tree-shakes it out, which
the unchanged bundle size confirms. Flagged to the client for a decision.

### Verification (round 21)
Fresh tab, no console errors, build passes:
- Element counts all **0**: `.spotlight-section`, `.spotlight`, `.spotlight__bloom`, `#spotlight`.
- `main` children read hero, video-scroll, benefits, about, stack, framework, marquee, recognition,
  gallery, promo, contact — the section is gone and the order is otherwise untouched.
- The shared pointer listener is gone with it: `--spot-x/y/xp` on the document root are all `unset`,
  so nothing is still writing to them.
- `scrollWidth - innerWidth = -15`.

## Round 22 — SpotlightCard deleted

`SpotlightCard.jsx` and `SpotlightCard.css` removed. The spotlight work is now fully out of the
codebase; the component's source remains recorded in rounds 16–20 of this log if it is ever wanted
again.

### Verification (round 22)
Fresh tab, no console errors, build passes:
- `grep -rn "SpotlightCard|spotlight|GlowCard|--spot-" src/` returns **no matches** — not a component,
  not a class name, not a custom property.
- No files matching `spot` or `glow` remain in `src/components/`.
- DOM: 0 nodes matching `[class*=spotlight]` or `#spotlight`; `--spot-x/y/xp` on the document root are
  `unset`.
- `main` children unchanged: hero, video-scroll, benefits, about, stack, framework, marquee,
  recognition, gallery, promo, contact.
- Bundle **123.06 kB gzip** / CSS **31.75 kB** — byte-identical to rounds 19 and 21, confirming the
  unused files were already being tree-shaken and nothing else shifted.

## Round 23 — GlowCard section, built from the supplied files

Client supplied `GlowCard.tsx` and `App.tsx` and asked for a section built on them, content to follow.

### One meaningful difference from the earlier paste
This version adds `"border-radius": "calc(var(--radius) * 1px)"` to the inline styles, which
overrides the component's own `rounded-2xl` class. The box and the lit ring now share one 14px radius,
so the 2px mismatch noted in round 20 is fixed upstream. Reproduced as such.

### The demo runs on a light page
`App.tsx` renders four cards on a container with **no background** and sets `color: "black"` inside
each. So the author's own demo is light-surfaced, and the 12% grey backdrop over white is what
separates the card from the page. No dark surface was introduced this time — the section sits on the
page background exactly as the demo does.

### Files
- `GlowCard.jsx` / `.css` — the component.
- `GlowSection.jsx` / `.css` — the section, mounted between AppPromo and Contact at `#glow`.

Layout follows `App.tsx`: four cards in a centred row with its 20px gap, at the `md` preset. Wrapping
is the one addition, so the fixed 16rem cards fall to a second row instead of overflowing a narrow
window.

### Props implemented, matching the interface
`children`, `className`, `glowColor` (`blue` | `purple` | `green` | `red` | `orange`),
`size` (`sm` | `md` | `lg`), `width`, `height`, `customSize`. Hue map copied verbatim; the Tailwind
size classes became explicit boxes (`sm` 12x16rem, `md` 16x20rem, `lg` 20x24rem), and an explicit
`width`/`height` still overrides the preset.

### Two departures from the source, neither visible
1. **One shared pointer listener**, reference-counted, writing to the document root — the source
   attaches per instance and writes four properties per card per event (sixteen style writes a frame
   at four cards). `--glow-yp` is written for parity even though no CSS reads it.
2. **No injected style tags** — the source's `::before`/`::after` rules ship via
   `dangerouslySetInnerHTML` once per instance; they live in the stylesheet.

### Placeholder content
Every string is a stand-in — "Section heading goes here", "Card one title", "Placeholder copy…".
**No Dabbawala facts were invented.** When the real copy arrives it should move to
`src/data/content.js`; the local `CARDS` array exists only because the content is temporary.

### Verification (round 23)
Fresh tab, no console errors, build passes (**123.76 kB gzip**, CSS 36.58 kB):
- Section background `rgba(0,0,0,0)` — no fill added.
- 4 cards, 4 blooms, **0 injected `<style data-glow>` tags**.
- Computed values match the source exactly: card `rgba(153,153,153,0.12)`, border `3px` in the same
  colour, **radius `14px`**, rows `246.805px 19.1953px` (`1fr auto`), gap and padding `16px`, shadow
  `rgb(0,0,0) 0px 16px 32px -16px`, `backdrop-filter: blur(5px)`,
  `background-attachment: fixed`, `isolation: isolate`, `::before` `filter: brightness(2)`,
  `mask-composite: intersect`, `--glow-base: 220`, `--glow-spread: 200`.
- Cards measure **256x320** — exactly the `md` preset's `w-64 h-80`.
- One synthetic `pointermove` at (960, 450) set all four root properties —
  `960.00 / 450.00 / 0.67 / 0.50` — and the hue resolved to `calc(220 + (0.67 * 200))`. The shared
  listener drives all four cards.
- Row gap `20px`, all four tops equal — one line at 1440.
- Contrast on the effective `#f2f2f2` card: title 16.39:1, body 7.44:1, link 5.01:1 — all AA.
- 390x844: cards stack to four rows at 256px each, no overflow. `scrollWidth - innerWidth = -15` at
  1440.

**Not verified:**
- The glow following a real pointer — no `requestAnimationFrame` and no compositing below the fold in
  this pane.
- The `sm`/`lg` presets, the `customSize` branch and the non-`blue` `glowColor` presets — the section
  uses the defaults, so those paths are implemented but not exercised on the page.

## Round 24 — glow gated on hover

Client: the cards should glow only while the cursor is on them, and only the stretch of border near
the cursor should light. Previously the cursor could be well outside the section and the cards still
glowed.

### Cause
The source's light source is viewport-wide and every gradient uses
`background-attachment: fixed`. A radial gradient centred on the pointer therefore still overlapped a
card's border ring from a couple of hundred pixels away, so cards lit up with the cursor nowhere near
them. Nothing was wrong with the code — that is what the source does.

### Fix
The card now tracks its own hover state and every lit layer is off by default:
- `::before` (coloured edge), `::after` (white core) and `.glow-card__bloom` sit at `opacity: 0` and
  fade in only under `.is-lit`.
- The interior wash is gated the same way, through `--glow-fill-opacity`. Custom properties are not
  animatable unless registered, so an `@property --glow-fill-opacity { syntax: '<number>' }` rule was
  added — otherwise the wash would snap while the border faded.
- 180ms linear fade in both directions, via a single `--glow-fade`.
- `onPointerEnter` / `onPointerLeave` rather than over/out, so the state does not thrash as the
  pointer crosses the card's own children.

The lit arc itself is unchanged: it is still the gradient's own falloff at `--glow-size: 200`, centred
on the cursor. No extra masking was needed for "only that much space".

### Also fixed: touch scroll was trapped
The source sets `touch-action: none` on the card so pointer gestures are not stolen by the browser.
On a touch device that also blocks panning — with four stacked 320px cards the page scroll would have
been trapped inside them, and there is no hover to serve there anyway. Restored to `auto` under
`@media (hover: none)`.

### Verification (round 24)
Fresh tab, no console errors, build passes (**123.80 kB gzip**):
- `@property --glow-fill-opacity` is registered (found as a `CSSPropertyRule` in the sheet).
- At rest, all four cards read `::before 0`, `::after 0`, bloom `0`, `--glow-fill-opacity 0` — **no
  card glows with the pointer away**, which was the complaint.
- Hovering card 2: **only** card 2 lights — `::before 1`, `::after 1`, bloom `1`, fill `0.1`; the other
  three stay at 0.
- Moving the pointer to card 4: card 2 returns to 0 and card 4 lights. Only ever one at a time.
- Pointer away again: all four back to 0.
- `--glow-fade: 180ms`, `--glow-size: 200` unchanged. `scrollWidth - innerWidth = -15`.

Note on method: transitions cannot advance in this pane because `requestAnimationFrame` never fires,
so a hovered card reads `opacity: 0` — the frozen start value. The target values above were read with
`transition: none` injected. The class toggling itself was verified live, and React synthesises
enter/leave from `pointerover`/`pointerout`, so those are the events the test dispatches.

**Not verified:** the fade actually animating, and the `@media (hover: none)` branch —
`matchMedia('(hover: none)')` is false in this pane, so `touch-action` still computes to `none` here.
Both need a real browser, the second a real touch device.

## Round 25 — real bug found: the glow architecture was rebuilt around local coordinates

Client, after round 24's hover-gating: "abh bhi sahi nahi hai." Round 24 fixed *when* the glow showed
(gated to hover), but something underneath was still broken. Screenshots in this pane are normally
unreliable (per [[feedback-browser-pane-verification]]), but a JS-triggered background-color change
rendered instantly in a screenshot moments earlier in this same session — proving compositing itself
was fine here — so a screenshot showing literally nothing while computed styles reported
`opacity: 1` and a real, non-transparent gradient color was not a pane artifact. It was investigated
as a real bug.

### Root cause, isolated by testing one CSS property at a time on a live card
1. Solid `background: green` (no gradient, no attachment) → rendered. Compositing confirmed fine.
2. `radial-gradient(... at 50% 50% ...)` with `background-attachment: scroll` → rendered (in the
   wrong place — percentages under `scroll` resolve against the element's own box, as expected).
3. `radial-gradient(... at 50% 50% ...)` with `background-attachment: fixed` → rendered, but in a
   *different card* — because for `fixed` attachment, position percentages resolve against the
   **viewport**, not the element. This is correct, spec'd behaviour, and is exactly the "one shared
   light source" mechanic the source component relies on.
4. `radial-gradient(... at <exact viewport px>, <exact viewport px> ...)` with
   `background-attachment: fixed` — matching the source's own `at calc(var(--x,0)*1px)
   calc(var(--y,0)*1px)` pattern exactly — **rendered nothing at all**, anywhere on the page.

So the supplied component's own positioning strategy — `background-attachment: fixed` with a
calc()'d pixel position — silently fails to paint. Percentage positions under `fixed` work; pixel
positions under `fixed` do not, at least in this rendering pipeline. Chasing that further wasn't
worth it, because the architecture it was covering for was already the wrong one for what the client
asked: a page-wide fixed spotlight (one light source, shared viewport position, cards just showing
whatever slice overlaps them) can only ever approximate "glow only where the cursor is on *this*
card" — round 24 could gate it on/off per card, but the position itself was never local to begin
with.

### Rebuilt on local coordinates
`GlowCard.jsx` no longer has a document-level `pointermove` listener or shared module state. Each
card now tracks the pointer itself:
- `onPointerEnter` / `onPointerMove` compute the pointer's offset from the card's own
  `getBoundingClientRect()` and store it in component state as `{ x, y, xp }` (`xp` normalised across
  the card's own width, replacing the source's viewport-wide `xp` for the hue sweep).
- These are written as inline `--glow-x` / `--glow-y` (already-suffixed `px` strings) /
  `--glow-xp` on the card's own element — not the document root.
- `GlowCard.css`: every `background-attachment: fixed` removed (falls back to the default `scroll`),
  and `--glow-centre` simplified to `var(--glow-x, 50%) var(--glow-y, 50%)` directly, since the
  values already carry units.

This is a smaller, more conventional implementation of this exact pattern (per-card local tracking is
the standard approach for a "spotlight card"), it sidesteps the fixed+pixel paint failure entirely,
and it satisfies both parts of the brief precisely: the glow cannot exist while the pointer is outside
a card (still gated via `.is-lit`, from round 24), and it is now positioned exactly at the pointer's
own location *within* that card rather than a slice of a page-wide beam.

### Verification (round 25)
Fresh reload, scrolled to the section, no console errors, build passes (**123.73 kB gzip**):
- Entering card 2 at its own top-left corner set `--glow-x: 20px; --glow-y: 15px` on card 2 only;
  moving to its bottom-right corner (same hover session) updated to `236px / 305px` (card is
  256x320) — position tracks the cursor precisely within the card's own box, not the viewport.
- A forced `is-lit` + explicit `--glow-x/y` near a card's bottom-left produced a visible, correctly
  localised glow in a screenshot, confined to that one card — the fixed+pixel failure from round 24
  does not reproduce with this architecture.
- Hue sweeps with local position: `xp` read `0.039` near a card's left edge and `0.961` near its
  right edge (of that same card), with `--glow-hue` resolving accordingly — confirms the hue walk
  still works, now driven by position within the card rather than the viewport.
- After `pointerout`, all four cards report `is-lit: false` — still correctly gated.
- No leftover global state: `--glow-x/y/xp` on the document root are all `unset`, confirming the old
  shared-listener/module-level architecture is gone.
- `scrollWidth - innerWidth = -15` at 1440. No console errors.

**Not verified:** the fade transition animating in a real browser, and the `@media (hover: none)`
branch on an actual touch device — `matchMedia('(hover: none)')` is false in this pane regardless of
viewport width, so `touch-action` still computes to `none` here; that's a pane limitation, not a
regression, and was already noted as unverifiable in round 24.

## Round 26 — GlowSection filled with the Benefits content

Client's call on round 19's revert-scope question: keep the plain-row Benefits section **and** give
the new glow section the same content, rather than retiring one. Both now show the same four facts —
intentional duplication, by the client's own choice, not an oversight.

`GlowSection.jsx` now imports `benefits` from `content.js` (same array Benefits.jsx reads) instead of
the placeholder `CARDS` array. Heading changed to "Why the dabba always arrives" — matching
`Benefits` exactly, since that was the content asked for. Dropped the placeholder eyebrow and lead
paragraph to mirror `Benefits`' own structure (heading + grid, nothing else). Each card gained an icon
(`glow-section__icon`, 44px, `--icon-accent-filter` recolour — the same treatment used everywhere else
on the light page) and the link now points at the item's real `href` rather than a hardcoded `#contact`.

### Verification (round 26)
Fresh reload, no console errors, build passes (**123.57 kB gzip**):
- Heading and all four titles/texts/hrefs/icon paths in `GlowSection` read back identical to
  `Benefits` — same array, same content, confirmed side by side.
- Icon renders at 44x44 with the accent-recolour filter applied.
- Contrast on the card's effective `#f2f2f2` surface: title 16.39:1, body 7.44:1, link 5.01:1 — all
  AA, unchanged from round 23 since only the copy and icon changed, not the surface.
- `scrollWidth - innerWidth = -15`, 4 cards present.

**Not verified:** visual rendering of the icon alongside the real copy — this pane's screenshots are
unreliable for anything requiring live paint below the fold (per
[[feedback-browser-pane-verification]]); geometry and contrast were confirmed via computed styles
instead.

## Round 28 — scroll-driven video expansion

Client asked whether the video section could do a "scroll video expansion" — confirmed feasible
(2-3 sentence exploratory answer, per the Apple-style pattern: video starts as an inset, rounded
card and grows to full-bleed on scroll), got a go-ahead, then built it.

### Two-phase pin
The existing single `ScrollTrigger` (pin + `onUpdate: render(progress)`) now splits its progress
domain into two phases via `EXPAND_END = 0.28`:
- **`expandT`** (`progress / EXPAND_END`, clamped 0–1): drives the frame from an inset rounded card
  to full-bleed. Playback stays on frame 0 for the whole phase.
- **`playT`** (`(progress − EXPAND_END) / (1 − EXPAND_END)`, clamped 0–1): the *old* `progress`
  variable, renamed and remapped — everything that used to read `progress` directly (the frame-index
  lookup, the caption crossfade math) now reads `playT`, so playback and captions only run during the
  back 72% of the pin.

Pin distance increased `+=250%` → `+=350%`, so the expand phase (≈28% of 350% ≈ 98%, roughly one
viewport-height of scrolling) gets its own room instead of being carved out of the scrub time the 120
frames had before — 72% of 350% ≈ 252%, close to the original 250%.

### New `.video-scroll__frame` wrapper
Canvas and overlay both moved inside a new `.video-scroll__frame` div (previously direct children of
`.video-scroll__stage`), so they're clipped identically and can never mismatch. The frame owns three
custom properties — `--v-inset-x` (6%→0%), `--v-inset-y` (10%→0%), `--v-radius` (32px→0px) — written
directly via `frame.style.setProperty(...)` on every `render()` call, plain values with no CSS
`transition`: a scroll-linked value that eased on its own would lag behind the scrollbar. A
`box-shadow` sells the "floating card" read while inset.

The overlay (eyebrow/title/captions) now starts at `opacity: 0` and fades in as `expandT` goes 0→1 —
a small inset card is too cramped for full-bleed type sizing, so text only appears once the frame
finishes expanding. `reducedMotion()` skips straight to the resting state (inset vars at their end
values, overlay opacity 1) rather than leaving a user who has that preference stuck looking at a
static inset card forever.

Existing machinery needed no changes to cooperate: the canvas's own `ResizeObserver` already fires
whenever its rendered box changes size, and the frame's inset animating is exactly that — so the
canvas re-fits and repaints frame 0 at each new size through the expand phase for free.

### Verification (round 28)
This pane's dead `requestAnimationFrame` normally blocks any GSAP/ScrollTrigger check, but
**ScrollTrigger also binds a native `window` `scroll` listener independent of the ticker**, so a
plain `window.scrollTo(0, y)` still fires real `onUpdate` callbacks synchronously — this let the
whole effect be verified against real scroll positions, not just resting computed styles:
- At `scrollY = 0` (progress 0): `--v-inset-x: 6%`, `--v-inset-y: 10%`, `--v-radius: 32px`, overlay
  `opacity: 0` — the starting inset card.
- Mid-expand (progress 0.14, `expandT = 0.5`): `3% / 5% / 16px`, overlay `0.5` — exact lerp midpoints.
- Just past `EXPAND_END` through mid-playback to near the pin's end: `0% / 0% / 0px`, overlay `1`,
  holds full-bleed for the rest of the pin as designed.
- Canvas centre-pixel colour sampled at four points through the playback phase —
  `(85,82,74) → (171,174,166) → (118,115,106) → (71,86,78)` — four different colours, confirming
  distinct frames are actually painted as `playT` sweeps, not stuck on frame 0.
- Captions crossfade correctly against `playT`: caption 1 ramping in at playback start, caption 2 at
  exactly 0 right at its slice's local boundary (`local = 1` lands the fade-out at exactly 0, matching
  the existing three-part ramp math), caption 4 fading in at the very end of the pin.
- 390px wide: same starting inset values, no horizontal overflow. 1440px: no console errors,
  `scrollWidth - innerWidth = -15`, build passes (**125.42 kB gzip**).

**Not independently verified:** the `reducedMotion()` branch's live behaviour — this environment has
no control to force `prefers-reduced-motion: reduce` to match, so that path was checked by reading the
code, not by exercising it.

## Round 29 — About section: real thali cutouts, moving threads, popping floats

Client sent a screenshot of the About/"Welcome To Dabbawala" section and four AI-generated thali
photos, asking to replace the existing floating stills with these, make the connecting thread lines
move on scroll, make the images "pop" in, and strip any background the new images carry.

### The four source images
Three (`03_39_06`, `03_38_52`, `03_38_38`) sit on a clean, uniform near-white backdrop — trivial to
key out. The fourth (`03_38_21`) sits on a dark **radial-vignette studio background** (near-black
corners fading to a light warm centre) — not a flat colour, so the round-13-style
"spread ≤ N, value ≥ M" flood fill doesn't apply; no single global threshold separates near-black
corners from light-cream centre.

### Technique: gradient-following flood fill
Built a border-seeded flood fill where a neighbour joins the background set if it's within a small
tolerance **of the pixel that discovered it** (not a fixed reference colour) — this walks a smooth
gradient of any brightness without needing one global rule, and halts wherever there's a sharp jump
(a real edge). At `TOL=26` it cleanly removed the entire vignette and the plate's cast shadow, but
also eaten a large chunk of the palest food item — a light beige **papad**, tonally close enough to
the background's lit halo that the fill walked straight through it, leaving only its darker charred
speckles surviving as an island. This is the known failure mode of pure local-similarity mattes
against a light object on a light ground; no tolerance value fixes it without also leaving background
fringe elsewhere.

**Patched by hand**: fit an ellipse to the surviving speckle cluster (found by compositing the masked
result onto solid magenta — see below — and cropping to read the cluster's extent) and forced full
opacity inside it. Restores the papad cleanly at the size this asset actually renders at (a floating
thumbnail, not a hero image); a faint warm tint survives at the ellipse's rim, invisible at that
scale.

### A verification method worth keeping: composite onto magenta
`Read`-ing a freshly-masked PNG rendered it as if fully opaque — the checkerboard round 13/14 showed
for a *different* transparent PNG did not reproduce here, even after confirming byte-for-byte via a
full decode round-trip (`ffprobe` reports `rgba`; sampled alpha was `0` at every corner and `255` at
plate centre both before and after PNG encoding). **This tool's inline image preview does not appear
to reliably render alpha transparency** — trusting it visually would have wrongly read a correctly
masked file as broken. Fix: `ffmpeg -f lavfi -i color=c=magenta ... -filter_complex overlay` the
masked PNG onto solid magenta before viewing — alpha=0 then shows as magenta and alpha=255 shows the
real pixel, which *is* faithfully rendered, and is how the papad defect was actually found and then
confirmed fixed. Recorded to memory for future asset work.

### Layout: 6 floats → 4, cards → cutouts
`About.css`'s existing responsive rule already hid the two "middle" floats (`--b`, `--e`) below
1100px, leaving exactly the four corner positions (`--a` top-left, `--c` bottom-left, `--d` top-right,
`--f` bottom-right) — a natural fit for four images, so `--b`/`--e` were dropped outright rather than
kept unused. `Hero.jsx` still uses `float1–5.webp` for its own mosaic — confirmed via grep before
touching anything — so those files were left in place; only `About.jsx`'s array changed, to four new
`thali*.webp` files.

The floats stopped being photo cards: `object-fit: cover` + `border-radius` + `box-shadow` (a
rectangular crop with a rectangular shadow) became `object-fit: contain` + no radius +
`filter: drop-shadow(...)` — a box-shadow on a transparent PNG draws a visible square behind a round
plate; `drop-shadow` hugs the actual cutout silhouette instead.

### "Line move on scroll"
The two thread `<path>` elements got `data-parallax="3"` / `data-parallax="4"` — small values,
picked so a path's much taller bounding box (~850px) still only drifts a comparable ~20–30px to the
floats' own parallax range, rather than reusing the floats' larger numbers and producing a
wildly bigger swing. This runs through the *existing* generic `[data-parallax]` handler in
`useScrollFx.js` (already applied to `<img>` elements all over the site) — SVG `<path>` accepts the
same CSS-transform-based `yPercent` tween without needing any new code. Independent speeds from the
floats are deliberate: a taut string wouldn't move in lockstep with whatever's tied to it.

### "Image pop"
A bespoke entrance — `gsap.from(el, { scale: 0.3, opacity: 0, ease: 'back.out(1.8)', ... })` per
float, staggered `i * 0.08s`, triggered once at `top 92%` — added in a new `useLayoutEffect` local to
`About.jsx` rather than folded into the shared `useSectionFx` hook, matching how other one-off motifs
(VideoScroll's expand, Gallery's carousel) already live in their own component rather than the
generic reveal system. Deliberately animates only `scale`/`opacity`, never `rotate` — each float's
tilt is a static CSS `rotate: Xdeg`, and fighting that from GSAP would risk it snapping to 0 instead
of landing at its intended angle. Reduced motion skips the effect entirely (checked before the
`gsap.context` runs at all, so floats simply render at rest with no popping and no scroll-parallax).

### Verification (round 29)
Fresh reload, no console errors, build passes (**125.48 kB gzip**):
- 4 floats resolve to the 4 new `thali*.webp` sources, `object-fit: contain`, `box-shadow: none`,
  `border-radius: 0px`, `filter: drop-shadow(...)` present.
- **Pop-in verified against real scroll positions** (native-scroll-listener technique, bypassing this
  pane's dead `requestAnimationFrame` the same way round 28's video-expansion check did): at
  `scrollY=0` all four floats sit at `scale≈0.3, opacity:0`; scrolling toward the section shows a
  clear, staggered progression — the first float already past `opacity:0.9` while the last is still
  at `0` — and by mid-section all four settle at `opacity:1, scale≈1.0–1.07` (the `back.out` overshoot
  visible and then relaxing). This is genuine, not a resting-state guess.
- 390px: 4 floats at 84px wide, scene `opacity: 0.45` (the existing text-clearing rule), no overflow.

**Not verified — and this is a real gap, not a formality**: the scroll-scrubbed drift on both the
floats and the new thread-line movement. Repeated `window.scrollTo` sampling across and beyond the
section's full range returned an **identical, frozen transform** at every point, for both the images'
existing parallax and the paths' new one — unlike the pop-in tween (which clearly did progress) and
unlike round 28's `onUpdate`-callback-driven video expansion (which also clearly did progress).
Best available explanation: GSAP's `scrub: true` mechanism renders its interpolated value through the
shared `gsap.ticker`, while a hand-written `onUpdate` callback (VideoScroll's `render()`, this app's
pop-in playback) writes to the DOM directly — and this pane's rAF is either fully dead or so
throttled that only short, self-contained tweens ever visibly progress within a test's wait window,
never a continuous scrub tracking live scroll input. The `[data-parallax]` mechanism itself is
unchanged and already runs elsewhere on the site (Hero, Recognition, AppPromo, Gallery) without prior
complaint, so this is treated as the same known pane limitation recorded in
[[feedback-browser-pane-verification]], not a new defect — but it genuinely was not re-confirmed
working here, and should be watched for in a real browser rather than assumed correct.

## Round 30 — thalis pinned to the threads, threads draw on scroll (+ a major pre-existing bug found)

Client: the thalis sit *outside* the line — they want them centred *on* it; the line should be an SVG
that draws itself as you scroll (starting clean), and each thali should pop as the draw reaches it.

### Thalis pinned to the curve
Previously the floats were positioned with hand-written CSS percentages (`top: 12%; left: 3%`) that
had nothing to do with the path geometry — which is exactly why they sat off the line. Now
`About.jsx` reads the real curve: `getPointAtLength(totalLength * at)` per thali, converted to a box
percentage by dividing by the viewBox (`preserveAspectRatio="none"` makes that mapping linear), with
`translate: -50% -50%` centring the plate on the point. Each thali declares an `at` fraction along
its thread; the four alternate left/right down the page.

Threads got `vector-effect: non-scaling-stroke` — the stretched viewBox was squashing the stroke
unevenly.

### Draw-on-scroll
Each path's `stroke-dasharray` is set to its own length and `stroke-dashoffset` walked from that
length down to 0, written **directly from `onUpdate` progress** rather than through a scrubbed tween —
same reasoning as VideoScroll: one number per thread, no interpolation needed. Pops are discrete
events fired when progress crosses each thali's `at`, with a `back.out(1.8)` spring in and a quicker
`power2.in` retreat if the reader scrolls back up.

The round-29 `data-parallax` drift was **removed** from both the floats and the paths: precise
alignment to the curve and independent parallax drift are mutually exclusive — drifting either one
separates the thali from its thread. The draw is the movement now.

### Defect 1: GSAP owning `transform` broke the centring
First implementation animated `scale` via GSAP. Measured with the lazy images forced in, every thali
sat **62–74px below its thread**. Cause: GSAP folded the percentage `translate: -50% -50%` into a
fixed pixel matrix at the moment the lazy images still had **zero height**, so the vertical half-offset
was baked as 0. Fixed by giving CSS sole ownership of positioning: centring in `translate`, tilt in
`rotate`, and scale in `scale: var(--about-pop)` — GSAP now animates only that one registered custom
property plus `opacity`, and never touches `transform`. Intrinsic `width`/`height` attributes were
also added so the box has its real aspect ratio before the image arrives. Re-measured: offset `[0, 0]`
on all four, at both 1440px and 390px, **with images loaded**.

### Defect 2 (pre-existing, app-wide): every trigger below the video was 3150px too early
While debugging why the draw never advanced, `ScrollTrigger.getAll()` showed the About trigger's range
at `start: 2118` when the section's real document position was `6033` — off by exactly **3150px**,
which is precisely VideoScroll's pin distance (350% of a 900px viewport). Checking the rest of the
page found the same 3150px error on **every trigger below the video**: `.benefits__grid`,
`.about__paragraph`, `.framework__list`, `.recognition__grid`, `.glow-section__row`,
`.contact__form`. A hard `ScrollTrigger.refresh(true)` did not correct it.

Cause: VideoScroll's pin inserts ~3150px of spacer, shifting everything below it down. Its trigger is
created **late** — the effect is gated on the first frame image having loaded — so by default it
refreshes *after* the triggers further down the page, and they all measure their start positions
against a layout where the spacer does not yet exist. Consequence in the real browser: every reveal,
stagger and parallax below the video section fired before the reader ever reached it, so those sections
were already fully revealed on arrival. This is why several scroll-behaviour complaints this session
were real and not just pane artifacts.

Fixed with `refreshPriority: 1` on VideoScroll's ScrollTrigger, forcing the pin to establish its
spacing before anything below it measures. Verified: the measured delta between real document position
and trigger start went from **3150px to 0** on all six sampled triggers (contact form reads 27, which
is just its own `start: 'top 88%'` versus the 85% used in the check — not an error).

### Verification (round 30)
The pane's `requestAnimationFrame` was dead again (`0 frames`, `visibilityState: hidden`) — and in this
app that kills *all* scroll behaviour, because Lenis is what calls `ScrollTrigger.update` and Lenis
ticks off `gsap.ticker`. A fresh tab did not recover it. Rather than declare it unverifiable, a
temporary `window.__ST` / `window.__GSAP` hook was added to drive the system by hand, then **removed**
(grep-confirmed clean, and `typeof` both read `undefined` on the final reload):
- **Draw tracks progress exactly**: stepping scroll through the trigger range gave drawn percentages
  `0 → 18 → 30 → 45 → 70 → 86 → 100%` against progress `0 → 0.18 → 0.30 → 0.45 → 0.70 → 0.86 → 1.00`,
  on both threads.
- **Pops cascade in order**, verified by advancing `gsap.ticker` manually so the tweens could run:
  at progress 0.25 only thali 1 (`at: 0.2`) is lit; 0.35 adds thali 2 (`at: 0.32`); 0.78 adds thali 3
  (`at: 0.74`); 0.90 adds thali 4 (`at: 0.84`). Nothing lit at progress 0.
- **Reverse works**: scrolling back down through 1 → 0.5 → 0.1 → 0 un-draws the lines and returns the
  passed thalis to `0.3`.
- Clean start confirmed: `strokeDashoffset` equals each path's full length (918 / 954), i.e. nothing
  drawn until scroll begins.
- Centring `[0, 0]` on all four thalis with images loaded, at 1440x900 and 390x844. No console errors,
  no horizontal overflow, build passes (**125.88 kB gzip**).

**Not verified:** how the spring easing and draw *feel* in real time — the timings were stepped
manually, not watched. Worth a look in a real browser, particularly whether `EXPAND`-style pacing
(0.2/0.32/0.74/0.84) spaces the four pops comfortably across the section rather than clustering.

## Round 31 — Benefits removed, GlowSection promoted, Donation block removed

Client resolved the round-26 duplication: retire the plain-row `Benefits` section and move
`GlowSection` (the glow-card treatment of the same four facts) into its slot, straight after
VideoScroll. Then, mid-round, also asked to remove the Donation block.

### Benefits → GlowSection
`Benefits.jsx` / `Benefits.css` deleted and `<GlowSection />` moved from between AppPromo and Contact
up into the old Benefits position. The `benefits` array in `content.js` **stays** — it is the data
GlowSection reads, and its name still describes the content (four value props), not the deleted
component.

Three stale comments corrected rather than left to mislead: `GlowSection.jsx`'s header still described
keeping both sections; `Services.jsx` claimed the ink slab "separates it from Benefits above" when
Process is what's above it now; `Process.css` compared itself to a section that no longer exists.

### Donation block
Removed from `AppPromo.jsx` along with the `donation` export in `content.js` and the
`.promo__donate` / `.promo__donate-text` rules — nothing else referenced any of them.

The section's `id` was `donate`, which described the block that just left rather than the section
itself, so it became `id="app"`. Checked first that nothing linked to it: no `href="#donate"` anywhere
in the codebase, and neither `nav` nor `footerLinks` in `content.js` contained it, so the rename
breaks no anchor.

**Worth the client knowing:** the Roti Bank helpline has not left the page. `AnnouncementBar` at the
very top still carries "Donate surplus food — Mumbai Roti Bank helpline 86555 80001" as a `tel:` link.
If the intent was to drop the donation ask entirely, that strip needs removing too — flagged rather
than assumed either way.

### Verification (round 31)
Fresh tab, no console errors, build passes (**125.61 kB gzip**, CSS 35.24 kB — down from 36.84):
- Section order reads `hero#home, video-scroll, glow-section#glow, about#about, stack,
  framework#framework, marquee, recognition, gallery#gallery, promo#app, contact#contact` — GlowSection
  is now directly after the video, and appears exactly once.
- Element counts zero for everything removed: `.benefits`, `.benefits__grid`, `.benefits__item`,
  `.promo__donate`, `.promo__donate-text`, and `#donate`. `.promo` now carries `id="app"`.
- GlowSection intact in its new slot: 4 `.glow-card`s, heading "Why the dabba always arrives".
- **Trigger positions survived the layout shift**: removing two blocks moved every section below them,
  so this was re-checked rather than assumed. At `scrollY: 0` every below-the-fold reveal is still
  correctly hidden — `.about__paragraph` and `.contact__form` at `opacity: 0`, and the `[data-stagger]`
  groups (`.glow-section__row`, `.framework__list`, `.recognition__grid`, `.promo__cards--left`) all
  have their children at `opacity: 0`. The round-30 `refreshPriority` fix still holds.
  (Note: the stagger *containers* read `opacity: 1` — the tween animates their children, so measuring
  the container is the wrong probe.)
- About's threads still start clean (`0% drawn`) with all four thalis at `--about-pop: 0.3`.
- 390x844: same order, 4 glow cards, no `.benefits`/`.promo__donate`, no horizontal overflow.

## Round 32 — threads now start at the section's top corners

Client annotation on the About section: each animated line should begin at its own top corner — left
thread from the top-left, right thread from the top-right. They previously began inset from the edge
and ~40 units down, so the draw appeared to start from nowhere in particular.

### Change
Only the two path `d` strings moved. Each now starts exactly at its corner in viewBox space and sweeps
into the *same* curve it had before — the second control point and every later segment are untouched,
so the established shape and the thali placements along it are preserved as far as possible:

| thread | was | now |
| --- | --- | --- |
| left | `M120 40 C 260 180, …` | `M0 0 C 170 130, …` |
| right | `M1320 20 C 1180 200, …` | `M1440 0 C 1270 130, …` |

The right path's start is written as `M${VB_W} 0` rather than a hardcoded `1440`, so it stays pinned
to the corner if the viewBox constant is ever changed.

This also fixes where the *animation* originates, not just the geometry: the draw runs from a path's
start point (that is what walking `stroke-dashoffset` down to 0 does), so moving the start to the
corner means the line is now literally drawn out of the corner — which is what was asked.

### Verification (round 32)
Fresh reload at 1440x900 and 390x844, no console errors, build passes (**125.61 kB gzip**):
- **Path origins are the exact corners**: `getPointAtLength(0)` reads `(0, 0)` and `(1440, 0)` in
  viewBox units — `0%, 0%` and `100%, 0%` of the section box at both viewport sizes.
- **Clean start preserved**: `strokeDasharray` matches each path's new length (983 / 1000) and
  `strokeDashoffset` equals it, so both threads are `0%` drawn until scroll begins.
- **Thalis still exactly on their curves** after the geometry change: offset `[0, 0]` on all four, at
  both viewport sizes, with the lazy images forced in.
- **No collision with the copy**, checked against the real text column (`.about__title` /
  `.about__body` bounds, 420–1005px) rather than the full-width container: clearances of 219 / 202 /
  73 / 99px, `overlapsText: false` on all four.
- No horizontal overflow at either size.

**Not re-verified:** the draw progression and pop cascade. Those were fully exercised in round 30
(stepped `0 → 18 → 30 → 45 → 70 → 86 → 100%` with the pops firing in order), and this round changed
only the path geometry, not the wiring — the same `onUpdate` handler and the same
dashoffset-from-progress relationship, whose static form is confirmed above. The pane's
`requestAnimationFrame` is still dead, so re-running that check would again need the temporary
`__ST`/`__GSAP` hook.

## Round 33 — knotted-thread structure explored, then reverted

Client sketched a new structure for the About threads: line from the top corner, hugging the edge, with
**two small self-crossing knots per thread** and a wigglier descent. Built it, then the client asked to
revert.

### What was built (kept here in case it is wanted again)
Paths were developed by rendering candidates into a temporary full-viewport overlay in the live page
and screenshotting at `scrollY: 0` (where this pane does composite reliably), rather than writing
Bézier control points blind. Three iterations: the first had over-wide loops and too shallow an entry
diagonal; the second tightened both; the third de-mirrored the right thread so its lower knot sat ~60
units further down, matching the sketch's asymmetry.

Final geometry, verified by sampling each path (`getPointAtLength` over 800 steps) rather than by eye:
- Left knots centred at viewBox `(122, 155)` and `(119, 422)` — 17% and 47% of section height.
- Right knots at `(1318, 155)` and `(1321, 512)` — 17% and 57%.
- Knots detected as contiguous runs where the path's `y` decreases, i.e. real self-crossings, each
  ~73 x 47 viewBox units.

```
left:  M0 0 C 25 55, 80 100, 105 145 C 180 135, 185 205, 112 197 C 76 193, 82 152, 108 154
       C 130 250, 95 330, 138 410 C 62 402, 58 478, 134 472 C 170 468, 166 425, 140 424
       C 155 545, 92 620, 128 700 C 158 760, 108 830, 150 895
right: M1440 0 C 1415 55, 1360 100, 1335 145 C 1260 135, 1255 205, 1328 197
       C 1364 193, 1358 152, 1332 154 C 1310 260, 1345 360, 1302 500 C 1378 492, 1382 568, 1306 562
       C 1270 558, 1274 515, 1300 514 C 1288 635, 1348 705, 1312 780 C 1284 828, 1332 862, 1292 895
```

One design decision worth recording: the thali `at` fractions had to **move off the knots**, not onto
them. A thali renders ~187px across where a knot renders ~73px, so a thali centred on a knot hides it
entirely — which would defeat adding knots at all. New fractions were picked from a sampled table of
clearances (0.38 / 0.42 / 0.82 / 0.86, giving 123 / 177 / 237 / 204 viewBox units of clearance to the
nearest knot centre) so the knots stayed visible as decorative detail and the thalis hung on the clean
stretches between them.

### Revert
Paths restored to the round-32 smooth S-curves and the thali fractions back to 0.2 / 0.32 / 0.74 /
0.84. The temporary render overlay was removed.

Confirmed a clean revert rather than an approximate one: the build output hash is **byte-identical to
round 32's** (`index-vNS1z8h1.js`, 125.61 kB gzip).

### Verification (round 33)
Fresh reload, no console errors:
- Path lengths back to 983 / 1000 (the knotted versions were 1347 / 1348).
- **Zero backtracks** on either path across 400 samples — the knots are gone and both threads are
  smooth monotonic descents again.
- Corner starts intact: `0%, 0%` and `100%, 0%`.
- `at` values read `0.2 / 0.32 / 0.74 / 0.84`; all four thalis centred on their curves, offset `[0, 0]`
  with the lazy images forced in.
- Clean start preserved (`0%` drawn on both threads); no test overlay left in the DOM; no horizontal
  overflow.

## Round 34 — GlowCard: box-shadow and background colour removed

Client: drop `.glow-card`'s box shadow and background colour.

Both came from the supplied source (`box-shadow: 0 1rem 2rem -1rem #000` and
`background-color: var(--glow-backdrop)`). Removed. `--glow-backdrop` itself is **kept** — it still
colours the card's 3px border, so deleting the variable would have taken the hairline with it.

The cards now sit directly on the page: no fill, no shadow, just the hairline border and the
pointer-driven glow. That is closer to the site's no-boxes convention than the reference's panel look.

`backdrop-filter: blur(5px)` was momentarily removed alongside them and then **put back** — it was not
part of the request. Worth flagging though: with no background colour it has nothing to do visually on
a flat `#FEFEFE` page (blurring a uniform colour returns the same colour), while still forcing a
compositor layer per card. Easy to drop if wanted, but left alone rather than removed silently.

### Contrast re-checked, because the surface changed
The card previously sat on an effective `#f2f2f2` (12% grey over the page); with the fill gone the text
sits on the page's own `#FEFEFE`. Re-measured rather than assumed — all still clear AA, and slightly
better than before: title **18.21:1** (was 16.39), body **7.86:1** (was 7.44), link **5.56:1**
(was 5.01).

The border is now the only thing outlining the card and measures **1.11:1** against the page — all but
invisible by design, since the glow is what describes the card on hover. Noted in case a more visible
resting edge is wanted.

### Verification (round 34)
Fresh reload, no console errors, build passes (**125.61 kB gzip**, CSS 35.24 → 35.17 kB):
- `box-shadow: none`, `background-color: rgba(0, 0, 0, 0)`.
- Border survived: `3px rgba(153, 153, 153, 0.12)`; radius still `14px`.
- Glow machinery untouched — `::before` still masked (`mask-composite: intersect`) and gated at
  `opacity: 0` at rest, 4 bloom elements present, hover gradient still resolving.
- 4 cards at `256x320` (the `md` preset's 3:4 box) — layout unaffected.
- 390x844: shadow and background still gone, 4 cards, no horizontal overflow.
