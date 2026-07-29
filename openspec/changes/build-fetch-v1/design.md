## Context

Fetch is a greenfield all-in-one media downloader web application. There is no existing codebase. The project targets creative professionals and general users who are frustrated by fragmented, ad-riddled downloader sites that deliver inconsistent quality across platforms.

The application will be a full-stack Next.js app deployed as a Docker container on Render.com's free tier. It uses yt-dlp (Python) as the primary video extraction engine and custom HTTP-based scrapers for image extraction. The design system follows a premium dark glassmorphism aesthetic inspired by AuthKit/Linear, with a complete token system already defined in DESIGN.md, variables.css, theme.css, and tokens.json.

Key constraints:
- Render free tier: containers spin down after 15 min of inactivity (~30-60s cold start).
- No user accounts or database in V1 — fully stateless.
- Desktop-first responsive design.
- yt-dlp requires Python 3.x + ffmpeg in the Docker image.
- Puppeteer requires Chromium in the Docker image (fallback for JS-rendered pages).

## Goals / Non-Goals

**Goals:**
- Deliver a working, publicly deployable V1 that downloads videos and images from YouTube, Facebook, Instagram, and X.
- Provide the best available quality automatically (no manual quality selection).
- Create a premium, ad-free user experience with preview-before-download flow.
- Architect the extractor layer as a pluggable service for future API offering.
- Deploy for free using Render.com and Docker.

**Non-Goals:**
- User accounts, authentication, or server-side history.
- Batch/multi-URL downloads.
- Video quality or format selection UI.
- Stock image site support (Getty, Shutterstock).
- Mobile-first design (desktop-first, responsive to mobile).
- Public API (future — but architecture should support it).

## Decisions

### 1. Next.js App Router with API Routes

**Decision:** Use Next.js 15 with the App Router and colocated API routes for both frontend and backend.

**Rationale:** Single deployment unit simplifies infrastructure. API routes handle extraction and download streaming. SSR provides SEO benefits for informational pages. The user is already familiar with Next.js and Vercel-style workflows.

**Alternatives considered:**
- Separate Express backend + Next.js frontend → More complex deployment, two containers needed.
- Vite SPA + Express → Loses SSR/SEO benefits, more moving parts.

### 2. yt-dlp via Subprocess for Video Extraction

**Decision:** Spawn yt-dlp as a child process from Node.js using `--dump-json` for metadata and direct invocation for downloads.

**Rationale:** yt-dlp is the most actively maintained media extractor with 70+ contributors. It supports all 4 target platforms out of the box. JavaScript alternatives like `@distube/ytdl-core` break frequently when YouTube changes its player.

**Key commands:**
- Metadata: `yt-dlp --dump-json --no-download <url>`
- Best format selection: yt-dlp's `-f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best"` handles quality automatically.

**Alternatives considered:**
- `@distube/ytdl-core` → Fragile, breaks every few weeks, YouTube-only.
- cobalt API → External dependency, rate limits, no control.

### 3. Custom HTTP Scrapers for Image Extraction

**Decision:** Use server-side HTTP fetch + HTML/meta-tag parsing for image extraction. Puppeteer as fallback for JS-rendered pages.

**Rationale:** Images are embedded in page metadata (og:image, JSON-LD) on all target platforms. A simple HTTP fetch + cheerio parse is fast, lightweight, and reliable for 90% of cases. Puppeteer adds ~2-3s overhead and is reserved for when static parsing fails.

**Extraction strategies per platform:**
- YouTube: Thumbnail URL pattern `img.youtube.com/vi/{id}/maxresdefault.jpg`
- Instagram: Parse `og:image` meta tag or embedded `window.__additionalData` JSON.
- Facebook: Parse `og:image` meta tag from page HTML.
- X/Twitter: Parse `og:image` meta tag; append `?name=orig` for original resolution.

### 4. Pluggable Extractor Interface

**Decision:** Each platform extractor implements a common interface (`canHandle`, `extract`, `getDownloadStream`) registered in a central router.

**Rationale:** Adding new platforms means adding a new extractor file — no changes to the router or API routes. This architecture directly supports the future public API: same extraction layer, different access layer.

### 5. Download via Server Proxy Stream

**Decision:** The `/api/download` endpoint fetches the media from the source and streams it through to the client (proxy pattern), rather than redirecting the client to the source URL.

**Rationale:** Many platforms (especially YouTube) issue IP-bound or token-bound download URLs that won't work from the client's IP. Proxying through the server ensures the download always works. The server sets `Content-Disposition: attachment` headers for proper browser download behavior.

**Trade-off:** This uses server bandwidth. Acceptable for V1 on free tier; may need optimization at scale (caching, CDN, chunked responses).

### 6. In-Memory Rate Limiting

**Decision:** Use an in-memory Map-based sliding window for rate limiting, keyed by client IP.

**Rationale:** No database needed. Simple, fast, and sufficient for V1. State resets on server restart, which is acceptable — rate limiting is for abuse prevention, not billing.

**Limits:** 10 extractions/min/IP, 3 concurrent downloads/IP, 2GB max file size.

**Alternative considered:** Redis → Overkill for V1, adds infrastructure cost and complexity.

### 7. Vanilla CSS with Design Tokens

**Decision:** Use vanilla CSS with CSS Modules (`.module.css`) and the design token system from variables.css. No Tailwind, no CSS-in-JS.

**Rationale:** The design system has extremely specific glass-morphism shadows, frosted borders, and translucent surfaces that are easier to express in vanilla CSS than to map to utility classes. The user's design tokens are already defined as CSS custom properties.

**Font substitutes (free Google Fonts):**
- aeonikPro → Space Grotesk (display headings)
- Untitled Sans → Inter (body, UI)
- dotDigital → JetBrains Mono (eyebrow labels)

### 8. Lucide React for Icons

**Decision:** Use `lucide-react` for all icons including platform logos and UI icons.

**Rationale:** 1400+ icons, tree-shakeable, consistent stroke style that matches the design system's "outlined line-art mono glyphs." Includes YouTube, Facebook, Instagram, and Twitter icons. No additional icon library needed.

### 9. Docker Deployment on Render

**Decision:** Single Dockerfile bundling Node.js 20, Python 3, yt-dlp, ffmpeg, and Chromium. Deployed as a Web Service on Render.com free tier.

**Rationale:** Docker encapsulates all system dependencies. Render's free tier provides 750 hours/month, auto-deploy from GitHub, custom domain support, and HTTPS. Cold starts (~30-60s) are acceptable for V1.

## Risks / Trade-offs

**[Platform API changes break extractors]** → yt-dlp community typically patches within hours. Custom image scrapers are simple enough to fix quickly. Monitor yt-dlp releases.

**[Render free tier cold starts]** → First visitor after 15min idle waits ~30-60s. Mitigate with UptimeRobot pings every 14 min if needed. Acceptable for early user base.

**[Server bandwidth from proxy downloads]** → Large videos (500MB+) consume server bandwidth. Render free tier has no explicit bandwidth cap but may throttle. Monitor usage; upgrade to paid tier if needed.

**[yt-dlp + Chromium + ffmpeg = large Docker image]** → Image may be 800MB-1.2GB. Longer build times but acceptable — builds are infrequent. Use multi-stage builds to minimize final image size.

**[Instagram private content detection]** → Instagram aggressively blocks scraping. Initial support covers public posts only. May need to rotate user-agents or use yt-dlp's cookie support for edge cases.

**[Legal liability for downloaded content]** → Mitigate with Terms of Service, "personal use only" disclaimer, and DMCA takedown process. Fetch does not store content — acts as a pass-through.
