## 1. Verified Live Sample Badges Update

- [x] 1.1 Update `PLATFORMS` array in `src/components/PlatformBadges/PlatformBadges.js` with active, verified public Rick Astley media links for YouTube, Instagram, Facebook, and X

## 2. Client Download Error Validation

- [x] 2.1 Refactor `handleDownload` and `handleDownloadZip` in `src/components/PreviewCard/PreviewCard.js` to fetch and validate the download response status before saving blobs
- [x] 2.2 Add in-card error feedback banner state to `PreviewCard.js` to display user-friendly error messages if a download fails
- [x] 2.3 Verify extraction and download error validation end-to-end
