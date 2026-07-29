## MODIFIED Requirements

### Requirement: Direct HTTP proxy streaming
The system SHALL support streaming `.zip` archives containing all photos in a gallery when requested.

#### Scenario: Batch `.zip` gallery download
- **WHEN** client requests a zip archive download for a multi-image gallery
- **THEN** system fetches all photo binary streams, bundles them using `JSZip`, and returns `Content-Type: application/zip` with `Content-Disposition: attachment; filename="[title]_photos.zip"`
