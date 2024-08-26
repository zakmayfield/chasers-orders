import SMTPTransport from 'nodemailer/lib/smtp-transport';
import transporter from '@/lib/nodemailer';
import { BASE_URL, GMAIL_USERNAME } from '../constants';

export type TransporterResponse = SMTPTransport.SentMessageInfo | Error;

type TSendEmail = (props: {
  type: 'verification' | 'order';
  to: string;
  verificationToken?: string;
  companyName?: string;
}) => Promise<TransporterResponse>;

export const sendEmail: TSendEmail = async ({
  type,
  to,
  verificationToken,
  companyName,
}) => {
  const from = GMAIL_USERNAME;

  const emailMap = {
    verification: {
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

      <p>Hi, ${to}</p>

      <p>We're excited to have you on board. To get started, please confirm your email address by clicking the button below:</p>

      <div class="cta-container">
        <a href="${BASE_URL}/verification?token=${verificationToken}" class="button" style="color: #fff;">Confirm Email</a>
        <p style="font-size: 12; font-style: italic; color: #999;">This link expires in 48 hours.</p>
      </div>
      
      <p>If you didn't create an account with us, please ignore this email.</p>
      
      <p>Thanks,<br>Chasers Fresh Juice</p>
    </body>
    </html>
    `,
    },
    order: {
      subject: `New Order - ${companyName}`,
      html: `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Order Confirmation</title>

    <style>
      h1 {
        font-size: 24px;
        color: #333;
        margin-bottom: 25px;
      }
    </style>
    </head>
    
    <body style="padding: 20px;">
      <h1>New Order from ${companyName}</h1>

      <div>
        <h2>Items:<h2/>
        
        <p>{item-1}</p>
        <p>{item-2}</p>
        <p>{item-3}</p>
      </div>
    </body>
    </html>
    `,
    },
  };

  const subject = emailMap[type].subject;
  const html = emailMap[type].html;

  const data = await transporter.sendMail({
    from,
    to,
    subject,
    html,
  });

  return data;
};
