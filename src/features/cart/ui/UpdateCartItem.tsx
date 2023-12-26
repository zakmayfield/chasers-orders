import { updateCartItemQuantity } from '@/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

const UpdateCartItem = ({
  cartId,
  unitId,
  quantityData,
}: {
  cartId: string;
  unitId: string;
  quantityData: number;
}) => {
  const [qValue, setQValue] = useState(quantityData);
  const queryClient = useQueryClient();

  const { mutate: updateQuantity, isLoading } = useMutation({
    mutationFn: updateCartItemQuantity,
    // on success of mutation invalidate `cart` query key to trigger a refetch
    onSuccess: () => {
      queryClient.invalidateQueries(['cart']);
    },
  });

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = Number(e.target.value);
    setQValue(newValue);

    updateQuantity({ cartId, unitId, quantityPayload: newValue });
  };

  const options = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className='flex items-center'>
      <p className='pr-6'>Quantity: </p>
      <form>
        <select
          name='quantity'
          id='quantity'
          value={qValue}
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
