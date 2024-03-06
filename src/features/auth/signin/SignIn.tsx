'use client';
import FormSwitchLink from '../components/FormSwitchLink';
import SignInForm from './SignInForm';

export const SignIn = () => {
  return (
    <div className='shadow rounded-lg border border-gray-100 col-start-5 col-span-4 row-start-3 py-6 px-12 font-extralight'>
      <h2 className='text-2xl mb-12'>Chasers Juice</h2>
      <SignInForm />
      <FormSwitchLink formType='sign-in' />
    </div>
  );
};
