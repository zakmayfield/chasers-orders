'use client';
import { FC } from 'react';
import FieldError from '../components/FieldError';
import { SignInButton } from './components';
import { handleSignIn } from '@/utils/helpers';
import { useCustomForm } from '@/shared/hooks/forms';
import { defaultSignInFormValues } from '@/utils/constants';
import { signInResolver } from '@/shared/validators/resolvers';
import { SignInFormData } from '@/types/auth';

interface SignInFormProps {}

const SignInForm: FC<SignInFormProps> = ({}) => {
  const {
    methods: {
      register,
      handleSubmit,
      formState: { errors, isSubmitted, isSubmitSuccessful },
    },
  } = useCustomForm<SignInFormData>({
    defaultValues: defaultSignInFormValues,
    resolver: signInResolver,
  });

  function submitHandler(data: SignInFormData) {
    handleSignIn(data);
  }
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className='grid grid-cols-6 gap-4'>
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

        <SignInButton
          isSubmitted={isSubmitted}
          isSubmitSuccessful={isSubmitSuccessful}
        />
      </div>
    </form>
  );
};

export default SignInForm;
