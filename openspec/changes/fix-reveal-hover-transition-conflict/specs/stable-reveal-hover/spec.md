## ADDED Requirements

### Requirement: Stable Reveal Elements During Hover Interactions
The system SHALL lock element opacity to 1 once a scroll-reveal element becomes visible, preventing hover state transitions from re-triggering opacity entry fades.

#### Scenario: User hovers on a scroll-revealed element
- **WHEN** the user hovers on any component with the `.reveal.visible` class
- **THEN** the component remains 100% opaque without re-triggering entrance animations or disappearing
