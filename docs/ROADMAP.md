# Fetch — Roadmap

> **Version:** 1.0
> **Last Updated:** July 29, 2025

---

## Current Release: V1

Focused on core functionality — single-URL download from 4 platforms.

See [PRD.md](./PRD.md) for full V1 feature specification.

---

## Future Features

### 🔄 Batch Downloads
- Paste multiple URLs at once.
- Queue system with individual progress indicators.
- Download all as a ZIP archive.
- **Why:** Creatives often need to grab multiple references in one session.

### 📜 Download History
- Store past downloads in browser localStorage.
- Searchable and filterable list.
- Re-download previously fetched media.
- No account required — fully client-side.
- **Why:** Users often need to re-download something they fetched before.

### 🔌 Public API
- Offer extraction as a service (`/api/v1/extract`).
- API key authentication.
- Usage tiers (free / paid).
- Rate limiting per API key.
- API documentation page at `/api`.
- **Why:** Other developers could build on top of Fetch's extraction engine.

### 🌐 Additional Platform Support
- TikTok
- Reddit (videos & images)
- Pinterest (images)
- Vimeo
- Dailymotion
- Threads
- LinkedIn (videos)
- **Why:** More platforms = more value for users.

### 🎚️ Quality & Format Selection
- Let users choose resolution (1080p, 720p, 480p).
- Let users choose format (MP4, WEBM, MP3 audio-only).
- "Best quality" remains the default.
- **Why:** Some users need smaller files or specific formats.

### 🎵 Audio-Only Downloads
- Extract audio from videos (MP3, AAC).
- Useful for music, podcasts, and voice content.
- Powered by ffmpeg conversion on the server.
- **Why:** Common request — many users just want the audio track.

### 📱 Mobile Optimization
- Fully optimized mobile experience.
- Share-to-Fetch integration (mobile share sheet).
- Progressive Web App (PWA) for home screen installation.
- **Why:** Significant percentage of social media use is mobile.

### 🖼️ Stock Image Support
- Download watermarked previews from Getty, Shutterstock, Adobe Stock.
- Help users with existing subscriptions batch-download licensed content.
- **Why:** Creatives who already have subscriptions need better download tools.
- **Note:** Legal considerations — watermark-free downloads without a license are not supported.

### 🌙 Theme Options
- Dark mode / light mode toggle.
- System preference detection.
- Persistent preference (localStorage).
- **Why:** User comfort and accessibility.

### 📊 Analytics Dashboard (Admin)
- Track download counts per platform.
- Monitor error rates.
- Server health overview.
- Popular content trends.
- **Why:** Operational visibility as the tool scales.

### 🔐 User Accounts (Optional)
- Sign up to save download history server-side.
- Higher rate limits for registered users.
- Favorite / bookmark media.
- **Why:** Power users may want persistent features.

### 🌍 Internationalization (i18n)
- Multi-language support.
- Auto-detect browser language.
- Community-contributed translations.
- **Why:** Global user base.

---

## Priority Matrix

| Feature                    | Impact | Effort | Priority   |
|----------------------------|--------|--------|------------|
| Batch downloads            | High   | Medium | ⭐ High     |
| Download history           | Medium | Low    | ⭐ High     |
| Public API                 | High   | High   | ⭐ High     |
| Additional platforms       | High   | Medium | ⭐ High     |
| Quality/format selection   | Medium | Medium | Medium     |
| Audio-only downloads       | Medium | Low    | Medium     |
| Mobile optimization        | High   | Medium | Medium     |
| Dark/light theme           | Low    | Low    | Medium     |
| Stock image support        | Medium | High   | Low        |
| User accounts              | Medium | High   | Low        |
| Analytics dashboard        | Low    | Medium | Low        |
| Internationalization       | Medium | High   | Low        |

---

## Suggested Release Timeline

| Version | Focus                                      |
|---------|--------------------------------------------|
| V1.0    | Core downloader — 4 platforms, single URL  |
| V1.1    | Download history + dark/light theme        |
| V1.2    | Quality/format selection + audio-only      |
| V2.0    | Batch downloads + additional platforms     |
| V3.0    | Public API launch                          |
