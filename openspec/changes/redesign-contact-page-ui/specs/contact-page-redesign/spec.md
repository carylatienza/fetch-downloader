# contact-page-redesign Specification

## ADDED Requirements

### Requirement: Contact page sidebar displays stacked info cards cleanly
The `/contact` page sidebar SHALL stack information cards vertically without text wrapping or squishing.

#### Scenario: Sidebar renders on desktop and mobile
- **WHEN** the user views `/contact`
- **THEN** sidebar cards stack vertically with 20px gap and full card width

### Requirement: Contact form inputs use two-column layout on desktop
The contact form SHALL render Name and Email fields side-by-side on desktop viewports.

#### Scenario: User views form on desktop
- **WHEN** viewport width exceeds 768px
- **THEN** Name and Email fields display side-by-side in a 2-column grid row
