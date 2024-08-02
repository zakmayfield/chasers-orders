import { fetchHandler } from '@/utils/fetch';

export type LineItemProducts = {
  id: string;
  lineItems: {
    id: string;
    quantity: number;
    unit: {
      id: string;
      product: {
        id: string;
        name: string;
        category: string;
      };
    };
  }[];
};

export const getLineItems = async (
  orderId: string
): Promise<LineItemProducts> =>
  await fetchHandler({
    route: '/orders/recent/line-items',
    options: {
      config: {
        headers: {
          'x-order-id': orderId,
        },
      },
    },
  });
