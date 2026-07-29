## MODIFIED Requirements

### Requirement: Media preview card
The system SHALL display a preview card after successful extraction showing the media thumbnail with referrer suppression, title, platform, media type, quality, estimated file size, and a "Download Now" button.

#### Scenario: Image preview load with no-referrer
- **WHEN** extraction returns a media thumbnail URL from a social platform CDN
- **THEN** system renders the thumbnail image tag with `referrerPolicy="no-referrer"`, preventing hotlink blocking and displaying the preview image cleanly
