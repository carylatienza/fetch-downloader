import * as cheerio from 'cheerio';

async function extractFb(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
    },
  });
  const html = await res.text();
  const $ = cheerio.load(html);
  const ogImage = $('meta[property="og:image"]').attr('content') || $('meta[name="twitter:image"]').attr('content');
  const ogTitle = $('meta[property="og:title"]').attr('content');
  return { ogImage, ogTitle, url: res.url };
}

async function run() {
  console.log('Test 1:', await extractFb('https://www.facebook.com/1482575370573723'));
  console.log('Test 2:', await extractFb('https://www.facebook.com/8shit/posts/pfbid02s8evbmMA4TkxJmGtgRrCgUBUzhWozgNfcuvRmN32cxFpKuzvZogPcbmWNSNf7K5vl'));
}

run();
