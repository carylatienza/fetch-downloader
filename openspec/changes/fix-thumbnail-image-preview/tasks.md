## 1. API Download Handler Inline Preview Proxying

- [x] 1.1 Update `src/app/api/download/route.js` to set `Content-Disposition: inline` when `preview=true` or `imageUrl` parameter is present

## 2. Preview Card Component Proxied Image Rendering

- [x] 2.1 Update `src/components/PreviewCard/PreviewCard.js` to wrap image/thumbnail sources with `/api/download?imageUrl=...&preview=true`
- [x] 2.2 Verify thumbnail preview rendering for Facebook, Instagram, and X end-to-end
