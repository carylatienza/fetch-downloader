import * as cheerio from 'cheerio';

async function testAllImages() {
  const url = 'https://www.facebook.com/share/p/1JVb8k5ihu/';
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' }
  });
  const html = await res.text();
  const $ = cheerio.load(html);

  console.log('--- ALL META TAG IMAGES ---');
  $('meta[property*="image"]').each((i, el) => console.log('meta image:', $(el).attr('content')));

  const rawMatches = html.match(/https:\/\/[^"'\s\\]*fbcdn[^"'\s\\]*/gi) || [];
  const clean = Array.from(new Set(rawMatches.map(u => u.replace(/&amp;/g, '&').replace(/\\/g, ''))));

  console.log('\n--- ALL UNIQUE FBCDN URLS ---');
  clean.forEach((u, i) => console.log(`[${i}]`, u));
}

testAllImages();
