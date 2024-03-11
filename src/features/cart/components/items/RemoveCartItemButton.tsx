import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LuTrash2 } from 'react-icons/lu';
import { removeItem } from '@/features/cart/services.cart';
import { useToast } from '@/hooks/general.hooks';
import { CartCache2, CartItem } from '@/features/cart/types';

export interface RemoveCartItemProps {
  payload: RemoveItemPayloadData;
}

type RemoveItemPayloadData = {
  cartId: string;
  unitId: string;
};

export const RemoveCartItemButton: React.FC<RemoveCartItemProps> = (props) => {
  const queryClient = useQueryClient();
  const { notify } = useToast();
  const {
    payload: { unitId, cartId },
  } = props;

  const { mutate: removeCartItem, isLoading } = useMutation({
    mutationFn: removeItem,
    onSuccess: (data) => {
      const { unitId } = data;

      queryClient.setQueryData(['cart'], (oldData: CartCache2 | undefined) => {
        const items = oldData?.items.filter(
          (item) => item.unitId !== unitId
        ) as CartItem[];

        return oldData
          ? {
              ...oldData,
              items,
            }
          : oldData;
      });

      notify('Removed item from cart');
    },
    onError(error) {
      if (error instanceof Error) {
        notify(error.message, 'error');
      }
    },
  });

  return (
    <button
      disabled={isLoading}
      onClick={() => removeCartItem({ unitId, cartId })}
      className=' text-gray-700 text-xl hover:text-red-600 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:text-red-600'
    >
      <LuTrash2 />
    </button>
  );
};
