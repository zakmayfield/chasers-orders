import { FC, useState } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { DeliveryInstructionsData } from '@/features/cart/types';
import {
  useInstructionEditForm,
  useEditInstructionsMutation,
} from '@/features/cart/helpers.cart';
import { useToast } from '@/hooks/general.hooks';

interface DeliveryInstructionsProps {
  content: string | null | undefined;
}

export const DeliveryInstructions: FC<DeliveryInstructionsProps> = ({
  content: deliveryInstructions,
}) => {
  const { notify } = useToast();
  const [isEdit, setIsEdit] = useState(false);

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  const { register, handleSubmit, getValues, errors } = useInstructionEditForm({
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

  return (
    <div className='mt-3'>
      <DeliveryHeader
        isEdit={isEdit}
        toggleEdit={toggleEdit}
        submitHandler={submitHandler}
      />

      {!deliveryInstructions ? (
        <NoInstructions toggleEdit={toggleEdit} />
      ) : isEdit ? (
        <InlineInstructionsEdit register={register} errors={errors} />
      ) : (
        <Instructions deliveryInstructions={deliveryInstructions} />
      )}
    </div>
  );
};

function DeliveryHeader({
  isEdit,
  toggleEdit,
  submitHandler,
}: {
  isEdit: boolean;
  toggleEdit: () => void;
  submitHandler(): void;
}) {
  return (
    <div className='mb-3 flex items-center justify-between'>
      <h5 className='font-light text-lg'>Delivery Instructions:</h5>

      {isEdit ? (
        <button onClick={submitHandler}>save</button>
      ) : (
        <button
          onClick={toggleEdit}
          className=' border rounded-md hover:ring-2 px-2'
        >
          edit
        </button>
      )}
    </div>
  );
}

function Instructions({
  deliveryInstructions,
}: {
  deliveryInstructions: string;
}) {
  return <p className='py-3 min-h-[6rem]'>{deliveryInstructions}</p>;
}

function InlineInstructionsEdit({
  register,
  errors,
}: {
  errors: FieldErrors<DeliveryInstructionsData>;
  register: UseFormRegister<DeliveryInstructionsData>;
}) {
  return (
    <form>
      <textarea
        {...register('deliveryInstructions')}
        className='border-l border-b rounded-bl p-3 w-full bg-white min-h-[6rem]'
      />
      <p className='h-9 text-red-600'>
        {errors &&
          errors.deliveryInstructions &&
          errors.deliveryInstructions.message}
      </p>
    </form>
  );
}

function NoInstructions({ toggleEdit }: { toggleEdit: () => void }) {
  return (
    <div className='min-h-[6rem]'>
      <button onClick={toggleEdit} className='underline text-purple-800'>
        add instructions
      </button>
    </div>
  );
}
