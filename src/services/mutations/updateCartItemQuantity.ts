import { CartItem, UpdateQuantity } from '@/types/cart';
import { fetchHandler } from '@/utils/fetch';

export const updateCartItemQuantity = async (
  params: UpdateQuantity
): Promise<CartItem> =>
  await fetchHandler({
    route: '/cart/item/quantity',
    options: {
      config: {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(params),
      },
    },
  });
