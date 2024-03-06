import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateItemQuantity } from '@/services/mutations/cart.updateItemQuantity';
import { CartCache } from '@/types/types.cart';
import { useToast } from '@/hooks/general.hooks';

type UpdateCartItemQuantityProps = {
  payload: {
    cartId: string;
    unitId: string;
    quantityData: number;
  };
};

export const UpdateCartItemQuantity: React.FC<UpdateCartItemQuantityProps> = (
  props
) => {
  const {
    payload: { cartId, unitId, quantityData },
  } = props;

  const queryClient = useQueryClient();
  const { notify } = useToast();
  const [quantity, setQuantity] = useState<number | undefined>(quantityData);

  const { mutate: quantityMutation, isLoading } = useMutation({
    mutationFn: updateItemQuantity,
    onSuccess: (data) => {
      setQuantity(data.quantity);

      queryClient.setQueryData(['cart'], (oldData: CartCache | undefined) =>
        oldData
          ? {
              ...oldData,
              items: oldData.items.map((item) =>
                item.unitId === data.unitId ? data : item
              ),
            }
          : oldData
      );

      notify(`Updated quantity to ${data.quantity}`);
    },
    onError(error) {
      console.error('~~~error from quantityMutation~~~', error);
    },
  });

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = Number(e.target.value);
    quantityMutation({ cartId, unitId, quantityPayload: newValue });
  };

  const options = Array.from({ length: 50 }, (_, i) => i + 1);

  return (
    <div className='flex items-center space-x-2'>
      <p className='text-sm text-gray-500'>Quantity</p>
      <select
        name='quantity'
        id={unitId + '-quantity'}
        value={quantity}
        disabled={isLoading}
        onChange={handleQuantityChange}
        className='border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-16'
      >
        {options.map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
    </div>
  );
};
