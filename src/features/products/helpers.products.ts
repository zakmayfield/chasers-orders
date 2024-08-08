import { useEffect, useState } from 'react';
import {
  UseMutateFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { getFavorites } from '@/services/queries/getFavorites';
import type { ExtendedFavorite } from '@/types/products';

interface UseSizeCache {
  ({ productId }: { productId: string }): {
    sizeQuery: () => {
      sizeCache: SizeCache;
    };
    sizeMutation: UseMutateFunction<void, unknown, string, unknown>;
  };
}

type SizeCache = string | undefined;

export const useSizeCache: UseSizeCache = ({ productId }) => {
  const queryClient = useQueryClient();

  function sizeQuery() {
    const sizeCache: string | undefined = queryClient.getQueryData([
      'size',
      productId,
    ]);

    return {
      sizeCache,
    };
  }

  const { mutate: sizeMutation } = useMutation({
    mutationFn: async (value: string) => {
      queryClient.setQueryData(['size', productId], value);
    },
  });

  return {
    sizeQuery,
    sizeMutation,
  };
};

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
