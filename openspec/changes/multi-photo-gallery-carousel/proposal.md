## Why

When users submit Facebook, Instagram, or X posts containing multiple photos, the extractor needs to capture all valid photo items so the frontend can activate gallery mode. Users need carousel navigation controls (`<` and `>`) directly inside the image preview container and a clear indicator (`Photo X of Y`) to preview and download all photos seamlessly.

## What Changes

- **Multi-Photo Collection in Facebook Extractor**: Update `FacebookExtractor` in `src/lib/extractors/facebook.js` to include external post preview photos (`external-*.fbcdn.net`) alongside direct `scontent` photos, ensuring multi-photo posts build a complete `images: [...]` array.
- **Image Container Carousel Controls**: Update `PreviewCard` in `src/components/PreviewCard/PreviewCard.js` so that when `images.length > 1`:
  - Navigation arrows (`<` and `>`) display prominently inside the image container.
  - A photo counter badge (`Photo X of Y`) displays in the bottom-left corner of the image container.
  - Users can cycle through all photos in real time and download the active photo or the full `.zip` collection.

## Capabilities

### New Capabilities
_(None)_

### Modified Capabilities
- `media-extraction`: Include external preview photos alongside direct CDN photo links in FacebookExtractor to ensure complete multi-photo gallery extraction.
- `frontend-ui`: Render interactive image container carousel controls (`<` and `>`), photo counter badge (`Photo X of Y`), and download options when multiple photos are present.

## Impact

- **Extractor Layer**: Modifies `src/lib/extractors/facebook.js`.
- **UI Component**: Modifies `src/components/PreviewCard/PreviewCard.js` and `PreviewCard.module.css`.
- **User Experience**: Users can cycle through multi-photo posts with next/previous controls and view exact photo indices (`Photo X of Y`).
