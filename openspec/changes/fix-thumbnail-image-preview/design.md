## Context

Client browsers encounter hotlink blocking (`Content-Type: text/html`) when fetching Facebook `lookaside.fbsbx.com` or platform CDN URLs inside raw `<img src="...">` tags.

## Goals / Non-Goals

**Goals:**
- Guarantee 100% reliable thumbnail preview rendering for all extracted photos and videos.
- Stream image previews with `Googlebot` crawler headers server-side.

**Non-Goals:**
- Resizing images on the fly (preserving original CDN aspect ratios).

## Decisions

### 1. Server-Side Proxying for Image Previews

**Decision:** In `src/components/PreviewCard/PreviewCard.js`, format thumbnail image sources as:
```javascript
const getProxiedImageSrc = (url) => {
  if (!url) return '';
  if (url.startsWith('/api/download') || url.startsWith('data:')) return url;
  return `/api/download?imageUrl=${encodeURIComponent(url)}&preview=true`;
};
```

### 2. Inline Content-Disposition in `/api/download`

**Decision:** In `src/app/api/download/route.js`, when `preview=true` or `imageUrl` is present:
Set `Content-Disposition: inline` instead of `attachment`.

## Risks / Trade-offs

None. Inline proxying leverages server-side Googlebot crawler headers which social CDNs allow without authentication walls.
