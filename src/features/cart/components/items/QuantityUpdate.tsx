import { FormEvent, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { PiCheckCircleDuotone, PiXCircleDuotone } from 'react-icons/pi';
import {
  CartCache,
  CartItem,
  UpdateQuantity,
  QuantityData,
} from '@/features/cart/types';
import { useToast } from '@/hooks/general.hooks';
import {
  useQuantityUpdateForm,
  useUpdateQuantity,
} from '@/features/cart/helpers.cart';

type UpdateCartItemQuantityProps = UpdateQuantity;

export const QuantityUpdate: React.FC<UpdateCartItemQuantityProps> = ({
  cartId,
  unitId,
  quantity,
}) => {
  const queryClient = useQueryClient();
  const { notify } = useToast();

  const { updateQuantity, isSuccess } = useUpdateQuantity({
    onSuccessCallback(data: CartItem) {
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
    onErrorCallback() {
      notify('Could not update quantity', 'error');
    },
  });

  function submitHandler(data: QuantityData) {
    const payload = { cartId, unitId, quantity: data.quantity };
    updateQuantity(payload);
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
            <PiCheckCircleDuotone className='text-light-greenish text-2xl' />
          </button>
          <button type='submit' onClick={handleCancel}>
            <PiXCircleDuotone className='text-red-600 text-2xl' />
          </button>
        </div>
      )}
    </form>
  );
}
