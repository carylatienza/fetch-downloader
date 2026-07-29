## Context

Based on recent user feedback and visual audits, the hero section had two stacked rows repeating YouTube, Facebook, Instagram, and X. Additionally, icon styling relied on outlined Lucide icons with an outdated Twitter bird instead of full-color brand logos and the official X logo. Vertical spacing below `PreviewCard` was too tight, and top content on secondary pages (`/about`, `/how-it-works`, `/faq`, `/privacy`, `/terms`) was obscured by the fixed floating glass header.

## Goals / Non-Goals

**Goals:**
- Move `Fetch Logo Icon.png` to `public/images/logo.png` and update `<Header />` and `<Footer />` components to use the branded logo image.
- Replace outlined platform icons with full-color brand badges (YouTube Red, Facebook Blue, Instagram Gradient) and official **𝕏** monochrome logo.
- Combine sample chips and platform badges into a single interactive brand bar in `PlatformBadges.js`.
- Add `80px` bottom margin to `PreviewCard` / `.inputArea` during media success/loading states.
- Add `120px` top padding to secondary page containers to ensure clear spacing below fixed floating header.

**Non-Goals:**
- No change to core extraction APIs or backend server logic.

## Decisions

1. **Asset Organization (`public/images/logo.png`)**:
   - *Decision*: Copy `Fetch Logo Icon.png` to `public/images/logo.png` and reference via Next.js `<Image />` or standard `<img>` tag in `Header.js` and `Footer.js`.
   - *Rationale*: Next.js serves static assets from `public/` cleanly with optimized dimensions.

2. **Unified Interactive Brand Chips**:
   - *Decision*: Combine platform selection and sample triggers into `PlatformBadges.js`. Each platform badge displays full-color branding + sample trigger action (`onClick={() => onSampleClick(sampleUrl)}`).
   - *Rationale*: Removes redundant dual rows, leaving a clean single-row hero interaction.

3. **Official X Vector Icon**:
   - *Decision*: Replace `<Twitter />` Lucide icon with inline SVG path representing the official **𝕏** logo.

4. **Secondary Page Top Layout Padding**:
   - *Decision*: Add `padding-top: 120px` to `.main` containers across all secondary page CSS modules (`about/page.module.css`, `how-it-works/page.module.css`, `faq/page.module.css`, `privacy/page.module.css`, `terms/page.module.css`).

## Risks / Trade-offs

- **[Risk] High logo image size** → **Mitigation**: Optimize `logo.png` dimensions (`32x32` / `28x28`) with proper `height`/`width` attributes.
