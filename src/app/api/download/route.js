import { NextResponse } from 'next/server';
import { Readable } from 'stream';
import JSZip from 'jszip';
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
  const singleImageUrl = searchParams.get('imageUrl');
  const isPreview = searchParams.get('preview') === 'true';
  const ip = getClientIp(req);

  // Standalone image preview proxy handler
  if (singleImageUrl && isPreview) {
    try {
      const mediaResponse = await fetch(singleImageUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
          'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        },
      });

      if (!mediaResponse.ok) {
        throw new Error(`Failed to fetch preview image: ${mediaResponse.statusText}`);
      }

      const contentType = mediaResponse.headers.get('content-type') || 'image/jpeg';
      const headers = new Headers({
        'Content-Type': contentType.includes('text') ? 'image/jpeg' : contentType,
        'Content-Disposition': 'inline',
        'Cache-Control': 'public, max-age=86400',
      });

      return new Response(mediaResponse.body, { headers });
    } catch (err) {
      console.error('Image preview proxy error:', err);
      return new Response(null, { status: 404 });
    }
  }

  let session = getDownloadSession(downloadId);

  // Fallback: if session was lost due to server restart or TTL, reconstruct from query params
  if (!session) {
    const sourceUrl = searchParams.get('url');
    const mediaUrl = searchParams.get('mediaUrl');
    const title = searchParams.get('title');
    const mediaType = searchParams.get('mediaType');
    const format = searchParams.get('format');

    if (sourceUrl || mediaUrl || singleImageUrl) {
      session = {
        sourceUrl: mediaUrl || singleImageUrl || sourceUrl,
        title: title || 'media_file',
        mediaType: mediaType || (mediaUrl ? 'image' : 'video'),
        format: format || 'jpg',
        images: [],
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
    // 1. Batch Gallery Zip Archive Download (.zip)
    if (session.format === 'zip' || (Array.isArray(session.images) && session.images.length > 1 && !singleImageUrl)) {
      const zip = new JSZip();
      const zipFilename = sanitizeFilename(session.title, 'zip');
      const crawlerUA = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';

      const downloadPromises = session.images.map(async (imgObj, idx) => {
        try {
          const imgRes = await fetch(imgObj.url, { headers: { 'User-Agent': crawlerUA } });
          if (imgRes.ok) {
            const arrayBuffer = await imgRes.arrayBuffer();
            const fileName = imgObj.filename || `photo_${idx + 1}.jpg`;
            zip.file(fileName, arrayBuffer);
          }
        } catch (err) {
          console.warn(`Failed to fetch photo [${idx + 1}] for zip archive:`, err);
        }
      });

      await Promise.all(downloadPromises);

      const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });
      trackDownloadEnd(ip);

      return new Response(zipBuffer, {
        headers: new Headers({
          'Content-Type': 'application/zip',
          'Content-Disposition': `attachment; filename="${zipFilename}"`,
          'Content-Length': zipBuffer.length.toString(),
          'Cache-Control': 'no-cache',
        }),
      });
    }

    // 2. Single Image Download or Video Streaming
    const targetUrl = singleImageUrl || searchParams.get('mediaUrl') || session.sourceUrl;
    const filename = sanitizeFilename(session.title, session.format === 'zip' ? 'jpg' : session.format);

    // Video extraction & streaming via yt-dlp (if binary is available)
    if (session.mediaType === 'video' && targetUrl.includes('http')) {
      try {
        const nodeStream = getStreamWithYtDlp(targetUrl);
        if (nodeStream) {
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
      } catch (err) {
        console.warn('yt-dlp stream failed, falling back to direct HTTP fetch stream:', err);
      }
    }

    // Direct HTTP fetch stream for images or direct file URLs
    const mediaResponse = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      },
    });

    const contentType = mediaResponse.headers.get('content-type') || '';
    if (session.mediaType === 'video' && (contentType.includes('text/html') || contentType.includes('image/'))) {
      trackDownloadEnd(ip);
      throw new Error('Video stream unavailable. Direct video extraction requires yt-dlp binary or direct stream URL.');
    }

    const finalContentType = contentType || 
      (session.mediaType === 'image' || session.mediaType === 'gallery' ? 'image/jpeg' : 'video/mp4');

    const headers = new Headers({
      'Content-Type': finalContentType.includes('text') ? 'image/jpeg' : finalContentType,
      'Content-Disposition': isPreview ? 'inline' : `attachment; filename="${filename}"`,
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
