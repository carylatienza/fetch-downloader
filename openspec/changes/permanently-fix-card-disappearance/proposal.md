## Why

Toggling React state (`isHovered`) on mouse enter modifies the component class name string dynamically. When attached to elements with `.reveal`, class string mutations trigger browser re-evaluations of `.reveal` opacity transitions, causing card headers and descriptions to vanish on hover. Removing React state class toggling and stripping `.reveal` from interactive cards permanently resolves content disappearance.

## What Changes

- **Pure CSS `SpotlightCard` Hover Overlay**: Remove `useState(isHovered)` and React `onMouseEnter`/`onMouseLeave` listeners from `SpotlightCard.js`. Use pure CSS `.spotlightCard:hover .spotlightOverlay { opacity: 1; }` so class strings never mutate.
- **Strip `.reveal` from Interactive Cards**: Remove `reveal` class from `PlatformMatrix` cards, `BentoCard` boxes in `page.js`, `ComparisonTable`, `FaqSection` items, and secondary page cards so cards are 100% opaque and stable from load.
- **Retain Section Header Animations**: Keep `.reveal` entrance animations strictly on static section titles and eyebrows.

## Capabilities

### New Capabilities
- `zero-disappearance-cards`: 100% stable interactive cards with pure CSS hover spotlight and zero class mutations.

### Modified Capabilities
*(None)*

## Impact
- **Components & Layout**: `src/components/SpotlightCard/SpotlightCard.js`, `src/components/SpotlightCard/SpotlightCard.module.css`, `src/components/PlatformMatrix/PlatformMatrix.js`, `src/components/FaqSection/FaqSection.js`, `src/components/ComparisonTable/ComparisonTable.js`, `src/app/page.js`.
