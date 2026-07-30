## 1. UrlInput Prop Alignment

- [x] 1.1 Update `src/components/UrlInput/UrlInput.js` prop destructuring to support both `onExtract` and `onSubmit`, and both `externalUrl` and `initialValue`

## 2. Stateless Download Stream Proxying

- [x] 2.1 Update `src/components/PreviewCard/PreviewCard.js` to construct stateless download URLs with direct `mediaUrl` or `imageUrl` parameters
- [x] 2.2 Update `/api/download/route.js` to support stateless HTTP stream proxying for `mediaUrl` / `imageUrl` without depending on in-memory RAM sessions
- [x] 2.3 Verify extraction and media downloading end-to-end
