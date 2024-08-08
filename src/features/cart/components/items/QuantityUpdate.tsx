import { FormEvent, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { PiCheckCircleDuotone, PiXCircleDuotone } from 'react-icons/pi';
import { CartCache, UpdateCartItemQuantityRequest } from '@/types/cart';
import { useQuantityUpdateForm } from '@/features/cart/helpers.cart';
import { QuantityData } from '@/shared/validators/cart/QuantityValidator';
import { useUpdateCartItemQuantity } from '@/shared/hooks/mutations';
import { QueryKeys } from '@/types/hooks';

export const QuantityUpdate: React.FC<UpdateCartItemQuantityRequest> = ({
  cartId,
  unitId,
  quantity,
}) => {
  const queryClient = useQueryClient();

  const { mutate, isSuccess } = useUpdateCartItemQuantity({
    customSuccessHandling(data) {
      queryClient.setQueryData(
        [QueryKeys.CART],
        (oldData: CartCache | undefined) =>
          oldData
            ? {
                ...oldData,
                items: oldData.items.map((item) =>
                  item.unitId === data.unitId ? data : item
                ),
              }
            : oldData
      );
    },
  });

  function submitHandler(data: QuantityData) {
    const payload = { cartId, unitId, quantity: data.quantity };
    mutate(payload);
  }

  return (
    <div className='flex items-center space-x-2'>
      <QuantityForm
        currentQuantity={quantity}
        isSuccess={isSuccess}
        submitHandler={submitHandler}
      />
    </div>
  );
};

function QuantityForm({
  submitHandler,
  currentQuantity,
  isSuccess,
}: {
  currentQuantity: number;
  isSuccess: boolean;
  submitHandler(data: QuantityData): void;
}) {
  const {
    handleSubmit,
    register,
    getValues,
    isDirty,
    handleReset,
    handleCancel,
  } = useQuantityUpdateForm({
    currentQuantity,
  });

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const formValues = getValues();
    const quantity = formValues.quantity;
    handleSubmit(() => submitHandler({ quantity }))();
  };

  useEffect(() => {
    handleReset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <form className='flex gap-3'>
      <div className='flex flex-col'>
        <div className='flex items-center'>
          <label htmlFor='quantity' className='mr-2 text-sm text-gray-500'>
            Quantity
          </label>
          <input
            type='number'
            id='quantity'
            min={1}
            {...register('quantity', { valueAsNumber: true })}
            className='border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-16'
          />
        </div>
      </div>

      {isDirty && (
        <div className='flex items centergap-3'>
          <button type='submit' onClick={submit} className=''>
            <PiCheckCircleDuotone className='text-light-green-400 text-2xl' />
          </button>
          <button type='submit' onClick={handleCancel}>
            <PiXCircleDuotone className='text-red-600 text-2xl' />
          </button>
        </div>
      )}
    </form>
  );
}
