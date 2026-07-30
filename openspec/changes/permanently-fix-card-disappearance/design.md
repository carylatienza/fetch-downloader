## Context

React state mutations (`setIsHovered(true)`) update component class names dynamically on mouse enter. When class names change on elements that have `.reveal` attached, the browser re-evaluates `.reveal` CSS transitions, temporarily resetting `opacity` to `0` and making card headers disappear.

## Goals / Non-Goals

**Goals:**
- Remove `useState(isHovered)` from `SpotlightCard.js` completely.
- Use pure CSS `.spotlightCard:hover .spotlightOverlay { opacity: 1; }` for hover light visibility.
- Remove `.reveal` from interactive card containers (`PlatformMatrix`, `BentoGrid`, `ComparisonTable`, `FaqSection`).

**Non-Goals:**
- No changes to section heading scroll entrance animations.

## Decisions

1. **Pure CSS Spotlight Card Overlay**:
   - *Decision*: Update `SpotlightCard.js` to only update `--card-x` and `--card-y` CSS variables on `onMouseMove`. Eliminate `useState(isHovered)` and class string concatenation.
   - *Rationale*: Class strings stay 100% static, preventing browser style recalculations and opacity resets.

2. **Removing `.reveal` from Interactive Cards**:
   - *Decision*: Remove `reveal` class from all hoverable card elements.
   - *Rationale*: Guarantees cards are fully rendered, opaque, and stable from page load.

## Risks / Trade-offs

- None.
