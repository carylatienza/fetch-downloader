## Context

The `/contact` page sidebar cards ("Fast Response Time", "Privacy Assured", "Spreadsheet Logging") were squished side-by-side due to `flex-direction: flex-column` invalid CSS rule. The form can also be structured into a cleaner 2-column input row for Name & Email to optimize vertical screen space and improve readability.

## Goals / Non-Goals

**Goals:**
- Fix `.sidebar` CSS rule to `display: flex; flex-direction: column; gap: 20px;`.
- Refactor `Name` and `Email` inputs into a desktop side-by-side row (`grid-template-columns: 1fr 1fr`).
- Add Lucide icon accents for input labels (`User`, `Mail`, `Tag`, `MessageSquare`).
- Improve focus effects and glassmorphic card borders.

**Non-Goals:**
- Altering the backend `/api/contact` route or rate limiting logic.

## Decisions

1. **Flex Direction Fix**:
   - Fix `flex-direction: flex-column` -> `flex-direction: column`.
2. **Two-Column Input Row**:
   - Group `Name` and `Email` in a `.rowInputs` container styled with `display: grid; grid-template-columns: 1fr 1fr; gap: 20px;` (collapsing to 1fr on mobile).

## Risks / Trade-offs

- None; pure CSS/JSX layout refinement.
