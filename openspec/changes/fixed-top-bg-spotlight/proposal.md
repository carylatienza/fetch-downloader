## Why

User requested removing any global mouse-following cursor light from the background backdrop and restoring the clean, fixed top-center ambient spotlight aura behind the hero headline for a premium, non-distracting background atmosphere.

## What Changes

- **Mount Fixed Top Atmosphere Spotlight**: Mount `<div className="bg-spotlight" />` in `src/app/layout.js`.
- **Pure Static Backdrop**: Maintain fixed top-center radial gradient aura (`width: 900px`, `height: 700px`, `top: -180px`, `left: 50%`) with zero mouse tracking on the viewport canvas.

## Capabilities

### New Capabilities
- `static-top-bg-spotlight`: Fixed middle-top ambient spotlight aura in root layout.

### Modified Capabilities
*(None)*

## Impact
- **Layout & Styles**: `src/app/layout.js`, `src/app/globals.css`.
