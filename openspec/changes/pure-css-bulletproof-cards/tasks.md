## 1. Pure CSS Glass Card Refactoring & Mask Cleanup

- [ ] 1.1 Remove `-webkit-mask` / `-webkit-mask-composite: xor` pseudo-element from `.glass-panel` in `src/app/globals.css`, replacing it with clean CSS borders (`border: 1px solid rgba(170, 200, 240, 0.12)`) and smooth 60fps CSS hover glow (`box-shadow` & `border-color`)
- [ ] 1.2 Remove `SpotlightCard` component directory (`src/components/SpotlightCard/`) and unwrap `SpotlightCard` from `PlatformMatrix`, `ComparisonTable`, `FaqSection`, `page.js`, `about/page.js`, `how-it-works/page.js`, `faq/page.js`, `privacy/page.js`, `terms/page.js`
- [ ] 1.3 Add pure CSS hover glows & hover lifts to `PlatformMatrix.module.css`, `ComparisonTable.module.css`, `FaqSection.module.css`, and `page.module.css`
- [ ] 1.4 Verify build with `npm run build` and capture final screenshots/recordings with browser subagent
