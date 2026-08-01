## Why

When extracting metadata for YouTube videos, `getMetadataWithYtDlp` passed `-f bestvideo+bestaudio/best` and `--extractor-args youtube:player_client=android,web` alongside `--dump-json`. This caused `yt-dlp` to filter the returned JSON `formats` array to only pre-merged 360p progressive streams, displaying "Quality: 360p" in the UI preview card even when 1080p and 4K streams were available. Removing `-f` filtering and mobile client restrictions from `--dump-json` enables complete 4K/1080p metadata extraction.

## What Changes

- Update `getMetadataWithYtDlp` in `src/lib/ytdlp.js` to execute `--dump-json` without format filter flags (`-f`) or mobile player client locks.
- Ensure the full list of formats (all 30+ streams) is extracted, allowing `youtube.js` to correctly calculate true `maxHeight` (e.g. 2160p / 1080p).
- Keep stream format remuxing (`-f bestvideo+bestaudio/best --merge-output-format mp4`) strictly inside `getStreamWithYtDlp`.

## Capabilities

### New Capabilities

- `4k-metadata-extraction`: Unfiltered YouTube metadata JSON extraction capable of listing all 1080p, 1440p, and 4K DASH streams and computing true maximum resolution.

### Modified Capabilities

- None

## Impact

- `src/lib/ytdlp.js`: Cleaned `--dump-json` parameters in `getMetadataWithYtDlp`.
- UI Preview Card: Displays true maximum resolution (e.g. `2160p (4K)` or `1080p (Full HD)`).
