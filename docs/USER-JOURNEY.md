# Fetch — User Journey Map

> **Version:** 1.0
> **Last Updated:** July 29, 2025

---

## 1. User Personas

### Persona A: "The Creative" — Maya, 26

```
  ┌─────────────────────────────────────────────────────────────┐
  │  MAYA — Freelance Graphic Designer                          │
  │                                                             │
  │  Age: 26 · Location: Philippines · Device: Desktop (Mac)    │
  │                                                             │
  │  "I spend half my time hunting for reference material        │
  │   across 5 different sketchy downloader sites."             │
  │                                                             │
  │  GOALS                         FRUSTRATIONS                 │
  │  ──────                        ────────────                 │
  │  • Grab high-res images for    • Every platform needs a     │
  │    mood boards & references      different downloader       │
  │  • Save video tutorials and    • Most tools give low-res    │
  │    process videos                garbage (480p, compressed) │
  │  • Archive client inspiration  • Popup ads, fake download   │
  │    from social media             buttons, malware risk      │
  │  • Get assets FAST — time is   • Tools break constantly,    │
  │    literally money               wasting time               │
  │                                                             │
  │  PLATFORMS SHE USES            HOW OFTEN                    │
  │  ──────────────────            ─────────                    │
  │  Instagram (mood boards)       Daily                        │
  │  YouTube (tutorials)           3-4x/week                    │
  │  X/Twitter (design trends)     2-3x/week                    │
  │  Facebook (client content)     Weekly                       │
  │                                                             │
  │  TECH COMFORT: ████████░░ 8/10                              │
  └─────────────────────────────────────────────────────────────┘
```

---

### Persona B: "The Content Curator" — James, 31

```
  ┌─────────────────────────────────────────────────────────────┐
  │  JAMES — Social Media Manager                               │
  │                                                             │
  │  Age: 31 · Location: Manila · Device: Desktop (Windows)     │
  │                                                             │
  │  "I need to download competitor content for analysis,       │
  │   but I don't want to install shady browser extensions."    │
  │                                                             │
  │  GOALS                         FRUSTRATIONS                 │
  │  ──────                        ────────────                 │
  │  • Download competitor posts   • Browser extensions feel    │
  │    for content analysis          unsafe / slow down browser │
  │  • Save viral videos for       • Can't easily download     │
  │    inspiration / benchmarking    from Instagram without     │
  │  • Archive campaign content      an app                    │
  │    across platforms            • Video quality is never     │
  │  • Quick turnaround — boss      good enough for analysis   │
  │    needs it "5 minutes ago"    • Some tools require sign-up │
  │                                  just to download one file  │
  │                                                             │
  │  PLATFORMS HE USES             HOW OFTEN                    │
  │  ──────────────────            ─────────                    │
  │  Facebook (campaigns)          Daily                        │
  │  Instagram (competitor posts)  Daily                        │
  │  YouTube (ad analysis)         2-3x/week                    │
  │  X/Twitter (trending content)  Daily                        │
  │                                                             │
  │  TECH COMFORT: ██████░░░░ 6/10                              │
  └─────────────────────────────────────────────────────────────┘
```

---

### Persona C: "The Casual Saver" — Aira, 22

```
  ┌─────────────────────────────────────────────────────────────┐
  │  AIRA — College Student                                     │
  │                                                             │
  │  Age: 22 · Location: Cebu · Device: Laptop + Phone          │
  │                                                             │
  │  "My friend sent me a funny video on X but I can't save     │
  │   it without some random website full of pop-ups."          │
  │                                                             │
  │  GOALS                         FRUSTRATIONS                 │
  │  ──────                        ────────────                 │
  │  • Save funny/viral videos     • Google results for         │
  │    friends share in group        "download twitter video"   │
  │    chats                         give 10 different sites    │
  │  • Download YouTube videos     • Half of them don't even    │
  │    for offline watching          work anymore               │
  │  • Save photos from Instagram  • Pop-ups and redirects are  │
  │    without screenshotting        scary — "is this safe?"    │
  │  • Keep it simple — she        • Screenshotting Instagram   │
  │    doesn't want to think         gives terrible quality     │
  │                                                             │
  │  PLATFORMS SHE USES            HOW OFTEN                    │
  │  ──────────────────            ─────────                    │
  │  YouTube (entertainment)       Daily                        │
  │  X/Twitter (memes, threads)    Daily                        │
  │  Instagram (photos, reels)     Daily                        │
  │  Facebook (family content)     Weekly                       │
  │                                                             │
  │  TECH COMFORT: ████░░░░░░ 4/10                              │
  └─────────────────────────────────────────────────────────────┘
```

