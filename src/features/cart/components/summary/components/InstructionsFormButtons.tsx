import { FC } from 'react';
import { DeliveryInstructionsData } from '@/features/cart/types';
import { FormState } from 'react-hook-form';
import { LoadingSpinner } from '@/shared/components';

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
    <div className='h-8'>
      {!isEdit ? (
        <EditButton onEdit={onEdit} />
      ) : isEdit && !formState.isDirty ? (
        <CancelButton onCancel={onCancel} />
      ) : (
        <div className='flex items-center gap-1 h-full'>
          <CancelButton onCancel={onCancel} />

          <SaveButton onSave={onSave} formState={formState} />
        </div>
      )}
    </div>
  );
};

function SaveButton({
  onSave,
  formState,
}: {
  onSave: () => void;
  formState: FormState<DeliveryInstructionsData>;
}) {
  return (
    <button
      onClick={onSave}
      className='bg-light-green-400 rounded-lg text-white hover:ring-2 hover:ring-sky-500 px-2 w-12 h-full flex items-center justify-center'
    >
      {formState.isSubmitted && formState.isSubmitSuccessful ? (
        <LoadingSpinner />
      ) : (
        'save'
      )}
    </button>
  );
}

function CancelButton({ onCancel }: { onCancel: () => void }) {
  return (
    <button
      onClick={onCancel}
      className='border rounded-md px-2 h-full w-8 bg-red-300 text-white hover:ring-2 hover:ring-sky-500 flex items-center justify-center'
    >
      x
    </button>
  );
}

function EditButton({ onEdit }: { onEdit: () => void }) {
  return (
    <button
      onClick={onEdit}
      className='border rounded-md hover:ring-2 px-2 w-12 h-full flex items-center justify-center'
    >
      edit
    </button>
  );
}
