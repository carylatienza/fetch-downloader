## Context

Modern video hosting platforms split 1080p, 1440p, and 4K media streams into separate video-only and audio-only streams (DASH/HLS). Serving high-quality video exports requires executing `yt-dlp` and `ffmpeg` CLI tools to remux both tracks. Serverless host runtimes (such as Vercel/Netlify API routes) lack native CLI binaries, have short execution timeouts (10s), and use cloud datacenter IPs that get blocked by video platforms.

To solve this, we design a dedicated containerized microservice environment that bundles Python, `yt-dlp`, and `ffmpeg` alongside an HTTP extraction & streaming proxy interface.

## Goals / Non-Goals

**Goals:**
- Provide containerized Docker execution environment (`Dockerfile` & `docker-compose.yml`) containing Node.js, Python 3, `yt-dlp`, and `ffmpeg`.
- Enable seamless high-resolution (1080p, 2K, 4K) DASH video remuxing and streaming.
- Support external worker delegation via `DOWNLOADER_SERVICE_URL` with local CLI fallback for development.
- Implement streaming chunk pass-through without loading full video buffers into server memory.

**Non-Goals:**
- Building a complex multi-tenant queueing infrastructure (Redis/RabbitMQ) in this initial phase.
- Offloading audio/video remuxing to client WebAssembly.

## Decisions

1. **Standalone Microservice Container Endpoint**:
   - *Decision*: Next.js API routes check if `DOWNLOADER_SERVICE_URL` is set or if local CLI environment is available. If remote URL is set, Next.js proxies extraction and stream requests to the containerized service.
   - *Rationale*: Allows easy deployment on free/low-cost container hosts (Render, Railway, Fly.io, or VPS) while keeping the frontend hosted on Vercel.

2. **Stream Pass-Through without In-Memory Buffering**:
   - *Decision*: Next.js API routes stream the response body directly from the container backend using standard `ReadableStream` / `Response(stream)`.
   - *Rationale*: Prevents out-of-memory (OOM) errors and keeps RAM consumption minimal even for multi-gigabyte 4K downloads.

3. **Fallback & Environment Discovery**:
   - *Decision*: `ytdlp.js` dynamically tests CLI availability locally or proxies to `DOWNLOADER_SERVICE_URL`.

## Risks / Trade-offs

- **[Risk] Datacenter IP Rate Limiting** → *Mitigation*: Support custom `--extractor-args` and proxy configuration in `ytdlp.js` / environment variables.
- **[Risk] Long Video Transcode Timeouts** → *Mitigation*: Enable HTTP stream chunking so response headers are returned immediately while bytes stream out.
