## Context

Fetch V1 currently exports YouTube videos at 360p (Format 18) because `yt-dlp` was executed with `-f "best[ext=mp4]/best"`. YouTube only provides pre-merged single video+audio files up to 360p. All higher qualities (720p, 1080p, 1440p, 4K) are delivered via separate DASH video and audio streams requiring FFmpeg to merge on the fly.

## Goals / Non-Goals

**Goals:**
- Deliver YouTube video downloads at maximum resolution available (up to 4K / 2160p).
- Automatically supply FFmpeg executable path via `@ffmpeg-installer/ffmpeg` for zero-configuration local development and Docker containers.
- Accurately display the true maximum available quality (e.g. 1080p, 4K) on the preview card UI.

**Non-Goals:**
- Manual quality selector UI (Fetch automatically exports the highest available quality per PRD requirements).
- Video format conversions (e.g. converting MKV or AVI).

## Decisions

### 1. Integrate `@ffmpeg-installer/ffmpeg`

**Decision:** Use `@ffmpeg-installer/ffmpeg` npm package to provide the `ffmpeg` executable path to `yt-dlp`.

**Rationale:** Works across Windows, macOS, and Linux out of the box without requiring users to manually install FFmpeg on their operating system or edit PATH environment variables.

### 2. Format String & FFmpeg Location in `src/lib/ytdlp.js`

**Decision:** Pass `--ffmpeg-location <ffmpeg.path>` and format string `-f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/bestvideo+bestaudio/best"` when invoking `yt-dlp`.

**Rationale:** This instructs `yt-dlp` to pick the highest resolution video stream and highest quality audio stream, merging them using the provided FFmpeg binary into a single MP4 container streamed to stdout.

### 3. Maximum Resolution Calculation in `src/lib/extractors/youtube.js`

**Decision:** Calculate `maxHeight` by iterating through `info.formats` array:
`const maxHeight = Math.max(...info.formats.map(f => f.height || 0));`

**Rationale:** `info.height` on the root metadata JSON refers to the selected format entry (which could default to a lower-res progressive format). Inspecting `info.formats` guarantees we discover the true maximum available resolution (1080p, 1440p, 2160p 4K).

## Risks / Trade-offs

**[Slightly higher CPU during download stream]** → On-the-fly DASH merging by FFmpeg uses minimal CPU (since video/audio streams are remuxed into MP4 container without heavy re-encoding).

**[Additional npm package]** → `@ffmpeg-installer/ffmpeg` adds ~20MB to `node_modules` for binary assets. Highly acceptable trade-off for zero-config 4K downloads.
