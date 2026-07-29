## Why

Downloading videos and images from social media platforms today requires using a different downloader website for each platform — each riddled with ads, popup redirects, and inconsistent quality. Creative professionals and everyday users waste significant time navigating this fragmented landscape, often settling for degraded media quality. Fetch solves this by providing a single, premium, ad-free interface to download videos and images from YouTube, Facebook, Instagram, and X at the best available quality.

## What Changes

- **New web application**: Full-stack Next.js application deployed on Render.com (Docker container) providing a universal media download experience.
- **Media extraction engine**: Backend service wrapping yt-dlp for video extraction and custom HTTP-based scrapers for image extraction across 4 platforms.
- **URL auto-detection**: Automatic platform detection from pasted URLs, routing to the correct extractor.
- **Preview-before-download flow**: Extract and display media metadata (thumbnail, title, quality, file size) before the user commits to downloading.
- **Direct browser download**: Stream media files to the client with proper Content-Disposition headers for native browser download.
- **Rate limiting**: Per-IP rate limiting (10 extractions/min, 3 concurrent downloads, 2GB max file size) to prevent abuse on a public-facing tool.
- **Informational pages**: About, How It Works, FAQ, Terms of Service, and Privacy Policy pages with full SEO optimization.
- **Premium glassmorphism UI**: Dark-theme frosted-glass design system inspired by AuthKit/Linear aesthetic with blueprint grid backgrounds and luminous text.

## Capabilities

### New Capabilities
- `media-extraction`: Platform detection, URL routing, yt-dlp video extraction, custom image scraping, and metadata retrieval across YouTube, Facebook, Instagram, and X.
- `download-delivery`: Media file streaming/proxying to the browser with proper headers, filename sanitization, and file size enforcement.
- `rate-limiting`: Per-IP request throttling and concurrent download limits to protect the public-facing service from abuse.
- `frontend-ui`: Complete frontend including hero/URL input, loading states, preview cards, error handling, and all informational pages with the frosted-glass design system.

### Modified Capabilities
_(None — this is a greenfield project.)_

## Impact

- **New codebase**: Entire Next.js project scaffolded from scratch.
- **System dependencies**: Requires Python 3.x, yt-dlp, ffmpeg, and Chromium (for Puppeteer fallback) — all bundled via Dockerfile.
- **Deployment**: Docker container on Render.com free tier with auto-deploy from GitHub.
- **External dependencies**: npm packages including next, react, lucide-react, puppeteer; Python package yt-dlp.
- **Third-party platform dependency**: Extraction relies on platform page structure and yt-dlp's compatibility — subject to platform changes.
