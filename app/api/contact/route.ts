import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Lazy init – avoid crash at build time when env var is missing
let _resend: Resend | null = null;
function getResend() {
  if (!_resend && process.env.RESEND_API_KEY) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

const TO_EMAIL = process.env.CONTACT_EMAIL || 'contact@acf-standard.com';
const FROM_EMAIL = process.env.FROM_EMAIL || 'ACF Standard <noreply@acf-score.com>';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, type } = body || {};
    if (!name || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // If no API key configured, fallback to console log
    if (!process.env.RESEND_API_KEY) {
      console.log('[/api/contact] No RESEND_API_KEY — logging only:', { name, email, message });
      return NextResponse.json({ status: 'ok' }, { status: 200 });
    }

    const isChecker = type === 'checker' || message.startsWith('[EU AI Act Checker');
    const subject = isChecker
      ? `[EU AI Act Checker] Résultats — ${name}`
      : `[ACF Contact] Message de ${name}`;

    // 1) Send notification to ACF team
    await getResend()!.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      subject,
      html: buildNotificationHtml(name, email, message, isChecker),
    });

    // 2) If user provided email AND it's a checker result, send them a copy
    if (email && email !== 'no-email@diagnostic.acf-standard.com' && isChecker) {
      await getResend()!.emails.send({
        from: FROM_EMAIL,
        to: [email],
        subject: `Vos résultats EU AI Act Checker — ${name}`,
        html: buildUserResultsHtml(name, message),
      });
    }

    return NextResponse.json({ status: 'ok' }, { status: 200 });
  } catch (err: any) {
    console.error('[/api/contact] error', err?.message || err);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}

/* ── Email templates ── */

function buildNotificationHtml(name: string, email: string, message: string, isChecker: boolean) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#050c1a;font-family:Arial,sans-serif">
  <div style="max-width:600px;margin:0 auto;padding:32px 24px">
    <div style="background:#071122;border:1px solid rgba(201,168,76,.2);border-radius:12px;padding:32px">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px">
        <div style="width:40px;height:40px;background:linear-gradient(135deg,#c9a84c,#e8c96a);border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:12px;color:#050c1a">ACF</div>
        <div>
          <div style="font-size:16px;font-weight:700;color:#fff">Agentic Commerce Framework®</div>
          <div style="font-size:11px;color:#c9a84c;letter-spacing:.1em;text-transform:uppercase">${isChecker ? 'EU AI ACT CHECKER' : 'CONTACT FORM'}</div>
        </div>
      </div>
      <div style="border-top:1px solid rgba(255,255,255,.07);padding-top:20px">
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#6b7fa0;font-size:13px;width:120px">Nom / Système</td><td style="padding:8px 0;color:#fff;font-size:14px;font-weight:600">${escHtml(name)}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7fa0;font-size:13px">Email</td><td style="padding:8px 0;color:#9db0c8;font-size:14px">${escHtml(email || '—')}</td></tr>
        </table>
      </div>
      <div style="margin-top:20px;padding:16px;background:rgba(255,255,255,.03);border-radius:8px;border:1px solid rgba(255,255,255,.05)">
        <div style="font-size:11px;color:#c9a84c;letter-spacing:.1em;text-transform:uppercase;margin-bottom:8px">${isChecker ? 'RÉSULTATS' : 'MESSAGE'}</div>
        <div style="font-size:14px;color:#9db0c8;line-height:1.7;white-space:pre-wrap">${escHtml(message)}</div>
      </div>
    </div>
    <div style="text-align:center;padding:16px 0;font-size:11px;color:#6b7fa0">
      © 2026 Agentic Commerce Framework® — www.acf-standard.com
    </div>
  </div>
</body>
</html>`;
}

function buildUserResultsHtml(name: string, message: string) {
  const lines = message.replace('[EU AI Act Checker Results]\n', '').split('\n');
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#050c1a;font-family:Arial,sans-serif">
  <div style="max-width:600px;margin:0 auto;padding:32px 24px">
    <div style="background:#071122;border:1px solid rgba(201,168,76,.2);border-radius:12px;padding:32px">
      <div style="text-align:center;margin-bottom:24px">
        <div style="width:56px;height:56px;background:linear-gradient(135deg,#c9a84c,#e8c96a);border-radius:12px;display:inline-flex;align-items:center;justify-content:center;font-weight:900;font-size:16px;color:#050c1a">ACF</div>
        <h1 style="font-size:20px;font-weight:800;color:#fff;margin:16px 0 4px">EU AI Act Checker</h1>
        <p style="font-size:13px;color:#c9a84c;margin:0">Vos résultats de conformité</p>
      </div>
      <div style="border-top:1px solid rgba(255,255,255,.07);padding-top:20px">
        <div style="font-size:15px;font-weight:700;color:#fff;margin-bottom:12px">Système : ${escHtml(name)}</div>
        <div style="padding:16px;background:rgba(255,255,255,.03);border-radius:8px;border:1px solid rgba(255,255,255,.05)">
          ${lines.map((l: string) => `<div style="font-size:13px;color:#9db0c8;line-height:1.8;padding:2px 0">${escHtml(l)}</div>`).join('')}
        </div>
      </div>
      <div style="margin-top:24px;text-align:center">
        <a href="https://www.acf-standard.com/fr/compliance-checker" style="display:inline-block;padding:12px 28px;background:linear-gradient(135deg,#c9a84c,#e8c96a);color:#050c1a;font-weight:700;font-size:14px;text-decoration:none;border-radius:8px">Refaire le diagnostic</a>
      </div>
      <div style="margin-top:20px;padding:12px;background:rgba(201,168,76,.06);border-radius:8px;border:1px solid rgba(201,168,76,.15)">
        <p style="font-size:12px;color:#6b7fa0;margin:0;line-height:1.6">Cet outil fournit une indication préliminaire. Il ne constitue pas un avis juridique. Pour un accompagnement complet, découvrez le <a href="https://www.acf-standard.com" style="color:#c9a84c">framework ACF®</a>.</p>
      </div>
    </div>
    <div style="text-align:center;padding:16px 0;font-size:11px;color:#6b7fa0">
      © 2026 Agentic Commerce Framework® — www.acf-standard.com
    </div>
  </div>
</body>
</html>`;
}

function escHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
