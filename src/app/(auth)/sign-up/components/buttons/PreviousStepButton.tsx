import { FC } from 'react';
import { SignUpFormSteps } from '@/shared/types/Forms';

interface PreviousStepButtonProps {
  step: SignUpFormSteps;
  handleDecrementStep?(): void;
}

export const PreviousStepButton: FC<PreviousStepButtonProps> = ({
  handleDecrementStep,
}) => {
  return (
    <button
      onClick={handleDecrementStep}
      className={`mt-6 active:shadow-inner col-span-2 border-2 flex items-center justify-center gap-3 p-2 rounded-lg focus:ring-4 focus:ring-blue-400`}
    >
      Back
    </button>
  );
};
