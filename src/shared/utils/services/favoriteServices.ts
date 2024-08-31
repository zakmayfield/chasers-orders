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

  addFavorite: async ({
    product_id,
  }: {
    product_id: string;
  }): Promise<TFavorite> =>
    await fetchHandler({
      route: favorites,
      options: {
        config: {
          method: 'POST',
          body: JSON.stringify({ product_id }),
        },
      },
    }),

  deleteFavorite: async ({
    favorite_id,
  }: {
    favorite_id: string;
  }): Promise<TFavorite> =>
    await fetchHandler({
      route: favorites,
      options: {
        config: {
          method: 'DELETE',
          body: JSON.stringify({ favorite_id }),
        },
      },
    }),

  toggleFavorite: async (props: {
    action: 'add' | 'remove';
    product_id?: string;
    favorite_id?: string;
  }): Promise<TFavorite> =>
    await fetchHandler({
      route: favorites + '/toggle',
      options: {
        config: {
          method: props.action === 'add' ? 'POST' : 'DELETE',
          body: JSON.stringify({ ...props }),
        },
      },
    }),
};
