## MODIFIED Requirements

### Requirement: Best quality auto-selection
The system SHALL automatically select the highest available quality for both video and image downloads without requiring user input by parsing all formats in `info.formats`.

#### Scenario: YouTube video best quality
- **WHEN** a YouTube video URL is extracted
- **THEN** system determines the true maximum resolution height across all available formats (e.g. 1080p, 1440p, 2160p 4K) and selects the best combined DASH video+audio stream
