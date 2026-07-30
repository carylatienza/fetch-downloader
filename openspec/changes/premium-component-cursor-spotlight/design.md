## Context

Static box-shadow glows feel cheap and non-dynamic. We need to re-introduce the subtle inner radial spotlight that follows the user's cursor inside component containers, while ensuring ZERO CSS mask compositing is used to eliminate element disappearance bugs.

## Goals / Non-Goals

**Goals:**
- Build `<SpotlightCard />` client component that tracks `--card-x` and `--card-y`.
- Render a smooth, subtle inner radial aura (`radial-gradient(350px circle at var(--card-x) var(--card-y), var(--spotlight-color), transparent 75%)`).
- Ensure `pointer-events: none` and `z-index: 1` on the spotlight overlay, with card content at `z-index: 2`.
- Completely avoid `-webkit-mask` / `mask-composite` to guarantee 100% element visibility.

**Non-Goals:**
- No global viewport backdrop light (keeping canvas dark and focused).

## Decisions

1. **2-Layer Spotlight Architecture**:
   - *Decision*:
     ```jsx
     <div className={styles.spotlightCard}>
       <div className={styles.spotlightOverlay} aria-hidden="true" />
       <div className={styles.cardContent}>{children}</div>
     </div>
     ```
   - *Rationale*: Guarantees that card children are rendered in an isolated stacking layer above the spotlight gradient without any mask clipping or browser compositor bugs.

## Risks / Trade-offs

- None.
