## Context

Multi-photo posts require both complete photo array extraction in `facebook.js` and an intuitive image container carousel UI in `PreviewCard.js`.

## Goals / Non-Goals

**Goals:**
- Extract all photo items into `images: [...]` in `FacebookExtractor`.
- Display `<` and `>` arrow buttons over the preview image.
- Display `Photo X of Y` overlay counter badge inside the thumbnail container.

**Non-Goals:**
- Infinite auto-play sliders (manual navigation is preferred for preview cards).

## Decisions

### 1. Extractor Multi-Photo Collection

**Decision:** In `FacebookExtractor`, allow clean `external-*.fbcdn.net` photo preview links when `scontent` photos are present, populating `images: [...]` with all distinct photo URLs.

### 2. Image Container Overlay & Navigation Controls

**Decision:** In `PreviewCard.js`:
- Position `<button className={styles.prevBtn}>❮</button>` and `<button className={styles.nextBtn}>❯</button>` over the image container with high z-index and frosted glass backdrop styling.
- Display `<div className={styles.galleryCounter}>Photo {activePhotoIndex + 1} of {images.length}</div>` inside the image container.

## Risks / Trade-offs

None. Standard positioning over aspect-ratio containers guarantees responsive layout across mobile and desktop devices.
