import { BaseExtractor } from './base.js';
import { getMetadataWithYtDlp } from '../ytdlp.js';
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
      
      let maxHeight = info.height || 0;
      if (Array.isArray(info.formats)) {
        for (const fmt of info.formats) {
          if (typeof fmt.height === 'number' && fmt.height > maxHeight) {
            maxHeight = fmt.height;
          }
        }
      }

      let qualityStr = maxHeight > 0 ? `${maxHeight}p` : 'HD';

      return {
        platform: 'facebook',
        mediaType: 'video',
        title: info.title || info.description || 'Facebook Video',
        thumbnail: info.thumbnail || '',
        duration: info.duration || null,
        quality: qualityStr,
        fileSize: info.filesize || info.filesize_approx || null,
        format: 'mp4',
        sourceUrl: url,
      };
    } catch {
      // 2. Fallback to HTTP HTML parse for FB photos / public posts
      try {
        // Use Facebook's official social crawler User-Agent to bypass login wall SPA redirects
        const response = await fetch(url, {
          headers: {
            'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
            'Accept-Language': 'en-US,en;q=0.9',
          },
        });

        const html = await response.text();
        const $ = cheerio.load(html);

        let ogImage = $('meta[property="og:image"]').attr('content') || 
                       $('meta[name="twitter:image"]').attr('content') ||
                       $('meta[name="og:image"]').attr('content');
                       
        let ogTitle = $('meta[property="og:title"]').attr('content') || 
                      $('meta[name="twitter:title"]').attr('content') || 
                      'Facebook Photo';

        // Unescape HTML entities in image URL if present
        if (ogImage) {
          ogImage = ogImage.replace(/&amp;/g, '&');
        }

        // 3. Fallback: Parse FBID parameter if og:image wasn't in page head
        if (!ogImage) {
          const fbidMatch = url.match(/[?&]fbid=(\d+)/) || url.match(/\/(\d+)\/?(?:\?|$)/);
          if (fbidMatch && fbidMatch[1]) {
            const fbid = fbidMatch[1];
            ogImage = `https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=${fbid}`;
          }
        }

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
