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
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background-color:#050c1a;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#050c1a;">
<tr><td align="center" style="padding:32px 16px;">
  <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color:#071122;border:1px solid #3d3220;">
    <!-- Header -->
    <tr><td style="padding:28px 32px 20px 32px;border-bottom:1px solid #1a2740;">
      <table cellpadding="0" cellspacing="0" border="0"><tr>
        <td width="44" height="44" align="center" valign="middle" style="background-color:#c9a84c;font-weight:900;font-size:13px;color:#050c1a;letter-spacing:1px;">ACF</td>
        <td style="padding-left:14px;">
          <div style="font-size:16px;font-weight:700;color:#ffffff;">Agentic Commerce Framework&reg;</div>
          <div style="font-size:11px;color:#c9a84c;letter-spacing:1px;text-transform:uppercase;margin-top:2px;">${isChecker ? 'EU AI ACT CHECKER' : 'CONTACT FORM'}</div>
        </td>
      </tr></table>
    </td></tr>
    <!-- Info -->
    <tr><td style="padding:24px 32px;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding:8px 0;color:#6b7fa0;font-size:13px;width:130px;vertical-align:top;">Nom / Syst&egrave;me</td>
          <td style="padding:8px 0;color:#ffffff;font-size:14px;font-weight:600;">${escHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#6b7fa0;font-size:13px;vertical-align:top;">Email</td>
          <td style="padding:8px 0;color:#9db0c8;font-size:14px;">${escHtml(email || '—')}</td>
        </tr>
      </table>
    </td></tr>
    <!-- Message / Results -->
    <tr><td style="padding:0 32px 28px 32px;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0a1a30;border:1px solid #1a2740;">
        <tr><td style="padding:16px 20px;">
          <div style="font-size:11px;color:#c9a84c;letter-spacing:1px;text-transform:uppercase;margin-bottom:10px;font-weight:700;">${isChecker ? 'R&Eacute;SULTATS' : 'MESSAGE'}</div>
          <div style="font-size:14px;color:#9db0c8;line-height:24px;white-space:pre-wrap;">${escHtml(message)}</div>
        </td></tr>
      </table>
    </td></tr>
    <!-- Footer -->
    <tr><td style="padding:16px 32px;border-top:1px solid #1a2740;text-align:center;">
      <span style="font-size:11px;color:#6b7fa0;">&copy; 2026 Agentic Commerce Framework&reg; &mdash; www.acf-standard.com</span>
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;
}

