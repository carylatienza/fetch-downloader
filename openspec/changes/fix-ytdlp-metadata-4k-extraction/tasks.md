## 1. Unfiltered Metadata Extraction Fix

- [x] 1.1 Update `getMetadataWithYtDlp` in `src/lib/ytdlp.js` to remove `-f` format filter and `player_client=android` flags from `--dump-json`.
- [x] 1.2 Verify that `YouTubeExtractor` calculates `quality` based on true max format height (2160p 4K / 1080p).
