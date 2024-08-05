import { CartItem, UpdateCartItemSizeParams } from '@/types/cart';
import { fetchHandler } from '@/utils/fetch';

export const updateCartItemSize = async (
  params: UpdateCartItemSizeParams
): Promise<CartItem> =>
  await fetchHandler({
    route: '/cart/item/size',
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
