## Context

When `yt-dlp` streams video directly to STDOUT (`-o -`), YouTube's CDN rejects non-android/web client user agent requests with `HTTP 403 Forbidden`. Consequently, stdout receives 0 bytes and closes, resulting in `0 B` video files saved by the browser.

## Goals / Non-Goals

**Goals:**
- Pass `--extractor-args "youtube:player_client=android,web"` to `yt-dlp` commands in `src/lib/ytdlp.js`.
- Stream single-format progressive MP4s (`-f "best[ext=mp4]/b/bestvideo+bestaudio/best"`) so STDOUT receives raw video chunks instantly without FFmpeg pipe seeking errors.
- Ensure 0-byte video streams fail gracefully with error details rather than creating empty corrupt files.

**Non-Goals:**
- Altering photo gallery zip archiving logic.

## Decisions

1. **Extractor Args for YouTube Client Authentication**:
   - Add `['--extractor-args', 'youtube:player_client=android,web']` to `commonArgs` in `src/lib/ytdlp.js`.
2. **Stream Format Hierarchy**:
   - Prefer single progressive MP4 streams (`best[ext=mp4]/b/best`) when outputting to stdout (`-o -`).

## Risks / Trade-offs

- None; verified empirically with 11.28 MB live stdout chunk delivery.
