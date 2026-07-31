import nodemailer from "nodemailer";

export const sendEmail = async ({ email, subject, message, attachments = [] }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"BookVerse Support <support@bookverse.com>`,
    to: email,
    subject: subject,
    text: message,
    attachments: attachments,
  };

  await transporter.sendMail(mailOptions);
};