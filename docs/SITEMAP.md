# Fetch — Sitemap

> **Version:** 1.0
> **Last Updated:** July 29, 2025

---

## 1. Site Structure

```
  FETCH — SITEMAP
  ═══════════════════════════════════════════════════════════════

  fetch.app (or your-domain.com)
  │
  ├── /                          HOME (Main Downloader)
  │   │
  │   ├── URL Input Section      Hero + URL paste field
  │   ├── Loading State          Extraction progress UI
  │   ├── Preview Card           Media preview + download CTA
  │   └── Supported Platforms    Platform icons/badges
  │
  ├── /about                     ABOUT
  │   │
  │   ├── Mission Statement      What Fetch is & why
  │   ├── How It's Different     Value proposition
  │   └── CTA                    Link back to downloader
  │
  ├── /how-it-works              HOW IT WORKS
  │   │
  │   ├── Step 1                 Copy your URL
  │   ├── Step 2                 Paste into Fetch
  │   ├── Step 3                 Preview & download
  │   └── CTA                   Link back to downloader
  │
  ├── /faq                       FAQ
  │   │
  │   ├── General Questions      What is Fetch, is it free, etc.
  │   ├── Platform Questions     Which sites are supported, etc.
  │   ├── Technical Questions    File formats, quality, etc.
  │   ├── Legal Questions        Is it legal, copyright, etc.
  │   └── CTA                   Link back to downloader
  │
  ├── /terms                     TERMS OF SERVICE
  │   │
  │   ├── Acceptance of Terms
  │   ├── Permitted Use
  │   ├── Prohibited Use
  │   ├── Disclaimer
  │   ├── Limitation of Liability
  │   └── Contact Information
  │
  └── /privacy                   PRIVACY POLICY
      │
      ├── Data Collection        What data we collect (minimal)
      ├── Data Usage             How we use it
      ├── Cookies                Cookie policy
      ├── Third Parties          Third-party services
      └── Contact                How to reach us
```

---

## 2. Page Hierarchy & Navigation

```
  NAVIGATION STRUCTURE
  ═══════════════════════════════════════════════════

  ┌─────────────────────────────────────────────────┐
  │  HEADER (persistent across all pages)           │
  │                                                 │
  │  [LOGO] Fetch      About  How It Works  FAQ     │
  └─────────────────────────────────────────────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │    PAGE CONTENT     │
              │                     │
              │    (varies by       │
              │     route)          │
              │                     │
              └─────────────────────┘
                         │
                         ▼
  ┌─────────────────────────────────────────────────┐
  │  FOOTER (persistent across all pages)           │
  │                                                 │
  │  Fetch © 2025                                   │
  │                                                 │
  │  Product        Legal          Social           │
  │  ─────────      ──────         ──────           │
  │  Home           Terms          GitHub            │
  │  About          Privacy                         │
  │  How It Works                                   │
  │  FAQ                                            │
  │                                                 │
  └─────────────────────────────────────────────────┘
```

---

## 3. Page Details

### 3.1 Home `/`
| Element               | Description                              | Priority |
|-----------------------|------------------------------------------|----------|
| Hero Section          | Headline, subtext, URL input             | Critical |
| URL Input             | Paste field + "Fetch" button             | Critical |
| Platform Badges       | YouTube, Facebook, Instagram, X icons    | High     |
| Loading State         | Animated extraction progress             | Critical |
| Preview Card          | Thumbnail, title, metadata, download btn | Critical |
| How It Works (brief)  | 3-step visual guide below the fold       | Medium   |

**SEO:**
- Title: `Fetch — Download Videos & Images from Any Platform`
- Meta: `Download videos and images from YouTube, Facebook, Instagram, and X in the best quality. Free, fast, no ads.`
- H1: `Download anything. Anywhere.`

---

### 3.2 About `/about`
| Element               | Description                              | Priority |
|-----------------------|------------------------------------------|----------|
| Mission               | Why Fetch exists                         | High     |
| How It's Different    | No ads, best quality, all platforms      | High     |
| CTA                   | "Start downloading" button               | Medium   |

