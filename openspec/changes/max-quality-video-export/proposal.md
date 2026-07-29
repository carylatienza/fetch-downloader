## Why

Currently, video downloads are capped at 360p (Format 18) because yt-dlp was restricted to pre-merged single video+audio streams and lacked FFmpeg binary integration. YouTube serves 720p, 1080p, 1440p, and 4K (2160p) as separate DASH video and audio streams. Since Fetch's primary value proposition is delivering the highest available quality media, we need to integrate FFmpeg stream merging and update the metadata format resolution logic to unlock full 1080p and 4K video exports.

## What Changes

- **FFmpeg Integration**: Integrate `@ffmpeg-installer/ffmpeg` to automatically supply the FFmpeg binary location to yt-dlp across development and production environments.
- **yt-dlp Format String Update**: Update yt-dlp arguments from single-stream `-f "best[ext=mp4]/best"` to adaptive DASH stream merging `-f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/bestvideo+bestaudio/best"`.
- **Maximum Resolution Detection**: Update YouTube metadata resolution calculation in `src/lib/extractors/youtube.js` to parse all available formats in `info.formats` and report the true maximum resolution (e.g., 1080p, 1440p, 2160p 4K).
- **Stream Merging Handling**: Ensure stdout streaming correctly channels the merged 1080p/4K video to `/api/download`.

## Capabilities

### New Capabilities
_(None)_

### Modified Capabilities
- `media-extraction`: Update format resolution resolver to accurately report maximum video height across all DASH formats.
- `download-delivery`: Update yt-dlp execution args with `--ffmpeg-location` and DASH format selection string for 1080p/4K streaming.

## Impact

- **npm Dependency**: Added `@ffmpeg-installer/ffmpeg` to `package.json`.
- **yt-dlp Execution**: Adds `--ffmpeg-location <path>` flag to yt-dlp calls in `src/lib/ytdlp.js`.
- **Extractor Logic**: Modifies `YouTubeExtractor` in `src/lib/extractors/youtube.js`.
- **User Experience**: Video previews and downloads will now export at full 720p, 1080p, 1440p, or 4K resolution instead of 360p.
