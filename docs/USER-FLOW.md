# Fetch — User Flow

> **Version:** 1.0
> **Last Updated:** July 29, 2025

---

## 1. Primary Flow — Download Media

This is the core user journey. A user arrives, pastes a URL, previews the media, and downloads it.

```
  ┌─────────────────────────────────────────────────────────────────────┐
  │                        PRIMARY DOWNLOAD FLOW                       │
  └─────────────────────────────────────────────────────────────────────┘

  ┌──────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────┐
  │  LAND    │────▶│  PASTE URL   │────▶│   PREVIEW    │────▶│ DOWNLOAD │
  │          │     │              │     │              │     │          │
  │ See hero │     │ Enter URL in │     │ See media    │     │ Browser  │
  │ section  │     │ input field  │     │ preview card │     │ saves    │
  │ & input  │     │ & submit     │     │ & metadata   │     │ file     │
  └──────────┘     └──────────────┘     └──────────────┘     └──────────┘
```

### Step-by-Step Detail

#### Step 1: Landing
```
  ┌─────────────────────────────────────────────────────┐
  │                                                     │
  │                     FETCH                           │
  │          Download anything. Anywhere.               │
  │                                                     │
  │   ┌───────────────────────────────────────────┐     │
  │   │  Paste a video or image URL here...       │     │
  │   └───────────────────────────────────────────┘     │
  │                    [ FETCH ▼ ]                      │
  │                                                     │
  │   Supports: YouTube · Facebook · Instagram · X      │
  │                                                     │
  └─────────────────────────────────────────────────────┘
```
- User sees a clean hero section with a prominent URL input.
- Supported platforms are listed below the input.
- Navigation links to About, How It Works, FAQ are visible.

#### Step 2: Paste URL & Submit
```
  USER ACTIONS:
  1. Copies a URL from a social media platform
     (e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ)
  2. Pastes it into the input field
  3. Clicks "FETCH" button (or presses Enter)

  SYSTEM ACTIONS:
  1. Validate URL format (client-side instant check)
  2. Send POST request to /api/extract
  3. Show loading state with animated feedback
```

#### Step 3: Loading State
```
  ┌─────────────────────────────────────────────────────┐
  │                                                     │
  │   ┌───────────────────────────────────────────┐     │
  │   │  https://youtube.com/watch?v=dQw...       │     │
  │   └───────────────────────────────────────────┘     │
  │                                                     │
  │          ┌────────────────────────────┐              │
  │          │                            │              │
  │          │     ◠ ◡ ◠  (spinner)       │              │
  │          │                            │              │
  │          │  Analyzing your URL...     │              │
  │          │  Detecting platform...     │              │
  │          │  Finding best quality...   │              │
  │          │                            │              │
  │          └────────────────────────────┘              │
  │                                                     │
  └─────────────────────────────────────────────────────┘

  Loading text cycles through contextual messages
  to keep the user engaged during extraction.
```

#### Step 4: Preview Card
```
  ┌─────────────────────────────────────────────────────┐
  │                                                     │
  │   ┌───────────────────────────────────────────┐     │
  │   │  https://youtube.com/watch?v=dQw...       │     │
  │   └───────────────────────────────────────────┘     │
  │                                                     │
  │   ┌─────────────────────────────────────────────┐   │
  │   │  ┌─────────────────────────────────────┐    │   │
  │   │  │                                     │    │   │
  │   │  │         🖼️ THUMBNAIL                │    │   │
  │   │  │                                     │    │   │
  │   │  │                          ▶ 3:32     │    │   │
  │   │  └─────────────────────────────────────┘    │   │
  │   │                                             │   │
  │   │  Rick Astley - Never Gonna Give You Up      │   │
  │   │                                             │   │
  │   │  ▶ YouTube  ·  Video  ·  1080p  ·  ~45 MB  │   │
  │   │                                             │   │
  │   │          [ ⬇  DOWNLOAD NOW ]                │   │
  │   │                                             │   │
  │   └─────────────────────────────────────────────┘   │
  │                                                     │
  │   [ ← Download another ]                           │
  │                                                     │
  └─────────────────────────────────────────────────────┘

  Preview card displays:
  ─────────────────────
  • Thumbnail (from source platform)
  • Title / caption
  • Platform icon & name
  • Media type (Video / Image)
  • Quality (resolution)
  • Estimated file size (when available)
  • Duration (for videos)
```

