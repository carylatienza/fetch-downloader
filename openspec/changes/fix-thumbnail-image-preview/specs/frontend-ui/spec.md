## MODIFIED Requirements

### Requirement: Media preview card
The system SHALL proxy image thumbnail URLs through the backend server endpoint to prevent browser hotlink blocking.

#### Scenario: Server-proxied thumbnail rendering
- **WHEN** preview card displays media thumbnail or gallery photo
- **THEN** image element loads source via `/api/download?imageUrl=...&preview=true`, delivering binary image data cleanly
