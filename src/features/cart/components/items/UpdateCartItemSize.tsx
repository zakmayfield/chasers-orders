import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CartCache, CartSizesData } from '@/types/cart';
import { useToast } from '@/shared/hooks';
import { getCartSizes } from '@/services/queries/getCartSizes';
import { updateCartItemSize } from '@/services/mutations/updateCartItemSize';

type UpdateCartItemSizeProps = {
  payload: {
    cartId: string;
    unitId: string;
    sizeData: string;
  };
};

export const UpdateCartItemSize: React.FC<UpdateCartItemSizeProps> = (
  props
) => {
  const {
    payload: { cartId, unitId, sizeData },
  } = props;

  const queryClient = useQueryClient();
  const { notify } = useToast();
  const [size, setSize] = useState<string | undefined>(sizeData);

  const { data, isLoading: queryIsLoading } = useQuery<
    CartSizesData | undefined,
    Error
  >({
    queryKey: ['unit-sizes', unitId],
    queryFn: async () => await getCartSizes(unitId),
  });

  const { mutate: sizeMutation } = useMutation({
    mutationFn: updateCartItemSize,
    onSuccess: (data) => {
      setSize(data?.unit.size);

      queryClient.setQueryData(['cart'], (oldData: CartCache | undefined) =>
        oldData
          ? {
              ...oldData,
              items: oldData.items.map((item) =>
                item.unitId === unitId ? data : item
              ),
            }
          : oldData
      );

      queryClient.invalidateQueries(['unit-sizes', unitId]);

      notify(`Updated size to ${data?.unit.size}`);
    },
    onError(error) {
      console.error('~~~error from sizeMutation~~~', error);
    },
  });

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sizeInput = e.target.value;
    const selectedUnit = data?.product.units.find(
      (unit) => unit.size === sizeInput
    );
    sizeMutation({ cartId, unitId, selectedUnitId: selectedUnit?.id });
  };

  const options = data && data.product.units.map((unit) => unit.size);

  return (
    <div className='flex space-x-2'>
      <div className='flex items-start space-x-2'>
        <p className='text-sm text-gray-500'>Size</p>
        {queryIsLoading ? (
          <span className='pl-2'>Loading...</span>
        ) : (
          <select
            name='size'
            id={unitId + '-size'}
            value={size}
            onChange={handleSizeChange}
            className='border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-24'
          >
            {options &&
              options.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
          </select>
        )}
      </div>
    </div>
  );
};