function buildUserResultsHtml(name: string, message: string) {
  // Parse structured data from message
  const lines = message.split('\n');
  let aiSystem = '', entity = '', highRisk = '', gpai = '';
  const obligations: string[] = [];
  let inObligations = false;

  for (const line of lines) {
    if (line.startsWith('AI System:')) aiSystem = line.replace('AI System:', '').trim();
    else if (line.startsWith('Entity:')) entity = line.replace('Entity:', '').trim();
    else if (line.startsWith('High Risk:')) highRisk = line.replace('High Risk:', '').trim();
    else if (line.startsWith('GPAI:')) gpai = line.replace('GPAI:', '').trim();
    else if (line.startsWith('Obligations')) { inObligations = true; }
    else if (inObligations && line.trim()) { obligations.push(line.trim()); }
  }

  // Translate entity type
  const entityLabels: Record<string, string> = {
    provider: 'Fournisseur', deployer: 'D\u00e9ployeur', distributor: 'Distributeur',
    importer: 'Importateur', product_manufacturer: 'Fabricant de produit', authorized_rep: 'Repr\u00e9sentant autoris\u00e9'
  };
  const entityLabel = entityLabels[entity] || entity;
  const riskColor = highRisk === 'true' ? '#ef4444' : '#22c55e';
  const riskLabel = highRisk === 'true' ? 'Haut risque' : 'Risque limit\u00e9';
  const gpaiLabel = gpai === 'true' ? 'Oui' : 'Non';

  // Build obligation cards
  const oblCards = obligations.map((obl: string) => {
    const parts = obl.split(':');
    const title = parts[0]?.trim() || '';
    const desc = parts.slice(1).join(':').trim() || '';
    return `
    <tr><td style="padding:6px 0;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0d1f3c;border:1px solid #1a2740;">
        <tr><td style="padding:14px 16px;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="font-size:14px;font-weight:700;color:#ffffff;padding-bottom:${desc ? '6' : '0'}px;">${escHtml(title)}</td>
            </tr>
            ${desc ? `<tr><td style="font-size:12px;color:#9db0c8;line-height:18px;">${escHtml(desc)}</td></tr>` : ''}
          </table>
        </td></tr>
      </table>
    </td></tr>`;
  }).join('');

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background-color:#050c1a;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#050c1a;">
<tr><td align="center" style="padding:32px 16px;">
  <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color:#071122;border:1px solid #3d3220;">
    <!-- Logo + Title -->
    <tr><td align="center" style="padding:32px 32px 20px 32px;">
      <table cellpadding="0" cellspacing="0" border="0"><tr>
        <td width="56" height="56" align="center" valign="middle" style="background-color:#c9a84c;font-weight:900;font-size:16px;color:#050c1a;">ACF</td>
      </tr></table>
      <h1 style="font-size:22px;font-weight:800;color:#ffffff;margin:16px 0 4px 0;">EU AI Act Checker</h1>
      <p style="font-size:13px;color:#c9a84c;margin:0;">Vos r&eacute;sultats de conformit&eacute;</p>
    </td></tr>

    <!-- System Info Cards -->
    <tr><td style="padding:0 32px 20px 32px;border-top:1px solid #1a2740;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:20px;">
        <tr>
          <td width="50%" style="padding-right:8px;vertical-align:top;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0a1a30;border:1px solid #1a2740;">
              <tr><td style="padding:14px 16px;">
                <div style="font-size:10px;color:#6b7fa0;letter-spacing:1px;text-transform:uppercase;margin-bottom:4px;">SYST&Egrave;ME IA</div>
                <div style="font-size:15px;font-weight:700;color:#ffffff;">${escHtml(aiSystem || name)}</div>
              </td></tr>
            </table>
          </td>
          <td width="50%" style="padding-left:8px;vertical-align:top;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0a1a30;border:1px solid #1a2740;">
              <tr><td style="padding:14px 16px;">
                <div style="font-size:10px;color:#6b7fa0;letter-spacing:1px;text-transform:uppercase;margin-bottom:4px;">ENTIT&Eacute;</div>
                <div style="font-size:15px;font-weight:700;color:#ffffff;">${escHtml(entityLabel)}</div>
              </td></tr>
            </table>
          </td>
        </tr>
        <tr><td colspan="2" height="10"></td></tr>
        <tr>
          <td width="50%" style="padding-right:8px;vertical-align:top;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0a1a30;border:1px solid #1a2740;">
              <tr><td style="padding:14px 16px;">
                <div style="font-size:10px;color:#6b7fa0;letter-spacing:1px;text-transform:uppercase;margin-bottom:4px;">NIVEAU DE RISQUE</div>
                <div style="font-size:15px;font-weight:700;color:${riskColor};">${riskLabel}</div>
              </td></tr>
            </table>
          </td>
          <td width="50%" style="padding-left:8px;vertical-align:top;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0a1a30;border:1px solid #1a2740;">
              <tr><td style="padding:14px 16px;">
                <div style="font-size:10px;color:#6b7fa0;letter-spacing:1px;text-transform:uppercase;margin-bottom:4px;">GPAI / MOD&Egrave;LE G&Eacute;N&Eacute;RATIF</div>
                <div style="font-size:15px;font-weight:700;color:#ffffff;">${gpaiLabel}</div>
              </td></tr>
            </table>
          </td>
        </tr>
      </table>
    </td></tr>

    <!-- Obligations Header -->
    <tr><td style="padding:0 32px 12px 32px;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="font-size:11px;color:#c9a84c;letter-spacing:1px;text-transform:uppercase;font-weight:700;">OBLIGATIONS IDENTIFI&Eacute;ES</td>
          <td align="right"><span style="background-color:#c9a84c;color:#050c1a;font-size:12px;font-weight:800;padding:4px 12px;">${obligations.length}</span></td>
        </tr>
      </table>
    </td></tr>

    <!-- Obligation Cards -->
    <tr><td style="padding:0 32px 24px 32px;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        ${oblCards}
      </table>
    </td></tr>

    <!-- CTA Button -->
    <tr><td align="center" style="padding:0 32px 24px 32px;">
      <table cellpadding="0" cellspacing="0" border="0"><tr>
        <td align="center" style="background-color:#c9a84c;padding:14px 32px;">
          <a href="https://www.acf-standard.com/fr/compliance-checker" style="color:#050c1a;font-weight:700;font-size:14px;text-decoration:none;display:block;">Refaire le diagnostic</a>
        </td>
      </tr></table>
    </td></tr>

    <!-- Disclaimer -->
    <tr><td style="padding:0 32px 24px 32px;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0d1525;border:1px solid #2a2415;">
        <tr><td style="padding:14px 16px;">
          <p style="font-size:12px;color:#6b7fa0;margin:0;line-height:18px;">Cet outil fournit une indication pr&eacute;liminaire. Il ne constitue pas un avis juridique. Pour un accompagnement complet, d&eacute;couvrez le <a href="https://www.acf-standard.com" style="color:#c9a84c;">framework ACF&reg;</a>.</p>
        </td></tr>
      </table>
    </td></tr>

    <!-- Footer -->
    <tr><td style="padding:16px 32px;border-top:1px solid #1a2740;text-align:center;">
      <span style="font-size:11px;color:#6b7fa0;">&copy; 2026 Agentic Commerce Framework&reg; &mdash; www.acf-standard.com</span>
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;
}

function escHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
