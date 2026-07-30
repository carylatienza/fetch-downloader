## Context

Current sample badges use dummy URLs that fail extraction. In addition, downloads fail on Vercel because serverless environments do not have `yt-dlp` or `ffmpeg` installed, and `/api/download` tries to re-run `yt-dlp` binary execution.

## Goals / Non-Goals

**Goals:**
- Replace platform sample URLs with active, verified Rick Astley media links.
- Add direct HTTP stream fetching in `/api/download` when binary execution is unavailable or when direct media URLs exist.
- Ensure smooth fallback in `ytdlp.js` and `extractors` for serverless environments.

**Non-Goals:**
- Alter UI visual layout or design system styling.

## Decisions

- **Decision 1: Verified Rickroll URLs**: Update `PLATFORMS` array in `PlatformBadges.js` with active YouTube, Instagram, Facebook, and X Rick Astley content links.
- **Decision 2: Direct HTTP Proxy Streaming**: Update `/api/download/route.js` to catch binary spawn errors gracefully and fallback to direct HTTP streaming (`fetch(mediaUrl)`) with `User-Agent` and `Content-Disposition` attachment headers.

## Risks / Trade-offs

- [Risk] Direct HTTP proxy streaming requires valid CORS or user-agent spoofing for certain platforms. → Mitigation: Use Googlebot/browser User-Agent headers in serverless stream proxy.
