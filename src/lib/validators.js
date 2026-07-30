/**
 * URL Validation Utilities
 */

/**
 * Checks if a string is a valid HTTP/HTTPS URL
 * @param {string} urlString
 * @returns {boolean}
 */
export function isValidUrl(urlString) {
  if (!urlString || typeof urlString !== 'string') return false;
  try {
    const parsed = new URL(urlString.trim());
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return false;
    
    const host = parsed.hostname.toLowerCase();
    const supportedDomains = [
      'youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be',
      'instagram.com', 'www.instagram.com',
      'facebook.com', 'www.facebook.com', 'm.facebook.com', 'fb.watch', 'fb.com',
      'twitter.com', 'www.twitter.com', 'x.com', 'www.x.com'
    ];

    return supportedDomains.some(domain => host === domain || host.endsWith('.' + domain));
  } catch {
    return false;
  }
}

/**
 * Sanitizes input URL string
 * @param {string} urlString
 * @returns {string}
 */
export function sanitizeUrl(urlString) {
  if (!urlString) return '';
  return urlString.trim();
}
