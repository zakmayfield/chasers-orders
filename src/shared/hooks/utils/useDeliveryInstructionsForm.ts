import { useState } from 'react';
import { useCustomForm, useCustomMutation } from '@/shared/hooks/custom';
import { deliveryInstructionsResolver } from '@/shared/validators/resolvers';
import { UseMutateFunction, useQueryClient } from '@tanstack/react-query';
import { DeliveryInstructionsResponse } from '@/types/cart';
import { DeliveryInstructionsData } from '@/types/user';
import { updateDeliveryInstructions } from '@/services/mutations/updateDeliveryInstructions';
import { useToast } from './useToast';
import { QueryKeys } from '@/types/hooks';

export const useDeliveryInstructionsForm = ({
  defaultValues,
}: {
  defaultValues: string;
  mutation?: UseMutateFunction<
    DeliveryInstructionsResponse,
    Error,
    DeliveryInstructionsData,
    unknown
  >;
}) => {
  const queryClient = useQueryClient();
  const { notify } = useToast();
  const [isEdit, setIsEdit] = useState(false);

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

  const {
    methods,
    methods: { register, handleSubmit, getValues, reset, formState },
  } = useCustomForm({
    defaultValues: { deliveryInstructions: defaultValues },
    resolver: deliveryInstructionsResolver,
  });

  const toggleEdit = () => setIsEdit(!isEdit);
  // const submit = () => handleSubmit(() => mutation?.(getValues()))();
  const submit = () => handleSubmit(() => mutate(getValues()))();
  const cancel = () => {
    toggleEdit();
    reset({ deliveryInstructions: defaultValues });
  };

  return {
    methods,
    register,
    formState,
    isEdit,
    toggleEdit,
    submit,
    cancel,
  };
};
