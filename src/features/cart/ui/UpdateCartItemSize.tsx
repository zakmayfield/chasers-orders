import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CartCache } from '@/types/types.cart';
import { useToast } from '@/hooks/general';
import {
  SizesData,
  getItemUnitSizes,
} from '@/store/cart/cart.getItemUnitSizes';
import { updateItemSize } from '@/store/cart/cart.updateItemSize';

type UpdateCartItemSizeProps = {
  payload: {
    cartId: string;
    unitId: string;
    sizeData: string;
  };
};

const UpdateCartItemSize: React.FC<UpdateCartItemSizeProps> = (props) => {
  const {
    payload: { cartId, unitId, sizeData },
  } = props;

  const queryClient = useQueryClient();
  const { notify } = useToast();
  const [size, setSize] = useState<string | undefined>(sizeData);

  const {
    data,
    isLoading: queryIsLoading,
    error,
  } = useQuery<SizesData | undefined, Error>({
    queryKey: ['unit-sizes', unitId],
    queryFn: async () => await getItemUnitSizes(unitId),
  });

  const { mutate: sizeMutation, isLoading: mutationIsLoading } = useMutation({
    mutationFn: updateItemSize,
    onSuccess: (data) => {
      console.log(data);

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
      console.log('~~~error from sizeMutation~~~', error);
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

  const selectWhenLoading = queryIsLoading ? (
    <div>Loading...</div>
  ) : (
    <select name='size' id='size' value={size} onChange={handleSizeChange}>
      {options &&
        options.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
    </select>
  );

  return (
    <div className='flex items-center'>
      <p className='pr-6'>Size: </p>
      <form>{selectWhenLoading}</form>
    </div>
  );
};

export default UpdateCartItemSize;
