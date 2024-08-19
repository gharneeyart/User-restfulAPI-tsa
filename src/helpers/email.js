import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { PASSWORD_RESET_REQUEST_TEMPLATE } from './emailTemplates.js';

dotenv.config(); // 

const transporter = nodemailer.createTransport({
  service: 'Gmail', // or another email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendResetEmail = (email, resetLink) => {
  const emailContent = PASSWORD_RESET_REQUEST_TEMPLATE.replace("{reserURL}", resetLink)
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Request',
    // text: `You requested a password reset. Click the link below to reset your password:\n\n${resetLink}`,
    // html: `<p>You requested a password reset. Click the link below to reset your password:</p><p><a href="${resetLink}">${resetLink}</a></p>`,
    html: emailContent, // replace with your email template content.
    category: "Reset Password",
  };

  return transporter.sendMail(mailOptions);
};
