# Fetch — Product Requirements Document (PRD)

> **Version:** 1.0
> **Last Updated:** July 29, 2025
> **Status:** Draft

---

## 1. Overview

**Fetch** is an all-in-one media downloader web application that allows users to download videos and images from any major social media platform through a single, unified interface. Instead of hunting for different downloader websites for different platforms — each riddled with ads and inconsistent quality — Fetch provides a clean, premium experience: paste a URL, preview the media, and download the best available quality.

---

## 2. Problem Statement

Downloading media from social platforms today is a fragmented, frustrating experience:

- **Fragmented tools** — Each platform requires a different downloader site (e.g., savefrom.net for YouTube, fbdown.net for Facebook, snapinsta for Instagram).
- **Poor quality** — Most free tools default to low resolution (480p, compressed images).
- **Hostile UX** — Sketchy sites loaded with popups, redirects, and misleading download buttons.
- **Unreliable** — Tools break frequently as platforms update their APIs.
- **No preview** — Users often download blindly, only to discover the quality is poor.

Creative professionals and everyday users deserve better.

---

## 3. Target Users

### Primary Users
- **Creative professionals** — Designers, video editors, content creators who need high-quality reference material, assets, and inspiration from social platforms.
- **Content curators** — People who collect and organize visual content for mood boards, presentations, or personal archives.

### Secondary Users
- **General consumers** — Anyone who wants to save a video or image from social media for personal use.
- **Students & researchers** — Those archiving visual content for academic or reference purposes.

### User Characteristics
- Comfortable with basic web interactions (copy/paste URLs).
- Value speed and quality over advanced configuration.
- Use multiple social media platforms regularly.
- Primarily desktop users (mobile secondary).

---

## 4. Core Features (V1)

### 4.1 Universal URL Input
- Single input field that accepts URLs from any supported platform.
- Auto-detection of platform and media type (video or image).
- Instant validation with clear feedback for unsupported URLs.

### 4.2 Media Preview
- Display a preview card after URL analysis showing:
  - **Thumbnail** — Visual preview of the media.
  - **Title / Caption** — The original title or caption from the source.
  - **Platform** — Identified source platform with icon.
  - **Media type** — Video or image indicator.
  - **Quality info** — Resolution, file size estimate (when available).
  - **Duration** — For videos, the length.

### 4.3 Best-Quality Download
- Automatically selects the highest available quality.
- Direct browser download — file saves to user's default download location.
- Proper filename derived from the media title.
- Correct file extension based on media type (MP4 for video, JPG/PNG for images).

### 4.4 Platform Support (V1)
| Priority | Platform  | Video | Image | Notes                          |
|----------|-----------|-------|-------|--------------------------------|
| 1        | YouTube   | ✅    | ✅*   | *Thumbnails only               |
| 2        | Facebook  | ✅    | ✅    | Public posts & reels           |
| 3        | Instagram | ✅    | ✅    | Public posts, reels, stories   |
| 4        | X/Twitter | ✅    | ✅    | Tweets with media              |

### 4.5 Informational Pages
- **About** — What Fetch is and why it exists.
- **How It Works** — Simple step-by-step guide.
- **FAQ** — Common questions and answers.
- **Terms of Service** — Usage terms and disclaimers.
- **Privacy Policy** — Data handling and privacy practices.

### 4.6 Error Handling
- Friendly, non-technical error messages for all failure states:
  - Invalid URL
  - Unsupported platform
  - Private/restricted content
  - Extraction failure
  - Rate limit exceeded
  - Network errors

### 4.7 Rate Limiting
- Per-IP rate limiting to prevent abuse:
  - **10 extractions per minute** per IP.
  - **3 concurrent downloads** per IP.
  - **2GB maximum file size** per download.
- Friendly UI message when limits are hit with countdown timer.

---

## 5. Non-Functional Requirements

### 5.1 Performance
- URL extraction should complete within **10 seconds** for most platforms.
- Page load time under **3 seconds** (excluding Render cold starts).
- Smooth, responsive UI with loading states and animations.

### 5.2 Reliability
- yt-dlp as primary extraction engine (actively maintained, rapid fixes).
- Custom extractors as supplementary layer for images.
- Graceful degradation when a platform extractor fails.

### 5.3 Security
- No user data stored on the server (stateless).
- Input sanitization on all URL inputs.
- Rate limiting to prevent DDoS and abuse.
- No cookies or tracking beyond what's necessary.

### 5.4 Responsiveness
- Desktop-first design.
- Functional on tablet and mobile viewports.
- Core download flow works on all screen sizes.

### 5.5 SEO
- Server-side rendered pages (Next.js SSR).
- Proper meta tags, Open Graph tags, and structured data.
- Semantic HTML throughout.
- Fast Core Web Vitals scores.

---

## 6. Technical Requirements

### 6.1 Tech Stack
| Layer      | Technology          | Purpose                      |
|------------|---------------------|------------------------------|
| Frontend   | Next.js (React)     | UI, SSR, routing             |
| Styling    | Vanilla CSS         | Design system, responsive    |
| Backend    | Next.js API Routes  | REST API endpoints           |
| Extraction | yt-dlp (Python)     | Video extraction engine      |
| Extraction | Custom scrapers     | Image extraction (HTTP+parse)|
| Fallback   | Puppeteer           | JS-rendered page extraction  |
| Media      | ffmpeg              | Optional format handling     |
| Deployment | Render.com          | Docker container hosting     |

### 6.2 API Endpoints
| Endpoint        | Method | Purpose                                |
|-----------------|--------|----------------------------------------|
| `/api/extract`  | POST   | Accept URL, return media metadata      |
| `/api/download` | GET    | Stream/proxy media file to browser     |
| `/api/health`   | GET    | Server health check                    |

### 6.3 Deployment
- **Platform:** Render.com (free tier).
- **Container:** Docker with Node.js, Python, yt-dlp, ffmpeg.
- **Cold start:** ~30-60 seconds after 15 min inactivity (acceptable for V1).
- **Auto-deploy:** Connected to GitHub, deploys on push to main branch.

---

## 7. Out of Scope (V1)

- User accounts / authentication.
- Batch / multi-URL downloads.
- Download history (server-side).
- Public API offering.
- Stock image site support (Getty, Shutterstock).
- Playlist downloads.
- Video format/quality selection (auto-best only).
- Mobile app.

> See [ROADMAP.md](./ROADMAP.md) for future feature plans.

---

## 8. Success Metrics

| Metric                          | Target                  |
|---------------------------------|-------------------------|
| Successful download rate        | > 90% of valid URLs     |
| Extraction time (p95)           | < 10 seconds            |
| Page load time                  | < 3 seconds             |
| Supported platform coverage     | 4 platforms at launch   |
| User-reported errors            | < 5% of sessions        |

---

## 9. Risks & Mitigations

| Risk                                      | Impact | Mitigation                                    |
|-------------------------------------------|--------|-----------------------------------------------|
| Platforms change APIs/block extractors     | High   | yt-dlp community provides rapid fixes         |
| Render free tier cold starts              | Medium | Acceptable for V1; upgrade path clear         |
| Legal takedown requests                   | Medium | Terms of service + DMCA process               |
| High traffic overwhelms free tier         | Low    | Rate limiting + upgrade when needed            |
| yt-dlp dependency becomes unmaintained    | Low    | Large community; forks would emerge            |

---

## 10. References

- [yt-dlp Documentation](https://github.com/yt-dlp/yt-dlp)
- [Next.js Documentation](https://nextjs.org/docs)
- [Render.com Documentation](https://docs.render.com)
