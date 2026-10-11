import nodemailer from 'nodemailer';

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

const rateStore =
  globalThis.__portfolioContactRateStore ||
  new Map();

globalThis.__portfolioContactRateStore = rateStore;

const escapeHtml = (value = '') => {
  return value
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
  const cleanEmail = String(email).trim().toLowerCase();
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
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 465),
    secure: true,
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
        'Nuevo mensaje desde el portfolio\n\n' +
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
        cleanMessage,
      html:
        '<div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;color:#111827">' +
        '<h2 style="margin-bottom:24px">Nuevo mensaje desde tu portfolio</h2>' +
        '<p><strong>Nombre:</strong> ' +
        safeName +
        '</p>' +
        '<p><strong>Email:</strong> ' +
        safeEmail +
        '</p>' +
        '<p><strong>Asunto:</strong> ' +
        safeSubject +
        '</p>' +
        '<div style="margin-top:24px;padding:20px;background:#f3f4f6;border-radius:10px;line-height:1.6">' +
        safeMessage +
        '</div>' +
        '</div>'
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