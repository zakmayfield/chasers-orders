import { useState } from 'react';
import { useCustomForm } from './useCustomForm';
import { deliveryInstructionsResolver } from '@/shared/validators/resolvers';
import { defaultDeliveryInstructionsFormValues } from '@/utils/constants';
import { UseMutateFunction } from '@tanstack/react-query';
import { DeliveryInstructionsResponse } from '@/types/cart';
import { DeliveryInstructionsData } from '@/types/user';

export const useDeliveryInstructionsForm = ({
  mutation,
}: {
  mutation: UseMutateFunction<
    DeliveryInstructionsResponse,
    Error,
    DeliveryInstructionsData,
    unknown
  >;
}) => {
  const [isEdit, setIsEdit] = useState(false);

  const {
    methods: { register, handleSubmit, getValues, reset, formState },
  } = useCustomForm({
    defaultValues: defaultDeliveryInstructionsFormValues,
    resolver: deliveryInstructionsResolver,
  });

  const toggleEdit = () => setIsEdit(!isEdit);
  const submit = () => handleSubmit(() => mutation(getValues()))();
  const cancel = () => {
    toggleEdit();
    reset(defaultDeliveryInstructionsFormValues);
  };

  return {
    register,
    formState,
    isEdit,
    toggleEdit,
    submit,
    cancel,
  };
};
