import { ExtendedFavorite, ToggleFavoriteAction } from '@/types/products';
import { useCustomMutation } from '@/shared/hooks/custom';
import { toggleFavorite } from '@/services/mutations/toggleFavorite';
import { useToast } from '@/shared/hooks/utils';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/types/hooks';

export const useToggleFavorite = ({
  customSuccessHandling,
  customErrorHandling,
}: {
  customSuccessHandling?(data: ExtendedFavorite): void;
  customErrorHandling?(error: Error): void;
}) => {
  const queryClient = useQueryClient();
  const { notify } = useToast();

  const { mutate } = useCustomMutation<ExtendedFavorite, ToggleFavoriteAction>({
    mutationFn: toggleFavorite,
    handleSuccess(data, variables) {
      notify(
        variables?.action === 'add'
          ? 'Added to favorites'
          : 'Removed from favorites'
      );

      queryClient.setQueryData(
        [QueryKeys.FAVORITES],
        (oldData: ExtendedFavorite[] | undefined) => {
          const newData = oldData && [data, ...oldData];
          const filteredData =
            oldData && oldData.filter((item) => item.id !== data.id);

          return oldData
            ? variables?.action === 'add'
              ? newData
              : filteredData
            : oldData;
        }
      );

      customSuccessHandling?.(data);
    },
    handleError(error) {
      notify(error.message, 'error');

      customErrorHandling?.(error);
    },
  });

  return { mutate };
};
