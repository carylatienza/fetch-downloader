## Why

The download feature currently fails because `/api/download` relies on server in-memory sessions that do not persist across Vercel serverless invocations, falling back to fetching webpage HTML instead of media streams. Additionally, submitting the URL input form throws `TypeError: onSubmit is not a function` due to a prop mismatch between `page.js` (`onExtract`) and `UrlInput.js` (`onSubmit`).

## What Changes

- Align component props in `UrlInput.js` to accept both `onExtract` and `onSubmit`, and both `externalUrl` and `initialValue`.
- Implement stateless download links and direct media URL proxying in `PreviewCard.js` and `/api/download/route.js`, bypassing RAM session loss on Vercel and local restarts.

## Capabilities

### New Capabilities
- `stateless-download-proxy`: Passes extracted media URLs directly to `/api/download` for stateless HTTP stream proxying across Vercel and local environments.
- `url-input-prop-alignment`: Standardizes component props in `UrlInput.js` to support both `onExtract` and `onSubmit`.

### Modified Capabilities

## Impact

- `src/components/UrlInput/UrlInput.js`: Fixes `onSubmit` / `onExtract` prop binding.
- `src/components/PreviewCard/PreviewCard.js`: Constructs stateless download query parameters with direct media URLs.
- `src/app/api/download/route.js`: Streams direct media URLs with attachment headers cleanly.
