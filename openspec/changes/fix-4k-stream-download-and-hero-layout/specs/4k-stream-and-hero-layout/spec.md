## ADDED Requirements

### Requirement: 4K Stream Downloading
The system SHALL stream 4K (2160p) and 1080p DASH videos remuxed with audio as MP4 downloads without mobile client format restrictions.

#### Scenario: User clicks Download Now on a 4K video
- **WHEN** user initiates download for a 4K YouTube video
- **THEN** system streams the full resolution 4K remuxed MP4 video file.

### Requirement: Fixed Hero Top Spacing & Page Scrollability
The system SHALL maintain consistent top padding between the header navbar and hero title when a preview card is visible, and allow unhindered vertical page scrolling.

#### Scenario: Preview card renders in Hero section
- **WHEN** media details are extracted and displayed in PreviewCard
- **THEN** hero title remains positioned comfortably below the navbar and the user can freely scroll the page.
