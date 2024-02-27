import { FC } from 'react';
import { PiSpinnerGapThin } from 'react-icons/pi';

interface LoadingSpinnerProps {}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({}) => {
  return (
    <span className='ml-3'>
      <PiSpinnerGapThin className='text-xl animate-spin' />
    </span>
  );
};

export default LoadingSpinner;