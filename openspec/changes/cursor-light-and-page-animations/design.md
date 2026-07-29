## Context

The application currently has static glassmorphic cards and basic scroll reveal on the landing page. Adding a 2-tier cursor lighting system (global backdrop ambient glow + interactive container spotlight) alongside page-wide animation polish will deliver a high-end, responsive feel across all routes (`/`, `/about`, `/how-it-works`, `/faq`, `/privacy`, `/terms`).

## Goals / Non-Goals

**Goals:**
- Implement a global cursor spotlight React client component `<CursorSpotlight />` that updates `--mouse-x` and `--mouse-y` at 60fps via `requestAnimationFrame`.
- Add local spotlight tracking (`--card-x`, `--card-y`) to interactive containers (`PlatformMatrix` cards, `BentoCard` boxes, `ComparisonTable` rows, `FaqItem` cards, `PreviewCard`) so intense spotlight glows follow the cursor inside the card bounds.
- Apply `IntersectionObserver` scroll-reveal animations across all pages.
- Add staggered hero page entrance micro-motion and smooth button hover physics.

**Non-Goals:**
- Heavy canvas/WebGL dependencies (built purely with high-performance CSS custom variables, hardware-accelerated transforms, and React hooks).

## Decisions

1. **2-Tier Lighting Architecture**:
   - **Tier 1 (Global Backdrop)**: `<CursorSpotlight />` listens to `pointermove` and sets `--mouse-x`, `--mouse-y` on `document.body`. A fixed `div` renders `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(124, 106, 239, 0.14), transparent 80%)`.
   - **Tier 2 (Interactive Spotlight Card)**: A custom React hook or event listener calculates local card coordinates `(x = e.clientX - rect.left, y = e.clientY - rect.top)`. A overlay `div` inside the card renders an intense radial glow `radial-gradient(350px circle at var(--card-x) var(--card-y), rgba(124, 106, 239, 0.28), transparent 70%)`.
   - *Rationale*: Maximum 60fps performance without DOM rerenders or layout recalculation overhead.

2. **Universal Scroll-Reveal Component / Observer**:
   - Implement `ScrollReveal` observer in `layout.js` or global client listener so `.reveal` elements on `/about`, `/how-it-works`, `/faq`, `/privacy`, and `/terms` automatically fade and slide up on scroll.

## Risks / Trade-offs

- **[Risk] Touch screen devices (mobile/tablets)** → **Mitigation**: Detect touch media capability (`@media (hover: hover)`) and gracefully hide cursor spotlights on touch devices while preserving scroll-reveal entrance animations.
