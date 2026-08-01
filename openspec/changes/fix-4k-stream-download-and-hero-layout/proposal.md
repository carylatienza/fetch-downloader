## Why

1. `getStreamWithYtDlp` still contained `--extractor-args youtube:player_client=android,web` which forced `yt-dlp` to fallback to 360p (Format 18, ~11MB) during video downloading, causing blurry downloads even when metadata reported 4K (`2160p (4K)`).
2. When a media item is previewed, the hero section flex alignment (`align-items: center` with `min-height: calc(100dvh - 80px)`) pushes the title "Fetch" upwards into the header navigation bar and restricts smooth page scrolling.

## What Changes

- Remove `'--extractor-args', 'youtube:player_client=android,web'` from `getStreamWithYtDlp()` in `src/lib/ytdlp.js` so video downloads stream true 4K (2160p) remuxed MP4 files (~200MB+).
- Update `.heroSection` in `src/app/page.module.css` (or `page.js` preview layout wrapper) to use `align-items: flex-start` with clean top padding when previewing, keeping the header title fixed below the navbar and restoring smooth scrolling.

## Capabilities

### New Capabilities

- `4k-video-stream-download`: True high-resolution DASH video streaming download capability that outputs full 4K / 1080p MP4 files.
- `responsive-hero-preview-layout`: Smooth layout adjustment when PreviewCard is visible that prevents header overlap and maintains scrollability.

### Modified Capabilities

- None

## Impact

- `src/lib/ytdlp.js`: Cleaned streaming arguments in `getStreamWithYtDlp`.
- `src/app/page.module.css`: Improved hero section layout alignment and scroll spacing.
