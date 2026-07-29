## MODIFIED Requirements

### Requirement: Custom extraction logic for images
The system SHALL extract all full-resolution photo items for Facebook posts, Instagram carousels, and X multi-photo tweets into an `images` collection.

#### Scenario: Multi-photo post extraction
- **WHEN** user submits a multi-photo post URL
- **THEN** system extracts all photo URLs into `images: [{ id, url }]` array and returns gallery metadata
