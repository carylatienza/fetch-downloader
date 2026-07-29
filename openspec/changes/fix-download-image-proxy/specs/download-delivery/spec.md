## MODIFIED Requirements

### Requirement: Direct HTTP proxy streaming
The system SHALL fetch and stream media assets from social platform CDNs using crawler headers to deliver clean binary streams.

#### Scenario: Image proxy binary stream download
- **WHEN** user requests a download for an extracted photo post
- **THEN** system fetches the source URL using a crawler User-Agent header, sets `Content-Type: image/jpeg` (or matching media type), and streams the binary image data to the client with `Content-Disposition: attachment`
