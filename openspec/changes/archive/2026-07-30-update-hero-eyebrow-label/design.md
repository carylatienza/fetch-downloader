## Context

The landing page currently includes a feature badge in the hero section displaying feature highlights. To align with the overall visual aesthetic and structure of the site, this badge will be replaced by an eyebrow label banner with decorative side accent lines or pill styling using the text "Download Anything, Anywhere, Anytime".

## Goals / Non-Goals

**Goals:**
- Update `src/app/page.js` hero section to display an eyebrow label containing "Download Anything, Anywhere, Anytime".
- Use consistent eyebrow styling (`eyebrow-container` / `eyebrow-label`) in the hero section.
- Ensure proper entrance animations (`reveal`) and responsive typography spacing.

**Non-Goals:**
- Modify hero headline, subheadline, or input form functionality.
- Alter downstream page sections (e.g., "How it works").

## Decisions

- **Decision 1: Eyebrow Container Pattern**: Use the established `eyebrow-container` component pattern (with accent lines or subtle badge pill wrapper) in the hero section above `<h1>Fetch</h1>`.
- **Decision 2: Tagline Content**: Replace previous "100% Free · No Ads · Multi-Photo ZIP Download" text with "Download Anything, Anywhere, Anytime".

## Risks / Trade-offs

- [Risk] Layout shift or vertical alignment spacing changes in hero header. → Mitigation: Adjust top margin and padding in `src/app/page.module.css` to preserve hero section balance.
