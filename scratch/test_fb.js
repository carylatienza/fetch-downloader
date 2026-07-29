import * as cheerio from 'cheerio';

async function testFbShare() {
  const url = 'https://www.facebook.com/share/p/19K3ANjtHF/';
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
    },
  });

  const html = await res.text();
  const $ = cheerio.load(html);

  let ogImage = $('meta[property="og:image"]').attr('content') || $('meta[name="twitter:image"]').attr('content');
  if (ogImage) ogImage = ogImage.replace(/&amp;/g, '&');
  const ogTitle = $('meta[property="og:title"]').attr('content');

  console.log('FB Share Image URL:', ogImage);
  console.log('FB Share Title:', ogTitle);
}

testFbShare();
