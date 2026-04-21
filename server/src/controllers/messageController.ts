import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Message from '../models/Message';
import {
  isMailerConfigured,
  mailRecipient,
  mailSender,
  mailer,
} from '../config/mailer';

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const name = String(req.body.name || '').trim();
    const email = String(req.body.email || '').trim().toLowerCase();
    const subject = String(req.body.subject || '').trim();
    const message = String(req.body.message || '').trim();
    const msg = new Message({ name, email, subject, message });
    await msg.save();

    if (isMailerConfigured && mailRecipient && mailSender) {
      await mailer.sendMail({
        from: `"Portfolio Contact" <${mailSender}>`,
        replyTo: `"${name}" <${email}>`,
        to: mailRecipient,
        subject: `[Portfolio] ${subject}`,
        text: message,
        html: `
          <h2>New Portfolio Contact</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
        `,
      });
    }

    res.status(201).json({
      message: isMailerConfigured ? 'Message sent' : 'Message saved',
    });
  } catch (err) {
    next(err);
  }
};

export const getMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const messages = await Message.aggregate([
      { $sort: { createdAt: -1 } },
      { $project: { name: 1, email: 1, subject: 1, message: 1, read: 1, createdAt: 1 } }
    ]);
    res.json(messages);
  } catch (err) {
    next(err);
  }
};

export const markMessageAsRead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: 'Message not found' });
    }

    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true, runValidators: true }
    );

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json(message);
  } catch (err) {
    next(err);
  }
};

export const deleteMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: 'Message not found' });
    }

    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json({ message: 'Message deleted' });
  } catch (err) {
    next(err);
  }
};
