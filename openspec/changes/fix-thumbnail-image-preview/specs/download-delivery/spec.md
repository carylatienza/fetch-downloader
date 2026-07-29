## MODIFIED Requirements

### Requirement: Direct HTTP proxy streaming
The system SHALL support inline image streaming for preview requests.

#### Scenario: Inline preview proxy request
- **WHEN** request includes `preview=true` or `imageUrl`
- **THEN** system fetches image via Googlebot crawler header, sets `Content-Disposition: inline`, and streams binary image data
