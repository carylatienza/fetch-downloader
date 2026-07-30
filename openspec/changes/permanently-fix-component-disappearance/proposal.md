## Why

During React re-rendering, HMR updates, or initial page load, UI components with the `reveal` class disappear or remain locked at `opacity: 0`. This occurs because `ScrollObserverProvider.js` relied on `IntersectionObserver` triggered strictly on `[pathname]`, missing dynamically updated or mounted DOM elements. Upgrading `ScrollObserverProvider.js` with `MutationObserver` and instant viewport reveal logic, plus adding CSS fallbacks in `globals.css` ensures components stay visible 100% of the time.

## What Changes

- **Observer Enhancement**: Update `src/components/Providers/ScrollObserverProvider.js` to observe existing and dynamically inserted `.reveal` elements using `MutationObserver`, and immediately add `.visible` to elements in the viewport.
- **Fail-Safe CSS Fallback**: Add CSS keyframe/fallback rules in `src/app/globals.css` so elements with `.reveal` are never stuck at `opacity: 0` during rendering.
- **Hero & Section Spacing**: Refine `.heroSection` padding and spacing in `src/app/page.module.css` to prevent header overlap or title clipping.

## Capabilities

### New Capabilities
- `component-visibility`: Instant viewport detection, DOM mutation observation, and CSS fallbacks for all scroll-reveal UI elements.

## Impact

- **UI Rendering**: Modifies `src/components/Providers/ScrollObserverProvider.js`, `src/app/globals.css`, and `src/app/page.module.css`.
