# Fetch — Building Guide

> **Version:** 1.0
> **Last Updated:** July 29, 2025

---

## 1. Architecture Overview

```
  SYSTEM ARCHITECTURE
  ═══════════════════════════════════════════════════════════════

  ┌──────────────────────── Render.com (Docker) ──────────────────┐
  │                                                               │
  │  ┌──────────────────── Next.js Application ────────────────┐  │
  │  │                                                         │  │
  │  │  PAGES (SSR)                   API ROUTES               │  │
  │  │  ┌───────────────────┐   ┌──────────────────────────┐   │  │
  │  │  │ /                 │   │ /api/extract             │   │  │
  │  │  │ /about            │   │ /api/download            │   │  │
  │  │  │ /how-it-works     │   │ /api/health              │   │  │
  │  │  │ /faq              │   │                          │   │  │
  │  │  │ /terms            │   └────────────┬─────────────┘   │  │
  │  │  │ /privacy          │                │                 │  │
  │  │  └───────────────────┘                │                 │  │
  │  │                                       ▼                 │  │
  │  │                          ┌────────────────────────────┐  │  │
  │  │                          │     EXTRACTOR SERVICE      │  │  │
  │  │                          │                            │  │  │
  │  │                          │  ┌──────────────────────┐  │  │  │
  │  │                          │  │    URL Router        │  │  │  │
  │  │                          │  │ Detect platform from │  │  │  │
  │  │                          │  │ URL pattern          │  │  │  │
  │  │                          │  └──────────┬───────────┘  │  │  │
  │  │                          │             │              │  │  │
  │  │                          │     ┌───────┼───────┐      │  │  │
  │  │                          │     ▼       ▼       ▼      │  │  │
  │  │                          │  ┌─────┐ ┌─────┐ ┌─────┐  │  │  │
  │  │                          │  │ YT  │ │ FB  │ │ IG  │  │  │  │
  │  │                          │  │     │ │     │ │     │  │  │  │
  │  │                          │  │     │ │     │ │     │  │  │  │
  │  │                          │  └─────┘ └─────┘ └─────┘  │  │  │
  │  │                          │  ┌─────┐                   │  │  │
  │  │                          │  │  X  │                   │  │  │
  │  │                          │  └─────┘                   │  │  │
  │  │                          └────────────────────────────┘  │  │
  │  │                                                         │  │
  │  └─────────────────────────────────────────────────────────┘  │
  │                                                               │
  │  SYSTEM DEPENDENCIES                                          │
  │  ├── Python 3.x                                               │
  │  ├── yt-dlp (video extraction)                                │
  │  ├── ffmpeg (media processing)                                │
  │  └── Puppeteer/Chromium (fallback scraping)                   │
  │                                                               │
  └───────────────────────────────────────────────────────────────┘
```

---

## 2. Tech Stack Details

### 2.1 Frontend

| Technology      | Version    | Purpose                                 |
|-----------------|------------|-----------------------------------------|
| Next.js         | 15.x       | React framework, SSR, routing, API      |
| React           | 19.x       | UI components                           |
| Vanilla CSS     | —          | Styling (no Tailwind, no CSS-in-JS)     |

**Frontend Principles:**
- Component-based architecture.
- CSS Modules or global CSS with BEM naming.
- Desktop-first responsive design.
- Semantic HTML for accessibility & SEO.
- Loading states and micro-animations for premium feel.

### 2.2 Backend (API Routes)

| Technology      | Version    | Purpose                                 |
|-----------------|------------|-----------------------------------------|
| Next.js API     | 15.x       | REST endpoints within Next.js           |
| yt-dlp          | latest     | Video extraction (spawned as subprocess)|
| Puppeteer       | latest     | Headless browser for image extraction   |
| ffmpeg          | latest     | Optional media format handling          |

### 2.3 Infrastructure

| Technology      | Purpose                                         |
|-----------------|-------------------------------------------------|
| Docker          | Containerization (yt-dlp, ffmpeg, Puppeteer)    |
| Render.com      | Hosting (free tier, Docker support)             |
| GitHub          | Source control + CI/CD trigger                  |

---

## 3. Project Structure

