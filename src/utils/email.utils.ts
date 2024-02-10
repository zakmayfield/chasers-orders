import { Order, OrderLineItem } from '@prisma/client';
import transporter from '@/lib/nodemailer';

/*
  ORDER 
*/

type PayloadType = {
  order: Order & {
    lineItems: OrderLineItem[];
  };
  userData: UserData;
};

type UserData = {
  company: {
    name: string;
  } | null;
  id: string;
  email: string;
} | null;

export const sendOrderEmail = async (payload: PayloadType) => {
  const mailOptions = orderEmailOptions(payload);

  const send = async (): Promise<string | undefined> => {
    function wait(delay: number) {
      return new Promise((resolve) => {
        setTimeout(resolve, delay);
      });
    }

    let retryAttempt = 1;
    const maxRetries = 3;
    while (retryAttempt <= maxRetries) {
      try {
        await transporter.sendMail(mailOptions);
        return `Order email sent successfully`;
      } catch (error) {
        console.error(`Error sending email: retry attempt #${retryAttempt}`);

        // exponential retry 2sec, 4sec, 8sec
        await wait(Math.pow(2, retryAttempt) * 1000);

        if (retryAttempt === maxRetries && error instanceof Error) {
          throw new Error(
            `Failed to send email after all retries: ${error.message}`
          );
        }

        retryAttempt++;
      }
    }
  };

  return await send();
};

function orderEmailOptions(payload: PayloadType): Record<string, string> {
  const { order, userData } = payload;
  const email = userData!.email;
  const companyName = userData!.company!.name;

  // TODO: Configure html template
  const mailOptions = {
    from: 'zakmayfield@gmail.com',
    to: email,
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
  };

  return mailOptions;
}

/*
  EMAIL VERIFICATION
*/
export const sendVerificationEmail = (
  verificationToken: string,
  email: string
) => {
  const mailOptions = verificationEmailOptions(verificationToken, email);

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      console.log('Error sending email: ', err);
    } else {
      console.log('Email sent successfully');
    }
  });
};

function verificationEmailOptions(
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
        <a href="http://localhost:3000/dashboard/verify-email?token=${verificationToken}" class="button" style="color: #fff;">Confirm Email</a>
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
