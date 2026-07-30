## 1. Re-implement Premium SpotlightCard Component

- [x] 1.1 Create `src/components/SpotlightCard/SpotlightCard.js` and `SpotlightCard.module.css` with 2-layer stacking context (`z-index: 1` overlay, `z-index: 2` content) and subtle radial gradient (`rgba(140, 120, 240, 0.16)`)
- [x] 1.2 Wrap `PlatformMatrix` cards, `BentoCard` boxes in `page.js`, `ComparisonTable`, `FaqSection` items, and secondary page containers in `SpotlightCard`
- [x] 1.3 Verify build with `npm run build` and capture final screenshots/recordings with browser subagent
