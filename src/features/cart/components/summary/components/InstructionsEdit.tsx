import { DeliveryInstructionsData } from '@/features/cart/types';
import { FC } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface InstructionsEditProps {
  errors: FieldErrors<DeliveryInstructionsData>;
  register: UseFormRegister<DeliveryInstructionsData>;
}

export const InstructionsEdit: FC<InstructionsEditProps> = ({
  register,
  errors,
}) => {
  return (
    <form>
      <textarea
        {...register('deliveryInstructions')}
        className='border rounded-lg p-3 w-full bg-white min-h-[5rem]'
      />
    </form>
  );
};
