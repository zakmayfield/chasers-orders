import { OrderAgainData, OrderType } from '@/types/cart';
import { fetchHandler } from '@/shared/utils/api/fetch';

export const orderAgain = async (order: OrderType): Promise<OrderAgainData> =>
  await fetchHandler({
    route: '/cart/order-again',
    options: {
      config: {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(order),
      },
    },
  });
