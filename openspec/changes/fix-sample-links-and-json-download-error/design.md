## Context

Dummy URLs in `PlatformBadges.js` cause extractions to fail. When `/api/download` encounters extraction or streaming errors, it responds with `NextResponse.json({ error: ... }, { status: 500 })`. The browser's native `<a>` tag trigger downloads this JSON error payload as `download.json`.

## Goals / Non-Goals

**Goals:**
- Replace dummy sample URLs in `PlatformBadges.js` with active, verified Rick Astley URLs.
- Update `PreviewCard.js` to validate download responses before saving blobs, surfacing UI error feedback rather than saving `download.json`.

**Non-Goals:**
- Alter visual styling of `PreviewCard`.

## Decisions

- **Decision 1: Verified Sample URLs**: Update `PLATFORMS` array in `PlatformBadges.js` with live, public media URLs.
- **Decision 2: Fetch Blob Download Handler**: In `PreviewCard.js`, replace direct `<a href>` clicking with `fetch(downloadUrl)` + response status validation + `URL.createObjectURL(blob)`.

## Risks / Trade-offs

- [Risk] Blob memory leaks for large files → Mitigation: Call `URL.revokeObjectURL(blobUrl)` immediately after triggering `a.click()`.
