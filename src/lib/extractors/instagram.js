import { BaseExtractor } from './base.js';
import { getMetadataWithYtDlp, estimateFileSize } from '../ytdlp.js';
import * as cheerio from 'cheerio';
import { getRenderedHtml } from '../puppeteer.js';

/**
 * Instagram embeds each carousel item's full-resolution photo as a
 * display_url field in inline JSON. Public/logged-out pages usually only
 * expose one, but grab every match in case more are present.
 */
function extractCarouselImages(html) {
  const matches = [...html.matchAll(/"display_url":"([^"]+)"/g)]
    .map((m) => m[1].replace(/\\u0026/g, '&').replace(/\\\//g, '/'));
  return Array.from(new Set(matches)).filter((u) => !u.includes('150x150'));
}

/**
 * Build an image/gallery result from a page's HTML: prefers the carousel
 * scrape (full-res, possibly multiple photos) over the single cropped
 * og:image meta tag.
 */
function buildImageResult(html, ogTitle) {
  const $ = cheerio.load(html);
  const ogImage = $('meta[property="og:image"]').attr('content');
  const carouselImages = extractCarouselImages(html);
  const photoUrls = carouselImages.length > 0 ? carouselImages : (ogImage ? [ogImage] : []);

  if (photoUrls.length === 0) return null;

  const images = photoUrls.map((imgUrl, idx) => ({
    id: idx + 1,
    url: imgUrl,
    filename: `photo_${idx + 1}.jpg`,
  }));

  return {
    platform: 'instagram',
    mediaType: images.length > 1 ? 'gallery' : 'image',
    title: ogTitle,
    thumbnail: images[0].url,
    images,
    duration: null,
    quality: 'Original',
    fileSize: null,
    format: images.length > 1 ? 'zip' : 'jpg',
    sourceUrl: images[0].url,
  };
}

export class InstagramExtractor extends BaseExtractor {
  constructor() {
    super('instagram');
  }

  canHandle(url) {
    if (!url) return false;
    const lower = url.toLowerCase();
    return lower.includes('instagram.com/p/') ||
           lower.includes('instagram.com/reel/') ||
           lower.includes('instagram.com/stories/');
  }

  async extract(url) {
    // 1. Try yt-dlp - reliable for actual video posts/reels
    try {
      const info = await getMetadataWithYtDlp(url);

      if (!info.vcodec || info.vcodec === 'none') {
        // Not a real video: yt-dlp only reports a cropped preview thumbnail
        // for image posts, so fall through to the HTML scrape for the real
        // full-resolution photo(s) instead.
        throw new Error('Instagram image post - use HTML scrape for full-res photo');
      }

      let maxHeight = info.height || 0;
      if (Array.isArray(info.formats)) {
        for (const fmt of info.formats) {
          if (typeof fmt.height === 'number' && fmt.height > maxHeight) {
            maxHeight = fmt.height;
          }
        }
      }

      return {
        platform: 'instagram',
        mediaType: 'video',
        title: info.title || info.description || 'Instagram Post',
        thumbnail: info.thumbnail || '',
        duration: info.duration || null,
        quality: maxHeight > 0 ? `${maxHeight}p` : 'HD',
        fileSize: estimateFileSize(info),
        format: 'mp4',
        sourceUrl: url,
        images: [],
      };
    } catch {
      // 2. Try static HTML parse (og:video for videos, carousel-aware image scrape)
      try {
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          },
        });
        const html = await response.text();
        const $ = cheerio.load(html);

        const ogVideo = $('meta[property="og:video"]').attr('content');
        const ogImage = $('meta[property="og:image"]').attr('content');
        const ogTitle = $('meta[property="og:title"]').attr('content') || 'Instagram Post';

        if (ogVideo) {
          return {
            platform: 'instagram',
            mediaType: 'video',
            title: ogTitle,
            thumbnail: ogImage || '',
            duration: null,
            quality: 'HD',
            fileSize: null,
            format: 'mp4',
            sourceUrl: ogVideo,
            images: [],
          };
        }

        const imageResult = buildImageResult(html, ogTitle);
        if (imageResult) return imageResult;
      } catch (err) {
        console.warn('Instagram static parse failed, trying Puppeteer:', err);
      }

      // 3. Fallback to Puppeteer if static parse failed
      try {
        const html = await getRenderedHtml(url);
        const $ = cheerio.load(html);

        const ogVideo = $('meta[property="og:video"]').attr('content');
        const ogImage = $('meta[property="og:image"]').attr('content');
        const ogTitle = $('meta[property="og:title"]').attr('content') || 'Instagram Post';

        if (ogVideo) {
          return {
            platform: 'instagram',
            mediaType: 'video',
            title: ogTitle,
            thumbnail: ogImage || '',
            duration: null,
            quality: 'Original',
            fileSize: null,
            format: 'mp4',
            sourceUrl: ogVideo,
            images: [],
          };
        }

        const imageResult = buildImageResult(html, ogTitle);
        if (imageResult) return imageResult;
      } catch (pErr) {
        console.error('Instagram Puppeteer fallback failed:', pErr);
      }

      throw new Error('Could not extract Instagram content. Content may be private.');
    }
  }
}
