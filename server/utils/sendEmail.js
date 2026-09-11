const nodemailer = require('nodemailer');

// Lazily creates a transporter from env vars, so the app can still boot
// (and run) even if email hasn't been configured yet — it just logs a
// warning and skips sending instead of crashing the server.
let transporter = null;

const getTransporter = () => {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return null;
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  });

  return transporter;
};

/**
 * Sends an email. Never throws — registration (or any other flow) should
 * never fail just because the email provider is slow/misconfigured.
 * Returns true if the email was actually sent, false otherwise.
 */
const sendEmail = async ({ to, subject, html, text }) => {
  const t = getTransporter();

  if (!t) {
    console.warn(
      `[sendEmail] SMTP is not configured (see server/.env.example) — skipped email to ${to}: "${subject}"`
    );
    return false;
  }

  try {
    await t.sendMail({
      from: process.env.EMAIL_FROM || `"RSR LMS" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html
    });
    return true;
  } catch (err) {
    console.error('[sendEmail] Failed to send email:', err.message);
    return false;
  }
};

module.exports = sendEmail;
