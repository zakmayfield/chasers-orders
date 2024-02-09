import { toggleFavorite } from '@/store/favorite/fav.toggleFavorite';
import { ActionTypes } from '@/store/favorite/fav.actions';
import { UseMutateFunction, useMutation } from '@tanstack/react-query';
import { ExtendedFavorite } from './useFavoritesQuery';

type UseToggleFavorite = {
  ({ onSuccess, onError }: ToggleFavoriteProps): {
    mutate: MutateType;
  };
};

type ToggleFavoriteProps = {
  onSuccess?: (data: ExtendedFavorite) => void;
  onError?: (error: unknown) => void;
};

type MutateType = UseMutateFunction<
  ExtendedFavorite,
  unknown,
  ActionTypes,
  unknown
>;

export const useToggleFavoriteMutation: UseToggleFavorite = ({
  onSuccess,
  onError,
}) => {
  const { mutate } = useMutation({
    mutationFn: ({ action, id }: ActionTypes) => toggleFavorite(action, id),
    onSuccess(data) {
      onSuccess?.(data);
    },
    onError(error) {
      onError?.(error);
    },
  });

  return { mutate };
};