**SEO:**
- Title: `About Fetch — The All-in-One Media Downloader`
- Meta: `Learn about Fetch, the free tool that lets you download videos and images from YouTube, Facebook, Instagram, and X — all in one place.`

---

### 3.3 How It Works `/how-it-works`
| Element               | Description                              | Priority |
|-----------------------|------------------------------------------|----------|
| Step 1                | Copy URL from platform — with visual     | High     |
| Step 2                | Paste into Fetch — with visual           | High     |
| Step 3                | Preview and download — with visual       | High     |
| Platform Support      | List of supported platforms              | Medium   |
| CTA                   | "Try it now" button                      | Medium   |

**SEO:**
- Title: `How Fetch Works — Download in 3 Steps`
- Meta: `Copy a URL, paste it into Fetch, and download your video or image in the highest quality. It's that simple.`

---

### 3.4 FAQ `/faq`
| Section               | Sample Questions                                     |
|-----------------------|------------------------------------------------------|
| General               | What is Fetch? Is it free? Do I need an account?     |
| Platforms             | Which platforms are supported? Can I download reels? |
| Technical             | What quality do I get? What formats? Max file size?  |
| Legal                 | Is downloading legal? What about copyright?          |

**SEO:**
- Title: `FAQ — Fetch Media Downloader`
- Meta: `Frequently asked questions about Fetch. Learn about supported platforms, download quality, file formats, and more.`

---

### 3.5 Terms of Service `/terms`
| Section                     | Content                                      |
|-----------------------------|----------------------------------------------|
| Acceptance                  | By using Fetch, you agree to these terms     |
| Permitted Use               | Personal, non-commercial use only            |
| Prohibited Use              | No redistribution, no commercial use         |
| Intellectual Property       | Users responsible for copyright compliance   |
| Disclaimer                  | "As-is" service, no guarantees               |
| Limitation of Liability     | Not liable for user misuse                   |
| Changes to Terms            | Right to update terms                        |

**SEO:**
- Title: `Terms of Service — Fetch`

---

### 3.6 Privacy Policy `/privacy`
| Section                     | Content                                      |
|-----------------------------|----------------------------------------------|
| Data Collection             | No personal data stored, no accounts         |
| Server Logs                 | Standard server logs (IP, timestamp)         |
| Cookies                     | Minimal / none required for V1               |
| Third-Party Services        | Render.com hosting                           |
| Data Retention              | No media is stored; processed and discarded  |
| Contact                     | Email for privacy inquiries                  |

**SEO:**
- Title: `Privacy Policy — Fetch`

---

## 4. API Routes (Internal)

These are not user-facing pages, but are part of the site architecture:

```
  API STRUCTURE
  ═══════════════════════════════════════════════════

  /api
  │
  ├── /api/extract          POST    Extract media metadata
  │   ├── Request:  { url: string }
  │   └── Response: { title, thumbnail, platform,
  │                   mediaType, quality, fileSize,
  │                   duration, downloadUrl }
  │
  ├── /api/download         GET     Stream media file
  │   ├── Query:    ?url=<encoded_media_url>&filename=<name>
  │   └── Response: File stream with download headers
  │
  └── /api/health           GET     Health check
      └── Response: { status: "ok", uptime, version }
```

---

## 5. URL Map (Quick Reference)

| Route             | Type      | Auth | Purpose                    |
|-------------------|-----------|------|----------------------------|
| `/`               | Page      | No   | Main downloader            |
| `/about`          | Page      | No   | About the project          |
| `/how-it-works`   | Page      | No   | Usage guide                |
| `/faq`            | Page      | No   | Frequently asked questions |
| `/terms`          | Page      | No   | Terms of service           |
| `/privacy`        | Page      | No   | Privacy policy             |
| `/api/extract`    | API (POST)| No   | Extract media metadata     |
| `/api/download`   | API (GET) | No   | Download media file        |
| `/api/health`     | API (GET) | No   | Health check               |
