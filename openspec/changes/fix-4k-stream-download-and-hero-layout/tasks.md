## 1. 4K Stream Download Fix

- [x] 1.1 Remove `'--extractor-args', 'youtube:player_client=android,web'` from `getStreamWithYtDlp` in `src/lib/ytdlp.js`.
- [x] 1.2 Verify that `getStreamWithYtDlp` streams true 4K / 1080p DASH videos remuxed into MP4.

## 2. Hero Section Layout & Scroll Fix

- [x] 2.1 Update `.heroSection` and preview wrapper in `src/app/page.module.css` to use `align-items: flex-start` with clean top padding when preview card is displayed.
- [x] 2.2 Verify that hero title remains fixed below top navbar and vertical scrolling is smooth and unblocked.
