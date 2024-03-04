import { FC } from 'react';

interface FieldErrorProps {
  message?: string;
}

const FieldError: FC<FieldErrorProps> = ({ message }) => {
  return (
    <p role='alert' className='col-span-6 text-sm text-red-500 text-right'>
      {message}
    </p>
  );
};

export default FieldError;
