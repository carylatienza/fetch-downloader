/**
 * Base Extractor Class
 * Pluggable interface that all platform extractors must inherit from.
 */

export class BaseExtractor {
  constructor(name) {
    this.name = name;
  }

  /**
   * Determine if this extractor can handle the provided URL
   * @param {string} url 
   * @returns {boolean}
   */
  canHandle(url) {
    throw new Error('canHandle() must be implemented by subclass');
  }

  /**
   * Extract media metadata from the URL
   * @param {string} url 
   * @returns {Promise<{
   *   platform: string,
   *   mediaType: 'video' | 'image',
   *   title: string,
   *   thumbnail: string,
   *   duration?: number | null,
   *   quality?: string,
   *   fileSize?: number | null,
   *   format: string,
   *   sourceUrl: string
   * }>}
   */
  async extract(url) {
    throw new Error('extract() must be implemented by subclass');
  }
}
