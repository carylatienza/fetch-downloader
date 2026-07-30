## Context

Downloaded `.mp4` files currently trigger Windows Media Player error `0xC00D36C4` because `/api/download` falls back to fetching JPEG image bytes (the thumbnail URL) when local `yt-dlp` binary is missing. Additionally, sample links in `PlatformBadges.js` contain placeholder strings.

## Goals / Non-Goals

**Goals:**
- Update `/api/download/route.js` and `PreviewCard.js` to ensure video downloads resolve real MP4 video streams instead of JPEG thumbnail URLs.
- Update `PlatformBadges.js` with live, verified public links.

**Non-Goals:**
- Modify visual layout or theme colors.

## Decisions

- **Decision 1: Direct Video Stream Proxying**: Pass source URL or resolved video format URL to `/api/download`, ensuring the server streams real video bytes (`video/mp4`).
- **Decision 2: Verified Live Platform Sample URLs**: Update `PLATFORMS` array in `PlatformBadges.js` with active, working URLs.

## Risks / Trade-offs

- None. Direct MP4 stream resolution eliminates corrupt video downloads across all media players.
