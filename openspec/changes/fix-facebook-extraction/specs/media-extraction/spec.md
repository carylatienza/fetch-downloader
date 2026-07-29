## MODIFIED Requirements

### Requirement: Custom extraction logic for images
The system SHALL use custom HTML scraping logic with crawler headers to extract images from Facebook public posts, share links, and Facebook page photos.

#### Scenario: Facebook share link photo extraction
- **WHEN** user submits a Facebook share URL (`/share/p/...`)
- **THEN** system fetches the page with `facebookexternalhit/1.1` User-Agent, extracts the `og:image` and `og:title` tags, and returns image metadata

#### Scenario: Facebook direct photo URL extraction
- **WHEN** user submits a Facebook photo URL containing `fbid`
- **THEN** system extracts the photo using crawler metadata or `lookaside.fbsbx.com` media ID fallback
