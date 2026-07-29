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
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
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
