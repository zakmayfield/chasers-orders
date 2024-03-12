import { FC } from 'react';

interface InstructionsHeaderProps {
  isEdit: boolean;
  toggleEdit: () => void;
  submitHandler(): void;
}

export const InstructionsHeader: FC<InstructionsHeaderProps> = ({
  isEdit,
  toggleEdit,
  submitHandler,
}) => {
  return (
    <div className='mb-3 flex items-center justify-between'>
      <h5 className='font-light text-lg'>Delivery Instructions:</h5>

      {isEdit ? (
        <button onClick={submitHandler}>save</button>
      ) : (
        <button
          onClick={toggleEdit}
          className=' border rounded-md hover:ring-2 px-2'
        >
          edit
        </button>
      )}
    </div>
  );
};
