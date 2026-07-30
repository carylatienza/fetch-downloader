# contact-form-integration Specification

## ADDED Requirements

### Requirement: User can submit contact form with message, name, email, and subject
The application SHALL provide a `/contact` page containing a contact form requiring Name, Email, Subject/Category, and Message fields, validating inputs before submission.

#### Scenario: User submits contact form successfully
- **WHEN** the user fills out all required fields on `/contact` and clicks submit
- **THEN** a request is sent to `/api/contact`
- **AND** a success confirmation message is displayed to the user
- **AND** form input fields are reset

#### Scenario: User submits invalid or missing fields
- **WHEN** the user leaves a required field empty or provides an invalid email address
- **THEN** an error message is displayed highlighting the invalid fields
- **AND** no request is sent to the backend API

### Requirement: Contact API logs form submission and forwards to Google Apps Script
The `/api/contact` API route SHALL validate payload data, enforce rate limits per client IP, and forward submissions to a configured `GOOGLE_SCRIPT_URL` endpoint to log to Google Sheets and dispatch an email.

#### Scenario: API processes valid submission with Google Apps Script configured
- **WHEN** a valid POST request arrives at `/api/contact` and `GOOGLE_SCRIPT_URL` is set
- **THEN** the API forwards the JSON payload to `GOOGLE_SCRIPT_URL` via HTTP POST
- **AND** returns a 200 OK JSON response `{ "success": true }`
