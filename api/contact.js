
import nodemailer from 'nodemailer';

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_MAX_TRACKED_IPS = 5000;
const MAX_BODY_BYTES = 15 * 1024;

const getRateStore = () => {
  if (!(globalThis.__portfolioContactRateStore instanceof Map)) {
    globalThis.__portfolioContactRateStore = new Map();
  }

  return globalThis.__portfolioContactRateStore;
};

const rateStore = getRateStore();

const escapeHtml = (value = '') => {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
};

const removeUnsafeControlCharacters = (value) => {
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');
};

const cleanSingleLine = (value) => {
  return removeUnsafeControlCharacters(value)
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
};

const cleanMultiline = (value) => {
  return removeUnsafeControlCharacters(value)
    .replace(/\r\n?/g, '\n')
    .trim();
};

const parseOrigin = (value) => {
  if (typeof value !== 'string' || !value.trim()) return null;

  try {
    const parsed = new URL(value);

    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return null;
    }

    return parsed.origin;
  } catch {
    return null;
  }
};

const isAllowedOrigin = (origin) => {
  if (!origin) {
    const isProductionDeployment =
      process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';

    return !isProductionDeployment;
  }

  const requestOrigin = parseOrigin(origin);

  if (!requestOrigin || requestOrigin !== origin) return false;

  const allowedOrigins = new Set([
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:5173',
    'http://127.0.0.1:5173'
  ]);

  const configuredOrigins = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  configuredOrigins.forEach((item) => {
    const parsed = parseOrigin(item);
    if (parsed) allowedOrigins.add(parsed);
  });

  if (process.env.VERCEL_URL) {
    const parsed = parseOrigin(`https://${process.env.VERCEL_URL}`);
    if (parsed) allowedOrigins.add(parsed);
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    const parsed = parseOrigin(
      `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    );

    if (parsed) allowedOrigins.add(parsed);
  }

  return allowedOrigins.has(requestOrigin);
};

const getClientIp = (req) => {
  const forwarded = req.headers?.['x-forwarded-for'];

  const forwardedValue = Array.isArray(forwarded)
    ? forwarded[0]
    : forwarded;

  if (typeof forwardedValue === 'string') {
    const firstIp = forwardedValue.split(',')[0].trim();

    if (firstIp && firstIp.length <= 64) {
      return firstIp;
    }
  }

  const realIp = req.headers?.['x-real-ip'];

  if (typeof realIp === 'string' && realIp.trim().length <= 64) {
    return realIp.trim();
  }

  return req.socket?.remoteAddress || 'unknown';
};

const removeExpiredRateEntries = (now) => {
  for (const [ip, attempts] of rateStore.entries()) {
    const recentAttempts = attempts.filter(
      (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
    );

    if (recentAttempts.length) {
      rateStore.set(ip, recentAttempts);
    } else {
      rateStore.delete(ip);
    }
  }
};

/**
 * Limitador local de mejor esfuerzo.
 * En Vercel cada instancia serverless puede tener su propia memoria;
 * esto no reemplaza un rate limit distribuido con Redis/Upstash.
 */
const checkRateLimit = (ip) => {
  const now = Date.now();
  const attempts = rateStore.get(ip) || [];

  const recentAttempts = attempts.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );

  if (recentAttempts.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateStore.delete(ip);
    rateStore.set(ip, recentAttempts);
    return false;
  }

  recentAttempts.push(now);
  rateStore.delete(ip);

  if (rateStore.size >= RATE_LIMIT_MAX_TRACKED_IPS) {
    removeExpiredRateEntries(now);

    if (rateStore.size >= RATE_LIMIT_MAX_TRACKED_IPS) {
      const oldestIp = rateStore.keys().next().value;
      if (oldestIp) rateStore.delete(oldestIp);
    }
  }

  rateStore.set(ip, recentAttempts);

  return true;
};

const isValidEmail = (email) => {
  if (typeof email !== 'string' || email.length > 254) return false;

  const parts = email.split('@');

  if (parts.length !== 2) return false;

  const [localPart, domain] = parts;

  if (!localPart || localPart.length > 64 || !domain || domain.length > 253) {
    return false;
  }

  const localPartPattern =
    /^[A-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Z0-9!#$%&'*+/=?^_`{|}~-]+)*$/i;

  if (!localPartPattern.test(localPart)) return false;

  const labels = domain.split('.');

  if (labels.length < 2) return false;

  const validDomainLabel =
    /^[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?$/i;

  if (!labels.every((label) => validDomainLabel.test(label))) {
    return false;
  }

  const topLevelDomain = labels[labels.length - 1];

  const validTopLevelDomain =
    /^(?:[A-Z]{2,63}|XN--[A-Z0-9-]{2,59})$/i;

  return validTopLevelDomain.test(topLevelDomain);
};

const encodeMailtoAddress = (email) => {
  return encodeURIComponent(email).replace(/%40/gi, '@');
};

const sendJsonError = (res, statusCode, message) => {
  return res.status(statusCode).json({ error: message });
};

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');

    return sendJsonError(res, 405, 'Método no permitido.');
  }

  if (!isAllowedOrigin(req.headers?.origin)) {
    return sendJsonError(res, 403, 'Origen no autorizado.');
  }

  const contentType = req.headers?.['content-type'] || '';

  if (!/^application\/json(?:\s*;|$)/i.test(contentType)) {
    return sendJsonError(res, 415, 'Tipo de contenido no permitido.');
  }

  const contentLengthHeader = req.headers?.['content-length'];

  if (contentLengthHeader !== undefined) {
    const contentLength = Number(contentLengthHeader);

    if (!Number.isFinite(contentLength) || contentLength < 0) {
      return sendJsonError(res, 400, 'Solicitud inválida.');
    }

    if (contentLength > MAX_BODY_BYTES) {
      return sendJsonError(res, 413, 'Solicitud demasiado grande.');
    }
  }

  const ip = getClientIp(req);

  if (!checkRateLimit(ip)) {
    res.setHeader(
      'Retry-After',
      String(RATE_LIMIT_WINDOW_MS / 1000)
    );

    return sendJsonError(
      res,
      429,
      'Se realizaron demasiados intentos. Esperá unos minutos e intentá nuevamente.'
    );
  }

  let body = req.body;

  if (Buffer.isBuffer(body)) {
    body = body.toString('utf8');
  }

  if (typeof body === 'string') {
    if (Buffer.byteLength(body, 'utf8') > MAX_BODY_BYTES) {
      return sendJsonError(res, 413, 'Solicitud demasiado grande.');
    }

    try {
      body = JSON.parse(body);
    } catch {
      return sendJsonError(res, 400, 'Solicitud inválida.');
    }
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return sendJsonError(res, 400, 'Solicitud inválida.');
  }

  try {
    if (Buffer.byteLength(JSON.stringify(body), 'utf8') > MAX_BODY_BYTES) {
      return sendJsonError(res, 413, 'Solicitud demasiado grande.');
    }
  } catch {
    return sendJsonError(res, 400, 'Solicitud inválida.');
  }

  const {
    name,
    email,
    subject,
    message,
    website = '',
    formStartedAt
  } = body;

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof subject !== 'string' ||
    typeof message !== 'string' ||
    typeof website !== 'string' ||
    (typeof formStartedAt !== 'number' && typeof formStartedAt !== 'string')
  ) {
    return sendJsonError(res, 400, 'Solicitud inválida.');
  }

  // Honeypot: los usuarios reales nunca completan este campo.
  if (website.trim()) {
    return res.status(200).json({ success: true });
  }

  const startedAt = Number(formStartedAt);
  const elapsed = Date.now() - startedAt;

  if (
    !Number.isFinite(startedAt) ||
    elapsed < 2500 ||
    elapsed > 2 * 60 * 60 * 1000
  ) {
    return sendJsonError(
      res,
      400,
      'No se pudo validar el formulario.'
    );
  }

  const cleanName = cleanSingleLine(name);
  const cleanEmail = email.trim().toLowerCase();
  const cleanSubject = cleanSingleLine(subject);
  const cleanMessage = cleanMultiline(message);

  if (cleanName.length < 2 || cleanName.length > 80) {
    return sendJsonError(res, 400, 'Ingresá un nombre válido.');
  }

  if (!isValidEmail(cleanEmail)) {
    return sendJsonError(res, 400, 'Ingresá un email válido.');
  }

  if (cleanSubject.length < 3 || cleanSubject.length > 120) {
    return sendJsonError(res, 400, 'Ingresá un asunto válido.');
  }

  if (cleanMessage.length < 10 || cleanMessage.length > 3000) {
    return sendJsonError(
      res,
      400,
      'El mensaje debe tener entre 10 y 3000 caracteres.'
    );
  }

  const smtpUser = (process.env.SMTP_USER || '').trim();
  const smtpPass = process.env.SMTP_PASS;
  const smtpHost = (process.env.SMTP_HOST || 'smtp.gmail.com').trim();
  const smtpPort = Number(process.env.SMTP_PORT || 465);

  const contactRecipients = (
    process.env.CONTACT_TO || 'camilovenesia.dev@gmail.com'
  )
    .split(',')
    .map((recipient) => recipient.trim())
    .filter(Boolean);

  const validSmtpConfiguration =
    smtpUser &&
    smtpPass &&
    isValidEmail(smtpUser) &&
    smtpHost &&
    [465, 587].includes(smtpPort) &&
    contactRecipients.length > 0 &&
    contactRecipients.every(isValidEmail);

  if (!validSmtpConfiguration) {
    console.error(
      '[contact] La configuración SMTP está incompleta o es inválida.'
    );

    return sendJsonError(
      res,
      500,
      'El servicio de contacto no está disponible temporalmente.'
    );
  }

  const safeName = escapeHtml(cleanName);
  const safeEmail = escapeHtml(cleanEmail);
  const safeSubject = escapeHtml(cleanSubject);

  const safeMessage = escapeHtml(cleanMessage)
    .replace(/\n/g, '<br>');

  const emailHref = escapeHtml(
    `mailto:${encodeMailtoAddress(cleanEmail)}`
  );

  const replyHref = escapeHtml(
    `mailto:${encodeMailtoAddress(cleanEmail)}?subject=${encodeURIComponent(
      `Re: ${cleanSubject}`
    )}`
  );

  const emailHtml = `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nuevo mensaje desde el portfolio</title>
      </head>
      <body style="margin:0;padding:0;background:#f3f6f8;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#f3f6f8;">
          <tr>
            <td align="center" style="padding:40px 18px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:680px;background:#ffffff;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;">
                <tr>
                  <td style="padding:30px 34px;background:#071d2b;border-bottom:3px solid #00abf0;">
                    <div style="margin-bottom:9px;font-size:11px;font-weight:700;letter-spacing:2.2px;color:#00abf0;">
                      CAMILO VENESIA · PORTFOLIO
                    </div>
                    <div style="font-size:27px;font-weight:700;line-height:1.2;color:#ffffff;">
                      Nuevo mensaje recibido
                    </div>
                    <div style="margin-top:8px;font-size:14px;line-height:1.5;color:#94a3b8;">
                      Alguien completó el formulario de contacto de tu portfolio.
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:32px 34px;">
                    <div style="margin-bottom:14px;font-size:11px;font-weight:700;letter-spacing:1.5px;color:#64748b;text-transform:uppercase;">
                      Datos de contacto
                    </div>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;border-collapse:collapse;">
                      <tr>
                        <td style="padding:14px 0;border-bottom:1px solid #e5e7eb;">
                          <div style="margin-bottom:5px;font-size:12px;color:#94a3b8;">Nombre</div>
                          <div style="font-size:16px;font-weight:600;color:#0f172a;">${safeName}</div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:14px 0;border-bottom:1px solid #e5e7eb;">
                          <div style="margin-bottom:5px;font-size:12px;color:#94a3b8;">Email</div>
                          <div style="font-size:16px;font-weight:600;">
                            <a href="${emailHref}" style="color:#009fe3;text-decoration:none;">${safeEmail}</a>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:14px 0 4px;">
                          <div style="margin-bottom:5px;font-size:12px;color:#94a3b8;">Asunto</div>
                          <div style="font-size:16px;font-weight:600;color:#0f172a;">${safeSubject}</div>
                        </td>
                      </tr>
                    </table>
                    <div style="margin-top:30px;margin-bottom:12px;font-size:11px;font-weight:700;letter-spacing:1.5px;color:#64748b;text-transform:uppercase;">
                      Mensaje
                    </div>
                    <div style="padding:22px 24px;background:#f8fafc;border:1px solid #e2e8f0;border-left:3px solid #00abf0;border-radius:10px;font-size:15px;line-height:1.75;color:#334155;">
                      ${safeMessage}
                    </div>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:28px;">
                      <tr>
                        <td style="border-radius:8px;background:#00abf0;">
                          <a href="${replyHref}" style="display:inline-block;padding:13px 21px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;">
                            Responder mensaje →
                          </a>
                        </td>
                      </tr>
                    </table>
                    <div style="margin-top:28px;padding-top:20px;border-top:1px solid #e5e7eb;font-size:12px;line-height:1.65;color:#94a3b8;">
                      También podés responder este correo directamente desde Gmail. La respuesta será enviada automáticamente a ${safeEmail}.
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px 34px;background:#f8fafc;border-top:1px solid #e2e8f0;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="font-size:11px;line-height:1.5;color:#94a3b8;">
                          Enviado desde camilovenesia.dev · Portfolio personal
                        </td>
                        <td align="right" style="font-size:11px;font-weight:700;color:#00abf0;">
                          CONTACTO
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  const emailText = [
    'NUEVO MENSAJE DESDE TU PORTFOLIO',
    '',
    `Nombre: ${cleanName}`,
    `Email: ${cleanEmail}`,
    `Asunto: ${cleanSubject}`,
    '',
    'Mensaje:',
    cleanMessage,
    '',
    'Podés responder directamente a este correo.'
  ].join('\n');

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    await transporter.sendMail({
      from: {
        name: 'Portfolio Camilo Venesia',
        address: smtpUser
      },
      to: contactRecipients,
      replyTo: {
        name: cleanName,
        address: cleanEmail
      },
      subject: `[Portfolio] ${cleanSubject}`,
      text: emailText,
      html: emailHtml
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(
      '[contact] Error enviando mensaje:',
      error?.code || error?.message || 'Error desconocido'
    );

    return sendJsonError(
      res,
      500,
      'No se pudo enviar el mensaje. Intentá nuevamente en unos minutos.'
    );
  }
}
