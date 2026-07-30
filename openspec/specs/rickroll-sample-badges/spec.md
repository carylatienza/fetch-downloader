# rickroll-sample-badges Specification

## Purpose
TBD - created by archiving change fix-downloads-and-rickroll-samples. Update Purpose after archive.
## Requirements
### Requirement: Platform sample badges use working Rick Astley media links
All sample buttons rendered in `PlatformBadges` SHALL contain valid, active public URLs referencing Rick Astley content across YouTube, Instagram, Facebook, and X.

#### Scenario: User clicks platform sample badge
- **WHEN** the user clicks any supported platform badge (YouTube, Instagram, Facebook, or X)
- **THEN** the URL input is populated with a working Rick Astley media URL
- **AND** extraction completes successfully without 404 or unsupported link errors