---

### Persona D: "The Video Editor" — Carlos, 28

```
  ┌─────────────────────────────────────────────────────────────┐
  │  CARLOS — Freelance Video Editor                            │
  │                                                             │
  │  Age: 28 · Location: Quezon City · Device: Desktop (Win)    │
  │                                                             │
  │  "I need the HIGHEST quality possible. 720p won't cut it    │
  │   when I'm editing for a client delivering in 4K."         │
  │                                                             │
  │  GOALS                         FRUSTRATIONS                 │
  │  ──────                        ────────────                 │
  │  • Download source videos at   • Most tools cap at 720p     │
  │    maximum available quality     or don't offer format      │
  │  • Get reference footage         choice                    │
  │    from social platforms       • YouTube downloaders are    │
  │  • Download b-roll and stock     unreliable — break every   │
  │    footage for projects          few weeks                  │
  │  • Reliable tool that works    • Some sites secretly        │
  │    every time                    re-encode/compress the     │
  │                                  video before downloading  │
  │                                                             │
  │  PLATFORMS HE USES             HOW OFTEN                    │
  │  ──────────────────            ─────────                    │
  │  YouTube (reference/b-roll)    Daily                        │
  │  Facebook (client content)     3-4x/week                    │
  │  Instagram (reels/stories)     2-3x/week                    │
  │  X/Twitter (viral clips)       Weekly                       │
  │                                                             │
  │  TECH COMFORT: █████████░ 9/10                              │
  └─────────────────────────────────────────────────────────────┘
```

---

## 2. The Problem Landscape

### 2.1 Current Experience — "The Download Gauntlet"

Every user, regardless of persona, goes through some version of this today:

```
  THE DOWNLOAD GAUNTLET (current state)
  ═══════════════════════════════════════════════════════════════

  Step 1: DISCOVER                         Emotional State
  ─────────────────                        ────────────────
  See something worth saving               😊 Excited
  on social media                          "I need this!"
       │
       ▼
  Step 2: ATTEMPT NATIVE SAVE             
  ────────────────────────────             
  Try to save/download within              😐 Mildly annoyed
  the platform itself                      "Why can't I just
       │                                    right-click save?"
       ▼
  Step 3: REALIZE IT'S BLOCKED            
  ────────────────────────────             
  Platform doesn't allow direct            😤 Frustrated
  downloads (or only low quality)          "Seriously?"
       │
       ▼
  Step 4: GOOGLE A SOLUTION               
  ─────────────────────────                
  Search "download [platform]              😐 Resigned
  video online"                            "Here we go again..."
       │
       ▼
  Step 5: THE SKETCHY SITE LOTTERY        
  ────────────────────────────             
  ┌──────────────────────────────────────────────────────┐
  │                                                      │
  │  Try site #1 → broken / doesn't work                │
  │  Try site #2 → too many popups, feels unsafe        │
  │  Try site #3 → works but gives 360p quality         │
  │  Try site #4 → requires browser extension install   │
  │  Try site #5 → FINALLY works... maybe               │
  │                                                      │
  └──────────────────────────────────────────────────────┘
       │                                   😡 Angry
       │                                   "I've wasted 15
       ▼                                    minutes on this"
  Step 6: COMPROMISE                      
  ──────────────────                       
  Accept whatever quality they get,        😩 Defeated
  or give up entirely                      "Good enough I guess"
       │
       ▼
  Step 7: REPEAT NEXT TIME               
  ─────────────────────────                
  Forget which site worked.                😫 Exhausted
  Start from Step 4 again.                 "Not this again"
```

