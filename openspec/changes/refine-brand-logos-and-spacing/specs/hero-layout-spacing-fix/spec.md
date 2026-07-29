## ADDED Requirements

### Requirement: Unified Single-Row Interactive Brand Chips
The system SHALL combine sample triggers and platform badges into a single interactive brand bar in the hero section.

#### Scenario: User clicks an interactive platform chip
- **WHEN** the user clicks any platform brand chip in the hero bar
- **THEN** a sample URL for that platform is populated in the input field and extraction is triggered

### Requirement: Preview Card Dynamic Vertical Spacing
The system SHALL maintain at least 80px of vertical margin below PreviewCard when media data is displayed.

#### Scenario: Media preview card renders
- **WHEN** a media preview card is displayed in the hero section
- **THEN** at least 80px margin separates the bottom of the card from the "How It Works" header

### Requirement: Secondary Page Header Top Clearance
The system SHALL provide sufficient top padding on secondary pages so content is not obscured by the fixed floating glass header.

#### Scenario: User visits secondary pages
- **WHEN** the user navigates to `/about`, `/how-it-works`, `/faq`, `/privacy`, or `/terms`
- **THEN** top content is rendered clearly below the floating glass header with full visibility
