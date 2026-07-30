## Context

Scroll reveal CSS animations (`.reveal`) transition both `opacity` and `transform` over 0.8 seconds. When an element becomes visible and the user hovers over it, the hover state modifies `transform`, causing the browser to re-evaluate the entry transition and reset `opacity` to `0` during hover.

## Goals / Non-Goals

**Goals:**
- Update `.reveal.visible` in `src/app/globals.css` so that once an element is visible, its `opacity` is permanently locked to `1` and its entry transition is un-set.
- Ensure component hover states (`SpotlightCard`, `.glass-panel`) transition smoothly on hover without triggering opacity resets or disappearing glitches.

**Non-Goals:**
- No changes to initial scroll reveal behavior when scrolling down pages.

## Decisions

1. **Locking Revealed Element States**:
   - *Decision*:
     ```css
     .reveal.visible {
       opacity: 1;
       transform: translateY(0);
       transition: opacity 0s, transform 0s;
     }
     ```
   - *Rationale*: Completely isolates scroll entrance transitions from interactive hover state transitions.

## Risks / Trade-offs

- None.
