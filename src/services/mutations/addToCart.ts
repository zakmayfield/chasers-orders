import { CartItem } from '@/types/cart';
import { fetchHandler } from '@/utils/fetch';

export const addToCart = async (unitId: string): Promise<CartItem> =>
  fetchHandler({
    route: '/cart/item/add',
    options: {
      config: {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(unitId),
      },
    },
  });
