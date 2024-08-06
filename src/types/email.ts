import SMTPTransport from 'nodemailer/lib/smtp-transport';

export type SendEmailAPIResponse = {
  accepted: boolean;
  transporterMessageId: string;
  responseMessage: string;
};

export type TransporterResponse = SMTPTransport.SentMessageInfo | Error;
