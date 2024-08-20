'use client';
import FormSwitchLink from '@/app/(auth)/components/FormSwitchLink';
import { SignInForm } from './components';
import { Heading } from '@/shared/components/ui';

export const SignIn = () => {
  return (
    <div className='border-b col-span-6 col-start-4 xl:col-start-5 xl:col-span-4 row-start-3 py-6 xl:px-12 font-extralight'>
      <Heading as='h2' content='Chasers Juice' className='mb-6' />
      <SignInForm />
      <FormSwitchLink formType='sign-in' />
    </div>
  );
};
