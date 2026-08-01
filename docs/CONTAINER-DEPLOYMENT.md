# 🐳 Dedicated Downloader Microservice Deployment Guide

This guide explains how to deploy the dedicated containerized backend microservice equipped with **Node.js, Python 3, `yt-dlp`, and `ffmpeg`** to guarantee 1080p/4K high-resolution DASH video downloads and bypass serverless execution limitations.

---

## 🛠️ Overview Architecture

- **Frontend / Next.js Web App**: Hosted on Vercel / Netlify or any platform.
- **Dedicated Downloader Container**: Hosted on Render, Railway, Fly.io, or any Docker VPS (DigitalOcean / Hetzner).
- **Environment Variable Link**:
  Set `DOWNLOADER_SERVICE_URL=https://your-container-service.onrender.com` in your Vercel / Next.js environment configuration.

---

## 🚀 Option 1: Deploy on Render (Free / Cheap Docker Hosting)

1. Push your repository to GitHub.
2. Go to [Render Dashboard](https://dashboard.render.com/) and click **New +** → **Web Service**.
3. Connect your repository.
4. Select **Docker** as the Runtime.
5. Render will automatically detect the `Dockerfile` in the root directory.
6. Set Environment Variables:
   - `NODE_ENV`: `production`
   - `PORT`: `3000`
7. Click **Create Web Service**.
8. Copy your Render service URL (e.g. `https://fetch-downloader-api.onrender.com`).
9. Paste it into your Vercel project environment settings as `DOWNLOADER_SERVICE_URL`.

---

## 🚂 Option 2: Deploy on Railway

1. Go to [Railway Dashboard](https://railway.app/).
2. Click **New Project** → **Deploy from GitHub Repo**.
3. Select your repository. Railway will detect `Dockerfile` automatically.
4. Add environment variables:
   - `PORT`: `3000`
5. Generate a Domain in settings (e.g. `https://fetch-downloader.up.railway.app`).
6. Add `DOWNLOADER_SERVICE_URL=https://fetch-downloader.up.railway.app` to Vercel settings.

---

## 🐋 Option 3: Local or VPS Deployment with Docker Compose

Run on your own server or local machine:

```bash
# Build and start container background service
docker compose up -d --build

# View container logs
docker compose logs -f
```

---

## 🛡️ Optional: Bypassing Datacenter IP Rate Limits

If video platforms block cloud server IPs (HTTP 429), add a residential or HTTP proxy to your container host or Vercel environment:

```env
YTDLP_PROXY=http://username:password@proxy-server.com:8080
```
