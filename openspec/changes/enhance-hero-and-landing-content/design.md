## Context

Fetch's landing page was recently updated to a modern dark theme with an asymmetric layout, floating island navbar, and custom typography. However, the hero section is currently static without interactive quick-start options or brand hover effects, and the page ends after the basic features without addressing detailed platform capabilities, competitive comparison, or common user questions.

## Goals / Non-Goals

**Goals:**
- Add an interactive "Try a Sample" chip bar in the Hero section to allow instant testing of YouTube, Instagram, and Facebook downloads.
- Upgrade platform badges with platform-specific brand glow hover effects and feature tooltips.
- Add a Platform Capabilities Matrix component highlighting supported formats per social media network.
- Add a visual "Fetch vs. Traditional Downloaders" Comparison Table.
- Add an interactive FAQ Accordion component with common user questions.
- Preserve fast load times and clean dark-mode visual hierarchy.

**Non-Goals:**
- No backend API modifications (all sample URLs use existing `/api/extract` endpoint).
- No third-party UI framework dependencies (built with Vanilla CSS Modules & Lucide React icons).

## Decisions

1. **Client-Side Quick Fill State**:
   - *Decision*: When a sample link chip is clicked, pass the sample URL directly to `UrlInput` and invoke `onSubmit(sampleUrl)`.
   - *Rationale*: Provides an instant end-to-end demonstration of preview generation and multi-photo collection without user typing.

2. **Modular Component Architecture**:
   - *Decision*: Create standalone component folders `PlatformMatrix`, `ComparisonTable`, and `FaqSection` inside `src/components/`.
   - *Rationale*: Keeps `src/app/page.js` clean and allows reusable rendering and independent styling via CSS modules.

3. **Brand Color Hover Glow Tokens**:
   - *Decision*: Define HSL/RGBA brand glow variables in `PlatformBadges.module.css`:
     - YouTube: `rgba(255, 0, 0, 0.25)`
     - Facebook: `rgba(24, 119, 242, 0.25)`
     - Instagram: `linear-gradient(...)` accent ring
     - X: `rgba(29, 161, 242, 0.25)`
   - *Rationale*: Adds tactility and delight without interfering with accessibility or dark mode palette.

4. **FAQ Accordion State**:
   - *Decision*: Use local React state `openIndex` in `FaqSection.js` with CSS smooth height transitions.
   - *Rationale*: Lightweight, zero-dependency accordion disclosure.

## Risks / Trade-offs

- **[Risk] Sample links becoming stale or rate-limited by Facebook/IG** → **Mitigation**: Use public sample media URLs or curated fallback test URLs that remain reliable.
- **[Risk] Page length increasing** → **Mitigation**: Maintain generous vertical whitespace (`var(--section-gap)`) and `IntersectionObserver` scroll reveals so content cascades cleanly on scroll.
