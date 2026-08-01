## Context

1. In `src/lib/ytdlp.js`, `getStreamWithYtDlp` still included `--extractor-args youtube:player_client=android,web`. YouTube's android client restricts video stream outputs to mobile progressive 360p formats, preventing full 4K DASH video downloads.
2. In `src/app/page.module.css`, `.heroSection` sets `min-height: calc(100dvh - 80px)` with `align-items: center`. When `PreviewCard` is rendered inside `.heroInner`, the container height increases from ~350px to ~830px, causing flex vertical centering to push the top title into the header navbar and preventing comfortable page scrolling.

## Goals / Non-Goals

**Goals:**
- Ensure `getStreamWithYtDlp` streams uncompressed 4K / 1080p DASH video merged into MP4 container.
- Adjust hero section alignment when `extractedData` is present so the hero title retains fixed spacing under the navbar and page scrolling is effortless.

**Non-Goals:**
- Changing non-hero page sections or footer layouts.

## Decisions

1. **Clean `getStreamWithYtDlp` Execution Flags**:
   - *Decision*: Remove `'--extractor-args', 'youtube:player_client=android,web'` from `getStreamWithYtDlp`.
   - *Rationale*: Allows `yt-dlp` to select format 401/137 (4K / 1080p DASH streams) and merge them with audio.

2. **Adaptive Hero Flex Alignment**:
   - *Decision*: Apply `align-items: flex-start` and `padding-top: clamp(32px, 5vh, 64px)` on `.heroSection` when preview card is visible.
   - *Rationale*: Prevents vertical flex centering from shifting hero text upwards and ensures full content scrollability.

## Risks / Trade-offs

- **[Risk] Large File Downloads** → *Mitigation*: Stream response chunks directly to user without loading full 200MB+ buffer into Node RAM.
