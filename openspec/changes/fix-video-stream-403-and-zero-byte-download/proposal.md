## Why

When downloading YouTube videos, `yt-dlp` returns `HTTP 403 Forbidden (access denied)` due to YouTube's recent client signature updates. As a result, the backend stdout stream prematurely closes with 0 bytes transmitted, causing the browser to save a corrupt `YouTube_Video.mp4 (0 B)` file. Adding player client extractor arguments (`youtube:player_client=android,web`) and updating the stdout format streaming rules resolves 403 blocks and ensures video binary data streams continuously to the client.

## What Changes

- **Update `yt-dlp` Extractor Flags**: In `src/lib/ytdlp.js`, add `--extractor-args "youtube:player_client=android,web"` to both `getStreamWithYtDlp` and `getMetadataWithYtDlp`.
- **Stream Format Selection**: Update format selection in `getStreamWithYtDlp` to `-f "best[ext=mp4]/b/bestvideo+bestaudio/best"` so single-stream progressive MP4 formats stream directly to stdout without FFmpeg pipe errors.
- **Backend Error Guard**: Update `src/app/api/download/route.js` to catch 0-byte stream truncation and return a proper JSON error response.

## Capabilities

### New Capabilities
- `video-stream-fix`: Player client authentication and progressive format stream delivery for YouTube and social media video downloads.

## Impact

- **Backend Logic**: Modifies `src/lib/ytdlp.js` and `src/app/api/download/route.js`.
