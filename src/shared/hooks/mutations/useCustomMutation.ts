import { UseCustomMutationParams } from '@/types/hooks';
import { useMutation } from '@tanstack/react-query';

export const useCustomMutation = <T, V>({
  mutationFn,
  handleSuccess,
  handleError,
}: UseCustomMutationParams<T, V>) => {
  const { mutate } = useMutation<T, Error, V, unknown>({
    mutationFn,
    onSuccess(data) {
      handleSuccess?.(data);
    },
    onError(error) {
      handleError?.(error);
    },
  });

  return { mutate };
};