```
  fetch/
  │
  ├── docs/                        # Project documentation
  │   ├── PRD.md
  │   ├── USER-FLOW.md
  │   ├── SITEMAP.md
  │   ├── BUILDING.md              # (this file)
  │   ├── DESIGN.md                # (user-provided)
  │   └── ROADMAP.md
  │
  ├── public/                      # Static assets
  │   ├── favicon.ico
  │   ├── og-image.png             # Open Graph preview image
  │   └── icons/                   # Platform icons
  │       ├── youtube.svg
  │       ├── facebook.svg
  │       ├── instagram.svg
  │       └── x.svg
  │
  ├── src/
  │   ├── app/                     # Next.js App Router
  │   │   ├── layout.js            # Root layout (header, footer)
  │   │   ├── page.js              # Home page (/)
  │   │   ├── page.module.css
  │   │   ├── globals.css          # Global styles & design tokens
  │   │   │
  │   │   ├── about/
  │   │   │   └── page.js          # /about
  │   │   │
  │   │   ├── how-it-works/
  │   │   │   └── page.js          # /how-it-works
  │   │   │
  │   │   ├── faq/
  │   │   │   └── page.js          # /faq
  │   │   │
  │   │   ├── terms/
  │   │   │   └── page.js          # /terms
  │   │   │
  │   │   ├── privacy/
  │   │   │   └── page.js          # /privacy
  │   │   │
  │   │   └── api/                 # API Routes
  │   │       ├── extract/
  │   │       │   └── route.js     # POST /api/extract
  │   │       ├── download/
  │   │       │   └── route.js     # GET /api/download
  │   │       └── health/
  │   │           └── route.js     # GET /api/health
  │   │
  │   ├── components/              # Reusable UI components
  │   │   ├── Header/
  │   │   │   ├── Header.js
  │   │   │   └── Header.module.css
  │   │   ├── Footer/
  │   │   │   ├── Footer.js
  │   │   │   └── Footer.module.css
  │   │   ├── UrlInput/
  │   │   │   ├── UrlInput.js
  │   │   │   └── UrlInput.module.css
  │   │   ├── PreviewCard/
  │   │   │   ├── PreviewCard.js
  │   │   │   └── PreviewCard.module.css
  │   │   ├── LoadingState/
  │   │   │   ├── LoadingState.js
  │   │   │   └── LoadingState.module.css
  │   │   ├── ErrorMessage/
  │   │   │   ├── ErrorMessage.js
  │   │   │   └── ErrorMessage.module.css
  │   │   └── PlatformBadges/
  │   │       ├── PlatformBadges.js
  │   │       └── PlatformBadges.module.css
  │   │
  │   ├── lib/                     # Backend logic
  │   │   ├── extractors/          # Platform extractors
  │   │   │   ├── index.js         # Router — detects platform, delegates
  │   │   │   ├── youtube.js       # YouTube extractor (yt-dlp wrapper)
  │   │   │   ├── facebook.js      # Facebook extractor
  │   │   │   ├── instagram.js     # Instagram extractor
  │   │   │   ├── twitter.js       # X/Twitter extractor
  │   │   │   └── base.js          # Base extractor class/interface
  │   │   │
  │   │   ├── ytdlp.js             # yt-dlp subprocess wrapper
  │   │   ├── scraper.js           # HTTP fetch + HTML parser utils
  │   │   ├── puppeteer.js         # Puppeteer instance manager
  │   │   ├── rateLimiter.js       # Rate limiting middleware
  │   │   ├── validators.js        # URL validation utilities
  │   │   └── constants.js         # Platform patterns, config values
  │   │
  │   └── utils/                   # Shared utilities
  │       ├── formatFileSize.js    # Human-readable file sizes
  │       ├── formatDuration.js    # Human-readable durations
  │       └── sanitize.js          # Input sanitization
  │
  ├── Dockerfile                   # Docker config for Render
  ├── .dockerignore
  ├── next.config.js               # Next.js configuration
  ├── package.json
  ├── package-lock.json
  └── README.md
```

---

## 4. API Specification

### 4.1 `POST /api/extract`

Accepts a URL, detects the platform, extracts media metadata.

**Request:**
```json
{
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "platform": "youtube",
    "mediaType": "video",
    "title": "Rick Astley - Never Gonna Give You Up",
    "thumbnail": "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    "duration": 212,
    "quality": "1080p",
    "fileSize": 47185920,
    "format": "mp4",
    "downloadId": "abc123-unique-id"
  }
}
```

**Error Response (400 — Invalid URL):**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_URL",
    "message": "Please enter a valid URL."
  }
}
```

**Error Response (400 — Unsupported Platform):**
```json
{
  "success": false,
  "error": {
    "code": "UNSUPPORTED_PLATFORM",
    "message": "This platform is not supported yet.",
    "supportedPlatforms": ["youtube", "facebook", "instagram", "twitter"]
  }
}
```

**Error Response (403 — Private Content):**
```json
{
  "success": false,
  "error": {
    "code": "PRIVATE_CONTENT",
    "message": "This content is private and can't be downloaded."
  }
}
```

**Error Response (429 — Rate Limited):**
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMITED",
    "message": "Too many requests. Please wait before trying again.",
    "retryAfter": 45
  }
}
```

