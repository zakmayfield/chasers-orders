import { FC, useState } from 'react';
import { useToast } from '@/hooks/general.hooks';
import {
  useInstructionEditForm,
  useEditInstructionsMutation,
} from '@/features/cart/helpers.cart';
import {
  InstructionsNotFound,
  InstructionsHeader,
  InstructionsContent,
  InstructionsEdit,
} from './index';

interface DeliveryInstructionsProps {
  content: string | null | undefined;
}

export const DeliveryInstructions: FC<DeliveryInstructionsProps> = ({
  content: deliveryInstructions,
}) => {
  const { notify } = useToast();
  const [isEdit, setIsEdit] = useState(false);

  const { register, handleSubmit, getValues, reset, formState } =
    useInstructionEditForm({
      deliveryInstructions: deliveryInstructions,
    });

  const { editDeliveryInstructions } = useEditInstructionsMutation({
    successCallback,
  });

  function successCallback() {
    setIsEdit(false);
    notify('Updated delivery instructions');
  }

  function submitHandler() {
    const formValues = getValues();
    handleSubmit(() => editDeliveryInstructions(formValues))();
  }

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  const resetFormState = () => {
    reset({
      deliveryInstructions: deliveryInstructions ? deliveryInstructions : '',
    });
  };

  return (
    <div className='mt-3'>
      <InstructionsHeader
        isEdit={isEdit}
        toggleEdit={toggleEdit}
        submitHandler={submitHandler}
        formState={formState}
        resetFormState={resetFormState}
      />

      {!deliveryInstructions ? (
        <InstructionsNotFound toggleEdit={toggleEdit} />
      ) : isEdit ? (
        <InstructionsEdit register={register} errors={formState.errors} />
      ) : (
        <InstructionsContent deliveryInstructions={deliveryInstructions} />
      )}

      <p className='h-9 text-red-600'>
        {formState.errors &&
          formState.errors.deliveryInstructions &&
          formState.errors.deliveryInstructions.message}
      </p>
    </div>
  );
};
