import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateQuantity } from '@/store/cart.update-quantity';
import { CartCache } from '@/types/types.cart';
import { useToast } from '@/hooks/useToast';

const UpdateCartItem = ({
  cartId,
  unitId,
  quantityData,
}: {
  cartId: string;
  unitId: string;
  quantityData: number;
}) => {
  const queryClient = useQueryClient();
  const { notify } = useToast();
  const [quantity, setQuantity] = useState<number | undefined>(quantityData);

  const { mutate: quantityMutation, isLoading } = useMutation({
    mutationFn: updateQuantity,
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
      console.log('~~~error from quantityMutation~~~', error);
    },
  });

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = Number(e.target.value);
    quantityMutation({ cartId, unitId, quantityPayload: newValue });
  };

  const options = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className='flex items-center'>
      <p className='pr-6'>Quantity: </p>
      <form>
        <select
          name='quantity'
          id='quantity'
          value={quantity}
          disabled={isLoading}
          onChange={(e) => handleQuantityChange(e)}
        >
          {options.map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default UpdateCartItem;
