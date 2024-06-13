import { OrderType } from '@/features/dashboard/recent-orders/RecentOrders';
import { fetchHandler } from '@/shared/helpers';

export const getRecentOrders = async (): Promise<OrderType[]> =>
  await fetchHandler({
    route: '/orders',
    options: {
      urlExtension: '/recent',
    },
  });
