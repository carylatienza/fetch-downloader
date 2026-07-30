## Why

Currently, video downloads for YouTube are defaulting to legacy 360p pre-merged format (Format 18) instead of 1080p, 1440p, or 4K Ultra HD. This happens because the `@ffmpeg-installer` path was not injected into the child process environment `PATH`, causing `yt-dlp` to assume format merging is unavailable and fall back to 360p. Injecting the FFmpeg directory into `process.env.PATH` and setting stream format rules unlocks maximum resolution (4K / 2160p / 1080p) merged streams for all downloads.

## What Changes

- **Environment PATH Injection**: Update `getCommandArgs` and `getStreamWithYtDlp` in `src/lib/ytdlp.js` to dynamically append the `@ffmpeg-installer` directory to `process.env.PATH`.
- **Max-Quality Stream Format**: Update `getStreamWithYtDlp` format selector to `-f "bestvideo+bestaudio/best"` and pass `--postprocessor-args "ffmpeg:-movflags frag_keyframe+empty_moov"` for continuous 4K/1080p stdout streaming.

## Capabilities

### New Capabilities
- `max-quality-video-download`: Merged 4K / 1080p DASH stream downloading using ffmpeg env PATH resolution.

## Impact

- **Backend Extraction**: Modifies `src/lib/ytdlp.js`.
