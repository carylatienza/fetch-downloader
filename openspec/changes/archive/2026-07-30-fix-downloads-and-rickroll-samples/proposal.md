## Why

Sample platform buttons currently contain dummy URLs (`C-sample123`, `123456789`) which fail extraction. Furthermore, media downloads fail on Vercel serverless and localhost environments due to missing `yt-dlp` system binaries and missing direct stream fallbacks in `/api/download`.

## What Changes

- Update all platform sample URLs in `PlatformBadges.js` to point to active Rick Astley (Rickroll) media links.
- Add Vercel-compatible direct HTTP stream proxying and fallback API extraction in `/api/download` and `/api/extract` so video and photo downloads work without requiring server-side `yt-dlp` binary execution.

## Capabilities

### New Capabilities
- `rickroll-sample-badges`: Links platform sample buttons (YouTube, Instagram, Facebook, X) to active Rick Astley media links.
- `vercel-serverless-download`: Enables direct HTTP streaming for video and photo downloads on Vercel and serverless environments.

### Modified Capabilities

## Impact

- `src/components/PlatformBadges/PlatformBadges.js`: Updates sample URLs to Rickroll links.
- `src/app/api/download/route.js`: Enhances streaming fallback using direct HTTP fetch.
- `src/lib/ytdlp.js` & `src/lib/extractors/`: Gracefully handles missing binary environments.
