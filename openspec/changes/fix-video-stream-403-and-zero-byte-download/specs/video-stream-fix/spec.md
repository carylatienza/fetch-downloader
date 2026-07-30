# video-stream-fix Specification

## ADDED Requirements

### Requirement: yt-dlp video streaming includes player client extractor arguments
`getStreamWithYtDlp` and `getMetadataWithYtDlp` SHALL include `--extractor-args "youtube:player_client=android,web"` to bypass HTTP 403 Forbidden stream restrictions.

#### Scenario: User downloads a YouTube video
- **WHEN** the user requests a YouTube video download
- **THEN** `yt-dlp` executes with `player_client=android,web` flags
- **AND** binary video stream chunks deliver to the client without 403 Forbidden errors

### Requirement: Single progressive MP4 format is preferred for stdout streaming
`getStreamWithYtDlp` SHALL request format `-f "best[ext=mp4]/b/bestvideo+bestaudio/best"` when streaming to stdout `-o -`.

#### Scenario: Video stream piping to browser
- **WHEN** media is streamed directly to stdout
- **THEN** progressive MP4 format streams without FFmpeg pipe seeking failures
