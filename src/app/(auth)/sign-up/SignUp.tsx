'use client';

import { useStepTracker } from '@/shared/hooks/utils';
import { SignUpForm, StepTracker } from './components';
import FormSwitchLink from '@/app/(auth)/components/FormSwitchLink';
import { Heading } from '@/shared/components/ui';

export const SignUp = () => {
  const { step, setStep } = useStepTracker();

  return (
    <div className='border-b col-span-6 col-start-4 xl:col-start-5 xl:col-span-4 py-6 px-12 font-extralight'>
      <Heading as='h2' content='Create an Account' className='mb-6' />

      <StepTracker activeStep={step} />
      <SignUpForm setStep={setStep} step={step} />
      <FormSwitchLink formType='sign-up' />
    </div>
  );
};
