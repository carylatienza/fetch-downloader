## Context

The global background backdrop atmosphere currently relies on `bg-noise` and `bg-atmosphere`. Adding `<div className="bg-spotlight" />` restores the subtle, fixed top-center violet/ice ambient aura behind the hero section without any mouse-following cursor light.

## Goals / Non-Goals

**Goals:**
- Mount `<div className="bg-spotlight" aria-hidden="true" />` in `src/app/layout.js`.
- Keep background canvas static and non-distracting.

**Non-Goals:**
- No global cursor position tracking listeners in root layout.

## Decisions

1. **Static Element in Root Layout**:
   - *Decision*: Add `<div className="bg-spotlight" aria-hidden="true" />` directly inside `<body>` alongside `bg-noise` and `bg-atmosphere`.
   - *Rationale*: Zero JS event listeners, 100% pure CSS rendering performance.

## Risks / Trade-offs

- None.
