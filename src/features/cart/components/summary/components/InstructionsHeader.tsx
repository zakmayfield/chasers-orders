import { DeliveryInstructionsData } from '@/features/cart/types';
import { FC } from 'react';
import { FormState } from 'react-hook-form';
import { InstructionsFormButtons } from './InstructionsFormButtons';

interface InstructionsHeaderProps {
  isEdit: boolean;
  formState: FormState<DeliveryInstructionsData>;
  onSave: () => void;
  onCancel: () => void;
  onEdit: () => void;
}

export const InstructionsHeader: FC<InstructionsHeaderProps> = ({
  isEdit,
  formState,
  onSave,
  onCancel,
  onEdit,
}) => {
  return (
    <div className='mb-3 flex items-center justify-between'>
      <h5 className='font-light text-lg'>Delivery Instructions:</h5>

      {/* Btns Container */}
      <InstructionsFormButtons
        isEdit={isEdit}
        formState={formState}
        onSave={onSave}
        onCancel={onCancel}
        onEdit={onEdit}
      />
    </div>
  );
};
