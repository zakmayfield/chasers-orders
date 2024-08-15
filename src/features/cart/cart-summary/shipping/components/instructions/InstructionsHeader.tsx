import { FC } from 'react';
import { FormState } from 'react-hook-form';
import { InstructionsFormButtons } from './InstructionsFormButtons';
import { DeliveryInstructionsData } from '@/types/user';

interface InstructionsHeaderProps {
  isEdit: boolean;
  formState: FormState<DeliveryInstructionsData>;
  submitHandler(): void;
  onCancel: () => void;
  toggleEdit: () => void;
}

export const InstructionsHeader: FC<InstructionsHeaderProps> = ({
  isEdit,
  formState,
  submitHandler,
  onCancel,
  toggleEdit,
}) => {
  return (
    <div className='mb-3 flex items-center justify-between'>
      <h5 className='font-light text-lg'>Delivery Instructions:</h5>

      <InstructionsFormButtons
        isEdit={isEdit}
        formState={formState}
        submitHandler={submitHandler}
        onCancel={onCancel}
        toggleEdit={toggleEdit}
      />
    </div>
  );
};
