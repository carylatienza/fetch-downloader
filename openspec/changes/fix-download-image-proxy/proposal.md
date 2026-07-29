## Why

When downloading social media photos (such as Facebook image posts), `/api/download` currently fetches `session.sourceUrl` using a standard desktop Chrome User-Agent header. Facebook CDN inspects desktop User-Agent headers and returns HTML redirect text (`Content-Type: text/html`) instead of binary image bytes. As a result, the saved `.jpg` file contains HTML code, causing image viewers (like Windows Photos app) to error with "It looks like we don't support this file format". Sending crawler headers during proxy streaming ensures social CDNs return pure `image/jpeg` / `image/png` binary streams.

## What Changes

- **Crawler User-Agent Proxy Header**: Update the `fetch()` call in `src/app/api/download/route.js` to send `User-Agent: Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)` when proxy streaming images and direct files.
- **Content-Type Validation**: Ensure `/api/download` validates the response `Content-Type` and streams raw binary image data directly to the client.

## Capabilities

### New Capabilities
_(None)_

### Modified Capabilities
- `download-delivery`: Update `/api/download` proxy streaming route handler to fetch media assets using crawler headers.

## Impact

- **API Route**: Modifies `src/app/api/download/route.js`.
- **User Experience**: Downloaded `.jpg` and `.png` image files contain genuine binary image data and open seamlessly on Windows, macOS, iOS, Android, and all desktop image viewers.
