## Context

When `PreviewCard` renders extracted media thumbnails from social CDNs, browsers send the `Referer` header of the current site. CDNs like Facebook `lookaside.fbsbx.com` inspect `Referer` and reject the cross-origin image request, causing the browser to render broken image alt text.

## Goals / Non-Goals

**Goals:**
- Suppress the `Referer` header on preview card images to bypass CDN anti-hotlinking filters.
- Provide a smooth fallback UI when CDN image links fail.

**Non-Goals:**
- Server-side thumbnail image re-hosting or proxying (client-side `referrerPolicy="no-referrer"` directly solves CDN image rendering at zero bandwidth cost).

## Decisions

### 1. Client-Side Referrer Suppression

**Decision:** Set `referrerPolicy="no-referrer"` attribute on `<img />` in `src/components/PreviewCard/PreviewCard.js`.

**Rationale:** Standard HTML5 attribute supported by all modern browsers. It tells the browser to omit the `Referer` header when fetching the image asset, allowing Facebook/Instagram/Twitter CDN requests to succeed.

### 2. State-Based Image Load Error Fallback

**Decision:** Add `const [imageError, setImageError] = useState(false);` and set `onError={() => setImageError(true)}` on `<img />`.

**Rationale:** If an external image link expires or gets blocked, `PreviewCard` displays the clean glassmorphism placeholder icon instead of unstyled broken text.

## Risks / Trade-offs

None. `referrerPolicy="no-referrer"` is a standard non-breaking browser attribute.
