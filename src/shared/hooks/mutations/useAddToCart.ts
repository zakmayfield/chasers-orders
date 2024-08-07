import { useQueryClient } from '@tanstack/react-query';
import { addToCart } from '@/services/mutations/addToCart';
import { useToast } from '@/shared/hooks';
import { useCustomMutation } from '@/shared/hooks/mutations';
import { CartCache } from '@/types/cart';
import { QueryKeys } from '@/types/hooks';

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  const { notify } = useToast();

  const { mutate } = useCustomMutation({
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
    },
    handleError(error) {
      notify(error.message, 'error');
    },
  });

  return { mutate };
};
