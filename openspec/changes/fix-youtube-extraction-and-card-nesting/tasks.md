## 1. Page State Payload Unwrapping

- [x] 1.1 Update `handleExtract` in `src/app/page.js` to store `data.data || data` into `extractedData`

## 2. YouTube Extractor Video ID Fallback

- [x] 2.1 Update `src/lib/extractors/youtube.js` to extract YouTube video ID from URL and return valid metadata fallback if `yt-dlp` execution fails
- [x] 2.2 Verify YouTube extraction and PreviewCard rendering end-to-end
