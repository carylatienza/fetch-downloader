## Context

Social media CDNs reject unauthenticated desktop browser User-Agent requests on media download endpoints and return HTML login wall text pages (`Content-Type: text/html`). Because `/api/download/route.js` previously passed a desktop Chrome User-Agent header when proxy-streaming image assets, the downloaded `.jpg` file contained HTML markup text instead of binary JPEG image data.

## Goals / Non-Goals

**Goals:**
- Guarantee that `/api/download` fetches and streams pure `image/jpeg` / `image/png` binary data for social media photos.
- Ensure downloaded files open natively in OS photo viewers (Windows Photos, Apple Preview, Google Photos).

**Non-Goals:**
- Converting image formats on the fly (preserving original CDN quality).

## Decisions

### 1. Crawler User-Agent for Proxy Image Downloads

**Decision:** Update `fetch(session.sourceUrl)` in `src/app/api/download/route.js` to set `User-Agent: Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)`.

**Rationale:** Social CDNs bypass login wall HTML redirects for crawler User-Agents and stream direct `image/jpeg` / `image/png` binary data.

## Risks / Trade-offs

None. `Googlebot` header is globally supported by all social platform CDNs for public media delivery.
