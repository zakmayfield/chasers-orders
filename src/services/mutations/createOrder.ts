import { CartItem } from '@/types/cart';
import { fetchHandler } from '@/utils/fetch';
import { Order, OrderLineItem } from '@prisma/client';

export type OrderData = Order & {
  lineItems: OrderLineItem[];
};

export type CreateOrderPayload = {
  items?: CartItem[];
  cartId?: string;
};

export const createOrder = async (
  payload: CreateOrderPayload
): Promise<OrderData> =>
  await fetchHandler({
    route: '/orders/create',
    options: {
      config: {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    },
  });
