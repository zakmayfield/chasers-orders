import { CartItem, UpdateCartItemQuantityParams } from '@/types/cart';
import { fetchHandler } from '@/utils/fetch';

export const updateCartItemQuantity = async (
  params: UpdateCartItemQuantityParams
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
