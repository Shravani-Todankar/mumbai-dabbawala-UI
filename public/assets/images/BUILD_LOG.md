
## Round 27 — every functional icon on the page swapped for inline Material icons

Client: "materials icon use karo," scope confirmed as the whole page, implementation confirmed as
inline SVG with no new dependency (not a webfont, not an npm package) — this project has kept its
dependency list to GSAP/Lenis/three.js throughout, and Tailwind/shadcn/TypeScript were explicitly
declined in round 16 for the same reason.

### What counted as "an icon"
Grepped every `<img>` and every `icon:` field in `content.js`. Three data arrays qualified:
`services` (6, in `Services.jsx` and reused by `AppPromo.jsx`'s feature cards) and `benefits` (4, in
`Benefits.jsx` and `GlowSection.jsx`). `stats`' `icon` field was excluded — grepping `Stats.jsx`
confirmed it has not rendered `stat.icon` since the "me&u Numbers" redesign in round 6; the field was
dead data. `logo.png` (Header, Footer) was left alone — it's the wordmark, not a functional icon.

### Sourcing real icon paths rather than fabricating them
Material Design icon path data is precise bezier geometry; reciting it from memory risked a
plausible-looking but wrong shape. Used `WebSearch` to confirm a real, stable source
(`@material-icons/svg` on jsDelivr, mirroring Google's `material-design-icons` repo), then
`WebFetch` to pull each icon's actual SVG markup — ten separate fetches, one per concept, each
returned a distinct, real path with no 404s.

**Sources:**
- [@material-icons/svg CDN by jsDelivr](https://www.jsdelivr.com/package/npm/@material-icons/svg)
- [google/material-design-icons on GitHub](https://github.com/google/material-design-icons)

### Icon assignments
| Data | Item | Icon |
| --- | --- | --- |
| services | Dabba Service | `restaurant` |
| services | Lectures/Seminars & Ted Talks | `school` |
| services | Digital Dabbawala | `smartphone` |
| services | A Day with Dabbawala | `group` |
| services | Advertise with us | `announcement` |
| services | Centralised Kitchen | `kitchen` |
| benefits | Six Sigma accurate | `verified_user` |
| benefits | ISO 9001:2000 certified | `assignment_turned_in` |
| benefits | 5,000 Dabbawalas | `groups` |
| benefits | Running since 1890 | `history` |

`group` and `groups` are deliberately different icons (two-person vs three-person) so "A Day with
Dabbawala" and "5,000 Dabbawalas" don't render identically despite the related subject matter.

### Implementation
- New `Icon.jsx`: a `PATHS` registry (10 entries, each a 24x24 viewBox `d` string) behind a single
  `<Icon name size className />` component. Renders `fill="currentColor"`, so every icon themes off
  the CSS `color` property.
- `content.js`: every `icon:` field in `services` and `benefits` changed from a `/assets/images/*.png`
  path to a registry key (e.g. `'restaurant'`).
- `Services.jsx`, `AppPromo.jsx`, `Benefits.jsx`, `GlowSection.jsx`: `<img src={item.icon}>` replaced
  with `<Icon name={item.icon}>`.
- Every corresponding CSS rule: `filter: var(--icon-accent-filter)` replaced with
  `color: var(--color-text-accent)`. This is a genuine improvement, not just a like-for-like swap —
  the old PNG-recolour filter had to be hand-tuned per surface (a different `--icon-accent-filter`
  value is defined inside `.section--invert`, which is why Services' icons were amber and everyone
  else's were terracotta). An SVG with `fill="currentColor"` just inherits `color`, which the
  token-scope pattern already redefines per surface — so the exact same CSS line produces the right
  colour on both the ink slab and the plain page with no filter math at all.
- `AppPromo.css`'s bare `.promo__card img` selector became `.promo__card-icon`, since there's no
  longer an `<img>` to select there.
- Deleted the ten now-orphaned PNGs (`service1–6.png`, `fact-icon1–4.png`) after confirming with a
  repo-wide grep that nothing else referenced them. `stats`' dead `icon` field (which pointed at the
  now-deleted `fact-icon*.png` files) was removed rather than left dangling.

### Verification (round 27)
Fresh reload, no console errors, build passes (**125.26 kB gzip**, up from 123.57 — the icon
registry's inline path strings cost more JS than the ten small PNGs cost in network requests, but
there are no longer any icon image requests at all):
- 6 distinct `<svg>` elements in `Services`, 6 in `AppPromo` — paths match 1:1 in the same order
  (both read the same `services` array).
- 4 distinct `<svg>` elements in `Benefits`, 4 in `GlowSection` — paths match 1:1, distinct from the
  services set.
- Zero `<img>` elements left pointing at `service*` or `fact-icon*`; zero broken images anywhere on
  the page.
- Colour confirmed theme-correct with no filter: `Services` (`.section--invert`) icons compute
  `rgb(216,145,76)` (`#d8914c`, the invert-scope amber); `AppPromo`, `Benefits`, `GlowSection` (plain
  page) compute `rgb(169,76,33)` (`#a94c21`, the default terracotta) — same CSS rule, correct colour
  on both surfaces.
- `scrollWidth - innerWidth = -15`.

**Not verified:** the icons' visual shape and alignment next to the real copy — this pane's
screenshots aren't reliable for anything requiring live paint below the fold
(per [[feedback-browser-pane-verification]]); geometry, path data, and computed colour were confirmed
programmatically instead. Worth a visual pass in a real browser to confirm the ten shapes read
clearly at their rendered sizes (40–44px).
