## ADDED Requirements

### Requirement: Platform detection from URL
The system SHALL automatically detect the source platform from a pasted URL by matching against known URL patterns for each supported platform.

#### Scenario: YouTube URL detected
- **WHEN** user submits a URL matching `youtube.com/watch`, `youtu.be/`, or `youtube.com/shorts/`
- **THEN** system identifies the platform as "youtube" and routes to the YouTube extractor

#### Scenario: Facebook URL detected
- **WHEN** user submits a URL matching `facebook.com/*/videos/`, `facebook.com/watch`, `fb.watch/`, `facebook.com/photo`, or `facebook.com/*/photos/`
- **THEN** system identifies the platform as "facebook" and routes to the Facebook extractor

#### Scenario: Instagram URL detected
- **WHEN** user submits a URL matching `instagram.com/p/`, `instagram.com/reel/`, or `instagram.com/stories/`
- **THEN** system identifies the platform as "instagram" and routes to the Instagram extractor

#### Scenario: X/Twitter URL detected
- **WHEN** user submits a URL matching `twitter.com/*/status/` or `x.com/*/status/`
- **THEN** system identifies the platform as "twitter" and routes to the X/Twitter extractor

#### Scenario: Unsupported platform
- **WHEN** user submits a URL that does not match any supported platform pattern
- **THEN** system returns an error with code `UNSUPPORTED_PLATFORM` and a list of supported platforms

### Requirement: URL validation
The system SHALL validate that the submitted input is a well-formed URL before attempting extraction.

#### Scenario: Invalid URL submitted
- **WHEN** user submits a string that is not a valid URL
- **THEN** system returns an error with code `INVALID_URL` and message "Please enter a valid URL"

#### Scenario: Valid URL submitted
- **WHEN** user submits a properly formatted URL
- **THEN** system proceeds to platform detection

### Requirement: Video extraction via yt-dlp
The system SHALL extract video metadata and download URLs using yt-dlp as a subprocess for all supported platforms.

#### Scenario: Successful video metadata extraction
- **WHEN** a video URL is submitted from a supported platform
- **THEN** system returns metadata including: title, thumbnail URL, duration (seconds), quality (resolution string), estimated file size, format (e.g., "mp4"), and a download identifier

#### Scenario: yt-dlp extraction failure
- **WHEN** yt-dlp fails to extract media (private content, removed video, platform error)
- **THEN** system returns an appropriate error code (`PRIVATE_CONTENT` or `EXTRACTION_FAILED`) with a user-friendly message

### Requirement: Image extraction via custom scrapers
The system SHALL extract image URLs and metadata from platform pages using server-side HTTP fetch and HTML/meta-tag parsing.

#### Scenario: Instagram image extraction
- **WHEN** an Instagram post URL containing an image is submitted
- **THEN** system extracts the full-resolution image URL from page metadata (og:image or embedded JSON)

#### Scenario: X/Twitter image extraction
- **WHEN** a tweet URL containing an image is submitted
- **THEN** system extracts the original-resolution image URL (with `?name=orig` parameter for maximum quality)

#### Scenario: Facebook image extraction
- **WHEN** a Facebook photo URL is submitted
- **THEN** system extracts the full-resolution image URL from page metadata

#### Scenario: Fallback to Puppeteer
- **WHEN** static HTML parsing fails to extract media URLs from a supported platform page
- **THEN** system falls back to Puppeteer headless browser rendering to extract media from the JavaScript-rendered page

### Requirement: Best quality auto-selection
The system SHALL automatically select the highest available quality for both video and image downloads without requiring user input.

#### Scenario: YouTube video best quality
- **WHEN** a YouTube video URL is extracted
- **THEN** system selects the best available MP4 format (preferring `bestvideo[ext=mp4]+bestaudio[ext=m4a]`)

#### Scenario: Image original resolution
- **WHEN** an image URL is extracted from any platform
- **THEN** system selects the original/highest resolution version available

### Requirement: Extractor plugin interface
Each platform extractor SHALL implement a common interface with `canHandle(url)`, `extract(url)`, and `getDownloadStream(sourceUrl)` methods.

#### Scenario: Adding a new platform extractor
- **WHEN** a new platform extractor is created implementing the base interface
- **THEN** it can be registered in the URL router without modifying existing extractors or API routes

### Requirement: Extract API endpoint
The system SHALL expose a `POST /api/extract` endpoint that accepts a URL and returns media metadata.

#### Scenario: Successful extraction
- **WHEN** a valid, supported URL is submitted to `POST /api/extract`
- **THEN** system returns JSON with `success: true` and data containing platform, mediaType, title, thumbnail, duration, quality, fileSize, format, and downloadId

#### Scenario: Error response format
- **WHEN** extraction fails for any reason
- **THEN** system returns JSON with `success: false` and an error object containing code and message
