import { CartItem, UpdateCartItemSizeRequest } from '@/types/cart';
import { fetchHandler } from '@/shared/utils/api/fetch';

export const updateCartItemSize = async (
  params: UpdateCartItemSizeRequest
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
