import { useEffect, useState } from 'react';
import { useCustomQuery } from './useCustomQuery';
import { ExtendedFavorite } from '@/types/products';
import { QueryKeys } from '@/types/hooks';
import { getFavorites } from '@/services/queries/getFavorites';

export const useFavorites = ({ productId }: { productId?: string }) => {
  const [isProductFavorited, setIsProductFavorited] = useState(false);
  const [favoriteId, setFavoriteId] = useState<string | undefined>(undefined);

  const { data: favorites, isLoading } = useCustomQuery<ExtendedFavorite[]>({
    queryKey: [QueryKeys.FAVORITES],
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
