import { BaseExtractor } from './base';
import { getMetadataWithYtDlp } from '../ytdlp';

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
      
      const height = info.height || info.format_note || 'Best';
      const qualityStr = typeof height === 'number' ? `${height}p` : height;

      return {
        platform: 'youtube',
        mediaType: 'video',
        title: info.title || 'YouTube Video',
        thumbnail: info.thumbnail || `https://img.youtube.com/vi/${info.id}/maxresdefault.jpg`,
        duration: info.duration || null,
        quality: qualityStr,
        fileSize: info.filesize || info.filesize_approx || null,
        format: 'mp4',
        sourceUrl: url,
      };
    } catch (error) {
      console.error('YouTube extraction error:', error);
      throw new Error('Failed to extract YouTube video');
    }
  }
}
