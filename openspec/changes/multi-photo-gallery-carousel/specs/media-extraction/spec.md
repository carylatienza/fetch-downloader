## MODIFIED Requirements

### Requirement: Custom extraction logic for images
The system SHALL collect all valid photo CDN URLs into an `images` collection for multi-photo Facebook posts.

#### Scenario: Multi-photo post array extraction
- **WHEN** user submits a multi-photo Facebook post URL
- **THEN** system extracts all photo items into `images: [{ id, url }]` array and sets `mediaType: 'gallery'`