### 2.2 Pain Point Matrix

```
  PAIN POINTS BY PERSONA
  ═══════════════════════════════════════════════════════════════

                          Maya    James   Aira    Carlos
                         (Creat) (Curat) (Casual)(Editor)
  ─────────────────────  ──────  ──────  ──────  ──────
  Fragmented tools        🔴🔴🔴   🔴🔴🔴   🔴🔴     🔴🔴🔴
  Low quality output      🔴🔴🔴   🔴🔴     🔴       🔴🔴🔴
  Ads / popups / safety   🔴🔴     🔴🔴     🔴🔴🔴   🔴
  Time wasted             🔴🔴🔴   🔴🔴🔴   🔴🔴     🔴🔴🔴
  Tools breaking          🔴🔴     🔴🔴     🔴🔴🔴   🔴🔴🔴
  No preview before DL    🔴🔴     🔴       🔴       🔴🔴🔴
  Requires signup/ext.    🔴       🔴🔴🔴   🔴🔴     🔴
  ─────────────────────  ──────  ──────  ──────  ──────

  🔴    = minor pain
  🔴🔴   = moderate pain
  🔴🔴🔴  = severe pain
```

---

## 3. User Journeys

### Journey 1: Maya — "The Mood Board Sprint"

**Scenario:** Maya is building a mood board for a branding client. She needs to grab 8 reference images from Instagram and 2 process videos from YouTube.

```
  MAYA'S JOURNEY — TODAY (without Fetch)
  ═══════════════════════════════════════════════════════════════

  ┌──────────────────────────────────────────────────────────┐
  │ 9:00 AM                                                  │
  │ Opens Instagram, finds perfect brand photography         │
  │ from @photographer                                       │
  │                                                          │
  │ 😊 "This is exactly the aesthetic the client wants"      │
  │                                                          │
  │ 9:02 AM                                                  │
  │ Right-clicks image → no "Save Image" at full res         │
  │ Screenshots it → terrible quality, UI chrome included    │
  │                                                          │
  │ 😤 "Instagram makes this so annoying"                    │
  │                                                          │
  │ 9:05 AM                                                  │
  │ Googles "download instagram photo full quality"          │
  │ Tries igram.io → works for the first image               │
  │                                                          │
  │ 😐 "Okay, 1 down, 7 to go"                              │
  │                                                          │
  │ 9:15 AM                                                  │
  │ igram.io stops working on the 4th image                  │
  │ Tries snapinsta → popup redirects twice                  │
  │ Tries a third site → requires browser extension          │
  │                                                          │
  │ 😡 "I've been at this for 10 minutes!"                   │
  │                                                          │
  │ 9:25 AM                                                  │
  │ Now needs YouTube videos. Googles another downloader.    │
  │ y2mate → works but gives 720p only.                      │
  │ savefrom.net → gives 1080p but with watermark ad         │
  │                                                          │
  │ 😫 "This is NOT what I should be spending my time on"    │
  │                                                          │
  │ 9:40 AM                                                  │
  │ Finally has all files. 40 minutes lost.                  │
  │ Some images are low-res. One video is 720p.              │
  │                                                          │
  │ 😩 "I'll fix it in the presentation somehow"             │
  └──────────────────────────────────────────────────────────┘

  TIME SPENT: 40 minutes
  QUALITY: Mixed — some low-res, one video not full HD
  EMOTIONAL STATE: Frustrated, defeated, behind schedule
```

