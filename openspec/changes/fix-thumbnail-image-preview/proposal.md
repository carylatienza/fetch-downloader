## Why

Social media platforms (Facebook `lookaside.fbsbx.com`, Instagram, X) return HTML redirect text pages (`Content-Type: text/html`) when client browsers attempt to load extracted image thumbnail URLs directly in `<img src="...">`. This triggers `onError()` in the browser and displays a gray fallback icon instead of the actual media photo preview.

## What Changes

- **Thumbnail Proxying in `PreviewCard`**: Update `PreviewCard` in `src/components/PreviewCard/PreviewCard.js` so that extracted photo/thumbnail URLs starting with `http` are rendered via the server proxy endpoint `/api/download?imageUrl=...` with `Content-Disposition: inline`.
- **Inline Image Streaming in `/api/download`**: Update `src/app/api/download/route.js` to accept `preview=true` or `imageUrl` parameters and return `Content-Disposition: inline` with `Content-Type: image/jpeg` when serving thumbnail image previews.

## Capabilities

### New Capabilities
_(None)_

### Modified Capabilities
- `frontend-ui`: Render image thumbnails using server-proxied preview URLs to guarantee rendering across hotlink-protected social CDNs.
- `download-delivery`: Support inline binary image streaming (`Content-Disposition: inline`) for thumbnail previews.

## Impact

- **UI Components**: Modifies `PreviewCard.js`.
- **API Handler**: Modifies `/api/download/route.js`.
- **User Experience**: Image previews for Facebook, Instagram, and X render reliably and instantly without gray fallback icons.
