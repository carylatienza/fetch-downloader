## Why

Downloaded YouTube `.mp4` files currently fail to open with Windows Media Player error `0xC00D36C4` because the download handler falls back to fetching JPEG image bytes when `yt-dlp` binaries are absent. Additionally, sample links in `PlatformBadges.js` for Instagram, Facebook, and X contain non-existent placeholder URLs.

## What Changes

- Implement direct YouTube video stream proxy resolution in `/api/download/route.js` to serve valid MP4 video bytes rather than JPEG image fallback bytes.
- Replace dummy sample URLs in `PlatformBadges.js` with active, verified public Rick Astley media links across Instagram, Facebook, X, and YouTube.

## Capabilities

### New Capabilities
- `valid-video-stream-proxy`: Ensures downloaded `.mp4` files contain real H.264 video streams instead of JPEG thumbnail bytes.
- `verified-platform-sample-links`: Guarantees platform sample buttons contain active, extractable public links.

### Modified Capabilities

## Impact

- `src/app/api/download/route.js`: Implements valid video stream fetching fallback.
- `src/components/PlatformBadges/PlatformBadges.js`: Updates sample URLs with active public links.
