## MODIFIED Requirements

### Requirement: URL Input Component
The system SHALL provide a URL input form with paste helper button and hydration warning suppression for browser extensions.

#### Scenario: Hydration warning suppression
- **WHEN** client browser extensions inject attributes (`fdprocessedid`) into form inputs or buttons
- **THEN** system suppresses hydration warnings, maintaining clean console logging
