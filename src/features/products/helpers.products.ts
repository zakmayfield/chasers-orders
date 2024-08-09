import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getFavorites } from '@/services/queries/getFavorites';
import type { ExtendedFavorite } from '@/types/products';

interface UseFavorites {
  ({ productId }: { productId?: string }): {
    query: {
      favorites: ExtendedFavorite[] | undefined;
      isLoading: boolean;
    };
    favorite: {
      isProductFavorited: boolean;
      favoriteId: string | undefined;
    };
  };
}
// TODO: rework this hook
export const useFavorites: UseFavorites = ({ productId }) => {
  const [isProductFavorited, setIsProductFavorited] = useState(false);
  const [favoriteId, setFavoriteId] = useState<string | undefined>(undefined);

  const { data: favorites, isLoading } = useQuery<ExtendedFavorite[], Error>({
    queryKey: ['favorites'],
    queryFn: getFavorites,
    staleTime: Infinity,
  });

  useEffect(() => {
    const favorite =
      favorites && favorites.find((item) => item.juiceId === productId);

    if (favorite) {
      setFavoriteId(favorite.id);
      setIsProductFavorited(!!favorite);
    }
  }, [favorites, productId]);

  return {
    query: {
      favorites,
      isLoading,
    },
    favorite: {
      isProductFavorited,
      favoriteId: isProductFavorited ? favoriteId : undefined,
    },
  };
};
