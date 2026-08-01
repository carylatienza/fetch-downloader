import { NextResponse } from 'next/server';
import { getMetadataLocal } from '@/lib/ytdlp';
import { getClientIp, checkExtractionRateLimit } from '@/lib/rateLimiter';

/**
 * Internal endpoint used by the Next.js app's own remote-microservice mode
 * (DOWNLOADER_SERVICE_URL) to fetch raw yt-dlp --dump-json metadata. Unlike
 * /api/extract, this returns yt-dlp's unshaped JSON so extractors can read
 * fields like formats[], height, filesize, format_note directly.
 */
export async function POST(req) {
  const ip = getClientIp(req);
  const rateCheck = checkExtractionRateLimit(ip);
  if (!rateCheck.allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const body = await req.json();
    const url = body?.url;

    if (!url) {
      return NextResponse.json({ error: 'Missing url' }, { status: 400 });
    }

    const info = await getMetadataLocal(url);
    return NextResponse.json(info);
  } catch (error) {
    console.error('ytdlp-metadata route error:', error);
    return NextResponse.json({ error: 'Metadata extraction failed' }, { status: 500 });
  }
}
