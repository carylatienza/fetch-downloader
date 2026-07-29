import * as cheerio from 'cheerio';

async function testFacebookGallery(url) {
  console.log('Testing Multi-Image Post Extraction:', url);

  const res = await fetch(url, {
    headers: {
      'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
    },
  });

  const html = await res.text();
  const $ = cheerio.load(html);

  console.log('--- JSON-LD SCRIPT TAGS ---');
  $('script[type="application/ld+json"]').each((i, el) => {
    console.log(`JSON-LD [${i}]:`, $(el).html());
  });

  console.log('--- ALL OG:IMAGE META TAGS ---');
  $('meta[property="og:image"]').each((i, el) => {
    console.log(`og:image [${i}]:`, $(el).attr('content'));
  });

  // Check for graph / image arrays in raw HTML
  const imageRegex = /"image":\s*\{\s*"uri":\s*"([^"]+)"/gi;
  const imageMatches = [...html.matchAll(imageRegex)].map(m => m[1].replace(/\\/g, ''));
  console.log('Found "image" uri matches in script JSON:', imageMatches.length);
  imageMatches.forEach((img, i) => console.log(`Script Image [${i + 1}]:`, img));
}

testFacebookGallery('https://www.facebook.com/share/p/1JVb8k5ihu/');
