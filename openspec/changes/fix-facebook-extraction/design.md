## Context

When users input Facebook photo or share URLs (e.g. `https://www.facebook.com/share/p/1BcdEDB77x/` or `https://www.facebook.com/photo/?fbid=1482575370573723`), Facebook detects desktop browser User-Agents and redirects to a JavaScript login wall SPA. The login wall HTML contains no `<meta property="og:image">` tags, causing `FacebookExtractor` to throw "Could not extract content from Facebook URL".

## Goals / Non-Goals

**Goals:**
- Extract public Facebook images from share URLs (`/share/p/...`), direct photo URLs (`/photo/?fbid=...`), and Facebook page posts.
- Maintain a zero-cost, 100% native fetch implementation without third-party paid APIs or external headless browser overhead.
- Cleanly decode image CDN links (`scontent.fbcdn.net`) and post titles.

**Non-Goals:**
- Private Facebook posts or closed group photos requiring user authentication (PRD explicitly scopes to public content only).

## Decisions

### 1. Facebook Crawler User-Agent

**Decision:** Send `facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)` in the `User-Agent` header when fetching Facebook URLs via `fetch()`.

**Rationale:** Facebook's servers recognize `facebookexternalhit` as their official link preview crawler and return server-rendered HTML containing `<meta property="og:image">` and `<meta property="og:title">` without redirecting to the login wall.

### 2. Direct FBID Resolution & Fallback Tag Extraction

**Decision:** 
1. If `yt-dlp` fails (for photo posts), fetch the URL using `facebookexternalhit/1.1`.
2. Extract `og:image` or `twitter:image` from HTML meta tags. Unescape `&amp;` entities to obtain clean CDN image URLs (`scontent-*.fbcdn.net`).
3. If URL contains `fbid` parameter (e.g. `photo/?fbid=1482575370573723`) and Open Graph tags are missing, fallback to constructing the lookaside media endpoint `https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=${fbid}`.

## Risks / Trade-offs

**[Facebook HTML layout changes]** → Mitigated by using Open Graph standard tags (`og:image`, `twitter:image`) which Facebook maintains for external social sharing and search engines.
