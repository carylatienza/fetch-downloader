## Why

The global background cursor light creates unnecessary visual noise, and the `-webkit-mask` compositing layer on `SpotlightCard` caused child content to accidentally disappear on mouse hover. Reverting the background light and simplifying `SpotlightCard` fixes all rendering bugs while retaining the card hover spotlight glow.

## What Changes

- **Remove Global Background Cursor Light**: Remove `<CursorSpotlight />` component from `RootLayout` (`src/app/layout.js`).
- **Fix `SpotlightCard` Rendering Bug**: Remove `-webkit-mask-composite` border mask layer in `SpotlightCard.module.css` to prevent elements inside cards from disappearing on hover.
- **Refine Container Hover Spotlight**: Retain mouse-relative inner spotlight glow (`radial-gradient`) and clean CSS border elevation glow on container cards (`PlatformMatrix`, `BentoCard`, `ComparisonTable`, `FaqSection`, `PreviewCard`).

## Capabilities

### New Capabilities
- `clean-spotlight-hover`: Stable, bug-free container hover spotlight without background light tracking.

### Modified Capabilities
*(None)*

## Impact
- **Layout & Components**: `src/app/layout.js`, `src/components/SpotlightCard/SpotlightCard.js`, `src/components/SpotlightCard/SpotlightCard.module.css`, `src/components/CursorSpotlight/CursorSpotlight.js`.
