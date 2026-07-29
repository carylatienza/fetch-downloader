## ADDED Requirements

### Requirement: Home page with URL input
The system SHALL render a home page at `/` with a hero section containing a URL input field, a "Fetch Media" submit button, supported platform badges, and a brief "How It Works" section below the fold.

#### Scenario: Initial page load
- **WHEN** user navigates to `/`
- **THEN** system renders the hero section with the URL input field focused, platform badges for YouTube/Facebook/Instagram/X, and a "Fetch Media" CTA button

#### Scenario: URL submission
- **WHEN** user pastes a URL and clicks "Fetch Media" or presses Enter
- **THEN** system validates the URL client-side, sends it to `POST /api/extract`, and transitions to the loading state

### Requirement: Loading state with animated feedback
The system SHALL display an animated loading state while extraction is in progress, cycling through contextual status messages.

#### Scenario: Extraction in progress
- **WHEN** the extraction API call is pending
- **THEN** system displays a spinner/loader with cycling messages ("Analyzing your URL...", "Detecting platform...", "Finding best quality...")

### Requirement: Media preview card
The system SHALL display a preview card after successful extraction showing the media thumbnail, title, platform, media type, quality, estimated file size, and a "Download Now" button.

#### Scenario: Video preview
- **WHEN** extraction returns video metadata
- **THEN** system displays the thumbnail with duration overlay, video title, platform icon and name, resolution, estimated file size, and a download button

#### Scenario: Image preview
- **WHEN** extraction returns image metadata
- **THEN** system displays the image preview, caption/title, platform icon and name, dimensions, and a download button

### Requirement: Error state display
The system SHALL display contextual error messages for all failure states with appropriate iconography and recovery actions.

#### Scenario: Invalid URL error
- **WHEN** client-side validation detects an invalid URL
- **THEN** system displays an inline error message below the input field: "Please enter a valid URL"

#### Scenario: Unsupported platform error
- **WHEN** the API returns `UNSUPPORTED_PLATFORM`
- **THEN** system displays an error card listing supported platforms with a "Try another URL" action

#### Scenario: Private content error
- **WHEN** the API returns `PRIVATE_CONTENT`
- **THEN** system displays an error card explaining only public content can be downloaded

#### Scenario: Extraction failed error
- **WHEN** the API returns `EXTRACTION_FAILED`
- **THEN** system displays an error card with "Try again" and "Try another URL" actions

#### Scenario: Rate limited error
- **WHEN** the API returns `RATE_LIMITED`
- **THEN** system displays an error card with a countdown timer showing remaining wait time

### Requirement: Download trigger
The system SHALL initiate a browser-native file download when the user clicks "Download Now" on the preview card.

#### Scenario: Download initiated
- **WHEN** user clicks "Download Now"
- **THEN** system triggers a request to `/api/download` which streams the file and initiates the browser's native download dialog

#### Scenario: Post-download state
- **WHEN** a download has been initiated
- **THEN** system displays a "Download another" link to reset the interface to the initial state

### Requirement: Header navigation
The system SHALL render a persistent header across all pages containing the Fetch logo/wordmark and navigation links to About, How It Works, and FAQ.

#### Scenario: Navigation to informational pages
- **WHEN** user clicks a navigation link in the header
- **THEN** system navigates to the corresponding page without a full page reload (client-side routing)

#### Scenario: Logo links home
- **WHEN** user clicks the Fetch logo/wordmark in the header
- **THEN** system navigates to the home page

### Requirement: Footer with links
The system SHALL render a persistent footer across all pages containing copyright, product links (Home, About, How It Works, FAQ), and legal links (Terms, Privacy).

#### Scenario: Footer renders on all pages
- **WHEN** any page is loaded
- **THEN** system displays the footer with organized link sections

### Requirement: About page
The system SHALL render an About page at `/about` with the mission statement, value propositions, and a CTA linking back to the home page.

#### Scenario: About page content
- **WHEN** user navigates to `/about`
- **THEN** system renders the mission section, "What makes us different" section with three value props, and a "Start Fetching" CTA

### Requirement: How It Works page
The system SHALL render a How It Works page at `/how-it-works` with a step-by-step guide (Copy URL → Paste into Fetch → Preview & Download) and usage tips.

#### Scenario: How It Works page content
- **WHEN** user navigates to `/how-it-works`
- **THEN** system renders three numbered steps with icons and descriptions, a tips section, and a CTA

### Requirement: FAQ page
The system SHALL render a FAQ page at `/faq` with collapsible question/answer sections organized by category (General, Platforms, Technical, Legal).

#### Scenario: FAQ interaction
- **WHEN** user clicks on a FAQ question
- **THEN** system expands the answer with a smooth animation, collapsing any previously open answer

### Requirement: Terms of Service page
The system SHALL render a Terms of Service page at `/terms` with all legal sections including acceptance, permitted use, prohibited use, intellectual property, disclaimer, and limitation of liability.

#### Scenario: Terms page content
- **WHEN** user navigates to `/terms`
- **THEN** system renders the full Terms of Service content with proper heading hierarchy

### Requirement: Privacy Policy page
The system SHALL render a Privacy Policy page at `/privacy` with sections covering data collection, usage, retention, third parties, and contact information.

#### Scenario: Privacy page content
- **WHEN** user navigates to `/privacy`
- **THEN** system renders the full Privacy Policy content with proper heading hierarchy

### Requirement: Glassmorphism design system
The system SHALL implement the dark glassmorphism design system defined in DESIGN.md using CSS custom properties from variables.css, including frosted glass surfaces, inset frost highlights, blueprint grid background, and the midnight canvas color palette.

#### Scenario: Design tokens applied
- **WHEN** any page is rendered
- **THEN** system uses the defined color tokens (Midnight Canvas background, Frost Glow text, Void Violet CTA), typography (Space Grotesk for headings, Inter for body, JetBrains Mono for eyebrow labels), spacing, border radius, and shadow tokens consistently

#### Scenario: Frosted glass cards
- **WHEN** a card component is rendered (preview card, feature card, error card)
- **THEN** system applies frosted glass surface styling with translucent background, inset frost highlights, and the appropriate shadow stack from the design system

### Requirement: SEO meta tags
The system SHALL include proper title tags, meta descriptions, Open Graph tags, and semantic HTML on all pages.

#### Scenario: Home page SEO
- **WHEN** the home page is rendered or shared on social media
- **THEN** system includes the title "Fetch — Download Videos & Images from Any Platform", a compelling meta description, and Open Graph image

#### Scenario: Informational page SEO
- **WHEN** any informational page (About, FAQ, etc.) is rendered
- **THEN** system includes page-specific title and meta description tags
