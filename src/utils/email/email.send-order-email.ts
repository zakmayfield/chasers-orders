import { Company, Order, OrderLineItem, User } from '@prisma/client';
import transporter from './email.config';

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
  const mailOptions = generateMailOptions(payload);

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

function generateMailOptions(payload: PayloadType): Record<string, string> {
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
