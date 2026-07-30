## Context

Complex CSS mask compositing (`-webkit-mask-composite: xor`) combined with JavaScript mouse listener components (`SpotlightCard`) causes GPU compositor layer clipping bugs, making components disappear on hover. Replacing this with pure CSS card styles ensures rock-solid stability and crisp 60fps hover animations.

## Goals / Non-Goals

**Goals:**
- Remove `-webkit-mask` / `-webkit-mask-composite: xor` from `globals.css` `.glass-panel::before`.
- Delete `SpotlightCard` component and unwrap all card elements.
- Implement pure CSS hover glow (`box-shadow`, `border-color: rgba(170, 200, 240, 0.22)`, `transform: translateY(-4px)`) across all cards.
- Ensure 100% stable visibility across all browsers.

**Non-Goals:**
- No changes to scroll-reveal animations or brand logos.

## Decisions

1. **Pure CSS Double-Bezel Glass Card Styling**:
   - *Decision*: Replace mask pseudo-element in `.glass-panel` with:
     ```css
     .glass-panel {
       position: relative;
       background: var(--surface-frosted-glass);
       border-radius: var(--radius-cards);
       border: 1px solid rgba(170, 200, 240, 0.1);
       box-shadow: var(--shadow-frosted-card);
       transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                   box-shadow 0.25s ease,
                   border-color 0.25s ease;
     }

     .glass-panel:hover {
       transform: translateY(-4px);
       border-color: rgba(124, 106, 239, 0.4);
       box-shadow: 0 12px 36px -8px rgba(8, 9, 15, 0.6),
                   0 0 24px -4px rgba(124, 106, 239, 0.25);
     }
     ```
   - *Rationale*: Zero GPU compositor bugs, zero mask clipping, hardware-accelerated 60fps performance.

## Risks / Trade-offs

- None.
