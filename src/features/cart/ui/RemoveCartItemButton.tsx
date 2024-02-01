import { useToast } from '@/hooks/useToast';
import { removeCartItem } from '@/store/cart.remove-item';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface RemoveCartItemProps {
  payload: RemoveItemPayloadData;
}

type RemoveItemPayloadData = {
  unitId: string;
  cartId: string;
};

const RemoveCartItemButton: React.FC<RemoveCartItemProps> = (props) => {
  const queryClient = useQueryClient();
  const { notify } = useToast();
  const {
    payload: { unitId, cartId },
  } = props;

  const { mutate: removeItem, isLoading } = useMutation({
    mutationFn: removeCartItem,
    // on success of mutation invalidate `cart` query key to trigger a refetch
    onSuccess: (data) => {
      /*
        TODO: utilize setQueryData() instead of invalidating queries
          - setQueryData() won't trigger a refetch of the getCart API, thus increasing performance
          - Send back the removed unitId and filter the cache
      */
      queryClient.invalidateQueries(['cart']);

      notify('Removed item from cart');
    },
    onError(error) {
      if (error instanceof Error) {
        notify(error.message, 'error');
      }
    },
  });

  return (
    <button disabled={isLoading} onClick={() => removeItem({ unitId, cartId })}>
      Remove
    </button>
  );
};

export default RemoveCartItemButton;
