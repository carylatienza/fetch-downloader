# max-quality-video-download Specification

## ADDED Requirements

### Requirement: yt-dlp process uses environment PATH containing FFmpeg directory
`src/lib/ytdlp.js` SHALL append the `@ffmpeg-installer` directory to `process.env.PATH` when executing `yt-dlp` or `python -m yt_dlp`.

#### Scenario: User requests video download
- **WHEN** the backend spawns a `yt-dlp` stream process
- **THEN** FFmpeg is detected in process PATH
- **AND** `yt-dlp` selects and merges the highest resolution DASH streams (1080p / 1440p / 4K)

### Requirement: Stream format uses bestvideo+bestaudio
`getStreamWithYtDlp` SHALL use `-f "bestvideo+bestaudio/best"` and `--postprocessor-args "ffmpeg:-movflags frag_keyframe+empty_moov"`.

#### Scenario: 4K video stream delivery
- **WHEN** a 4K video is extracted and downloaded
- **THEN** high-res video and audio DASH streams are merged on-the-fly and streamed to the client
