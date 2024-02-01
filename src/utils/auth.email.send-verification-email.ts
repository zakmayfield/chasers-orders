import nodemailer from 'nodemailer';

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.GMAIL_USERNAME,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

export const sendVerificationEmail = (
  verificationToken: string,
  email: string
) => {
  const mailOptions = generateMailOptions(verificationToken, email);

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      console.log('Error sending email: ', err);
    } else {
      console.log('Email sent successfully');
    }
  });
};

function generateMailOptions(
  verificationToken: string,
  email: string
): Record<string, string> {
  const mailOptions = {
    from: 'zakmayfield@gmail.com',
    to: email,
    subject: 'Please confirm your email - AuthJS Test',
    html: `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Confirm Your Email - AuthJS Test</title>

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
      <h1>Welcome to AuthJS Test!</h1>

      <p>Hi, ${email}</p>

      <p>We're excited to have you on board. To get started, please confirm your email address by clicking the button below:</p>

      <div class="cta-container">
        <a href="http://localhost:3000/profile/verify-email?token=${verificationToken}" class="button" style="color: #fff;">Confirm Email</a>
        <p style="font-size: 12; font-style: italic; color: #999;">This link expires in 48 hours.</p>
      </div>
      
      <p>If you didn't create an account with us, please ignore this email.</p>
      
      <p>Thanks,<br>The AuthJS Test Team</p>
    </body>
    </html>
    `,
  };

  return mailOptions;
}
