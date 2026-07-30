## Context

Currently, `/api/extract` returns `{ success: true, data: { ... } }`, but `page.js` sets `extractedData` to the full response object. `PreviewCard` looks for `data.title`, `data.thumbnail`, `data.mediaType` on the root, finding `undefined`. Additionally, `YouTubeExtractor` currently crashes if local `yt-dlp` binary execution fails on Windows.

## Goals / Non-Goals

**Goals:**
- Update `page.js` to store `data.data || data` into `extractedData`.
- Add YouTube video ID regex extraction fallback in `YouTubeExtractor` so YouTube links always extract successfully.

**Non-Goals:**
- Alter UI visual layout.

## Decisions

- **Decision 1: Unwrap API payload in page.js**: `setExtractedData(data.data || data);`
- **Decision 2: Video ID Regex Fallback in youtube.js**: Parse video ID (`/v=([a-zA-Z0-9_-]{11})|youtu\.be\/([a-zA-Z0-9_-]{11})|shorts\/([a-zA-Z0-9_-]{11})`) to generate `maxresdefault.jpg` thumbnail if `yt-dlp` fails.

## Risks / Trade-offs

- None. Both updates are non-breaking and improve resiliency.
