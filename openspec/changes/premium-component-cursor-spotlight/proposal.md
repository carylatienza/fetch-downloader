## Why

Static CSS box-shadow glows look generic and lack the interactive, high-end agency aesthetic. Re-implementing a clean, subtle cursor-following spotlight overlay inside cards (`SpotlightCard`) restores a premium Vercel/Linear-style interactive feel without using CSS mask compositing, guaranteeing zero element disappearance glitches.

## What Changes

- **Build Bug-Free `<SpotlightCard />`**: Create a clean, client-side container spotlight wrapper (`src/components/SpotlightCard/SpotlightCard.js` and `SpotlightCard.module.css`) that tracks mouse relative coordinates (`--card-x`, `--card-y`) and renders a soft, subtle inner radial aura (`rgba(140, 120, 240, 0.16)`).
- **Zero CSS Mask Compositing**: Avoid `-webkit-mask-composite: xor` to prevent browser GPU rendering bugs and element clipping on hover.
- **Wrap Interactive Cards**: Wrap `PlatformMatrix` cards, `BentoCard` boxes, `ComparisonTable`, `FaqSection` items, `PreviewCard`, and secondary page containers in `<SpotlightCard />`.

## Capabilities

### New Capabilities
- `interactive-component-spotlight`: Subtle, high-end cursor-following radial light inside cards with 100% element stability.

### Modified Capabilities
*(None)*

## Impact
- **Components & Layout**: `src/components/SpotlightCard/SpotlightCard.js`, `src/components/SpotlightCard/SpotlightCard.module.css`, `src/components/PlatformMatrix/PlatformMatrix.js`, `src/components/FaqSection/FaqSection.js`, `src/components/ComparisonTable/ComparisonTable.js`, `src/app/page.js`, secondary pages.
