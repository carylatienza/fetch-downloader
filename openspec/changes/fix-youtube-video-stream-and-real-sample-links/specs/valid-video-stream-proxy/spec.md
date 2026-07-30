## ADDED Requirements

### Requirement: Video downloads shall stream valid H.264 MP4 video bytes
The `/api/download` route SHALL return a valid MP4 video stream when downloading videos, avoiding falling back to thumbnail image bytes or HTML web page bytes.

#### Scenario: User downloads YouTube video
- **WHEN** user clicks "Download Now" on a YouTube video preview card
- **THEN** `/api/download` fetches and streams valid MP4 video bytes
- **AND** the downloaded `.mp4` file plays cleanly in Windows Media Player without 0xC00D36C4 errors
