import { useQueryClient } from '@tanstack/react-query';
import { addToCart } from '@/services/mutations/addToCart';
import { useToast } from '@/shared/hooks/utils';
import { useCustomMutation } from '@/shared/hooks/custom';
import { CartCache, CartItem } from '@/types/cart';
import { QueryKeys } from '@/shared/types/Cache';

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
        (oldData: CartCache | undefined) => {
          const itemAlreadyInCart = !!oldData?.items.find(
            (item) => item.unitId === data.unitId
          );

          if (oldData && itemAlreadyInCart) {
            return {
              ...oldData,
              items: [
                data,
                ...oldData.items.filter((item) => item.unitId !== data.unitId),
              ],
            };
          } else if (oldData && !itemAlreadyInCart) {
            return {
              ...oldData,
              items: [data, ...oldData.items],
            };
          } else {
            return oldData;
          }
        }
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
