import { DeliveryInstructionsData } from '@/features/cart/types';
import { FC } from 'react';
import { FormState } from 'react-hook-form';

interface InstructionsFormButtonsProps {
  onSave: () => void;
  onCancel: () => void;
  onEdit: () => void;
  isEdit: boolean;
  formState: FormState<DeliveryInstructionsData>;
}

export const InstructionsFormButtons: FC<InstructionsFormButtonsProps> = ({
  onSave,
  onCancel,
  onEdit,
  isEdit,
  formState,
}) => {
  return (
    <div>
      {!isEdit ? (
        <button
          onClick={onEdit}
          className='border rounded-md hover:ring-2 px-2'
        >
          edit
        </button>
      ) : isEdit && !formState.isDirty ? (
        <button
          onClick={onCancel}
          className='border rounded-md hover:ring-2 px-2'
        >
          x
        </button>
      ) : (
        <div className='flex items-center gap-1'>
          <button
            onClick={onCancel}
            className='border rounded-md hover:ring-2 px-2'
          >
            x
          </button>

          <button
            onClick={onSave}
            className='border rounded-md hover:ring-2 px-2'
          >
            save
          </button>
        </div>
      )}
    </div>
  );
};
