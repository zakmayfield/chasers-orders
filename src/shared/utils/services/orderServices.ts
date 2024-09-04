import { fetchHandler } from '@/shared/utils/api/fetch';
import { Endpoints } from '@/shared/types/API';
import {
  TOrder,
  TOrderWithLineItems,
  TCreateOrderRequestPayload,
} from '@/shared/types/Order';

const order = Endpoints.order;
const orders = Endpoints.orders;

export const orderServices = {
  getOrders: async (): Promise<TOrderWithLineItems[]> =>
    await fetchHandler({
      route: orders,
    }),

  getOrder: async ({
    order_id,
  }: {
    order_id: string;
  }): Promise<TOrderWithLineItems> =>
    await fetchHandler({
      route: order + `/${order_id}`,
    }),

  createOrder: async ({
    line_items,
  }: {
    line_items: TCreateOrderRequestPayload;
  }): Promise<TOrderWithLineItems> =>
    await fetchHandler({
      route: orders,
      options: {
        config: {
          method: 'POST',
          body: JSON.stringify(line_items),
        },
      },
    }),
};