```
  MAYA'S JOURNEY — WITH FETCH
  ═══════════════════════════════════════════════════════════════

  ┌──────────────────────────────────────────────────────────┐
  │ 9:00 AM                                                  │
  │ Opens Instagram, finds perfect brand photography         │
  │                                                          │
  │ 😊 "This is exactly the aesthetic the client wants"      │
  │                                                          │
  │ 9:01 AM                                                  │
  │ Opens Fetch in another tab (bookmarked)                  │
  │ Copies Instagram post URL → pastes into Fetch            │
  │ Preview shows full-res image → clicks Download           │
  │                                                          │
  │ 😊 "Perfect, full quality"                               │
  │                                                          │
  │ 9:03 AM                                                  │
  │ Repeats for remaining 7 Instagram images.                │
  │ Same flow every time. Same site. All full-res.           │
  │                                                          │
  │ 😄 "This is SO much faster"                              │
  │                                                          │
  │ 9:10 AM                                                  │
  │ Copies YouTube video URL → pastes into SAME tab          │
  │ Preview shows 1080p video → clicks Download              │
  │ Repeats for second video.                                │
  │                                                          │
  │ 😍 "Done. Same tool for everything."                     │
  │                                                          │
  │ 9:14 AM                                                  │
  │ All 10 files downloaded. Full quality. Zero ads.         │
  │                                                          │
  │ 😎 "26 minutes saved. Back to actual design work."       │
  └──────────────────────────────────────────────────────────┘

  TIME SPENT: 14 minutes
  QUALITY: Maximum available across all platforms
  EMOTIONAL STATE: Satisfied, productive, in flow
  TIME SAVED: 26 minutes (65% reduction)
```

---

### Journey 2: James — "The Competitor Deep Dive"

**Scenario:** James's boss asks him to analyze a competitor's top-performing social content by EOD. He needs to download 3 Facebook videos, 2 Instagram reels, and 5 tweets with images.

```
  JAMES'S JOURNEY — TODAY (without Fetch)
  ═══════════════════════════════════════════════════════════════

  ┌──────────────────────────────────────────────────────────┐
  │ 2:00 PM                                                  │
  │ Boss: "I need competitor content analysis by 5 PM"       │
  │                                                          │
  │ 😰 "That's 10 pieces of content across 3 platforms"     │
  │                                                          │
  │ 2:05 PM                                                  │
  │ Starts with Facebook videos.                             │
  │ Googles "download facebook video" — finds fbdown.net     │
  │ First video works. Second one doesn't extract.           │
  │ Tries getfvid.com for the remaining two.                 │
  │                                                          │
  │ 😤 "Why did the first site work but not the second URL?" │
  │                                                          │
  │ 2:25 PM                                                  │
  │ Moves to Instagram reels.                                │
  │ Googles "download instagram reel" — different site.      │
  │ Site asks him to create an account first.                 │
  │                                                          │
  │ 😡 "I'm NOT making an account for this"                  │
  │                                                          │
  │ 2:35 PM                                                  │
  │ Finds another Instagram downloader. Works but            │
  │ downloads the reel as low quality.                       │
  │                                                          │
  │ 2:50 PM                                                  │
  │ Now needs X/Twitter images. Yet another site.            │
  │ ssstwitter gives him the images but tiny resolution.     │
  │ Has to figure out the orig quality trick manually.       │
  │                                                          │
  │ 😫 "I've used 4 different sites and it's been an hour"   │
  │                                                          │
  │ 3:10 PM                                                  │
  │ Finally has everything. Quality is inconsistent.         │
  │ Still needs to do the actual analysis.                   │
  │ Now has less than 2 hours.                               │
  │                                                          │
  │ 😩 "The downloading shouldn't be the hard part"          │
  └──────────────────────────────────────────────────────────┘

  TIME SPENT: 70 minutes on downloading alone
  QUALITY: Inconsistent — mixed resolutions
  EMOTIONAL STATE: Stressed, behind, frustrated
```

```
  JAMES'S JOURNEY — WITH FETCH
  ═══════════════════════════════════════════════════════════════

  ┌──────────────────────────────────────────────────────────┐
  │ 2:00 PM                                                  │
  │ Boss: "I need competitor content analysis by 5 PM"       │
  │                                                          │
  │ 😊 "No problem, I've got Fetch"                         │
  │                                                          │
  │ 2:05 PM                                                  │
  │ Opens Fetch. Pastes first Facebook video URL.            │
  │ Preview → Download. Repeats for 2 more.                  │
  │ All 3 Facebook videos done in 8 minutes.                 │
  │                                                          │
  │ 2:13 PM                                                  │
  │ Pastes Instagram reel URL into the SAME tool.            │
  │ Preview shows reel thumbnail + duration.                 │
  │ Downloads both reels in full quality.                    │
  │                                                          │
  │ 2:18 PM                                                  │
  │ Pastes X/Twitter URLs. Images download at original       │
  │ resolution. No tricks needed.                            │
  │                                                          │
  │ 😎 "All 10 pieces downloaded in 20 minutes"             │
  │                                                          │
  │ 2:25 PM                                                  │
  │ Already started the actual analysis.                     │
  │ Has 2.5 hours left. Plenty of time.                      │
  │                                                          │
  │ 😊 "I should tell the team about this tool"              │
  └──────────────────────────────────────────────────────────┘

  TIME SPENT: 20 minutes on downloading
  QUALITY: Consistent — all maximum quality
  EMOTIONAL STATE: Calm, confident, ahead of schedule
  TIME SAVED: 50 minutes (71% reduction)
```

