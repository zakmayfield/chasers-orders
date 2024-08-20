import { FC } from 'react';
import { PiSpinnerGapThin } from 'react-icons/pi';
import { merge } from '@/utils/styles';

interface LoadingSpinnerProps {
  className?: string;
}

export const LoadingSpinner: FC<LoadingSpinnerProps> = ({ className }) => {
  return (
    <PiSpinnerGapThin className={merge(`text-xl animate-spin ${className}`)} />
  );
};
