import transporter from '@/lib/nodemailer';
import { GMAIL_USERNAME } from '@/shared/utils/constants';

export type SendOrderEmailPayload = {
  order: Order & {
    lineItems: OrderLineItem[];
  };
  userData: {
    id: string;
    email: string;
    company: {
      name: string;
    };
  };
};

export const sendOrderEmail = async (payload: SendOrderEmailPayload) => {
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

function orderEmailOptions(
  payload: SendOrderEmailPayload
): Record<string, string> {
  const { userData } = payload;
  const userEmail = userData!.email;
  const companyName = userData!.company!.name;
  const fromAddress = GMAIL_USERNAME;
  const subject = `New Order - ${companyName}`;

  const mailOptions = {
    from: fromAddress!,
    to: userEmail,
    subject,
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
