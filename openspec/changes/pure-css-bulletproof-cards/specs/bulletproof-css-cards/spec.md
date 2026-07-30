## ADDED Requirements

### Requirement: Pure CSS Bulletproof Cards Without Mask Clipping Bugs
The system SHALL style all glass cards using pure CSS borders and hover glow shadows without CSS mask compositing or JavaScript mouse listeners.

#### Scenario: User hovers over any card container
- **WHEN** the user hovers over a platform matrix card, bento box, comparison table, or FAQ item
- **THEN** a smooth CSS hover elevation and glow is rendered while all card content remains 100% visible at all times
