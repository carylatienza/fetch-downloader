## 1. Local FFmpeg Binary Resolution & Format Fix

- [x] 1.1 Update `getFfmpegPath()` in `src/lib/ytdlp.js` to return absolute path to `ffmpeg.exe` / `ffmpeg` executable.
- [x] 1.2 Update `getCommandArgs()` and `getStreamWithYtDlp()` in `src/lib/ytdlp.js` to explicitly append `--ffmpeg-location` for metadata extraction and streaming.
- [x] 1.3 Refine format selection flags in `ytdlp.js` to ensure 1080p/4K DASH video tracks are selected and remuxed with audio.