---

### Journey 3: Aira — "The Viral Video Save"

**Scenario:** Aira's friend sends a funny video on X/Twitter in their group chat. She wants to save it to her phone/laptop to repost or watch offline.

```
  AIRA'S JOURNEY — TODAY (without Fetch)
  ═══════════════════════════════════════════════════════════════

  ┌──────────────────────────────────────────────────────────┐
  │ 8:30 PM                                                  │
  │ Group chat: "HAHAHA look at this video 😂"               │
  │ *friend sends X/Twitter link*                            │
  │                                                          │
  │ 😂 "LOL I need to save this"                             │
  │                                                          │
  │ 8:31 PM                                                  │
  │ Opens link. Tries to save the video. Can't.              │
  │ X doesn't have a download button.                        │
  │                                                          │
  │ 🤔 "How do I download this?"                             │
  │                                                          │
  │ 8:33 PM                                                  │
  │ Googles "download twitter video"                         │
  │ Clicks first result → ssstwitter.com                     │
  │ Page loads with 5 ads. Popup appears.                    │
  │ Accidentally clicks an ad. New tab opens.                │
  │                                                          │
  │ 😰 "Wait is this a virus?"                               │
  │                                                          │
  │ 8:36 PM                                                  │
  │ Closes popup tabs. Tries again carefully.                │
  │ Pastes URL. Clicks download. ANOTHER popup.              │
  │ Real download button is tiny and hidden.                 │
  │                                                          │
  │ 😤 "This is so sketchy"                                  │
  │                                                          │
  │ 8:39 PM                                                  │
  │ Finally downloads. But it's 360p.                        │
  │ Looks blurry when she tries to repost it.                │
  │                                                          │
  │ 😞 "Whatever, it's fine I guess"                         │
  │                                                          │
  │ 8:42 PM                                                  │
  │ Sends blurry video to another group chat.                │
  │ Friend: "why is it so low quality lol"                   │
  │                                                          │
  │ 😳 "..."                                                 │
  └──────────────────────────────────────────────────────────┘

  TIME SPENT: 12 minutes
  QUALITY: Low (360p)
  EMOTIONAL STATE: Anxious about safety, embarrassed by quality
  TRUST LEVEL: Low — "is this site safe?"
```

```
  AIRA'S JOURNEY — WITH FETCH
  ═══════════════════════════════════════════════════════════════

  ┌──────────────────────────────────────────────────────────┐
  │ 8:30 PM                                                  │
  │ Group chat: "HAHAHA look at this video 😂"               │
  │ *friend sends X/Twitter link*                            │
  │                                                          │
  │ 😂 "LOL I need to save this"                             │
  │                                                          │
  │ 8:31 PM                                                  │
  │ Opens Fetch (she remembers it — clean site, no ads)      │
  │ Pastes the X/Twitter link.                               │
  │ Preview shows video thumbnail: "Yep, that's the one"    │
  │ Clicks Download.                                         │
  │                                                          │
  │ 😊 "Done!"                                               │
  │                                                          │
  │ 8:33 PM                                                  │
  │ Sends HD video to the other group chat.                  │
  │ Friend: "how did you download it so clean??"             │
  │ Aira: "use Fetch, you're welcome 😎"                     │
  │                                                          │
  │ 😎 Word of mouth: +1 new user                           │
  └──────────────────────────────────────────────────────────┘

  TIME SPENT: 3 minutes
  QUALITY: Maximum available (1080p)
  EMOTIONAL STATE: Happy, confident, proud
  TRUST LEVEL: High — "clean site, no sketchy stuff"
  BONUS: Organic referral
```

