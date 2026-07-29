## Context

Social media platforms (Facebook, Instagram, X) support multi-image posts. Currently, single-media extraction limits downloads to 1 photo. Users require viewing and exporting all images in a post individually or as a `.zip` file.

## Goals / Non-Goals

**Goals:**
- Extract all full-resolution photos from Facebook albums/posts, Instagram carousels, and X multi-photo tweets.
- Provide a responsive gallery carousel UI in `PreviewCard.js`.
- Provide individual photo download and single-click "Download All (.zip)" batch export.

**Non-Goals:**
- Video transcoding or zip archiving for single video files.

## Decisions

### 1. Unified Gallery Schema

**Decision:** Standardize extraction output when multiple images are found:
```javascript
{
  platform: 'facebook',
  mediaType: 'image', // or 'gallery'
  title: 'Post Title',
  thumbnail: images[0].url,
  images: [
    { id: 1, url: 'https://scontent-1...', filename: 'photo_1.jpg' },
    { id: 2, url: 'https://scontent-2...', filename: 'photo_2.jpg' }
  ]
}
```

### 2. JSZip Streaming in `/api/download`

**Decision:** If `format === 'zip'` or `searchParams.get('zip') === 'true'`, `/api/download` fetches all image URLs using `Googlebot` crawler headers, adds each binary buffer to a `JSZip` instance, generates a `.zip` buffer, and streams it with `Content-Type: application/zip`.

### 3. Gallery Carousel Preview Card Component

**Decision:** In `PreviewCard.js`, when `images.length > 1`, display carousel navigation controls (`<` and `>`), thumbnail dots, active photo indicator, "Download This Photo", and "Download All (.zip)".

## Risks / Trade-offs

- **Memory Usage**: Bundling multiple large photos in RAM to create a zip file. Mitigated by using JSZip async buffer generation and capping single-post gallery zip size.
