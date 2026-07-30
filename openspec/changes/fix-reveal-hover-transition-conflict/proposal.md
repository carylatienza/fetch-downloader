## Why

The `.reveal` CSS class defines a 0.8s transition on `transform` and `opacity`. When users hover on a revealed component, the hover transform (`translateY(-3px)`) conflicts with `.reveal`, causing the browser to re-trigger the entrance animation and reset element opacity to `0` (disappearing on hover). Removing the entry transition once elements become `.reveal.visible` permanently fixes all hover animation glitches and content disappearance.

## What Changes

- **Fix `.reveal.visible` CSS Class**: In `src/app/globals.css`, update `.reveal.visible` to permanently lock `opacity: 1` and remove entry transitions (`transition: none`) after initial scroll-reveal.
- **Isolate Hover Transforms**: Ensure component hover states (`SpotlightCard`, `.glass-panel`, buttons) operate independently with zero opacity animation re-triggers.

## Capabilities

### New Capabilities
- `stable-reveal-hover`: Rock-solid scroll entrances that transition control to hover states without opacity fade conflicts.

### Modified Capabilities
*(None)*

## Impact
- **Global Styles**: `src/app/globals.css`.
