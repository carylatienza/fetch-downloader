## Context

1. `UrlInput.js` currently expects `{ onSubmit }` prop, but `page.js` passes `onExtract={handleExtract}`. Submitting the form throws `TypeError: onSubmit is not a function`.
2. `/api/download` uses server in-memory `Map` sessions which do not persist across Vercel serverless Lambda calls. On download, missing sessions cause `/api/download` to fallback to fetching the HTML web page rather than direct media CDN streams.

## Goals / Non-Goals

**Goals:**
- Update `UrlInput.js` prop destructuring to accept `onExtract` / `onSubmit` and `externalUrl` / `initialValue`.
- Update `PreviewCard.js` to construct download URLs using direct media CDN URLs (`mediaUrl` or `imageUrl`).
- Update `/api/download/route.js` to handle `mediaUrl` parameters statelessly via Node `fetch` stream proxying.

**Non-Goals:**
- Alter UI visual layout or styling.

## Decisions

- **Decision 1: Dual Prop Support in `UrlInput.js`**:
  `const extractHandler = onExtract || onSubmit;`
  `const initial = externalUrl || initialValue;`
- **Decision 2: Direct Media Proxying in `PreviewCard.js` & `/api/download`**:
  Pass `mediaUrl` (e.g. `images[activePhotoIndex].url` or `sourceUrl` / `thumbnail`) to `/api/download?mediaUrl=...`. `/api/download` fetches the media stream directly and sets attachment response headers.

## Risks / Trade-offs

- None. Direct HTTP stream proxying is stateless, zero-RAM, and works universally.
