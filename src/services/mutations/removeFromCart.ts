import { RemoveCartItemRequest, RemoveCartItemResponse } from '@/types/cart';
import { fetchHandler } from '@/utils/fetch';

export const removeFromCart = async (
  payload: RemoveCartItemRequest
): Promise<RemoveCartItemResponse> =>
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
