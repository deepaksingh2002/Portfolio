import { Request, Response, NextFunction } from 'express';
import Message from '../models/Message';
import { mailer } from '../config/mailer';

export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, subject, message } = req.body;
    const msg = new Message({ name, email, subject, message });
    await msg.save();

    await mailer.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.MAIL_USER,
      subject: `[Portfolio] ${subject}`,
      text: message,
      html: `<p>${message}</p>`,
    });

    res.status(201).json({ message: 'Message sent' });
  } catch (err) {
    next(err);
  }
};

export const getMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    next(err);
  }
};
