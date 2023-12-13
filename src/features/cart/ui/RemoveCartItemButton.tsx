import { removeCartItem } from '@/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const RemoveCartItemButton = ({
  unitId,
  cartId,
}: {
  unitId: string;
  cartId: string;
}) => {
  const queryClient = useQueryClient();

  const { mutate: removeItem, isLoading } = useMutation({
    mutationFn: removeCartItem,
    // on success of mutation invalidate `cart` query key to trigger a refetch
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
    },
  });

  return (
    <button disabled={isLoading} onClick={() => removeItem({ unitId, cartId })}>
      Remove
    </button>
  );
};

export default RemoveCartItemButton;
