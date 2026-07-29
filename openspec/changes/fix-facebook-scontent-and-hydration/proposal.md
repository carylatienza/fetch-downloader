## Why

1. **Facebook Image Preview Failure**: Facebook's Open Graph tags return `lookaside.fbsbx.com` HTML redirect URLs (`Content-Type: text/html`) which browsers reject inside `<img src="...">` tags. Fetching with crawler headers exposes direct `scontent-*.fbcdn.net` JPG image URLs (`Content-Type: image/jpeg`), enabling crisp image previews.
2. **Next.js Hydration Console Error**: Browser extensions (such as 1Password, LastPass, or form autofill) inject attributes like `fdprocessedid` into `<button>` and `<input>` elements before React finishes hydration. Adding `suppressHydrationWarning` to affected form elements silences these console hydration warnings.

## What Changes

- **Facebook Direct `scontent` CDN Extraction**: Update `FacebookExtractor` in `src/lib/extractors/facebook.js` to parse direct `scontent-*.fbcdn.net` JPG image URLs from the HTML response whenever `lookaside.fbsbx.com` URLs are encountered.
- **Hydration Warning Suppression**: Add `suppressHydrationWarning` to buttons and input fields in `src/components/UrlInput/UrlInput.js`.

## Capabilities

### New Capabilities
_(None)_

### Modified Capabilities
- `media-extraction`: Update Facebook photo extractor to extract high-resolution `scontent-*.fbcdn.net` binary image links.
- `frontend-ui`: Add `suppressHydrationWarning` on form inputs/buttons to ignore browser-extension injected attributes.

## Impact

- **Extractor Logic**: Modifies `FacebookExtractor` in `src/lib/extractors/facebook.js`.
- **UI Component**: Modifies `UrlInput` in `src/components/UrlInput/UrlInput.js`.
- **User Experience**: Facebook photo posts and share links render full high-resolution image previews natively in browser, and dev console stays 100% clean without hydration error warnings.
