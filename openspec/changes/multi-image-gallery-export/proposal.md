## Why

Social media posts on Facebook, Instagram, and X often contain multiple photos (albums, carousels, and multi-image tweets). Currently, the downloader only extracts the single primary cover image. Users need the ability to view all images in a post, download individual photos, or export the entire photo collection as a single `.zip` archive in 1 click.

## What Changes

- **Multi-Image Extraction**: Update `FacebookExtractor`, `InstagramExtractor`, and `TwitterExtractor` to extract all full-resolution photo URLs into an `images: [...]` array.
- **Interactive Gallery UI**: Update `PreviewCard` in `src/components/PreviewCard/PreviewCard.js` with a multi-photo carousel switcher, thumbnail navigation dots/thumbnails, and image counter (`Photo X of Y`).
- **Batch `.zip` Downloader**: Install `jszip` dependency and update `/api/download` route to bundle multiple photos into a `.zip` archive on demand.

## Capabilities

### New Capabilities
_(None)_

### Modified Capabilities
- `media-extraction`: Extract multi-image arrays for Facebook albums, Instagram carousels, and X multi-photo tweets.
- `frontend-ui`: Add multi-photo carousel preview UI with individual image and batch `.zip` download triggers.
- `download-delivery`: Add `.zip` archive creation and streaming for multi-file gallery exports.

## Impact

- **Dependencies**: Adds `jszip` package to `package.json`.
- **Extractors**: Modifies Facebook, Instagram, and Twitter extractors.
- **UI & API**: Modifies `PreviewCard.js` and `/api/download/route.js`.
- **User Experience**: Users can preview all photos in multi-image posts and download individual images or the entire album as a `.zip` archive.
