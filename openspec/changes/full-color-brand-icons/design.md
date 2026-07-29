## Context

The current `PlatformMatrix` and `PlatformBadges` render outlined wireframe icons (thin lines inside dark background boxes). To provide an authentic, high-end visual aesthetic, all social media logos and UI feature icons will be upgraded to solid full-color brand SVG badges and filled shapes.

## Goals / Non-Goals

**Goals:**
- Implement solid full-color SVG vector components for YouTube, Instagram, Facebook, and X.
- Upgrade `PlatformMatrix` cards to display authentic solid full-color brand logos and filled checkmark icons (`✓`).
- Upgrade `PlatformBadges` to display solid full-color brand icons.
- Upgrade `PreviewCard` platform badge to display solid full-color brand badges.
- Upgrade `Why Fetch` and `How It Works` feature icons to solid filled accent badges.

**Non-Goals:**
- No external heavy icon library installations (built with optimized inline React SVG components and CSS gradients).

## Decisions

1. **Custom Solid Brand SVG Components**:
   - *Decision*: Create inline solid SVG logo components for:
     - `YouTubeLogo`: Solid red background (`#FF0000`) with solid white play triangle.
     - `InstagramLogo`: Multi-color linear gradient background (`linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)`) with solid white camera lens & dot.
     - `FacebookLogo`: Solid blue background (`#1877F2`) with solid white 'f'.
     - `XLogo`: Solid dark background with solid white **𝕏** vector glyph.
   - *Rationale*: Zero extra bundle weight, ultra-sharp rendering across all resolutions.

2. **Solid Checkmark & Feature Badges**:
   - *Decision*: Wrap checkmarks in `PlatformMatrix` in solid filled circle badges (`background: var(--color-accent-soft); border-radius: 50%`).
   - *Rationale*: Replaces thin line checkmarks with distinct, solid UI indicators.

## Risks / Trade-offs

- **[Risk] High contrast on dark background** → **Mitigation**: Use subtle drop shadows (`0 4px 12px rgba(0,0,0,0.3)`) around solid color badges to maintain contrast and warmth.
