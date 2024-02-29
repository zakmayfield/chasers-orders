import { Dispatch, SetStateAction } from 'react';

type ButtonProps = {
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
};

export function SaveButton({ isEdit, setIsEdit }: ButtonProps) {
  return (
    <button
      onClick={() => setIsEdit(!isEdit)}
      className='underline text-green-700 col-start-7 text-center'
    >
      {isEdit ? 'save' : 'edit'}
    </button>
  );
}

export function EditButton({ isEdit, setIsEdit }: ButtonProps) {
  return (
    <button
      onClick={() => setIsEdit(!isEdit)}
      className='underline text-purple-800 col-start-7 text-center'
    >
      {isEdit ? 'save' : 'edit'}
    </button>
  );
}
