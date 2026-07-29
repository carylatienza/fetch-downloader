## Why

To elevate the UI to a premium visual experience, the application needs a 2-tier lighting effect (global cursor ambient light + interactive card spotlight glow) and enhanced smooth scroll and micro-interaction animations across all pages (`/`, `/about`, `/how-it-works`, `/faq`, `/privacy`, `/terms`).

## What Changes

- **Global Cursor Ambient Spotlight**: A smooth background light that tracks mouse movement across the viewport (`--mouse-x`, `--mouse-y`) creating an ethereal radial aura.
- **Interactive Container Spotlight & Border Glow**: A localized inner spotlight and illuminated border glow that tracks mouse movement inside interactive elements (`PlatformMatrix` cards, `BentoCard` boxes, `ComparisonTable` rows, `FaqItem` cards, `PreviewCard`).
- **Page-Wide Scroll Reveal Animations**: IntersectionObserver scroll-reveals applied across all pages (`/`, `/about`, `/how-it-works`, `/faq`, `/privacy`, `/terms`).
- **Micro-Animations & Motion Polish**: Staggered hero page entrances, magnetic hover physics, fluid FAQ accordion transitions, and PreviewCard pop-in animations.

## Capabilities

### New Capabilities
- `cursor-light-spotlight`: Global ambient mouse light and localized interactive container spotlight glows.
- `page-wide-animations`: Scroll reveals, hero staggered entrances, and micro-motion across all pages.

### Modified Capabilities
*(None)*

## Impact
- **Global Layout & Styling**: `src/app/layout.js`, `src/app/globals.css`.
- **Components & Pages**: `src/components/CursorSpotlight/CursorSpotlight.js`, `src/components/PlatformMatrix/PlatformMatrix.js`, `src/components/FaqSection/FaqSection.js`, `src/components/ComparisonTable/ComparisonTable.js`, `src/app/page.js`, `src/app/about/page.js`, `src/app/how-it-works/page.js`, `src/app/faq/page.js`, `src/app/privacy/page.js`, `src/app/terms/page.js`.
