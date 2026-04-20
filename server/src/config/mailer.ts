import nodemailer from 'nodemailer';

export const isMailerConfigured = Boolean(
  process.env.MAIL_USER && process.env.MAIL_PASS
);

export const mailRecipient = process.env.MAIL_TO || process.env.MAIL_USER || '';
export const mailSender = process.env.MAIL_FROM || process.env.MAIL_USER || '';

export const mailer = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});
