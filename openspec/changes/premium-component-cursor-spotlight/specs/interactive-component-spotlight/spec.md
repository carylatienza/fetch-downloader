## ADDED Requirements

### Requirement: Subtle Cursor-Following Spotlight Inside Cards
The system SHALL provide a mouse-tracking radial spotlight overlay inside card components that smoothy follows the cursor position on hover without clipping content.

#### Scenario: User moves mouse inside card container
- **WHEN** the user hovers and moves the cursor inside a SpotlightCard component
- **THEN** a subtle radial light overlay tracks the mouse coordinates (`--card-x`, `--card-y`) inside the card, while all text, checkmarks, logos, and buttons remain 100% visible
