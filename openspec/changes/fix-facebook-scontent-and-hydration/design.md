## Context

1. `FacebookExtractor` previously returned `lookaside.fbsbx.com` HTML redirect URLs. Because `lookaside` returns `Content-Type: text/html`, browsers fail to render it as an image asset.
2. Next.js hydration errors occur when password manager browser extensions inject `fdprocessedid` into `<button>` elements during initial DOM load before React hydration completes.

## Goals / Non-Goals

**Goals:**
- Extract direct `scontent-*.fbcdn.net` JPG image URLs for Facebook posts and share links.
- Eliminate Next.js console hydration warnings caused by browser extensions.

**Non-Goals:**
- Modifying React core SSR rendering pipeline.

## Decisions

### 1. Direct `scontent` Regex Pattern Matching

**Decision:** In `FacebookExtractor`, if `ogImage` is missing or contains `lookaside.fbsbx.com`, perform a regex match for `https:\/\/[^"'\\s\\]*scontent[^"'\\s\\]*` across the HTML response, decode `&amp;` entities, and select the highest resolution JPG CDN URL (`dst-jpg`).

**Rationale:** `scontent` URLs serve raw `image/jpeg` binary data directly, allowing browsers to render the thumbnail preview instantly.

### 2. Form Element Hydration Suppression

**Decision:** Add `suppressHydrationWarning` to the `<button>` and `<input>` tags in `src/components/UrlInput/UrlInput.js`.

**Rationale:** Standard React attribute that informs React to ignore expected attribute mismatches introduced by client-side browser extensions (e.g. `fdprocessedid`).

## Risks / Trade-offs

None. Both changes are non-breaking and improve reliability and developer experience.
