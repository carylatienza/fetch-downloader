## Why

Sample platform buttons currently contain dummy placeholder URLs (`CQsampleRickAstley`, `10158434778119854`, `1316000000000000000`) that fail extraction. Additionally, when a download fails on the server (`/api/download`), the browser downloads the raw JSON error response as a file named `download.json` instead of handling the error cleanly in the UI.

## What Changes

- Replace dummy platform sample URLs in `PlatformBadges.js` with live, verified public Rick Astley media links across YouTube, Instagram, Facebook, and X.
- Update `PreviewCard.js` to fetch and validate the download response status before saving files, displaying an error message banner on the UI instead of allowing `download.json` files to download.

## Capabilities

### New Capabilities
- `live-platform-sample-links`: Ensures all supported platform sample buttons use verified, active public URLs.
- `client-download-error-handling`: Intercepts non-200 download API responses to present user-facing error feedback rather than triggering raw `.json` file downloads.

### Modified Capabilities

## Impact

- `src/components/PlatformBadges/PlatformBadges.js`: Replaces placeholder URLs with live Rick Astley links.
- `src/components/PreviewCard/PreviewCard.js`: Enhances `handleDownload` to validate HTTP response before initiating blob save.
