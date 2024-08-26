import { ExtendedFavorite, ToggleFavoriteAction } from '@/types/products';
import { fetchHandler } from '@/shared/utils/api/fetch';

export const toggleFavorite = async (
  params: ToggleFavoriteAction
): Promise<ExtendedFavorite> =>
  await fetchHandler({
    route: '/user/favorites/toggle',
    options: {
      config: {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'X-Action': params.action,
        },
        body: JSON.stringify({
          productId: params.productId,
          favoriteId: params.favoriteId,
        }),
      },
    },
  });
