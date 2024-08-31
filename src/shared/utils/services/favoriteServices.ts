import { fetchHandler } from '@/shared/utils/api/fetch';
import { Endpoints } from '@/shared/types/API';
import { TFavorite, TFavoriteWithProduct } from '@/shared/types/Favorite';

const favorite = Endpoints.favorite;
const favorites = Endpoints.favorites;

export const favoriteServices = {
  getFavorites: async ({
    hasProduct,
  }: {
    hasProduct?: boolean;
  }): Promise<TFavorite[] | TFavoriteWithProduct[]> =>
    await fetchHandler({
      route: favorites + `${hasProduct ? '?product=true' : ''}`,
    }),

  getFavorite: async ({
    favorite_id,
    hasProduct,
  }: {
    favorite_id: string;
    hasProduct?: boolean;
  }): Promise<TFavorite | TFavoriteWithProduct> =>
    await fetchHandler({
      route:
        favorite + `/${favorite_id}` + `${hasProduct ? '?product=true' : ''}`,
    }),
};
