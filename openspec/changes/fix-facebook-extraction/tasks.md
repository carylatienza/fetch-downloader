## 1. Facebook Extractor Crawler & FBID Parser Implementation

- [x] 1.1 Update `FacebookExtractor` in `src/lib/extractors/facebook.js` with `facebookexternalhit/1.1` crawler User-Agent
- [x] 1.2 Implement `fbid` parameter extraction and `lookaside.fbsbx.com` fallback resolver
- [x] 1.3 Add Open Graph image URL unescaping (`&amp;` -> `&`) and multi-tag fallback support
- [x] 1.4 Test Facebook share URLs (`/share/p/...`), direct photo URLs (`/photo/?fbid=...`), and Facebook page posts end-to-end
