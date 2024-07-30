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
    successCallback() {
      setIsEdit(false);
      notify('Updated delivery instructions');
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
