## ADDED Requirements

### Requirement: Download handler shall validate response status before initiating file download
The client download handler in `PreviewCard.js` SHALL perform a `fetch` request or status check before generating a download blob, preventing the browser from saving `.json` error responses as files.

#### Scenario: Download API returns non-200 error
- **WHEN** `/api/download` returns a 4xx or 5xx error response
- **THEN** `PreviewCard` displays an in-card error message
- **AND** the browser does NOT download a `download.json` file
