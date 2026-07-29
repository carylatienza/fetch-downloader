## MODIFIED Requirements

### Requirement: Download streaming endpoint
The system SHALL expose a `GET /api/download` endpoint that streams high-resolution (up to 4K) media files from the source platform to the client's browser using FFmpeg DASH stream remuxing.

#### Scenario: Successful video download
- **WHEN** a valid download request is made for a video
- **THEN** system invokes yt-dlp with `--ffmpeg-location` and `-f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/bestvideo+bestaudio/best"`, streaming the merged high-resolution MP4 video file to the client