---

### Journey 4: Carlos — "The B-Roll Hunt"

**Scenario:** Carlos is editing a documentary project and needs reference footage and behind-the-scenes content from a filmmaker's YouTube channel and Instagram.

```
  CARLOS'S JOURNEY — TODAY (without Fetch)
  ═══════════════════════════════════════════════════════════════

  ┌──────────────────────────────────────────────────────────┐
  │ 11:00 AM                                                 │
  │ Found a filmmaker's BTS video on YouTube — perfect       │
  │ reference for the style the client wants.                │
  │                                                          │
  │ 😊 "This is exactly the look I need"                     │
  │                                                          │
  │ 11:02 AM                                                 │
  │ Tries yt1s.com → gives 720p max. Unacceptable.          │
  │ Tries y2mate → gives 1080p but as WEBM, not MP4.        │
  │ His editing software (Premiere) handles WEBM poorly.     │
  │                                                          │
  │ 😤 "I need 1080p MP4, is that too much to ask?"          │
  │                                                          │
  │ 11:15 AM                                                 │
  │ Remembers yt-dlp exists (he's technical).                │
  │ Opens terminal. Runs the command. Gets 1080p MP4.        │
  │ Works — but took 10 minutes of CLI fiddling.             │
  │                                                          │
  │ 11:25 AM                                                 │
  │ Now needs Instagram behind-the-scenes photos.            │
  │ yt-dlp doesn't handle Instagram images well.             │
  │ Back to Googling "instagram photo downloader."           │
  │                                                          │
  │ 😫 "I literally just want the original resolution"       │
  │                                                          │
  │ 11:40 AM                                                 │
  │ Gets the photos but 2 of 5 are compressed.               │
  │ Will have to upscale them in Photoshop.                  │
  │                                                          │
  │ 😩 "40 minutes for 6 files. This is insane."             │
  └──────────────────────────────────────────────────────────┘

  TIME SPENT: 40 minutes
  QUALITY: Mixed — video OK, some images compressed
  EMOTIONAL STATE: Frustrated by unnecessary friction
```

```
  CARLOS'S JOURNEY — WITH FETCH
  ═══════════════════════════════════════════════════════════════

  ┌──────────────────────────────────────────────────────────┐
  │ 11:00 AM                                                 │
  │ Found the BTS video on YouTube.                          │
  │ Opens Fetch → pastes URL.                                │
  │ Preview: "1080p · MP4 · 340MB" → Downloads.             │
  │                                                          │
  │ 😊 "1080p MP4, no conversion needed, straight to edit"   │
  │                                                          │
  │ 11:08 AM                                                 │
  │ Pastes Instagram photo URLs into the SAME tool.          │
  │ All 5 photos download at original resolution.            │
  │                                                          │
  │ 😍 "Full-res, no compression, no upscaling needed"       │
  │                                                          │
  │ 11:15 AM                                                 │
  │ All 6 files ready. All maximum quality.                  │
  │ 25 minutes saved. Already importing into Premiere.       │
  │                                                          │
  │ 😎 "This just became my daily tool"                      │
  └──────────────────────────────────────────────────────────┘

  TIME SPENT: 15 minutes
  QUALITY: Maximum available, correct formats
  EMOTIONAL STATE: Impressed, efficient, loyal user
  TIME SAVED: 25 minutes (63% reduction)
```

---

## 4. Pain Point Deep Dive

### 4.1 Core Pain Points (Universal)

