import { OrderType } from '@/types/cart';
import { fetchHandler } from '@/utils/fetch';

export const getRecentOrders = async (): Promise<OrderType[]> =>
  await fetchHandler({
    route: '/orders',
    options: {
      urlExtension: '/recent',
    },
  });
