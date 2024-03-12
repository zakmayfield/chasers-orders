import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DeliveryInstructionsValidator } from '@/features/cart/validator/validator.delivery-instructions';
import { DeliveryInstructionsData } from '@/features/cart/types';
import {
  useEditDeliveryInstructionsForm,
  useEditInstructionsMutation,
} from '@/features/cart/helpers.cart';

interface DeliveryInstructionsProps {
  content: string | null | undefined;
}

export const DeliveryInstructions: FC<DeliveryInstructionsProps> = ({
  content: deliveryInstructions,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };
  return (
    <div className='mt-3'>
      <DeliveryHeader toggleEdit={toggleEdit} />

      {!deliveryInstructions ? (
        <NoInstructions toggleEdit={toggleEdit} />
      ) : isEdit ? (
        <InlineInstructionsEdit deliveryInstructions={deliveryInstructions} />
      ) : (
        <Instructions deliveryInstructions={deliveryInstructions} />
      )}
    </div>
  );
};

function DeliveryHeader({ toggleEdit }: { toggleEdit: () => void }) {
  return (
    <div className='mb-3 flex items-center justify-between'>
      <h5 className='font-light text-lg'>Delivery Instructions:</h5>
      <button
        onClick={toggleEdit}
        className=' border rounded-md hover:ring-2 px-2'
      >
        edit
      </button>
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
  deliveryInstructions,
}: {
  deliveryInstructions: string;
}) {
  const { register, handleSubmit } = useEditDeliveryInstructionsForm({
    deliveryInstructions,
  });

  const { editDeliveryInstructions } = useEditInstructionsMutation();

  function submitHandler(data: DeliveryInstructionsData) {
    editDeliveryInstructions(data);
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <textarea
        {...register('deliveryInstructions')}
        className='border-l border-b rounded-bl p-3 w-full bg-white min-h-[6rem]'
      />
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
