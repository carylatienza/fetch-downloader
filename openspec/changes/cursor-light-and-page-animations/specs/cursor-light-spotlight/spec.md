## ADDED Requirements

### Requirement: 2-Tier Cursor Light & Container Spotlight System
The system SHALL provide a global background cursor ambient spotlight and an interactive container-level spotlight glow that tracks pointer position inside interactive cards.

#### Scenario: User moves cursor across the viewport
- **WHEN** the user moves their cursor anywhere on the page
- **THEN** a soft ambient backdrop light smoothly follows the cursor position

#### Scenario: User hovers over an interactive container card
- **WHEN** the user moves their cursor inside a card container (Platform Matrix, Bento grid, FAQ item, Comparison table, PreviewCard)
- **THEN** an intense localized spotlight glow and glowing border edge follow the exact cursor position inside that card
