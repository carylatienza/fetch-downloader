## ADDED Requirements

### Requirement: Clean Container Spotlight Hover Without Background Light
The system SHALL provide a mouse-relative inner spotlight glow on interactive container cards without background cursor tracking or element masking bugs.

#### Scenario: User hovers over interactive cards
- **WHEN** the user hovers over a SpotlightCard container
- **THEN** an inner radial spotlight glow follows the cursor position inside the card, while all card text, icons, and buttons remain 100% visible at all times
