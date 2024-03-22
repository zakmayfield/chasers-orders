import { Dispatch, SetStateAction } from 'react';

type ButtonProps = {
  isEdit?: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
};

export function EditButton({ setIsEdit }: ButtonProps) {
  return (
    <button
      onClick={() => setIsEdit(true)}
      className='col-start-10 border rounded-lg text-center'
    >
      edit
    </button>
  );
}
