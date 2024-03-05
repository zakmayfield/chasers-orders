import { merge } from '@/utils/styles.utils';
import { FC } from 'react';
import { PiSpinnerGapThin } from 'react-icons/pi';

interface LoadingSpinnerProps {
  className?: string;
}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({ className }) => {
  return (
    <PiSpinnerGapThin className={merge(`text-xl animate-spin ${className}`)} />
  );
};

export default LoadingSpinner;
