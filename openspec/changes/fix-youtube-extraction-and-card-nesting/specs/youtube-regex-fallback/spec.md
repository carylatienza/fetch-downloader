## ADDED Requirements

### Requirement: YouTubeExtractor shall parse video ID fallback if yt-dlp binary is unavailable
When `getMetadataWithYtDlp` fails or is missing locally, `YouTubeExtractor` SHALL parse the video ID directly from YouTube URLs (`watch?v=`, `youtu.be/`, `shorts/`) and return a valid video metadata object.

#### Scenario: yt-dlp binary is unavailable
- **WHEN** user extracts a YouTube URL on a system without local `yt-dlp` installed
- **THEN** `YouTubeExtractor` parses the video ID and returns a metadata object with thumbnail `https://img.youtube.com/vi/<id>/maxresdefault.jpg`
