import { Endpoints } from '@/shared/types/API';
import { fetchHandler } from '../api/fetch';
import { TOrder, TOrderWithLineItems } from '@/shared/types/Order';

const order = Endpoints.order;
const orders = Endpoints.orders;

export const orderServices = {
  getOrders: async ({
    hasLineItems,
  }: {
    hasLineItems: boolean;
  }): Promise<TOrder[] | TOrderWithLineItems[]> =>
    await fetchHandler({
      route: orders + `${hasLineItems ? '?line-items=true' : ''}`,
    }),

  getOrder: async ({
    order_id,
    hasLineItems,
  }: {
    order_id: string;
    hasLineItems: boolean;
  }): Promise<TOrder | TOrderWithLineItems> =>
    await fetchHandler({
      route:
        order + `/${order_id}` + `${hasLineItems ? '?line-items=true' : ''}`,
    }),
};
