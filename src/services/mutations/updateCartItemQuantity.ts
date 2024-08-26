import { CartItem, UpdateCartItemQuantityRequest } from '@/types/cart';
import { fetchHandler } from '@/shared/utils/api/fetch';

export const updateCartItemQuantity = async (
  params: UpdateCartItemQuantityRequest
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
