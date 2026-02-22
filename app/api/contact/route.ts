import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body || {};
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Development stub: record submission to server logs
    // In production, replace with SMTP, webhook, or provider integration.
    console.log('[/api/contact] submission:', { name, email, message });

    return NextResponse.json({ status: 'ok' }, { status: 200 });
  } catch (err) {
    console.error('[/api/contact] error', err);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
