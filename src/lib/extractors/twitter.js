import { BaseExtractor } from './base.js';
import { getMetadataWithYtDlp } from '../ytdlp.js';
import * as cheerio from 'cheerio';

export class TwitterExtractor extends BaseExtractor {
  constructor() {
    super('twitter');
  }

  canHandle(url) {
    if (!url) return false;
    const lower = url.toLowerCase();
    return lower.includes('twitter.com/') || lower.includes('x.com/');
  }

  async extract(url) {
    // 1. Try yt-dlp first (handles tweet videos & gifs)
    try {
      const info = await getMetadataWithYtDlp(url);

      let maxHeight = info.height || 0;
      if (Array.isArray(info.formats)) {
        for (const fmt of info.formats) {
          if (typeof fmt.height === 'number' && fmt.height > maxHeight) {
            maxHeight = fmt.height;
          }
        }
      }

      return {
        platform: 'twitter',
        mediaType: 'video',
        title: info.title || info.description || 'X/Twitter Post',
        thumbnail: info.thumbnail || '',
        duration: info.duration || null,
        quality: maxHeight > 0 ? `${maxHeight}p` : 'HD',
        fileSize: info.filesize || info.filesize_approx || null,
        format: 'mp4',
        sourceUrl: url,
        images: [],
      };
    } catch {
      // 2. Try HTML meta tag parse for tweet images
      try {
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          },
        });
        const html = await response.text();
        const $ = cheerio.load(html);

        let ogImage = $('meta[property="og:image"]').attr('content') || $('meta[name="twitter:image"]').attr('content');
        const ogTitle = $('meta[property="og:title"]').attr('content') || 'X/Twitter Post';

        if (ogImage) {
          // Force original quality for Twitter images if pbs.twimg.com
          if (ogImage.includes('pbs.twimg.com')) {
            const urlObj = new URL(ogImage);
            urlObj.searchParams.set('name', 'orig');
            ogImage = urlObj.toString();
          }

          return {
            platform: 'twitter',
            mediaType: 'image',
            title: ogTitle,
            thumbnail: ogImage,
            duration: null,
            quality: 'Original',
            fileSize: null,
            format: 'jpg',
            sourceUrl: ogImage,
            images: [{ id: 1, url: ogImage, filename: 'photo_1.jpg' }],
          };
        }
      } catch (err) {
        console.error('X/Twitter image parse failed:', err);
      }

      throw new Error('Could not extract media from X/Twitter URL');
    }
  }
}