**Error Response (500 — Extraction Failed):**
```json
{
  "success": false,
  "error": {
    "code": "EXTRACTION_FAILED",
    "message": "Something went wrong. Please try again."
  }
}
```

---

### 4.2 `GET /api/download`

Streams the media file to the client's browser.

**Request:**
```
GET /api/download?id=abc123-unique-id
```

**Success Response (200):**
- Content-Type: `video/mp4` | `image/jpeg` | `image/png` | etc.
- Content-Disposition: `attachment; filename="Rick Astley - Never Gonna Give You Up.mp4"`
- Body: Binary file stream.

**Error Response (404):**
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Download not found or expired."
  }
}
```

---

### 4.3 `GET /api/health`

Health check endpoint for monitoring.

**Response (200):**
```json
{
  "status": "ok",
  "uptime": 3600,
  "version": "1.0.0",
  "dependencies": {
    "ytdlp": true,
    "ffmpeg": true,
    "puppeteer": true
  }
}
```

---

## 5. Extractor Architecture

### 5.1 Plugin Pattern

Each platform extractor follows the same interface, making it easy to add new platforms:

```
  EXTRACTOR INTERFACE
  ═══════════════════════════════════════════════════

  Every extractor must implement:

  class BaseExtractor {

    // Check if this extractor handles the given URL
    canHandle(url) → boolean

    // Extract media metadata from the URL
    extract(url) → {
      platform: string,
      mediaType: 'video' | 'image',
      title: string,
      thumbnail: string,
      duration: number | null,
      quality: string,
      fileSize: number | null,
      format: string,
      sourceUrl: string          // Direct media URL
    }

    // Get the download stream for the media
    getDownloadStream(sourceUrl) → ReadableStream
  }
