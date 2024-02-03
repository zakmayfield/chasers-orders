import { OrderType } from '@/features/profile/ui/RecentOrders';

type GetOrdersType = {
  (): Promise<OrderType[]>;
};

export const getOrders: GetOrdersType = async () => {
  try {
    const fetchUrl = new URL(`/api/orders`, process.env.NEXT_PUBLIC_BASE_URL);
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
