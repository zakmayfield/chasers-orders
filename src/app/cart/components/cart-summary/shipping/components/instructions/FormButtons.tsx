import { FC } from 'react';
import { FormState } from 'react-hook-form';
import { LoadingSpinner } from '@/shared/components/ui';
import { DeliveryInstructionsData } from '@/types/user';

interface FormButtonsProps {
  isEdit: boolean;
  formState: FormState<DeliveryInstructionsData>;
  toggleEdit: () => void;
  submit: () => Promise<void>;
  cancel: () => void;
}

export const FormButtons: FC<FormButtonsProps> = ({
  isEdit,
  formState,
  toggleEdit,
  submit,
  cancel,
}) => {
  return (
    <div className='h-8'>
      {!isEdit ? (
        <EditButton toggleEdit={toggleEdit} />
      ) : isEdit && !formState.isDirty ? (
        <CancelButton cancel={cancel} />
      ) : (
        <div className='flex items-center gap-1 h-full'>
          <CancelButton cancel={cancel} />
          <SaveButton submit={submit} formState={formState} />
        </div>
      )}
    </div>
  );
};

function SaveButton({
  submit,
  formState,
}: {
  submit: () => Promise<void>;
  formState: FormState<DeliveryInstructionsData>;
}) {
  return (
    <button
      onClick={submit}
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

function CancelButton({ cancel }: { cancel: () => void }) {
  return (
    <button
      onClick={cancel}
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
