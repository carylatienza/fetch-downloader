/**
 * In-memory Sliding Window Rate Limiter
 * Per IP: 10 extraction requests per 60 seconds, max 3 concurrent downloads
 */

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 10;
const MAX_CONCURRENT_DOWNLOADS = 3;

// Map<ip, Array<timestamp>>
const extractRequests = new Map();

// Map<ip, number>
const activeDownloads = new Map();

/**
 * Get client IP from Next.js request
 * @param {Request} req 
 * @returns {string}
 */
export function getClientIp(req) {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.headers.get('x-real-ip') || '127.0.0.1';
}

/**
 * Check and record an extraction request
 * @param {string} ip 
 * @returns {{ allowed: boolean, retryAfter?: number }}
 */
export function checkExtractionRateLimit(ip) {
  const now = Date.now();
  const timestamps = extractRequests.get(ip) || [];

  // Filter out timestamps outside the window
  const validTimestamps = timestamps.filter((ts) => now - ts < WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS) {
    const oldest = validTimestamps[0];
    const retryAfter = Math.ceil((WINDOW_MS - (now - oldest)) / 1000);
    return { allowed: false, retryAfter };
  }

  validTimestamps.push(now);
  extractRequests.set(ip, validTimestamps);
  return { allowed: true };
}

/**
 * Increment active download count for IP
 * @param {string} ip 
 * @returns {boolean} true if allowed, false if max concurrent limit exceeded
 */
export function trackDownloadStart(ip) {
  const current = activeDownloads.get(ip) || 0;
  if (current >= MAX_CONCURRENT_DOWNLOADS) {
    return false;
  }
  activeDownloads.set(ip, current + 1);
  return true;
}

/**
 * Decrement active download count for IP
 * @param {string} ip 
 */
export function trackDownloadEnd(ip) {
  const current = activeDownloads.get(ip) || 0;
  if (current <= 1) {
    activeDownloads.delete(ip);
  } else {
    activeDownloads.set(ip, current - 1);
  }
}
