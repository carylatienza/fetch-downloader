import { NextResponse } from 'next/server';
import { Readable } from 'stream';
import { getDownloadSession } from '@/lib/sessionStore';
import { getStreamWithYtDlp } from '@/lib/ytdlp';
import { getClientIp, trackDownloadStart, trackDownloadEnd } from '@/lib/rateLimiter';

/**
 * Sanitizes filename for Content-Disposition header
 */
function sanitizeFilename(title, ext) {
  const cleanTitle = (title || 'media_file')
    .replace(/[^a-zA-Z0-9 _-]/g, '')
    .trim()
    .substring(0, 100);
  return `${cleanTitle || 'media_file'}.${ext || 'mp4'}`;
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const downloadId = searchParams.get('id');
  const ip = getClientIp(req);

  let session = getDownloadSession(downloadId);

  // Fallback: if session was lost due to server restart or TTL, reconstruct from query params
  if (!session) {
    const sourceUrl = searchParams.get('url');
    const title = searchParams.get('title');
    const mediaType = searchParams.get('mediaType');
    const format = searchParams.get('format');

    if (sourceUrl) {
      session = {
        sourceUrl,
        title: title || 'media_file',
        mediaType: mediaType || 'video',
        format: format || 'mp4',
      };
    }
  }

  if (!session) {
    return NextResponse.json(
      { success: false, error: { code: 'NOT_FOUND', message: 'Download not found or expired.' } },
      { status: 404 }
    );
  }

  if (!trackDownloadStart(ip)) {
    return NextResponse.json(
      { success: false, error: { code: 'CONCURRENT_LIMIT', message: 'Too many concurrent downloads. Please wait for one to finish.' } },
      { status: 429 }
    );
  }

  try {
    const filename = sanitizeFilename(session.title, session.format);

    // Video extraction & streaming via yt-dlp
    if (session.mediaType === 'video' && session.sourceUrl.includes('http')) {
      const nodeStream = getStreamWithYtDlp(session.sourceUrl);
      const webStream = Readable.toWeb(nodeStream);

      const responseHeaders = new Headers({
        'Content-Type': 'video/mp4',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache',
      });

      nodeStream.on('end', () => trackDownloadEnd(ip));
      nodeStream.on('error', () => trackDownloadEnd(ip));

      return new Response(webStream, { headers: responseHeaders });
    }

    // Direct HTTP fetch stream for images or direct file URLs
    const mediaResponse = await fetch(session.sourceUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (!mediaResponse.ok) {
      trackDownloadEnd(ip);
      throw new Error(`Failed to fetch media from source: ${mediaResponse.statusText}`);
    }

    const contentType = mediaResponse.headers.get('content-type') || 
      (session.mediaType === 'image' ? 'image/jpeg' : 'video/mp4');

    const headers = new Headers({
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-cache',
    });

    if (mediaResponse.headers.get('content-length')) {
      headers.set('Content-Length', mediaResponse.headers.get('content-length'));
    }

    trackDownloadEnd(ip);
    return new Response(mediaResponse.body, { headers });
  } catch (error) {
    trackDownloadEnd(ip);
    console.error('Download handler error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'DOWNLOAD_FAILED', message: 'Failed to download media file.' } },
      { status: 500 }
    );
  }
}
