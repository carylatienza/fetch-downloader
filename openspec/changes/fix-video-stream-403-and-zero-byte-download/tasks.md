## 1. Yt-Dlp Stream Flags & Format Selection

- [x] 1.1 Update `getMetadataWithYtDlp` and `getStreamWithYtDlp` in `src/lib/ytdlp.js` to include `--extractor-args "youtube:player_client=android,web"`.
- [x] 1.2 Update format selection in `getStreamWithYtDlp` to `-f "best[ext=mp4]/b/bestvideo+bestaudio/best"`.

## 2. Download Route Guard

- [x] 2.1 Update `src/app/api/download/route.js` error handling for empty stream states.

## 3. Verification

- [x] 3.1 Test YouTube video download and verify stdout binary streaming with `npm run build`.
