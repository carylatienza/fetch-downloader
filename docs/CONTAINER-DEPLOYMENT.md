# 🐳 Deployment Guide

Fetch needs a real `yt-dlp` + `ffmpeg` runtime to download video, which
serverless platforms like Vercel/Netlify don't provide. The `Dockerfile` in
the repo root builds the whole app (Next.js frontend + Node.js + Python 3 +
`yt-dlp` + `ffmpeg`) as one deployable image.

---

## ✅ Recommended: single Docker deployment on Render

Deploy the entire app as one Docker service. No split architecture, no
`DOWNLOADER_SERVICE_URL` to wire up.

1. Push your repository to GitHub (already done if you're reading this from
   the deployed repo).
2. Go to the [Render Dashboard](https://dashboard.render.com/) → **New +** →
   **Web Service**.
3. Connect your GitHub repository.
4. Select **Docker** as the runtime — Render auto-detects the `Dockerfile`.
5. Set environment variables:
   - `NODE_ENV`: `production`
   - `PORT`: `3000` (Render overrides this with its own value at runtime;
     `next start` reads `process.env.PORT` either way)
   - `GOOGLE_SCRIPT_URL`: your Google Apps Script URL for the contact form
     (copy the value from your local `.env.local`)
   - Optional: `YTDLP_PROXY` / `HTTP_PROXY` / `HTTPS_PROXY` if YouTube starts
     rate-limiting Render's datacenter IP (see below)
   - Optional: `YTDLP_PLAYER_CLIENT` (e.g. `android,web`) if YouTube starts
     returning "Sign in to confirm you're not a bot" errors
6. Click **Create Web Service**. First build takes a few minutes (installs
   Python, ffmpeg, yt-dlp, then builds Next.js).
7. Once live, open the Render URL and confirm `/api/health` reports
   `ytdlp: true` and `ffmpeg: true`.

Leave `DOWNLOADER_SERVICE_URL` **unset** for this setup — the app detects its
own local `yt-dlp`/`ffmpeg` and never tries to delegate to a remote service.

---

## Local testing with Docker Compose

```bash
docker compose up -d --build
docker compose logs -f
```

Visit `http://localhost:3000` and confirm `/api/health` shows both
dependencies as `true`.

---

## 🛡️ If YouTube starts rate-limiting or bot-blocking

Datacenter IPs (Render, Railway, Fly, most cloud hosts) sometimes get
blocked or rate-limited by YouTube. Two independent escape hatches, both
configurable without a redeploy:

```env
# Route yt-dlp traffic through a proxy
YTDLP_PROXY=http://username:password@proxy-server.com:8080

# Force a specific yt-dlp extraction client if the default one gets blocked
YTDLP_PLAYER_CLIENT=android,web
```

---

## Alternative: split frontend (Vercel) + separate microservice

If you want Vercel's CDN/edge hosting for the frontend, you can instead
deploy *only* the yt-dlp/ffmpeg backend as its own container (same
Dockerfile, same steps above) and point the Vercel-hosted frontend at it:

1. Deploy the container per the steps above (Render/Railway/Fly/VPS).
2. In your Vercel project's environment variables, set
   `DOWNLOADER_SERVICE_URL=https://your-container-service.onrender.com`.
3. Redeploy the Vercel project.

This is more moving parts (two services to keep in sync, two places
env vars can drift) — only worth it if you specifically need Vercel's
frontend hosting. For most setups, the single-deployment option above is
simpler and has fewer failure modes.
