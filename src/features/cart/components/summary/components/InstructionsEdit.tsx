import { DeliveryInstructionsData } from '@/shared/validators/cart/DeliveryInstructionsValidator';
import { FC } from 'react';
import { UseFormRegister } from 'react-hook-form';

interface InstructionsEditProps {
  register: UseFormRegister<DeliveryInstructionsData>;
}

export const InstructionsEdit: FC<InstructionsEditProps> = ({ register }) => {
  return (
    <form className='m-0 p-0 box-border'>
      <textarea
        {...register('deliveryInstructions')}
        className='border rounded-lg p-3 w-full bg-white min-h-[5rem]'
      />
    </form>
  );
};
