import { BaseExtractor } from './base.js';
import { getMetadataWithYtDlp, estimateFileSize } from '../ytdlp.js';

function extractYouTubeVideoId(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export class YouTubeExtractor extends BaseExtractor {
  constructor() {
    super('youtube');
  }

  canHandle(url) {
    if (!url) return false;
    const lower = url.toLowerCase();
    return (
      lower.includes('youtube.com/watch') ||
      lower.includes('youtu.be/') ||
      lower.includes('youtube.com/shorts/')
    );
  }

  async extract(url) {
    try {
      const info = await getMetadataWithYtDlp(url);
      
      // Calculate true maximum video resolution height across all formats (DASH + progressive)
      let maxHeight = info.height || 0;
      if (Array.isArray(info.formats)) {
        for (const fmt of info.formats) {
          if (typeof fmt.height === 'number' && fmt.height > maxHeight) {
            maxHeight = fmt.height;
          }
        }
      }

      let qualityStr = maxHeight > 0 ? `${maxHeight}p` : (info.format_note || 'Best');
      if (maxHeight >= 2160) {
        qualityStr = `${maxHeight}p (4K)`;
      } else if (maxHeight >= 1440) {
        qualityStr = `${maxHeight}p (2K)`;
      } else if (maxHeight >= 1080) {
        qualityStr = `${maxHeight}p (Full HD)`;
      }

      return {
        platform: 'youtube',
        mediaType: 'video',
        title: info.title || 'YouTube Video',
        thumbnail: info.thumbnail || `https://img.youtube.com/vi/${info.id}/hqdefault.jpg`,
        duration: info.duration || null,
        quality: qualityStr,
        fileSize: estimateFileSize(info),
        format: 'mp4',
        sourceUrl: url,
      };
    } catch (error) {
      console.warn('yt-dlp metadata extraction failed, trying video ID fallback:', error);
      const videoId = extractYouTubeVideoId(url);
      if (videoId) {
        return {
          platform: 'youtube',
          mediaType: 'video',
          title: 'YouTube Video',
          thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
          duration: null,
          quality: '1080p (Full HD)',
          fileSize: null,
          format: 'mp4',
          sourceUrl: url,
        };
      }
      throw new Error('Failed to extract YouTube video');
    }
  }
}
