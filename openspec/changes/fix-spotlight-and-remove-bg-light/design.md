## Context

The global background cursor light backdrop causes unnecessary visual distraction and performance overhead, while `-webkit-mask` compositing inside `SpotlightCard.module.css` caused container content to randomly disappear when hovering.

## Goals / Non-Goals

**Goals:**
- Unmount and remove `<CursorSpotlight />` from `RootLayout` (`src/app/layout.js`).
- Simplify `SpotlightCard.module.css` to eliminate `-webkit-mask` / `-webkit-mask-composite: xor` layer.
- Retain mouse-relative inner spotlight glow (`radial-gradient`) and clean CSS border elevation glow on container cards.
- Ensure 100% stable visibility of all text, icons, buttons, and badges inside cards at all times.

**Non-Goals:**
- No change to scroll-reveal animations across pages.

## Decisions

1. **Unmount Global Cursor Spotlight**:
   - *Decision*: Remove `<CursorSpotlight />` from `RootLayout`.
   - *Rationale*: Eliminates background clutter and saves event listener cycles.

2. **Clean Layered Spotlight Card Styling**:
   - *Decision*: Set `spotlightOverlay` to `position: absolute; inset: 0; pointer-events: none; z-index: 1;` with simple `radial-gradient(350px circle at var(--card-x) var(--card-y), var(--spotlight-color), transparent 70%)`. Place `cardContent` at `z-index: 2`.
   - *Rationale*: Guarantees zero masking conflicts or content clipping bugs.

## Risks / Trade-offs

- None identified.
