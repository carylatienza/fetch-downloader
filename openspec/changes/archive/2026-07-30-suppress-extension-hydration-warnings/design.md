## Context

Third-party browser extensions (password managers, form autofill tools) inject `fdprocessedid` and related metadata attributes into `<button>` and `<input>` elements before React 19 hydration occurs. This results in console warnings such as `A tree hydrated but some attributes of the server rendered HTML didn't match`.

## Goals / Non-Goals

**Goals:**
- Add `suppressHydrationWarning` to buttons and inputs across components prone to extension injection (`PlatformBadges`, `FaqSection`, `UrlInput`).

**Non-Goals:**
- Alter component state logic or event handler behaviors.

## Decisions

- **Decision**: Add React's native `suppressHydrationWarning={true}` prop to `<button>` elements in `PlatformBadges.js`, `FaqSection.js`, and `UrlInput.js`.

## Risks / Trade-offs

- None. `suppressHydrationWarning` only suppresses attribute diff warnings on the specific element and does not affect child component hydration.
