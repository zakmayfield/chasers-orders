import { useQueryClient } from '@tanstack/react-query';
import { addToCart } from '@/services/mutations/addToCart';
import { useToast } from '@/shared/hooks';
import { useCustomMutation } from '@/shared/hooks/mutations';
import { CartCache, CartItem } from '@/types/cart';
import { QueryKeys } from '@/types/hooks';

export const useAddToCart = ({
  customSuccessHandling,
  customErrorHandling,
}: {
  customSuccessHandling?(data: CartItem): void;
  customErrorHandling?(error: Error, variables?: string): void;
}) => {
  const queryClient = useQueryClient();
  const { notify } = useToast();

  const { mutate } = useCustomMutation<CartItem, string>({
    mutationFn: addToCart,
    handleSuccess(data) {
      notify('Item added to cart');

      queryClient.setQueryData(
        [QueryKeys.CART],
        (oldData: CartCache | undefined) =>
          oldData
            ? {
                ...oldData,
                items: [data, ...oldData.items],
              }
            : oldData
      );

      customSuccessHandling?.(data);
    },
    handleError(error, variables) {
      notify(error.message, 'error');
      customErrorHandling?.(error, variables);
    },
  });

  return { mutate };
};
