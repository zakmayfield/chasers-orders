import { Actions, toggleFavorite } from '@/store/favorite/fav.toggleFavorite';
import { ActionTypes } from '@/store/favorite/fav.actions';
import { Favorite } from '@prisma/client';
import { UseMutateFunction, useMutation } from '@tanstack/react-query';

type UseToggleFavoriteProps = {
  (): {
    mutate: MutateType;
    data: Favorite | undefined;
    isSuccess: boolean;
    error: unknown;
  };
};

type MutateType = UseMutateFunction<
  | {
      id: string;
      createdAt: Date;
      juiceId: string;
      userId: string;
    }
  | undefined,
  unknown,
  {
    action: Actions;
    id: string;
  },
  unknown
>;

export const useToggleFavoriteMutation: UseToggleFavoriteProps = () => {
  const { mutate, isSuccess, data, error } = useMutation({
    mutationFn: ({ action, id }: ActionTypes) => toggleFavorite(action, id),
  });

  return { mutate, data, isSuccess, error };
};
