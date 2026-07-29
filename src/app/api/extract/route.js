import { NextResponse } from 'next/server';
import { extractMedia } from '@/lib/extractors';
import { isValidUrl, sanitizeUrl } from '@/lib/validators';
import { getClientIp, checkExtractionRateLimit } from '@/lib/rateLimiter';
import { createDownloadSession } from '@/lib/sessionStore';

export async function POST(req) {
  try {
    const ip = getClientIp(req);
    const rateCheck = checkExtractionRateLimit(ip);

    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'RATE_LIMITED',
            message: 'Too many requests. Please wait before trying again.',
            retryAfter: rateCheck.retryAfter,
          },
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const rawUrl = body?.url;

    if (!rawUrl || !isValidUrl(rawUrl)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_URL',
            message: 'Please enter a valid URL.',
          },
        },
        { status: 400 }
      );
    }

    const targetUrl = sanitizeUrl(rawUrl);
    const mediaInfo = await extractMedia(targetUrl);

    // Create session and generate downloadId
    const downloadId = createDownloadSession(mediaInfo);

    return NextResponse.json({
      success: true,
      data: {
        ...mediaInfo,
        downloadId,
      },
    });
  } catch (error) {
    console.error('Extract route error:', error);

    if (error.code === 'UNSUPPORTED_PLATFORM') {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'UNSUPPORTED_PLATFORM',
            message: 'This platform is not supported yet.',
            supportedPlatforms: error.supportedPlatforms || ['youtube', 'facebook', 'instagram', 'twitter'],
          },
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'EXTRACTION_FAILED',
          message: error.message || 'Something went wrong. Please try again.',
        },
      },
      { status: 500 }
    );
  }
}
