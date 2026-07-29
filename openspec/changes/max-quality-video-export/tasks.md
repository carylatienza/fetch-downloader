## 1. FFmpeg Integration & yt-dlp Configuration

- [x] 1.1 Add `@ffmpeg-installer/ffmpeg` dependency to `package.json`
- [x] 1.2 Update `src/lib/ytdlp.js` to pass `--ffmpeg-location` pointing to `@ffmpeg-installer/ffmpeg` binary
- [x] 1.3 Update yt-dlp stream format selection string to `-f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/bestvideo+bestaudio/best"`

## 2. YouTube Maximum Quality Resolution Resolver

- [x] 2.1 Update `src/lib/extractors/youtube.js` to parse `info.formats` and report maximum resolution height (e.g. 1080p, 1440p, 2160p 4K)
- [x] 2.2 Verify metadata extraction and high quality download streaming end-to-end
