import puppeteer from 'puppeteer';

/**
 * Fetch rendered HTML of a page using Puppeteer
 * @param {string} url 
 * @returns {Promise<string>}
 */
export async function getRenderedHtml(url) {
  let browser = null;
  try {
    const launchOptions = {
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
      ],
    };

    if (process.env.PUPPETEER_EXECUTABLE_PATH) {
      launchOptions.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
    }

    browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();
    
    // Set a realistic User-Agent
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    const content = await page.content();
    return content;
  } catch (error) {
    console.error('Puppeteer rendering failed:', error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
