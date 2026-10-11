import nodemailer from 'nodemailer';

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

const rateStore =
  globalThis.__portfolioContactRateStore ||
  new Map();

globalThis.__portfolioContactRateStore = rateStore;

const escapeHtml = (value = '') => {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
};

const getClientIp = (req) => {
  const forwarded = req.headers['x-forwarded-for'];

  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }

  return req.socket?.remoteAddress || 'unknown';
};

const isAllowedOrigin = (origin) => {
  if (!origin) return true;

  const allowedOrigins = new Set([
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:5173',
    'http://127.0.0.1:5173'
  ]);

  const configured = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  configured.forEach((item) => allowedOrigins.add(item));

  if (process.env.VERCEL_URL) {
    allowedOrigins.add(
      'https://' + process.env.VERCEL_URL
    );
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    allowedOrigins.add(
      'https://' +
      process.env.VERCEL_PROJECT_PRODUCTION_URL
    );
  }

  return allowedOrigins.has(origin);
};

const checkRateLimit = (ip) => {
  const now = Date.now();
  const attempts = rateStore.get(ip) || [];

  const recentAttempts = attempts.filter(
    (timestamp) => now - timestamp < WINDOW_MS
  );

  if (recentAttempts.length >= MAX_REQUESTS) {
    rateStore.set(ip, recentAttempts);
    return false;
  }

  recentAttempts.push(now);
  rateStore.set(ip, recentAttempts);

  return true;
};

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');

    return res.status(405).json({
      error: 'Método no permitido.'
    });
  }

  const origin = req.headers.origin;

  if (!isAllowedOrigin(origin)) {
    return res.status(403).json({
      error: 'Origen no autorizado.'
    });
  }

  const contentLength = Number(
    req.headers['content-length'] || 0
  );

  if (contentLength > 15000) {
    return res.status(413).json({
      error: 'Solicitud demasiado grande.'
    });
  }

  const ip = getClientIp(req);

  if (!checkRateLimit(ip)) {
    return res.status(429).json({
      error:
        'Se realizaron demasiados intentos. Esperá unos minutos e intentá nuevamente.'
    });
  }

  let body = req.body;

  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({
        error: 'Solicitud inválida.'
      });
    }
  }

  if (!body || typeof body !== 'object') {
    return res.status(400).json({
      error: 'Solicitud inválida.'
    });
  }

  const {
    name = '',
    email = '',
    subject = '',
    message = '',
    website = '',
    formStartedAt
  } = body;

  /*
   * Honeypot.
   * Los usuarios reales nunca completan este campo.
   */
  if (website) {
    return res.status(200).json({
      success: true
    });
  }

  const startedAt = Number(formStartedAt);
  const elapsed = Date.now() - startedAt;

  if (
    !Number.isFinite(startedAt) ||
    elapsed < 2500 ||
    elapsed > 2 * 60 * 60 * 1000
  ) {
    return res.status(400).json({
      error: 'No se pudo validar el formulario.'
    });
  }

  const cleanName = String(name).trim();
  const cleanEmail = String(email)
    .trim()
    .toLowerCase();

  const cleanSubject = String(subject)
    .trim()
    .replace(/[\r\n]+/g, ' ');

  const cleanMessage = String(message).trim();

  if (
    cleanName.length < 2 ||
    cleanName.length > 80
  ) {
    return res.status(400).json({
      error: 'Ingresá un nombre válido.'
    });
  }

  if (
    cleanEmail.length > 254 ||
    !isValidEmail(cleanEmail)
  ) {
    return res.status(400).json({
      error: 'Ingresá un email válido.'
    });
  }

  if (
    cleanSubject.length < 3 ||
    cleanSubject.length > 120
  ) {
    return res.status(400).json({
      error: 'Ingresá un asunto válido.'
    });
  }

  if (
    cleanMessage.length < 10 ||
    cleanMessage.length > 3000
  ) {
    return res.status(400).json({
      error:
        'El mensaje debe tener entre 10 y 3000 caracteres.'
    });
  }

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  const smtpHost =
    process.env.SMTP_HOST ||
    'smtp.gmail.com';

  const smtpPort = Number(
    process.env.SMTP_PORT || 465
  );

  const contactTo =
    process.env.CONTACT_TO ||
    'camilovenesia.dev@gmail.com';

  if (!smtpUser || !smtpPass) {
    console.error(
      '[contact] Faltan variables SMTP.'
    );

    return res.status(500).json({
      error:
        'El servicio de contacto no está disponible temporalmente.'
    });
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });

  const safeName = escapeHtml(cleanName);
  const safeEmail = escapeHtml(cleanEmail);
  const safeSubject = escapeHtml(cleanSubject);

  const safeMessage = escapeHtml(cleanMessage)
    .replace(/\n/g, '<br>');

  const replyHref =
    'mailto:' +
    encodeURIComponent(cleanEmail) +
    '?subject=' +
    encodeURIComponent('Re: ' + cleanSubject);

  const emailHtml =
    '<!DOCTYPE html>' +
    '<html lang="es">' +
    '<head>' +
    '<meta charset="UTF-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
    '<title>Nuevo mensaje desde el portfolio</title>' +
    '</head>' +

    '<body style="margin:0;padding:0;background:#f3f6f8;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">' +

    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#f3f6f8;">' +

    '<tr>' +
    '<td align="center" style="padding:40px 18px;">' +

    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:680px;background:#ffffff;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;">' +

    '<tr>' +
    '<td style="padding:30px 34px;background:#071d2b;border-bottom:3px solid #00abf0;">' +

    '<div style="margin-bottom:9px;font-size:11px;font-weight:700;letter-spacing:2.2px;color:#00abf0;">' +
    'CAMILO VENESIA · PORTFOLIO' +
    '</div>' +

    '<div style="font-size:27px;font-weight:700;line-height:1.2;color:#ffffff;">' +
    'Nuevo mensaje recibido' +
    '</div>' +

    '<div style="margin-top:8px;font-size:14px;line-height:1.5;color:#94a3b8;">' +
    'Alguien completó el formulario de contacto de tu portfolio.' +
    '</div>' +

    '</td>' +
    '</tr>' +

    '<tr>' +
    '<td style="padding:32px 34px;">' +

    '<div style="margin-bottom:14px;font-size:11px;font-weight:700;letter-spacing:1.5px;color:#64748b;text-transform:uppercase;">' +
    'Datos de contacto' +
    '</div>' +

    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;border-collapse:collapse;">' +

    '<tr>' +
    '<td style="padding:14px 0;border-bottom:1px solid #e5e7eb;">' +
    '<div style="margin-bottom:5px;font-size:12px;color:#94a3b8;">Nombre</div>' +
    '<div style="font-size:16px;font-weight:600;color:#0f172a;">' +
    safeName +
    '</div>' +
    '</td>' +
    '</tr>' +

    '<tr>' +
    '<td style="padding:14px 0;border-bottom:1px solid #e5e7eb;">' +
    '<div style="margin-bottom:5px;font-size:12px;color:#94a3b8;">Email</div>' +
    '<div style="font-size:16px;font-weight:600;">' +
    '<a href="mailto:' +
    cleanEmail +
    '" style="color:#009fe3;text-decoration:none;">' +
    safeEmail +
    '</a>' +
    '</div>' +
    '</td>' +
    '</tr>' +

    '<tr>' +
    '<td style="padding:14px 0 4px;">' +
    '<div style="margin-bottom:5px;font-size:12px;color:#94a3b8;">Asunto</div>' +
    '<div style="font-size:16px;font-weight:600;color:#0f172a;">' +
    safeSubject +
    '</div>' +
    '</td>' +
    '</tr>' +

    '</table>' +

    '<div style="margin-top:30px;margin-bottom:12px;font-size:11px;font-weight:700;letter-spacing:1.5px;color:#64748b;text-transform:uppercase;">' +
    'Mensaje' +
    '</div>' +

    '<div style="padding:22px 24px;background:#f8fafc;border:1px solid #e2e8f0;border-left:3px solid #00abf0;border-radius:10px;font-size:15px;line-height:1.75;color:#334155;">' +
    safeMessage +
    '</div>' +

    '<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:28px;">' +
    '<tr>' +
    '<td style="border-radius:8px;background:#00abf0;">' +

    '<a href="' +
    replyHref +
    '" style="display:inline-block;padding:13px 21px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;">' +
    'Responder mensaje →' +
    '</a>' +

    '</td>' +
    '</tr>' +
    '</table>' +

    '<div style="margin-top:28px;padding-top:20px;border-top:1px solid #e5e7eb;font-size:12px;line-height:1.65;color:#94a3b8;">' +
    'También podés responder este correo directamente desde Gmail. La respuesta será enviada automáticamente a ' +
    safeEmail +
    '.' +
    '</div>' +

    '</td>' +
    '</tr>' +

    '<tr>' +
    '<td style="padding:18px 34px;background:#f8fafc;border-top:1px solid #e2e8f0;">' +

    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">' +
    '<tr>' +

    '<td style="font-size:11px;line-height:1.5;color:#94a3b8;">' +
    'Enviado desde camilovenesia.dev · Portfolio personal' +
    '</td>' +

    '<td align="right" style="font-size:11px;font-weight:700;color:#00abf0;">' +
    'CONTACTO' +
    '</td>' +

    '</tr>' +
    '</table>' +

    '</td>' +
    '</tr>' +

    '</table>' +

    '</td>' +
    '</tr>' +

    '</table>' +

    '</body>' +
    '</html>';

  try {
    await transporter.sendMail({
      from:
        '"Portfolio Camilo Venesia" <' +
        smtpUser +
        '>',
      to: contactTo,
      replyTo: cleanEmail,
      subject:
        '[Portfolio] ' + cleanSubject,

      text:
        'NUEVO MENSAJE DESDE TU PORTFOLIO\n\n' +
        'Nombre: ' +
        cleanName +
        '\n' +
        'Email: ' +
        cleanEmail +
        '\n' +
        'Asunto: ' +
        cleanSubject +
        '\n\n' +
        'Mensaje:\n' +
        cleanMessage +
        '\n\n' +
        'Podés responder directamente a este correo.',

      html: emailHtml
    });

    return res.status(200).json({
      success: true
    });
  } catch (error) {
    console.error(
      '[contact] Error enviando mensaje:',
      error?.message
    );

    return res.status(500).json({
      error:
        'No se pudo enviar el mensaje. Intentá nuevamente en unos minutos.'
    });
  }
}