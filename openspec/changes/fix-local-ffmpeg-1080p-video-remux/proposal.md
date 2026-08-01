## Why

YouTube 1080p, 1440p, and 4K videos are delivered via split DASH streams (video-only + audio-only) that require FFmpeg to merge on the fly. In local development on Windows, `yt-dlp` cannot find system `ffmpeg` on PATH, causing it to fall back to Format 18 (360p progressive stream). Passing `--ffmpeg-location` explicitly with `@ffmpeg-installer/ffmpeg` executable resolution guarantees that local `yt-dlp` executions can merge DASH streams into true 1080p/4K MP4 exports.

## What Changes

- Update `getFfmpegPath()` in `src/lib/ytdlp.js` to inspect and locate the exact `@ffmpeg-installer/ffmpeg` binary executable path cross-platform (Windows `.exe` and Unix).
- Ensure `--ffmpeg-location` is explicitly appended to `yt-dlp` CLI arguments whenever `@ffmpeg-installer/ffmpeg` binary path is resolved.
- Refine format selection flags in `ytdlp.js` (`bestvideo+bestaudio/best`) to support WebM/VP9 video stream merging into MP4 containers.

## Capabilities

### New Capabilities

- `ffmpeg-binary-resolution`: Robust cross-platform binary resolution that injects `--ffmpeg-location` into `yt-dlp` for local 1080p/4K audio+video stream remuxing.

### Modified Capabilities

- None

## Impact

- `src/lib/ytdlp.js`: Updated FFmpeg binary detection and argument resolution logic.
