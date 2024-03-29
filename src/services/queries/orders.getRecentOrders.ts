import { OrderType } from '@/features/dashboard/recent-orders/RecentOrders';

type GetOrdersType = {
  (): Promise<OrderType[]>;
};

export const getRecentOrders: GetOrdersType = async () => {
  try {
    const fetchUrl = new URL(
      `/api/orders/recent`,
      process.env.NEXT_PUBLIC_BASE_URL
    );
    const response = await fetch(fetchUrl);

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
