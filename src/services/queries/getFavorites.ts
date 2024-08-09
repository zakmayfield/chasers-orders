import { fetchHandler } from '@/utils/fetch';
import { ExtendedFavorite } from '@/types/products';

export const getFavorites = async (): Promise<ExtendedFavorite[]> =>
  await fetchHandler({
    route: '/user/favorites',
  });
