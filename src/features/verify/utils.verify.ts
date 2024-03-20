import transporter from '@/lib/nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { baseURL } from '@/utils/constants';

interface ISendEmailUtility {
  ({
    verificationToken,
    email,
  }: {
    verificationToken: string;
    email: string;
  }): Promise<TransporterResponse>;
}

export type SendEmailAPIResponse = {
  accepted: boolean;
  transporterMessageId: string;
  responseMessage: string;
};

export type TransporterResponse = SMTPTransport.SentMessageInfo | Error;

export const sendEmail: ISendEmailUtility = async ({
  verificationToken,
  email,
}) => {
  const info = await transporter.sendMail({
    from: process.env.GMAIL_USERNAME,
    to: email,
    subject: 'Email Confirmation: Chasers Fresh Juice',
    html: `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Confirm Your Email - Chasers Fresh Juice</title>

    <style>
      h1 {
        font-size: 24px;
        color: #333;
        margin-bottom: 25px;
      }

      p {
        font-size: 16px;
        color: #666;
        line-height: 1.5;
      }

      a {
        text-decoration: none;
      }

      .cta-container {
        text-align: center;
        margin: 30px 20px;
      }

      .button {
        background: #007bff;
        padding: 10px 20px;
        border-radius: 5px;
        font-weight: bold;
      }
    </style>
    </head>
    
    <body style="padding: 20px;">
      <h1>Welcome to Chasers Fresh Juice!</h1>

      <p>Hi, ${email}</p>

      <p>We're excited to have you on board. To get started, please confirm your email address by clicking the button below:</p>

      <div class="cta-container">
        <a href="${baseURL}/verify?token=${verificationToken}" class="button" style="color: #fff;">Confirm Email</a>
        <p style="font-size: 12; font-style: italic; color: #999;">This link expires in 48 hours.</p>
      </div>
      
      <p>If you didn't create an account with us, please ignore this email.</p>
      
      <p>Thanks,<br>Chasers Fresh Juice</p>
    </body>
    </html>
    `,
  });

  return info; // Resolve promise with transporter data
};
