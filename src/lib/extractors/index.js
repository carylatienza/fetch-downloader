import { YouTubeExtractor } from './youtube';
import { FacebookExtractor } from './facebook';
import { InstagramExtractor } from './instagram';
import { TwitterExtractor } from './twitter';

const extractors = [
  new YouTubeExtractor(),
  new FacebookExtractor(),
  new InstagramExtractor(),
  new TwitterExtractor(),
];

/**
 * Finds the appropriate extractor for the given URL
 * @param {string} url 
 * @returns {import('./base').BaseExtractor | null}
 */
export function getExtractorForUrl(url) {
  if (!url) return null;
  return extractors.find((extractor) => extractor.canHandle(url)) || null;
}

/**
 * Routes URL to the matching extractor and retrieves media metadata
 * @param {string} url 
 */
export async function extractMedia(url) {
  const extractor = getExtractorForUrl(url);
  
  if (!extractor) {
    const error = new Error('Unsupported platform');
    error.code = 'UNSUPPORTED_PLATFORM';
    error.supportedPlatforms = ['youtube', 'facebook', 'instagram', 'twitter'];
    throw error;
  }

  return await extractor.extract(url);
}
