import { Order, OrderLineItem } from '@prisma/client';
import { headers } from 'next/headers';

type GetOrdersType = {
  (id: string): Promise<OrderType[]>;
};

type OrderType = Order & {
  lineItems: OrderLineItem[];
};

export const getOrders: GetOrdersType = async (id) => {
  try {
    const fetchUrl = new URL(`/api/orders`, process.env.NEXT_PUBLIC_BASE_URL);
    const response = await fetch(fetchUrl, {
      method: 'GET',
      headers: headers(),
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
