import { OrderType } from '@/types/cart';
import { fetchHandler } from '@/shared/utils/api/fetch';

export const getRecentOrders = async (): Promise<OrderType[]> =>
  await fetchHandler({
    route: '/orders',
    options: {
      urlExtension: '/recent',
    },
  });
