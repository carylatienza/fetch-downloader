import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';

async function testPuppeteerFacebook(url) {
  let browser = null;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    const html = await page.content();
    const $ = cheerio.load(html);

    const ogImage = $('meta[property="og:image"]').attr('content');
    const ogTitle = $('meta[property="og:title"]').attr('content');
    const imageTagSrc = $('img[src*="scontent"]').attr('src') || $('img[src*="fbsbx"]').attr('src');

    console.log('Puppeteer og:image:', ogImage);
    console.log('Puppeteer og:title:', ogTitle);
    console.log('Puppeteer scontent img src:', imageTagSrc);
  } catch (err) {
    console.error('Puppeteer FB test error:', err);
  } finally {
    if (browser) await browser.close();
  }
}

testPuppeteerFacebook('https://www.facebook.com/photo/?fbid=1482575370573723');
