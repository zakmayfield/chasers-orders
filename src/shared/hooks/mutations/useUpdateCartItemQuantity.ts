import { updateCartItemQuantity } from '@/services/mutations/updateCartItemQuantity';
import { useToast } from '@/shared/hooks/utils';
import { useCustomMutation } from '@/shared/hooks/custom';
import { CartItem, UpdateCartItemQuantityRequest } from '@/types/cart';

export const useUpdateCartItemQuantity = ({
  customSuccessHandling,
  customErrorHandling,
}: {
  customSuccessHandling?(data: CartItem): void;
  customErrorHandling?(error: Error): void;
}) => {
  const { notify } = useToast();
  const { mutate, isSuccess } = useCustomMutation<
    CartItem,
    UpdateCartItemQuantityRequest
  >({
    mutationFn: updateCartItemQuantity,
    handleSuccess(data) {
      notify(`Updated quantity to (${data.quantity})`);
      customSuccessHandling?.(data);
    },
    handleError(error) {
      notify('Could not update quantity', 'error');
      customErrorHandling?.(error);
    },
  });

  return { mutate, isSuccess };
};
