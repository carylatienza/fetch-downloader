## ADDED Requirements

### Requirement: Full-Color Brand Logos & Official X Vector
The system SHALL display full-color brand badges (YouTube Red, Facebook Blue, Instagram Gradient) and the official monochrome X vector logo across all platform representations.

#### Scenario: User views platform icons
- **WHEN** the user views platform badges or cards in the Hero or Platform Matrix
- **THEN** official full-color brand logos and the official X logo are displayed instead of line outlines

### Requirement: Fetch Brand Asset Integration
The system SHALL serve `Fetch Logo Icon.png` from `public/images/logo.png` and display it in Header and Footer components.

#### Scenario: User views Header or Footer
- **WHEN** the user navigates any page
- **THEN** the brand logo image `public/images/logo.png` is displayed cleanly alongside the site title
