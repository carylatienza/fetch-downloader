## Why

The current platform icons in the `PlatformMatrix` and `PlatformBadges` rely on wireframe outline SVGs (e.g., thin red box outline for YouTube, pink line camera for Instagram). Replacing these outlined icons with authentic solid full-color brand vector logos (YouTube Red badge, Instagram vibrant gradient badge, Facebook solid Blue badge, official solid X vector logo) and upgrading feature icons across the site to filled accent shapes will elevate the UI to a premium visual standard.

## What Changes

- **Solid Full-Color Brand Logos**: Replace outlined line icons in `PlatformMatrix` and `PlatformBadges` with authentic solid full-color vector logos:
  - **YouTube**: Solid `#FF0000` red badge with a solid white play triangle inside.
  - **Instagram**: Solid 5-color vibrant gradient badge (`linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)`) with solid white camera glyph.
  - **Facebook**: Solid `#1877F2` blue circle badge with solid white bold 'f'.
  - **X (Twitter)**: Solid dark badge with official solid white **𝕏** vector logo.
- **Filled Feature & Action Icons**: Upgrade checkmarks in `PlatformMatrix` to solid filled green/purple circles (`✓`) and feature icon containers in `Why Fetch` and `How It Works` to solid filled accent shapes instead of 1px wireframe outlines.
- **PreviewCard Platform Badge**: Render solid full-color brand badges on active media previews.

## Capabilities

### New Capabilities
- `solid-fullcolor-logos`: Solid full-color brand logos for YouTube, Instagram, Facebook, and X across all components.
- `filled-feature-icons`: Filled accent shapes for feature icons, step icons, and matrix checkmarks.

### Modified Capabilities
*(None)*

## Impact
- **UI Components**: `src/components/PlatformMatrix/PlatformMatrix.js`, `src/components/PlatformMatrix/PlatformMatrix.module.css`, `src/components/PlatformBadges/PlatformBadges.js`, `src/components/PlatformBadges/PlatformBadges.module.css`, `src/components/PreviewCard/PreviewCard.js`, `src/app/page.js`, `src/app/page.module.css`.
