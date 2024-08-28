import { FormEvent } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useCustomForm, useCustomMutation } from '@/shared/hooks/custom';
import { quantityResolver } from '@/shared/validators/resolvers';
import { QueryKeys } from '@/shared/types/Cache';
import {
  CartCache,
  CartItem,
  UpdateCartItemQuantityRequest,
} from '@/types/cart';
import { CheckIcon, XIcon } from '@/shared/utils/ui';
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
    const quantity = Number(methods.getValues().quantity);
    methods.handleSubmit(() => updateQuantity({ cartId, unitId, quantity }))();
  }

  return (
    <Container as='div'>
      <form>
        <Container as='div' flex='row'>
          <Container as='div' flex='row' className='items-start'>
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
