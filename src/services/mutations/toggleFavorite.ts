import { ExtendedFavorite, ActionTypes } from '@/types/products';
import { fetchHandler } from '@/utils/fetch';

export const toggleFavorite = async (
  params: ActionTypes
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
        body: JSON.stringify({ id: params.id }),
      },
    },
  });
