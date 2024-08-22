import { FormEvent, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useCustomForm, useCustomMutation } from '@/shared/hooks/custom';
import { quantityResolver } from '@/shared/validators/resolvers';
import { defaultQuantityFormValues } from '@/utils/constants';
import { QueryKeys } from '@/types/hooks';
import {
  CartCache,
  CartItem,
  QuantityData,
  UpdateCartItemQuantityRequest,
} from '@/types/cart';
import { CheckIcon, XIcon } from '@/utils/icons';
import { Container } from '@/shared/components/ui';
import { updateCartItemQuantity } from '@/services/mutations/updateCartItemQuantity';
import { useToast } from '@/shared/hooks/utils';

export const SelectQuantity: React.FC<UpdateCartItemQuantityRequest> = ({
  cartId,
  unitId,
  quantity,
}) => {
  const queryClient = useQueryClient();
  const { notify } = useToast();

  const { methods } = useCustomForm({
    defaultValues: { quantity: quantity.toString() },
    resolver: quantityResolver,
  });

  const { mutate: updateQuantity } = useCustomMutation<
    CartItem,
    UpdateCartItemQuantityRequest
  >({
    mutationFn: updateCartItemQuantity,
    handleSuccess(data) {
      notify(`Updated quantity to (${data.quantity})`);

      queryClient.setQueryData(
        [QueryKeys.CART],
        (oldData: CartCache | undefined) =>
          oldData
            ? {
                ...oldData,
                items: oldData.items.map((item) =>
                  item.unitId === unitId ? data : item
                ),
              }
            : oldData
      );

      methods.reset({ quantity: data.quantity.toString() });
    },
    handleError() {
      notify('Could not update quantity', 'error');
    },
  });

  function submitHandler(event: FormEvent) {
    event.preventDefault();
    const formValues = methods.getValues();
    const quantity = Number(formValues.quantity);
    methods.handleSubmit(() => updateQuantity({ cartId, unitId, quantity }))();
  }

  return (
    <Container as='div'>
      <form>
        <Container as='div' flex='row'>
          <Container as='div' flex='row'>
            <label htmlFor='quantity' className='text-sm text-gray-500'>
              Qty
            </label>
            <input
              type='number'
              id='quantity'
              min={1}
              {...methods.register('quantity', { valueAsNumber: true })}
              className='w-24 border rounded-md px-2 py-1'
            />
          </Container>

          {methods.formState.isDirty && (
            <Container as='div' flex='row' className='gap-1'>
              <button type='submit' onClick={submitHandler} className=''>
                <CheckIcon className='text-light-green-400 text-2xl' />
              </button>
              <button
                type='submit'
                onClick={() =>
                  methods.reset({
                    quantity: quantity.toString(),
                  })
                }
              >
                <XIcon className='text-red-600 text-2xl' />
              </button>
            </Container>
          )}
        </Container>
      </form>
    </Container>
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
    methods: {
      register,
      handleSubmit,
      getValues,
      reset,
      formState: { isDirty },
    },
  } = useCustomForm({
    defaultValues: defaultQuantityFormValues,
    resolver: quantityResolver,
  });

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const formValues = getValues();
    const quantity = Number(formValues.quantity);
    handleSubmit(() => submitHandler({ quantity }))();
  };

  useEffect(() => {
    reset({
      quantity: currentQuantity.toString(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <form className='flex gap-3'>
      <div className='flex flex-col'>
        <div className='flex items-start space-x-2'>
          <label htmlFor='quantity' className='text-sm text-gray-500'>
            Qty
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
            <CheckIcon className='text-light-green-400 text-2xl' />
          </button>
          <button
            type='submit'
            onClick={() =>
              reset({
                quantity: currentQuantity.toString(),
              })
            }
          >
            <XIcon className='text-red-600 text-2xl' />
          </button>
        </div>
      )}
    </form>
  );
}
