## Context

When extracting or downloading YouTube videos locally, `yt-dlp` executes CLI commands. On Windows, `@ffmpeg-installer/ffmpeg` exports `path` pointing to `node_modules/@ffmpeg-installer/win32-x64/ffmpeg.exe`. If `yt-dlp` is run as `python -m yt_dlp` without `--ffmpeg-location`, Python `yt-dlp` checks the system PATH and fails to find `ffmpeg.exe`, logging a warning and falling back to format 18 (360p).

## Goals / Non-Goals

**Goals:**
- Dynamically detect `@ffmpeg-installer/ffmpeg` executable binary path.
- Append `--ffmpeg-location` to `yt-dlp` arguments explicitly.
- Allow `yt-dlp` to combine high-res video (1080p/4K) + audio into an MP4 stream without falling back to 360p.

**Non-Goals:**
- Changing external production container settings (which already include system FFmpeg via Dockerfile).

## Decisions

1. **Explicit `--ffmpeg-location` Argument**:
   - *Decision*: In `ytdlp.js`, always include `['--ffmpeg-location', ffmpegPath]` when `getFfmpegPath()` returns a valid file path.
   - *Rationale*: Explicitly passing `--ffmpeg-location` informs `yt-dlp` exactly where `ffmpeg.exe` is located, bypassing system PATH checks on Windows.

2. **Broad Format Selection**:
   - *Decision*: Use `-f "bestvideo+bestaudio/best"` with `--recode-video mp4` or postprocessor frag keyframes.
   - *Rationale*: Allows `yt-dlp` to pick VP9/AV01 1080p/4K streams and mux them with m4a/opus audio into an MP4 container.

## Risks / Trade-offs

- **[Risk] Missing `@ffmpeg-installer` Binary** → *Mitigation*: Fall back gracefully to system `ffmpeg` on PATH if package is not present.
