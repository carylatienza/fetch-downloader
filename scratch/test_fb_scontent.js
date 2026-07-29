import * as cheerio from 'cheerio';

async function testProfileVsPost(url) {
  console.log('Testing URL:', url);

  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    },
  });

  const html = await res.text();
  const $ = cheerio.load(html);

  let ogImage = $('meta[property="og:image"]').attr('content');
  console.log('Raw og:image:', ogImage);

  const isAvatar = ogImage && (ogImage.includes('30497-1') || ogImage.includes('s40x40') || ogImage.includes('p40x40') || ogImage.includes('453178253'));
  console.log('Is Default Avatar Icon?', isAvatar);
}

async function run() {
  await testProfileVsPost('https://www.facebook.com/prince.ashrin.yxie.mendoza.2024');
  await testProfileVsPost('https://www.facebook.com/share/p/1JVb8k5ihu/');
}

run();
