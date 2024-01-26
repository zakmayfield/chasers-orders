import { IUpdatedCart, updateCartItemQuantity } from '@/store/cart/cartStore';
import { UnitsOnCart } from '@prisma/client';
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
  const queryClient = useQueryClient();
  const [quantity, setQuantity] = useState<number | undefined>(
    () => quantityData
  );

  const { mutate: updateQuantity, isLoading } = useMutation({
    mutationFn: updateCartItemQuantity,
    onSuccess: (data) => {
      const unit: UnitsOnCart | undefined = data.items.find(
        (item) => item.unitId === unitId
      );

      setQuantity(unit?.quantity);

      // .setQueryData() || target individual unit // indexing issue on update
      queryClient.setQueryData(['cart'], (oldData: IUpdatedCart | undefined) =>
        oldData && unit
          ? {
              ...oldData,
              items: oldData.items.map((item) =>
                item.unitId === unitId ? unit : item
              ),
            }
          : oldData
      );
    },
    onError(error) {
      console.log('~~~error from updateQuantity~~~', error);
    },
  });

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = Number(e.target.value);
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
