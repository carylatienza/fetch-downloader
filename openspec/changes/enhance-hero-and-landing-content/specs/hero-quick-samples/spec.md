## ADDED Requirements

### Requirement: Hero Quick-Fill Sample Chips
The system SHALL provide interactive sample chips in the hero section allowing users to test extraction with sample URLs in one click.

#### Scenario: User clicks a sample chip
- **WHEN** the user clicks any sample chip (e.g. YouTube 4K, Instagram Gallery)
- **THEN** the input field is populated with the sample URL and extraction is triggered immediately

### Requirement: Smart Paste Button Action
The system SHALL attempt to read the user's clipboard when clicking the Paste button and populate the input field with valid social media URLs.

#### Scenario: User clicks Smart Paste button
- **WHEN** the user clicks the Paste button with a social media URL in their clipboard
- **THEN** the URL is pasted into the input field and validation error is cleared

### Requirement: Platform Brand Glow Hover Badges
The system SHALL display platform badges in the hero section that highlight with platform-specific brand neon colors and feature tags on hover.

#### Scenario: User hovers over a platform badge
- **WHEN** the user hovers over the YouTube, Facebook, Instagram, or X platform badge
- **THEN** the badge illuminates with its signature brand color glow and shows supported media types