```

### 5.2 URL Router

```
  URL → EXTRACTOR ROUTING
  ═══════════════════════════════════════════════════

  URL Patterns:

  YouTube:
    • youtube.com/watch?v=*
    • youtu.be/*
    • youtube.com/shorts/*

  Facebook:
    • facebook.com/*/videos/*
    • facebook.com/watch*
    • fb.watch/*
    • facebook.com/photo*
    • facebook.com/*/photos/*

  Instagram:
    • instagram.com/p/*
    • instagram.com/reel/*
    • instagram.com/stories/*

  X/Twitter:
    • twitter.com/*/status/*
    • x.com/*/status/*

  Router logic:
  1. Parse the URL hostname
  2. Match against known platform patterns
  3. Return the appropriate extractor instance
  4. If no match → return UNSUPPORTED_PLATFORM error
```

### 5.3 Extraction Strategy per Platform

| Platform  | Video Extraction         | Image Extraction              |
|-----------|--------------------------|-------------------------------|
| YouTube   | yt-dlp (subprocess)      | Known thumbnail URL pattern   |
| Facebook  | yt-dlp + custom scraper  | og:image meta tag parsing     |
| Instagram | yt-dlp (reels/videos)    | HTML/JSON parsing for images  |
| X/Twitter | yt-dlp + custom scraper  | pbs.twimg.com URL extraction  |

---

## 6. Download Flow (Technical)

```
  DOWNLOAD PIPELINE
  ═══════════════════════════════════════════════════

  Client                    Server                     Source
  ──────                    ──────                     ──────

  POST /api/extract ───────▶ │
  { url: "..." }             │
                             │  1. Validate URL
                             │  2. Detect platform
                             │  3. Select extractor
                             │  4. Extract metadata
                             │     (yt-dlp or scraper)
                             │  5. Store download info
                             │     in memory (temp map)
                             │  6. Generate downloadId
  ◄─────────── 200 ─────────│
  { data: { downloadId,     │
    title, thumbnail, ... }} │
                             │
  User clicks Download       │
                             │
  GET /api/download ────────▶ │
  ?id=<downloadId>            │
                             │  7. Look up sourceUrl
                             │     from downloadId
                             │  8. Fetch media from ──────▶ Platform
                             │     source URL                CDN
                             │
                             │  9. Set response headers:
                             │     Content-Disposition
                             │     Content-Type
                             │     Content-Length
                             │
  ◄──── File stream ─────── │ ◄──── File stream ────── Platform
                             │                          CDN
  Browser saves file         │
```

---

## 7. Rate Limiting Implementation

```
  RATE LIMITING
  ═══════════════════════════════════════════════════

  Strategy: In-memory sliding window per IP

  Limits:
  ├── /api/extract:  10 requests / 60 seconds / IP
  ├── /api/download: 3 concurrent requests / IP
  └── File size cap: 2GB per download

  Implementation:
  ├── Use a Map<string, RequestLog[]> in memory
  ├── Key = client IP (from request headers)
  ├── Clean up expired entries periodically
  └── Return 429 with retryAfter header when exceeded

  Note: In-memory rate limiting resets on server restart.
  This is acceptable for V1. For production scale,
  consider Redis-based rate limiting.
```

---

## 8. Dockerfile

```dockerfile
FROM node:20-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    ffmpeg \
    chromium \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Install yt-dlp
RUN pip3 install --break-system-packages yt-dlp

# Set Puppeteer to use installed Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Set working directory
WORKDIR /app

# Install Node dependencies
COPY package*.json ./
RUN npm ci --production

# Copy application code
COPY . .

# Build Next.js
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
```

---

## 9. Environment Variables

| Variable                       | Required | Default         | Description                     |
|--------------------------------|----------|-----------------|---------------------------------|
| `NODE_ENV`                     | Yes      | `production`    | Environment mode                |
| `PORT`                         | No       | `3000`          | Server port                     |
| `RATE_LIMIT_WINDOW_MS`        | No       | `60000`         | Rate limit window (ms)          |
| `RATE_LIMIT_MAX_REQUESTS`     | No       | `10`            | Max requests per window         |
| `MAX_CONCURRENT_DOWNLOADS`    | No       | `3`             | Max concurrent downloads per IP |
| `MAX_FILE_SIZE_BYTES`         | No       | `2147483648`    | Max download size (2GB)         |
| `PUPPETEER_EXECUTABLE_PATH`   | No       | System default  | Chromium binary path            |

---

## 10. Build Order (Implementation Phases)

### Phase 1: Foundation
1. Initialize Next.js project.
2. Set up project structure (folders, config files).
3. Create global CSS with design tokens.
4. Build Header and Footer components.
5. Create the root layout.

### Phase 2: Pages (Static)
6. Build Home page (UI only, no functionality).
7. Build About page.
8. Build How It Works page.
9. Build FAQ page.
10. Build Terms of Service page.
11. Build Privacy Policy page.

### Phase 3: Core Backend
12. Create URL validator utility.
13. Build URL router (platform detection).
14. Build base extractor interface.
15. Implement YouTube extractor (yt-dlp wrapper).
16. Implement Facebook extractor.
17. Implement Instagram extractor.
18. Implement X/Twitter extractor.
19. Build `/api/extract` endpoint.
20. Build `/api/download` endpoint.
21. Build `/api/health` endpoint.

### Phase 4: Frontend Integration
22. Wire up URL input → `/api/extract`.
23. Build loading state component.
24. Build preview card component.
25. Wire up download button → `/api/download`.
26. Build error message components.
27. Implement all error states.

### Phase 5: Production Readiness
28. Implement rate limiting middleware.
29. Add input sanitization.
30. Create Dockerfile.
31. Test on Render.com deployment.
32. Add SEO meta tags to all pages.
33. Performance optimization.

---

## 11. Development Setup

### Prerequisites
- Node.js 20+
- Python 3.x
- ffmpeg
- Git

### Local Development
```bash
# Clone the repository
git clone <repo-url>
cd fetch

# Install dependencies
npm install

# Install yt-dlp (globally or in venv)
pip install yt-dlp

# Run development server
npm run dev

# Open http://localhost:3000
```

### Docker Local Testing
```bash
# Build the Docker image
docker build -t fetch .

# Run the container
docker run -p 3000:3000 fetch

# Open http://localhost:3000
```

---

## 12. Deployment (Render.com)

### Steps
1. Push code to GitHub.
2. Create a new **Web Service** on Render.
3. Connect your GitHub repository.
4. Set **Environment** to `Docker`.
5. Set **Instance Type** to `Free`.
6. Add environment variables if needed.
7. Click **Deploy**.

### Auto-Deploy
- Every push to `main` branch triggers a new deployment.
- Render builds the Docker image and deploys automatically.

### Custom Domain (Optional)
- In Render dashboard → Settings → Custom Domains.
- Add your domain and update DNS records.
