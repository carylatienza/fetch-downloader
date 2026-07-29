## 1. Project Initialization & Foundation Setup

- [x] 1.1 Scaffold Next.js 15 application with App Router in current directory
- [x] 1.2 Install required dependencies (`lucide-react`, `puppeteer`, `cheerio`)
- [x] 1.3 Configure Google Fonts (Space Grotesk, Inter, JetBrains Mono) in root layout
- [x] 1.4 Implement global CSS tokens and variables from `docs/variables.css` and `docs/theme.css`

## 2. Core Extractor Engine & Router

- [x] 2.1 Implement base extractor interface (`src/lib/extractors/base.js`) and URL validation utilities
- [x] 2.2 Build yt-dlp subprocess wrapper (`src/lib/ytdlp.js`) for metadata extraction and streaming
- [x] 2.3 Implement YouTube extractor (`src/lib/extractors/youtube.js`)
- [x] 2.4 Implement Facebook extractor (`src/lib/extractors/facebook.js`)
- [x] 2.5 Implement Instagram extractor (`src/lib/extractors/instagram.js`)
- [x] 2.6 Implement X/Twitter extractor (`src/lib/extractors/twitter.js`)
- [x] 2.7 Implement Puppeteer fallback utility (`src/lib/puppeteer.js`) for JS-rendered pages
- [x] 2.8 Implement central URL Router (`src/lib/extractors/index.js`) for platform auto-detection

## 3. Backend API Endpoints & Middleware

- [x] 3.1 Implement in-memory sliding window rate limiter (`src/lib/rateLimiter.js`)
- [x] 3.2 Implement `POST /api/extract` endpoint for metadata extraction
- [x] 3.3 Implement `GET /api/download` endpoint with proxy streaming and `Content-Disposition` header handling
- [x] 3.4 Implement `GET /api/health` endpoint for monitoring dependencies (yt-dlp, ffmpeg, puppeteer)

## 4. Design System Components & UI Modules

- [x] 4.1 Build Header component (`src/components/Header`) with logo and navigation links
- [x] 4.2 Build Footer component (`src/components/Footer`) with product and legal links
- [x] 4.3 Build UrlInput component (`src/components/UrlInput`) with client-side validation
- [x] 4.4 Build LoadingState component (`src/components/LoadingState`) with cycling status messages
- [x] 4.5 Build PreviewCard component (`src/components/PreviewCard`) with media preview and download CTA
- [x] 4.6 Build ErrorMessage component (`src/components/ErrorMessage`) for contextual error display
- [x] 4.7 Build PlatformBadges component (`src/components/PlatformBadges`) showcasing supported platforms

## 5. Page Views & SEO Integration

- [x] 5.1 Implement Home page (`src/app/page.js`) integrating Hero, UrlInput, LoadingState, and PreviewCard
- [x] 5.2 Implement About page (`src/app/about/page.js`) with content from `docs/CONTENT.md`
- [x] 5.3 Implement How It Works page (`src/app/how-it-works/page.js`) with 3-step guide and tips
- [x] 5.4 Implement FAQ page (`src/app/faq/page.js`) with collapsible accordion questions
- [x] 5.5 Implement Terms of Service page (`src/app/terms/page.js`)
- [x] 5.6 Implement Privacy Policy page (`src/app/privacy/page.js`)
- [x] 5.7 Add SEO metadata (title, meta description, Open Graph) to all page views

## 6. Dockerization & Deployment Verification

- [x] 6.1 Create Dockerfile bundling Node.js 20, Python 3, yt-dlp, ffmpeg, and Chromium
- [x] 6.2 Create `.dockerignore` file
- [x] 6.3 Test Docker container build locally and verify end-to-end extraction and download flow
