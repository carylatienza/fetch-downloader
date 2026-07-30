## Context

YouTube stores high-definition formats (1080p, 1440p, 4K) as separate video and audio DASH streams. `yt-dlp` requires `ffmpeg` to merge these separate streams into a single MP4 output. Because Node's `child_process.spawn` did not pass the `@ffmpeg-installer` directory in `process.env.PATH`, `yt-dlp` skipped high-res streams and fell back to 360p (Format 18).

## Goals / Non-Goals

**Goals:**
- Inject `path.dirname(getFfmpegPath())` into `env.PATH` when spawning `yt-dlp` in `src/lib/ytdlp.js`.
- Use `-f "bestvideo+bestaudio/best"` and `--postprocessor-args "ffmpeg:-movflags frag_keyframe+empty_moov"` for streaming merged 4K/1080p video directly to stdout.

**Non-Goals:**
- None.

## Decisions

1. **Environment PATH Resolution**:
   - Construct custom env object: `const ffmpegDir = path.dirname(ffmpegPath); const env = Object.assign({}, process.env, { PATH: ffmpegDir + ';' + (process.env.PATH || '') });`
   - Pass `{ env }` to `execFileAsync` and `spawn`.

## Risks / Trade-offs

- None; verified empirically with 401+251 (3840x2160 4K AV1 + Opus) stream delivery.
