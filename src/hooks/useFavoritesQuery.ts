import { getFavorites } from '@/store/favorite/fav.getFavorites';
import { Favorite, Product } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

type UseFavoritesQuery = {
  (options?: Options): UseFavoritesQueryReturn;
};

type Options = {
  extended: boolean;
};

type UseFavoritesQueryReturn = {
  favorites: FavoriteWithoutUserID[] | ExtendedFavorite[] | undefined;
  isLoading: boolean;
  isExtended: (data: unknown) => data is ExtendedFavorite[];
};
export type FavoriteWithoutUserID = Omit<Favorite, 'userId'>;
export type ExtendedFavorite = FavoriteWithoutUserID & {
  juice: Product;
};

export const useFavoritesQuery: UseFavoritesQuery = (options) => {
  const { data: favorites, isLoading } = useQuery<
    FavoriteWithoutUserID[] | ExtendedFavorite[],
    Error
  >({
    queryKey: ['favorites', `${options?.extended && 'extended'}`],
    queryFn: async () => await getFavorites(options?.extended),
    staleTime: Infinity,
  });

  function isExtended(data: unknown): data is ExtendedFavorite[] {
    function isItemExtended(data: unknown): data is ExtendedFavorite {
      return !!data && typeof data === 'object' && 'juice' in data;
    }

    return (
      !!data &&
      Array.isArray(data) &&
      data.every((item) => isItemExtended(item))
    );
  }

  return { favorites, isLoading, isExtended };
};
