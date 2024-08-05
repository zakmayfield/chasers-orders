import { fetchHandler } from '@/utils/fetch';

export const removeFromCart = async (payload: {
  unitId: string;
  cartId: string;
}): Promise<{ unitId: string }> =>
  fetchHandler({
    route: '/cart/item/remove',
    options: {
      config: {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    },
  });
