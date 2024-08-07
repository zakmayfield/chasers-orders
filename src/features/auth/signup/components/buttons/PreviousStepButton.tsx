import { FC } from 'react';
import { Steps } from '@/types/auth';

interface PreviousStepButtonProps {
  step: Steps;
  handlePreviousStepCallback?(): void;
}

export const PreviousStepButton: FC<PreviousStepButtonProps> = ({
  handlePreviousStepCallback,
}) => {
  return (
    <button
      onClick={handlePreviousStepCallback}
      className={`mt-6 active:shadow-inner col-span-2 border-2 flex items-center justify-center gap-3 p-2 rounded-lg focus:ring-4 focus:ring-blue-400`}
    >
      Back
    </button>
  );
};
