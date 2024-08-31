import { useCustomMutation, useCustomQuery } from '@/shared/hooks/custom';
import { favoriteServices } from '@/shared/utils/services/favoriteServices';
import { QueryKeys } from '@/shared/types/Cache';
import { TFavorite, TFavoriteWithProduct } from '@/shared/types/Favorite';

export const useGetFavorites = ({ hasProduct }: { hasProduct?: boolean }) => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [
      hasProduct ? QueryKeys.FAVORITES_WITH_PRODUCT : QueryKeys.FAVORITES,
    ],
    queryFn: async () => await favoriteServices.getFavorites({ hasProduct }),
  });

  const dataMap = {
    withProduct: (hasProduct && data && (data as TFavoriteWithProduct[])) || [],
    withoutProduct: (!hasProduct && data && (data as TFavorite[])) || [],
  };

  return { data: dataMap, isLoading, error };
};

export const useGetFavorite = ({
  favorite_id,
  hasProduct,
}: {
  favorite_id: string;
  hasProduct?: boolean;
}) => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [
      hasProduct ? QueryKeys.FAVORITE_WITH_PRODUCT : QueryKeys.FAVORITE,
    ],
    queryFn: async () =>
      await favoriteServices.getFavorite({ favorite_id, hasProduct }),
  });

  const dataMap = {
    withProduct: (hasProduct && data && (data as TFavoriteWithProduct)) || [],
    withoutProduct: (!hasProduct && data && (data as TFavorite)) || [],
  };

  return { data: dataMap, isLoading, error };
};

export const useAddFavorite = () => {
  const { mutate, data, isLoading, error } = useCustomMutation({
    mutationFn: favoriteServices.addFavorite,
  });

  return { mutate, data, isLoading, error };
};

export const useDeleteFavorite = () => {
  const { mutate, data, isLoading, error } = useCustomMutation({
    mutationFn: favoriteServices.deleteFavorite,
  });

  return { mutate, data, isLoading, error };
};

export const useToggleFavorite = () => {
  const { mutate, data, isLoading, error } = useCustomMutation({
    mutationFn: favoriteServices.toggleFavorite,
  });

  return { mutate, data, isLoading, error };
};
