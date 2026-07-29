## 1. Dependency & Extractor Multi-Image Support

- [x] 1.1 Add `jszip` package dependency to `package.json`
- [x] 1.2 Update `FacebookExtractor` in `src/lib/extractors/facebook.js` to extract all `scontent-*.fbcdn.net` JPG image URLs into `images: [...]` array
- [x] 1.3 Update `InstagramExtractor` and `TwitterExtractor` to extract multi-image array items

## 2. API Download Handler Zip Compression

- [x] 2.1 Update `src/app/api/download/route.js` to handle `format=zip` or gallery zip requests using `JSZip`

## 3. Preview Card Gallery UI & Verification

- [x] 3.1 Update `src/components/PreviewCard/PreviewCard.js` with interactive photo carousel, photo navigation controls, and "Download All (.zip)" button
- [x] 3.2 Verify multi-image extraction and zip download end-to-end
