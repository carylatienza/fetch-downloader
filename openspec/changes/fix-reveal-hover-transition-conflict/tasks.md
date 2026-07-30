## 1. Fix Reveal Hover Transition Conflict

- [x] 1.1 Update `.reveal.visible` in `src/app/globals.css` to lock `opacity: 1`, `transform: translateY(0)` and remove reveal entry transition (`transition: none`) after initial scroll entrance
- [x] 1.2 Verify build with `npm run build` and capture final screenshots/recordings with browser subagent
