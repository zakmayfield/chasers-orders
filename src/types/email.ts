import { Order, OrderLineItem } from '@prisma/client';

export type SendVerificationEmailResponse = {
  accepted: boolean;
  transporterMessageId: string;
  responseMessage: string;
};

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
