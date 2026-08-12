import nodemailer from "nodemailer";

// Sends email directly through your own Gmail account via SMTP —
// no third-party email API/service involved. Requires:
//   GMAIL_USER=your.address@gmail.com
//   GMAIL_APP_PASSWORD=<a 16-character App Password from your Google Account>
// (An App Password is required because Gmail blocks plain password login
// for apps — see README for how to generate one.)
export function getMailer() {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}
