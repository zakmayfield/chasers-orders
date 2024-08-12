import { ExtendedFavorite } from '@/types/products';
import { useEffect, useState } from 'react';

export const useIsFavorite = ({
  favorites,
  productId,
}: {
  favorites?: ExtendedFavorite[];
  productId: string;
}) => {
  const [isProductFavorited, setIsProductFavorited] = useState(false);
  const [favoriteId, setFavoriteId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const isFavorite =
      favorites &&
      favorites.find((favorite) => favorite.productId === productId);

    if (isFavorite) {
      setFavoriteId(isFavorite.id);
      setIsProductFavorited(!!isFavorite);
    }
  }, [favorites, productId]);

  return {
    favoriteId,
    isProductFavorited,
  };
};
