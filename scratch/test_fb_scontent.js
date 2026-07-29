import * as cheerio from 'cheerio';

async function testFullFbImageExtractor(url) {
  console.log('Extracting:', url);

  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    },
  });

  const html = await res.text();
  const $ = cheerio.load(html);

  let ogTitle = $('meta[property="og:title"]').attr('content') || 'Facebook Photo';
  let ogImage = $('meta[property="og:image"]').attr('content') || $('meta[name="twitter:image"]').attr('content');

  // If og:image is a lookaside HTML redirect page, extract direct scontent CDN image URL from HTML
  if (!ogImage || ogImage.includes('lookaside.fbsbx.com')) {
    const scontentMatches = html.match(/https:\/\/[^"'\s\\]*scontent[^"'\s\\]*/gi) || [];
    const cleanUrls = Array.from(new Set(scontentMatches.map(u => u.replace(/&amp;/g, '&').replace(/\\/g, ''))));
    
    // Pick first valid image URL (e.g. dst-jpg)
    const directPhotoUrl = cleanUrls.find(u => u.includes('dst-jpg') || u.includes('.jpg') || u.includes('.png')) || cleanUrls[0];
    
    if (directPhotoUrl) {
      ogImage = directPhotoUrl;
    }
  }

  console.log('Final Extracted Image URL:', ogImage);
  console.log('Final Extracted Title:', ogTitle);
}

testFullFbImageExtractor('https://www.facebook.com/share/p/19K3ANjtHF/');
