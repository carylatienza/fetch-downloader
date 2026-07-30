## Context

The application currently has static footer and header navigation links pointing to `/about`, `/how-it-works`, `/faq`, `/terms`, and `/privacy`, but no contact page or messaging capability. Users need a direct way to submit feedback or bug reports. Additionally, the sample links on the hero page in `PlatformBadges.js` rely on fake/placeholder links (`C4_sample_rickroll`, dummy FB ID, fake tweet ID) which fail extraction tests.

## Goals / Non-Goals

**Goals:**
- Create a dedicated `/contact` route with a premium dark-mode form UI (Name, Email, Subject/Category, Message).
- Create a serverless API endpoint `/api/contact` with rate limiting, input validation, and optional forwarding to a Google Apps Script Web App Endpoint (`GOOGLE_SCRIPT_URL`).
- Update sample links in `PlatformBadges.js` with working public links provided by the user for IG, FB, and X.
- Harden the FB extractor to cleanly process Facebook share links (`/share/p/<id>/`).
- Restrict extraction target URLs in `validators.js` to legitimate supported domain patterns (SSRF protection).
- Add "Contact" links to `Header` and `Footer` navigation.

**Non-Goals:**
- Creating complex user authentication or full ticket management systems.
- Requiring mandatory third-party database configuration (Google Apps Script handles logging & email forwarding via lightweight HTTP POST).

## Decisions

1. **Google Apps Script Web App Integration for Contact Form**:
   - *Choice*: Next.js API route `/api/contact` receives form payload and POSTs to `GOOGLE_SCRIPT_URL`.
   - *Rationale*: Zero-cost, zero-maintenance integration that appends a row to a Google Sheet and sends an instant email notification using standard Google Workspace/Gmail APIs. If `GOOGLE_SCRIPT_URL` is unconfigured, the endpoint gracefully handles the submission locally.

2. **Server-Side Validation & Rate Limiting**:
   - *Choice*: Apply client IP rate limiting (3 submissions per 5 minutes per IP) in `/api/contact`.
   - *Rationale*: Prevents automated spam bots from flooding the spreadsheet and inbox.

3. **Sample Links Update**:
   - *Choice*: Update `PlatformBadges.js` with provided real URLs:
     - IG: `https://www.instagram.com/p/DKj8jg5yCli/?img_index=1`
     - FB: `https://www.facebook.com/share/p/1GZgoTsh1H/`
     - X: `https://x.com/amypeck2011/status/751356773530013696?s=20`
   - *Rationale*: Gives instant real-world verification to users clicking platform badges on the landing page.

## Risks / Trade-offs

- **[Risk]** Google Apps Script URL rate limits or missing configuration.
  - *Mitigation*: The `/api/contact` endpoint returns a success response with clear console logging if `GOOGLE_SCRIPT_URL` is omitted, so the UI flow remains smooth.
