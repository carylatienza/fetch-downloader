## Why

Extraction responses currently return `{ success: true, data: { ... } }`, but `page.js` stores the wrapper object directly into `extractedData`. As a result, `PreviewCard` reads fields like `title`, `thumbnail`, and `mediaType` as `undefined`, causing extracted cards to render as "Untitled Media" with broken image fallbacks. Additionally, `YouTubeExtractor` lacks a fallback regex parser when local `yt-dlp` binaries are absent.

## What Changes

- Update `page.js` to store `data.data || data` into `extractedData`.
- Add a standalone regex video-ID parser fallback to `YouTubeExtractor` so YouTube extraction works reliably even without `yt-dlp` binaries.

## Capabilities

### New Capabilities
- `card-data-unwrapping`: Ensures API responses unwrapping `data.data` so `PreviewCard` receives title, thumbnail, mediaType, and quality correctly.
- `youtube-regex-fallback`: Parses YouTube video IDs directly from URLs if local `yt-dlp` metadata extraction fails.

### Modified Capabilities

## Impact

- `src/app/page.js`: Unwraps `data.data` from extraction API.
- `src/lib/extractors/youtube.js`: Adds video ID extraction fallback.