#### Step 5: Download
```
  USER ACTIONS:
  1. Reviews the preview card
  2. Clicks "DOWNLOAD NOW"

  SYSTEM ACTIONS:
  1. Request /api/download with media details
  2. Server fetches/streams the media file
  3. Browser receives file with proper headers:
     - Content-Disposition: attachment; filename="title.mp4"
     - Content-Type: video/mp4 (or image/jpeg, etc.)
  4. Browser's native download dialog appears
  5. File saves to user's default download folder

  USER SEES:
  • Browser's native download progress bar
  • Download button changes to "Downloading..."
  • On complete: "Download another" prompt
```

---

## 2. Image Download Flow

Identical to the primary flow, but the preview card adapts for images:

```
  IMAGE PREVIEW CARD
  ─────────────────────────────────────────────

  ┌─────────────────────────────────────────────┐
  │  ┌─────────────────────────────────────┐    │
  │  │                                     │    │
  │  │         🖼️ IMAGE PREVIEW            │    │
  │  │         (actual image shown)         │    │
  │  │                                     │    │
  │  └─────────────────────────────────────┘    │
  │                                             │
  │  Sunset photo from @photographer            │
  │                                             │
  │  📷 Instagram  ·  Image  ·  1920×1080       │
  │                ·  JPG  ·  ~2.4 MB           │
  │                                             │
  │          [ ⬇  DOWNLOAD NOW ]                │
  │                                             │
  └─────────────────────────────────────────────┘
```

---

## 3. Error Flows

### 3.1 Invalid URL
```
  TRIGGER: User submits malformed or empty URL.
  TIMING: Instant (client-side validation).

  ┌───────────────────────────────────────────┐
  │                                           │
  │  ┌─────────────────────────────────┐      │
  │  │  not-a-real-url                 │      │
  │  └─────────────────────────────────┘      │
  │  ⚠️ Please enter a valid URL              │
  │                                           │
  └───────────────────────────────────────────┘
```

### 3.2 Unsupported Platform
```
  TRIGGER: URL is valid but from an unsupported platform.
  TIMING: After server analysis (~1-2 seconds).

  ┌───────────────────────────────────────────────────┐
  │                                                   │
  │  ┌──────────────────────────────────────────┐     │
  │  │  https://vimeo.com/123456789             │     │
  │  └──────────────────────────────────────────┘     │
  │                                                   │
  │  ┌──────────────────────────────────────────┐     │
  │  │  😔  Platform not supported yet          │     │
  │  │                                          │     │
  │  │  We currently support:                   │     │
  │  │  YouTube · Facebook · Instagram · X      │     │
  │  │                                          │     │
  │  │  [ Try another URL ]                     │     │
  │  └──────────────────────────────────────────┘     │
  │                                                   │
  └───────────────────────────────────────────────────┘
```

### 3.3 Private / Restricted Content
```
  TRIGGER: Content exists but is private, age-restricted,
           or geo-blocked.
  TIMING: After server analysis.

  ┌───────────────────────────────────────────────────┐
  │                                                   │
  │  ┌──────────────────────────────────────────┐     │
  │  │  🔒  This content is private             │     │
  │  │                                          │     │
  │  │  We can only download publicly           │     │
  │  │  available content.                      │     │
  │  │                                          │     │
  │  │  [ Try another URL ]                     │     │
  │  └──────────────────────────────────────────┘     │
  │                                                   │
  └───────────────────────────────────────────────────┘
```

### 3.4 Extraction Failed
```
  TRIGGER: Server-side extraction error (platform API
           change, network issue, etc.).
  TIMING: After server analysis.

  ┌───────────────────────────────────────────────────┐
  │                                                   │
  │  ┌──────────────────────────────────────────┐     │
  │  │  ⚠️  Something went wrong               │     │
  │  │                                          │     │
  │  │  We couldn't extract this media.         │     │
  │  │  This might be temporary.                │     │
  │  │                                          │     │
  │  │  [ Try again ]  [ Try another URL ]      │     │
  │  └──────────────────────────────────────────┘     │
  │                                                   │
  └───────────────────────────────────────────────────┘
```

### 3.5 Rate Limited
```
  TRIGGER: User exceeds rate limits.
  TIMING: Instant server response.

  ┌───────────────────────────────────────────────────┐
  │                                                   │
  │  ┌──────────────────────────────────────────┐     │
  │  │  ⏳  Slow down!                          │     │
  │  │                                          │     │
  │  │  You've made too many requests.          │     │
  │  │  Please wait 45 seconds before trying    │     │
  │  │  again.                                  │     │
  │  │                                          │     │
  │  │  ██████████░░░░░░░░░░  0:45              │     │
  │  └──────────────────────────────────────────┘     │
  │                                                   │
  └───────────────────────────────────────────────────┘
```

