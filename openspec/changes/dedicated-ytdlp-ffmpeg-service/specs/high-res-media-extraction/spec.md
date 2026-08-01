## ADDED Requirements

### Requirement: High Resolution DASH Video Remuxing
The system SHALL extract and stream high-resolution (1080p, 1440p, 4K) videos by combining separate DASH video and audio streams using `yt-dlp` and `ffmpeg`.

#### Scenario: User requests 1080p or 4K YouTube download
- **WHEN** user submits a YouTube URL for a video supporting 1080p or 4K resolution
- **THEN** system remuxes audio and video tracks into a unified MP4 stream and delivers it to the user.

### Requirement: Microservice Execution Delegation
The system SHALL delegate `yt-dlp` metadata extraction and video streaming to an external containerized service when `DOWNLOADER_SERVICE_URL` environment variable is configured.

#### Scenario: Deployed website processes download request via container service
- **WHEN** a request arrives on the deployed API route with `DOWNLOADER_SERVICE_URL` set
- **THEN** Next.js API routes forward extraction and streaming directly through the containerized microservice without CLI execution failure.

### Requirement: Docker Deployment Setup
The system SHALL provide a production-ready `Dockerfile` and `docker-compose.yml` containing Node.js, Python 3, `yt-dlp`, and `ffmpeg`.

#### Scenario: Building and deploying container service
- **WHEN** `docker build` or `docker compose up` is executed
- **THEN** container initializes with all necessary CLI dependencies available in PATH.
