import { FC, useState } from 'react';
import { useToast } from '@/shared/hooks';
import {
  InstructionsNotFound,
  InstructionsHeader,
  InstructionsContent,
  InstructionsEdit,
} from './index';
import { useCustomMutation } from '@/shared/hooks/mutations';
import { updateDeliveryInstructions } from '@/services/mutations/updateDeliveryInstructions';
import { useQueryClient } from '@tanstack/react-query';
import { DeliveryInstructionsResponse } from '@/types/cart';
import { QueryKeys } from '@/types/hooks';
import { useCustomForm } from '@/shared/hooks/forms';
import { deliveryInstructionsResolver } from '@/shared/validators/resolvers';
import { defaultDeliveryInstructionsFormValues } from '@/utils/constants';

interface DeliveryInstructionsProps {
  content: string | null | undefined;
}

export const DeliveryInstructions: FC<DeliveryInstructionsProps> = ({
  content: deliveryInstructions,
}) => {
  const queryClient = useQueryClient();
  const { notify } = useToast();
  const [isEdit, setIsEdit] = useState(false);

  const {
    methods: { register, handleSubmit, getValues, reset, formState },
  } = useCustomForm({
    defaultValues: defaultDeliveryInstructionsFormValues,
    resolver: deliveryInstructionsResolver,
  });

  const { mutate: editDeliveryInstructions } = useCustomMutation({
    mutationFn: updateDeliveryInstructions,
    handleSuccess(data) {
      notify('Updated delivery instructions');

      queryClient.setQueryData(
        [QueryKeys.SHIPPING],
        (oldData: DeliveryInstructionsResponse | undefined) =>
          oldData
            ? {
                ...oldData,
                shippingAddress: data.shippingAddress,
              }
            : oldData
      );

      setIsEdit(false);

      resetFormState();
    },
  });

  function submitHandler() {
    const formValues = getValues();
    handleSubmit(() => editDeliveryInstructions(formValues))();
  }

  function onSave() {
    submitHandler();
  }

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  function onEdit() {
    toggleEdit();
  }

  const resetFormState = () => {
    reset({
      deliveryInstructions: deliveryInstructions ? deliveryInstructions : '',
    });
  };

  function onCancel() {
    toggleEdit();
    resetFormState();
  }

  return (
    <div className='mt-3 '>
      <InstructionsHeader
        isEdit={isEdit}
        formState={formState}
        onSave={onSave}
        onEdit={onEdit}
        onCancel={onCancel}
      />

      <div className='flex flex-col gap-1'>
        <div className='min-h-[6rem]'>
          {/* No instructions found */}
          {!deliveryInstructions && !isEdit && (
            <InstructionsNotFound toggleEdit={toggleEdit} />
          )}

          {/* To edit */}
          {((!deliveryInstructions && isEdit) ||
            (deliveryInstructions && isEdit)) && (
            <InstructionsEdit register={register} />
          )}

          {/* To read */}
          {deliveryInstructions && !isEdit && (
            <InstructionsContent deliveryInstructions={deliveryInstructions} />
          )}
        </div>

        {/* Errors */}
        <p
          className='min-h-[3rem] text-red-600'
          aria-hidden={!formState.errors.deliveryInstructions}
        >
          {formState.errors &&
            formState.errors.deliveryInstructions &&
            formState.errors.deliveryInstructions.message}
        </p>
      </div>
    </div>
  );
};
