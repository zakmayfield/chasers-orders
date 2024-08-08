import { useMutation } from '@tanstack/react-query';
import { UseCustomMutationParams } from '@/types/hooks';

export const useCustomMutation = <T, V>({
  mutationFn,
  handleSuccess,
  handleError,
}: UseCustomMutationParams<T, V>) => {
  const { mutate, isLoading, error, isError, isSuccess, data } = useMutation<
    T,
    Error,
    V,
    unknown
  >({
    mutationFn,
    onSuccess(data) {
      handleSuccess?.(data);
    },
    onError(error, variables) {
      handleError?.(error, variables);
    },
  });

  return { mutate, isLoading, isSuccess, error, isError, data };
};
