## Why

The current Fetch landing page is clean, but users landing on the site without a pre-copied URL lack immediate interactivity, and the page lacks structured information on supported platform capabilities, competitive advantages, and common questions. Enhancing the Hero section with quick-fill samples, brand glow hover effects, smart paste, and adding curated content sections (Platform Matrix, Comparison Table, FAQ Accordion) will improve conversion, user engagement, and clarity while preserving Fetch's straightforward, ultra-fast experience.

## What Changes

- **Hero Quick-Fill Sample Chips**: Add interactive buttons (`YouTube 4K`, `Instagram Gallery`, `Facebook Post`) that populate the URL input with sample URLs in one click.
- **Hero Feature Pill**: Upgrade the top eyebrow tag to a badge highlighting key value props (`100% Free · No Ads · Multi-Photo ZIP`).
- **Brand Glow Platform Badges**: Add platform-specific neon glow hover effects and feature tooltips to YouTube, Facebook, Instagram, and X badges.
- **Smart Paste Action**: Enhance the `Paste` button to read user clipboard and auto-populate valid media links.
- **Platform Capability Matrix**: Add a tabbed/card section detailing supported formats per platform (YouTube 4K/Shorts, Instagram Carousel ZIP/Reels, Facebook HD/Photos, X Media).
- **Fetch vs. Traditional Downloaders Comparison Table**: Add a visual table contrasting Fetch against typical ad-heavy downloader sites (0 Ads, Multi-Photo ZIP, Live Preview, Original Resolution).
- **FAQ Accordion Section**: Add an expandable Q&A addressing common user questions (privacy, legal/fair use, multi-photo ZIP downloads, file limits, public vs private posts).

## Capabilities

### New Capabilities
- `hero-quick-samples`: Interactive sample URL quick-fill chips, brand-glow platform badges, feature pill, and smart paste in the hero section.
- `landing-content-sections`: Platform capabilities matrix, Fetch vs Traditional Downloaders comparison table, and interactive FAQ accordion.

### Modified Capabilities
*(None - main specs untouched)*

## Impact
- **UI Components**: `src/app/page.js`, `src/app/page.module.css`, `src/components/UrlInput/UrlInput.js`, `src/components/PlatformBadges/PlatformBadges.js`, `src/components/PlatformBadges/PlatformBadges.module.css`.
- **New Components**: `src/components/PlatformMatrix/PlatformMatrix.js`, `src/components/ComparisonTable/ComparisonTable.js`, `src/components/FaqSection/FaqSection.js`.
- **Dependencies**: No external npm dependencies required; built with standard React state & Lucide icons.
