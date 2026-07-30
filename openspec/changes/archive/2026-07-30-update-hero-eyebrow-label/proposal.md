## Why

The hero section currently displays a feature badge pill ("100% Free · No Ads · Multi-Photo ZIP Download"). Replacing this badge with a centered eyebrow label ("Download Anything, Anywhere, Anytime") matches the design language of other sections and establishes a cleaner, punchier tagline at the top of the landing page.

## What Changes

- Replace `styles.featureBadge` in the hero section on `src/app/page.js` with an eyebrow label element.
- Update the hero badge/eyebrow text to "Download Anything, Anywhere, Anytime".
- Refine styling in `src/app/page.module.css` (or `globals.css` if necessary) to present the eyebrow label clearly above the main title.

## Capabilities

### New Capabilities
- `eyebrow-tagline`: Standardizes the hero top banner as an eyebrow label displaying the tagline "Download Anything, Anywhere, Anytime".

### Modified Capabilities

## Impact

- `src/app/page.js`: Replaces feature badge container with eyebrow label structure and updated text.
- `src/app/page.module.css`: Updates or removes obsolete badge CSS classes in favor of eyebrow label styling.
