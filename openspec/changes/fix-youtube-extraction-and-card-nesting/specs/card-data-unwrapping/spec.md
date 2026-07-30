## ADDED Requirements

### Requirement: Page state shall unwrap extraction response data
The `handleExtract` callback in `src/app/page.js` SHALL unwrap `data.data` from the `/api/extract` response before setting `extractedData` state.

#### Scenario: Extraction succeeds
- **WHEN** user extracts a media URL
- **THEN** `PreviewCard` receives the unwrapped media payload containing `title`, `thumbnail`, `mediaType`, and `quality`
- **AND** the card displays the actual title, thumbnail image, and video badge cleanly
