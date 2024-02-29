import { Dispatch, SetStateAction } from 'react';
import { PiXBold } from 'react-icons/pi';

type ButtonProps = {
  isEdit?: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
};

export function SaveButton() {
  return (
    <button className=' rounded-lg col-start-10 bg-light-greenish text-white hover:ring-2 hover:ring-sky-500'>
      save
    </button>
  );
}

export function CancelButton({ setIsEdit }: ButtonProps) {
  return (
    <button
      onClick={() => setIsEdit(false)}
      className=' rounded-lg col-start-10 bg-red-300 text-white hover:ring-2 hover:ring-sky-500 flex items-center justify-center'
    >
      <PiXBold />
    </button>
  );
}

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
