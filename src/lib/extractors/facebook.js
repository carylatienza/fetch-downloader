import { BaseExtractor } from './base';
import { getMetadataWithYtDlp } from '../ytdlp';
import * as cheerio from 'cheerio';

export class FacebookExtractor extends BaseExtractor {
  constructor() {
    super('facebook');
  }

  canHandle(url) {
    if (!url) return false;
    const lower = url.toLowerCase();
    return (
      lower.includes('facebook.com') ||
      lower.includes('fb.watch') ||
      lower.includes('fb.com')
    );
  }

  async extract(url) {
    // 1. Try yt-dlp first (handles FB videos & reels great)
    try {
      const info = await getMetadataWithYtDlp(url);
      return {
        platform: 'facebook',
        mediaType: 'video',
        title: info.title || info.description || 'Facebook Video',
        thumbnail: info.thumbnail || '',
        duration: info.duration || null,
        quality: info.height ? `${info.height}p` : 'HD',
        fileSize: info.filesize || info.filesize_approx || null,
        format: 'mp4',
        sourceUrl: url,
      };
    } catch {
      // 2. Fallback to HTTP HTML parse for FB photos / public posts
      try {
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          },
        });

        const html = await response.text();
        const $ = cheerio.load(html);

        const ogImage = $('meta[property="og:image"]').attr('content') || $('meta[name="twitter:image"]').attr('content');
        const ogTitle = $('meta[property="og:title"]').attr('content') || 'Facebook Photo';

        if (ogImage) {
          return {
            platform: 'facebook',
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
        console.error('Facebook HTML parse fallback failed:', err);
      }

      throw new Error('Could not extract content from Facebook URL');
    }
  }
}
