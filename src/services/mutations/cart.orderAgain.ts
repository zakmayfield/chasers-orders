import { OrderType } from '@/features/dashboard/recent-orders/RecentOrders';
import {
  CartCache,
  UnitsOnCartCacheType,
} from '@/features/cart/types/types.cart';
import { Prisma, OrderLineItem } from '@prisma/client';

type OrderAgainProps = {
  (order: OrderType): Promise<OrderAgainResponse>;
};

export type OrderAgainResponse = {
  batchPayload: Prisma.BatchPayload;
  cartPayload: CartCache;
};

export const orderAgain: OrderAgainProps = async (order) => {
  try {
    const response = await fetch('/api/cart/order-again', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
