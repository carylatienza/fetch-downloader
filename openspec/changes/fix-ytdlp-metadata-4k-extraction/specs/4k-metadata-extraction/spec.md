## ADDED Requirements

### Requirement: Unfiltered Metadata Extraction
The system SHALL extract full, unpruned metadata JSON for YouTube videos without format filters or mobile player restrictions.

#### Scenario: Extracting metadata for 1080p or 4K YouTube video
- **WHEN** user submits a 4K YouTube URL for extraction
- **THEN** system retrieves all available video formats and calculates the true maximum height (e.g. 2160p).

### Requirement: Accurately Display Highest Resolution
The system SHALL display the true maximum available resolution (e.g., `2160p (4K)` or `1080p (Full HD)`) in the media preview card.

#### Scenario: User views Rickroll video preview
- **WHEN** Rickroll 4K video is extracted
- **THEN** preview card displays `Quality: 2160p (4K)`.
