## Why

The `/contact` page currently exhibits a severe layout defect: the sidebar `.sidebar` has an invalid CSS property `flex-direction: flex-column`, causing cards to collapse into 100px-wide vertical strips with squished text. Additionally, the form layout can be improved with a 2-column input row for Name and Email, enhanced visual hierarchy, animated icons, and glassmorphism styling consistent with Fetch's design system.

## What Changes

- **Fix Sidebar Flex Layout**: Fix `flex-direction: column` in `.sidebar` to stack information cards cleanly.
- **Redesign Form Layout**: Update `src/app/contact/page.js` and `page.module.css` with a responsive two-column grid (`Name` and `Email` on desktop), floating glassmorphism card header, input icon accents, and glowing micro-interactions.
- **Interactive Enhancements**: Add icon accents, clear status banners, and micro-hover states.

## Capabilities

### New Capabilities
- `contact-page-redesign`: Clean, responsive two-column contact page layout with fixed sidebar card stacking and high-end glassmorphic aesthetic.

## Impact

- **Frontend**: Modifies `src/app/contact/page.js` and `src/app/contact/page.module.css`.
