## Why

Users need a reliable way to get in touch with the developer directly from the application for feedback, bug reports, or feature requests. Additionally, the existing sample links on the home page for Instagram, Facebook, and X are broken placeholder links, leading to poor user experience when testing the downloader. Updating sample links and adding a contact system integrated with Google Sheets/Apps Script solves both issues.

## What Changes

- **Contact Page & Form**: Create a new `/contact` page with a high-end, responsive form (Name, Email, Subject/Category, Message) matching the app design aesthetic.
- **Spreadsheet & Email Integration**: Add an API route `/api/contact` that validates contact form submissions, enforces IP rate limits, and posts submissions to a Google Apps Script Web App Endpoint (`GOOGLE_SCRIPT_URL`) to log rows in Google Sheets and send email notifications.
- **Sample Links Update**: Replace broken placeholder URLs in `PlatformBadges.js` with active, real sample links provided for Instagram, Facebook, and X.
- **FB Extractor Enhancements**: Improve Facebook extractor regex and redirect-following logic so `/share/p/` share URLs extract media cleanly.
- **SSRF Validation**: Harden URL validator against arbitrary SSRF probes by restricting extraction URLs to supported platform domains.
- **Navigation Update**: Add a "Contact" link to the main `Header` and `Footer` navigation menus.

## Capabilities

### New Capabilities
- `contact-form-integration`: Dedicated contact page and serverless API integration forwarding form submissions to Google Sheets & Email via Google Apps Script.

### Modified Capabilities
- `rickroll-sample-badges`: Update sample links for Instagram, Facebook, and X to real working public media links.

## Impact

- **Frontend**: Adds `src/app/contact/page.js`, updates `src/components/Header/Header.js`, `src/components/Footer/Footer.js`, and `src/components/PlatformBadges/PlatformBadges.js`.
- **Backend API**: Adds `src/app/api/contact/route.js`, updates `src/lib/extractors/facebook.js`, and `src/lib/validators.js`.
- **Environment**: Optional `GOOGLE_SCRIPT_URL` env variable for Google Sheets / Google Apps Script web app endpoint.
