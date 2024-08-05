import { ExtendedFavorite } from '@/features/products/helpers.products';
import { fetchHandler } from '@/utils/fetch';

export const getFavorites = async (): Promise<ExtendedFavorite[]> =>
  await fetchHandler({
    route: '/user/favorites',
  });
