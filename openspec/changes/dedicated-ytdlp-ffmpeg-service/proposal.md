## Why

Currently, high-quality video downloading (1080p, 4K) fails or defaults to low-resolution streams because YouTube/Facebook DASH streams require FFmpeg remuxing and `yt-dlp` CLI executions, which are unavailable or fail in serverless cloud deployments (e.g. Vercel). Additionally, cloud datacenter IPs get rate-limited or bot-blocked by video platforms. Establishing a dedicated Docker-based backend microservice environment equipped with Python, `yt-dlp`, `ffmpeg`, and proxy fallback mechanisms fixes high-res exports, prevents deployment crashes, and guarantees robust production downloading.

## What Changes

- Introduce a containerized backend microservice environment (Dockerfile + docker-compose) running Node.js, `yt-dlp`, and `ffmpeg`.
- Update Next.js API routes (`/api/extract` and `/api/download`) to delegate extraction and streaming to the dedicated microservice endpoint when deployed, with local fallback for development.
- Add configuration for proxy rotation / user-agent headers to mitigate datacenter IP blocking by video hosting providers.
- Implement robust error handling and stream pass-through for 1080p/4K DASH audio+video remuxing.

## Capabilities

### New Capabilities

- `high-res-media-extraction`: Standardized API client and backend service pipeline capable of 1080p/4K DASH video remuxing with `yt-dlp` and `ffmpeg` in production containerized environments.

### Modified Capabilities

- None

## Impact

- `src/lib/ytdlp.js`: Updated to target local or remote container execution seamlessly.
- `src/app/api/download/route.js`: Updated to handle chunked streaming pass-through from dedicated backend container.
- `Dockerfile` & Deployment configuration: Enhanced to build a production container image with Node.js, Python3, `yt-dlp`, and `ffmpeg`.
- Environment Variables: Added `DOWNLOADER_SERVICE_URL` and optional proxy environment configurations.
