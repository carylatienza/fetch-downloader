## 1. Container & Deployment Configuration Setup

- [x] 1.1 Create production `Dockerfile` featuring Node.js 20, Python 3, `yt-dlp`, and `ffmpeg` CLI tools.
- [x] 1.2 Create `docker-compose.yml` for local container testing and production deployment.

## 2. Media Helper & Microservice Integration

- [x] 2.1 Update `src/lib/ytdlp.js` to support remote microservice proxy extraction via `DOWNLOADER_SERVICE_URL`.
- [x] 2.2 Add HTTP stream proxying to `src/app/api/download/route.js` for handling 1080p/4K audio+video remuxed streams.

## 3. Environment & Documentation

- [x] 3.1 Document `DOWNLOADER_SERVICE_URL` and proxy environment variables in `.env.example`.
- [x] 3.2 Add deployment guide in `docs/` for hosting the dedicated container on Render / Railway / Fly.io / VPS.
