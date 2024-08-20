import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/shared/hooks/utils';
import { useCustomMutation } from '@/shared/hooks/custom';
import { useDeliveryInstructionsForm } from '@/shared/hooks/utils';
import { updateDeliveryInstructions } from '@/services/mutations/updateDeliveryInstructions';
import { FormButtons } from './index';
import { useGetShippingAddress } from '@/shared/hooks/data';
import { DeliveryInstructionsResponse } from '@/types/cart';
import { QueryKeys } from '@/types/hooks';
import { Heading } from '@/shared/components/ui';

export const DeliveryInstructions = () => {
  const queryClient = useQueryClient();
  const { notify } = useToast();
  const { data } = useGetShippingAddress();

  const { mutate } = useCustomMutation({
    mutationFn: updateDeliveryInstructions,
    handleSuccess(data) {
      notify('Updated delivery instructions');

      queryClient.setQueryData(
        [QueryKeys.SHIPPING],
        (oldData: DeliveryInstructionsResponse | undefined) =>
          oldData
            ? {
                ...oldData,
                shippingAddress: {
                  ...data.shippingAddress,
                  deliveryInstructions:
                    data.shippingAddress.deliveryInstructions,
                },
              }
            : oldData
      );

      cancel();
    },
    handleError(error) {
      notify(error.message, 'error');
    },
  });

  const { register, formState, isEdit, toggleEdit, submit, cancel } =
    useDeliveryInstructionsForm({ mutation: mutate });

  return (
    <div className='mt-3 '>
      <div className='mb-3 flex items-center justify-between'>
        <Heading as='h5' content='Delivery Instructions:' />

        <FormButtons
          isEdit={isEdit}
          formState={formState}
          toggleEdit={toggleEdit}
          submit={submit}
          cancel={cancel}
        />
      </div>

      {/* Content & Form */}
      <div className='flex flex-col gap-1'>
        <div className='min-h-[6rem]'>
          {/* To read */}
          {data?.shippingAddress.deliveryInstructions && !isEdit && (
            <div className='p-3 min-h-[5rem] bg-light-primary rounded-lg'>
              <p>{data?.shippingAddress.deliveryInstructions}</p>
            </div>
          )}

          {/* To edit */}
          {((!data?.shippingAddress.deliveryInstructions && isEdit) ||
            (data?.shippingAddress.deliveryInstructions && isEdit)) && (
            <form className='m-0 p-0 box-border'>
              <textarea
                {...register('deliveryInstructions')}
                className='border rounded-lg p-3 w-full bg-white min-h-[5rem]'
              />
            </form>
          )}

          {/* No instructions found */}
          {!data?.shippingAddress.deliveryInstructions && !isEdit && (
            <div className='p-3 min-h-[5rem] bg-light-primary rounded-lg'>
              <button
                onClick={toggleEdit}
                className='underline text-purple-800'
              >
                Add delivery instructions
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
