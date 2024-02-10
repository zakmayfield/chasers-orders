import { useToast } from '@/hooks/general';
import { removeItem } from '@/services/mutations/cart.removeItem';
import { CartCache, UnitsOnCartCacheType } from '@/types/types.cart';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface RemoveCartItemProps {
  payload: RemoveItemPayloadData;
}

type RemoveItemPayloadData = {
  cartId: string;
  unitId: string;
};

const RemoveCartItemButton: React.FC<RemoveCartItemProps> = (props) => {
  const queryClient = useQueryClient();
  const { notify } = useToast();
  const {
    payload: { unitId, cartId },
  } = props;

  const { mutate: removeCartItem, isLoading } = useMutation({
    mutationFn: removeItem,
    onSuccess: (data) => {
      const { unitId } = data;

      queryClient.setQueryData(['cart'], (oldData: CartCache | undefined) => {
        const items = oldData?.items.filter(
          (item) => item.unitId !== unitId
        ) as UnitsOnCartCacheType[];

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
    >
      Remove
    </button>
  );
};

export default RemoveCartItemButton;
