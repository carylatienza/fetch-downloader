## 1. 2-Tier Cursor Light & Interactive Spotlight System

- [x] 1.1 Create global client component `<CursorSpotlight />` (`src/components/CursorSpotlight/CursorSpotlight.js` and `CursorSpotlight.module.css`) to update global `--mouse-x` and `--mouse-y` coordinates at 60fps and render global ambient backdrop aura
- [x] 1.2 Create reusable `SpotlightCard` wrapper component (`src/components/SpotlightCard/SpotlightCard.js` and `SpotlightCard.module.css`) to track local container mouse relative coordinates (`--card-x`, `--card-y`) and render intense inner spotlight glows + illuminated border edges
- [x] 1.3 Wrap `PlatformMatrix` cards, `BentoCard` boxes, `ComparisonTable` rows, `FaqItem` accordions, and `PreviewCard` with `SpotlightCard`
- [x] 1.4 Mount `<CursorSpotlight />` in `src/app/layout.js` so background light follows cursor on all pages

## 2. Page-Wide Animations & Micro-Motion Polish

- [x] 2.1 Integrate universal `ScrollReveal` observer in `layout.js` to animate `.reveal` elements automatically across `/`, `/about`, `/how-it-works`, `/faq`, `/privacy`, `/terms`
- [x] 2.2 Add staggered page hero header entrance animations across secondary pages (`/about`, `/how-it-works`, `/faq`, `/privacy`, `/terms`)
- [x] 2.3 Add fluid CSS grid height transitions to `FaqSection` accordions and spring hover physics to buttons & chips
- [x] 2.4 Verify build with `npm run build` and capture final screenshots/recordings with browser subagent
