## Context

`yt-dlp` CLI supports two main functions: metadata extraction (`--dump-json`) and binary stream downloading (`-o -`). Passing format specification flags (`-f`) into `--dump-json` causes `yt-dlp` to prune the output JSON data down to matching formats only. This pruned data lacks the 1080p and 4K DASH video formats. Separating metadata extraction flags from download stream flags resolves the problem cleanly.

## Goals / Non-Goals

**Goals:**
- Extract all available formats (DASH + progressive) in `getMetadataWithYtDlp` without format pruning.
- Enable `YouTubeExtractor` to read all video format heights and calculate true max height (1080p, 1440p, 2160p 4K).
- Maintain 4K video remux streaming in `getStreamWithYtDlp`.

**Non-Goals:**
- Altering Facebook or Instagram extractor metadata logic.

## Decisions

1. **Clean `--dump-json` Parameters**:
   - *Decision*: In `getMetadataWithYtDlp`, pass `['--dump-json', '--no-warnings', '--no-playlist', '--no-check-certificates', url]`. Omit `-f` and `player_client=android`.
   - *Rationale*: Guarantees YouTube returns all 30+ available stream objects in the `formats` array.

2. **DASH Format Stream Selection for Downloads**:
   - *Decision*: Retain `-f bestvideo+bestaudio/best --merge-output-format mp4` in `getStreamWithYtDlp`.
   - *Rationale*: Download stream functions need to request best video + best audio to perform FFmpeg remuxing during download.

## Risks / Trade-offs

- **[Risk] JSON Buffer Size** → *Mitigation*: Node buffer size is already configured with `maxBuffer: 10 * 1024 * 1024` (10MB), sufficient for complex video info JSON.
