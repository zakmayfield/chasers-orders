import { ExtendedFavorite } from '@/features/products/helpers.products';
import { Actions } from '@/types/products';
import { fetchHandler } from '@/utils/fetch';

export const toggleFavorite = async (
  action: Actions,
  id?: string
): Promise<ExtendedFavorite> =>
  await fetchHandler({
    route: '/user/favorites/toggle',
    options: {
      config: {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'X-Action': action,
        },
        body: JSON.stringify({ id }),
      },
    },
  });
