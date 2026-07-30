## Why

The CSS mask compositing layer (`-webkit-mask-composite: xor` in `.glass-panel::before`) causes browser GPU rendering glitches where cards and their contents disappear when hovered or scrolled. Replacing mask compositing and removing JavaScript mouse tracking with pure, high-performance CSS hover cards permanently resolves all element disappearance bugs while keeping a sleek hover glow.

## What Changes

- **Remove `SpotlightCard` JS Wrapper Component**: Delete `SpotlightCard.js` and `SpotlightCard.module.css` and unwrap all components (`PlatformMatrix`, `BentoCard`, `ComparisonTable`, `FaqSection`, `PreviewCard`, `AboutPage`, `HowItWorksPage`, `PrivacyPage`, `TermsPage`).
- **Fix `.glass-panel` in `globals.css`**: Remove `-webkit-mask` / `-webkit-mask-composite: xor` pseudo-element from `.glass-panel::before`, replacing it with clean, robust CSS borders (`border: 1px solid rgba(170, 200, 240, 0.12)`).
- **Pure CSS Card Hover Glows**: Add 60fps pure CSS hover glows (`box-shadow`, `border-color`, `transform: translateY(-4px)`) across all card elements with zero GPU layer clipping or masking conflicts.

## Capabilities

### New Capabilities
- `bulletproof-css-cards`: Rock-solid, 100% visible card components with pure CSS hover glows.

### Modified Capabilities
*(None)*

## Impact
- **Global Styles**: `src/app/globals.css`.
- **Components & Pages**: `src/components/SpotlightCard/`, `src/components/PlatformMatrix/PlatformMatrix.js`, `src/components/FaqSection/FaqSection.js`, `src/components/ComparisonTable/ComparisonTable.js`, `src/app/page.js`, `src/app/about/page.js`, `src/app/how-it-works/page.js`, `src/app/faq/page.js`, `src/app/privacy/page.js`, `src/app/terms/page.js`.
