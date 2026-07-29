## Why

The current hero section has redundant stacked rows (sample chips + platform badges), outlined icons instead of full-color brand logos, and an outdated Twitter icon instead of X. Furthermore, when media is previewed, the `PreviewCard` sits directly on top of the "How It Works" section header, and content on secondary pages (`/about`, `/how-it-works`, `/faq`, `/privacy`, `/terms`) is covered by the floating glass navbar. Moving `Fetch Logo Icon.png` to a designated asset folder and using it in the header/footer will unify site branding.

## What Changes

- **Full-Color Brand Logos & Official 𝕏 Logo**: Replace outlined icons with full-color brand badges (YouTube Red, Facebook Blue, Instagram Gradient) and the official monochrome **𝕏** vector logo across hero badges and platform matrix cards.
- **Unified Interactive Platform Chips**: Combine sample link chips and platform badges into a single interactive brand bar in the hero section, eliminating duplicate text rows.
- **Preview Card Spacing Adjustment**: Add dynamic bottom margin (`80px+`) when `PreviewCard` renders to ensure clear vertical rhythm above "How It Works".
- **Secondary Page Header Clearance**: Add `120px` top padding to main containers on secondary pages (`/about`, `/how-it-works`, `/faq`, `/privacy`, `/terms`) so headers are never covered by the floating glass navbar.
- **Fetch Brand Logo Integration**: Organize `Fetch Logo Icon.png` into `public/images/logo.png` and update `<Header />` and `<Footer />` components to use the official logo image asset.

## Capabilities

### New Capabilities
- `brand-logos-and-header`: Official full-color brand logos, official X vector logo, and organized `Fetch Logo Icon.png` branding in header and footer.
- `hero-layout-spacing-fix`: Unified interactive platform chips, preview card bottom spacing, and secondary page fixed navbar top padding clearance.

### Modified Capabilities
*(None)*

## Impact
- **Brand Assets**: Move `Fetch Logo Icon.png` → `public/images/logo.png`.
- **UI Components**: `src/components/Header/Header.js`, `src/components/Footer/Footer.js`, `src/components/PlatformBadges/PlatformBadges.js`, `src/components/PlatformBadges/PlatformBadges.module.css`, `src/components/UrlInput/UrlInput.js`, `src/components/UrlInput/UrlInput.module.css`, `src/components/PreviewCard/PreviewCard.module.css`, `src/components/PlatformMatrix/PlatformMatrix.js`.
- **Page Layouts**: `src/app/page.js`, `src/app/about/page.module.css`, `src/app/how-it-works/page.module.css`, `src/app/faq/page.module.css`, `src/app/privacy/page.module.css`, `src/app/terms/page.module.css`.
