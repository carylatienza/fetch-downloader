## 1. Remove Global Background Cursor Light & Fix Spotlight Card

- [x] 1.1 Unmount `<CursorSpotlight />` from `src/app/layout.js` to remove global backdrop mouse light
- [x] 1.2 Update `src/components/SpotlightCard/SpotlightCard.module.css` to strip out `-webkit-mask` / `-webkit-mask-composite: xor` border highlight layer, resolving element disappearing bugs on hover
- [x] 1.3 Update `src/components/SpotlightCard/SpotlightCard.js` to simplify structure with `z-index: 1` spotlight overlay and `z-index: 2` content container
- [x] 1.4 Verify build with `npm run build` and capture final verification screenshots with browser subagent
