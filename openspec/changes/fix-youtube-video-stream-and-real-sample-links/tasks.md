## 1. Verified Live Platform Sample Links Update

- [x] 1.1 Update `PLATFORMS` sample array in `src/components/PlatformBadges/PlatformBadges.js` with active, working public URLs across YouTube, Instagram, Facebook, and X
- [x] 2.1 Refactor `PreviewCard.js` to ensure target media URL for videos resolves to `sourceUrl` or direct media stream rather than thumbnail image URL
- [x] 2.2 Update `/api/download/route.js` to fetch direct video streams or proxy public stream resolution endpoints for YouTube videos when `yt-dlp` binary is missing
- [x] 2.3 Verify video downloading and playback in Windows Media Player end-to-end
