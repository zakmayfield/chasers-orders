'use client';
import FormSwitchLink from '../components/FormSwitchLink';
import SignInForm from './components/SignInForm';

export const SignIn = () => {
  return (
    <div className='border-b col-span-6 col-start-4 xl:col-start-5 xl:col-span-4 row-start-3 py-6 xl:px-12 font-extralight'>
      <h2 className='text-2xl mb-12'>Chasers Juice</h2>
      <SignInForm />
      <FormSwitchLink formType='sign-in' />
    </div>
  );
};
