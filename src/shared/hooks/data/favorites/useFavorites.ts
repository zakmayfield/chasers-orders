import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/shared/hooks/utils';
import { useCustomMutation, useCustomQuery } from '@/shared/hooks/custom';
import { favoriteServices } from '@/shared/utils/services/favoriteServices';
import { TFavoriteWithProduct } from '@/shared/types/Favorite';
import { QueryKeys } from '@/shared/types/Cache';

export const useGetFavorites = () => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.FAVORITES_WITH_PRODUCT],
    queryFn: favoriteServices.getFavorites,
    staleTime: Infinity,
  });

  const product_ids_array = data?.map((favorite) => favorite.product_id) || [];

  const dataMap = {
    data: data || [],
    product_ids_array,
  };

  return { favorites: dataMap, isLoading, error };
};

export const useGetFavorite = ({ favorite_id }: { favorite_id: string }) => {
  const { data, isLoading, error } = useCustomQuery({
    queryKey: [QueryKeys.FAVORITE_WITH_PRODUCT],
    queryFn: async () => await favoriteServices.getFavorite({ favorite_id }),
    staleTime: Infinity,
  });

  return { data, isLoading, error };
};

export const useAddFavorite = () => {
  const queryClient = useQueryClient();

  const { mutate, data, isLoading, error } = useCustomMutation({
    mutationFn: favoriteServices.addFavorite,
    handleSuccess(data) {
      queryClient.setQueryData<TFavoriteWithProduct[]>(
        [QueryKeys.FAVORITES_WITH_PRODUCT],
        (oldData) => {
          return [data, ...oldData!];
        }
      );
    },
  });

  return { mutate, data, isLoading, error };
};

export const useDeleteFavorite = () => {
  const { notify } = useToast();
  const queryClient = useQueryClient();

  const { mutate, data, isLoading, error } = useCustomMutation({
    mutationFn: favoriteServices.deleteFavorite,
    handleSuccess(data) {
      queryClient.setQueryData<TFavoriteWithProduct[]>(
        [QueryKeys.FAVORITES_WITH_PRODUCT],
        (oldData) => {
          return oldData?.filter(
            (favorite) => favorite.favorite_id !== data.favorite_id
          );
        }
      );

      notify('Removed favorite');
    },
  });

  return { mutate, data, isLoading, error };
};

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();

  const { mutate, data, isLoading, error } = useCustomMutation({
    mutationFn: favoriteServices.toggleFavorite,
    handleSuccess(data, variables) {
      queryClient.setQueryData<TFavoriteWithProduct[]>(
        [QueryKeys.FAVORITES_WITH_PRODUCT],
        (oldData) => {
          const action = variables?.action;

          switch (action) {
            case 'add':
              return oldData && [data, ...oldData];
            case 'remove':
              return oldData?.filter(
                (favorite) => favorite.favorite_id !== data.favorite_id
              );
            default:
              return oldData;
          }
        }
      );
    },
  });

  return { mutate, data, isLoading, error };
};
