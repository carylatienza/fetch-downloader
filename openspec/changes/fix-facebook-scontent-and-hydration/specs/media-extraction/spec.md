## MODIFIED Requirements

### Requirement: Custom extraction logic for images
The system SHALL use custom HTML scraping logic with crawler headers to extract direct `scontent` binary image URLs from Facebook public posts, share links, and page photos.

#### Scenario: Facebook direct scontent image extraction
- **WHEN** system extracts media metadata for a Facebook photo post or share link
- **THEN** system resolves direct `scontent-*.fbcdn.net` JPG image URLs instead of `lookaside.fbsbx.com` HTML redirect pages