### 3.6 Download Failed
```
  TRIGGER: File download fails mid-stream.
  TIMING: During download.

  ┌───────────────────────────────────────────────────┐
  │                                                   │
  │  ┌──────────────────────────────────────────┐     │
  │  │  ⚠️  Download interrupted                │     │
  │  │                                          │     │
  │  │  The download was interrupted.           │     │
  │  │  This could be a network issue.          │     │
  │  │                                          │     │
  │  │  [ Retry download ]                      │     │
  │  └──────────────────────────────────────────┘     │
  │                                                   │
  └───────────────────────────────────────────────────┘
```

---

## 4. Flow Diagram — Complete State Machine

```
  ┌───────────────────────────────────────────────────────────────────┐
  │                       COMPLETE STATE MACHINE                      │
  └───────────────────────────────────────────────────────────────────┘

                              ┌──────────┐
                              │  IDLE    │ ◄───────────────────────┐
                              │ (landing)│                         │
                              └────┬─────┘                         │
                                   │                               │
                            User pastes URL                        │
                            & clicks FETCH                         │
                                   │                               │
                                   ▼                               │
                         ┌──────────────────┐                      │
                         │   VALIDATING     │                      │
                         │  (client-side)   │                      │
                         └────┬────────┬────┘                      │
                              │        │                           │
                          valid     invalid                        │
                              │        │                           │
                              │        ▼                           │
                              │   ┌──────────┐                    │
                              │   │  ERROR:  │──── user fixes ────┘
                              │   │ Invalid  │     URL & retries
                              │   │  URL     │
                              │   └──────────┘
                              │
                              ▼
                     ┌──────────────────┐
                     │   EXTRACTING     │
                     │  (loading state) │
                     │   POST /api/     │
                     │    extract       │
                     └──┬───────┬───┬───┘
                        │       │   │
                    success  error  rate
                        │       │   limited
                        │       │   │
                        │       │   ▼
                        │       │  ┌──────────┐
                        │       │  │ ERROR:   │──── wait ──────────┘
                        │       │  │ Rate     │     & retry
                        │       │  │ Limited  │
                        │       │  └──────────┘
                        │       │
                        │       ▼
                        │   ┌──────────────────┐
                        │   │  ERROR:          │
                        │   │  • Unsupported   │──── try another ──┘
                        │   │  • Private       │     URL
                        │   │  • Failed        │
                        │   └──────────────────┘
                        │
                        ▼
                 ┌──────────────────┐
                 │    PREVIEW       │
                 │  (media card     │
                 │   displayed)     │
                 └────┬────────┬────┘
                      │        │
               click       click "download
              download      another"
                      │        │
                      │        └──────────────────────────┘
                      ▼
              ┌──────────────────┐
              │   DOWNLOADING    │
              │  (browser native │
              │   download bar)  │
              └────┬────────┬────┘
                   │        │
               success    failure
                   │        │
                   │        ▼
                   │   ┌──────────┐
                   │   │ ERROR:   │──── retry ────▶ DOWNLOADING
                   │   │ Download │
                   │   │ Failed   │──── new URL ──────────┘
                   │   └──────────┘
                   │
                   ▼
              ┌──────────┐
              │ COMPLETE │
              │          │──── "Download another" ────────┘
              └──────────┘
```

---

## 5. Navigation Flows

### 5.1 Informational Pages
```
  From ANY page, the user can navigate to:

  ┌──────┐     ┌─────────┐     ┌──────────────┐
  │ Home │ ──▶ │  About  │ ──▶ │ How It Works │
  └──────┘     └─────────┘     └──────────────┘
     │              │                  │
     │              ▼                  ▼
     │         ┌─────────┐     ┌──────────────┐
     ├────────▶│   FAQ   │     │    Terms     │
     │         └─────────┘     └──────────────┘
     │                                │
     │                                ▼
     │                         ┌──────────────┐
     └────────────────────────▶│   Privacy    │
                               └──────────────┘

  The logo/brand name always links back to Home (/).
  All info pages have a prominent CTA to go back to
  the downloader (Home).
```

### 5.2 Page-to-Home Conversion
```
  Every informational page should have a call-to-action
  that brings the user back to the core experience:

  ┌─────────────────────────────────────────────┐
  │  About / FAQ / How It Works                 │
  │                                             │
  │  [... page content ...]                     │
  │                                             │
  │  ┌───────────────────────────────────────┐  │
  │  │  Ready to download?                   │  │
  │  │  [ ← Start downloading ]              │  │
  │  └───────────────────────────────────────┘  │
  │                                             │
  └─────────────────────────────────────────────┘
```
