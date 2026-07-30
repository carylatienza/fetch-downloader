## 1. Rickroll Sample Badges Update

- [x] 1.1 Update `PLATFORMS` sample URLs in `src/components/PlatformBadges/PlatformBadges.js` to active Rick Astley media links across YouTube, Instagram, Facebook, and X

## 2. Serverless Download & Extraction Reliability

- [x] 2.1 Update `/api/download/route.js` to catch binary stream failures gracefully and fallback to direct HTTP stream proxying
- [x] 2.2 Update extractor modules and `ytdlp.js` to handle missing binary environments on Vercel serverless without throwing unhandled `ENOENT` exceptions
- [x] 2.3 Verify extraction and download functionality on local server
