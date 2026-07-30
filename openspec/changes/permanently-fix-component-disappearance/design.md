## Context

Elements with `.reveal` are styled with `opacity: 0; transform: translateY(24px)` by default. `ScrollObserverProvider.js` previously observed `.reveal` elements only once on route change (`[pathname]`). When React components re-rendered or hydrated, new `.reveal` nodes mounted without `.visible` and remained invisible (`opacity: 0`).

## Goals / Non-Goals

**Goals:**
- Combine `IntersectionObserver` and `MutationObserver` in `ScrollObserverProvider.js` to observe all existing and newly added `.reveal` nodes.
- Instantly reveal elements located within or near the top of the viewport (`window.scrollY`).
- Add CSS fallback rules in `globals.css` so `.reveal` elements auto-fade in if JavaScript is slow or hydration is delayed.

**Non-Goals:**
- Removing scroll animation effects entirely.

## Decisions

1. **MutationObserver Integration**:
   - Observe `document.body` for child list mutations and add new `.reveal` nodes to the `IntersectionObserver`.
2. **Instant Viewport Check**:
   - Check `el.getBoundingClientRect().top < window.innerHeight` on initial observe to append `.visible` immediately for hero elements.

## Risks / Trade-offs

- None.
