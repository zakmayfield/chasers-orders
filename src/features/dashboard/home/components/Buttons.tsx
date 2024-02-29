import { Dispatch, SetStateAction } from 'react';

import { PiXCircleThin } from 'react-icons/pi';

type ButtonProps = {
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
};

export function SaveButton({ isEdit, setIsEdit }: ButtonProps) {
  return (
    <button
      onClick={() => setIsEdit(!isEdit)}
      className='underline text-green-700 text-center'
    >
      {isEdit ? 'save' : 'edit'}
    </button>
  );
}

export function CancelEditButton({ isEdit, setIsEdit }: ButtonProps) {
  return (
    <button onClick={() => setIsEdit(false)} className='text-gray-700'>
      <PiXCircleThin />
    </button>
  );
}

export function EditButton({ isEdit, setIsEdit }: ButtonProps) {
  return (
    <button
      onClick={() => setIsEdit(!isEdit)}
      className='underline text-purple-800 text-center'
    >
      {isEdit ? 'save' : 'edit'}
    </button>
  );
}