```
  UNIVERSAL PAIN POINTS
  ═══════════════════════════════════════════════════════════════

  ┌──────────────────────────────────────────────────────────┐
  │                                                          │
  │  PAIN 1: FRAGMENTATION                    Severity: 🔴🔴🔴│
  │  ──────────────────────                                  │
  │  Every platform needs a different tool.                  │
  │  Users can't remember which site works for which         │
  │  platform. What worked last week might be down today.    │
  │                                                          │
  │  HOW FETCH SOLVES IT:                                    │
  │  One URL input. Auto-detects platform. Done.             │
  │  Users bookmark ONE site and never think about it again. │
  │                                                          │
  ├──────────────────────────────────────────────────────────┤
  │                                                          │
  │  PAIN 2: QUALITY DEGRADATION              Severity: 🔴🔴🔴│
  │  ──────────────────────────                              │
  │  Most tools silently compress or downgrade media.        │
  │  Users download "1080p" but get re-encoded garbage.      │
  │  Image downloaders often serve the thumbnail, not the    │
  │  full-resolution original.                               │
  │                                                          │
  │  HOW FETCH SOLVES IT:                                    │
  │  yt-dlp extracts the actual best quality stream.         │
  │  Custom scrapers target original-resolution image URLs.  │
  │  Preview card shows quality info BEFORE download.        │
  │                                                          │
  ├──────────────────────────────────────────────────────────┤
  │                                                          │
  │  PAIN 3: HOSTILE USER EXPERIENCE          Severity: 🔴🔴🔴│
  │  ──────────────────────────────                          │
  │  Popup ads. Fake download buttons. Redirects to          │
  │  unrelated sites. Countdown timers. Required browser     │
  │  extensions. Account signup walls. CAPTCHA loops.        │
  │                                                          │
  │  HOW FETCH SOLVES IT:                                    │
  │  Zero ads. Zero popups. Zero account requirements.       │
  │  Clean, premium interface. The download button           │
  │  actually downloads.                                     │
  │                                                          │
  ├──────────────────────────────────────────────────────────┤
  │                                                          │
  │  PAIN 4: RELIABILITY / TRUST              Severity: 🔴🔴  │
  │  ─────────────────────────────                           │
  │  Free downloaders break frequently. Sites disappear.    │
  │  Users feel unsafe — "will this give me a virus?"        │
  │  No way to know if a tool is safe before using it.       │
  │                                                          │
  │  HOW FETCH SOLVES IT:                                    │
  │  yt-dlp is battle-tested and community-maintained.       │
  │  Clean design signals trustworthiness.                   │
  │  About page and FAQ build confidence.                    │
  │  No downloads of executable files — just media.          │
  │                                                          │
  ├──────────────────────────────────────────────────────────┤
  │                                                          │
  │  PAIN 5: NO PREVIEW / BLIND DOWNLOADS    Severity: 🔴🔴  │
  │  ─────────────────────────────────────                   │
  │  Users click "download" and hope for the best.           │
  │  No way to verify content or quality before downloading. │
  │  Wrong video? Wrong format? Find out after the fact.     │
  │                                                          │
  │  HOW FETCH SOLVES IT:                                    │
  │  Preview card shows thumbnail, title, platform, quality, │
  │  format, and file size BEFORE the user commits to        │
  │  downloading. Full transparency.                         │
  │                                                          │
  └──────────────────────────────────────────────────────────┘
```

### 4.2 Persona-Specific Pain Points

```
  PERSONA-SPECIFIC PAINS
  ═══════════════════════════════════════════════════════════════

  MAYA (Creative):
  ├── Needs VOLUME — downloads many assets per session
  ├── Quality is non-negotiable for professional work
  ├── Time wasted on downloads = time stolen from design
  └── FETCH OPPORTUNITY: Speed + quality = direct value to work

  JAMES (Curator):
  ├── Needs SPEED — tight deadlines from management
  ├── Doesn't want technical complexity or account signups
  ├── Consistency across platforms matters for reporting
  └── FETCH OPPORTUNITY: One tool = predictable, fast workflow

  AIRA (Casual):
  ├── Needs SAFETY — scared of sketchy sites and popups
  ├── Needs SIMPLICITY — doesn't want to learn a tool
  ├── Quality matters socially — blurry reposts = embarrassing
  └── FETCH OPPORTUNITY: Clean + simple = instant trust

  CARLOS (Editor):
  ├── Needs MAXIMUM QUALITY — professional editing requires it
  ├── Needs CORRECT FORMATS — MP4 for video editors, not WEBM
  ├── Knows about yt-dlp but wants a faster workflow than CLI
  └── FETCH OPPORTUNITY: yt-dlp power with a beautiful GUI
```

