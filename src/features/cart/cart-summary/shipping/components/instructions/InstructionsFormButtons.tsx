import { FC } from 'react';
import { FormState } from 'react-hook-form';
import { LoadingSpinner } from '@/shared/components';
import { DeliveryInstructionsData } from '@/types/user';

interface InstructionsFormButtonsProps {
  submitHandler(): void;
  onCancel: () => void;
  toggleEdit: () => void;
  isEdit: boolean;
  formState: FormState<DeliveryInstructionsData>;
}

export const InstructionsFormButtons: FC<InstructionsFormButtonsProps> = ({
  submitHandler,
  onCancel,
  toggleEdit,
  isEdit,
  formState,
}) => {
  return (
    <div className='h-8'>
      {!isEdit ? (
        <EditButton toggleEdit={toggleEdit} />
      ) : isEdit && !formState.isDirty ? (
        <CancelButton onCancel={onCancel} />
      ) : (
        <div className='flex items-center gap-1 h-full'>
          <CancelButton onCancel={onCancel} />
          <SaveButton submitHandler={submitHandler} formState={formState} />
        </div>
      )}
    </div>
  );
};

function SaveButton({
  submitHandler,
  formState,
}: {
  submitHandler(): void;
  formState: FormState<DeliveryInstructionsData>;
}) {
  return (
    <button
      onClick={submitHandler}
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

function EditButton({ toggleEdit }: { toggleEdit: () => void }) {
  return (
    <button
      onClick={toggleEdit}
      className='border rounded-md hover:ring-2 px-2 w-12 h-full flex items-center justify-center'
    >
      edit
    </button>
  );
}
