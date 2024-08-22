import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/shared/hooks/utils';
import { getUnitSizes } from '@/services/queries/getUnitSizes';
import { updateCartItemSize } from '@/services/mutations/updateCartItemSize';
import { useCustomQuery } from '@/shared/hooks/custom';
import { useCustomMutation } from '@/shared/hooks/custom';
import { Container } from '@/shared/components/ui';
import { QueryKeys } from '@/types/hooks';
import {
  CartCache,
  CartItem,
  CartSizesData,
  UpdateCartItemSizeRequest,
} from '@/types/cart';

type SelectSizeProps = {
  cartId: string;
  unitId: string;
  currentSize: string;
};

export const SelectSize: React.FC<SelectSizeProps> = (props) => {
  const queryClient = useQueryClient();
  const { notify } = useToast();
  const [size, setSize] = useState<string | undefined>(props.currentSize);

  const { data, isLoading } = useCustomQuery<CartSizesData>({
    queryKey: [QueryKeys.SIZE, props.unitId],
    queryFn: () => getUnitSizes(props.unitId),
  });

  const { mutate: updateSize } = useCustomMutation<
    CartItem,
    UpdateCartItemSizeRequest
  >({
    mutationFn: updateCartItemSize,
    handleSuccess(data) {
      notify(`Updated size to ${data.unit.size}`);

      setSize(data.unit.size);

      queryClient.setQueryData(
        [QueryKeys.CART],
        (oldData: CartCache | undefined) =>
          oldData
            ? {
                ...oldData,
                items: oldData.items.map((item) =>
                  item.unitId === props.unitId ? data : item
                ),
              }
            : oldData
      );

      queryClient.invalidateQueries([QueryKeys.SIZE, props.unitId]);
    },
    handleError() {
      notify('Could not update size', 'error');
    },
  });

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sizeInput = e.target.value;
    const selectedUnitId = data?.product.units.find(
      (unit) => unit.size === sizeInput
    )?.id;

    updateSize({
      cartId: props.cartId,
      unitId: props.unitId,
      selectedUnitId,
    });
  };

  const options = data && data.product.units.map((unit) => unit.size);

  return (
    <Container as='div'>
      <Container as='div'>
        <select
          name='size'
          value={props.currentSize}
          onChange={handleSizeChange}
          disabled={isLoading}
          className='w-24 border rounded-md px-2 py-1'
        >
          {options?.map((size) => <option key={size}>{size}</option>)}
        </select>
      </Container>
    </Container>
    // <div className='flex space-x-2'>
    //   <div className='flex items-start space-x-2'>
    //     <p className='text-sm text-gray-500'>Size</p>
    //     {isLoading ? (
    //       <span className='pl-2'>Loading...</span>
    //     ) : (
    //       <select
    //         name='size'
    //         id={props.unitId + '-size'}
    //         value={size}
    //         onChange={handleSizeChange}
    //         className='border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-24'
    //       >
    //         {options &&
    //           options.map((size) => (
    //             <option key={size} value={size}>
    //               {size}
    //             </option>
    //           ))}
    //       </select>
    //     )}
    //   </div>
    // </div>
  );
};
