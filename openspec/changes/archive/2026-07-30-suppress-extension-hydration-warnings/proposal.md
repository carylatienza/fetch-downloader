## Why

Browser extensions (such as password managers and autofill tools) inject custom attributes like `fdprocessedid` into interactive elements (`<button>`, `<input>`) in the DOM before React hydrates. This triggers React 19 hydration mismatch warnings in the developer console. Adding `suppressHydrationWarning` to these interactive elements suppresses console errors caused by third-party DOM modifications.

## What Changes

- Add `suppressHydrationWarning` attribute to buttons and inputs in `PlatformBadges.js`, `FaqSection.js`, and `UrlInput.js`.

## Capabilities

### New Capabilities
- `suppress-hydration-mismatch`: Prevents React hydration mismatch warnings for DOM elements mutated by third-party browser extensions.

### Modified Capabilities

## Impact

- `src/components/PlatformBadges/PlatformBadges.js`: Adds `suppressHydrationWarning` to platform sample buttons.
- `src/components/FaqSection/FaqSection.js`: Adds `suppressHydrationWarning` to FAQ accordion toggle buttons.
- `src/components/UrlInput/UrlInput.js`: Adds `suppressHydrationWarning` to input and submit elements if applicable.
