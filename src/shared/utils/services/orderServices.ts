import { Endpoints } from '@/shared/types/API';
import { fetchHandler } from '../api/fetch';

const order = Endpoints.order;
const orders = Endpoints.orders;

export const orderServices = {
  getOrders: async (): Promise<void> =>
    await fetchHandler({
      route: orders,
    }),

  getOrder: async ({ order_id }: { order_id: string }): Promise<void> =>
    await fetchHandler({
      route: order + `/${order_id}`,
    }),
};
