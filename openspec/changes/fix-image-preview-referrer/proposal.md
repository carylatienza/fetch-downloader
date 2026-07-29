## Why

Social platform media CDNs (Facebook `lookaside.fbsbx.com`, `scontent.fbcdn.net`, Instagram, and Twitter CDNs) enforce anti-hotlinking filters that block image requests when browsers attach an external `Referer` header (such as `http://localhost:3001` or foreign domains). When blocked, browsers render broken image alt text across the preview card. Suppressing the `Referer` header on preview images fixes thumbnail rendering across all supported platforms.

## What Changes

- **Referrer Policy Suppression**: Add `referrerPolicy="no-referrer"` to the `<img />` tag in `src/components/PreviewCard/PreviewCard.js`.
- **Graceful Image Error Handling**: Add an `onError` state handler to `PreviewCard` so that if an external image CDN URL fails or times out, the component smoothly falls back to rendering the clean glassmorphism placeholder icon instead of displaying broken browser alt text.

## Capabilities

### New Capabilities
_(None)_

### Modified Capabilities
- `frontend-ui`: Update PreviewCard image tag with `referrerPolicy="no-referrer"` and image fallback state for CDN compatibility.

## Impact

- **UI Component**: Modifies `PreviewCard` in `src/components/PreviewCard/PreviewCard.js`.
- **User Experience**: Facebook, Instagram, YouTube, and X thumbnails render crisp high-resolution image previews without browser hotlink blocking.
