import { Order, OrderLineItem } from '@prisma/client';

type GetOrdersType = {
  (): Promise<Orders>;
};

type Orders = Order & {
  lineItems: OrderLineItem[];
};

export const getOrders: GetOrdersType = async () => {
  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
