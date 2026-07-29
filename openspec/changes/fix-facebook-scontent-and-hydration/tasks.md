## 1. Facebook Extractor Direct `scontent` CDN Resolver

- [x] 1.1 Update `FacebookExtractor` in `src/lib/extractors/facebook.js` to switch User-Agent to `Googlebot` and extract direct `scontent-*.fbcdn.net` JPG image URLs
- [x] 1.2 Verify `scontent` extraction on Facebook share links (`/share/p/...`) and photo posts end-to-end

## 2. Next.js Hydration Mismatch Warning Suppression

- [x] 2.1 Add `suppressHydrationWarning` to `<input>` and `<button>` elements in `src/components/UrlInput/UrlInput.js`
- [x] 2.2 Verify browser console hydration error elimination
