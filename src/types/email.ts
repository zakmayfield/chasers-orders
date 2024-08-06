import { Order, OrderLineItem } from '@prisma/client';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export type SendEmailAPIResponse = {
  accepted: boolean;
  transporterMessageId: string;
  responseMessage: string;
};

export type TransporterResponse = SMTPTransport.SentMessageInfo | Error;

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
