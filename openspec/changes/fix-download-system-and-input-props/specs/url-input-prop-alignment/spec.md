## ADDED Requirements

### Requirement: UrlInput component shall support both onExtract and onSubmit props
The `UrlInput` component SHALL accept `onExtract` or `onSubmit` as its extraction callback prop without throwing `TypeError: onSubmit is not a function`.

#### Scenario: User submits a URL in UrlInput
- **WHEN** the user types or pastes a URL and submits the form
- **THEN** `UrlInput` invokes the provided extraction handler (`onExtract` or `onSubmit`) cleanly
