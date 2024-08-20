import { FC } from 'react';
import { merge } from '@/utils/styles';
import { SpinnerIcon } from '@/utils/icons';

interface LoadingSpinnerProps {
  className?: string;
}

export const LoadingSpinner: FC<LoadingSpinnerProps> = ({ className }) => {
  return <SpinnerIcon className={merge(`text-xl animate-spin ${className}`)} />;
};
