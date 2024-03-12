import { DeliveryInstructionsData } from '@/features/cart/types';
import { FC } from 'react';
import { UseFormRegister } from 'react-hook-form';

interface InstructionsEditProps {
  register: UseFormRegister<DeliveryInstructionsData>;
}

export const InstructionsEdit: FC<InstructionsEditProps> = ({ register }) => {
  return (
    <form>
      <textarea
        {...register('deliveryInstructions')}
        className='border rounded-lg p-3 w-full bg-white min-h-[5rem]'
      />
    </form>
  );
};
