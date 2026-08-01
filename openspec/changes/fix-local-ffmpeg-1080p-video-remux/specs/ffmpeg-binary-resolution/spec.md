## ADDED Requirements

### Requirement: Local FFmpeg Binary Discovery
The system SHALL resolve the local FFmpeg binary path from `@ffmpeg-installer/ffmpeg` and inject `--ffmpeg-location` into all `yt-dlp` execution commands.

#### Scenario: Running yt-dlp on local Windows machine
- **WHEN** user initiates a YouTube download in local development
- **THEN** system locates `ffmpeg.exe` and passes `--ffmpeg-location` to `yt-dlp` to perform 1080p DASH stream remuxing.

### Requirement: High Quality Format Selection
The system SHALL select the highest resolution DASH video stream and audio stream and remux them into a playable MP4 container without defaulting to 360p format 18.

#### Scenario: User downloads Rickroll or high-res YouTube video
- **WHEN** user clicks download on a 1080p YouTube video
- **THEN** system extracts and streams the 1080p DASH video combined with audio.
