import { FC } from 'react';
import {
  Steps,
  requiredStepFields,
} from '@/features/auth/signup/helpers.signup';
import type { UseFormGetValues } from 'react-hook-form';
import type { SignUpFormData } from '@/features/auth/types';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/general.hooks';
import { PiArrowRightLight } from 'react-icons/pi';

interface NextStepProps {
  getValues: UseFormGetValues<SignUpFormData>;
  handleStepChange?(): void;
  step: Steps;
}

export const NextStepButton: FC<NextStepProps> = ({
  getValues,
  handleStepChange,
  step,
}) => {
  const queryClient = useQueryClient();
  const { notify } = useToast();

  function isStepComplete(currentStep: Steps) {
    const formValues = getValues();
    const requiredFields = requiredStepFields[currentStep];
    return requiredFields.every((field) => !!formValues[field]);
  }

  const handleNextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    function handleNotComplete() {
      notify('Please complete all required fields', 'info');
    }

    function handleComplete() {
      const formValues = getValues();
      // spread all values except for password
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...secureFormValues } = formValues;
      queryClient.setQueryData(['form-values'], secureFormValues);
      handleStepChange?.();
    }

    isStepComplete(step) ? handleComplete() : handleNotComplete();
  };

  return (
    <button
      onClick={handleNextStep}
      className={`mt-6 active:shadow-inner col-start-4 col-span-3 border-2 flex items-center justify-center gap-3 p-2 rounded-lg focus:ring-4 focus:ring-blue-400 bg-light-green-500`}
    >
      <span className='text-white font-bold'>Next</span>
      <PiArrowRightLight className='text-white' />
    </button>
  );
};
