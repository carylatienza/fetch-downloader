## ADDED Requirements

### Requirement: Download streaming endpoint
The system SHALL expose a `GET /api/download` endpoint that streams media files from the source platform to the client's browser.

#### Scenario: Successful video download
- **WHEN** a valid download request is made with a download ID
- **THEN** system fetches the media from the source URL, sets `Content-Disposition: attachment` with a sanitized filename, sets the correct `Content-Type` header, and streams the file to the client

#### Scenario: Successful image download
- **WHEN** a valid image download request is made with a download ID
- **THEN** system fetches the image from the source URL and streams it to the client with proper Content-Type (image/jpeg or image/png) and Content-Disposition headers

#### Scenario: Download ID not found or expired
- **WHEN** a download request is made with an invalid or expired download ID
- **THEN** system returns a 404 error with code `NOT_FOUND` and message "Download not found or expired"

### Requirement: Filename sanitization
The system SHALL generate safe, descriptive filenames for downloaded media derived from the original media title.

#### Scenario: Title contains special characters
- **WHEN** the media title contains characters not safe for filenames (slashes, colons, etc.)
- **THEN** system removes or replaces unsafe characters and preserves the readable title

#### Scenario: Correct file extension
- **WHEN** a media file is downloaded
- **THEN** system appends the correct file extension based on media type (`.mp4` for video, `.jpg` or `.png` for images)

### Requirement: File size enforcement
The system SHALL enforce a maximum file size limit of 2GB per download.

#### Scenario: File within size limit
- **WHEN** the requested media file is under 2GB
- **THEN** system proceeds with the download normally

#### Scenario: File exceeds size limit
- **WHEN** the requested media file exceeds 2GB
- **THEN** system returns an error with a message indicating the file is too large to download

### Requirement: Download state management
The system SHALL maintain an in-memory map of active download sessions linking download IDs to source URLs and metadata.

#### Scenario: Download session created
- **WHEN** media extraction completes successfully via `/api/extract`
- **THEN** system stores the source URL, metadata, and a unique download ID in memory

#### Scenario: Download session expires
- **WHEN** a download session has not been accessed within 10 minutes
- **THEN** system removes the session from memory

### Requirement: Health check endpoint
The system SHALL expose a `GET /api/health` endpoint that reports server status and dependency availability.

#### Scenario: All dependencies available
- **WHEN** the health check endpoint is called and yt-dlp, ffmpeg, and Puppeteer are available
- **THEN** system returns status "ok" with uptime and dependency status for each tool
