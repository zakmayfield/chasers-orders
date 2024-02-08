import { getFavorites } from '@/store/favorite/fav.getFavorites';
import { Favorite } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

type UseFavoritesQuery = {
  (options?: Options): { favorites: Favorites | undefined };
};

type Options = {
  extended: boolean;
};
type Favorites = Favorite[];

export const useFavoritesQuery: UseFavoritesQuery = (options) => {
  const { data: favorites } = useQuery<Favorite[], Error>({
    queryKey: ['favorites'],
    queryFn: async () => await getFavorites(options?.extended),
    staleTime: Infinity,
  });

  return { favorites };
};