---

## 5. Moments That Matter

These are the critical moments in the user journey that determine whether someone becomes a repeat user or bounces:

```
  MOMENTS THAT MATTER
  ═══════════════════════════════════════════════════════════════

  MOMENT 1: FIRST IMPRESSION (0-3 seconds)
  ──────────────────────────────────────────
  User lands on Fetch for the first time.
  
  ✅ WIN: "This looks clean and professional. I trust this."
  ❌ FAIL: "This looks like every other sketchy downloader."
  
  → Design quality is CRITICAL. Premium look = trust.
  → No ads, no clutter, no dark patterns.

  ─────────────────────────────────────────────────────────

  MOMENT 2: FIRST SUCCESSFUL DOWNLOAD (30-90 seconds)
  ────────────────────────────────────────────────────
  User pastes their first URL and it actually works.
  
  ✅ WIN: "Wait, that's it? It just... worked?"
  ❌ FAIL: "Error. Extraction failed. Try again."
  
  → Reliability of extractors is CRITICAL.
  → The first download MUST succeed to build trust.

  ─────────────────────────────────────────────────────────

  MOMENT 3: QUALITY REVEAL (on opening downloaded file)
  ──────────────────────────────────────────────────────
  User opens the downloaded file and checks quality.
  
  ✅ WIN: "This is full resolution! Better than other tools!"
  ❌ FAIL: "This is the same 480p garbage I get everywhere."
  
  → Quality must be noticeably better than alternatives.
  → This is what makes users come back AND refer others.

  ─────────────────────────────────────────────────────────

  MOMENT 4: SECOND PLATFORM (return visit)
  ─────────────────────────────────────────
  User comes back to download from a different platform.
  
  ✅ WIN: "It works for Instagram too?! I only need this one site!"
  ❌ FAIL: "Oh, this only does YouTube. Back to Google..."
  
  → Multi-platform support is the core value proposition.
  → This is the "aha moment" that creates loyalty.

  ─────────────────────────────────────────────────────────

  MOMENT 5: THE REFERRAL (organic growth)
  ────────────────────────────────────────
  User tells a friend about Fetch.
  
  ✅ WIN: "Just use Fetch — one site for everything."
  
  → Word of mouth is the primary growth channel.
  → The simpler the pitch, the more referrals.
  → "One site for everything" is dead simple to explain.
```

---

## 6. Competitive Advantage

```
  WHY FETCH WINS
  ═══════════════════════════════════════════════════════════════

                   Sketchy         Browser
                   Downloaders     Extensions      FETCH
  ─────────────    ───────────     ──────────      ─────
  Trust            ❌ Low          ⚠️ Medium       ✅ High
  Quality          ⚠️ Variable    ⚠️ Variable     ✅ Best available
  Platforms        1 each          1-3 each        ✅ All major
  Ads              ❌ Tons         ✅ None          ✅ None
  Speed            ⚠️ Slow        ✅ Fast          ✅ Fast
  Preview          ❌ None         ⚠️ Some         ✅ Always
  No install       ✅ Web-based   ❌ Requires ext  ✅ Web-based
  No signup        ⚠️ Sometimes   ✅ None          ✅ None
  Mobile-friendly  ⚠️ Barely     ❌ Desktop only  ✅ Responsive
  Free             ✅ Yes (ads)   ⚠️ Freemium     ✅ Yes (no ads)
```

---

## 7. User Journey Summary

```
  THE FETCH PROMISE
  ═══════════════════════════════════════════════════════════════

  BEFORE FETCH              AFTER FETCH
  ────────────              ───────────

  5 different sites    →    1 site
  15-40 min wasted     →    3-15 min total
  Mixed quality        →    Best quality always
  Popup anxiety        →    Zero ads, zero popups
  "Is this safe?"      →    "I trust this"
  "Which site again?"  →    "Just use Fetch"
  Solo knowledge       →    "You gotta try this tool"
```
