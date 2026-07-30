import { NextResponse } from 'next/server';
import { getClientIp, checkContactRateLimit } from '@/lib/rateLimiter';

export async function POST(req) {
  try {
    const ip = getClientIp(req);
    const rateCheck = checkContactRateLimit(ip);

    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'RATE_LIMITED',
            message: `Too many submissions. Please wait ${rateCheck.retryAfter} seconds before sending another message.`,
            retryAfter: rateCheck.retryAfter,
          },
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, subject, message } = body || {};

    // Validate fields
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_INPUT', message: 'Name is required.' } },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_INPUT', message: 'A valid email address is required.' } },
        { status: 400 }
      );
    }

    if (!subject || typeof subject !== 'string' || !subject.trim()) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_INPUT', message: 'Subject is required.' } },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_INPUT', message: 'Message content is required.' } },
        { status: 400 }
      );
    }

    const payload = {
      timestamp: new Date().toISOString(),
      name: name.trim().substring(0, 100),
      email: email.trim().toLowerCase().substring(0, 150),
      subject: subject.trim().substring(0, 150),
      message: message.trim().substring(0, 3000),
      ip,
    };

    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL || process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

    if (googleScriptUrl) {
      try {
        const scriptRes = await fetch(googleScriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          redirect: 'follow',
        });

        if (!scriptRes.ok) {
          console.warn('Google Apps Script endpoint returned non-OK status:', scriptRes.status);
        }
      } catch (scriptErr) {
        console.error('Failed to post to Google Apps Script Web App:', scriptErr);
      }
    } else {
      console.log('Google Apps Script URL not configured. Contact submission logged:', payload);
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully! We will get back to you soon.',
    });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'SERVER_ERROR',
          message: 'Failed to submit contact message. Please try again later.',
        },
      },
      { status: 500 }
    );
  }
}
