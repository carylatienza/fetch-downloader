## Why

Extracting photos and share links from public Facebook posts and Facebook pages currently fails with "Could not extract content from Facebook URL". This happens because Facebook redirects requests with standard desktop browser User-Agents to an unauthenticated React SPA login wall containing no Open Graph metadata. By sending Facebook's social crawler User-Agent (`facebookexternalhit/1.1`) and implementing `fbid` parameter resolution, we can bypass the login wall with zero external API costs.

## What Changes

- **Crawler User-Agent Header**: Update `FacebookExtractor` in `src/lib/extractors/facebook.js` to send `User-Agent: facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)` when scraping Facebook photo and share links.
- **FBID & Permalink Resolution**: Add parameter parsing for `fbid`, `story_fbid`, and `share/p/` URLs to resolve direct image CDN URLs (`scontent-*.fbcdn.net` or `lookaside.fbsbx.com`).
- **Open Graph Metadata Fallbacks**: Add multi-tier tag parsing for `og:image`, `twitter:image`, `og:title`, and `twitter:title` with HTML entity sanitization.

## Capabilities

### New Capabilities
_(None)_

### Modified Capabilities
- `media-extraction`: Update Facebook photo and post extraction to bypass login walls using crawler headers and `fbid` resolution.

## Impact

- **Extractor Logic**: Modifies `FacebookExtractor` in `src/lib/extractors/facebook.js`.
- **User Experience**: Facebook photo posts, page photos, and share links (`/share/p/...`) will extract high-resolution images and titles reliably.
- **Cost & Dependencies**: Zero extra costs, no external paid APIs (e.g. Firecrawl), 100% native Node.js fetch implementation.
