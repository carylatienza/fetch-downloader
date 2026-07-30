## 1. Eliminate Class Mutations & Strip Card Reveal Classes

- [x] 1.1 Update `src/components/SpotlightCard/SpotlightCard.js` to strip `useState(isHovered)` and React `onMouseEnter`/`onMouseLeave` handlers, using native CSS `.spotlightCard:hover .spotlightOverlay { opacity: 1; }` in `SpotlightCard.module.css`
- [x] 1.2 Remove `reveal` class from `PlatformMatrix` cards, `BentoCard` boxes in `page.js`, `ComparisonTable`, `FaqSection` items, and secondary page containers
- [x] 1.3 Verify build with `npm run build` and capture final screenshots/recordings with browser subagent
