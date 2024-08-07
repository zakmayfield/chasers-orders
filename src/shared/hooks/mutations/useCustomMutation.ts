import { useMutation } from '@tanstack/react-query';
import { UseCustomMutationParams } from '@/types/hooks';

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
    onError(error, variables) {
      handleError?.(error, variables);
    },
  });

  return { mutate };
};
