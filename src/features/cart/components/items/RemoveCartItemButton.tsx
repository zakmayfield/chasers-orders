import { useQueryClient } from '@tanstack/react-query';
import { LuTrash2 } from 'react-icons/lu';
import { useToast } from '@/shared/hooks';
import { useCustomMutation } from '@/shared/hooks/mutations';
import { removeFromCart } from '@/services/mutations/removeFromCart';
import {
  CartCache,
  CartItem,
  RemoveCartItemRequest,
  RemoveCartItemResponse,
} from '@/types/cart';
import { QueryKeys } from '@/types/hooks';

export const RemoveCartItemButton: React.FC<RemoveCartItemRequest> = (
  props
) => {
  const queryClient = useQueryClient();
  const { notify } = useToast();

  const { mutate, isLoading } = useCustomMutation<
    RemoveCartItemResponse,
    RemoveCartItemRequest
  >({
    mutationFn: removeFromCart,
    handleSuccess(data) {
      queryClient.setQueryData(
        [QueryKeys.CART],
        (oldData: CartCache | undefined) => {
          const items = oldData?.items.filter(
            (item) => item.unitId !== data.unitId
          ) as CartItem[];

          return oldData
            ? {
                ...oldData,
                items,
              }
            : oldData;
        }
      );

      notify('Removed item from cart');
    },
    handleError(error) {
      notify(error.message, 'error');
    },
  });

  return (
    <button
      disabled={isLoading}
      onClick={() => mutate(props)}
      className=' text-gray-700 text-xl hover:text-red-600 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:text-red-600'
    >
      <LuTrash2 />
    </button>
  );
};
