'use client';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import GridContainer from '../ui/layout/GridContainer';
import FormSwitchLink from './ui/FormSwitchLink';
import { SignInFormData } from '@/types/types.auth-forms';
import { AuthSignInValidator } from '@/lib/validators/validator.auth-form';
import { useToast } from '@/hooks/general.hooks';
import FieldError from './ui/FieldError';

export default function SignIn() {
  const { notify } = useToast();
  const {
    formState: { errors, isValid },
    register,
    handleSubmit,
  } = useForm<SignInFormData>({
    resolver: zodResolver(AuthSignInValidator),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function submitHandler(data: SignInFormData) {
    const signInWithCredentials = async () => {
      try {
        await signIn('sign-in', {
          ...data,
        });
      } catch (err) {
        console.error(err);
      }
    };

    signInWithCredentials();
  }

  // TODO: NEED TO HANDLE LOG IN ERRORS

  return (
    <div className='shadow rounded-lg border border-gray-100 col-start-5 col-span-4 row-start-3 py-6 px-12 font-extralight'>
      <h2 className='text-2xl mb-12'>Chasers Juice</h2>

      <form onSubmit={handleSubmit(submitHandler)}>
        <GridContainer cols={6}>
          <label htmlFor='email' className='col-span-6'>
            Email
          </label>

          <input
            type='email'
            id='email'
            {...register('email')}
            className='border-2 rounded-lg col-span-6 p-2 text-lg placeholder:text-gray-300 focus:ring-4 focus:ring-blue-400'
            placeholder='geralt@rivia.com'
          />
          {errors.email && (
            <div className='col-span-6'>
              <FieldError message={errors.email.message} />
            </div>
          )}

          <label htmlFor='password' className='col-span-6'>
            Password
          </label>

          <input
            type='password'
            id='password'
            {...register('password')}
            className='border-2 rounded-lg col-span-6 p-2 text-lg placeholder:text-gray-300 focus:ring-4 focus:ring-blue-400'
            placeholder='Password'
          />
          {errors.password && (
            <div className='col-span-6'>
              <FieldError message={errors.password.message} />
            </div>
          )}

          <button
            type='submit'
            className='border-2 rounded-lg p-2 col-span-6 focus:ring-4 focus:ring-blue-400 mt-6'
          >
            Sign In
          </button>
        </GridContainer>
      </form>

      <FormSwitchLink formType='sign-in' />
    </div>
  );
}
