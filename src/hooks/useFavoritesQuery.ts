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
  favorites: ExtendedFavorite[] | undefined;
  isLoading: boolean;
};
export type FavoriteWithoutUserID = Omit<Favorite, 'userId'>;
export type ExtendedFavorite = FavoriteWithoutUserID & {
  juice: Product;
};

export const useFavoritesQuery: UseFavoritesQuery = () => {
  const { data: favorites, isLoading } = useQuery<ExtendedFavorite[], Error>({
    queryKey: ['favorites'],
    queryFn: getFavorites,
    staleTime: Infinity,
  });

  return { favorites, isLoading };
};
