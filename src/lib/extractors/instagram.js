import { BaseExtractor } from './base';
import { getMetadataWithYtDlp } from '../ytdlp';
import * as cheerio from 'cheerio';
import { getRenderedHtml } from '../puppeteer';

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
    // 1. Try yt-dlp (works for reels & public video posts)
    try {
      const info = await getMetadataWithYtDlp(url);
      return {
        platform: 'instagram',
        mediaType: info.vcodec && info.vcodec !== 'none' ? 'video' : 'image',
        title: info.title || info.description || 'Instagram Post',
        thumbnail: info.thumbnail || '',
        duration: info.duration || null,
        quality: info.height ? `${info.height}p` : 'HD',
        fileSize: info.filesize || info.filesize_approx || null,
        format: info.vcodec && info.vcodec !== 'none' ? 'mp4' : 'jpg',
        sourceUrl: url,
      };
    } catch {
      // 2. Try Cheerio static meta tag parse
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
          };
        }

        if (ogImage) {
          return {
            platform: 'instagram',
            mediaType: 'image',
            title: ogTitle,
            thumbnail: ogImage,
            duration: null,
            quality: 'Original',
            fileSize: null,
            format: 'jpg',
            sourceUrl: ogImage,
          };
        }
      } catch (err) {
        console.warn('Instagram static parse failed, trying Puppeteer:', err);
      }

      // 3. Fallback to Puppeteer if static parse failed
      try {
        const html = await getRenderedHtml(url);
        const $ = cheerio.load(html);

        const ogVideo = $('meta[property="og:video"]').attr('content');
        const ogImage = $('meta[property="og:image"]').attr('content');

        if (ogVideo || ogImage) {
          return {
            platform: 'instagram',
            mediaType: ogVideo ? 'video' : 'image',
            title: 'Instagram Post',
            thumbnail: ogImage || '',
            duration: null,
            quality: 'Original',
            fileSize: null,
            format: ogVideo ? 'mp4' : 'jpg',
            sourceUrl: ogVideo || ogImage,
          };
        }
      } catch (pErr) {
        console.error('Instagram Puppeteer fallback failed:', pErr);
      }

      throw new Error('Could not extract Instagram content. Content may be private.');
    }
  }
}
