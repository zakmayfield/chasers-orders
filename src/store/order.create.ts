import { CartCache } from '@/types/types.cart';
import { Order, OrderLineItem } from '@prisma/client';

type CreateOrderType = {
  (payload: CartCache['items']): Promise<OrderData>;
};

type OrderData = Order & {
  lineItems: OrderLineItem[];
};

export const createOrder: CreateOrderType = async (payload) => {
  try {
    const response = await fetch('/api/orders/create', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(payload),
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
