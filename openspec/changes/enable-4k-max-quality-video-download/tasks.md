## 1. FFmpeg PATH Environment & Format Selection

- [x] 1.1 Update `src/lib/ytdlp.js` to inject FFmpeg binary directory into `process.env.PATH` for `execFileAsync` and `spawn`.
- [x] 1.2 Update `getStreamWithYtDlp` format selection to `-f "bestvideo+bestaudio/best"` and pass `--postprocessor-args "ffmpeg:-movflags frag_keyframe+empty_moov"`.

## 2. Verification

- [x] 2.1 Verify 4K format selection and build with `npm run build`.
