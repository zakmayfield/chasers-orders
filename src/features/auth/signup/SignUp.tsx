'use client';

import { useStepTracker } from '@/features/auth/signup/helpers.signup';
import { SignUpForm, StepTracker } from './components';
import FormSwitchLink from '@/features/auth/components/FormSwitchLink';

export const SignUp = () => {
  const { step, setStep } = useStepTracker();

  return (
    <div className='border-b col-span-6 col-start-4 xl:col-start-5 xl:col-span-4 py-6 px-12 font-extralight'>
      <h2 className='text-2xl mb-12'>Create an account</h2>
      <StepTracker activeStep={step} />
      <SignUpForm setStep={setStep} step={step} />
      <FormSwitchLink formType='sign-up' />
    </div>
  );
};
