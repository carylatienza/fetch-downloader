## 1. Brand Logo Asset & Icon Refinements

- [x] 1.1 Move `Fetch Logo Icon.png` to `public/images/logo.png`
- [x] 1.2 Update `<Header />` and `<Footer />` components to use `public/images/logo.png` image asset
- [x] 1.3 Update platform icons to full-color brand logos (YouTube Red, Facebook Blue, Instagram Gradient) and official **𝕏** monochrome logo in `src/components/PlatformBadges/PlatformBadges.js` and `src/components/PlatformMatrix/PlatformMatrix.js`

## 2. Hero Layout & Redundancy Cleanup

- [x] 2.1 Consolidate sample chips and platform badges into a single interactive brand bar in `src/components/PlatformBadges/PlatformBadges.js`
- [x] 2.2 Remove duplicate sample chips row from `src/components/UrlInput/UrlInput.js` to eliminate redundancy
- [x] 2.3 Add dynamic bottom margin (`80px+`) to `PreviewCard` / `.inputArea` in `src/components/PreviewCard/PreviewCard.module.css` and `src/app/page.module.css`

## 3. Secondary Page Header Spacing Fix & Verification

- [x] 3.1 Add `120px` top padding to main containers on secondary pages (`/about`, `/how-it-works`, `/faq`, `/privacy`, `/terms`)
- [x] 3.2 Verify build with `npm run build` and capture final screenshots with browser subagent
